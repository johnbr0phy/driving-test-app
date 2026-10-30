# Google Cloud Digital Leader (`gcdl`) wiring for the integrator

v2 exam, modelled on AWS CCP (`aws`) and AWS SAA (`awssaa`). Files already written (unique to this exam):
`tools/gcdl/*` (6 section sources as Python data, `build.py`, `sources.md`), this file,
`data/v2/gcdl/questions.json`, `lib/v2/exams/gcdl.ts` (export `GCDL`), `lib/v2/banks/gcdl.ts`,
`app/google-cloud-digital-leader/{layout,page,dashboard/page,practice/[n]/page,test/[id]/page,test/[id]/results/page}.tsx`
(copied from `app/aws-solutions-architect/`), `app/google-cloud-digital-leader-practice-test/page.tsx`
(no `ExamLandingBreadcrumbs`, which does not exist in this tree; same structure as the awssaa landing).

Rebuild: `python3 -I tools/gcdl/build.py` (own build, copied from `tools/awssaa/build.py`: sources list
keys first and the build shuffles options by a stem seed; `gcdl` is NOT in `tools/build_v2_bank.py`), then
`python3 -I tools/validate_v2_bank.py gcdl '{"1": {"gcdl": {"1": 60}}, "2": {"gcdl": {"1": 60}}}'`
(passes: 200 questions, 0 problems).

Screenshots still needed: `public/landing/gcdl-mobile.png`, `gcdl-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  gcdl: 200,
```

## lib/v2/registry.ts
```ts
import { GCDL } from "./exams/gcdl";
// EXAMS_V2: add GCDL after AZ900
..., AWS, AWSSAA, AZ900, GCDL, CCNA, ...
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the awssaa bank import:
```ts
import "@/lib/v2/banks/gcdl";          // classQuestions.ts
import '@/lib/v2/banks/gcdl';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain keys and labels live in the config (`domainLabels`), like `aws`.

## app/globals.css
After the `[data-theme="az900"]` block (light; run `tools/gen_dark_brand_css.py` once for the `.dark` tint).
Suggested hue 217 (Google blue); it may sit close to az900 or secplus, re-pick if it clashes, and keep
`theme` in `lib/v2/exams/gcdl.ts` in step.
```css
  /* Google Cloud Digital Leader theme: Google blue (v2 exam; matches lib/v2/exams/gcdl.ts theme) */
  [data-theme="gcdl"] {
    --brand: 217 80% 46%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 217 90% 96%;
    --brand-hover: 217 80% 40%;
    --brand-dark: 217 80% 34%;
    --brand-darker: 217 70% 18%;
    --brand-muted: 217 45% 72%;
    --brand-border: 217 55% 80%;
    --brand-border-light: 217 50% 90%;
    --brand-gradient-to: 200 80% 96%;
  }
```

## lib/region.ts
```ts
// TEST_REGIONS: on the line with aws/awssaa/az900
  ..., az900: "GLOBAL", gcdl: "GLOBAL", ccna: "GLOBAL", ...
```
Not in `NON_DRIVING_TESTS` (same treatment as `aws`, `awssaa`, `az900`).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  gcdl: "Google Cloud Digital Leader (2026 exam guide). Cloud and digital transformation, data products from BigQuery to Spanner, AI and agents with Gemini Enterprise Agent Platform, migration, GKE and Cloud Run, security and zero trust, and cost control and SRE.",
// EXAM_ORG
  gcdl: "Google Cloud · August 2026 exam guide",
// SEARCH_ALIASES
  gcdl: "google cloud digital leader cdl gcp gcdl google cloud certification foundational cloud digital leader exam gemini vertex ai",
// TEST_GROUPS: IT certifications
  { title: "IT certifications", ids: ["aplus", "secplus", "aws", "awssaa", "az900", "gcdl", "ccna"] },
// RELATED_OVERRIDES (optional)
  gcdl: ["aws", "az900", "awssaa"],
```
The catalog entry itself is built from `EXAMS_V2` (title "Google Cloud Digital Leader", landing
`/google-cloud-digital-leader-practice-test`); question count comes from `bankSizes.ts`.

## lib/examFacts.ts
```ts
  gcdl: {
    answer:
      "The Google Cloud Digital Leader exam has 50 to 60 multiple choice and multiple select questions in 90 minutes and costs 99 USD. Google reports pass or fail and does not publish a passing score. The exam guide launched on August 12, 2026 weights Digital Transformation, Data Transformation, Innovating with AI, Modernize Infrastructure and Applications, and Trust and Security at about 18 percent each, and Scaling with Google Cloud Operations at about 10 percent.",
    rows: [
      { label: "Questions", value: "50 to 60" },
      { label: "Time", value: "90 minutes" },
      { label: "Passing score", value: "Pass or fail; no published cut score" },
      { label: "Fee", value: "99 USD" },
      { label: "Given by", value: "Google Cloud, online or at a test center" },
    ],
    basedOn: "the Cloud Digital Leader exam guide launched August 12, 2026",
    source: { name: "Google Cloud", url: "https://cloud.google.com/learn/certification/cloud-digital-leader" },
  },
```

## components/exam/ExamClassFaq.tsx
Next to `aws`:
```ts
  gcdl: "a cloud fundamentals course",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"gcdl"` after `"az900"`.

## lib/tigerAssets.ts
No own tiger set. Suggest `BORROWED_SETS` add `gcdl: "aws"` (like `awssaa` and `az900`).

## lib/sitemaps.ts, app/og/[examId]/route.tsx
Nothing: both read `EXAMS_V2`. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the AWS SAA / AZ-900 bullets in the v2 section:
```md
- **Google Cloud Digital Leader** (`/google-cloud-digital-leader`, landing `/google-cloud-digital-leader-practice-test`, `[data-theme="gcdl"]` Google blue, region GLOBAL): the exam guide launched August 12, 2026 (agentic and generative AI, Gemini Enterprise Agent Platform, AI Hypercomputer and Google's security portfolio added; operations cut to 10%). Two 60-item tests in 90 minutes (the real exam is 50 to 60), free navigation, Test 2 held out, 6 drills one per section (`gcdlTransform`, `gcdlData`, `gcdlAI`, `gcdlModernize`, `gcdlSecurity`, `gcdlOps`; 11/11/11/10/11/6 per test), so the dashboard has 8 steps. Bank `data/v2/gcdl/questions.json` (200 original items, prefix `GCDL-`, pools 36/36/36/34/36/22, 80 drill-only, 5 choose-two per test) built from Python sources in `tools/gcdl/` by its own `tools/gcdl/build.py`. Product names as of 2026 (Agent Platform formerly Vertex AI, Managed Service for Apache Spark formerly Dataproc, Cloud Run functions); no prices or SLA numbers. Percent score; the real exam is pass/fail with no published cut score (`scoreNote`). Sources in `tools/gcdl/sources.md`.
```
