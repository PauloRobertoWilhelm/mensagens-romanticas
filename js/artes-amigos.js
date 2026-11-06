/* ==========================================================
   artes-amigos.js — uma animação própria para cada link de amigos (ids 41 a 60).
   Os textos ficam em data/mensagens-amigos.js; aqui só há desenho e movimento.
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

  // Sons graves e agudos dos pads de bateria: frequência, duração e tipo de onda.
  const PADS = [
    [70, 240, 'sine'],
    [180, 120, 'triangle'],
    [1200, 60, 'square'],
    [320, 160, 'triangle'],
    [90, 200, 'square'],
    [1800, 90, 'sawtooth']
  ];

  // 41 — Álbum de figurinhas: abra o pacote e cole cada amigo no lugar.
  A.figurinhas = async (d) => {
    // Abre a tela, o título e o álbum com vagas vazias.
    const caixa = K.tela('a-figurinhas');
    // Cria a peça "chamada" dentro de caixa.
    K.add(caixa, 'p', 'chamada', d.titulo);
    // Cria a peça "album" dentro de caixa e guarda com o nome "album".
    const album = K.add(caixa, 'div', 'album');
    // Passa por cada item da lista e monta uma lista nova e guarda com o nome "vagas".
    const vagas = d.figs.map((_, i) => K.add(album, 'div', 'vaga', String(i + 1)));
    // Pacote fechado e dica.
    const pac = U.el('button', 'pacote', U.esc(d.pacote));
    // Diz ao navegador que é um botão comum.
    pac.type = 'button';
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(pac);
    // Espera abrir o pacote.
    await K.toque(pac);
    // Tira pac da tela.
    pac.remove();
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(300, 140, 'sawtooth', 0.04);
    // Figurinhas soltas na mesa.
    const mesa = K.add(caixa, 'div', 'mesa');
    // Passa por cada item da lista e monta uma lista nova e guarda com o nome "fs".
    const fs = d.figs.map((f) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'fig', U.esc(f.e));
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Coloca a peça nova dentro de mesa.
      mesa.appendChild(b);
      // Termina aqui e entrega o resultado.
      return b;
    });
    // Cada toque cola uma figurinha na sua vaga.
    await K.todos(fs, (b, i) => {
      // Troca o que aparece dentro de vagas[i].
      vagas[i].innerHTML = '<b>' + U.esc(d.figs[i].e) + '</b><span>' + U.fmt(d.figs[i].t) + '</span>';
      // Liga o visual "colada" (veja .colada no CSS).
      vagas[i].classList.add('colada');
      // Muda se aparece de b.
      b.style.visibility = 'hidden';
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(700 + i * 80, 90);
    });
    // Tira a mesa e fecha o álbum.
    mesa.remove();
    // Cria a peça "texto" dentro de caixa.
    K.add(caixa, 'p', 'texto entra', d.fecho);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 42 — Ficha de personagem em pixel: atributos sobem e conquistas pipocam.
  A.rpg = async (d) => {
    // Abre a tela e monta a ficha.
    const caixa = K.tela('a-rpg');
    // Cria a peça "ficha" dentro de caixa e guarda com o nome "j".
    const j = K.add(caixa, 'div', 'ficha');
    // Cria a peça "título" dentro de j.
    K.add(j, 'h1', '', d.titulo);
    // Cria a peça "nivel" dentro de j.
    K.add(j, 'p', 'nivel', d.nivel);
    // Uma linha para cada atributo.
    const at = d.atributos.map(([n, v]) => {
      // Cria a peça "attr" dentro de j e guarda com o nome "l".
      const l = K.add(j, 'div', 'attr');
      // Cria a peça "texto" dentro de l.
      K.add(l, 'span', '', n);
      // Cria a peça "enfeite" dentro de K.add(l, 'div', 'trilho-r') e guarda com o nome "b".
      const b = K.add(K.add(l, 'div', 'trilho-r'), 'i');
      // Cria a peça "texto forte" dentro de l e guarda com o nome "val".
      const val = K.add(l, 'b', '', '0');
      // Termina aqui e entrega o resultado.
      return { b, val, v };
    });
    // Espera começar.
    await K.mais(caixa, d.botao);
    // Enche cada barra com som de jogo.
    for (const a of at) {
      // Muda a largura de a.b.
      a.b.style.width = Math.min(100, a.v) + '%';
      // Faz o número subir aos poucos.
      await U.contar(a.v, 700, (v) => {
        // Troca o texto de a.val.
        a.val.textContent = v;
      });
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(660, 80, 'square', 0.04);
    }
    // Pipoca as conquistas.
    for (const c of d.conquistas) {
      // Cria a peça "conquista" dentro de j.
      K.add(j, 'p', 'conquista entra', c);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(988, 120, 'square', 0.05);
      // Espera 1,5 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(1500);
    }
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 43 — Prova de escola: toda resposta está certa, e a caneta vermelha concorda.
  A.prova = async (d) => {
    // Abre a tela e monta a folha.
    const caixa = K.tela('a-prova');
    // Cria a peça "prova" dentro de caixa e guarda com o nome "f".
    const f = K.add(caixa, 'div', 'prova');
    // Cria a peça "título" dentro de f.
    K.add(f, 'h1', '', d.titulo);
    // Cria a peça "aluno" dentro de f.
    K.add(f, 'p', 'aluno', d.aluno);
    // Cria a peça "nota" dentro de f e guarda com o nome "nota".
    const nota = K.add(f, 'b', 'nota');
    // Cria a peça "questoes" dentro de f e guarda com o nome "area".
    const area = K.add(f, 'div', 'questoes');
    // Uma questão de cada vez.
    for (const q of d.questoes) {
      // Limpa e escreve a pergunta.
      area.innerHTML = '';
      // Cria a peça "perg" dentro de area.
      K.add(area, 'p', 'perg', q.p);
      // Cria as opções.
      const ops = q.o.map((o) => {
        // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
        const b = U.el('button', 'op', U.fmt(o));
        // Diz ao navegador que é um botão comum.
        b.type = 'button';
        // Coloca a peça nova dentro de area.
        area.appendChild(b);
        // Termina aqui e entrega o resultado.
        return b;
      });
      // Espera a escolha e marca como certa.
      const i = await K.qual(ops);
      // Liga o visual "certa" (veja .certa no CSS).
      ops[i].classList.add('certa');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(880, 110);
      // A professora comenta com caneta vermelha.
      const r = K.add(area, 'p', 'caneta');
      // Escreve o texto palavra por palavra e espera terminar.
      await K.fala(r, q.r);
      // Espera 1,1 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(1100);
    }
    // Mostra a nota final.
    area.innerHTML = '';
    // Troca o texto de nota.
    nota.textContent = d.nota;
    // Liga o visual "on" (veja .on no CSS).
    nota.classList.add('on');
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(523, 300);
    // Cria a peça "caneta" dentro de area.
    K.add(area, 'p', 'caneta entra', d.obs);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 44 — Pescaria: segure para puxar a linha e veja o que veio.
  A.pesca = async (d) => {
    // Abre a tela cheia com o mar, a linha e o que vem no anzol.
    const caixa = K.tela('a-pesca cheia');
    // Cria a peça "agua" dentro de caixa e guarda com o nome "m".
    const m = K.add(caixa, 'div', 'agua');
    // Cria a peça "linha" dentro de m e guarda com o nome "linha".
    const linha = K.add(m, 'i', 'linha');
    // Cria a peça "presa" dentro de m e guarda com o nome "item".
    const item = K.add(m, 'b', 'presa');
    // Frase e botão de segurar.
    const t = K.add(m, 'p', 'texto', d.abre);
    // Cria um botão dentro de m e guarda com o nome "bt".
    const bt = K.botao(m, d.botao);
    // Uma puxada para cada pesca.
    for (const p of d.pescas) {
      // Linha lá no fundo.
      item.textContent = '';
      // Muda a altura de linha.
      linha.style.height = '66%';
      // Sobe a linha enquanto segura.
      await K.segura(bt, 1700, (q) => {
        // Muda a altura de linha.
        linha.style.height = 66 - q * 50 + '%';
      });
      // Mostra o que veio.
      item.textContent = p.e;
      // Desliga o visual "sobe".
      item.classList.remove('sobe');
      // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
      void item.offsetWidth;
      // Liga o visual "sobe" (veja .sobe no CSS).
      item.classList.add('sobe');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(620, 180);
      // Comenta a pesca.
      await K.fala(t, p.t);
      // Espera 0,8 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(800);
    }
    // Tira o botão e segue para o final.
    bt.remove();
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(m, d.fim);
  };

  // 45 — Bateria eletrônica: toque em todos os pads para fazer barulho junto.
  A.pads = async (d) => {
    // Abre a tela, o título e a grade de pads.
    const caixa = K.tela('a-pads');
    // Cria a peça "marca" dentro de caixa.
    K.add(caixa, 'h1', 'marca', d.titulo);
    // Cria a peça "grade-p" dentro de caixa e guarda com o nome "gr".
    const gr = K.add(caixa, 'div', 'grade-p');
    // Cria os seis pads, cada um com sua cor.
    const ps = d.pads.map((n, i) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'pad', U.esc(n));
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Atualiza o valor --h, que o CSS usa.
      b.style.setProperty('--h', i * 58);
      // Coloca a peça nova dentro de gr.
      gr.appendChild(b);
      // Termina aqui e entrega o resultado.
      return b;
    });
    // Texto que muda a cada batida.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Faz o som do pad e pisca a luz; continua respondendo mesmo depois de contar.
    ps.forEach((b, i) =>
      b.addEventListener('pointerdown', () => {
        // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
        K.som(PADS[i][0], PADS[i][1], PADS[i][2], 0.14);
        // Desliga o visual "bate".
        b.classList.remove('bate');
        // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
        void b.offsetWidth;
        // Liga o visual "bate" (veja .bate no CSS).
        b.classList.add('bate');
      })
    );
    // Espera tocar em todos e troca a frase.
    let n = 0;
    // Espera a pessoa tocar em todos os itens da lista.
    await K.todos(ps, () => {
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.frases[n++], 100);
    });
    // Deixa ler e segue para o final.
    await U.esperar(2300);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 46 — Boleto da amizade: código de barras, vencimento nunca, carimbo de pago.
  A.boleto = async (d) => {
    // Abre a tela e monta o papel.
    const caixa = K.tela('a-boleto');
    // Cria a peça "recibo" dentro de caixa e guarda com o nome "b".
    const b = K.add(caixa, 'div', 'recibo');
    // Cria a peça "título" dentro de b.
    K.add(b, 'h1', '', d.banco);
    // Campos do boleto.
    d.campos.forEach(([r, v]) => K.par(b, 'cel-b', r, v));
    // Código de barras com larguras sorteadas.
    b.appendChild(
      U.el(
        'div',
        'barras',
        Array.from({ length: 56 }, () => '<i style="width:' + Math.ceil(U.rand(1, 4)) + 'px"></i>').join('')
      )
    );
    // Espera pagar.
    await K.mais(caixa, d.botao);
    // Carimbo com pancada.
    K.add(b, 'div', 'pago', d.carimbo);
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(70, 240, 'square', 0.12);
    // Faz o celular tremer um pouquinho.
    U.vibra(60);
    // Observação e segue.
    await U.esperar(900);
    // Cria a peça "texto" dentro de caixa.
    K.add(caixa, 'p', 'texto entra', d.fecho);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 47 — Pódio: terceiro, segundo e, por fim, a medalha de ouro desce.
  A.podio = async (d) => {
    // Abre a tela e monta o pódio vazio.
    const caixa = K.tela('a-podio');
    // Cria a peça "chamada" dentro de caixa.
    K.add(caixa, 'p', 'chamada', d.titulo);
    // Cria a peça "degraus" dentro de caixa e guarda com o nome "p".
    const p = K.add(caixa, 'div', 'degraus');
    // Blocos na ordem visual: segundo, primeiro, terceiro.
    const bl = [
      ['b2', '2', d.segundo],
      ['b1', '1', d.primeiro],
      ['b3', '3', d.terceiro]
    ].map(([c, n, nome]) => {
      // Cria a peça "caixa" dentro de p e guarda com o nome "e".
      const e = K.add(p, 'div', 'bloco-p ' + c);
      // Cria a peça "quem" dentro de e.
      K.add(e, 'span', 'quem', nome);
      // Cria a peça "texto forte" dentro de e.
      K.add(e, 'b', '', n);
      // Termina aqui e entrega o resultado.
      return e;
    });
    // Ordem de subida: terceiro, segundo, primeiro.
    for (const i of [2, 0, 1]) {
      // Mostra um botão, espera a pessoa tocar e tira o botão.
      await K.mais(caixa, i === 1 ? d.ouro : d.botao);
      // Liga o visual "sobe" (veja .sobe no CSS).
      bl[i].classList.add('sobe');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(i === 1 ? 784 : 392, 200, 'triangle');
      // Espera 0,9 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(900);
    }
    // Medalha cai no vencedor.
    K.add(bl[1], 'i', 'medalha');
    // Solta uma festa de partículas.
    Fundo.festa(5);
    // Repete para cada item da lista.
    [523, 659, 784].forEach((f, i) => setTimeout(() => K.som(f, 200, 'triangle'), i * 140));
    // Fala e segue.
    const t = K.add(caixa, 'p', 'texto');
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(t, d.fecho);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 48 — Estrada à noite: faixas passando e placas com frases.
  A.estrada = async (d) => {
    // Abre a tela cheia; 'vel' é a velocidade da estrada.
    const caixa = K.tela('a-estrada cheia');
    // Anotações que o código vai usando enquanto funciona: pos, vel.
    let pos = 0,
      vel = 0.006;
    // Desenha a estrada em perspectiva a cada quadro.
    K.pinta(caixa, (cx, w, h) => {
      // Céu noturno e chão.
      const hz = h * 0.42;
      // Escolhe a cor da tinta do pincel.
      cx.fillStyle = '#080a1e';
      // Pinta um retângulo.
      cx.fillRect(0, 0, w, hz);
      // Escolhe a cor da tinta do pincel.
      cx.fillStyle = '#10161f';
      // Pinta um retângulo.
      cx.fillRect(0, hz, w, h - hz);
      // Lua no alto.
      cx.fillStyle = '#f4efd6';
      // Começa um desenho novo.
      cx.beginPath();
      // Desenha um círculo.
      cx.arc(w * 0.8, h * 0.13, 24, 0, 6.3);
      // Pinta por dentro do desenho.
      cx.fill();
      // Asfalto em trapézio.
      cx.fillStyle = '#2b2f3a';
      // Começa um desenho novo.
      cx.beginPath();
      // Coloca o lápis neste ponto.
      cx.moveTo(w / 2 - 7, hz);
      // Risca uma linha até este ponto.
      cx.lineTo(w / 2 + 7, hz);
      // Risca uma linha até este ponto.
      cx.lineTo(w * 1.1, h);
      // Risca uma linha até este ponto.
      cx.lineTo(-w * 0.1, h);
      // Pinta por dentro do desenho.
      cx.fill();
      // Avança a estrada.
      pos = (pos + vel) % 1;
      // Faixas brancas que crescem ao se aproximar.
      cx.fillStyle = '#f5e27a';
      // Repete várias vezes, contando as voltas.
      for (let i = 0; i < 8; i++) {
        // Anotações que o código vai usando enquanto funciona: z, y, a, l.
        const z = (i / 8 + pos) % 1,
          y = hz + (h - hz) * z * z,
          a = 1 + z * z * 9,
          l = 4 + z * z * 58;
        // Pinta um retângulo.
        cx.fillRect(w / 2 - a / 2, y, a, l);
      }
    });
    // Placa que vem da frente e texto.
    const s = K.add(caixa, 'div', 'sobre');
    // Cria a peça "placa-e" dentro de caixa e guarda com o nome "pl".
    const pl = K.add(caixa, 'div', 'placa-e');
    // Passa uma placa por frase.
    for (let i = 0; i < d.placas.length; i++) {
      // Toque para acelerar.
      await K.mais(s, i ? d.botao : d.comecar);
      // Muda a velocidade da estrada.
      vel = 0.018;
      // Troca a placa e reinicia o movimento dela.
      pl.innerHTML = U.fmt(d.placas[i]);
      // Desliga o visual "vem".
      pl.classList.remove('vem');
      // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
      void pl.offsetWidth;
      // Liga o visual "vem" (veja .vem no CSS).
      pl.classList.add('vem');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(200, 300, 'sawtooth', 0.02);
      // Dá tempo de ler e volta à velocidade normal.
      await U.esperar(3300);
      // Muda a velocidade da estrada.
      vel = 0.006;
    }
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(s, d.fim);
  };

  // 49 — Cacto: amizade que sobrevive sem água, mas cresce com ela.
  A.cacto = async (d) => {
    // Abre a tela com vaso, cacto e braços.
    const caixa = K.tela('a-cacto');
    // Cria a peça "vaso" dentro de caixa e guarda com o nome "v".
    const v = K.add(caixa, 'div', 'vaso');
    // Cria a peça "planta" dentro de v e guarda com o nome "c".
    const c = K.add(v, 'div', 'planta');
    // Cria a peça "braco-e" dentro de c.
    K.add(c, 'i', 'braco-e');
    // Cria a peça "braco-d" dentro de c.
    K.add(c, 'i', 'braco-d');
    // Cria a peça "flor" dentro de c.
    K.add(c, 'b', 'flor', '✿');
    // Frase e regador.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Cria um botão dentro de caixa e guarda com o nome "r".
    const r = K.botao(caixa, d.botao);
    // Cada regada cresce uma fase.
    await K.vezes(r, d.frases.length, (i) => {
      // Anota "fase" em c, para o CSS ou o teste usarem.
      c.dataset.fase = i;
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.frases[i - 1], 110);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(520 + i * 70, 200);
    });
    // Tira o regador, deixa ler e segue.
    r.remove();
    // Espera 2,5 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(2500);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 50 — Fita VHS: chiado, rebobina, e as memórias passam na tela.
  A.vhs = async (d) => {
    // Abre a tela cheia; 'chiado' controla a força da estática.
    const caixa = K.tela('a-vhs cheia');
    // Guarda este valor com o nome "chiado".
    let chiado = 1;
    // Estática em blocos, barata para o celular.
    K.pinta(caixa, (cx, w, h) => {
      // Fundo escuro quase azul.
      cx.fillStyle = '#0a0c14';
      // Pinta um retângulo.
      cx.fillRect(0, 0, w, h);
      // Pontos brancos sorteados a cada quadro.
      for (let i = 0; i < 900 * chiado; i++) {
        // Escolhe a cor da tinta do pincel.
        cx.fillStyle = 'rgba(255,255,255,' + Math.random() * 0.5 + ')';
        // Pinta um retângulo.
        cx.fillRect(Math.random() * w, Math.random() * h, 3, 2);
      }
      // Faixa de interferência descendo.
      cx.fillStyle = 'rgba(255,255,255,.06)';
      // Pinta um retângulo.
      cx.fillRect(0, (performance.now() / 9) % h, w, 34);
    });
    // Interface da fita por cima.
    const s = K.add(caixa, 'div', 'sobre');
    // Cria a peça "modo" dentro de s e guarda com o nome "modo".
    const modo = K.add(s, 'p', 'modo', d.rebobina);
    // Cria a peça "tempo" dentro de s e guarda com o nome "tc".
    const tc = K.add(s, 'p', 'tempo', '00:00:00');
    // Cria a peça "legenda-v" dentro de s e guarda com o nome "t".
    const t = K.add(s, 'p', 'legenda-v');
    // Espera apertar o play.
    await K.mais(s, d.play);
    // Rebobina os números.
    await U.contar(5400, 1800, (v) => {
      // Troca o texto de tc.
      tc.textContent =
        '0' +
        Math.floor(v / 3600) +
        ':' +
        String(Math.floor(v / 60) % 60).padStart(2, '0') +
        ':' +
        String(v % 60).padStart(2, '0');
    });
    // Imagem limpa e modo de reprodução.
    chiado = 0.08;
    // Troca o texto de modo.
    modo.textContent = d.tocando;
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(800, 60, 'square', 0.03);
    // As memórias passam como legendas.
    await K.frases(t, d.memorias);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(s, d.fim);
  };

  // 51 — Máquina de garra: pegue as cápsulas com frases dentro.
  A.garra = async (d) => {
    // Abre a tela e monta a vitrine.
    const caixa = K.tela('a-garra');
    // Cria a peça "chamada" dentro de caixa.
    K.add(caixa, 'p', 'chamada', d.titulo);
    // Cria a peça "vitrine" dentro de caixa e guarda com o nome "v".
    const v = K.add(caixa, 'div', 'vitrine');
    // Cria a peça "gancho" dentro de v e guarda com o nome "g2".
    const g2 = K.add(v, 'div', 'gancho');
    // Cápsulas coloridas no fundo.
    const fundo = K.add(v, 'div', 'bolas');
    // Repete várias vezes, contando as voltas.
    for (let i = 0; i < 10; i++) {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "c".
      const c = U.el('i');
      // Muda o fundo de c.
      c.style.background = 'hsl(' + i * 36 + ' 85% 62%)';
      // Coloca a peça nova dentro de fundo.
      fundo.appendChild(c);
    }
    // Frase e botão de descer.
    const t = K.add(caixa, 'p', 'texto');
    // Cria um botão dentro de caixa e guarda com o nome "bt".
    const bt = K.botao(caixa, d.botao);
    // Três tentativas: sempre vem alguma coisa boa.
    for (const f of d.frases) {
      // Espera apertar.
      await K.toque(bt);
      // Liga ou desliga o botão.
      bt.disabled = true;
      // Liga o visual "desce" (veja .desce no CSS).
      g2.classList.add('desce');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(240, 700, 'sawtooth', 0.03);
      // Espera 1,7 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(1700);
      // Volta com a cápsula e abre.
      g2.classList.remove('desce');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(880, 140);
      // Escreve o texto palavra por palavra e espera terminar.
      await K.fala(t, f);
      // Espera 0,7 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(700);
      // Liga ou desliga o botão.
      bt.disabled = false;
    }
    // Tira o botão e segue.
    bt.remove();
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 52 — Dossiê confidencial: as tarjas pretas somem ao toque.
  A.dossie = async (d) => {
    // Abre a tela e a pasta de papel pardo.
    const caixa = K.tela('a-dossie');
    // Cria a peça "pasta" dentro de caixa e guarda com o nome "p".
    const p = K.add(caixa, 'div', 'pasta');
    // Cria a peça "título" dentro de p.
    K.add(p, 'h1', '', d.titulo);
    // Cria a peça "codigo" dentro de p.
    K.add(p, 'p', 'codigo', d.codigo);
    // Cada linha tem uma parte visível e uma tarja.
    const tarjas = d.linhas.map(([a, b]) => {
      // Cria a peça "lin-d" dentro de p e guarda com o nome "l".
      const l = K.add(p, 'p', 'lin-d', a + ' ');
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "s".
      const s = U.el('button', 'tarja', U.fmt(b));
      // Diz ao navegador que é um botão comum.
      s.type = 'button';
      // Coloca a peça nova dentro de l.
      l.appendChild(s);
      // Termina aqui e entrega o resultado.
      return s;
    });
    // Dica de toque.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Tira cada tarja.
    await K.todos(tarjas, (s) => {
      // Liga o visual "lida" (veja .lida no CSS).
      s.classList.add('lida');
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(1400, 40, 'square', 0.03);
    });
    // Carimbo e fecha.
    dica.remove();
    // Cria a peça "secreto" dentro de p.
    K.add(p, 'div', 'secreto', d.carimbo);
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(80, 240, 'square', 0.12);
    // Espera 1,5 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(1500);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 53 — Postais: deslize cada um para o lado para ver o de baixo.
  A.postais = async (d) => {
    // Abre a tela e a pilha.
    const caixa = K.tela('a-postais');
    // Cria a peça "pilha-p" dentro de caixa e guarda com o nome "pilha".
    const pilha = K.add(caixa, 'div', 'pilha-p');
    // Cartão de baixo, que fica por último.
    const ult = K.add(pilha, 'div', 'postal ultimo');
    // Cria a peça "mao-p" dentro de ult.
    K.add(ult, 'p', 'mao-p', d.fecho);
    // Cria os postais, com o primeiro por cima.
    const ps = d.postais.map((x, i) => {
      // Cria a peça "postal" dentro de pilha e guarda com o nome "c".
      const c = K.add(pilha, 'div', 'postal');
      // Muda a camada de c.
      c.style.zIndex = d.postais.length - i;
      // Atualiza o valor --r, que o CSS usa.
      c.style.setProperty('--r', (i % 2 ? 1 : -1) * (1 + i) + 'deg');
      // Atualiza o valor --h, que o CSS usa.
      c.style.setProperty('--h', 190 + i * 45);
      // Cria a peça "lugar" dentro de c.
      K.add(c, 'b', 'lugar', x.l);
      // Cria a peça "mao-p" dentro de c.
      K.add(c, 'p', 'mao-p', x.t);
      // Cria a peça "selo-p" dentro de c.
      K.add(c, 'i', 'selo-p');
      // Termina aqui e entrega o resultado.
      return c;
    });
    // Dica de deslizar.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Tira um postal por vez.
    for (const c of ps) {
      // Acompanha o dedo e joga fora quando passa do limite.
      await K.arrasta(c, {
        // Direção do gesto: quanto anda para o lado e para baixo.
        rumo: [240, 0],
        // O que acontece enquanto o dedo anda.
        move: (dx) => {
          // Muda a velocidade da mudança de c.
          c.style.transition = 'none';
          // Muda o movimento de c.
          c.style.transform = 'translateX(' + dx + 'px) rotate(' + dx / 18 + 'deg)';
        },
        // O que acontece quando o dedo solta.
        solta: (dx) => {
          // Muda a velocidade da mudança de c.
          c.style.transition = 'transform .4s';
          // Se a condição entre parênteses valer, para por aqui.
          if (Math.abs(dx) > 90) return true;
          // Muda o movimento de c.
          c.style.transform = '';
          // Termina aqui e entrega o resultado.
          return false;
        }
      });
      // Voa para fora.
      c.style.transform = 'translateX(130vw) rotate(24deg)';
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(420, 80, 'triangle', 0.04);
      // Espera 0,35 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(350);
    }
    // Tira a dica e segue.
    dica.remove();
    // Espera 0,9 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(900);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 54 — Botão vermelho proibido: cada apertada piora a situação.
  A.botao = async (d) => {
    // Abre a tela com faixas de perigo.
    const caixa = K.tela('a-botao');
    // Cria a peça "aviso-b" dentro de caixa.
    K.add(caixa, 'p', 'aviso-b', d.aviso);
    // Botão grande.
    const b = U.el('button', 'vermelho', U.esc(d.rotulo));
    // Diz ao navegador que é um botão comum.
    b.type = 'button';
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(b);
    // Frase.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Cada aperto treme a tela e troca a frase.
    await K.vezes(b, d.frases.length, (i) => {
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.frases[i - 1], 100);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(120 + i * 60, 180, 'sawtooth', 0.07);
      // Desliga o visual "treme".
      caixa.parentElement.classList.remove('treme');
      // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
      void caixa.offsetWidth;
      // Liga o visual "treme" (veja .treme no CSS).
      caixa.parentElement.classList.add('treme');
    });
    // Deixa ler a última.
    await U.esperar(2500);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 55 — Rádio comunicador: segure para falar, solte e ouça a resposta.
  A.radio = async (d) => {
    // Abre a tela e monta o aparelho.
    const caixa = K.tela('a-radio');
    // Cria a peça "walkie" dentro de caixa e guarda com o nome "r".
    const r = K.add(caixa, 'div', 'walkie');
    // Cria a peça "antena" dentro de r.
    K.add(r, 'i', 'antena');
    // Cria a peça "visor-r" dentro de r e guarda com o nome "vis".
    const vis = K.add(r, 'div', 'visor-r');
    // Cria a peça "grade-r" dentro de r e guarda com o nome "leds".
    const leds = K.add(r, 'i', 'grade-r');
    // Botão de falar.
    const ptt = U.el('button', 'ptt', U.esc(d.botao));
    // Diz ao navegador que é um botão comum.
    ptt.type = 'button';
    // Coloca a peça nova dentro de r.
    r.appendChild(ptt);
    // Uma fala por vez.
    for (const f of d.falas) {
      // Enquanto segura, o visor mostra a transmissão.
      vis.textContent = d.espera;
      // Espera a pessoa segurar o dedo em ptt.
      await K.segura(ptt, 1300, (p) => {
        // Muda a transparência de leds.
        leds.style.opacity = 0.3 + p * 0.7;
        // Se a condição entre parênteses valer: troca o texto de vis.
        if (p > 0) vis.textContent = d.transmitindo;
      });
      // Chiado de rádio e resposta.
      K.som(1800, 90, 'sawtooth', 0.03);
      // Troca o texto de vis.
      vis.textContent = '';
      // Escreve o texto palavra por palavra e espera terminar.
      await K.fala(vis, f, 120);
      // Espera 1,5 segundos antes de continuar. Número maior = mais demora.
      await U.esperar(1500);
    }
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(caixa, d.fim);
  };

  // 56 — Ligação de madrugada: deslize para atender e escute.
  A.ligacao = async (d) => {
    // Abre a tela cheia e monta a tela do celular.
    const caixa = K.tela('a-ligacao cheia');
    // Cria a peça "chamada-t" dentro de caixa e guarda com o nome "c".
    const c = K.add(caixa, 'div', 'chamada-t');
    // Cria a peça "hora" dentro de c.
    K.add(c, 'p', 'hora', d.hora);
    // Cria a peça "foto-l" dentro de c.
    K.add(c, 'i', 'foto-l');
    // Cria a peça "título" dentro de c.
    K.add(c, 'h1', '', d.contato);
    // Cria a peça "estado" dentro de c e guarda com o nome "st".
    const st = K.add(c, 'p', 'estado', d.estado);
    // Toque de telefone repetido.
    const toca = setInterval(() => {
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(880, 200);
      // Deixa agendado para daqui a pouco.
      setTimeout(() => K.som(740, 200), 220);
      // O número abaixo é o tempo de espera, em milésimos de segundo (1000 = 1 segundo).
    }, 1800);
    // Trilho de atender.
    const tr = K.add(c, 'div', 'trilho-l');
    // Cria a peça "texto" dentro de tr.
    K.add(tr, 'span', '', d.dica);
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "bola".
    const bola = U.el('button', 'atende', '📞');
    // Diz ao navegador que é um botão comum.
    bola.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    bola.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de tr.
    tr.appendChild(bola);
    // Distância do arrasto.
    const max = () => tr.clientWidth - bola.offsetWidth - 10;
    // Atender é arrastar a bola até o fim.
    await K.arrasta(bola, {
      // Direção do gesto: quanto anda para o lado e para baixo.
      rumo: [300, 0],
      // O que acontece enquanto o dedo anda.
      move: (dx) => {
        // Muda o movimento de bola.
        bola.style.transform = 'translateX(' + Math.max(0, Math.min(max(), dx)) + 'px)';
      },
      // O que acontece quando o dedo solta.
      solta: (dx) => {
        // Se a condição entre parênteses valer, para por aqui.
        if (dx >= max() * 0.8) return true;
        // Muda o movimento de bola.
        bola.style.transform = '';
        // Termina aqui e entrega o resultado.
        return false;
      }
    });
    // Para de tocar e começa a chamada.
    clearInterval(toca);
    // Tira tr da tela.
    tr.remove();
    // Cronômetro da ligação.
    let s = 0;
    // Repete de tempos em tempos e guarda com o nome "rel".
    const rel = setInterval(() => {
      // Soma 1 em s.
      s++;
      // Troca o texto de st.
      st.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
      // O número abaixo é o tempo de espera, em milésimos de segundo (1000 = 1 segundo).
    }, 1000);
    // A conversa aparece.
    const t = K.add(c, 'p', 'texto');
    // Mostra as frases uma de cada vez.
    await K.frases(t, d.frases);
    // Para a repetição.
    clearInterval(rel);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(c, d.fim);
  };

  // 57 — Diploma com moldura, selo e assinatura que se desenha.
  A.diploma = async (d) => {
    // Abre a tela e monta o papel com moldura.
    const caixa = K.tela('a-diploma');
    // Cria a peça "certificado" dentro de caixa e guarda com o nome "p".
    const p = K.add(caixa, 'div', 'certificado');
    // Cria a peça "inst" dentro de p.
    K.add(p, 'p', 'inst', d.instituicao);
    // Cria a peça "título" dentro de p.
    K.add(p, 'h1', '', d.titulo);
    // Cria a peça "corpo-d" dentro de p.
    K.add(p, 'p', 'corpo-d', d.corpo);
    // Assinatura em traço único, que se desenha sozinha.
    const a = U.el(
      'div',
      'assina',
      '<svg viewBox="0 0 200 50" aria-hidden="true"><path pathLength="1" d="M8 34C20 8 30 8 28 30C26 44 40 12 52 16C62 20 46 42 62 30C78 18 74 40 92 26C108 14 100 40 120 28C140 18 136 38 192 18"/></svg>'
    );
    // Coloca a peça nova dentro de p.
    p.appendChild(a);
    // Cria a peça "quem-d" dentro de p.
    K.add(p, 'p', 'quem-d', d.quem);
    // Espera assinar.
    await K.mais(caixa, d.botao);
    // Liga o visual "traca" (veja .traca no CSS).
    a.classList.add('traca');
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(1200, 700, 'sawtooth', 0.008);
    // Espera 1,5 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(1500);
    // Selo dourado.
    K.add(p, 'i', 'selo-d');
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(660, 200);
    // Deixa ver e segue.
    await U.esperar(1100);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 58 — Porta de geladeira: tire os recados e leia o último.
  A.geladeira = async (d) => {
    // Abre a tela cheia com a porta.
    const caixa = K.tela('a-geladeira cheia');
    // Cria a peça "porta-g" dentro de caixa e guarda com o nome "f".
    const f = K.add(caixa, 'div', 'porta-g');
    // Cria a peça "puxador" dentro de f.
    K.add(f, 'i', 'puxador');
    // Recado final, por baixo dos outros.
    const fim = K.add(f, 'p', 'recado ultimo', d.fecho);
    // Posições e cores dos recados.
    const POS = [
      [10, 10, '#ffe45c'],
      [46, 18, '#9ff0c7'],
      [14, 40, '#ffb3c7'],
      [48, 46, '#a9d8ff']
    ];
    // Cria os recados.
    const rs = d.recados.map((t, i) => {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
      const b = U.el('button', 'recado', U.fmt(t));
      // Diz ao navegador que é um botão comum.
      b.type = 'button';
      // Muda a distância da esquerda de b.
      b.style.left = POS[i][0] + '%';
      // Muda a distância de cima de b.
      b.style.top = POS[i][1] + '%';
      // Muda o fundo de b.
      b.style.background = POS[i][2];
      // Atualiza o valor --r, que o CSS usa.
      b.style.setProperty('--r', (i % 2 ? 1 : -1) * 4 + 'deg');
      // Coloca a peça nova dentro de f.
      f.appendChild(b);
      // Termina aqui e entrega o resultado.
      return b;
    });
    // Dica de toque.
    const dica = K.add(f, 'p', 'dica', d.dica);
    // Tirar um recado mostra a frase dele e o faz cair.
    let n = 0;
    // Espera a pessoa tocar em todos os itens da lista.
    await K.todos(rs, (b) => {
      // Liga o visual "cai" (veja .cai no CSS).
      b.classList.add('cai');
      // Esconde dica.
      dica.hidden = true;
      // Soma 1 em n.
      n++;
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(500 + n * 70, 80, 'triangle');
    });
    // Mostra o recado de baixo.
    fim.classList.add('ve');
    // Espera 1,4 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(1400);
    // Mostra o último botão e, depois do toque, vai para a tela final.
    await K.mais(f, d.fim);
  };

  // 59 — Biscoito da sorte: quebre e puxe o papelzinho.
  A.biscoito = async (d) => {
    // Abre a tela com o biscoito em duas metades.
    const caixa = K.tela('a-biscoito');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
    const b = U.el(
      'button',
      'cookie',
      '<svg viewBox="0 0 200 130" aria-hidden="true"><path class="m1" d="M100 18C52 18 12 56 16 112C44 92 74 92 100 118Z"/><path class="m2" d="M100 18C148 18 188 56 184 112C156 92 126 92 100 118Z"/></svg>'
    );
    // Diz ao navegador que é um botão comum.
    b.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    b.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(b);
    // Cria a peça "dica" dentro de caixa e guarda com o nome "dica".
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Três toques para quebrar.
    await K.vezes(b, 3, (i) => {
      // Anota "rachou" em b, para o CSS ou o teste usarem.
      b.dataset.rachou = i;
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(240 + i * 60, 70, 'square', 0.06);
    });
    // Abre as metades e tira o papel.
    dica.remove();
    // Liga o visual "aberto" (veja .aberto no CSS).
    b.classList.add('aberto');
    // Espera 0,6 segundos antes de continuar. Número maior = mais demora.
    await U.esperar(600);
    // Cria a peça "sorte" dentro de caixa e guarda com o nome "p".
    const p = K.add(caixa, 'div', 'sorte');
    // Cria a peça "texto" dentro de p.
    K.add(p, 'p', '', d.sorte);
    // Cria a peça "texto pequeno" dentro de p.
    K.add(p, 'small', '', d.numeros);
    // Deixa ler e segue.
    await U.esperar(1600);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };

  // 60 — Piñata: bata até estourar.
  A.pinata = async (d) => {
    // Abre a tela com a corda e a estrela.
    const caixa = K.tela('a-pinata');
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "pi".
    const pi = U.el(
      'button',
      'estrela-p',
      '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 4l13 31 33 3-25 22 8 33-29-18-29 18 8-33L4 38l33-3z"/></svg>'
    );
    // Diz ao navegador que é um botão comum.
    pi.type = 'button';
    // Dá um nome à peça, para quem usa leitor de tela.
    pi.setAttribute('aria-label', d.dica);
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(pi);
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto', d.dica);
    // Cada batida balança a estrela e troca a frase.
    await K.vezes(pi, d.frases.length, (i) => {
      // Desliga o visual "bate-p".
      pi.classList.remove('bate-p');
      // Truque: obriga o navegador a se atualizar, para a animação recomeçar do zero.
      void pi.offsetWidth;
      // Liga o visual "bate-p" (veja .bate-p no CSS).
      pi.classList.add('bate-p');
      // Escreve o texto palavra por palavra.
      U.palavras(t, d.frases[i - 1], 100);
      // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
      K.som(180 + i * 40, 120, 'square', 0.07);
    });
    // Estoura a estrela com festa.
    await U.esperar(1900);
    // Liga o visual "estourou" (veja .estourou no CSS).
    pi.classList.add('estourou');
    // Mede o tamanho e o lugar da peça e guarda com o nome "r".
    const r = pi.getBoundingClientRect();
    // Solta partículas neste ponto da tela.
    Fundo.explodirEm(r.left + r.width / 2, r.top + r.height / 2, 70);
    // Solta uma festa de partículas.
    Fundo.festa(4);
    // Toca um sonzinho. 1º número: altura do som (maior = mais agudo). 2º número: duração.
    K.som(80, 320, 'square', 0.14);
    // Faz o celular tremer um pouquinho.
    U.vibra([40, 30, 60]);
    // Frase final e segue.
    await K.fala(t, d.fecho);
    // Mostra um botão, espera a pessoa tocar e tira o botão.
    await K.mais(caixa, d.fim);
  };
  // Fecha a caixa e já roda tudo.
})(window);
