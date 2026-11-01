# JNVST Class VI (`jnvst`) wiring for the integrator

v2 exam, template `rrbntpc` (plus `ibpspo`'s object form for shared passages). Files written (unique to this exam):
`tools/next100/jnvst/*` (8 domain sources as Python data, `stimuli.py`, `build.py`, `sources.md`, this file),
`data/v2/jnvst/questions.json` (object form `{ stimuli, questions }`, 205 items, 13 stimuli, prefix `JNVST-`),
`lib/v2/exams/jnvst.ts` (export `JNVST`), `lib/v2/banks/jnvst.ts` (`withStimuli`, like IBPS PO),
`app/jnvst/*` (layout, root redirect, dashboard, practice/[n], stats, test/[id], test/[id]/results; copied from
`app/rrb-ntpc/`), `app/jnvst-class-6-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/jnvst/build.py`, then
`python3 -I tools/validate_v2_bank.py jnvst '{"1": {"jnv": {"1": 80}}, "2": {"jnv": {"1": 80}}}'`
(passes: 205 questions, 13 stimuli, 0 problems; key strictly longest 31/205 = 15%). The validator rewrites
`lib/v2/bankSizes.ts`; I ran it against a scratch copy so the shared file is untouched. Do not add `jnvst` to
`tools/build_v2_bank.py` PLANS: it has its own build.

Shape: one section `jnv`, one 80-question module in 120 minutes, items in the real paper order (Mental Ability
1-20, EVS 21-40 with its passage last, Arithmetic 41-60, Language 61-80 as four 5-item passages). Two tests, Test 2
held out. 8 drills + 2 tests = 10 dashboard steps. No Basics, no premium.

Screenshots still needed: `public/landing/jnvst-mobile.png`, `jnvst-desktop.png` (+ `-dark`), e.g.
`jnvst:jnvst:v2:reading` or `jnvst:jnvst:v2:numbers`.

## lib/v2/bankSizes.ts
```ts
  jnvst: 205,
```

## lib/v2/registry.ts
```ts
import { JNVST } from "./exams/jnvst";
// EXAMS_V2: add JNVST after CTET (India exams)
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ CTET, JNVST, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/jnvst";          // classQuestions.ts
import '@/lib/v2/banks/jnvst';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `JNVST.domainLabels` (keys `jnvstPatterns`, `jnvstShapes`, `jnvstNature`,
`jnvstLiving`, `jnvstEvsPassage`, `jnvstNumbers`, `jnvstMeasure`, `jnvstReading`).

## app/globals.css
Light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint. Hue from the brief, 54 70% 32% (school mustard). CHECK: it sits close to
`uk18ed` (50 80% 29.5%: 4 degrees, saturation 10, lightness 2.5 apart) and `caelec` (60 70% 26%: 6 degrees,
lightness 6 apart), which breaks the "within 8 degrees, 15 saturation or 8 lightness apart" rule in CLAUDE.md.
If you re-pick, keep `lib/v2/exams/jnvst.ts` `theme` in step. White text on 54 70% 32% is about 3.8:1.
```css
  /* JNVST theme: school mustard (v2 exam; matches lib/v2/exams/jnvst.ts theme) */
  [data-theme="jnvst"] {
    --brand: 54 70% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 54 70% 95%;
    --brand-hover: 54 70% 28%;
    --brand-dark: 54 70% 25%;
    --brand-darker: 54 60% 15%;
    --brand-muted: 54 35% 70%;
    --brand-border: 54 40% 78%;
    --brand-border-light: 54 40% 88%;
    --brand-gradient-to: 40 70% 95%;
  }
```

## lib/shareCards.ts
```ts
  "jnvst": {
    "color": "hsl(54, 70%, 32%)",
    "tint": "hsl(54, 70%, 95%)"
  },
```

## lib/shareCardCopy.ts
```ts
  jnvst: { title: "JNVST Class 6 Mock Test", description: "Navodaya entrance practice for Class 5 students: full 80-question tests on Mental Ability, EVS, Arithmetic and Language." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  inrto: "IN", ssccgl: "IN", rrbntpc: "IN", ibpspo: "IN", ctet: "IN", jnvst: "IN",
// NON_DRIVING_TESTS: add (it is not a driving test)
  "jnvst",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  jnvst: "Navodaya Vidyalaya Class 6 entrance practice for Class 5 students: full 80-question JNVST mock tests in 2 hours on Mental Ability, EVS, Arithmetic and Language passages. Mental Ability is practised in words, not pictures.",
// EXAM_ORG
  jnvst: "Navodaya Vidyalaya Samiti · JNVST Class VI",
// SEARCH_ALIASES
  jnvst: "jnvst navodaya navodaya vidyalaya jnv class 6 class vi entrance exam navodaya mock test navodaya practice test jawahar navodaya vidyalaya selection test nvs admission class 5 students mental ability test mat evs arithmetic language test sainik school india",
// RELATED_OVERRIDES (school entrance siblings are elsewhere; keep India neighbours)
  jnvst: ["ctet", "ssccgl", "rrbntpc"],
```
Hub group: no India school group exists. Either put it in "India government job exams" (wrong audience) or, better,
start a new group (it has only one member, hence the override above):
```ts
  { title: "India school entrance tests", ids: ["jnvst"] },
```
Place it right after "India driving tests" / "India government job exams".

## lib/examFacts.ts
```ts
  jnvst: {
    answer:
      "The JNVST (Jawahar Navodaya Vidyalaya Selection Test) Class VI is Navodaya Vidyalaya Samiti's entrance test for Class 5 students seeking a Class 6 seat at the Jawahar Navodaya Vidyalaya of their district. Under the JNVST 2027 prospectus it has 80 multiple-choice questions for 100 marks in 2 hours: Mental Ability 20 and Environmental Studies 20, Arithmetic 20 and Language 20 (four reading passages), with 1.25 marks per right answer and no negative marking. Candidates need at least 14 marks in Mental Ability and EVS, 7 in Arithmetic and 7 in Language; seats are then filled on merit district by district, with at least 75 percent for rural candidates and at least one third for girls.",
    rows: [
      { label: "Questions", value: "80 multiple choice, 100 marks" },
      { label: "Time", value: "2 hours, no break (40 minutes extra for Divyang students)" },
      { label: "Sections", value: "Mental Ability 20 and EVS 20, Arithmetic 20, Language 20" },
      { label: "Marking", value: "1.25 marks per right answer, no negative marking" },
      { label: "Qualifying marks", value: "14 in Mental Ability and EVS, 7 in Arithmetic, 7 in Language" },
      { label: "Who can take it", value: "Class 5 students in the district, once only; birth dates set in each year's prospectus" },
      { label: "Given by", value: "Navodaya Vidyalaya Samiti (NVS)" },
    ],
    basedOn: "the JNVST 2027 prospectus (Class VI admission 2027-28, test on 28 November 2026)",
    source: { name: "Navodaya Vidyalaya Samiti", url: "https://navodaya.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  jnvst: "a Navodaya coaching class or a Class 5 classroom",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"jnvst"` (Class 5 teachers and Navodaya coaching centres prepare students in groups).

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger). A kid-friendly borrow such as the times tables tiger would suit
it through `BORROWED_SETS` if you prefer.

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section with the other India exams (after CTET):
```md
- **JNVST** (`/jnvst`, landing `/jnvst-class-6-practice-test`, `[data-theme="jnvst"]` school mustard, region IN, hub group "India school entrance tests"): Navodaya Vidyalaya Samiti's Class VI selection test for Class 5 students, on the JNVST 2027 prospectus (test 28 November 2026: 80 four-option questions for 100 marks in 2 hours, Mental Ability 20 + EVS 20 in about 60 minutes, Arithmetic 20 and Language 20 in 30 each, time adjustable; 1.25 marks each, no negative marking; qualifying 14/7/7; district merit with 75% rural and one third girls). One section `jnv`, one 80-item module in 120 minutes in the real order, two tests with Test 2 held out, 8 drills (`jnvstPatterns`, `jnvstShapes`, `jnvstNature`, `jnvstLiving`, `jnvstEvsPassage`, `jnvstNumbers`, `jnvstMeasure`, `jnvstReading`; 10/10/8/7/5/10/10/20 per test, 45 drill-only), 10 dashboard steps, free. The real Mental Ability Test is figures only; the bank writes the same reasoning as text (patterns, mirror and water images of letters and clocks, folding, counting shapes) and the directions, `scoreNote` and landing say so. EVS is 15 items plus one passage of 5, the Language Test four passages of 5, all original and written for a Class 5 reader. Bank `data/v2/jnvst/questions.json` (205 items, 13 stimuli `JNVST-T1-E`, `-T1-L1..L4`..., object form through `withStimuli()`) built by `python3 -I tools/next100/jnvst/build.py`. Kept clear of the SSC CGL, RRB NTPC, IBPS PO and CTET banks. Sources in `tools/next100/jnvst/sources.md`.
```
