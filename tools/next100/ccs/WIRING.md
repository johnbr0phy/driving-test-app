# Wiring for `ccs` (AHIMA Certified Coding Specialist exam, US, v1)

Files already written by the builder: `data/ccs-questions.json` (200, PASS), `lib/banks/ccs.ts`,
`app/ccs/*` (layout, redirect, dashboard, drill, stats; copied from `app/cca/`),
`app/ccs-practice-test/page.tsx`, `tools/next100/ccs/*` (spec, sources, `q_*.py`, `build.py`).
Everything below goes in shared files. `npx tsc` reports an error in `lib/banks/ccs.ts` until
`"ccs"` is added to `ExamId`.

Format note: the real exam is 107 questions (97 scored + 10 pretest) in 4 hours at Pearson VUE,
free navigation with flagging, passing scaled score 300 (AHIMA CCS page, read 2026-11-04). Content
outline effective 05/01/2024: Coding Knowledge and Skills 39-41%, Coding Documentation 18-22%,
Provider Queries 9-11%, Regulatory Compliance 18-22%, Information Technologies 9-11%, plus medical
scenarios (inpatient, outpatient, ED a third each), which are not modelled. Midpoints scaled to 50
per test: 20/10/5/10/5, Domain 1 split by Tigertest into inpatient 6, PCS 4, outpatient/ED 5,
DRG/edits 5. DMV-style sets like CCA: `testSets(17300, 4)`, so 4 sets + 4 tests = 8 dashboard
steps. Pass line 70% (35 of 50), a readiness target. Pools are exactly 4x per-test.

## lib/exams.ts

Add `"ccs"` to the `ExamId` union (after `"cca"`). Icon `book` already exists (same as CCA).

```ts
const ccs: ExamConfig = {
  id: "ccs",
  stateCode: "CCS",
  idBase: 17300,
  slug: "/ccs",
  landingPath: "/ccs-practice-test",
  name: "CCS Practice Test",
  shortName: "CCS",
  examLabel: "CCS exam",
  fullName: "AHIMA Certified Coding Specialist (CCS) exam",
  questionIdPrefix: "CCS-",
  icon: "book",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // AHIMA CCS Exam Content Outline, effective 05/01/2024 (checked 2026-11-04): Coding Knowledge
  // and Skills 39-41%, Coding Documentation 18-22%, Provider Queries 9-11%, Regulatory Compliance
  // 18-22%, Information Technologies 9-11%; medical scenarios (inpatient, outpatient, ED) not
  // modelled. Midpoints scaled to 50 per test: 20 (inpatient ICD-10-CM 6, ICD-10-PCS 4,
  // outpatient/ED 5, MS-DRGs/APCs/edits 5; the Domain 1 split is Tigertest's), 10, 5, 10, 5. The
  // real exam is 107 items (97 scored) in 4 hours with a passing scaled score of 300; 70% is a
  // readiness line. Guidelines and concepts only: no CPT descriptors, no code-book lookups.
  // All items original.
  blueprint: {
    ccsInpatient: 6,
    ccsPcs: 4,
    ccsOutpatient: 5,
    ccsDrg: 5,
    ccsDocumentation: 10,
    ccsQueries: 5,
    ccsCompliance: 10,
    ccsIt: 5,
  },
  trainingSets: testSets(17300, 4),
  categoryLabels: {
    ccsInpatient: "Inpatient Diagnosis Coding",
    ccsPcs: "ICD-10-PCS Procedures",
    ccsOutpatient: "Outpatient & ED Coding",
    ccsDrg: "MS-DRGs, APCs & Edits",
    ccsDocumentation: "Coding Documentation",
    ccsQueries: "Provider Queries",
    ccsCompliance: "Regulatory Compliance",
    ccsIt: "Information Technologies",
  },
  copy: {
    guestPrompt: "to save your CCS progress and track every question you miss",
    trainingHeading: "Train by practice test",
    trainingSub: "Each set holds one practice test's questions, all five AHIMA CCS domains. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Five domains, four tests. Coding skills weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Schedule your CCS exam.",
    ],
    sourceLine: "Weighted to the AHIMA CCS Exam Content Outline. Original questions on coding guidelines and concepts; not affiliated with AHIMA.",
    analyticsKey: "ccs",
  },
};
```

Append `ccs` to the `EXAMS` array right after `cca`.

Check: 17301-17304 (tests and sets) must be free (row assigns idBase 17300).

## lib/banks/all.ts

```ts
import "./ccs";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/ccs.ts`.

## types/index.ts

- `QuestionType`: add `| "CCS"`.
- `QuestionCategory`, under a `// CCS (AHIMA Certified Coding Specialist)` comment:

```ts
  | "ccsInpatient"
  | "ccsPcs"
  | "ccsOutpatient"
  | "ccsDrg"
  | "ccsDocumentation"
  | "ccsQueries"
  | "ccsCompliance"
  | "ccsIt"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ccsInpatient: "Inpatient Diagnosis Coding",
    ccsPcs: "ICD-10-PCS Procedures",
    ccsOutpatient: "Outpatient & ED Coding",
    ccsDrg: "MS-DRGs, APCs & Edits",
    ccsDocumentation: "Coding Documentation",
    ccsQueries: "Provider Queries",
    ccsCompliance: "Regulatory Compliance",
    ccsIt: "Information Technologies",
```

## app/globals.css

Hue as given in the brief (193 30% 26%), then run `tools/gen_dark_brand_css.py`.

```css
  /* CCS (AHIMA Certified Coding Specialist) theme */
  [data-theme="ccs"] {
    --brand: 193 30% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 193 35% 96%;
    --brand-hover: 193 30% 22%;
    --brand-dark: 193 30% 20%;
    --brand-darker: 193 30% 14%;
    --brand-muted: 193 18% 70%;
    --brand-border: 193 22% 80%;
    --brand-border-light: 193 22% 89%;
    --brand-gradient-to: 175 35% 96%;
  }
```

## lib/tigerAssets.ts

`BORROWED_SETS`: `ccs: "cpc",` (the coding tiger, as CCA does) until CCS gets its own set.

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ccs: "AHIMA Certified Coding Specialist exam for hospital coders. Inpatient principal diagnosis and POA, ICD-10-PCS root operations, outpatient and ED coding, MS-DRGs, CCs and MCCs, NCCI, documentation, compliant queries, HACs, PSIs and HIPAA, weighted like the real five domains.",`
- `EXAM_ORG`: `ccs: "AHIMA · CCS Exam Content Outline",`
- Hub group: add `"ccs"` to `{ title: "Healthcare certification exams", ids: [...] }` right after `"cca"`.
- `SEARCH_ALIASES`:
  `ccs: "ccs certified coding specialist ahima ccs exam hospital coding inpatient coding facility coding ms-drg drg coding icd-10-pcs pcs coding poa cdi coding query mastery level coding certification health information management him",`
- `RELATED_OVERRIDES`: `ccs: ["cca", "cpc", "ccma", "ptcb"],` and add `"ccs"` to the front of the `cca` and `cpc` lists:
  `cpc: ["ccs", "cca", "ccma", "ptcb"],` and `cca: ["ccs", "cpc", "ccma", "ptcb"],`.

## lib/region.ts

Nothing: US is the default.

## lib/examFacts.ts

```ts
  ccs: {
    answer:
      "The CCS is AHIMA's Certified Coding Specialist exam, the mastery-level credential for coders in hospitals and other facilities who code inpatient, outpatient and emergency department records. It has 107 questions, 97 scored and 10 unscored pretest items, in 4 hours at a Pearson VUE test center, and you can flag questions and move between them before you submit. The passing score is a scaled 300. Its five domains are Coding Knowledge and Skills (39 to 41 percent), Coding Documentation, Provider Queries, Regulatory Compliance and Information Technologies, with medical scenarios split across inpatient, outpatient and ED cases. You must bring the 2026 ICD-10-CM, ICD-10-PCS and AMA CPT Professional code books.",
    rows: [
      { label: "Questions", value: "107 (97 scored, 10 pretest)" },
      { label: "Time", value: "4 hours, flagging allowed" },
      { label: "Pass mark", value: "Scaled score of 300" },
      { label: "Code books", value: "ICD-10-CM, ICD-10-PCS and CPT Professional (2026, required)" },
      { label: "Biggest domain", value: "Coding Knowledge and Skills, 39-41%" },
      { label: "Eligibility", value: "Recommended: coding experience or a CCA, RHIT or RHIA" },
      { label: "Where", value: "Pearson VUE test centers" },
      { label: "Run by", value: "AHIMA" },
    ],
    basedOn: "AHIMA's CCS certification page, the CCS Exam Content Outline (effective May 1, 2024) and the 2026 required code book list, checked November 2026",
    source: { name: "AHIMA: Certified Coding Specialist (CCS)", url: "https://ahima.org/certification/ccs/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"ccs"` to `TEACHER_LED` (coding and HIM programs set CCS review), and in `TEACHES`:
`ccs: "a medical coding or HIM program",`. The landing already renders `<ExamClassFaq examId="ccs" />`
and `classFaqJsonLd("ccs")`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `book` exists; sitemaps map over `EXAMS`; no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ccs:ccs:17301`

## CLAUDE.md (under Additional Exams, after the CCA bullet)

```md
- **CCS** (AHIMA Certified Coding Specialist, multiple choice only, `/ccs/*`, landing `/ccs-practice-test`): `data/ccs-questions.json` (200 questions on the AHIMA CCS Exam Content Outline effective 05/01/2024: Coding Knowledge and Skills 39-41% as inpatient ICD-10-CM principal diagnosis, sequencing and POA 24, ICD-10-PCS 16, outpatient and ED coding with CPT/HCPCS modifier concepts 20, MS-DRGs, APCs, edits and abstracting 20; Coding Documentation 18-22% 40; Provider Queries 9-11% 20; Regulatory Compliance 18-22% (HACs, PSIs, HIPAA, UHDDS, ethics, payer rules) 40; Information Technologies 9-11% (EHR types, CAC, terminologies, HITECH) 20), test IDs 17301-17304, sets 17301-17304 (`testSets`, one per test), state `CCS`, prefix `CCS-`, 70% readiness line (the real exam is 107 items, 97 scored, in 4 hours with flagging, scaled 300 to pass; 2026 ICD-10-CM, ICD-10-PCS and CPT Professional books required from May 1, 2026). 6/4/5/5/10/5/10/5 per test (domain midpoints; the Domain 1 split is Tigertest's). The outline's medical scenarios (inpatient, outpatient, ED) are not modelled. Guidelines and concepts only, like CCA and CPC: no CPT descriptors or code-book lookups; written against both banks so no fact and answer repeats. Built by `tools/next100/ccs/build.py` from `q_inpatient.py`, `q_outpatient.py`, `q_docs.py`, `q_compliance.py`; sources in `tools/next100/ccs/sources.md`. Hub group "Healthcare certification exams", `[data-theme="ccs"]` dark slate teal (193 30% 26%), borrows the CPC tiger, teacher-led (coding and HIM programs).
```
