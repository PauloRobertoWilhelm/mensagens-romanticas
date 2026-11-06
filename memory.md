# memory.md — Resumo de Estado

**Projeto:** Mensagens Românticas (GitHub Pages) · **Fase 7 de 7 entregue** (restam só ajustes do dono).

## Feito
- Motor completo: 4 aberturas, 7 tipos de cena, 3 finais (segurar, toques, deslizar), reações → WhatsApp.
- 10 temas de cor + partículas por tema. Música por categoria com legenda no ritmo e modo sem áudio.
- 80 mensagens (ids 1–20 paquera, 21–40 namoro, 41–60 amigos, 61–80 datas); combinações únicas validadas.
- Painel de links com link fixo por mensagem + histórico local.
- Testes: validação de dados em Node; percurso ponta a ponta no Chrome (Playwright) nas mensagens.

## Falta / depende do dono
- Colocar `music/paquera.mp3`, `namoro.mp3`, `amigos.mp3`, `datas.mp3`.
- Preencher `WHATSAPP` em `data/config.js`.
- Testar o primeiro link no celular real (site publicado em https://paulorobertowilhelm.github.io/mensagens-romanticas/).
- Conferir se a música de datas (`zmRGjVLR6rs`) combina; ajustar `bpm` das legendas.

## Decisões
- Chave = ofuscação (5 caracteres, ids 1–255), não segurança.
- Repositório público expõe os textos; alternativa privada: Cloudflare Pages/Netlify.
- Sem rastreamento: não dá para saber se o link foi aberto.
