# Wiring for `cfal1` (CFA Program Level I, GLOBAL, v1)

Files already written by the builder: `data/cfa-level-1-questions.json` (200, PASS), `lib/banks/cfal1.ts`,
`app/cfa-level-1/*` (5 wrappers copied from `app/cpa-far/`: layout, redirect, dashboard, drill, stats),
`app/cfa-level-1-practice-test/page.tsx`, `tools/next100/cfal1/*` (spec, sources, `q_*.py`, `build.py`).
Everything below goes in shared files.

Format note: the real Level I exam is 180 three-option multiple-choice questions in two 135-minute
sessions of 90, equally weighted, no penalty for wrong answers, minimum passing score set after each
exam and not published (pass / do not pass). Here: four 50-question tests weighted to the CFA
Institute topic weights for exams from February 2027 (6/6/4/6/4/6/6/4/4/4), four options per item,
7 content training sets + 4 tests = 11 dashboard steps, 70% as Tigertest's readiness line
(`ceil(0.70 * 50) = 35`). Pools are exactly 4x per-test counts. Sets are content sets as in the cpafar
template (sets first, then tests).

Decision to check: the bank follows the 2027 weights (Ethics 10-15%, Quant 11-14%), not the 2026
ones (Ethics 15-20%, Quant 6-9%) still used in the November 2026 window. The landing and FAQ say so.

## lib/exams.ts

Add `"cfal1"` to the `ExamId` union. Icon `calculator` already exists in the union and `TestIcon`.

```ts
const cfal1: ExamConfig = {
  id: "cfal1",
  stateCode: "CFAL1",
  idBase: 16300,
  slug: "/cfa-level-1",
  landingPath: "/cfa-level-1-practice-test",
  name: "CFA Level I Practice Test",
  shortName: "CFA Level I",
  examLabel: "CFA Level I exam",
  fullName: "CFA Program Level I exam",
  questionIdPrefix: "CFAL1-",
  icon: "calculator",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // CFA Institute Level I topic weights for exams from February 2027 (cfainstitute.org Level I
  // exam page, checked Nov 3, 2026): Ethics 10-15, Quant 11-14, Economics 6-9, FSA 11-14,
  // Corporate Finance 6-9, Equities 11-14, Fixed Income 11-14, Derivatives & Risk Mgmt 6-9,
  // Alternatives 6-9, Portfolio Construction 8-12. Per 50: 12/12/8/12/8/12/12/8/8/8%.
  // Real exam: 180 three-option items in two 135-minute sessions; MPS not published. All items original.
  blueprint: {
    cfal1Ethics: 6,
    cfal1Quant: 6,
    cfal1Econ: 4,
    cfal1Fsa: 6,
    cfal1Corp: 4,
    cfal1Equity: 6,
    cfal1Fixed: 6,
    cfal1Deriv: 4,
    cfal1Alts: 4,
    cfal1Portfolio: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 16301, name: "Ethical & Professional Standards", categories: ["cfal1Ethics"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 2, id: 16302, name: "Quantitative Methods", categories: ["cfal1Quant"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 3, id: 16303, name: "Economics & Corporate Finance", categories: ["cfal1Econ", "cfal1Corp"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 4, id: 16304, name: "Financial Statement Analysis", categories: ["cfal1Fsa"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 5, id: 16305, name: "Equities", categories: ["cfal1Equity"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 6, id: 16306, name: "Fixed Income", categories: ["cfal1Fixed"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 7, id: 16307, name: "Derivatives, Alternatives & Portfolios", categories: ["cfal1Deriv", "cfal1Alts", "cfal1Portfolio"], size: 48, weightLabel: "12 of 50 test questions" },
  ],
  categoryLabels: {
    cfal1Ethics: "Ethical & Professional Standards",
    cfal1Quant: "Quantitative Methods",
    cfal1Econ: "Economics",
    cfal1Fsa: "Financial Statement Analysis",
    cfal1Corp: "Corporate Finance",
    cfal1Equity: "Equities",
    cfal1Fixed: "Fixed Income",
    cfal1Deriv: "Derivatives & Risk Management",
    cfal1Alts: "Alternative Investments",
    cfal1Portfolio: "Portfolio Construction",
  },
  copy: {
    guestPrompt: "to save your CFA Level I progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Seven sets covering all ten Level I topics. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the Level I topic outline, 70% readiness line",
    heroSubs: [
      "Seven sets, four tests. Start with ethics.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Take a full-length mock, then sit Level I.",
    ],
    sourceLine: "Based on CFA Institute's Level I topic weights for 2027. Original questions with four choices (the real exam has three). Not affiliated with CFA Institute.",
    analyticsKey: "cfal1",
  },
};
```

Append `cfal1` to the `EXAMS` array next to `cpafar` / `series65`.

Check: 16301-16304 (tests) and 16301-16307 (sets) must be free (batch B table assigns 16300).

## lib/banks/all.ts

```ts
import "./cfal1";
```

## types/index.ts

- `QuestionType`: add `| "CFAL1"`.
- `QuestionCategory`, under a `// CFA Program Level I` comment:

```ts
  | "cfal1Ethics"
  | "cfal1Quant"
  | "cfal1Econ"
  | "cfal1Fsa"
  | "cfal1Corp"
  | "cfal1Equity"
  | "cfal1Fixed"
  | "cfal1Deriv"
  | "cfal1Alts"
  | "cfal1Portfolio"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cfal1Ethics: "Ethical & Professional Standards",
    cfal1Quant: "Quantitative Methods",
    cfal1Econ: "Economics",
    cfal1Fsa: "Financial Statement Analysis",
    cfal1Corp: "Corporate Finance",
    cfal1Equity: "Equities",
    cfal1Fixed: "Fixed Income",
    cfal1Deriv: "Derivatives & Risk Management",
    cfal1Alts: "Alternative Investments",
    cfal1Portfolio: "Portfolio Construction",
```

## app/globals.css

Hue from the batch B table (already checked): 220 25% 26%. Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* CFA Program Level I theme */
  [data-theme="cfal1"] {
    --brand: 220 25% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 220 25% 96%;
    --brand-hover: 220 25% 21%;
    --brand-dark: 220 25% 18%;
    --brand-darker: 220 22% 12%;
    --brand-muted: 220 15% 70%;
    --brand-border: 220 15% 80%;
    --brand-border-light: 220 14% 89%;
    --brand-gradient-to: 40 50% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cfal1: "CFA Level I practice on all ten topics, weighted like CFA Institute's 2027 outline: ethics and the Standards, quant, economics, IFRS financial statement analysis, corporate finance, equities, fixed income, derivatives, alternatives and portfolio construction, every calculation explained.",`
- `EXAM_ORG`: `cfal1: "CFA Institute · CFA Program Level I",`
- Hub group: add to "Accounting and CPA exams" (rename it "Accounting, CPA and CFA exams" if the
  integrator likes): `ids: ["cpafar", "cpareg", ..., "cfal1"]`. Alternative: append to
  "Real estate, insurance, securities & notary licenses" after `series65`.
- `RELATED_OVERRIDES`: `cfal1: ["series65", "cpafar", "sie"],`
- `SEARCH_ALIASES`:
  `cfal1: "cfa level 1 cfa level i cfa l1 chartered financial analyst cfa institute cfa program cfa exam investment analyst cfa ethics standards of professional conduct gips fixed income derivatives equity valuation financial statement analysis ifrs portfolio management",`

## lib/region.ts

`cfal1: "GLOBAL",` in `TEST_REGIONS` (taken in 2026 in many countries: India, China, the US, the
UK, Canada, Hong Kong, Singapore, the Gulf). Not in `NON_DRIVING_TESTS` (GLOBAL tests are not listed
there, like `aws` and `gulfrn`). Add to the `GLOBAL` list in CLAUDE.md's country section if that
list is maintained.

## lib/examFacts.ts

```ts
  cfal1: {
    answer:
      "CFA Level I is the first of three exams in the CFA Program run by CFA Institute. It has 180 multiple-choice questions in two sessions of 90, each 135 minutes long, and every question has three answer choices. All questions count equally and there is no penalty for wrong answers. CFA Institute sets the minimum passing score after each exam and does not publish it; results are pass or do not pass. For exams from February 2027 the topic weights are Ethics 10 to 15%, Quantitative Methods 11 to 14%, Economics 6 to 9%, Financial Statement Analysis 11 to 14%, Corporate Finance 6 to 9%, Equities 11 to 14%, Fixed Income 11 to 14%, Derivatives and Risk Management 6 to 9%, Alternative Investments 6 to 9% and Portfolio Construction 8 to 12%.",
    rows: [
      { label: "Questions", value: "180 multiple choice, 3 choices each" },
      { label: "Time", value: "Two sessions of 135 minutes" },
      { label: "Wrong answers", value: "No penalty" },
      { label: "Passing score", value: "Set after each exam, not published" },
      { label: "Topics", value: "10, Ethics to Portfolio Construction" },
      { label: "Also required", value: "One Practical Skills Module" },
      { label: "Run by", value: "CFA Institute" },
    ],
    basedOn: "the CFA Institute Level I exam page and its 2026 and 2027 topic weights, checked November 2026",
    source: { name: "CFA Institute: Level I exam", url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam" },
  },
```
(Fees and exam dates left out: fees change and the dates page could not be confirmed.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx, TEACHER_LED

Nothing: candidates self-study (like cpafar); the landing does not render `ExamClassFaq`.

## lib/tigerAssets.ts (optional)

`BORROWED_SETS`: `cfal1: "series7",` (like series63 and series65), or `"cpc"` like cpafar.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing: sitemaps map over `EXAMS`, no redirects, `calculator` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 48).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cfal1:cfa-level-1:16301`

## CLAUDE.md (under Additional Exams, after the CPA REG bullet)

```md
- **CFA Level I** (CFA Program Level I, `/cfa-level-1/*`, landing `/cfa-level-1-practice-test`, `[data-theme="cfal1"]` dark slate blue (220 25% 26%), region GLOBAL): `data/cfa-level-1-questions.json` (200 original questions on CFA Institute's Level I topic weights for exams from February 2027: ethics 24, quantitative methods 24, economics 16, financial statement analysis 24 (IFRS-led), corporate finance 16, equities 24, fixed income 24, derivatives and risk management 16, alternative investments 16, portfolio construction 16), test IDs 16301-16304, sets 16301-16307 (by topic; set 7 joins derivatives, alternatives and portfolio), state `CFAL1`, prefix `CFAL1-`, 70% readiness line (the real exam is 180 three-option items in two 135-minute sessions, no penalty for wrong answers, minimum passing score set after each exam and not published). 6/6/4/6/4/6/6/4/4/4 per test (12/12/8/12/8/12/12/8/8/8%, inside the 2027 ranges; the November 2026 window still uses the 2026 weights, Ethics 15-20%). Ours have four options; the landing says so. Kept clear of the Series 65, Series 7, SIE and CPA FAR banks (Treynor and M-squared rather than Sharpe and alpha, CAPM from a risk premium, IFRS rather than US GAAP). Built by `tools/next100/cfal1/build.py`; sources in `tools/next100/cfal1/sources.md`.
```
