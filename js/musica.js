/* ==========================================================
   musica.js — toca o MP3 da categoria do link.
   Navegadores só liberam áudio depois de um toque da pessoa, então
   Musica.tocar() é chamado dentro do primeiro clique/toque.
   Se o MP3 não existir, a página continua funcionando, só sem som.
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
  const Musica = {};

  // Anotações que este arquivo usa enquanto funciona.
  let audio = null,
    cat = null,
    rodape = null,
    btn = null;
  // Anotações que o código vai usando enquanto funciona: tocando, semAudio, mudo.
  let tocando = false,
    semAudio = false,
    mudo = false;

  // Prepara tudo (sem tocar ainda): cria o <audio>, mostra o rodapé.
  Musica.iniciar = (categoria) => {
    // Guarda a categoria.
    cat = categoria;
    // Pega os elementos do rodapé.
    rodape = U.$('#rodape');
    // Pega o botão de mudo.
    btn = U.$('#mudo');
    // Mostra o rodapé e deixa o equalizador parado até a música começar.
    rodape.hidden = false;
    // Liga o visual "parado" (veja .parado no CSS).
    rodape.classList.add('parado');
    // Cria o player: loop, volume inicial 0 (sobe com fade) e carregamento antecipado.
    audio = new Audio();
    // Faz a música recomeçar quando acabar.
    audio.loop = true;
    // Pede para baixar a música antes de tocar.
    audio.preload = 'auto';
    // Escolhe o volume da música.
    audio.volume = 0;
    // Se o arquivo não carregar (não existe / bloqueado), entra no modo sem áudio.
    audio.addEventListener('error', () => {
      // Anota que a música não vai tocar.
      semAudio = true;
      // Esconde btn.
      btn.hidden = true;
      // Liga o visual "parado" (veja .parado no CSS).
      rodape.classList.add('parado');
    });
    // Define a fonte (caminho relativo ao index.html).
    audio.src = cat.musica;
    // Botão de mudo alterna o som.
    btn.addEventListener('click', Musica.alternarMudo);
    // Pausa o som se a aba for escondida e volta ao retornar.
    document.addEventListener('visibilitychange', () => {
      // Se a condição entre parênteses valer, para por aqui.
      if (!audio || semAudio || !tocando) return;
      // Se a condição entre parênteses valer: pausa a música.
      if (document.hidden) audio.pause();
      // Se o caso de cima não valeu, faz isto.
      else if (!mudo) audio.play().catch(() => {});
    });
  };

  // Começa a tocar (chamar dentro de um clique/toque). Seguro chamar várias vezes.
  Musica.tocar = () => {
    // Já tocando ou sem categoria: sai.
    if (tocando || !audio) return;
    // Anota que a música já começou.
    tocando = true;
    // Tenta tocar; se o navegador recusar, o próximo toque tenta de novo.
    const p = audio.play();
    // Se a condição entre parênteses valer: se der erro, segue sem quebrar.
    if (p && p.catch)
      // Se der erro, segue sem quebrar.
      p.catch(() => {
        // Anota que ainda não tocou, para tentar de novo no próximo toque.
        tocando = false;
      });
    // Sobe o volume de 0 até o configurado em 2 s (fade-in suave).
    const alvo = (window.CONFIG && CONFIG.VOLUME) || 0.85;
    // Anota o horário de agora e guarda com o nome "t0".
    const t0 = performance.now();
    // Cria a ajuda "sobe", para usar mais adiante.
    const sobe = (t) => {
      // Escolhe o volume da música.
      audio.volume = Math.max(0, Math.min(alvo, alvo * ((t - t0) / 2000)));
      // Se a condição entre parênteses valer: pede para rodar de novo no próximo quadro da tela.
      if (audio.volume < alvo) requestAnimationFrame(sobe);
    };
    // Pede para rodar de novo no próximo quadro da tela.
    requestAnimationFrame(sobe);
    // Equalizador começa a mexer (se há áudio).
    rodape.classList.remove('parado');
  };

  // Diz em que ponto da batida a música está: 1 na hora da batida, caindo até 0.
  Musica.batida = () => {
    // Música parada ou sem ritmo cadastrado: sem batida.
    if (!audio || !tocando || semAudio || audio.paused || !cat.bpm) return 0;
    // Descobre o ponto entre uma batida e a próxima.
    const fase = ((audio.currentTime * cat.bpm) / 60) % 1;
    // Faz a batida começar forte e cair depressa.
    return Math.pow(1 - fase, 3);
  };

  // Liga/desliga o som.
  Musica.alternarMudo = () => {
    // Inverte o estado.
    mudo = !mudo;
    // Aplica no player, no ícone e no equalizador.
    if (audio) audio.muted = mudo;
    // Troca o texto de btn.
    btn.textContent = mudo ? '🔇' : '🔊';
    // Dá um nome à peça, para quem usa leitor de tela.
    btn.setAttribute('aria-label', mudo ? 'Ativar música' : 'Silenciar música');
    // Liga ou desliga o visual "mudo".
    rodape.classList.toggle('mudo', mudo);
  };

  // Deixa estas ferramentas disponíveis para os outros arquivos.
  g.Musica = Musica;
  // Fecha a caixa e já roda tudo.
})(window);
