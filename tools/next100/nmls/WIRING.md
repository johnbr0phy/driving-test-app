# Wiring for `nmls` (NMLS SAFE Mortgage Loan Originator Test, US, v1)

Files already written by the builder: `data/nmls-questions.json` (200, PASS, key-longest 7%),
`lib/banks/nmls.ts`, `app/nmls/*` (layout, redirect, dashboard, drill, stats, copied from
`app/series-7/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/nmls-safe-practice-test/page.tsx`, `tools/next100/nmls/*` (spec, sources, `q_*.py`,
`build.py`, this file). Everything below goes in shared files.

Format note: the real SAFE MLO Test (National Test with Uniform State Content, specifications as of
April 5, 2021, still current on the NMLS Resource Center on 2026-11-02) is 120 questions, 115 scored
plus 5 unscored, in 190 minutes, 75% to pass. Here: four 50-question mock tests weighted to the
NMLS outline's 24/11/20/27/18, 5 training sets + 4 tests = 9 dashboard steps. Pass line
`ceil(0.75 * 50) = 38`. Pools are exactly 4x per-test counts, so no item repeats across tests.
Sets are content sets, so not interleaved: sets first, then tests.

## lib/exams.ts

Add `"nmls"` to the `ExamId` union. Icon `building` already exists (same as `sie`, `series7`).

```ts
const nmls: ExamConfig = {
  id: "nmls",
  stateCode: "NMLS",
  idBase: 15100,
  slug: "/nmls",
  landingPath: "/nmls-safe-practice-test",
  name: "NMLS SAFE Practice Test",
  shortName: "NMLS SAFE",
  examLabel: "SAFE MLO test",
  fullName: "NMLS SAFE Mortgage Loan Originator Test",
  questionIdPrefix: "NMLS-",
  icon: "building",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // NMLS "SAFE MLO National Test with Uniform State Test Content Outline" (NMLS Resource Center,
  // checked 2026-11-02; test specifications as of April 5, 2021): 120 items (115 scored), 190
  // minutes, 75% to pass. Federal Mortgage Related Laws 24%, Uniform State Content 11%, General
  // Mortgage Knowledge 20%, Mortgage Loan Origination Activities 27%, Ethics 18%, scaled to 50 by
  // largest remainder: federal 12 (Reg Z 4, RESPA/Reg X/TRID 4, ECOA and other federal 4), UST 6,
  // general 10 (programs 5, products 5), origination 13 (application 7, closing/calculations 6),
  // ethics 9. All items original; federal law as in force November 2026.
  blueprint: {
    nmlsTila: 4,
    nmlsRespa: 4,
    nmlsFederal: 4,
    nmlsState: 6,
    nmlsPrograms: 5,
    nmlsProducts: 5,
    nmlsApplication: 7,
    nmlsClosing: 6,
    nmlsEthics: 9,
  },
  trainingSets: [
    { setNumber: 1, id: 15101, name: "TILA, RESPA & TRID", categories: ["nmlsTila", "nmlsRespa"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 15102, name: "Other Federal Laws & State Licensing", categories: ["nmlsFederal", "nmlsState"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 15103, name: "Mortgage Programs & Products", categories: ["nmlsPrograms", "nmlsProducts"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 15104, name: "Origination, Closing & Calculations", categories: ["nmlsApplication", "nmlsClosing"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 5, id: 15105, name: "Ethics, Fraud & Fair Lending", categories: ["nmlsEthics"], size: 36, weightLabel: "9 of 50 test questions" },
  ],
  categoryLabels: {
    nmlsTila: "TILA & Regulation Z",
    nmlsRespa: "RESPA, Regulation X & TRID",
    nmlsFederal: "ECOA & Other Federal Laws",
    nmlsState: "Uniform State Content & SAFE Act",
    nmlsPrograms: "Mortgage Programs",
    nmlsProducts: "Mortgage Products & Terms",
    nmlsApplication: "Application & Qualification",
    nmlsClosing: "Closing & Calculations",
    nmlsEthics: "Ethics, Fraud & Fair Lending",
  },
  copy: {
    guestPrompt: "to save your NMLS progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets covering all five areas of the NMLS content outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions weighted like the real SAFE MLO test, 75% to pass",
    heroSubs: [
      "Five sets, four mock tests. Origination and federal law weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Schedule your SAFE MLO test.",
    ],
    sourceLine: "Based on the NMLS SAFE MLO content outline. Original questions; 50 per test, weighted like the real 120-question test, 75% to pass. Not affiliated with NMLS.",
    analyticsKey: "nmls",
  },
};
```

Append `nmls` to the `EXAMS` array right after `series7`.

Check: 15101-15104 (tests) and 15101-15105 (sets) must be free (batch A assigns 15100).

## lib/banks/all.ts

```ts
import "./nmls";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/nmls.ts`.

## types/index.ts

- `QuestionType`: add `| "NMLS"`.
- `QuestionCategory`, under a `// NMLS SAFE MLO` comment:

```ts
  | "nmlsTila"
  | "nmlsRespa"
  | "nmlsFederal"
  | "nmlsState"
  | "nmlsPrograms"
  | "nmlsProducts"
  | "nmlsApplication"
  | "nmlsClosing"
  | "nmlsEthics"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nmlsTila: "TILA & Regulation Z",
    nmlsRespa: "RESPA, Regulation X & TRID",
    nmlsFederal: "ECOA & Other Federal Laws",
    nmlsState: "Uniform State Content & SAFE Act",
    nmlsPrograms: "Mortgage Programs",
    nmlsProducts: "Mortgage Products & Terms",
    nmlsApplication: "Application & Qualification",
    nmlsClosing: "Closing & Calculations",
    nmlsEthics: "Ethics, Fraud & Fair Lending",
```

## app/globals.css

Hue from the batch A table (45 55% 42%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* NMLS SAFE MLO theme */
  [data-theme="nmls"] {
    --brand: 45 55% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 45 55% 96%;
    --brand-hover: 45 55% 37%;
    --brand-dark: 45 55% 32%;
    --brand-darker: 45 50% 20%;
    --brand-muted: 45 30% 70%;
    --brand-border: 45 30% 80%;
    --brand-border-light: 45 28% 89%;
    --brand-gradient-to: 205 60% 95%;
  }
```

Contrast flag: white on 45 55% 42% measures about 3.4:1 (WCAG relative luminance), under the
4.5:1 rule; 36% gives 4.4:1 and 34% gives 4.9:1. Suggest `--brand: 45 55% 34%` with hover 30%,
dark 26%, darker 17%, if the integrator agrees (the batch table said the hue was pre-checked).

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nmls: "NMLS SAFE MLO practice on the current content outline: TILA and TRID timing, RESPA, ECOA and other federal laws, the SAFE Act and Uniform State Content, loan programs, qualifying and closing math, and ethics and fraud, every answer explained.",`
- `EXAM_ORG`: `nmls: "NMLS · Mortgage Loan Originator",`
- Hub group: the securities/insurance licensing group (as `series7` WIRING named it,
  `"Real estate, insurance, securities & notary licenses"`), add `"nmls"` after `"realestate"`;
  if the integrator renames it for batch A (for example "...securities, mortgage & notary licenses"),
  use that.
- `SEARCH_ALIASES`:
  `nmls: "nmls safe mlo mortgage loan originator license test exam uniform state test ust national test loan officer mortgage broker safe act trid respa tila mortgage license",`
- `RELATED_OVERRIDES` (optional): `nmls: ["realestate", "insurance", "series7"],`

## lib/region.ts

US exam: no `TEST_REGIONS` entry. Add `"nmls"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  nmls: {
    answer:
      "The NMLS SAFE Mortgage Loan Originator Test is the National Test with Uniform State Content that every state uses to license mortgage loan originators under the federal SAFE Act. It has 120 multiple-choice questions, 115 scored and 5 unscored, in 190 minutes, and you need 75% or better to pass. It covers federal mortgage laws (24%), Uniform State Content (11%), general mortgage knowledge (20%), loan origination activities (27%) and ethics (18%), and is taken at a Prometric test center or online with remote proctoring.",
    rows: [
      { label: "Questions", value: "120 (115 scored, 5 unscored)" },
      { label: "Time", value: "190 minutes" },
      { label: "Passing score", value: "75%" },
      { label: "Largest area", value: "Loan origination activities, 27%" },
      { label: "Where", value: "Prometric test center or online" },
      { label: "Run by", value: "NMLS, delivered by Prometric" },
    ],
    basedOn: "NMLS SAFE MLO Test Handbook and content outline, checked November 2026",
    source: { name: "NMLS: SAFE MLO Test", url: "https://mortgage.nationwidelicensingsystem.org/knowledge/Products/nmls/pubs/testingHbk/education/mlo_testing/mlo_test_guide/mlo_testing_hbk_intro.html" },
  },
```
(Fee deliberately left out; NMLS lists one on the same page.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing: self-study for pre-licensing students (the template sets none).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing: sitemaps map over `EXAMS`, no redirects, `building` icon exists, tiger falls back to the
DMV one (optionally borrow the `series7`/`realestate` set through `BORROWED_SETS`).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 52).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nmls:nmls:15101`

## CLAUDE.md (under Additional Exams, after the Series 7 bullet)

```md
- **NMLS SAFE** (SAFE Mortgage Loan Originator Test, National Test with Uniform State Content, `/nmls/*`, landing `/nmls-safe-practice-test`): `data/nmls-questions.json` (200 questions on the NMLS content outline, 24/11/20/27/18: Regulation Z 16, RESPA/Reg X/TRID 16, ECOA and other federal laws 16, Uniform State Content and SAFE Act 24, programs 20, products and terms 20, application and qualification 28, closing and calculations 24, ethics/fraud/fair lending 36), a shorter mock of the real 120 (115 scored) in 190 minutes: test IDs 15101-15104 (50 questions each), sets 15101-15105, state `NMLS`, prefix `NMLS-`, 75% pass. 4/4/4/6/5/5/7/6/9 per test. Federal law as of Nov 2026, including the Homebuyers Privacy Protection Act trigger-lead limits (March 2026); no indexed dollar thresholds, fees or state-specific rules. Built by `tools/next100/nmls/build.py`; sources in `tools/next100/nmls/sources.md`.
```
