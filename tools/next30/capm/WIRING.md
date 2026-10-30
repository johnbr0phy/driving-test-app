# CAPM (`capm`) wiring for the integrator

v2 exam, modelled on PMP / AWS SAA. Files already written (unique to this exam):
`tools/capm/*` (6 domain sources as Python data, `build.py`, `sources.md`),
`data/v2/capm/questions.json` (plain array, 180 items), `lib/v2/exams/capm.ts` (export `CAPM`),
`lib/v2/banks/capm.ts` (`plainBank`), `app/capm/*` (layout, root redirect, dashboard, practice/[n],
test/[id], test/[id]/results; copied from `app/pmp/`), `app/capm-practice-test/page.tsx`.

Rebuild: `python3 -I tools/capm/build.py`, then
`python3 -I tools/validate_v2_bank.py capm '{"1": {"capm": {"1": 75}}, "2": {"capm": {"1": 75}}}'`
(passes: 180 questions, 0 stimuli, 0 problems). Do not add `capm` to `tools/build_v2_bank.py` PLANS: it has
its own build.

Screenshots still needed: `public/landing/capm-mobile.png`, `capm-desktop.png` (+ `-dark`), referenced by the landing hero.
The landing has no `ExamLandingBreadcrumbs` (the component does not exist in this tree; the PMP landing
does not use it either); add it if the integrator's tree has it.

## lib/v2/bankSizes.ts
```ts
  capm: 180,
```

## lib/v2/registry.ts
```ts
import { CAPM } from "./exams/capm";
// EXAMS_V2: add CAPM right after PMP
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ PMP, CAPM, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the pmp bank import:
```ts
import "@/lib/v2/banks/capm";          // classQuestions.ts
import '@/lib/v2/banks/capm';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `CAPM.domainLabels` (keys `capmLifecycle`, `capmRoles`, `capmPredictive`,
`capmAgile`, `capmBaRequirements`, `capmBaDelivery`), like the other v2 exams.

## app/globals.css
After the `[data-theme="pmp"]` block (light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint).
Suggested hue 210 (steel blue, matches `CAPM.theme`); 208 and 212 are close, so re-pick if it clashes
(the gap at 55 is yellow and 88 is yellow-green, both poor for white text).
```css
  /* CAPM theme: steel blue (v2 exam; matches lib/v2/exams/capm.ts theme) */
  [data-theme="capm"] {
    --brand: 210 65% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 210 70% 96%;
    --brand-hover: 210 65% 35%;
    --brand-dark: 210 65% 30%;
    --brand-darker: 210 60% 16%;
    --brand-muted: 210 35% 72%;
    --brand-border: 210 40% 80%;
    --brand-border-light: 210 40% 90%;
    --brand-gradient-to: 195 60% 96%;
  }
```

## lib/shareCards.ts
```ts
  "capm": {
    "color": "hsl(210, 65%, 40%)",
    "tint": "hsl(210, 70%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  capm: { title: "CAPM Certified Associate in Project Management", description: "Practice questions on project management fundamentals, predictive and agile methods, and business analysis." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line, after pmp
  pmp: "GLOBAL", capm: "GLOBAL",
```
Not in `NON_DRIVING_TESTS` (GLOBAL tests are listed in every country).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  capm: "PMI Certified Associate in Project Management on the current CAPM outline. Entry-level questions on life cycles, roles, ethics, scheduling and earned value, Scrum and Kanban, and business analysis.",
// EXAM_ORG
  capm: "PMI · CAPM exam content outline",
// SEARCH_ALIASES
  capm: "capm pmi certified associate in project management certification exam prep entry level project management agile scrum business analysis pmbok",
```
Hub group: join PMP in "Business and project management":
```ts
  { title: "Business and project management", ids: ["pmp", "capm" /* , itil, psm */] },
```
If PMP's `RELATED_OVERRIDES` entry stays, add `capm` first in it so the two PMI exams cross-link:
```ts
  pmp: ["capm", "secplus", "aws", "aplus"],
```

## lib/examFacts.ts
```ts
  capm: {
    answer:
      "The CAPM exam has 150 questions in 3 hours, of which 135 are scored and 15 are unscored pretest items. It follows PMI's CAPM Examination Content Outline: Project Management Fundamentals and Core Concepts 36%, Predictive Plan-Based Methodologies 17%, Agile Frameworks and Methodologies 20% and Business Analysis Frameworks 27%. PMI does not publish a pass mark: results are pass or fail with a rating for each domain from Above Target to Needs Improvement. Candidates need a secondary diploma and 23 hours of project management education.",
    rows: [
      { label: "Questions", value: "150 (135 scored)" },
      { label: "Time", value: "3 hours" },
      { label: "Domains", value: "Fundamentals 36%, Predictive 17%, Agile 20%, Business Analysis 27%" },
      { label: "Question types", value: "Multiple choice, multiple response, matching, hotspot, fill-in-the-blank" },
      { label: "Result", value: "Pass or fail, plus a rating per domain" },
      { label: "Eligibility", value: "Secondary diploma and 23 hours of project management education" },
      { label: "Given by", value: "PMI, at Pearson VUE test centers or online" },
    ],
    basedOn: "the PMI CAPM Examination Content Outline (2023, current in 2026)",
    source: { name: "PMI", url: "https://www.pmi.org/certifications/certified-associate-capm" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, next to `pmp` (the landing calls `classFaqJsonLd("capm")` and `<ExamClassFaq examId="capm" />`):
```ts
  capm: "a project management course",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"capm"` after `"pmp"`.

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the PMP bullet in the v2 section:
```md
- **CAPM** (`/capm`, landing `/capm-practice-test`, `[data-theme="capm"]` steel blue, region GLOBAL, hub group "Business and project management"): PMI Certified Associate in Project Management on the CAPM Examination Content Outline from 2023, still current in 2026 (Fundamentals 36%, Predictive 17%, Agile 20%, Business Analysis 27%, 19 tasks; the real exam is 150 items, 135 scored, in 3 hours). Two 75-item tests in 90 minutes (half length at the real pace), Test 2 held out, 6 drills (`capmLifecycle` 1.1-1.2, `capmRoles` 1.3-1.5, `capmPredictive`, `capmAgile`, `capmBaRequirements` 4.1-4.3, `capmBaDelivery` 4.4-4.6; 14/13/13/15/11/9 per test, 30 drill-only items), so the dashboard is 8 steps. Entry-level, knowledge-based items, none shared with PMP. Formats: single answer, "Choose two", matching as `matrix`, and fill-in-the-blank as typed `numeric` items (CV, SV, CPI, SPI, critical path, float, velocity, channels, payback; "Type the number only"); hotspots are not modelled. Bank `data/v2/capm/questions.json` (180 original items, prefix `CAPM-`, plain array) built from `tools/capm/` by its own `tools/capm/build.py`. No pass mark is published: 70 is a readiness line. Sources in `tools/capm/sources.md`.
```
