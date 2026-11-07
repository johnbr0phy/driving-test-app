# Wiring for `mtmoto` (Malta motorcycle theory test, categories AM, A1, A2 and A; MT, v1)

Files already written by the builder: `data/malta-motorcycle-theory-questions.json` (200, PASS),
`lib/banks/mtmoto.ts`, `app/malta-motorcycle-theory/*` (layout, redirect, dashboard, drill, stats;
copied from `app/malta-driving-theory/`, no test or practice folders),
`app/malta-motorcycle-theory-test/page.tsx` (renders `ExamSampleQuestions`),
`tools/next100/mtmoto/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/mtmoto/build.py`. Everything below goes in shared files.

Format note: Transport Malta's theory test page (read through search extracts; transport.gov.mt
returns 403 here) gives 35 multiple-choice questions in 45 minutes, 30 correct to pass, for the
theory test in general; it gives no separate motorcycle format, and guides (AutoviaTest) give the
same 35/30 for the motorcycle test. S.L. 65.18 (read on legislation.mt) sets the content: the
common syllabus plus, for A1, A2 and A, a compulsory check of protective outfit, rider visibility,
slippery surfaces (drain covers, road markings) and the emergency stop switch, oil and chain. For
category AM the theory test is the whole driving test (reg. 16). Tigertest models five
real-length tests of 35 with passPct 85 (ceil(0.85 x 35) = 30), like `mttheory`. Pools are 5x each
per-test count plus 25 training-only spares. Dashboard = 4 sets + 5 tests = 9 steps. No set over 60.

## lib/exams.ts

Add `"mtmoto"` to the `ExamId` union. Icon `bike` already exists.

```ts
const mtmoto: ExamConfig = {
  id: "mtmoto",
  stateCode: "MTMOTO",
  idBase: 26200,
  slug: "/malta-motorcycle-theory",
  landingPath: "/malta-motorcycle-theory-test",
  name: "Malta Motorcycle Theory Test Practice",
  shortName: "Malta motorcycle theory",
  examLabel: "Malta motorcycle theory test",
  fullName: "Malta motorcycle theory test (categories AM, A1, A2 and A)",
  questionIdPrefix: "MTMC-",
  icon: "bike",
  testCount: 5,
  questionsPerTest: 35,
  passPct: 85,
  // Real test (Transport Malta, "Obtaining your driving licence", via search extracts 2026-11-07):
  // 35 multiple-choice questions on a touch screen, 45 minutes, 30 correct to pass, English or
  // Maltese. Content from S.L. 65.18 Fourth Schedule (common syllabus plus, for A1, A2 and A,
  // protective outfit, rider visibility, slippery surfaces, emergency stop switch, oil and chain)
  // and S.L. 65.11 (helmets, one passenger astride behind the rider, parking at 45 degrees, no
  // earphones in both ears). Transport Malta publishes no per-topic counts, so these are
  // Tigertest's. Five real-length tests; pools are 5x each count plus 25 training-only spares.
  // passPct 85 = ceil(0.85 * 35) = 30. All items original; the official question bank was not used.
  blueprint: {
    mtmotoLicence: 3,
    mtmotoGear: 4,
    mtmotoChecks: 4,
    mtmotoControl: 6,
    mtmotoPosition: 5,
    mtmotoVisibility: 4,
    mtmotoSurfaces: 4,
    mtmotoPassengers: 2,
    mtmotoRider: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 26201, name: "Gear & Machine Checks", categories: ["mtmotoGear", "mtmotoChecks"], size: 44, weightLabel: "8 of 35 test questions" },
    { setNumber: 2, id: 26202, name: "Control & Road Position", categories: ["mtmotoControl", "mtmotoPosition"], size: 60, weightLabel: "11 of 35 test questions" },
    { setNumber: 3, id: 26203, name: "Being Seen, Surfaces & Weather", categories: ["mtmotoVisibility", "mtmotoSurfaces"], size: 44, weightLabel: "8 of 35 test questions" },
    { setNumber: 4, id: 26204, name: "Licences, Passengers & Safe Riding", categories: ["mtmotoLicence", "mtmotoPassengers", "mtmotoRider"], size: 52, weightLabel: "8 of 35 test questions" },
  ],
  categoryLabels: {
    mtmotoLicence: "Licence Categories & Rider Law",
    mtmotoGear: "Helmets & Protective Clothing",
    mtmotoChecks: "Machine Checks & Faults",
    mtmotoControl: "Control, Braking & Cornering",
    mtmotoPosition: "Road Position, Overtaking & Filtering",
    mtmotoVisibility: "Being Seen & Other Road Users",
    mtmotoSurfaces: "Road Surfaces, Weather & Night",
    mtmotoPassengers: "Passengers, Loads & Parking",
    mtmotoRider: "Alcohol, Fatigue, Distraction & Crashes",
  },
  copy: {
    guestPrompt: "to save your motorcycle theory test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets on what Malta's motorcycle theory test checks: gear, machine checks, control, road position, being seen and slippery surfaces. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 35 questions, 30 to pass",
    heroSubs: [
      "Four topics, five real-length tests. Rider-only topics first.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your theory test.",
    ],
    sourceLine: "Original practice questions written from Malta's driving licence and motor vehicle regulations. Not affiliated with Transport Malta. 35 per test, 30 to pass.",
    analyticsKey: "mtmoto",
  },
};
```

Append `mtmoto` to the `EXAMS` array right after `mttheory`.

Check: 26201-26205 (tests) and 26201-26204 (sets) must be free (batch assigns idBase 26200;
grepped, nothing at 262xx in `lib/exams.ts`; `mttaxi` is 26000, so `mtguard`/`mtcpc` should be at
26100/26300).

## lib/banks/all.ts

```ts
import "./mtmoto";
```

## types/index.ts

- `QuestionType`: add `| "MTMOTO"`.
- `QuestionCategory`, under a `// Malta motorcycle theory` comment:

```ts
  | "mtmotoLicence"
  | "mtmotoGear"
  | "mtmotoChecks"
  | "mtmotoControl"
  | "mtmotoPosition"
  | "mtmotoVisibility"
  | "mtmotoSurfaces"
  | "mtmotoPassengers"
  | "mtmotoRider"
```

(Grepped: no existing `mtmoto*` keys.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; newer UI languages fall back)

```ts
    mtmotoLicence: "Licence Categories & Rider Law",
    mtmotoGear: "Helmets & Protective Clothing",
    mtmotoChecks: "Machine Checks & Faults",
    mtmotoControl: "Control, Braking & Cornering",
    mtmotoPosition: "Road Position, Overtaking & Filtering",
    mtmotoVisibility: "Being Seen & Other Road Users",
    mtmotoSurfaces: "Road Surfaces, Weather & Night",
    mtmotoPassengers: "Passengers, Loads & Parking",
    mtmotoRider: "Alcohol, Fatigue, Distraction & Crashes",
```

## app/globals.css

The suggested `10 70% 30%` clashes with `biharpolice 18 65% 30%` (8 degrees, 5 sat, 0 light), and
the pending `12 70% 22%` and `dkmoto 12 85% 24%` sit close below it; the whole 4 to 17 degree band
at lightness 24 to 46 is full. Checked against every light `[data-theme]` block in
`app/globals.css` and every `--brand` in `tools/**/WIRING.md` (8 degree / 15 sat / 8 light rule):
`5 50% 20%` (deep brick red) is clear (nearest: `nzmoto 12 85% 16%` sat +35, `llqp 5 45% 28%` light
+8, `apgov 5 30% 30%` light +10, `casfa 2 78% 31%` light +11). White on it is well above 4.5:1. Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Malta motorcycle theory theme */
  [data-theme="mtmoto"] {
    --brand: 5 50% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 5 50% 96%;
    --brand-hover: 5 50% 16%;
    --brand-dark: 5 50% 15%;
    --brand-darker: 5 50% 10%;
    --brand-muted: 5 25% 70%;
    --brand-border: 5 30% 80%;
    --brand-border-light: 5 30% 90%;
    --brand-gradient-to: 20 50% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `mtmoto: "Five 35-question mock tests for the Transport Malta theory test for a motorcycle or moped licence (AM, A1, A2 and A), 30 to pass: licence categories, helmets and gear, machine checks, braking and cornering, road position, being seen, slippery surfaces, passengers and parking.",`
- `EXAM_ORG`: `mtmoto: "Transport Malta · motorcycle theory test, categories AM, A1, A2 and A",`
- Hub group: a licence category, so it joins Malta's driving group. Today that is the
  `"EU driving theory tests"` group; put `"mtmoto"` right after `"mttheory"`:
  `{ title: "EU driving theory tests", ids: [..., "hukresz", "mttheory", "mtmoto"] },`
  (If the integrator splits out a `"Malta driving tests"` group, it holds
  `["mttheory", "mtmoto", "mtcpc"]`, before `"Malta licences and workplace certificates"`.)
- `SEARCH_ALIASES` (English and Maltese):
  `mtmoto: "malta motorcycle theory test malta motorbike theory test motorcycle licence malta motorbike licence malta transport malta motorcycle test category a malta a1 licence malta a2 licence malta am licence malta moped licence malta scooter licence malta 125cc licence malta learner permit motorcycle malta theory test centre pieta gozo motorcycle test liċenzja tal-mutur eżami teoretiku tal-mutur mutur muturi",`
- `RELATED_OVERRIDES` (if the group stays large it is not needed; otherwise):
  `mtmoto: ["mttheory", "ukmoto", "nzmoto"],`

## lib/region.ts

- `TEST_REGIONS`: `mtmoto: "MT",`
- Not in `NON_DRIVING_TESTS` (it is a driving licence theory test).
- `REGION_HOME.MT` (integrator's call once the Malta batch lands): the lead can widen, e.g.
  `lead: "Practise for Transport Malta's theory tests: car, motorcycle and more. Original questions on signs, roundabouts, riding and the rules of the road in Malta, every answer explained. No signup.",`
- `faqsFor("MT")`, if it lists tests, add: "Is there practice for the Malta motorcycle theory
  test? Yes. Tigertest has five free 35-question mock tests with 30 to pass for categories AM, A1,
  A2 and A: helmets and gear, machine checks, braking and cornering, road position, being seen and
  slippery surfaces."

## lib/examFacts.ts

```ts
  mtmoto: {
    answer:
      "The Malta motorcycle theory test is Transport Malta's theory test for a moped or motorcycle licence in categories AM, A1, A2 and A, taken on a touch-screen computer at the Theory Test Centre. Transport Malta gives the theory test as 35 multiple-choice questions in 45 minutes, with 30 correct to pass, in English or Maltese. Malta's driving licence regulations add compulsory questions for motorcycle categories on protective clothing and helmets, how visible riders are, slippery surfaces such as drain covers and road markings, and the engine cut-out switch, oil and chain. For category AM the theory test is the whole test; for A1, A2 and A a practical test follows.",
    rows: [
      { label: "Run by", value: "Transport Malta" },
      { label: "Categories", value: "AM, A1, A2 and A" },
      { label: "Questions", value: "35 multiple choice, on a touch screen" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "30 of 35" },
      { label: "Languages", value: "English or Maltese" },
      { label: "Theory test age", value: "18, or 16 for category AM (S.L. 65.18 reg. 18)" },
      { label: "Tigertest mock tests", value: "5 x 35 questions, 30 to pass" },
    ],
    basedOn: "the Motor Vehicles (Driving Licences) Regulations (S.L. 65.18), the Motor Vehicles Regulations (S.L. 65.11) and Transport Malta's licensing guidance, checked November 2026",
    source: { name: "Motor Vehicles (Driving Licences) Regulations, S.L. 65.18", url: "https://legislation.mt/eli/sl/65.18/eng" },
  },
```
(The 35 / 45 / 30 figures are from Transport Malta's general theory test page, read through search
extracts; it gives no separate motorcycle format. Fees left out. Learner's permit ages for A2 and A
are left out on purpose: guides conflict and the brief says leave ages out.)

## lib/shareCards.ts, lib/shareCardCopy.ts

- `lib/shareCardCopy.ts`: `mtmoto: { title: "Malta Motorcycle Theory Test", description: "Practise helmets and gear, machine checks, braking and road position for the Transport Malta motorcycle theory test." },`

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## TEACHER_LED / TEACHES

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

Borrow the motorcycle tiger: add `mtmoto: "moto",` to `BORROWED_SETS`. The landing calls
`getTigerAsset("mtmoto", 1)`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing exam-specific: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no
redirects.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: the `bike` icon exists.

## scripts/build-training-parts.ts, sources

- `npx tsx scripts/build-training-parts.ts` after wiring (no set over 60, so no parts), then
  `npx tsx scripts/build-landing-dates.ts`.
- `python3 -I tools/build_exam_sources.py`.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing mtmoto:malta-motorcycle-theory:26201`

## CLAUDE.md (after the Malta Driving Theory bullet)

```md
- **Malta Motorcycle Theory** (`mtmoto`, Transport Malta theory test for categories AM, A1, A2 and A, `/malta-motorcycle-theory/*`, landing `/malta-motorcycle-theory-test`): `data/malta-motorcycle-theory-questions.json` (200 original questions on S.L. 65.18 (the Fourth Schedule's motorcycle part: protective outfit, rider visibility, drain covers and road markings, emergency stop switch, oil and chain; the First Schedule categories, AM mopeds, light quadricycles and e-kickscooters, A1 125 cc and 11 kW, A2 35 kW and 0.2 kW/kg from no more than double the power, A; reg. 21 learner practice Monday to Saturday under instruction; reg. 50 which licences cover AM, A1 and A2) and S.L. 65.11 (reg. 123 helmets on motorcycles and quad bikes and one passenger astride on a seat behind the rider, reg. 80 motorcycles parked at 45 degrees or more to the kerb, reg. 115 no earphones in both ears): licence categories and rider law 18, helmets and protective clothing 22, machine checks 22, control, braking and cornering 32, road position, overtaking and filtering 28, being seen 22, surfaces, weather and night 22, passengers, loads and parking 14, alcohol, fatigue and crashes 20), five real-length tests: test IDs 26201-26205 (35 questions each), sets 26201-26204 (by topic), state `MTMOTO`, prefix `MTMC-`, 85% pass (30 of 35, the figures Transport Malta gives for the theory test; it publishes no separate motorcycle format). 3/4/4/6/5/4/4/2/3 per test (Tigertest's split); the last items of each pool (25 in all) are training-only. Left-hand traffic; no ages, fees, fines, penalty points or speed and alcohol figures (mttheory asks those). Kept clear of `mttheory`, `mttaxi` and every motorcycle bank on disk. Built by `tools/next100/mtmoto/build.py`; sources in `tools/next100/mtmoto/sources.md`. Region MT, hub group "EU driving theory tests" (after mttheory), `[data-theme="mtmoto"]` deep brick red (5 50% 20%), borrows the motorcycle tiger.
```
