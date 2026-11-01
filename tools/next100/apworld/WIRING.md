# AP World History: Modern (`apworld`) wiring for the integrator

v2 exam, built on the AP U.S. History template (one section, one module, percent score, shared stimuli).
Files already written (unique to this exam):
`tools/next100/apworld/*` (`build.py`; sources as Python data, one file per domain: `u12.py`, `u3.py`, `u4.py`,
`u5.py`, `u6.py`, `u789.py`; `sources.md`),
`data/v2/apworld/questions.json` (object form `{ stimuli, questions }`, 200 questions, 49 stimuli),
`lib/v2/exams/apworld.ts` (export `APWORLD`), `lib/v2/banks/apworld.ts` (`withStimuli`),
`app/ap-world-history/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results, stats; copied from `app/ap-us-history/`),
`app/ap-world-history-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/apworld/build.py`, then (from a /tmp copy, since the validator rewrites bankSizes)
```
python3 -I tools/validate_v2_bank.py apworld '{"1": {"mcq": {"1": 55}}, "2": {"mcq": {"1": 55}}}'
```
(passes: 200 questions, 49 stimuli, 0 problems). Do not add `apworld` to `tools/build_v2_bank.py` PLANS.

Shape: one section `mcq`, one 55-item module in 55 minutes per test (the real Part A at full length and pace),
in chronological order; two tests with Test 2 held out; 6 drills (Units 1-2, 3, 4, 5, 6, 7-9), so
6 + 2 = 8 dashboard steps. All items `single` with four options; every test item is in a stimulus set of 3 or 4
(original practice texts, historians' interpretations, one paired-historians set per test, tables).
Key strictly longest: 7/200 = 4% (strictly shortest 6%); keys spread A 54, B 47, C 48, D 51.
Not Premium, no Basics. Screenshots still needed: `public/landing/apworld-mobile.png`, `apworld-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  apworld: 200,
```

## lib/v2/registry.ts
```ts
import { APWORLD } from "./exams/apworld";
// EXAMS_V2: after APUSH
export const EXAMS_V2: ExamV2Config[] = [/* ... */ APPSYCH, APUSH, APWORLD, APBIO, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the apush bank import:
```ts
import "@/lib/v2/banks/apworld";    // classQuestions.ts
import '@/lib/v2/banks/apworld';    // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: domain labels live in `APWORLD.domainLabels` (keys `apworldU12`, `apworldU3`, `apworldU4`, `apworldU5`,
`apworldU6`, `apworldU789`).

## app/globals.css
HUE CHECK: the brief's `30 30% 36%` is within 8 degrees of `22 40% 43%` (hue 22) with saturation only 10 apart and
lightness 7 apart, so it fails the rule. I used `30 25% 36%` in `lib/v2/exams/apworld.ts`, a muted clay brown:
saturation 15 from `22 40% 43%`, 20 from `35 45% 36%` and from the batch's upscse `28 45% 34%`, 25+ from `24 50%`,
`26 70%`, `28 85%`, `28 90%`, `32 90%`, `35 62%`, `36 90%`, `37 62%`, `22 80%`. White text on it is about 7:1.
Run `tools/gen_dark_brand_css.py` after.
```css
  /* AP World History theme: muted clay brown (v2 exam; matches lib/v2/exams/apworld.ts theme) */
  [data-theme="apworld"] {
    --brand: 30 25% 36%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 30 25% 96%;
    --brand-hover: 30 25% 31%;
    --brand-dark: 30 25% 28%;
    --brand-darker: 30 25% 17%;
    --brand-muted: 30 15% 72%;
    --brand-border: 30 20% 82%;
    --brand-border-light: 30 20% 91%;
    --brand-gradient-to: 42 30% 96%;
  }
```

## lib/shareCardCopy.ts
```ts
  apworld: { title: "AP World History Practice Test", description: "Two full 55-question AP World History: Modern multiple-choice sections in source-based sets, plus a drill for every unit." },
```

## lib/region.ts
Nothing: US is the default in `regionOfTest()`. (If the wave lists US exams explicitly, `apworld: "US"`.)

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  apworld: "Two full AP World History: Modern multiple-choice sections: 55 questions with four choices in 55 minutes, in sets of three or four that share a source, weighted across all nine units from c. 1200 to the present.",
// EXAM_ORG
  apworld: "College Board · AP World History: Modern, CED effective fall 2026",
// SEARCH_ALIASES
  apworld: "ap world history ap world history modern ap world apwh world history advanced placement college board ap exam history mcq multiple choice stimulus sources units global tapestry networks of exchange land-based empires transoceanic interconnections revolutions industrialization imperialism global conflict cold war decolonization globalization dbq leq saq high school",
// RELATED_OVERRIDES
  apworld: ["apush", "appsych", "apbio", "sat"],
```
Hub group "AP exams": add `apworld` after `apush`:
```ts
  { title: "AP exams", ids: ["appsych", "apush", "apworld", "apbio" /* , "aplang" */] },
```

## lib/examFacts.ts
```ts
  apworld: {
    answer:
      "The AP World History: Modern Exam is a fully digital, 3 hour 15 minute exam from the College Board. Section I has 55 multiple-choice questions in 55 minutes (40% of the score), usually in sets of three or four that share a primary or secondary source, plus 3 short-answer questions in 40 minutes (20%). Section II has a document-based question in 60 minutes (25%) and a long essay in 40 minutes (15%). The course runs from c. 1200 to the present in nine units; Units 3 to 6 are each 12% to 15% of the multiple-choice section and the other five units 8% to 10% each. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "55 questions, 55 minutes, 40% of score" },
      { label: "Short answer", value: "3 questions, 40 minutes, 20%" },
      { label: "Essays", value: "DBQ 60 minutes (25%), long essay 40 minutes (15%)" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Units", value: "9, from c. 1200 to the present" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
      { label: "Given by", value: "College Board, digital in the Bluebook app" },
    ],
    basedOn: "the College Board AP World History: Modern Course and Exam Description (effective fall 2026) and AP Central exam page",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-world-history/exam" },
    tigertest:
      "Tigertest has two full 55-question AP World History: Modern multiple-choice sections and six drills by unit, all free with no account required. The short-answer questions and essays are not included.",
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, near `apush`:
```ts
  apworld: "AP World History: Modern",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"apworld"` after `"apush"` (an AP class teacher sets it).

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger), the same as apush.

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the AP U.S. History bullet in the v2 section:
```md
- **AP World History: Modern** (`/ap-world-history`, landing `/ap-world-history-practice-test`, `[data-theme="apworld"]` muted clay brown, region US, hub group "AP exams"): the College Board exam on the Course and Exam Description effective fall 2026, multiple-choice section only (Section I Part A: 55 questions with four choices in 55 minutes, 40% of the score, in sets of three or four on shared sources with at least one paired set; the short-answer questions, DBQ and long essay are not modelled, and the College Board is updating the short-answer and long essay questions for May 2027). One section `mcq`, one 55-item module at the real pace in chronological order, two tests with Test 2 held out, 6 drills (`apworldU12`, `apworldU3`, `apworldU4`, `apworldU5`, `apworldU6`, `apworldU789`; 10/8/7/8/7/15 per test, 5 per small unit and 7 or 8 per big unit, inside the CED unit weights 8-10% and 12-15%), 8 dashboard steps, free, no Basics. Every test item is in a stimulus set of 3 or 4 (49 original sources: practice texts in the style of their time, whose labels describe a kind of writer, not a real person; historians' interpretations, one paired set per test; tables, one on the Atlantic slave trade from SlaveVoyages estimates). Percent score; `scoreNote` says the College Board converts a composite to 1 to 5 each year. Bank `data/v2/apworld/questions.json` (200 items, ids `APWORLD-T<n>-NNN`, `APWORLD-D-NNN`) built by `python3 -I tools/next100/apworld/build.py` from one Python source per domain. Sources in `tools/next100/apworld/sources.md`.
```
