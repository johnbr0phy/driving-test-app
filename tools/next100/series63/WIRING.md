# Wiring for `series63` (NASAA Series 63 Uniform Securities Agent State Law Exam, US, v1)

Files already written by the builder: `data/series-63-questions.json` (200, PASS),
`lib/banks/series63.ts`, `app/series-63/*` (layout, redirect, dashboard, drill, stats; copied from
`app/series-7/`), `app/series-63-practice-test/page.tsx`, `tools/next100/series63/*` (spec,
sources, `q_*.py`, `build.py`). Everything below goes in shared files.

Format note: the real Series 63 is 65 questions (60 scored, 5 unscored pretest) in 75 minutes,
pass = 43 of 60 scored (NASAA overview, Sept 1, 2023; test specifications effective June 12,
2023). Here: three real-length 60-question mock tests with NASAA's exact per-subject counts
(3/3/7/8/5/7/12/15), 5 training sets + 3 tests = 8 dashboard steps. Each pool is 3x its count plus
1 to 4 training-only spares (20 in all), like `uklitu`. `passPct: 71` so the pass line is
`ceil(0.71 * 60) = 43`, the real 43 of 60 (72 would give 44). Sets are content sets, so sets
first, then tests.

## lib/exams.ts

Add `"series63"` to the `ExamId` union. Icon `building` already exists (same as `sie`, `series7`).

```ts
const series63: ExamConfig = {
  id: "series63",
  stateCode: "SERIES63",
  idBase: 15300,
  slug: "/series-63",
  landingPath: "/series-63-practice-test",
  name: "Series 63 Practice Test",
  shortName: "Series 63",
  examLabel: "Series 63 exam",
  fullName: "NASAA Series 63 Uniform Securities Agent State Law Exam",
  questionIdPrefix: "S63-",
  icon: "building",
  testCount: 3,
  questionsPerTest: 60,
  passPct: 71,
  // NASAA Series 63 test specifications effective June 12, 2023 (overview dated Sept 1, 2023;
  // checked November 2026): 65 items, 60 scored, 75 minutes, 43 of 60 to pass, Uniform
  // Securities Act of 1956 as amended by NASAA. Per test exactly NASAA's counts: investment
  // advisers 3, IARs 3, broker-dealers 7, agents 8, securities and issuers 5, remedies and
  // administrative provisions 7, communication with customers 12, ethical practices 15.
  // passPct 71 gives ceil(42.6) = 43 of 60. Pools are 3x per test plus 20 training-only spares.
  // NASAA is updating adviser advertising items (May 2026 model rule amendments) in early 2027;
  // no item tests adviser advertising. All items original.
  blueprint: {
    s63Advisers: 3,
    s63Iars: 3,
    s63BrokerDealers: 7,
    s63Agents: 8,
    s63Securities: 5,
    s63Remedies: 7,
    s63Communication: 12,
    s63Ethics: 15,
  },
  trainingSets: [
    { setNumber: 1, id: 15301, name: "Investment Advisers & IARs", categories: ["s63Advisers", "s63Iars"], size: 20, weightLabel: "6 of 60 test questions" },
    { setNumber: 2, id: 15302, name: "Broker-Dealers & Agents", categories: ["s63BrokerDealers", "s63Agents"], size: 50, weightLabel: "15 of 60 test questions" },
    { setNumber: 3, id: 15303, name: "Securities, Issuers & Remedies", categories: ["s63Securities", "s63Remedies"], size: 42, weightLabel: "12 of 60 test questions" },
    { setNumber: 4, id: 15304, name: "Communication with Customers", categories: ["s63Communication"], size: 40, weightLabel: "12 of 60 test questions" },
    { setNumber: 5, id: 15305, name: "Ethical Practices & Obligations", categories: ["s63Ethics"], size: 48, weightLabel: "15 of 60 test questions" },
  ],
  categoryLabels: {
    s63Advisers: "Investment Advisers",
    s63Iars: "Investment Adviser Representatives",
    s63BrokerDealers: "Broker-Dealers",
    s63Agents: "Agents of Broker-Dealers",
    s63Securities: "Securities & Issuers",
    s63Remedies: "Remedies & Administrative Provisions",
    s63Communication: "Communication with Customers",
    s63Ethics: "Ethical Practices & Obligations",
  },
  copy: {
    guestPrompt: "to save your Series 63 progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets covering all eight subjects of NASAA's Series 63 outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 60 questions weighted like the real Series 63, 43 to pass",
    heroSubs: [
      "Five sets, three full mock tests. Ethics weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Schedule your Series 63.",
    ],
    sourceLine: "Based on NASAA's Series 63 test specifications. Original questions; 60 per test in the real exam's proportions, 43 of 60 to pass. Not affiliated with NASAA or FINRA.",
    analyticsKey: "series63",
  },
};
```

Append `series63` to the `EXAMS` array right after `series7` (and next to `series65` if it lands
in the same batch).

Check: 15301-15303 (tests) and 15301-15305 (sets) must be free (batch A table assigns 15300).

## lib/banks/all.ts

```ts
import "./series63";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/series63.ts`.

## types/index.ts

- `QuestionType`: add `| "SERIES63"`.
- `QuestionCategory`, under a `// NASAA Series 63` comment:

```ts
  | "s63Advisers"
  | "s63Iars"
  | "s63BrokerDealers"
  | "s63Agents"
  | "s63Securities"
  | "s63Remedies"
  | "s63Communication"
  | "s63Ethics"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    s63Advisers: "Investment Advisers",
    s63Iars: "Investment Adviser Representatives",
    s63BrokerDealers: "Broker-Dealers",
    s63Agents: "Agents of Broker-Dealers",
    s63Securities: "Securities & Issuers",
    s63Remedies: "Remedies & Administrative Provisions",
    s63Communication: "Communication with Customers",
    s63Ethics: "Ethical Practices & Obligations",
```

## app/globals.css

Hue from the batch A table (already checked): 203 25% 42%, a muted steel blue. Then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* NASAA Series 63 theme */
  [data-theme="series63"] {
    --brand: 203 25% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 203 25% 96%;
    --brand-hover: 203 25% 37%;
    --brand-dark: 203 25% 32%;
    --brand-darker: 203 22% 20%;
    --brand-muted: 203 18% 70%;
    --brand-border: 203 18% 80%;
    --brand-border-light: 203 16% 89%;
    --brand-gradient-to: 45 70% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `series63: "NASAA Series 63 practice on the Uniform Securities Act: agent and broker-dealer registration, exemptions, the Administrator's powers, ethics, Reg BI and customer communications, in three full-length mock tests.",`
- `EXAM_ORG`: `series63: "NASAA · Uniform Securities Agent State Law Exam, administered by FINRA",`
- Hub group "Real estate, insurance, securities & notary licenses": ids
  `["realestate", "insurance", "pnc", "sie", "series7", "series63", "notary"]` (put `series65`
  after `series63` if it lands too).
- `SEARCH_ALIASES`:
  `series63: "series 63 exam uniform securities agent state law exam nasaa usa uniform securities act blue sky law state securities agent license administrator series 7 series 6 sie finance securities",`
- `RELATED_OVERRIDES`: `series63: ["series7", "sie", "series65"],` (drop `series65` if it is not wired).

## lib/region.ts

US exam: no `TEST_REGIONS` entry and nothing in `NON_DRIVING_TESTS` (same as `series7`).

## lib/examFacts.ts

```ts
  series63: {
    answer:
      "The Series 63 is the Uniform Securities Agent State Law Examination, written by NASAA and administered by FINRA. It has 65 multiple-choice questions, 60 scored and 5 unscored, in 75 minutes, and you pass by answering at least 43 of the 60 scored questions correctly. Most states require it before an agent of a broker-dealer can register there. It tests the Uniform Securities Act of 1956 as amended by NASAA, NASAA's model rules and statements of policy, and federal and FINRA rules on agents, ethics and customer communications, with ethical practices the largest subject at 25%.",
    rows: [
      { label: "Questions", value: "60 scored, plus 5 unscored" },
      { label: "Time", value: "75 minutes" },
      { label: "Passing score", value: "43 of 60 correct" },
      { label: "Largest subject", value: "Ethical practices, 25%" },
      { label: "Law tested", value: "Uniform Securities Act of 1956, as amended by NASAA" },
      { label: "Corequisite", value: "None" },
      { label: "Run by", value: "NASAA, administered by FINRA" },
    ],
    basedOn: "NASAA's Series 63 overview and test specifications (effective June 12, 2023) and FINRA's Series 63 page, checked November 2026",
    source: { name: "NASAA: Series 63 Exam", url: "https://www.nasaa.org/exams/study-guides/series-63-exam-content-outline/" },
  },
```
(Fee deliberately left out; FINRA and NASAA list $147 on 2026-11-02.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx, TEACHER_LED

Nothing: firm-sponsored self-study, like `series7`; the landing does not render `ExamClassFaq`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing: sitemaps map over `EXAMS`, no redirects, `building` icon exists, tiger falls back to the
DMV one (or borrow the series7 set if it gets one).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 50).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing series63:series-63:15301`

## CLAUDE.md (under Additional Exams, after the Series 7 bullet)

```md
- **Series 63** (NASAA Uniform Securities Agent State Law Exam, administered by FINRA, `/series-63/*`, landing `/series-63-practice-test`): `data/series-63-questions.json` (200 questions on NASAA's test specifications effective June 12, 2023, Uniform Securities Act of 1956 as amended by NASAA: investment advisers 10, IARs 10, broker-dealers 24, agents 26, securities and issuers 18, remedies and administrative provisions 24, communication with customers 40, ethical practices 48), three real-length tests: test IDs 15301-15303 (60 questions each, NASAA's exact 3/3/7/8/5/7/12/15), sets 15301-15305 (by subject), state `SERIES63`, prefix `S63-`, 71% pass so the line is 43 of 60 like the real exam. 20 training-only spares. No adviser advertising items (NASAA updates them in early 2027 after the May 2026 model rule amendments). Written alongside `series65` and scanned against it, `series7` and `sie`. Built by `tools/next100/series63/build.py`; sources in `tools/next100/series63/sources.md`.
```
