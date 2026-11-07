/* ==========================================================
   entradas-app.js — as entradas que parecem aplicativos modernos:
   cartas de deslizar, stories, conversa com assistente,
   carta holográfica e túnel de palavras em 3D.
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

  /* ---------- match: cartas para deslizar ---------- */

  // Match: deslize as cartas para a direita até dar match.
  E.match = async (caixa, d) => {
    // Cor das letras em cima da cor do tema.
    caixa.style.setProperty('--tinta', E.tinta(Luz.tema('--ac')));
    // Lugar das cartas.
    const pilha = K.add(caixa, 'div', 'ab-pilha');
    // Cria as cartas de trás para frente, assim a primeira fica por cima.
    const cartas = [...d.cartas].reverse().map((texto, i) => {
      // Cria a carta.
      const c = K.add(pilha, 'div', 'ab-carta');
      // Avisa o CSS a posição da carta na pilha.
      c.style.setProperty('--i', d.cartas.length - 1 - i);
      // Frase da carta.
      K.add(c, 'p', 'ab-carta-texto', texto);
      // Carimbo do sim.
      K.add(c, 'b', 'ab-carimbo sim', d.sim);
      // Carimbo do não.
      K.add(c, 'b', 'ab-carimbo nao', d.nao);
      // Entrega a carta.
      return c;
    });
    // Volta para a ordem certa: a de cima primeiro.
    cartas.reverse();
    // Lugar dos botões.
    const botoes = K.add(caixa, 'div', 'ab-botoes');
    // Botão do não.
    const bNao = K.add(botoes, 'button', 'ab-redondo nao', '✕');
    // Diz ao navegador que é um botão comum.
    bNao.type = 'button';
    // Nome do botão, para quem usa leitor de tela.
    bNao.setAttribute('aria-label', d.nao);
    // Botão do sim.
    const bSim = K.add(botoes, 'button', 'ab-redondo sim', '♥');
    // Diz ao navegador que é um botão comum.
    bSim.type = 'button';
    // Nome do botão, para quem usa leitor de tela.
    bSim.setAttribute('aria-label', d.sim);
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Quanto a carta precisa andar para contar. Número maior = precisa arrastar mais.
    const limite = 80;
    // Carta que está por cima.
    let atual = null;
    // Faz a carta tremer, dizendo que essa resposta não vale.
    const recusa = () => {
      // Sem carta: não faz nada.
      if (!atual) return;
      // Tira o tremor anterior.
      atual.classList.remove('nega');
      // Faz o navegador notar a retirada, para o tremor recomeçar.
      void atual.offsetWidth;
      // Treme.
      atual.classList.add('nega');
      // Som grave.
      K.som(170, 110, 'triangle', 0.05);
    };
    // Toque no botão do não: a carta treme.
    bNao.addEventListener('click', recusa);
    // Passa por cada carta.
    for (const c of cartas) {
      // Esta é a carta de cima.
      atual = c;
      // Espera deslizar a carta, ou tocar no coração.
      await Promise.race([
        K.arrasta(c, {
          // Gesto esperado: para a direita.
          rumo: [Math.round(Math.min(innerWidth * 0.5, 220)), 0],
          // Enquanto o dedo anda, a carta vai junto e inclina.
          move: (dx, dy) => {
            // Tira a frase que ensina.
            dica.classList.add('some');
            // Solta a carta do lugar.
            c.classList.add('presa');
            // Move e inclina a carta.
            c.style.transform = 'translate(' + dx + 'px,' + dy * 0.25 + 'px) rotate(' + dx * 0.06 + 'deg)';
            // Mostra o carimbo do sim.
            c.style.setProperty('--sim', Math.max(0, Math.min(1, dx / limite)));
            // Mostra o carimbo do não.
            c.style.setProperty('--nao', Math.max(0, Math.min(1, -dx / limite)));
          },
          // Quando soltar, confere se foi longe.
          solta: (dx) => {
            // Foi para a direita: conta.
            const foi = dx > limite;
            // Não foi: a carta volta.
            if (!foi) {
              // Devolve a carta para a pilha.
              c.classList.remove('presa');
              // Tira o movimento.
              c.style.transform = '';
              // Esconde o carimbo do sim.
              c.style.setProperty('--sim', 0);
              // Esconde o carimbo do não.
              c.style.setProperty('--nao', 0);
              // Foi para a esquerda: treme.
              if (dx < -limite) recusa();
            }
            // Entrega se conseguiu.
            return foi;
          }
        }),
        K.toque(bSim)
      ]);
      // Solta o coração, se ainda estiver marcado.
      delete bSim.dataset.acao;
      // Mostra o carimbo do sim.
      c.style.setProperty('--sim', 1);
      // Som que sobe.
      K.som(620, 100, 'sine', 0.07);
      // A carta voa para a direita.
      c.classList.add('foi');
      // Tira a carta da tela depois do voo.
      setTimeout(() => c.remove(), 420);
      // Espera um pouquinho.
      await U.esperar(240);
    }
    // Tira os botões.
    botoes.remove();
    // Tira a frase que ensina.
    dica.remove();
    // A tela do match.
    const tela = K.add(caixa, 'div', 'ab-deu');
    // Dois círculos que se encontram.
    K.add(tela, 'i', 'ab-bola um');
    // O segundo círculo.
    K.add(tela, 'i', 'ab-bola dois');
    // A frase grande.
    K.add(tela, 'h1', 'ab-titulo', d.titulo);
    // Solta faíscas no meio da tela.
    Efeitos.em(tela, 40);
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };

  /* ---------- stories: telas em sequência ---------- */

  // Escreve uma frase, uma palavra de cada vez.
  const palavraPorPalavra = (pai, classe, texto) => {
    // Cria o lugar da frase.
    const p = K.add(pai, 'p', classe);
    // Passa por cada palavra.
    texto.split(' ').forEach((t, i) => {
      // Cria a palavra.
      const s = K.add(p, 'span', null, t);
      // Cada palavra entra um pouco depois da anterior.
      s.style.animationDelay = i * 0.09 + 's';
      // Espaço entre as palavras.
      p.appendChild(document.createTextNode(' '));
    });
    // Entrega a frase.
    return p;
  };

  // Stories: toque para passar. Cada tela passa sozinha depois de um tempo.
  E.stories = async (caixa, d) => {
    // Todas as frases: a primeira, as do meio e a final.
    const frases = [d.titulo, ...d.quadros, d.ok];
    // Lugar das barrinhas de cima.
    const barras = K.add(caixa, 'div', 'ab-barras');
    // Cria uma barrinha para cada tela.
    const marcas = frases.map(() => K.add(K.add(barras, 'div', 'ab-barrinha'), 'i'));
    // Camada que ouve o dedo.
    const pele = E.pele(caixa);
    // Passa por cada tela.
    for (let i = 0; i < frases.length; i++) {
      // Cria a tela.
      const q = K.add(caixa, 'div', 'ab-quadro q' + (i % 4));
      // Escreve a frase.
      palavraPorPalavra(q, 'ab-frase', frases[i]);
      // Na primeira tela, ensina o gesto.
      if (i === 0) K.add(q, 'p', 'ab-dica', d.dica);
      // A barrinha desta tela começa a encher.
      marcas[i].classList.add('anda');
      // Som curtinho.
      K.som(520 + i * 70, 70, 'sine', 0.05);
      // Última tela: só espera um pouco.
      if (i === frases.length - 1) {
        // Tira a camada.
        pele.remove();
        // Sucesso.
        U.vibra([20, 40, 20]);
        // Dá tempo de ler.
        await U.esperar(2800);
        // Sai da repetição.
        break;
      }
      // Espera o toque ou 4,2 segundos, o que vier primeiro.
      await Promise.race([K.toque(pele), U.esperar(4200)]);
      // Barrinha cheia.
      marcas[i].classList.add('cheia');
      // Tira a tela depois da próxima entrar.
      setTimeout(() => q.remove(), 500);
    }
  };

  /* ---------- ia: conversa com assistente ---------- */

  // Ia: uma conversa aparece, e só uma resposta funciona.
  E.ia = async (caixa, d) => {
    // Bola de luz da assistente.
    K.add(caixa, 'div', 'ab-orbe');
    // Nome da assistente.
    K.add(caixa, 'h1', 'ab-titulo', d.titulo);
    // Lugar da conversa.
    const chat = K.add(caixa, 'div', 'ab-chat');
    // Mostra uma fala, com os três pontinhos antes.
    const fala = async (texto) => {
      // Cria o balão.
      const b = K.add(chat, 'p', 'ab-balao ela');
      // Três pontinhos.
      b.innerHTML = '<i class="ab-pontos"><i></i><i></i><i></i></i>';
      // Sobe a conversa.
      chat.scrollTop = chat.scrollHeight;
      // Tempo digitando: mais comprido em frase comprida.
      await U.esperar(650 + texto.length * 16);
      // Troca os pontinhos pela frase.
      b.innerHTML = U.fmt(texto);
      // Som de mensagem.
      K.som(880, 70, 'sine', 0.05);
      // Sobe a conversa.
      chat.scrollTop = chat.scrollHeight;
      // Dá tempo de ler.
      await U.esperar(420);
    };
    // Mostra cada fala.
    for (const t of d.falas) await fala(t);
    // Lugar das respostas.
    const opcoes = K.add(caixa, 'div', 'ab-opcoes');
    // Resposta certa.
    const certa = K.add(opcoes, 'button', 'ab-opcao', d.respostas[0]);
    // Diz ao navegador que é um botão comum.
    certa.type = 'button';
    // Resposta que foge.
    const errada = K.add(opcoes, 'button', 'ab-opcao foge', d.respostas[1]);
    // Diz ao navegador que é um botão comum.
    errada.type = 'button';
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Faz a resposta errada fugir do dedo.
    const foge = (e) => {
      // Cancela o clique.
      e.preventDefault();
      // Pula para um lugar sorteado da tela.
      errada.style.left = U.rand(6, 58).toFixed(0) + 'vw';
      // Pula para um lugar sorteado da tela.
      errada.style.top = U.rand(10, 74).toFixed(0) + 'vh';
      // Solta a resposta do lugar dela.
      errada.classList.add('solta');
      // Som de escape.
      K.som(1200, 50, 'triangle', 0.04);
    };
    // Foge quando o mouse chega perto.
    errada.addEventListener('pointerenter', foge);
    // Foge quando o dedo encosta.
    errada.addEventListener('pointerdown', foge);
    // Foge se o clique chegar mesmo assim.
    errada.addEventListener('click', foge);
    // Espera o toque na resposta certa.
    await K.toque(certa);
    // Tira as respostas.
    opcoes.remove();
    // Tira a frase que ensina.
    dica.remove();
    // Mostra a resposta da pessoa.
    K.add(chat, 'p', 'ab-balao eu', d.respostas[0]);
    // Mostra a fala final.
    await fala(d.ok);
    // Som de sucesso.
    K.som(1200, 90, 'sine', 0.06);
    // Dá tempo de ler.
    await U.esperar(2000);
  };

  /* ---------- holo: carta holográfica ---------- */

  // Holo: incline a carta e vire para ler o verso.
  E.holo = async (caixa, d, liga) => {
    // Mesa onde a carta fica.
    const mesa = K.add(caixa, 'div', 'ab-mesa');
    // A carta.
    const carta = K.add(mesa, 'button', 'ab-cartao');
    // Diz ao navegador que é um botão comum.
    carta.type = 'button';
    // Nome da carta, para quem usa leitor de tela.
    carta.setAttribute('aria-label', d.dica);
    // Frente da carta.
    const frente = K.add(carta, 'span', 'ab-lado frente');
    // Desenho da frente.
    K.add(frente, 'b', 'ab-holo-icone', d.icone);
    // Frase da frente.
    K.add(frente, 'strong', 'ab-holo-nome', d.titulo);
    // Brilho colorido da frente.
    K.add(frente, 'i', 'ab-foil');
    // Verso da carta.
    const verso = K.add(carta, 'span', 'ab-lado verso');
    // Frase do verso.
    K.add(verso, 'strong', 'ab-holo-verso', d.verso);
    // Brilho colorido do verso.
    K.add(verso, 'i', 'ab-foil');
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Ângulo atual, de 0 a 180.
    let giro = 0;
    // Marca se o dedo está mexendo na carta.
    let presa = false;
    // Marca se a animação já terminou.
    let parado = false;
    // Horário do começo.
    const t0 = performance.now();
    // Mexe a carta sozinha, para o brilho chamar atenção.
    const passo = (t) => {
      // Terminou: para de mexer.
      if (parado) return;
      // Já pede o próximo quadro.
      requestAnimationFrame(passo);
      // Tempo em segundos.
      const s = (t - t0) / 1000;
      // Inclinação para cima e para baixo.
      const rx = Math.sin(s * 1.1) * 9;
      // Inclinação para os lados. Com o dedo, obedece ao dedo.
      const ry = giro + (presa ? 0 : Math.cos(s * 0.8) * 13);
      // Entrega a inclinação para cima e para baixo.
      carta.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      // Entrega a inclinação para os lados.
      carta.style.setProperty('--ry', ry.toFixed(2) + 'deg');
      // Move o brilho colorido no lado.
      carta.style.setProperty('--bx', 50 + (ry % 180) * 0.55 + '%');
      // Move o brilho colorido na altura.
      carta.style.setProperty('--by', 50 + rx * 2.4 + '%');
    };
    // Começa a mexer.
    requestAnimationFrame(passo);
    // Guarda para desligar no fim.
    liga({
      // Para de mexer.
      parar: () => {
        // Marca como parado.
        parado = true;
      }
    });
    // Espera a pessoa virar a carta.
    await K.arrasta(carta, {
      // Gesto esperado: para a esquerda.
      rumo: [-180, 0],
      // Enquanto o dedo anda, a carta gira.
      move: (dx) => {
        // Avisa que o dedo está mexendo.
        presa = true;
        // Tira a frase que ensina.
        dica.classList.add('some');
        // Gira a carta. Número maior = gira mais com menos dedo.
        giro = Math.max(-180, Math.min(180, dx * 1.05));
      },
      // Quando soltar, confere se passou da metade.
      solta: (dx) => {
        // Soltou.
        presa = false;
        // Passou da metade: conta. Número maior = precisa virar mais.
        const foi = Math.abs(dx) > 70;
        // Não passou: volta.
        if (!foi) giro = 0;
        // Entrega se conseguiu.
        return foi;
      }
    });
    // Som de carta virando.
    K.som(740, 120, 'sine', 0.06);
    // Termina de virar.
    await E.anima(giro, giro < 0 ? -180 : 180, 420, (v) => {
      // Guarda o ângulo.
      giro = v;
    });
    // Mostra a frase final.
    await E.fecha(caixa, d, 2600);
  };

  /* ---------- tunel: palavras em 3D ---------- */

  // Túnel: arraste para cima e atravesse as palavras.
  E.tunel = async (caixa, d, liga) => {
    // Mundo em 3D.
    const mundo = K.add(caixa, 'div', 'ab-mundo');
    // Distância entre as palavras. Número maior = mais espaço entre elas.
    const passo = 620;
    // Todas as palavras: as que passam e a frase final.
    const lista = [...d.palavras, d.titulo];
    // Cria as palavras.
    const pecas = lista.map((t, i) => {
      // Última palavra: a frase final.
      const ultima = i === lista.length - 1;
      // Cria a palavra.
      const p = K.add(mundo, 'b', 'ab-3d' + (ultima ? ' fim' : ''), t);
      // Lado da palavra: uma para cada lado. A final fica no centro.
      const x = ultima ? 0 : (i % 2 ? 1 : -1) * Math.min(innerWidth * 0.14, 150);
      // Altura da palavra: sobe e desce.
      const y = ultima ? 0 : Math.sin(i * 2.1) * Math.min(innerHeight * 0.14, 120);
      // Distância da palavra.
      const z = -(i + 1) * passo;
      // Coloca a palavra no lugar.
      p.style.transform = 'translate(-50%, -50%) translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
      // Entrega a palavra e a distância dela.
      return { p, z };
    });
    // Cria os aros do túnel. Número maior = mais aros.
    for (let i = 0; i < 16; i++) {
      // Cria o aro.
      const a = K.add(mundo, 'i', 'ab-aro');
      // Coloca o aro no lugar.
      a.style.transform = 'translate(-50%, -50%) translateZ(' + -i * passo * 0.5 + 'px)';
    }
    // Camada que ouve o dedo.
    const pele = E.pele(caixa);
    // A frase que ensina o gesto.
    const dica = E.dica(caixa, d.dica);
    // Quanto a câmera já andou.
    let z = 0;
    // Quanto a câmera quer andar.
    let alvo = 0;
    // Onde o dedo começou a contar.
    let base = 0;
    // Fim do caminho: um pouco antes da última frase. Número menor = a frase fica maior no fim.
    const fim = lista.length * passo - 170;
    // Marca se a animação já terminou.
    let parado = false;
    // Anda com a câmera.
    const quadro = () => {
      // Terminou: para.
      if (parado) return;
      // Já pede o próximo quadro.
      requestAnimationFrame(quadro);
      // A câmera persegue o alvo.
      z += (alvo - z) * 0.1;
      // Move o mundo.
      mundo.style.transform = 'translateZ(' + z + 'px)';
      // Acerta a transparência de cada palavra.
      for (const q of pecas) {
        // Distância da palavra até a câmera.
        const dist = -q.z - z;
        // A frase final nunca some.
        const ultima = q === pecas[pecas.length - 1];
        // Longe some aos poucos. Passou da câmera, some de vez.
        q.p.style.opacity = ultima ? Math.max(0, Math.min(1, (2300 - dist) / 1200)) : dist < 60 ? 0 : Math.max(0, Math.min(1, (2300 - dist) / 1200)) * Math.min(1, (dist - 60) / 160);
      }
    };
    // Começa.
    requestAnimationFrame(quadro);
    // Guarda para desligar no fim.
    liga({
      // Para de andar.
      parar: () => {
        // Marca como parado.
        parado = true;
      }
    });
    // Anda com a rodinha do mouse, no computador.
    const roda = (e) => {
      // Tira a frase que ensina.
      dica.classList.add('some');
      // Anda.
      alvo = Math.min(fim, Math.max(0, alvo + e.deltaY * 1.4));
      // Guarda o lugar.
      base = alvo;
    };
    // Fica de olho na rodinha.
    pele.addEventListener('wheel', roda, { passive: true });
    // Espera a pessoa chegar no fim.
    await new Promise((ok) => {
      // Confere de tempos em tempos se chegou.
      const confere = setInterval(() => {
        // Ainda não chegou.
        if (alvo < fim) return;
        // Para de conferir.
        clearInterval(confere);
        // Libera.
        ok();
      }, 120);
      // Liga o arrasto.
      K.arrasta(pele, {
        // Gesto esperado: para cima.
        rumo: [0, -300],
        // Enquanto o dedo anda, a câmera vai junto. Número maior = anda mais com menos dedo.
        move: (dx, dy) => {
          // Tira a frase que ensina.
          dica.classList.add('some');
          // Anda.
          alvo = Math.min(fim, Math.max(0, base - dy * 5));
        },
        // Quando soltar, guarda o lugar.
        solta: () => {
          // Guarda o lugar.
          base = alvo;
          // Só termina no fim do caminho.
          return alvo >= fim;
        }
      });
    });
    // Tira a marca do teste, se ainda estiver lá.
    delete pele.dataset.acao;
    // Tira a camada.
    pele.remove();
    // Som de chegada.
    K.som(392, 240, 'sine', 0.07);
    // Mostra a frase final.
    await E.fecha(caixa, d, 2400);
  };
})();
