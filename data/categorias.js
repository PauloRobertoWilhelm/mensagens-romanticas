/* ==========================================================
   categorias.js — as 4 categorias: música, ritmo e reações.
   musica: caminho do MP3 (você coloca os arquivos na pasta music/).
   chips:  botões de reação do final (viram mensagem no WhatsApp).
   ========================================================== */

/* ==========================================================
   COMO LER ESTE ARQUIVO (explicado para quem nunca viu código)

   Aqui ficam os TEXTOS. É o arquivo mais seguro de mexer.
   Cada linha que começa com // explica a linha logo abaixo.

   Regras para não quebrar nada:
     1. Troque só o que está entre aspas 'assim'.
     2. Nunca apague as aspas, as vírgulas nem os colchetes [ ].
     3. Para escrever um apóstrofo dentro do texto, use \' .
     4. Palavra entre *asteriscos* aparece destacada.
     5. Nunca mude o número do link: os links já enviados usam esse número.
   ========================================================== */

// Objeto global com as categorias.
window.CATEGORIAS = {
  // Paquera / conquista.
  paquera: {
    // Nome que aparece na peça.
    nome: 'Paquera',
    // Desenho ao lado do nome no painel.
    emoji: '💘',
    // Arquivo da música desta categoria (pasta music).
    musica: 'music/paquera.mp3',
    // Ritmo da música: o fundo animado pulsa nesta velocidade (batidas por minuto).
    bpm: 78,
    // Duração da música em segundos. Se trocar a música, atualize este número.
    duracao: 216,
    // Botões de reação da tela final.
    chips: ['Que ousadia 😏', 'Fiquei sem graça 🙈', 'Continua… 💬']
  },
  // Namorada.
  namoro: {
    // Nome que aparece na peça.
    nome: 'Namoro',
    // Desenho ao lado do nome no painel.
    emoji: '❤️',
    // Arquivo da música desta categoria (pasta music).
    musica: 'music/namoro.mp3',
    // Ritmo da música: o fundo animado pulsa nesta velocidade (batidas por minuto).
    bpm: 83,
    // Duração da música em segundos. Se trocar a música, atualize este número.
    duracao: 232,
    // Botões de reação da tela final.
    chips: ['Chorei aqui 🥹', 'Também te amo ❤️', 'Me liga? 📞']
  },
  // Amigos e amigas.
  amigos: {
    // Nome que aparece na peça.
    nome: 'Amigos',
    // Desenho ao lado do nome no painel.
    emoji: '🤝',
    // Arquivo da música desta categoria (pasta music).
    musica: 'music/amigos.mp3',
    // Ritmo da música: o fundo animado pulsa nesta velocidade (batidas por minuto).
    bpm: 89,
    // Duração da música em segundos. Se trocar a música, atualize este número.
    duracao: 198,
    // Botões de reação da tela final.
    chips: ['Valeu demais! 🤝', 'Rindo aqui 😂', 'Bora marcar algo? 🍻']
  },
  // Datas especiais.
  datas: {
    // Nome que aparece na peça.
    nome: 'Datas especiais',
    // Desenho ao lado do nome no painel.
    emoji: '🎉',
    // Arquivo da música desta categoria (pasta music).
    musica: 'music/datas.mp3',
    // Ritmo da música: o fundo animado pulsa nesta velocidade (batidas por minuto).
    bpm: 125,
    // Duração da música em segundos. Se trocar a música, atualize este número.
    duracao: 143,
    // Botões de reação da tela final.
    chips: ['Recebi com carinho 💛', 'Amei a surpresa 🎉', 'Te amo 💖']
  }
};
