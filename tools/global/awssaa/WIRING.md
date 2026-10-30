# AWS Solutions Architect Associate (`awssaa`) wiring for the integrator

v2 exam, modelled on AWS CCP (`aws`). Files already written (unique to this exam):
`tools/awssaa/*` (8 domain sources as Python data, `build.py`, `sources.md`), this file,
`data/v2/awssaa/questions.json`, `lib/v2/exams/awssaa.ts` (export `AWSSAA`), `lib/v2/banks/awssaa.ts`,
`app/aws-solutions-architect/{layout,page,dashboard/page,practice/[n]/page,test/[id]/page,test/[id]/results/page}.tsx`
(copied from `app/aws-cloud-practitioner/`, minus its legacy drill/stats redirects),
`app/aws-solutions-architect-associate-practice-test/page.tsx`.

Rebuild: `python3 -I tools/awssaa/build.py` (own build: sources list keys first and the build shuffles
options by a stem seed; do not add `awssaa` to `tools/build_v2_bank.py` PLANS), then
`python3 -I tools/validate_v2_bank.py awssaa '{"1": {"saa": {"1": 65}}, "2": {"saa": {"1": 65}}}'`
(passes: 200 questions, 0 problems).

Screenshots still needed: `public/landing/awssaa-mobile.png`, `awssaa-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  awssaa: 200,
```

## lib/v2/registry.ts
```ts
import { AWSSAA } from "./exams/awssaa";
// EXAMS_V2: add AWSSAA right after AWS
..., SECPLUS, APLUS, AWS, AWSSAA, ...
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the aws bank import:
```ts
import "@/lib/v2/banks/awssaa";          // classQuestions.ts
import '@/lib/v2/banks/awssaa';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain keys and labels live in the config (`domainLabels`), like `aws`.

## app/globals.css
After the `[data-theme="aws"]` block (light; run `tools/gen_dark_brand_css.py` once for the `.dark` tint).
Suggested hue 222 (AWS "squid ink" navy, next to CCP's orange); re-pick if it clashes, and keep
`theme` in `lib/v2/exams/awssaa.ts` in step.
```css
  /* AWS Solutions Architect Associate theme: navy (v2 exam; matches lib/v2/exams/awssaa.ts theme) */
  [data-theme="awssaa"] {
    --brand: 222 60% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 222 60% 96%;
    --brand-hover: 222 60% 33%;
    --brand-dark: 222 60% 28%;
    --brand-darker: 222 55% 15%;
    --brand-muted: 222 35% 72%;
    --brand-border: 222 40% 78%;
    --brand-border-light: 222 35% 88%;
    --brand-gradient-to: 210 60% 96%;
  }
```

## lib/region.ts
```ts
// TEST_REGIONS: on the line with aplus/secplus/aws
  aplus: "GLOBAL", secplus: "GLOBAL", aws: "GLOBAL", awssaa: "GLOBAL",
```
Add `"awssaa"` to `NON_DRIVING_TESTS` if `aws` is in it (same treatment as `aws`).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  awssaa: "AWS Certified Solutions Architect - Associate (SAA-C03). Scenario questions on secure, resilient, high-performing and cost-optimized architectures: IAM and Organizations, VPC security, KMS, SQS and EventBridge, Multi-AZ and DR, storage and database choices, and Savings Plans and Spot.",
// EXAM_ORG
  awssaa: "AWS SAA-C03",
// SEARCH_ALIASES
  awssaa: "aws solutions architect associate saa saa-c03 saa c03 amazon web services architect associate certification cloud architect exam",
// TEST_GROUPS: IT certifications
  { title: "IT certifications", ids: ["aplus", "secplus", "aws", "awssaa"] },
// RELATED_OVERRIDES (optional; the IT group already gives three neighbours)
  awssaa: ["aws", "secplus", "aplus"],
  aws: ["awssaa", "secplus", "aplus"],   // only if aws gets an override
```
The catalog entry itself is built from `EXAMS_V2` like `aws` (title "AWS Solutions Architect Associate",
landing `/aws-solutions-architect-associate-practice-test`); question count comes from `bankSizes.ts`.

## lib/examFacts.ts
```ts
  awssaa: {
    answer:
      "The AWS Certified Solutions Architect - Associate exam (SAA-C03) has 65 questions in 130 minutes, 50 of them scored. It is scored 100 to 1000 and 720 passes. It covers Design Secure Architectures 30%, Design Resilient Architectures 26%, Design High-Performing Architectures 24%, and Design Cost-Optimized Architectures 20%, mostly as scenario questions.",
    rows: [
      { label: "Questions", value: "65 (50 scored)" },
      { label: "Time", value: "130 minutes" },
      { label: "Passing score", value: "720 on a 100 to 1000 scale" },
      { label: "Fee", value: "150 USD" },
      { label: "Given by", value: "AWS, at Pearson VUE or online" },
    ],
    basedOn: "the AWS SAA-C03 exam guide",
    source: { name: "AWS", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/" },
  },
```

## components/exam/ExamClassFaq.tsx
Next to `aws`:
```ts
  awssaa: "a cloud architecture course",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"awssaa"` after `"aws"`.

## lib/tigerAssets.ts
No own tiger set. Suggest borrowing the CCP tiger: `BORROWED_SETS` add `awssaa: "aws"`
(otherwise it falls back to the DMV tiger like other new exams).

## lib/sitemaps.ts, app/og/[examId]/route.tsx
Nothing: both read `EXAMS_V2`. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the AWS CCP bullet in the v2 section:
```md
- **AWS SAA** (`/aws-solutions-architect`, landing `/aws-solutions-architect-associate-practice-test`, `[data-theme="awssaa"]` navy, region GLOBAL): Solutions Architect Associate SAA-C03 (still current in Oct 2026), two 65-item tests in 130 minutes with free navigation, Test 2 held out, 8 drills splitting the four domains by task statement (`saaAccess`, `saaWorkloads`, `saaData` = Secure 7/6/6; `saaDecoupling`, `saaAvailability` = Resilient 9/8; `saaStorageCompute`, `saaDataNetwork` = High-Performing 8/8; `saaCost` 13), so the dashboard has 10 steps. Bank `data/v2/awssaa/questions.json` (200 original scenario items, prefix `SAA-`, pools 22/20/20/28/26/26/25/33, 70 drill-only, 8 choose-two per test) built from Python sources in `tools/awssaa/` by its own `tools/awssaa/build.py` (keys first, options shuffled by a stem seed; it reports how often the key is the longest option). Single answer and "Choose two" only, the real exam's formats. Percent score; the real 720/1000 is in `scoreNote`. Sources in `tools/awssaa/sources.md`.
```
