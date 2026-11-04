# Wiring for `nbdhe` (National Board Dental Hygiene Examination, US, v1)

Files already written by the builder: `data/nbdhe-questions.json` (200, PASS),
`lib/banks/nbdhe.ts`, `app/nbdhe/*` (layout, redirect, dashboard, drill, stats; copied from
`app/arrt-radiography/`), `app/nbdhe-practice-test/page.tsx`, `tools/next100/nbdhe/*` (spec,
sources, `q_*.py`, `build.py`). Everything below goes in shared files. `npx tsc` reports an error
in `lib/banks/nbdhe.ts` until `"nbdhe"` is added to `ExamId`.

Format note: the real exam is 350 multiple-choice questions, 200 discipline-based and 150
case-based on 12 to 15 patient cases. Modelled as four 50-question tests: 33 discipline items
(Scientific Basis 9, clinical services 21, research and community 3) plus 17 text case items
(34%; the real share is 43%, the difference moved to the clinical discipline areas the cases
test). Weights follow the updated JCNDE specifications scheduled for November 2026 (56 / 124 / 20
+ 150 cases). Case items open with "Case:" and a written patient box; no charts, radiographs or
photos. Dashboard = 6 training sets + 4 tests = 10 steps (topic sets, like arrt). Pass line
`ceil(0.75 * 50) = 38`; the real 75 is a scale score (49 to 99), so 75% is a readiness target.

## lib/exams.ts

Add `"nbdhe"` to the `ExamId` union. Icon `tooth` already exists (used by danb).

```ts
const nbdhe: ExamConfig = {
  id: "nbdhe",
  stateCode: "NBDHE",
  idBase: 16700,
  slug: "/nbdhe",
  landingPath: "/nbdhe-practice-test",
  name: "NBDHE Practice Test",
  shortName: "NBDHE",
  examLabel: "NBDHE",
  fullName: "National Board Dental Hygiene Examination",
  questionIdPrefix: "NBDHE-",
  icon: "tooth",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // JCNDE NBDHE 2026 Candidate Guide (updated 9/17/2026), test specifications after the update
  // scheduled for November 2026 (checked November 2026): 350 items. Discipline-based 200:
  // Scientific Basis for Dental Hygiene Practice 56, Provision of Clinical Dental Hygiene
  // Services 124, Research Principles and Community Health 20. Case-based 150 on 12 to 15 cases.
  // Per 50-question test (Tigertest's split): scientific 9 (3/3/3), clinical 21 (3/3/4/4/3/2/2),
  // community 3, written case scenarios 17 (9/5/3). Real result: scale score 49 to 99, 75 passes;
  // 75% here is a readiness marker. No image items. All items original.
  blueprint: {
    nbdheAnat: 3,
    nbdheBiosci: 3,
    nbdhePathPharm: 3,
    nbdheAssess: 3,
    nbdheRad: 3,
    nbdheCare: 4,
    nbdhePerio: 4,
    nbdhePrev: 3,
    nbdheSupport: 2,
    nbdheProf: 2,
    nbdheCommunity: 3,
    nbdheCasePerio: 9,
    nbdheCaseMed: 5,
    nbdheCasePeds: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 16701, name: "Scientific Basis", categories: ["nbdheAnat", "nbdheBiosci", "nbdhePathPharm"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 2, id: 16702, name: "Assessment, Radiography & Care Planning", categories: ["nbdheAssess", "nbdheRad", "nbdheCare"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 16703, name: "Periodontics, Prevention & Supportive Care", categories: ["nbdhePerio", "nbdhePrev", "nbdheSupport"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 4, id: 16704, name: "Professional Responsibility & Community Health", categories: ["nbdheProf", "nbdheCommunity"], size: 20, weightLabel: "5 of 50 test questions" },
    { setNumber: 5, id: 16705, name: "Patient Cases: Adult Periodontal & Geriatric", categories: ["nbdheCasePerio"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 6, id: 16706, name: "Patient Cases: Medically Compromised, Special Needs & Pediatric", categories: ["nbdheCaseMed", "nbdheCasePeds"], size: 32, weightLabel: "8 of 50 test questions" },
  ],
  categoryLabels: {
    nbdheAnat: "Anatomy, Histology & Embryology",
    nbdheBiosci: "Physiology, Nutrition, Microbiology & Immunology",
    nbdhePathPharm: "Pathology & Pharmacology",
    nbdheAssess: "Patient Assessment",
    nbdheRad: "Dental Radiography",
    nbdheCare: "Care Planning, Emergencies & Pain Control",
    nbdhePerio: "Periodontal Disease Management",
    nbdhePrev: "Preventive Agents",
    nbdheSupport: "Supportive Treatment Services",
    nbdheProf: "Professional Responsibility",
    nbdheCommunity: "Research & Community Health",
    nbdheCasePerio: "Cases: Adult Periodontal & Geriatric",
    nbdheCaseMed: "Cases: Medically Compromised & Special Needs",
    nbdheCasePeds: "Cases: Pediatric",
  },
  copy: {
    guestPrompt: "to save your NBDHE progress and track every question you miss",
    trainingHeading: "Train by NBDHE content area",
    trainingSub: "Six sets covering the discipline-based areas of the JCNDE test specifications and two sets of written patient cases. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions with patient cases",
    heroSubs: [
      "Discipline questions plus patient cases. Clinical services weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You're board ready.",
    ],
    sourceLine: "Based on the JCNDE NBDHE test specifications. Original questions; 50 per test with written patient cases. Not affiliated with the JCNDE or the ADA.",
    analyticsKey: "nbdhe",
  },
};
```

Append `nbdhe` to the `EXAMS` array (with the healthcare exams, after `danb`).

Check: 16701-16706 (tests 16701-16704, sets 16701-16706) must be free (row assigns idBase 16700).

## lib/banks/all.ts

```ts
import "./nbdhe";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/nbdhe.ts`.

## types/index.ts

- `QuestionType`: add `| "NBDHE"`.
- `QuestionCategory`, under a `// NBDHE` comment:

```ts
  | "nbdheAnat"
  | "nbdheBiosci"
  | "nbdhePathPharm"
  | "nbdheAssess"
  | "nbdheRad"
  | "nbdheCare"
  | "nbdhePerio"
  | "nbdhePrev"
  | "nbdheSupport"
  | "nbdheProf"
  | "nbdheCommunity"
  | "nbdheCasePerio"
  | "nbdheCaseMed"
  | "nbdheCasePeds"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nbdheAnat: "Anatomy, Histology & Embryology",
    nbdheBiosci: "Physiology, Nutrition, Microbiology & Immunology",
    nbdhePathPharm: "Pathology & Pharmacology",
    nbdheAssess: "Patient Assessment",
    nbdheRad: "Dental Radiography",
    nbdheCare: "Care Planning, Emergencies & Pain Control",
    nbdhePerio: "Periodontal Disease Management",
    nbdhePrev: "Preventive Agents",
    nbdheSupport: "Supportive Treatment Services",
    nbdheProf: "Professional Responsibility",
    nbdheCommunity: "Research & Community Health",
    nbdheCasePerio: "Cases: Adult Periodontal & Geriatric",
    nbdheCaseMed: "Cases: Medically Compromised & Special Needs",
    nbdheCasePeds: "Cases: Pediatric",
```

## app/globals.css

Hue as given in the brief (180 40% 26%, already checked), then run `tools/gen_dark_brand_css.py`.

```css
  /* NBDHE theme */
  [data-theme="nbdhe"] {
    --brand: 180 40% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 180 35% 95%;
    --brand-hover: 180 40% 22%;
    --brand-dark: 180 40% 20%;
    --brand-darker: 180 40% 14%;
    --brand-muted: 180 25% 68%;
    --brand-border: 180 28% 78%;
    --brand-border-light: 180 25% 88%;
    --brand-gradient-to: 195 35% 96%;
  }
```

## lib/tigerAssets.ts

`BORROWED_SETS`: `nbdhe: "danb",` (the dental tiger) until the NBDHE gets its own set.

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nbdhe: "National Board Dental Hygiene Examination practice on the JCNDE test specifications: scientific basis, assessment, radiography, periodontics, preventive agents and written patient cases.",`
- `EXAM_ORG`: `nbdhe: "JCNDE · National Board Dental Hygiene Examination",`
- Hub group: add `"nbdhe"` to `{ title: "Healthcare certification exams", ids: [...] }` (after `"danb"`).
- `SEARCH_ALIASES`:
  `nbdhe: "nbdhe national board dental hygiene exam examination dental hygienist hygiene boards rdh board exam jcnde dental hygiene national boards case based periodontics",`

## lib/region.ts

Nothing: US is the default.

## lib/examFacts.ts

```ts
  nbdhe: {
    answer:
      "The National Board Dental Hygiene Examination (NBDHE) is the Joint Commission on National Dental Examinations' written board exam for dental hygienists, used by US licensing jurisdictions as part of dental hygiene licensure. It has 350 multiple-choice questions in two sessions: 200 discipline-based questions in 3 hours 30 minutes and 150 case-based questions on 12 to 15 patient cases in 4 hours, about 9 hours in all with breaks. Under the updated specifications scheduled for November 2026, the discipline-based questions are Scientific Basis 56, Clinical Dental Hygiene Services 124 and Research Principles and Community Health 20. Results are pass or fail; scale scores run from 49 to 99 and 75 is the minimum passing score.",
    rows: [
      { label: "Questions", value: "350 multiple choice (200 discipline-based, 150 case-based)" },
      { label: "Time", value: "3 h 30 min + 4 h of testing, about 9 hours with breaks" },
      { label: "Pass mark", value: "Scale score of 75 (scale 49 to 99), reported pass or fail" },
      { label: "Content", value: "Scientific Basis 56, Clinical Services 124, Research and Community Health 20, Cases 150" },
      { label: "Patient cases", value: "12 to 15 cases: geriatric, periodontal, pediatric, special needs, medically compromised" },
      { label: "Where", value: "Pearson VUE test centers in the US and Canada, year-round" },
      { label: "Run by", value: "Joint Commission on National Dental Examinations (JCNDE)" },
    ],
    basedOn: "The JCNDE NBDHE 2026 Candidate Guide (updated September 17, 2026) and the JCNDE NBDHE page, checked November 2026",
    source: { name: "JCNDE: NBDHE", url: "https://jcnde.ada.org/nbdhe" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"nbdhe"` to `TEACHER_LED` (dental hygiene programs assign board review), and in `TEACHES`:
`nbdhe: "a dental hygiene program",`. The landing already renders `<ExamClassFaq examId="nbdhe" />`
and `classFaqJsonLd("nbdhe")`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `tooth` exists; sitemaps map over `EXAMS`; no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nbdhe:nbdhe:16701`

## CLAUDE.md (under Additional Exams)

```md
- **NBDHE** (JCNDE National Board Dental Hygiene Examination, `/nbdhe/*`, landing `/nbdhe-practice-test`): `data/nbdhe-questions.json` (200 questions on the JCNDE test specifications updated November 2026 (Scientific Basis 56, Clinical Dental Hygiene Services 124, Research Principles and Community Health 20, plus 150 case-based items on 12 to 15 cases): anatomy 12, biosciences 12, pathology and pharmacology 12, assessment 12, radiography 12, care planning 16, periodontics 16, preventive agents 12, supportive 8, professional 8, research and community 12, cases adult periodontal and geriatric 36, medically compromised and special needs 20, pediatric 12), test IDs 16701-16704, sets 16701-16706 (by area; two case sets), state `NBDHE`, prefix `NBDHE-`, 75% pass (readiness marker; the real 75 is a scale score from 49 to 99). 3/3/3/3/3/4/4/3/2/2/3/9/5/3 per test: 17 of 50 are written case scenarios (34%, real 43%), each a standalone "Case:" patient box with findings in words, no charts or images. Checked against `danb`, `arrt` and `nce` for repeated facts. Built by `tools/next100/nbdhe/build.py`; sources in `tools/next100/nbdhe/sources.md`. Hub group "Healthcare certification exams", `[data-theme="nbdhe"]` dark teal (180 40% 26%), borrows the DANB tiger, teacher-led (dental hygiene programs).
```
