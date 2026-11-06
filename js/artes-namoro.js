/* ==========================================================
   artes-namoro.js — uma animação própria para cada link de namoro (ids 21 a 40).
   Os textos ficam em data/mensagens-namoro.js; aqui só há desenho e movimento.
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

  // Pega a coleção de animações, que todos os arquivos de arte preenchem.
  const A = (g.Artes = g.Artes || {});

  // Coração formado pelas janelas do prédio: # acende no final.
  const PREDIO = [
    '..##.##..',
    '.#######.',
    '#########',
    '#########',
    '.#######.',
    '..#####..',
    '...###...',
    '....#....'
  ];

  // Símbolos das rodas do cofre; o coração é o último.
  const RODA = ['★', '♠', '☾', '♦', '♣', '♥'];

  // Borboleta em duas metades, para as asas poderem bater.
  const ASA =
    '<svg viewBox="0 0 80 64" aria-hidden="true"><g class="ae"><path d="M39 30C30 6 8 2 5 14C3 26 20 34 39 34z"/><path d="M39 34C24 34 12 42 16 52C20 60 34 52 39 38z"/></g><g class="ad"><path d="M41 30C50 6 72 2 75 14C77 26 60 34 41 34z"/><path d="M41 34C56 34 68 42 64 52C60 60 46 52 41 38z"/></g><rect class="corpo" x="38.500" y="16" width="3" height="32" rx="1.500"/></svg>';

  // Notas da caixinha de música.
  const MELODIA = [523, 659, 784, 659, 880, 784, 659, 523];

  // Desenha um galho da árvore: p diz o quanto ela já cresceu, em níveis.
  const galho = (cx, x, y, a, l, n, p) => {
    // Sem nível ou sem crescimento, para.
    if (n === 0 || p <= 0) return;
    // Cresce até o tamanho inteiro deste nível.
    const q = Math.min(1, p);
    // Anotações que o código vai usando enquanto funciona: x2, y2.
    const x2 = x + Math.cos(a) * l * q,
      y2 = y + Math.sin(a) * l * q;
    // Traça o galho, mais grosso perto do tronco.
    cx.lineWidth = n * 1.3;
    // Começa um desenho novo.
    cx.beginPath();
    // Coloca o lápis neste ponto.
    cx.moveTo(x, y);
    // Risca uma linha até este ponto.
    cx.lineTo(x2, y2);
    // Pinta o traço do desenho.
    cx.stroke();
    // Galho terminado: abre os dois filhos.
    if (p > 1) {
      // Usa a ajuda "galho" (ela está definida neste arquivo).
      galho(cx, x2, y2, a - 0.44, l * 0.76, n - 1, p - 1);
      // Usa a ajuda "galho" (ela está definida neste arquivo).
      galho(cx, x2, y2, a + 0.36, l * 0.74, n - 1, p - 1);
    }
    // Na ponta, abre uma flor.
    if (n === 1 && q >= 1) {
      // Escolhe a cor da tinta do pincel.
      cx.fillStyle = '#f08aa8';
      // Começa um desenho novo.
      cx.beginPath();
      // Desenha um círculo.
      cx.arc(x2, y2, 6, 0, 6.3);
      // Pinta por dentro do desenho.
      cx.fill();
    }
  };

  // Faz um foguete explodir em (x,y), somando faíscas à lista.
  const estoura = (lista, x, y) => {
    // Cor do fogo, sorteada no círculo de matizes.
    const cor = U.rand(0, 360);
    // Sessenta faíscas em todas as direções.
    for (let i = 0; i < 60; i++) {
      // Anotações que o código vai usando enquanto funciona: a, v.
      const a = U.rand(0, 6.3),
        v = U.rand(0.8, 4.4);
      // Coloca mais um item na lista.
      lista.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: 1, cor });
    }
  };

  // 21 — Carta com lacre de cera: segure para derreter o lacre e a carta se escreve sozinha.
  A.lacre = async (d) => {
    // Abre a tela e monta o papel.
    const caixa = K.tela('a-lacre');
    // Cria a peça "papel" dentro de caixa e guarda com o nome "c".
    const c = K.add(caixa, 'div', 'papel');
    // O lacre é o botão de segurar.
    const s = U.el('button', 'cera', U.esc(d.selo));
    // Diz ao navegador que é um botão comum.
    s.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    s.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de c.
    c.appendChild(s);
    // Dica de segurar.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Esquenta enquanto segura.
    await K.segura(s, 1900, (p) => {
      // Atualiza o valor --p, que o CSS usa.
      s.style.setProperty('--p', p);
    });
    // Quebra o lacre e abre o papel.
    dica.remove();
    // Liga o visual "quebrou" (veja .quebrou no CSS).
    s.classList.add('quebrou');
    // Liga o visual "aberta" (veja .aberta no CSS).
    c.classList.add('aberta');
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(170, 220, 'triangle', 0.1);
    // Espera 1 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(1000);
    // Cada linha aparece escrita à mão.
    for (const l of d.linhas) {
      // Cria a peça "mao" dentro de c e guarda com o nome "p".
      const p = K.add(c, 'p', 'mao');
      // Escreve o texto palavra por palavra e espera terminar.
      await K.fala(p, l, 125);
      // Espera 0,45 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(450);
    }
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 22 — Instalador antigo: a barra enche, e o botão "Não" foge do dedo.
  A.instalador = async (d) => {
    // Abre a tela e monta a janela de sistema antigo.
    const caixa = K.tela('a-instalador');
    // Cria a peça "janela" dentro de caixa e guarda com o nome "j".
    const j = K.add(caixa, 'div', 'janela');
    // Cria a peça "topo" dentro de j.
    K.add(j, 'header', '', d.titulo);
    // Cria a peça "conteudo" dentro de j e guarda com o nome "c".
    const c = K.add(j, 'div', 'conteudo');
    // Texto, barra e estado.
    const t = K.add(c, 'p', '', d.boas);
    // Cria a peça "barra" dentro de c e guarda com o nome "barra".
    const barra = K.add(c, 'div', 'barra');
    // Cria a peça "enfeite" dentro de barra e guarda com o nome "fill".
    const fill = K.add(barra, 'i');
    // Cria a peça "status" dentro de c e guarda com o nome "st".
    const st = K.add(c, 'p', 'status');
    // Espera mandar instalar.
    await K.mais(c, d.iniciar);
    // Passa pelas etapas, enchendo a barra.
    for (let k = 0; k < d.etapas.length; k++) {
      // Troca o texto de st.
      st.textContent = d.etapas[k];
      // Muda a largura de fill.
      fill.style.width = ((k + 1) / d.etapas.length) * 100 + '%';
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(440 + k * 60, 60, 'square', 0.02);
      // Espera 1,1 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(1100);
    }
    // Tira a barra e faz a pergunta.
    barra.remove();
    // Tira st da tela.
    st.remove();
    // Troca o que aparece dentro de t.
    t.innerHTML = U.fmt(d.pergunta);
    // Botões Sim e Não.
    const op = K.add(c, 'div', 'ops');
    // Cria um botão dentro de op e guarda com o nome "sim".
    const sim = K.botao(op, d.sim);
    // Cria um botão dentro de op e guarda com o nome "nao".
    const nao = K.botao(op, d.nao);
    // O Não pula para outro lugar quando o dedo chega perto.
    const foge = () => {
      // Muda o movimento de nao.
      nao.style.transform = 'translate(' + U.rand(-120, 60) + 'px,' + U.rand(-130, 40) + 'px)';
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(220, 60, 'square', 0.03);
    };
    // Liga a fuga ao mouse e ao dedo.
    nao.addEventListener('pointerenter', foge);
    // Fica de olho: quando o dedo encostar, roda o que está aqui.
    nao.addEventListener('pointerdown', foge);
    // Só o Sim resolve.
    await K.toque(sim);
    // Tira op da tela.
    op.remove();
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(c, d.fim);
  };

  // 23 — Bateria quase no fim: segure o abraço para carregar até 100%.
  A.bateria = async (d) => {
    // Abre a tela com o aviso e a bateria.
    const caixa = K.tela('a-bateria');
    // Cria a peça "aviso" dentro de caixa.
    K.add(caixa, 'p', 'aviso', d.aviso);
    // Cria a peça "pilha" dentro de caixa e guarda com o nome "b".
    const b = K.add(caixa, 'div', 'pilha');
    // Cria a peça "enfeite" dentro de b e guarda com o nome "nivel".
    const nivel = K.add(b, 'i');
    // Cria a peça "texto forte" dentro de b e guarda com o nome "pct".
    const pct = K.add(b, 'b', '', '3%');
    // Frase e botão de segurar.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "bt".
    const bt = U.el('button', 'abraco', U.esc(d.botao));
    // Diz ao navegador que é um botão comum.
    bt.type = 'button';
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(bt);
    // Última frase mostrada.
    let marca = 0;
    // Carrega enquanto segura e troca a frase nas marcas.
    await K.segura(bt, 4600, (p) => {
      // Valor atual da carga.
      const v = Math.round(3 + 97 * p);
      // Troca o texto de pct.
      pct.textContent = v + '%';
      // Muda a largura de nivel.
      nivel.style.width = v + '%';
      // Liga ou desliga o visual "boa".
      b.classList.toggle('boa', v >= 40);
      // Marca alcançada agora.
      const m = Math.floor(p * d.frases.length);
      // Passou de uma marca nova: mostra a próxima frase.
      if (m > marca) {
        // Anota até onde já chegou, para não repetir a frase.
        marca = m;
        // Troca o que aparece dentro de t.
        t.innerHTML = U.fmt(d.frases[m - 1]);
        // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
        K.som(400 + m * 80, 90);
      }
    });
    // Carga completa: tira o botão e fecha.
    bt.remove();
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 24 — Caixinha de música: cada volta da manivela toca uma nota e solta um verso.
  A.caixamusica = async (d) => {
    // Abre a tela e monta a caixa com o coração que gira.
    const caixa = K.tela('a-caixamusica');
    // Cria a peça "caixinha" dentro de caixa e guarda com o nome "m".
    const m = K.add(caixa, 'div', 'caixinha');
    // Cria a peça "tampa" dentro de m.
    K.add(m, 'i', 'tampa');
    // Cria a peça "dancarina" dentro de m.
    K.add(m, 'b', 'dancarina', '♥');
    // Manivela lateral e lugar do verso.
    const man = U.el('button', 'manivela');
    // Diz ao navegador que é um botão comum.
    man.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    man.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de m.
    m.appendChild(man);
    // Cria a peça "texto" dentro de caixa e guarda com o nome "v".
    const v = K.add(caixa, 'p', 'texto');
    // Cria a peça "dica" dentro de caixa e guarda com o nome "dica".
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Ângulo atual da manivela.
    let ang = 0;
    // Oito toques: a nota toca sempre; a cada dois, troca o verso.
    await K.vezes(man, MELODIA.length, (i) => {
      // Tira a dica no primeiro toque e liga o giro.
      dica.hidden = true;
      // Liga o visual "toca" (veja .toca no CSS).
      m.classList.add('toca');
      // Gira a manivela e toca a nota.
      ang += 180;
      // Muda o movimento de man.
      man.style.transform = 'rotate(' + ang + 'deg)';
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(MELODIA[i - 1], 500, 'sine', 0.1);
      // Troca o verso nos toques pares.
      if (i % 2 === 0) U.palavras(v, d.versos[i / 2 - 1], 120);
    });
    // Deixa ler o último verso.
    await U.esperar(2400);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 25 — Aurora boreal de verdade, desenhada no canvas, com estrelas.
  A.aurora = async (d) => {
    // Abre a tela cheia e sorteia as estrelas uma vez só.
    const caixa = K.tela('a-aurora cheia');
    // Monta uma lista e guarda com o nome "ceu".
    const ceu = Array.from({ length: 90 }, () => [Math.random(), Math.random() * 0.75, U.rand(0.4, 1.5)]);
    // Desenha o céu a cada quadro.
    K.pinta(caixa, (cx, w, h, t) => {
      // Fundo escuro e estrelas piscando.
      cx.globalCompositeOperation = 'source-over';
      // Escolhe a cor da tinta do pincel.
      cx.fillStyle = '#03101c';
      // Pinta um retângulo.
      cx.fillRect(0, 0, w, h);
      // Escolhe a cor da tinta do pincel.
      cx.fillStyle = '#fff';
      // Repete para cada item da lista.
      ceu.forEach((s, i) => {
        // Escolhe a transparência do pincel.
        cx.globalAlpha = 0.4 + 0.4 * Math.sin(t * 2 + i);
        // Pinta um retângulo.
        cx.fillRect(s[0] * w, s[1] * h, s[2], s[2]);
      });
      // Somar cores deixa as cortinas luminosas.
      cx.globalAlpha = 1;
      // Muda o jeito de misturar a tinta com o que já está pintado.
      cx.globalCompositeOperation = 'lighter';
      // Três cortinas de luz, com faixas verticais onduladas.
      [
        [150, 0.32],
        [180, 0.46],
        [285, 0.58]
      ].forEach(([cor, base], k) => {
        // Cada coluna tem sua altura.
        for (let x = 0; x < w; x += 5) {
          // Altura da onda nesta coluna e neste instante.
          const y = h * base + Math.sin(x / 70 + t * 0.7 + k) * 42 + Math.sin(x / 31 - t * 0.5) * 20;
          // Faixa com degradê que some para baixo.
          const gr = cx.createLinearGradient(0, y - 130, 0, y + 50);
          // Coloca mais uma cor no degradê.
          gr.addColorStop(0, 'hsla(' + cor + ' 90% 60% / 0)');
          // Coloca mais uma cor no degradê.
          gr.addColorStop(0.75, 'hsla(' + cor + ' 90% 60% / .3)');
          // Coloca mais uma cor no degradê.
          gr.addColorStop(1, 'hsla(' + cor + ' 90% 60% / 0)');
          // Pinta a coluna.
          cx.fillStyle = gr;
          // Pinta um retângulo.
          cx.fillRect(x, y - 130, 5, 180);
        }
      });
    });
    // Texto por cima do céu.
    const s = K.add(caixa, 'div', 'sobre');
    // Cria a peça "texto" dentro de s e guarda com o nome "t".
    const t = K.add(s, 'p', 'texto', d.abre);
    // Espera o toque que começa.
    await K.mais(s, d.comecar);
    // Passa as frases e segue para o final.
    await K.frases(t, d.frases);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(s, d.fim);
  };

  // 26 — Prédio à noite: cada janela guarda uma lembrança; no fim as luzes formam um coração.
  A.janelas = async (d) => {
    // Abre a tela e monta a fachada.
    const caixa = K.tela('a-janelas');
    // Cria a peça "chamada" dentro de caixa.
    K.add(caixa, 'p', 'chamada', d.titulo);
    // Cria a peça "fachada" dentro de caixa e guarda com o nome "f".
    const f = K.add(caixa, 'div', 'fachada');
    // Cria todas as janelas da grade.
    const js = [];
    // Repete para cada item da lista.
    PREDIO.forEach((linha) =>
      [...linha].forEach((c) => {
        // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
        const b = U.el('button', 'jan');
        // Diz ao navegador que é um botão comum.
        b.type = 'button';
        // Anota "c" em b, para o CSS ou o teste usarem.
        b.dataset.c = c;
        // Diz se dá para chegar aqui usando o teclado.
        b.tabIndex = -1;
        // Coloca a peça nova dentro de f.
        f.appendChild(b);
        // Coloca mais um item na lista.
        js.push(b);
      })
    );
    // Quatro janelas acesas, espalhadas, guardam as lembranças.
    const certas = [11, 24, 33, 48].map((i) => js[i]);
    // Repete para cada item da lista.
    certas.forEach((b) => {
      // Liga o visual "quente" (veja .quente no CSS).
      b.classList.add('quente');
      // Diz se dá para chegar aqui usando o teclado.
      b.tabIndex = 0;
    });
    // Lugar da lembrança.
    const t = K.add(caixa, 'p', 'texto', d.dica);
    // Cada toque mostra uma lembrança.
    let n = 0;
    // Espera a pessoa tocar em todos os itens da lista.
    await K.todos(certas, (b) => {
      // Desliga o visual "quente".
      b.classList.remove('quente');
      // Liga o visual "acesa" (veja .acesa no CSS).
      b.classList.add('acesa');
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.lembrancas[n++], 110);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(600 + n * 70, 140);
    });
    // Deixa ler a última.
    await U.esperar(2600);
    // Acende o coração, janela por janela.
    for (const b of js.filter((x) => x.dataset.c === '#')) {
      // Liga o visual "acesa" (veja .acesa no CSS).
      b.classList.add('acesa');
      // Espera 0,028 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(28);
    }
    // Frase final e segue.
    await K.fala(t, d.fecho);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 27 — Pôr do sol: arraste o sol até o mar e o céu escurece.
  A.pordosol = async (d) => {
    // Abre a tela cheia com céu, mar e estrelas.
    const caixa = K.tela('a-pordosol cheia');
    // Cria a peça "ceu" dentro de caixa e guarda com o nome "ceu".
    const ceu = K.add(caixa, 'div', 'ceu');
    // Cria a peça "estrelas" dentro de ceu.
    K.add(ceu, 'i', 'estrelas');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "sol".
    const sol = U.el('button', 'astro');
    // Diz ao navegador que é um botão comum.
    sol.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    sol.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de ceu.
    ceu.appendChild(sol);
    // Cria a peça "mar" dentro de ceu.
    K.add(ceu, 'i', 'mar');
    // Texto e distância que o sol anda.
    const t = K.add(ceu, 'p', 'texto');
    // Troca o texto de t.
    t.textContent = d.dica;
    // Guarda este valor com o nome "curso".
    const curso = window.innerHeight * 0.4;
    // Frase já mostrada.
    let marca = -1;
    // Segue o dedo e troca a frase conforme desce.
    await K.arrasta(sol, {
      // Direção do gesto: quanto anda para o lado e para baixo.
      rumo: [0, Math.round(curso)],
      // O que acontece enquanto o dedo anda.
      move: (dx, dy) => {
        // Progresso de 0 a 1.
        const p = Math.max(0, Math.min(1, dy / curso));
        // Move o sol e muda a cor do céu.
        sol.style.transform = 'translateY(' + p * curso + 'px)';
        // Atualiza o valor --p, que o CSS usa.
        ceu.style.setProperty('--p', p);
        // Frase da faixa atual.
        const m = Math.min(d.frases.length - 1, Math.floor(p * d.frases.length));
        // Só reescreve quando muda de faixa.
        if (m !== marca) {
          // Anota até onde já chegou, para não repetir a frase.
          marca = m;
          // Troca o que aparece dentro de t.
          t.innerHTML = U.fmt(d.frases[m]);
        }
      },
      // O que acontece quando o dedo solta.
      solta: (dx, dy) => dy >= curso * 0.8
    });
    // Noite completa.
    ceu.style.setProperty('--p', 1);
    // Muda o movimento de sol.
    sol.style.transform = 'translateY(' + curso + 'px)';
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(330, 500);
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(ceu, d.fim);
  };

  // 28 — Calendário de arrancar: cada folha é um dia comum que valeu.
  A.calendario = async (d) => {
    // Abre a tela e o bloco de folhas.
    const caixa = K.tela('a-calendario');
    // Cria a peça "bloco" dentro de caixa e guarda com o nome "bl".
    const bl = K.add(caixa, 'div', 'bloco');
    // Última folha, embaixo de todas.
    const fim = K.add(bl, 'div', 'folha ultima');
    // Cria a peça "msg" dentro de fim.
    K.add(fim, 'p', 'msg', d.fecho);
    // Cria as folhas, com a primeira por cima.
    const fs = d.dias.map((x, i) => {
      // Cria a peça "folha" dentro de bl e guarda com o nome "f".
      const f = K.add(bl, 'div', 'folha');
      // Muda a camada de f.
      f.style.zIndex = d.dias.length - i;
      // Cria a peça "sem" dentro de f.
      K.add(f, 'b', 'sem', x.s);
      // Cria a peça "número" dentro de f.
      K.add(f, 'strong', '', String(x.n));
      // Cria a peça "msg" dentro de f.
      K.add(f, 'p', 'msg', x.t);
      // Termina aqui e entrega o resultado.
      return f;
    });
    // Dica de arrancar.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Arranca uma folha a cada toque.
    for (const f of fs) {
      // Espera a pessoa tocar em f.
      await K.toque(f);
      // Liga o visual "foi" (veja .foi no CSS).
      f.classList.add('foi');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(240, 90, 'sawtooth', 0.03);
      // Espera 0,5 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(500);
    }
    // Tira a dica e segue para o final.
    dica.remove();
    // Espera 0,9 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(900);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 29 — Vela no escuro: segure para proteger a chama do vento.
  A.vela = async (d) => {
    // Abre a tela com a vela e a chama.
    const caixa = K.tela('a-vela');
    // Cria a peça "castical" dentro de caixa e guarda com o nome "v".
    const v = K.add(caixa, 'div', 'castical');
    // Cria a peça "luz" dentro de v.
    K.add(v, 'i', 'luz');
    // Cria a peça "chama" dentro de v.
    K.add(v, 'i', 'chama');
    // Cria a peça "cera-v" dentro de v.
    K.add(v, 'i', 'cera-v');
    // Frase e área de segurar.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "bt".
    const bt = U.el('button', 'mao-v', U.esc(d.botao));
    // Diz ao navegador que é um botão comum.
    bt.type = 'button';
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(bt);
    // Última frase mostrada.
    let marca = 0;
    // Enquanto segura, a chama cresce e a frase troca.
    await K.segura(bt, 4200, (p) => {
      // Atualiza o valor --p, que o CSS usa.
      v.style.setProperty('--p', p);
      // Arredonda o número para baixo e guarda com o nome "m".
      const m = Math.floor(p * d.frases.length);
      // Se a condição entre parênteses valer, faz o que está nas chaves.
      if (m > marca) {
        // Anota até onde já chegou, para não repetir a frase.
        marca = m;
        // Troca o que aparece dentro de t.
        t.innerHTML = U.fmt(d.frases[m - 1]);
      }
    });
    // Chama firme: tira o botão e fecha.
    bt.remove();
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(392, 400);
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 30 — Cofre com três rodas: acerte os corações e ele abre o bilhete.
  A.cofre = async (d) => {
    // Abre a tela e monta a porta de aço.
    const caixa = K.tela('a-cofre');
    // Cria a peça "chamada" dentro de caixa.
    K.add(caixa, 'p', 'chamada', d.titulo);
    // Cria a peça "porta" dentro de caixa e guarda com o nome "porta".
    const porta = K.add(caixa, 'div', 'porta');
    // Cria a peça "rodas" dentro de porta e guarda com o nome "rodas".
    const rodas = K.add(porta, 'div', 'rodas');
    // Cada roda começa em um símbolo diferente.
    const ws = [1, 3, 2].map((ini) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'roda', RODA[ini]);
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Coloca a peça nova dentro de rodas.
      rodas.appendChild(b);
      // Termina aqui e entrega o resultado.
      return { b, ini };
    });
    // Dica de combinação.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Cada roda precisa de toques até chegar no coração.
    await Promise.all(
      ws.map((w) =>
        K.vezes(w.b, RODA.length - 1 - w.ini, (i) => {
          // Troca o texto de w.b.
          w.b.textContent = RODA[w.ini + i];
          // Desliga o visual "gira".
          w.b.classList.remove('gira');
          // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
          void w.b.offsetWidth;
          // Liga o visual "gira" (veja .gira no CSS).
          w.b.classList.add('gira');
          // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
          K.som(1000, 30, 'square', 0.03);
        })
      )
    );
    // Destrava: som grave e a porta abre.
    dica.remove();
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(90, 300, 'square', 0.1);
    // Faz o celular tremer um pouquinho.
    U.vibra(50);
    // Liga o visual "aberta" (veja .aberta no CSS).
    porta.classList.add('aberta');
    // Espera 1 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(1000);
    // Tira porta da tela.
    porta.remove();
    // Bilhete que estava guardado.
    const b = K.add(caixa, 'div', 'bilhete-c');
    // Cria a peça "texto" dentro de b e guarda com o nome "t".
    const t = K.add(b, 'p');
    // Mostra as frases uma de cada vez.
    await K.frases(t, d.frases);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 31 — Garrafa boiando no mar: toque para pescar a mensagem.
  A.garrafa = async (d) => {
    // Abre a tela cheia.
    const caixa = K.tela('a-garrafa cheia');
    // Ondas em três camadas, cada uma em seu ritmo.
    K.pinta(caixa, (cx, w, h, t) => {
      // Céu.
      const gr = cx.createLinearGradient(0, 0, 0, h);
      // Coloca mais uma cor no degradê.
      gr.addColorStop(0, '#0b2a4a');
      // Coloca mais uma cor no degradê.
      gr.addColorStop(0.6, '#1a6a8c');
      // Escolhe a cor da tinta do pincel.
      cx.fillStyle = gr;
      // Pinta um retângulo.
      cx.fillRect(0, 0, w, h);
      // Cada camada é uma curva preenchida até o fundo.
      [
        [0.58, 16, '#14708f'],
        [0.66, 22, '#0f5a78'],
        [0.76, 28, '#0a4460']
      ].forEach(([b, a, cor], k) => {
        // Começa no canto esquerdo.
        cx.fillStyle = cor;
        // Começa um desenho novo.
        cx.beginPath();
        // Coloca o lápis neste ponto.
        cx.moveTo(0, h);
        // Traça a onda de um lado ao outro.
        for (let x = 0; x <= w + 8; x += 8) cx.lineTo(x, h * b + Math.sin(x / 60 + t * (1 + k * 0.3) + k) * a);
        // Fecha no canto direito e pinta.
        cx.lineTo(w, h);
        // Pinta por dentro do desenho.
        cx.fill();
      });
    });
    // A garrafa, feita de CSS, boia entre as ondas.
    const garr = U.el('button', 'vidro-g', '<i></i>');
    // Diz ao navegador que é um botão comum.
    garr.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    garr.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(garr);
    // Dica de toque.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera pescar.
    await K.toque(garr);
    // Tira dica da tela.
    dica.remove();
    // Liga o visual "pescada" (veja .pescada no CSS).
    garr.classList.add('pescada');
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(660, 220);
    // Espera 0,9 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(900);
    // O pergaminho desenrola.
    const p = K.add(caixa, 'div', 'rolo-p');
    // Cria a peça "texto" dentro de p e guarda com o nome "t".
    const t = K.add(p, 'p');
    // Mostra as frases uma de cada vez.
    await K.frases(t, d.frases);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(p, d.fim);
  };

  // 32 — Areia da praia: limpe a areia, leia, e a onda leva embora.
  A.areia = async (d) => {
    // Abre a tela cheia com a praia e a onda escondida.
    const caixa = K.tela('a-areia cheia');
    // Cria a peça "praia" dentro de caixa e guarda com o nome "p".
    const p = K.add(caixa, 'div', 'praia');
    // Cria a peça "dica" dentro de p e guarda com o nome "dica".
    const dica = K.add(p, 'p', 'dica', d.dica);
    // Pinta a areia fina, com pontinhos.
    const areia = (c, w, h) => {
      // Escolhe a cor da tinta do pincel.
      c.fillStyle = '#e8cf9c';
      // Pinta um retângulo.
      c.fillRect(0, 0, w, h);
      // Repete várias vezes, contando as voltas.
      for (let i = 0; i < 2600; i++) {
        // Escolhe a cor da tinta do pincel.
        c.fillStyle = Math.random() < 0.5 ? 'rgba(150,110,60,.35)' : 'rgba(255,245,215,.5)';
        // Pinta um retângulo.
        c.fillRect(U.rand(0, w), U.rand(0, h), 2, 2);
      }
    };
    // Uma rodada para cada frase.
    for (const f of d.frases) {
      // Frase escrita na areia molhada e a cobertura por cima.
      const w = K.add(p, 'div', 'escrita', f);
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "cv".
      const cv = U.el('canvas');
      // Coloca a peça nova dentro de w.
      w.appendChild(cv);
      // Espera limpar.
      await K.raspa(cv, 0.42, areia);
      // Espera 2,1 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(2100);
      // A onda passa, leva a frase e vai embora.
      const o = K.add(p, 'i', 'onda');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(120, 900, 'sine', 0.05);
      // Espera 1,1 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(1100);
      // Tira w da tela.
      w.remove();
      // Espera 1 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(1000);
      // Tira o da tela.
      o.remove();
    }
    // Tira a dica e mostra o que a onda não leva.
    dica.remove();
    // Cria a peça "texto" dentro de p e guarda com o nome "t".
    const t = K.add(p, 'p', 'texto');
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(p, d.fim);
  };

  // 33 — Extrato do banco do amor: esconde o saldo, lista as entradas e estoura em infinito.
  A.extrato = async (d) => {
    // Abre a tela e monta o cartão do banco.
    const caixa = K.tela('a-extrato');
    // Cria a peça "banco" dentro de caixa e guarda com o nome "app".
    const app = K.add(caixa, 'div', 'banco');
    // Cria a peça "nome" dentro de app.
    K.add(app, 'p', 'nome', d.banco);
    // Saldo escondido e botão do olho.
    const lin = K.add(app, 'div', 'saldo');
    // Cria a peça "texto" dentro de lin.
    K.add(lin, 'span', '', d.rotulo);
    // Cria a peça "texto forte" dentro de lin e guarda com o nome "v".
    const v = K.add(lin, 'b', '', '••••••');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "olho".
    const olho = U.el('button', 'olho', '👁');
    // Diz ao navegador que é um botão comum.
    olho.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    olho.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de lin.
    lin.appendChild(olho);
    // Lista das movimentações.
    const ul = K.add(app, 'ul', 'mov');
    // Cria a peça "dica" dentro de caixa e guarda com o nome "dica".
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera ver o saldo.
    await K.toque(olho);
    // Tira dica da tela.
    dica.remove();
    // Tira olho da tela.
    olho.remove();
    // Cada movimentação entra e o saldo sobe.
    let total = 0;
    // Repete para cada item da lista.
    for (const [nome, val] of d.lancamentos) {
      // Cria a peça "item da lista" dentro de ul e guarda com o nome "li".
      const li = K.add(ul, 'li', 'entra');
      // Coloca a peça nova dentro de li.
      li.appendChild(U.el('span', '', U.esc(nome)));
      // Coloca a peça nova dentro de li.
      li.appendChild(U.el('b', val > 0 ? 'mais' : 'menos', (val > 0 ? '+' : '') + val));
      // Soma mais um pouco em total.
      total += val;
      // Troca o texto de v.
      v.textContent = total + ' ' + d.moeda;
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(val > 0 ? 880 : 300, 80, 'triangle');
      // Espera 0,9 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(900);
    }
    // Saldo final vira infinito.
    await U.esperar(400);
    // Troca o texto de v.
    v.textContent = '∞ ' + d.moeda;
    // Liga o visual "rico" (veja .rico no CSS).
    v.classList.add('rico');
    // Cria a peça "nota" dentro de app.
    K.add(app, 'p', 'nota entra', d.nota);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 34 — Ampulheta: vire para o tempo voltar, porque com ela nunca é suficiente.
  A.ampulheta = async (d) => {
    // Abre a tela e monta a ampulheta.
    const caixa = K.tela('a-ampulheta');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "a".
    const a = U.el(
      'button',
      'vidro-a',
      '<svg viewBox="0 0 120 200" aria-hidden="true"><path class="moldura-a" d="M16 8H104M16 192H104"/><path class="casca" d="M26 12C26 62 52 82 56 100C52 118 26 138 26 188H94C94 138 68 118 64 100C68 82 94 62 94 12z"/><path class="sup" d="M30 16C30 58 54 80 60 98C66 80 90 58 90 16z"/><path class="inf" d="M30 186C34 148 52 128 60 118C68 128 86 148 90 186z"/><line class="fio-a" x1="60" y1="98" x2="60" y2="186"/></svg>'
    );
    // Diz ao navegador que é um botão comum.
    a.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    a.setAttribute('aria-label', d.botao);
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(a);
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto');
    // Cria a peça "dica" dentro de caixa e guarda com o nome "dica".
    const dica = K.add(caixa, 'p', 'dica', d.botao);
    // Quantas viradas já foram.
    let giro = 0;
    // Uma virada para cada frase.
    for (const f of d.frases) {
      // Espera tocar e gira meia volta.
      await K.toque(a);
      // Esconde dica.
      dica.hidden = true;
      // Soma mais um pouco em giro.
      giro += 180;
      // Muda o movimento de a.
      a.style.transform = 'rotate(' + giro + 'deg)';
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(300, 200, 'triangle');
      // Reinicia a areia caindo, com a ampulheta já virada.
      a.classList.remove('cai');
      // Espera 0,7 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(700);
      // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
      void a.offsetWidth;
      // Liga o visual "cai" (veja .cai no CSS).
      a.classList.add('cai');
      // Mostra a frase e reabre a dica.
      await K.fala(t, f);
      // Espera 0,6 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(600);
      // Mostra dica.
      dica.hidden = false;
    }
    // Tira a dica e segue para o final.
    dica.remove();
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 35 — Árvore que cresce enquanto você segura: o que a gente cuida floresce.
  A.broto = async (d) => {
    // Abre a tela com o quadro da árvore.
    const caixa = K.tela('a-broto');
    // Cria a peça "quadro" dentro de caixa e guarda com o nome "q".
    const q = K.add(caixa, 'div', 'quadro');
    // Guarda este valor com o nome "cresce".
    let cresce = 0;
    // Desenha a árvore do tamanho atual.
    K.pinta(q, (cx, w, h) => {
      // Apaga o desenho anterior.
      cx.clearRect(0, 0, w, h);
      // Escolhe a cor do traço.
      cx.strokeStyle = '#6b4a2b';
      // Deixa as pontas do traço redondas.
      cx.lineCap = 'round';
      // Usa a ajuda "galho" (ela está definida neste arquivo).
      galho(cx, w / 2, h - 6, -Math.PI / 2, h * 0.25, 7, cresce * 7.2);
    });
    // Frase e área de segurar.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Cria um botão dentro de caixa e guarda com o nome "bt".
    const bt = K.botao(caixa, d.botao);
    // Última frase mostrada.
    let marca = 0;
    // Enquanto segura, a árvore cresce.
    await K.segura(bt, 5200, (p) => {
      // Guarda o quanto a árvore cresceu.
      cresce = p;
      // Arredonda o número para baixo e guarda com o nome "m".
      const m = Math.floor(p * d.frases.length);
      // Se a condição entre parênteses valer, faz o que está nas chaves.
      if (m > marca) {
        // Anota até onde já chegou, para não repetir a frase.
        marca = m;
        // Troca o que aparece dentro de t.
        t.innerHTML = U.fmt(d.frases[m - 1]);
      }
    });
    // Árvore pronta: tira o botão e fecha.
    bt.remove();
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 36 — Borboletas: pegue cada uma e leia a palavra que ela carrega.
  A.borboletas = async (d) => {
    // Abre a tela com a campina e o varal das palavras.
    const caixa = K.tela('a-borboletas cheia');
    // Cria a peça "campina" dentro de caixa e guarda com o nome "c".
    const c = K.add(caixa, 'div', 'campina');
    // Cria a peça "varal" dentro de c e guarda com o nome "v".
    const v = K.add(c, 'div', 'varal');
    // Cria a peça "dica" dentro de c e guarda com o nome "dica".
    const dica = K.add(c, 'p', 'dica', d.dica);
    // Lugares das borboletas, em porcentagem.
    const POS = [
      [18, 34],
      [70, 28],
      [40, 50],
      [76, 58],
      [20, 68]
    ];
    // Cria cada borboleta com duas asas.
    const bs = d.palavras.map((_, i) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'borb', ASA);
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Muda a distância da esquerda de b.
      b.style.left = POS[i][0] + '%';
      // Muda a distância de cima de b.
      b.style.top = POS[i][1] + '%';
      // Atualiza o valor --cor, que o CSS usa.
      b.style.setProperty('--cor', 'hsl(' + (320 + i * 28) + ' 80% 62%)');
      // Muda o atraso da animação de b.
      b.style.animationDelay = -i * 0.7 + 's';
      // Coloca a peça nova dentro de c.
      c.appendChild(b);
      // Termina aqui e entrega o resultado.
      return b;
    });
    // Cada toque leva a palavra para o varal.
    await K.todos(bs, (b, i) => {
      // Liga o visual "pega" (veja .pega no CSS).
      b.classList.add('pega');
      // Esconde dica.
      dica.hidden = true;
      // Cria a peça "texto" dentro de v.
      K.add(v, 'span', 'entra', d.palavras[i]);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(700 + i * 90, 120);
    });
    // Frase final.
    const t = K.add(c, 'p', 'texto');
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(c, d.fim);
  };

  // 37 — Discoteca: toque na bola de espelhos para mudar a luz e a frase.
  A.discoteca = async (d) => {
    // Abre a tela cheia, a pista e a bola.
    const caixa = K.tela('a-discoteca cheia');
    // Cria a peça "salao" dentro de caixa e guarda com o nome "s".
    const s = K.add(caixa, 'div', 'salao');
    // Cria a peça "feixes" dentro de s.
    K.add(s, 'i', 'feixes');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "bola".
    const bola = U.el('button', 'bola');
    // Diz ao navegador que é um botão comum.
    bola.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    bola.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de s.
    s.appendChild(bola);
    // Piso quadriculado, com 40 ladrilhos piscando em tempos diferentes.
    const piso = K.add(s, 'div', 'piso');
    // Repete várias vezes, contando as voltas.
    for (let i = 0; i < 40; i++) {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "q".
      const q = U.el('i');
      // Muda o atraso da animação de q.
      q.style.animationDelay = -((i * 37) % 11) * 0.2 + 's';
      // Coloca a peça nova dentro de piso.
      piso.appendChild(q);
    }
    // Frase e dica.
    const t = K.add(s, 'p', 'texto');
    // Cria a peça "dica" dentro de s e guarda com o nome "dica".
    const dica = K.add(s, 'p', 'dica', d.dica);
    // Cada toque gira a cor do salão e troca a frase.
    await K.vezes(bola, d.frases.length, (i) => {
      // Esconde dica.
      dica.hidden = true;
      // Atualiza o valor --h, que o CSS usa.
      s.style.setProperty('--h', i * 70);
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.frases[i - 1], 110);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(392 + i * 49, 160, 'triangle');
    });
    // Deixa ler a última.
    await U.esperar(2400);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(s, d.fim);
  };

  // 38 — Fogos de artifício: toque no céu para lançar.
  A.fogos = async (d) => {
    // Abre a tela cheia, com a lista de faíscas e foguetes.
    const caixa = K.tela('a-fogos cheia');
    // Cria a lista "fa".
    const fa = [];
    // Cria a lista "fo".
    const fo = [];
    // Desenha o céu a cada quadro.
    const v = K.pinta(caixa, (cx, w, h) => {
      // Rastro: cobre o quadro anterior com véu escuro.
      cx.fillStyle = 'rgba(5,4,20,.22)';
      // Pinta um retângulo.
      cx.fillRect(0, 0, w, h);
      // Move cada foguete; ao chegar no alto, ele estoura.
      for (let i = fo.length - 1; i >= 0; i--) {
        // Guarda este valor com o nome "f".
        const f = fo[i];
        // Coloca o floco em outro lugar.
        f.y -= 9;
        // Escolhe a cor da tinta do pincel.
        cx.fillStyle = '#ffe9a8';
        // Pinta um retângulo.
        cx.fillRect(f.x, f.y, 2, 9);
        // Se a condição entre parênteses valer, faz o que está nas chaves.
        if (f.y <= f.alvo) {
          // Usa a ajuda "estoura" (ela está definida neste arquivo).
          estoura(fa, f.x, f.alvo);
          // Tira um item da lista.
          fo.splice(i, 1);
          // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
          K.som(90, 280, 'triangle', 0.1);
        }
      }
      // Move e apaga cada faísca.
      for (let i = fa.length - 1; i >= 0; i--) {
        // Guarda este valor com o nome "p".
        const p = fa[i];
        // Move a partícula para o lado.
        p.x += p.vx;
        // Move a partícula para cima ou para baixo.
        p.y += p.vy;
        // Escolhe a velocidade para cima ou para baixo.
        p.vy += 0.035;
        // Escolhe a velocidade para o lado.
        p.vx *= 0.985;
        // Tira um pouco de p.vida.
        p.vida -= 0.012;
        // Se a condição entre parênteses valer, faz o que está nas chaves.
        if (p.vida <= 0) {
          // Tira um item da lista.
          fa.splice(i, 1);
          // Pula para a próxima volta da repetição.
          continue;
        }
        // Escolhe a cor da tinta do pincel.
        cx.fillStyle = 'hsla(' + p.cor + ' 95% 66% / ' + p.vida + ')';
        // Pinta um retângulo.
        cx.fillRect(p.x, p.y, 2.4, 2.4);
      }
    });
    // Texto por cima, e a área de toque.
    const s = K.add(caixa, 'div', 'sobre');
    // Cria a peça "texto" dentro de s e guarda com o nome "t".
    const t = K.add(s, 'p', 'texto', d.abre);
    // Cria a peça "toque-ceu" dentro de caixa e guarda com o nome "area".
    const area = K.add(caixa, 'div', 'toque-ceu');
    // Lança um foguete na posição do dedo.
    area.addEventListener('pointerdown', (e) =>
      fo.push({ x: e.clientX, y: v.h, alvo: Math.min(e.clientY, v.h * 0.6) })
    );
    // Um foguete por frase.
    await K.vezes(area, d.frases.length, (i) => {
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.frases[i - 1], 110);
    });
    // Deixa ler a última e tira a área de toque.
    await U.esperar(2600);
    // Tira area da tela.
    area.remove();
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(s, d.fim);
  };

  // 39 — Letreiro de neon: puxe a cordinha e as letras acendem falhando.
  A.neon = async (d) => {
    // Abre a tela cheia com a parede de tijolos.
    const caixa = K.tela('a-neon cheia');
    // Cria a peça "muro" dentro de caixa e guarda com o nome "m".
    const m = K.add(caixa, 'div', 'muro');
    // Cada letra do letreiro é um pedaço separado.
    const placa = K.add(m, 'div', 'placa');
    // Passa por cada item da lista e monta uma lista nova e guarda com o nome "ls".
    const ls = [...d.letreiro].map((c) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "s".
      const s = U.el('span', '', U.esc(c));
      // Coloca a peça nova dentro de placa.
      placa.appendChild(s);
      // Termina aqui e entrega o resultado.
      return s;
    });
    // Segunda linha, em letra cursiva.
    const sub = K.add(m, 'p', 'sub-n', d.sub);
    // Cordinha que se puxa para baixo.
    const fio = U.el('button', 'cordinha', '<i></i>');
    // Diz ao navegador que é um botão comum.
    fio.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    fio.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de m.
    m.appendChild(fio);
    // Cria a peça "dica" dentro de m e guarda com o nome "dica".
    const dica = K.add(m, 'p', 'dica', d.dica);
    // Espera puxar.
    await K.arrasta(fio, {
      // Direção do gesto: quanto anda para o lado e para baixo.
      rumo: [0, 90],
      // O que acontece enquanto o dedo anda.
      move: (dx, dy) => {
        // Muda o movimento de fio.
        fio.style.transform = 'translateY(' + Math.max(0, Math.min(90, dy)) + 'px)';
      },
      // O que acontece quando o dedo solta.
      solta: (dx, dy) => {
        // Muda o movimento de fio.
        fio.style.transform = 'none';
        // Termina aqui e entrega o resultado.
        return dy > 40;
      }
    });
    // Clique do interruptor.
    dica.remove();
    // Tira fio da tela.
    fio.remove();
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(1400, 40, 'square', 0.05);
    // Acende letra por letra.
    for (const s of ls) {
      // Liga o visual "liga" (veja .liga no CSS).
      s.classList.add('liga');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(90, 80, 'sawtooth', 0.02);
      // Espera 0,23 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(230);
    }
    // Segunda linha e frases.
    sub.classList.add('liga');
    // Espera 0,9 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(900);
    // Cria a peça "texto" dentro de m e guarda com o nome "t".
    const t = K.add(m, 'p', 'texto');
    // Mostra as frases uma de cada vez.
    await K.frases(t, d.frases);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(m, d.fim);
  };

  // 40 — Abajur: apague a luz e o teto se enche de estrelas que brilham no escuro.
  A.abajur = async (d) => {
    // Abre a tela cheia com o quarto.
    const caixa = K.tela('a-abajur cheia');
    // Cria a peça "quarto" dentro de caixa e guarda com o nome "q".
    const q = K.add(caixa, 'div', 'quarto');
    // Estrelinhas do teto, sorteadas uma vez.
    const teto = K.add(q, 'div', 'teto');
    // Repete várias vezes, contando as voltas.
    for (let i = 0; i < 60; i++) {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "e".
      const e = U.el('i');
      // Muda a distância da esquerda de e.
      e.style.left = U.rand(2, 98) + '%';
      // Muda a distância de cima de e.
      e.style.top = U.rand(2, 62) + '%';
      // Muda o atraso da animação de e.
      e.style.animationDelay = U.rand(0, 3) + 's';
      // Coloca a peça nova dentro de teto.
      teto.appendChild(e);
    }
    // Abajur e frase de abertura.
    const l = U.el('button', 'lampada', '<i></i><b></b>');
    // Diz ao navegador que é um botão comum.
    l.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    l.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de q.
    q.appendChild(l);
    // Cria a peça "texto" dentro de q e guarda com o nome "t".
    const t = K.add(q, 'p', 'texto', d.abre);
    // Cria a peça "dica" dentro de q e guarda com o nome "dica".
    const dica = K.add(q, 'p', 'dica', d.dica);
    // Espera apagar a luz.
    await K.toque(l);
    // Tira dica da tela.
    dica.remove();
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(1300, 40, 'square', 0.05);
    // Liga o visual "apagou" (veja .apagou no CSS).
    q.classList.add('apagou');
    // Espera 1,5 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(1500);
    // Frases no escuro.
    await K.frases(t, d.frases);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(q, d.fim);
  };
  // Fecha a caixa e já roda tudo.
})(window);
