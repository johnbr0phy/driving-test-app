# Wiring for `sgrtt` (Singapore Riding Theory Test, class 2B motorcycle, SG, v1)

Files already written by the builder: `data/singapore-rtt-questions.json` (200, validator PASS,
key-longest 18%, key>1.2x 12%), `lib/banks/sgrtt.ts`, `app/singapore-rtt/*` (5 wrappers copied
from `app/singapore-ftt/`: layout, redirect, dashboard, drill, stats), `app/singapore-rtt-practice-test/page.tsx`,
`tools/next100/sgrtt/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/sgrtt/build.py`. Everything below goes in shared files.

Format note: four 50-question tests with a 45 of 50 target. The Traffic Police publish no RTT
format; 50/45 is the BTT/FTT figure guides quote and is labelled Tigertest's target everywhere (not
confirmed for the RTT this session). `passPct: 90` gives `ceil(0.90 * 50) = 45`. Dashboard = 5
training sets + 4 tests = 9 steps. Every pool is exactly 4x its per-test count (no spares). Every set
has at least `size` unique questions and none exceeds 60 (set 1 is exactly 60).

## lib/exams.ts

Add `"sgrtt"` to the `ExamId` union. Icon `bike` already exists (used by `zak53moto`).

Block (right after `sgftt`):

```ts
const sgrtt: ExamConfig = {
  id: "sgrtt",
  stateCode: "SGRTT",
  idBase: 21600,
  slug: "/singapore-rtt",
  landingPath: "/singapore-rtt-practice-test",
  name: "Singapore RTT Practice Test",
  shortName: "Singapore RTT",
  examLabel: "Riding Theory Test",
  fullName: "Singapore Riding Theory Test (RTT)",
  questionIdPrefix: "SGRTT-",
  icon: "bike",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 90,
  // Source: Singapore Traffic Police, "Riding Theory Booklet, Official Handbook", published online
  // 2.1.2026 (RT-ENG-2126.pdf). The Traffic Police publish no RTT question count, pass mark or topic
  // weights; 50 questions with 45 to pass is Tigertest's target (the BTT/FTT format guides quote),
  // so passPct 90 = ceil(0.90 * 50) = 45. Counts follow the handbook's chapters by length. Pools are
  // exactly 4x each count. Kept clear of the BTT and FTT banks; alcohol figures, demerit points,
  // fines, the practical test and the circuit course timings are not asked. All items original.
  // Checked 2026-11-05.
  blueprint: {
    sgrtRider: 7,
    sgrtMachine: 8,
    sgrtControls: 8,
    sgrtSkills: 8,
    sgrtConditions: 7,
    sgrtDefensive: 7,
    sgrtGeneral: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 21601, name: "Rider & Motorcycle", categories: ["sgrtRider", "sgrtMachine"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 2, id: 21602, name: "Controls, Gears & Braking", categories: ["sgrtControls"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 3, id: 21603, name: "Moving Off, Turns & Junctions", categories: ["sgrtSkills"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 4, id: 21604, name: "Road Conditions & Defensive Riding", categories: ["sgrtConditions", "sgrtDefensive"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 5, id: 21605, name: "Pillions, Breakdowns & Accidents", categories: ["sgrtGeneral"], size: 20, weightLabel: "5 of 50 test questions" },
  ],
  categoryLabels: {
    sgrtRider: "Rider Fitness, Gear & Posture",
    sgrtMachine: "Motorcycle Parts, Checks & Handling",
    sgrtControls: "Controls, Gears & Braking",
    sgrtSkills: "Moving Off, Turns & Junctions",
    sgrtConditions: "Bends, Slopes, Weather & Expressways",
    sgrtDefensive: "Defensive Riding & Other Road Users",
    sgrtGeneral: "Pillions, Breakdowns & Accidents",
  },
  copy: {
    guestPrompt: "to save your RTT progress and track every question you miss",
    trainingHeading: "Train by handbook chapter",
    trainingSub: "Five sets covering the Riding Theory Booklet, from chain slack to emergency stops and pillions. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, target 45",
    heroSubs: [
      "Five topics, four full tests. The motorcycle, its controls and riding skills weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your Riding Theory Test.",
    ],
    sourceLine: "Based on the Traffic Police Riding Theory Booklet (2 January 2026). Original questions; 50 per test with Tigertest's 45 target (the Traffic Police publish no RTT format).",
    analyticsKey: "sgrtt",
  },
};
```

Append `sgrtt` to the `EXAMS` array right after `sgftt`.

Check: 21601-21605 (tests 21601-21604 and sets 21601-21605) were free in `lib/exams.ts` and
`lib/v2` on 2026-11-05 (grep `216[0-9][0-9]`); the brief reserves 21600.

## lib/banks/all.ts

```ts
import "./sgrtt";
```

## types/index.ts

- `QuestionType`: add `| "SGRTT"`.
- `QuestionCategory`, under a `// Singapore RTT` comment (all seven grepped free on 2026-11-05):

```ts
  | "sgrtRider"
  | "sgrtMachine"
  | "sgrtControls"
  | "sgrtSkills"
  | "sgrtConditions"
  | "sgrtDefensive"
  | "sgrtGeneral"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; the other six carry no category names)

```ts
    sgrtRider: "Rider Fitness, Gear & Posture",
    sgrtMachine: "Motorcycle Parts, Checks & Handling",
    sgrtControls: "Controls, Gears & Braking",
    sgrtSkills: "Moving Off, Turns & Junctions",
    sgrtConditions: "Bends, Slopes, Weather & Expressways",
    sgrtDefensive: "Defensive Riding & Other Road Users",
    sgrtGeneral: "Pillions, Breakdowns & Accidents",
```

## app/globals.css

Light block (hue 105 60% 22%, as the brief assigns, a deep leaf green), then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Singapore RTT theme */
  [data-theme="sgrtt"] {
    --brand: 105 60% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 105 40% 95%;
    --brand-hover: 105 60% 18%;
    --brand-dark: 105 60% 16%;
    --brand-darker: 105 50% 11%;
    --brand-muted: 105 20% 70%;
    --brand-border: 105 25% 78%;
    --brand-border-light: 105 20% 88%;
    --brand-gradient-to: 120 30% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `sgrtt: "Four 50-question mock tests for Singapore's Riding Theory Test (class 2B motorcycle): rider fitness and protective gear, the motorcycle and its pre-riding checks, controls, gears and braking, turns and junctions, bends, rain and expressways, defensive riding, pillions and breakdowns, from the Traffic Police Riding Theory Booklet.",`
- `EXAM_ORG`: `sgrtt: "Singapore Traffic Police · Riding Theory Test, class 2B",`
- Hub group: it is a driving test, so it joins the existing group:
  `{ title: "Singapore driving tests", ids: ["sgbtt", "sgftt", "sgrtt"] },`
- `RELATED_OVERRIDES`: add `sgrtt: ["sgbtt", "sgftt", "moto"],` and consider adding `sgrtt` to
  `sgbtt` (`["sgftt", "sgrtt", "mykpp"]`) and `sgftt` (`["sgbtt", "sgrtt", "mykpp"]`).
- `SEARCH_ALIASES`:
  `sgrtt: "singapore rtt riding theory test rtt practice rtt mock test rtt questions riding theory booklet riding theory handbook class 2b motorcycle theory test singapore motorbike licence 2b licence traffic police bbdc ssdc cdc",`

## lib/region.ts

`sgrtt: "SG",` in `TEST_REGIONS`. It is a driving test, so NOT in `NON_DRIVING_TESTS`.
Suggested `REGION_HOME.SG` update (optional), keeping the RES mention already there:

```ts
  SG: {
    title: "Free Singapore BTT, FTT, RTT & RES Exam Practice | Tigertest",
    description: "Free practice for Singapore: the Basic, Final and Riding Theory Tests for a driving or motorcycle licence and the RES exam for property agents. No account needed.",
    lead: "Practice for the Basic Theory Test, then the Final Theory Test for a car or the Riding Theory Test for a class 2B motorcycle, and the RES exam for real estate salespersons. Original questions, every answer explained. No signup.",
    cta: { label: "Basic Theory Test", href: "/singapore-btt-practice-test" },
    testsTitle: "Basic, Final and Riding Theory Tests",
    testsSub: "200 questions each on Singapore road rules, driving and riding technique, in km/h for left-hand traffic. Four full 50-question tests each.",
  },
```

If `faqsFor("SG")` names the theory tests, add one line: "Motorcycle learners take the Riding Theory
Test (RTT) after the BTT instead of the FTT; Tigertest has a free RTT practice test too."

## lib/examFacts.ts

```ts
  sgrtt: {
    answer:
      "The Riding Theory Test (RTT) is the second theory test for a class 2B motorcycle licence in Singapore, taken after the Basic Theory Test and before the Practical Riding Test. The Traffic Police say it tests riding safety, proper riding techniques and your interaction with other road users, based on their Riding Theory Booklet. After passing it you must pass the Practical Riding Test within one year, or take the RTT again. The Traffic Police do not publish the question count or pass mark; Tigertest's mock tests use 50 questions with a target of 45, the format guides quote for the BTT and FTT.",
    rows: [
      { label: "Questions", value: "Not published (Tigertest mocks: 50)" },
      { label: "Pass mark", value: "Not published (Tigertest target: 45 of 50)" },
      { label: "Licence", value: "Class 2B (below 200 cc, or below 15 kW electric)" },
      { label: "Before it", value: "Basic Theory Test" },
      { label: "Next step", value: "Practical Riding Test, within one year" },
      { label: "Study material", value: "Riding Theory Booklet (2 Jan 2026)" },
      { label: "Practice sets", value: "English, Malay, Mandarin, Tamil (Traffic Police)" },
      { label: "Run by", value: "Traffic Police; booked through your driving centre" },
    ],
    basedOn: "Traffic Police Riding Theory Booklet, Official Handbook (published online 2.1.2026), the Online Learning Portal and the Practise Driving and Riding Theory Test page, checked November 2026",
    source: { name: "Singapore Police Force: Online Learning Portal", url: "https://www.police.gov.sg/Knowledge-Hub/Traffic/Traffic-Matters/Online-Learning-Portal" },
  },
```

## lib/shareCards.ts (theme colours, next to `sgftt`)

```ts
  "sgrtt": {
    "color": "hsl(105, 60%, 22%)",
    "tint": "hsl(105, 40%, 95%)"
  },
```

The `sg` country share card description could read "Basic, Final and Riding Theory Tests, real estate and IT certifications." (adjust to whatever it says after batch 1).

## lib/shareCardCopy.ts

```ts
  sgrtt: { title: "Singapore Riding Theory Test", description: "Review motorcycle controls, braking, junctions, defensive riding and pillions for your RTT." },
```

## lib/shareImageUrl.ts

Add `"sgrtt"` to `SHARE_COPY_IDS`.

## lib/tigerAssets.ts

Add `sgrtt: "moto",` to `BORROWED_SETS` next to `sgftt` (motorcycle test, the motorcycle tiger, as
`zak53moto` and `ukmoto` do).

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

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing sgrtt:singapore-rtt:21601`

## CLAUDE.md (under Additional Exams, after Singapore FTT)

```md
- **Singapore RTT** (Riding Theory Test for a class 2B motorcycle licence, `/singapore-rtt/*`, landing `/singapore-rtt-practice-test`): `data/singapore-rtt-questions.json` (200 original questions from the Traffic Police Riding Theory Booklet, published 2.1.2026: rider fitness, gear and posture 28, motorcycle parts, checks and handling 32, controls, gears and braking 32, moving off, turns and junctions 32, bends, slopes, weather and expressways 28, defensive riding and other road users 28, pillions, breakdowns and accidents 20), test IDs 21601-21604 (50 questions each), sets 21601-21605, state `SGRTT`, prefix `SGRTT-`, 90% pass (45 of 50, Tigertest's target: the Traffic Police publish no RTT format). 7/8/8/8/7/7/5 per test, no spares. Kept clear of the BTT and FTT banks; alcohol figures, demerit points, fines, the practical test, circuit course timings and the handbook's conflicting following-distance rules (except the six-second rule) are not asked. Built by `tools/next100/sgrtt/build.py`; sources in `tools/next100/sgrtt/sources.md`. Region SG, hub group "Singapore driving tests", `[data-theme="sgrtt"]` deep leaf green (105 60% 22%), borrows the motorcycle tiger.
```
