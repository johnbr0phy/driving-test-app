# SSC CHSL Tier 1 (`sscchsl`) wiring for the integrator

v2 exam, template `ssccgl`. Files already written (unique to this exam):
`tools/next100/sscchsl/*` (8 domain sources as Python data, `stimuli.json` with 2 cloze and 2 reading passages,
`build.py`, `sources.md`, this file), `data/v2/sscchsl/questions.json` (object form `{ stimuli, questions }`),
`lib/v2/exams/sscchsl.ts` (export `SSCCHSL`), `lib/v2/banks/sscchsl.ts` (`withStimuli`), `app/ssc-chsl/*` (layout,
root redirect, dashboard, practice/[n], stats, test/[id], test/[id]/results; copied from `app/ssc-cgl/`),
`app/ssc-chsl-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/sscchsl/build.py`, then
`python3 -I tools/validate_v2_bank.py sscchsl '{"1": {"eng": {"1": 25}, "gi": {"1": 25}, "qa": {"1": 25}, "ga": {"1": 25}}, "2": {"eng": {"1": 25}, "gi": {"1": 25}, "qa": {"1": 25}, "ga": {"1": 25}}}'`
(passes: 232 questions, 4 stimuli, 0 problems; key strictly longest 25/232 = 11%). Positional items (spot the
error, sentence improvement, conclusion and assumption sets) are built in their natural order with `lockedOrder: true`. The validator adds the
bankSizes line itself; I removed it again so the shared file is untouched, so add it as below. Do not add
`sscchsl` to `tools/build_v2_bank.py` PLANS: it has its own build.

Shape (differs from SSC CGL): the CHSL 2026 notice (para 13.8) gives Tier 1 a sectional timer of 15 minutes per
part, so there are four sections `eng`, `gi`, `qa`, `ga`, each one module of 25 in 15 minutes (like `ibpspo`),
`breakSeconds: 0`. Two mock tests, Test 2 held out, 8 drills (2 per section, 13/12 per test), 10 dashboard
steps. No Premium gating.

Screenshots still needed: `public/landing/sscchsl-mobile.png`, `sscchsl-desktop.png` (+ `-dark`), via
`sscchsl:ssc-chsl:v2:grammar`.

## lib/v2/bankSizes.ts
```ts
  sscchsl: 232,
```

## lib/v2/registry.ts
```ts
import { SSCCHSL } from "./exams/sscchsl";
// EXAMS_V2: add SSCCHSL right after SSCCGL
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the ssccgl bank import:
```ts
import "@/lib/v2/banks/sscchsl";
```
(`mcpV2Practice.ts` uses single quotes: `import '@/lib/v2/banks/sscchsl';`)

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `SSCCHSL.domainLabels` (keys `sscchslGrammar`, `sscchslVocab`, `sscchslVerbal`,
`sscchslLogic`, `sscchslArith`, `sscchslAdvanced`, `sscchslHistory`, `sscchslScience`).

## app/globals.css
Light block after the SSC CGL block (then run `tools/gen_dark_brand_css.py` for the `.dark` tint). Hue 196 from the
brief. Check: `crcst` is 195 85% 34.3% (fine, 30 points of saturation apart) but `realestate` is 200 45% 36%
(4 degrees, only 10 points of saturation and 2 of lightness apart, short of the house rule). If that matters,
move to 196 70% 30% and change `SSCCHSL.theme` in `lib/v2/exams/sscchsl.ts` to match.
```css
  /* SSC CHSL theme: teal blue (v2 exam; matches lib/v2/exams/sscchsl.ts theme) */
  [data-theme="sscchsl"] {
    --brand: 196 55% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 196 55% 96%;
    --brand-hover: 196 55% 29%;
    --brand-dark: 196 55% 26%;
    --brand-darker: 196 50% 17%;
    --brand-muted: 196 30% 70%;
    --brand-border: 196 35% 80%;
    --brand-border-light: 196 32% 89%;
    --brand-gradient-to: 206 55% 96%;
  }
```

## lib/shareCards.ts
```ts
  "sscchsl": {
    "color": "hsl(196, 55%, 34%)",
    "tint": "hsl(196, 55%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  sscchsl: { title: "SSC CHSL Tier 1 Mock Test", description: "Practice English, general intelligence, quantitative aptitude and general awareness in full 100-question mock tests timed 15 minutes per part." },
```

## lib/region.ts
```ts
// TEST_REGIONS (on the IN line)
  sscchsl: "IN",
```
Add `"sscchsl"` to `NON_DRIVING_TESTS` next to `"ssccgl"`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  sscchsl: "Mock tests for SSC CHSL Tier 1 (LDC, JSA and DEO posts): 100 questions in 60 minutes on English, general intelligence, quantitative aptitude and general awareness, timed 15 minutes per part, with negative marking explained.",
// EXAM_ORG
  sscchsl: "Staff Selection Commission · CHSL (10+2) Tier 1",
// SEARCH_ALIASES
  sscchsl: "ssc chsl mock test ssc chsl tier 1 chsl practice set combined higher secondary level 10+2 ldc jsa deo data entry operator lower division clerk staff selection commission ssc mock test free sarkari exam government job exam india reasoning gk maths english",
```
Hub group "India government job exams": add `"sscchsl"` after `"ssccgl"`:
```ts
  { title: "India government job exams", ids: ["ssccgl", "sscchsl", "rrbntpc", "ibpspo", "ctet"] },
```

## lib/examFacts.ts
```ts
  sscchsl: {
    answer:
      "SSC CHSL Tier 1 is a computer-based paper of 100 multiple-choice questions in 60 minutes, set by the Staff Selection Commission for LDC, JSA and Data Entry Operator posts. It has four parts of 25 questions: English Language, General Intelligence, Quantitative Aptitude and General Awareness, and the 2026 notice gives each part a sectional timer of 15 minutes. Each right answer earns 2 marks (200 in all) and each wrong answer loses 0.50 marks. Tier 1 is a qualifying stage: candidates who clear the category cut-off go on to Tier 2, which decides the final merit.",
    rows: [
      { label: "Questions", value: "100 (25 per part)" },
      { label: "Time", value: "60 minutes, 15 per part (sectional timer)" },
      { label: "Marks", value: "2 per right answer, 200 in all" },
      { label: "Negative marking", value: "0.50 per wrong answer" },
      { label: "Parts", value: "English, General Intelligence, Quantitative Aptitude, General Awareness" },
      { label: "Minimum qualifying marks", value: "UR 30%, OBC/EWS 25%, others 20% (2026 notice)" },
      { label: "Given by", value: "Staff Selection Commission, computer-based" },
    ],
    basedOn: "the SSC Combined Higher Secondary (10+2) Level Examination, 2026 notice and Tier 1 syllabus",
    source: { name: "Staff Selection Commission", url: "https://ssc.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  sscchsl: "an SSC coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"sscchsl"` (coaching institutes run SSC CHSL batches).

## lib/tigerAssets.ts, lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section after SSC CGL:
```md
- **SSC CHSL** (`/ssc-chsl`, landing `/ssc-chsl-practice-test`, `[data-theme="sscchsl"]` teal blue, region IN, hub group "India government job exams"): Staff Selection Commission Combined Higher Secondary (10+2) Level Tier 1 on the 2026 notice (7 September 2026; Tier 1 30 November to 31 December 2026): 100 questions in 60 minutes, four parts of 25 (English Language, General Intelligence, Quantitative Aptitude, General Awareness) with a sectional timer of 15 minutes each, 2 marks each and 0.50 off per wrong answer, minimum qualifying marks UR 30%, OBC/EWS 25%, others 20%. Four sections `eng`, `gi`, `qa`, `ga`, each one 25-item, 15-minute module (no going back to a closed part), two mock tests, Test 2 held out, 8 drills, two per part (`sscchslGrammar`, `sscchslVocab`, `sscchslVerbal`, `sscchslLogic`, `sscchslArith`, `sscchslAdvanced`, `sscchslHistory`, `sscchslScience`; 13/12 per part per test, 4 drill-only each), so the dashboard is 10 steps. Bank `data/v2/sscchsl/questions.json` (232 original single-answer items, prefix `SSCCHSL-`, object form with cloze stimuli `SSCCHSL-CL1/2` and reading stimuli `SSCCHSL-RC1/2`) built by `tools/next100/sscchsl/build.py`; checked against the ssccgl, rrbntpc, ibpspo and ctet banks for repeated facts and numbers. Reasoning is text only (figural items not modelled); GA is static; rupees and Indian names. Percent score; negative marking is explained in `scoreNote` and on the landing, not applied. Sources in `tools/next100/sscchsl/sources.md`.
```
