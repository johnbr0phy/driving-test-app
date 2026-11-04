# Wiring for `cssgb` (ASQ Certified Six Sigma Green Belt, GLOBAL, v1)

Files already written by the builder: `data/six-sigma-green-belt-questions.json` (200, PASS,
key-longest 8%, key > 1.2x wrong average 5%), `lib/banks/cssgb.ts`, `app/six-sigma-green-belt/*`
(layout, redirect, dashboard, drill, stats, copied from `app/salesforce-admin/`; no test or
practice folders, the shared `app/[slug]` routes serve them),
`app/six-sigma-green-belt-practice-test/page.tsx`, `tools/next100/cssgb/*` (spec, sources,
`q_*.py`, `build.py`, this file). Everything below goes in shared files.

Format note (asq.org, checked 2026-11-04, see `sources.md`): computer-based exam of 110
multiple-choice questions, 100 scored, 4 h 18 min of exam time in a 4.5-hour appointment,
English only (a 100-question paper exam in Mandarin in some locations), open book, on-screen
calculator. 2022 BoK section counts 11/20/20/18/16/15. ASQE reports a pass as a scaled 550 and
publishes no raw percentage, so `passPct` 70 is Tigertest's readiness line (35 of 50). Here:
four 50-question tests (half length) covering the whole bank, 6/10/10/9/8/7 per test, and six
content sets (one per BoK section): sets first, then tests, 10 dashboard steps. Not DMV-style
`testSets()` on purpose: candidates study by DMAIC phase. Integrator may switch to
`testSets(17200, 4)` if batch C standardises on that.

## lib/exams.ts

Add `"cssgb"` to the `ExamId` union. Icon `target` already exists.

```ts
const cssgb: ExamConfig = {
  id: "cssgb",
  stateCode: "CSSGB",
  idBase: 17200,
  slug: "/six-sigma-green-belt",
  landingPath: "/six-sigma-green-belt-practice-test",
  name: "Six Sigma Green Belt Practice Test",
  shortName: "Six Sigma Green Belt",
  examLabel: "CSSGB exam",
  fullName: "ASQ Certified Six Sigma Green Belt",
  questionIdPrefix: "CSSGB-",
  icon: "target",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // ASQ CSSGB 2022 Body of Knowledge (asq.org, checked 2026-11-04): 110 questions, 100 scored,
  // 4 h 18 min, open book; I. Overview 11, II. Define 20, III. Measure 20, IV. Analyze 18,
  // V. Improve 16, VI. Control 15 of 100. Halved to 6/10/10/9/8/7 for 50-question tests (the two
  // half remainders split one up, one down). ASQE reports a scaled pass of 550 with no raw
  // percentage; 70% is Tigertest's readiness line.
  blueprint: {
    cssgbOverview: 6,
    cssgbDefine: 10,
    cssgbMeasure: 10,
    cssgbAnalyze: 9,
    cssgbImprove: 8,
    cssgbControl: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 17201, name: "Six Sigma & the Organization", categories: ["cssgbOverview"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 2, id: 17202, name: "Define Phase", categories: ["cssgbDefine"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 17203, name: "Measure Phase", categories: ["cssgbMeasure"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 17204, name: "Analyze Phase", categories: ["cssgbAnalyze"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 17205, name: "Improve Phase", categories: ["cssgbImprove"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 6, id: 17206, name: "Control Phase", categories: ["cssgbControl"], size: 28, weightLabel: "7 of 50 test questions" },
  ],
  categoryLabels: {
    cssgbOverview: "Six Sigma & the Organization",
    cssgbDefine: "Define Phase",
    cssgbMeasure: "Measure Phase",
    cssgbAnalyze: "Analyze Phase",
    cssgbImprove: "Improve Phase",
    cssgbControl: "Control Phase",
  },
  copy: {
    guestPrompt: "to save your Six Sigma Green Belt progress and track every question you miss",
    trainingHeading: "Train by DMAIC phase",
    trainingSub: "Six sets, one per section of the 2022 Body of Knowledge. Every calculation is worked out, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam, 70% readiness line",
    heroSubs: [
      "Six sets, four tests. Define and Measure weigh most.",
      "Master each phase, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your Green Belt exam.",
    ],
    sourceLine: "Based on the ASQ CSSGB Body of Knowledge (2022). Original questions; 50 per test, weighted like the real exam, with a 70% readiness line. Not affiliated with ASQ.",
    analyticsKey: "cssgb",
  },
};
```

Append `cssgb` to the `EXAMS` array with batch C (after `cisa` if it is a v1 neighbour).

Check: 17201-17204 (tests) and 17201-17206 (sets) must be free (batch C assigns 17200).

## lib/banks/all.ts

```ts
import "./cssgb";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/cssgb.ts`.

## types/index.ts

- `QuestionType`: add `| "CSSGB"`.
- `QuestionCategory`, under a `// ASQ Six Sigma Green Belt` comment:

```ts
  | "cssgbOverview"
  | "cssgbDefine"
  | "cssgbMeasure"
  | "cssgbAnalyze"
  | "cssgbImprove"
  | "cssgbControl"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cssgbOverview: "Six Sigma & the Organization",
    cssgbDefine: "Define Phase",
    cssgbMeasure: "Measure Phase",
    cssgbAnalyze: "Analyze Phase",
    cssgbImprove: "Improve Phase",
    cssgbControl: "Control Phase",
```

## app/globals.css

Hue from the batch C table (14 50% 26%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* ASQ Six Sigma Green Belt theme */
  [data-theme="cssgb"] {
    --brand: 14 50% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 14 50% 96%;
    --brand-hover: 14 50% 21%;
    --brand-dark: 14 50% 18%;
    --brand-darker: 14 45% 12%;
    --brand-muted: 14 30% 70%;
    --brand-border: 14 30% 80%;
    --brand-border-light: 14 28% 89%;
    --brand-gradient-to: 35 60% 95%;
  }
```

## lib/tigerAssets.ts

`BORROWED_SETS`: `cssgb: "pmp",` (process improvement and project work, like the PMP).

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cssgb: "ASQ Certified Six Sigma Green Belt practice on the 2022 Body of Knowledge: DMAIC phase by phase, lean tools, FMEA, Cp and Cpk, DPMO and sigma level, gauge R&R, hypothesis tests, DOE and control charts, every calculation worked out.",`
- `EXAM_ORG`: `cssgb: "ASQ · CSSGB Body of Knowledge, 2022",`
- Hub group: "Business and project management", add `"cssgb"` after `"capm"`.
- `SEARCH_ALIASES`:
  `cssgb: "six sigma green belt cssgb asq lean six sigma green belt certification lssgb dmaic sigma level dpmo cp cpk process capability control chart spc quality improvement green belt exam",`
- `RELATED_OVERRIDES` (optional): `cssgb: ["pmp", "capm", "itil"],`

## lib/region.ts

`cssgb: "GLOBAL",` in `TEST_REGIONS` (ASQ runs the same exam worldwide through Prometric).
Not in `NON_DRIVING_TESTS` (GLOBAL tests are not listed there, like `pmp`, `sfadmin`).

## lib/examFacts.ts

```ts
  cssgb: {
    answer:
      "The ASQ Certified Six Sigma Green Belt (CSSGB) exam is ASQ's certification for people who work on process improvement projects, usually supporting a Black Belt. The computer-based exam has 110 multiple-choice questions, 100 of them scored, with 4 hours 18 minutes of exam time; it is open book and in English. Its 2022 Body of Knowledge sets the scored questions per section: Overview 11, Define 20, Measure 20, Analyze 18, Improve 16 and Control 15. ASQ reports a pass as a scaled score of 550, needs three years of relevant work experience and does not require recertification.",
    rows: [
      { label: "Questions", value: "110 (100 scored, 10 unscored)" },
      { label: "Time", value: "4 hours 18 minutes (4.5-hour appointment)" },
      { label: "Passing score", value: "550 (scaled)" },
      { label: "Format", value: "Open book, multiple choice, on-screen calculator" },
      { label: "Largest sections", value: "Define and Measure, 20 questions each" },
      { label: "Run by", value: "ASQ, delivered by Prometric" },
    ],
    basedOn: "ASQ CSSGB certification page and 2022 Body of Knowledge, checked November 2026",
    source: { name: "ASQ: Six Sigma Green Belt Certification", url: "https://www.asq.org/cert/six-sigma-green-belt" },
  },
```
(Fee deliberately left out.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing: self-study certification (same convention as `sfadmin`, `cpafar`). Corporate Green Belt
classes exist; add a TEACHES line only if the integrator wants it.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing: sitemaps map over `EXAMS`, no redirects, `target` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 40).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cssgb:six-sigma-green-belt:17201`

## CLAUDE.md (under Additional Exams, with batch C)

```md
- **Six Sigma Green Belt** (ASQ Certified Six Sigma Green Belt, CSSGB, `/six-sigma-green-belt/*`, landing `/six-sigma-green-belt-practice-test`): `data/six-sigma-green-belt-questions.json` (200 original questions on the 2022 CSSGB Body of Knowledge, ASQ's 11/20/20/18/16/15 of 100 scored: overview, lean and DfSS/FMEA 24, Define 40, Measure 40, Analyze 36, Improve 32, Control 28), test IDs 17201-17204 (50 questions each, half the real 100 scored of 110 in 4 h 18 min, open book), sets 17201-17206 (one per BoK section), state `CSSGB`, prefix `CSSGB-`, 70% readiness line (ASQE reports a scaled 550 pass and publishes no raw percentage). 6/10/10/9/8/7 per test, no spares. Every statistics item (Cp, Cpk, Cpm, Pp/Ppk, DPMO, DPU, RTY, sigma level with the 1.5 shift, gauge R&R and P/T, binomial and Poisson, t, F, chi square, ANOVA, regression, DOE effects, X-bar/R, ImR, p, np and c limits) was recomputed in Python; working shown in each explanation. US spelling. Built by `tools/next100/cssgb/build.py`; sources in `tools/next100/cssgb/sources.md`. Region GLOBAL, hub group "Business and project management", `[data-theme="cssgb"]` dark rust (14 50% 26%), borrows the PMP tiger.
```
