# PSAT/NMSQT (`psat`) wiring for the integrator

v2 exam, modelled on the SAT (same adaptive module shape, same numeric item rules). Not Premium-gated.
Files already written (unique to this exam):
- `tools/psat/` : `build.py` (own builder, like `tools/pmp/build.py`), Python-data sources `rw_m1.py`,
  `rw_m2_upper.py`, `rw_m2_lower.py`, `ma_m1.py`, `ma_m2_upper.py`, `ma_m2_lower.py`, `rw_drill.py`,
  `ma_drill.py`, and `sources.md`.
- `data/v2/psat/*.json` (8 files, built; same layout as `data/v2/sat/`).
- `lib/v2/exams/psat.ts` (export `PSAT`), `lib/v2/banks/psat.ts` (`plainBank`, like SAT).
- `app/psat/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results; copied from
  `app/sat/`), `app/psat-practice-test/page.tsx` (copied from the SAT landing; like it, no
  `ExamLandingBreadcrumbs`, which the SAT landing does not render in this tree; add it if the
  integrator's tree has it).

Scope: ONE full adaptive practice test (Test 1: R&W module 1, module 2 upper and lower; Math the same;
147 items) plus 64 drill-only items (`test: 0`), 211 in all, 28 numeric. Test 1 is `heldOut`, so the
four drills run only on the drill-only items (16 each) and the test stays a clean readiness check.
Dashboard: 4 drills with Basics (8 steps) + 1 test = 9 steps. Basics use only existing shared skills.

Rebuild: `python3 -I tools/psat/build.py`, then
`python3 -I tools/validate_v2_bank.py psat '{"1": {"rw": {"1": 27, "2:lower": 27, "2:upper": 27}, "math": {"1": 22, "2:lower": 22, "2:upper": 22}}}'`
(passes: 211 questions, 0 stimuli, 0 problems). Do not add `psat` to `tools/build_v2_bank.py`.

Screenshots still needed: `public/landing/psat-mobile.png`, `psat-desktop.png` (+ `-dark`), referenced by the landing hero.

## lib/v2/bankSizes.ts
```ts
  psat: 211,
```

## lib/v2/registry.ts
```ts
import { PSAT } from "./exams/psat";
// EXAMS_V2: right after SAT
export const EXAMS_V2: ExamV2Config[] = [GED, SAT, PSAT, ACT, /* ... */];
```

## lib/server/classQuestions.ts, lib/server/mcpV2Practice.ts, lib/server/v2Progress.ts
After the sat bank import in each:
```ts
import "@/lib/v2/banks/psat";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `PSAT.domainLabels` (same keys as SAT: `craftStructure`, `infoIdeas`,
`conventions`, `expressionIdeas`, `algebra`, `advancedMath`, `dataAnalysis`, `geometryTrig`).

## app/globals.css
After the `[data-theme="sat"]` block (light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint).
Suggested hue 199 (sky blue, a lighter cousin of SAT's 221 blue); re-pick if it clashes.
```css
  /* PSAT theme: sky blue (v2 exam; matches lib/v2/exams/psat.ts theme) */
  [data-theme="psat"] {
    --brand: 199 89% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 199 100% 96%;
    --brand-hover: 199 89% 33%;
    --brand-dark: 199 89% 27%;
    --brand-darker: 199 75% 18%;
    --brand-muted: 199 60% 72%;
    --brand-border: 199 60% 80%;
    --brand-border-light: 199 60% 90%;
    --brand-gradient-to: 215 90% 96%;
  }
```

## lib/shareCards.ts
```ts
  "psat": {
    "color": "hsl(199, 89%, 38%)",
    "tint": "hsl(199, 100%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  psat: { title: "Digital PSAT Practice Test", description: "A full adaptive PSAT/NMSQT with a 320 to 1520 score estimate, plus reading, writing and math drills for your phone." },
```

## lib/region.ts
Nothing: US is the default region (`TEST_REGIONS[testId] ?? "US"`), same as SAT. Not in `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  psat: "A full-length digital PSAT/NMSQT practice test with timed adaptive modules, a calculator and a 320 to 1520 score estimate, plus four skill drills that teach the basics first.",
// EXAM_ORG
  psat: "Digital PSAT/NMSQT and PSAT 10 · Reading and Writing, Math",
// SEARCH_ALIASES
  psat: "psat psat nmsqt psat 10 psat/nmsqt national merit scholarship qualifying test selection index semifinalist college board bluebook digital psat 10th grade 11th grade junior",
// RELATED_OVERRIDES
  psat: ["sat", "act", "accuplacer"],
```
Also drop `psat` from the existing `sat` SEARCH_ALIASES string so a "psat" search finds the PSAT first,
and consider `sat: ["psat", "act", "accuplacer"]` in RELATED_OVERRIDES.
Hub group "GED, college, military & nursing school entrance": insert `"psat"` right after `"sat"`:
```ts
  { title: "GED, college, military & nursing school entrance", ids: ["ged", "sat", "psat", "act", "accuplacer", "asvab", "teas", "hesi"] },
```

## lib/examFacts.ts
```ts
  psat: {
    answer:
      "The digital PSAT/NMSQT has 98 questions in 2 hours 14 minutes: Reading and Writing (54 questions, two 32-minute modules) and Math (44 questions, two 35-minute modules), with a calculator allowed on all of Math. It is adaptive by module and scored 320 to 1520, with each section scored 160 to 760. It is given to 10th and 11th graders in the fall (the PSAT 10 is the same test in the spring), and juniors' scores are used for the National Merit Scholarship Program through a Selection Index of 48 to 228.",
    rows: [
      { label: "Questions", value: "98 (54 Reading and Writing, 44 Math)" },
      { label: "Time", value: "2 hours 14 minutes, plus a 10-minute break" },
      { label: "Score", value: "320 to 1520 (160 to 760 per section)" },
      { label: "National Merit", value: "Selection Index: (2 x Reading and Writing + Math) / 10" },
      { label: "Calculator", value: "Allowed on all of Math (built-in graphing calculator)" },
      { label: "Given by", value: "College Board, in the Bluebook app at school" },
    ],
    basedOn: "the published digital PSAT/NMSQT specifications",
    source: { name: "College Board", url: "https://satsuite.collegeboard.org/psat-nmsqt/whats-on-the-test" },
    tigertest:
      "Tigertest has a full-length adaptive PSAT practice test with a score estimate and four skill drills that teach the basics first. All of it is free with no account required.",
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, after `sat`:
```ts
  psat: "PSAT prep",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"psat"` after `"sat"`.

## lib/tigerAssets.ts
Optional: `BORROWED_SETS` entry `psat: "sat"` so the landing and dashboard use the SAT tiger set
(otherwise it falls back to the site tiger like other new exams).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the SAT bullet in the v2 section:
```md
- **PSAT** (`/psat`, landing `/psat-practice-test`, `[data-theme="psat"]` sky blue, catalog id `psat` right after `sat` in "GED, college, military & nursing school entrance"): digital PSAT/NMSQT (and PSAT 10), the SAT's adaptive shape scored 160 to 760 per section and 320 to 1520 total, pitched a little easier. One full adaptive practice test, held out of the drills: `data/v2/psat/rw-m1`, `rw-m2-upper`, `rw-m2-lower` (27 each, 8 craft/7 info/7 conventions/5 expression) and `ma-m1`, `ma-m2-upper`, `ma-m2-lower` (22 each, 8 algebra/7 advanced/4 data/3 geometry, 6 numeric per module 1 and upper module 2). Drill-only items (`test: 0`) are `rw-drill` and `ma-drill` (16 per drill), so the four drills (Reading, Writing, Algebra and Advanced Math, Data and Geometry, each with shared Basics) plus the test make a 9-step dashboard. 211 original items, ids `PSAT-RW-`/`PSAT-MA-`, built from Python data in `tools/psat/` by `tools/psat/build.py` (keys authored first, shuffled by a stem seed; all-number math options sorted with `lockedOrder`). Lower-path modules cap a section near 560; `scoreNote` explains the National Merit Selection Index. Free, no Premium gating. Sources in `tools/psat/sources.md`.
```
