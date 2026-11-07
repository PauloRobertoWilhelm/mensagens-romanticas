/* ==========================================================
   main.js — ponto de entrada: lê a chave do link, acha a mensagem,
   aplica o tema, prepara a música e começa as cenas.
   Links: index.html?k=CHAVE  (normal)  |  index.html?m=ID (só local).
   ========================================================== */

/* ==========================================================
   COMO LER ESTE ARQUIVO (explicado para quem nunca viu código)

   Este arquivo é o "cérebro": diz o que acontece e em que ordem.
   As cores e os tamanhos NÃO ficam aqui; ficam nos arquivos da pasta css.

   Cada linha que começa com // é só uma explicação: o computador ignora.
   Ela sempre fala da linha de código logo abaixo.

   Coisas que dá para mudar com segurança:
     U.esperar(1300)  = espera 1,3 segundos. Número maior = mais demora.
     K.som(440, 120)  = sonzinho. Número maior = mais agudo; o 2º é a duração.

   Mude uma coisa de cada vez, salve e olhe no navegador.
   Se algo parar de funcionar, desfaça a última mudança.
   ========================================================== */

// Roda quando a página termina de carregar a estrutura.
document.addEventListener('DOMContentLoaded', () => {
  // Lê os parâmetros da URL (?k=...).
  const params = new URLSearchParams(location.search);
  // Descobre o id da mensagem: pela chave (sempre) ou por ?m= (somente em ambiente local).
  let id = null;
  // Se a condição entre parênteses valer: guarda o novo valor em id.
  if (params.get('k')) id = Chave.decodificar(params.get('k'));
  // Se o caso de cima não valeu, faz isto.
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
    // Guarda o novo valor em caixa.className.
    caixa.className = 'caixa';
    // Troca o que aparece dentro de caixa.
    caixa.innerHTML =
      '<h1 class="titulo">' +
      titulo +
      '</h1><p class="sub">' +
      explicacao +
      '</p>' +
      (semChave || U.ehLocal()
        ? '<a class="btn" href="' + destinoPainel + '" style="text-decoration:none">abrir painel de links</a>'
        : '');
    // Mantém o aviso no mesmo palco e com o fundo padrão.
    const cena = document.createElement('section');
    // Guarda o novo valor em cena.className.
    cena.className = 'cena';
    // Coloca a peça nova dentro de cena.
    cena.appendChild(caixa);
    // Coloca a peça nova dentro de U.$('#palco').
    U.$('#palco').appendChild(cena);
    // Usa o tema padrão enquanto não existe uma mensagem para definir outro tema.
    Fundo.iniciar(Fundo.TEMAS.noite);
    // Liga um fundo animado também nesta tela de entrada.
    Cenarios.iniciar('rede');
    // Para por aqui.
    return;
  }

  // Aplica o tema (cores via CSS) e marca a arte, que pode ter cores e fontes próprias.
  document.documentElement.dataset.tema = msg.tema;
  // Anota "arte" em document.documentElement, para o CSS ou o teste usarem.
  document.documentElement.dataset.arte = msg.ab.a;
  // Liga as partículas do tema, com os ajustes próprios da arte quando houver.
  Fundo.iniciar(Object.assign({}, Fundo.TEMAS[msg.tema] || Fundo.TEMAS.noite, msg.ab.fundo));
  // Cor da barra do navegador no celular combina com o tema.
  const meta = U.$('meta[name="theme-color"]');
  // Se a condição entre parênteses valer: guarda o novo valor em meta.content.
  if (meta) meta.content = getComputedStyle(document.documentElement).getPropertyValue('--bg-a').trim() || '#0b0b1a';

  // Prepara a música da categoria (só começa a tocar no primeiro toque).
  const cat = CATEGORIAS[msg.cat];
  // Prepara a música, ainda sem tocar.
  Musica.iniciar(cat);
  // Todo clique tenta ligar a música. Quando ela já está tocando, nada muda.
  document.addEventListener('click', () => Musica.tocar());
  // No celular, tirar o dedo da tela também tenta ligar a música.
  document.addEventListener('pointerup', () => Musica.tocar());

  // Liga o fundo animado tecnológico deste link.
  Cenarios.iniciar(window.CENARIO[msg.id]);
  // Liga as faíscas do toque, o rastro do dedo e a inclinação 3D.
  Efeitos.iniciar();

  // Começa as cenas.
  Cenas.rodar(msg, cat);
});
