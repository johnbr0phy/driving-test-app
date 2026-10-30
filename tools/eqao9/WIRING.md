# eqao9 wiring (v2 exam)

Files already written (unique to this exam): `lib/v2/exams/eqao9.ts`, `lib/v2/banks/eqao9.ts`,
`data/v2/eqao9/questions.json` (built), `tools/eqao9/*`, `app/eqao-grade-9-math/*`,
`app/eqao-grade-9-math-practice-test/page.tsx`. No new Basics file: drills reuse shared skills
(`exponentRules`, `scientificNotation`, `fractionOps`, `negativeNumbers`, `ratios`, `distributing`, `solveX`,
`substitution`, `slope`, `inequalities`, `meanMedian`, `readingTable`, `trends`, `pythagorean`, `circleBasics`,
`triangleAngles`, `percents`, `percentChange`, `exponentialGrowth`). Dashboard: 5 Basics steps + 5 drills + 2 tests = 12.
Sections `a` and `b` (Sessions A and B) are adaptive: stage 1 of 13, stage 2 of 12 with `lower`/`upper` variants
(threshold 0.6), like EQAO's multi-stage design. No Premium gating.

## lib/v2/registry.ts
After the last exam import:
```ts
import { EQAO9 } from "./exams/eqao9";
```
Append `EQAO9` to `EXAMS_V2`.

## lib/v2/bankSizes.ts
Regenerate with the validator, or add `eqao9: 200,`.

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/eqao9";
```
(mcpV2Practice uses single quotes: `import '@/lib/v2/banks/eqao9';`)

## app/globals.css
Light block next to the other v2 themes (then the integrator's one `gen_dark_brand_css.py` run makes the `.dark` block):
```css
  /* EQAO Grade 9 Math theme: indigo (v2 exam; matches lib/v2/exams/eqao9.ts theme) */
  [data-theme="eqao9"] {
    --brand: 250 60% 45%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 250 100% 96%;
    --brand-hover: 250 60% 39%;
    --brand-dark: 250 60% 33%;
    --brand-darker: 250 55% 22%;
    --brand-muted: 250 40% 75%;
    --brand-border: 250 40% 80%;
    --brand-border-light: 250 40% 90%;
    --brand-gradient-to: 230 80% 95%;
  }
```
Hue 250 was unused in this worktree (nearest 240 and 260). If another wave-2 exam took a hue within 6 of 250,
shift this one (and `theme` in `lib/v2/exams/eqao9.ts`) to 228 or 233.

## lib/testCatalog.ts
EXAM_BLURBS:
```ts
  eqao9: "EQAO Grade 9 Assessment of Mathematics for Ontario's MTH1W course: two adaptive practice tests of two sessions on EQAO's blueprint (algebra and coding 36%), with a calculator, the formula sheet, and drills on every strand.",
```
EXAM_ORG: `eqao9: "EQAO (Ontario) · Grade 9 MTH1W",`
SEARCH_ALIASES:
```ts
  eqao9: "eqao grade 9 math mathematics assessment ontario mth1w de-streamed destreamed grade nine high school secondary coding python linear relations financial literacy sample test practice canada",
```
GROUPS: suggested "Canada school and trade tests" (wave hub), e.g.
`{ title: "Canada school and trade tests", ids: ["eqao9", "osslt", ...] }` (integrator decides; `osslt` is the wave-1 Ontario literacy test).
RELATED_OVERRIDES (only if the group is too small): `eqao9: ["osslt", "gcsehigher", "sat"],`

## lib/region.ts
Add to `TEST_REGIONS`: `eqao9: "CA",` and add `"eqao9"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts
```ts
  eqao9: {
    answer:
      "The EQAO Grade 9 Assessment of Mathematics is an online, computer-adaptive test that Ontario students write at school at the end of the de-streamed Grade 9 math course (MTH1W). It has two sessions of about 60 minutes, with 54 questions: 50 that count and 4 field-test questions. Each session starts with a medium set and then gives an easier or harder set. The 50 scored questions are 18 algebra (including coding), 10 number, 8 data, 8 geometry and measurement and 6 financial literacy. Results are reported as levels 1 to 4, with Level 3 the provincial standard, and from 2026-2027 the result is 20% of the MTH1W final mark.",
    rows: [
      { label: "Who takes it", value: "Ontario students finishing Grade 9 math (MTH1W), in a winter or spring window" },
      { label: "Format", value: "Online, two sessions of about 60 minutes, multi-stage adaptive" },
      { label: "Questions", value: "54 (50 scored, 4 field test)" },
      { label: "Strands", value: "Algebra 18, number 10, data 8, geometry and measurement 8, financial literacy 6" },
      { label: "Question types", value: "Single and multiple selection, drag and drop, drop-down, key entry" },
      { label: "Tools", value: "Built-in calculator (own calculator allowed) and the EQAO formula sheet" },
      { label: "Results", value: "Levels 1 to 4 (Level 3 is the provincial standard); 20% of the course mark from 2026-2027" },
    ],
    basedOn: "EQAO's Grade 9 Assessment of Mathematics framework and blueprint and the Ontario Grade 9 mathematics curriculum (MTH1W, 2021)",
    source: { name: "EQAO: Grade 9 Assessment of Mathematics", url: "https://eqao.com/the-assessments/grade-9-math" },
    tigertest:
      "Tigertest has two EQAO Grade 9 Math practice tests of two adaptive sessions each (25 scored questions per session, in EQAO's strand counts) and five strand drills that open with short Basics lessons. All of it is free with no account required; scores are percent correct, not EQAO levels.",
  },
```
(checked 2026-10-30)

## components/exam/ExamClassFaq.tsx
```ts
  eqao9: "a Grade 9 math class",
```

## components/TeachNudge.tsx
Add `"eqao9"` to `TEACHER_LED` (with the high school classes line, or a new "Secondary school classes" line).

## lib/seoDates.ts
Bump the exams-family date if the integrator bumps it for the wave. The sitemap and `/og/[examId]` read `EXAMS_V2`.

## next.config.ts
Nothing needed.

## lib/tigerAssets.ts
Nothing: unknown ids fall back to the DMV artwork.

## Landing screenshots
The landing references `/landing/eqao9-mobile.png` and `/landing/eqao9-desktop.png` (plus `-dark` variants). Shoot them with
`.claude/skills/exam-bank/scripts/shoot_landing.js` once the dev server runs.

## Breadcrumbs
`ExamLandingBreadcrumbs` does not exist on this branch, so the landing has none.

## CLAUDE.md
Under "v2 exams", after the GCSE or GED bullet:
```md
- **EQAO Grade 9 Math** (`/eqao-grade-9-math`, landing `/eqao-grade-9-math-practice-test`, `[data-theme="eqao9"]` indigo, region CA): Ontario's EQAO Grade 9 Assessment of Mathematics (MTH1W). Two sections that are the real Sessions A and B, each a 13-item stage 1 and an adaptive 12-item stage 2 (`lower`/`upper`, threshold 0.6), so 50 scored items per test in the EQAO blueprint (algebra with coding 18, number 10, data 8, geometry and measurement 8, financial literacy 6), calculator and the EQAO formula sheet as `reference` on both. Two tests with Test 2 held out, 5 drills (one per strand, `eqao9Number`...`eqao9Financial`) all opening with shared Basics, 12 dashboard steps. Drill-only items are in session `a`. 200 original items, code shown as Python in a numbered table, built by `tools/eqao9/build.py` from `tools/eqao9/q_*.py`. Percent score, not EQAO levels; from 2026-2027 the real result is 20% of the course mark.
```
