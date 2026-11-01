# RRB Group D (`rrbgroupd`) wiring for the integrator

v2 exam, built on the `rrbntpc` template. Files written (unique to this exam):
`tools/next100/rrbgroupd/*` (8 domain sources as Python data, `build.py`, `sources.md`, this file),
`data/v2/rrbgroupd/questions.json` (plain array, 232 items, prefix `RRBGD-`), `lib/v2/exams/rrbgroupd.ts` (export
`RRBGROUPD`), `lib/v2/banks/rrbgroupd.ts` (`plainBank`), `app/rrb-group-d/*` (layout, root redirect, dashboard,
practice/[n], test/[id], test/[id]/results, stats; copied from `app/rrb-ntpc/`), `app/rrb-group-d-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/rrbgroupd/build.py`, then
`python3 -I tools/validate_v2_bank.py rrbgroupd '{"1": {"cbt": {"1": 100}}, "2": {"cbt": {"1": 100}}}'`
(232 questions, 0 stimuli, 0 problems; key strictly longest 31/232 = 13%). The validator appends the bankSizes line
itself; I removed it again so the shared file stays yours. Do not add `rrbgroupd` to `tools/build_v2_bank.py` PLANS.

Dashboard: 8 drills + 2 tests = 10 steps. No Basics, no premium. Per test 15 arithmetic, 10 numbers/algebra/geometry,
15 verbal, 15 logical, 9 physics, 8 chemistry, 8 biology, 20 GA; 4 drill-only per domain.

Screenshots still needed: `public/landing/rrbgroupd-mobile.png`, `rrbgroupd-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  rrbgroupd: 232,
```

## lib/v2/registry.ts
```ts
import { RRBGROUPD } from "./exams/rrbgroupd";
// EXAMS_V2: add RRBGROUPD after RRBNTPC
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/rrbgroupd";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `RRBGROUPD.domainLabels` (keys `rrbgdArithmetic`, `rrbgdMaths`, `rrbgdVerbal`,
`rrbgdLogical`, `rrbgdPhysics`, `rrbgdChemistry`, `rrbgdBiology`, `rrbgdGA`).

## app/globals.css
Hue from the brief, 6 55% 36% (brick red; rrbntpc is maroon at 350, so they stay apart). Run
`tools/gen_dark_brand_css.py` afterwards. Matches `lib/v2/exams/rrbgroupd.ts` `theme`.
```css
  /* RRB Group D theme: brick red (v2 exam; matches lib/v2/exams/rrbgroupd.ts theme) */
  [data-theme="rrbgroupd"] {
    --brand: 6 55% 36%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 6 55% 96%;
    --brand-hover: 6 55% 31%;
    --brand-dark: 6 55% 28%;
    --brand-darker: 6 50% 15%;
    --brand-muted: 6 30% 72%;
    --brand-border: 6 35% 80%;
    --brand-border-light: 6 35% 90%;
    --brand-gradient-to: 20 55% 96%;
  }
```

## lib/shareCards.ts
```ts
  "rrbgroupd": {
    "color": "hsl(6, 55%, 36%)",
    "tint": "hsl(6, 55%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  rrbgroupd: { title: "RRB Group D CBT", description: "Full 100-question railway Level 1 mock tests on Maths, Reasoning, General Science and General Awareness, with every answer explained." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  rrbgroupd: "IN",
// NON_DRIVING_TESTS: add
  "rrbgroupd",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  rrbgroupd: "Mock tests for the RRB Group D (Level 1) railway CBT: 100 questions in 90 minutes on Mathematics, General Intelligence and Reasoning, General Science and General Awareness, with negative marking explained.",
// EXAM_ORG
  rrbgroupd: "Railway Recruitment Boards · Group D (Level 1) CBT",
// SEARCH_ALIASES
  rrbgroupd: "rrb group d mock test rrb group d practice test railway group d level 1 rrc group d track maintainer assistant points pointsman helper railway exam cbt railway recruitment board group d free mock test india government job exam",
// RELATED_OVERRIDES (if needed)
  rrbgroupd: ["rrbntpc", "ssccgl", "ctet"],
```
Hub group "India government job exams": add `"rrbgroupd"` right after `"rrbntpc"`.

## lib/examFacts.ts
```ts
  rrbgroupd: {
    answer:
      "The RRB Group D exam is the Computer Based Test that the Railway Recruitment Boards hold for Level 1 posts such as Track Maintainer Grade IV and Assistant (Points). It has 100 multiple-choice questions in 90 minutes: 25 on Mathematics, 30 on General Intelligence and Reasoning, 25 on General Science and 20 on General Awareness and Current Affairs, with 1/3 mark deducted for each wrong answer. The minimum qualifying marks are 40 percent for UR and EWS and 30 percent for OBC, SC and ST; candidates are then called to the Physical Efficiency Test on normalised marks.",
    rows: [
      { label: "Questions", value: "100 multiple choice" },
      { label: "Time", value: "90 minutes (120 for eligible PwBD with a scribe)" },
      { label: "Sections", value: "Maths 25, Reasoning 30, General Science 25, General Awareness 20" },
      { label: "Negative marking", value: "1/3 mark per wrong answer" },
      { label: "Qualifying marks", value: "UR and EWS 40%, OBC, SC and ST 30%" },
      { label: "Next stages", value: "Physical Efficiency Test, document verification, medical" },
      { label: "Given by", value: "Railway Recruitment Boards (RRBs)" },
    ],
    basedOn: "the RRB Level 1 notice CEN 09/2025 (updated 30 January 2026), the same pattern as CEN 08/2024",
    source: { name: "Railway Recruitment Boards", url: "https://www.rrbcdg.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  rrbgroupd: "a railway exam coaching class",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"rrbgroupd"` (coaching institutes run Group D batches).

## lib/tigerAssets.ts
Nothing (no tiger set; DMV tiger fallback).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
After the RRB NTPC bullet:
```md
- **RRB Group D** (`/rrb-group-d`, landing `/rrb-group-d-practice-test`, `[data-theme="rrbgroupd"]` brick red, region IN, hub group "India government job exams"): Railway Recruitment Boards Level 1 CBT on CEN 08/2024, kept in CEN 09/2025 (100 questions in 90 minutes: Mathematics 25, General Intelligence and Reasoning 30, General Science 25, General Awareness and Current Affairs 20; 1/3 mark negative marking, explained on the landing and in `scoreNote`, not scored; qualifying UR/EWS 40%, OBC/SC/ST 30%, confirmed in the CEN 09/2025 notice; then PET, document verification and medical). Two full 100-question tests in 90 minutes (one module, grouped Maths, Reasoning, Science, GA), Test 2 held out, 8 drills (`rrbgdArithmetic`, `rrbgdMaths`, `rrbgdVerbal`, `rrbgdLogical`, `rrbgdPhysics`, `rrbgdChemistry`, `rrbgdBiology`, `rrbgdGA`; 15/10/15/15/9/8/8/20 per test, 4 drill-only each), so the dashboard is 10 steps. All four-option single answer. Bank `data/v2/rrbgroupd/questions.json` (232 original items, prefix `RRBGD-`) built by `tools/next100/rrbgroupd/build.py`. GA is static facts only; reasoning is text only; science to class 10. Checked against the rrbntpc, ssccgl, ibpspo and ctet banks and the rest of its wave for overlap. Sources in `tools/next100/rrbgroupd/sources.md`.
```
