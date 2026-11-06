/* ==========================================================
   main.js — ponto de entrada: lê a chave do link, acha a mensagem,
   aplica o tema, prepara a música e começa as cenas.
   Links: index.html?k=CHAVE  (normal)  |  index.html?m=ID (só local).
   ========================================================== */

// Roda quando a página termina de carregar a estrutura.
document.addEventListener('DOMContentLoaded', () => {
  // Lê os parâmetros da URL (?k=...).
  const params = new URLSearchParams(location.search);
  // Descobre o id da mensagem: pela chave (sempre) ou por ?m= (somente em ambiente local).
  let id = null;
  if (params.get('k')) id = Chave.decodificar(params.get('k'));
  else if (params.get('m') && U.ehLocal()) id = parseInt(params.get('m'), 10);

  // Procura a mensagem na lista.
  const msg = id ? MENSAGENS.find((m) => m.id === id) : null;

  // Link inválido: mostra uma tela simpática (e, só se for local, um atalho para o painel).
  if (!msg) {
    const caixa = document.createElement('div');
    caixa.className = 'caixa';
    caixa.innerHTML = '<h1 class="titulo">Esse link não abriu 🤔</h1><p class="sub">Confira se ele foi copiado inteiro. Se continuar assim, peça outro para quem enviou.</p>'
      + (U.ehLocal() ? '<a class="btn" href="painel/index.html" style="text-decoration:none">abrir o painel</a>' : '');
    const cena = document.createElement('section'); cena.className = 'cena'; cena.appendChild(caixa);
    U.$('#palco').appendChild(cena);
    Fundo.iniciar(Fundo.TEMAS.noite);
    return;
  }

  // Aplica o tema (cores via CSS) e a receita de partículas do mesmo nome.
  document.documentElement.dataset.tema = msg.tema;
  Fundo.iniciar(Fundo.TEMAS[msg.tema] || Fundo.TEMAS.noite);
  // Cor da barra do navegador no celular combina com o tema.
  const meta = U.$('meta[name="theme-color"]');
  if (meta) meta.content = getComputedStyle(document.documentElement).getPropertyValue('--bg-a').trim() || '#0b0b1a';

  // Prepara a música da categoria (só começa a tocar no primeiro toque).
  const cat = CATEGORIAS[msg.cat];
  Musica.iniciar(cat);
  // Segurança extra: qualquer primeiro clique na página libera a música.
  document.addEventListener('click', () => Musica.tocar(), { once: true });

  // Começa as cenas.
  Cenas.rodar(msg, cat);
});
