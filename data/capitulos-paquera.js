/* ==========================================================
   capitulos-paquera.js — capítulos extras dos links 1 a 20 (paquera).
   X(número do link, [capítulo 1, capítulo 2]).
   Tom: cantada, elogio e ousadia com charme.
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

// Capítulos extras do link 1. Eles aparecem depois da animação.
X(1, [
  // Capítulo de perguntas: a pessoa escolhe e recebe uma resposta.
  quiz('Interrogatório', [
    [
      'Onde você estava quando roubou o meu sossego?',
      [
        ['Eu? Sou inocente!', 'Inocente com esse sorriso? *Nenhum juiz acredita.*'],
        ['Não me lembro', 'Eu lembro. Foi quando você *mexeu no cabelo*.'],
        ['Foi sem querer', 'Sem querer já é assim. *Imagina de propósito.*']
      ]
    ],
    [
      'Você confessa que é linda assim de propósito?',
      [
        ['Confesso', 'Réu confessa. *Eu já desconfiava.*'],
        ['Nego tudo', 'Negar não adianta: *a prova está no espelho*.']
      ]
    ]
  ]),
  // Capítulo de segurar: a bola de luz cresce com o dedo encostado.
  segura(
    // Título do capítulo.
    'Olho no olho',
    // Primeira frase, que ensina a segurar.
    'Segure para prender esse olhar no meu.',
    // Frases que aparecem enquanto segura.
    ['Um segundo e eu esqueci o meu nome.', 'Dois segundos e perdi o medo.', 'Três segundos e *me entreguei*.'],
    // Frase final do capítulo.
    'Prisão perpétua no seu olhar. *Dispenso advogado.*'
  )
]);

// Capítulos extras do link 2. Eles aparecem depois da animação.
X(2, [
  // Capítulo do medidor: arraste até o fim.
  medidor(
    // Título do capítulo.
    'Quanto você sabe que é linda?',
    // Frases: mudam conforme o número sobe.
    [
      'Só isso? Você se subestima.',
      'Melhorou, mas *o radar discorda*.',
      'Quase lá. Continue, mulher.',
      'Agora sim: *nível de perigo máximo*.'
    ],
    // Frase final do capítulo.
    'O radar quebrou no teto. *A culpa foi sua.*'
  ),
  // Capítulo de quadrinhos: cada toque abre uma frase.
  grade(
    // Título do capítulo.
    'Pontos na carteira',
    // Frases: uma para cada quadrinho.
    [
      'Sorriu no sinal: *7 pontos*.',
      'Passou de cabelo solto: *carteira suspensa*.',
      'Falou bonito: *apreensão do meu juízo*.',
      'Olhou de lado: *guincho no meu coração*.',
      'Riu alto: *trânsito parado*.',
      'Existir assim: *sem direito a fiança*.'
    ],
    // Frase final do capítulo.
    'Total: infração gravíssima, e eu *adoro essa infratora*.'
  )
]);

// Capítulos extras do link 3. Eles aparecem depois da animação.
X(3, [
  // Jogo da memória: encontre os pares.
  memoria(
    // Título do capítulo.
    'Efeitos do tratamento',
    // Pares: o desenho da carta e a frase que ele revela.
    [
      ['💊', 'Uma dose do seu sorriso e *o dia melhora*.'],
      ['🌡️', 'Um olhar seu e *a febre sobe*.'],
      ['💓', 'Uma conversa sua e eu *perco a noção do tempo*.']
    ],
    // Frase final do capítulo.
    'Tratamento contínuo, *sem previsão de alta*.'
  ),
  // Capítulo de batidas: cada toque faz o coração crescer.
  ritmo(
    // Título do capítulo.
    'Exame do coração',
    // Frases: uma para cada toque no coração.
    [
      'Batimento normal. Você ainda não apareceu.',
      'Você apareceu. *Acelerou.*',
      'Você sorriu. *Disparou.*',
      'Mexeu no cabelo. *Chamem alguém.*',
      'Falou comigo. *Sem sinal de cura.*'
    ],
    // Frase final do capítulo.
    'Laudo: você é *a doença e o remédio*.'
  )
]);

// Capítulos extras do link 4. Eles aparecem depois da animação.
X(4, [
  // Capítulo de quadrinhos: cada toque abre uma frase.
  grade(
    // Título do capítulo.
    'Mapa do seu charme',
    // Frases: uma para cada quadrinho.
    [
      'Nas costas do seu sorriso: *calor de 40 graus*.',
      'No seu olhar: *neblina que me perde*.',
      'No seu cabelo: *brisa que hipnotiza*.',
      'Na sua risada: *dia de sol*.',
      'Na sua cabeça: *tempestade de ideias*.',
      'Na sua voz: *chuva boa de ouvir*.'
    ],
    // Frase final do capítulo.
    'Em qualquer região, *o clima é você*.'
  ),
  // Capítulo de bolhas: estoure as palavras.
  bolhas(
    // Título do capítulo.
    'Frente fria de elogios',
    // Palavras das bolhas.
    ['linda', 'charmosa', 'brilhante', 'elegante', 'cheirosa', 'inesquecível'],
    // Frase final do capítulo.
    'Pode abrir o guarda-chuva: *vai chover elogio* o dia inteiro.'
  )
]);

// Capítulos extras do link 5. Eles aparecem depois da animação.
X(5, [
  // Capítulo de batidas: cada toque faz o coração crescer.
  ritmo(
    // Título do capítulo.
    'Fichas da sorte',
    // Frases: uma para cada toque no coração.
    [
      'Primeira ficha: *seu sorriso*.',
      'Segunda ficha: *seu cabelo*.',
      'Terceira ficha: *sua inteligência*.',
      'Quarta ficha: *esse seu jeito de andar*.',
      'Fichas acabaram. *Apostei tudo em você.*'
    ],
    // Frase final do capítulo.
    'A casa sempre ganha, e a casa, hoje, *é você*.'
  ),
  // Capítulo de perguntas: a pessoa escolhe e recebe uma resposta.
  quiz('Aposta alta', [
    [
      'Em quem você apostaria?',
      [
        ['Na minha sorte', 'Sorte é quem cruza com você na rua.'],
        ['Em você', 'Boa escolha. *Eu apostei em você primeiro.*'],
        ['Em nós dois', 'Ousada! *Adorei.* Aposta aceita.']
      ]
    ],
    [
      'O que vale mais neste cassino?',
      [
        ['Meu sorriso', 'Esse vale a banca inteira, *com juros*.'],
        ['Minha cabeça', 'Essa não tem preço. *Só admiração.*']
      ]
    ]
  ])
]);

// Capítulos extras do link 6. Eles aparecem depois da animação.
X(6, [
  // Capítulo de bolhas: estoure as palavras.
  bolhas(
    // Título do capítulo.
    'Bilhetes extras',
    // Palavras das bolhas.
    ['irresistível', 'maravilhosa', 'genial', 'perfumada', 'poderosa', 'encantadora'],
    // Frase final do capítulo.
    'Seis bilhetes, seis prêmios: *todos com o seu nome*.'
  ),
  // Jogo da memória: encontre os pares.
  memoria(
    // Título do capítulo.
    'Sorteio do charme',
    // Pares: o desenho da carta e a frase que ele revela.
    [
      ['🍀', 'Sorte de quem te vê *logo cedo*.'],
      ['⭐', 'Você brilha *sem precisar de palco*.'],
      ['🎟️', 'Bilhete único: *mulher igual, não tem*.']
    ],
    // Frase final do capítulo.
    'Ganhei na loteria e nem precisei jogar. *Só te conheci.*'
  )
]);

// Capítulos extras do link 7. Eles aparecem depois da animação.
X(7, [
  // Capítulo de ligar os pontos em ordem.
  pontos(
    // Título do capítulo.
    'Ligue as estrelas no escuro',
    // Desenho: coracao, estrela ou diamante.
    'estrela',
    // Primeira frase.
    'Toque nos números, em ordem, e veja o que aparece.',
    // Frase final do capítulo.
    'Até no escuro dá para achar você: *é só seguir o brilho*.'
  ),
  // Capítulo do medidor: arraste até o fim.
  medidor(
    // Título do capítulo.
    'Força da sua luz',
    // Frases: mudam conforme o número sobe.
    [
      'Vela: já ilumina a sala.',
      'Lâmpada: já dá para ler seu sorriso.',
      'Farol: *os navios desviam a rota*.',
      'Sol: *ninguém olha direto*.'
    ],
    // Frase final do capítulo.
    'Conta de luz da cidade: *paga com o seu sorriso*.'
  )
]);

// Capítulos extras do link 8. Eles aparecem depois da animação.
X(8, [
  // Capítulo de segurar: a bola de luz cresce com o dedo encostado.
  segura(
    // Título do capítulo.
    'Coragem',
    // Primeira frase, que ensina a segurar.
    'Segure enquanto eu crio coragem.',
    // Frases que aparecem enquanto segura.
    ['Respirei fundo.', 'Escrevi tudo de novo.', 'Pensei no seu sorriso e *apertei enviar*.'],
    // Frase final do capítulo.
    'Valeu cada segundo de frio na barriga. *Você vale o risco.*'
  ),
  // Capítulo de quadrinhos: cada toque abre uma frase.
  grade(
    // Título do capítulo.
    'Rascunhos apagados',
    // Frases: uma para cada quadrinho.
    [
      '“Oi, sumida.” *Fraco demais.*',
      '“Você caiu do céu?” *Antigo demais.*',
      '“Que sorriso lindo.” *Verdade, mas curto.*',
      '“Esse cabelo, meu Deus.” *Melhorou.*',
      '“Inteligente e linda?” *Isso é covardia.*',
      '“Você é incrível.” *Esse eu mandei.*'
    ],
    // Frase final do capítulo.
    'Nenhum rascunho chega perto. *Você é melhor que qualquer texto.*'
  )
]);

// Capítulos extras do link 9. Eles aparecem depois da animação.
X(9, [
  // Capítulo de perguntas: a pessoa escolhe e recebe uma resposta.
  quiz('Enquete do jornal', [
    [
      'Leitores querem saber: você sabe o efeito que causa?',
      [
        ['Claro que sei', 'Perigosa *e* consciente. *Manchete garantida.*'],
        ['Nem imagino', 'Então é pior: *você derruba sem perceber*.'],
        ['Sem comentários', 'Mistério também é charme. *Vendeu mais jornal.*']
      ]
    ],
    [
      'Qual foi o assunto mais lido do dia?',
      [
        ['Meu sorriso', 'Esgotou nas bancas *antes do almoço*.'],
        ['Minha inteligência', 'Virou caderno especial, *com edição de luxo*.']
      ]
    ]
  ]),
  // Capítulo de bolhas: estoure as palavras.
  bolhas(
    // Título do capítulo.
    'Palavras cruzadas',
    // Palavras das bolhas.
    ['deslumbrante', 'esperta', 'cheia de charme', 'radiante', 'única', 'sem igual'],
    // Frase final do capítulo.
    'Coluna social de hoje: *só dá você*.'
  )
]);

// Capítulos extras do link 10. Eles aparecem depois da animação.
X(10, [
  // Jogo da memória: encontre os pares.
  memoria(
    // Título do capítulo.
    'Sala reservada',
    // Pares: o desenho da carta e a frase que ele revela.
    [
      ['🖼️', 'Nenhum quadro tem *esse sorriso*.'],
      ['🗿', 'Nenhuma escultura tem *essa elegância*.'],
      ['🌹', 'Nenhuma flor tem *esse perfume*.']
    ],
    // Frase final do capítulo.
    'O museu fechou. *Eu fiquei olhando você.*'
  ),
  // Capítulo de ligar os pontos em ordem.
  pontos(
    // Título do capítulo.
    'Assine a obra',
    // Desenho: coracao, estrela ou diamante.
    'diamante',
    // Primeira frase.
    'Toque nos números para revelar a joia da coleção.',
    // Frase final do capítulo.
    'A peça mais cara do acervo *é você*, e não está à venda.'
  )
]);

// Capítulos extras do link 11. Eles aparecem depois da animação.
X(11, [
  // Capítulo de quadrinhos: cada toque abre uma frase.
  grade(
    // Título do capítulo.
    'Sinônimos de você',
    // Frases: uma para cada quadrinho.
    [
      'Sinônimo de bonita: *você*.',
      'Sinônimo de esperta: *você*.',
      'Sinônimo de encanto: *você*.',
      'Sinônimo de elegância: *você*.',
      'Sinônimo de perigo: *você*.',
      'Sinônimo de “meu dia melhorou”: *você*.'
    ],
    // Frase final do capítulo.
    'O dicionário ficou repetitivo. *A culpa é sua.*'
  ),
  // Capítulo de perguntas: a pessoa escolhe e recebe uma resposta.
  quiz('Prova de português', [
    [
      'Complete: “Ela é tão linda que…',
      [
        ['…parou o trânsito”', 'Correto. *Nota dez.*'],
        ['…perdi a fala”', 'Correto. E *perdi a vírgula* também.'],
        ['…esqueci a frase”', 'Correto. Quem nunca?']
      ]
    ],
    [
      'Qual é o coletivo de elogios?',
      [
        ['Uma penca', 'Quase. O certo é *uma mensagem pra você*.'],
        ['Um caminhão', 'Aceito, e *ainda é pouco*.']
      ]
    ]
  ])
]);

// Capítulos extras do link 12. Eles aparecem depois da animação.
X(12, [
  // Capítulo do medidor: arraste até o fim.
  medidor(
    // Título do capítulo.
    'Distância até o seu sorriso',
    // Frases: mudam conforme o número sobe.
    [
      'Ainda longe: 300 quilômetros.',
      'Já dá para sentir o calor.',
      'Sinal de GPS *tremendo*.',
      'Chegando. *Coração em alta velocidade.*'
    ],
    // Frase final do capítulo.
    'Chegou. Daqui eu *não pego nem retorno*.'
  ),
  // Capítulo de batidas: cada toque faz o coração crescer.
  ritmo(
    // Título do capítulo.
    'Velocímetro do coração',
    // Frases: uma para cada toque no coração.
    [
      '60 por hora: pensei em você.',
      '90 por hora: lembrei do seu cabelo.',
      '120 por hora: *lembrei da sua risada*.',
      '180 por hora: *fui multado por suspirar*.'
    ],
    // Frase final do capítulo.
    'Sem freio, sem retorno, *direto para você*.'
  )
]);

// Capítulos extras do link 13. Eles aparecem depois da animação.
X(13, [
  // Capítulo de segurar: a bola de luz cresce com o dedo encostado.
  segura(
    // Título do capítulo.
    'Segure o extintor',
    // Primeira frase, que ensina a segurar.
    'Segure para tentar apagar esse fogo.',
    // Frases que aparecem enquanto segura.
    ['Não apagou.', 'Piorou.', 'Agora *o extintor pegou fogo*.'],
    // Frase final do capítulo.
    'Tem incêndio que a gente *não quer apagar*.'
  ),
  // Capítulo de bolhas: estoure as palavras.
  bolhas(
    // Título do capítulo.
    'Faíscas',
    // Palavras das bolhas.
    ['quente', 'atrevida', 'poderosa', 'ardente', 'marcante', 'mulherão'],
    // Frase final do capítulo.
    'Com tanta faísca assim, *eu aceito me queimar*.'
  )
]);

// Capítulos extras do link 14. Eles aparecem depois da animação.
X(14, [
  // Capítulo de ligar os pontos em ordem.
  pontos(
    // Título do capítulo.
    'Sua constelação',
    // Desenho: coracao, estrela ou diamante.
    'coracao',
    // Primeira frase.
    'Ligue as estrelas do seu mapa astral.',
    // Frase final do capítulo.
    'Os astros só confirmam o que *eu já tinha visto*.'
  ),
  // Capítulo de perguntas: a pessoa escolhe e recebe uma resposta.
  quiz('Pergunte às cartas', [
    [
      'O que você quer saber?',
      [
        ['Se estou linda hoje', 'As cartas riram. *Isso nem é pergunta.*'],
        ['Quem pensa em mim', 'Alguém que escreveu esta mensagem. *Olha só.*'],
        ['Meu futuro', 'Vejo muito elogio. *Pode se acostumar.*']
      ]
    ],
    [
      'Uma última carta. Aceita o destino?',
      [
        ['Aceito', 'Destino anotado: *ser admirada todo dia*.'],
        ['Depende', 'Charme até com o destino. *Sem comentários.*']
      ]
    ]
  ])
]);

// Capítulos extras do link 15. Eles aparecem depois da animação.
X(15, [
  // Capítulo de bolhas: estoure as palavras.
  bolhas(
    // Título do capítulo.
    'Botões do elevador',
    // Palavras das bolhas.
    [
      'andar do charme',
      'térreo do sorriso',
      'mezanino da beleza',
      'piso do olhar',
      'sala da mente',
      'suíte do encanto'
    ],
    // Frase final do capítulo.
    'Em qualquer andar, *quem manda no prédio é você*.'
  ),
  // Capítulo do medidor: arraste até o fim.
  medidor(
    // Título do capítulo.
    'Altura do seu charme',
    // Frases: mudam conforme o número sobe.
    [
      'Primeiro andar: nada mau.',
      'Décimo andar: já tem vertigem.',
      'Trigésimo: *faltou ar por aqui*.',
      'Acima das nuvens: *ninguém alcança*.'
    ],
    // Frase final do capítulo.
    'O prédio acabou, *mas o seu charme continua subindo*.'
  )
]);

// Capítulos extras do link 16. Eles aparecem depois da animação.
X(16, [
  // Capítulo de batidas: cada toque faz o coração crescer.
  ritmo(
    // Título do capítulo.
    'Pedido na cozinha',
    // Frases: uma para cada toque no coração.
    [
      'Mesa pronta para a mulher mais linda do salão.',
      'Vinho servido, *e ela nem precisou pedir*.',
      'O chef saiu da cozinha *só para olhar*.',
      'O salão inteiro *perdeu o apetite*.'
    ],
    // Frase final do capítulo.
    'Nesta casa, *o prato principal é o seu sorriso*.'
  ),
  // Capítulo de segurar: a bola de luz cresce com o dedo encostado.
  segura(
    // Título do capítulo.
    'Ponto certo',
    // Primeira frase, que ensina a segurar.
    'Segure até o tempero ficar no ponto.',
    // Frases que aparecem enquanto segura.
    ['Uma pitada de sorriso.', 'Uma colher de inteligência.', 'E *muita* pimenta.'],
    // Frase final do capítulo.
    'Do jeito que você é: *forte, marcante e impossível de esquecer*.'
  )
]);

// Capítulos extras do link 17. Eles aparecem depois da animação.
X(17, [
  // Capítulo do medidor: arraste até o fim.
  medidor(
    // Título do capítulo.
    'Volume do seu charme',
    // Frases: mudam conforme o número sobe.
    [
      'Baixinho: já toca fundo.',
      'Médio: os vizinhos pararam para ouvir.',
      'Alto: *o prédio dançou*.',
      'No máximo: *esse som não tem limite*.'
    ],
    // Frase final do capítulo.
    'Quebrei o botão de abaixar. *Fica assim mesmo.*'
  ),
  // Jogo da memória: encontre os pares.
  memoria(
    // Título do capítulo.
    'Coleção de discos',
    // Pares: o desenho da carta e a frase que ele revela.
    [
      ['🎵', 'Sua risada é *a minha faixa favorita*.'],
      ['🎧', 'Sua voz eu ouço *com os olhos fechados*.'],
      ['💿', 'Você é *disco raro*, sem reedição.']
    ],
    // Frase final do capítulo.
    'Essa coleção eu *não vendo por dinheiro nenhum*.'
  )
]);

// Capítulos extras do link 18. Eles aparecem depois da animação.
X(18, [
  // Capítulo de quadrinhos: cada toque abre uma frase.
  grade(
    // Título do capítulo.
    'Perguntas ao espelho',
    // Frases: uma para cada quadrinho.
    [
      'Quem tem o sorriso mais lindo? *Você.*',
      'Quem tem o cabelo mais bonito? *Você.*',
      'Quem é a mais inteligente? *Você.*',
      'Quem me deixa sem graça? *Você.*',
      'Quem manda neste reino? *Você.*',
      'Alguma dúvida? *Nenhuma.*'
    ],
    // Frase final do capítulo.
    'Espelho não mente. *Acostume-se.*'
  ),
  // Capítulo de ligar os pontos em ordem.
  pontos(
    // Título do capítulo.
    'Moldura de brilhantes',
    // Desenho: coracao, estrela ou diamante.
    'diamante',
    // Primeira frase.
    'Ligue os brilhantes da moldura.',
    // Frase final do capítulo.
    'Moldura de luxo para *a mulher mais incrível do castelo*.'
  )
]);

// Capítulos extras do link 19. Eles aparecem depois da animação.
X(19, [
  // Capítulo de segurar: a bola de luz cresce com o dedo encostado.
  segura(
    // Título do capítulo.
    'Rumo certo',
    // Primeira frase, que ensina a segurar.
    'Segure firme o timão.',
    // Frases que aparecem enquanto segura.
    ['O vento me empurrou para longe.', 'A tempestade me jogou para o lado.', 'E o mar *me trouxe até você*.'],
    // Frase final do capítulo.
    'Todo marinheiro tem um porto. *Eu achei o meu sorriso preferido.*'
  ),
  // Capítulo de batidas: cada toque faz o coração crescer.
  ritmo(
    // Título do capítulo.
    'Sinais de navegação',
    // Frases: uma para cada toque no coração.
    [
      'Sinal 1: seu olhar no horizonte.',
      'Sinal 2: seu cabelo ao vento.',
      'Sinal 3: *sua risada no meio do mar*.',
      'Sinal 4: *terra à vista*.'
    ],
    // Frase final do capítulo.
    'Pode anotar no diário de bordo: *encontrei o tesouro*.'
  )
]);

// Capítulos extras do link 20. Eles aparecem depois da animação.
X(20, [
  // Capítulo de batidas: cada toque faz o coração crescer.
  ritmo(
    // Título do capítulo.
    'Pinceladas',
    // Frases: uma para cada toque no coração.
    [
      'Primeira pincelada: seu olhar.',
      'Segunda: *o brilho dele*.',
      'Terceira: seu cabelo.',
      'Quarta: *o movimento dele*.',
      'Quinta: *e eu já tinha perdido a cabeça pelo quadro*.'
    ],
    // Frase final do capítulo.
    'Pintei de memória, porque *você não sai da minha cabeça*.'
  ),
  // Capítulo de quadrinhos: cada toque abre uma frase.
  grade(
    // Título do capítulo.
    'Anotações do artista',
    // Frases: uma para cada quadrinho.
    [
      'Nota: *o sorriso nasce no olhar*.',
      'Nota: *cabelo não cabe na moldura*.',
      'Nota: *mente brilhante não se desenha*.',
      'Nota: *elegância é de nascença*.',
      'Nota: *perfume, infelizmente, não se pinta*.',
      'Nota: *preciso de mais tinta*.'
    ],
    // Frase final do capítulo.
    'Caderno de esboços cheio. *Todo com você.*'
  )
]);
