// Valida os dados das mensagens em Node (sem navegador).
const fs = require('fs'), vm = require('vm'), path = require('path');
const raiz = path.resolve(process.argv[2] || '.');
const ctx = { window: {}, console };
ctx.window = ctx; vm.createContext(ctx);
for (const f of ['data/config.js','data/categorias.js','data/base.js','data/mensagens-paquera.js','data/mensagens-namoro.js','data/mensagens-amigos.js','data/mensagens-datas.js'])
  vm.runInContext(fs.readFileSync(path.join(raiz,f),'utf8'), ctx, {filename:f});
const MS = ctx.MENSAGENS, CATS = ctx.CATEGORIAS;
const css = fs.readFileSync(path.join(raiz,'css/temas.css'),'utf8');
const fundo = fs.readFileSync(path.join(raiz,'js/fundo.js'),'utf8');
let erros = [];
const err = (m) => erros.push(m);
const ids = new Set(); const chaves = new Map(); const contCat = {};
const ABS = ['terminal','coracao','envelope','presente'];
const TIPOS = ['historia','constelacao','scanner','cartas','contagem','motivos','escolha','final'];
for (const m of MS) {
  if (ids.has(m.id)) err('id duplicado '+m.id); ids.add(m.id);
  if (!(m.id>=1&&m.id<=255)) err('id fora da faixa '+m.id);
  if (!CATS[m.cat]) err(m.id+' categoria inválida '+m.cat);
  contCat[m.cat]=(contCat[m.cat]||0)+1;
  if (!css.includes('data-tema="'+m.tema+'"')) err(m.id+' tema sem CSS '+m.tema);
  if (!new RegExp('\\b'+m.tema+':\\s*\\{').test(fundo)) err(m.id+' tema sem partículas '+m.tema);
  if (!ABS.includes(m.ab.t)) err(m.id+' abertura inválida');
  if (!m.ab.ti) err(m.id+' abertura sem título');
  if (m.ab.t==='terminal' && !(m.ab.l&&m.ab.l.length)) err(m.id+' terminal sem linhas');
  const p = m.passos;
  if (!p.length || p[p.length-1].t!=='final') err(m.id+' último passo não é final');
  if (p.filter(x=>x.t==='final').length!==1) err(m.id+' deve ter exatamente 1 final');
  for (const s of p) {
    if (!TIPOS.includes(s.t)) err(m.id+' tipo inválido '+s.t);
    if (s.t==='historia' && !(s.f&&s.f.length)) err(m.id+' historia vazia');
    if (s.t==='constelacao' && (!['coracao','estrela','infinito'].includes(s.f)||!s.m)) err(m.id+' constelacao inválida');
    if (s.t==='scanner' && (!(s.i&&s.i.length)||!s.v)) err(m.id+' scanner inválido');
    if (s.t==='cartas' && !(s.c&&s.c.length>=2&&s.c.every(x=>x.length===2))) err(m.id+' cartas inválidas');
    if (s.t==='contagem' && !(s.n&&s.n.length)) err(m.id+' contagem inválida');
    if (s.t==='motivos' && !(s.i&&s.i.length)) err(m.id+' motivos inválidos');
    if (s.t==='escolha' && !(s.q&&s.o&&s.o.length>=2&&s.o.every(x=>x.length===2))) err(m.id+' escolha inválida');
    if (s.t==='final' && (!['segurar','toques','deslizar'].includes(s.tp)||!s.ti||!s.m)) err(m.id+' final inválido');
  }
  const sig = [m.tema,m.ab.t,p.filter(x=>x.t!=='final').map(x=>x.t+(x.f&&x.t==='constelacao'?':'+x.f:'')).join('+'),p[p.length-1].tp].join('|');
  if (chaves.has(sig)) err('combinação repetida: '+m.id+' e '+chaves.get(sig)); chaves.set(sig,m.id);
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
console.log('combinações únicas:',chaves.size);
console.log(erros.length? 'ERROS:\n'+erros.join('\n') : 'OK sem erros');
