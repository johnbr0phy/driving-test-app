# elevenplus wiring (v2 exam, 11+ English, maths and verbal reasoning)

Files already written (unique to this exam): `lib/v2/exams/elevenplus.ts`, `lib/v2/banks/elevenplus.ts`,
`data/v2/elevenplus/questions.json` and `data/v2/basics/elevenplus.json` (both built by
`python3 -I tools/elevenplus/build.py`), `tools/elevenplus/*`, `app/eleven-plus/*` (six wrappers copied from
`app/ged/`), `app/11-plus-practice-test/page.tsx`.
Dashboard: 6 drills, 4 of them with Basics (comprehension, number, VR words, VR codes) + 2 tests = 12 steps.
Validate:
`python3 -I tools/validate_v2_bank.py elevenplus '{"1": {"english": {"1": 25}, "maths": {"1": 25}, "vr": {"1": 40}}, "2": {"english": {"1": 25}, "maths": {"1": 25}, "vr": {"1": 40}}}'`

## lib/v2/registry.ts
```ts
import { ELEVENPLUS } from "./exams/elevenplus";
```
Append `ELEVENPLUS` to `EXAMS_V2` (beside `TIMESTABLES` and the other UK school exams).

## lib/v2/basics.ts
New Basics file with 13 skills (`elevenplusFindIt`, `elevenplusReadBetween`, `elevenplusWordMeaning`,
`elevenplusFractionOf`, `elevenplusPercentOf`, `elevenplusBidmas`, `elevenplusHiddenWords`, `elevenplusMoveLetter`,
`elevenplusMissingLetters`, `elevenplusAlphabetSteps`, `elevenplusLetterCodes`, `elevenplusNumberSeries`,
`elevenplusLetterSums`), all with walkthroughs, British spelling (the shared reading skills use US spelling, so
they were not reused):
```ts
import elevenplus from "@/data/v2/basics/elevenplus.json";
```
and add `...elevenplus` to the `LIBRARY` spread, e.g.
`([...grammar, ...reading, ...math, ...science, ...writing, ...timesTables, ...elevenplus] as BasicsSkill[])`

## lib/v2/bankSizes.ts
Regenerate with the validator above, or add `elevenplus: 238,`.

## lib/server/classQuestions.ts
```ts
import "@/lib/v2/banks/elevenplus";
```

## lib/server/mcpV2Practice.ts
```ts
import '@/lib/v2/banks/elevenplus';
```

## app/globals.css
Light block beside the other v2 themes, then run `python3 -I tools/gen_dark_brand_css.py` for the `.dark` block:
```css
  /* 11+ theme: royal indigo (v2 exam; matches lib/v2/exams/elevenplus.ts theme) */
  [data-theme="elevenplus"] {
    --brand: 230 65% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 230 100% 96%;
    --brand-hover: 230 65% 34%;
    --brand-dark: 230 65% 28%;
    --brand-darker: 230 60% 18%;
    --brand-muted: 230 45% 75%;
    --brand-border: 230 45% 80%;
    --brand-border-light: 230 45% 90%;
    --brand-gradient-to: 250 80% 95%;
  }
```
Hue 230 was unused (nearest 222 and 240). Shift it if another wave-2 exam took 226 to 236.

## lib/testCatalog.ts
EXAM_BLURBS:
```ts
  elevenplus: "11+ practice for grammar school entry: English (comprehension, spelling, punctuation, grammar), maths and verbal reasoning in GL-style multiple choice, with two timed practice tests, six drills and short click-through lessons on hidden words, letter codes, number series and more. Free.",
```
EXAM_ORG: `elevenplus: "Grammar school entry · English, maths, verbal reasoning",`
SEARCH_ALIASES:
```ts
  elevenplus: "11+ 11 plus eleven plus 11plus grammar school entrance exam selective school test gl gl-style kent test verbal reasoning vr english comprehension spag maths year 5 year 6 ks2 key stage 2 practice papers uk england northern ireland",
```
GROUPS: put `elevenplus` in "UK school tests" (beside `timestables`, `ks2` and the GCSEs; integrator decides).
RELATED_OVERRIDES (only if the group is small): `elevenplus: ["ks2", "timestables", "gcsemaths"],`

## lib/region.ts
`TEST_REGIONS`: `elevenplus: "UK",` and add `"elevenplus"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts
```ts
  elevenplus: {
    answer:
      "The 11+ is the entrance test for grammar schools in parts of England and in Northern Ireland, usually sat in September of Year 6. There is no single national test: each area or school sets its own. Most multiple-choice 11+ tests are drawn from English (comprehension, spelling, punctuation and grammar), maths (Key Stage 2), verbal reasoning (word and code puzzles) and non-verbal reasoning (shape puzzles), with papers of about 45 to 60 minutes marked by computer. Raw marks are turned into an age-standardised score, and each area or school sets its own qualifying score.",
    rows: [
      { label: "Who takes it", value: "Year 6 pupils applying to grammar schools, usually in September" },
      { label: "Papers", value: "English, maths, verbal reasoning and non-verbal reasoning; areas choose and combine them" },
      { label: "Format", value: "Multiple choice on a separate answer sheet, computer marked" },
      { label: "Typical length", value: "About 45 to 60 minutes a paper" },
      { label: "Passing score", value: "No single pass mark; an age-standardised score against a local qualifying score" },
      { label: "Set by", value: "Each local authority, consortium or grammar school" },
    ],
    basedOn: "the national curriculum in England for Key Stage 2 English and mathematics and the published formats of multiple-choice 11+ tests such as the Kent Test",
    source: { name: "Kent County Council: prepare for the Kent Test", url: "https://www.kent.gov.uk/education-and-children/schools/school-places/kent-test/prepare-for-the-kent-test" },
    tigertest:
      "Tigertest has two timed practice tests (English, Maths and Verbal Reasoning, 90 questions each) and six drills, four of which start with short click-through lessons on skills like hidden words, letter codes and fractions of amounts. Non-verbal reasoning is not covered. All of it is free with no account required.",
  },
```
(checked 2026-10-30)

## components/exam/ExamClassFaq.tsx
```ts
  elevenplus: "an 11+ group or a Year 5 class",
```

## components/TeachNudge.tsx
Add `"elevenplus"` to `TEACHER_LED` (with `timestables` and the other school exams).

## lib/sitemaps.ts, app/og/[examId], lib/seoDates.ts, next.config.ts, lib/tigerAssets.ts
Nothing needed: sitemap and OG read `EXAMS_V2`; no old routes; unknown ids use the DMV tiger. Bump the
exams-family date in `lib/seoDates.ts` if the wave bumps it.

## Landing screenshots
The landing references `/landing/elevenplus-mobile.png` and `/landing/elevenplus-desktop.png` (and `-dark`
variants like the others). Shoot them with `.claude/skills/exam-bank/scripts/shoot_landing.js`.

## CLAUDE.md
One bullet in the v2 exams section, after Times Tables or the other UK school exams:
```md
- **11+** (`/eleven-plus`, landing `/11-plus-practice-test`, `[data-theme="elevenplus"]` royal indigo, hub "UK school tests", region UK): GL-style multiple-choice 11+ for grammar school entry, three sections per test, English 25 in 25 min (two passages of 6 questions with shared stimuli, then 13 spelling, punctuation and grammar: "which part has a mistake / No mistake" items with `lockedOrder`, and word-choice items), Maths 25 in 25 min (13 number, 12 problem solving, five options, no calculator) and Verbal Reasoning 40 in 30 min (20 word types, 20 code and sequence types, grouped by type in paper order), 5-minute breaks. Non-verbal reasoning is not modelled. Two practice tests, Test 2 held out, 6 drills of 20 (comprehension, SPaG, number, problem solving, VR words, VR codes); four open with 13 new Basics walkthroughs in `data/v2/basics/elevenplus.json` (British spelling), 12 dashboard steps. 238 original items (6 passages, one a poem) built by `tools/elevenplus/build.py` from `tools/elevenplus/q_*.py`, which assert every computed key and check word puzzles against `/usr/share/dict/words`. Never names GL Assessment or CEM in stems. Percent score with a default goal of 80; the real test is age-standardised with local qualifying scores.
```
