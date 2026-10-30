# Wiring for `iedtt` (Ireland Driver Theory Test, IE, v1)

Files already written by the builder: `data/ireland-driver-theory-questions.json` (200, PASS),
`lib/banks/iedtt.ts`, `app/ireland-driver-theory/*` (8 wrappers, copied from `app/ontario-g1/`),
`app/ireland-driver-theory-test/page.tsx`, `tools/next30/iedtt/*` (spec, sources, `q_*.py`,
`build.py`). Rebuild with `python3 tools/next30/iedtt/build.py` (writes the data file).
Everything below goes in shared files.

Format note: five real-length tests of 40 questions (testCount 5, questionsPerTest 40), five
test-linked training sets of 40. Do NOT use `testSets(12100, 5)`: it hardcodes `size: 50`, and a
40-question set could then never be completed (the dashboard needs `size` mastered). The explicit
array below sets `size: 40`. Dashboard = 5 sets + 5 tests = 10 steps. Pass line
`Math.ceil(0.87 * 40) = 35`, the real 35 of 40 (`passPct: 88` would give 36). Pools are exactly
5x the per-test counts, so no item repeats across tests.

## lib/exams.ts

Add `"iedtt"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests):

```ts
const iedtt: ExamConfig = {
  id: "iedtt",
  stateCode: "IEDTT",
  idBase: 12100,
  slug: "/ireland-driver-theory",
  landingPath: "/ireland-driver-theory-test",
  name: "Ireland Driver Theory Test Practice",
  shortName: "Theory Test (IE)",
  examLabel: "Driver Theory Test",
  fullName: "Ireland Driver Theory Test (car, RSA)",
  questionIdPrefix: "IEDTT-",
  icon: "car",
  testCount: 5,
  questionsPerTest: 40,
  passPct: 87,
  // RSA Driver Theory Test, car/bike (BW, AM), per theorytest.ie FAQs checked 2026-10-30:
  // 40 multiple-choice questions on computer at a test centre, 35 correct to pass, 45 minutes,
  // certificate valid two years, needed before a first learner permit. The RSA publishes no
  // per-category weights, so counts follow the chapters of the RSA Rules of the Road (current
  // online edition; 2026 print edition), signs and markings 12 of 40. ceil(0.87 x 40) = 35.
  // The official RSA question bank is copyrighted and was not used: all items original.
  blueprint: {
    iedttLicence: 4,
    iedttSigns: 8,
    iedttMarkings: 4,
    iedttRules: 8,
    iedttMotorway: 3,
    iedttUsers: 5,
    iedttSafety: 5,
    iedttConditions: 3,
  },
  trainingSets: [1, 2, 3, 4, 5].map((n) => ({
    setNumber: n,
    id: 12100 + n,
    name: `Training Set ${n}`,
    categories: [],
    size: 40,
    weightLabel: "",
    test: n,
  })),
  categoryLabels: {
    iedttLicence: "Licences, Permits & Documents",
    iedttSigns: "Traffic Signs",
    iedttMarkings: "Road Markings & Traffic Lights",
    iedttRules: "Speed, Junctions & Overtaking",
    iedttMotorway: "Motorways, Tunnels & Parking",
    iedttUsers: "Vulnerable Road Users",
    iedttSafety: "Alcohol, Distraction & Seatbelts",
    iedttConditions: "Weather, Breakdowns & Collisions",
  },
  copy: {
    guestPrompt: "to save your theory test progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Five sets, one per practice test: Set 1 holds exactly the 40 questions of Test 1, and so on. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 40 questions, 35 to pass, like the real test",
    heroSubs: [
      "Five real-length tests on the Rules of the Road. You need 35 of 40.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your theory test at theorytest.ie.",
    ],
    sourceLine: "Original questions written from the RSA Rules of the Road (2026). The real Driver Theory Test is 40 questions and you need 35 right.",
    analyticsKey: "iedtt",
  },
};
```

If `testSets` gains a size argument later, `trainingSets: testSets(12100, 5, 40)` is equivalent.

Append `iedtt` to the `EXAMS` array with the other driving tests.

Check: 12101-12105 (tests and sets) must be free (SPEC row 15 assigns idBase 12100).

## lib/banks/all.ts

```ts
import "./iedtt";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/iedtt.ts`.

## types/index.ts

- `QuestionType`: add `| "IEDTT"`.
- `QuestionCategory`, under a `// Ireland Driver Theory Test` comment:

```ts
  | "iedttLicence"
  | "iedttSigns"
  | "iedttMarkings"
  | "iedttRules"
  | "iedttMotorway"
  | "iedttUsers"
  | "iedttSafety"
  | "iedttConditions"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    iedttLicence: "Licences, Permits & Documents",
    iedttSigns: "Traffic Signs",
    iedttMarkings: "Road Markings & Traffic Lights",
    iedttRules: "Speed, Junctions & Overtaking",
    iedttMotorway: "Motorways, Tunnels & Parking",
    iedttUsers: "Vulnerable Road Users",
    iedttSafety: "Alcohol, Distraction & Seatbelts",
    iedttConditions: "Weather, Breakdowns & Collisions",
```

## app/globals.css

Suggested hue 145 (Irish green; re-pick if it clashes with another green), then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Ireland Driver Theory Test theme */
  [data-theme="iedtt"] {
    --brand: 145 63% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 145 55% 95%;
    --brand-hover: 145 63% 27%;
    --brand-dark: 145 63% 24%;
    --brand-darker: 145 60% 15%;
    --brand-muted: 145 30% 70%;
    --brand-border: 145 32% 78%;
    --brand-border-light: 145 30% 88%;
    --brand-gradient-to: 30 90% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `iedtt: "Ireland's Driver Theory Test for a car: road signs, road markings, speed limits, roundabouts, motorways, learner rules and safe driving, in five real-length tests written from the RSA Rules of the Road.",`
- `EXAM_ORG`: `iedtt: "RSA (Ireland) · car theory test before a learner permit",`
- Hub group (new): `{ title: "Ireland driving tests", ids: ["iedtt"] }`, next to the UK and Canada
  driving groups.
- `SEARCH_ALIASES`:
  `iedtt: "driver theory test ireland irish theory test dtt rsa theory test rules of the road ireland learner permit test ndls theory test ireland practice prometric theorytest.ie",`
- `RELATED_OVERRIDES` (the Ireland group has no siblings yet):
  `iedtt: ["ukcar", "nzroad", "ukmoto"],` (drop `nzroad` if not merged; `caon` is a fine third).

## lib/region.ts

`iedtt: "IE",` in `TEST_REGIONS`. Not in `NON_DRIVING_TESTS` (it is a driving test).

`REGION_HOME.IE` copy is correct as written: the real test is 40 questions, 35 to pass, and it
is needed before a first learner permit (theorytest.ie FAQs, checked 2026-10-30). Optional
precision: "before your first learner permit".

## lib/examFacts.ts

```ts
  iedtt: {
    answer:
      "The Driver Theory Test is the computer test you must pass in Ireland before you can apply for your first learner permit. The car test is 40 multiple-choice questions in 45 minutes, and you need 35 correct to pass. It is run for the Road Safety Authority (RSA) at test centres around the country, the questions are based on the Rules of the Road, and your pass certificate is valid for two years.",
    rows: [
      { label: "Questions", value: "40 multiple choice" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "35 of 40 (87.5%)" },
      { label: "Where", value: "On computer at a test centre, booked at theorytest.ie" },
      { label: "Needed for", value: "Your first learner permit" },
      { label: "Certificate valid", value: "2 years" },
      { label: "Study material", value: "RSA Rules of the Road" },
      { label: "Run by", value: "Road Safety Authority (RSA)" },
    ],
    basedOn: "theorytest.ie FAQs and the RSA Rules of the Road, checked October 2026",
    source: { name: "Official RSA Driver Theory Test", url: "https://www.theorytest.ie/" },
  },
```
(Fee left out: house style avoids money, and theorytest.ie points to its booking page for current fees.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not teacher-led (the landing renders no `ExamClassFaq`, like `caon`).

## Landing breadcrumbs

No `ExamLandingBreadcrumbs` component exists in this tree and the `caon` template renders none.
If the integrator adds it, place it right after the JSON-LD script in
`app/ireland-driver-theory-test/page.tsx`.

## lib/tigerAssets.ts, components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: falls back to the DMV tiger; `car` icon exists.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 40, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing iedtt:ireland-driver-theory:12101`
(the landing references `/landing/iedtt-mobile.png` and `/landing/iedtt-desktop.png`).

## CLAUDE.md (under Additional Exams)

```md
- **Ireland Driver Theory Test** (car theory test before a first learner permit, `/ireland-driver-theory/*`, landing `/ireland-driver-theory-test`): `data/ireland-driver-theory-questions.json` (200 original questions from the RSA Rules of the Road: licences/permits 20, signs 40, markings and lights 20, speed/junctions/overtaking 40, motorways/parking 15, vulnerable road users 25, alcohol/distraction/seatbelts 25, weather/breakdowns/collisions 15), five real-length tests: test IDs 12101-12105 (40 questions each), sets 12101-12105 (one per test, `size: 40`, not `testSets()`), state `IEDTT`, 87% pass (35 of 40, like the real test). 4/8/4/8/3/5/5/3 per test. The RSA's official question bank is copyrighted and never used; signs are described in words. Built by `tools/next30/iedtt/build.py`; sources in `tools/next30/iedtt/sources.md`. Region `IE`, hub group "Ireland driving tests".
```
