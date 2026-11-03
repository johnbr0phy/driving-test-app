# Wiring for `nce` (NBCC National Counselor Examination, US, v1)

Files already written by the builder: `data/nce-questions.json` (200, PASS),
`lib/banks/nce.ts`, `app/nce/*` (layout, redirect, dashboard, drill, stats; copied from `app/rbt/`,
no test or practice folders), `app/nce-practice-test/page.tsx`, `tools/next100/nce/*` (spec,
sources, `q_*.py`, `build.py`). Everything below goes in shared files. `npx tsc` reports an error
in `lib/banks/nce.ts` until `"nce"` is added to `ExamId`.

Format note: the current NCE (until June 30, 2027) is 200 multiple-choice questions (160 scored,
40 unscored field-test items) in 225 minutes, four options per question. Modelled as four
50-question tests weighted like the 160 scored items (a quarter of the length; 200 items cannot
make several full-length forms without repeats). Dashboard = 4 training sets + 4 tests = 8 steps.
Pass line `ceil(0.7 * 50) = 35`: NBCC sets the passing point per form by a modified Angoff method
and publishes no percentage, so 70% is a readiness marker. Pools are exactly 4x per-test, so no
item repeats across tests. The July 1, 2027 version (170 items, three options, six new domains,
scaled 100-500 with 360 passing) is described on the landing only; re-weight the bank when it
goes live.

## lib/exams.ts

Add `"nce"` to the `ExamId` union. Icon `heart` already exists.

```ts
const nce: ExamConfig = {
  id: "nce",
  stateCode: "NCE",
  idBase: 15600,
  slug: "/nce",
  landingPath: "/nce-practice-test",
  name: "NCE Practice Test",
  shortName: "NCE",
  examLabel: "NCE",
  fullName: "National Counselor Examination (NCE)",
  questionIdPrefix: "NCE-",
  icon: "heart",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // NBCC NCE Content Outline (job analysis finalized June 2019, (c) 2023; checked 2026-11-02):
  // 200 MCQs, 160 scored, in 225 minutes. Scored items by domain: Professional Practice and
  // Ethics 19, Intake, Assessment, and Diagnosis 19, Areas of Clinical Focus 47, Treatment
  // Planning 14, Counseling Skills and Interventions 48, Core Counseling Attributes 13
  // (12/12/29/9/30/8%), scaled here to 50 per test (6/6/14/5/15/4). Questions also cover the eight
  // CACREP core areas the outline aligns to (research and statistics sit in Ethics, per task 1B).
  // NBCC sets the pass point per form by modified Angoff; 70% is a readiness marker.
  // The July 1, 2027 version (170 items, 3 options, new domains) is not modelled yet.
  blueprint: {
    nceEthics: 6,
    nceAssess: 6,
    nceClinical: 14,
    ncePlan: 5,
    nceSkills: 15,
    nceAttrib: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 15601, name: "Ethics, Assessment & Diagnosis", categories: ["nceEthics", "nceAssess"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 2, id: 15602, name: "Areas of Clinical Focus", categories: ["nceClinical"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 3, id: 15603, name: "Counseling Skills & Interventions", categories: ["nceSkills"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 4, id: 15604, name: "Treatment Planning & Core Attributes", categories: ["ncePlan", "nceAttrib"], size: 36, weightLabel: "9 of 50 test questions" },
  ],
  categoryLabels: {
    nceEthics: "Professional Practice & Ethics",
    nceAssess: "Intake, Assessment & Diagnosis",
    nceClinical: "Areas of Clinical Focus",
    ncePlan: "Treatment Planning",
    nceSkills: "Counseling Skills & Interventions",
    nceAttrib: "Core Counseling Attributes",
  },
  copy: {
    guestPrompt: "to save your NCE progress and track every question you miss",
    trainingHeading: "Train by NCE domain",
    trainingSub: "Four sets covering all six domains of the NBCC content outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions weighted like the real 160 scored",
    heroSubs: [
      "Six domains, four mock exams. Counseling skills weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. Schedule your NCE.",
    ],
    sourceLine: "Based on the NBCC NCE content outline, the ACA Code of Ethics (2014) and the DSM-5-TR. Original questions; 50 per test, weighted like the real exam. Not affiliated with NBCC.",
    analyticsKey: "nce",
  },
};
```

Append `nce` to the `EXAMS` array (with the healthcare exams, after `rbt`).

Check: 15601-15604 (tests and sets) must be free (batch A assigns idBase 15600).

## lib/banks/all.ts

```ts
import "./nce";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/nce.ts`.

## types/index.ts

- `QuestionType`: add `| "NCE"`.
- `QuestionCategory`, under a `// NCE (National Counselor Examination)` comment:

```ts
  | "nceEthics"
  | "nceAssess"
  | "nceClinical"
  | "ncePlan"
  | "nceSkills"
  | "nceAttrib"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nceEthics: "Professional Practice & Ethics",
    nceAssess: "Intake, Assessment & Diagnosis",
    nceClinical: "Areas of Clinical Focus",
    ncePlan: "Treatment Planning",
    nceSkills: "Counseling Skills & Interventions",
    nceAttrib: "Core Counseling Attributes",
```

## app/globals.css

Hue 265 20% 40% (batch A table, already checked), then run `tools/gen_dark_brand_css.py`.

```css
  /* NCE (National Counselor Examination) theme */
  [data-theme="nce"] {
    --brand: 265 20% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 265 30% 96%;
    --brand-hover: 265 20% 34%;
    --brand-dark: 265 22% 30%;
    --brand-darker: 265 22% 20%;
    --brand-muted: 265 14% 72%;
    --brand-border: 265 16% 80%;
    --brand-border-light: 265 18% 89%;
    --brand-gradient-to: 225 25% 96%;
  }
```

## lib/tigerAssets.ts

No NCE tiger set yet. Suggest borrowing the RBT tiger (nearest behavioral-health exam):
`nce: "rbt",` in `BORROWED_SETS`. (If ASWB borrows the same set, that is fine.)

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nce: "NBCC National Counselor Examination on the current content outline: ethics and research, intake and DSM-5-TR diagnosis, clinical concerns, treatment planning, counseling theories, group and family work, and core counseling attributes.",`
- `EXAM_ORG`: `nce: "NBCC · NCE content outline (licensure and NCC)",`
- Hub group: add `"nce"` to `{ title: "Healthcare certification exams", ids: [...] }` after `"rbt"`
  (or to a "Counseling and social work" group with `aswb` if the integrator creates one).
- `SEARCH_ALIASES`:
  `nce: "nce national counselor exam examination nbcc ncc lpc lmhc lpcc counselor licensure exam counseling licensing exam professional counselor cacrep mental health counselor",`

## lib/region.ts

Nothing: US is the default.

## lib/examFacts.ts

```ts
  nce: {
    answer:
      "The National Counselor Examination (NCE) is the National Board for Certified Counselors' exam for entry-level professional counselors, required for counselor licensure in many states and one of two exam options for the National Certified Counselor (NCC) credential. It has 200 multiple-choice questions in 3 hours and 45 minutes, 160 scored and 40 unscored field-test items, with a 15-minute break after question 100, taken at a Pearson VUE test center or online through OnVUE. The content outline has six domains: professional practice and ethics, intake, assessment and diagnosis, areas of clinical focus, treatment planning, counseling skills and interventions, and core counseling attributes. NBCC sets the passing point for each form by a modified Angoff method. From July 1, 2027 a new version has 170 questions with three options each and six new domains.",
    rows: [
      { label: "Questions", value: "200 multiple choice (160 scored, 40 field-test)" },
      { label: "Time", value: "3 hours 45 minutes, plus a 15-minute break after question 100" },
      { label: "Pass mark", value: "Set per form by modified Angoff; no published percentage" },
      { label: "Content", value: "6 domains, aligned with the 8 CACREP core areas" },
      { label: "Biggest domain", value: "Counseling Skills and Interventions, 48 of 160" },
      { label: "Where", value: "Pearson VUE test centers or online (OnVUE)" },
      { label: "Coming July 1, 2027", value: "170 questions, 3 options each, scaled 100 to 500, 360 to pass" },
      { label: "Run by", value: "National Board for Certified Counselors (NBCC)" },
    ],
    basedOn: "NBCC's NCE content outline and state licensure handbook (rev. September 2024), and the 2027 exam specifications, checked November 2026",
    source: { name: "NBCC: National Counselor Examination", url: "https://www.nbcc.org/exams/nce" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"nce"` to `TEACHER_LED` (counselor education programs prepare students for it in practicum
and comprehensive exam courses), and in `TEACHES`:
`nce: "a counselor education course or supervise counselors preparing for licensure",`. The
landing already renders `<ExamClassFaq examId="nce" />` and `classFaqJsonLd("nce")`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `heart` exists; sitemaps map over `EXAMS`; no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest is 60).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nce:nce:15601`

## CLAUDE.md (under Additional Exams)

```md
- **NCE** (NBCC National Counselor Examination, `/nce/*`, landing `/nce-practice-test`): `data/nce-questions.json` (200 questions on the NBCC NCE content outline (2019 job analysis): professional practice and ethics 24 (with research and statistics), intake, assessment and diagnosis 24, areas of clinical focus 56 (development, career, multicultural, grief, DSM-5-TR), treatment planning 20, counseling skills and interventions 60 (theories, family systems, group work, crisis), core counseling attributes 16), test IDs 15601-15604, sets 15601-15604, state `NCE`, prefix `NCE-`, 70% pass (readiness marker; NBCC sets each form's pass point by modified Angoff). 6/6/14/5/15/4 per test, scaled from the outline's 19/19/47/14/48/13 of 160 scored. The real exam is 200 items (160 scored) in 225 minutes; the July 1, 2027 version (170 items, three options, six new domains, scaled 100 to 500, 360 to pass) is on the landing only. Built by `tools/next100/nce/build.py`; sources in `tools/next100/nce/sources.md`. Hub group "Healthcare certification exams", `[data-theme="nce"]` muted violet (265 20% 40%), borrows the RBT tiger, teacher-led (counselor education).
```
