/* ==========================================================
   capitulos-datas.js — capítulos extras dos links 61 a 80 (datas especiais).
   X(número do link, [capítulo 1, capítulo 2]).
   Cada link combina com a data dele.
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

// Capítulos extras do link 61. Eles aparecem depois da animação.
X(61, [
  // Capítulo de quadrinhos: cada toque abre uma frase.
  grade(
    // Título do capítulo.
    'Fatias do bolo',
    // Frases: uma para cada quadrinho.
    [
      'Fatia 1: *saúde*, para aproveitar.',
      'Fatia 2: *dinheiro*, para gastar à toa.',
      'Fatia 3: *amigos*, para dividir.',
      'Fatia 4: *amor*, para não faltar.',
      'Fatia 5: *viagem*, para respirar.',
      'Fatia 6: *descanso*, porque você merece.'
    ],
    // Frase final do capítulo.
    'Não sobrou nada no prato. *Foi tudo para você.*'
  ),
  // Capítulo de perguntas: a pessoa escolhe e recebe uma resposta.
  quiz('Primeiro pedido do ano', [
    [
      'O que você quer fazer neste novo ano de vida?',
      [
        ['Viajar mais', 'Que venham *muitos carimbos no passaporte*.'],
        ['Descansar', 'Pedido justo. *Você trabalhou muito.*'],
        ['Ser feliz', 'Esse é o principal, *e eu torço por isso*.']
      ]
    ],
    [
      'Quantos anos você está fazendo mesmo?',
      [
        ['Melhor não dizer', 'Segredo guardado. *Nem parece.*'],
        ['Com orgulho', 'Assim que se faz. *Cada ano valeu.*']
      ]
    ]
  ])
]);

// Capítulos extras do link 62. Eles aparecem depois da animação.
X(62, [
  // Capítulo de perguntas: a pessoa escolhe e recebe uma resposta.
  quiz('Balão de pedidos', [
    [
      'Qual cor combina com o seu novo ano?',
      [
        ['Amarelo', 'Ano de *sol e dinheiro no bolso*.'],
        ['Azul', 'Ano de *paz e sono bom*.'],
        ['Vermelho', 'Ano de *amor e coragem*.']
      ]
    ],
    [
      'Quem você chamaria para a festa?',
      [
        ['Todo mundo', 'Casa cheia! *Você merece.*'],
        ['Só quem importa', 'Sábia decisão. *Eu estou na lista?*']
      ]
    ]
  ]),
  // Jogo da memória: encontre os pares.
  memoria(
    // Título do capítulo.
    'Presentes da festa',
    // Pares: o desenho da carta e a frase que ele revela.
    [
      ['🎁', 'Um ano *mais leve*.'],
      ['🎈', 'Motivos *para rir à toa*.'],
      ['🎂', 'Gente boa *ao redor da mesa*.']
    ],
    // Frase final do capítulo.
    'Tudo isso e ainda *o meu abraço de brinde*.'
  )
]);

// Capítulos extras do link 63. Eles aparecem depois da animação.
X(63, [
  // Capítulo de segurar: a bola de luz cresce com o dedo encostado.
  segura(
    // Título do capítulo.
    'Primeira página',
    // Primeira frase, que ensina a segurar.
    'Segure para reler o nosso primeiro dia.',
    // Frases que aparecem enquanto segura.
    ['A roupa que você usava.', 'O que eu quase não disse.', 'O que *a gente sentiu*.'],
    // Frase final do capítulo.
    'Lembro de tudo. *Foi ali que começou.*'
  ),
  // Capítulo de ligar os pontos em ordem.
  pontos('Nosso primeiro ano', 'coracao', 'Ligue os doze meses do nosso ano.', 'Doze meses, *um coração inteiro*.')
]);

// Capítulos extras do link 64. Eles aparecem depois da animação.
X(64, [
  // Capítulo de batidas: cada toque faz o coração crescer.
  ritmo(
    // Título do capítulo.
    'Brindes da noite',
    // Frases: uma para cada toque no coração.
    [
      'Às brigas que passaram.',
      'Às viagens que fizemos.',
      'Às *contas que a gente pagou junto*.',
      'A *mais um ano com você*.'
    ],
    // Frase final do capítulo.
    'Copo vazio, *coração cheio*.'
  ),
  // Capítulo de perguntas: a pessoa escolhe e recebe uma resposta.
  quiz('Conversa à mesa', [
    [
      'Qual foi o melhor momento deste ano?',
      [
        ['Uma viagem', 'Toda viagem é boa *quando é com você*.'],
        ['Um dia em casa', 'Sofá e você: *minha lista completa*.'],
        ['Todos', 'Resposta certa. *Até os ruins.*']
      ]
    ],
    [
      'E o que vem no ano que vem?',
      [
        ['Mais planos', 'Pode trazer. *Eu topo todos.*'],
        ['Mais nós dois', 'É tudo que *eu quero também*.']
      ]
    ]
  ])
]);

// Capítulos extras do link 65. Eles aparecem depois da animação.
X(65, [
  // Capítulo de ligar os pontos em ordem.
  pontos('Constelação do mês', 'estrela', 'Ligue as estrelas deste mês.', 'Mais um mês desenhado *no nosso céu*.'),
  // Capítulo do medidor: arraste até o fim.
  medidor(
    // Título do capítulo.
    'Quanto te amo este mês',
    // Frases: mudam conforme o número sobe.
    [
      'Mais do que no mês passado.',
      'Mais do que ontem.',
      'Mais do que hoje de manhã.',
      'Mais do que *eu sei escrever*.'
    ],
    // Frase final do capítulo.
    'Mês que vem, *o medidor vai quebrar de novo*.'
  )
]);

// Capítulos extras do link 66. Eles aparecem depois da animação.
X(66, [
  // Capítulo de bolhas: estoure as palavras.
  bolhas(
    // Título do capítulo.
    'Corações na mira',
    // Palavras das bolhas.
    ['paixão', 'carinho', 'desejo', 'amizade', 'cuidado', 'promessa'],
    // Frase final do capítulo.
    'Acertei todos, *e todos eram seus*.'
  ),
  // Capítulo de segurar: a bola de luz cresce com o dedo encostado.
  segura(
    // Título do capítulo.
    'Coração flechado',
    // Primeira frase, que ensina a segurar.
    'Segure para puxar a flecha.',
    // Frases que aparecem enquanto segura.
    ['Doeu um pouco.', 'Depois esquentou.', 'Agora *não quero que saia*.'],
    // Frase final do capítulo.
    'Pode deixar a flecha aí. *Faz parte de mim.*'
  )
]);

// Capítulos extras do link 67. Eles aparecem depois da animação.
X(67, [
  // Capítulo de perguntas: a pessoa escolhe e recebe uma resposta.
  quiz('Promessas na ponte', [
    [
      'O que a gente promete hoje?',
      [
        ['Nunca dormir brigados', 'Promessa difícil, *mas eu assino*.'],
        ['Rir mais', 'Fácil. *Com você é automático.*'],
        ['Cuidar um do outro', 'Essa é *a mais importante de todas*.']
      ]
    ],
    [
      'E se a chave aparecer um dia?',
      [
        ['Joga de novo', 'Jogo quantas vezes for preciso. *Fica comigo.*'],
        ['Guarda', 'Guardo, e *nunca uso*.']
      ]
    ]
  ]),
  // Capítulo de quadrinhos: cada toque abre uma frase.
  grade(
    // Título do capítulo.
    'Cadeados vizinhos',
    // Frases: uma para cada quadrinho.
    [
      'Um para o nosso primeiro beijo.',
      'Um para *a nossa primeira viagem*.',
      'Um para *a nossa música*.',
      'Um para *o nosso sofá*.',
      'Um para *os nossos planos*.',
      'Um para *tudo que ainda vem*.'
    ],
    // Frase final do capítulo.
    'A ponte vai cair de tanto cadeado. *Pode cair.*'
  )
]);

// Capítulos extras do link 68. Eles aparecem depois da animação.
X(68, [
  // Capítulo do medidor: arraste até o fim.
  medidor(
    // Título do capítulo.
    'Nível do jogo',
    // Frases: mudam conforme o número sobe.
    [
      'Fase 1: o primeiro oi.',
      'Fase 2: o primeiro beijo.',
      'Fase 3: *dividir o controle*.',
      'Fase final: *zerar a vida juntos*.'
    ],
    // Frase final do capítulo.
    'Continue? *Sempre.*'
  ),
  // Capítulo de batidas: cada toque faz o coração crescer.
  ritmo(
    // Título do capítulo.
    'Combo do amor',
    // Frases: uma para cada toque no coração.
    ['Combo x2: abraço.', 'Combo x4: beijo.', 'Combo x8: *cafuné*.', 'Combo x16: *pedido de pizza*.'],
    // Frase final do capítulo.
    'Recorde batido. *Player 2, nunca saia do jogo.*'
  )
]);

// Capítulos extras do link 69. Eles aparecem depois da animação.
X(69, [
  // Capítulo de quadrinhos: cada toque abre uma frase.
  grade(
    // Título do capítulo.
    'Calendário do Advento',
    // Frases: uma para cada quadrinho.
    [
      'Dia 1: *montar a árvore*.',
      'Dia 2: *ligar para quem está longe*.',
      'Dia 3: *perdoar alguém*.',
      'Dia 4: *ceia com gente querida*.',
      'Dia 5: *abraço demorado*.',
      'Dia 6: *agradecer*.'
    ],
    // Frase final do capítulo.
    'Que o espírito do Natal *dure o ano inteiro*.'
  ),
  // Capítulo de bolhas: estoure as palavras.
  bolhas(
    // Título do capítulo.
    'Presentes sem embrulho',
    // Palavras das bolhas.
    ['paz', 'perdão', 'saúde', 'família', 'esperança', 'gratidão'],
    // Frase final do capítulo.
    'Nenhum destes cabe na árvore, *e todos são para você*.'
  )
]);

// Capítulos extras do link 70. Eles aparecem depois da animação.
X(70, [
  // Jogo da memória: encontre os pares.
  memoria(
    // Título do capítulo.
    'Enfeites do globo',
    // Pares: o desenho da carta e a frase que ele revela.
    [
      ['🎄', 'Uma árvore *cheia de luz*.'],
      ['🕯️', 'Uma vela *pelos que estão longe*.'],
      ['⛄', 'Um boneco de neve, *porque sonhar não custa*.']
    ],
    // Frase final do capítulo.
    'Dentro do globo *cabe todo o nosso carinho*.'
  ),
  // Capítulo de segurar: a bola de luz cresce com o dedo encostado.
  segura(
    // Título do capítulo.
    'Noite de Natal',
    // Primeira frase, que ensina a segurar.
    'Segure para acender a noite.',
    // Frases que aparecem enquanto segura.
    ['Primeiro as luzes da rua.', 'Depois as janelas.', 'Por último, *o coração de todo mundo*.'],
    // Frase final do capítulo.
    'Feliz Natal, *de um jeito que não acaba*.'
  )
]);

// Capítulos extras do link 71. Eles aparecem depois da animação.
X(71, [
  // Capítulo de batidas: cada toque faz o coração crescer.
  ritmo(
    // Título do capítulo.
    'Últimos segundos',
    // Frases: uma para cada toque no coração.
    ['Dez: respira.', 'Sete: agradece.', 'Quatro: *pede*.', 'Um: *solta o que pesou*.'],
    // Frase final do capítulo.
    'Zero. *Tudo novo de novo.*'
  ),
  // Capítulo de quadrinhos: cada toque abre uma frase.
  grade(
    // Título do capítulo.
    'Metas do ano',
    // Frases: uma para cada quadrinho.
    [
      'Dormir mais.',
      'Reclamar menos.',
      'Ligar para *quem importa*.',
      'Viajar *pelo menos uma vez*.',
      'Cuidar *da saúde*.',
      'Rir *todo santo dia*.'
    ],
    // Frase final do capítulo.
    'Se cumprir só a última, *já valeu o ano*.'
  )
]);

// Capítulos extras do link 72. Eles aparecem depois da animação.
X(72, [
  // Capítulo de bolhas: estoure as palavras.
  bolhas(
    // Título do capítulo.
    'Simpatias de Ano Novo',
    // Palavras das bolhas.
    ['roupa branca', 'lentilha', 'romã', 'champanhe', 'fogos', 'abraços'],
    // Frase final do capítulo.
    'Com tanta simpatia, *o ano não tem como dar errado*.'
  ),
  // Capítulo de perguntas: a pessoa escolhe e recebe uma resposta.
  quiz('Previsão da virada', [
    [
      'Qual cor você vai vestir?',
      [
        ['Branca', 'Paz garantida. *O mar agradece.*'],
        ['Amarela', 'Dinheiro à vista. *Divide comigo.*'],
        ['Vermelha', 'Paixão no ar. *Ano quente.*']
      ]
    ],
    [
      'Entrar no ano com o pé…',
      [
        ['Direito', 'Tradição é tradição. *Vai dar certo.*'],
        ['Dançando', 'Melhor ainda. *Os dois pés.*']
      ]
    ]
  ])
]);

// Capítulos extras do link 73. Eles aparecem depois da animação.
X(73, [
  // Capítulo de perguntas: a pessoa escolhe e recebe uma resposta.
  quiz('Conversa de cozinha', [
    [
      'Qual frase de mãe nunca falha?',
      [
        ['“Leva um casaco”', 'E sempre esfria. *Como você sabe?*'],
        ['“Eu avisei”', 'Avisou mesmo. *E eu não ouvi.*'],
        ['“Já comeu?”', 'A pergunta mais amorosa *do mundo*.']
      ]
    ],
    [
      'Qual é o melhor tempero da casa?',
      [
        ['O seu colo', 'Cura tudo, *sem receita médica*.'],
        ['A sua comida', 'Nenhum restaurante *chega perto*.']
      ]
    ]
  ]),
  // Capítulo de segurar: a bola de luz cresce com o dedo encostado.
  segura(
    // Título do capítulo.
    'Colo de mãe',
    // Primeira frase, que ensina a segurar.
    'Segure como quem abraça.',
    // Frases que aparecem enquanto segura.
    ['Lembrei do seu cheiro.', 'Lembrei da sua mão *na minha testa*.', 'Voltei a ter *cinco anos*.'],
    // Frase final do capítulo.
    'Não importa a idade: *seu colo é a minha casa*.'
  )
]);

// Capítulos extras do link 74. Eles aparecem depois da animação.
X(74, [
  // Capítulo do medidor: arraste até o fim.
  medidor(
    // Título do capítulo.
    'Resistência do material',
    // Frases: mudam conforme o número sobe.
    ['Aguenta chuva.', 'Aguenta boleto.', 'Aguenta *filho adolescente*.', 'Aguenta *tudo, em silêncio*.'],
    // Frase final do capítulo.
    'Material raro, *feito à mão, sem peça de reposição*.'
  ),
  // Jogo da memória: encontre os pares.
  memoria(
    // Título do capítulo.
    'Caixa de ferramentas',
    // Pares: o desenho da carta e a frase que ele revela.
    [
      ['🔧', 'Você conserta *tudo em casa*.'],
      ['🔨', 'Você me ensinou *a não desistir*.'],
      ['📏', 'Você me deu *a medida do que é certo*.']
    ],
    // Frase final do capítulo.
    'As melhores ferramentas que eu tenho *vieram de você*.'
  )
]);

// Capítulos extras do link 75. Eles aparecem depois da animação.
X(75, [
  // Capítulo de segurar: a bola de luz cresce com o dedo encostado.
  segura(
    // Título do capítulo.
    'Sua voz',
    // Primeira frase, que ensina a segurar.
    'Segure para deixar a sua voz crescer.',
    // Frases que aparecem enquanto segura.
    ['Disseram para falar baixo.', 'Disseram para sorrir mais.', 'Hoje *quem decide é você*.'],
    // Frase final do capítulo.
    'Sua voz *não precisa pedir licença*.'
  ),
  // Capítulo de batidas: cada toque faz o coração crescer.
  ritmo(
    // Título do capítulo.
    'Mulheres que abriram caminho',
    // Frases: uma para cada toque no coração.
    [
      'Para sua avó, que não pôde escolher.',
      'Para sua mãe, que lutou por isso.',
      'Para você, *que segue em frente*.',
      'Para as próximas, *que vão voar*.'
    ],
    // Frase final do capítulo.
    'Parabéns não basta. *Respeito todo dia.*'
  )
]);

// Capítulos extras do link 76. Eles aparecem depois da animação.
X(76, [
  // Jogo da memória: encontre os pares.
  memoria(
    // Título do capítulo.
    'Contas repetidas',
    // Pares: o desenho da carta e a frase que ele revela.
    [
      ['🟡', 'Uma conta pela *lealdade*.'],
      ['🔵', 'Uma conta pela *confiança*.'],
      ['🔴', 'Uma conta pela *risada alta*.']
    ],
    // Frase final do capítulo.
    'Pulseira de amizade *não sai nem no banho*.'
  ),
  // Capítulo de bolhas: estoure as palavras.
  bolhas(
    // Título do capítulo.
    'Fios trançados',
    // Palavras das bolhas.
    ['história', 'risada', 'segredo', 'conselho', 'zoeira', 'presença'],
    // Frase final do capítulo.
    'Trançados assim, *ninguém separa*.'
  )
]);

// Capítulos extras do link 77. Eles aparecem depois da animação.
X(77, [
  // Capítulo de bolhas: estoure as palavras.
  bolhas(
    // Título do capítulo.
    'Caça aos ovinhos',
    // Palavras das bolhas.
    ['ao leite', 'meio amargo', 'crocante', 'recheado', 'branco', 'com avelã'],
    // Frase final do capítulo.
    'Achou todos. *Agora divide comigo.*'
  ),
  // Capítulo do medidor: arraste até o fim.
  medidor(
    // Título do capítulo.
    'Doce na medida',
    // Frases: mudam conforme o número sobe.
    ['Um pedacinho.', 'Só mais um.', 'Meio ovo.', 'Acabou o ovo. *E a dieta.*'],
    // Frase final do capítulo.
    'Hoje está liberado. *É Páscoa.*'
  )
]);

// Capítulos extras do link 78. Eles aparecem depois da animação.
X(78, [
  // Capítulo de segurar: a bola de luz cresce com o dedo encostado.
  segura(
    // Título do capítulo.
    'Último esforço',
    // Primeira frase, que ensina a segurar.
    'Segure para dar o último passo.',
    // Frases que aparecem enquanto segura.
    ['As pernas pesaram.', 'O ar faltou.', 'E você *foi assim mesmo*.'],
    // Frase final do capítulo.
    'Isso se chama *coragem*.'
  ),
  // Capítulo de quadrinhos: cada toque abre uma frase.
  grade(
    // Título do capítulo.
    'Quem acreditou',
    // Frases: uma para cada quadrinho.
    [
      'Você, naquele dia difícil.',
      'Você, *estudando até tarde*.',
      'Você, *quando ouviu um não*.',
      'Você, *quando quis parar*.',
      'Você, *no dia seguinte*.',
      'Você, *hoje, aqui no topo*.'
    ],
    // Frase final do capítulo.
    'Ninguém subiu por você. *Foi tudo seu.*'
  )
]);

// Capítulos extras do link 79. Eles aparecem depois da animação.
X(79, [
  // Capítulo de quadrinhos: cada toque abre uma frase.
  grade(
    // Título do capítulo.
    'Boletim da vida',
    // Frases: uma para cada quadrinho.
    [
      'Nota 10 em *paciência*.',
      'Nota 10 em *dedicação*.',
      'Nota 10 em *ouvir*.',
      'Nota 10 em *inspirar*.',
      'Nota 10 em *acreditar*.',
      'Nota 10 em *mudar vidas*.'
    ],
    // Frase final do capítulo.
    'Média final: *eterna gratidão*.'
  ),
  // Capítulo de ligar os pontos em ordem.
  pontos(
    // Título do capítulo.
    'Estrela da turma',
    // Desenho: coracao, estrela ou diamante.
    'estrela',
    // Primeira frase.
    'Ligue os pontos como na lição de casa.',
    // Frase final do capítulo.
    'Essa estrelinha é para *quem me ensinou a brilhar*.'
  )
]);

// Capítulos extras do link 80. Eles aparecem depois da animação.
X(80, [
  // Capítulo de perguntas: a pessoa escolhe e recebe uma resposta.
  quiz('Votos renovados', [
    [
      'Na alegria e na tristeza…',
      [
        ['E na correria', 'E no boleto também. *Prometo.*'],
        ['E na segunda-feira', 'Coragem foi prometer isso. *Mantenho.*'],
        ['E no sofá', 'Principalmente *no sofá*.']
      ]
    ],
    [
      'Você casaria comigo de novo?',
      [
        ['Sim', 'Eu sabia. *Eu também, mil vezes.*'],
        ['Com outro buffet', 'Justo. *O bolo estava seco.*']
      ]
    ]
  ]),
  // Capítulo de batidas: cada toque faz o coração crescer.
  ritmo(
    // Título do capítulo.
    'Badaladas do sino',
    // Frases: uma para cada toque no coração.
    [
      'Um ano de casa nova.',
      'Mais um de *rotina boa*.',
      'Mais um de *mão dada*.',
      'E todos os outros *que ainda vêm*.'
    ],
    // Frase final do capítulo.
    'Enquanto o sino tocar, *eu digo sim*.'
  )
]);
