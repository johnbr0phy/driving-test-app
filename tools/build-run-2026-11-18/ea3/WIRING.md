# Wiring for `ea3` (IRS SEE Part 3: Representation, Practices and Procedures, US, v1)

Files already written by the builder: `data/enrolled-agent-part-3-questions.json` (200, PASS,
key-longest 5%), `lib/banks/ea3.ts`, `app/enrolled-agent-part-3/*` (layout, redirect, dashboard,
drill, stats, copied from `app/enrolled-agent-part-1/`; no test or practice folders),
`app/enrolled-agent-part-3-practice-test/page.tsx` (copied from the ea1 landing, same classes),
`tools/build-run-2026-11-18/ea3/*` (sources.md, `q_*.py`, `build.py`, this file). Everything
below goes in shared files.

Rebuild: `python3 -I tools/build-run-2026-11-18/ea3/build.py`, then validate:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/enrolled-agent-part-3-questions.json --pool ea3Practice=36 --pool ea3Sanctions=24 --pool ea3Poa=28 --pool ea3Case=32 --pool ea3Collection=28 --pool ea3Exam=20 --pool ea3Filing=32`

Format: 4 tests x 50, four topic sets (60/60/48/32), 8 dashboard steps; pools exactly 4x per test.
Premium by the v1 default (last two steps). Not teacher-led.

## lib/exams.ts

Add `"ea3"` to the `ExamId` union. Icon `calculator` exists (used by ea1). Add before `const htl`
and append `ea3` to `EXAMS` right after `ea1` (and after `ea2` once it lands).

```ts
const ea3: ExamConfig = {
  id: "ea3",
  stateCode: "EA3",
  idBase: 34700,
  slug: "/enrolled-agent-part-3",
  landingPath: "/enrolled-agent-part-3-practice-test",
  name: "Enrolled Agent Part 3 Practice Test",
  shortName: "EA Exam Part 3",
  examLabel: "SEE Part 3",
  fullName: "IRS Special Enrollment Examination (SEE) Part 3: Representation, Practices and Procedures",
  questionIdPrefix: "EA3-",
  icon: "calculator",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // IRS SEE Candidate Information Bulletin (PSI), revised October 9, 2026, Part 3 content outline:
  // 85 scored of 100 questions in 3.5 hours. Domains of 85: Practices and Procedures 26,
  // Representation before the IRS 25, Specific Areas of Representation 20, Filing Process 14.
  // Scaled to 50: 15/15/12/8, split as Practice 9 + Sanctions 6, Power of Attorney 7 + Case 8,
  // Collection 7 + Exam 5, Filing 8 (Tigertest's split inside each domain). The July 1, 2026 to
  // February 28, 2027 window uses law as amended through December 31, 2025. The real result is
  // scaled 200 to 800 with 500 to pass; 70% is a readiness marker. All items original.
  blueprint: {
    ea3Practice: 9,
    ea3Sanctions: 6,
    ea3Poa: 7,
    ea3Case: 8,
    ea3Collection: 7,
    ea3Exam: 5,
    ea3Filing: 8,
  },
  trainingSets: [
    { setNumber: 1, id: 34701, name: "Practices & Procedures", categories: ["ea3Practice", "ea3Sanctions"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 2, id: 34702, name: "Representation Before the IRS", categories: ["ea3Poa", "ea3Case"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 3, id: 34703, name: "Collections, Audits & Appeals", categories: ["ea3Collection", "ea3Exam"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 34704, name: "Filing Process", categories: ["ea3Filing"], size: 32, weightLabel: "8 of 50 test questions" },
  ],
  categoryLabels: {
    ea3Practice: "Practice Before the IRS",
    ea3Sanctions: "Sanctions & Penalties",
    ea3Poa: "Power of Attorney & Disclosure",
    ea3Case: "Building the Taxpayer's Case",
    ea3Collection: "Collection & Abatement",
    ea3Exam: "Examinations & Appeals",
    ea3Filing: "Filing Process & E-file",
  },
  copy: {
    guestPrompt: "to save your Enrolled Agent Part 3 progress and track every question you miss",
    trainingHeading: "Train by IRS Part 3 domain",
    trainingSub: "Four sets covering all four domains of the IRS Part 3 outline: Circular 230, representation, collections, audits and appeals, and e-file. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Four training sets, four practice tests. Start with Practices & Procedures.",
      "Master each set, then take a practice test.",
      "Keep going. Take a practice test to see where you stand.",
      "Review your mistakes, then retake any test you haven't passed.",
      "All done. You're ready for SEE Part 3.",
    ],
    sourceLine: "Based on the IRS SEE Part 3 content outline and Circular 230. Original questions; 50 per test, weighted like the real exam. Not affiliated with the IRS or PSI.",
    analyticsKey: "ea3",
  },
};
// IDs: tests 34701-34704, sets 34701-34704 (block 34700 assigned for this run).
```

## lib/banks/all.ts

`import "./ea3";`

## types/index.ts

- `QuestionType`: add `"EA3"`.
- `QuestionCategory` (comment `// IRS SEE Part 3 (ea3)`):
  `"ea3Practice" | "ea3Sanctions" | "ea3Poa" | "ea3Case" | "ea3Collection" | "ea3Exam" | "ea3Filing"`

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ea3Practice: "Practice Before the IRS",
    ea3Sanctions: "Sanctions & Penalties",
    ea3Poa: "Power of Attorney & Disclosure",
    ea3Case: "Building the Taxpayer's Case",
    ea3Collection: "Collection & Abatement",
    ea3Exam: "Examinations & Appeals",
    ea3Filing: "Filing Process & E-file",
```

## app/globals.css

Suggested hue 137 45% 36%, ledger green (white text passes 4.5:1; checked against every theme in
`app/globals.css` and the `--brand` lines in this run's other WIRING.md files with the clash rule;
re-check against ea2 when it lands). Then run `tools/gen_dark_brand_css.py`.

```css
  /* IRS SEE Part 3 theme: ledger green */
  [data-theme="ea3"] {
    --brand: 137 45% 36%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 137 40% 95%;
    --brand-hover: 137 45% 30%;
    --brand-dark: 137 45% 24%;
    --brand-darker: 137 40% 15%;
    --brand-muted: 137 20% 70%;
    --brand-border: 137 25% 80%;
    --brand-border-light: 137 25% 89%;
    --brand-gradient-to: 152 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ea3: "IRS Enrolled Agent Special Enrollment Examination Part 3 (Representation, Practices and Procedures) practice on the IRS content outline: Circular 230 duties and sanctions, preparer penalties, powers of attorney, collection, abatement, audits and appeals, records and IRS e-file.",`
- `EXAM_ORG`: `ea3: "IRS · Special Enrollment Examination (SEE) Part 3, given by PSI",`
- Hub group "Accounting, CPA and finance exams": insert `"ea3"` right after `"ea1"` (after `"ea2"`
  once it lands).
- `SEARCH_ALIASES`:
  `ea3: "ea part 3 ea exam part 3 see part 3 enrolled agent part 3 enrolled agent representation representation practices and procedures circular 230 irs practice rules power of attorney exam ea3",`
  Keep plain "enrolled agent" on ea1 (`tests/test-search-aliases.test.cjs` expects it).
- `tests/test-search-aliases.test.cjs` cases to add:
  `["ea exam part 3", "US", "ea3"], ["see part 3", "US", "ea3"], ["circular 230", "US", "ea3"],`
- `RELATED_OVERRIDES`: none needed (the hub group has 10 other members).

## lib/region.ts

Nothing: US is the default region (ea1 has no `TEST_REGIONS` line).

## lib/examFacts.ts

```ts
  ea3: {
    answer:
      "The Special Enrollment Examination (SEE) is the IRS exam for becoming an enrolled agent, a tax practitioner who can represent taxpayers before the IRS. Part 3 covers representation, practices and procedures. Each of the three parts has 100 multiple-choice questions, 85 scored and 15 unscored, in 3.5 hours, and results are scaled from 200 to 800 with 500 to pass, which is not a fixed percentage. Part 3's four domains are practices and procedures (26 scored questions), representation before the IRS (25), specific areas of representation (20) and the filing process (14). For exams from July 1, 2026 to February 28, 2027, questions follow the Code, regulations and IRS forms and publications as amended through December 31, 2025, and the bulletin names Treasury Department Circular 230 as a study source.",
    rows: [
      { label: "Questions", value: "100 (85 scored, 15 unscored)" },
      { label: "Time", value: "3.5 hours" },
      { label: "Passing score", value: "500 on a 200 to 800 scale" },
      { label: "Rules tested", value: "Law as of December 31, 2025, for July 1, 2026 to February 28, 2027" },
      { label: "Largest domains", value: "Practices and procedures 26, representation 25" },
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

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date, comment naming `ea3`.

## TEACHER_LED / TEACHES

None (like ea1).

## lib/tigerAssets.ts

`BORROWED_SETS`: `ea3: "cpareg",` (the CPA REG tiger, like ea1).

## lib/examFreshness.json

```json
    {
      "exam": "ea3",
      "date": "2027-05-01",
      "kind": "outline",
      "what": "SEE testing pauses in March and April 2027 while the exam is updated; the next window will test law as amended through December 31, 2026 under a new Candidate Information Bulletin.",
      "action": "Read the new bulletin's Part 3 outline and weights; update any item a 2026 law change or revised IRS publication touches (Circular 230, Pubs. 1345 and 3112, Form 2848 instructions, the First Time Abate move to Automatic Exemption from Penalty).",
      "source": "https://www.irs.gov/tax-professionals/enrolled-agents/enrolled-agents-frequently-asked-questions"
    },
```

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. No set exceeds 60 (largest 60), so no parts.

## lib/examSources.json

Run `python3 -I tools/build_exam_sources.py` (sources.md is in place).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ea3:enrolled-agent-part-3:34701`

## CLAUDE.md (under Additional Exams, after the Enrolled Agent Part 1 bullet, or Part 2's once it lands)

```md
- **Enrolled Agent Part 3** (`ea3`, IRS Special Enrollment Examination Part 3: Representation, Practices and Procedures, given by PSI, `/enrolled-agent-part-3/*`, landing `/enrolled-agent-part-3-practice-test`): `data/enrolled-agent-part-3-questions.json` (200 original questions on the Part 3 content outline in PSI's Candidate Information Bulletin revised October 9, 2026, domains 26/25/20/14 of 85: practice before the IRS (Circular 230 Rev. 6-2014: who may practice, limited practice and fiduciaries, 10.20 to 10.31 duties, contingent fee exceptions with the 120-day rule, 30-day conflict confirmation and 36-month retention, records in fee disputes, advertising, check negotiation, 10.34 to 10.37 standards, EA renewal and CE of 72 hours a cycle and 16 a year with ethics, 50-minute contact hours, 60-day address change, PTIN) 36, sanctions and penalties (censure, monetary penalty cap, 10.51 to 10.52, expedited suspension, 5-year reinstatement, 6694 standards and the 15% in 30 days rule, 6695(f) and (g), 6696 3 years, 6107, 6060, 7216 consent, valuation misstatements, 6702, badges of fraud, 6663(b), negligence) 24, power of attorney and disclosure (Forms 2848 and 8821, CAF, general references returned, 3 future years, signing returns, joint filers, 45 days, REVOKE and WITHDRAW, line 4 and line 5a, Form 907, two notice recipients, Form 56, AFSP limits, TFRP coverage, innocent spouse, intermediate service providers, Form 8822, durable POAs, e-signatures, family members, BBA partnership representative) 28, building the case (Collection Financial Standards, bankruptcy 3-year, 240-day and 2-year rules, documentation, IRM and revenue procedures, 6501 no return and Form 872, 6511 lookback, math error 60 days, CP2000, 7602(c) 45 days, FOIA, avoidance vs evasion, Form 8275-R, TAS Form 911, identity theft, court levels, criminal exposure, transcripts, Form 433-A) 32, collection and abatement (Form 1127, installment rate 0.25%, levy-notice 1%, OIC 20% and 24 months, CAP vs CDP, lien and levy windows, equivalent hearing, CNC, CSED and its suspension, TFRP notice and assessment period, Form 843, 6404(e), reasonable cause, first-time abatement, audit reconsideration, passports) 28, examinations and appeals (7605, 7525 limits, 7491, 7521 recording, consultation and bypass, repeat exams, 30- and 90-day letters, 150 days abroad, small case request, formal protests, 365 days on the statute, Tax Court cases in Appeals, fast track mediation, 21-day billing) 20, filing process (software review, records retention, FTC Safeguards Rule, stakeholder liaison, EFIN fingerprinting, 11-return e-file requirement and Form 8948, Form 8944, ERO role, advertising, Levels One to Three, administrative review, Form 8879 retention and PINs, rejected returns, Form 8453, Form 8888) 32), test IDs 34701-34704, sets 34701-34704 (Practices & Procedures 60, Representation Before the IRS 60, Collections, Audits & Appeals 48, Filing Process 32), state `EA3`, prefix `EA3-`, 70% readiness line (the real Part 3 is 100 questions, 85 scored, in 3.5 hours, scaled 200 to 800 with 500 to pass; up to four attempts a part each window; passed parts carry over three years). 9/6/7/8/7/5/8 per test, the outline's 26/25/20/14 of 85 scaled to 15/15/12/8 (the split inside each domain is Tigertest's). Law as amended through December 31, 2025; no penalty amounts, user fees or indexed thresholds; First Time Abate asked only as the 3-year history it shares with the 2026 Automatic Exemption from Penalty. Written against the ea1, ea2, cpareg, cpaaud and cpatcp banks and scanned for repeated fact-and-answer pairs. Built by `tools/build-run-2026-11-18/ea3/build.py`; sources in `tools/build-run-2026-11-18/ea3/sources.md`. Region US, hub group "Accounting, CPA and finance exams" (after ea1/ea2), `[data-theme="ea3"]` ledger green (137 45% 36%), borrows the CPA REG tiger, not teacher-led.
```
