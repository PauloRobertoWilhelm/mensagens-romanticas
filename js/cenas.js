/* ==========================================================
   cenas.js — o "motor": roda a arte própria da mensagem e depois o final
   (título, texto, reações, carta e "ver de novo").
   As artes ficam em js/artes-*.js, uma função para cada link.
   ========================================================== */

// Isola variáveis.
(function (g) {
  // Modo estrito.
  'use strict';

  // Objeto público.
  const Cenas = {};

  // Coordenadas do centro de um elemento (para soltar partículas nele).
  const centro = (el) => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

  // Abre a carta longa em uma janela (dialog). Parágrafos separados por linha em branco.
  function abrirCarta(texto) {
    // Pega a janela e o lugar do texto.
    const dlg = U.$('#carta'); const alvo = U.$('#cartaTexto');
    // Monta os parágrafos com texto tratado.
    alvo.innerHTML = String(texto).split(/\n\s*\n/).map((p) => '<p>' + U.esc(p.trim()).replace(/\n/g, '<br>') + '</p>').join('');
    // showModal é o normal; se o navegador for antigo, abre pelo atributo.
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    // Fecha pelo botão.
    U.$('#cartaFechar').onclick = () => (dlg.close ? dlg.close() : dlg.removeAttribute('open'));
    // Fecha clicando fora da carta.
    dlg.onclick = (e) => { if (e.target === dlg && dlg.close) dlg.close(); };
  }

  // Tela final: título, mensagem, reações (chips) e botões.
  async function revelar(msg, cat, d) {
    // Abre a tela do final.
    const caixa = K.tela('final');
    // Solta partículas do tema e vibra para comemorar.
    Fundo.festa(5); U.vibra([30, 40, 30]);
    // Título palavra por palavra.
    const t = U.el('h2', 'titulo'); caixa.appendChild(t); U.palavras(t, d.ti, 240);
    // Pausa curta antes da mensagem.
    await U.esperar(900);
    // Mensagem palavra por palavra.
    const tx = U.el('p', 'texto'); caixa.appendChild(tx); await K.fala(tx, d.m, 190);
    // Reações: cada chip abre o WhatsApp com texto pronto (se houver número) ou mostra um aviso.
    const chips = U.el('div', 'chips entra');
    // Cria um botão para cada reação da categoria.
    (msg.chips || cat.chips || []).forEach((rotulo) => {
      // Cria o botão da reação.
      const c = U.el('button', 'chip', U.esc(rotulo)); c.type = 'button';
      // Ao tocar: marca a escolhida, abre o WhatsApp ou mostra o aviso, e solta partículas.
      c.addEventListener('click', () => {
        // Marca só a escolhida.
        [...chips.children].forEach((x) => x.classList.remove('sel')); c.classList.add('sel'); U.vibra(15);
        // Lê o número do WhatsApp, só com dígitos.
        const num = String((window.CONFIG && CONFIG.WHATSAPP) || '').replace(/\D/g, '');
        // Com número abre a conversa; sem número só orienta.
        if (num) window.open('https://wa.me/' + num + '?text=' + encodeURIComponent('💌 ' + rotulo), '_blank', 'noopener'); else U.aviso('Agora é só me responder com um oi 💬');
        // Partículas saindo da reação.
        Fundo.explodirEm(...centro(c), 14);
      });
      // Coloca na fileira.
      chips.appendChild(c);
    });
    // Só mostra a fileira se houver reações.
    if (chips.children.length) caixa.appendChild(chips);
    // Fileira dos botões finais.
    const acoes = U.el('div', 'acoes entra'); caixa.appendChild(acoes);
    // Botão da carta, só quando a mensagem tem carta.
    if (msg.carta) { const bc = U.el('button', 'btn', 'ler a carta ✉️'); bc.type = 'button'; bc.addEventListener('click', () => abrirCarta(msg.carta)); acoes.appendChild(bc); }
    // Botão de rever a mensagem do começo.
    const again = U.el('button', 'btn leve', 'ver de novo ↺'); again.type = 'button'; again.addEventListener('click', () => location.reload()); acoes.appendChild(again);
  }

  // Roda a mensagem inteira: a arte e o final. Um erro na arte não impede a mensagem de chegar.
  Cenas.rodar = async (msg, cat) => {
    // Roda a arte própria deste link.
    try { await Artes[msg.ab.a](msg.ab.d, { msg, cat }); } catch (e) { console.error('arte ' + msg.ab.a, e); }
    // Mostra o final, que é sempre o último passo.
    await revelar(msg, cat, msg.passos[msg.passos.length - 1]);
  };

  // Publica.
  g.Cenas = Cenas;
// Executa.
})(window);
