/* ==========================================================
   mensagens-namoro.js — ids 21 a 40 (categoria: namoro / namorada).
   Tom: amor de verdade, carinho, cumplicidade. Sem nomes.
   Cada mensagem usa uma arte só dela (js/artes-namoro.js).
   ========================================================== */

// 21 — Carta com lacre.
M(21, 'namoro', 'noite', 'Carta lacrada', abArte('lacre', {
  selo: '♥', dica: 'segure o lacre até ele derreter', fim: 'guardar a carta ›',
  linhas: ['Tem dias em que eu paro e penso em como tudo mudou.', 'Do jeito *mais bonito* possível.', 'E o motivo desse bonito tem uma risada que eu conheço de cor.']
}, { forma: '✦', qtd: 12 }), [
  F('Eu te amo.', 'Não é só hoje, nem só quando está fácil. *É sempre.* Obrigado por ser o meu lugar seguro.')
], 'Meu amor,\n\nEu poderia te mandar uma mensagem curta, mas tem coisa que não cabe em duas linhas.\n\nVocê chegou e arrumou o que eu nem sabia que estava fora do lugar. Me deu calma nos dias pesados e motivo pra rir nos dias comuns.\n\nSe o amor tem um endereço, o meu é o seu abraço.\n\nGratidão por cada dia. E pode ter certeza: eu continuo escolhendo você.');

// 22 — Instalador antigo.
M(22, 'namoro', 'neon', 'Instalar o nosso amor', abArte('instalador', {
  titulo: 'Assistente de Instalação', boas: 'Bem-vinda à instalação de *Nós 2.0*. Tamanho: o coração inteiro.', iniciar: 'Avançar >',
  etapas: ['copiando risadas...', 'instalando abraços longos...', 'removendo saudade...', 'configurando beijo de bom dia...'],
  pergunta: 'Aceita passar *todos os próximos dias* comigo?', sim: 'Sim', nao: 'Não', fecho: 'Instalação concluída. Reinicie quantas vezes quiser: *sempre volta pra você*.', fim: 'Concluir'
}, { qtd: 0 }), [
  F('Nenhum erro encontrado.', 'Só *amor em excesso*. O sistema recomenda manter para sempre.')
]);

// 23 — Bateria carregada com abraço.
M(23, 'namoro', 'rosa', 'Bateria fraca', abArte('bateria', {
  aviso: 'BATERIA FRACA · CONECTE AO SEU AMOR', abre: 'Eu sem você, às 18h de uma terça.', botao: 'segure para abraçar',
  frases: ['Sua voz: *+20%* na hora.', 'Seu cheiro: *+30%*, sem nem precisar de tomada.', 'Seu abraço: *carga rápida*, nenhum aparelho faz igual.'],
  fecho: '*100%*. Você é a única tomada que me liga de verdade.', fim: 'continuar ›'
}, { forma: '⚡', qtd: 10 }), [
  F('Carregado.', 'E se um dia eu descarregar, já sei *exatamente pra quem* voltar.')
]);

// 24 — Caixinha de música.
M(24, 'namoro', 'crepusculo', 'Caixinha de música', abArte('caixamusica', {
  dica: 'toque na manivela para dar corda', fim: 'fechar a tampa ›',
  versos: ['Se eu pudesse guardar um som, seria *a sua risada*.', 'Ela toca baixinho na minha cabeça o dia inteiro.', 'Dá corda nos meus dias *sem nem perceber*.', 'E eu danço por dentro, *só de lembrar de você*.']
}, { forma: '♫', qtd: 14 }), [
  F('Essa melodia é sua.', 'Eu só aprendi a tocar *depois que você chegou*.')
]);

// 25 — Aurora boreal.
M(25, 'namoro', 'aurora', 'Sob a mesma aurora', abArte('aurora', {
  abre: 'Olha pra cima comigo.', comecar: 'olhar o céu', fim: 'continuar ›',
  frases: ['Tem gente que viaja o mundo pra ver esse céu.', 'Eu vi *coisa mais bonita* hoje de manhã, de cabelo bagunçado, sorrindo pra mim.', 'Qualquer lugar vira paisagem *quando é com você*.']
}, { qtd: 0 }), [
  F('Fenômeno raro.', 'Dizem que uma aurora muda a vida de quem vê. *Você mudou a minha.*')
]);

// 26 — Prédio com janelas.
M(26, 'namoro', 'noite', 'Janelas acesas', abArte('janelas', {
  titulo: 'Toque nas janelas que estão piscando', dica: 'Cada luz guarda uma lembrança nossa.', fim: 'continuar ›',
  lembrancas: ['Aquela noite em que a gente *riu até doer*.', 'O dia em que você *cuidou de mim* sem eu pedir.', 'Nosso primeiro *boa noite* depois de uma briga boba.', 'A hora em que eu entendi que *era você*.'],
  fecho: 'De todas as janelas da cidade, *a que eu quero é a sua*.'
}, { qtd: 0 }), [
  F('Luz acesa.', 'Pode chegar tarde, pode chegar cansada. *Aqui sempre vai ter luz pra você.*')
]);

// 27 — Pôr do sol arrastado.
M(27, 'namoro', 'crepusculo', 'Pôr do sol com você', abArte('pordosol', {
  dica: 'arraste o sol até o mar', fim: 'ficar mais um pouco ›',
  frases: ['O dia pode ter sido péssimo…', '…mas o fim dele *é com você*.', 'E é aí que tudo fica no lugar.'],
  fecho: 'Quero assistir *todos os finais de tarde* que me restam ao seu lado.'
}, { qtd: 0 }), [
  F('Boa noite, céu.', 'Amanhã ele nasce de novo, e eu *escolho você* de novo também.')
]);

// 28 — Calendário de arrancar.
M(28, 'namoro', 'jardim', 'Dias comuns', abArte('calendario', {
  dica: 'toque para arrancar a folha', fim: 'continuar ›',
  dias: [
    { s: 'segunda', n: 3, t: 'Café requentado, *você de pijama*. Dia perfeito.' },
    { s: 'quarta', n: 12, t: 'Nada aconteceu. *Foi ótimo*, porque foi com você.' },
    { s: 'sexta', n: 21, t: 'Filme ruim, sofá apertado. *Eu não trocava por nada.*' }
  ],
  fecho: 'O amor não mora nas datas especiais. Ele mora *numa terça qualquer com você*.'
}, { qtd: 0 }), [
  F('Hoje também.', 'Se for mais um dia comum ao seu lado, *já é o melhor presente*.')
]);

// 29 — Vela protegida do vento.
M(29, 'namoro', 'fogo', 'Ainda queimando', abArte('vela', {
  abre: 'A vida às vezes venta forte.', botao: 'segure para proteger a chama',
  frases: ['Conta que vence. Dia pesado. Cansaço.', 'E *a gente continua aqui*.', 'Essa chama não é sorte. É *cuidado*, todo dia.'],
  fecho: 'O tempo passou, e o que eu sinto *ainda queima igual*.', fim: 'continuar ›'
}, { forma: '✦', qtd: 8 }), [
  F('Fogo aceso.', 'Pode ventar o que for. *Eu seguro a chama com você.*')
]);

// 30 — Cofre.
M(30, 'namoro', 'noite', 'Segredo do cofre', abArte('cofre', {
  titulo: 'CONTEÚDO SIGILOSO', dica: 'toque nas rodas até formar ♥ ♥ ♥', fim: 'fechar o cofre ›',
  frases: ['Aqui eu guardo o que tenho de mais valioso.', 'Nada de dinheiro. *Só o jeito que você me olha.*', 'A combinação era fácil: *é você em tudo*.']
}, { forma: '✦', qtd: 10, cores: ['#c9ced6', '#ffb0c8'] }), [
  F('Patrimônio protegido.', 'Meu maior tesouro *tem nome, sorriso e dorme do meu lado*.')
]);

// 31 — Garrafa no mar.
M(31, 'namoro', 'oceano', 'Mensagem na garrafa', abArte('garrafa', {
  dica: 'toque na garrafa para pescar', fim: 'devolver ao mar ›',
  frases: ['Joguei esta garrafa lá no dia em que te conheci.', 'Dentro dela escrevi: *“que seja ela”*.', 'O mar demorou, mas *entregou direitinho*.']
}, { qtd: 0 }), [
  F('Destinatária encontrada.', 'De todas as praias do mundo, *eu fui parar justo em você*.')
]);

// 32 — Escrito na areia.
M(32, 'namoro', 'oceano', 'Escrito na areia', abArte('areia', {
  dica: 'passe o dedo para tirar a areia', fim: 'continuar ›',
  frases: ['eu + você', 'te amo'], fecho: 'A onda leva a areia. *O que eu sinto ela não alcança.*'
}, { qtd: 0 }), [
  F('Maré alta.', 'Pode subir o que for. Nosso amor *sabe nadar*.')
]);

// 33 — Extrato.
M(33, 'namoro', 'ouro', 'Extrato do amor', abArte('extrato', {
  banco: 'Banco do Nosso Amor', rotulo: 'Saldo disponível', dica: 'toque no olho para ver o saldo', moeda: 'beijos', fim: 'fechar o aplicativo ›',
  lancamentos: [['Abraço ao acordar', 120], ['Briga boba de domingo', -15], ['Pedido de desculpas com pipoca', 200], ['Saudade do dia inteiro', -40], ['Cheiro no pescoço', 300]],
  nota: 'Rendimento garantido: *quanto mais eu gasto com você, mais eu tenho*.'
}, { forma: '💋', qtd: 8 }), [
  F('Conta conjunta.', 'A única dívida que eu faço questão de manter é *te amar pra sempre*.')
]);

// 34 — Ampulheta.
M(34, 'namoro', 'crepusculo', 'Para sempre é pouco', abArte('ampulheta', {
  botao: 'toque para virar a ampulheta', fim: 'parar o tempo ›',
  frases: ['Passou voando, como *todo tempo com você*.', 'Vira de novo. *Eu quero mais.*', 'Para sempre *é pouco*, e eu vou reclamar no final.']
}, { forma: '✧', qtd: 12 }), [
  F('O tempo que me falta.', 'Se me dessem mil vidas, eu gastaria *todas procurando você*.')
]);

// 35 — Árvore que cresce.
M(35, 'namoro', 'jardim', 'Raízes', abArte('broto', {
  abre: 'Tudo começou pequeno.', botao: 'segure para regar',
  frases: ['Um oi meio sem jeito.', 'Virou conversa até tarde.', 'Virou *rotina, casa, futuro*.'],
  fecho: 'Olha o tamanho *do que a gente plantou*.', fim: 'continuar ›'
}, { forma: '❀', qtd: 10 }), [
  F('Raiz funda.', 'Vento nenhum derruba o que *a gente cuidou junto*.')
]);

// 36 — Borboletas.
M(36, 'namoro', 'jardim', 'Frio na barriga', abArte('borboletas', {
  dica: 'toque nas borboletas', palavras: ['ainda', 'sinto', 'borboletas', 'por', 'você'],
  fecho: 'Depois de tanto tempo, *elas não foram embora*.', fim: 'soltar as borboletas ›'
}, { qtd: 0 }), [
  F('Efeito colateral do amor.', 'Disseram que passava. *Ainda bem que mentiram.*')
]);

// 37 — Discoteca.
M(37, 'namoro', 'confete', 'Dança comigo', abArte('discoteca', {
  dica: 'toque na bola de espelhos', fim: 'sair da pista ›',
  frases: ['Você dança mal, e eu amo *cada passo errado*.', 'Na sala, de meia, às onze da noite.', 'Melhor festa da minha vida: *a nossa cozinha*.', 'Nem precisa de música. *Só de você.*']
}, { qtd: 0 }), [
  F('Última música.', 'Essa eu quero lenta, com a sua cabeça no meu ombro. *Para sempre.*')
]);

// 38 — Fogos.
M(38, 'namoro', 'noite', 'Céu em festa', abArte('fogos', {
  abre: 'Toque no céu.', fim: 'continuar ›',
  frases: ['Um foguete pelo seu *sorriso*.', 'Outro pela sua *coragem*.', 'Mais um pela sua *paciência* comigo.', 'E todos os outros *por existir*.']
}, { qtd: 0 }), [
  F('Hoje é festa.', 'Não tem data no calendário. O motivo é *amar você*, e isso basta.')
]);

// 39 — Letreiro de neon.
M(39, 'namoro', 'neon', 'Te amo em neon', abArte('neon', {
  letreiro: 'TE AMO', sub: 'aberto 24 horas', dica: 'puxe a cordinha para baixo', fim: 'deixar aceso ›',
  frases: ['Queria que soubesse com *letra bem grande*.', 'Pra você ver de longe, mesmo no dia ruim.', 'Esse letreiro *não tem botão de desligar*.']
}, { qtd: 0 }), [
  F('Sempre aceso.', 'Pode passar de madrugada. *Pra você a gente nunca fecha.*')
]);

// 40 — Abajur e estrelas no teto.
M(40, 'namoro', 'noite', 'Boa noite, meu amor', abArte('abajur', {
  abre: 'O dia acabou. Vem cá.', dica: 'toque no abajur para apagar a luz', fim: 'dormir ›',
  frases: ['Deixa o resto pra amanhã.', 'Nenhum problema é mais forte *que o seu lugar no meu peito*.', 'Dorme bem, meu amor. *Eu tô aqui.*']
}, { qtd: 0 }), [
  F('Boa noite.', 'A última coisa em que eu penso, *todos os dias*, é você.')
]);
