// Uso: node tests/e2e.js http://localhost:8765/ [1,2,3|todas] [pasta-das-fotos]
// Precisa de: npm i playwright-core (fora do projeto, com NODE_PATH apontando para lá) e do Chrome instalado.
// Teste de ponta a ponta: joga cada link com relógio falso seguindo as marcas data-acao que o kit coloca
// nos elementos, confere se chegou ao final sem erro e tira fotos das telas.
const path = require('path'),
  fs = require('fs');
// Carrega uma ferramenta e guarda com o nome "estes valores".
const { chromium } = require('playwright-core');

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

// Argumentos da linha de comando.
const BASE = process.argv[2] || 'http://localhost:8765/';
// Guarda este valor com o nome "ALVO".
const ALVO = process.argv[3] || 'todas';
// Guarda este valor com o nome "FOTOS".
const FOTOS = process.argv[4] || '';
// Caminho do Chrome: use a variável CHROME se ele estiver em outro lugar.
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
// Erros que podem ser ignorados nesta rodada (expressão regular opcional).
const IGNORA = process.env.IGNORA ? new RegExp(process.env.IGNORA) : null;

// Roda no navegador: descreve a tela atual e o próximo gesto esperado.
const estado = () => {
  // Procura uma peça na página e guarda com o nome "c".
  const c = document.querySelector('.cena:not(.saindo)');
  // Se a condição entre parênteses valer, para por aqui.
  if (!c) return { k: 'none' };
  // Se a condição entre parênteses valer, para por aqui.
  if (c.classList.contains('final') && c.querySelector('.acoes')) return { k: 'done' };
  // Arruma o texto ou a lista e guarda com o nome "el".
  const el = [...c.querySelectorAll('[data-acao]')].find(
    (e) => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden'
  );
  // Se a condição entre parênteses valer, para por aqui.
  if (!el) return { k: 'wait' };
  // Usa a função scrollIntoView.
  el.scrollIntoView({ block: 'nearest' });
  // Mede o tamanho e o lugar da peça e guarda com o nome "r".
  const r = el.getBoundingClientRect();
  // Termina aqui e entrega o resultado.
  return {
    k: el.dataset.acao,
    x: r.left + r.width / 2,
    y: r.top + r.height / 2,
    w: r.width,
    h: r.height,
    // Direção do gesto: quanto anda para o lado e para baixo.
    rumo: el.dataset.rumo,
    ms: +el.dataset.ms || 0,
    // Nome que aparece na peça.
    nome: el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0]
  };
};

// Roda no navegador: procura texto cortado para fora da tela no final da arte.
const estouro = () => {
  // Procura uma peça na página e guarda com o nome "c".
  const c = document.querySelector('.cena:not(.saindo)');
  // Se a condição entre parênteses valer, para por aqui.
  if (!c || c.classList.contains('cheia')) return null;
  // Termina aqui e entrega o resultado.
  return c.scrollHeight > c.clientHeight + 4 ? 'rola ' + (c.scrollHeight - c.clientHeight) + 'px' : null;
};

// Roda tudo isto na hora, sem misturar com o resto do site.
(async () => {
  // Abre o Chrome sem janela.
  const b = await chromium.launch({ executablePath: CHROME, args: ['--autoplay-policy=no-user-gesture-required'] });
  // Descobre os ids de todas as mensagens por uma página de verdade.
  const p0 = await b.newPage();
  // Comanda o navegador do teste (goto).
  await p0.goto(BASE + 'index.html');
  // Comanda o navegador do teste (evaluate) e guarda com o nome "ids".
  let ids = await p0.evaluate(() => MENSAGENS.map((m) => m.id));
  // Comanda o navegador do teste (close).
  await p0.close();
  // Se a condição entre parênteses valer, faz o que está nas chaves.
  if (ALVO !== 'todas') {
    // Guarda este valor com o nome "q".
    const q = new Set(ALVO.split(',').map(Number));
    // Guarda o novo valor em ids.
    ids = ids.filter((i) => q.has(i));
  }
  // Se a condição entre parênteses valer: cria uma pasta
  if (FOTOS) fs.mkdirSync(FOTOS, { recursive: true });
  // Guarda este valor com o nome "falhas".
  let falhas = 0;
  // Repete para cada item da lista.
  for (const id of ids) {
    // Comanda o navegador do teste (newContext) e guarda com o nome "ctx".
    const ctx = await b.newContext({ viewport: { width: 390, height: 780 }, deviceScaleFactor: 1 });
    // Comanda o navegador do teste (newPage) e guarda com o nome "pg".
    const pg = await ctx.newPage();
    // Cria a lista "erros".
    const erros = [];
    // Cria a lista "avisos".
    const avisos = [];
    // Cria a ajuda "anota", para usar mais adiante.
    const anota = (t) => {
      // Se a condição entre parênteses valer: coloca mais um item na lista.
      if (!IGNORA || !IGNORA.test(t)) erros.push(t);
    };
    // Comanda o navegador do teste (on).
    pg.on('pageerror', (e) => anota('pageerror: ' + e.message));
    // Comanda o navegador do teste (on).
    pg.on('console', (m) => {
      // Se a condição entre parênteses valer: usa a ajuda "anota" (ela está definida neste arquivo).
      if (m.type() === 'error' && !/Failed to load resource|ERR_/.test(m.text())) anota('console: ' + m.text());
    });
    // Comanda o navegador do teste (route).
    await pg.route(/fonts\.(googleapis|gstatic)\.com/, (r) => (process.env.FONTES ? r.continue() : r.abort()));
    // Comanda o navegador do teste (install).
    // Desliga o fundo animado neste teste, para ele rodar rápido.
    await pg.addInitScript(() => {
      // Avisa o site para não ligar o fundo animado.
      window.__semCenario = true;
    });
    // Instala o relógio falso.
    await pg.clock.install();
    // Comanda o navegador do teste (goto).
    await pg.goto(BASE + 'index.html?m=' + id);
    // Anotações que o código vai usando enquanto funciona: feito, foto, gestos, parado, ultimo.
    let feito = false,
      foto = 0,
      gestos = 0,
      parado = 0,
      ultimo = '';
    // Tira uma foto da tela atual, deixando as transições de CSS assentarem.
    const clique = async (nome) => {
      // Se a condição entre parênteses valer, para por aqui.
      if (!FOTOS) return;
      // Comanda o navegador do teste (waitForTimeout).
      await pg.waitForTimeout(450);
      // Comanda o navegador do teste (screenshot).
      await pg.screenshot({
        path: path.join(
          FOTOS,
          String(id).padStart(2, '0') + '-' + String(foto++).padStart(2, '0') + (nome ? '-' + nome : '') + '.png'
        )
      });
    };
    // Comanda o navegador do teste (runFor).
    await pg.clock.runFor(1200);
    // Usa a ajuda "clique" (ela está definida neste arquivo).
    await clique();
    // Repete várias vezes, contando as voltas.
    for (let i = 0; i < 6000 && !feito; i++) {
      // Comanda o navegador do teste (runFor).
      await pg.clock.runFor(250);
      // Comanda o navegador do teste (evaluate) e guarda com o nome "s".
      const s = await pg.evaluate(estado);
      // Se a condição valer, pula para a próxima volta.
      // Sem gesto para fazer: adianta o relógio mais depressa e olha de novo.
      if (s.k === 'wait' || s.k === 'none') {
        // Adianta quase um segundo.
        await pg.clock.runFor(750);
        // Volta para o começo da repetição.
        continue;
      }
      // Se a condição entre parênteses valer, faz o que está nas chaves.
      if (s.k === 'done') {
        // Guarda o novo valor em feito.
        feito = true;
        // Sai da repetição.
        break;
      }
      // Mesmo elemento pedindo gesto várias vezes seguidas = o gesto não está funcionando.
      const chave = s.k + s.nome + Math.round(s.x) + ',' + Math.round(s.y);
      // Guarda o novo valor em parado.
      parado = chave === ultimo ? parado + 1 : 0;
      // Anota o horário deste quadro, para medir o tempo.
      ultimo = chave;
      // Se a condição entre parênteses valer, faz o que está nas chaves.
      if (parado > 14) {
        // Coloca mais um item na lista.
        erros.push('gesto sem efeito em ' + s.nome + ' (' + s.k + ')');
        // Sai da repetição.
        break;
      }
      // Soma 1 em gestos.
      gestos++;
      // Comanda o navegador do teste (evaluate) e guarda com o nome "o".
      const o = await pg.evaluate(estouro);
      // Se a condição entre parênteses valer: coloca mais um item na lista.
      if (o && !avisos.includes(o)) avisos.push(o);
      // Se a condição entre parênteses valer: usa a ajuda "clique" (ela está definida neste arquivo).
      if (gestos % 3 === 1) await clique();
      // Se a condição entre parênteses valer: comanda o navegador do teste (click).
      if (s.k === 'toque') await pg.mouse.click(s.x, s.y);
      // Se o caso de cima não valeu, faz isto.
      else if (s.k === 'segura') {
        // Comanda o navegador do teste (move).
        await pg.mouse.move(s.x, s.y);
        // Comanda o navegador do teste (down).
        await pg.mouse.down();
        // Comanda o navegador do teste (runFor).
        await pg.clock.runFor(s.ms + 400);
        // Comanda o navegador do teste (up).
        await pg.mouse.up();
        // Se o caso de cima não valeu, faz isto.
      } else if (s.k === 'arrasta') {
        // Passa por cada item da lista e monta uma lista nova e guarda com o nome "estes valores".
        const [dx, dy] = s.rumo.split(',').map(Number);
        // Comanda o navegador do teste (move).
        await pg.mouse.move(s.x, s.y);
        // Comanda o navegador do teste (down).
        await pg.mouse.down();
        // Comanda o navegador do teste (move).
        await pg.mouse.move(s.x + dx, s.y + dy, { steps: 10 });
        // Comanda o navegador do teste (up).
        await pg.mouse.up();
        // Se o caso de cima não valeu, faz isto.
      } else if (s.k === 'raspa') {
        // Passa o "dedo" em zigue-zague pela área inteira.
        await pg.mouse.move(s.x, s.y);
        // Comanda o navegador do teste (down).
        await pg.mouse.down();
        // Repete várias vezes, contando as voltas.
        for (let yy = 0; yy <= 1; yy += 0.25) {
          // Comanda o navegador do teste (move).
          await pg.mouse.move(s.x + s.w / 2 - 4, s.y - s.h / 2 + s.h * yy, { steps: 9 });
          // Comanda o navegador do teste (move).
          await pg.mouse.move(s.x - s.w / 2 + 4, s.y - s.h / 2 + s.h * Math.min(1, yy + 0.12), { steps: 9 });
        }
        // Comanda o navegador do teste (up).
        await pg.mouse.up();
      }
      // Comanda o navegador do teste (runFor).
      await pg.clock.runFor(80);
    }
    // Comanda o navegador do teste (runFor).
    await pg.clock.runFor(400);
    // Usa a ajuda "clique" (ela está definida neste arquivo).
    await clique('fim');
    // Comanda o navegador do teste (evaluate) e guarda com o nome "info".
    const info = await pg.evaluate(() => ({
      tit: (document.querySelector('.cena.final .titulo') || {}).textContent,
      // Botões de reação da tela final.
      chips: document.querySelectorAll('.cena.final .chip').length,
      tema: document.documentElement.dataset.tema,
      // Qual desenho o quadro mostra.
      arte: document.documentElement.dataset.arte
    }));
    // Se a condição entre parênteses valer: coloca mais um item na lista.
    if (feito && info.chips !== 3) erros.push('chips=' + info.chips);
    // Guarda este valor com o nome "ok".
    const ok = feito && !erros.length;
    // Se a condição entre parênteses valer: soma 1 em falhas.
    if (!ok) falhas++;
    // Escreve o resultado na tela do terminal.
    console.log(
      (ok ? 'OK   ' : 'FALHA') +
        ' ' +
        id +
        ' ' +
        info.arte +
        ' gestos=' +
        gestos +
        (avisos.length ? ' [' + avisos.join(', ') + ']' : '') +
        (erros.length ? ' | ' + erros.join('; ').slice(0, 300) : '') +
        (feito ? '' : ' | não chegou ao final')
    );
    // Comanda o navegador do teste (close).
    await ctx.close();
  }
  // Comanda o navegador do teste (close).
  await b.close();
  // Escreve o resultado na tela do terminal.
  console.log('\nTOTAL ' + ids.length + ' FALHAS ' + falhas);
  // Termina o teste.
  process.exit(falhas ? 1 : 0);
})();
