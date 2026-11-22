# Wiring for `plaplik` (Egzamin wstępny na aplikację adwokacką i radcowską, written in Polish, v1)

A native-language exam in Polish (`language: "pl"`), built from the `detheorie` template, with
the law-exam shape of `espolicia`. The platform pieces for Polish already exist (`i18n/pl.ts`,
`LANG_RULES["pl"]` in the validator, the `pl` entry in `lib/shuffleOptions.ts`); Poland is a new
Tigertest region shared with the sibling builds `plteoria`, `pllek`, `plbron` and `plcpc`, so the
region lines below are written once for all five: apply them once.

Files already written by the builder:
- `data/pl-aplikacje-questions.json` (200, validator PASS with `--lang pl`)
- `lib/banks/plaplik.ts`
- `app/poland-legal-apprenticeship-exam/*` (5 wrappers copied from `app/medborgerskabsproeve/`:
  layout, redirect, dashboard, drill and stats; drill and stats import the bank; no test or
  practice folders, the shared `app/[slug]` routes serve them)
- `lib/landings/plaplik.pl.json` (Polish landing content, `facts.source` gov.pl)
- `app/pl/egzamin-na-aplikacje/page.tsx` (three-line `TranslatedExamLanding` wrapper,
  `lang="pl"`, `samples`, `related`)
- `tools/next100/plaplik/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/plaplik/build.py`. Validate with:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/pl-aplikacje-questions.json --lang pl --pool plapCywilne=28 --pool plapRodzinne=8 --pool plapCywProc=28 --pool plapKarne=24 --pool plapKarProc=24 --pool plapWykroczenia=8 --pool plapPraca=16 --pool plapGospodarcze=20 --pool plapAdministracyjne=16 --pool plapSadowoadm=8 --pool plapKonstytucja=12 --pool plapUstroj=8`
-> `letters {'A': 49, 'B': 51, 'C': 46, 'D': 54}  avg option 21 chars  key-longest 17%  key>1.2x 16%  PASS`
Also clean: `check_answer_patterns.py` (no answer patterns), `check_option_reuse.py` (0 shared
sets, echo gain 0.6 per 50), `check_option_refs.py --list` (0), `check_stem_length.py` (median
11 words), `check_sources.py plaplik` (25 primary pages).

## Shape

The real exam (art. 75a to 75j Prawa o adwokaturze, Dz. U. z 2024 r. poz. 1564 ze zm.; checked
2026-11-21) is one paper for both apprenticeships: 150 single-answer questions with three
options (A, B, C), 1 point each, at least 100 points to pass, no aids; 150 minutes according to
the Ministry of Justice (2025); held once a year (27 September 2025, 26 September 2026); questions drawn from the
yearly list of statutes (wykaz, 52 acts for 2026, announced 2 April 2026); answers judged on the
law in force on the exam day. Tigertest models it at a third of the length and the same pace and
line: four 50-question tests (200 items, pools exactly 4x each per-test count, every item in one
test), `passPct: 67` = ceil(0.67 x 50) = 34 of 50 (two thirds, as 100 of 150). Our items have
four options (v1 engine); the landing says so. Training: five topic sets 45601-45605 (36, 28, 56,
36, 44; all at most 60, so no parts); 5 sets + 4 tests = 9 dashboard steps. Set ids share
numbers with test ids 45601-45604 like other topic-set exams.

## lib/exams.ts

Add `"plaplik"` to the `ExamId` union. Icon `book` already exists. 45600 was assigned by the
brief; 45601-45605 are free (checked `lib/exams.ts` and `lib/v2`).

```ts
const plaplik: ExamConfig = {
  id: "plaplik",
  stateCode: "PLAPLIK",
  idBase: 45600,
  slug: "/poland-legal-apprenticeship-exam",
  landingPath: "/pl/egzamin-na-aplikacje",
  name: "Egzamin na aplikację adwokacką i radcowską",
  shortName: "Egzamin na aplikację",
  examLabel: "Egzamin wstępny na aplikację",
  fullName: "Egzamin wstępny na aplikację adwokacką i radcowską",
  questionIdPrefix: "PLAPL-",
  icon: "book",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 67,
  language: "pl",
  locale: "pl-PL",
  english: {
    name: "Poland Legal Apprenticeship Entrance Exam (Advocate and Legal Adviser)",
    shortName: "Polish legal apprenticeship exam",
    fullName: "Polish entrance exam for the advocate and legal adviser apprenticeships (egzamin wstępny na aplikację adwokacką i radcowską), in Polish",
  },
  review: { pl: "model" },
  // Real exam (Prawo o adwokaturze art. 75a ust. 3 and 4, 75b ust. 6 and 7, 75h ust. 3, 75i;
  // ustawa o radcach prawnych; Ministry of Justice pages of 2025 and the 2026 wykaz of 2 April
  // 2026; checked 2026-11-21): one common paper for the advocate and legal adviser
  // apprenticeships, once a year; 150 single-answer questions with three options, 1 point each,
  // pass with 100; 150 minutes (Ministry figure, not in the statute); no aids; questions from
  // the yearly list of statutes (52 acts in 2026), answers judged on the law on exam day. The
  // 2026 bar reform (Dz. U. 2026 poz. 1290) changes the commissions from 2027, not the test.
  // Categories follow the areas of art. 75a ust. 3; the Ministry publishes no weights, so the
  // 7/2/7/6/6/2/4/5/4/2/3/2 split is Tigertest's. Four tests of 50 at the real pace (a third of
  // the paper), pools exactly 4x; four options instead of three; passPct 67 = 34 of 50, the
  // real two-thirds line. EU treaty law is on the list but not modelled. All items original.
  blueprint: {
    plapCywilne: 7,
    plapRodzinne: 2,
    plapCywProc: 7,
    plapKarne: 6,
    plapKarProc: 6,
    plapWykroczenia: 2,
    plapPraca: 4,
    plapGospodarcze: 5,
    plapAdministracyjne: 4,
    plapSadowoadm: 2,
    plapKonstytucja: 3,
    plapUstroj: 2,
  },
  // Five topic sets, not testSets(): 5 + 4 tests = 9 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 45601, name: "Prawo cywilne i rodzinne", categories: ["plapCywilne", "plapRodzinne"], size: 36, weightLabel: "9 z 50 pytań w teście" },
    { setNumber: 2, id: 45602, name: "Postępowanie cywilne", categories: ["plapCywProc"], size: 28, weightLabel: "7 z 50 pytań w teście" },
    { setNumber: 3, id: 45603, name: "Prawo karne, procedura i wykroczenia", categories: ["plapKarne", "plapKarProc", "plapWykroczenia"], size: 56, weightLabel: "14 z 50 pytań w teście" },
    { setNumber: 4, id: 45604, name: "Prawo pracy i prawo spółek", categories: ["plapPraca", "plapGospodarcze"], size: 36, weightLabel: "9 z 50 pytań w teście" },
    { setNumber: 5, id: 45605, name: "Prawo administracyjne i ustrojowe", categories: ["plapAdministracyjne", "plapSadowoadm", "plapKonstytucja", "plapUstroj"], size: 44, weightLabel: "11 z 50 pytań w teście" },
  ],
  categoryLabels: {
    plapCywilne: "Prawo cywilne",
    plapRodzinne: "Prawo rodzinne i opiekuńcze",
    plapCywProc: "Postępowanie cywilne",
    plapKarne: "Prawo karne i karne skarbowe",
    plapKarProc: "Postępowanie karne",
    plapWykroczenia: "Prawo wykroczeń",
    plapPraca: "Prawo pracy",
    plapGospodarcze: "Prawo spółek i gospodarcze",
    plapAdministracyjne: "Postępowanie administracyjne i samorząd",
    plapSadowoadm: "Postępowanie sądowoadministracyjne",
    plapKonstytucja: "Prawo konstytucyjne",
    plapUstroj: "Ustrój sądów i samorządy zawodowe",
  },
  copy: {
    guestPrompt: "aby zapisywać postępy przed egzaminem na aplikację i wracać do każdej błędnej odpowiedzi",
    trainingHeading: "Zestawy ćwiczeń",
    trainingSub: "Każdy zestaw obejmuje dział z wykazu aktów prawnych. Od razu widzisz, czy odpowiedź jest dobra, a pytania, w których się mylisz, wracają, aż je opanujesz.",
    testsHeading: "Testy · 50 pytań, 34 do zaliczenia",
    heroSubs: [
      "Pięć zestawów i cztery testy po 50 pytań. Zacznij od prawa cywilnego i rodzinnego.",
      "Najpierw opanuj zestaw, potem zrób test.",
      "Zrób teraz pełny test: 50 pytań w 50 minut.",
      "Powtórz błędy i zrób test jeszcze raz.",
      "Wszystko na zielono. Sprawdź termin egzaminu w ogłoszeniu Ministra.",
    ],
    sourceLine: "Na podstawie ustaw z wykazu aktów prawnych na 2026 r., w brzmieniu z listopada 2026 r. Własne pytania, nie z arkuszy egzaminacyjnych; 50 pytań w teście i 34 do zaliczenia, jak 100 ze 150 na egzaminie. Cztery odpowiedzi zamiast trzech.",
    analyticsKey: "plaplik",
  },
};
```

Append `plaplik` to the `EXAMS` array with the other professional law exams (after
`espolicia`, or after the Polish driving test once `plteoria` is wired). ID header comment if
wanted: ` *   PLAPLIK 45600s (tests 45601-45604, sets 45601-45605)`.
The set names are Polish topic names, so `TEST_SET_NAMES.pl` is not used for this exam.

## lib/banks/all.ts

```ts
import "./plaplik";
```

## types/index.ts

- `QuestionType`: add `| "PLAPLIK"`.
- `QuestionCategory`, under a `// Polish legal apprenticeship entrance exam (aplikacja adwokacka i radcowska)` comment:

```ts
  | "plapCywilne"
  | "plapRodzinne"
  | "plapCywProc"
  | "plapKarne"
  | "plapKarProc"
  | "plapWykroczenia"
  | "plapPraca"
  | "plapGospodarcze"
  | "plapAdministracyjne"
  | "plapSadowoadm"
  | "plapKonstytucja"
  | "plapUstroj"
```

(`plap` is not used by any other key in `types/index.ts`; checked.)

## i18n

Results and stats read `exam.categoryLabels` first, so nothing is needed for Polish. If a
dictionary still needs the keys, `i18n/en.ts` (others fall back to English):

```ts
    plapCywilne: "Civil Law",
    plapRodzinne: "Family & Guardianship Law",
    plapCywProc: "Civil Procedure",
    plapKarne: "Criminal & Fiscal Criminal Law",
    plapKarProc: "Criminal Procedure",
    plapWykroczenia: "Petty Offences",
    plapPraca: "Labour Law",
    plapGospodarcze: "Company & Commercial Law",
    plapAdministracyjne: "Administrative Procedure & Local Government",
    plapSadowoadm: "Administrative Court Procedure",
    plapKonstytucja: "Constitutional Law",
    plapUstroj: "Courts & the Legal Professions",
```

## lib/shuffleOptions.ts

No position-dependent Polish options ("A i B", "A lub B", "Obie", "Wszystkie odpowiedzi"); the
build asserts it. Options joined by "i" inside one answer ("Rada gminy i wójt", "Rejonowe,
okręgowe i apelacyjne") name things, never letters.

## app/globals.css

The suggested `222 55% 32%` clashes with `phcse` (221 50% 30%), the UK driving themes (222 62%
38%), `boating` (215 65% 32%) and `psat` (230 50% 28%). Scanned every light `[data-theme]`
block (499) with the rule (within 8 degrees: 15 points of saturation or 8 of lightness): the
whole 212 to 235 band is full for saturation 20% and up, lightness 16% and up. Free and close
to the navy of a court: `255 100% 22%` (deep indigo; white text about 14:1). Alternative with a
meaning: `134 100% 20%` (the dark green of the advocate's robe trim, "wypustka w kolorze ciemnej
zieleni"; white text about 9:1). Both are clear today; the integrator settles clashes with the
Polish siblings. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Polish legal apprenticeship entrance exam (aplikacja adwokacka i radcowska) theme */
  [data-theme="plaplik"] {
    --brand: 255 100% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 255 80% 97%;
    --brand-hover: 255 100% 17%;
    --brand-dark: 255 100% 13%;
    --brand-darker: 255 100% 9%;
    --brand-muted: 255 40% 70%;
    --brand-border: 255 45% 82%;
    --brand-border-light: 255 45% 91%;
    --brand-gradient-to: 0 0% 98%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `plaplik: "Four 50-question mock tests in Polish for the Polish entrance exam to the advocate and legal adviser apprenticeships (aplikacja adwokacka i radcowska), 34 to pass like the real two-thirds line: civil law and procedure, criminal law and procedure, petty offences, labour, company, administrative and constitutional law, written from the statutes on the 2026 list.",`
- `EXAM_ORG`: `plaplik: "Polish Ministry of Justice · aplikacja adwokacka i radcowska entrance exam, in Polish",`
- Hub group (the brief: a Poland group for the non-driving tests, after Poland's driving
  group; if `plteoria` joins "EU driving theory tests", put this right after that group, or
  after a "Poland driving tests" group if one is made):
  `{ title: "Poland professional and licensing exams", ids: ["plaplik", "pllek", "plbron"] },`
  (add `plcpc` here only if it is not placed with the driving tests; drop ids that are not wired)
  with `RELATED_OVERRIDES`: `plaplik: ["pllek", "plbron", "plteoria", "espolicia"],`
- `SEARCH_ALIASES` (Polish, with and without diacritics, and English):
  `plaplik: "aplikacja adwokacka aplikacja radcowska egzamin na aplikację egzamin na aplikacje egzamin wstępny na aplikację egzamin wstepny na aplikacje testy na aplikacje test na aplikację adwokacką test na aplikacje radcowska aplikacje prawnicze egzamin na aplikacje prawnicze 2026 wykaz aktów prawnych testy prawnicze kodeks cywilny kpc kodeks karny kpk kodeks pracy ksh kpa adwokat radca prawny aplikant polish bar exam poland legal apprenticeship exam polish legal adviser exam advocate entrance exam poland warszawa kraków wrocław poznań gdańsk łódź",`
- Native name on Polish surfaces, `english.name` elsewhere (the platform's language field).

## lib/region.ts (new region PL, shared by the five Polish builds; apply once)

- `Region` union: add `| "PL"`.
- `REGIONS`: `{ code: "PL", name: "Poland", short: "PL", inName: "Poland", lang: "pl", locale: "pl-PL" },`
- `regionFromCountry`: `case "PL": return "PL";`
- `REGION_HREFLANG` derives from `REGIONS` (`pl-PL`).
- `TEST_REGIONS`: `plaplik: "PL",` (with the siblings: `plteoria: "PL", pllek: "PL", plbron: "PL", plcpc: "PL",`).
- `NON_DRIVING_TESTS`: add `"plaplik",` (next to `"pllek", "plbron"`).
- `REGION_HOME.PL`, written in Polish (REGIONS[].lang). If `plteoria`'s WIRING carries its own
  block, keep that one and add the `testsSub` sentence on the apprenticeship exam:

```ts
  // Written in Polish (REGIONS[].lang). The CTA shows once plteoria is in the catalog.
  PL: {
    title: "Bezpłatne testy online: prawo jazdy, aplikacje i egzaminy zawodowe | Tigertest",
    description: "Ćwicz za darmo do polskich egzaminów: egzamin teoretyczny na prawo jazdy kategorii B i egzamin wstępny na aplikację adwokacką i radcowską. Własne pytania, każda odpowiedź wyjaśniona. Bez rejestracji.",
    lead: "Ćwicz do egzaminu teoretycznego na prawo jazdy i do egzaminu wstępnego na aplikację adwokacką i radcowską. Własne pytania z polskich przepisów, każda odpowiedź wyjaśniona. Bez rejestracji.",
    cta: { label: "Egzamin teoretyczny na prawo jazdy", href: "/pl/egzamin-teoretyczny-prawo-jazdy" },
    testsTitle: "Testy dla Polski",
    testsSub: "Egzamin teoretyczny na prawo jazdy kategorii B według Prawa o ruchu drogowym. Dla prawników egzamin wstępny na aplikację adwokacką i radcowską: 200 pytań z ustaw z wykazu na 2026 r., cztery testy po 50 pytań i 34 do zaliczenia.",
  },
```

(Use `{ label: "Test na aplikację", href: "/pl/egzamin-na-aplikacje" }` as the CTA if the
driving test is not wired.)

## components/home/HomePage.tsx (`AUTHORITY`, used by `faqsFor`)

```ts
  PL: "the Ministry of Justice, WORD centres or other Polish authorities",
```
and the Polish-language variant:
```ts
const AUTHORITY_PL_PL = "Ministerstwem Sprawiedliwości, ośrodkami WORD lub innymi polskimi urzędami";
  if (region === "PL" && lang === "pl") return AUTHORITY_PL_PL;
```
(instrumental case, for the sentence in `components/home/copy/pl.ts`: "nie jest powiązany z
${authority} ani z żadną firmą egzaminacyjną".)

## app/pl/page.tsx (new, copy of app/de/page.tsx; shared, apply once)

```tsx
import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Poland homepage (lib/region.ts), in Polish (REGIONS[].lang). A first visit to "/" from
// Poland lands here. Until Poland's first test is in the catalog it lists the worldwide tests.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("PL");

export default function HomePL() {
  return <HomePage region="PL" />;
}
```

Plus the middleware country mapping (PL to /pl), sitemap and `llms.txt` lines as for DE, and in
`components/exam/TranslatedExamLanding.tsx` the `CURRENCY` table: `PL: "PLN",`.

## app/pl/layout.tsx (shared, apply once)

```tsx
// Every page under /pl is Polish: Polish exam landings and the Poland homepage.
export default function PolishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="pl">{children}</div>;
}
```

## lib/landingContent.ts

```ts
import plaplikPl from "@/lib/landings/plaplik.pl.json";
  "plaplik.pl": plaplikPl as TranslatedLandingContent,
```

`TranslatedExamLanding` uses the base `landingPath` when `lang === exam.language`.

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  plaplik: {
    answer:
      "The entrance exam for the advocate (aplikacja adwokacka) and legal adviser (aplikacja radcowska) apprenticeships in Poland is one common written test held once a year on a date set by the Minister of Justice (26 September 2026). It has 150 single-answer questions, each with three proposed answers (A, B or C) of which only one is correct; the answer is marked on an answer sheet and cannot be changed. Each correct answer scores 1 point, and you pass with at least 100 points. According to the Ministry of Justice the time allowed is 150 minutes. No statute texts, commentaries or devices may be used. A team appointed each year by the Minister writes the questions from a list of statutes announced at least 90 days before the exam (52 acts for 2026, announced on 2 April 2026, including the Constitution, the civil, criminal, labour, company and administrative codes and procedures), and answers are judged on the law in force on the exam day. The exam is in Polish.",
    rows: [
      { label: "Run by", value: "Polish Ministry of Justice, examination commissions" },
      { label: "Questions", value: "150 single answer, three options each" },
      { label: "Scoring", value: "1 point per correct answer, no negative marking" },
      { label: "Pass mark", value: "At least 100 of 150 points" },
      { label: "Time", value: "150 minutes (Ministry of Justice)" },
      { label: "Scope", value: "Yearly list of statutes (52 acts in 2026)" },
      { label: "When", value: "Once a year (26 September in 2026)" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Polish, 34 to pass" },
    ],
    basedOn: "Articles 75a to 75j of the Prawo o adwokaturze (Journal of Laws 2024 item 1564 as amended), the Act on Legal Advisers, the Ministry of Justice's 2026 list of statutes (2 April 2026) its 2026 exam announcement (27 April 2026) and its 2025 exam information, checked November 2026",
    source: { name: "Polish Ministry of Justice: list of statutes for the 2026 advocate and legal adviser entrance exam (in Polish)", url: "https://www.gov.pl/web/sprawiedliwosc/ogloszenie-w-sprawie-wykazu-tytulow-aktow-prawnych-na-egzamin-wstepny-na-aplikacje-adwokacka-i-radcowska-w-2026-r" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Polish)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date, and `lib/landingDates.json` via
`scripts/build-landing-dates.ts`.

## lib/tigerAssets.ts

Borrow the LSAT tiger (law school), in `BORROWED_SETS`: `plaplik: "lsat",`.

## Teacher-led lists

Add `"plaplik"` to `TEACHER_LED` (`components/TeachNudge.tsx`) and the `ExamClassFaq` list:
candidates commonly prepare on courses run by universities, student law societies and the
bar and legal adviser chambers, so an instructor would set it for a class.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the `/pl/egzamin-na-aplikacje` landing is emitted once,
hreflang `pl-PL`, x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 28 to 56, so no parts.

## Question quality hooks

Run `python3 -I tools/build_exam_sources.py` (the first https URLs of `sources.md` are the Sejm
ELI text of the Prawo o adwokaturze and gov.pl). Freshness events for `lib/examFreshness.json`:
the yearly wykaz aktów prawnych (announced 2 April in 2026; the next one, for 2027, is due at
least 90 days before the 2027 exam): re-check every key against the codes as consolidated on the
new list's date, and the 2027 commission change from Dz. U. 2026 poz. 1290 (in force
01.01.2027; no effect on the test format). The KSH amendments Dz. U. 2026 poz. 1440 (in force
03.12.2026) and poz. 176 (in force 18.02.2027) do not touch the articles used.

## Screenshots

`TranslatedExamLanding` reads `/landing/plaplik-{mobile,desktop}-pl.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing plaplik:poland-legal-apprenticeship-exam:45601`
then rename the two files to the `-pl` names.

## docs/exams/plaplik.md (new notes file)

```md
# plaplik: Egzamin wstępny na aplikację adwokacką i radcowską (Poland)

- What: the Polish entrance exam for the advocate and legal adviser apprenticeships, one common
  paper set by the Ministry of Justice's question team (art. 75b Prawo o adwokaturze). Native
  Polish exam, `language: "pl"`, `review: { pl: "model" }`.
- Real format (checked 2026-11-21): 150 single-answer questions, three options, 1 point each,
  100 to pass (art. 75i); 150 minutes per the Ministry (2025); no aids (art. 75h ust. 3); once a
  year (27 September 2025, 26 September 2026); scope is the yearly wykaz aktów prawnych (52 acts, 2 April 2026);
  answers judged on the law on exam day.
- Tigertest: `data/pl-aplikacje-questions.json`, 200 items in 12 categories (civil 28, family 8,
  civil procedure 28, criminal and fiscal criminal 24, criminal procedure 24, petty offences 8,
  labour 16, company and commercial 20, administrative procedure and local government 16,
  administrative courts 8, constitutional 12, courts and legal professions 8); four 50-question
  tests 45601-45604 (7/2/7/6/6/2/4/5/4/2/3/2), five topic sets 45601-45605, 9 steps; passPct 67
  (34 of 50). Four options instead of three.
- IDs: idBase 45600, state `PLAPLIK`, prefix `PLAPL-`, segments CYW ROD KPC KAR KPK WYK PRA GOS
  ADM PSA KON UST.
- Routes: app `/poland-legal-apprenticeship-exam/*`, landing `/pl/egzamin-na-aplikacje`
  (`lib/landings/plaplik.pl.json`).
- Sources: `tools/next100/plaplik/sources.md` (Sejm ELI consolidated texts and amendments,
  gov.pl); terms: `tools/next100/plaplik/glossary.md`. Build: `python3 -I tools/next100/plaplik/build.py`.
- Theme `[data-theme="plaplik"]` deep indigo `255 100% 22%`; borrows the LSAT tiger. Region PL,
  hub group "Poland professional and licensing exams"; teacher-led.
- Not modelled: three-option format, EU treaty law (on the list), the notary and bailiff
  entrance exams held the same day, the 2027 commission changes (no effect on the test).
- Upkeep: each spring the new wykaz; re-check keys against the codes in force on the exam day.
```

## CLAUDE.md (a "Native-language exams" bullet, after espolicia)

```md
- **Egzamin na aplikację** (`plaplik`, the Polish entrance exam for the advocate and legal adviser apprenticeships, native Polish exam, `language: "pl"`, `locale: "pl-PL"`, `review: { pl: "model" }`, `/poland-legal-apprenticeship-exam/*`, landing `/pl/egzamin-na-aplikacje` from `lib/landings/plaplik.pl.json`): `data/pl-aplikacje-questions.json` (200 original questions written directly in Polish from the statutes on the Ministry of Justice's 2026 wykaz aktów prawnych, as consolidated in November 2026: Kodeks cywilny 28, KRO 8, KPC 28, KK and KKS 24, KPK 24, KW and KPW 8, Kodeks pracy 16, KSH, Prawo upadłościowe, Prawo przedsiębiorców and Prawo wekslowe 20, KPA and samorząd gminny 16, PPSA 8, Konstytucja 12, USP, Prawo o adwokaturze and radcowie prawni 8), four 50-question tests (IDs 45601-45604, 7/2/7/6/6/2/4/5/4/2/3/2 per test, no spares) and five Polish-named topic sets 45601-45605 (36/28/56/36/44), 9 dashboard steps, state `PLAPLIK`, prefix `PLAPL-`, 67% pass (34 of 50, the real two-thirds line). The real exam (art. 75a to 75j Prawa o adwokaturze) is one paper for both apprenticeships: 150 single-answer questions with three options, 1 point each, 100 to pass, 150 minutes per the Ministry, no aids, once a year, answers judged on the law on exam day; ours have four options and a third of the length. EU treaty law and the notary and bailiff exams are not modelled. No fees, no provisions changed or pending in 2026 (bar commissions, KSH share reforms, KP equal treatment), no officeholders. English names in `english`. Built by `tools/next100/plaplik/build.py`; sources in `tools/next100/plaplik/sources.md`, terms in `glossary.md`. Region PL, hub group "Poland professional and licensing exams", `[data-theme="plaplik"]` deep indigo, borrows the LSAT tiger, teacher-led.
```

## Decisions for the integrator

1. **Length.** The real paper is 150 questions in 150 minutes; modelled as four tests of 50 at
   the same pace (one minute a question) with the same two-thirds line, said on the landing.
2. **Options.** Real items have three options (A, B, C); the v1 engine needs four, so ours have
   four. Said in the landing topics block, the FAQ and `sourceLine`.
3. **Time limit.** 150 minutes is the Ministry's 2025 figure, not in the statute; the copy says
   "według Ministerstwa Sprawiedliwości". The 2026 date (26 September 2026) was confirmed by the reviewer
   on gov.pl (announcement of 27.04.2026); the copy says "once a year (26 September in 2026)".
4. **Hue.** `255 100% 22%` instead of the suggested `222 55% 32%` (the 212 to 235 band is full);
   alternative `134 100% 20%` (robe green). Settle with the four Polish siblings.
5. **Region PL** is new and shared: apply the region, homepage, layout, middleware and currency
   lines once for all five Polish builds; `REGION_HOME.PL` above assumes `plteoria` is the CTA.
6. **Weights.** The Ministry publishes no split per act; the per-test counts are Tigertest's,
   leaning on the large codes as the real papers do. EU law is left out on purpose.
7. **Register.** Questions and explanations impersonal, statute style; landing and dashboard
   copy "Ty".
8. **Lane.** No overlap with the Polish siblings (driving, medical, firearms, CPC): this bank
   uses no road traffic, firearms or medical law. Kodeks wykroczeń items avoid traffic offences.
