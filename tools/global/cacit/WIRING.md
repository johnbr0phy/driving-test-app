# Wiring for `cacit` (Canadian citizenship test, v1)

Files already written by the builder: `data/canadian-citizenship-questions.json` (200, PASS),
`lib/banks/cacit.ts`, `app/canadian-citizenship/*` (8 wrappers copied from `app/uk-food-hygiene/`),
`app/canadian-citizenship-test/page.tsx`, `tools/global/cacit/*` (spec, sources, `q_*.py`, `build.py`).
Everything below goes in shared files.

Shape: 8 tests of 20 (the real length, 15 of 20 to pass) plus 4 category training sets covering all
200 items, so the dashboard is 4 + 8 = 12 steps. No set exceeds `TRAINING_PART_MAX` (60), so no
`partNames`. 160 items appear in tests; the other 40 are training-only (pools are larger than
8 x per-test for every category except regions).

## lib/exams.ts

Add `"cacit"` to the `ExamId` union. Icon `flag` already exists.

Block (with the other Canada exams):

```ts
const cacit: ExamConfig = {
  id: "cacit",
  stateCode: "CACIT",
  idBase: 10200,
  slug: "/canadian-citizenship",
  landingPath: "/canadian-citizenship-test",
  name: "Canadian Citizenship Test Practice",
  shortName: "Citizenship (Canada)",
  examLabel: "Canadian citizenship test",
  fullName: "Canadian citizenship test (IRCC)",
  questionIdPrefix: "CACIT-",
  icon: "flag",
  testCount: 8,
  questionsPerTest: 20,
  passPct: 75,
  // IRCC citizenship test (checked October 2026): 20 multiple-choice or true/false questions in
  // 45 minutes, 15 of 20 to pass, every question from the study guide "Discover Canada: The Rights
  // and Responsibilities of Citizenship" (2009, rev. 2011, still current). IRCC publishes no
  // per-chapter weights, so counts follow the guide's chapters, heaviest on history and
  // government. Officeholders are not asked; every provincial and territorial capital is.
  // Facts the guide predates (343 ridings, CUSMA, G7) are taught as of 2026. All items original.
  blueprint: {
    cacitRights: 2,
    cacitPeople: 2,
    cacitHistory: 4,
    cacitModern: 1,
    cacitGov: 3,
    cacitElect: 2,
    cacitJustice: 1,
    cacitSymbols: 2,
    cacitEconomy: 1,
    cacitRegions: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 10201, name: "Rights & Who We Are", categories: ["cacitRights", "cacitPeople"], size: 40, weightLabel: "4 of 20 test questions" },
    { setNumber: 2, id: 10202, name: "Canada's History", categories: ["cacitHistory", "cacitModern"], size: 52, weightLabel: "5 of 20 test questions" },
    { setNumber: 3, id: 10203, name: "Government, Elections & Justice", categories: ["cacitGov", "cacitElect", "cacitJustice"], size: 60, weightLabel: "6 of 20 test questions" },
    { setNumber: 4, id: 10204, name: "Symbols, Economy & Regions", categories: ["cacitSymbols", "cacitEconomy", "cacitRegions"], size: 48, weightLabel: "5 of 20 test questions" },
  ],
  categoryLabels: {
    cacitRights: "Rights & Responsibilities",
    cacitPeople: "Who We Are",
    cacitHistory: "Canada's History",
    cacitModern: "Modern Canada",
    cacitGov: "How Canadians Govern Themselves",
    cacitElect: "Federal Elections",
    cacitJustice: "The Justice System",
    cacitSymbols: "Canadian Symbols",
    cacitEconomy: "Canada's Economy",
    cacitRegions: "Regions & Capitals",
  },
  copy: {
    guestPrompt: "to save your citizenship test progress and track every question you miss",
    trainingHeading: "Train by chapter of Discover Canada",
    trainingSub: "Four sets that together hold all 200 questions, chapter by chapter. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 20 questions, 15 to pass, like the real test",
    heroSubs: [
      "Four chapters to train, eight real-length tests.",
      "Master each set, then take the tests.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your citizenship test.",
    ],
    sourceLine: "Based on Discover Canada, IRCC's official study guide. Original questions; facts that changed since the guide was printed are updated to 2026.",
    analyticsKey: "cacit",
  },
};
```

Append `cacit` to the `EXAMS` array with the other Canada exams.

## lib/banks/all.ts

```ts
import "./cacit";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/cacit.ts`.

## types/index.ts

- `QuestionType`: add `| "CACIT"`.
- `QuestionCategory`, under a `// Canadian citizenship test` comment:

```ts
  | "cacitRights"
  | "cacitPeople"
  | "cacitHistory"
  | "cacitModern"
  | "cacitGov"
  | "cacitElect"
  | "cacitJustice"
  | "cacitSymbols"
  | "cacitEconomy"
  | "cacitRegions"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cacitRights: "Rights & Responsibilities",
    cacitPeople: "Who We Are",
    cacitHistory: "Canada's History",
    cacitModern: "Modern Canada",
    cacitGov: "How Canadians Govern Themselves",
    cacitElect: "Federal Elections",
    cacitJustice: "The Justice System",
    cacitSymbols: "Canadian Symbols",
    cacitEconomy: "Canada's Economy",
    cacitRegions: "Regions & Capitals",
```

## app/globals.css

Light block (suggested hue 350, a deep maple red; 356 is already used by another theme, so the
integrator may shift it); then run `tools/gen_dark_brand_css.py`.

```css
  /* Canadian citizenship test theme */
  [data-theme="cacit"] {
    --brand: 350 62% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 350 70% 96%;
    --brand-hover: 350 62% 32%;
    --brand-dark: 350 62% 28%;
    --brand-darker: 350 55% 18%;
    --brand-muted: 350 35% 72%;
    --brand-border: 350 35% 80%;
    --brand-border-light: 350 32% 89%;
    --brand-gradient-to: 10 60% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cacit: "20-question practice tests for the Canadian citizenship test, written from Discover Canada: rights, history, government, elections, symbols and every provincial capital.",`
- `EXAM_ORG`: `cacit: "IRCC · Discover Canada study guide",`
- Hub group, proposal: rename the US-only `{ title: "Citizenship", ids: ["civics"] }` group to
  `{ title: "Citizenship tests", ids: ["civics", "cacit"] }` and have `aucit` and `ukcitlitu`
  (the other two citizenship builders this wave) join it. One group reads better on /tests than
  three one-exam groups, and a newcomer searching "citizenship" sees every country together. If the
  integrator prefers country groups, the fallback is a new `{ title: "Canada citizenship", ids: ["cacit"] }`
  after the other Canada groups. Do not put it in "Canada school tests" or the trades groups.
- `SEARCH_ALIASES`:
  `cacit: "canadian citizenship test canada citizenship test practice discover canada ircc citizenship test 20 questions citizenship quiz oath canada citizenship exam questions provincial capitals new citizen",`
- `RELATED_OVERRIDES`: `cacit: ["civics", "capal", "caon"]` only if the citizenship group ends up
  with fewer than three others (Ontario G1 and PAL are what newcomers to Canada often also need).

## lib/region.ts

`cacit: "CA",` in `TEST_REGIONS`, and add `"cacit"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  cacit: {
    answer:
      "The Canadian citizenship test has 20 multiple-choice or true-or-false questions, and you have 45 minutes to answer them. You need 15 correct (75 percent) to pass. Every question comes from IRCC's study guide, Discover Canada: The Rights and Responsibilities of Citizenship. Applicants aged 18 to 54 take it, usually online, and get up to three chances to pass before a hearing with a citizenship official.",
    rows: [
      { label: "Questions", value: "20, multiple choice or true/false" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "15 of 20 (75%)" },
      { label: "Who takes it", value: "Applicants aged 18 to 54" },
      { label: "Attempts", value: "Up to 3, then a hearing" },
      { label: "Study guide", value: "Discover Canada (IRCC)" },
      { label: "Given by", value: "Immigration, Refugees and Citizenship Canada" },
    ],
    basedOn: "IRCC's citizenship test pages and the Discover Canada study guide, checked October 2026",
    source: { name: "IRCC: Study for the citizenship test", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test/study" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx

Add `"cacit"` to `TEACHER_LED` (settlement agencies and LINC programs run citizenship prep classes, like `civics`).

## components/exam/ExamClassFaq.tsx

In `TEACHES`: `cacit: "citizenship classes for newcomers",`. The landing already renders
`<ExamClassFaq examId="cacit" />` and `classFaqJsonLd("cacit")`.

## lib/tigerAssets.ts (optional)

Falls back to the DMV tiger. Mapping `cacit` to whatever `civics` uses is reasonable.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `flag` exists, sitemaps map over `EXAMS`, no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (all four sets are 60 or fewer, so no splits expected).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cacit:canadian-citizenship:10201`

## CLAUDE.md (under Additional Exams)

```md
- **Canadian Citizenship** (IRCC citizenship test, `/canadian-citizenship/*`, landing `/canadian-citizenship-test`): `data/canadian-citizenship-questions.json` (200 questions along Discover Canada: rights 20, who we are 20, history 40, modern Canada 12, government 28, elections 20, justice 12, symbols 20, economy 12, regions and capitals 16), test IDs 10201-10208 (eight real-length tests of 20, 15 to pass), sets 10201-10204 by chapter (4 + 8 = 12 dashboard steps; 40 items are training-only), state `CACIT`, 75% pass. 2/2/4/1/3/2/1/2/1/2 per test. Discover Canada (2011) is still the official guide as of 2026; items that changed since (343 ridings, CUSMA, G7) are taught as of 2026. No officeholders asked; every provincial and territorial capital is. Built by `tools/global/cacit/build.py`; sources in `tools/global/cacit/sources.md`.
```
