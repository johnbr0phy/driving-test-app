# Wiring for `phr` (HRCI Professional in Human Resources, US, v1)

Files already written by the builder: `data/phr-questions.json` (200, PASS, key-longest 6%),
`lib/banks/phr.ts`, `app/phr/*` (layout, redirect, dashboard, drill, stats, copied from
`app/nmls/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/phr-practice-test/page.tsx`, `tools/next100/phr/*` (spec, sources, `q_*.py`, `build.py`,
this file). Everything below goes in shared files.

Format note: the real PHR (hrci.org, checked 2026-11-04) is 115 questions (90 scored, 25 pretest)
in 2 hours plus 30 minutes administration, at Pearson VUE or online through OnVUE, on the PHR Exam
Content Outline that took effect in 2024. Scores are scaled with 500 to pass; HRCI publishes no
percentage, so `passPct: 70` is Tigertest's readiness line (pass line `ceil(0.70 * 50) = 35`).
Here: four 50-question mock tests weighted 14/14/10/15/17/20/10, 5 training sets + 4 tests = 9
dashboard steps. Pools are exactly 4x per-test counts, so no item repeats across tests. Sets are
content sets, not interleaved: sets first, then tests.

## lib/exams.ts

Add `"phr"` to the `ExamId` union. Icon `building` already exists.

```ts
const phr: ExamConfig = {
  id: "phr",
  stateCode: "PHR",
  idBase: 17000,
  slug: "/phr",
  landingPath: "/phr-practice-test",
  name: "PHR Practice Test",
  shortName: "PHR",
  examLabel: "PHR exam",
  fullName: "HRCI Professional in Human Resources (PHR)",
  questionIdPrefix: "PHR-",
  icon: "building",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // HRCI PHR Exam Content Outline (took effect 2024; on hrci.org, checked 2026-11-04): 115 items
  // (90 scored + 25 pretest), 2 hours, scaled score with 500 to pass (no percentage published, so
  // 70% is Tigertest's readiness line). Business Management 14%, Workforce Planning and Talent
  // Acquisition 14%, Learning and Development 10%, Total Rewards 15%, Employee Engagement 17%,
  // Employee and Labor Relations 20%, HR Information Management 10%, scaled to 50: 7, 7, 5, 7.5,
  // 8.5, 10, 5; the tied half remainders go to Engagement (9) over Total Rewards (7). Employee and
  // Labor Relations is split 5/5. US federal employment law as in force November 2026.
  blueprint: {
    phrBusiness: 7,
    phrTalent: 7,
    phrLearning: 5,
    phrRewards: 7,
    phrEngagement: 9,
    phrCompliance: 5,
    phrLabor: 5,
    phrHris: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 17001, name: "Business Management & HR Information", categories: ["phrBusiness", "phrHris"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 2, id: 17002, name: "Talent Acquisition & Learning", categories: ["phrTalent", "phrLearning"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 17003, name: "Total Rewards", categories: ["phrRewards"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 4, id: 17004, name: "Employee Engagement", categories: ["phrEngagement"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 17005, name: "Employee & Labor Relations", categories: ["phrCompliance", "phrLabor"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    phrBusiness: "Business Management",
    phrTalent: "Workforce Planning & Talent Acquisition",
    phrLearning: "Learning & Development",
    phrRewards: "Total Rewards",
    phrEngagement: "Employee Engagement",
    phrCompliance: "EEO, Leave, Safety & Policies",
    phrLabor: "Labor Relations & Complaints",
    phrHris: "HR Information Management",
  },
  copy: {
    guestPrompt: "to save your PHR progress and track every question you miss",
    trainingHeading: "Train by functional area",
    trainingSub: "Five sets covering all seven functional areas of the PHR content outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions weighted like the real PHR, 70% readiness line",
    heroSubs: [
      "Five sets, four mock tests. Employee relations and engagement weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Schedule your PHR exam.",
    ],
    sourceLine: "Based on the HRCI PHR Exam Content Outline (2024). Original questions; 50 per test, weighted like the real 115-question exam. 70% is Tigertest's readiness line; HRCI reports a scaled score. Not affiliated with HRCI.",
    analyticsKey: "phr",
  },
};
```

Append `phr` to the `EXAMS` array after `capm` (or wherever the Business and project management
exams sit).

Check: 17001-17004 (tests) and 17001-17005 (sets) must be free (batch C assigns 17000; aswbclin
is 16900, cisa 17100).

## lib/banks/all.ts

```ts
import "./phr";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/phr.ts`.

## types/index.ts

- `QuestionType`: add `| "PHR"`.
- `QuestionCategory`, under a `// HRCI PHR` comment (grepped: no `phr*` keys exist; `phRightOfWay`
  is the Philippines LTO key and differs in case):

```ts
  | "phrBusiness"
  | "phrTalent"
  | "phrLearning"
  | "phrRewards"
  | "phrEngagement"
  | "phrCompliance"
  | "phrLabor"
  | "phrHris"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    phrBusiness: "Business Management",
    phrTalent: "Workforce Planning & Talent Acquisition",
    phrLearning: "Learning & Development",
    phrRewards: "Total Rewards",
    phrEngagement: "Employee Engagement",
    phrCompliance: "EEO, Leave, Safety & Policies",
    phrLabor: "Labor Relations & Complaints",
    phrHris: "HR Information Management",
```

## app/globals.css

Hue from the batch C table (200 45% 28%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* HRCI PHR theme */
  [data-theme="phr"] {
    --brand: 200 45% 28%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 200 45% 96%;
    --brand-hover: 200 45% 24%;
    --brand-dark: 200 45% 20%;
    --brand-darker: 200 40% 14%;
    --brand-muted: 200 25% 70%;
    --brand-border: 200 25% 80%;
    --brand-border-light: 200 22% 89%;
    --brand-gradient-to: 160 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `phr: "HRCI PHR practice on the 2024 content outline: business management and HR metrics, hiring law and talent acquisition, learning and development, total rewards and FLSA pay rules, engagement and performance management, EEO, leave, safety and labor relations, and HR information management, every answer explained.",`
- `EXAM_ORG`: `phr: "HRCI · PHR Exam Content Outline (2024)",`
- Hub group: `"Business and project management"`, add `"phr"` at the end
  (`["pmp", "capm", "psm", "itil", "phr"]`). The group's other members are GLOBAL; phr is US, so
  the group leads the US catalog. If the integrator prefers, a new "Human resources certification"
  group is the alternative.
- `SEARCH_ALIASES`:
  `phr: "phr hrci professional in human resources hr certification exam human resources test sphr aphr hr generalist employment law fmla flsa title vii total rewards employee relations",`
- `RELATED_OVERRIDES` (optional): `phr: ["capm", "pmp", "psm"],`

## lib/region.ts

US exam: no `TEST_REGIONS` entry (US is the default), no `NON_DRIVING_TESTS` entry (non-US only).

## lib/examFacts.ts

```ts
  phr: {
    answer:
      "The PHR (Professional in Human Resources) is HRCI's certification for HR professionals who implement programs and run day-to-day HR operations under US law. The exam has 115 multiple-choice and other objective questions, 90 scored and 25 unscored pretest items, in 2 hours plus 30 minutes of administration time, taken at a Pearson VUE center or online through OnVUE. Scores are scaled and 500 passes. It covers seven functional areas: business management (14%), workforce planning and talent acquisition (14%), learning and development (10%), total rewards (15%), employee engagement (17%), employee and labor relations (20%) and HR information management (10%).",
    rows: [
      { label: "Questions", value: "115 (90 scored, 25 pretest)" },
      { label: "Time", value: "2 hours, plus 30 minutes administration" },
      { label: "Passing score", value: "500 on a scaled score" },
      { label: "Largest area", value: "Employee and labor relations, 20%" },
      { label: "Where", value: "Pearson VUE center or online (OnVUE)" },
      { label: "Run by", value: "HRCI" },
    ],
    basedOn: "HRCI PHR certification page, Exam Content Outline (2024) and Certification Policies and Procedures Handbook (October 2026), checked November 2026",
    source: { name: "HRCI: PHR certification", url: "https://www.hrci.org/our-programs/our-certifications/phr" },
  },
```
(Fees deliberately left out; HRCI lists an exam fee and an application fee on the same page.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Suggested: add `"phr"` to `TEACHER_LED` in `components/TeachNudge.tsx` under "Trade schools,
pre-licensing courses and instructor-led certifications" (PHR prep is commonly run as a class by
university continuing-education programs and HR association chapters; `pmp` is already listed).
Skip it if the integrator follows the nmls template (self-study).

## lib/tigerAssets.ts

Optional: `phr: "capm"` in `BORROWED_SETS` (business exam tiger); otherwise the DMV tiger.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing: sitemaps map over `EXAMS`, no redirects, `building` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 48).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing phr:phr:17001`

## CLAUDE.md (under Additional Exams, after the CAPM or NMLS bullet)

```md
- **PHR** (HRCI Professional in Human Resources, `/phr/*`, landing `/phr-practice-test`): `data/phr-questions.json` (200 questions on the PHR Exam Content Outline that took effect in 2024, 14/14/10/15/17/20/10: business management 28, workforce planning and talent acquisition 28, learning and development 20, total rewards 28, employee engagement 36, EEO, leave, safety and policies 20, labor relations and complaints 20, HR information management 20), a shorter mock of the real 115 (90 scored + 25 pretest) in 2 hours: test IDs 17001-17004 (50 questions each), sets 17001-17005, state `PHR`, prefix `PHR-`, 70% readiness line (HRCI reports a scaled score, 500 to pass). 7/7/5/7/9/5/5/5 per test. US federal employment law as in force Nov 2026 (PWFA, PUMP Act, Groff, Muldrow, Ames, EO 11246 revoked by EO 14173); no indexed dollar thresholds (FLSA salary level, benefit limits) or fees; multiple-response, fill-in, drag-and-drop and scenario items written as single answer. Built by `tools/next100/phr/build.py`; sources in `tools/next100/phr/sources.md`. Hub group "Business and project management", `[data-theme="phr"]` deep slate blue (200 45% 28%), borrows the CAPM tiger.
```
