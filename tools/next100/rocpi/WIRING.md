# Wiring for `rocpi` (Romania ARR Driver CPC initial qualification, CPI goods and passengers; RO, v1)

Files already written by the builder: `data/romania-cpi-questions.json` (200, PASS),
`lib/banks/rocpi.ts`, `app/romania-driver-cpc/*` (5 wrappers copied from
`app/romania-driving-theory/`: layout, redirect, dashboard, drill, stats; no test or practice
folders), `app/romania-driver-cpc-practice-test/page.tsx`, `tools/next100/rocpi/*` (spec, sources,
`q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/rocpi/build.py` (writes the data file
and prints the key-longest share). Everything below goes in shared files.

Format note: under the Norms approved by Order 1214/2015 (Annex 2, art. 4), the CPI theory exam is
a 2-hour questionnaire of 100 questions (4 options, one correct, 70% to pass) plus a separate
2-hour paper of 6 case studies (70%), then a practical exam. Tigertest models the questionnaire
only, as four 50-question tests at the real pace and the real 70%: `passPct: 70`, 35 of 50.
DMV-style sets `testSets(25000, 4)` (size 50): dashboard 4 sets + 4 tests = 8 steps. Pools are
exactly 4x the per-test counts (no spares). One bank covers goods and passengers, like `iedttcv`.

## lib/exams.ts

Add `"rocpi"` to the `ExamId` union. Icon `truck` already exists (uklgv, iedttcv use it).

Block (with the other driving tests, after `rodrpciv`):

```ts
const rocpi: ExamConfig = {
  id: "rocpi",
  stateCode: "ROCPI",
  idBase: 25000,
  slug: "/romania-driver-cpc",
  landingPath: "/romania-driver-cpc-practice-test",
  name: "Romania Driver CPC (CPI) Practice Test",
  shortName: "Romania CPI (Driver CPC)",
  examLabel: "ARR CPI theory exam",
  fullName: "Romania ARR Driver CPC initial qualification (CPI marfă / persoane), theory questionnaire",
  questionIdPrefix: "ROCPI-",
  icon: "truck",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Norms on the training and attestation of certain categories of drivers, Annex 2 to Order of
  // the Minister of Transport 1214/2015, art. 4 (consolidated text, checked 2026-11-06): CPI theory
  // exam = a 2-hour paper of 100 questions with 4 options, one correct, plus a 2-hour paper of
  // 6 case studies (two per chapter); pass with 70% of the questions and 70% of the case-study
  // marks; then a practical exam. Short CPI (holder adding goods or passengers): 20 questions plus
  // the whole practical. ARR runs CPI and short CPI in English in Bucharest since 2025 and
  // publishes its English question base on testare.arr.ro. Modelled: the questionnaire only, at
  // 50 questions and the real pace and 70% (35 of 50). ARR publishes no topic split; weights are
  // Tigertest's over Directive (EU) 2022/2561 Annex I. Items are original, not ARR's.
  blueprint: {
    rocpiEco: 5,
    rocpiTech: 6,
    rocpiLoads: 6,
    rocpiPassengers: 5,
    rocpiHours: 7,
    rocpiTacho: 5,
    rocpiRules: 5,
    rocpiSafety: 6,
    rocpiEmergency: 5,
  },
  trainingSets: testSets(25000, 4),
  categoryLabels: {
    rocpiEco: "Rational Driving & Eco-Driving",
    rocpiTech: "Vehicle Technology, Brakes & Checks",
    rocpiLoads: "Loading, Weights & Load Securing",
    rocpiPassengers: "Passenger Transport & Accessibility",
    rocpiHours: "Drivers' Hours & Working Time",
    rocpiTacho: "Tachographs & Records",
    rocpiRules: "Transport Documents, Cabotage & Licences",
    rocpiSafety: "Road Risks, Health & Fitness to Drive",
    rocpiEmergency: "Emergencies, Crime & Professional Conduct",
  },
  copy: {
    guestPrompt: "to save your CPI progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test: Set 1 holds exactly the 50 questions of Test 1, and so on, across every chapter of the Driver CPC course. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions at the real pace, 70% to pass",
    heroSubs: [
      "Four tests on drivers' hours, tachographs, loads and passengers. You need 70%.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Revise ARR's own questions too, then sit your CPI exam.",
    ],
    sourceLine: "Original questions written from EU and Romanian rules for truck and bus drivers (2026). The real CPI questionnaire is 100 questions in 2 hours and you need 70%. Not affiliated with ARR.",
    analyticsKey: "rocpi",
  },
};
```

Append `rocpi` to the `EXAMS` array right after `rodrpciv`.

Check: 25001-25004 (tests and sets) must be free (`grep -n "2500[0-9]" lib/exams.ts` was empty
on 2026-11-06).

## lib/banks/all.ts

```ts
import "./rocpi";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/rocpi.ts`.

## types/index.ts

- `QuestionType`: add `| "ROCPI"`.
- `QuestionCategory`, under a `// Romania ARR Driver CPC (CPI)` comment:

```ts
  | "rocpiEco"
  | "rocpiTech"
  | "rocpiLoads"
  | "rocpiPassengers"
  | "rocpiHours"
  | "rocpiTacho"
  | "rocpiRules"
  | "rocpiSafety"
  | "rocpiEmergency"
```

(`grep '"rocpi' types/index.ts` was empty on 2026-11-06.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; the newer UI languages fall back)

```ts
    rocpiEco: "Rational Driving & Eco-Driving",
    rocpiTech: "Vehicle Technology, Brakes & Checks",
    rocpiLoads: "Loading, Weights & Load Securing",
    rocpiPassengers: "Passenger Transport & Accessibility",
    rocpiHours: "Drivers' Hours & Working Time",
    rocpiTacho: "Tachographs & Records",
    rocpiRules: "Transport Documents, Cabotage & Licences",
    rocpiSafety: "Road Risks, Health & Fitness to Drive",
    rocpiEmergency: "Emergencies, Crime & Professional Conduct",
```

## app/globals.css

The suggested `215 60% 26%` clashes with `boating` (215 65% 32%), `hkiiqe1` (215 70% 22%),
`aesira` (220 55% 22%) and `phcse` (221 50% 30%). A scan of every `--brand` on 2026-11-06 found
`215 85% 22%` (deep navy) clear of all of them (nearest `hkiiqe1`: same hue and lightness, 15
points more saturated). White text on it is far above 4.5:1. Siblings `rotaxi`, `roadmed` and
`rorezid` may land nearby: the integrator settles. Then run `tools/gen_dark_brand_css.py` once.

```css
  /* Romania ARR Driver CPC (CPI) theme */
  [data-theme="rocpi"] {
    --brand: 215 85% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 215 70% 96%;
    --brand-hover: 215 85% 18%;
    --brand-dark: 215 85% 16%;
    --brand-darker: 215 80% 11%;
    --brand-muted: 215 30% 68%;
    --brand-border: 215 35% 80%;
    --brand-border-light: 215 35% 90%;
    --brand-gradient-to: 48 90% 95%;
  }
```

## lib/shareCards.ts, lib/shareCardCopy.ts, lib/shareImageUrl.ts (as `iedttcv` has them)

```ts
  "rocpi": {
    "color": "hsl(215, 85%, 22%)",
    "tint": "hsl(215, 70%, 96%)"
  },
```
`shareCardCopy.ts`: `rocpi: { title: "Romania Driver CPC (CPI) Practice Test", description: "Review EU drivers' hours, tachographs, loads, passengers, CMR and cabotage for the ARR CPI exam, in English." },`
`shareImageUrl.ts`: add `"rocpi"` to `SHARE_COPY_IDS`.

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `rocpi: "Romania's Driver CPC initial qualification (CPI goods and passengers) in English: EU drivers' hours and the Mobility Package, smart tachographs, eco-driving, load securing, passengers, CMR and cabotage, in four 50-question tests with the real 70% pass line.",`
- `EXAM_ORG`: `rocpi: "ARR (Romanian Road Authority) · CPI theory exam for goods and passenger drivers, in English in Bucharest",`
- Hub group: new, right after `{ title: "EU driving theory tests", ... }` (Romania's category B
  test sits in that EU group; there is no separate "Romania driving tests" group). Same group as
  the sibling `rotaxi` proposes, so the two WIRING files agree:
  `{ title: "Romania licences and professional exams", ids: ["rocpi", "rotaxi", "roadmed", "rorezid"] },`
  (drop any sibling that is not wired; rocpi first, as the professional driver attestation).
- `RELATED_OVERRIDES`: `rocpi: ["rotaxi", "rodrpciv", "iedttcv", "uklgv"],`
- `SEARCH_ALIASES` (English and Romanian):
  `rocpi: "romania driver cpc cpi arr atestat cpi atestat profesional cpi marfa cpi persoane cpi scurt atestat sofer profesionist atestat transport marfa atestat transport persoane certificat de pregatire profesionala initiala chestionare arr chestionare cpi testare arr autoritatea rutiera romana truck driver romania english bus driver romania cod 95 code 95 cpc romania tahograf tachograph drivers hours romania sofer camion sofer autocar bucuresti nepal sri lanka driver romania",`

## lib/region.ts

`TEST_REGIONS`: `rocpi: "RO",` (next to `rodrpciv: "RO"`). Not in `NON_DRIVING_TESTS`: it is a
professional driver qualification sat by truck and bus drivers, like `iedttcv` and `uklgv`.

`REGION_HOME.RO` now has more than one test. Suggested copy (integrator's call, coordinate with
`rotaxi`):

```ts
  RO: {
    title: "Free Romania Driving and Driver CPC Practice Tests in English | Tigertest",
    description: "Free practice in English for Romanian driving exams: the category B theory exam and the ARR CPI (Driver CPC) exam for truck and bus drivers. Original questions, every answer explained. No account needed.",
    lead: "Practise in English for the DRPCIV category B theory exam and the ARR CPI exam for professional drivers. Original questions on Romanian and EU rules, every answer explained. No signup.",
    cta: { label: "Romania theory test", href: "/romania-driving-theory-test" },
    testsTitle: "Driving and professional driver exams",
    testsSub: "Category B: 26 questions, 22 to pass. CPI for truck and bus drivers: 100 questions in 2 hours, 70% to pass.",
  },
```

`faqsFor("RO")`, if it lists tests, add: "Can I take the Driver CPC (CPI) exam in English in
Romania? Yes. Since 2025 the Romanian Road Authority (ARR) runs the CPI theory exam in English in
Bucharest on dates it announces, and publishes its English question base on testare.arr.ro.
Tigertest has free English practice for it."

## lib/examFacts.ts

```ts
  rocpi: {
    answer:
      "The CPI (certificat de pregătire profesională inițială) is Romania's Driver CPC initial qualification, needed to drive trucks (CPI marfă) or buses and coaches (CPI persoane) professionally. The exam is run by the Romanian Road Authority (ARR) through its county agencies after a course at an authorised training centre. The theory exam has a 2-hour paper of 100 multiple-choice questions, each with four options and one correct answer, and a 2-hour paper of six case studies; you need 70% on each before you may sit the practical exam. Since 2025 ARR also runs the CPI theory exam in English, in Bucharest only, and publishes its English question base on testare.arr.ro. A driver who already holds one CPI can add the other kind of transport with a 20-question short CPI questionnaire and the full practical exam.",
    rows: [
      { label: "Run by", value: "ARR (Autoritatea Rutieră Română) and its county agencies" },
      { label: "Theory questionnaire", value: "100 questions, 4 options, one correct, 2 hours" },
      { label: "Case studies", value: "6 cases in 2 hours, two per chapter" },
      { label: "Pass mark", value: "70% of the questions and 70% of the case-study marks" },
      { label: "Then", value: "Practical exam (a driving part and a second part)" },
      { label: "Short CPI", value: "20 questions plus the full practical, to add goods or passengers" },
      { label: "Languages", value: "Romanian; English in Bucharest on ARR's dates" },
      { label: "Tigertest mock tests", value: "4 x 50 questions at the real pace, 70% to pass" },
    ],
    basedOn: "Norms approved by Order of the Minister of Transport 1214/2015 (Annex 2, art. 4) and ARR's communiqué on exams in English (December 2024), checked November 2026",
    source: { name: "Autoritatea Rutieră Română (ARR)", url: "https://www.arr.ro/" },
  },
```
(Fees left out: house style avoids money.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the Romania batch.

## lib/landingDates.json

Re-run `npx tsx scripts/build-landing-dates.ts` after committing.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Not in `TEACHER_LED`: candidates sit a course at a training centre, but Tigertest models the
self-study revision; add it only if the integrator treats ARR training centres like Safe Pass
tutors.

## lib/tigerAssets.ts

`BORROWED_SETS`: `rocpi: "cdl",` (like `iedttcv`).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `truck` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 50, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing rocpi:romania-driver-cpc:25001`

## CLAUDE.md (after the Romania Driving Theory bullet)

```md
- **Romania Driver CPC (CPI)** (`rocpi`, ARR's certificate of initial professional qualification for goods and passenger drivers, CPI marfă / persoane, `/romania-driver-cpc/*`, landing `/romania-driver-cpc-practice-test`): `data/romania-cpi-questions.json` (200 original questions over Directive (EU) 2022/2561 Annex I: rational driving and eco-driving 20, vehicle technology, brakes and checks 24, loading, weights and load securing (EN 12195-1, Directive 96/53/EC) 24, passenger transport and accessibility (Regulation 181/2011) 20, drivers' hours and working time (Reg 561/2006 as amended by the 2020 Mobility Package, AETR, Directive 2002/15) 28, tachographs (Reg 165/2014, smart tachographs, UTC) 20, transport documents, cabotage and licences (CMR, Reg 1072/2009 and 1073/2009, Romanian OG 27/2011, ISCTR, RO e-Transport, rovinietă) 20, road risks, health and fitness 24, emergencies, crime and professional conduct 20), test IDs 25001-25004 (50 questions each, half the real 100 at the real 2-hour pace), sets `testSets(25000, 4)`, state `ROCPI`, prefix `ROCPI-`, 70% pass like the real questionnaire. 5/6/6/5/7/5/5/6/5 per test (Tigertest's weights; ARR publishes none). The real theory exam (Order 1214/2015, Annex 2, art. 4) is 100 four-option questions in 2 hours plus 6 case studies in 2 hours, 70% on each, then a practical exam; the short CPI is 20 questions plus the practical. ARR runs CPI in English in Bucharest since 2025 and publishes its English question base on testare.arr.ro, which the bank never copies (the landing tells candidates to study it too). Goods and passengers in one bank; case studies and the practical not modelled; no fees, fines or Romanian C/D speed limits (sources disagree). Kept clear of `iedttcv`, `uklgv`, `ukpcv`, `cdl`, `nzheavy`, `zak53c3`, `rodrpciv`, `rotaxi`, `malta-driver-cpc`, `hungary-gki` and `finland-truck-theory` stems; the rovinietă item is about a coach, since trucks over 3.5 t move to the distance-based TollRO. Built by `tools/next100/rocpi/build.py`; sources in `tools/next100/rocpi/sources.md`. Region RO, hub group "Romania licences and professional exams", `[data-theme="rocpi"]` deep navy (215 85% 22%), borrows the CDL tiger.
```
