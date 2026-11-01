# SSC MTS and Havaldar (`sscmts`) wiring for the integrator

v2 exam, template `ssccgl`. Files already written (unique to this exam):
`tools/next100/sscmts/*` (8 domain sources as Python data, `stimuli.json` with 2 cloze and 2 reading passages,
`build.py`, `sources.md`), `data/v2/sscmts/questions.json` (object form `{ stimuli, questions }`),
`lib/v2/exams/sscmts.ts` (export `SSCMTS`), `lib/v2/banks/sscmts.ts` (`withStimuli`), `app/ssc-mts/*` (layout, root
redirect, dashboard, practice/[n], stats, test/[id], test/[id]/results; copied from `app/ssc-cgl/`),
`app/ssc-mts-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/sscmts/build.py`, then
`python3 -I tools/validate_v2_bank.py sscmts '{"1": {"s1": {"1": 40}, "s2": {"1": 50}}, "2": {"s1": {"1": 40}, "s2": {"1": 50}}}'`
(passes: 212 questions, 4 stimuli, 0 problems; key strictly longest 13%). Error-spotting and sentence-improvement items get `lockedOrder` from the build. The validator rewrites
`lib/v2/bankSizes.ts`; it was run against a copy, so that file is untouched. Do not add `sscmts` to
`tools/build_v2_bank.py` PLANS: it has its own build.

Shape: two sections that are the real two sessions, `s1` (40 items, 45 min: `mtsArith` 10, `mtsNumber` 10,
`mtsVerbal` 10, `mtsLogical` 10) and `s2` (50 items, 45 min: `mtsHistory` 13, `mtsScience` 12, `mtsGrammar` 13 incl.
a 4-item cloze, `mtsVocab` 12 incl. a 4-item reading passage), `breakSeconds: 0`; two tests, Test 2 held out;
8 drills (4 drill-only items each), so the dashboard is 10 steps.

Screenshots still needed: `public/landing/sscmts-mobile.png`, `sscmts-desktop.png` (+ `-dark`), e.g.
`sscmts:ssc-mts:v2:arithmetic`.

## lib/v2/bankSizes.ts
```ts
  sscmts: 212,
```

## lib/v2/registry.ts
```ts
import { SSCMTS } from "./exams/sscmts";
// EXAMS_V2: add SSCMTS after SSCCGL
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/sscmts";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `SSCMTS.domainLabels` (keys `mtsArith`, `mtsNumber`, `mtsVerbal`, `mtsLogical`,
`mtsHistory`, `mtsScience`, `mtsGrammar`, `mtsVocab`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). Hue from the brief, 26 70% 38% (burnt orange);
matches `SSCMTS.theme`. Check against the nearest existing hues (cacarp 24, auforklift 21, ctet burnt sienna).
```css
  /* SSC MTS theme: burnt orange (v2 exam; matches lib/v2/exams/sscmts.ts theme) */
  [data-theme="sscmts"] {
    --brand: 26 70% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 26 70% 96%;
    --brand-hover: 26 70% 33%;
    --brand-dark: 26 70% 30%;
    --brand-darker: 26 65% 16%;
    --brand-muted: 26 35% 72%;
    --brand-border: 26 40% 80%;
    --brand-border-light: 26 40% 90%;
    --brand-gradient-to: 36 70% 96%;
  }
```

## lib/shareCards.ts
```ts
  "sscmts": {
    "color": "hsl(26, 70%, 38%)",
    "tint": "hsl(26, 70%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  sscmts: { title: "SSC MTS Mock Test", description: "Practice maths, reasoning, general awareness and English in full 90-question mock tests with two 45-minute sessions." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  sscmts: "IN",
```
Add `"sscmts"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  sscmts: "Mock tests for the SSC MTS and Havaldar exam: 90 questions in two 45-minute sessions, maths and reasoning, then general awareness and English, with Session 2 negative marking explained.",
// EXAM_ORG
  sscmts: "Staff Selection Commission · MTS and Havaldar",
// SEARCH_ALIASES
  sscmts: "ssc mts mock test ssc mts havaldar multi tasking staff non technical havaldar cbic cbn ssc mts practice set session 1 session 2 sarkari exam 10th pass government job exam india maths reasoning gk english",
```
Hub group: add `"sscmts"` to "India government job exams" right after `"ssccgl"`.

## lib/examFacts.ts
```ts
  sscmts: {
    answer:
      "The SSC MTS and Havaldar exam is a computer-based test of 90 multiple-choice questions worth 270 marks, set by the Staff Selection Commission and taken in two sessions of 45 minutes each. Session 1 has 20 Numerical and Mathematical Ability and 20 Reasoning questions with no negative marking. Session 2 has 25 General Awareness and 25 English questions, and each wrong answer there loses 1 mark. Every question carries 3 marks and both sessions are compulsory; Havaldar candidates also take a walking test and physical measurements.",
    rows: [
      { label: "Questions", value: "90 (40 in Session 1, 50 in Session 2)" },
      { label: "Time", value: "Two sessions of 45 minutes" },
      { label: "Marks", value: "3 per right answer, 270 in all" },
      { label: "Negative marking", value: "None in Session 1; 1 mark per wrong answer in Session 2" },
      { label: "Session 1", value: "Maths 20, Reasoning 20" },
      { label: "Session 2", value: "General Awareness 25, English 25" },
      { label: "Qualifying marks", value: "30% UR, 25% OBC/EWS, 20% others, in each session" },
      { label: "Given by", value: "Staff Selection Commission, computer-based" },
    ],
    basedOn: "the SSC Multi-Tasking (Non-Technical) Staff and Havaldar Examination, 2025 notice (26 June 2025), paragraphs 14 and 18",
    source: { name: "Staff Selection Commission", url: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_mts_2025.pdf" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES` (the landing already calls `classFaqJsonLd("sscmts")` and renders `<ExamClassFaq examId="sscmts" />`):
```ts
  sscmts: "an SSC MTS coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"sscmts"`.

## lib/tigerAssets.ts, lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section after SSC CGL:
```md
- **SSC MTS** (`/ssc-mts`, landing `/ssc-mts-practice-test`, `[data-theme="sscmts"]` burnt orange, region IN, hub group "India government job exams"): Staff Selection Commission Multi-Tasking (Non-Technical) Staff and Havaldar exam (2025 notice), 90 questions worth 270 marks in two compulsory 45-minute sessions: Session 1 maths 20 and reasoning 20 with no negative marking, Session 2 general awareness 25 and English 25 with 1 mark off per wrong answer (minimum qualifying 30/25/20 percent by category in each session, Session 2 evaluated only for those who qualify in Session 1, merit from Session 2 alone, all per the notice). Two sections `s1` and `s2` that are the sessions, two 90-item mock tests, Test 2 held out, 8 drills, two per part (`mtsArith`, `mtsNumber`, `mtsVerbal`, `mtsLogical`, `mtsHistory`, `mtsScience`, `mtsGrammar`, `mtsVocab`; 10/10 10/10 13/12 13/12 per test, 4 drill-only each), so the dashboard is 10 steps. Bank `data/v2/sscmts/questions.json` (212 original single-answer items, prefix `SSCMTS-`, object form with cloze stimuli `SSCMTS-CL1/2` and reading stimuli `SSCMTS-RC1/2`) built by `tools/next100/sscmts/build.py`. MTS level (10th pass); reasoning text only; GA static; rupees and Indian names. Havaldar PET/PST not modelled. Percent score; negative marking explained in `scoreNote` and on the landing, not applied. Sources in `tools/next100/sscmts/sources.md`.
```
