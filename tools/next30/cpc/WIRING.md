# Wiring for `cpc` (AAPC CPC medical coding exam, US, v1)

Files already written by the builder: `data/cpc-questions.json` (200, PASS), `lib/banks/cpc.ts`,
`app/cpc/*` (8 wrappers, copied from `app/life-in-the-uk/`), `app/cpc-practice-test/page.tsx`,
`tools/next30/cpc/*` (spec, sources, `q_*.py`, `build.py`). Everything below goes in shared files.

Format: 4 tests x 50 (half the real 100, same proportions), 5 training sets (all 200 items).
Dashboard = 5 sets + 4 tests = 9 steps. Pass line 70% (35 of 50), like the real 70%.
Each pool is exactly 4x its per-test count, so no item repeats across tests.

## lib/exams.ts

Add `"cpc"` to the `ExamId` union. Icon `book` already exists in the icon union.

```ts
const cpc: ExamConfig = {
  id: "cpc",
  stateCode: "CPC",
  idBase: 10900,
  slug: "/cpc",
  landingPath: "/cpc-practice-test",
  name: "CPC Practice Test",
  shortName: "CPC",
  examLabel: "CPC exam",
  fullName: "AAPC Certified Professional Coder (CPC) exam",
  questionIdPrefix: "CPC-",
  icon: "book",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // AAPC "Taking the CPC Exam" (checked 2026-10-30): 100 multiple-choice questions in 4 hours, 70%
  // overall to pass, open code book (CPT Professional Edition, ICD-10-CM, HCPCS Level II). AAPC's
  // per-area counts (terminology 4, anatomy 4, compliance 3, guidelines 7, ICD-10-CM 5, HCPCS 3,
  // CPT 10000-60000 series 6 each, radiology 6, lab 6, medicine 6, E/M 6, anesthesia 4, cases 10)
  // are halved here. Guidelines and concepts only: no item reproduces a CPT descriptor or needs a
  // code-book lookup. Cases are short scenarios on modifiers, repairs and sequencing. All original.
  blueprint: {
    cpcTerm: 2,
    cpcAnat: 2,
    cpcComp: 2,
    cpcGuide: 4,
    cpcIcd: 3,
    cpcHcpcs: 2,
    cpcInteg: 3,
    cpcMusc: 3,
    cpcCardio: 3,
    cpcDigest: 3,
    cpcUro: 3,
    cpcNerve: 3,
    cpcRad: 3,
    cpcLab: 3,
    cpcMed: 3,
    cpcEm: 3,
    cpcAnes: 2,
    cpcCases: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 10901, name: "Foundations & Guidelines", categories: ["cpcTerm", "cpcAnat", "cpcComp", "cpcGuide"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 10902, name: "ICD-10-CM, HCPCS & Cases", categories: ["cpcIcd", "cpcHcpcs", "cpcCases"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 3, id: 10903, name: "Surgery 10000 to 30000", categories: ["cpcInteg", "cpcMusc", "cpcCardio"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 4, id: 10904, name: "Surgery 40000 to 60000", categories: ["cpcDigest", "cpcUro", "cpcNerve"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 10905, name: "E/M, Anesthesia, Radiology, Lab & Medicine", categories: ["cpcEm", "cpcAnes", "cpcRad", "cpcLab", "cpcMed"], size: 56, weightLabel: "14 of 50 test questions" },
  ],
  categoryLabels: {
    cpcTerm: "Medical Terminology",
    cpcAnat: "Anatomy",
    cpcComp: "Compliance & Regulatory",
    cpcGuide: "Coding Guidelines & Modifiers",
    cpcIcd: "ICD-10-CM",
    cpcHcpcs: "HCPCS Level II",
    cpcInteg: "Surgery 10000: Integumentary",
    cpcMusc: "Surgery 20000: Musculoskeletal",
    cpcCardio: "Surgery 30000: Respiratory & Cardiovascular",
    cpcDigest: "Surgery 40000: Digestive",
    cpcUro: "Surgery 50000: Urinary, Genital & Maternity",
    cpcNerve: "Surgery 60000: Endocrine, Nervous, Eye & Ear",
    cpcRad: "Radiology",
    cpcLab: "Pathology & Laboratory",
    cpcMed: "Medicine",
    cpcEm: "Evaluation & Management",
    cpcAnes: "Anesthesia",
    cpcCases: "Coding Cases",
  },
  copy: {
    guestPrompt: "to save your CPC progress and track every question you miss",
    trainingHeading: "Train by code set",
    trainingSub: "Five sets covering all 17 AAPC areas plus coding cases. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions weighted like the real exam, 70% to pass",
    heroSubs: [
      "Seventeen areas, four mock tests. Surgery weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Schedule your CPC exam.",
    ],
    sourceLine: "Based on AAPC's published CPC exam areas, the ICD-10-CM Official Guidelines, CMS rules and CPT conventions. Original questions; no code-book lookups.",
    analyticsKey: "cpc",
  },
};
```

Append `cpc` to the `EXAMS` array (healthcare exams). Check that 10901-10905 are free; if another
builder took 10900, move the whole block (idBase and the five set ids) to the next free hundred.

## lib/banks/all.ts

```ts
import "./cpc";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/cpc.ts`.

## types/index.ts

- `QuestionType`: add `| "CPC"`.
- `QuestionCategory`, under a `// CPC medical coding` comment:

```ts
  | "cpcTerm"
  | "cpcAnat"
  | "cpcComp"
  | "cpcGuide"
  | "cpcIcd"
  | "cpcHcpcs"
  | "cpcInteg"
  | "cpcMusc"
  | "cpcCardio"
  | "cpcDigest"
  | "cpcUro"
  | "cpcNerve"
  | "cpcRad"
  | "cpcLab"
  | "cpcMed"
  | "cpcEm"
  | "cpcAnes"
  | "cpcCases"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cpcTerm: "Medical Terminology",
    cpcAnat: "Anatomy",
    cpcComp: "Compliance & Regulatory",
    cpcGuide: "Coding Guidelines & Modifiers",
    cpcIcd: "ICD-10-CM",
    cpcHcpcs: "HCPCS Level II",
    cpcInteg: "Surgery 10000: Integumentary",
    cpcMusc: "Surgery 20000: Musculoskeletal",
    cpcCardio: "Surgery 30000: Respiratory & Cardiovascular",
    cpcDigest: "Surgery 40000: Digestive",
    cpcUro: "Surgery 50000: Urinary, Genital & Maternity",
    cpcNerve: "Surgery 60000: Endocrine, Nervous, Eye & Ear",
    cpcRad: "Radiology",
    cpcLab: "Pathology & Laboratory",
    cpcMed: "Medicine",
    cpcEm: "Evaluation & Management",
    cpcAnes: "Anesthesia",
    cpcCases: "Coding Cases",
```

## app/globals.css

Suggested hue 280 (violet; re-pick if it clashes), then run `tools/gen_dark_brand_css.py`.

```css
  /* CPC medical coding theme */
  [data-theme="cpc"] {
    --brand: 280 50% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 280 60% 96%;
    --brand-hover: 280 50% 36%;
    --brand-dark: 280 50% 32%;
    --brand-darker: 280 45% 20%;
    --brand-muted: 280 30% 72%;
    --brand-border: 280 30% 80%;
    --brand-border-light: 280 28% 89%;
    --brand-gradient-to: 220 60% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cpc: "AAPC Certified Professional Coder exam. Coding guidelines, modifiers, ICD-10-CM, HCPCS, every CPT surgery series, E/M, anesthesia and coding cases, weighted like the real 100 questions.",`
- `EXAM_ORG`: `cpc: "AAPC · medical coding certification",`
- Hub group: add `"cpc"` to "Healthcare certification exams" (after `"ccma"`).
- `SEARCH_ALIASES`:
  `cpc: "cpc certified professional coder aapc medical coding coder billing and coding icd-10-cm cpt hcpcs modifiers e/m",`
- `RELATED_OVERRIDES` (optional): `cpc: ["ccma", "ptcb", "phleb", "cna"],`

## lib/region.ts

Nothing: US is the default region, and `NON_DRIVING_TESTS` lists only non-US exams.

## lib/examFacts.ts

```ts
  cpc: {
    answer:
      "The CPC exam is AAPC's certification test for professional medical coders. It has 100 multiple-choice questions in one 4-hour sitting, and you need 70 percent overall, at least 70 correct, to pass. It is open code book: you bring the AMA CPT Professional Edition and ICD-10-CM and HCPCS Level II manuals, and the questions cover 17 areas, from terminology, anatomy and compliance to every CPT section, plus 10 medical record cases. You can take it at a testing center or at home with a live remote proctor.",
    rows: [
      { label: "Questions", value: "100 multiple choice" },
      { label: "Time", value: "4 hours, one sitting" },
      { label: "Pass mark", value: "70% overall (70 of 100)" },
      { label: "Code books", value: "CPT, ICD-10-CM, HCPCS Level II (open book)" },
      { label: "Cases", value: "10 medical records, 1 question each" },
      { label: "Where", value: "Testing center or live remote proctor" },
      { label: "Run by", value: "AAPC" },
    ],
    basedOn: "AAPC's Taking the CPC Exam page, checked October 2026",
    source: { name: "AAPC: Taking the CPC Exam", url: "https://www.aapc.com/certifications/cpc/taking-the-cpc-exam" },
  },
```
(Fee left out by house style; AAPC listed $425 for one attempt and $499 for two on 2026-10-30.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"cpc"` to `TEACHER_LED` (taught in coding certificate programs). In `TEACHES`, under
Healthcare programs: `cpc: "a medical coding program",`. The landing already renders
`<ExamClassFaq examId="cpc" />` and `classFaqJsonLd("cpc")`.

## lib/tigerAssets.ts

Nothing; falls back to the DMV tiger.

## Landing breadcrumbs

No `ExamLandingBreadcrumbs` component exists in this tree (same as uklitu). If the integrator
adds it, place `<ExamLandingBreadcrumbs examId="cpc" />` right after the JSON-LD script.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `book` already maps to `BookOpenCheck` in `TestIcon.tsx`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cpc:cpc:10901`

## CLAUDE.md (under Additional Exams)

```md
- **CPC** (AAPC Certified Professional Coder, `/cpc/*`, landing `/cpc-practice-test`): `data/cpc-questions.json` (200 questions on AAPC's 17 areas plus cases: terminology 8, anatomy 8, compliance 8, guidelines and modifiers 16, ICD-10-CM 12, HCPCS 8, each CPT surgery series 12, radiology 12, lab 12, medicine 12, E/M 12, anesthesia 8, cases 12), test IDs 10901-10904, sets 10901-10905, state `CPC`, 70% pass. 2/2/2/4/3/2, 3 per surgery series, 3/3/3/3/2/3 per test (AAPC's per-area counts halved). Guidelines and concepts only: no CPT descriptors, no code-book lookups. Built by `tools/next30/cpc/build.py`; sources in `tools/next30/cpc/sources.md`.
```
