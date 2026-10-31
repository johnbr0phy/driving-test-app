# Wiring for `hkdrive` (Hong Kong Transport Department driving written test, private car, v1)

Files already written by the builder: `data/hong-kong-driving-questions.json` (200, PASS),
`lib/banks/hkdrive.ts`, `app/hong-kong-driving-test/*` (8 wrappers, copied from
`app/nz-learner-licence/`), `app/hong-kong-driving-theory-test/page.tsx`,
`tools/countries/hkdrive/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/countries/hkdrive/build.py`. Everything below goes in shared files.

Format note: seven real-length tests of 20 (like the real Part A test), 16 to pass. `passPct: 80`
gives `ceil(0.80 * 20) = 16` in `ExamDashboard`. Dashboard = 5 training sets + 7 tests = 12 steps.
Each pool is 7x its per-test count plus spares (60 training-only items, the last ones in each
pool: 4/6/5/6/8/8/6/17), so no item repeats across tests. The real test has three options per
question; this bank uses four like every Tigertest bank, and the landing says so.

## Landing breadcrumbs

The landing imports `ExamLandingBreadcrumbs` from `@/components/exam/ExamLandingBreadcrumbs` and
renders `<ExamLandingBreadcrumbs examId="hkdrive" />` right after the JSON-LD script, as the brief
asks. That component exists on main (`/Users/johnbrophy/driving-test-app/components/exam/`) but
NOT in this worktree, so the landing will not type-check until main (or that one file) is merged
into `more-countries`. If the integrator does not bring it in, delete the import line and the
`<ExamLandingBreadcrumbs ... />` line.

## lib/exams.ts

Add `"hkdrive"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests):

```ts
const hkdrive: ExamConfig = {
  id: "hkdrive",
  stateCode: "HKDRIVE",
  idBase: 12900,
  slug: "/hong-kong-driving-test",
  landingPath: "/hong-kong-driving-theory-test",
  name: "Hong Kong Driving Theory Practice Test",
  shortName: "Hong Kong driving test",
  examLabel: "Hong Kong driving written test",
  fullName: "Hong Kong Transport Department driving written test (Part A, private car)",
  questionIdPrefix: "HKDRV-",
  icon: "car",
  testCount: 7,
  questionsPerTest: 20,
  passPct: 80,
  // Real test (td.gov.hk "Part A Test (Written Test)", checked 2026-10-31): 20 multiple-choice
  // questions with three options each, 16 or more right to pass, 20 minutes, computerised at the
  // Cheung Sha Wan written test centre, mainly based on the Road Users' Code (TD, effective
  // 19 June 2020) plus recent law changes. TD publishes no per-topic counts; this split follows
  // the Code's chapters with signs and markings weighted heaviest. Seven real-length tests; pools
  // are 7x each count plus 60 training-only spares. passPct 80 = ceil(0.8 * 20) = 16. Includes
  // the eDL (15 Sep 2025), child restraints for under 8s below 1.35 m (1 Nov 2025) and the
  // two-device, 19 cm rule for phones in front of drivers (25 Jan 2026). All items original.
  blueprint: {
    hkLicence: 3,
    hkSigns: 4,
    hkJunctions: 3,
    hkRoad: 3,
    hkSafety: 2,
    hkSharing: 2,
    hkParking: 2,
    hkConditions: 1,
  },
  trainingSets: [
    { setNumber: 1, id: 12901, name: "Licences, Seat Belts & Phones", categories: ["hkLicence", "hkSafety"], size: 47, weightLabel: "5 of 20 test questions" },
    { setNumber: 2, id: 12902, name: "Signs, Signals & Markings", categories: ["hkSigns"], size: 34, weightLabel: "4 of 20 test questions" },
    { setNumber: 3, id: 12903, name: "Junctions & Sharing the Road", categories: ["hkJunctions", "hkSharing"], size: 48, weightLabel: "5 of 20 test questions" },
    { setNumber: 4, id: 12904, name: "Speed, Lanes & Parking", categories: ["hkRoad", "hkParking"], size: 47, weightLabel: "5 of 20 test questions" },
    { setNumber: 5, id: 12905, name: "Night, Weather & Emergencies", categories: ["hkConditions"], size: 24, weightLabel: "1 of 20 test questions" },
  ],
  categoryLabels: {
    hkLicence: "Licences, Alcohol & Drugs",
    hkSigns: "Signs, Signals & Markings",
    hkJunctions: "Junctions, Roundabouts & Crossings",
    hkRoad: "Speed, Lanes & Expressways",
    hkSafety: "Seat Belts, Children & Phones",
    hkSharing: "Sharing the Road",
    hkParking: "Stopping & Parking",
    hkConditions: "Night, Weather & Emergencies",
  },
  copy: {
    guestPrompt: "to save your written test progress and track every question you miss",
    trainingHeading: "Train by Road Users' Code topic",
    trainingSub: "Five sets covering every part of the Road Users' Code the written test asks about. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 20 questions like the real test, 16 to pass",
    heroSubs: [
      "Five topics, seven real-length tests. Signs and markings weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your written test.",
    ],
    sourceLine: "Based on the Hong Kong Road Users' Code. Original questions; 20 per test, 16 to pass like the real test (which has 3 options per question).",
    analyticsKey: "hkdrive",
  },
};
```

Append `hkdrive` to the `EXAMS` array with the other driving tests.

Check: 12901-12907 (tests) and 12901-12905 (sets) must be free; the brief reserves 12900 for this exam.

## lib/banks/all.ts

```ts
import "./hkdrive";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/hkdrive.ts`.

## types/index.ts

- `QuestionType`: add `| "HKDRIVE"`.
- `QuestionCategory`, under a `// Hong Kong driving written test` comment (none of these keys was
  taken when checked 2026-10-31):

```ts
  | "hkLicence"
  | "hkSigns"
  | "hkJunctions"
  | "hkRoad"
  | "hkSafety"
  | "hkSharing"
  | "hkParking"
  | "hkConditions"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    hkLicence: "Licences, Alcohol & Drugs",
    hkSigns: "Signs, Signals & Markings",
    hkJunctions: "Junctions, Roundabouts & Crossings",
    hkRoad: "Speed, Lanes & Expressways",
    hkSafety: "Seat Belts, Children & Phones",
    hkSharing: "Sharing the Road",
    hkParking: "Stopping & Parking",
    hkConditions: "Night, Weather & Emergencies",
```

## app/globals.css

Light block (hue 314 100% 42% from the brief, a bauhinia magenta), then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Hong Kong driving written test theme */
  [data-theme="hkdrive"] {
    --brand: 314 100% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 314 80% 96%;
    --brand-hover: 314 100% 36%;
    --brand-dark: 314 100% 30%;
    --brand-darker: 314 90% 20%;
    --brand-muted: 314 40% 72%;
    --brand-border: 314 45% 80%;
    --brand-border-light: 314 45% 90%;
    --brand-gradient-to: 340 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `hkdrive: "Seven real-length mock tests for the Hong Kong Transport Department driving written test: signs and markings, junctions and roundabouts, expressways and tunnels, seat belts and child restraints, parking and your learner and probationary rules, from the Road Users' Code.",`
- `EXAM_ORG`: `hkdrive: "Transport Department (Hong Kong) · Part A written test, private car",`
- Hub group: put it with the other Asian driving tests from this wave if the integrator makes one
  (e.g. `{ title: "Asia driving tests", ids: ["sgbtt", "mykpp", "phlto", "hkdrive"] }`); otherwise
  a new `{ title: "Hong Kong driving tests", ids: ["hkdrive"] }` plus a `RELATED_OVERRIDES` line so
  `relatedTests()` has neighbours: `hkdrive: ["sgbtt", "mykpp", "phlto"],`
- `SEARCH_ALIASES`:
  `hkdrive: "hong kong driving test hk driving test written test hong kong driving theory test transport department written test part a test road users code test hk learner driver test private car written test hong kong driving licence test td written test",`

## lib/region.ts

`hkdrive: "HK",` in `TEST_REGIONS` (`HK` already exists in the `Region` union). It is a driving
test, so NOT in `NON_DRIVING_TESTS`. If `REGION_HOME.HK` copy mentions the test, it should say
20 questions with 16 to pass (td.gov.hk, checked 2026-10-31).

## lib/examFacts.ts

```ts
  hkdrive: {
    answer:
      "The Part A written test is the theory step to a private car driving licence in Hong Kong. It is 20 multiple-choice questions, each with three options, on a computer at the Transport Department's written test centre in Cheung Sha Wan, and you need at least 16 right to pass; you get 20 minutes. The questions are mainly based on the Road Users' Code and recent changes to traffic law. You must be at least 18 to drive a private car, and a learner may drive only with a licensed driving instructor, with L-plates front and rear, and never on an expressway.",
    rows: [
      { label: "Questions", value: "20 multiple-choice, 3 options each" },
      { label: "Pass mark", value: "16 of 20" },
      { label: "Time", value: "20 minutes" },
      { label: "Where", value: "TD written test centre, Cheung Sha Wan Government Offices" },
      { label: "Minimum age", value: "18 (private car)" },
      { label: "Study material", value: "Road Users' Code (Transport Department)" },
      { label: "After passing", value: "Probationary licence for at least 12 months" },
      { label: "Run by", value: "Transport Department, Hong Kong" },
    ],
    basedOn: "td.gov.hk Part A written test page and the Road Users' Code, checked October 2026",
    source: { name: "Transport Department: Part A Test (Written Test)", url: "https://www.td.gov.hk/en/public_services/licences_and_permits/driving_test/wt/index.html" },
  },
```
(Fee left out: house style avoids money figures.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Do not add to `TIGER_EXAM_IDS` without reviewed artwork.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing hkdrive:hong-kong-driving-test:12901`

## CLAUDE.md (under Additional Exams)

```md
- **Hong Kong Driving Test** (Transport Department Part A written test, private car, `/hong-kong-driving-test/*`, landing `/hong-kong-driving-theory-test`): `data/hong-kong-driving-questions.json` (200 original questions from the Road Users' Code: licences/alcohol 25, signs and markings 34, junctions/roundabouts/crossings 26, speed/lanes/expressways 27, seat belts/children/phones 22, sharing the road 22, stopping/parking 20, night/weather/emergencies 24), seven real-length tests: test IDs 12901-12907 (20 questions each), sets 12901-12905 (by topic), state `HKDRIVE`, prefix `HKDRV-`, 80% pass (16 of 20 like the real test, which has 3 options per question; ours have 4). 3/4/3/3/2/2/2/1 per test; the last items of each pool (60 in all) are training-only. Includes the eDL (15 Sep 2025), child restraints for under 8s below 1.35 m (1 Nov 2025) and the two-device, 19 cm rule for phones in front of drivers (25 Jan 2026). Left-hand traffic. Signs are described in words. Built by `tools/countries/hkdrive/build.py`; sources in `tools/countries/hkdrive/sources.md`. Region HK.
```
