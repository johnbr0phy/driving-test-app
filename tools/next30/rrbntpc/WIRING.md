# RRB NTPC CBT 1 (`rrbntpc`) wiring for the integrator

v2 exam, modelled on PMP / AWS CCP. Files already written (unique to this exam):
`tools/rrbntpc/*` (8 domain sources as Python data, `build.py`, `sources.md`), `data/v2/rrbntpc/questions.json`
(plain array, 232 items, prefix `RRBNTPC-`), `lib/v2/exams/rrbntpc.ts` (export `RRBNTPC`),
`lib/v2/banks/rrbntpc.ts` (`plainBank`, like AWS), `app/rrb-ntpc/*` (layout, root redirect, dashboard,
practice/[n], test/[id], test/[id]/results; copied from `app/pmp/`), `app/rrb-ntpc-practice-test/page.tsx`.

Rebuild: `python3 -I tools/rrbntpc/build.py`, then
`python3 -I tools/validate_v2_bank.py rrbntpc '{"1": {"cbt": {"1": 100}}, "2": {"cbt": {"1": 100}}}'`
(passes: 232 questions, 0 stimuli, 0 problems; key strictly longest 33/232 = 14%). Do not add `rrbntpc` to
`tools/build_v2_bank.py` PLANS: it has its own build (keys authored first and shuffled by a stem seed, items grouped
by subject GA, Maths, Reasoning within each test).

Dashboard: 8 drills + 2 tests = 10 steps. No Basics, no premium.

Screenshots still needed: `public/landing/rrbntpc-mobile.png`, `rrbntpc-desktop.png` (+ `-dark`), referenced by the
landing hero. The landing has no `ExamLandingBreadcrumbs` because that component does not exist in this tree (the
PMP template does not render it either); add `<ExamLandingBreadcrumbs examId="rrbntpc" />` right after the JSON-LD
script if the integrator's tree has it.

Overlap with SSC CGL: `data/v2/ssccgl` existed during the build. Every item that tested the same fact or used the
same numbers as an SSC CGL item was rewritten (about 65 items); what remains shares only generic templates (an LCM
question, a sign-substitution question) with different content.

## lib/v2/bankSizes.ts
```ts
  rrbntpc: 232,
```

## lib/v2/registry.ts
```ts
import { RRBNTPC } from "./exams/rrbntpc";
// EXAMS_V2: add RRBNTPC next to SSCCGL (the India government job exams in this wave)
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ SSCCGL, RRBNTPC, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/rrbntpc";          // classQuestions.ts
import '@/lib/v2/banks/rrbntpc';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `RRBNTPC.domainLabels` (keys `ntpcHistory`, `ntpcGeography`, `ntpcPolity`,
`ntpcScience`, `ntpcArithmetic`, `ntpcMaths`, `ntpcVerbal`, `ntpcLogical`).

## app/globals.css
Light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint. Suggested hue 350 (railway maroon); 350 is
already used by one v2 exam theme, so re-pick if it clashes (345 to 355 reads as the same maroon). Keep
`lib/v2/exams/rrbntpc.ts` `theme` in step with whatever hue is chosen.
```css
  /* RRB NTPC theme: railway maroon (v2 exam; matches lib/v2/exams/rrbntpc.ts theme) */
  [data-theme="rrbntpc"] {
    --brand: 350 62% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 350 60% 96%;
    --brand-hover: 350 62% 33%;
    --brand-dark: 350 62% 28%;
    --brand-darker: 350 55% 15%;
    --brand-muted: 350 30% 72%;
    --brand-border: 350 35% 80%;
    --brand-border-light: 350 35% 90%;
    --brand-gradient-to: 10 55% 96%;
  }
```

## lib/shareCards.ts
```ts
  "rrbntpc": {
    "color": "hsl(350, 62%, 38%)",
    "tint": "hsl(350, 60%, 96%)"
  },
```
Optionally update the `in` country card description to mention government job exams once SSC CGL and RRB NTPC are live,
for example: `"Government job exams, learner's licence and IT certifications."`

## lib/shareCardCopy.ts
```ts
  rrbntpc: { title: "RRB NTPC CBT 1", description: "Full 100-question railway mock tests on General Awareness, Mathematics and Reasoning, with every answer explained." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  inrto: "IN", ssccgl: "IN", rrbntpc: "IN",
// NON_DRIVING_TESTS: add (it is not a driving test)
  "rrbntpc",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  rrbntpc: "Mock tests for the RRB NTPC CBT 1 railway exam: 100 questions in 90 minutes on General Awareness (history, geography, polity, economy, science), Mathematics and General Intelligence and Reasoning, with negative marking explained.",
// EXAM_ORG
  rrbntpc: "Railway Recruitment Boards · NTPC CBT 1",
// SEARCH_ALIASES
  rrbntpc: "rrb ntpc mock test rrb ntpc practice test railway exam ntpc cbt 1 cbt1 railway recruitment board non technical popular categories station master goods guard clerk typist railway mock test free india government job exam",
// RELATED_OVERRIDES (if the group would otherwise be thin)
  rrbntpc: ["ssccgl", "ibpspo", "ctet"],
```
Hub group: "India government job exams" (new, per SPEC), with `ssccgl`, `rrbntpc`, `ctet`, `ibpspo`:
```ts
  { title: "India government job exams", ids: ["ssccgl", "rrbntpc", "ibpspo", "ctet"] },
```

## lib/examFacts.ts
```ts
  rrbntpc: {
    answer:
      "RRB NTPC CBT 1 is the first-stage computer-based test for the Railway Recruitment Boards' Non-Technical Popular Categories posts, at both graduate and undergraduate level. It has 100 multiple-choice questions in 90 minutes: 40 on General Awareness, 30 on Mathematics and 30 on General Intelligence and Reasoning, with 1/3 mark deducted for each wrong answer. The minimum qualifying marks are 40 percent for UR and EWS, 30 percent for OBC and SC and 25 percent for ST; CBT 1 only shortlists candidates for CBT 2 on normalised marks and does not count in the final merit.",
    rows: [
      { label: "Questions", value: "100 multiple choice" },
      { label: "Time", value: "90 minutes (120 for eligible PwBD with a scribe)" },
      { label: "Sections", value: "General Awareness 40, Mathematics 30, Reasoning 30" },
      { label: "Negative marking", value: "1/3 mark per wrong answer" },
      { label: "Qualifying marks", value: "UR and EWS 40%, OBC and SC 30%, ST 25%" },
      { label: "Next stage", value: "CBT 2, then a typing or aptitude test where the post needs one" },
      { label: "Given by", value: "Railway Recruitment Boards (RRBs)" },
    ],
    basedOn: "the RRB NTPC notices CEN 05/2024 and 06/2024, the same pattern as CEN 06/2025 and 07/2025",
    source: { name: "Railway Recruitment Boards", url: "https://www.rrbcdg.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  rrbntpc: "a railway exam coaching class",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"rrbntpc"` (coaching institutes run NTPC batches).

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section after the PMP bullet (or with the other India exams of this wave):
```md
- **RRB NTPC** (`/rrb-ntpc`, landing `/rrb-ntpc-practice-test`, `[data-theme="rrbntpc"]` railway maroon, region IN, hub group "India government job exams"): Railway Recruitment Boards NTPC CBT 1 on CEN 05/2024 and 06/2024, unchanged in CEN 06/2025 and 07/2025 (100 questions in 90 minutes: General Awareness 40, Mathematics 30, General Intelligence and Reasoning 30; 1/3 mark negative marking, explained on the landing and in `scoreNote`, not scored; qualifying UR/EWS 40%, OBC/SC 30%, ST 25%). Two full 100-question tests in 90 minutes (one module, items grouped GA, Maths, Reasoning), Test 2 held out, 8 drills (`ntpcHistory`, `ntpcGeography`, `ntpcPolity`, `ntpcScience`, `ntpcArithmetic`, `ntpcMaths`, `ntpcVerbal`, `ntpcLogical`; 10/10/10/10/18/12/15/15 per test, 4 drill-only each), so the dashboard is 10 steps. All four-option single answer, like the real CBT. Bank `data/v2/rrbntpc/questions.json` (232 original items, prefix `RRBNTPC-`) built from `tools/rrbntpc/` by its own `tools/rrbntpc/build.py`. GA is static facts only (no current affairs, no office-holders); reasoning is text only (no Venn or figure items); Indian English, rupees, Indian names. Kept free of the facts and numbers used in the SSC CGL bank. Sources in `tools/rrbntpc/sources.md`.
```
