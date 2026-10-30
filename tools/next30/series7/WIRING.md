# Wiring for `series7` (FINRA Series 7 General Securities Representative exam, US, v1)

Files already written by the builder: `data/series-7-questions.json` (200, PASS), `lib/banks/series7.ts`,
`app/series-7/*` (8 wrappers, copied from `app/life-in-the-uk/`), `app/series-7-practice-test/page.tsx`,
`tools/next30/series7/*` (spec, sources, `q_*.py`, `build.py`). Everything below goes in shared files.

Format note: the real Series 7 is 125 scored questions plus 5 unscored pretest items (cut from 10
on 2025-10-27) in 3h45, passing score 72. Here: four 50-question mock tests (a shorter mock, as
SPEC allows) weighted to FINRA's 9/11/91/14 functions, 6 training sets + 4 tests = 10 dashboard
steps. Pass line `ceil(0.72 * 50) = 36`. Pools are exactly 4x per-test counts, so no item repeats
across tests. Sets are content sets, so not interleaved: sets first, then tests.

## lib/exams.ts

Add `"series7"` to the `ExamId` union. Icon `building` already exists (same as `sie`).

```ts
const series7: ExamConfig = {
  id: "series7",
  stateCode: "SERIES7",
  idBase: 11500,
  slug: "/series-7",
  landingPath: "/series-7-practice-test",
  name: "Series 7 Practice Test",
  shortName: "Series 7",
  examLabel: "Series 7 exam",
  fullName: "FINRA Series 7 General Securities Representative exam",
  questionIdPrefix: "SERIES7-",
  icon: "building",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 72,
  // FINRA Series 7 content outline (exams on or after Oct 1, 2018; current PDF in the 2025-10
  // folder; checked October 2026): 125 scored items (+5 unscored), 3h45, passing score 72.
  // Functions 9/11/91/14 of 125 (7.2/8.8/72.8/11.2%) scaled to 50: F1 seeks business 4,
  // F2 opens accounts 4, F3 information/recommendations/records 36 (equity 6, debt and munis 9,
  // options 8, packaged products 6, recommendations/tax/retirement 7), F4 processes and confirms
  // transactions 6. All items original.
  blueprint: {
    s7Business: 4,
    s7Accounts: 4,
    s7Equity: 6,
    s7Debt: 9,
    s7Options: 8,
    s7Funds: 6,
    s7Suitability: 7,
    s7Trading: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 11501, name: "Prospecting & Opening Accounts", categories: ["s7Business", "s7Accounts"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 11502, name: "Equity Securities", categories: ["s7Equity"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 3, id: 11503, name: "Debt & Municipal Securities", categories: ["s7Debt"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 4, id: 11504, name: "Options", categories: ["s7Options"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 5, id: 11505, name: "Packaged Products & Recommendations", categories: ["s7Funds", "s7Suitability"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 6, id: 11506, name: "Orders, Margin & Confirmations", categories: ["s7Trading"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    s7Business: "Seeking Business for the Broker-Dealer",
    s7Accounts: "Opening Accounts",
    s7Equity: "Equity Securities",
    s7Debt: "Debt & Municipal Securities",
    s7Options: "Options",
    s7Funds: "Packaged Products",
    s7Suitability: "Recommendations, Tax & Retirement",
    s7Trading: "Orders, Margin & Confirmations",
  },
  copy: {
    guestPrompt: "to save your Series 7 progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Six sets covering all four functions of FINRA's Series 7 outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions weighted like the real Series 7, 72% to pass",
    heroSubs: [
      "Six sets, four mock tests. Options and munis weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Schedule your Series 7.",
    ],
    sourceLine: "Based on FINRA's Series 7 content outline. Original questions; 50 per test, weighted like the real 125-question exam, 72% to pass.",
    analyticsKey: "series7",
  },
};
```

Append `series7` to the `EXAMS` array right after `sie` (near `realestate`, `insurance`, `pnc`, `notary`).

Check: 11501-11504 (tests) and 11501-11506 (sets) must be free (SPEC row 9 assigns 11500).

## lib/banks/all.ts

```ts
import "./series7";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/series7.ts`.

## types/index.ts

- `QuestionType`: add `| "SERIES7"`.
- `QuestionCategory`, under a `// FINRA Series 7` comment:

```ts
  | "s7Business"
  | "s7Accounts"
  | "s7Equity"
  | "s7Debt"
  | "s7Options"
  | "s7Funds"
  | "s7Suitability"
  | "s7Trading"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    s7Business: "Seeking Business for the Broker-Dealer",
    s7Accounts: "Opening Accounts",
    s7Equity: "Equity Securities",
    s7Debt: "Debt & Municipal Securities",
    s7Options: "Options",
    s7Funds: "Packaged Products",
    s7Suitability: "Recommendations, Tax & Retirement",
    s7Trading: "Orders, Margin & Confirmations",
```

## app/globals.css

Suggested hue 205, a deep petrol/navy blue that sits apart from the SIE green (160); re-pick if
it clashes, then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* FINRA Series 7 theme */
  [data-theme="series7"] {
    --brand: 205 70% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 205 70% 96%;
    --brand-hover: 205 70% 27%;
    --brand-dark: 205 70% 24%;
    --brand-darker: 205 65% 15%;
    --brand-muted: 205 35% 70%;
    --brand-border: 205 35% 80%;
    --brand-border-light: 205 32% 89%;
    --brand-gradient-to: 45 70% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `series7: "FINRA Series 7 practice on the current outline: options strategies, municipal and corporate bonds, equities, funds and annuities, suitability and Reg BI, margin and trading, with every calculation explained.",`
- `EXAM_ORG`: `series7: "FINRA · General Securities Representative",`
- Hub group: same as the `sie` WIRING proposes: rename `"Real estate, insurance & notary licenses"`
  to `"Real estate, insurance, securities & notary licenses"` with ids
  `["realestate", "insurance", "pnc", "sie", "series7", "notary"]`.
- `SEARCH_ALIASES`:
  `series7: "series 7 exam general securities representative gs finra stockbroker license registered representative options municipal bonds margin series 7 top-off sie corequisite finance securities",`
- `RELATED_OVERRIDES` (optional, so the SIE is always cross-linked first): `series7: ["sie", "insurance", "pnc"],`

## lib/region.ts

US exam: no `TEST_REGIONS` entry. Add `"series7"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  series7: {
    answer:
      "The Series 7 is FINRA's General Securities Representative exam: 125 scored multiple-choice questions, plus 5 unscored pretest questions, in 3 hours 45 minutes, with a passing score of 72. Together with the Securities Industry Essentials (SIE) exam, a corequisite, it qualifies a registered representative to sell most securities, including stocks, bonds, options, municipal securities and investment company products. Candidates must be sponsored by a FINRA member firm, and almost three quarters of the questions cover investment information, recommendations and records.",
    rows: [
      { label: "Questions", value: "125 scored, plus 5 unscored" },
      { label: "Time", value: "3 hours 45 minutes" },
      { label: "Passing score", value: "72" },
      { label: "Corequisite", value: "SIE exam" },
      { label: "Eligibility", value: "Sponsored by a FINRA member firm" },
      { label: "Largest function", value: "Information and recommendations, 73%" },
      { label: "Run by", value: "FINRA, delivered by Prometric" },
    ],
    basedOn: "FINRA's Series 7 exam page and content outline, checked October 2026",
    source: { name: "FINRA: Series 7 Exam", url: "https://www.finra.org/registration-exams-ce/qualification-exams/series7" },
  },
```
(Fee deliberately left out; FINRA listed $395 on 2026-10-30.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: not taught in classes (firm-sponsored); the landing does not render `ExamClassFaq`.

## Landing breadcrumbs

`ExamLandingBreadcrumbs` does not exist in this tree; if the integrator adds it, place it right after
the JSON-LD script in `app/series-7-practice-test/page.tsx`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing: sitemaps map over `EXAMS`, no redirects, `building` icon exists, tiger falls back to the DMV one.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 52).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing series7:series-7:11501`

## CLAUDE.md (under Additional Exams, after the SIE bullet)

```md
- **Series 7** (FINRA General Securities Representative, `/series-7/*`, landing `/series-7-practice-test`): `data/series-7-questions.json` (200 questions on FINRA's Series 7 outline, functions 9/11/91/14 of 125: seeking business 16, opening accounts 16, equities 24, debt and municipal securities 36, options 32, packaged products 24, recommendations/tax/retirement 28, orders/margin/confirmations 24), a shorter mock: test IDs 11501-11504 (50 questions each), sets 11501-11506, state `SERIES7`, 72% pass. 4/4/6/9/8/6/7/6 per test. T+1 settlement and ex-date = record date; no item on the PDT rule (replaced June 2026) or the gift limit ($300 since March 2026). Written alongside the SIE and scanned against it so no item is shared. Built by `tools/next30/series7/build.py`; sources in `tools/next30/series7/sources.md`.
```
