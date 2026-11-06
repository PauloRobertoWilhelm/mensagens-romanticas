/* ==========================================================
   fundo.js — partículas no canvas (corações, pétalas, brilhos, bolhas,
   estrelas, confete) com parallax do dedo/mouse e explosões.
   Cada tema tem a sua "receita" em Fundo.TEMAS (mais abaixo).
   ========================================================== */

// Isola variáveis.
(function (g) {
  // Modo estrito.
  'use strict';

  // Objeto público.
  const Fundo = {};

  // Receitas por tema: forma, quantidade, direção do movimento, cores e velocidade.
  // dir: 'sobe' (de baixo pra cima), 'cai' (de cima pra baixo), 'flutua' (vagueia).
  Fundo.TEMAS = {
    // Corações rosados subindo.
    noite: { forma: 'coracao', qtd: 26, dir: 'sobe', cores: ['#ff5c8a', '#ffb0c8', '#ff7aa8'], vel: 1 },
    // Brilhos menta e lilás flutuando.
    aurora: { forma: 'brilho', qtd: 34, dir: 'flutua', cores: ['#5af2c6', '#b79bff', '#d7fff3'], vel: .8 },
    // Pétalas caindo.
    rosa: { forma: 'petala', qtd: 28, dir: 'cai', cores: ['#ff8fb3', '#e0457b', '#ffc2d6'], vel: .9 },
    // Corações quentes subindo rápido.
    fogo: { forma: 'coracao', qtd: 24, dir: 'sobe', cores: ['#ff6a3d', '#ffc26b', '#ff3d5a'], vel: 1.35 },
    // Bolhas subindo devagar.
    oceano: { forma: 'bolha', qtd: 30, dir: 'sobe', cores: ['#5ce1ff', '#a8f0e0', '#ffffff'], vel: .85 },
    // Brilhos dourados caindo suave.
    ouro: { forma: 'brilho', qtd: 30, dir: 'cai', cores: ['#e8bd5a', '#fff0b8', '#ffd98a'], vel: .7 },
    // Estrelas neon flutuando.
    neon: { forma: 'estrela', qtd: 28, dir: 'flutua', cores: ['#ff2bd6', '#2bf0ff', '#ffffff'], vel: 1 },
    // Pétalas verdes e rosas caindo.
    jardim: { forma: 'petala', qtd: 26, dir: 'cai', cores: ['#3f9a52', '#f08aa8', '#9fd18a'], vel: .8 },
    // Brilhos de pôr do sol flutuando.
    crepusculo: { forma: 'brilho', qtd: 32, dir: 'flutua', cores: ['#ffb347', '#ff8fb1', '#ffe0a8'], vel: .9 },
    // Confete colorido caindo.
    confete: { forma: 'confete', qtd: 44, dir: 'cai', cores: ['#ffd23f', '#ff5fa2', '#5ce1ff', '#9dff7a', '#ffffff'], vel: 1.1 }
  };

  // Estado interno do módulo.
  let cv = null, cx = null, W = 0, H = 0, dpr = 1;
  // Lista de partículas vivas (ambiente + explosões).
  let ps = [];
  // Configuração do tema atual.
  let cfg = null;
  // Parallax: alvo (onde o dedo está) e atual (suavizado), de -1 a 1.
  let alvoX = 0, alvoY = 0, px = 0, py = 0;
  // Controle do laço de animação.
  let rodando = false, ultimo = 0;
  // Respeita "reduzir movimento" do sistema.
  const reduz = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ajusta o tamanho do canvas à tela, com limite de densidade (economiza bateria).
  const medir = () => {
    // Densidade de pixels limitada a 2.
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Tamanho visível.
    W = window.innerWidth; H = window.innerHeight;
    // Tamanho real do desenho.
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    // Escala o contexto para desenhar em pixels CSS.
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  // Cria uma partícula de ambiente no tema atual. 'inicio' = espalhada pela tela (sem ficar tudo embaixo).
  const criar = (inicio) => {
    // Profundidade 0.3 a 1: perto = maior, mais rápido e com mais parallax.
    const d = U.rand(.3, 1);
    // Tamanho base depende da forma e da profundidade.
    const tam = (cfg.forma === 'confete' ? U.rand(6, 11) : U.rand(10, 26)) * d;
    // Partícula.
    const p = { x: U.rand(0, W), y: 0, vx: U.rand(-.15, .15), vy: 0, tam, d, rot: U.rand(0, 6.28), vr: U.rand(-.02, .02), cor: U.sorteia(cfg.cores), a: U.rand(.25, .75) * (.5 + d / 2), fase: U.rand(0, 6.28), ambiente: true };
    // Velocidade vertical e posição inicial conforme a direção.
    const v = cfg.vel * (.35 + d * .9);
    if (cfg.dir === 'sobe') { p.vy = -v; p.y = inicio ? U.rand(0, H) : H + tam; }
    else if (cfg.dir === 'cai') { p.vy = v; p.y = inicio ? U.rand(0, H) : -tam; }
    else { p.vy = U.rand(-.25, .25) * cfg.vel; p.vx = U.rand(-.3, .3) * cfg.vel; p.y = U.rand(0, H); }
    // Devolve.
    return p;
  };

  // Desenha uma forma na origem (0,0), já transladada/rotacionada, com tamanho s.
  const forma = (f, s) => {
    // Começa um novo caminho.
    cx.beginPath();
    if (f === 'coracao') {
      // Coração com duas curvas de Bézier.
      cx.moveTo(0, s * .35);
      cx.bezierCurveTo(-s * .9, -s * .2, -s * .5, -s * .85, 0, -s * .35);
      cx.bezierCurveTo(s * .5, -s * .85, s * .9, -s * .2, 0, s * .35);
      cx.fill();
    } else if (f === 'petala') {
      // Pétala = elipse estreita.
      cx.ellipse(0, 0, s * .35, s * .7, 0, 0, 6.283);
      cx.fill();
    } else if (f === 'brilho') {
      // Brilho de 4 pontas.
      cx.moveTo(0, -s); cx.quadraticCurveTo(0, 0, s * .7, 0); cx.quadraticCurveTo(0, 0, 0, s); cx.quadraticCurveTo(0, 0, -s * .7, 0); cx.quadraticCurveTo(0, 0, 0, -s);
      cx.fill();
    } else if (f === 'bolha') {
      // Bolha = círculo só com contorno + reflexo.
      cx.arc(0, 0, s * .6, 0, 6.283); cx.lineWidth = 1.4; cx.stroke();
      cx.beginPath(); cx.arc(-s * .2, -s * .2, s * .12, 0, 6.283); cx.fill();
    } else if (f === 'estrela') {
      // Estrela de 5 pontas (10 vértices alternando raio externo/interno).
      for (let i = 0; i < 10; i++) { const r = i % 2 ? s * .28 : s * .65; const a = (i * Math.PI) / 5 - Math.PI / 2; cx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
      cx.closePath(); cx.fill();
    } else {
      // Confete = retângulo pequeno.
      cx.fillRect(-s / 2, -s / 4, s, s / 2);
    }
  };

  // Quadro da animação: atualiza posições e redesenha tudo.
  const quadro = (t) => {
    // Se parou, não agenda o próximo.
    if (!rodando) return;
    // Delta de tempo normalizado para 60 fps (limitado para não "pular" ao voltar de outra aba).
    const dt = Math.min(2.5, (t - ultimo) / 16.67 || 1); ultimo = t;
    // Suaviza o parallax em direção ao alvo.
    px += (alvoX - px) * .06; py += (alvoY - py) * .06;
    // Limpa o canvas.
    cx.clearRect(0, 0, W, H);
    // Atualiza e desenha cada partícula.
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i];
      // Movimento básico.
      p.x += (p.vx + (cfg.dir === 'flutua' || cfg.forma === 'petala' ? Math.sin(t / 900 + p.fase) * .35 : 0)) * dt;
      p.y += p.vy * dt; p.rot += p.vr * dt;
      // Partículas de explosão têm gravidade e vida.
      if (!p.ambiente) { p.vy += .06 * dt; p.vida -= dt; p.a = Math.max(0, p.vida / p.vidaMax); if (p.vida <= 0) { ps.splice(i, 1); continue; } }
      // Partículas de ambiente reaparecem do outro lado ao sair da tela.
      else if (p.y < -40 || p.y > H + 40 || p.x < -40 || p.x > W + 40) { ps[i] = criar(false); if (cfg.dir === 'flutua') { ps[i].y = U.rand(0, H); ps[i].a = 0.05; } continue; }
      // Posição na tela com parallax (as de perto mexem mais).
      const sx = p.x + px * p.d * 26, sy = p.y + py * p.d * 26;
      // Cor e transparência.
      cx.globalAlpha = p.a; cx.fillStyle = p.cor; cx.strokeStyle = p.cor;
      // Move a origem para a partícula, gira e desenha.
      cx.save(); cx.translate(sx, sy); cx.rotate(p.rot); forma(p.forma || cfg.forma, p.tam); cx.restore();
    }
    // Restaura a transparência e agenda o próximo quadro.
    cx.globalAlpha = 1; requestAnimationFrame(quadro);
  };

  // Inicia (ou troca) o fundo com a receita de um tema.
  Fundo.iniciar = (receita) => {
    // Pega o canvas.
    cv = U.$('#fundo'); if (!cv) return;
    cx = cv.getContext('2d'); cfg = receita || Fundo.TEMAS.noite;
    // Mede e cria as partículas de ambiente (30% se o usuário prefere menos movimento; menos em telas pequenas).
    medir();
    const base = Math.round(cfg.qtd * Math.min(1, W / 700 + .35) * (reduz ? .3 : 1));
    ps = []; for (let i = 0; i < base; i++) ps.push(criar(true));
    // Parallax pelo ponteiro (mouse ou dedo), desligado com reduzir movimento.
    if (!reduz) window.addEventListener('pointermove', (e) => { alvoX = (e.clientX / W - .5) * 2; alvoY = (e.clientY / H - .5) * 2; }, { passive: true });
    // Reajusta ao girar o celular / redimensionar.
    window.addEventListener('resize', medir);
    // Pausa quando a aba fica escondida (economiza bateria) e retoma ao voltar.
    document.addEventListener('visibilitychange', () => { if (document.hidden) { rodando = false; } else if (!rodando) { rodando = true; ultimo = performance.now(); requestAnimationFrame(quadro); } });
    // Liga o laço.
    rodando = true; ultimo = performance.now(); requestAnimationFrame(quadro);
  };

  // Explosão de partículas em (x,y) da tela. n = quantidade; f = forma opcional.
  Fundo.explodirEm = (x, y, n, f) => {
    // Sem canvas ou config não faz nada.
    if (!cfg) return;
    // Limita o total para não travar celulares fracos.
    const q = Math.min(n || 30, 80);
    for (let i = 0; i < q; i++) {
      // Direção e força aleatórias em círculo.
      const ang = U.rand(0, 6.283), f2 = U.rand(1.5, 5.5);
      // Vida de 50 a 90 quadros.
      const vida = U.rand(50, 90);
      ps.push({ x, y, vx: Math.cos(ang) * f2, vy: Math.sin(ang) * f2 - 1.5, tam: U.rand(8, 20), d: .7, rot: U.rand(0, 6.28), vr: U.rand(-.15, .15), cor: U.sorteia(cfg.cores), a: 1, vida, vidaMax: vida, ambiente: false, forma: f || (cfg.forma === 'bolha' ? 'brilho' : cfg.forma) });
    }
  };

  // Festa: várias explosões espalhadas pela parte de cima da tela (usada em finais e presentes).
  Fundo.festa = (n) => {
    // Quantidade de rajadas.
    const k = n || 5;
    for (let i = 0; i < k; i++) setTimeout(() => Fundo.explodirEm(U.rand(W * .15, W * .85), U.rand(H * .2, H * .55), 34, 'confete'), i * 220);
  };

  // Publica.
  g.Fundo = Fundo;
// Executa.
})(window);
