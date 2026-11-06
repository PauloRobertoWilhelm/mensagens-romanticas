/* ==========================================================
   mensagens-datas.js — ids 61 a 80 (categoria: datas especiais).
   Aniversário, aniversário de namoro, Dia dos Namorados, Natal, Ano Novo,
   Dia das Mães, Pais, Mulher, Amigo, Páscoa, conquista, Professores, casamento.
   Cada mensagem usa uma arte só dela (js/artes-datas.js).
   ========================================================== */

// 61 — Bolo de aniversário.
M(61, 'datas', 'confete', 'Apague as velas', abArte('bolo', {
  abre: 'Toque nas velas para apagar. Cada uma é um desejo.', fecho: '*Feliz aniversário!* Que venha o seu melhor ano.', fim: 'cortar o bolo ›',
  desejos: ['Que não falte *saúde*.', 'Que sobre *motivo pra rir*.', 'Que venha *paz* na hora de dormir.', 'Que apareça *gente boa* pelo caminho.', 'E que seus *sonhos* saiam do papel.']
}, { forma: '✦', qtd: 14 }), [
  F('Parabéns! 🎂', 'Que esse novo ciclo traga *tudo de bom* que você merece.')
], 'Hoje o dia é seu, então o resto do mundo pode esperar.\n\nQuero que você receba esse dia com o sorriso que merece. Que o novo ciclo venha com saúde, com gente querida por perto e com aquelas pequenas alegrias que enchem a vida.\n\nSe eu pudesse, te dava o dia inteiro de folga do mundo.\n\nFeliz aniversário. Que seja um ano lindo.');

// 62 — Balões.
M(62, 'datas', 'oceano', 'Estoure os desejos', abArte('baloes', {
  abre: 'Hoje é o seu dia. Estoure os balões!', fecho: 'Todos os desejos soltos. *Agora é só viver.*', fim: 'continuar ›',
  desejos: ['Que você *sorria mais*.', 'Que cuidem de você *como você cuida*.', 'Que seus planos *saiam do papel*.', 'Que a leveza *nunca te abandone*.', 'Que esse ano *te surpreenda*.']
}, { qtd: 0 }), [
  F('Feliz aniversário.', 'Que esse seja *seu melhor ano*. Você merece. 🎉')
]);

// 63 — Doze meses.
M(63, 'datas', 'rosa', 'Um ano de nós', abArte('doze', {
  unidade: 'meses', dica: 'segure o círculo para passar o ano', fim: 'guardar esse ano ›',
  frases: ['Janeiro: *a gente ainda se descobria*.', 'Abril: já sabia *o seu café* de cor.', 'Julho: *primeira briga*, primeiro perdão.', 'Outubro: casa virou *onde você está*.'],
  fecho: 'Doze meses e eu *escolheria tudo de novo*.'
}, { forma: '♥', qtd: 10 }), [
  F('Feliz aniversário de namoro.', 'Foi só o primeiro capítulo. *Tenho muita página pra escrever com você.*')
], 'Meu amor,\n\nFaz tempo que eu quero te agradecer por tudo que a gente construiu. Parece pouco, mas cada dia ao seu lado foi um tijolo desse lugar que a gente chama de nós.\n\nTivemos dias leves, dias pesados, discussões bobas e risadas que ninguém mais entende. E mesmo assim, eu escolheria tudo de novo.\n\nFeliz aniversário de namoro. Que venham muitos mais.');

// 64 — Brinde de aniversário de namoro.
M(64, 'datas', 'fogo', 'Tim-tim', abArte('brinde', {
  abre: 'Mais um ano juntos. Isso pede um brinde.', dica: 'arraste a taça até a outra', fim: 'beber ›',
  frases: ['Às risadas que a gente deu.', 'Às brigas que a gente *venceu junto*.', 'E a tudo que *ainda vem pela frente*.']
}, { forma: '✧', qtd: 10 }), [
  F('Saúde, meu amor.', 'De todos os anos que eu vivi, *os melhores têm você*.')
]);

// 65 — Fases da Lua.
M(65, 'datas', 'aurora', 'Mesversário', abArte('luas', {
  dica: 'arraste a lua no trilho', fim: 'continuar ›',
  frases: ['Lua nova: *começamos mais um mês*.', 'Crescente: *meu amor também*.', 'Lua cheia: *assim que eu fico* com você.', 'Minguante: é a única coisa que mingua.'],
  fecho: 'A Lua muda todo mês. *O que eu sinto, não.*'
}, { forma: '✦', qtd: 14 }), [
  F('Feliz mesversário.', 'Mais um mês *te amando*, mais um mês com vontade de mais mil.')
]);

// 66 — Cupido.
M(66, 'datas', 'rosa', 'Flechada', abArte('cupido', {
  dica: 'puxe o arco para baixo e solte', fim: 'guardar o arco ›',
  frases: ['Primeira flecha: *seu sorriso*.', 'Segunda flecha: *o seu jeito*.', 'Terceira: nem precisava, *eu já era seu*.']
}, { qtd: 0 }), [
  F('Feliz Dia dos Namorados.', 'O cupido nem precisou mirar. *Você foi certeira.*')
]);

// 67 — Cadeado na ponte.
M(67, 'datas', 'crepusculo', 'Cadeado do amor', abArte('cadeado', {
  iniciais: '♥', abre: 'Dizem que cadeado em ponte é pra sempre.', dica: 'arraste a chave até o cadeado', fim: 'seguir pela ponte ›',
  frases: ['Fechei.', 'E joguei a chave *no rio mais fundo* que achei.', 'Agora não tem saída. *Ainda bem.*']
}, { forma: '✦', qtd: 10 }), [
  F('Trancado neste Dia dos Namorados.', 'Meu coração é seu, e *a chave eu perdi de propósito*.')
]);

// 68 — Fliperama.
M(68, 'datas', 'neon', 'Player 2', abArte('pixel', {
  score: 'HIGH SCORE 999999', abre: 'INSERT COIN', ficha: 'INSERIR FICHA', fim: 'CONTINUAR',
  frases: ['PLAYER 2 ENTROU NO JOGO', 'COMBO: *RISADA + ABRAÇO*', 'VIDA INFINITA *COM VOCÊ*']
}, { qtd: 0 }), [
  F('Feliz Dia dos Namorados, player 2.', 'Em todas as fases do jogo, *eu quero você no segundo controle*.')
]);

// 69 — Árvore de Natal.
M(69, 'datas', 'ouro', 'Árvore acesa', abArte('arvore', {
  abre: 'Toque nas bolas para acender a árvore.', fecho: 'Que a luz de hoje *fique acesa o ano inteiro*.', fim: 'continuar ›',
  desejos: ['Paz *na sua casa*.', 'Mesa cheia *de gente querida*.', 'Abraço *apertado de quem você ama*.', 'Saudade *que vira reencontro*.', 'E muita *gratidão por chegar até aqui*.']
}, { forma: '❄', qtd: 26 }), [
  F('Feliz Natal.', 'Que o melhor presente deste ano seja *quem está do seu lado*.')
]);

// 70 — Globo de neve.
M(70, 'datas', 'jardim', 'Globo de neve', abArte('globo', {
  dentro: 'Feliz Natal', dica: 'toque no globo para chacoalhar', fim: 'continuar ›',
  frases: ['Dentro deste globo cabe *tudo de bom* que eu te desejo.', 'Saúde, paz e uma casa *sempre quentinha*.', 'E que a magia não acabe *quando a neve assentar*.']
}, { qtd: 0 }), [
  F('Boas festas.', 'Nem precisa nevar. *O carinho aqui é o ano inteiro.*')
]);

// 71 — Virada do relógio.
M(71, 'datas', 'noite', 'Meia-noite', abArte('relogio', {
  abre: 'Quase lá.', botao: 'adiantar o relógio', ano: 'FELIZ ANO NOVO!', fecho: 'Que os próximos 365 dias *sejam gentis* com você.', fim: 'brindar ›'
}, { forma: '✦', qtd: 16 }), [
  F('Ano novo, vida boa.', 'Deixe o que pesou lá atrás. *O melhor capítulo começa agora.*')
]);

// 72 — Sete ondas.
M(72, 'datas', 'confete', 'Sete ondas', abArte('ondas', {
  abre: 'Tradição é tradição. Pule as sete ondas!', botao: 'pular a onda', fecho: 'Sete ondas, sete pedidos. *O mar tomou nota.*', fim: 'voltar para a areia ›',
  pedidos: ['Saúde.', 'Dinheiro no bolso.', 'Amor de verdade.', 'Paz em casa.', 'Viagem boa.', 'Amigos por perto.', 'E *sorte sem fim*!']
}, { qtd: 0 }), [
  F('Feliz Ano Novo!', 'Que a sorte venha *em ondas*, e que você saiba surfar todas.')
]);

// 73 — Receita de mãe.
M(73, 'datas', 'rosa', 'Receita de mãe', abArte('receita', {
  titulo: 'Receita de Mãe', rende: 'rende: uma vida inteira', dica: 'toque nos ingredientes', fim: 'servir com amor ›',
  ingredientes: ['2 xícaras de *paciência*', '1 colo que cura tudo', '3 colheres de *“leva um casaco”*', 'Amor sem medida'],
  preparo: 'Modo de preparo: *misture tudo e nunca deixe faltar*. Ninguém nesse mundo acerta o ponto como você.'
}, { forma: '✿', qtd: 10 }), [
  F('Feliz Dia das Mães.', 'Tudo de bom que eu sei fazer *eu aprendi com você*.')
]);

// 74 — Projeto do pai.
M(74, 'datas', 'oceano', 'Projeto: meu pai', abArte('projeto', {
  titulo: 'PROJETO: MEU PAI', abre: 'Toque nas cotas para ler o projeto.', fim: 'aprovar o projeto ›',
  cotas: ['Telhado: *protegeu a família* de toda tempestade.', 'Parede: *firme*, mesmo nos dias que ele mesmo balançava.', 'Porta: *sempre aberta* pra quando eu precisar voltar.']
}, { qtd: 0 }), [
  F('Feliz Dia dos Pais.', 'Tudo que eu tenho de firme *foi você que construiu*.')
]);

// 75 — Rosa do Dia da Mulher.
M(75, 'datas', 'crepusculo', 'Dia da Mulher', abArte('rosa', {
  dica: 'toque na rosa para abrir', fim: 'continuar ›',
  frases: ['Você é *força*, e nem sempre te contam isso.', 'É *coragem*, até nos dias de medo.', 'É *inteligência*, e ninguém precisa te dar licença.', 'É *delicadeza*, quando você decide ser.', 'Hoje e sempre: *que ninguém te diminua*.']
}, { forma: '❀', qtd: 12 }), [
  F('Feliz Dia da Mulher.', 'Flor é só um detalhe. *O respeito é todo dia.*')
]);

// 76 — Pulseira da amizade.
M(76, 'datas', 'neon', 'Pulseira da amizade', abArte('pulseira', {
  titulo: 'Faça a pulseira', palavra: 'AMIGO', dica: 'toque nas contas, uma por uma', fecho: 'Essa pulseira é invisível, *e não arrebenta nunca*.', fim: 'colocar no pulso ›'
}, { forma: '✦', qtd: 12 }), [
  F('Feliz Dia do Amigo.', 'Tem laço que a gente não dá. *A gente é.*')
]);

// 77 — Ovo de Páscoa.
M(77, 'datas', 'jardim', 'Ovo de Páscoa', abArte('ovo', {
  dica: 'toque no ovo para quebrar', fim: 'continuar ›', fecho: 'Lá dentro, o recheio: *todo o carinho do mundo*.',
  frases: ['Crack!', 'Quase…', 'Sabia que você *quebraria a dieta*.']
}, { forma: '🐰', qtd: 8 }), [
  F('Feliz Páscoa.', 'Que a sua vida seja *doce e cheia de recomeços*.')
]);

// 78 — Montanha.
M(78, 'datas', 'ouro', 'Você chegou lá', abArte('montanha', {
  abre: 'Foi um caminho longo.', botao: 'segure para subir', fim: 'descer para comemorar ›',
  frases: ['Teve noite sem dormir.', 'Teve vontade de *desistir*.', 'E você *continuou subindo*.'],
  fecho: 'Topo alcançado. *Essa vitória é toda sua.*'
}, { qtd: 0 }), [
  F('Parabéns pela conquista!', 'Eu sempre soube. *Orgulho é pouco* para o que eu sinto.')
]);

// 79 — Caderno da professora.
M(79, 'datas', 'oceano', 'Caderno de obrigado', abArte('caderno', {
  titulo: 'Lição de hoje: obrigado', dica: 'toque nas estrelas para colar', assinatura: 'de quem aprendeu com você', fim: 'entregar o caderno ›',
  linhas: ['Por ter *paciência* quando ninguém tinha.', 'Por acreditar em mim *antes de mim*.', 'Por ensinar muito além *da matéria*.']
}, { forma: '★', qtd: 10 }), [
  F('Feliz Dia dos Professores.', 'Tudo que eu me tornei *tem um pouco do que você ensinou*.')
]);

// 80 — Alianças.
M(80, 'datas', 'noite', 'Aniversário de casamento', abArte('aliancas', {
  abre: 'Lembra desse dia?', dica: 'arraste uma aliança até a outra', fim: 'renovar os votos ›',
  frases: ['Eu disse sim uma vez, *naquele dia*.', 'E digo de novo, *toda manhã*.', 'Na saúde, na correria e no boleto. *Sempre você.*']
}, { forma: '✦', qtd: 14 }), [
  F('Feliz aniversário de casamento.', 'Se eu pudesse voltar no tempo, *eu casaria com você mais cedo*.')
], 'Meu amor,\n\nMais um ano e eu continuo achando que ganhei na loteria da vida.\n\nA gente já passou por muita coisa. Já se cansou, já se perdeu um pouco, já se encontrou de novo. E em todas as versões, é você quem eu quero ao lado.\n\nGratidão por dividir a casa, os dias e os sonhos comigo.\n\nFeliz aniversário de casamento. Que a gente tenha muitos mais.');
