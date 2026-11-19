# Wiring for `afsp` (IRS Annual Filing Season Program: AFTR course test, v1, region US)

Files already written by the builder: `data/annual-federal-tax-refresher-questions.json` (200, PASS,
key-longest 18%), `lib/banks/afsp.ts`, `app/annual-federal-tax-refresher/*` (layout, redirect,
dashboard, drill, stats, copied from `app/enrolled-agent-part-1/`; no test or practice folders),
`app/annual-federal-tax-refresher-practice-test/page.tsx` (copied from the ea1 landing),
`tools/build-run-2026-11-18/afsp/*` (sources, `q_*.py`, `build.py`, this file). Everything below
goes in shared files.

Format note: the real AFTR comprehension test (IRS Publication 6012, Rev. 3-2026) is 100
multiple-choice questions, 4 answers and 1 correct, at most 3 continuous hours, 70% to pass,
written and given by IRS-approved CE providers at the end of the 6-hour AFTR course; course and
test must be finished by December 31. The 2026 course (Publication 6079, Rev. 5-2026) covers 2026
individual returns (filed in 2027) and supports the 2027 AFSP. The IRS publishes no domain weights;
the 14/26/10 per 50 split is Tigertest's, by the number of outline topics per domain. Four training
sets + four tests = 8 dashboard steps. Premium by the v1 default (last quarter of steps). Not
teacher-led (self-study and CE webinars; ea1 is not either).

## lib/exams.ts

Add `"afsp"` to the `ExamId` union. Icon `calculator` already exists (ea1 uses it).

```ts
const afsp: ExamConfig = {
  id: "afsp",
  stateCode: "AFSP",
  idBase: 40400,
  slug: "/annual-federal-tax-refresher",
  landingPath: "/annual-federal-tax-refresher-practice-test",
  name: "AFTR Practice Test",
  shortName: "AFTR Test",
  examLabel: "AFTR test",
  fullName: "IRS Annual Filing Season Program: Annual Federal Tax Refresher (AFTR) Course Test",
  questionIdPrefix: "AFSP-",
  icon: "calculator",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // IRS Publication 6079 (Rev. 5-2026), AFTR Course Outline for preparing 2026 individual 1040
  // returns: Domain 1 New Tax Law/Recent Updates (1.1-1.14), Domain 2 General Review (2.1-2.16),
  // Domain 3 Practices, Procedures and Professional Responsibility (3.1-3.8). The IRS sets no domain
  // weights (Publication 6012 only requires every topic tested), so 14/26/10 per 50 is Tigertest's,
  // by topic count: updates 3, new credits 3, new deductions 8; filing 4, income 6, Schedule C 4,
  // itemized 3, credits 4, general topics 5; security 4, practice 6. The real test is 100
  // questions in 3 hours with 70% to pass. 2026 figures from Rev. Proc. 2025-32. All items original.
  blueprint: {
    afspAdjust: 3,
    afspNewCred: 3,
    afspNewDed: 8,
    afspFiling: 4,
    afspIncome: 6,
    afspSchC: 4,
    afspItemized: 3,
    afspCredits: 4,
    afspGeneral: 5,
    afspSecurity: 4,
    afspPractice: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 40401, name: "New Tax Law & Recent Updates", categories: ["afspAdjust", "afspNewCred", "afspNewDed"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 2, id: 40402, name: "Filing Status, Income & Schedule C", categories: ["afspFiling", "afspIncome", "afspSchC"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 3, id: 40403, name: "Deductions, Credits & General Topics", categories: ["afspItemized", "afspCredits", "afspGeneral"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 40404, name: "Practices & Responsibility", categories: ["afspSecurity", "afspPractice"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    afspAdjust: "Inflation Adjustments & Reporting",
    afspNewCred: "New Credit Rules",
    afspNewDed: "New Deductions & Accounts",
    afspFiling: "Filing Status & Dependents",
    afspIncome: "Income & Retirement",
    afspSchC: "Schedule C Business",
    afspItemized: "Itemized Deductions",
    afspCredits: "Tax Credits",
    afspGeneral: "General Topics & Due Dates",
    afspSecurity: "Identity Theft & Data Security",
    afspPractice: "Preparer Rules & AFSP",
  },
  copy: {
    guestPrompt: "to save your AFTR progress and track every question you miss",
    trainingHeading: "Train by AFTR outline domain",
    trainingSub: "Four sets covering all three domains of the IRS 2026 AFTR course outline, on 2026 tax law. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across all three domains",
    heroSubs: [
      "Four training sets, four practice tests. Start with New Tax Law & Recent Updates.",
      "Master each set, then take a practice test.",
      "Keep going. Take a practice test to see where you stand.",
      "Review your mistakes, then retake any test you haven't passed.",
      "All done. You're ready for the AFTR test.",
    ],
    sourceLine: "Based on the IRS 2026 AFTR course outline (Publication 6079) and 2026 tax law. Original questions; 50 per test, 70% target like the real test. Not affiliated with the IRS or any CE provider.",
    analyticsKey: "afsp",
  },
};
```

Append `afsp` to the `EXAMS` array right after `ea3` (or after ea1/ea2/ea3, whichever is last).
IDs: tests 40401-40404, sets 40401-40404; `grep -n "404[0-9][0-9]" lib/exams.ts` found nothing on
2026-11-18. Largest set is 56 (under 60), so no parts. Then `npx tsx scripts/build-training-parts.ts`.

## lib/banks/all.ts

```ts
import "./afsp";
```

## types/index.ts

- `QuestionType`: add `| "AFSP"`.
- `QuestionCategory`, under a `// IRS Annual Filing Season Program (AFTR course test)` comment:

```ts
  | "afspAdjust"
  | "afspNewCred"
  | "afspNewDed"
  | "afspFiling"
  | "afspIncome"
  | "afspSchC"
  | "afspItemized"
  | "afspCredits"
  | "afspGeneral"
  | "afspSecurity"
  | "afspPractice"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    afspAdjust: "Inflation Adjustments & Reporting",
    afspNewCred: "New Credit Rules",
    afspNewDed: "New Deductions & Accounts",
    afspFiling: "Filing Status & Dependents",
    afspIncome: "Income & Retirement",
    afspSchC: "Schedule C Business",
    afspItemized: "Itemized Deductions",
    afspCredits: "Tax Credits",
    afspGeneral: "General Topics & Due Dates",
    afspSecurity: "Identity Theft & Data Security",
    afspPractice: "Preparer Rules & AFSP",
```

## app/globals.css

Suggested: muted clay brick (12 45% 44%). Checked on 2026-11-18 against every light
`[data-theme]` block plus this run's settled hues (nailtech, linuxplus, ea2, ea3, cahambasic,
carscook): no theme within 8 degrees is within 15 saturation and 8 lightness; white text contrast
4.5:1 or better. The hue wheel is crowded; other free slots were 292 75% 40% (violet) and 230 35% 48%
(slate blue). Then run `tools/gen_dark_brand_css.py`.

```css
  /* IRS Annual Filing Season Program AFTR theme */
  [data-theme="afsp"] {
    --brand: 12 45% 44%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 12 45% 96%;
    --brand-hover: 12 45% 38%;
    --brand-dark: 12 45% 36%;
    --brand-darker: 12 40% 26%;
    --brand-muted: 12 25% 70%;
    --brand-border: 12 25% 80%;
    --brand-border-light: 12 20% 89%;
    --brand-gradient-to: 17 50% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `afsp: "IRS Annual Filing Season Program AFTR course test practice on the 2026 Annual Federal Tax Refresher outline (Publication 6079): new law such as the tip, overtime, car loan and senior deductions and the $40,400 SALT limit, 2026 inflation adjustments, filing status, income, Schedule C, itemized deductions and credits, and due diligence, e-file, identity theft and Circular 230 rules.",`
- `EXAM_ORG`: `afsp: "IRS · Annual Filing Season Program, AFTR course test given by IRS-approved CE providers",`
- Hub group: add `"afsp"` to `{ title: "Accounting, CPA and finance exams", ids: [...] }` right after `"ea3"`.
- `SEARCH_ALIASES`:
  `afsp: "aftr aftr test aftr course annual federal tax refresher annual federal tax refresher test annual filing season program afsp afsp test afsp record of completion record of completion irs refresher course tax refresher test irs aftr unenrolled preparer test afsp aftr 2026",`
  (Keep "tax preparer exam" and "enrolled agent" on ea1.)
- `RELATED_OVERRIDES`: not needed (the group has many members).

## tests/test-search-aliases.test.cjs

Proposed cases (next to the ea1 lines):

```js
  ["aftr", "US", "afsp"],
  ["annual federal tax refresher", "US", "afsp"],
  ["annual filing season program", "US", "afsp"],
```

## lib/region.ts

`afsp` is US, the default (ea1 has no line either); add one only if the file lists every US exam.

## lib/examFacts.ts

```ts
  afsp: {
    answer:
      "The Annual Federal Tax Refresher (AFTR) is a 6-hour continuing education course with a comprehension test at the end, part of the IRS Annual Filing Season Program for tax return preparers who are not attorneys, CPAs or enrolled agents. Each AFTR test has 100 multiple-choice questions with four answers and one correct answer, in at most 3 continuous hours, and 70 percent correct is needed to pass. IRS-approved continuing education providers write and give the test from the IRS course outline. The 2026 course covers preparing 2026 individual returns, must be finished by December 31, 2026, and counts toward the 2027 Annual Filing Season Program Record of Completion with 10 more hours of federal tax law and 2 of ethics.",
    rows: [
      { label: "Questions", value: "100 multiple choice, 4 answers each" },
      { label: "Time", value: "Up to 3 continuous hours" },
      { label: "Passing score", value: "70% correct" },
      { label: "Course", value: "6 CE hours, ending in the test" },
      { label: "Tax year covered", value: "2026 returns (2026 course, for the 2027 program)" },
      { label: "Deadline", value: "Course and test done by December 31" },
      { label: "Domains", value: "New tax law, general review, practices and procedures" },
      { label: "Given by", value: "IRS-approved continuing education providers" },
      { label: "Record of Completion", value: "18 CE hours, a renewed PTIN and Circular 230 consent" },
    ],
    basedOn: "IRS Publications 6079 (Rev. 5-2026), 6012 (Rev. 3-2026) and 6026 and the IRS Annual Filing Season Program FAQs, checked November 2026",
    source: { name: "IRS: Annual Filing Season Program frequently asked questions", url: "https://www.irs.gov/tax-professionals/frequently-asked-questions-annual-filing-season-program" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date (comment: afsp).

## TEACHER_LED / TEACHES

None (CE course from approved providers, mostly self-study or webinar; ea1 is not teacher-led and
the landing has no `ExamClassFaq`).

## lib/tigerAssets.ts

`BORROWED_SETS`: `afsp: "cpareg",` (the CPA REG tiger, as ea1).

## lib/examFreshness.json (dated change)

```json
{
  "exam": "afsp",
  "date": "2027-06-01",
  "kind": "outline",
  "what": "Providers start offering the 2027 AFTR course (for 2027 returns and the 2028 AFSP) from a new Publication 6079 outline, with 2027 inflation adjustments from the next revenue procedure.",
  "action": "Read the new Publication 6079 and 6012; move every 2026 figure (Rev. Proc. 2025-32 amounts, Notice 2026-10 mileage, 6695 amounts for returns filed in 2027, SALT $40,400 and $505,000) to the 2027 amounts, and update the landing, examFacts and the source dates.",
  "source": "https://www.irs.gov/pub/irs-pdf/p6079.pdf"
}
```

Then `python3 -I tools/check_freshness.py` and `python3 -I tools/build_exam_sources.py`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, no redirects, the `calculator` icon exists.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing afsp:annual-federal-tax-refresher:40401`

## CLAUDE.md (under Additional Exams, after the Enrolled Agent bullets)

```md
- **AFTR (AFSP)** (`afsp`, the comprehension test at the end of the IRS Annual Federal Tax Refresher course, which non-exempt unenrolled preparers take for the Annual Filing Season Program Record of Completion, `/annual-federal-tax-refresher/*`, landing `/annual-federal-tax-refresher-practice-test`): `data/annual-federal-tax-refresher-questions.json` (200 original questions on IRS Publication 6079 (Rev. 5-2026), the AFTR Course Outline for preparing 2026 individual returns: Domain 1 New Tax Law/Recent Updates as inflation adjustments and reporting (educator $350, student loan interest $85,000 to $100,000 and $175,000 to $205,000, FEIE $132,900, gift exclusion $19,000, 2026 mileage 72.5/20.5/14 cents, Form 1099-K over $20,000 and 200 transactions, $2,000 Form 1099-NEC/MISC threshold) 12, new credit rules (dependent care 50% rate and both phasedowns, refundable adoption credit $5,120, AOTC and LLC SSN and EIN rules and math error, 30C ending after June 30, 2026) 12, new deductions and accounts (IRC 68 2/37 limitation, home equity and mortgage insurance premiums, state-declared disaster casualty losses, 90% wagering losses, SALT $40,400 with the 30% phasedown over $505,000 and $10,000 floor, Schedule 1-A tips, overtime, car loan interest and $6,000 senior deduction, $1,000/$2,000 non-itemizer charitable deduction and 0.5% floor, 529 $20,000 K-12 and credentialing costs, Trump accounts, bronze plans and direct primary care for HSAs) 32; Domain 2 General Review as filing status and dependents (2026 standard deductions, $5,300 qualifying relative limit, tie-breakers, Form 8332, Form 2120) 16, income and retirement (tips, Schedule B, FBAR, Social Security bases, 2026 IRA $7,500 plus $1,100 and phaseouts, RMD age 73, unemployment, alimony before and after 2019, capital losses, 0% rate $49,450, home sale exclusion) 24, Schedule C (hobby, home office, records, 50% meals, section 179 $2,560,000 and $4,090,000, 100% bonus for used property, 2026 auto caps $20,300/$12,300, listed property, SE tax) 16, itemized deductions (7.5% medical floor, 2026 long-term care limits, $750,000 acquisition debt, 60% cash limit, Form 8283, military and intelligence community moves) 12, credits (2026 CTC $2,200 and $1,700 refundable, ODC, CTC phaseout, AOTC, LLC, EITC $12,200 investment limit, $4,427 one-child maximum, ages 25 to 64, separated spouse rule, 10-year ban, Schedule EIC) 16, general topics and due dates (Form 1099-DA, AMT exemption $90,100, $400 minimum QBI deduction, kiddie tax $2,700, Form 8814 under $13,500, ABLE $20,000, disability discharge exclusion, NOL 80%, no PTC repayment cap, FSA $3,400, parking $340, HSA catch-up, 110% safe harbor, estimated tax dates, Form 8888, Form 4868, $535 failure-to-file minimum) 20; Domain 3 Practices, Procedures and Professional Responsibility as identity theft, data security, ITINs and online accounts (Pubs. 5199, 4557, 1915, 5533, 5533-A) 16 and preparer penalties, due diligence, e-file and the AFSP (IRC 6694, 6695 amounts for returns filed in 2027, 7216, Form 8867, Pub. 1345, Rev. Proc. 2014-42 limited representation, Pub. 5646 exempt groups, Circular 230 sections 10.27, 10.28, 10.51) 24), test IDs 40401-40404, sets 40401-40404 (New Tax Law & Recent Updates 56, Filing Status, Income & Schedule C 56, Deductions, Credits & General Topics 48, Practices & Responsibility 40), state `AFSP`, prefix `AFSP-`, 70% pass like the real test (IRS Publication 6012, Rev. 3-2026: 100 multiple-choice questions, four answers and one correct, at most 3 continuous hours, written and given by IRS-approved CE providers at the end of the 6-hour course, finished by December 31; the 2026 course counts for the 2027 AFSP with 10 more hours of federal tax law and 2 of ethics, a renewed PTIN and Circular 230 consent). 3/3/8/4/6/4/3/4/5/4/6 per test (domains 14/26/10, Tigertest's split by topic count; the IRS publishes no weights). Every 2026 figure from Rev. Proc. 2025-32, Notice 2026-10, Rev. Proc. 2025-19, Rev. Proc. 2026-15 and IR-2025-111, new law from the IRC as amended by Public Law 119-21 (read through Cornell LII) and IRS fact sheets; no question about the test itself, no fees, no tip, overtime, car loan or senior phaseout rates. Written against the ea1, ea2, ea3, cpareg and cpatcp banks (about 25 items rewritten for repeated fact-and-answer pairs). Built by `tools/build-run-2026-11-18/afsp/build.py`; sources in `tools/build-run-2026-11-18/afsp/sources.md`. Region US, hub group "Accounting, CPA and finance exams" (after ea3), `[data-theme="afsp"]` muted clay brick (12 45% 44%), borrows the CPA REG tiger, not teacher-led.
```
