# IBPS PO Prelims (`ibpspo`) wiring for the integrator

v2 exam. Files already written (unique to this exam):
`tools/ibpspo/*` (9 domain sources as Python data, `stimuli.py` with 18 shared stimuli, `build.py`, `sources.md`),
`data/v2/ibpspo/questions.json` (object form `{ stimuli, questions }`), `lib/v2/exams/ibpspo.ts` (export `IBPSPO`),
`lib/v2/banks/ibpspo.ts` (`withStimuli`), `app/ibps-po/*` (layout, root redirect, dashboard, practice/[n],
test/[id], test/[id]/results; copied from `app/pmp/`), `app/ibps-po-prelims-practice-test/page.tsx`.

Rebuild: `python3 -I tools/ibpspo/build.py`, then
`python3 -I tools/validate_v2_bank.py ibpspo '{"1": {"eng": {"1": 30}, "quant": {"1": 35}, "reason": {"1": 35}}, "2": {"eng": {"1": 30}, "quant": {"1": 35}, "reason": {"1": 35}}}'`
(passes: 225 questions, 18 stimuli, 0 problems). Do not add `ibpspo` to `tools/build_v2_bank.py` PLANS: it has
its own build (shuffled items list the key first and shuffle by a stem seed; fixed-order items such as error
spotting letters, quadratic relations and inequality/syllogism conclusions carry `lockedOrder` and an explicit key).

Shape: three sections `eng` (30 in 20 min), `quant` (35 in 20 min), `reason` (35 in 20 min), each one module, so
the runner gives sectional timing and no going back to a closed section; `breakSeconds: 0`. Two mock tests,
Test 2 held out, 9 drills (3 per section), 11 dashboard steps. No Premium gating.

Screenshots still needed: `public/landing/ibpspo-mobile.png`, `ibpspo-desktop.png` (+ `-dark`).
No `ExamLandingBreadcrumbs` on the landing (not in this tree; the PMP and SSC CGL landings do not use it either);
add it if the integrator's tree has it.

## lib/v2/bankSizes.ts
```ts
  ibpspo: 225,
```

## lib/v2/registry.ts
```ts
import { IBPSPO } from "./exams/ibpspo";
// EXAMS_V2: add IBPSPO with the other India government job exams (after SSCCGL / RRBNTPC)
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ SSCCGL, RRBNTPC, IBPSPO, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/ibpspo";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `IBPSPO.domainLabels` (keys `engReading`, `engCloze`, `engGrammar`, `qtNumber`,
`qtDI`, `qtArith`, `rsLogic`, `rsPuzzle`, `rsVerbal`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). Suggested hue 350 (bank crimson); re-pick
if it clashes, and keep it in step with `IBPSPO.theme` in `lib/v2/exams/ibpspo.ts`.
```css
  /* IBPS PO theme: bank crimson (v2 exam; matches lib/v2/exams/ibpspo.ts theme) */
  [data-theme="ibpspo"] {
    --brand: 350 65% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 350 70% 96%;
    --brand-hover: 350 65% 37%;
    --brand-dark: 350 65% 32%;
    --brand-darker: 350 60% 16%;
    --brand-muted: 350 30% 72%;
    --brand-border: 350 40% 82%;
    --brand-border-light: 350 40% 91%;
    --brand-gradient-to: 10 70% 96%;
  }
```

## lib/shareCards.ts
```ts
  "ibpspo": {
    "color": "hsl(350, 65%, 42%)",
    "tint": "hsl(350, 70%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  ibpspo: { title: "IBPS PO Prelims Mock Test", description: "Practice English, quantitative aptitude and reasoning in full 100-question mock tests with 20-minute sectional timing." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  ibpspo: "IN",
```
Add `"ibpspo"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  ibpspo: "Mock tests for the IBPS PO Preliminary Examination: 100 questions in 60 minutes with 20-minute sectional timing across English Language, Quantitative Aptitude and Reasoning Ability, with puzzles, data interpretation and negative marking explained.",
// EXAM_ORG
  ibpspo: "IBPS · CRP PO/MT Prelims",
// SEARCH_ALIASES
  ibpspo: "ibps po mock test ibps po prelims bank po exam probationary officer management trainee ibps crp po mt sbi po bank exam india reasoning puzzles seating arrangement quant data interpretation english cloze sarkari exam government job",
```
Hub group (new, per SPEC): "India government job exams", with SSC CGL, RRB NTPC and CTET:
```ts
  { title: "India government job exams", ids: ["ssccgl", "rrbntpc", "ibpspo", "ctet"] },
```

## lib/examFacts.ts
```ts
  ibpspo: {
    answer:
      "The IBPS PO Preliminary Examination is one online objective paper of 100 questions in 60 minutes, with each section timed separately: English Language 30 questions in 20 minutes, Quantitative Aptitude 35 in 20 minutes and Reasoning Ability 35 in 20 minutes. Each question carries one mark and a quarter of a mark is deducted for every wrong answer. IBPS sets sectional and overall cutoffs for each category every year; Prelims is qualifying for the Mains and its marks do not count in the final merit list.",
    rows: [
      { label: "Questions", value: "100, five options each" },
      { label: "Time", value: "60 minutes, 20 per section" },
      { label: "Sections", value: "English 30, Quantitative Aptitude 35, Reasoning Ability 35" },
      { label: "Marks", value: "1 per question, 100 in all" },
      { label: "Negative marking", value: "1/4 mark per wrong answer" },
      { label: "Result", value: "Sectional and overall cutoffs by category, then the Mains" },
      { label: "Given by", value: "Institute of Banking Personnel Selection (IBPS), online" },
    ],
    basedOn: "the IBPS CRP PO/MT notification and Preliminary Examination pattern",
    source: { name: "IBPS", url: "https://www.ibps.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  ibpspo: "a bank exam coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"ibpspo"` (bank exam coaching institutes).

## lib/tigerAssets.ts, lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section, after SSC CGL:
```md
- **IBPS PO** (`/ibps-po`, landing `/ibps-po-prelims-practice-test`, `[data-theme="ibpspo"]` crimson, region IN, hub group "India government job exams"): IBPS PO/MT Preliminary Examination, 100 five-option questions in 60 minutes with sectional timing (English Language 30 in 20 min, Quantitative Aptitude 35 in 20 min, Reasoning Ability 35 in 20 min), a quarter mark off per wrong answer. Three sections (`eng`, `quant`, `reason`), each one timed module, so there is no going back to a closed section. Two 100-item mock tests, Test 2 held out, 9 drills, three per section (`engReading`, `engCloze`, `engGrammar`, `qtNumber`, `qtDI`, `qtArith`, `rsLogic`, `rsPuzzle`, `rsVerbal`; 13/10/7, 15/10/10, 8/15/12 per test), so the dashboard is 11 steps. Bank `data/v2/ibpspo/questions.json` (225 original single-answer items, prefix `IBPSPO-`, object form with 18 stimuli: reading passages, cloze passages, para jumbles, data interpretation pipe tables and puzzles, each shared by five to eight items) built by its own `tools/ibpspo/build.py`; fixed-order items (error spotting letters, quadratic relations, inequality and syllogism conclusions, para jumble letters) use `lockedOrder`. Reasoning puzzles are text only; rupees and Indian names in word problems. Score out of 100 with no negative marking; the penalty and cutoffs are explained in `scoreNote` and on the landing. Sources in `tools/ibpspo/sources.md`.
```
