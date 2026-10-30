# GRE (`gre`) wiring for the integrator

v2 exam, modelled on SAT (adaptive second sections) and PMP (own build script). Files already written (unique to this exam):
`tools/gre/*` (`build.py`, `test1.py`, `test2.py`, `drill.py` as Python data, `sources.md`),
`data/v2/gre/questions.json` (object form `{ stimuli, questions }`, 194 questions, 12 stimuli),
`lib/v2/exams/gre.ts` (export `GRE`), `lib/v2/banks/gre.ts` (`withStimuli`),
`app/gre/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results; copied from `app/pmp/`),
`app/gre-practice-test/page.tsx`.

Rebuild: `python3 -I tools/gre/build.py`, then
```
python3 -I tools/validate_v2_bank.py gre '{"1": {"verbal": {"1": 12, "2:lower": 15, "2:upper": 15}, "quant": {"1": 12, "2:lower": 15, "2:upper": 15}}, "2": {"verbal": {"1": 12, "2:lower": 15, "2:upper": 15}, "quant": {"1": 12, "2:lower": 15, "2:upper": 15}}}'
```
(passes: 194 questions, 12 stimuli, 0 problems). Do not add `gre` to `tools/build_v2_bank.py` PLANS.

Dashboard: 7 drills + 2 tests = 9 steps. Not Premium (no `premium` block), no Basics.
Screenshots still needed: `public/landing/gre-mobile.png`, `gre-desktop.png` (+ `-dark`), referenced by the landing hero.
The landing has no `ExamLandingBreadcrumbs` (not in this tree, as on the PMP landing); add it if the integrator's tree has it.

## lib/v2/bankSizes.ts
```ts
  gre: 194,
```

## lib/v2/registry.ts
```ts
import { GRE } from "./exams/gre";
// EXAMS_V2: after ACT (or after PSAT if it lands in this wave)
export const EXAMS_V2: ExamV2Config[] = [GED, SAT, ACT, GRE, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the pmp bank import:
```ts
import "@/lib/v2/banks/gre";          // classQuestions.ts
import '@/lib/v2/banks/gre';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `GRE.domainLabels` (keys `greTextCompletion`, `greSentenceEquivalence`, `greReading`,
`greArithmetic`, `greAlgebra`, `greGeometry`, `greData`).

## app/globals.css
Hue 296 (plum) is free: neighbours are 292 and 300. Violet 260 to 270 is taken. Run `tools/gen_dark_brand_css.py` after.
```css
  /* GRE theme: plum (v2 exam; matches lib/v2/exams/gre.ts theme) */
  [data-theme="gre"] {
    --brand: 296 55% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 296 60% 96%;
    --brand-hover: 296 55% 35%;
    --brand-dark: 296 55% 30%;
    --brand-darker: 296 45% 16%;
    --brand-muted: 296 30% 72%;
    --brand-border: 296 35% 80%;
    --brand-border-light: 296 35% 90%;
    --brand-gradient-to: 310 55% 96%;
  }
```

## lib/shareCards.ts
```ts
  "gre": {
    "color": "hsl(296, 55%, 40%)",
    "tint": "hsl(296, 60%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  gre: { title: "GRE General Test Practice", description: "Practice adaptive Verbal and Quant sections in the shorter GRE format, with a 130 to 170 score estimate." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line
  pmp: "GLOBAL", gre: "GLOBAL",
```
Not in `NON_DRIVING_TESTS` (GLOBAL tests are listed in every country).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  gre: "Two full practice tests in the shorter GRE General Test format: adaptive Verbal and Quant sections on the real clock, every question type from text completion to quantitative comparison, and a 130 to 170 score estimate per measure.",
// EXAM_ORG
  gre: "ETS · shorter GRE General Test, Verbal and Quant",
// SEARCH_ALIASES
  gre: "gre general test graduate record examination ets graduate school masters phd admissions verbal reasoning quantitative reasoning quant text completion sentence equivalence quantitative comparison shorter gre",
// RELATED_OVERRIDES
  gre: ["sat", "act", "accuplacer"],
```
Hub group: "GED, college, military & nursing school entrance", after `act`:
```ts
  { title: "GED, college, military & nursing school entrance", ids: ["ged", "sat", "act", "gre", "accuplacer", "asvab", "teas", "hesi"] },
```
(If a graduate-admissions group is created for GRE and GMAT in this wave, put it there instead.)

## lib/examFacts.ts
```ts
  gre: {
    answer:
      "The GRE General Test takes about 1 hour 58 minutes since its September 2023 update. It has one Analytical Writing task (30 minutes), two Verbal Reasoning sections (12 questions in 18 minutes and 15 in 23 minutes) and two Quantitative Reasoning sections (12 questions in 21 minutes and 15 in 26 minutes). Verbal and Quant are section-level adaptive and each scored 130 to 170; Analytical Writing is scored 0 to 6. There is no pass mark: graduate programs set their own expectations.",
    rows: [
      { label: "Questions", value: "54 (27 Verbal, 27 Quant) plus 1 essay" },
      { label: "Time", value: "About 1 hour 58 minutes, no scheduled break" },
      { label: "Score", value: "130 to 170 for Verbal and for Quant; 0 to 6 for writing" },
      { label: "Adaptive", value: "Second section of each measure set by the first" },
      { label: "Calculator", value: "On-screen calculator for Quant" },
      { label: "Given by", value: "ETS, at test centers or at home" },
    ],
    basedOn: "the ETS description of the GRE General Test structure",
    source: { name: "ETS", url: "https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html" },
    tigertest:
      "Tigertest has two full adaptive GRE practice tests with Verbal and Quant score estimates and seven drills, all free with no account required. The essay is not included.",
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, near `sat`:
```ts
  gre: "GRE prep",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"gre"` after `"act"`.

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the ACT bullet in the v2 section:
```md
- **GRE** (`/gre`, landing `/gre-practice-test`, `[data-theme="gre"]` plum, region GLOBAL, hub group "GED, college, military & nursing school entrance"): the shorter GRE General Test (since Sept 2023). Verbal (12 in 18 min, then 15 in 23) and Quant (12 in 21 min, then 15 in 26, calculator), no break, no essay; each second section has `lower`/`upper` variants picked at 60% on the first, like SAT module 2. Two tests, Test 2 held out, 7 drills (`greTextCompletion`, `greSentenceEquivalence`, `greReading`, `greArithmetic`, `greAlgebra`, `greGeometry`, `greData`), 9 dashboard steps, free. Formats: one-blank text completion as `single`, two or three blanks as `cloze`; sentence equivalence as `multi` with `select: 2` of 6; reading as `single`, select-all `multi` (3 choices) and select-in-passage `highlight`; quantitative comparison as `single` with the four fixed choices and `lockedOrder`; numeric entry; multiple answer. Problem-solving items with all-number choices are sorted ascending and locked. Each measure is scaled 130 to 170 with `curve(..., 1)` (lower path caps near 153/155), composite "Verbal + Quant" 260 to 340. Bank `data/v2/gre/questions.json` (194 original items, 12 shared passages, ids `GRE-T<n>-<V1|V2L|V2U|Q1|Q2L|Q2U>-NN` and `GRE-D-<V|Q>-NN`) built by `tools/gre/build.py` from `tools/gre/test1.py`, `test2.py`, `drill.py` (keys authored first, shuffled by a stem seed; a reading item with no passage continues the previous item's stimulus). Sources in `tools/gre/sources.md`.
```
