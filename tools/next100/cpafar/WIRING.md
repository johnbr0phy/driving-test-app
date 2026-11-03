# Wiring for `cpafar` (CPA Exam, Financial Accounting and Reporting (FAR) section, US, v1)

Files already written by the builder: `data/cpa-far-questions.json` (200, PASS), `lib/banks/cpafar.ts`,
`app/cpa-far/*` (5 wrappers copied from `app/series-7/`: layout, redirect, dashboard, drill, stats),
`app/cpa-far-practice-test/page.tsx`, `tools/next100/cpafar/*` (spec, sources, `q_*.py`, `build.py`).
Everything below goes in shared files.

Format note: the real FAR section is 4 hours, 50 multiple-choice questions (two testlets of 25) and
7 task-based simulations, scored 50/50, reported 0 to 99 with 75 to pass (scaled, not percent correct).
Here: the multiple-choice half only, four 50-question tests weighted to the AICPA 2026 blueprint's
three areas (I 17, II 18, III 15 per test), 7 content training sets + 4 tests = 11 dashboard steps.
Pass line 75% as a readiness target (`ceil(0.75 * 50) = 38`). Pools are exactly 4x per-test counts.
Sets are content sets as in the series7 template, so not interleaved (sets first, then tests); the
integrator may switch to `testSets(14900, 4)` if batch A standardises on DMV-style sets.

## lib/exams.ts

Add `"cpafar"` to the `ExamId` union. Icon `calculator` already exists in the union and `TestIcon`.

```ts
const cpafar: ExamConfig = {
  id: "cpafar",
  stateCode: "CPAFAR",
  idBase: 14900,
  slug: "/cpa-far",
  landingPath: "/cpa-far-practice-test",
  name: "CPA FAR Practice Test",
  shortName: "CPA FAR",
  examLabel: "CPA Exam FAR section",
  fullName: "CPA Exam Financial Accounting and Reporting (FAR) section",
  questionIdPrefix: "CPAFAR-",
  icon: "calculator",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // AICPA Uniform CPA Examination Blueprints effective January 1, 2026 (the 2027 Blueprints,
  // approved Sept 16, 2026, only add an NCGA reference to the FAR introduction; checked Nov 2026).
  // Real FAR: 4 hours, 50 MCQs + 7 TBSs, scored 50/50, 75 on a 0-99 scale to pass. MCQ half only.
  // Area I Financial Reporting 30-40% -> 17, Area II Select Balance Sheet Accounts 30-40% -> 18,
  // Area III Select Transactions 25-35% -> 15 per 50-question test. All items original.
  blueprint: {
    cpafarStatements: 7,
    cpafarNfpGov: 4,
    cpafarPublic: 6,
    cpafarCurrent: 6,
    cpafarLongLived: 7,
    cpafarLiabilities: 5,
    cpafarChanges: 5,
    cpafarRevenue: 4,
    cpafarTaxLeases: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 14901, name: "Financial Statements & Consolidation", categories: ["cpafarStatements"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 2, id: 14902, name: "Not-for-Profit, Government & Public Companies", categories: ["cpafarNfpGov", "cpafarPublic"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 14903, name: "Cash, Receivables & Inventory", categories: ["cpafarCurrent"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 4, id: 14904, name: "PP&E, Intangibles & Investments", categories: ["cpafarLongLived"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 5, id: 14905, name: "Liabilities, Debt & Equity", categories: ["cpafarLiabilities"], size: 20, weightLabel: "5 of 50 test questions" },
    { setNumber: 6, id: 14906, name: "Changes, Contingencies & Revenue", categories: ["cpafarChanges", "cpafarRevenue"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 7, id: 14907, name: "Income Taxes, Fair Value & Leases", categories: ["cpafarTaxLeases"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    cpafarStatements: "Financial Statements & Consolidation",
    cpafarNfpGov: "Not-for-Profit & Government Reporting",
    cpafarPublic: "Public Companies, Special Frameworks & Ratios",
    cpafarCurrent: "Cash, Receivables & Inventory",
    cpafarLongLived: "PP&E, Intangibles & Investments",
    cpafarLiabilities: "Liabilities, Debt & Equity",
    cpafarChanges: "Accounting Changes, Contingencies & Subsequent Events",
    cpafarRevenue: "Revenue Recognition & Contributions",
    cpafarTaxLeases: "Income Taxes, Fair Value & Leases",
  },
  copy: {
    guestPrompt: "to save your CPA FAR progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Seven sets covering all three areas of the AICPA FAR blueprint. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 multiple-choice questions weighted like the FAR blueprint, 75% readiness line",
    heroSubs: [
      "Seven sets, four tests. Start with the statements.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Practice simulations, then sit FAR.",
    ],
    sourceLine: "Based on the AICPA's 2026 FAR blueprint. Original multiple-choice questions; simulations not included. Not affiliated with the AICPA or NASBA.",
    analyticsKey: "cpafar",
  },
};
```

Append `cpafar` to the `EXAMS` array after `series7` (or next to `cpareg`).

Check: 14901-14904 (tests) and 14901-14907 (sets) must be free (batch A table assigns 14900; `cca` is 14800).

## lib/banks/all.ts

```ts
import "./cpafar";
```

## types/index.ts

- `QuestionType`: add `| "CPAFAR"`.
- `QuestionCategory`, under a `// CPA Exam FAR` comment:

```ts
  | "cpafarStatements"
  | "cpafarNfpGov"
  | "cpafarPublic"
  | "cpafarCurrent"
  | "cpafarLongLived"
  | "cpafarLiabilities"
  | "cpafarChanges"
  | "cpafarRevenue"
  | "cpafarTaxLeases"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cpafarStatements: "Financial Statements & Consolidation",
    cpafarNfpGov: "Not-for-Profit & Government Reporting",
    cpafarPublic: "Public Companies, Special Frameworks & Ratios",
    cpafarCurrent: "Cash, Receivables & Inventory",
    cpafarLongLived: "PP&E, Intangibles & Investments",
    cpafarLiabilities: "Liabilities, Debt & Equity",
    cpafarChanges: "Accounting Changes, Contingencies & Subsequent Events",
    cpafarRevenue: "Revenue Recognition & Contributions",
    cpafarTaxLeases: "Income Taxes, Fair Value & Leases",
```

## app/globals.css

Hue from the batch A table (already checked): 150 45% 38%. Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* CPA Exam FAR theme */
  [data-theme="cpafar"] {
    --brand: 150 45% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 150 45% 96%;
    --brand-hover: 150 45% 33%;
    --brand-dark: 150 45% 30%;
    --brand-darker: 150 40% 18%;
    --brand-muted: 150 25% 70%;
    --brand-border: 150 25% 80%;
    --brand-border-light: 150 22% 89%;
    --brand-gradient-to: 45 70% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cpafar: "CPA Exam FAR multiple-choice practice on the AICPA 2026 blueprint: financial statements and consolidation, not-for-profit and government, EPS and ratios, receivables, inventory, PP&E, investments, debt, revenue, income taxes and leases, with every calculation explained.",`
- `EXAM_ORG`: `cpafar: "AICPA and NASBA · Uniform CPA Examination, FAR Core section",`
- Hub group: none fits. New group after "Real estate, insurance, securities & notary licenses":
  `{ title: "Accounting and CPA exams", ids: ["cpafar", "cpareg"] },`
  (cpareg's builder proposes the same group; keep one entry.) If the group is too small for
  `relatedTests`, add `RELATED_OVERRIDES` `cpafar: ["cpareg", "cca", "sie"],`.
- `SEARCH_ALIASES`:
  `cpafar: "cpa far cpa exam financial accounting and reporting far section uniform cpa examination aicpa nasba gaap accounting cpa core accountant license certified public accountant",`

## lib/region.ts

US exam: no `TEST_REGIONS` entry. Add `"cpafar"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  cpafar: {
    answer:
      "FAR (Financial Accounting and Reporting) is one of the three Core sections of the Uniform CPA Examination, developed by the AICPA and delivered with NASBA and the state boards of accountancy. It lasts 4 hours and has 50 multiple-choice questions and 7 task-based simulations, each half of the score. Scores run from 0 to 99 and 75 passes; it is a scaled score, not a percent correct. Under the Blueprints effective January 1, 2026 its three content areas are Financial Reporting (30 to 40%), Select Balance Sheet Accounts (30 to 40%) and Select Transactions (25 to 35%).",
    rows: [
      { label: "Time", value: "4 hours" },
      { label: "Questions", value: "50 multiple choice, 7 task-based simulations" },
      { label: "Score weighting", value: "50% multiple choice, 50% simulations" },
      { label: "Passing score", value: "75 on a 0 to 99 scale" },
      { label: "Content areas", value: "Financial Reporting, Balance Sheet Accounts, Select Transactions" },
      { label: "Blueprint", value: "AICPA, effective January 1, 2026" },
      { label: "Run by", value: "AICPA, NASBA and state boards of accountancy" },
    ],
    basedOn: "the AICPA CPA Exam Blueprints effective January 1, 2026 and the 2027 summary of changes, checked November 2026",
    source: { name: "AICPA: What is tested on the CPA Exam", url: "https://www.aicpa-cima.com/resources/article/learn-what-is-tested-on-the-cpa-exam" },
  },
```
(Fees left out: they vary by jurisdiction.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx, TEACHER_LED

Nothing: candidates self-study (the template adds no TEACHES line); the landing does not render `ExamClassFaq`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing: sitemaps map over `EXAMS`, no redirects, `calculator` icon exists, tiger falls back to the DMV one
(or borrow one via `BORROWED_SETS` if the integrator prefers).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 40).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cpafar:cpa-far:14901`

## CLAUDE.md (under Additional Exams, after the Series 7 bullet)

```md
- **CPA FAR** (Uniform CPA Examination, Financial Accounting and Reporting section, multiple choice only, `/cpa-far/*`, landing `/cpa-far-practice-test`): `data/cpa-far-questions.json` (200 original questions on the AICPA Blueprints effective January 1, 2026, unchanged for FAR in the 2027 Blueprints: Area I statements and consolidation 28, not-for-profit and government 16, public companies, special purpose frameworks and ratios 24; Area II cash, receivables and inventory 24, PP&E, intangibles and investments 28, liabilities, debt and equity 20; Area III accounting changes, contingencies and subsequent events 20, revenue and contributions 16, income taxes, fair value and leases 24), test IDs 14901-14904, sets 14901-14907, state `CPAFAR`, prefix `CPAFAR-`, 75% readiness line (the real section is 4 hours, 50 MCQs and 7 simulations scored 50/50, 75 on a 0-99 scale). 7/4/6, 6/7/5, 5/4/6 per test (Areas I/II/III 17/18/15 inside 30-40/30-40/25-35%). Task-based simulations not modelled; BAR topics (business combinations and goodwill, internally developed software, R&D, foreign currency translation, derivatives, stock compensation, lessor accounting) left out. Built by `tools/next100/cpafar/build.py`; sources in `tools/next100/cpafar/sources.md`.
```
