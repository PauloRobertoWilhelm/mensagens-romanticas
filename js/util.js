/* ==========================================================
   util.js — funções pequenas usadas por todo o projeto.
   Tudo fica dentro de um objeto global chamado U (script clássico,
   sem módulos, para funcionar abrindo o arquivo direto no navegador).
   ========================================================== */

// Envolve o código numa função que roda na hora, para não "vazar" variáveis soltas.
(function (g) {
  // Ativa o modo estrito: o navegador avisa de erros bobos (variável não declarada etc.).
  'use strict';

  // Objeto que guarda todas as utilidades.
  const U = {};

  // Atalho de querySelector: U.$('#palco') acha o elemento; 'raiz' limita a busca (padrão: página toda).
  U.$ = (seletor, raiz) => (raiz || document).querySelector(seletor);

  // Cria um elemento: tag (ex. 'div'), classes (texto) e HTML interno (opcional).
  U.el = (tag, classe, html) => {
    // Cria o elemento vazio.
    const e = document.createElement(tag);
    // Se veio classe, aplica.
    if (classe) e.className = classe;
    // Se veio HTML, coloca dentro (só usamos com texto já tratado por U.esc/U.fmt).
    if (html != null) e.innerHTML = html;
    // Devolve o elemento pronto.
    return e;
  };

  // Espera 'ms' milissegundos (usada com await para dar ritmo às cenas).
  U.esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Troca caracteres perigosos de HTML por versões seguras (evita que um texto quebre a página).
  U.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Número aleatório entre a e b.
  U.rand = (a, b) => a + Math.random() * (b - a);

  // Item aleatório de uma lista.
  U.sorteia = (lista) => lista[Math.floor(Math.random() * lista.length)];

  // Faz o aparelho vibrar (só celulares que suportam); try/catch porque alguns navegadores bloqueiam.
  U.vibra = (padrao) => { try { if (navigator.vibrate) navigator.vibrate(padrao); } catch (e) { /* sem vibração: tudo bem */ } };

  // Detecta se estamos rodando local (arquivo aberto, localhost) — nesses casos o ?m=ID é permitido.
  U.ehLocal = () => location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';

  // Mostra um aviso rápido (toast) na parte de baixo da tela por 3 segundos.
  U.aviso = (texto) => {
    // Pega o elemento #aviso do HTML.
    const a = U.$('#aviso');
    // Se não existir, não faz nada.
    if (!a) return;
    // Coloca o texto (seguro) e liga a classe que faz aparecer.
    a.textContent = texto; a.classList.add('on');
    // Guarda o temporizador anterior para não apagar o aviso novo cedo demais.
    clearTimeout(U._avisoT);
    // Depois de 3 s, esconde.
    U._avisoT = setTimeout(() => a.classList.remove('on'), 3000);
  };

  // Transforma texto com *destaque* em HTML seguro: o que está entre asteriscos vira <b class="dest">.
  U.fmt = (s) => U.esc(s).replace(/\*([^*]+)\*/g, '<b class="dest">$1</b>');

  // Revela um texto palavra por palavra dentro de 'alvo'. Devolve a duração total (ms).
  // passo = intervalo entre palavras (ms). Quebra de linha "\n" vira <br>.
  U.palavras = (alvo, texto, passo) => {
    // Intervalo padrão: 190 ms por palavra (leitura calma).
    const p = passo || 190;
    // Limpa o conteúdo anterior e remove o estado "pronto".
    alvo.innerHTML = ''; alvo.classList.remove('pronto');
    // Divide o texto em pedaços: o que está entre *...* e o resto.
    const partes = String(texto).split(/(\*[^*]+\*)/);
    // Contador de palavras para calcular o atraso de cada uma.
    let i = 0;
    // Passa por cada pedaço.
    partes.forEach((parte) => {
      // Se vazio, ignora.
      if (!parte) return;
      // Descobre se o pedaço é destaque e tira os asteriscos.
      const dest = parte.charAt(0) === '*' && parte.charAt(parte.length - 1) === '*';
      const limpo = dest ? parte.slice(1, -1) : parte;
      // Divide em linhas e depois em palavras.
      limpo.split('\n').forEach((linha, li) => {
        // Se não é a primeira linha do pedaço, insere uma quebra.
        if (li > 0) alvo.appendChild(document.createElement('br'));
        // Cada palavra vira um <span class="w"> com atraso próprio.
        linha.split(/\s+/).filter(Boolean).forEach((palavra) => {
          // Pontuação logo depois de um destaque gruda na palavra anterior, sem espaço no meio.
          if (/^[.,;:!?…)]/.test(palavra) && alvo.lastChild && alvo.lastChild.nodeType === 3) alvo.lastChild.remove();
          // Cria o span; se for destaque, ganha a classe dest.
          const s = U.el('span', 'w' + (dest ? ' dest' : ''), U.esc(palavra));
          // Atraso de animação proporcional à posição da palavra.
          s.style.animationDelay = (i * p) + 'ms';
          // Coloca na tela e um espaço depois (espaço normal para quebrar linha direito).
          alvo.appendChild(s); alvo.appendChild(document.createTextNode(' '));
          // Próxima palavra.
          i++;
        });
      });
    });
    // Duração total = tempo da última palavra + tempo da animação dela (700 ms).
    return i * p + 700;
  };

  // Anima um número de 0 até 'fim' em 'dur' ms, chamando 'cada(valor)' a cada quadro. Devolve Promise.
  U.contar = (fim, dur, cada) => new Promise((resolve) => {
    // Marca o instante de início.
    const t0 = performance.now();
    // Função chamada a cada quadro da tela.
    const passo = (t) => {
      // Progresso de 0 a 1.
      const k = Math.min(1, (t - t0) / dur);
      // Easing: começa rápido e desacelera no fim.
      const e = 1 - Math.pow(1 - k, 3);
      // Entrega o valor atual arredondado.
      cada(Math.round(fim * e));
      // Continua até terminar; no fim resolve a Promise.
      if (k < 1) requestAnimationFrame(passo); else resolve();
    };
    // Dispara o primeiro quadro.
    requestAnimationFrame(passo);
  });

  // Publica U como variável global (window.U).
  g.U = U;
// Executa passando a janela como 'g'.
})(window);
