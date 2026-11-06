// Uso: node tests/e2e.js http://localhost:8765/ [1,2,3|todas] [pasta-das-fotos]
// Precisa de: npm i playwright-core (fora do projeto, com NODE_PATH apontando para lá) e do Chrome instalado.
// Teste de ponta a ponta: joga cada link com relógio falso seguindo as marcas data-acao que o kit coloca
// nos elementos, confere se chegou ao final sem erro e tira fotos das telas.
const path = require('path'), fs = require('fs');
const { chromium } = require('playwright-core');

// Argumentos da linha de comando.
const BASE = process.argv[2] || 'http://localhost:8765/';
const ALVO = process.argv[3] || 'todas';
const FOTOS = process.argv[4] || '';
// Caminho do Chrome: use a variável CHROME se ele estiver em outro lugar.
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
// Erros que podem ser ignorados nesta rodada (expressão regular opcional).
const IGNORA = process.env.IGNORA ? new RegExp(process.env.IGNORA) : null;

// Roda no navegador: descreve a tela atual e o próximo gesto esperado.
const estado = () => {
  const c = document.querySelector('.cena:not(.saindo)');
  if (!c) return { k: 'none' };
  if (c.classList.contains('final') && c.querySelector('.acoes')) return { k: 'done' };
  const el = [...c.querySelectorAll('[data-acao]')].find((e) => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden');
  if (!el) return { k: 'wait' };
  el.scrollIntoView({ block: 'nearest' });
  const r = el.getBoundingClientRect();
  return { k: el.dataset.acao, x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height, rumo: el.dataset.rumo, ms: +el.dataset.ms || 0, nome: el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0] };
};

// Roda no navegador: procura texto cortado para fora da tela no final da arte.
const estouro = () => {
  const c = document.querySelector('.cena:not(.saindo)');
  if (!c || c.classList.contains('cheia')) return null;
  return c.scrollHeight > c.clientHeight + 4 ? 'rola ' + (c.scrollHeight - c.clientHeight) + 'px' : null;
};

(async () => {
  // Abre o Chrome sem janela.
  const b = await chromium.launch({ executablePath: CHROME, args: ['--autoplay-policy=no-user-gesture-required'] });
  // Descobre os ids de todas as mensagens por uma página de verdade.
  const p0 = await b.newPage(); await p0.goto(BASE + 'index.html');
  let ids = await p0.evaluate(() => MENSAGENS.map((m) => m.id)); await p0.close();
  if (ALVO !== 'todas') { const q = new Set(ALVO.split(',').map(Number)); ids = ids.filter((i) => q.has(i)); }
  if (FOTOS) fs.mkdirSync(FOTOS, { recursive: true });
  let falhas = 0;
  for (const id of ids) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 780 }, deviceScaleFactor: 1 });
    const pg = await ctx.newPage();
    const erros = []; const avisos = [];
    const anota = (t) => { if (!IGNORA || !IGNORA.test(t)) erros.push(t); };
    pg.on('pageerror', (e) => anota('pageerror: ' + e.message));
    pg.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource|ERR_/.test(m.text())) anota('console: ' + m.text()); });
    await pg.route(/fonts\.(googleapis|gstatic)\.com/, (r) => (process.env.FONTES ? r.continue() : r.abort()));
    await pg.clock.install();
    await pg.goto(BASE + 'index.html?m=' + id);
    let feito = false, foto = 0, gestos = 0, parado = 0, ultimo = '';
    // Tira uma foto da tela atual, deixando as transições de CSS assentarem.
    const clique = async (nome) => { if (!FOTOS) return; await pg.waitForTimeout(450); await pg.screenshot({ path: path.join(FOTOS, String(id).padStart(2, '0') + '-' + String(foto++).padStart(2, '0') + (nome ? '-' + nome : '') + '.png') }); };
    await pg.clock.runFor(1200); await clique();
    for (let i = 0; i < 1800 && !feito; i++) {
      await pg.clock.runFor(250);
      const s = await pg.evaluate(estado);
      if (s.k === 'wait' || s.k === 'none') continue;
      if (s.k === 'done') { feito = true; break; }
      // Mesmo elemento pedindo gesto várias vezes seguidas = o gesto não está funcionando.
      const chave = s.k + s.nome + Math.round(s.x) + ',' + Math.round(s.y);
      parado = chave === ultimo ? parado + 1 : 0; ultimo = chave;
      if (parado > 14) { erros.push('gesto sem efeito em ' + s.nome + ' (' + s.k + ')'); break; }
      gestos++;
      const o = await pg.evaluate(estouro); if (o && !avisos.includes(o)) avisos.push(o);
      if (gestos % 3 === 1) await clique();
      if (s.k === 'toque') await pg.mouse.click(s.x, s.y);
      else if (s.k === 'segura') { await pg.mouse.move(s.x, s.y); await pg.mouse.down(); await pg.clock.runFor(s.ms + 400); await pg.mouse.up(); }
      else if (s.k === 'arrasta') { const [dx, dy] = s.rumo.split(',').map(Number); await pg.mouse.move(s.x, s.y); await pg.mouse.down(); await pg.mouse.move(s.x + dx, s.y + dy, { steps: 10 }); await pg.mouse.up(); }
      else if (s.k === 'raspa') {
        // Passa o "dedo" em zigue-zague pela área inteira.
        await pg.mouse.move(s.x, s.y); await pg.mouse.down();
        for (let yy = 0; yy <= 1; yy += .25) { await pg.mouse.move(s.x + s.w / 2 - 4, s.y - s.h / 2 + s.h * yy, { steps: 9 }); await pg.mouse.move(s.x - s.w / 2 + 4, s.y - s.h / 2 + s.h * Math.min(1, yy + .12), { steps: 9 }); }
        await pg.mouse.up();
      }
      await pg.clock.runFor(80);
    }
    await pg.clock.runFor(400); await clique('fim');
    const info = await pg.evaluate(() => ({ tit: (document.querySelector('.cena.final .titulo') || {}).textContent, chips: document.querySelectorAll('.cena.final .chip').length, tema: document.documentElement.dataset.tema, arte: document.documentElement.dataset.arte }));
    if (feito && info.chips !== 3) erros.push('chips=' + info.chips);
    const ok = feito && !erros.length; if (!ok) falhas++;
    console.log((ok ? 'OK   ' : 'FALHA') + ' ' + id + ' ' + info.arte + ' gestos=' + gestos + (avisos.length ? ' [' + avisos.join(', ') + ']' : '') + (erros.length ? ' | ' + erros.join('; ').slice(0, 300) : '') + (feito ? '' : ' | não chegou ao final'));
    await ctx.close();
  }
  await b.close();
  console.log('\nTOTAL ' + ids.length + ' FALHAS ' + falhas);
  process.exit(falhas ? 1 : 0);
})();
