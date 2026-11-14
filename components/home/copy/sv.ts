// Swedish homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.
// Register: "du", like i18n/sv.ts. Swedish country names take no article
// ("i USA", "i Storbritannien", "i Filippinerna"), so the bare name from
// countryNames reads correctly in every sentence and no inNames table is needed.

import type { HomeCopy } from "../homeCopy";

export const sv: HomeCopy = {
  heroTitle: "Gratis övningsprov som får dig att klara provet",
  findYourTest: "Hitta ditt prov",
  answeredThisWeek: "frågor besvarade den här veckan",
  popularThisWeek: "Populärt den här veckan",
  popularTests: "Populära prov",
  allTests: (n) => `Alla ${n} prov`,
  aboutTheTest: "Om provet",
  aboutEachTest: "Om varje prov",
  howItWorks: "Så fungerar Tigertest",
  steps: [
    {
      label: "Steg 1",
      title: "Lär dig i mobilen",
      body: "Tryck på ett svar och se direkt om det är rätt och varför. Frågor du svarar fel på kommer tillbaka tills du kan dem. Då räknas även några minuter på bussen.",
    },
    {
      label: "Steg 2",
      title: "Öva på det riktiga provet",
      body: "När frågorna känns lätta gör du ett helt övningsprov byggt efter det riktiga provets upplägg, med samma blandning av ämnen. Då vet du ditt resultat innan det räknas.",
    },
    {
      label: "Steg 3",
      title: "Vet när du är redo",
      body: "Din översikt blir grön när du klarar ett set och blir godkänd på ett prov. När allt är grönt kan du boka provet.",
    },
  ],
  shotAlts: {
    phones: ["Övning i SAT-matte i en mobil", "Fråga för operationsassistent i en mobil", "Övningsfråga för CNA i en mobil"],
    desktop: "SAT-övningsprov med tidsgräns på en dator",
    dashboard: "Tigertests DMV-översikt med övningsset och övningsprov",
  },
  everyTest: "Alla övningsprov",
  testsFor: (inName) => `Övningsprov i ${inName}`,
  usExamPrompt: "Flyttar du till USA eller pluggar du till ett amerikanskt prov?",
  seeAllTests: (n) => `Se alla ${n} prov`,
  faqTitle: "Vanliga frågor",
  requestTitle: "Finns inte ditt prov här?",
  requestBody: "Vi lägger till nya prov på begäran. Berätta vad du pluggar till.",
  requestCta: "Önska ett prov",
  usLead: (examCount) => `${examCount} prov, från DMV:s körkortsprov till SAT, vård och IT-certifieringar. Varje svar förklaras. Inget konto behövs.`,
  countryLead: (countryName) =>
    `Gratis övningsprov i ${countryName}: teoriprovet för körkortet och certifieringar som är likadana överallt. Varje svar förklaras. Inget konto behövs.`,
  usFaqs: (examCount) => [
    {
      q: "Vad är Tigertest?",
      a: `Tigertest är en gratis sajt med övningsprov för ${examCount} prov, från DMV:s körkortsprov i varje delstat till SAT, ACT och prov inom sjukvård, omsorg, IT, hantverk och yrkeslicenser. Varje prov följer det riktiga provets publicerade upplägg, och vid varje fråga förklaras det rätta svaret.`,
    },
    {
      q: "Är Tigertest gratis?",
      a: "Ja. Nästan alla prov är helt gratis. För DMV finns gratis övningsprov och träning, plus ett valfritt engångsköp av Premium (ingen prenumeration) som låser upp två prov och övningsset till, och full statistik för alla amerikanska prov.",
    },
    {
      q: "Behöver jag ett konto?",
      a: "Nej. Du kan starta vilket prov som helst utan att logga in. Skapa ett gratis konto om du vill spara dina framsteg på alla dina enheter.",
    },
    {
      q: "Hur hjälper Tigertest mig att klara provet?",
      a: "I träningsläget ser du direkt om ditt svar är rätt, och frågor du svarar fel på kommer tillbaka tills du kan dem. Hela övningsprov efterliknar sedan det riktiga provet, och dina resultat visar vilka ämnen du behöver jobba mer med.",
    },
    {
      q: "Hör Tigertest till DMV eller något provföretag?",
      a: "Nej. Tigertest är oberoende och hör inte till någon DMV, något provföretag eller någon certifieringsorganisation.",
    },
  ],
  dmv: {
    cta: "DMV:s körkortsprov",
    title: "Ska du göra DMV:s körkortsprov?",
    body: "200 frågor skrivna utifrån din egen delstats körkortshandbok, för alla 50 delstater och DC.",
    about: "Om DMV-övningsprovet",
    questionsOnTest: (n) => `${n} frågor på det skriftliga provet`,
    viewAll: "Se alla 50 delstater",
  },
  listName: (inName) => `Tigertests övningsprov i ${inName}`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "Vad är Tigertest?",
      a:
        local === 0
          ? `Tigertest är en gratis sajt med övningsprov. I ${inName} finns certifieringar som är likadana överallt, som CompTIA och AWS. Vid varje fråga förklaras det rätta svaret.`
          : `Tigertest är en gratis sajt med övningsprov. I ${inName} finns ${local === 1 ? "ett körkortsprov" : `${local} körkortsprov`} skrivna utifrån ${local === 1 ? "de officiella reglerna" : "de officiella handböckerna"}, plus certifieringar som är likadana överallt, som CompTIA och AWS. Vid varje fråga förklaras det rätta svaret.`,
    },
    { q: "Är Tigertest gratis?", a: `Alla prov i ${inName} är gratis att börja med, utan konto och utan prenumeration. Ett valfritt engångsköp av Premium låser upp det sista övningssetet och det sista övningsprovet i de flesta prov, samt fullständig statistik.` },
    {
      q: "Behöver jag ett konto?",
      a: "Nej. Du kan starta vilket prov som helst utan att logga in. Skapa ett gratis konto om du vill spara dina framsteg på alla dina enheter.",
    },
    {
      q: "Hur hjälper Tigertest mig att klara provet?",
      a: "I träningsläget ser du direkt om ditt svar är rätt, och frågor du svarar fel på kommer tillbaka tills du kan dem. Hela övningsprov efterliknar sedan det riktiga provet, och dina resultat visar vilka ämnen du behöver jobba mer med.",
    },
    {
      q: "Är Tigertest ett officiellt prov?",
      a: `Nej. Tigertest är oberoende och hör inte till ${authority} eller någon annan provanordnare. Frågorna är egna, skrivna utifrån de officiella handböckerna.`,
    },
  ],
  card: {
    questions: (n) => `${n} frågor`,
    free: "Gratis",
    freePlusPremium: "Gratis + Premium",
    answeredThisWeek: "besvarade den här veckan",
    availableIn: (names) => `Finns på: ${names}`,
  },
  search: {
    placeholder: "Sök prov eller yrken",
    label: "Sök övningsprov",
    clear: "Rensa sökningen",
    countOf: (count, total) => `${count} av ${total} prov`,
    allFree: (n) => `${n} övningsprov, alla gratis att börja`,
    noMatch: (q) => `Inga prov hittades för ”${q}”`,
    noMatchHint: "Prova provets namn, yrket eller organisationen som utfärdar certifikatet.",
  },
  pills: {
    showTestsFor: "Visa prov för",
    testsByCountry: "Prov per land",
    countryTests: (name) => `Prov: ${name}`,
    moreCountries: "Fler länder",
    saved: "Sparat till nästa gång. Dina framsteg är desamma i alla länder.",
    geo: (inName) => `Vi visar prov i ${inName} eftersom du är där. Du kan alltid välja ett annat land.`,
  },
};

/** Every country's name in Swedish, for the country pills and "Övningsprov i <land>". */
export const countryNames: Record<string, string> = {
  US: "USA", CA: "Kanada", UK: "Storbritannien", IE: "Irland", AU: "Australien", NZ: "Nya Zeeland", IN: "Indien",
  PH: "Filippinerna", MY: "Malaysia", SG: "Singapore", HK: "Hongkong", AE: "Förenade Arabemiraten", ZA: "Sydafrika",
  NG: "Nigeria", KE: "Kenya", PK: "Pakistan", ES: "Spanien", PT: "Portugal", RO: "Rumänien", SE: "Sverige", GR: "Grekland",
  DK: "Danmark", HU: "Ungern", BE: "Belgien", FI: "Finland", MT: "Malta", DE: "Tyskland", IT: "Italien", FR: "Frankrike",
};
