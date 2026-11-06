/* ==========================================================
   cenas.js — o "motor": sabe desenhar cada tipo de cena e rodá-las em ordem.
   Aberturas: terminal | coracao | envelope | presente
   Cenas:     historia | constelacao | scanner | cartas | contagem | motivos | escolha
   Final:     segurar | toques | deslizar  (+ revelação com reações)
   Cada cena é uma função async que só termina quando a pessoa vê/termina a cena.
   ========================================================== */

// Isola variáveis.
(function (g) {
  // Modo estrito.
  'use strict';

  // Objeto público.
  const Cenas = {};

  // Elemento onde as cenas aparecem.
  const palco = () => U.$('#palco');

  // SVG do coração (Material Design "favorite"), reaproveitado em vários lugares.
  const CORACAO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

  // Cria uma cena nova, faz a anterior sair e devolve a "caixa" onde colocar o conteúdo.
  const nova = (classe) => {
    // Faz todas as cenas atuais saírem (fade) e depois as remove do HTML.
    palco().querySelectorAll('.cena:not(.saindo)').forEach((v) => { v.classList.add('saindo'); setTimeout(() => v.remove(), 600); });
    // Cria a cena (tela inteira) e a caixa central.
    const cena = U.el('section', 'cena ' + (classe || ''));
    const caixa = U.el('div', 'caixa');
    // Monta e coloca no palco.
    cena.appendChild(caixa); palco().appendChild(cena);
    // Devolve a caixa.
    return caixa;
  };

  // Promise que resolve no primeiro toque na cena (e já libera a música, pois é um gesto da pessoa).
  const toque = (cena, comMusica) => new Promise((resolve) => {
    cena.addEventListener('click', () => { if (comMusica) Musica.tocar(); resolve(); }, { once: true });
  });

  // Mostra um botão "continuar" e espera o clique.
  const continuar = (caixa, texto) => new Promise((resolve) => {
    // Cria o botão com animação de entrada.
    const b = U.el('button', 'btn entra', U.esc(texto || 'continuar ›'));
    b.type = 'button';
    // Ao clicar, desativa (evita duplo clique) e libera a cena.
    b.addEventListener('click', () => { b.disabled = true; resolve(); }, { once: true });
    caixa.appendChild(b);
  });

  // Coordenadas do centro de um elemento (para soltar partículas nele).
  const centro = (el) => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

  /* ---------------------- ABERTURAS ---------------------- */

  // Abertura "terminal": uma janelinha digita linhas de "sistema" e revela o título.
  async function aberturaTerminal(d) {
    // Cena e caixa.
    const caixa = nova('ab-terminal'); const cena = caixa.parentElement;
    // Janela do terminal com um cursor piscando e uma dica de toque.
    const term = U.el('div', 'term', '<pre></pre><span class="cursor"></span>');
    const pre = U.$('pre', term);
    caixa.appendChild(term);
    const dica = U.el('p', 'dica', 'toque para iniciar'); caixa.appendChild(dica);
    // Espera o primeiro toque (que também libera a música).
    await toque(cena, true);
    dica.remove();
    // Digita cada linha, letra por letra.
    for (const linha of d.l) {
      for (const ch of ('> ' + linha + '\n')) { pre.textContent += ch; await U.esperar(ch === '\n' ? 380 : 24); }
    }
    // Pausa curta e mostra o título.
    await U.esperar(500);
    const t = U.el('h1', 'titulo'); caixa.appendChild(t);
    const dur = U.palavras(t, d.ti, 230);
    await U.esperar(dur + 900);
  }

  // Abertura "coração": um coração pulsa; ao tocar, estoura em partículas e revela o título.
  async function aberturaCoracao(d) {
    const caixa = nova('ab-coracao'); const cena = caixa.parentElement;
    // Coração grande como botão (acessível por teclado).
    const b = U.el('button', 'coracao', CORACAO); b.type = 'button'; b.setAttribute('aria-label', 'Toque no coração');
    caixa.appendChild(b);
    const dica = U.el('p', 'dica', U.esc(d.sub || 'toque no coração')); caixa.appendChild(dica);
    // Espera o toque.
    await toque(cena, true);
    // Estoura: partículas saem do centro do coração e o coração cresce e some.
    const [x, y] = centro(b); Fundo.explodirEm(x, y, 46); U.vibra(30); b.classList.add('foi'); dica.remove();
    await U.esperar(700); b.remove();
    // Título aparece palavra por palavra.
    const t = U.el('h1', 'titulo'); caixa.appendChild(t);
    const dur = U.palavras(t, d.ti, 240);
    await U.esperar(dur + 900);
  }

  // Abertura "envelope": envelope fechado; ao tocar a aba abre e a carta sobe com o título.
  async function aberturaEnvelope(d) {
    const caixa = nova('ab-envelope'); const cena = caixa.parentElement;
    // Envelope montado com camadas (fundo, carta, frente, aba, selo).
    const env = U.el('div', 'env', '<div class="e-fundo"></div><div class="e-carta">' + U.esc(d.ti) + '</div><div class="e-frente"></div><div class="e-aba"></div><div class="e-selo">' + U.esc(d.selo || '💌') + '</div>');
    caixa.appendChild(env);
    const dica = U.el('p', 'dica', 'toque para abrir'); caixa.appendChild(dica);
    await toque(cena, true);
    // Abre o envelope.
    dica.remove(); env.classList.add('aberto'); U.vibra(25);
    // Espera a animação (aba 0,8 s + carta subindo 1 s) e solta uns brilhos.
    await U.esperar(1500);
    const [x, y] = centro(env); Fundo.explodirEm(x, y - 40, 24);
    await U.esperar(1700);
  }

  // Abertura "presente": caixa de presente balançando; ao tocar a tampa voa e sai confete.
  async function aberturaPresente(d) {
    const caixa = nova('ab-presente'); const cena = caixa.parentElement;
    const pres = U.el('div', 'pres', '<div class="p-corpo"></div><div class="p-tampa"></div><div class="p-laco"></div>');
    caixa.appendChild(pres);
    const dica = U.el('p', 'dica', U.esc(d.sub || 'toque para abrir')); caixa.appendChild(dica);
    await toque(cena, true);
    // Abre o presente e solta a festa.
    dica.remove(); pres.classList.add('aberto'); Fundo.festa(4); U.vibra([20, 30, 20]);
    await U.esperar(900);
    // Título aparece embaixo do presente aberto.
    const t = U.el('h1', 'titulo'); caixa.appendChild(t);
    const dur = U.palavras(t, d.ti, 230);
    await U.esperar(dur + 900);
  }

  /* ---------------------- CENAS ---------------------- */

  // História: uma frase por vez, palavra por palavra, com barrinhas de progresso. Toque = pular para a próxima.
  async function historia(d) {
    const caixa = nova('historia'); const cena = caixa.parentElement;
    // Barras de progresso (uma por frase) fixas no topo.
    const prog = U.el('div', 'prog', d.f.map(() => '<i></i>').join('')); cena.appendChild(prog);
    // Rótulo (título pequeno) e área do texto.
    if (d.ti) caixa.appendChild(U.el('p', 'rotulo', U.esc(d.ti)));
    const tx = U.el('p', 'texto'); tx.style.transition = 'opacity .3s'; caixa.appendChild(tx);
    const segs = prog.children;
    for (let i = 0; i < d.f.length; i++) {
      // Marca as anteriores como completas.
      for (let j = 0; j < i; j++) segs[j].className = 'ok';
      // Some o texto anterior com fade rápido (menos na primeira).
      if (i > 0) { tx.style.opacity = 0; await U.esperar(300); tx.style.opacity = 1; }
      // Revela a frase e calcula o tempo de leitura (mais tempo para frases longas).
      const dur = U.palavras(tx, d.f[i], 190);
      const leitura = dur + 1100 + d.f[i].length * 22;
      // Anima a barra atual durante a leitura (reflow forçado para a transição rodar).
      void segs[i].offsetWidth; segs[i].style.setProperty('--dur', leitura + 'ms'); segs[i].className = 'on';
      // Espera o tempo OU um toque (o que vier primeiro); o AbortController remove o ouvinte que sobrar.
      const ctrl = new AbortController();
      await Promise.race([U.esperar(leitura), new Promise((r) => cena.addEventListener('click', r, { once: true, signal: ctrl.signal }))]);
      ctrl.abort();
    }
    // Completa a última barra e dá uma respirada antes da próxima cena.
    segs[segs.length - 1].className = 'ok';
    await U.esperar(600);
  }

  // Pontos do desenho da constelação, em coordenadas de 0 a 100.
  function pontosForma(forma) {
    // Lista do traçado completo e lista dos pontos brilhantes.
    const linha = []; const brilhos = [];
    if (forma === 'estrela') {
      // Pentagrama: liga os vértices pulando um (0,2,4,1,3,0).
      const v = (i) => { const a = (-90 + 72 * i) * Math.PI / 180; return [50 + 40 * Math.cos(a), 54 + 40 * Math.sin(a)]; };
      [0, 2, 4, 1, 3, 0].forEach((i) => linha.push(v(i)));
      for (let i = 0; i < 5; i++) brilhos.push(v(i));
    } else {
      // Curvas paramétricas amostradas em 90 pontos.
      const N = 90;
      for (let k = 0; k <= N; k++) {
        const t = (k / N) * 2 * Math.PI;
        if (forma === 'infinito') { const s = 1 + Math.pow(Math.sin(t), 2); linha.push([50 + 42 * Math.cos(t) / s, 50 + 42 * Math.sin(t) * Math.cos(t) / s]); }
        else { const x = 16 * Math.pow(Math.sin(t), 3); const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t); linha.push([50 + x * 2.6, 42 - y * 2.5]); }
        // A cada 8 amostras vira um ponto brilhante.
        if (k % 8 === 0 && k < N) brilhos.push(linha[linha.length - 1]);
      }
    }
    return { linha, brilhos };
  }

  // Constelação: desenha uma forma ligando estrelinhas, depois mostra uma frase.
  async function constelacao(d) {
    const caixa = nova('constelacao');
    // Calcula o desenho e monta o SVG (linha única animada + pontos com atraso escalonado).
    const { linha, brilhos } = pontosForma(d.f || 'coracao');
    const trilha = 'M' + linha.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
    const pontos = brilhos.map((p, i) => '<circle class="est" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="1.7" style="transition-delay:' + Math.round(i * 3400 / brilhos.length) + 'ms"/>').join('');
    const box = U.el('div', 'const', '<svg viewBox="0 0 100 100" aria-hidden="true"><path class="linha" pathLength="1" d="' + trilha + '"/>' + pontos + '</svg>');
    caixa.appendChild(box);
    // Reflow e liga a animação.
    void box.offsetWidth; box.classList.add('vai');
    await U.esperar(4300);
    // Frase final da constelação.
    const tx = U.el('p', 'texto'); caixa.appendChild(tx);
    const dur = U.palavras(tx, d.m, 190);
    await U.esperar(dur + 800);
    await continuar(caixa);
  }

  // Scanner: barras que enchem uma por uma com número subindo e um veredito no final.
  async function scanner(d) {
    const caixa = nova('scanner');
    if (d.ti) caixa.appendChild(U.el('p', 'rotulo', U.esc(d.ti)));
    const lista = U.el('div', 'scan'); caixa.appendChild(lista);
    // Cria todas as linhas (vazias) primeiro para o layout não pular.
    const linhas = d.i.map(([rot]) => {
      const l = U.el('div', 'lin', '<span>' + U.esc(rot) + '</span><span class="val">0%</span><div class="barra"><i></i></div>');
      lista.appendChild(l); return l;
    });
    await U.esperar(500);
    // Enche uma de cada vez.
    for (let i = 0; i < linhas.length; i++) {
      const pct = d.i[i][1];
      // Barra vai até no máximo 100% (o número pode passar disso, de brincadeira).
      U.$('i', linhas[i]).style.width = Math.min(100, pct) + '%';
      const val = U.$('.val', linhas[i]);
      await U.contar(pct, 1200, (v) => { val.textContent = v + '%'; });
      await U.esperar(250);
    }
    // Veredito.
    const v = U.el('p', 'texto'); v.style.marginTop = '8px'; caixa.appendChild(v);
    const dur = U.palavras(v, d.v, 190);
    await U.esperar(dur + 600);
    await continuar(caixa);
  }

  // Cartas: cada carta vira ao toque e mostra o verso; quando todas viraram, aparece "continuar".
  async function cartas(d) {
    const caixa = nova('cartas');
    if (d.ti) caixa.appendChild(U.el('p', 'rotulo', U.esc(d.ti)));
    const grade = U.el('div', 'cartas'); caixa.appendChild(grade);
    const dica = U.el('p', 'dica', 'toque nas cartas (0/' + d.c.length + ')'); caixa.appendChild(dica);
    let viradas = 0;
    // Promise que resolve quando a última carta virar.
    await new Promise((resolve) => {
      d.c.forEach(([frente, verso]) => {
        // Cada carta é um botão (acessível) com dois lados.
        const c = U.el('button', 'card', '<div class="miolo"><div class="lado frente">' + U.fmt(frente) + '</div><div class="lado verso">' + U.fmt(verso) + '</div></div>');
        c.type = 'button';
        c.addEventListener('click', () => {
          // Só conta a primeira vez que vira.
          if (c.classList.contains('virado')) return;
          c.classList.add('virado'); viradas++; U.vibra(12);
          dica.textContent = 'toque nas cartas (' + viradas + '/' + d.c.length + ')';
          if (viradas === d.c.length) resolve();
        });
        grade.appendChild(c);
      });
    });
    dica.remove();
    await U.esperar(1400);
    await continuar(caixa);
  }

  // Contagem: números grandes sobem de 0 até o valor, com um rótulo; viram "fichinhas" no histórico.
  async function contagem(d) {
    const caixa = nova('contagem');
    if (d.ti) caixa.appendChild(U.el('p', 'rotulo', U.esc(d.ti)));
    const num = U.el('div', 'num', '0'); const rot = U.el('p', 'num-rot', '&nbsp;'); const hist = U.el('div', 'hist');
    caixa.append(num, rot, hist);
    for (const [valor, rotulo] of d.n) {
      // Esconde o rótulo anterior e zera.
      rot.style.opacity = 0; rot.innerHTML = '&nbsp;';
      // Se for número, conta subindo; se for texto/símbolo (ex.: ∞), mostra direto.
      if (typeof valor === 'number') await U.contar(valor, 1500, (v) => { num.textContent = v; }); else { num.textContent = valor; await U.esperar(700); }
      // Mostra o rótulo e deixa ler.
      rot.style.transition = 'opacity .5s'; rot.innerHTML = U.fmt(rotulo); rot.style.opacity = 1;
      await U.esperar(1700);
      // Guarda no histórico.
      hist.appendChild(U.el('span', '', U.esc(valor) + ' ' + U.esc(rotulo.replace(/\*/g, ''))));
    }
    // Frase de fechamento.
    if (d.fim) {
      num.style.display = 'none'; rot.style.display = 'none';
      const f = U.el('p', 'texto'); caixa.insertBefore(f, hist); const dur = U.palavras(f, d.fim, 190);
      await U.esperar(dur + 700);
    }
    await continuar(caixa);
  }

  // Motivos: lista de cartõezinhos que entram um a um.
  async function motivos(d) {
    const caixa = nova('motivos');
    if (d.ti) caixa.appendChild(U.el('p', 'rotulo', U.esc(d.ti)));
    const ul = U.el('ul', 'lista'); caixa.appendChild(ul);
    // Cria os itens escondidos.
    const itens = d.i.map((t) => { const li = U.el('li', 'vidro', '<span>' + U.fmt(t) + '</span>'); ul.appendChild(li); return li; });
    await U.esperar(400);
    // Mostra um por um, com tempo proporcional ao tamanho do texto.
    for (let i = 0; i < itens.length; i++) { itens[i].classList.add('on'); await U.esperar(900 + d.i[i].length * 14); }
    await continuar(caixa);
  }

  // Escolha: uma pergunta com 2 ou 3 opções; qualquer uma leva a uma resposta carinhosa.
  async function escolha(d) {
    const caixa = nova('escolha');
    const q = U.el('p', 'texto'); caixa.appendChild(q);
    const dur = U.palavras(q, d.q, 170);
    await U.esperar(dur);
    const ops = U.el('div', 'opcoes'); caixa.appendChild(ops);
    // Espera o clique em uma opção.
    const resposta = await new Promise((resolve) => {
      d.o.forEach(([texto, resp]) => {
        const b = U.el('button', 'opcao vidro entra', U.fmt(texto)); b.type = 'button';
        b.addEventListener('click', () => {
          // Destaca a escolhida e apaga as outras.
          [...ops.children].forEach((x) => x.classList.add(x === b ? 'sel' : 'fora')); U.vibra(15); resolve(resp);
        }, { once: true });
        ops.appendChild(b);
      });
    });
    // Mostra a resposta.
    await U.esperar(500);
    const r = U.el('p', 'resposta'); caixa.appendChild(r);
    const d2 = U.palavras(r, resposta, 190);
    await U.esperar(d2 + 700);
    await continuar(caixa);
  }

  /* ---------------------- FINAIS (o "jogo" antes da revelação) ---------------------- */

  // Segurar: segure o coração até o anel completar (soltou antes, o anel esvazia).
  function jogoSegurar(caixa, d) {
    // Tempo para encher (ms).
    const TEMPO = 2800;
    const seg = U.el('div', 'seg', '<svg class="anel" viewBox="0 0 100 100" aria-hidden="true"><circle class="trilho" cx="50" cy="50" r="46"/><circle class="prog-anel" cx="50" cy="50" r="46"/></svg><div class="miolo">' + CORACAO + '</div>');
    // Acessibilidade: dá para segurar com Espaço/Enter.
    seg.tabIndex = 0; seg.setAttribute('role', 'button'); seg.setAttribute('aria-label', 'Segure para abrir');
    caixa.appendChild(seg);
    return new Promise((resolve) => {
      let prog = 0, preso = false, ult = 0, feito = false, marca = 0;
      const anel = U.$('.prog-anel', seg);
      // Laço de animação: enche enquanto preso, esvazia (mais rápido) quando solto.
      const laco = (t) => {
        if (feito) return;
        const dt = ult ? t - ult : 0; ult = t;
        prog = preso ? Math.min(1, prog + dt / TEMPO) : Math.max(0, prog - dt / 900);
        anel.style.strokeDashoffset = 289 * (1 - prog);
        // Vibrinha a cada 10% e partículas pequenas saindo do coração.
        const m = Math.floor(prog * 10);
        if (preso && m > marca) { U.vibra(12); const [x, y] = centro(seg); Fundo.explodirEm(x, y, 6); }
        marca = m;
        if (prog >= 1) { feito = true; resolve(); return; }
        requestAnimationFrame(laco);
      };
      // Começa e termina de segurar (mouse, dedo ou teclado).
      const prende = () => { preso = true; seg.classList.add('preso'); };
      const solta = () => { preso = false; seg.classList.remove('preso'); };
      seg.addEventListener('pointerdown', (e) => { e.preventDefault(); prende(); });
      ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => seg.addEventListener(ev, solta));
      seg.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); prende(); } });
      seg.addEventListener('keyup', solta);
      // Evita o menu de "pressionar e segurar" do celular.
      seg.addEventListener('contextmenu', (e) => e.preventDefault());
      requestAnimationFrame(laco);
    });
  }

  // Toques: um coração grande que precisa de N toques; o número mostra quantos faltam.
  function jogoToques(caixa, d) {
    let falta = d.n || 7;
    const b = U.el('button', 'toq', CORACAO + '<b>' + falta + '</b>'); b.type = 'button'; b.setAttribute('aria-label', 'Toque no coração');
    caixa.appendChild(b);
    return new Promise((resolve) => {
      b.addEventListener('click', () => {
        // Cada toque solta partículas e diminui o contador.
        falta--; U.vibra(12); const [x, y] = centro(b); Fundo.explodirEm(x, y, 10);
        U.$('b', b).textContent = falta > 0 ? falta : '♥';
        if (falta <= 0) { b.disabled = true; resolve(); }
      });
    });
  }

  // Deslizar: arraste a bolinha até o fim da barra (ou use Enter/→ no teclado).
  function jogoDeslizar(caixa, d) {
    const trilho = U.el('div', 'desl vidro', '<div class="rot">' + U.esc(d.dica2 || 'deslize para abrir') + ' ›››</div><div class="cabo" tabindex="0" role="slider" aria-label="Deslize para abrir">›</div>');
    caixa.appendChild(trilho);
    const cabo = U.$('.cabo', trilho); const rot = U.$('.rot', trilho);
    return new Promise((resolve) => {
      let x0 = 0, x = 0, arrastando = false, feito = false;
      // Distância máxima que a bolinha pode andar.
      const max = () => trilho.clientWidth - cabo.offsetWidth - 10;
      // Posiciona a bolinha e apaga o rótulo conforme avança.
      const posiciona = (px) => { x = Math.max(0, Math.min(max(), px)); cabo.style.transform = 'translateX(' + x + 'px)'; rot.style.opacity = 1 - x / max(); };
      // Conclui a ação.
      const fim = () => { if (feito) return; feito = true; posiciona(max()); U.vibra(30); setTimeout(resolve, 250); };
      cabo.addEventListener('pointerdown', (e) => { arrastando = true; x0 = e.clientX - x; cabo.style.transition = 'none'; cabo.setPointerCapture(e.pointerId); });
      cabo.addEventListener('pointermove', (e) => { if (arrastando && !feito) posiciona(e.clientX - x0); });
      const solta = () => { if (!arrastando) return; arrastando = false; if (x >= max() * 0.92) fim(); else { cabo.style.transition = 'transform .35s'; posiciona(0); } };
      cabo.addEventListener('pointerup', solta); cabo.addEventListener('pointercancel', solta);
      cabo.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); fim(); } });
    });
  }

  // Revelação final: título, mensagem, reações (chips) e botões.
  async function revelar(msg, cat, d) {
    const caixa = nova('final');
    // Festa de partículas e vibração de comemoração.
    Fundo.festa(6); U.vibra([30, 40, 30]);
    // Título e mensagem.
    const t = U.el('h2', 'titulo'); caixa.appendChild(t); U.palavras(t, d.ti, 260);
    await U.esperar(900);
    const tx = U.el('p', 'texto'); caixa.appendChild(tx);
    const dur = U.palavras(tx, d.m, 210);
    await U.esperar(dur + 500);
    // Reações: cada chip abre o WhatsApp com texto pronto (se houver número) ou mostra um aviso.
    const chips = U.el('div', 'chips entra');
    (msg.chips || cat.chips || []).forEach((rotulo) => {
      const c = U.el('button', 'chip', U.esc(rotulo)); c.type = 'button';
      c.addEventListener('click', () => {
        // Marca como escolhido.
        [...chips.children].forEach((x) => x.classList.remove('sel')); c.classList.add('sel'); U.vibra(15);
        const num = String((window.CONFIG && CONFIG.WHATSAPP) || '').replace(/\D/g, '');
        if (num) window.open('https://wa.me/' + num + '?text=' + encodeURIComponent('💌 ' + rotulo), '_blank', 'noopener');
        else U.aviso('Agora é só me responder com um oi 💬');
        Fundo.explodirEm(...centro(c), 14);
      });
      chips.appendChild(c);
    });
    if (chips.children.length) caixa.appendChild(chips);
    // Botões: ler a carta (se houver) e ver de novo.
    const acoes = U.el('div', 'acoes entra'); caixa.appendChild(acoes);
    if (msg.carta) {
      const bc = U.el('button', 'btn', 'ler a carta ✉️'); bc.type = 'button';
      bc.addEventListener('click', () => abrirCarta(msg.carta));
      acoes.appendChild(bc);
    }
    const again = U.el('button', 'btn leve', 'ver de novo ↺'); again.type = 'button';
    again.addEventListener('click', () => location.reload());
    acoes.appendChild(again);
  }

  // Abre a carta longa em uma janela (dialog). Parágrafos separados por linha em branco.
  function abrirCarta(texto) {
    const dlg = U.$('#carta'); const alvo = U.$('#cartaTexto');
    alvo.innerHTML = String(texto).split(/\n\s*\n/).map((p) => '<p>' + U.esc(p.trim()).replace(/\n/g, '<br>') + '</p>').join('');
    // showModal é o normal; se o navegador for antigo, abre pelo atributo.
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    // Fechar pelo botão e clicando fora da carta.
    U.$('#cartaFechar').onclick = () => (dlg.close ? dlg.close() : dlg.removeAttribute('open'));
    dlg.onclick = (e) => { if (e.target === dlg && dlg.close) dlg.close(); };
  }

  // Cena final completa: o "jogo" e depois a revelação.
  async function final(d, ctx) {
    const caixa = nova('final-jogo');
    // Texto de instrução do jogo.
    const instrucoes = { segurar: 'segure o coração', toques: 'toque no coração', deslizar: 'deslize para abrir' };
    caixa.appendChild(U.el('p', 'rotulo', U.esc(d.pre || 'falta só mais uma coisa')));
    const texto = U.el('p', 'sub', U.esc(d.dica || instrucoes[d.tp] || '')); caixa.appendChild(texto);
    // Escolhe o jogo.
    if (d.tp === 'toques') await jogoToques(caixa, d); else if (d.tp === 'deslizar') await jogoDeslizar(caixa, d); else await jogoSegurar(caixa, d);
    // Depois do jogo, revela.
    await revelar(ctx.msg, ctx.cat, d);
  }

  /* ---------------------- ORQUESTRAÇÃO ---------------------- */

  // Tabelas: tipo de cena -> função.
  Cenas.aberturas = { terminal: aberturaTerminal, coracao: aberturaCoracao, envelope: aberturaEnvelope, presente: aberturaPresente };
  Cenas.tipos = { historia, constelacao, scanner, cartas, contagem, motivos, escolha, final };

  // Roda a mensagem inteira: abertura, cenas em ordem e final. Um erro numa cena não derruba o resto.
  Cenas.rodar = async (msg, cat) => {
    // Contexto passado às cenas.
    const ctx = { msg, cat };
    // Abertura.
    try { await (Cenas.aberturas[msg.ab.t] || aberturaCoracao)(msg.ab, ctx); } catch (e) { console.error('abertura', e); }
    // Cenas em sequência.
    for (const passo of msg.passos) {
      const fn = Cenas.tipos[passo.t];
      if (!fn) { console.error('tipo de cena desconhecido: ' + passo.t); continue; }
      try { await fn(passo, ctx); } catch (e) {
        console.error(passo.t, e);
        // Se o final falhou, ainda entrega a mensagem pela revelação simples.
        if (passo.t === 'final') { try { await revelar(msg, cat, passo); } catch (e2) { console.error(e2); } }
      }
    }
  };

  // Publica.
  g.Cenas = Cenas;
// Executa.
})(window);
