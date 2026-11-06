/* ==========================================================
   categorias.js — as 4 categorias: música, ritmo, leitor de digital e reações.
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
    // Textos do leitor de digital, que abre cada mensagem.
    abertura: {
      // Frase pequena de cima.
      topo: 'TRANSMISSÃO PRIVADA',
      // Título que se decodifica.
      selo: 'MENSAGEM PROTEGIDA',
      // Frase que ensina a encostar o dedo.
      dica: 'só abre com a digital de uma mulher incrível',
      // Frase de confirmação, depois da leitura.
      ok: 'Digital confirmada: *é você mesma*. Eu sabia.'
    },
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
    // Textos do leitor de digital, que abre cada mensagem.
    abertura: {
      // Frase pequena de cima.
      topo: 'CANAL DO NOSSO AMOR',
      // Título que se decodifica.
      selo: 'ACESSO RESTRITO',
      // Frase que ensina a encostar o dedo.
      dica: 'só abre com a digital do meu amor',
      // Frase de confirmação, depois da leitura.
      ok: 'Digital reconhecida: *é o meu amor*.'
    },
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
    // Textos do leitor de digital, que abre cada mensagem.
    abertura: {
      // Frase pequena de cima.
      topo: 'REDE DOS AMIGOS',
      // Título que se decodifica.
      selo: 'ÁREA RESTRITA',
      // Frase que ensina a encostar o dedo.
      dica: 'só abre com a digital de gente boa',
      // Frase de confirmação, depois da leitura.
      ok: 'Reconhecido. *Pode entrar*, a casa é sua.'
    },
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
    // Textos do leitor de digital, que abre cada mensagem.
    abertura: {
      // Frase pequena de cima.
      topo: 'ENTREGA ESPECIAL',
      // Título que se decodifica.
      selo: 'PACOTE LACRADO',
      // Frase que ensina a encostar o dedo.
      dica: 'encoste o dedo para receber',
      // Frase de confirmação, depois da leitura.
      ok: 'Entrega confirmada. *Hoje é dia de comemorar.*'
    },
    // Botões de reação da tela final.
    chips: ['Recebi com carinho 💛', 'Amei a surpresa 🎉', 'Te amo 💖']
  }
};
