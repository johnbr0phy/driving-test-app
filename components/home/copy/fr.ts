// French homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.
// Register: "vous", like i18n/fr.ts, with a non-breaking space before ? ! : ; and inside « ».

import type { HomeCopy } from "../homeCopy";

export const fr: HomeCopy = {
  heroTitle: "Des tests d'entraînement gratuits pour réussir",
  findYourTest: "Trouvez votre test",
  answeredThisWeek: "questions répondues cette semaine",
  popularThisWeek: "Populaires cette semaine",
  popularTests: "Tests populaires",
  allTests: (n) => `Les ${n} tests`,
  aboutTheTest: "À propos de l'examen",
  aboutEachTest: "À propos de chaque examen",
  howItWorks: "Comment fonctionne Tigertest",
  steps: [
    {
      label: "Étape 1",
      title: "Apprenez sur votre téléphone",
      body: "Touchez une réponse et voyez tout de suite si elle est juste, et pourquoi. Les questions ratées reviennent jusqu'à ce que vous les réussissiez, donc quelques minutes dans le bus comptent vraiment.",
    },
    {
      label: "Étape 2",
      title: "Passez l'examen en conditions réelles",
      body: "Quand les questions vous semblent faciles, faites un test d'entraînement complet construit sur le programme du vrai examen, avec le même mélange de thèmes. Vous connaissez votre score avant que ça compte.",
    },
    {
      label: "Étape 3",
      title: "Sachez quand vous êtes prêt",
      body: "Votre tableau de bord passe au vert à mesure que vous terminez chaque série et réussissez chaque test. Quand tout est vert, inscrivez-vous à l'examen.",
    },
  ],
  shotAlts: {
    phones: ["Exercice de maths du SAT sur un téléphone", "Question d'instrumentiste de bloc opératoire sur un téléphone", "Question d'entraînement d'aide-soignant sur un téléphone"],
    desktop: "Test d'entraînement chronométré du SAT sur un ordinateur",
    dashboard: "Tableau de bord Tigertest pour le DMV avec séries d'entraînement et tests d'entraînement",
  },
  everyTest: "Tous les tests d'entraînement",
  testsFor: (inName) => `Tests d'entraînement pour ${inName}`,
  usExamPrompt: "Vous partez aux États-Unis ou préparez un examen américain ?",
  seeAllTests: (n) => `Voir les ${n} tests`,
  faqTitle: "Questions fréquentes",
  requestTitle: "Votre examen n'y est pas ?",
  requestBody: "Nous ajoutons des tests selon les demandes. Dites-nous lequel vous préparez.",
  requestCta: "Demander un test",
  usLead: (examCount) => `${examCount} examens, du test du permis du DMV au SAT, en passant par les soins infirmiers et les certifications IT. Chaque réponse expliquée. Sans inscription.`,
  countryLead: (countryName) =>
    `Tests d'entraînement gratuits pour ${countryName} : le code de la route et des certifications identiques partout. Chaque réponse expliquée. Sans inscription.`,
  usFaqs: (examCount) => [
    {
      q: "Qu'est-ce que Tigertest ?",
      a: `Tigertest est un site gratuit de tests d'entraînement pour ${examCount} examens, du test du permis du DMV dans chaque État au SAT, à l'ACT et aux examens de soins infirmiers, de santé, d'IT, de métiers et de licences. Chaque test suit le programme publié du vrai examen, et chaque question explique la bonne réponse.`,
    },
    {
      q: "Tigertest est-il gratuit ?",
      a: "Oui. Presque tous les tests sont entièrement gratuits. Le DMV propose des tests d'entraînement et un entraînement gratuits, plus un achat Premium facultatif et unique de 9,99 $ (pas un abonnement) qui débloque deux tests de plus, d'autres séries d'entraînement et des statistiques complètes sur chaque examen américain.",
    },
    {
      q: "Faut-il un compte ?",
      a: "Non. Vous pouvez commencer n'importe quel test sans vous inscrire. Créez un compte gratuit si vous voulez retrouver votre progression sur tous vos appareils.",
    },
    {
      q: "Comment Tigertest m'aide-t-il à réussir ?",
      a: "Le mode entraînement vous corrige tout de suite et vous repose les questions ratées jusqu'à ce que vous les sachiez. Les tests d'entraînement complets simulent ensuite le vrai examen, et vos résultats montrent les thèmes à retravailler.",
    },
    {
      q: "Tigertest est-il lié au DMV ou à un organisme d'examen ?",
      a: "Non. Tigertest est indépendant et n'est lié à aucun DMV, organisme d'examen ou de certification.",
    },
  ],
  dmv: {
    cta: "Test du permis DMV",
    title: "Vous passez le test du permis du DMV ?",
    body: "200 questions rédigées à partir du manuel du conducteur de votre État, pour les 50 États et DC.",
    about: "À propos du test d'entraînement DMV",
    questionsOnTest: (n) => `${n} questions à l'examen écrit`,
    viewAll: "Voir les 50 États",
  },
  listName: (inName) => `Tests d'entraînement Tigertest pour ${inName}`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "Qu'est-ce que Tigertest ?",
      a:
        local === 0
          ? `Tigertest est un site gratuit de tests d'entraînement. Pour ${inName}, il propose des certifications identiques partout, comme CompTIA et AWS. Chaque question explique la bonne réponse.`
          : `Tigertest est un site gratuit de tests d'entraînement. Pour ${inName}, il propose ${local === 1 ? "un test de code de la route rédigé à partir des règles officielles" : `${local} tests de code de la route rédigés à partir des manuels officiels`}, plus des certifications identiques partout, comme CompTIA et AWS. Chaque question explique la bonne réponse.`,
    },
    { q: "Tigertest est-il gratuit ?", a: `Oui. Tous les tests pour ${inName} sont gratuits, sans abonnement.` },
    {
      q: "Faut-il un compte ?",
      a: "Non. Vous pouvez commencer n'importe quel test sans vous inscrire. Créez un compte gratuit si vous voulez retrouver votre progression sur tous vos appareils.",
    },
    {
      q: "Comment Tigertest m'aide-t-il à réussir ?",
      a: "Le mode entraînement vous corrige tout de suite et vous repose les questions ratées jusqu'à ce que vous les sachiez. Les tests d'entraînement complets simulent ensuite le vrai examen, et vos résultats montrent les thèmes à retravailler.",
    },
    {
      q: "Tigertest est-il un test officiel ?",
      a: `Non. Tigertest est indépendant et n'est lié ni à ${authority} ni à aucun organisme d'examen. Les questions sont originales et rédigées à partir des manuels officiels.`,
    },
  ],
  card: {
    questions: (n) => `${n} questions`,
    free: "Gratuit",
    freePlusPremium: "Gratuit + Premium",
    answeredThisWeek: "répondues cette semaine",
    availableIn: (names) => `Disponible en ${names}`,
  },
  search: {
    placeholder: "Rechercher un examen ou un métier",
    label: "Rechercher des tests d'entraînement",
    clear: "Effacer la recherche",
    countOf: (count, total) => `${count} tests sur ${total}`,
    allFree: (n) => `${n} tests d'entraînement, tous gratuits pour commencer`,
    noMatch: (q) => `Aucun test ne correspond à « ${q} »`,
    noMatchHint: "Essayez le nom de l'examen, le métier ou l'organisme de certification.",
  },
  pills: {
    showTestsFor: "Voir les tests pour",
    testsByCountry: "Tests par pays",
    countryTests: (name) => `Tests : ${name}`,
    moreCountries: "Autres pays",
    saved: "Enregistré pour la prochaine fois. Votre progression est la même dans tous les pays.",
    geo: (inName) => `Nous affichons les tests pour ${inName} car vous y êtes. Vous pouvez choisir un autre pays à tout moment.`,
  },
};

/** Every country's name in French, for the country pills and "Practice tests for <country>". */
export const countryNames: Record<string, string> = {
  US: "États-Unis", CA: "Canada", UK: "Royaume-Uni", IE: "Irlande", AU: "Australie", NZ: "Nouvelle-Zélande", IN: "Inde",
  PH: "Philippines", MY: "Malaisie", SG: "Singapour", HK: "Hong Kong", AE: "Émirats arabes unis", ZA: "Afrique du Sud",
  NG: "Nigeria", KE: "Kenya", PK: "Pakistan", ES: "Espagne", PT: "Portugal", RO: "Roumanie", SE: "Suède", GR: "Grèce",
  DK: "Danemark", HU: "Hongrie", BE: "Belgique", FI: "Finlande", MT: "Malte", DE: "Allemagne",
};

/** Each country as a sentence names it after "pour", with its article ("pour le Royaume-Uni"). */
export const inNames: Record<string, string> = {
  US: "les États-Unis", CA: "le Canada", UK: "le Royaume-Uni", IE: "l'Irlande", AU: "l'Australie", NZ: "la Nouvelle-Zélande", IN: "l'Inde",
  PH: "les Philippines", MY: "la Malaisie", SG: "Singapour", HK: "Hong Kong", AE: "les Émirats arabes unis", ZA: "l'Afrique du Sud",
  NG: "le Nigeria", KE: "le Kenya", PK: "le Pakistan", ES: "l'Espagne", PT: "le Portugal", RO: "la Roumanie", SE: "la Suède", GR: "la Grèce",
  DK: "le Danemark", HU: "la Hongrie", BE: "la Belgique", FI: "la Finlande", MT: "Malte", DE: "l'Allemagne",
};
