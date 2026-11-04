# Wiring for `nptepta` (NPTE for Physical Therapist Assistants, US, v1)

Files already written by the builder: `data/nptepta-questions.json` (200, PASS),
`lib/banks/nptepta.ts`, `app/npte-pta/*` (layout, redirect, dashboard, drill, stats; copied
from `app/arrt-radiography/`), `app/npte-pta-practice-test/page.tsx`, `tools/next100/nptepta/*`
(spec, sources, `q_*.py`, `build.py`). Everything below goes in shared files. `npx tsc` reports an
error in `lib/banks/nptepta.ts` until `"nptepta"` is added to `ExamId`.

Format note: the real exam is 180 questions (140 scored + 40 unscored pretest) in four sections of
45, 4 hours of testing time. Modelled as the standard four 50-question tests weighted like the 140
scored items under the FSBPT NPTE-PTA Test Content Outline effective January 2024 (outline
midpoints scaled to 50, 7 pools). Dashboard = 5 training sets + 4 tests = 9 steps (topic sets like
the template, not `testSets()`). Pass line `ceil(0.70 * 50) = 35`; the real standard is a scaled
600 on a 200 to 800 scale, so 70% is a readiness target. Pools are exactly 4x per-test, so no item
repeats across tests.

## lib/exams.ts

Add `"nptepta"` to the `ExamId` union. Icon `activity` already exists.

```ts
const nptepta: ExamConfig = {
  id: "nptepta",
  stateCode: "NPTEPTA",
  idBase: 16800,
  slug: "/npte-pta",
  landingPath: "/npte-pta-practice-test",
  name: "NPTE-PTA Practice Test",
  shortName: "NPTE-PTA",
  examLabel: "NPTE-PTA",
  fullName: "National Physical Therapy Examination for Physical Therapist Assistants",
  questionIdPrefix: "PTA-",
  icon: "activity",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // FSBPT NPTE-PTA Test Content Outline, effective January 2024 (version 1.2, 9/28/2023), still
  // current November 2026: 140 scored + 40 pretest items. Ranges: cardiovascular & pulmonary
  // 20-27, musculoskeletal 31-40, neuromuscular & nervous 27-35, integumentary 3-8, metabolic &
  // endocrine 4-6, GI 0-4, GU 0-4, lymphatic 2-6, system interactions 5-7; equipment, devices &
  // technologies 8-10, therapeutic modalities 5-7, safety & protection 6-8, professional
  // responsibilities 2-4, research & EBP 1-3. Midpoints scaled to 50 per test: 8/12/11/9/3/3/4.
  // Passing standard is a scaled 600 (200 to 800); 70% is a readiness marker. All items original.
  blueprint: {
    ptaCardio: 8,
    ptaMsk: 12,
    ptaNeuro: 11,
    ptaOther: 9,
    ptaEquip: 3,
    ptaModal: 3,
    ptaProf: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 16801, name: "Cardiovascular & Pulmonary", categories: ["ptaCardio"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 16802, name: "Musculoskeletal", categories: ["ptaMsk"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 16803, name: "Neuromuscular & Nervous", categories: ["ptaNeuro"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 4, id: 16804, name: "Other Systems & System Interactions", categories: ["ptaOther"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 16805, name: "Equipment, Modalities & Professional Practice", categories: ["ptaEquip", "ptaModal", "ptaProf"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    ptaCardio: "Cardiovascular & Pulmonary",
    ptaMsk: "Musculoskeletal",
    ptaNeuro: "Neuromuscular & Nervous",
    ptaOther: "Other Systems & System Interactions",
    ptaEquip: "Equipment, Devices & Technologies",
    ptaModal: "Therapeutic Modalities",
    ptaProf: "Safety, Professional Roles & Evidence",
  },
  copy: {
    guestPrompt: "to save your NPTE-PTA progress and track every question you miss",
    trainingHeading: "Train by NPTE-PTA content area",
    trainingSub: "Five sets covering every area of the FSBPT PTA content outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions weighted like the real 140 scored",
    heroSubs: [
      "Body systems first. Musculoskeletal and neuro are half the exam.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You're board ready.",
    ],
    sourceLine: "Based on the FSBPT NPTE-PTA Test Content Outline (2024). Original questions; 50 per test, weighted like the real exam. Not affiliated with FSBPT.",
    analyticsKey: "nptepta",
  },
};
```

Append `nptepta` to the `EXAMS` array (with the healthcare exams, after `arrt`).

Check: 16801-16805 (tests 16801-16804, sets 16801-16805) must be free (row assigns idBase 16800).
Prefix `PTA-` does not collide with `PTCB-` or `PTIMT-` (no prefix is a prefix of another).

## lib/banks/all.ts

```ts
import "./nptepta";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/nptepta.ts`.

## types/index.ts

- `QuestionType`: add `| "NPTEPTA"`.
- `QuestionCategory`, under a `// NPTE-PTA` comment:

```ts
  | "ptaCardio"
  | "ptaMsk"
  | "ptaNeuro"
  | "ptaOther"
  | "ptaEquip"
  | "ptaModal"
  | "ptaProf"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ptaCardio: "Cardiovascular & Pulmonary",
    ptaMsk: "Musculoskeletal",
    ptaNeuro: "Neuromuscular & Nervous",
    ptaOther: "Other Systems & System Interactions",
    ptaEquip: "Equipment, Devices & Technologies",
    ptaModal: "Therapeutic Modalities",
    ptaProf: "Safety, Professional Roles & Evidence",
```

## app/globals.css

Hue as given in the brief (100 30% 26%), then run `tools/gen_dark_brand_css.py`.

```css
  /* NPTE-PTA theme */
  [data-theme="nptepta"] {
    --brand: 100 30% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 100 30% 95%;
    --brand-hover: 100 30% 22%;
    --brand-dark: 100 30% 20%;
    --brand-darker: 100 30% 14%;
    --brand-muted: 100 20% 70%;
    --brand-border: 100 22% 78%;
    --brand-border-light: 100 20% 88%;
    --brand-gradient-to: 120 25% 96%;
  }
```

## lib/tigerAssets.ts

`BORROWED_SETS`: `nptepta: "nasm",` (the exercise and rehab tiger) until NPTE-PTA gets its own set.

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nptepta: "NPTE-PTA board exam on the FSBPT content outline: musculoskeletal, neuromuscular, cardiovascular and pulmonary care, the other body systems, modalities, equipment, safety and the PTA's role under the PT's plan of care.",`
- `EXAM_ORG`: `nptepta: "FSBPT · NPTE for Physical Therapist Assistants",`
- Hub group: add `"nptepta"` to `{ title: "Healthcare certification exams", ids: [...] }` (after `"arrt"`).
- `SEARCH_ALIASES`:
  `nptepta: "npte pta npte-pta nptepta physical therapist assistant physical therapy assistant pta exam pta boards pta board exam pta license fsbpt national physical therapy exam pt assistant",`

## lib/region.ts

Nothing: US is the default.

## lib/examFacts.ts

```ts
  nptepta: {
    answer:
      "The NPTE-PTA is the National Physical Therapy Examination for Physical Therapist Assistants, developed by the Federation of State Boards of Physical Therapy (FSBPT) and used by state boards to license PTAs. It has 180 multiple-choice questions in four sections of 45, with 4 hours of testing time; 140 are scored and 40 are unscored pretest items. The content outline in effect since January 2024 weights musculoskeletal (31 to 40 scored items), neuromuscular and nervous (27 to 35) and cardiovascular and pulmonary (20 to 27) most. Scores are scaled from 200 to 800, and the passing standard in every jurisdiction is 600.",
    rows: [
      { label: "Questions", value: "180 multiple choice (140 scored, 40 pretest)" },
      { label: "Time", value: "4 hours of testing, 4 sections of 45" },
      { label: "Pass mark", value: "Scaled score of 600 (200 to 800)" },
      { label: "Biggest areas", value: "Musculoskeletal 31-40, neuromuscular 27-35, cardiopulmonary 20-27" },
      { label: "Test dates", value: "Fixed dates in January, April, July and October" },
      { label: "Where", value: "Computer-based at Prometric test centers" },
      { label: "Run by", value: "Federation of State Boards of Physical Therapy (FSBPT)" },
    ],
    basedOn: "The FSBPT NPTE-PTA Test Content Outline (effective January 2024) and the NPTE Candidate Handbook (version 2025.02), checked November 2026",
    source: { name: "FSBPT: NPTE Content", url: "https://www.fsbpt.org/Free-Resources/NPTE-Development/NPTE-Content" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"nptepta"` to `TEACHER_LED` (PTA programs assign board review), and in `TEACHES`:
`nptepta: "a PTA program",`. The landing already renders `<ExamClassFaq examId="nptepta" />`
and `classFaqJsonLd("nptepta")`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `activity` exists; sitemaps map over `EXAMS`; no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nptepta:npte-pta:16801`

## CLAUDE.md (under Additional Exams)

```md
- **NPTE-PTA** (FSBPT National Physical Therapy Examination for Physical Therapist Assistants, `/npte-pta/*`, landing `/npte-pta-practice-test`): `data/nptepta-questions.json` (200 questions on the FSBPT NPTE-PTA Test Content Outline effective January 2024: cardiovascular and pulmonary 32, musculoskeletal 48, neuromuscular and nervous 44, other systems and system interactions (integumentary, lymphatic, metabolic and endocrine, GI, GU, cancer, pregnancy, pain, psychiatric) 36, equipment and devices 12, modalities 12, safety, professional responsibilities and research 16), test IDs 16801-16804, sets 16801-16805 (by content area), state `NPTEPTA`, prefix `PTA-`, 70% pass (readiness marker; the real standard is a scaled 600 of 200 to 800). 8/12/11/9/3/3/4 per test, the outline midpoints of 140 scored scaled to 50 (the real exam is 180 items, 40 pretest, four sections of 45 in 4 hours). PTA scope only (works within the PT's plan of care, reports changes to the PT); supervision rules "vary by state". Graphic, video and shared-scenario items written as text. Built by `tools/next100/nptepta/build.py`; sources in `tools/next100/nptepta/sources.md`. Hub group "Healthcare certification exams", `[data-theme="nptepta"]` dark moss green (100 30% 26%), borrows the NASM tiger, teacher-led (PTA programs).
```
