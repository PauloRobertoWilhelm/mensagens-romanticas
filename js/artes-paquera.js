/* ==========================================================
   artes-paquera.js — uma animação própria para cada link de paquera (ids 1 a 20).
   Os textos ficam em data/mensagens-paquera.js; aqui só há desenho e movimento.
   ========================================================== */

// Isola variáveis.
(function (g) {
  // Modo estrito.
  'use strict';

  // Coleção global de artes (cada arquivo acrescenta as suas).
  const A = g.Artes = g.Artes || {};

  // Traços de uma mulher de cabelo longo, separados em partes para o retrato poder desenhar uma de cada vez.
  const ROSTO = '<svg viewBox="0 0 200 240" aria-hidden="true">'
    + '<g data-p="rosto"><path pathLength="1" d="M62 92C62 140 80 172 100 174C120 172 138 140 138 92"/><path pathLength="1" d="M88 176V204Q60 210 48 236"/><path pathLength="1" d="M112 176V204Q140 210 152 236"/></g>'
    + '<g data-p="cabelo"><path pathLength="1" d="M100 22C52 22 34 62 38 112C41 150 28 190 16 232"/><path pathLength="1" d="M100 22C148 22 166 62 162 112C159 150 172 190 184 232"/><path pathLength="1" d="M62 92C76 60 112 48 138 92"/><path pathLength="1" d="M100 22C74 34 56 62 52 112C50 150 44 196 36 236"/><path pathLength="1" d="M100 22C126 34 144 62 148 112C150 150 156 196 164 236"/></g>'
    + '<g data-p="olhos"><path pathLength="1" d="M74 104Q83 97 92 104"/><path pathLength="1" d="M108 104Q117 97 126 104"/><path pathLength="1" d="M72 93Q83 87 94 92"/><path pathLength="1" d="M106 92Q117 87 128 93"/><path pathLength="1" d="M100 110Q96 126 103 130"/></g>'
    + '<g data-p="sorriso"><path pathLength="1" d="M80 142Q100 162 120 142"/><path pathLength="1" d="M85 146Q100 154 115 146"/></g></svg>';

  // Raios do sol, usados na previsão e no tarô.
  const RAIOS = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => '<rect x="47" y="5" width="6" height="16" rx="3" transform="rotate(' + a + ' 50 50)"/>').join('');

  // Ícones da previsão do tempo.
  const TEMPO = {
    // Sol com raios girando.
    sol: '<svg viewBox="0 0 100 100"><g class="gira">' + RAIOS + '</g><circle cx="50" cy="50" r="22"/></svg>',
    // Três sopros de vento.
    vento: '<svg viewBox="0 0 100 100"><path class="sopra" d="M8 38H62a12 12 0 1 0-12-12"/><path class="sopra" d="M8 56H80a11 11 0 1 1-11 11"/><path class="sopra" d="M8 74H44"/></svg>',
    // Nuvem com raio piscando.
    raio: '<svg viewBox="0 0 100 100"><path d="M28 62a16 16 0 0 1 2-32a22 22 0 0 1 42 6a13 13 0 0 1-2 26z"/><path class="pisca" d="M52 56L40 78H52L46 96L66 68H54L62 56z"/></svg>',
    // Arco-íris de três cores.
    arco: '<svg viewBox="0 0 100 100"><path class="a1" d="M10 80a40 40 0 0 1 80 0"/><path class="a2" d="M22 80a28 28 0 0 1 56 0"/><path class="a3" d="M34 80a16 16 0 0 1 32 0"/></svg>'
  };

  // Emblemas das cartas do tarô.
  const ARCANO = {
    // Carta do Sol.
    sol: '<svg viewBox="0 0 100 100">' + RAIOS + '<circle cx="50" cy="50" r="20"/></svg>',
    // Carta da Lua.
    lua: '<svg viewBox="0 0 100 100"><path d="M64 12a40 40 0 1 0 0 76a32 32 0 1 1 0-76z"/></svg>',
    // Carta da Estrela.
    estrela: '<svg viewBox="0 0 100 100"><path d="M50 6l12 30 32 2-25 20 8 32-27-18-27 18 8-32L6 38l32-2z"/></svg>'
  };

  // Quadros do museu: um desenho para cada obra.
  const OBRAS = {
    // Nove curvas sobrepostas, do vinho ao dourado, formam um sorriso abstrato.
    sorriso: '<svg viewBox="0 0 200 240">' + Array.from({ length: 9 }, (_, i) => '<path class="ouro" stroke="hsl(' + (340 + i * 9) + ' 85% ' + (46 + i * 4) + '%)" d="M' + (22 + i * 5) + ' ' + (72 + i * 11) + 'Q100 ' + (236 - i * 8) + ' ' + (178 - i * 5) + ' ' + (72 + i * 11) + '"/>').join('') + '</svg>',
    // Dezoito fios ondulados, gerados em laço, formam a obra do cabelo.
    cabelo: '<svg viewBox="0 0 200 240">' + Array.from({ length: 18 }, (_, i) => '<path class="fio" style="animation-delay:' + (-i * .2) + 's" d="M' + (6 + i * 11) + ' 0C' + (i * 11 - 26) + ' 70 ' + (i * 11 + 44) + ' 150 ' + (6 + i * 11) + ' 240"/>').join('') + '</svg>',
    // Pontos ligados, como ideias acendendo.
    mente: '<svg viewBox="0 0 200 240"><path d="M40 60L100 36L160 74L132 140L60 128L40 60M100 36L60 128M160 74L60 128M132 140L100 204L60 128"/>' + [[40, 60], [100, 36], [160, 74], [132, 140], [60, 128], [100, 204]].map((p, i) => '<circle class="ideia" style="animation-delay:' + i * .3 + 's" cx="' + p[0] + '" cy="' + p[1] + '" r="7"/>').join('') + '</svg>'
  };

  // Três caminhos diferentes no mapa do GPS; todos terminam no mesmo pino.
  const ROTAS = ['M40 350H120V250H60V140H180V70', 'M40 350V270H230V180H120V100H180V70', 'M40 350H250V210H150V130H180V70'];

  // Cobertura dourada da raspadinha, com cifrões espalhados.
  const cobreOuro = (c, w, h) => {
    // Degradê dourado de canto a canto.
    const gr = c.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#f6d365'); gr.addColorStop(.5, '#caa03a'); gr.addColorStop(1, '#f3df9a');
    // Pinta a área inteira.
    c.fillStyle = gr; c.fillRect(0, 0, w, h);
    // Escreve cifrões por cima para parecer bilhete de verdade.
    c.fillStyle = 'rgba(90,60,0,.35)'; c.font = '700 20px serif'; for (let x = 8; x < w; x += 34) for (let y = 22; y < h; y += 26) c.fillText('$', x, y);
  };

  // Vapor do espelho: camada clara com manchas, como vidro de banheiro depois do banho.
  const embaca = (c, w, h) => {
    // Base esbranquiçada.
    c.fillStyle = '#dfe9ee'; c.fillRect(0, 0, w, h);
    // Manchas redondas para o vapor não ficar chapado.
    for (let i = 0; i < 90; i++) { c.fillStyle = 'rgba(255,255,255,' + U.rand(.08, .3) + ')'; c.beginPath(); c.arc(U.rand(0, w), U.rand(0, h), U.rand(8, 34), 0, 6.3); c.fill(); }
  };

  // Gira um rolo do caça-níquel até parar em 'alvo'.
  const girar = async (rolo, alvo, simbolos, i) => {
    // Volta o rolo ao topo, sem animação.
    rolo.style.transition = 'none'; rolo.style.transform = 'translateY(0)';
    // Preenche com 18 símbolos sorteados e o alvo no fim.
    rolo.innerHTML = Array.from({ length: 18 }, () => U.sorteia(simbolos)).concat([alvo]).map((s) => '<b>' + U.esc(s) + '</b>').join('');
    // Força o navegador a aplicar a posição inicial antes de animar.
    void rolo.offsetHeight;
    // Cada rolo para um pouco depois do anterior.
    rolo.style.transition = 'transform ' + (1.3 + i * .45) + 's cubic-bezier(.15,.7,.2,1)';
    // Desce até o último símbolo (cada um tem 64px de altura).
    rolo.style.transform = 'translateY(-' + (18 * 64) + 'px)';
    // Espera parar e faz o estalo da trava.
    await U.esperar(1380 + i * 450); K.som(280 + i * 110, 90, 'square', .05);
  };

  // 1 — Cartaz de procurada: cada toque lê uma acusação, e o carimbo fecha o caso.
  A.procurada = async (d) => {
    // Abre a tela e pendura o cartaz.
    const caixa = K.tela('a-procurada'); const c = K.add(caixa, 'div', 'cartaz');
    // Título, retrato e descrição da suspeita.
    K.add(c, 'h1', '', d.titulo); c.appendChild(U.el('div', 'foto', ROSTO)); K.add(c, 'p', 'sub2', d.sub);
    // Lista das acusações, que começa vazia.
    const ol = K.add(c, 'ol', 'crimes');
    // Um toque para cada acusação.
    for (const crime of d.crimes) { await K.mais(caixa, d.botao); K.add(ol, 'li', 'entra', crime); K.som(140, 90, 'triangle'); }
    // Último toque: a sentença.
    await K.mais(caixa, d.sentenca);
    // O carimbo desce com força e treme o celular.
    K.add(c, 'div', 'carimbo', d.carimbo); K.som(70, 260, 'square', .14); U.vibra(70);
    // Recompensa aparece e deixa ler.
    K.add(c, 'p', 'premio entra', d.premio); await U.esperar(1300);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 2 — Radar de velocidade mede a beleza e emite uma multa em talão amarelo.
  A.multa = async (d) => {
    // Abre a tela com o aviso do radar.
    const caixa = K.tela('a-multa'); K.add(caixa, 'p', 'aviso', d.aviso);
    // Monta o medidor em arco, com agulha e número.
    const r = U.el('div', 'radar', '<svg viewBox="0 0 200 120" aria-hidden="true"><path class="arco" d="M15 110A85 85 0 0 1 185 110"/><path class="fundo-a" d="M15 110A85 85 0 0 1 185 110"/><line class="agulha" x1="100" y1="110" x2="100" y2="34"/></svg><b>0</b><i>km/h</i>'); caixa.appendChild(r);
    // Espera o toque que dispara a medição.
    await K.mais(caixa, d.medir);
    // Liga a agulha e sobe o número.
    r.classList.add('mede'); await U.contar(d.kmh, 2200, (v) => { U.$('b', r).textContent = v; });
    // Apito do radar e vibração.
    K.som(880, 260, 'square', .06); U.vibra([30, 40, 30]);
    // Espera o toque que emite a multa e tira o radar da tela.
    await K.mais(caixa, d.botao); r.remove();
    // O talão amarelo sobe.
    const t = K.add(caixa, 'div', 'talao'); K.add(t, 'h2', '', d.titulo);
    // Os campos são preenchidos um a um, como impressão.
    for (const [rot, val] of d.campos) { K.par(t, 'campo entra', rot, val); K.som(1400, 30, 'square', .02); await U.esperar(800); }
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 3 — Caixa de remédio que abre e solta a bula em dobras.
  A.bula = async (d) => {
    // Abre a tela e monta a caixa do remédio.
    const caixa = K.tela('a-bula'); const cx = K.add(caixa, 'div', 'remedio');
    // Nome, dose e tarja da caixa.
    K.add(cx, 'b', '', d.nome); K.add(cx, 'span', '', d.dose); K.add(cx, 'i', '', d.tarja);
    // Dica de toque embaixo da caixa.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera o toque e encolhe a caixa.
    await K.toque(cx); dica.remove(); cx.classList.add('aberto');
    // Papel da bula com uma dobra para cada seção.
    const papel = K.add(caixa, 'div', 'papel');
    // Cada dobra é um botão que abre o texto dela.
    const dobras = d.secoes.map(([ti, tx]) => { const s = U.el('button', 'dobra', '<b>' + U.esc(ti) + '</b><span>' + U.fmt(tx) + '</span>'); s.type = 'button'; papel.appendChild(s); return s; });
    // Espera abrirem todas as dobras.
    await K.todos(dobras, (el) => { el.classList.add('aberta'); K.som(500, 60, 'triangle', .03); });
    // Deixa ler e segue.
    await U.esperar(1400); await K.mais(caixa, d.fim);
  };

  // 4 — Jornal do tempo na TV: cada região do corpo dela tem sua própria previsão.
  A.previsao = async (d) => {
    // Abre a tela e monta a TV com canal, ícone e textos.
    const caixa = K.tela('a-previsao'); const tv = K.add(caixa, 'div', 'tv'); K.add(tv, 'p', 'canal', d.canal);
    // Lugares do ícone, da região, dos graus e do boletim.
    const ico = K.add(tv, 'div', 'ico'); const nome = K.add(tv, 'h2', 'regiao'); const graus = K.add(tv, 'b', 'graus', '0°'); const t = K.add(tv, 'p', 'boletim');
    // Faixa de notícias correndo no pé da TV.
    tv.appendChild(U.el('div', 'ticker', '<span>' + U.esc(d.ticker) + '</span>'));
    // Mostra cada região em sequência.
    for (let i = 0; i < d.regioes.length; i++) {
      // Dados da região atual.
      const r = d.regioes[i];
      // Troca o ícone e o nome.
      ico.innerHTML = TEMPO[r.icone]; ico.className = 'ico ' + r.icone; nome.textContent = r.nome;
      // Sobe os graus enquanto o boletim aparece.
      U.contar(r.graus, 900, (v) => { graus.textContent = v + '°'; }); await K.fala(t, r.t);
      // Toque para a próxima região, ou para terminar na última.
      await K.mais(caixa, i < d.regioes.length - 1 ? d.botao : d.fim);
    }
  };

  // 5 — Caça-níquel: três puxadas de alavanca até dar três iguais.
  A.jackpot = async (d) => {
    // Abre a tela, escreve o letreiro e monta a máquina.
    const caixa = K.tela('a-jackpot'); K.add(caixa, 'h1', 'letreiro', d.titulo); const m = K.add(caixa, 'div', 'maquina');
    // Três janelas, cada uma com seu rolo.
    const rolos = [0, 1, 2].map(() => K.add(K.add(m, 'div', 'janela'), 'div', 'rolo', d.inicio));
    // Alavanca lateral.
    const al = U.el('button', 'alavanca', '<i></i>'); al.type = 'button'; al.setAttribute('aria-label', d.puxe); m.appendChild(al);
    // Lugar da frase e dica de toque.
    const fr = K.add(caixa, 'p', 'texto'); const dica = K.add(caixa, 'p', 'dica', d.puxe);
    // Uma rodada para cada giro combinado.
    for (const giro of d.giros) {
      // Espera puxar a alavanca e anima a descida dela.
      await K.toque(al); dica.hidden = true; al.classList.add('puxada'); setTimeout(() => al.classList.remove('puxada'), 500); fr.innerHTML = ''; K.som(160, 200, 'sawtooth', .04);
      // Gira os três rolos ao mesmo tempo.
      await Promise.all(rolos.map((r, i) => girar(r, giro.r[i], d.simbolos, i)));
      // Mostra a frase da rodada e reabre a dica.
      await K.fala(fr, giro.f); dica.hidden = false;
    }
    // Prêmio máximo: tira a dica, acende a máquina e solta a festa.
    dica.remove(); m.classList.add('premio'); Fundo.festa(6);
    // Sobe uma escadinha de notas de vitória.
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => K.som(f, 180, 'square', .05), i * 130));
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 6 — Bilhete de raspadinha com três prêmios escondidos.
  A.raspadinha = async (d) => {
    // Abre a tela e monta o bilhete.
    const caixa = K.tela('a-raspadinha'); const b = K.add(caixa, 'div', 'bilhete'); K.add(b, 'h1', '', d.titulo); K.add(b, 'p', 'sub2', d.sub);
    // Cada prêmio fica debaixo do seu próprio canvas.
    const telas = d.premios.map((p) => { const c = K.add(b, 'div', 'cel', p); const cv = U.el('canvas'); c.appendChild(cv); return cv; });
    // Espera rasparem as três.
    await Promise.all(telas.map((cv) => K.raspa(cv, .5, cobreOuro).then(() => K.som(740, 140, 'triangle'))));
    // Comemora o bilhete premiado.
    Fundo.festa(4); const t = K.add(caixa, 'p', 'texto'); await K.fala(t, d.ganhou);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 7 — Quarto escuro: o dedo é a lanterna e os elogios estão escondidos nas paredes.
  A.lanterna = async (d) => {
    // Abre a tela cheia e a sala.
    const caixa = K.tela('a-lanterna cheia'); const sala = K.add(caixa, 'div', 'sala');
    // Lugares de cada elogio, em porcentagem da tela.
    const POS = [[30, 17], [70, 32], [30, 50], [68, 67]];
    // Cria os elogios como botões nas posições.
    const achados = d.achados.map((t, i) => { const b = U.el('button', 'achado', U.fmt(t)); b.type = 'button'; b.style.left = POS[i][0] + '%'; b.style.top = POS[i][1] + '%'; sala.appendChild(b); return b; });
    // Escuridão por cima de tudo, contador e dica.
    K.add(sala, 'div', 'escuro'); const conta = K.add(sala, 'p', 'conta', '0/' + achados.length); const dica = K.add(sala, 'p', 'dica', d.dica);
    // Move o círculo de luz.
    const luz = (x, y) => { sala.style.setProperty('--x', x + 'px'); sala.style.setProperty('--y', y + 'px'); };
    // A luz começa no meio da tela.
    luz(window.innerWidth / 2, window.innerHeight / 2);
    // Ao mover o dedo: acompanha e encontra o elogio que estiver perto.
    const mover = (e) => { luz(e.clientX, e.clientY); achados.forEach((b) => { const r = b.getBoundingClientRect(); if (b.dataset.acao && Math.hypot(e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2) < 70) b.click(); }); };
    // Liga o movimento do dedo ou do mouse.
    sala.addEventListener('pointermove', mover); sala.addEventListener('pointerdown', mover);
    // Conta os encontrados.
    let n = 0;
    // Espera acharem todos; cada um fica aceso.
    await K.todos(achados, (el) => { el.classList.add('visto'); n++; conta.textContent = n + '/' + achados.length; dica.hidden = true; K.som(520 + n * 90, 160); });
    // Acende a luz da sala, com um respiro antes.
    await U.esperar(800); sala.classList.add('acesa');
    // Caixa do fim, por cima da sala.
    const fim = K.add(sala, 'div', 'fim'); const t = K.add(fim, 'p', 'texto'); await K.fala(t, d.fecho);
    // Segue para o final.
    await K.mais(fim, d.fim);
  };

  // 8 — Conversa em que alguém escreve, apaga e reescreve antes de ter coragem de mandar.
  A.digitando = async (d) => {
    // Abre a tela cheia com o aplicativo de conversa.
    const caixa = K.tela('a-digitando cheia'); const app = K.add(caixa, 'div', 'app');
    // Topo com foto, nome e estado.
    const topo = K.add(app, 'header', 'topo'); K.add(topo, 'i', 'avatar'); const info = K.add(topo, 'div', 'info'); K.add(info, 'b', '', d.contato); const st = K.add(info, 'span', '', d.online);
    // Área dos balões e barra de escrever.
    const lista = K.add(app, 'div', 'lista'); const barra = K.add(app, 'div', 'barra'); const campo = K.add(barra, 'p', 'campo'); K.add(barra, 'i', 'enviar', '➤');
    // Notificação que abre a conversa.
    const av = K.add(app, 'button', 'notif', d.aviso); av.type = 'button';
    // Espera o toque e some com a notificação.
    await K.toque(av); av.remove();
    // Segue o roteiro de digitação.
    for (const p of d.roteiro) {
      // Mostra "digitando" e escreve letra por letra.
      st.textContent = d.digitando; await K.digita(campo, p.t, 42); await U.esperar(p.apagar ? 750 : 350);
      // Se for apagar, tira letra por letra e pensa um pouco.
      if (p.apagar) { while (campo.textContent) { campo.textContent = campo.textContent.slice(0, -1); await U.esperar(16); } st.textContent = d.online; await U.esperar(800); continue; }
      // Se for enviar, vira balão, limpa o campo e faz o som de enviado.
      const bal = K.add(lista, 'p', 'balao entra'); bal.textContent = p.t; campo.textContent = ''; lista.scrollTop = 1e5; K.som(660, 90); st.textContent = d.online; await U.esperar(700);
    }
    // Botão de seguir no fim da conversa.
    const b = K.botao(lista, d.fim); lista.scrollTop = 1e5; await K.toque(b);
  };

  // 9 — Jornal que chega girando: cada edição extra traz uma manchete sobre ela.
  A.jornal = async (d) => {
    // Abre a tela e monta a primeira página.
    const caixa = K.tela('a-jornal'); const f = K.add(caixa, 'article', 'folha'); K.add(f, 'p', 'nome', d.nome); K.add(f, 'p', 'data', d.data);
    // Manchete, linha fina, foto e coluna de texto.
    const h = K.add(f, 'h1'); const s = K.add(f, 'p', 'linha'); const corpo = K.add(f, 'div', 'corpo'); corpo.appendChild(U.el('div', 'foto', ROSTO)); const t = K.add(corpo, 'p');
    // Mostra cada edição.
    for (let i = 0; i < d.edicoes.length; i++) {
      // Dados da edição atual.
      const e = d.edicoes[i];
      // Troca os textos da página.
      h.innerHTML = U.fmt(e.m); s.innerHTML = U.fmt(e.s); t.innerHTML = U.fmt(e.t);
      // Reinicia a animação de giro.
      f.classList.remove('roda'); void f.offsetWidth; f.classList.add('roda');
      // Som de papel e tempo do giro.
      K.som(200, 160, 'sawtooth', .03); await U.esperar(1500);
      // Toque para a próxima edição, ou para terminar.
      await K.mais(caixa, i < d.edicoes.length - 1 ? d.botao : d.fim);
    }
  };

  // 10 — Galeria escura com três quadros: as obras são partes dela.
  A.museu = async (d) => {
    // Abre a tela cheia, a parede e o trilho que desliza.
    const caixa = K.tela('a-museu cheia'); const sala = K.add(caixa, 'div', 'galeria'); const trilho = K.add(sala, 'div', 'trilho');
    // Pendura cada obra com moldura e plaquinha.
    d.obras.forEach((o) => { const q = K.add(trilho, 'figure', 'obra'); q.appendChild(U.el('div', 'moldura', OBRAS[o.arte])); const p = K.add(q, 'figcaption', 'placa'); K.add(p, 'b', '', o.titulo); K.add(p, 'span', '', o.ficha); });
    // Caminha pela galeria, uma obra por vez.
    for (let i = 0; i < d.obras.length; i++) { trilho.style.transform = 'translateX(-' + (i * 100) + 'vw)'; await U.esperar(1200); await K.mais(sala, i < d.obras.length - 1 ? d.botao : d.fim); }
  };

  // 11 — Dicionário com páginas que viram: ela redefine cada palavra.
  A.dicionario = async (d) => {
    // Abre a tela, o título e o livro.
    const caixa = K.tela('a-dicionario'); K.add(caixa, 'p', 'capa', d.titulo); const livro = K.add(caixa, 'div', 'livro');
    // Última página, escondida embaixo das outras.
    K.add(livro, 'div', 'ultima', d.fecho);
    // Cria as páginas, com a primeira por cima.
    const pags = d.verbetes.map((v, i) => { const p = K.add(livro, 'div', 'pag'); p.style.zIndex = d.verbetes.length - i; K.add(p, 'h2', '', v.t); K.add(p, 'i', '', v.c); K.add(p, 'p', 'def', v.d); K.add(p, 'p', 'ex', v.e); return p; });
    // Dica de virar a página.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Vira uma página a cada toque.
    for (const p of pags) { await K.toque(p); p.classList.add('virada'); K.som(320, 70, 'triangle', .03); await U.esperar(700); }
    // Tira a dica, deixa ler o fecho e segue.
    dica.remove(); await U.esperar(1200); await K.mais(caixa, d.fim);
  };

  // 12 — GPS que recalcula sem parar: toda rota termina nela.
  A.gps = async (d) => {
    // Abre a tela cheia com o mapa.
    const caixa = K.tela('a-gps cheia'); const mapa = K.add(caixa, 'div', 'mapa');
    // Desenha ruas, rio, parque, rota e pino.
    mapa.appendChild(U.el('div', 'chao', '<svg viewBox="0 0 300 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path class="rio" d="M-10 200C70 170 110 260 310 190"/><rect class="parque" x="196" y="262" width="80" height="62" rx="8"/><path class="rua" d="M0 70H300M0 140H300M0 250H300M0 350H300M40 0V420M120 0V420M180 0V420M250 0V420"/><path class="rota" pathLength="1"/><g class="pino" transform="translate(180 70)"><circle r="17"/><path d="M0 8l-6.200-6.200a4.400 4.400 0 0 1 6.200-6.200a4.400 4.400 0 0 1 6.200 6.200z"/></g></svg>'));
    // Faixa da voz do GPS e pega o caminho da rota.
    const fala = K.add(mapa, 'p', 'fala'); const rota = U.$('.rota', mapa);
    // Desenha cada rota.
    for (let i = 0; i < d.rotas.length; i++) {
      // Coloca o caminho novo, ainda invisível.
      rota.style.transition = 'none'; rota.style.strokeDashoffset = 1; rota.setAttribute('d', ROTAS[i]); void rota.getBoundingClientRect();
      // Liga o traço, que se desenha sozinho.
      rota.style.transition = 'stroke-dashoffset 2s ease-in-out'; rota.style.strokeDashoffset = 0;
      // A voz fala enquanto a rota anda.
      await K.fala(fala, d.rotas[i], 150); await U.esperar(900);
      // Toque para recalcular (menos na última).
      if (i < d.rotas.length - 1) await K.mais(mapa, d.botao);
    }
    // Chegou: o pino pulsa e a voz anuncia.
    mapa.classList.add('chegou'); K.som(784, 200); await K.fala(fala, d.chegada, 150);
    // Segue para o final.
    await K.mais(mapa, d.fim);
  };

  // 13 — Alarme de incêndio: quanto mais ela tenta apagar, mais o fogo sobe.
  A.incendio = async (d) => {
    // Abre a tela cheia; 'forca' controla o tamanho do fogo e 'ps' guarda as chamas.
    const caixa = K.tela('a-incendio cheia'); let forca = .3; const ps = [];
    // Desenha as chamas a cada quadro.
    K.pinta(caixa, (cx, w, h) => {
      // Limpa o quadro e soma as cores, para o fogo ficar luminoso.
      cx.clearRect(0, 0, w, h); cx.globalCompositeOperation = 'lighter';
      // Cria chamas novas no chão, mais ou menos conforme a força.
      for (let i = 0; i < forca * 7 && ps.length < 170; i++) ps.push({ x: U.rand(0, w), y: h + 20, r: U.rand(16, 40) * (.8 + forca), v: U.rand(1.8, 4.2) * (.7 + forca), a: U.rand(.5, .9) });
      // Atualiza e desenha cada chama, da última para a primeira.
      for (let i = ps.length - 1; i >= 0; i--) {
        // Sobe, oscila e apaga aos poucos.
        const p = ps[i]; p.y -= p.v; p.x += U.rand(-1.2, 1.2); p.a -= .0075 / (.4 + forca); p.r *= .992;
        // Chama apagada sai da lista.
        if (p.a <= 0) { ps.splice(i, 1); continue; }
        // Quanto mais alto, mais vermelha.
        cx.fillStyle = 'rgba(255,' + Math.round(70 + 150 * p.a) + ',' + Math.round(30 * p.a) + ',' + (p.a * .3) + ')';
        // Desenha a bolinha de fogo.
        cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.3); cx.fill();
      }
    });
    // Painel por cima do fogo: alerta, medidor e frase.
    const pn = K.add(caixa, 'div', 'painel'); K.add(pn, 'h1', '', d.alerta); const temp = K.add(pn, 'b', 'temp', d.temp0); const fr = K.add(pn, 'p', 'texto', d.abre);
    // Botão do extintor.
    const b = K.botao(pn, d.botao);
    // Cada toque piora tudo: fogo sobe, temperatura sobe, frase troca.
    await K.vezes(b, d.frases.length, (i) => { forca += .3; temp.textContent = d.temps[i - 1]; U.palavras(fr, d.frases[i - 1], 110); K.som(120 + i * 40, 220, 'sawtooth', .05); });
    // Tira o extintor, deixa ler e mostra o veredito.
    b.remove(); await U.esperar(2600); await K.fala(fr, d.fecho);
    // Segue para o final.
    await K.mais(pn, d.fim);
  };

  // 14 — Leitura de tarô: três cartas viradas uma de cada vez.
  A.tarot = async (d) => {
    // Abre a tela, o título e a mesa.
    const caixa = K.tela('a-tarot'); K.add(caixa, 'p', 'chamada', d.titulo); const mesa = K.add(caixa, 'div', 'mesa');
    // Cria as cartas com costas ornamentadas e face.
    const cartas = d.cartas.map((c, i) => { const b = U.el('button', 'carta', '<div class="in"><div class="costas"></div><div class="face">' + ARCANO[c.ic] + '<b>' + U.esc(c.nome) + '</b></div></div>'); b.type = 'button'; b.style.animationDelay = (i * .2) + 's'; mesa.appendChild(b); return b; });
    // Lugar da leitura.
    const t = K.add(caixa, 'p', 'texto');
    // Vira uma carta de cada vez, sempre a próxima da fila.
    for (let i = 0; i < cartas.length; i++) { cartas[i].classList.add('vez'); await K.toque(cartas[i]); cartas[i].classList.remove('vez'); cartas[i].classList.add('virada'); K.som(330 + i * 110, 300); await U.esperar(650); await K.fala(t, d.cartas[i].t); await U.esperar(900); }
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 15 — Elevador de luxo: as portas abrem em andares cada vez melhores.
  A.elevador = async (d) => {
    // Abre a tela, com o visor e a cabine de portas fechadas.
    const caixa = K.tela('a-elevador'); const vis = K.add(caixa, 'div', 'visor', '▲ T'); const cab = K.add(caixa, 'div', 'cabine'); const t = K.add(cab, 'p', 'andar');
    // Duas portas de metal.
    K.add(cab, 'i', 'porta esq'); K.add(cab, 'i', 'porta dir');
    // Sobe por cada andar.
    for (let i = 0; i < d.andares.length; i++) {
      // Dados do andar atual.
      const a = d.andares[i];
      // Toque para subir.
      await K.mais(caixa, i ? d.botao : d.comeca);
      // Fecha as portas e espera.
      cab.classList.remove('aberta'); await U.esperar(800);
      // Troca o texto enquanto as portas estão fechadas.
      t.innerHTML = U.fmt(a.t);
      // Conta os andares; se for texto (cobertura), só espera e mostra.
      if (typeof a.n === 'number') await U.contar(a.n, 1300, (v) => { vis.textContent = '▲ ' + v; }); else { await U.esperar(1300); vis.textContent = '▲ ' + a.n; }
      // Campainha e portas abrindo.
      K.som(880, 320); cab.classList.add('aberta'); await U.esperar(1500 + a.t.length * 22);
    }
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 16 — Lousa de bistrô: ela escolhe um prato e o garçom responde.
  A.cardapio = async (d) => {
    // Abre a tela e monta a lousa de giz.
    const caixa = K.tela('a-cardapio'); const lousa = K.add(caixa, 'div', 'lousa'); K.add(lousa, 'h1', '', d.titulo); K.add(lousa, 'p', 'sub2', d.sub);
    // Cada prato é um botão com nome, pontilhado, preço e descrição.
    const itens = d.pratos.map((p) => { const b = U.el('button', 'prato', '<b>' + U.esc(p.nome) + '</b><i></i><em>' + U.esc(p.preco) + '</em><span>' + U.fmt(p.desc) + '</span>'); b.type = 'button'; lousa.appendChild(b); return b; });
    // Espera a escolha.
    const i = await K.qual(itens);
    // Destaca o pedido e apaga os outros.
    itens.forEach((b, j) => b.classList.add(j === i ? 'pedido' : 'fora')); K.som(660, 120);
    // Garçom responde.
    const t = K.add(lousa, 'p', 'garcom'); await K.fala(t, d.pratos[i].resposta); await U.esperar(800);
    // A conta chega e segue para o final.
    K.add(lousa, 'p', 'conta entra', d.conta); await K.mais(caixa, d.fim);
  };

  // 17 — Vitrola: coloca a agulha no disco e as faixas falam dela.
  A.vinil = async (d) => {
    // Abre a tela e monta a vitrola com disco e selo.
    const caixa = K.tela('a-vinil'); const vit = K.add(caixa, 'div', 'vitrola'); K.add(K.add(vit, 'div', 'disco'), 'b', 'selo', d.selo);
    // O braço da agulha é o botão.
    const braco = U.el('button', 'braco'); braco.type = 'button'; braco.setAttribute('aria-label', d.dica); vit.appendChild(braco);
    // Nome da faixa, verso e dica.
    const nome = K.add(caixa, 'p', 'faixa'); const v = K.add(caixa, 'p', 'texto'); const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera o toque e começa a girar.
    await K.toque(vit); dica.remove(); vit.classList.add('toca'); K.som(90, 160, 'triangle');
    // Toca cada faixa.
    for (let i = 0; i < d.faixas.length; i++) { nome.textContent = d.faixas[i].n; await K.fala(v, d.faixas[i].v); await K.mais(caixa, i < d.faixas.length - 1 ? d.botao : d.fim); }
  };

  // 18 — Espelho embaçado: limpa com o dedo e descobre o que ele responde.
  A.espelho = async (d) => {
    // Abre a tela com a pergunta e a moldura oval.
    const caixa = K.tela('a-espelho'); K.add(caixa, 'p', 'chamada', d.pergunta); const m = K.add(caixa, 'div', 'moldura');
    // Reflexo escondido e canvas do vapor.
    K.add(m, 'p', 'reflexo', d.reflexo); const cv = U.el('canvas'); m.appendChild(cv);
    // Dica de limpar.
    const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Espera limpar o vidro.
    await K.raspa(cv, .45, embaca); dica.remove(); K.som(988, 300); m.classList.add('limpo');
    // O espelho continua falando.
    const l = K.add(caixa, 'p', 'texto'); await K.frases(l, d.linhas);
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };

  // 19 — Bússola: gire como quiser, a agulha sempre volta para ela.
  A.bussola = async (d) => {
    // Abre a tela e escreve o nome do norte novo.
    const caixa = K.tela('a-bussola'); K.add(caixa, 'p', 'norte', d.norte);
    // Marcas do anel, geradas em laço.
    const marcas = Array.from({ length: 36 }, (_, i) => '<rect x="99" y="10" width="2" height="' + (i % 9 ? 7 : 14) + '" transform="rotate(' + i * 10 + ' 100 100)"/>').join('');
    // Monta o anel que gira e a agulha.
    const b = U.el('div', 'compasso', '<svg viewBox="0 0 200 200" aria-hidden="true"><circle class="caixa-b" cx="100" cy="100" r="96"/><g class="anel">' + marcas + '<text x="100" y="42">N</text><text x="162" y="106">L</text><text x="100" y="170">S</text><text x="38" y="106">O</text></g><g class="ag"><path class="ponta" d="M100 26L112 100H88z"/><path class="cauda" d="M100 174L112 100H88z"/><circle cx="100" cy="100" r="7"/></g></svg>'); caixa.appendChild(b);
    // Pega as partes móveis e os lugares de texto.
    const anel = U.$('.anel', b), ag = U.$('.ag', b); const t = K.add(caixa, 'p', 'texto'); const dica = K.add(caixa, 'p', 'dica', d.dica);
    // Ângulo acumulado do anel.
    let giro = 0;
    // Uma rodada para cada frase.
    for (const f of d.frases) {
      // Arrastar gira o anel e tira a agulha do lugar; precisa de um gesto de verdade.
      await K.arrasta(b, { rumo: [140, 0], move: (dx) => { ag.style.transition = 'none'; anel.style.transform = 'rotate(' + (giro + dx) + 'deg)'; ag.style.transform = 'rotate(' + (-dx * .5) + 'deg)'; }, solta: (dx) => { giro += dx; ag.style.transition = 'transform 1.2s cubic-bezier(.3,1.8,.5,1)'; ag.style.transform = 'rotate(0)'; return Math.abs(dx) > 40; } });
      // Mostra a frase da rodada.
      dica.hidden = true; K.som(440, 120); await K.fala(t, f); dica.hidden = false;
    }
    // Tira a dica e segue para o final.
    dica.remove(); await K.mais(caixa, d.fim);
  };

  // 20 — Retrato falado: cada toque desenha uma parte dela no papel.
  A.retrato = async (d) => {
    // Abre a tela, o título e a folha com o desenho ainda invisível.
    const caixa = K.tela('a-retrato'); K.add(caixa, 'p', 'chamada', d.titulo); const p = U.el('div', 'prancheta', ROSTO); caixa.appendChild(p);
    // Lugar da legenda.
    const t = K.add(caixa, 'p', 'texto');
    // Desenha cada parte.
    for (const e of d.etapas) { await K.mais(caixa, e.botao); U.$('[data-p="' + e.parte + '"]', p).classList.add('traca'); K.som(1200, 200, 'sawtooth', .01); await U.esperar(1100); await K.fala(t, e.t); }
    // Segue para o final.
    await K.mais(caixa, d.fim);
  };
// Executa.
})(window);
