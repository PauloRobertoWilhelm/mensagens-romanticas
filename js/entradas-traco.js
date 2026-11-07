/* ==========================================================
   entradas-traco.js — as entradas desenhadas com linhas e letras:
   ondas de rádio, salto em alta velocidade, neon, circuito,
   letras com gravidade, órbita e imagem que fica nítida.
   Os textos ficam em data/aberturas.js e o visual em css/aberturas.css.
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
(function () {
  // Liga o modo estrito: o navegador avisa de erros bobos.
  'use strict';

  // Atalho para a caixa das entradas.
  const E = window.Entradas;

  // Transforma três números de 0 a 1 em uma cor que o pincel entende. 'a' é a transparência.
  const css = (c, a) =>
    'rgba(' + Math.round(c[0] * 255) + ',' + Math.round(c[1] * 255) + ',' + Math.round(c[2] * 255) + ',' + (a == null ? 1 : a) + ')';

  // Mistura duas cores. 'k' = 0 dá a primeira, 'k' = 1 dá a segunda.
  const mistura = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);

  /* ---------- sinal: ondas que limpam quando acha a frequência ---------- */

  // Liga o som de chiado de rádio. Devolve o jeito de ajustar e de desligar.
  const chiado = () => {
    // Tenta criar o som; se o navegador recusar, segue em silêncio.
    try {
      // Mudo ligado: não toca nada.
      if (U.$('#rodape.mudo')) return null;
      // Cria o aparelho de som.
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      // Cria 1 segundo de ruído.
      const som = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      // Pega o lugar onde o ruído é escrito.
      const dados = som.getChannelData(0);
      // Sorteia cada pedacinho do ruído.
      for (let i = 0; i < dados.length; i++) dados[i] = Math.random() * 2 - 1;
      // Tocador do ruído.
      const fita = ac.createBufferSource();
      // Coloca o ruído no tocador.
      fita.buffer = som;
      // Repete sem parar.
      fita.loop = true;
      // Volume do ruído.
      const vRuido = ac.createGain();
      // Começa baixinho.
      vRuido.gain.value = 0.02;
      // Liga o tocador no volume.
      fita.connect(vRuido);
      // Liga o volume na saída de som.
      vRuido.connect(ac.destination);
      // Nota limpa, que aparece quando acha a estação.
      const nota = ac.createOscillator();
      // Altura da nota.
      nota.frequency.value = 440;
      // Volume da nota.
      const vNota = ac.createGain();
      // Começa em silêncio.
      vNota.gain.value = 0;
      // Liga a nota no volume.
      nota.connect(vNota);
      // Liga o volume na saída de som.
      vNota.connect(ac.destination);
      // Começa o ruído.
      fita.start();
      // Começa a nota.
      nota.start();
      // Entrega os controles.
      return {
        // Ajusta o som. 's' vai de 0 (só chiado) a 1 (só nota limpa).
        ajusta: (s) => {
          // Chiado cai conforme acha a estação.
          vRuido.gain.value = 0.03 * (1 - s);
          // Nota sobe conforme acha a estação.
          vNota.gain.value = 0.05 * s * s;
        },
        // Desliga tudo.
        parar: () => ac.close()
      };
      // Se deu erro, cai aqui e o site continua funcionando.
    } catch (e) {
      // Segue em silêncio.
      return null;
    }
  };

  // Forma do coração em uma folha de -1 a 1. Dentro dá um número de 0 a 1; fora dá 0.
  const dentroDoCoracao = (u, v) => {
    // Aumenta o desenho. Número maior = coração menor.
    const x = u * 1.3;
    // A altura vai para o lado certo e sobe um pouco.
    const y = -v * 1.3 + 0.18;
    // Parte da conta do coração.
    const q = x * x + y * y - 1;
    // Conta do coração: negativa quando está dentro.
    const f = q * q * q - x * x * y * y * y;
    // Transforma em um número de 0 a 1.
    return Math.max(0, Math.min(1, -f * 2.4));
  };

  // Sinal: arraste até a frequência certa, e o ruído vira um coração.
  E.sinal = async (caixa, d, liga) => {
    // Lugar da estação na régua, de 0 a 1.
    const alvo = 0.72;
    // Quão perto precisa chegar. Número maior = mais fácil.
    const folga = 0.09;
    // Frequência certa.
    const freq = parseFloat(d.freq);
    // Onde a régua começa.
    const inicio = freq - 14.4;
    // Quanto a estação já foi achada, de 0 a 1.
    let sintonia = 0;
    // Lugar atual do cursor, de 0 a 1.
    let cursor = 0.08;
    // Quanto a sintonia precisa ir, depois de soltar.
    let trava = 0;
    // Cor do traço.
    const corA = Luz.tema('--ac');
    // Cor de fundo: a do tema bem escurecida.
    const fundo = Luz.fundo().map((c) => c * 0.34);
    // Quantas linhas de onda. Número maior = desenho mais cheio.
    const linhas = 36;
    // Quantos pontos em cada linha.
    const pontos = 84;
    // Cria o quadro de desenho.
    const lousa = Luz.lousa(caixa, (cx, W, H, t) => {
      // Pinta o fundo.
      cx.fillStyle = css(fundo);
      // Pinta tudo.
      cx.fillRect(0, 0, W, H);
      // Lado esquerdo do desenho.
      const x0 = W * 0.5 - Math.min(W * 0.46, H * 0.42);
      // Lado direito do desenho.
      const x1 = W - x0;
      // Altura de cima do desenho.
      const y0 = H * 0.27;
      // Altura de baixo do desenho.
      const y1 = H * 0.76;
      // Quanto já limpou, depois de soltar também.
      const s = Math.max(sintonia, trava);
      // Cor do traço: vai clareando conforme acha a estação.
      cx.strokeStyle = css(mistura(corA, [1, 1, 1], s * 0.7));
      // Grossura do traço.
      cx.lineWidth = 1.25;
      // Desenha de cima para baixo, assim as linhas da frente tapam as de trás.
      for (let r = 0; r < linhas; r++) {
        // Altura desta linha, de -1 a 1.
        const v = (r / (linhas - 1)) * 2 - 1;
        // Altura desta linha na tela.
        const y = y0 + (r / (linhas - 1)) * (y1 - y0);
        // Começa o desenho da linha.
        cx.beginPath();
        // Primeiro ponto.
        cx.moveTo(x0, y);
        // Desenha cada ponto da linha.
        for (let i = 0; i <= pontos; i++) {
          // Posição no lado, de -1 a 1.
          const u = (i / pontos) * 2 - 1;
          // Nas pontas a onda morre.
          const borda = Math.pow(1 - u * u, 2);
          // Ruído: dois senos que batem um no outro.
          const ruido = Math.abs(Math.sin(u * 9 + r * 1.7 + t * 3) * Math.sin(u * 23 - r * 0.9 + t * 5)) * borda;
          // Coração: alto no meio do desenho.
          const coracao = dentroDoCoracao(u, v) * (0.75 + 0.25 * Math.sin(u * 18 + r * 0.8 + t * 2.4));
          // Mistura o ruído com o coração. Número maior = ondas mais altas.
          const alto = (ruido * (1 - s) * 0.95 + coracao * s) * (y1 - y0) * 0.12;
          // Liga até este ponto.
          cx.lineTo(x0 + ((u + 1) / 2) * (x1 - x0), y - alto);
        }
        // Fecha a linha por baixo, para tapar as de trás.
        cx.lineTo(x1, y + 6);
        // Fecha a linha por baixo.
        cx.lineTo(x0, y + 6);
        // Cor que tapa as linhas de trás.
        cx.fillStyle = css(fundo);
        // Pinta por dentro.
        cx.fill();
        // Traça a linha.
        cx.stroke();
      }
    });
    // Guarda para desligar no fim.
    liga(lousa);
    // A frase grande.
    K.add(caixa, 'h1', 'ab-titulo', d.titulo);
    // O número da estação.
    const visor = K.add(caixa, 'b', 'ab-freq', inicio.toFixed(1));
    // A régua.
    const regua = K.add(caixa, 'div', 'ab-regua');
    // Marca onde a estação está. Fica escondida até a pessoa chegar perto.
    const pino = K.add(regua, 'button', 'ab-pino');
    // Diz ao navegador que é um botão comum.
    pino.type = 'button';
    // Nome do cursor, para quem usa leitor de tela.
    pino.setAttribute('aria-label', d.dica);
    // Coloca o cursor no lugar inicial.
    pino.style.left = cursor * 100 + '%';
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Largura da régua em pontinhos.
    const largura = regua.getBoundingClientRect().width;
    // Quanto o dedo precisa andar até a estação.
    const andar = (alvo - cursor) * largura;
    // Som de chiado, criado no primeiro movimento.
    let som = null;
    // Onde o cursor estava quando o dedo encostou.
    const base = cursor;
    // Espera a pessoa achar a estação.
    await K.arrasta(pino, {
      // Caminho até a estação.
      rumo: [Math.round(andar), 0],
      // Enquanto o dedo anda, o cursor vai junto.
      move: (dx) => {
        // Liga o chiado na primeira vez.
        if (!som) som = chiado();
        // Novo lugar do cursor, sem sair da régua.
        cursor = Math.max(0, Math.min(1, base + dx / largura));
        // Move o cursor.
        pino.style.left = cursor * 100 + '%';
        // Quão perto da estação, de 0 a 1.
        sintonia = Math.max(0, 1 - Math.abs(cursor - alvo) / (folga * 2.4));
        // Mostra o número da estação.
        visor.textContent = (inicio + (cursor / alvo) * (freq - inicio)).toFixed(1);
        // Ajusta o som.
        if (som) som.ajusta(sintonia);
        // Tira a frase que ensina.
        dica.classList.add('some');
      },
      // Quando soltar, confere se chegou.
      solta: () => Math.abs(cursor - alvo) <= folga
    });
    // Coloca o número certo.
    visor.textContent = freq.toFixed(1);
    // Leva o cursor para o lugar exato.
    pino.style.left = alvo * 100 + '%';
    // Limpa o resto do ruído.
    await E.anima(sintonia, 1, 600, (v) => {
      // Guarda.
      trava = v;
      // Ajusta o som.
      if (som) som.ajusta(v);
    });
    // Desliga o som depois de 1 segundo.
    setTimeout(() => som && som.parar(), 1000);
    // Tira a régua, para a frase final ter espaço.
    regua.classList.add('some');
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };

  /* ---------- salto: segure o dedo e acelere ---------- */

  // Salto: segure o dedo para acelerar até o clarão.
  E.salto = async (caixa, d, liga) => {
    // Modo: espaco, tempo, subida ou estrada.
    const modo = d.modo || 'espaco';
    // Cor de destaque do tema.
    const corA = Luz.tema('--ac');
    // Segunda cor do tema.
    const corB = Luz.tema('--ac2');
    // Cor de fundo: a do tema bem escurecida.
    const fundo = Luz.fundo().map((c) => c * 0.25);
    // Velocidade de 0 a 1.
    let p = 0;
    // Quantos traços voam na tela. Número maior = mais cheio.
    const total = 320;
    // Cria os traços em lugares sorteados.
    const estrelas = Array.from({ length: total }, () => ({
      // Lugar no lado, de -1 a 1.
      x: U.rand(-1, 1),
      // Lugar na altura, de -1 a 1.
      y: U.rand(-1, 1),
      // Distância, de perto a longe.
      z: U.rand(0.05, 1),
      // Mistura entre as duas cores.
      c: Math.random()
    }));
    // Distância percorrida na estrada.
    let andou = 0;
    // Cria o quadro de desenho.
    const lousa = Luz.lousa(caixa, (cx, W, H, t, dt) => {
      // Rastro: pinta por cima com um pouco de transparência.
      cx.fillStyle = css(fundo, 0.42);
      // Pinta tudo.
      cx.fillRect(0, 0, W, H);
      // Velocidade dos traços. Número maior = mais rápido no fim.
      const vel = 0.06 + p * p * 2.6;
      // Lado maior da tela.
      const M = Math.max(W, H);
      // Centro do desenho no lado.
      const ox = W / 2;
      // Centro do desenho na altura. Na estrada, fica no horizonte.
      const oy = modo === 'estrada' ? H * 0.46 : H / 2;
      // Soma a distância percorrida.
      andou += vel * dt * 6;
      // Estrada: desenha o chão primeiro.
      if (modo === 'estrada') {
        // Cor do asfalto.
        cx.fillStyle = css(fundo.map((c) => c * 0.6 + 0.02));
        // Começa o desenho da pista.
        cx.beginPath();
        // Ponta da pista, lá no horizonte.
        cx.moveTo(ox, oy);
        // Canto direito embaixo.
        cx.lineTo(W * 1.1, H);
        // Canto esquerdo embaixo.
        cx.lineTo(-W * 0.1, H);
        // Fecha.
        cx.closePath();
        // Pinta.
        cx.fill();
        // Faixas do meio da pista.
        for (let i = 0; i < 9; i++) {
          // Lugar da faixa, de 0 (horizonte) a 1 (perto).
          const a = (i / 9 + andou) % 1;
          // Perto parece mais espaçado.
          const y1 = oy + (H - oy) * a * a;
          // Fim da faixa.
          const y2 = oy + (H - oy) * Math.pow(Math.min(1, a + 0.045), 2);
          // Largura da faixa.
          const larg = (0.5 + 12 * a * a) * (M / 800);
          // Cor da faixa.
          cx.fillStyle = css(corB, 0.85);
          // Pinta a faixa.
          cx.fillRect(ox - larg / 2, y1, larg, y2 - y1);
        }
      }
      // Desenha cada traço.
      for (const e of estrelas) {
        // Guarda a distância de antes.
        const z0 = e.z;
        // Aproxima o traço.
        e.z -= vel * dt;
        // Passou da tela: volta para longe.
        if (e.z <= 0.02) {
          // Longe.
          e.z = 1;
          // Sorteia outro lugar.
          e.x = U.rand(-1, 1);
          // Sorteia outro lugar.
          e.y = U.rand(-1, 1);
          // Pula este quadro.
          continue;
        }
        // Subida: os traços só descem, como andares passando.
        if (modo === 'subida') {
          // Lugar no lado.
          const x = ox + e.x * W * 0.55;
          // Lugar na altura.
          const y = ((e.y + 1) / 2 + andou * (0.4 + e.c)) % 1;
          // Tamanho do traço. Número maior = traço mais comprido.
          const alto = (0.01 + p * p * 0.34) * H;
          // Cor do traço.
          cx.strokeStyle = css(mistura(corA, corB, e.c), 0.65);
          // Grossura do traço.
          cx.lineWidth = 0.7 + e.c * 1.6;
          // Começa o traço.
          cx.beginPath();
          // Ponta de cima.
          cx.moveTo(x, y * H * 1.3 - alto);
          // Ponta de baixo.
          cx.lineTo(x, y * H * 1.3);
          // Traça.
          cx.stroke();
          // Passa para o próximo.
          continue;
        }
        // Estrada: traços só nos lados da pista.
        if (modo === 'estrada' && Math.abs(e.x) < 0.5 && e.y > 0) e.y = -e.y;
        // Lugar do traço na tela, agora.
        const x1 = ox + (e.x / e.z) * M * 0.28;
        // Lugar do traço na tela, agora.
        const y1 = oy + (e.y / e.z) * M * 0.28;
        // Lugar do traço na tela, antes.
        const x0 = ox + (e.x / (z0 + vel * 0.03)) * M * 0.28;
        // Lugar do traço na tela, antes.
        const y0 = oy + (e.y / (z0 + vel * 0.03)) * M * 0.28;
        // Cor do traço: mais forte quando perto.
        cx.strokeStyle = css(mistura(mistura(corA, corB, e.c), [1, 1, 1], p * 0.6), Math.min(1, (1 - e.z) * 1.6));
        // Traço perto é mais grosso.
        cx.lineWidth = 0.5 + (1 - e.z) * 2.4;
        // Começa o traço.
        cx.beginPath();
        // Ponta de trás.
        cx.moveTo(x0, y0);
        // Ponta da frente.
        cx.lineTo(x1, y1);
        // Traça.
        cx.stroke();
      }
    });
    // Guarda para desligar no fim.
    liga(lousa);
    // A frase grande.
    const titulo = K.add(caixa, 'h1', 'ab-titulo', d.titulo);
    // Lugar do número grande.
    const visor = K.add(caixa, 'b', 'ab-contador');
    // O número.
    const numero = K.add(visor, 'span', null, String(d.de));
    // A palavra depois do número, em letra menor.
    if (d.unidade) K.add(visor, 'small', null, d.unidade);
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Camada que ouve o dedo.
    const pele = E.pele(caixa);
    // Espera 3 segundos com o dedo encostado. Número maior = mais demora.
    await K.segura(pele, 3000, (v) => {
      // Guarda a velocidade.
      p = v;
      // Calcula o número da contagem.
      const n = d.de + (d.ate - d.de) * Math.pow(v, 1.4);
      // Mostra sem casas depois da vírgula.
      numero.textContent = Math.round(n);
      // O número cresce com a velocidade.
      visor.style.setProperty('--p', v);
      // Tira a frase que ensina quando começar a acelerar.
      dica.classList.toggle('some', v > 0.02);
    });
    // Tira a camada.
    pele.remove();
    // Tira a frase grande.
    titulo.remove();
    // Tira a frase que ensina.
    dica.remove();
    // Som de chegada.
    K.som(90, 500, 'sine', 0.12);
    // Solta o clarão.
    E.clarao(caixa);
    // Freia de repente.
    p = 0.12;
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };

  /* ---------- neon: desenhe e o letreiro acende ---------- */

  // Distribui 'n' pontos igualmente ao longo de um caminho.
  const reparte = (lista, n) => {
    // Tamanho de cada trecho.
    const trechos = lista.slice(1).map((p, i) => Math.hypot(p[0] - lista[i][0], p[1] - lista[i][1]));
    // Tamanho do caminho inteiro.
    const total = trechos.reduce((a, b) => a + b, 0);
    // Lista final.
    const fora = [];
    // Trecho atual.
    let k = 0;
    // Quanto já andou até o começo do trecho atual.
    let andou = 0;
    // Cria cada ponto.
    for (let i = 0; i < n; i++) {
      // Distância deste ponto desde o começo.
      const alvo = (i / (n - 1)) * total;
      // Anda até o trecho certo.
      while (k < trechos.length - 1 && andou + trechos[k] < alvo) andou += trechos[k++];
      // Quanto do trecho, de 0 a 1.
      const f = trechos[k] ? (alvo - andou) / trechos[k] : 0;
      // Guarda o ponto.
      fora.push([lista[k][0] + (lista[k + 1][0] - lista[k][0]) * f, lista[k][1] + (lista[k + 1][1] - lista[k][1]) * f]);
    }
    // Entrega.
    return fora;
  };

  // Desenhos do neon, feitos em uma folha de -1 a 1.
  const FORMAS = {
    // Coração, pela conta clássica.
    coracao: () => {
      // Lista de pontos.
      const l = [];
      // Dá uma volta inteira.
      for (let i = 0; i <= 120; i++) {
        // Ângulo.
        const t = (i / 120) * Math.PI * 2;
        // Guarda o ponto.
        l.push([
          (16 * Math.pow(Math.sin(t), 3)) / 17,
          -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 17
        ]);
      }
      // Entrega.
      return l;
    },
    // Árvore de Natal, com três andares e o tronco.
    arvore: () => [
      [0, -1],
      [0.36, -0.52],
      [0.16, -0.52],
      [0.6, -0.04],
      [0.3, -0.04],
      [0.84, 0.5],
      [0.14, 0.5],
      [0.14, 0.86],
      [-0.14, 0.86],
      [-0.14, 0.5],
      [-0.84, 0.5],
      [-0.3, -0.04],
      [-0.6, -0.04],
      [-0.16, -0.52],
      [-0.36, -0.52],
      [0, -1]
    ],
    // Assinatura: voltinhas que andam para a direita e um risco embaixo.
    assinatura: () => {
      // Lista de pontos.
      const l = [];
      // Anda da esquerda para a direita.
      for (let i = 0; i <= 150; i++) {
        // Quanto já andou, de 0 a 1.
        const s = i / 150;
        // Guarda o ponto: anda para a direita fazendo voltinhas, como letra cursiva.
        l.push([-0.95 + s * 1.9 + Math.sin(s * 30) * 0.15, Math.cos(s * 30) * 0.32 * (1 - s * 0.6) - 0.08]);
      }
      // Risco final, voltando por baixo.
      l.push([0.7, 0.32], [-0.72, 0.46]);
      // Entrega.
      return l;
    }
  };

  // Neon: desenhe por cima do tubo apagado e ele acende.
  E.neon = async (caixa, d, liga) => {
    // Quantos pontos o tubo tem.
    const n = 150;
    // Pontos do desenho.
    const forma = reparte((FORMAS[d.forma] || FORMAS.coracao)(), n);
    // Quais pontos já acenderam.
    const aceso = new Array(n).fill(false);
    // Cor principal do neon.
    const cor = Luz.tema('--ac');
    // Tamanho do desenho na tela.
    const raio = () => Math.min(innerWidth * 0.4, innerHeight * 0.27);
    // Lugar do centro do desenho, na altura.
    const centroY = () => innerHeight * 0.55;
    // Transforma um ponto da folha em lugar na tela.
    const tela = (p) => [innerWidth / 2 + p[0] * raio(), centroY() + p[1] * raio()];
    // Marca o fim, quando tudo fica aceso.
    let tudo = 0;
    // Cria o quadro de desenho.
    const lousa = Luz.lousa(caixa, (cx, W, H, t) => {
      // Limpa o quadro.
      cx.clearRect(0, 0, W, H);
      // Cantos arredondados no tubo.
      cx.lineJoin = 'round';
      // Pontas arredondadas no tubo.
      cx.lineCap = 'round';
      // Tubo apagado: cinza, meio transparente.
      cx.strokeStyle = 'rgba(255,255,255,.16)';
      // Grossura do tubo.
      cx.lineWidth = 5;
      // Começa o tubo.
      cx.beginPath();
      // Passa por cada ponto.
      forma.forEach((p, i) => {
        // Lugar na tela.
        const q = tela(p);
        // O primeiro ponto só coloca o lápis no lugar.
        if (i) cx.lineTo(q[0], q[1]);
        // Coloca o lápis no primeiro ponto.
        else cx.moveTo(q[0], q[1]);
      });
      // Traça.
      cx.stroke();
      // Tremida da luz, como neon de verdade.
      const treme = 0.86 + 0.14 * Math.sin(t * 47) * Math.sin(t * 13);
      // Três passadas: brilho largo, brilho médio e miolo branco.
      [
        [34, 0.1, cor],
        [16, 0.32, cor],
        [6, 1, mistura(cor, [1, 1, 1], 0.8)]
      ].forEach(([grossura, forca, c]) => {
        // Grossura desta passada.
        cx.lineWidth = grossura;
        // Cor desta passada.
        cx.strokeStyle = css(c, forca * treme);
        // Começa a passada.
        cx.beginPath();
        // Marca se o lápis está no papel.
        let desce = false;
        // Passa por cada ponto.
        forma.forEach((p, i) => {
          // Este ponto está aceso?
          const ligado = aceso[i] || i / n < tudo;
          // Apagado: levanta o lápis.
          if (!ligado) {
            // Levanta.
            desce = false;
            // Passa para o próximo.
            return;
          }
          // Lugar na tela.
          const q = tela(p);
          // Lápis no papel: continua a linha.
          if (desce) cx.lineTo(q[0], q[1]);
          // Lápis levantado: coloca no lugar.
          else cx.moveTo(q[0], q[1]);
          // Agora o lápis está no papel.
          desce = true;
        });
        // Traça.
        cx.stroke();
      });
    });
    // Guarda para desligar no fim.
    liga(lousa);
    // A frase grande.
    const titulo = K.add(caixa, 'h1', 'ab-titulo', d.titulo);
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Área onde o dedo desenha: o desenho com uma folga em volta.
    const area = K.add(caixa, 'div', 'ab-area');
    // Tamanho da folga.
    const folga = 46;
    // Lado esquerdo da área.
    area.style.left = innerWidth / 2 - raio() - folga + 'px';
    // Altura de cima da área.
    area.style.top = centroY() - raio() - folga + 'px';
    // Largura da área.
    area.style.width = (raio() + folga) * 2 + 'px';
    // Altura da área.
    area.style.height = (raio() + folga) * 2 + 'px';
    // Quantos pontos já acenderam.
    let acesos = 0;
    // Espera o dedo passar por cima de quase todo o desenho.
    await E.varre(area, 1, (parte, x, y) => {
      // Tira a frase que ensina.
      dica.classList.add('some');
      // Confere cada ponto.
      forma.forEach((p, i) => {
        // Já aceso: pula.
        if (aceso[i]) return;
        // Lugar do ponto na tela.
        const q = tela(p);
        // Perto do dedo: acende. Número maior = aceita mais longe.
        if (Math.hypot(q[0] - x, q[1] - y) < 52) {
          // Acende.
          aceso[i] = true;
          // Soma mais um.
          acesos++;
        }
      });
      // A parede clareia junto.
      caixa.style.setProperty('--brilho', acesos / n);
      // Som de neon, de vez em quando.
      if (Math.random() < 0.08) K.som(120, 50, 'sawtooth', 0.015);
      // Termina com 65% aceso. Número maior = precisa desenhar mais.
      return acesos / n >= 0.65;
    });
    // Som de neon ligando.
    K.som(90, 300, 'sawtooth', 0.04);
    // O resto acende sozinho.
    await E.anima(0, 1, 500, (v) => {
      // Guarda.
      tudo = v;
    });
    // A parede clareia inteira.
    caixa.style.setProperty('--brilho', 1);
    // A frase grande acende.
    titulo.classList.add('aceso');
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };

  /* ---------- circuito: ligue os dois polos ---------- */

  // Forma do coração feito de luzinhas: # é uma luzinha, ponto é vazio.
  const LUZINHAS = ['.##..##.', '########', '########', '.######.', '..####..', '...##...'];

  // Circuito: arraste o fio de um polo até o outro.
  E.circuito = async (caixa, d, liga) => {
    // Largura da tela.
    const W0 = innerWidth;
    // Altura da tela.
    const H0 = innerHeight;
    // Distância entre os pontos da grade do circuito.
    const passo = Math.max(18, Math.min(W0, H0) * 0.055);
    // Centro das luzinhas no lado.
    const cx0 = W0 / 2;
    // Centro das luzinhas na altura.
    const cy0 = H0 * 0.5;
    // Metade da largura do bloco de luzinhas.
    const lado = Math.min(W0, H0) * 0.3;
    // Lista dos caminhos de cobre.
    const trilhas = [];
    // Cria 46 caminhos. Número maior = placa mais cheia.
    for (let k = 0; k < 46; k++) {
      // Sorteia de qual borda começa: 0 esquerda, 1 direita, 2 topo, 3 base.
      const b = Math.floor(Math.random() * 4);
      // Lugar inicial no lado.
      let x = b === 0 ? 0 : b === 1 ? W0 : Math.round(U.rand(0, W0) / passo) * passo;
      // Lugar inicial na altura.
      let y = b === 2 ? 0 : b === 3 ? H0 : Math.round(U.rand(0, H0) / passo) * passo;
      // Pontos deste caminho.
      const c = [[x, y]];
      // Anda até perto das luzinhas.
      for (let i = 0; i < 60 && (Math.abs(x - cx0) > lado * 1.1 || Math.abs(y - cy0) > lado * 0.95); i++) {
        // Direção até o centro, no lado.
        const dx = Math.sign(cx0 - x);
        // Direção até o centro, na altura.
        const dy = Math.sign(cy0 - y);
        // Sorteia o jeito de andar.
        const r = Math.random();
        // Anda na diagonal.
        if (r < 0.3) {
          // Anda no lado.
          x += dx * passo;
          // Anda na altura.
          y += dy * passo;
          // Anda reto no lado.
        } else if (r < 0.65) x += dx * passo;
        // Anda reto na altura.
        else y += dy * passo;
        // Guarda o ponto.
        c.push([x, y]);
      }
      // Guarda o caminho.
      trilhas.push(c);
    }
    // Lugar do polo onde o fio nasce.
    const polo1 = [W0 * 0.14, H0 * 0.8];
    // Lugar do polo onde o fio precisa chegar.
    const polo2 = [W0 * 0.86, H0 * 0.8];
    // Lugar atual da ponta do fio.
    const ponta = polo1.slice();
    // Corrente elétrica, de 0 a 1.
    let corrente = 0;
    // Cor das luzinhas.
    const cor = Luz.tema('--ac');
    // Cria o quadro de desenho.
    const lousa = Luz.lousa(caixa, (cx, W, H, t) => {
      // Limpa o quadro.
      cx.clearRect(0, 0, W, H);
      // Pontas arredondadas.
      cx.lineCap = 'round';
      // Cantos arredondados.
      cx.lineJoin = 'round';
      // Desenha cada caminho de cobre.
      for (const c of trilhas) {
        // Cor do cobre apagado: dourado escuro. Com corrente, clareia.
        cx.strokeStyle = corrente ? css(mistura([0.62, 0.5, 0.22], cor, corrente), 0.4 + corrente * 0.6) : 'rgba(170,136,70,.42)';
        // Grossura do cobre.
        cx.lineWidth = 1.6;
        // Começa o caminho.
        cx.beginPath();
        // Primeiro ponto.
        cx.moveTo(c[0][0], c[0][1]);
        // Liga os pontos.
        for (let i = 1; i < c.length; i++) cx.lineTo(c[i][0], c[i][1]);
        // Traça.
        cx.stroke();
        // Último ponto do caminho.
        const f = c[c.length - 1];
        // Cor da bolinha de solda.
        cx.fillStyle = 'rgba(214,180,96,.8)';
        // Começa a bolinha.
        cx.beginPath();
        // Desenha a bolinha.
        cx.arc(f[0], f[1], 2.6, 0, 7);
        // Pinta.
        cx.fill();
        // Faísca correndo pelo caminho.
        if (corrente > 0 && corrente < 1) {
          // Lugar da faísca no caminho.
          const q = c[Math.min(c.length - 1, Math.floor(corrente * c.length))];
          // Cor da faísca: branco.
          cx.fillStyle = '#fff';
          // Começa a faísca.
          cx.beginPath();
          // Desenha a faísca.
          cx.arc(q[0], q[1], 3, 0, 7);
          // Pinta.
          cx.fill();
        }
      }
      // Tamanho de cada luzinha.
      const tam = (lado * 2) / 9;
      // Desenha as luzinhas.
      LUZINHAS.forEach((linha, l) => {
        // Anda na linha.
        [...linha].forEach((v, c) => {
          // Lugar vazio: pula.
          if (v !== '#') return;
          // Lugar da luzinha no lado.
          const x = cx0 + (c - 3.5) * tam;
          // Lugar da luzinha na altura.
          const y = cy0 + (l - 2.5) * tam;
          // A luz sobe de baixo para cima.
          const liga2 = Math.max(0, Math.min(1, corrente * 9 - (5 - l) * 1.2 - 2));
          // Brilho em volta.
          if (liga2 > 0) {
            // Cor do brilho.
            cx.fillStyle = css(cor, 0.22 * liga2);
            // Começa o brilho.
            cx.beginPath();
            // Desenha o brilho.
            cx.arc(x, y, tam * 0.72, 0, 7);
            // Pinta.
            cx.fill();
          }
          // Cor da luzinha: escura quando apagada.
          cx.fillStyle = css(mistura([0.09, 0.2, 0.17], mistura(cor, [1, 1, 1], 0.35), liga2));
          // Começa a luzinha.
          cx.beginPath();
          // Desenha a luzinha.
          cx.arc(x, y, tam * 0.34, 0, 7);
          // Pinta.
          cx.fill();
        });
      });
      // Fio solto, que balança enquanto a pessoa arrasta.
      cx.strokeStyle = css(mistura(cor, [1, 1, 1], 0.3));
      // Grossura do fio.
      cx.lineWidth = 3.5;
      // Começa o fio.
      cx.beginPath();
      // Sai do polo.
      cx.moveTo(polo1[0], polo1[1]);
      // Faz uma barriga para baixo, como um fio de verdade.
      cx.quadraticCurveTo((polo1[0] + ponta[0]) / 2, Math.max(polo1[1], ponta[1]) + 46 + Math.sin(t * 3) * 3, ponta[0], ponta[1]);
      // Traça.
      cx.stroke();
      // Desenha os dois polos.
      [polo1, polo2].forEach((p) => {
        // Cor do polo: dourado.
        cx.strokeStyle = '#e0bb68';
        // Grossura da argola.
        cx.lineWidth = 4;
        // Começa a argola.
        cx.beginPath();
        // Desenha a argola.
        cx.arc(p[0], p[1], 15, 0, 7);
        // Traça.
        cx.stroke();
      });
      // Bolinha pulsando na ponta do fio.
      cx.fillStyle = css(mistura(cor, [1, 1, 1], 0.5));
      // Começa a bolinha.
      cx.beginPath();
      // Desenha a bolinha. Ela pulsa para chamar atenção.
      cx.arc(ponta[0], ponta[1], 10 + Math.sin(t * 5) * 2, 0, 7);
      // Pinta.
      cx.fill();
    });
    // Guarda para desligar no fim.
    liga(lousa);
    // A frase grande.
    K.add(caixa, 'h1', 'ab-titulo', d.titulo);
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Alça invisível em cima da ponta do fio.
    const alca = K.add(caixa, 'button', 'ab-alca');
    // Diz ao navegador que é um botão comum.
    alca.type = 'button';
    // Nome da alça, para quem usa leitor de tela.
    alca.setAttribute('aria-label', d.dica);
    // Coloca a alça em cima do polo: lado.
    alca.style.left = polo1[0] + 'px';
    // Coloca a alça em cima do polo: altura.
    alca.style.top = polo1[1] + 'px';
    // Tamanho da alça.
    alca.style.width = alca.style.height = '84px';
    // Espera ligar o fio no outro polo.
    await K.arrasta(alca, {
      // Caminho até o outro polo.
      rumo: [Math.round(polo2[0] - polo1[0]), Math.round(polo2[1] - polo1[1])],
      // Enquanto o dedo anda, a ponta do fio vai junto.
      move: (dx, dy) => {
        // Lugar da ponta: lado.
        ponta[0] = polo1[0] + dx;
        // Lugar da ponta: altura.
        ponta[1] = polo1[1] + dy;
        // Tira a frase que ensina.
        dica.classList.add('some');
      },
      // Quando soltar, confere se chegou no outro polo.
      solta: (dx, dy) => {
        // Distância até o outro polo.
        const falta = Math.hypot(polo1[0] + dx - polo2[0], polo1[1] + dy - polo2[1]);
        // Chegou perto: conta. Número maior = aceita mais longe.
        const foi = falta < 70;
        // Não chegou: o fio volta.
        if (!foi) ponta.splice(0, 2, polo1[0], polo1[1]);
        // Entrega se conseguiu.
        return foi;
      }
    });
    // Encaixa o fio no polo.
    ponta.splice(0, 2, polo2[0], polo2[1]);
    // Som de energia ligando.
    K.som(60, 500, 'sawtooth', 0.06);
    // A corrente corre pelos caminhos.
    await E.anima(0, 1, 1300, (v) => {
      // Guarda.
      corrente = v;
    });
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };

  /* ---------- gravidade: letras gigantes que caem ---------- */

  // Gravidade: encoste nas letras gigantes e elas caem.
  E.gravidade = async (caixa, d, liga) => {
    // Espera a letra chegar.
    await Luz.letras(['900 40px "Big Shoulders Display"']);
    // Cor das letras.
    const tinta = E.tinta(Luz.tema('--ac'));
    // Avisa o CSS da cor das letras.
    caixa.style.setProperty('--tinta', tinta);
    // A frase escondida atrás das letras.
    K.add(caixa, 'p', 'ab-escondido', d.escondido);
    // Largura da tela.
    const W = innerWidth;
    // Altura da tela.
    const H = innerHeight;
    // Tipo de letra.
    const fonte = (t) => '900 ' + t + 'px "Big Shoulders Display", Inter, sans-serif';
    // Pincel só para medir as letras.
    const medida = document.createElement('canvas').getContext('2d');
    // Acha o maior tamanho de letra que cabe na tela.
    const a = Luz.encaixa(medida, d.titulo.toUpperCase(), W * 0.92, H * 0.84, fonte, 0.92);
    // Escolhe a letra para medir.
    medida.font = fonte(a.tam);
    // Altura de cada linha.
    const alto = a.tam * a.passo;
    // Altura da primeira linha.
    const y0 = (H - a.linhas.length * alto) / 2 + alto / 2;
    // Lista das letras soltas.
    const letras = [];
    // Monta cada linha.
    a.linhas.forEach((l, i) => {
      // Largura da linha.
      const w = medida.measureText(l).width;
      // Onde a linha começa.
      let x = (W - w) / 2;
      // Passa por cada letra.
      for (const c of l) {
        // Largura desta letra.
        const lw = medida.measureText(c).width;
        // Espaço não vira peça.
        if (c !== ' ') {
          letras.push({
            // A letra.
            c,
            // Lugar no lado.
            x: x + lw / 2,
            // Lugar na altura.
            y: y0 + i * alto,
            // Velocidade no lado.
            vx: 0,
            // Velocidade na altura.
            vy: 0,
            // Inclinação.
            a: 0,
            // Velocidade da inclinação.
            va: 0,
            // Tamanho do corpo da letra.
            r: Math.max(lw, a.tam * 0.5) * 0.46,
            // Marca se a letra já caiu.
            solta: false
          });
        }
        // Anda para a próxima letra.
        x += lw;
      }
    });
    // Conta as letras caídas.
    let soltas = 0;
    // Solta uma letra.
    const larga = (l, vx, vy) => {
      // Já caiu: não faz nada.
      if (l.solta) return;
      // Marca como caída.
      l.solta = true;
      // Soma mais uma.
      soltas++;
      // Dá o empurrão no lado.
      l.vx = vx;
      // Dá o empurrão na altura.
      l.vy = vy;
      // Dá um giro sorteado.
      l.va = U.rand(-6, 6);
      // Som de batida.
      K.som(U.rand(90, 170), 90, 'triangle', 0.06);
    };
    // Gravidade. Número maior = cai mais rápido.
    const gravidade = 2200;
    // Cria o quadro de desenho.
    const lousa = Luz.lousa(caixa, (cx, W2, H2, t, dt) => {
      // Limpa o quadro.
      cx.clearRect(0, 0, W2, H2);
      // Anda com cada letra caída.
      for (const l of letras) {
        // Parada: pula.
        if (!l.solta) continue;
        // Cai mais rápido.
        l.vy += gravidade * dt;
        // Anda no lado.
        l.x += l.vx * dt;
        // Anda na altura.
        l.y += l.vy * dt;
        // Inclina.
        l.a += l.va * dt;
        // Bateu no chão.
        if (l.y > H2 - l.r) {
          // Fica no chão.
          l.y = H2 - l.r;
          // Quica um pouco. Número maior = quica mais.
          l.vy *= -0.32;
          // O chão freia.
          l.vx *= 0.8;
          // O chão freia o giro.
          l.va *= 0.7;
        }
        // Bateu na parede esquerda.
        if (l.x < l.r) {
          // Fica na parede.
          l.x = l.r;
          // Volta.
          l.vx *= -0.5;
        }
        // Bateu na parede direita.
        if (l.x > W2 - l.r) {
          // Fica na parede.
          l.x = W2 - l.r;
          // Volta.
          l.vx *= -0.5;
        }
      }
      // Letras caídas batem umas nas outras.
      for (let i = 0; i < letras.length; i++) {
        // Compara com as próximas.
        for (let j = i + 1; j < letras.length; j++) {
          // Primeira letra.
          const a2 = letras[i];
          // Segunda letra.
          const b = letras[j];
          // Só conta se alguma caiu.
          if (!a2.solta && !b.solta) continue;
          // Distância no lado.
          const dx = b.x - a2.x;
          // Distância na altura.
          const dy = b.y - a2.y;
          // Distância entre as duas.
          const dist = Math.hypot(dx, dy) || 1;
          // Quanto uma entrou na outra.
          const entrou = a2.r + b.r - dist;
          // Não encostaram: pula.
          if (entrou <= 0) continue;
          // Letra caindo em cima de letra parada: derruba a parada também.
          if (!a2.solta && b.vy > 300) larga(a2, b.vx * 0.5, b.vy * 0.3);
          // Letra caindo em cima de letra parada: derruba a parada também.
          if (!b.solta && a2.vy > 300) larga(b, a2.vx * 0.5, a2.vy * 0.3);
          // Direção do empurrão, no lado.
          const nx = dx / dist;
          // Direção do empurrão, na altura.
          const ny = dy / dist;
          // Empurra a primeira letra.
          if (a2.solta) {
            // Empurra no lado.
            a2.x -= nx * entrou * 0.5;
            // Empurra na altura.
            a2.y -= ny * entrou * 0.5;
            // Perde um pouco de velocidade.
            a2.vx *= 0.96;
          }
          // Empurra a segunda letra.
          if (b.solta) {
            // Empurra no lado.
            b.x += nx * entrou * 0.5;
            // Empurra na altura.
            b.y += ny * entrou * 0.5;
            // Perde um pouco de velocidade.
            b.vx *= 0.96;
          }
        }
      }
      // Escolhe a letra.
      cx.font = fonte(a.tam);
      // Cor das letras.
      cx.fillStyle = tinta;
      // Centraliza.
      cx.textAlign = 'center';
      // Centraliza na altura.
      cx.textBaseline = 'middle';
      // Desenha cada letra.
      for (const l of letras) {
        // Guarda o pincel como está.
        cx.save();
        // Vai até o lugar da letra.
        cx.translate(l.x, l.y);
        // Inclina.
        cx.rotate(l.a);
        // Escreve.
        cx.fillText(l.c, 0, 0);
        // Volta o pincel para como estava.
        cx.restore();
      }
    });
    // Guarda para desligar no fim.
    liga(lousa);
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Camada que ouve o dedo.
    const pele = E.pele(caixa);
    // Última posição do dedo.
    let ux = null;
    // Última posição do dedo.
    let uy = null;
    // Espera derrubar 65% das letras. Número maior = precisa derrubar mais.
    await E.varre(pele, 1, (parte, x, y) => {
      // Tira a frase que ensina.
      dica.classList.add('some');
      // Velocidade do dedo no lado.
      const vx = ux == null ? 0 : (x - ux) * 30;
      // Velocidade do dedo na altura.
      const vy = uy == null ? 0 : (y - uy) * 30;
      // Guarda a posição.
      ux = x;
      // Guarda a posição.
      uy = y;
      // Confere cada letra.
      for (const l of letras) {
        // Longe do dedo: pula. Número maior = o dedo alcança mais longe.
        if (Math.hypot(l.x - x, l.y - y) > l.r + 24) continue;
        // Solta a letra, ou empurra se já tiver caído.
        if (!l.solta) larga(l, vx, vy);
        // Já caída: empurra.
        else {
          // Empurra no lado.
          l.vx += vx * 0.3;
          // Empurra na altura.
          l.vy += vy * 0.3;
        }
      }
      // Termina quando caírem 65%.
      return soltas / letras.length >= 0.65;
    });
    // Tira a camada.
    pele.remove();
    // Derruba o resto, uma por uma.
    for (const l of letras) {
      // Já caída: pula.
      if (l.solta) continue;
      // Derruba.
      larga(l, U.rand(-120, 120), 0);
      // Espera um pouquinho.
      await U.esperar(60);
    }
    // A frase escondida aparece.
    caixa.classList.add('revelou');
    // Dá tempo de ler.
    await U.esperar(1400);
    // Mostra a frase final.
    await E.fecha(caixa, d, 2200);
  };

  /* ---------- orbita: puxe, solte e entre em órbita ---------- */

  // Desenha um coração cheio no lugar pedido.
  const coracao = (cx, x, y, r) => {
    // Começa o desenho.
    cx.beginPath();
    // Desenha ponto por ponto.
    for (let i = 0; i <= 60; i++) {
      // Ângulo.
      const t = (i / 60) * Math.PI * 2;
      // Lugar no lado.
      const px = x + (r * 16 * Math.pow(Math.sin(t), 3)) / 17;
      // Lugar na altura.
      const py = y - (r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))) / 17;
      // Liga até este ponto.
      cx.lineTo(px, py);
    }
    // Fecha o desenho.
    cx.closePath();
    // Pinta.
    cx.fill();
  };

  // Órbita: puxe a bolinha, solte, e ela fica rodando em volta do coração.
  E.orbita = async (caixa, d, liga) => {
    // Largura da tela.
    const W0 = innerWidth;
    // Altura da tela.
    const H0 = innerHeight;
    // Centro do desenho no lado.
    const ox = W0 / 2;
    // Centro do desenho na altura.
    const oy = H0 * 0.47;
    // Distância da órbita até o centro.
    const R = Math.min(W0, H0) * 0.34;
    // Lugar onde a bolinha nasce: do lado direito, um pouco para baixo.
    const casa = [ox + R, oy + R * 0.32];
    // A bolinha.
    const b = { x: casa[0], y: casa[1] };
    // Distância da bolinha até o centro, depois de solta.
    let raio = R;
    // Ângulo da bolinha, depois de solta.
    let angulo = 0;
    // Velocidade do giro, depois de solta.
    let giro = 0;
    // Rastro da bolinha.
    const rastro = [];
    // Marca se a bolinha já foi solta.
    let solta = false;
    // Quanto a bolinha já girou.
    let voltas = 0;
    // Marca o fim, quando a bolinha cai no centro.
    let fim = 0;
    // Quanto o coração do meio pulsa.
    let pulso = 0;
    // Cor de destaque do tema.
    const corA = Luz.tema('--ac');
    // Segunda cor do tema.
    const corB = Luz.tema('--ac2');
    // Cor de fundo: a do tema bem escurecida.
    const fundo = Luz.fundo().map((c) => c * 0.3);
    // Estrelas de fundo.
    const estrelas = Array.from({ length: 90 }, () => [Math.random(), Math.random(), Math.random()]);
    // Cria o quadro de desenho.
    const lousa = Luz.lousa(caixa, (cx, W, H, t, dt) => {
      // Pinta o fundo.
      cx.fillStyle = css(fundo);
      // Pinta tudo.
      cx.fillRect(0, 0, W, H);
      // Desenha as estrelas.
      for (const e of estrelas) {
        // Cor da estrela: branco, com brilho que vai e volta.
        cx.fillStyle = 'rgba(255,255,255,' + (0.15 + 0.4 * e[2] * (0.6 + 0.4 * Math.sin(t * 2 + e[0] * 20))) + ')';
        // Pinta a estrela.
        cx.fillRect(e[0] * W, e[1] * H, 1.6, 1.6);
      }
      // Linha da órbita, tracejada.
      cx.setLineDash([3, 9]);
      // Cor da linha: branco, meio transparente.
      cx.strokeStyle = 'rgba(255,255,255,.22)';
      // Grossura da linha.
      cx.lineWidth = 1;
      // Começa a linha.
      cx.beginPath();
      // Desenha o círculo.
      cx.arc(ox, oy, R, 0, 7);
      // Traça.
      cx.stroke();
      // Volta para a linha contínua.
      cx.setLineDash([]);
      // Bolinha em movimento.
      if (solta) {
        // Aproxima a bolinha da linha da órbita. Número maior = entra na órbita mais rápido.
        raio += (R - raio) * Math.min(1, dt * 2.6);
        // A velocidade vai acalmando até a velocidade certa.
        giro += (2.5 - giro) * Math.min(1, dt * 1.4);
        // Anda no círculo, no sentido de subir pela direita.
        angulo -= giro * dt;
        // Lugar da bolinha no lado.
        b.x = ox + Math.cos(angulo) * raio;
        // Lugar da bolinha na altura.
        b.y = oy + Math.sin(angulo) * raio;
        // Soma o giro.
        voltas += (giro * dt) / (Math.PI * 2);
        // Guarda o rastro.
        rastro.push([b.x, b.y]);
        // O rastro fica no máximo com 260 pontos. Número maior = rastro mais comprido.
        if (rastro.length > 260) rastro.shift();
      }
      // Desenha o rastro em pedaços, para ele ir sumindo.
      for (let i = 1; i < rastro.length; i++) {
        // Quanto mais novo, mais forte.
        const k = i / rastro.length;
        // Cor deste pedaço.
        cx.strokeStyle = css(mistura(corA, corB, k), k * k);
        // Grossura deste pedaço.
        cx.lineWidth = 0.6 + k * 3.2;
        // Começa o pedaço.
        cx.beginPath();
        // Ponta de trás.
        cx.moveTo(rastro[i - 1][0], rastro[i - 1][1]);
        // Ponta da frente.
        cx.lineTo(rastro[i][0], rastro[i][1]);
        // Traça.
        cx.stroke();
      }
      // Coração do meio: tamanho pulsando.
      const r = Math.min(W, H) * (0.1 + fim * 0.06) * (1 + Math.sin(t * 3) * 0.04 + pulso * 0.2);
      // Brilho em volta do coração.
      const brilho = cx.createRadialGradient(ox, oy, 0, ox, oy, r * 3.4);
      // Miolo do brilho.
      brilho.addColorStop(0, css(corA, 0.45));
      // Borda do brilho.
      brilho.addColorStop(1, css(corA, 0));
      // Usa o brilho.
      cx.fillStyle = brilho;
      // Pinta o brilho.
      cx.fillRect(ox - r * 3.4, oy - r * 3.4, r * 6.8, r * 6.8);
      // Cor do coração.
      cx.fillStyle = css(mistura(corA, [1, 1, 1], 0.2));
      // Desenha o coração.
      coracao(cx, ox, oy, r);
      // Elástico enquanto o dedo puxa.
      if (!solta) {
        // Cor do elástico: branco, meio transparente.
        cx.strokeStyle = 'rgba(255,255,255,.5)';
        // Grossura do elástico.
        cx.lineWidth = 2;
        // Começa o elástico.
        cx.beginPath();
        // Sai da casa.
        cx.moveTo(casa[0], casa[1]);
        // Vai até a bolinha.
        cx.lineTo(b.x, b.y);
        // Traça.
        cx.stroke();
      }
      // Tamanho do desenho da bolinha.
      const tam = Math.min(W, H) * 0.095;
      // Letra do desenho.
      cx.font = tam + 'px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
      // Centraliza.
      cx.textAlign = 'center';
      // Centraliza na altura.
      cx.textBaseline = 'middle';
      // Desenha a bolinha.
      cx.fillText(d.icone, b.x, b.y);
    });
    // Guarda para desligar no fim.
    liga(lousa);
    // A frase grande.
    const titulo = K.add(caixa, 'h1', 'ab-titulo', d.titulo);
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Alça invisível em cima da bolinha.
    const alca = K.add(caixa, 'button', 'ab-alca');
    // Diz ao navegador que é um botão comum.
    alca.type = 'button';
    // Nome da alça, para quem usa leitor de tela.
    alca.setAttribute('aria-label', d.dica);
    // Coloca a alça em cima da bolinha: lado.
    alca.style.left = casa[0] + 'px';
    // Coloca a alça em cima da bolinha: altura.
    alca.style.top = casa[1] + 'px';
    // Tamanho da alça.
    alca.style.width = alca.style.height = '96px';
    // Quanto a pessoa puxou: lado.
    let px = 0;
    // Quanto a pessoa puxou: altura.
    let py = 0;
    // Espera puxar e soltar.
    await K.arrasta(alca, {
      // Gesto esperado: para baixo.
      rumo: [0, 90],
      // Enquanto o dedo anda, a bolinha vai junto.
      move: (dx, dy) => {
        // Guarda quanto puxou.
        px = dx;
        // Guarda quanto puxou.
        py = dy;
        // Lugar da bolinha: lado.
        b.x = casa[0] + dx;
        // Lugar da bolinha: altura.
        b.y = casa[1] + dy;
        // Tira a frase que ensina.
        dica.classList.add('some');
      },
      // Quando soltar, confere se puxou bastante.
      solta: () => {
        // Puxou bastante? Número maior = precisa puxar mais.
        const foi = Math.hypot(px, py) > 26;
        // Não puxou: a bolinha volta.
        if (!foi) {
          // Volta no lado.
          b.x = casa[0];
          // Volta na altura.
          b.y = casa[1];
        }
        // Entrega se conseguiu.
        return foi;
      }
    });
    // Tira a alça.
    alca.remove();
    // Ângulo em que a bolinha foi solta.
    angulo = Math.atan2(b.y - oy, b.x - ox);
    // Distância em que a bolinha foi solta.
    raio = Math.hypot(b.x - ox, b.y - oy);
    // Puxão mais forte faz sair mais rápido. Número maior = sai mais rápido.
    giro = 3.4 + Math.min(4, Math.hypot(px, py) / 45);
    // A bolinha está solta.
    solta = true;
    // Som de estilingue.
    K.som(220, 260, 'triangle', 0.08);
    // Espera a bolinha dar 2 voltas. Número maior = mais voltas.
    while (voltas < 2) await U.esperar(80);
    // A frase grande sai.
    titulo.classList.add('some');
    // Som de encaixe.
    K.som(520, 300, 'sine', 0.08);
    // O coração cresce e pulsa.
    await E.anima(0, 1, 800, (v) => {
      // Guarda.
      fim = v;
      // Guarda.
      pulso = Math.sin(v * Math.PI);
    });
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };

  /* ---------- pixels: imagem quadriculada que fica nítida ---------- */

  // Pixels: cada toque deixa a imagem mais nítida.
  E.pixels = async (caixa, d, liga) => {
    // Espera a letra chegar.
    await Luz.letras(['800 40px Syne']);
    // Nitidez: até 2 pontinhos por pontinho da tela.
    const nitidez = Math.min(devicePixelRatio || 1, 2);
    // Largura da imagem.
    const w = Math.round(innerWidth * nitidez);
    // Altura da imagem.
    const h = Math.round(innerHeight * nitidez);
    // Cor de destaque do tema.
    const corA = Luz.tema('--ac');
    // Segunda cor do tema.
    const corB = Luz.tema('--ac2');
    // Cor escura da parte de baixo.
    const corF = Luz.fundo().map((c) => c * 0.7);
    // Escreve a frase em uma folha do tamanho da tela.
    const foto = Luz.molde(d.titulo, {
      // Largura.
      w,
      // Altura.
      h,
      // Tipo de letra.
      fonte: (t) => '800 ' + t + 'px Syne, Inter, sans-serif',
      // Lugar da frase: 8% da esquerda, 56% de cima, 84% de largura e 28% de altura.
      caixa: [0.08, 0.56, 0.84, 0.28],
      // Linhas juntinhas.
      entrelinha: 1.02
    });
    // Pega o pincel da foto.
    const fc = foto.getContext('2d');
    // Pinta o fundo por trás da frase.
    fc.globalCompositeOperation = 'destination-over';
    // Degradê de cima para baixo.
    const deg = fc.createLinearGradient(0, 0, 0, h);
    // Cor de cima.
    deg.addColorStop(0, css(corA));
    // Cor do meio.
    deg.addColorStop(0.42, css(corB));
    // Cor escura, onde a frase fica.
    deg.addColorStop(0.62, css(corF));
    // Cor de baixo.
    deg.addColorStop(1, css(corF));
    // Usa o degradê.
    fc.fillStyle = deg;
    // Pinta tudo.
    fc.fillRect(0, 0, w, h);
    // Volta a pintar por cima.
    fc.globalCompositeOperation = 'source-over';
    // Tamanho do desenho.
    const tam = Math.min(w, h) * 0.5;
    // Letra do desenho.
    fc.font = tam + 'px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
    // Centraliza.
    fc.textAlign = 'center';
    // Centraliza na altura.
    fc.textBaseline = 'middle';
    // Desenha o emoji.
    fc.fillText(d.icone, w / 2, h * 0.33);
    // Folha pequena, usada para quadricular.
    const mini = document.createElement('canvas');
    // Pincel da folha pequena.
    const mc = mini.getContext('2d');
    // Tamanho atual dos quadradinhos.
    let bloco = Math.min(innerWidth, innerHeight) * 0.14;
    // Lugar da linha que passa pela imagem, de 0 a 1.
    let linha = -1;
    // Cria o quadro de desenho.
    const lousa = Luz.lousa(caixa, (cx, W, H) => {
      // Quantos quadradinhos cabem na largura.
      const cw = Math.max(1, Math.round(W / bloco));
      // Quantos quadradinhos cabem na altura.
      const ch = Math.max(1, Math.round(H / bloco));
      // Ajusta a folha pequena.
      mini.width = cw;
      // Ajusta a folha pequena.
      mini.height = ch;
      // Encolhe a foto.
      mc.drawImage(foto, 0, 0, cw, ch);
      // Quadradinhos com a borda dura.
      cx.imageSmoothingEnabled = bloco < 1.5;
      // Aumenta de novo, agora quadriculada.
      if (bloco < 1.5) cx.drawImage(foto, 0, 0, W, H);
      // Aumenta de novo, agora quadriculada.
      else cx.drawImage(mini, 0, 0, W, H);
      // Linha de leitura, passando pela imagem.
      if (linha >= 0 && linha <= 1) {
        // Cor da linha: branco.
        cx.fillStyle = 'rgba(255,255,255,.9)';
        // Pinta a linha.
        cx.fillRect(0, linha * H, W, 3);
        // Brilho embaixo da linha: branco, bem transparente.
        cx.fillStyle = 'rgba(255,255,255,.14)';
        // Pinta o brilho.
        cx.fillRect(0, linha * H - 70, W, 70);
      }
    });
    // Guarda para desligar no fim.
    liga(lousa);
    // Número de aumento.
    const zoom = K.add(caixa, 'b', 'ab-zoom', '1×');
    // Frase que muda a cada toque.
    const estado = K.add(caixa, 'p', 'ab-estado', d.dica);
    // Camada que ouve o dedo.
    const pele = E.pele(caixa);
    // Tamanho dos quadradinhos depois de cada toque.
    const passos = [bloco * 0.5, bloco * 0.22, 1];
    // Aumento depois de cada toque.
    const aumentos = ['4×', '16×', '64×'];
    // Um toque para cada passo.
    for (let i = 0; i < passos.length; i++) {
      // Espera o toque.
      await K.toque(pele);
      // Som de leitura.
      K.som(300 + i * 160, 200, 'square', 0.03);
      // Mostra o novo aumento.
      zoom.textContent = aumentos[i];
      // Mostra a frase desta etapa.
      estado.textContent = d.etapas[i];
      // Tamanho de antes.
      const de = bloco;
      // A linha desce enquanto a imagem melhora.
      await E.anima(0, 1, 900, (v) => {
        // Lugar da linha.
        linha = v;
        // Tamanho dos quadradinhos.
        bloco = de + (passos[i] - de) * v;
      });
      // Esconde a linha.
      linha = -1;
    }
    // Tira a camada.
    pele.remove();
    // Tira o número de aumento.
    zoom.remove();
    // Tira a frase de etapa.
    estado.remove();
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };
})();
