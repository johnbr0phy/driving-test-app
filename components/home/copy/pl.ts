// Polish homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.
// Register: "ty", like i18n/pl.ts. Country names stay in the nominative, after
// a colon or in brackets ("dla tego kraju (Niemcy)"), so nothing is declined.

import type { HomeCopy } from "../homeCopy";

/** Polish plural form: 1 test, 2 testy, 5 testów (12 to 14 take the "many" form). */
function plural(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  const last = n % 10;
  const lastTwo = n % 100;
  return last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? few : many;
}

const exams = (n: number) => `${n} ${plural(n, "egzamin", "egzaminy", "egzaminów")}`;
const questions = (n: number) => `${n} ${plural(n, "pytanie", "pytania", "pytań")}`;

export const pl: HomeCopy = {
  heroTitle: "Darmowe testy próbne, dzięki którym zdasz",
  findYourTest: "Znajdź swój test",
  answeredThisWeek: "odpowiedzi w tym tygodniu",
  popularThisWeek: "Popularne w tym tygodniu",
  popularTests: "Popularne testy",
  allTests: (n) => `Wszystkie testy (${n})`,
  aboutTheTest: "O egzaminie",
  aboutEachTest: "O każdym egzaminie",
  howItWorks: "Jak działa Tigertest",
  steps: [
    {
      label: "Krok 1",
      title: "Ucz się na telefonie",
      body: "Stuknij odpowiedź i od razu zobacz, czy jest dobra i dlaczego. Pytania, na które odpowiesz źle, wracają, aż je opanujesz. Dzięki temu nawet kilka minut w autobusie naprawdę się liczy.",
    },
    {
      label: "Krok 2",
      title: "Zrób prawdziwy sprawdzian",
      body: "Gdy pytania wydają się łatwe, zrób pełny test próbny zbudowany według programu prawdziwego egzaminu, z tą samą mieszanką tematów. Wtedy znasz swój wynik, zanim zacznie się liczyć.",
    },
    {
      label: "Krok 3",
      title: "Wiedz, kiedy jesteś gotowy",
      body: "Twój panel robi się zielony, gdy kończysz kolejne zestawy i zdajesz kolejne testy. Gdy wszystko jest zielone, zapisz się na egzamin.",
    },
  ],
  shotAlts: {
    phones: ["Ćwiczenie z matematyki SAT na telefonie", "Pytanie dla instrumentariusza na telefonie", "Pytanie próbne CNA na telefonie"],
    desktop: "Test próbny SAT z limitem czasu na komputerze",
    dashboard: "Panel DMV w Tigertest z zestawami treningowymi i testami próbnymi",
  },
  everyTest: "Wszystkie testy próbne",
  testsFor: (inName) => `Testy próbne: ${inName}`,
  usExamPrompt: "Przeprowadzasz się do USA albo uczysz się do amerykańskiego egzaminu?",
  seeAllTests: (n) => `Zobacz wszystkie testy (${n})`,
  faqTitle: "Najczęstsze pytania",
  requestTitle: "Nie widzisz swojego egzaminu?",
  requestBody: "Dodajemy nowe testy na prośbę użytkowników. Napisz nam, do czego się uczysz.",
  requestCta: "Zaproponuj test",
  usLead: (examCount) => `${exams(examCount)}, od testu na prawo jazdy DMV po SAT, egzaminy pielęgniarskie i certyfikaty IT. Każda odpowiedź wyjaśniona. Bez rejestracji.`,
  countryLead: (countryName) =>
    `Darmowe testy próbne dla tego kraju (${countryName}): egzamin teoretyczny na prawo jazdy i certyfikaty, które wszędzie są takie same. Każda odpowiedź wyjaśniona. Bez rejestracji.`,
  usFaqs: (examCount) => [
    {
      q: "Czym jest Tigertest?",
      a: `Tigertest to darmowa strona z testami próbnymi: ${exams(examCount)}, od testu DMV na prawo jazdy w każdym stanie po SAT, ACT oraz egzaminy z pielęgniarstwa, ochrony zdrowia, IT, zawodów i licencji. Każdy test opiera się na opublikowanym programie prawdziwego egzaminu, a przy każdym pytaniu wyjaśniamy poprawną odpowiedź.`,
    },
    {
      q: "Czy Tigertest jest darmowy?",
      a: "Tak. Prawie każdy test jest całkowicie darmowy. Dla DMV są darmowe testy próbne i trening oraz opcjonalny jednorazowy zakup Premium za 9,99 $ (to nie subskrypcja), który odblokowuje dwa kolejne testy i zestawy treningowe oraz pełne statystyki dla każdego amerykańskiego egzaminu.",
    },
    {
      q: "Czy potrzebuję konta?",
      a: "Nie. Możesz zacząć dowolny test bez rejestracji. Załóż darmowe konto, jeśli chcesz zapisywać postępy na wszystkich urządzeniach.",
    },
    {
      q: "Jak Tigertest pomaga zdać?",
      a: "Tryb treningu od razu pokazuje, czy odpowiedź jest dobra, i powtarza pytania, na które odpowiesz źle, aż je opanujesz. Pełne testy próbne symulują potem prawdziwy egzamin, a wyniki pokazują, nad którymi tematami musisz jeszcze popracować.",
    },
    {
      q: "Czy Tigertest jest powiązany z DMV lub firmą egzaminacyjną?",
      a: "Nie. Tigertest jest niezależny i nie jest powiązany z żadnym DMV, firmą egzaminacyjną ani instytucją certyfikującą.",
    },
  ],
  dmv: {
    cta: "Test DMV na prawo jazdy",
    title: "Zdajesz test DMV na prawo jazdy?",
    body: "200 pytań napisanych na podstawie podręcznika kierowcy twojego stanu, dla wszystkich 50 stanów i DC.",
    about: "O teście próbnym DMV",
    questionsOnTest: (n) => `${questions(n)} na egzaminie pisemnym`,
    viewAll: "Zobacz wszystkie 50 stanów",
  },
  listName: (inName) => `Testy próbne Tigertest: ${inName}`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "Czym jest Tigertest?",
      a:
        local === 0
          ? `Tigertest to darmowa strona z testami próbnymi. Dla tego kraju (${inName}) ma certyfikaty, które wszędzie są takie same, na przykład CompTIA i AWS. Przy każdym pytaniu wyjaśniamy poprawną odpowiedź.`
          : `Tigertest to darmowa strona z testami próbnymi. Dla tego kraju (${inName}) ma ${local === 1 ? "test na prawo jazdy napisany" : `${local} ${plural(local, "test", "testy", "testów")} na prawo jazdy napisane`} na podstawie oficjalnych ${local === 1 ? "przepisów" : "podręczników"}, a także certyfikaty, które wszędzie są takie same, na przykład CompTIA i AWS. Przy każdym pytaniu wyjaśniamy poprawną odpowiedź.`,
    },
    { q: "Czy Tigertest jest darmowy?", a: `Tak. Każdy test dla tego kraju (${inName}) jest darmowy, bez subskrypcji.` },
    {
      q: "Czy potrzebuję konta?",
      a: "Nie. Możesz zacząć dowolny test bez rejestracji. Załóż darmowe konto, jeśli chcesz zapisywać postępy na wszystkich urządzeniach.",
    },
    {
      q: "Jak Tigertest pomaga zdać?",
      a: "Tryb treningu od razu pokazuje, czy odpowiedź jest dobra, i powtarza pytania, na które odpowiesz źle, aż je opanujesz. Pełne testy próbne symulują potem prawdziwy egzamin, a wyniki pokazują, nad którymi tematami musisz jeszcze popracować.",
    },
    {
      q: "Czy Tigertest to oficjalny test?",
      a: `Nie. Tigertest jest niezależny i nie jest powiązany z ${authority} ani z żadną firmą egzaminacyjną. Pytania są oryginalne i napisane na podstawie oficjalnych podręczników.`,
    },
  ],
  card: {
    questions: (n) => questions(n),
    free: "Darmowy",
    freePlusPremium: "Darmowy + Premium",
    answeredThisWeek: "odpowiedzi w tym tygodniu",
    availableIn: (names) => `Dostępne języki: ${names}`,
  },
  search: {
    placeholder: "Szukaj egzaminów lub zawodów",
    label: "Szukaj testów próbnych",
    clear: "Wyczyść wyszukiwanie",
    countOf: (count, total) => `${count} z ${total} testów`,
    allFree: (n) => `Testy próbne: ${n}, wszystkie za darmo na start`,
    noMatch: (q) => `Brak testów pasujących do „${q}”`,
    noMatchHint: "Spróbuj nazwy egzaminu, zawodu lub instytucji certyfikującej.",
  },
  pills: {
    showTestsFor: "Pokaż testy dla",
    testsByCountry: "Testy według kraju",
    countryTests: (name) => `Testy: ${name}`,
    moreCountries: "Więcej krajów",
    saved: "Zapisane na następny raz. Twoje postępy są takie same w każdym kraju.",
    geo: (inName) => `Pokazujemy testy dla tego kraju (${inName}), bo tam jesteś. W każdej chwili możesz wybrać inny kraj.`,
  },
};

/** Every country's name in Polish, for the country pills and "Practice tests for <country>". */
export const countryNames: Record<string, string> = {
  US: "USA", CA: "Kanada", UK: "Wielka Brytania", IE: "Irlandia", AU: "Australia", NZ: "Nowa Zelandia", IN: "Indie",
  PH: "Filipiny", MY: "Malezja", SG: "Singapur", HK: "Hongkong", AE: "Zjednoczone Emiraty Arabskie", ZA: "RPA",
  NG: "Nigeria", KE: "Kenia", PK: "Pakistan", ES: "Hiszpania", PT: "Portugalia", RO: "Rumunia", SE: "Szwecja", GR: "Grecja",
  DK: "Dania", HU: "Węgry", BE: "Belgia", FI: "Finlandia", MT: "Malta", DE: "Niemcy",
};
