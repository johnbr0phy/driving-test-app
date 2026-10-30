# gcsecs wiring (v2 exam, GCSE Computer Science)

Files already written (unique to this exam): `lib/v2/exams/gcsecs.ts`, `lib/v2/banks/gcsecs.ts`,
`data/v2/gcsecs/questions.json` (built by `python3 -I tools/gcsecs/build.py`), `data/v2/basics/gcsecs.json`
(built by `python3 -I tools/gcsecs/basics.py`), `tools/gcsecs/*`, `app/gcse-computer-science/*` (six wrappers
copied from `app/ged/`), `app/gcse-computer-science-practice-test/page.tsx`.
Dashboard: 7 drills + 3 Basics steps (programming, logic, data) + 2 tests = 12 steps.
Validate: `python3 -I tools/validate_v2_bank.py gcsecs '{"1": {"p1": {"1": 30}, "p2": {"1": 30}}, "2": {"p1": {"1": 30}, "p2": {"1": 30}}}'`

## lib/v2/registry.ts
```ts
import { GCSECS } from "./exams/gcsecs";
```
Append `GCSECS` to `EXAMS_V2` (after the other GCSE entries).

## lib/v2/basics.ts
New Basics file with 6 skills (`csBinary`, `csHex`, `csBinaryAdd`, `csDataUnits`, `csTraceTables`, `csTruthTables`):
```ts
import gcsecs from "@/data/v2/basics/gcsecs.json";
```
and add `...gcsecs` to the `LIBRARY` spread:
`([...grammar, ...reading, ...math, ...science, ...writing, ...timesTables, ...gcsecs] as BasicsSkill[])`

## lib/v2/bankSizes.ts
Regenerate with the validator above, or add `gcsecs: 202,`.

## lib/server/classQuestions.ts
```ts
import "@/lib/v2/banks/gcsecs";
```
## lib/server/mcpV2Practice.ts
```ts
import '@/lib/v2/banks/gcsecs';
```

## app/globals.css
Light block beside the other v2 themes, then run `python3 -I tools/gen_dark_brand_css.py` for the `.dark` block:
```css
  /* GCSE Computer Science theme: deep teal (v2 exam; matches lib/v2/exams/gcsecs.ts theme) */
  [data-theme="gcsecs"] {
    --brand: 182 62% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 182 80% 95%;
    --brand-hover: 182 62% 26%;
    --brand-dark: 182 62% 22%;
    --brand-darker: 182 55% 15%;
    --brand-muted: 182 40% 72%;
    --brand-border: 182 40% 78%;
    --brand-border-light: 182 40% 89%;
    --brand-gradient-to: 200 80% 95%;
  }
```
Hue 182 was unused here (nearest 172, 185). If another wave-2 exam took 178 to 190, shift this one.

## lib/testCatalog.ts
EXAM_BLURBS:
```ts
  gcsecs: "GCSE Computer Science for AQA, OCR and Edexcel: two practice tests of two timed papers (programming and computer systems), seven topic drills with pseudocode trace questions, and step-by-step basics for binary, hex, trace tables and truth tables. Free.",
```
EXAM_ORG: `gcsecs: "AQA, OCR and Pearson Edexcel (England)",`
SEARCH_ALIASES:
```ts
  gcsecs: "gcse computer science computing cs year 10 year 11 aqa 8525 ocr j277 edexcel 1cp2 paper 1 paper 2 pseudocode trace tables binary hexadecimal algorithms programming networks cyber security mock exam revision uk england",
```
GROUPS: put `gcsecs` in "UK school tests" with the other GCSEs (integrator decides).
RELATED_OVERRIDES (only if the group is small): `gcsecs: ["gcsehigher", "gcsemaths", "gcsescience"],`

## lib/region.ts
`TEST_REGIONS`: `gcsecs: "UK",` and add `"gcsecs"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts
```ts
  gcsecs: {
    answer:
      "GCSE Computer Science is two written exams of equal weight, sat at the end of Year 11 in England: one on computational thinking, algorithms and programming, and one on computer systems (data representation, hardware, networks, security and the impact of technology). AQA's papers are 2 hours and 1 hour 45 minutes for 90 marks each; OCR's are 1 hour 30 minutes for 80 marks each; Pearson Edexcel's programming paper is a 2-hour on-screen exam. Grades run 9 to 1, with boundaries set after each exam series.",
    rows: [
      { label: "Who takes it", value: "Year 11 students in England, in May and June" },
      { label: "Papers", value: "2 papers, 50% each: programming and computer systems" },
      { label: "Time and marks", value: "AQA 2 h and 1 h 45 min, 90 marks each; OCR 1 h 30 min, 80 marks each" },
      { label: "Calculator", value: "Not allowed on the written papers" },
      { label: "Grades", value: "9 to 1; boundaries change each year" },
      { label: "Given by", value: "AQA, OCR or Pearson Edexcel, to the DfE subject content" },
    ],
    basedOn: "the Department for Education's GCSE subject content for computer science (updated March 2025) and the AQA 8525, OCR J277 and Pearson Edexcel 1CP2 schemes of assessment",
    source: { name: "DfE: GCSE subject content for computer science", url: "https://www.gov.uk/government/publications/gcse-computer-science/gcse-subject-content-for-computer-science" },
    tigertest:
      "Tigertest has two GCSE Computer Science practice tests of two timed 30-question papers each and seven topic drills, three of which open with step-by-step basics (binary, hex, binary addition, file sizes, trace tables and truth tables). All of it is free with no account required; scores are percent correct, not grades.",
  },
```
(checked 2026-10-30)

## components/exam/ExamClassFaq.tsx
```ts
  gcsecs: "a GCSE Computer Science class",
```

## components/TeachNudge.tsx
Add `"gcsecs"` to `TEACHER_LED` (with the other school exams).

## lib/sitemaps.ts, app/og/[examId], lib/seoDates.ts, next.config.ts, lib/tigerAssets.ts
Nothing needed: sitemap and OG read `EXAMS_V2`; no old routes; unknown ids use the DMV tiger. Bump the
exams-family date in `lib/seoDates.ts` if the wave bumps it.

## Landing screenshots
The landing references `/landing/gcsecs-mobile.png` and `/landing/gcsecs-desktop.png` (and `-dark`
variants like the others). Shoot them with `.claude/skills/exam-bank/scripts/shoot_landing.js`.

## Numeric input limit (heads-up)
`QuestionView` keeps only digits, `.`, `/` and `-` and cuts typed answers to 7 characters, so binary and hex
answers cannot be typed. Every numeric item here has a denary answer of 6 digits or fewer; binary and hex
results are multiple choice.

## CLAUDE.md
Under "v2 exams", after the other GCSE bullets:
```md
- **GCSE Computer Science** (`/gcse-computer-science`, landing `/gcse-computer-science-practice-test`, `[data-theme="gcsecs"]` deep teal, hub "UK school tests", region UK): two sections that are the two papers every board sets, `p1` computational thinking and programming (30 items, 45 min, a pseudocode reference panel: ← assignment, zero-based arrays, explicit ENDIF/ENDWHILE) and `p2` computer systems (30 items, 40 min), 5-minute break; per test 10 algorithms, 13 programming, 7 logic and languages, 10 data representation, 9 systems, 7 networks and security, 4 impacts (DfE subject content, updated March 2025). Two practice tests, Test 2 held out, 7 drills of 20; programming, logic and data open with six new Basics walkthroughs in `data/v2/basics/gcsecs.json` (`csBinary`, `csHex`, `csBinaryAdd`, `csDataUnits`, `csTraceTables`, `csTruthTables`), 12 dashboard steps. Code is shown as a Line/Code pipe table (rich text has no code blocks); numeric answers are denary only (the input takes 7 digits). Insertion sort (OCR) and SQL (AQA, drill-only) are included. 202 original items built by `tools/gcsecs/build.py` from `tools/gcsecs/q_*.py`; Basics by `tools/gcsecs/basics.py`. Percent score, not grades.
```
