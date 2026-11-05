# Wiring for `zak53moto` (South Africa K53 learner's licence test, Code 1 motorcycle, v1)

Files already written by the builder: `data/south-africa-k53-code-1-questions.json` (200, PASS,
key-longest 19%), `lib/banks/zak53moto.ts`, `app/k53-motorcycle/*` (layout, redirect, dashboard,
drill, stats, copied from `app/k53-code-3/`), `app/k53-motorcycle-learners-test/page.tsx`,
`tools/next100/zak53moto/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/zak53moto/build.py`. Everything below goes in shared files.

Format note: four 50-question tests, 22 rules of the road + 22 signs and markings + 6 motorcycle
controls each (the same split as zak53 and zak53c3). `passPct: 80` gives 40 of 50. Pools are
exactly 4x each per-test count (200, no spares). Dashboard = 6 training sets + 4 tests = 10 steps.
No stem is shared with `zak53` or `zak53c3` (normalised and fuzzy-compared; near matches reworded).

## lib/exams.ts

Add `"zak53moto"` to the `ExamId` union. Icon `bike` already exists (used by `moto`).

```ts
const zak53moto: ExamConfig = {
  id: "zak53moto",
  stateCode: "ZAK53C1",
  idBase: 20700,
  slug: "/k53-motorcycle",
  landingPath: "/k53-motorcycle-learners-test",
  name: "K53 Motorcycle Learner's Practice Test (Code 1)",
  shortName: "K53 motorcycle learner's",
  examLabel: "K53 Code 1 learner's licence test",
  fullName: "South Africa K53 learner's licence test, Code 1 (motorcycle, motor tricycle or quadricycle)",
  questionIdPrefix: "ZAC1-",
  icon: "bike",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Real test: 64 random multiple-choice questions in three sections (RTMC, May 2026, as recorded
  // for zak53). Study guides (not official) give 28 rules / 28 signs / 8 controls. No Code 1
  // specific format is published, so each mock reuses the Code 2 split scaled to 50: rules 22
  // (5/6/6/5), signs and markings 22 (9/6/3/4), motorcycle controls 6. Code 1 ages (16 up to
  // 125 cc, 18 above) and 24-month validity from gov.za; helmet (reg 207) and passenger rules from
  // the Regulations as quoted by Arrive Alive, checked 2026-11-05. passPct 80 = 40 of 50,
  // Tigertest's own target. All items original; signs described in words.
  blueprint: {
    c1Licence: 5,
    c1RightOfWay: 6,
    c1Speed: 6,
    c1Parking: 5,
    c1Regulatory: 9,
    c1Warning: 6,
    c1Guidance: 3,
    c1Markings: 4,
    c1Controls: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 20701, name: "Licences, Helmets & Right of Way", categories: ["c1Licence", "c1RightOfWay"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 2, id: 20702, name: "Speed, Passengers, Lights & Parking", categories: ["c1Speed", "c1Parking"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 20703, name: "Regulatory Signs", categories: ["c1Regulatory"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 4, id: 20704, name: "Warning Signs", categories: ["c1Warning"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 5, id: 20705, name: "Guidance Signs, Markings & Signals", categories: ["c1Guidance", "c1Markings"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 6, id: 20706, name: "Motorcycle Controls", categories: ["c1Controls"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    c1Licence: "Licences, Helmets, Alcohol & Crashes",
    c1RightOfWay: "Intersections & Right of Way",
    c1Speed: "Speed, Lane Position & Overtaking",
    c1Parking: "Passengers, Lights & Parking",
    c1Regulatory: "Regulatory Signs",
    c1Warning: "Warning Signs",
    c1Guidance: "Guidance & Information Signs",
    c1Markings: "Road Markings & Traffic Signals",
    c1Controls: "Motorcycle Controls (Code 1)",
  },
  copy: {
    guestPrompt: "to save your K53 motorcycle learner's progress and track every question you miss",
    trainingHeading: "Train by K53 section",
    trainingSub: "Six sets covering the rules of the road for riders, road signs and markings, and Code 1 motorcycle controls. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions in the real test's mix, 40 to pass",
    heroSubs: [
      "Rules, signs and controls, like the real test.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your learner's test at the DLTC.",
    ],
    sourceLine: "Based on the National Road Traffic Act and Regulations and the SADC road sign manual. Original questions; 50 per test, 40 to pass (Tigertest's target).",
    analyticsKey: "zak53moto",
  },
};
```

Append `zak53moto` to the `EXAMS` array after `zak53c3`. Ids 20701-20706 are free (block 20700
reserved for this exam in BRIEF.md; grepped `lib/exams.ts`).

## lib/banks/all.ts

```ts
import "./zak53moto";
```

## types/index.ts

Grepped: no `c1*` key and no `ZAK53C1` exists.

- `QuestionType`: add `| "ZAK53C1"`.
- `QuestionCategory`, under a `// South Africa K53 Code 1 (motorcycle) learner's` comment:

```ts
  | "c1Licence"
  | "c1RightOfWay"
  | "c1Speed"
  | "c1Parking"
  | "c1Regulatory"
  | "c1Warning"
  | "c1Guidance"
  | "c1Markings"
  | "c1Controls"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    c1Licence: "Licences, Helmets, Alcohol & Crashes",
    c1RightOfWay: "Intersections & Right of Way",
    c1Speed: "Speed, Lane Position & Overtaking",
    c1Parking: "Passengers, Lights & Parking",
    c1Regulatory: "Regulatory Signs",
    c1Warning: "Warning Signs",
    c1Guidance: "Guidance & Information Signs",
    c1Markings: "Road Markings & Traffic Signals",
    c1Controls: "Motorcycle Controls (Code 1)",
```

## app/globals.css

Light block, hue 25 40% 18% (from the brief), then run `tools/gen_dark_brand_css.py` once for
everyone.

```css
  /* South Africa K53 Code 1 (motorcycle) learner's theme */
  [data-theme="zak53moto"] {
    --brand: 25 40% 18%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 25 35% 95%;
    --brand-hover: 25 40% 14%;
    --brand-dark: 25 40% 13%;
    --brand-darker: 25 35% 9%;
    --brand-muted: 25 20% 70%;
    --brand-border: 25 25% 78%;
    --brand-border-light: 25 20% 88%;
    --brand-gradient-to: 18 30% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `zak53moto: "Four 50-question mock tests for South Africa's K53 Code 1 learner's licence, the learner's for a motorcycle, tricycle or quadricycle: rules of the road, road signs and markings, and motorcycle controls, from the National Road Traffic Act and Regulations.",`
- `EXAM_ORG`: `zak53moto: "RTMC / DLTC · Code 1 motorcycle learner's licence",`
- Hub group: add to the existing group:
  `{ title: "South Africa driving tests", ids: ["zak53", "zak53c3", "zak53moto"] },`
- `SEARCH_ALIASES`:
  `zak53moto: "k53 motorcycle learners motorbike learners licence code 1 learners licence code 1 learners test code a1 learners code a learners scooter learners licence south africa motorcycle learners test bike learners licence k53 motorcycle controls",`
- `RELATED_OVERRIDES`:
  `zak53moto: ["zak53", "zak53c3", "ukmoto"],` and append `"zak53moto"` to the zak53 and zak53c3
  entries if they have room (`zak53: ["zak53c3", "zak53moto", "kentsa"]`,
  `zak53c3: ["zak53", "zak53moto", "uklgv"]`), integrator's call.

## lib/region.ts

`TEST_REGIONS`: add `zak53moto: "ZA",` next to `zak53c3: "ZA"`. Driving test, so NOT in
`NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  zak53moto: {
    answer:
      "The Code 1 learner's licence is South Africa's learner's licence for a motorcycle with or without a sidecar, a motor tricycle or a motor quadricycle, the step before a Code A1 (125 cc or less) or Code A (over 125 cc) motorcycle licence. You must be 16 on the day of the test for a bike of 125 cc or less and 18 for a bigger one. It is the same K53 learner's test as for a car, written at a driving licence testing centre (DLTC) after an eye test, in three sections: rules of the road, road signs and markings, and vehicle controls, the controls section being for a motorcycle. Study guides say the test is 64 questions (28, 28 and 8) with each section passed separately. The learner's licence is valid for 24 months and cannot be extended.",
    rows: [
      { label: "Covers", value: "Motorcycles, motor tricycles and quadricycles" },
      { label: "Minimum age", value: "16 up to 125 cc, 18 over 125 cc" },
      { label: "Sections", value: "Rules, signs and markings, vehicle controls (28/28/8, guides say)" },
      { label: "Pass mark", value: "Each section separately (guides say 22, 23 and 6)" },
      { label: "Valid for", value: "24 months, cannot be extended" },
      { label: "Leads to", value: "Code A1 or Code A motorcycle licence" },
      { label: "Run by", value: "Driving licence testing centres (DLTCs)" },
    ],
    basedOn: "gov.za learner's licence service page and the National Road Traffic Regulations as quoted by Arrive Alive, checked November 2026; section counts and marks from study guides",
    source: { name: "gov.za: Apply for a learner's licence", url: "https://www.gov.za/services/driving-licence/apply-learners-licence" },
  },
```

## lib/tigerAssets.ts

`BORROWED_SETS`: `zak53moto: "moto",` (the motorcycle tiger, as `ukmoto` borrows it).

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## Landing

Renders `ExamFacts`, `ExamSampleQuestions` (imports `@/lib/banks/zak53moto`) and
`ExamRelatedTests`; the FAQ is one `faqs` array rendered as JSON-LD and on the page. Says "not
affiliated with the RTMC" in the last FAQ.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## lib/landingDates.json, lib/examBankSizes.json

Run `npx tsx scripts/build-landing-dates.ts` after committing and
`npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing zak53moto:k53-motorcycle:20701`

## CLAUDE.md (under Additional Exams, after the K53 Code 3 bullet)

```md
- **K53 Motorcycle Learner's** (`zak53moto`, South Africa K53 learner's licence test, Code 1 motorcycle, motor tricycle or quadricycle, the learner's before a Code A1 or A licence, `/k53-motorcycle/*`, landing `/k53-motorcycle-learners-test`): `data/south-africa-k53-code-1-questions.json` (200 original questions, none shared with zak53 or zak53c3: licences/helmets/alcohol/crashes 20, right of way 24, speed/lane position/overtaking 24, passengers/lights/parking 20, regulatory signs 36, warning signs 24, guidance signs 12, markings and signals 16, motorcycle controls 24 (clutch and front brake levers, gear lever, rear brake pedal, throttle, kill switch, side stand)), test IDs 20701-20704 (22 rules, 22 signs and markings, 6 controls, the Code 2 split), sets 20701-20706, state `ZAK53C1`, prefix `ZAC1-`, 80% pass (Tigertest's target). 5/6/6/5/9/6/3/4/6 per test, no spares. Code 1 from 16 up to 125 cc and 18 above (gov.za), helmet reg 207 and the passenger rules (over 50 cc, pillion with footrests, two persons at most); no learner supervision rule (sources disagree), no daytime headlamp law, no lane-splitting legality, no fines. Built by `tools/next100/zak53moto/build.py`; sources in `tools/next100/zak53moto/sources.md`. Region ZA, hub group "South Africa driving tests", `[data-theme="zak53moto"]` dark brown (25 40% 18%), borrows the motorcycle tiger.
```
