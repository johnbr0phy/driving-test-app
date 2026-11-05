# Wiring for `ieqfa` (QFA / Minimum Competency Code exam: regulation, ethics and core products, Ireland, v1, region IE)

Files already written by the builder: `data/ieqfa-questions.json` (200, PASS, key-longest 10%,
key more than 1.2x the wrong-option average 8%), `lib/banks/ieqfa.ts`, `app/qfa-mcc/*` (layout,
redirect, dashboard, drill, stats, copied from `app/llqp/`; no test or practice folders, the shared
`app/[slug]` routes serve them), `app/qfa-mcc-practice-test/page.tsx`, `tools/next100/ieqfa/*`
(spec, sources, `q_*.py`, `build.py`, this file). Everything below goes in shared files.

Format note: the model is the LIA's QFA Regulation module, one of the six modules of the QFA
(Certificate in Professional Financial Advice: Regulation, Life Assurance, Investment, Loans,
Pensions, Financial Advice). The LIA page says most modules are a 2-hour online multiple-choice exam
of 100 questions, held with remote invigilation in January, May and September; the Financial
Advice capstone is 2.5 hours and 3 case study questions. **The pass mark is not published on the
pages read**, so `passPct: 70` is Tigertest's readiness target (said in the copy, the landing FAQ
and examFacts, as `zak53` does). Here: four 50-question mixed mock tests (half the real length),
five content sets, so sets first, then tests: 5 + 4 = 9 dashboard steps. Pools are exactly 4x the
per-test counts. Weights are Tigertest's (no provider publishes them), following the MCC 2017
Appendix 3 regulation and best practice competencies plus 20% core product concepts.

## lib/exams.ts

Add `"ieqfa"` to the `ExamId` union. Icon `building` already exists (the integrator may prefer
`umbrella`, which LLQP uses).

```ts
const ieqfa: ExamConfig = {
  id: "ieqfa",
  stateCode: "IEQFA",
  idBase: 21100,
  slug: "/qfa-mcc",
  landingPath: "/qfa-mcc-practice-test",
  name: "QFA Regulation Practice Test",
  shortName: "QFA Regulation",
  examLabel: "QFA regulation exam",
  fullName: "QFA / Minimum Competency Code exam: regulation, ethics and core products (Ireland)",
  questionIdPrefix: "IEQFA-",
  icon: "building",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Modelled on the LIA's QFA Regulation module (2-hour online MCQ exam of 100 questions, sittings
  // January, May and September); pass mark not published, so 70% is Tigertest's readiness target.
  // Tests are half length. Weights are Tigertest's, following the Central Bank's Minimum
  // Competency Code 2017 (consolidated June 2026) Appendix 3 regulation and best practice
  // competencies, the Consumer Protection Code 2025 (in force 24 March 2026) and core product
  // concepts: regulators 6, MCC/F&P/IAF 6, CPC 8, contract and consumer insurance law 5,
  // complaints/compensation/data 5, AML 4, ethics 6, protection products 5, pensions/savings/credit 5.
  blueprint: {
    ieqfaRegulators: 6,
    ieqfaCompetence: 6,
    ieqfaCpc: 8,
    ieqfaContract: 5,
    ieqfaRedress: 5,
    ieqfaAml: 4,
    ieqfaEthics: 6,
    ieqfaProtection: 5,
    ieqfaSavings: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 21101, name: "Regulators & Competence", categories: ["ieqfaRegulators", "ieqfaCompetence"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 2, id: 21102, name: "Consumer Protection Code & Contract Law", categories: ["ieqfaCpc", "ieqfaContract"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 3, id: 21103, name: "Complaints, Data & Anti-Money Laundering", categories: ["ieqfaRedress", "ieqfaAml"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 4, id: 21104, name: "Ethics & Professional Conduct", categories: ["ieqfaEthics"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 5, id: 21105, name: "Core Products", categories: ["ieqfaProtection", "ieqfaSavings"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    ieqfaRegulators: "Regulators & the Regulatory Framework",
    ieqfaCompetence: "Minimum Competency, Fitness & Probity",
    ieqfaCpc: "Consumer Protection Code 2025",
    ieqfaContract: "Contract Law & Consumer Insurance Contracts",
    ieqfaRedress: "Complaints, Compensation & Data Protection",
    ieqfaAml: "Anti-Money Laundering & Sanctions",
    ieqfaEthics: "Ethics & Professional Conduct",
    ieqfaProtection: "Life, Protection & General Insurance",
    ieqfaSavings: "Pensions, Savings, Investments & Credit",
  },
  copy: {
    guestPrompt: "to save your QFA regulation progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets: regulators and competence, the Consumer Protection Code and contract law, complaints, data and anti-money laundering, ethics, and core products. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across every topic, 70% target",
    heroSubs: [
      "Five topic sets, four mock tests. Start with the regulators.",
      "Master each set's rules, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your QFA exam.",
    ],
    sourceLine: "Based on the Central Bank's Minimum Competency Code, the Consumer Protection Code 2025 and Irish financial services law as of November 2026. Original questions; 50 per test, half the real exam's 100. 70% is Tigertest's target, not an official pass mark. Not affiliated with the LIA, the IOB, the QFA Board or the Central Bank of Ireland.",
    analyticsKey: "ieqfa",
  },
};
```

Append `ieqfa` to the `EXAMS` array with the other international batch 4 Irish exams (after
`iespsv`, before `iepsa`, or wherever the integrator groups them).

Check: 21101-21105 (tests 21101-21104, sets 21101-21105) must be free (the batch 4 table assigns 21100).

## lib/banks/all.ts

```ts
import "./ieqfa";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/ieqfa.ts`.

## types/index.ts

- `QuestionType`: add `| "IEQFA"`.
- `QuestionCategory`, under a `// QFA regulation (Ireland, MCC)` comment:

```ts
  | "ieqfaRegulators"
  | "ieqfaCompetence"
  | "ieqfaCpc"
  | "ieqfaContract"
  | "ieqfaRedress"
  | "ieqfaAml"
  | "ieqfaEthics"
  | "ieqfaProtection"
  | "ieqfaSavings"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ieqfaRegulators: "Regulators & the Regulatory Framework",
    ieqfaCompetence: "Minimum Competency, Fitness & Probity",
    ieqfaCpc: "Consumer Protection Code 2025",
    ieqfaContract: "Contract Law & Consumer Insurance Contracts",
    ieqfaRedress: "Complaints, Compensation & Data Protection",
    ieqfaAml: "Anti-Money Laundering & Sanctions",
    ieqfaEthics: "Ethics & Professional Conduct",
    ieqfaProtection: "Life, Protection & General Insurance",
    ieqfaSavings: "Pensions, Savings, Investments & Credit",
```

## app/globals.css

Hue from the international batch 4 table (165 40% 20%, already checked). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* QFA regulation (Ireland, MCC) theme */
  [data-theme="ieqfa"] {
    --brand: 165 40% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 165 40% 96%;
    --brand-hover: 165 40% 15%;
    --brand-dark: 165 40% 14%;
    --brand-darker: 165 35% 9%;
    --brand-muted: 165 20% 70%;
    --brand-border: 165 20% 80%;
    --brand-border-light: 165 18% 89%;
    --brand-gradient-to: 170 55% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ieqfa: "QFA regulation practice for Ireland's Minimum Competency Code: the Central Bank, Fitness and Probity, the Consumer Protection Code 2025, complaints and the FSPO, anti-money laundering, ethics, and core life, pension, savings and credit products, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `ieqfa: "Central Bank of Ireland Minimum Competency Code · QFA Regulation module (LIA)",`
- Hub group (new, right after "Ireland driving tests", shared with the other Irish batch 4 exams):
  `{ title: "Ireland licences and workplace certificates", ids: ["iesafepass", "iespsv", "ieqfa", "iepsa"] },`
  (drop any that are not wired).
- `SEARCH_ALIASES`:
  `ieqfa: "qfa qfa exam qfa regulation qfa regulation exam qualified financial adviser qualified financial advisor mcc minimum competency code mcc exam apa regulation lia exam iob exam consumer protection code cpc 2025 central bank of ireland exam financial adviser ireland fitness and probity mortgage adviser ireland insurance exam ireland",`
- `RELATED_OVERRIDES`: `ieqfa: ["cemap", "llqp", "iespsv"],` (the Irish group mixes unrelated
  licences, so pad with the two nearest financial regulation exams).

## lib/region.ts

`ieqfa: "IE",` in `TEST_REGIONS`, and add `"ieqfa"` to `NON_DRIVING_TESTS`.

Country homepage `/ie` (REGION_HOME for IE) currently describes the driving tests; the integrator
may widen its description once the Irish licences group is wired, e.g. "Free practice for Ireland's
driver theory tests and the licences and certificates people sit for work: Safe Pass, the SPSV entry
test, the QFA regulation exam and the PSA security licence. Original questions, every answer
explained. No account needed." A `faqsFor("IE")` entry if wanted:
`{ q: "Is there a practice test for the QFA regulation exam?", a: "Yes. Tigertest's free QFA regulation practice covers the Central Bank's Minimum Competency Code, the Consumer Protection Code 2025, anti-money laundering, ethics and core products in four 50-question mock tests, with every answer explained." }`

## lib/examFacts.ts

```ts
  ieqfa: {
    answer:
      "The Qualified Financial Adviser (QFA) designation is a professional qualification recognised by the Central Bank of Ireland under its Minimum Competency Code, which sets the minimum knowledge anyone must have to advise consumers on, or arrange, retail financial products in Ireland. The LIA's QFA programme has six modules: Regulation, Life Assurance, Investment, Loans, Pensions and a Financial Advice capstone. The LIA says most modules, Regulation included, are a 2-hour online multiple-choice exam of 100 questions, held with remote invigilation in January, May and September; the capstone is 2.5 hours and three case study questions. The pass mark is not published on the LIA's exam pages.",
    rows: [
      { label: "Questions", value: "100 multiple choice (QFA Regulation, LIA)" },
      { label: "Time", value: "2 hours" },
      { label: "Pass mark", value: "Not published; 70% is Tigertest's target" },
      { label: "Format", value: "Online, remotely invigilated" },
      { label: "Sittings", value: "January, May and September" },
      { label: "Modules", value: "Regulation, Life Assurance, Investment, Loans, Pensions, Financial Advice" },
      { label: "Standard set by", value: "Central Bank of Ireland, Minimum Competency Code 2017" },
    ],
    basedOn: "LIA QFA programme and exam pages, and the Central Bank's consolidated Minimum Competency Code (June 2026) and Consumer Protection Code 2025, checked November 2026; pass mark not published",
    source: { name: "LIA: QFA, Certificate in Professional Financial Advice", url: "https://www.lia.ie/courses/certificate-in-professional-financial-advice" },
  },
```
(Fees, exemptions and the IOB's own QFA route are left out: not confirmed this session.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing: the batch 4 brief does not make ieqfa teacher-led (people self-study for QFA modules).
An optional `ieqfa: "QFA and MCC courses"` TEACHES line is reasonable if the integrator wants one
(employers run MCC study groups for new entrants).

## lib/tigerAssets.ts

Optionally borrow the life and health insurance set: `ieqfa: "insurance",` in `BORROWED_SETS`
(as `llqp` does). The landing calls `getTigerAsset("ieqfa", 1)`, which falls back to the DMV tiger.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, no redirects, the `building` icon exists, the tiger
falls back to the DMV one.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 52).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ieqfa:qfa-mcc:21101`

## CLAUDE.md (under Additional Exams, with the other international batch 4 Irish exams)

```md
- **QFA Regulation** (`ieqfa`, Ireland's Qualified Financial Adviser Regulation module and the Central Bank's Minimum Competency Code, `/qfa-mcc/*`, landing `/qfa-mcc-practice-test`): `data/ieqfa-questions.json` (200 original questions: regulators and the regulatory framework (Central Bank, SSM, CCPC, Pensions Authority, ASP, IAF and SEAR) 24, Minimum Competency Code, Fitness and Probity and intermediaries 24, Consumer Protection Code 2025 32, contract law and the Consumer Insurance Contracts Act 2019 20, FSPO, compensation schemes, GDPR and equal status 20, anti-money laundering and sanctions 16, ethics and professional conduct 24, life, protection and general insurance 20, pensions, savings, investments and credit 20), test IDs 21101-21104 (50 questions each, half the real 100), sets 21101-21105 (by topic), state `IEQFA`, prefix `IEQFA-`, 70% readiness line (Tigertest's target: the LIA's QFA Regulation module is a 2-hour online exam of 100 MCQs, held in January, May and September, and its pass mark is not published). 6/6/8/5/5/4/6/5/5 per test (Tigertest's weights). Irish law as of November 2026: MCC 2017 as consolidated in June 2026 (CPD 15 hours with one of ethics, four-year new entrant period), the Consumer Protection Code 2025 in force from 24 March 2026 (complaints 5/20/40/5 working days, errors within 6 months, records 6 years, calls 9 a.m. to 9 p.m. Monday to Saturday, vulnerability and digitalisation chapters), the Criminal Justice (Money Laundering and Terrorist Financing) Act 2010 as amended; no fees, tax rates or compensation limits. Kept clear of `cemap`, `llqp`, `life-health`, `re5`, `malaysia-pce`, `philippines-insurance`, `hkiiqe1` and `hk-le-paper-1` stems. Built by `tools/next100/ieqfa/build.py`; sources in `tools/next100/ieqfa/sources.md`. Region IE, hub group "Ireland licences and workplace certificates", `[data-theme="ieqfa"]` dark teal green (165 40% 20%), borrows the life and health insurance tiger.
```
