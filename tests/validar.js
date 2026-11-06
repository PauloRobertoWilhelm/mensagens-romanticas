// Valida os dados das mensagens em Node (sem navegador).
const fs = require('fs'), vm = require('vm'), path = require('path');
const raiz = path.resolve(process.argv[2] || '.');
const ctx = { window: {}, console };
ctx.window = ctx; vm.createContext(ctx);
// Carrega os dados na mesma ordem do index.html.
for (const f of ['data/config.js','data/categorias.js','data/base.js','data/mensagens-paquera.js','data/mensagens-namoro.js','data/mensagens-amigos.js','data/mensagens-datas.js'])
  vm.runInContext(fs.readFileSync(path.join(raiz,f),'utf8'), ctx, {filename:f});
const MS = ctx.MENSAGENS, CATS = ctx.CATEGORIAS;
const css = fs.readFileSync(path.join(raiz,'css/temas.css'),'utf8');
const fundo = fs.readFileSync(path.join(raiz,'js/fundo.js'),'utf8');
// Junta os arquivos de artes para conferir se cada arte existe e tem estilo próprio.
const cats = ['paquera','namoro','amigos','datas'];
const artesJs = cats.map(c => fs.readFileSync(path.join(raiz,'js/artes-'+c+'.js'),'utf8')).join('\n');
const artesCss = cats.map(c => fs.readFileSync(path.join(raiz,'css/artes-'+c+'.css'),'utf8')).join('\n');
let erros = [];
const err = (m) => erros.push(m);
const ids = new Set(); const artes = new Map(); const contCat = {};
// Pega todos os textos de um valor (string, lista ou objeto).
const textos = (v) => typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(textos) : v && typeof v === 'object' ? Object.values(v).flatMap(textos) : [];
// Frases que nunca podem aparecer: convite para sair ou encontro.
const CONVITE = /sair comigo|vamos sair|aceita sair|vem me ver|me encontra|quer me encontrar|marcar um encontro/i;
const vistos = new Map();
for (const m of MS) {
  if (ids.has(m.id)) err('id duplicado '+m.id); ids.add(m.id);
  if (!(m.id>=1&&m.id<=255)) err('id fora da faixa '+m.id);
  if (!CATS[m.cat]) err(m.id+' categoria inválida '+m.cat);
  contCat[m.cat]=(contCat[m.cat]||0)+1;
  if (!css.includes('data-tema="'+m.tema+'"')) err(m.id+' tema sem CSS '+m.tema);
  if (!new RegExp('\\b'+m.tema+':\\s*\\{').test(fundo)) err(m.id+' tema sem partículas '+m.tema);
  // Toda mensagem: 1 abertura (a arte) + exatamente 1 final como último passo.
  if (m.ab.t!=='arte') err(m.id+' abertura não é arte');
  if (!m.ab.a) err(m.id+' sem nome de arte');
  if (artes.has(m.ab.a)) err('arte repetida: '+m.ab.a+' em '+m.id+' e '+artes.get(m.ab.a)); artes.set(m.ab.a,m.id);
  if (!new RegExp('A\\.'+m.ab.a+'\\s*=\\s*async').test(artesJs)) err(m.id+' arte sem código: '+m.ab.a);
  if (!artesCss.includes('.a-'+m.ab.a)) err(m.id+' arte sem estilo: '+m.ab.a);
  const p = m.passos;
  if (!p.length || p[p.length-1].t!=='final') err(m.id+' último passo não é final');
  if (p.filter(x=>x.t==='final').length!==1) err(m.id+' deve ter exatamente 1 final');
  const fim = p[p.length-1];
  if (!fim.ti||!fim.m) err(m.id+' final sem título ou mensagem');
  // Nenhum texto longo se repete entre mensagens e nenhuma termina em convite.
  for (const t of textos(m.ab.d).concat(textos(fim), m.carta?[m.carta]:[])) {
    if (CONVITE.test(t)) err(m.id+' pede para sair/encontrar: '+t);
    if (t.length>=24) { if (vistos.has(t)&&vistos.get(t)!==m.id) err('texto repetido em '+m.id+' e '+vistos.get(t)+': '+t); vistos.set(t,m.id); }
  }
}
for (const c of Object.keys(CATS)) if (contCat[c]!==20) err('categoria '+c+' tem '+contCat[c]+' (esperado 20)');
if (MS.length!==80) err('total '+MS.length);
// Chaves: round-trip.
const Chave = require(path.join(raiz,'js/chave.js'));
for (let i=1;i<=255;i++) for (let k=0;k<20;k++) { const c=Chave.gerar(i); if (Chave.decodificar(c)!==i) err('chave falhou id '+i+' '+c); if (Chave.decodificar(c.toLowerCase())!==i) err('minúscula falhou'); }
let inv=0; for (let i=0;i<5000;i++){ let s=''; for(let j=0;j<5;j++) s+= '23456789ABCDEFGHJKMNPQRSTUVWXYZ'[Math.floor(Math.random()*31)]; const r=Chave.decodificar(s); if(r!==null && !(r>=1&&r<=255)) err('decodificação fora de faixa'); if (r!==null) inv++; }
// Chaves fixas: mesma chave sempre, abre o id certo e não repete entre ids.
const fixas = new Set(); for (let i=1;i<=255;i++) { const c=Chave.fixa(i); if (c!==Chave.fixa(i)) err('chave fixa mudou id '+i); if (Chave.decodificar(c)!==i) err('chave fixa falhou id '+i+' '+c); fixas.add(c); }
if (fixas.size!==255) err('chaves fixas repetidas: '+fixas.size+' de 255');
console.log('mensagens:',MS.length,contCat);
console.log('chaves aleatórias aceitas por acaso:',inv,'de 5000 (esperado ~ pequeno)');
console.log('artes únicas:',artes.size);
console.log(erros.length? 'ERROS:\n'+erros.join('\n') : 'OK sem erros');
