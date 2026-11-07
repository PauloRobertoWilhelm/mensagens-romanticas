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

// Lista global de mensagens (preenchida pelos arquivos mensagens-*.js).
window.MENSAGENS = [];

// Registra uma mensagem na lista e devolve o objeto criado.
window.M = (id, cat, tema, nome, ab, passos, carta) => {
  // Monta o objeto; 'carta' só entra se foi informada.
  const m = { id, cat, tema, nome, ab, passos };
  // Se a condição entre parênteses valer: guarda o novo valor em m.carta.
  if (carta) m.carta = carta;
  // Guarda na lista global.
  MENSAGENS.push(m);
  // Termina aqui e entrega o resultado.
  return m;
};

// Abertura: a arte própria do link, com os textos dela e as partículas opcionais.
window.abArte = (a, d, fundo) => ({ t: 'arte', a, d, fundo });

// Final: título e mensagem da última tela.
window.F = (ti, m) => ({ t: 'final', ti, m });

// Lista dos capítulos extras de cada link (preenchida pelos arquivos capitulos-*.js).
window.CAP = {};

// Guarda os capítulos extras do link de número 'id'.
window.X = (id, lista) => {
  // Coloca a lista na coleção.
  CAP[id] = lista;
};

// Capítulo de perguntas: cada opção tem uma resposta própria.
window.quiz = (ti, q) => ({ t: 'quiz', ti, q });

// Capítulo de quadrinhos: cada quadrinho tocado mostra uma frase.
window.grade = (ti, i, fim) => ({ t: 'grade', ti, i, fim });

// Capítulo de segurar: a bola de luz cresce enquanto o dedo fica encostado.
window.segura = (ti, abre, i, fim) => ({ t: 'segura', ti, abre, i, fim });

// Capítulo de ligar pontos: toque nos números para formar um desenho.
window.pontos = (ti, forma, abre, fim) => ({ t: 'pontos', ti, forma, abre, fim });

// Capítulo de bolhas: estoure as palavras que flutuam.
window.bolhas = (ti, i, fim) => ({ t: 'bolhas', ti, i, fim });

// Capítulo de medidor: arraste até o fim e veja a frase mudar.
window.medidor = (ti, i, fim) => ({ t: 'medidor', ti, i, fim });

// Capítulo de memória: encontre os pares de cartas.
window.memoria = (ti, i, fim) => ({ t: 'memoria', ti, i, fim });

// Capítulo de batidas: cada toque faz o coração crescer.
window.ritmo = (ti, i, fim) => ({ t: 'ritmo', ti, i, fim });

// Lista de qual fundo animado cada link usa (preenchida por data/cenarios.js).
window.CENARIO = {};

// Guarda o fundo animado do link de número 'id'.
window.Z = (id, nome) => {
  // Coloca o nome do fundo na lista.
  CENARIO[id] = nome;
};

// Listas de frases do filme de frases (preenchidas pelos arquivos frases-*.js).
window.FRASES = [];

// Guarda uma lista de frases e os links que usam essa lista.
window.Y = (ids, lista) => {
  // Coloca a lista na coleção.
  FRASES.push({ ids, lista });
};

// Calcula quantos milésimos de segundo uma frase fica na tela.
window.tempoFrase = (f) => {
  // Conta as palavras da frase.
  const palavras = f.split(/\s+/).length;
  // Tempo de aparecer, tempo de ler e tempo de sumir. Número maior = frases mais demoradas.
  return palavras * 170 + 3000 + f.length * 26;
};

// Escolhe as frases do link 'id' até somar 'alvo' milésimos de segundo.
window.escolheFrases = (id, alvo) => {
  // Acha a lista que este link usa.
  const g = FRASES.find((x) => x.ids.includes(id));
  // Sem lista, sem frases.
  if (!g) return [];
  // Cada link começa em um ponto e pula de tantos em tantos, para os links não ficarem iguais.
  let i = g.ids.indexOf(id);
  // Frases já escolhidas, para nunca repetir no mesmo link.
  const usadas = new Set();
  // Resultado.
  const fora = [];
  // Tempo somado até agora.
  let total = 0;
  // Escolhe até completar o tempo ou acabar a lista.
  while (total < alvo && usadas.size < g.lista.length) {
    // Calcula a posição dentro da lista.
    let j = i % g.lista.length;
    // Se essa frase já foi usada, anda para a próxima livre.
    while (usadas.has(j)) j = (j + 1) % g.lista.length;
    // Anota a frase como usada.
    usadas.add(j);
    // Coloca a frase no resultado.
    fora.push(g.lista[j]);
    // Soma o tempo dela.
    total += tempoFrase(g.lista[j]);
    // Pula para o próximo ponto.
    i += g.ids.length;
  }
  // Entrega as frases escolhidas.
  return fora;
};

// Lista de como as frases aparecem em cada link (preenchida por data/formatos.js).
window.CFILME = {};

// Guarda o formato e a etiqueta das frases do link de número 'id'.
window.W = (id, formato, rotulo) => {
  // Coloca na lista.
  CFILME[id] = { formato, rotulo };
};

// Lista das entradas de cada link (preenchida por data/aberturas.js).
window.ABERTURAS = {};

// Guarda a entrada do link de número 'id': o tipo e os textos.
window.P = (id, tipo, textos) => {
  // Coloca na lista.
  ABERTURAS[id] = Object.assign({ tipo }, textos);
};
