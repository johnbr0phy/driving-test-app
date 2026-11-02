// The country homepage's own words (components/home/HomePage.tsx), the test
// cards and the catalog search under it, and the country pills, in every
// interface language: a homepage shows in its country's language
// (REGIONS[].lang in lib/region.ts) or, once someone picks one, in theirs
// (middleware.ts serves app/home-lang/[region]/[lang]). Per-country lines
// (title, lead, tests heading) are in REGION_HOME, in the country's own
// language; a page in another language uses countryLead and testsFor instead.
// The languages other than English and German live in ./copy/<lang>.ts
// (machine-translated, pending native review).

import type { Language } from "@/i18n";
import { regionInfo, type Region } from "@/lib/region";
import { TRANSLATED_COPY, TRANSLATED_COUNTRY_NAMES, TRANSLATED_IN_NAMES } from "./copy";

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
  /** The US homepage's lead, under the hero title. */
  usLead: (examCount: number) => string;
  /** A country homepage's lead when the page is not in the country's own language. */
  countryLead: (countryName: string) => string;
  /** The US homepage's FAQ. */
  usFaqs: (examCount: number) => { q: string; a: string }[];
  /** The US homepage's DMV section. */
  dmv: {
    cta: string;
    title: string;
    body: string;
    about: string;
    questionsOnTest: (n: number) => string;
    viewAll: string;
  };
  /** "Tigertest practice tests for Germany" (JSON-LD ItemList name). */
  listName: (inName: string) => string;
  /** FAQ for a country homepage. `local`: how many of the country's own driving tests there are;
   *  `others`: its other tests (school, trade, citizenship...), counted in the English copy.
   *  `inName` is the country's name in this language ("the UK" in English). */
  faqs: (args: { local: number; others?: number; inName: string; authority: string; examCount: number }) => { q: string; a: string }[];
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
  usLead: (examCount) => `${examCount} exams, from the DMV permit test to the SAT, nursing and IT certs. Every answer explained. No signup.`,
  countryLead: (countryName) =>
    `Free practice tests for ${countryName}: the driving theory test and certifications that are the same everywhere. Every answer explained. No signup.`,
  usFaqs: (examCount) => [
    {
      q: "What is Tigertest?",
      a: `Tigertest is a free practice test site for ${examCount} exams, from the DMV permit test in every state to the SAT, ACT, nursing, healthcare, IT, trade and licensing exams. Each test follows the real exam's published outline, and every question explains the right answer.`,
    },
    {
      q: "Is Tigertest free?",
      a: "Yes. Almost every test is completely free. The DMV has free practice tests and training plus an optional one-time $9.99 Premium purchase (not a subscription) that unlocks two more tests and training sets and full stats on every exam.",
    },
    {
      q: "Do I need an account?",
      a: "No. You can start any test without signing up. Make a free account if you want your progress saved across devices.",
    },
    {
      q: "How does Tigertest help me pass?",
      a: "Training mode gives instant feedback and brings back the questions you miss until you know them. Full practice tests then simulate the real exam, and your results show which topics still need work.",
    },
    {
      q: "Is Tigertest affiliated with the DMV or any testing company?",
      a: "No. Tigertest is independent and is not affiliated with any DMV, testing company or certification body.",
    },
  ],
  dmv: {
    cta: "DMV permit test",
    title: "Taking your DMV permit test?",
    body: "200 questions written from your state's own driver's manual, for all 50 states and DC.",
    about: "About the DMV practice test",
    questionsOnTest: (n) => `${n} questions on the written test`,
    viewAll: "View all 50 states",
  },
  listName: (inName) => `Tigertest practice tests for ${inName}`,
  faqs: ({ local, others = 0, inName, authority }) => [
    {
      q: "What is Tigertest?",
      a:
        local + others === 0
          ? `Tigertest is a free practice test site. For ${inName} it has certifications that are the same everywhere, such as CompTIA and AWS. Every question explains the right answer.`
          : others === 0
            ? `Tigertest is a free practice test site. For ${inName} it has ${local === 1 ? "a driving test" : `${local} driving tests`} written from the official ${local === 1 ? "rules" : "handbooks"}, plus certifications that are the same everywhere, such as CompTIA and AWS. Every question explains the right answer.`
            : `Tigertest is a free practice test site. For ${inName} it has ${local + others} practice tests${local > 0 ? `, ${local === 1 ? "one of them a driving test" : `${local} of them driving tests`},` : ""} written from the official handbooks and syllabuses, plus certifications that are the same everywhere, such as CompTIA and AWS. Every question explains the right answer.`,
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
  testsFor: (inName) => `Übungstests für ${inName}`,
  usExamPrompt: "Du ziehst in die USA oder lernst für eine US-Prüfung?",
  seeAllTests: (n) => `Alle ${n} Tests ansehen`,
  faqTitle: "Häufige Fragen",
  requestTitle: "Deine Prüfung fehlt?",
  requestBody: "Wir bauen neue Tests nach euren Wünschen. Sag uns, wofür du lernst.",
  requestCta: "Test vorschlagen",
  usLead: (examCount) => `${examCount} Prüfungen, vom US-Führerscheintest (DMV) bis zum SAT, Pflege- und IT-Zertifikaten. Jede Antwort erklärt. Ohne Anmeldung.`,
  countryLead: (countryName) =>
    `Kostenlose Übungstests für ${countryName}: die theoretische Führerscheinprüfung und Zertifizierungen, die überall gleich sind. Jede Antwort erklärt. Ohne Anmeldung.`,
  usFaqs: (examCount) => [
    {
      q: "Was ist Tigertest?",
      a: `Tigertest ist eine kostenlose Seite mit Übungstests für ${examCount} Prüfungen, vom DMV-Führerscheintest in jedem US-Bundesstaat bis zu SAT, ACT, Pflege, Gesundheitswesen, IT, Handwerk und Zulassungsprüfungen. Jeder Test folgt dem veröffentlichten Aufbau der echten Prüfung, und zu jeder Frage wird die richtige Antwort erklärt.`,
    },
    {
      q: "Ist Tigertest kostenlos?",
      a: "Ja. Fast jeder Test ist komplett kostenlos. Für den DMV gibt es kostenlose Übungstests und Training, dazu einen optionalen einmaligen Premium-Kauf für 8,99 € (kein Abo), der zwei weitere Tests, Übungssets und volle Statistiken für jede Prüfung freischaltet.",
    },
    {
      q: "Brauche ich ein Konto?",
      a: "Nein. Du kannst jeden Test ohne Anmeldung starten. Mit einem kostenlosen Konto wird dein Fortschritt auf all deinen Geräten gespeichert.",
    },
    {
      q: "Wie hilft mir Tigertest beim Bestehen?",
      a: "Im Trainingsmodus siehst du sofort, ob deine Antwort stimmt, und Fragen, die du falsch hast, kommen wieder, bis du sie kannst. Vollständige Übungstests simulieren dann die echte Prüfung, und deine Ergebnisse zeigen, welche Themen noch Arbeit brauchen.",
    },
    {
      q: "Gehört Tigertest zum DMV oder zu einem Prüfungsanbieter?",
      a: "Nein. Tigertest ist unabhängig und gehört weder zu einem DMV noch zu einem Prüfungsanbieter oder einer Zertifizierungsstelle.",
    },
  ],
  dmv: {
    cta: "DMV-Führerscheintest",
    title: "Du machst den DMV-Führerscheintest?",
    body: "200 Fragen nach dem Fahrerhandbuch deines Bundesstaats, für alle 50 Bundesstaaten und DC.",
    about: "Über den DMV-Übungstest",
    questionsOnTest: (n) => `${n} Fragen in der schriftlichen Prüfung`,
    viewAll: "Alle 50 Bundesstaaten ansehen",
  },
  listName: (inName) => `Tigertest-Übungstests für ${inName}`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "Was ist Tigertest?",
      a:
        local === 0
          ? `Tigertest ist eine kostenlose Seite mit Übungstests. Für ${inName} gibt es bisher Zertifizierungen, die überall gleich sind, etwa CompTIA und AWS. Zu jeder Frage wird die richtige Antwort erklärt.`
          : `Tigertest ist eine kostenlose Seite mit Übungstests. Für ${inName} gibt es ${local === 1 ? "einen Test zur Führerscheinprüfung" : `${local} Tests zur Führerscheinprüfung`}, geschrieben nach den amtlichen Regeln, dazu Zertifizierungen, die überall gleich sind, etwa CompTIA und AWS. Zu jeder Frage wird die richtige Antwort erklärt.`,
    },
    { q: "Ist Tigertest kostenlos?", a: `Ja. Jeder Test für ${inName} ist kostenlos, ohne Abo.` },
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
    geo: (inName) => `Du siehst Tests für ${inName}, weil du gerade dort bist. Du kannst jederzeit ein anderes Land wählen.`,
  },
};

const HOME_COPY: Partial<Record<Language, HomeCopy>> = { en, de, ...TRANSLATED_COPY };

export function homeCopy(lang: Language): HomeCopy {
  return HOME_COPY[lang] ?? en;
}

/** Country names in a homepage's language, for the pills (English otherwise). */
export const COUNTRY_NAMES: Partial<Record<Language, Record<string, string>>> = {
  ...TRANSLATED_COUNTRY_NAMES,
  de: {
    US: "USA", CA: "Kanada", UK: "Vereinigtes Königreich", IE: "Irland", AU: "Australien", NZ: "Neuseeland", IN: "Indien",
    PH: "Philippinen", MY: "Malaysia", SG: "Singapur", HK: "Hongkong", AE: "Vereinigte Arabische Emirate", ZA: "Südafrika",
    NG: "Nigeria", KE: "Kenia", PK: "Pakistan", ES: "Spanien", PT: "Portugal", RO: "Rumänien", SE: "Schweden", GR: "Griechenland",
    DK: "Dänemark", HU: "Ungarn", BE: "Belgien", FI: "Finnland", MT: "Malta", DE: "Deutschland",
  },
};

/** A country's name as a homepage in `lang` writes it: "the UK" in English,
 *  "Vereinigtes Königreich" in German, "le Royaume-Uni" in French (with the
 *  article a sentence needs), the English name where none is set. */
export function countryNameIn(region: Region, lang: Language): string {
  if (lang === "en") return regionInfo(region).inName;
  return TRANSLATED_IN_NAMES[lang]?.[region] ?? COUNTRY_NAMES[lang]?.[region] ?? regionInfo(region).name;
}
