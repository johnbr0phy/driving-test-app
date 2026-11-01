# Wiring for `phlet` (Philippines Licensure Examination for Professional Teachers, Elementary, v1)

Files already written by the builder: `data/philippines-let-questions.json` (200, PASS),
`lib/banks/phlet.ts`, `app/let-reviewer/*` (8 wrappers, copied from `app/rbt/`),
`app/let-reviewer-practice-test/page.tsx`, `tools/next100/phlet/*` (spec, sources, `q_*.py`,
`build.py`). Rebuild with `python3 -I tools/next100/phlet/build.py`. Everything below goes in shared
files. `npx tsc` reports an error in `lib/banks/phlet.ts` until `"phlet"` is in `ExamId`.

Format note: the real Elementary LEPT is General Education 150 items (8 to 10 a.m., 40% of the
rating) and Professional Education 150 items (11 a.m. to 2 p.m., 60%), PRC enhanced TOS (Board
Resolution No. 11, s. 2022, Annex A). To pass: general average of at least 75% with no rating
below 50% in any part (BPT Resolution No. 228, s. 1996). 300 items is far longer than a useful
mock, so Tigertest models four 50-question tests weighted like the rating: 20 GenEd + 30 ProfEd.
GenEd 8/6/6 follows the TOS's 40/30/30 (Intellectual Competencies split 4 communication + 4
science and math); ProfEd 5/9/6/4/6 follows 15/30/20/15/20 (Teaching Profession and Assessment
are both 15%, rounded 5 and 4). Pass line 75%; the per-part 50% floor is not modelled (the
landing explains it in its tips). Pools exactly 4x per test. Dashboard = 5 topic sets + 4 tests = 9
steps. No set exceeds 60. Secondary specialization majors and the elementary ECE/SPED
specializations are not modelled.

## lib/exams.ts

Add `"phlet"` to the `ExamId` union. Icon `graduation` already exists.

```ts
const phlet: ExamConfig = {
  id: "phlet",
  stateCode: "PHLET",
  idBase: 13100,
  slug: "/let-reviewer",
  landingPath: "/let-reviewer-practice-test",
  name: "LET Reviewer Practice Test",
  shortName: "LET",
  examLabel: "LET",
  fullName: "Licensure Examination for Professional Teachers (LET), Elementary",
  questionIdPrefix: "PHLET-",
  icon: "graduation",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // PRC Annex A, enhanced Table of Specifications for the LEPT (Board Resolution No. 11, s. 2022,
  // from March 2023; checked 2026-11-01). Elementary: General Education 150 items, 40% of the
  // rating (Intellectual Competencies 40%, Personal and Civic Responsibilities 30%, Practical
  // Skills Development 30%) and Professional Education 150 items, 60% (Teaching Profession 15%,
  // Curriculum/Methods/EdTech 30%, Learners 20%, Assessment 15%, Field Study and Internship 20%).
  // Each 50-question test is 20 GenEd + 30 ProfEd: 4+4/6/6 and 5/9/6/4/6. Pass: general average
  // 75% with no part below 50% (BPT Res. 228, s. 1996); only the 75% is scored here.
  // Amended by Board Res. No. 11, s. 2025 (title confirmed, text not found); guides report the
  // same ProfEd areas, but whether the weights changed is unconfirmed.
  // Pools are exactly 4x each count. All items original.
  blueprint: {
    phletComm: 4,
    phletSciMath: 4,
    phletCivic: 6,
    phletPractical: 6,
    phletProfession: 5,
    phletCurriculum: 9,
    phletLearners: 6,
    phletAssess: 4,
    phletField: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 13101, name: "GenEd: Communication, Science & Math", categories: ["phletComm", "phletSciMath"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 13102, name: "GenEd: History, Rizal, Ethics & Society", categories: ["phletCivic", "phletPractical"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 13103, name: "ProfEd: Teaching Profession & Assessment", categories: ["phletProfession", "phletAssess"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 4, id: 13104, name: "ProfEd: Curriculum, Methods & Ed Tech", categories: ["phletCurriculum"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 13105, name: "ProfEd: Learners & Field Study", categories: ["phletLearners", "phletField"], size: 48, weightLabel: "12 of 50 test questions" },
  ],
  categoryLabels: {
    phletComm: "English & Filipino Communication",
    phletSciMath: "Science, Technology & Mathematics",
    phletCivic: "Philippine History, Rizal & Ethics",
    phletPractical: "Contemporary World, Art & the Self",
    phletProfession: "The Teaching Profession",
    phletCurriculum: "Curriculum, Methods & Ed Tech",
    phletLearners: "Child & Adolescent Learners",
    phletAssess: "Assessment of Learning",
    phletField: "Field Study, Internship & Action Research",
  },
  copy: {
    guestPrompt: "to save your LET progress and track every question you miss",
    trainingHeading: "Train by LET area",
    trainingSub: "Five sets covering every area of the PRC table of specifications, General Education and Professional Education. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions, 40% GenEd and 60% ProfEd",
    heroSubs: [
      "Two parts, four mock exams. Professional Education weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You're ready for the LET.",
    ],
    sourceLine: "Based on the PRC table of specifications for the Elementary LEPT. Original questions; 50 per test, weighted like the real rating. Not affiliated with the PRC.",
    analyticsKey: "phlet",
  },
};
```

Append `phlet` to the `EXAMS` array (after `phcse`'s neighbours, e.g. after `phlto`).

Check: 13101-13105 (sets) and 13101-13104 (tests) must be free (BRIEF reserves idBase 13100).

## lib/banks/all.ts

```ts
import "./phlet";
```

## types/index.ts

- `QuestionType`: add `| "PHLET"`.
- `QuestionCategory`, under a `// Philippines LET (LEPT)` comment:

```ts
  | "phletComm"
  | "phletSciMath"
  | "phletCivic"
  | "phletPractical"
  | "phletProfession"
  | "phletCurriculum"
  | "phletLearners"
  | "phletAssess"
  | "phletField"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    phletComm: "English & Filipino Communication",
    phletSciMath: "Science, Technology & Mathematics",
    phletCivic: "Philippine History, Rizal & Ethics",
    phletPractical: "Contemporary World, Art & the Self",
    phletProfession: "The Teaching Profession",
    phletCurriculum: "Curriculum, Methods & Ed Tech",
    phletLearners: "Child & Adolescent Learners",
    phletAssess: "Assessment of Learning",
    phletField: "Field Study, Internship & Action Research",
```

## app/globals.css

The brief's 160 45% 30% clashes with `pnc` (160 50% 30%: 0 degrees, 5 sat, 0 light). The 152 to 168
band is full (pnc 160 50 30, vtne 158 60 32, danb 165 60 31, hscmaths 168 38 30, aerta 162 80 26,
pkdrive 152 75 30). Suggested instead: 160 25% 40% (a muted teal green): 25+ sat from pnc, vtne,
danb, aerta, pkdrive; 13 sat but 10 light from hscmaths. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Philippines LET (LEPT) theme */
  [data-theme="phlet"] {
    --brand: 160 25% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 160 35% 95%;
    --brand-hover: 160 25% 34%;
    --brand-dark: 160 25% 28%;
    --brand-darker: 160 25% 18%;
    --brand-muted: 160 18% 70%;
    --brand-border: 160 20% 80%;
    --brand-border-light: 160 20% 89%;
    --brand-gradient-to: 190 35% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `phlet: "LET reviewer for the Philippine Licensure Examination for Professional Teachers, Elementary level: General Education (English, Filipino, science, math, history, Rizal, ethics, art, the self) and Professional Education (teaching profession, curriculum, learners, assessment, field study) on the PRC table of specifications.",`
- `EXAM_ORG`: `phlet: "PRC · Board for Professional Teachers, Elementary LEPT",`
- Hub group: rename `{ title: "Philippines government exams", ids: ["phcse"] }` to
  `{ title: "Philippines government and licensure exams", ids: ["phcse", "phlet"] }` (or add a
  new group "Philippines teacher licensure exams" with `ids: ["phlet"]` right after it).
- `SEARCH_ALIASES`:
  `phlet: "let reviewer let exam lept licensure examination for teachers licensure examination for professional teachers let reviewer elementary beed let general education reviewer gened professional education reviewer profed prc let board exam for teachers teacher board exam philippines let mock exam",`
- `RELATED_OVERRIDES`: `phlet: ["phcse", "praxis", "ctet"],` and add `"phlet"` to phcse's list if
  the integrator wants them linked both ways.

## lib/region.ts

```ts
// TEST_REGIONS: on the PH entry (next to phlto, phcse)
  phlet: "PH",
// NON_DRIVING_TESTS: add
  "phlet",
```

## lib/examFacts.ts

```ts
  phlet: {
    answer:
      "The Licensure Examination for Teachers (LET), officially the Licensure Examination for Professional Teachers (LEPT), is given by the Professional Regulation Commission (PRC) through the Board for Professional Teachers; a license is required to teach in Philippine schools. The elementary exam has two parts on one Sunday: General Education, 150 items from 8 to 10 a.m., and Professional Education, 150 items from 11 a.m. to 2 p.m. For elementary examinees without a specialization General Education is 40% of the rating and Professional Education 60%; secondary examinees, and elementary examinees with an early childhood or special needs specialization, also take a specialization part (20/40/40). To pass you need a general average of at least 75% with no rating below 50% in any part.",
    rows: [
      { label: "Run by", value: "PRC, Board for Professional Teachers" },
      { label: "Elementary parts", value: "General Education 150 items, Professional Education 150 items" },
      { label: "Time", value: "GenEd 2 hours (8 to 10 a.m.), ProfEd 3 hours (11 a.m. to 2 p.m.)" },
      { label: "Weights (elementary)", value: "General Education 40%, Professional Education 60% (with a specialization, guides report 20/40/40)" },
      { label: "Pass mark", value: "General average 75%, no part below 50%" },
      { label: "Biggest area", value: "Curriculum, methods and educational technology, 45 of 150 ProfEd items" },
      { label: "Sittings", value: "Usually twice a year (March and September); check PRC" },
      { label: "Not modelled here", value: "Secondary and elementary specialization subjects" },
    ],
    basedOn: "PRC enhanced Table of Specifications for the LEPT (Board Resolution No. 11, s. 2022, Annex A, amended by Board Resolution No. 11, s. 2025), the PRC LEPT examination program and BPT Resolution No. 228, s. 1996, checked November 2026",
    source: { name: "Professional Regulation Commission", url: "https://www.prc.gov.ph/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"phlet"` to `TEACHER_LED` (LET review centers and teacher education programs), and in
`TEACHES`: `phlet: "an LET review class or a teacher education program",`. The landing already
renders `<ExamClassFaq examId="phlet" />` and `classFaqJsonLd("phlet")`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Suggest borrowing the teacher-licensing tiger:
`phlet: "praxis",` in `BORROWED_SETS` (or `"ctet"`).

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/*

Nothing: `graduation` exists; sitemaps map over `EXAMS`; class questions import `lib/banks/all`;
no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing phlet:let-reviewer:13101`

## CLAUDE.md (under Additional Exams, after the Pakistan bullet or near the Philippines LTO bullet)

```md
- **LET Reviewer** (Philippines Licensure Examination for Professional Teachers, Elementary, `/let-reviewer/*`, landing `/let-reviewer-practice-test`): `data/philippines-let-questions.json` (200 original questions on the PRC enhanced table of specifications, Board Resolution No. 11, s. 2022, Annex A: General Education communication in English and Filipino 16, science, technology and math 16, Philippine history, Rizal and ethics 24, contemporary world, art and the self 24; Professional Education teaching profession 20, curriculum, methods and ed tech 36, child and adolescent learners 24, assessment 16, field study, internship and action research 24), test IDs 13101-13104 (50 questions each, 20 GenEd + 30 ProfEd like the 40/60 elementary rating), sets 13101-13105 (by area), state `PHLET`, prefix `PHLET-`, 75% pass (the real rule also needs no part below 50%, not modelled). 4/4/6/6/5/9/6/4/6 per test, no spares. The real exam is 150 + 150 items (GenEd 8 to 10 a.m., ProfEd 11 a.m. to 2 p.m.); secondary and ECE/SPED specializations are not modelled. Four Filipino-language items in the communication pool (English explanations). No mother-tongue-instruction items (RA 12027, 2024). Built by `tools/next100/phlet/build.py`; sources in `tools/next100/phlet/sources.md`. Region PH, `[data-theme="phlet"]`, teacher-led.
```
