# Wiring for `cscs` (CITB HS&E test for Operatives, CSCS card)

v1 exam. Files already written by the builder: `data/cscs-questions.json` (built by
`tools/intl/cscs/build.py`), `lib/banks/cscs.ts`, `app/cscs/*` (8 wrappers copied from
`app/uk-theory/`), `app/cscs-test-practice/page.tsx`.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/cscs-questions.json --pool cscsLegal=32 --pool cscsWelfare=24 --pool cscsHealth=40 --pool cscsSafety=40 --pool cscsHeights=28 --pool cscsExcav=16 --pool cscsEnv=20` -> PASS.

## lib/exams.ts
Add `| "cscs"` to the `ExamId` union. Icon `hardhat` already exists (no icon union change).
Add before `const htl`:

```ts
const cscs: ExamConfig = {
  id: "cscs",
  stateCode: "CSCS",
  idBase: 8200,
  slug: "/cscs",
  landingPath: "/cscs-test-practice",
  name: "CSCS Test Practice",
  shortName: "CSCS Test",
  examLabel: "CITB HS&E test",
  fullName: "CITB Health, Safety and Environment test for Operatives (CSCS card)",
  questionIdPrefix: "CSCS-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 90,
  // CITB Health, Safety and Environment test for Operatives (citb.co.uk, checked Oct 2026):
  // 50 questions in 45 minutes, pass mark 90% (45 of 50), no negative marking. Questions come
  // from the core knowledge of the official GT100 revision material (working environment /
  // legal and management, occupational health and welfare, general safety, high-risk
  // activities, environment); since 2019 behavioural items are built into the 50 questions.
  // CITB publishes no per-area counts, so the weights are ours. Great Britain law (HSWA 1974,
  // CDM 2015, RIDDOR, CAR 2012, COSHH, Noise and Vibration Regs, WAHR 2005). All items original.
  blueprint: {
    cscsLegal: 8,
    cscsWelfare: 6,
    cscsHealth: 10,
    cscsSafety: 10,
    cscsHeights: 7,
    cscsExcav: 4,
    cscsEnv: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 8201, name: "Law, Welfare & Emergencies", categories: ["cscsLegal", "cscsWelfare"], size: 56, weightLabel: "28% of each test" },
    { setNumber: 2, id: 8202, name: "Occupational Health & PPE", categories: ["cscsHealth"], size: 40, weightLabel: "20% of each test" },
    { setNumber: 3, id: 8203, name: "General Site Safety", categories: ["cscsSafety"], size: 40, weightLabel: "20% of each test" },
    { setNumber: 4, id: 8204, name: "High-Risk Activities", categories: ["cscsHeights", "cscsExcav"], size: 44, weightLabel: "22% of each test" },
    { setNumber: 5, id: 8205, name: "Environment & Waste", categories: ["cscsEnv"], size: 20, weightLabel: "10% of each test" },
  ],
  categoryLabels: {
    cscsLegal: "Legal Duties & Site Management",
    cscsWelfare: "Health, Welfare & Emergencies",
    cscsHealth: "Occupational Health & PPE",
    cscsSafety: "Signs, Fire, Electricity, Tools & Plant",
    cscsHeights: "Working at Height",
    cscsExcav: "Excavations & Confined Spaces",
    cscsEnv: "Environment & Waste",
  },
  copy: {
    guestPrompt: "to save your CSCS test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets covering the HS&E core knowledge: law, welfare and emergencies; occupational health and PPE; general site safety; working at height, excavations and confined spaces; the environment. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 45 to pass, like the real operatives test",
    heroSubs: [
      "Seven topics, four mock tests. You need 45 of 50 to pass.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "The pass mark is 90%. Fix the misses, then retake.",
      "All done. Book your HS&E test.",
    ],
    sourceLine: "Based on the CITB HS&E test core knowledge areas, the CDM Regulations 2015 and HSE guidance, checked October 2026. Original questions, not the CITB revision bank.",
    analyticsKey: "cscs",
  },
};
```

Append `cscs` to `EXAMS` before `htl` (after the international exams, e.g. after `ausa`).
All sets are 60 or fewer questions, so none is split into parts and no `partNames` are needed.

## lib/banks/all.ts
```ts
import "./cscs";
```
(`lib/banks/cscs.ts` is already written.)

## types/index.ts
- Add `| "CSCS"` to `QuestionType`.
- Add to `QuestionCategory`:
```ts
  // CITB HS&E test for Operatives (CSCS)
  | "cscsLegal"
  | "cscsWelfare"
  | "cscsHealth"
  | "cscsSafety"
  | "cscsHeights"
  | "cscsExcav"
  | "cscsEnv"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (same English labels in all five)
```ts
    cscsLegal: "Legal Duties & Site Management",
    cscsWelfare: "Health, Welfare & Emergencies",
    cscsHealth: "Occupational Health & PPE",
    cscsSafety: "Signs, Fire, Electricity, Tools & Plant",
    cscsHeights: "Working at Height",
    cscsExcav: "Excavations & Confined Spaces",
    cscsEnv: "Environment & Waste",
```

## app/globals.css
Light block (hi-vis mustard, hue 52 unused). Then run `python3 -I tools/gen_dark_brand_css.py` for the dark twin.
```css
  /* CSCS / CITB HS&E test theme (UK) */
  [data-theme="cscs"] {
    --brand: 52 85% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 52 80% 94%;
    --brand-hover: 52 85% 27%;
    --brand-dark: 52 85% 22%;
    --brand-darker: 52 70% 15%;
    --brand-muted: 52 45% 70%;
    --brand-border: 52 50% 74%;
    --brand-border-light: 52 50% 86%;
    --brand-gradient-to: 40 80% 94%;
  }
```

## lib/testCatalog.ts
- `EXAM_BLURBS`:
```ts
  cscs: "Free mock tests for the CITB Health, Safety and Environment test for operatives, the test behind a CSCS card: site law, asbestos and dust, working at height, plant and the environment, with the real 45 of 50 pass mark.",
```
- `EXAM_ORG`: `cscs: "CITB (Great Britain) · CSCS card"`
- Hub group: suggested "UK workplace and trade certificates" (with ukfood, ukaplh, ukfaw, ukcare).
- `SEARCH_ALIASES`:
```ts
  cscs: "cscs card test citb hse hs&e health safety environment test operatives green card labourer construction site uk mock test touch screen",
```
- `RELATED_OVERRIDES` only if its group ends up with fewer than three others: `cscs: ["ukfaw", "osha", "forklift"]`.

## lib/region.ts
Add `cscs: "UK"` to `TEST_REGIONS` and `"cscs"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts
```ts
  cscs: {
    answer:
      "Most CSCS cards need a pass in the CITB Health, Safety and Environment test taken in the last 2 years. The operatives version, for site workers, has 50 multiple-choice questions in 45 minutes and you need 45 right (90%). It costs 23.50 pounds and is taken at a Pearson Professional Centre. Supervisors and managers take a separate managers and professionals test, and some trades a specialist test.",
    rows: [
      { label: "Questions", value: "50 multiple choice" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "45 of 50 (90%)" },
      { label: "Fee", value: "£23.50" },
      { label: "Where", value: "Pearson Professional Centres" },
      { label: "Pass valid for a card", value: "2 years" },
      { label: "Versions", value: "Operatives, Specialists, Managers and Professionals" },
      { label: "Given by", value: "CITB, for CSCS cards in Great Britain" },
    ],
    basedOn: "the CITB HS&E test pages and the CSCS test FAQ",
    source: { name: "CITB: Operatives test", url: "https://www.citb.co.uk/courses-tests/health-safety-and-environment-hse-test/operatives-test" },
  },
```

## components/TeachNudge.tsx
Add `"cscs"` to `TEACHER_LED` (trade schools / instructor-led line).

## components/exam/ExamClassFaq.tsx
Add to `TEACHES` (trade section):
```ts
  cscs: "a construction course or run CSCS test prep",
```

## lib/tigerAssets.ts (optional)
`BORROWED_SETS`: `cscs: "osha"` if osha has a finished set; otherwise leave out (falls back to the DMV tiger).

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` (the integrator's batch comment covers cscs).

## scripts/build-training-parts.ts
Run `npx tsx scripts/build-training-parts.ts` after wiring (writes cscs parts to `lib/trainingParts.json`).

## Screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cscs:cscs:8201`

## CLAUDE.md (bullet under "Additional Exams")
```md
- **CSCS** (CITB Health, Safety and Environment test for Operatives, `/cscs/*`, landing `/cscs-test-practice`): `data/cscs-questions.json` (200 questions: legal 32, welfare 24, occupational health 40, general safety 40, height 28, excavations/confined spaces 16, environment 20), test IDs 8201-8204, sets 8201-8205, state `CSCS`, 90% pass (45 of 50, like the real test). 8/6/10/10/7/4/5 per test (CITB publishes no area counts). Great Britain law; original items, not the GT100 bank. Built by `tools/intl/cscs/build.py`. Hub group "UK workplace and trade certificates".
```
