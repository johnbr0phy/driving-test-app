# Wiring for `sgftt` (Singapore Final Theory Test, class 3/3A, SG, v1)

Files already written by the builder: `data/singapore-ftt-questions.json` (200, PASS),
`lib/banks/sgftt.ts`, `app/singapore-ftt/*` (5 wrappers copied from `app/singapore-btt/`),
`app/singapore-ftt-practice-test/page.tsx`, `tools/next100/sgftt/*` (spec, sources, `q_*.py`,
`build.py`). Rebuild with `python3 -I tools/next100/sgftt/build.py`. Everything below goes in
shared files.

Format note: four 50-question tests, 45 to pass (the guides' figure; the Traffic Police publish no
format). `passPct: 90` gives `ceil(0.90 * 50) = 45`. Dashboard = 5 training sets + 4 tests = 9 steps.
Every pool is exactly 4x its per-test count (no spares), so no item repeats across tests. Every set
has at least `size` unique questions and none exceeds 60 (set 1 is exactly 60).

## lib/exams.ts

Add `"sgftt"` to the `ExamId` union. Icon `car` already exists.

Block (right after `sgbtt`):

```ts
const sgftt: ExamConfig = {
  id: "sgftt",
  stateCode: "SGFTT",
  idBase: 17900,
  slug: "/singapore-ftt",
  landingPath: "/singapore-ftt-practice-test",
  name: "Singapore FTT Practice Test",
  shortName: "Singapore FTT",
  examLabel: "Final Theory Test",
  fullName: "Singapore Final Theory Test (FTT)",
  questionIdPrefix: "SGFTT-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 90,
  // Source: Singapore Traffic Police, "Final Theory of Driving: The Official Handbook", published
  // online 2.1.2026 (FT-ENG-2126-Revised.pdf). The Traffic Police publish no question count, pass
  // mark or topic weights; guides say 50 questions in 50 minutes, 45 to pass, so passPct 90 =
  // ceil(0.90 * 50) = 45. Counts follow the handbook's chapters by length. Pools are exactly 4x each
  // count. Kept clear of the BTT bank; alcohol limit, demerit points, fines and the driving test
  // section are not asked. All items original. Checked 2026-11-05.
  blueprint: {
    sgftControls: 7,
    sgftTechnique: 8,
    sgftManoeuvres: 9,
    sgftDefensive: 8,
    sgftRoadUsers: 7,
    sgftExpressway: 5,
    sgftEmergency: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 17901, name: "Car Controls & Driving Technique", categories: ["sgftControls", "sgftTechnique"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 2, id: 17902, name: "Lanes, Junctions & Manoeuvres", categories: ["sgftManoeuvres"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 3, id: 17903, name: "Defensive Driving & Conditions", categories: ["sgftDefensive"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 4, id: 17904, name: "Other Road Users & Expressways", categories: ["sgftRoadUsers", "sgftExpressway"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 5, id: 17905, name: "Emergencies & Vehicle Care", categories: ["sgftEmergency"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    sgftControls: "Car Controls & Instruments",
    sgftTechnique: "Moving Off, Gears, Bends & Slopes",
    sgftManoeuvres: "Lanes, Junctions & Manoeuvres",
    sgftDefensive: "Defensive Driving & Conditions",
    sgftRoadUsers: "Pedestrians, Cyclists & Large Vehicles",
    sgftExpressway: "Expressways",
    sgftEmergency: "Emergencies, Accidents & Vehicle Care",
  },
  copy: {
    guestPrompt: "to save your FTT progress and track every question you miss",
    trainingHeading: "Train by handbook chapter",
    trainingSub: "Five sets covering the Final Theory of Driving handbook, from the clutch to expressway exits. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 45 to pass",
    heroSubs: [
      "Five topics, four full tests. Technique and manoeuvres weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your Final Theory Test.",
    ],
    sourceLine: "Based on the Traffic Police Final Theory of Driving handbook (2 January 2026). Original questions; 50 per test, 45 to pass as guides quote.",
    analyticsKey: "sgftt",
  },
};
```

Append `sgftt` to the `EXAMS` array right after `sgbtt`.

Check: 17901-17905 (tests 17901-17904 and sets 17901-17905) are free (grepped 2026-11-05); the
brief reserves 17900.

## lib/banks/all.ts

```ts
import "./sgftt";
```

## types/index.ts

- `QuestionType`: add `| "SGFTT"`.
- `QuestionCategory`, under a `// Singapore FTT` comment (all seven checked free on 2026-11-05):

```ts
  | "sgftControls"
  | "sgftTechnique"
  | "sgftManoeuvres"
  | "sgftDefensive"
  | "sgftRoadUsers"
  | "sgftExpressway"
  | "sgftEmergency"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; the other six carry no category names)

```ts
    sgftControls: "Car Controls & Instruments",
    sgftTechnique: "Moving Off, Gears, Bends & Slopes",
    sgftManoeuvres: "Lanes, Junctions & Manoeuvres",
    sgftDefensive: "Defensive Driving & Conditions",
    sgftRoadUsers: "Pedestrians, Cyclists & Large Vehicles",
    sgftExpressway: "Expressways",
    sgftEmergency: "Emergencies, Accidents & Vehicle Care",
```

## app/globals.css

Light block (hue 0 70% 22%, as the brief assigns; sgbtt is 0 100% 32%, so it differs by 30 points
of saturation and 10 of lightness), then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Singapore FTT theme */
  [data-theme="sgftt"] {
    --brand: 0 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 0 50% 95%;
    --brand-hover: 0 70% 18%;
    --brand-dark: 0 70% 16%;
    --brand-darker: 0 60% 11%;
    --brand-muted: 0 25% 70%;
    --brand-border: 0 30% 78%;
    --brand-border-light: 0 25% 88%;
    --brand-gradient-to: 15 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `sgftt: "Four 50-question mock tests for Singapore's Final Theory Test (class 3 and 3A): car controls, gears and slopes, junctions and parking manoeuvres, defensive driving, other road users, expressways and emergencies, from the Traffic Police Final Theory of Driving handbook.",`
- `EXAM_ORG`: `sgftt: "Singapore Traffic Police · Final Theory Test, class 3 and 3A",`
- Hub group: it is a driving test, so it joins the existing group:
  `{ title: "Singapore driving tests", ids: ["sgbtt", "sgftt"] },`
- `RELATED_OVERRIDES`: change `sgbtt` to `["sgftt", "mykpp", "hkdrive"]` and add
  `sgftt: ["sgbtt", "mykpp", "hkdrive"],` (also consider adding `sgftt` to `mykpp` and `phlto`).
- `SEARCH_ALIASES`:
  `sgftt: "singapore ftt final theory test ftt practice ftt mock test ftt questions final theory of driving handbook class 3 class 3a theory test singapore car licence second theory test traffic police bbdc ssdc cdc",`

## lib/region.ts

`sgftt: "SG",` in `TEST_REGIONS`. It is a driving test, so NOT in `NON_DRIVING_TESTS`.
Suggested `REGION_HOME.SG` update now that Singapore has two tests (optional):

```ts
  SG: {
    title: "Free Singapore BTT and FTT Practice Tests | Tigertest",
    description: "Free Basic Theory Test and Final Theory Test practice for Singapore: 400 original questions on the official handbooks, every answer explained. No account needed.",
    lead: "Practice for the Basic Theory Test and the Final Theory Test, the two theory steps to a Singapore car licence. Original questions, every answer explained. No signup.",
    cta: { label: "Basic Theory Test", href: "/singapore-btt-practice-test" },
    testsTitle: "Singapore driving theory tests",
    testsSub: "200 questions each on Singapore road rules and driving technique, in km/h for left-hand traffic. Four full 50-question tests per test.",
  },
```

The `sg` country share card in `lib/shareCards.ts` (description "Basic Theory Test, college
entrance and IT certifications.") could read "Basic and Final Theory Tests, college entrance and IT
certifications."

## lib/examFacts.ts

```ts
  sgftt: {
    answer:
      "The Final Theory Test (FTT) is the second theory test for a class 3 or 3A car licence in Singapore, taken after the Basic Theory Test and before the practical driving test. It is based on the Traffic Police handbook Final Theory of Driving: vehicle controls, driving techniques, defensive driving, other road users, expressways, emergencies and accidents. You book it at one of the three driving centres, and you need a valid final theory pass to sit the practical test. Guides say it is 50 multiple-choice questions in 50 minutes with 45 needed to pass; the Traffic Police do not publish the format.",
    rows: [
      { label: "Questions", value: "50 multiple-choice (as guides say)" },
      { label: "Pass mark", value: "45 of 50 (as guides say)" },
      { label: "Time", value: "50 minutes (as guides say)" },
      { label: "Licence", value: "Class 3 and 3A (car)" },
      { label: "Before it", value: "Basic Theory Test" },
      { label: "Next step", value: "Practical driving test" },
      { label: "Study material", value: "Final Theory of Driving (2 Jan 2026)" },
      { label: "Run by", value: "Traffic Police, at the three driving centres" },
    ],
    basedOn: "Traffic Police Final Theory of Driving handbook (published online 2.1.2026) and the Traffic Police Online Learning Portal, checked November 2026",
    source: { name: "Singapore Police Force: Online Learning Portal", url: "https://www.police.gov.sg/Knowledge-Hub/Traffic/Traffic-Matters/Online-Learning-Portal" },
  },
```

## lib/shareCards.ts (theme colours, next to `sgbtt`)

```ts
  "sgftt": {
    "color": "hsl(0, 70%, 22%)",
    "tint": "hsl(0, 50%, 95%)"
  },
```

## lib/shareCardCopy.ts

```ts
  sgftt: { title: "Singapore Final Theory Test", description: "Review car controls, manoeuvres, defensive driving, expressways and emergencies for your FTT." },
```

## lib/shareImageUrl.ts

Add `"sgftt"` to `SHARE_COPY_IDS`.

## lib/tigerAssets.ts

Add `sgftt: "driving",` to `BORROWED_SETS` next to `sgbtt` (car test, DMV tiger).

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.
Then run `npx tsx scripts/build-landing-dates.ts`.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing sgftt:singapore-ftt:17901`

## CLAUDE.md (under Additional Exams, after Singapore BTT)

```md
- **Singapore FTT** (Final Theory Test for a class 3/3A car licence, `/singapore-ftt/*`, landing `/singapore-ftt-practice-test`): `data/singapore-ftt-questions.json` (200 original questions from the Traffic Police handbook Final Theory of Driving, published 2.1.2026: controls and instruments 28, moving off/gears/bends/slopes 32, lanes/junctions/manoeuvres 36, defensive driving 32, pedestrians/cyclists/large vehicles 28, expressways 20, emergencies/accidents/maintenance 24), test IDs 17901-17904 (50 questions each), sets 17901-17905, state `SGFTT`, prefix `SGFTT-`, 90% pass (45 of 50, the figure guides quote; the Traffic Police publish no format). 7/8/9/8/7/5/6 per test, no spares. Kept clear of the BTT bank (no signs, markings, parking distances, three-second rule, tunnels or yellow boxes); alcohol limit, demerit points, fines and the driving test section are not asked. Built by `tools/next100/sgftt/build.py`; sources in `tools/next100/sgftt/sources.md`. Region SG, hub group "Singapore driving tests", `[data-theme="sgftt"]` deep maroon (0 70% 22%), borrows the car tiger.
```
