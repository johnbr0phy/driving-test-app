# Wiring for `phmidwife` (Philippine Midwife Licensure Examination, PRC, v1)

Files already written by the builder: `data/philippines-midwife-questions.json` (200, PASS),
`lib/banks/phmidwife.ts`, `app/midwife-board-exam/*` (5 wrappers, copied from `app/let-reviewer/`),
`app/midwife-board-exam-reviewer-practice-test/page.tsx`, `tools/next100/phmidwife/*` (spec,
sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/phmidwife/build.py`.
Everything below goes in shared files. `npx tsc` reports an error in `lib/banks/phmidwife.ts`
until `"phmidwife"` is in `ExamId`.

Format note: the PRC exam programs (April 29-30, 2024; April 14-15, 2026) list five subjects over
two days, each a 2-hour session: Obstetrics, Fundamentals of Health Care, Infant Care and Feeding
(day 1), Primary Health Care, Professional Growth and Development (day 2), with eight integrated
sciences. R.A. 7392 Sec. 16: general rating 75% with no grade below 50% in any subject. No table
of specifications with weights was found and item counts per subject are not in the program, so
each 50-question test takes 10 per subject (equal weights, as the general rating averages
subjects). Pass line 75%; the 50% subject floor is not modelled (the landing says so). Pools are
exactly 4x per test. Dashboard = 5 sets (one per subject, 40 each) + 4 tests = 9 steps.

## lib/exams.ts

Add `"phmidwife"` to the `ExamId` union. Icon `heart` already exists.

```ts
const phmidwife: ExamConfig = {
  id: "phmidwife",
  stateCode: "PHMIDWIFE",
  idBase: 19700,
  slug: "/midwife-board-exam",
  landingPath: "/midwife-board-exam-reviewer-practice-test",
  name: "Midwife Board Exam Reviewer Practice Test",
  shortName: "Midwife Board",
  examLabel: "Midwife Board Exam",
  fullName: "Midwife Licensure Examination (MLE), Philippines",
  questionIdPrefix: "PHMW-",
  icon: "heart",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // PRC programs of the Midwife Licensure Examination (April 29-30, 2024 and April 14-15, 2026,
  // checked 2026-11-05): five subjects, each a 2-hour session, with sociology, bacteriology,
  // anatomy and physiology, psychology, nutrition, parasitology, microbiology and pharmacology
  // integrated. R.A. 7392 Sec. 16: general rating 75%, no subject below 50%; only the 75% is
  // scored here. No published table of specifications, so the subjects are weighted equally,
  // 10 per test each. Pools are exactly 4x each count. All items original.
  blueprint: {
    phmwObstetrics: 10,
    phmwFundamentals: 10,
    phmwInfant: 10,
    phmwPhc: 10,
    phmwProfessional: 10,
  },
  trainingSets: [
    { setNumber: 1, id: 19701, name: "Obstetrics", categories: ["phmwObstetrics"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 19702, name: "Fundamentals of Health Care", categories: ["phmwFundamentals"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 19703, name: "Infant Care and Feeding", categories: ["phmwInfant"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 19704, name: "Primary Health Care", categories: ["phmwPhc"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 19705, name: "Professional Growth and Development", categories: ["phmwProfessional"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    phmwObstetrics: "Obstetrics",
    phmwFundamentals: "Fundamentals of Health Care",
    phmwInfant: "Infant Care and Feeding",
    phmwPhc: "Primary Health Care",
    phmwProfessional: "Professional Growth and Development",
  },
  copy: {
    guestPrompt: "to save your midwife board exam progress and track every question you miss",
    trainingHeading: "Train by board exam subject",
    trainingSub: "Five sets, one for each subject of the Midwife Licensure Examination, with the integrated sciences inside them. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions, 10 from each subject",
    heroSubs: [
      "Five subjects, four mock exams. Every subject counts.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You're ready for the board exam.",
    ],
    sourceLine: "Based on the PRC exam program and R.A. 7392. Original questions; 50 per test, 10 from each subject. Not affiliated with the PRC.",
    analyticsKey: "phmidwife",
  },
};
```

Append `phmidwife` to the `EXAMS` array after the other Philippines health board exams (e.g. after
`phnle` if wired, else after `phlet`).

Check: 19701-19705 (sets) and 19701-19704 (tests) must be free (BRIEF reserves idBase 19700).

## lib/banks/all.ts

```ts
import "./phmidwife";
```

## types/index.ts

- `QuestionType`: add `| "PHMIDWIFE"`.
- `QuestionCategory`, under a `// Philippines Midwife Licensure Examination` comment:

```ts
  | "phmwObstetrics"
  | "phmwFundamentals"
  | "phmwInfant"
  | "phmwPhc"
  | "phmwProfessional"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    phmwObstetrics: "Obstetrics",
    phmwFundamentals: "Fundamentals of Health Care",
    phmwInfant: "Infant Care and Feeding",
    phmwPhc: "Primary Health Care",
    phmwProfessional: "Professional Growth and Development",
```

## app/globals.css

The brief's hue, 330 70% 22%, as given (checked by the brief's script). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Philippines Midwife Licensure Examination theme */
  [data-theme="phmidwife"] {
    --brand: 330 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 330 60% 96%;
    --brand-hover: 330 70% 18%;
    --brand-dark: 330 70% 16%;
    --brand-darker: 330 70% 10%;
    --brand-muted: 330 30% 70%;
    --brand-border: 330 35% 82%;
    --brand-border-light: 330 35% 90%;
    --brand-gradient-to: 350 60% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `phmidwife: "Midwife board exam reviewer for the PRC Midwife Licensure Examination: Obstetrics, Fundamentals of Health Care, Infant Care and Feeding, Primary Health Care, and Professional Growth and Development, with the integrated sciences, R.A. 7392 and DOH programs.",`
- `EXAM_ORG`: `phmidwife: "PRC · Professional Regulatory Board of Midwifery",`
- Hub group: new group placed after "Philippines government and licensure exams" (shared with
  phnle, phmedtech, phpharm, phpsychom):
  `{ title: "Philippines health board exams", ids: ["phnle", "phmedtech", "phpharm", "phmidwife", "phpsychom"] },`
  (list only the ids that are wired).
- `SEARCH_ALIASES`:
  `phmidwife: "midwife board exam midwifery board exam midwife licensure exam midwife licensure examination mle reviewer midwife reviewer midwifery reviewer prc midwife exam midwife board exam reviewer philippines registered midwife rm board exam obstetrics reviewer infant care and feeding primary health care reviewer professional growth and development diploma in midwifery bs midwifery",`
- `RELATED_OVERRIDES`: `phmidwife: ["phnle", "nclex", "cna"],` (drop `phnle` if it is not wired).

## lib/region.ts

```ts
// TEST_REGIONS: on the PH entry (next to phlto, phcse, phlet)
  phmidwife: "PH",
// NON_DRIVING_TESTS: add
  "phmidwife",
```

`REGION_HOME.PH`: the integrator rewrites it once the batch is wired. Suggested clause: "the
Midwife Licensure Examination".

## lib/examFacts.ts

```ts
  phmidwife: {
    answer:
      "The Midwife Licensure Examination (the midwife board exam) is the written exam that the Professional Regulation Commission (PRC) and the Professional Regulatory Board of Midwifery give to graduates of midwifery; under R.A. 7392, the Philippine Midwifery Act of 1992, no one may practice midwifery without passing it. It has five subjects over two days, each a two-hour session: Obstetrics, Fundamentals of Health Care, and Infant Care and Feeding on day one, and Primary Health Care and Professional Growth and Development on day two. Sociology, bacteriology, anatomy and physiology, psychology, nutrition, parasitology, microbiology and pharmacology are integrated into those subjects. To pass you need a general rating of 75% with no grade below 50% in any subject.",
    rows: [
      { label: "Run by", value: "PRC, Professional Regulatory Board of Midwifery" },
      { label: "Subjects", value: "Obstetrics; Fundamentals of Health Care; Infant Care and Feeding; Primary Health Care; Professional Growth and Development" },
      { label: "Time", value: "2 hours per subject, over two days" },
      { label: "Pass mark", value: "General rating 75%, no subject below 50% (R.A. 7392, Sec. 16)" },
      { label: "Format", value: "Pen and paper; calculators not allowed" },
      { label: "Sittings", value: "Usually twice a year; check PRC for the next" },
      { label: "Not modelled here", value: "The 50% floor per subject" },
    ],
    basedOn: "PRC programs of the Midwife Licensure Examination (April 29-30, 2024 and April 14-15, 2026) and R.A. 7392, checked November 2026",
    source: { name: "Professional Regulation Commission", url: "https://www.prc.gov.ph/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"phmidwife"` to `TEACHER_LED` (review centers and midwifery schools), and in `TEACHES`:
`phmidwife: "a midwife board exam review class or a midwifery school class",`. The landing already
renders `<ExamClassFaq examId="phmidwife" />` and `classFaqJsonLd("phmidwife")`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Suggest borrowing the nursing tiger: `phmidwife: "nclex",` in
`BORROWED_SETS` (or `"cna"`).

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/*

Nothing: `heart` exists; sitemaps map over `EXAMS`; class questions import `lib/banks/all`; no
redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 40 each, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing phmidwife:midwife-board-exam:19701`

## CLAUDE.md (under Additional Exams, after the NLE Reviewer bullet)

```md
- **Midwife Board Exam Reviewer** (Philippine Midwife Licensure Examination, PRC, `/midwife-board-exam/*`, landing `/midwife-board-exam-reviewer-practice-test`): `data/philippines-midwife-questions.json` (200 original questions on the five subjects of the PRC exam program (April 2024 and April 2026): Obstetrics 40, Fundamentals of Health Care 40 (with the integrated anatomy, bacteriology, microbiology, parasitology, pharmacology, nutrition, psychology and sociology), Infant Care and Feeding 40, Primary Health Care 40, Professional Growth and Development 40), test IDs 19701-19704 (50 questions each, 10 per subject), sets 19701-19705 (one per subject), state `PHMIDWIFE`, prefix `PHMW-`, 75% pass (R.A. 7392 Sec. 16 also needs no subject below 50%, not modelled). Equal weights are Tigertest's: no table of specifications or per-subject item count is published. The real exam is five 2-hour sessions over two days. Philippine law and programs (R.A. 7392 Sec. 23 scope, EINC, NIP schedule, IMCI, MNCHN facility-based delivery, family planning), generic drug names, US spelling. Kept clear of `phnle`, `nclex` and `cna`. Built by `tools/next100/phmidwife/build.py`; sources in `tools/next100/phmidwife/sources.md`. Region PH, hub group "Philippines health board exams", `[data-theme="phmidwife"]` deep magenta (330 70% 22%), borrows the NCLEX tiger, teacher-led (review centers).
```
