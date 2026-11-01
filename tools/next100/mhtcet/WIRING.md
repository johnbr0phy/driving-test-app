# MHT-CET PCM (`mhtcet`) wiring for the integrator

v2 exam, template `nda` (sections). Files already written (unique to this exam):
`tools/next100/mhtcet/*` (8 domain sources as Python data, `build.py`, `sources.md`), `data/v2/mhtcet/questions.json`
(plain array, no stimuli), `lib/v2/exams/mhtcet.ts` (export `MHTCET`), `lib/v2/banks/mhtcet.ts` (`plainBank`),
`app/mht-cet/*` (layout, root redirect, dashboard, practice/[n], stats, test/[id], test/[id]/results; copied from
`app/nda/`), `app/mht-cet-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/mhtcet/build.py`, then validate (from a copy that does not write bankSizes):
`python3 -I tools/validate_v2_bank.py mhtcet '{"1": {"pc": {"1": 50}, "maths": {"1": 25}}, "2": {"pc": {"1": 50}, "maths": {"1": 25}}}'`
(passes: 214 questions, 0 stimuli, 0 problems; key strictly longest 14%; 109 sorted all-number items, key in an end
slot 50%; every one of those 109 keys is computed in the source (`ans=`) and asserted by the build). All-number
options (plain, fractions, KaTeX such as `$3.77 \times 10^{-3}$ T`, `$\frac{\pi}{4}$`, `$12\pi$`) are sorted and
get `lockedOrder`. Do not add `mhtcet` to `tools/build_v2_bank.py` PLANS: it has its own build.

Shape: two sections at the real pace and half the real length, in the order guides describe (Physics and
Chemistry first, then Mathematics): `pc` (50 items, 45 min: `mhtcetPhyMech` 9, `mhtcetPhyWaves` 8, `mhtcetPhyElec`
8, then `mhtcetChemPhys` 9, `mhtcetChemInorg` 8, `mhtcetChemOrg` 8) and `maths` (25 items, 45 min: `mhtcetMathAlg`
12, `mhtcetMathCalc` 13), `breakSeconds: 0`; two tests, Test 2 held out; 8 drills (8 drill-only items each, pools
17 to 21), so the dashboard is 10 steps. About a fifth of each subject per test is Std XI material, as in the
official 10 of 50. Composite "Percent of marks" averages the two sections, since each real paper is 100 of 200 marks.

Screenshots still needed: `public/landing/mhtcet-mobile.png`, `mhtcet-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  mhtcet: 214,
```

## lib/v2/registry.ts
```ts
import { MHTCET } from "./exams/mhtcet";
// EXAMS_V2: add MHTCET after the other India exams (with jeemain and neet if they land together)
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/mhtcet";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `MHTCET.domainLabels` (keys `mhtcetPhyMech`, `mhtcetPhyWaves`, `mhtcetPhyElec`,
`mhtcetChemPhys`, `mhtcetChemInorg`, `mhtcetChemOrg`, `mhtcetMathAlg`, `mhtcetMathCalc`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). The brief suggested 100 30% 32%, but that is
5 degrees from `teas` (95 30% 34%) with the same saturation and 2 points of lightness, so this uses 100 30% 43%
(muted sage green; matches `MHTCET.theme`). Checked against teas 95 30% 34% (9 points lighter), gcsescience
103 58% 30%, aufss 95 75% 29%, ibpsrrb 105 75% 30% (each 28+ points of saturation apart) and asvab 110 38% 30%
(10 degrees). Integrator's call if another batch-4 theme lands near it.
```css
  /* MHT-CET theme: muted sage green (v2 exam; matches lib/v2/exams/mhtcet.ts theme) */
  [data-theme="mhtcet"] {
    --brand: 100 30% 43%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 100 30% 96%;
    --brand-hover: 100 30% 38%;
    --brand-dark: 100 30% 33%;
    --brand-darker: 100 30% 18%;
    --brand-muted: 103 18% 72%;
    --brand-border: 103 20% 80%;
    --brand-border-light: 103 20% 90%;
    --brand-gradient-to: 113 30% 96%;
  }
```

## lib/shareCards.ts
```ts
  "mhtcet": {
    "color": "hsl(100, 30%, 43%)",
    "tint": "hsl(100, 30%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  mhtcet: { title: "MHT-CET Mock Test", description: "Practice Physics, Chemistry and Mathematics in timed MHT-CET PCM mock tests at the real pace." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  mhtcet: "IN",
```
Add `"mhtcet"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  mhtcet: "Mock tests for MHT-CET, Maharashtra's engineering entrance (PCM group): Physics, Chemistry and Mathematics at the real pace, on the State Board Std XI and XII syllabus.",
// EXAM_ORG
  mhtcet: "State CET Cell, Maharashtra · MHT-CET PCM group",
// SEARCH_ALIASES
  mhtcet: "mht cet mhtcet mht-cet mock test maharashtra cet mah cet pcm engineering entrance maharashtra state board physics chemistry maths cet cell b.tech b.e. pharmacy entrance after 12th",
// RELATED_OVERRIDES
  mhtcet: ["jeemain", "neet", "cuet"],
```
Hub group: an engineering and medical entrance exam taken after Std XII. Suggest a new group "India college entrance
exams" with `["jeemain", "neet", "mhtcet", "cuet"]` right after "India defence exams" (or before "India school
entrance tests"), if jeemain, neet and cuet land in this batch. Integrator's call.

## lib/examFacts.ts
```ts
  mhtcet: {
    answer:
      "MHT-CET is the Maharashtra State Common Entrance Test Cell's entrance test for first-year engineering, technology and pharmacy degrees in Maharashtra. In the PCM group it has two papers of multiple choice questions, each worth 100 marks in 90 minutes: Mathematics, 50 questions at 2 marks each, and Physics and Chemistry, 50 questions each at 1 mark each. Questions follow the Maharashtra State Board syllabus, about 20 percent Std XI and 80 percent Std XII, and there is no negative marking. In 2026 the PCM group could sit the exam twice, in April and in May.",
    rows: [
      { label: "Papers", value: "Mathematics; Physics and Chemistry" },
      { label: "Questions", value: "50 Mathematics, 50 Physics, 50 Chemistry" },
      { label: "Marks", value: "100 per paper (Mathematics 2 per question, Physics and Chemistry 1)" },
      { label: "Time", value: "90 minutes per paper" },
      { label: "Negative marking", value: "None" },
      { label: "Syllabus", value: "Maharashtra State Board, about 20% Std XI and 80% Std XII" },
      { label: "Results", value: "Percentiles across sessions" },
      { label: "Given by", value: "State Common Entrance Test Cell, Maharashtra" },
    ],
    basedOn: "State CET Cell syllabus and marking scheme for MHT-CET 2026 and its PCM result notices of 16 and 19 June 2026",
    source: { name: "State Common Entrance Test Cell, Maharashtra", url: "https://cetcell.mahacet.org" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES` (the landing already calls `classFaqJsonLd("mhtcet")` and renders `<ExamClassFaq examId="mhtcet" />`):
```ts
  mhtcet: "an MHT-CET coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"mhtcet"` (MHT-CET coaching classes and junior colleges set mock tests).

## lib/tigerAssets.ts
No tiger set yet. Suggest borrowing through `BORROWED_SETS`: `mhtcet: "sat"` (entrance exam) or whatever jeemain
borrows, so the two engineering entrances match.

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## Decisions to check
- Pattern and marks confirmed from the CET Cell's own "CET Syllabus and its Marking Scheme ... MHT-CET 2026" PDF
  (scanned; read as an image) and its two 2026 PCM result notices. The order of the papers (Physics and Chemistry
  first), computer-based mode, medium and the "better attempt counts" rule are from guides only; none is asserted
  on the landing or in examFacts.
- MHT-CET 2027 had not been notified on 1 November 2026; the landing title says 2027 (the next sitting) but gives no
  2027 dates, pattern change or attempt count.
- Shorter mock (75 of 150 questions) at the real pace; said in the section directions, `scoreNote` and a landing FAQ.
- Duplicates: every item was checked against all India banks in `data/v2/` (including in-progress batch 4 banks
  neet, jeemain, cuet, aissee and the rest) by token overlap, same numbers and same key. Same-fact items were
  rewritten. NEET and JEE Main builders were deduping at the same moment and twice moved onto replacements this
  bank had just used (SF₄ shape, Co²⁺ moment, dichromate, ozonolysis of but-2-ene, weakest base); this bank then
  moved again. A final cross-check of mhtcet against neet and jeemain after all three settle is worth doing.
  Remaining matches are shared templates with different numbers and answers (lens power, YDSE fringe width,
  metre bridge, series capacitors).
- Reviewer pass (1 November 2026): every item worked; 12 items rewritten after a fresh cross-check against
  jeemain, neet (both still changing), agniveervayu, apcalcab, act and the other banks (same numbers or same
  fact and answer), plus one weak item (atom economy) and Std XI rebalancing (7 items swapped between tests and
  drills by `test` tag) so each test now has 4 or 5 Std XI items per subject, as in the official 10 of 50.

## CLAUDE.md
Add in the v2 section after the India exams:
```md
- **MHT-CET** (`/mht-cet`, landing `/mht-cet-practice-test`, `[data-theme="mhtcet"]` muted sage green, region IN, hub group "India college entrance exams" (or as the integrator places it)): the Maharashtra State CET Cell's entrance test for first-year engineering, technology and pharmacy degrees, PCM group, on its syllabus and marking scheme for MHT-CET 2026: Paper I Mathematics, 50 MCQs at 2 marks, and Paper II Physics 50 and Chemistry 50 at 1 mark, 100 marks and 90 minutes each, about 20% Std XI and 80% Std XII (Maharashtra SCERT syllabus), no negative marking, difficulty "at par with JEE (Main)"; the 2026 PCM group sat twice (11 to 20 April, 12 to 20 May). Modelled at half length at the real pace: `pc` (Physics then Chemistry, 50 in 45 min: `mhtcetPhyMech` 9, `mhtcetPhyWaves` 8, `mhtcetPhyElec` 8, `mhtcetChemPhys` 9, `mhtcetChemInorg` 8, `mhtcetChemOrg` 8) then `maths` (25 in 45 min: `mhtcetMathAlg` 12, `mhtcetMathCalc` 13), the order guides give; two mock tests, Test 2 held out, 8 drills, 10 dashboard steps. Composite "Percent of marks" averages the two sections (each real paper is 100 of 200 marks). Bank `data/v2/mhtcet/questions.json` (214 original single-answer items, prefix `MHTCET-`, plain array, KaTeX maths) built by `python3 -I tools/next100/mhtcet/build.py` (every all-number key computed in the source with `ans=` and asserted; all-number options, KaTeX numbers included, sorted and locked). Sources in `tools/next100/mhtcet/sources.md`.
```
