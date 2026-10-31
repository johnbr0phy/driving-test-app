# Wiring for `aerta` (UAE driving theory test, RTA Dubai knowledge test, AE, v1)

Files already written by the builder: `data/uae-rta-questions.json` (200, PASS),
`lib/banks/aerta.ts`, `app/uae-driving-theory/*` (8 wrappers, copied from `app/nz-learner-licence/`),
`app/uae-driving-theory-test/page.tsx`, `tools/countries/aerta/*` (spec, sources, `q_*.py`,
`build.py`). Rebuild with `python3 -I tools/countries/aerta/build.py`. Everything below goes in
shared files.

Format note: four real-length tests of 40 (like the real test), 30 to pass. `passPct: 75` gives
`ceil(0.75 * 40) = 30` in `ExamDashboard`. Dashboard = 5 training sets + 4 tests = 9 steps. Each pool
is 4x its per-test count plus spares (40 training-only items, the last ones in each pool), so no item
repeats across tests.

## lib/exams.ts

Add `"aerta"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests):

```ts
const aerta: ExamConfig = {
  id: "aerta",
  stateCode: "AERTA",
  idBase: 12500,
  slug: "/uae-driving-theory",
  landingPath: "/uae-driving-theory-test",
  name: "UAE Driving Theory Practice Test",
  shortName: "UAE driving theory",
  examLabel: "RTA theory test",
  fullName: "UAE driving theory test (RTA Dubai knowledge test, light vehicle)",
  questionIdPrefix: "AERTA-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 40,
  passPct: 75,
  // Real test (rta.ae service 510, Knowledge Test, checked 2026-10-31): 40 questions, at least 30
  // correct to pass, a valid learning permit and the theory lectures (8 hours for a light vehicle)
  // first. RTA publishes no per-topic counts; this mix is Tigertest's own, weighted to signs and right
  // of way. Rules are federal (Federal Decree-Law 14 of 2024, in force 29 March 2025, and Ministerial
  // Resolution 178 of 2017 as amended in 2023 for wadis and rain). passPct 75 = ceil(0.75 * 40) = 30.
  // Pools are 4x each count plus 40 training-only spares. No fines or black points. All items original.
  blueprint: {
    aeLicence: 4,
    aeSigns: 9,
    aeMarkings: 5,
    aeRightOfWay: 7,
    aeLanes: 6,
    aeSafety: 5,
    aeConditions: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 12501, name: "Road Signs", categories: ["aeSigns"], size: 44, weightLabel: "9 of 40 test questions" },
    { setNumber: 2, id: 12502, name: "Licensing, Signals & Markings", categories: ["aeLicence", "aeMarkings"], size: 44, weightLabel: "9 of 40 test questions" },
    { setNumber: 3, id: 12503, name: "Roundabouts, Junctions & Right of Way", categories: ["aeRightOfWay"], size: 34, weightLabel: "7 of 40 test questions" },
    { setNumber: 4, id: 12504, name: "Lanes, Speed & Overtaking", categories: ["aeLanes"], size: 30, weightLabel: "6 of 40 test questions" },
    { setNumber: 5, id: 12505, name: "Safety, Weather & Crashes", categories: ["aeSafety", "aeConditions"], size: 48, weightLabel: "9 of 40 test questions" },
  ],
  categoryLabels: {
    aeLicence: "Licensing & Driver Responsibility",
    aeSigns: "Road Signs",
    aeMarkings: "Signals & Road Markings",
    aeRightOfWay: "Roundabouts, Junctions & Right of Way",
    aeLanes: "Lanes, Speed & Overtaking",
    aeSafety: "Children, Pedestrians & Passengers",
    aeConditions: "Weather, Breakdowns & Crashes",
  },
  copy: {
    guestPrompt: "to save your UAE theory test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets covering the rules the RTA knowledge test asks about. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 40 questions like the real test, 30 to pass",
    heroSubs: [
      "Five topics, four real-length tests. Signs and right of way weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your knowledge test.",
    ],
    sourceLine: "Based on UAE federal traffic rules and RTA guidance. Original questions; 40 per test, 30 to pass like the real test.",
    analyticsKey: "aerta",
  },
};
```

Append `aerta` to the `EXAMS` array with the other driving tests.

Check: 12501-12505 (sets) and 12501-12504 (tests) must be free; the brief reserves 12500 for this exam.

## lib/banks/all.ts

```ts
import "./aerta";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/aerta.ts`.

## types/index.ts

- `QuestionType`: add `| "AERTA"`.
- `QuestionCategory`, under a `// UAE driving theory (RTA)` comment (grepped: no `ae*` keys taken):

```ts
  | "aeLicence"
  | "aeSigns"
  | "aeMarkings"
  | "aeRightOfWay"
  | "aeLanes"
  | "aeSafety"
  | "aeConditions"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    aeLicence: "Licensing & Driver Responsibility",
    aeSigns: "Road Signs",
    aeMarkings: "Signals & Road Markings",
    aeRightOfWay: "Roundabouts, Junctions & Right of Way",
    aeLanes: "Lanes, Speed & Overtaking",
    aeSafety: "Children, Pedestrians & Passengers",
    aeConditions: "Weather, Breakdowns & Crashes",
```

## app/globals.css

Light block (hue 162 80% 26% from the brief), then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* UAE driving theory (RTA) theme */
  [data-theme="aerta"] {
    --brand: 162 80% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 162 55% 95%;
    --brand-hover: 162 80% 21%;
    --brand-dark: 162 80% 19%;
    --brand-darker: 162 70% 13%;
    --brand-muted: 162 30% 70%;
    --brand-border: 162 30% 78%;
    --brand-border-light: 162 28% 88%;
    --brand-gradient-to: 190 55% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `aerta: "Four real-length mock tests for the UAE driving theory test (the RTA knowledge test): road signs, roundabouts and right of way, lanes and overtaking, school buses, fog, sandstorms and wadis, 30 of 40 to pass.",`
- `EXAM_ORG`: `aerta: "RTA Dubai · Light vehicle knowledge test",`
- Hub group: already present (`{ title: "UAE driving tests", ids: ["aerta"] }`), and
  `RELATED_OVERRIDES.aerta` is already `["inrto", "ukcar", "phlto"]`. Nothing to add.
- `SEARCH_ALIASES`:
  `aerta: "uae driving theory test rta theory test dubai theory test rta knowledge test dubai driving licence test uae driving licence abu dhabi theory test sharjah theory test rta mock test emirates driving test",`

## lib/region.ts

Already present: `aerta: "AE"` in `TEST_REGIONS` and the `REGION_HOME.AE` copy (40 questions, 30 to
pass, right-hand traffic) matches rta.ae service 510. It is a driving test, so NOT in
`NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  aerta: {
    answer:
      "The RTA knowledge (theory) test is an early step to a Dubai driving licence. It has 40 questions and you need at least 30 correct to pass. Before you can take it you need a valid learning permit and your Emirates ID, and you must finish the theory lectures at your driving institute: 8 hours for a light vehicle. Driving schools say the test also includes a video hazard section. The rules you are tested on are federal, so they are the same across the UAE; check the current minimum age with your emirate's licensing authority.",
    rows: [
      { label: "Questions", value: "40" },
      { label: "Pass mark", value: "30 of 40 (75%)" },
      { label: "Before the test", value: "Valid learning permit and theory lectures" },
      { label: "Theory lectures", value: "8 hours (light vehicle)" },
      { label: "Bring", value: "Emirates ID; arrive 30 minutes early" },
      { label: "Rules", value: "Federal Decree-Law No. 14 of 2024" },
      { label: "Run by", value: "RTA, through approved driving institutes" },
    ],
    basedOn: "RTA Knowledge Test service page and UAE government road safety guidance, checked October 2026",
    source: { name: "RTA: Knowledge Test", url: "https://www.rta.ae/wps/portal/rta/ae/home/rta-services/service-details?serviceId=510" },
  },
```
(Fee left out: house style avoids money figures.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TestIcon.tsx, components/CDLHeader.tsx, components/TeachNudge.tsx

Nothing: `car` already exists; driving tests are not teacher-led.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Do not add to `TIGER_EXAM_IDS` without reviewed artwork.

## Landing breadcrumbs

The brief asks for `<ExamLandingBreadcrumbs examId>`, but no such component exists in this tree (grep
of `app`, `components`, `lib` finds none), so the landing does not import it. If the integrator adds
it, place `<ExamLandingBreadcrumbs examId="aerta" />` right after the JSON-LD script in
`app/uae-driving-theory-test/page.tsx`. `ExamFacts` and `ExamRelatedTests` are rendered. The FAQ is
one `faqs` array rendered both as JSON-LD and on the page, so the two always match.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing aerta:uae-driving-theory:12501`

## CLAUDE.md (under Additional Exams)

```md
- **UAE Driving Theory** (RTA Dubai knowledge test, light vehicle, `/uae-driving-theory/*`, landing `/uae-driving-theory-test`): `data/uae-rta-questions.json` (200 original questions on UAE federal traffic rules: licensing 20, road signs 44, signals and markings 24, roundabouts and right of way 34, lanes/speed/overtaking 30, children and pedestrians 24, weather/breakdowns/crashes 24), four real-length tests: test IDs 12501-12504 (40 questions each), sets 12501-12505, state `AERTA`, 75% pass (30 of 40 per rta.ae service 510). 4/9/5/7/6/5/4 per test; the last items of each pool (40 in all) are training-only. Rules from Federal Decree-Law 14 of 2024 and MR 178/2017 as amended in 2023 (wadis, rain); no fines or black points; minimum age worded as "check with your emirate". Signs are described in words. Built by `tools/countries/aerta/build.py`; sources in `tools/countries/aerta/sources.md`. Region AE, hub group "UAE driving tests".
```
