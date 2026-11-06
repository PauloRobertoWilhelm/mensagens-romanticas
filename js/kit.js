/* ==========================================================
   kit.js — peças que todas as artes usam: telas, toques, arrastos,
   raspadinha, canvas e sons curtos. Cada interação marca o elemento
   com data-acao, e é isso que o teste automático usa para jogar.
   ========================================================== */

// Isola variáveis.
(function (g) {
  // Modo estrito.
  'use strict';

  // Objeto público.
  const K = {};

  // Cria um elemento com texto tratado por U.fmt e já coloca dentro de 'pai'.
  K.add = (pai, tag, classe, texto) => { const e = U.el(tag, classe, texto == null ? null : U.fmt(texto)); pai.appendChild(e); return e; };

  // Cria uma linha "rótulo + valor", usada em documentos, fichas e talões.
  K.par = (pai, classe, rotulo, valor) => { const e = U.el('p', classe, '<span>' + U.esc(rotulo) + '</span><b>' + U.fmt(valor) + '</b>'); pai.appendChild(e); return e; };

  // Abre uma tela nova, faz a anterior sair e devolve a caixa onde colocar o conteúdo.
  K.tela = (classe) => {
    // Pega o palco onde as telas aparecem.
    const palco = U.$('#palco');
    // Faz as telas atuais sumirem com fade e depois as remove do HTML.
    palco.querySelectorAll('.cena:not(.saindo)').forEach((v) => { v.classList.add('saindo'); setTimeout(() => v.remove(), 600); });
    // Cria a tela inteira e a caixa central.
    const cena = U.el('section', 'cena ' + (classe || '')); const caixa = U.el('div', 'caixa');
    // Monta, coloca no palco e devolve a caixa.
    cena.appendChild(caixa); palco.appendChild(cena); return caixa;
  };

  // Cria um botão de pílula dentro de 'pai' (o texto vem dos dados).
  K.botao = (pai, texto) => { const b = U.el('button', 'btn entra', U.esc(texto || 'continuar ›')); b.type = 'button'; pai.appendChild(b); return b; };

  // Espera um toque em 'el' e tira a marca de interação depois.
  K.toque = (el) => new Promise((ok) => {
    // Marca o elemento como tocável para o CSS e para o teste.
    el.dataset.acao = 'toque';
    // No primeiro toque limpa a marca, vibra e libera quem está esperando.
    el.addEventListener('click', () => { delete el.dataset.acao; U.vibra(12); ok(); }, { once: true });
  });

  // Mostra um botão, espera o toque e o tira da tela (assim não existe duplo clique).
  K.mais = async (pai, texto) => { const b = K.botao(pai, texto); await K.toque(b); b.remove(); };

  // Espera tocarem em todos os elementos, em qualquer ordem; 'cada' roda a cada toque.
  K.todos = (lista, cada) => Promise.all(lista.map((el, i) => K.toque(el).then(() => cada && cada(el, i))));

  // Espera tocarem em UM dos elementos e devolve a posição do escolhido.
  K.qual = (lista) => new Promise((ok) => {
    // Liga cada opção: a primeira tocada limpa a marca das outras e entrega a posição.
    lista.forEach((el, i) => { el.dataset.acao = 'toque'; el.addEventListener('click', () => { lista.forEach((x) => delete x.dataset.acao); U.vibra(15); ok(i); }, { once: true }); });
  });

  // Espera 'n' toques no mesmo elemento; 'cada' recebe o número do toque.
  K.vezes = (el, n, cada) => new Promise((ok) => {
    // Contador de toques feitos.
    let i = 0;
    // Marca como tocável enquanto faltar toque.
    el.dataset.acao = 'toque';
    // Conta o toque, avisa e, ao completar, solta o elemento e libera a espera.
    const f = () => { i++; U.vibra(10); if (cada) cada(i); if (i >= n) { el.removeEventListener('click', f); delete el.dataset.acao; ok(); } };
    // Liga o contador ao clique.
    el.addEventListener('click', f);
  });

  // Segure 'el' por 'ms' milissegundos; 'cada' recebe o progresso de 0 a 1 (soltou, esvazia).
  K.segura = (el, ms, cada) => new Promise((ok) => {
    // Estado: progresso, se está preso e o instante do último quadro.
    let p = 0, preso = false, ult = 0;
    // Marca o elemento e impede o menu de "pressionar e segurar" do celular.
    el.dataset.acao = 'segura'; el.dataset.ms = ms; el.style.touchAction = 'none'; el.addEventListener('contextmenu', (e) => e.preventDefault());
    // Laço: enche enquanto preso, esvazia mais rápido quando solta.
    const laco = (t) => {
      // Calcula o tempo desde o quadro anterior.
      const dt = ult ? t - ult : 0; ult = t;
      // Atualiza o progresso dentro do intervalo de 0 a 1.
      p = preso ? Math.min(1, p + dt / ms) : Math.max(0, p - dt / (ms / 2));
      // Avisa a arte para desenhar o progresso.
      if (cada) cada(p);
      // Completo: limpa a marca, vibra e libera; senão continua no próximo quadro.
      if (p >= 1) { delete el.dataset.acao; U.vibra(30); ok(); } else requestAnimationFrame(laco);
    };
    // Prende ao apertar.
    el.addEventListener('pointerdown', (e) => { e.preventDefault(); preso = true; });
    // Solta ao levantar o dedo ou sair do elemento.
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => el.addEventListener(ev, () => { preso = false; }));
    // Começa o laço.
    requestAnimationFrame(laco);
  });

  // Arraste 'el': cfg.rumo=[dx,dy] é o gesto esperado, cfg.move recebe o deslocamento e cfg.solta decide se terminou.
  K.arrasta = (el, cfg) => new Promise((ok) => {
    // Ponto inicial do dedo e se está arrastando.
    let x0 = 0, y0 = 0, ativo = false;
    // Marca o elemento e guarda o gesto esperado para o teste.
    el.dataset.acao = 'arrasta'; el.dataset.rumo = cfg.rumo.join(','); el.style.touchAction = 'none';
    // Ao apertar, guarda a posição e captura o dedo para não perder o arrasto.
    const inicio = (e) => { ativo = true; x0 = e.clientX; y0 = e.clientY; if (el.setPointerCapture) el.setPointerCapture(e.pointerId); };
    // Ao mover, entrega o deslocamento para a arte.
    const mexe = (e) => { if (ativo && cfg.move) cfg.move(e.clientX - x0, e.clientY - y0); };
    // Ao soltar, pergunta à arte se o gesto bastou; se sim, desliga tudo e libera a espera.
    const fim = (e) => {
      // Ignora soltar sem ter começado.
      if (!ativo) return;
      // Encerra o gesto atual.
      ativo = false;
      // A arte recusou o gesto: fica esperando outra tentativa.
      if (cfg.solta && !cfg.solta(e.clientX - x0, e.clientY - y0)) return;
      // Limpa a marca e desliga os ouvintes, para o próximo arrasto no mesmo elemento começar limpo.
      delete el.dataset.acao; el.removeEventListener('pointerdown', inicio); el.removeEventListener('pointermove', mexe); el.removeEventListener('pointerup', fim); el.removeEventListener('pointercancel', fim);
      // Vibra e libera.
      U.vibra(20); ok();
    };
    // Liga os três momentos do gesto.
    el.addEventListener('pointerdown', inicio); el.addEventListener('pointermove', mexe);
    // O gesto termina ao soltar ou quando o sistema cancela o toque.
    el.addEventListener('pointerup', fim); el.addEventListener('pointercancel', fim);
  });

  // Raspadinha: 'pintar' desenha a cobertura; resolve quando 'limite' (0 a 1) da área foi limpa.
  K.raspa = (cv, limite, pintar) => new Promise((ok) => {
    // Mede o canvas e desenha a cobertura.
    const r = cv.getBoundingClientRect(); cv.width = Math.max(1, r.width); cv.height = Math.max(1, r.height); const c = cv.getContext('2d'); pintar(c, cv.width, cv.height);
    // A partir daqui, desenhar apaga a cobertura em vez de pintar.
    c.globalCompositeOperation = 'destination-out'; c.lineWidth = 38; c.lineCap = 'round';
    // Marca como raspável e bloqueia a rolagem enquanto o dedo passa.
    cv.dataset.acao = 'raspa'; cv.style.touchAction = 'none';
    // Último ponto do dedo, contador de traços e se já terminou.
    let ant = null, n = 0, fim = false;
    // Converte a posição do dedo para coordenadas do canvas.
    const pos = (e) => { const b = cv.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
    // Mede a fração já limpa olhando a transparência de uma amostra dos pixels.
    const limpo = () => { const px = c.getImageData(0, 0, cv.width, cv.height).data; let z = 0, t = 0; for (let i = 3; i < px.length; i += 64) { t++; if (px[i] < 40) z++; } return z / t; };
    // Encerra: apaga o que sobrou com fade e libera a espera.
    const acaba = () => { fim = true; delete cv.dataset.acao; cv.style.transition = 'opacity .6s'; cv.style.opacity = 0; cv.style.pointerEvents = 'none'; U.vibra(25); ok(); };
    // Risca do ponto anterior até o atual e confere o progresso a cada 5 traços.
    const risca = (e) => { if (!ant || fim) return; const p = pos(e); c.beginPath(); c.moveTo(ant[0], ant[1]); c.lineTo(p[0], p[1]); c.stroke(); ant = p; n++; if (n % 5 === 0 && limpo() >= limite) acaba(); };
    // Começa o traço onde o dedo encostou.
    cv.addEventListener('pointerdown', (e) => { ant = pos(e); if (cv.setPointerCapture) cv.setPointerCapture(e.pointerId); });
    // Risca enquanto o dedo anda.
    cv.addEventListener('pointermove', risca);
    // Termina o traço ao soltar.
    ['pointerup', 'pointercancel'].forEach((ev) => cv.addEventListener(ev, () => { ant = null; }));
  });

  // Canvas animado dentro de 'pai': 'desenha(cx, w, h, segundos, v)' roda a cada quadro até o canvas sair da tela.
  K.pinta = (pai, desenha) => {
    // Cria o canvas e o objeto de controle.
    const cv = U.el('canvas', 'pintura'); pai.appendChild(cv); const cx = cv.getContext('2d'); const v = { cv, cx, w: 0, h: 0 };
    // Ajusta a resolução ao tamanho real, com densidade limitada a 2 para poupar bateria.
    const medir = () => { const d = Math.min(window.devicePixelRatio || 1, 2); v.w = cv.clientWidth; v.h = cv.clientHeight; cv.width = Math.round(v.w * d); cv.height = Math.round(v.h * d); cx.setTransform(d, 0, 0, d, 0, 0); };
    // Mede agora e sempre que a tela mudar de tamanho.
    medir(); window.addEventListener('resize', medir);
    // Laço de desenho: para sozinho quando o canvas sai do HTML.
    const laco = (t) => { if (!cv.isConnected) { window.removeEventListener('resize', medir); return; } desenha(cx, v.w, v.h, t / 1000, v); requestAnimationFrame(laco); };
    // Começa e devolve o controle.
    requestAnimationFrame(laco); return v;
  };

  // Digita um texto letra por letra em 'el' (textContent, então não interpreta HTML).
  K.digita = async (el, texto, ms) => { for (const ch of String(texto)) { el.textContent += ch; await U.esperar(ms || 38); } };

  // Revela um texto palavra por palavra e espera terminar.
  K.fala = (alvo, texto, passo) => U.esperar(U.palavras(alvo, texto, passo || 165));

  // Mostra frases uma a uma no mesmo lugar, com tempo de leitura; um toque na tela adianta.
  K.frases = async (alvo, lista) => {
    // Pega a tela em volta do texto, onde o toque adianta.
    const cena = alvo.closest('.cena');
    // Passa por cada frase.
    for (const f of lista) {
      // Revela a frase e calcula o tempo para ler.
      const leitura = U.palavras(alvo, f, 165) + 900 + f.length * 20;
      // Espera o tempo OU um toque; o AbortController remove o ouvinte que sobrar.
      const ctrl = new AbortController();
      // O que vier primeiro libera a próxima frase.
      await Promise.race([U.esperar(leitura), new Promise((r) => cena.addEventListener('click', r, { once: true, signal: ctrl.signal }))]);
      // Tira o ouvinte de toque que não foi usado.
      ctrl.abort();
    }
  };

  // Contexto de áudio dos efeitos (criado só no primeiro uso, depois de um toque).
  let ac = null;

  // Toca um efeito curto: f = frequência, ms = duração, onda = tipo, vol = volume. Respeita o botão de mudo.
  K.som = (f, ms, onda, vol) => {
    // Tenta tocar; se o navegador recusar, a arte segue em silêncio.
    try {
      // Mudo ligado: não toca.
      if (U.$('#rodape.mudo')) return;
      // Cria o contexto uma vez só.
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      // Oscilador (o som) e ganho (o volume).
      const o = ac.createOscillator(), v = ac.createGain(); o.type = onda || 'sine'; o.frequency.value = f;
      // O volume cai até quase zero no fim, para não estalar.
      v.gain.setValueAtTime(vol || .08, ac.currentTime); v.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + (ms || 120) / 1000);
      // Liga, toca e para sozinho.
      o.connect(v); v.connect(ac.destination); o.start(); o.stop(ac.currentTime + (ms || 120) / 1000);
    } catch (e) { /* sem áudio: a arte continua funcionando */ }
  };

  // Publica.
  g.K = K;
// Executa.
})(window);
