# MP Police Constable (`mppolice`) wiring for the integrator

v2 exam, template `uppolice`. Files written (unique to this exam): `tools/next100/mppolice/*` (8 domain sources as
Python data, `build.py`, `sources.md`, this file), `data/v2/mppolice/questions.json` (plain array, 232 items, prefix
`MPPOLICE-`), `lib/v2/exams/mppolice.ts` (export `MPPOLICE`), `lib/v2/banks/mppolice.ts` (`plainBank`),
`app/mp-police-constable/*` (layout, root redirect, dashboard, practice/[n], stats, test/[id], test/[id]/results;
copied from `app/up-police-constable/`), `app/mp-police-constable-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/mppolice/build.py`, then
`python3 -I tools/validate_v2_bank.py mppolice '{"1": {"paper": {"1": 100}}, "2": {"paper": {"1": 100}}}'`
(232 questions, 0 stimuli, 0 problems; key strictly longest 32/232 = 14%; key positions 52/47/79/54 after the review pass; locked all-number items 34/72 with the key in an end slot). Syllogism
conclusion sets and all-number option sets (sorted ascending, same unit) keep a fixed order with `lockedOrder`.
I ran a copy of the validator that skips the `lib/v2/bankSizes.ts` write, so add that line by hand.

Shape: one section `paper`, one module of 100 items in 120 minutes (the real paper's full length and time), grouped
in the paper's three parts: A GK and Reasoning 40 (India 14, Madhya Pradesh 12, computer 6, analogies and series 8),
B Intellectual and Mental Ability 30 (logical 15, mental 15), C Science and Simple Arithmetic 30 (science 15,
arithmetic 15). Two tests, Test 2 held out; 8 drills (one per domain), so the dashboard is 10 steps. No Basics,
no premium. 4 drill-only items per domain.

Decisions to check:
- **No General Hindi.** The brief said MP's paper includes Hindi, but every source for the 2025 recruitment (PW,
  StudyIQ, Careers360, Adda247) gives three parts, GK and Reasoning 40, Intellectual and Mental Ability 30, Science
  and Simple Arithmetic 30, with no Hindi section. I followed the reported pattern; the landing FAQ says there is no
  separate Hindi section and that Tigertest's questions are in English (guides differ on the paper's language: Hindi, or Hindi and English).
- **The MPESB rule book was not read.** esb.mp.gov.in returned 503 / connection resets on 2026-11-01, twice (build and review); no newspaper copy of the 2025 rule book or advertisement was found. The pattern
  (100 x 1 mark, 2 hours, no negative marking, 40/30/30) is from guides, which all agree; facts copy says
  "per guides" where it matters.
- **Hue (superseded)**: the integrator wired `191 46% 38%` in `app/globals.css` and `lib/v2/exams/mppolice.ts` uses the same, so the 173 block below is not used. Original note: the suggested 165 50% 30% clashes with danb (165 60% 31.8%), pnc (160 50% 30%) and hscmaths
  (168 38% 30%). I used **173 85% 30%** (police teal): within 8 degrees of cst (172 66% 30.6%, 19 points more
  saturated) and accuplacer (175 55% 32%, 30 more saturated); kentsa (182) and aerta (162) are 9 and 11 degrees away.
- Overlap: about 110 items rewritten against every India bank, including batch 2's rajpolice, delhipolice,
  biharpolice, sbiclerk, sbipo and ibpsrrb as they stood on 2026-11-01. Those were still changing, so re-run a
  stem comparison after the batch lands (generic reasoning templates, such as clock angles at other times, remain).
- Screenshots still needed: `public/landing/mppolice-mobile.png`, `mppolice-desktop.png` (+ dark).

## lib/v2/bankSizes.ts
```ts
  mppolice: 232,
```

## lib/v2/registry.ts
```ts
import { MPPOLICE } from "./exams/mppolice";
// EXAMS_V2: add MPPOLICE next to UPPOLICE with the other India government job exams
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/mppolice";          // classQuestions.ts
import '@/lib/v2/banks/mppolice';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `MPPOLICE.domainLabels` (keys `mppIndia`, `mppState`, `mppComputer`, `mppVerbal`,
`mppLogical`, `mppMental`, `mppScience`, `mppArith`).

## app/globals.css
Light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint.
```css
  /* MP Police Constable theme: police teal (v2 exam; matches lib/v2/exams/mppolice.ts theme) */
  [data-theme="mppolice"] {
    --brand: 173 85% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 173 60% 96%;
    --brand-hover: 173 85% 26%;
    --brand-dark: 173 85% 22%;
    --brand-darker: 173 75% 15%;
    --brand-muted: 173 30% 70%;
    --brand-border: 173 40% 78%;
    --brand-border-light: 173 40% 89%;
    --brand-gradient-to: 190 60% 96%;
  }
```

## lib/shareCardCopy.ts
```ts
  mppolice: { title: "MP Police Constable Mock Test", description: "Practice GK and reasoning, mental ability, science and arithmetic in full 100-question, 2-hour mock tests, with every answer explained." },
```

## lib/tigerAssets.ts
`BORROWED_SETS`: `mppolice: "police",` (as uppolice).

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  mppolice: "IN",
// NON_DRIVING_TESTS: add
  "mppolice",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  mppolice: "Mock tests for the MP Police Constable written exam (MPESB): General Knowledge (India, Madhya Pradesh, computers) and Reasoning, Intellectual and Mental Ability, and Science and Simple Arithmetic, 100 questions in 2 hours like the real paper.",
// EXAM_ORG
  mppolice: "MPESB · Police Constable Recruitment Test",
// SEARCH_ALIASES
  mppolice: "mp police constable mock test mp police mock test mpesb vyapam police bharti madhya pradesh police constable exam aarakshak bharti mp gk reasoning science practice set free sarkari exam government job exam india",
```
Hub group "India government job exams": add `"mppolice"` after `"uppolice"`.

## lib/examFacts.ts
```ts
  mppolice: {
    answer:
      "The MP Police Constable written exam is the Police Constable Recruitment Test of the Madhya Pradesh Employees Selection Board (MPESB). Guides report 100 objective questions worth 1 mark each, 100 marks in all, in 2 hours, with no negative marking, in three parts: General Knowledge and Reasoning 40, Intellectual and Mental Ability 30, and Science and Simple Arithmetic 30. The latest recruitment, for 7,500 posts, held its online written exam from 30 October 2025; candidates shortlisted on written marks go on to the physical tests.",
    rows: [
      { label: "Questions", value: "100 objective (1 mark each, 100 marks)" },
      { label: "Time", value: "2 hours" },
      { label: "Parts", value: "GK and Reasoning 40, Intellectual and Mental Ability 30, Science and Simple Arithmetic 30" },
      { label: "Negative marking", value: "None (per guides)" },
      { label: "Latest exam", value: "From 30 October 2025, online (7,500 posts)" },
      { label: "Next stages", value: "Physical tests, document verification and medical" },
      { label: "Given by", value: "Madhya Pradesh Employees Selection Board (MPESB)" },
    ],
    basedOn: "the MPESB Police Constable Recruitment Test 2025 as reported by exam guides, checked November 2026",
    source: { name: "Madhya Pradesh Employees Selection Board", url: "https://esb.mp.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  mppolice: "an MP Police coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"mppolice"` (coaching institutes run constable batches).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section after UP Police Constable:
```md
- **MP Police Constable** (`/mp-police-constable`, landing `/mp-police-constable-practice-test`, `[data-theme="mppolice"]` police teal, borrows the police tiger, region IN, hub group "India government job exams"): the MPESB Police Constable Recruitment Test (latest: 7,500 posts, online written exam from 30 October 2025; per guides 100 questions, 1 mark each, 2 hours, no negative marking, in three parts: GK and Reasoning 40, Intellectual and Mental Ability 30, Science and Simple Arithmetic 30; no General Hindi section; the rule book on esb.mp.gov.in could not be loaded). Modelled at full length, 100 questions in 120 minutes in the paper's three parts, two tests with Test 2 held out, 8 drills (`mppIndia`, `mppState` (Madhya Pradesh), `mppComputer`, `mppVerbal`, `mppLogical`, `mppMental`, `mppScience`, `mppArith`; 14/12/6/8/15/15/15/15 per test, 4 drill-only each), so the dashboard is 10 steps. Bank `data/v2/mppolice/questions.json` (232 original single-answer items in English, prefix `MPPOLICE-`) built by `python3 -I tools/next100/mppolice/build.py`. GK is static facts only; reasoning is text only. Sources in `tools/next100/mppolice/sources.md`.
```
