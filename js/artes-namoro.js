/* ==========================================================
   artes-namoro.js — uma animação própria para cada link de namoro (ids 21 a 40).
   Os textos ficam em data/mensagens-namoro.js; aqui só há desenho e movimento.
   ========================================================== */

// Isola variáveis.
(function (g) {
  // Modo estrito.
  'use strict';

  // Coleção global de artes.
  const A = g.Artes = g.Artes || {};

  // Coração formado pelas janelas do prédio: # acende no final.
  const PREDIO = ['..##.##..', '.#######.', '#########', '#########', '.#######.', '..#####..', '...###...', '....#....'];

  // Símbolos das rodas do cofre; o coração é o último.
  const RODA = ['★', '♠', '☾', '♦', '♣', '♥'];

  // Borboleta em duas metades, para as asas poderem bater.
  const ASA = '<svg viewBox="0 0 80 64" aria-hidden="true"><g class="ae"><path d="M39 30C30 6 8 2 5 14C3 26 20 34 39 34z"/><path d="M39 34C24 34 12 42 16 52C20 60 34 52 39 38z"/></g><g class="ad"><path d="M41 30C50 6 72 2 75 14C77 26 60 34 41 34z"/><path d="M41 34C56 34 68 42 64 52C60 60 46 52 41 38z"/></g><rect class="corpo" x="38.500" y="16" width="3" height="32" rx="1.500"/></svg>';

  // Notas da caixinha de música.
  const MELODIA = [523, 659, 784, 659, 880, 784, 659, 523];

  // Desenha um galho da árvore: p diz o quanto ela já cresceu, em níveis.
  const galho = (cx, x, y, a, l, n, p) => {
    // Sem nível ou sem crescimento, para.
    if (n === 0 || p <= 0) return;
    // Cresce até o tamanho inteiro deste nível.
    const q = Math.min(1, p); const x2 = x + Math.cos(a) * l * q, y2 = y + Math.sin(a) * l * q;
    // Traça o galho, mais grosso perto do tronco.
    cx.lineWidth = n * 1.3; cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x2, y2); cx.stroke();
    // Galho terminado: abre os dois filhos.
    if (p > 1) { galho(cx, x2, y2, a - .44, l * .76, n - 1, p - 1); galho(cx, x2, y2, a + .36, l * .74, n - 1, p - 1); }
    // Na ponta, abre uma flor.
    if (n === 1 && q >= 1) { cx.fillStyle = '#f08aa8'; cx.beginPath(); cx.arc(x2, y2, 6, 0, 6.3); cx.fill(); }
  };

  // Faz um foguete explodir em (x,y), somando faíscas à lista.
  const estoura = (lista, x, y) => {
    // Cor do fogo, sorteada no círculo de matizes.
    const cor = U.rand(0, 360);
    // Sessenta faíscas em todas as direções.
    for (let i = 0; i < 60; i++) { const a = U.rand(0, 6.3), v = U.rand(.8, 4.4); lista.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: 1, cor }); }
  };

  // 21 — Carta com lacre de cera: segure para derreter o lacre e a carta se escreve sozinha.
  A.lacre = async (d) => {
    // Abre a tela e monta o papel.
    const caixa = K.tela('a-lacre'); const c = K.add(caixa, 'div', 'papel');
    // O lacre é o botão de segurar.
    const s = U.el('button', 'cera', U.esc(d.selo)); s.type = 'button'; s.setAttribute('aria-label', d.dica); c.appendChild(s);
    // Dica de segurar.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Esquenta enquanto segura.
    await K.segura(s, 1900, (p) => { s.style.setProperty('--p', p); });
    // Quebra o lacre e abre o papel.
    dica.remove(); s.classList.add('quebrou'); c.classList.add('aberta'); K.som(170, 220, 'triangle', .1); await U.esperar(1000);
    // Cada linha aparece escrita à mão.
    for (const l of d.linhas) { const p = K.add(c, 'p', 'mao'); await K.fala(p, l, 125); await U.esperar(450); }
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 22 — Instalador antigo: a barra enche, e o botão "Não" foge do dedo.
  A.instalador = async (d) => {
    // Abre a tela e monta a janela de sistema antigo.
    const caixa = K.tela('a-instalador'); const j = K.add(caixa, 'div', 'janela'); K.add(j, 'header', '', d.titulo); const c = K.add(j, 'div', 'conteudo');
    // Texto, barra e estado.
    const t = K.add(c, 'p', '', d.boas); const barra = K.add(c, 'div', 'barra'); const fill = K.add(barra, 'i'); const st = K.add(c, 'p', 'status');
    // Espera mandar instalar.
    await K.mais(c, d.iniciar);
    // Passa pelas etapas, enchendo a barra.
    for (let k = 0; k < d.etapas.length; k++) { st.textContent = d.etapas[k]; fill.style.width = ((k + 1) / d.etapas.length * 100) + '%'; K.som(440 + k * 60, 60, 'square', .02); await U.esperar(1100); }
    // Tira a barra e faz a pergunta.
    barra.remove(); st.remove(); t.innerHTML = U.fmt(d.pergunta);
    // Botões Sim e Não.
    const op = K.add(c, 'div', 'ops'); const sim = K.botao(op, d.sim); const nao = K.botao(op, d.nao);
    // O Não pula para outro lugar quando o dedo chega perto.
    const foge = () => { nao.style.transform = 'translate(' + U.rand(-120, 60) + 'px,' + U.rand(-130, 40) + 'px)'; K.som(220, 60, 'square', .03); };
    // Liga a fuga ao mouse e ao dedo.
    nao.addEventListener('pointerenter', foge); nao.addEventListener('pointerdown', foge);
    // Só o Sim resolve.
    await K.toque(sim); op.remove(); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(c, d.fim);
  };

  // 23 — Bateria quase no fim: segure o abraço para carregar até 100%.
  A.bateria = async (d) => {
    // Abre a tela com o aviso e a bateria.
    const caixa = K.tela('a-bateria'); K.add(caixa, 'p', 'aviso', d.aviso); const b = K.add(caixa, 'div', 'pilha'); const nivel = K.add(b, 'i'); const pct = K.add(b, 'b', '', '3%');
    // Frase e botão de segurar.
    const t = K.add(caixa, 'p', 'texto', d.abre); const bt = U.el('button', 'abraco', U.esc(d.botao)); bt.type = 'button'; caixa.appendChild(bt);
    // Última frase mostrada.
    let marca = 0;
    // Carrega enquanto segura e troca a frase nas marcas.
    await K.segura(bt, 4600, (p) => {
      // Valor atual da carga.
      const v = Math.round(3 + 97 * p); pct.textContent = v + '%'; nivel.style.width = v + '%'; b.classList.toggle('boa', v >= 40);
      // Marca alcançada agora.
      const m = Math.floor(p * d.frases.length);
      // Passou de uma marca nova: mostra a próxima frase.
      if (m > marca) { marca = m; t.innerHTML = U.fmt(d.frases[m - 1]); K.som(400 + m * 80, 90); }
    });
    // Carga completa: tira o botão e fecha.
    bt.remove(); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 24 — Caixinha de música: cada volta da manivela toca uma nota e solta um verso.
  A.caixamusica = async (d) => {
    // Abre a tela e monta a caixa com o coração que gira.
    const caixa = K.tela('a-caixamusica'); const m = K.add(caixa, 'div', 'caixinha'); K.add(m, 'i', 'tampa'); K.add(m, 'b', 'dancarina', '♥');
    // Manivela lateral e lugar do verso.
    const man = U.el('button', 'manivela'); man.type = 'button'; man.setAttribute('aria-label', d.dica); m.appendChild(man); const v = K.add(caixa, 'p', 'texto'); const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Ângulo atual da manivela.
    let ang = 0;
    // Oito toques: a nota toca sempre; a cada dois, troca o verso.
    await K.vezes(man, MELODIA.length, (i) => {
      // Tira a dica no primeiro toque e liga o giro.
      dica.hidden = true; m.classList.add('toca');
      // Gira a manivela e toca a nota.
      ang += 180; man.style.transform = 'rotate(' + ang + 'deg)'; K.som(MELODIA[i - 1], 500, 'sine', .1);
      // Troca o verso nos toques pares.
      if (i % 2 === 0) U.palavras(v, d.versos[i / 2 - 1], 120);
    });
    // Deixa ler o último verso.
    await U.esperar(2400);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 25 — Aurora boreal de verdade, desenhada no canvas, com estrelas.
  A.aurora = async (d) => {
    // Abre a tela cheia e sorteia as estrelas uma vez só.
    const caixa = K.tela('a-aurora cheia'); const ceu = Array.from({ length: 90 }, () => [Math.random(), Math.random() * .75, U.rand(.4, 1.5)]);
    // Desenha o céu a cada quadro.
    K.pinta(caixa, (cx, w, h, t) => {
      // Fundo escuro e estrelas piscando.
      cx.globalCompositeOperation = 'source-over'; cx.fillStyle = '#03101c'; cx.fillRect(0, 0, w, h); cx.fillStyle = '#fff'; ceu.forEach((s, i) => { cx.globalAlpha = .4 + .4 * Math.sin(t * 2 + i); cx.fillRect(s[0] * w, s[1] * h, s[2], s[2]); });
      // Somar cores deixa as cortinas luminosas.
      cx.globalAlpha = 1; cx.globalCompositeOperation = 'lighter';
      // Três cortinas de luz, com faixas verticais onduladas.
      [[150, .32], [180, .46], [285, .58]].forEach(([cor, base], k) => {
        // Cada coluna tem sua altura.
        for (let x = 0; x < w; x += 5) {
          // Altura da onda nesta coluna e neste instante.
          const y = h * base + Math.sin(x / 70 + t * .7 + k) * 42 + Math.sin(x / 31 - t * .5) * 20;
          // Faixa com degradê que some para baixo.
          const gr = cx.createLinearGradient(0, y - 130, 0, y + 50); gr.addColorStop(0, 'hsla(' + cor + ' 90% 60% / 0)'); gr.addColorStop(.75, 'hsla(' + cor + ' 90% 60% / .3)'); gr.addColorStop(1, 'hsla(' + cor + ' 90% 60% / 0)');
          // Pinta a coluna.
          cx.fillStyle = gr; cx.fillRect(x, y - 130, 5, 180);
        }
      });
    });
    // Texto por cima do céu.
    const s = K.add(caixa, 'div', 'sobre'); const t = K.add(s, 'p', 'texto', d.abre);
    // Espera o toque que começa.
    await K.mais(s, d.comecar);
    // Passa as frases e segue para o final.
    await K.frases(t, d.frases); await K.mais(s, d.fim);
  };

  // 26 — Prédio à noite: cada janela guarda uma lembrança; no fim as luzes formam um coração.
  A.janelas = async (d) => {
    // Abre a tela e monta a fachada.
    const caixa = K.tela('a-janelas'); K.add(caixa, 'p', 'chamada', d.titulo); const f = K.add(caixa, 'div', 'fachada');
    // Cria todas as janelas da grade.
    const js = []; PREDIO.forEach((linha) => [...linha].forEach((c) => { const b = U.el('button', 'jan'); b.type = 'button'; b.dataset.c = c; b.tabIndex = -1; f.appendChild(b); js.push(b); }));
    // Quatro janelas acesas, espalhadas, guardam as lembranças.
    const certas = [11, 24, 33, 48].map((i) => js[i]); certas.forEach((b) => { b.classList.add('quente'); b.tabIndex = 0; });
    // Lugar da lembrança.
    const t = K.add(caixa, 'p', 'texto', d.dica);
    // Cada toque mostra uma lembrança.
    let n = 0; await K.todos(certas, (b) => { b.classList.remove('quente'); b.classList.add('acesa'); U.palavras(t, d.lembrancas[n++], 110); K.som(600 + n * 70, 140); });
    // Deixa ler a última.
    await U.esperar(2600);
    // Acende o coração, janela por janela.
    for (const b of js.filter((x) => x.dataset.c === '#')) { b.classList.add('acesa'); await U.esperar(28); }
    // Frase final e segue.
    await K.fala(t, d.fecho); await K.mais(caixa, d.fim);
  };

  // 27 — Pôr do sol: arraste o sol até o mar e o céu escurece.
  A.pordosol = async (d) => {
    // Abre a tela cheia com céu, mar e estrelas.
    const caixa = K.tela('a-pordosol cheia'); const ceu = K.add(caixa, 'div', 'ceu'); K.add(ceu, 'i', 'estrelas'); const sol = U.el('button', 'astro'); sol.type = 'button'; sol.setAttribute('aria-label', d.dica); ceu.appendChild(sol); K.add(ceu, 'i', 'mar');
    // Texto e distância que o sol anda.
    const t = K.add(ceu, 'p', 'texto'); t.textContent = d.dica; const curso = window.innerHeight * .4;
    // Frase já mostrada.
    let marca = -1;
    // Segue o dedo e troca a frase conforme desce.
    await K.arrasta(sol, { rumo: [0, Math.round(curso)], move: (dx, dy) => {
      // Progresso de 0 a 1.
      const p = Math.max(0, Math.min(1, dy / curso));
      // Move o sol e muda a cor do céu.
      sol.style.transform = 'translateY(' + (p * curso) + 'px)'; ceu.style.setProperty('--p', p);
      // Frase da faixa atual.
      const m = Math.min(d.frases.length - 1, Math.floor(p * d.frases.length));
      // Só reescreve quando muda de faixa.
      if (m !== marca) { marca = m; t.innerHTML = U.fmt(d.frases[m]); }
    }, solta: (dx, dy) => dy >= curso * .8 });
    // Noite completa.
    ceu.style.setProperty('--p', 1); sol.style.transform = 'translateY(' + curso + 'px)'; K.som(330, 500); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(ceu, d.fim);
  };

  // 28 — Calendário de arrancar: cada folha é um dia comum que valeu.
  A.calendario = async (d) => {
    // Abre a tela e o bloco de folhas.
    const caixa = K.tela('a-calendario'); const bl = K.add(caixa, 'div', 'bloco');
    // Última folha, embaixo de todas.
    const fim = K.add(bl, 'div', 'folha ultima'); K.add(fim, 'p', 'msg', d.fecho);
    // Cria as folhas, com a primeira por cima.
    const fs = d.dias.map((x, i) => { const f = K.add(bl, 'div', 'folha'); f.style.zIndex = d.dias.length - i; K.add(f, 'b', 'sem', x.s); K.add(f, 'strong', '', String(x.n)); K.add(f, 'p', 'msg', x.t); return f; });
    // Dica de arrancar.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Arranca uma folha a cada toque.
    for (const f of fs) { await K.toque(f); f.classList.add('foi'); K.som(240, 90, 'sawtooth', .03); await U.esperar(500); }
    // Tira a dica e segue para o final.
    dica.remove(); await U.esperar(900); await K.mais(caixa, d.fim);
  };

  // 29 — Vela no escuro: segure para proteger a chama do vento.
  A.vela = async (d) => {
    // Abre a tela com a vela e a chama.
    const caixa = K.tela('a-vela'); const v = K.add(caixa, 'div', 'castical'); K.add(v, 'i', 'luz'); K.add(v, 'i', 'chama'); K.add(v, 'i', 'cera-v');
    // Frase e área de segurar.
    const t = K.add(caixa, 'p', 'texto', d.abre); const bt = U.el('button', 'mao-v', U.esc(d.botao)); bt.type = 'button'; caixa.appendChild(bt);
    // Última frase mostrada.
    let marca = 0;
    // Enquanto segura, a chama cresce e a frase troca.
    await K.segura(bt, 4200, (p) => { v.style.setProperty('--p', p); const m = Math.floor(p * d.frases.length); if (m > marca) { marca = m; t.innerHTML = U.fmt(d.frases[m - 1]); } });
    // Chama firme: tira o botão e fecha.
    bt.remove(); K.som(392, 400); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 30 — Cofre com três rodas: acerte os corações e ele abre o bilhete.
  A.cofre = async (d) => {
    // Abre a tela e monta a porta de aço.
    const caixa = K.tela('a-cofre'); K.add(caixa, 'p', 'chamada', d.titulo); const porta = K.add(caixa, 'div', 'porta'); const rodas = K.add(porta, 'div', 'rodas');
    // Cada roda começa em um símbolo diferente.
    const ws = [1, 3, 2].map((ini) => { const b = U.el('button', 'roda', RODA[ini]); b.type = 'button'; rodas.appendChild(b); return { b, ini }; });
    // Dica de combinação.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Cada roda precisa de toques até chegar no coração.
    await Promise.all(ws.map((w) => K.vezes(w.b, RODA.length - 1 - w.ini, (i) => { w.b.textContent = RODA[w.ini + i]; w.b.classList.remove('gira'); void w.b.offsetWidth; w.b.classList.add('gira'); K.som(1000, 30, 'square', .03); })));
    // Destrava: som grave e a porta abre.
    dica.remove(); K.som(90, 300, 'square', .1); U.vibra(50); porta.classList.add('aberta'); await U.esperar(1000); porta.remove();
    // Bilhete que estava guardado.
    const b = K.add(caixa, 'div', 'bilhete-c'); const t = K.add(b, 'p'); await K.frases(t, d.frases);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 31 — Garrafa boiando no mar: toque para pescar a mensagem.
  A.garrafa = async (d) => {
    // Abre a tela cheia.
    const caixa = K.tela('a-garrafa cheia');
    // Ondas em três camadas, cada uma em seu ritmo.
    K.pinta(caixa, (cx, w, h, t) => {
      // Céu.
      const gr = cx.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#0b2a4a'); gr.addColorStop(.6, '#1a6a8c'); cx.fillStyle = gr; cx.fillRect(0, 0, w, h);
      // Cada camada é uma curva preenchida até o fundo.
      [[.58, 16, '#14708f'], [.66, 22, '#0f5a78'], [.76, 28, '#0a4460']].forEach(([b, a, cor], k) => {
        // Começa no canto esquerdo.
        cx.fillStyle = cor; cx.beginPath(); cx.moveTo(0, h);
        // Traça a onda de um lado ao outro.
        for (let x = 0; x <= w + 8; x += 8) cx.lineTo(x, h * b + Math.sin(x / 60 + t * (1 + k * .3) + k) * a);
        // Fecha no canto direito e pinta.
        cx.lineTo(w, h); cx.fill();
      });
    });
    // A garrafa, feita de CSS, boia entre as ondas.
    const garr = U.el('button', 'vidro-g', '<i></i>'); garr.type = 'button'; garr.setAttribute('aria-label', d.dica); caixa.appendChild(garr);
    // Dica de toque.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera pescar.
    await K.toque(garr); dica.remove(); garr.classList.add('pescada'); K.som(660, 220); await U.esperar(900);
    // O pergaminho desenrola.
    const p = K.add(caixa, 'div', 'rolo-p'); const t = K.add(p, 'p'); await K.frases(t, d.frases);
    // Segue para o final.
    await K.mais(p, d.fim);
  };

  // 32 — Areia da praia: limpe a areia, leia, e a onda leva embora.
  A.areia = async (d) => {
    // Abre a tela cheia com a praia e a onda escondida.
    const caixa = K.tela('a-areia cheia'); const p = K.add(caixa, 'div', 'praia'); const dica = K.add(p, 'p', 'dica', d.dica);
    // Pinta a areia fina, com pontinhos.
    const areia = (c, w, h) => { c.fillStyle = '#e8cf9c'; c.fillRect(0, 0, w, h); for (let i = 0; i < 2600; i++) { c.fillStyle = Math.random() < .5 ? 'rgba(150,110,60,.35)' : 'rgba(255,245,215,.5)'; c.fillRect(U.rand(0, w), U.rand(0, h), 2, 2); } };
    // Uma rodada para cada frase.
    for (const f of d.frases) {
      // Frase escrita na areia molhada e a cobertura por cima.
      const w = K.add(p, 'div', 'escrita', f); const cv = U.el('canvas'); w.appendChild(cv);
      // Espera limpar.
      await K.raspa(cv, .42, areia); await U.esperar(2100);
      // A onda passa, leva a frase e vai embora.
      const o = K.add(p, 'i', 'onda'); K.som(120, 900, 'sine', .05); await U.esperar(1100); w.remove(); await U.esperar(1000); o.remove();
    }
    // Tira a dica e mostra o que a onda não leva.
    dica.remove(); const t = K.add(p, 'p', 'texto'); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(p, d.fim);
  };

  // 33 — Extrato do banco do amor: esconde o saldo, lista as entradas e estoura em infinito.
  A.extrato = async (d) => {
    // Abre a tela e monta o cartão do banco.
    const caixa = K.tela('a-extrato'); const app = K.add(caixa, 'div', 'banco'); K.add(app, 'p', 'nome', d.banco);
    // Saldo escondido e botão do olho.
    const lin = K.add(app, 'div', 'saldo'); K.add(lin, 'span', '', d.rotulo); const v = K.add(lin, 'b', '', '••••••'); const olho = U.el('button', 'olho', '👁'); olho.type = 'button'; olho.setAttribute('aria-label', d.dica); lin.appendChild(olho);
    // Lista das movimentações.
    const ul = K.add(app, 'ul', 'mov'); const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera ver o saldo.
    await K.toque(olho); dica.remove(); olho.remove();
    // Cada movimentação entra e o saldo sobe.
    let total = 0; for (const [nome, val] of d.lancamentos) { const li = K.add(ul, 'li', 'entra'); li.appendChild(U.el('span', '', U.esc(nome))); li.appendChild(U.el('b', val > 0 ? 'mais' : 'menos', (val > 0 ? '+' : '') + val)); total += val; v.textContent = total + ' ' + d.moeda; K.som(val > 0 ? 880 : 300, 80, 'triangle'); await U.esperar(900); }
    // Saldo final vira infinito.
    await U.esperar(400); v.textContent = '∞ ' + d.moeda; v.classList.add('rico'); K.add(app, 'p', 'nota entra', d.nota);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 34 — Ampulheta: vire para o tempo voltar, porque com ela nunca é suficiente.
  A.ampulheta = async (d) => {
    // Abre a tela e monta a ampulheta.
    const caixa = K.tela('a-ampulheta'); const a = U.el('button', 'vidro-a', '<svg viewBox="0 0 120 200" aria-hidden="true"><path class="moldura-a" d="M16 8H104M16 192H104"/><path class="casca" d="M26 12C26 62 52 82 56 100C52 118 26 138 26 188H94C94 138 68 118 64 100C68 82 94 62 94 12z"/><path class="sup" d="M30 16C30 58 54 80 60 98C66 80 90 58 90 16z"/><path class="inf" d="M30 186C34 148 52 128 60 118C68 128 86 148 90 186z"/><line class="fio-a" x1="60" y1="98" x2="60" y2="186"/></svg>'); a.type = 'button'; a.setAttribute('aria-label', d.botao); caixa.appendChild(a);
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto'); const dica = K.add(caixa, 'p', 'dica', d.botao);
    // Quantas viradas já foram.
    let giro = 0;
    // Uma virada para cada frase.
    for (const f of d.frases) {
      // Espera tocar e gira meia volta.
      await K.toque(a); dica.hidden = true; giro += 180; a.style.transform = 'rotate(' + giro + 'deg)'; K.som(300, 200, 'triangle');
      // Reinicia a areia caindo, com a ampulheta já virada.
      a.classList.remove('cai'); await U.esperar(700); void a.offsetWidth; a.classList.add('cai');
      // Mostra a frase e reabre a dica.
      await K.fala(t, f); await U.esperar(600); dica.hidden = false;
    }
    // Tira a dica e segue para o final.
    dica.remove(); await K.mais(caixa, d.fim);
  };

  // 35 — Árvore que cresce enquanto você segura: o que a gente cuida floresce.
  A.broto = async (d) => {
    // Abre a tela com o quadro da árvore.
    const caixa = K.tela('a-broto'); const q = K.add(caixa, 'div', 'quadro'); let cresce = 0;
    // Desenha a árvore do tamanho atual.
    K.pinta(q, (cx, w, h) => { cx.clearRect(0, 0, w, h); cx.strokeStyle = '#6b4a2b'; cx.lineCap = 'round'; galho(cx, w / 2, h - 6, -Math.PI / 2, h * .25, 7, cresce * 7.2); });
    // Frase e área de segurar.
    const t = K.add(caixa, 'p', 'texto', d.abre); const bt = K.botao(caixa, d.botao);
    // Última frase mostrada.
    let marca = 0;
    // Enquanto segura, a árvore cresce.
    await K.segura(bt, 5200, (p) => { cresce = p; const m = Math.floor(p * d.frases.length); if (m > marca) { marca = m; t.innerHTML = U.fmt(d.frases[m - 1]); } });
    // Árvore pronta: tira o botão e fecha.
    bt.remove(); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 36 — Borboletas: pegue cada uma e leia a palavra que ela carrega.
  A.borboletas = async (d) => {
    // Abre a tela com a campina e o varal das palavras.
    const caixa = K.tela('a-borboletas cheia'); const c = K.add(caixa, 'div', 'campina'); const v = K.add(c, 'div', 'varal'); const dica = K.add(c, 'p', 'dica', d.dica);
    // Lugares das borboletas, em porcentagem.
    const POS = [[18, 34], [70, 28], [40, 50], [76, 58], [20, 68]];
    // Cria cada borboleta com duas asas.
    const bs = d.palavras.map((_, i) => { const b = U.el('button', 'borb', ASA); b.type = 'button'; b.style.left = POS[i][0] + '%'; b.style.top = POS[i][1] + '%'; b.style.setProperty('--cor', 'hsl(' + (320 + i * 28) + ' 80% 62%)'); b.style.animationDelay = (-i * .7) + 's'; c.appendChild(b); return b; });
    // Cada toque leva a palavra para o varal.
    await K.todos(bs, (b, i) => { b.classList.add('pega'); dica.hidden = true; K.add(v, 'span', 'entra', d.palavras[i]); K.som(700 + i * 90, 120); });
    // Frase final.
    const t = K.add(c, 'p', 'texto'); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(c, d.fim);
  };

  // 37 — Discoteca: toque na bola de espelhos para mudar a luz e a frase.
  A.discoteca = async (d) => {
    // Abre a tela cheia, a pista e a bola.
    const caixa = K.tela('a-discoteca cheia'); const s = K.add(caixa, 'div', 'salao'); K.add(s, 'i', 'feixes'); const bola = U.el('button', 'bola'); bola.type = 'button'; bola.setAttribute('aria-label', d.dica); s.appendChild(bola);
    // Piso quadriculado, com 40 ladrilhos piscando em tempos diferentes.
    const piso = K.add(s, 'div', 'piso'); for (let i = 0; i < 40; i++) { const q = U.el('i'); q.style.animationDelay = (-(i * 37 % 11) * .2) + 's'; piso.appendChild(q); }
    // Frase e dica.
    const t = K.add(s, 'p', 'texto'); const dica = K.add(s, 'p', 'dica', d.dica);
    // Cada toque gira a cor do salão e troca a frase.
    await K.vezes(bola, d.frases.length, (i) => { dica.hidden = true; s.style.setProperty('--h', i * 70); U.palavras(t, d.frases[i - 1], 110); K.som(392 + i * 49, 160, 'triangle'); });
    // Deixa ler a última.
    await U.esperar(2400);
    // Segue para o final.
    await K.mais(s, d.fim);
  };

  // 38 — Fogos de artifício: toque no céu para lançar.
  A.fogos = async (d) => {
    // Abre a tela cheia, com a lista de faíscas e foguetes.
    const caixa = K.tela('a-fogos cheia'); const fa = []; const fo = [];
    // Desenha o céu a cada quadro.
    const v = K.pinta(caixa, (cx, w, h) => {
      // Rastro: cobre o quadro anterior com véu escuro.
      cx.fillStyle = 'rgba(5,4,20,.22)'; cx.fillRect(0, 0, w, h);
      // Move cada foguete; ao chegar no alto, ele estoura.
      for (let i = fo.length - 1; i >= 0; i--) { const f = fo[i]; f.y -= 9; cx.fillStyle = '#ffe9a8'; cx.fillRect(f.x, f.y, 2, 9); if (f.y <= f.alvo) { estoura(fa, f.x, f.alvo); fo.splice(i, 1); K.som(90, 280, 'triangle', .1); } }
      // Move e apaga cada faísca.
      for (let i = fa.length - 1; i >= 0; i--) { const p = fa[i]; p.x += p.vx; p.y += p.vy; p.vy += .035; p.vx *= .985; p.vida -= .012; if (p.vida <= 0) { fa.splice(i, 1); continue; } cx.fillStyle = 'hsla(' + p.cor + ' 95% 66% / ' + p.vida + ')'; cx.fillRect(p.x, p.y, 2.4, 2.4); }
    });
    // Texto por cima, e a área de toque.
    const s = K.add(caixa, 'div', 'sobre'); const t = K.add(s, 'p', 'texto', d.abre); const area = K.add(caixa, 'div', 'toque-ceu');
    // Lança um foguete na posição do dedo.
    area.addEventListener('pointerdown', (e) => fo.push({ x: e.clientX, y: v.h, alvo: Math.min(e.clientY, v.h * .6) }));
    // Um foguete por frase.
    await K.vezes(area, d.frases.length, (i) => { U.palavras(t, d.frases[i - 1], 110); });
    // Deixa ler a última e tira a área de toque.
    await U.esperar(2600); area.remove();
    // Segue para o final.
    await K.mais(s, d.fim);
  };

  // 39 — Letreiro de neon: puxe a cordinha e as letras acendem falhando.
  A.neon = async (d) => {
    // Abre a tela cheia com a parede de tijolos.
    const caixa = K.tela('a-neon cheia'); const m = K.add(caixa, 'div', 'muro');
    // Cada letra do letreiro é um pedaço separado.
    const placa = K.add(m, 'div', 'placa'); const ls = [...d.letreiro].map((c) => { const s = U.el('span', '', U.esc(c)); placa.appendChild(s); return s; });
    // Segunda linha, em letra cursiva.
    const sub = K.add(m, 'p', 'sub-n', d.sub);
    // Cordinha que se puxa para baixo.
    const fio = U.el('button', 'cordinha', '<i></i>'); fio.type = 'button'; fio.setAttribute('aria-label', d.dica); m.appendChild(fio); const dica = K.add(m, 'p', 'dica', d.dica);
    // Espera puxar.
    await K.arrasta(fio, { rumo: [0, 90], move: (dx, dy) => { fio.style.transform = 'translateY(' + Math.max(0, Math.min(90, dy)) + 'px)'; }, solta: (dx, dy) => { fio.style.transform = 'none'; return dy > 40; } });
    // Clique do interruptor.
    dica.remove(); fio.remove(); K.som(1400, 40, 'square', .05);
    // Acende letra por letra.
    for (const s of ls) { s.classList.add('liga'); K.som(90, 80, 'sawtooth', .02); await U.esperar(230); }
    // Segunda linha e frases.
    sub.classList.add('liga'); await U.esperar(900); const t = K.add(m, 'p', 'texto'); await K.frases(t, d.frases);
    // Segue para o final.
    await K.mais(m, d.fim);
  };

  // 40 — Abajur: apague a luz e o teto se enche de estrelas que brilham no escuro.
  A.abajur = async (d) => {
    // Abre a tela cheia com o quarto.
    const caixa = K.tela('a-abajur cheia'); const q = K.add(caixa, 'div', 'quarto');
    // Estrelinhas do teto, sorteadas uma vez.
    const teto = K.add(q, 'div', 'teto'); for (let i = 0; i < 60; i++) { const e = U.el('i'); e.style.left = U.rand(2, 98) + '%'; e.style.top = U.rand(2, 62) + '%'; e.style.animationDelay = U.rand(0, 3) + 's'; teto.appendChild(e); }
    // Abajur e frase de abertura.
    const l = U.el('button', 'lampada', '<i></i><b></b>'); l.type = 'button'; l.setAttribute('aria-label', d.dica); q.appendChild(l); const t = K.add(q, 'p', 'texto', d.abre); const dica = K.add(q, 'p', 'dica', d.dica);
    // Espera apagar a luz.
    await K.toque(l); dica.remove(); K.som(1300, 40, 'square', .05); q.classList.add('apagou'); await U.esperar(1500);
    // Frases no escuro.
    await K.frases(t, d.frases);
    // Segue para o final.
    await K.mais(q, d.fim);
  };
// Executa.
})(window);
