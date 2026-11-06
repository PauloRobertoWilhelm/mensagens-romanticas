/* ==========================================================
   kit.js — peças que todas as artes usam: telas, toques, arrastos,
   raspadinha, canvas e sons curtos. Cada interação marca o elemento
   com data-acao, e é isso que o teste automático usa para jogar.
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
  const K = {};

  // Cria um elemento com texto tratado por U.fmt e já coloca dentro de 'pai'.
  K.add = (pai, tag, classe, texto) => {
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "e".
    const e = U.el(tag, classe, texto == null ? null : U.fmt(texto));
    // Coloca a peça nova dentro de pai.
    pai.appendChild(e);
    // Termina aqui e entrega o resultado.
    return e;
  };

  // Cria uma linha "rótulo + valor", usada em documentos, fichas e talões.
  K.par = (pai, classe, rotulo, valor) => {
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "e".
    const e = U.el('p', classe, '<span>' + U.esc(rotulo) + '</span><b>' + U.fmt(valor) + '</b>');
    // Coloca a peça nova dentro de pai.
    pai.appendChild(e);
    // Termina aqui e entrega o resultado.
    return e;
  };

  // Abre uma tela nova, faz a anterior sair e devolve a caixa onde colocar o conteúdo.
  K.tela = (classe) => {
    // Pega o palco onde as telas aparecem.
    const palco = U.$('#palco');
    // Faz as telas atuais sumirem com fade e depois as remove do HTML.
    palco.querySelectorAll('.cena:not(.saindo)').forEach((v) => {
      // Liga o visual "saindo" (veja .saindo no CSS).
      v.classList.add('saindo');
      // Deixa agendado para daqui a pouco.
      setTimeout(() => v.remove(), 600);
    });
    // Cria a tela inteira e a caixa central.
    const cena = U.el('section', 'cena ' + (classe || ''));
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "caixa".
    const caixa = U.el('div', 'caixa');
    // Monta, coloca no palco e devolve a caixa.
    cena.appendChild(caixa);
    // Coloca a peça nova dentro de palco.
    palco.appendChild(cena);
    // Termina aqui e entrega o resultado.
    return caixa;
  };

  // Cria um botão de pílula dentro de 'pai' (o texto vem dos dados).
  K.botao = (pai, texto) => {
    // Cria uma peça nova, ainda fora da tela e guarda com o nome "b".
    const b = U.el('button', 'btn entra', U.esc(texto || 'continuar ›'));
    // Diz ao navegador que é um botão comum.
    b.type = 'button';
    // Coloca a peça nova dentro de pai.
    pai.appendChild(b);
    // Termina aqui e entrega o resultado.
    return b;
  };

  // Espera um toque em 'el' e tira a marca de interação depois.
  K.toque = (el) =>
    new Promise((ok) => {
      // Marca o elemento como tocável para o CSS e para o teste.
      el.dataset.acao = 'toque';
      // No primeiro toque limpa a marca, vibra e libera quem está esperando.
      el.addEventListener(
        'click',
        () => {
          // Apaga esta anotação da peça.
          delete el.dataset.acao;
          // Faz o celular tremer um pouquinho.
          U.vibra(12);
          // Usa a ajuda "ok" (ela está definida neste arquivo).
          ok();
        },
        { once: true }
      );
    });

  // Mostra um botão, espera o toque e o tira da tela (assim não existe duplo clique).
  K.mais = async (pai, texto) => {
    // Cria um botão dentro de pai e guarda com o nome "b".
    const b = K.botao(pai, texto);
    // Espera a pessoa tocar em b.
    await K.toque(b);
    // Tira b da tela.
    b.remove();
  };

  // Espera tocarem em todos os elementos, em qualquer ordem; 'cada' roda a cada toque.
  K.todos = (lista, cada) => Promise.all(lista.map((el, i) => K.toque(el).then(() => cada && cada(el, i))));

  // Espera tocarem em UM dos elementos e devolve a posição do escolhido.
  K.qual = (lista) =>
    new Promise((ok) => {
      // Liga cada opção: a primeira tocada limpa a marca das outras e entrega a posição.
      lista.forEach((el, i) => {
        // Anota "acao" em el, para o CSS ou o teste usarem.
        el.dataset.acao = 'toque';
        // Fica de olho: quando a pessoa tocar, roda o que está aqui.
        el.addEventListener(
          'click',
          () => {
            // Repete para cada item da lista.
            lista.forEach((x) => delete x.dataset.acao);
            // Faz o celular tremer um pouquinho.
            U.vibra(15);
            // Usa a ajuda "ok" (ela está definida neste arquivo).
            ok(i);
          },
          { once: true }
        );
      });
    });

  // Espera 'n' toques no mesmo elemento; 'cada' recebe o número do toque.
  K.vezes = (el, n, cada) =>
    new Promise((ok) => {
      // Contador de toques feitos.
      let i = 0;
      // Marca como tocável enquanto faltar toque.
      el.dataset.acao = 'toque';
      // Conta o toque, avisa e, ao completar, solta o elemento e libera a espera.
      const f = () => {
        // Soma 1 em i.
        i++;
        // Faz o celular tremer um pouquinho.
        U.vibra(10);
        // Se a condição entre parênteses valer: usa a ajuda "cada" (ela está definida neste arquivo).
        if (cada) cada(i);
        // Se a condição entre parênteses valer, faz o que está nas chaves.
        if (i >= n) {
          // Para de ficar de olho neste evento.
          el.removeEventListener('click', f);
          // Apaga esta anotação da peça.
          delete el.dataset.acao;
          // Usa a ajuda "ok" (ela está definida neste arquivo).
          ok();
        }
      };
      // Liga o contador ao clique.
      el.addEventListener('click', f);
    });

  // Segure 'el' por 'ms' milissegundos; 'cada' recebe o progresso de 0 a 1 (soltou, esvazia).
  K.segura = (el, ms, cada) =>
    new Promise((ok) => {
      // Estado: progresso, se está preso e o instante do último quadro.
      let p = 0,
        preso = false,
        ult = 0;
      // Marca o elemento e impede o menu de "pressionar e segurar" do celular.
      el.dataset.acao = 'segura';
      // Anota "ms" em el, para o CSS ou o teste usarem.
      el.dataset.ms = ms;
      // Muda como o celular trata o dedo de el.
      el.style.touchAction = 'none';
      // Fica de olho: quando o celular tentar abrir o menu de segurar, roda o que está aqui.
      el.addEventListener('contextmenu', (e) => e.preventDefault());
      // Laço: enche enquanto preso, esvazia mais rápido quando solta.
      const laco = (t) => {
        // Calcula o tempo desde o quadro anterior.
        const dt = ult ? t - ult : 0;
        // Anota o horário deste quadro, para medir o tempo.
        ult = t;
        // Atualiza o progresso dentro do intervalo de 0 a 1.
        p = preso ? Math.min(1, p + dt / ms) : Math.max(0, p - dt / (ms / 2));
        // Avisa a arte para desenhar o progresso.
        if (cada) cada(p);
        // Completo: limpa a marca, vibra e libera; senão continua no próximo quadro.
        if (p >= 1) {
          // Apaga esta anotação da peça.
          delete el.dataset.acao;
          // Faz o celular tremer um pouquinho.
          U.vibra(30);
          // Usa a ajuda "ok" (ela está definida neste arquivo).
          ok();
          // Se o caso de cima não valeu, faz isto.
        } else requestAnimationFrame(laco);
      };
      // Prende ao apertar.
      el.addEventListener('pointerdown', (e) => {
        // Impede o navegador de fazer o que faria sozinho.
        e.preventDefault();
        // Anota se o dedo está apertando.
        preso = true;
      });
      // Solta ao levantar o dedo ou sair do elemento.
      ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) =>
        el.addEventListener(ev, () => {
          // Anota se o dedo está apertando.
          preso = false;
        })
      );
      // Começa o laço.
      requestAnimationFrame(laco);
    });

  // Arraste 'el': cfg.rumo=[dx,dy] é o gesto esperado, cfg.move recebe o deslocamento e cfg.solta decide se terminou.
  K.arrasta = (el, cfg) =>
    new Promise((ok) => {
      // Ponto inicial do dedo e se está arrastando.
      let x0 = 0,
        y0 = 0,
        ativo = false;
      // Marca o elemento e guarda o gesto esperado para o teste.
      el.dataset.acao = 'arrasta';
      // Anota "rumo" em el, para o CSS ou o teste usarem.
      el.dataset.rumo = cfg.rumo.join(',');
      // Muda como o celular trata o dedo de el.
      el.style.touchAction = 'none';
      // Ao apertar, guarda a posição e captura o dedo para não perder o arrasto.
      const inicio = (e) => {
        // Anota se o arrasto está acontecendo.
        ativo = true;
        // Anota onde o dedo encostou.
        x0 = e.clientX;
        // Anota onde o dedo encostou.
        y0 = e.clientY;
        // Se a condição entre parênteses valer: segura o dedo nesta peça, mesmo se ele sair de cima.
        if (el.setPointerCapture) el.setPointerCapture(e.pointerId);
      };
      // Ao mover, entrega o deslocamento para a arte.
      const mexe = (e) => {
        // Se a condição entre parênteses valer: avisa a arte que o dedo andou.
        if (ativo && cfg.move) cfg.move(e.clientX - x0, e.clientY - y0);
      };
      // Ao soltar, pergunta à arte se o gesto bastou; se sim, desliga tudo e libera a espera.
      const fim = (e) => {
        // Ignora soltar sem ter começado.
        if (!ativo) return;
        // Encerra o gesto atual.
        ativo = false;
        // A arte recusou o gesto: fica esperando outra tentativa.
        if (cfg.solta && !cfg.solta(e.clientX - x0, e.clientY - y0)) return;
        // Limpa a marca e desliga os ouvintes, para o próximo arrasto no mesmo elemento começar limpo.
        delete el.dataset.acao;
        // Para de ficar de olho neste evento.
        el.removeEventListener('pointerdown', inicio);
        // Para de ficar de olho neste evento.
        el.removeEventListener('pointermove', mexe);
        // Para de ficar de olho neste evento.
        el.removeEventListener('pointerup', fim);
        // Para de ficar de olho neste evento.
        el.removeEventListener('pointercancel', fim);
        // Vibra e libera.
        U.vibra(20);
        // Usa a ajuda "ok" (ela está definida neste arquivo).
        ok();
      };
      // Liga os três momentos do gesto.
      el.addEventListener('pointerdown', inicio);
      // Fica de olho: quando o dedo andar, roda o que está aqui.
      el.addEventListener('pointermove', mexe);
      // O gesto termina ao soltar ou quando o sistema cancela o toque.
      el.addEventListener('pointerup', fim);
      // Fica de olho: quando o toque for cancelado, roda o que está aqui.
      el.addEventListener('pointercancel', fim);
    });

  // Raspadinha: 'pintar' desenha a cobertura; resolve quando 'limite' (0 a 1) da área foi limpa.
  K.raspa = (cv, limite, pintar) =>
    new Promise((ok) => {
      // Mede o canvas e desenha a cobertura.
      const r = cv.getBoundingClientRect();
      // Ajusta a largura do desenho ao tamanho real.
      cv.width = Math.max(1, r.width);
      // Ajusta a altura do desenho ao tamanho real.
      cv.height = Math.max(1, r.height);
      // Pega o pincel do canvas e guarda com o nome "c".
      const c = cv.getContext('2d');
      // Usa a ajuda "pintar" (ela está definida neste arquivo).
      pintar(c, cv.width, cv.height);
      // A partir daqui, desenhar apaga a cobertura em vez de pintar.
      c.globalCompositeOperation = 'destination-out';
      // Escolhe a grossura do traço.
      c.lineWidth = 38;
      // Deixa as pontas do traço redondas.
      c.lineCap = 'round';
      // Marca como raspável e bloqueia a rolagem enquanto o dedo passa.
      cv.dataset.acao = 'raspa';
      // Muda como o celular trata o dedo de cv.
      cv.style.touchAction = 'none';
      // Último ponto do dedo, contador de traços e se já terminou.
      let ant = null,
        n = 0,
        fim = false;
      // Converte a posição do dedo para coordenadas do canvas.
      const pos = (e) => {
        // Mede o tamanho e o lugar da peça e guarda com o nome "b".
        const b = cv.getBoundingClientRect();
        // Termina aqui e entrega o resultado.
        return [e.clientX - b.left, e.clientY - b.top];
      };
      // Mede a fração já limpa olhando a transparência de uma amostra dos pixels.
      const limpo = () => {
        // Guarda este valor com o nome "px".
        const px = c.getImageData(0, 0, cv.width, cv.height).data;
        // Anotações que o código vai usando enquanto funciona: z, t.
        let z = 0,
          t = 0;
        // Repete várias vezes, contando as voltas.
        for (let i = 3; i < px.length; i += 64) {
          // Soma 1 em t.
          t++;
          // Se a condição entre parênteses valer: soma 1 em z.
          if (px[i] < 40) z++;
        }
        // Termina aqui e entrega o resultado.
        return z / t;
      };
      // Encerra: apaga o que sobrou com fade e libera a espera.
      const acaba = () => {
        // Guarda o novo valor em fim.
        fim = true;
        // Apaga esta anotação da peça.
        delete cv.dataset.acao;
        // Muda a velocidade da mudança de cv.
        cv.style.transition = 'opacity .6s';
        // Muda a transparência de cv.
        cv.style.opacity = 0;
        // Muda se recebe toques de cv.
        cv.style.pointerEvents = 'none';
        // Faz o celular tremer um pouquinho.
        U.vibra(25);
        // Usa a ajuda "ok" (ela está definida neste arquivo).
        ok();
      };
      // Risca do ponto anterior até o atual e confere o progresso a cada 5 traços.
      const risca = (e) => {
        // Se a condição entre parênteses valer, para por aqui.
        if (!ant || fim) return;
        // Usa a ajuda "pos" (ela está definida neste arquivo) e guarda com o nome "p".
        const p = pos(e);
        // Começa um desenho novo.
        c.beginPath();
        // Coloca o lápis neste ponto.
        c.moveTo(ant[0], ant[1]);
        // Risca uma linha até este ponto.
        c.lineTo(p[0], p[1]);
        // Pinta o traço do desenho.
        c.stroke();
        // Anota onde o dedo estava, para riscar até o próximo ponto.
        ant = p;
        // Soma 1 em n.
        n++;
        // Se a condição entre parênteses valer: usa a ajuda "acaba" (ela está definida neste arquivo).
        if (n % 5 === 0 && limpo() >= limite) acaba();
      };
      // Começa o traço onde o dedo encostou.
      cv.addEventListener('pointerdown', (e) => {
        // Anota onde o dedo estava, para riscar até o próximo ponto.
        ant = pos(e);
        // Se a condição entre parênteses valer: segura o dedo nesta peça, mesmo se ele sair de cima.
        if (cv.setPointerCapture) cv.setPointerCapture(e.pointerId);
      });
      // Risca enquanto o dedo anda.
      cv.addEventListener('pointermove', risca);
      // Termina o traço ao soltar.
      ['pointerup', 'pointercancel'].forEach((ev) =>
        cv.addEventListener(ev, () => {
          // Anota onde o dedo estava, para riscar até o próximo ponto.
          ant = null;
        })
      );
    });

  // Canvas animado dentro de 'pai': 'desenha(cx, w, h, segundos, v)' roda a cada quadro até o canvas sair da tela.
  K.pinta = (pai, desenha) => {
    // Cria o canvas e o objeto de controle.
    const cv = U.el('canvas', 'pintura');
    // Coloca a peça nova dentro de pai.
    pai.appendChild(cv);
    // Pega o pincel do canvas e guarda com o nome "cx".
    const cx = cv.getContext('2d');
    // Cria a coleção "v".
    const v = { cv, cx, w: 0, h: 0 };
    // Ajusta a resolução ao tamanho real, com densidade limitada a 2 para poupar bateria.
    const medir = () => {
      // Pega o menor número e guarda com o nome "d".
      const d = Math.min(window.devicePixelRatio || 1, 2);
      // Anota a largura do desenho.
      v.w = cv.clientWidth;
      // Anota a altura do desenho.
      v.h = cv.clientHeight;
      // Ajusta a largura do desenho ao tamanho real.
      cv.width = Math.round(v.w * d);
      // Ajusta a altura do desenho ao tamanho real.
      cv.height = Math.round(v.h * d);
      // Ajusta a escala do desenho à tela.
      cx.setTransform(d, 0, 0, d, 0, 0);
    };
    // Mede agora e sempre que a tela mudar de tamanho.
    medir();
    // Fica de olho: quando a tela mudar de tamanho, roda o que está aqui.
    window.addEventListener('resize', medir);
    // Laço de desenho: para sozinho quando o canvas sai do HTML.
    const laco = (t) => {
      // Se a condição entre parênteses valer, faz o que está nas chaves.
      if (!cv.isConnected) {
        // Para de ficar de olho neste evento.
        window.removeEventListener('resize', medir);
        // Para por aqui.
        return;
      }
      // Usa a ajuda "desenha" (ela está definida neste arquivo).
      desenha(cx, v.w, v.h, t / 1000, v);
      // Pede para rodar de novo no próximo quadro da tela.
      requestAnimationFrame(laco);
    };
    // Começa e devolve o controle.
    requestAnimationFrame(laco);
    // Termina aqui e entrega o resultado.
    return v;
  };

  // Digita um texto letra por letra em 'el' (textContent, então não interpreta HTML).
  K.digita = async (el, texto, ms) => {
    // Repete para cada item da lista.
    for (const ch of String(texto)) {
      // Troca o texto de el.
      el.textContent += ch;
      // Espera um tempo antes de continuar.
      await U.esperar(ms || 38);
    }
  };

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
      await Promise.race([
        U.esperar(leitura),
        new Promise((r) => cena.addEventListener('click', r, { once: true, signal: ctrl.signal }))
      ]);
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
      const o = ac.createOscillator(),
        v = ac.createGain();
      // Diz ao navegador que é um botão comum.
      o.type = onda || 'sine';
      // Escolhe a altura do som.
      o.frequency.value = f;
      // O volume cai até quase zero no fim, para não estalar.
      v.gain.setValueAtTime(vol || 0.08, ac.currentTime);
      // Faz o volume cair até quase zero, para não estalar.
      v.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + (ms || 120) / 1000);
      // Liga, toca e para sozinho.
      o.connect(v);
      // Liga o som na saída de áudio.
      v.connect(ac.destination);
      // Começa o som.
      o.start();
      // Agenda o fim do som.
      o.stop(ac.currentTime + (ms || 120) / 1000);
      // Se deu erro, cai aqui e o site continua funcionando.
    } catch (e) {
      /* sem áudio: a arte continua funcionando */
    }
  };

  // Deixa estas ferramentas disponíveis para os outros arquivos.
  g.K = K;
  // Fecha a caixa e já roda tudo.
})(window);
