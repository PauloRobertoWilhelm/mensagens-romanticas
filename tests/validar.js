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
// Valida os dados das mensagens em Node (sem navegador).
const fs = require('fs'),
  vm = require('vm'),
  path = require('path');
// Descobre o caminho completo e guarda com o nome "raiz".
const raiz = path.resolve(process.argv[2] || '.');
// Cria a coleção "ctx".
const ctx = { window: {}, console };
// Guarda o novo valor em ctx.window.
ctx.window = ctx;
// Prepara um ambiente separado para os dados.
vm.createContext(ctx);
// Carrega os dados na mesma ordem do index.html.
for (const f of [
  'data/config.js',
  'data/categorias.js',
  'data/base.js',
  'data/mensagens-paquera.js',
  'data/mensagens-namoro.js',
  'data/mensagens-amigos.js',
  'data/mensagens-datas.js',
  'data/capitulos-paquera.js',
  'data/capitulos-namoro.js',
  'data/capitulos-amigos.js',
  'data/capitulos-datas.js',
  'data/cenarios.js',
  'data/frases-paquera.js',
  'data/frases-namoro.js',
  'data/frases-amigos.js',
  'data/frases-datas.js'
])
  // Roda o arquivo de dados.
  vm.runInContext(fs.readFileSync(path.join(raiz, f), 'utf8'), ctx, { filename: f });
// Anotações que o código vai usando enquanto funciona: MS, CATS.
const MS = ctx.MENSAGENS,
  CATS = ctx.CATEGORIAS;
// Lê um arquivo do projeto e guarda com o nome "css".
const css = fs.readFileSync(path.join(raiz, 'css/temas.css'), 'utf8');
// Lê um arquivo do projeto e guarda com o nome "fundo".
const fundo = fs.readFileSync(path.join(raiz, 'js/fundo.js'), 'utf8');
// Junta os arquivos de artes para conferir se cada arte existe e tem estilo próprio.
const cats = ['paquera', 'namoro', 'amigos', 'datas'];
// Arruma o texto ou a lista e guarda com o nome "artesJs".
const artesJs = cats.map((c) => fs.readFileSync(path.join(raiz, 'js/artes-' + c + '.js'), 'utf8')).join('\n');
// Arruma o texto ou a lista e guarda com o nome "artesCss".
const artesCss = cats.map((c) => fs.readFileSync(path.join(raiz, 'css/artes-' + c + '.css'), 'utf8')).join('\n');
// Cria a lista "erros".
let erros = [];
// Cria a ajuda "err", para usar mais adiante.
const err = (m) => erros.push(m);
// Guarda este valor com o nome "ids".
const ids = new Set();
// Guarda este valor com o nome "artes".
const artes = new Map();
// Cria a coleção "contCat".
const contCat = {};
// Pega todos os textos de um valor (string, lista ou objeto).
const textos = (v) =>
  typeof v === 'string'
    ? [v]
    : Array.isArray(v)
      ? v.flatMap(textos)
      : v && typeof v === 'object'
        ? Object.values(v).flatMap(textos)
        : [];
// Frases que nunca podem aparecer: convite para sair ou encontro.
const CONVITE = /sair comigo|vamos sair|aceita sair|vem me ver|me encontra|quer me encontrar|marcar um encontro/i;
// Guarda este valor com o nome "vistos".
const vistos = new Map();
// Repete para cada item da lista.
for (const m of MS) {
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (ids.has(m.id)) err('id duplicado ' + m.id);
  // Usa a função add.
  ids.add(m.id);
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (!(m.id >= 1 && m.id <= 255)) err('id fora da faixa ' + m.id);
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (!CATS[m.cat]) err(m.id + ' categoria inválida ' + m.cat);
  // Guarda o novo valor em contCat[m.cat].
  contCat[m.cat] = (contCat[m.cat] || 0) + 1;
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (!css.includes('data-tema="' + m.tema + '"')) err(m.id + ' tema sem CSS ' + m.tema);
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (!new RegExp('\\b' + m.tema + ':\\s*\\{').test(fundo)) err(m.id + ' tema sem partículas ' + m.tema);
  // Toda mensagem: 1 abertura (a arte) + exatamente 1 final como último passo.
  if (m.ab.t !== 'arte') err(m.id + ' abertura não é arte');
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (!m.ab.a) err(m.id + ' sem nome de arte');
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (artes.has(m.ab.a)) err('arte repetida: ' + m.ab.a + ' em ' + m.id + ' e ' + artes.get(m.ab.a));
  // Arruma o texto ou a lista
  artes.set(m.ab.a, m.id);
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (!new RegExp('A\\.' + m.ab.a + '\\s*=\\s*async').test(artesJs)) err(m.id + ' arte sem código: ' + m.ab.a);
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (!artesCss.includes('.a-' + m.ab.a)) err(m.id + ' arte sem estilo: ' + m.ab.a);
  // Guarda este valor com o nome "p".
  const p = m.passos;
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (!p.length || p[p.length - 1].t !== 'final') err(m.id + ' último passo não é final');
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (p.filter((x) => x.t === 'final').length !== 1) err(m.id + ' deve ter exatamente 1 final');
  // Guarda este valor com o nome "fim".
  const fim = p[p.length - 1];
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (!fim.ti || !fim.m) err(m.id + ' final sem título ou mensagem');
  // Nenhum texto longo se repete entre mensagens e nenhuma termina em convite.
  for (const t of textos(m.ab.d).concat(textos(fim), m.carta ? [m.carta] : [])) {
    // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
    if (CONVITE.test(t)) err(m.id + ' pede para sair/encontrar: ' + t);
    // Se a condição entre parênteses valer, faz o que está nas chaves.
    if (t.length >= 24) {
      // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
      if (vistos.has(t) && vistos.get(t) !== m.id) err('texto repetido em ' + m.id + ' e ' + vistos.get(t) + ': ' + t);
      // Arruma o texto ou a lista
      vistos.set(t, m.id);
    }
  }
}
// Repete para cada item da lista.
// Tipos de capítulo que existem.
const TIPOS_CAP = ['quiz', 'grade', 'segura', 'pontos', 'bolhas', 'medidor', 'memoria', 'ritmo'];
// Combinações de capítulos já usadas em cada categoria.
const combinacoes = new Set();
// Confere os capítulos de cada mensagem.
for (const m of MS) {
  // Pega os capítulos deste link.
  const caps = ctx.CAP[m.id] || [];
  // Todo link tem exatamente 2 capítulos.
  if (caps.length !== 2) err(m.id + ' deve ter 2 capítulos, tem ' + caps.length);
  // Cada capítulo precisa ser de um tipo que existe.
  for (const c of caps) if (!TIPOS_CAP.includes(c.t)) err(m.id + ' capítulo inválido ' + c.t);
  // Monta o nome da combinação desta categoria.
  const chave = m.cat + ':' + caps.map((c) => c.t).join('+');
  // Dentro da categoria, a mesma sequência de capítulos não se repete.
  if (combinacoes.has(chave)) err('capítulos repetidos em ' + m.id + ': ' + chave);
  // Anota a combinação.
  combinacoes.add(chave);
  // Confere os textos dos capítulos.
  for (const t of textos(caps)) {
    // Nenhum texto pode pedir para sair ou se encontrar.
    if (CONVITE.test(t)) err(m.id + ' pede para sair/encontrar: ' + t);
    // Texto longo não pode aparecer em dois links.
    if (t.length >= 24 && vistos.has(t) && vistos.get(t) !== m.id)
      // Usa a ajuda "err" (ela está definida neste arquivo).
      err('texto repetido em ' + m.id + ' e ' + vistos.get(t) + ': ' + t);
    // Anota o texto.
    if (t.length >= 24) vistos.set(t, m.id);
  }
}
// Lê o arquivo dos fundos animados.
const cenariosJs = fs.readFileSync(path.join(raiz, 'js/cenarios.js'), 'utf8');
// Fundos já usados em cada categoria.
const fundosUsados = new Set();
// Confere o fundo animado de cada mensagem.
for (const m of MS) {
  // Pega o nome do fundo deste link.
  const nome = ctx.CENARIO[m.id];
  // Todo link tem um fundo que existe.
  if (!nome || !new RegExp('\\b' + nome + ': `').test(cenariosJs)) err(m.id + ' fundo inválido: ' + nome);
  // Dentro da categoria, cada fundo aparece uma vez só.
  if (fundosUsados.has(m.cat + nome)) err('fundo repetido em ' + m.id + ': ' + nome);
  // Anota o fundo.
  fundosUsados.add(m.cat + nome);
}
// Menor e maior duração do filme de frases, para mostrar no fim.
const duracoes = [];
// Confere o filme de frases de cada mensagem.
for (const m of MS) {
  // Calcula o tempo que as frases precisam durar.
  const alvo = CATS[m.cat].duracao * 1000 * ctx.CONFIG.FRASES_MUSICA;
  // Pega as frases deste link.
  const frases = ctx.escolheFrases(m.id, alvo);
  // Soma o tempo delas.
  const total = frases.reduce((s, f) => s + ctx.tempoFrase(f), 0);
  // As frases precisam durar a parte pedida da música.
  if (total < alvo)
    // Usa a ajuda "err" (ela está definida neste arquivo).
    err(m.id + ' frases curtas demais: ' + Math.round(total / 1000) + 's de ' + Math.round(alvo / 1000) + 's');
  // Nenhuma frase pode repetir dentro do mesmo link.
  if (new Set(frases).size !== frases.length) err(m.id + ' tem frase repetida');
  // Nenhuma frase pode pedir para sair ou se encontrar.
  for (const f of frases) if (CONVITE.test(f)) err(m.id + ' pede para sair/encontrar: ' + f);
  // Anota a duração.
  duracoes.push(m.cat + ' ' + frases.length + ' frases ' + Math.round(total / 1000) + 's');
}
// Mostra um exemplo de cada categoria.
console.log('filme de frases:', duracoes[0], '|', duracoes[20], '|', duracoes[40], '|', duracoes[60]);
// Cada categoria precisa ter 20 mensagens.
for (const c of Object.keys(CATS))
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (contCat[c] !== 20) err('categoria ' + c + ' tem ' + contCat[c] + ' (esperado 20)');
// Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
if (MS.length !== 80) err('total ' + MS.length);
// Chaves: round-trip.
const Chave = require(path.join(raiz, 'js/chave.js'));
// Repete várias vezes, contando as voltas.
for (let i = 1; i <= 255; i++)
  // Repete várias vezes, contando as voltas.
  for (let k = 0; k < 20; k++) {
    // Gera uma chave para o link e guarda com o nome "c".
    const c = Chave.gerar(i);
    // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
    if (Chave.decodificar(c) !== i) err('chave falhou id ' + i + ' ' + c);
    // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
    if (Chave.decodificar(c.toLowerCase()) !== i) err('minúscula falhou');
  }
// Guarda este valor com o nome "inv".
let inv = 0;
// Repete várias vezes, contando as voltas.
for (let i = 0; i < 5000; i++) {
  // Guarda este valor com o nome "s".
  let s = '';
  // Repete várias vezes, contando as voltas.
  for (let j = 0; j < 5; j++) s += '23456789ABCDEFGHJKMNPQRSTUVWXYZ'[Math.floor(Math.random() * 31)];
  // Descobre o número do link a partir da chave e guarda com o nome "r".
  const r = Chave.decodificar(s);
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (r !== null && !(r >= 1 && r <= 255)) err('decodificação fora de faixa');
  // Se a condição entre parênteses valer: soma 1 em inv.
  if (r !== null) inv++;
}
// Chaves fixas: mesma chave sempre, abre o id certo e não repete entre ids.
const fixas = new Set();
// Repete várias vezes, contando as voltas.
for (let i = 1; i <= 255; i++) {
  // Pega a chave fixa deste link e guarda com o nome "c".
  const c = Chave.fixa(i);
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (c !== Chave.fixa(i)) err('chave fixa mudou id ' + i);
  // Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
  if (Chave.decodificar(c) !== i) err('chave fixa falhou id ' + i + ' ' + c);
  // Usa a função add.
  fixas.add(c);
}
// Se a condição entre parênteses valer: usa a ajuda "err" (ela está definida neste arquivo).
if (fixas.size !== 255) err('chaves fixas repetidas: ' + fixas.size + ' de 255');
// Escreve o resultado na tela do terminal.
console.log('mensagens:', MS.length, contCat);
// Escreve o resultado na tela do terminal.
console.log('chaves aleatórias aceitas por acaso:', inv, 'de 5000 (esperado ~ pequeno)');
// Escreve o resultado na tela do terminal.
console.log('artes únicas:', artes.size);
// Escreve o resultado na tela do terminal.
console.log(erros.length ? 'ERROS:\n' + erros.join('\n') : 'OK sem erros');
