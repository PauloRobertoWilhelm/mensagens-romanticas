/* ==========================================================
   efeitos.js — brilho por cima de tudo: faíscas em cada toque e rastro do dedo.
   Fica em um canvas próprio, acima das animações, e não atrapalha os toques.
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

  // Caixa onde ficam as ferramentas deste arquivo.
  const Efeitos = {};

  // Anotações: o quadro de desenho, o pincel e o tamanho da tela.
  let cv = null,
    cx = null,
    W = 0,
    H = 0;
  // Lista das faíscas que estão na tela agora.
  const ps = [];
  // Anota se o desenho está rodando e se o dedo está encostado.
  let rodando = false,
    apertado = false;
  // Respeita quem pediu menos movimento nas configurações do celular.
  const calmo = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ajusta o quadro de desenho ao tamanho da tela.
  const medir = () => {
    // Limita a nitidez a 2, para poupar a bateria do celular.
    const d = Math.min(window.devicePixelRatio || 1, 2);
    // Anota o tamanho da tela.
    W = window.innerWidth;
    // Anota a altura da tela.
    H = window.innerHeight;
    // Ajusta o tamanho real do desenho.
    cv.width = Math.round(W * d);
    // Ajusta a altura do desenho ao tamanho real.
    cv.height = Math.round(H * d);
    // Faz o desenho usar o tamanho normal da tela.
    cx.setTransform(d, 0, 0, d, 0, 0);
  };

  // Lê a cor de destaque do tema, para as faíscas combinarem com a mensagem.
  const cor = () => getComputedStyle(document.documentElement).getPropertyValue('--ac2').trim() || '#ffffff';

  // Desenha um quadro: move, apaga e pinta cada faísca.
  const quadro = () => {
    // Apaga o desenho anterior.
    cx.clearRect(0, 0, W, H);
    // Passa por cada faísca, da última para a primeira.
    for (let i = ps.length - 1; i >= 0; i--) {
      // Pega a faísca desta volta.
      const p = ps[i];
      // Move a faísca e faz ela cair um pouquinho.
      p.x += p.vx;
      // Move a partícula para cima ou para baixo.
      p.y += p.vy;
      // Escolhe a velocidade para cima ou para baixo.
      p.vy += 0.05;
      // Tira um pouco de p.vida.
      p.vida -= 0.025;
      // Faísca apagada sai da lista.
      if (p.vida <= 0) {
        // Tira um item da lista.
        ps.splice(i, 1);
        // Pula para a próxima volta da repetição.
        continue;
      }
      // Escolhe a cor e a transparência da faísca.
      cx.globalAlpha = p.vida;
      // Escolhe a cor da tinta do pincel.
      cx.fillStyle = p.cor;
      // Desenha a faísca como uma bolinha.
      cx.beginPath();
      // Desenha um círculo.
      cx.arc(p.x, p.y, p.r * p.vida, 0, 6.3);
      // Pinta por dentro do desenho.
      cx.fill();
    }
    // Volta a transparência ao normal.
    cx.globalAlpha = 1;
    // Sem faíscas, para de desenhar para poupar bateria; com faíscas, continua.
    if (ps.length) requestAnimationFrame(quadro);
    // Se o caso de cima não valeu, faz isto.
    else rodando = false;
  };

  // Liga o desenho, se ele estiver parado.
  const liga = () => {
    // Se a condição entre parênteses valer, faz o que está nas chaves.
    if (!rodando) {
      // Anota se o desenho está ligado.
      rodando = true;
      // Pede para rodar de novo no próximo quadro da tela.
      requestAnimationFrame(quadro);
    }
  };

  // Solta 'n' faíscas no ponto (x,y). Número maior = explosão maior.
  Efeitos.estoura = (x, y, n) => {
    // Sem quadro de desenho ou com pedido de menos movimento, não faz nada.
    if (!cx || calmo) return;
    // Pega a cor do tema uma vez só.
    const c = cor();
    // Cria as faíscas, cada uma para um lado.
    for (let i = 0; i < n && ps.length < 160; i++) {
      // Anotações que o código vai usando enquanto funciona: a, v.
      const a = U.rand(0, 6.3),
        v = U.rand(0.6, 3.6);
      // Coloca mais um item na lista.
      ps.push({
        x,
        y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v - 0.6,
        // Resultado que aparece neste item.
        r: U.rand(1.6, 4.2),
        vida: 1,
        cor: i % 3 ? c : '#ffffff'
      });
    }
    // Liga o desenho.
    liga();
  };

  // Solta faíscas no meio de uma peça da tela.
  Efeitos.em = (el, n) => {
    // Mede o tamanho e o lugar da peça e guarda com o nome "r".
    const r = el.getBoundingClientRect();
    // Solta faíscas neste ponto da tela.
    Efeitos.estoura(r.left + r.width / 2, r.top + r.height / 2, n || 14);
  };

  // Escreve um texto como se ele estivesse sendo decodificado, em 'ms' milésimos de segundo.
  Efeitos.decodifica = (el, texto, ms) =>
    new Promise((ok) => {
      // Quem pediu menos movimento vê o texto pronto.
      if (calmo) {
        // Escreve o texto inteiro.
        el.textContent = texto;
        // Termina a espera.
        ok();
        // Para por aqui.
        return;
      }
      // Símbolos que aparecem antes da letra certa.
      const SIMBOLOS = '01<>/#$%&*+=ABCDEFGHJKLMNPQRSTUVXZ';
      // Anota a hora em que começou.
      const inicio = performance.now();
      // Desenha um passo do efeito.
      const passo = (t) => {
        // Calcula o quanto já passou, de 0 a 1.
        const k = Math.min(1, Math.max(0, (t - inicio) / (ms || 900)));
        // Descobre quantas letras já estão certas.
        const certas = Math.floor(texto.length * k);
        // Começa com as letras certas.
        let s = texto.slice(0, certas);
        // Completa o resto com símbolos sorteados, mantendo os espaços.
        for (let i = certas; i < texto.length; i++) s += texto[i] === ' ' ? ' ' : U.sorteia(SIMBOLOS);
        // Mostra o resultado.
        el.textContent = s;
        // Se ainda não acabou, continua; se acabou, termina a espera.
        if (k < 1) requestAnimationFrame(passo);
        // Se o caso de cima não valeu, faz isto.
        else ok();
      };
      // Começa o efeito.
      requestAnimationFrame(passo);
    });

  // Inclina a tela: x e y vão de -1 a 1. Troque o 6 para inclinar mais ou menos.
  const inclina = (x, y) => {
    // Pega o começo da página, onde o valor fica guardado.
    const raiz = document.documentElement.style;
    // Inclina para cima e para baixo.
    raiz.setProperty('--inc-x', (-y * 6).toFixed(2) + 'deg');
    // Inclina para os lados.
    raiz.setProperty('--inc-y', (x * 6).toFixed(2) + 'deg');
  };

  // Prepara o quadro de desenho e fica de olho no dedo.
  Efeitos.iniciar = () => {
    // Pega o quadro de desenho que está no index.html.
    cv = U.$('#brilho');
    // Se a condição entre parênteses valer, para por aqui.
    if (!cv) return;
    // Pega o pincel e mede a tela.
    cx = cv.getContext('2d');
    // Usa a ajuda "medir" (ela está definida neste arquivo).
    medir();
    // Mede de novo quando a tela mudar de tamanho.
    window.addEventListener('resize', medir);
    // Quando o dedo encostar, solta faíscas. Troque o 9 para mais ou menos faíscas.
    window.addEventListener(
      'pointerdown',
      (e) => {
        // Guarda o novo valor em apertado.
        apertado = true;
        // Solta faíscas neste ponto da tela.
        Efeitos.estoura(e.clientX, e.clientY, 9);
      },
      { passive: true }
    );
    // Quando o dedo andar encostado, deixa um rastro. Troque o 2 para um rastro mais forte.
    window.addEventListener(
      'pointermove',
      (e) => {
        // Se a condição entre parênteses valer: solta faíscas neste ponto da tela.
        if (apertado) Efeitos.estoura(e.clientX, e.clientY, 2);
      },
      { passive: true }
    );
    // Com o mouse, a tela acompanha o ponteiro, menos enquanto o botão estiver apertado.
    window.addEventListener(
      'pointermove',
      (e) => {
        // Se a condição entre parênteses valer: usa a ajuda "inclina" (ela está definida neste arquivo).
        if (e.pointerType === 'mouse' && !e.buttons && !calmo)
          // Usa a ajuda "inclina" (ela está definida neste arquivo).
          inclina((e.clientX / W) * 2 - 1, (e.clientY / H) * 2 - 1);
      },
      { passive: true }
    );
    // No celular, a tela acompanha o giro do aparelho.
    window.addEventListener('deviceorientation', (e) => {
      // Se a condição entre parênteses valer: usa a ajuda "inclina" (ela está definida neste arquivo).
      if (e.gamma != null && !calmo)
        // Usa a ajuda "inclina" (ela está definida neste arquivo).
        inclina(Math.max(-1, Math.min(1, e.gamma / 30)), Math.max(-1, Math.min(1, (e.beta - 45) / 30)));
    });
    // Quando o dedo sair, para o rastro.
    window.addEventListener(
      'pointerup',
      () => {
        // Guarda o novo valor em apertado.
        apertado = false;
      },
      { passive: true }
    );
  };

  // Deixa estas ferramentas disponíveis para os outros arquivos.
  g.Efeitos = Efeitos;
  // Fecha a caixa e já roda tudo.
})(window);
