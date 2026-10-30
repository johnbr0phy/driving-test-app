# PMP (`pmp`) wiring for the integrator

v2 exam, modelled on Security+ / AWS CCP. Files already written (unique to this exam):
`tools/pmp/*` (7 domain sources as Python data, `stimuli.json`, `build.py`, `sources.md`),
`data/v2/pmp/questions.json` (object form `{ stimuli, questions }`), `lib/v2/exams/pmp.ts` (export `PMP`),
`lib/v2/banks/pmp.ts` (`withStimuli`, like NCLEX), `app/pmp/*` (layout, root redirect, dashboard,
practice/[n], test/[id], test/[id]/results; copied from `app/aws-cloud-practitioner/` without the legacy
drill/stats redirects), `app/pmp-practice-test/page.tsx`.

Rebuild: `python3 -I tools/pmp/build.py`, then
`python3 -I tools/validate_v2_bank.py pmp '{"1": {"pmp": {"1": 90}}, "2": {"pmp": {"1": 90}}}'`
(passes: 210 questions, 2 stimuli, 0 problems). Do not add `pmp` to `tools/build_v2_bank.py` PLANS: it has
its own build (keys authored first and shuffled by a stem seed, case study first in each test, `$`
escaped automatically).

Screenshots still needed: `public/landing/pmp-mobile.png`, `pmp-desktop.png` (+ `-dark`), referenced by the landing hero.
`app/pmp-practice-test/page.tsx` has no `ExamLandingBreadcrumbs` because that component does not exist in
this tree (the AWS and REx-PN landings do not use it either); add it if the integrator's tree has it.

## lib/v2/bankSizes.ts
```ts
  pmp: 210,
```

## lib/v2/registry.ts
```ts
import { PMP } from "./exams/pmp";
// EXAMS_V2: add PMP after AWS (or after the other IT/business exams in this wave)
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ SECPLUS, APLUS, AWS, PMP, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the aws bank import:
```ts
import "@/lib/v2/banks/pmp";          // classQuestions.ts
import '@/lib/v2/banks/pmp';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `PMP.domainLabels` (keys `pmpTeam`, `pmpStakeholders`, `pmpPlanning`,
`pmpScheduleCost`, `pmpDelivery`, `pmpGovernance`, `pmpRisk`), like the other v2 exams.

## app/globals.css
After the `[data-theme="aws"]` block (light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint).
Hue 236 (slate indigo) is free: neighbours are 232 and 240. The teal range 165 to 190 is crowded.
```css
  /* PMP theme: slate indigo (v2 exam; matches lib/v2/exams/pmp.ts theme) */
  [data-theme="pmp"] {
    --brand: 236 48% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 236 60% 96%;
    --brand-hover: 236 48% 37%;
    --brand-dark: 236 48% 30%;
    --brand-darker: 236 45% 16%;
    --brand-muted: 236 30% 72%;
    --brand-border: 236 35% 80%;
    --brand-border-light: 236 35% 90%;
    --brand-gradient-to: 250 55% 96%;
  }
```

## lib/shareCards.ts
```ts
  "pmp": {
    "color": "hsl(236, 48%, 42%)",
    "tint": "hsl(236, 60%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  pmp: { title: "PMP Project Management Professional", description: "Practice situational questions on people, process and business environment, with case studies and earned value math." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line
  aplus: "GLOBAL", secplus: "GLOBAL", aws: "GLOBAL", pmp: "GLOBAL",
```
Not in `NON_DRIVING_TESTS` (that set is for country-specific tests; GLOBAL tests are listed in every country).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  pmp: "PMI Project Management Professional on the July 2026 outline. Situational questions on leading teams, stakeholders, planning, schedule and earned value, procurement, governance, compliance and risk, across predictive, agile and hybrid projects.",
// EXAM_ORG
  pmp: "PMI · July 2026 exam content outline",
// SEARCH_ALIASES
  pmp: "pmp pmi project management professional certification exam prep capm agile hybrid predictive earned value evm pmbok project manager",
// RELATED_OVERRIDES (it would otherwise sit alone in its group)
  pmp: ["secplus", "aws", "aplus"],
```
Hub group: propose a new group right after "IT certifications":
```ts
  { title: "Business and project management", ids: ["pmp"] },
```
If a one-exam group looks thin, join "IT certifications" instead (many PMP candidates are in IT); it fits
either way. If other business exams land in this wave (for example CAPM or a PMI-ACP), they belong in the
new group.

## lib/examFacts.ts
```ts
  pmp: {
    answer:
      "The PMP exam has 180 questions in 240 minutes, of which 170 are scored and 10 are unscored pretest items. Since the July 2026 Examination Content Outline it opens with a case-study section and has two 10-minute breaks, and it covers People 33%, Process 41% and Business Environment 26%, with about 40% of items on predictive approaches and 60% on agile or hybrid ones. PMI does not publish a pass mark: results are pass or fail with a rating for each domain from Above Target to Needs Improvement.",
    rows: [
      { label: "Questions", value: "180 (170 scored)" },
      { label: "Time", value: "240 minutes, two 10-minute breaks" },
      { label: "Domains", value: "People 33%, Process 41%, Business Environment 26%" },
      { label: "Approaches", value: "About 40% predictive, 60% agile or hybrid" },
      { label: "Result", value: "Pass or fail, plus a rating per domain" },
      { label: "Retakes", value: "Up to 3 attempts in the 1-year eligibility period" },
      { label: "Given by", value: "PMI, at Pearson VUE test centers or online" },
    ],
    basedOn: "the PMI PMP Examination Content Outline (July 2026)",
    source: { name: "PMI", url: "https://www.pmi.org/certifications/project-management-pmp/new-exam" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, near `aws`:
```ts
  pmp: "a project management course",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"pmp"` after `"aws"`.

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger like other new exams).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering: they read `EXAMS_V2` and the catalog, so `/pmp-practice-test` joins the exams
sitemap and `/og/pmp` works. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the AWS CCP bullet in the v2 section:
```md
- **PMP** (`/pmp`, landing `/pmp-practice-test`, `[data-theme="pmp"]` slate indigo, region GLOBAL, hub group "Business and project management"): PMI Project Management Professional on the Examination Content Outline effective July 2026 (People 33%, Process 41%, Business Environment 26%, 26 tasks; about 40% predictive and 60% agile or hybrid items; the real exam is 180 items, 170 scored, in 240 minutes, opening with a case-study section). Two 90-item tests in 120 minutes (the real pace), Test 2 held out, 7 drills that group the 26 tasks (`pmpTeam`, `pmpStakeholders`, `pmpPlanning`, `pmpScheduleCost`, `pmpDelivery`, `pmpGovernance`, `pmpRisk`; 15/15/13/14/10/14/9 per test, 30 drill-only items), so the dashboard is 9 steps. Each test opens with a five-item case study (shared stimuli `PMP-CS1` warehouse system, `PMP-CS2` smart water meters, both with an EVM table). Formats: single answer, "Choose two", matching as `matrix`, and calculations as typed `numeric` items (EVM, PERT, float, channels, EMV; "Type the number only"; the real ECO lists no fill-in-the-blank type); hotspots are not modelled. Bank `data/v2/pmp/questions.json` (210 original situational items, prefix `PMP-`, object form with `stimuli`) built from `tools/pmp/` by its own `tools/pmp/build.py` (Python-data sources with approach tags P/A/H, keys authored first and shuffled by a stem seed). No pass mark is published: the goal picker's 70 is a readiness line and `scoreNote` explains PMI's Above Target/Target/Below Target/Needs Improvement ratings. Sources in `tools/pmp/sources.md`.
```
