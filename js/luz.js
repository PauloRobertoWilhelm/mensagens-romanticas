/* ==========================================================
   luz.js — o motor de luz das entradas dos links.
   Ele conversa com a placa de vídeo do celular para desenhar coisas
   que seriam pesadas demais do jeito normal: líquido, poeira, calor.
   Quem usa este motor são os arquivos js/entradas-*.js.
   ========================================================== */

/* ==========================================================
   COMO LER ESTE ARQUIVO (explicado para quem nunca viu código)

   Este arquivo é o "cérebro": diz o que acontece e em que ordem.
   As cores e os tamanhos NÃO ficam aqui; ficam nos arquivos da pasta css.

   Cada linha que começa com // é só uma explicação: o computador ignora.
   Ela sempre fala da linha de código logo abaixo.

   Este arquivo é o mais difícil do site e quase nunca precisa mudar.
   Se quiser mexer em uma entrada, procure nos arquivos js/entradas-*.js.
   ========================================================== */

// Caixa fechada: o que está aqui dentro não se mistura com o resto do site.
(function (g) {
  // Liga o modo estrito: o navegador avisa de erros bobos.
  'use strict';

  // Caixa onde ficam as ferramentas deste arquivo.
  const Luz = {};

  // Quem pediu menos movimento no celular vê tudo 4 vezes mais devagar.
  const ritmo = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.25 : 1;

  // Programa bem curto que estica o desenho na tela inteira.
  const VERTICE = 'attribute vec2 aCanto; void main() { gl_Position = vec4(aCanto, 0.0, 1.0); }';

  // Ferramentas que todos os desenhos usam. Este trecho é escrito na língua da placa de vídeo.
  Luz.BASE = `
    // Pede a maior precisão de contas que o aparelho tiver.
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    // Tamanho do desenho, em pontinhos.
    uniform vec2 uTela;
    // Segundos desde que o desenho começou.
    uniform float uTempo;
    // Cor de destaque do tema.
    uniform vec3 uCorA;
    // Segunda cor de destaque do tema.
    uniform vec3 uCorB;
    // Cor de fundo do tema.
    uniform vec3 uCorF;

    // Sorteia um número de 0 a 1 para cada lugar. O mesmo lugar sempre dá o mesmo número.
    float sorte(vec2 p) {
      // Faz uma conta bagunçada e fica só com o que vem depois da vírgula.
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    // Cria um ruído macio, sem pulos, como uma névoa.
    float ruido(vec2 p) {
      // Quadradinho em que este lugar está.
      vec2 i = floor(p);
      // Posição dentro do quadradinho, de 0 a 1.
      vec2 f = fract(p);
      // Suaviza a passagem de um quadradinho para outro.
      f = f * f * (3.0 - 2.0 * f);
      // Mistura os dois cantos de baixo.
      float a = mix(sorte(i), sorte(i + vec2(1.0, 0.0)), f.x);
      // Mistura os dois cantos de cima.
      float b = mix(sorte(i + vec2(0.0, 1.0)), sorte(i + vec2(1.0, 1.0)), f.x);
      // Mistura os de baixo com os de cima.
      return mix(a, b, f.y);
    }

    // Soma várias névoas, da grande para a pequena, e forma nuvens.
    float nuvem(vec2 p) {
      // Soma das névoas.
      float v = 0.0;
      // Força da névoa atual.
      float a = 0.5;
      // Quatro névoas. Número maior = nuvem com mais detalhes.
      for (int i = 0; i < 4; i++) {
        // Soma esta névoa.
        v += a * ruido(p);
        // A próxima névoa é menor.
        p = p * 2.03 + 7.1;
        // A próxima névoa é mais fraca.
        a *= 0.5;
      }
      // Entrega a nuvem.
      return v;
    }

    // Transforma o pontinho em uma posição de -1 a 1 no lado menor da tela.
    vec2 lugar() {
      // O centro da tela vale zero.
      return (gl_FragCoord.xy * 2.0 - uTela) / min(uTela.x, uTela.y);
    }
  `;

  // Transforma uma cor escrita em CSS em três números de 0 a 1.
  Luz.rgb = (texto) => {
    // Cria um pincel só para traduzir a cor.
    const c = document.createElement('canvas').getContext('2d');
    // Entrega a cor ao pincel, que devolve sempre no mesmo formato.
    c.fillStyle = String(texto || '#000').trim();
    // Lê a cor traduzida.
    const v = c.fillStyle;
    // Formato comum: #rrggbb.
    if (v[0] === '#') return [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16) / 255);
    // Formato com transparência: rgba(r, g, b, a).
    return v
      .replace(/[^\d.,]/g, '')
      .split(',')
      .slice(0, 3)
      .map((n) => +n / 255);
  };

  // Lê uma cor do tema atual, por exemplo '--ac'.
  Luz.tema = (nome) => Luz.rgb(getComputedStyle(document.documentElement).getPropertyValue(nome));

  // Cor de fundo das entradas: a do tema. Em tema claro, usa a cor de destaque bem escurecida.
  Luz.fundo = () => {
    // Lê a cor de fundo do tema.
    const f = Luz.tema('--bg-a');
    // Tema claro: troca por uma cor escura.
    if (f[0] * 0.3 + f[1] * 0.6 + f[2] * 0.1 > 0.5) return Luz.tema('--ac').map((c) => c * 0.17);
    // Tema escuro: usa a do tema.
    return f;
  };

  // Monta um programa da placa de vídeo com duas partes: vértices e pintura.
  const monta = (gl, vertice, pintura) => {
    // Cria o programa vazio.
    const prog = gl.createProgram();
    // Repete para as duas partes.
    [
      [gl.VERTEX_SHADER, vertice],
      [gl.FRAGMENT_SHADER, pintura]
    ].forEach(([tipo, texto]) => {
      // Cria esta parte.
      const s = gl.createShader(tipo);
      // Entrega o texto do programa.
      gl.shaderSource(s, texto);
      // Pede para a placa de vídeo entender o texto.
      gl.compileShader(s);
      // Se a placa não entendeu, avisa o motivo.
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      // Junta esta parte ao programa.
      gl.attachShader(prog, s);
    });
    // Liga as duas partes.
    gl.linkProgram(prog);
    // Se as partes não encaixaram, avisa o motivo.
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    // Entrega o programa pronto.
    return prog;
  };

  // Cria o quadro de desenho e o laço que redesenha a tela. 'preparo' monta o programa de cada tipo.
  const quadroDeLuz = (pai, cfg, preparo) => {
    // Cria o quadro de desenho dentro de 'pai'.
    const cv = K.add(pai, 'canvas', 'luz');
    // Avisa quem usa leitor de tela que isto é só enfeite.
    cv.setAttribute('aria-hidden', 'true');
    // Em teste rápido a placa de vídeo fica desligada.
    const gl = window.__semCenario
      ? null
      : // Pede a ferramenta de desenho da placa de vídeo.
        cv.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'high-performance' });
    // Guarda o programa pronto.
    let prog = null;
    // Tenta montar o programa; se der erro, a entrada segue sem o desenho.
    try {
      // Só monta se existe placa de vídeo.
      if (gl) prog = preparo(gl);
      // Se deu erro, cai aqui e o site continua funcionando.
    } catch (e) {
      // Escreve o erro no console, para ajudar a achar o problema.
      console.error('luz', e);
    }
    // Sem desenho: avisa o CSS para colocar um fundo simples no lugar.
    if (!prog) pai.classList.add('sem-luz');
    // Se tem programa, passa a usar ele.
    if (prog) gl.useProgram(prog);
    // Nitidez do desenho. Número menor = mais leve para o aparelho.
    let escala = Math.min(window.devicePixelRatio || 1, 1.5) * (cfg.qualidade || 0.85);
    // Valores que o programa recebe a cada quadro.
    const valores = {};
    // Listas de valores que o programa recebe a cada quadro.
    const listas = {};
    // Atalho para achar cada informação que o programa recebe.
    const onde = (n) => (prog ? gl.getUniformLocation(prog, n) : null);
    // Ajusta o desenho ao tamanho da tela.
    const medir = () => {
      // Largura real do quadro em pontinhos.
      cv.width = Math.max(2, Math.round(cv.clientWidth * escala));
      // Altura real do quadro em pontinhos.
      cv.height = Math.max(2, Math.round(cv.clientHeight * escala));
      // Avisa a placa de vídeo do novo tamanho.
      if (prog) gl.viewport(0, 0, cv.width, cv.height);
    };
    // Mede agora.
    medir();
    // Mede de novo quando a tela mudar de tamanho.
    window.addEventListener('resize', medir);
    // Marca se o desenho já foi desligado.
    let parado = false;
    // Horário em que o desenho começou.
    let t0 = 0;
    // Horário do quadro anterior.
    let antes = 0;
    // Quantos quadros já foram medidos.
    let quadros = 0;
    // Soma do tempo dos quadros medidos.
    let soma = 0;
    // Desenha um quadro.
    const quadro = (t) => {
      // Desligado: para de desenhar.
      if (parado) return;
      // Já pede o próximo quadro.
      requestAnimationFrame(quadro);
      // No primeiro quadro, anota o começo.
      if (!t0) t0 = antes = t;
      // Tempo desde o quadro anterior, em segundos. No máximo 0,05 para não dar pulos.
      const dt = Math.min(0.05, (t - antes) / 1000);
      // Soma o tempo real deste quadro, para medir a velocidade.
      soma += t - antes;
      // Anota o horário deste quadro.
      antes = t;
      // Soma mais um quadro.
      quadros++;
      // A cada 30 quadros, confere se o aparelho está dando conta.
      if (quadros === 30) {
        // Aparelho lento: diminui a nitidez para ficar leve.
        if (soma / quadros > 28 && escala > 0.45) {
          // Diminui um pouco a nitidez.
          escala *= 0.82;
          // Refaz o quadro com a nova nitidez.
          medir();
        }
        // Zera a medição.
        quadros = 0;
        // Zera a soma.
        soma = 0;
      }
      // Avisa a entrada que passou um quadro, para ela mexer nas peças.
      if (cfg.quadro) cfg.quadro((t - t0) / 1000, dt);
      // Sem programa, não tem o que pintar.
      if (!prog) return;
      // Envia o tamanho do desenho.
      gl.uniform2f(onde('uTela'), cv.width, cv.height);
      // Envia o tempo.
      gl.uniform1f(onde('uTempo'), ((t - t0) / 1000) * ritmo);
      // Envia cada valor guardado.
      for (const n in valores) {
        // Lê o valor.
        const v = valores[n];
        // Acha o lugar dele.
        const l = onde(n);
        // Um número só.
        if (typeof v === 'number') gl.uniform1f(l, v);
        // Dois números.
        else if (v.length === 2) gl.uniform2fv(l, v);
        // Três números.
        else if (v.length === 3) gl.uniform3fv(l, v);
        // Quatro números.
        else gl.uniform4fv(l, v);
      }
      // Envia cada lista guardada.
      for (const n in listas) {
        // Um número por item.
        if (listas[n].n === 1) gl.uniform1fv(onde(n), listas[n].v);
        // Três números por item.
        else gl.uniform3fv(onde(n), listas[n].v);
      }
      // Pinta o quadro.
      cfg.pinta(gl, prog);
    };
    // Começa a desenhar.
    requestAnimationFrame(quadro);
    // Ferramentas que a entrada usa para conversar com o desenho.
    const eu = {
      // O quadro de desenho.
      cv,
      // Guarda um valor para enviar ao programa.
      valor: (nome, v) => {
        // Guarda.
        valores[nome] = v;
      },
      // Guarda uma lista de valores. 'n' é quantos números cada item tem.
      lista: (nome, v, n) => {
        // Guarda.
        listas[nome] = { v, n };
      },
      // Envia uma imagem para a placa de vídeo. 'unidade' é a gaveta, de 0 a 3.
      textura: (nome, fonte, unidade) => {
        // Sem programa, não faz nada.
        if (!prog) return;
        // Escolhe a gaveta.
        gl.activeTexture(gl.TEXTURE0 + unidade);
        // Cria o lugar da imagem.
        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        // Desenha em cima da imagem na mesma direção da tela.
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        // Entrega a imagem.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, fonte);
        // Não repete a imagem na horizontal.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // Não repete a imagem na vertical.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // Suaviza quando a imagem diminui.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // Suaviza quando a imagem aumenta.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        // Diz ao programa em qual gaveta a imagem está.
        gl.uniform1i(onde(nome), unidade);
      },
      // Troca o conteúdo de uma imagem de tons de cinza que muda sempre, como o calor do dedo.
      cinza: (nome, bytes, w, h, unidade, nova) => {
        // Sem programa, não faz nada.
        if (!prog) return;
        // Escolhe a gaveta.
        gl.activeTexture(gl.TEXTURE0 + unidade);
        // Na primeira vez, cria o lugar da imagem.
        if (nova) {
          // Cria o lugar da imagem.
          gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
          // Não repete a imagem na horizontal.
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          // Não repete a imagem na vertical.
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          // Suaviza quando a imagem diminui.
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          // Suaviza quando a imagem aumenta.
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          // Diz ao programa em qual gaveta a imagem está.
          gl.uniform1i(onde(nome), unidade);
        }
        // Avisa que cada linha da imagem pode ter qualquer tamanho.
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        // Esta imagem já vem na direção certa.
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        // Entrega a imagem.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, w, h, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, bytes);
      },
      // Desliga o desenho e devolve a memória da placa de vídeo.
      parar: () => {
        // Marca como desligado.
        parado = true;
        // Para de medir a tela.
        window.removeEventListener('resize', medir);
        // Pede a ferramenta de devolver a memória.
        const fim = gl && gl.getExtension('WEBGL_lose_context');
        // Devolve a memória.
        if (fim) fim.loseContext();
      }
    };
    // Envia as cores do tema, ou as que a entrada pediu.
    eu.valor('uCorA', cfg.corA || Luz.tema('--ac'));
    // Segunda cor.
    eu.valor('uCorB', cfg.corB || Luz.tema('--ac2'));
    // Cor de fundo.
    eu.valor('uCorF', cfg.corF || Luz.fundo());
    // Entrega as ferramentas.
    return eu;
  };

  // Desenho que cobre a tela inteira. 'pintura' diz a cor de cada pontinho.
  Luz.tela = (pai, pintura, cfg) =>
    quadroDeLuz(
      pai,
      Object.assign({}, cfg, {
        // Pinta dois triângulos que cobrem a tela.
        pinta: (gl) => gl.drawArrays(gl.TRIANGLES, 0, 3)
      }),
      (gl) => {
        // Monta o programa.
        const prog = monta(gl, VERTICE, Luz.BASE + pintura);
        // Cria o lugar dos cantos.
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        // Coloca os cantos de um triângulo grande que passa da tela.
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        // Procura onde o programa recebe os cantos.
        const c = gl.getAttribLocation(prog, 'aCanto');
        // Liga essa entrada.
        gl.enableVertexAttribArray(c);
        // Diz que cada canto tem 2 números.
        gl.vertexAttribPointer(c, 2, gl.FLOAT, false, 0, 0);
        // Entrega o programa pronto.
        return prog;
      }
    );

  // Nuvem de pontos soltos. 'atributos' traz, para cada nome, os dados e quantos números cada ponto usa.
  Luz.nuvem = (pai, vertice, pintura, atributos, total, cfg) =>
    quadroDeLuz(
      pai,
      Object.assign({}, cfg, {
        // Limpa a tela e desenha os pontos.
        pinta: (gl) => {
          // Lê a cor de fundo pedida.
          const f = cfg.limpa || [0, 0, 0];
          // Escolhe a cor de limpar.
          gl.clearColor(f[0], f[1], f[2], 1);
          // Limpa a tela.
          gl.clear(gl.COLOR_BUFFER_BIT);
          // Desenha todos os pontos.
          gl.drawArrays(gl.POINTS, 0, total);
        }
      }),
      (gl) => {
        // Monta o programa.
        const prog = monta(gl, vertice, Luz.BASE + pintura);
        // Repete para cada lista de dados.
        Object.keys(atributos).forEach((nome) => {
          // Cria o lugar dos dados.
          gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
          // Entrega os dados.
          gl.bufferData(gl.ARRAY_BUFFER, atributos[nome].dados, gl.STATIC_DRAW);
          // Procura onde o programa recebe estes dados.
          const a = gl.getAttribLocation(prog, nome);
          // Liga essa entrada.
          gl.enableVertexAttribArray(a);
          // Diz quantos números cada ponto usa.
          gl.vertexAttribPointer(a, atributos[nome].n, gl.FLOAT, false, 0, 0);
        });
        // Liga a mistura de luz: ponto em cima de ponto fica mais claro.
        gl.enable(gl.BLEND);
        // Soma as cores.
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        // Entrega o programa pronto.
        return prog;
      }
    );

  // Quadro de desenho comum, para as entradas que não precisam da placa de vídeo.
  Luz.lousa = (pai, desenha) => {
    // Cria o quadro de desenho dentro de 'pai'.
    const cv = K.add(pai, 'canvas', 'luz');
    // Avisa quem usa leitor de tela que isto é só enfeite.
    cv.setAttribute('aria-hidden', 'true');
    // Pega o pincel.
    const cx = cv.getContext('2d');
    // Nitidez: até 2 pontinhos por pontinho da tela.
    const nitidez = Math.min(window.devicePixelRatio || 1, 2);
    // Largura em pontinhos da tela.
    let W = 1;
    // Altura em pontinhos da tela.
    let H = 1;
    // Ajusta o desenho ao tamanho da tela.
    const medir = () => {
      // Lê a largura.
      W = cv.clientWidth;
      // Lê a altura.
      H = cv.clientHeight;
      // Largura real do quadro.
      cv.width = Math.max(2, Math.round(W * nitidez));
      // Altura real do quadro.
      cv.height = Math.max(2, Math.round(H * nitidez));
      // Faz o pincel desenhar em pontinhos da tela.
      cx.setTransform(nitidez, 0, 0, nitidez, 0, 0);
    };
    // Mede agora.
    medir();
    // Mede de novo quando a tela mudar de tamanho.
    window.addEventListener('resize', medir);
    // Marca se o desenho já foi desligado.
    let parado = false;
    // Horário em que o desenho começou.
    let t0 = 0;
    // Horário do quadro anterior.
    let antes = 0;
    // Desenha um quadro.
    const quadro = (t) => {
      // Desligado: para de desenhar.
      if (parado) return;
      // Já pede o próximo quadro.
      requestAnimationFrame(quadro);
      // No primeiro quadro, anota o começo.
      if (!t0) t0 = antes = t;
      // Tempo desde o quadro anterior, em segundos. No máximo 0,05 para não dar pulos.
      const dt = Math.min(0.05, (t - antes) / 1000);
      // Anota o horário deste quadro.
      antes = t;
      // Desenha.
      desenha(cx, W, H, (t - t0) / 1000, dt);
    };
    // Começa a desenhar.
    requestAnimationFrame(quadro);
    // Entrega o quadro e o jeito de desligar.
    return {
      // O quadro de desenho.
      cv,
      // Desliga o desenho.
      parar: () => {
        // Marca como desligado.
        parado = true;
        // Para de medir a tela.
        window.removeEventListener('resize', medir);
      }
    };
  };

  // Espera os tipos de letra chegarem. Se demorarem, segue sem eles.
  Luz.letras = async (lista) => {
    // Tenta carregar; se der erro, segue com a letra do celular.
    try {
      // Corre entre as letras chegarem e 1,2 segundo passar.
      await Promise.race([Promise.all(lista.map((f) => document.fonts.load(f, 'Aáé'))), U.esperar(1200)]);
      // Se deu erro, cai aqui e o site continua funcionando.
    } catch (e) {
      /* sem as letras: continua com as do celular */
    }
  };

  // Acha o maior tamanho de letra que faz o texto caber em 'largura' por 'altura'.
  Luz.encaixa = (cx, texto, largura, altura, fonte, entrelinha) => {
    // Espaço entre as linhas. Número maior = linhas mais separadas.
    const passo = entrelinha || 1.12;
    // Vai diminuindo a letra até caber.
    for (let tam = altura; tam > 8; tam *= 0.95) {
      // Escolhe a letra neste tamanho.
      cx.font = fonte(tam);
      // Linhas prontas.
      const linhas = [];
      // Marca se alguma palavra sozinha não coube.
      let cabe = true;
      // Respeita as quebras de linha que vieram no texto.
      for (const trecho of String(texto).split('\n')) {
        // Linha sendo montada.
        let linha = '';
        // Vai juntando as palavras.
        for (const palavra of trecho.split(' ')) {
          // Tenta colocar mais esta palavra.
          const teste = linha ? linha + ' ' + palavra : palavra;
          // Coube: continua nesta linha.
          if (cx.measureText(teste).width <= largura) linha = teste;
          // Não coube: fecha a linha e começa outra.
          else {
            // Fecha a linha, se tinha alguma coisa.
            if (linha) linhas.push(linha);
            // Começa outra linha com esta palavra.
            linha = palavra;
            // Uma palavra sozinha maior que a largura não serve.
            if (cx.measureText(palavra).width > largura) cabe = false;
          }
        }
        // Guarda a última linha.
        linhas.push(linha);
      }
      // Coube tudo: entrega o resultado.
      if (cabe && linhas.length * tam * passo <= altura) return { tam, linhas, passo };
    }
    // Nada coube: entrega o texto em letra pequena.
    return { tam: 8, linhas: [String(texto)], passo };
  };

  // Escreve um texto em uma folha invisível do tamanho pedido. Usado como molde pelas entradas.
  Luz.molde = (texto, cfg) => {
    // Cria a folha.
    const cv = document.createElement('canvas');
    // Largura da folha.
    cv.width = cfg.w;
    // Altura da folha.
    cv.height = cfg.h;
    // Pega o pincel.
    const cx = cv.getContext('2d');
    // Se pediu fundo, pinta a folha.
    if (cfg.fundo) {
      // Escolhe a cor do fundo.
      cx.fillStyle = cfg.fundo;
      // Pinta tudo.
      cx.fillRect(0, 0, cfg.w, cfg.h);
    }
    // Espaço reservado para o texto, de 0 a 1.
    const caixa = cfg.caixa || [0.08, 0.2, 0.84, 0.6];
    // Acha o tamanho certo da letra.
    const a = Luz.encaixa(cx, texto, cfg.w * caixa[2], cfg.h * caixa[3], cfg.fonte, cfg.entrelinha);
    // Escolhe a letra.
    cx.font = cfg.fonte(a.tam);
    // Escolhe a cor das letras.
    cx.fillStyle = cfg.cor || '#fff';
    // Centraliza na horizontal.
    cx.textAlign = 'center';
    // Centraliza cada linha na altura.
    cx.textBaseline = 'middle';
    // Altura de cada linha.
    const alto = a.tam * a.passo;
    // Altura onde a primeira linha começa.
    const y0 = cfg.h * (caixa[1] + caixa[3] / 2) - ((a.linhas.length - 1) * alto) / 2;
    // Escreve cada linha.
    a.linhas.forEach((l, i) => cx.fillText(l, cfg.w * (caixa[0] + caixa[2] / 2), y0 + i * alto));
    // Entrega a folha.
    return cv;
  };

  // Sorteia 'n' pontos em cima do desenho da folha. Devolve uma lista x, y de -1 a 1.
  Luz.amostra = (cv, n) => {
    // Lê os pontinhos da folha.
    const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
    // Lista dos pontinhos pintados.
    const cheios = [];
    // Olha um pontinho sim, um não, para ir mais rápido.
    for (let y = 0; y < cv.height; y += 2) {
      // Anda na linha.
      for (let x = 0; x < cv.width; x += 2) {
        // Pintado: guarda.
        if (d[(y * cv.width + x) * 4 + 3] > 120) cheios.push(x, y);
      }
    }
    // Lista final.
    const fora = new Float32Array(n * 2);
    // Quantos pontinhos pintados existem.
    const total = cheios.length / 2;
    // Sorteia um pontinho para cada ponto.
    for (let i = 0; i < n; i++) {
      // Sorteia.
      const k = Math.floor(Math.random() * total) * 2;
      // Transforma em posição de -1 a 1, com um tremido pequeno.
      fora[i * 2] = ((cheios[k] || cv.width / 2) + Math.random() * 2) / cv.width * 2 - 1;
      // Na altura, o 1 fica em cima.
      fora[i * 2 + 1] = 1 - ((cheios[k + 1] || cv.height / 2) + Math.random() * 2) / cv.height * 2;
    }
    // Entrega a lista.
    return fora;
  };

  // Deixa estas ferramentas disponíveis para os outros arquivos.
  g.Luz = Luz;
  // Fecha a caixa e já roda tudo.
})(window);
