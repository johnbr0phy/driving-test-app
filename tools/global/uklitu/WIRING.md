# Wiring for `uklitu` (Life in the UK test, UK, v1)

Files already written by the builder: `data/life-in-the-uk-questions.json` (200, PASS),
`lib/banks/uklitu.ts`, `app/life-in-the-uk/*` (8 wrappers, copied from `app/uk-food-hygiene/`),
`app/life-in-the-uk-test/page.tsx`, `tools/global/uklitu/*` (spec, sources, `q_*.py`, `build.py`).
Everything below goes in shared files.

Format note: this is the first v1 exam with 8 tests (CDL has 6). `examTestQuestions`,
`routesForExam` (`examTestIds`) and `ExamDashboard` all read `testCount` / `questionsPerTest`
generically, so nothing in the engine changes. Dashboard = 4 training sets + 8 tests = 12 steps
(sets are content sets, so not interleaved: sets first, then tests). Pass line
`ceil(0.75 * 24) = 18`. Each pool is 8x its per-test count plus 2 spares in the four big
categories (8 training-only items), so no item repeats across tests.

## lib/exams.ts

Add `"uklitu"` to the `ExamId` union. Icon `flag` already exists in the icon union.

Block (with the other UK exams):

```ts
const uklitu: ExamConfig = {
  id: "uklitu",
  stateCode: "UKLITU",
  idBase: 10100,
  slug: "/life-in-the-uk",
  landingPath: "/life-in-the-uk-test",
  name: "Life in the UK Practice Test",
  shortName: "Life in the UK",
  examLabel: "Life in the UK test",
  fullName: "Life in the UK test (settlement and British citizenship)",
  questionIdPrefix: "LITU-",
  icon: "flag",
  testCount: 8,
  questionsPerTest: 24,
  passPct: 75,
  // Real test (GOV.UK, checked October 2026): 24 questions in 45 minutes, 18 of 24 (75%) to pass,
  // drawn only from the Home Office handbook "Life in the United Kingdom: A Guide for New
  // Residents", 3rd edition (2013; no newer edition as of October 2026, though a reform was
  // signalled with the 2025 earned settlement proposals). The Home Office publishes no per-chapter
  // counts; these follow the handbook's chapters with history (chapter 3, split at 1688/1689)
  // weighted heaviest, 9 of 24. Eight real-length tests; each pool is 8x its count, plus 2
  // training-only spares in the four large categories. All items original.
  blueprint: {
    lituValues: 2,
    lituUk: 1,
    lituHistEarly: 4,
    lituHistLater: 5,
    lituSociety: 6,
    lituGov: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 10101, name: "Values, the UK & History to 1688", categories: ["lituValues", "lituUk", "lituHistEarly"], size: 58, weightLabel: "7 of 24 test questions" },
    { setNumber: 2, id: 10102, name: "History from 1689", categories: ["lituHistLater"], size: 42, weightLabel: "5 of 24 test questions" },
    { setNumber: 3, id: 10103, name: "A Modern, Thriving Society", categories: ["lituSociety"], size: 50, weightLabel: "6 of 24 test questions" },
    { setNumber: 4, id: 10104, name: "Government, Law & Your Role", categories: ["lituGov"], size: 50, weightLabel: "6 of 24 test questions" },
  ],
  categoryLabels: {
    lituValues: "Values & Principles of the UK",
    lituUk: "What Is the UK",
    lituHistEarly: "History to 1688",
    lituHistLater: "History from 1689",
    lituSociety: "A Modern, Thriving Society",
    lituGov: "Government, Law & Your Role",
  },
  copy: {
    guestPrompt: "to save your Life in the UK progress and track every question you miss",
    trainingHeading: "Train by handbook chapter",
    trainingSub: "Four sets covering every chapter of the official handbook. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 24 questions like the real test, 18 to pass",
    heroSubs: [
      "Four chapters, eight real-length tests. History weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your Life in the UK test.",
    ],
    sourceLine: "Based on the official handbook, Life in the United Kingdom: A Guide for New Residents (3rd edition). Original questions; 24 per test, 18 to pass like the real test.",
    analyticsKey: "uklitu",
  },
};
```

Append `uklitu` to the `EXAMS` array with the other UK exams.

Check: 10101-10108 (tests) and 10101-10104 (sets) must be free; the highest idBase in the
tree at build time was 10000. If another builder in this batch took 10100, move this exam's
whole block (idBase and the four set ids) to the next free hundred; no data depends on it.

## lib/banks/all.ts

```ts
import "./uklitu";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/uklitu.ts`.

## types/index.ts

- `QuestionType`: add `| "UKLITU"`.
- `QuestionCategory`, under a `// Life in the UK test` comment:

```ts
  | "lituValues"
  | "lituUk"
  | "lituHistEarly"
  | "lituHistLater"
  | "lituSociety"
  | "lituGov"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    lituValues: "Values & Principles of the UK",
    lituUk: "What Is the UK",
    lituHistEarly: "History to 1688",
    lituHistLater: "History from 1689",
    lituSociety: "A Modern, Thriving Society",
    lituGov: "Government, Law & Your Role",
```

## app/globals.css

Light block (suggested hue 225, a deep royal blue; re-pick if it clashes), then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Life in the UK test theme */
  [data-theme="uklitu"] {
    --brand: 225 60% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 225 70% 96%;
    --brand-hover: 225 60% 32%;
    --brand-dark: 225 60% 28%;
    --brand-darker: 225 55% 18%;
    --brand-muted: 225 35% 72%;
    --brand-border: 225 35% 80%;
    --brand-border-light: 225 32% 89%;
    --brand-gradient-to: 350 60% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `uklitu: "Eight real-length mock tests for the Life in the UK test: British values, history, culture, government and the law, all from the official handbook.",`
- `EXAM_ORG`: `uklitu: "Home Office · settlement and British citizenship",`
- Hub group: rename `{ title: "Citizenship", ids: ["civics"] }` to
  `{ title: "Citizenship and settlement tests", ids: ["civics", "uklitu", "cacit"] }`
  (`cacit` is the Canadian citizenship builder in this batch; drop it if not merged). This keeps
  `relatedTests()` cross-linking the citizenship tests instead of putting the Life in the UK test
  among UK driving or workplace tests.
- `SEARCH_ALIASES`:
  `uklitu: "life in the uk test british citizenship test uk citizenship test indefinite leave to remain ilr settlement naturalisation life in the united kingdom guide for new residents handbook home office lituk",`
- `RELATED_OVERRIDES` only if the citizenship group ends up with fewer than three others:
  `uklitu: ["civics", "ukcar", "ukfood"],`

## lib/region.ts

`uklitu: "UK",` in `TEST_REGIONS`, and add `"uklitu"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  uklitu: {
    answer:
      "The Life in the UK test is a 45-minute computer test of 24 multiple-choice questions about British values, history, culture, government and law. Most people applying for settlement (indefinite leave to remain) or British citizenship must pass it, and the pass mark is 18 correct answers, 75 percent. Every question comes from the official Home Office handbook, Life in the United Kingdom: A Guide for New Residents, and the test is taken only at approved test centres in the UK.",
    rows: [
      { label: "Questions", value: "24 multiple choice" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "18 of 24 (75%)" },
      { label: "Where", value: "Approved UK test centres, booked online" },
      { label: "Book ahead", value: "At least 3 days" },
      { label: "Needed for", value: "Settlement and British citizenship" },
      { label: "Study material", value: "A Guide for New Residents, 3rd edition" },
      { label: "Run by", value: "Home Office" },
    ],
    basedOn: "GOV.UK's Life in the UK test guidance and the official handbook, checked October 2026",
    source: { name: "GOV.UK: Life in the UK Test", url: "https://www.gov.uk/life-in-the-uk-test" },
  },
```
(Fee deliberately left out: house style avoids money figures; GOV.UK listed GBP 50 on 2026-10-30.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx

Add `"uklitu"` to `TEACHER_LED` (taught in ESOL and citizenship classes).

## components/exam/ExamClassFaq.tsx

In `TEACHES`: `uklitu: "ESOL or Life in the UK classes",`. The landing already renders
`<ExamClassFaq examId="uklitu" />` and `classFaqJsonLd("uklitu")`.

## lib/tigerAssets.ts (optional)

Falls back to the DMV tiger. Do not add to `TIGER_EXAM_IDS` without reviewed artwork.

## Landing breadcrumbs

The brief asks for `<ExamLandingBreadcrumbs examId>`, but no such component exists in this tree
(the ukfood template does not render one either). If the integrator adds it, place it right after
the JSON-LD script in `app/life-in-the-uk-test/page.tsx`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `flag` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing uklitu:life-in-the-uk:10101`

## CLAUDE.md (under Additional Exams)

```md
- **Life in the UK** (settlement and British citizenship test, `/life-in-the-uk/*`, landing `/life-in-the-uk-test`): `data/life-in-the-uk-questions.json` (200 questions from the Home Office handbook "Life in the United Kingdom: A Guide for New Residents", 3rd edition: values 16, what is the UK 8, history to 1688 34, history from 1689 42, modern society 50, government/law 50), the first v1 exam with eight real-length tests: test IDs 10101-10108 (24 questions each), sets 10101-10104 (by chapter), state `UKLITU`, 75% pass (18 of 24, like the real test). 2/1/4/5/6/6 per test; the last two items of the four big pools are training-only. Explanations give the current fact where the 2013 handbook is dated (the King, the Senedd, the IOPC). Built by `tools/global/uklitu/build.py`; sources in `tools/global/uklitu/sources.md`. Hub group "Citizenship and settlement tests".
```
