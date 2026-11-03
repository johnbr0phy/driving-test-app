# Wiring for `aswb` (ASWB Masters social work licensing exam, US, v1)

Files already written by the builder: `data/aswb-masters-questions.json` (200, PASS),
`lib/banks/aswb.ts`, `app/aswb-masters/*` (5 wrappers copied from `app/rbt/`),
`app/aswb-masters-practice-test/page.tsx`, `tools/next100/aswb/*` (spec, sources, `q_*.py`,
`build.py`). Everything below goes in shared files. `npx tsc` reports an error in
`lib/banks/aswb.ts` until `"aswb"` is added to `ExamId`.

Format note: since August 3, 2026 the real exam is 122 questions (110 scored + 12 unscored
pretest) in two sections of 61, four hours, three- or four-option items, three content areas
(Values and Ethics 35%, Assessment and Planning 33%, Intervention and Practice 32%). 200 items
cannot make several 110-question tests without repeats, so this is the standard four 50-question
tests weighted 18/16/16 (pools exactly 4x per-test, no repeats across tests). All items here have
four options. Dashboard = 5 training sets + 4 tests = 9 steps. Pass line `ceil(0.7 * 50) = 35`.
ASWB reports pass/fail with a per-form number correct needed, no published percentage, so 70%
is a readiness target. The bank file is `data/aswb-masters-questions.json` (id `aswb`, slug
`/aswb-masters`).

## lib/exams.ts

Add `"aswb"` to the `ExamId` union. Icon `heart` already exists.

```ts
const aswb: ExamConfig = {
  id: "aswb",
  stateCode: "ASWB",
  idBase: 15400,
  slug: "/aswb-masters",
  landingPath: "/aswb-masters-practice-test",
  name: "ASWB Masters Practice Test",
  shortName: "ASWB Masters",
  examLabel: "ASWB Masters exam",
  fullName: "ASWB Masters social work licensing exam",
  questionIdPrefix: "ASWB-",
  icon: "heart",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // ASWB Masters content outline in the 2026 Examination Guidebook, for exams from August 3, 2026
  // (checked November 2026): 122 questions (110 scored, 12 pretest) in 4 hours; I Values and Ethics
  // 35%, II Assessment and Planning 33%, III Intervention and Practice 32%, scaled to 50 per test as
  // 18/16/16 and split by competency: IA 6, IB 7, IC 5; IIA 8, IIB+IIC 8; IIIA+IIIB 10, IIIC+IIID 6.
  // ASWB reports pass/fail against a per-form number correct; 70% is a readiness marker. All items original.
  blueprint: {
    aswbEthics: 6,
    aswbService: 7,
    aswbDiversity: 5,
    aswbConcepts: 8,
    aswbMethods: 8,
    aswbIntervention: 10,
    aswbEvalSup: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 15401, name: "Ethics & Service Delivery", categories: ["aswbEthics", "aswbService"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 15402, name: "Diversity & Human Behavior", categories: ["aswbDiversity", "aswbConcepts"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 3, id: 15403, name: "Assessment Methods & Planning", categories: ["aswbMethods"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 4, id: 15404, name: "Intervention Methods & Practice", categories: ["aswbIntervention"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 15405, name: "Evaluation, Research & Supervision", categories: ["aswbEvalSup"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    aswbEthics: "Ethical Principles & Responsibilities",
    aswbService: "Ethical Service Delivery",
    aswbDiversity: "Diversity & Social Justice",
    aswbConcepts: "Assessment Concepts",
    aswbMethods: "Assessment Methods & Planning",
    aswbIntervention: "Intervention Methods & Practice",
    aswbEvalSup: "Evaluation, Research & Supervision",
  },
  copy: {
    guestPrompt: "to save your ASWB Masters progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Five sets covering all three areas of the 2026 ASWB Masters outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions weighted like the real exam",
    heroSubs: [
      "Three content areas, four mock exams. Ethics weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. Schedule your ASWB exam.",
    ],
    sourceLine: "Based on the ASWB Masters content outline (2026 Examination Guidebook). Original questions; 50 per test, weighted like the real exam. Not affiliated with ASWB.",
    analyticsKey: "aswb",
  },
};
```

Append `aswb` to the `EXAMS` array (with the healthcare exams, after `rbt`).

Check: 15401-15405 (tests 15401-15404, sets 15401-15405) must be free (spec row assigns idBase 15400).

## lib/banks/all.ts

```ts
import "./aswb";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/aswb.ts`.

## types/index.ts

- `QuestionType`: add `| "ASWB"`.
- `QuestionCategory`, under a `// ASWB Masters (social work licensing)` comment:

```ts
  | "aswbEthics"
  | "aswbService"
  | "aswbDiversity"
  | "aswbConcepts"
  | "aswbMethods"
  | "aswbIntervention"
  | "aswbEvalSup"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    aswbEthics: "Ethical Principles & Responsibilities",
    aswbService: "Ethical Service Delivery",
    aswbDiversity: "Diversity & Social Justice",
    aswbConcepts: "Assessment Concepts",
    aswbMethods: "Assessment Methods & Planning",
    aswbIntervention: "Intervention Methods & Practice",
    aswbEvalSup: "Evaluation, Research & Supervision",
```

## app/globals.css

Hue from the batch A table (290 35% 42%, already checked), then run `tools/gen_dark_brand_css.py`.

```css
  /* ASWB Masters (social work licensing) theme */
  [data-theme="aswb"] {
    --brand: 290 35% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 290 50% 96%;
    --brand-hover: 290 35% 36%;
    --brand-dark: 290 35% 32%;
    --brand-darker: 290 32% 22%;
    --brand-muted: 290 22% 72%;
    --brand-border: 290 24% 80%;
    --brand-border-light: 290 22% 89%;
    --brand-gradient-to: 260 40% 96%;
  }
```

## lib/tigerAssets.ts

No ASWB tiger set exists. Borrow the RBT tiger (nearest helping-profession exam):
add `aswb: "rbt",` to `BORROWED_SETS` (drop it once `public/tigers/aswb/` exists).

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `aswb: "ASWB Masters social work licensing exam on the 2026 three-area outline: values and ethics, assessment and planning, and intervention and practice, from confidentiality and boundaries to DSM-5-TR, interventions and supervision.",`
- `EXAM_ORG`: `aswb: "ASWB · Masters exam, 2026 content outline",`
- Hub group: add `"aswb"` to `{ title: "Healthcare certification exams", ids: [...] }` (after `"rbt"`). If the integrator makes a "Social work and counseling" group with `nce`, put both there instead.
- `SEARCH_ALIASES`:
  `aswb: "aswb masters lmsw lgsw lsw social work license exam social work licensing exam msw exam association of social work boards social worker test masters social work exam",`

## lib/region.ts

Nothing: US is the default (`TEST_REGIONS` needs no line for a US exam).

## lib/examFacts.ts

```ts
  aswb: {
    answer:
      "The ASWB Masters exam is the Association of Social Work Boards licensing exam that most US states and several Canadian provinces use for the first license after a master's degree in social work, often called the LMSW. Since August 3, 2026 it has 122 multiple-choice questions in two sections of 61, with four hours to finish; 12 are unscored pretest questions, so 110 count. Questions have three or four options. The outline has three content areas: Values and Ethics 35%, Assessment and Planning 33%, and Intervention and Practice 32%. The result is pass or fail, with the number of correct answers needed set for each exam form.",
    rows: [
      { label: "Questions", value: "122 multiple choice (110 scored, 12 pretest)" },
      { label: "Time", value: "4 hours, two sections of 61" },
      { label: "Options", value: "3 or 4 per question" },
      { label: "Pass mark", value: "Pass/fail; number correct needed varies slightly by exam form" },
      { label: "Content", value: "Values and Ethics 35%, Assessment and Planning 33%, Intervention and Practice 32%" },
      { label: "Since", value: "August 3, 2026 (2026 outline, 3 content areas)" },
      { label: "Where", value: "Pearson test centers, after board approval" },
      { label: "Run by", value: "Association of Social Work Boards (ASWB)" },
    ],
    basedOn: "The ASWB Examination Guidebook (2026), Masters content outline, checked November 2026",
    source: { name: "ASWB: Examination Guidebook", url: "https://www.aswb.org/wp-content/uploads/2026/05/2026-Social-Work-Licensing-Exam-Guidebook-5.4.2026.pdf" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"aswb"` to `TEACHER_LED` (MSW programs and licensure prep courses set it), and in `TEACHES`:
`aswb: "in an MSW program or run ASWB licensure prep",`. The landing already renders
`<ExamClassFaq examId="aswb" />` and `classFaqJsonLd("aswb")`. If the integrator decides it is
self-study only, remove both from the landing instead.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `heart` exists; sitemaps map over `EXAMS`; no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing aswb:aswb-masters:15401`

## CLAUDE.md (under Additional Exams)

```md
- **ASWB Masters** (ASWB Masters social work licensing exam, the LMSW exam in many states, `/aswb-masters/*`, landing `/aswb-masters-practice-test`): `data/aswb-masters-questions.json` (200 questions on the Masters content outline in the 2026 ASWB Examination Guidebook, exams from August 3, 2026: ethical principles 24, ethical service delivery 28, diversity and social justice 20 (Values and Ethics 35%), assessment concepts 32, assessment methods and planning 32 (Assessment and Planning 33%), intervention 40, evaluation, research and supervision 24 (Intervention and Practice 32%)), test IDs 15401-15404, sets 15401-15405, state `ASWB`, prefix `ASWB-`, 70% pass (readiness marker: the real exam, 122 questions with 110 scored in 4 hours, is pass/fail against a per-form number correct). 6/7/5/8/8/10/6 per test (18/16/16). Real items have three or four options; ours four. Items that matched the NCE bank were rewritten. Built by `tools/next100/aswb/build.py`; sources in `tools/next100/aswb/sources.md`. Hub group "Healthcare certification exams", `[data-theme="aswb"]` muted violet (290 35% 42%), borrows the RBT tiger, teacher-led (MSW programs and licensure prep).
```
