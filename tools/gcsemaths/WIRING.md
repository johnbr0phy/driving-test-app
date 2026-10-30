# GCSE Maths Foundation (`gcsemaths`, v2): wiring for the integrator

Own files already written: `lib/v2/exams/gcsemaths.ts`, `lib/v2/banks/gcsemaths.ts`,
`data/v2/gcsemaths/questions.json` (built by `python3 tools/gcsemaths/build.py`),
`app/gcse-maths/*` (copied from `app/ged/`), `app/gcse-maths-foundation-practice-test/page.tsx`.
No new Basics file (it reuses shared skills only), no figures, no new icon (`calculator`).
`lib/v2/bankSizes.ts` gets `gcsemaths: 207,` from the validator.

Validate: `python3 -I tools/validate_v2_bank.py gcsemaths '{"1": {"p1": {"1": 20}, "p2": {"1": 20}, "p3": {"1": 20}}, "2": {"p1": {"1": 20}, "p2": {"1": 20}, "p3": {"1": 20}}}'`

## lib/v2/registry.ts

```ts
import { GCSEMATHS } from "./exams/gcsemaths";
```
and append `GCSEMATHS` to `EXAMS_V2` (after `TIMESTABLES`).

## lib/server/classQuestions.ts

```ts
import "@/lib/v2/banks/gcsemaths";
```
(alphabetical, after `"@/lib/v2/banks/emt"`).

## app/globals.css

Light block, next to the timestables block:
```css
  /* GCSE Maths theme: olive green (v2 exam; matches lib/v2/exams/gcsemaths.ts theme) */
  [data-theme="gcsemaths"] {
    --brand: 82 65% 28%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 82 70% 95%;
    --brand-hover: 82 65% 23%;
    --brand-dark: 82 65% 20%;
    --brand-darker: 82 60% 13%;
    --brand-muted: 82 40% 68%;
    --brand-border: 82 40% 76%;
    --brand-border-light: 82 40% 88%;
    --brand-gradient-to: 70 75% 94%;
  }
```
Dark block (output of `tools/gen_dark_brand_css.py` for this theme), next to `.dark [data-theme="timestables"]`:
```css
  .dark [data-theme="gcsemaths"] {
    --brand: 82 65% 30.4%;
    --brand-hover: 82 65% 23%;
    --brand-light: 82 45% 13%;
    --brand-gradient-to: 70 40% 11%;
    --brand-border-light: 82 35% 24%;
    --brand-border: 82 40% 34%;
    --brand-muted: 82 40% 45%;
    --brand-dark: 82 65% 65%;
    --brand-darker: 82 60% 78%;
  }
```
Hue 82 was free (gold 42-56 is taken by foodmgr and forklift). White on brand is 5.3:1.

## lib/testCatalog.ts

EXAM_BLURBS:
```ts
  gcsemaths: "GCSE Maths Foundation tier practice for England: two sets of three practice papers (Paper 1 non-calculator, Papers 2 and 3 calculator) weighted like the real exam, plus five topic drills that teach the basics first. Free.",
```
EXAM_ORG:
```ts
gcsemaths: "Foundation tier · AQA, Pearson Edexcel and OCR"
```
SEARCH_ALIASES:
```ts
  gcsemaths: "gcse maths math mathematics foundation tier practice paper past paper mock exam revision resit grade 4 grade 5 non calculator calculator aqa edexcel ocr year 10 year 11 ks4 key stage 4 england uk",
```
GROUPS: suggested new group replacing "Primary school" (shared with the KS2 SATs agent):
```ts
  { title: "UK school tests", ids: ["timestables", "ks2", "gcsemaths"] },
```
(use the KS2 agent's real id). RELATED_OVERRIDES, if the group is still small:
```ts
  gcsemaths: ["timestables", "ged", "accuplacer"],
```

## lib/region.ts

`TEST_REGIONS`: add `gcsemaths: "UK"`. `NON_DRIVING_TESTS`: add `"gcsemaths"`.

## lib/examFacts.ts

```ts
  gcsemaths: {
    answer:
      "GCSE Mathematics in England is three written papers of 1 hour 30 minutes and 80 marks each: Paper 1 is non-calculator, and Papers 2 and 3 allow a calculator. The Foundation tier is graded 1 to 5 (4 is a standard pass, 5 a strong pass); about 25% of the marks are number, 20% algebra, 25% ratio, proportion and rates of change, 15% geometry and measures and 15% probability and statistics. AQA, Pearson Edexcel and OCR all follow the same Department for Education subject content, and grade boundaries are set after each exam.",
    rows: [
      { label: "Papers", value: "3 papers, 1 hour 30 minutes and 80 marks each" },
      { label: "Calculator", value: "Not on Paper 1; allowed on Papers 2 and 3" },
      { label: "Grades", value: "Foundation tier 1 to 5; 4 is a standard pass, 5 a strong pass" },
      { label: "Topics", value: "Number 25%, algebra 20%, ratio 25%, geometry 15%, probability and statistics 15%" },
      { label: "Pass mark", value: "Boundaries change by board and year; recently about 60% to 67% for a grade 4" },
      { label: "Exam boards", value: "AQA, Pearson Edexcel and OCR, same DfE subject content" },
    ],
    basedOn: "the Department for Education GCSE mathematics subject content (2013) and Ofqual's Foundation tier weightings, checked October 2026",
    source: { name: "GOV.UK: GCSE mathematics subject content and assessment objectives", url: "https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives" },
    tigertest:
      "Tigertest has two practice tests, each three timed papers of 20 questions (non-calculator, calculator, calculator) weighted like the Foundation tier, and five topic drills that open with short lessons on the basics. Every question has one final answer; the real papers also give marks for working. All of it is free with no account required.",
  },
```

## components/exam/ExamClassFaq.tsx

```ts
  gcsemaths: "GCSE Maths",
```
(renders "I teach GCSE Maths. Can my students use Tigertest?")

## components/TeachNudge.tsx

Add `"gcsemaths"` to `TEACHER_LED` (next to `"timestables"`; the comment could become "UK school classes").

## lib/tigerAssets.ts

Nothing: no tiger set yet, so `getTigerAsset("gcsemaths", n)` falls back to the DMV faces.

## Landing screenshots

`public/landing/gcsemaths-{mobile,desktop}{,-dark}.png` do not exist yet. With a running build:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing gcsemaths:gcse-maths:v2:number`

## OG image, sitemap, next.config.ts, lib/seoDates.ts

Nothing to add: `/og/gcsemaths` and the exams sitemap read `EXAMS_V2`, `EXAM_LANDINGS_UPDATED_AT` is already 2026-10-29, and there are no old URLs to redirect.

## CLAUDE.md (v2 exams list, after the EMT/Security+ bullets)

```md
- **GCSE Maths** (`/gcse-maths`, landing `/gcse-maths-foundation-practice-test`, `[data-theme="gcsemaths"]` olive, hub group "UK school tests"): GCSE Mathematics Foundation tier (England, all boards, DfE 2013 content). Each practice test is the three papers cut to 20 items in 35 minutes (`p1` non-calculator, `p2` and `p3` calculator), 5 number, 4 algebra, 5 ratio, 3 geometry, 3 statistics per paper (Ofqual Foundation 25/20/25/15/15); Test 2 held out. 207 items in `data/v2/gcsemaths/questions.json`, built by `tools/gcsemaths/build.py` from `tools/gcsemaths/q_*.py` (edit the sources; the build rotates key letters). Five drills, one per domain, each with shared math Basics, so the dashboard is 12 steps; number and algebra drill Paper 1 items, ratio Paper 2, geometry and statistics Paper 3, each topped up with `test: 0` items. Percent score; multi-mark questions are one final answer and goal notes put a grade 4 near 65%, a grade 5 near 75%.
```
