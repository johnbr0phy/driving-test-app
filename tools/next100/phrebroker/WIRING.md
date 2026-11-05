# Wiring for `phrebroker` (Real Estate Brokers Licensure Examination, PRC, v1, region PH)

Files already written by the builder: `data/philippines-re-broker-questions.json` (200, PASS,
key-longest 16%, key >1.2x 26%), `lib/banks/phrebroker.ts`, `app/real-estate-broker-exam-philippines/*`
(layout, redirect, dashboard, drill, stats, copied from `app/singapore-res/`; no test or practice
folders, the shared `app/[slug]` routes serve them), `app/real-estate-broker-board-exam-reviewer-practice-test/page.tsx`,
`tools/next100/phrebroker/*` (spec, sources, `q_*.py`, `build.py`, this file). Everything below goes
in shared files.

Format note: the real exam (PRB of Real Estate Service, exam programs for April 2024 and 22 April
2025 on prc.gov.ph) is one day: General/Fundamentals of Real Estate Service 25% (8 to 10 a.m.),
Special and Technical Knowledge 25% (11 a.m. to 1 p.m.), Professional Practice 50% (2 to 6 p.m.).
The Board's 2011 TOS (PRB-RES Res. No. 04, s. 2011, read from a third-party copy) set 100/100/200
items. Pass (R.A. 9646 Sec. 15): average of at least 75% with no subject below 50%. Here: four
50-item mock tests, 13 + 12 + 25 by subject, spread evenly over each subject's topics (as the TOS
does); only the 75% average is scored. Seven content sets + 4 tests = 11 dashboard steps. Pools
are exactly 4x per-test counts. Content sets, so sets first, then tests.

## lib/exams.ts

Add `"phrebroker"` to the `ExamId` union. Icon `house` already exists.

```ts
const phrebroker: ExamConfig = {
  id: "phrebroker",
  stateCode: "PHREB",
  idBase: 19800,
  slug: "/real-estate-broker-exam-philippines",
  landingPath: "/real-estate-broker-board-exam-reviewer-practice-test",
  name: "Real Estate Broker Board Exam Reviewer",
  shortName: "REB Exam",
  examLabel: "broker board exam",
  fullName: "Real Estate Brokers Licensure Examination (PRC)",
  questionIdPrefix: "PHREB-",
  icon: "house",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // PRB of Real Estate Service exam program (April 2025): General/Fundamentals 25%, Special and
  // Technical Knowledge 25%, Professional Practice 50%. Pass: average 75%, no subject below 50%
  // (R.A. 9646 Sec. 15); only the 75% is scored here. Each 50-item test is 13 + 12 + 25, spread
  // evenly over each subject's topics as the 2011 TOS does: 4/3/3/3, 3/3/3/3, 5/4/4/4/4/4.
  // All items original; Philippine law as of November 2026, no tax rates, fees or peso limits.
  blueprint: {
    phrebOwnership: 4,
    phrebEthics: 3,
    phrebResa: 3,
    phrebLawsTax: 3,
    phrebSubdivision: 3,
    phrebCondo: 3,
    phrebSaleMortgageLease: 3,
    phrebDocumentation: 3,
    phrebBrokerage: 5,
    phrebFinance: 4,
    phrebUrbanLandUse: 4,
    phrebPlanningZoning: 4,
    phrebEcology: 4,
    phrebAppraisal: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 19801, name: "Property Ownership & Real Estate Laws", categories: ["phrebOwnership", "phrebLawsTax"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 2, id: 19802, name: "RESA & Code of Ethics", categories: ["phrebResa", "phrebEthics"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 3, id: 19803, name: "Subdivision & Condominium", categories: ["phrebSubdivision", "phrebCondo"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 4, id: 19804, name: "Sale, Mortgage, Lease & Registration", categories: ["phrebSaleMortgageLease", "phrebDocumentation"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 5, id: 19805, name: "Brokerage Practice & Finance", categories: ["phrebBrokerage", "phrebFinance"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 6, id: 19806, name: "Urban Land Use, Planning & Zoning", categories: ["phrebUrbanLandUse", "phrebPlanningZoning"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 7, id: 19807, name: "Ecology & Basic Appraisal", categories: ["phrebEcology", "phrebAppraisal"], size: 32, weightLabel: "8 of 50 test questions" },
  ],
  categoryLabels: {
    phrebOwnership: "Fundamentals of Property Ownership",
    phrebEthics: "Code of Ethics & Responsibilities",
    phrebResa: "Real Estate Service Act (R.A. 9646)",
    phrebLawsTax: "Real Estate Laws & Taxation",
    phrebSubdivision: "Subdivision Development",
    phrebCondo: "Condominium & Other Real Estate Holdings",
    phrebSaleMortgageLease: "Sale, Mortgage & Lease",
    phrebDocumentation: "Documentation & Registration",
    phrebBrokerage: "Real Estate Brokerage Practice",
    phrebFinance: "Real Estate Finance & Economics",
    phrebUrbanLandUse: "Urban & Land Use",
    phrebPlanningZoning: "Planning, Development & Zoning",
    phrebEcology: "Basic Principles of Ecology",
    phrebAppraisal: "Basic Appraisal for Brokers",
  },
  copy: {
    guestPrompt: "to save your broker board exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Seven sets across all three subjects: ownership and real estate laws, R.A. 9646 and ethics, subdivisions and condominiums, sale, mortgage, lease and registration, brokerage and finance, land use and zoning, and ecology and appraisal. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 items weighted 25/25/50, 75% to pass",
    heroSubs: [
      "Three subjects, four mock exams. Professional Practice is half the rating.",
      "Master each topic set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. Good luck on the board exam.",
    ],
    sourceLine: "Based on the PRC exam program for the Real Estate Brokers Licensure Examination and Philippine law as of November 2026. Original questions; 50 per mock exam, weighted 25/25/50 by subject. Not affiliated with the PRC, the Professional Regulatory Board of Real Estate Service or any review center.",
    analyticsKey: "phrebroker",
  },
};
```

Append `phrebroker` to the `EXAMS` array after the other international batch 2 Philippine exams
(after `phinsurance` if wired, else after `phlet`).

Check: 19801-19807 (tests 19801-19804, sets 19801-19807) must be free (the batch assigns 19800).

## lib/banks/all.ts

```ts
import "./phrebroker";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/phrebroker.ts`.

## types/index.ts

- `QuestionType`: add `| "PHREB"`.
- `QuestionCategory`, under a `// Philippine real estate broker board exam` comment:

```ts
  | "phrebOwnership"
  | "phrebEthics"
  | "phrebResa"
  | "phrebLawsTax"
  | "phrebSubdivision"
  | "phrebCondo"
  | "phrebSaleMortgageLease"
  | "phrebDocumentation"
  | "phrebBrokerage"
  | "phrebFinance"
  | "phrebUrbanLandUse"
  | "phrebPlanningZoning"
  | "phrebEcology"
  | "phrebAppraisal"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    phrebOwnership: "Fundamentals of Property Ownership",
    phrebEthics: "Code of Ethics & Responsibilities",
    phrebResa: "Real Estate Service Act (R.A. 9646)",
    phrebLawsTax: "Real Estate Laws & Taxation",
    phrebSubdivision: "Subdivision Development",
    phrebCondo: "Condominium & Other Real Estate Holdings",
    phrebSaleMortgageLease: "Sale, Mortgage & Lease",
    phrebDocumentation: "Documentation & Registration",
    phrebBrokerage: "Real Estate Brokerage Practice",
    phrebFinance: "Real Estate Finance & Economics",
    phrebUrbanLandUse: "Urban & Land Use",
    phrebPlanningZoning: "Planning, Development & Zoning",
    phrebEcology: "Basic Principles of Ecology",
    phrebAppraisal: "Basic Appraisal for Brokers",
```

## app/globals.css

Hue from the international batch 2 table (30 70% 22%, checked by the batch script; nearest
`nhie` 30 35% 28% differs by 35 points of saturation). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Philippine real estate broker board exam theme */
  [data-theme="phrebroker"] {
    --brand: 30 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 30 70% 96%;
    --brand-hover: 30 70% 18%;
    --brand-dark: 30 70% 16%;
    --brand-darker: 30 60% 10%;
    --brand-muted: 30 25% 70%;
    --brand-border: 30 25% 80%;
    --brand-border-light: 30 22% 89%;
    --brand-gradient-to: 25 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `phrebroker: "Reviewer for the PRC Real Estate Brokers Licensure Examination: property ownership, R.A. 9646 and the Code of Ethics, real estate laws and taxation, subdivisions and condominiums, sale, mortgage and lease, titles and registration, brokerage, finance, land use and zoning, ecology and basic appraisal, in four 50-item mock exams weighted 25/25/50 with every answer explained.",`
- `EXAM_ORG`: `phrebroker: "PRC · Professional Regulatory Board of Real Estate Service",`
- Hub group: new group `{ title: "Philippines insurance and real estate licences", ids: ["phinsurance", "phrebroker"] }`
  placed after "Philippines government and licensure exams" and the other two new Philippine groups
  (the brief's name and order; drop `phinsurance` from the list if it is not wired).
- `SEARCH_ALIASES`:
  `phrebroker: "real estate broker board exam reble real estate broker licensure exam prc real estate broker exam real estate broker reviewer ra 9646 resa real estate service act broker exam philippines real estate broker philippines board exam real estate philippines prbres",`
- `RELATED_OVERRIDES` (only if the group is under three exams): `phrebroker: ["phinsurance", "phlet", "sgres"],`.

## lib/region.ts

`phrebroker: "PH",` in `TEST_REGIONS`, and add `"phrebroker"` to `NON_DRIVING_TESTS`.
Optionally mention the broker exam on the Philippines homepage (`REGION_HOME.PH`).

## lib/examFacts.ts

```ts
  phrebroker: {
    answer:
      "The Real Estate Brokers Licensure Examination is the board exam that the Professional Regulation Commission gives through the Professional Regulatory Board of Real Estate Service under R.A. 9646, the Real Estate Service Act; a license is required to practice as a real estate broker in the Philippines. In the Board's recent exam programs it is given in one day in three subjects: General/Fundamentals of Real Estate Service (25%, two hours), Special and Technical Knowledge (25%, two hours) and Professional Practice (50%, four hours). To pass you need an average of at least 75% in all subjects with no rating below 50% in any subject.",
    rows: [
      { label: "Subjects", value: "General/Fundamentals 25%; Special and Technical Knowledge 25%; Professional Practice 50%" },
      { label: "Time", value: "2 h, 2 h and 4 h on one day" },
      { label: "Items", value: "100, 100 and 200 in the Board's 2011 table of specifications" },
      { label: "Pass mark", value: "Average 75%, no subject below 50% (R.A. 9646 Sec. 15)" },
      { label: "Run by", value: "PRC, Professional Regulatory Board of Real Estate Service" },
    ],
    basedOn: "the PRC exam program for the 22 April 2025 Real Estate Brokers Licensure Examination and R.A. 9646, checked November 2026",
    source: { name: "PRC: Real Estate Brokers Licensure Examination program (April 2025)", url: "https://prc.gov.ph/sites/default/files/041025%20EXAM%20PROGRAM%20REAL%20ESTATE%20BROKERS_Rev1.pdf" },
  },
```
(Exam dates, fees and the degree requirement are left out of the facts table.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Add `"phrebroker"` to `TEACHER_LED` (review centers and BS Real Estate Management programs, as the
brief asks for PRC board exams), and in `TEACHES`:
`phrebroker: "a real estate broker review class or a real estate management program",`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing required: sitemaps map over `EXAMS`, no redirects, `house` icon exists. Borrow the
real estate tiger through `BORROWED_SETS` (`phrebroker: "realestate"`).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 36).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing phrebroker:real-estate-broker-exam-philippines:19801`

## CLAUDE.md (under Additional Exams, after the other Philippine PRC exams)

```md
- **Real Estate Broker Board Exam** (`phrebroker`, PRC Real Estate Brokers Licensure Examination, `/real-estate-broker-exam-philippines/*`, landing `/real-estate-broker-board-exam-reviewer-practice-test`): `data/philippines-re-broker-questions.json` (200 original questions on the PRB of Real Estate Service exam program (April 2025, same as April 2024): General/Fundamentals as property ownership 16, Code of Ethics 12, R.A. 9646 12, real estate laws and taxation (CARP, R.A. 7160, R.A. 12001) 12; Special and Technical Knowledge as subdivision development (P.D. 957, B.P. 220, R.A. 7279/10884) 12, condominium and other holdings 12, sale, mortgage and lease 12, documentation and registration (P.D. 1529) 12; Professional Practice as brokerage practice 20, finance and economics (Maceda Law computations) 16, urban and land use 16, planning, development and zoning 16, ecology 16, basic appraisal 16), test IDs 19801-19804 (50 items each, 13/12/25 by subject like the 25/25/50 weights), sets 19801-19807 (by topic), state `PHREB`, prefix `PHREB-`, 75% pass (the real rule also needs no subject below 50%, not modelled). 4/3/3/3, 3/3/3/3, 5/4/4/4/4/4 per test, no spares. The real exam is one day, 2 h + 2 h + 4 h; the Board's 2011 TOS set 100/100/200 items. Philippine law as of November 2026; no tax rates, fees or peso limits. Built by `tools/next100/phrebroker/build.py`; sources in `tools/next100/phrebroker/sources.md`. Region PH, hub group "Philippines insurance and real estate licences", `[data-theme="phrebroker"]` dark brown (30 70% 22%), borrows the real estate tiger, teacher-led.
```
