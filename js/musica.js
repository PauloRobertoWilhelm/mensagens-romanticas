/* ==========================================================
   musica.js — toca o MP3 da categoria e troca a legenda no ritmo.
   Navegadores só liberam áudio depois de um toque da pessoa, então
   Musica.tocar() é chamado dentro do primeiro clique/toque.
   Se o MP3 não existir, a página continua funcionando (só legenda).
   ========================================================== */

// Isola variáveis.
(function (g) {
  // Modo estrito.
  'use strict';

  // Objeto público.
  const Musica = {};

  // Estado interno.
  let audio = null, cat = null, rodape = null, leg = null, btn = null;
  let indice = 0, timer = null, tocando = false, semAudio = false, mudo = false;

  // Troca a legenda com fade: apaga, troca o texto, acende.
  const mostrarLegenda = () => {
    // Sem legendas cadastradas, nada a fazer.
    if (!cat || !cat.legendas || !cat.legendas.length) return;
    // Apaga a atual.
    leg.classList.add('troca');
    // Depois de 450 ms (fade), troca o texto e acende.
    setTimeout(() => { leg.textContent = cat.legendas[indice % cat.legendas.length]; indice++; leg.classList.remove('troca'); }, 450);
  };

  // Intervalo entre legendas = 4 batidas da música (60000/bpm * 4), nunca menos que 3,5 s.
  const intervalo = () => Math.max(3500, Math.round((60000 / (cat.bpm || 80)) * 4));

  // Prepara tudo (sem tocar ainda): cria o <audio>, mostra o rodapé.
  Musica.iniciar = (categoria) => {
    // Guarda a categoria.
    cat = categoria;
    // Pega os elementos do rodapé.
    rodape = U.$('#rodape'); leg = U.$('#legenda'); btn = U.$('#mudo');
    // Mostra o rodapé e deixa o equalizador parado até a música começar.
    rodape.hidden = false; rodape.classList.add('parado');
    // Cria o player: loop, volume inicial 0 (sobe com fade) e carregamento antecipado.
    audio = new Audio(); audio.loop = true; audio.preload = 'auto'; audio.volume = 0;
    // Se o arquivo não carregar (não existe / bloqueado), entra no modo sem áudio.
    audio.addEventListener('error', () => { semAudio = true; btn.hidden = true; rodape.classList.add('parado'); });
    // Define a fonte (caminho relativo ao index.html).
    audio.src = cat.musica;
    // Botão de mudo alterna o som.
    btn.addEventListener('click', Musica.alternarMudo);
    // Pausa o som se a aba for escondida e volta ao retornar.
    document.addEventListener('visibilitychange', () => { if (!audio || semAudio || !tocando) return; if (document.hidden) audio.pause(); else if (!mudo) audio.play().catch(() => {}); });
  };

  // Começa a tocar (chamar dentro de um clique/toque). Seguro chamar várias vezes.
  Musica.tocar = () => {
    // Já tocando ou sem categoria: sai.
    if (tocando || !audio) return;
    tocando = true;
    // Tenta tocar; se o navegador recusar, segue só com legendas.
    const p = audio.play();
    if (p && p.catch) p.catch(() => { semAudio = true; btn.hidden = true; rodape.classList.add('parado'); });
    // Sobe o volume de 0 até o configurado em 2 s (fade-in suave).
    const alvo = (window.CONFIG && CONFIG.VOLUME) || .85; const t0 = performance.now();
    const sobe = (t) => { audio.volume = Math.max(0, Math.min(alvo, alvo * ((t - t0) / 2000))); if (audio.volume < alvo) requestAnimationFrame(sobe); };
    requestAnimationFrame(sobe);
    // Equalizador começa a mexer (se há áudio).
    rodape.classList.remove('parado');
    // Primeira legenda e troca periódica no ritmo.
    mostrarLegenda(); timer = setInterval(mostrarLegenda, intervalo());
  };

  // Liga/desliga o som.
  Musica.alternarMudo = () => {
    // Inverte o estado.
    mudo = !mudo;
    // Aplica no player, no ícone e no equalizador.
    if (audio) audio.muted = mudo;
    btn.textContent = mudo ? '🔇' : '🔊'; btn.setAttribute('aria-label', mudo ? 'Ativar música' : 'Silenciar música');
    rodape.classList.toggle('mudo', mudo);
  };

  // Publica.
  g.Musica = Musica;
// Executa.
})(window);
