# memory.md — Resumo de Estado

**Projeto:** Mensagens Românticas (GitHub Pages) · **Fase 8: uma animação para cada link** (restam só ajustes do dono).

## Feito
- 80 artes diferentes, uma por link: `js/artes-*.js` (movimento), `css/artes-*.css` (visual), `data/mensagens-*.js` (textos).
- Peças comuns em `js/kit.js`; cada gesto marca o elemento com `data-acao`.
- Paquera reescrita com cantadas e elogios ousados. Ids e links não mudaram.
- 10 temas de cor + partículas por tema, com ajuste por arte. Música por categoria com legenda e modo sem áudio.
- Músicas em `music/`: paquera = Iris, namoro = The Reason, amigos = Count on Me, datas = Alive.
- Painel de links com link fixo por mensagem + histórico local.
- Testes: `node tests/validar.js .` e `node tests/e2e.js URL` (joga os 80 links no Chrome).

## Falta / depende do dono
- Preencher `WHATSAPP` em `data/config.js`.
- Testar no celular real depois de publicar (https://paulorobertowilhelm.github.io/mensagens-romanticas/).

## Decisões
- Chave = ofuscação (5 caracteres, ids 1–255), não segurança.
- Repositório público expõe os textos e as músicas; músicas comerciais podem ser removidas por direitos autorais. Alternativa privada: Cloudflare Pages/Netlify.
- Sem rastreamento: não dá para saber se o link foi aberto.
