# Wiring for `cans` (Nova Scotia Class 7 learner's knowledge test, CA, v1)

Files already written by the builder: `data/nova-scotia-learners-questions.json` (200, PASS),
`lib/banks/cans.ts`, `app/nova-scotia-learners/*` (8 wrappers, copied from `app/ontario-g1/`),
`app/nova-scotia-learners-practice-test/page.tsx`, `tools/next30/cans/*` (spec, sources, `q_*.py`,
`build.py`; rebuild with `python3 tools/next30/cans/build.py`). Everything below goes in shared files.

Format note: five tests of 40 (20 signs + 20 rules, like the real two 20-question parts) and five
test sets, interleaved like the other Canada driving tests: 10 dashboard steps. `testSets()` hardcodes
`size: 50`, so the config maps the sets to `size: 40` (otherwise a set could never complete on the
dashboard and `build-training-parts` reports a size mismatch). If the integrator prefers, give
`testSets` a third `size = 50` parameter and call `testSets(11800, 5, 40)`; both are equivalent.
Pass line `ceil(0.8 * 40) = 32`. The real test needs 16 of 20 on each part; the engine scores the 40
together, and the landing tells users to check each half.

## lib/exams.ts

Add `"cans"` to the `ExamId` union (next to `"camb"`). Icon `car` already exists.

Block (with the other Canada driving tests):

```ts
const cans: ExamConfig = {
  id: "cans",
  stateCode: "CANS",
  idBase: 11800,
  slug: "/nova-scotia-learners",
  landingPath: "/nova-scotia-learners-practice-test",
  name: "Nova Scotia Learner's Practice Test",
  shortName: "NS Class 7",
  examLabel: "Nova Scotia Class 7",
  fullName: "Nova Scotia Class 7 learner's licence knowledge test",
  questionIdPrefix: "CANS-",
  icon: "car",
  testCount: 5,
  questionsPerTest: 40,
  passPct: 80,
  // Nova Scotia Driver's Handbook (novascotia.ca, 2017 reprint with GDL and emergency-vehicle
  // inserts; still the official study guide in October 2026) and novascotia.ca "Take a driver
  // knowledge test: Learner's Licence (class 7)": two parts, rules of the road and road sign
  // recognition, 20 multiple-choice questions each, 16 of 20 on each part, 30 minutes per part.
  // Each practice test is 20 sign items (regulatory, warning, work zone, lights and markings) and
  // 20 rules items split by the handbook's chapters. Learner and GDL rules follow the current RMV
  // pages (2-year learner licence, 12 or 9 months before the road test); child seats and the
  // one-metre cyclist gap follow the Traffic Safety Act in force October 19, 2026.
  blueprint: {
    cansRegSigns: 6,
    cansWarnSigns: 6,
    cansWorkSigns: 3,
    cansSignals: 5,
    cansLicence: 4,
    cansRightOfWay: 4,
    cansDriving: 5,
    cansSharing: 4,
    cansConditions: 3,
  },
  trainingSets: testSets(11800, 5).map((s) => ({ ...s, size: 40 })),
  categoryLabels: {
    cansRegSigns: "Regulatory Signs",
    cansWarnSigns: "Warning Signs",
    cansWorkSigns: "Work Zone & Guide Signs",
    cansSignals: "Lights & Pavement Markings",
    cansLicence: "Licensing, GDL & Demerits",
    cansRightOfWay: "Intersections & Right-of-Way",
    cansDriving: "Speed, Passing & Lanes",
    cansSharing: "Parking & Sharing the Road",
    cansConditions: "Night, Weather & Emergencies",
  },
  copy: {
    guestPrompt: "to save your learner's test progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Five sets, one per practice test: Set 1 holds exactly the 40 questions of Test 1, and so on. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 20 signs + 20 rules, like the real test",
    heroSubs: [
      "Signs and rules of the road, five tests. You need 16 of 20 on each part of the real one.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your knowledge test online or with Access Nova Scotia.",
    ],
    sourceLine: "Based on the Nova Scotia Driver's Handbook and the Traffic Safety Act rules in force October 2026. The real test needs 16 of 20 on each part.",
    analyticsKey: "cans",
  },
};
```

Append `cans` to the `EXAMS` array after `camb`.

Check: 11801-11805 (tests and sets) must be free; the spec reserved idBase 11800 for this exam.

## lib/banks/all.ts

```ts
import "./cans";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/cans.ts`.

## types/index.ts

- `QuestionType`: add `| "CANS"`.
- `QuestionCategory`, under a `// Nova Scotia Class 7 learner's test` comment:

```ts
  | "cansRegSigns"
  | "cansWarnSigns"
  | "cansWorkSigns"
  | "cansSignals"
  | "cansLicence"
  | "cansRightOfWay"
  | "cansDriving"
  | "cansSharing"
  | "cansConditions"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cansRegSigns: "Regulatory Signs",
    cansWarnSigns: "Warning Signs",
    cansWorkSigns: "Work Zone & Guide Signs",
    cansSignals: "Lights & Pavement Markings",
    cansLicence: "Licensing, GDL & Demerits",
    cansRightOfWay: "Intersections & Right-of-Way",
    cansDriving: "Speed, Passing & Lanes",
    cansSharing: "Parking & Sharing the Road",
    cansConditions: "Night, Weather & Emergencies",
```

## app/globals.css

Suggested hue 212, the deep blue of the Nova Scotia flag's saltire (re-pick if it clashes with
`cask` or another Canada test). Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Nova Scotia Class 7 learner's test theme (Canada) */
  [data-theme="cans"] {
    --brand: 212 72% 36%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 212 70% 96%;
    --brand-hover: 212 72% 30%;
    --brand-dark: 212 72% 26%;
    --brand-darker: 212 62% 18%;
    --brand-muted: 212 38% 72%;
    --brand-border: 212 38% 80%;
    --brand-border-light: 212 34% 89%;
    --brand-gradient-to: 48 80% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cans: "Nova Scotia Class 7 learner's knowledge test practice: 200 questions from the NS Driver's Handbook, five tests split 20 road signs and 20 rules of the road like the real one.",`
- `EXAM_ORG`: `cans: "Nova Scotia RMV · Access Nova Scotia",`
- Hub group: add `"cans"` to `{ title: "Canada driving tests", ids: [...] }` (after `"camb"`; `cask`
  goes there too).
- `SEARCH_ALIASES`:
  `cans: "nova scotia learners test class 7 ns learner's licence knowledge test written test road sign test rules of the road access nova scotia rmv registry of motor vehicles halifax dartmouth sydney gdl canada drivers handbook",`

## lib/region.ts

`cans: "CA",` in `TEST_REGIONS`. Not in `NON_DRIVING_TESTS` (it is a driving test).

## lib/examFacts.ts

```ts
  cans: {
    answer:
      "The Nova Scotia Class 7 knowledge test is the written test for a learner's licence. It has two parts, a rules of the road test and a road sign test, each with 20 multiple-choice questions, and you need at least 16 correct on each part (80 percent), with 30 minutes per part. You can take it online in English or French with a webcam, or in person at a Registry of Motor Vehicles office or Access Nova Scotia centre. You must be at least 16, with a parent's written consent at 16 or 17, and you also pass a vision test before the licence is issued.",
    rows: [
      { label: "Format", value: "Two parts: rules of the road and road signs" },
      { label: "Questions", value: "20 multiple choice per part" },
      { label: "Passing score", value: "16 of 20 on each part (80%)" },
      { label: "Time", value: "30 minutes per part" },
      { label: "Where", value: "Online (English or French, webcam) or at the RMV / Access Nova Scotia" },
      { label: "Minimum age", value: "16 (written parental consent at 16 or 17)" },
      { label: "Also required", value: "Vision test, ID, photo" },
      { label: "Retake", value: "Only the failed part; next day in person, no wait online" },
      { label: "Next step", value: "Road test after 12 months (9 with approved driver education)" },
    ],
    basedOn: "novascotia.ca learner's licence test and RMV pages and the Nova Scotia Driver's Handbook, checked October 2026",
    source: { name: "Nova Scotia: Take a driver knowledge test, Learner's Licence (class 7)", url: "https://www.novascotia.ca/take-driver-knowledge-test-learners-licence-class-7" },
  },
```
(Fee left out per house style; novascotia.ca listed CAD 15.03 for the knowledge test on 2026-10-30.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## Landing breadcrumbs

The brief asks for `<ExamLandingBreadcrumbs examId>`, but no such component exists in this tree
(the `caon` template landing does not render one). If the integrator adds it, place it right after
the JSON-LD script in `app/nova-scotia-learners-practice-test/page.tsx`.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: like the other provincial driving tests, not a teacher-led exam.

## lib/tigerAssets.ts, lib/shareCards.ts, lib/shareCardCopy.ts

Optional. Falls back to the DMV tiger and generic share copy; `caon` has entries the integrator can
copy if all Canada driving tests should match.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 40, under 60, so no parts are
written; it also confirms each set's size matches its 40 bank items.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cans:nova-scotia-learners:11801`
(the landing references `/landing/cans-mobile.png` and `/landing/cans-desktop.png`).

## CLAUDE.md (under Additional Exams, with the other Canada driving tests)

```md
- **Nova Scotia Class 7** (learner's licence knowledge test, `/nova-scotia-learners/*`, landing `/nova-scotia-learners-practice-test`): `data/nova-scotia-learners-questions.json` (200 questions from the Nova Scotia Driver's Handbook with current RMV and Traffic Safety Act rules: regulatory signs 30, warning 30, work zone/guide 15, lights/markings 25, licensing/GDL 20, right-of-way 20, speed/passing 25, parking/sharing 20, conditions 15), five 40-question tests like the real two 20-question parts (6/6/3/5 sign items, 4/4/5/4/3 rules items), test IDs 11801-11805, sets 11801-11805 (one per test, `size: 40`), state `CANS`, 80% pass (the real test needs 16 of 20 on each part). Signs described in words. Built by `tools/next30/cans/build.py`; sources in `tools/next30/cans/sources.md`.
```
