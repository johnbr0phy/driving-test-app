# Wiring for `zak53` (South Africa K53 learner's licence test, Code 2, v1)

Files already written by the builder: `data/south-africa-k53-questions.json` (200, PASS),
`lib/banks/zak53.ts`, `app/k53-learners/*` (8 wrappers, copied from `app/nz-learner-licence/`),
`app/k53-learners-test/page.tsx`, `tools/countries/zak53/*` (spec, sources, `q_*.py`, `build.py`).
Rebuild with `python3 -I tools/countries/zak53/build.py`. Everything below goes in shared files.

Format note: four 50-question tests, 22 rules of the road + 22 signs and markings + 6 vehicle
controls each (the brief's split, proportional to the real 64-question test's 28/28/8 that guides
give). `passPct: 80` gives `ceil(0.80 * 50) = 40`. Pools are exactly 4x each per-test count (200, no
spares), so no item repeats across tests. Dashboard = 6 training sets + 4 tests = 10 steps.

Already present in shared files (no action): `TEST_REGIONS` has `zak53: "ZA"` and `REGION_HOME.ZA`
points at `/k53-learners-test`; the hub group "South Africa driving tests" and
`RELATED_OVERRIDES.zak53` are in `lib/testCatalog.ts`. Check the `REGION_HOME.ZA` copy: it is
consistent with this bank (four full 50-question tests).

## lib/exams.ts

Add `"zak53"` to the `ExamId` union. Icon `car` already exists.

```ts
const zak53: ExamConfig = {
  id: "zak53",
  stateCode: "ZAK53",
  idBase: 12300,
  slug: "/k53-learners",
  landingPath: "/k53-learners-test",
  name: "K53 Learner's Licence Practice Test",
  shortName: "K53 learner's",
  examLabel: "K53 learner's licence test",
  fullName: "South Africa K53 learner's licence test (Code 2, light motor vehicle)",
  questionIdPrefix: "ZAK53-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Real test: 64 random multiple-choice questions (RTMC spokesperson, May 2026) in three
  // sections. Study guides (not official) give 28 rules / 28 signs / 8 controls with section marks
  // 22, 23 and 6. Each mock test scales that to 50: rules 22 (5/6/6/5), signs and markings 22
  // (9/6/3/4), vehicle controls 6. Rules from the National Road Traffic Act 93 of 1996 and
  // Regulations 2000, gov.za learner's licence page, and the SADC Road Traffic Signs Manual, as
  // checked 2026-10-31. passPct 80 = ceil(0.80 * 50) = 40, Tigertest's own target. All items
  // original; signs described in words.
  blueprint: {
    zaLicence: 5,
    zaRightOfWay: 6,
    zaSpeed: 6,
    zaParking: 5,
    zaRegulatory: 9,
    zaWarning: 6,
    zaGuidance: 3,
    zaMarkings: 4,
    zaControls: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 12301, name: "Licences, Alcohol & Right of Way", categories: ["zaLicence", "zaRightOfWay"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 2, id: 12302, name: "Speed, Overtaking, Parking & Lights", categories: ["zaSpeed", "zaParking"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 12303, name: "Regulatory Signs", categories: ["zaRegulatory"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 4, id: 12304, name: "Warning Signs", categories: ["zaWarning"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 5, id: 12305, name: "Guidance Signs, Markings & Signals", categories: ["zaGuidance", "zaMarkings"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 6, id: 12306, name: "Vehicle Controls", categories: ["zaControls"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    zaLicence: "Licences, Alcohol & Crashes",
    zaRightOfWay: "Intersections & Right of Way",
    zaSpeed: "Speed, Following & Overtaking",
    zaParking: "Stopping, Parking & Lights",
    zaRegulatory: "Regulatory Signs",
    zaWarning: "Warning Signs",
    zaGuidance: "Guidance & Information Signs",
    zaMarkings: "Road Markings & Traffic Signals",
    zaControls: "Vehicle Controls (Code 2)",
  },
  copy: {
    guestPrompt: "to save your K53 learner's progress and track every question you miss",
    trainingHeading: "Train by K53 section",
    trainingSub: "Six sets covering the rules of the road, road signs and markings, and Code 2 vehicle controls. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions in the real test's mix, 40 to pass",
    heroSubs: [
      "Rules, signs and controls, like the real test.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your learner's test at the DLTC.",
    ],
    sourceLine: "Based on the National Road Traffic Act and Regulations and the SADC road sign manual. Original questions; 50 per test, 40 to pass (Tigertest's target).",
    analyticsKey: "zak53",
  },
};
```

Append `zak53` to the `EXAMS` array with the other driving tests. Ids 12301-12306 must be free
(block 12300 reserved for this exam in BRIEF.md).

## lib/banks/all.ts

```ts
import "./zak53";
```

## types/index.ts

Grepped: no `za*` key exists.

- `QuestionType`: add `| "ZAK53"`.
- `QuestionCategory`, under a `// South Africa K53 learner's` comment:

```ts
  | "zaLicence"
  | "zaRightOfWay"
  | "zaSpeed"
  | "zaParking"
  | "zaRegulatory"
  | "zaWarning"
  | "zaGuidance"
  | "zaMarkings"
  | "zaControls"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    zaLicence: "Licences, Alcohol & Crashes",
    zaRightOfWay: "Intersections & Right of Way",
    zaSpeed: "Speed, Following & Overtaking",
    zaParking: "Stopping, Parking & Lights",
    zaRegulatory: "Regulatory Signs",
    zaWarning: "Warning Signs",
    zaGuidance: "Guidance & Information Signs",
    zaMarkings: "Road Markings & Traffic Signals",
    zaControls: "Vehicle Controls (Code 2)",
```

## app/globals.css

Light block, hue 81 90% 30% (from the brief), then run `tools/gen_dark_brand_css.py` once for
everyone.

```css
  /* South Africa K53 learner's theme */
  [data-theme="zak53"] {
    --brand: 81 90% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 81 60% 95%;
    --brand-hover: 81 90% 25%;
    --brand-dark: 81 90% 22%;
    --brand-darker: 81 80% 15%;
    --brand-muted: 81 30% 70%;
    --brand-border: 81 35% 78%;
    --brand-border-light: 81 30% 88%;
    --brand-gradient-to: 120 45% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `zak53: "Four 50-question mock tests for South Africa's K53 learner's licence (Code 2): rules of the road, road signs and markings, and vehicle controls, from the National Road Traffic Act and Regulations.",`
- `EXAM_ORG`: `zak53: "RTMC / DLTC · Code 2 learner's licence",`
- Hub group and `RELATED_OVERRIDES`: already present.
- `SEARCH_ALIASES`:
  `zak53: "k53 learners test k53 learners licence learners licence south africa code 2 learners k53 road signs k53 rules of the road k53 vehicle controls dltc learners test natis learners licence questions sa driving test",`

## lib/region.ts

Already present: `zak53: "ZA",` in `TEST_REGIONS`. Driving test, so NOT in `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  zak53: {
    answer:
      "The K53 learner's licence test is the first step to driving a car in South Africa. It is a multiple-choice test of 64 questions drawn at random, written at a driving licence testing centre (DLTC), in three sections: rules of the road, road signs and markings, and vehicle controls. Study guides say the sections are 28, 28 and 8 questions and must each be passed separately. For a Code 2 (light motor vehicle) learner's licence you must be at least 17. The learner's licence is valid for 24 months, cannot be extended, and lets you drive only under the supervision of a licensed driver.",
    rows: [
      { label: "Questions", value: "64 multiple-choice, drawn at random" },
      { label: "Sections", value: "Rules, signs and markings, vehicle controls (28/28/8, guides say)" },
      { label: "Pass mark", value: "Each section separately: 22, 23 and 6 (guides say)" },
      { label: "Minimum age", value: "17 for Code 2 (cars)" },
      { label: "Valid for", value: "24 months, cannot be extended" },
      { label: "Driving on it", value: "Only supervised by a licensed driver" },
      { label: "Run by", value: "Driving licence testing centres (DLTCs)" },
    ],
    basedOn: "gov.za learner's licence service page, the National Road Traffic Act and Regulations, and RTMC (May 2026), checked October 2026; section counts and marks from study guides",
    source: { name: "gov.za: Apply for a learner's licence", url: "https://www.gov.za/services/driving-licence/apply-learners-licence" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Do not add to `TIGER_EXAM_IDS` without reviewed artwork.

## Landing breadcrumbs

The brief asks for `<ExamLandingBreadcrumbs examId>`, but no such component exists in this tree
(grepped `app`, `components`, `lib`) and the NZ template does not render one. If the integrator
adds it, place `<ExamLandingBreadcrumbs examId="zak53" />` right after the JSON-LD script in
`app/k53-learners-test/page.tsx`. `ExamFacts` and `ExamRelatedTests` are rendered. The FAQ is one
`faqs` array rendered both as JSON-LD and on the page.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing zak53:k53-learners:12301`

## CLAUDE.md (under Additional Exams)

```md
- **K53 Learner's** (South Africa K53 learner's licence test, Code 2 car, `/k53-learners/*`, landing `/k53-learners-test`): `data/south-africa-k53-questions.json` (200 original questions from the National Road Traffic Act and Regulations and the SADC sign manual: licences/alcohol/crashes 20, right of way 24, speed/overtaking 24, stopping/parking/lights 20, regulatory signs 36, warning signs 24, guidance signs 12, markings and signals 16, Code 2 vehicle controls 24), test IDs 12301-12304 (50 questions each: 22 rules, 22 signs and markings, 6 controls), sets 12301-12306, state `ZAK53`, 80% pass (40 of 50, Tigertest's target; the real test is 64 random questions, and its 28/28/8 sections and 22/23/6 marks are only what guides say). 5/6/6/5/9/6/3/4/6 per test, no spares. No zero-alcohol claim, no licence card renewal rule, no fines. Built by `tools/countries/zak53/build.py`; sources in `tools/countries/zak53/sources.md`. Region ZA, hub group "South Africa driving tests".
```
