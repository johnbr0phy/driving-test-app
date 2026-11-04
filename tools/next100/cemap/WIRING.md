# Wiring for `cemap` (CeMAP Module 1, LIBF FSRE, UK, v1)

Files already written by the builder: `data/cemap-questions.json` (200, PASS), `lib/banks/cemap.ts`,
`app/cemap/*` (5 wrappers copied from `app/aat-level-2/`: layout, redirect, dashboard, drill, stats),
`app/cemap-1-practice-test/page.tsx`, `tools/next100/cemap/*` (spec, sources, `q_*.py`, `build.py`).
Everything below goes in shared files.

Format note: "CeMAP 1" is now LIBF's Level 4 Financial Services, Regulation and Ethics (FSRE)
module, which replaced UK Financial Regulation (UKFR) from 30 September 2025 (UKFR withdrawn
16 July 2026). LIBF is part of Walbrook Institute London. Two units, FRE1 (Industry, Regulation and
Key Parties) and FRE2 (Skills, Principles and Ethical Behaviours), each a 1-hour remotely
invigilated online exam on Brightspace: 25 standalone MCQs plus 3 case studies of 5 linked MCQs,
one answer from four, 40 marks, 70% (28/40) to pass each unit, merit 80%, distinction 90%. Here:
five 40-question mock tests (one real unit's length, 20 FRE1 + 20 FRE2, LIBF publishes no topic
weights), 5 topic training sets + 5 tests = 10 dashboard steps, 70% pass line. Case studies are
self-contained "Case:" stems. The name keeps "CeMAP 1" because that is what candidates search;
the config and copy say FSRE.

## lib/exams.ts

Add `"cemap"` to the `ExamId` union. Icon `house` already exists.

```ts
const cemap: ExamConfig = {
  id: "cemap",
  stateCode: "CEMAP",
  idBase: 17800,
  slug: "/cemap",
  landingPath: "/cemap-1-practice-test",
  name: "CeMAP 1 Practice Test",
  shortName: "CeMAP 1",
  examLabel: "CeMAP Module 1 (FSRE)",
  fullName: "CeMAP Module 1: Financial Services, Regulation and Ethics (FSRE)",
  questionIdPrefix: "CEMAP-",
  icon: "house",
  testCount: 5,
  questionsPerTest: 40,
  passPct: 70,
  // LIBF (Walbrook Institute London) Level 4 FSRE qualification specification v7, July 2026
  // (checked Nov 2026): CeMAP Module 1 since 30 Sept 2025, replacing UKFR. Units FRE1 and FRE2,
  // each a 1-hour exam of 25 standalone MCQs + 3 case studies x 5 linked MCQs = 40 marks, 70% to
  // pass each unit. No published weights per learning outcome, so each 40-question mock is 20 FRE1
  // (LO1-LO5) and 20 FRE2 (LO6-LO8), split by the breadth of each LO (Tigertest's split).
  // ceil(0.7 x 40) = 28, the real unit pass mark. All items original.
  blueprint: {
    cemapMarkets: 4,
    cemapConsumer: 3,
    cemapLaw: 5,
    cemapRegHistory: 3,
    cemapFca: 5,
    cemapAdvice: 4,
    cemapConduct: 4,
    cemapCompliance: 5,
    cemapClients: 4,
    cemapEthics: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 17801, name: "Financial Markets & Consumers", categories: ["cemapMarkets", "cemapConsumer"], size: 35, weightLabel: "7 of 40 test questions" },
    { setNumber: 2, id: 17802, name: "Law, Wills & Trusts", categories: ["cemapLaw"], size: 25, weightLabel: "5 of 40 test questions" },
    { setNumber: 3, id: 17803, name: "Regulation, the FCA & the PRA", categories: ["cemapRegHistory", "cemapFca"], size: 40, weightLabel: "8 of 40 test questions" },
    { setNumber: 4, id: 17804, name: "Advice, Clients & Conduct", categories: ["cemapAdvice", "cemapConduct", "cemapClients"], size: 60, weightLabel: "12 of 40 test questions" },
    { setNumber: 5, id: 17805, name: "Compliance & Ethics", categories: ["cemapCompliance", "cemapEthics"], size: 40, weightLabel: "8 of 40 test questions" },
  ],
  categoryLabels: {
    cemapMarkets: "Financial Markets & the Economy",
    cemapConsumer: "Consumer Needs & Products",
    cemapLaw: "Law, Wills & Trusts",
    cemapRegHistory: "How UK Regulation Developed",
    cemapFca: "The FCA, PRA & the Handbook",
    cemapAdvice: "Advice Skills & the Fact Find",
    cemapConduct: "Principles, Consumer Duty & Conduct",
    cemapCompliance: "AML, Data, Complaints & Redress",
    cemapClients: "Clients, Disclosure & Advice Standards",
    cemapEthics: "Ethics & Professionalism",
  },
  copy: {
    guestPrompt: "to save your CeMAP 1 progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets covering both FSRE units, FRE1 and FRE2. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 40 questions like one real unit, 70% to pass",
    heroSubs: [
      "Five sets, five mock tests. Start with markets.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Sit FRE1 and FRE2.",
    ],
    sourceLine: "Based on LIBF's FSRE (CeMAP Module 1) syllabus for FRE1 and FRE2. Original questions; case studies written as single questions. Not affiliated with LIBF or Walbrook Institute London.",
    analyticsKey: "cemap",
  },
};
```

Append `cemap` to the `EXAMS` array with the other UK exams (after `aatl2`).

Check: 17801-17805 (tests and sets) are free (batch C table assigns 17800; llqp is 17700).
The largest set is 60 (set 4), at the limit but not over `TRAINING_PART_MAX`.

## lib/banks/all.ts

```ts
import "./cemap";
```

## types/index.ts

- `QuestionType`: add `| "CEMAP"`.
- `QuestionCategory`, under a `// CeMAP Module 1, LIBF FSRE (UK)` comment:

```ts
  | "cemapMarkets"
  | "cemapConsumer"
  | "cemapLaw"
  | "cemapRegHistory"
  | "cemapFca"
  | "cemapAdvice"
  | "cemapConduct"
  | "cemapCompliance"
  | "cemapClients"
  | "cemapEthics"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cemapMarkets: "Financial Markets & the Economy",
    cemapConsumer: "Consumer Needs & Products",
    cemapLaw: "Law, Wills & Trusts",
    cemapRegHistory: "How UK Regulation Developed",
    cemapFca: "The FCA, PRA & the Handbook",
    cemapAdvice: "Advice Skills & the Fact Find",
    cemapConduct: "Principles, Consumer Duty & Conduct",
    cemapCompliance: "AML, Data, Complaints & Redress",
    cemapClients: "Clients, Disclosure & Advice Standards",
    cemapEthics: "Ethics & Professionalism",
```

## app/globals.css

Hue from the batch C table (already checked): 203 30% 26%. Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* CeMAP Module 1 (LIBF FSRE) theme (UK) */
  [data-theme="cemap"] {
    --brand: 203 30% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 203 35% 96%;
    --brand-hover: 203 30% 21%;
    --brand-dark: 203 30% 19%;
    --brand-darker: 203 28% 12%;
    --brand-muted: 203 15% 70%;
    --brand-border: 203 15% 80%;
    --brand-border-light: 203 14% 89%;
    --brand-gradient-to: 45 60% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cemap: "CeMAP Module 1 (FSRE) practice across FRE1 and FRE2: financial markets and the Bank of England, law, wills and trusts, the FCA, PRA and Handbook, the Consumer Duty, anti-money laundering, data protection, complaints and redress, client relationships and ethics.",`
- `EXAM_ORG`: `cemap: "LIBF (Walbrook Institute London) · CeMAP Module 1, FSRE units FRE1 and FRE2",`
- Hub group: add to "Real estate, insurance, securities & notary licenses" next to `nmls`, the other
  mortgage adviser exam:
  `{ title: "Real estate, insurance, securities & notary licenses", ids: ["realestate", "nmls", "cemap", "insurance", "pnc", "txadjuster", "sie", "series7", "series63", "series65", "notary"] },`
  With region UK the catalog puts it first for UK visitors. If llqp joins the same group (Canada),
  the group mixes countries the same way "Citizenship tests" does. "UK workplace and trade
  certificates" also fits if the integrator prefers it with the UK groups.
- `RELATED_OVERRIDES`: `cemap: ["aatl2", "nmls", "ukaplh"],`
- `SEARCH_ALIASES`:
  `cemap: "cemap cemap 1 cemap module 1 cemap1 fsre fre1 fre2 financial services regulation and ethics ukfr uk financial regulation libf london institute of banking and finance walbrook mortgage adviser exam mortgage advice qualification certificate in mortgage advice and practice fca consumer duty licence to practise",`

## lib/region.ts

`cemap: "UK",` in `TEST_REGIONS`, and add `"cemap"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  cemap: {
    answer:
      "CeMAP Module 1 is the first part of the LIBF Certificate in Mortgage Advice and Practice, the qualification that meets the FCA's education standard for mortgage advisers in the UK. Since 30 September 2025 it is the Financial Services, Regulation and Ethics (FSRE) module, which replaced UK Financial Regulation (UKFR). It has two units, FRE1 (Industry, Regulation and Key Parties) and FRE2 (Skills, Principles and Ethical Behaviours). Each is a one-hour online exam with remote invigilation: 25 multiple-choice questions and 3 case studies with 5 linked questions, 40 marks in all, and 70% (28 of 40) is needed to pass each unit.",
    rows: [
      { label: "Units", value: "2: FRE1 and FRE2 (the FSRE module)" },
      { label: "Questions per unit", value: "25 MCQs + 3 case studies of 5 = 40" },
      { label: "Time", value: "1 hour per unit" },
      { label: "Pass mark", value: "70% (28 of 40) on each unit" },
      { label: "Higher passes", value: "Merit 80%, distinction 90%" },
      { label: "Format", value: "Online, remote invigilation, no booking" },
      { label: "Replaced", value: "UKFR, from 30 September 2025" },
      { label: "Run by", value: "LIBF, part of Walbrook Institute London" },
    ],
    basedOn: "LIBF's FSRE qualification specification (version 7, July 2026) and CeMAP qualification specification (April 2026), checked November 2026",
    source: { name: "Walbrook (LIBF): Financial Services, Regulation and Ethics", url: "https://www.walbrook.ac.uk/libf/professional-qualifications/financial-and-mortgage-advice/financial-services-regulation-and-ethics-fsre/" },
  },
```
(Fees left out of every Tigertest page.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx

Add `"cemap"` to `TEACHER_LED`: mortgage adviser academies at lenders and brokers, and training
providers, run CeMAP study groups. Drop it if the integrator treats CeMAP as self-study only (LIBF
sells it as distance learning).

## components/exam/ExamClassFaq.tsx

In `TEACHES`: `cemap: "a CeMAP mortgage adviser course",`
(reads "I teach a CeMAP mortgage adviser course. Can my students use Tigertest?"). The landing
already renders `<ExamClassFaq examId="cemap" />` and `classFaqJsonLd("cemap")`.

## lib/tigerAssets.ts

In `BORROWED_SETS`: `cemap: "nmls",` (the other mortgage adviser exam).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing: sitemaps map over `EXAMS`, no redirects, `house` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest exactly 60).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cemap:cemap:17801`

## CLAUDE.md (under Additional Exams, after the AAT Level 2 bullet)

```md
- **CeMAP 1** (LIBF Certificate in Mortgage Advice and Practice, Module 1: Financial Services, Regulation and Ethics (FSRE), which replaced UKFR from 30 September 2025, UK, `/cemap/*`, landing `/cemap-1-practice-test`): `data/cemap-questions.json` (200 original questions on LIBF's FSRE specification v7, July 2026: FRE1 as financial markets and the economy 20, consumer needs and products 15, law, wills and trusts 25, how UK regulation developed 15, the FCA, PRA and Handbook 25; FRE2 as advice skills 20, the Principles, Consumer Duty and conduct 20, AML, data, complaints and redress 25, clients, disclosure and advice standards 20, ethics 15), five tests of 40 (test IDs 17801-17805, one real unit's length, 20 FRE1 + 20 FRE2), sets 17801-17805 (by topic), state `CEMAP`, prefix `CEMAP-`, 70% pass (28 of 40, LIBF's mark on each unit). 4/3/5/3/5/4/4/5/4/3 per test (LIBF publishes no weights; Tigertest's split). The real units are each a 1-hour remotely invigilated exam of 25 MCQs and 3 case studies of 5 linked MCQs; case studies are written as self-contained "Case:" stems. UK law and FCA rules as in force Nov 2026 (Consumer Duty, MCOB, DISP, MLR 2017, UK GDPR); England and Wales where the law differs; no money figures. Built by `tools/next100/cemap/build.py`; sources in `tools/next100/cemap/sources.md`. Region UK, hub group "Real estate, insurance, securities & notary licenses", `[data-theme="cemap"]` dark steel blue (203 30% 26%), borrows the NMLS tiger, teacher-led (adviser academies and training providers).
```
