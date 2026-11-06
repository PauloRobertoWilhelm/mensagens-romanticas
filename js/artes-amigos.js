/* ==========================================================
   artes-amigos.js — uma animação própria para cada link de amigos (ids 41 a 60).
   Os textos ficam em data/mensagens-amigos.js; aqui só há desenho e movimento.
   ========================================================== */

// Isola variáveis.
(function (g) {
  // Modo estrito.
  'use strict';

  // Coleção global de artes.
  const A = g.Artes = g.Artes || {};

  // Sons graves e agudos dos pads de bateria: frequência, duração e tipo de onda.
  const PADS = [[70, 240, 'sine'], [180, 120, 'triangle'], [1200, 60, 'square'], [320, 160, 'triangle'], [90, 200, 'square'], [1800, 90, 'sawtooth']];

  // 41 — Álbum de figurinhas: abra o pacote e cole cada amigo no lugar.
  A.figurinhas = async (d) => {
    // Abre a tela, o título e o álbum com vagas vazias.
    const caixa = K.tela('a-figurinhas'); K.add(caixa, 'p', 'chamada', d.titulo); const album = K.add(caixa, 'div', 'album'); const vagas = d.figs.map((_, i) => K.add(album, 'div', 'vaga', String(i + 1)));
    // Pacote fechado e dica.
    const pac = U.el('button', 'pacote', U.esc(d.pacote)); pac.type = 'button'; caixa.appendChild(pac);
    // Espera abrir o pacote.
    await K.toque(pac); pac.remove(); K.som(300, 140, 'sawtooth', .04);
    // Figurinhas soltas na mesa.
    const mesa = K.add(caixa, 'div', 'mesa'); const fs = d.figs.map((f) => { const b = U.el('button', 'fig', U.esc(f.e)); b.type = 'button'; mesa.appendChild(b); return b; });
    // Cada toque cola uma figurinha na sua vaga.
    await K.todos(fs, (b, i) => { vagas[i].innerHTML = '<b>' + U.esc(d.figs[i].e) + '</b><span>' + U.fmt(d.figs[i].t) + '</span>'; vagas[i].classList.add('colada'); b.style.visibility = 'hidden'; K.som(700 + i * 80, 90); });
    // Tira a mesa e fecha o álbum.
    mesa.remove(); K.add(caixa, 'p', 'texto entra', d.fecho);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 42 — Ficha de personagem em pixel: atributos sobem e conquistas pipocam.
  A.rpg = async (d) => {
    // Abre a tela e monta a ficha.
    const caixa = K.tela('a-rpg'); const j = K.add(caixa, 'div', 'ficha'); K.add(j, 'h1', '', d.titulo); K.add(j, 'p', 'nivel', d.nivel);
    // Uma linha para cada atributo.
    const at = d.atributos.map(([n, v]) => { const l = K.add(j, 'div', 'attr'); K.add(l, 'span', '', n); const b = K.add(K.add(l, 'div', 'trilho-r'), 'i'); const val = K.add(l, 'b', '', '0'); return { b, val, v }; });
    // Espera começar.
    await K.mais(caixa, d.botao);
    // Enche cada barra com som de jogo.
    for (const a of at) { a.b.style.width = Math.min(100, a.v) + '%'; await U.contar(a.v, 700, (v) => { a.val.textContent = v; }); K.som(660, 80, 'square', .04); }
    // Pipoca as conquistas.
    for (const c of d.conquistas) { K.add(j, 'p', 'conquista entra', c); K.som(988, 120, 'square', .05); await U.esperar(1500); }
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 43 — Prova de escola: toda resposta está certa, e a caneta vermelha concorda.
  A.prova = async (d) => {
    // Abre a tela e monta a folha.
    const caixa = K.tela('a-prova'); const f = K.add(caixa, 'div', 'prova'); K.add(f, 'h1', '', d.titulo); K.add(f, 'p', 'aluno', d.aluno); const nota = K.add(f, 'b', 'nota'); const area = K.add(f, 'div', 'questoes');
    // Uma questão de cada vez.
    for (const q of d.questoes) {
      // Limpa e escreve a pergunta.
      area.innerHTML = ''; K.add(area, 'p', 'perg', q.p);
      // Cria as opções.
      const ops = q.o.map((o) => { const b = U.el('button', 'op', U.fmt(o)); b.type = 'button'; area.appendChild(b); return b; });
      // Espera a escolha e marca como certa.
      const i = await K.qual(ops); ops[i].classList.add('certa'); K.som(880, 110);
      // A professora comenta com caneta vermelha.
      const r = K.add(area, 'p', 'caneta'); await K.fala(r, q.r); await U.esperar(1100);
    }
    // Mostra a nota final.
    area.innerHTML = ''; nota.textContent = d.nota; nota.classList.add('on'); K.som(523, 300); K.add(area, 'p', 'caneta entra', d.obs);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 44 — Pescaria: segure para puxar a linha e veja o que veio.
  A.pesca = async (d) => {
    // Abre a tela cheia com o mar, a linha e o que vem no anzol.
    const caixa = K.tela('a-pesca cheia'); const m = K.add(caixa, 'div', 'agua'); const linha = K.add(m, 'i', 'linha'); const item = K.add(m, 'b', 'presa');
    // Frase e botão de segurar.
    const t = K.add(m, 'p', 'texto', d.abre); const bt = K.botao(m, d.botao);
    // Uma puxada para cada pesca.
    for (const p of d.pescas) {
      // Linha lá no fundo.
      item.textContent = ''; linha.style.height = '66%';
      // Sobe a linha enquanto segura.
      await K.segura(bt, 1700, (q) => { linha.style.height = (66 - q * 50) + '%'; });
      // Mostra o que veio.
      item.textContent = p.e; item.classList.remove('sobe'); void item.offsetWidth; item.classList.add('sobe'); K.som(620, 180);
      // Comenta a pesca.
      await K.fala(t, p.t); await U.esperar(800);
    }
    // Tira o botão e segue para o final.
    bt.remove(); await K.mais(m, d.fim);
  };

  // 45 — Bateria eletrônica: toque em todos os pads para fazer barulho junto.
  A.pads = async (d) => {
    // Abre a tela, o título e a grade de pads.
    const caixa = K.tela('a-pads'); K.add(caixa, 'h1', 'marca', d.titulo); const gr = K.add(caixa, 'div', 'grade-p');
    // Cria os seis pads, cada um com sua cor.
    const ps = d.pads.map((n, i) => { const b = U.el('button', 'pad', U.esc(n)); b.type = 'button'; b.style.setProperty('--h', i * 58); gr.appendChild(b); return b; });
    // Texto que muda a cada batida.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Faz o som do pad e pisca a luz; continua respondendo mesmo depois de contar.
    ps.forEach((b, i) => b.addEventListener('pointerdown', () => { K.som(PADS[i][0], PADS[i][1], PADS[i][2], .14); b.classList.remove('bate'); void b.offsetWidth; b.classList.add('bate'); }));
    // Espera tocar em todos e troca a frase.
    let n = 0; await K.todos(ps, () => { U.palavras(t, d.frases[n++], 100); });
    // Deixa ler e segue para o final.
    await U.esperar(2300); await K.mais(caixa, d.fim);
  };

  // 46 — Boleto da amizade: código de barras, vencimento nunca, carimbo de pago.
  A.boleto = async (d) => {
    // Abre a tela e monta o papel.
    const caixa = K.tela('a-boleto'); const b = K.add(caixa, 'div', 'recibo'); K.add(b, 'h1', '', d.banco);
    // Campos do boleto.
    d.campos.forEach(([r, v]) => K.par(b, 'cel-b', r, v));
    // Código de barras com larguras sorteadas.
    b.appendChild(U.el('div', 'barras', Array.from({ length: 56 }, () => '<i style="width:' + Math.ceil(U.rand(1, 4)) + 'px"></i>').join('')));
    // Espera pagar.
    await K.mais(caixa, d.botao);
    // Carimbo com pancada.
    K.add(b, 'div', 'pago', d.carimbo); K.som(70, 240, 'square', .12); U.vibra(60);
    // Observação e segue.
    await U.esperar(900); K.add(caixa, 'p', 'texto entra', d.fecho); await K.mais(caixa, d.fim);
  };

  // 47 — Pódio: terceiro, segundo e, por fim, a medalha de ouro desce.
  A.podio = async (d) => {
    // Abre a tela e monta o pódio vazio.
    const caixa = K.tela('a-podio'); K.add(caixa, 'p', 'chamada', d.titulo); const p = K.add(caixa, 'div', 'degraus');
    // Blocos na ordem visual: segundo, primeiro, terceiro.
    const bl = [['b2', '2', d.segundo], ['b1', '1', d.primeiro], ['b3', '3', d.terceiro]].map(([c, n, nome]) => { const e = K.add(p, 'div', 'bloco-p ' + c); K.add(e, 'span', 'quem', nome); K.add(e, 'b', '', n); return e; });
    // Ordem de subida: terceiro, segundo, primeiro.
    for (const i of [2, 0, 1]) { await K.mais(caixa, i === 1 ? d.ouro : d.botao); bl[i].classList.add('sobe'); K.som(i === 1 ? 784 : 392, 200, 'triangle'); await U.esperar(900); }
    // Medalha cai no vencedor.
    K.add(bl[1], 'i', 'medalha'); Fundo.festa(5); [523, 659, 784].forEach((f, i) => setTimeout(() => K.som(f, 200, 'triangle'), i * 140));
    // Fala e segue.
    const t = K.add(caixa, 'p', 'texto'); await K.fala(t, d.fecho); await K.mais(caixa, d.fim);
  };

  // 48 — Estrada à noite: faixas passando e placas com frases.
  A.estrada = async (d) => {
    // Abre a tela cheia; 'vel' é a velocidade da estrada.
    const caixa = K.tela('a-estrada cheia'); let pos = 0, vel = .006;
    // Desenha a estrada em perspectiva a cada quadro.
    K.pinta(caixa, (cx, w, h) => {
      // Céu noturno e chão.
      const hz = h * .42; cx.fillStyle = '#080a1e'; cx.fillRect(0, 0, w, hz); cx.fillStyle = '#10161f'; cx.fillRect(0, hz, w, h - hz);
      // Lua no alto.
      cx.fillStyle = '#f4efd6'; cx.beginPath(); cx.arc(w * .8, h * .13, 24, 0, 6.3); cx.fill();
      // Asfalto em trapézio.
      cx.fillStyle = '#2b2f3a'; cx.beginPath(); cx.moveTo(w / 2 - 7, hz); cx.lineTo(w / 2 + 7, hz); cx.lineTo(w * 1.1, h); cx.lineTo(-w * .1, h); cx.fill();
      // Avança a estrada.
      pos = (pos + vel) % 1;
      // Faixas brancas que crescem ao se aproximar.
      cx.fillStyle = '#f5e27a'; for (let i = 0; i < 8; i++) { const z = ((i / 8 + pos) % 1), y = hz + (h - hz) * z * z, a = 1 + z * z * 9, l = 4 + z * z * 58; cx.fillRect(w / 2 - a / 2, y, a, l); }
    });
    // Placa que vem da frente e texto.
    const s = K.add(caixa, 'div', 'sobre'); const pl = K.add(caixa, 'div', 'placa-e');
    // Passa uma placa por frase.
    for (let i = 0; i < d.placas.length; i++) {
      // Toque para acelerar.
      await K.mais(s, i ? d.botao : d.comecar); vel = .018;
      // Troca a placa e reinicia o movimento dela.
      pl.innerHTML = U.fmt(d.placas[i]); pl.classList.remove('vem'); void pl.offsetWidth; pl.classList.add('vem'); K.som(200, 300, 'sawtooth', .02);
      // Dá tempo de ler e volta à velocidade normal.
      await U.esperar(3300); vel = .006;
    }
    // Segue para o final.
    await K.mais(s, d.fim);
  };

  // 49 — Cacto: amizade que sobrevive sem água, mas cresce com ela.
  A.cacto = async (d) => {
    // Abre a tela com vaso, cacto e braços.
    const caixa = K.tela('a-cacto'); const v = K.add(caixa, 'div', 'vaso'); const c = K.add(v, 'div', 'planta'); K.add(c, 'i', 'braco-e'); K.add(c, 'i', 'braco-d'); K.add(c, 'b', 'flor', '✿');
    // Frase e regador.
    const t = K.add(caixa, 'p', 'texto', d.abre); const r = K.botao(caixa, d.botao);
    // Cada regada cresce uma fase.
    await K.vezes(r, d.frases.length, (i) => { c.dataset.fase = i; U.palavras(t, d.frases[i - 1], 110); K.som(520 + i * 70, 200); });
    // Tira o regador, deixa ler e segue.
    r.remove(); await U.esperar(2500); await K.mais(caixa, d.fim);
  };

  // 50 — Fita VHS: chiado, rebobina, e as memórias passam na tela.
  A.vhs = async (d) => {
    // Abre a tela cheia; 'chiado' controla a força da estática.
    const caixa = K.tela('a-vhs cheia'); let chiado = 1;
    // Estática em blocos, barata para o celular.
    K.pinta(caixa, (cx, w, h) => {
      // Fundo escuro quase azul.
      cx.fillStyle = '#0a0c14'; cx.fillRect(0, 0, w, h);
      // Pontos brancos sorteados a cada quadro.
      for (let i = 0; i < 900 * chiado; i++) { cx.fillStyle = 'rgba(255,255,255,' + Math.random() * .5 + ')'; cx.fillRect(Math.random() * w, Math.random() * h, 3, 2); }
      // Faixa de interferência descendo.
      cx.fillStyle = 'rgba(255,255,255,.06)'; cx.fillRect(0, (performance.now() / 9) % h, w, 34);
    });
    // Interface da fita por cima.
    const s = K.add(caixa, 'div', 'sobre'); const modo = K.add(s, 'p', 'modo', d.rebobina); const tc = K.add(s, 'p', 'tempo', '00:00:00'); const t = K.add(s, 'p', 'legenda-v');
    // Espera apertar o play.
    await K.mais(s, d.play);
    // Rebobina os números.
    await U.contar(5400, 1800, (v) => { tc.textContent = '0' + Math.floor(v / 3600) + ':' + String(Math.floor(v / 60) % 60).padStart(2, '0') + ':' + String(v % 60).padStart(2, '0'); });
    // Imagem limpa e modo de reprodução.
    chiado = .08; modo.textContent = d.tocando; K.som(800, 60, 'square', .03);
    // As memórias passam como legendas.
    await K.frases(t, d.memorias);
    // Segue para o final.
    await K.mais(s, d.fim);
  };

  // 51 — Máquina de garra: pegue as cápsulas com frases dentro.
  A.garra = async (d) => {
    // Abre a tela e monta a vitrine.
    const caixa = K.tela('a-garra'); K.add(caixa, 'p', 'chamada', d.titulo); const v = K.add(caixa, 'div', 'vitrine'); const g2 = K.add(v, 'div', 'gancho');
    // Cápsulas coloridas no fundo.
    const fundo = K.add(v, 'div', 'bolas'); for (let i = 0; i < 10; i++) { const c = U.el('i'); c.style.background = 'hsl(' + (i * 36) + ' 85% 62%)'; fundo.appendChild(c); }
    // Frase e botão de descer.
    const t = K.add(caixa, 'p', 'texto'); const bt = K.botao(caixa, d.botao);
    // Três tentativas: sempre vem alguma coisa boa.
    for (const f of d.frases) {
      // Espera apertar.
      await K.toque(bt); bt.disabled = true; g2.classList.add('desce'); K.som(240, 700, 'sawtooth', .03); await U.esperar(1700);
      // Volta com a cápsula e abre.
      g2.classList.remove('desce'); K.som(880, 140); await K.fala(t, f); await U.esperar(700); bt.disabled = false;
    }
    // Tira o botão e segue.
    bt.remove(); await K.mais(caixa, d.fim);
  };

  // 52 — Dossiê confidencial: as tarjas pretas somem ao toque.
  A.dossie = async (d) => {
    // Abre a tela e a pasta de papel pardo.
    const caixa = K.tela('a-dossie'); const p = K.add(caixa, 'div', 'pasta'); K.add(p, 'h1', '', d.titulo); K.add(p, 'p', 'codigo', d.codigo);
    // Cada linha tem uma parte visível e uma tarja.
    const tarjas = d.linhas.map(([a, b]) => { const l = K.add(p, 'p', 'lin-d', a + ' '); const s = U.el('button', 'tarja', U.fmt(b)); s.type = 'button'; l.appendChild(s); return s; });
    // Dica de toque.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Tira cada tarja.
    await K.todos(tarjas, (s) => { s.classList.add('lida'); K.som(1400, 40, 'square', .03); });
    // Carimbo e fecha.
    dica.remove(); K.add(p, 'div', 'secreto', d.carimbo); K.som(80, 240, 'square', .12); await U.esperar(1500);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 53 — Postais: deslize cada um para o lado para ver o de baixo.
  A.postais = async (d) => {
    // Abre a tela e a pilha.
    const caixa = K.tela('a-postais'); const pilha = K.add(caixa, 'div', 'pilha-p');
    // Cartão de baixo, que fica por último.
    const ult = K.add(pilha, 'div', 'postal ultimo'); K.add(ult, 'p', 'mao-p', d.fecho);
    // Cria os postais, com o primeiro por cima.
    const ps = d.postais.map((x, i) => { const c = K.add(pilha, 'div', 'postal'); c.style.zIndex = d.postais.length - i; c.style.setProperty('--r', ((i % 2 ? 1 : -1) * (1 + i)) + 'deg'); c.style.setProperty('--h', 190 + i * 45); K.add(c, 'b', 'lugar', x.l); K.add(c, 'p', 'mao-p', x.t); K.add(c, 'i', 'selo-p'); return c; });
    // Dica de deslizar.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Tira um postal por vez.
    for (const c of ps) {
      // Acompanha o dedo e joga fora quando passa do limite.
      await K.arrasta(c, { rumo: [240, 0], move: (dx) => { c.style.transition = 'none'; c.style.transform = 'translateX(' + dx + 'px) rotate(' + dx / 18 + 'deg)'; }, solta: (dx) => { c.style.transition = 'transform .4s'; if (Math.abs(dx) > 90) return true; c.style.transform = ''; return false; } });
      // Voa para fora.
      c.style.transform = 'translateX(130vw) rotate(24deg)'; K.som(420, 80, 'triangle', .04); await U.esperar(350);
    }
    // Tira a dica e segue.
    dica.remove(); await U.esperar(900); await K.mais(caixa, d.fim);
  };

  // 54 — Botão vermelho proibido: cada apertada piora a situação.
  A.botao = async (d) => {
    // Abre a tela com faixas de perigo.
    const caixa = K.tela('a-botao'); K.add(caixa, 'p', 'aviso-b', d.aviso);
    // Botão grande.
    const b = U.el('button', 'vermelho', U.esc(d.rotulo)); b.type = 'button'; caixa.appendChild(b);
    // Frase.
    const t = K.add(caixa, 'p', 'texto', d.abre);
    // Cada aperto treme a tela e troca a frase.
    await K.vezes(b, d.frases.length, (i) => { U.palavras(t, d.frases[i - 1], 100); K.som(120 + i * 60, 180, 'sawtooth', .07); caixa.parentElement.classList.remove('treme'); void caixa.offsetWidth; caixa.parentElement.classList.add('treme'); });
    // Deixa ler a última.
    await U.esperar(2500);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 55 — Rádio comunicador: segure para falar, solte e ouça a resposta.
  A.radio = async (d) => {
    // Abre a tela e monta o aparelho.
    const caixa = K.tela('a-radio'); const r = K.add(caixa, 'div', 'walkie'); K.add(r, 'i', 'antena'); const vis = K.add(r, 'div', 'visor-r'); const leds = K.add(r, 'i', 'grade-r');
    // Botão de falar.
    const ptt = U.el('button', 'ptt', U.esc(d.botao)); ptt.type = 'button'; r.appendChild(ptt);
    // Uma fala por vez.
    for (const f of d.falas) {
      // Enquanto segura, o visor mostra a transmissão.
      vis.textContent = d.espera; await K.segura(ptt, 1300, (p) => { leds.style.opacity = .3 + p * .7; if (p > 0) vis.textContent = d.transmitindo; });
      // Chiado de rádio e resposta.
      K.som(1800, 90, 'sawtooth', .03); vis.textContent = ''; await K.fala(vis, f, 120); await U.esperar(1500);
    }
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 56 — Ligação de madrugada: deslize para atender e escute.
  A.ligacao = async (d) => {
    // Abre a tela cheia e monta a tela do celular.
    const caixa = K.tela('a-ligacao cheia'); const c = K.add(caixa, 'div', 'chamada-t'); K.add(c, 'p', 'hora', d.hora); K.add(c, 'i', 'foto-l'); K.add(c, 'h1', '', d.contato); const st = K.add(c, 'p', 'estado', d.estado);
    // Toque de telefone repetido.
    const toca = setInterval(() => { K.som(880, 200); setTimeout(() => K.som(740, 200), 220); }, 1800);
    // Trilho de atender.
    const tr = K.add(c, 'div', 'trilho-l'); K.add(tr, 'span', '', d.dica); const bola = U.el('button', 'atende', '📞'); bola.type = 'button'; bola.setAttribute('aria-label', d.dica); tr.appendChild(bola);
    // Distância do arrasto.
    const max = () => tr.clientWidth - bola.offsetWidth - 10;
    // Atender é arrastar a bola até o fim.
    await K.arrasta(bola, { rumo: [300, 0], move: (dx) => { bola.style.transform = 'translateX(' + Math.max(0, Math.min(max(), dx)) + 'px)'; }, solta: (dx) => { if (dx >= max() * .8) return true; bola.style.transform = ''; return false; } });
    // Para de tocar e começa a chamada.
    clearInterval(toca); tr.remove();
    // Cronômetro da ligação.
    let s = 0; const rel = setInterval(() => { s++; st.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }, 1000);
    // A conversa aparece.
    const t = K.add(c, 'p', 'texto'); await K.frases(t, d.frases); clearInterval(rel);
    // Segue para o final.
    await K.mais(c, d.fim);
  };

  // 57 — Diploma com moldura, selo e assinatura que se desenha.
  A.diploma = async (d) => {
    // Abre a tela e monta o papel com moldura.
    const caixa = K.tela('a-diploma'); const p = K.add(caixa, 'div', 'certificado'); K.add(p, 'p', 'inst', d.instituicao); K.add(p, 'h1', '', d.titulo); K.add(p, 'p', 'corpo-d', d.corpo);
    // Assinatura em traço único, que se desenha sozinha.
    const a = U.el('div', 'assina', '<svg viewBox="0 0 200 50" aria-hidden="true"><path pathLength="1" d="M8 34C20 8 30 8 28 30C26 44 40 12 52 16C62 20 46 42 62 30C78 18 74 40 92 26C108 14 100 40 120 28C140 18 136 38 192 18"/></svg>'); p.appendChild(a); K.add(p, 'p', 'quem-d', d.quem);
    // Espera assinar.
    await K.mais(caixa, d.botao); a.classList.add('traca'); K.som(1200, 700, 'sawtooth', .008); await U.esperar(1500);
    // Selo dourado.
    K.add(p, 'i', 'selo-d'); K.som(660, 200);
    // Deixa ver e segue.
    await U.esperar(1100); await K.mais(caixa, d.fim);
  };

  // 58 — Porta de geladeira: tire os recados e leia o último.
  A.geladeira = async (d) => {
    // Abre a tela cheia com a porta.
    const caixa = K.tela('a-geladeira cheia'); const f = K.add(caixa, 'div', 'porta-g'); K.add(f, 'i', 'puxador');
    // Recado final, por baixo dos outros.
    const fim = K.add(f, 'p', 'recado ultimo', d.fecho);
    // Posições e cores dos recados.
    const POS = [[10, 10, '#ffe45c'], [46, 18, '#9ff0c7'], [14, 40, '#ffb3c7'], [48, 46, '#a9d8ff']];
    // Cria os recados.
    const rs = d.recados.map((t, i) => { const b = U.el('button', 'recado', U.fmt(t)); b.type = 'button'; b.style.left = POS[i][0] + '%'; b.style.top = POS[i][1] + '%'; b.style.background = POS[i][2]; b.style.setProperty('--r', ((i % 2 ? 1 : -1) * 4) + 'deg'); f.appendChild(b); return b; });
    // Dica de toque.
    const dica = K.add(f, 'p', 'dica', d.dica);
    // Tirar um recado mostra a frase dele e o faz cair.
    let n = 0; await K.todos(rs, (b) => { b.classList.add('cai'); dica.hidden = true; n++; K.som(500 + n * 70, 80, 'triangle'); });
    // Mostra o recado de baixo.
    fim.classList.add('ve'); await U.esperar(1400);
    // Segue para o final.
    await K.mais(f, d.fim);
  };

  // 59 — Biscoito da sorte: quebre e puxe o papelzinho.
  A.biscoito = async (d) => {
    // Abre a tela com o biscoito em duas metades.
    const caixa = K.tela('a-biscoito'); const b = U.el('button', 'cookie', '<svg viewBox="0 0 200 130" aria-hidden="true"><path class="m1" d="M100 18C52 18 12 56 16 112C44 92 74 92 100 118Z"/><path class="m2" d="M100 18C148 18 188 56 184 112C156 92 126 92 100 118Z"/></svg>'); b.type = 'button'; b.setAttribute('aria-label', d.dica); caixa.appendChild(b); const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Três toques para quebrar.
    await K.vezes(b, 3, (i) => { b.dataset.rachou = i; K.som(240 + i * 60, 70, 'square', .06); });
    // Abre as metades e tira o papel.
    dica.remove(); b.classList.add('aberto'); await U.esperar(600); const p = K.add(caixa, 'div', 'sorte'); K.add(p, 'p', '', d.sorte); K.add(p, 'small', '', d.numeros);
    // Deixa ler e segue.
    await U.esperar(1600); await K.mais(caixa, d.fim);
  };

  // 60 — Piñata: bata até estourar.
  A.pinata = async (d) => {
    // Abre a tela com a corda e a estrela.
    const caixa = K.tela('a-pinata'); const pi = U.el('button', 'estrela-p', '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 4l13 31 33 3-25 22 8 33-29-18-29 18 8-33L4 38l33-3z"/></svg>'); pi.type = 'button'; pi.setAttribute('aria-label', d.dica); caixa.appendChild(pi);
    // Frase e dica.
    const t = K.add(caixa, 'p', 'texto', d.dica);
    // Cada batida balança a estrela e troca a frase.
    await K.vezes(pi, d.frases.length, (i) => { pi.classList.remove('bate-p'); void pi.offsetWidth; pi.classList.add('bate-p'); U.palavras(t, d.frases[i - 1], 100); K.som(180 + i * 40, 120, 'square', .07); });
    // Estoura a estrela com festa.
    await U.esperar(1900); pi.classList.add('estourou'); const r = pi.getBoundingClientRect(); Fundo.explodirEm(r.left + r.width / 2, r.top + r.height / 2, 70); Fundo.festa(4); K.som(80, 320, 'square', .14); U.vibra([40, 30, 60]);
    // Frase final e segue.
    await K.fala(t, d.fecho); await K.mais(caixa, d.fim);
  };
// Executa.
})(window);
