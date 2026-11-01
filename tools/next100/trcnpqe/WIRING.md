# Wiring for `trcnpqe` (TRCN Professional Qualifying Examination, v1)

Files already written by the builder: `data/trcn-pqe-questions.json` (200, PASS),
`lib/banks/trcnpqe.ts`, `app/trcn-pqe/*` (8 wrappers, copied from `app/let-reviewer/`),
`app/trcn-pqe-practice-test/page.tsx`, `tools/next100/trcnpqe/*` (spec, sources, `q_*.py`,
`build.py`). Rebuild with `python3 -I tools/next100/trcnpqe/build.py`. Everything below goes in
shared files. `npx tsc` reports an error in `lib/banks/trcnpqe.ts` until `"trcnpqe"` is in `ExamId`.

Format note: TRCN's own PQE curriculum guide (trcn.gov.ng/pqe-curriculum, checked 2026-11-01)
gives 60 questions, 60 minutes, computer-based, May and November diets, and five core areas of
20% each: Pedagogy, Literacy, Numeracy, ICT, Safeguarding. Tigertest models it at full length:
three 60-question tests, 12 per area (two categories of 6 each). Each category pool is 20: 18 for
the three tests plus 2 training-only spares (the last two ids of each segment), like `phlto`.
TRCN publishes no pass mark; guides say 50%. `passPct` 60 (36 of 60) is Tigertest's readiness
target, said on the landing and in `sourceLine`. Dashboard = 5 area sets + 3 tests = 8 steps; no
set exceeds 60, so no parts.

## lib/exams.ts

Add `"trcnpqe"` to the `ExamId` union. Icon `graduation` already exists.

```ts
const trcnpqe: ExamConfig = {
  id: "trcnpqe",
  stateCode: "TRCNPQE",
  idBase: 13600,
  slug: "/trcn-pqe",
  landingPath: "/trcn-pqe-practice-test",
  name: "TRCN PQE Practice Test",
  shortName: "TRCN PQE",
  examLabel: "TRCN PQE",
  fullName: "TRCN Professional Qualifying Examination (PQE)",
  questionIdPrefix: "TRCN-",
  icon: "graduation",
  testCount: 3,
  questionsPerTest: 60,
  passPct: 60,
  // TRCN PQE Curriculum Guide (trcn.gov.ng/pqe-curriculum, checked 2026-11-01): computer-based,
  // 60 questions in 60 minutes, May and November diets; five core areas of 20% each: Pedagogy,
  // Literacy, Numeracy, ICT, Safeguarding. Each full-length test takes 12 per area, split into two
  // categories of 6 by the guide's subtopics. Pools are 3x each count plus 2 training-only spares.
  // TRCN publishes no pass mark (guides say 50%); 60% (36 of 60) is Tigertest's target.
  // All items original.
  blueprint: {
    trcnFoundations: 6,
    trcnTeaching: 6,
    trcnReading: 6,
    trcnLanguage: 6,
    trcnNumber: 6,
    trcnMathTeach: 6,
    trcnDigital: 6,
    trcnIctTeach: 6,
    trcnProtect: 6,
    trcnSafeSchools: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 13601, name: "Pedagogy", categories: ["trcnFoundations", "trcnTeaching"], size: 40, weightLabel: "12 of 60 test questions" },
    { setNumber: 2, id: 13602, name: "Literacy", categories: ["trcnReading", "trcnLanguage"], size: 40, weightLabel: "12 of 60 test questions" },
    { setNumber: 3, id: 13603, name: "Numeracy", categories: ["trcnNumber", "trcnMathTeach"], size: 40, weightLabel: "12 of 60 test questions" },
    { setNumber: 4, id: 13604, name: "ICT", categories: ["trcnDigital", "trcnIctTeach"], size: 40, weightLabel: "12 of 60 test questions" },
    { setNumber: 5, id: 13605, name: "Safeguarding", categories: ["trcnProtect", "trcnSafeSchools"], size: 40, weightLabel: "12 of 60 test questions" },
  ],
  categoryLabels: {
    trcnFoundations: "Foundations of Learning & Policy",
    trcnTeaching: "Planning, Methods & Classroom Management",
    trcnReading: "Reading & Vocabulary",
    trcnLanguage: "Grammar, Writing & Communication",
    trcnNumber: "Number & Arithmetic",
    trcnMathTeach: "Geometry, Data, Algebra & Teaching Maths",
    trcnDigital: "Digital Skills & Mobile Learning",
    trcnIctTeach: "ICT in Teaching & Digital Citizenship",
    trcnProtect: "Child Protection & Reporting",
    trcnSafeSchools: "Safe Schools & Professional Conduct",
  },
  copy: {
    guestPrompt: "to save your TRCN PQE progress and track every question you miss",
    trainingHeading: "Train by PQE area",
    trainingSub: "Five sets, one for each core area of the TRCN PQE curriculum: pedagogy, literacy, numeracy, ICT and safeguarding. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 60 questions, 12 from each area",
    heroSubs: [
      "Five areas, three full-length mock exams. Each area is 20%.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You're ready for the PQE.",
    ],
    sourceLine: "Based on the TRCN PQE curriculum guide. Original questions; 60 per test like the real PQE, 60% as Tigertest's target. Not affiliated with TRCN.",
    analyticsKey: "trcnpqe",
  },
};
```

Append `trcnpqe` to the `EXAMS` array (after `phlet` or next to the other batch-5 Nigeria exams).

Check: 13601-13605 (sets) and 13601-13603 (tests) must be free (BRIEF reserves idBase 13600).

## lib/banks/all.ts

```ts
import "./trcnpqe";
```

## types/index.ts

- `QuestionType`: add `| "TRCNPQE"`.
- `QuestionCategory`, under a `// Nigeria TRCN PQE` comment:

```ts
  | "trcnFoundations"
  | "trcnTeaching"
  | "trcnReading"
  | "trcnLanguage"
  | "trcnNumber"
  | "trcnMathTeach"
  | "trcnDigital"
  | "trcnIctTeach"
  | "trcnProtect"
  | "trcnSafeSchools"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    trcnFoundations: "Foundations of Learning & Policy",
    trcnTeaching: "Planning, Methods & Classroom Management",
    trcnReading: "Reading & Vocabulary",
    trcnLanguage: "Grammar, Writing & Communication",
    trcnNumber: "Number & Arithmetic",
    trcnMathTeach: "Geometry, Data, Algebra & Teaching Maths",
    trcnDigital: "Digital Skills & Mobile Learning",
    trcnIctTeach: "ICT in Teaching & Digital Citizenship",
    trcnProtect: "Child Protection & Reporting",
    trcnSafeSchools: "Safe Schools & Professional Conduct",
```

## app/globals.css

The brief's 170 30% 34% clashes with `hscmaths` (168 38% 30%: 2 degrees, 8 sat, 4 light).
Suggested instead: 170 20% 38% (muted slate teal): 18 sat and 8 light from hscmaths; cst
(172 66 31), danb (165 60 32), accuplacer (175 55 32) and aerta (162 80 26) all differ by 25+ in
saturation; phlet (160 25 40) is 10 degrees away. White text on it: 5.2:1. Not checked against
the other batch-5 builders' suggestions (ngcustoms 200, ngpolice 215 are far). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Nigeria TRCN PQE theme */
  [data-theme="trcnpqe"] {
    --brand: 170 20% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 170 30% 95%;
    --brand-hover: 170 20% 32%;
    --brand-dark: 170 20% 27%;
    --brand-darker: 170 20% 18%;
    --brand-muted: 170 15% 70%;
    --brand-border: 170 16% 80%;
    --brand-border-light: 170 16% 89%;
    --brand-gradient-to: 195 30% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `trcnpqe: "Three full-length mock exams for the TRCN Professional Qualifying Examination that Nigerian teachers take to register: pedagogy, literacy, numeracy, ICT and safeguarding, 12 questions from each area, on the TRCN PQE curriculum guide.",`
- `EXAM_ORG`: `trcnpqe: "Teachers Registration Council of Nigeria (TRCN)",`
- Hub group: new group right after "Nigeria university entrance tests":
  `{ title: "Nigeria teacher registration exams", ids: ["trcnpqe"] },`
  (or a combined "Nigeria professional and recruitment exams" group if the integrator groups the
  batch-5 recruitment CBTs together).
- `SEARCH_ALIASES`:
  `trcnpqe: "trcn trcn pqe pqe professional qualifying examination teachers registration council of nigeria trcn exam trcn cbt trcn past questions pqe past questions trcn practice questions teacher registration nigeria trcn certificate trcn licence nce pgde teacher exam nigeria pedagogy literacy numeracy ict safeguarding",`
- `RELATED_OVERRIDES`: `trcnpqe: ["jambeng", "phlet", "ctet"],`

## lib/region.ts

```ts
// TEST_REGIONS: on the NG line (next to ngfrsc, jambeng)
  trcnpqe: "NG",
// NON_DRIVING_TESTS: add
  "trcnpqe",
```

## lib/examFacts.ts

```ts
  trcnpqe: {
    answer:
      "The Professional Qualifying Examination (PQE) is the computer-based exam candidates take as part of registration with the Teachers Registration Council of Nigeria (TRCN), the regulator set up by the TRCN Act of 1993. TRCN's PQE curriculum guide lists 60 questions in 60 minutes, held in batches in May and November diets, across five core areas worth 20% each: Pedagogy, Literacy, Numeracy, ICT and Safeguarding. Candidates need at least an NCE, PGDE or PDE in Education and sit under Category A (PhD), B (master's), C (bachelor's or PGDE) or D (NCE). TRCN does not publish a pass mark on its PQE pages.",
    rows: [
      { label: "Run by", value: "Teachers Registration Council of Nigeria (TRCN)" },
      { label: "Questions", value: "60" },
      { label: "Time", value: "60 minutes" },
      { label: "Format", value: "Computer-based, multiple choice" },
      { label: "Areas", value: "Pedagogy, Literacy, Numeracy, ICT, Safeguarding, 20% each" },
      { label: "Diets", value: "May and November, in batches" },
      { label: "Eligibility", value: "At least an NCE, PGDE or PDE in Education" },
      { label: "Pass mark", value: "Not published by TRCN (guides say 50%)" },
    ],
    basedOn: "the TRCN PQE curriculum guide, registration and PQE past questions pages on trcn.gov.ng, checked November 2026",
    source: { name: "Teachers Registration Council of Nigeria", url: "https://trcn.gov.ng/pqe-curriculum" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"trcnpqe"` to `TEACHER_LED` (colleges of education, education faculties and PQE prep
classes), and in `TEACHES`: `trcnpqe: "a college of education class or a TRCN PQE prep class",`.
The landing already renders `<ExamClassFaq examId="trcnpqe" />` and `classFaqJsonLd("trcnpqe")`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Suggest borrowing the teacher-licensing tiger, as phlet does:
`trcnpqe: "praxis",` in `BORROWED_SETS`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/*

Nothing: `graduation` exists; sitemaps map over `EXAMS`; class questions import `lib/banks/all`;
no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing trcnpqe:trcn-pqe:13601`

## CLAUDE.md (under Additional Exams, after the LET Reviewer bullet)

```md
- **TRCN PQE** (Nigeria Teachers Registration Council Professional Qualifying Examination, `/trcn-pqe/*`, landing `/trcn-pqe-practice-test`): `data/trcn-pqe-questions.json` (200 original questions on the TRCN PQE curriculum guide's five core areas, 20% each: Pedagogy as foundations of learning and policy 20 and planning, methods and classroom management 20; Literacy as reading and vocabulary 20 and grammar, writing and communication 20; Numeracy as number and arithmetic 20 and geometry, data, algebra and teaching maths 20; ICT as digital skills and mobile learning 20 and ICT in teaching and digital citizenship 20; Safeguarding as child protection and reporting 20 and safe schools and professional conduct 20), three full-length tests: test IDs 13601-13603 (60 questions each, like the real PQE's 60 in 60 minutes), sets 13601-13605 (one per area), state `TRCNPQE`, prefix `TRCN-`, 60% pass (Tigertest's target: TRCN publishes no pass mark; guides say 50%). 6 per category per test; the last two items of each pool (20 in all) are training-only. Nigerian policy facts are static (TRCN Act 1993, UBE Act 2004, NPE 2014, Child Rights Act 2003, Data Protection Act 2023); no fees, dates or office-holders. Built by `tools/next100/trcnpqe/build.py`; sources in `tools/next100/trcnpqe/sources.md`. Region NG, hub group "Nigeria teacher registration exams", `[data-theme="trcnpqe"]` muted slate teal, borrows the Praxis tiger, teacher-led.
```
