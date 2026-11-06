/* ==========================================================
   chave.js — gera e lê as "chaves" dos links (?k=XXXXX).
   AVISO HONESTO: isto é OFUSCAÇÃO, não segurança. Serve para o link
   não mostrar um número óbvio (?m=7) e para links com erro de digitação
   serem recusados. Quem ler o código-fonte do site consegue decodificar.
   Formato: 5 caracteres de um alfabeto de 31 símbolos (sem 0 O 1 I L).
   Bits: [salt 9][id mascarado 8][verificação 6] = 23 bits (cabe em 31^5).
   IDs válidos: 1 a 255.
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

// Função que roda na hora para isolar variáveis.
(function (g) {
  // Liga o modo estrito: o navegador avisa de erros bobos.
  'use strict';

  // Alfabeto de 31 símbolos fáceis de ler e ditar (sem 0, O, 1, I, L).
  const ALFA = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  // Tamanho da chave em caracteres.
  const TAM = 5;

  // Calcula 6 bits de verificação a partir do id mascarado e do salt.
  const verif = (idm, salt) => (idm * 31 + salt * 7 + 13) % 64;

  // Caixa onde ficam as ferramentas deste arquivo.
  const Chave = {};

  // Monta a chave de um id a partir de um salt (0 a 511). É a parte comum de gerar e fixa.
  const montar = (id, salt) => {
    // Recusa ids fora da faixa.
    if (!Number.isInteger(id) || id < 1 || id > 255) throw new Error('id inválido: ' + id);
    // Mascara o id com o salt (XOR) para não aparecer em claro.
    const idm = (id ^ (salt & 255) ^ 0xa5) & 255;
    // Junta os três campos num único número de 23 bits.
    let valor = (((salt << 8) | idm) << 6) | verif(idm, salt);
    // Converte para base 31 (5 caracteres).
    let saida = '';
    // Repete 5 vezes: pega o resto da divisão por 31 e usa como posição no alfabeto.
    for (let i = 0; i < TAM; i++) {
      // Guarda o novo valor em saida.
      saida = ALFA.charAt(valor % 31) + saida;
      // Guarda o novo valor em valor.
      valor = Math.floor(valor / 31);
    }
    // Devolve a chave.
    return saida;
  };

  // Gera uma chave sorteada para o id (cada chamada dá uma chave DIFERENTE, todas válidas).
  Chave.gerar = (id) => montar(id, Math.floor(Math.random() * 512));

  // Devolve a chave FIXA do id: sempre a mesma, então o link de cada mensagem nunca muda.
  // O salt vem do próprio id; 197 é ímpar, por isso ids diferentes nunca repetem o salt.
  Chave.fixa = (id) => montar(id, (id * 197 + 53) % 512);

  // Lê uma chave e devolve o id, ou null se for inválida.
  Chave.decodificar = (texto) => {
    // Padroniza: maiúsculas e sem espaços.
    const k = String(texto || '')
      .trim()
      .toUpperCase();
    // Tamanho errado = inválida.
    if (k.length !== TAM) return null;
    // Converte de base 31 para número.
    let valor = 0;
    // Para cada caractere, acha a posição no alfabeto.
    for (let i = 0; i < TAM; i++) {
      // Posição do caractere (ou -1 se não existe).
      const p = ALFA.indexOf(k.charAt(i));
      // Caractere fora do alfabeto = inválida.
      if (p < 0) return null;
      // Acumula na base 31.
      valor = valor * 31 + p;
    }
    // Separa os campos de bits.
    const v = valor & 63;
    // Guarda este valor com o nome "idm".
    const idm = (valor >> 6) & 255;
    // Guarda este valor com o nome "salt".
    const salt = (valor >> 14) & 511;
    // Verificação não bate = chave digitada errada.
    if (v !== verif(idm, salt)) return null;
    // Desfaz a máscara para recuperar o id.
    const id = (idm ^ (salt & 255) ^ 0xa5) & 255;
    // Id zero não existe.
    return id >= 1 ? id : null;
  };

  // Publica no escopo global (window.Chave) e, se existir, também como módulo Node (para testes).
  g.Chave = Chave;
  // Se a condição entre parênteses valer: guarda o novo valor em module.exports.
  if (typeof module !== 'undefined' && module.exports) module.exports = Chave;
  // Executa passando a janela (ou globalThis, no Node).
})(typeof window !== 'undefined' ? window : globalThis);
