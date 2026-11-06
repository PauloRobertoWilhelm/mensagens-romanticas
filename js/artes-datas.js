/* ==========================================================
   artes-datas.js — uma animação própria para cada link de datas especiais (ids 61 a 80).
   Os textos ficam em data/mensagens-datas.js; aqui só há desenho e movimento.
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

  // Coração em pixels: # é pixel aceso.
  const PIXEL = [
    '..##...##..',
    '.####.####.',
    '###########',
    '###########',
    '.#########.',
    '..#######..',
    '...#####...',
    '....###....',
    '.....#.....'
  ];

  // Desenha a Lua em (x,y) com raio r; p de 0 a 1 percorre as fases, da nova à nova.
  const lua = (cx, x, y, r, p) => {
    // Disco iluminado.
    cx.fillStyle = '#f4efd6';
    // Começa um desenho novo.
    cx.beginPath();
    // Desenha um círculo.
    cx.arc(x, y, r, 0, 6.3);
    // Pinta por dentro do desenho.
    cx.fill();
    // Guarda o estado para poder espelhar na fase minguante.
    cx.save();
    // Muda o ponto de partida do desenho.
    cx.translate(x, y);
    // Se a condição entre parênteses valer: espelha ou muda o tamanho do desenho.
    if (p > 0.5) cx.scale(-1, 1);
    // Distância até a lua cheia; k diz o quanto a sombra invade.
    const q = p > 0.5 ? 1 - p : p;
    // Faz uma conta de ângulo e guarda com o nome "k".
    const k = Math.cos(q * 2 * Math.PI);
    // Sombra: meio círculo à esquerda, voltando pela curva da sombra.
    cx.fillStyle = '#10143a';
    // Começa um desenho novo.
    cx.beginPath();
    // Desenha um círculo.
    cx.arc(0, 0, r + 1, -Math.PI / 2, Math.PI / 2, true);
    // Desenha uma forma oval.
    cx.ellipse(0, 0, Math.abs(k) * (r + 1), r + 1, 0, Math.PI / 2, -Math.PI / 2, k > 0);
    // Pinta por dentro do desenho.
    cx.fill();
    // Volta ao normal.
    cx.restore();
  };

  // 61 — Bolo com velas: apague uma a uma, cada vela é um desejo.
  A.bolo = async (d) => {
    // Abre a tela e monta o bolo em dois andares.
    const caixa = K.tela('a-bolo');
    // Cria a peça "torta" dentro de caixa e guarda com o nome "b".
    const b = K.add(caixa, 'div', 'torta');
    // Cria a peça "velas" dentro de b e guarda com o nome "velas".
    const velas = K.add(b, 'div', 'velas');
    // Cinco velas, cada uma é um botão.
    const vs = d.desejos.map(() => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "v".
      const v = U.el('button', 'velinha', '<i></i>');
      // Diz ao navegador que é um botão comum.
      v.type = 'button';
      // Coloca a peça nova dentro de velas.
      velas.appendChild(v);
      // Termina aqui e entrega o resultado.
      return v;
    });
    // Andares do bolo.
    K.add(b, 'i', 'andar um');
    // Cria a peça "andar dois" dentro de b.
    K.add(b, 'i', 'andar dois');
    // Frase.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Cada vela apagada mostra um desejo.
    let n = 0;
    // Espera a pessoa tocar em todos os itens da lista.
    await K.todos(vs, (v) => {
      // Liga o visual "apagou" (veja .apagou no CSS).
      v.classList.add('apagou');
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.desejos[n++], 100);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(300 + n * 60, 120, 'triangle');
    });
    // Deixa ler e comemora.
    await U.esperar(2300);
    // Solta uma festa de partículas.
    Fundo.festa(5);
    // Repete para cada item da lista.
    [392, 392, 440, 392, 523, 494].forEach((f, i) => setTimeout(() => K.som(f, 260), i * 280));
    // Frase final e segue.
    await K.fala(t, d.fecho);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 62 — Balões: estoure cada um e leia o que estava dentro.
  A.baloes = async (d) => {
    // Abre a tela cheia com o céu.
    const caixa = K.tela('a-baloes cheia');
    // Cria a peça "ceu-b" dentro de caixa e guarda com o nome "c".
    const c = K.add(caixa, 'div', 'ceu-b');
    // Lugares dos balões.
    const POS = [
      [14, 42],
      [58, 36],
      [36, 18],
      [72, 12],
      [10, 12]
    ];
    // Cria os balões.
    const bs = d.desejos.map((_, i) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'balao-d');
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Muda a distância da esquerda de b.
      b.style.left = POS[i][0] + '%';
      // Muda a distância de cima de b.
      b.style.top = POS[i][1] + '%';
      // Atualiza o valor --cor, que o CSS usa.
      b.style.setProperty('--cor', 'hsl(' + (i * 66 + 330) + ' 84% 62%)');
      // Muda o atraso da animação de b.
      b.style.animationDelay = -i * 0.9 + 's';
      // Coloca a peça nova dentro de c.
      c.appendChild(b);
      // Termina aqui e entrega o resultado.
      return b;
    });
    // Frase embaixo.
    const t = K.add(c, 'p', 'texto', d.abre);
    // Cada balão estoura e solta uma frase.
    let n = 0;
    // Espera a pessoa tocar em todos os itens da lista.
    await K.todos(bs, (b) => {
      // Comanda o navegador do teste (getBoundingClientRect) e guarda com o nome "r".
      const r = b.getBoundingClientRect();
      // Solta partículas neste ponto da tela.
      Fundo.explodirEm(r.left + r.width / 2, r.top + r.height / 2, 20);
      // Liga o visual "pop" (veja .pop no CSS).
      b.classList.add('pop');
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.desejos[n++], 100);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(900, 60, 'square', 0.08);
    });
    // Deixa ler e fecha.
    await U.esperar(2300);
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(c, d.fim);
  };

  // 63 — Doze meses em círculo: segure e os corações acendem até fechar o ano.
  A.doze = async (d) => {
    // Abre a tela e monta o anel.
    const caixa = K.tela('a-doze');
    // Cria a peça "anel-m" dentro de caixa e guarda com o nome "anel".
    const anel = K.add(caixa, 'div', 'anel-m');
    // Doze corações em volta do círculo.
    const cs = Array.from({ length: 12 }, (_, i) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "e".
      const e = U.el('i', '', '♥');
      // Muda o movimento de e.
      e.style.transform = 'rotate(' + i * 30 + 'deg) translateY(-132px) rotate(' + -i * 30 + 'deg)';
      // Coloca a peça nova dentro de anel.
      anel.appendChild(e);
      // Termina aqui e entrega o resultado.
      return e;
    });
    // Centro do anel é o botão de segurar.
    const c = U.el('button', 'miolo-m', '<b>0</b><span>' + U.esc(d.unidade) + '</span>');
    // Diz ao navegador que é um botão comum.
    c.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    c.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de anel.
    anel.appendChild(c);
    // Frase.
    const t = K.add(caixa, 'p', 'texto', d.dica);
    // Última marca mostrada.
    let marca = -1;
    // Acende mês a mês enquanto segura.
    await K.segura(c, 5200, (p) => {
      // Mês alcançado.
      const m = Math.floor(p * 12);
      // Troca o texto de U.$('b', c).
      U.$('b', c).textContent = m;
      // Acende os corações até esse mês.
      cs.forEach((e, i) => e.classList.toggle('on', i < m));
      // A cada trimestre, uma frase nova.
      const f = Math.floor(m / 3);
      // Se a condição entre parênteses valer, faz o que está nas chaves.
      if (f > marca && f < d.frases.length) {
        // Anota até onde já chegou, para não repetir a frase.
        marca = f;
        // Troca o que aparece dentro de t.
        t.innerHTML = U.fmt(d.frases[f]);
        // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
        K.som(500 + f * 80, 120);
      }
    });
    // Ano completo.
    U.$('b', c).textContent = '12';
    // Solta uma festa de partículas.
    Fundo.festa(4);
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 64 — Brinde: arraste uma taça até a outra e faça tim-tim.
  A.brinde = async (d) => {
    // Abre a tela e monta as duas taças.
    const caixa = K.tela('a-brinde');
    // Cria a peça "mesa-b" dentro de caixa e guarda com o nome "m".
    const m = K.add(caixa, 'div', 'mesa-b');
    // Taça que se arrasta.
    const a = U.el('button', 'taca esq', '<i></i>');
    // Diz ao navegador que é um botão comum.
    a.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    a.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de m.
    m.appendChild(a);
    // Taça parada.
    const b = K.add(m, 'div', 'taca dir');
    // Cria a peça "enfeite" dentro de b.
    K.add(b, 'i');
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Cria a peça "dica" dentro de caixa e guarda com o nome "dica".
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera aproximar as taças.
    await K.arrasta(a, {
      // Direção do gesto: quanto anda para o lado e para baixo.
      rumo: [90, 0],
      // O que acontece enquanto o dedo anda.
      move: (dx) => {
        // Muda o movimento de a.
        a.style.transform = 'translateX(' + Math.max(0, Math.min(84, dx)) + 'px) rotate(8deg)';
      },
      // O que acontece quando o dedo solta.
      solta: (dx) => {
        // Se a condição entre parênteses valer, para por aqui.
        if (dx > 50) return true;
        // Muda o movimento de a.
        a.style.transform = '';
        // Termina aqui e entrega o resultado.
        return false;
      }
    });
    // Tim-tim: encosta, toca o som e solta brilho.
    dica.remove();
    // Muda o movimento de a.
    a.style.transform = 'translateX(84px) rotate(8deg)';
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(2093, 500);
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(2637, 420);
    // Mede o tamanho e o lugar da peça e guarda com o nome "r".
    const r = a.getBoundingClientRect();
    // Solta partículas neste ponto da tela.
    Fundo.explodirEm(r.right, r.top + 10, 30);
    // Frases do brinde.
    await K.frases(t, d.frases);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 65 — Fases da Lua: deslize o mês e veja a Lua mudar, porque o amor não muda.
  A.luas = async (d) => {
    // Abre a tela e o quadro da Lua; 'fase' guarda a posição atual.
    const caixa = K.tela('a-luas');
    // Cria a peça "quadro-l" dentro de caixa e guarda com o nome "q".
    const q = K.add(caixa, 'div', 'quadro-l');
    // Guarda este valor com o nome "fase".
    let fase = 0.04;
    // Desenha a Lua da fase atual.
    K.pinta(q, (cx, w, h) => {
      // Apaga o desenho anterior.
      cx.clearRect(0, 0, w, h);
      // Usa a ajuda "lua" (ela está definida neste arquivo).
      lua(cx, w / 2, h / 2, Math.min(w, h) * 0.42, fase);
    });
    // Frase e trilho.
    const t = K.add(caixa, 'p', 'texto');
    // Troca o texto de t.
    t.textContent = d.dica;
    // Cria a peça "trilho-l2" dentro de caixa e guarda com o nome "tr".
    const tr = K.add(caixa, 'div', 'trilho-l2');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "cabo".
    const cabo = U.el('button', 'cabo-l', '☾');
    // Diz ao navegador que é um botão comum.
    cabo.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    cabo.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de tr.
    tr.appendChild(cabo);
    // Distância que o cabo pode andar.
    const max = () => tr.clientWidth - cabo.offsetWidth;
    // Última frase mostrada.
    let marca = -1;
    // Acompanha o dedo e troca a fase.
    await K.arrasta(cabo, {
      // Direção do gesto: quanto anda para o lado e para baixo.
      rumo: [300, 0],
      // O que acontece enquanto o dedo anda.
      move: (dx) => {
        // Progresso de 0 a 1.
        const p = Math.max(0, Math.min(1, dx / max()));
        // Move o cabo e a Lua.
        cabo.style.transform = 'translateX(' + p * max() + 'px)';
        // Guarda a fase atual da Lua.
        fase = 0.04 + p * 0.92;
        // Frase da fase atual.
        const m = Math.min(d.frases.length - 1, Math.floor(p * d.frases.length));
        // Só reescreve quando muda.
        if (m !== marca) {
          // Anota até onde já chegou, para não repetir a frase.
          marca = m;
          // Troca o que aparece dentro de t.
          t.innerHTML = U.fmt(d.frases[m]);
        }
      },
      // O que acontece quando o dedo solta.
      solta: (dx) => dx >= max() * 0.8
    });
    // Fecha com a frase final.
    tr.remove();
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 66 — Cupido: puxe o arco para baixo e solte a flecha.
  A.cupido = async (d) => {
    // Abre a tela cheia com o alvo e o arco.
    const caixa = K.tela('a-cupido cheia');
    // Cria a peça "campo-c" dentro de caixa e guarda com o nome "c".
    const c = K.add(caixa, 'div', 'campo-c');
    // Cria a peça "alvo-c" dentro de c e guarda com o nome "alvo".
    const alvo = K.add(c, 'b', 'alvo-c', '♥');
    // Cria a peça "texto" dentro de c e guarda com o nome "t".
    const t = K.add(c, 'p', 'texto');
    // Flecha que voa.
    const fl = K.add(c, 'i', 'flecha');
    // Arco.
    const arco = U.el(
      'button',
      'arco-c',
      '<svg viewBox="0 0 160 70" aria-hidden="true"><path class="madeira" d="M6 62Q80 -18 154 62"/><path class="corda" d="M6 62Q80 62 154 62"/></svg>'
    );
    // Diz ao navegador que é um botão comum.
    arco.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    arco.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de c.
    c.appendChild(arco);
    // Procura uma peça na tela e guarda com o nome "corda".
    const corda = U.$('.corda', arco);
    // Dica.
    const dica = K.add(c, 'p', 'dica', d.dica);
    // Um disparo para cada frase.
    for (const f of d.frases) {
      // Puxar a corda deforma o traço e encolhe a flecha para perto do arco.
      await K.arrasta(arco, {
        // Direção do gesto: quanto anda para o lado e para baixo.
        rumo: [0, 90],
        // O que acontece enquanto o dedo anda.
        move: (dx, dy) => {
          // Pega o maior número e guarda com o nome "y".
          const y = Math.max(0, Math.min(90, dy));
          // Muda o atributo "d" da peça.
          corda.setAttribute('d', 'M6 62Q80 ' + (62 + y) + ' 154 62');
          // Muda o movimento de fl.
          fl.style.transform = 'translateY(' + y + 'px)';
        },
        // O que acontece quando o dedo solta.
        solta: (dx, dy) => {
          // Muda o atributo "d" da peça.
          corda.setAttribute('d', 'M6 62Q80 62 154 62');
          // Muda o movimento de fl.
          fl.style.transform = '';
          // Termina aqui e entrega o resultado.
          return dy > 40;
        }
      });
      // Lança a flecha.
      dica.hidden = true;
      // Desliga o visual "voa".
      fl.classList.remove('voa');
      // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
      void fl.offsetWidth;
      // Liga o visual "voa" (veja .voa no CSS).
      fl.classList.add('voa');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(700, 180, 'triangle');
      // Espera 0,52 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(520);
      // Acerta o coração.
      alvo.classList.remove('acerto');
      // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
      void alvo.offsetWidth;
      // Liga o visual "acerto" (veja .acerto no CSS).
      alvo.classList.add('acerto');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(180, 200, 'square', 0.08);
      // Escreve o texto palavra por palavra e espera terminar.
      await K.fala(t, f);
      // Espera 0,8 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(800);
    }
    // Guarda o arco e a flecha e segue para o final.
    arco.remove();
    // Tira fl da tela.
    fl.remove();
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(c, d.fim);
  };

  // 67 — Cadeado do amor na ponte: leve a chave até o cadeado.
  A.cadeado = async (d) => {
    // Abre a tela com a grade da ponte e o cadeado aberto.
    const caixa = K.tela('a-cadeado');
    // Cria a peça "grade-c" dentro de caixa e guarda com o nome "g2".
    const g2 = K.add(caixa, 'div', 'grade-c');
    // Cria a peça "trava" dentro de g2 e guarda com o nome "c".
    const c = K.add(g2, 'div', 'trava');
    // Cria a peça "argola" dentro de c.
    K.add(c, 'i', 'argola');
    // Cria a peça "corpo-c" dentro de c.
    K.add(c, 'b', 'corpo-c', d.iniciais);
    // Chave que se arrasta.
    const ch = U.el('button', 'chave', '<i></i>');
    // Diz ao navegador que é um botão comum.
    ch.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    ch.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de g2.
    g2.appendChild(ch);
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Cria a peça "dica" dentro de caixa e guarda com o nome "dica".
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera levar a chave para cima.
    await K.arrasta(ch, {
      // Direção do gesto: quanto anda para o lado e para baixo.
      rumo: [0, -130],
      // O que acontece enquanto o dedo anda.
      move: (dx, dy) => {
        // Muda o movimento de ch.
        ch.style.transform = 'translate(' + dx + 'px,' + Math.min(0, dy) + 'px)';
      },
      // O que acontece quando o dedo solta.
      solta: (dx, dy) => {
        // Se a condição entre parênteses valer, para por aqui.
        if (dy < -70) return true;
        // Muda o movimento de ch.
        ch.style.transform = '';
        // Termina aqui e entrega o resultado.
        return false;
      }
    });
    // Tranca o cadeado.
    dica.remove();
    // Muda a velocidade da mudança de ch.
    ch.style.transition = 'transform 1.1s ease-in, opacity 1s';
    // Muda o movimento de ch.
    ch.style.transform = 'translate(120px, 420px) rotate(220deg)';
    // Muda a transparência de ch.
    ch.style.opacity = 0;
    // Liga o visual "trancado" (veja .trancado no CSS).
    c.classList.add('trancado');
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(1200, 70, 'square', 0.07);
    // Faz o celular tremer um pouquinho.
    U.vibra(40);
    // Tira a chave da tela depois que ela cai, para não sobrar rolagem.
    setTimeout(() => ch.remove(), 1200);
    // Frases.
    await K.frases(t, d.frases);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 68 — Fliperama: insira as fichas e o coração de pixels se monta.
  A.pixel = async (d) => {
    // Abre a tela com o letreiro e a grade.
    const caixa = K.tela('a-pixel');
    // Cria a peça "score" dentro de caixa.
    K.add(caixa, 'p', 'score', d.score);
    // Cria a peça "tela-p" dentro de caixa e guarda com o nome "gr".
    const gr = K.add(caixa, 'div', 'tela-p');
    // Cria os pixels; só os do coração serão acesos.
    const px = [];
    // Repete para cada item da lista.
    PIXEL.forEach((l) =>
      [...l].forEach((c) => {
        // Cria uma peça nova, ainda fora da tela e guarda com o nome "e".
        const e = U.el('i');
        // Coloca a peça nova dentro de gr.
        gr.appendChild(e);
        // Se a condição entre parênteses valer: coloca mais um item na lista.
        if (c === '#') px.push(e);
      })
    );
    // Botão de ficha e frase.
    const b = K.botao(caixa, d.ficha);
    // Cria a peça "msg-p" dentro de caixa e guarda com o nome "t".
    const t = K.add(caixa, 'p', 'msg-p', d.abre);
    // Um terço do coração por ficha.
    const parte = Math.ceil(px.length / d.frases.length);
    // Cada ficha acende uma parte.
    await K.vezes(b, d.frases.length, (i) => {
      // Repete para cada item da lista.
      px.slice((i - 1) * parte, i * parte).forEach((e, k) => setTimeout(() => e.classList.add('on'), k * 16));
      // Troca o que aparece dentro de t.
      t.innerHTML = U.fmt(d.frases[i - 1]);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(660 + i * 130, 120, 'square', 0.05);
    });
    // Música de vitória.
    b.remove();
    // Repete para cada item da lista.
    [523, 659, 784, 1047, 784, 1047].forEach((f, i) => setTimeout(() => K.som(f, 120, 'square', 0.05), i * 120));
    // Espera 1,6 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(1600);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 69 — Árvore de Natal: pendure as bolas e ligue a estrela.
  A.arvore = async (d) => {
    // Abre a tela e monta a árvore em três camadas.
    const caixa = K.tela('a-arvore');
    // Cria a peça "pinheiro" dentro de caixa e guarda com o nome "a".
    const a = K.add(caixa, 'div', 'pinheiro');
    // Cria a peça "tronco" dentro de a.
    K.add(a, 'i', 'tronco');
    // Repete para cada item da lista.
    ['c1', 'c2', 'c3'].forEach((c) => K.add(a, 'i', 'copa ' + c));
    // Estrela no topo.
    const st = K.add(a, 'b', 'topo-a', '★');
    // Lugares das bolas.
    const POS = [
      [50, 30],
      [34, 52],
      [66, 56],
      [26, 76],
      [72, 78]
    ];
    // Cria as bolas apagadas.
    const bs = d.desejos.map((_, i) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'bola-n');
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Muda a distância da esquerda de b.
      b.style.left = POS[i][0] + '%';
      // Muda a distância de cima de b.
      b.style.top = POS[i][1] + '%';
      // Atualiza o valor --cor, que o CSS usa.
      b.style.setProperty('--cor', ['#ff5a5a', '#ffd23f', '#5ce1ff', '#ff8fb1', '#9dff7a'][i]);
      // Coloca a peça nova dentro de a.
      a.appendChild(b);
      // Termina aqui e entrega o resultado.
      return b;
    });
    // Frase.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Cada bola acesa traz um desejo.
    let n = 0;
    // Espera a pessoa tocar em todos os itens da lista.
    await K.todos(bs, (b) => {
      // Liga o visual "acesa" (veja .acesa no CSS).
      b.classList.add('acesa');
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.desejos[n++], 100);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(660 + n * 80, 200);
    });
    // Deixa ler e liga a estrela.
    await U.esperar(2300);
    // Liga o visual "on" (veja .on no CSS).
    st.classList.add('on');
    // Liga o visual "brilha" (veja .brilha no CSS).
    a.classList.add('brilha');
    // Repete para cada item da lista.
    [784, 880, 988, 1175].forEach((f, i) => setTimeout(() => K.som(f, 300), i * 180));
    // Frase final e segue.
    await K.fala(t, d.fecho);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 70 — Globo de neve: chacoalhe e a neve revela a mensagem.
  A.globo = async (d) => {
    // Abre a tela com o globo; 'neve' guarda os flocos e 'forca' a agitação.
    const caixa = K.tela('a-globo');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "gl".
    const gl = U.el('button', 'esfera');
    // Diz ao navegador que é um botão comum.
    gl.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    gl.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(gl);
    // Cria a peça "casinha" dentro de gl.
    K.add(gl, 'span', 'casinha');
    // Cria a peça "dentro" dentro de gl.
    K.add(gl, 'b', 'dentro', d.dentro);
    // Guarda este valor com o nome "forca".
    let forca = 0;
    // Monta uma lista e guarda com o nome "neve".
    const neve = Array.from({ length: 80 }, () => ({ x: Math.random(), y: Math.random(), v: U.rand(0.0012, 0.0034) }));
    // Desenha os flocos a cada quadro.
    K.pinta(gl, (cx, w, h) => {
      // Limpa e define a cor da neve.
      cx.clearRect(0, 0, w, h);
      // Escolhe a cor da tinta do pincel.
      cx.fillStyle = '#fff';
      // A agitação vai passando aos poucos.
      forca *= 0.985;
      // Move e desenha cada floco.
      neve.forEach((f) => {
        // Coloca o floco em outro lugar.
        f.y += f.v + forca * U.rand(-0.02, 0.02);
        // Coloca o floco em outro lugar.
        f.x += forca * U.rand(-0.02, 0.02);
        // Se a condição entre parênteses valer, faz o que está nas chaves.
        if (f.y > 1) {
          // Coloca o floco em outro lugar.
          f.y = 0;
          // Coloca o floco em outro lugar.
          f.x = Math.random();
        }
        // Se a condição entre parênteses valer: coloca o floco em outro lugar.
        if (f.y < 0) f.y = 1;
        // Coloca o floco em outro lugar.
        f.x = (f.x + 1) % 1;
        // Começa um desenho novo.
        cx.beginPath();
        // Desenha um círculo.
        cx.arc(f.x * w, f.y * h, 2.1, 0, 6.3);
        // Pinta por dentro do desenho.
        cx.fill();
      });
    });
    // Base do globo, frase e dica.
    K.add(caixa, 'i', 'base-g');
    // Cria a peça "texto" dentro de caixa e guarda com o nome "t".
    const t = K.add(caixa, 'p', 'texto');
    // Cria a peça "dica" dentro de caixa e guarda com o nome "dica".
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Três chacoalhadas.
    await K.vezes(gl, d.frases.length, (i) => {
      // Guarda a força do fogo ou da agitação.
      forca = 1;
      // Esconde dica.
      dica.hidden = true;
      // Desliga o visual "sacode".
      gl.classList.remove('sacode');
      // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
      void gl.offsetWidth;
      // Liga o visual "sacode" (veja .sacode no CSS).
      gl.classList.add('sacode');
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.frases[i - 1], 100);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(1600, 90, 'triangle', 0.03);
    });
    // Deixa a neve assentar e segue.
    await U.esperar(2600);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 71 — Relógio chegando à meia-noite e estouro do champanhe.
  A.relogio = async (d) => {
    // Abre a tela e monta o mostrador.
    const caixa = K.tela('a-relogio');
    // Cria a peça "mostrador" dentro de caixa e guarda com o nome "r".
    const r = K.add(caixa, 'div', 'mostrador');
    // Doze marcas em volta do mostrador.
    for (let i = 0; i < 12; i++) {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "m".
      const m = U.el('i', 'marca-r');
      // Muda o movimento de m.
      m.style.transform = 'rotate(' + i * 30 + 'deg) translateY(-118px)';
      // Coloca a peça nova dentro de r.
      r.appendChild(m);
    }
    // Ponteiros.
    const ph = K.add(r, 'b', 'ponteiro horas');
    // Cria a peça "ponteiro minutos" dentro de r e guarda com o nome "pm".
    const pm = K.add(r, 'b', 'ponteiro minutos');
    // Número gigante e frase.
    const n = K.add(caixa, 'p', 'conta-r');
    // Cria a peça "texto" dentro de caixa e guarda com o nome "t".
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Espera começar.
    await K.mais(caixa, d.botao);
    // Gira os ponteiros até meia-noite.
    ph.classList.add('vai');
    // Liga o visual "vai" (veja .vai no CSS).
    pm.classList.add('vai');
    // Espera 2,3 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(2300);
    // Contagem final.
    for (const v of [3, 2, 1]) {
      // Troca o texto de n.
      n.textContent = v;
      // Desliga o visual "pula".
      n.classList.remove('pula');
      // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
      void n.offsetWidth;
      // Liga o visual "pula" (veja .pula no CSS).
      n.classList.add('pula');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(440, 200, 'square', 0.06);
      // Espera 0,9 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(900);
    }
    // Meia-noite.
    n.textContent = d.ano;
    // Solta uma festa de partículas.
    Fundo.festa(8);
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(880, 600, 'square', 0.06);
    // Faz o celular tremer um pouquinho.
    U.vibra([40, 30, 60]);
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 72 — Sete ondas: pule cada onda e faça um pedido.
  A.ondas = async (d) => {
    // Abre a tela cheia com o mar e a pessoa.
    const caixa = K.tela('a-ondas cheia');
    // Cria a peça "praia-o" dentro de caixa e guarda com o nome "m".
    const m = K.add(caixa, 'div', 'praia-o');
    // Cria a peça "conta-o" dentro de m e guarda com o nome "conta".
    const conta = K.add(m, 'p', 'conta-o', '0/' + d.pedidos.length);
    // Cria a peça "texto" dentro de m e guarda com o nome "t".
    const t = K.add(m, 'p', 'texto', d.abre);
    // Onda que vem e pessoa que pula.
    const o = K.add(m, 'i', 'onda-o');
    // Cria a peça "pessoa" dentro de m e guarda com o nome "p".
    const p = K.add(m, 'i', 'pessoa');
    // Botão de pular.
    const b = K.botao(m, d.botao);
    // Cada toque é um pulo de onda.
    await K.vezes(b, d.pedidos.length, (i) => {
      // Troca o texto de conta.
      conta.textContent = i + '/' + d.pedidos.length;
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.pedidos[i - 1], 100);
      // Desliga o visual "passa".
      o.classList.remove('passa');
      // Desliga o visual "pula-o".
      p.classList.remove('pula-o');
      // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
      void o.offsetWidth;
      // Liga o visual "passa" (veja .passa no CSS).
      o.classList.add('passa');
      // Liga o visual "pula-o" (veja .pula-o no CSS).
      p.classList.add('pula-o');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(260 + i * 50, 240, 'sine');
    });
    // Deixa ler e fecha.
    b.remove();
    // Espera 2,2 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(2200);
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(m, d.fim);
  };

  // 73 — Caderno de receitas: marque cada ingrediente de uma mãe.
  A.receita = async (d) => {
    // Abre a tela e monta a página manchada.
    const caixa = K.tela('a-receita');
    // Cria a peça "pagina-r" dentro de caixa e guarda com o nome "p".
    const p = K.add(caixa, 'div', 'pagina-r');
    // Cria a peça "título" dentro de p.
    K.add(p, 'h1', '', d.titulo);
    // Cria a peça "rende" dentro de p.
    K.add(p, 'p', 'rende', d.rende);
    // Cada ingrediente é um botão de marcar.
    const is = d.ingredientes.map((x) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'ingr', U.fmt(x));
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Coloca a peça nova dentro de p.
      p.appendChild(b);
      // Termina aqui e entrega o resultado.
      return b;
    });
    // Dica de toque.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Marca cada um.
    await K.todos(is, (b) => {
      // Liga o visual "ok" (veja .ok no CSS).
      b.classList.add('ok');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(620, 80, 'triangle');
    });
    // Modo de preparo.
    dica.remove();
    // Cria a peça "preparo" dentro de p e guarda com o nome "m".
    const m = K.add(p, 'p', 'preparo');
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(m, d.preparo, 130);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 74 — Planta técnica: o projeto do pai, com cotas e medidas.
  A.projeto = async (d) => {
    // Abre a tela cheia com o papel azul.
    const caixa = K.tela('a-projeto cheia');
    // Cria a peça "folha-p" dentro de caixa e guarda com o nome "f".
    const f = K.add(caixa, 'div', 'folha-p');
    // Cria a peça "título" dentro de f.
    K.add(f, 'h1', '', d.titulo);
    // Desenho técnico de uma casa, que se traça sozinho.
    const s = U.el(
      'div',
      'desenho',
      '<svg viewBox="0 0 240 200" aria-hidden="true"><path pathLength="1" d="M30 94L120 20L210 94"/><path pathLength="1" d="M50 80V180H190V80"/><path pathLength="1" d="M104 180V126H136V180"/><path pathLength="1" d="M66 104H92V130H66ZM148 104H174V130H148Z"/><path pathLength="1" d="M20 192H220M20 186V198M220 186V198"/></svg>'
    );
    // Coloca a peça nova dentro de f.
    f.appendChild(s);
    // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
    void s.offsetWidth;
    // Liga o visual "traca" (veja .traca no CSS).
    s.classList.add('traca');
    // Cotas com medidas, cada uma é um botão.
    const POS = [
      [50, 12],
      [22, 56],
      [76, 56]
    ];
    // Cria cada cota sobre o desenho.
    const cs = d.cotas.map((_, i) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'cota', String(i + 1));
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Muda a distância da esquerda de b.
      b.style.left = POS[i][0] + '%';
      // Muda a distância de cima de b.
      b.style.top = POS[i][1] + '%';
      // Coloca a peça nova dentro de s.
      s.appendChild(b);
      // Termina aqui e entrega o resultado.
      return b;
    });
    // Texto da especificação.
    const t = K.add(f, 'p', 'espec', d.abre);
    // Espera o desenho terminar.
    await U.esperar(2200);
    // Cada cota explica uma parte.
    let n = 0;
    // Espera a pessoa tocar em todos os itens da lista.
    await K.todos(cs, (b) => {
      // Liga o visual "lida" (veja .lida no CSS).
      b.classList.add('lida');
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.cotas[n++], 100);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(520 + n * 60, 100, 'triangle');
    });
    // Deixa ler e segue.
    await U.esperar(2400);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(f, d.fim);
  };

  // 75 — Rosa que abre uma pétala a cada toque.
  A.rosa = async (d) => {
    // Abre a tela e monta as camadas de pétalas.
    const caixa = K.tela('a-rosa');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "r".
    const r = U.el('button', 'flor-r');
    // Diz ao navegador que é um botão comum.
    r.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    r.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(r);
    // Pétalas em anéis, das de fora para as de dentro.
    const camadas = [0, 1, 2, 3, 4].map((k) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "c".
      const c = U.el('i', 'anel-r');
      // Atualiza o valor --k, que o CSS usa.
      c.style.setProperty('--k', k);
      // Repete várias vezes, contando as voltas.
      for (let i = 0; i < 6; i++) {
        // Cria uma peça nova, ainda fora da tela e guarda com o nome "p".
        const p = U.el('b');
        // Muda o movimento de p.
        p.style.transform = 'rotate(' + (i * 60 + k * 26) + 'deg)';
        // Coloca a peça nova dentro de c.
        c.appendChild(p);
      }
      // Coloca a peça nova dentro de r.
      r.appendChild(c);
      // Termina aqui e entrega o resultado.
      return c;
    });
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto');
    // Cria a peça "dica" dentro de caixa e guarda com o nome "dica".
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Cada toque abre um anel e diz uma verdade.
    await K.vezes(r, d.frases.length, (i) => {
      // Esconde dica.
      dica.hidden = true;
      // Liga o visual "aberto" (veja .aberto no CSS).
      camadas[Math.min(i - 1, camadas.length - 1)].classList.add('aberto');
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.frases[i - 1], 100);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(440 + i * 70, 260);
    });
    // Deixa ler e segue.
    await U.esperar(2500);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 76 — Pulseira da amizade: passe cada conta pelo fio até formar a palavra.
  A.pulseira = async (d) => {
    // Abre a tela com o fio.
    const caixa = K.tela('a-pulseira');
    // Cria a peça "chamada" dentro de caixa.
    K.add(caixa, 'p', 'chamada', d.titulo);
    // Cria a peça "fio-p" dentro de caixa e guarda com o nome "fio".
    const fio = K.add(caixa, 'div', 'fio-p');
    // Contas soltas embaixo.
    const solta = K.add(caixa, 'div', 'contas');
    // Passa por cada item da lista e monta uma lista nova e guarda com o nome "cs".
    const cs = [...d.palavra].map((c, i) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'conta-p', U.esc(c));
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Atualiza o valor --cor, que o CSS usa.
      b.style.setProperty('--cor', 'hsl(' + (i * 56 + 10) + ' 80% 62%)');
      // Coloca a peça nova dentro de solta.
      solta.appendChild(b);
      // Termina aqui e entrega o resultado.
      return b;
    });
    // Frase.
    const t = K.add(caixa, 'p', 'texto', d.dica);
    // Uma conta por vez, na ordem certa, para a palavra sair certa.
    for (let i = 0; i < cs.length; i++) {
      // Liga o visual "vez" (veja .vez no CSS).
      cs[i].classList.add('vez');
      // Espera a pessoa tocar em cs[i].
      await K.toque(cs[i]);
      // Desliga o visual "vez".
      cs[i].classList.remove('vez');
      // Coloca a peça nova dentro de fio.
      fio.appendChild(cs[i]);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(600 + i * 70, 100, 'triangle');
    }
    // Pulseira pronta.
    solta.remove();
    // Liga o visual "pronta" (veja .pronta no CSS).
    fio.classList.add('pronta');
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 77 — Ovo de Páscoa: quebre a casca aos poucos.
  A.ovo = async (d) => {
    // Abre a tela e monta o ovo com as rachaduras escondidas.
    const caixa = K.tela('a-ovo');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "o".
    const o = U.el(
      'button',
      'casca-o',
      '<svg viewBox="0 0 200 250" aria-hidden="true"><path class="ovo-c" d="M100 8C150 8 188 92 188 150C188 208 148 242 100 242C52 242 12 208 12 150C12 92 50 8 100 8Z"/><path class="faixa" d="M14 128Q100 168 186 128M26 176Q100 212 174 176"/><path class="r r1" pathLength="1" d="M100 60L84 88L108 106L90 132"/><path class="r r2" pathLength="1" d="M90 132L62 148L74 176"/><path class="r r3" pathLength="1" d="M90 132L126 150L116 182L140 200"/></svg>'
    );
    // Diz ao navegador que é um botão comum.
    o.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    o.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(o);
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto');
    // Cria a peça "dica" dentro de caixa e guarda com o nome "dica".
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Cada batida abre uma rachadura.
    await K.vezes(o, 3, (i) => {
      // Esconde dica.
      dica.hidden = true;
      // Anota "racha" em o, para o CSS ou o teste usarem.
      o.dataset.racha = i;
      // Desliga o visual "bate-o".
      o.classList.remove('bate-o');
      // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
      void o.offsetWidth;
      // Liga o visual "bate-o" (veja .bate-o no CSS).
      o.classList.add('bate-o');
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.frases[i - 1], 100);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(300 + i * 80, 100, 'square', 0.06);
    });
    // Deixa ler e abre o ovo.
    await U.esperar(2300);
    // Liga o visual "abriu" (veja .abriu no CSS).
    o.classList.add('abriu');
    // Solta uma festa de partículas.
    Fundo.festa(4);
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 78 — Montanha: segure para escalar até o topo.
  A.montanha = async (d) => {
    // Abre a tela cheia com as serras e a trilha.
    const caixa = K.tela('a-montanha cheia');
    // Cria a peça "serra" dentro de caixa e guarda com o nome "m".
    const m = K.add(caixa, 'div', 'serra');
    // Montanhas e bandeira.
    m.appendChild(
      U.el(
        'div',
        'picos',
        '<svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><path class="atras" d="M-20 300L70 130L130 210L210 100L320 300z"/><path class="frente" d="M-20 300L150 40L320 300z"/><path class="neve-m" d="M150 40L122 84L138 78L150 92L164 76L180 86z"/><path class="trilha" pathLength="1" d="M96 298C130 270 190 262 168 224C150 194 116 196 132 160C144 134 176 128 160 96C154 80 148 62 150 42"/></svg>'
      )
    );
    // Quem sobe e a bandeira no topo.
    const q = K.add(m, 'i', 'alpinista');
    // Cria a peça "bandeira" dentro de m e guarda com o nome "fl".
    const fl = K.add(m, 'b', 'bandeira', '⚑');
    // Frase e botão de segurar.
    const t = K.add(m, 'p', 'texto', d.abre);
    // Cria um botão dentro de m e guarda com o nome "bt".
    const bt = K.botao(m, d.botao);
    // Caminho da trilha para posicionar quem sobe.
    const tr = U.$('.trilha', m);
    // Procura uma peça na tela e guarda com o nome "svg".
    const svg = U.$('svg', m);
    // Última frase mostrada.
    let marca = 0;
    // Enquanto segura, sobe pela trilha.
    await K.segura(bt, 5000, (p) => {
      // Ponto da trilha neste progresso, em coordenadas da tela.
      const pt = tr.getPointAtLength(p * tr.getTotalLength());
      // Descobre a escala do desenho na tela e guarda com o nome "cm".
      const cm = svg.getScreenCTM();
      // Muda a distância da esquerda de q.
      q.style.left = pt.x * cm.a + cm.e + 'px';
      // Muda a distância de cima de q.
      q.style.top = pt.y * cm.d + cm.f + 'px';
      // Frase da altitude.
      const f = Math.floor(p * d.frases.length);
      // Se a condição entre parênteses valer, faz o que está nas chaves.
      if (f > marca) {
        // Anota até onde já chegou, para não repetir a frase.
        marca = f;
        // Troca o que aparece dentro de t.
        t.innerHTML = U.fmt(d.frases[f - 1]);
      }
    });
    // Chegou no topo.
    bt.remove();
    // Liga o visual "on" (veja .on no CSS).
    fl.classList.add('on');
    // Solta uma festa de partículas.
    Fundo.festa(5);
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(784, 400);
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(m, d.fim);
  };

  // 79 — Caderno de agradecimentos: cole as estrelinhas de bom trabalho.
  A.caderno = async (d) => {
    // Abre a tela e monta o caderno pautado com espiral.
    const caixa = K.tela('a-caderno');
    // Cria a peça "folha-c" dentro de caixa e guarda com o nome "c".
    const c = K.add(caixa, 'div', 'folha-c');
    // Cria a peça "título" dentro de c.
    K.add(c, 'h1', '', d.titulo);
    // Cada linha tem um espaço para a estrela e o texto que se escreve depois.
    const ls = d.linhas.map((x) => {
      // Cria a peça "linha-c" dentro de c e guarda com o nome "l".
      const l = K.add(c, 'div', 'linha-c');
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'estrela-c', '☆');
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Coloca a peça nova dentro de l.
      l.appendChild(b);
      // Cria a peça "texto" dentro de l e guarda com o nome "p".
      const p = K.add(l, 'p');
      // Termina aqui e entrega o resultado.
      return { b, p, x };
    });
    // Dica de toque.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Cada estrela colada escreve uma linha.
    await K.todos(
      ls.map((l) => l.b),
      (b, i) => {
        // Troca o texto de b.
        b.textContent = '★';
        // Liga o visual "colou" (veja .colou no CSS).
        b.classList.add('colou');
        // Escreve o texto palavra por palavra.
        U.palavras(ls[i].p, ls[i].x, 90);
        // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
        K.som(760, 100, 'triangle');
      }
    );
    // Deixa ler e assina.
    dica.remove();
    // Espera 2 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(2000);
    // Cria a peça "assin" dentro de c.
    K.add(c, 'p', 'assin entra', d.assinatura);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 80 — Alianças: junte os dois anéis e os sinos tocam.
  A.aliancas = async (d) => {
    // Abre a tela com os dois anéis separados.
    const caixa = K.tela('a-aliancas');
    // Cria a peça "almofada" dentro de caixa e guarda com o nome "m".
    const m = K.add(caixa, 'div', 'almofada');
    // Anel que se arrasta e anel parado.
    const a = U.el('button', 'anel-a um');
    // Diz ao navegador que é um botão comum.
    a.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    a.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de m.
    m.appendChild(a);
    // Cria a peça "anel-a dois" dentro de m.
    K.add(m, 'i', 'anel-a dois');
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Cria a peça "dica" dentro de caixa e guarda com o nome "dica".
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera juntar.
    await K.arrasta(a, {
      // Direção do gesto: quanto anda para o lado e para baixo.
      rumo: [90, 0],
      // O que acontece enquanto o dedo anda.
      move: (dx) => {
        // Muda o movimento de a.
        a.style.transform = 'translateX(' + Math.max(0, Math.min(72, dx)) + 'px)';
      },
      // O que acontece quando o dedo solta.
      solta: (dx) => {
        // Se a condição entre parênteses valer, para por aqui.
        if (dx > 44) return true;
        // Muda o movimento de a.
        a.style.transform = '';
        // Termina aqui e entrega o resultado.
        return false;
      }
    });
    // Encaixa e toca os sinos.
    dica.remove();
    // Muda o movimento de a.
    a.style.transform = 'translateX(72px)';
    // Liga o visual "unidos" (veja .unidos no CSS).
    m.classList.add('unidos');
    // Repete para cada item da lista.
    [1319, 1568, 1319, 1047].forEach((f, i) => setTimeout(() => K.som(f, 500), i * 240));
    // Fala os anos e segue.
    await K.frases(t, d.frases);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };
  // Fecha a caixa e já roda tudo.
})(window);
