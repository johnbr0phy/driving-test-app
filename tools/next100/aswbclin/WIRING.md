# Wiring for `aswbclin` (ASWB Clinical social work licensing exam, the LCSW exam, US, v1)

Files already written by the builder: `data/aswb-clinical-questions.json` (200, PASS),
`lib/banks/aswbclin.ts`, `app/aswb-clinical/*` (5 wrappers copied from `app/aswb-masters/`),
`app/aswb-clinical-practice-test/page.tsx`, `tools/next100/aswbclin/*` (spec, sources, `q_*.py`,
`build.py`). Everything below goes in shared files. `npx tsc` reports an error in
`lib/banks/aswbclin.ts` until `"aswbclin"` is added to `ExamId`.

Format note: since August 3, 2026 every ASWB exam, Clinical included, is 122 questions (110 scored +
12 unscored pretest) in two sections of 61, four hours, three- or four-option items, three content
areas. The Clinical weights are Values and Ethics 36%, Assessment and Planning 32%, Intervention and
Practice 32% (Masters is 35/33/32). As for Masters, this is four 50-question tests weighted 18/16/16
(pools exactly 4x per-test, no repeats across tests), all four-option. Dashboard = 5 training sets +
4 tests = 9 steps. Pass line `ceil(0.7 * 50) = 35`; ASWB reports pass/fail against a per-form number
correct, so 70% is a readiness target. Bank file `data/aswb-clinical-questions.json` (id `aswbclin`,
slug `/aswb-clinical`).

## lib/exams.ts

Add `"aswbclin"` to the `ExamId` union. Icon `heart` already exists.

```ts
const aswbclin: ExamConfig = {
  id: "aswbclin",
  stateCode: "ASWBCLIN",
  idBase: 16900,
  slug: "/aswb-clinical",
  landingPath: "/aswb-clinical-practice-test",
  name: "ASWB Clinical Practice Test",
  shortName: "ASWB Clinical",
  examLabel: "ASWB Clinical exam",
  fullName: "ASWB Clinical social work licensing exam",
  questionIdPrefix: "ASWBCLIN-",
  icon: "heart",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // ASWB Clinical content outline in the 2026 Examination Guidebook, for exams from August 3, 2026
  // (checked November 2026): 122 questions (110 scored, 12 pretest) in 4 hours; I Values and Ethics
  // 36%, II Assessment and Planning 32%, III Intervention and Practice 32%, scaled to 50 per test as
  // 18/16/16: IA 6, IB 7, IC 5; IIA 5, IIB (DSM-5-TR, mental status, risk) 7, IIC (planning,
  // medications) 4; III evidence-based models 8, crisis/trauma/grief/case management 4, IIIC+IIID 4.
  // ASWB reports pass/fail against a per-form number correct; 70% is a readiness marker. All items original.
  blueprint: {
    aswbclinEthics: 6,
    aswbclinService: 7,
    aswbclinDiversity: 5,
    aswbclinConcepts: 5,
    aswbclinDiagnosis: 7,
    aswbclinPlanning: 4,
    aswbclinTherapy: 8,
    aswbclinPractice: 4,
    aswbclinEvalSup: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 16901, name: "Clinical Ethics & Service Delivery", categories: ["aswbclinEthics", "aswbclinService"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 16902, name: "Diversity & Human Behavior", categories: ["aswbclinDiversity", "aswbclinConcepts"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 16903, name: "Diagnosis & Treatment Planning", categories: ["aswbclinDiagnosis", "aswbclinPlanning"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 4, id: 16904, name: "Evidence-Based Treatment Models", categories: ["aswbclinTherapy"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 5, id: 16905, name: "Crisis, Evaluation & Supervision", categories: ["aswbclinPractice", "aswbclinEvalSup"], size: 32, weightLabel: "8 of 50 test questions" },
  ],
  categoryLabels: {
    aswbclinEthics: "Ethical Principles & Responsibilities",
    aswbclinService: "Ethical Service Delivery",
    aswbclinDiversity: "Diversity & Social Justice",
    aswbclinConcepts: "Assessment Concepts",
    aswbclinDiagnosis: "DSM-5-TR Diagnosis & Mental Status",
    aswbclinPlanning: "Treatment Planning & Medications",
    aswbclinTherapy: "Evidence-Based Treatment Models",
    aswbclinPractice: "Crisis, Trauma & Case Management",
    aswbclinEvalSup: "Evaluation, Supervision & Administration",
  },
  copy: {
    guestPrompt: "to save your ASWB Clinical progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Five sets covering all three areas of the 2026 ASWB Clinical outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions weighted like the real exam",
    heroSubs: [
      "Three content areas, four mock exams. Ethics weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. Schedule your LCSW exam.",
    ],
    sourceLine: "Based on the ASWB Clinical content outline (2026 Examination Guidebook). Original questions; 50 per test, weighted like the real exam. Not affiliated with ASWB.",
    analyticsKey: "aswbclin",
  },
};
```

Append `aswbclin` to the `EXAMS` array right after `aswb`.

Check: 16901-16905 (tests 16901-16904, sets 16901-16905) must be free (batch C table assigns idBase 16900).

## lib/banks/all.ts

```ts
import "./aswbclin";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/aswbclin.ts`.

## types/index.ts

- `QuestionType`: add `| "ASWBCLIN"`.
- `QuestionCategory`, under a `// ASWB Clinical (LCSW licensing)` comment:

```ts
  | "aswbclinEthics"
  | "aswbclinService"
  | "aswbclinDiversity"
  | "aswbclinConcepts"
  | "aswbclinDiagnosis"
  | "aswbclinPlanning"
  | "aswbclinTherapy"
  | "aswbclinPractice"
  | "aswbclinEvalSup"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    aswbclinEthics: "Ethical Principles & Responsibilities",
    aswbclinService: "Ethical Service Delivery",
    aswbclinDiversity: "Diversity & Social Justice",
    aswbclinConcepts: "Assessment Concepts",
    aswbclinDiagnosis: "DSM-5-TR Diagnosis & Mental Status",
    aswbclinPlanning: "Treatment Planning & Medications",
    aswbclinTherapy: "Evidence-Based Treatment Models",
    aswbclinPractice: "Crisis, Trauma & Case Management",
    aswbclinEvalSup: "Evaluation, Supervision & Administration",
```

## app/globals.css

Hue from the batch C table (300 20% 34%, already checked), then run `tools/gen_dark_brand_css.py`.

```css
  /* ASWB Clinical (LCSW licensing) theme */
  [data-theme="aswbclin"] {
    --brand: 300 20% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 300 30% 96%;
    --brand-hover: 300 20% 29%;
    --brand-dark: 300 20% 26%;
    --brand-darker: 300 18% 18%;
    --brand-muted: 300 14% 70%;
    --brand-border: 300 15% 80%;
    --brand-border-light: 300 14% 89%;
    --brand-gradient-to: 280 25% 96%;
  }
```

## lib/tigerAssets.ts

No ASWB Clinical tiger set exists. Borrow the ASWB Masters tiger (same exam family):
add `aswbclin: "aswb",` to `BORROWED_SETS` (drop it once `public/tigers/aswbclin/` exists).

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `aswbclin: "ASWB Clinical social work licensing exam (LCSW) on the 2026 three-area outline: clinical ethics, DSM-5-TR diagnosis and mental status, treatment planning and medications, and evidence-based treatments from CBT and DBT to motivational interviewing.",`
- `EXAM_ORG`: `aswbclin: "ASWB · Clinical exam, 2026 content outline",`
- Hub group: add `"aswbclin"` to `{ title: "Social work and counseling exams", ids: ["aswb", "aswbclin", "nce"] }` (right after `"aswb"`).
- `SEARCH_ALIASES`:
  `aswbclin: "aswb clinical lcsw licsw lcsw-c lisw licensed clinical social worker exam clinical social work license exam aswb clinical exam lcsw test association of social work boards clinical",`
- `RELATED_OVERRIDES`: `aswbclin: ["aswb", "nce", "rbt"],` and consider changing `aswb` to `["aswbclin", "nce", "rbt"]`.

## lib/region.ts

Nothing: US is the default (`TEST_REGIONS` needs no line for a US exam).

## lib/examFacts.ts

```ts
  aswbclin: {
    answer:
      "The ASWB Clinical exam is the Association of Social Work Boards licensing exam that most US states and several Canadian provinces use for the clinical social work license, often called the LCSW, usually after a master's degree in social work and about two years of supervised clinical experience. Since August 3, 2026 it has 122 multiple-choice questions in two sections of 61, with four hours to finish; 12 are unscored pretest questions, so 110 count. Questions have three or four options. The Clinical outline has three content areas: Values and Ethics 36%, Assessment and Planning 32%, and Intervention and Practice 32%. The result is pass or fail, with the number of correct answers needed set for each exam form.",
    rows: [
      { label: "Questions", value: "122 multiple choice (110 scored, 12 pretest)" },
      { label: "Time", value: "4 hours, two sections of 61" },
      { label: "Options", value: "3 or 4 per question" },
      { label: "Pass mark", value: "Pass/fail; number correct needed varies slightly by exam form" },
      { label: "Content", value: "Values and Ethics 36%, Assessment and Planning 32%, Intervention and Practice 32%" },
      { label: "Since", value: "August 3, 2026 (2026 outline, 3 content areas)" },
      { label: "Where", value: "Pearson test centers, after board approval" },
      { label: "Run by", value: "Association of Social Work Boards (ASWB)" },
    ],
    basedOn: "The ASWB Examination Guidebook (August 2026), Clinical content outline, checked November 2026",
    source: { name: "ASWB: Examination Guidebook", url: "https://www.aswb.org/wp-content/uploads/2026/05/2026-Social-Work-Licensing-Exam-Guidebook-5.4.2026.pdf" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"aswbclin"` to `TEACHER_LED` (clinical supervisors and LCSW prep courses set it), and in `TEACHES`:
`aswbclin: "LCSW exam prep or clinical social work in an MSW program",` (reads "I teach LCSW exam prep or clinical social work in an MSW program."). The landing already renders
`<ExamClassFaq examId="aswbclin" />` and `classFaqJsonLd("aswbclin")`. If the integrator decides it is
self-study only, remove both from the landing instead.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `heart` exists; sitemaps map over `EXAMS`; no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing aswbclin:aswb-clinical:16901`

## CLAUDE.md (under Additional Exams, after ASWB Masters)

```md
- **ASWB Clinical** (ASWB Clinical social work licensing exam, the LCSW exam in most states, `/aswb-clinical/*`, landing `/aswb-clinical-practice-test`): `data/aswb-clinical-questions.json` (200 questions on the Clinical content outline in the August 2026 ASWB Examination Guidebook, exams from August 3, 2026: ethical principles 24, ethical service delivery 28, diversity and social justice 20 (Values and Ethics 36%), assessment concepts 20, DSM-5-TR diagnosis and mental status 28, treatment planning and medications 16 (Assessment and Planning 32%), evidence-based treatment models 32, crisis, trauma and case management 16, evaluation, supervision and administration 16 (Intervention and Practice 32%)), test IDs 16901-16904, sets 16901-16905, state `ASWBCLIN`, prefix `ASWBCLIN-`, 70% pass (readiness marker: the real exam, 122 questions with 110 scored in 4 hours, is pass/fail against a per-form number correct). 6/7/5/5/7/4/8/4/4 per test (18/16/16). Real items have three or four options; ours four. Checked against the ASWB Masters and NCE banks; four near-repeats were rewritten. Built by `tools/next100/aswbclin/build.py`; sources in `tools/next100/aswbclin/sources.md`. Hub group "Social work and counseling exams", `[data-theme="aswbclin"]` muted plum (300 20% 34%), borrows the ASWB tiger, teacher-led (clinical supervisors and LCSW prep).
```
