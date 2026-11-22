# Wiring for `plcpc` (Poland Driver CPC Initial Qualification Test, kwalifikacja wstępna, trucks and buses; PL, v1, English base with a Polish translation)

Files already written by the builder:
- `data/poland-driver-cpc-questions.json` (200, `validate_bank.py` PASS, key strictly longest 9%; reviewed 2026-11-22, 35 items rewritten, see sources.md)
- `data/poland-driver-cpc-questions_pl.json` (200, same ids, order, categories, keys and option
  order; `validate_translation.py --lang pl` PASS and `validate_bank.py --lang pl` PASS, key
  longest 14%)
- `lib/banks/plcpc.ts` (registers the English bank and the `pl` translation)
- `lib/examTranslations/plcpc.pl.json`, `lib/landings/plcpc.pl.json`
- `app/poland-driver-cpc/*` (5 wrappers copied from `app/malta-driver-cpc/`: layout, redirect,
  dashboard, drill, stats; no test or practice folders)
- `app/poland-driver-cpc-practice-test/page.tsx` (English landing)
- `app/pl/kwalifikacja-wstepna-test/page.tsx` (three-line `TranslatedExamLanding` wrapper)
- `tools/next100/plcpc/*` (spec, sources, glossary, `q_*.py`, `build.py`, `pl/t_*.py`,
  `pl/build.py`, this file)

Rebuild: `python3 -I tools/next100/plcpc/build.py` then `python3 -I tools/next100/plcpc/pl/build.py`.
Everything below goes in shared files.

Format note (official, Dz.U. 2026 poz. 1355 par. 32, in force 2026-11-03; it replaced Dz.U. 2022
poz. 739): 30 questions in 45 minutes, a basic part of 20 (2 or 3 from each of nine annex 1
sections) and a specialist part of 10 for the truck (C) or bus (D) block; one correct answer each;
pass with at least 16 of 20 basic and 5 of 10 specialist. Modelled as four 50-question tests with
34 basic questions plus 8 truck-block and 8 bus-block questions in every test, passPct 70
(35 of 50, the same share as 21 of 30). Five topic training sets (the truck and bus blocks get one
set each) + 4 tests = 9 dashboard steps. Pools are exactly 4x the per-test counts.

## lib/exams.ts

Add `"plcpc"` to the `ExamId` union. Icon `truck` already exists.

Import with the other translation JSONs (top of file):

```ts
import plcpcPl from "./examTranslations/plcpc.pl.json";
```

Block (with the EU driving tests, after `plteoria`):

```ts
const plcpc: ExamConfig = {
  id: "plcpc",
  stateCode: "PLCPC",
  idBase: 45900,
  slug: "/poland-driver-cpc",
  landingPath: "/poland-driver-cpc-practice-test",
  name: "Poland Driver CPC Qualification Test Practice",
  shortName: "Driver CPC (Poland)",
  examLabel: "Driver CPC qualification test",
  fullName: "Poland Driver CPC Initial Qualification Test (kwalifikacja wstępna, trucks and buses)",
  questionIdPrefix: "PLCPC-",
  icon: "truck",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Source: Rozporządzenie Ministra Infrastruktury z dnia 7 października 2026 r. w sprawie
  // szkolenia i egzaminowania kierowców wykonujących przewóz drogowy (Dz.U. 2026 poz. 1355, in
  // force 2026-11-03, replacing Dz.U. 2022 poz. 739), par. 32 and annex 1, read 2026-11-21: the
  // test after initial or accelerated qualification has a basic part of 20 questions (2 or 3 from
  // each of sections 1.1, 1.2, 2.1, 3.1-3.6) and a specialist part of 10 for the truck block
  // (1.3, 1.4, 1.5, 2.2, 3.7) or the bus block (1.4-1.7, 2.3, 3.8), 45 minutes, pass with 16/20
  // and 5/10. Modelled at 50 questions with both blocks in every test: 34 basic, 8 truck, 8 bus
  // (Tigertest's weights within the par. 32 shares). 70% = 35/50 = the share of 21/30. Rules from
  // the Road Transport Act, Road Traffic Act, Drivers' Working Time Act and EU law as in force
  // November 2026. All items original.
  blueprint: {
    plcpcEco: 4,
    plcpcBrakes: 4,
    plcpcHours: 6,
    plcpcTacho: 4,
    plcpcSafety: 4,
    plcpcCrime: 2,
    plcpcHealth: 3,
    plcpcEmergency: 4,
    plcpcImage: 3,
    plcpcLoads: 4,
    plcpcFreight: 4,
    plcpcPassengers: 4,
    plcpcPassRules: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 45901, name: "Rational Driving, Brakes & Tachographs", categories: ["plcpcEco", "plcpcBrakes", "plcpcTacho"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 2, id: 45902, name: "Drivers' Hours & Qualification Rules", categories: ["plcpcHours", "plcpcImage"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 3, id: 45903, name: "Road Risk, Health & Emergencies", categories: ["plcpcSafety", "plcpcCrime", "plcpcHealth", "plcpcEmergency"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 4, id: 45904, name: "Truck Block (C): Loads & Goods Rules", categories: ["plcpcLoads", "plcpcFreight"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 5, id: 45905, name: "Bus Block (D): Passengers & Passenger Rules", categories: ["plcpcPassengers", "plcpcPassRules"], size: 32, weightLabel: "8 of 50 test questions" },
  ],
  categoryLabels: {
    plcpcEco: "Rational Driving & Fuel Economy",
    plcpcBrakes: "Brakes, Retarders & Driver Assistance",
    plcpcHours: "Drivers' Hours & Working Time",
    plcpcTacho: "Tachographs & Records",
    plcpcSafety: "Road & Workplace Risk",
    plcpcCrime: "Crime & Smuggling of People",
    plcpcHealth: "Health, Fatigue, Alcohol & Drugs",
    plcpcEmergency: "Emergencies, First Aid & Fire",
    plcpcImage: "Qualification, Service & Company Image",
    plcpcLoads: "Freight (C): Loading & Load Securing",
    plcpcFreight: "Freight (C): Goods Carriage Rules & Market",
    plcpcPassengers: "Passengers (D): Comfort, Safety & Bus Loading",
    plcpcPassRules: "Passengers (D): Passenger Rules & Market",
  },
  copy: {
    guestPrompt: "to save your qualification test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets: three for the basic part everyone sits, one for the truck (C) block and one for the bus (D) block. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, aim for 35 or more",
    heroSubs: [
      "Five topics, four 50-question tests. Start with Rational Driving, Brakes & Tachographs.",
      "Master each set, then take a practice test.",
      "Keep going. Take a practice test to see where you stand.",
      "Review your mistakes, then retake any test you haven't passed.",
      "All done. Book your qualification test at your WORD.",
    ],
    sourceLine: "Original questions written from Polish and EU rules for professional truck and bus drivers (2026). The real test is 30 questions; 50 per test here, 70% is Tigertest's target. Not affiliated with any WORD.",
    analyticsKey: "plcpc",
  },
  review: { pl: "machine" },
  translations: {
    pl: examTranslation(plcpcPl),
  },
};
```

Append `plcpc` to the `EXAMS` array right after `plteoria`.

Check: 45901-45905 must be free (grepped 2026-11-21: no `idBase: 459xx` in `lib/exams.ts` or any
`tools/next100/*/WIRING.md`; `plteoria` uses 45501-45506).

## lib/banks/all.ts

```ts
import "./plcpc";
```

## lib/examData.ts

Nothing: the bank module registers both banks (`registerExamBanks({ plcpc }, { plcpc: { pl } })`).

## types/index.ts

- `QuestionType`: add `| "PLCPC"`.
- `QuestionCategory`, under a `// Poland Driver CPC qualification test` comment:

```ts
  | "plcpcEco"
  | "plcpcBrakes"
  | "plcpcHours"
  | "plcpcTacho"
  | "plcpcSafety"
  | "plcpcCrime"
  | "plcpcHealth"
  | "plcpcEmergency"
  | "plcpcImage"
  | "plcpcLoads"
  | "plcpcFreight"
  | "plcpcPassengers"
  | "plcpcPassRules"
```

(Grepped: no existing key starts with `plcpc`.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels; the newer UI languages fall back)

```ts
    plcpcEco: "Rational Driving & Fuel Economy",
    plcpcBrakes: "Brakes, Retarders & Driver Assistance",
    plcpcHours: "Drivers' Hours & Working Time",
    plcpcTacho: "Tachographs & Records",
    plcpcSafety: "Road & Workplace Risk",
    plcpcCrime: "Crime & Smuggling of People",
    plcpcHealth: "Health, Fatigue, Alcohol & Drugs",
    plcpcEmergency: "Emergencies, First Aid & Fire",
    plcpcImage: "Qualification, Service & Company Image",
    plcpcLoads: "Freight (C): Loading & Load Securing",
    plcpcFreight: "Freight (C): Goods Carriage Rules & Market",
    plcpcPassengers: "Passengers (D): Comfort, Safety & Bus Loading",
    plcpcPassRules: "Passengers (D): Passenger Rules & Market",
```

## i18n/pl.ts (if its `categories` block is read by results pages)

```ts
    plcpcEco: "Racjonalna jazda i zużycie paliwa",
    plcpcBrakes: "Hamulce, zwalniacze i systemy wspomagania",
    plcpcHours: "Czas jazdy i czas pracy",
    plcpcTacho: "Tachografy i zapisy",
    plcpcSafety: "Zagrożenia na drodze i w pracy",
    plcpcCrime: "Przestępczość i przemyt ludzi",
    plcpcHealth: "Zdrowie, zmęczenie, alkohol i leki",
    plcpcEmergency: "Sytuacje awaryjne, pierwsza pomoc i pożar",
    plcpcImage: "Kwalifikacje, obsługa i wizerunek firmy",
    plcpcLoads: "Blok C: załadunek i mocowanie ładunku",
    plcpcFreight: "Blok C: przepisy o przewozie rzeczy i rynek",
    plcpcPassengers: "Blok D: komfort, bezpieczeństwo i obciążenie autobusu",
    plcpcPassRules: "Blok D: przepisy o przewozie osób i rynek",
```

## Translation, landing and SEO

- `review: { pl: "machine" }` and `translations.pl` on the config (above). The JSON carries
  `"locale": "pl-PL"` and `"landingPath": "/pl/kwalifikacja-wstepna-test"` and Polish names for
  the five topic sets (no set over 60, so no `partNames`).
- `lib/landingContent.ts`:

  ```ts
  import plcpcPl from "@/lib/landings/plcpc.pl.json";
  // in LANDINGS:
    "plcpc.pl": plcpcPl as TranslatedLandingContent,
  ```

- The Polish landing `/pl/kwalifikacja-wstepna-test` should be x-default for this exam (written for
  the exam's own country): `examLandingAlternates("plcpc")` does it once `translations.pl`
  (locale `pl-PL`) is wired and the region resolves to `PL`. Add reciprocal hreflang on the
  English landing `app/poland-driver-cpc-practice-test/page.tsx`:

  ```ts
  import { examLandingAlternates } from "@/lib/examSeo";
  // in metadata.alternates:
    alternates: {
      canonical: `${siteUrl}/poland-driver-cpc-practice-test`,
      languages: examLandingAlternates("plcpc"),
    },
  ```

- `components/exam/TranslatedExamLanding.tsx` `CURRENCY`: `PL: "PLN",` (also asked for by
  plteoria and plaplik; add once). The English landing already passes `examOffers("plcpc", "PLN")`.
- Screenshots: `public/landing/plcpc-mobile.png`, `plcpc-desktop.png` (English) and
  `plcpc-mobile-pl.png`, `plcpc-desktop-pl.png` (Polish).
- Ukrainian (`uk`) was asked for in the research note but `uk` is not a site `Language`
  (`i18n/index.ts`), so no Ukrainian bank was written. Add it once a Ukrainian UI exists.

## app/globals.css

The suggested `205 70% 30%` clashes with `series7` (205 70% 32%) and `sie` (204 60% 28%); every
blue from 180 to 235 at usable saturation is taken (script over `app/globals.css` and every
pending `tools/**/WIRING*.md`, 1,004 brands, rule: within 8 degrees, differ by 15 points of
saturation or 8 of lightness, white text 4.5:1). Free and passing: `266 100% 22%` (deep indigo,
white text contrast about 13:1). The integrator may settle another; then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Poland Driver CPC qualification test theme */
  [data-theme="plcpc"] {
    --brand: 266 100% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 266 60% 96%;
    --brand-hover: 266 100% 18%;
    --brand-dark: 266 100% 16%;
    --brand-darker: 266 90% 10%;
    --brand-muted: 266 30% 66%;
    --brand-border: 266 35% 80%;
    --brand-border-light: 266 30% 90%;
    --brand-gradient-to: 0 75% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `plcpc: "Poland's professional driver qualification test (kwalifikacja wstępna) at the WORD, for truck and bus drivers: EU drivers' hours and the Polish Working Time Act, tachographs, brakes, loads and CMR, passengers and bus rules, in English and Polish, in four 50-question tests.",`
- `EXAM_ORG`: `plcpc: "WORD exam centres (Poland) · qualification test after initial qualification (Dz.U. 2026 poz. 1355), trucks and buses",`
- Hub group: a licence category (professional driving), so it sits with Poland's driving test.
  Append `"plcpc"` right after `"plteoria"` in `"EU driving theory tests"` (where plteoria's
  WIRING puts it). If the integrator makes a `"Poland driving tests"` group instead, use
  `{ title: "Poland driving tests", ids: ["plteoria", "plcpc"] },`.
- `SEARCH_ALIASES` (English and Polish):
  `plcpc: "driver cpc poland poland cpc polish cpc test kwalifikacja wstepna test in english poland truck driver test bus driver poland code 95 poland professional driver poland word qualification test kwalifikacja wstępna kwalifikacja wstępna przyspieszona test kwalifikacyjny kierowcy zawodowego testy kwalifikacja wstępna pytania kwalifikacja wstępna kod 95 świadectwo kwalifikacji zawodowej kierowca zawodowy testy przewóz rzeczy przewóz osób kategoria c kategoria d czas pracy kierowców tachograf",`
- `RELATED_OVERRIDES`: `plcpc: ["plteoria", "hugki", "rocpi"],`

## lib/region.ts

`plcpc: "PL",` in `TEST_REGIONS` (plteoria's WIRING adds the `PL` region and its homepage). Not
in `NON_DRIVING_TESTS` (it is a driving test).

`faqsFor("PL")`, if it lists tests, add (in Polish, as REGION_HOME.PL is Polish):
"Czy jest test dla kierowców zawodowych? Tak. Kierowcy ciężarówek i autobusów zdają w WORD test
kwalifikacyjny po kwalifikacji wstępnej: 30 pytań w 45 minut. Tigertest ma bezpłatne testy
próbne po polsku i po angielsku."

## lib/examFacts.ts

```ts
  plcpc: {
    answer:
      "Every professional truck (C1, C, C+E) and bus (D1, D, D+E) driver in Poland needs an initial qualification (kwalifikacja wstępna) as well as the licence: a 280-hour course at an accredited training centre, or 140 hours for the accelerated version, ending in a computer-based qualification test at a voivodeship road traffic centre (WORD). Under the Minister of Infrastructure's regulation Dz.U. 2026 poz. 1355, in force from 3 November 2026, the test has 30 questions in 45 minutes: a basic part of 20 questions and a specialist part of 10 for the truck or bus block, one correct answer each. You pass with at least 16 correct in the basic part and 5 in the specialist part. The WORD director then issues the certificate of professional competence and code 95 goes on the licence; periodic training follows every five years.",
    rows: [
      { label: "Who needs it", value: "Drivers of trucks (C1, C, C+E) and buses (D1, D, D+E) for work" },
      { label: "Course", value: "280 hours, or 140 hours accelerated, at an accredited training centre" },
      { label: "Questions", value: "30: 20 basic and 10 specialist (truck or bus block)" },
      { label: "Pass mark", value: "At least 16 of 20 basic and 5 of 10 specialist" },
      { label: "Time", value: "45 minutes" },
      { label: "Language", value: "Polish; a WORD may offer another language, or bring a sworn translator" },
      { label: "Run by", value: "Voivodeship road traffic centre (WORD)" },
      { label: "After passing", value: "Certificate of professional competence, code 95; periodic training every 5 years" },
    ],
    basedOn: "Dz.U. 2026 poz. 1355 (regulation on training and examining drivers) and the Road Transport Act, checked November 2026",
    source: { name: "Dz.U. 2026 poz. 1355 (Sejm ELI)", url: "https://api.sejm.gov.pl/eli/acts/DU/2026/1355/text.pdf" },
  },
```
(No fees: house style avoids money. English, Ukrainian or Russian question sets are reported
only by trade press, so the row says "may offer another language".)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## TEACHER_LED / TEACHES (components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx)

Taught in classes (every candidate takes a 280- or 140-hour course at an accredited training
centre). The landing does not render `ExamClassFaq` (same as mtcpc). If the integrator lists it:
- `TEACHER_LED`: add `"plcpc"`.
- `TEACHES`: `plcpc: "initial qualification courses for professional drivers",`

## lib/tigerAssets.ts

Borrow the CDL tiger like `mtcpc`, `uklgv` and `iedttcv`: add `plcpc: "cdl",` to `BORROWED_SETS`.
The landing calls `getTigerAsset("plcpc", 3)`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, middleware.ts

Nothing: sitemaps map over `EXAMS` (the translation landing is picked up from
`translations.pl.landingPath`), class questions import `lib/banks/all`, no redirects. `/pl` is
already a language prefix for the sibling Polish landings in `app/pl/`.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: the `truck` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (sets are 32 to 52, so no parts), then
`npx tsx scripts/build-landing-dates.ts`.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing plcpc:poland-driver-cpc:45901`
(plus the `-pl` pair for the Polish landing, as for plteoria).

## llms.txt

`- Poland Driver CPC Qualification Test (trucks and buses, English and Polish): https://www.tigertest.io/poland-driver-cpc-practice-test`

## docs/exams/plcpc.md

```md
# plcpc: Poland Driver CPC Initial Qualification Test (test kwalifikacyjny, kwalifikacja wstępna)

- What it is: the computer-based qualification test at a WORD that ends the initial
  qualification (280 h) or accelerated initial qualification (140 h) every professional truck
  (C1, C1+E, C, C+E) and bus (D1, D1+E, D, D+E) driver in Poland needs. Pass gives the
  certificate of professional competence and code 95.
- Official format (Dz.U. 2026 poz. 1355 par. 32, in force 2026-11-03, replacing Dz.U. 2022 poz.
  739): 20 basic questions (2 or 3 from each of annex 1 sections 1.1, 1.2, 2.1, 3.1-3.6) and 10
  specialist questions for the truck block (1.3, 1.4, 1.5, 2.2, 3.7) or bus block (1.4-1.7, 2.3,
  3.8); 45 minutes; one correct answer; pass 16/20 and 5/10. Supplementary qualification: 10
  specialist questions in 15 minutes. Held in Polish; a WORD may provide another language, else
  a sworn translator.
- Model: v1, 4 tests x 50, 13 categories, 34 basic + 8 truck + 8 bus per test, passPct 70
  (35/50 = 21/30). Pools ECO 16, BRK 16, HRS 24, TAC 16, SAF 16, CRM 8, HLT 12, EMG 16, IMG 12,
  LOD 16, FRT 16, PSG 16, PRL 16. Five topic sets 45901-45905 (set 4 truck block, set 5 bus block),
  tests 45901-45904. State `PLCPC`, prefix `PLCPC-`.
- Languages: English base bank `data/poland-driver-cpc-questions.json`, Polish translation
  `data/poland-driver-cpc-questions_pl.json` (`translations.pl`, locale pl-PL, `review: { pl: "machine" }`),
  landings `/poland-driver-cpc-practice-test` and `/pl/kwalifikacja-wstepna-test` (x-default).
  No Ukrainian (not a site language yet).
- Law used: Road Transport Act (Dz.U. 2025 poz. 1490: art. 39a ages and conditions, 39c, 39d,
  39j), Road Traffic Act (Dz.U. 2024 poz. 1251: art. 19, 20, 23, 39, 44, 57, 58, 61, 63), Drivers'
  Working Time Act (Dz.U. 2026 poz. 477), Drivers Act art. 8-9, Tachographs Act, Reg 561/2006 with
  the Mobility Package, Reg 165/2014, Reg 1072/2009, Directive 2020/1057, Reg 1073/2009, Reg
  181/2011, CMR, ADR, ATP, TIR.
- Not modelled: the practical parts of the course, fees, retakes. No alcohol thresholds, triangle
  distances, emergency corridor or zipper items (plteoria's lane).
- Sources: `tools/next100/plcpc/sources.md`; terms: `glossary.md`. Build:
  `python3 -I tools/next100/plcpc/build.py` and `python3 -I tools/next100/plcpc/pl/build.py`.
- Theme `[data-theme="plcpc"]` deep indigo (266 100% 22%, the blue band is full), CDL tiger,
  region PL, hub group with plteoria.
```

## CLAUDE.md

No bullet: CLAUDE.md now keeps exam details in `docs/exams/<examId>.md` ("A new exam gets a new
file here, never a paragraph in this file"). If the integrator still keeps an Additional Exams
list, the house-shape line is:

```md
- **Poland Driver CPC Qualification Test** (`plcpc`, the WORD qualification test after initial qualification for professional truck and bus drivers, `/poland-driver-cpc/*`, landing `/poland-driver-cpc-practice-test`, Polish `/pl/kwalifikacja-wstepna-test`): `data/poland-driver-cpc-questions.json` + `_pl.json` (200 original questions, Dz.U. 2026 poz. 1355 annex 1: rational driving 16, brakes and assistance 16, hours and working time 24, tachographs 16, road and workplace risk 16, crime 8, health 12, emergencies 16, qualification and image 12, truck loads 16, goods rules 16, passengers 16, passenger rules 16), test IDs 45901-45904, sets 45901-45905 by topic, state `PLCPC`, prefix `PLCPC-`, 70% (real: 30 questions in 45 minutes, 16/20 basic and 5/10 specialist). Notes in `docs/exams/plcpc.md`.
```
