/* ==========================================================
   base.js — "ferramentas" para escrever mensagens de forma curta.
   Carregue ESTE arquivo antes dos mensagens-*.js.

   Cada link tem uma arte própria (js/artes-*.js) e um final:
   M(id, categoria, tema, 'nome no catálogo', abArte('arte', {textos}, {fundo}), [F('título', 'mensagem')], 'carta opcional');

   abArte: o 1º valor é o nome da arte, o 2º traz os textos que ela usa e o 3º
           (opcional) muda as partículas do fundo, ex.: { forma: '✦', qtd: 12 }.
   F:      o final, sempre o último passo da mensagem.
   Texto com *asteriscos* ganha destaque. "\n" quebra linha.
   IDs: 1 a 255, únicos, e NUNCA mude o id de uma mensagem já enviada (os links usam o id).
   ========================================================== */

// Lista global de mensagens (preenchida pelos arquivos mensagens-*.js).
window.MENSAGENS = [];

// Registra uma mensagem na lista e devolve o objeto criado.
window.M = (id, cat, tema, nome, ab, passos, carta) => {
  // Monta o objeto; 'carta' só entra se foi informada.
  const m = { id, cat, tema, nome, ab, passos };
  if (carta) m.carta = carta;
  // Guarda na lista global.
  MENSAGENS.push(m);
  return m;
};

// Abertura: a arte própria do link, com os textos dela e as partículas opcionais.
window.abArte = (a, d, fundo) => ({ t: 'arte', a, d, fundo });

// Final: título e mensagem da última tela.
window.F = (ti, m) => ({ t: 'final', ti, m });
