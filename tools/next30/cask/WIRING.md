# Wiring for `cask` (Saskatchewan Class 7 learner knowledge test, CA, v1)

Files already written by the builder: `data/saskatchewan-learners-questions.json` (200, PASS),
`lib/banks/cask.ts`, `app/saskatchewan-learners/*` (8 wrappers, copied from `app/ontario-g1/`),
`app/saskatchewan-learners-practice-test/page.tsx`, `tools/next30/cask/*` (spec, sources,
`q_*.py`, `build.py`; rebuild with `python3 -I tools/next30/cask/build.py`).
Everything below goes in shared files.

Format note: DMV-style like the other Canadian driving tests (`caon`, `camb`): 4 tests of 50,
4 training sets where Set N holds exactly Test N's 50 questions (`testSets`). Dashboard = 8 steps.
Pool = 4x per-test in every category, so no item repeats across tests.

## lib/exams.ts

Add `"cask"` to the `ExamId` union. Icon `car` already exists.

Block (with the other Canadian driving tests, after `camb`):

```ts
const cask: ExamConfig = {
  id: "cask",
  stateCode: "CASK",
  idBase: 11700,
  slug: "/saskatchewan-learners",
  landingPath: "/saskatchewan-learners-practice-test",
  name: "Saskatchewan Class 7 Practice Test",
  shortName: "SK Class 7",
  examLabel: "Saskatchewan Class 7",
  fullName: "Saskatchewan Class 7 learner's licence knowledge test",
  questionIdPrefix: "CASK-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Saskatchewan Driver's Handbook, 2026-27 edition (SGI, SLB143 07/2026, read October 2026). The
  // Class 7 knowledge tests are "Basic and Sign": driving situations and the rules of the road, and
  // sign identification; a failed part is rewritten on its own, results last a year, one attempt a
  // day. SGI publishes no question count or pass mark (prep sites report 80% per part), so 80% is
  // a practice target. Signs plus lights, markings and railway crossings are 21 of 50, mirroring
  // the separate Sign part; the rules split by the handbook's chapters (GDL and the law,
  // right-of-way, sharing the road, driving skills, winter, emergencies and impairment).
  blueprint: {
    caskSigns: 14,
    caskSignals: 7,
    caskLicence: 7,
    caskRightOfWay: 7,
    caskSharing: 6,
    caskDriving: 5,
    caskConditions: 4,
  },
  trainingSets: testSets(11700, 4),
  categoryLabels: {
    caskSigns: "Traffic Signs",
    caskSignals: "Lights, Markings & Railway Crossings",
    caskLicence: "GDL, Licensing & the Law",
    caskRightOfWay: "Right-of-Way & Turns",
    caskSharing: "Sharing the Road",
    caskDriving: "Safe Driving Skills",
    caskConditions: "Winter, Emergencies & Impairment",
  },
  copy: {
    guestPrompt: "to save your Saskatchewan Class 7 progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions on Saskatchewan signs and rules",
    heroSubs: [
      "Basic and Sign, four tests. Signs come up most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your learner's test with a motor licence issuer.",
    ],
    sourceLine: "Based on the Saskatchewan Driver's Handbook (2026-27). SGI does not publish a pass mark; 80% here is a practice target.",
    analyticsKey: "cask",
  },
};
```

Append `cask` to the `EXAMS` array after `camb`.

Check: test and set IDs 11701-11704 must be free (spec row 11 assigns idBase 11700).

## lib/banks/all.ts

```ts
import "./cask";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/cask.ts`.

## types/index.ts

- `QuestionType`: add `| "CASK"`.
- `QuestionCategory`, under a `// Saskatchewan Class 7` comment after the `caon*` keys:

```ts
  | "caskSigns"
  | "caskSignals"
  | "caskLicence"
  | "caskRightOfWay"
  | "caskSharing"
  | "caskDriving"
  | "caskConditions"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    caskSigns: "Traffic Signs",
    caskSignals: "Lights, Markings & Railway Crossings",
    caskLicence: "GDL, Licensing & the Law",
    caskRightOfWay: "Right-of-Way & Turns",
    caskSharing: "Sharing the Road",
    caskDriving: "Safe Driving Skills",
    caskConditions: "Winter, Emergencies & Impairment",
```

## app/globals.css

Light block (suggested hue 132, a Saskatchewan green with a wheat-gold gradient; 132 was unused
in this tree, re-pick if another builder takes it), then run `tools/gen_dark_brand_css.py` once
for everyone.

```css
  /* Saskatchewan Class 7 theme */
  [data-theme="cask"] {
    --brand: 132 55% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 132 45% 95%;
    --brand-hover: 132 55% 25%;
    --brand-dark: 132 55% 22%;
    --brand-darker: 132 50% 15%;
    --brand-muted: 132 25% 70%;
    --brand-border: 132 28% 78%;
    --brand-border-light: 132 25% 88%;
    --brand-gradient-to: 45 80% 94%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cask: "Free Saskatchewan Class 7 learner's test practice: 200 original questions from the SGI Driver's Handbook on signs, right-of-way, GDL rules, winter driving and impaired driving.",`
- `EXAM_ORG`: `cask: "SGI (Saskatchewan Government Insurance)",`
- Hub group: add `"cask"` to `{ title: "Canada driving tests", ids: ["caon", "caqc", "cabc", "caab", "camb", "cask"] }`
  (plus `cans` if the Nova Scotia builder in this batch is merged).
- `SEARCH_ALIASES`:
  `cask: "saskatchewan sgi class 7 learner's licence learners test learner permit written test knowledge test sign test basic test regina saskatoon gdl novice driver's handbook canada",`

## lib/region.ts

`cask: "CA",` in `TEST_REGIONS` (with the other Canadian driving tests). It is a driving test, so
it is NOT added to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  cask: {
    answer:
      "The Saskatchewan Class 7 knowledge test is the written test for a learner's licence, given by SGI through motor licence issuers and driver examination offices. It has two parts, Basic (driving situations and the rules of the road) and Sign (sign identification), both from the Saskatchewan Driver's Handbook; if you fail one part you rewrite only that part, you may write once a day, and passing results last one year. SGI does not publish the question count or pass mark. You must be 16, or 15 in high school driver education, and pass a vision test, then hold the Class 7 for at least nine months before the Class 5 road test.",
    rows: [
      { label: "Format", value: "Two parts: Basic (rules of the road) and Sign" },
      { label: "Passing score", value: "Not published by SGI (prep sites report 80% per part)" },
      { label: "Retakes", value: "Rewrite only the failed part, once per day" },
      { label: "Results valid", value: "One year" },
      { label: "Minimum age", value: "16, or 15 in high school driver education" },
      { label: "Also required", value: "Vision test, original ID, parental consent under 18" },
      { label: "Learner stage", value: "At least 9 months with a supervising driver" },
      { label: "Given by", value: "SGI, at motor licence issuers and driver exam offices" },
    ],
    basedOn: "the Saskatchewan Driver's Handbook, 2026-27 edition",
    source: { name: "SGI: Saskatchewan Driver's Handbook", url: "https://sgi.sk.ca/handbook" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## Teacher-led lists

Nothing: like `caon` and `camb`, not added to `TEACHER_LED` (high school driver education is
taught by instructors, but the other Canadian driving tests are not on the list either; follow
whatever the integrator decides for `caon`). The landing does not render `ExamClassFaq`.

## lib/tigerAssets.ts

Nothing: falls back to the DMV tiger, like `caon`.

## Landing breadcrumbs

`ExamLandingBreadcrumbs` does not exist in this tree and the `caon` template landing does not
render it. If the integrator adds it, place `<ExamLandingBreadcrumbs examId="cask" />` right after
the JSON-LD script in `app/saskatchewan-learners-practice-test/page.tsx`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 50, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cask:saskatchewan-learners:11701`

## CLAUDE.md (under Additional Exams, after the other Canadian driving tests)

```md
- **Saskatchewan Class 7** (SGI learner's licence knowledge test, `/saskatchewan-learners/*`, landing `/saskatchewan-learners-practice-test`): `data/saskatchewan-learners-questions.json` (200 original questions from the Saskatchewan Driver's Handbook 2026-27: signs 56, lights/markings/railway 28, GDL and the law 28, right-of-way 28, sharing the road 24, driving skills 20, winter/emergencies/impairment 16), test IDs 11701-11704, sets 11701-11704 (DMV-style, Set N = Test N), state `CASK`, 80% pass (a practice target: SGI publishes no pass mark or count; the real test is two parts, Basic and Sign). 14/7/7/7/6/5/4 per test. Signs described in words. Built by `tools/next30/cask/build.py`; sources in `tools/next30/cask/sources.md`. Hub group "Canada driving tests".
```
