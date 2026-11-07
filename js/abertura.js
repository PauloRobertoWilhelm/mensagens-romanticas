/* ==========================================================
   abertura.js — a entrada de cada link, antes da arte.
   Aqui ficam só as peças comuns e a ordem das coisas.
   As 20 entradas de verdade ficam em js/entradas-*.js.
   Os textos e qual entrada cada link usa ficam em data/aberturas.js.
   O visual fica em css/aberturas.css.
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

  // Caixa onde ficam as 20 entradas.
  const Entradas = {};

  // Tamanho, em pontinhos, de cada quadradinho que o dedo vai limpando.
  const QUADRADINHO = 34;

  // Espera o dedo passar por 'limite' (de 0 a 1) da peça 'el'. 'cada' recebe o progresso e onde o dedo está.
  // Se 'cada' devolver true, o gesto acaba antes do limite.
  Entradas.varre = (el, limite, cada) =>
    new Promise((ok) => {
      // Marca a peça para o CSS e para o teste automático.
      el.dataset.acao = 'raspa';
      // Avisa o celular que o dedo aqui não rola a tela.
      el.style.touchAction = 'none';
      // Quadradinhos por onde o dedo já passou.
      const vistos = new Set();
      // Marca se o dedo está encostado.
      let preso = false;
      // Última posição do dedo.
      let ux = null;
      // Última posição do dedo na altura.
      let uy = null;
      // Marca a passagem do dedo por um ponto.
      const marca = (x, y) => {
        // Mede a peça.
        const r = el.getBoundingClientRect();
        // Quantos quadradinhos cabem na largura.
        const colunas = Math.ceil(r.width / QUADRADINHO);
        // Quantos quadradinhos cabem na altura.
        const linhas = Math.ceil(r.height / QUADRADINHO);
        // Marca o quadradinho deste ponto e os vizinhos, porque o dedo é largo.
        for (let a = -1; a <= 1; a++) {
          // Anda na altura.
          for (let b = -1; b <= 1; b++) {
            // Coluna deste quadradinho.
            const c = Math.floor((x - r.left) / QUADRADINHO) + a;
            // Linha deste quadradinho.
            const l = Math.floor((y - r.top) / QUADRADINHO) + b;
            // Guarda, se estiver dentro da peça.
            if (c >= 0 && l >= 0 && c < colunas && l < linhas) vistos.add(l * colunas + c);
          }
        }
        // Calcula o quanto já foi limpo, de 0 a 1.
        const parte = Math.min(1, vistos.size / (colunas * linhas) / limite);
        // Avisa a entrada. Se ela devolver true, o gesto acaba na hora.
        const basta = cada ? cada(parte, x, y) : false;
        // Chegou no limite, ou a entrada mandou parar: libera.
        if (parte >= 1 || basta === true) {
          // Apaga a marca do teste.
          delete el.dataset.acao;
          // Para de ouvir o dedo.
          el.removeEventListener('pointerdown', desce);
          // Para de ouvir o dedo.
          el.removeEventListener('pointermove', anda);
          // Para de ouvir o dedo.
          window.removeEventListener('pointerup', sobe);
          // Faz o celular tremer um pouquinho.
          U.vibra(20);
          // Libera quem está esperando.
          ok();
        }
      };
      // Marca o caminho inteiro, para o dedo rápido não pular quadradinhos.
      const caminho = (x, y) => {
        // Sem ponto anterior, marca só este.
        if (ux == null) marca(x, y);
        // Com ponto anterior, marca vários pontos entre os dois.
        else {
          // Distância percorrida.
          const passos = Math.max(1, Math.ceil(Math.hypot(x - ux, y - uy) / (QUADRADINHO / 2)));
          // Marca cada ponto do caminho.
          for (let i = 1; i <= passos; i++) marca(ux + ((x - ux) * i) / passos, uy + ((y - uy) * i) / passos);
        }
        // Guarda a posição.
        ux = x;
        // Guarda a posição.
        uy = y;
      };
      // Quando o dedo encostar.
      const desce = (e) => {
        // Anota que o dedo está encostado.
        preso = true;
        // Esquece a posição antiga.
        ux = null;
        // Marca este ponto.
        caminho(e.clientX, e.clientY);
      };
      // Quando o dedo andar. Com o mouse, vale só passar por cima.
      const anda = (e) => {
        // Só conta com o dedo encostado ou com o mouse.
        if (preso || e.pointerType === 'mouse') caminho(e.clientX, e.clientY);
      };
      // Quando o dedo sair.
      const sobe = () => {
        // Anota que o dedo saiu.
        preso = false;
      };
      // Fica de olho no dedo encostando.
      el.addEventListener('pointerdown', desce);
      // Fica de olho no dedo andando.
      el.addEventListener('pointermove', anda);
      // Fica de olho no dedo saindo, em qualquer lugar da tela.
      window.addEventListener('pointerup', sobe);
    });

  // Escolhe a cor de letra que aparece bem em cima de uma cor: quase preto ou branco.
  Entradas.tinta = (rgb) => (rgb[0] * 0.3 + rgb[1] * 0.6 + rgb[2] * 0.1 > 0.55 ? '#0d0b14' : '#ffffff');

  // Cria a frase que ensina o gesto.
  Entradas.dica = (caixa, texto) => K.add(caixa, 'p', 'ab-dica', texto);

  // Cria uma camada invisível do tamanho da tela, para ouvir o dedo.
  Entradas.pele = (caixa) => K.add(caixa, 'div', 'ab-pele');

  // Solta um clarão que cobre a tela por um instante.
  Entradas.clarao = (caixa) => {
    // Cria o clarão.
    const c = K.add(caixa, 'i', 'ab-clarao');
    // Tira da tela depois de 0,9 segundo.
    setTimeout(() => c.remove(), 900);
  };

  // Faz um número andar suavemente de 'de' até 'ate' em 'ms' milésimos. 'cada' recebe o valor.
  Entradas.anima = (de, ate, ms, cada) =>
    new Promise((ok) => {
      // Horário do começo.
      let t0 = 0;
      // Desenha um passo.
      const passo = (t) => {
        // No primeiro passo, anota o começo.
        if (!t0) t0 = t;
        // Quanto do tempo já passou, de 0 a 1.
        const k = Math.min(1, (t - t0) / ms);
        // Entrega o valor, começando e terminando devagar.
        cada(de + (ate - de) * k * k * (3 - 2 * k));
        // Acabou: libera.
        if (k >= 1) ok();
        // Senão, continua no próximo quadro.
        else requestAnimationFrame(passo);
      };
      // Começa.
      requestAnimationFrame(passo);
    });

  // Mostra a frase final e dá tempo de ler. 'ms' é o tempo de leitura.
  Entradas.fecha = async (caixa, d, ms) => {
    // Som de sucesso.
    K.som(1200, 90, 'sine', 0.06);
    // Segundo som de sucesso, um pouquinho depois.
    setTimeout(() => K.som(1600, 180, 'sine', 0.07), 110);
    // Faz o celular tremer duas vezes.
    U.vibra([20, 40, 20]);
    // Cria a frase final.
    K.add(caixa, 'p', 'ab-ok', d.ok);
    // Dá tempo de ler. Número maior = a frase fica mais tempo na tela.
    await U.esperar(ms || 2200);
  };

  // Mostra a entrada deste link. 'd' são os textos, vindos de data/aberturas.js.
  g.Abertura = async (d) => {
    // Avisa o CSS que a entrada está na tela, para esconder o rodapé da música.
    document.body.classList.add('entrando');
    // Abre a tela inteira, com o visual desta entrada.
    const caixa = K.tela('abertura cheia ab-' + d.tipo);
    // Guarda quem precisa ser desligado no fim.
    const desliga = [];
    // Saída de segurança: depois de 25 segundos aparece um botão para pular. Número maior = demora mais.
    const pular = new Promise((ok) => {
      // Espera o tempo passar.
      setTimeout(() => {
        // Cria o botão.
        const b = K.add(caixa, 'button', 'ab-pular', 'pular ›');
        // Diz ao navegador que é um botão comum.
        b.type = 'button';
        // Quando tocar, segue para a mensagem.
        b.addEventListener('click', ok);
      }, 25000);
    });
    // Tenta rodar a entrada.
    try {
      // Roda a entrada do tipo pedido, ou segue se a pessoa pular.
      await Promise.race([Entradas[d.tipo](caixa, d, (coisa) => desliga.push(coisa)), pular]);
      // Aconteça o que acontecer, faz a limpeza.
    } finally {
      // Mostra o rodapé da música de novo.
      document.body.classList.remove('entrando');
      // Espera a próxima tela cobrir esta, e desliga os desenhos.
      setTimeout(() => desliga.forEach((c) => c.parar()), 900);
    }
  };

  // Deixa estas ferramentas disponíveis para os outros arquivos.
  g.Entradas = Entradas;
  // Fecha a caixa e já roda tudo.
})(window);
