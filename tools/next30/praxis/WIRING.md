# Praxis Core (`praxis`) wiring for the integrator

v2 exam, modelled on GED (sectioned, passages as shared stimuli, Basics on three drills) with PMP's
own-build pattern. Files already written (unique to this exam):
`tools/praxis/*` (8 domain sources as Python data, `stimuli.py`, `build.py`, `sources.md`),
`data/v2/praxis/questions.json` (object form `{ stimuli, questions }`), `lib/v2/exams/praxis.ts` (export `PRAXIS`),
`lib/v2/banks/praxis.ts` (`withStimuli`), `app/praxis-core/*` (layout, root redirect, dashboard,
practice/[n] with `TrainPage` for Basics, test/[id], test/[id]/results; copied from `app/ged/`),
`app/praxis-core-practice-test/page.tsx`.

Rebuild: `python3 -I tools/praxis/build.py`, then
`python3 -I tools/validate_v2_bank.py praxis '{"1": {"reading": {"1": 28}, "writing": {"1": 20}, "math": {"1": 28}}, "2": {"reading": {"1": 28}, "writing": {"1": 20}, "math": {"1": 28}}}'`
(passes: 200 questions, 16 stimuli, 0 problems). Do not add `praxis` to `tools/build_v2_bank.py` PLANS:
it has its own build (keys authored first and shuffled by a stem seed, usage and sentence-correction items
`lockedOrder`, Writing ordered usage, sentence correction, revision, research like the real section).

The landing has no `ExamLandingBreadcrumbs` (not in this tree; the PMP and GED landings do not use it).
Add it after the JSON-LD if the integrator's tree has it.
Screenshots still needed: `public/landing/praxis-mobile.png`, `praxis-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  praxis: 200,
```

## lib/v2/registry.ts
```ts
import { PRAXIS } from "./exams/praxis";
// EXAMS_V2: add PRAXIS after GED (same hub group)
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ GED, PRAXIS, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the ged bank import:
```ts
import "@/lib/v2/banks/praxis";          // classQuestions.ts
import '@/lib/v2/banks/praxis';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `PRAXIS.domainLabels` (keys `praxisIdeas`, `praxisCraft`,
`praxisIntegration`, `praxisRevision`, `praxisLanguage`, `praxisNumber`, `praxisData`, `praxisAlgGeo`).

## Basics
No new skills. Drills open with existing skill ids only: `ideas` (mainIdea, findingDetail, inference),
`language` (subjectVerb, pronounCase, verbTense, commaSplices, apostrophes, commonlyConfused,
danglingModifiers), `number` (fractionOps, decimals, percents, ratios, rateProblems, unitConversion).
66 items carry a `basics` tag, each one of its drill's skills. Dashboard: 7 drills + 3 Basics steps + 2 tests = 12.

## app/globals.css
After the `[data-theme="ged"]` block (light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint).
Suggested hue 87 (olive, a chalkboard-adjacent green that sits between 82 and 95); re-pick if it clashes.
```css
  /* Praxis Core theme: olive (v2 exam; matches lib/v2/exams/praxis.ts theme) */
  [data-theme="praxis"] {
    --brand: 87 50% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 87 60% 95%;
    --brand-hover: 87 50% 29%;
    --brand-dark: 87 50% 25%;
    --brand-darker: 87 45% 14%;
    --brand-muted: 87 30% 70%;
    --brand-border: 87 35% 78%;
    --brand-border-light: 87 35% 89%;
    --brand-gradient-to: 75 55% 95%;
  }
```

## lib/shareCards.ts
```ts
  "praxis": {
    "color": "hsl(87, 50%, 34%)",
    "tint": "hsl(87, 60%, 95%)"
  },
```

## lib/shareCardCopy.ts
```ts
  praxis: { title: "Praxis Core for future teachers", description: "Practice Reading, Writing and Math for the Praxis Core Academic Skills for Educators tests, timed at the real pace." },
```

## lib/region.ts
US exam: no `TEST_REGIONS` entry needed (US is the default). Not in `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  praxis: "Praxis Core Academic Skills for Educators for future teachers: Reading (5713), Writing (5723, selected response) and Mathematics (5733) in two practice tests at the real pace, with passages, usage and sentence correction, a calculator on Math, and seven drills, three of which teach the basics first. Free.",
// EXAM_ORG
  praxis: "ETS · Reading 5713, Writing 5723, Math 5733",
// SEARCH_ALIASES
  praxis: "praxis core praxis 1 ppst core academic skills for educators 5713 5723 5733 5752 teacher certification teacher education program admission ets reading writing math",
// RELATED_OVERRIDES
  praxis: ["ged", "accuplacer", "sat"],
```
Hub group: "GED, college, military & nursing school entrance", after `ged`:
```ts
  { title: "GED, college, military & nursing school entrance", ids: ["ged", "praxis", "sat", "act", "accuplacer", "asvab", "teas", "hesi"] },
```

## lib/examFacts.ts
```ts
  praxis: {
    answer:
      "The Praxis Core Academic Skills for Educators is three ETS tests that teacher preparation programs and states use for admission or licensure, taken separately or together as the combined test 5752. Reading (5713) is 56 selected-response questions in 85 minutes. Writing (5723) is a 40-minute section of 40 selected-response questions (usage, sentence correction, revision in context and research skills) followed by two 30-minute essays. Mathematics (5733) is 56 questions in 90 minutes with an on-screen four-function calculator: Number and Quantity 36 percent, Data Interpretation, Statistics and Probability 32 percent, Algebra and Geometry 32 percent. Each test is scored 100 to 200, and each state sets its own passing score.",
    rows: [
      { label: "Reading (5713)", value: "56 questions, 85 minutes" },
      { label: "Writing (5723)", value: "40 questions in 40 minutes, plus two 30-minute essays" },
      { label: "Math (5733)", value: "56 questions, 90 minutes, four-function calculator" },
      { label: "Question types", value: "Five-choice, select one or more, numeric entry (Math)" },
      { label: "Scores", value: "100 to 200 per test; passing score set by each state" },
      { label: "Common cutoffs", value: "Reading 156, Writing 162, Math 150 in many states" },
      { label: "Given by", value: "ETS, at test centers or at home" },
    ],
    basedOn: "the ETS Praxis Study Companions for Core Reading (5713), Writing (5723) and Mathematics (5733)",
    source: { name: "ETS Praxis", url: "https://praxis.ets.org/scores" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, near `ged`:
```ts
  praxis: "a teacher preparation program",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"praxis"` after `"ged"` (teacher-prep programs assign it).

## lib/tigerAssets.ts
Nothing (falls back to the DMV tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the GED-related v2 bullets:
```md
- **Praxis Core** (`/praxis-core`, landing `/praxis-core-practice-test`, `[data-theme="praxis"]` olive, hub group "GED, college, military & nursing school entrance"): ETS Praxis Core Academic Skills for Educators, Reading 5713 (56 in 85 min), Writing 5723 selected response (40 in 40 min; the two essays are not modelled) and Mathematics 5733 (56 in 90 min, four-function calculator). Two practice tests of three sections at half length and the real pace (Reading 28 in 43 min, Writing 20 in 20 min, Math 28 in 45 min; 10/8/10, 5/15, 10/9/9 across the ETS categories), no break, Test 2 held out. Five options everywhere like the real tests; Writing runs usage (four underlined parts plus No error, `lockedOrder`), sentence correction (choice A repeats the original, `lockedOrder`), revision in context on a numbered draft, then research skills; Math adds select-all `multi` and typed `numeric`. 7 drills (`ideas`, `craft` = Craft + Integration, `language`, `revision`, `number`, `data`, `algebra`); `ideas`, `language` and `number` open with existing Basics skills (66 tagged items), so the dashboard is 12 steps. Bank `data/v2/praxis/questions.json` (200 original items, prefix `PRAXIS-`, 16 shared stimuli: per test a long passage, paired passages, three short passages, a data table and a revision draft) built by its own `tools/praxis/build.py` from Python-data sources. Scores are percent correct; states set their own 100 to 200 cutoffs (156/162/150 in many). Sources in `tools/praxis/sources.md`.
```
