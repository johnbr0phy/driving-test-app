# RRB ALP CBT 1 (`rrbalp`) wiring for the integrator

v2 exam, built on the `rrbgroupd` template. Files written (unique to this exam):
`tools/next100/rrbalp/*` (7 domain sources as Python data, `build.py`, `sources.md`, this file),
`data/v2/rrbalp/questions.json` (plain array, 200 items, prefix `RRBALP-`), `lib/v2/exams/rrbalp.ts` (export `RRBALP`),
`lib/v2/banks/rrbalp.ts` (`plainBank`), `app/rrb-alp/*` (layout, root redirect, dashboard, practice/[n], test/[id],
test/[id]/results, stats; copied from `app/rrb-group-d/`), `app/rrb-alp-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/rrbalp/build.py`, then
`python3 -I tools/validate_v2_bank.py rrbalp '{"1": {"cbt": {"1": 75}}, "2": {"cbt": {"1": 75}}}'`
(200 questions, 0 stimuli, 0 problems; key strictly longest 17/200 = 8%; 98 all-number items sorted and locked,
key in an end slot on 48 = 49% after review). I ran the validator from a /tmp copy that does not write `lib/v2/bankSizes.ts`.
Do not add `rrbalp` to `tools/build_v2_bank.py` PLANS.

Dashboard: 7 drills + 2 tests = 9 steps. No Basics, no premium. Per test 13 arithmetic, 12 numbers/algebra/geometry,
13 verbal, 12 logical, 9 physics, 8 chemistry, 8 biology (25/25/25 by subject: the notice fixes no split, so this
is Tigertest's); drill-only 7/7/6/6/8/8/8.

Screenshots still needed: `public/landing/rrbalp-mobile.png`, `rrbalp-desktop.png` (+ `-dark`).

Pattern note: CEN 01/2026 (the current ALP notice; CBT 1 reported for 3 to 5 November 2026) dropped General
Awareness from CBT 1, leaving 75 questions in 60 minutes on Maths, Reasoning and General Science. The official PDF
could not be opened from here; the pattern and the qualifying marks (UR/EWS 40, OBC/SC 30, ST 25) come from
consistent secondary summaries and are labelled "reported" in the copy. Worth one look at the notice if the
integrator can reach an RRB site.

## lib/v2/bankSizes.ts
```ts
  rrbalp: 200,
```

## lib/v2/registry.ts
```ts
import { RRBALP } from "./exams/rrbalp";
// EXAMS_V2: add RRBALP after RRBGROUPD
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/rrbalp";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `RRBALP.domainLabels` (keys `rrbalpArithmetic`, `rrbalpMaths`, `rrbalpVerbal`,
`rrbalpLogical`, `rrbalpPhysics`, `rrbalpChemistry`, `rrbalpBiology`).

## app/globals.css
The brief suggested 355 45% 34%, which sits within 8 degrees of `aursa` (352 40% 30%) with only 5 points of
saturation and 4 of lightness between them. I used **355 55% 30%** (deep railway red; the reviewer aligned `lib/v2/exams/rrbalp.ts`, which had 355 55% 32%, to this), which clears every theme within
8 degrees as of 2026-11-01 (aursa, cpr, moto, act, aplus, the Canada driving block at 356 68% 40%, casfa, apush,
aufirstaid, sgbtt, rrbntpc). Check it against the other batch 3 hues (rpfconst etc.) when they land. Run
`tools/gen_dark_brand_css.py` afterwards. Matches `lib/v2/exams/rrbalp.ts` `theme`.
```css
  /* RRB ALP theme: deep railway red (v2 exam; matches lib/v2/exams/rrbalp.ts theme) */
  [data-theme="rrbalp"] {
    --brand: 355 55% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 355 55% 96%;
    --brand-hover: 355 55% 26%;
    --brand-dark: 355 55% 23%;
    --brand-darker: 358 50% 13%;
    --brand-muted: 358 30% 72%;
    --brand-border: 358 35% 80%;
    --brand-border-light: 358 35% 90%;
    --brand-gradient-to: 12 55% 96%;
  }
```

## lib/shareCards.ts
```ts
  "rrbalp": {
    "color": "hsl(358, 55%, 30%)",
    "tint": "hsl(358, 55%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  rrbalp: { title: "RRB ALP CBT 1", description: "Full 75-question Assistant Loco Pilot mock tests on Maths, Mental Ability and General Science, with every answer explained." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  rrbalp: "IN",
// NON_DRIVING_TESTS: add
  "rrbalp",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  rrbalp: "Mock tests for RRB ALP (Assistant Loco Pilot) CBT 1: 75 questions in 60 minutes on Mathematics, General Intelligence and Reasoning and General Science, on the CEN 01/2026 pattern, with negative marking explained.",
// EXAM_ORG
  rrbalp: "Railway Recruitment Boards · Assistant Loco Pilot CBT 1",
// SEARCH_ALIASES
  rrbalp: "rrb alp mock test rrb alp practice test assistant loco pilot alp cbt 1 loco pilot exam railway alp cen 01/2026 mental ability general science railway recruitment board alp free mock test india government job exam",
// RELATED_OVERRIDES (if needed)
  rrbalp: ["rrbgroupd", "rrbntpc", "sscgd"],
```
Hub group "India government job exams": add `"rrbalp"` right after `"rrbgroupd"`.

## lib/examFacts.ts
```ts
  rrbalp: {
    answer:
      "RRB ALP CBT 1 is the first-stage Computer Based Test that the Railway Recruitment Boards hold for Assistant Loco Pilot posts. Under CEN 01/2026, exam guides report 75 multiple-choice questions in 60 minutes on Mathematics, General Intelligence and Reasoning and General Science at class 10 level; General Awareness, part of earlier ALP CBT 1 papers, is reported dropped. One third of a mark is deducted for each wrong answer. CBT 1 is a screening test: its marks do not count in the final merit, and shortlisted candidates go on to CBT 2 and a computer based aptitude test.",
    rows: [
      { label: "Questions", value: "75 multiple choice" },
      { label: "Time", value: "60 minutes" },
      { label: "Subjects (reported)", value: "Mathematics, General Intelligence and Reasoning, General Science (class 10)" },
      { label: "Negative marking", value: "1/3 mark per wrong answer" },
      { label: "Qualifying marks (reported)", value: "UR and EWS 40%, OBC and SC 30%, ST 25%" },
      { label: "Next stages", value: "CBT 2 (Part A and trade Part B), computer based aptitude test" },
      { label: "Given by", value: "Railway Recruitment Boards (RRBs)" },
    ],
    basedOn: "the RRB Assistant Loco Pilot notice CEN 01/2026 (11,127 posts), as summarised by exam guides",
    source: { name: "Railway Recruitment Boards", url: "https://www.rrbcdg.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  rrbalp: "a railway exam coaching class",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"rrbalp"` (coaching institutes run ALP batches).

## lib/tigerAssets.ts
Nothing (no tiger set; DMV tiger fallback). Optionally borrow the RRB NTPC set through `BORROWED_SETS` like the other
railway exams.

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
After the RRB Group D bullet:
```md
- **RRB ALP** (`/rrb-alp`, landing `/rrb-alp-practice-test`, `[data-theme="rrbalp"]` deep railway red, region IN, hub group "India government job exams"): Railway Recruitment Boards Assistant Loco Pilot CBT 1 on CEN 01/2026 (11,127 posts; CBT 1 reported for 3 to 5 November 2026): 75 questions in 60 minutes on Mathematics, General Intelligence and Reasoning (Mental Ability) and General Science to class 10; General Awareness is reported dropped from CBT 1 in this notice (a few guides still list it); 1/3 mark negative marking, explained on the landing and in `scoreNote`, not scored; qualifying UR/EWS 40%, OBC/SC 30%, ST 25% as reported (the notice PDF could not be opened); CBT 1 is screening only, then CBT 2 and CBAT. Two full 75-question tests in 60 minutes (one module, grouped Maths, Reasoning, Science, 25 each: the notice fixes no split), Test 2 held out, 7 drills (`rrbalpArithmetic`, `rrbalpMaths`, `rrbalpVerbal`, `rrbalpLogical`, `rrbalpPhysics`, `rrbalpChemistry`, `rrbalpBiology`; 13/12/13/12/9/8/8 per test, 50 drill-only), so the dashboard is 9 steps. All four-option single answer; all-number options sorted and locked, conclusion and assumption sets locked. Bank `data/v2/rrbalp/questions.json` (200 original items, prefix `RRBALP-`) built by `python3 -I tools/next100/rrbalp/build.py`. Reasoning is text only; science to class 10. Checked against every India bank for repeated numbers and facts. Sources in `tools/next100/rrbalp/sources.md`.
```
Final hue settled by the integrator: nda 213 25% 44%, rrbalp 355 55% 32% (see app/globals.css).
