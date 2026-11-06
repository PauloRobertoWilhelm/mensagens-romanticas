/* ==========================================================
   artes-datas.js — uma animação própria para cada link de datas especiais (ids 61 a 80).
   Os textos ficam em data/mensagens-datas.js; aqui só há desenho e movimento.
   ========================================================== */

// Isola variáveis.
(function (g) {
  // Modo estrito.
  'use strict';

  // Coleção global de artes.
  const A = g.Artes = g.Artes || {};

  // Coração em pixels: # é pixel aceso.
  const PIXEL = ['..##...##..', '.####.####.', '###########', '###########', '.#########.', '..#######..', '...#####...', '....###....', '.....#.....'];

  // Desenha a Lua em (x,y) com raio r; p de 0 a 1 percorre as fases, da nova à nova.
  const lua = (cx, x, y, r, p) => {
    // Disco iluminado.
    cx.fillStyle = '#f4efd6'; cx.beginPath(); cx.arc(x, y, r, 0, 6.3); cx.fill();
    // Guarda o estado para poder espelhar na fase minguante.
    cx.save(); cx.translate(x, y); if (p > .5) cx.scale(-1, 1);
    // Distância até a lua cheia; k diz o quanto a sombra invade.
    const q = p > .5 ? 1 - p : p; const k = Math.cos(q * 2 * Math.PI);
    // Sombra: meio círculo à esquerda, voltando pela curva da sombra.
    cx.fillStyle = '#10143a'; cx.beginPath(); cx.arc(0, 0, r + 1, -Math.PI / 2, Math.PI / 2, true); cx.ellipse(0, 0, Math.abs(k) * (r + 1), r + 1, 0, Math.PI / 2, -Math.PI / 2, k > 0); cx.fill();
    // Volta ao normal.
    cx.restore();
  };

  // 61 — Bolo com velas: apague uma a uma, cada vela é um desejo.
  A.bolo = async (d) => {
    // Abre a tela e monta o bolo em dois andares.
    const caixa = K.tela('a-bolo'); const b = K.add(caixa, 'div', 'torta'); const velas = K.add(b, 'div', 'velas');
    // Cinco velas, cada uma é um botão.
    const vs = d.desejos.map(() => { const v = U.el('button', 'velinha', '<i></i>'); v.type = 'button'; velas.appendChild(v); return v; });
    // Andares do bolo.
    K.add(b, 'i', 'andar um'); K.add(b, 'i', 'andar dois');
    // Frase.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Cada vela apagada mostra um desejo.
    let n = 0; await K.todos(vs, (v) => { v.classList.add('apagou'); U.palavras(t, d.desejos[n++], 100); K.som(300 + n * 60, 120, 'triangle'); });
    // Deixa ler e comemora.
    await U.esperar(2300); Fundo.festa(5); [392, 392, 440, 392, 523, 494].forEach((f, i) => setTimeout(() => K.som(f, 260), i * 280));
    // Frase final e segue.
    await K.fala(t, d.fecho); await K.mais(caixa, d.fim);
  };

  // 62 — Balões: estoure cada um e leia o que estava dentro.
  A.baloes = async (d) => {
    // Abre a tela cheia com o céu.
    const caixa = K.tela('a-baloes cheia'); const c = K.add(caixa, 'div', 'ceu-b');
    // Lugares dos balões.
    const POS = [[14, 42], [58, 36], [36, 18], [72, 12], [10, 12]];
    // Cria os balões.
    const bs = d.desejos.map((_, i) => { const b = U.el('button', 'balao-d'); b.type = 'button'; b.style.left = POS[i][0] + '%'; b.style.top = POS[i][1] + '%'; b.style.setProperty('--cor', 'hsl(' + (i * 66 + 330) + ' 84% 62%)'); b.style.animationDelay = (-i * .9) + 's'; c.appendChild(b); return b; });
    // Frase embaixo.
    const t = K.add(c, 'p', 'texto', d.abre);
    // Cada balão estoura e solta uma frase.
    let n = 0; await K.todos(bs, (b) => { const r = b.getBoundingClientRect(); Fundo.explodirEm(r.left + r.width / 2, r.top + r.height / 2, 20); b.classList.add('pop'); U.palavras(t, d.desejos[n++], 100); K.som(900, 60, 'square', .08); });
    // Deixa ler e fecha.
    await U.esperar(2300); await K.fala(t, d.fecho); await K.mais(c, d.fim);
  };

  // 63 — Doze meses em círculo: segure e os corações acendem até fechar o ano.
  A.doze = async (d) => {
    // Abre a tela e monta o anel.
    const caixa = K.tela('a-doze'); const anel = K.add(caixa, 'div', 'anel-m');
    // Doze corações em volta do círculo.
    const cs = Array.from({ length: 12 }, (_, i) => { const e = U.el('i', '', '♥'); e.style.transform = 'rotate(' + i * 30 + 'deg) translateY(-132px) rotate(' + (-i * 30) + 'deg)'; anel.appendChild(e); return e; });
    // Centro do anel é o botão de segurar.
    const c = U.el('button', 'miolo-m', '<b>0</b><span>' + U.esc(d.unidade) + '</span>'); c.type = 'button'; c.setAttribute('aria-label', d.dica); anel.appendChild(c);
    // Frase.
    const t = K.add(caixa, 'p', 'texto', d.dica);
    // Última marca mostrada.
    let marca = -1;
    // Acende mês a mês enquanto segura.
    await K.segura(c, 5200, (p) => {
      // Mês alcançado.
      const m = Math.floor(p * 12); U.$('b', c).textContent = m;
      // Acende os corações até esse mês.
      cs.forEach((e, i) => e.classList.toggle('on', i < m));
      // A cada trimestre, uma frase nova.
      const f = Math.floor(m / 3); if (f > marca && f < d.frases.length) { marca = f; t.innerHTML = U.fmt(d.frases[f]); K.som(500 + f * 80, 120); }
    });
    // Ano completo.
    U.$('b', c).textContent = '12'; Fundo.festa(4); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 64 — Brinde: arraste uma taça até a outra e faça tim-tim.
  A.brinde = async (d) => {
    // Abre a tela e monta as duas taças.
    const caixa = K.tela('a-brinde'); const m = K.add(caixa, 'div', 'mesa-b');
    // Taça que se arrasta.
    const a = U.el('button', 'taca esq', '<i></i>'); a.type = 'button'; a.setAttribute('aria-label', d.dica); m.appendChild(a);
    // Taça parada.
    const b = K.add(m, 'div', 'taca dir'); K.add(b, 'i');
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto', d.abre); const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera aproximar as taças.
    await K.arrasta(a, { rumo: [90, 0], move: (dx) => { a.style.transform = 'translateX(' + Math.max(0, Math.min(84, dx)) + 'px) rotate(8deg)'; }, solta: (dx) => { if (dx > 50) return true; a.style.transform = ''; return false; } });
    // Tim-tim: encosta, toca o som e solta brilho.
    dica.remove(); a.style.transform = 'translateX(84px) rotate(8deg)'; K.som(2093, 500); K.som(2637, 420); const r = a.getBoundingClientRect(); Fundo.explodirEm(r.right, r.top + 10, 30);
    // Frases do brinde.
    await K.frases(t, d.frases);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 65 — Fases da Lua: deslize o mês e veja a Lua mudar, porque o amor não muda.
  A.luas = async (d) => {
    // Abre a tela e o quadro da Lua; 'fase' guarda a posição atual.
    const caixa = K.tela('a-luas'); const q = K.add(caixa, 'div', 'quadro-l'); let fase = .04;
    // Desenha a Lua da fase atual.
    K.pinta(q, (cx, w, h) => { cx.clearRect(0, 0, w, h); lua(cx, w / 2, h / 2, Math.min(w, h) * .42, fase); });
    // Frase e trilho.
    const t = K.add(caixa, 'p', 'texto'); t.textContent = d.dica; const tr = K.add(caixa, 'div', 'trilho-l2'); const cabo = U.el('button', 'cabo-l', '☾'); cabo.type = 'button'; cabo.setAttribute('aria-label', d.dica); tr.appendChild(cabo);
    // Distância que o cabo pode andar.
    const max = () => tr.clientWidth - cabo.offsetWidth;
    // Última frase mostrada.
    let marca = -1;
    // Acompanha o dedo e troca a fase.
    await K.arrasta(cabo, { rumo: [300, 0], move: (dx) => {
      // Progresso de 0 a 1.
      const p = Math.max(0, Math.min(1, dx / max()));
      // Move o cabo e a Lua.
      cabo.style.transform = 'translateX(' + (p * max()) + 'px)'; fase = .04 + p * .92;
      // Frase da fase atual.
      const m = Math.min(d.frases.length - 1, Math.floor(p * d.frases.length));
      // Só reescreve quando muda.
      if (m !== marca) { marca = m; t.innerHTML = U.fmt(d.frases[m]); }
    }, solta: (dx) => dx >= max() * .8 });
    // Fecha com a frase final.
    tr.remove(); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 66 — Cupido: puxe o arco para baixo e solte a flecha.
  A.cupido = async (d) => {
    // Abre a tela cheia com o alvo e o arco.
    const caixa = K.tela('a-cupido cheia'); const c = K.add(caixa, 'div', 'campo-c'); const alvo = K.add(c, 'b', 'alvo-c', '♥'); const t = K.add(c, 'p', 'texto');
    // Flecha que voa.
    const fl = K.add(c, 'i', 'flecha');
    // Arco.
    const arco = U.el('button', 'arco-c', '<svg viewBox="0 0 160 70" aria-hidden="true"><path class="madeira" d="M6 62Q80 -18 154 62"/><path class="corda" d="M6 62Q80 62 154 62"/></svg>'); arco.type = 'button'; arco.setAttribute('aria-label', d.dica); c.appendChild(arco); const corda = U.$('.corda', arco);
    // Dica.
    const dica = K.add(c, 'p', 'dica', d.dica);
    // Um disparo para cada frase.
    for (const f of d.frases) {
      // Puxar a corda deforma o traço e encolhe a flecha para perto do arco.
      await K.arrasta(arco, { rumo: [0, 90], move: (dx, dy) => { const y = Math.max(0, Math.min(90, dy)); corda.setAttribute('d', 'M6 62Q80 ' + (62 + y) + ' 154 62'); fl.style.transform = 'translateY(' + y + 'px)'; }, solta: (dx, dy) => { corda.setAttribute('d', 'M6 62Q80 62 154 62'); fl.style.transform = ''; return dy > 40; } });
      // Lança a flecha.
      dica.hidden = true; fl.classList.remove('voa'); void fl.offsetWidth; fl.classList.add('voa'); K.som(700, 180, 'triangle'); await U.esperar(520);
      // Acerta o coração.
      alvo.classList.remove('acerto'); void alvo.offsetWidth; alvo.classList.add('acerto'); K.som(180, 200, 'square', .08); await K.fala(t, f); await U.esperar(800);
    }
    // Guarda o arco e a flecha e segue para o final.
    arco.remove(); fl.remove(); await K.mais(c, d.fim);
  };

  // 67 — Cadeado do amor na ponte: leve a chave até o cadeado.
  A.cadeado = async (d) => {
    // Abre a tela com a grade da ponte e o cadeado aberto.
    const caixa = K.tela('a-cadeado'); const g2 = K.add(caixa, 'div', 'grade-c'); const c = K.add(g2, 'div', 'trava'); K.add(c, 'i', 'argola'); K.add(c, 'b', 'corpo-c', d.iniciais);
    // Chave que se arrasta.
    const ch = U.el('button', 'chave', '<i></i>'); ch.type = 'button'; ch.setAttribute('aria-label', d.dica); g2.appendChild(ch);
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto', d.abre); const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera levar a chave para cima.
    await K.arrasta(ch, { rumo: [0, -130], move: (dx, dy) => { ch.style.transform = 'translate(' + dx + 'px,' + Math.min(0, dy) + 'px)'; }, solta: (dx, dy) => { if (dy < -70) return true; ch.style.transform = ''; return false; } });
    // Tranca o cadeado.
    dica.remove(); ch.style.transition = 'transform 1.1s ease-in, opacity 1s'; ch.style.transform = 'translate(120px, 420px) rotate(220deg)'; ch.style.opacity = 0; c.classList.add('trancado'); K.som(1200, 70, 'square', .07); U.vibra(40);
    // Tira a chave da tela depois que ela cai, para não sobrar rolagem.
    setTimeout(() => ch.remove(), 1200);
    // Frases.
    await K.frases(t, d.frases);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 68 — Fliperama: insira as fichas e o coração de pixels se monta.
  A.pixel = async (d) => {
    // Abre a tela com o letreiro e a grade.
    const caixa = K.tela('a-pixel'); K.add(caixa, 'p', 'score', d.score); const gr = K.add(caixa, 'div', 'tela-p');
    // Cria os pixels; só os do coração serão acesos.
    const px = []; PIXEL.forEach((l) => [...l].forEach((c) => { const e = U.el('i'); gr.appendChild(e); if (c === '#') px.push(e); }));
    // Botão de ficha e frase.
    const b = K.botao(caixa, d.ficha); const t = K.add(caixa, 'p', 'msg-p', d.abre);
    // Um terço do coração por ficha.
    const parte = Math.ceil(px.length / d.frases.length);
    // Cada ficha acende uma parte.
    await K.vezes(b, d.frases.length, (i) => { px.slice((i - 1) * parte, i * parte).forEach((e, k) => setTimeout(() => e.classList.add('on'), k * 16)); t.innerHTML = U.fmt(d.frases[i - 1]); K.som(660 + i * 130, 120, 'square', .05); });
    // Música de vitória.
    b.remove(); [523, 659, 784, 1047, 784, 1047].forEach((f, i) => setTimeout(() => K.som(f, 120, 'square', .05), i * 120)); await U.esperar(1600);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 69 — Árvore de Natal: pendure as bolas e ligue a estrela.
  A.arvore = async (d) => {
    // Abre a tela e monta a árvore em três camadas.
    const caixa = K.tela('a-arvore'); const a = K.add(caixa, 'div', 'pinheiro'); K.add(a, 'i', 'tronco'); ['c1', 'c2', 'c3'].forEach((c) => K.add(a, 'i', 'copa ' + c));
    // Estrela no topo.
    const st = K.add(a, 'b', 'topo-a', '★');
    // Lugares das bolas.
    const POS = [[50, 30], [34, 52], [66, 56], [26, 76], [72, 78]];
    // Cria as bolas apagadas.
    const bs = d.desejos.map((_, i) => { const b = U.el('button', 'bola-n'); b.type = 'button'; b.style.left = POS[i][0] + '%'; b.style.top = POS[i][1] + '%'; b.style.setProperty('--cor', ['#ff5a5a', '#ffd23f', '#5ce1ff', '#ff8fb1', '#9dff7a'][i]); a.appendChild(b); return b; });
    // Frase.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Cada bola acesa traz um desejo.
    let n = 0; await K.todos(bs, (b) => { b.classList.add('acesa'); U.palavras(t, d.desejos[n++], 100); K.som(660 + n * 80, 200); });
    // Deixa ler e liga a estrela.
    await U.esperar(2300); st.classList.add('on'); a.classList.add('brilha'); [784, 880, 988, 1175].forEach((f, i) => setTimeout(() => K.som(f, 300), i * 180));
    // Frase final e segue.
    await K.fala(t, d.fecho); await K.mais(caixa, d.fim);
  };

  // 70 — Globo de neve: chacoalhe e a neve revela a mensagem.
  A.globo = async (d) => {
    // Abre a tela com o globo; 'neve' guarda os flocos e 'forca' a agitação.
    const caixa = K.tela('a-globo'); const gl = U.el('button', 'esfera'); gl.type = 'button'; gl.setAttribute('aria-label', d.dica); caixa.appendChild(gl); K.add(gl, 'span', 'casinha'); K.add(gl, 'b', 'dentro', d.dentro); let forca = 0; const neve = Array.from({ length: 80 }, () => ({ x: Math.random(), y: Math.random(), v: U.rand(.0012, .0034) }));
    // Desenha os flocos a cada quadro.
    K.pinta(gl, (cx, w, h) => {
      // Limpa e define a cor da neve.
      cx.clearRect(0, 0, w, h); cx.fillStyle = '#fff';
      // A agitação vai passando aos poucos.
      forca *= .985;
      // Move e desenha cada floco.
      neve.forEach((f) => { f.y += f.v + forca * U.rand(-.02, .02); f.x += forca * U.rand(-.02, .02); if (f.y > 1) { f.y = 0; f.x = Math.random(); } if (f.y < 0) f.y = 1; f.x = (f.x + 1) % 1; cx.beginPath(); cx.arc(f.x * w, f.y * h, 2.1, 0, 6.3); cx.fill(); });
    });
    // Base do globo, frase e dica.
    K.add(caixa, 'i', 'base-g'); const t = K.add(caixa, 'p', 'texto'); const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Três chacoalhadas.
    await K.vezes(gl, d.frases.length, (i) => { forca = 1; dica.hidden = true; gl.classList.remove('sacode'); void gl.offsetWidth; gl.classList.add('sacode'); U.palavras(t, d.frases[i - 1], 100); K.som(1600, 90, 'triangle', .03); });
    // Deixa a neve assentar e segue.
    await U.esperar(2600); await K.mais(caixa, d.fim);
  };

  // 71 — Relógio chegando à meia-noite e estouro do champanhe.
  A.relogio = async (d) => {
    // Abre a tela e monta o mostrador.
    const caixa = K.tela('a-relogio'); const r = K.add(caixa, 'div', 'mostrador');
    // Doze marcas em volta do mostrador.
    for (let i = 0; i < 12; i++) { const m = U.el('i', 'marca-r'); m.style.transform = 'rotate(' + i * 30 + 'deg) translateY(-118px)'; r.appendChild(m); }
    // Ponteiros.
    const ph = K.add(r, 'b', 'ponteiro horas'); const pm = K.add(r, 'b', 'ponteiro minutos');
    // Número gigante e frase.
    const n = K.add(caixa, 'p', 'conta-r'); const t = K.add(caixa, 'p', 'texto', d.abre);
    // Espera começar.
    await K.mais(caixa, d.botao);
    // Gira os ponteiros até meia-noite.
    ph.classList.add('vai'); pm.classList.add('vai'); await U.esperar(2300);
    // Contagem final.
    for (const v of [3, 2, 1]) { n.textContent = v; n.classList.remove('pula'); void n.offsetWidth; n.classList.add('pula'); K.som(440, 200, 'square', .06); await U.esperar(900); }
    // Meia-noite.
    n.textContent = d.ano; Fundo.festa(8); K.som(880, 600, 'square', .06); U.vibra([40, 30, 60]); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 72 — Sete ondas: pule cada onda e faça um pedido.
  A.ondas = async (d) => {
    // Abre a tela cheia com o mar e a pessoa.
    const caixa = K.tela('a-ondas cheia'); const m = K.add(caixa, 'div', 'praia-o'); const conta = K.add(m, 'p', 'conta-o', '0/' + d.pedidos.length); const t = K.add(m, 'p', 'texto', d.abre);
    // Onda que vem e pessoa que pula.
    const o = K.add(m, 'i', 'onda-o'); const p = K.add(m, 'i', 'pessoa');
    // Botão de pular.
    const b = K.botao(m, d.botao);
    // Cada toque é um pulo de onda.
    await K.vezes(b, d.pedidos.length, (i) => { conta.textContent = i + '/' + d.pedidos.length; U.palavras(t, d.pedidos[i - 1], 100); o.classList.remove('passa'); p.classList.remove('pula-o'); void o.offsetWidth; o.classList.add('passa'); p.classList.add('pula-o'); K.som(260 + i * 50, 240, 'sine'); });
    // Deixa ler e fecha.
    b.remove(); await U.esperar(2200); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(m, d.fim);
  };

  // 73 — Caderno de receitas: marque cada ingrediente de uma mãe.
  A.receita = async (d) => {
    // Abre a tela e monta a página manchada.
    const caixa = K.tela('a-receita'); const p = K.add(caixa, 'div', 'pagina-r'); K.add(p, 'h1', '', d.titulo); K.add(p, 'p', 'rende', d.rende);
    // Cada ingrediente é um botão de marcar.
    const is = d.ingredientes.map((x) => { const b = U.el('button', 'ingr', U.fmt(x)); b.type = 'button'; p.appendChild(b); return b; });
    // Dica de toque.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Marca cada um.
    await K.todos(is, (b) => { b.classList.add('ok'); K.som(620, 80, 'triangle'); });
    // Modo de preparo.
    dica.remove(); const m = K.add(p, 'p', 'preparo'); await K.fala(m, d.preparo, 130);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 74 — Planta técnica: o projeto do pai, com cotas e medidas.
  A.projeto = async (d) => {
    // Abre a tela cheia com o papel azul.
    const caixa = K.tela('a-projeto cheia'); const f = K.add(caixa, 'div', 'folha-p'); K.add(f, 'h1', '', d.titulo);
    // Desenho técnico de uma casa, que se traça sozinho.
    const s = U.el('div', 'desenho', '<svg viewBox="0 0 240 200" aria-hidden="true"><path pathLength="1" d="M30 94L120 20L210 94"/><path pathLength="1" d="M50 80V180H190V80"/><path pathLength="1" d="M104 180V126H136V180"/><path pathLength="1" d="M66 104H92V130H66ZM148 104H174V130H148Z"/><path pathLength="1" d="M20 192H220M20 186V198M220 186V198"/></svg>'); f.appendChild(s); void s.offsetWidth; s.classList.add('traca');
    // Cotas com medidas, cada uma é um botão.
    const POS = [[50, 12], [22, 56], [76, 56]];
    // Cria cada cota sobre o desenho.
    const cs = d.cotas.map((_, i) => { const b = U.el('button', 'cota', String(i + 1)); b.type = 'button'; b.style.left = POS[i][0] + '%'; b.style.top = POS[i][1] + '%'; s.appendChild(b); return b; });
    // Texto da especificação.
    const t = K.add(f, 'p', 'espec', d.abre);
    // Espera o desenho terminar.
    await U.esperar(2200);
    // Cada cota explica uma parte.
    let n = 0; await K.todos(cs, (b) => { b.classList.add('lida'); U.palavras(t, d.cotas[n++], 100); K.som(520 + n * 60, 100, 'triangle'); });
    // Deixa ler e segue.
    await U.esperar(2400); await K.mais(f, d.fim);
  };

  // 75 — Rosa que abre uma pétala a cada toque.
  A.rosa = async (d) => {
    // Abre a tela e monta as camadas de pétalas.
    const caixa = K.tela('a-rosa'); const r = U.el('button', 'flor-r'); r.type = 'button'; r.setAttribute('aria-label', d.dica); caixa.appendChild(r);
    // Pétalas em anéis, das de fora para as de dentro.
    const camadas = [0, 1, 2, 3, 4].map((k) => { const c = U.el('i', 'anel-r'); c.style.setProperty('--k', k); for (let i = 0; i < 6; i++) { const p = U.el('b'); p.style.transform = 'rotate(' + (i * 60 + k * 26) + 'deg)'; c.appendChild(p); } r.appendChild(c); return c; });
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto'); const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Cada toque abre um anel e diz uma verdade.
    await K.vezes(r, d.frases.length, (i) => { dica.hidden = true; camadas[Math.min(i - 1, camadas.length - 1)].classList.add('aberto'); U.palavras(t, d.frases[i - 1], 100); K.som(440 + i * 70, 260); });
    // Deixa ler e segue.
    await U.esperar(2500); await K.mais(caixa, d.fim);
  };

  // 76 — Pulseira da amizade: passe cada conta pelo fio até formar a palavra.
  A.pulseira = async (d) => {
    // Abre a tela com o fio.
    const caixa = K.tela('a-pulseira'); K.add(caixa, 'p', 'chamada', d.titulo); const fio = K.add(caixa, 'div', 'fio-p');
    // Contas soltas embaixo.
    const solta = K.add(caixa, 'div', 'contas'); const cs = [...d.palavra].map((c, i) => { const b = U.el('button', 'conta-p', U.esc(c)); b.type = 'button'; b.style.setProperty('--cor', 'hsl(' + (i * 56 + 10) + ' 80% 62%)'); solta.appendChild(b); return b; });
    // Frase.
    const t = K.add(caixa, 'p', 'texto', d.dica);
    // Uma conta por vez, na ordem certa, para a palavra sair certa.
    for (let i = 0; i < cs.length; i++) { cs[i].classList.add('vez'); await K.toque(cs[i]); cs[i].classList.remove('vez'); fio.appendChild(cs[i]); K.som(600 + i * 70, 100, 'triangle'); }
    // Pulseira pronta.
    solta.remove(); fio.classList.add('pronta'); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 77 — Ovo de Páscoa: quebre a casca aos poucos.
  A.ovo = async (d) => {
    // Abre a tela e monta o ovo com as rachaduras escondidas.
    const caixa = K.tela('a-ovo'); const o = U.el('button', 'casca-o', '<svg viewBox="0 0 200 250" aria-hidden="true"><path class="ovo-c" d="M100 8C150 8 188 92 188 150C188 208 148 242 100 242C52 242 12 208 12 150C12 92 50 8 100 8Z"/><path class="faixa" d="M14 128Q100 168 186 128M26 176Q100 212 174 176"/><path class="r r1" pathLength="1" d="M100 60L84 88L108 106L90 132"/><path class="r r2" pathLength="1" d="M90 132L62 148L74 176"/><path class="r r3" pathLength="1" d="M90 132L126 150L116 182L140 200"/></svg>'); o.type = 'button'; o.setAttribute('aria-label', d.dica); caixa.appendChild(o);
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto'); const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Cada batida abre uma rachadura.
    await K.vezes(o, 3, (i) => { dica.hidden = true; o.dataset.racha = i; o.classList.remove('bate-o'); void o.offsetWidth; o.classList.add('bate-o'); U.palavras(t, d.frases[i - 1], 100); K.som(300 + i * 80, 100, 'square', .06); });
    // Deixa ler e abre o ovo.
    await U.esperar(2300); o.classList.add('abriu'); Fundo.festa(4); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 78 — Montanha: segure para escalar até o topo.
  A.montanha = async (d) => {
    // Abre a tela cheia com as serras e a trilha.
    const caixa = K.tela('a-montanha cheia'); const m = K.add(caixa, 'div', 'serra');
    // Montanhas e bandeira.
    m.appendChild(U.el('div', 'picos', '<svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><path class="atras" d="M-20 300L70 130L130 210L210 100L320 300z"/><path class="frente" d="M-20 300L150 40L320 300z"/><path class="neve-m" d="M150 40L122 84L138 78L150 92L164 76L180 86z"/><path class="trilha" pathLength="1" d="M96 298C130 270 190 262 168 224C150 194 116 196 132 160C144 134 176 128 160 96C154 80 148 62 150 42"/></svg>'));
    // Quem sobe e a bandeira no topo.
    const q = K.add(m, 'i', 'alpinista'); const fl = K.add(m, 'b', 'bandeira', '⚑');
    // Frase e botão de segurar.
    const t = K.add(m, 'p', 'texto', d.abre); const bt = K.botao(m, d.botao);
    // Caminho da trilha para posicionar quem sobe.
    const tr = U.$('.trilha', m); const svg = U.$('svg', m);
    // Última frase mostrada.
    let marca = 0;
    // Enquanto segura, sobe pela trilha.
    await K.segura(bt, 5000, (p) => {
      // Ponto da trilha neste progresso, em coordenadas da tela.
      const pt = tr.getPointAtLength(p * tr.getTotalLength()); const cm = svg.getScreenCTM(); q.style.left = (pt.x * cm.a + cm.e) + 'px'; q.style.top = (pt.y * cm.d + cm.f) + 'px';
      // Frase da altitude.
      const f = Math.floor(p * d.frases.length); if (f > marca) { marca = f; t.innerHTML = U.fmt(d.frases[f - 1]); }
    });
    // Chegou no topo.
    bt.remove(); fl.classList.add('on'); Fundo.festa(5); K.som(784, 400); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(m, d.fim);
  };

  // 79 — Caderno de agradecimentos: cole as estrelinhas de bom trabalho.
  A.caderno = async (d) => {
    // Abre a tela e monta o caderno pautado com espiral.
    const caixa = K.tela('a-caderno'); const c = K.add(caixa, 'div', 'folha-c'); K.add(c, 'h1', '', d.titulo);
    // Cada linha tem um espaço para a estrela e o texto que se escreve depois.
    const ls = d.linhas.map((x) => { const l = K.add(c, 'div', 'linha-c'); const b = U.el('button', 'estrela-c', '☆'); b.type = 'button'; l.appendChild(b); const p = K.add(l, 'p'); return { b, p, x }; });
    // Dica de toque.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Cada estrela colada escreve uma linha.
    await K.todos(ls.map((l) => l.b), (b, i) => { b.textContent = '★'; b.classList.add('colou'); U.palavras(ls[i].p, ls[i].x, 90); K.som(760, 100, 'triangle'); });
    // Deixa ler e assina.
    dica.remove(); await U.esperar(2000); K.add(c, 'p', 'assin entra', d.assinatura);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 80 — Alianças: junte os dois anéis e os sinos tocam.
  A.aliancas = async (d) => {
    // Abre a tela com os dois anéis separados.
    const caixa = K.tela('a-aliancas'); const m = K.add(caixa, 'div', 'almofada');
    // Anel que se arrasta e anel parado.
    const a = U.el('button', 'anel-a um'); a.type = 'button'; a.setAttribute('aria-label', d.dica); m.appendChild(a); K.add(m, 'i', 'anel-a dois');
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto', d.abre); const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera juntar.
    await K.arrasta(a, { rumo: [90, 0], move: (dx) => { a.style.transform = 'translateX(' + Math.max(0, Math.min(72, dx)) + 'px)'; }, solta: (dx) => { if (dx > 44) return true; a.style.transform = ''; return false; } });
    // Encaixa e toca os sinos.
    dica.remove(); a.style.transform = 'translateX(72px)'; m.classList.add('unidos'); [1319, 1568, 1319, 1047].forEach((f, i) => setTimeout(() => K.som(f, 500), i * 240));
    // Fala os anos e segue.
    await K.frases(t, d.frases); await K.mais(caixa, d.fim);
  };
// Executa.
})(window);
