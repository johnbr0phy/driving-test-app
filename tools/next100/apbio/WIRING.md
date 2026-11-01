# AP Biology (`apbio`) wiring for the integrator

v2 exam, built on the appsych template (own build script, shared stimuli, one section, one module, percent score).
Files already written (unique to this exam):
`tools/next100/apbio/*` (`build.py`; sources as Python data, one file per unit: `unit1_chem.py`, `unit2_cells.py`,
`unit3_energetics.py`, `unit4_signaling.py`, `unit5_heredity.py`, `unit6_genes.py`, `unit7_evolution.py`,
`unit8_ecology.py`; `sources.md`), `data/v2/apbio/questions.json` (object form `{ stimuli, questions }`,
200 questions, 8 stimuli), `lib/v2/exams/apbio.ts` (export `APBIO`), `lib/v2/banks/apbio.ts` (`withStimuli`),
`app/ap-biology/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results, stats; copied
from `app/ap-psychology/`), `app/ap-biology-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/apbio/build.py`, then (from a copy, since the validator rewrites bankSizes)
```
python3 -I tools/validate_v2_bank.py apbio '{"1": {"mcq": {"1": 60}}, "2": {"mcq": {"1": 60}}}'
```
(passes: 200 questions, 8 stimuli, 0 problems). Do not add `apbio` to `tools/build_v2_bank.py` PLANS.

Shape: one section `mcq` (calculator on, a practice formula sheet as `reference`), one 60-item module in 90 minutes per
test (the real Section I at full length and pace), two tests with Test 2 held out, 8 drills (one per unit), so
8 + 2 = 10 dashboard steps. All items `single` with four options; per test 6/7/8/7/6/8/10/8 by unit and three
shared-stimulus sets of four; drill-only pool 10 per unit (two sets of three). Not Premium, no Basics.
Key strictly longest: 29/173 = 17% (numeric and locked items excluded). Screenshots still needed:
`public/landing/apbio-mobile.png`, `apbio-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  apbio: 200,
```

## lib/v2/registry.ts
```ts
import { APBIO } from "./exams/apbio";
// EXAMS_V2: after APPSYCH (and APUSH if it lands in the same wave)
export const EXAMS_V2: ExamV2Config[] = [GED, PRAXIS, SAT, PSAT, ACT, APPSYCH, APBIO, GRE, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the appsych bank import:
```ts
import "@/lib/v2/banks/apbio";      // classQuestions.ts
import '@/lib/v2/banks/apbio';      // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: domain labels live in `APBIO.domainLabels` (keys `apbioChem`, `apbioCells`, `apbioEnergetics`,
`apbioSignaling`, `apbioHeredity`, `apbioGenes`, `apbioEvolution`, `apbioEcology`).

## app/globals.css
HUE CHECK: the brief's `112 45% 34%` clashes with phleb (`120 40% 36%`: hue 8, saturation 5, lightness 2) and capal
(`110 38% 30%`: hue 2, saturation 7, lightness 4). I used `112 58% 32%` in `lib/v2/exams/apbio.ts`: saturation 18
from phleb, 20 from capal, 27 from inrto (`116 85% 28.5%`); gcsescience (`103 58% 30%`) is 9 degrees away. Check
against ibpsrrb (brief `92 50% 30%`, 20 degrees away) once it settles. Run `tools/gen_dark_brand_css.py` after.
```css
  /* AP Biology theme: leaf green (v2 exam; matches lib/v2/exams/apbio.ts theme) */
  [data-theme="apbio"] {
    --brand: 112 58% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 112 50% 96%;
    --brand-hover: 112 58% 27%;
    --brand-dark: 112 58% 24%;
    --brand-darker: 112 58% 16%;
    --brand-muted: 112 30% 72%;
    --brand-border: 112 35% 80%;
    --brand-border-light: 112 35% 90%;
    --brand-gradient-to: 124 45% 96%;
  }
```

## lib/shareCardCopy.ts and lib/shareImageUrl.ts
```ts
  apbio: { title: "AP Biology Practice Test", description: "Two full 60-question multiple-choice sections for the AP Biology exam, plus a drill for every unit." },
```
Add `"apbio"` to `SHARE_COPY_IDS` in `lib/shareImageUrl.ts` (as appsych is).

## lib/region.ts
Nothing: US is the default in `regionOfTest()`. (If the wave lists US exams explicitly, `apbio: "US"`.)

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  apbio: "Two full AP Biology multiple-choice sections: 60 questions with four choices in 90 minutes, all eight units weighted like the real exam, with experiments and data tables that questions share, a calculator and a formula sheet.",
// EXAM_ORG
  apbio: "College Board · AP Biology, course framework effective fall 2025",
// SEARCH_ALIASES
  apbio: "ap biology ap bio advanced placement biology college board ap exam biology mcq multiple choice chemistry of life cells cellular energetics photosynthesis respiration cell communication cell cycle heredity genetics gene expression natural selection evolution hardy weinberg chi square ecology high school",
// RELATED_OVERRIDES
  apbio: ["appsych", "apush", "sat"],
```
Hub group: per the brief, a new "AP exams" group with appsych, apush and apbio, taking appsych out of
"GED, college, military & nursing school entrance":
```ts
  { title: "GED, college, military & nursing school entrance", ids: ["ged", "praxis", "sat", "psat", "act", "accuplacer", "asvab", "teas", "hesi"] },
  { title: "AP exams", ids: ["appsych", "apush", "apbio"] },
```
(Then `RELATED_OVERRIDES` for the three may be unnecessary; with three members the group pads, so keep the override.)

## lib/examFacts.ts
```ts
  apbio: {
    answer:
      "The AP Biology Exam is a 3-hour exam from the College Board, given in May. Section I has 60 multiple-choice questions with four choices in 90 minutes (50% of the score), some in sets of typically four to five that share a stimulus; Section II has 6 free-response questions in 90 minutes (50%). The exam is hybrid digital: multiple choice in the Bluebook app, free responses handwritten. A calculator is allowed and a formula sheet is provided. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "60 questions, 90 minutes, 50% of score" },
      { label: "Free response", value: "6 questions (2 long, 4 short), 90 minutes, 50%" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Units", value: "8, from 8-11% (Chemistry of Life) to 13-20% (Natural Selection)" },
      { label: "Calculator", value: "Four-function, scientific or graphing; formula sheet provided" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
    ],
    basedOn: "the College Board AP Biology exam page and Course and Exam Description (effective fall 2025)",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-biology/exam" },
    tigertest:
      "Tigertest has two full 60-question AP Biology multiple-choice sections and eight drills, one per unit, all free with no account required. The free-response section is not included.",
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, after `appsych`:
```ts
  apbio: "AP Biology",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"apbio"` after `"appsych"` (an AP class teacher sets it).

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the AP Psychology bullet in the v2 section:
```md
- **AP Biology** (`/ap-biology`, landing `/ap-biology-practice-test`, `[data-theme="apbio"]` leaf green, region US, hub group "AP exams"): the College Board exam on the Course and Exam Description effective fall 2025, multiple-choice section only (Section I: 60 questions with four choices in 90 minutes, 50% of the score, single questions and sets of typically 4 to 5 on a shared stimulus; the six free-response questions are not modelled and the landing says so). One section `mcq` with the calculator and a practice formula sheet (`reference`, Tigertest's summary of the official equations and formulas), one 60-item module at the real pace, two tests with Test 2 held out, 8 drills, one per unit (`apbioChem`, `apbioCells`, `apbioEnergetics`, `apbioSignaling`, `apbioHeredity`, `apbioGenes`, `apbioEvolution`, `apbioEcology`; 6/7/8/7/6/8/10/8 per test, the midpoints of the CED unit weightings), 10 dashboard steps, free, no Basics. Each test has three shared-stimulus sets of four (experiments and data tables, with chi-square, Hardy-Weinberg and water potential calculations); all-number options are sorted and locked. Percent score; `scoreNote` says the College Board converts a composite to 1 to 5 each year. Bank `data/v2/apbio/questions.json` (200 original items, 8 stimuli, ids `APBIO-T<n>-NNN`, `APBIO-D-NNN`) built by `python3 -I tools/next100/apbio/build.py` from one Python source per unit. Sources in `tools/next100/apbio/sources.md`.
```
