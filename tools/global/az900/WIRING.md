# AZ-900 (`az900`) wiring for the integrator

v2 exam, modelled on AWS CCP. Files already written (unique to this exam):
`tools/az900/*` (8 domain sources as Python, `build.py`, `sources.md`), `data/v2/az900/questions.json`,
`lib/v2/exams/az900.ts` (export `AZ900`), `lib/v2/banks/az900.ts`, `app/azure-fundamentals/*`
(layout, page, dashboard, practice/[n], test/[id], test/[id]/results, copied from `app/rex-pn/`),
`app/az-900-practice-test/page.tsx`.

Rebuild: `python3 -I tools/az900/build.py`, then
`python3 -I tools/validate_v2_bank.py az900 '{"1": {"az900": {"1": 50}}, "2": {"az900": {"1": 50}}}'`
(passes: 150 questions, 0 stimuli, 0 problems). Do not add `az900` to `tools/build_v2_bank.py` PLANS: it has its own build (keys authored first, shuffled by a stem-seeded RNG; prints key-longest share, currently 2/128 = 1.6% strict).

Screenshots still needed: `public/landing/az900-mobile.png`, `az900-desktop.png` (+ `-dark`), referenced by the landing hero.

## lib/v2/bankSizes.ts
```ts
  az900: 150,
```

## lib/v2/registry.ts
```ts
import { AZ900 } from "./exams/az900";
// EXAMS_V2: add AZ900 right after AWS
export const EXAMS_V2: ExamV2Config[] = [/* ... */ SECPLUS, APLUS, AWS, AZ900, TIMESTABLES /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the aws bank import:
```ts
import "@/lib/v2/banks/az900";          // classQuestions.ts
import '@/lib/v2/banks/az900';          // mcpV2Practice.ts
```

## app/globals.css
After the `[data-theme="aws"]` block (light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint). Hue 206 is Azure blue; if it clashes with SAT blue, 195 (cyan-blue) is a fallback, and update `theme` in `lib/v2/exams/az900.ts` to match.
```css
  /* AZ-900 theme: Azure blue (v2 exam; matches lib/v2/exams/az900.ts theme) */
  [data-theme="az900"] {
    --brand: 206 100% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 206 100% 95%;
    --brand-hover: 206 100% 33%;
    --brand-dark: 206 100% 28%;
    --brand-darker: 206 90% 16%;
    --brand-muted: 206 60% 72%;
    --brand-border: 206 70% 80%;
    --brand-border-light: 206 60% 89%;
    --brand-gradient-to: 196 90% 96%;
  }
```

## lib/region.ts
```ts
// TEST_REGIONS: on the line with aws
  aplus: "GLOBAL", secplus: "GLOBAL", aws: "GLOBAL", az900: "GLOBAL",
// NON_DRIVING_TESTS: add "az900"
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  az900: "Microsoft Azure Fundamentals (AZ-900). Cloud models and service types, regions and availability zones, compute, networking and storage, Microsoft Entra ID and Zero Trust, cost management, Azure Policy, resource locks and Azure Monitor.",
// EXAM_ORG
  az900: "Microsoft AZ-900",
// SEARCH_ALIASES
  az900: "az-900 az900 azure fundamentals microsoft azure fundamentals microsoft certified azure fundamentals azure certification cloud fundamentals microsoft cloud exam entra id",
// RELATED_OVERRIDES
  az900: ["aws", "secplus", "aplus"],
// Hub group "IT certifications"
  { title: "IT certifications", ids: ["aplus", "secplus", "aws", "az900"] },
```
(If `aws` has a `RELATED_OVERRIDES` entry, add `"az900"` to it as well.)

## lib/examFacts.ts
```ts
  az900: {
    answer:
      "The Microsoft Azure Fundamentals exam (AZ-900) gives you 45 minutes; Microsoft does not publish a fixed question count, but candidates usually see 40 to 60 questions. It is scored from 1 to 1000 with 700 to pass. Questions include multiple choice, multiple response, yes/no statement sets and matching. It covers Describe cloud concepts (25 to 30%), Describe Azure architecture and services (35 to 40%) and Describe Azure management and governance (30 to 35%), per the skills measured as of July 20, 2026.",
    rows: [
      { label: "Questions", value: "About 40 to 60 (Microsoft does not publish a fixed count)" },
      { label: "Time", value: "45 minutes" },
      { label: "Passing score", value: "700 on a 1 to 1000 scale" },
      { label: "Price", value: "Varies by country (99 USD in the US)" },
      { label: "Given by", value: "Microsoft, through Pearson VUE (test center or online) or Certiport for students" },
      { label: "Retakes", value: "First retake after 24 hours; longer waits after that" },
    ],
    basedOn: "the Microsoft Learn AZ-900 study guide (skills measured as of July 20, 2026)",
    source: { name: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/" },
  },
```

## types/index.ts and i18n/*
Nothing: v2 exams carry their own `domainLabels` (azCloud, azServiceTypes, azCore, azComputeNet, azStorage, azIdentity, azCostGov, azManage) in the config.

## components/exam/ExamClassFaq.tsx
After `aws`:
```ts
  az900: "a cloud computing course",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"az900"` after `"aws"`.

## lib/sitemaps.ts, app/og/[examId]/route.tsx
Nothing: both read `EXAMS_V2`. Bump the exams date in `lib/seoDates.ts` with the wave.

## lib/tigerAssets.ts
Nothing (falls back to the DMV tiger). `az900: "aws"` in `BORROWED_SETS` would give it the AWS tiger if wanted.

## CLAUDE.md
Add after the AWS CCP bullet in the v2 section:
```md
- **AZ-900** (`/azure-fundamentals`, landing `/az-900-practice-test`, `[data-theme="az900"]` Azure blue, region GLOBAL, hub group "IT certifications"): Microsoft Azure Fundamentals, two 50-item tests in 45 minutes with free navigation, Test 2 held out, 8 drills by study-guide sub-area (`azCloud`, `azServiceTypes`, `azCore`, `azComputeNet`, `azStorage`, `azIdentity`, `azCostGov`, `azManage`; 9/5/5/6/4/4/9/8 per test from pools 27/15/15/19/13/14/25/22, so cloud concepts 28%, architecture and services 38%, management and governance 34%, skills measured as of July 20, 2026). Bank `data/v2/az900/questions.json` (150 original items, prefix `AZ900-`, 50 drill-only) built by its own `tools/az900/build.py` from Python sources in `tools/az900/` (helpers `S`, `M`, `YN`, `MT`; keys written first, shuffled by a stem seed). Yes/no statement sets are `matrix` with Yes/No columns and drag-and-drop matching is `matrix` with service columns, alongside single answer and "Choose two". Product names as of 2026 (Microsoft Entra ID, Defender for Cloud, Purview). Percent score; the real 700 of 1000 is explained in `scoreNote`. Sources in `tools/az900/sources.md`.
```
