# Wiring for `nasm` (NASM Certified Personal Trainer, US, v1)

Files already written by the builder: `data/nasm-cpt-questions.json` (200, PASS),
`lib/banks/nasm.ts`, `app/nasm-cpt/*` (8 wrappers, copied from `app/life-in-the-uk/`),
`app/nasm-cpt-practice-test/page.tsx`, `tools/next30/nasm/*` (spec, sources, `q_*.py`, `build.py`).
Rebuild the bank with `python3 -I tools/next30/nasm/build.py`. Everything below goes in shared files.

Format note: the real exam is 120 questions in 2 hours, 100 scored plus 20 unscored research items,
scaled score 70 to pass. The bank models the 100 scored items' blueprint at the house standard of
4 tests x 50 (70% = 35 of 50), with training sets from `testSets(10700, 4)` (one set per mock test),
so the dashboard is 8 steps. Validator: PASS, letters 50/50/50/50, key-longest 4%, key>1.2x 8%.

## lib/exams.ts

Add `"nasm"` to the `ExamId` union. Icon `activity` already exists (a dumbbell icon would be nicer
but needs `components/TestIcon.tsx` and `components/CDLHeader.tsx`; optional).

```ts
const nasm: ExamConfig = {
  id: "nasm",
  stateCode: "NASM",
  idBase: 10700,
  slug: "/nasm-cpt",
  landingPath: "/nasm-cpt-practice-test",
  name: "NASM CPT Practice Test",
  shortName: "NASM CPT",
  examLabel: "NASM-CPT exam",
  fullName: "NASM Certified Personal Trainer (NASM-CPT) Exam",
  questionIdPrefix: "NASM-",
  icon: "activity",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Real exam (NASM support pages, checked October 2026): 120 multiple-choice questions in 2 hours,
  // 100 scored and 20 unscored research items, scaled score of 70 to pass; NCCA accredited.
  // Weights from NASM's CPT7 exam blueprint (2019 job analysis): sciences and nutrition 15%,
  // client relations and behavioral coaching 15%, assessment 16%, program design 20%, exercise
  // technique and training instruction 24%, professional development and responsibility 10%,
  // scaled to 50 per test (8/7/8/10/12/5). Original questions on the 7th-edition textbook topics.
  blueprint: {
    nasmScience: 8,
    nasmClient: 7,
    nasmAssess: 8,
    nasmProgram: 10,
    nasmTechnique: 12,
    nasmProfessional: 5,
  },
  trainingSets: testSets(10700, 4),
  categoryLabels: {
    nasmScience: "Basic & Applied Sciences and Nutrition",
    nasmClient: "Client Relations & Behavioral Coaching",
    nasmAssess: "Assessment",
    nasmProgram: "Program Design",
    nasmTechnique: "Exercise Technique & Training Instruction",
    nasmProfessional: "Professional Development & Responsibility",
  },
  copy: {
    guestPrompt: "to save your NASM CPT progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all six exam domains. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 70% to pass",
    heroSubs: [
      "Six domains, four mock tests. Exercise technique weighs most.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Schedule your NASM-CPT exam.",
    ],
    sourceLine: "Based on NASM's CPT7 exam blueprint. Original questions, not affiliated with NASM; 50 per test with a 70% pass line.",
    analyticsKey: "nasm",
  },
};
```

Append `nasm` to the `EXAMS` array (with the workplace exams).

Check: 10701-10704 (tests and sets) must be free; the highest idBase at build time was 10600.
If another builder took 10700, move the block to the next free hundred; no data depends on it.

## lib/banks/all.ts

```ts
import "./nasm";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/nasm.ts`.

## types/index.ts

- `QuestionType`: add `| "NASM"`.
- `QuestionCategory`, under a `// NASM Certified Personal Trainer` comment:

```ts
  | "nasmScience"
  | "nasmClient"
  | "nasmAssess"
  | "nasmProgram"
  | "nasmTechnique"
  | "nasmProfessional"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nasmScience: "Basic & Applied Sciences and Nutrition",
    nasmClient: "Client Relations & Behavioral Coaching",
    nasmAssess: "Assessment",
    nasmProgram: "Program Design",
    nasmTechnique: "Exercise Technique & Training Instruction",
    nasmProfessional: "Professional Development & Responsibility",
```

## app/globals.css

Suggested hue 14 (an energetic red-orange; re-pick if it clashes), then run
`tools/gen_dark_brand_css.py`.

```css
  /* NASM CPT theme */
  [data-theme="nasm"] {
    --brand: 14 80% 46%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 14 90% 96%;
    --brand-hover: 14 80% 40%;
    --brand-dark: 14 75% 34%;
    --brand-darker: 14 70% 22%;
    --brand-muted: 14 45% 72%;
    --brand-border: 14 50% 80%;
    --brand-border-light: 14 45% 89%;
    --brand-gradient-to: 40 90% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nasm: "Four 50-question mock tests for the NASM Certified Personal Trainer exam: the OPT model, assessments, program design, exercise technique and client coaching.",`
- `EXAM_ORG`: `nasm: "National Academy of Sports Medicine · personal trainer certification",`
- Hub group: add `"nasm"` to `{ title: "Workplace & job certifications", ... }` (suggested in SPEC).
  If a fitness group is created for other trainer exams (ACE, ISSA, NSCA), move it there.
- `SEARCH_ALIASES`:
  `nasm: "nasm cpt nasm-cpt nasm certified personal trainer personal trainer certification personal training exam cpt7 cpt 7 opt model overhead squat assessment national academy of sports medicine fitness trainer",`

## lib/region.ts

Nothing: US is the default (`regionOfTest` falls back to "US"), and `NON_DRIVING_TESTS` lists only
non-US exams.

## lib/examFacts.ts

```ts
  nasm: {
    answer:
      "The NASM Certified Personal Trainer (NASM-CPT) exam is a proctored, NCCA-accredited computer test of 120 multiple-choice questions in 2 hours. 100 questions are scored and 20 are unscored research items, and you need a scaled score of 70 to pass. To sit it you need a high school diploma or equivalent and current CPR and AED certification. The CPT7 blueprint weights six domains: basic and applied sciences and nutrition 15%, client relations and behavioral coaching 15%, assessment 16%, program design 20%, exercise technique and training instruction 24%, and professional development and responsibility 10%.",
    rows: [
      { label: "Questions", value: "120 (100 scored, 20 research)" },
      { label: "Time", value: "2 hours" },
      { label: "Passing score", value: "Scaled score of 70" },
      { label: "Prerequisites", value: "High school diploma or GED, current CPR and AED" },
      { label: "Largest domain", value: "Exercise technique and training instruction, 24%" },
      { label: "Recertification", value: "Every 2 years, 2.0 CEUs" },
      { label: "Run by", value: "National Academy of Sports Medicine (NASM)" },
    ],
    basedOn: "NASM's exam information and support pages and the CPT7 exam blueprint, checked October 2026",
    source: { name: "NASM: CPT exam information", url: "https://www.nasm.org/certified-personal-trainer/exam-information" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx / components/exam/ExamClassFaq.tsx

Optional. The landing does not render `ExamClassFaq` (most candidates self-study). If the integrator
wants it, add `"nasm"` to `TEACHER_LED`, `nasm: "personal trainer certification courses",` to
`TEACHES`, render `<ExamClassFaq examId="nasm" />` after the FAQ list and add
`classFaqJsonLd("nasm")` to the FAQPage `mainEntity`.

## lib/tigerAssets.ts

Nothing; falls back to the DMV tiger.

## Landing breadcrumbs

No `ExamLandingBreadcrumbs` component exists in this tree. If the integrator adds it, place
`<ExamLandingBreadcrumbs examId="nasm" />` right after the JSON-LD script in
`app/nasm-cpt-practice-test/page.tsx`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, no redirects needed.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (sets are 50, so no parts are written).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nasm:nasm-cpt:10701`

## CLAUDE.md (under Additional Exams)

```md
- **NASM CPT** (NASM Certified Personal Trainer, `/nasm-cpt/*`, landing `/nasm-cpt-practice-test`): `data/nasm-cpt-questions.json` (200 questions on NASM's CPT7 exam blueprint: sciences and nutrition 32, client relations and coaching 28, assessment 32, program design 40, exercise technique 48, professional responsibility 20), test IDs 10701-10704, sets 10701-10704 (`testSets`, one per test), state `NASM`, 70% pass (the real exam is 120 questions, 100 scored, scaled 70). 8/7/8/10/12/5 per test. OPT model, overhead squat compensations and the Corrective Exercise Continuum; cardio zone definitions avoided. Not affiliated with NASM. Built by `tools/next30/nasm/build.py`; sources in `tools/next30/nasm/sources.md`.
```
