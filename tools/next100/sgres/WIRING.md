# Wiring for `sgres` (Singapore Real Estate Salesperson (RES) exam, v1, region SG)

Files already written by the builder: `data/singapore-res-questions.json` (200, PASS, key-longest
18%), `lib/banks/sgres.ts`, `app/singapore-res/*` (layout, redirect, dashboard, drill, stats,
copied from `app/llqp/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/singapore-res-exam-practice-test/page.tsx`, `tools/next100/sgres/*` (spec, sources, `q_*.py`,
`build.py`, this file). Everything below goes in shared files.

Format note: the real RES exam (CEA) is two papers sat separately, Paper 1 (Units 1 and 2: market,
basic land law, dealings with interests in land) and Paper 2 (Units 3 and 4: regulation, ethics,
PMLPFTF, marketing, property transactions). Each paper: Section A 60 MCQs at 1 mark, Section B 20
case-study MCQs at 2 marks, 100 marks, 2.5 hours, passing mark 60 (subject to CEA review). The
revised syllabus applies to exams from 1 January 2027 (format unchanged). Here: four 50-question
mock tests, 25 from each paper, weighted inside each paper by the syllabus's recommended training
hours (Unit 1 11 h, Unit 2 23 h, Unit 3 24 h, Unit 4 15 h -> 9/16/15/10 per test). Five content
sets + 4 tests = 9 dashboard steps. Pass line 60%. Pools are exactly 4x per-test counts. Content
sets, so sets first, then tests. Case studies are not modelled as shared passages; some stems are
short scenarios.

## lib/exams.ts

Add `"sgres"` to the `ExamId` union. Icon `house` already exists (used by `realestate`).

```ts
const sgres: ExamConfig = {
  id: "sgres",
  stateCode: "SGRES",
  idBase: 18000,
  slug: "/singapore-res",
  landingPath: "/singapore-res-exam-practice-test",
  name: "Singapore RES Exam Practice Test",
  shortName: "RES Exam",
  examLabel: "RES exam",
  fullName: "Singapore Real Estate Salesperson (RES) Examination",
  questionIdPrefix: "SGRES-",
  icon: "house",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  // CEA RES Examination Syllabus 2027 (exams from 1 January 2027). Real exam: Paper 1 (Units 1-2)
  // and Paper 2 (Units 3-4), each 60 MCQs + 20 case-study MCQs, 100 marks, 2.5 hours, pass mark 60.
  // Mock tests mix both papers 25/25, split inside each paper by the syllabus's recommended
  // training hours: Unit 1 = market 3, land law and titles 6; Unit 2 = contract and torts 6,
  // agency and landlord-tenant 5, interests, capacity and planning 5; Unit 3 = regulation and
  // ethics 6, PMLPFTF 3, marketing 6; Unit 4 = private sales and leasing 4, HDB 3, tax and finance 3.
  // All items original; Singapore law and CEA, HDB, URA, SLA and IRAS rules as of November 2026,
  // with no rates, loan limits or other figures that change often.
  blueprint: {
    sgresMarket: 3,
    sgresLandLaw: 6,
    sgresContract: 6,
    sgresAgencyLease: 5,
    sgresInterests: 5,
    sgresRegulation: 6,
    sgresAml: 3,
    sgresMarketing: 6,
    sgresPrivateSale: 4,
    sgresHdb: 3,
    sgresTaxFinance: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 18001, name: "Real Estate Market & Land Law", categories: ["sgresMarket", "sgresLandLaw", "sgresInterests"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 2, id: 18002, name: "Contract, Torts, Agency & Leases", categories: ["sgresContract", "sgresAgencyLease"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 18003, name: "Regulation, Ethics & AML", categories: ["sgresRegulation", "sgresAml"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 4, id: 18004, name: "Marketing & Private Property Sales", categories: ["sgresMarketing", "sgresPrivateSale"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 18005, name: "HDB, Taxes & Property Finance", categories: ["sgresHdb", "sgresTaxFinance"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    sgresMarket: "Real Estate Market & Players",
    sgresLandLaw: "Land Law, Estates & Titles",
    sgresContract: "Contract Law & Property Torts",
    sgresAgencyLease: "Law of Agency & Landlord and Tenant",
    sgresInterests: "Interests in Land, Capacity & Planning",
    sgresRegulation: "Agency Regulation, Ethics & Conduct",
    sgresAml: "Anti-Money Laundering (PMLPFTF)",
    sgresMarketing: "Real Estate Marketing & Advertising",
    sgresPrivateSale: "Private Property Sales & Leasing",
    sgresHdb: "HDB Sale & Rental",
    sgresTaxFinance: "Property Taxes & Finance",
  },
  copy: {
    guestPrompt: "to save your RES exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets across both papers: market and land law, contract and agency law, regulation and anti-money laundering, marketing and private sales, and HDB, taxes and finance. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across Paper 1 and Paper 2, 60% to pass",
    heroSubs: [
      "Two papers, four mock tests. Each real paper is passed on its own.",
      "Master each topic set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your RES exam.",
    ],
    sourceLine: "Based on CEA's RES Examination Syllabus for exams from January 2027 and Singapore law and HDB, URA, SLA and IRAS rules as of November 2026. Original questions; 50 per test, half from each paper. Not affiliated with CEA or any approved course provider.",
    analyticsKey: "sgres",
  },
};
```

Append `sgres` to the `EXAMS` array after the last international batch 1 exam (or after `llqp`).

Check: 18001-18005 (tests 18001-18004, sets 18001-18005) must be free (the batch assigns 18000).

## lib/banks/all.ts

```ts
import "./sgres";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/sgres.ts`.

## types/index.ts

- `QuestionType`: add `| "SGRES"`.
- `QuestionCategory`, under a `// Singapore RES exam` comment:

```ts
  | "sgresMarket"
  | "sgresLandLaw"
  | "sgresContract"
  | "sgresAgencyLease"
  | "sgresInterests"
  | "sgresRegulation"
  | "sgresAml"
  | "sgresMarketing"
  | "sgresPrivateSale"
  | "sgresHdb"
  | "sgresTaxFinance"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    sgresMarket: "Real Estate Market & Players",
    sgresLandLaw: "Land Law, Estates & Titles",
    sgresContract: "Contract Law & Property Torts",
    sgresAgencyLease: "Law of Agency & Landlord and Tenant",
    sgresInterests: "Interests in Land, Capacity & Planning",
    sgresRegulation: "Agency Regulation, Ethics & Conduct",
    sgresAml: "Anti-Money Laundering (PMLPFTF)",
    sgresMarketing: "Real Estate Marketing & Advertising",
    sgresPrivateSale: "Private Property Sales & Leasing",
    sgresHdb: "HDB Sale & Rental",
    sgresTaxFinance: "Property Taxes & Finance",
```

## app/globals.css

Hue from the international batch 1 table (350 70% 22%, already checked; nearest is dkteori at
348 70% 30%, 8 points of lightness apart). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Singapore RES exam theme */
  [data-theme="sgres"] {
    --brand: 350 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 350 70% 96%;
    --brand-hover: 350 70% 18%;
    --brand-dark: 350 70% 16%;
    --brand-darker: 350 60% 10%;
    --brand-muted: 350 25% 70%;
    --brand-border: 350 25% 80%;
    --brand-border-light: 350 22% 89%;
    --brand-gradient-to: 345 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `sgres: "RES exam practice for Singapore property agents on CEA's 2027 syllabus: land law, contract and agency law, the Estate Agents Act and ethics, anti-money laundering, marketing, private and HDB transactions, and property tax and finance, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `sgres: "CEA (Council for Estate Agencies) · RES Examination, Papers 1 and 2",`
- Hub group: new group `{ title: "Singapore licensing exams", ids: ["sgres"] }` right after
  "Singapore driving tests" (the brief's name; other Singapore non-driving exams from this batch
  would join it).
- `SEARCH_ALIASES`:
  `sgres: "res exam singapore res exam real estate salesperson exam res paper 1 res paper 2 cea exam council for estate agencies property agent exam singapore property agent licence real estate agent singapore estate agents act res course hdb resale agent",`
- `RELATED_OVERRIDES`: `sgres: ["realestate", "sgbtt", "nmls"],` (a one-exam group needs padding;
  `realestate` is the US salesperson exam).

## lib/region.ts

`sgres: "SG",` in `TEST_REGIONS`, and add `"sgres"` to `NON_DRIVING_TESTS`.
Optionally mention the RES exam on the Singapore homepage (`REGION_HOME.SG`), as `/ph` mentions
the Civil Service Exam.

## lib/examFacts.ts

```ts
  sgres: {
    answer:
      "The Real Estate Salesperson (RES) Examination is the exam the Council for Estate Agencies (CEA) requires before registering someone as a real estate salesperson in Singapore, taken after an approved RES course of at least 65 hours. It has two papers sat separately: Paper 1 on the real estate market, basic land law and dealings with interests in land, and Paper 2 on regulation of the agency industry, ethics, anti-money laundering duties, marketing and property transactions. Each paper has 60 multiple-choice questions worth 1 mark and 20 case-study questions worth 2 marks, lasts 2.5 hours, and has a passing mark of 60 out of 100. A revised syllabus applies to exams from 1 January 2027.",
    rows: [
      { label: "Papers", value: "Paper 1 (Units 1 and 2); Paper 2 (Units 3 and 4)" },
      { label: "Questions", value: "60 MCQs + 20 case-study MCQs per paper (100 marks)" },
      { label: "Time", value: "2.5 hours per paper" },
      { label: "Pass mark", value: "60 per paper, subject to CEA review" },
      { label: "Before the exam", value: "Approved RES course of at least 65 hours" },
      { label: "Run by", value: "Council for Estate Agencies (CEA)" },
    ],
    basedOn: "CEA's Prepare for the RES Examination page and RES Examination Syllabus 2027, checked November 2026",
    source: { name: "CEA: Prepare for the real estate salesperson examination", url: "https://www.cea.gov.sg/real-estate-professionals/for-aspiring-real-estate-salespersons/real-estate-salesperson-examination/prepare-for-the-real-estate-salesperson-examination/" },
  },
```
(Exam fees, dates and the course certificate's two-year validity are left out of the facts table.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing required (the template sets none). The RES course is compulsory and taught by Approved
Course Providers, so an optional `sgres: "RES courses"` TEACHES line is reasonable.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing required: sitemaps map over `EXAMS`, no redirects, `house` icon exists. Borrow the
real estate tiger through `BORROWED_SETS` (`sgres: "realestate"`).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 56).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing sgres:singapore-res:18001`

## CLAUDE.md (under Additional Exams, after the LLQP bullet or with the other Singapore exam)

```md
- **Singapore RES exam** (`sgres`, CEA Real Estate Salesperson Examination, `/singapore-res/*`, landing `/singapore-res-exam-practice-test`): `data/singapore-res-questions.json` (200 original questions on CEA's RES Examination Syllabus 2027, for exams from 1 January 2027: Paper 1 as real estate market and players 12, land law, estates and titles 24, contract law and property torts 24, agency and landlord and tenant 20, interests in land, capacity and planning 20; Paper 2 as agency regulation, ethics and conduct (with the Consumer Protection (Fair Trading) Act) 24, anti-money laundering (PMLPFTF) 12, marketing and advertising (green buildings, commercial, industrial, conservation) 24, private sales, collective sales and leasing 16, HDB sale and rental 12, property taxes and finance 12), test IDs 18001-18004 (50 questions each, 25 per paper, weighted by the syllabus's training hours: units 9/16/15/10), sets 18001-18005 (by topic), state `SGRES`, prefix `SGRES-`, 60% pass like each real paper. 3/6/6/5/5/6/3/6/4/3/3 per test. The real exam is two papers of 2.5 hours, each 60 MCQs at 1 mark plus 20 case-study MCQs at 2 marks, 100 marks, passing mark 60 (subject to CEA review), after an RES course of at least 65 hours; case studies are not modelled as shared passages. Singapore law and CEA, HDB, URA, SLA and IRAS rules as of November 2026; no stamp duty rates, loan limits, CPF limits, option fees or other figures that change often. Built by `tools/next100/sgres/build.py`; sources in `tools/next100/sgres/sources.md`. Region SG, hub group "Singapore licensing exams", `[data-theme="sgres"]` deep wine (350 70% 22%), borrows the real estate tiger.
```
