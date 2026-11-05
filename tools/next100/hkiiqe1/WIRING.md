# Wiring for `hkiiqe1` (Hong Kong IIQE Paper 1, Principles and Practice of Insurance, v1, region HK)

Files already written by the builder: `data/hkiiqe1-questions.json` (200, PASS, key-longest 19%),
`lib/banks/hkiiqe1.ts`, `app/iiqe-paper-1/*` (layout, redirect, dashboard, drill, stats, copied from
`app/llqp/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/iiqe-paper-1-practice-test/page.tsx`, `tools/next100/hkiiqe1/*` (spec, sources, `q_*.py`,
`build.py`, this file). Everything below goes in shared files.

Format note: the real IIQE Paper I (PEAK Exam Centre of the VTC, for the Insurance Authority;
handbook effective 1 September 2026) is 75 multiple-choice questions in 2 hours, 70% to pass,
presented in English and Chinese, pencil-and-paper or computer screen mode (remote invigilation
also offered for Papers I to III), results pass or fail only. The IA Study Notes (2024 Edition,
for exams from 17 February 2025) weight the seven chapters 12/16/30/9/5/21/7. Here: four 50-question
mock tests at those weights (6/8/15/5/2/11/3, Chapter 3 split 5/5/5 and Chapter 6 split 5/6), four
content training sets, so 4 sets + 4 tests = 8 dashboard steps, sets first. Pass line 70%.
Pools are exactly 4x per-test counts.

## lib/exams.ts

Add `"hkiiqe1"` to the `ExamId` union. Icon `umbrella` already exists.

```ts
const hkiiqe1: ExamConfig = {
  id: "hkiiqe1",
  stateCode: "HKIIQE1",
  idBase: 18100,
  slug: "/iiqe-paper-1",
  landingPath: "/iiqe-paper-1-practice-test",
  name: "IIQE Paper 1 Practice Test",
  shortName: "IIQE Paper 1",
  examLabel: "IIQE Paper 1",
  fullName: "IIQE Paper I: Principles and Practice of Insurance",
  questionIdPrefix: "HKIIQE1-",
  icon: "umbrella",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Hong Kong Insurance Intermediaries Qualifying Examination, Paper I (compulsory): 75 MCQ in
  // 2 hours, 70% to pass, English and Chinese (PEAK/VTC handbook effective 1 September 2026).
  // Weighted by the IA Study Notes (2024 Edition) chapter weights 12/16/30/9/5/21/7 scaled to 50:
  // Ch1 risk 6; Ch2 contract and agency 8; Ch3 principles 15 = insurable interest and utmost good
  // faith 5, proximate cause and indemnity 5, contribution and subrogation 5; Ch4 insurer functions 5;
  // Ch5 market 2; Ch6 regulation 11 = insurers 5, intermediaries 6; Ch7 ethics 3.
  // All items original; Hong Kong law and IA codes as of November 2026.
  blueprint: {
    iiqeRisk: 6,
    iiqeLaw: 8,
    iiqeGoodFaith: 5,
    iiqeIndemnity: 5,
    iiqeContribution: 5,
    iiqeCompany: 5,
    iiqeMarket: 2,
    iiqeInsurers: 5,
    iiqeIntermediaries: 6,
    iiqeEthics: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 18101, name: "Risk, Contract & Agency", categories: ["iiqeRisk", "iiqeLaw"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 2, id: 18102, name: "Principles of Insurance", categories: ["iiqeGoodFaith", "iiqeIndemnity", "iiqeContribution"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 3, id: 18103, name: "Insurers & the Hong Kong Market", categories: ["iiqeCompany", "iiqeMarket"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 4, id: 18104, name: "Regulation & Ethics", categories: ["iiqeInsurers", "iiqeIntermediaries", "iiqeEthics"], size: 56, weightLabel: "14 of 50 test questions" },
  ],
  categoryLabels: {
    iiqeRisk: "Risk and Insurance",
    iiqeLaw: "Contract and Agency Law",
    iiqeGoodFaith: "Insurable Interest & Utmost Good Faith",
    iiqeIndemnity: "Proximate Cause & Indemnity",
    iiqeContribution: "Contribution & Subrogation",
    iiqeCompany: "Core Functions of an Insurer",
    iiqeMarket: "Hong Kong Insurance Market",
    iiqeInsurers: "Regulation of Insurers",
    iiqeIntermediaries: "Licensing & Conduct of Intermediaries",
    iiqeEthics: "Ethics, Privacy, AML & Anti-Bribery",
  },
  copy: {
    guestPrompt: "to save your IIQE Paper 1 progress and track every question you miss",
    trainingHeading: "Train by chapter",
    trainingSub: "Four sets that follow the Study Notes: risk with contract and agency, the principles of insurance, insurers and the market, and regulation with ethics. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions weighted by chapter, 70% to pass",
    heroSubs: [
      "Seven chapters, four mock tests. The principles of insurance are 30% of the paper.",
      "Master each chapter set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your IIQE Paper 1.",
    ],
    sourceLine: "Based on the Insurance Authority's Study Notes for Principles and Practice of Insurance (2024 Edition), the Insurance Ordinance and IA codes as of November 2026. Original questions; 50 per test, weighted by chapter. Not affiliated with the Insurance Authority, the VTC or the PEAK Exam Centre.",
    analyticsKey: "hkiiqe1",
  },
};
```

Append `hkiiqe1` to the `EXAMS` array after `llqp` (or next to `hklesfi1` if the integrator groups the
Hong Kong exams). Check: 18101-18104 (tests and sets) must be free (the batch assigns 18100).

## lib/banks/all.ts

```ts
import "./hkiiqe1";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/hkiiqe1.ts`.

## types/index.ts

- `QuestionType`: add `| "HKIIQE1"`.
- `QuestionCategory`, under a `// IIQE Paper 1 (Hong Kong insurance intermediaries)` comment:

```ts
  | "iiqeRisk"
  | "iiqeLaw"
  | "iiqeGoodFaith"
  | "iiqeIndemnity"
  | "iiqeContribution"
  | "iiqeCompany"
  | "iiqeMarket"
  | "iiqeInsurers"
  | "iiqeIntermediaries"
  | "iiqeEthics"
```

(Grepped: no existing `iiqe` keys. `hklesfi1` uses its own prefix.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    iiqeRisk: "Risk and Insurance",
    iiqeLaw: "Contract and Agency Law",
    iiqeGoodFaith: "Insurable Interest & Utmost Good Faith",
    iiqeIndemnity: "Proximate Cause & Indemnity",
    iiqeContribution: "Contribution & Subrogation",
    iiqeCompany: "Core Functions of an Insurer",
    iiqeMarket: "Hong Kong Insurance Market",
    iiqeInsurers: "Regulation of Insurers",
    iiqeIntermediaries: "Licensing & Conduct of Intermediaries",
    iiqeEthics: "Ethics, Privacy, AML & Anti-Bribery",
```

## app/globals.css

Hue from the international batch 1 table (215 70% 22%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* IIQE Paper 1 (Hong Kong insurance intermediaries) theme */
  [data-theme="hkiiqe1"] {
    --brand: 215 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 215 70% 96%;
    --brand-hover: 215 70% 17%;
    --brand-dark: 215 70% 16%;
    --brand-darker: 215 65% 10%;
    --brand-muted: 215 25% 70%;
    --brand-border: 215 25% 80%;
    --brand-border-light: 215 22% 89%;
    --brand-gradient-to: 210 80% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `hkiiqe1: "IIQE Paper 1 practice for a Hong Kong insurance licence: risk, contract and agency law, insurable interest, utmost good faith, indemnity, contribution and subrogation, the Insurance Ordinance and intermediary licensing, and ethics, in four 50-question mock tests weighted like the Study Notes.",`
- `EXAM_ORG`: `hkiiqe1: "Insurance Authority · IIQE Paper I, run by the VTC's PEAK Exam Centre",`
- Hub group (new, shared with `hklesfi1`): `{ title: "Hong Kong insurance and securities exams", ids: ["hkiiqe1", "hklesfi1"] }`
  right after `{ title: "Hong Kong driving tests", ids: ["hkdrive"] }`. If `hklesfi1` is not wired,
  use `ids: ["hkiiqe1"]`.
- `SEARCH_ALIASES`:
  `hkiiqe1: "iiqe iiqe paper 1 iiqe paper i iiqe p1 principles and practice of insurance hong kong insurance exam hk insurance licence insurance intermediaries qualifying examination insurance agent exam hong kong technical representative exam insurance authority ia licence vtc peak iiqe mock exam 保險中介人資格考試 卷一 保險原理及實務",`
- `RELATED_OVERRIDES`: `hkiiqe1: ["hklesfi1", "llqp", "pnc"],` (a small group needs padding; use
  `["hkdrive", "llqp", "pnc"]` if `hklesfi1` is not wired).

## lib/region.ts

`hkiiqe1: "HK",` in `TEST_REGIONS`, and add `"hkiiqe1"` to `NON_DRIVING_TESTS`.

Optional HK homepage line (`REGION_HOME.HK`): the homepage stays led by the driving test; if the
integrator wants the new exam named, change `description` to
"Free practice for Hong Kong: the Transport Department driving written test and IIQE Paper 1 for an insurance licence, original questions with every answer explained. No account needed."
Nothing else in the region block needs to change; the catalog lists the new group automatically.

## lib/examFacts.ts

```ts
  hkiiqe1: {
    answer:
      "IIQE Paper I, Principles and Practice of Insurance, is the compulsory paper of Hong Kong's Insurance Intermediaries Qualifying Examination, which anyone seeking an Insurance Authority licence as an insurance agent, technical representative (agent) or technical representative (broker) must pass, together with the paper for their line of business. The Vocational Training Council runs it for the Insurance Authority through its PEAK Exam Centre. Paper I has 75 multiple-choice questions in 2 hours, presented in both English and Chinese, and the pass mark is 70%. It can be taken on paper or on a computer screen, and remote invigilation is offered for Paper I. Results are given as pass or fail only.",
    rows: [
      { label: "Questions", value: "75 multiple choice" },
      { label: "Time", value: "2 hours" },
      { label: "Pass mark", value: "70%" },
      { label: "Languages", value: "English and Chinese" },
      { label: "Syllabus", value: "IA Study Notes, 2024 Edition, seven chapters" },
      { label: "Run by", value: "VTC (PEAK Exam Centre) for the Insurance Authority" },
    ],
    basedOn: "PEAK Exam Centre IIQE handbook effective 1 September 2026 and the Paper I syllabus, checked November 2026",
    source: { name: "PEAK Exam Centre: Insurance Intermediaries Qualifying Examination", url: "https://www.peak.edu.hk/exam/en/iiqe" },
  },
```
(Fees change, so they are left out.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing required (people mostly self-study the Study Notes). IIQE preparation courses are common in
Hong Kong (VTC and insurers' agency training), so an optional `hkiiqe1: "IIQE preparation courses"`
TEACHES line is reasonable if the integrator wants it.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing required: sitemaps map over `EXAMS`, no redirects, `umbrella` icon exists, tiger falls back
to the DMV one. Suggested: borrow the life and health insurance set through `BORROWED_SETS`
(`hkiiqe1: "insurance"`), as `llqp` does.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 60, Principles of Insurance).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing hkiiqe1:iiqe-paper-1:18101`

## CLAUDE.md (under Additional Exams, after the LLQP bullet)

```md
- **IIQE Paper 1** (Hong Kong Insurance Intermediaries Qualifying Examination, Paper I: Principles and Practice of Insurance, the compulsory paper for an Insurance Authority licence, run by the VTC's PEAK Exam Centre, `/iiqe-paper-1/*`, landing `/iiqe-paper-1-practice-test`): `data/hkiiqe1-questions.json` (200 original questions on the IA Study Notes, 2024 Edition, for exams from 17 February 2025, chapters weighted 12/16/30/9/5/21/7: risk and insurance 24, contract and agency law 32, insurable interest and utmost good faith 20, proximate cause and indemnity 20, contribution and subrogation 20, core functions of an insurer 20, Hong Kong market 8, regulation of insurers (IO, IA, Code of Conduct for Insurers, ICB) 20, licensing and conduct of intermediaries (regulated activities, section 68, GL23, codes of conduct, GL24 CPD) 24, ethics, privacy, AML and anti-bribery 12), test IDs 18101-18104 (50 questions each), sets 18101-18104 (by chapter group), state `HKIIQE1`, prefix `HKIIQE1-`, category keys `iiqe*`, 70% pass like the real paper. 6/8/5/5/5/5/2/5/6/3 per test. The real paper is 75 questions in 2 hours, English and Chinese, pencil-and-paper, computer screen or remote invigilation, pass or fail only (PEAK handbook effective 1 September 2026); its combination-of-statements questions are written as single answer. No dollar figures except worked average, excess and subrogation sums. Built by `tools/next100/hkiiqe1/build.py`; sources in `tools/next100/hkiiqe1/sources.md`. Region HK, hub group "Hong Kong insurance and securities exams" (with LE Paper 1), `[data-theme="hkiiqe1"]` deep navy blue (215 70% 22%), borrows the life and health insurance tiger.
```
