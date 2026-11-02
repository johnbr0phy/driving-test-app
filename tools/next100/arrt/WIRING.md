# Wiring for `arrt` (ARRT Radiography certification exam, US, v1)

Files already written by the builder: `data/arrt-questions.json` (200, PASS),
`lib/banks/arrt.ts`, `app/arrt-radiography/*` (layout, redirect, dashboard, drill, stats; copied
from `app/rbt/`), `app/arrt-radiography-practice-test/page.tsx`, `tools/next100/arrt/*` (spec,
sources, `q_*.py`, `build.py`). Everything below goes in shared files. `npx tsc` reports an error
in `lib/banks/arrt.ts` until `"arrt"` is added to `ExamId`.

Format note: the real exam is 230 questions (200 scored + 30 unscored pilot). Modelled as the
standard four 50-question tests weighted like the 200 scored items under the content
specifications in force through February 28, 2027 (Patient Care 33, Safety 50, Image Production
51, Procedures 66, split into 8 subcategory pools). Dashboard = 5 training sets + 4 tests = 9
steps (topic sets like the template, not `testSets()`). Pass line `ceil(0.75 * 50) = 38`; the
real standard is a scaled score of 75 (1 to 99), per guides, so 75% is a readiness target. Pools
are exactly 4x per-test, so no item repeats across tests. When the 2027 specifications take effect
(March 1, 2027: 31/46/51/72), re-weight per test to about 8/5/6/7/6/5/6/7 and retire ARRT-EQP-014 (CR).

## lib/exams.ts

Add `"arrt"` to the `ExamId` union. Icon `activity` already exists (a `scan` or `bone` lucide
icon would fit better if the integrator wants to add one to the icon union, `TestIcon.tsx` and
`CDLHeader.tsx`).

```ts
const arrt: ExamConfig = {
  id: "arrt",
  stateCode: "ARRT",
  idBase: 15500,
  slug: "/arrt-radiography",
  landingPath: "/arrt-radiography-practice-test",
  name: "ARRT Radiography Practice Test",
  shortName: "ARRT",
  examLabel: "ARRT Radiography exam",
  fullName: "ARRT Radiography certification exam",
  questionIdPrefix: "ARRT-",
  icon: "activity",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // ARRT Radiography Examination Content Specifications, board approved January 2021, in effect
  // January 1, 2022 through February 28, 2027 (checked November 2026): 200 scored + 30 unscored
  // pilot questions. Patient Care 33; Safety 50 (radiation physics and radiobiology 21, radiation
  // protection 29); Image Production 51 (image acquisition and evaluation 26, equipment operation
  // and QA 25); Procedures 66 (head, spine and pelvis 18, thorax and abdomen 20, extremities 28).
  // Scaled to 50 per test: 8/5/7/7/6/5/5/7. ARRT reports a scaled score (75 to pass, per guides);
  // 75% is a readiness marker. Revised specifications from March 1, 2027: 31/46/51/72.
  // No image items. All items original.
  blueprint: {
    arrtCare: 8,
    arrtPhysics: 5,
    arrtProtect: 7,
    arrtAcq: 7,
    arrtEquip: 6,
    arrtHead: 5,
    arrtThorax: 5,
    arrtExtrem: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 15501, name: "Patient Care", categories: ["arrtCare"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 15502, name: "Radiation Physics & Protection", categories: ["arrtPhysics", "arrtProtect"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 15503, name: "Image Production", categories: ["arrtAcq", "arrtEquip"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 4, id: 15504, name: "Head, Spine, Thorax & Abdomen", categories: ["arrtHead", "arrtThorax"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 15505, name: "Extremity Procedures", categories: ["arrtExtrem"], size: 28, weightLabel: "7 of 50 test questions" },
  ],
  categoryLabels: {
    arrtCare: "Patient Care",
    arrtPhysics: "Radiation Physics & Radiobiology",
    arrtProtect: "Radiation Protection",
    arrtAcq: "Image Acquisition & Evaluation",
    arrtEquip: "Equipment Operation & QA",
    arrtHead: "Head, Spine & Pelvis Procedures",
    arrtThorax: "Thorax & Abdomen Procedures",
    arrtExtrem: "Extremity Procedures",
  },
  copy: {
    guestPrompt: "to save your ARRT progress and track every question you miss",
    trainingHeading: "Train by ARRT content category",
    trainingSub: "Five sets covering all four categories of the ARRT Radiography content specifications. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions weighted like the real 200 scored",
    heroSubs: [
      "Four categories, four mock exams. Procedures weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You're registry ready.",
    ],
    sourceLine: "Based on the ARRT Radiography Examination Content Specifications. Original questions; 50 per test, weighted like the real exam. Not affiliated with ARRT.",
    analyticsKey: "arrt",
  },
};
```

Append `arrt` to the `EXAMS` array (with the healthcare exams, after `rbt`).

Check: 15501-15505 (tests 15501-15504, sets 15501-15505) must be free (row assigns idBase 15500).

## lib/banks/all.ts

```ts
import "./arrt";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/arrt.ts`.

## types/index.ts

- `QuestionType`: add `| "ARRT"`.
- `QuestionCategory`, under a `// ARRT Radiography` comment:

```ts
  | "arrtCare"
  | "arrtPhysics"
  | "arrtProtect"
  | "arrtAcq"
  | "arrtEquip"
  | "arrtHead"
  | "arrtThorax"
  | "arrtExtrem"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    arrtCare: "Patient Care",
    arrtPhysics: "Radiation Physics & Radiobiology",
    arrtProtect: "Radiation Protection",
    arrtAcq: "Image Acquisition & Evaluation",
    arrtEquip: "Equipment Operation & QA",
    arrtHead: "Head, Spine & Pelvis Procedures",
    arrtThorax: "Thorax & Abdomen Procedures",
    arrtExtrem: "Extremity Procedures",
```

## app/globals.css

Hue as given in the brief (186 90% 34%), then run `tools/gen_dark_brand_css.py`. Note: white on
`186 90% 34%` measures about 3.6:1 (below 4.5:1); `186 90% 27%` gives about 5:1 if the integrator
wants to darken it. It is 2 degrees from cca (188 62% 40%), separated by 28 points of saturation.

```css
  /* ARRT Radiography theme */
  [data-theme="arrt"] {
    --brand: 186 90% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 186 80% 96%;
    --brand-hover: 186 90% 29%;
    --brand-dark: 186 90% 25%;
    --brand-darker: 186 80% 17%;
    --brand-muted: 186 40% 72%;
    --brand-border: 186 45% 80%;
    --brand-border-light: 186 40% 89%;
    --brand-gradient-to: 205 60% 96%;
  }
```

## lib/tigerAssets.ts

`BORROWED_SETS`: `arrt: "htl",` (a healthcare technologist tiger) until ARRT gets its own set.

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `arrt: "ARRT Radiography registry exam on the content specifications: patient care, radiation physics and protection, image acquisition and equipment, and positioning for the head, spine, thorax, abdomen and extremities.",`
- `EXAM_ORG`: `arrt: "ARRT · Radiography content specifications (R.T.(R))",`
- Hub group: add `"arrt"` to `{ title: "Healthcare certification exams", ids: [...] }` (after `"rbt"`).
- `SEARCH_ALIASES`:
  `arrt: "arrt arrt radiography rad tech radiologic technologist radiographer registry exam x-ray tech xray technician rt(r) r.t.(r) radiography boards registry review positioning",`

## lib/region.ts

Nothing: US is the default.

## lib/examFacts.ts

```ts
  arrt: {
    answer:
      "The ARRT Radiography exam is the American Registry of Radiologic Technologists' certification exam for radiographers, the registry that leads to the R.T.(R) credential most states use for licensing. It has 230 multiple-choice questions on a computer, 200 scored and 30 unscored pilot items. Under the content specifications in force through February 28, 2027, the scored questions are Patient Care 33, Safety 50, Image Production 51 and Procedures 66. Revised specifications take effect on March 1, 2027 (31, 46, 51 and 72). Results are reported as a scaled score; study guides report 75 on a 1 to 99 scale as the passing standard.",
    rows: [
      { label: "Questions", value: "230 multiple choice (200 scored, 30 pilot)" },
      { label: "Pass mark", value: "Scaled score of 75 (1 to 99), per study guides" },
      { label: "Content", value: "Patient Care 33, Safety 50, Image Production 51, Procedures 66" },
      { label: "Biggest category", value: "Procedures, 66 of 200" },
      { label: "From March 1, 2027", value: "Patient Care 31, Safety 46, Image Production 51, Procedures 72" },
      { label: "Credential", value: "R.T.(R), Registered Technologist in Radiography" },
      { label: "Run by", value: "American Registry of Radiologic Technologists (ARRT)" },
    ],
    basedOn: "The ARRT Radiography Examination Content Specifications (2022) and ARRT's May 2026 notice of the 2027 revision, checked November 2026",
    source: { name: "ARRT: Updated Radiography Documents", url: "https://www.arrt.org/news/article/2026/05/01/updated-radiography-documents-2026" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"arrt"` to `TEACHER_LED` (radiography programs assign registry review), and in `TEACHES`:
`arrt: "a radiography program",`. The landing already renders `<ExamClassFaq examId="arrt" />`
and `classFaqJsonLd("arrt")`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `activity` exists; sitemaps map over `EXAMS`; no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing arrt:arrt-radiography:15501`

## CLAUDE.md (under Additional Exams)

```md
- **ARRT Radiography** (ARRT radiography registry exam, `/arrt-radiography/*`, landing `/arrt-radiography-practice-test`): `data/arrt-questions.json` (200 questions on the ARRT Radiography Examination Content Specifications in force January 2022 to February 28, 2027: patient care 32, radiation physics and radiobiology 20, radiation protection 28, image acquisition and evaluation 28, equipment operation and QA 24, head/spine/pelvis 20, thorax/abdomen 20, extremities 28), test IDs 15501-15504, sets 15501-15505 (by category), state `ARRT`, prefix `ARRT-`, 75% pass (readiness marker; ARRT reports a scaled score, 75 of 99 per guides). 8/5/7/7/6/5/5/7 per test, scaled from the 33/50/51/66 of 200 scored (21/29, 26/25, 18/20/28 by subcategory). Positioning, anatomy and findings described in words, no image items; calculation keys computed in the sources. Revised specifications from March 1, 2027 (31/46/51/72, CR removed): re-weight then and retire ARRT-EQP-014. Built by `tools/next100/arrt/build.py`; sources in `tools/next100/arrt/sources.md`. Hub group "Healthcare certification exams", `[data-theme="arrt"]` cyan (186 90% 34%), borrows the HTL tiger, teacher-led (radiography programs).
```
