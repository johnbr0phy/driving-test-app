# gcsescience wiring (shared files the integrator edits)

Exam id `gcsescience`, v2 engine, prefix `GCSES-`, slug `/gcse-science`,
landing `/gcse-combined-science-practice-test`, icon `microscope` (already in
TestIcon), theme hue 110 (green), 210 questions, 7 new Basics skills.

Files already written by me (no wiring needed): `lib/v2/exams/gcsescience.ts`,
`lib/v2/banks/gcsescience.ts`, `data/v2/gcsescience/questions.json`,
`data/v2/basics/gcsescience.json`, `tools/gcsescience/*`, `app/gcse-science/*`,
`app/gcse-combined-science-practice-test/page.tsx`.

Rebuild: `python3 -I tools/gcsescience/basics.py && python3 -I tools/gcsescience/build.py`
Validate: `python3 -I tools/validate_v2_bank.py gcsescience '{"1": {"biology": {"1": 20}, "chemistry": {"1": 20}, "physics": {"1": 20}}, "2": {"biology": {"1": 20}, "chemistry": {"1": 20}, "physics": {"1": 20}}}'`

## lib/v2/registry.ts
```ts
import { GCSESCIENCE } from "./exams/gcsescience";
// add GCSESCIENCE to EXAMS_V2 (after TIMESTABLES or with the other UK school exams)
export const EXAMS_V2: ExamV2Config[] = [..., TIMESTABLES, GCSESCIENCE];
```

## lib/v2/basics.ts
```ts
import gcseScience from "@/data/v2/basics/gcsescience.json";
// and add it to the LIBRARY spread:
([...grammar, ...reading, ...math, ...science, ...writing, ...timesTables, ...gcseScience] as BasicsSkill[])
```
Skill ids (all prefixed, no collisions): gcsesciMagnification, gcsesciVariables,
gcsesciRelativeMass, gcsesciBalancing, gcsesciSubstitute, gcsesciPrefixes, gcsesciRearrange.

## lib/v2/bankSizes.ts
`gcsescience: 210,` (the validator already wrote it; regenerate as usual).

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/gcsescience";
```
(classQuestions uses double quotes, mcpV2Practice single quotes: `import '@/lib/v2/banks/gcsescience';`)

## lib/region.ts
```ts
// TEST_REGIONS, UK line:
ukcar: "UK", ukmoto: "UK", uklgv: "UK", ukpcv: "UK", ukadi: "UK", timestables: "UK", gcsescience: "UK",
// NON_DRIVING_TESTS:
export const NON_DRIVING_TESTS = new Set(["timestables", "gcsescience"]);
```

## lib/testCatalog.ts
EXAM_BLURBS:
```ts
  gcsescience: "GCSE Combined Science practice for England, Foundation tier: biology, chemistry and physics in two timed practice tests, six drills split by paper 1 and paper 2 topics, short lessons on magnification, relative formula mass, balancing and physics equations, and the equation sheet. Free.",
```
EXAM_ORG:
```ts
gcsescience: "GCSE double award · Biology, Chemistry, Physics",
```
SEARCH_ALIASES:
```ts
  gcsescience: "gcse combined science trilogy double award gcse science gcse biology gcse chemistry gcse physics foundation tier year 10 year 11 ks4 key stage 4 required practicals science revision mock aqa edexcel ocr",
```
Hub group (suggested, shared with the other UK school exams):
```ts
  { title: "UK school tests", ids: ["timestables", "ks2", "gcsemaths", "gcsehigher", "gcsescience", ...] },
```
RELATED_OVERRIDES (only if the group is too small):
```ts
  gcsescience: ["gcsemaths", "gcsehigher", "ks2"],
```

## lib/examFacts.ts
```ts
  gcsescience: {
    answer:
      "GCSE Combined Science is a double award worth two GCSEs, taken by most students in England at the end of Year 11 and graded 9-9 down to 1-1. Students sit six written papers, two each for biology, chemistry and physics; on the most widely taken specification each paper lasts 1 hour 15 minutes, is worth 70 marks and counts for a sixth of the grade. There are Foundation (grades 1-1 to 5-5) and Higher (up to 9-9) tiers, calculators are allowed, and for the 2025 to 2027 exams every candidate is given a physics equation sheet.",
    rows: [
      { label: "Who takes it", value: "Most Year 11 students in England, in May and June" },
      { label: "Papers", value: "Six: two biology, two chemistry, two physics" },
      { label: "Time", value: "1 hour 15 minutes a paper on the largest specification" },
      { label: "Grades", value: "9-9 to 1-1 (double award); Foundation tier up to 5-5" },
      { label: "Given on the day", value: "Calculator; physics equation sheet (2025 to 2027)" },
      { label: "Set by", value: "Exam boards (AQA, Pearson Edexcel, OCR, Eduqas) on DfE subject content" },
    ],
    basedOn: "the Department for Education GCSE combined science subject content and the 2024 decision on equation sheets for 2025 to 2027",
    source: { name: "Department for Education: GCSE combined science subject content", url: "https://www.gov.uk/government/publications/gcse-combined-science" },
    tigertest:
      "Tigertest has two timed practice tests (20 biology, 20 chemistry and 20 physics questions each) and six drills split by paper 1 and paper 2 topics, four of which start with short lessons on the maths skills. All of it is free with no account required.",
  },
```
(ExamFacts has no checked-date field on this branch; sources were checked 2026-10-30, see sources.md.)

## app/globals.css
Light block, beside the timestables block:
```css
  /* GCSE Combined Science theme: green (v2 exam; matches lib/v2/exams/gcsescience.ts theme) */
  [data-theme="gcsescience"] {
    --brand: 110 50% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 110 70% 95%;
    --brand-hover: 110 50% 27%;
    --brand-dark: 110 50% 24%;
    --brand-darker: 110 45% 16%;
    --brand-muted: 110 35% 70%;
    --brand-border: 110 35% 78%;
    --brand-border-light: 110 35% 90%;
    --brand-gradient-to: 130 70% 94%;
  }
```
Dark block (output of tools/gen_dark_brand_css.py for that block):
```css
  .dark [data-theme="gcsescience"] {
    --brand: 110 50% 34.7%;
    --brand-hover: 110 50% 27%;
    --brand-light: 110 45% 13%;
    --brand-gradient-to: 130 40% 11%;
    --brand-border-light: 110 35% 24%;
    --brand-border: 110 35% 34%;
    --brand-muted: 110 35% 45%;
    --brand-dark: 110 50% 65%;
    --brand-darker: 110 45% 78%;
  }
```

## components/TeachNudge.tsx
Add `"gcsescience"` to TEACHER_LED (next to `"timestables"`, under a "School classes" comment).

## components/exam/ExamClassFaq.tsx
```ts
  gcsescience: "a GCSE science class",
```

## lib/sitemaps.ts, app/og/[examId]/route.tsx
Nothing: both read EXAMS_V2.

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` once for the wave.

## next.config.ts
Nothing needed (no old routes to redirect).

## Landing screenshots
The landing references `/landing/gcsescience-mobile.png` and `/landing/gcsescience-desktop.png`
(plus `-dark` variants if the hero uses them); shoot them with
`.claude/skills/exam-bank/scripts/shoot_landing.js` once the dev server runs.
`ExamLandingBreadcrumbs` does not exist on this branch, so the landing omits it.

## CLAUDE.md
In the v2 exams section, after the Times Tables bullet:
```md
- **GCSE Combined Science** (`/gcse-science`, landing `/gcse-combined-science-practice-test`, `[data-theme="gcsescience"]` green at hue 110, icon `microscope`, hub group "UK school tests", fully free): Foundation-tier GCSE Combined Science (England) on the DfE subject content. Three sections, biology, chemistry and physics, 20 items in 25 min each with 5-minute breaks; two practice tests, Test 2 held out. Six drills, one per science's paper 1 and paper 2 topics (`gcsescienceBio1`, `gcsescienceBio2`, `gcsescienceChem1`, `gcsescienceChem2`, `gcsesciencePhys1`, `gcsesciencePhys2`; 10 per test from pools of 35, 15 drill-only), `drillSize` 20. Bio1, Chem1, Phys1 and Phys2 open with Basics from `data/v2/basics/gcsescience.json` (magnification, variables, relative formula mass, balancing, substituting into and rearranging physics equations, units and prefixes), so the dashboard is 12 steps. Every physics calculation states its equation (the 2025-2027 equation sheet), and the physics section's `reference` is the sheet. Bank `data/v2/gcsescience/questions.json` (210, `GCSES-T1-..`, `-T2-..`, `-D-..`) built by `tools/gcsescience/build.py` from `tools/gcsescience/*.py`; sources in `tools/gcsescience/sources.md`.
```
Also add `gcsescience` to the Basics library list in the Basics bullet
(`data/v2/basics/{skills,reading,math,science,writing,timestables,gcsescience}.json`) and bump its skill count by 7.
