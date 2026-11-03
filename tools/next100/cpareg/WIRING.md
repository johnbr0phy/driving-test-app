# Wiring for `cpareg` (CPA Exam, Taxation and Regulation (REG) section, US, v1)

Files already written by the builder: `data/cpa-reg-questions.json` (200, PASS), `lib/banks/cpareg.ts`,
`app/cpa-reg/*` (5 wrappers copied from `app/series-7/`: layout, redirect, dashboard, drill, stats),
`app/cpa-reg-practice-test/page.tsx`, `tools/next100/cpareg/*` (spec, sources, `q_*.py`, `build.py`).
Everything below goes in shared files.

Format note: the real REG section (AICPA blueprints effective January 2026) is 4 hours, 72
multiple-choice questions (two testlets of 36) and 8 task-based simulations, scored 50/50, reported
0 to 99 with 75 to pass (a scaled score, not percent correct). Here: the multiple-choice half only,
four 50-question tests at the midpoints of the five area ranges (I 7, II 10, III 5, IV 14, V 14),
6 content training sets + 4 tests = 10 dashboard steps. Pass line 75% as a readiness target
(`ceil(0.75 * 50) = 38`). Pools are exactly 4x per-test counts, so no item repeats across tests.
Sets are content sets as in the series7 template (sets first, then tests), same as cpafar; if batch
A switches to DMV-style sets, use `testSets(15000, 4)` for both.

## lib/exams.ts

Add `"cpareg"` to the `ExamId` union. Icon `calculator` already exists in the union and `TestIcon`.

```ts
const cpareg: ExamConfig = {
  id: "cpareg",
  stateCode: "CPAREG",
  idBase: 15000,
  slug: "/cpa-reg",
  landingPath: "/cpa-reg-practice-test",
  name: "CPA REG Practice Test",
  shortName: "CPA REG",
  examLabel: "CPA Exam REG section",
  fullName: "CPA Exam Taxation and Regulation (REG) section",
  questionIdPrefix: "CPAREG-",
  icon: "calculator",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // AICPA Uniform CPA Examination Blueprints, effective January 2026 (approved Aug. 18, 2025;
  // checked 2026-11-02), REG: 72 MCQs + 8 TBSs in 4 hours, MCQ 50% of score, 75 scaled to pass.
  // Areas I 10-20%, II 15-25%, III 5-15%, IV 22-32%, V 23-33%; midpoints scaled to 50:
  // I 7 (ethics 3, procedures 4), II 10 (agency/contracts 5, debtor-creditor/federal laws 3,
  // structure 2), III 5, IV 14 (income 5, deductions/losses 5, filing status/credits 4),
  // V 14 (C corps/state 6, S corps/partnerships/LLCs/exempt 8). No indexed amounts (blueprint
  // assumption). TBSs not modelled. All items original.
  blueprint: {
    cparegEthics: 3,
    cparegProcedure: 4,
    cparegContracts: 5,
    cparegCreditors: 3,
    cparegStructure: 2,
    cparegProperty: 5,
    cparegIncome: 5,
    cparegDeductions: 5,
    cparegCredits: 4,
    cparegCorp: 6,
    cparegFlowThrough: 8,
  },
  trainingSets: [
    { setNumber: 1, id: 15001, name: "Ethics & Tax Procedures", categories: ["cparegEthics", "cparegProcedure"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 2, id: 15002, name: "Business Law", categories: ["cparegContracts", "cparegCreditors", "cparegStructure"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 15003, name: "Property & Gross Income", categories: ["cparegProperty", "cparegIncome"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 15004, name: "Deductions, Losses & Credits", categories: ["cparegDeductions", "cparegCredits"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 15005, name: "C Corporations", categories: ["cparegCorp"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 6, id: 15006, name: "S Corps, Partnerships & Exempt Orgs", categories: ["cparegFlowThrough"], size: 32, weightLabel: "8 of 50 test questions" },
  ],
  categoryLabels: {
    cparegEthics: "Ethics, Preparer Rules & Legal Duties",
    cparegProcedure: "Federal Tax Procedures",
    cparegContracts: "Agency & Contracts",
    cparegCreditors: "Debtor-Creditor & Federal Laws",
    cparegStructure: "Business Structure",
    cparegProperty: "Basis & Cost Recovery",
    cparegIncome: "Individual Gross Income",
    cparegDeductions: "Individual Deductions & Loss Limits",
    cparegCredits: "Filing Status, Tax & Credits",
    cparegCorp: "C Corporations & State Tax",
    cparegFlowThrough: "S Corps, Partnerships, LLCs & Exempt Orgs",
  },
  copy: {
    guestPrompt: "to save your CPA REG progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Six sets covering all five areas of the AICPA's REG blueprint. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 multiple-choice questions weighted like the REG blueprint, 75% target",
    heroSubs: [
      "Six sets, four mock tests. Individual and entity tax weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Schedule your REG section.",
    ],
    sourceLine: "Based on the AICPA's 2026 REG blueprint. Original multiple-choice questions; 50 per test, weighted like the real section's five areas, 75% target. Not affiliated with the AICPA or NASBA.",
    analyticsKey: "cpareg",
  },
};
```

Append `cpareg` to the `EXAMS` array right after `cpafar` (which goes after `series7`).

Check: 15001-15004 (tests) and 15001-15006 (sets) are free (batch A table assigns 15000; cpafar
ends at 14907, nmls starts at 15100).

## lib/banks/all.ts

```ts
import "./cpareg";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/cpareg.ts`.

## types/index.ts

- `QuestionType`: add `| "CPAREG"`.
- `QuestionCategory`, under a `// CPA Exam REG` comment:

```ts
  | "cparegEthics"
  | "cparegProcedure"
  | "cparegContracts"
  | "cparegCreditors"
  | "cparegStructure"
  | "cparegProperty"
  | "cparegIncome"
  | "cparegDeductions"
  | "cparegCredits"
  | "cparegCorp"
  | "cparegFlowThrough"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cparegEthics: "Ethics, Preparer Rules & Legal Duties",
    cparegProcedure: "Federal Tax Procedures",
    cparegContracts: "Agency & Contracts",
    cparegCreditors: "Debtor-Creditor & Federal Laws",
    cparegStructure: "Business Structure",
    cparegProperty: "Basis & Cost Recovery",
    cparegIncome: "Individual Gross Income",
    cparegDeductions: "Individual Deductions & Loss Limits",
    cparegCredits: "Filing Status, Tax & Credits",
    cparegCorp: "C Corporations & State Tax",
    cparegFlowThrough: "S Corps, Partnerships, LLCs & Exempt Orgs",
```

## app/globals.css

Hue from the batch A table (170 40% 38%, already checked against every theme). Run
`tools/gen_dark_brand_css.py` once for everyone afterwards.

```css
  /* CPA Exam REG theme */
  [data-theme="cpareg"] {
    --brand: 170 40% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 170 40% 96%;
    --brand-hover: 170 40% 33%;
    --brand-dark: 170 40% 30%;
    --brand-darker: 170 35% 18%;
    --brand-muted: 170 22% 70%;
    --brand-border: 170 22% 80%;
    --brand-border-light: 170 20% 89%;
    --brand-gradient-to: 45 70% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cpareg: "CPA Exam REG multiple-choice practice on the AICPA's 2026 blueprint: Circular 230 and tax procedures, business law, basis and depreciation, individual taxation, C and S corporations and partnerships, with every calculation explained.",`
- `EXAM_ORG`: `cpareg: "AICPA and NASBA · Uniform CPA Examination, REG Core section",`
- Hub group: the same new group cpafar proposes, one entry for both, after
  "Real estate, insurance, securities & notary licenses":
  `{ title: "Accounting and CPA exams", ids: ["cpafar", "cpareg"] },`
  (The integrator may add `cca` if it wants coding there; not needed.)
- `SEARCH_ALIASES`:
  `cpareg: "cpa reg cpa exam regulation taxation and regulation reg section uniform cpa examination aicpa nasba tax individual taxation corporate tax business law circular 230 cpa core accountant license certified public accountant",`
- `RELATED_OVERRIDES` (the group has two members): `cpareg: ["cpafar", "series7", "sie"],`

## lib/region.ts

US exam: no `TEST_REGIONS` entry. Add `"cpareg"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  cpareg: {
    answer:
      "REG, Taxation and Regulation, is one of the three Core sections of the Uniform CPA Examination. It runs 4 hours with 72 multiple-choice questions and 8 task-based simulations, each worth half the score, and scores are reported from 0 to 99 with 75 to pass. Under the AICPA's blueprint effective January 2026 it covers ethics, professional responsibilities and federal tax procedures (10 to 20%), business law (15 to 25%), federal taxation of property transactions (5 to 15%), of individuals (22 to 32%) and of entities (23 to 33%). Candidates are not tested on tax amounts indexed to inflation.",
    rows: [
      { label: "Section time", value: "4 hours" },
      { label: "Multiple-choice questions", value: "72, in two testlets of 36" },
      { label: "Task-based simulations", value: "8" },
      { label: "Score weighting", value: "50% MCQ, 50% simulations" },
      { label: "Passing score", value: "75 on a 0 to 99 scale" },
      { label: "Largest areas", value: "Taxation of entities and of individuals, about 55%" },
      { label: "Run by", value: "AICPA, with NASBA and state boards of accountancy" },
    ],
    basedOn: "the AICPA's Uniform CPA Examination Blueprints effective January 2026 and NASBA's score information, checked November 2026",
    source: { name: "AICPA: Learn what is tested on the CPA Exam", url: "https://www.aicpa-cima.com/resources/download/learn-what-is-tested-on-the-cpa-exam" },
  },
```
(Fee deliberately left out; it varies by state board.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx, TEACHER_LED

Nothing: candidates self-study (the template adds no TEACHES line); the landing does not render `ExamClassFaq`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing: sitemaps map over `EXAMS`, no redirects, `calculator` icon exists, tiger falls back to the
DMV one (the integrator may borrow cpafar's choice through `BORROWED_SETS` so the two match).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 40).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cpareg:cpa-reg:15001`

## CLAUDE.md (under Additional Exams, after the CPA FAR bullet)

```md
- **CPA REG** (Uniform CPA Examination, Taxation and Regulation Core section, multiple choice only, `/cpa-reg/*`, landing `/cpa-reg-practice-test`): `data/cpa-reg-questions.json` (200 questions on the AICPA blueprint effective January 2026, area midpoints: ethics, preparer rules and legal duties 12, federal tax procedures 16, agency and contracts 20, debtor-creditor and federal laws 12, business structure 8, basis and cost recovery 20, individual gross income 20, deductions and loss limits 20, filing status, tax and credits 16, C corporations and state tax 24, S corporations, partnerships, LLCs and exempt organizations 32), test IDs 15001-15004 (50 questions each; the real section is 72 MCQs and 8 TBSs in 4 hours, 75 scaled to pass), sets 15001-15006, state `CPAREG`, 75% target. 3/4/5/3/2/5/5/5/4/6/8 per test. No amount indexed to inflation (the blueprint does not test them) and nothing the 2025 tax act changed in amount; TBSs not modelled. Book-tax items are Schedule M-1 computations so they do not repeat FAR's deferred tax items. Built by `tools/next100/cpareg/build.py`; sources in `tools/next100/cpareg/sources.md`.
```
