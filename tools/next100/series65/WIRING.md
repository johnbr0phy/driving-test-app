# Wiring for `series65` (NASAA Series 65 Uniform Investment Adviser Law Examination, US, v1)

Files already written by the builder: `data/series-65-questions.json` (200, PASS),
`lib/banks/series65.ts`, `app/series-65/*` (layout, redirect, dashboard, drill, stats, copied
from `app/series-7/`), `app/series-65-practice-test/page.tsx`, `tools/next100/series65/*` (spec,
sources, `q_*.py`, `build.py`). Everything below goes in shared files.

Format note: the real Series 65 is 130 scored questions plus 10 unscored pretest items in 180
minutes; a pass is 92 of 130 (NASAA says it is not a percentage cut; it is about 70.8%). Here: four
50-question mock tests (a shorter mock) weighted to NASAA's 15/25/30/30 sections (8/12/15/15),
6 training sets + 4 tests = 10 dashboard steps. passPct 71 gives `ceil(0.71 * 50) = 36`. Pools are
exactly 4x per-test counts, so no item repeats across tests. Content sets, so sets first, then tests.
NASAA will update questions for the May 2026 adviser advertising model rule amendments in early
2027; the bank asks nothing about advertising, testimonials or social media.

## lib/exams.ts

Add `"series65"` to the `ExamId` union. Icon `building` already exists (same as `sie`, `series7`).

```ts
const series65: ExamConfig = {
  id: "series65",
  stateCode: "SERIES65",
  idBase: 15200,
  slug: "/series-65",
  landingPath: "/series-65-practice-test",
  name: "Series 65 Practice Test",
  shortName: "Series 65",
  examLabel: "Series 65 exam",
  fullName: "NASAA Series 65 Uniform Investment Adviser Law Examination",
  questionIdPrefix: "S65-",
  icon: "building",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 71,
  // NASAA Series 65 test specifications effective June 12, 2023 (still current, checked
  // 2026-11-02): 130 scored items (+10 pretest), 180 minutes, 92 of 130 to pass (about 70.8%;
  // passPct 71 = ceil(0.71 * 50) = 36). Sections I economics 15% (20), II investment vehicles
  // 25% (32), III client recommendations and strategies 30% (39), IV laws, regulations and
  // ethics 30% (39), scaled to 50 as 8/12/15/15 and split by outline subsection: I.A+D 4,
  // I.B+C 4; II.A-C 5, II.D-G+J-K 3, II.H-I+L-N 4; III.A-B 3, III.C-D+J-K 6, III.E-I 6;
  // IV.A-B 5, IV.C-F 4, IV.G-H 6. All items original.
  blueprint: {
    s65Economy: 4,
    s65Analysis: 4,
    s65FixedIncome: 5,
    s65Equity: 3,
    s65Pooled: 4,
    s65Clients: 3,
    s65Portfolio: 6,
    s65TaxRetire: 6,
    s65Advisers: 5,
    s65StateLaw: 4,
    s65Ethics: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 15201, name: "Economics & Analysis", categories: ["s65Economy", "s65Analysis"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 15202, name: "Investment Vehicles", categories: ["s65FixedIncome", "s65Equity", "s65Pooled"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 15203, name: "Clients & Portfolio Strategy", categories: ["s65Clients", "s65Portfolio"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 4, id: 15204, name: "Taxes, Retirement & Estates", categories: ["s65TaxRetire"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 5, id: 15205, name: "Advisers & State Law", categories: ["s65Advisers", "s65StateLaw"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 6, id: 15206, name: "Ethics & Fiduciary Duty", categories: ["s65Ethics"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    s65Economy: "Economics & Risk",
    s65Analysis: "Financial Reporting & Analysis",
    s65FixedIncome: "Cash & Fixed Income",
    s65Equity: "Equities & Derivatives",
    s65Pooled: "Funds, Alternatives & Insurance",
    s65Clients: "Client Types & Profiles",
    s65Portfolio: "Portfolio Management & Trading",
    s65TaxRetire: "Taxes, Retirement & Estates",
    s65Advisers: "Regulation of Advisers & IARs",
    s65StateLaw: "Securities, Agents & Administrator",
    s65Ethics: "Ethics & Fiduciary Duty",
  },
  copy: {
    guestPrompt: "to save your Series 65 progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Six sets covering all four sections of NASAA's Series 65 outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions weighted like the real Series 65, 36 to pass",
    heroSubs: [
      "Six sets, four mock tests. Law and strategy weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Schedule your Series 65.",
    ],
    sourceLine: "Based on NASAA's Series 65 test specifications. Original questions; 50 per test, weighted like the real 130-question exam. Not affiliated with NASAA or FINRA.",
    analyticsKey: "series65",
  },
};
```

Append `series65` to the `EXAMS` array right after `series7` (and after `series63` if it lands).

Check: 15201-15204 (tests) and 15201-15206 (sets) must be free (batch A assigns 15200).

## lib/banks/all.ts

```ts
import "./series65";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/series65.ts`.

## types/index.ts

- `QuestionType`: add `| "SERIES65"`.
- `QuestionCategory`, under a `// NASAA Series 65` comment:

```ts
  | "s65Economy"
  | "s65Analysis"
  | "s65FixedIncome"
  | "s65Equity"
  | "s65Pooled"
  | "s65Clients"
  | "s65Portfolio"
  | "s65TaxRetire"
  | "s65Advisers"
  | "s65StateLaw"
  | "s65Ethics"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    s65Economy: "Economics & Risk",
    s65Analysis: "Financial Reporting & Analysis",
    s65FixedIncome: "Cash & Fixed Income",
    s65Equity: "Equities & Derivatives",
    s65Pooled: "Funds, Alternatives & Insurance",
    s65Clients: "Client Types & Profiles",
    s65Portfolio: "Portfolio Management & Trading",
    s65TaxRetire: "Taxes, Retirement & Estates",
    s65Advisers: "Regulation of Advisers & IARs",
    s65StateLaw: "Securities, Agents & Administrator",
    s65Ethics: "Ethics & Fiduciary Duty",
```

## app/globals.css

Hue as assigned in the batch A table (161 45% 38%, a deep jade). Run `tools/gen_dark_brand_css.py`
once afterwards.

```css
  /* NASAA Series 65 theme */
  [data-theme="series65"] {
    --brand: 161 45% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 161 45% 96%;
    --brand-hover: 161 45% 33%;
    --brand-dark: 161 45% 29%;
    --brand-darker: 161 40% 19%;
    --brand-muted: 161 25% 70%;
    --brand-border: 161 25% 80%;
    --brand-border-light: 161 22% 89%;
    --brand-gradient-to: 45 70% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `series65: "NASAA Series 65 practice on the current outline: who is an investment adviser or IAR, fiduciary duty and ethics, the Uniform Securities Act, portfolio theory and client strategies, taxes and retirement plans, and every formula worked through.",`
- `EXAM_ORG`: `series65: "NASAA · Uniform Investment Adviser Law Exam, administered by FINRA",`
- Hub group "Real estate, insurance, securities & notary licenses" (or its batch A rename): ids
  `["realestate", "insurance", "pnc", "sie", "series7", "series63", "series65", "notary"]`
  (with `nmls` wherever its WIRING lands it).
- `SEARCH_ALIASES`:
  `series65: "series 65 exam uniform investment adviser law exam nasaa investment adviser representative iar ria registered investment adviser fiduciary financial advisor license series 66 series 63 uniform securities act finance securities",`
- `RELATED_OVERRIDES`: `series65: ["series63", "series7", "sie"],` (drop `series63` if it is not wired).

## lib/region.ts

US exam: no `TEST_REGIONS` entry and nothing in `NON_DRIVING_TESTS` (same as `series7`).

## lib/examFacts.ts

```ts
  series65: {
    answer:
      "The Series 65 is the Uniform Investment Adviser Law Examination, written by NASAA and administered by FINRA. It has 130 scored multiple-choice questions plus 10 unscored pretest questions in 180 minutes, and you pass by answering at least 92 of the 130 scored questions correctly. Most states require it, or an approved professional designation such as the CFP, before registering an investment adviser representative. No firm sponsorship is needed. Its four sections are economic factors (15%), investment vehicles (25%), client recommendations and strategies (30%), and laws, regulations and ethics (30%).",
    rows: [
      { label: "Questions", value: "130 scored, plus 10 unscored" },
      { label: "Time", value: "180 minutes" },
      { label: "Passing score", value: "92 of 130 correct" },
      { label: "Sponsorship", value: "Not required" },
      { label: "Qualifies you as", value: "Investment adviser representative (IAR)" },
      { label: "Largest sections", value: "Recommendations 30%, laws and ethics 30%" },
      { label: "Run by", value: "NASAA, administered by FINRA" },
    ],
    basedOn: "NASAA's Series 65 content outline (effective June 12, 2023) and exam page, checked November 2026",
    source: { name: "NASAA: Series 65 Exam Content Outline", url: "https://www.nasaa.org/exams/study-guides/series-65-exam-content-outline/" },
  },
```
(Fee deliberately left out; NASAA and FINRA listed $187 on 2026-11-02.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx (TEACHER_LED / TEACHES)

Nothing: people self-study (same as `series7`); the landing does not render `ExamClassFaq`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing: sitemaps map over `EXAMS`, no redirects, `building` icon exists, tiger falls back to the
DMV one (or borrow the `series7` set through `BORROWED_SETS` if it gets one).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 48).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing series65:series-65:15201`

## CLAUDE.md (under Additional Exams, after the Series 7 bullet, and after Series 63 if it lands)

```md
- **Series 65** (NASAA Uniform Investment Adviser Law Examination, `/series-65/*`, landing `/series-65-practice-test`): `data/series-65-questions.json` (200 questions on NASAA's test specifications effective June 12, 2023, sections 15/25/30/30 of 130: economics and risk 16, financial reporting and analysis 16, cash and fixed income 20, equities and derivatives 12, funds, alternatives and insurance 16, client types and profiles 12, portfolio management and trading 24, taxes, retirement and estates 24, regulation of advisers and IARs 20, securities, agents and Administrator 16, ethics and fiduciary duty 24), a shorter mock: test IDs 15201-15204 (50 questions each), sets 15201-15206, state `SERIES65`, prefix `S65-`, 71% pass (36 of 50; the real pass is 92 of 130). 4/4/5/3/4/3/6/6/5/4/6 per test. No item on adviser advertising, testimonials or social media (NASAA's May 2026 model rule amendments reach the exam in early 2027) and no indexed dollar limits. Written alongside Series 63 and scanned against it, the SIE and Series 7 so no item is shared; this bank keeps to the adviser side of the Uniform Securities Act. Built by `tools/next100/series65/build.py`; sources in `tools/next100/series65/sources.md`. Hub group with SIE, Series 7 and Series 63, `[data-theme="series65"]` deep jade (161 45% 38%), DMV tiger fallback.
```
