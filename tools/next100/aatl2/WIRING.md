# Wiring for `aatl2` (AAT Level 2 Certificate in Accounting, UK, v1)

Files already written by the builder: `data/aat-level-2-questions.json` (200, PASS), `lib/banks/aatl2.ts`,
`app/aat-level-2/*` (5 wrappers copied from `app/cpa-far/`: layout, redirect, dashboard, drill, stats),
`app/aat-level-2-practice-test/page.tsx`, `tools/next100/aatl2/*` (spec, sources, `q_*.py`, `build.py`).
Everything below goes in shared files.

Format note: the real qualification (Q2022, spec v5.7, Sept 2026) is four mandatory units: three
1 hour 30 minute computer-marked unit assessments (Introduction to Bookkeeping 25% of the grade,
Principles of Bookkeeping Controls 25%, Principles of Costing 20%) and a 2 hour synoptic assessment,
partly human marked, that is the only assessment of The Business Environment (30%). Pass mark 70% on
every assessment; grades Pass 70-79, Merit 80-89, Distinction 90+. AAT publishes no question counts.
Here: four 50-question mixed mock tests in the unit weights (13/12/10/15), 6 content training sets
+ 4 tests = 10 dashboard steps, 70% pass line. Ledger-entry tools, gap-fills, spreadsheet tasks and
the synoptic's written answers are not modelled. Name: AAT renamed the "Foundation Certificate in
Accounting" to "Level 2 Certificate in Accounting" with Q2022; the old name is in the copy and aliases.

## lib/exams.ts

Add `"aatl2"` to the `ExamId` union. Icon `calculator` already exists.

```ts
const aatl2: ExamConfig = {
  id: "aatl2",
  stateCode: "AATL2",
  idBase: 16600,
  slug: "/aat-level-2",
  landingPath: "/aat-level-2-practice-test",
  name: "AAT Level 2 Practice Test",
  shortName: "AAT Level 2",
  examLabel: "AAT Level 2 Certificate in Accounting",
  fullName: "AAT Level 2 Certificate in Accounting (formerly the Foundation Certificate)",
  questionIdPrefix: "AATL2-",
  icon: "calculator",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // AAT Level 2 Certificate in Accounting (Q2022, 603/6338/1), qualification specification v5.7,
  // September 2026 (checked Nov 2026). Unit shares of the grade: Introduction to Bookkeeping 25%,
  // Principles of Bookkeeping Controls 25%, Principles of Costing 20% (each a 1 h 30 min unit
  // assessment), The Business Environment 30% (2 h synoptic only). AAT's pass mark is 70% on every
  // assessment. Per 50-question test: ITBK 13 (LOs at 20% each), POBC 12 (LOs at 25% each),
  // PCTN 10 (LOs 30/40/20/10), BENV 15 (by the synoptic assessment objectives). All items original.
  blueprint: {
    aatl2Systems: 4,
    aatl2Transactions: 5,
    aatl2CashLedgers: 4,
    aatl2ControlBank: 6,
    aatl2JournalTb: 6,
    aatl2CostClass: 3,
    aatl2CostCalc: 4,
    aatl2Budgets: 3,
    aatl2Law: 3,
    aatl2Economy: 3,
    aatl2Ethics: 3,
    aatl2Entities: 3,
    aatl2Finance: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 16601, name: "Introduction to Bookkeeping", categories: ["aatl2Systems", "aatl2Transactions", "aatl2CashLedgers"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 16602, name: "Control Accounts & Bank Reconciliation", categories: ["aatl2ControlBank"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 3, id: 16603, name: "Journals, Errors & Trial Balance", categories: ["aatl2JournalTb"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 4, id: 16604, name: "Principles of Costing", categories: ["aatl2CostClass", "aatl2CostCalc", "aatl2Budgets"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 16605, name: "Law, Economy & Business Entities", categories: ["aatl2Law", "aatl2Economy", "aatl2Entities"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 6, id: 16606, name: "Ethics, Finance Function & Information", categories: ["aatl2Ethics", "aatl2Finance"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    aatl2Systems: "Bookkeeping Systems & Documents",
    aatl2Transactions: "Customer & Supplier Transactions",
    aatl2CashLedgers: "Cash Book, Petty Cash & Ledgers",
    aatl2ControlBank: "Control Accounts & Bank Reconciliation",
    aatl2JournalTb: "Journals, Errors & Trial Balance",
    aatl2CostClass: "Cost Classification & Cost Centres",
    aatl2CostCalc: "Inventory, Labour & Overhead Costs",
    aatl2Budgets: "Budgets, Variances & Spreadsheets",
    aatl2Law: "Contract Law & the Legal System",
    aatl2Economy: "The Economic Environment",
    aatl2Ethics: "Ethics, CSR & Sustainability",
    aatl2Entities: "Business Entities & Formation",
    aatl2Finance: "The Finance Function & Information",
  },
  copy: {
    guestPrompt: "to save your AAT Level 2 progress and track every question you miss",
    trainingHeading: "Train by unit",
    trainingSub: "Six sets covering all four units of the AAT Level 2 Certificate in Accounting. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions weighted like the four units, 70% to pass",
    heroSubs: [
      "Six sets, four mock tests. Start with bookkeeping.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your AAT assessments.",
    ],
    sourceLine: "Based on AAT's Level 2 Certificate in Accounting (Q2022) specification. Original questions; ledger, spreadsheet and written tasks not included. Not affiliated with AAT.",
    analyticsKey: "aatl2",
  },
};
```

Append `aatl2` to the `EXAMS` array with the other UK exams (after `ukcare`), or next to `accafa`.

Check: 16601-16604 (tests) and 16601-16606 (sets) are free (batch B table assigns 16600; `accafa` is 16500).

## lib/banks/all.ts

```ts
import "./aatl2";
```

## types/index.ts

- `QuestionType`: add `| "AATL2"`.
- `QuestionCategory`, under a `// AAT Level 2 Certificate in Accounting (UK)` comment:

```ts
  | "aatl2Systems"
  | "aatl2Transactions"
  | "aatl2CashLedgers"
  | "aatl2ControlBank"
  | "aatl2JournalTb"
  | "aatl2CostClass"
  | "aatl2CostCalc"
  | "aatl2Budgets"
  | "aatl2Law"
  | "aatl2Economy"
  | "aatl2Ethics"
  | "aatl2Entities"
  | "aatl2Finance"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    aatl2Systems: "Bookkeeping Systems & Documents",
    aatl2Transactions: "Customer & Supplier Transactions",
    aatl2CashLedgers: "Cash Book, Petty Cash & Ledgers",
    aatl2ControlBank: "Control Accounts & Bank Reconciliation",
    aatl2JournalTb: "Journals, Errors & Trial Balance",
    aatl2CostClass: "Cost Classification & Cost Centres",
    aatl2CostCalc: "Inventory, Labour & Overhead Costs",
    aatl2Budgets: "Budgets, Variances & Spreadsheets",
    aatl2Law: "Contract Law & the Legal System",
    aatl2Economy: "The Economic Environment",
    aatl2Ethics: "Ethics, CSR & Sustainability",
    aatl2Entities: "Business Entities & Formation",
    aatl2Finance: "The Finance Function & Information",
```

## app/globals.css

Hue from the batch B table (already checked): 270 25% 32%. Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* AAT Level 2 Certificate in Accounting theme (UK) */
  [data-theme="aatl2"] {
    --brand: 270 25% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 270 30% 96%;
    --brand-hover: 270 25% 27%;
    --brand-dark: 270 25% 24%;
    --brand-darker: 270 22% 15%;
    --brand-muted: 270 15% 70%;
    --brand-border: 270 15% 80%;
    --brand-border-light: 270 14% 89%;
    --brand-gradient-to: 45 60% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `aatl2: "AAT Level 2 Certificate in Accounting practice across all four units: daybooks, trade and prompt payment discounts, VAT, control accounts, bank reconciliations, journals and the suspense account, costing, budgets, contract law, ethics and business entities.",`
- `EXAM_ORG`: `aatl2: "AAT (Association of Accounting Technicians) · Level 2 Certificate in Accounting, Q2022",`
- Hub group: add to "Accounting and CPA exams" (proposed title "Accounting exams" if accafa joins too):
  `{ title: "Accounting and CPA exams", ids: ["cpafar", "cpareg", "cpaaud", "accafa", "aatl2"] },`
  With region UK the catalog puts it first for UK visitors. If the integrator prefers it with the UK
  groups instead, "UK workplace and trade certificates" also fits.
- `RELATED_OVERRIDES`: `aatl2: ["accafa", "fsmaths", "cpafar"],` (drop `accafa` if it is not wired).
- `SEARCH_ALIASES`:
  `aatl2: "aat level 2 aat foundation certificate in accounting aat level 2 certificate in accounting q2022 introduction to bookkeeping itbk principles of bookkeeping controls pobc principles of costing pctn business environment benv synoptic bookkeeping course uk accounts assistant association of accounting technicians",`

## lib/region.ts

`aatl2: "UK",` in `TEST_REGIONS`, and add `"aatl2"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  aatl2: {
    answer:
      "The AAT Level 2 Certificate in Accounting, formerly the Foundation Certificate in Accounting, is the entry-level qualification of AAT, the Association of Accounting Technicians. It has four mandatory units. Introduction to Bookkeeping, Principles of Bookkeeping Controls and Principles of Costing are each assessed by a 1 hour 30 minute computer-marked assessment, and The Business Environment by a 2 hour synoptic assessment. All assessments are computer based and booked on demand through a training provider or venue. AAT's pass mark is 70% on every assessment, and the qualification is graded Pass, Merit or Distinction.",
    rows: [
      { label: "Units", value: "4 mandatory: bookkeeping, controls, costing, business environment" },
      { label: "Grade weighting", value: "25% / 25% / 20% / 30% (synoptic)" },
      { label: "Unit assessments", value: "3, each 1 hour 30 minutes, computer marked" },
      { label: "Synoptic assessment", value: "2 hours, partly human marked" },
      { label: "Pass mark", value: "70% on every assessment" },
      { label: "Grades", value: "Pass 70%, Merit 80%, Distinction 90%" },
      { label: "Typical study time", value: "About a year (255 guided learning hours)" },
      { label: "Run by", value: "AAT, through approved training providers" },
    ],
    basedOn: "AAT's Level 2 Certificate in Accounting (Q2022) qualification specification, version 5.7, checked November 2026",
    source: { name: "AAT: Level 2 Certificate in Accounting", url: "https://www.aat.org.uk/qualifications-and-courses/accounting/level-2-certificate-accounting" },
  },
```
(Fees left out of every Tigertest page.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx

Add `"aatl2"` to `TEACHER_LED`: AAT students must register through a training provider (colleges,
distance learning providers), so teachers set it as class practice.

## components/exam/ExamClassFaq.tsx

In `TEACHES`: `aatl2: "an AAT Level 2 accounting course",`
(reads "I teach an AAT Level 2 accounting course. Can my students use Tigertest?"). The landing
already renders `<ExamClassFaq examId="aatl2" />` and `classFaqJsonLd("aatl2")`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing: sitemaps map over `EXAMS`, no redirects, `calculator` icon exists. Tiger falls back to the
DMV one; optionally borrow the CPC tiger like cpafar/cpareg via `BORROWED_SETS`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 52).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing aatl2:aat-level-2:16601`

## CLAUDE.md (under Additional Exams, after the CPA REG bullet)

```md
- **AAT Level 2** (AAT Level 2 Certificate in Accounting, Q2022, formerly the Foundation Certificate in Accounting, UK, `/aat-level-2/*`, landing `/aat-level-2-practice-test`): `data/aat-level-2-questions.json` (200 original questions on AAT's qualification specification v5.7, September 2026: Introduction to Bookkeeping as systems and documents 16, customer and supplier transactions 20, cash book, petty cash and ledgers 16; Principles of Bookkeeping Controls as control accounts and bank reconciliation 24, journals, errors and trial balance 24; Principles of Costing as cost classification 12, inventory, labour and overheads 16, budgets, variances and spreadsheets 12; The Business Environment as contract law 12, the economy 12, ethics and CSR 12, business entities 12, the finance function and information 12), test IDs 16601-16604, sets 16601-16606 (by unit), state `AATL2`, prefix `AATL2-`, 70% pass (AAT's mark on every assessment). 4/5/4, 6/6, 3/4/3, 3/3/3/3/3 per test (units 13/12/10/15, the 25/25/20/30 grade weights). The real units are 1 h 30 min computer-marked assessments and The Business Environment a 2 h synoptic; ledger-entry tools, spreadsheet tasks and written answers are not modelled. VAT at the 20% standard rate, stated in every VAT stem; PPD by credit note only, as the spec requires. Built by `tools/next100/aatl2/build.py`; sources in `tools/next100/aatl2/sources.md`. Region UK, hub group "Accounting and CPA exams", `[data-theme="aatl2"]` muted violet (270 25% 32%), teacher-led (training providers).
```
