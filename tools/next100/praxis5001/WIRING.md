# Wiring for `praxis5001` (Praxis Elementary Education: Multiple Subjects, 5001, US, v1)

Files already written by the builder: `data/praxis-elementary-questions.json` (200, PASS),
`lib/banks/praxis5001.ts`, `app/praxis-elementary/*` (5 wrappers: layout, redirect, dashboard,
drill, stats, copied from `app/praxis-plt/`; no test or practice folders, the shared `app/[slug]`
routes serve them), `app/praxis-elementary-education-practice-test/page.tsx`,
`tools/next100/praxis5001/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/praxis5001/build.py`. Everything below goes in shared files.
`npx tsc` reports an error in `lib/banks/praxis5001.ts` until `"praxis5001"` is in `ExamId`.

Format note: the real 5001 is 245 questions in 4 hours 35 minutes, four separately timed and
separately scored subtests (ETS Study Companion 5001, 2024): 5002 Reading and Language Arts 80 in
90 min (I Reading 38, 47%; II Writing, Speaking and Listening 42, 53%), 5003 Mathematics 50 in
65 min with an on-screen scientific calculator and numeric entry (I Numbers and Operations 20, 40%;
II Algebraic Thinking 15, 30%; III Geometry and Measurement, Data, Statistics and Probability 15,
30%), 5004 Social Studies 60 in 60 min (I US History, Government and Citizenship 27, 45%;
II Geography, Anthropology and Sociology 18, 30%; III World History and Economics 15, 25%),
5005 Science 55 in 60 min (Earth, Life, Physical about 18 each). Tigertest models four mixed
50-question tests with the subtests in proportion to their share of 245 (17/10/12/11), each split
by its ETS categories: foundational 3 + texts 5, writing 4 + language 5; 4/3/3; 5/4/3; 4/4/3.
Pools exactly 4x per test. Dashboard = 5 subject sets + 4 tests = 9 steps (sets 32/36/40/48/44,
none over 60, no parts). ETS sets no pass mark (states set a qualifying score per subtest), so 70%
is Tigertest's readiness line. ETS targets 5001 to retire in August 2028, replaced by the
Elementary Education Fundamentals tests (launched spring 2026); revisit then.

## lib/exams.ts

Add `"praxis5001"` to the `ExamId` union. Icon `graduation` already exists.

```ts
const praxis5001: ExamConfig = {
  id: "praxis5001",
  stateCode: "PX5001",
  idBase: 17500,
  slug: "/praxis-elementary",
  landingPath: "/praxis-elementary-education-practice-test",
  name: "Praxis Elementary Education Practice Test",
  shortName: "Praxis 5001",
  examLabel: "Praxis Elementary Education 5001",
  fullName: "Praxis Elementary Education: Multiple Subjects (5001)",
  questionIdPrefix: "PX5001-",
  icon: "graduation",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // ETS Praxis Study Companion for 5001 (2024, checked 2026-11-04): 245 questions in 4 h 35 min,
  // four separately timed subtests: 5002 RLA 80/90 min (Reading 38, Writing, Speaking and
  // Listening 42), 5003 Math 50/65 min (Numbers 20, Algebraic Thinking 15, Geometry/Data 15),
  // 5004 Social Studies 60/60 min (US history and government 27, Geography/Anthropology/
  // Sociology 18, World History and Economics 15), 5005 Science 55/60 min (Earth, Life, Physical
  // about 18 each). Subtest shares of 245 scale to 17/10/12/11 of 50, split by ETS category.
  // ETS sets no pass mark (states set one per subtest); 70% is a readiness line. Pools exactly 4x.
  // Single-answer only: multiple-selection, grid and numeric-entry formats are not modelled.
  blueprint: {
    px5Foundational: 3,
    px5Texts: 5,
    px5Writing: 4,
    px5Language: 5,
    px5Number: 4,
    px5Algebra: 3,
    px5GeomData: 3,
    px5UsGov: 5,
    px5Geography: 4,
    px5WorldEcon: 3,
    px5Earth: 4,
    px5Life: 4,
    px5Physical: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 17501, name: "Reading", categories: ["px5Foundational", "px5Texts"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 17502, name: "Writing, Language, Speaking & Listening", categories: ["px5Writing", "px5Language"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 3, id: 17503, name: "Mathematics", categories: ["px5Number", "px5Algebra", "px5GeomData"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 17504, name: "Social Studies", categories: ["px5UsGov", "px5Geography", "px5WorldEcon"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 5, id: 17505, name: "Science", categories: ["px5Earth", "px5Life", "px5Physical"], size: 44, weightLabel: "11 of 50 test questions" },
  ],
  categoryLabels: {
    px5Foundational: "Foundational Reading Skills",
    px5Texts: "Literature & Informational Texts",
    px5Writing: "Writing & Research",
    px5Language: "Language, Speaking & Listening",
    px5Number: "Numbers & Operations",
    px5Algebra: "Algebraic Thinking",
    px5GeomData: "Geometry, Measurement, Data & Probability",
    px5UsGov: "US History, Government & Citizenship",
    px5Geography: "Geography, Anthropology & Sociology",
    px5WorldEcon: "World History & Economics",
    px5Earth: "Earth Science",
    px5Life: "Life Science",
    px5Physical: "Physical Science",
  },
  copy: {
    guestPrompt: "to save your Praxis 5001 progress and track every question you miss",
    trainingHeading: "Train by subtest",
    trainingSub: "Five sets that follow the four subtests: reading, writing and language, mathematics, social studies and science. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions mixing all four subtests like the 5001",
    heroSubs: [
      "Four subjects, five sets, four practice tests. Reading and language arts weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. You're ready for the 5001.",
    ],
    sourceLine: "Based on the ETS content topics for Praxis Elementary Education: Multiple Subjects (5001), subtests 5002 to 5005. Original single-answer questions. Not affiliated with ETS.",
    analyticsKey: "praxis5001",
  },
};
```

Append `praxis5001` to the `EXAMS` array right after `praxisplt`.

Check: 17501-17505 (sets and tests) must be free (BRIEF reserves idBase 17500; nothing in
`lib/exams.ts` used 175xx when checked, highest was 16800).

## lib/banks/all.ts

```ts
import "./praxis5001";
```

## types/index.ts

- `QuestionType`: add `| "PX5001"`.
- `QuestionCategory`, under a `// Praxis Elementary Education: Multiple Subjects (5001)` comment:

```ts
  | "px5Foundational"
  | "px5Texts"
  | "px5Writing"
  | "px5Language"
  | "px5Number"
  | "px5Algebra"
  | "px5GeomData"
  | "px5UsGov"
  | "px5Geography"
  | "px5WorldEcon"
  | "px5Earth"
  | "px5Life"
  | "px5Physical"
```

(Grepped: no existing `px5*` keys in `types/index.ts`.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    px5Foundational: "Foundational Reading Skills",
    px5Texts: "Literature & Informational Texts",
    px5Writing: "Writing & Research",
    px5Language: "Language, Speaking & Listening",
    px5Number: "Numbers & Operations",
    px5Algebra: "Algebraic Thinking",
    px5GeomData: "Geometry, Measurement, Data & Probability",
    px5UsGov: "US History, Government & Citizenship",
    px5Geography: "Geography, Anthropology & Sociology",
    px5WorldEcon: "World History & Economics",
    px5Earth: "Earth Science",
    px5Life: "Life Science",
    px5Physical: "Physical Science",
```

## app/globals.css

Hue from the brief (39 40% 26%, already checked). Nearest theme is `reet` at 39 25% 34%
(differs by 15 saturation and 8 lightness). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Praxis Elementary Education: Multiple Subjects (5001) theme: dark ochre brown */
  [data-theme="praxis5001"] {
    --brand: 39 40% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 39 40% 95%;
    --brand-hover: 39 40% 22%;
    --brand-dark: 39 40% 18%;
    --brand-darker: 39 40% 10%;
    --brand-muted: 39 25% 70%;
    --brand-border: 39 28% 80%;
    --brand-border-light: 39 28% 89%;
    --brand-gradient-to: 51 35% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `praxis5001: "Praxis Elementary Education: Multiple Subjects (5001) for future elementary teachers: reading and language arts (5002), mathematics (5003), social studies (5004) and science (5005) content knowledge, in four 50-question practice tests that mix the subtests in their real proportions and five subject training sets on the ETS content topics.",`
- `EXAM_ORG`: `praxis5001: "ETS · Praxis Elementary Education 5001 (subtests 5002 to 5005)",`
- Hub group "US teacher certification exams": add `"praxis5001"` after `"praxisplt"`:
  `{ title: "US teacher certification exams", ids: ["texesppr", "praxisplt", "praxis5001"] },`
- `SEARCH_ALIASES`:
  `praxis5001: "praxis 5001 praxis elementary praxis elementary education multiple subjects elementary education multiple subjects 5001 5002 5003 5004 5005 praxis 5002 praxis 5003 praxis 5004 praxis 5005 praxis ii elementary praxis 2 elementary elementary teacher content knowledge test ets elementary education",`
- `RELATED_OVERRIDES`: `praxis5001: ["praxisplt", "praxis", "texesppr"],` and, if wanted, add
  `"praxis5001"` to `praxisplt`'s list (`praxisplt: ["praxis5001", "praxis", "nce", "aswb"]`).

## lib/region.ts

Nothing: US is the default region (`regionOfTest()` falls back to "US").

## lib/examFacts.ts

```ts
  praxis5001: {
    answer:
      "Praxis Elementary Education: Multiple Subjects (test code 5001) is an ETS content knowledge test that many states require for a generalist elementary teaching license. It has 245 questions in 4 hours 35 minutes, split into four separately timed subtests: Reading and Language Arts (5002) 80 questions in 90 minutes, Mathematics (5003) 50 in 65 minutes, Social Studies (5004) 60 in 60 minutes and Science (5005) 55 in 60 minutes. Questions are selected response and numeric entry, with an on-screen scientific calculator for math and science. ETS does not set a passing score: each state sets a qualifying score for each subtest. ETS plans to replace 5001 with the Elementary Education Fundamentals tests, with 5001 targeted to retire in August 2028.",
    rows: [
      { label: "Run by", value: "ETS (Praxis program)" },
      { label: "Questions", value: "245 in four subtests: 5002 RLA 80, 5003 Math 50, 5004 Social Studies 60, 5005 Science 55" },
      { label: "Time", value: "4 hours 35 minutes (90, 65, 60 and 60 minutes, each subtest timed separately)" },
      { label: "Content", value: "RLA: Reading 47%, Writing, Speaking and Listening 53%. Math: Numbers 40%, Algebraic Thinking 30%, Geometry and Data 30%. Social Studies: US history and government 45%, geography 30%, world history and economics 25%. Science: Earth, Life, Physical a third each" },
      { label: "Pass mark", value: "Set by each state, for each subtest" },
      { label: "Delivery", value: "Computer delivered, at a test center or at home online; all four subtests in one session or separately" },
      { label: "Calculator", value: "On-screen scientific calculator on Math and Science" },
      { label: "Status", value: "Targeted to retire August 2028, replaced by Elementary Education Fundamentals (states set the switch date)" },
      { label: "Not modelled here", value: "Multiple-selection, grid and numeric-entry formats (written as single-answer questions)" },
    ],
    basedOn: "The ETS Praxis Study Companion for Elementary Education: Multiple Subjects (5001), the ETS 5001 test page and the ETS Praxis Steps FAQ, checked November 2026",
    source: { name: "ETS Praxis: Elementary Education Multiple Subjects (5001)", url: "https://praxis.ets.org/test/5001.html" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Like `praxisplt`: not `TEACHER_LED` (people self-study). The landing does not render
`ExamClassFaq`, so no TEACHES line is needed; if the integrator adds one for teacher preparation
programs: `praxis5001: "a teacher preparation program",`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Borrow the Praxis Core tiger, like `phlet` and `trcnpqe`:
`praxis5001: "praxis",` in `BORROWED_SETS`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/*

Nothing: `graduation` exists; sitemaps map over `EXAMS`; class questions import `lib/banks/all`;
no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing praxis5001:praxis-elementary:17501`

## CLAUDE.md (under Additional Exams, after the Praxis PLT K-6 bullet)

```md
- **Praxis Elementary Education** (ETS Elementary Education: Multiple Subjects, test 5001, subtests 5002 to 5005, `/praxis-elementary/*`, landing `/praxis-elementary-education-practice-test`): `data/praxis-elementary-questions.json` (200 original content-knowledge questions on the ETS Study Companion content topics: Reading and Language Arts as foundational reading skills 12, literature and informational texts 20, writing and research 16, language, speaking and listening 20; Mathematics as numbers and operations 16, algebraic thinking 12, geometry, measurement, data and probability 12; Social Studies as US history, government and citizenship 20, geography, anthropology and sociology 16, world history and economics 12; Science as earth 16, life 16, physical 12), test IDs 17501-17504 (50 questions each, mixing the subtests 17/10/12/11 like their share of the real 245), sets 17501-17505 (one per subject, reading split from writing and language), state `PX5001`, prefix `PX5001-`, 70% readiness line (ETS sets no pass mark; each state sets one per subtest). 3/5/4/5, 4/3/3, 5/4/3, 4/4/3 per test, no spares. The real test is 245 questions in 4 h 35 min over four separately timed subtests (80/90, 50/65, 60/60, 55/60), with numeric-entry and multiple-selection items not modelled here. Content only; pedagogy is Praxis PLT. Math keys asserted in the sources. ETS targets 5001 to retire in August 2028 (replaced by Elementary Education Fundamentals). Built by `tools/next100/praxis5001/build.py`; sources in `tools/next100/praxis5001/sources.md`. Region US, hub "US teacher certification exams", `[data-theme="praxis5001"]` dark ochre brown (39 40% 26%), borrows the Praxis tiger, not teacher-led.
```
