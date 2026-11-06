/* ==========================================================
   fundo.js — partículas no canvas (corações, pétalas, brilhos, bolhas,
   estrelas, confete) com parallax do dedo/mouse e explosões.
   Cada tema tem a sua "receita" em Fundo.TEMAS (mais abaixo).
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

  // Caixa onde ficam as ferramentas deste arquivo.
  const Fundo = {};

  // Receitas por tema: forma, quantidade, direção do movimento, cores e velocidade.
  // dir: 'sobe' (de baixo pra cima), 'cai' (de cima pra baixo), 'flutua' (vagueia).
  Fundo.TEMAS = {
    // Corações rosados subindo.
    noite: { forma: 'coracao', qtd: 26, dir: 'sobe', cores: ['#ff5c8a', '#ffb0c8', '#ff7aa8'], vel: 1 },
    // Brilhos menta e lilás flutuando.
    aurora: { forma: 'brilho', qtd: 34, dir: 'flutua', cores: ['#5af2c6', '#b79bff', '#d7fff3'], vel: 0.8 },
    // Pétalas caindo.
    rosa: { forma: 'petala', qtd: 28, dir: 'cai', cores: ['#ff8fb3', '#e0457b', '#ffc2d6'], vel: 0.9 },
    // Corações quentes subindo rápido.
    fogo: { forma: 'coracao', qtd: 24, dir: 'sobe', cores: ['#ff6a3d', '#ffc26b', '#ff3d5a'], vel: 1.35 },
    // Bolhas subindo devagar.
    oceano: { forma: 'bolha', qtd: 30, dir: 'sobe', cores: ['#5ce1ff', '#a8f0e0', '#ffffff'], vel: 0.85 },
    // Brilhos dourados caindo suave.
    ouro: { forma: 'brilho', qtd: 30, dir: 'cai', cores: ['#e8bd5a', '#fff0b8', '#ffd98a'], vel: 0.7 },
    // Estrelas neon flutuando.
    neon: { forma: 'estrela', qtd: 28, dir: 'flutua', cores: ['#ff2bd6', '#2bf0ff', '#ffffff'], vel: 1 },
    // Pétalas verdes e rosas caindo.
    jardim: { forma: 'petala', qtd: 26, dir: 'cai', cores: ['#3f9a52', '#f08aa8', '#9fd18a'], vel: 0.8 },
    // Brilhos de pôr do sol flutuando.
    crepusculo: { forma: 'brilho', qtd: 32, dir: 'flutua', cores: ['#ffb347', '#ff8fb1', '#ffe0a8'], vel: 0.9 },
    // Confete colorido caindo.
    confete: {
      // Desenho das partículas que flutuam no fundo.
      forma: 'confete',
      // Quantas partículas aparecem. 0 = nenhuma.
      qtd: 44,
      dir: 'cai',
      // Cores das partículas.
      cores: ['#ffd23f', '#ff5fa2', '#5ce1ff', '#9dff7a', '#ffffff'],
      vel: 1.1
    }
  };

  // Estado interno do módulo.
  let cv = null,
    cx = null,
    W = 0,
    H = 0,
    dpr = 1;
  // Lista de partículas vivas (ambiente + explosões).
  let ps = [];
  // Configuração do tema atual.
  let cfg = null;
  // Parallax: alvo (onde o dedo está) e atual (suavizado), de -1 a 1.
  let alvoX = 0,
    alvoY = 0,
    px = 0,
    py = 0;
  // Controle do laço de animação.
  let rodando = false,
    ultimo = 0;
  // Respeita "reduzir movimento" do sistema.
  const reduz = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ajusta o tamanho do canvas à tela, com limite de densidade (economiza bateria).
  const medir = () => {
    // Densidade de pixels limitada a 2.
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Tamanho visível.
    W = window.innerWidth;
    // Anota a altura da tela.
    H = window.innerHeight;
    // Tamanho real do desenho.
    cv.width = Math.round(W * dpr);
    // Ajusta a altura do desenho ao tamanho real.
    cv.height = Math.round(H * dpr);
    // Escala o contexto para desenhar em pixels CSS.
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  // Cria uma partícula de ambiente no tema atual. 'inicio' = espalhada pela tela (sem ficar tudo embaixo).
  const criar = (inicio) => {
    // Profundidade 0.3 a 1: perto = maior, mais rápido e com mais parallax.
    const d = U.rand(0.3, 1);
    // Tamanho base depende da forma e da profundidade.
    const tam = (cfg.forma === 'confete' ? U.rand(6, 11) : U.rand(10, 26)) * d;
    // Partícula.
    const p = {
      x: U.rand(0, W),
      y: 0,
      vx: U.rand(-0.15, 0.15),
      vy: 0,
      tam,
      // Significado da palavra.
      d,
      rot: U.rand(0, 6.28),
      vr: U.rand(-0.02, 0.02),
      cor: U.sorteia(cfg.cores),
      a: U.rand(0.25, 0.75) * (0.5 + d / 2),
      fase: U.rand(0, 6.28),
      ambiente: true
    };
    // Velocidade vertical e posição inicial conforme a direção.
    const v = cfg.vel * (0.35 + d * 0.9);
    // Se a condição entre parênteses valer, faz o que está nas chaves.
    if (cfg.dir === 'sobe') {
      // Escolhe a velocidade para cima ou para baixo.
      p.vy = -v;
      // Move a partícula para cima ou para baixo.
      p.y = inicio ? U.rand(0, H) : H + tam;
      // Se o caso de cima não valeu, faz isto.
    } else if (cfg.dir === 'cai') {
      // Escolhe a velocidade para cima ou para baixo.
      p.vy = v;
      // Move a partícula para cima ou para baixo.
      p.y = inicio ? U.rand(0, H) : -tam;
      // Se o caso de cima não valeu, faz isto.
    } else {
      // Escolhe a velocidade para cima ou para baixo.
      p.vy = U.rand(-0.25, 0.25) * cfg.vel;
      // Escolhe a velocidade para o lado.
      p.vx = U.rand(-0.3, 0.3) * cfg.vel;
      // Move a partícula para cima ou para baixo.
      p.y = U.rand(0, H);
    }
    // Entrega o resultado.
    return p;
  };

  // Desenha uma forma na origem (0,0), já transladada/rotacionada, com tamanho s.
  const forma = (f, s) => {
    // Começa um novo caminho.
    cx.beginPath();
    // Se a condição entre parênteses valer, faz o que está nas chaves.
    if (f === 'coracao') {
      // Coração com duas curvas de Bézier.
      cx.moveTo(0, s * 0.35);
      // Desenha uma curva.
      cx.bezierCurveTo(-s * 0.9, -s * 0.2, -s * 0.5, -s * 0.85, 0, -s * 0.35);
      // Desenha uma curva.
      cx.bezierCurveTo(s * 0.5, -s * 0.85, s * 0.9, -s * 0.2, 0, s * 0.35);
      // Pinta por dentro do desenho.
      cx.fill();
      // Se o caso de cima não valeu, faz isto.
    } else if (f === 'petala') {
      // Pétala = elipse estreita.
      cx.ellipse(0, 0, s * 0.35, s * 0.7, 0, 0, 6.283);
      // Pinta por dentro do desenho.
      cx.fill();
      // Se o caso de cima não valeu, faz isto.
    } else if (f === 'brilho') {
      // Brilho de 4 pontas.
      cx.moveTo(0, -s);
      // Desenha uma curva.
      cx.quadraticCurveTo(0, 0, s * 0.7, 0);
      // Desenha uma curva.
      cx.quadraticCurveTo(0, 0, 0, s);
      // Desenha uma curva.
      cx.quadraticCurveTo(0, 0, -s * 0.7, 0);
      // Desenha uma curva.
      cx.quadraticCurveTo(0, 0, 0, -s);
      // Pinta por dentro do desenho.
      cx.fill();
      // Se o caso de cima não valeu, faz isto.
    } else if (f === 'bolha') {
      // Bolha = círculo só com contorno + reflexo.
      cx.arc(0, 0, s * 0.6, 0, 6.283);
      // Escolhe a grossura do traço.
      cx.lineWidth = 1.4;
      // Pinta o traço do desenho.
      cx.stroke();
      // Começa um desenho novo.
      cx.beginPath();
      // Desenha um círculo.
      cx.arc(-s * 0.2, -s * 0.2, s * 0.12, 0, 6.283);
      // Pinta por dentro do desenho.
      cx.fill();
      // Se o caso de cima não valeu, faz isto.
    } else if (f === 'estrela') {
      // Estrela de 5 pontas (10 vértices alternando raio externo/interno).
      for (let i = 0; i < 10; i++) {
        // Guarda este valor com o nome "r".
        const r = i % 2 ? s * 0.28 : s * 0.65;
        // Guarda este valor com o nome "a".
        const a = (i * Math.PI) / 5 - Math.PI / 2;
        // Risca uma linha até este ponto.
        cx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      // Fecha o desenho.
      cx.closePath();
      // Pinta por dentro do desenho.
      cx.fill();
      // Se o caso de cima não valeu, faz isto.
    } else if (f === 'confete') {
      // Confete = retângulo pequeno.
      cx.fillRect(-s / 2, -s / 4, s, s / 2);
      // Se o caso de cima não valeu, faz isto.
    } else {
      // Qualquer outra forma é um símbolo escrito (♪, ✦, ❄...), para cada arte ter o seu.
      cx.font = Math.round(s * 1.5) + 'px serif';
      // Centraliza a letra do desenho.
      cx.textAlign = 'center';
      // Escreve um símbolo no desenho.
      cx.fillText(f, 0, s * 0.5);
    }
  };

  // Quadro da animação: atualiza posições e redesenha tudo.
  const quadro = (t) => {
    // Se parou, não agenda o próximo.
    if (!rodando) return;
    // Delta de tempo normalizado para 60 fps (limitado para não "pular" ao voltar de outra aba).
    const dt = Math.min(2.5, (t - ultimo) / 16.67 || 1);
    // Anota o horário deste quadro, para medir o tempo.
    ultimo = t;
    // Suaviza o parallax em direção ao alvo.
    px += (alvoX - px) * 0.06;
    // Soma mais um pouco em py.
    py += (alvoY - py) * 0.06;
    // Limpa o canvas.
    cx.clearRect(0, 0, W, H);
    // Atualiza e desenha cada partícula.
    for (let i = ps.length - 1; i >= 0; i--) {
      // Guarda este valor com o nome "p".
      const p = ps[i];
      // Movimento básico.
      p.x += (p.vx + (cfg.dir === 'flutua' || cfg.forma === 'petala' ? Math.sin(t / 900 + p.fase) * 0.35 : 0)) * dt;
      // Move a partícula para cima ou para baixo.
      p.y += p.vy * dt;
      // Soma mais um pouco em p.rot.
      p.rot += p.vr * dt;
      // Partículas de explosão têm gravidade e vida.
      if (!p.ambiente) {
        // Escolhe a velocidade para cima ou para baixo.
        p.vy += 0.06 * dt;
        // Tira um pouco de p.vida.
        p.vida -= dt;
        // Escolhe a transparência da partícula.
        p.a = Math.max(0, p.vida / p.vidaMax);
        // Se a condição entre parênteses valer, faz o que está nas chaves.
        if (p.vida <= 0) {
          // Tira um item da lista.
          ps.splice(i, 1);
          // Pula para a próxima volta da repetição.
          continue;
        }
      }
      // Partículas de ambiente reaparecem do outro lado ao sair da tela.
      else if (p.y < -40 || p.y > H + 40 || p.x < -40 || p.x > W + 40) {
        // Guarda o novo valor em ps[i].
        ps[i] = criar(false);
        // Se a condição entre parênteses valer, faz o que está nas chaves.
        if (cfg.dir === 'flutua') {
          // Guarda o novo valor em ps[i].y.
          ps[i].y = U.rand(0, H);
          // Guarda o novo valor em ps[i].a.
          ps[i].a = 0.05;
        }
        // Pula para a próxima volta da repetição.
        continue;
      }
      // Posição na tela com parallax (as de perto mexem mais).
      const sx = p.x + px * p.d * 26,
        sy = p.y + py * p.d * 26;
      // Cor e transparência.
      cx.globalAlpha = p.a;
      // Escolhe a cor da tinta do pincel.
      cx.fillStyle = p.cor;
      // Escolhe a cor do traço.
      cx.strokeStyle = p.cor;
      // Move a origem para a partícula, gira e desenha.
      cx.save();
      // Muda o ponto de partida do desenho.
      cx.translate(sx, sy);
      // Gira o papel do desenho.
      cx.rotate(p.rot);
      // Usa a ajuda "forma" (ela está definida neste arquivo).
      forma(p.forma || cfg.forma, p.tam);
      // Volta o pincel como estava.
      cx.restore();
    }
    // Restaura a transparência e agenda o próximo quadro.
    cx.globalAlpha = 1;
    // Pede para rodar de novo no próximo quadro da tela.
    requestAnimationFrame(quadro);
  };

  // Inicia (ou troca) o fundo com a receita de um tema.
  Fundo.iniciar = (receita) => {
    // Pega o canvas.
    cv = U.$('#fundo');
    // Se a condição entre parênteses valer, para por aqui.
    if (!cv) return;
    // Guarda o novo valor em cx.
    cx = cv.getContext('2d');
    // Guarda as configurações das partículas.
    cfg = receita || Fundo.TEMAS.noite;
    // Mede e cria as partículas de ambiente (30% se o usuário prefere menos movimento; menos em telas pequenas).
    medir();
    // Arredonda o número e guarda com o nome "base".
    const base = Math.round(cfg.qtd * Math.min(1, W / 700 + 0.35) * (reduz ? 0.3 : 1));
    // Guarda o novo valor em ps.
    ps = [];
    // Repete várias vezes, contando as voltas.
    for (let i = 0; i < base; i++) ps.push(criar(true));
    // Parallax pelo ponteiro (mouse ou dedo), desligado com reduzir movimento.
    if (!reduz)
      // Fica de olho: quando o dedo andar, roda o que está aqui.
      window.addEventListener(
        'pointermove',
        (e) => {
          // Anota para onde o fundo deve se mexer.
          alvoX = (e.clientX / W - 0.5) * 2;
          // Anota para onde o fundo deve se mexer.
          alvoY = (e.clientY / H - 0.5) * 2;
        },
        { passive: true }
      );
    // Reajusta ao girar o celular / redimensionar.
    window.addEventListener('resize', medir);
    // Pausa quando a aba fica escondida (economiza bateria) e retoma ao voltar.
    document.addEventListener('visibilitychange', () => {
      // Se a condição entre parênteses valer: anota se o desenho está ligado.
      if (document.hidden) {
        // Anota se o desenho está ligado.
        rodando = false;
        // Se o caso de cima não valeu, faz isto.
      } else if (!rodando) {
        // Anota se o desenho está ligado.
        rodando = true;
        // Anota o horário deste quadro, para medir o tempo.
        ultimo = performance.now();
        // Pede para rodar de novo no próximo quadro da tela.
        requestAnimationFrame(quadro);
      }
    });
    // Liga o laço.
    rodando = true;
    // Anota o horário deste quadro, para medir o tempo.
    ultimo = performance.now();
    // Pede para rodar de novo no próximo quadro da tela.
    requestAnimationFrame(quadro);
  };

  // Explosão de partículas em (x,y) da tela. n = quantidade; f = forma opcional.
  Fundo.explodirEm = (x, y, n, f) => {
    // Sem canvas ou config não faz nada.
    if (!cfg) return;
    // Limita o total para não travar celulares fracos.
    const q = Math.min(n || 30, 80);
    // Repete várias vezes, contando as voltas.
    for (let i = 0; i < q; i++) {
      // Direção e força aleatórias em círculo.
      const ang = U.rand(0, 6.283),
        f2 = U.rand(1.5, 5.5);
      // Vida de 50 a 90 quadros.
      const vida = U.rand(50, 90);
      // Coloca mais um item na lista.
      ps.push({
        x,
        y,
        vx: Math.cos(ang) * f2,
        vy: Math.sin(ang) * f2 - 1.5,
        tam: U.rand(8, 20),
        // Significado da palavra.
        d: 0.7,
        rot: U.rand(0, 6.28),
        vr: U.rand(-0.15, 0.15),
        cor: U.sorteia(cfg.cores),
        a: 1,
        vida,
        vidaMax: vida,
        ambiente: false,
        // Desenho das partículas que flutuam no fundo.
        forma: f || (cfg.forma === 'bolha' ? 'brilho' : cfg.forma)
      });
    }
  };

  // Festa: várias explosões espalhadas pela parte de cima da tela, com a partícula da própria mensagem.
  Fundo.festa = (n) => {
    // Quantidade de rajadas.
    const k = n || 5;
    // Repete várias vezes, contando as voltas.
    for (let i = 0; i < k; i++)
      // Deixa agendado para daqui a pouco.
      setTimeout(() => Fundo.explodirEm(U.rand(W * 0.15, W * 0.85), U.rand(H * 0.2, H * 0.55), 34), i * 220);
  };

  // Deixa estas ferramentas disponíveis para os outros arquivos.
  g.Fundo = Fundo;
  // Fecha a caixa e já roda tudo.
})(window);
