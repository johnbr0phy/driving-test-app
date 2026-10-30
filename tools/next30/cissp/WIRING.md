# ISC2 CISSP (`cissp`) wiring for the integrator

v2 exam, modelled on Security+ / AWS SAA (own build like `awssaa`). Files already written (unique to this exam):
`tools/cissp/*` (8 domain sources as Python data, `build.py`, `sources.md`), this file,
`data/v2/cissp/questions.json`, `lib/v2/exams/cissp.ts` (export `CISSP`), `lib/v2/banks/cissp.ts`,
`app/cissp/{layout,page,dashboard/page,practice/[n]/page,test/[id]/page,test/[id]/results/page}.tsx`
(copied from `app/aws-solutions-architect/`), `app/cissp-practice-test/page.tsx`.

Rebuild: `python3 -I tools/cissp/build.py` (keys first in the sources, single and order options shuffled by a
stem seed; do not add `cissp` to `tools/build_v2_bank.py` PLANS), then
`python3 -I tools/validate_v2_bank.py cissp '{"1": {"cissp": {"1": 100}}, "2": {"cissp": {"1": 100}}}'`
(passes: 224 questions, 0 stimuli, 0 problems; key strictly longest in 23/210 single items = 11.0%).

Screenshots still needed: `public/landing/cissp-mobile.png`, `cissp-desktop.png` (+ `-dark`).
The landing has no `ExamLandingBreadcrumbs` because the template landing (`awssaa`) does not render it in
this tree; add `<ExamLandingBreadcrumbs examId="cissp" />` after the JSON-LD script if the integrator's tree has it.

## lib/v2/bankSizes.ts
```ts
  cissp: 224,
```

## lib/v2/registry.ts
```ts
import { CISSP } from "./exams/cissp";
// EXAMS_V2: add CISSP right after SECPLUS (or after the other IT exams in this wave)
..., SECPLUS, CISSP, APLUS, AWS, ...
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the secplus bank import:
```ts
import "@/lib/v2/banks/cissp";          // classQuestions.ts
import '@/lib/v2/banks/cissp';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain keys and labels live in the config (`domainLabels`: `cisspRisk`, `cisspAsset`,
`cisspArch`, `cisspNetwork`, `cisspIam`, `cisspAssess`, `cisspOps`, `cisspSoftware`).

## app/globals.css
After the `[data-theme="secplus"]` block (light; run `tools/gen_dark_brand_css.py` for the `.dark` tint).
Suggested hue 152 (deep ISC2-style green); re-pick if it clashes (iedtt suggested 145, nzroad 165), and keep
`theme` in `lib/v2/exams/cissp.ts` in step.
```css
  /* ISC2 CISSP theme: deep green (v2 exam; matches lib/v2/exams/cissp.ts theme) */
  [data-theme="cissp"] {
    --brand: 152 55% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 152 55% 95%;
    --brand-hover: 152 55% 26%;
    --brand-dark: 152 55% 22%;
    --brand-darker: 152 50% 12%;
    --brand-muted: 152 30% 70%;
    --brand-border: 152 35% 78%;
    --brand-border-light: 152 35% 88%;
    --brand-gradient-to: 170 50% 95%;
  }
```

## lib/shareCards.ts
```ts
  "cissp": {
    "color": "hsl(152, 55%, 30%)",
    "tint": "hsl(152, 55%, 95%)"
  },
```

## lib/shareCardCopy.ts
```ts
  cissp: { title: "ISC2 CISSP", description: "Practice manager-level questions across all eight CISSP domains, from risk management to secure software." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line with secplus
  aplus: "GLOBAL", secplus: "GLOBAL", cissp: "GLOBAL", ...
```
Not in `NON_DRIVING_TESTS` (GLOBAL tests are listed in every country).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  cissp: "ISC2 CISSP on the April 2024 outline. Manager-level best and first questions across all eight domains: risk management, asset security, architecture and cryptography, network security, identity and access, testing, security operations and software security.",
// EXAM_ORG
  cissp: "ISC2 · CISSP exam outline, April 2024",
// SEARCH_ALIASES
  cissp: "cissp isc2 isc² certified information systems security professional cybersecurity security manager cat exam eight domains cism",
// TEST_GROUPS: IT certifications
  { title: "IT certifications", ids: ["aplus", "secplus", "cissp", "aws", "awssaa", "az900", "ccna"] },
// RELATED_OVERRIDES (optional)
  cissp: ["secplus", "netplus", "ccna"],   // drop netplus if it is not in this wave's merge
```
The catalog entry is built from `EXAMS_V2` like `secplus`; the question count comes from `bankSizes.ts`.

## lib/examFacts.ts
```ts
  cissp: {
    answer:
      "The CISSP exam is computerized adaptive in every language: 100 to 150 questions in 3 hours, answered in order with no going back. It is scored on a 0 to 1000 scale and 700 passes. The April 15, 2024 outline weights eight domains: Security and Risk Management 16%, Asset Security 10%, Security Architecture and Engineering 13%, Communication and Network Security 13%, Identity and Access Management 13%, Security Assessment and Testing 12%, Security Operations 13% and Software Development Security 10%. Certification also needs five years of paid work in two or more domains.",
    rows: [
      { label: "Questions", value: "100 to 150 (adaptive)" },
      { label: "Time", value: "3 hours" },
      { label: "Passing score", value: "700 on a 0 to 1000 scale" },
      { label: "Domains", value: "8, weighted 10% to 16%" },
      { label: "Experience", value: "5 years in 2 or more domains (or Associate of ISC2)" },
      { label: "Given by", value: "ISC2, at Pearson VUE test centers" },
    ],
    basedOn: "the ISC2 CISSP exam outline effective April 15, 2024",
    source: { name: "ISC2", url: "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, near `secplus`:
```ts
  cissp: "a CISSP or information security course",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"cissp"` after `"secplus"`.

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering: they read `EXAMS_V2` and the catalog. Bump the exams date in `lib/seoDates.ts`.

## CLAUDE.md
Add after the Security+ bullet in the v2 section:
```md
- **CISSP** (`/cissp`, landing `/cissp-practice-test`, `[data-theme="cissp"]` deep green, region GLOBAL): ISC2 CISSP on the outline effective April 15, 2024 (the real exam is CAT in every language, 100 to 150 items in 3 hours, no going back, 700/1000 to pass). Two linear 100-item mocks (the CAT minimum) in 120 minutes, the real pace, one section with `linear: true`, not adaptive, Test 2 held out, 8 drills one per domain (`cisspRisk`, `cisspAsset`, `cisspArch`, `cisspNetwork`, `cisspIam`, `cisspAssess`, `cisspOps`, `cisspSoftware`; 16/10/13/13/13/12/13/10 per test, 3 drill-only each), so the dashboard has 10 steps. Bank `data/v2/cissp/questions.json` (224 original manager-level "best/first" items, prefix `CISSP-`) built from Python sources in `tools/cissp/` by its own `tools/cissp/build.py` (keys first, shuffled by a stem seed). Drag and drop is modelled by 7 `order` and 7 `matrix` items; hotspots are not modelled. Percent score; the real 700/1000 is in `scoreNote`. Sources in `tools/cissp/sources.md`.
```
