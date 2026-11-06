/* ==========================================================
   mensagens-namoro.js — ids 21 a 40 (categoria: namoro / namorada).
   Tom: amor de verdade, carinho, cumplicidade. Sem nomes.
   Cada mensagem usa uma arte só dela (js/artes-namoro.js).
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

// 21 — Carta com lacre.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  21,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'noite',
  // Nome que aparece no painel de links.
  'Carta lacrada',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'lacre',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Texto ou símbolo do selo.
      selo: '♥',
      // Frase pequena que ensina o que fazer.
      dica: 'segure o lacre até ele derreter',
      // Texto do último botão, que leva à tela final.
      fim: 'guardar a carta ›',
      // Linhas de texto, na ordem em que aparecem.
      linhas: [
        'Tem dias em que eu paro e penso em como tudo mudou.',
        'Do jeito *mais bonito* possível.',
        'E o motivo desse bonito tem uma risada que eu conheço de cor.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 12 }
  ),
  // A tela final desta mensagem.
  [F('Eu te amo.', 'Não é só hoje, nem só quando está fácil. *É sempre.* Obrigado por ser o meu lugar seguro.')],
  // Carta longa, aberta pelo botão "ler a carta". Linha em branco = \n\n.
  'Meu amor,\n\nEu poderia te mandar uma mensagem curta, mas tem coisa que não cabe em duas linhas.\n\nVocê chegou e arrumou o que eu nem sabia que estava fora do lugar. Me deu calma nos dias pesados e motivo pra rir nos dias comuns.\n\nSe o amor tem um endereço, o meu é o seu abraço.\n\nGratidão por cada dia. E pode ter certeza: eu continuo escolhendo você.'
);

// 22 — Instalador antigo.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  22,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'neon',
  // Nome que aparece no painel de links.
  'Instalar o nosso amor',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'instalador',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'Assistente de Instalação',
      // Frase de boas-vindas.
      boas: 'Bem-vinda à instalação de *Nós 2.0*. Tamanho: o coração inteiro.',
      // Texto do botão que começa a instalação.
      iniciar: 'Avançar >',
      // Partes do desenho, uma por toque.
      etapas: [
        'copiando risadas...',
        'instalando abraços longos...',
        'removendo saudade...',
        'configurando beijo de bom dia...'
      ],
      // Pergunta da tela.
      pergunta: 'Aceita passar *todos os próximos dias* comigo?',
      // Texto do botão Sim.
      sim: 'Sim',
      // Texto do botão Não, que foge do dedo.
      nao: 'Não',
      // Última frase da animação.
      fecho: 'Instalação concluída. Reinicie quantas vezes quiser: *sempre volta pra você*.',
      // Texto do último botão, que leva à tela final.
      fim: 'Concluir'
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Nenhum erro encontrado.', 'Só *amor em excesso*. O sistema recomenda manter para sempre.')]
);

// 23 — Bateria carregada com abraço.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  23,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'rosa',
  // Nome que aparece no painel de links.
  'Bateria fraca',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'bateria',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase de aviso em cima da tela.
      aviso: 'BATERIA FRACA · CONECTE AO SEU AMOR',
      // Primeira frase que aparece.
      abre: 'Eu sem você, às 18h de uma terça.',
      // Texto do botão que a pessoa toca.
      botao: 'segure para abraçar',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Sua voz: *+20%* na hora.',
        'Seu cheiro: *+30%*, sem nem precisar de tomada.',
        'Seu abraço: *carga rápida*, nenhum aparelho faz igual.'
      ],
      // Última frase da animação.
      fecho: '*100%*. Você é a única tomada que me liga de verdade.',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›'
    },
    // Partículas do fundo desta mensagem.
    { forma: '⚡', qtd: 10 }
  ),
  // A tela final desta mensagem.
  [F('Carregado.', 'E se um dia eu descarregar, já sei *exatamente pra quem* voltar.')]
);

// 24 — Caixinha de música.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  24,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'crepusculo',
  // Nome que aparece no painel de links.
  'Caixinha de música',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'caixamusica',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'toque na manivela para dar corda',
      // Texto do último botão, que leva à tela final.
      fim: 'fechar a tampa ›',
      // Versos da caixinha de música.
      versos: [
        'Se eu pudesse guardar um som, seria *a sua risada*.',
        'Ela toca baixinho na minha cabeça o dia inteiro.',
        'Dá corda nos meus dias *sem nem perceber*.',
        'E eu danço por dentro, *só de lembrar de você*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '♫', qtd: 14 }
  ),
  // A tela final desta mensagem.
  [F('Essa melodia é sua.', 'Eu só aprendi a tocar *depois que você chegou*.')]
);

// 25 — Aurora boreal.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  25,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'aurora',
  // Nome que aparece no painel de links.
  'Sob a mesma aurora',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'aurora',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'Olha pra cima comigo.',
      // Texto do botão que começa.
      comecar: 'olhar o céu',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Tem gente que viaja o mundo pra ver esse céu.',
        'Eu vi *coisa mais bonita* hoje de manhã, de cabelo bagunçado, sorrindo pra mim.',
        'Qualquer lugar vira paisagem *quando é com você*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Fenômeno raro.', 'Dizem que uma aurora muda a vida de quem vê. *Você mudou a minha.*')]
);

// 26 — Prédio com janelas.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  26,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'noite',
  // Nome que aparece no painel de links.
  'Janelas acesas',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'janelas',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'Toque nas janelas que estão piscando',
      // Frase pequena que ensina o que fazer.
      dica: 'Cada luz guarda uma lembrança nossa.',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›',
      // Frases que cada janela guarda.
      lembrancas: [
        'Aquela noite em que a gente *riu até doer*.',
        'O dia em que você *cuidou de mim* sem eu pedir.',
        'Nosso primeiro *boa noite* depois de uma briga boba.',
        'A hora em que eu entendi que *era você*.'
      ],
      // Última frase da animação.
      fecho: 'De todas as janelas da cidade, *a que eu quero é a sua*.'
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Luz acesa.', 'Pode chegar tarde, pode chegar cansada. *Aqui sempre vai ter luz pra você.*')]
);

// 27 — Pôr do sol arrastado.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  27,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'crepusculo',
  // Nome que aparece no painel de links.
  'Pôr do sol com você',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'pordosol',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'arraste o sol até o mar',
      // Texto do último botão, que leva à tela final.
      fim: 'ficar mais um pouco ›',
      // Frases que aparecem, uma de cada vez.
      frases: ['O dia pode ter sido péssimo…', '…mas o fim dele *é com você*.', 'E é aí que tudo fica no lugar.'],
      // Última frase da animação.
      fecho: 'Quero assistir *todos os finais de tarde* que me restam ao seu lado.'
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Boa noite, céu.', 'Amanhã ele nasce de novo, e eu *escolho você* de novo também.')]
);

// 28 — Calendário de arrancar.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  28,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'jardim',
  // Nome que aparece no painel de links.
  'Dias comuns',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'calendario',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'toque para arrancar a folha',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›',
      // Folhas do calendário.
      dias: [
        { s: 'segunda', n: 3, t: 'Café requentado, *você de pijama*. Dia perfeito.' },
        { s: 'quarta', n: 12, t: 'Nada aconteceu. *Foi ótimo*, porque foi com você.' },
        { s: 'sexta', n: 21, t: 'Filme ruim, sofá apertado. *Eu não trocava por nada.*' }
      ],
      // Última frase da animação.
      fecho: 'O amor não mora nas datas especiais. Ele mora *numa terça qualquer com você*.'
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Hoje também.', 'Se for mais um dia comum ao seu lado, *já é o melhor presente*.')]
);

// 29 — Vela protegida do vento.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  29,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'fogo',
  // Nome que aparece no painel de links.
  'Ainda queimando',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'vela',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'A vida às vezes venta forte.',
      // Texto do botão que a pessoa toca.
      botao: 'segure para proteger a chama',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Conta que vence. Dia pesado. Cansaço.',
        'E *a gente continua aqui*.',
        'Essa chama não é sorte. É *cuidado*, todo dia.'
      ],
      // Última frase da animação.
      fecho: 'O tempo passou, e o que eu sinto *ainda queima igual*.',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›'
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 8 }
  ),
  // A tela final desta mensagem.
  [F('Fogo aceso.', 'Pode ventar o que for. *Eu seguro a chama com você.*')]
);

// 30 — Cofre.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  30,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'noite',
  // Nome que aparece no painel de links.
  'Segredo do cofre',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'cofre',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Título que aparece em cima.
      titulo: 'CONTEÚDO SIGILOSO',
      // Frase pequena que ensina o que fazer.
      dica: 'toque nas rodas até formar ♥ ♥ ♥',
      // Texto do último botão, que leva à tela final.
      fim: 'fechar o cofre ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Aqui eu guardo o que tenho de mais valioso.',
        'Nada de dinheiro. *Só o jeito que você me olha.*',
        'A combinação era fácil: *é você em tudo*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '✦', qtd: 10, cores: ['#c9ced6', '#ffb0c8'] }
  ),
  // A tela final desta mensagem.
  [F('Patrimônio protegido.', 'Meu maior tesouro *tem nome, sorriso e dorme do meu lado*.')]
);

// 31 — Garrafa no mar.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  31,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'oceano',
  // Nome que aparece no painel de links.
  'Mensagem na garrafa',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'garrafa',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'toque na garrafa para pescar',
      // Texto do último botão, que leva à tela final.
      fim: 'devolver ao mar ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Joguei esta garrafa lá no dia em que te conheci.',
        'Dentro dela escrevi: *“que seja ela”*.',
        'O mar demorou, mas *entregou direitinho*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Destinatária encontrada.', 'De todas as praias do mundo, *eu fui parar justo em você*.')]
);

// 32 — Escrito na areia.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  32,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'oceano',
  // Nome que aparece no painel de links.
  'Escrito na areia',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'areia',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'passe o dedo para tirar a areia',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›',
      // Frases que aparecem, uma de cada vez.
      frases: ['eu + você', 'te amo'],
      // Última frase da animação.
      fecho: 'A onda leva a areia. *O que eu sinto ela não alcança.*'
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Maré alta.', 'Pode subir o que for. Nosso amor *sabe nadar*.')]
);

// 33 — Extrato.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  33,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'ouro',
  // Nome que aparece no painel de links.
  'Extrato do amor',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'extrato',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Nome do banco.
      banco: 'Banco do Nosso Amor',
      // Texto da etiqueta.
      rotulo: 'Saldo disponível',
      // Frase pequena que ensina o que fazer.
      dica: 'toque no olho para ver o saldo',
      // Nome da moeda do saldo.
      moeda: 'beijos',
      // Texto do último botão, que leva à tela final.
      fim: 'fechar o aplicativo ›',
      // Entradas e saídas: nome e valor.
      lancamentos: [
        ['Abraço ao acordar', 120],
        ['Briga boba de domingo', -15],
        ['Pedido de desculpas com pipoca', 200],
        ['Saudade do dia inteiro', -40],
        ['Cheiro no pescoço', 300]
      ],
      // Frase final do extrato.
      nota: 'Rendimento garantido: *quanto mais eu gasto com você, mais eu tenho*.'
    },
    // Partículas do fundo desta mensagem.
    { forma: '💋', qtd: 8 }
  ),
  // A tela final desta mensagem.
  [F('Conta conjunta.', 'A única dívida que eu faço questão de manter é *te amar pra sempre*.')]
);

// 34 — Ampulheta.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  34,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'crepusculo',
  // Nome que aparece no painel de links.
  'Para sempre é pouco',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'ampulheta',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Texto do botão que a pessoa toca.
      botao: 'toque para virar a ampulheta',
      // Texto do último botão, que leva à tela final.
      fim: 'parar o tempo ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Passou voando, como *todo tempo com você*.',
        'Vira de novo. *Eu quero mais.*',
        'Para sempre *é pouco*, e eu vou reclamar no final.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { forma: '✧', qtd: 12 }
  ),
  // A tela final desta mensagem.
  [F('O tempo que me falta.', 'Se me dessem mil vidas, eu gastaria *todas procurando você*.')]
);

// 35 — Árvore que cresce.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  35,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'jardim',
  // Nome que aparece no painel de links.
  'Raízes',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'broto',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'Tudo começou pequeno.',
      // Texto do botão que a pessoa toca.
      botao: 'segure para regar',
      // Frases que aparecem, uma de cada vez.
      frases: ['Um oi meio sem jeito.', 'Virou conversa até tarde.', 'Virou *rotina, casa, futuro*.'],
      // Última frase da animação.
      fecho: 'Olha o tamanho *do que a gente plantou*.',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›'
    },
    // Partículas do fundo desta mensagem.
    { forma: '❀', qtd: 10 }
  ),
  // A tela final desta mensagem.
  [F('Raiz funda.', 'Vento nenhum derruba o que *a gente cuidou junto*.')]
);

// 36 — Borboletas.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  36,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'jardim',
  // Nome que aparece no painel de links.
  'Frio na barriga',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'borboletas',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'toque nas borboletas',
      // Palavras que as borboletas carregam.
      palavras: ['ainda', 'sinto', 'borboletas', 'por', 'você'],
      // Última frase da animação.
      fecho: 'Depois de tanto tempo, *elas não foram embora*.',
      // Texto do último botão, que leva à tela final.
      fim: 'soltar as borboletas ›'
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Efeito colateral do amor.', 'Disseram que passava. *Ainda bem que mentiram.*')]
);

// 37 — Discoteca.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  37,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'confete',
  // Nome que aparece no painel de links.
  'Dança comigo',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'discoteca',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Frase pequena que ensina o que fazer.
      dica: 'toque na bola de espelhos',
      // Texto do último botão, que leva à tela final.
      fim: 'sair da pista ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Você dança mal, e eu amo *cada passo errado*.',
        'Na sala, de meia, às onze da noite.',
        'Melhor festa da minha vida: *a nossa cozinha*.',
        'Nem precisa de música. *Só de você.*'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Última música.', 'Essa eu quero lenta, com a sua cabeça no meu ombro. *Para sempre.*')]
);

// 38 — Fogos.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  38,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'noite',
  // Nome que aparece no painel de links.
  'Céu em festa',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'fogos',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'Toque no céu.',
      // Texto do último botão, que leva à tela final.
      fim: 'continuar ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Um foguete pelo seu *sorriso*.',
        'Outro pela sua *coragem*.',
        'Mais um pela sua *paciência* comigo.',
        'E todos os outros *por existir*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Hoje é festa.', 'Não tem data no calendário. O motivo é *amar você*, e isso basta.')]
);

// 39 — Letreiro de neon.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  39,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'neon',
  // Nome que aparece no painel de links.
  'Te amo em neon',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'neon',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Palavra do letreiro de neon.
      letreiro: 'TE AMO',
      // Frase menor, perto do título.
      sub: 'aberto 24 horas',
      // Frase pequena que ensina o que fazer.
      dica: 'puxe a cordinha para baixo',
      // Texto do último botão, que leva à tela final.
      fim: 'deixar aceso ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Queria que soubesse com *letra bem grande*.',
        'Pra você ver de longe, mesmo no dia ruim.',
        'Esse letreiro *não tem botão de desligar*.'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Sempre aceso.', 'Pode passar de madrugada. *Pra você a gente nunca fecha.*')]
);

// 40 — Abajur e estrelas no teto.
M(
  // Número do link. NUNCA mude: os links já enviados usam este número.
  40,
  // Categoria: define a música e os botões de reação.
  'namoro',
  // Tema de cores (a lista está em css/temas.css).
  'noite',
  // Nome que aparece no painel de links.
  'Boa noite, meu amor',
  // A animação deste link.
  abArte(
    // Nome da animação. O movimento está em js/artes e o visual em css/artes.
    'abajur',
    // Textos da animação. Pode trocar o que está entre aspas.
    {
      // Primeira frase que aparece.
      abre: 'O dia acabou. Vem cá.',
      // Frase pequena que ensina o que fazer.
      dica: 'toque no abajur para apagar a luz',
      // Texto do último botão, que leva à tela final.
      fim: 'dormir ›',
      // Frases que aparecem, uma de cada vez.
      frases: [
        'Deixa o resto pra amanhã.',
        'Nenhum problema é mais forte *que o seu lugar no meu peito*.',
        'Dorme bem, meu amor. *Eu tô aqui.*'
      ]
    },
    // Partículas do fundo desta mensagem.
    { qtd: 0 }
  ),
  // A tela final desta mensagem.
  [F('Boa noite.', 'A última coisa em que eu penso, *todos os dias*, é você.')]
);
