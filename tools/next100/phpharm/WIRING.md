# Wiring for `phpharm` (Philippines Pharmacist Licensure Examination, PhLE, v1)

Files already written by the builder: `data/philippines-pharmacist-questions.json` (200, PASS),
`lib/banks/phpharm.ts`, `app/pharmacist-board-exam/*` (5 wrappers copied from `app/let-reviewer/`),
`app/pharmacist-board-exam-reviewer-practice-test/page.tsx`, `tools/next100/phpharm/*` (spec,
sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/phpharm/build.py`.
Everything below goes in shared files. `npx tsc` reports an error in `lib/banks/phpharm.ts` until
`"phpharm"` is in `ExamId`.

Format note: the real PhLE is six subjects over two days (PRC Board of Pharmacy program for April
18 and 19, 2026): Pharmaceutical Chemistry 20%, Pharmacognosy/Biochemistry 15%, Practice of
Pharmacy 17.5%, Pharmacology-Pharmacokinetics 15%, Pharmaceutics 17.5% (includes jurisprudence
and ethics), Quality Control/Quality Assurance 15% (includes microbiology and public health). The
program gives no item count per subject, so Tigertest states none. Passing (R.A. 10918 Sec. 17):
general weighted average 75%, no subject below 50%; only the 75% is modelled. Each 50-question test
is 10/8/9/7/9/7 by subject (20/16/18/14/18/14%), with chemistry split 5 inorganic + 5 organic,
practice 6 + 3 calculations and pharmaceutics 6 + 3 law. Pools exactly 4x per test. Dashboard = 6
subject sets + 4 tests = 10 steps; no set exceeds 60.

## lib/exams.ts

Add `"phpharm"` to the `ExamId` union. Icon `pill` already exists.

```ts
const phpharm: ExamConfig = {
  id: "phpharm",
  stateCode: "PHPHARM",
  idBase: 19500,
  slug: "/pharmacist-board-exam",
  landingPath: "/pharmacist-board-exam-reviewer-practice-test",
  name: "Pharmacist Board Exam Reviewer",
  shortName: "PhLE",
  examLabel: "PhLE",
  fullName: "Pharmacist Licensure Examination (PhLE), Philippines",
  questionIdPrefix: "PHRPH-",
  icon: "pill",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // PRC Professional Regulatory Board of Pharmacy, revised program of the PhLE on April 18 and 19,
  // 2026 (checked 2026-11-05): Pharmaceutical Chemistry 20%, Pharmacognosy/Biochemistry 15%,
  // Practice of Pharmacy 17.5% (compounding-dispensing, clinical/hospital, calculations),
  // Pharmacology-Pharmacokinetics 15%, Pharmaceutics 17.5% (manufacturing, dosage forms, physical
  // pharmacy, jurisprudence and ethics), Quality Control/Quality Assurance 15% (instrumentation,
  // microbiology, public health). Each 50-question test is 10/8/9/7/9/7 by subject. Pass (R.A.
  // 10918 Sec. 17): general weighted average 75%, no subject below 50%; only the 75% is scored here.
  // Pools are exactly 4x each count. All items original.
  blueprint: {
    phpharmInorg: 5,
    phpharmOrgMed: 5,
    phpharmCognosy: 8,
    phpharmPractice: 6,
    phpharmCalc: 3,
    phpharmPharmacol: 7,
    phpharmPharmaceutics: 6,
    phpharmLaw: 3,
    phpharmQc: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 19501, name: "Pharmaceutical Chemistry", categories: ["phpharmInorg", "phpharmOrgMed"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 19502, name: "Pharmacognosy & Biochemistry", categories: ["phpharmCognosy"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 3, id: 19503, name: "Practice of Pharmacy & Calculations", categories: ["phpharmPractice", "phpharmCalc"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 4, id: 19504, name: "Pharmacology & Toxicology", categories: ["phpharmPharmacol"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 5, id: 19505, name: "Pharmaceutics & Jurisprudence", categories: ["phpharmPharmaceutics", "phpharmLaw"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 6, id: 19506, name: "QC, Microbiology & Public Health", categories: ["phpharmQc"], size: 28, weightLabel: "7 of 50 test questions" },
  ],
  categoryLabels: {
    phpharmInorg: "Inorganic & Qualitative Pharmaceutical Chemistry",
    phpharmOrgMed: "Organic & Medicinal Chemistry",
    phpharmCognosy: "Pharmacognosy, Plant Chemistry & Biochemistry",
    phpharmPractice: "Dispensing, Clinical & Hospital Pharmacy",
    phpharmCalc: "Pharmaceutical Calculations",
    phpharmPharmacol: "Pharmacology, Pharmacokinetics & Toxicology",
    phpharmPharmaceutics: "Pharmaceutics & Manufacturing Pharmacy",
    phpharmLaw: "Pharmacy Jurisprudence & Ethics",
    phpharmQc: "Quality Control, Microbiology & Public Health",
  },
  copy: {
    guestPrompt: "to save your PhLE progress and track every question you miss",
    trainingHeading: "Train by PhLE subject",
    trainingSub: "Six sets, one for each subject of the PRC exam program, from pharmaceutical chemistry to quality control. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions across all six subjects",
    heroSubs: [
      "Six subjects, four mock exams. Chemistry weighs most.",
      "Master each subject set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You're ready for the PhLE.",
    ],
    sourceLine: "Based on the PRC Board of Pharmacy exam program and Philippine pharmacy law. Original questions; 50 per test, weighted like the six subjects. Not affiliated with the PRC.",
    analyticsKey: "phpharm",
  },
};
```

Append `phpharm` to the `EXAMS` array (after `phlet`, or with the other batch-2 Philippine exams).

Check: 19501-19506 (sets) and 19501-19504 (tests) must be free (BRIEF reserves idBase 19500).

## lib/banks/all.ts

```ts
import "./phpharm";
```

## types/index.ts

- `QuestionType`: add `| "PHPHARM"`.
- `QuestionCategory`, under a `// Philippines Pharmacist Licensure Examination` comment:

```ts
  | "phpharmInorg"
  | "phpharmOrgMed"
  | "phpharmCognosy"
  | "phpharmPractice"
  | "phpharmCalc"
  | "phpharmPharmacol"
  | "phpharmPharmaceutics"
  | "phpharmLaw"
  | "phpharmQc"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    phpharmInorg: "Inorganic & Qualitative Pharmaceutical Chemistry",
    phpharmOrgMed: "Organic & Medicinal Chemistry",
    phpharmCognosy: "Pharmacognosy, Plant Chemistry & Biochemistry",
    phpharmPractice: "Dispensing, Clinical & Hospital Pharmacy",
    phpharmCalc: "Pharmaceutical Calculations",
    phpharmPharmacol: "Pharmacology, Pharmacokinetics & Toxicology",
    phpharmPharmaceutics: "Pharmaceutics & Manufacturing Pharmacy",
    phpharmLaw: "Pharmacy Jurisprudence & Ethics",
    phpharmQc: "Quality Control, Microbiology & Public Health",
```

## app/globals.css

Hue as given in the brief (140 20% 22%, checked by the brief's script). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Philippines Pharmacist Licensure Examination theme */
  [data-theme="phpharm"] {
    --brand: 140 20% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 140 25% 95%;
    --brand-hover: 140 20% 17%;
    --brand-dark: 140 20% 16%;
    --brand-darker: 140 20% 10%;
    --brand-muted: 140 14% 68%;
    --brand-border: 140 14% 80%;
    --brand-border-light: 140 14% 89%;
    --brand-gradient-to: 170 25% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `phpharm: "Pharmacist board exam reviewer for the Philippine Pharmacist Licensure Examination (PhLE): pharmaceutical chemistry, pharmacognosy and biochemistry, practice of pharmacy and calculations, pharmacology and toxicology, pharmaceutics and pharmacy law, and quality control, microbiology and public health, weighted like the PRC exam program.",`
- `EXAM_ORG`: `phpharm: "PRC · Professional Regulatory Board of Pharmacy",`
- Hub group (new, after "Philippines government and licensure exams", shared with the batch-2
  health builders): `{ title: "Philippines health board exams", ids: ["phnle", "phmedtech", "phpharm", "phmidwife", "phpsychom"] }`
- `SEARCH_ALIASES`:
  `phpharm: "pharmacist board exam pharmacist licensure exam phle phle reviewer pharmacy board exam pharmacist reviewer pharmacy board exam philippines prc pharmacist exam pharmacist licensure examination rph board exam pharmacy licensure exam pharmacist mock exam",`
- `RELATED_OVERRIDES`: `phpharm: ["phnle", "phmedtech", "ptcb"],`

## lib/region.ts

```ts
// TEST_REGIONS: on the PH entry (next to phlto, phcse, phlet)
  phpharm: "PH",
// NON_DRIVING_TESTS: add
  "phpharm",
```

## lib/examFacts.ts

```ts
  phpharm: {
    answer:
      "The Pharmacist Licensure Examination (PhLE) is given by the Professional Regulation Commission (PRC) through the Professional Regulatory Board of Pharmacy; under R.A. 10918, the Philippine Pharmacy Act, you must pass it to practice as a pharmacist in the Philippines, and it is held twice a year. It has six subjects over two days. In the April 2026 program they are Pharmaceutical Chemistry 20%, Pharmacognosy and Biochemistry 15%, Practice of Pharmacy 17.5%, Pharmacology and Pharmacokinetics 15%, Pharmaceutics 17.5% (with jurisprudence and ethics) and Quality Control and Quality Assurance 15%. To pass you need a general weighted average of at least 75% with no subject below 50%. Only basic calculators are allowed.",
    rows: [
      { label: "Run by", value: "PRC, Professional Regulatory Board of Pharmacy" },
      { label: "Subjects", value: "Six, over two days (Saturday and Sunday)" },
      { label: "Weights", value: "Pharm Chem 20%, Pharmacognosy 15%, Practice 17.5%, Pharmacology 15%, Pharmaceutics 17.5%, QC/QA 15%" },
      { label: "Time per subject", value: "1.5 to 2 hours (April 2026 program)" },
      { label: "Pass mark", value: "General weighted average 75%, no subject below 50%" },
      { label: "Calculator", value: "Basic only (+, -, x, /, memory and square root)" },
      { label: "Sittings", value: "Twice a year; check PRC for dates" },
      { label: "Not modelled here", value: "The 50% per-subject floor" },
    ],
    basedOn: "PRC Professional Regulatory Board of Pharmacy, revised program of the Pharmacists Licensure Examination on April 18 and 19, 2026, and R.A. 10918 (Philippine Pharmacy Act) Sec. 15 to 17, checked November 2026",
    source: { name: "Professional Regulation Commission", url: "https://www.prc.gov.ph/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"phpharm"` to `TEACHER_LED` (PhLE review centers and pharmacy schools), and in `TEACHES`:
`phpharm: "a pharmacist board exam review class or a pharmacy program",`. The landing already
renders `<ExamClassFaq examId="phpharm" />` and `classFaqJsonLd("phpharm")`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Suggest borrowing the pharmacy technician tiger:
`phpharm: "ptcb",` in `BORROWED_SETS`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/*

Nothing: `pill` exists; sitemaps map over `EXAMS`; class questions import `lib/banks/all`; no
redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing phpharm:pharmacist-board-exam:19501`

## CLAUDE.md (under Additional Exams, after the LET Reviewer bullet)

```md
- **Pharmacist Board Exam** (Philippines Pharmacist Licensure Examination, PhLE, `/pharmacist-board-exam/*`, landing `/pharmacist-board-exam-reviewer-practice-test`): `data/philippines-pharmacist-questions.json` (200 original questions on the six subjects of the PRC Board of Pharmacy exam program for April 18 and 19, 2026: Pharmaceutical Chemistry 20% as inorganic and qualitative 20 and organic and medicinal 20; Pharmacognosy/Biochemistry 15% as 32; Practice of Pharmacy 17.5% as dispensing, clinical and hospital 24 and calculations 12; Pharmacology-Pharmacokinetics 15% as 28; Pharmaceutics 17.5% as dosage forms, physical and manufacturing 24 and jurisprudence and ethics 12; QC/QA with microbiology and public health 15% as 28), test IDs 19501-19504 (50 questions each), sets 19501-19506 (one per subject), state `PHPHARM`, prefix `PHRPH-`, 75% pass (R.A. 10918 Sec. 17 also needs no subject below 50%, not modelled). 5/5/8/6/3/7/6/3/7 per test, no spares. The program gives no item count per subject, so none is stated. Philippine law (R.A. 10918, R.A. 6675 and its A.O. 62 prescription rules, R.A. 9711, R.A. 9165), DOH-endorsed herbal medicines and DOH programs; generic names; kept clear of `data/ptcb-questions.json`, `phnle` and `phmedtech`. Built by `tools/next100/phpharm/build.py`; sources in `tools/next100/phpharm/sources.md`. Region PH, hub group "Philippines health board exams", `[data-theme="phpharm"]` dark sage (140 20% 22%), borrows the PTCB tiger, teacher-led (review centers).
```
