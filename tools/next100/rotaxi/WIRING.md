# Wiring for `rotaxi` (Romania ARR taxi and rental / ride-hailing driver attestation test; RO, v1)

Files already written by the builder: `data/romania-taxi-attestation-questions.json` (200, PASS),
`lib/banks/rotaxi.ts`, `app/romania-taxi-attestation/*` (5 wrappers copied from
`app/romania-driving-theory/`: layout, redirect, dashboard, drill, stats; no test or practice
folders), `app/romania-taxi-driver-attestation-practice-test/page.tsx`, `tools/next100/rotaxi/*`
(spec, sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/rotaxi/build.py`
(writes the data file and prints the key-longest share). Everything below goes in shared files.

Format note: the real test (Law 38/2003 art. 26(4) and Annex 7^1 to OMT 1214/2015 as amended,
art. 6, checked 2026-11-06) is a written multiple-choice test-grilă of 20 questions, 70% to pass
(14 of 20), in Romanian or English, set by ARR at its county agencies after a 30-hour course. No
time limit could be confirmed on an official page, so none is stated. Tigertest models eight
real-length tests of 20 at 70% (14/20 = 70% passes, 13/20 = 65% fails). Pools are 8x each per-test
count plus 40 training-only spares (the last 4 of six pools, the last 8 of road and security).
Dashboard = 4 topic sets + 8 tests = 12 steps. No set exceeds 60. `examTestQuestions` reads
`testCount` / `questionsPerTest` generically (as for `uklitu` 8 x 24).

## lib/exams.ts

Add `"rotaxi"` to the `ExamId` union. Icon `car` already exists.

Block (after `rodrpciv`):

```ts
const rotaxi: ExamConfig = {
  id: "rotaxi",
  stateCode: "ROTAXI",
  idBase: 25100,
  slug: "/romania-taxi-attestation",
  landingPath: "/romania-taxi-driver-attestation-practice-test",
  name: "Romania Taxi Attestation Practice Test",
  shortName: "Romania taxi attestation",
  examLabel: "ARR taxi and rental driver test",
  fullName: "ARR professional attestation test for taxi and rental (ride-hailing) drivers, Romania",
  questionIdPrefix: "ROTAXI-",
  icon: "car",
  testCount: 8,
  questionsPerTest: 20,
  passPct: 70,
  // Real test (Law 38/2003 art. 26-28 and Annex 7^1 to OMT 1214/2015 as amended, art. 6, checked
  // 2026-11-06): a written test-grila of 20 questions, at least 70% correct (14 of 20), in
  // Romanian or English, set by the Romanian Road Authority (ARR) after a 30-hour course; the same
  // shape for taxi drivers and drivers in rental mode, whose attestation ride-hailing drivers need
  // under OUG 49/2019. ARR publishes no topic split; weights are Tigertest's, from the course
  // tematica hours (law 5, customer service 3, taxi practice 10, driving and road safety 7,
  // security 5). Eight real-length tests; pools are 8x each count plus 40 training-only spares.
  blueprint: {
    rotxLaw: 3,
    rotxDriver: 3,
    rotxVehicle: 2,
    rotxMeter: 3,
    rotxRental: 2,
    rotxCustomer: 3,
    rotxRoad: 2,
    rotxSecurity: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 25101, name: "Law, Authorisation & Attestation", categories: ["rotxLaw", "rotxDriver"], size: 56, weightLabel: "6 of 20 test questions" },
    { setNumber: 2, id: 25102, name: "Taxi Vehicle, Taximeter & Tariffs", categories: ["rotxVehicle", "rotxMeter"], size: 48, weightLabel: "5 of 20 test questions" },
    { setNumber: 3, id: 25103, name: "Rental Transport & Customers", categories: ["rotxRental", "rotxCustomer"], size: 48, weightLabel: "5 of 20 test questions" },
    { setNumber: 4, id: 25104, name: "Road Safety & Security", categories: ["rotxRoad", "rotxSecurity"], size: 48, weightLabel: "4 of 20 test questions" },
  ],
  categoryLabels: {
    rotxLaw: "Law 38/2003, Authorisation & Documents",
    rotxDriver: "Driver Attestation & Duties",
    rotxVehicle: "Taxi Vehicle, Roof Light & Markings",
    rotxMeter: "Taximeter, Tariffs & Receipts",
    rotxRental: "Rental & Ride-Hailing Transport",
    rotxCustomer: "Customer Service & Accessibility",
    rotxRoad: "Taxi Driving, Stands & Road Safety",
    rotxSecurity: "Driver & Passenger Security",
  },
  copy: {
    guestPrompt: "to save your taxi attestation progress and track every question you miss",
    trainingHeading: "Train by course topic",
    trainingSub: "Four sets on Law 38/2003, the taxi and its taximeter, rental and ride-hailing transport, customers, road safety and security, in English. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 20 questions like the real ARR test, 14 to pass",
    heroSubs: [
      "Four topics, eight real-length tests. The meter and the law weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your ARR test.",
    ],
    sourceLine: "Based on Law 38/2003, the ARR training norms (OMT 1214/2015, Annex 7^1) and OUG 49/2019. Original questions, not the ARR question base; not affiliated with the ARR. 20 per test, 14 to pass.",
    analyticsKey: "rotaxi",
  },
};
```

Append `rotaxi` to the `EXAMS` array after `rodrpciv`.

Check: test IDs 25101-25108 and set IDs 25101-25104 must be free (grepped 2026-11-06: nothing
from 25000 to 25999 in `lib/exams.ts`, `lib/v2` or any `tools/next100/*/WIRING.md`; the brief
assigns idBase 25100 to this row).

## lib/banks/all.ts

```ts
import "./rotaxi";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/rotaxi.ts`.

## types/index.ts

- `QuestionType`: add `| "ROTAXI"`.
- `QuestionCategory`, under a `// Romania ARR taxi and rental driver attestation` comment:

```ts
  | "rotxLaw"
  | "rotxDriver"
  | "rotxVehicle"
  | "rotxMeter"
  | "rotxRental"
  | "rotxCustomer"
  | "rotxRoad"
  | "rotxSecurity"
```

(`grep '"rotx' types/index.ts` was empty on 2026-11-06.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; the newer UI languages fall back)

```ts
    rotxLaw: "Law 38/2003, Authorisation & Documents",
    rotxDriver: "Driver Attestation & Duties",
    rotxVehicle: "Taxi Vehicle, Roof Light & Markings",
    rotxMeter: "Taximeter, Tariffs & Receipts",
    rotxRental: "Rental & Ride-Hailing Transport",
    rotxCustomer: "Customer Service & Accessibility",
    rotxRoad: "Taxi Driving, Stands & Road Safety",
    rotxSecurity: "Driver & Passenger Security",
```

## app/globals.css

The brief's hue `45 85% 24%` clashes with `foodmgr` (42 90% 31%), `uk18ed` (50 80% 29.5%) and
`iesafepass` (50 85% 18% / 29%). A scan of every `--brand` in `app/globals.css` and every
`tools/next100/*/WIRING.md` on 2026-11-06 found free slots only at 25% saturation from hue 40 to
58, or at hue 60 with 85% saturation. Suggested: `60 85% 26%`, a dark taxi yellow (olive); white
text on it is far above 4.5:1. Integrator's call. Then run `tools/gen_dark_brand_css.py` once for
everyone.

```css
  /* Romania ARR taxi driver attestation theme */
  [data-theme="rotaxi"] {
    --brand: 60 85% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 60 70% 95%;
    --brand-hover: 60 85% 21%;
    --brand-dark: 60 85% 18%;
    --brand-darker: 60 80% 12%;
    --brand-muted: 60 30% 68%;
    --brand-border: 60 35% 78%;
    --brand-border-light: 60 35% 88%;
    --brand-gradient-to: 45 80% 95%;
  }
```

## lib/shareCards.ts, lib/shareCardCopy.ts, lib/shareImageUrl.ts (as `rodrpciv` has them)

```ts
  "rotaxi": {
    "color": "hsl(60, 85%, 26%)",
    "tint": "hsl(60, 70%, 95%)"
  },
```
`shareCardCopy.ts`: `rotaxi: { title: "Romania Taxi Driver Attestation", description: "Review Law 38/2003, the taximeter and receipts, ride-hailing rules, customers and safety for the ARR test." },`
`shareImageUrl.ts`: add `"rotaxi"` to `SHARE_COPY_IDS`.

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `rotaxi: "Eight 20-question mock tests in English for the ARR professional attestation test that Romanian taxi, rental and ride-hailing (Uber, Bolt) drivers must pass (14 to pass): Law 38/2003, authorisations and documents, the taximeter, tariffs and receipts, customers, stands and bus lanes, road safety and security.",`
- `EXAM_ORG`: `rotaxi: "ARR (Romanian Road Authority) · taxi and rental driver attestation, in English since 2025",`
- Hub group, new, placed right after `{ title: "EU driving theory tests", ... }` (Romania's driving
  test sits in that EU group; there is no separate "Romania driving tests" group):
  `{ title: "Romania licences and professional exams", ids: ["rocpi", "rotaxi", "roadmed", "rorezid"] },`
  (the other three are this batch's siblings; drop any that are not wired. If the integrator gives
  rocpi a driving group instead, keep `rotaxi` with the non-driving ones.)
  Until the group has three other members, `RELATED_OVERRIDES`:
  `rotaxi: ["rocpi", "rodrpciv", "iespsv", "sgvl"],`
- `SEARCH_ALIASES` (English and Romanian):
  `rotaxi: "romania taxi test taxi driver romania taxi licence romania taxi attestation arr test arr atestat atestat taxi atestat arr taxi atestat inchiriere atestat inchiriere arr transport in regim de taxi transport in regim de inchiriere taximetrist test grila taxi test grila arr testare arr uber romania bolt romania uber driver bolt driver ride hailing romania ride sharing romania transport alternativ ridesharing legea 38 2003 viza taxi viza atestat bucharest bucuresti cluj timisoara iasi foreign taxi driver romania",`

## lib/region.ts

- `TEST_REGIONS`: `rotaxi: "RO",`
- `NON_DRIVING_TESTS`: add `"rotaxi"` (a professional licensing knowledge test, not a driving
  theory test, like `iespsv`, `sgvl` and `ukseru`).
- Region RO already exists. `REGION_HOME.RO` (integrator's call, once the batch's Romania tests
  land): widen from the theory test to "driving theory, taxi and professional tests". `faqsFor("RO")`,
  if it lists tests, add: "Is there practice in English for the ARR taxi attestation? Yes. Tigertest
  has free mock tests of 20 questions, 14 to pass like the real ARR test, for taxi, rental and
  ride-hailing drivers, written from Law 38/2003."

## lib/examFacts.ts

```ts
  rotaxi: {
    answer:
      "Every taxi driver in Romania, and every driver in rental mode (închiriere), which includes Uber and Bolt-style ride-hailing drivers under OUG 49/2019, needs a certificate of professional attestation from the Romanian Road Authority (ARR). It is issued after a 30-hour course at an authorised driving school and a written multiple-choice test (test-grilă) of 20 questions at the ARR county agency, with at least 70 percent, 14 correct answers, needed to pass. The test can be taken in Romanian or English. You must be at least 21, have held a category B licence for at least two years, be medically and psychologically fit and have a clean criminal record for the offences Law 38/2003 lists. The certificate has no end date but must be endorsed every five years.",
    rows: [
      { label: "Run by", value: "ARR (Autoritatea Rutieră Română), county agencies" },
      { label: "Questions", value: "20 multiple choice (test-grilă)" },
      { label: "Pass mark", value: "70% (14 correct)" },
      { label: "Languages", value: "Romanian or English" },
      { label: "Before the test", value: "30-hour course at an authorised driving school" },
      { label: "Minimum age", value: "21, with a B licence held 2 years" },
      { label: "Certificate", value: "No end date; endorsed every 5 years" },
      { label: "Tigertest mock tests", value: "8 x 20 questions, 14 to pass" },
    ],
    basedOn: "Law 38/2003 on taxi and rental transport (art. 26-28), the ARR training and attestation norms (Annex 7^1 to OMT 1214/2015, as amended), the ARR's 2025 notice on exams in English and OUG 49/2019 on alternative transport, checked November 2026",
    source: { name: "Autoritatea Rutieră Română (ARR)", url: "https://www.arr.ro/" },
  },
```
(No time limit is given: none could be confirmed on an official page. Fees are left out.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the Romania batch.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Optional, integrator's call: the attestation is always preceded by a 30-hour course at a driving
school, like `sgvl`'s vocational licence courses. If added:
- `TEACHER_LED`: `"rotaxi"`
- `TEACHES`: `rotaxi: "taxi and rental driver attestation courses at authorised driving schools",`
The landing does not render `ExamClassFaq`; add it (and `classFaqJsonLd`) if `rotaxi` joins
`TEACHER_LED`.

## lib/tigerAssets.ts

`BORROWED_SETS`: `rotaxi: "driving",` (the car tiger, like `iespsv` and `rodrpciv`). The landing
calls `getTigerAsset("rotaxi", 1)`.

## Landing sample questions

The landing renders `<ExamSampleQuestions examId="rotaxi" />` and imports `@/lib/banks/rotaxi`
at the top, as `rodrpciv` and `iespsv` do.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects, `car`
icon exists.

## Question quality hooks

Run `python3 -I tools/build_exam_sources.py` (sources.md lists the official ARR norms first) and
`python3 -I tools/check_banks.py` (PASS on 2026-11-06 with the bank on disk).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts. Then
`npx tsx scripts/build-landing-dates.ts`.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing rotaxi:romania-taxi-attestation:25101`
(the landing references `/landing/rotaxi-mobile.png` and `/landing/rotaxi-desktop.png`).

## CLAUDE.md (after the Romania Driving Theory bullet)

```md
- **ARR Taxi Attestation** (`rotaxi`, the Romanian Road Authority's professional attestation test for taxi drivers and drivers in rental mode, which ride-hailing (Uber, Bolt) drivers also need under OUG 49/2019, `/romania-taxi-attestation/*`, landing `/romania-taxi-driver-attestation-practice-test`): `data/romania-taxi-attestation-questions.json` (200 original questions on Law 38/2003 and the course tematica of the ARR training norms (Annex 7^1 to OMT 1214/2015): law, authorisation and documents 28, driver attestation and duties 28, taxi vehicle, roof light and markings 20, taximeter, tariffs and receipts 28, rental and ride-hailing transport 20, customer service and accessibility 28, taxi driving, stands and road safety 24, driver and passenger security 24), eight real-length tests: test IDs 25101-25108 (20 questions each), sets 25101-25104 (by topic), state `ROTAXI`, prefix `ROTAXI-`, 70% pass (14 of 20, the legal 70%). 3/3/2/3/2/3/2/2 per test (Tigertest's weights from the course hours; ARR publishes none); the last items of each pool (40 in all) are training-only. The real test is a 20-question test-grilă in Romanian or English (English since the March 2025 session), after a 30-hour course; the certificate has no end date but is endorsed every five years; no time limit confirmed. ARR publishes its question base (testare.arr.ro): never copied. No fares, fees, fines or vehicle age limits; tariff levels and local rules vary by municipality. Built by `tools/next100/rotaxi/build.py`; sources in `tools/next100/rotaxi/sources.md`. Region RO, hub group "Romania licences and professional exams", `[data-theme="rotaxi"]` dark taxi yellow (60 85% 26%), borrows the car tiger.
```
