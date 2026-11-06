/* ==========================================================
   filme.js — o "filme de frases": as frases aparecem uma de cada vez,
   com letras animadas, por cima do fundo. Um toque adianta para a próxima.
   As frases ficam em data/frases-*.js.
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

  // Jeitos de a frase entrar. Cada um está em css/filme.css.
  const JEITOS = ['sobe', 'zoom', 'lado', 'foco', 'gira', 'desce'];

  // Mostra as frases da 'lista', de 'de' até antes de 'ate'.
  g.Filme = async (lista, de, ate) => {
    // Abre a tela. A classe "final" faz o texto usar a letra da arte.
    const caixa = K.tela('filme final');
    // Pega a tela em volta da caixa, onde o toque adianta.
    const cena = caixa.parentElement;
    // Barra de progresso em cima.
    const barra = K.add(K.add(cena, 'div', 'trilho-f'), 'i', 'cheio-f');
    // Contador de frases.
    const conta = K.add(caixa, 'p', 'hud-cap');
    // Lugar da frase.
    const t = K.add(caixa, 'p', 'frase-f');
    // Dica pequena embaixo.
    K.add(caixa, 'p', 'dica', 'toque para adiantar');
    // Passa por cada frase.
    for (let i = de; i < ate; i++) {
      // Atualiza o contador.
      conta.textContent = 'FRASE ' + (i + 1) + ' DE ' + lista.length;
      // Enche a barra conforme o filme anda.
      barra.style.width = ((i + 1) / lista.length) * 100 + '%';
      // Escolhe o jeito de a frase entrar.
      t.className = 'frase-f ' + JEITOS[i % JEITOS.length];
      // Escreve a frase palavra por palavra.
      U.palavras(t, lista[i], 170);
      // Solta faíscas em cima da frase.
      Efeitos.em(t, 10);
      // Controle que tira o ouvinte de toque que sobrar.
      const ctrl = new AbortController();
      // Espera o tempo de ler OU um toque na tela, o que vier primeiro.
      await Promise.race([
        U.esperar(tempoFrase(lista[i]) - 500),
        new Promise((r) => cena.addEventListener('click', r, { once: true, signal: ctrl.signal }))
      ]);
      // Tira o ouvinte que sobrou.
      ctrl.abort();
      // Faz a frase sumir.
      t.classList.add('sai');
      // Dá tempo de ela sumir antes da próxima.
      await U.esperar(500);
    }
  };
  // Fecha a caixa e já roda tudo.
})(window);
