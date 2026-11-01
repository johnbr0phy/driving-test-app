// The country homepage's own words (components/home/HomePage.tsx), the test
// cards and the catalog search under it, and the country pills, in every
// language a country homepage is written in (REGIONS[].lang in lib/region.ts).
// Per-country lines (title, lead, tests heading) are in REGION_HOME instead.
// A language without an entry reads English; add one with the language's
// first country homepage (fr, it, pl, nl, es-ES and pt-PT are to come).

import type { Language } from "@/i18n";

export interface HomeCopy {
  heroTitle: string;
  findYourTest: string;
  answeredThisWeek: string;
  popularThisWeek: string;
  popularTests: string;
  allTests: (n: number) => string;
  aboutTheTest: string;
  aboutEachTest: string;
  howItWorks: string;
  steps: { label: string; title: string; body: string }[];
  shotAlts: { phones: [string, string, string]; desktop: string; dashboard: string };
  everyTest: string;
  testsFor: (inName: string) => string;
  usExamPrompt: string;
  seeAllTests: (n: number) => string;
  faqTitle: string;
  requestTitle: string;
  requestBody: string;
  requestCta: string;
  /** "Tigertest practice tests for Germany" (JSON-LD ItemList name). */
  listName: (inName: string) => string;
  /** FAQ for a country homepage. `local`: how many of the country's own driving tests there are. */
  faqs: (args: { local: number; inName: string; authority: string; examCount: number }) => { q: string; a: string }[];
  // Test cards and catalog search (components/TestCatalogGrid.tsx)
  card: {
    questions: (n: number) => string;
    free: string;
    freePlusPremium: string;
    answeredThisWeek: string;
    availableIn: (names: string) => string;
  };
  search: {
    placeholder: string;
    label: string;
    clear: string;
    countOf: (count: number, total: number) => string;
    allFree: (n: number) => string;
    noMatch: (q: string) => string;
    noMatchHint: string;
  };
  // Country pills (components/CountryPills.tsx)
  pills: {
    showTestsFor: string;
    testsByCountry: string;
    countryTests: (name: string) => string;
    moreCountries: string;
    saved: string;
    geo: (inName: string) => string;
  };
}

const en: HomeCopy = {
  heroTitle: "Free practice tests that get you to a pass",
  findYourTest: "Find your test",
  answeredThisWeek: "questions answered this week",
  popularThisWeek: "Popular this week",
  popularTests: "Popular tests",
  allTests: (n) => `All ${n} tests`,
  aboutTheTest: "About the test",
  aboutEachTest: "About each test",
  howItWorks: "How Tigertest works",
  steps: [
    {
      label: "Step 1",
      title: "Learn it on your phone",
      body: "Tap an answer and see right away whether it's right and why. Questions you miss come back until you get them, so a few minutes on the bus actually counts.",
    },
    {
      label: "Step 2",
      title: "Sit the real thing",
      body: "When the questions feel easy, take a full practice test built from the real exam's outline, with the same mix of topics. Then you know your score before it counts.",
    },
    {
      label: "Step 3",
      title: "Know when you're ready",
      body: "Your dashboard turns green as you finish each set and pass each test. When it's all green, go book the exam.",
    },
  ],
  shotAlts: {
    phones: ["SAT math drill on a phone", "Surgical technologist question on a phone", "CNA practice question on a phone"],
    desktop: "Timed SAT practice test on a computer",
    dashboard: "Tigertest DMV dashboard with training sets and practice tests",
  },
  everyTest: "Every practice test",
  testsFor: (inName) => `Practice tests for ${inName}`,
  usExamPrompt: "Moving to the US or studying for a US exam?",
  seeAllTests: (n) => `See all ${n} tests`,
  faqTitle: "Frequently asked questions",
  requestTitle: "Don't see your exam?",
  requestBody: "We add new tests based on requests. Tell us which one you are studying for.",
  requestCta: "Request a test",
  listName: (inName) => `Tigertest practice tests for ${inName}`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "What is Tigertest?",
      a:
        local === 0
          ? `Tigertest is a free practice test site. For ${inName} it has certifications that are the same everywhere, such as CompTIA and AWS. Every question explains the right answer.`
          : `Tigertest is a free practice test site. For ${inName} it has ${local === 1 ? "a driving test" : `${local} driving tests`} written from the official ${local === 1 ? "rules" : "handbooks"}, plus certifications that are the same everywhere, such as CompTIA and AWS. Every question explains the right answer.`,
    },
    { q: "Is Tigertest free?", a: `Yes. Every test for ${inName} is free, with no subscription.` },
    {
      q: "Do I need an account?",
      a: "No. You can start any test without signing up. Make a free account if you want your progress saved across devices.",
    },
    {
      q: "How does Tigertest help me pass?",
      a: "Training mode gives instant feedback and brings back the questions you miss until you know them. Full practice tests then simulate the real exam, and your results show which topics still need work.",
    },
    {
      q: "Is Tigertest an official test?",
      a: `No. Tigertest is independent and is not affiliated with ${authority} or any testing company. The questions are original and written from the official handbooks.`,
    },
  ],
  card: {
    questions: (n) => `${n} questions`,
    free: "Free",
    freePlusPremium: "Free + Premium",
    answeredThisWeek: "answered this week",
    availableIn: (names) => `Available in ${names}`,
  },
  search: {
    placeholder: "Search exams or jobs",
    label: "Search practice tests",
    clear: "Clear search",
    countOf: (count, total) => `${count} of ${total} tests`,
    allFree: (n) => `${n} practice tests, all free to start`,
    noMatch: (q) => `No tests match “${q}”`,
    noMatchHint: "Try the exam name, the job title, or the certifying body.",
  },
  pills: {
    showTestsFor: "Show tests for",
    testsByCountry: "Tests by country",
    countryTests: (name) => `${name} tests`,
    moreCountries: "More countries",
    saved: "Saved for next time. Your progress is the same in every country.",
    geo: (inName) => `Showing tests for ${inName} because that's where you are. Pick another country any time.`,
  },
};

const de: HomeCopy = {
  heroTitle: "Kostenlose Übungstests, die dich zum Bestehen bringen",
  findYourTest: "Finde deinen Test",
  answeredThisWeek: "Fragen diese Woche beantwortet",
  popularThisWeek: "Diese Woche beliebt",
  popularTests: "Beliebte Tests",
  allTests: (n) => `Alle ${n} Tests`,
  aboutTheTest: "Über die Prüfung",
  aboutEachTest: "Über jede Prüfung",
  howItWorks: "So funktioniert Tigertest",
  steps: [
    {
      label: "Schritt 1",
      title: "Lerne auf dem Handy",
      body: "Tippe auf eine Antwort und sieh sofort, ob sie stimmt und warum. Fragen, die du falsch hast, kommen wieder, bis sie sitzen. So zählen auch ein paar Minuten im Bus.",
    },
    {
      label: "Schritt 2",
      title: "Mach den Ernstfall",
      body: "Wenn die Fragen leicht wirken, mach einen vollständigen Übungstest mit derselben Themenmischung wie die echte Prüfung. Dann kennst du dein Ergebnis, bevor es zählt.",
    },
    {
      label: "Schritt 3",
      title: "Wisse, wann du bereit bist",
      body: "Deine Übersicht wird grün, sobald du ein Set abschließt und einen Test bestehst. Ist alles grün, melde dich zur Prüfung an.",
    },
  ],
  shotAlts: {
    phones: ["Übungsfrage auf dem Handy", "Prüfungsfrage auf dem Handy", "Trainingsmodus auf dem Handy"],
    desktop: "Übungstest mit Zeitlimit am Computer",
    dashboard: "Tigertest-Übersicht mit Übungssets und Übungstests",
  },
  everyTest: "Alle Übungstests",
  testsFor: () => "Übungstests für Deutschland",
  usExamPrompt: "Du ziehst in die USA oder lernst für eine US-Prüfung?",
  seeAllTests: (n) => `Alle ${n} Tests ansehen`,
  faqTitle: "Häufige Fragen",
  requestTitle: "Deine Prüfung fehlt?",
  requestBody: "Wir bauen neue Tests nach euren Wünschen. Sag uns, wofür du lernst.",
  requestCta: "Test vorschlagen",
  listName: () => "Tigertest-Übungstests für Deutschland",
  faqs: ({ local, authority }) => [
    {
      q: "Was ist Tigertest?",
      a:
        local === 0
          ? "Tigertest ist eine kostenlose Seite mit Übungstests. Für Deutschland gibt es bisher Zertifizierungen, die überall gleich sind, etwa CompTIA und AWS. Zu jeder Frage wird die richtige Antwort erklärt."
          : `Tigertest ist eine kostenlose Seite mit Übungstests. Für Deutschland gibt es ${local === 1 ? "einen Test zur Führerscheinprüfung" : `${local} Tests zur Führerscheinprüfung`}, geschrieben nach den amtlichen Regeln, dazu Zertifizierungen, die überall gleich sind, etwa CompTIA und AWS. Zu jeder Frage wird die richtige Antwort erklärt.`,
    },
    { q: "Ist Tigertest kostenlos?", a: "Ja. Jeder Test für Deutschland ist kostenlos, ohne Abo." },
    {
      q: "Brauche ich ein Konto?",
      a: "Nein. Du kannst jeden Test ohne Anmeldung starten. Mit einem kostenlosen Konto wird dein Fortschritt auf all deinen Geräten gespeichert.",
    },
    {
      q: "Wie hilft mir Tigertest beim Bestehen?",
      a: "Im Trainingsmodus siehst du sofort, ob deine Antwort stimmt, und Fragen, die du falsch hast, kommen wieder, bis du sie kannst. Vollständige Übungstests simulieren dann die echte Prüfung, und deine Ergebnisse zeigen, welche Themen noch Arbeit brauchen.",
    },
    {
      q: "Ist Tigertest ein offizieller Test?",
      a: `Nein. Tigertest ist unabhängig und gehört weder zu ${authority} noch zu einem anderen Prüfungsanbieter. Die Fragen sind eigene Fragen, geschrieben nach den amtlichen Vorschriften, keine Fragen aus dem amtlichen Fragenkatalog.`,
    },
  ],
  card: {
    questions: (n) => `${n} Fragen`,
    free: "Kostenlos",
    freePlusPremium: "Kostenlos + Premium",
    answeredThisWeek: "diese Woche beantwortet",
    availableIn: (names) => `Verfügbar auf ${names}`,
  },
  search: {
    placeholder: "Prüfungen oder Berufe suchen",
    label: "Übungstests suchen",
    clear: "Suche löschen",
    countOf: (count, total) => `${count} von ${total} Tests`,
    allFree: (n) => `${n} Übungstests, alle kostenlos`,
    noMatch: (q) => `Keine Tests passen zu „${q}“`,
    noMatchHint: "Versuch es mit dem Namen der Prüfung, dem Beruf oder der prüfenden Stelle.",
  },
  pills: {
    showTestsFor: "Tests zeigen für",
    testsByCountry: "Tests nach Land",
    countryTests: (name) => `Tests: ${name}`,
    moreCountries: "Weitere Länder",
    saved: "Für das nächste Mal gespeichert. Dein Fortschritt ist in jedem Land derselbe.",
    geo: () => "Du siehst Tests für Deutschland, weil du gerade dort bist. Du kannst jederzeit ein anderes Land wählen.",
  },
};

const HOME_COPY: Partial<Record<Language, HomeCopy>> = { en, de };

export function homeCopy(lang: Language): HomeCopy {
  return HOME_COPY[lang] ?? en;
}

/** Country names in a homepage's language, for the pills (English otherwise). */
export const COUNTRY_NAMES: Partial<Record<Language, Record<string, string>>> = {
  de: {
    US: "USA", CA: "Kanada", UK: "Vereinigtes Königreich", IE: "Irland", AU: "Australien", NZ: "Neuseeland", IN: "Indien",
    PH: "Philippinen", MY: "Malaysia", SG: "Singapur", HK: "Hongkong", AE: "Vereinigte Arabische Emirate", ZA: "Südafrika",
    NG: "Nigeria", KE: "Kenia", PK: "Pakistan", ES: "Spanien", PT: "Portugal", RO: "Rumänien", SE: "Schweden", GR: "Griechenland",
    DK: "Dänemark", HU: "Ungarn", BE: "Belgien", FI: "Finnland", MT: "Malta", DE: "Deutschland",
  },
  es: { ES: "España", PT: "Portugal", DE: "Alemania", US: "EE. UU." },
  pt: { PT: "Portugal", ES: "Espanha", DE: "Alemanha", US: "EUA" },
  fr: { DE: "Allemagne", ES: "Espagne", PT: "Portugal", BE: "Belgique" },
  it: { DE: "Germania", ES: "Spagna", PT: "Portogallo" },
  pl: { DE: "Niemcy", ES: "Hiszpania", PT: "Portugalia" },
  nl: { DE: "Duitsland", ES: "Spanje", PT: "Portugal", BE: "België" },
};
