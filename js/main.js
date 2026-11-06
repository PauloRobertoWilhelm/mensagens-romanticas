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

  // Sem mensagem válida: explica se faltou a chave e oferece acesso ao painel.
  if (!msg) {
    // Detecta quando a página inicial foi aberta sem uma chave de mensagem.
    const semChave = !params.has('k') && !(params.has('m') && U.ehLocal());
    // Escolhe um aviso que explica a diferença entre a página inicial e um link de mensagem.
    const titulo = semChave ? 'Site pronto para criar links 💌' : 'Esse link não abriu 🤔';
    // Orienta a pessoa a usar o link recebido ou a criar um link no painel.
    const explicacao = semChave
      ? 'Este endereço abre o site, mas não contém uma mensagem. Para ver uma mensagem, use o link completo que recebeu. Se você quer escolher e enviar uma, acesse o painel.'
      : 'Confira se ele foi copiado inteiro. Se continuar assim, peça outro para quem enviou.';
    // Usa o caminho adequado para abrir o painel pelo arquivo local ou pelo GitHub Pages.
    const destinoPainel = U.ehLocal() ? 'painel/index.html' : 'painel/';
    // Monta o aviso com texto fixo e um atalho para o painel quando ainda não há mensagem.
    const caixa = document.createElement('div');
    caixa.className = 'caixa';
    caixa.innerHTML = '<h1 class="titulo">' + titulo + '</h1><p class="sub">' + explicacao + '</p>'
      + (semChave || U.ehLocal() ? '<a class="btn" href="' + destinoPainel + '" style="text-decoration:none">abrir painel de links</a>' : '');
    // Mantém o aviso no mesmo palco e com o fundo padrão.
    const cena = document.createElement('section'); cena.className = 'cena'; cena.appendChild(caixa);
    U.$('#palco').appendChild(cena);
    // Usa o tema padrão enquanto não existe uma mensagem para definir outro tema.
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
