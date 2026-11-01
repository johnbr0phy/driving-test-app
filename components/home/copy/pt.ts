// Portuguese homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.
// Register: European Portuguese (Portugal), like i18n/pt.ts: formal third person
// ("o seu", "Crie") without "tu" or "você", never Brazilian usage ("telemóvel", "registo").

import type { HomeCopy } from "../homeCopy";

export const pt: HomeCopy = {
  heroTitle: "Testes de treino grátis que levam à aprovação",
  findYourTest: "Encontre o seu teste",
  answeredThisWeek: "perguntas respondidas esta semana",
  popularThisWeek: "Populares esta semana",
  popularTests: "Testes populares",
  allTests: (n) => `Todos os ${n} testes`,
  aboutTheTest: "Sobre o exame",
  aboutEachTest: "Sobre cada exame",
  howItWorks: "Como funciona o Tigertest",
  steps: [
    {
      label: "Passo 1",
      title: "Aprenda no telemóvel",
      body: "Toque numa resposta e veja logo se está certa e porquê. As perguntas que errar voltam até as acertar, por isso uns minutos no autocarro contam mesmo.",
    },
    {
      label: "Passo 2",
      title: "Faça o exame a sério",
      body: "Quando as perguntas parecerem fáceis, faça um teste de treino completo, feito a partir do programa do exame real, com a mesma mistura de temas. Assim sabe o resultado antes de contar.",
    },
    {
      label: "Passo 3",
      title: "Saiba quando está pronto",
      body: "O seu painel fica verde à medida que termina cada conjunto e passa cada teste. Quando estiver tudo verde, marque o exame.",
    },
  ],
  shotAlts: {
    phones: ["Treino de matemática do SAT num telemóvel", "Pergunta de técnico de instrumentação cirúrgica num telemóvel", "Pergunta de treino de auxiliar de enfermagem num telemóvel"],
    desktop: "Teste de treino do SAT com tempo num computador",
    dashboard: "Painel do Tigertest para o DMV com conjuntos de treino e testes de treino",
  },
  everyTest: "Todos os testes de treino",
  testsFor: (inName) => `Testes de treino para ${inName}`,
  usExamPrompt: "Vai mudar-se para os EUA ou estuda para um exame dos EUA?",
  seeAllTests: (n) => `Ver os ${n} testes`,
  faqTitle: "Perguntas frequentes",
  requestTitle: "Não encontra o seu exame?",
  requestBody: "Acrescentamos testes novos a pedido. Diga-nos para qual está a estudar.",
  requestCta: "Pedir um teste",
  usLead: (examCount) => `${examCount} exames, do teste de condução do DMV ao SAT, enfermagem e certificações de IT. Cada resposta explicada. Sem registo.`,
  countryLead: (countryName) =>
    `Testes de treino grátis para ${countryName}: o exame teórico de condução e certificações que são iguais em todo o lado. Cada resposta explicada. Sem registo.`,
  usFaqs: (examCount) => [
    {
      q: "O que é o Tigertest?",
      a: `O Tigertest é um site gratuito de testes de treino para ${examCount} exames, do teste de condução do DMV em cada estado ao SAT, ACT e exames de enfermagem, saúde, IT, ofícios e licenças. Cada teste segue o programa publicado do exame real, e cada pergunta explica a resposta certa.`,
    },
    {
      q: "O Tigertest é grátis?",
      a: "Sim. Quase todos os testes são totalmente grátis. O DMV tem testes de treino e treino gratuitos, mais uma compra Premium opcional, de pagamento único de 9,99 $ (não é uma subscrição), que desbloqueia mais dois testes, mais conjuntos de treino e estatísticas completas em todos os exames dos EUA.",
    },
    {
      q: "Preciso de uma conta?",
      a: "Não. Pode começar qualquer teste sem se registar. Crie uma conta gratuita se quiser guardar o progresso em todos os seus dispositivos.",
    },
    {
      q: "Como é que o Tigertest ajuda a passar?",
      a: "O modo de treino corrige na hora e volta a mostrar as perguntas que errar até as saber. Depois, os testes de treino completos simulam o exame real, e os resultados mostram que temas ainda precisam de trabalho.",
    },
    {
      q: "O Tigertest tem ligação ao DMV ou a alguma empresa de exames?",
      a: "Não. O Tigertest é independente e não tem ligação a nenhum DMV, empresa de exames ou entidade certificadora.",
    },
  ],
  dmv: {
    cta: "Teste de condução do DMV",
    title: "Vai fazer o teste de condução do DMV?",
    body: "200 perguntas escritas a partir do manual do condutor do seu estado, para os 50 estados e DC.",
    about: "Sobre o teste de treino do DMV",
    questionsOnTest: (n) => `${n} perguntas no exame escrito`,
    viewAll: "Ver os 50 estados",
  },
  listName: (inName) => `Testes de treino do Tigertest para ${inName}`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "O que é o Tigertest?",
      a:
        local === 0
          ? `O Tigertest é um site gratuito de testes de treino. Para ${inName} tem certificações que são iguais em todo o lado, como CompTIA e AWS. Cada pergunta explica a resposta certa.`
          : `O Tigertest é um site gratuito de testes de treino. Para ${inName} tem ${local === 1 ? "um teste de condução escrito a partir das regras oficiais" : `${local} testes de condução escritos a partir dos manuais oficiais`}, mais certificações que são iguais em todo o lado, como CompTIA e AWS. Cada pergunta explica a resposta certa.`,
    },
    { q: "O Tigertest é grátis?", a: `Sim. Todos os testes para ${inName} são grátis, sem subscrição.` },
    {
      q: "Preciso de uma conta?",
      a: "Não. Pode começar qualquer teste sem se registar. Crie uma conta gratuita se quiser guardar o progresso em todos os seus dispositivos.",
    },
    {
      q: "Como é que o Tigertest ajuda a passar?",
      a: "O modo de treino corrige na hora e volta a mostrar as perguntas que errar até as saber. Depois, os testes de treino completos simulam o exame real, e os resultados mostram que temas ainda precisam de trabalho.",
    },
    {
      q: "O Tigertest é um teste oficial?",
      a: `Não. O Tigertest é independente e não tem ligação a ${authority} nem a nenhuma empresa de exames. As perguntas são originais e escritas a partir dos manuais oficiais.`,
    },
  ],
  card: {
    questions: (n) => `${n} perguntas`,
    free: "Grátis",
    freePlusPremium: "Grátis + Premium",
    answeredThisWeek: "respondidas esta semana",
    availableIn: (names) => `Disponível em ${names}`,
  },
  search: {
    placeholder: "Pesquisar exames ou profissões",
    label: "Pesquisar testes de treino",
    clear: "Limpar pesquisa",
    countOf: (count, total) => `${count} de ${total} testes`,
    allFree: (n) => `${n} testes de treino, todos grátis para começar`,
    noMatch: (q) => `Nenhum teste corresponde a “${q}”`,
    noMatchHint: "Experimente o nome do exame, a profissão ou a entidade certificadora.",
  },
  pills: {
    showTestsFor: "Mostrar testes para",
    testsByCountry: "Testes por país",
    countryTests: (name) => `Testes: ${name}`,
    moreCountries: "Mais países",
    saved: "Guardado para a próxima vez. O seu progresso é o mesmo em todos os países.",
    geo: (inName) => `Mostramos testes para ${inName} porque está lá. Pode escolher outro país a qualquer momento.`,
  },
};

/** Every country's name in Portuguese, for the country pills and "Practice tests for <country>". */
export const countryNames: Record<string, string> = {
  US: "Estados Unidos", CA: "Canadá", UK: "Reino Unido", IE: "Irlanda", AU: "Austrália", NZ: "Nova Zelândia", IN: "Índia",
  PH: "Filipinas", MY: "Malásia", SG: "Singapura", HK: "Hong Kong", AE: "Emirados Árabes Unidos", ZA: "África do Sul",
  NG: "Nigéria", KE: "Quénia", PK: "Paquistão", ES: "Espanha", PT: "Portugal", RO: "Roménia", SE: "Suécia", GR: "Grécia",
  DK: "Dinamarca", HU: "Hungria", BE: "Bélgica", FI: "Finlândia", MT: "Malta", DE: "Alemanha",
};

/** Portugal's own homepage lines (REGION_HOME.PT in lib/region.ts), in Portuguese. */

/** Each country as a sentence names it after "para", with its article ("para o Reino Unido"). */
export const inNames: Record<string, string> = {
  US: "os Estados Unidos", CA: "o Canadá", UK: "o Reino Unido", IE: "a Irlanda", AU: "a Austrália", NZ: "a Nova Zelândia", IN: "a Índia",
  PH: "as Filipinas", MY: "a Malásia", SG: "Singapura", HK: "Hong Kong", AE: "os Emirados Árabes Unidos", ZA: "a África do Sul",
  NG: "a Nigéria", KE: "o Quénia", PK: "o Paquistão", ES: "Espanha", PT: "Portugal", RO: "a Roménia", SE: "a Suécia", GR: "a Grécia",
  DK: "a Dinamarca", HU: "a Hungria", BE: "a Bélgica", FI: "a Finlândia", MT: "Malta", DE: "a Alemanha",
};
