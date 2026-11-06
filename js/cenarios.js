/* ==========================================================
   cenarios.js — os fundos animados tecnológicos.
   Cada fundo é desenhado pela placa de vídeo do celular, pixel por pixel,
   muitas vezes por segundo. Eles reagem ao dedo e pulsam no ritmo da música.
   Qual fundo cada link usa fica em data/cenarios.js.
   Se o aparelho não souber desenhar assim, o site segue sem o fundo.
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
  const Cenarios = {};

  // Programa bem curto que estica o desenho na tela inteira.
  const VERTICE = 'attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }';

  // Ferramentas que todos os fundos usam. Este trecho é escrito na língua da placa de vídeo.
  const INICIO = `
    // Pede a maior precisão de contas que o aparelho tiver.
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    // Tamanho do desenho, em pontinhos.
    uniform vec2 uTela;
    // Segundos desde que o fundo começou.
    uniform float uTempo;
    // Onde o dedo está, de -1 a 1.
    uniform vec2 uDedo;
    // Último toque: posição (x, y) e quantos segundos faz (z).
    uniform vec3 uToque;
    // Batida da música: 1 na hora da batida, caindo até 0.
    uniform float uBatida;
    // Cor de destaque do tema.
    uniform vec3 uCorA;
    // Segunda cor de destaque do tema.
    uniform vec3 uCorB;
    // Cor do texto do tema.
    uniform vec3 uCorC;

    // Sorteia um número de 0 a 1 para cada lugar.
    float sorte(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    // Sorteia dois números de 0 a 1 para cada lugar.
    vec2 sorte2(vec2 p) {
      return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
    }

    // Cria um ruído macio, sem pulos, como uma névoa.
    float ruido(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = mix(sorte(i), sorte(i + vec2(1.0, 0.0)), f.x);
      float b = mix(sorte(i + vec2(0.0, 1.0)), sorte(i + vec2(1.0, 1.0)), f.x);
      return mix(a, b, f.y);
    }

    // Soma várias névoas, da grande para a pequena, e forma nuvens.
    float nuvem(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * ruido(p);
        p = p * 2.03 + 7.1;
        a *= 0.5;
      }
      return v;
    }

    // Monta um giro de um ângulo, para rodar pontos.
    mat2 gira(float a) {
      float c = cos(a);
      float s = sin(a);
      return mat2(c, -s, s, c);
    }

    // Mede a distância de um ponto até um traço reto.
    float traco(vec2 p, vec2 a, vec2 b) {
      vec2 pa = p - a;
      vec2 ba = b - a;
      float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
      return length(pa - ba * h);
    }
  `;

  // Parte final, igual em todos: junta o fundo, a onda do toque e a batida.
  const FINAL = `
    void main() {
      // Transforma o pontinho em uma posição de -1 a 1, no lado menor da tela.
      vec2 p = (gl_FragCoord.xy * 2.0 - uTela) / min(uTela.x, uTela.y);
      // Desenha o fundo, com um leve movimento conforme o dedo.
      vec4 c = cena(p + uDedo * 0.06);
      // Mede a distância até o último toque.
      float r = length(p - uToque.xy);
      // Monta a onda que sai do dedo e some depois de 1 segundo.
      float onda = smoothstep(0.06, 0.0, abs(r - uToque.z * 1.7)) * max(0.0, 1.0 - uToque.z);
      // Pinta a onda com a segunda cor.
      c.rgb = mix(c.rgb, uCorB, onda);
      // Deixa a onda bem visível.
      c.a = max(c.a, onda * 0.9);
      // Deixa o meio da tela mais calmo, para o texto ser fácil de ler.
      float meio = mix(0.45, 1.0, smoothstep(0.2, 1.2, length(p * vec2(1.0, 0.55))));
      // Calcula a força final do pontinho, que sobe com a batida da música.
      float a = clamp(c.a * meio * (0.82 + uBatida * 0.4), 0.0, 1.0);
      // Entrega a cor final do pontinho.
      gl_FragColor = vec4(c.rgb * a, a);
    }
  `;

  // Os 20 fundos. O nome de cada um é usado em data/cenarios.js.
  const CENAS = {
    // Rede neural: pontos ligados por linhas, que se mexem devagar.
    rede: `
      // Calcula onde fica o ponto de cada quadradinho.
      vec2 no(vec2 c) {
        vec2 h = sorte2(c);
        return c + 0.5 + 0.38 * sin(uTempo * (0.3 + h * 0.6) + h * 6.283);
      }
      vec4 cena(vec2 p) {
        // Número maior = mais pontos na tela.
        vec2 q = p * 2.6;
        vec2 c = floor(q);
        float v = 0.0;
        // Olha os quadradinhos em volta deste.
        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            vec2 id = c + vec2(float(x), float(y));
            vec2 n = no(id);
            // Brilho do ponto.
            v += 0.0035 / (dot(q - n, q - n) + 0.0025);
            // Linhas até os pontos vizinhos, mais fortes quando estão perto.
            vec2 n1 = no(id + vec2(1.0, 0.0));
            vec2 n2 = no(id + vec2(0.0, 1.0));
            vec2 n3 = no(id + vec2(1.0, 1.0));
            v += smoothstep(0.024, 0.0, traco(q, n, n1)) * smoothstep(1.7, 0.5, length(n - n1));
            v += smoothstep(0.024, 0.0, traco(q, n, n2)) * smoothstep(1.7, 0.5, length(n - n2));
            v += smoothstep(0.024, 0.0, traco(q, n, n3)) * smoothstep(1.7, 0.5, length(n - n3));
          }
        }
        return vec4(mix(uCorA, uCorB, 0.5 + 0.5 * sin(p.y + uTempo * 0.3)), clamp(v, 0.0, 1.0));
      }
    `,
    // Pôr do sol digital: sol listrado e chão quadriculado andando.
    sintetica: `
      vec4 cena(vec2 p) {
        // Altura da linha do horizonte.
        float hz = -0.2;
        float a = 0.0;
        vec3 cor = uCorA;
        // Sol redondo.
        float r = length(p - vec2(0.0, 0.35));
        float disco = smoothstep(0.66, 0.63, r);
        // Listras que cortam o sol, só na parte de baixo.
        float listra = step(0.32, fract((p.y + uTempo * 0.06) * 8.0));
        disco *= mix(1.0, listra, smoothstep(0.55, 0.15, p.y));
        // Só desenha o sol acima do horizonte.
        disco *= step(hz, p.y);
        a = disco * 0.9;
        cor = mix(uCorB, uCorA, smoothstep(-0.2, 0.9, p.y));
        // Chão quadriculado, abaixo do horizonte.
        if (p.y < hz) {
          float d = hz - p.y;
          float z = 0.55 / d;
          vec2 q = vec2(p.x * z, z + uTempo * 1.4);
          vec2 f = abs(fract(q) - 0.5);
          float w = min(0.46, 0.03 + 0.02 * z);
          float l = max(smoothstep(0.5 - w, 0.5, f.x), smoothstep(0.5 - w, 0.5, f.y));
          a = l * smoothstep(0.0, 0.25, d);
          cor = uCorA;
        }
        // Brilho na linha do horizonte.
        a = max(a, 0.012 / (abs(p.y - hz) + 0.012));
        return vec4(cor, clamp(a, 0.0, 1.0));
      }
    `,
    // Chuva digital: colunas de símbolos caindo.
    chuva: `
      vec4 cena(vec2 p) {
        // Números maiores = símbolos menores.
        vec2 q = vec2(p.x * 11.0, p.y * 7.0);
        float col = floor(q.x);
        float h = sorte(vec2(col, 3.0));
        // Cada coluna cai em uma velocidade.
        float y = q.y + uTempo * (1.5 + h * 3.0) + h * 40.0;
        float cel = floor(y);
        vec2 f = fract(vec2(q.x, y));
        // Rastro: forte na ponta e apagando para trás.
        float cauda = fract(y / (10.0 + h * 14.0));
        float brilho = pow(1.0 - cauda, 3.0);
        // Cada símbolo é uma grade de 3 por 5 que troca de vez em quando.
        vec2 b = floor(f * vec2(3.0, 5.0));
        float troca = floor(uTempo * (2.0 + h * 4.0));
        float bit = step(0.5, sorte(vec2(col * 7.0 + b.x, cel * 13.0 + b.y + troca)));
        // Deixa um espaço entre os símbolos.
        float borda = step(0.12, f.x) * step(f.x, 0.88) * step(0.1, f.y) * step(f.y, 0.9);
        return vec4(mix(uCorA, vec3(1.0), pow(brilho, 6.0)), bit * borda * brilho * 0.95);
      }
    `,
    // Ondas de som: sete linhas brilhantes que balançam com a música.
    ondas: `
      vec4 cena(vec2 p) {
        float v = 0.0;
        vec3 soma = vec3(0.0);
        for (int i = 0; i < 7; i++) {
          float k = float(i);
          float t = uTempo * (0.5 + k * 0.07);
          // Altura da onda neste ponto; a batida da música aumenta a onda.
          float y = sin(p.x * (1.6 + k * 0.25) + t + k) * (0.22 + 0.06 * k) * (1.0 + uBatida * 0.7);
          y += sin(p.x * 3.7 - t * 1.3 + k * 2.0) * 0.08 + (k - 3.0) * 0.14;
          // Brilho da linha: mais forte bem em cima dela.
          float l = 0.0035 / (abs(p.y - y) + 0.004);
          soma += mix(uCorA, uCorB, k / 6.0) * l;
          v += l;
        }
        return vec4(soma / max(v, 0.001), clamp(v, 0.0, 1.0));
      }
    `,
    // Túnel de luz: anéis e linhas vindo na direção da pessoa.
    tunel: `
      vec4 cena(vec2 p) {
        // Formato quadrado do túnel.
        float r = max(abs(p.x), abs(p.y) * 0.8);
        float a = atan(p.y, p.x) + uTempo * 0.1;
        // Profundidade: anda para a frente com o tempo.
        float z = 0.5 / (r + 0.05) + uTempo * 1.2;
        // Anéis finos e linhas que correm para o fundo.
        float anel = pow(abs(sin(z * 3.14159)), 40.0);
        float raio = pow(abs(sin(a * 6.0)), 60.0);
        // Apaga o túnel lá no fundo.
        float v = (anel + raio * 0.7) * smoothstep(0.03, 0.55, r);
        return vec4(mix(uCorA, uCorB, fract(z * 0.25)), clamp(v, 0.0, 1.0));
      }
    `,
    // Colmeia: hexágonos que acendem em ondas.
    colmeia: `
      // Mede a distância até a borda do hexágono.
      float hexa(vec2 p) {
        p = abs(p);
        return max(dot(p, vec2(0.5, 0.866)), p.x);
      }
      vec4 cena(vec2 p) {
        vec2 s = vec2(1.0, 1.732);
        // Número maior = hexágonos menores.
        vec2 q = p * 4.0;
        vec2 a = mod(q, s) - s * 0.5;
        vec2 b = mod(q - s * 0.5, s) - s * 0.5;
        vec2 f = dot(a, a) < dot(b, b) ? a : b;
        vec2 id = q - f;
        float borda = 0.5 - hexa(f);
        // Onda que sai do centro.
        float onda = 0.5 + 0.5 * sin(length(id) * 1.1 - uTempo * 2.2);
        float pulso = pow(onda, 4.0);
        float v = smoothstep(0.06, 0.0, borda) * (0.3 + pulso * 0.7) + pulso * 0.22 * smoothstep(0.0, 0.1, borda);
        return vec4(mix(uCorA, uCorB, onda), clamp(v, 0.0, 1.0));
      }
    `,
    // Placa de circuito: trilhas curvas com luz correndo por dentro.
    circuito: `
      vec4 cena(vec2 p) {
        // Número maior = trilhas menores.
        vec2 q = p * 3.4 + vec2(0.0, uTempo * 0.06);
        vec2 id = floor(q);
        vec2 f = fract(q) - 0.5;
        float h = sorte(id);
        // Cada quadradinho vira para um lado, formando caminhos.
        if (h < 0.5) {
          f.x = -f.x;
        }
        vec2 c = f - sign(f.x + f.y + 0.0001) * 0.5;
        float d = abs(length(c) - 0.5);
        float linha = smoothstep(0.05, 0.02, d);
        // Luz que corre pela trilha.
        float corre = pow(0.5 + 0.5 * sin(atan(c.y, c.x) * 2.0 + uTempo * 3.0 + h * 6.283), 10.0);
        // Pontinhos de solda nas pontas das trilhas.
        float solda = smoothstep(0.09, 0.06, length(abs(f) - vec2(0.5, 0.0))) + smoothstep(0.09, 0.06, length(abs(f) - vec2(0.0, 0.5)));
        float v = linha * (0.22 + corre) + solda * 0.35;
        return vec4(mix(uCorA, uCorB, corre), clamp(v, 0.0, 1.0));
      }
    `,
    // Radar: varredura girando e pontos que acendem quando ela passa.
    radar: `
      vec4 cena(vec2 p) {
        float r = length(p);
        float a = atan(p.y, p.x);
        // Rastro da varredura: forte logo depois que ela passa.
        float giro = mod(a - uTempo * 1.1, 6.2832) / 6.2832;
        float varre = pow(giro, 7.0) * smoothstep(1.9, 0.1, r);
        // Anéis de distância e cruz do meio.
        float aneis = smoothstep(0.014, 0.0, abs(fract(r * 2.6) - 0.5) / 2.6);
        float cruz = smoothstep(0.006, 0.0, min(abs(p.x), abs(p.y)));
        float v = varre * 0.75 + (aneis + cruz) * 0.28;
        // Pontos encontrados pelo radar.
        for (int i = 0; i < 7; i++) {
          vec2 b = (sorte2(vec2(float(i), floor(uTempo * 0.1))) - 0.5) * vec2(2.2, 3.2);
          float ja = mod(atan(b.y, b.x) - uTempo * 1.1, 6.2832) / 6.2832;
          v += pow(ja, 9.0) * 0.022 / (length(p - b) + 0.02);
        }
        return vec4(mix(uCorA, uCorB, varre), clamp(v, 0.0, 1.0));
      }
    `,
    // Globo holográfico: esfera de linhas girando.
    globo: `
      vec4 cena(vec2 p) {
        // Tamanho do globo.
        float R = 0.86;
        float rr = length(p);
        // Brilho na borda do globo.
        float v = 0.012 / (abs(rr - R) + 0.012);
        if (rr < R) {
          // Descobre o ponto da esfera que está neste pontinho.
          vec3 n = vec3(p, sqrt(R * R - rr * rr)) / R;
          vec2 xz = gira(uTempo * 0.25) * n.xz;
          n.x = xz.x;
          n.z = xz.y;
          vec2 yz = gira(0.35) * n.yz;
          n.y = yz.x;
          n.z = yz.y;
          float lon = atan(n.x, n.z) / 6.2832;
          float lat = asin(clamp(n.y, -1.0, 1.0)) / 3.1416;
          // Linhas de meridiano e paralelo.
          float g1 = smoothstep(0.07, 0.02, abs(fract(lon * 14.0) - 0.5));
          float g2 = smoothstep(0.07, 0.02, abs(fract(lat * 11.0) - 0.5));
          // Continentes feitos de pontinhos.
          vec2 c = vec2(lon * 90.0, lat * 60.0);
          float terra = step(0.52, nuvem(vec2(lon * 9.0, lat * 7.0) + 3.0)) * smoothstep(0.42, 0.2, length(fract(c) - 0.5));
          v += (g1 + g2) * 0.32 + terra * 0.8;
        }
        return vec4(mix(uCorA, uCorB, 0.5 + 0.5 * p.y), clamp(v, 0.0, 1.0));
      }
    `,
    // Nebulosa: nuvens de gás no espaço, com estrelas.
    nebulosa: `
      vec4 cena(vec2 p) {
        float t = uTempo * 0.05;
        // Uma nuvem empurra a outra, formando redemoinhos.
        float w = nuvem(p * 0.9 + vec2(t, -t));
        float v = nuvem(p * 1.3 + w * 1.7 + vec2(-t * 1.3, t));
        vec3 cor = mix(uCorA, uCorB, smoothstep(0.3, 0.72, v));
        // Estrelas sorteadas.
        float est = pow(sorte(floor(p * 95.0)), 70.0);
        return vec4(mix(cor, vec3(1.0), est), clamp(smoothstep(0.32, 0.82, v) * 0.85 + est, 0.0, 1.0));
      }
    `,
    // Plasma: linhas de contorno que derretem devagar.
    plasma: `
      vec4 cena(vec2 p) {
        float t = uTempo * 0.5;
        // Soma de ondas em várias direções.
        float v = sin(p.x * 3.0 + t) + sin(p.y * 3.7 - t * 1.2) + sin((p.x + p.y) * 2.6 + t * 0.7);
        v += sin(length(p * 2.4 + vec2(sin(t), cos(t))) * 3.0);
        v = v * 0.25 + 0.5;
        // Linhas de contorno, como um mapa de relevo.
        float faixas = pow(0.5 + 0.5 * sin(v * 26.0), 8.0);
        return vec4(mix(uCorA, uCorB, v), 0.14 + faixas * 0.75);
      }
    `,
    // Lâmpada de lava: bolhas de luz que se juntam e se separam.
    lava: `
      vec4 cena(vec2 p) {
        float v = 0.0;
        for (int i = 0; i < 8; i++) {
          float k = float(i);
          // Cada bolha anda por um caminho diferente.
          vec2 c = vec2(sin(uTempo * (0.21 + k * 0.05) + k * 2.1) * 0.95, sin(uTempo * (0.17 + k * 0.04) + k * 1.3) * 1.6);
          float r = 0.17 + 0.06 * sin(k * 1.7);
          v += r * r / (dot(p - c, p - c) + 0.001);
        }
        float corpo = smoothstep(0.9, 1.05, v);
        float borda = smoothstep(0.55, 0.95, v) * (1.0 - corpo);
        return vec4(mix(uCorA, uCorB, clamp(v * 0.33, 0.0, 1.0)), corpo * 0.72 + borda * 0.6);
      }
    `,
    // Velocidade da luz: riscos saindo do centro.
    luz: `
      vec4 cena(vec2 p) {
        float r = length(p);
        float a = (atan(p.y, p.x) + 3.1416) / 6.2832;
        float v = 0.0;
        // Três camadas de riscos.
        for (int i = 0; i < 3; i++) {
          float k = float(i);
          float n = 44.0 + k * 23.0;
          float s = floor(a * n);
          float h = sorte(vec2(s, k));
          // Posição do risco, acelerando para fora.
          float pos = fract(h * 9.0 + uTempo * (0.25 + h * 0.5));
          float alvo = pos * pos * 2.6;
          float comp = 0.05 + pos * 0.45;
          float d = r - alvo;
          float largura = smoothstep(0.5, 0.15, abs(fract(a * n) - 0.5));
          v += smoothstep(-comp, 0.0, d) * smoothstep(0.012, 0.0, d) * step(0.35, h) * largura;
        }
        return vec4(mix(uCorA, uCorB, smoothstep(0.2, 1.4, r)), clamp(v, 0.0, 1.0));
      }
    `,
    // Corações de luz: contornos de coração se espalhando.
    coracoes: `
      // Mede a distância até o contorno de um coração.
      float coracao(vec2 p) {
        p.x = abs(p.x);
        if (p.y + p.x > 1.0) {
          return length(p - vec2(0.25, 0.75)) - 0.35355;
        }
        vec2 a = p - vec2(0.0, 1.0);
        vec2 b = p - 0.5 * max(p.x + p.y, 0.0);
        return sqrt(min(dot(a, a), dot(b, b))) * sign(p.x - p.y);
      }
      vec4 cena(vec2 p) {
        float d = coracao(p * 1.15 + vec2(0.0, 0.55));
        // Anéis que saem do coração; a batida da música empurra os anéis.
        float aneis = pow(0.5 + 0.5 * sin(d * 24.0 - uTempo * 3.0 - uBatida * 1.5), 12.0);
        float v = aneis * smoothstep(2.4, 0.0, abs(d)) + 0.012 / (abs(d) + 0.012);
        return vec4(mix(uCorA, uCorB, 0.5 + 0.5 * sin(d * 4.0 - uTempo)), clamp(v, 0.0, 1.0));
      }
    `,
    // Painel de LED: parede de luzes com ondas passando.
    painel: `
      vec4 cena(vec2 p) {
        // Número maior = luzes menores.
        vec2 q = p * 13.0;
        vec2 id = floor(q);
        vec2 f = fract(q) - 0.5;
        // Soma de ondas diferentes acende cada luz.
        float o = sin(length(id) * 0.42 - uTempo * 2.0) + sin(id.x * 0.3 + uTempo) + sin(id.y * 0.26 - uTempo * 0.7);
        float h = pow(0.5 + o / 6.0, 2.2);
        float raio = 0.12 + 0.3 * h;
        float led = smoothstep(raio, raio - 0.08, length(f));
        return vec4(mix(uCorA, uCorB, h), led * (0.18 + h * 0.82));
      }
    `,
    // Galáxia: braços em espiral girando devagar.
    galaxia: `
      vec4 cena(vec2 p) {
        vec2 q = gira(0.5) * p;
        q.y *= 1.4;
        float r = length(q);
        float a = atan(q.y, q.x);
        // Dois braços em espiral.
        float braco = pow(0.5 + 0.5 * sin(a * 2.0 - log(r + 0.05) * 4.0 + uTempo * 0.25), 3.0);
        float v = braco * exp(-r * 1.1) * (0.5 + nuvem(q * 3.0 + uTempo * 0.02) * 1.1);
        // Miolo brilhante e estrelas soltas.
        v += exp(-r * 8.0) * 0.9;
        float est = pow(sorte(floor(p * 120.0)), 60.0);
        return vec4(mix(uCorA, mix(uCorB, vec3(1.0), exp(-r * 3.0)), braco), clamp(v + est, 0.0, 1.0));
      }
    `,
    // Cristal: células de vidro com bordas de luz.
    cristal: `
      vec4 cena(vec2 p) {
        // Número maior = células menores.
        vec2 q = p * 2.4;
        vec2 c = floor(q);
        vec2 f = fract(q);
        float m1 = 9.0;
        float m2 = 9.0;
        vec2 dono = vec2(0.0);
        // Procura as duas sementes mais próximas.
        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            vec2 o = vec2(float(x), float(y));
            vec2 h = sorte2(c + o);
            float d = length(o + 0.5 + 0.4 * sin(uTempo * 0.6 + h * 6.283) - f);
            if (d < m1) {
              m2 = m1;
              m1 = d;
              dono = c + o;
            } else if (d < m2) {
              m2 = d;
            }
          }
        }
        float borda = smoothstep(0.06, 0.0, m2 - m1);
        float h = sorte(dono);
        // Cada célula pisca no seu tempo.
        float pisca = pow(0.5 + 0.5 * sin(uTempo * 1.3 + h * 6.283), 3.0);
        return vec4(mix(uCorA, uCorB, h), clamp(borda * 0.8 + pisca * 0.24 * (1.0 - m1), 0.0, 1.0));
      }
    `,
    // Montanhas de sinal: linhas que formam um relevo em movimento.
    terreno: `
      vec4 cena(vec2 p) {
        float v = 0.0;
        // Só as bordas da tela ficam planas.
        float janela = smoothstep(1.15, 0.1, abs(p.x));
        for (int i = 0; i < 24; i++) {
          float k = float(i);
          float base = 1.7 - k * 0.15;
          // Altura da linha, sorteada e andando com o tempo.
          float h = pow(ruido(vec2(p.x * 3.2 + k * 1.7, k * 0.9 + uTempo * 0.5)), 2.0) * 0.85 * janela;
          v += 0.0017 / (abs(p.y - base - h) + 0.0022);
        }
        return vec4(mix(uCorA, uCorB, 0.5 + 0.4 * p.y), clamp(v, 0.0, 1.0));
      }
    `,
    // Anéis de painel: círculos girando, como a tela de uma nave.
    aneis: `
      vec4 cena(vec2 p) {
        float r = length(p);
        float a = atan(p.y, p.x);
        float v = 0.0;
        for (int i = 0; i < 7; i++) {
          float k = float(i);
          float R = 0.3 + k * 0.27;
          // Cada anel gira para um lado.
          float lado = mod(k, 2.0) * 2.0 - 1.0;
          float giro = a + lado * uTempo * (0.15 + 0.06 * k) + k;
          // Corta o anel em pedaços.
          float pedaco = step(0.35 + 0.1 * sin(k), fract(giro / 6.2832 * (3.0 + k)));
          v += smoothstep(0.014 + 0.004 * k, 0.0, abs(r - R)) * pedaco;
          // Risquinhos de medida ao lado do anel.
          float risco = smoothstep(0.9, 1.0, abs(sin(giro * (12.0 + k * 6.0))));
          v += smoothstep(0.03, 0.0, abs(r - R - 0.05)) * risco * 0.4;
        }
        return vec4(mix(uCorA, uCorB, fract(r * 0.7)), clamp(v, 0.0, 1.0));
      }
    `,
    // Caleidoscópio: desenho espelhado que gira.
    mandala: `
      vec4 cena(vec2 p) {
        float r = length(p);
        // Dobra a tela em 8 fatias iguais.
        float a = atan(p.y, p.x) + uTempo * 0.08;
        a = abs(mod(a, 0.7854) - 0.3927);
        vec2 q = vec2(cos(a), sin(a)) * r;
        float v = 0.0;
        // Dobra várias vezes, formando o desenho.
        for (int i = 0; i < 5; i++) {
          q = abs(q) - 0.34;
          q = gira(0.6 + uTempo * 0.05) * q;
          v += 0.0085 / (abs(q.y) + 0.0085);
        }
        return vec4(mix(uCorA, uCorB, fract(r * 0.8 + uTempo * 0.05)), clamp(v * 0.42, 0.0, 1.0));
      }
    `
  };

  // Lista dos nomes dos fundos, para outras partes do site conferirem.
  Cenarios.nomes = Object.keys(CENAS);

  // Lê uma cor do tema e devolve os três números que a placa de vídeo entende.
  const cor = (nome) => {
    // Pega o código da cor no CSS.
    const h = getComputedStyle(document.documentElement).getPropertyValue(nome).trim().replace('#', '');
    // Separa vermelho, verde e azul.
    const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16);
    // Devolve cada um de 0 a 1.
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  };

  // Traduz um programa da placa de vídeo. Se tiver erro, avisa.
  const compila = (gl, tipo, fonte) => {
    // Cria o programa vazio.
    const s = gl.createShader(tipo);
    // Coloca o texto do programa.
    gl.shaderSource(s, fonte);
    // Manda traduzir.
    gl.compileShader(s);
    // Deu erro na tradução: avisa e para.
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    // Entrega o programa traduzido.
    return s;
  };

  // Liga o fundo de nome 'nome'. Devolve true se conseguiu.
  Cenarios.iniciar = (nome) => {
    // Pega o quadro de desenho.
    const cv = U.$('#cenario');
    // Quem pediu menos movimento fica sem o fundo animado.
    const calmo = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Sem quadro, sem fundo conhecido, com menos movimento ou em teste rápido: não liga.
    if (!cv || !CENAS[nome] || calmo || window.__semCenario) return false;
    // Pede a ferramenta de desenho da placa de vídeo.
    const gl = cv.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      powerPreference: 'low-power'
    });
    // Aparelho sem essa ferramenta: segue sem o fundo.
    if (!gl) return false;
    // Guarda o programa do fundo.
    let prog;
    // Tenta montar o programa; se der erro, segue sem o fundo.
    try {
      // Cria o programa completo.
      prog = gl.createProgram();
      // Junta o programa que estica o desenho.
      gl.attachShader(prog, compila(gl, gl.VERTEX_SHADER, VERTICE));
      // Junta o programa que pinta cada pontinho.
      gl.attachShader(prog, compila(gl, gl.FRAGMENT_SHADER, INICIO + CENAS[nome] + FINAL));
      // Liga as partes.
      gl.linkProgram(prog);
      // Se as partes não encaixaram, avisa.
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
      // Se deu erro, cai aqui e o site continua funcionando.
    } catch (e) {
      // Escreve o erro no console, para ajudar a achar o problema.
      console.error('cenario ' + nome, e);
      // Segue sem o fundo.
      return false;
    }
    // Usa o programa pronto.
    gl.useProgram(prog);
    // Cria dois triângulos que cobrem a tela inteira.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    // Coloca os cantos da tela.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    // Procura onde o programa recebe os cantos.
    const pos = gl.getAttribLocation(prog, 'p');
    // Liga essa entrada.
    gl.enableVertexAttribArray(pos);
    // Diz que cada canto tem 2 números.
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    // Atalho para achar cada informação que o programa recebe.
    const u = (n) => gl.getUniformLocation(prog, n);
    // Envia a cor de destaque do tema.
    gl.uniform3fv(u('uCorA'), cor('--ac'));
    // Envia a segunda cor de destaque.
    gl.uniform3fv(u('uCorB'), cor('--ac2'));
    // Envia a cor do texto.
    gl.uniform3fv(u('uCorC'), cor('--tx'));
    // Nitidez do desenho: número menor = mais leve para o aparelho.
    let escala = Math.min(window.devicePixelRatio || 1, 1.25) * 0.8;
    // Anotações: tamanho da tela, dedo e toque.
    let W = 1,
      H = 1,
      dx = 0,
      dy = 0,
      ax = 0,
      ay = 0,
      tx = 0,
      ty = 0,
      tt = -9;
    // Anotações da medição de velocidade.
    let quadros = 0,
      ultimo = 0,
      soma = 0;
    // Ajusta o desenho ao tamanho da tela.
    const medir = () => {
      // Anota o tamanho da tela.
      W = window.innerWidth;
      // Anota a altura da tela.
      H = window.innerHeight;
      // Ajusta o tamanho real do desenho.
      cv.width = Math.round(W * escala);
      // Ajusta a altura do desenho ao tamanho real.
      cv.height = Math.round(H * escala);
      // Diz à placa de vídeo o tamanho do desenho.
      gl.viewport(0, 0, cv.width, cv.height);
      // Envia o tamanho para o programa.
      gl.uniform2f(u('uTela'), cv.width, cv.height);
    };
    // Mede agora.
    medir();
    // Mede de novo quando a tela mudar de tamanho.
    window.addEventListener('resize', medir);
    // Quando o dedo andar, guarda para onde o fundo deve se mexer.
    window.addEventListener(
      'pointermove',
      (e) => {
        // Guarda o novo valor em ax.
        ax = (e.clientX / W - 0.5) * 2;
        // Guarda o novo valor em ay.
        ay = (0.5 - e.clientY / H) * 2;
      },
      { passive: true }
    );
    // Quando o dedo encostar, guarda o lugar e a hora, para a onda sair dali.
    window.addEventListener(
      'pointerdown',
      (e) => {
        // Pega o menor número e guarda com o nome "m".
        const m = Math.min(W, H);
        // Guarda o novo valor em tx.
        tx = (e.clientX * 2 - W) / m;
        // Guarda o novo valor em ty.
        ty = (H - e.clientY * 2) / m;
        // Guarda o novo valor em tt.
        tt = performance.now() / 1000;
      },
      { passive: true }
    );
    // Horário em que o fundo começou.
    const t0 = performance.now();
    // Desenha um quadro.
    const quadro = (t) => {
      // Já pede o próximo quadro.
      requestAnimationFrame(quadro);
      // Aba escondida ou arte cobrindo a tela inteira: não gasta bateria.
      if (document.hidden || U.$('.cena.cheia:not(.saindo)')) {
        // Anota o horário deste quadro, para medir o tempo.
        ultimo = 0;
        // Para por aqui.
        return;
      }
      // Soma o tempo deste quadro, para medir a velocidade.
      if (ultimo) {
        // Soma mais um pouco em soma.
        soma += t - ultimo;
        // Soma 1 em quadros.
        quadros++;
      }
      // Anota o horário deste quadro.
      ultimo = t;
      // A cada 40 quadros, confere se o aparelho está dando conta.
      if (quadros === 40) {
        // Aparelho lento: diminui a nitidez para ficar leve.
        if (soma / quadros > 30 && escala > 0.3) {
          // Multiplica escala, para ir diminuindo ou aumentando aos poucos.
          escala *= 0.8;
          // Usa a ajuda "medir" (ela está definida neste arquivo).
          medir();
        }
        // Zera a medição.
        quadros = 0;
        // Guarda o novo valor em soma.
        soma = 0;
      }
      // Faz o movimento do dedo ficar suave.
      dx += (ax - dx) * 0.05;
      // Soma mais um pouco em dy.
      dy += (ay - dy) * 0.05;
      // Envia o tempo.
      gl.uniform1f(u('uTempo'), (t - t0) / 1000);
      // Envia a posição do dedo.
      gl.uniform2f(u('uDedo'), dx, dy);
      // Envia o último toque.
      gl.uniform3f(u('uToque'), tx, ty, t / 1000 - tt);
      // Envia a batida da música.
      gl.uniform1f(u('uBatida'), Musica.batida());
      // Pinta o quadro.
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    // Começa a desenhar.
    requestAnimationFrame(quadro);
    // Avisa que deu certo.
    return true;
  };

  // Deixa estas ferramentas disponíveis para os outros arquivos.
  g.Cenarios = Cenarios;
  // Fecha a caixa e já roda tudo.
})(window);
