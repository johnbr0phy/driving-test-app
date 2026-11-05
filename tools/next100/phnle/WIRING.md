# Wiring for `phnle` (Philippine Nurse Licensure Examination, PRC, v1)

Files already written by the builder: `data/philippines-nle-questions.json` (200, PASS),
`lib/banks/phnle.ts`, `app/nurse-licensure-exam/*` (5 wrappers copied from `app/let-reviewer/`:
layout, redirect, dashboard, drill, stats), `app/nle-reviewer-practice-test/page.tsx`,
`tools/next100/phnle/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/phnle/build.py`. Everything below goes in shared files. `npx tsc` reports
an error in `lib/banks/phnle.ts` and the wrappers until `"phnle"` is in `ExamId`.

Format note: the PRC program for the August 29-30, 2026 NLE lists five parts, Nursing Practice I to
V, each 2 hours, over two days (pen and paper, no calculators). R.A. 9173 Sec. 15: general average
of at least 75%, no subject below 60% (a subject below 60% with a 75% average is retaken alone and
must rate 75%). Guides report 100 items per part (500 in all), in situational sets; the PRC program
gives no count. The Board's enhanced TOS (Board Res. No. 10, s. 2025, from the November 2025 NLE)
was published without its Annex A, so no official topic weights are used: each 50-question mock
gives each part 10 items (NP I 7 community health + 3 law, ethics and leadership; NP II 7 maternal
+ 3 growth and development; NP III 10; NP IV 10; NP V 6 psychiatric + 4 emergency). Pass line 75%;
the 60% subject floor is not modelled (the landing says so). Pools exactly 4x per test. Dashboard =
5 sets (one per Nursing Practice part, 40 each) + 4 tests = 9 steps. No set exceeds 60.

## lib/exams.ts

Add `"phnle"` to the `ExamId` union. Icon `stethoscope` already exists.

```ts
const phnle: ExamConfig = {
  id: "phnle",
  stateCode: "PHNLE",
  idBase: 19100,
  slug: "/nurse-licensure-exam",
  landingPath: "/nle-reviewer-practice-test",
  name: "NLE Reviewer Practice Test",
  shortName: "NLE",
  examLabel: "NLE",
  fullName: "Philippine Nurse Licensure Examination (NLE/PNLE)",
  questionIdPrefix: "PHNLE-",
  icon: "stethoscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // PRC program of the NLE, Aug 29-30, 2026 (checked 2026-11-05): five parts, Nursing Practice
  // I to V, 2 hours each over two days. R.A. 9173 Sec. 15: general average 75%, no subject below
  // 60% (only the 75% is scored here). Guides report 100 items per part. Annex A of Board Res.
  // No. 10, s. 2025 (enhanced TOS) was not published with the resolution, so each part gets an
  // equal 10 of 50 items; the split inside NP I, NP II and NP V is Tigertest's. Fundamentals and
  // professional adjustment are integrated across parts (PRC program) and sit in phnleProf.
  // Pools are exactly 4x each count. All items original.
  blueprint: {
    phnleChn: 7,
    phnleProf: 3,
    phnleMaternal: 7,
    phnleGrowth: 3,
    phnleSurgOxy: 10,
    phnleMetabNeuro: 10,
    phnleMental: 6,
    phnleCritical: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 19101, name: "NP I: Community Health, Law & Ethics", categories: ["phnleChn", "phnleProf"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 19102, name: "NP II: Mother, Child & Development", categories: ["phnleMaternal", "phnleGrowth"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 19103, name: "NP III: Surgery, Oxygenation & Cancer", categories: ["phnleSurgOxy"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 19104, name: "NP IV: Nutrition, Endocrine & Neuro", categories: ["phnleMetabNeuro"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 19105, name: "NP V: Mental Health & Emergencies", categories: ["phnleMental", "phnleCritical"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    phnleChn: "Community Health Nursing & DOH Programs",
    phnleProf: "Nursing Law, Ethics & Leadership",
    phnleMaternal: "Care of Mother & Adolescent",
    phnleGrowth: "Human Growth & Development",
    phnleSurgOxy: "Surgery, Oxygenation, Fluids, Infection & Cancer",
    phnleMetabNeuro: "Nutrition, GI, Endocrine & Neuro-Sensory",
    phnleMental: "Psychiatric & Mental Health Nursing",
    phnleCritical: "Emergency & Critical Care",
  },
  copy: {
    guestPrompt: "to save your NLE progress and track every question you miss",
    trainingHeading: "Train by Nursing Practice part",
    trainingSub: "Five sets, one for each Nursing Practice part, from community health nursing to emergency care. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions, 10 from each Nursing Practice part",
    heroSubs: [
      "Five parts, four mock exams. Every part counts.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You're ready for the NLE.",
    ],
    sourceLine: "Based on the PRC program for the Nurse Licensure Examination, Nursing Practice I to V. Original questions; 50 per test, 10 from each part. Not affiliated with the PRC.",
    analyticsKey: "phnle",
  },
};
```

Append `phnle` to the `EXAMS` array (after `phlet`). Check: 19101-19105 (sets) and 19101-19104
(tests) are free (BRIEF reserves idBase 19100).

## lib/banks/all.ts

```ts
import "./phnle";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/phnle.ts`.

## types/index.ts

- `QuestionType`: add `| "PHNLE"`.
- `QuestionCategory`, under a `// Philippine Nurse Licensure Examination (NLE)` comment:

```ts
  | "phnleChn"
  | "phnleProf"
  | "phnleMaternal"
  | "phnleGrowth"
  | "phnleSurgOxy"
  | "phnleMetabNeuro"
  | "phnleMental"
  | "phnleCritical"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    phnleChn: "Community Health Nursing & DOH Programs",
    phnleProf: "Nursing Law, Ethics & Leadership",
    phnleMaternal: "Care of Mother & Adolescent",
    phnleGrowth: "Human Growth & Development",
    phnleSurgOxy: "Surgery, Oxygenation, Fluids, Infection & Cancer",
    phnleMetabNeuro: "Nutrition, GI, Endocrine & Neuro-Sensory",
    phnleMental: "Psychiatric & Mental Health Nursing",
    phnleCritical: "Emergency & Critical Care",
```

## app/globals.css

Hue from the international batch 2 table (185 70% 22%, already checked; white-text contrast about
8:1). Nearest themes: nclexpn 185 70% 32% (10 points of lightness apart), kentsa 182 90% 26% (20
of saturation), ccma 188 70% 33% (11 of lightness). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Philippine Nurse Licensure Examination (NLE) theme */
  [data-theme="phnle"] {
    --brand: 185 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 185 50% 95%;
    --brand-hover: 185 70% 18%;
    --brand-dark: 185 70% 16%;
    --brand-darker: 185 65% 11%;
    --brand-muted: 185 30% 68%;
    --brand-border: 185 30% 78%;
    --brand-border-light: 185 25% 88%;
    --brand-gradient-to: 200 45% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `phnle: "NLE reviewer for the Philippine Nurse Licensure Examination: Nursing Practice I to V, from community health nursing and DOH programs to maternal and child care, medical-surgical, psychiatric and emergency nursing, with R.A. 9173 and nursing ethics.",`
- `EXAM_ORG`: `phnle: "PRC · Professional Regulatory Board of Nursing",`
- Hub group: new group, placed after "Philippines government and licensure exams" (the brief's
  name, shared with phmedtech, phpharm, phmidwife, phpsychom):
  `{ title: "Philippines health board exams", ids: ["phnle", "phmedtech", "phpharm", "phmidwife", "phpsychom"] },`
  (list only the ids that are wired).
- `SEARCH_ALIASES`:
  `phnle: "nle reviewer nle pnle nursing board exam nurse licensure exam nurse licensure examination philippine nurse licensure examination nursing board exam reviewer nursing board exam philippines prc nursing board exam nle mock exam nursing practice 1 2 3 4 5 np1 np2 np3 np4 np5 community health nursing reviewer chn reviewer bsn board exam registered nurse philippines",`
- `RELATED_OVERRIDES`: `phnle: ["phmidwife", "nclex", "gulfrn"],` (drop `phmidwife` if it is not
  wired; `uknmc` is a good fallback, since many Filipino nurses take it later).

## lib/region.ts

- `TEST_REGIONS`: `phnle: "PH",` (next to `phlto`, `phcse`, `phlet`), and add `"phnle"` to
  `NON_DRIVING_TESTS`.
- `REGION_HOME.PH`: the integrator rewrites it once the batch is wired (it now lists LTO, Civil
  Service and LET). Suggested lead clause for this exam: "the Nurse Licensure Examination (NLE)".
  `lib/regionHeadline.ts` builds from hub groups, so the new group appears without a change.

## lib/examFacts.ts

```ts
  phnle: {
    answer:
      "The Philippine Nurse Licensure Examination (NLE or PNLE, the nursing board exam) is the written exam every applicant for a nursing license must pass under the Philippine Nursing Act of 2002 (R.A. 9173). The Professional Regulation Commission gives it through the Professional Regulatory Board of Nursing. It has five parts over two days, Nursing Practice I to V, each two hours: community health nursing; care of the mother and adolescent, and human growth and development; surgery, oxygenation, fluids and electrolytes, infection and immunity, and cellular aberrations; nutrition, gastrointestinal, metabolism and endocrine, and perception and coordination; and maladaptive behavior plus life-threatening and emergency care. Guides report 100 items per part. To pass you need a general average of at least 75% with no subject below 60%.",
    rows: [
      { label: "Run by", value: "PRC, Professional Regulatory Board of Nursing" },
      { label: "Parts", value: "Nursing Practice I to V, over two days" },
      { label: "Time", value: "2 hours per part" },
      { label: "Items", value: "Guides report 100 per part (500 in all)" },
      { label: "Pass mark", value: "General average 75%, no subject below 60% (R.A. 9173)" },
      { label: "Format", value: "Pen and paper; calculators not allowed" },
      { label: "2026 sittings", value: "February 26-27 and August 29-30; check PRC for the next" },
      { label: "Not modelled here", value: "Situational item sets and the 60% subject floor" },
    ],
    basedOn: "PRC program of the Nurses Licensure Examination, August 29-30, 2026, Board of Nursing Resolution No. 10, s. 2025 and R.A. 9173, checked November 2026",
    source: { name: "Professional Regulation Commission", url: "https://www.prc.gov.ph/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"phnle"` to `TEACHER_LED` (NLE review centers and BSN programs), and in `TEACHES`:
`phnle: "an NLE review class or a nursing school class",`. The landing already renders
`<ExamClassFaq examId="phnle" />` and `classFaqJsonLd("phnle")`.

## lib/tigerAssets.ts

Borrow the nursing tiger through `BORROWED_SETS`: `phnle: "nclex",` (as `gulfrn`, `uknmc` and
`kenck` do).

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/classQuestions.ts

Nothing: `stethoscope` exists, sitemaps map over `EXAMS`, no redirects, v1 banks load through
`lib/banks/all.ts`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 40 each, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing phnle:nurse-licensure-exam:19101`

## CLAUDE.md (under Additional Exams, after the LET Reviewer bullet)

```md
- **NLE Reviewer** (Philippine Nurse Licensure Examination, PRC, `/nurse-licensure-exam/*`, landing `/nle-reviewer-practice-test`): `data/philippines-nle-questions.json` (200 original questions across the five Nursing Practice parts of the PRC program (Aug 29-30, 2026): NP I community health nursing and DOH programs 28 plus nursing law, ethics and leadership 12; NP II care of the mother and adolescent 28 plus human growth and development 12; NP III surgery, oxygenation, fluids, infection and cellular aberrations 40; NP IV nutrition, GI, endocrine and neuro-sensory 40; NP V psychiatric nursing 24 plus emergency and critical care 16), test IDs 19101-19104 (50 questions each, 10 per part), sets 19101-19105 (one per part), state `PHNLE`, prefix `PHNLE-`, 75% pass (R.A. 9173 also needs no subject below 60%, not modelled). 7/3/7/3/10/10/6/4 per test, no spares; splits inside a part are Tigertest's, since Annex A of Board Res. No. 10, s. 2025 (the enhanced TOS) was not published. The real exam is five 2-hour parts of 100 items each (per guides) in situational sets; ours stand alone. Philippine law and programs (R.A. 9173, 9288, 10152, 10354, 10028, 11036, 11166, 11223, 10173, 10912; NIP, EINC, DOTS, Garantisadong Pambata), generic drug names, US spelling. Kept clear of `nclex`, `nclexpn`, `gulfrn`, `kenck` and `cna`. Built by `tools/next100/phnle/build.py`; sources in `tools/next100/phnle/sources.md`. Region PH, hub group "Philippines health board exams", `[data-theme="phnle"]` deep teal (185 70% 22%), borrows the NCLEX tiger, teacher-led (review centers).
```
