/* ==========================================================
   capitulos.js — os capítulos extras que vêm depois da animação de cada link.
   São 8 brincadeiras. Os textos de cada link ficam em data/capitulos-*.js.
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

  // Caixa onde ficam os 8 capítulos.
  const Cap = {};

  // Desenho de coração usado no capítulo de ritmo.
  const CORACAO =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

  // Pontos de cada desenho do capítulo de ligar pontos, de 0 a 100.
  const PONTOS = {
    // Coração com 10 pontos.
    coracao: [
      [50, 30],
      [64, 14],
      [84, 18],
      [92, 40],
      [74, 64],
      [50, 90],
      [26, 64],
      [8, 40],
      [16, 18],
      [36, 14]
    ],
    // Estrela com 10 pontos.
    estrela: [
      [50, 6],
      [62, 38],
      [96, 38],
      [68, 58],
      [80, 92],
      [50, 72],
      [20, 92],
      [32, 58],
      [4, 38],
      [38, 38]
    ],
    // Diamante com 8 pontos.
    diamante: [
      [28, 12],
      [72, 12],
      [92, 36],
      [72, 62],
      [50, 92],
      [28, 62],
      [8, 36],
      [50, 36]
    ]
  };

  // Lugares das bolhas, em porcentagem do espaço.
  const LUGARES = [
    [6, 4],
    [54, 0],
    [30, 32],
    [62, 40],
    [4, 62],
    [50, 72]
  ];

  // Abre a tela do capítulo com a etiqueta e o título. A classe "final" faz o título usar a letra da arte.
  const abre = (d, classe) => {
    // Abre a tela nova.
    const caixa = K.tela('capitulo final ' + classe);
    // Etiqueta de cima, com o número do capítulo.
    K.add(caixa, 'p', 'hud-cap', 'CAPÍTULO ' + (Cap.numero || 1) + ' DE 2');
    // Cria o lugar do título.
    const t = K.add(caixa, 'h2', 'titulo');
    // Faz o título se decodificar, como uma mensagem secreta.
    Efeitos.decodifica(t, d.ti, 800);
    // Entrega a caixa para o capítulo usar.
    return caixa;
  };

  // Capítulo 1 — Perguntas: cada opção tem uma resposta própria.
  Cap.quiz = async (d) => {
    // Abre a tela e cria os lugares da pergunta, das opções e da resposta.
    const caixa = abre(d, 'c-quiz');
    // Cria a peça "texto" dentro de caixa e guarda com o nome "q".
    const q = K.add(caixa, 'p', 'texto');
    // Cria a peça "ops-q" dentro de caixa e guarda com o nome "ops".
    const ops = K.add(caixa, 'div', 'ops-q');
    // Cria a peça "resposta-q" dentro de caixa e guarda com o nome "r".
    const r = K.add(caixa, 'p', 'resposta-q');
    // Uma rodada para cada pergunta.
    for (const [pergunta, opcoes] of d.q) {
      // Limpa a rodada anterior.
      ops.innerHTML = '';
      // Troca o que aparece dentro de r.
      r.innerHTML = '';
      // Escreve a pergunta.
      await K.fala(q, pergunta, 130);
      // Cria um botão para cada opção.
      const bs = opcoes.map(([t]) => {
        // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
        const b = U.el('button', 'op-q entra', U.fmt(t));
        // Diz ao navegador que é um botão comum.
        b.type = 'button';
        // Coloca a peça nova dentro de ops.
        ops.appendChild(b);
        // Termina aqui e entrega o resultado.
        return b;
      });
      // Espera a pessoa escolher.
      const k = await K.qual(bs);
      // Destaca a escolhida e apaga as outras.
      bs.forEach((b, j) => b.classList.add(j === k ? 'sel' : 'fora'));
      // Faíscas e som na opção escolhida.
      Efeitos.em(bs[k], 18);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(660, 120);
      // Escreve a resposta da opção escolhida.
      await K.fala(r, opcoes[k][1], 130);
      // Espera o toque para seguir.
      await K.mais(caixa);
    }
  };

  // Capítulo 2 — Quadrinhos: cada quadrinho tocado revela uma frase.
  Cap.grade = async (d) => {
    // Abre a tela e cria a grade e o texto.
    const caixa = abre(d, 'c-grade');
    // Cria a peça "grade-6" dentro de caixa e guarda com o nome "gr".
    const gr = K.add(caixa, 'div', 'grade-6');
    // Cria a peça "texto" dentro de caixa e guarda com o nome "t".
    const t = K.add(caixa, 'p', 'texto');
    // Cria um quadrinho numerado para cada frase.
    const bs = d.i.map((_, i) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'quadrinho', String(i + 1));
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Coloca a peça nova dentro de gr.
      gr.appendChild(b);
      // Termina aqui e entrega o resultado.
      return b;
    });
    // Cada toque abre o quadrinho e mostra a frase dele.
    await K.todos(bs, (b, i) => {
      // Liga o visual "aberto" (veja .aberto no CSS).
      b.classList.add('aberto');
      // Solta faíscas em cima desta peça.
      Efeitos.em(b, 12);
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.i[i], 95);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(480 + i * 60, 110, 'triangle');
    });
    // Deixa ler a última frase.
    await U.esperar(2300);
    // Frase de fechamento.
    await K.fala(t, d.fim, 130);
    // Espera o toque para seguir.
    await K.mais(caixa);
  };

  // Capítulo 3 — Segurar: a bola de luz cresce enquanto o dedo fica encostado.
  Cap.segura = async (d) => {
    // Abre a tela e cria a bola de luz.
    const caixa = abre(d, 'c-segura');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "o".
    const o = U.el('button', 'orbe');
    // Diz ao navegador que é um botão comum.
    o.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    o.setAttribute('aria-label', d.abre);
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(o);
    // Primeira frase.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Guarda a última frase mostrada.
    let marca = 0;
    // Enquanto segura, a bola cresce e as frases trocam.
    await K.segura(o, 4600, (p) => {
      // Avisa o CSS o quanto a bola cresceu.
      o.style.setProperty('--p', p);
      // Descobre qual frase vale agora.
      const m = Math.floor(p * d.i.length);
      // Passou de uma marca nova: mostra a frase seguinte.
      if (m > marca) {
        // Anota até onde já chegou, para não repetir a frase.
        marca = m;
        // Troca o que aparece dentro de t.
        t.innerHTML = U.fmt(d.i[m - 1]);
        // Solta faíscas em cima desta peça.
        Efeitos.em(o, 14);
        // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
        K.som(300 + m * 90, 170);
      }
    });
    // Bola cheia: festa e frase final.
    o.classList.add('pleno');
    // Solta uma festa de partículas.
    Fundo.festa(3);
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fim, 130);
    // Espera o toque para seguir.
    await K.mais(caixa);
  };

  // Capítulo 4 — Ligar pontos: toque nos números em ordem para formar o desenho.
  Cap.pontos = async (d) => {
    // Abre a tela e cria o quadro com a linha do desenho.
    const caixa = abre(d, 'c-pontos');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "q".
    const q = U.el(
      'div',
      'quadro-pontos',
      '<svg viewBox="0 0 100 100" aria-hidden="true"><polygon class="miolo-p"/><polyline class="linha-p"/></svg>'
    );
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(q);
    // Pega as partes do desenho e os pontos dele.
    const linha = U.$('.linha-p', q),
      miolo = U.$('.miolo-p', q),
      pts = PONTOS[d.forma];
    // Cria um botão numerado em cada ponto.
    const bs = pts.map((p, i) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'ponto', String(i + 1));
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Muda a distância da esquerda de b.
      b.style.left = p[0] + '%';
      // Muda a distância de cima de b.
      b.style.top = p[1] + '%';
      // Coloca a peça nova dentro de q.
      q.appendChild(b);
      // Termina aqui e entrega o resultado.
      return b;
    });
    // Primeira frase.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Lista dos pontos já ligados.
    const feitos = [];
    // Espera um toque em cada ponto, na ordem.
    for (let i = 0; i < bs.length; i++) {
      // Faz o próximo ponto piscar.
      bs[i].classList.add('vez');
      // Espera o toque.
      await K.toque(bs[i]);
      // Marca o ponto como ligado.
      bs[i].classList.remove('vez');
      // Liga o visual "ligado" (veja .ligado no CSS).
      bs[i].classList.add('ligado');
      // Estica a linha até este ponto.
      feitos.push(pts[i].join(','));
      // Muda o atributo "points" da peça.
      linha.setAttribute('points', feitos.join(' '));
      // Faíscas e som.
      Efeitos.em(bs[i], 7);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(400 + i * 45, 90, 'triangle');
    }
    // Fecha a linha e pinta o desenho por dentro.
    feitos.push(pts[0].join(','));
    // Muda o atributo "points" da peça.
    linha.setAttribute('points', feitos.join(' '));
    // Muda o atributo "points" da peça.
    miolo.setAttribute('points', feitos.join(' '));
    // Liga o visual "pronto" (veja .pronto no CSS).
    q.classList.add('pronto');
    // Festa e frase final.
    Fundo.festa(3);
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fim, 130);
    // Espera o toque para seguir.
    await K.mais(caixa);
  };

  // Capítulo 5 — Bolhas: estoure as bolhas que flutuam e guarde as palavras.
  Cap.bolhas = async (d) => {
    // Abre a tela, o campo das bolhas e o lugar das palavras.
    const caixa = abre(d, 'c-bolhas');
    // Cria a peça "campo-bolhas" dentro de caixa e guarda com o nome "c".
    const c = K.add(caixa, 'div', 'campo-bolhas');
    // Cria a peça "palavras-b" dentro de caixa e guarda com o nome "lista".
    const lista = K.add(caixa, 'div', 'palavras-b');
    // Cria uma bolha para cada palavra.
    const bs = d.i.map((w, i) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'bolha', U.fmt(w));
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Muda a distância da esquerda de b.
      b.style.left = LUGARES[i][0] + '%';
      // Muda a distância de cima de b.
      b.style.top = LUGARES[i][1] + '%';
      // Muda o atraso da animação de b.
      b.style.animationDelay = -i * 0.7 + 's';
      // Coloca a peça nova dentro de c.
      c.appendChild(b);
      // Termina aqui e entrega o resultado.
      return b;
    });
    // Cada toque estoura a bolha e guarda a palavra.
    await K.todos(bs, (b, i) => {
      // Solta faíscas em cima desta peça.
      Efeitos.em(b, 22);
      // Liga o visual "pop" (veja .pop no CSS).
      b.classList.add('pop');
      // Cria a peça "texto" dentro de lista.
      K.add(lista, 'span', 'entra', d.i[i]);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(760 + i * 70, 80, 'triangle');
    });
    // Tira o campo vazio e escreve a frase final.
    c.remove();
    // Cria a peça "texto" dentro de caixa e guarda com o nome "t".
    const t = K.add(caixa, 'p', 'texto');
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fim, 130);
    // Espera o toque para seguir.
    await K.mais(caixa);
  };

  // Capítulo 6 — Medidor: arraste até o fim; a frase muda conforme o número sobe.
  Cap.medidor = async (d) => {
    // Abre a tela e cria o número grande.
    const caixa = abre(d, 'c-medidor');
    // Cria a peça "numero-m" dentro de caixa e guarda com o nome "n".
    const n = K.add(caixa, 'b', 'numero-m', '0%');
    // Cria o trilho, a parte cheia e a bolinha de arrastar.
    const tr = K.add(caixa, 'div', 'trilho-m');
    // Cria a peça "cheio-m" dentro de tr e guarda com o nome "cheio".
    const cheio = K.add(tr, 'i', 'cheio-m');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "cabo".
    const cabo = U.el('button', 'cabo-m');
    // Diz ao navegador que é um botão comum.
    cabo.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    cabo.setAttribute('aria-label', d.ti);
    // Coloca a peça nova dentro de tr.
    tr.appendChild(cabo);
    // Frase que muda.
    const t = K.add(caixa, 'p', 'texto', d.i[0]);
    // Calcula até onde a bolinha pode andar.
    const max = () => tr.clientWidth - cabo.offsetWidth;
    // Guarda a última frase mostrada.
    let marca = 0;
    // Acompanha o dedo enquanto ele arrasta.
    await K.arrasta(cabo, {
      // Direção do gesto: quanto anda para o lado e para baixo.
      rumo: [320, 0],
      // O que acontece enquanto o dedo anda.
      move: (dx) => {
        // Calcula o quanto já andou, de 0 a 1.
        const p = Math.max(0, Math.min(1, dx / max()));
        // Move a bolinha, enche o trilho e sobe o número.
        cabo.style.transform = 'translateX(' + p * max() + 'px)';
        // Muda a largura de cheio.
        cheio.style.width = p * 100 + '%';
        // Troca o texto de n.
        n.textContent = Math.round(p * 100) + '%';
        // Descobre qual frase vale agora.
        const m = Math.min(d.i.length - 1, Math.floor(p * d.i.length));
        // Mudou de faixa: troca a frase e faz um som.
        if (m !== marca) {
          // Anota até onde já chegou, para não repetir a frase.
          marca = m;
          // Troca o que aparece dentro de t.
          t.innerHTML = U.fmt(d.i[m]);
          // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
          K.som(360 + m * 90, 110, 'triangle');
        }
      },
      // O que acontece quando o dedo solta.
      solta: (dx) => dx >= max() * 0.85
    });
    // Passa do limite de brincadeira e comemora.
    n.textContent = '1000%';
    // Liga o visual "estourou-m" (veja .estourou-m no CSS).
    n.classList.add('estourou-m');
    // Muda a largura de cheio.
    cheio.style.width = '100%';
    // Muda o movimento de cabo.
    cabo.style.transform = 'translateX(' + max() + 'px)';
    // Solta uma festa de partículas.
    Fundo.festa(3);
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(880, 240);
    // Frase final.
    await K.fala(t, d.fim, 130);
    // Espera o toque para seguir.
    await K.mais(caixa);
  };

  // Capítulo 7 — Jogo da memória: cada par encontrado revela uma frase.
  Cap.memoria = async (d) => {
    // Abre a tela, a mesa e o texto.
    const caixa = abre(d, 'c-memoria');
    // Cria a peça "mesa-m" dentro de caixa e guarda com o nome "gr".
    const gr = K.add(caixa, 'div', 'mesa-m');
    // Cria a peça "texto" dentro de caixa e guarda com o nome "t".
    const t = K.add(caixa, 'p', 'texto', d.dica || 'Encontre os pares.');
    // Faz duas cartas de cada par e embaralha.
    const cartas = d.i
      .flatMap(([s, f], k) => [
        { s, f, k },
        { s, f, k }
      ])
      .sort(() => Math.random() - 0.5);
    // Cria um botão para cada carta.
    const bs = cartas.map((c) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'carta-m', '<span>' + U.esc(c.s) + '</span>');
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Anota "acao" em b, para o CSS ou o teste usarem.
      b.dataset.acao = 'toque';
      // Coloca a peça nova dentro de gr.
      gr.appendChild(b);
      // Termina aqui e entrega o resultado.
      return b;
    });
    // Marca para o teste quais cartas podem ser tocadas agora.
    const marca = (quais) =>
      bs.forEach((x, j) => {
        // Se a condição entre parênteses valer: anota "acao" em x, para o CSS ou o teste usarem.
        if (quais(j) && !x.classList.contains('ok')) x.dataset.acao = 'toque';
        // Se o caso de cima não valeu, faz isto.
        else delete x.dataset.acao;
      });
    // Espera a pessoa achar todos os pares.
    await new Promise((ok) => {
      // Anotações do jogo: carta aberta, pares achados e se está esperando.
      let aberta = -1,
        pares = 0,
        trava = false;
      // Fica de olho no toque de cada carta.
      bs.forEach((b, i) =>
        b.addEventListener('click', () => {
          // Ignora o toque em carta já resolvida ou enquanto as cartas estão voltando.
          if (trava || i === aberta || b.classList.contains('ok')) return;
          // Vira a carta.
          b.classList.add('vira');
          // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
          K.som(520, 60, 'triangle');
          // Primeira carta da jogada: guarda e espera a segunda.
          if (aberta < 0) {
            // Guarda o novo valor em aberta.
            aberta = i;
            // Usa a ajuda "marca" (ela está definida neste arquivo).
            marca((j) => j !== i && cartas[j].k === cartas[i].k);
            // Para por aqui.
            return;
          }
          // Guarda a primeira carta da jogada e limpa a anotação.
          const a = aberta;
          // Guarda o novo valor em aberta.
          aberta = -1;
          // Achou o par.
          if (cartas[a].k === cartas[i].k) {
            // Marca as duas cartas como resolvidas.
            bs[a].classList.add('ok');
            // Liga o visual "ok" (veja .ok no CSS).
            b.classList.add('ok');
            // Soma 1 em pares.
            pares++;
            // Faíscas, som e a frase do par.
            Efeitos.em(b, 18);
            // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
            K.som(780, 140);
            // Escreve o texto palavra por palavra.
            U.palavras(t, cartas[i].f, 95);
            // Libera as cartas que sobraram.
            marca(() => true);
            // Achou todos: termina a espera.
            if (pares === d.i.length) ok();
            // Para aqui nesta jogada.
            return;
          }
          // Errou: espera um pouco e desvira as duas.
          trava = true;
          // Deixa agendado para daqui a pouco.
          setTimeout(() => {
            // Desliga o visual "vira".
            bs[a].classList.remove('vira');
            // Desliga o visual "vira".
            b.classList.remove('vira');
            // Guarda o novo valor em trava.
            trava = false;
            // Usa a ajuda "marca" (ela está definida neste arquivo).
            marca(() => true);
            // O número abaixo é o tempo de espera, em milésimos de segundo (1000 = 1 segundo).
          }, 800);
        })
      );
    });
    // Deixa ler a última frase.
    await U.esperar(2400);
    // Frase final.
    await K.fala(t, d.fim, 130);
    // Espera o toque para seguir.
    await K.mais(caixa);
  };

  // Capítulo 8 — Batidas: cada toque faz o coração crescer e muda a frase.
  Cap.ritmo = async (d) => {
    // Abre a tela e cria o coração.
    const caixa = abre(d, 'c-ritmo');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
    const b = U.el('button', 'pulso', CORACAO);
    // Diz ao navegador que é um botão comum.
    b.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    b.setAttribute('aria-label', d.ti);
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(b);
    // Lugar da frase.
    const t = K.add(caixa, 'p', 'texto', 'Toque no coração.');
    // Cada toque é uma batida.
    await K.vezes(b, d.i.length, (i) => {
      // Reinicia a animação da batida.
      b.classList.remove('bate');
      // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
      void b.offsetWidth;
      // Liga o visual "bate" (veja .bate no CSS).
      b.classList.add('bate');
      // Faz o coração crescer um pouco a cada toque.
      b.style.setProperty('--n', i);
      // Faíscas, som e a frase desta batida.
      Efeitos.em(b, 12 + i * 3);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(240 + i * 70, 150);
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.i[i - 1], 95);
    });
    // Deixa ler a última frase.
    await U.esperar(2400);
    // Frase final.
    await K.fala(t, d.fim, 130);
    // Espera o toque para seguir.
    await K.mais(caixa);
  };

  // Deixa os capítulos disponíveis para o resto do site.
  g.Capitulos = Cap;
  // Fecha a caixa e já roda tudo.
})(window);
