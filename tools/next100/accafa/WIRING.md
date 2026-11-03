# Wiring for `accafa` (ACCA Applied Knowledge, Financial Accounting (FA), GLOBAL, v1)

Files already written by the builder: `data/acca-fa-questions.json` (200, PASS), `lib/banks/accafa.ts`,
`app/acca-fa/*` (5 wrappers copied from `app/cpa-far/`: layout, redirect, dashboard, drill, stats),
`app/acca-fa-practice-test/page.tsx`, `tools/next100/accafa/*` (spec, sources, `q_*.py`, `build.py`).
Everything below goes in shared files.

Format note: the real FA exam (ACCA Qualification FA, also FFA in the Foundations in Accountancy) is a
two-hour on-demand CBE: Section A 35 two-mark objective test questions, Section B two 15-mark
multi-task questions (consolidation and accounts preparation), pass mark 50%. Here: Section A style
four-option single-answer items only, four 50-question tests across the nine syllabus areas (ACCA
publishes no area weights; the split is Tigertest's), 7 content training sets + 4 tests = 11 dashboard
steps. Pass line 50% like the real exam (`ceil(0.5 * 50) = 25`). Pools are exactly 4x per-test counts.
Syllabus: the September 2025 to August 2026 study guide (IFRS 18 formats examinable, IAS 1 not),
which ACCA's syllabus-changes guidance carries unchanged into September 2026 to August 2027.

## lib/exams.ts

Add `"accafa"` to the `ExamId` union. Icon `calculator` already exists.

```ts
const accafa: ExamConfig = {
  id: "accafa",
  stateCode: "ACCAFA",
  idBase: 16500,
  slug: "/acca-fa",
  landingPath: "/acca-fa-practice-test",
  name: "ACCA FA Practice Test",
  shortName: "ACCA FA",
  examLabel: "ACCA Financial Accounting (FA) exam",
  fullName: "ACCA Applied Knowledge Financial Accounting (FA) exam",
  questionIdPrefix: "ACCAFA-",
  icon: "calculator",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 50,
  // ACCA FA/FFA syllabus and study guide Sept 2025 to Aug 2026, unchanged for Sept 2026 to Aug 2027
  // (ACCA syllabus changes guidance, checked Nov 2026). Real exam: 2 hours, Section A 35 two-mark OT
  // questions, Section B two 15-mark MTQs, pass mark 50%. Section A style only. ACCA publishes no area
  // weights; per 50-question test: A-B 4, C-D1-D2 5, D3 4, D4-D6 7, D7-D8 6, D9-D10 5, E-F 6, G 7, H 4, I 2.
  blueprint: {
    accafaContext: 4,
    accafaBookkeeping: 5,
    accafaInventory: 4,
    accafaNonCurrent: 7,
    accafaAccruals: 6,
    accafaCapital: 5,
    accafaReconciliations: 6,
    accafaStatements: 7,
    accafaConsolidation: 4,
    accafaInterpretation: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 16501, name: "Context, Concepts & Double Entry", categories: ["accafaContext", "accafaBookkeeping"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 2, id: 16502, name: "Inventories & Non-current Assets", categories: ["accafaInventory", "accafaNonCurrent"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 16503, name: "Accruals, Receivables & Payables", categories: ["accafaAccruals"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 4, id: 16504, name: "Provisions, Share Capital & Finance Costs", categories: ["accafaCapital"], size: 20, weightLabel: "5 of 50 test questions" },
    { setNumber: 5, id: 16505, name: "Reconciliations, Trial Balance & Errors", categories: ["accafaReconciliations"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 6, id: 16506, name: "Financial Statements & Cash Flows", categories: ["accafaStatements"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 7, id: 16507, name: "Consolidation & Interpretation", categories: ["accafaConsolidation", "accafaInterpretation"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    accafaContext: "Context, Regulation & Accounting Concepts",
    accafaBookkeeping: "Double Entry, Documents, Sales & Cash",
    accafaInventory: "Inventories",
    accafaNonCurrent: "Non-current Assets, Depreciation & Intangibles",
    accafaAccruals: "Accruals, Prepayments, Receivables & Payables",
    accafaCapital: "Provisions, Capital Structure & Finance Costs",
    accafaReconciliations: "Reconciliations, Trial Balance & Errors",
    accafaStatements: "Financial Statements, Cash Flows & Incomplete Records",
    accafaConsolidation: "Consolidated Financial Statements",
    accafaInterpretation: "Interpretation & Ratios",
  },
  copy: {
    guestPrompt: "to save your ACCA FA progress and track every question you miss",
    trainingHeading: "Train by syllabus area",
    trainingSub: "Seven sets covering every area of the ACCA FA syllabus, A to I. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 Section A style questions across the whole syllabus, 50% pass mark",
    heroSubs: [
      "Seven sets, four tests. Start with double entry.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Practise Section B questions, then book FA.",
    ],
    sourceLine: "Based on ACCA's FA syllabus and study guide for 2026-27, with IFRS 18 formats. Original Section A style questions; Section B not included. Not affiliated with ACCA.",
    analyticsKey: "accafa",
  },
};
```

Append `accafa` to the `EXAMS` array next to `cpafar` / `cpareg` (or with the global exams).

Check: 16501-16504 (tests) and 16501-16507 (sets) must be free (batch B table assigns 16500; `cpaaud` is 16400, `aatl2` 16600).

## lib/banks/all.ts

```ts
import "./accafa";
```

## types/index.ts

- `QuestionType`: add `| "ACCAFA"`.
- `QuestionCategory`, under a `// ACCA Financial Accounting (FA)` comment:

```ts
  | "accafaContext"
  | "accafaBookkeeping"
  | "accafaInventory"
  | "accafaNonCurrent"
  | "accafaAccruals"
  | "accafaCapital"
  | "accafaReconciliations"
  | "accafaStatements"
  | "accafaConsolidation"
  | "accafaInterpretation"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    accafaContext: "Context, Regulation & Accounting Concepts",
    accafaBookkeeping: "Double Entry, Documents, Sales & Cash",
    accafaInventory: "Inventories",
    accafaNonCurrent: "Non-current Assets, Depreciation & Intangibles",
    accafaAccruals: "Accruals, Prepayments, Receivables & Payables",
    accafaCapital: "Provisions, Capital Structure & Finance Costs",
    accafaReconciliations: "Reconciliations, Trial Balance & Errors",
    accafaStatements: "Financial Statements, Cash Flows & Incomplete Records",
    accafaConsolidation: "Consolidated Financial Statements",
    accafaInterpretation: "Interpretation & Ratios",
```

## app/globals.css

Hue from the batch B table (already checked): 341 70% 38%. Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* ACCA Financial Accounting (FA) theme */
  [data-theme="accafa"] {
    --brand: 341 70% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 341 70% 96%;
    --brand-hover: 341 70% 33%;
    --brand-dark: 341 70% 30%;
    --brand-darker: 341 60% 18%;
    --brand-muted: 341 30% 70%;
    --brand-border: 341 30% 80%;
    --brand-border-light: 341 25% 89%;
    --brand-gradient-to: 20 70% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `accafa: "ACCA Financial Accounting (FA and FFA) objective test practice on the 2026-27 syllabus: double entry, inventories, depreciation and revaluation, accruals, irrecoverable debts, provisions, bank reconciliations, suspense accounts, IFRS 18 statements, cash flows, consolidation and ratios, with every calculation explained.",`
- `EXAM_ORG`: `accafa: "ACCA · Applied Knowledge exam, Financial Accounting (FA/FFA)",`
- Hub group: add to the existing "Accounting and CPA exams" group:
  `{ title: "Accounting and CPA exams", ids: ["cpafar", "cpareg", "cpaaud", "accafa", "aatl2"] },`
  (keep whatever order the other batch B builders propose; consider renaming the group
  "Accounting exams: CPA, ACCA and AAT".)
- `RELATED_OVERRIDES`: `accafa: ["aatl2", "cpafar", "cfal1"],` (if aatl2 or cfal1 is not wired, use `cca` / `cpareg`).
- `SEARCH_ALIASES`:
  `accafa: "acca fa ffa f3 acca financial accounting applied knowledge acca exam foundations in accountancy ifrs bookkeeping double entry trial balance consolidation acca f3 mock acca papers chartered certified accountant",`

## lib/region.ts

`accafa: "GLOBAL",` in `TEST_REGIONS` (ACCA is sat in about 180 countries: UK, Pakistan, India, Malaysia,
Nigeria, Kenya, the Gulf, China...). Not in `NON_DRIVING_TESTS` (GLOBAL tests are not listed there, like `gulfrn`).

## lib/examFacts.ts

```ts
  accafa: {
    answer:
      "Financial Accounting (FA) is one of ACCA's three Applied Knowledge exams, also sat as FFA in the Foundations in Accountancy. It is a two-hour computer-based exam, available on demand, with all questions compulsory: Section A has 35 objective test questions worth two marks each and Section B has two 15-mark multi-task questions, one on consolidation and one on preparing accounts. The pass mark is 50%. ACCA lists no syllabus change for September 2026 to August 2027, so the IFRS 18 statement formats introduced in September 2025 still apply.",
    rows: [
      { label: "Time", value: "2 hours" },
      { label: "Section A", value: "35 objective test questions, 2 marks each" },
      { label: "Section B", value: "2 multi-task questions, 15 marks each" },
      { label: "Total marks", value: "100" },
      { label: "Pass mark", value: "50%" },
      { label: "Format", value: "Computer-based, on demand" },
      { label: "Syllabus", value: "September 2026 to August 2027 (no change from 2025-26)" },
      { label: "Run by", value: "ACCA (Association of Chartered Certified Accountants)" },
    ],
    basedOn: "ACCA's FA/FFA syllabus and study guide and its 2025/26 to 2026/27 syllabus changes guidance, checked November 2026",
    source: { name: "ACCA: Financial Accounting (FA/FFA) essentials on one page", url: "https://accaglobal.com/gb/en/student/exam-support-resources/fundamentals-exams-study-resources/f3/session-cbe-introduction/financial-accounting-fa-essentials-on-one-page.html" },
  },
```
(Fees and exemptions left out: they vary by country and route.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## lib/tigerAssets.ts

`BORROWED_SETS`: `accafa: "cpc",` (as cpafar and cpareg do).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx, TEACHER_LED

Nothing, like the cpafar template: candidates mostly self-study or use a tuition provider's own
platform. (If the integrator wants it, ACCA FA is taught in college and tuition classes in Pakistan,
Malaysia and Nigeria, so a TEACHER_LED line would be defensible; the landing does not render `ExamClassFaq`.)

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing: sitemaps map over `EXAMS`, no redirects, `calculator` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 44).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing accafa:acca-fa:16501`

## CLAUDE.md (under Additional Exams, after the CPA REG bullet)

```md
- **ACCA FA** (ACCA Applied Knowledge exam Financial Accounting, also FFA in the Foundations in Accountancy, Section A style only, `/acca-fa/*`, landing `/acca-fa-practice-test`): `data/acca-fa-questions.json` (200 original questions on the FA/FFA syllabus and study guide, the 2025-26 guide carried unchanged into September 2026 to August 2027 with IFRS 18 formats and IAS 1 gone: context, regulation and concepts 16, double entry, documents, sales tax and cash 20, inventories 16, non-current assets, depreciation and intangibles 28, accruals, receivables and payables 24, provisions, capital structure and finance costs 20, reconciliations, trial balance and errors 24, financial statements, cash flows and incomplete records 28, consolidation 16, interpretation 8), test IDs 16501-16504, sets 16501-16507 (by area), state `ACCAFA`, prefix `ACCAFA-`, 50% pass like the real exam (2 hours on demand, Section A 35 two-mark OT questions, Section B two 15-mark multi-task questions on consolidation and accounts preparation). 4/5/4/7/6/5/6/7/4/2 per test (Tigertest's split; ACCA publishes no weights). Section B and multiple-response or number-entry OT formats not modelled. IFRS terms and ACCA's $ figures; statements in IFRS 18 categories (operating profit, profit before financing and income taxes; indirect cash flows from operating profit; interest paid financing, interest and dividends received investing). Built by `tools/next100/accafa/build.py`; sources in `tools/next100/accafa/sources.md`. Hub group "Accounting and CPA exams", GLOBAL region, `[data-theme="accafa"]` raspberry (341 70% 38%), borrows the CPC tiger.
```
