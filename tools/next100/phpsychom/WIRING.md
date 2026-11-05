# Wiring for `phpsychom` (Philippines Psychometrician Licensure Examination, PRC, v1, region PH)

Files already written by the builder: `data/philippines-psychometrician-questions.json` (200, PASS,
key-longest 17%), `lib/banks/phpsychom.ts`, `app/psychometrician-board-exam/*` (layout, redirect,
dashboard, drill, stats; copied from `app/let-reviewer/`, no test or practice folders),
`app/psychometrician-board-exam-reviewer-practice-test/page.tsx`, `tools/next100/phpsychom/*`
(spec, sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/phpsychom/build.py`.
Everything below goes in shared files. `npx tsc` reports an error in `lib/banks/phpsychom.ts`
until `"phpsychom"` is in `ExamId`.

Format note: the PRC programs for the August 2024, September 2025 and August 2026 PmLE list four
subjects over two days, each 3 hours: Developmental Psychology 20%, Abnormal Psychology 20%,
Industrial-Organizational Psychology 20%, Psychological Assessment 40%. R.A. 10029 Sec. 15 named
Theories of Personality and Industrial Psychology; the Board's programs now list Developmental
Psychology instead, and the bank follows the programs (the batch brief mentioned theories of
personality; the official program won). Pass (R.A. 10029 Sec. 18): weighted general average 75%,
no subject below 60%; only the 75% is scored. Item counts per subject are not on the PRC programs
(guides: Assessment 150, others 100, from the 2014 TOS), so 50-question mocks weighted 10/10/10/20.
Dashboard = 5 subject sets + 4 tests = 9 steps. No set exceeds 60.

## lib/exams.ts

Add `"phpsychom"` to the `ExamId` union. Icon `heart` already exists (used by `nce`).

```ts
const phpsychom: ExamConfig = {
  id: "phpsychom",
  stateCode: "PHPSYCHOM",
  idBase: 19300,
  slug: "/psychometrician-board-exam",
  landingPath: "/psychometrician-board-exam-reviewer-practice-test",
  name: "Psychometrician Board Exam Reviewer",
  shortName: "PmLE",
  examLabel: "PmLE",
  fullName: "Psychometrician Licensure Examination (PmLE), Philippines",
  questionIdPrefix: "PHPSY-",
  icon: "heart",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // PRC programs for the August 19-20, 2026 (and September 2025, August 2024) Psychometricians
  // Licensure Examination, checked 2026-11-05: Developmental Psychology 20%, Abnormal Psychology
  // 20%, Industrial-Organizational Psychology 20%, Psychological Assessment 40%. Each 50-question
  // test is 10/10/10/20: Developmental 5+5, Abnormal 6+4, I/O 5+5, Assessment 8+6+6 (the split
  // inside each subject follows the 2014 TOS outline as reposted by guides). Pass: weighted general
  // average 75% with no subject below 60% (R.A. 10029 Sec. 18); only the 75% is scored here.
  // Pools are exactly 4x each count. All items original.
  blueprint: {
    phpsyDevChild: 5,
    phpsyDevLife: 5,
    phpsyAbnDisorders: 6,
    phpsyAbnCauses: 4,
    phpsyIoHr: 5,
    phpsyIoOrg: 5,
    phpsyPsychometrics: 8,
    phpsyTests: 6,
    phpsyEthics: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 19301, name: "Developmental Psychology", categories: ["phpsyDevChild", "phpsyDevLife"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 19302, name: "Abnormal Psychology", categories: ["phpsyAbnDisorders", "phpsyAbnCauses"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 19303, name: "Industrial-Organizational Psychology", categories: ["phpsyIoHr", "phpsyIoOrg"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 19304, name: "Assessment: Psychometrics & Statistics", categories: ["phpsyPsychometrics"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 5, id: 19305, name: "Assessment: Tests, Ethics & Reports", categories: ["phpsyTests", "phpsyEthics"], size: 48, weightLabel: "12 of 50 test questions" },
  ],
  categoryLabels: {
    phpsyDevChild: "Developmental Theories & Childhood",
    phpsyDevLife: "Adolescence, Adulthood & Aging",
    phpsyAbnDisorders: "Disorders & Diagnosis",
    phpsyAbnCauses: "Causes, Culture & Mental Health Law",
    phpsyIoHr: "Selection, Training & Appraisal",
    phpsyIoOrg: "Motivation, Leadership & Organizations",
    phpsyPsychometrics: "Psychometrics & Statistics",
    phpsyTests: "Tests & Test Administration",
    phpsyEthics: "Ethics, R.A. 10029 & Reports",
  },
  copy: {
    guestPrompt: "to save your psychometrician board exam progress and track every question you miss",
    trainingHeading: "Train by subject",
    trainingSub: "Five sets covering all four subjects of the PRC Psychometrician Licensure Examination, with Psychological Assessment split in two. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions, weighted 20/20/20/40 like the real rating",
    heroSubs: [
      "Four subjects, four mock exams. Psychological Assessment weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You're ready for the board exam.",
    ],
    sourceLine: "Based on the PRC program for the Psychometrician Licensure Examination and R.A. 10029. Original questions; 50 per test, weighted like the real rating. Not affiliated with the PRC.",
    analyticsKey: "phpsychom",
  },
};
```

Append `phpsychom` to the `EXAMS` array (next to `phlet` and the other Philippines board exams).

Check: 19301-19305 (sets) and 19301-19304 (tests) must be free (the brief reserves idBase 19300).

## lib/banks/all.ts

```ts
import "./phpsychom";
```

## types/index.ts

- `QuestionType`: add `| "PHPSYCHOM"`.
- `QuestionCategory`, under a `// Philippines Psychometrician Licensure Examination` comment:

```ts
  | "phpsyDevChild"
  | "phpsyDevLife"
  | "phpsyAbnDisorders"
  | "phpsyAbnCauses"
  | "phpsyIoHr"
  | "phpsyIoOrg"
  | "phpsyPsychometrics"
  | "phpsyTests"
  | "phpsyEthics"
```

(Grepped: no existing key starts with `phpsy`.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    phpsyDevChild: "Developmental Theories & Childhood",
    phpsyDevLife: "Adolescence, Adulthood & Aging",
    phpsyAbnDisorders: "Disorders & Diagnosis",
    phpsyAbnCauses: "Causes, Culture & Mental Health Law",
    phpsyIoHr: "Selection, Training & Appraisal",
    phpsyIoOrg: "Motivation, Leadership & Organizations",
    phpsyPsychometrics: "Psychometrics & Statistics",
    phpsyTests: "Tests & Test Administration",
    phpsyEthics: "Ethics, R.A. 10029 & Reports",
```

## app/globals.css

Hue from the brief, used as given (265 70% 22%, checked by the brief's script). Then run
`tools/gen_dark_brand_css.py` (or paste the dark block below, which follows `sgres`'s shape).

```css
  /* Philippines Psychometrician Licensure Examination theme */
  [data-theme="phpsychom"] {
    --brand: 265 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 265 70% 96%;
    --brand-hover: 265 70% 18%;
    --brand-dark: 265 70% 16%;
    --brand-darker: 265 60% 10%;
    --brand-muted: 265 25% 70%;
    --brand-border: 265 25% 80%;
    --brand-border-light: 265 22% 89%;
    --brand-gradient-to: 260 70% 96%;
  }
```

```css
  .dark [data-theme="phpsychom"] {
    --brand: 265 70% 50%;
    --brand-hover: 265 70% 42%;
    --brand-light: 265 45% 13%;
    --brand-gradient-to: 260 40% 11%;
    --brand-border-light: 265 22% 24%;
    --brand-border: 265 25% 34%;
    --brand-muted: 265 25% 45%;
    --brand-dark: 265 70% 65%;
    --brand-darker: 265 60% 78%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `phpsychom: "Psychometrician board exam reviewer for the Philippine PmLE: developmental psychology, abnormal psychology, industrial-organizational psychology and psychological assessment (psychometrics, statistics, tests, R.A. 10029 and the Code of Ethics), weighted like the PRC rating.",`
- `EXAM_ORG`: `phpsychom: "PRC · Professional Regulatory Board of Psychology",`
- Hub group: new group placed after "Philippines government and licensure exams" (shared with
  phnle, phmedtech, phpharm, phmidwife):
  `{ title: "Philippines health board exams", ids: ["phnle", "phmedtech", "phpharm", "phmidwife", "phpsychom"] },`
  (list only the ids that are wired).
- `SEARCH_ALIASES`:
  `phpsychom: "psychometrician board exam psychometrician licensure exam psychometrician licensure examination pmle pmle reviewer blepp blepp reviewer psychometrician reviewer psychology board exam philippines prc psychology board exam rpm registered psychometrician psychological assessment reviewer abnormal psychology reviewer industrial organizational psychology reviewer developmental psychology reviewer ra 10029 psychometrician mock exam",`
- `RELATED_OVERRIDES`: `phpsychom: ["nce", "appsych", "phnle"],` (swap `phnle` for `aswb` if it
  is not wired).

## lib/region.ts

- `TEST_REGIONS`: `phpsychom: "PH",` (next to `phlto`, `phcse`, `phlet`), and add `"phpsychom"`
  to `NON_DRIVING_TESTS`.
- `REGION_HOME.PH`: the integrator rewrites it once the batch is wired. Suggested clause for this
  exam: "the Psychometrician Licensure Examination".

## lib/examFacts.ts

```ts
  phpsychom: {
    answer:
      "The Psychometrician Licensure Examination (PmLE) is given by the Professional Regulation Commission (PRC) through the Professional Regulatory Board of Psychology; under the Philippine Psychology Act of 2009 (R.A. 10029) a license is needed to practice as a psychometrician, who administers, scores and interprets objective and structured personality tests (not projective tests) under a licensed psychologist's supervision. The PRC's 2024, 2025 and 2026 programs list four subjects over two days, each in a three-hour session: Developmental Psychology 20%, Abnormal Psychology 20%, Industrial-Organizational Psychology 20% and Psychological Assessment 40%. To pass you need a weighted general average of at least 75% with no subject below 60%.",
    rows: [
      { label: "Run by", value: "PRC, Professional Regulatory Board of Psychology" },
      { label: "Subjects", value: "Developmental 20%, Abnormal 20%, Industrial-Organizational 20%, Psychological Assessment 40%" },
      { label: "Time", value: "Two days, four 3-hour sessions (8 to 11 a.m. and 1 to 4 p.m.)" },
      { label: "Pass mark", value: "Weighted general average 75%, no subject below 60% (R.A. 10029, Sec. 18)" },
      { label: "Items per subject", value: "Not on the PRC program; guides report 150 for Assessment and 100 for the others" },
      { label: "Calculator", value: "Non-programmable calculators on PRC's approved list" },
      { label: "Law", value: "R.A. 10029, Philippine Psychology Act of 2009" },
      { label: "Not modelled here", value: "The 60% floor per subject" },
    ],
    basedOn: "PRC programs for the Psychometricians Licensure Examination of August 2024, September 2025 and August 2026, R.A. 10029 and the Code of Ethics and Professional Standards for Psychology Practitioners (Board Resolution No. 11, s. 2017), checked November 2026",
    source: { name: "Professional Regulation Commission", url: "https://www.prc.gov.ph/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"phpsychom"` to `TEACHER_LED` (psychometrician review centers and psychology departments), and
in `TEACHES`: `phpsychom: "a psychometrician board exam review class or a psychology program",`.
The landing already renders `<ExamClassFaq examId="phpsychom" />` and `classFaqJsonLd("phpsychom")`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Suggest borrowing the AP Psychology tiger: `phpsychom: "appsych",`
in `BORROWED_SETS` (or `"nce"`).

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/*

Nothing: `heart` exists; sitemaps map over `EXAMS`; class questions import `lib/banks/all`; no
redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing phpsychom:psychometrician-board-exam:19301`

## CLAUDE.md (under Additional Exams, after the LET Reviewer bullet)

```md
- **Psychometrician Board Exam** (Philippines Psychometrician Licensure Examination, PmLE, PRC Professional Regulatory Board of Psychology, `/psychometrician-board-exam/*`, landing `/psychometrician-board-exam-reviewer-practice-test`): `data/philippines-psychometrician-questions.json` (200 original questions on the four subjects of the PRC programs for 2024 to 2026: Developmental Psychology 20% as theories and childhood 20, adolescence, adulthood and aging 20; Abnormal Psychology 20% as disorders and diagnosis 24, causes, culture and mental health law 16; Industrial-Organizational Psychology 20% as selection, training and appraisal 20, motivation, leadership and organizations 20; Psychological Assessment 40% as psychometrics and statistics 32, tests and administration 24, ethics, R.A. 10029 and reports 24), test IDs 19301-19304 (50 questions each, 10/10/10/20 like the rating), sets 19301-19305 (by subject; Assessment in two), state `PHPSYCHOM`, prefix `PHPSY-`, 75% pass (the real rule also needs no subject below 60%, R.A. 10029 Sec. 18, not modelled). 5/5/6/4/5/5/8/6/6 per test, no spares. R.A. 10029 named Theories of Personality; the Board's current programs list Developmental Psychology instead, and the bank follows them. Item counts per subject are not on the PRC programs (guides: 150 Assessment, 100 others). Psychometrician scope (objective and structured tests only, under a psychologist), the 2017 Code of Ethics, R.A. 11036 and the Data Privacy Act; DSM-5-TR terms; Filipino values (hiya, utang na loob, pakikisama) and the PUP. Checked against appsych, rbt, nce, aswb, aswbclin, phr, phlet and praxisplt for repeats. Built by `tools/next100/phpsychom/build.py`; sources in `tools/next100/phpsychom/sources.md`. Region PH, hub group "Philippines health board exams", `[data-theme="phpsychom"]` deep violet (265 70% 22%), borrows the AP Psychology tiger, teacher-led (review centers).
```
