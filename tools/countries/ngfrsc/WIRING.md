# Wiring for `ngfrsc` (Nigeria FRSC Highway Code / driving test theory, NG, v1)

Files already written by the builder: `data/nigeria-frsc-questions.json` (200, PASS),
`lib/banks/ngfrsc.ts`, `app/nigeria-highway-code/*` (8 wrappers, copied from
`app/nz-learner-licence/`), `app/nigeria-driving-test-practice/page.tsx`, `tools/countries/ngfrsc/*`
(spec, sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/countries/ngfrsc/build.py`.
Everything below goes in shared files.

Format note: four tests of 50, `passPct: 75` gives `ceil(0.75 * 50) = 38`. Per the brief this is
Tigertest's own target. Heads-up for the integrator: FRSC did publish a format, in a news release
of 8 July 2021 (CBT at driving schools from 1 June 2021: 35 multiple-choice questions, 30 minutes,
60% to pass, retake after 7 days; see sources.md). The landing and examFacts state those FRSC
figures with the source and present 50 questions and 75% as Tigertest's stricter practice target.
Dashboard = 5 training sets + 4 tests = 9 steps. Every pool is exactly 4x its per-test count, so
there are no spares and no item repeats across tests.

## lib/exams.ts

Add `"ngfrsc"` to the `ExamId` union. Icon `car` already exists.

```ts
const ngfrsc: ExamConfig = {
  id: "ngfrsc",
  stateCode: "NGFRSC",
  idBase: 12600,
  slug: "/nigeria-highway-code",
  landingPath: "/nigeria-driving-test-practice",
  name: "Nigeria Driving Test Practice (FRSC Highway Code)",
  shortName: "Nigeria Highway Code",
  examLabel: "FRSC driving theory test",
  fullName: "Nigeria FRSC driving theory test (Highway Code and National Road Traffic Regulations 2012)",
  questionIdPrefix: "NGFRSC-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // Source: the FRSC Nigeria Highway Code (as restated in FRSC's 2024 and 2025 Highway Code
  // literacy compendiums) and the National Road Traffic Regulations 2012 (S.I. 61 of 2012),
  // checked 2026-10-31. FRSC's real CBT (8 July 2021 release) is 35 questions in 30 minutes with
  // 60% to pass; FRSC publishes no per-topic counts. These four 50-question tests weight the
  // Highway Code topics with signs heaviest, and 75% (38 of 50) is Tigertest's own target, set
  // above the official 60%. Pools are exactly 4x each count (no spares). Left out: car highway
  // and expressway speed limits (80 vs 90 conflict), tanker limits, learner's permit validity,
  // alcohol limit figures, fines and fees. All items original; signs described in words.
  blueprint: {
    ngLicence: 6,
    ngSigns: 10,
    ngMarkings: 5,
    ngRightOfWay: 8,
    ngSpeed: 7,
    ngParking: 5,
    ngSafety: 5,
    ngEmergency: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 12601, name: "Licences & Vehicle Safety", categories: ["ngLicence", "ngSafety"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 2, id: 12602, name: "Road Signs & Signals", categories: ["ngSigns"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 12603, name: "Markings, Junctions & Crossings", categories: ["ngMarkings", "ngRightOfWay"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 4, id: 12604, name: "Speed, Overtaking & Parking", categories: ["ngSpeed", "ngParking"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 5, id: 12605, name: "Breakdowns, Crashes & First Aid", categories: ["ngEmergency"], size: 16, weightLabel: "4 of 50 test questions" },
  ],
  categoryLabels: {
    ngLicence: "Licences & Documents",
    ngSigns: "Road Signs & Signals",
    ngMarkings: "Road Markings & Lanes",
    ngRightOfWay: "Junctions, Crossings & Right of Way",
    ngSpeed: "Speed, Overtaking & Conditions",
    ngParking: "Parking & Expressways",
    ngSafety: "Alcohol, Phones & Vehicle Safety",
    ngEmergency: "Breakdowns, Crashes & First Aid",
  },
  copy: {
    guestPrompt: "to save your Highway Code progress and track every question you miss",
    trainingHeading: "Train by Highway Code topic",
    trainingSub: "Five sets covering the Highway Code and road traffic regulations the theory test asks about. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 38 (75%)",
    heroSubs: [
      "Five topics, four mock tests. Road signs weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your CBT.",
    ],
    sourceLine: "Based on the FRSC Highway Code and the National Road Traffic Regulations 2012. Original questions; 75% is Tigertest's target (FRSC's CBT pass mark is 60%).",
    analyticsKey: "ngfrsc",
  },
};
```

Append `ngfrsc` to the `EXAMS` array with the other driving tests.

Check: 12601-12605 (tests 12601-12604 and sets 12601-12605) must be free. The brief reserves
12600 for this exam.

## lib/banks/all.ts

```ts
import "./ngfrsc";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/ngfrsc.ts`.

## types/index.ts

- `QuestionType`: add `| "NGFRSC"`.
- `QuestionCategory`, under a `// Nigeria FRSC Highway Code` comment (grep on 2026-10-31 found no
  existing `ng*` keys):

```ts
  | "ngLicence"
  | "ngSigns"
  | "ngMarkings"
  | "ngRightOfWay"
  | "ngSpeed"
  | "ngParking"
  | "ngSafety"
  | "ngEmergency"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ngLicence: "Licences & Documents",
    ngSigns: "Road Signs & Signals",
    ngMarkings: "Road Markings & Lanes",
    ngRightOfWay: "Junctions, Crossings & Right of Way",
    ngSpeed: "Speed, Overtaking & Conditions",
    ngParking: "Parking & Expressways",
    ngSafety: "Alcohol, Phones & Vehicle Safety",
    ngEmergency: "Breakdowns, Crashes & First Aid",
```

## app/globals.css

Light block with the brief's hue (123 60% 26%, a deep Nigerian green), then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Nigeria FRSC Highway Code theme */
  [data-theme="ngfrsc"] {
    --brand: 123 60% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 123 45% 95%;
    --brand-hover: 123 60% 21%;
    --brand-dark: 123 60% 19%;
    --brand-darker: 123 55% 13%;
    --brand-muted: 123 25% 70%;
    --brand-border: 123 25% 78%;
    --brand-border-light: 123 25% 88%;
    --brand-gradient-to: 150 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ngfrsc: "Four mock tests for the theory part of the Nigerian driver's licence: road signs, junctions, overtaking, parking, expressways, vehicle safety and crashes, from the FRSC Highway Code and the National Road Traffic Regulations 2012.",`
- `EXAM_ORG`: `ngfrsc: "FRSC · driving school CBT for a fresh licence",`
- Hub group `{ title: "Nigeria driving tests", ids: ["ngfrsc"] }` and the `RELATED_OVERRIDES`
  line `ngfrsc: ["kentsa", "zak53", "ukcar"],` are already in the tree (lines 256 and 531 on
  2026-10-31). Nothing to add there.
- `SEARCH_ALIASES`:
  `ngfrsc: "nigeria driving test frsc highway code frsc cbt driving school test nigerian drivers licence theory test highway code quiz nigeria road signs nigeria learners permit national road traffic regulations 2012",`

## lib/region.ts

Already in the tree: `ngfrsc: "NG"` in `TEST_REGIONS` and the `REGION_HOME.NG` block. It is a
driving test, so NOT in `NON_DRIVING_TESTS`. `REGION_HOME.NG.testsSub` ("200 questions on the
Nigeria Highway Code, in km/h for right-hand traffic. Four full 50-question tests.") matches the
bank. Optional tweak: no copy there claims an official pass mark, so nothing needs changing.

## lib/tigerAssets.ts

Already in the tree (`ngfrsc: "driving"`). Nothing to add.

## lib/examFacts.ts

```ts
  ngfrsc: {
    answer:
      "To get a fresh driver's licence in Nigeria you must be at least 18, train at an FRSC-certified driving school and hold a learner's permit. Since 1 June 2021 the school's training ends with a computer-based theory test (CBT) on the Highway Code: FRSC's July 2021 announcement gives 35 multiple-choice questions in 30 minutes, with 60% needed to pass and a retake after 7 days. You also need a visual acuity and medical fitness certificate, a practical driving test and biometric capture at a Driver's Licence Centre. A learner may drive only with a licensed driver or instructor beside them.",
    rows: [
      { label: "Questions", value: "35 multiple-choice (FRSC, 2021)" },
      { label: "Pass mark", value: "60% (FRSC, 2021)" },
      { label: "Time", value: "30 minutes" },
      { label: "Retake", value: "After 7 days" },
      { label: "Minimum age", value: "18 (26 for a commercial licence)" },
      { label: "Training", value: "26 sessions at an FRSC-certified driving school" },
      { label: "Also required", value: "Learner's permit, medical and eyesight certificate, practical test" },
      { label: "Study material", value: "FRSC Highway Code, National Road Traffic Regulations 2012" },
      { label: "Run by", value: "Federal Road Safety Corps (FRSC)" },
    ],
    basedOn: "FRSC's CBT announcement of 8 July 2021 and the National Road Traffic Regulations 2012, checked October 2026. Tigertest's 50-question tests and 75% target are its own, not FRSC figures",
    source: { name: "FRSC: Computer Based Test for licence applicants", url: "https://frsc.gov.ng/creating-a-safer-road-use-culture-and-enhancing-the-integrity-of-the-national-drivers-license-frsc-commences-computer-based-test-for-applicants/" },
  },
```
(Fees left out: house style avoids money figures.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## Landing breadcrumbs

The brief asks for `<ExamLandingBreadcrumbs examId>`, but no such component exists in this tree
(grep of app, components and lib on 2026-10-31), and the NZ template landing does not render one,
so importing it would break the build. If the integrator adds it, place
`<ExamLandingBreadcrumbs examId="ngfrsc" />` right after the JSON-LD script in
`app/nigeria-driving-test-practice/page.tsx`. The landing's FAQ is one `faqs` array rendered both
as JSON-LD and on the page, so the two always match.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ngfrsc:nigeria-highway-code:12601`

## CLAUDE.md (under Additional Exams)

```md
- **Nigeria Highway Code** (FRSC driving theory, the driving school CBT for a fresh licence, `/nigeria-highway-code/*`, landing `/nigeria-driving-test-practice`): `data/nigeria-frsc-questions.json` (200 original questions from the FRSC Highway Code and the National Road Traffic Regulations 2012: licences 24, signs and signals 40, markings 20, junctions and crossings 32, speed and overtaking 28, parking and expressways 20, alcohol/phones/vehicle safety 20, breakdowns/crashes/first aid 16), test IDs 12601-12604, sets 12601-12605, state `NGFRSC`, 75% pass (38 of 50, Tigertest's own target; FRSC's 2021 CBT is 35 questions, 30 minutes, 60%). 6/10/5/8/7/5/5/4 per test, no spares. Right-hand traffic. Left out: car highway speed limits (sources conflict), tanker limits, learner's permit validity, alcohol figures. Signs are described in words. Built by `tools/countries/ngfrsc/build.py`; sources in `tools/countries/ngfrsc/sources.md`. Region NG, hub group "Nigeria driving tests".
```
