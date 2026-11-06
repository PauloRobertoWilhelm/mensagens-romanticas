/* ==========================================================
   mensagens-amigos.js — ids 41 a 60 (categoria: amigos e amigas).
   Tom: gratidão, zoeira leve, companheirismo. Textos neutros (servem para amigo e amiga).
   Cada mensagem usa uma arte só dela (js/artes-amigos.js).
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

// 41 — Álbum de figurinhas.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  41,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'confete',
  // Nome que aparece no painel de links.
  'Figurinha rara',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'figurinhas',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'ÁLBUM DA NOSSA AMIZADE',
      // Texto do pacote.
      pacote: 'ABRIR PACOTE',
      // Última frase da animação.
      fecho: 'Álbum completo. *Você é a figurinha que ninguém troca.*',
      // Texto do último botão, que leva à tela final.
      fim: 'guardar o álbum ›',
      // Figurinhas do álbum.
      figs: [
        { e: '😂', t: 'Quem me faz *rir* na hora errada' },
        { e: '🛟', t: 'Quem aparece na *hora ruim*' },
        { e: '🤫', t: 'Quem guarda *meus segredos*' },
        { e: '🍕', t: 'Quem divide a *última fatia*' }
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '★', qtd: 12 }
  ),
  // A tela final desta mensagem.
  [F('Figurinha carimbada.', 'Passei a vida juntando gente. *A mais rara da coleção é você.*')],
  // Carta longa, aberta pelo botão "ler a carta". Linha em branco = \n\n.
  'Sem data, sem motivo, só vontade.\n\nTem gente que passa pela vida da gente e some. Tem gente que fica, mesmo quando não tem muita coisa pra dar em troca além da companhia.\n\nVocê é do segundo tipo. E isso, hoje em dia, vale ouro.\n\nValeu por cada conversa, cada risada, cada bronca necessária. Conta comigo, sempre.'
);

// 42 — Ficha de personagem.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  42,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'neon',
  // Nome que aparece no painel de links.
  'Nível máximo',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'rpg',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'MELHOR AMIZADE',
      // Linha do nível.
      nivel: 'NÍVEL 99 · CLASSE: PARCEIRA DE TUDO',
      // Texto do botão que a pessoa toca.
      botao: 'VER ATRIBUTOS',
      // Texto do último botão, que leva à tela final.
      fim: 'CONTINUAR',
      // Barras: nome e valor de 0 a 100.
      atributos: [
        ['LEALDADE', 100],
        ['ZOEIRA', 95],
        ['RESPONDE MENSAGEM', 42],
        ['ESTAR LÁ QUANDO PRECISA', 100]
      ],
      // Conquistas que pipocam.
      conquistas: ['★ DESBLOQUEADO: AGUENTOU MEU DRAMA', '★ DESBLOQUEADO: RIU DA MINHA PIADA RUIM']
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Fim de jogo? Nunca.', 'Essa campanha é *cooperativa até o fim*, e eu não troco de parceria.')]
);

// 43 — Prova de amizade.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  43,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'jardim',
  // Nome que aparece no painel de links.
  'Prova de amizade',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'prova',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'Avaliação final de amizade',
      // Linha do nome na prova.
      aluno: 'nome: a melhor pessoa da turma',
      // Frase final do extrato.
      nota: '10',
      // Comentário da professora.
      obs: 'Aprovação com louvor. Não precisa estudar *mais nada*.',
      // Texto do último botão, que leva à tela final.
      fim: 'entregar a prova ›',
      // Perguntas da prova.
      questoes: [
        {
          // Pergunta.
          p: '1. Quem sempre aparece quando dá ruim?',
          // Opções de resposta.
          o: ['Você', 'Você, de novo', 'Adivinha: você'],
          // Resultado que aparece neste item.
          r: 'Certíssimo!'
        },
        {
          // Pergunta.
          p: '2. Quem ri das minhas piores piadas?',
          // Opções de resposta.
          o: ['Só você', 'Ninguém mais', 'Você, por pena'],
          // Resultado que aparece neste item.
          r: 'Essa também vale!'
        },
        {
          // Pergunta.
          p: '3. Sem você, minha vida seria:',
          // Opções de resposta.
          o: ['Mais chata', 'Bem mais chata', 'Insuportável'],
          // Resultado que aparece neste item.
          r: 'Todas certas, *e eu nem colei*.'
        }
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Boletim fechado.', 'Em amizade, *sua média é a maior da escola*. Passei de ano só por te conhecer.')]
);

// 44 — Pescaria.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  44,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'oceano',
  // Nome que aparece no painel de links.
  'Pesca do dia',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'pesca',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'Vamos ver o que a vida fisgou.',
      // Texto do botão que a pessoa toca.
      botao: 'segure para puxar a linha',
      // Texto do último botão, que leva à tela final.
      fim: 'voltar para a margem ›',
      // O que vem no anzol: desenho e frase.
      pescas: [
        { e: '🥾', t: 'Uma bota velha. Como as minhas amizades antigas.' },
        { e: '🐟', t: 'Um peixe, e ele *fugiu*, igual aos meus compromissos.' },
        { e: '💎', t: 'Achei! *Uma amizade rara*, e ela é você.' }
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Melhor pescaria da vida.', 'No mar de gente desse mundo, *eu fisguei a pessoa certa*.')]
);

// 45 — Bateria eletrônica.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  45,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'fogo',
  // Nome que aparece no painel de links.
  'Bora fazer barulho',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'pads',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'BANDA DOS DOIS',
      // Primeira frase que aparece.
      abre: 'Toque em todos os pads!',
      // Nomes dos botões da bateria.
      pads: ['BUMBO', 'CAIXA', 'CHIMBAL', 'TOM', 'SURDO', 'PRATO'],
      // Texto do último botão, que leva à tela final.
      fim: 'fim do show ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Essa é pela *risada alta*.',
        'Essa, pelas *histórias* que a gente não conta.',
        'Essa, pela *zoeira* sem fim.',
        'Essa, por quem *fica até o fim* da festa.',
        'Essa, pela *amizade* que faz barulho.',
        'E esse prato é *pra acordar o prédio*!'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Bis! Bis! Bis!', 'Nosso show nunca termina. E *a plateia é só a gente*, do jeito certo.')]
);

// 46 — Boleto da amizade.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  46,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'noite',
  // Nome que aparece no painel de links.
  'Boleto da amizade',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'boleto',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Nome do banco.
      banco: 'Banco da Amizade S.A.',
      // Texto do botão que a pessoa toca.
      botao: 'pagar com um abraço',
      // Palavra do carimbo.
      carimbo: 'PAGO',
      // Texto do último botão, que leva à tela final.
      fim: 'guardar o comprovante ›',
      // Linhas do papel: cada uma tem rótulo e valor.
      campos: [
        ['Beneficiário', 'Eu, que te devo muito'],
        ['Referente a', 'Risadas, conselhos e colos'],
        ['Vencimento', 'Nunca'],
        ['Valor', '*Impagável*']
      ],
      // Última frase da animação.
      fecho: 'Dívida quitada? *Nem em mil anos.* Vou seguir devendo com gosto.'
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 10 }
  ),
  // A tela final desta mensagem.
  [F('Nada a declarar.', 'Tem coisa que dinheiro não paga. *Valeu por tudo mesmo.*')]
);

// 47 — Pódio.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  47,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'ouro',
  // Nome que aparece no painel de links.
  'Pódio das amizades',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'podio',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'CAMPEONATO DE AMIZADE',
      // Nome do 3º lugar.
      terceiro: 'Meu cachorro',
      // Nome do 2º lugar.
      segundo: 'Minha cama',
      // Nome do 1º lugar.
      primeiro: 'Você',
      // Texto do botão que a pessoa toca.
      botao: 'próximo colocado',
      // Texto do botão que revela o campeão.
      ouro: 'revelar o campeão',
      // Texto do último botão, que leva à tela final.
      fim: 'sair do pódio ›',
      // Última frase da animação.
      fecho: 'Foi por pouco, mas o campeão *é você*. Sem VAR, sem recurso.'
    },
    // Partículas do fundo desta mensagem.
    { forma: '★', qtd: 10 }
  ),
  // A tela final desta mensagem.
  [F('Hino nacional, por favor.', 'Medalha de ouro em *estar sempre presente*. Merecidíssima.')]
);

// 48 — Estrada à noite.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  48,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'aurora',
  // Nome que aparece no painel de links.
  'Luz na estrada',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'estrada',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Texto do botão que começa.
      comecar: 'pegar a estrada',
      // Texto do botão que a pessoa toca.
      botao: 'acelerar',
      // Texto do último botão, que leva à tela final.
      fim: 'parar o carro ›',
      // Frases das placas da estrada.
      placas: [
        'Próxima saída: *histórias que a gente vive contando*',
        'Atenção: trecho difícil, *mas você veio junto*',
        'Destino: não importa. *Companhia: a melhor*'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Viagem sem volta.', 'Pode ser longe, pode ser perto. *Com você eu vou até o fim da estrada.*')]
);

// 49 — Cacto.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  49,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'jardim',
  // Nome que aparece no painel de links.
  'Amizade tipo cacto',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'cacto',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'Nossa amizade é tipo cacto.',
      // Texto do botão que a pessoa toca.
      botao: 'regar',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Passa meses *sem água* e não morre.',
        'Tem seus *espinhos*, a gente sabe.',
        'Quem vê de fora nem imagina *a força* que tem.',
        'E, quando menos se espera, *dá flor*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Não precisa regar sempre.', 'Tem amizade que aguenta seca, distância e correria. *A nossa é dessas.*')]
);

// 50 — Fita VHS.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  50,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'crepusculo',
  // Nome que aparece no painel de links.
  'Fita da amizade',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'vhs',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Palavra enquanto a fita volta.
      rebobina: '◀◀ REBOBINANDO',
      // Palavra enquanto a fita toca.
      tocando: '▶ PLAY',
      // Texto do botão de play.
      play: '▶ apertar play',
      // Texto do último botão, que leva à tela final.
      fim: '■ parar a fita',
      // Frases da fita.
      memorias: [
        'Cena 1: a gente sem dinheiro, rindo de tudo.',
        'Cena 2: aquela história que *nunca vamos contar* pra ninguém.',
        'Cena 3: você do meu lado, *no dia em que eu mais precisei*.',
        'Melhores momentos da minha vida: *quase todos têm você*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Fim da fita.', 'Essa eu não gravo por cima de jeito nenhum. *Vai pra sempre na coleção.*')]
);

// 51 — Máquina de garra.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  51,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'confete',
  // Nome que aparece no painel de links.
  'Prêmio da garra',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'garra',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'PEGUE UM PRÊMIO',
      // Texto do botão que a pessoa toca.
      botao: 'soltar a garra',
      // Texto do último botão, que leva à tela final.
      fim: 'levar os prêmios ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Prêmio: *um ombro* pra qualquer hora.',
        'Prêmio: *um conselho* que você não pediu.',
        'Prêmio máximo: *minha amizade*, sem devolução.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '★', qtd: 10 }
  ),
  // A tela final desta mensagem.
  [F('Ganhou tudo.', 'Essa máquina nunca me deu nada. *Quem me deu sorte foi você.*')]
);

// 52 — Dossiê.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  52,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'neon',
  // Nome que aparece no painel de links.
  'Arquivo confidencial',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'dossie',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'CONFIDENCIAL',
      // Linha do código do arquivo.
      codigo: 'Processo nº 007 · Sujeito: você',
      // Frase pequena que ensina o que fazer.
      dica: 'toque nas tarjas pretas',
      // Palavra do carimbo.
      carimbo: 'MELHOR AMIZADE',
      // Texto do último botão, que leva à tela final.
      fim: 'queimar o arquivo ›',
      // Linhas de texto, na ordem em que aparecem.
      linhas: [
        ['Conhecida por:', 'rir na hora *errada*'],
        ['Sabe de:', 'tudo o que *eu já fiz*'],
        ['Perigo:', 'me convencer de *qualquer ideia*'],
        ['Veredito:', 'essencial para a *minha vida*']
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Este arquivo se autodestrói.', 'Mas nossa amizade não. *Você sabe demais* para eu te deixar ir embora.')]
);

// 53 — Postais.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  53,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'oceano',
  // Nome que aparece no painel de links.
  'Postais de nós',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'postais',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'deslize o postal para o lado',
      // Texto do último botão, que leva à tela final.
      fim: 'guardar os postais ›',
      // Cartões da pilha.
      postais: [
        { l: 'Saudades!', t: 'Mesmo longe, *eu te carrego* em toda história que eu conto.' },
        { l: 'Tempo bom', t: 'Tudo fica melhor *quando você tá junto*.' },
        { l: 'Volta logo', t: 'Sem você, a resenha *fica sem graça*.' }
      ],
      // Última frase da animação.
      fecho: 'Não importa onde a gente esteja. *Amizade não tem CEP.*'
    },
    // Partículas do fundo desta mensagem.
    { forma: '✈', qtd: 8 }
  ),
  // A tela final desta mensagem.
  [F('Volta logo.', 'Distância é só um detalhe. *Eu te guardo do mesmo jeito.*')]
);

// 54 — Botão vermelho.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  54,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'fogo',
  // Nome que aparece no painel de links.
  'Não aperte',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'botao',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase de aviso em cima da tela.
      aviso: 'PERIGO · NÃO APERTE',
      // Texto da etiqueta.
      rotulo: 'NÃO APERTE',
      // Primeira frase que aparece.
      abre: 'Sério. Não aperta.',
      // Texto do último botão, que leva à tela final.
      fim: 'fugir do local ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Você apertou. *Claro* que apertou.',
        'De novo?! *Típico de você.*',
        'Por isso eu te amo, sua *péssima influência*.',
        'Sistema de zoeira *fora de controle*.',
        'Melhor pessoa pra *fazer besteira* junto.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Nada sob controle.', 'E é assim que eu gosto. Vida sem você *seria muito mais segura e bem mais chata*.')]
);

// 55 — Rádio comunicador.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  55,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'aurora',
  // Nome que aparece no painel de links.
  'Câmbio',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'radio',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Texto do botão que a pessoa toca.
      botao: 'segure para falar',
      // Texto do visor parado.
      espera: 'Canal aberto. Aguardando...',
      // Texto do visor ao segurar.
      transmitindo: 'Transmitindo...',
      // Texto do último botão, que leva à tela final.
      fim: 'câmbio, desligo ›',
      // Respostas do rádio.
      falas: [
        'Na escuta? *Sempre.* Câmbio.',
        'Se der ruim, *chama que eu vou*. Câmbio.',
        'Em qualquer frequência, *conta comigo*. Câmbio.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Câmbio final.', 'Eu mudo de cidade, de emprego, de tudo. *Essa frequência eu não mudo.*')]
);

// 56 — Ligação de madrugada.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  56,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'noite',
  // Nome que aparece no painel de links.
  'Três da manhã',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'ligacao',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Hora que aparece na chamada.
      hora: '03:07',
      // Nome no topo da conversa.
      contato: 'Quem sempre atende',
      // Linha embaixo do nome.
      estado: 'chamando...',
      // Frase pequena que ensina o que fazer.
      dica: 'deslize para atender',
      // Texto do último botão, que leva à tela final.
      fim: 'desligar ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Tá acordando? Não importa, *eu sei que você atende*.',
        'Poucas pessoas têm passe livre pras 3 da manhã.',
        'Você é *a primeira* da lista.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Ligação encerrada.', 'Se um dia tocar o seu telefone a essa hora, *é porque eu confio em você*.')]
);

// 57 — Diploma.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  57,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'ouro',
  // Nome que aparece no painel de links.
  'Diploma de amizade',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'diploma',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Nome no alto do diploma.
      instituicao: 'UNIVERSIDADE DA VIDA',
      // Título que aparece em cima.
      titulo: 'Diploma de Honra',
      // Texto do diploma.
      corpo: 'Conferido a você, pelos serviços prestados em *escuta, zoeira e paciência*, sem nunca cobrar nada.',
      // Quem assina.
      quem: 'Reitoria do Meu Coração',
      // Texto do botão que a pessoa toca.
      botao: 'assinar',
      // Texto do último botão, que leva à tela final.
      fim: 'pendurar na parede ›'
    },
    // Partículas do fundo desta mensagem.
    { forma: '✧', qtd: 12 }
  ),
  // A tela final desta mensagem.
  [F('Formatura eterna.', 'Sem você eu não teria *passado em metade* das matérias da vida.')]
);

// 58 — Porta da geladeira.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  58,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'crepusculo',
  // Nome que aparece no painel de links.
  'Recado na geladeira',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'geladeira',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'toque nos recados para tirar',
      // Texto do último botão, que leva à tela final.
      fim: 'fechar a geladeira ›',
      // Recados da geladeira.
      recados: [
        'Bebe *água*, gênio',
        'Você é *melhor* do que pensa',
        'Eu sei que hoje *foi difícil*',
        'Come alguma coisa, *por favor*'
      ],
      // Última frase da animação.
      fecho: 'Recado final: *tô aqui, viu?* Sempre.'
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Assinado: quem se importa.', 'Se a semana apertar, *lê esses recados de novo*.')]
);

// 59 — Biscoito da sorte.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  59,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'jardim',
  // Nome que aparece no painel de links.
  'Biscoito da sorte',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'biscoito',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'toque 3 vezes para quebrar',
      // Frase do papelzinho.
      sorte: 'Sua sorte de hoje: *você tem um amigo* que pensou em você sem motivo.',
      // Números da sorte.
      numeros: 'números da sorte: 1 · 4 · 7 · sempre',
      // Texto do último botão, que leva à tela final.
      fim: 'comer o biscoito ›'
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Previsão confirmada.', 'Nem precisava de biscoito. *A sorte foi te conhecer.*')]
);

// 60 — Piñata.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  60,
  // Categoria: define a música e os botões de reação.
  'amigos',
  // Tema de cores (a lista está em css/temas.css).
  'confete',
  // Nome que aparece no painel de links.
  'Piñata da amizade',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'pinata',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'toque na piñata para bater',
      // Última frase da animação.
      fecho: 'Estourou! *Saiu tudo que eu sinto por você.*',
      // Texto do último botão, que leva à tela final.
      fim: 'recolher os doces ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Essa é pela vez que você *me deixou no vácuo*.',
        'Essa é por *rir da minha cara*.',
        'Essa é por *saber demais*.',
        'E essa é por eu *não viver sem você*!'
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '🍬', qtd: 10 }
  ),
  // A tela final desta mensagem.
  [F('Parabéns por existir.', 'Sem data, sem motivo. *Só porque a vida é melhor com você nela.*')]
);
