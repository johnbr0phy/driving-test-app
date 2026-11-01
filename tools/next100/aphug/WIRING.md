# AP Human Geography (`aphug`) wiring for the integrator

v2 exam, built on the AP World History: Modern template (one section, one module, percent score, shared stimuli).
Files already written (unique to this exam):
`tools/next100/aphug/*` (`build.py`; sources as Python data, one file per unit: `u1.py` to `u7.py`; `sources.md`),
`data/v2/aphug/questions.json` (object form `{ stimuli, questions }`, 204 questions, 21 stimuli),
`lib/v2/exams/aphug.ts` (export `APHUG`), `lib/v2/banks/aphug.ts` (`withStimuli`),
`app/ap-human-geography/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results, stats; copied from `app/ap-world-history/`),
`app/ap-human-geography-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/aphug/build.py`, then (from a /tmp copy, since the validator rewrites bankSizes)
```
python3 -I tools/validate_v2_bank.py aphug '{"1": {"mcq": {"1": 60}}, "2": {"mcq": {"1": 60}}}'
```
(passes: 204 questions, 21 stimuli, 0 problems). Do not add `aphug` to `tools/build_v2_bank.py` PLANS.

Shape: one section `mcq`, one 60-item module in 60 minutes per test (the real Section I at full length and pace),
in unit order; two tests with Test 2 held out; 7 drills (one per unit), so 7 + 2 = 9 dashboard steps. All items
`single` with five options (A to E, like the CED samples). Per test 6 Unit 1 items and 9 from each of Units 2 to 7;
one stimulus set of 3 per unit, so 21 of 60 items (35%) use a stimulus (hypothetical tables; maps, landscapes and a
population pyramid described in words). Key strictly longest: 28/195 = 14% (locked number items excluded); keys
spread A 38, B 38, C 42, D 44, E 42; 9 all-number items sorted and locked, key in an end slot in 4 (44%).
Not Premium, no Basics. Screenshots still needed: `public/landing/aphug-mobile.png`, `aphug-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  aphug: 204,
```

## lib/v2/registry.ts
```ts
import { APHUG } from "./exams/aphug";
// EXAMS_V2: after APWORLD
export const EXAMS_V2: ExamV2Config[] = [/* ... */ APUSH, APWORLD, APHUG, APLANG, APBIO, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the apworld bank import:
```ts
import "@/lib/v2/banks/aphug";    // classQuestions.ts
import '@/lib/v2/banks/aphug';    // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: domain labels live in `APHUG.domainLabels` (keys `aphugU1` to `aphugU7`).

## app/globals.css
HUE CHECK: the brief's `55 35% 32%` is 7 degrees from praxis `48 40% 28%` with saturation only 5 and lightness 4
apart, so it fails the rule. I used `57 25% 34%` in `lib/v2/exams/aphug.ts`, a muted olive ochre: 9 degrees from
praxis (outside the 8-degree window), 6 from jnvst `51 65% 31%` (saturation 40 apart), 3 from `60 70% 26%` and 7 from
`50 80% 29.5%` (saturation 45+ apart), 11 from `46 50% 34%`. White text on it is about 7:1. The integrator settles
clashes with the rest of batch 4 (none of the batch's suggested hues is within 8 degrees of 57). Run
`tools/gen_dark_brand_css.py` after.
```css
  /* AP Human Geography theme: muted olive ochre (v2 exam; matches lib/v2/exams/aphug.ts theme) */
  [data-theme="aphug"] {
    --brand: 57 25% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 57 25% 96%;
    --brand-hover: 57 25% 29%;
    --brand-dark: 57 25% 26%;
    --brand-darker: 57 25% 16%;
    --brand-muted: 57 15% 72%;
    --brand-border: 57 20% 82%;
    --brand-border-light: 57 20% 91%;
    --brand-gradient-to: 70 30% 96%;
  }
```

## lib/shareCardCopy.ts
```ts
  aphug: { title: "AP Human Geography Practice Test", description: "Two full 60-question AP Human Geography multiple-choice sections with data and map stimulus sets, plus a drill for every unit." },
```

## lib/region.ts
`TEST_REGIONS`: nothing (US is the default in `regionOfTest()`). `NON_DRIVING_TESTS`: add `"aphug"` after `"apworld"`:
```ts
  "apworld", "aphug", "aplang",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  aphug: "Two full AP Human Geography multiple-choice sections: 60 questions with five choices in 60 minutes, about a third in sets on a data table, map or landscape, weighted across all seven units.",
// EXAM_ORG
  aphug: "College Board · AP Human Geography, course framework effective fall 2020",
// SEARCH_ALIASES
  aphug: "ap human geography ap human geo aphg aphug human geography advanced placement college board ap exam geography mcq multiple choice units thinking geographically maps projections population migration demographic transition model culture diffusion language religion political geography boundaries gerrymandering agriculture von thunen green revolution cities urban models burgess hoyt rank-size development rostow wallerstein weber frq high school",
// RELATED_OVERRIDES
  aphug: ["apworld", "apush", "appsych", "apbio"],
```
Hub group "AP exams": add `aphug` after `apworld`:
```ts
  { title: "AP exams", ids: ["appsych", "apush", "apworld", "aphug", "aplang", "apbio"] },
```

## lib/examFacts.ts
```ts
  aphug: {
    answer:
      "The AP Human Geography Exam is a fully digital, 2 hour 15 minute exam from the College Board. Section I has 60 multiple-choice questions in 60 minutes, 50% of the score; some stand alone and some come in sets, and about 30% to 40% use a map, table, chart, graph, image, infographic or landscape. Section II has 3 free-response questions in 75 minutes, the other 50%. The course has seven units: Unit 1, Thinking Geographically, is 8% to 10% of the multiple-choice section and Units 2 to 7 are 12% to 17% each. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "60 questions, 60 minutes, 50% of score" },
      { label: "Free response", value: "3 questions, 75 minutes, 50% of score" },
      { label: "Answer choices", value: "5 per multiple-choice question" },
      { label: "Stimulus questions", value: "About 30% to 40% of the multiple choice" },
      { label: "Units", value: "7: Unit 1 8-10%, Units 2 to 7 12-17% each" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
      { label: "Given by", value: "College Board, digital in the Bluebook app" },
    ],
    basedOn: "the College Board AP Human Geography Course and Exam Description (effective fall 2020, clarifications as of June 2026) and AP Central exam page",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-human-geography/exam" },
    tigertest:
      "Tigertest has two full 60-question AP Human Geography multiple-choice sections and seven drills, one per unit, all free with no account required. The free-response questions are not included, and maps and images are described in words.",
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, near `apworld`:
```ts
  aphug: "AP Human Geography",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"aphug"` after `"apworld"` (an AP class teacher sets it).

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger), the same as apworld.

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the AP World History: Modern bullet in the v2 section:
```md
- **AP Human Geography** (`/ap-human-geography`, landing `/ap-human-geography-practice-test`, `[data-theme="aphug"]` muted olive ochre, region US, hub group "AP exams"): the College Board exam on the Course and Exam Description effective fall 2020 (clarifications as of June 2026 change no exam content), multiple-choice section only (Section I: 60 questions with five choices in 60 minutes, 50% of the score, individual and set-based, about 30% to 40% on a stimulus; the three free-response questions are not modelled). One section `mcq`, one 60-item module at the real pace in unit order, two tests with Test 2 held out, 7 drills, one per unit (`aphugU1` to `aphugU7`; 6/9/9/9/9/9/9 per test, inside the CED weights 8-10% and 12-17%), 9 dashboard steps, free, no Basics. One stimulus set of 3 per unit per test (21 of 60, 35%): hypothetical data tables, and maps, landscapes and a population pyramid described in words, no images; all-number options sorted and locked. Percent score; `scoreNote` says the College Board converts a composite to 1 to 5 each year. Bank `data/v2/aphug/questions.json` (204 items, 21 stimuli, ids `APHUG-T<n>-NNN`, `APHUG-D-NNN`) built by `python3 -I tools/next100/aphug/build.py` from one Python source per unit. Sources in `tools/next100/aphug/sources.md`.
```
