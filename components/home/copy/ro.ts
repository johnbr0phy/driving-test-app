// Romanian homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.
// Register: informal "tu", like i18n/ro.ts. Countries follow "pentru" or a
// colon, where Romanian uses the plain name ("pentru Regatul Unit", "pentru
// Statele Unite"), so no inNames table is needed. Romanian puts "de" between a
// number and its noun from 20 up ("50 de întrebări"); cuDe() handles it.

import type { HomeCopy } from "../homeCopy";

/** "19 teste", "20 de teste", "101 teste", "120 de teste". */
function cuDe(n: number, noun: string): string {
  const r = n % 100;
  return (r === 0 && n !== 0) || r >= 20 ? `${n} de ${noun}` : `${n} ${noun}`;
}

export const ro: HomeCopy = {
  heroTitle: "Teste de exersare gratuite care te duc la promovare",
  findYourTest: "Găsește-ți testul",
  answeredThisWeek: "întrebări răspunse săptămâna aceasta",
  popularThisWeek: "Populare săptămâna aceasta",
  popularTests: "Teste populare",
  allTests: (n) => `Toate testele (${n})`,
  aboutTheTest: "Despre examen",
  aboutEachTest: "Despre fiecare examen",
  howItWorks: "Cum funcționează Tigertest",
  steps: [
    {
      label: "Pasul 1",
      title: "Învață pe telefon",
      body: "Atingi un răspuns și vezi imediat dacă e corect și de ce. Întrebările greșite revin până le știi. Așa contează și câteva minute în autobuz.",
    },
    {
      label: "Pasul 2",
      title: "Exersează examenul adevărat",
      body: "Când întrebările ți se par ușoare, fă un test de exersare complet, construit după structura examenului adevărat, cu același amestec de teme. Așa îți știi scorul înainte să conteze.",
    },
    {
      label: "Pasul 3",
      title: "Află când ești pregătit",
      body: "Panoul tău devine verde când termini un set și treci un test. Când totul e verde, programează-te la examen.",
    },
  ],
  shotAlts: {
    phones: ["Exercițiu de matematică SAT pe un telefon", "Întrebare pentru asistent de chirurgie pe un telefon", "Întrebare de exersare CNA pe un telefon"],
    desktop: "Test de exersare SAT cu cronometru pe un computer",
    dashboard: "Panoul DMV Tigertest cu seturi de antrenament și teste de exersare",
  },
  everyTest: "Toate testele de exersare",
  testsFor: (inName) => `Teste de exersare pentru ${inName}`,
  usExamPrompt: "Te muți în Statele Unite sau înveți pentru un examen american?",
  seeAllTests: (n) => `Vezi toate testele (${n})`,
  faqTitle: "Întrebări frecvente",
  requestTitle: "Nu-ți găsești examenul?",
  requestBody: "Adăugăm teste noi la cerere. Spune-ne pentru ce înveți.",
  requestCta: "Cere un test",
  usLead: (examCount) =>
    `${cuDe(examCount, "examene")}, de la testul auto DMV la SAT, asistență medicală și certificări IT. Fiecare răspuns explicat. Fără cont.`,
  countryLead: (countryName) =>
    `Teste de exersare gratuite pentru ${countryName}: examenul teoretic auto și certificări care sunt la fel peste tot. Fiecare răspuns explicat. Fără cont.`,
  usFaqs: (examCount) => [
    {
      q: "Ce este Tigertest?",
      a: `Tigertest este un site gratuit cu teste de exersare pentru ${cuDe(examCount, "examene")}, de la testul auto DMV din fiecare stat la SAT, ACT și examene de asistență medicală, sănătate, IT, meserii și licențe. Fiecare test urmează structura publicată a examenului adevărat, iar fiecare întrebare explică răspunsul corect.`,
    },
    {
      q: "Tigertest e gratuit?",
      a: "Da. Aproape fiecare test e complet gratuit. Pentru DMV există teste de exersare și antrenament gratuite, plus o achiziție Premium opțională, unică (nu un abonament), care deblochează încă un test și un set de antrenament, plus statistici complete pentru fiecare examen.",
    },
    {
      q: "Am nevoie de cont?",
      a: "Nu. Poți începe orice test fără să te înregistrezi. Fă-ți un cont gratuit dacă vrei să-ți păstrezi progresul pe toate dispozitivele.",
    },
    {
      q: "Cum mă ajută Tigertest să trec examenul?",
      a: "Modul de antrenament îți arată imediat dacă ai răspuns corect, iar întrebările greșite revin până le știi. Apoi, testele de exersare complete simulează examenul adevărat, iar rezultatele îți arată ce teme mai au nevoie de lucru.",
    },
    {
      q: "Tigertest ține de DMV sau de un centru de examinare?",
      a: "Nu. Tigertest este independent și nu ține de niciun DMV, centru de examinare sau organism de certificare.",
    },
  ],
  dmv: {
    cta: "Testul auto DMV",
    title: "Dai testul auto DMV?",
    body: "200 de întrebări scrise după manualul șoferului din statul tău, pentru toate cele 50 de state și DC.",
    about: "Despre testul de exersare DMV",
    questionsOnTest: (n) => `${cuDe(n, "întrebări")} la testul scris`,
    viewAll: "Vezi toate cele 50 de state",
  },
  listName: (inName) => `Teste de exersare Tigertest pentru ${inName}`,
  faqs: ({ local, others = 0, inName, authority }) => [
    {
      q: "Ce este Tigertest?",
      a:
        local + others === 0
          ? `Tigertest este un site gratuit cu teste de exersare. Pentru ${inName} are certificări care sunt la fel peste tot, cum ar fi CompTIA și AWS. Fiecare întrebare explică răspunsul corect.`
          : others === 0
            ? `Tigertest este un site gratuit cu teste de exersare. Pentru ${inName} are ${local === 1 ? "un test auto scris după regulile oficiale" : `${cuDe(local, "teste auto")} scrise după manualele oficiale`}, plus certificări care sunt la fel peste tot, cum ar fi CompTIA și AWS. Fiecare întrebare explică răspunsul corect.`
            : `Tigertest este un site gratuit cu teste de exersare. Pentru ${inName} are ${cuDe(local + others, "teste de exersare")}${local > 0 ? ` (${local === 1 ? "unul dintre ele, test auto" : `${local} dintre ele, teste auto`})` : ""}, scrise după manualele și programele oficiale, plus certificări care sunt la fel peste tot, cum ar fi CompTIA și AWS. Fiecare întrebare explică răspunsul corect.`,
    },
    { q: "Tigertest e gratuit?", a: `Da. Fiecare test pentru ${inName} e gratuit, fără abonament.` },
    {
      q: "Am nevoie de cont?",
      a: "Nu. Poți începe orice test fără să te înregistrezi. Fă-ți un cont gratuit dacă vrei să-ți păstrezi progresul pe toate dispozitivele.",
    },
    {
      q: "Cum mă ajută Tigertest să trec examenul?",
      a: "Modul de antrenament îți arată imediat dacă ai răspuns corect, iar întrebările greșite revin până le știi. Apoi, testele de exersare complete simulează examenul adevărat, iar rezultatele îți arată ce teme mai au nevoie de lucru.",
    },
    {
      q: "Tigertest este un examen oficial?",
      a: `Nu. Tigertest este independent și nu ține de ${authority} sau de alt centru de examinare. Întrebările sunt originale, scrise după manualele oficiale.`,
    },
  ],
  card: {
    questions: (n) => cuDe(n, "întrebări"),
    free: "Gratuit",
    freePlusPremium: "Gratuit + Premium",
    answeredThisWeek: "răspunse săptămâna aceasta",
    availableIn: (names) => `Disponibil în: ${names}`,
  },
  search: {
    placeholder: "Caută examene sau meserii",
    label: "Caută teste de exersare",
    clear: "Șterge căutarea",
    countOf: (count, total) => `${count} din ${cuDe(total, "teste")}`,
    allFree: (n) => `${cuDe(n, "teste de exersare")}, toate gratuite`,
    noMatch: (q) => `Niciun test găsit pentru „${q}”`,
    noMatchHint: "Încearcă numele examenului, al meseriei sau al instituției care eliberează certificatul.",
  },
  pills: {
    showTestsFor: "Arată teste pentru",
    testsByCountry: "Teste pe țări",
    countryTests: (name) => `Teste: ${name}`,
    moreCountries: "Mai multe țări",
    saved: "Salvat pentru data viitoare. Progresul tău e același în fiecare țară.",
    geo: (inName) => `Îți arătăm teste pentru ${inName} pentru că ești acolo. Poți alege oricând altă țară.`,
  },
};

/** Every country's name in Romanian, for the country pills and "Practice tests for <country>". */
export const countryNames: Record<string, string> = {
  US: "Statele Unite", CA: "Canada", UK: "Regatul Unit", IE: "Irlanda", AU: "Australia", NZ: "Noua Zeelandă", IN: "India",
  PH: "Filipine", MY: "Malaysia", SG: "Singapore", HK: "Hong Kong", AE: "Emiratele Arabe Unite", ZA: "Africa de Sud",
  NG: "Nigeria", KE: "Kenya", PK: "Pakistan", ES: "Spania", PT: "Portugalia", RO: "România", SE: "Suedia", GR: "Grecia",
  DK: "Danemarca", HU: "Ungaria", BE: "Belgia", FI: "Finlanda", MT: "Malta", DE: "Germania",
};
