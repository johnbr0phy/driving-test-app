# Wiring for `nzroad` (New Zealand learner licence theory test, NZ, v1)

Files already written by the builder: `data/nz-learner-licence-questions.json` (200, PASS),
`lib/banks/nzroad.ts`, `app/nz-learner-licence/*` (8 wrappers, copied from `app/life-in-the-uk/`),
`app/nz-learner-licence-practice-test/page.tsx`, `tools/next30/nzroad/*` (spec, sources, `q_*.py`,
`build.py`). Rebuild with `python3 -I tools/next30/nzroad/build.py`. Everything below goes in
shared files.

Format note: five real-length tests of 35 (like the real test), 32 to pass. `passPct: 91` gives
`ceil(0.91 * 35) = 32` in `ExamDashboard` (92 would give 33). Dashboard = 5 training sets + 5 tests
= 10 steps. Each pool is 5x its per-test count plus spares (25 training-only items, the last ones in
each pool), so no item repeats across tests.

## lib/exams.ts

Add `"nzroad"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests):

```ts
const nzroad: ExamConfig = {
  id: "nzroad",
  stateCode: "NZROAD",
  idBase: 12000,
  slug: "/nz-learner-licence",
  landingPath: "/nz-learner-licence-practice-test",
  name: "NZ Learner Licence Practice Test",
  shortName: "NZ learner licence",
  examLabel: "NZ learner licence test",
  fullName: "New Zealand learner licence theory test (Class 1 car)",
  questionIdPrefix: "NZRC-",
  icon: "car",
  testCount: 5,
  questionsPerTest: 35,
  passPct: 91,
  // Real test (drive.govt.nz, checked October 2026): 35 multi-choice questions on a computer, at
  // least 32 right to pass, 30 minutes, written from the Official New Zealand Road Code (NZTA,
  // online edition). NZTA publishes no per-topic counts; these follow the Road Code chapters with
  // give way rules weighted heaviest. Five real-length tests; pools are 5x each count plus 25
  // training-only spares. passPct 91 = ceil(0.91 * 35) = 32. Rules as in force on 2026-10-30,
  // including the 1 October 2026 changes (1.5 m passing gap, give way to buses on 60 km/h roads);
  // the 25 January 2027 graduated licence changes are not asked. All items original.
  blueprint: {
    nzLicence: 5,
    nzSigns: 6,
    nzGiveWay: 7,
    nzRoad: 6,
    nzSharing: 5,
    nzParking: 3,
    nzConditions: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 12001, name: "Licences, Alcohol & Conditions", categories: ["nzLicence", "nzConditions"], size: 46, weightLabel: "8 of 35 test questions" },
    { setNumber: 2, id: 12002, name: "Signs, Signals & Markings", categories: ["nzSigns"], size: 34, weightLabel: "6 of 35 test questions" },
    { setNumber: 3, id: 12003, name: "Intersections & Giving Way", categories: ["nzGiveWay"], size: 40, weightLabel: "7 of 35 test questions" },
    { setNumber: 4, id: 12004, name: "Road Position, Speed & Parking", categories: ["nzRoad", "nzParking"], size: 51, weightLabel: "9 of 35 test questions" },
    { setNumber: 5, id: 12005, name: "Sharing the Road", categories: ["nzSharing"], size: 29, weightLabel: "5 of 35 test questions" },
  ],
  categoryLabels: {
    nzLicence: "Licences, Alcohol & Drugs",
    nzSigns: "Signs, Signals & Markings",
    nzGiveWay: "Intersections & Giving Way",
    nzRoad: "Road Position, Speed & Overtaking",
    nzSharing: "Sharing the Road",
    nzParking: "Parking",
    nzConditions: "Night, Weather & Crashes",
  },
  copy: {
    guestPrompt: "to save your learner licence progress and track every question you miss",
    trainingHeading: "Train by Road Code topic",
    trainingSub: "Five sets covering every part of the Road Code the theory test asks about. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 35 questions like the real test, 32 to pass",
    heroSubs: [
      "Five topics, five real-length tests. Give way rules weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your learner licence test.",
    ],
    sourceLine: "Based on the Official New Zealand Road Code. Original questions; 35 per test, 32 to pass like the real test.",
    analyticsKey: "nzroad",
  },
};
```

Append `nzroad` to the `EXAMS` array with the other driving tests.

Check: 12001-12005 (tests and sets) must be free. SPEC.md reserves 12000 for this exam and 12100
for `iedtt`.

## lib/banks/all.ts

```ts
import "./nzroad";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/nzroad.ts`.

## types/index.ts

- `QuestionType`: add `| "NZROAD"`.
- `QuestionCategory`, under a `// NZ learner licence` comment:

```ts
  | "nzLicence"
  | "nzSigns"
  | "nzGiveWay"
  | "nzRoad"
  | "nzSharing"
  | "nzParking"
  | "nzConditions"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nzLicence: "Licences, Alcohol & Drugs",
    nzSigns: "Signs, Signals & Markings",
    nzGiveWay: "Intersections & Giving Way",
    nzRoad: "Road Position, Speed & Overtaking",
    nzSharing: "Sharing the Road",
    nzParking: "Parking",
    nzConditions: "Night, Weather & Crashes",
```

## app/globals.css

Light block (suggested hue 165, a deep teal-green, "pounamu"; re-pick if it clashes), then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* NZ learner licence theme */
  [data-theme="nzroad"] {
    --brand: 165 70% 28%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 165 55% 95%;
    --brand-hover: 165 70% 23%;
    --brand-dark: 165 70% 20%;
    --brand-darker: 165 60% 14%;
    --brand-muted: 165 30% 70%;
    --brand-border: 165 30% 78%;
    --brand-border-light: 165 28% 88%;
    --brand-gradient-to: 200 55% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nzroad: "Five real-length mock tests for New Zealand's learner licence theory test: give way rules, signs, speed, sharing the road, parking and licence conditions, from the Official New Zealand Road Code.",`
- `EXAM_ORG`: `nzroad: "NZTA Waka Kotahi · Class 1 learner licence",`
- Hub group, new: `{ title: "New Zealand driving tests", ids: ["nzroad"] }` (after "Australia driving
  tests"). With one member, add a `RELATED_OVERRIDES` line so `relatedTests()` has neighbours:
  `nzroad: ["aunsw", "auvic", "auqld"],`
- `SEARCH_ALIASES`:
  `nzroad: "nz learner licence test learners licence nz road code test road code quiz nz theory test nzta waka kotahi class 1 learner licence new zealand driving test learner permit nz",`

## lib/region.ts

`nzroad: "NZ",` in `TEST_REGIONS` (new line for NZ). It is a driving test, so NOT in
`NON_DRIVING_TESTS`. `REGION_HOME.NZ` copy is correct: the real test is 35 questions and you need
32 right (drive.govt.nz, checked 2026-10-30).

## lib/examFacts.ts

```ts
  nzroad: {
    answer:
      "The learner licence theory test is the first step to driving a car in New Zealand. It is 35 multi-choice questions on a computer about the Official New Zealand Road Code, and you need at least 32 right to pass; you get 30 minutes. You must be at least 16, pass an eyesight check and show proof of identity. With a learner licence you may drive only with a supervisor who has held a full licence for at least two years, with L plates on the front and back.",
    rows: [
      { label: "Questions", value: "35 multi-choice" },
      { label: "Pass mark", value: "32 of 35" },
      { label: "Time", value: "30 minutes" },
      { label: "Minimum age", value: "16" },
      { label: "Also required", value: "Eyesight check and proof of identity" },
      { label: "Retakes", value: "Fail twice in a day: wait 10 working days" },
      { label: "Study material", value: "Official New Zealand Road Code" },
      { label: "Run by", value: "NZTA Waka Kotahi, at licensing agents" },
    ],
    basedOn: "drive.govt.nz learner licence guidance and the Official New Zealand Road Code, checked October 2026",
    source: { name: "drive.govt.nz: Doing the learner licence test", url: "https://drive.govt.nz/learner-licence/doing-the-learner-licence-test" },
  },
```
(Fee left out: house style avoids money figures; drive.govt.nz listed the learner application fee as $96.10 on 2026-10-30.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED` (caon is not either).

## lib/tigerAssets.ts

Falls back to the DMV tiger. Do not add to `TIGER_EXAM_IDS` without reviewed artwork.

## Landing breadcrumbs

The brief asks for `<ExamLandingBreadcrumbs examId>`, but no such component exists in this tree and
the template landings (caon, uklitu) do not render one. If the integrator adds it, place it right
after the JSON-LD script in `app/nz-learner-licence-practice-test/page.tsx`. The landing's FAQ is
one `faqs` array rendered both as JSON-LD and on the page, so the two always match.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nzroad:nz-learner-licence:12001`

## CLAUDE.md (under Additional Exams)

```md
- **NZ Learner Licence** (New Zealand Class 1 learner licence theory test, `/nz-learner-licence/*`, landing `/nz-learner-licence-practice-test`): `data/nz-learner-licence-questions.json` (200 original questions from the Official New Zealand Road Code: licences/alcohol 28, signs and markings 34, give way 40, road position/speed 34, sharing the road 29, parking 17, night/weather/crashes 18), five real-length tests: test IDs 12001-12005 (35 questions each), sets 12001-12005 (by topic), state `NZROAD`, 91% pass (32 of 35 like the real test). 5/6/7/6/5/3/3 per test; the last items of each pool (25 in all) are training-only. Rules as in force October 2026, including the 1 October 2026 changes (1.5 m passing gap, give way to buses on roads of 60 km/h or less); the 25 January 2027 graduated licensing changes are on the landing only. Signs are described in words. Built by `tools/next30/nzroad/build.py`; sources in `tools/next30/nzroad/sources.md`. Region NZ, hub group "New Zealand driving tests".
```
