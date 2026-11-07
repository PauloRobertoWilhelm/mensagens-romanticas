/* ==========================================================
   aberturas.js — a entrada de cada link: a primeira coisa que a pessoa vê.
   Cada link tem uma ideia própria. Dentro da mesma categoria, cada tipo aparece uma vez só.

   Tipos que existem:
     poeira, nucleo, mercurio, sinal, salto, termica, neon, circuito, match, stories,
     ia, carga, glitch, holo, gravidade, orbita, agua, tunel, pixels, lente.
   Como cada tipo funciona fica em js/entradas-*.js. O visual fica em css/aberturas.css.
   ========================================================== */

/* ==========================================================
   COMO LER ESTE ARQUIVO (explicado para quem nunca viu código)

   Aqui ficam os TEXTOS. É o arquivo mais seguro de mexer.
   Cada linha que começa com // explica a linha logo abaixo.

   Regras para não quebrar nada:
     1. Troque só o que está entre aspas 'assim'.
     2. Nunca apague as aspas, as vírgulas nem os colchetes [ ].
     3. Para escrever um apóstrofo dentro do texto, use \' .
     4. Nunca mude o número do link: os links já enviados usam esse número.
   ========================================================== */

// Link 1: abre com uma imagem quadriculada que fica nítida a cada toque.
P(1, 'pixels', {
  // Frase grande desta entrada.
  titulo: 'Procura-se a dona desse sorriso',
  // Desenho desta entrada. Troque por outro emoji.
  icone: '💋',
  // Frases que aparecem uma depois da outra.
  etapas: ['Imagem tremida, mas já dá para ver que é linda', 'Melhorando. O sorriso é suspeito', 'Nítido. Só pode ser você'],
  // Frase que ensina o gesto.
  dica: 'Toque para ampliar',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Confirmado. Você tem muito a explicar.'
});

// Link 2: abre com uma imagem com defeito para consertar com o dedo.
P(2, 'glitch', {
  // Frase grande desta entrada.
  titulo: 'Radar em pane: beleza acima do limite',
  // Frase que ensina o gesto.
  dica: 'Passe o dedo na tela para consertar',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Consertado. A multa continua.'
});

// Link 3: abre com letras gigantes para derrubar.
P(3, 'gravidade', {
  // Frase grande desta entrada.
  titulo: 'Agite antes de usar',
  // Frase escondida, que só aparece depois do gesto.
  escondido: 'Efeito colateral: eu sorrindo à toa',
  // Frase que ensina o gesto.
  dica: 'Derrube as letras com o dedo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Você foi avisada. Agora, a bula.'
});

// Link 4: abre com ondas que limpam quando a pessoa acha a frequência.
P(4, 'sinal', {
  // Frase grande desta entrada.
  titulo: 'Previsão do tempo',
  // Número da frequência que a pessoa precisa achar.
  freq: '98.7',
  // Frase que ensina o gesto.
  dica: 'Arraste até o sinal limpar',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Sintonizado. Frente quente chegando.'
});

// Link 5: abre com uma forma 3D de milhares de pontos para girar.
P(5, 'nucleo', {
  // Frase grande desta entrada.
  titulo: 'Hoje a sorte é sua',
  // Forma do desenho.
  forma: 'coracao',
  // Frase que ensina o gesto.
  dica: 'Gire com o dedo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'A casa perdeu. Você ganhou de novo.'
});

// Link 6: abre com uma lente de vidro para procurar palavras.
P(6, 'lente', {
  // Frase grande desta entrada.
  titulo: 'Tem um bilhete premiado escondido aqui',
  // As 3 palavras que a pessoa precisa achar.
  pistas: ['linda', 'inteligente', 'charmosa'],
  // Frase que ensina o gesto.
  dica: 'Arraste a lente e ache os 3 prêmios',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Três prêmios. Todos seus.'
});

// Link 7: abre com um circuito para ligar com o dedo.
P(7, 'circuito', {
  // Frase grande desta entrada.
  titulo: 'Acabou a luz no bairro. Foi o seu sorriso?',
  // Frase que ensina o gesto.
  dica: 'Ligue os dois polos',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Voltou. A luz aqui é você.'
});

// Link 8: abre com uma conversa com assistente.
P(8, 'ia', {
  // Frase grande desta entrada.
  titulo: 'Alguém',
  // O que a assistente fala, uma frase de cada vez.
  falas: ['Digitando há 3 horas...', 'Apaguei dez vezes antes de mandar.', 'Posso falar uma coisa?'],
  // As duas respostas. Só a primeira funciona; a segunda foge do dedo.
  respostas: ['Pode', 'Não'],
  // Frase que ensina o gesto.
  dica: 'Responda',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Você é a melhor parte do meu dia.'
});

// Link 9: abre com telas em sequência, como stories.
P(9, 'stories', {
  // Frase grande desta entrada.
  titulo: 'Plantão urgente',
  // As frases, uma em cada tela.
  quadros: ['Vista há pouco sorrindo sem autorização', 'A cidade inteira parou para olhar', 'Fontes confirmam: era você'],
  // Frase que ensina o gesto.
  dica: 'Toque para passar',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Você é a manchete.'
});

// Link 10: abre com duas gotas de metal líquido para juntar.
P(10, 'mercurio', {
  // Frase grande desta entrada.
  titulo: 'Favor tocar na obra',
  // Frase que ensina o gesto.
  dica: 'Junte as duas gotas',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Silêncio na sala: a obra chegou.'
});

// Link 11: abre com grãos de luz que o dedo junta até virarem a frase.
P(11, 'poeira', {
  // Frase grande desta entrada.
  titulo: 'Faltam palavras para você',
  // Frase que ensina o gesto.
  dica: 'Junte as letras com o dedo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Achei algumas. Nenhuma chega perto.'
});

// Link 12: abre com a tela inteira enchendo de líquido.
P(12, 'carga', {
  // Frase grande desta entrada.
  titulo: 'Recalculando rota',
  // Frases que aparecem uma depois da outra.
  etapas: ['Procurando caminho', 'Toda rota desvia para o seu sorriso', 'Perdido no seu olhar'],
  // Frase que ensina o gesto.
  dica: 'Toque rápido para destravar',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Rota encontrada. Destino: você.'
});

// Link 13: abre com uma câmera térmica que esquenta com o dedo.
P(13, 'termica', {
  // Frase grande desta entrada.
  titulo: 'Perigo: muito quente',
  // Frase escondida, que só aparece depois do gesto.
  escondido: 'Você',
  // Frase que ensina o gesto.
  dica: 'Esfregue a tela',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Pronto. Olha o que você causou.'
});

// Link 14: abre com uma carta holográfica para virar.
P(14, 'holo', {
  // Frase grande desta entrada.
  titulo: 'Tire a sua carta',
  // Desenho desta entrada. Troque por outro emoji.
  icone: '🔮',
  // Frase do verso da carta.
  verso: 'A Imperatriz: linda, perigosa e sempre certa',
  // Frase que ensina o gesto.
  dica: 'Vire a carta',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'As cartas queriam falar com você.'
});

// Link 15: abre com um salto em alta velocidade, segurando o dedo.
P(15, 'salto', {
  // Frase grande desta entrada.
  titulo: 'O elevador só sobe com você',
  // Jeito do desenho.
  modo: 'subida',
  // Número onde a contagem começa.
  de: 1,
  // Número onde a contagem termina.
  ate: 99,
  // Palavra que vem depois do número.
  unidade: 'º andar',
  // Frase que ensina o gesto.
  dica: 'Segure para subir',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Cobertura. O nível aqui é seu.'
});

// Link 16: abre com cartas para deslizar, como em aplicativo de namoro.
P(16, 'match', {
  // Frase grande desta entrada.
  titulo: 'Deu match com o prato do dia',
  // As frases das cartas, uma em cada carta.
  cartas: ['Morango com chocolate', 'Pimenta sem aviso', 'Você, com esse sorriso'],
  // Palavra do lado do sim.
  sim: 'Quero',
  // Palavra do lado do não.
  nao: 'Passo',
  // Frase que ensina o gesto.
  dica: 'Deslize para a direita',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Hoje o cardápio é sobre você.'
});

// Link 17: abre com palavras passando em 3D.
P(17, 'tunel', {
  // Frase grande desta entrada.
  titulo: 'Lado A',
  // As palavras que passam, na ordem.
  palavras: ['Aumenta', 'que essa', 'faixa', 'é', 'toda', 'sua'],
  // Frase que ensina o gesto.
  dica: 'Arraste para cima',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Disco na agulha. Hora de tocar.'
});

// Link 18: abre com água que revela a frase a cada pingo.
P(18, 'agua', {
  // Frase grande desta entrada.
  titulo: 'A mais linda é você',
  // Frase que ensina o gesto.
  dica: 'Toque na água',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Espelho, espelho meu: olha só quem apareceu.'
});

// Link 19: abre com uma bolinha para puxar e soltar em órbita.
P(19, 'orbita', {
  // Frase grande desta entrada.
  titulo: 'Tudo gira em volta de você',
  // Desenho desta entrada. Troque por outro emoji.
  icone: '🧭',
  // Frase que ensina o gesto.
  dica: 'Puxe a bolinha e solte',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Achei o meu norte.'
});

// Link 20: abre com um letreiro de neon que acende desenhando.
P(20, 'neon', {
  // Frase grande desta entrada.
  titulo: 'Retrato falado',
  // Forma do desenho.
  forma: 'coracao',
  // Frase que ensina o gesto.
  dica: 'Desenhe o contorno',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'O retrato ficou pronto.'
});

// Link 21: abre com uma carta holográfica para virar.
P(21, 'holo', {
  // Frase grande desta entrada.
  titulo: 'Carta para você',
  // Desenho desta entrada. Troque por outro emoji.
  icone: '💌',
  // Frase do verso da carta.
  verso: 'Fechada com saudade, aberta só por você',
  // Frase que ensina o gesto.
  dica: 'Vire o envelope',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Cuidado com o que tem dentro.'
});

// Link 22: abre com um circuito para ligar com o dedo.
P(22, 'circuito', {
  // Frase grande desta entrada.
  titulo: 'Instalando o nosso amor',
  // Frase que ensina o gesto.
  dica: 'Ligue você em mim',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Conexão estável. Para sempre.'
});

// Link 23: abre com a tela inteira enchendo de líquido.
P(23, 'carga', {
  // Frase grande desta entrada.
  titulo: 'Bateria do coração',
  // Frases que aparecem uma depois da outra.
  etapas: ['Carregando', 'Só carrega com você', 'Faltou o seu abraço'],
  // Frase que ensina o gesto.
  dica: 'Toque rápido para completar',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Achei o carregador: é você.'
});

// Link 24: abre com ondas que limpam quando a pessoa acha a frequência.
P(24, 'sinal', {
  // Frase grande desta entrada.
  titulo: 'Cadê a nossa música?',
  // Número da frequência que a pessoa precisa achar.
  freq: '101.4',
  // Frase que ensina o gesto.
  dica: 'Arraste até achar',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Achei. Ela só toca para você.'
});

// Link 25: abre com duas gotas de metal líquido para juntar.
P(25, 'mercurio', {
  // Frase grande desta entrada.
  titulo: 'Dois pontos sob o mesmo céu',
  // Frase que ensina o gesto.
  dica: 'Junte as duas luzes',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Olha o céu. Ele veio te ver.'
});

// Link 26: abre com uma imagem quadriculada que fica nítida a cada toque.
P(26, 'pixels', {
  // Frase grande desta entrada.
  titulo: 'Tem uma janela acesa por você',
  // Desenho desta entrada. Troque por outro emoji.
  icone: '🌃',
  // Frases que aparecem uma depois da outra.
  etapas: ['A cidade de longe', 'Chegando mais perto', 'É a nossa janela'],
  // Frase que ensina o gesto.
  dica: 'Toque para aproximar',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Todas as janelas dão para você.'
});

// Link 27: abre com telas em sequência, como stories.
P(27, 'stories', {
  // Frase grande desta entrada.
  titulo: 'Fim de tarde',
  // As frases, uma em cada tela.
  quadros: ['O céu mudou de cor', 'Todo mundo olhou para cima', 'E eu só olhei para você'],
  // Frase que ensina o gesto.
  dica: 'Toque para ver mais',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Você é o meu lugar favorito.'
});

// Link 28: abre com palavras passando em 3D.
P(28, 'tunel', {
  // Frase grande desta entrada.
  titulo: 'Todo dia é com você',
  // As palavras que passam, na ordem.
  palavras: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
  // Frase que ensina o gesto.
  dica: 'Arraste os dias para cima',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Mais um dia riscado, e mais um dia amando.'
});

// Link 29: abre com uma câmera térmica que esquenta com o dedo.
P(29, 'termica', {
  // Frase grande desta entrada.
  titulo: 'Faz tempo, mas ainda queima',
  // Frase escondida, que só aparece depois do gesto.
  escondido: 'Nós',
  // Frase que ensina o gesto.
  dica: 'Esquente com o dedo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Agora sim. Só nós dois.'
});

// Link 30: abre com uma lente de vidro para procurar palavras.
P(30, 'lente', {
  // Frase grande desta entrada.
  titulo: 'O nosso segredo está aqui',
  // As 3 palavras que a pessoa precisa achar.
  pistas: ['nós', 'sempre', 'juntos'],
  // Frase que ensina o gesto.
  dica: 'Arraste a lente e ache as 3 palavras',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Cofre aberto.'
});

// Link 31: abre com água que revela a frase a cada pingo.
P(31, 'agua', {
  // Frase grande desta entrada.
  titulo: 'Tem recado para você',
  // Frase que ensina o gesto.
  dica: 'Encoste na água',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Veio boiando até aqui.'
});

// Link 32: abre com grãos de luz que o dedo junta até virarem a frase.
P(32, 'poeira', {
  // Frase grande desta entrada.
  titulo: 'Escrevi na areia',
  // Jeito do desenho.
  modo: 'areia',
  // Frase que ensina o gesto.
  dica: 'Varra a areia com o dedo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Antes que a onda leve.'
});

// Link 33: abre com uma conversa com assistente.
P(33, 'ia', {
  // Frase grande desta entrada.
  titulo: 'Banco do Amor',
  // O que a assistente fala, uma frase de cada vez.
  falas: ['Olá! Sou a assistente do Banco do Amor.', 'Detectei um saldo fora do normal.', 'Quer ver o extrato?'],
  // As duas respostas. Só a primeira funciona; a segunda foge do dedo.
  respostas: ['Quero', 'Agora não'],
  // Frase que ensina o gesto.
  dica: 'Escolha uma resposta',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Saldo liberado: tudo o que eu sinto.'
});

// Link 34: abre com um salto em alta velocidade, segurando o dedo.
P(34, 'salto', {
  // Frase grande desta entrada.
  titulo: 'Segura comigo',
  // Jeito do desenho.
  modo: 'tempo',
  // Número onde a contagem começa.
  de: 2026,
  // Número onde a contagem termina.
  ate: 2086,
  // Palavra que vem depois do número.
  unidade: '',
  // Frase que ensina o gesto.
  dica: 'Segure para avançar no tempo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Areia nenhuma mede isso.'
});

// Link 35: abre com letras gigantes para derrubar.
P(35, 'gravidade', {
  // Frase grande desta entrada.
  titulo: 'Tem vida embaixo',
  // Frase escondida, que só aparece depois do gesto.
  escondido: 'O que é nosso criou raiz',
  // Frase que ensina o gesto.
  dica: 'Tire as letras de cima',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Tudo cresce perto de você.'
});

// Link 36: abre com uma forma 3D de milhares de pontos para girar.
P(36, 'nucleo', {
  // Frase grande desta entrada.
  titulo: 'É assim que fica a minha barriga',
  // Forma do desenho.
  forma: 'coracao',
  // Frase que ensina o gesto.
  dica: 'Gire bem rápido',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'É assim que eu fico quando te vejo.'
});

// Link 37: abre com uma imagem com defeito para consertar com o dedo.
P(37, 'glitch', {
  // Frase grande desta entrada.
  titulo: 'A pista travou',
  // Frase que ensina o gesto.
  dica: 'Passe o dedo para soltar o som',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'O DJ disse que a próxima é nossa.'
});

// Link 38: abre com uma bolinha para puxar e soltar em órbita.
P(38, 'orbita', {
  // Frase grande desta entrada.
  titulo: 'Solta esse foguete',
  // Desenho desta entrada. Troque por outro emoji.
  icone: '🎆',
  // Frase que ensina o gesto.
  dica: 'Puxe o foguete e solte',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Três, dois, um...'
});

// Link 39: abre com um letreiro de neon que acende desenhando.
P(39, 'neon', {
  // Frase grande desta entrada.
  titulo: 'Te amo',
  // Forma do desenho.
  forma: 'coracao',
  // Frase que ensina o gesto.
  dica: 'Acenda o letreiro com o dedo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Agora a rua inteira sabe.'
});

// Link 40: abre com cartas para deslizar, como em aplicativo de namoro.
P(40, 'match', {
  // Frase grande desta entrada.
  titulo: 'Pronta para dormir',
  // As frases das cartas, uma em cada carta.
  cartas: ['Escovou os dentes?', 'Mandou boa noite?', 'Vai sonhar comigo?'],
  // Palavra do lado do sim.
  sim: 'Sim',
  // Palavra do lado do não.
  nao: 'Não',
  // Frase que ensina o gesto.
  dica: 'Deslize a carta para a direita',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Uma luzinha, e eu pensando em você.'
});

// Link 41: abre com uma carta holográfica para virar.
P(41, 'holo', {
  // Frase grande desta entrada.
  titulo: 'Figurinha rara',
  // Desenho desta entrada. Troque por outro emoji.
  icone: '🌟',
  // Frase do verso da carta.
  verso: 'Série limitada: só existe uma de você',
  // Frase que ensina o gesto.
  dica: 'Vire a figurinha',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Veio a mais rara.'
});

// Link 42: abre com a tela inteira enchendo de líquido.
P(42, 'carga', {
  // Frase grande desta entrada.
  titulo: 'XP da amizade',
  // Frases que aparecem uma depois da outra.
  etapas: ['Ganhando experiência', 'Subindo de nível', 'Falta um ponto'],
  // Frase que ensina o gesto.
  dica: 'Toque rápido para subir',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Acerto crítico: você é do grupo.'
});

// Link 43: abre com cartas para deslizar, como em aplicativo de namoro.
P(43, 'match', {
  // Frase grande desta entrada.
  titulo: 'Aprovado na amizade',
  // As frases das cartas, uma em cada carta.
  cartas: ['Ri da própria piada', 'Responde só no dia seguinte', 'Some e volta como se nada'],
  // Palavra do lado do sim.
  sim: 'Sou eu',
  // Palavra do lado do não.
  nao: 'Nunca',
  // Frase que ensina o gesto.
  dica: 'Arraste para a direita',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Pode virar a folha.'
});

// Link 44: abre com água que revela a frase a cada pingo.
P(44, 'agua', {
  // Frase grande desta entrada.
  titulo: 'Tem peixe grande aqui',
  // Frase que ensina o gesto.
  dica: 'Bata na água com o dedo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Pegou! E não foi história de pescador.'
});

// Link 45: abre com uma forma 3D de milhares de pontos para girar.
P(45, 'nucleo', {
  // Frase grande desta entrada.
  titulo: 'Gira que o som vem',
  // Forma do desenho.
  forma: 'esfera',
  // Frase que ensina o gesto.
  dica: 'Gire a esfera',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Som aprovado. Bora fazer barulho.'
});

// Link 46: abre com uma imagem com defeito para consertar com o dedo.
P(46, 'glitch', {
  // Frase grande desta entrada.
  titulo: 'Pagamento recusado',
  // Frase que ensina o gesto.
  dica: 'Passe o dedo para tentar de novo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Dívida mantida. Essa a gente paga para sempre.'
});

// Link 47: abre com telas em sequência, como stories.
P(47, 'stories', {
  // Frase grande desta entrada.
  titulo: 'Senhoras e senhores',
  // As frases, uma em cada tela.
  quadros: ['Melhor amizade do ano', 'Por unanimidade', 'Sem recontagem'],
  // Frase que ensina o gesto.
  dica: 'Toque para abrir o envelope',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'E o troféu vai para... você.'
});

// Link 48: abre com um salto em alta velocidade, segurando o dedo.
P(48, 'salto', {
  // Frase grande desta entrada.
  titulo: 'Estrada vazia',
  // Jeito do desenho.
  modo: 'estrada',
  // Número onde a contagem começa.
  de: 0,
  // Número onde a contagem termina.
  ate: 120,
  // Palavra que vem depois do número.
  unidade: ' km/h',
  // Frase que ensina o gesto.
  dica: 'Segure para acelerar',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Motor ligado. Estrada nossa.'
});

// Link 49: abre com duas gotas de metal líquido para juntar.
P(49, 'mercurio', {
  // Frase grande desta entrada.
  titulo: 'Uma gota a cada três meses',
  // Frase que ensina o gesto.
  dica: 'Leve a gota até a outra',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Sobreviveu. Igual a você.'
});

// Link 50: abre com uma imagem quadriculada que fica nítida a cada toque.
P(50, 'pixels', {
  // Frase grande desta entrada.
  titulo: 'Achei a nossa fita',
  // Desenho desta entrada. Troque por outro emoji.
  icone: '📼',
  // Frases que aparecem uma depois da outra.
  etapas: ['Chiado puro', 'Tem gente rindo', 'Somos nós'],
  // Frase que ensina o gesto.
  dica: 'Toque para limpar a imagem',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Fita pronta. Aperte o play na memória.'
});

// Link 51: abre com uma bolinha para puxar e soltar em órbita.
P(51, 'orbita', {
  // Frase grande desta entrada.
  titulo: 'Uma ficha, uma chance',
  // Desenho desta entrada. Troque por outro emoji.
  icone: '🪙',
  // Frase que ensina o gesto.
  dica: 'Puxe a ficha e solte',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Máquina liberada.'
});

// Link 52: abre com uma lente de vidro para procurar palavras.
P(52, 'lente', {
  // Frase grande desta entrada.
  titulo: 'Arquivo confidencial',
  // As 3 palavras que a pessoa precisa achar.
  pistas: ['fofoca', 'provas', 'segredos'],
  // Frase que ensina o gesto.
  dica: 'Arraste a lente e ache as 3 provas',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Dossiê aberto. Temos provas.'
});

// Link 53: abre com palavras passando em 3D.
P(53, 'tunel', {
  // Frase grande desta entrada.
  titulo: 'Lembra?',
  // As palavras que passam, na ordem.
  palavras: ['Aquela viagem', 'Aquele perrengue', 'Aquela foto', 'Aquela risada'],
  // Frase que ensina o gesto.
  dica: 'Arraste as lembranças para cima',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Só tinha lembrança aí dentro.'
});

// Link 54: abre com um circuito para ligar com o dedo.
P(54, 'circuito', {
  // Frase grande desta entrada.
  titulo: 'Não ligue esses fios',
  // Frase que ensina o gesto.
  dica: 'Ligue mesmo assim',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Humano confirmado. E dos bons.'
});

// Link 55: abre com ondas que limpam quando a pessoa acha a frequência.
P(55, 'sinal', {
  // Frase grande desta entrada.
  titulo: 'Amigo na escuta?',
  // Número da frequência que a pessoa precisa achar.
  freq: '27.5',
  // Frase que ensina o gesto.
  dica: 'Arraste até pegar o sinal',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Câmbio, te ouço bem.'
});

// Link 56: abre com uma conversa com assistente.
P(56, 'ia', {
  // Frase grande desta entrada.
  titulo: 'Seu amigo mais chato',
  // O que a assistente fala, uma frase de cada vez.
  falas: ['Tá acordado?', 'Eu sei que tá.', 'São 3 da manhã. Atende.'],
  // As duas respostas. Só a primeira funciona; a segunda foge do dedo.
  respostas: ['Fala', 'Tô dormindo'],
  // Frase que ensina o gesto.
  dica: 'Responda logo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Eu ligo de novo. Amigo é insistente.'
});

// Link 57: abre com um letreiro de neon que acende desenhando.
P(57, 'neon', {
  // Frase grande desta entrada.
  titulo: 'Diploma de amizade',
  // Forma do desenho.
  forma: 'assinatura',
  // Frase que ensina o gesto.
  dica: 'Assine com o dedo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Seu diploma saiu.'
});

// Link 58: abre com uma câmera térmica que esquenta com o dedo.
P(58, 'termica', {
  // Frase grande desta entrada.
  titulo: 'A geladeira está gelada',
  // Frase escondida, que só aparece depois do gesto.
  escondido: 'Recado',
  // Frase que ensina o gesto.
  dica: 'Esfregue a porta',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Olha o recado que deixaram.'
});

// Link 59: abre com grãos de luz que o dedo junta até virarem a frase.
P(59, 'poeira', {
  // Frase grande desta entrada.
  titulo: 'A sorte está nas migalhas',
  // Jeito do desenho.
  modo: 'migalhas',
  // Frase que ensina o gesto.
  dica: 'Junte as migalhas',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Sobrou um biscoito, e é seu.'
});

// Link 60: abre com letras gigantes para derrubar.
P(60, 'gravidade', {
  // Frase grande desta entrada.
  titulo: 'Quebra tudo',
  // Frase escondida, que só aparece depois do gesto.
  escondido: 'Tem doce aí dentro',
  // Frase que ensina o gesto.
  dica: 'Derrube as letras',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Hora da pancada.'
});

// Link 61: abre com uma câmera térmica que esquenta com o dedo.
P(61, 'termica', {
  // Frase grande desta entrada.
  titulo: 'Faltou acender a vela',
  // Frase escondida, que só aparece depois do gesto.
  escondido: 'Parabéns',
  // Frase que ensina o gesto.
  dica: 'Esquente o pavio com o dedo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Acesa. Agora faça um pedido.'
});

// Link 62: abre com uma conversa com assistente.
P(62, 'ia', {
  // Frase grande desta entrada.
  titulo: 'Assistente da festa',
  // O que a assistente fala, uma frase de cada vez.
  falas: ['Alerta de calendário.', 'Hoje não é um dia qualquer.', 'Você sabe que dia é hoje?'],
  // As duas respostas. Só a primeira funciona; a segunda foge do dedo.
  respostas: ['Sei', 'Não'],
  // Frase que ensina o gesto.
  dica: 'Responda à assistente',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Claro que sabe. É o seu dia.'
});

// Link 63: abre com palavras passando em 3D.
P(63, 'tunel', {
  // Frase grande desta entrada.
  titulo: 'Um ano de nós',
  // As palavras que passam, na ordem.
  palavras: ['Janeiro', 'Março', 'Maio', 'Julho', 'Setembro', 'Novembro'],
  // Frase que ensina o gesto.
  dica: 'Arraste os meses para cima',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Doze meses. Foram todos com você.'
});

// Link 64: abre com duas gotas de metal líquido para juntar.
P(64, 'mercurio', {
  // Frase grande desta entrada.
  titulo: 'Faltou o tim-tim',
  // Frase que ensina o gesto.
  dica: 'Encoste uma na outra',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Pop! Levanta a taça.'
});

// Link 65: abre com uma bolinha para puxar e soltar em órbita.
P(65, 'orbita', {
  // Frase grande desta entrada.
  titulo: 'Mais uma volta',
  // Desenho desta entrada. Troque por outro emoji.
  icone: '🌙',
  // Frase que ensina o gesto.
  dica: 'Puxe a lua e solte',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Mais uma lua com você.'
});

// Link 66: abre com cartas para deslizar, como em aplicativo de namoro.
P(66, 'match', {
  // Frase grande desta entrada.
  titulo: 'O cupido acertou',
  // As frases das cartas, uma em cada carta.
  cartas: ['Flechada de raspão', 'Flechada no pé', 'Flechada no coração'],
  // Palavra do lado do sim.
  sim: 'Essa',
  // Palavra do lado do não.
  nao: 'Errou',
  // Frase que ensina o gesto.
  dica: 'Empurre para a direita',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Pegou. Agora não tem como devolver.'
});

// Link 67: abre com um circuito para ligar com o dedo.
P(67, 'circuito', {
  // Frase grande desta entrada.
  titulo: 'Feche o nosso cadeado',
  // Frase que ensina o gesto.
  dica: 'Ligue uma ponta na outra',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Fechou. A chave foi para o rio.'
});

// Link 68: abre com a tela inteira enchendo de líquido.
P(68, 'carga', {
  // Frase grande desta entrada.
  titulo: 'Carregando a fase',
  // Frases que aparecem uma depois da outra.
  etapas: ['Chamando o player 2', 'Escolhendo o personagem', 'Só falta você'],
  // Frase que ensina o gesto.
  dica: 'Aperte rápido',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Player 2 conectado.'
});

// Link 69: abre com um letreiro de neon que acende desenhando.
P(69, 'neon', {
  // Frase grande desta entrada.
  titulo: 'Feliz Natal',
  // Forma do desenho.
  forma: 'arvore',
  // Frase que ensina o gesto.
  dica: 'Desenhe a árvore com o dedo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'A árvore está esperando.'
});

// Link 70: abre com grãos de luz que o dedo junta até virarem a frase.
P(70, 'poeira', {
  // Frase grande desta entrada.
  titulo: 'Olha a neve',
  // Jeito do desenho.
  modo: 'neve',
  // Frase que ensina o gesto.
  dica: 'Junte os flocos com o dedo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Nosso mundo inteiro cabe aqui dentro.'
});

// Link 71: abre com um salto em alta velocidade, segurando o dedo.
P(71, 'salto', {
  // Frase grande desta entrada.
  titulo: 'Lá vem o ano novo',
  // Jeito do desenho.
  modo: 'espaco',
  // Número onde a contagem começa.
  de: 10,
  // Número onde a contagem termina.
  ate: 0,
  // Palavra que vem depois do número.
  unidade: '',
  // Frase que ensina o gesto.
  dica: 'Segure até zerar',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Zerou. Feliz ano novo.'
});

// Link 72: abre com ondas que limpam quando a pessoa acha a frequência.
P(72, 'sinal', {
  // Frase grande desta entrada.
  titulo: 'Ache o som do mar',
  // Número da frequência que a pessoa precisa achar.
  freq: '107.7',
  // Frase que ensina o gesto.
  dica: 'Arraste até ouvir',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Agora pule as sete ondas.'
});

// Link 73: abre com telas em sequência, como stories.
P(73, 'stories', {
  // Frase grande desta entrada.
  titulo: 'Receita de mãe',
  // As frases, uma em cada tela.
  quadros: ['Um colo que cura tudo', 'Uma xícara de paciência', 'Amor a gosto, sem medir'],
  // Frase que ensina o gesto.
  dica: 'Toque para o próximo passo',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Agora vai ao forno, com amor.'
});

// Link 74: abre com uma imagem quadriculada que fica nítida a cada toque.
P(74, 'pixels', {
  // Frase grande desta entrada.
  titulo: 'Projeto: meu pai',
  // Desenho desta entrada. Troque por outro emoji.
  icone: '🦸',
  // Frases que aparecem uma depois da outra.
  etapas: ['Desenho antigo', 'Peça rara', 'Não existe outro igual'],
  // Frase que ensina o gesto.
  dica: 'Toque para ver melhor',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Projeto aprovado.'
});

// Link 75: abre com uma carta holográfica para virar.
P(75, 'holo', {
  // Frase grande desta entrada.
  titulo: 'Entrega especial',
  // Desenho desta entrada. Troque por outro emoji.
  icone: '🌹',
  // Frase do verso da carta.
  verso: 'Uma rosa para uma mulher incrível',
  // Frase que ensina o gesto.
  dica: 'Vire a carta para receber',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Hoje o dia é seu, mulher.'
});

// Link 76: abre com uma forma 3D de milhares de pontos para girar.
P(76, 'nucleo', {
  // Frase grande desta entrada.
  titulo: 'Gire a pulseira',
  // Forma do desenho.
  forma: 'anel',
  // Frase que ensina o gesto.
  dica: 'Gire com o dedo, sem dó',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Pulseira pronta. Não sai nem no banho.'
});

// Link 77: abre com letras gigantes para derrubar.
P(77, 'gravidade', {
  // Frase grande desta entrada.
  titulo: 'Quebre o chocolate',
  // Frase escondida, que só aparece depois do gesto.
  escondido: 'Tem mais dentro do ovo',
  // Frase que ensina o gesto.
  dica: 'Derrube os pedaços',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Agora sim, Páscoa.'
});

// Link 78: abre com uma imagem com defeito para consertar com o dedo.
P(78, 'glitch', {
  // Frase grande desta entrada.
  titulo: 'Altitude máxima',
  // Frase que ensina o gesto.
  dica: 'Passe o dedo para limpar a vista',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Olha até onde você chegou.'
});

// Link 79: abre com uma lente de vidro para procurar palavras.
P(79, 'lente', {
  // Frase grande desta entrada.
  titulo: 'Caderno de obrigado',
  // As 3 palavras que a pessoa precisa achar.
  pistas: ['paciência', 'carinho', 'ensinar'],
  // Frase que ensina o gesto.
  dica: 'Arraste a lente pelo caderno',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'Você acendeu essa luz em muita gente.'
});

// Link 80: abre com água que revela a frase a cada pingo.
P(80, 'agua', {
  // Frase grande desta entrada.
  titulo: 'Cada anel, um ano',
  // Frase que ensina o gesto.
  dica: 'Pingue na água',
  // Frase que aparece depois que a pessoa consegue.
  ok: 'É o dia do nosso sim.'
});
