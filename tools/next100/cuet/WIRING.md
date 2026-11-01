# CUET (UG) General Aptitude Test (`cuet`) wiring for the integrator

v2 exam, built on the `ssccgl` / `delhipolice` single-section pattern. Files already written (unique to this exam):
`tools/next100/cuet/*` (8 domain sources as Python data, `build.py`, `sources.md`, this file),
`data/v2/cuet/questions.json` (plain array, no stimuli), `lib/v2/exams/cuet.ts` (export `CUET`),
`lib/v2/banks/cuet.ts` (`plainBank`), `app/cuet/*` (layout, root redirect, dashboard, practice/[n], stats,
test/[id], test/[id]/results; copied from `app/delhi-police-constable/`),
`app/cuet-general-test-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/cuet/build.py`, then
`python3 -I tools/validate_v2_bank.py cuet '{"1": {"gat": {"1": 50}}, "2": {"gat": {"1": 50}}}'`
(passes: 202 questions, 0 stimuli, 0 problems; run on a /tmp copy because the validator rewrites
`lib/v2/bankSizes.ts`). Key strictly the longest option: 22/202 = 11%. 83 all-number items are sorted and locked;
the key is in an end slot in 42 of them (51%). Statement-conclusion, statement-assumption and course-of-action
items use the locked I / II / both / neither order. Per test: GK 18 (history 6, geography and polity 6, science 6),
mental ability 7, numerical ability 7, quantitative reasoning 8, logical 5, analytical 5; 102 drill-only items.

Screenshots still needed: `public/landing/cuet-mobile.png`, `cuet-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  cuet: 202,
```

## lib/v2/registry.ts
```ts
import { CUET } from "./exams/cuet";
// EXAMS_V2: add CUET after the other India entrance exams of batch 4 (neet, jeemain, mhtcet), or after JNVST
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/cuet";
```
(mcpV2Practice uses single quotes: `import '@/lib/v2/banks/cuet';`)

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `CUET.domainLabels` (keys `cuetHistory`, `cuetGeoPolity`, `cuetScience`,
`cuetMental`, `cuetNumerical`, `cuetQuant`, `cuetLogical`, `cuetAnalytical`).

## app/globals.css
The brief's hue `280 30% 40%` is within 8 degrees of `cpc` (`280 40% 43%`: 10 points of saturation, 3 of lightness),
so it clashes. Dropping lightness to 30% clears it (13 points of lightness) and stays clear of `ks2` (280 55% 44%:
25 sat), `rexpn` (276 60% 32%: 30 sat), `gcsehigher` (286 60% 36%: 30 sat), `mykpp` (280 100% 48%) and `appsych`
(271 35% 42%, 9 degrees away). Check against the other batch-4 hues. `CUET.theme` uses this value. Light block
(then run `tools/gen_dark_brand_css.py` for the `.dark` tint):
```css
  /* CUET (UG) General Aptitude Test theme: deep plum (v2 exam; matches lib/v2/exams/cuet.ts theme) */
  [data-theme="cuet"] {
    --brand: 280 30% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 280 30% 96%;
    --brand-hover: 280 30% 26%;
    --brand-dark: 280 30% 22%;
    --brand-darker: 280 26% 15%;
    --brand-muted: 280 16% 68%;
    --brand-border: 280 20% 78%;
    --brand-border-light: 280 20% 88%;
    --brand-gradient-to: 290 30% 95%;
  }
```

## lib/shareCards.ts
```ts
  "cuet": {
    "color": "hsl(280, 30%, 30%)",
    "tint": "hsl(280, 30%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  cuet: { title: "CUET General Test Practice", description: "Practise GK, mental ability, numerical ability and reasoning in full 50-question, 60-minute CUET (UG) General Aptitude Test mocks." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  cuet: "IN",
```
Add `"cuet"` to `NON_DRIVING_TESTS` (next to `"jnvst"`).

## lib/tigerAssets.ts
`BORROWED_SETS`: `cuet: "sat",` (a college-entrance tiger; `"ssccgl"` would also do if the India entrance exams of
this batch share one).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  cuet: "Practice for the CUET (UG) General Aptitude Test conducted by the NTA: full 50-question, 60-minute tests on general knowledge, general mental ability, numerical ability, quantitative reasoning and logical and analytical reasoning, with the +5/-1 marking explained.",
// EXAM_ORG
  cuet: "National Testing Agency · CUET (UG) General Aptitude Test",
// SEARCH_ALIASES
  cuet: "cuet cuet ug cuet general test cuet gat cuet general aptitude test cuet 501 cuet mock test cuet 2026 cuet 2027 common university entrance test nta cuet central university entrance test cuet reasoning cuet quantitative aptitude cuet gk du admission entrance exam india",
```
Hub group: CUET is a university entrance test. If the integrator creates a group for this batch's entrance exams,
put it there:
```ts
  { title: "India university entrance tests", ids: ["jeemain", "neet", "mhtcet", "cuet"] },
```
Otherwise add `"cuet"` to "India school entrance tests" after `"jnvst"`.

## lib/examFacts.ts
```ts
  cuet: {
    answer:
      "The CUET (UG) General Aptitude Test (test code 501) is one of the 37 papers of the Common University Entrance Test for undergraduate admission to central and participating universities, conducted by the National Testing Agency. Under the CUET (UG) 2026 Information Bulletin it has 50 compulsory multiple-choice questions in 60 minutes, taken as a computer based test in 13 mediums. Each right answer earns 5 marks and each wrong one loses 1. The syllabus is general knowledge, current affairs, general mental ability, numerical ability, quantitative reasoning (arithmetic, algebra, geometry, mensuration and statistics) and logical and analytical reasoning; NTA's 2026 syllabus for test 501 also lists general science and environment literacy. Candidates may take up to five CUET papers, and each university decides which papers a course requires.",
    rows: [
      { label: "Questions", value: "50, all compulsory" },
      { label: "Time", value: "60 minutes" },
      { label: "Marks", value: "5 per right answer, 250 in all" },
      { label: "Negative marking", value: "1 mark per wrong answer" },
      { label: "Syllabus", value: "GK and current affairs, mental ability, numerical ability, quantitative, logical and analytical reasoning, general science and environment" },
      { label: "Mode", value: "Computer based test, multiple shifts, NTA scores" },
      { label: "Mediums", value: "13 Indian languages, English included" },
      { label: "Paper choice", value: "Up to five CUET papers in all, languages included" },
      { label: "Given by", value: "National Testing Agency" },
    ],
    basedOn: "the CUET (UG) 2026 Information Bulletin and the 2026 General Test (501) syllabus of the National Testing Agency",
    source: { name: "National Testing Agency", url: "https://cuet.nta.nic.in" },
    tigertest:
      "Tigertest has two full CUET General Test practice tests of 50 questions in 60 minutes and eight topic drills: three for general knowledge and one each for mental ability, numerical ability, quantitative reasoning, logical reasoning and analytical reasoning. All of it is free with no account required; scores are percent correct, with the +5/-1 marking explained rather than applied.",
  },
```
(checked 2026-11-01 against the official 2026 bulletin and 501 syllabus on cuet.nta.nic.in; no 2027 bulletin had been published)

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  cuet: "a CUET coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"cuet"` (coaching institutes and Class 12 schools run CUET batches).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## next.config.ts
Nothing needed.

## CLAUDE.md
Add in the v2 section after the JNVST bullet:
```md
- **CUET General Test** (`/cuet`, landing `/cuet-general-test-practice-test`, `[data-theme="cuet"]` deep plum, borrows the SAT tiger, region IN, hub group "India university entrance tests"): the National Testing Agency's CUET (UG) General Aptitude Test (code 501) on the CUET (UG) 2026 Information Bulletin (exam 11-31 May 2026, tentative): 50 compulsory multiple-choice questions in 60 minutes, +5 for a right answer and -1 for a wrong one, computer based in 13 mediums, NTA scores across shifts; syllabus general knowledge, current affairs, general mental ability, numerical ability, quantitative reasoning (arithmetic, algebra, geometry, mensuration, statistics), logical and analytical reasoning, and (in the 2026 syllabus for test 501) general science and environment literacy; up to five CUET papers per candidate. NTA publishes no topic split, so the blueprint is Tigertest's: one section `gat`, one 50-item, 60-minute module in syllabus order (GK 18: `cuetHistory`, `cuetGeoPolity`, `cuetScience` 6 each; `cuetMental` 7, `cuetNumerical` 7, `cuetQuant` 8, `cuetLogical` 5, `cuetAnalytical` 5), two full-length practice tests, Test 2 held out, 8 drills, so the dashboard is 10 steps. Bank `data/v2/cuet/questions.json` (202 original single-answer items, prefix `CUET-`, plain array, 102 drill-only) built by `python3 -I tools/next100/cuet/build.py` (all-number options sorted and locked, conclusion, assumption and course-of-action sets locked). GK static only (current affairs left out), reasoning text only, English only. Percent score; the +5/-1 marking explained, not applied. Sources in `tools/next100/cuet/sources.md`.
```

## Overlap with other banks
Checked on 1 November 2026 against every India bank on disk (ssccgl, rrbntpc, ibpspo, ctet, rrbgroupd, sscgd, sscchsl,
sscmts, uppolice, ibpsclerk, jnvst, sbiclerk, sbipo, ibpsrrb, biharpolice, rajpolice, delhipolice, mppolice, upscse,
nda, agniveer, agniveervayu, rrbalp, rpfconst, ssccpo, phcse) and the batch-4 banks present then (neet, jeemain,
mhtcet, ugcnet, reet, uptet, aissee): about 50 first-draft items that shared numbers or a fact and answer were
rewritten. Remaining same-answer matches are structural (different numbers, names or relations). Recheck once the
other batch-4 banks are final.

Review pass (1 November 2026): rechecked against every India bank (all batch-4 banks included), the US school
banks and the Philippines banks; 25 more items rewritten (shared number sets, a shared worked example such as
MANGO/NBOHP or C, H, M, R, or the same fact and answer). The CUET (UG) 2026 bulletin and the 501 syllabus were
read on cuet.nta.nic.in itself; see `sources.md`.
