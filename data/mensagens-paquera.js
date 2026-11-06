/* ==========================================================
   mensagens-paquera.js — ids 1 a 20 (categoria: paquera).
   Tom: cantada, elogio e ousadia com charme. Fala do sorriso, do cabelo, da
   inteligência e da mulher incrível que ela é. NENHUMA termina pedindo para sair.
   Cada mensagem usa uma arte só dela (js/artes-paquera.js).
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

// 1 — Cartaz de procurada.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  1,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'ouro',
  // Nome que aparece no painel de links.
  'Procurada',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'procurada',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'PROCURADA',
      // Frase menor, perto do título.
      sub: 'viva, linda e sorrindo',
      // Resultado do reconhecimento facial, em cima do retrato.
      scan: 'ALVO: 100% LINDA',
      // Acusações do cartaz, uma por toque.
      crimes: [
        'Assalto à mão armada com um *sorriso*',
        'Porte ilegal de um *cabelo* que desmonta qualquer um',
        'Uso abusivo de *inteligência* em conversa comum',
        'Invasão da minha cabeça. *Até hoje não saiu*'
      ],
      // Texto do botão que a pessoa toca.
      botao: 'ler a próxima acusação',
      // Texto do botão que mostra o carimbo.
      sentenca: 'ouvir a sentença',
      // Palavra do carimbo.
      carimbo: 'CULPADA',
      // Frase do prêmio.
      premio: 'Recompensa: todo o juízo que me restou.',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›'
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 14 }
  ),
  // A tela final desta mensagem.
  [F('Eu sou a vítima.', 'E não vou prestar queixa. Mulher assim *pode me roubar* todo dia.')],
  // Carta longa, aberta pelo botão "ler a carta". Linha em branco = \n\n.
  'Olha, eu tentei ser discreto.\n\nTentei não reparar no seu sorriso, tentei não perder o fio da conversa quando você mexe no cabelo, tentei fingir que a sua inteligência não me deixa sem resposta.\n\nNão deu. Você é o tipo de mulher que desorganiza a cabeça da gente com a maior elegância do mundo.\n\nSe isso for crime, pode me prender junto.'
);

// 2 — Radar e multa por excesso de beleza.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  2,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'noite',
  // Nome que aparece no painel de links.
  'Excesso de beleza',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'multa',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase de aviso em cima da tela.
      aviso: 'RADAR DE BELEZA · VIA PÚBLICA',
      // Texto do botão que liga o radar.
      medir: 'medir quem está passando',
      // Número que o radar mostra.
      kmh: 347,
      // Texto do botão que a pessoa toca.
      botao: 'emitir a multa',
      // Título que aparece em cima.
      titulo: 'Auto de infração nº 0001',
      // Linhas do papel: cada uma tem rótulo e valor.
      campos: [
        ['Infração', 'Excesso de *beleza* em via pública'],
        ['Agravante', 'Sorriu sem avisar e parou o trânsito'],
        ['Local', 'Exatamente por onde você passa'],
        ['Reincidência', 'Todo dia, e sem sinal de arrependimento'],
        ['Pena', 'Continuar linda assim, *sem direito a recurso*']
      ],
      // Texto do último botão, que leva à tela final.
      fim: 'pagar com um sorriso ›'
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 10, cores: ['#ff5a4f', '#ffe45c'] }
  ),
  // A tela final desta mensagem.
  [F('Infração mantida.', 'Pode recorrer à vontade. O juiz sou eu, e já declarei que *sou seu fã*.')]
);

// 3 — Bula do sorriso dela.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  3,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'jardim',
  // Nome que aparece no painel de links.
  'Bula do seu sorriso',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'bula',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Nome que aparece na peça.
      nome: 'SORRISU®',
      // Linha de baixo da caixa do remédio.
      dose: '100% natural · uso contínuo',
      // Faixa vermelha da caixa.
      tarja: 'CAUSA DEPENDÊNCIA',
      // Frase pequena que ensina o que fazer.
      dica: 'toque para abrir a caixa',
      // Dobras da bula: título e texto de cada uma.
      secoes: [
        ['Para que serve', 'Melhora o dia de qualquer pessoa em *menos de dois segundos*.'],
        [
          'Composição',
          'Um olhar que desarma, um cabelo que devia ser proibido e *inteligência em concentração máxima*.'
        ],
        ['Efeitos colaterais', 'Suspiro sem motivo, perda do fio da meada e frio na barriga. *Muito comuns.*'],
        ['Superdose', 'Não existe antídoto. Eu procurei. *Ainda bem que não achei.*']
      ],
      // Texto do último botão, que leva à tela final.
      fim: 'tomar mais uma dose ›'
    },
    // Partículas do fundo desta mensagem.
    { forma: '💊', qtd: 8 }
  ),
  // A tela final desta mensagem.
  [F('Mantenha ao alcance dos meus olhos.', 'Uso contínuo recomendado. *Eu já não consigo parar.*')]
);

// 4 — Previsão do tempo sobre ela.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  4,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'oceano',
  // Nome que aparece no painel de links.
  'Previsão do tempo',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'previsao',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Nome do canal de TV.
      canal: 'CANAL DO CORAÇÃO · AO VIVO',
      // Texto do botão que a pessoa toca.
      botao: 'próxima região',
      // Texto do último botão, que leva à tela final.
      fim: 'desligar a TV ›',
      // Notícia que corre no pé da TV.
      ticker:
        'URGENTE: mulher incrível é vista na região e deixa todo mundo sem assunto · Meteorologistas não explicam tanta beleza em um dia só · Fique em casa, ou fique olhando',
      // Regiões da previsão, uma de cada vez.
      regioes: [
        {
          // Nome que aparece na peça.
          nome: 'Região do Sorriso',
          // Desenho do tempo: sol, vento, raio ou arco.
          icone: 'sol',
          // Temperatura mostrada.
          graus: 42,
          // Texto deste item.
          t: 'Sol forte o dia inteiro. *Sem previsão de nuvens.* Protetor não adianta.'
        },
        {
          // Nome que aparece na peça.
          nome: 'Litoral do Cabelo',
          // Desenho do tempo: sol, vento, raio ou arco.
          icone: 'vento',
          // Temperatura mostrada.
          graus: 31,
          // Texto deste item.
          t: 'Ventos que balançam tudo, *principalmente as minhas certezas*.'
        },
        {
          // Nome que aparece na peça.
          nome: 'Planalto da Inteligência',
          // Desenho do tempo: sol, vento, raio ou arco.
          icone: 'raio',
          // Temperatura mostrada.
          graus: 38,
          // Texto deste item.
          t: 'Raios de ideia a cada frase. *A mente mais brilhante do mapa.*'
        },
        {
          // Nome que aparece na peça.
          nome: 'Céu do seu Olhar',
          // Desenho do tempo: sol, vento, raio ou arco.
          icone: 'arco',
          // Temperatura mostrada.
          graus: 36,
          // Texto deste item.
          t: 'Abre um arco-íris quando você ri, e *nenhum satélite* explica.'
        }
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Previsão para amanhã:', 'Você, ainda mais linda. E eu sem *guarda-chuva nenhum* contra isso.')]
);

// 5 — Caça-níquel.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  5,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'confete',
  // Nome que aparece no painel de links.
  'Jackpot',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'jackpot',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'JACKPOT',
      // O que aparece nos rolos antes de girar.
      inicio: '?',
      // Frase que manda puxar a alavanca.
      puxe: 'toque na alavanca',
      // Palavras que passam nos rolos.
      simbolos: ['SORRISO', 'CABELO', 'OLHAR', 'CHARME', 'MENTE', 'VOZ', 'PRESENÇA'],
      // Rodadas da máquina.
      giros: [
        { r: ['SORRISO', 'SORRISO', 'OLHAR'], f: 'Quase! Até a máquina *treme* quando você sorri.' },
        { r: ['CABELO', 'MENTE', 'CABELO'], f: 'Cabelo lindo, cabeça melhor ainda. *Combinação perigosa.*' },
        { r: ['VOCÊ', 'VOCÊ', 'VOCÊ'], f: 'TRÊS IGUAIS! Você é *o prêmio máximo* desta casa.' }
      ],
      // Texto do último botão, que leva à tela final.
      fim: 'sacar o prêmio ›'
    },
    // Partículas do fundo desta mensagem.
    { forma: '💰', qtd: 10 }
  ),
  // A tela final desta mensagem.
  [F('Banca quebrada.', 'Apostei minha sorte inteira e *tirei você* na cabeça. Essa máquina nunca mais paga igual.')]
);

// 6 — Raspadinha.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  6,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'crepusculo',
  // Nome que aparece no painel de links.
  'Bilhete premiado',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'raspadinha',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'RASPE E GANHE',
      // Frase menor, perto do título.
      sub: 'raspe os três com o dedo',
      // Prêmios escondidos debaixo da raspadinha.
      premios: ['Que sorriso', 'Que cabelo', 'Que mulher'],
      // Frase que aparece depois de raspar tudo.
      ganhou: 'Bilhete premiado! Em você, *tudo é prêmio*.',
      // Texto do último botão, que leva à tela final.
      fim: 'retirar o prêmio ›'
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 16 }
  ),
  // A tela final desta mensagem.
  [F('Sem data de validade.', 'Enquanto você existir, *tem gente ganhando na loteria* só de te ver passar.')]
);

// 7 — Lanterna no escuro.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  7,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'noite',
  // Nome que aparece no painel de links.
  'Acabou a luz',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'lanterna',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'passe o dedo na tela para procurar',
      // Elogios escondidos no escuro.
      achados: [
        'Esse *sorriso* acende a sala',
        'Esse *cabelo* devia ter alarme',
        'Que *cabeça* brilhante',
        'Mulher *incrível* à vista'
      ],
      // Última frase da animação.
      fecho: 'Nem precisava de lanterna. *A luz era você.*',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›'
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Voltou a energia.', 'E o bairro inteiro agradece, porque quem *ilumina* tudo por aqui é você.')]
);

// 8 — Conversa escrita e apagada.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  8,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'aurora',
  // Nome que aparece no painel de links.
  'Digitando...',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'digitando',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase de aviso em cima da tela.
      aviso: '💬 1 mensagem nova. Toque para abrir',
      // Nome no topo da conversa.
      contato: 'Alguém que te admira',
      // Palavra que aparece parada no topo.
      online: 'online',
      // Palavra que aparece enquanto digita.
      digitando: 'digitando...',
      // O que é digitado. Com apagar: true, a frase é apagada em vez de enviada.
      roteiro: [
        { t: 'oi' },
        { t: 'tudo bem? queria te perguntar se', apagar: true },
        { t: 'seu sorriso é o motivo de', apagar: true },
        { t: 'ok, vou direto ao ponto' },
        { t: 'você é a mulher mais interessante que eu já vi' },
        { t: 'e esse cabelo devia ser proibido', apagar: true },
        { t: 'e esse cabelo é um crime que eu defendo no tribunal' },
        { t: 'quando você fala eu esqueço o que ia dizer' },
        { t: 'apaguei isso umas 40 vezes antes de ter coragem' }
      ],
      // Texto do último botão, que leva à tela final.
      fim: 'ler o que ficou ›'
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Enviado. Sem arrependimento.', 'Escrevi, apaguei, escrevi de novo. *Você me tira até o medo.*')]
);

// 9 — Primeira página do jornal.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  9,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'ouro',
  // Nome que aparece no painel de links.
  'Edição extra',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'jornal',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Nome que aparece na peça.
      nome: 'O Coração Diário',
      // Linha da data do jornal.
      data: 'Edição extra · Tiragem: um exemplar, só seu',
      // Texto do botão que a pessoa toca.
      botao: 'ler a próxima edição',
      // Texto do último botão, que leva à tela final.
      fim: 'fechar o jornal ›',
      // Edições do jornal, uma de cada vez.
      edicoes: [
        {
          // Manchete grande.
          m: 'MULHER SORRI E PARALISA A CIDADE',
          // Frase ou nome do dia.
          s: 'Testemunhas perderam a fala e o ponto de ônibus',
          // Texto deste item.
          t: 'Especialistas confirmam: nunca um sorriso causou *tantos danos* em tão pouco tempo.'
        },
        {
          // Manchete grande.
          m: 'CABELO DELA ENTRA PARA A LISTA DE PATRIMÔNIOS',
          // Frase ou nome do dia.
          s: 'Vento pede desculpas por só ter ajudado',
          // Texto deste item.
          t: 'Visitantes relatam que, ao ver o movimento, *esqueceram o próprio nome*.'
        },
        {
          // Manchete grande.
          m: 'INTELIGÊNCIA DELA DERRUBA TODOS OS ARGUMENTOS',
          // Frase ou nome do dia.
          s: 'Debate termina em admiração geral',
          // Texto deste item.
          t: 'Fontes afirmam que a mulher mais linda da cidade *é também a mais esperta*. Não há defesa.'
        }
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '📰', qtd: 8 }
  ),
  // A tela final desta mensagem.
  [F('Última hora:', 'Autor destas matérias admite que *escreveu tudo apaixonado*. O jornal não pede desculpas.')]
);

// 10 — Galeria de arte.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  10,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'noite',
  // Nome que aparece no painel de links.
  'Obra-prima',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'museu',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Texto do botão que a pessoa toca.
      botao: 'próxima obra ›',
      // Texto do último botão, que leva à tela final.
      fim: 'sair da galeria ›',
      // Quadros da galeria.
      obras: [
        {
          // Qual desenho o quadro mostra.
          arte: 'sorriso',
          // Título que aparece em cima.
          titulo: 'O Sorriso',
          // Texto da plaquinha do quadro.
          ficha: 'Técnica mista sobre o meu sossego. Acervo permanente da minha memória.'
        },
        {
          // Qual desenho o quadro mostra.
          arte: 'cabelo',
          // Título que aparece em cima.
          titulo: 'Ondas',
          // Texto da plaquinha do quadro.
          ficha: 'Movimento puro. Os visitantes param, suspiram e *esquecem a hora*.'
        },
        {
          // Qual desenho o quadro mostra.
          arte: 'mente',
          // Título que aparece em cima.
          titulo: 'A Mente',
          // Texto da plaquinha do quadro.
          ficha: 'A peça mais rara da coleção: quanto mais se olha, *mais há para ver*.'
        }
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Proibido tocar.', 'Mas ninguém disse nada sobre *ficar admirando* a noite inteira.')]
);

// 11 — Dicionário.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  11,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'rosa',
  // Nome que aparece no painel de links.
  'Novo dicionário',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'dicionario',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'Dicionário de Você',
      // Frase pequena que ensina o que fazer.
      dica: 'toque na página para virar',
      // Texto do último botão, que leva à tela final.
      fim: 'fechar o livro ›',
      // Páginas do dicionário.
      verbetes: [
        {
          // Texto deste item.
          t: 'sor.ri.so',
          // Classe da palavra, como no dicionário.
          c: 'substantivo masculino',
          // Significado da palavra.
          d: 'Arma branca usada por você para acabar com o meu dia ruim.',
          // Exemplo ou desenho deste item.
          e: '“Ela sorriu e eu *esqueci a senha do banco*.”'
        },
        {
          // Texto deste item.
          t: 'ca.be.lo',
          // Classe da palavra, como no dicionário.
          c: 'substantivo masculino',
          // Significado da palavra.
          d: 'Fenômeno natural que balança e leva junto a atenção de quem está perto.',
          // Exemplo ou desenho deste item.
          e: '“Ventava, e *ninguém olhou para mais nada*.”'
        },
        {
          // Texto deste item.
          t: 'in.te.li.gên.cia',
          // Classe da palavra, como no dicionário.
          c: 'substantivo feminino',
          // Significado da palavra.
          d: 'O que me faz ouvir você por horas e ainda querer mais.',
          // Exemplo ou desenho deste item.
          e: '“Ela explicou, e eu *me apaixonei pelo argumento*.”'
        }
      ],
      // Última frase da animação.
      fecho: 'in.crí.vel (adjetivo):\n*ver você*.'
    },
    // Partículas do fundo desta mensagem.
    { forma: '❀', qtd: 12 }
  ),
  // A tela final desta mensagem.
  [F('Nota do editor:', 'Faltam palavras no idioma pra te descrever. *Sigo tentando*, com muito prazer.')]
);

// 12 — GPS.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  12,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'aurora',
  // Nome que aparece no painel de links.
  'Recalculando',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'gps',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Texto do botão que a pessoa toca.
      botao: 'recalcular rota',
      // Texto do último botão, que leva à tela final.
      fim: 'encerrar a viagem ›',
      // Frases da voz do GPS.
      rotas: [
        'Em 200 metros, pare de disfarçar.',
        'Rota recalculada. Todo caminho passa pelo seu *sorriso*.',
        'Rota alternativa não encontrada. *Nem procurei direito.*'
      ],
      // Frase ao chegar ao destino.
      chegada: 'Você chegou ao destino: *a mulher mais incrível do mapa*.'
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Sinal perdido.', 'Não adianta atualizar o mapa: todo pensamento meu *acaba em você*.')]
);

// 13 — Alarme de incêndio.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  13,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'fogo',
  // Nome que aparece no painel de links.
  'Alerta de incêndio',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'incendio',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título do alarme.
      alerta: 'ALERTA DE INCÊNDIO',
      // Temperatura inicial.
      temp0: '40°',
      // Primeira frase que aparece.
      abre: 'Foco de calor detectado. Causa provável: *você*.',
      // Texto do botão que a pessoa toca.
      botao: 'usar o extintor',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Piorou. Você *sorriu*.',
        'Mexeu no *cabelo*. Perdemos o andar de cima.',
        'Falou algo *inteligente*. O prédio inteiro caiu.',
        'Os bombeiros pediram *o seu número*.'
      ],
      // Temperaturas a cada toque.
      temps: ['70°', '120°', '300°', '∞'],
      // Última frase da animação.
      fecho: 'Caso encerrado. *Você é fogo*, e não tem seguro que cubra.',
      // Texto do último botão, que leva à tela final.
      fim: 'sair do prédio ›'
    },
    // Partículas do fundo desta mensagem.
    { forma: '🔥', qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Laudo dos bombeiros:', 'Mulher altamente *inflamável*. Recomendo chegar perto mesmo assim.')]
);

// 14 — Tarô.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  14,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'neon',
  // Nome que aparece no painel de links.
  'As cartas não mentem',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'tarot',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'O QUE AS CARTAS DIZEM DE VOCÊ',
      // Texto do último botão, que leva à tela final.
      fim: 'guardar as cartas ›',
      // Cartas da mesa, na ordem.
      cartas: [
        { ic: 'sol', nome: 'O SOL', t: 'Seu *sorriso*. Aquece até quem jurou não olhar.' },
        { ic: 'lua', nome: 'A LUA', t: 'Seu *cabelo* e seu mistério. Mexem com as marés, e comigo.' },
        { ic: 'estrela', nome: 'A ESTRELA', t: 'Sua *mente*. A coisa mais brilhante deste baralho.' }
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '✧', qtd: 18 }
  ),
  // A tela final desta mensagem.
  [F('Sua sina está traçada:', 'Vai continuar *linda*, e alguém vai continuar pensando em você. As cartas juram.')]
);

// 15 — Elevador.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  15,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'ouro',
  // Nome que aparece no painel de links.
  'Cobertura',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'elevador',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Texto do primeiro botão.
      comeca: 'chamar o elevador',
      // Texto do botão que a pessoa toca.
      botao: 'subir mais',
      // Texto do último botão, que leva à tela final.
      fim: 'ficar na cobertura ›',
      // Andares do elevador.
      andares: [
        { n: 3, t: 'Terceiro andar: *sorrisos* que derrubam qualquer defesa.' },
        { n: 9, t: 'Nono andar: um *cabelo* que faz o elevador parar sozinho.' },
        { n: 17, t: 'Décimo sétimo: *inteligência* de deixar o síndico sem resposta.' },
        { n: 'C', t: 'Cobertura: a *mulher mais incrível* do prédio. Daqui não desço.' }
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 10 }
  ),
  // A tela final desta mensagem.
  [F('Você está aqui.', 'No ponto mais alto de todos os meus pensamentos. *Vista linda.*')]
);

// 16 — Cardápio de bistrô.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  16,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'jardim',
  // Nome que aparece no painel de links.
  'Prato do dia',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'cardapio',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'Menu do Dia',
      // Frase menor, perto do título.
      sub: 'especialidades da casa, escolha uma',
      // Frase da conta.
      conta: 'A conta: *deixa que eu pago*, com juros de admiração.',
      // Texto do último botão, que leva à tela final.
      fim: 'pedir a sobremesa ›',
      // Pratos da lousa.
      pratos: [
        {
          // Nome que aparece na peça.
          nome: 'Sorriso flambado',
          // Preço do prato.
          preco: 'meu juízo',
          // Descrição do prato.
          desc: 'Servido quente, sem aviso prévio.',
          // O que o garçom responde.
          resposta: 'Excelente escolha, senhora. O chef *perdeu a receita* de tanto olhar pra você.'
        },
        {
          // Nome que aparece na peça.
          nome: 'Cabelo ao vento',
          // Preço do prato.
          preco: 'meu sono',
          // Descrição do prato.
          desc: 'Leve, solto e impossível de esquecer.',
          // O que o garçom responde.
          resposta: 'Ótimo pedido. Essa mesa já parou *o salão inteiro*.'
        },
        {
          // Nome que aparece na peça.
          nome: 'Conversa inteligente',
          // Preço do prato.
          preco: 'meu orgulho',
          // Descrição do prato.
          desc: 'Prato forte. A casa não se responsabiliza.',
          // O que o garçom responde.
          resposta: 'Delicado e forte, como *a senhora*. Até o chef pediu para ouvir.'
        }
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '✧', qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('A casa agradece.', 'Mulher com esse bom gosto *merece o melhor da vida*. E o melhor elogio do dia.')]
);

// 17 — Vitrola.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  17,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'crepusculo',
  // Nome que aparece no painel de links.
  'Lado A',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'vinil',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Texto ou símbolo do selo.
      selo: 'Lado A\nVocê',
      // Frase pequena que ensina o que fazer.
      dica: 'toque na vitrola para colocar a agulha',
      // Texto do botão que a pessoa toca.
      botao: 'próxima faixa ›',
      // Texto do último botão, que leva à tela final.
      fim: 'virar o disco ›',
      // Músicas do disco.
      faixas: [
        { n: 'FAIXA 1 · SORRISO', v: 'Se seu sorriso tocasse no rádio, *eu nunca trocava de estação*.' },
        { n: 'FAIXA 2 · CABELO', v: 'Tem ritmo no jeito como ele cai no seu ombro. *Eu danço só de olhar.*' },
        { n: 'FAIXA 3 · VOCÊ', v: 'Linda, inteligente, afinada com a vida. *Disco de platina.*' }
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '♪', qtd: 16 }
  ),
  // A tela final desta mensagem.
  [F('Lado B:', 'Também é você. Esse disco eu *ouço no repeat*, e nem disfarço.')]
);

// 18 — Espelho embaçado.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  18,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'rosa',
  // Nome que aparece no painel de links.
  'Espelho, espelho meu',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'espelho',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Pergunta da tela.
      pergunta: 'Espelho, espelho meu…',
      // Frase escondida no vidro.
      reflexo: 'Existe alguém mais *incrível* do que você?',
      // Frase pequena que ensina o que fazer.
      dica: 'limpe o espelho com o dedo',
      // Linhas de texto, na ordem em que aparecem.
      linhas: [
        'Eu sou um espelho, tenho obrigação de ser sincero.',
        'Esse *sorriso* quebra o meu vidro.',
        'Esse *cabelo* me deixa embaçado de novo.',
        'A resposta é *não*. Pode conferir sempre que quiser.'
      ],
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›'
    },
    // Partículas do fundo desta mensagem.
    { forma: '✨', qtd: 12 }
  ),
  // A tela final desta mensagem.
  [F('Sete anos de sorte.', 'Pra quem te olha todo dia. E quem me dera *ser esse espelho*.')]
);

// 19 — Bússola.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  19,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'oceano',
  // Nome que aparece no painel de links.
  'Meu norte',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'bussola',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Palavra em cima da bússola.
      norte: '▲ VOCÊ ▲',
      // Frase pequena que ensina o que fazer.
      dica: 'arraste para o lado e gire a bússola',
      // Texto do último botão, que leva à tela final.
      fim: 'seguir o norte ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Girei para o trabalho. Apontou para o seu *sorriso*.',
        'Girei para o outro lado. Apontou para esse *cabelo*.',
        'Pode girar o mundo. *Meu norte é você*, mulher.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 12 }
  ),
  // A tela final desta mensagem.
  [F('Perdido, com muito prazer.', 'Tem gente que se perde no mapa. Eu me perco é *no seu olhar*.')]
);

// 20 — Retrato falado.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  20,
  // Categoria: define a música e os botões de reação.
  'paquera',
  // Tema de cores (a lista está em css/temas.css).
  'jardim',
  // Nome que aparece no painel de links.
  'Retrato falado',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'retrato',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'RETRATO FALADO',
      // Texto do último botão, que leva à tela final.
      fim: 'assinar o desenho ›',
      // Partes do desenho, uma por toque.
      etapas: [
        { parte: 'rosto', botao: 'começar o desenho', t: 'Testemunha ocular: eu. Lembro de *cada detalhe*.' },
        { parte: 'cabelo', botao: 'desenhar o cabelo', t: 'Esse *cabelo* não cabe em nenhum papel.' },
        {
          // Qual parte do desenho aparece.
          parte: 'olhos',
          // Texto do botão que a pessoa toca.
          botao: 'desenhar os olhos',
          // Texto deste item.
          t: 'Um olhar *inteligente* que entende tudo antes de eu terminar a frase.'
        },
        { parte: 'sorriso', botao: 'desenhar o sorriso', t: 'E esse *sorriso*. O lápis tremeu aqui, desculpa.' }
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '✎', qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Não ficou à altura.', 'Nenhum desenho chega perto. Mas é a mulher mais *linda* que este lápis já tentou.')],
  // Carta longa, aberta pelo botão "ler a carta". Linha em branco = \n\n.
  'Queria saber desenhar de verdade.\n\nIa passar horas tentando acertar a curva do seu sorriso, o jeito como o cabelo cai no seu rosto, o brilho no olhar de quem sempre tem alguma coisa inteligente para dizer.\n\nIa errar tudo, e ia adorar cada tentativa.\n\nVocê é uma mulher incrível. Só queria que você soubesse disso hoje.'
);
