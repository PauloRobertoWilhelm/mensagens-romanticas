# Arquitetura — Mensagens Românticas

**Status:** implementada (Fases 2–7). Este documento descreve o que existe de fato.

## Stack
| Camada | Escolha | Motivo |
|---|---|---|
| Hospedagem | GitHub Pages (site estático) | Grátis, sem servidor |
| Linguagem | HTML + CSS + JavaScript puro | Sem build; abre com duplo clique ou Live Server |
| Scripts | **Clássicos** (`<script src>`), sem ES modules e sem `fetch` | Módulos e `fetch` não funcionam em `file://` |
| Conteúdo | Arquivos JS de dados (`data/mensagens-*.js`) usando funções curtas (`M`, `H`, `S`...) | Editar texto sem tocar no motor |
| Partículas | Canvas 2D próprio | Sem biblioteca |
| Música | `HTMLAudioElement` com MP3 local por categoria | Sem depender do YouTube |
| Testes | Node (validação de dados) + Playwright/Chrome (fluxo ponta a ponta) | Ver README |

## Fluxo do usuário
1. Recebe `index.html?k=CHAVE`.
2. `main.js` decodifica a chave (`chave.js`) → id → mensagem em `MENSAGENS`.
3. Aplica `data-tema`, inicia `Fundo` (partículas do tema) e `Musica` (categoria).
4. `Cenas.rodar`: abertura (primeiro toque libera a música) → cenas → final (jogo + revelação).
5. Reações no final abrem o WhatsApp se `CONFIG.WHATSAPP` estiver preenchido.

## Chave do link
5 caracteres, alfabeto de 31 símbolos (sem 0 O 1 I L). Bits: salt 9 · id mascarado 8 · verificação 6. Ids de 1 a 255. **É ofuscação, não segurança.** Cada geração produz uma chave diferente para o mesmo id.

## Esquema (dados em JS)
```js
M(id, 'categoria', 'tema', 'nome', abTerminal(titulo, [linhas]) /* ou abCoracao | abEnvelope | abPresente */, [
  H(titulo, [frases]),            // historia
  C('coracao|estrela|infinito', msg), // constelacao
  S(titulo, [[rotulo, pct]], veredito), // scanner
  K(titulo, [[frente, verso]]),   // cartas
  N(titulo, [[numero, rotulo]], fecho), // contagem
  L(titulo, [itens]),             // motivos
  E(pergunta, [[opcao, resposta]]), // escolha
  F('segurar|toques|deslizar', titulo, mensagem, { n, dica, dica2, pre }) // final (obrigatório, último)
], 'carta opcional');
```
`CATEGORIAS[cat] = { nome, emoji, musica, bpm, legendas[], chips[] }`.

## Segurança e privacidade
- Tudo no navegador; nenhum dado enviado a servidor próprio.
- Textos entram no HTML sempre via `U.esc`/`U.fmt` (escape), nunca HTML cru.
- Repositório público = mensagens legíveis no código-fonte; o link não expira e não há como saber se foi aberto.
- `<meta name="robots" content="noindex">` evita buscadores, mas não protege contra quem tem o link.
