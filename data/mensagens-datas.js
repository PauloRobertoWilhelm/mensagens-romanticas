/* ==========================================================
   mensagens-datas.js — ids 61 a 80 (categoria: datas especiais).
   Aniversário, aniversário de namoro, Dia dos Namorados, Natal, Ano Novo,
   Dia das Mães, Pais, Mulher, Amigo, Páscoa, conquista, Professores, casamento.
   Cada mensagem usa uma arte só dela (js/artes-datas.js).
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

// 61 — Bolo de aniversário.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  61,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'confete',
  // Nome que aparece no painel de links.
  'Apague as velas',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'bolo',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'Toque nas velas para apagar. Cada uma é um desejo.',
      // Última frase da animação.
      fecho: '*Feliz aniversário!* Que venha o seu melhor ano.',
      // Texto do último botão, que leva à tela final.
      fim: 'cortar o bolo ›',
      // Desejos, um para cada toque.
      desejos: [
        'Que não falte *saúde*.',
        'Que sobre *motivo pra rir*.',
        'Que venha *paz* na hora de dormir.',
        'Que apareça *gente boa* pelo caminho.',
        'E que seus *sonhos* saiam do papel.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 14 }
  ),
  // A tela final desta mensagem.
  [F('Parabéns! 🎂', 'Que esse novo ciclo traga *tudo de bom* que você merece.')],
  // Carta longa, aberta pelo botão "ler a carta". Linha em branco = \n\n.
  'Hoje o dia é seu, então o resto do mundo pode esperar.\n\nQuero que você receba esse dia com o sorriso que merece. Que o novo ciclo venha com saúde, com gente querida por perto e com aquelas pequenas alegrias que enchem a vida.\n\nSe eu pudesse, te dava o dia inteiro de folga do mundo.\n\nFeliz aniversário. Que seja um ano lindo.'
);

// 62 — Balões.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  62,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'oceano',
  // Nome que aparece no painel de links.
  'Estoure os desejos',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'baloes',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'Hoje é o seu dia. Estoure os balões!',
      // Última frase da animação.
      fecho: 'Todos os desejos soltos. *Agora é só viver.*',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›',
      // Desejos, um para cada toque.
      desejos: [
        'Que você *sorria mais*.',
        'Que cuidem de você *como você cuida*.',
        'Que seus planos *saiam do papel*.',
        'Que a leveza *nunca te abandone*.',
        'Que esse ano *te surpreenda*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Feliz aniversário.', 'Que esse seja *seu melhor ano*. Você merece. 🎉')]
);

// 63 — Doze meses.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  63,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'rosa',
  // Nome que aparece no painel de links.
  'Um ano de nós',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'doze',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Palavra embaixo do número.
      unidade: 'meses',
      // Frase pequena que ensina o que fazer.
      dica: 'segure o círculo para passar o ano',
      // Texto do último botão, que leva à tela final.
      fim: 'guardar esse ano ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Janeiro: *a gente ainda se descobria*.',
        'Abril: já sabia *o seu café* de cor.',
        'Julho: *primeira briga*, primeiro perdão.',
        'Outubro: casa virou *onde você está*.'
      ],
      // Última frase da animação.
      fecho: 'Doze meses e eu *escolheria tudo de novo*.'
    },
    // Partículas do fundo desta mensagem.
    { forma: '♥', qtd: 10 }
  ),
  // A tela final desta mensagem.
  [F('Feliz aniversário de namoro.', 'Foi só o primeiro capítulo. *Tenho muita página pra escrever com você.*')],
  // Carta longa, aberta pelo botão "ler a carta". Linha em branco = \n\n.
  'Meu amor,\n\nFaz tempo que eu quero te agradecer por tudo que a gente construiu. Parece pouco, mas cada dia ao seu lado foi um tijolo desse lugar que a gente chama de nós.\n\nTivemos dias leves, dias pesados, discussões bobas e risadas que ninguém mais entende. E mesmo assim, eu escolheria tudo de novo.\n\nFeliz aniversário de namoro. Que venham muitos mais.'
);

// 64 — Brinde de aniversário de namoro.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  64,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'fogo',
  // Nome que aparece no painel de links.
  'Tim-tim',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'brinde',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'Mais um ano juntos. Isso pede um brinde.',
      // Frase pequena que ensina o que fazer.
      dica: 'arraste a taça até a outra',
      // Texto do último botão, que leva à tela final.
      fim: 'beber ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Às risadas que a gente deu.',
        'Às brigas que a gente *venceu junto*.',
        'E a tudo que *ainda vem pela frente*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '✧', qtd: 10 }
  ),
  // A tela final desta mensagem.
  [F('Saúde, meu amor.', 'De todos os anos que eu vivi, *os melhores têm você*.')]
);

// 65 — Fases da Lua.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  65,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'aurora',
  // Nome que aparece no painel de links.
  'Mesversário',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'luas',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'arraste a lua no trilho',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Lua nova: *começamos mais um mês*.',
        'Crescente: *meu amor também*.',
        'Lua cheia: *assim que eu fico* com você.',
        'Minguante: é a única coisa que mingua.'
      ],
      // Última frase da animação.
      fecho: 'A Lua muda todo mês. *O que eu sinto, não.*'
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 14 }
  ),
  // A tela final desta mensagem.
  [F('Feliz mesversário.', 'Mais um mês *te amando*, mais um mês com vontade de mais mil.')]
);

// 66 — Cupido.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  66,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'rosa',
  // Nome que aparece no painel de links.
  'Flechada',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'cupido',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'puxe o arco para baixo e solte',
      // Texto do último botão, que leva à tela final.
      fim: 'guardar o arco ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Primeira flecha: *seu sorriso*.',
        'Segunda flecha: *o seu jeito*.',
        'Terceira: nem precisava, *eu já era seu*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Feliz Dia dos Namorados.', 'O cupido nem precisou mirar. *Você foi certeira.*')]
);

// 67 — Cadeado na ponte.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  67,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'crepusculo',
  // Nome que aparece no painel de links.
  'Cadeado do amor',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'cadeado',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Símbolo no cadeado.
      iniciais: '♥',
      // Primeira frase que aparece.
      abre: 'Dizem que cadeado em ponte é pra sempre.',
      // Frase pequena que ensina o que fazer.
      dica: 'arraste a chave até o cadeado',
      // Texto do último botão, que leva à tela final.
      fim: 'seguir pela ponte ›',
      // Frases que aparecem, uma de cada vez.
      frases: ['Fechei.', 'E joguei a chave *no rio mais fundo* que achei.', 'Agora não tem saída. *Ainda bem.*']
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 10 }
  ),
  // A tela final desta mensagem.
  [F('Trancado neste Dia dos Namorados.', 'Meu coração é seu, e *a chave eu perdi de propósito*.')]
);

// 68 — Fliperama.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  68,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'neon',
  // Nome que aparece no painel de links.
  'Player 2',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'pixel',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Placar em cima da tela.
      score: 'HIGH SCORE 999999',
      // Primeira frase que aparece.
      abre: 'INSERT COIN',
      // Texto da plaquinha do quadro.
      ficha: 'INSERIR FICHA',
      // Texto do último botão, que leva à tela final.
      fim: 'CONTINUAR',
      // Frases que aparecem, uma de cada vez.
      frases: ['PLAYER 2 ENTROU NO JOGO', 'COMBO: *RISADA + ABRAÇO*', 'VIDA INFINITA *COM VOCÊ*']
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Feliz Dia dos Namorados, player 2.', 'Em todas as fases do jogo, *eu quero você no segundo controle*.')]
);

// 69 — Árvore de Natal.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  69,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'ouro',
  // Nome que aparece no painel de links.
  'Árvore acesa',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'arvore',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'Toque nas bolas para acender a árvore.',
      // Última frase da animação.
      fecho: 'Que a luz de hoje *fique acesa o ano inteiro*.',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›',
      // Desejos, um para cada toque.
      desejos: [
        'Paz *na sua casa*.',
        'Mesa cheia *de gente querida*.',
        'Abraço *apertado de quem você ama*.',
        'Saudade *que vira reencontro*.',
        'E muita *gratidão por chegar até aqui*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '❄', qtd: 26 }
  ),
  // A tela final desta mensagem.
  [F('Feliz Natal.', 'Que o melhor presente deste ano seja *quem está do seu lado*.')]
);

// 70 — Globo de neve.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  70,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'jardim',
  // Nome que aparece no painel de links.
  'Globo de neve',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'globo',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase dentro do globo.
      dentro: 'Feliz Natal',
      // Frase pequena que ensina o que fazer.
      dica: 'toque no globo para chacoalhar',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Dentro deste globo cabe *tudo de bom* que eu te desejo.',
        'Saúde, paz e uma casa *sempre quentinha*.',
        'E que a magia não acabe *quando a neve assentar*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Boas festas.', 'Nem precisa nevar. *O carinho aqui é o ano inteiro.*')]
);

// 71 — Virada do relógio.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  71,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'noite',
  // Nome que aparece no painel de links.
  'Meia-noite',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'relogio',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'Quase lá.',
      // Texto do botão que a pessoa toca.
      botao: 'adiantar o relógio',
      // Frase ao chegar a meia-noite.
      ano: 'FELIZ ANO NOVO!',
      // Última frase da animação.
      fecho: 'Que os próximos 365 dias *sejam gentis* com você.',
      // Texto do último botão, que leva à tela final.
      fim: 'brindar ›'
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 16 }
  ),
  // A tela final desta mensagem.
  [F('Ano novo, vida boa.', 'Deixe o que pesou lá atrás. *O melhor capítulo começa agora.*')]
);

// 72 — Sete ondas.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  72,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'confete',
  // Nome que aparece no painel de links.
  'Sete ondas',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'ondas',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'Tradição é tradição. Pule as sete ondas!',
      // Texto do botão que a pessoa toca.
      botao: 'pular a onda',
      // Última frase da animação.
      fecho: 'Sete ondas, sete pedidos. *O mar tomou nota.*',
      // Texto do último botão, que leva à tela final.
      fim: 'voltar para a areia ›',
      // Pedidos, um por onda.
      pedidos: [
        'Saúde.',
        'Dinheiro no bolso.',
        'Amor de verdade.',
        'Paz em casa.',
        'Viagem boa.',
        'Amigos por perto.',
        'E *sorte sem fim*!'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Feliz Ano Novo!', 'Que a sorte venha *em ondas*, e que você saiba surfar todas.')]
);

// 73 — Receita de mãe.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  73,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'rosa',
  // Nome que aparece no painel de links.
  'Receita de mãe',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'receita',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'Receita de Mãe',
      // Linha do rendimento da receita.
      rende: 'rende: uma vida inteira',
      // Frase pequena que ensina o que fazer.
      dica: 'toque nos ingredientes',
      // Texto do último botão, que leva à tela final.
      fim: 'servir com amor ›',
      // Ingredientes da receita.
      ingredientes: [
        '2 xícaras de *paciência*',
        '1 colo que cura tudo',
        '3 colheres de *“leva um casaco”*',
        'Amor sem medida'
      ],
      // Modo de preparo.
      preparo: 'Modo de preparo: *misture tudo e nunca deixe faltar*. Ninguém nesse mundo acerta o ponto como você.'
    },
    // Partículas do fundo desta mensagem.
    { forma: '✿', qtd: 10 }
  ),
  // A tela final desta mensagem.
  [F('Feliz Dia das Mães.', 'Tudo de bom que eu sei fazer *eu aprendi com você*.')]
);

// 74 — Projeto do pai.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  74,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'oceano',
  // Nome que aparece no painel de links.
  'Projeto: meu pai',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'projeto',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'PROJETO: MEU PAI',
      // Primeira frase que aparece.
      abre: 'Toque nas cotas para ler o projeto.',
      // Texto do último botão, que leva à tela final.
      fim: 'aprovar o projeto ›',
      // Frases de cada número do desenho.
      cotas: [
        'Telhado: *protegeu a família* de toda tempestade.',
        'Parede: *firme*, mesmo nos dias que ele mesmo balançava.',
        'Porta: *sempre aberta* pra quando eu precisar voltar.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Feliz Dia dos Pais.', 'Tudo que eu tenho de firme *foi você que construiu*.')]
);

// 75 — Rosa do Dia da Mulher.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  75,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'crepusculo',
  // Nome que aparece no painel de links.
  'Dia da Mulher',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'rosa',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'toque na rosa para abrir',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Você é *força*, e nem sempre te contam isso.',
        'É *coragem*, até nos dias de medo.',
        'É *inteligência*, e ninguém precisa te dar licença.',
        'É *delicadeza*, quando você decide ser.',
        'Hoje e sempre: *que ninguém te diminua*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '❀', qtd: 12 }
  ),
  // A tela final desta mensagem.
  [F('Feliz Dia da Mulher.', 'Flor é só um detalhe. *O respeito é todo dia.*')]
);

// 76 — Pulseira da amizade.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  76,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'neon',
  // Nome que aparece no painel de links.
  'Pulseira da amizade',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'pulseira',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'Faça a pulseira',
      // Palavra formada pelas contas.
      palavra: 'AMIGO',
      // Frase pequena que ensina o que fazer.
      dica: 'toque nas contas, uma por uma',
      // Última frase da animação.
      fecho: 'Essa pulseira é invisível, *e não arrebenta nunca*.',
      // Texto do último botão, que leva à tela final.
      fim: 'colocar no pulso ›'
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 12 }
  ),
  // A tela final desta mensagem.
  [F('Feliz Dia do Amigo.', 'Tem laço que a gente não dá. *A gente é.*')]
);

// 77 — Ovo de Páscoa.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  77,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'jardim',
  // Nome que aparece no painel de links.
  'Ovo de Páscoa',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'ovo',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'toque no ovo para quebrar',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›',
      // Última frase da animação.
      fecho: 'Lá dentro, o recheio: *todo o carinho do mundo*.',
      // Frases que aparecem, uma de cada vez.
      frases: ['Crack!', 'Quase…', 'Sabia que você *quebraria a dieta*.']
    },
    // Partículas do fundo desta mensagem.
    { forma: '🐰', qtd: 8 }
  ),
  // A tela final desta mensagem.
  [F('Feliz Páscoa.', 'Que a sua vida seja *doce e cheia de recomeços*.')]
);

// 78 — Montanha.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  78,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'ouro',
  // Nome que aparece no painel de links.
  'Você chegou lá',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'montanha',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'Foi um caminho longo.',
      // Texto do botão que a pessoa toca.
      botao: 'segure para subir',
      // Texto do último botão, que leva à tela final.
      fim: 'descer para comemorar ›',
      // Frases que aparecem, uma de cada vez.
      frases: ['Teve noite sem dormir.', 'Teve vontade de *desistir*.', 'E você *continuou subindo*.'],
      // Última frase da animação.
      fecho: 'Topo alcançado. *Essa vitória é toda sua.*'
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Parabéns pela conquista!', 'Eu sempre soube. *Orgulho é pouco* para o que eu sinto.')]
);

// 79 — Caderno da professora.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  79,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'oceano',
  // Nome que aparece no painel de links.
  'Caderno de obrigado',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'caderno',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'Lição de hoje: obrigado',
      // Frase pequena que ensina o que fazer.
      dica: 'toque nas estrelas para colar',
      // Assinatura do caderno.
      assinatura: 'de quem aprendeu com você',
      // Texto do último botão, que leva à tela final.
      fim: 'entregar o caderno ›',
      // Linhas de texto, na ordem em que aparecem.
      linhas: [
        'Por ter *paciência* quando ninguém tinha.',
        'Por acreditar em mim *antes de mim*.',
        'Por ensinar muito além *da matéria*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '★', qtd: 10 }
  ),
  // A tela final desta mensagem.
  [F('Feliz Dia dos Professores.', 'Tudo que eu me tornei *tem um pouco do que você ensinou*.')]
);

// 80 — Alianças.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  80,
  // Categoria: define a música e os botões de reação.
  'datas',
  // Tema de cores (a lista está em css/temas.css).
  'noite',
  // Nome que aparece no painel de links.
  'Aniversário de casamento',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'aliancas',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'Lembra desse dia?',
      // Frase pequena que ensina o que fazer.
      dica: 'arraste uma aliança até a outra',
      // Texto do último botão, que leva à tela final.
      fim: 'renovar os votos ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Eu disse sim uma vez, *naquele dia*.',
        'E digo de novo, *toda manhã*.',
        'Na saúde, na correria e no boleto. *Sempre você.*'
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 14 }
  ),
  // A tela final desta mensagem.
  [F('Feliz aniversário de casamento.', 'Se eu pudesse voltar no tempo, *eu casaria com você mais cedo*.')],
  // Carta longa, aberta pelo botão "ler a carta". Linha em branco = \n\n.
  'Meu amor,\n\nMais um ano e eu continuo achando que ganhei na loteria da vida.\n\nA gente já passou por muita coisa. Já se cansou, já se perdeu um pouco, já se encontrou de novo. E em todas as versões, é você quem eu quero ao lado.\n\nGratidão por dividir a casa, os dias e os sonhos comigo.\n\nFeliz aniversário de casamento. Que a gente tenha muitos mais.'
);
