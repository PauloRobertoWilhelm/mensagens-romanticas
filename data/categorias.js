/* ==========================================================
   categorias.js — as 4 categorias: música, ritmo, legendas e reações.
   musica: caminho do MP3 (você coloca os arquivos na pasta music/).
   bpm:    batidas por minuto (aprox.). A legenda troca a cada 4 batidas.
   legendas: frases curtas minhas, no ritmo da música (NÃO são letras de música).
   chips:  botões de reação do final (viram mensagem no WhatsApp).
   ========================================================== */

// Objeto global com as categorias.
window.CATEGORIAS = {
  // Paquera / conquista.
  paquera: {
    nome: 'Paquera', emoji: '💘', musica: 'music/paquera.mp3', bpm: 76,
    legendas: ['esse sorriso devia ter aviso de perigo', 'que mulher, meu Deus', 'tem coisa que não dá pra disfarçar', 'esse cabelo é covardia', 'inteligente assim, é até injusto', 'você sabe o que faz comigo', 'pensei em você de novo', 'linda de um jeito que atrapalha', 'perdi o assunto quando você chegou', 'alguém sorriu agora, adivinha quem', 'sem defesa nenhuma aqui', 'o mundo pode esperar um minuto'],
    chips: ['Que ousadia 😏', 'Fiquei sem graça 🙈', 'Continua… 💬']
  },
  // Namorada.
  namoro: {
    nome: 'Namoro', emoji: '❤️', musica: 'music/namoro.mp3', bpm: 70,
    legendas: ['te escolho em todos os dias', 'casa é onde você está', 'o nosso jeito é o meu favorito', 'um dia ao seu lado ganha cor', 'gratidão por ficar', 'a gente combina até no silêncio', 'mãos dadas, mundo em paz', 'você é o meu lugar seguro', 'amar você é fácil', 'mais um capítulo nosso', 'eu e você, de novo e de novo', 'fica mais um pouquinho'],
    chips: ['Chorei aqui 🥹', 'Também te amo ❤️', 'Me liga? 📞']
  },
  // Amigos e amigas.
  amigos: {
    nome: 'Amigos', emoji: '🤝', musica: 'music/amigos.mp3', bpm: 100,
    legendas: ['amizade de verdade não tem prazo', 'quem ri junto, fica junto', 'valeu por existir na minha vida', 'história boa tem você nela', 'presença vale mais que palavras', 'bora fazer mais memórias', 'te chamo mesmo sem ter assunto', 'vida boa é vida com gente boa', 'o melhor rolê é com você', 'na dor e na zoeira', 'um abraço que cabe numa mensagem', 'conta comigo, sempre'],
    chips: ['Valeu demais! 🤝', 'Rindo aqui 😂', 'Bora marcar algo? 🍻']
  },
  // Datas especiais.
  datas: {
    nome: 'Datas especiais', emoji: '🎉', musica: 'music/datas.mp3', bpm: 90,
    legendas: ['hoje é dia de celebrar', 'mais um capítulo bonito', 'pra marcar na memória', 'momento pra guardar no coração', 'cada data guarda uma história', 'que venham os melhores dias', 'hoje o carinho é em dobro', 'um brinde ao que importa', 'lembrança boa pede abraço', 'é dia de lembrar o que é bom', 'gratidão em forma de mensagem', 'o tempo passa, o carinho fica'],
    chips: ['Recebi com carinho 💛', 'Amei a surpresa 🎉', 'Te amo 💖']
  }
};
