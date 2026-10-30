# hscmaths wiring (v2 exam)

Files already written (unique to this exam): `lib/v2/exams/hscmaths.ts`, `lib/v2/banks/hscmaths.ts`,
`data/v2/hscmaths/questions.json` (built), `tools/hscmaths/*` (`build.py`, `common.py`, `netlib.py`,
`q_*.py`, `sources.md`), `app/hsc-maths-standard/*` (layout, redirect, dashboard, practice/[n], test/[id],
results), `app/hsc-maths-standard-2-practice-test/page.tsx`. No new Basics file: drills reuse shared skills
(`substitution`, `solveX`, `slope`, `systems`, `exponentialGrowth`, `percents`, `percentChange`, `sohcahtoa`,
`ratios`, `rateProblems`, `unitConversion`). Dashboard: 6 drills + 3 Basics steps + 2 tests = 11 steps.
Region AU, Australian spelling, AUD.

Rebuild: `python3 -I tools/hscmaths/build.py` then
`python3 -I tools/validate_v2_bank.py hscmaths '{"1": {"s1": {"1": 15}, "s2": {"1": 25}}, "2": {"s1": {"1": 15}, "s2": {"1": 25}}}'`

## lib/v2/registry.ts
```ts
import { HSCMATHS } from "./exams/hscmaths";
```
Append `HSCMATHS` to `EXAMS_V2` (with the other Australian school exams, e.g. after `NAPLAN7`/`OCNSW` if present).

## lib/v2/bankSizes.ts
Regenerate with the validator, or add `hscmaths: 200,`.

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/hscmaths";
```
(mcpV2Practice uses single quotes: `import '@/lib/v2/banks/hscmaths';`)

## app/globals.css
Light block next to the other v2 themes, then re-run `python3 -I tools/gen_dark_brand_css.py` for the `.dark` block:
```css
  /* HSC Maths Standard 2 theme: eucalyptus green (v2 exam; matches lib/v2/exams/hscmaths.ts theme) */
  [data-theme="hscmaths"] {
    --brand: 128 45% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 128 60% 95%;
    --brand-hover: 128 45% 29%;
    --brand-dark: 128 45% 24%;
    --brand-darker: 128 40% 16%;
    --brand-muted: 128 30% 72%;
    --brand-border: 128 30% 78%;
    --brand-border-light: 128 30% 89%;
    --brand-gradient-to: 150 60% 94%;
  }
```
Hue 128 was unused in this worktree (nearest: 120, 135). Shift it if another wave-2 exam took a hue within 5.

## lib/testCatalog.ts
EXAM_BLURBS:
```ts
  hscmaths: "HSC Mathematics Standard 2 for Year 12 in NSW, on the new NESA syllabus first examined in 2027: two practice papers (multiple-choice Section I, short-answer Section II) with a reference sheet, and drills on annuities, loans, trigonometry, network flow, critical paths, bivariate data and the normal distribution. Free.",
```
EXAM_ORG: `hscmaths: "NESA (NSW) · Year 12 HSC",`
SEARCH_ALIASES:
```ts
  hscmaths: "hsc maths standard 2 mathematics standard two year 12 nsw nesa trial paper hsc exam past paper revision standard maths general maths annuities loans depreciation network flow critical path bivariate normal distribution z score australia",
```
GROUPS: an Australian school group, e.g. `{ title: "Australia school tests", ids: ["naplan", "naplan7", "ocnsw", "nswsel", "vicsel", "hscmaths"] }` (integrator decides; hscmaths is the senior one, so last).
RELATED_OVERRIDES (only if the group is too small): `hscmaths: ["naplan", "naplan7", "nswsel"],`

## lib/region.ts
Add to `TEST_REGIONS`: `hscmaths: "AU",` and add `"hscmaths"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts
```ts
  hscmaths: {
    answer:
      "HSC Mathematics Standard 2 is one written paper sat by Year 12 students in NSW in the HSC exam period: 100 marks in 2 hours 30 minutes plus 10 minutes reading time, with NESA-approved calculators and a reference sheet. Section I is objective-response (multiple-choice) questions worth 15 marks; Section II is 35 to 40 items worth 85 marks, some with parts and at least two worth 4 or 5 marks. From the 2027 HSC it examines the Mathematics Standard 11-12 Syllabus (2024), focusing on Year 12 with Year 11 as assumed knowledge.",
    rows: [
      { label: "Who takes it", value: "Year 12 students in NSW, in the October to November HSC exam period" },
      { label: "Paper", value: "100 marks, 2 hr 30 min plus 10 min reading time" },
      { label: "Sections", value: "Section I: 15 marks objective response; Section II: 85 marks, 35 to 40 items" },
      { label: "Calculator and formulas", value: "NESA-approved calculator; reference sheet provided" },
      { label: "Syllabus", value: "Mathematics Standard 11-12 (2024), first examined in 2027" },
      { label: "Results", value: "HSC mark (exam and school assessment) reported in Bands 1 to 6" },
      { label: "Given by", value: "NSW Education Standards Authority (NESA)" },
    ],
    basedOn: "the NESA Mathematics Standard 11-12 Syllabus (2024) and its HSC examination specifications for Mathematics Standard 2",
    source: { name: "NESA: Mathematics Standard 11-12 Syllabus (2024), HSC examinations", url: "https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-standard-11-12-2024/assessment/hsc-examinations" },
    tigertest:
      "Tigertest has two HSC Maths Standard 2 practice papers (15 multiple-choice and 25 short-answer questions each, with a reference sheet) and six topic drills, three of which open with short Basics lessons. All of it is free with no account required; scores are percent correct, not bands.",
  },
```
(checked 2026-10-30)

## components/exam/ExamClassFaq.tsx
```ts
  hscmaths: "a Year 12 Mathematics Standard class",
```

## components/TeachNudge.tsx
Add `"hscmaths"` to `TEACHER_LED` (in a "High school" line with the other school exams).

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` for the wave. `lib/sitemaps.ts` and `/og/[examId]` read `EXAMS_V2`, so no line is needed there.

## next.config.ts
Nothing needed (no old routes).

## lib/tigerAssets.ts
Nothing: unknown ids fall back to the DMV artwork.

## Landing screenshots
The landing references `/landing/hscmaths-mobile.png` and `/landing/hscmaths-desktop.png` (plus `-dark`
variants). Shoot them with `.claude/skills/exam-bank/scripts/shoot_landing.js` once the dev server runs.

## CLAUDE.md
Under "v2 exams", near the other school exams:
```md
- **HSC Maths Standard 2** (`/hsc-maths-standard`, landing `/hsc-maths-standard-2-practice-test`, `[data-theme="hscmaths"]` green, region AU): NSW Year 12, written to the NESA Mathematics Standard 11-12 Syllabus (2024), first examined in the 2027 HSC (the 2026 HSC is the last on the 2017 syllabus). Two sections like the real paper's: `s1` 15 multiple choice in 25 min and `s2` 25 short answers (mostly typed numbers) in 60 min, both with a calculator and a `reference` sheet; two practice tests with Test 2 held out; 6 drills grouping the ten Year 12 focus areas (`hscmathsAlgebra`, `hscmathsFinance`, `hscmathsMeasure`, `hscmathsNetworks`, `hscmathsBivariate`, `hscmathsProbability`; 6/8/8/6/5/7 per paper), three opening with shared Basics, 11 dashboard steps. Drill-only items (`test: 0`) are in `s2`. Networks are given as tables, no figures. 200 original items built by `tools/hscmaths/build.py` from `tools/hscmaths/q_*.py`, every answer computed (`netlib.py` for networks). Percent score, not bands.
```
