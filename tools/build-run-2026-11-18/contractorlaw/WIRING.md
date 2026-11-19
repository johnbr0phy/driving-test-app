# Wiring for `contractorlaw` (contractor Business and Law exam, US, v1)

Files written by the builder: `data/contractor-business-law-questions.json` (200, PASS),
`lib/banks/contractorlaw.ts`, `app/contractor-business-law/*` (5 wrappers copied from
`app/journeyman-electrician/`: layout, page, dashboard, drill, stats; no test/practice folders),
`app/contractor-business-and-law-practice-test/page.tsx`, `tools/build-run-2026-11-18/contractorlaw/*`
(sources, `q_*.py`, `build.py`). Everything below goes in shared files.

Format: standard v1 shape, 4 tests x 50 questions, 70% pass (35 of 50, Georgia's mark; Hawaii
uses 75%). Dashboard = 5 training sets + 4 tests = 9 steps; Premium by the v1 default (last 2
steps). Each pool is exactly 4x its per-test count. Rebuild:
`python3 -I tools/build-run-2026-11-18/contractorlaw/build.py`.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/contractor-business-law-questions.json --pool cblOrg=16 --pool cblFinance=28 --pool cblEstimate=28 --pool cblProject=20 --pool cblContract=24 --pool cblRisk=16 --pool cblTax=24 --pool cblLabor=24 --pool cblSafety=20`
-> `letters A/B/C/D 50 each, key-longest 22%, key>1.2x 18%, PASS`.

## lib/exams.ts

Add `"contractorlaw"` to the `ExamId` union. Icon `hardhat` already exists.

```ts
const contractorlaw: ExamConfig = {
  id: "contractorlaw",
  stateCode: "CONTRLAW",
  idBase: 41200,
  slug: "/contractor-business-law",
  landingPath: "/contractor-business-and-law-practice-test",
  name: "Contractor Business and Law Practice Test",
  shortName: "Business and Law",
  examLabel: "contractor Business and Law exam",
  fullName: "Contractor Business and Law (business and project management) exam",
  questionIdPrefix: "CBL-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // No single national exam: each state contractor board runs its own Business and Law exam,
  // usually through PSI or Prometric with a state edition of the NASCLA Contractors Guide as the
  // reference. Blueprint follows the shared subject areas of the PSI bulletins for Georgia
  // (updated 4/28/2025: 50 questions, 70%, open book) and Hawaii (1/20/2026: 80 questions, 75%,
  // closed book), checked 2026-11-18, minus the state licensing area. Federal law only; state
  // licensing and lien law are not asserted. All items original.
  blueprint: {
    cblOrg: 4,
    cblFinance: 7,
    cblEstimate: 7,
    cblProject: 5,
    cblContract: 6,
    cblRisk: 4,
    cblTax: 6,
    cblLabor: 6,
    cblSafety: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 41201, name: "Business Organization & Finance", categories: ["cblOrg", "cblFinance"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 2, id: 41202, name: "Estimating & Project Management", categories: ["cblEstimate", "cblProject"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 41203, name: "Contracts, Insurance & Bonds", categories: ["cblContract", "cblRisk"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 41204, name: "Tax & Labor Laws", categories: ["cblTax", "cblLabor"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 5, id: 41205, name: "Jobsite Safety & Environment", categories: ["cblSafety"], size: 20, weightLabel: "5 of 50 test questions" },
  ],
  categoryLabels: {
    cblOrg: "Business Organization",
    cblFinance: "Financial Management",
    cblEstimate: "Estimating & Bidding",
    cblProject: "Project Management & Liens",
    cblContract: "Contracts",
    cblRisk: "Risk Management, Insurance & Bonds",
    cblTax: "Tax Laws",
    cblLabor: "Labor Laws",
    cblSafety: "Safety & Environment",
  },
  copy: {
    guestPrompt: "to save your Business and Law progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets covering the business, tax, labor, contract and safety topics state Business and Law exams test. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across every topic, 70% to pass",
    heroSubs: [
      "Five training sets, four practice tests. Start with Business Organization & Finance.",
      "Master each set, then test.",
      "Try a practice test next.",
      "Fix the misses, then retake.",
      "All done. Book your Business and Law exam.",
    ],
    sourceLine: "Based on state Business and Law exam subject areas, federal tax, labor and OSHA rules, and standard construction business practice. Original questions; 50 per test, 70% to pass. State licensing and lien law not included.",
    analyticsKey: "contractorlaw",
  },
};
```

Append `contractorlaw` to the `EXAMS` array near `jelec` and `nhie`.
Check 41201-41205 are free; if another builder took 41200, move the whole block to the next free hundred.

## lib/banks/all.ts

```ts
import "./contractorlaw";
```

## types/index.ts

- `QuestionType`: add `| "CONTRLAW"`.
- `QuestionCategory`, under a `// Contractor Business and Law` comment:

```ts
  | "cblOrg"
  | "cblFinance"
  | "cblEstimate"
  | "cblProject"
  | "cblContract"
  | "cblRisk"
  | "cblTax"
  | "cblLabor"
  | "cblSafety"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cblOrg: "Business Organization",
    cblFinance: "Financial Management",
    cblEstimate: "Estimating & Bidding",
    cblProject: "Project Management & Liens",
    cblContract: "Contracts",
    cblRisk: "Risk Management, Insurance & Bonds",
    cblTax: "Tax Laws",
    cblLabor: "Labor Laws",
    cblSafety: "Safety & Environment",
```

## app/globals.css

Suggested hue 330 20% 38% (muted dusty mauve), checked against every `--brand` in
`app/globals.css` on 2026-11-18 (no theme within 8 degrees and 15 saturation / 8 lightness;
white text about 7:1). Other builders this run may pick nearby; the integrator settles clashes.
Then run `tools/gen_dark_brand_css.py`.

```css
  /* Contractor Business and Law theme */
  [data-theme="contractorlaw"] {
    --brand: 330 20% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 330 30% 96%;
    --brand-hover: 330 20% 32%;
    --brand-dark: 330 22% 28%;
    --brand-darker: 330 24% 18%;
    --brand-muted: 330 15% 70%;
    --brand-border: 330 18% 80%;
    --brand-border-light: 330 22% 90%;
    --brand-gradient-to: 210 40% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `contractorlaw: "Four 50-question mock tests for the contractor Business and Law exam many state boards require: estimating, finance, contracts, payroll tax, labor law, OSHA, insurance, bonds and liens.",`
- `EXAM_ORG`: `contractorlaw: "State contractor boards · Business and Law exams (PSI, Prometric)",`
- Hub group: add `"contractorlaw"` after `"jelec"` in `{ title: "Aviation, radio & trade licenses", ... }`.
- `SEARCH_ALIASES`:
  `contractorlaw: "business and law business law contractor license contractors license general contractor gc exam nascla contractors guide business and project management bpm construction business law psi prometric residential contractor builder license",`
- `RELATED_OVERRIDES`: `contractorlaw: ["jelec", "osha", "nhie"],` (optional; the hub group already has enough members).

## lib/region.ts

Nothing: US is the default region.

## lib/examFacts.ts

```ts
  contractorlaw: {
    answer:
      "The contractor Business and Law exam is the business part of the licensing exam that many state contractor boards require, often next to a trade exam. Each state writes and runs its own, usually through PSI or Prometric, and many base it on a state edition of the NASCLA Contractors Guide to Business, Law and Project Management. Georgia's is 50 questions in 120 minutes with 70 percent to pass and open book; Hawaii's is 80 questions in 180 minutes with 75 percent to pass, closed book. Topics include licensing, estimating and bidding, financial management, tax and labor law, contracts, project management and liens, risk management and safety.",
    rows: [
      { label: "Questions", value: "Varies by state (Georgia 50, Hawaii 80)" },
      { label: "Time", value: "Varies (Georgia 120 min, Hawaii 180 min)" },
      { label: "Passing score", value: "Varies (Georgia 70%, Hawaii 75%)" },
      { label: "Format", value: "Open or closed book, set by each state" },
      { label: "Reference", value: "Often a state edition of the NASCLA Contractors Guide" },
      { label: "Given by", value: "State contractor boards via PSI or Prometric" },
    ],
    basedOn: "PSI candidate bulletins for the Georgia (April 2025) and Hawaii (January 2026) Business and Law exams, checked November 2026",
    source: { name: "PSI: Georgia contractor candidate information bulletin", url: "https://test-takers.psiexams.com/api/content/bulletin/972" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` with a comment naming the run.

## components/TeachNudge.tsx

Add `"contractorlaw"` to `TEACHER_LED` (contractor licensing schools run Business and Law prep courses).

## components/exam/ExamClassFaq.tsx

In `TEACHES`: `contractorlaw: "a contractor licensing or Business and Law prep course",`. The landing
already renders `<ExamClassFaq examId="contractorlaw" />` and `classFaqJsonLd("contractorlaw")`.

## lib/tigerAssets.ts

Optional: borrow the OSHA tiger (`contractorlaw: "osha"` in `BORROWED_SETS`), or leave the DMV fallback.

## lib/examFreshness.json

Nothing dated. (Hawaii moved its outline on 2026-03-30; already in force.)

## tools/build_exam_sources.py

Run `python3 -I tools/build_exam_sources.py` so `lib/examSources.json` picks up the new sources.md.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing contractorlaw:contractor-business-law:41201`

## CLAUDE.md (under Additional Exams)

```md
- **Contractor Business and Law** (`contractorlaw`, the Business and Law (business and project management) exam many US state contractor boards require next to a trade exam, usually through PSI or Prometric with a state edition of the NASCLA Contractors Guide as the reference, `/contractor-business-law/*`, landing `/contractor-business-and-law-practice-test`): `data/contractor-business-law-questions.json` (200 original questions on the shared subject areas of the PSI Georgia (updated 4/28/2025) and Hawaii (1/20/2026) Business and Law bulletins, minus state licensing: business organization (structures, IRS returns, EIN, W-9, cash and accrual) 16, financial management (ratios, depreciation, overhead, break-even, percentage of completion, job costing) 28, estimating and bidding (takeoffs, waste, burden, markup, contract types, alternates, allowances, addenda, bid shopping and rigging) 28, project management and liens (CPM, float, change orders, RFIs, retainage, substantial completion, lien waivers; lien rules said to vary by state) 20, contracts 24, risk management (bonds, Miller Act, CGL, builder's risk, additional insured, subrogation) 16, tax laws (IRS Pub. 15 for 2026: FICA, FUTA, 941, 940, W-2, deposits, backup withholding, worker classification) 24, labor laws (FLSA overtime and records, child labor hazardous orders, I-9, ADEA, ADA, FMLA, Davis-Bacon, Equal Pay, NLRA) 24, safety and environment (OSHA 1904 recordkeeping and reporting, selected 1926 rules, EPA RRP, stormwater, SPCC) 20), test IDs 41201-41204, sets 41201-41205 (Business Organization & Finance 44, Estimating & Project Management 48, Contracts, Insurance & Bonds 40, Tax & Labor Laws 48, Jobsite Safety & Environment 20), state `CONTRLAW`, prefix `CBL-`, 70% pass (Georgia's mark; Hawaii 75%). 4/7/7/5/6/4/6/6/5 per test, Tigertest's split. The NASCLA Contractors Guide (paid) was not read or quoted; federal law and IRS publications only, no state licensing, lien, workers' comp or sales tax rules, no fees or indexed thresholds. Kept clear of the `osha`, `phr`, `afsp`, `nhie`, `jelec`, `property-casualty`, `real-estate` and `cpa-reg` banks. Built by `tools/build-run-2026-11-18/contractorlaw/build.py`; sources in `tools/build-run-2026-11-18/contractorlaw/sources.md`. Region US, hub group "Aviation, radio & trade licenses" (after jelec), `[data-theme="contractorlaw"]` muted dusty mauve (330 20% 38%), teacher-led (contractor licensing schools).
```
