# Wiring for `sgbtt` (Singapore Basic Theory Test, SG, v1)

Files already written by the builder: `data/singapore-btt-questions.json` (200, PASS),
`lib/banks/sgbtt.ts`, `app/singapore-btt/*` (8 wrappers, copied from `app/nz-learner-licence/`),
`app/singapore-btt-practice-test/page.tsx`, `tools/countries/sgbtt/*` (spec, sources, `q_*.py`,
`build.py`). Rebuild with `python3 -I tools/countries/sgbtt/build.py`. Everything below goes in
shared files.

Format note: four real-length tests of 50, 45 to pass (the guides' figure; the Traffic Police publish
no format). `passPct: 90` gives `ceil(0.90 * 50) = 45`. Dashboard = 5 training sets + 4 tests = 9 steps.
Every pool is exactly 4x its per-test count (no spares), so no item repeats across tests. Every set has
at least `size` unique questions and none exceeds 60.

## lib/exams.ts

Add `"sgbtt"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests):

```ts
const sgbtt: ExamConfig = {
  id: "sgbtt",
  stateCode: "SGBTT",
  idBase: 12400,
  slug: "/singapore-btt",
  landingPath: "/singapore-btt-practice-test",
  name: "Singapore BTT Practice Test",
  shortName: "Singapore BTT",
  examLabel: "Basic Theory Test",
  fullName: "Singapore Basic Theory Test (BTT)",
  questionIdPrefix: "SGBTT-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 90,
  // Source: Singapore Traffic Police, "Basic Theory of Driving: The Official Handbook", last updated
  // 2.1.2026, Part B (the part marked "to be tested during Basic Theory Test"). The Traffic Police
  // publish no per-topic counts, question count or pass mark; guides say 50 questions in 50 minutes,
  // 45 to pass, so passPct 90 = ceil(0.90 * 50) = 45. Counts follow the sections of Part B, weighted
  // toward signs, markings and signals. Pools are exactly 4x each count. Alcohol limits (2026 Act) and
  // DIPS thresholds (change 1 Jan 2027) are not asked. All items original. Checked 2026-10-31.
  blueprint: {
    sgSigns: 10,
    sgMarkings: 9,
    sgRoadRules: 8,
    sgJunctions: 7,
    sgParking: 4,
    sgVehicle: 5,
    sgRoadSafety: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 12401, name: "Traffic Signs", categories: ["sgSigns"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 12402, name: "Road Markings & Signals", categories: ["sgMarkings"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 3, id: 12403, name: "Lanes, Overtaking & Parking", categories: ["sgRoadRules", "sgParking"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 12404, name: "Junctions & Right of Way", categories: ["sgJunctions"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 5, id: 12405, name: "Safe Driving & Your Vehicle", categories: ["sgRoadSafety", "sgVehicle"], size: 48, weightLabel: "12 of 50 test questions" },
  ],
  categoryLabels: {
    sgSigns: "Traffic Signs",
    sgMarkings: "Road Markings & Signals",
    sgRoadRules: "Lanes, Overtaking & Speed",
    sgJunctions: "Junctions & Right of Way",
    sgParking: "Stopping & Parking",
    sgVehicle: "Lights, Phones & Your Vehicle",
    sgRoadSafety: "Safe Driving & Road Users",
  },
  copy: {
    guestPrompt: "to save your BTT progress and track every question you miss",
    trainingHeading: "Train by handbook topic",
    trainingSub: "Five sets covering every part of the Basic Theory of Driving handbook the BTT tests. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 45 to pass",
    heroSubs: [
      "Five topics, four full tests. Signs and markings weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your Basic Theory Test.",
    ],
    sourceLine: "Based on the Traffic Police Basic Theory of Driving handbook (2 January 2026). Original questions; 50 per test, 45 to pass as guides quote.",
    analyticsKey: "sgbtt",
  },
};
```

Append `sgbtt` to the `EXAMS` array with the other driving tests.

Check: 12401-12405 (tests 12401-12404 and sets 12401-12405) must be free; the brief reserves 12400.

## lib/banks/all.ts

```ts
import "./sgbtt";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/sgbtt.ts`.

## types/index.ts

- `QuestionType`: add `| "SGBTT"`.
- `QuestionCategory`, under a `// Singapore BTT` comment (all seven checked free on 2026-10-31;
  `sgSafety` belongs to the security guard exam and is not used):

```ts
  | "sgSigns"
  | "sgMarkings"
  | "sgRoadRules"
  | "sgJunctions"
  | "sgParking"
  | "sgVehicle"
  | "sgRoadSafety"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    sgSigns: "Traffic Signs",
    sgMarkings: "Road Markings & Signals",
    sgRoadRules: "Lanes, Overtaking & Speed",
    sgJunctions: "Junctions & Right of Way",
    sgParking: "Stopping & Parking",
    sgVehicle: "Lights, Phones & Your Vehicle",
    sgRoadSafety: "Safe Driving & Road Users",
```

## app/globals.css

Light block (hue 0 100% 32%, a deep red, as the brief assigns), then run `tools/gen_dark_brand_css.py`
once for everyone.

```css
  /* Singapore BTT theme */
  [data-theme="sgbtt"] {
    --brand: 0 100% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 0 70% 96%;
    --brand-hover: 0 100% 27%;
    --brand-dark: 0 100% 24%;
    --brand-darker: 0 90% 16%;
    --brand-muted: 0 40% 72%;
    --brand-border: 0 45% 80%;
    --brand-border-light: 0 40% 90%;
    --brand-gradient-to: 15 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `sgbtt: "Four 50-question mock tests for Singapore's Basic Theory Test: traffic signs, road markings and signals, lanes and overtaking, junctions, parking and safe driving, from the Traffic Police Basic Theory of Driving handbook.",`
- `EXAM_ORG`: `sgbtt: "Singapore Traffic Police · Basic Theory Test at BBDC, CDC and SSDC",`
- Hub group: already present (`{ title: "Singapore driving tests", ids: ["sgbtt"] }`). With one
  member, add a `RELATED_OVERRIDES` line so `relatedTests()` has neighbours:
  `sgbtt: ["mykpp", "hkdrive", "phlto"],`
- `SEARCH_ALIASES`:
  `sgbtt: "singapore btt basic theory test btt practice btt mock test btt questions singapore driving theory test basic theory of driving handbook traffic police bbdc ssdc cdc driving licence singapore",`

## lib/region.ts

`sgbtt: "SG",` in `TEST_REGIONS` (already present). It is a driving test, so NOT in
`NON_DRIVING_TESTS`. `REGION_HOME.SG` copy is correct (200 questions, four 50-question tests, km/h,
left-hand traffic).

## lib/examFacts.ts

```ts
  sgbtt: {
    answer:
      "The Basic Theory Test (BTT) is the first theory test for a driving licence in Singapore. It tests traffic rules, traffic regulations, traffic signs and signals and general road safety, from Part B of the Traffic Police handbook Basic Theory of Driving. You take it, with an eyesight test, at one of the three driving centres. Guides say it is 50 multiple-choice questions in 50 minutes with 45 needed to pass; the Traffic Police do not publish the format. Passing lets you apply for a Provisional Driving Licence, valid for 2 years, to learn with a licensed instructor; car learners then take the Final Theory Test.",
    rows: [
      { label: "Questions", value: "50 multiple-choice (as guides say)" },
      { label: "Pass mark", value: "45 of 50 (as guides say)" },
      { label: "Time", value: "50 minutes (as guides say)" },
      { label: "Minimum age", value: "18 for a driving licence" },
      { label: "Also required", value: "Eyesight test when you register" },
      { label: "Next step", value: "Provisional Driving Licence, valid 2 years" },
      { label: "Study material", value: "Basic Theory of Driving, Part B (2 Jan 2026)" },
      { label: "Run by", value: "Traffic Police, at BBDC, CDC and SSDC" },
    ],
    basedOn: "Traffic Police Basic Theory of Driving handbook (last updated 2.1.2026) and the Provisional Driving Licence page, checked October 2026",
    source: { name: "Singapore Police Force: Provisional Driving Licence", url: "https://www.police.gov.sg/Knowledge-Hub/Traffic/Traffic-Matters/Provisional-Driving-Licence" },
  },
```
(Fee left out: house style avoids money figures. The three centres are Bukit Batok Driving Centre,
ComfortDelGro Driving Centre and Singapore Safety Driving Centre; the police page says "any of the 3
Driving Centres" without naming them, so drop the names from the "Run by" row if the integrator wants
only what the page says.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Do not add to `TIGER_EXAM_IDS` without reviewed artwork.

## Landing breadcrumbs

The brief asks for `<ExamLandingBreadcrumbs examId>`, but no such component exists in this tree
(grepped `components/` and `app/` on 2026-10-31) and the NZ template does not render one. If the
integrator adds it, place it right after the JSON-LD script in
`app/singapore-btt-practice-test/page.tsx`. The landing renders `ExamFacts` and `ExamRelatedTests`.
The FAQ is one `faqs` array rendered both as JSON-LD and on the page, so the two always match.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing sgbtt:singapore-btt:12401`

## CLAUDE.md (under Additional Exams)

```md
- **Singapore BTT** (Basic Theory Test, `/singapore-btt/*`, landing `/singapore-btt-practice-test`): `data/singapore-btt-questions.json` (200 original questions from Part B of the Traffic Police Basic Theory of Driving handbook, last updated 2.1.2026: signs 40, markings and signals 36, lanes/overtaking/speed 32, junctions 28, parking 16, lights/phones/vehicle 20, safe driving 28), test IDs 12401-12404 (50 questions each), sets 12401-12405, state `SGBTT`, 90% pass (45 of 50, the figure guides quote; the Traffic Police publish no format). 10/9/8/7/4/5/7 per test, no spares. Safety key is `sgRoadSafety` (`sgSafety` is the security guard exam's). Alcohol limits (2026 Act) and DIPS thresholds (change 1 Jan 2027) are not asked. Signs are described in words. Built by `tools/countries/sgbtt/build.py`; sources in `tools/countries/sgbtt/sources.md`. Region SG, hub group "Singapore driving tests".
```
