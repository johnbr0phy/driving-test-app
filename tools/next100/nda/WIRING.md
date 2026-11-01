# NDA and NA exam (`nda`) wiring for the integrator

v2 exam, template `sscmts` (two sections). Files already written (unique to this exam):
`tools/next100/nda/*` (9 domain sources as Python data, `stimuli.json` with 2 reading passages, `build.py`,
`sources.md`), `data/v2/nda/questions.json` (object form `{ stimuli, questions }`), `lib/v2/exams/nda.ts`
(export `NDA`), `lib/v2/banks/nda.ts` (`withStimuli`), `app/nda/*` (layout, root redirect, dashboard, practice/[n],
stats, test/[id], test/[id]/results; copied from `app/ssc-mts/`), `app/nda-exam-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/nda/build.py`, then validate (from a copy that does not write bankSizes):
`python3 -I tools/validate_v2_bank.py nda '{"1": {"maths": {"1": 48}, "gat": {"1": 60}}, "2": {"maths": {"1": 48}, "gat": {"1": 60}}}'`
(passes: 236 questions, 2 stimuli, 0 problems; key strictly longest 21%; 76 sorted all-number items, key in an end
slot 47%). Error-spotting, sentence-improvement and all-number items get `lockedOrder` from the build. Do not add
`nda` to `tools/build_v2_bank.py` PLANS: it has its own build.

Shape: two sections that are the real two papers at the real pace and about 40 percent of the length:
`maths` (48 items, 60 min: `ndaAlgebra` 14, `ndaTrigGeo` 12, `ndaCalculus` 13, `ndaStats` 9) and `gat` (60 items,
60 min: `ndaEnglish` 20 incl. a 4-item reading passage, then `ndaPhysics`, `ndaChemBio`, `ndaHistory`,
`ndaGeography` 10 each, interleaved), `breakSeconds: 0`; two tests, Test 2 held out; 9 drills (2 drill-only items
each, 4 for English), so the dashboard is 11 steps. Current events are not modelled.

Screenshots still needed: `public/landing/nda-mobile.png`, `nda-desktop.png` (+ `-dark`), e.g. `nda:nda:v2:algebra`.

## lib/v2/bankSizes.ts
```ts
  nda: 236,
```

## lib/v2/registry.ts
```ts
import { NDA } from "./exams/nda";
// EXAMS_V2: add NDA after the other India exams (e.g. after SSCMTS)
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/nda";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `NDA.domainLabels` (keys `ndaAlgebra`, `ndaTrigGeo`, `ndaCalculus`, `ndaStats`,
`ndaEnglish`, `ndaPhysics`, `ndaChemBio`, `ndaHistory`, `ndaGeography`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). The brief suggested 214 55% 32%, but that is
within 1 degree of `boating` (215 65% 32%) with only 10 points of saturation apart, so this uses 213 25% 42%
(slate blue); matches `NDA.theme`. Checked against boating 215 65% 32%, sbiclerk 209 40% 34%, phlto 212 40% 26%,
cissp 220 40% 43% and the 222 18% 34% v2 theme: each differs by at least 15 saturation or 8 lightness.
```css
  /* NDA theme: slate blue (v2 exam; matches lib/v2/exams/nda.ts theme) */
  [data-theme="nda"] {
    --brand: 213 25% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 213 25% 96%;
    --brand-hover: 213 25% 37%;
    --brand-dark: 213 25% 32%;
    --brand-darker: 213 25% 18%;
    --brand-muted: 216 18% 72%;
    --brand-border: 216 20% 80%;
    --brand-border-light: 216 20% 90%;
    --brand-gradient-to: 226 25% 96%;
  }
```

## lib/shareCards.ts
```ts
  "nda": {
    "color": "hsl(216, 25%, 42%)",
    "tint": "hsl(216, 25%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  nda: { title: "NDA Mock Test", description: "Practice Mathematics and the General Ability Test (English and General Knowledge) in timed mock tests at the real pace." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  nda: "IN",
```
Add `"nda"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  nda: "Mock tests for the UPSC NDA and NA exam: Mathematics and the General Ability Test (English and General Knowledge) at the real pace, with negative marking explained.",
// EXAM_ORG
  nda: "UPSC · National Defence Academy and Naval Academy Examination",
// SEARCH_ALIASES
  nda: "nda mock test nda na exam upsc nda national defence academy naval academy nda maths gat general ability test nda english gk nda 1 nda 2 defence exam army navy air force officer after 12th",
```
Hub group: NDA is a defence officer entrance exam taken after Class 12. Either add `"nda"` to "India government job
exams" (after `"ssccgl"`), or, if `agniveer` and `agniveervayu` land in this batch, create a group
"India defence exams" with `["nda", "agniveer", "agniveervayu"]` right after "India government job exams". Integrator's call.

## lib/examFacts.ts
```ts
  nda: {
    answer:
      "The NDA and NA exam is the Union Public Service Commission's written test, held twice a year, for entry to the National Defence Academy (Army, Navy and Air Force wings) and the Naval Academy. It has two objective papers of 2.5 hours each: Mathematics, 120 questions for 300 marks, and the General Ability Test, 150 questions for 600 marks, made up of English (200 marks) and General Knowledge (400 marks). A third of a question's marks is deducted for each wrong answer. Candidates who qualify go on to the 900-mark SSB interview.",
    rows: [
      { label: "Papers", value: "Mathematics; General Ability Test" },
      { label: "Questions", value: "120 in Mathematics, 150 in the GAT" },
      { label: "Time", value: "2.5 hours per paper" },
      { label: "Marks", value: "Mathematics 300, GAT 600 (English 200, General Knowledge 400)" },
      { label: "Negative marking", value: "One third of a question's marks per wrong answer" },
      { label: "Next stage", value: "SSB interview, 900 marks" },
      { label: "Sittings", value: "Twice a year: NDA (I) in April, NDA (II) in September" },
      { label: "Given by", value: "Union Public Service Commission" },
    ],
    basedOn: "UPSC Examination Notice No. 10/2026-NDA-II of 20 May 2026 (exam 13 September 2026); question counts per the question papers",
    source: { name: "Union Public Service Commission", url: "https://upsc.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES` (the landing already calls `classFaqJsonLd("nda")` and renders `<ExamClassFaq examId="nda" />`):
```ts
  nda: "an NDA coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"nda"` (NDA coaching institutes and Sainik/defence prep schools set mock tests).

## lib/tigerAssets.ts
No tiger set yet. Suggest borrowing one through `BORROWED_SETS`: `nda: "police"` (uniformed) or `nda: "ssccgl"`.

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## Decisions to check
- Facts were checked against the full text of Examination Notice No. 10/2026-NDA-II (a hosted copy of the PDF; upsc.gov.in
  refused connections): 300/600 marks, 2.5 hours each, one-third penalty, GK section weights. Question counts are per guides.
- Shorter mock (108 of 270 questions) at the real pace; said in `scoreNote`, the GAT directions and the landing FAQ.
- Duplicates: every GK, English and maths item was checked against all India banks in `data/v2/` (including the
  in-progress batch 3 banks agniveer, agniveervayu, upscse, rrbalp, rpfconst, ssccpo) by stem similarity and by
  same key plus shared keyword; matches were rewritten. Agniveer Vayu shares the class 11-12 maths syllabus, so
  generic templates (distance formula, focus of a parabola) remain with different numbers.

## CLAUDE.md
Add in the v2 section after the India exams:
```md
- **NDA** (`/nda`, landing `/nda-exam-practice-test`, `[data-theme="nda"]` slate blue, region IN, hub group "India government job exams" or a new "India defence exams"): UPSC National Defence Academy and Naval Academy Examination, held twice a year ((II) 2026 notice of 20 May 2026, exam 13 September 2026): Mathematics 120 questions for 300 marks and the General Ability Test 150 questions for 600 marks (English 200, General Knowledge 400), 2.5 hours each, a third of a question's marks off per wrong answer, then the 900-mark SSB (Examination Notice No. 10/2026-NDA-II; question counts per guides). Modelled at about 40 percent of the length at the real pace: two sections `maths` (48 in 60 min: `ndaAlgebra` 14, `ndaTrigGeo` 12, `ndaCalculus` 13, `ndaStats` 9) and `gat` (60 in 60 min: `ndaEnglish` 20 with a 4-item reading passage, `ndaPhysics`, `ndaChemBio`, `ndaHistory`, `ndaGeography` 10 each; current events not modelled), two mock tests, Test 2 held out, 9 drills, 11 dashboard steps. Bank `data/v2/nda/questions.json` (236 original single-answer items, prefix `NDA-`, object form with reading stimuli `NDA-RC1/2`) built by `python3 -I tools/next100/nda/build.py` (all-number options sorted and locked). Percent score; negative marking explained in `scoreNote` and on the landing, not applied. Sources in `tools/next100/nda/sources.md`.
```
Final hue settled by the integrator: nda 213 25% 44%, rrbalp 355 55% 32% (see app/globals.css).
