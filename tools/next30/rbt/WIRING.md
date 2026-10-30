# Wiring for `rbt` (BACB Registered Behavior Technician exam, US, v1)

Files already written by the builder: `data/rbt-questions.json` (200, PASS),
`lib/banks/rbt.ts`, `app/rbt/*` (8 wrappers, copied from `app/life-in-the-uk/`),
`app/rbt-practice-test/page.tsx`, `tools/next30/rbt/*` (spec, sources, `q_*.py`, `build.py`).
Everything below goes in shared files. `npx tsc` reports one error in `lib/banks/rbt.ts` until
`"rbt"` is added to `ExamId`.

Format note: the real exam is 85 questions (75 scored + 10 unscored pilot) in 90 minutes. 200
items cannot make several 75-question tests without repeats, so this is the standard four
50-question tests, weighted like the 75 scored items. Dashboard = 4 training sets + 4 tests = 8
steps. Pass line `ceil(0.8 * 50) = 40`. Pools are exactly 4x per-test, so no item repeats across
tests. The BACB publishes no percentage pass mark (passing score set by modified Angoff), so 80% is a readiness marker.

## lib/exams.ts

Add `"rbt"` to the `ExamId` union. Icon `target` already exists.

```ts
const rbt: ExamConfig = {
  id: "rbt",
  stateCode: "RBT",
  idBase: 10800,
  slug: "/rbt",
  landingPath: "/rbt-practice-test",
  name: "RBT Practice Test",
  shortName: "RBT",
  examLabel: "RBT exam",
  fullName: "Registered Behavior Technician (RBT) exam",
  questionIdPrefix: "RBT-",
  icon: "target",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // BACB RBT Test Content Outline (3rd ed.), in effect for exams from January 1, 2026 (document
  // updated 09/2024, checked October 2026): 75 scored + 10 unscored pilot questions in 90 minutes,
  // scored counts A Data Collection and Graphing 13, B Behavior Assessment 8, C Behavior
  // Acquisition 19, D Behavior Reduction 14, E Documentation and Reporting 10, F Ethics 11,
  // scaled here to 50 per test (9/5/13/9/7/7). The BACB reports pass/fail against a modified-Angoff passing score and
  // publishes no percentage; 80% is a readiness marker. All items original.
  blueprint: {
    rbtData: 9,
    rbtAssess: 5,
    rbtAcq: 13,
    rbtReduce: 9,
    rbtDoc: 7,
    rbtEthics: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 10801, name: "Data Collection & Assessment", categories: ["rbtData", "rbtAssess"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 2, id: 10802, name: "Behavior Acquisition", categories: ["rbtAcq"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 3, id: 10803, name: "Behavior Reduction", categories: ["rbtReduce"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 4, id: 10804, name: "Documentation, Reporting & Ethics", categories: ["rbtDoc", "rbtEthics"], size: 56, weightLabel: "14 of 50 test questions" },
  ],
  categoryLabels: {
    rbtData: "Data Collection & Graphing",
    rbtAssess: "Behavior Assessment",
    rbtAcq: "Behavior Acquisition",
    rbtReduce: "Behavior Reduction",
    rbtDoc: "Documentation & Reporting",
    rbtEthics: "Ethics",
  },
  copy: {
    guestPrompt: "to save your RBT progress and track every question you miss",
    trainingHeading: "Train by RBT domain",
    trainingSub: "Four sets covering all six domains of the RBT Test Content Outline (3rd ed.). Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions weighted like the real 75 scored",
    heroSubs: [
      "Six domains, four mock exams. Behavior acquisition weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. Book your RBT exam.",
    ],
    sourceLine: "Based on the BACB RBT Test Content Outline (3rd ed.) and the RBT Ethics Code (2.0). Original questions; 50 per test, weighted like the real exam.",
    analyticsKey: "rbt",
  },
};
```

Append `rbt` to the `EXAMS` array (with the healthcare exams).

Check: 10801-10804 (tests and sets) must be free (spec row assigns idBase 10800).

## lib/banks/all.ts

```ts
import "./rbt";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/rbt.ts`.

## types/index.ts

- `QuestionType`: add `| "RBT"`.
- `QuestionCategory`, under a `// RBT (Registered Behavior Technician)` comment:

```ts
  | "rbtData"
  | "rbtAssess"
  | "rbtAcq"
  | "rbtReduce"
  | "rbtDoc"
  | "rbtEthics"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    rbtData: "Data Collection & Graphing",
    rbtAssess: "Behavior Assessment",
    rbtAcq: "Behavior Acquisition",
    rbtReduce: "Behavior Reduction",
    rbtDoc: "Documentation & Reporting",
    rbtEthics: "Ethics",
```

## app/globals.css

Suggested hue 318 (plum-magenta; re-pick if it clashes), then run `tools/gen_dark_brand_css.py`.

```css
  /* RBT (Registered Behavior Technician) theme */
  [data-theme="rbt"] {
    --brand: 318 55% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 318 70% 96%;
    --brand-hover: 318 55% 34%;
    --brand-dark: 318 55% 30%;
    --brand-darker: 318 50% 20%;
    --brand-muted: 318 30% 72%;
    --brand-border: 318 32% 80%;
    --brand-border-light: 318 30% 89%;
    --brand-gradient-to: 280 50% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `rbt: "BACB Registered Behavior Technician exam on the 3rd edition outline: measurement and graphing, preference and functional assessment, teaching procedures, behavior reduction, documentation and ethics.",`
- `EXAM_ORG`: `rbt: "BACB · RBT Test Content Outline (3rd ed.)",`
- Hub group: add `"rbt"` to `{ title: "Healthcare certification exams", ids: [...] }`.
- `SEARCH_ALIASES`:
  `rbt: "rbt registered behavior technician aba applied behavior analysis behavior tech bacb rbt exam rbt test content outline 3rd edition autism therapy technician",`

## lib/region.ts

Nothing: US is the default, and US exams are not listed in `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  rbt: {
    answer:
      "The RBT exam is the Behavior Analyst Certification Board's certification exam for Registered Behavior Technicians, the entry-level practitioners who deliver ABA services under supervision. It has 85 multiple-choice questions in 90 minutes, 75 scored and 10 unscored pilot items, taken at a Pearson VUE test center. Since January 1, 2026 it follows the RBT Test Content Outline (3rd edition): data collection and graphing, behavior assessment, behavior acquisition, behavior reduction, documentation and reporting, and ethics. The result is pass or fail against a passing score set by the modified Angoff method, not published as a percentage.",
    rows: [
      { label: "Questions", value: "85 multiple choice (75 scored, 10 pilot)" },
      { label: "Time", value: "90 minutes" },
      { label: "Pass mark", value: "Pass/fail; passing score set by modified Angoff, no published percentage" },
      { label: "Content", value: "6 domains, 43 tasks (3rd ed. outline)" },
      { label: "Biggest domain", value: "Behavior Acquisition, 19 of 75" },
      { label: "Before the exam", value: "40-hour training and competency assessment" },
      { label: "Where", value: "Pearson VUE test centers" },
      { label: "Run by", value: "Behavior Analyst Certification Board (BACB)" },
    ],
    basedOn: "The BACB RBT Test Content Outline (3rd ed.), effective January 2026, checked October 2026",
    source: { name: "BACB: RBT Certification", url: "https://www.bacb.com/rbt/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"rbt"` to `TEACHER_LED` (taught in 40-hour RBT training courses), and in `TEACHES`:
`rbt: "the 40-hour RBT training or supervise RBT candidates",`. The landing already renders
`<ExamClassFaq examId="rbt" />` and `classFaqJsonLd("rbt")`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `target` exists; sitemaps map over `EXAMS`; no redirects.

## Landing breadcrumbs

No `ExamLandingBreadcrumbs` component exists in this tree (as noted for uklitu). If the integrator
adds it, place it right after the JSON-LD script in `app/rbt-practice-test/page.tsx`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing rbt:rbt:10801`

## CLAUDE.md (under Additional Exams)

```md
- **RBT** (BACB Registered Behavior Technician exam, `/rbt/*`, landing `/rbt-practice-test`): `data/rbt-questions.json` (200 questions on the RBT Test Content Outline (3rd ed.), effective January 2026: data collection and graphing 36, behavior assessment 20, behavior acquisition 52, behavior reduction 36, documentation and reporting 28, ethics 28), test IDs 10801-10804, sets 10801-10804, state `RBT`, 80% pass (readiness marker; the BACB sets an unpublished modified-Angoff passing score). 9/5/13/9/7/7 per test, scaled from the outline's 13/8/19/14/10/11 of 75 scored. Built by `tools/next30/rbt/build.py`; sources in `tools/next30/rbt/sources.md`. Hub group "Healthcare certification exams".
```
