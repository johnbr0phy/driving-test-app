# FAA Private Pilot Airplane (`faapvt`) wiring for the integrator

v2 exam, modelled on AWS CCP / PMP (plain array bank, no stimuli). Files already written (unique to this exam):
- `tools/faapvt/*`: 8 domain sources as Python data (`pvtRegs.py` ... `pvtHuman.py`), `build.py`, `sources.md`
- `data/v2/faapvt/questions.json` (202 items, plain array, ids `FAAPVT-T1-001..`, `-T2-..`, `-D-..`)
- `lib/v2/exams/faapvt.ts` (export `FAAPVT`), `lib/v2/banks/faapvt.ts` (`plainBank`)
- `app/private-pilot/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results; copied from `app/pmp/`)
- `app/private-pilot-written-test/page.tsx` (landing, copied from the PMP landing; no `ExamLandingBreadcrumbs`
  because the component does not exist in this tree; add `<ExamLandingBreadcrumbs examId="faapvt" />` after the
  JSON-LD script if the integrator's tree has it)

Rebuild: `python3 -I tools/faapvt/build.py`, then
`python3 -I tools/validate_v2_bank.py faapvt '{"1": {"par": {"1": 60}}, "2": {"par": {"1": 60}}}'`
(passes: `faapvt: 202 questions, 0 stimuli, 0 problems`; key strictly longest 17/202 = 8%).
Do not add `faapvt` to `tools/build_v2_bank.py` PLANS: it has its own build (keys authored first, options
shuffled by a stem seed; every item has 3 options like the real test).

Dashboard: 8 drills + 2 tests = 10 steps. Section key `par`. Test 2 held out.

Screenshots still needed: `public/landing/faapvt-mobile.png`, `faapvt-desktop.png` (+ `-dark`), referenced by the landing hero.

## lib/v2/bankSizes.ts
```ts
  faapvt: 202,
```

## lib/v2/registry.ts
```ts
import { FAAPVT } from "./exams/faapvt";
// EXAMS_V2: add FAAPVT (near the other US licence exams in this wave)
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ FAAPVT, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the pmp bank import:
```ts
import "@/lib/v2/banks/faapvt";       // classQuestions.ts
import '@/lib/v2/banks/faapvt';       // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `FAAPVT.domainLabels` (keys `pvtRegs`, `pvtAirspace`, `pvtWeather`,
`pvtWxServices`, `pvtAircraft`, `pvtPerformance`, `pvtNav`, `pvtHuman`), like the other v2 exams.

## app/globals.css
After the `[data-theme="part107"]` block (light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint).
Suggested hue 76 (sectional-chart olive green); the blue 195 to 230 range is crowded (part107 is 199).
Keep `lib/v2/exams/faapvt.ts` `theme` in step if you re-pick.
```css
  /* FAA Private Pilot theme: olive (v2 exam; matches lib/v2/exams/faapvt.ts theme) */
  [data-theme="faapvt"] {
    --brand: 76 60% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 76 55% 95%;
    --brand-hover: 76 60% 26%;
    --brand-dark: 76 60% 22%;
    --brand-darker: 76 55% 13%;
    --brand-muted: 76 30% 68%;
    --brand-border: 76 35% 76%;
    --brand-border-light: 76 35% 88%;
    --brand-gradient-to: 199 80% 96%;
  }
```

## lib/shareCards.ts
```ts
  "faapvt": {
    "color": "hsl(76, 60%, 30%)",
    "tint": "hsl(76, 55%, 95%)"
  },
```

## lib/shareCardCopy.ts
```ts
  faapvt: { title: "FAA Private Pilot Written Test", description: "Practice regulations, airspace, weather, aerodynamics, performance, navigation and human factors." },
```

## lib/region.ts
Nothing: US is the default region, so no `TEST_REGIONS` entry. Not in `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  faapvt: "FAA Private Pilot Airplane (PAR) knowledge test. Regulations, airspace, weather and weather reports, aerodynamics and systems, performance and weight and balance, navigation and human factors, three choices per question.",
// EXAM_ORG
  faapvt: "FAA · Private Pilot Airplane ACS (FAA-S-ACS-6C)",
// SEARCH_ALIASES
  faapvt: "private pilot ppl written knowledge test par faa airplane student pilot ground school checkride acs sectional",
// HUB_GROUPS: "Aviation, radio & trade licenses", right after part107
  { title: "Aviation, radio & trade licenses", ids: ["part107", "faapvt", "ham", "epa608", "foodmgr"] },
```

## lib/examFacts.ts
```ts
  faapvt: {
    answer:
      "The FAA Private Pilot Airplane (PAR) knowledge test has 60 multiple-choice questions with three answer choices each, a 2-hour time limit and a passing score of 70 percent. You must be at least 15 and have an instructor or home-study endorsement to take it at an FAA testing center. Questions come from the Private Pilot Airplane ACS and many use a figure supplement of charts and performance tables. A pass is valid for 24 calendar months.",
    rows: [
      { label: "Questions", value: "60, three choices each" },
      { label: "Time", value: "2 hours" },
      { label: "Passing score", value: "70%" },
      { label: "Minimum age", value: "15" },
      { label: "Result valid", value: "24 calendar months" },
      { label: "Given by", value: "FAA, at authorized testing centers" },
    ],
    basedOn: "the FAA Private Pilot for Airplane Category ACS (FAA-S-ACS-6C) and the FAA ACS knowledge test table",
    source: { name: "FAA", url: "https://www.faa.gov/training_testing/testing/acs" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, near `part107` (or `aws`):
```ts
  faapvt: "a private pilot ground school",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"faapvt"` (ground schools and flight schools teach it).

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the site tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the PMP bullet in the v2 section:
```md
- **Private Pilot** (`/private-pilot`, landing `/private-pilot-written-test`, `[data-theme="faapvt"]` olive, region US, hub group "Aviation, radio & trade licenses"): FAA Private Pilot Airplane (PAR) knowledge test on the Private Pilot ACS (FAA-S-ACS-6C): 60 questions with three choices (A to C), 2.0 hours (cut from 2.5 on April 24, 2023), 70% to pass. Two 60-item tests in 120 minutes, Test 2 held out, 8 drills by knowledge area (`pvtRegs`, `pvtAirspace`, `pvtWeather`, `pvtWxServices`, `pvtAircraft`, `pvtPerformance`, `pvtNav`, `pvtHuman`; 9/8/7/7/9/7/7/6 per test, an estimate since the FAA publishes no weights), so the dashboard is 10 steps. Single-answer items only, like the real test; no figure supplement, so chart symbols, METAR/TAF strings and performance numbers are written into the stem. Bank `data/v2/faapvt/questions.json` (202 original items, prefix `FAAPVT-`, plain array) built from `tools/faapvt/` by its own `tools/faapvt/build.py` (Python-data sources, key authored first and shuffled by a stem seed). Sources in `tools/faapvt/sources.md`.
```
