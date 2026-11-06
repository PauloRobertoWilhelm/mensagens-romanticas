/* ==========================================================
   mensagens-paquera.js — ids 1 a 20 (categoria: paquera).
   Tom: leve, charmoso, sem pressão. NENHUMA termina pedindo para sair.
   ========================================================== */

// 1 — Sem querer, você (noite / terminal)
M(1, 'paquera', 'noite', 'Sem querer, você', abTerminal('Pensei em você.', ['iniciando pensamento...', 'procurando motivo pra sorrir...', 'encontrado: você']), [
  H('Confissão', ['Eu juro que tentei *disfarçar*.', 'Mas você aparece na minha cabeça sem pedir licença.', 'E fica. Como quem já conhece o caminho.']),
  C('coracao', 'Tem gente que a gente encontra e o *universo* arruma o resto.'),
  K('Três coisas sobre você', [['Seu sorriso', 'desarma qualquer defesa que eu tinha'], ['Sua cabeça', 'é o que mais me prende'], ['Seu jeito', 'deixa o dia mais leve']]),
  F('segurar', 'Era isso.', 'Não precisa responder agora. Só queria que você soubesse que *alguém aqui* sorri toda vez que lembra de você.')
], 'Eu não sou de escrever cartas, mas hoje deu vontade.\n\nVocê tem esse jeito de ocupar a cabeça da gente sem fazer esforço nenhum. Uma conversa, um sorriso, e pronto: o dia muda de cor.\n\nNão espero nada em troca. Só queria deixar registrado que você é o tipo de pessoa que a gente quer por perto.\n\nSe isso te fez sorrir, já valeu cada palavra.');

// 2 — Radar de charme (neon / coração)
M(2, 'paquera', 'neon', 'Radar de charme', abCoracao('Detectei algo.', 'toque no coração'), [
  S('Escaneando você', [['Charme', 120], ['Inteligência', 100], ['Simpatia', 97], ['Pensamentos meus sobre você', 100]], 'Resultado: *encantadora*. Sem cura conhecida.'),
  H('Relatório', ['Análise concluída.', 'Conclusão técnica: você é *demais*.', 'E eu estou *sem defesa* nenhuma.']),
  F('toques', 'Mensagem entregue.', 'Sem pressão. Só uma forma criativa de dizer que você *chamou minha atenção*.', { n: 5, dica: 'toque 5 vezes para finalizar' })
]);

// 3 — Bilhete com cheiro de flor (rosa / envelope)
M(3, 'paquera', 'rosa', 'Bilhete com cheiro de flor', abEnvelope('Para você 🌸', '🌷'), [
  H('Bilhete', ['Hoje acordei com uma vontade boba.', 'A de te contar que você é *bonita* por fora e *inteira* por dentro.', 'Isso é raro. Eu percebi.']),
  L('Pequenas razões', ['Seu jeito de falar prende a atenção', 'Sua risada é contagiante', 'Você tem um olhar que diz muito', 'Perto de você o dia passa mais leve']),
  F('deslizar', 'Pra você ♥', 'Sem pressa, sem cobrança. Só *carinho* chegando do jeito mais gentil que eu sei.', { dica2: 'deslize para ler' })
]);

// 4 — Presente de ideia (aurora / presente)
M(4, 'paquera', 'aurora', 'Presente de ideia', abPresente('Isto é pra você', 'toque para abrir'), [
  N('Sobre você, em números', [[1, 'sorriso que me desmontou'], [24, 'horas com você na cabeça'], [100, 'motivos pra querer conversar']], 'Números não mentem: *você importa*.'),
  H('Verdade', ['Já reparou que tem gente que ilumina o ambiente sem fazer esforço?', 'Você é *assim*.']),
  F('segurar', 'Presente entregue.', 'O presente é saber que alguém *pensa em você* com carinho. Ele é seu, sem prazo pra desembrulhar.')
]);

// 5 — Pôr do sol (crepúsculo / envelope)
M(5, 'paquera', 'crepusculo', 'Um pôr do sol pra você', abEnvelope('Olha o céu hoje', '🌅'), [
  C('estrela', 'Se o céu pudesse escrever, escreveria o que *eu sinto* quando lembro de você.'),
  H('Fim de tarde', ['Dia cansativo? Respira.', 'Se eu pudesse, te mandava esse céu inteiro.', 'Como não dá, mando o *pensamento* que ele me deu: você.']),
  E('Pergunta rápida: como está o seu dia?', [['Cansativo, mas tô aqui 😅', 'Então que essa mensagem seja um *respiro* no meio dele.'], ['Tá bom 😊', 'Que bom! Agora está *um pouquinho melhor*, espero.'], ['Nem me fala 🙃', 'Então senta aqui um segundo. *Você merece leveza.*']]),
  F('toques', 'Boa noite, em adiantado.', 'Que o resto do seu dia seja leve. E que você lembre: *tem alguém torcendo por você*.', { n: 6 })
]);

// 6 — Aquecimento global (fogo / terminal)
M(6, 'paquera', 'fogo', 'Aquecimento global', abTerminal('Temperatura subindo.', ['verificando clima...', 'calor detectado: 100% por sua causa', 'ventilador não resolve']), [
  S('Termômetro', [['Calor no ambiente', 98], ['Culpa sua', 100], ['Vontade de te ver sorrir', 110]], 'Diagnóstico: *encantamento agudo*. Causa conhecida: você.'),
  N('Contagem', [[7, 'dias da semana pensando em você'], [24, 'horas disponíveis pra sorrir'], ['∞', 'vontade de conversar']], 'Se você chegou até aqui, *já me ganhou* de novo.'),
  F('deslizar', 'Chegou ao fim.', 'Pode rir, pode se fazer de difícil, pode demorar pra responder. Se fez você sorrir, *já valeu*.', { dica2: 'deslize para esfriar' })
]);

// 7 — Maré (oceano / coração)
M(7, 'paquera', 'oceano', 'Maré', abCoracao('Vem comigo', 'toque no coração'), [
  H('Maré', ['Tem pensamento que chega como onda.', 'Vem devagar, cresce e *molha tudo*.', 'O meu de hoje tinha o seu jeito.']),
  C('infinito', 'Algumas coisas parecem não ter fim. A vontade de te *conhecer melhor* é uma delas.'),
  F('segurar', 'Mar calmo.', 'Sem pressa, sem correnteza. Só queria deixar essa mensagem *boiando* por aí até você achar.')
]);

// 8 — Raridade (ouro / presente)
M(8, 'paquera', 'ouro', 'Raridade', abPresente('Para uma pessoa rara', 'toque para abrir'), [
  K('Três raridades', [['Inteligência', 'pensa fundo e fala bonito'], ['Presença', 'enche o lugar sem fazer barulho'], ['Charme', 'natural, sem esforço nenhum']]),
  H('Reconhecimento', ['Quem tem *tudo isso* junto merece ouvir.', 'Então estou dizendo: você é *rara*.', 'E eu reparei.']),
  F('toques', 'Joia.', 'Guarda essa mensagem como se guarda uma coisa valiosa, porque *é assim* que eu vejo você.', { n: 7 })
]);

// 9 — Flor sem motivo (jardim / envelope)
M(9, 'paquera', 'jardim', 'Flor sem motivo', abEnvelope('Uma flor pra você', '🌼'), [
  L('Por que flores?', ['Porque florescem sem fazer barulho', 'Porque deixam o ambiente melhor', 'Porque lembram você']),
  H('Singelo', ['Não é data comemorativa.', 'Não é nada planejado.', 'É só *vontade* de te dar uma flor, mesmo que de mensagem.']),
  K('Escolha uma flor', [['🌹', 'paixão calma'], ['🌻', 'luz no seu dia'], ['🌷', 'carinho sem pressa']]),
  F('segurar', 'Pra você.', 'Que o seu dia floresça um pouquinho mais depois disso. *Só isso.* E já é muito.')
], 'Escolhi flor porque palavra às vezes é pouco.\n\nNão tenho um buquê pra entregar, mas tenho essa mensagem, feita com a mesma intenção: te deixar com um sorriso discreto no canto da boca.\n\nSe achou bobo, tudo bem. Gosto de coisa boba quando é de coração.');

// 10 — Mini festa (confete / coração)
M(10, 'paquera', 'confete', 'Mini festa', abCoracao('Surpresa!', 'toque no coração'), [
  E('Escolha: o que combina mais com você?', [['Café ☕', 'Calma, profundidade e aquele *cheiro bom* de começo de dia.'], ['Festa 🎉', 'Energia, riso solto e gente *ao redor* querendo ficar.'], ['Livro 📚', 'Curiosidade e um mundo inteiro por trás do olhar.']]),
  S('Placar do dia', [['Sorrisos meus por você', 100], ['Charme', 115], ['Vontade de conversar', 100]], 'Placar final: *você venceu*. Sem concorrência.'),
  F('deslizar', 'Fim da festa.', 'Mas se quiser, a conversa continua. *No seu tempo.*', { dica2: 'deslize para encerrar' })
]);

// 11 — Estrela cadente (noite / presente)
M(11, 'paquera', 'noite', 'Estrela cadente', abPresente('Faça um pedido', 'toque para abrir'), [
  H('Pedido', ['Dizem que estrela cadente realiza desejos.', 'Eu vi uma e não pedi nada pra mim.', 'Pedi que você *sorrisse mais hoje*.']),
  N('Contei por você', [[1, 'estrela cadente'], [1, 'pedido'], ['∞', 'vezes que ele pode se repetir']], 'Se o pedido se realizar, *já foi mágico*.'),
  C('estrela', 'Entre tantas estrelas, a que *mais brilha* hoje está lendo isto.'),
  F('deslizar', 'Pedido feito.', 'Agora é só deixar o universo trabalhar. Eu cuido do *resto do carinho*.', { dica2: 'deslize para soltar o pedido' })
]);

// 12 — Mensagem criptografada (neon / envelope)
M(12, 'paquera', 'neon', 'Mensagem criptografada', abEnvelope('Mensagem protegida', '🔐'), [
  K('Decodifique', [['#01', 'você tem um *sorriso* que vicia'], ['#02', 'sua cabeça funciona de um jeito *fascinante*'], ['#03', 'eu gostaria de te *conhecer melhor*']]),
  E('Senha de acesso: qual a sua vibe?', [['Calma', 'Combina com a *paz* que você passa.'], ['Intensa', 'Combina com a *intensidade* que eu notei.'], ['Misteriosa', 'Então dá vontade de *descobrir* aos poucos.']]),
  F('segurar', 'Acesso liberado.', 'Mensagem decodificada com sucesso: *você é incrível*. Fim da transmissão.')
]);

// 13 — Sinal (aurora / terminal)
M(13, 'paquera', 'aurora', 'Sinal captado', abTerminal('Sinal captado.', ['varrendo o céu...', 'sinal fraco, mas constante', 'origem: lembranças suas']), [
  S('Sintonizando', [['Sinal de simpatia', 88], ['Sinal de charme', 100], ['Vontade de ouvir sua voz', 64]], 'Sinal forte. *Recebido.*'),
  C('infinito', 'Algumas conexões a gente sente antes de *entender*.'),
  F('toques', 'Fim da transmissão.', 'Mas o canal fica aberto. *Quando quiser*, é só falar.', { n: 5 })
]);

// 14 — Doce (rosa / coração)
M(14, 'paquera', 'rosa', 'Receita doce', abCoracao('Algo doce', 'toque no coração'), [
  N('Ingredientes', [[2, 'colheres de simpatia'], [1, 'pitada de charme'], [100, '% de você']], 'Receita simples. Resultado: *irresistível*.'),
  L('Sobremesa', ['Seu sorriso: o toque final', 'Sua voz: a calda', 'Seu jeito: o que fica na memória']),
  F('segurar', 'Bom apetite.', 'Que o seu dia tenha o gosto bom que *você deixa* em quem te conhece.')
]);

// 15 — Faísca (fogo / presente)
M(15, 'paquera', 'fogo', 'Faísca', abPresente('Uma faísca', 'toque para abrir'), [
  H('Faísca', ['Tem gente que passa e some.', 'Tem gente que passa e *acende* alguma coisa.', 'Você é do segundo tipo.']),
  K('O que você acende', [['Curiosidade', 'quero saber mais'], ['Sorriso', 'aparece sozinho'], ['Coragem', 'pra mandar essa mensagem']]),
  S('Intensidade', [['Chama', 87], ['Brasa', 100], ['Incêndio', 30]], 'Controlado. *Por enquanto.* 😏'),
  F('toques', 'Fim.', 'Fogo bom é o que aquece, não o que queima. O meu é desse tipo. *Aquecendo à distância.*', { n: 6 })
]);

// 16 — Sonar (oceano / terminal)
M(16, 'paquera', 'oceano', 'Sonar', abTerminal('Procurando...', ['lançando sonar...', 'profundidade: infinita', 'objeto encontrado: seu sorriso']), [
  E('Qual dessas você é?', [['Mar calmo 🌊', 'Então vou ficar *boiando* por aqui, em paz.'], ['Ondas fortes 🌊🌊', 'Então eu *surfo*. Gosto de desafio.'], ['Mergulho fundo 🤿', 'Então tem *muita coisa boa* pra descobrir.']]),
  H('Profundezas', ['Você tem profundidade.', 'Isso é *raro* e vale mais do que aparência.', '(Mas a aparência também ajuda, não vou mentir.)']),
  F('deslizar', 'Superfície.', 'Voltei pra cima só pra te dizer: *gosto de quem você é*. Ponto.', { dica2: 'deslize para emergir' })
]);

// 17 — Mapa do tesouro (ouro / coração)
M(17, 'paquera', 'ouro', 'Mapa do tesouro', abCoracao('Um tesouro', 'toque no coração'), [
  L('O mapa leva até:', ['Uma risada que contagia', 'Um olhar que fala', 'Uma mente que encanta', 'Um jeito que não tem igual']),
  C('coracao', 'X marca o lugar: *você*.'),
  F('toques', 'Tesouro achado.', 'Não precisa de resposta. Só queria que o tesouro *soubesse que é valioso*.', { n: 7 })
]);

// 18 — Alegria (jardim / presente)
M(18, 'paquera', 'jardim', 'Medidor de alegria', abPresente('Para alegrar', 'toque para abrir'), [
  S('Medidor de alegria', [['Antes da mensagem', 40], ['Depois do primeiro sorriso', 80], ['Agora', 100]], 'Missão cumprida: *você sorriu*.'),
  H('Simples assim', ['Eu só queria te alegrar um minuto.', 'Se funcionou, o resto do meu dia está *ganho*.']),
  F('deslizar', 'Presente aceito.', 'Pode devolver em forma de sorriso. Ou de *resposta*, se der vontade.', { dica2: 'deslize para aceitar' })
]);

// 19 — Fim de expediente (crepúsculo / terminal)
M(19, 'paquera', 'crepusculo', 'Fim de expediente', abTerminal('Fim do dia.', ['salvando o dia...', 'pendências: 1 (te dizer algo bonito)', 'executando...']), [
  N('Balanço do dia', [[1, 'coisa boa a dizer'], [100, '% de sinceridade'], ['∞', 'paciência pra esperar']], 'Fechando o dia com o que importa: *você sorrindo*.'),
  K('Antes de dormir', [['Respira', 'o dia acabou, você fez o que deu'], ['Descansa', 'amanhã é uma página nova'], ['Sorri', 'porque alguém lembrou de você']]),
  F('segurar', 'Boa noite.', 'Dorme bem. Se sonhar com algo bom, *pode ser comigo*. Se não sonhar, tudo bem também. 😉')
]);

// 20 — Convite pra sorrir (confete / envelope)
M(20, 'paquera', 'confete', 'Convite para sorrir', abEnvelope('Você foi convidada', '🎈'), [
  H('Convite', ['Você está oficialmente convidada...', '...a sorrir pelo menos uma vez hoje.', 'Presença *obrigatória*. Traje: o que te deixar à vontade.']),
  C('estrela', 'Local: aqui, agora. *Dress code:* leveza.'),
  L('Programação', ['Sorrir sem motivo', 'Relaxar os ombros', 'Lembrar que você é demais']),
  F('toques', 'Confirmou presença?', 'Não precisa responder. *Já é sucesso* se você sorriu aí. 🎉', { n: 5 })
], 'Convite oficial, sem dress code e sem lista de presença.\n\nA única regra é: sorrir. Pode ser pequeno, pode ser de lado, pode ser escondido atrás da mão.\n\nSe aconteceu, missão cumprida. Agradeço a presença.');
