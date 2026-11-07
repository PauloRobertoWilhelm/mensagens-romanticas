/* ==========================================================
   entradas-luz.js — as entradas desenhadas pela placa de vídeo:
   poeira, forma 3D, metal líquido, câmera térmica, tela que enche,
   defeito na imagem, água e lente de vidro.
   Os textos ficam em data/aberturas.js e o visual em css/aberturas.css.
   ========================================================== */

/* ==========================================================
   COMO LER ESTE ARQUIVO (explicado para quem nunca viu código)

   Este arquivo é o "cérebro": diz o que acontece e em que ordem.
   As cores e os tamanhos NÃO ficam aqui; ficam nos arquivos da pasta css.

   Cada linha que começa com // é só uma explicação: o computador ignora.
   Ela sempre fala da linha de código logo abaixo.

   Os trechos entre crases (`) são escritos na língua da placa de vídeo.
   Neles, cada linha com // também explica a linha de baixo.

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

  /* ---------- poeira: pontos soltos que viram palavras ---------- */

  // Programa que diz onde cada grão de poeira fica.
  const POEIRA_PONTO = `
    // Onde o grão nasce.
    attribute vec2 aIni;
    // Onde o grão precisa chegar para formar a letra.
    attribute vec2 aAlvo;
    // Quatro números sorteados para cada grão.
    attribute vec4 aSorte;
    // Segundos desde o começo.
    uniform float uTempo;
    // Quanto a frase já se formou, de 0 a 1.
    uniform float uP;
    // Explosão final, de 0 a 1.
    uniform float uFim;
    // Força do dedo, de 0 a 1.
    uniform float uToca;
    // Tamanho dos grãos. Número maior = grãos maiores.
    uniform float uTam;
    // Velocidade da queda. Número maior = cai mais rápido.
    uniform float uQueda;
    // Velocidade do giro. Número maior = gira mais rápido.
    uniform float uGiro;
    // Força dos grãos soltos. Número menor = grãos soltos mais apagados.
    uniform float uSolto;
    // Onde o dedo está, de -1 a 1.
    uniform vec2 uDedo;
    // Tamanho da tela.
    uniform vec2 uTela;
    // Cor de destaque.
    uniform vec3 uCorA;
    // Segunda cor de destaque.
    uniform vec3 uCorB;
    // Cor que vai para a pintura do grão.
    varying vec3 vCor;
    // Transparência que vai para a pintura do grão.
    varying float vAlfa;
    void main() {
      // Cada grão começa a andar em uma hora diferente.
      float atraso = aSorte.x * 0.55;
      // Quanto este grão já andou, de 0 a 1.
      float k = clamp((uP - atraso) / 0.45, 0.0, 1.0);
      // Faz o caminho começar e terminar devagar.
      k = k * k * (3.0 - 2.0 * k);
      // Tela comprida: corrige a conta para os círculos não virarem ovos.
      vec2 forma = vec2(1.0, uTela.x / uTela.y);
      // Posição do grão solto, em régua sem entortar.
      vec2 q = aIni / forma;
      // Quanto mais perto do centro, mais rápido gira.
      float a = uTempo * uGiro / (0.35 + length(q));
      // Gira o grão em volta do centro.
      q = mat2(cos(a), -sin(a), sin(a), cos(a)) * q;
      // Volta para a régua da tela.
      vec2 solto = q * forma;
      // Cai e volta por cima, como neve.
      solto.y = mod(solto.y - uTempo * uQueda * (0.4 + aSorte.w) + 1.0, 2.0) - 1.0;
      // Caminho até o dedo.
      vec2 ate = uDedo - solto;
      // Distância até o dedo, sem deixar a tela comprida entortar a conta.
      float r = length(ate / forma);
      // Grãos perto do dedo são puxados. Número maior = puxa mais longe.
      solto += ate * uToca * 0.5 * exp(-r * r * 5.0);
      // Mistura o grão solto com o lugar dele na letra.
      vec2 p = mix(solto, aAlvo, k);
      // Grão já na letra treme de leve, para a palavra parecer viva.
      p += k * 0.002 * vec2(sin(uTempo * 3.0 + aSorte.x * 40.0), cos(uTempo * 2.6 + aSorte.y * 40.0));
      // No fim, todos voam para fora.
      p += normalize(aAlvo + vec2(0.001)) * uFim * uFim * (1.2 + aSorte.y * 2.0);
      // Entrega a posição.
      gl_Position = vec4(p, 0.0, 1.0);
      // Grão solto é fininho, grão na letra é mais cheio. Alguns poucos saem bem grandes.
      gl_PointSize = uTam * mix(0.55 + aSorte.w * aSorte.w * 1.7 + pow(aSorte.w, 12.0) * 2.5, 1.15, k);
      // Escolhe a cor do grão entre as duas do tema.
      vCor = mix(uCorA, uCorB, aSorte.y);
      // Grão na letra fica mais claro.
      vCor = mix(vCor, vec3(1.0), k * 0.75);
      // Solto é mais apagado, na letra é mais forte.
      vAlfa = mix((0.16 + 0.5 * aSorte.z * aSorte.z) * uSolto, 0.8, k) * (1.0 - uFim);
    }
  `;

  // Programa que pinta cada grão de poeira.
  const POEIRA_COR = `
    // Cor que veio do programa de cima.
    varying vec3 vCor;
    // Transparência que veio do programa de cima.
    varying float vAlfa;
    void main() {
      // Distância até o centro do grão.
      float r = length(gl_PointCoord - 0.5);
      // Grão redondo, com a borda macia.
      gl_FragColor = vec4(vCor, smoothstep(0.5, 0.05, r) * vAlfa);
    }
  `;

  // Cor da poeira em cada modo. 'a' é a cor principal e 'b' é a segunda cor.
  const POEIRA_MODOS = {
    // Grãos de areia: laranja queimado e amarelo-claro, em faixas como dunas.
    areia: { a: '#e8a25c', b: '#ffe2a8', fundo: '#170c08', queda: 0, giro: 0, dunas: true },
    // Flocos de neve: azul-claro e branco, caindo.
    neve: { a: '#a9d6ff', b: '#ffffff', fundo: '#081322', queda: 0.05, giro: 0, chuva: true, solto: 0.32 },
    // Migalhas de biscoito: dourado e creme.
    migalhas: { a: '#d9a441', b: '#f6e2b3', fundo: '#140c05', queda: 0, giro: 0.03 }
  };

  // Sorteia um número em volta do zero: perto do zero sai mais, longe sai pouco.
  const curva = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

  // Poeira: o dedo varre os grãos e eles viram a frase.
  E.poeira = async (caixa, d, liga) => {
    // Espera a letra da frase chegar.
    await Luz.letras(['800 40px Unbounded']);
    // Quantos grãos. Número maior = palavra mais nítida e aparelho mais cansado.
    const total = 16000;
    // Escreve a frase em uma folha com metade do tamanho da tela.
    const folha = Luz.molde(d.titulo, {
      // Largura da folha.
      w: Math.round(innerWidth / 2),
      // Altura da folha.
      h: Math.round(innerHeight / 2),
      // Tipo de letra da frase.
      fonte: (t) => '800 ' + t + 'px Unbounded, Inter, sans-serif',
      // Lugar da frase: 6% da esquerda, 20% de cima, 88% de largura e 50% de altura.
      caixa: [0.06, 0.2, 0.88, 0.5],
      // Linhas juntinhas.
      entrelinha: 1.08
    });
    // Sorteia onde cada grão precisa chegar.
    const alvos = Luz.amostra(folha, total);
    // Lista de onde cada grão nasce.
    const inicio = new Float32Array(total * 2);
    // Lista de números sorteados.
    const sorte = new Float32Array(total * 4);
    // Modo pedido nos dados, se tiver.
    const modo = POEIRA_MODOS[d.modo] || {};
    // Sorteia cada grão.
    for (let i = 0; i < total; i++) {
      // Quatro números sorteados.
      for (let k = 0; k < 4; k++) sorte[i * 4 + k] = Math.random();
      // Neve: espalhada pela tela inteira.
      if (modo.chuva) {
        // Lugar na largura.
        inicio[i * 2] = U.rand(-1.05, 1.05);
        // Lugar na altura.
        inicio[i * 2 + 1] = U.rand(-1, 1);
        // Passa para o próximo grão.
        continue;
      }
      // Areia: faixas onduladas, como dunas.
      if (modo.dunas) {
        // Lugar na largura.
        const x = U.rand(-1.1, 1.1);
        // Cada grão cai em uma das 7 dunas.
        const duna = Math.floor(Math.random() * 7);
        // Lugar na largura.
        inicio[i * 2] = x;
        // Altura da duna, ondulando.
        inicio[i * 2 + 1] = -0.95 + duna * 0.3 + Math.sin(x * 3 + duna * 1.7) * 0.08 + curva() * 0.05;
        // Passa para o próximo grão.
        continue;
      }
      // Galáxia: três braços em espiral. Sorteia o braço.
      const braco = (Math.floor(Math.random() * 3) * Math.PI * 2) / 3;
      // Distância até o centro: mais grãos perto do centro.
      const r = Math.pow(Math.random(), 0.7) * 1.25;
      // Ângulo do braço: quanto mais longe, mais enrolado.
      const a = braco + r * 3.4 + curva() * (0.45 - r * 0.12);
      // Lugar na largura, em régua sem entortar.
      inicio[i * 2] = Math.cos(a) * r * Math.min(1, innerHeight / innerWidth);
      // Lugar na altura, corrigindo a tela comprida.
      inicio[i * 2 + 1] = Math.sin(a) * r * Math.min(1, innerWidth / innerHeight);
    }
    // Cor de fundo: a do modo, ou a do tema bem escurecida.
    const fundo = modo.fundo ? Luz.rgb(modo.fundo) : Luz.fundo().map((c) => c * 0.3);
    // Força atual do dedo.
    let toca = 0;
    // Força que o dedo quer ter.
    let querToca = 0;
    // Progresso do gesto, de 0 a 1.
    let meta = 0;
    // Progresso que aparece na tela, sempre andando atrás do gesto.
    let p = 0;
    // Cria a nuvem de grãos.
    const luz = Luz.nuvem(
      caixa,
      POEIRA_PONTO,
      POEIRA_COR,
      {
        // Onde cada grão nasce.
        aIni: { dados: inicio, n: 2 },
        // Onde cada grão termina.
        aAlvo: { dados: alvos, n: 2 },
        // Números sorteados.
        aSorte: { dados: sorte, n: 4 }
      },
      total,
      {
        // Cor de limpar a tela.
        limpa: fundo,
        // Cor de destaque do modo.
        corA: modo.a && Luz.rgb(modo.a),
        // Segunda cor do modo.
        corB: modo.b && Luz.rgb(modo.b),
        // A cada quadro, anda um pouco.
        quadro: (t, dt) => {
          // O progresso persegue o gesto.
          p += (meta - p) * Math.min(1, dt * 3);
          // A força do dedo persegue o que o dedo está fazendo.
          toca += (querToca - toca) * Math.min(1, dt * 8);
          // Envia o progresso.
          luz.valor('uP', p);
          // Envia a força do dedo.
          luz.valor('uToca', toca);
        }
      }
    );
    // Guarda para desligar no fim.
    liga(luz);
    // Tamanho dos grãos, de acordo com a nitidez da tela.
    luz.valor('uTam', 2.6 * Math.min(devicePixelRatio || 1, 1.5));
    // Velocidade da queda.
    luz.valor('uQueda', modo.queda || 0);
    // Velocidade do giro. Sem modo, é galáxia e gira.
    luz.valor('uGiro', modo.giro === undefined ? 0.05 : modo.giro);
    // Força dos grãos soltos.
    luz.valor('uSolto', modo.solto || 1);
    // Começa sem explosão.
    luz.valor('uFim', 0);
    // Começa com o dedo longe.
    luz.valor('uDedo', [0, 0]);
    // Frase em texto comum, para aparelho sem placa de vídeo.
    K.add(caixa, 'h1', 'ab-titulo ab-reserva', d.titulo);
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Camada que ouve o dedo.
    const pele = E.pele(caixa);
    // Quando o dedo sair, os grãos ficam livres de novo.
    const solta = () => {
      // O dedo não puxa mais.
      querToca = 0;
    };
    // Fica de olho no dedo saindo.
    window.addEventListener('pointerup', solta);
    // Espera o dedo varrer 34% da tela. Número maior = precisa varrer mais.
    await E.varre(pele, 0.34, (parte, x, y) => {
      // O dedo está puxando.
      querToca = 1;
      // Guarda o progresso.
      meta = parte;
      // Envia onde o dedo está, de -1 a 1.
      luz.valor('uDedo', [(x / innerWidth) * 2 - 1, 1 - (y / innerHeight) * 2]);
      // Tira a frase que ensina.
      dica.classList.add('some');
    });
    // Para de ficar de olho no dedo.
    window.removeEventListener('pointerup', solta);
    // Completa a frase.
    meta = 1;
    // O dedo não puxa mais.
    querToca = 0;
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
    // Faz os grãos voarem para fora.
    await E.anima(0, 1, 700, (v) => luz.valor('uFim', v));
  };

  /* ---------- nucleo: forma 3D feita de milhares de pontos ---------- */

  // Programa que diz onde cada ponto da forma fica.
  const NUCLEO_PONTO = `
    // Lugar do ponto dentro da forma.
    attribute vec3 aPos;
    // Dois números sorteados para cada ponto.
    attribute vec2 aSorte;
    // Segundos desde o começo.
    uniform float uTempo;
    // Quanto a forma já girou.
    uniform float uGiro;
    // Batida do coração, de 0 a 1.
    uniform float uBatida;
    // Energia acumulada, de 0 a 1.
    uniform float uEnergia;
    // Fim da animação, de 0 a 1.
    uniform float uFim;
    // Tamanho dos pontos. Número maior = pontos maiores.
    uniform float uTam;
    // Tamanho da tela.
    uniform vec2 uTela;
    // Cor de destaque.
    uniform vec3 uCorA;
    // Segunda cor de destaque.
    uniform vec3 uCorB;
    // Cor que vai para a pintura do ponto.
    varying vec3 vCor;
    // Transparência que vai para a pintura do ponto.
    varying float vAlfa;
    void main() {
      // A batida faz a forma crescer um pouquinho.
      vec3 p = aPos * (1.0 + uBatida * 0.09);
      // Cada ponto vibra sozinho, mais forte com energia.
      p += normalize(aPos + 0.001) * sin(uTempo * 3.0 + aSorte.x * 6.28) * (0.008 + uEnergia * 0.05);
      // Prepara o giro de lado.
      float c = cos(uGiro);
      // Prepara o giro de lado.
      float s = sin(uGiro);
      // Gira a forma em volta do eixo de pé.
      p = vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
      // Inclina a forma um pouco para frente.
      p = vec3(p.x, 0.97 * p.y - 0.24 * p.z, 0.24 * p.y + 0.97 * p.z);
      // No fim, a forma encolhe até virar um ponto.
      p *= 1.0 - smoothstep(0.0, 1.0, uFim);
      // Perto parece maior, longe parece menor.
      float perto = 3.4 / (3.4 - p.z);
      // Tamanho da forma na tela: menor em tela deitada. Número maior = forma maior.
      float tam = uTela.x > uTela.y ? 0.5 : 0.62;
      // Lado menor da tela.
      float m = min(uTela.x, uTela.y);
      // Entrega a posição, sem entortar em tela comprida.
      gl_Position = vec4(p.xy * perto * tam * m / uTela, 0.0, 1.0);
      // Ponto da frente é maior.
      gl_PointSize = uTam * perto * perto * (0.55 + aSorte.y);
      // Cor de cima a baixo, misturando as duas do tema.
      vCor = mix(uCorA, uCorB, clamp(0.5 + p.y * 0.55, 0.0, 1.0));
      // Quanto mais energia, mais branco.
      vCor = mix(vCor, vec3(1.0), uEnergia * 0.55);
      // Pontos do fundo ficam apagados.
      vAlfa = (0.32 + 0.68 * smoothstep(-1.0, 1.0, p.z)) * (0.55 + 0.45 * uEnergia);
    }
  `;

  // Acha o tamanho do coração em uma direção. Usa a conta matemática do coração 3D.
  const raioCoracao = (x, y, z) => {
    // Menor distância possível.
    let a = 0;
    // Maior distância possível.
    let b = 1.6;
    // Divide o caminho no meio várias vezes até achar a borda.
    for (let i = 0; i < 14; i++) {
      // Ponto do meio.
      const r = (a + b) / 2;
      // Lugar do ponto do meio.
      const X = x * r;
      // Lugar na altura.
      const Y = y * r;
      // Lugar na profundidade.
      const Z = z * r;
      // Parte da conta do coração.
      const q = X * X + 2.25 * Z * Z + Y * Y - 1;
      // Dentro do coração, a conta dá menos que zero.
      if (q * q * q - X * X * Y * Y * Y - 0.1125 * Z * Z * Y * Y * Y < 0) a = r;
      // Fora do coração.
      else b = r;
    }
    // Entrega a distância achada.
    return a;
  };

  // Sorteia os pontos da forma pedida. Devolve uma lista x, y, z.
  const pontosDaForma = (forma, total) => {
    // Lista final.
    const fora = new Float32Array(total * 3);
    // Sorteia cada ponto.
    for (let i = 0; i < total; i++) {
      // Sorteia uma direção qualquer: altura de -1 a 1.
      const y = U.rand(-1, 1);
      // Sorteia o ângulo.
      const a = U.rand(0, Math.PI * 2);
      // Raio do círculo nessa altura.
      const c = Math.sqrt(1 - y * y);
      // Direção no lado.
      const x = Math.cos(a) * c;
      // Direção na profundidade.
      const z = Math.sin(a) * c;
      // Anel: uma rosquinha. Número maior = rosquinha mais grossa.
      if (forma === 'anel') {
        // Ângulo em volta da rosquinha.
        const b = U.rand(0, Math.PI * 2);
        // Distância até o centro da rosquinha.
        const R = 0.95 + Math.cos(b) * 0.2;
        // Guarda o ponto, com a rosquinha deitada de frente.
        fora.set([Math.cos(a) * R, Math.sin(a) * R, Math.sin(b) * 0.2], i * 3);
        // Passa para o próximo ponto.
        continue;
      }
      // Esfera: bolinhas em faixas, como um alto-falante.
      if (forma === 'esfera') {
        // Faixas onduladas na superfície.
        const r = 1 + Math.sin(y * 14) * 0.05;
        // Guarda o ponto.
        fora.set([x * r, y * r, z * r], i * 3);
        // Passa para o próximo ponto.
        continue;
      }
      // Coração: acha a borda nesta direção.
      const r = raioCoracao(x, y, z);
      // Quinze por cento dos pontos ficam dentro, para dar volume.
      const dentro = Math.random() < 0.15 ? U.rand(0.3, 0.95) : 1;
      // Guarda o ponto, um pouco mais para baixo para ficar no centro.
      fora.set([x * r * dentro, y * r * dentro - 0.1, z * r * dentro], i * 3);
    }
    // Entrega a lista.
    return fora;
  };

  // Batida de coração: duas batidas rápidas e uma pausa. 'f' é a fase, de 0 a 1.
  const batida = (f) => Math.exp(-Math.pow((f - 0.12) * 16, 2)) + 0.7 * Math.exp(-Math.pow((f - 0.32) * 16, 2));

  // Nucleo: gire a forma com o dedo até ela carregar.
  E.nucleo = async (caixa, d, liga) => {
    // Quantos pontos a forma tem. Número maior = mais bonito e mais pesado.
    const total = 14000;
    // Sorteia os pontos.
    const pos = pontosDaForma(d.forma, total);
    // Lista de números sorteados.
    const sorte = new Float32Array(total * 2);
    // Sorteia.
    for (let i = 0; i < sorte.length; i++) sorte[i] = Math.random();
    // Quanto a forma já girou.
    let giro = 0;
    // Velocidade do giro.
    let vel = 0;
    // Energia guardada, de 0 a 1.
    let energia = 0;
    // Marca se o dedo está girando a forma.
    let mexendo = false;
    // Fase da batida.
    let fase = 0;
    // Cria a nuvem.
    const luz = Luz.nuvem(
      caixa,
      NUCLEO_PONTO,
      POEIRA_COR,
      {
        // Lugar de cada ponto.
        aPos: { dados: pos, n: 3 },
        // Números sorteados.
        aSorte: { dados: sorte, n: 2 }
      },
      total,
      {
        // Cor de limpar a tela: a do tema bem escurecida.
        limpa: Luz.fundo().map((c) => c * 0.32),
        // A cada quadro, gira um pouco.
        quadro: (t, dt) => {
          // Gira.
          giro += vel * dt;
          // Aos poucos a velocidade cai.
          vel += -vel * Math.min(1, dt * 1.3);
          // Sem o dedo, a forma volta a ficar de frente, procurando a volta inteira mais perto.
          if (!mexendo && Math.abs(vel) < 2) giro += (Math.round(giro / (Math.PI * 2)) * Math.PI * 2 - giro) * Math.min(1, dt * 2.2);
          // Quanto mais energia, mais rápido bate.
          fase = (fase + dt * (0.9 + energia * 2.4)) % 1;
          // Envia o giro, com um balanço leve para mostrar que é 3D.
          luz.valor('uGiro', giro + Math.sin(t * 0.8) * 0.42);
          // Envia a batida.
          luz.valor('uBatida', batida(fase));
          // Envia a energia.
          luz.valor('uEnergia', energia);
          // Avisa o CSS, para o brilho de trás acompanhar.
          caixa.style.setProperty('--energia', energia);
        }
      }
    );
    // Guarda para desligar no fim.
    liga(luz);
    // Tamanho dos pontos, de acordo com a nitidez da tela.
    luz.valor('uTam', 2.3 * Math.min(devicePixelRatio || 1, 1.5));
    // Começa sem fim.
    luz.valor('uFim', 0);
    // A frase grande.
    const titulo = K.add(caixa, 'h1', 'ab-titulo', d.titulo);
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Linha fina que mostra a energia.
    const barra = K.add(K.add(caixa, 'div', 'ab-barra'), 'i');
    // Camada que ouve o dedo.
    const pele = E.pele(caixa);
    // Última posição do dedo.
    let ultimo = 0;
    // Quantos pontinhos de arrasto enchem a energia. Número maior = precisa girar mais.
    const trabalho = 1000;
    // Espera a pessoa girar até encher.
    await K.arrasta(pele, {
      // Gesto esperado: para a direita.
      rumo: [280, 0],
      // Enquanto o dedo anda, a forma gira junto.
      move: (dx) => {
        // O dedo está girando.
        mexendo = true;
        // Quanto o dedo andou desde a última vez.
        const passo = dx - ultimo;
        // Guarda a posição.
        ultimo = dx;
        // Gira junto com o dedo.
        giro += passo * 0.012;
        // Dá velocidade para continuar girando depois de soltar.
        vel += passo * 0.03;
        // Enche a energia.
        energia = Math.min(1, energia + Math.abs(passo) / trabalho);
        // Mostra a energia na linha.
        barra.style.width = energia * 100 + '%';
        // Tira a frase que ensina.
        dica.classList.add('some');
        // Som que sobe com a energia.
        if (Math.random() < 0.12) K.som(180 + energia * 520, 60, 'sine', 0.03);
      },
      // Quando soltar, confere se encheu.
      solta: () => {
        // Esquece a posição.
        ultimo = 0;
        // O dedo saiu.
        mexendo = false;
        // Só termina com a energia cheia.
        return energia >= 1;
      }
    });
    // Tira a camada.
    pele.remove();
    // A frase grande sai, para a forma brilhar sozinha.
    titulo.classList.add('some');
    // Gira muito rápido.
    vel = 26;
    // Som de carga subindo.
    K.som(220, 700, 'sawtooth', 0.04);
    // A forma encolhe até virar um ponto.
    await E.anima(0, 1, 850, (v) => luz.valor('uFim', v));
    // Solta o clarão.
    E.clarao(caixa);
    // Som da forma voltando.
    K.som(140, 500, 'sine', 0.1);
    // Gira devagar de novo.
    vel = 1.2;
    // A forma volta inteira, toda acesa.
    await E.anima(1, 0, 650, (v) => luz.valor('uFim', v));
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };

  /* ---------- mercurio: duas gotas de metal líquido ---------- */

  // Programa que pinta o metal líquido.
  const MERCURIO = `
    // Lugar e tamanho das gotas: x, y e raio.
    uniform vec3 uGotas[7];
    // Onda que sai quando as gotas se juntam, de 0 a 1.
    uniform float uOnda;
    // Lugar onde a onda nasce.
    uniform vec2 uCentro;

    // Mede a força do líquido em um lugar. Maior que 1 = dentro do metal.
    float campo(vec2 p) {
      // Soma da força de todas as gotas.
      float f = 0.0;
      // Passa pelas 7 gotas.
      for (int i = 0; i < 7; i++) {
        // Distância até esta gota.
        vec2 d = p - uGotas[i].xy;
        // Gota grande e perto soma mais.
        f += uGotas[i].z * uGotas[i].z / (dot(d, d) + 0.0001);
      }
      // Entrega a força.
      return f;
    }

    // Imagina um estúdio em volta do metal e devolve a cor refletida.
    vec3 estudio(vec3 r) {
      // Altura do reflexo, de 0 a 1.
      float y = r.y * 0.5 + 0.5;
      // Chão escuro e teto claro, com a linha do horizonte no meio.
      vec3 c = mix(vec3(0.03, 0.03, 0.06), vec3(0.92, 0.95, 1.0), smoothstep(0.42, 0.56, y));
      // O teto vai pegando a cor do tema.
      c = mix(c, uCorB, smoothstep(0.6, 1.0, y) * 0.75);
      // O chão recebe um brilho da cor de destaque.
      c += uCorA * smoothstep(0.42, 0.0, y) * 0.55;
      // Faixas de luz, como janelas compridas de um estúdio.
      float faixa = sin(r.x * 7.0 + sin(r.y * 3.0 + uTempo * 0.3) * 1.3);
      // Soma a luz das faixas.
      c += smoothstep(0.86, 0.98, faixa) * 0.9;
      // Entrega a cor.
      return c;
    }

    void main() {
      // Lugar deste pontinho.
      vec2 p = lugar();
      // Distância até o lugar da onda.
      float rc = length(p - uCentro);
      // Empurra o líquido com a onda.
      p += normalize(p - uCentro + 0.0001) * sin(rc * 26.0 - uOnda * 16.0) * 0.012 * uOnda * (1.0 - uOnda);
      // Mede o líquido aqui.
      float f = campo(p);
      // Passo pequeno para medir a inclinação da superfície.
      float e = 0.006;
      // Mede quanto o líquido muda para o lado.
      float gx = campo(p + vec2(e, 0.0)) - campo(p - vec2(e, 0.0));
      // Mede quanto o líquido muda para cima.
      float gy = campo(p + vec2(0.0, e)) - campo(p - vec2(0.0, e));
      // Inclinação da superfície. Número menor = metal mais estufado.
      vec3 n = normalize(vec3(-vec2(gx, gy) / (f * f * e * 7.0 + 0.001), 1.0));
      // Direção do reflexo.
      vec3 r = reflect(vec3(0.0, 0.0, -1.0), n);
      // Cor refletida.
      vec3 metal = estudio(r);
      // Borda mais escura, como em metal de verdade.
      metal *= 0.55 + 0.45 * n.z;
      // Brilho forte em um ponto, como a luz de um refletor.
      metal += pow(max(dot(n, normalize(vec3(-0.4, 0.6, 0.7))), 0.0), 70.0) * 1.4;
      // Fundo do estúdio: cor do tema escurecida, mais clara no centro.
      vec3 fundo = mix(uCorF * 0.5 + uCorA * 0.06, uCorF * 0.12, length(p) * 0.6);
      // Sombra das gotas no fundo.
      float sombra = smoothstep(0.25, 1.0, campo(p + vec2(-0.03, 0.05)));
      // Escurece o fundo embaixo das gotas.
      fundo *= 1.0 - sombra * 0.75;
      // Mistura metal e fundo com a borda suave.
      vec3 c = mix(fundo, metal, smoothstep(0.97, 1.05, f));
      // Entrega a cor deste pontinho.
      gl_FragColor = vec4(c, 1.0);
    }
  `;

  // Mercúrio: arraste uma gota até a outra.
  E.mercurio = async (caixa, d, liga) => {
    // Lado menor da tela.
    const m = Math.min(innerWidth, innerHeight);
    // Tela em pé ou deitada?
    const empe = innerHeight > innerWidth;
    // Metade da largura, medida na régua da placa de vídeo.
    const largura = innerWidth / m;
    // Metade da altura, medida na régua da placa de vídeo.
    const altura = innerHeight / m;
    // Lugar da gota que fica parada.
    const alvo = empe ? [0.3, altura * 0.16] : [largura * 0.5, -0.1];
    // Lugar onde a gota do dedo nasce.
    const casa = empe ? [-0.32, -altura * 0.5] : [-largura * 0.42, -0.3];
    // Lugar atual da gota do dedo.
    const gota = casa.slice();
    // Tamanho da gota parada. Número maior = gota maior.
    const raioAlvo = 0.44;
    // Tamanho da gota do dedo.
    const raioGota = 0.34;
    // Lista das 7 gotas: as 2 grandes e 5 pequenas.
    const lista = new Float32Array(21);
    // Marca o quanto as gotas já se juntaram, de 0 a 1.
    let juntou = 0;
    // Marca se o dedo está segurando a gota.
    let presa = false;
    // Lugar para onde a gota quer ir.
    const quer = casa.slice();
    // Cria o desenho.
    const luz = Luz.tela(caixa, MERCURIO, {
      // A cada quadro, mexe as gotas.
      quadro: (t, dt) => {
        // Gota solta volta devagar para casa.
        gota[0] += (quer[0] - gota[0]) * Math.min(1, dt * (presa ? 22 : 7));
        // Mesma coisa na altura.
        gota[1] += (quer[1] - gota[1]) * Math.min(1, dt * (presa ? 22 : 7));
        // Gota parada, respirando de leve.
        lista.set([alvo[0], alvo[1] + Math.sin(t * 1.1) * 0.012, raioAlvo * (1 + juntou * 0.3)], 0);
        // Gota do dedo.
        lista.set([gota[0], gota[1], raioGota * (1 - juntou)], 3);
        // Cinco gotinhas que andam em volta das grandes.
        for (let i = 0; i < 5; i++) {
          // Cada gotinha anda em um ritmo.
          const a = t * (0.5 + i * 0.11) + i * 1.26;
          // Metade anda em volta da gota parada e metade da gota do dedo.
          const c = i % 2 ? alvo : gota;
          // Distância até a gota grande. O seno faz a gotinha ir e voltar.
          const r = 0.56 + Math.sin(t * 0.7 + i) * 0.14;
          // Guarda a gotinha.
          lista.set([c[0] + Math.cos(a) * r, c[1] + Math.sin(a * 1.2) * r, 0.06 + (i % 3) * 0.02], 6 + i * 3);
        }
        // Envia a lista.
        luz.lista('uGotas[0]', lista, 3);
      }
    });
    // Guarda para desligar no fim.
    liga(luz);
    // Começa sem onda.
    luz.valor('uOnda', 0);
    // Lugar da onda.
    luz.valor('uCentro', alvo);
    // A frase grande.
    K.add(caixa, 'h1', 'ab-titulo', d.titulo);
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Transforma a régua da placa de vídeo em pontinhos da tela: lado.
    const px = (x) => (x * m + innerWidth) / 2;
    // Transforma a régua da placa de vídeo em pontinhos da tela: altura.
    const py = (y) => (innerHeight - y * m) / 2;
    // Alça invisível em cima da gota do dedo.
    const alca = K.add(caixa, 'button', 'ab-alca');
    // Diz ao navegador que é um botão comum.
    alca.type = 'button';
    // Nome da alça, para quem usa leitor de tela.
    alca.setAttribute('aria-label', d.dica);
    // Coloca a alça em cima da gota: lado.
    alca.style.left = px(casa[0]) + 'px';
    // Coloca a alça em cima da gota: altura.
    alca.style.top = py(casa[1]) + 'px';
    // Tamanho da alça: um pouco maior que a gota.
    alca.style.width = alca.style.height = raioGota * m * 1.2 + 'px';
    // Quanto o dedo precisa andar: lado.
    const rx = px(alvo[0]) - px(casa[0]);
    // Quanto o dedo precisa andar: altura.
    const ry = py(alvo[1]) - py(casa[1]);
    // Espera o dedo levar a gota até a outra.
    await K.arrasta(alca, {
      // Caminho até a outra gota.
      rumo: [Math.round(rx), Math.round(ry)],
      // Enquanto o dedo anda, a gota vai junto.
      move: (dx, dy) => {
        // O dedo está segurando.
        presa = true;
        // Tira a frase que ensina.
        dica.classList.add('some');
        // A gota quer ir para onde o dedo está: lado.
        quer[0] = casa[0] + (dx * 2) / m;
        // A gota quer ir para onde o dedo está: altura.
        quer[1] = casa[1] - (dy * 2) / m;
      },
      // Quando soltar, confere se chegou perto.
      solta: (dx, dy) => {
        // O dedo soltou.
        presa = false;
        // Distância até a outra gota, de 0 (em cima) a 1 (onde nasceu).
        const falta = Math.hypot(rx - dx, ry - dy) / Math.hypot(rx, ry);
        // Chegou perto: conta. Número maior = aceita mais longe.
        const foi = falta < 0.42;
        // Não chegou: a gota volta para casa.
        if (!foi) quer.splice(0, 2, casa[0], casa[1]);
        // Entrega se conseguiu.
        return foi;
      }
    });
    // Tira a alça.
    alca.remove();
    // A gota corre para a outra, como se as duas se puxassem.
    quer.splice(0, 2, alvo[0], alvo[1]);
    // Som de gotas se juntando.
    K.som(180, 240, 'sine', 0.09);
    // As duas viram uma, enquanto a onda corre.
    await E.anima(0, 1, 900, (v) => {
      // Envia a onda.
      luz.valor('uOnda', v);
      // A gota do dedo vai sumindo dentro da outra.
      juntou = v;
    });
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };

  /* ---------- termica: câmera de calor ---------- */

  // Programa que pinta a imagem de calor.
  const TERMICA = `
    // Calor que o dedo deixou, de 0 a 1.
    uniform sampler2D uCalor;
    // Frase escondida.
    uniform sampler2D uTexto;
    // Fim do gesto: a frase fica quente sozinha, de 0 a 1.
    uniform float uP;

    // Transforma a temperatura em cor, do frio ao quente.
    vec3 paleta(float v) {
      // Mais frio: azul-marinho quase preto até roxo.
      vec3 c = mix(vec3(0.02, 0.0, 0.14), vec3(0.32, 0.0, 0.62), smoothstep(0.0, 0.26, v));
      // Morno: roxo até vermelho-rosado.
      c = mix(c, vec3(0.9, 0.06, 0.38), smoothstep(0.26, 0.5, v));
      // Quente: vermelho-rosado até laranja.
      c = mix(c, vec3(1.0, 0.56, 0.0), smoothstep(0.5, 0.72, v));
      // Muito quente: laranja até amarelo.
      c = mix(c, vec3(1.0, 0.95, 0.36), smoothstep(0.72, 0.9, v));
      // Quentíssimo: amarelo até branco.
      c = mix(c, vec3(1.0), smoothstep(0.9, 1.0, v));
      // Entrega a cor.
      return c;
    }

    void main() {
      // Lugar deste pontinho, de 0 a 1.
      vec2 uv = gl_FragCoord.xy / uTela;
      // Calor do dedo aqui.
      float calor = texture2D(uCalor, uv).r;
      // Frase escondida aqui.
      float texto = texture2D(uTexto, uv).a;
      // Temperatura do ambiente: nuvens frias andando devagar.
      float ambiente = 0.08 + 0.13 * nuvem(uv * vec2(3.0, 5.0) + uTempo * 0.06);
      // Soma tudo. A frase só esquenta onde o dedo passou, ou no fim.
      float v = ambiente + calor * 0.6 + texto * (calor * 0.6 + uP * 0.8);
      // Granulado de câmera.
      v += (sorte(uv * uTela + uTempo) - 0.5) * 0.025;
      // Transforma em cor.
      vec3 c = paleta(clamp(v, 0.0, 1.0));
      // Linhas finas de monitor.
      c *= 0.95 + 0.05 * sin(gl_FragCoord.y * 1.7);
      // Entrega a cor deste pontinho.
      gl_FragColor = vec4(c, 1.0);
    }
  `;

  // Térmica: esfregue a tela para esquentar e achar a frase.
  E.termica = async (caixa, d, liga) => {
    // Espera a letra da frase chegar.
    await Luz.letras(['800 40px Unbounded']);
    // Colunas da grade de calor. Número maior = calor mais detalhado.
    const colunas = 72;
    // Linhas da grade, mantendo o formato da tela.
    const linhas = Math.round((colunas * innerHeight) / innerWidth);
    // Calor de cada quadradinho, de 0 a 1.
    let calor = new Float32Array(colunas * linhas);
    // Cópia usada para espalhar o calor.
    let copia = new Float32Array(colunas * linhas);
    // Mesmo calor em um formato que a placa de vídeo entende.
    const bytes = new Uint8Array(colunas * linhas);
    // Marca a primeira vez que o calor é enviado.
    let nova = true;
    // Cria o desenho.
    const luz = Luz.tela(caixa, TERMICA, {
      // A cada quadro, o calor espalha e esfria.
      quadro: () => {
        // Passa por cada quadradinho, menos as bordas.
        for (let y = 1; y < linhas - 1; y++) {
          // Anda na linha.
          for (let x = 1; x < colunas - 1; x++) {
            // Posição deste quadradinho.
            const i = y * colunas + x;
            // Média com os vizinhos: o calor espalha.
            const m = (calor[i - 1] + calor[i + 1] + calor[i - colunas] + calor[i + colunas]) / 4;
            // Mistura e esfria um pouco. Número menor = esfria mais rápido.
            copia[i] = (calor[i] * 0.86 + m * 0.14) * 0.997;
          }
        }
        // Troca as duas grades de lugar.
        [calor, copia] = [copia, calor];
        // Prepara o calor para a placa de vídeo.
        for (let i = 0; i < bytes.length; i++) bytes[i] = Math.min(255, calor[i] * 255);
        // Envia.
        luz.cinza('uCalor', bytes, colunas, linhas, 1, nova);
        // Já não é mais a primeira vez.
        nova = false;
      }
    });
    // Guarda para desligar no fim.
    liga(luz);
    // Escreve a frase escondida.
    const folha = Luz.molde(d.escondido, {
      // Largura da folha.
      w: Math.round(innerWidth),
      // Altura da folha.
      h: Math.round(innerHeight),
      // Tipo de letra da frase.
      fonte: (t) => '800 ' + t + 'px Unbounded, Inter, sans-serif',
      // Lugar da frase: 6% da esquerda, 26% de cima, 88% de largura e 44% de altura.
      caixa: [0.06, 0.26, 0.88, 0.44]
    });
    // Envia a frase para a placa de vídeo.
    luz.textura('uTexto', folha, 0);
    // Começa sem a frase quente.
    luz.valor('uP', 0);
    // Frase escondida em texto comum, para aparelho sem placa de vídeo.
    K.add(caixa, 'b', 'ab-titulo ab-reserva', d.escondido);
    // A frase grande.
    K.add(caixa, 'h1', 'ab-titulo', d.titulo);
    // O termômetro.
    const graus = K.add(caixa, 'b', 'ab-graus', '36,5°');
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Camada que ouve o dedo.
    const pele = E.pele(caixa);
    // Espera esfregar 36% da tela. Número maior = precisa esfregar mais.
    await E.varre(pele, 0.36, (parte, x, y) => {
      // Coluna do dedo na grade.
      const cx = (x / innerWidth) * colunas;
      // Linha do dedo na grade, de baixo para cima.
      const cy = (1 - y / innerHeight) * linhas;
      // Esquenta uma bolinha em volta do dedo. Número maior = bolinha maior.
      for (let a = -6; a <= 6; a++) {
        // Anda na altura.
        for (let b = -6; b <= 6; b++) {
          // Coluna deste quadradinho.
          const c = Math.round(cx) + a;
          // Linha deste quadradinho.
          const l = Math.round(cy) + b;
          // Fora da grade: pula.
          if (c < 0 || l < 0 || c >= colunas || l >= linhas) continue;
          // Quanto mais perto do dedo, mais esquenta.
          const forca = Math.exp(-(a * a + b * b) / 12) * 0.3;
          // Soma o calor, sem passar de 1.
          calor[l * colunas + c] = Math.min(1, calor[l * colunas + c] + forca);
        }
      }
      // Mostra a temperatura subindo.
      graus.textContent = (36.5 + parte * 63.4).toFixed(1).replace('.', ',') + '°';
      // Tira a frase que ensina.
      dica.classList.add('some');
    });
    // Termômetro no máximo.
    graus.textContent = '99,9°';
    // Som de alarme.
    K.som(880, 180, 'square', 0.04);
    // A frase inteira esquenta.
    await E.anima(0, 1, 800, (v) => luz.valor('uP', v));
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };

  /* ---------- carga: a tela inteira enche de líquido ---------- */

  // Programa que pinta o líquido subindo.
  const CARGA = `
    // Altura do líquido, de 0 a 1.
    uniform float uNivel;
    // Agitação do líquido, de 0 a 1.
    uniform float uAgita;
    void main() {
      // Lugar deste pontinho, de 0 a 1.
      vec2 uv = gl_FragCoord.xy / uTela;
      // Duas ondas lentas na superfície.
      float onda = sin(uv.x * 5.0 + uTempo * 1.6) * 0.012 + sin(uv.x * 11.0 - uTempo * 2.1) * 0.006;
      // Uma onda forte, quando a pessoa toca.
      onda += sin(uv.x * 19.0 + uTempo * 9.0) * 0.03 * uAgita;
      // Altura da superfície neste ponto.
      float topo = uNivel + onda;
      // Parte cheia: 1 embaixo da superfície, com borda macia.
      float cheio = smoothstep(topo + 0.002, topo - 0.002, uv.y);
      // Fundo escuro, com a cor do tema.
      vec3 fundo = uCorF * 0.3;
      // O líquido fica mais escuro no fundo.
      vec3 liquido = mix(uCorA * 0.62, uCorA, smoothstep(0.0, 1.0, uv.y / max(uNivel, 0.01)));
      // Mistura com a segunda cor em nuvens lentas.
      liquido = mix(liquido, uCorB, nuvem(uv * 2.4 + vec2(uTempo * 0.1, -uTempo * 0.2)) * 0.55);
      // Faixa clara logo abaixo da superfície.
      liquido += smoothstep(0.035, 0.0, topo - uv.y) * 0.3;
      // Entrega a cor deste pontinho.
      gl_FragColor = vec4(mix(fundo, liquido, cheio), 1.0);
    }
  `;

  // Carga: a tela enche sozinha até 99% e a pessoa dá o empurrão final.
  E.carga = async (caixa, d, liga) => {
    // Altura do líquido.
    let nivel = 0;
    // Agitação do líquido.
    let agita = 0;
    // Cria o desenho.
    const luz = Luz.tela(caixa, CARGA, {
      // A cada quadro, acalma a agitação.
      quadro: (t, dt) => {
        // Vai acalmando. Número maior = acalma mais rápido.
        agita = Math.max(0, agita - dt * 1.6);
        // Envia a altura.
        luz.valor('uNivel', nivel);
        // Envia a agitação.
        luz.valor('uAgita', agita);
      }
    });
    // Guarda para desligar no fim.
    liga(luz);
    // Cor das letras dentro do líquido.
    caixa.style.setProperty('--tinta', E.tinta(Luz.tema('--ac')));
    // Número gigante que fica fora do líquido.
    const seco = K.add(caixa, 'b', 'ab-numero seco', '0');
    // Número gigante que fica dentro do líquido.
    const molhado = K.add(caixa, 'b', 'ab-numero molhado', '0');
    // A frase grande.
    const titulo = K.add(caixa, 'h1', 'ab-titulo', d.titulo);
    // Frase que muda enquanto carrega.
    const estado = K.add(caixa, 'p', 'ab-estado', d.etapas[0]);
    // Mostra um valor na tela.
    const mostra = (v) => {
      // Altura do líquido, de 0 a 1.
      nivel = v / 100;
      // Mostra o número sem casas depois da vírgula.
      seco.textContent = molhado.textContent = Math.floor(v);
      // Corta o número de fora na altura do líquido.
      seco.style.clipPath = 'inset(0 0 ' + v + '% 0)';
      // Corta o número de dentro na altura do líquido.
      molhado.style.clipPath = 'inset(' + (100 - v) + '% 0 0 0)';
      // Texto de cima muda de cor quando o líquido chega nele.
      titulo.classList.toggle('molhado', v > 88);
      // Texto de baixo muda de cor quando o líquido chega nele.
      estado.classList.toggle('molhado', v > 8);
    };
    // Sobe até 99 em 3,4 segundos. Número maior = sobe mais devagar.
    await E.anima(0, 99, 3400, (v) => {
      // Mostra o valor.
      mostra(v);
      // Troca a frase conforme sobe.
      estado.textContent = d.etapas[Math.min(d.etapas.length - 1, Math.floor((v / 99) * d.etapas.length))];
    });
    // Treme o número, para mostrar que travou.
    caixa.classList.add('travou');
    // Mostra o que fazer.
    estado.textContent = d.dica;
    // Camada que ouve o dedo.
    const pele = E.pele(caixa);
    // Espera 5 toques. Número maior = precisa de mais toques.
    await K.vezes(pele, 5, (i) => {
      // Agita o líquido.
      agita = 1;
      // Som que sobe a cada toque.
      K.som(300 + i * 90, 80, 'triangle', 0.06);
      // Sobe um pouquinho.
      mostra(99 + i * 0.19);
    });
    // Tira a camada.
    pele.remove();
    // Tira o tremor.
    caixa.classList.remove('travou');
    // Completa.
    mostra(100);
    // Avisa o CSS que chegou em 100.
    caixa.classList.add('cheio');
    // Tira a frase de carregando.
    estado.remove();
    // O líquido transborda por cima.
    await E.anima(1, 1.2, 500, (v) => {
      // Sobe além do topo.
      nivel = v;
    });
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };

  /* ---------- glitch: imagem com defeito ---------- */

  // Programa que pinta a imagem com defeito.
  const GLITCH = `
    // A frase, escrita em uma folha.
    uniform sampler2D uTexto;
    // Quanto cada uma das 10 faixas já foi consertada, de 0 a 1.
    uniform float uOk[10];
    void main() {
      // Lugar deste pontinho, de 0 a 1.
      vec2 uv = gl_FragCoord.xy / uTela;
      // Número da faixa, de 0 (em cima) a 9 (embaixo).
      float faixa = floor((1.0 - uv.y) * 10.0);
      // Procura quanto esta faixa já foi consertada.
      float ok = 0.0;
      // Passa pelas 10 faixas.
      for (int i = 0; i < 10; i++) {
        // Achou a faixa deste pontinho: guarda o valor dela.
        if (abs(float(i) - faixa) < 0.5) ok = uOk[i];
      }
      // Quanto defeito ainda tem nesta faixa.
      float caos = 1.0 - ok;
      // O defeito muda de repente, 14 vezes por segundo.
      float tq = floor(uTempo * 14.0);
      // A faixa inteira escorrega para o lado.
      float desliza = (sorte(vec2(faixa, tq)) - 0.5) * 0.42 * caos;
      // Número de uma fatia bem fina.
      float fatia = floor(uv.y * 70.0);
      // Algumas fatias finas escorregam mais.
      desliza += (sorte(vec2(fatia * 3.1, tq)) - 0.5) * 0.24 * caos * step(0.72, sorte(vec2(fatia, tq * 1.7)));
      // Lugar da folha que aparece aqui.
      vec2 q = uv + vec2(desliza, 0.0);
      // Distância entre o vermelho, o verde e o azul.
      float separa = 0.016 * caos + 0.0015;
      // Vermelho, deslocado para um lado.
      float r = texture2D(uTexto, q + vec2(separa, 0.0)).a;
      // Verde, no lugar.
      float g = texture2D(uTexto, q).a;
      // Azul, deslocado para o outro lado.
      float b = texture2D(uTexto, q - vec2(separa, 0.0)).a;
      // Junta as três cores.
      vec3 c = vec3(r, g, b);
      // Lugar de um bloquinho.
      vec2 bloco = floor(uv * vec2(12.0, 34.0));
      // Alguns bloquinhos aparecem coloridos.
      float pedaco = step(0.94, sorte(bloco + tq)) * caos;
      // Pinta o bloquinho com uma das cores do tema.
      c = mix(c, mix(uCorA, uCorB, sorte(bloco * 2.0 + tq)), pedaco);
      // Fundo: preto, com um pouco da cor do tema onde tem defeito.
      c += uCorF * 0.3 * caos;
      // Linhas finas de monitor.
      c *= 0.9 + 0.1 * sin(gl_FragCoord.y * 2.2);
      // Chuvisco, só onde tem defeito.
      c += (sorte(uv * uTela + uTempo) - 0.5) * 0.09 * caos;
      // Entrega a cor deste pontinho.
      gl_FragColor = vec4(c, 1.0);
    }
  `;

  // Glitch: passe o dedo pelas faixas para consertar a imagem.
  E.glitch = async (caixa, d, liga) => {
    // Espera a letra da frase chegar.
    await Luz.letras(['900 40px "Big Shoulders Display"']);
    // Quanto cada faixa já foi consertada.
    const ok = new Float32Array(10);
    // Cria o desenho.
    const luz = Luz.tela(caixa, GLITCH, {
      // A cada quadro, envia as faixas.
      quadro: () => luz.lista('uOk[0]', ok, 1)
    });
    // Guarda para desligar no fim.
    liga(luz);
    // Escreve a frase.
    const folha = Luz.molde(d.titulo.toUpperCase(), {
      // Largura da folha.
      w: Math.round(innerWidth),
      // Altura da folha.
      h: Math.round(innerHeight),
      // Tipo de letra da frase.
      fonte: (t) => '900 ' + t + 'px "Big Shoulders Display", Inter, sans-serif',
      // Lugar da frase: 6% da esquerda, 8% de cima, 88% de largura e 76% de altura.
      caixa: [0.06, 0.08, 0.88, 0.76],
      // Linhas juntinhas.
      entrelinha: 0.98
    });
    // Envia a frase para a placa de vídeo.
    luz.textura('uTexto', folha, 0);
    // Frase em texto comum, para aparelho sem placa de vídeo.
    K.add(caixa, 'h1', 'ab-titulo ab-reserva', d.titulo);
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Camada que ouve o dedo.
    const pele = E.pele(caixa);
    // Quanto cada passada conserta. Número maior = conserta mais rápido.
    const passo = 0.09;
    // Espera o dedo consertar quase todas as faixas.
    await E.varre(pele, 1, (parte, x, y) => {
      // Acha a faixa em que o dedo está.
      const f = Math.min(9, Math.floor((y / innerHeight) * 10));
      // Conserta esta faixa.
      ok[f] = Math.min(1, ok[f] + passo);
      // Tira a frase que ensina.
      dica.classList.add('some');
      // Estalinho de vez em quando.
      if (Math.random() < 0.1) K.som(U.rand(300, 2400), 30, 'sawtooth', 0.02);
      // Termina quando 8 faixas estiverem boas.
      return ok.filter((v) => v > 0.95).length >= 8;
    });
    // Conserta o resto sozinho.
    await E.anima(0, 1, 500, (v) => {
      // Passa por cada faixa.
      for (let i = 0; i < 10; i++) ok[i] = Math.max(ok[i], v);
    });
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };

  /* ---------- agua: pingos que revelam a frase ---------- */

  // Programa que pinta a água.
  const AGUA = `
    // Os pingos: x, y e quantos segundos faz. Menor que zero = ainda não caiu.
    uniform vec3 uGotas[5];
    // A frase, escrita em uma folha.
    uniform sampler2D uTexto;
    // Fim do gesto: a frase aparece inteira, de 0 a 1.
    uniform float uP;

    // Mede a altura da água em um lugar.
    float altura(vec2 p) {
      // Marolas lentas o tempo todo.
      float h = (sin(p.x * 9.0 + uTempo * 0.9 + sin(p.y * 7.0 + uTempo * 0.6) * 1.4) + sin(p.y * 11.0 - uTempo * 0.7)) * 0.005;
      // Soma a onda de cada pingo.
      for (int i = 0; i < 5; i++) {
        // Ainda não caiu: pula.
        if (uGotas[i].z < 0.0) continue;
        // Distância até o pingo.
        float r = length(p - uGotas[i].xy);
        // Onde está a frente da onda. Número maior = a onda anda mais rápido.
        float frente = uGotas[i].z * 0.62;
        // Distância até a frente da onda. Número maior = onda mais estreita.
        float q = (r - frente) * 5.0;
        // A onda só existe perto da frente e vai enfraquecendo.
        float forca = exp(-q * q) * exp(-uGotas[i].z * 0.42);
        // Soma os anéis.
        h += sin((r - frente) * 46.0) * forca * 0.03;
      }
      // Entrega a altura.
      return h;
    }

    void main() {
      // Lugar deste pontinho.
      vec2 p = lugar();
      // Lugar deste pontinho, de 0 a 1.
      vec2 uv = gl_FragCoord.xy / uTela;
      // Passo pequeno para medir a inclinação da água.
      float e = 0.004;
      // Altura aqui.
      float h = altura(p);
      // Inclinação para o lado e para cima.
      vec2 g = vec2(altura(p + vec2(e, 0.0)) - h, altura(p + vec2(0.0, e)) - h) / e;
      // Direção da superfície.
      vec3 n = normalize(vec3(-g, 1.0));
      // Quanto da frase já apareceu aqui.
      float ve = uP;
      // Cada pingo abre um círculo limpo em volta dele.
      for (int i = 0; i < 5; i++) {
        // Ainda não caiu: pula.
        if (uGotas[i].z < 0.0) continue;
        // Tamanho do círculo, que cresce até um limite. Número maior = limpa mais longe.
        float raio = min(uGotas[i].z * 0.62, 0.85);
        // Soma o círculo.
        ve = max(ve, smoothstep(raio + 0.02, raio - 0.22, length(p - uGotas[i].xy)));
      }
      // Lê a frase, entortada pela água.
      float t = texture2D(uTexto, uv + n.xy * 0.05).a * ve;
      // Água funda: a cor do fundo do tema, com reflexo da cor de destaque.
      vec3 c = mix(uCorF * 0.55, uCorA * 0.32 + uCorF * 0.3, 0.5 + 0.5 * n.y + nuvem(p * 1.6 + uTempo * 0.05) * 0.5);
      // Desenho de luz no fundo da água.
      float luz = pow(0.5 + 0.5 * sin((p.x + n.x * 2.0) * 14.0 + sin((p.y + n.y * 2.0) * 11.0 + uTempo)), 7.0);
      // Soma a luz.
      c += uCorB * luz * 0.3;
      // Mistura a frase, em branco.
      c = mix(c, vec3(1.0), t);
      // Brilho do céu na superfície.
      c += pow(max(dot(n, normalize(vec3(0.3, 0.5, 0.8))), 0.0), 120.0) * 0.7;
      // Entrega a cor deste pontinho.
      gl_FragColor = vec4(c, 1.0);
    }
  `;

  // Água: cada toque é um pingo, e os anéis revelam a frase.
  E.agua = async (caixa, d, liga) => {
    // Espera a letra da frase chegar.
    await Luz.letras(['italic 400 40px "Instrument Serif"']);
    // Os 5 pingos: x, y e idade. Idade negativa = ainda não caiu.
    const gotas = new Float32Array([0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1]);
    // Cria o desenho.
    const luz = Luz.tela(caixa, AGUA, {
      // A cada quadro, envelhece os pingos.
      quadro: (t, dt) => {
        // Passa por cada pingo.
        for (let i = 2; i < 15; i += 3) {
          // Só envelhece quem já caiu.
          if (gotas[i] >= 0) gotas[i] += dt;
        }
        // Envia a lista.
        luz.lista('uGotas[0]', gotas, 3);
      }
    });
    // Guarda para desligar no fim.
    liga(luz);
    // Escreve a frase.
    const folha = Luz.molde(d.titulo, {
      // Largura da folha.
      w: Math.round(innerWidth),
      // Altura da folha.
      h: Math.round(innerHeight),
      // Tipo de letra da frase.
      fonte: (t) => 'italic 400 ' + t + 'px "Instrument Serif", Georgia, serif',
      // Lugar da frase: 8% da esquerda, 22% de cima, 84% de largura e 48% de altura.
      caixa: [0.08, 0.22, 0.84, 0.48],
      // Linhas juntinhas.
      entrelinha: 1
    });
    // Envia a frase para a placa de vídeo.
    luz.textura('uTexto', folha, 0);
    // Começa sem a frase.
    luz.valor('uP', 0);
    // Frase em texto comum, para aparelho sem placa de vídeo.
    K.add(caixa, 'h1', 'ab-titulo ab-reserva', d.titulo);
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Camada que ouve o dedo.
    const pele = E.pele(caixa);
    // Conta os pingos.
    let n = 0;
    // Quando o dedo encostar, cai um pingo ali.
    const pinga = (e) => {
      // Lado menor da tela.
      const m = Math.min(innerWidth, innerHeight);
      // Só tem lugar para 5 pingos.
      if (n >= 5) return;
      // Guarda o lugar: lado.
      gotas[n * 3] = (e.clientX * 2 - innerWidth) / m;
      // Guarda o lugar: altura.
      gotas[n * 3 + 1] = (innerHeight - e.clientY * 2) / m;
      // O pingo acaba de cair.
      gotas[n * 3 + 2] = 0;
      // Soma mais um pingo.
      n++;
      // Som de pingo.
      K.som(U.rand(500, 900), 120, 'sine', 0.07);
      // Tira a frase que ensina.
      dica.classList.add('some');
    };
    // Fica de olho no dedo encostando.
    pele.addEventListener('pointerdown', pinga);
    // Espera 4 pingos. Número maior = precisa de mais pingos.
    await K.vezes(pele, 4);
    // Para de ouvir o dedo.
    pele.removeEventListener('pointerdown', pinga);
    // Dá tempo de ver o último anel.
    await U.esperar(500);
    // A frase aparece inteira.
    await E.anima(0, 1, 900, (v) => luz.valor('uP', v));
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };

  /* ---------- lente: vidro que mostra o que está escondido ---------- */

  // Programa que pinta a folha fosca e a lente de vidro.
  const LENTE = `
    // A folha com as palavras.
    uniform sampler2D uTexto;
    // Onde a lente está.
    uniform vec2 uDedo;
    // Tamanho da lente.
    uniform float uRaio;
    // As palavras achadas: x, y e quanto já ficou nítida, de 0 a 1.
    uniform vec3 uAchou[3];
    // Fim do gesto: tudo fica nítido, de 0 a 1.
    uniform float uP;

    // Lê a folha embaçada, juntando 12 pontos em volta.
    vec4 fosco(vec2 uv) {
      // Soma das cores lidas.
      vec4 s = vec4(0.0);
      // Lê 12 pontos em espiral.
      for (int i = 0; i < 12; i++) {
        // Ângulo do ponto.
        float a = float(i) * 2.399;
        // Distância do ponto. Número maior = mais embaçado.
        float r = sqrt(float(i) / 12.0) * 0.042;
        // Lê a folha neste ponto.
        vec4 c = texture2D(uTexto, uv + vec2(cos(a), sin(a)) * r * vec2(uTela.y / uTela.x, 1.0));
        // Soma a cor, com peso pela transparência.
        s += vec4(c.rgb * c.a, c.a);
      }
      // Entrega a média.
      return s / 12.0;
    }

    void main() {
      // Lugar deste pontinho.
      vec2 p = lugar();
      // Lugar deste pontinho, de 0 a 1.
      vec2 uv = gl_FragCoord.xy / uTela;
      // Fundo: nuvens lentas com as cores do tema.
      float nv = nuvem(p * 1.3 + uTempo * 0.05);
      // Mistura o fundo.
      vec3 fundo = mix(uCorF * 0.55, uCorA * 0.55, smoothstep(0.25, 0.8, nv));
      // Soma a segunda cor.
      fundo = mix(fundo, uCorB * 0.6, smoothstep(0.55, 0.95, nuvem(p * 0.9 - uTempo * 0.04)) * 0.6);
      // Distância até a lente.
      float d = length(p - uDedo);
      // Lado de dentro da lente.
      float dentro = smoothstep(uRaio, uRaio - 0.012, d);
      // A borda do vidro entorta mais que o centro.
      float borda = pow(clamp(d / uRaio, 0.0, 1.0), 6.0);
      // Direção do centro até aqui.
      vec2 dir = (p - uDedo) / max(d, 0.001);
      // Corrige a régua para a folha de 0 a 1.
      vec2 forma = vec2(min(uTela.x, uTela.y) / uTela.x, min(uTela.x, uTela.y) / uTela.y) * 0.5;
      // Lugar da folha visto através do vidro: aumenta 1,25 vez e entorta na borda.
      vec2 q = uv - (p - uDedo) * forma * 0.2 - dir * forma * borda * 0.12;
      // Lê a folha nítida, com as cores separadas na borda como um vidro de verdade.
      vec4 n1 = texture2D(uTexto, q + dir * forma * borda * 0.03);
      // Lê a folha nítida sem separar.
      vec4 n2 = texture2D(uTexto, q);
      // Nitidez aqui, começando pela lente.
      float nitido = dentro;
      // Passa pelas 3 palavras.
      for (int i = 0; i < 3; i++) {
        // Palavra já achada fica nítida em volta.
        nitido = max(nitido, smoothstep(0.42, 0.2, length(p - uAchou[i].xy)) * uAchou[i].z);
      }
      // No fim, tudo fica nítido.
      nitido = max(nitido, uP);
      // Folha vista fora da lente, sem entortar.
      vec4 limpo = texture2D(uTexto, uv);
      // Lê a folha embaçada.
      vec4 f = fosco(uv);
      // Fora da lente: fundo com a folha embaçada.
      vec3 c = fundo + f.rgb * 0.6;
      // Dentro da lente, vê a folha através do vidro.
      vec4 nitida = mix(limpo, vec4(n1.r, n2.g, n2.b, max(n1.a, n2.a)), dentro);
      // Mistura a folha nítida.
      vec3 claro = mix(fundo * 0.35, nitida.rgb, nitida.a);
      // Junta o fosco com o nítido.
      c = mix(c, claro, nitido);
      // Risco de luz na borda do vidro.
      c += smoothstep(0.016, 0.0, abs(d - uRaio)) * 0.55;
      // Reflexo do céu no alto do vidro.
      c += dentro * smoothstep(0.55, 1.0, dot(dir, normalize(vec2(-0.5, 0.8))) * borda) * 0.2;
      // Entrega a cor deste pontinho.
      gl_FragColor = vec4(c, 1.0);
    }
  `;

  // Palavras de enfeite que ficam espalhadas na folha.
  const ENFEITE = 'sim talvez quase nunca sempre hoje agora depois olha aqui ali perto longe bem mais assim'.split(' ');

  // Lente: arraste o vidro pela tela e ache as 3 palavras escondidas.
  E.lente = async (caixa, d, liga) => {
    // Espera a letra chegar.
    await Luz.letras(['700 40px "Space Grotesk"']);
    // Largura da folha.
    const w = Math.round(innerWidth);
    // Altura da folha.
    const h = Math.round(innerHeight);
    // Cria a folha.
    const folha = document.createElement('canvas');
    // Largura da folha.
    folha.width = w;
    // Altura da folha.
    folha.height = h;
    // Pega o pincel.
    const cx = folha.getContext('2d');
    // Centraliza os textos.
    cx.textAlign = 'center';
    // Centraliza os textos na altura.
    cx.textBaseline = 'middle';
    // Cor das palavras de enfeite: branco, meio transparente.
    cx.fillStyle = 'rgba(255,255,255,.4)';
    // Letra das palavras de enfeite.
    cx.font = '500 ' + Math.round(Math.min(w, h) * 0.05) + 'px "Space Grotesk", Inter, sans-serif';
    // Espalha as palavras de enfeite em linhas.
    for (let y = h * 0.06; y < h; y += h * 0.075) {
      // Anda na linha.
      for (let x = w * 0.1; x < w; x += w * 0.27) {
        // Escreve uma palavra sorteada, um pouco fora do lugar.
        cx.fillText(U.sorteia(ENFEITE), x + U.rand(-14, 14), y + U.rand(-6, 6));
      }
    }
    // Lugar das 3 palavras escondidas, de 0 a 1.
    const lugares = [
      [0.3, 0.27],
      [0.68, 0.5],
      [0.34, 0.74]
    ];
    // Letra das palavras escondidas.
    cx.font = '700 ' + Math.round(Math.min(w, h) * 0.105) + 'px "Space Grotesk", Inter, sans-serif';
    // Cor das palavras escondidas: a cor de texto do fundo escuro.
    cx.fillStyle = '#ffffff';
    // Escreve as 3 palavras.
    d.pistas.forEach((t, i) => {
      // Mede a palavra, para limpar o fundo atrás dela.
      const larg = cx.measureText(t).width + 26;
      // Limpa o fundo atrás da palavra.
      cx.clearRect(w * lugares[i][0] - larg / 2, h * lugares[i][1] - h * 0.04, larg, h * 0.08);
      // Escreve.
      cx.fillText(t, w * lugares[i][0], h * lugares[i][1]);
    });
    // Lado menor da tela.
    const m = Math.min(innerWidth, innerHeight);
    // Lista das palavras achadas.
    const achou = new Float32Array(9);
    // Guarda o lugar de cada palavra na régua da placa de vídeo.
    lugares.forEach((l, i) => {
      // Lado.
      achou[i * 3] = (l[0] * innerWidth * 2 - innerWidth) / m;
      // Altura.
      achou[i * 3 + 1] = (innerHeight - l[1] * innerHeight * 2) / m;
    });
    // Lugar atual da lente.
    const dedo = [0, 0];
    // Lugar para onde a lente quer ir.
    const quer = [0, 0];
    // Cria o desenho.
    const luz = Luz.tela(caixa, LENTE, {
      // A cada quadro, anda com a lente.
      quadro: (t, dt) => {
        // Antes de tocar, a lente passeia sozinha.
        if (!tocou) quer.splice(0, 2, Math.sin(t * 0.7) * 0.35, Math.cos(t * 0.5) * 0.3);
        // A lente persegue o dedo.
        dedo[0] += (quer[0] - dedo[0]) * Math.min(1, dt * 14);
        // Mesma coisa na altura.
        dedo[1] += (quer[1] - dedo[1]) * Math.min(1, dt * 14);
        // Envia o lugar da lente.
        luz.valor('uDedo', dedo);
        // Envia as palavras achadas.
        luz.lista('uAchou[0]', achou, 3);
      }
    });
    // Marca se a pessoa já tocou.
    let tocou = false;
    // Guarda para desligar no fim.
    liga(luz);
    // Envia a folha para a placa de vídeo.
    luz.textura('uTexto', folha, 0);
    // Tamanho da lente. Número maior = lente maior.
    luz.valor('uRaio', 0.44);
    // Começa embaçado.
    luz.valor('uP', 0);
    // A frase grande.
    K.add(caixa, 'h1', 'ab-titulo', d.titulo);
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Marcador das palavras achadas.
    const marca = K.add(caixa, 'b', 'ab-achados', '0 de 3');
    // Camada que ouve o dedo.
    const pele = E.pele(caixa);
    // Quantas palavras já foram achadas.
    let n = 0;
    // Espera achar as 3 palavras.
    await E.varre(pele, 1, (parte, x, y) => {
      // A pessoa tocou.
      tocou = true;
      // Tira a frase que ensina.
      dica.classList.add('some');
      // Lugar do dedo na régua da placa de vídeo.
      quer[0] = (x * 2 - innerWidth) / m;
      // Mesma coisa na altura.
      quer[1] = (innerHeight - y * 2) / m;
      // Confere cada palavra.
      for (let i = 0; i < 3; i++) {
        // Já achada: pula.
        if (achou[i * 3 + 2] > 0) continue;
        // A lente chegou perto da palavra? Número maior = aceita mais longe.
        if (Math.hypot(achou[i * 3] - quer[0], achou[i * 3 + 1] - quer[1]) < 0.34) {
          // Marca como achada.
          achou[i * 3 + 2] = 1;
          // Soma mais uma.
          n++;
          // Mostra quantas faltam.
          marca.textContent = n + ' de 3';
          // Som que sobe a cada palavra.
          K.som(660 + n * 180, 140, 'sine', 0.07);
          // Treme.
          U.vibra(25);
        }
      }
      // Termina quando achar as 3.
      return n >= 3;
    });
    // Tira o marcador.
    marca.remove();
    // A lente vai embora e fica tudo nítido.
    await E.anima(0, 1, 700, (v) => {
      // Tudo fica nítido.
      luz.valor('uP', v);
      // A lente some.
      luz.valor('uRaio', 0.44 * (1 - v));
    });
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };
})();
