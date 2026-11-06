# PRD — Mensagens Românticas (links separados, sem nome)

**Fase 7 de 7 (entregue).** Status: 0 ✔ requisitos · 1 ✔ documentos · 2 ✔ pastas e esqueleto · 3 ✔ motor base · 4 ✔ temas e cenas · 5 ✔ 80 mensagens · 6 ✔ painel de links · 7 ✔ QA (ver README)

## Resumo
Site estático no GitHub Pages. O dono gera um link com chave, manda para alguém, e a pessoa abre no celular e vê uma mensagem animada com música. Cada link mostra uma mensagem diferente. Nenhuma mensagem tem nome de pessoa.

## Decisões da Fase 0
| Tema | Decisão |
|---|---|
| Personalização | Tudo genérico, sem nome |
| Tipos | Paquera, namorada, amigos, datas especiais |
| Quantidade | 80 mensagens (20 por categoria), independentes entre si |
| Música | 1 MP3 por categoria (4 arquivos em `music/`) |
| Legenda | Frases curtas escritas por nós, trocando no ritmo da música |
| Link | Painel do dono gera link com chave (assumido, confirmar) |
| Hospedagem | GitHub Pages |

## Músicas (arquivos MP3 do dono)
| Categoria | Referência |
|---|---|
| Paquera | Goo Goo Dolls, *Iris* (`music/paquera.mp3`) |
| Namoro | Hoobastank, *The Reason* (`music/namoro.mp3`) |
| Amigos | Bruno Mars, *Count on Me* (`music/amigos.mp3`) |
| Datas especiais | Alok, *Alive (It Feels Like)* (`music/datas.mp3`) |

## Cards de requisito
**RF-01 Abrir pelo link.** Como destinatário, quero abrir o link no celular e ver a mensagem direto, sem instalar nada nem fazer login. *Aceite:* carrega em até 3 s no 4G; funciona no Chrome Android e no Safari iOS 16+.

**RF-02 Chave no link.** Como dono, quero que o link tenha uma chave (`?k=...`) que escolhe a mensagem. *Aceite:* chave inválida ou ausente mostra uma página neutra e simpática, sem erro técnico.

**RF-03 Painel do dono.** Como dono, quero uma página `painel/` onde escolho a categoria (ou aleatório) e pego o link dela. *Aceite:* cada mensagem tem um link fixo, que nunca muda; botão copiar funciona no celular; mostra prévia da mensagem.

**RF-04 Oitenta mensagens.** Como dono, quero 80 mensagens: 20 de paquera, 20 de namoro, 20 de amigos e 20 de datas especiais. *Aceite:* nenhuma repete texto de outra; nenhuma cita nome; cada uma tem combinação única de tema + abertura + sequência de cenas + final.

**RF-05 Uma animação para cada link.** Como dono, quero que cada link tenha animação, gráficos, ideia e conteúdo próprios, sem parecer com os outros. *Aceite:* 80 artes diferentes; nenhuma arte se repete entre mensagens; o validador confere isso.

**RF-06 Peças reutilizáveis.** Como dono, quero peças comuns (toque, segurar, arrastar, raspar, canvas, som) que as artes usam sem repetir código. *Aceite:* toda interação passa por `js/kit.js` e marca o elemento com `data-acao`, o que permite testar os 80 links com um único teste.

**RF-07 Música por categoria.** Como destinatário, quero ouvir uma música ao abrir. *Aceite:* começa no primeiro toque (regra do navegador); repete; botão de mudo e volume; pausa ao sair da aba.

**RF-08 Legenda no rodapé.** Como destinatário, quero ver frases curtas no pé da tela enquanto a música toca. *Aceite:* troca a cada N batidas (BPM configurável por categoria); fica legível sobre qualquer tema; respeita "reduzir movimento".

**RF-09 Final.** Como dono, quero que toda mensagem feche com um título, uma frase e reações. *Aceite:* nenhuma termina pedindo para sair ou se encontrar; a letra do título acompanha a arte; a paquera é ousada, com cantadas e elogios ao sorriso, ao cabelo, à inteligência e à mulher incrível que ela é.

**RF-10 Resposta por WhatsApp (opcional).** Como dono, quero que a pessoa possa responder pelo meu WhatsApp. *Aceite:* só aparece se o número estiver no config; mensagem pronta por reação.

**RF-11 Carta completa (opcional).** Como destinatário, quero ler o texto inteiro. *Aceite:* abre em janela, fecha no X, no fundo e no Esc.

**RF-12 Acessibilidade e desempenho.** *Aceite:* alvos de toque de 44 px ou mais; contraste adequado; animações desligam com "reduzir movimento"; fundo animado leve (até 60 quadros por segundo no celular médio).

## Requisitos não funcionais
- Sem cookies, sem rastreio, sem coleta de dados.
- Sem build e sem framework: HTML, CSS e JavaScript puros.
- Todo texto em português do Brasil.

## Riscos
| Id | Risco | Resposta |
|---|---|---|
| R-01 | Repositório público expõe as 80 mensagens no código | Aceitar, ou usar Cloudflare Pages/Netlify com repositório privado |
| R-02 | MP3 comercial em repositório público pode ser removido por direitos autorais | Decisão do dono; alternativa: música livre de direitos |
| R-03 | A chave não é segurança, só dificulta adivinhar | Documentar; não colocar nada sensível |
| R-04 | iOS e Android só tocam áudio após um toque | O coração de abertura já é esse toque |
| R-05 | GitHub Pages não conta aberturas nem expira links | Aceitar |

## Plano de fases
| Fase | Entrega |
|---|---|
| 2 | Árvore de pastas e esqueleto lógico |
| 3 | Motor base: ler chave, aplicar tema, tocar cenas, música |
| 4 | 10 temas e as cenas novas |
| 5 | As 80 mensagens (arquivos JS de dados) |
| 6 | Painel gerador de links |
| 7 | QA, testes ponta a ponta e publicação no GitHub Pages |
