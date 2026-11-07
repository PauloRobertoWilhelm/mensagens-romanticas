# Arquitetura — Mensagens Românticas

**Status:** implementada (Fases 2–7). Este documento descreve o que existe de fato.

## Stack
| Camada | Escolha | Motivo |
|---|---|---|
| Hospedagem | GitHub Pages (site estático) | Grátis, sem servidor |
| Linguagem | HTML + CSS + JavaScript puro | Sem build; abre com duplo clique ou Live Server |
| Scripts | **Clássicos** (`<script src>`), sem ES modules e sem `fetch` | Módulos e `fetch` não funcionam em `file://` |
| Conteúdo | Arquivos JS de dados (`data/mensagens-*.js`) usando funções curtas (`M`, `abArte`, `F`) | Editar texto sem tocar no motor |
| Partículas | Canvas 2D próprio | Sem biblioteca |
| Música | `HTMLAudioElement` com MP3 local por categoria | Sem depender do YouTube |
| Artes | Uma função por link em `js/artes-*.js`, com estilo em `css/artes-*.css` e peças comuns em `js/kit.js` | Cada link tem ideia, gráfico e interação próprios |
| Testes | Node (`tests/validar.js`) + Chrome (`tests/e2e.js`, joga os 80 links) | As peças do kit marcam cada gesto com `data-acao` |

## Fluxo do usuário
1. Recebe `index.html?k=CHAVE`.
2. `main.js` decodifica a chave (`chave.js`) → id → mensagem em `MENSAGENS`.
3. Aplica `data-tema` e `data-arte`, inicia `Fundo` (partículas do tema, com ajustes da arte) e `Musica` (categoria).
4. `Cenas.rodar`: entrada própria do link (`js/abertura.js`, `js/entradas-*.js`, motor `js/luz.js`, textos em `data/aberturas.js`) → arte própria do link → 2 capítulos interativos → final (título, mensagem, reações, carta). O primeiro toque libera a música.
5. O fundo animado de cada link (`js/cenarios.js`, escolhido em `data/cenarios.js`) roda em WebGL atrás de tudo, reage ao dedo e pulsa com `Musica.batida()`.
6. Reações no final abrem o WhatsApp se `CONFIG.WHATSAPP` estiver preenchido.

## Chave do link
5 caracteres, alfabeto de 31 símbolos (sem 0 O 1 I L). Bits: salt 9 · id mascarado 8 · verificação 6. Ids de 1 a 255. **É ofuscação, não segurança.** O painel usa `Chave.fixa(id)`: cada mensagem tem um link fixo, que nunca muda. `Chave.gerar(id)` continua sorteando chaves diferentes, e toda chave válida segue abrindo a mensagem.

## Esquema (dados em JS)
```js
M(id, 'categoria', 'tema', 'nome', abArte('arte', { /* textos que a arte usa */ }, { /* partículas, opcional */ }), [
  F('título', 'mensagem') // final (obrigatório, último)
], 'carta opcional');
```
Para criar uma mensagem nova: escreva a função `A.nome = async (d) => { ... }` em `js/artes-<categoria>.js` usando as peças de `js/kit.js` (`K.tela`, `K.toque`, `K.segura`, `K.arrasta`, `K.raspa`, `K.pinta`...), o estilo `.a-nome` em `css/artes-<categoria>.css` e os textos no arquivo de dados. O validador recusa arte repetida entre mensagens.
`CATEGORIAS[cat] = { nome, emoji, musica, chips[] }`.

Depois da arte vêm 2 capítulos, definidos em `data/capitulos-*.js` com `X(id, [capítulo, capítulo])`. Os 8 tipos ficam em `js/capitulos.js` e o visual em `css/capitulos.css`. As faíscas do toque ficam em `js/efeitos.js`.

## Segurança e privacidade
- Tudo no navegador; nenhum dado enviado a servidor próprio.
- Textos entram no HTML sempre via `U.esc`/`U.fmt` (escape), nunca HTML cru.
- Repositório público = mensagens legíveis no código-fonte; o link não expira e não há como saber se foi aberto.
- `<meta name="robots" content="noindex">` evita buscadores, mas não protege contra quem tem o link.
