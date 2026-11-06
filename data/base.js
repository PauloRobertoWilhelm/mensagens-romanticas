/* ==========================================================
   base.js — "ferramentas" para escrever mensagens de forma curta.
   Carregue ESTE arquivo antes dos mensagens-*.js.

   Para criar uma mensagem nova, copie uma existente e troque os textos:
   M(id, categoria, tema, 'nome no catálogo', ABERTURA, [CENAS..., FINAL], 'carta opcional');

   ABERTURAS: abTerminal(titulo, [linhas]) | abCoracao(titulo, dica)
              abEnvelope(titulo, emoji)    | abPresente(titulo, dica)
   CENAS:     H(titulo, [frases])                   história (frase por frase)
              C('coracao'|'estrela'|'infinito', msg) constelação
              S(titulo, [[rótulo, %]], veredito)     scanner (barras)
              K(titulo, [[frente, verso]])           cartas que viram
              N(titulo, [[número, rótulo]], fecho)   contagem
              L(titulo, [itens])                     lista de motivos
              E(pergunta, [[opção, resposta]])       escolha
   FINAL:     F('segurar'|'toques'|'deslizar', titulo, mensagem, {n, dica, dica2, pre})
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

// Aberturas.
window.abTerminal = (ti, l) => ({ t: 'terminal', ti, l });
window.abCoracao = (ti, sub) => ({ t: 'coracao', ti, sub });
window.abEnvelope = (ti, selo) => ({ t: 'envelope', ti, selo });
window.abPresente = (ti, sub) => ({ t: 'presente', ti, sub });

// Cenas.
window.H = (ti, f) => ({ t: 'historia', ti, f });
window.C = (f, m) => ({ t: 'constelacao', f, m });
window.S = (ti, i, v) => ({ t: 'scanner', ti, i, v });
window.K = (ti, c) => ({ t: 'cartas', ti, c });
window.N = (ti, n, fim) => ({ t: 'contagem', ti, n, fim });
window.L = (ti, i) => ({ t: 'motivos', ti, i });
window.E = (q, o) => ({ t: 'escolha', q, o });

// Final: tp = tipo do jogo; extra pode ter n (toques), dica, dica2 (texto do deslizar), pre (rótulo).
window.F = (tp, ti, m, extra) => Object.assign({ t: 'final', tp, ti, m }, extra || {});
