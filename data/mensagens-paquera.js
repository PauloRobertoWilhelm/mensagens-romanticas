/* ==========================================================
   mensagens-paquera.js — ids 1 a 20 (categoria: paquera).
   Tom: cantada, elogio e ousadia com charme. Fala do sorriso, do cabelo, da
   inteligência e da mulher incrível que ela é. NENHUMA termina pedindo para sair.
   Cada mensagem usa uma arte só dela (js/artes-paquera.js).
   ========================================================== */

// 1 — Cartaz de procurada.
M(1, 'paquera', 'ouro', 'Procurada', abArte('procurada', {
  titulo: 'PROCURADA', sub: 'viva, linda e sorrindo',
  crimes: ['Assalto à mão armada com um *sorriso*', 'Porte ilegal de um *cabelo* que desmonta qualquer um', 'Uso abusivo de *inteligência* em conversa comum', 'Invasão da minha cabeça. *Até hoje não saiu*'],
  botao: 'ler a próxima acusação', sentenca: 'ouvir a sentença', carimbo: 'CULPADA',
  premio: 'Recompensa: todo o juízo que me restou.', fim: 'continuar ›'
}, { forma: '✦', qtd: 14 }), [
  F('Eu sou a vítima.', 'E não vou prestar queixa. Mulher assim *pode me roubar* todo dia.')
], 'Olha, eu tentei ser discreto.\n\nTentei não reparar no seu sorriso, tentei não perder o fio da conversa quando você mexe no cabelo, tentei fingir que a sua inteligência não me deixa sem resposta.\n\nNão deu. Você é o tipo de mulher que desorganiza a cabeça da gente com a maior elegância do mundo.\n\nSe isso for crime, pode me prender junto.');

// 2 — Radar e multa por excesso de beleza.
M(2, 'paquera', 'noite', 'Excesso de beleza', abArte('multa', {
  aviso: 'RADAR DE BELEZA · VIA PÚBLICA', medir: 'medir quem está passando', kmh: 347, botao: 'emitir a multa', titulo: 'Auto de infração nº 0001',
  campos: [['Infração', 'Excesso de *beleza* em via pública'], ['Agravante', 'Sorriu sem avisar e parou o trânsito'], ['Local', 'Exatamente por onde você passa'], ['Reincidência', 'Todo dia, e sem sinal de arrependimento'], ['Pena', 'Continuar linda assim, *sem direito a recurso*']],
  fim: 'pagar com um sorriso ›'
}, { forma: '✦', qtd: 10, cores: ['#ff5a4f', '#ffe45c'] }), [
  F('Infração mantida.', 'Pode recorrer à vontade. O juiz sou eu, e já declarei que *sou seu fã*.')
]);

// 3 — Bula do sorriso dela.
M(3, 'paquera', 'jardim', 'Bula do seu sorriso', abArte('bula', {
  nome: 'SORRISU®', dose: '100% natural · uso contínuo', tarja: 'CAUSA DEPENDÊNCIA', dica: 'toque para abrir a caixa',
  secoes: [['Para que serve', 'Melhora o dia de qualquer pessoa em *menos de dois segundos*.'], ['Composição', 'Um olhar que desarma, um cabelo que devia ser proibido e *inteligência em concentração máxima*.'], ['Efeitos colaterais', 'Suspiro sem motivo, perda do fio da meada e frio na barriga. *Muito comuns.*'], ['Superdose', 'Não existe antídoto. Eu procurei. *Ainda bem que não achei.*']],
  fim: 'tomar mais uma dose ›'
}, { forma: '💊', qtd: 8 }), [
  F('Mantenha ao alcance dos meus olhos.', 'Uso contínuo recomendado. *Eu já não consigo parar.*')
]);

// 4 — Previsão do tempo sobre ela.
M(4, 'paquera', 'oceano', 'Previsão do tempo', abArte('previsao', {
  canal: 'CANAL DO CORAÇÃO · AO VIVO', botao: 'próxima região', fim: 'desligar a TV ›',
  ticker: 'URGENTE: mulher incrível é vista na região e deixa todo mundo sem assunto · Meteorologistas não explicam tanta beleza em um dia só · Fique em casa, ou fique olhando',
  regioes: [
    { nome: 'Região do Sorriso', icone: 'sol', graus: 42, t: 'Sol forte o dia inteiro. *Sem previsão de nuvens.* Protetor não adianta.' },
    { nome: 'Litoral do Cabelo', icone: 'vento', graus: 31, t: 'Ventos que balançam tudo, *principalmente as minhas certezas*.' },
    { nome: 'Planalto da Inteligência', icone: 'raio', graus: 38, t: 'Raios de ideia a cada frase. *A mente mais brilhante do mapa.*' },
    { nome: 'Céu do seu Olhar', icone: 'arco', graus: 36, t: 'Abre um arco-íris quando você ri, e *nenhum satélite* explica.' }
  ]
}, { qtd: 0 }), [
  F('Previsão para amanhã:', 'Você, ainda mais linda. E eu sem *guarda-chuva nenhum* contra isso.')
]);

// 5 — Caça-níquel.
M(5, 'paquera', 'confete', 'Jackpot', abArte('jackpot', {
  titulo: 'JACKPOT', inicio: '?', puxe: 'toque na alavanca',
  simbolos: ['SORRISO', 'CABELO', 'OLHAR', 'CHARME', 'MENTE', 'VOZ', 'PRESENÇA'],
  giros: [
    { r: ['SORRISO', 'SORRISO', 'OLHAR'], f: 'Quase! Até a máquina *treme* quando você sorri.' },
    { r: ['CABELO', 'MENTE', 'CABELO'], f: 'Cabelo lindo, cabeça melhor ainda. *Combinação perigosa.*' },
    { r: ['VOCÊ', 'VOCÊ', 'VOCÊ'], f: 'TRÊS IGUAIS! Você é *o prêmio máximo* desta casa.' }
  ],
  fim: 'sacar o prêmio ›'
}, { forma: '💰', qtd: 10 }), [
  F('Banca quebrada.', 'Apostei minha sorte inteira e *tirei você* na cabeça. Essa máquina nunca mais paga igual.')
]);

// 6 — Raspadinha.
M(6, 'paquera', 'crepusculo', 'Bilhete premiado', abArte('raspadinha', {
  titulo: 'RASPE E GANHE', sub: 'raspe os três com o dedo', premios: ['Que sorriso', 'Que cabelo', 'Que mulher'],
  ganhou: 'Bilhete premiado! Em você, *tudo é prêmio*.', fim: 'retirar o prêmio ›'
}, { forma: '✦', qtd: 16 }), [
  F('Sem data de validade.', 'Enquanto você existir, *tem gente ganhando na loteria* só de te ver passar.')
]);

// 7 — Lanterna no escuro.
M(7, 'paquera', 'noite', 'Acabou a luz', abArte('lanterna', {
  dica: 'passe o dedo na tela para procurar', achados: ['Esse *sorriso* acende a sala', 'Esse *cabelo* devia ter alarme', 'Que *cabeça* brilhante', 'Mulher *incrível* à vista'],
  fecho: 'Nem precisava de lanterna. *A luz era você.*', fim: 'continuar ›'
}, { qtd: 0 }), [
  F('Voltou a energia.', 'E o bairro inteiro agradece, porque quem *ilumina* tudo por aqui é você.')
]);

// 8 — Conversa escrita e apagada.
M(8, 'paquera', 'aurora', 'Digitando...', abArte('digitando', {
  aviso: '💬 1 mensagem nova. Toque para abrir', contato: 'Alguém que te admira', online: 'online', digitando: 'digitando...',
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
  fim: 'ler o que ficou ›'
}, { qtd: 0 }), [
  F('Enviado. Sem arrependimento.', 'Escrevi, apaguei, escrevi de novo. *Você me tira até o medo.*')
]);

// 9 — Primeira página do jornal.
M(9, 'paquera', 'ouro', 'Edição extra', abArte('jornal', {
  nome: 'O Coração Diário', data: 'Edição extra · Tiragem: um exemplar, só seu', botao: 'ler a próxima edição', fim: 'fechar o jornal ›',
  edicoes: [
    { m: 'MULHER SORRI E PARALISA A CIDADE', s: 'Testemunhas perderam a fala e o ponto de ônibus', t: 'Especialistas confirmam: nunca um sorriso causou *tantos danos* em tão pouco tempo.' },
    { m: 'CABELO DELA ENTRA PARA A LISTA DE PATRIMÔNIOS', s: 'Vento pede desculpas por só ter ajudado', t: 'Visitantes relatam que, ao ver o movimento, *esqueceram o próprio nome*.' },
    { m: 'INTELIGÊNCIA DELA DERRUBA TODOS OS ARGUMENTOS', s: 'Debate termina em admiração geral', t: 'Fontes afirmam que a mulher mais linda da cidade *é também a mais esperta*. Não há defesa.' }
  ]
}, { forma: '📰', qtd: 8 }), [
  F('Última hora:', 'Autor destas matérias admite que *escreveu tudo apaixonado*. O jornal não pede desculpas.')
]);

// 10 — Galeria de arte.
M(10, 'paquera', 'noite', 'Obra-prima', abArte('museu', {
  botao: 'próxima obra ›', fim: 'sair da galeria ›',
  obras: [
    { arte: 'sorriso', titulo: 'O Sorriso', ficha: 'Técnica mista sobre o meu sossego. Acervo permanente da minha memória.' },
    { arte: 'cabelo', titulo: 'Ondas', ficha: 'Movimento puro. Os visitantes param, suspiram e *esquecem a hora*.' },
    { arte: 'mente', titulo: 'A Mente', ficha: 'A peça mais rara da coleção: quanto mais se olha, *mais há para ver*.' }
  ]
}, { qtd: 0 }), [
  F('Proibido tocar.', 'Mas ninguém disse nada sobre *ficar admirando* a noite inteira.')
]);

// 11 — Dicionário.
M(11, 'paquera', 'rosa', 'Novo dicionário', abArte('dicionario', {
  titulo: 'Dicionário de Você', dica: 'toque na página para virar', fim: 'fechar o livro ›',
  verbetes: [
    { t: 'sor.ri.so', c: 'substantivo masculino', d: 'Arma branca usada por você para acabar com o meu dia ruim.', e: '“Ela sorriu e eu *esqueci a senha do banco*.”' },
    { t: 'ca.be.lo', c: 'substantivo masculino', d: 'Fenômeno natural que balança e leva junto a atenção de quem está perto.', e: '“Ventava, e *ninguém olhou para mais nada*.”' },
    { t: 'in.te.li.gên.cia', c: 'substantivo feminino', d: 'O que me faz ouvir você por horas e ainda querer mais.', e: '“Ela explicou, e eu *me apaixonei pelo argumento*.”' }
  ],
  fecho: 'in.crí.vel (adjetivo):\n*ver você*.'
}, { forma: '❀', qtd: 12 }), [
  F('Nota do editor:', 'Faltam palavras no idioma pra te descrever. *Sigo tentando*, com muito prazer.')
]);

// 12 — GPS.
M(12, 'paquera', 'aurora', 'Recalculando', abArte('gps', {
  botao: 'recalcular rota', fim: 'encerrar a viagem ›',
  rotas: ['Em 200 metros, pare de disfarçar.', 'Rota recalculada. Todo caminho passa pelo seu *sorriso*.', 'Rota alternativa não encontrada. *Nem procurei direito.*'],
  chegada: 'Você chegou ao destino: *a mulher mais incrível do mapa*.'
}, { qtd: 0 }), [
  F('Sinal perdido.', 'Não adianta atualizar o mapa: todo pensamento meu *acaba em você*.')
]);

// 13 — Alarme de incêndio.
M(13, 'paquera', 'fogo', 'Alerta de incêndio', abArte('incendio', {
  alerta: 'ALERTA DE INCÊNDIO', temp0: '40°', abre: 'Foco de calor detectado. Causa provável: *você*.', botao: 'usar o extintor',
  frases: ['Piorou. Você *sorriu*.', 'Mexeu no *cabelo*. Perdemos o andar de cima.', 'Falou algo *inteligente*. O prédio inteiro caiu.', 'Os bombeiros pediram *o seu número*.'],
  temps: ['70°', '120°', '300°', '∞'], fecho: 'Caso encerrado. *Você é fogo*, e não tem seguro que cubra.', fim: 'sair do prédio ›'
}, { forma: '🔥', qtd: 0 }), [
  F('Laudo dos bombeiros:', 'Mulher altamente *inflamável*. Recomendo chegar perto mesmo assim.')
]);

// 14 — Tarô.
M(14, 'paquera', 'neon', 'As cartas não mentem', abArte('tarot', {
  titulo: 'O QUE AS CARTAS DIZEM DE VOCÊ', fim: 'guardar as cartas ›',
  cartas: [
    { ic: 'sol', nome: 'O SOL', t: 'Seu *sorriso*. Aquece até quem jurou não olhar.' },
    { ic: 'lua', nome: 'A LUA', t: 'Seu *cabelo* e seu mistério. Mexem com as marés, e comigo.' },
    { ic: 'estrela', nome: 'A ESTRELA', t: 'Sua *mente*. A coisa mais brilhante deste baralho.' }
  ]
}, { forma: '✧', qtd: 18 }), [
  F('Sua sina está traçada:', 'Vai continuar *linda*, e alguém vai continuar pensando em você. As cartas juram.')
]);

// 15 — Elevador.
M(15, 'paquera', 'ouro', 'Cobertura', abArte('elevador', {
  comeca: 'chamar o elevador', botao: 'subir mais', fim: 'ficar na cobertura ›',
  andares: [
    { n: 3, t: 'Terceiro andar: *sorrisos* que derrubam qualquer defesa.' },
    { n: 9, t: 'Nono andar: um *cabelo* que faz o elevador parar sozinho.' },
    { n: 17, t: 'Décimo sétimo: *inteligência* de deixar o síndico sem resposta.' },
    { n: 'C', t: 'Cobertura: a *mulher mais incrível* do prédio. Daqui não desço.' }
  ]
}, { forma: '✦', qtd: 10 }), [
  F('Você está aqui.', 'No ponto mais alto de todos os meus pensamentos. *Vista linda.*')
]);

// 16 — Cardápio de bistrô.
M(16, 'paquera', 'jardim', 'Prato do dia', abArte('cardapio', {
  titulo: 'Menu do Dia', sub: 'especialidades da casa, escolha uma', conta: 'A conta: *deixa que eu pago*, com juros de admiração.', fim: 'pedir a sobremesa ›',
  pratos: [
    { nome: 'Sorriso flambado', preco: 'meu juízo', desc: 'Servido quente, sem aviso prévio.', resposta: 'Excelente escolha, senhora. O chef *perdeu a receita* de tanto olhar pra você.' },
    { nome: 'Cabelo ao vento', preco: 'meu sono', desc: 'Leve, solto e impossível de esquecer.', resposta: 'Ótimo pedido. Essa mesa já parou *o salão inteiro*.' },
    { nome: 'Conversa inteligente', preco: 'meu orgulho', desc: 'Prato forte. A casa não se responsabiliza.', resposta: 'Delicado e forte, como *a senhora*. Até o chef pediu para ouvir.' }
  ]
}, { forma: '✧', qtd: 0 }), [
  F('A casa agradece.', 'Mulher com esse bom gosto *merece o melhor da vida*. E o melhor elogio do dia.')
]);

// 17 — Vitrola.
M(17, 'paquera', 'crepusculo', 'Lado A', abArte('vinil', {
  selo: 'Lado A\nVocê', dica: 'toque na vitrola para colocar a agulha', botao: 'próxima faixa ›', fim: 'virar o disco ›',
  faixas: [
    { n: 'FAIXA 1 · SORRISO', v: 'Se seu sorriso tocasse no rádio, *eu nunca trocava de estação*.' },
    { n: 'FAIXA 2 · CABELO', v: 'Tem ritmo no jeito como ele cai no seu ombro. *Eu danço só de olhar.*' },
    { n: 'FAIXA 3 · VOCÊ', v: 'Linda, inteligente, afinada com a vida. *Disco de platina.*' }
  ]
}, { forma: '♪', qtd: 16 }), [
  F('Lado B:', 'Também é você. Esse disco eu *ouço no repeat*, e nem disfarço.')
]);

// 18 — Espelho embaçado.
M(18, 'paquera', 'rosa', 'Espelho, espelho meu', abArte('espelho', {
  pergunta: 'Espelho, espelho meu…', reflexo: 'Existe alguém mais *incrível* do que você?', dica: 'limpe o espelho com o dedo',
  linhas: ['Eu sou um espelho, tenho obrigação de ser sincero.', 'Esse *sorriso* quebra o meu vidro.', 'Esse *cabelo* me deixa embaçado de novo.', 'A resposta é *não*. Pode conferir sempre que quiser.'],
  fim: 'continuar ›'
}, { forma: '✨', qtd: 12 }), [
  F('Sete anos de sorte.', 'Pra quem te olha todo dia. E quem me dera *ser esse espelho*.')
]);

// 19 — Bússola.
M(19, 'paquera', 'oceano', 'Meu norte', abArte('bussola', {
  norte: '▲ VOCÊ ▲', dica: 'arraste para o lado e gire a bússola', fim: 'seguir o norte ›',
  frases: ['Girei para o trabalho. Apontou para o seu *sorriso*.', 'Girei para o outro lado. Apontou para esse *cabelo*.', 'Pode girar o mundo. *Meu norte é você*, mulher.']
}, { forma: '✦', qtd: 12 }), [
  F('Perdido, com muito prazer.', 'Tem gente que se perde no mapa. Eu me perco é *no seu olhar*.')
]);

// 20 — Retrato falado.
M(20, 'paquera', 'jardim', 'Retrato falado', abArte('retrato', {
  titulo: 'RETRATO FALADO', fim: 'assinar o desenho ›',
  etapas: [
    { parte: 'rosto', botao: 'começar o desenho', t: 'Testemunha ocular: eu. Lembro de *cada detalhe*.' },
    { parte: 'cabelo', botao: 'desenhar o cabelo', t: 'Esse *cabelo* não cabe em nenhum papel.' },
    { parte: 'olhos', botao: 'desenhar os olhos', t: 'Um olhar *inteligente* que entende tudo antes de eu terminar a frase.' },
    { parte: 'sorriso', botao: 'desenhar o sorriso', t: 'E esse *sorriso*. O lápis tremeu aqui, desculpa.' }
  ]
}, { forma: '✎', qtd: 0 }), [
  F('Não ficou à altura.', 'Nenhum desenho chega perto. Mas é a mulher mais *linda* que este lápis já tentou.')
], 'Queria saber desenhar de verdade.\n\nIa passar horas tentando acertar a curva do seu sorriso, o jeito como o cabelo cai no seu rosto, o brilho no olhar de quem sempre tem alguma coisa inteligente para dizer.\n\nIa errar tudo, e ia adorar cada tentativa.\n\nVocê é uma mulher incrível. Só queria que você soubesse disso hoje.');
