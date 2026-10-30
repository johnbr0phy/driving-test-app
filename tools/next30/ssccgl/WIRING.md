# SSC CGL Tier 1 (`ssccgl`) wiring for the integrator

v2 exam. Files already written (unique to this exam):
`tools/ssccgl/*` (8 domain sources as Python data, `stimuli.json` with 2 cloze and 2 reading passages, `build.py`,
`sources.md`), `data/v2/ssccgl/questions.json` (object form `{ stimuli, questions }`), `lib/v2/exams/ssccgl.ts`
(export `SSCCGL`), `lib/v2/banks/ssccgl.ts` (`withStimuli`), `app/ssc-cgl/*` (layout, root redirect, dashboard,
practice/[n], test/[id], test/[id]/results; copied from `app/pmp/`), `app/ssc-cgl-practice-test/page.tsx`.

Rebuild: `python3 -I tools/ssccgl/build.py`, then
`python3 -I tools/validate_v2_bank.py ssccgl '{"1": {"cgl": {"1": 100}}, "2": {"cgl": {"1": 100}}}'`
(passes: 232 questions, 4 stimuli, 0 problems). Do not add `ssccgl` to `tools/build_v2_bank.py` PLANS: it has its
own build (keys authored first and shuffled by a stem seed; paper order Reasoning, GA, Quant, English; the cloze
and reading passages close the English part).

Screenshots still needed: `public/landing/ssccgl-mobile.png`, `ssccgl-desktop.png` (+ `-dark`).
No `ExamLandingBreadcrumbs` on the landing (not in this tree; the PMP and AWS landings do not use it either).

## lib/v2/bankSizes.ts
```ts
  ssccgl: 232,
```

## lib/v2/registry.ts
```ts
import { SSCCGL } from "./exams/ssccgl";
// EXAMS_V2: add SSCCGL (first of the India government job exams)
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ SSCCGL, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/ssccgl";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `SSCCGL.domainLabels` (keys `cglVerbal`, `cglLogical`, `cglPolity`,
`cglScience`, `cglArithmetic`, `cglAdvanced`, `cglGrammar`, `cglVocab`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). Suggested hue 220 (government navy); re-pick
if it clashes, and keep it in step with `SSCCGL.theme` in `lib/v2/exams/ssccgl.ts`.
```css
  /* SSC CGL theme: government navy (v2 exam; matches lib/v2/exams/ssccgl.ts theme) */
  [data-theme="ssccgl"] {
    --brand: 220 70% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 220 70% 96%;
    --brand-hover: 220 70% 35%;
    --brand-dark: 220 70% 30%;
    --brand-darker: 220 65% 16%;
    --brand-muted: 220 35% 72%;
    --brand-border: 220 40% 80%;
    --brand-border-light: 220 40% 90%;
    --brand-gradient-to: 230 70% 96%;
  }
```

## lib/shareCards.ts
```ts
  "ssccgl": {
    "color": "hsl(220, 70%, 40%)",
    "tint": "hsl(220, 70%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  ssccgl: { title: "SSC CGL Tier 1 Mock Test", description: "Practice reasoning, general awareness, quantitative aptitude and English in full 100-question, 60-minute mock tests." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  ssccgl: "IN",
```
Add `"ssccgl"` to `NON_DRIVING_TESTS` (a country-specific non-driving test, like the other IN/UK/CA exams there).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  ssccgl: "Mock tests for SSC CGL Tier 1: 100 questions in 60 minutes on general intelligence and reasoning, general awareness, quantitative aptitude and English comprehension, with negative marking explained.",
// EXAM_ORG
  ssccgl: "Staff Selection Commission · CGL Tier 1",
// SEARCH_ALIASES
  ssccgl: "ssc cgl mock test ssc cgl tier 1 ssc cgl practice set ssc exam combined graduate level staff selection commission ssc mock test free sarkari exam government job exam india reasoning gk quant english",
```
Hub group (new, per SPEC): add right after "India driving tests":
```ts
  { title: "India government job exams", ids: ["ssccgl" /* , "rrbntpc", "ibpspo", "ctet" */] },
```
If it is alone when integrated, add `RELATED_OVERRIDES`: `ssccgl: ["inrto"]`.

## lib/examFacts.ts
```ts
  ssccgl: {
    answer:
      "SSC CGL Tier 1 is a computer-based paper of 100 multiple-choice questions in 60 minutes, set by the Staff Selection Commission. It has four parts of 25 questions: General Intelligence and Reasoning, General Awareness, Quantitative Aptitude and English Comprehension. Each right answer earns 2 marks (200 in all) and each wrong answer loses 0.50 marks. Tier 1 is qualifying: candidates who clear the cut-off for their category go on to Tier 2, which decides the final merit.",
    rows: [
      { label: "Questions", value: "100 (25 per part)" },
      { label: "Time", value: "60 minutes, no sectional timing" },
      { label: "Marks", value: "2 per right answer, 200 in all" },
      { label: "Negative marking", value: "0.50 per wrong answer" },
      { label: "Parts", value: "Reasoning, General Awareness, Quantitative Aptitude, English" },
      { label: "Result", value: "Qualifying cut-off by category, then Tier 2" },
      { label: "Given by", value: "Staff Selection Commission, computer-based" },
    ],
    basedOn: "the SSC Combined Graduate Level Examination notice and Tier 1 syllabus",
    source: { name: "Staff Selection Commission", url: "https://ssc.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  ssccgl: "an SSC coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"ssccgl"` (coaching institutes run SSC batches).

## lib/tigerAssets.ts, lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section:
```md
- **SSC CGL** (`/ssc-cgl`, landing `/ssc-cgl-practice-test`, `[data-theme="ssccgl"]` navy, region IN, hub group "India government job exams"): Staff Selection Commission Combined Graduate Level Tier 1, 100 questions in 60 minutes with no sectional timing, four parts of 25 (reasoning, general awareness, quantitative aptitude, English), 2 marks each and 0.50 off per wrong answer. Two 100-item mock tests (one section `cgl`, in the paper's order), Test 2 held out, 8 drills, two per part (`cglVerbal`, `cglLogical`, `cglPolity`, `cglScience`, `cglArithmetic`, `cglAdvanced`, `cglGrammar`, `cglVocab`; 13/12 13/12 13/12 12/13 per test, 4 drill-only each), so the dashboard is 10 steps. Bank `data/v2/ssccgl/questions.json` (232 original single-answer items, prefix `SSCCGL-`, object form with cloze stimuli `SSCCGL-CL1/2` and reading stimuli `SSCCGL-RC1/2`) built by its own `tools/ssccgl/build.py`. Reasoning is text only; GA is static (no current affairs or office-holders); rupees and Indian names in word problems. Percent score; negative marking is explained in `scoreNote` and on the landing, not applied. Sources in `tools/ssccgl/sources.md`.
```
