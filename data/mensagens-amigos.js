/* ==========================================================
   mensagens-amigos.js — ids 41 a 60 (categoria: amigos e amigas).
   Tom: gratidão, zoeira leve, companheirismo. Textos neutros (servem para amigo e amiga).
   ========================================================== */

// 41 — Anos de amizade (confete / presente)
M(41, 'amigos', 'confete', 'Anos de amizade', abPresente('Pra você, com carinho', 'toque para abrir'), [
  N('Sobre nós', [[1, 'amizade rara'], [100, 'risadas guardadas'], ['∞', 'histórias pra contar']], 'Contas feitas: *a gente é rico* em memórias.'),
  H('Reconhecimento', ['Amizade de verdade não é a que tá sempre.', 'É a que, quando aparece, parece que *nunca saiu*.', 'A nossa é assim.']),
  F('segurar', 'Valeu por tudo.', 'Seja no riso, seja na bronca: *te agradeço* por fazer parte da minha história.')
], 'Sem data, sem motivo, só vontade.\n\nTem gente que passa pela vida da gente e some. Tem gente que fica, mesmo quando não tem muita coisa pra dar em troca além da companhia.\n\nVocê é do segundo tipo. E isso, hoje em dia, vale ouro.\n\nValeu por cada conversa, cada risada, cada bronca necessária. Conta comigo, sempre.');

// 42 — Status da amizade (neon / terminal)
M(42, 'amigos', 'neon', 'Status da amizade', abTerminal('Verificando amizade...', ['ping... resposta imediata', 'latência: zero', 'conexão: estável há muito tempo']), [
  H('Log', ['Erros encontrados: 0.', 'Brigas: poucas e resolvidas.', 'Risadas: *incalculável*.']),
  S('Painel', [['Lealdade', 100], ['Zoeira', 110], ['Companhia nas horas ruins', 100]], 'Sistema aprovado. *Manter para sempre.*'),
  E('Qual comando executar agora?', [['Marcar um rolê 🍻', 'Comando aceito. *Bora combinar.*'], ['Mandar um meme 😂', 'Executado. Esse sempre funciona.'], ['Dar um abraço 🤗', 'Vai chegar no tempo certo.']]),
  F('deslizar', 'Fim do relatório.', 'Amizade é como boa conexão: quando funciona, *a gente nem percebe* até faltar. A nossa nunca falhou.', { dica2: 'deslize para encerrar' })
]);

// 43 — Teste de amizade (confete / terminal)
M(43, 'amigos', 'confete', 'Teste de amizade', abTerminal('Teste iniciado', ['carregando perguntas...', 'calculando zoeira...', 'resultado em instantes']), [
  S('Resultado', [['Companheirismo', 100], ['Paciência com você (a minha)', 70], ['Vontade de te ver rindo', 100]], 'Teste concluído: *amizade aprovada com louvor*.'),
  N('Contagem', [[1, 'parceria rara'], [365, 'dias por ano contando com você'], ['∞', 'memórias']], 'A melhor conta que eu já fiz.'),
  F('toques', 'Aprovado.', 'Resultado oficial: *amizade nota 10*. Pode ficar com o troféu.', { n: 6 })
]);

// 44 — Presente do mar (oceano / presente)
M(44, 'amigos', 'oceano', 'Presente do mar', abPresente('Um recado', 'toque para abrir'), [
  H('Mar', ['Tem amizade que é como maré.', 'Vai e volta, mas *sempre volta*.', 'A nossa nunca saiu do lugar.']),
  K('Dentro do presente', [['Respeito', 'a gente se ouve'], ['Riso', 'a gente se diverte'], ['Confiança', 'a gente se escora']]),
  F('toques', 'Cartão-postal.', 'Daqui, do meu mar, um abraço pra você. *Sua presença* melhora qualquer dia.', { n: 5 })
]);

// 45 — Bora fazer barulho (fogo / coração)
M(45, 'amigos', 'fogo', 'Bora fazer barulho', abCoracao('Isso é pra você', 'toque no coração'), [
  E('Qual é o seu superpoder de amizade?', [['Fazer rir 😂', 'Perfeito. *Ninguém sobrevive* sem esse.'], ['Ouvir 👂', 'Poucos têm. *Quem tem, vale ouro.*'], ['Dar bronca ❤️', 'Necessário. *Faz bem* no fim.']]),
  H('Verdade', ['Amizade de verdade é rara.', 'Você é das poucas pessoas com quem eu sei que posso contar.', 'Isso não se agradece só com palavras. *Mas eu tento.*']),
  F('segurar', 'Boa vibe.', 'Conta comigo, sempre. *Sem condição, sem prazo.*')
]);

// 46 — Carta sem motivo (noite / envelope)
M(46, 'amigos', 'noite', 'Carta sem motivo', abEnvelope('Sem motivo, só porque sim', '📩'), [
  L('Coisas que não digo sempre', ['Você faz diferença na minha vida', 'Eu admiro o seu jeito', 'Sinto falta quando a gente passa muito tempo sem se ver', 'Valeu por sempre estar por perto']),
  H('Nota', ['Não é aniversário nem nada.', 'É só *vontade de agradecer*.', 'Quem tem uma amizade assim, tem sorte.']),
  F('deslizar', 'Fica a nota.', 'Agora volta pra rotina com *um sorriso* a mais. De nada. 😄', { dica2: 'deslize para fechar a carta' })
]);

// 47 — Você vale ouro (ouro / presente)
M(47, 'amigos', 'ouro', 'Você vale ouro', abPresente('Para quem vale ouro', 'toque para abrir'), [
  H('Valor', ['Tem coisa que dinheiro nenhum compra.', 'Uma amizade *sincera* é uma delas.', 'E eu tenho a sua.']),
  L('Por que você vale ouro', ['Aparece quando mais preciso', 'Fala a verdade, mesmo quando dói', 'Comemora minhas vitórias de verdade', 'Sabe a hora de rir e a hora de calar']),
  F('segurar', 'Medalha de ouro.', 'Categoria: *melhor amizade*. Vencedor: você. Sem concorrentes. 🏅')
]);

// 48 — Luz na estrada (aurora / coração)
M(48, 'amigos', 'aurora', 'Luz na estrada', abCoracao('Alguém lembrou de você', 'toque no coração'), [
  K('Quando você aparece', [['Eu rio', 'mais do que devia'], ['Eu relaxo', 'sem esforço'], ['Eu lembro', 'que a vida é boa']]),
  N('Medidor', [[100, '% de confiança'], [100, '% de carinho'], ['∞', 'vontade de rolê']], 'Amizade assim *ilumina a estrada*.'),
  F('deslizar', 'Seguimos juntos.', 'Seja noite ou dia, a gente se encontra. *Valeu por tudo.*', { dica2: 'deslize para continuar' })
]);

// 49 — Regando a amizade (jardim / terminal)
M(49, 'amigos', 'jardim', 'Regando a amizade', abTerminal('Verificando plantas...', ['umidade da amizade: ótima', 'folhas: verdes', 'raízes: firmes há anos']), [
  H('Jardim', ['Amizade também precisa ser regada.', 'Com mensagem, com visita, com *café marcado*.', 'E por isso essa mensagem.']),
  E('O que a gente rega agora?', [['Um café ☕', 'Combinado, *a gente se acerta*.'], ['Uma conversa longa 📞', 'Pode ligar. *Eu atendo.*'], ['Um abraço 🤗', 'Já tá *a caminho*.']]),
  F('segurar', 'Crescendo juntos.', 'Que a nossa amizade *dê sombra boa* por muito tempo. 🌳')
]);

// 50 — Memórias boas (crepúsculo / envelope)
M(50, 'amigos', 'crepusculo', 'Memórias boas', abEnvelope('Memórias boas', '🌇'), [
  S('Balanço da amizade', [['Boas memórias', 100], ['Perrengues superados', 100], ['Risadas', 120]], 'Saldo: *positivo*, muito. Vale cada segundo.'),
  L('Guardado no peito', ['As conversas que viram madrugada', 'Os planos que não deram certo e deram risada', 'A certeza de que posso contar contigo']),
  F('segurar', 'Brinde.', 'Um brinde ao que a gente viveu e ao que ainda vem. *Valeu por estar aqui.* 🥂')
]);

// 51 — Dia de comemorar você (confete / coração)
M(51, 'amigos', 'confete', 'Dia de comemorar você', abCoracao('É dia de festa', 'toque no coração'), [
  H('Sério', ['Não precisa de data.', 'Hoje eu resolvi comemorar *você*.', 'Porque você merece mais do que um dia só.']),
  K('Cartas da sorte', [['Sorte', 'ter você por perto'], ['Alegria', 'de compartilhar a vida'], ['Orgulho', 'de ver você crescendo']]),
  L('Bônus', ['Pode me chamar quando quiser', 'Pode contar tudo, sem julgamento', 'Pode ser você mesmo, sempre']),
  F('toques', 'Fim da festa.', 'Mas a amizade continua. *Sempre.* 🎉', { n: 6 })
]);

// 52 — Mensagem secreta (neon / envelope)
M(52, 'amigos', 'neon', 'Mensagem ultrassecreta', abEnvelope('Ultrassecreto', '🕵️'), [
  N('Arquivo confidencial', [[1, 'melhor amizade'], [0, 'vezes que você me decepcionou de verdade'], ['∞', 'vezes que você me salvou']], 'Documento arquivado com carinho: *você é parte da família que a gente escolhe*.'),
  L('Dossiê', ['Nome: pessoa incrível', 'Habilidade: fazer rir e acolher', 'Periculosidade: nenhuma, só carinho']),
  F('toques', 'Arquivo encerrado.', 'Missão cumprida: *te agradecer*. Fim da transmissão. 📡', { n: 5 })
]);

// 53 — Maré de lembranças (oceano / coração)
M(53, 'amigos', 'oceano', 'Maré de lembranças', abCoracao('Deu vontade de lembrar', 'toque no coração'), [
  S('Nível de saudade', [['Rolês antigos', 95], ['Conversas boas', 100], ['Você', 100]], 'Saudade identificada: *alta*. Tratamento recomendado: um encontro.'),
  E('Qual lembrança volta primeiro?', [['Uma risada 😂', 'Dessas que *dói a barriga*.'], ['Uma viagem 🚗', 'Aquelas que ficam *pra sempre*.'], ['Um perrengue 😅', 'Que hoje é *a melhor história*.']]),
  F('toques', 'Bora fazer outra?', 'Memória nova, no tempo certo. *Eu topo.*', { n: 5 })
]);

// 54 — Zoeira sob controle (fogo / terminal)
M(54, 'amigos', 'fogo', 'Zoeira sob controle', abTerminal('Modo zoeira ativado', ['carregando apelidos...', 'piadas internas: 247', 'vergonha alheia: 0']), [
  H('Aviso', ['Esta mensagem pode conter *sentimentalismo*.', 'Não se assuste.', 'É só gratidão disfarçada de brincadeira.']),
  K('Verdades', [['Você é', 'pessoa de confiança'], ['Você tem', 'um coração enorme'], ['Você faz', 'a vida ter mais graça']]),
  E('Reação esperada:', [['Me emocionei 😭', 'Normal. *Eu também*, às vezes.'], ['Fiz piada 😂', 'Esperado. *Melhor sinal* de amizade.'], ['Fingi que não li 🙃', 'Sem problema, *eu insisto*.']]),
  F('toques', 'Fim do modo zoeira.', 'Mas a gratidão fica. *Valeu por ser você.*', { n: 6 })
]);

// 55 — Aurora de amigos (aurora / presente)
M(55, 'amigos', 'aurora', 'Medidor quebrou', abPresente('Tem recado aí dentro', 'toque para abrir'), [
  S('Medidor de amizade', [['Cumplicidade', 100], ['Lealdade', 100], ['Zoeira', 100]], 'Tudo no máximo. *Medidor quebrou.*'),
  L('Deixo registrado', ['Pode contar comigo', 'Quando precisar, é só chamar', 'Sua alegria me alegra', 'Amizade assim não se acha fácil']),
  F('deslizar', 'Registro feito.', 'Assinado: *quem valoriza a amizade que a gente tem*.', { dica2: 'deslize para assinar' })
]);

// 56 — Madrugada de amizade (noite / terminal)
M(56, 'amigos', 'noite', 'Madrugada de amizade', abTerminal('Modo madrugada', ['lembrando conversas até tarde...', 'carregando risadas...', 'saudade.exe em execução']), [
  N('Madrugadas', [[100, 'conversas sem fim'], [7, 'problemas resolvidos'], ['∞', 'vezes que você ouviu sem julgar']], 'Eu não esqueço quem *esteve junto*.'),
  K('Lembrete', [['Você é', 'muito mais forte do que acha'], ['Você tem', 'gente que torce por você'], ['Eu sou', 'uma dessas pessoas']]),
  E('Hoje a madrugada pede:', [['Conversa longa 💬', 'Então *me chama*.'], ['Silêncio acompanhado 🌙', 'Também *vale*.'], ['Piada ruim 😂', 'Tenho *estoque*.']]),
  F('deslizar', 'Boa noite, amizade.', 'Descansa. Quando acordar, lembra: *você tem alguém* do seu lado.', { dica2: 'deslize para dormir' })
]);

// 57 — Medalha de honra (ouro / envelope)
M(57, 'amigos', 'ouro', 'Medalha de honra', abEnvelope('Condecoração', '🏅'), [
  K('Prêmios', [['Melhor conselho', 'sempre na hora certa'], ['Melhor risada', 'contagia o ambiente'], ['Melhor presença', 'mesmo à distância']]),
  L('Cerimônia', ['Agradeço à academia (eu, claro)', 'Agradeço à plateia (a vida)', 'Agradeço a quem merece o prêmio: *você*']),
  F('toques', 'Medalha entregue.', 'Use com orgulho. Você *conquistou* cada pedacinho desse reconhecimento. 🏅', { n: 5 })
]);

// 58 — Recado no fim do dia (crepúsculo / presente)
M(58, 'amigos', 'crepusculo', 'Recado no fim do dia', abPresente('Um recado no fim do dia', 'toque para abrir'), [
  H('Fim do dia', ['Passei o dia inteiro correndo.', 'No fim, parei e pensei em quem me faz *bem*.', 'Você apareceu rápido.']),
  E('E você, como está?', [['Cansaço total 😮‍💨', 'Respira. *Você já fez o bastante hoje.*'], ['Bem! 😄', 'Que bom. *Mantém essa energia.*'], ['Precisando de abraço 🫂', 'Vai chegar, *no tempo certo*.']]),
  N('Resumo', [[1, 'pessoa especial lembrada'], [1, 'mensagem enviada'], ['∞', 'carinho']], 'Fim do dia, com o que *importa*.'),
  F('segurar', 'Até logo.', 'Cuida de você. Se precisar, *eu tô aqui*.')
]);

// 59 — Semente de amizade (jardim / envelope)
M(59, 'amigos', 'jardim', 'Semente de amizade', abEnvelope('Plantei uma ideia', '🌱'), [
  K('Sementes', [['Respeito', 'base de tudo'], ['Risada', 'adubo bom'], ['Presença', 'água todo dia']]),
  S('Crescimento', [['Raiz', 100], ['Folhas', 90], ['Frutos', 85]], 'Árvore *saudável*. E dando sombra boa.'),
  F('deslizar', 'Cresceu.', 'A amizade que a gente cultivou virou *abrigo*. Que ela continue crescendo. 🌳', { dica2: 'deslize para regar' })
]);

// 60 — Parabéns por existir (confete / envelope)
M(60, 'amigos', 'confete', 'Parabéns por existir', abEnvelope('Convite: comemorar você', '🎊'), [
  S('Ranking', [['Pessoas legais que conheço', 100], ['Você no ranking', 100], ['Concorrentes', 0]], 'Primeiro lugar *absoluto*. 🏆'),
  E('Qual título combina com você?', [['Melhor rolê 🎉', 'Aprovado. *Está no registro.*'], ['Melhor ombro amigo 🫂', 'Perfeito. *É o que você é.*'], ['Os dois 😎', 'Resposta correta. *Já é.*']]),
  L('Brinde final', ['À amizade', 'Às boas risadas', 'Aos próximos capítulos']),
  F('segurar', 'Saúde!', 'Que a gente continue tendo *muito motivo* pra brindar. 🥂')
]);
