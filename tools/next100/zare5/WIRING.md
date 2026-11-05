# Wiring for `zare5` (RE5 Regulatory Examination for Representatives, FAIS, v1, region ZA)

Files already written by the builder: `data/re5-questions.json` (200, PASS, key-longest 12%,
key over 1.2x the wrong-option average 5%), `lib/banks/zare5.ts`, `app/re5-exam/*` (layout,
redirect, dashboard, drill, stats, copied from `app/llqp/`; no test or practice folders, the shared
`app/[slug]` routes serve them), `app/re5-exam-practice-test/page.tsx`, `tools/next100/zare5/*`
(spec, sources, `q_*.py`, `build.py`, this file). Everything below goes in shared files.

Format note (FSCA Preparation Guide for Regulatory Examinations RE 1 and RE 5, 17 January 2026,
v1, checked 2026-11-05): RE5 is 50 multiple-choice questions with four options, 2 hours, each
question 2%, pass mark 66%, no negative marking, closed book, paper format, unlimited attempts,
one examination body (Moonstone) under an FSCA mandate. Eight tasks (RE5 task map, 14 January 2025),
every task covered at least once; no per-task weights published. Here: four 50-question mock tests
(the real length) with the 66% line, split per test as Task 1 6, Task 2 6, Task 3 3, Task 4 13
(7 + 6), Task 5 3, Task 6 5, Task 7 3, Task 8 11 (7 + 4), Tigertest's split led by the number of
qualifying criteria per task. Four content training sets, sets first, so 4 + 4 = 8 dashboard steps.
Pools are exactly 4x per-test counts. `passPct: 66` gives a line of 33 of 50, like the real exam.

## lib/exams.ts

Add `"zare5"` to the `ExamId` union. Icon `umbrella` already exists.

```ts
const zare5: ExamConfig = {
  id: "zare5",
  stateCode: "ZARE5",
  idBase: 20500,
  slug: "/re5-exam",
  landingPath: "/re5-exam-practice-test",
  name: "RE5 Practice Test",
  shortName: "RE5",
  examLabel: "RE5 exam",
  fullName: "RE5 Regulatory Examination for Representatives (FAIS)",
  questionIdPrefix: "ZARE5-",
  icon: "umbrella",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 66,
  // FSCA Preparation Guide for Regulatory Examinations (17 January 2026, v1): RE5 is 50 MCQs, four
  // options, 2 hours, 66% to pass, no negative marking; eight tasks (RE5 task map, 14 January 2025),
  // each covered at least once, no weights published. Tigertest's split per 50, led by the number of
  // qualifying criteria per task (4/9/3/14/2/2/1/12): Task 1 FAIS Act, products and compliance
  // officer 6; Task 2 licence and undesirable practices 6; Task 3 key individuals 3; Task 4 General
  // Code of Conduct 13 (duties, conflicts, disclosures 7; advice, client funds, complaints 6);
  // Task 5 records 3; Task 6 FIC Act 5; Task 7 Ombud for FSPs 3; Task 8 representatives 7 and
  // debarment 4. South African law as of November 2026; no rand amounts.
  blueprint: {
    zare5Framework: 6,
    zare5Licence: 6,
    zare5KeyInd: 3,
    zare5Disclosure: 7,
    zare5Advice: 6,
    zare5Records: 3,
    zare5Fica: 5,
    zare5Ombud: 3,
    zare5Rep: 7,
    zare5Debar: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 20501, name: "FAIS Act, Licence & Key Individuals", categories: ["zare5Framework", "zare5Licence", "zare5KeyInd"], size: 60, weightLabel: "Tasks 1 to 3 · 15 of 50 test questions" },
    { setNumber: 2, id: 20502, name: "General Code of Conduct", categories: ["zare5Disclosure", "zare5Advice"], size: 52, weightLabel: "Task 4 · 13 of 50 test questions" },
    { setNumber: 3, id: 20503, name: "Records, FIC Act & the Ombud", categories: ["zare5Records", "zare5Fica", "zare5Ombud"], size: 44, weightLabel: "Tasks 5 to 7 · 11 of 50 test questions" },
    { setNumber: 4, id: 20504, name: "Representatives & Debarment", categories: ["zare5Rep", "zare5Debar"], size: 44, weightLabel: "Task 8 · 11 of 50 test questions" },
  ],
  categoryLabels: {
    zare5Framework: "FAIS Act, Financial Products & Compliance Officer",
    zare5Licence: "Maintaining the FSP Licence & Undesirable Practices",
    zare5KeyInd: "Key Individuals",
    zare5Disclosure: "General Duties, Conflicts & Disclosures",
    zare5Advice: "Advice, Client Funds & Complaints",
    zare5Records: "Record Keeping",
    zare5Fica: "FIC Act & Money Laundering Control",
    zare5Ombud: "The Ombud for FSPs",
    zare5Rep: "The Representative: Role, Fit & Proper, Supervision",
    zare5Debar: "Debarment",
  },
  copy: {
    guestPrompt: "to save your RE5 progress and track every question you miss",
    trainingHeading: "Train by task",
    trainingSub: "Four sets that follow the RE5's eight tasks: the FAIS Act, licence and key individuals, the General Code of Conduct, records, the FIC Act and the Ombud, and representatives and debarment. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across all eight tasks, 66% to pass",
    heroSubs: [
      "Eight tasks, 50 questions, 66% to pass. Start with the FAIS Act.",
      "Master each task's set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your RE5.",
    ],
    sourceLine: "Based on the RE5 task map and qualifying criteria, the FAIS Act, the General Code of Conduct, BN 194 of 2017 and the FIC Act as of November 2026. Original questions; 50 per test, like the real exam. Not affiliated with the FSCA or the examination body.",
    analyticsKey: "zare5",
  },
};
```

Append `zare5` to the `EXAMS` array after `zak53c3` (or after the last international batch 3 ZA exam).

Check: 20501-20504 (tests and sets) must be free (the batch assigns 20500).

## lib/banks/all.ts

```ts
import "./zare5";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/zare5.ts`.

## types/index.ts

- `QuestionType`: add `| "ZARE5"`.
- `QuestionCategory`, under a `// RE5 (South Africa FAIS representatives)` comment:

```ts
  | "zare5Framework"
  | "zare5Licence"
  | "zare5KeyInd"
  | "zare5Disclosure"
  | "zare5Advice"
  | "zare5Records"
  | "zare5Fica"
  | "zare5Ombud"
  | "zare5Rep"
  | "zare5Debar"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    zare5Framework: "FAIS Act, Financial Products & Compliance Officer",
    zare5Licence: "Maintaining the FSP Licence & Undesirable Practices",
    zare5KeyInd: "Key Individuals",
    zare5Disclosure: "General Duties, Conflicts & Disclosures",
    zare5Advice: "Advice, Client Funds & Complaints",
    zare5Records: "Record Keeping",
    zare5Fica: "FIC Act & Money Laundering Control",
    zare5Ombud: "The Ombud for FSPs",
    zare5Rep: "The Representative: Role, Fit & Proper, Supervision",
    zare5Debar: "Debarment",
```

## app/globals.css

Hue from the international batch 3 table (40 55% 22%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* RE5 (South Africa FAIS representatives) theme */
  [data-theme="zare5"] {
    --brand: 40 55% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 40 55% 96%;
    --brand-hover: 40 55% 17%;
    --brand-dark: 40 55% 16%;
    --brand-darker: 40 50% 10%;
    --brand-muted: 40 25% 70%;
    --brand-border: 40 25% 80%;
    --brand-border-light: 40 20% 89%;
    --brand-gradient-to: 40 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `zare5: "RE5 practice for South African FAIS representatives: the FAIS Act and financial products, FSP licences and key individuals, the General Code of Conduct, record keeping, the FIC Act, the Ombud for FSPs, fit and proper requirements and debarment, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `zare5: "Financial Sector Conduct Authority (FSCA) · regulatory examination for representatives",`
- Hub group: new group right after "South Africa driving tests":
  `{ title: "South Africa financial services licensing exams", ids: ["zare5"] },`
- `SEARCH_ALIASES`:
  `zare5: "re5 re 5 regulatory examination representatives regulatory exam for representatives fais fais act fais exam fsca fsb financial advisor exam south africa financial adviser exam fsp representative fit and proper board notice 194 general code of conduct fica moonstone re1 key individual insurance broker exam south africa",`
- `RELATED_OVERRIDES`: `zare5: ["zak53", "llqp", "mypce"],` (a one-exam group needs padding; `zak53` is
  the country's main test, `llqp` and `mypce` are the nearest financial licensing exams elsewhere;
  `hkiiqe1` or `cemap` would also fit).

## lib/region.ts

`zare5: "ZA",` in `TEST_REGIONS`, and add `"zare5"` to `NON_DRIVING_TESTS`.

South Africa's homepage (`REGION_HOME.ZA`) currently speaks only of the K53. Suggested update once
the batch's ZA exams are wired (adjust the list to the ZA tests actually wired: zak53moto, zasaps,
zapsira):

```ts
  ZA: {
    title: "Free South Africa Practice Tests: K53, RE5 & More | Tigertest",
    description: "Free practice for South Africa: the K53 learner's licence (Code 2 cars, Code 3 trucks) and the RE5 regulatory exam for FAIS representatives, original questions with every answer explained. No account needed.",
    lead: "Practice for the K53 learner's licence test, Code 2 for cars or Code 3 for trucks, and the RE5 regulatory exam for financial services representatives. Original questions, every answer explained. No signup.",
    cta: { label: "K53 learner's test", href: "/k53-learners-test" },
    testsTitle: "K53 learner's licence tests",
    testsSub: "Code 2 for cars and Code 3 for trucks (C1 and C): 200 questions each on South African road rules, in km/h for left-hand traffic. Four full 50-question tests each.",
  },
```

`faqsFor("ZA")` counts non-driving tests from the catalog by itself; nothing to add there.

## lib/examFacts.ts

```ts
  zare5: {
    answer:
      "The RE5 is the regulatory examination for representatives in all categories of financial services providers under South Africa's Financial Advisory and Intermediary Services (FAIS) Act, part of the fit and proper requirements set by the Financial Sector Conduct Authority (FSCA). According to the FSCA's January 2026 preparation guide, it has 50 multiple-choice questions with four options, to be answered in 2 hours, and the pass mark is 66% with no negative marking. It is a closed-book paper exam drawn from a central question bank, covers eight tasks from the FAIS Act and the General Code of Conduct to the FIC Act, the Ombud for FSPs and debarment, and can be written as many times as needed.",
    rows: [
      { label: "Questions", value: "50 multiple choice, four options (2% each)" },
      { label: "Time", value: "2 hours" },
      { label: "Pass mark", value: "66%, no negative marking" },
      { label: "Content", value: "8 tasks on the FAIS Act, Codes of Conduct, FIC Act and Ombud" },
      { label: "Format", value: "Closed book, paper exam at a venue" },
      { label: "Attempts", value: "No limit" },
      { label: "Run by", value: "FSCA, through its mandated examination body" },
    ],
    basedOn: "FSCA Preparation Guide for Regulatory Examinations (RE 1 and RE 5), 17 January 2026, and the RE5 task map, checked November 2026",
    source: { name: "Preparation Guide for Regulatory Examinations (RE 1 and RE 5)", url: "https://www.moonstone.co.za/wp-content/uploads/library/Regulatory%20Exam%20Library/RE%20Preparation%20Guidelines/RE1%20and%20RE5%20Preparation%20Guideline.pdf" },
  },
```
(Fees and who must write the RE5 by when are left out: fees by house rule; the deadline is a
BN 194 rule not re-read this session.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing required (the batch does not list zare5 as teacher-led). FSPs and RE5 course providers do
run classes; an optional `zare5: "RE5 classes for new representatives"` TEACHES line is reasonable
if the integrator wants it.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing required: sitemaps map over `EXAMS`, no redirects, `umbrella` icon exists. Borrow a tiger
through `BORROWED_SETS`, like `llqp` and `hkiiqe1`: `zare5: "insurance",`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest is exactly 60).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing zare5:re5-exam:20501`

## CLAUDE.md (under Additional Exams, after the K53 Code 3 Learner's bullet)

```md
- **RE5** (`zare5`, South Africa's regulatory examination for representatives under the FAIS Act, set by the FSCA, `/re5-exam/*`, landing `/re5-exam-practice-test`): `data/re5-questions.json` (200 original questions on the eight tasks of the RE5 task map (14 January 2025): FAIS Act, financial products and the compliance officer 24, maintaining the FSP licence, Medical Schemes Act accreditation, undesirable practices and offences 24, key individuals 12, General Code of Conduct as general duties, conflicts of interest and disclosures 28 and advice, replacement, client funds, complaints and termination 24, record keeping 12, FIC Act and money laundering control 20, the Ombud for FSPs 12, the representative (fit and proper under BN 194 of 2017, supervision under FAIS Notice 86 of 2018, registers) 28, debarment (FAIS s14, FSR Act s153 and s230) 16), test IDs 20501-20504 (50 questions each, like the real exam), sets 20501-20504 (by task), state `ZARE5`, prefix `ZARE5-`, 66% pass like the real exam. 6/6/3/7/6/3/5/3/7/4 per test (the FSCA publishes no task weights; the split is Tigertest's, led by each task's number of qualifying criteria). The real RE5 is 50 four-option questions in 2 hours, 66% to pass, no negative marking, closed-book paper exam, unlimited attempts (FSCA preparation guide, 17 January 2026). South African law as of November 2026; no rand amounts. Built by `tools/next100/zare5/build.py`; sources in `tools/next100/zare5/sources.md`. Region ZA, hub group "South Africa financial services licensing exams", `[data-theme="zare5"]` dark ochre brown (40 55% 22%), borrows the life and health insurance tiger.
```
