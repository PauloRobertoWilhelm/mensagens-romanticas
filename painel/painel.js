/* ==========================================================
   painel.js — lista as 80 mensagens, mostra o link fixo de cada uma e guarda o histórico
   (histórico fica só no navegador de quem usa o painel, via localStorage).
   ========================================================== */

// Isola variáveis.
(function () {
  // Modo estrito.
  'use strict';

  // Atalho para achar elementos.
  const $ = (s) => document.querySelector(s);

  // Cores dos temas só para a bolinha de identificação no cartão.
  const COR = { noite: '#ff5c8a', aurora: '#5af2c6', rosa: '#ffc4d8', fogo: '#ff6a3d', oceano: '#5ce1ff', ouro: '#e8bd5a', neon: '#ff2bd6', jardim: '#9fd18a', crepusculo: '#ffb347', confete: '#ffd23f' };
  // Nomes legíveis para tipos de cena, aberturas e finais.
  const NOME = { historia: 'história', constelacao: 'constelação', scanner: 'scanner', cartas: 'cartas', contagem: 'contagem', motivos: 'motivos', escolha: 'escolha', final: 'final' };

  // Estado: categoria selecionada ('todas' ou chave de CATEGORIAS) e texto da busca.
  let catAtual = 'todas', termo = '';

  // Escapa texto para HTML (os nomes vêm dos arquivos de dados, mas por segurança).
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Descobre o endereço base do site: CONFIG.URL_BASE se preenchido; senão, o endereço do painel sem "painel/...".
  const baseUrl = () => {
    // Preferência para o que está no config.js.
    let b = (window.CONFIG && CONFIG.URL_BASE || '').trim();
    // Senão, deduz do endereço atual (remove "painel/" e o que vier depois).
    if (!b) b = location.href.split('#')[0].split('?')[0].replace(/painel\/[^/]*$/, '');
    // Garante barra no final.
    return b.endsWith('/') ? b : b + '/';
  };

  // Lê e grava o histórico no localStorage com proteção (pode estar bloqueado em modo anônimo).
  const lerHist = () => { try { return JSON.parse(localStorage.getItem('hist-links') || '[]'); } catch (e) { return []; } };
  const gravarHist = (h) => { try { localStorage.setItem('hist-links', JSON.stringify(h.slice(0, 200))); } catch (e) { /* sem storage: segue sem histórico */ } };

  // Desenha as abas de categoria.
  const abas = () => {
    const el = $('#abas');
    // "Todas" + uma aba por categoria, com contagem.
    const itens = [['todas', 'Todas (' + MENSAGENS.length + ')']].concat(Object.keys(CATEGORIAS).map((k) => [k, CATEGORIAS[k].emoji + ' ' + CATEGORIAS[k].nome + ' (' + MENSAGENS.filter((m) => m.cat === k).length + ')']));
    el.innerHTML = itens.map(([k, t]) => '<button type="button" class="aba" role="tab" data-k="' + k + '" aria-selected="' + (k === catAtual) + '">' + esc(t) + '</button>').join('');
    // Clique troca a categoria e redesenha a lista.
    el.querySelectorAll('.aba').forEach((b) => b.addEventListener('click', () => { catAtual = b.dataset.k; abas(); lista(); }));
  };

  // Desenha a lista de cartões conforme categoria e busca.
  const lista = () => {
    // Filtra por categoria e por trecho do nome.
    const itens = MENSAGENS.filter((m) => (catAtual === 'todas' || m.cat === catAtual) && m.nome.toLowerCase().includes(termo));
    $('#lista').innerHTML = itens.map((m) => {
      // Resumo das cenas (sem repetir o final) e o jogo do final.
      const cenas = m.passos.filter((p) => p.t !== 'final').map((p) => NOME[p.t]).join(' → ');
      const fim = m.passos[m.passos.length - 1];
      return '<article class="card"><h3><span class="pt" style="background:' + COR[m.tema] + '"></span>' + esc(m.nome) + '<span class="id">#' + m.id + '</span></h3>'
        + '<p class="meta">' + esc(CATEGORIAS[m.cat].nome) + ' · tema ' + esc(m.tema) + '<br>abertura: ' + esc(m.ab.t) + '<br>cenas: ' + esc(cenas) + '<br>final: ' + esc(fim.tp) + (m.carta ? ' · com carta ✉️' : '') + '</p>'
        + '<button type="button" data-id="' + m.id + '">Ver link</button></article>';
    }).join('') || '<p class="sub">Nada encontrado.</p>';
    // Liga o botão de cada cartão.
    $('#lista').querySelectorAll('button[data-id]').forEach((b) => b.addEventListener('click', () => gerar(parseInt(b.dataset.id, 10))));
  };

  // Monta o link fixo do id, mostra na gaveta e grava no histórico.
  const gerar = (id) => {
    // Acha a mensagem e pega a chave fixa dela (é sempre a mesma).
    const m = MENSAGENS.find((x) => x.id === id);
    const chave = Chave.fixa(id);
    const link = baseUrl() + 'index.html?k=' + chave;
    // Preenche e mostra a gaveta.
    $('#gNome').textContent = '#' + m.id + ' · ' + m.nome;
    $('#gLink').value = link; $('#gAbrir').href = link; $('#gaveta').hidden = false;
    // Avisa quando o endereço é de arquivo local (só funciona neste computador).
    $('#gAviso').textContent = location.protocol === 'file:' && !(CONFIG.URL_BASE || '').trim()
      ? 'Atenção: este link é do seu computador. Para enviar a alguém, preencha URL_BASE em data/config.js com o endereço do GitHub Pages.' : '';
    // Grava no histórico com a anotação opcional.
    const h = lerHist(); h.unshift({ id, nome: m.nome, chave, para: $('#para').value.trim(), quando: new Date().toLocaleString('pt-BR') });
    gravarHist(h); historico();
  };

  // Desenha o histórico.
  const historico = () => {
    const h = lerHist();
    $('#historico').innerHTML = h.length ? h.map((x) => '<li><b>' + esc(x.quando) + '</b> · #' + x.id + ' ' + esc(x.nome) + (x.para ? ' · para: ' + esc(x.para) : '') + '<br>' + esc(baseUrl() + 'index.html?k=' + x.chave) + '</li>').join('') : '<li>Nenhum ainda.</li>';
  };

  // Copia o link para a área de transferência (com plano B para navegadores sem a API).
  const copiar = async () => {
    const campo = $('#gLink');
    try { await navigator.clipboard.writeText(campo.value); $('#gCopiar').textContent = 'Copiado ✓'; }
    catch (e) { campo.select(); document.execCommand('copy'); $('#gCopiar').textContent = 'Copiado ✓'; }
    setTimeout(() => { $('#gCopiar').textContent = 'Copiar'; }, 1800);
  };

  // Liga eventos e desenha a tela inicial.
  $('#busca').addEventListener('input', (e) => { termo = e.target.value.toLowerCase().trim(); lista(); });
  $('#gCopiar').addEventListener('click', copiar);
  $('#gFechar').addEventListener('click', () => { $('#gaveta').hidden = true; });
  $('#limpar').addEventListener('click', () => { gravarHist([]); historico(); });
  abas(); lista(); historico();
})();
