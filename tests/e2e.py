# Uso: python3 tests/e2e.py http://localhost:8765/ [1,2,3|todas]  (precisa: pip install playwright + Chrome)
# Teste de ponta a ponta: percorre cada mensagem com relógio falso (rápido) e confere a ordem das cenas.
import sys, json, re, subprocess
from playwright.sync_api import sync_playwright

import os
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8765/'
ALVO = sys.argv[2] if len(sys.argv) > 2 else 'todas'   # 'todas' ou lista de ids "1,2,3"

# Lê as mensagens via node para saber a ordem esperada de cenas.
dados = json.loads(subprocess.check_output(['node', '-e', '''
const vm=require("vm"),fs=require("fs");const c={console};c.window=c;vm.createContext(c);
for(const f of ["data/config.js","data/categorias.js","data/base.js","data/mensagens-paquera.js","data/mensagens-namoro.js","data/mensagens-amigos.js","data/mensagens-datas.js"])vm.runInContext(fs.readFileSync("%s/"+f,"utf8"),c);
const Ch=require("%s/js/chave.js");
console.log(JSON.stringify(c.MENSAGENS.map(m=>({id:m.id,key:Ch.gerar(m.id),seq:["ab-"+m.ab.t].concat(m.passos.filter(p=>p.t!=="final").map(p=>p.t),["final-jogo","final"]),tp:m.passos[m.passos.length-1].tp,carta:!!m.carta}))))
''' % (RAIZ, RAIZ)]))
ids = None if ALVO == 'todas' else set(int(x) for x in ALVO.split(','))
dados = [d for d in dados if ids is None or d['id'] in ids]

ESTADO = '''() => {
  const c = document.querySelector('.cena:not(.saindo)');
  if (!c) return {k:'none', cls:''};
  const cls = c.className.replace('cena','').trim().split(' ')[0];
  const base = {cls};
  if (c.classList.contains('final') && c.querySelector('.acoes')) return {...base, k:'done'};
  if (c.querySelector('.seg')) return {...base, k:'seg'};
  if (c.querySelector('.toq:not([disabled])')) return {...base, k:'toq'};
  if (c.querySelector('.cabo')) return {...base, k:'desl'};
  if (c.querySelector('.card:not(.virado)')) return {...base, k:'cards'};
  if (c.querySelector('.opcao') && !c.querySelector('.opcao.sel')) return {...base, k:'opcao'};
  if (c.querySelector('button.btn:not(:disabled)')) return {...base, k:'btn'};
  const dica = c.querySelector('.dica');
  if (dica && /toque|toque para/.test(dica.textContent)) return {...base, k:'tap'};
  return {...base, k:'wait'};
}'''

resultados = []
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox', '--autoplay-policy=no-user-gesture-required'])
    for d in dados:
        ctx = b.new_context(viewport={'width': 390, 'height': 780}, has_touch=False)
        pg = ctx.new_page()
        erros = []
        pg.on('pageerror', lambda e: erros.append('pageerror: %s' % e))
        pg.on('console', lambda m: erros.append('console: %s' % m.text) if m.type == 'error' and 'Failed to load resource' not in m.text and 'ERR_' not in m.text else None)
        pg.route(re.compile(r'https://fonts\.(googleapis|gstatic)\.com/.*'), lambda r: r.abort())
        pg.clock.install()
        url = BASE + 'index.html?k=' + d['key']
        pg.goto(url)
        vistas = []
        feito = False
        for passo in range(900):
            pg.clock.run_for(250)
            s = pg.evaluate(ESTADO)
            if s['cls'] and (not vistas or vistas[-1] != s['cls']):
                vistas.append(s['cls'])
            k = s['k']
            try:
                if k == 'done':
                    feito = True; break
                elif k == 'tap':
                    pg.mouse.click(195, 300)
                elif k == 'btn':
                    pg.click('.cena:not(.saindo) button.btn:not(:disabled)', force=True, timeout=2000)
                elif k == 'cards':
                    for el in pg.query_selector_all('.cena:not(.saindo) .card:not(.virado)'):
                        el.click(force=True, timeout=2000); pg.clock.run_for(100)
                elif k == 'opcao':
                    pg.click('.cena:not(.saindo) .opcao', force=True, timeout=2000)
                elif k == 'toq':
                    for _ in range(12):
                        if not pg.query_selector('.cena:not(.saindo) .toq:not([disabled])'): break
                        pg.click('.cena:not(.saindo) .toq', force=True, timeout=2000); pg.clock.run_for(80)
                elif k == 'seg':
                    box = pg.query_selector('.cena:not(.saindo) .seg').bounding_box()
                    pg.mouse.move(box['x'] + box['width']/2, box['y'] + box['height']/2)
                    pg.mouse.down(); pg.clock.run_for(3300); pg.mouse.up()
                elif k == 'desl':
                    box = pg.query_selector('.cena:not(.saindo) .cabo').bounding_box()
                    tr = pg.query_selector('.cena:not(.saindo) .desl').bounding_box()
                    pg.mouse.move(box['x'] + 20, box['y'] + 20); pg.mouse.down()
                    pg.mouse.move(tr['x'] + tr['width'] - 5, box['y'] + 20, steps=8); pg.mouse.up()
            except Exception as e:
                erros.append('acao %s: %s' % (k, str(e)[:120]))
        ok_ordem = vistas == d['seq']
        info = pg.evaluate('''() => ({tit: (document.querySelector('.cena.final .titulo')||{}).textContent, chips: document.querySelectorAll('.cena.final .chip').length, carta: !!document.querySelector('.cena.final .acoes .btn:not(.leve)'), tema: document.documentElement.dataset.tema, leg: (document.querySelector('#legenda')||{}).textContent})''')
        if d['carta'] and not info['carta']: erros.append('faltou botão da carta')
        if info['chips'] != 3: erros.append('chips=%s' % info['chips'])
        res = dict(id=d['id'], feito=feito, ordem=ok_ordem, vistas=vistas, esperado=d['seq'], erros=erros, info=info)
        resultados.append(res)
        flag = 'OK ' if (feito and ok_ordem and not erros) else 'FALHA'
        print(flag, d['id'], info['tema'], '|', info['tit'], '|', info['leg'], ('| ' + '; '.join(erros)) if erros else '', ('' if ok_ordem else '| ordem: %s vs %s' % (vistas, d['seq'])))
        ctx.close()
    b.close()
falhas = [r for r in resultados if not (r['feito'] and r['ordem'] and not r['erros'])]
print('\nTOTAL', len(resultados), 'FALHAS', len(falhas))
