# Wiring for `rdexam` (CDR Registration Examination for Dietitians, the RD exam, US, v1)

Files already written by the builder: `data/rd-exam-questions.json` (200, PASS),
`lib/banks/rdexam.ts`, `app/registered-dietitian/*` (layout, redirect, dashboard, drill, stats;
copied from `app/cma-aama/`), `app/registered-dietitian-exam-practice-test/page.tsx`,
`tools/next100/rdexam/*` (spec, sources, `q_*.py`, `build.py`). Everything below goes in shared
files. `npx tsc` reports an error in `lib/banks/rdexam.ts` until `"rdexam"` is added to `ExamId`.

Format note: the real exam is computer adaptive, 125 to 145 questions (100 to 120 scored + 25
pretest) in 3 hours, four options, no going back, scaled 1 to 50 with 25 to pass (CDR Exam FAQ
2025, read 2026-11-04). Modelled as four fixed 50-question tests weighted by the 2027 to 2031 test
specifications (approved June 25, 2025, in force January 1, 2027): I 23%, II 22%, III 40%, IV 15%,
split into 11 pools. Dashboard = 6 training sets + 4 tests = 10 steps (topic sets like the
template, not `testSets()`). Pass line `ceil(0.70 * 50) = 35`, a readiness target. Pools are
exactly 4x per-test, so no item repeats across tests. Exams through December 31, 2026 still follow
the 2022 to 2026 outline (21/45/21/13); the landing and facts say so.

Id note: exam id `rdexam`, category keys `rd*` (no existing key starts with `rd`), bank file
`data/rd-exam-questions.json`.

## lib/exams.ts

Add `"rdexam"` to the `ExamId` union. Icon `utensils` already exists.

```ts
const rdexam: ExamConfig = {
  id: "rdexam",
  stateCode: "RDEXAM",
  idBase: 17400,
  slug: "/registered-dietitian",
  landingPath: "/registered-dietitian-exam-practice-test",
  name: "RD Exam Practice Test",
  shortName: "RD Exam",
  examLabel: "RD exam",
  fullName: "CDR Registration Examination for Dietitians",
  questionIdPrefix: "RDEXAM-",
  icon: "utensils",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // CDR Registered Dietitian Examination Test Specifications, January 1, 2027 to December 31, 2031
  // (approved June 25, 2025; checked November 2026): I Fundamentals of Dietetics Practice 23%,
  // II Community and Public Health Nutrition 22%, III Human Nutrition and Medical Nutrition
  // Therapy 40%, IV Food Science and Food Systems 15%. Scaled to 50 per test: I 12 (6/3/3),
  // II 11 (6/5), III 20 (6/5/5/4), IV 7 (3/4); the split inside each domain is Tigertest's.
  // The real exam is computer adaptive (125 to 145 questions in 3 hours, scaled 1 to 50, 25 to
  // pass); 70% is a readiness marker. All items original.
  blueprint: {
    rdMgmt: 6,
    rdResearch: 3,
    rdPractice: 3,
    rdCommunity: 6,
    rdEducation: 5,
    rdNutrition: 6,
    rdAssessment: 5,
    rdMnt: 5,
    rdSupport: 4,
    rdFoodSci: 3,
    rdFoodservice: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 17401, name: "Management, Research & Practice", categories: ["rdMgmt", "rdResearch", "rdPractice"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 2, id: 17402, name: "Community Nutrition & Education", categories: ["rdCommunity", "rdEducation"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 17403, name: "Human Nutrition & Physiology", categories: ["rdNutrition"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 4, id: 17404, name: "Screening, Assessment & Diagnosis", categories: ["rdAssessment"], size: 20, weightLabel: "5 of 50 test questions" },
    { setNumber: 5, id: 17405, name: "Medical Nutrition Therapy & Nutrition Support", categories: ["rdMnt", "rdSupport"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 6, id: 17406, name: "Food Science & Foodservice", categories: ["rdFoodSci", "rdFoodservice"], size: 28, weightLabel: "7 of 50 test questions" },
  ],
  categoryLabels: {
    rdMgmt: "Management & Leadership",
    rdResearch: "Research Applications",
    rdPractice: "Professional Practice & Marketing",
    rdCommunity: "Community Nutrition & Programs",
    rdEducation: "Nutrition Education & Counseling",
    rdNutrition: "Human Nutrition & Physiology",
    rdAssessment: "Screening, Assessment & Diagnosis",
    rdMnt: "Medical Nutrition Therapy",
    rdSupport: "Enteral & Parenteral Nutrition",
    rdFoodSci: "Food Science",
    rdFoodservice: "Menus & Foodservice Systems",
  },
  copy: {
    guestPrompt: "to save your RD exam progress and track every question you miss",
    trainingHeading: "Train by CDR domain",
    trainingSub: "Six sets covering the four domains of the CDR test specifications. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions weighted like the CDR domains",
    heroSubs: [
      "Four domains, four mock exams. Medical nutrition therapy weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You're ready for the RD exam.",
    ],
    sourceLine: "Based on the CDR Registration Examination for Dietitians test specifications. Original questions; 50 per test, weighted like the real exam. Not affiliated with the Commission on Dietetic Registration.",
    analyticsKey: "rdexam",
  },
};
```

Append `rdexam` to the `EXAMS` array (with the healthcare exams, after `nptepta`).

Check: 17401-17406 (tests 17401-17404, sets 17401-17406) must be free (row assigns idBase 17400).

## lib/banks/all.ts

```ts
import "./rdexam";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/rdexam.ts`.

## types/index.ts

- `QuestionType`: add `| "RDEXAM"`.
- `QuestionCategory`, under a `// RD exam (CDR)` comment:

```ts
  | "rdMgmt"
  | "rdResearch"
  | "rdPractice"
  | "rdCommunity"
  | "rdEducation"
  | "rdNutrition"
  | "rdAssessment"
  | "rdMnt"
  | "rdSupport"
  | "rdFoodSci"
  | "rdFoodservice"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    rdMgmt: "Management & Leadership",
    rdResearch: "Research Applications",
    rdPractice: "Professional Practice & Marketing",
    rdCommunity: "Community Nutrition & Programs",
    rdEducation: "Nutrition Education & Counseling",
    rdNutrition: "Human Nutrition & Physiology",
    rdAssessment: "Screening, Assessment & Diagnosis",
    rdMnt: "Medical Nutrition Therapy",
    rdSupport: "Enteral & Parenteral Nutrition",
    rdFoodSci: "Food Science",
    rdFoodservice: "Menus & Foodservice Systems",
```

## app/globals.css

Hue as given in the brief (91 20% 26%), then run `tools/gen_dark_brand_css.py`.

```css
  /* RD exam (CDR Registration Examination for Dietitians) theme */
  [data-theme="rdexam"] {
    --brand: 91 20% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 91 30% 96%;
    --brand-hover: 91 20% 21%;
    --brand-dark: 91 20% 19%;
    --brand-darker: 91 20% 13%;
    --brand-muted: 91 12% 70%;
    --brand-border: 91 15% 80%;
    --brand-border-light: 91 15% 89%;
    --brand-gradient-to: 106 30% 96%;
  }
```

## lib/tigerAssets.ts

`BORROWED_SETS`: `rdexam: "foodmgr",` (the food manager tiger) until the RD exam gets its own set.

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `rdexam: "CDR Registration Examination for Dietitians on the 2027 test specifications: medical nutrition therapy, nutrition support, assessment, community nutrition, education, management, research, food science and foodservice.",`
- `EXAM_ORG`: `rdexam: "Commission on Dietetic Registration · RD exam test specifications",`
- Hub group: add `"rdexam"` to `{ title: "Healthcare certification exams", ids: [...] }` (right after `"nptepta"`).
- `SEARCH_ALIASES`:
  `rdexam: "rd exam rdn exam registered dietitian registered dietitian nutritionist dietitian exam dietetics exam cdr exam cdr registration examination commission on dietetic registration dietitian boards rd boards nutrition exam rd test",`
- `RELATED_OVERRIDES` (optional): `rdexam: ["nptepta", "cma", "nbdhe", "foodmgr"],`.

## lib/region.ts

Nothing: US is the default.

## lib/examFacts.ts

```ts
  rdexam: {
    answer:
      "The Registration Examination for Dietitians (the RD exam) is the Commission on Dietetic Registration's credentialing exam for the Registered Dietitian (RD) or Registered Dietitian Nutritionist (RDN) credential. It is computer adaptive and taken year-round at Pearson VUE test centers: each candidate answers between 125 and 145 four-option questions (100 to 120 scored plus 25 unscored pretest) in 3 hours, with no going back to earlier questions. Scores are scaled from 1 to 50, and 25 is the minimum passing score. Under the test specifications in force from January 1, 2027 the domains are Fundamentals of Dietetics Practice 23%, Community and Public Health Nutrition 22%, Human Nutrition and Medical Nutrition Therapy 40% and Food Science and Food Systems 15%; exams through December 31, 2026 follow the 2022 to 2026 outline.",
    rows: [
      { label: "Questions", value: "125 to 145, computer adaptive (25 unscored pretest)" },
      { label: "Time", value: "3 hours" },
      { label: "Pass mark", value: "Scaled score of 25 (scale 1 to 50)" },
      { label: "Content from 2027", value: "Practice 23%, Community 22%, Nutrition and MNT 40%, Food 15%" },
      { label: "Through 2026", value: "Principles 21%, Nutrition Care 45%, Management 21%, Foodservice 13%" },
      { label: "Where", value: "Pearson VUE test centers, year-round" },
      { label: "Run by", value: "Commission on Dietetic Registration (CDR)" },
    ],
    basedOn: "The CDR Registered Dietitian Examination Test Specifications (2022 to 2026 and 2027 to 2031) and the CDR RD and DTR Exam FAQ (2025), checked November 2026",
    source: { name: "CDR: Registration Examination for Dietitians", url: "https://www.cdrnet.org/rdexamoverview" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"rdexam"` to `TEACHER_LED` (dietetics programs run RD exam review), and in `TEACHES`:
`rdexam: "a dietetics program",`. The landing already renders `<ExamClassFaq examId="rdexam" />`
and `classFaqJsonLd("rdexam")`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `utensils` exists; sitemaps map over `EXAMS`; no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing rdexam:registered-dietitian:17401`

## CLAUDE.md (under Additional Exams)

```md
- **RD Exam** (CDR Registration Examination for Dietitians, `/registered-dietitian/*`, landing `/registered-dietitian-exam-practice-test`): `data/rd-exam-questions.json` (200 questions on the CDR test specifications for January 1, 2027 to December 31, 2031, approved June 25, 2025: Fundamentals of Dietetics Practice 23% as management and leadership 24, research 12, professional practice and marketing 12; Community and Public Health Nutrition 22% as community programs and guidelines 24, education and counseling 20; Human Nutrition and MNT 40% as nutrition and physiology 24, screening, assessment and diagnosis 20, medical nutrition therapy 20, enteral and parenteral nutrition 16; Food Science and Food Systems 15% as food science 12, menus and foodservice 16), test IDs 17401-17404, sets 17401-17406 (by domain), state `RDEXAM`, prefix `RDEXAM-`, 70% pass (readiness marker; the real exam is computer adaptive, 125 to 145 questions in 3 hours, scaled 1 to 50 with 25 to pass; exams through 2026 follow the 2022 to 2026 outline, 21/45/21/13). 6/3/3/6/5/6/5/5/4/3/4 per test (domains 12/11/20/7; the split inside each domain is Tigertest's). Every calculation (Mifflin-St Jeor, tube feeding, PN, food cost, yield) recomputed in `sources.md`. DRIs cited, not the 2025-2030 Dietary Guidelines' changed targets. Built by `tools/next100/rdexam/build.py`; sources in `tools/next100/rdexam/sources.md`. Hub group "Healthcare certification exams", `[data-theme="rdexam"]` dark sage (91 20% 26%), borrows the food manager tiger, teacher-led (dietetics programs).
```
