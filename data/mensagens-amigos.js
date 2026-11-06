/* ==========================================================
   mensagens-amigos.js — ids 41 a 60 (categoria: amigos e amigas).
   Tom: gratidão, zoeira leve, companheirismo. Textos neutros (servem para amigo e amiga).
   Cada mensagem usa uma arte só dela (js/artes-amigos.js).
   ========================================================== */

// 41 — Álbum de figurinhas.
M(41, 'amigos', 'confete', 'Figurinha rara', abArte('figurinhas', {
  titulo: 'ÁLBUM DA NOSSA AMIZADE', pacote: 'ABRIR PACOTE', fecho: 'Álbum completo. *Você é a figurinha que ninguém troca.*', fim: 'guardar o álbum ›',
  figs: [{ e: '😂', t: 'Quem me faz *rir* na hora errada' }, { e: '🛟', t: 'Quem aparece na *hora ruim*' }, { e: '🤫', t: 'Quem guarda *meus segredos*' }, { e: '🍕', t: 'Quem divide a *última fatia*' }]
}, { forma: '★', qtd: 12 }), [
  F('Figurinha carimbada.', 'Passei a vida juntando gente. *A mais rara da coleção é você.*')
], 'Sem data, sem motivo, só vontade.\n\nTem gente que passa pela vida da gente e some. Tem gente que fica, mesmo quando não tem muita coisa pra dar em troca além da companhia.\n\nVocê é do segundo tipo. E isso, hoje em dia, vale ouro.\n\nValeu por cada conversa, cada risada, cada bronca necessária. Conta comigo, sempre.');

// 42 — Ficha de personagem.
M(42, 'amigos', 'neon', 'Nível máximo', abArte('rpg', {
  titulo: 'MELHOR AMIZADE', nivel: 'NÍVEL 99 · CLASSE: PARCEIRA DE TUDO', botao: 'VER ATRIBUTOS', fim: 'CONTINUAR',
  atributos: [['LEALDADE', 100], ['ZOEIRA', 95], ['RESPONDE MENSAGEM', 42], ['ESTAR LÁ QUANDO PRECISA', 100]],
  conquistas: ['★ DESBLOQUEADO: AGUENTOU MEU DRAMA', '★ DESBLOQUEADO: RIU DA MINHA PIADA RUIM']
}, { qtd: 0 }), [
  F('Fim de jogo? Nunca.', 'Essa campanha é *cooperativa até o fim*, e eu não troco de parceria.')
]);

// 43 — Prova de amizade.
M(43, 'amigos', 'jardim', 'Prova de amizade', abArte('prova', {
  titulo: 'Avaliação final de amizade', aluno: 'nome: a melhor pessoa da turma', nota: '10', obs: 'Aprovação com louvor. Não precisa estudar *mais nada*.', fim: 'entregar a prova ›',
  questoes: [
    { p: '1. Quem sempre aparece quando dá ruim?', o: ['Você', 'Você, de novo', 'Adivinha: você'], r: 'Certíssimo!' },
    { p: '2. Quem ri das minhas piores piadas?', o: ['Só você', 'Ninguém mais', 'Você, por pena'], r: 'Essa também vale!' },
    { p: '3. Sem você, minha vida seria:', o: ['Mais chata', 'Bem mais chata', 'Insuportável'], r: 'Todas certas, *e eu nem colei*.' }
  ]
}, { qtd: 0 }), [
  F('Boletim fechado.', 'Em amizade, *sua média é a maior da escola*. Passei de ano só por te conhecer.')
]);

// 44 — Pescaria.
M(44, 'amigos', 'oceano', 'Pesca do dia', abArte('pesca', {
  abre: 'Vamos ver o que a vida fisgou.', botao: 'segure para puxar a linha', fim: 'voltar para a margem ›',
  pescas: [{ e: '🥾', t: 'Uma bota velha. Como as minhas amizades antigas.' }, { e: '🐟', t: 'Um peixe, e ele *fugiu*, igual aos meus compromissos.' }, { e: '💎', t: 'Achei! *Uma amizade rara*, e ela é você.' }]
}, { qtd: 0 }), [
  F('Melhor pescaria da vida.', 'No mar de gente desse mundo, *eu fisguei a pessoa certa*.')
]);

// 45 — Bateria eletrônica.
M(45, 'amigos', 'fogo', 'Bora fazer barulho', abArte('pads', {
  titulo: 'BANDA DOS DOIS', abre: 'Toque em todos os pads!', pads: ['BUMBO', 'CAIXA', 'CHIMBAL', 'TOM', 'SURDO', 'PRATO'], fim: 'fim do show ›',
  frases: ['Essa é pela *risada alta*.', 'Essa, pelas *histórias* que a gente não conta.', 'Essa, pela *zoeira* sem fim.', 'Essa, por quem *fica até o fim* da festa.', 'Essa, pela *amizade* que faz barulho.', 'E esse prato é *pra acordar o prédio*!']
}, { qtd: 0 }), [
  F('Bis! Bis! Bis!', 'Nosso show nunca termina. E *a plateia é só a gente*, do jeito certo.')
]);

// 46 — Boleto da amizade.
M(46, 'amigos', 'noite', 'Boleto da amizade', abArte('boleto', {
  banco: 'Banco da Amizade S.A.', botao: 'pagar com um abraço', carimbo: 'PAGO', fim: 'guardar o comprovante ›',
  campos: [['Beneficiário', 'Eu, que te devo muito'], ['Referente a', 'Risadas, conselhos e colos'], ['Vencimento', 'Nunca'], ['Valor', '*Impagável*']],
  fecho: 'Dívida quitada? *Nem em mil anos.* Vou seguir devendo com gosto.'
}, { forma: '✦', qtd: 10 }), [
  F('Nada a declarar.', 'Tem coisa que dinheiro não paga. *Valeu por tudo mesmo.*')
]);

// 47 — Pódio.
M(47, 'amigos', 'ouro', 'Pódio das amizades', abArte('podio', {
  titulo: 'CAMPEONATO DE AMIZADE', terceiro: 'Meu cachorro', segundo: 'Minha cama', primeiro: 'Você', botao: 'próximo colocado', ouro: 'revelar o campeão', fim: 'sair do pódio ›',
  fecho: 'Foi por pouco, mas o campeão *é você*. Sem VAR, sem recurso.'
}, { forma: '★', qtd: 10 }), [
  F('Hino nacional, por favor.', 'Medalha de ouro em *estar sempre presente*. Merecidíssima.')
]);

// 48 — Estrada à noite.
M(48, 'amigos', 'aurora', 'Luz na estrada', abArte('estrada', {
  comecar: 'pegar a estrada', botao: 'acelerar', fim: 'parar o carro ›',
  placas: ['Próxima saída: *histórias que a gente vive contando*', 'Atenção: trecho difícil, *mas você veio junto*', 'Destino: não importa. *Companhia: a melhor*']
}, { qtd: 0 }), [
  F('Viagem sem volta.', 'Pode ser longe, pode ser perto. *Com você eu vou até o fim da estrada.*')
]);

// 49 — Cacto.
M(49, 'amigos', 'jardim', 'Amizade tipo cacto', abArte('cacto', {
  abre: 'Nossa amizade é tipo cacto.', botao: 'regar', fim: 'continuar ›',
  frases: ['Passa meses *sem água* e não morre.', 'Tem seus *espinhos*, a gente sabe.', 'Quem vê de fora nem imagina *a força* que tem.', 'E, quando menos se espera, *dá flor*.']
}, { qtd: 0 }), [
  F('Não precisa regar sempre.', 'Tem amizade que aguenta seca, distância e correria. *A nossa é dessas.*')
]);

// 50 — Fita VHS.
M(50, 'amigos', 'crepusculo', 'Fita da amizade', abArte('vhs', {
  rebobina: '◀◀ REBOBINANDO', tocando: '▶ PLAY', play: '▶ apertar play', fim: '■ parar a fita',
  memorias: ['Cena 1: a gente sem dinheiro, rindo de tudo.', 'Cena 2: aquela história que *nunca vamos contar* pra ninguém.', 'Cena 3: você do meu lado, *no dia em que eu mais precisei*.', 'Melhores momentos da minha vida: *quase todos têm você*.']
}, { qtd: 0 }), [
  F('Fim da fita.', 'Essa eu não gravo por cima de jeito nenhum. *Vai pra sempre na coleção.*')
]);

// 51 — Máquina de garra.
M(51, 'amigos', 'confete', 'Prêmio da garra', abArte('garra', {
  titulo: 'PEGUE UM PRÊMIO', botao: 'soltar a garra', fim: 'levar os prêmios ›',
  frases: ['Prêmio: *um ombro* pra qualquer hora.', 'Prêmio: *um conselho* que você não pediu.', 'Prêmio máximo: *minha amizade*, sem devolução.']
}, { forma: '★', qtd: 10 }), [
  F('Ganhou tudo.', 'Essa máquina nunca me deu nada. *Quem me deu sorte foi você.*')
]);

// 52 — Dossiê.
M(52, 'amigos', 'neon', 'Arquivo confidencial', abArte('dossie', {
  titulo: 'CONFIDENCIAL', codigo: 'Processo nº 007 · Sujeito: você', dica: 'toque nas tarjas pretas', carimbo: 'MELHOR AMIZADE', fim: 'queimar o arquivo ›',
  linhas: [['Conhecida por:', 'rir na hora *errada*'], ['Sabe de:', 'tudo o que *eu já fiz*'], ['Perigo:', 'me convencer de *qualquer ideia*'], ['Veredito:', 'essencial para a *minha vida*']]
}, { qtd: 0 }), [
  F('Este arquivo se autodestrói.', 'Mas nossa amizade não. *Você sabe demais* para eu te deixar ir embora.')
]);

// 53 — Postais.
M(53, 'amigos', 'oceano', 'Postais de nós', abArte('postais', {
  dica: 'deslize o postal para o lado', fim: 'guardar os postais ›',
  postais: [{ l: 'Saudades!', t: 'Mesmo longe, *eu te carrego* em toda história que eu conto.' }, { l: 'Tempo bom', t: 'Tudo fica melhor *quando você tá junto*.' }, { l: 'Volta logo', t: 'Sem você, a resenha *fica sem graça*.' }],
  fecho: 'Não importa onde a gente esteja. *Amizade não tem CEP.*'
}, { forma: '✈', qtd: 8 }), [
  F('Volta logo.', 'Distância é só um detalhe. *Eu te guardo do mesmo jeito.*')
]);

// 54 — Botão vermelho.
M(54, 'amigos', 'fogo', 'Não aperte', abArte('botao', {
  aviso: 'PERIGO · NÃO APERTE', rotulo: 'NÃO APERTE', abre: 'Sério. Não aperta.', fim: 'fugir do local ›',
  frases: ['Você apertou. *Claro* que apertou.', 'De novo?! *Típico de você.*', 'Por isso eu te amo, sua *péssima influência*.', 'Sistema de zoeira *fora de controle*.', 'Melhor pessoa pra *fazer besteira* junto.']
}, { qtd: 0 }), [
  F('Nada sob controle.', 'E é assim que eu gosto. Vida sem você *seria muito mais segura e bem mais chata*.')
]);

// 55 — Rádio comunicador.
M(55, 'amigos', 'aurora', 'Câmbio', abArte('radio', {
  botao: 'segure para falar', espera: 'Canal aberto. Aguardando...', transmitindo: 'Transmitindo...', fim: 'câmbio, desligo ›',
  falas: ['Na escuta? *Sempre.* Câmbio.', 'Se der ruim, *chama que eu vou*. Câmbio.', 'Em qualquer frequência, *conta comigo*. Câmbio.']
}, { qtd: 0 }), [
  F('Câmbio final.', 'Eu mudo de cidade, de emprego, de tudo. *Essa frequência eu não mudo.*')
]);

// 56 — Ligação de madrugada.
M(56, 'amigos', 'noite', 'Três da manhã', abArte('ligacao', {
  hora: '03:07', contato: 'Quem sempre atende', estado: 'chamando...', dica: 'deslize para atender', fim: 'desligar ›',
  frases: ['Tá acordando? Não importa, *eu sei que você atende*.', 'Poucas pessoas têm passe livre pras 3 da manhã.', 'Você é *a primeira* da lista.']
}, { qtd: 0 }), [
  F('Ligação encerrada.', 'Se um dia tocar o seu telefone a essa hora, *é porque eu confio em você*.')
]);

// 57 — Diploma.
M(57, 'amigos', 'ouro', 'Diploma de amizade', abArte('diploma', {
  instituicao: 'UNIVERSIDADE DA VIDA', titulo: 'Diploma de Honra', corpo: 'Conferido a você, pelos serviços prestados em *escuta, zoeira e paciência*, sem nunca cobrar nada.',
  quem: 'Reitoria do Meu Coração', botao: 'assinar', fim: 'pendurar na parede ›'
}, { forma: '✧', qtd: 12 }), [
  F('Formatura eterna.', 'Sem você eu não teria *passado em metade* das matérias da vida.')
]);

// 58 — Porta da geladeira.
M(58, 'amigos', 'crepusculo', 'Recado na geladeira', abArte('geladeira', {
  dica: 'toque nos recados para tirar', fim: 'fechar a geladeira ›',
  recados: ['Bebe *água*, gênio', 'Você é *melhor* do que pensa', 'Eu sei que hoje *foi difícil*', 'Come alguma coisa, *por favor*'],
  fecho: 'Recado final: *tô aqui, viu?* Sempre.'
}, { qtd: 0 }), [
  F('Assinado: quem se importa.', 'Se a semana apertar, *lê esses recados de novo*.')
]);

// 59 — Biscoito da sorte.
M(59, 'amigos', 'jardim', 'Biscoito da sorte', abArte('biscoito', {
  dica: 'toque 3 vezes para quebrar', sorte: 'Sua sorte de hoje: *você tem um amigo* que pensou em você sem motivo.', numeros: 'números da sorte: 1 · 4 · 7 · sempre', fim: 'comer o biscoito ›'
}, { qtd: 0 }), [
  F('Previsão confirmada.', 'Nem precisava de biscoito. *A sorte foi te conhecer.*')
]);

// 60 — Piñata.
M(60, 'amigos', 'confete', 'Piñata da amizade', abArte('pinata', {
  dica: 'toque na piñata para bater', fecho: 'Estourou! *Saiu tudo que eu sinto por você.*', fim: 'recolher os doces ›',
  frases: ['Essa é pela vez que você *me deixou no vácuo*.', 'Essa é por *rir da minha cara*.', 'Essa é por *saber demais*.', 'E essa é por eu *não viver sem você*!']
}, { forma: '🍬', qtd: 10 }), [
  F('Parabéns por existir.', 'Sem data, sem motivo. *Só porque a vida é melhor com você nela.*')
]);
