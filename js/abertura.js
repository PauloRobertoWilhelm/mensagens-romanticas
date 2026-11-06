/* ==========================================================
   abertura.js — a tela do leitor de digital, que aparece antes de cada mensagem.
   A pessoa encosta o dedo, o leitor "confere" e a mensagem abre.
   Os textos ficam em data/categorias.js, no item abertura.
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

// Caixa fechada: o que está aqui dentro não se mistura com o resto do site.
(function (g) {
  // Liga o modo estrito: o navegador avisa de erros bobos.
  'use strict';

  // Desenha um arco da digital, com raio r, do ângulo a ao ângulo b.
  const arco = (r, a, b) => {
    // Calcula um ponto do arco, um pouco mais alto do que largo.
    const ponto = (g2) =>
      (50 + r * Math.cos((g2 * Math.PI) / 180)).toFixed(1) +
      ' ' +
      (56 + r * 1.14 * Math.sin((g2 * Math.PI) / 180)).toFixed(1);
    // Devolve o traço do arco.
    return (
      '<path d="M' +
      ponto(a) +
      'A' +
      r +
      ' ' +
      (r * 1.14).toFixed(1) +
      ' 0 ' +
      (b - a > 180 ? 1 : 0) +
      ' 1 ' +
      ponto(b) +
      '"/>'
    );
  };

  // Desenho da digital: arcos um dentro do outro, cada um cortado em um lugar.
  const DIGITAL =
    '<svg class="digital" viewBox="0 0 100 100" aria-hidden="true">' +
    [
      [7, -210, 30],
      [14, -200, -20],
      [14, 0, 40],
      [21, -195, 10],
      [21, 28, 60],
      [28, -190, -50],
      [28, -35, 45],
      [35, -188, 25],
      [35, 40, 62],
      [42, -178, -30],
      [42, -15, 28]
    ]
      .map((x) => arco(x[0], x[1], x[2]))
      .join('') +
    '</svg>';

  // Roda a abertura com os textos 'd' da categoria.
  g.Abertura = async (d) => {
    // Abre a tela do leitor.
    const caixa = K.tela('abertura');
    // Frase pequena de cima.
    K.add(caixa, 'p', 'hud-topo', d.topo);
    // Título que se decodifica sozinho.
    const t = K.add(caixa, 'h1', 'titulo');
    // Começa a decodificar o título.
    Efeitos.decodifica(t, d.selo, 1100);
    // Monta o leitor: anel de progresso, digital e luz que varre.
    const b = U.el(
      'button',
      'leitor',
      '<svg class="anel-l" viewBox="0 0 120 120" aria-hidden="true"><circle class="trilho-l" cx="60" cy="60" r="56"/><circle class="prog-l" cx="60" cy="60" r="56" pathLength="1"/></svg>' +
        DIGITAL +
        '<i class="varre"></i>'
    );
    // Diz ao navegador que é um botão comum.
    b.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    b.setAttribute('aria-label', d.dica);
    // Coloca o leitor na tela.
    caixa.appendChild(b);
    // Pega o anel de progresso.
    const anel = U.$('.prog-l', b);
    // Frase que ensina o que fazer.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera a pessoa segurar o dedo. Troque o 1500 para demorar mais ou menos.
    await K.segura(b, 1500, (p) => {
      // Enche o anel conforme o tempo.
      anel.style.strokeDashoffset = 1 - p;
      // Acende a digital aos poucos.
      b.style.setProperty('--p', p);
      // Liga a luz que varre enquanto o dedo está encostado.
      b.classList.toggle('lendo', p > 0);
    });
    // Leitura terminou: tira a luz e pinta de verde.
    b.classList.remove('lendo');
    // Liga o visual de acesso liberado.
    b.classList.add('ok');
    // Faz dois sonzinhos de confirmação.
    K.som(1200, 90, 'square', 0.05);
    // Segundo som, um pouco depois.
    setTimeout(() => K.som(1600, 180, 'sine', 0.08), 110);
    // Faz o celular tremer duas vezes.
    U.vibra([20, 40, 20]);
    // Solta faíscas em cima do leitor.
    Efeitos.em(b, 40);
    // Tira a dica.
    dica.remove();
    // Lugar da frase de confirmação.
    const r = K.add(caixa, 'p', 'texto');
    // Escreve a confirmação palavra por palavra.
    await K.fala(r, d.ok, 110);
    // Deixa ler antes de abrir a mensagem. Número maior = mais tempo.
    await U.esperar(1100);
  };
  // Fecha a caixa e já roda tudo.
})(window);
