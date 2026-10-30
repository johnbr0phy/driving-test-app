# GMAT Focus Edition (`gmat`) wiring for the integrator

v2 exam, three timed sections like the SAT but not adaptive. Files already written (unique to this exam):
`tools/gmat/*` (`quant.py`, `verbal.py`, `di.py` as Python data, `build.py`, `sources.md`),
`data/v2/gmat/questions.json` (object form `{ stimuli, questions }`: 10 reading passages and 3 multi-source sets),
`lib/v2/exams/gmat.ts` (export `GMAT`, plus `gmatTotal`), `lib/v2/banks/gmat.ts` (`withStimuli`),
`app/gmat/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results; copied from `app/pmp/`),
`app/gmat-focus-practice-test/page.tsx`.

Rebuild: `python3 -I tools/gmat/build.py`, then
`python3 -I tools/validate_v2_bank.py gmat '{"1": {"quant": {"1": 21}, "verbal": {"1": 23}, "di": {"1": 20}}, "2": {"quant": {"1": 21}, "verbal": {"1": 23}, "di": {"1": 20}}}'`
(passes: 169 questions, 13 stimuli, 0 problems). Do not add `gmat` to `tools/build_v2_bank.py` PLANS: it has its own build
(items authored in presentation order per section; Quant, DS and numeric DI options keep their order with `lockedOrder`,
verbal options are authored key-first and seed-shuffled).

Screenshots still needed: `public/landing/gmat-mobile.png`, `gmat-desktop.png` (+ `-dark`), referenced by the landing hero.
The landing has no `ExamLandingBreadcrumbs` (the component does not exist in this tree; the PMP template does not use it). Add it if your tree has it.

Do not share items with the GRE (`gre`) bank: everything here is original and GMAT-specific (no geometry, no quantitative comparison, no text completion).

## lib/v2/bankSizes.ts
```ts
  gmat: 169,
```

## lib/v2/registry.ts
```ts
import { GMAT } from "./exams/gmat";
// EXAMS_V2: after ACT (or after GRE if it lands in this wave)
export const EXAMS_V2: ExamV2Config[] = [GED, SAT, ACT, GMAT, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the sat bank import:
```ts
import "@/lib/v2/banks/gmat";          // classQuestions.ts
import '@/lib/v2/banks/gmat';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `GMAT.domainLabels` (keys `gmatArith`, `gmatAlgebra`, `gmatRC`, `gmatCR`, `gmatDS`,
`gmatTables`, `gmatTwoPart`).

## app/globals.css
After the `[data-theme="act"]` block (light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint). Hue 340
(raspberry) sits in the gap between 325 and 350 among current v2 themes; re-pick if the wave fills it.
```css
  /* GMAT theme: raspberry (v2 exam; matches lib/v2/exams/gmat.ts theme) */
  [data-theme="gmat"] {
    --brand: 340 62% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 340 70% 96%;
    --brand-hover: 340 62% 35%;
    --brand-dark: 340 62% 30%;
    --brand-darker: 340 55% 16%;
    --brand-muted: 340 30% 72%;
    --brand-border: 340 35% 80%;
    --brand-border-light: 340 35% 90%;
    --brand-gradient-to: 350 60% 96%;
  }
```

## lib/shareCards.ts
```ts
  "gmat": {
    "color": "hsl(340, 62%, 40%)",
    "tint": "hsl(340, 70%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  gmat: { title: "GMAT Focus Edition Practice Tests", description: "Timed Quant, Verbal and Data Insights sections with a 205 to 805 score estimate and drills by question type." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line
  pmp: "GLOBAL", gmat: "GLOBAL",
```
Not in `NON_DRIVING_TESTS` (GLOBAL tests are listed in every country).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  gmat: "Two full GMAT Focus Edition practice tests: Quantitative Reasoning, Verbal Reasoning and Data Insights in 45-minute sections, with data sufficiency, table, graph, two-part and multi-source questions and a 205 to 805 score estimate.",
// EXAM_ORG
  gmat: "GMAC · GMAT Focus Edition",
// SEARCH_ALIASES
  gmat: "gmat focus edition gmac mba business school graduate management admission test data insights data sufficiency critical reasoning quant verbal 805",
// RELATED_OVERRIDES
  gmat: ["gre", "sat", "act"],   // drop "gre" if the GRE does not land in this wave
```
Hub group: "GED, college, military & nursing school entrance", after `act` (or a new "Graduate school admissions" group with
`gre` and `gmat` if the GRE lands too; that is the better home).

## lib/examFacts.ts
```ts
  gmat: {
    answer:
      "The GMAT Focus Edition has 64 questions in 2 hours 15 minutes: Quantitative Reasoning (21 questions), Verbal Reasoning (23) and Data Insights (20), 45 minutes each, in any order you choose, with one optional 10-minute break. Each section is scored 60 to 90 and the total runs from 205 to 805; the exam is computer adaptive, and you may review and change up to three answers per section. There is no essay, no geometry and no sentence correction; an on-screen calculator is allowed only in Data Insights.",
    rows: [
      { label: "Questions", value: "64: Quant 21, Verbal 23, Data Insights 20" },
      { label: "Time", value: "2 hr 15 min, 45 minutes per section" },
      { label: "Break", value: "One optional 10-minute break" },
      { label: "Score", value: "205 to 805 total; 60 to 90 per section" },
      { label: "Calculator", value: "Data Insights only" },
      { label: "Format", value: "Computer adaptive; up to 3 answer changes per section" },
      { label: "Given by", value: "GMAC, at test centers or online" },
    ],
    basedOn: "GMAC's GMAT Focus Edition exam structure (as of October 2026)",
    source: { name: "GMAC (mba.com)", url: "https://www.mba.com/exams/gmat-exam/about/exam-structure" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, near `sat`:
```ts
  gmat: "GMAT prep",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"gmat"` after `"act"`.

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the ACT bullet in the v2 section:
```md
- **GMAT** (`/gmat`, landing `/gmat-focus-practice-test`, `[data-theme="gmat"]` raspberry, region GLOBAL): GMAT Focus Edition, three 45-minute sections, Quantitative Reasoning 21 (problem solving only, arithmetic and algebra, no calculator; optional 10-minute break after it via `breakAfter`), Verbal Reasoning 23 (13 reading comprehension in four shared passages, 10 critical reasoning) and Data Insights 20 with the calculator (7 Data Sufficiency with the five fixed choices, 3 Table Analysis as True/False `matrix`, 4 Graphics Interpretation as `cloze` with the graph given as a pipe table or in words, 3 Two-Part Analysis as `matrix`, one part per row, or classify-each for verbal two-part items, and one 3-item Multi-Source Reasoning set on a shared stimulus). Two fixed (not adaptive) tests, Test 2 held out; 7 drills (`gmatArith`, `gmatAlgebra`, `gmatCR`, `gmatRC`, `gmatDS`, `gmatTables`, `gmatTwoPart`), so the dashboard is 9 steps. Sections scale 60 to 90 with `curve()` (step 1); `gmatTotal()` maps the sum to 205 to 805 in steps of 10, an estimate. Bank `data/v2/gmat/questions.json` (169 original items, prefix `GMAT-`, object form with 13 stimuli) built by its own `tools/gmat/build.py` from `quant.py`, `verbal.py`, `di.py` (items in presentation order; Quant, DS and numeric MSR options use `lockedOrder`). Sources in `tools/gmat/sources.md`.
```
