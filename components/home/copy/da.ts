// Danish homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.
// Register: "du", like i18n/da.ts. Country names go after a colon or in
// brackets ("for dette land (Tyskland)") so no preposition ("i", "på") has to
// match the name; Danish needs no article before a country, so there is no inNames.

import type { HomeCopy } from "../homeCopy";

export const da: HomeCopy = {
  heroTitle: "Gratis øvelsesprøver, der får dig igennem",
  findYourTest: "Find din prøve",
  answeredThisWeek: "spørgsmål besvaret i denne uge",
  popularThisWeek: "Populære i denne uge",
  popularTests: "Populære prøver",
  allTests: (n) => `Alle ${n} prøver`,
  aboutTheTest: "Om prøven",
  aboutEachTest: "Om hver prøve",
  howItWorks: "Sådan virker Tigertest",
  steps: [
    {
      label: "Trin 1",
      title: "Lær det på din telefon",
      body: "Tryk på et svar, og se med det samme, om det er rigtigt og hvorfor. Spørgsmål, du svarer forkert på, kommer igen, til du kan dem. Så tæller et par minutter i bussen også.",
    },
    {
      label: "Trin 2",
      title: "Øv den rigtige prøve",
      body: "Når spørgsmålene føles lette, så tag en hel øvelsesprøve bygget som den rigtige prøve, med samme blanding af emner. Så kender du dit resultat, før det gælder.",
    },
    {
      label: "Trin 3",
      title: "Ved, hvornår du er klar",
      body: "Din oversigt bliver grøn, når du gør et sæt færdigt og består en prøve. Når alt er grønt, så book prøven.",
    },
  ],
  shotAlts: {
    phones: ["SAT-matematik på en telefon", "Spørgsmål for operationsteknikere på en telefon", "CNA-øvelsesspørgsmål på en telefon"],
    desktop: "SAT-øvelsesprøve med tidsgrænse på en computer",
    dashboard: "Tigertests DMV-oversigt med træningssæt og øvelsesprøver",
  },
  everyTest: "Alle øvelsesprøver",
  testsFor: (inName) => `Øvelsesprøver: ${inName}`,
  usExamPrompt: "Flytter du til USA, eller læser du til en amerikansk prøve?",
  seeAllTests: (n) => `Se alle ${n} prøver`,
  faqTitle: "Ofte stillede spørgsmål",
  requestTitle: "Mangler din prøve?",
  requestBody: "Vi tilføjer nye prøver efter ønske. Fortæl os, hvad du læser til.",
  requestCta: "Ønsk en prøve",
  usLead: (examCount) => `${examCount} prøver, fra DMV's teoriprøve til SAT, sygepleje og IT-certificeringer. Hvert svar forklaret. Uden konto.`,
  countryLead: (countryName) =>
    `Gratis øvelsesprøver for dette land (${countryName}): teoriprøven til kørekortet og certificeringer, der er ens overalt. Hvert svar forklaret. Uden konto.`,
  usFaqs: (examCount) => [
    {
      q: "Hvad er Tigertest?",
      a: `Tigertest er en gratis side med øvelsesprøver til ${examCount} prøver, fra DMV's teoriprøve i hver delstat til SAT, ACT og prøver inden for sygepleje, sundhed, IT, håndværk og autorisationer. Hver prøve følger den offentliggjorte opbygning af den rigtige prøve, og ved hvert spørgsmål bliver det rigtige svar forklaret.`,
    },
    {
      q: "Er Tigertest gratis?",
      a: "Ja. Næsten alle prøver er helt gratis. Til DMV er der gratis øvelsesprøver og træning plus et valgfrit engangskøb af Premium (ikke et abonnement), der låser to prøver og træningssæt mere op og giver fuld statistik for hver amerikansk prøve.",
    },
    {
      q: "Skal jeg have en konto?",
      a: "Nej. Du kan starte enhver prøve uden at logge ind. Opret en gratis konto, hvis du vil gemme dit fremskridt på alle dine enheder.",
    },
    {
      q: "Hvordan hjælper Tigertest mig med at bestå?",
      a: "I træningen ser du med det samme, om dit svar er rigtigt, og spørgsmål, du svarer forkert på, kommer igen, til du kan dem. Hele øvelsesprøver efterligner derefter den rigtige prøve, og dine resultater viser, hvilke emner der stadig kræver arbejde.",
    },
    {
      q: "Hører Tigertest til DMV eller et prøvebureau?",
      a: "Nej. Tigertest er uafhængig og hører ikke til nogen DMV, noget prøvebureau eller nogen certificeringsmyndighed.",
    },
  ],
  dmv: {
    cta: "DMV's teoriprøve",
    title: "Skal du tage DMV's teoriprøve?",
    body: "200 spørgsmål skrevet ud fra din egen delstats kørehåndbog, for alle 50 delstater og DC.",
    about: "Om DMV-øvelsesprøven",
    questionsOnTest: (n) => `${n} spørgsmål på den skriftlige prøve`,
    viewAll: "Se alle 50 delstater",
  },
  listName: (inName) => `Tigertest-øvelsesprøver: ${inName}`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "Hvad er Tigertest?",
      a:
        local === 0
          ? `Tigertest er en gratis side med øvelsesprøver. For dette land (${inName}) er der certificeringer, der er ens overalt, som CompTIA og AWS. Ved hvert spørgsmål bliver det rigtige svar forklaret.`
          : `Tigertest er en gratis side med øvelsesprøver. For dette land (${inName}) er der ${local === 1 ? "en køreprøve" : `${local} køreprøver`} skrevet ud fra de officielle ${local === 1 ? "regler" : "håndbøger"} plus certificeringer, der er ens overalt, som CompTIA og AWS. Ved hvert spørgsmål bliver det rigtige svar forklaret.`,
    },
    { q: "Er Tigertest gratis?", a: `Alle prøver for dette land (${inName}) er gratis at begynde på, uden konto og uden abonnement. Et valgfrit engangskøb af Premium låser op for det sidste træningssæt og den sidste øvelsesprøve i de fleste prøver samt fuld statistik.` },
    {
      q: "Skal jeg have en konto?",
      a: "Nej. Du kan starte enhver prøve uden at logge ind. Opret en gratis konto, hvis du vil gemme dit fremskridt på alle dine enheder.",
    },
    {
      q: "Hvordan hjælper Tigertest mig med at bestå?",
      a: "I træningen ser du med det samme, om dit svar er rigtigt, og spørgsmål, du svarer forkert på, kommer igen, til du kan dem. Hele øvelsesprøver efterligner derefter den rigtige prøve, og dine resultater viser, hvilke emner der stadig kræver arbejde.",
    },
    {
      q: "Er Tigertest en officiel prøve?",
      a: `Nej. Tigertest er uafhængig og hører ikke til ${authority} eller noget andet prøvebureau. Spørgsmålene er vores egne, skrevet ud fra de officielle håndbøger.`,
    },
  ],
  card: {
    questions: (n) => `${n} spørgsmål`,
    free: "Gratis",
    freePlusPremium: "Gratis + Premium",
    answeredThisWeek: "besvaret i denne uge",
    availableIn: (names) => `Findes på: ${names}`,
  },
  search: {
    placeholder: "Søg efter prøver eller fag",
    label: "Søg i øvelsesprøver",
    clear: "Ryd søgningen",
    countOf: (count, total) => `${count} af ${total} prøver`,
    allFree: (n) => `${n} øvelsesprøver, alle gratis at starte`,
    noMatch: (q) => `Ingen prøver fundet for "${q}"`,
    noMatchHint: "Prøv prøvens navn, faget eller den myndighed, der udsteder certifikatet.",
  },
  pills: {
    showTestsFor: "Vis prøver for",
    testsByCountry: "Prøver efter land",
    countryTests: (name) => `Prøver: ${name}`,
    moreCountries: "Flere lande",
    saved: "Gemt til næste gang. Dit fremskridt er det samme i alle lande.",
    geo: (inName) => `Vi viser prøver for dette land (${inName}), fordi du er der. Du kan altid vælge et andet land.`,
  },
};

/** Every country's name in Danish, for the country pills and "Practice tests for <country>". */
export const countryNames: Record<string, string> = {
  US: "USA", CA: "Canada", UK: "Storbritannien", IE: "Irland", AU: "Australien", NZ: "New Zealand", IN: "Indien",
  PH: "Filippinerne", MY: "Malaysia", SG: "Singapore", HK: "Hongkong", AE: "De Forenede Arabiske Emirater", ZA: "Sydafrika",
  NG: "Nigeria", KE: "Kenya", PK: "Pakistan", ES: "Spanien", PT: "Portugal", RO: "Rumænien", SE: "Sverige", GR: "Grækenland",
  DK: "Danmark", HU: "Ungarn", BE: "Belgien", FI: "Finland", MT: "Malta", DE: "Tyskland", IT: "Italien",
};
