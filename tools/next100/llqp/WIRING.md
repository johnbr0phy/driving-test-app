# Wiring for `llqp` (Life Licence Qualification Program exam, Canada, v1, region CA)

Files already written by the builder: `data/llqp-questions.json` (200, PASS, key-longest 6%),
`lib/banks/llqp.ts`, `app/llqp/*` (layout, redirect, dashboard, drill, stats, copied from
`app/texas-adjuster/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/llqp-practice-test/page.tsx`, `tools/next100/llqp/*` (spec, sources, `q_*.py`, `build.py`,
this file). Everything below goes in shared files.

Format note: the real LLQP is four modules written separately (Insurance Council of BC): Life
Insurance, Accident and Sickness Insurance, and Segregated Funds and Annuities have 35 questions
scored out of 30; Ethics and Professional Practice (Common Law, or Civil Code in Quebec) has 25
scored out of 20; five unscored pilot questions in each; 75 minutes per module; four options;
60% to pass each module (Service NL memo). Here: four 50-question mixed mock tests weighted by the
modules' scored questions (30/30/30/20 -> 14/13/13/10), one training set per module, so 4 sets +
4 tests = 8 dashboard steps. Pass line 60%. Pools are exactly 4x per-test counts. Content sets,
so sets first, then tests.

## lib/exams.ts

Add `"llqp"` to the `ExamId` union. Icon `umbrella` already exists.

```ts
const llqp: ExamConfig = {
  id: "llqp",
  stateCode: "LLQP",
  idBase: 17700,
  slug: "/llqp",
  landingPath: "/llqp-practice-test",
  name: "LLQP Practice Test",
  shortName: "LLQP",
  examLabel: "LLQP exam",
  fullName: "Life Licence Qualification Program (LLQP) exam",
  questionIdPrefix: "LLQP-",
  icon: "umbrella",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  // Harmonized LLQP (CISRO curriculum), four modules written separately: Life Insurance,
  // Accident and Sickness Insurance, Segregated Funds and Annuities (35 questions, 30 scored each),
  // Ethics and Professional Practice (25 questions, 20 scored), 75 minutes each, 60% per module
  // (Insurance Council of BC; Service NL). Mixed mock tests weighted 30/30/30/20 scaled to 50:
  // Life 14 = products 5, contracts 4, tax/estate/business 5; A&S 13 = disability 5,
  // CI/LTC/health 4, group/government/tax 4; Seg funds and annuities 13 = seg funds 6,
  // annuities/registered plans 4, investing 3; Ethics 10 = regulation/law 4, conduct 6.
  // All items original; Canadian law and CCIR/CISRO guidance as of November 2026.
  blueprint: {
    llqpLifeProducts: 5,
    llqpLifeContract: 4,
    llqpLifeTax: 5,
    llqpDisability: 5,
    llqpHealth: 4,
    llqpGroupGov: 4,
    llqpSegFunds: 6,
    llqpAnnuities: 4,
    llqpInvesting: 3,
    llqpRegulation: 4,
    llqpConduct: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 17701, name: "Life Insurance", categories: ["llqpLifeProducts", "llqpLifeContract", "llqpLifeTax"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 2, id: 17702, name: "Accident & Sickness Insurance", categories: ["llqpDisability", "llqpHealth", "llqpGroupGov"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 3, id: 17703, name: "Segregated Funds & Annuities", categories: ["llqpSegFunds", "llqpAnnuities", "llqpInvesting"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 4, id: 17704, name: "Ethics & Professional Practice", categories: ["llqpRegulation", "llqpConduct"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    llqpLifeProducts: "Life Insurance Products & Riders",
    llqpLifeContract: "Life Contracts, Underwriting & Beneficiaries",
    llqpLifeTax: "Life Taxation, Needs, Estate & Business",
    llqpDisability: "Disability Insurance",
    llqpHealth: "Critical Illness, Long-Term Care & Health",
    llqpGroupGov: "Group Benefits, Government Plans & Tax",
    llqpSegFunds: "Segregated Funds",
    llqpAnnuities: "Annuities & Registered Plans",
    llqpInvesting: "Investment Basics",
    llqpRegulation: "Regulation, Law & Compliance",
    llqpConduct: "Professional Conduct & Fair Treatment",
  },
  copy: {
    guestPrompt: "to save your LLQP progress and track every question you miss",
    trainingHeading: "Train by module",
    trainingSub: "One set for each LLQP module: life, accident and sickness, segregated funds and annuities, and ethics. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across all four modules, 60% to pass",
    heroSubs: [
      "Four modules, four mock tests. Each real module is passed on its own.",
      "Master each module's set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your LLQP modules.",
    ],
    sourceLine: "Based on the harmonized LLQP's four modules, Canadian law and CCIR/CISRO guidance as of November 2026. Original questions; 50 per test, mixing the modules in proportion. Not affiliated with CISRO, any provincial regulator or the AMF.",
    analyticsKey: "llqp",
  },
};
```

Append `llqp` to the `EXAMS` array right after `txadjuster` (or after the last batch C insurance exam).

Check: 17701-17704 (tests and sets) must be free (batch C assigns 17700).

## lib/banks/all.ts

```ts
import "./llqp";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/llqp.ts`.

## types/index.ts

- `QuestionType`: add `| "LLQP"`.
- `QuestionCategory`, under a `// LLQP (Canada life licence)` comment:

```ts
  | "llqpLifeProducts"
  | "llqpLifeContract"
  | "llqpLifeTax"
  | "llqpDisability"
  | "llqpHealth"
  | "llqpGroupGov"
  | "llqpSegFunds"
  | "llqpAnnuities"
  | "llqpInvesting"
  | "llqpRegulation"
  | "llqpConduct"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    llqpLifeProducts: "Life Insurance Products & Riders",
    llqpLifeContract: "Life Contracts, Underwriting & Beneficiaries",
    llqpLifeTax: "Life Taxation, Needs, Estate & Business",
    llqpDisability: "Disability Insurance",
    llqpHealth: "Critical Illness, Long-Term Care & Health",
    llqpGroupGov: "Group Benefits, Government Plans & Tax",
    llqpSegFunds: "Segregated Funds",
    llqpAnnuities: "Annuities & Registered Plans",
    llqpInvesting: "Investment Basics",
    llqpRegulation: "Regulation, Law & Compliance",
    llqpConduct: "Professional Conduct & Fair Treatment",
```

## app/globals.css

Hue from the batch C table (5 45% 28%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* LLQP (Canada life licence) theme */
  [data-theme="llqp"] {
    --brand: 5 45% 28%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 5 45% 96%;
    --brand-hover: 5 45% 23%;
    --brand-dark: 5 45% 21%;
    --brand-darker: 5 40% 14%;
    --brand-muted: 5 20% 70%;
    --brand-border: 5 20% 80%;
    --brand-border-light: 5 18% 89%;
    --brand-gradient-to: 0 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `llqp: "LLQP practice for a Canadian life licence: life insurance and its taxation, disability, critical illness and group benefits, segregated funds, annuities and registered plans, and ethics, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `llqp: "CISRO · provincial and territorial insurance regulators",`
- Hub group: no Canadian finance or insurance group exists. Suggested: a new group
  `{ title: "Canada insurance licences", ids: ["llqp"] }` right after
  "Canada trades and workplace certificates" (the integrator may prefer adding `"llqp"` to
  "Real estate, insurance, securities & notary licenses" after `"insurance"`).
- `SEARCH_ALIASES`:
  `llqp: "llqp life licence qualification program life license canada life insurance agent exam canadian insurance licence segregated funds seg funds accident and sickness a&s ethics module cisro fsra insurance council of bc alberta insurance council amf quebec harmonized llqp",`
- `RELATED_OVERRIDES`: `llqp: ["insurance", "cfal1", "capal"],` (a one-exam group needs padding;
  `insurance` is the US life and health exam).

## lib/region.ts

`llqp: "CA",` in `TEST_REGIONS`, and add `"llqp"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  llqp: {
    answer:
      "The Life Licence Qualification Program (LLQP) is the harmonized exam that Canada's provincial and territorial insurance regulators require before licensing a life insurance agent; CISRO oversees the curriculum. It is written as four separate modules: Life Insurance, Accident and Sickness Insurance, and Segregated Funds and Annuities, each with 35 multiple-choice questions scored out of 30, and Ethics and Professional Practice, with 25 questions scored out of 20 (Common Law, or Civil Code in Quebec). Each module includes five unscored pilot questions, allows 75 minutes, and must be passed with 60% on its own.",
    rows: [
      { label: "Modules", value: "Life; Accident and Sickness; Segregated Funds and Annuities; Ethics" },
      { label: "Questions", value: "35 per module (30 scored); Ethics 25 (20 scored)" },
      { label: "Time", value: "75 minutes per module" },
      { label: "Pass mark", value: "60% on each module" },
      { label: "Format", value: "Multiple choice, four options" },
      { label: "Run by", value: "Provincial and territorial insurance regulators (AMF in Quebec)" },
    ],
    basedOn: "Insurance Council of British Columbia LLQP exam page and Service NL LLQP memo, checked November 2026",
    source: { name: "Insurance Council of BC: Taking the LLQP exam", url: "https://www.insurancecouncilofbc.com/llqp/exam-information-and-registration/about-the-exam/in-person-exams/" },
  },
```
(Fees, pass windows and module sequencing vary by province and are left out.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing: the template sets none. (LLQP course providers teach it; an optional
`llqp: "LLQP courses"` TEACHES line is reasonable if the integrator wants it.)

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing required: sitemaps map over `EXAMS`, no redirects, `umbrella` icon exists, tiger falls back
to the DMV one. Optionally borrow the `insurance` set through `BORROWED_SETS` (`llqp: "insurance"`).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 56).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing llqp:llqp:17701`

## CLAUDE.md (under Additional Exams, after the Texas All-Lines Adjuster bullet)

```md
- **LLQP** (Canada's Life Licence Qualification Program exam, harmonized curriculum overseen by CISRO, `/llqp/*`, landing `/llqp-practice-test`): `data/llqp-questions.json` (200 original questions across the four modules: Life Insurance as products and riders 20, contracts, underwriting and beneficiaries 16, taxation, needs, estate and business 20; Accident and Sickness as disability 20, critical illness, long-term care and health 16, group benefits, government plans and tax 16; Segregated Funds and Annuities as seg funds 24, annuities and registered plans 16, investment basics 12; Ethics and Professional Practice as regulation, law and compliance 16, conduct and fair treatment 24), test IDs 17701-17704 (50 questions each, mixing the modules 14/13/13/10 by their scored counts), sets 17701-17704 (one per module), state `LLQP`, prefix `LLQP-`, 60% pass like each real module. 5/4/5/5/4/4/6/4/3/4/6 per test. The real exam is four separate modules (35 questions, 30 scored; Ethics 25, 20 scored; 75 minutes each; 60% per module). Canadian law: provincial Insurance Acts, the Income Tax Act, CCIR/CISRO Fair Treatment of Customers and the November 2025 Segregated Funds Guidance; Quebec differences stated as "In Quebec" or "varies in Quebec"; no yearly limits or fees. Kept clear of `data/life-health-questions.json`. Built by `tools/next100/llqp/build.py`; sources in `tools/next100/llqp/sources.md`. Region CA, hub group "Canada insurance licences", `[data-theme="llqp"]` deep brick (5 45% 28%), borrows the life and health insurance tiger.
```
