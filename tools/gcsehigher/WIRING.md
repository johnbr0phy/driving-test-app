# gcsehigher wiring (v2 exam)

Files already written (unique to this exam): `lib/v2/exams/gcsehigher.ts`, `lib/v2/banks/gcsehigher.ts`,
`data/v2/gcsehigher/questions.json` (built), `tools/gcsehigher/*`, `app/gcse-maths-higher/*`,
`app/gcse-maths-higher-practice-test/page.tsx`. No new Basics file: drills reuse shared skills
(`exponentRules`, `scientificNotation`, `squareRoots`, `fractionOps`, `distributing`, `factoring`, `solveX`,
`systems`, `inequalities`, `functionNotation`, `slope`, `ratios`, `percentChange`, `exponentialGrowth`,
`rateProblems`, `pythagorean`, `sohcahtoa`, `circleBasics`, `triangleAngles`). Dashboard: 4 Basics steps +
5 drills + 2 tests = 11 steps.

## lib/v2/registry.ts
After `import { TIMESTABLES } from "./exams/timestables";`:
```ts
import { GCSEHIGHER } from "./exams/gcsehigher";
```
Append `GCSEHIGHER` to `EXAMS_V2` (after the GCSE Foundation entry if wave 1 added one, else after `TIMESTABLES`).

## lib/v2/bankSizes.ts
Regenerate with the validator, or add `gcsehigher: 220,`.

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/gcsehigher";
```
(mcpV2Practice uses single quotes: `import '@/lib/v2/banks/gcsehigher';`)

## app/globals.css
Light block next to the other v2 themes, then re-run `python3 -I tools/gen_dark_brand_css.py` for the `.dark` block:
```css
  /* GCSE Maths Higher theme: violet (v2 exam; matches lib/v2/exams/gcsehigher.ts theme) */
  [data-theme="gcsehigher"] {
    --brand: 282 55% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 282 100% 96%;
    --brand-hover: 282 55% 34%;
    --brand-dark: 282 55% 28%;
    --brand-darker: 282 50% 19%;
    --brand-muted: 282 40% 75%;
    --brand-border: 282 40% 80%;
    --brand-border-light: 282 40% 90%;
    --brand-gradient-to: 262 80% 95%;
  }
```
Hue 282 was unused in this worktree (nearest: 271, 292). If wave 1's `gcsemaths` took a hue within 8 of 282, shift this one.

## lib/testCatalog.ts
EXAM_BLURBS:
```ts
  gcsehigher: "GCSE Maths Higher tier for England: two practice tests of three papers (Paper 1 non-calculator), weighted 30% algebra, with drills on surds, quadratics, circle theorems, vectors, histograms and tree diagrams.",
```
EXAM_ORG: `gcsehigher: "AQA, Edexcel and OCR (England)",`
SEARCH_ALIASES:
```ts
  gcsehigher: "gcse maths higher tier higher paper year 10 year 11 grade 7 grade 8 grade 9 aqa edexcel ocr non calculator calculator paper 1 paper 2 paper 3 surds quadratics circle theorems mock exam revision uk england",
```
GROUPS: put `gcsehigher` in the "UK school tests" group, right after the Foundation `gcsemaths`:
`{ title: "UK school tests", ids: ["timestables", "ks2", "gcsemaths", "gcsehigher", ...] }` (integrator decides).
RELATED_OVERRIDES (only if the group is too small): `gcsehigher: ["gcsemaths", "ks2", "timestables"],`

## lib/region.ts
Add to `TEST_REGIONS`: `gcsehigher: "UK",` (next to `timestables: "UK"`), and add `"gcsehigher"` to
`NON_DRIVING_TESTS`: `new Set(["timestables", ..., "gcsehigher"])`.

## lib/examFacts.ts
```ts
  gcsehigher: {
    answer:
      "GCSE Mathematics Higher tier is three written papers sat at the end of Year 11 in England: 1 hour 30 minutes and 80 marks each, with Paper 1 non-calculator and Papers 2 and 3 calculator. Any topic can appear on any paper, weighted 30% algebra, 20% ratio, proportion and rates of change, 20% geometry and measures, 15% number and 15% probability and statistics. Higher tier awards grades 9 to 4, with an allowed grade 3, and grade boundaries are set after each exam series.",
    rows: [
      { label: "Who takes it", value: "Year 11 students in England (and resit students), usually in May and June" },
      { label: "Papers", value: "3 papers, 1 hr 30 min and 80 marks each (240 marks)" },
      { label: "Calculator", value: "Paper 1 non-calculator; Papers 2 and 3 calculator" },
      { label: "Grades", value: "9 to 4, with an allowed grade 3; boundaries change each year" },
      { label: "Content weighting", value: "Algebra 30%, ratio 20%, geometry 20%, number 15%, probability and statistics 15%" },
      { label: "Given by", value: "AQA, Pearson Edexcel or OCR, to the DfE subject content" },
    ],
    basedOn: "the Department for Education's GCSE mathematics subject content and assessment objectives (2013) and its Higher tier weightings",
    source: { name: "DfE: GCSE mathematics subject content and assessment objectives", url: "https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives" },
    tigertest:
      "Tigertest has two GCSE Maths Higher practice tests of three timed papers each (20 questions per paper, Paper 1 without a calculator) and five topic drills, four of which open with short Basics lessons. All of it is free with no account required; scores are percent correct, not grades.",
  },
```
(checked 2026-10-29)

## components/exam/ExamClassFaq.tsx
```ts
  gcsehigher: "a Year 10 or Year 11 maths class",
```

## components/TeachNudge.tsx
Add `"gcsehigher"` to `TEACHER_LED` (with `timestables`, or in a new "Secondary school classes" line).

## lib/seoDates.ts
Bump the exams-family date if the integrator bumps it for the wave. The sitemap (`lib/sitemaps.ts`) and
`/og/[examId]` already read `EXAMS_V2`, so no line is needed there.

## next.config.ts
Nothing needed (no old routes to redirect).

## lib/tigerAssets.ts
Nothing: unknown ids fall back to the DMV artwork.

## Landing screenshots
The landing references `/landing/gcsehigher-mobile.png` and `/landing/gcsehigher-desktop.png` (plus `-dark`
variants, as for `ged`). Shoot them with `.claude/skills/exam-bank/scripts/shoot_landing.js` once the dev
server runs.

## Breadcrumbs
The brief mentions `<ExamLandingBreadcrumbs>`, but that component does not exist in this worktree (no landing
uses it), so the page has none. Add it if the integrator's tree has it.

## CLAUDE.md
Under "v2 exams", after the GED or times tables bullet:
```md
- **GCSE Maths Higher** (`/gcse-maths-higher`, landing `/gcse-maths-higher-practice-test`, `[data-theme="gcsehigher"]` violet, hub "UK school tests", region UK): three sections that are the three papers, `p1` non-calculator and `p2`/`p3` calculator, 20 items in 45 min each (3 number, 6 algebra, 4 ratio, 4 geometry, 3 statistics: the DfE Higher weightings 15/30/20/20/15), two practice tests with Test 2 held out, 5 drills (one per content area, `gcsehigherNumber`...`gcsehigherStats`), four opening with shared Basics, 11 dashboard steps. Drill-only items (`test: 0`) are in `p1` because a drill draws from one section and has no calculator. 220 original items built by `tools/gcsehigher/build.py` from `tools/gcsehigher/q_*.py` (its own builder, not `build_v2_bank.py`). Percent score, not grades.
```
