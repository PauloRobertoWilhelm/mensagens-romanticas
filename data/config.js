/* ==========================================================
   config.js — as únicas configurações que você precisa mexer.
   ========================================================== */

/* ==========================================================
   COMO LER ESTE ARQUIVO (explicado para quem nunca viu código)

   Aqui ficam os TEXTOS. É o arquivo mais seguro de mexer.
   Cada linha que começa com // explica a linha logo abaixo.

   Regras para não quebrar nada:
     1. Troque só o que está entre aspas 'assim'.
     2. Nunca apague as aspas, as vírgulas nem os colchetes [ ].
     3. Para escrever um apóstrofo dentro do texto, use \' .
     4. Palavra entre *asteriscos* aparece destacada.
     5. Nunca mude o número do link: os links já enviados usam esse número.
   ========================================================== */

// Objeto global de configuração.
window.CONFIG = {
  // Número do WhatsApp que RECEBE as reações (os botões do final). Só dígitos, com país e DDD.
  // Exemplo: '5545999999999'. Se ficar vazio '', os botões só mostram "Agora é só me responder com um oi".
  WHATSAPP: '',
  // Endereço do seu site no GitHub Pages, usado pelo PAINEL para montar os links.
  // Exemplo: 'https://seuusuario.github.io/mensagens-romanticas/' (com a barra no final).
  // Se o painel estiver aberto dentro do próprio site publicado, pode deixar vazio.
  URL_BASE: 'https://paulorobertowilhelm.github.io/mensagens-romanticas/',
  // Quanto da música as frases precisam durar: 0.7 = 70%. Número maior = mensagem mais longa.
  FRASES_MUSICA: 0.7,
  // Volume da música de 0 a 1 (0.85 = 85%).
  VOLUME: 0.85
};
