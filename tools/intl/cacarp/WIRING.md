# Wiring for cacarp (Red Seal Carpenter 403A), v1

Files already written by the builder: `data/red-seal-carpenter-questions.json` (built by
`tools/intl/cacarp/build.py`), `lib/banks/cacarp.ts`, `app/red-seal-carpenter/*` (8 wrappers),
`app/red-seal-carpenter-practice-test/page.tsx`. Everything below goes into shared files.

## lib/exams.ts

Add `"cacarp"` to the `ExamId` union. Icon `hardhat` already exists (no new icon).

Add before `const htl`:

```ts
const cacarp: ExamConfig = {
  id: "cacarp",
  stateCode: "CACARP",
  idBase: 8900,
  slug: "/red-seal-carpenter",
  landingPath: "/red-seal-carpenter-practice-test",
  name: "Red Seal Carpenter Practice Test",
  shortName: "Red Seal Carpenter",
  examLabel: "Red Seal Carpenter",
  fullName: "Red Seal Carpenter interprovincial exam (403A)",
  questionIdPrefix: "CACARP-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Red Seal Occupational Standard, Carpenter (2022 RSOS, the current standard), exam
  // weightings on red-seal.ca and Saskatchewan's 2026 IP exam information (checked Oct 2026):
  // 100 four-option questions in up to 4 hours, 70% to pass, 2020 NBC Volume 2 supplied.
  // MWA A common occupational skills 12%, B planning and layout 14%, C concrete work 16%
  // (formwork 12 of 16), D framing 20%, E exterior finishing 14%, F interior finishing 14%,
  // G renovations 10%. Each practice test is half the real exam.
  blueprint: {
    cacarpCommon: 6,
    cacarpLayout: 7,
    cacarpConcrete: 8,
    cacarpFraming: 10,
    cacarpExterior: 7,
    cacarpInterior: 7,
    cacarpReno: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 8901, name: "Safety, Tools & Layout", categories: ["cacarpCommon", "cacarpLayout"], size: 52, weightLabel: "26% of each test" },
    { setNumber: 2, id: 8902, name: "Concrete & Formwork", categories: ["cacarpConcrete"], size: 32, weightLabel: "16% of each test" },
    { setNumber: 3, id: 8903, name: "Framing", categories: ["cacarpFraming"], size: 40, weightLabel: "20% of each test" },
    { setNumber: 4, id: 8904, name: "Exterior Finish", categories: ["cacarpExterior"], size: 28, weightLabel: "14% of each test" },
    { setNumber: 5, id: 8905, name: "Interior Finish & Renovations", categories: ["cacarpInterior", "cacarpReno"], size: 48, weightLabel: "24% of each test" },
  ],
  categoryLabels: {
    cacarpCommon: "Common Occupational Skills",
    cacarpLayout: "Planning & Layout",
    cacarpConcrete: "Concrete & Formwork",
    cacarpFraming: "Framing",
    cacarpExterior: "Exterior Finish",
    cacarpInterior: "Interior Finish & Stairs",
    cacarpReno: "Renovations",
  },
  copy: {
    guestPrompt: "to save your Red Seal progress and track every question you miss",
    trainingHeading: "Train by work activity",
    trainingSub: "Five sets covering the seven major work activities of the carpenter standard: safety, tools and layout, concrete and formwork, framing, exterior finish, and interior finish with renovations. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the Red Seal exam's proportions",
    heroSubs: [
      "Seven work activities, four tests. Framing and formwork carry the most questions.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your Red Seal exam.",
    ],
    sourceLine: "Based on the 2022 Red Seal Occupational Standard for carpenters and Part 9 of the National Building Code of Canada. Original questions; provincial codes can differ.",
    analyticsKey: "cacarp",
  },
};
```

Append `cacarp` to the `EXAMS` array before `htl`.

## lib/banks/all.ts

```ts
import "./cacarp";
```

## types/index.ts

Add `"CACARP"` to `QuestionType`. Add to the `QuestionCategory` union:

```ts
  // Red Seal Carpenter (Canada)
  | "cacarpCommon"
  | "cacarpLayout"
  | "cacarpConcrete"
  | "cacarpFraming"
  | "cacarpExterior"
  | "cacarpInterior"
  | "cacarpReno"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (same English labels in all five)

```ts
    cacarpCommon: "Common Occupational Skills",
    cacarpLayout: "Planning & Layout",
    cacarpConcrete: "Concrete & Formwork",
    cacarpFraming: "Framing",
    cacarpExterior: "Exterior Finish",
    cacarpInterior: "Interior Finish & Stairs",
    cacarpReno: "Renovations",
```

## app/globals.css (light block; hue 28, unused as of this build, a wood brown)

```css
  /* Red Seal carpenter theme (Canada) */
  [data-theme="cacarp"] {
    --brand: 28 62% 36%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 28 65% 95%;
    --brand-hover: 28 62% 30%;
    --brand-dark: 28 62% 25%;
    --brand-darker: 28 52% 17%;
    --brand-muted: 28 40% 72%;
    --brand-border: 28 40% 78%;
    --brand-border-light: 28 35% 88%;
    --brand-gradient-to: 45 65% 95%;
  }
```

Then run `python3 -I tools/gen_dark_brand_css.py` once for the dark twin (integrator).
If another wave-2 trade exam also picked hue 28, shift this one to 26.

## lib/testCatalog.ts

```ts
// EXAM_BLURBS
  cacarp: "Free Red Seal carpenter practice: layout, formwork, framing, exterior and interior finish, stairs and renovations, weighted like the real 100-question exam with its 70% pass mark.",
// EXAM_ORG
  cacarp: "Red Seal Program (Canada)",
// SEARCH_ALIASES
  cacarp: "red seal carpenter 403a carpentry journeyperson journeyman interprovincial ip exam apprentice ticket certificate of qualification canada framing formwork national building code part 9 trades",
```

Hub group: suggested "Canada school and trade tests" with the other Red Seal trades
(caelec, caauto, caplumb, caweld, cacarp...).

## lib/region.ts

```ts
// TEST_REGIONS
  cacarp: "CA",
// NON_DRIVING_TESTS: add "cacarp"
```

## lib/examFacts.ts

```ts
  cacarp: {
    answer:
      "The Red Seal Carpenter exam is the interprovincial journeyperson exam for carpenters in Canada. It has 100 multiple-choice questions with four options each, you have up to four hours, and you need 70% to pass. Questions follow the 2022 Red Seal Occupational Standard across seven major work activities, and candidates are given the 2020 National Building Code (Volume 2) and a reference booklet. Passing adds the Red Seal endorsement to your provincial or territorial certificate.",
    rows: [
      { label: "Questions", value: "100 multiple choice, 4 options each" },
      { label: "Time", value: "Up to 4 hours" },
      { label: "Pass mark", value: "70%" },
      { label: "Largest areas", value: "Framing 20%, concrete work 16%" },
      { label: "Reference supplied", value: "2020 National Building Code, Volume 2" },
      { label: "Who can write it", value: "Apprentices and experienced tradespeople (hours vary by province)" },
      { label: "Run by", value: "Provincial and territorial apprenticeship authorities, Red Seal Program" },
    ],
    basedOn: "the Red Seal carpenter exam weightings (2022 standard) and the Red Seal Exam Preparation Guide, checked October 2026",
    source: { name: "Red Seal: Carpenter exam weightings", url: "https://red-seal.ca/eng/trades/carpenters/exam-weightings.shtml" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` (wave 2 Red Seal / international teacher exams).

## components/TeachNudge.tsx

Add `"cacarp"` to `TEACHER_LED` (trade schools group).

## components/exam/ExamClassFaq.tsx

```ts
  cacarp: "a carpentry apprenticeship or pre-apprenticeship program",
```

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. Every cacarp set is 60 questions or fewer, so none
is split and no `partNames` are needed.

## CLAUDE.md (under Additional Exams)

```md
- **Red Seal Carpenter** (Canada interprovincial exam 403A, `/red-seal-carpenter/*`, landing `/red-seal-carpenter-practice-test`): `data/red-seal-carpenter-questions.json` (200 questions: common skills 24, planning and layout 28, concrete and formwork 32, framing 40, exterior finish 28, interior finish and stairs 28, renovations 20), test IDs 8901-8904, sets 8901-8905, state `CACARP`, 70% pass. 6/7/8/10/7/7/5 per test (2022 RSOS major work activities, half of the real 100). Part 9 of the 2020 NBC; provincial codes "can differ". Built by `tools/intl/cacarp/build.py`.
```

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cacarp:red-seal-carpenter:8901`
