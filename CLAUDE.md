# CLAUDE.md — regras do repositório

Projeto: site estático (GitHub Pages) com 80 mensagens animadas acessadas por link com chave.

## Regras
- Português do Brasil. Sem nomes de pessoas nas mensagens (tudo genérico).
- Scripts **clássicos** (sem ES modules, sem `fetch`): precisa funcionar abrindo `index.html` direto (file://) e no GitHub Pages.
- Em **todo o projeto** (CSS, JS, dados, HTML e testes): uma coisa por linha, com comentário na linha **acima**, explicado como para uma criança de 5 anos. O comentário diz o que a linha faz e o que muda se alterar o valor. No CSS, diz o nome da peça e a cor (ex.: "Cor das letras (carimbo): vermelho escuro"). O dono não programa e usa os comentários para achar o que mudar.
- Texto vindo de dados entra no HTML só por `U.esc` / `U.fmt`.
- Nunca mudar o `id` de uma mensagem já enviada. Ids: 1–255, únicos.
- Toda mensagem: 1 abertura (`abArte`) + 2 capítulos (`X`, em `data/capitulos-*.js`) + 1 fundo animado (`Z`, em `data/cenarios.js`) + filme de frases (`Y`, em `data/frases-*.js`, pelo menos 70% da música) + exatamente 1 `F(...)` como último passo.
- Cada link tem arte própria: gráfico, ideia e texto que não se repetem em outro link.
- Nenhuma mensagem termina pedindo para sair/encontrar ("aceita sair comigo?").
- Segredos em `.env` (hoje não há nenhum; o número do WhatsApp fica em `data/config.js` e é público).

## Comandos úteis
- Validar dados: `node tests/validar.js .` (confere ids, temas, artes únicas, textos repetidos e chaves).
- Jogar os links no Chrome: `node tests/e2e.js http://127.0.0.1:8765/ [ids] [pasta-das-fotos]` (precisa de servidor local e `playwright-core`).
- Testar visualmente: abrir `painel/index.html` com Live Server.
