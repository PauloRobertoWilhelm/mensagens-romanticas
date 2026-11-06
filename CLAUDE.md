# CLAUDE.md — regras do repositório

Projeto: site estático (GitHub Pages) com 80 mensagens animadas acessadas por link com chave.

## Regras
- Português do Brasil. Sem nomes de pessoas nas mensagens (tudo genérico).
- Scripts **clássicos** (sem ES modules, sem `fetch`): precisa funcionar abrindo `index.html` direto (file://) e no GitHub Pages.
- Cada linha de lógica em `js/` tem comentário na linha **acima** (O QUE faz e PARA QUE serve).
- Texto vindo de dados entra no HTML só por `U.esc` / `U.fmt`.
- Nunca mudar o `id` de uma mensagem já enviada. Ids: 1–255, únicos.
- Toda mensagem: 1 abertura + cenas + exatamente 1 `F(...)` como último passo.
- Nenhuma mensagem termina pedindo para sair/encontrar ("aceita sair comigo?").
- Segredos em `.env` (hoje não há nenhum; o número do WhatsApp fica em `data/config.js` e é público).

## Comandos úteis
- Validar dados: `node tests/validar.js .` (confere ids, temas, cenas, combinações únicas e chaves).
- Testar visualmente: abrir `painel/index.html` com Live Server.
