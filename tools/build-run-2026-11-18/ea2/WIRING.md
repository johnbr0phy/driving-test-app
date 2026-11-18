# Wiring for `ea2` (IRS Enrolled Agent SEE Part 2: Businesses, v1, region US)

Files already written by the builder: `data/enrolled-agent-part-2-questions.json` (200, PASS,
key-longest 24%), `lib/banks/ea2.ts`, `app/enrolled-agent-part-2/*` (layout, redirect, dashboard,
drill, stats, copied from `app/enrolled-agent-part-1/`; no test or practice folders),
`app/enrolled-agent-part-2-practice-test/page.tsx` (copied from the ea1 landing),
`tools/build-run-2026-11-18/ea2/*` (sources, `q_*.py`, `build.py`, this file). Everything below
goes in shared files.

Format note: Part 2 has 100 questions, 85 scored, in 3.5 hours; domains of 85: Business Entities
and Considerations 30, Business Tax Preparation 37, Specialized Returns and Taxpayers 18 (PSI
Candidate Information Bulletin, revised October 9, 2026). Scaled to 50 as 18/22/10 and split into
eight topic categories. Five training sets + four tests = 9 dashboard steps, like ea1. Premium by
the v1 default (last quarter of steps). Not teacher-led (ea1 is not either).

## lib/exams.ts

Add `"ea2"` to the `ExamId` union. Icon `calculator` already exists (ea1 uses it).

```ts
const ea2: ExamConfig = {
  id: "ea2",
  stateCode: "EA2",
  idBase: 34600,
  slug: "/enrolled-agent-part-2",
  landingPath: "/enrolled-agent-part-2-practice-test",
  name: "Enrolled Agent Part 2 Practice Test",
  shortName: "EA Exam Part 2",
  examLabel: "SEE Part 2",
  fullName: "IRS Special Enrollment Examination (SEE) Part 2: Businesses",
  questionIdPrefix: "EA2-",
  icon: "calculator",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // IRS SEE Candidate Information Bulletin (PSI), revised October 9, 2026, Part 2 content outline:
  // 85 scored of 100 questions in 3.5 hours. Domains of 85: Business Entities and Considerations
  // 30, Business Tax Preparation 37, Specialized Returns and Taxpayers 18. Scaled to 50 as
  // 18/22/10 (Tigertest's rounding) and split by Tigertest into eight topic categories:
  // entities 4, partnerships 6, C and S corporations 8; income and expenses 9, assets 6,
  // records, methods and advising 7; trusts, estates and exempt organizations 5; retirement
  // plans, farmers and rentals 5. The July 1, 2026 to February 28, 2027 window tests calendar
  // year 2025 (law as amended through December 31, 2025). The real result is scaled 200 to 800
  // with 500 to pass; 70% is a readiness marker. All items original.
  blueprint: {
    ea2Entities: 4,
    ea2Partnerships: 6,
    ea2Corporations: 8,
    ea2Income: 9,
    ea2Assets: 6,
    ea2Records: 7,
    ea2Trusts: 5,
    ea2Retirement: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 34601, name: "Business Entities & Partnerships", categories: ["ea2Entities", "ea2Partnerships"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 34602, name: "C & S Corporations", categories: ["ea2Corporations"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 3, id: 34603, name: "Business Income & Expenses", categories: ["ea2Income"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 4, id: 34604, name: "Assets, Records & Advising", categories: ["ea2Assets", "ea2Records"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 5, id: 34605, name: "Specialized Returns & Taxpayers", categories: ["ea2Trusts", "ea2Retirement"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    ea2Entities: "Business Entities & Elections",
    ea2Partnerships: "Partnerships",
    ea2Corporations: "C & S Corporations",
    ea2Income: "Business Income & Expenses",
    ea2Assets: "Business Assets & Depreciation",
    ea2Records: "Records, Methods & Advising",
    ea2Trusts: "Trusts, Estates & Exempt Orgs",
    ea2Retirement: "Retirement, Farmers & Rentals",
  },
  copy: {
    guestPrompt: "to save your Enrolled Agent Part 2 progress and track every question you miss",
    trainingHeading: "Train by IRS Part 2 topic",
    trainingSub: "Five sets covering all three domains of the IRS Part 2 outline, on 2025 tax law. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Five training sets, four practice tests. Start with Business Entities & Partnerships.",
      "Master each set, then take a practice test.",
      "Keep going. Take a practice test to see where you stand.",
      "Review your mistakes, then retake any test you haven't passed.",
      "All done. You're ready for SEE Part 2.",
    ],
    sourceLine: "Based on the IRS SEE Part 2 content outline and 2025 tax law. Original questions; 50 per test, weighted like the real exam. Not affiliated with the IRS or PSI.",
    analyticsKey: "ea2",
  },
};
```

Append `ea2` to the `EXAMS` array right after `ea1`. IDs: tests 34601-34604, sets 34601-34605;
`grep -n "346[0-9][0-9]" lib/exams.ts` found nothing on 2026-11-18. Set 4 is 52 (under 60), so no
parts. Then `npx tsx scripts/build-training-parts.ts`.

## lib/banks/all.ts

```ts
import "./ea2";
```

## types/index.ts

- `QuestionType`: add `| "EA2"`.
- `QuestionCategory`, under a `// IRS Enrolled Agent SEE Part 2 (Businesses)` comment:

```ts
  | "ea2Entities"
  | "ea2Partnerships"
  | "ea2Corporations"
  | "ea2Income"
  | "ea2Assets"
  | "ea2Records"
  | "ea2Trusts"
  | "ea2Retirement"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ea2Entities: "Business Entities & Elections",
    ea2Partnerships: "Partnerships",
    ea2Corporations: "C & S Corporations",
    ea2Income: "Business Income & Expenses",
    ea2Assets: "Business Assets & Depreciation",
    ea2Records: "Records, Methods & Advising",
    ea2Trusts: "Trusts, Estates & Exempt Orgs",
    ea2Retirement: "Retirement, Farmers & Rentals",
```

## app/globals.css

Muted taupe brown (32 20% 44%), next to ea1's deep amber. Checked on 2026-11-18 against every light
`[data-theme]` block: no theme within 8 degrees is within 15 saturation and 8 lightness; white
text contrast passes 4.5:1. Then run `tools/gen_dark_brand_css.py`.

```css
  /* IRS Enrolled Agent SEE Part 2 theme */
  [data-theme="ea2"] {
    --brand: 32 20% 44%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 32 20% 96%;
    --brand-hover: 32 20% 38%;
    --brand-dark: 32 20% 36%;
    --brand-darker: 32 18% 26%;
    --brand-muted: 32 12% 70%;
    --brand-border: 32 12% 80%;
    --brand-border-light: 32 10% 89%;
    --brand-gradient-to: 37 25% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ea2: "IRS Enrolled Agent Special Enrollment Examination Part 2 (Businesses) practice on the IRS content outline and 2025 tax law: entities and partnerships, C and S corporations, business income, expenses and credits, depreciation and accounting methods, payroll and worker classification, trusts, exempt organizations, retirement plans, farmers and rentals.",`
- `EXAM_ORG`: `ea2: "IRS · Special Enrollment Examination (SEE) Part 2, given by PSI",`
- Hub group: add `"ea2"` to `{ title: "Accounting, CPA and finance exams", ids: [...] }` right after `"ea1"`.
- `SEARCH_ALIASES`:
  `ea2: "enrolled agent part 2 ea part 2 see part 2 ea exam part 2 ea businesses see businesses special enrollment examination part 2 enrolled agent businesses irs ea exam business ea2",`
  (Keep the bare "enrolled agent" / "ea exam" aliases on ea1; a search for them shows both.)
- `RELATED_OVERRIDES`: not needed (the group has ten other members).

## lib/region.ts

`ea2` is US, the default (ea1 has no line either); add one only if the file lists every US exam.

## lib/examFacts.ts

```ts
  ea2: {
    answer:
      "The Special Enrollment Examination (SEE) is the IRS exam for becoming an enrolled agent, a tax practitioner who can represent taxpayers before the IRS. Part 2 covers businesses. Each of the three parts has 100 multiple-choice questions, 85 scored and 15 unscored, in 3.5 hours, and results are scaled from 200 to 800 with 500 to pass, which is not a fixed percentage. Part 2's three domains are business entities and considerations (30 scored questions), business tax preparation (37) and specialized returns and taxpayers (18). For exams from July 1, 2026 to February 28, 2027, questions follow tax law as amended through December 31, 2025 and relate to calendar year 2025.",
    rows: [
      { label: "Questions", value: "100 (85 scored, 15 unscored)" },
      { label: "Time", value: "3.5 hours" },
      { label: "Passing score", value: "500 on a 200 to 800 scale" },
      { label: "Tax year tested", value: "2025, for July 1, 2026 to February 28, 2027" },
      { label: "Largest domain", value: "Business tax preparation, 37 scored questions" },
      { label: "Where", value: "PSI test center or remote proctoring, both in the U.S.; international testing delayed" },
      { label: "Attempts", value: "Up to four per part each testing window" },
      { label: "Passed parts", value: "Carry over for three years" },
      { label: "Given by", value: "PSI for the IRS" },
    ],
    basedOn: "the PSI Candidate Information Bulletin for the IRS SEE (revised October 9, 2026) and the IRS enrolled agent FAQs, checked November 2026",
    source: { name: "IRS: Enrolled agents frequently asked questions", url: "https://www.irs.gov/tax-professionals/enrolled-agents/enrolled-agents-frequently-asked-questions" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date (comment: ea2).

## TEACHER_LED / TEACHES

None (ea1 is not teacher-led either; the landing has no `ExamClassFaq`).

## lib/tigerAssets.ts

`BORROWED_SETS`: `ea2: "cpareg",` (the CPA REG tiger, as ea1).

## lib/examFreshness.json (dated change)

```json
{
  "exam": "ea2",
  "date": "2027-03-01",
  "kind": "law",
  "what": "The July 1, 2026 to February 28, 2027 SEE window ends; the next window (after the March to April update) is expected to test calendar year 2026 law.",
  "action": "Read the new PSI bulletin; move 2025-dated items (bonus 40%/100% split, $600 Form 1099-NEC, 10% corporate charitable limit without the 1% floor) to the tax year it names, and update the landing and examFacts dates.",
  "source": "https://test-takers.psigov.us/api/content/bulletin/12238"
}
```

(The same event fits ea1; add one for it too if it has none.) Then `python3 -I tools/check_freshness.py`
and `python3 -I tools/build_exam_sources.py`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, no redirects, the `calculator` icon exists.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ea2:enrolled-agent-part-2:34601`

## CLAUDE.md (under Additional Exams, after the Enrolled Agent Part 1 bullet)

```md
- **Enrolled Agent Part 2** (`ea2`, IRS Special Enrollment Examination Part 2: Businesses, given by PSI, `/enrolled-agent-part-2/*`, landing `/enrolled-agent-part-2-practice-test`): `data/enrolled-agent-part-2-questions.json` (200 original questions on the Part 2 content outline in PSI's Candidate Information Bulletin revised October 9, 2026, Business Entities and Considerations 30 as business entities and elections (LLC defaults and the Form 8832 75-day rule, qualified joint ventures, EINs, required tax years and section 444, W-2, W-4 and 1099-NEC reporting, hobby presumption and Form 5213, Form 1120-H) 16, partnerships (syndication costs, limited partner SE, guaranteed payment timing, 707(b)(2), filing and K-1 rules, the 6698 penalty, the centralized audit regime: partnership representative, election out on Schedule B-2, imputed underpayment, 45-day push-out; partner-level COD, liabilities in a sale, 736(b), 751(c), 708 termination, death of a partner, holding period, tax-basis capital, 754) 24, C and S corporations (21% rate, affiliated DRD, 10% charitable limit and April 15 accrual rule, capital losses, 302(b)(2) and family waiver, accumulated earnings tax, estimated tax, E&P, 351 control, controlled groups, closely held passive losses; S revocation, termination short years, basis ordering, 2% shareholder health insurance, corporate-level COD, separately stated 179, late election relief, required year, PTTP losses, QSub, AAA, QSSTs) 32; Business Tax Preparation 37 as income and expenses (advance payments, COGS, UNICAP, LIFO, at-risk, COD, accrued compensation and 267(a)(2), fringes, family employment, statutory employees, self-rental, prepaid rent, bad debts, meals, entertainment and gifts, vehicles, interest tracing and 163(j), SE health insurance, QBI SSTB and wage limits, disabled access and 45R credits, farming NOL, excess business loss, home office, casualty) 36, business assets (100% and 40% bonus for 2025, election out, used property, section 174A, MACRS classes, QIP, 1231, 280F, repair regulation safe harbors, depletion, Form 3115, 1033, 197, Form 8824, ADS for electing real property businesses) 24, records, methods and advising (Schedules M-1, M-2 and L, economic performance, cash method, 481(a), 267 family, 7872, constructive dividends, Form 8300 aggregation, 1099-NEC, backup withholding, deposit schedules, accountable plans, worker classification and section 530, ACA, entity choice, trust fund recovery penalty) 28; Specialized Returns and Taxpayers 18 as trusts, estates and exempt organizations (exemptions, grantor trusts, DNI, calendar year, 645, Form 1041 due date, tier system, 642(c), Forms 1023, 990-N, 990-EZ, 990-PF and 990-T, UBTI exclusions) 20, retirement plans, farmers and rentals (SEP, SIMPLE, prohibited transactions, Form 5500-EZ, NQDC, crop insurance deferral, livestock 1231 and drought replacement, Forms 4835 and Schedule J, patronage dividends, residential rental 80% test, 280A, deposits and advance rent, real estate professional grouping) 20), test IDs 34601-34604, sets 34601-34605 (Business Entities & Partnerships 40, C & S Corporations 32, Business Income & Expenses 36, Assets, Records & Advising 52, Specialized Returns & Taxpayers 40), state `EA2`, prefix `EA2-`, 70% readiness line (the real Part 2 is 100 questions, 85 scored, in 3.5 hours, scaled 200 to 800 with 500 to pass). 4/6/8/9/6/7/5/5 per test, the outline's 30/37/18 of 85 scaled to 18/22/10. The July 1, 2026 to February 28, 2027 window tests calendar year 2025 (law through December 31, 2025), so every item uses 2025 rules (the Form 4562 instructions' 100% and 40% bonus split, section 174A); no indexed dollar limits, fees or penalty amounts. Written against the ea1, cpareg, cpatcp, cpabar and cpafar banks and scanned for repeated fact-and-answer pairs (about 25 rewritten). Part 3 (representation) is left to `ea3`. Built by `tools/build-run-2026-11-18/ea2/build.py`; sources in `tools/build-run-2026-11-18/ea2/sources.md`. Region US, hub group "Accounting, CPA and finance exams" (after ea1), `[data-theme="ea2"]` muted taupe brown (32 20% 44%), borrows the CPA REG tiger, not teacher-led.
```
