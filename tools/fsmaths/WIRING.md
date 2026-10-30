# fsmaths wiring (v2 exam)

Files already written (unique to this exam): `lib/v2/exams/fsmaths.ts`, `lib/v2/banks/fsmaths.ts`,
`data/v2/fsmaths/questions.json` (built), `data/v2/basics/fsmaths.json` (built, 16 new skills, ids `fsm*`),
`tools/fsmaths/*` (`build.py` writes both JSON files: `python3 -I tools/fsmaths/build.py`),
`app/functional-skills-maths/*` (copied from `app/ged/`), `app/functional-skills-maths-level-2-practice-test/page.tsx`.
Dashboard: 4 Basics steps + 4 drills + 2 practice papers = 10 steps.

Validate: `python3 -I tools/validate_v2_bank.py fsmaths '{"1": {"a": {"1": 10}, "b": {"1": 30}}, "2": {"a": {"1": 10}, "b": {"1": 30}}}'`

## lib/v2/basics.ts
After `import timesTables from "@/data/v2/basics/timestables.json";`:
```ts
import fsMaths from "@/data/v2/basics/fsmaths.json";
```
and add `...fsMaths` to the LIBRARY array:
```ts
  ([...grammar, ...reading, ...math, ...science, ...writing, ...timesTables, ...fsMaths] as BasicsSkill[]).map((s) => [s.id, s])
```
(Two skills, `fsmGroupedMean` and `fsmProbability`, use the skill-level `table` with `walkthrough.table: true`;
their questions read that same table.)

## lib/v2/registry.ts
```ts
import { FSMATHS } from "./exams/fsmaths";
```
Append `FSMATHS` to `EXAMS_V2` (after the UK school exams).

## lib/v2/bankSizes.ts
Regenerate with the validator, or add `  fsmaths: 200,`.

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/fsmaths";
```
(mcpV2Practice uses single quotes: `import '@/lib/v2/banks/fsmaths';`)

## app/globals.css
Light block next to the other v2 themes, then re-run `python3 -I tools/gen_dark_brand_css.py` for the `.dark` block:
```css
  /* Functional Skills Maths theme: olive green (v2 exam; matches lib/v2/exams/fsmaths.ts theme) */
  [data-theme="fsmaths"] {
    --brand: 84 55% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 84 70% 95%;
    --brand-hover: 84 55% 27%;
    --brand-dark: 84 55% 22%;
    --brand-darker: 84 50% 15%;
    --brand-muted: 84 35% 72%;
    --brand-border: 84 35% 78%;
    --brand-border-light: 84 35% 88%;
    --brand-gradient-to: 64 80% 94%;
  }
```
Hue 84 was unused in this worktree and in the other wave-2 WIRING files (nearest: 70, 95, 110).

## lib/testCatalog.ts
EXAM_BLURBS:
```ts
  fsmaths: "Functional Skills Maths Level 2 for England: two practice papers with a non-calculator and a calculator section, real-life problems in pounds and metric units, and four topic drills that open with short lessons.",
```
EXAM_ORG: `fsmaths: "Ofqual-regulated awarding bodies (England)",`
SEARCH_ALIASES:
```ts
  fsmaths: "functional skills maths level 2 fs maths l2 functional maths adult maths apprenticeship maths gcse equivalent grade 4 non calculator calculator mock exam pearson edexcel city and guilds ncfe highfield open awards uk england college",
```
GROUPS: suggested "UK workplace and trade certificates" (adult learners and apprentices) or "UK school tests"; integrator decides.
RELATED_OVERRIDES (if its group is small): `fsmaths: ["gcsemaths", "gcsehigher", "cscs"],`

## lib/region.ts
Add to `TEST_REGIONS`: `fsmaths: "UK",` and add `"fsmaths"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts
```ts
  fsmaths: {
    answer:
      "Functional Skills Maths Level 2 is an Ofqual-regulated qualification in England that tests using maths to solve real-life problems. It is one exam set by the awarding body you register with, with a non-calculator part worth 25% of the marks and a calculator part for the rest; about three-quarters of the marks are for multi-step problems. It covers using numbers (including fractions, percentages, ratio and formulas), measures, shape and space, and handling data and probability. Each awarding body sets its own paper length and pass mark.",
    rows: [
      { label: "Who takes it", value: "Adults, apprentices and college learners in England" },
      { label: "Format", value: "One exam: a non-calculator section (25% of marks) and a calculator section" },
      { label: "Time", value: "Set by the awarding body, often around 2 hours (Pearson Edexcel: 25 min + 1 hr 30 min)" },
      { label: "Passing score", value: "Set for each paper by the awarding body" },
      { label: "Content", value: "Number; measures, shape and space; handling information and data" },
      { label: "Given by", value: "Ofqual-regulated awarding bodies, on paper or on screen" },
    ],
    basedOn: "the Department for Education's Functional Skills mathematics subject content (Level 2) and Ofqual's assessment weightings",
    source: { name: "DfE: Functional Skills subject content, mathematics", url: "https://www.gov.uk/government/publications/functional-skills-subject-content-mathematics" },
    tigertest:
      "Tigertest has two Functional Skills Maths Level 2 practice papers (10 non-calculator and 30 calculator questions each) and four topic drills, each opening with short click-through lessons. All of it is free with no account required; scores are percent correct.",
  },
```

## components/exam/ExamClassFaq.tsx (TEACHES)
```ts
  fsmaths: "Functional Skills maths classes",
```

## components/TeachNudge.tsx (TEACHER_LED)
Add `"fsmaths"` (college, adult learning and apprenticeship classes).

## lib/tigerAssets.ts
Nothing: no tiger set. If the integrator wants one, `BORROWED_SETS` could map `fsmaths: "ged"`.

## CLAUDE.md (v2 exams section, one bullet)
```md
- **Functional Skills Maths Level 2** (`/functional-skills-maths`, landing `/functional-skills-maths-level-2-practice-test`, `[data-theme="fsmaths"]` olive): DfE 2018 Level 2 subject content and Ofqual's 25% non-calculator rule. Two practice papers (Test 2 held out), each Section A non-calculator (10 items, 20 min) then Section B calculator (30 items, 70 min) with a formula sheet; 4 drills (`fsmNumber`, `fsmPercent`, `fsmMeasure`, `fsmData`; per paper 9/12/12/7), all drill-only items in section `b`, each drill opening with four of 16 UK Basics walkthroughs in `data/v2/basics/fsmaths.json` (ids `fsm*`). 200 items, every answer computed in `tools/fsmaths/q_*.py`; rebuild with `python3 -I tools/fsmaths/build.py`. Pass marks vary by awarding body, so the score is percent correct (default goal 70).
```

## Landing screenshots
`/landing/fsmaths-mobile.png` and `/landing/fsmaths-desktop.png` are referenced by the hero but not created
(no dev server in this build). Shoot them with `.claude/skills/exam-bank/scripts/shoot_landing.js` after wiring.

## OG image, sitemap, llms.txt
Generated from `EXAMS_V2` and `EXAM_FACTS`; nothing extra beyond the registry entry. Bump
`EXAM_LANDINGS_UPDATED_AT` in `lib/seoDates.ts` once for the whole wave.
