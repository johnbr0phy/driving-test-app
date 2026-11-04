# Wiring for `cma` (CMA (AAMA) Certified Medical Assistant exam, US, v1)

Files already written by the builder: `data/cma-questions.json` (200, PASS),
`lib/banks/cma.ts`, `app/cma-aama/*` (layout, redirect, dashboard, drill, stats; copied from
`app/arrt-radiography/`), `app/cma-aama-practice-test/page.tsx`, `tools/next100/cma/*` (spec,
sources, `q_*.py`, `build.py`). Everything below goes in shared files. `npx tsc` reports an error
in `lib/banks/cma.ts` until `"cma"` is added to `ExamId`.

Format note: the real exam is 200 questions (180 scored + 20 pretest) in four 40-minute segments
(160 minutes), scaled 200 to 800 with a minimum passing score of 405 (AAMA certification FAQ, read
2026-11-03; some guides still say 430). Modelled as the standard four 50-question tests weighted
like the 180 scored items under the AAMA Content Outline (Rev 1/26): Clinical 106, General 38,
Administrative 36, split into 9 pools. Dashboard = 6 training sets + 4 tests = 10 steps (topic
sets like the template, not `testSets()`). Pass line `ceil(0.70 * 50) = 35`, a readiness target.
Pools are exactly 4x per-test, so no item repeats across tests.

Id note: the exam id is `cma` and the NHA exam is `ccma`; the category keys (`cma*`) do not collide
with `ccma*`. The bank file is `data/cma-questions.json` (distinct from `data/ccma-questions.json`).

## lib/exams.ts

Add `"cma"` to the `ExamId` union. Icon `stethoscope` already exists.

```ts
const cma: ExamConfig = {
  id: "cma",
  stateCode: "CMA",
  idBase: 15900,
  slug: "/cma-aama",
  landingPath: "/cma-aama-practice-test",
  name: "CMA (AAMA) Practice Test",
  shortName: "CMA (AAMA)",
  examLabel: "CMA (AAMA) exam",
  fullName: "CMA (AAMA) Certification Exam",
  questionIdPrefix: "CMA-",
  icon: "stethoscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // AAMA Content Outline for the CMA (AAMA) Certification Exam, Rev 1/26 (checked November 2026):
  // 200 questions, 180 scored + 20 pretest. Clinical Competency 106 (59%: patient intake and
  // discharge, safety and infection control, procedures/examinations, pharmacology); General 38
  // (21%: legal and ethical issues, communication); Administrative 36 (20%: billing, coding and
  // insurance; scheduling and health information management). Scaled to 50 per test: clinical 29
  // (7/6/6/5/5), general 11 (6/5), administrative 10 (6/4); the split inside each section is
  // Tigertest's. AAMA reports a scaled score (200 to 800, 405 to pass); 70% is a readiness marker.
  // No image items. All items original.
  blueprint: {
    cmaIntake: 7,
    cmaSafety: 6,
    cmaProcedures: 6,
    cmaLab: 5,
    cmaPharm: 5,
    cmaLegal: 6,
    cmaComm: 5,
    cmaBilling: 6,
    cmaScheduling: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 15901, name: "Patient Intake & Documentation", categories: ["cmaIntake"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 2, id: 15902, name: "Safety, Infection Control & First Aid", categories: ["cmaSafety"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 3, id: 15903, name: "Procedures, Instruments & Anatomy", categories: ["cmaProcedures"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 4, id: 15904, name: "Lab Tests & Pharmacology", categories: ["cmaLab", "cmaPharm"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 15905, name: "Legal, Ethics & Communication", categories: ["cmaLegal", "cmaComm"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 6, id: 15906, name: "Billing, Coding & Scheduling", categories: ["cmaBilling", "cmaScheduling"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    cmaIntake: "Patient Intake & Discharge",
    cmaSafety: "Safety, Infection Control & First Aid",
    cmaProcedures: "Procedures, Instruments & Anatomy",
    cmaLab: "Lab & Diagnostic Testing",
    cmaPharm: "Pharmacology",
    cmaLegal: "Legal & Ethical Issues",
    cmaComm: "Communication",
    cmaBilling: "Billing, Coding & Insurance",
    cmaScheduling: "Scheduling & Health Records",
  },
  copy: {
    guestPrompt: "to save your CMA (AAMA) progress and track every question you miss",
    trainingHeading: "Train by AAMA content area",
    trainingSub: "Six sets covering the clinical, general and administrative sections of the AAMA content outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions weighted like the real 180 scored",
    heroSubs: [
      "Three sections, four mock exams. Clinical weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You're ready for the CMA (AAMA).",
    ],
    sourceLine: "Based on the AAMA Content Outline for the CMA (AAMA) Certification Exam. Original questions; 50 per test, weighted like the real exam. Not affiliated with the AAMA.",
    analyticsKey: "cma",
  },
};
```

Append `cma` to the `EXAMS` array (with the healthcare exams, after `ccma`).

Check: 15901-15906 (tests 15901-15904, sets 15901-15906) must be free (row assigns idBase 15900).

## lib/banks/all.ts

```ts
import "./cma";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/cma.ts`.

## types/index.ts

- `QuestionType`: add `| "CMA"`.
- `QuestionCategory`, under a `// CMA (AAMA)` comment:

```ts
  | "cmaIntake"
  | "cmaSafety"
  | "cmaProcedures"
  | "cmaLab"
  | "cmaPharm"
  | "cmaLegal"
  | "cmaComm"
  | "cmaBilling"
  | "cmaScheduling"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cmaIntake: "Patient Intake & Discharge",
    cmaSafety: "Safety, Infection Control & First Aid",
    cmaProcedures: "Procedures, Instruments & Anatomy",
    cmaLab: "Lab & Diagnostic Testing",
    cmaPharm: "Pharmacology",
    cmaLegal: "Legal & Ethical Issues",
    cmaComm: "Communication",
    cmaBilling: "Billing, Coding & Insurance",
    cmaScheduling: "Scheduling & Health Records",
```

## app/globals.css

Hue as given in the brief (330 35% 32%), then run `tools/gen_dark_brand_css.py`.

```css
  /* CMA (AAMA) theme */
  [data-theme="cma"] {
    --brand: 330 35% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 330 40% 96%;
    --brand-hover: 330 35% 27%;
    --brand-dark: 330 35% 24%;
    --brand-darker: 330 35% 16%;
    --brand-muted: 330 20% 72%;
    --brand-border: 330 25% 80%;
    --brand-border-light: 330 25% 89%;
    --brand-gradient-to: 345 40% 96%;
  }
```

## lib/tigerAssets.ts

`BORROWED_SETS`: `cma: "ccma",` (the medical assistant tiger) until CMA gets its own set.

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cma: "AAMA Certified Medical Assistant exam on the content outline: patient intake, infection control and first aid, procedures, lab tests, pharmacology, law and ethics, communication, billing, coding and scheduling.",`
- `EXAM_ORG`: `cma: "AAMA Certifying Board · CMA (AAMA) content outline",`
- Hub group: add `"cma"` to `{ title: "Healthcare certification exams", ids: [...] }` (right after `"ccma"`).
- `SEARCH_ALIASES`:
  `cma: "cma cma aama aama certified medical assistant medical assistant certification ma exam ma certification medical assisting boards aama exam cma exam caahep abhes",`
- `RELATED_OVERRIDES` (optional): `cma: ["ccma", "phleb", "cet", "cna"],` and add `"cma"` to the
  `cpc` / `cca` lists if wanted.

## lib/region.ts

Nothing: US is the default.

## lib/examFacts.ts

```ts
  cma: {
    answer:
      "The CMA (AAMA) Certification Exam is the Certifying Board of the American Association of Medical Assistants' exam for medical assistants, which earns the CMA (AAMA) credential. It has 200 multiple-choice questions on a computer, 180 scored and 20 unscored pretest items, given in four 40-minute segments (160 minutes of test time) at a PSI test center or by live remote proctoring. Under the current content outline the scored questions are Clinical Competency 106, General 38 and Administrative 36. Scores run from 200 to 800, and the minimum passing score is 405. The credential is recertified every 60 months.",
    rows: [
      { label: "Questions", value: "200 multiple choice (180 scored, 20 pretest)" },
      { label: "Time", value: "160 minutes, four 40-minute segments" },
      { label: "Pass mark", value: "Scaled score of 405 (scale 200 to 800)" },
      { label: "Content", value: "Clinical 106 (59%), General 38 (21%), Administrative 36 (20%)" },
      { label: "Where", value: "PSI test center or live remote proctoring" },
      { label: "Recertification", value: "Every 60 months, by CEUs or by exam" },
      { label: "Run by", value: "Certifying Board of the American Association of Medical Assistants (AAMA)" },
    ],
    basedOn: "The AAMA Content Outline for the CMA (AAMA) Certification Exam (Rev 1/26) and the AAMA certification FAQ, checked November 2026",
    source: { name: "AAMA: CMA (AAMA) Certification", url: "https://www.aama-ntl.org/certification" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"cma"` to `TEACHER_LED` (medical assisting programs set CMA review), and in `TEACHES`:
`cma: "a medical assisting program",`. The landing already renders `<ExamClassFaq examId="cma" />`
and `classFaqJsonLd("cma")`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `stethoscope` exists; sitemaps map over `EXAMS`; no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cma:cma-aama:15901`

## CLAUDE.md (under Additional Exams)

```md
- **CMA (AAMA)** (AAMA Certified Medical Assistant exam, `/cma-aama/*`, landing `/cma-aama-practice-test`): `data/cma-questions.json` (200 questions on the AAMA Content Outline, Rev 1/26: Clinical Competency 106 of 180 scored as patient intake and discharge 28, safety, infection control and first aid 24, procedures, instruments and anatomy 24, lab and diagnostic testing 20, pharmacology 20; General 38 as legal and ethical 24, communication 20; Administrative 36 as billing, coding and insurance 24, scheduling and health records 16), test IDs 15901-15904, sets 15901-15906 (by content area), state `CMA`, prefix `CMA-`, 70% pass (readiness marker; the real exam is 200 questions, 180 scored, in four 40-minute segments, scaled 200 to 800 with 405 to pass). 7/6/6/5/5/6/5/6/4 per test (clinical 29, general 11, administrative 10; the split inside each section is Tigertest's). ECG strips and charts described in words. Exam id `cma`, distinct from NHA `ccma`; written against the ccma, phlebotomy, cet and cna banks. Built by `tools/next100/cma/build.py`; sources in `tools/next100/cma/sources.md`. Hub group "Healthcare certification exams", `[data-theme="cma"]` muted plum (330 35% 32%), borrows the CCMA tiger, teacher-led (medical assisting programs).
```
