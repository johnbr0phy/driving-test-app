# KS2 SATs wiring (v2 exam `ks2`)

Files already written (unique to ks2): `lib/v2/exams/ks2.ts`, `lib/v2/banks/ks2.ts`, `data/v2/ks2/questions.json` (built by `python3 -I tools/ks2/build.py`), `data/v2/basics/ks2.json` (built by `python3 -I tools/ks2/basics.py`), `app/ks2-sats/*` (layout, redirect page, dashboard, practice/[n], test/[id], test/[id]/results), `app/ks2-sats-practice-test/page.tsx`, `tools/ks2/*`.

Validate: `python3 -I tools/validate_v2_bank.py ks2 '{"1":{"reading":{"1":24},"gps":{"1":30},"maths":{"1":20,"2":12,"3":12}},"2":{"reading":{"1":24},"gps":{"1":30},"maths":{"1":20,"2":12,"3":12}}}'` (242 questions, 8 stimuli, 0 problems).

## lib/v2/registry.ts
```ts
import { KS2 } from "./exams/ks2";
// add KS2 to EXAMS_V2, after TIMESTABLES:
export const EXAMS_V2: ExamV2Config[] = [GED, SAT, ACT, TEAS, HESI, ASVAB, ACCUPLACER, NCLEX, NCLEXPN, EMT, PARAMEDIC, SECPLUS, APLUS, AWS, TIMESTABLES, KS2];
```

## lib/v2/basics.ts
```ts
import ks2 from "@/data/v2/basics/ks2.json";
// and in LIBRARY:
([...grammar, ...reading, ...math, ...science, ...writing, ...timesTables, ...ks2] as BasicsSkill[])
```
19 new skill ids, all prefixed `ks2` (no collisions). The Punctuation drill also reuses the shared `apostrophes`.

## lib/v2/bankSizes.ts
```ts
  ks2: 242,
```

## lib/server/classQuestions.ts
```ts
import "@/lib/v2/banks/ks2";
```

## lib/v2/types.ts
Nothing needed.

## app/globals.css
After the timestables block (hue 280 violet; GED is 265, so check no other overnight exam took 280):
```css
  /* KS2 SATs theme: violet (v2 exam; matches lib/v2/exams/ks2.ts theme) */
  [data-theme="ks2"] {
    --brand: 280 55% 44%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 280 100% 96%;
    --brand-hover: 280 55% 38%;
    --brand-dark: 280 55% 32%;
    --brand-darker: 280 50% 22%;
    --brand-muted: 280 40% 75%;
    --brand-border: 280 40% 80%;
    --brand-border-light: 280 40% 90%;
    --brand-gradient-to: 300 80% 95%;
  }
```
Then re-run `python3 -I tools/gen_dark_brand_css.py` for the `.dark [data-theme="ks2"]` block.

## lib/testCatalog.ts
EXAM_BLURBS:
```ts
  ks2: "KS2 SATs practice for Year 6 in England: English reading, grammar, punctuation and vocabulary, arithmetic and reasoning, with short lessons before each drill and two practice tests with estimated scaled scores from 80 to 120. Free.",
```
EXAM_ORG:
```ts
ks2: "Year 6 SATs · Reading, GPS, Maths",
```
SEARCH_ALIASES:
```ts
  ks2: "ks2 sats year 6 sats key stage 2 tests national curriculum tests spag gps grammar punctuation spelling reading test arithmetic reasoning scaled score primary school england",
```
Hub group: replace `{ title: "Primary school", ids: ["timestables"] }` with
```ts
  { title: "UK school tests", ids: ["timestables", "ks2", "gcsemaths"] },
```
(`gcsemaths` is another agent's exam id; drop it if that id differs.)
RELATED_OVERRIDES:
```ts
  ks2: ["timestables", "gcsemaths"],
```
and add `"ks2"` to the timestables override list (e.g. `timestables: ["ks2", "sat", "act", "ged"]`).

## lib/region.ts
```ts
// TEST_REGIONS:
ks2: "UK",
// NON_DRIVING_TESTS:
export const NON_DRIVING_TESTS = new Set(["timestables", "ks2"]);
```

## lib/examFacts.ts
```ts
  ks2: {
    answer:
      "The KS2 SATs are the national curriculum tests every Year 6 pupil in England takes at school in May. English reading is one paper of three texts, 50 marks in 60 minutes. Grammar, punctuation and spelling is a 50-mark question paper in 45 minutes plus a 20-word spelling test. Mathematics is an arithmetic paper (40 marks, 30 minutes) and two reasoning papers (35 marks, 40 minutes each), with no calculator. Each subject is reported as a scaled score from 80 to 120, and 100 is the expected standard. Writing is assessed by the teacher, not by a test.",
    rows: [
      { label: "Who takes it", value: "Year 6 pupils in England, in May" },
      { label: "Reading", value: "1 paper, 3 texts, 50 marks, 60 minutes" },
      { label: "Grammar, punctuation and spelling", value: "Paper 1: 50 marks, 45 minutes; Paper 2: 20-word spelling test" },
      { label: "Maths", value: "Arithmetic 40 marks, 30 min; two reasoning papers, 35 marks, 40 min each; no calculator" },
      { label: "Scores", value: "Scaled 80 to 120 per subject; 100 is the expected standard, 110+ a high score" },
      { label: "Marks needed for 100 (2026)", value: "Reading 25/50, GPS 34/70, maths 56/110" },
      { label: "Given by", value: "The child's school, set by the Standards and Testing Agency" },
    ],
    basedOn: "the Standards and Testing Agency's key stage 2 test frameworks for English reading, English grammar, punctuation and spelling, and mathematics, and the 2026 scaled score conversion tables",
    source: { name: "Standards and Testing Agency: 2026 key stage 2 scaled score conversion tables", url: "https://www.gov.uk/government/publications/key-stage-2-tests-2026-scaled-scores" },
    tigertest:
      "Tigertest has two KS2 SATs practice tests (reading, grammar and punctuation Paper 1, and maths Papers 1, 2 and 3, each about 60% of the real length) with an estimated scaled score per subject, and five drills that each start with short lessons. All of it is free with no account required; the spelling test is not modelled.",
  },
```

## components/exam/ExamClassFaq.tsx
Under "Primary school" / next to timestables in TEACHES:
```ts
  ks2: "a Year 6 class",
```

## components/TeachNudge.tsx
In the "Primary school classes" line:
```ts
  "timestables", "ks2",
```

## lib/tigerAssets.ts
No KS2 tiger set exists. Suggest borrowing the times tables set (same audience) in BORROWED_SETS: `ks2: "timestables",` (the landing calls `getTigerAsset("ks2", 1)`; without this it falls back to the DMV face).

## Child-friendly copy (components)
`components/v2/BasicsRunner.tsx` line ~241 (`const childFriendly = exam.id === "timestables"`), `components/v2/DrillRunner.tsx` ~206-207 and `components/v2/ResultsV2.tsx` ~80 special-case timestables. KS2 is for 10 and 11 year olds; suggested: treat `ks2` the same in BasicsRunner and DrillRunner (`["timestables", "ks2"].includes(exam.id)`); leave ResultsV2 alone ("Full marks!" is only right for timestables).

## Known rendering gap (components/v2/RichText.tsx)
RichText joins single newlines into one paragraph, so poems would lose their line breaks. The poem stimuli therefore put each line in its own paragraph and separate verses with a paragraph holding only a zero-width space (`tools/ks2/common.py` `poem()`). It reads fine; a proper `poem` style (single newline = `<br>`) in RichText would look tighter, optional.

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` with the batch. `lib/sitemaps.ts` needs nothing: it maps `EXAMS_V2`.

## Landing screenshots
`/landing/ks2-mobile.png`, `ks2-desktop.png` (+ dark) are referenced by the landing and do not exist yet; shoot them with `.claude/skills/exam-bank/scripts/shoot_landing.js` once wired. `/og/ks2` should work through the v2 registry.

## next.config.ts
Nothing needed (no old routes).

## CLAUDE.md (v2 exams section, after GED/before SAT or next to the times tables mention)
```md
- **KS2 SATs** (`/ks2-sats`, landing `/ks2-sats-practice-test`, `[data-theme="ks2"]` violet, hub group "UK school tests"): the Year 6 national curriculum tests in England. Three sections: reading (24 questions on 3 shared texts, story, information text and poem, 40 min), GPS Paper 1 (30, 27 min; the spelling Paper 2 is not modelled) and maths as one section of three modules (arithmetic 20 in 17 min, reasoning Papers 2 and 3, 12 in 20 min each, numeric answers, no calculator), so both tests are about 60% of the real length and share one scale. Each section is scaled 80 to 120 by `curve()` anchored at the 2026 STA conversion thresholds as fractions of our item counts (an estimate, said in `scoreNote`); the composite is the lowest of the three, so a goal of 100 means the expected standard in every subject. Test 2 held out. Five drills (reading, grammar and vocabulary, punctuation, arithmetic, reasoning), each opening with Basics (19 new `ks2*` skills in `data/v2/basics/ks2.json` plus the shared `apostrophes`), 12 dashboard steps. Bank built by `tools/ks2/build.py` (Python sources, arithmetic answers computed and asserted); Basics by `tools/ks2/basics.py`. Poems are one paragraph per line (`poem()` in `tools/ks2/common.py`) because RichText joins single newlines.
```
