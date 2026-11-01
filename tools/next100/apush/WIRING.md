# AP U.S. History (`apush`) wiring for the integrator

v2 exam, built on the AP Psychology template (one section, one module, percent score, shared stimuli).
Files already written (unique to this exam):
`tools/next100/apush/*` (`build.py`; sources as Python data, one file per domain: `p12.py`, `p3.py`, `p4.py`,
`p5.py`, `p6.py`, `p7.py`, `p89.py`; `sources.md`),
`data/v2/apush/questions.json` (object form `{ stimuli, questions }`, 201 questions, 51 stimuli),
`lib/v2/exams/apush.ts` (export `APUSH`), `lib/v2/banks/apush.ts` (`withStimuli`),
`app/ap-us-history/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results, stats; copied from `app/ap-psychology/`),
`app/ap-us-history-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/apush/build.py`, then (from a /tmp copy, since the validator rewrites bankSizes)
```
python3 -I tools/validate_v2_bank.py apush '{"1": {"mcq": {"1": 55}}, "2": {"mcq": {"1": 55}}}'
```
(passes: 201 questions, 51 stimuli, 0 problems). Do not add `apush` to `tools/build_v2_bank.py` PLANS.

Shape: one section `mcq`, one 55-item module in 55 minutes per test (the real Part A at full length and pace),
in chronological order; two tests with Test 2 held out; 7 drills (Periods 1-2, 3, 4, 5, 6, 7, 8-9), so
7 + 2 = 9 dashboard steps. All items `single` with four options; every test item is in a stimulus set of 3 or 4
(original practice texts, historians' interpretations, one paired-historians set and one table per test).
Key strictly longest: 10/201 = 5% (key strictly shortest about 24%, near chance). Not Premium, no Basics.
Screenshots still needed: `public/landing/apush-mobile.png`, `apush-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  apush: 201,
```

## lib/v2/registry.ts
```ts
import { APUSH } from "./exams/apush";
// EXAMS_V2: after APPSYCH (and APBIO if it lands first)
export const EXAMS_V2: ExamV2Config[] = [GED, PRAXIS, SAT, PSAT, ACT, APPSYCH, APUSH, /* APBIO, */ GRE, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the appsych bank import:
```ts
import "@/lib/v2/banks/apush";      // classQuestions.ts
import '@/lib/v2/banks/apush';      // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: domain labels live in `APUSH.domainLabels` (keys `apushP12`, `apushP3`, `apushP4`, `apushP5`, `apushP6`,
`apushP7`, `apushP89`).

## app/globals.css
HUE CHECK: the brief's `0 45% 38%` clashes with aufirstaid (`3 45% 44%`: hue 3, saturation 0, lightness 6) and
rrbgroupd (`6 45% 36%`: hue 6, saturation 0, lightness 2). I used `0 25% 38%` in `lib/v2/exams/apush.ts`, a muted
oxblood: saturation 20 from aufirstaid and rrbgroupd, 15 from aursa (`352 40% 30%`), 20+ from casfa (2 78%),
`4 60% 31%`, `0 100% 32%`, `8 72%`, `10 65%` and the 350 to 356 reds. White text on it is about 7:1.
Run `tools/gen_dark_brand_css.py` after.
```css
  /* AP U.S. History theme: muted oxblood (v2 exam; matches lib/v2/exams/apush.ts theme) */
  [data-theme="apush"] {
    --brand: 0 25% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 0 25% 96%;
    --brand-hover: 0 25% 33%;
    --brand-dark: 0 25% 30%;
    --brand-darker: 0 25% 18%;
    --brand-muted: 0 15% 72%;
    --brand-border: 0 20% 82%;
    --brand-border-light: 0 20% 91%;
    --brand-gradient-to: 12 30% 96%;
  }
```

## lib/shareCardCopy.ts
```ts
  apush: { title: "AP US History Practice Test", description: "Two full 55-question APUSH multiple-choice sections in source-based sets, plus a drill for every period." },
```

## lib/region.ts
Nothing: US is the default in `regionOfTest()`. (If the wave lists US exams explicitly, `apush: "US"`.)

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  apush: "Two full AP U.S. History multiple-choice sections: 55 questions with four choices in 55 minutes, in sets of three or four that share a source, weighted across all nine periods from 1491 to the present.",
// EXAM_ORG
  apush: "College Board · AP U.S. History, CED effective fall 2026",
// SEARCH_ALIASES
  apush: "ap us history apush ap united states history american history advanced placement college board ap exam history mcq multiple choice stimulus sources periods colonial revolution constitution civil war reconstruction gilded age progressive era new deal cold war civil rights dbq leq saq high school",
// RELATED_OVERRIDES
  apush: ["appsych", "apbio", "sat", "act"],
```
Hub group: a new "AP exams" group (per the brief, matching `tools/next100/apbio/WIRING.md`), with appsych taken out
of "GED, college, military & nursing school entrance":
```ts
  { title: "GED, college, military & nursing school entrance", ids: ["ged", "praxis", "sat", "psat", "act", "accuplacer", "asvab", "teas", "hesi"] },
  { title: "AP exams", ids: ["appsych", "apush", "apbio"] },
```

## lib/examFacts.ts
```ts
  apush: {
    answer:
      "The AP U.S. History Exam is a fully digital, 3 hour 15 minute exam from the College Board. Section I has 55 multiple-choice questions in 55 minutes (40% of the score), usually in sets of three or four that share a primary or secondary source, plus 3 short-answer questions in 40 minutes (20%). Section II has a document-based question in 60 minutes (25%) and a long essay in 40 minutes (15%). The course runs from 1491 to the present in nine periods; Periods 3 to 8 are each 10% to 17% of the multiple-choice section. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "55 questions, 55 minutes, 40% of score" },
      { label: "Short answer", value: "3 questions, 40 minutes, 20%" },
      { label: "Essays", value: "DBQ 60 minutes (25%), long essay 40 minutes (15%)" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Periods", value: "9, from 1491 to the present" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
      { label: "Given by", value: "College Board, digital in the Bluebook app" },
    ],
    basedOn: "the College Board AP U.S. History Course and Exam Description (effective fall 2026) and AP Central exam page",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-united-states-history/exam" },
    tigertest:
      "Tigertest has two full 55-question AP U.S. History multiple-choice sections and seven drills by period, all free with no account required. The short-answer questions and essays are not included.",
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, near `appsych`:
```ts
  apush: "AP U.S. History",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"apush"` after `"appsych"` (an AP class teacher sets it).

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger). If AP Psychology gets one, `BORROWED_SETS` could lend it.

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the AP Psychology bullet in the v2 section (and move AP Psychology's hub group to "AP exams"):
```md
- **AP U.S. History** (`/ap-us-history`, landing `/ap-us-history-practice-test`, `[data-theme="apush"]` muted oxblood, region US, hub group "AP exams"): the College Board exam on the Course and Exam Description effective fall 2026, multiple-choice section only (Section I Part A: 55 questions with four choices in 55 minutes, 40% of the score, in sets of three or four on shared sources; the short-answer questions, DBQ and long essay are not modelled, and the College Board is updating the short-answer and long essay questions for May 2027). One section `mcq`, one 55-item module at the real pace in chronological order, two tests with Test 2 held out, 7 drills (`apushP12`, `apushP3`, `apushP4`, `apushP5`, `apushP6`, `apushP7`, `apushP89`; 7/7/8/8/7/8/10 per test, inside the CED period weights 4-6/6-8/10-17 x6/4-6), 9 dashboard steps, free, no Basics. Every test item is in a stimulus set of 3 or 4 (51 original sources: practice texts in the style of their time, whose labels describe a kind of writer, not a real person; historians' interpretations, one paired set per test; one table per test). Percent score; `scoreNote` says the College Board converts a composite to 1 to 5 each year. Bank `data/v2/apush/questions.json` (201 items, ids `APUSH-T<n>-NNN`, `APUSH-D-NNN`) built by `python3 -I tools/next100/apush/build.py` from one Python source per domain. Sources in `tools/next100/apush/sources.md`.
```
