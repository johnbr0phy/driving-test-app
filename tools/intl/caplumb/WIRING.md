# caplumb wiring (Red Seal Plumber, v1)

Files already written by the builder: `data/red-seal-plumber-questions.json` (built by
`python3 -I tools/intl/caplumb/build.py`, never hand-edit), `lib/banks/caplumb.ts`, `app/red-seal-plumber/*`
(8 wrappers, copied from `app/cosmetology/`), `app/red-seal-plumber-practice-test/page.tsx`, `tools/intl/caplumb/*`.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/red-seal-plumber-questions.json --pool caplumbCommon=24 --pool caplumbPipe=20 --pool caplumbDwv=52 --pool caplumbWater=40 --pool caplumbFixtures=24 --pool caplumbHydronic=24 --pool caplumbSpecial=16` -> PASS (letters 50/50/50/50, key-longest 12%, key>1.2x 6%).

## lib/exams.ts
`ExamId` union: add `| "caplumb"`. Icon: existing `"hardhat"` (no new icon; the union has no wrench). Add before `const htl`, and append `caplumb` to `EXAMS` before `htl`:

```ts
const caplumb: ExamConfig = {
  id: "caplumb",
  stateCode: "CAPLUMB",
  idBase: 8800,
  slug: "/red-seal-plumber",
  landingPath: "/red-seal-plumber-practice-test",
  name: "Red Seal Plumber Practice Test",
  shortName: "Red Seal Plumber",
  examLabel: "Red Seal Plumber exam",
  fullName: "Red Seal Plumber (306A) interprovincial exam",
  questionIdPrefix: "CAPLUMB-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Red Seal Plumber exam (306A in Ontario). Weightings by Major Work Activity on red-seal.ca
  // (exam-information and exam-weightings pages, checked October 2026), which follow the 2023 RSOS
  // (no newer plumber RSOS announced): 125 questions; A 11%, B 10%, C 26%, D 19%, E 13%, F 13%
  // (low-pressure steam task not common core), G 8%. Scaled to 50 per test. 4 hours, 70% pass
  // (Red Seal Exam Preparation Guide). Code content follows the National Plumbing Code of Canada 2020;
  // provincial rules are "varies". All items original.
  blueprint: {
    caplumbCommon: 6,
    caplumbPipe: 5,
    caplumbDwv: 13,
    caplumbWater: 10,
    caplumbFixtures: 6,
    caplumbHydronic: 6,
    caplumbSpecial: 4,
  },
  trainingSets: testSets(8800, 4),
  categoryLabels: {
    caplumbCommon: "Common Occupational Skills",
    caplumbPipe: "Pipe Preparation & Joining",
    caplumbDwv: "Sewers, Sewage Treatment & DWV",
    caplumbWater: "Water Service & Distribution",
    caplumbFixtures: "Fixtures, Appliances & Water Treatment",
    caplumbHydronic: "Hydronic & Low-Pressure Steam",
    caplumbSpecial: "Specialized Systems",
  },
  copy: {
    guestPrompt: "to save your Red Seal progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all seven Major Work Activities. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the Red Seal exam's proportions, 70% to pass",
    heroSubs: [
      "Seven Major Work Activities, four tests. DWV and water distribution are the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your Red Seal exam.",
    ],
    sourceLine: "Based on the Red Seal exam weightings for Plumber (2023 RSOS) and the National Plumbing Code of Canada 2020. Original questions; the real exam has 125 questions in 4 hours.",
    analyticsKey: "caplumb",
  },
};
```
Tests 8801-8804, sets 8801-8804 (one per test). Run `npx tsx scripts/build-training-parts.ts` after wiring.

## lib/banks/all.ts
```ts
import "./caplumb";
```

## lib/examData.ts
Nothing (the bank registers through `lib/banks/caplumb.ts`).

## types/index.ts
`QuestionType`: add `| "CAPLUMB"`. `QuestionCategory`, under a comment `// Red Seal Plumber (caplumb)`:
```ts
  | "caplumbCommon"
  | "caplumbPipe"
  | "caplumbDwv"
  | "caplumbWater"
  | "caplumbFixtures"
  | "caplumbHydronic"
  | "caplumbSpecial"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all)
```ts
    caplumbCommon: "Common Occupational Skills",
    caplumbPipe: "Pipe Preparation & Joining",
    caplumbDwv: "Sewers, Sewage Treatment & DWV",
    caplumbWater: "Water Service & Distribution",
    caplumbFixtures: "Fixtures, Appliances & Water Treatment",
    caplumbHydronic: "Hydronic & Low-Pressure Steam",
    caplumbSpecial: "Specialized Systems",
```

## app/globals.css (light block; generate the dark twin with tools/gen_dark_brand_css.py)
Hue 210 (water blue). Not used by any theme in globals.css or the other wave-2 WIRING files when checked (205 and 215 are taken).
```css
  /* Red Seal Plumber theme (Canada) */
  [data-theme="caplumb"] {
    --brand: 210 72% 36%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 210 75% 95%;
    --brand-hover: 210 72% 30%;
    --brand-dark: 210 72% 25%;
    --brand-darker: 210 62% 17%;
    --brand-muted: 210 45% 72%;
    --brand-border: 210 45% 78%;
    --brand-border-light: 210 40% 88%;
    --brand-gradient-to: 190 70% 95%;
  }
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  caplumb: "Free practice for the Red Seal Plumber exam (306A in Ontario): DWV and venting, sewers and septic systems, water distribution and backflow, fixtures and water heaters, hydronic heating and pipe joining, with the real 70% pass mark.",
// EXAM_ORG
  caplumb: "Red Seal Program · interprovincial trade exam",
// SEARCH_ALIASES
  caplumb: "red seal plumber plumbing exam 306a interprovincial journeyperson certificate of qualification national plumbing code npc ontario alberta bc canada apprentice licensed plumber",
```
Hub group: suggested "Canada school and trade tests" (with caauto, cacarp, caweld, caelec...). If the group has fewer than three others, add `RELATED_OVERRIDES.caplumb: ["caweld", "cacarp", "caauto"]` (the other Red Seal trades).

## lib/region.ts
`TEST_REGIONS`: `caplumb: "CA",`. `NON_DRIVING_TESTS`: add `"caplumb"`.

## components/TeachNudge.tsx
`TEACHER_LED`, trade schools line: add `"caplumb"`.

## components/exam/ExamClassFaq.tsx
`TEACHES`, trade schools section:
```ts
  caplumb: "a plumbing apprenticeship class",
```
(The landing already renders `<ExamClassFaq examId="caplumb" />` and `classFaqJsonLd("caplumb")`.)

## lib/examFacts.ts
```ts
  caplumb: {
    answer:
      "The Red Seal Plumber exam is the interprovincial certification exam for plumbers in Canada (trade code 306A in Ontario). It has 125 four-option multiple-choice questions, you have up to 4 hours, and you need 70% to pass. Questions follow the 2023 Red Seal Occupational Standard's seven Major Work Activities, with sewers, sewage treatment and DWV systems (26%) and water service and distribution (19%) the largest, and code questions are based on the National Plumbing Code of Canada 2020.",
    rows: [
      { label: "Questions", value: "125 multiple choice, 4 options each" },
      { label: "Time", value: "Up to 4 hours" },
      { label: "Pass mark", value: "70%" },
      { label: "Largest areas", value: "Sewers, septic and DWV 26%, water service and distribution 19%" },
      { label: "Code", value: "National Plumbing Code of Canada 2020" },
      { label: "Fees and eligibility", value: "Set by each province or territory" },
      { label: "Given by", value: "Provincial and territorial apprenticeship authorities, for the Red Seal Program" },
    ],
    basedOn: "the Red Seal Plumber exam information and weightings (2023 RSOS) and the Red Seal Exam Preparation Guide, checked October 2026",
    source: { name: "Red Seal: Plumber exam information", url: "https://red-seal.ca/eng/trades/plumbers/exam-information.shtml" },
  },
```

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` (comment names the wave, including caplumb).

## lib/server/classQuestions.ts
Nothing: it imports `@/lib/banks/all`, which will include `./caplumb`.

## lib/sitemaps.ts, next.config.ts, components/TestIcon.tsx, components/CDLHeader.tsx
Nothing exam-specific (no new icon; the landing reaches the sitemap through `EXAMS`).

## lib/tigerAssets.ts (optional)
No mascot art; it falls back to the DMV tiger. If the integrator maps wave-2 trades like `ukcar: "dmv"`, use `caplumb: "dmv"`.

## Screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing caplumb:red-seal-plumber:8801`

## CLAUDE.md (bullet under Additional Exams)
- **Red Seal Plumber** (Canada interprovincial exam, 306A in Ontario, `/red-seal-plumber/*`, landing `/red-seal-plumber-practice-test`): `data/red-seal-plumber-questions.json` (200 questions across the 7 Major Work Activities of the 2023 RSOS: occupational skills 24, pipe preparation and joining 20, sewers/sewage treatment/DWV 52, water service and distribution 40, fixtures and water treatment 24, hydronic and low-pressure steam 24, specialized systems 16), test IDs 8801-8804, sets 8801-8804 (one per test), state `CAPLUMB`, 70% pass. 6/5/13/10/6/6/4 per test, scaled from the red-seal.ca weightings (11/10/26/19/13/13/8%, 125 questions, 4 hours). National Plumbing Code of Canada 2020 figures; permits, septic setbacks and backflow testing are "varies". Sources in `tools/intl/caplumb/sources.md`.
