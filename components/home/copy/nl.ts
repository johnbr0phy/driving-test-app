// Dutch homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.
// Register: "je", like i18n/nl.ts. Country names go after a colon or in
// brackets ("voor dit land (Duitsland)") so "de VS" and "het VK" need no article.

import type { HomeCopy } from "../homeCopy";

export const nl: HomeCopy = {
  heroTitle: "Gratis oefentoetsen die je laten slagen",
  findYourTest: "Vind je toets",
  answeredThisWeek: "vragen beantwoord deze week",
  popularThisWeek: "Populair deze week",
  popularTests: "Populaire toetsen",
  allTests: (n) => `Alle ${n} toetsen`,
  aboutTheTest: "Over het examen",
  aboutEachTest: "Over elk examen",
  howItWorks: "Zo werkt Tigertest",
  steps: [
    {
      label: "Stap 1",
      title: "Leer het op je telefoon",
      body: "Tik op een antwoord en zie meteen of het klopt en waarom. Vragen die je fout hebt, komen terug tot je ze kent. Zo tellen een paar minuten in de bus ook echt mee.",
    },
    {
      label: "Stap 2",
      title: "Oefen het echte examen",
      body: "Voelen de vragen makkelijk, maak dan een volledige oefentoets op basis van de opbouw van het echte examen, met dezelfde mix van onderwerpen. Zo ken je je score voordat het telt.",
    },
    {
      label: "Stap 3",
      title: "Weet wanneer je klaar bent",
      body: "Je dashboard wordt groen zodra je een set afrondt en een toets haalt. Is alles groen, boek dan het examen.",
    },
  ],
  shotAlts: {
    phones: ["SAT-wiskundeoefening op een telefoon", "Vraag voor operatieassistent op een telefoon", "CNA-oefenvraag op een telefoon"],
    desktop: "SAT-oefentoets met tijdslimiet op een computer",
    dashboard: "Tigertest DMV-dashboard met oefensets en oefentoetsen",
  },
  everyTest: "Alle oefentoetsen",
  testsFor: (inName) => `Oefentoetsen: ${inName}`,
  usExamPrompt: "Verhuis je naar de VS of leer je voor een Amerikaans examen?",
  seeAllTests: (n) => `Bekijk alle ${n} toetsen`,
  faqTitle: "Veelgestelde vragen",
  requestTitle: "Staat je examen er niet bij?",
  requestBody: "We voegen nieuwe toetsen toe op verzoek. Laat ons weten waarvoor je leert.",
  requestCta: "Vraag een toets aan",
  usLead: (examCount) => `${examCount} examens, van het DMV-rijbewijsexamen tot de SAT, verpleegkunde en IT-certificaten. Elk antwoord uitgelegd. Zonder account.`,
  countryLead: (countryName) =>
    `Gratis oefentoetsen voor dit land (${countryName}): het theorie-examen voor je rijbewijs en certificaten die overal hetzelfde zijn. Elk antwoord uitgelegd. Zonder account.`,
  usFaqs: (examCount) => [
    {
      q: "Wat is Tigertest?",
      a: `Tigertest is een gratis site met oefentoetsen voor ${examCount} examens, van het DMV-rijbewijsexamen in elke staat tot de SAT, de ACT en examens voor verpleegkunde, zorg, IT, vakmanschap en vergunningen. Elke toets volgt de gepubliceerde opbouw van het echte examen, en bij elke vraag wordt het juiste antwoord uitgelegd.`,
    },
    {
      q: "Is Tigertest gratis?",
      a: "Ja. Bijna elke toets is helemaal gratis. Voor de DMV zijn er gratis oefentoetsen en training, plus een optionele eenmalige Premium-aankoop van $ 9,99 (geen abonnement) die nog twee toetsen en oefensets ontgrendelt, en volledige statistieken voor elk Amerikaans examen.",
    },
    {
      q: "Heb ik een account nodig?",
      a: "Nee. Je kunt elke toets starten zonder je aan te melden. Maak een gratis account als je je voortgang op al je apparaten wilt bewaren.",
    },
    {
      q: "Hoe helpt Tigertest me slagen?",
      a: "In de trainingsmodus zie je meteen of je antwoord klopt, en vragen die je fout hebt, komen terug tot je ze kent. Volledige oefentoetsen bootsen daarna het echte examen na, en je resultaten laten zien welke onderwerpen nog werk nodig hebben.",
    },
    {
      q: "Hoort Tigertest bij de DMV of een examenbureau?",
      a: "Nee. Tigertest is onafhankelijk en hoort niet bij een DMV, examenbureau of certificeringsinstantie.",
    },
  ],
  dmv: {
    cta: "DMV-rijbewijsexamen",
    title: "Doe je het DMV-rijbewijsexamen?",
    body: "200 vragen geschreven op basis van het rijhandboek van je eigen staat, voor alle 50 staten en DC.",
    about: "Over de DMV-oefentoets",
    questionsOnTest: (n) => `${n} vragen op het schriftelijke examen`,
    viewAll: "Bekijk alle 50 staten",
  },
  listName: (inName) => `Tigertest-oefentoetsen: ${inName}`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "Wat is Tigertest?",
      a:
        local === 0
          ? `Tigertest is een gratis site met oefentoetsen. Voor dit land (${inName}) zijn er certificaten die overal hetzelfde zijn, zoals CompTIA en AWS. Bij elke vraag wordt het juiste antwoord uitgelegd.`
          : `Tigertest is een gratis site met oefentoetsen. Voor dit land (${inName}) zijn er ${local === 1 ? "een rijbewijstoets" : `${local} rijbewijstoetsen`} geschreven op basis van de officiële ${local === 1 ? "regels" : "handboeken"}, plus certificaten die overal hetzelfde zijn, zoals CompTIA en AWS. Bij elke vraag wordt het juiste antwoord uitgelegd.`,
    },
    { q: "Is Tigertest gratis?", a: `Ja. Elke toets voor dit land (${inName}) is gratis, zonder abonnement.` },
    {
      q: "Heb ik een account nodig?",
      a: "Nee. Je kunt elke toets starten zonder je aan te melden. Maak een gratis account als je je voortgang op al je apparaten wilt bewaren.",
    },
    {
      q: "Hoe helpt Tigertest me slagen?",
      a: "In de trainingsmodus zie je meteen of je antwoord klopt, en vragen die je fout hebt, komen terug tot je ze kent. Volledige oefentoetsen bootsen daarna het echte examen na, en je resultaten laten zien welke onderwerpen nog werk nodig hebben.",
    },
    {
      q: "Is Tigertest een officieel examen?",
      a: `Nee. Tigertest is onafhankelijk en hoort niet bij ${authority} of een ander examenbureau. De vragen zijn eigen vragen, geschreven op basis van de officiële handboeken.`,
    },
  ],
  card: {
    questions: (n) => `${n} vragen`,
    free: "Gratis",
    freePlusPremium: "Gratis + Premium",
    answeredThisWeek: "beantwoord deze week",
    availableIn: (names) => `Beschikbaar in: ${names}`,
  },
  search: {
    placeholder: "Zoek examens of beroepen",
    label: "Oefentoetsen zoeken",
    clear: "Zoekopdracht wissen",
    countOf: (count, total) => `${count} van ${total} toetsen`,
    allFree: (n) => `${n} oefentoetsen, allemaal gratis te starten`,
    noMatch: (q) => `Geen toetsen gevonden voor ‘${q}’`,
    noMatchHint: "Probeer de naam van het examen, het beroep of de instantie die het certificaat uitgeeft.",
  },
  pills: {
    showTestsFor: "Toon toetsen voor",
    testsByCountry: "Toetsen per land",
    countryTests: (name) => `Toetsen: ${name}`,
    moreCountries: "Meer landen",
    saved: "Bewaard voor de volgende keer. Je voortgang is in elk land hetzelfde.",
    geo: (inName) => `We tonen toetsen voor dit land (${inName}) omdat je daar bent. Je kunt altijd een ander land kiezen.`,
  },
};

/** Every country's name in Dutch, for the country pills and "Practice tests for <country>". */
export const countryNames: Record<string, string> = {
  US: "Verenigde Staten", CA: "Canada", UK: "Verenigd Koninkrijk", IE: "Ierland", AU: "Australië", NZ: "Nieuw-Zeeland", IN: "India",
  PH: "Filipijnen", MY: "Maleisië", SG: "Singapore", HK: "Hongkong", AE: "Verenigde Arabische Emiraten", ZA: "Zuid-Afrika",
  NG: "Nigeria", KE: "Kenia", PK: "Pakistan", ES: "Spanje", PT: "Portugal", RO: "Roemenië", SE: "Zweden", GR: "Griekenland",
  DK: "Denemarken", HU: "Hongarije", BE: "België", FI: "Finland", MT: "Malta", DE: "Duitsland",
};

/** Belgium's own homepage lines in Dutch (the BE entry of REGION_HOME in lib/region.ts). */
