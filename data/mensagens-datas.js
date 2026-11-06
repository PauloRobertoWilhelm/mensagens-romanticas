/* ==========================================================
   mensagens-datas.js — ids 61 a 80 (categoria: datas especiais).
   Aniversário, aniversário de namoro, Dia dos Namorados, Natal, Ano Novo,
   Dia das Mães, Pais, Mulher, Amigo, Páscoa, conquista, Professores, casamento.
   ========================================================== */

// 61 — Feliz aniversário (confete / presente)
M(61, 'datas', 'confete', 'Feliz aniversário', abPresente('É o seu dia!', 'toque para abrir'), [
  K('Desejos', [['Saúde', 'pra aproveitar tudo'], ['Alegria', 'pra rir à toa'], ['Paz', 'pra dormir bem']]),
  H('Parabéns', ['Mais um ano de vida.', 'Mais um ano de *histórias*.', 'E eu feliz por fazer parte de algumas.']),
  N('Aniversário em números', [[1, 'ano a mais de experiência'], [365, 'novos dias pela frente'], ['∞', 'motivos pra comemorar']], 'Que cada dia seja *melhor* que o anterior.'),
  F('deslizar', 'Parabéns! 🎂', 'Que esse novo ciclo traga *tudo de bom* que você merece. Feliz aniversário!', { dica2: 'deslize para soprar a vela' })
], 'Hoje o dia é seu, então o resto do mundo pode esperar.\n\nQuero que você receba esse dia com o sorriso que merece. Que o novo ciclo venha com saúde, com gente querida por perto e com aquelas pequenas alegrias que enchem a vida.\n\nSe eu pudesse, te dava o dia inteiro de folga do mundo.\n\nFeliz aniversário. Que seja um ano lindo.');

// 62 — Contagem do aniversário (noite / presente)
M(62, 'datas', 'noite', 'Contagem do aniversário', abPresente('Hoje é sobre você', 'toque para abrir'), [
  N('Contagem regressiva', [[3, 'respire fundo'], [2, 'faça um pedido'], [1, 'sopre a vela']], 'E que venha *um ano lindo*.'),
  L('O que eu desejo', ['Que você sorria mais', 'Que cuidem de você como você cuida', 'Que seus planos saiam do papel', 'Que você nunca perca a leveza']),
  F('segurar', 'Feliz aniversário.', 'Que esse seja *seu melhor ano*. Você merece. 🎉')
]);

// 63 — Um ano de nós (rosa / envelope)
M(63, 'datas', 'rosa', 'Um ano de nós', abEnvelope('Feliz aniversário de namoro', '💞'), [
  N('Nosso tempo', [[12, 'meses de nós'], [365, 'dias de escolha'], ['∞', 'pra frente']], 'Cada dia contado *valeu a pena*.'),
  H('Retrospectiva', ['Quando a gente começou, eu não imaginava.', 'Não imaginava que ia ser *tão bom*.', 'Que ia ser *tão nosso*.']),
  C('coracao', 'Mais um ano ao seu lado: *a melhor decisão* que eu tomei.'),
  F('segurar', 'Feliz aniversário de namoro.', 'Te amo hoje, mais do que ontem e *menos do que amanhã*.')
], 'Meu amor,\n\nFaz tempo que eu quero te agradecer por tudo que a gente construiu. Parece pouco, mas cada dia ao seu lado foi um tijolo desse lugar que a gente chama de nós.\n\nTivemos dias leves, dias pesados, discussões bobas e risadas que ninguém mais entende. E mesmo assim, eu escolheria tudo de novo.\n\nFeliz aniversário de namoro. Que venham muitos mais.');

// 64 — Mais um ano juntos (fogo / envelope)
M(64, 'datas', 'fogo', 'Mais um ano juntos', abEnvelope('Aniversário de nós', '🔥'), [
  H('Chama', ['O tempo passa.', 'O fogo *continua*.', 'E fica melhor a cada ano.']),
  L('O que mais gosto em nós', ['A forma como a gente se entende', 'As brigas curtas e os beijos longos', 'Os planos que fazemos juntos', 'A certeza de que é com você']),
  F('segurar', 'Feliz aniversário, meu amor.', 'Gratidão por cada dia. *Que venham muitos mais.*')
]);

// 65 — Mesversário (aurora / envelope)
M(65, 'datas', 'aurora', 'Mesversário', abEnvelope('Mais um mês', '📆'), [
  N('Marcamos', [[1, 'mês a mais de nós'], [30, 'dias de carinho'], ['∞', 'dias pela frente']], 'Mês a mês, *a gente cresce*.'),
  H('Pequenas vitórias', ['A gente não precisa de data grande pra comemorar.', 'Cada mês é uma *vitória* de quem se escolhe.', 'Feliz mesversário. 💞']),
  F('toques', 'Mesversário feliz.', 'Que nossos meses virem *anos*, e os anos virem uma vida. Te amo.', { n: 6 })
]);

// 66 — Dia dos Namorados I (rosa / coração)
M(66, 'datas', 'rosa', 'Dia dos Namorados I', abCoracao('Feliz Dia dos Namorados', 'toque no coração'), [
  K('Presentes do coração', [['Um beijo', 'dado devagar'], ['Um abraço', 'sem hora pra acabar'], ['Uma promessa', 'de estar por perto']]),
  H('Hoje', ['Tem gente que ama de longe, de perto, de qualquer jeito.', 'Eu amo *do meu jeito*.', 'E o meu jeito sempre chega em você.']),
  L('Pra comemorar', ['Um jantar a dois, ou a pizza no sofá', 'Uma mensagem sincera, como esta', 'Um beijo bem demorado']),
  F('deslizar', 'Feliz Dia dos Namorados.', 'Hoje e todos os dias: *eu escolho você*. Te amo.', { dica2: 'deslize para abrir o coração' })
]);

// 67 — Dia dos Namorados II (crepúsculo / coração)
M(67, 'datas', 'crepusculo', 'Dia dos Namorados II', abCoracao('Hoje é dia de nós', 'toque no coração'), [
  S('Termômetro do amor', [['Carinho', 100], ['Companhia', 100], ['Saudade quando não está perto', 100]], 'Resultado do dia: *amor em estado puro*.'),
  H('Dia 12', ['Dia dos Namorados é bom.', 'Mas amar é *todo dia*.', 'Só que hoje eu quis registrar.']),
  F('segurar', 'Meu amor.', 'Gratidão por me escolher todo dia. *Feliz Dia dos Namorados.*')
]);

// 68 — Dia dos Namorados III (neon / terminal)
M(68, 'datas', 'neon', 'Dia dos Namorados III', abTerminal('12/06', ['verificando data...', 'evento: Dia dos Namorados', 'ação: declarar amor']), [
  H('Log', ['Mensagem de amor enviada com sucesso.', 'Remetente: alguém que *te ama*.', 'Destinatário: o coração mais importante do meu mundo.']),
  N('Estatísticas do dia', [[1, 'pessoa insubstituível'], [100, '% de amor'], ['∞', 'beijos']], 'Tudo certo. Sem erros.'),
  L('Lista de tarefas', ['Te abraçar forte', 'Te dizer te amo sem pressa', 'Agradecer por você existir']),
  F('segurar', 'Executado.', 'Feliz Dia dos Namorados. *Te amo* em todas as linguagens.')
]);

// 69 — Natal (ouro / terminal)
M(69, 'datas', 'ouro', 'Natal de luz', abTerminal('Feliz Natal', ['acendendo luzes...', 'carregando abraços...', 'enviando carinho']), [
  H('Natal', ['Fim de ano é tempo de olhar pra trás.', 'Eu olho e vejo *gente que importa*.', 'E você está nessa lista.']),
  C('estrela', 'Que a estrela do Natal *ilumine* a sua casa e o seu coração.'),
  F('segurar', 'Feliz Natal.', 'Saúde, paz e muita comida boa. Que a mesa esteja *cheia de gente querida*. 🎄')
]);

// 70 — Cartinha de Natal (jardim / presente)
M(70, 'datas', 'jardim', 'Cartinha de Natal', abPresente('Papai Noel passou aqui', 'toque para abrir'), [
  K('Presentes de Natal', [['Paz', 'pra dormir tranquilo'], ['Saúde', 'pra aproveitar tudo'], ['Amor', 'pra encher a casa']]),
  L('Pedidos ao bom velhinho', ['Que você sorria mais', 'Que o novo ano seja gentil', 'Que ninguém faça falta na mesa']),
  F('toques', 'Boas festas.', 'Que o Natal chegue *quentinho* no seu coração. 🎅', { n: 5 })
]);

// 71 — Ano Novo I (ouro / coração)
M(71, 'datas', 'ouro', 'Contagem do Ano Novo', abCoracao('Contagem regressiva', 'toque no coração'), [
  N('Virada', [[10, 'segundos para um ano novo'], [1, 'chance de recomeçar'], ['∞', 'possibilidades']], 'Feliz Ano Novo: *tudo pode ser diferente*.'),
  H('Resoluções', ['Ano novo, caderno novo.', 'Eu desejo que ele seja *gentil* com você.', 'Que as coisas boas durem. E as ruins passem rápido.']),
  L('Desejos', ['Muita saúde', 'Tempo pra quem importa', 'Coragem pra recomeçar', 'Pequenas alegrias todo dia']),
  F('deslizar', 'Feliz Ano Novo! 🎆', 'Que venham *365 oportunidades* de ser feliz.', { dica2: 'deslize para brindar' })
]);

// 72 — Ano Novo II (confete / terminal)
M(72, 'datas', 'confete', 'Virada de ano', abTerminal('Virada do ano', ['contando os segundos...', 'preparando fogos...', 'carregando esperança']), [
  H('Meia-noite', ['Mais um ciclo se fecha.', 'Um novo vai começar *com a força de tudo que você viveu*.']),
  N('Placar do ano', [[12, 'meses vividos'], [365, 'dias superados'], ['∞', 'motivos de orgulho']], 'Você chegou até aqui. *Isso já é vitória.*'),
  C('estrela', 'O primeiro brilho do ano *tem o seu nome*.'),
  F('deslizar', 'Feliz Ano Novo!', 'Que o próximo ano seja o *melhor* de todos. Brinde! 🥂', { dica2: 'deslize para estourar o champanhe' })
]);

// 73 — Dia das Mães (rosa / terminal)
M(73, 'datas', 'rosa', 'Dia das Mães', abTerminal('Para a mulher mais importante', ['buscando a melhor palavra...', 'palavra encontrada: mãe', 'gratidão: infinita']), [
  K('Mãe, eu aprendi', [['A cuidar', 'vendo você cuidar'], ['A insistir', 'vendo você não desistir'], ['A amar', 'porque você me ensinou']]),
  H('Gratidão', ['Mãe, não existe palavra grande o bastante pra agradecer.', 'Então mando *o que eu tenho*: todo o meu amor.', 'Você é meu primeiro e maior exemplo.']),
  F('segurar', 'Feliz Dia das Mães.', 'Te amo mais do que sei dizer. *Você é meu abrigo.* 🌸')
]);

// 74 — Dia dos Pais (oceano / envelope)
M(74, 'datas', 'oceano', 'Dia dos Pais', abEnvelope('Para o meu herói', '👔'), [
  H('Pai', ['Pai, ninguém me ensinou tanto sem precisar de tantas palavras.', 'Com os seus exemplos, *aprendi o que é força*.', 'E o que é carinho também.']),
  L('O que eu levo de você', ['A honestidade', 'O jeito de enfrentar o dia', 'A certeza de que posso contar contigo']),
  F('deslizar', 'Feliz Dia dos Pais.', 'Te admiro e te amo. *Você é meu porto seguro.* ⚓', { dica2: 'deslize para abraçar' })
]);

// 75 — Dia da Mulher (crepúsculo / terminal)
M(75, 'datas', 'crepusculo', 'Dia da Mulher', abTerminal('08/03', ['lembrando de mulheres incríveis...', 'processando coragem...', 'homenagem iniciada']), [
  H('Homenagem', ['Você enfrenta tudo e ainda faz parecer leve.', 'Isso não é pouco.', 'É *força* de verdade.']),
  L('Você é', ['Inteligente', 'Corajosa', 'Inspiradora', 'Insubstituível']),
  C('coracao', 'Hoje e sempre: *respeito, admiração e carinho*.'),
  F('toques', 'Feliz Dia da Mulher.', 'Que o mundo seja mais justo com você. E que você nunca esqueça *o quanto vale*. 💜', { n: 6 })
]);

// 76 — Dia do Amigo (neon / presente)
M(76, 'datas', 'neon', 'Dia do Amigo', abPresente('20 de julho', 'toque para abrir'), [
  N('Amizade', [[1, 'data pra lembrar'], [365, 'dias de amizade possível'], ['∞', 'gratidão']], 'Amizade boa *não precisa de data*, mas hoje é bom lembrar.'),
  K('Brinde', [['Aos risos', 'que não têm explicação'], ['Aos conselhos', 'que salvaram o dia'], ['À presença', 'que não falha']]),
  F('segurar', 'Feliz Dia do Amigo.', 'Valeu por ser parte da minha história. *Feliz Dia do Amigo!* 🤝')
]);

// 77 — Páscoa (jardim / coração)
M(77, 'datas', 'jardim', 'Feliz Páscoa', abCoracao('Feliz Páscoa', 'toque no coração'), [
  N('Receita de Páscoa', [[1, 'abraço apertado'], [2, 'colheres de paz'], ['∞', 'chocolate']], 'Mistura tudo e *divide com quem você ama*.'),
  H('Renovação', ['Páscoa é tempo de recomeço.', 'De deixar pra trás o que pesa.', 'E de abrir espaço pro *que renova*.']),
  F('toques', 'Feliz Páscoa.', 'Que sua casa tenha paz, sua mesa tenha fartura e seu coração *muita leveza*. 🐰', { n: 5 })
]);

// 78 — Conquista (ouro / presente)
M(78, 'datas', 'ouro', 'Parabéns pela conquista', abPresente('Você conseguiu', 'toque para abrir'), [
  S('Seu desempenho', [['Esforço', 100], ['Dedicação', 100], ['Orgulho que eu sinto', 150]], 'Resultado: *conquista merecida*.'),
  H('Reconhecimento', ['Ninguém vê as noites mal dormidas.', 'Eu imagino cada uma.', 'Por isso hoje eu celebro *do jeito que você merece*.']),
  C('estrela', 'Mais uma estrela no seu caminho. *Brilha, que é sua.*'),
  F('toques', 'Parabéns pela conquista!', 'O futuro é seu e você *já provou* que sabe chegar lá. 🎓', { n: 7 })
]);

// 79 — Dia dos Professores (oceano / presente)
M(79, 'datas', 'oceano', 'Dia dos Professores', abPresente('Para quem ensina', 'toque para abrir'), [
  H('Mestre', ['Ensinar é plantar sem ver a árvore crescer.', 'Mas a gente vê.', 'E *agradece*.']),
  N('Impacto', [[1, 'pessoa que marca uma vida'], [1000, 'coisas aprendidas'], ['∞', 'gratidão']], 'Seu trabalho *continua* em cada pessoa que passou por você.'),
  F('segurar', 'Feliz Dia dos Professores.', 'Gratidão por transformar vidas. *Sua lição fica pra sempre.* 📚')
]);

// 80 — Aniversário de casamento (noite / envelope)
M(80, 'datas', 'noite', 'Aniversário de casamento', abEnvelope('Aniversário de casamento', '💍'), [
  H('Nossa história', ['Escolher alguém todo dia dá trabalho.', 'E vale cada segundo.', 'Porque *é com você* que a vida faz sentido.']),
  C('infinito', 'A aliança é redonda porque *o amor não termina*.'),
  K('Votos renovados', [['Eu prometo', 'continuar te escolhendo'], ['Eu prometo', 'rir com você nos dias difíceis'], ['Eu prometo', 'fazer o possível pra te fazer feliz']]),
  F('toques', 'Feliz aniversário de casamento.', 'Mais um ano. *E ainda mais amor.* Te amo. 💍', { n: 6 })
], 'Meu amor,\n\nMais um ano e eu continuo achando que ganhei na loteria da vida.\n\nA gente já passou por muita coisa. Já se cansou, já se perdeu um pouco, já se encontrou de novo. E em todas as versões, é você quem eu quero ao lado.\n\nGratidão por dividir a casa, os dias e os sonhos comigo.\n\nFeliz aniversário de casamento. Que a gente tenha muitos mais.');
