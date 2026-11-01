# AP Psychology (`appsych`) wiring for the integrator

v2 exam, modelled on GRE (own build script, shared stimuli) and ITIL (one section, one module, percent score).
Files already written (unique to this exam):
`tools/next100/appsych/*` (`build.py`; sources as Python data, one file per domain: `unit1_bio.py`,
`unit2_cognition.py`, `unit3_devlearn.py`, `unit4_social.py`, `unit5_health.py`, `research.py`; `sources.md`),
`data/v2/appsych/questions.json` (object form `{ stimuli, questions }`, 200 questions, 7 stimuli),
`lib/v2/exams/appsych.ts` (export `APPSYCH`), `lib/v2/banks/appsych.ts` (`withStimuli`),
`app/ap-psychology/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results, stats; copied from `app/gre/`),
`app/ap-psychology-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/appsych/build.py`, then
```
python3 -I tools/validate_v2_bank.py appsych '{"1": {"mcq": {"1": 75}}, "2": {"mcq": {"1": 75}}}'
```
(passes: 200 questions, 7 stimuli, 0 problems). The validator writes `appsych: 200` into
`lib/v2/bankSizes.ts`; I removed that line again so the shared file is yours to edit (block below).
Do not add `appsych` to `tools/build_v2_bank.py` PLANS.

Shape: one section `mcq`, one 75-item module in 90 minutes per test (the real Section I at full length and pace),
two tests with Test 2 held out, 6 drills (one per unit + research methods and data), so 6 + 2 = 8 dashboard steps.
All items `single` with four options; 7 shared stimuli (study summaries, data tables). Not Premium, no Basics.
Key strictly longest: 21/193 = 11% (numeric-option items excluded). Screenshots still needed:
`public/landing/appsych-mobile.png`, `appsych-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  appsych: 200,
```

## lib/v2/registry.ts
```ts
import { APPSYCH } from "./exams/appsych";
// EXAMS_V2: after ACT
export const EXAMS_V2: ExamV2Config[] = [GED, PRAXIS, SAT, PSAT, ACT, APPSYCH, GRE, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the psat bank import:
```ts
import "@/lib/v2/banks/appsych";      // classQuestions.ts
import '@/lib/v2/banks/appsych';      // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: domain labels live in `APPSYCH.domainLabels` (keys `appsychBio`, `appsychCognition`, `appsychDevLearning`,
`appsychSocial`, `appsychHealth`, `appsychResearch`).

## app/globals.css
HUE CHECK: the brief's `274 35% 42%` clashes with CPC (`280 40% 43%`: hue 6 apart, saturation 5, lightness 1).
Darkening instead clashes with aurcg (`269 40% 30%`). I used `274 35% 52%` in `lib/v2/exams/appsych.ts`
(lightness 9 above CPC, 22 above aurcg, saturation 20+ from 280 55% 44%, 271 70% 50%, 276 60% 32%, 268 80% 37%);
white text on it is about 5:1. If you prefer a darker brand, `274 20% 40%` also clears every neighbour.
Run `tools/gen_dark_brand_css.py` after.
```css
  /* AP Psychology theme: soft violet (v2 exam; matches lib/v2/exams/appsych.ts theme) */
  [data-theme="appsych"] {
    --brand: 274 35% 52%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 274 40% 96%;
    --brand-hover: 274 35% 46%;
    --brand-dark: 274 35% 38%;
    --brand-darker: 274 35% 20%;
    --brand-muted: 274 25% 74%;
    --brand-border: 274 30% 82%;
    --brand-border-light: 274 30% 91%;
    --brand-gradient-to: 286 45% 96%;
  }
```

## lib/shareCardCopy.ts
```ts
  appsych: { title: "AP Psychology Practice Test", description: "Two full 75-question multiple-choice sections for the redesigned AP Psychology exam, plus a drill for every unit." },
```

## lib/region.ts
Nothing: US is the default in `regionOfTest()`. (If the wave lists US exams explicitly, `appsych: "US"`.)

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  appsych: "Two full AP Psychology multiple-choice sections for the redesigned exam: 75 questions with four choices in 90 minutes, all five units plus research methods and data, with study summaries and tables that questions share.",
// EXAM_ORG
  appsych: "College Board · AP Psychology, 2024 course framework",
// SEARCH_ALIASES
  appsych: "ap psychology ap psych advanced placement psychology college board ap exam psychology mcq multiple choice ap psych units biological bases cognition development learning social psychology personality mental physical health research methods aaq ebq high school",
// RELATED_OVERRIDES
  appsych: ["sat", "act", "psat"],
```
Hub group: "GED, college, military & nursing school entrance", after `act`:
```ts
  { title: "GED, college, military & nursing school entrance", ids: ["ged", "praxis", "sat", "psat", "act", "appsych", "accuplacer", "asvab", "teas", "hesi"] },
```
(Batch 2 adds AP US History and AP Biology; an "AP exams" hub group with all three would be the better home then.)

## lib/examFacts.ts
```ts
  appsych: {
    answer:
      "The AP Psychology Exam is a fully digital, 2 hour 40 minute exam from the College Board, redesigned for 2024-25. Section I has 75 multiple-choice questions with four choices in 90 minutes (66.7% of the score); Section II has 2 free-response questions in 70 minutes (33.3%): an Article Analysis Question and an Evidence-Based Question. Each of the five units is 15% to 25% of the multiple-choice section. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "75 questions, 90 minutes, 66.7% of score" },
      { label: "Free response", value: "2 questions, 70 minutes, 33.3% of score" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Units", value: "5, each 15% to 25% of the multiple choice" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
      { label: "Given by", value: "College Board, digital in the Bluebook app" },
    ],
    basedOn: "the College Board AP Psychology exam page and course overview",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-psychology/exam" },
    tigertest:
      "Tigertest has two full 75-question AP Psychology multiple-choice sections and six drills, one per unit plus research methods and data, all free with no account required. The free-response section is not included.",
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, near `psat`:
```ts
  appsych: "AP Psychology",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"appsych"` after `"psat"` (an AP class teacher sets it).

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the PSAT bullet in the v2 section:
```md
- **AP Psychology** (`/ap-psychology`, landing `/ap-psychology-practice-test`, `[data-theme="appsych"]` soft violet, region US, hub group "GED, college, military & nursing school entrance"): the College Board exam on the 2024 redesigned course framework, multiple-choice section only (Section I: 75 questions with four choices in 90 minutes, 66.7% of the score; the two free-response questions, AAQ and EBQ, are not modelled and the landing says so). One section `mcq`, one 75-item module at the real pace, two tests with Test 2 held out, 6 drills: one per unit (`appsychBio`, `appsychCognition`, `appsychDevLearning`, `appsychSocial`, `appsychHealth`, each 11 per test, 15 to 25% on the real exam) plus `appsychResearch` (20 per test, science practices 2 and 3, set in all five units, placed four after each unit, with three shared-stimulus sets of three per test: study summaries and data tables). 8 dashboard steps, free, no Basics. Percent score; `scoreNote` says the College Board converts a composite to 1 to 5 each year with no fixed cut. Bank `data/v2/appsych/questions.json` (200 original items, 7 stimuli, ids `APPSYCH-T<n>-NNN`, `APPSYCH-D-NNN`) built by `python3 -I tools/next100/appsych/build.py` from one Python source per domain (keys authored first, shuffled by a stem seed; all-number options sorted and locked). Sources in `tools/next100/appsych/sources.md`.
```

## Review note (1 November 2026)
The integrated theme is `271 35% 42%` in both `lib/v2/exams/appsych.ts` and `app/globals.css` (the integrator's choice);
the `274 35% 52%` block above is superseded. The reviewer left the theme as integrated.
