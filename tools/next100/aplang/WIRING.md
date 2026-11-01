# AP English Language and Composition (`aplang`) wiring for the integrator

v2 exam, built on the AP U.S. History template (one section, one module, percent score, shared stimuli).
Files already written (unique to this exam):
`tools/next100/aplang/*` (`build.py`; sources as Python data, one file per group of passage sets: `t1.py`,
`t2.py`, `drill_reading.py`, `drill_writing.py`, since every set mixes the eight skill-category domains;
`sources.md`),
`data/v2/aplang/questions.json` (object form `{ stimuli, questions }`, 202 questions, 22 stimuli),
`lib/v2/exams/aplang.ts` (export `APLANG`), `lib/v2/banks/aplang.ts` (`withStimuli`),
`app/ap-english-language/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results, stats;
copied from `app/ap-us-history/`),
`app/ap-english-language-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/aplang/build.py`, then (from a /tmp copy, since the validator rewrites bankSizes)
```
python3 -I tools/validate_v2_bank.py aplang '{"1": {"mcq": {"1": 45}}, "2": {"mcq": {"1": 45}}}'
```
(passes: 202 questions, 22 stimuli, 0 problems). Do not add `aplang` to `tools/build_v2_bank.py` PLANS.

Shape: one section `mcq`, one 45-item module in 60 minutes per test (the real Section I at full length and pace),
in the CED's five sets: reading 12 and 12 on nonfiction passages, writing 8, 8 and 5 on student drafts with
numbered sentences. Two tests with Test 2 held out; 8 drills, one per skill category (reading and writing for
rhetorical situation, claims and evidence, reasoning and organization, style), so 8 + 2 = 10 dashboard steps.
All items `single` with four options. Revision items keep "(as it is now)" first and locked; Keep/Delete and
Yes/No sets and "After sentence N" placement options are locked in natural order (45 locked items).
Key strictly longest: 42/202 = 21%; key letters A 51, B 51, C 50, D 50. Not Premium, no Basics.
Screenshots still needed: `public/landing/aplang-mobile.png`, `aplang-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  aplang: 202,
```

## lib/v2/registry.ts
```ts
import { APLANG } from "./exams/aplang";
// EXAMS_V2: with the other AP exams, after APUSH (and APWORLD if it lands first)
export const EXAMS_V2: ExamV2Config[] = [/* ... */ APPSYCH, APUSH, /* APWORLD, */ APLANG, APBIO, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the apush bank import:
```ts
import "@/lib/v2/banks/aplang";      // classQuestions.ts
import '@/lib/v2/banks/aplang';      // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: domain labels live in `APLANG.domainLabels` (keys `aplangRhetRead`, `aplangClaimsRead`,
`aplangReasonRead`, `aplangStyleRead`, `aplangRhetWrite`, `aplangClaimsWrite`, `aplangReasonWrite`,
`aplangStyleWrite`).

## app/globals.css
HUE CHECK: the brief's `200 25% 34%` clashes with sscchsl (`196 30% 34%`: hue 4, saturation 5, lightness 0) and
caauto (`205 22% 34%`: hue 5, saturation 3, lightness 0); the 190 to 212 band is full at low saturation. I used
`222 18% 34%` in `lib/v2/exams/aplang.ts`, a slate ink blue: hue 0 from security (`222 35% 36%`, saturation 17),
8 from rpfconst's suggested `230 35% 34%` (saturation 17), 17+ degrees from caauto. White text on it is about 8:1.
Run `tools/gen_dark_brand_css.py` after.
```css
  /* AP English Language theme: slate ink blue (v2 exam; matches lib/v2/exams/aplang.ts theme) */
  [data-theme="aplang"] {
    --brand: 222 18% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 222 18% 96%;
    --brand-hover: 222 18% 29%;
    --brand-dark: 222 18% 26%;
    --brand-darker: 222 18% 16%;
    --brand-muted: 222 12% 72%;
    --brand-border: 222 15% 82%;
    --brand-border-light: 222 15% 91%;
    --brand-gradient-to: 210 20% 96%;
  }
```

## lib/shareCardCopy.ts
```ts
  aplang: { title: "AP English Language Practice Test", description: "Two full 45-question AP Lang multiple-choice sections on original passages and drafts, plus a drill for every skill." },
```

## lib/region.ts
Nothing: US is the default in `regionOfTest()`. (If the wave lists US exams explicitly, `aplang: "US"`.)

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  aplang: "Two full AP English Language and Composition multiple-choice sections: 45 questions with four choices in 60 minutes, two reading sets on nonfiction passages and three writing sets on student drafts, weighted across all eight skill categories.",
// EXAM_ORG
  aplang: "College Board · AP English Language and Composition, CED effective fall 2024",
// SEARCH_ALIASES
  aplang: "ap english language ap lang ap english language and composition ap english comp advanced placement college board ap exam english mcq multiple choice rhetoric rhetorical analysis rhetorical situation claims evidence reasoning style revision drafts nonfiction passages synthesis argument essay high school",
// RELATED_OVERRIDES
  aplang: ["apush", "appsych", "sat", "act"],
```
Hub group "AP exams": add `aplang` (after `apworld` if that lands, else after `apush`):
```ts
  { title: "AP exams", ids: ["appsych", "apush", "apworld", "aplang", "apbio"] },
```

## lib/examFacts.ts
```ts
  aplang: {
    answer:
      "The AP English Language and Composition Exam is a fully digital, 3 hour 15 minute exam from the College Board. Section I has 45 multiple-choice questions in 60 minutes (45% of the score): 23 to 25 reading questions on nonfiction passages and 20 to 22 writing questions that ask how a draft could be revised, in five sets. Section II has three essays, synthesis, rhetorical analysis and argument, in 2 hours 15 minutes including a 15-minute reading period (55%). Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "45 questions, 60 minutes, 45% of score" },
      { label: "Question types", value: "23-25 reading, 20-22 writing (revision)" },
      { label: "Essays", value: "3 (synthesis, rhetorical analysis, argument), 2 hr 15 min, 55%" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Skill categories", value: "Rhetorical situation, claims and evidence, reasoning and organization, style" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
      { label: "Given by", value: "College Board, digital in the Bluebook app" },
    ],
    basedOn: "the College Board AP English Language and Composition Course and Exam Description (effective fall 2024) and AP Central exam page",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-english-language-and-composition/exam" },
    tigertest:
      "Tigertest has two full 45-question AP English Language multiple-choice sections and eight drills by skill category, all free with no account required. The essays are not included.",
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, near `apush`:
```ts
  aplang: "AP English Language and Composition",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"aplang"` after `"apush"` (an AP English teacher sets it).

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the AP U.S. History bullet in the v2 section:
```md
- **AP English Language** (`/ap-english-language`, landing `/ap-english-language-practice-test`, `[data-theme="aplang"]` slate ink blue, region US, hub group "AP exams"): the College Board exam on the Course and Exam Description effective fall 2024 (still current in Nov 2026), multiple-choice section only (Section I: 45 questions with four choices in 60 minutes, 45% of the score, 23 to 25 reading questions on nonfiction passages and 20 to 22 writing questions on drafts, in five sets; the three essays are not modelled). One section `mcq`, one 45-item module at the real pace in the CED set order (reading 12 + 12, writing 8 + 8 + 5), two tests with Test 2 held out, 8 drills, one per skill category (`aplangRhetRead`, `aplangClaimsRead`, `aplangReasonRead`, `aplangStyleRead`, `aplangRhetWrite`, `aplangClaimsWrite`, `aplangReasonWrite`, `aplangStyleWrite`; 5/7/6/6 and 5/6/5/5 per test, inside the CED weights), 10 dashboard steps, free, no Basics. 22 original stimuli (8 passages labelled by kind of writer, 14 student drafts with numbered sentences); revision items keep "(as it is now)" as choice A, locked, and Keep/Delete and placement options are locked in natural order. Percent score; `scoreNote` says the College Board converts a composite to 1 to 5 each year. Bank `data/v2/aplang/questions.json` (202 items, ids `APLANG-T<n>-NNN`, `APLANG-D-NNN`) built by `python3 -I tools/next100/aplang/build.py` from `t1.py`, `t2.py`, `drill_reading.py`, `drill_writing.py`. Sources in `tools/next100/aplang/sources.md`.
```
