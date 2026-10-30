# Wiring for `sie` (FINRA Securities Industry Essentials, US, v1)

Files already written by the builder: `data/sie-questions.json` (200, PASS), `lib/banks/sie.ts`,
`app/sie/*` (8 wrappers, copied from `app/life-in-the-uk/`), `app/sie-exam-practice-test/page.tsx`,
`tools/next30/sie/*` (spec, sources, `q_*.py`, `build.py`). Everything below goes in shared files.

Format note: the real SIE is 75 scored questions (plus a few unscored pretest items) in 1h45,
passing score 70. Here: four 50-question mock tests weighted to FINRA's 16/44/31/9 outline,
5 training sets + 4 tests = 9 dashboard steps. Pass line `ceil(0.70 * 50) = 35`.
No item repeats across tests (pools are exactly 4x per-test counts).

## lib/exams.ts

Add `"sie"` to the `ExamId` union. Icon `building` already exists in the icon union.

```ts
const sie: ExamConfig = {
  id: "sie",
  stateCode: "SIE",
  idBase: 11400,
  slug: "/sie",
  landingPath: "/sie-exam-practice-test",
  name: "SIE Exam Practice Test",
  shortName: "SIE",
  examLabel: "SIE exam",
  fullName: "FINRA Securities Industry Essentials (SIE) exam",
  questionIdPrefix: "SIE-",
  icon: "building",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // FINRA SIE content outline (current revision, October 2025; checked October 2026): 75 scored
  // items, 1h45, passing score 70. Sections 12/33/23/7 of 75 (16/44/31/9%) scaled to 50:
  // capital markets 8; products and risks 22 (equity/debt 11, funds/options/risk 11); trading,
  // accounts and prohibited activities 16 (trading 8, accounts/conduct 8); regulatory framework 4.
  // All items original.
  blueprint: {
    sieMarkets: 8,
    sieEquityDebt: 11,
    sieFunds: 11,
    sieTrading: 8,
    sieAccounts: 8,
    sieRegulation: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 11401, name: "Capital Markets", categories: ["sieMarkets"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 11402, name: "Equity & Debt Securities", categories: ["sieEquityDebt"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 11403, name: "Funds, Options & Risk", categories: ["sieFunds"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 4, id: 11404, name: "Trading & Settlement", categories: ["sieTrading"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 5, id: 11405, name: "Accounts, Conduct & Regulation", categories: ["sieAccounts", "sieRegulation"], size: 48, weightLabel: "12 of 50 test questions" },
  ],
  categoryLabels: {
    sieMarkets: "Knowledge of Capital Markets",
    sieEquityDebt: "Equity & Debt Securities",
    sieFunds: "Funds, Options & Investment Risk",
    sieTrading: "Trading & Settlement",
    sieAccounts: "Customer Accounts & Prohibited Activities",
    sieRegulation: "Regulatory Framework",
  },
  copy: {
    guestPrompt: "to save your SIE progress and track every question you miss",
    trainingHeading: "Train by outline section",
    trainingSub: "Five sets covering every section of FINRA's SIE outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions weighted like the real SIE, 70% to pass",
    heroSubs: [
      "Five sets, four mock tests. Products weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your SIE.",
    ],
    sourceLine: "Based on FINRA's Securities Industry Essentials content outline. Original questions; 50 per test, weighted like the real 75-question exam, 70% to pass.",
    analyticsKey: "sie",
  },
};
```

Append `sie` to the `EXAMS` array (near `realestate`, `insurance`, `pnc`, `notary`).

Check: 11401-11404 (tests) and 11401-11405 (sets) must be free (SPEC row 8 assigns 11400).

## lib/banks/all.ts

```ts
import "./sie";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/sie.ts`.

## types/index.ts

- `QuestionType`: add `| "SIE"`.
- `QuestionCategory`, under a `// FINRA SIE` comment:

```ts
  | "sieMarkets"
  | "sieEquityDebt"
  | "sieFunds"
  | "sieTrading"
  | "sieAccounts"
  | "sieRegulation"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    sieMarkets: "Knowledge of Capital Markets",
    sieEquityDebt: "Equity & Debt Securities",
    sieFunds: "Funds, Options & Investment Risk",
    sieTrading: "Trading & Settlement",
    sieAccounts: "Customer Accounts & Prohibited Activities",
    sieRegulation: "Regulatory Framework",
```

## app/globals.css

Suggested hue 160, a deep money green (re-pick if it clashes with `series7` or others), then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* FINRA SIE theme */
  [data-theme="sie"] {
    --brand: 160 65% 28%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 160 55% 95%;
    --brand-hover: 160 65% 23%;
    --brand-dark: 160 65% 20%;
    --brand-darker: 160 60% 13%;
    --brand-muted: 160 30% 68%;
    --brand-border: 160 30% 78%;
    --brand-border-light: 160 28% 88%;
    --brand-gradient-to: 45 70% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `sie: "FINRA Securities Industry Essentials exam on the current content outline. Capital markets, stocks and bonds, funds and options, trading, customer accounts, prohibited activities and regulation.",`
- `EXAM_ORG`: `sie: "FINRA · Securities Industry Essentials",`
- Hub group: rename `"Real estate, insurance & notary licenses"` to
  `"Real estate, insurance, securities & notary licenses"` and add `"sie"` (and `"series7"` from
  this batch) to its ids: `["realestate", "insurance", "pnc", "sie", "series7", "notary"]`.
- `SEARCH_ALIASES`:
  `sie: "sie exam securities industry essentials finra stockbroker broker license series 7 series 6 corequisite finance securities",`

## lib/region.ts

US exam: no `TEST_REGIONS` entry. Add `"sie"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  sie: {
    answer:
      "The Securities Industry Essentials (SIE) exam is FINRA's entry-level securities exam: 75 scored multiple-choice questions, plus a few unscored pretest questions, in 1 hour and 45 minutes, with a passing score of 70. It covers capital markets, products and their risks, trading, customer accounts and prohibited activities, and the regulatory framework. Anyone 18 or older can take it without a sponsoring firm, a pass is valid for four years, and it is a corequisite for representative exams such as the Series 7.",
    rows: [
      { label: "Questions", value: "75 scored, plus unscored pretest items" },
      { label: "Time", value: "1 hour 45 minutes" },
      { label: "Passing score", value: "70" },
      { label: "Eligibility", value: "Age 18+, no firm sponsorship needed" },
      { label: "Result valid", value: "4 years" },
      { label: "Largest section", value: "Products and their risks, 44%" },
      { label: "Run by", value: "FINRA, delivered by Prometric" },
    ],
    basedOn: "FINRA's SIE exam page and content outline, checked October 2026",
    source: { name: "FINRA: Securities Industry Essentials Exam", url: "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam" },
  },
```
(Fee deliberately left out; FINRA listed $100 on 2026-10-30.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Optional. The landing does not render `ExamClassFaq`. If wanted: `TEACHES.sie = "a finance or securities licensing course"`, then add `<ExamClassFaq examId="sie" />` and `classFaqJsonLd("sie")` to the landing.

## Landing breadcrumbs

`ExamLandingBreadcrumbs` does not exist in this tree; if the integrator adds it, place it right after
the JSON-LD script in `app/sie-exam-practice-test/page.tsx`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing: sitemaps map over `EXAMS`, no redirects, `building` icon already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing sie:sie:11401`

## CLAUDE.md (under Additional Exams)

```md
- **SIE** (FINRA Securities Industry Essentials, `/sie/*`, landing `/sie-exam-practice-test`): `data/sie-questions.json` (200 questions on the FINRA content outline, rev. October 2025: capital markets 32, equity/debt 44, funds/options/risk 44, trading/settlement 32, accounts/prohibited activities 32, regulatory framework 16), test IDs 11401-11404, sets 11401-11405, state `SIE`, 70% pass. 8/11/11/8/8/4 per test (FINRA's 12/33/23/7 of 75 scaled to 50). T+1 settlement; no dollar limits that change. Built by `tools/next30/sie/build.py`; sources in `tools/next30/sie/sources.md`.
```
