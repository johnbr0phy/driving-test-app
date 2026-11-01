# IBPS Clerk Prelims (`ibpsclerk`) wiring for the integrator

v2 exam, built on the IBPS PO template (`tools/ibpspo`, `app/ibps-po`). Files written (unique to this exam):
`tools/next100/ibpsclerk/*` (9 domain sources as Python data, `stimuli.py` with 19 shared stimuli, `build.py`,
`sources.md`, this file), `data/v2/ibpsclerk/questions.json` (object form `{ stimuli, questions }`),
`lib/v2/exams/ibpsclerk.ts` (export `IBPSCLERK`), `lib/v2/banks/ibpsclerk.ts` (`withStimuli`),
`app/ibps-clerk/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results, stats; copied
from `app/ibps-po/`), `app/ibps-clerk-prelims-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/ibpsclerk/build.py`, then
`python3 -I tools/validate_v2_bank.py ibpsclerk '{"1": {"eng": {"1": 30}, "quant": {"1": 35}, "reason": {"1": 35}}, "2": {"eng": {"1": 30}, "quant": {"1": 35}, "reason": {"1": 35}}}'`
(227 questions, 19 stimuli, 0 problems; I ran it through a copy without the bankSizes write, so the
validator will add the bankSizes line itself when you run it). Key strictly longest: 18/227 = 8%.
Its own build (keys first, stem-seeded shuffle; error spotting letters, jumble letters and
inequality/syllogism conclusions carry `lockedOrder`), not in `tools/build_v2_bank.py` PLANS. Every
arithmetic answer is asserted in the source files, and the build warns when a stem without a stimulus
matches one in the ibpspo, ssccgl, rrbntpc or ctet banks (none now).

Shape: sections `eng` (30 in 20 min), `quant` (Numerical Ability, 35 in 20 min), `reason` (35 in 20 min),
one module each, `breakSeconds: 0`. Two mock tests, Test 2 held out, 9 drills (3 per section), 11 dashboard
steps. Free, no Premium gating. Screenshots still needed: `public/landing/ibpsclerk-mobile.png`,
`ibpsclerk-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  ibpsclerk: 227,
```

## lib/v2/registry.ts
```ts
import { IBPSCLERK } from "./exams/ibpsclerk";
// EXAMS_V2: add IBPSCLERK right after IBPSPO
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/ibpsclerk";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `IBPSCLERK.domainLabels` (keys `ibpsclerkReading`, `ibpsclerkCloze`,
`ibpsclerkGrammar`, `ibpsclerkNumber`, `ibpsclerkDI`, `ibpsclerkArith`, `ibpsclerkLogic`, `ibpsclerkPuzzle`,
`ibpsclerkVerbal`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). Hue 338 from the brief, matching
`IBPSCLERK.theme`. It sits 6 degrees from ibpspo (332 70% 46%) but differs by 15 points of saturation and
12 of lightness, inside the house rule.
```css
  /* IBPS Clerk theme: deep bank rose (v2 exam; matches lib/v2/exams/ibpsclerk.ts theme) */
  [data-theme="ibpsclerk"] {
    --brand: 338 55% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 338 55% 96%;
    --brand-hover: 338 55% 30%;
    --brand-dark: 338 55% 27%;
    --brand-darker: 338 50% 14%;
    --brand-muted: 338 25% 70%;
    --brand-border: 338 35% 82%;
    --brand-border-light: 338 35% 91%;
    --brand-gradient-to: 350 55% 96%;
  }
```

## lib/shareCards.ts
```ts
  "ibpsclerk": {
    "color": "hsl(338, 55%, 34%)",
    "tint": "hsl(338, 55%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  ibpsclerk: { title: "IBPS Clerk Prelims Mock Test", description: "Practice English, numerical ability and reasoning in full 100-question mock tests with 20-minute sectional timing." },
```

## lib/shareImageUrl.ts and lib/tigerAssets.ts
Add `"ibpsclerk"` next to `"ibpspo"` in `REMAINING_MASCOT_IDS` and in the tigerAssets list that holds `"ibpspo"`
(same mascot handling as IBPS PO).

## lib/region.ts
```ts
// TEST_REGIONS
  ibpsclerk: "IN",
```
Add `"ibpsclerk"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  ibpsclerk: "Mock tests for the IBPS Clerk Preliminary exam: 100 questions in 60 minutes with sectional timing across English Language, Numerical Ability and Reasoning Ability, with negative marking explained.",
// EXAM_ORG
  ibpsclerk: "IBPS · CRP CSA (Clerk) Preliminary Examination",
// SEARCH_ALIASES
  ibpsclerk: "ibps clerk mock test ibps clerk prelims ibps csa customer service associate bank clerk exam crp csa sbi clerk bank exam india reasoning puzzles seating arrangement simplification approximation number series data interpretation english cloze sarkari exam government job",
```
Hub group "India government job exams": add after `ibpspo`:
```ts
  { title: "India government job exams", ids: ["ssccgl", "rrbntpc", "ibpspo", "ibpsclerk", "ctet"] },
```
RELATED_OVERRIDES, if the group needs one: `ibpsclerk: ["ibpspo", "ssccgl", "rrbntpc"]`.

## lib/examFacts.ts
```ts
  ibpsclerk: {
    answer:
      "The IBPS Clerk Preliminary Examination is one online objective paper of 100 questions in 60 minutes, with each section timed separately: English Language 30 questions in 20 minutes, Numerical Ability 35 in 20 minutes and Reasoning Ability 35 in 20 minutes. Each question carries one mark and a quarter of a mark is deducted for every wrong answer. Candidates must clear a cutoff set by IBPS in each of the three tests (past cutoffs have differed by state and category); Prelims is qualifying for the Mains, and only Mains marks count in the final merit list. The 2026 Prelims (CRP CSA-XVI) was scheduled for October 2026.",
    rows: [
      { label: "Questions", value: "100 (five options each in past papers)" },
      { label: "Time", value: "60 minutes, 20 per section" },
      { label: "Sections", value: "English 30, Numerical Ability 35, Reasoning Ability 35" },
      { label: "Marks", value: "1 per question, 100 in all" },
      { label: "Negative marking", value: "1/4 mark per wrong answer" },
      { label: "Result", value: "A cutoff in each test, set by IBPS, then the Mains" },
      { label: "Given by", value: "Institute of Banking Personnel Selection (IBPS), online" },
      { label: "Medium", value: "English test in English; the others in English, Hindi or a regional language by state" },
    ],
    basedOn: "the IBPS CRP CSA-XVI (Customer Service Associate) notification of 1 August 2026, section D (Structure of Examination) and E (Penalty for Wrong Answers)",
    source: { name: "IBPS", url: "https://www.ibps.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  ibpsclerk: "a bank exam coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"ibpsclerk"` (bank exam coaching institutes).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section, after IBPS PO:
```md
- **IBPS Clerk** (`/ibps-clerk`, landing `/ibps-clerk-prelims-practice-test`, `[data-theme="ibpsclerk"]` deep rose, region IN, hub group "India government job exams"): IBPS CRP CSA (Clerk) Preliminary Examination, 100 five-option questions in 60 minutes with sectional timing (English Language 30 in 20 min, Numerical Ability 35 in 20 min, Reasoning Ability 35 in 20 min), a quarter mark off per wrong answer; pattern confirmed in the official CSA-XVI notification of 1 August 2026 (prelims October 2026; guides report 10 and 11 October), the same as CSA-XV (2025). Three sections (`eng`, `quant`, `reason`), each one timed module. Two 100-item mock tests, Test 2 held out, 9 drills, three per section (`ibpsclerkReading`, `ibpsclerkCloze`, `ibpsclerkGrammar`, `ibpsclerkNumber`, `ibpsclerkDI`, `ibpsclerkArith`, `ibpsclerkLogic`, `ibpsclerkPuzzle`, `ibpsclerkVerbal`; 12/10/8, 15/8/12, 8/15/12 per test, 3 drill-only each), so the dashboard is 11 steps. Heavier on simplification than the PO paper, no quadratic equations. Bank `data/v2/ibpsclerk/questions.json` (227 original single-answer items, prefix `IBPSCLK-`, object form with 19 stimuli) built by `python3 -I tools/next100/ibpsclerk/build.py` (computed answers asserted in the sources; warns on stems shared with the other India banks). English only, though the real exam is also offered in Hindi and regional languages (the landing says so). Score out of 100 with no negative marking; penalty and cutoffs in `scoreNote` and on the landing. Sources in `tools/next100/ibpsclerk/sources.md`.
```
