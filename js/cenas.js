/* ==========================================================
   cenas.js — o "motor": roda a arte própria da mensagem e depois o final
   (título, texto, reações, carta e "ver de novo").
   As artes ficam em js/artes-*.js, uma função para cada link.
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
  const Cenas = {};

  // Coordenadas do centro de um elemento (para soltar partículas nele).
  const centro = (el) => {
    // Mede o tamanho e o lugar da peça e guarda com o nome "r".
    const r = el.getBoundingClientRect();
    // Termina aqui e entrega o resultado.
    return [r.left + r.width / 2, r.top + r.height / 2];
  };

  // Abre a carta longa em uma janela (dialog). Parágrafos separados por linha em branco.
  function abrirCarta(texto) {
    // Pega a janela e o lugar do texto.
    const dlg = U.$('#carta');
    // Procura uma peça na tela e guarda com o nome "alvo".
    const alvo = U.$('#cartaTexto');
    // Monta os parágrafos com texto tratado.
    alvo.innerHTML = String(texto)
      .split(/\n\s*\n/)
      .map((p) => '<p>' + U.esc(p.trim()).replace(/\n/g, '<br>') + '</p>')
      .join('');
    // showModal é o normal; se o navegador for antigo, abre pelo atributo.
    if (typeof dlg.showModal === 'function') dlg.showModal();
    // Se o caso de cima não valeu, faz isto.
    else dlg.setAttribute('open', '');
    // Fecha pelo botão.
    U.$('#cartaFechar').onclick = () => (dlg.close ? dlg.close() : dlg.removeAttribute('open'));
    // Fecha clicando fora da carta.
    dlg.onclick = (e) => {
      // Se a condição entre parênteses valer: fecha a janela.
      if (e.target === dlg && dlg.close) dlg.close();
    };
  }

  // Tela final: título, mensagem, reações (chips) e botões.
  async function revelar(msg, cat, d) {
    // Abre a tela do final.
    const caixa = K.tela('final');
    // Solta partículas do tema e vibra para comemorar.
    Fundo.festa(5);
    // Faz o celular tremer um pouquinho.
    U.vibra([30, 40, 30]);
    // Cria o lugar do título.
    const t = U.el('h2', 'titulo');
    // Coloca o título na tela.
    caixa.appendChild(t);
    // Faz o título se decodificar, como uma mensagem secreta.
    Efeitos.decodifica(t, d.ti, 900);
    // Pausa curta antes da mensagem.
    await U.esperar(900);
    // Mensagem palavra por palavra.
    const tx = U.el('p', 'texto');
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(tx);
    // Escreve o texto palavra por palavra e espera terminar.
    await K.fala(tx, d.m, 190);
    // Reações: cada chip abre o WhatsApp com texto pronto (se houver número) ou mostra um aviso.
    const chips = U.el('div', 'chips entra');
    // Cria um botão para cada reação da categoria.
    (msg.chips || cat.chips || []).forEach((rotulo) => {
      // Cria o botão da reação.
      const c = U.el('button', 'chip', U.esc(rotulo));
      // Diz ao navegador que é um botão comum.
      c.type = 'button';
      // Ao tocar: marca a escolhida, abre o WhatsApp ou mostra o aviso, e solta partículas.
      c.addEventListener('click', () => {
        // Marca só a escolhida.
        [...chips.children].forEach((x) => x.classList.remove('sel'));
        // Liga o visual "sel" (veja .sel no CSS).
        c.classList.add('sel');
        // Faz o celular tremer um pouquinho.
        U.vibra(15);
        // Lê o número do WhatsApp, só com dígitos.
        const num = String((window.CONFIG && CONFIG.WHATSAPP) || '').replace(/\D/g, '');
        // Com número abre a conversa; sem número só orienta.
        if (num)
          // Abre o WhatsApp em outra aba.
          window.open('https://wa.me/' + num + '?text=' + encodeURIComponent('💌 ' + rotulo), '_blank', 'noopener');
        // Se o caso de cima não valeu, faz isto.
        else U.aviso('Agora é só me responder com um oi 💬');
        // Partículas saindo da reação.
        Fundo.explodirEm(...centro(c), 14);
      });
      // Coloca na fileira.
      chips.appendChild(c);
    });
    // Só mostra a fileira se houver reações.
    if (chips.children.length) caixa.appendChild(chips);
    // Fileira dos botões finais.
    const acoes = U.el('div', 'acoes entra');
    // Coloca a peça nova dentro de caixa.
    caixa.appendChild(acoes);
    // Botão da carta, só quando a mensagem tem carta.
    if (msg.carta) {
      // Cria uma peça nova, ainda fora da tela e guarda com o nome "bc".
      const bc = U.el('button', 'btn', 'ler a carta ✉️');
      // Diz ao navegador que é um botão comum.
      bc.type = 'button';
      // Fica de olho: quando a pessoa tocar, roda o que está aqui.
      bc.addEventListener('click', () => abrirCarta(msg.carta));
      // Coloca a peça nova dentro de acoes.
      acoes.appendChild(bc);
    }
    // Botão de rever a mensagem do começo.
    const again = U.el('button', 'btn leve', 'ver de novo ↺');
    // Diz ao navegador que é um botão comum.
    again.type = 'button';
    // Fica de olho: quando a pessoa tocar, roda o que está aqui.
    again.addEventListener('click', () => location.reload());
    // Coloca a peça nova dentro de acoes.
    acoes.appendChild(again);
  }

  // Roda a mensagem inteira: a arte e o final. Um erro na arte não impede a mensagem de chegar.
  Cenas.rodar = async (msg, cat) => {
    // Mostra o leitor de digital antes de tudo.
    try {
      // Roda a abertura com os textos da categoria.
      await Abertura(cat.abertura);
      // Se deu erro, cai aqui e o site continua funcionando.
    } catch (e) {
      // Escreve o erro no console, para ajudar a achar o problema.
      console.error('abertura', e);
    }
    // Roda a arte própria deste link.
    try {
      // Usa a função Artes[msg.ab.a].
      await Artes[msg.ab.a](msg.ab.d, { msg, cat });
      // Se deu erro, cai aqui e o site continua funcionando.
    } catch (e) {
      // Escreve o erro no console, para ajudar a achar o problema.
      console.error('arte ' + msg.ab.a, e);
    }
    // Escolhe as frases até completar a parte da música pedida em data/config.js.
    const frases = escolheFrases(msg.id, cat.duracao * 1000 * CONFIG.FRASES_MUSICA);
    // Divide as frases em duas partes, uma depois de cada capítulo.
    const meio = Math.ceil(frases.length / 2);
    // Roda os capítulos extras deste link, um depois do outro.
    for (const [i, c] of (window.CAP[msg.id] || []).entries()) {
      // Tenta rodar o capítulo; se der erro, pula para o próximo.
      try {
        // Anota o número do capítulo, que aparece na etiqueta de cima.
        Capitulos.numero = i + 1;
        // Roda o capítulo do tipo escolhido nos dados.
        await Capitulos[c.t](c);
        // Se deu erro, cai aqui e o site continua funcionando.
      } catch (e) {
        // Escreve o erro no console, para ajudar a achar o problema.
        console.error('capitulo ' + c.t, e);
      }
      // Depois de cada capítulo, passa uma parte do filme de frases.
      await Filme(frases, i ? meio : 0, i ? frases.length : meio);
    }
    // Mostra o final, que é sempre o último passo.
    await revelar(msg, cat, msg.passos[msg.passos.length - 1]);
  };

  // Deixa estas ferramentas disponíveis para os outros arquivos.
  g.Cenas = Cenas;
  // Fecha a caixa e já roda tudo.
})(window);
