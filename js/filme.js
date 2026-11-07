/* ==========================================================
   filme.js — o filme de frases: entrega as frases do link no formato dele.
   São 20 formatos, como balões de conversa, recibo, neon e cartas para virar.
   Qual formato cada link usa fica em data/formatos.js.
   As frases ficam em data/frases-*.js. O visual fica em css/filme.css.
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

  // Como cada formato se comporta. acumula = quantas frases ficam na tela. solto = cai em lugar sorteado.
  // escrita = jeito de aparecer o texto. tampa = símbolo que a pessoa toca para abrir a frase.
  const FORMATOS = {
    // Conversa: os balões vão se empilhando.
    balao: { acumula: 4 },
    // Tela de computador: as linhas vão sendo digitadas.
    terminal: { acumula: 4, escrita: 'digita' },
    // Painel de aeroporto: as letras vão se acertando.
    placa: { escrita: 'decodifica' },
    // Fotos instantâneas jogadas na mesa.
    polaroid: { acumula: 2, solto: true },
    // Bilhetes colados na parede.
    postit: { acumula: 4, solto: true },
    // Letra de música, palavra por palavra.
    karaoke: {},
    // Legenda de filme, com as faixas pretas do cinema.
    cinema: {},
    // Letreiro luminoso.
    neon: { escrita: 'decodifica' },
    // Máquina de escrever, com a folha subindo.
    maquina: { acumula: 3, escrita: 'digita' },
    // Carta virada: precisa tocar para ler.
    carta: { tampa: '✦' },
    // Caixa de presente: precisa tocar para abrir.
    presente: { tampa: '🎁' },
    // Estrela no céu: precisa tocar para acender.
    estrela: { tampa: '★' },
    // Bolha que sobe devagar.
    bolha: {},
    // Quadrinho de gibi com explosão.
    quadrinho: { solto: true },
    // Holograma azul.
    holograma: { escrita: 'decodifica' },
    // Pergaminho que desenrola.
    pergaminho: {},
    // Recibo saindo da impressora.
    recibo: { acumula: 5 },
    // Avisos caindo na tela do celular.
    notificacao: { acumula: 4 },
    // Lousa escrita a giz.
    lousa: { escrita: 'digita' },
    // Coração que abre com um toque.
    coracao: { tampa: '❤' }
  };

  // Escreve a frase no jeito do formato.
  const escreve = (f, alvo, texto) => {
    // Tira os asteriscos, para os jeitos que escrevem letra por letra.
    const limpo = texto.replace(/\*/g, '');
    // Letra por letra, como quem digita.
    if (f.escrita === 'digita') K.digita(alvo, limpo, 26);
    // Letras embaralhadas que vão se acertando.
    else if (f.escrita === 'decodifica') Efeitos.decodifica(alvo, limpo, 1100);
    // Palavra por palavra, com destaque nas palavras entre asteriscos.
    else U.palavras(alvo, texto, 170);
  };

  // Mostra as frases da 'lista', de 'de' até antes de 'ate', no formato de 'cfg'.
  g.Filme = async (lista, de, ate, cfg) => {
    // Pega o jeito do formato deste link.
    const f = FORMATOS[cfg.formato];
    // Abre a tela com o visual do formato. A classe "final" usa a letra da arte.
    const caixa = K.tela('filme final f-' + cfg.formato);
    // Pega a tela em volta da caixa, onde o toque adianta.
    const cena = caixa.parentElement;
    // Barra de progresso em cima.
    const barra = K.add(K.add(cena, 'div', 'trilho-f'), 'i', 'cheio-f');
    // Lugar onde as frases aparecem.
    const palco = K.add(caixa, 'div', 'palco-f');
    // Frases que estão na tela agora.
    const itens = [];
    // Passa por cada frase.
    for (let i = de; i < ate; i++) {
      // Enche a barra conforme o filme anda.
      barra.style.width = ((i + 1) / lista.length) * 100 + '%';
      // Cria a peça desta frase.
      const item = K.add(palco, 'div', 'item-f');
      // Sorteia a inclinação, para nada ficar certinho demais.
      item.style.setProperty('--r', U.rand(-5, 5).toFixed(1) + 'deg');
      // Formatos soltos caem em um lugar sorteado.
      if (f.solto) item.style.setProperty('--x', U.rand(-14, 14).toFixed(0) + '%');
      // Etiqueta da frase, com o número dela.
      K.add(item, 'small', 'rotulo-f', cfg.rotulo.replace('#', i + 1));
      // Lugar do texto da frase.
      const t = K.add(item, 'p', 'texto-f');
      // Guarda a peça na lista das que estão na tela.
      itens.push(item);
      // Formatos com tampa esperam a pessoa tocar para abrir.
      if (f.tampa) {
        // Cria a tampa por cima da frase.
        const tampa = U.el('button', 'tampa-f', U.esc(f.tampa));
        // Diz ao navegador que é um botão comum.
        tampa.type = 'button';
        // Dá um nome à peça, para quem usa leitor de tela.
        tampa.setAttribute('aria-label', 'Abrir a próxima frase');
        // Coloca a tampa na peça.
        item.appendChild(tampa);
        // Espera o toque.
        await K.toque(tampa);
        // Faz um sonzinho de abrir.
        K.som(520 + (i % 6) * 70, 110, 'triangle');
        // Solta faíscas em cima da tampa.
        Efeitos.em(tampa, 22);
        // Tira a tampa.
        tampa.remove();
      }
      // Escreve a frase.
      escreve(f, t, lista[i]);
      // Espera um pouquinho, para o toque que abriu a tampa não pular a frase.
      await U.esperar(300);
      // Controle que tira o ouvinte de toque que sobrar.
      const ctrl = new AbortController();
      // Espera o tempo de ler OU um toque na tela, o que vier primeiro.
      await Promise.race([
        U.esperar(tempoFrase(lista[i]) - (f.acumula ? 500 : 800)),
        new Promise((r) => cena.addEventListener('click', r, { once: true, signal: ctrl.signal }))
      ]);
      // Tira o ouvinte que sobrou.
      ctrl.abort();
      // Passou do limite de frases na tela: tira as mais antigas.
      while (itens.length >= (f.acumula || 1)) {
        // Pega a frase mais antiga.
        const velho = itens.shift();
        // Faz ela sumir.
        velho.classList.add('sai');
        // Tira do HTML depois que sumir.
        setTimeout(() => velho.remove(), 500);
      }
      // Dá tempo de a frase sumir antes da próxima.
      await U.esperar(f.acumula ? 200 : 500);
    }
  };
  // Fecha a caixa e já roda tudo.
})(window);
