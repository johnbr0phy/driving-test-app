# Wiring for `phmedtech` (Philippines Medical Technologist Licensure Examination, MTLE, v1)

Files already written by the builder: `data/philippines-medtech-questions.json` (200, PASS),
`lib/banks/phmedtech.ts`, `app/medtech-board-exam/*` (layout, redirect, dashboard, drill, stats;
copied from `app/let-reviewer/`), `app/medtech-board-exam-reviewer-practice-test/page.tsx`,
`tools/next100/phmedtech/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/phmedtech/build.py`. Everything below goes in shared files. `npx tsc`
reports an error in `lib/banks/phmedtech.ts` and the wrappers until `"phmedtech"` is in `ExamId`.

Format note: the real MTLE is six subjects of 100 items each (PRB-MT Resolution No. 13, s. 2023,
Annex A TOS) over two days, each subject a two-hour session (PRC program, August 15 and 16, 2026):
Clinical Chemistry 20%, Microbiology and Parasitology 20%, Clinical Microscopy 10%, Hematology 20%,
Blood Banking and Serology 20%, Histopathologic Techniques, MT Laws and Ethics 10% (also RA 5527
Sec. 17). To pass: general average of at least 75%, no major subject below 50%, and not failed in
60% or more of the subjects by weight (RA 5527 Sec. 19). 600 items is far longer than a useful
mock, so Tigertest models four 50-question tests at the same weights: 10/10/5/10/10/5, with
Microbiology and Parasitology split 7/3 (TOS: 70/30), Blood Banking and Serology split 5/5
(TOS: sections A to E 48 items, F to J 52), and Histopath/Laws split 3/2 (TOS: 65/35). Pass line
75%; the per-subject rules are not modelled (the landing says so). Pools exactly 4x per test.
Dashboard = 5 subject sets + 4 tests = 9 steps. No set exceeds 60.

## lib/exams.ts

Add `"phmedtech"` to the `ExamId` union. Icon `microscope` already exists.

```ts
const phmedtech: ExamConfig = {
  id: "phmedtech",
  stateCode: "PHMEDTECH",
  idBase: 19400,
  slug: "/medtech-board-exam",
  landingPath: "/medtech-board-exam-reviewer-practice-test",
  name: "MedTech Board Exam Reviewer",
  shortName: "MTLE",
  examLabel: "MTLE",
  fullName: "Medical Technologist Licensure Examination (MTLE)",
  questionIdPrefix: "PHMT-",
  icon: "microscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // PRC Professional Regulatory Board of Medical Technology Resolution No. 13, s. 2023, Annex A
  // (enhanced tables of specifications, applied from the August 2023 MTLE; checked 2026-11-05),
  // and the PRC program for the August 15-16, 2026 MTLE: six subjects of 100 items, Clinical
  // Chemistry, Microbiology and Parasitology, Hematology, Blood Banking and Serology 20% each;
  // Clinical Microscopy and Histopathologic Techniques, MT Laws and Ethics 10% each (RA 5527
  // Sec. 17). Each 50-question test keeps those weights: 10/10/10/10/5/5, with Micro/Para 7/3
  // (TOS 70/30), Blood Banking/Serology 5/5 (TOS 48/52) and Histopath/Laws 3/2 (TOS 65/35).
  // Pass: general average 75%, no major subject below 50% (RA 5527 Sec. 19); only the 75% is
  // scored here. Pools are exactly 4x each count. All items original.
  blueprint: {
    phmtChem: 10,
    phmtMicro: 7,
    phmtPara: 3,
    phmtCm: 5,
    phmtHema: 10,
    phmtBank: 5,
    phmtSero: 5,
    phmtHisto: 3,
    phmtLaws: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 19401, name: "Clinical Chemistry", categories: ["phmtChem"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 19402, name: "Microbiology & Parasitology", categories: ["phmtMicro", "phmtPara"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 19403, name: "Hematology", categories: ["phmtHema"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 19404, name: "Blood Banking & Immunoserology", categories: ["phmtBank", "phmtSero"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 19405, name: "Clinical Microscopy, Histopath & MT Laws", categories: ["phmtCm", "phmtHisto", "phmtLaws"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    phmtChem: "Clinical Chemistry",
    phmtMicro: "Microbiology",
    phmtPara: "Parasitology",
    phmtCm: "Clinical Microscopy",
    phmtHema: "Hematology",
    phmtBank: "Blood Banking",
    phmtSero: "Immunology & Serology",
    phmtHisto: "Histopathologic & Cytologic Techniques",
    phmtLaws: "MT Laws, Ethics & Lab Management",
  },
  copy: {
    guestPrompt: "to save your MTLE progress and track every question you miss",
    trainingHeading: "Train by MTLE subject",
    trainingSub: "Five sets covering all six subjects of the Medical Technologist Licensure Examination, on the PRC tables of specifications. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions, weighted like the six subjects",
    heroSubs: [
      "Six subjects, four mock exams. Chemistry, micro, hema and blood bank weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You're ready for the MTLE.",
    ],
    sourceLine: "Based on the PRC tables of specifications for the Medical Technologist Licensure Examination. Original questions; 50 per test, weighted like the real subjects. Not affiliated with the PRC.",
    analyticsKey: "phmedtech",
  },
};
```

Append `phmedtech` to the `EXAMS` array (with the other Philippine exams, after `phlet` or after
`phnle`).

Check: 19401-19405 (sets) and 19401-19404 (tests) must be free (BRIEF reserves idBase 19400).

## lib/banks/all.ts

```ts
import "./phmedtech";
```

## types/index.ts

- `QuestionType`: add `| "PHMEDTECH"`.
- `QuestionCategory`, under a `// Philippines MTLE (medical technologist board exam)` comment:

```ts
  | "phmtChem"
  | "phmtMicro"
  | "phmtPara"
  | "phmtCm"
  | "phmtHema"
  | "phmtBank"
  | "phmtSero"
  | "phmtHisto"
  | "phmtLaws"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    phmtChem: "Clinical Chemistry",
    phmtMicro: "Microbiology",
    phmtPara: "Parasitology",
    phmtCm: "Clinical Microscopy",
    phmtHema: "Hematology",
    phmtBank: "Blood Banking",
    phmtSero: "Immunology & Serology",
    phmtHisto: "Histopathologic & Cytologic Techniques",
    phmtLaws: "MT Laws, Ethics & Lab Management",
```

## app/globals.css

Hue from the brief (checked there against every theme): 170 70% 22%. Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Philippines MTLE (medical technologist board exam) theme */
  [data-theme="phmedtech"] {
    --brand: 170 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 170 45% 95%;
    --brand-hover: 170 70% 18%;
    --brand-dark: 170 70% 16%;
    --brand-darker: 170 70% 11%;
    --brand-muted: 170 30% 68%;
    --brand-border: 170 30% 80%;
    --brand-border-light: 170 30% 89%;
    --brand-gradient-to: 195 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `phmedtech: "MedTech board exam reviewer for the Philippine Medical Technologist Licensure Examination (MTLE): clinical chemistry, microbiology and parasitology, hematology, blood banking and immunoserology, clinical microscopy, histopathologic techniques and MT laws, on the PRC tables of specifications.",`
- `EXAM_ORG`: `phmedtech: "PRC · Professional Regulatory Board of Medical Technology",`
- Hub group: new group, placed after "Philippines government and licensure exams" (shared with
  phnle, phpharm, phmidwife, phpsychom):
  `{ title: "Philippines health board exams", ids: ["phnle", "phmedtech", "phpharm", "phmidwife", "phpsychom"] },`
  (list only the ids that are wired).
- `SEARCH_ALIASES`:
  `phmedtech: "medtech board exam mtle mtle reviewer medtech reviewer medical technology board exam medical technologist licensure examination medical technologist board exam medical laboratory science board exam rmt registered medical technologist prc medtech board exam clinical chemistry reviewer hematology reviewer blood banking reviewer immunoserology reviewer microbiology parasitology reviewer clinical microscopy reviewer histopath reviewer mt laws reviewer",`
- `RELATED_OVERRIDES`: `phmedtech: ["phnle", "phlebotomy", "htl"],` (drop `phnle` if it is not
  wired; `ccma` is a fallback).

## lib/region.ts

```ts
// TEST_REGIONS: on the PH entry (next to phlto, phcse, phlet)
  phmedtech: "PH",
// NON_DRIVING_TESTS: add
  "phmedtech",
```

## lib/examFacts.ts

```ts
  phmedtech: {
    answer:
      "The Medical Technologist Licensure Examination (MTLE), often called the MedTech board exam, is given by the Professional Regulation Commission (PRC) through the Professional Regulatory Board of Medical Technology under RA 5527; a license is required to practice as a medical technologist in the Philippines. It has six subjects over two days, each a two-hour session of 100 items: Clinical Chemistry, Microbiology and Parasitology, Hematology, and Blood Banking and Serology at 20% each, and Clinical Microscopy and Histopathologic Techniques, MT Laws and Ethics at 10% each. To pass you need a general weighted average of at least 75% with no major subject below 50%.",
    rows: [
      { label: "Run by", value: "PRC, Professional Regulatory Board of Medical Technology" },
      { label: "Subjects", value: "Six, 100 items each, over two days" },
      { label: "Time", value: "Two hours per subject, three subjects a day" },
      { label: "Weights", value: "Chemistry, Micro/Para, Hematology, Blood Bank/Serology 20% each; Clinical Microscopy, Histopath/Laws 10% each" },
      { label: "Pass mark", value: "General average 75%, no major subject below 50%" },
      { label: "Calculator", value: "Non-programmable calculators allowed (PRC list)" },
      { label: "Sittings", value: "March and August in 2026; check PRC" },
      { label: "Not modelled here", value: "The per-subject 50% floor and the 60%-of-subjects rule" },
    ],
    basedOn: "PRC Professional Regulatory Board of Medical Technology Resolution No. 13, s. 2023 and its Annex A tables of specifications, the PRC program for the August 15 and 16, 2026 MTLE, and RA 5527 (Philippine Medical Technology Act of 1969), checked November 2026",
    source: { name: "Professional Regulation Commission", url: "https://www.prc.gov.ph/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"phmedtech"` to `TEACHER_LED` (MTLE review centers and BS Medical Technology / Medical
Laboratory Science programs), and in `TEACHES`:
`phmedtech: "an MTLE review class or a medical technology program",`. The landing already renders
`<ExamClassFaq examId="phmedtech" />` and `classFaqJsonLd("phmedtech")`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Suggest borrowing the lab tiger: `phmedtech: "htl",` in
`BORROWED_SETS` (or `"phlebotomy"`).

## components/TestIcon.tsx, lib/sitemaps.ts, next.config.ts, lib/server/*

Nothing: `microscope` exists; sitemaps map over `EXAMS`; class questions import
`lib/banks/all`; no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing phmedtech:medtech-board-exam:19401`

## CLAUDE.md (under Additional Exams, with the Philippine bullets after LET Reviewer)

```md
- **MedTech Board Exam** (Philippines Medical Technologist Licensure Examination, MTLE, `/medtech-board-exam/*`, landing `/medtech-board-exam-reviewer-practice-test`): `data/philippines-medtech-questions.json` (200 original questions on the PRC Board of Medical Technology's enhanced tables of specifications, Resolution No. 13, s. 2023, Annex A: clinical chemistry 40, microbiology 28, parasitology 12, clinical microscopy 20, hematology 40, blood banking 20, immunology and serology 20, histopathologic and cytologic techniques 12, MT laws, ethics and lab management 8), test IDs 19401-19404 (50 questions each, 10/10/5/10/10/5 by subject like the 20/20/10/20/20/10 weights), sets 19401-19405 (by subject), state `PHMEDTECH`, prefix `PHMT-`, 75% pass (the real rule also needs no major subject below 50%, not modelled). 10/7/3/5/10/5/5/3/2 per test, no spares. The real exam is six 100-item subjects over two days, two hours each (PRC program, August 2026). Checked against the htl, phlebotomy, cma and Philippine banks for repeats. Built by `tools/next100/phmedtech/build.py`; sources in `tools/next100/phmedtech/sources.md`. Region PH, hub group "Philippines health board exams", `[data-theme="phmedtech"]` deep teal (170 70% 22%), teacher-led.
```
