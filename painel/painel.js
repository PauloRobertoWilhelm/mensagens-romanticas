/* ==========================================================
   painel.js — lista as 80 mensagens, mostra o link fixo de cada uma e guarda o histórico
   (histórico fica só no navegador de quem usa o painel, via localStorage).
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

// Caixa fechada: o que está aqui dentro não se mistura com o resto do site.
(function () {
  // Liga o modo estrito: o navegador avisa de erros bobos.
  'use strict';

  // Atalho para achar elementos.
  const $ = (s) => document.querySelector(s);

  // Cores dos temas só para a bolinha de identificação no cartão.
  const COR = {
    noite: '#ff5c8a',
    aurora: '#5af2c6',
    rosa: '#ffc4d8',
    fogo: '#ff6a3d',
    oceano: '#5ce1ff',
    // Texto do botão que revela o campeão.
    ouro: '#e8bd5a',
    neon: '#ff2bd6',
    jardim: '#9fd18a',
    crepusculo: '#ffb347',
    confete: '#ffd23f'
  };

  // Estado: categoria selecionada ('todas' ou chave de CATEGORIAS) e texto da busca.
  let catAtual = 'todas',
    termo = '';

  // Escapa texto para HTML (os nomes vêm dos arquivos de dados, mas por segurança).
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  // Monta o link de uma chave. No site publicado, o link fica mais curto, sem "index.html".
  const linkDe = (chave) => baseUrl() + ((window.CONFIG && CONFIG.URL_BASE) ? '' : 'index.html') + '?k=' + chave;

  // Descobre o endereço base do site: CONFIG.URL_BASE se preenchido; senão, o endereço do painel sem "painel/...".
  const baseUrl = () => {
    // Preferência para o que está no config.js.
    let b = ((window.CONFIG && CONFIG.URL_BASE) || '').trim();
    // Senão, deduz do endereço atual (remove "painel/" e o que vier depois).
    if (!b)
      // Guarda o novo valor em b.
      b = location.href
        .split('#')[0]
        .split('?')[0]
        .replace(/painel\/[^/]*$/, '');
    // Garante barra no final.
    return b.endsWith('/') ? b : b + '/';
  };

  // Lê e grava o histórico no localStorage com proteção (pode estar bloqueado em modo anônimo).
  const lerHist = () => {
    // Tenta fazer isto; se der erro, o site não trava.
    try {
      // Termina aqui e entrega o resultado.
      return JSON.parse(localStorage.getItem('hist-links') || '[]');
      // Se deu erro, cai aqui e o site continua funcionando.
    } catch (e) {
      // Termina aqui e entrega o resultado.
      return [];
    }
  };
  // Cria a ajuda "gravarHist", para usar mais adiante.
  const gravarHist = (h) => {
    // Tenta fazer isto; se der erro, o site não trava.
    try {
      // Guarda no navegador.
      localStorage.setItem('hist-links', JSON.stringify(h.slice(0, 200)));
      // Se deu erro, cai aqui e o site continua funcionando.
    } catch (e) {
      /* sem storage: segue sem histórico */
    }
  };

  // Desenha as abas de categoria.
  const abas = () => {
    // Usa a ajuda "$" (ela está definida neste arquivo) e guarda com o nome "el".
    const el = $('#abas');
    // "Todas" + uma aba por categoria, com contagem.
    const itens = [['todas', 'Todas (' + MENSAGENS.length + ')']].concat(
      Object.keys(CATEGORIAS).map((k) => [
        k,
        CATEGORIAS[k].emoji + ' ' + CATEGORIAS[k].nome + ' (' + MENSAGENS.filter((m) => m.cat === k).length + ')'
      ])
    );
    // Troca o que aparece dentro de el.
    el.innerHTML = itens
      .map(
        ([k, t]) =>
          '<button type="button" class="aba" role="tab" data-k="' +
          k +
          '" aria-selected="' +
          (k === catAtual) +
          '">' +
          esc(t) +
          '</button>'
      )
      .join('');
    // Clique troca a categoria e redesenha a lista.
    el.querySelectorAll('.aba').forEach((b) =>
      b.addEventListener('click', () => {
        // Guarda a categoria escolhida.
        catAtual = b.dataset.k;
        // Usa a ajuda "abas" (ela está definida neste arquivo).
        abas();
        // Usa a ajuda "lista" (ela está definida neste arquivo).
        lista();
      })
    );
  };

  // Desenha a lista de cartões conforme categoria e busca.
  const lista = () => {
    // Filtra por categoria e por trecho do nome.
    const itens = MENSAGENS.filter(
      (m) => (catAtual === 'todas' || m.cat === catAtual) && m.nome.toLowerCase().includes(termo)
    );
    // Troca o que aparece dentro de $('#lista').
    $('#lista').innerHTML =
      itens
        .map((m) => {
          // Último passo da mensagem, para mostrar o título do final.
          const fim = m.passos[m.passos.length - 1];
          // Termina aqui e entrega o resultado.
          return (
            '<article class="card"><h3><span class="pt" style="background:' +
            COR[m.tema] +
            '"></span>' +
            esc(m.nome) +
            '<span class="id">#' +
            m.id +
            '</span></h3>' +
            '<p class="meta">' +
            esc(CATEGORIAS[m.cat].nome) +
            ' · tema ' +
            esc(m.tema) +
            '<br>arte: ' +
            esc(m.ab.a) +
            '<br>final: ' +
            esc(fim.ti) +
            (m.carta ? ' · com carta ✉️' : '') +
            '</p>' +
            '<button type="button" data-id="' +
            m.id +
            '">Ver link</button></article>'
          );
        })
        .join('') || '<p class="sub">Nada encontrado.</p>';
    // Liga o botão de cada cartão.
    $('#lista')
      .querySelectorAll('button[data-id]')
      .forEach((b) => b.addEventListener('click', () => gerar(parseInt(b.dataset.id, 10))));
  };

  // Monta o link fixo do id, mostra na gaveta e grava no histórico.
  const gerar = (id) => {
    // Acha a mensagem e pega a chave fixa dela (é sempre a mesma).
    const m = MENSAGENS.find((x) => x.id === id);
    // Pega a chave fixa deste link e guarda com o nome "chave".
    const chave = Chave.fixa(id);
    // Guarda este valor com o nome "link".
    const link = linkDe(chave);
    // Preenche e mostra a gaveta.
    $('#gNome').textContent = '#' + m.id + ' · ' + m.nome;
    // Guarda o novo valor em $('#gLink').value.
    $('#gLink').value = link;
    // Marca se o painel está aberto no computador do dono.
    const local = location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    // No computador, o botão Abrir mostra a versão do computador. No site, abre o link de verdade.
    $('#gAbrir').href = local ? '../index.html?k=' + chave : link;
    // Mostra $('#gaveta').
    $('#gaveta').hidden = false;
    // Avisa quando o endereço é de arquivo local (só funciona neste computador).
    $('#gAviso').textContent =
      location.protocol === 'file:' && !(CONFIG.URL_BASE || '').trim()
        ? 'Atenção: este link é do seu computador. Para enviar a alguém, preencha URL_BASE em data/config.js com o endereço do GitHub Pages.'
        : '';
    // Grava no histórico com a anotação opcional.
    const h = lerHist();
    // Coloca um item no começo da lista.
    h.unshift({ id, nome: m.nome, chave, para: $('#para').value.trim(), quando: new Date().toLocaleString('pt-BR') });
    // Usa a ajuda "gravarHist" (ela está definida neste arquivo).
    gravarHist(h);
    // Usa a ajuda "historico" (ela está definida neste arquivo).
    historico();
  };

  // Desenha o histórico.
  const historico = () => {
    // Usa a ajuda "lerHist" (ela está definida neste arquivo) e guarda com o nome "h".
    const h = lerHist();
    // Troca o que aparece dentro de $('#historico').
    $('#historico').innerHTML = h.length
      ? h
          .map(
            (x) =>
              '<li><b>' +
              esc(x.quando) +
              '</b> · #' +
              x.id +
              ' ' +
              esc(x.nome) +
              (x.para ? ' · para: ' + esc(x.para) : '') +
              '<br>' +
              esc(linkDe(x.chave)) +
              '</li>'
          )
          .join('')
      : '<li>Nenhum ainda.</li>';
  };

  // Copia o link para a área de transferência (com plano B para navegadores sem a API).
  const copiar = async () => {
    // Usa a ajuda "$" (ela está definida neste arquivo) e guarda com o nome "campo".
    const campo = $('#gLink');
    // Tenta fazer isto; se der erro, o site não trava.
    try {
      // Copia o texto.
      await navigator.clipboard.writeText(campo.value);
      // Troca o texto de $('#gCopiar').
      $('#gCopiar').textContent = 'Copiado ✓';
      // Se deu erro, cai aqui e o site continua funcionando.
    } catch (e) {
      // Seleciona o texto do campo.
      campo.select();
      // Copia o texto selecionado.
      document.execCommand('copy');
      // Troca o texto de $('#gCopiar').
      $('#gCopiar').textContent = 'Copiado ✓';
    }
    // Deixa agendado para daqui a pouco.
    setTimeout(() => {
      // Troca o texto de $('#gCopiar').
      $('#gCopiar').textContent = 'Copiar';
      // O número abaixo é o tempo de espera, em milésimos de segundo (1000 = 1 segundo).
    }, 1800);
  };

  // Liga eventos e desenha a tela inicial.
  $('#busca').addEventListener('input', (e) => {
    // Guarda o que foi digitado na busca.
    termo = e.target.value.toLowerCase().trim();
    // Usa a ajuda "lista" (ela está definida neste arquivo).
    lista();
  });
  // Fica de olho: quando a pessoa tocar, roda o que está aqui.
  $('#gCopiar').addEventListener('click', copiar);
  // Fica de olho: quando a pessoa tocar, roda o que está aqui.
  $('#gFechar').addEventListener('click', () => {
    // Esconde $('#gaveta').
    $('#gaveta').hidden = true;
  });
  // Fica de olho: quando a pessoa tocar, roda o que está aqui.
  $('#limpar').addEventListener('click', () => {
    // Usa a ajuda "gravarHist" (ela está definida neste arquivo).
    gravarHist([]);
    // Usa a ajuda "historico" (ela está definida neste arquivo).
    historico();
  });
  // Usa a ajuda "abas" (ela está definida neste arquivo).
  abas();
  // Usa a ajuda "lista" (ela está definida neste arquivo).
  lista();
  // Usa a ajuda "historico" (ela está definida neste arquivo).
  historico();
})();
