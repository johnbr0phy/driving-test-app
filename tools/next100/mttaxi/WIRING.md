# Wiring for `mttaxi` (Malta Taxi Driver Theory Test, Taxi Driver and Area Knowledge Certificate; MT, v1)

Files already written by the builder: `data/malta-taxi-driver-questions.json` (200, PASS),
`lib/banks/mttaxi.ts`, `app/malta-taxi-driver/*` (5 wrappers copied from `app/spsv-entry-test/`:
layout, redirect, dashboard, drill, stats; no test or practice folders),
`app/malta-taxi-driver-theory-test/page.tsx`, `tools/next100/mttaxi/*` (spec, sources, `q_*.py`,
`build.py`). Rebuild with `python3 -I tools/next100/mttaxi/build.py` (writes the data file and prints
the key-longest share). Everything below goes in shared files.

Format note: the Taxi Services Regulations (S.L. 499.59, Third Schedule Part 2a, read in full on
legislation.mt 2026-11-07) set the theory examination at 45 minutes after a course of at least 46
hours. Transport Malta's approved-training-provider guidelines and its TDAKC page (both 403 here,
read through search extracts) give 35 multiple-choice questions with 30 correct to pass ("85%"),
in Maltese and English. Five real-length tests of 35 at passPct 85, `ceil(0.85 x 35) = 30`. Four
training sets, so the dashboard is 5 tests + 4 sets = 9 steps. Each pool is 5x its per-test count
plus 2 to 7 training-only spares (the last items of each pool, 25 in all), so no item repeats
across tests.

Scope note for the integrator: this is the white taxi theory test (Taxi Driver permit and tag).
Y-plate (light passenger transport, Bolt/Uber/eCabs) drivers sit a separate LPTV driver permit
course and examination under S.L. 499.68; a taxi permit holder is exempt from it. The landing FAQ
says so. If a Y-plate test is wanted later it should be its own exam.

## lib/exams.ts

Add `"mttaxi"` to the `ExamId` union. Icon `car` already exists.

```ts
const mttaxi: ExamConfig = {
  id: "mttaxi",
  stateCode: "MTTAXI",
  idBase: 26000,
  slug: "/malta-taxi-driver",
  landingPath: "/malta-taxi-driver-theory-test",
  name: "Malta Taxi Driver Theory Test Practice",
  shortName: "Malta taxi theory test",
  examLabel: "Malta taxi driver theory test",
  fullName: "Malta Taxi Driver Theory Test (Taxi Driver and Area Knowledge Certificate)",
  questionIdPrefix: "MTTAXI-",
  icon: "car",
  testCount: 5,
  questionsPerTest: 35,
  passPct: 85,
  // Taxi Services Regulations, S.L. 499.59 (Third Schedule Part 1 subjects, Part 2a theory
  // examination of 45 minutes; read on legislation.mt 2026-11-07). Transport Malta's training
  // provider guidelines give 35 multiple-choice questions with 30 to pass: five real-length tests
  // at passPct 85, ceil(0.85 x 35) = 30. Transport Malta publishes no per-subject split, so these
  // weights are Tigertest's, following the Third Schedule's subject list. Each pool is 5x its
  // count plus 2 to 7 training-only spares (25 in all). All items original; places in words.
  blueprint: {
    mttaxiPermit: 5,
    mttaxiVehicle: 4,
    mttaxiHiring: 5,
    mttaxiFares: 3,
    mttaxiPassengers: 4,
    mttaxiSafety: 5,
    mttaxiDriving: 3,
    mttaxiArea: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 26001, name: "Permits, Tags & the Taxi", categories: ["mttaxiPermit", "mttaxiVehicle"], size: 49, weightLabel: "9 of 35 test questions" },
    { setNumber: 2, id: 26002, name: "Hiring Rules & Fares", categories: ["mttaxiHiring", "mttaxiFares"], size: 44, weightLabel: "8 of 35 test questions" },
    { setNumber: 3, id: 26003, name: "Passengers & Safety", categories: ["mttaxiPassengers", "mttaxiSafety"], size: 49, weightLabel: "9 of 35 test questions" },
    { setNumber: 4, id: 26004, name: "Driving & Area Knowledge", categories: ["mttaxiDriving", "mttaxiArea"], size: 58, weightLabel: "9 of 35 test questions" },
  ],
  categoryLabels: {
    mttaxiPermit: "Taxi Driver Permit & Tag",
    mttaxiVehicle: "The Taxi & Its Equipment",
    mttaxiHiring: "Hiring, Stands & Plying for Hire",
    mttaxiFares: "Fares, Taximeter & Receipts",
    mttaxiPassengers: "Customer Care & Passengers with Disabilities",
    mttaxiSafety: "Emergencies, First Aid & Difficult Passengers",
    mttaxiDriving: "Professional Driving, Vehicle Care & Fuel",
    mttaxiArea: "Routes & Places in Malta and Gozo",
  },
  copy: {
    guestPrompt: "to save your Malta taxi theory test progress and track every question you miss",
    trainingHeading: "Train by course subject",
    trainingSub: "Four sets covering every subject of the taxi driver course in the Taxi Services Regulations. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 35 questions, 30 to pass, like the real test",
    heroSubs: [
      "Four topic sets, five real-length mock tests.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for the taxi theory test.",
    ],
    sourceLine: "Original practice questions written from Malta's Taxi Services Regulations (S.L. 499.59) and the subjects of the taxi driver course. Not affiliated with Transport Malta. 35 per test, 30 to pass.",
    analyticsKey: "mttaxi",
  },
};
```

Append `mttaxi` to the `EXAMS` array after `mttheory`.

Check: 26001-26005 (tests 26001-26005, sets 26001-26004) must be free; the batch assigns idBase
26000. Grepped: nothing at 26000 in `lib/exams.ts` or `lib/v2`.

## lib/banks/all.ts

```ts
import "./mttaxi";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/mttaxi.ts`.

## types/index.ts

- `QuestionType`: add `| "MTTAXI"`.
- `QuestionCategory`, under a `// Malta Taxi Driver Theory Test` comment:

```ts
  | "mttaxiPermit"
  | "mttaxiVehicle"
  | "mttaxiHiring"
  | "mttaxiFares"
  | "mttaxiPassengers"
  | "mttaxiSafety"
  | "mttaxiDriving"
  | "mttaxiArea"
```

(Grepped: no existing key starts with `mttaxi`; `mttheory` uses `mtLicence`, `mtSigns`... with
no clash.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; newer UI languages fall back)

```ts
    mttaxiPermit: "Taxi Driver Permit & Tag",
    mttaxiVehicle: "The Taxi & Its Equipment",
    mttaxiHiring: "Hiring, Stands & Plying for Hire",
    mttaxiFares: "Fares, Taximeter & Receipts",
    mttaxiPassengers: "Customer Care & Passengers with Disabilities",
    mttaxiSafety: "Emergencies, First Aid & Difficult Passengers",
    mttaxiDriving: "Professional Driving, Vehicle Care & Fuel",
    mttaxiArea: "Routes & Places in Malta and Gozo",
```

## app/globals.css

The suggested 45 80% 28% clashes with `foodmgr` (42 90% 31%), `forklift` (42 80% 32%) and
`uk18ed` (50 80% 29.5%) under the 8-degree rule. Checked with a script against every light
`[data-theme]` `--brand`: 48 70% 20% (a dark taxi amber) is clear (nearest `iesafepass` 50 85% 18%
differs by 15 saturation; `praxis` 48 40% 28% by 30) and gives white text 8.9:1. Then run
`tools/gen_dark_brand_css.py` once for everyone. Siblings `mtguard`, `mtmoto`, `mtcpc` are being
built at the same time: settle any clash among them.

```css
  /* Malta taxi driver theory test theme */
  [data-theme="mttaxi"] {
    --brand: 48 70% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 48 60% 95%;
    --brand-hover: 48 70% 16%;
    --brand-dark: 48 70% 14%;
    --brand-darker: 48 65% 9%;
    --brand-muted: 48 30% 68%;
    --brand-border: 48 35% 78%;
    --brand-border-light: 48 35% 88%;
    --brand-gradient-to: 0 0% 98%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `mttaxi: "Five 35-question mock tests for Malta's taxi driver theory test, 30 to pass: the taxi driver permit and tag, stands and plying for hire, taximeters and fares, passengers with disabilities, emergencies and the places of Malta and Gozo, from the Taxi Services Regulations.",`
- `EXAM_ORG`: `mttaxi: "Transport Malta · Taxi Driver and Area Knowledge Certificate",`
- Hub group: a new group right after the group that holds Malta's driving tests (today
  `"EU driving theory tests"`, which holds `mttheory`; if `mtmoto` or `mtcpc` open a
  `"Malta driving tests"` group, put this one right after that):
  `{ title: "Malta licences and workplace certificates", ids: ["mttaxi", "mtguard"] },`
  (`mtguard` is this batch's sibling; drop it if it is not wired).
- `SEARCH_ALIASES` (English and Maltese):
  `mttaxi: "malta taxi test malta taxi theory test taxi driver theory test malta taxi driver tag malta driver tag taxi permit malta taxi driver permit tdakc taxi driver and area knowledge certificate transport malta taxi test taxi course malta 46 hour taxi course gozo taxi white taxi malta cab driver malta taxi licence malta eżami tat-taxi eżami teoretiku tat-taxi xufier tat-taxi liċenzja tat-taxi permess tas-sewwieq tat-taxi tag tat-taxi",`
- `RELATED_OVERRIDES` (the new group is small until the rest of the batch lands):
  `mttaxi: ["mttheory", "iespsv", "sgvl"],`

## lib/region.ts

`mttaxi: "MT",` in `TEST_REGIONS`, and add `"mttaxi"` to `NON_DRIVING_TESTS` (a licensing knowledge
test, not a driving theory test; same call as `iespsv`, `sgvl` and `ukseru`).

`REGION_HOME.MT` (integrator's call once the Malta batch lands): the copy can widen from the car
theory test, for example:
- `lead: "Practise for Transport Malta's theory tests: the car licence and the taxi driver test. Original questions on signs, roundabouts, taxi rules, passengers and the places of Malta and Gozo, every answer explained. No signup.",`
- `faqsFor("MT")`, if it lists tests, add: "Is there practice for the Malta taxi driver theory
  test? Yes. Tigertest has five free 35-question mock tests with 30 to pass, written from the Taxi
  Services Regulations: permits and the driver's tag, stands and hiring, fares, passengers, safety
  and the places of Malta and Gozo."

## lib/examFacts.ts

```ts
  mttaxi: {
    answer:
      "The Malta taxi driver theory test is the theory examination for the Taxi Driver and Area Knowledge Certificate, which you need with a practical test and 40 hours accompanying a working taxi driver to get a taxi driver permit and the driver's tag from Transport Malta. You first attend a taxi driver course of at least 46 hours with a training provider approved by Transport Malta. The Taxi Services Regulations set the theory examination at 45 minutes; Transport Malta's guidance gives 35 multiple-choice questions with 30 correct to pass, in Maltese or English.",
    rows: [
      { label: "Run by", value: "Transport Malta (Land Transport Directorate)" },
      { label: "Questions", value: "35 multiple choice (Transport Malta guidance)" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "30 of 35 (about 85%)" },
      { label: "Course first", value: "At least 46 hours with an approved provider" },
      { label: "Then", value: "Practical test and 40 accompanied hours, 10 at night" },
      { label: "Permit age", value: "19 or over" },
      { label: "Permit and tag", value: "Up to five years, refresher course every five years" },
    ],
    basedOn: "the Taxi Services Regulations (S.L. 499.59) and Transport Malta's taxi driver guidance, checked November 2026",
    source: { name: "Taxi Services Regulations, S.L. 499.59", url: "https://legislation.mt/eli/sl/499.59/eng" },
  },
```
(Fees are left out: house style avoids money. The 35 / 30 figures are from Transport Malta pages
read through search extracts because transport.gov.mt returns 403 here; the 45 minutes and 46 hours
are in the regulation itself.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## TEACHER_LED / TEACHES (components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx)

Teacher-led (approved taxi training providers run the 46-hour course). The landing already renders
`<ExamClassFaq examId="mttaxi" />` and `classFaqJsonLd("mttaxi")`.
- `TEACHER_LED` in `components/TeachNudge.tsx`: add `"mttaxi"`.
- `TEACHES` in `components/exam/ExamClassFaq.tsx`:
  `mttaxi: "the 46-hour taxi driver course",`

## lib/tigerAssets.ts

Borrow the car (DMV) tiger like `mttheory`: add `mttaxi: "driving",` to `BORROWED_SETS`. The landing
calls `getTigerAsset("mttaxi", 1)`.

## Landing sample questions

The landing renders `<ExamSampleQuestions examId="mttaxi" />` and imports `@/lib/banks/mttaxi` at
the top, as the Ireland and Malta driving landings do. Drop both lines if non-driving landings
should not carry samples.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: the `car` icon exists.

## scripts/build-training-parts.ts, sources, freshness

- `npx tsx scripts/build-training-parts.ts` after wiring (writes `lib/trainingParts.json` and
  `lib/examBankSizes.json`). No set exceeds 60, so no parts. Then
  `npx tsx scripts/build-landing-dates.ts`.
- `python3 -I tools/build_exam_sources.py` (the first three https URLs of `sources.md` are the
  three legislation.mt PDFs).
- Optional `lib/examFreshness.json` event: none dated. The Y-plate rules changed by L.N. 171 of
  2026 (in force 29 July 2026), which does not touch this bank.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing mttaxi:malta-taxi-driver:26001`
(the landing references `/landing/mttaxi-mobile.png` and `/landing/mttaxi-desktop.png`).

## CLAUDE.md (under Additional Exams, after the Malta Driving Theory bullet)

```md
- **Malta Taxi Theory Test** (`mttaxi`, Transport Malta's taxi driver theory test for the Taxi Driver and Area Knowledge Certificate, after a course of at least 46 hours with an approved taxi training provider; with a practical test and 40 accompanied hours it leads to the taxi driver permit and tag, `/malta-taxi-driver/*`, landing `/malta-taxi-driver-theory-test`): `data/malta-taxi-driver-questions.json` (200 original questions written from the Taxi Services Regulations, S.L. 499.59, and its Third Schedule subjects: permit and tag 27, the taxi and its equipment 22, hiring, stands and plying 27, fares, taximeter and receipts 17, customer care and passengers with disabilities 22, emergencies, first aid and difficult passengers 27, professional driving, vehicle care and fuel 22, routes and places in Malta and Gozo 36), five real-length tests of 35 (test IDs 26001-26005), sets 26001-26004 (by topic), state `MTTAXI`, prefix `MTTAXI-`, 85% pass (30 of 35). 5/4/5/3/4/5/3/6 per test (Tigertest's weights; Transport Malta publishes none); the last items of each pool (25 in all) are training-only. Format: 45 minutes in the regulation; 35 questions and 30 to pass from Transport Malta's training-provider guidance and TDAKC page (transport.gov.mt returns 403, read via search extracts). White taxi rules only: Y-plate (LPTV, S.L. 499.68) drivers have their own course and examination. No fees, fines, fare amounts or penalty point values; places described in words. Built by `tools/next100/mttaxi/build.py`; sources in `tools/next100/mttaxi/sources.md`. Region MT, hub group "Malta licences and workplace certificates", `[data-theme="mttaxi"]` dark taxi amber (48 70% 20%), borrows the car tiger, teacher-led (approved taxi training providers).
```

## Review (2026-11-07)

Fact pass against S.L. 499.59 and Cap. 65 (both PDFs re-read from legislation.mt 2026-11-07:
reg 9 renewal and licence note, reg 11 age 19 and 21 days, reg 12 40/4/10 hours, refresher and
CPC exemption, reg 13 registered post, reg 16 tag rules, reg 52 six metres, reg 61 100 m / 15 m,
reg 64 fifty percent, reg 75 two years, Third Schedule wheelchair sequence; Cap. 65 art. 15I zero
alcohol for vehicles carrying passengers for a fee). Changes, all in the sources, ids and counts
unchanged, rebuilt and `validate_bank.py` PASS (key-longest 22%), `tools/check_banks.py` PASS:
- MTTAXI-PRM-015 (about the test: who is exempt from the examination) rewritten as reg 13: how
  Transport Malta notifies a permit decision (registered post).
- MTTAXI-PRM-019 explanation: free replacement for the first three replacements (fee from the
  fourth), not "the first few".
- MTTAXI-SAF-002 (duplicate of MTTHE-EMG-001, 112) rewritten as choking first aid.
- MTTAXI-DRV-007 (oil pressure light, same fact as MTMC-CHK-019) rewritten as the charging light.
- MTTAXI-DRV-022 (coolant light, same item as MTMC-CHK-021) rewritten as worn wiper blades.
- MTTAXI-ARE-033 (University at Msida, same key and fact as ARE-001's Mater Dei) rewritten as
  Fort Rinella, Kalkara.
- MTTAXI-ARE-017 explanation: Golden Bay is in Mellieħa's limits (Visit Malta), not Mġarr's.
- MTTAXI-ARE-022 distractor "Buskett Gardens, Siġġiewi" changed to "near Dingli".
The 35 questions / 30 to pass figures still rest on Transport Malta pages read through search
extracts (transport.gov.mt 403); a fresh search on 2026-11-07 found only car-test guide pages,
so the landing's "check the format with your training provider" line stays.
