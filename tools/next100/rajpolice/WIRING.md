# Rajasthan Police Constable (`rajpolice`) wiring for the integrator

v2 exam, template `uppolice`. Files written (unique to this exam): `tools/next100/rajpolice/*` (8 domain sources as
Python data, `build.py`, `sources.md`, this file), `data/v2/rajpolice/questions.json` (plain array, 232 items, prefix
`RAJPOLICE-`), `lib/v2/exams/rajpolice.ts` (export `RAJPOLICE`), `lib/v2/banks/rajpolice.ts` (`plainBank`),
`app/rajasthan-police-constable/*` (layout, root redirect, dashboard, practice/[n], stats, test/[id],
test/[id]/results; copied from `app/up-police-constable/`), `app/rajasthan-police-constable-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/rajpolice/build.py`, then
`python3 -I tools/validate_v2_bank.py rajpolice '{"1": {"paper": {"1": 100}}, "2": {"paper": {"1": 100}}}'`
(232 questions, 0 stimuli, 0 problems; key strictly longest 46/232 = 20%). I ran a copy of the validator that skips
the `lib/v2/bankSizes.ts` write, so add that line by hand. The build sorts all-number options ascending and marks
them `lockedOrder` (as `sscgd` does), and keeps the conclusion and assumption sets in natural order with
`lockedOrder`.

Shape: one section `paper`, one module of 100 items in 80 minutes (the real 150 in 120 at the same pace), items grouped
by part as on the paper (reasoning and computer, then GK with laws on women and children, then Rajasthan GK); two
tests, Test 2 held out; 8 drills (one per domain), so the dashboard is 10 steps. No Basics, no premium. Per test
14/14/12/20/10/10/10/10 (40/30/30 by part, the real 60/45/45 scaled), 4 drill-only each.

Decisions to check:
- **No General Hindi.** The brief asked for General Hindi in Hindi, but every source for the 2025 notification
  (Utkarsh, Career Power, Invictaa, Embibe) gives three parts with no Hindi language section: reasoning and computer 60,
  GK/science/social science/current affairs/laws on women and children 45, Rajasthan GK 45. The paper itself is
  bilingual. I followed the sources; the landing has an FAQ saying so. Bank items are in English.
- **Official notice not read.** police.rajasthan.gov.in and its notification PDF reset the connection or returned 503
  on 2026-11-01. The pattern, negative marking (a quarter of a question's marks) and qualifying marks (40% general,
  36% SC/ST) come from guides and are labelled "guides report" in copy. Guides for 2025 say 150 marks (1 each);
  older pages say 75 marks with PET marks in merit (an earlier recruitment). Copy avoids a total-marks figure except
  in the examFacts row, which says "150 (1 each, per guides)".
- **Hue** 40 65% 38% (not the brief's 40 75% 34%, which clashes with forklift 42 80% 32.3% and cawhmis 37 62% 30%).
  Checked against every theme in `globals.css`, the v2 configs and the batch-2 suggested hues: within 8 degrees it
  differs from cawhmis by 8 lightness, forklift by 15 saturation, foodmgr (42 90%) by 25 saturation, ham (32 90%) by
  25 saturation, jelec (36 90%) by 25 saturation, notary (35 45%) by 20 saturation, cscs (46 50%) by 15 saturation.
- Overlap: checked against every India bank in `data/v2/` as of 2026-11-01, including the batch-2 banks still being
  written (sbiclerk, sbipo, ibpsrrb, biharpolice, delhipolice, mppolice, phcse); about 90 items rewritten. The batch
  banks were still changing, so re-run a stem comparison after the batch lands.
- Screenshots still needed: `public/landing/rajpolice-mobile.png`, `rajpolice-desktop.png` (+ dark).

## lib/v2/bankSizes.ts
```ts
  rajpolice: 232,
```

## lib/v2/registry.ts
```ts
import { RAJPOLICE } from "./exams/rajpolice";
// EXAMS_V2: add RAJPOLICE with the other India government job exams, after UPPOLICE
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ UPPOLICE, RAJPOLICE, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/rajpolice";         // classQuestions.ts
import '@/lib/v2/banks/rajpolice';         // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `RAJPOLICE.domainLabels` (keys `rajVerbal`, `rajLogical`, `rajComputer`,
`rajIndia`, `rajLaw`, `rajHistory`, `rajCulture`, `rajGeo`).

## app/globals.css
Light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint.
```css
  /* Rajasthan Police Constable theme: desert ochre (v2 exam; matches lib/v2/exams/rajpolice.ts theme) */
  [data-theme="rajpolice"] {
    --brand: 40 65% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 40 65% 96%;
    --brand-hover: 40 65% 33%;
    --brand-dark: 40 65% 28%;
    --brand-darker: 40 60% 18%;
    --brand-muted: 40 35% 72%;
    --brand-border: 40 40% 80%;
    --brand-border-light: 40 40% 90%;
    --brand-gradient-to: 30 65% 96%;
  }
```

## lib/shareCards.ts
```ts
  "rajpolice": {
    "color": "hsl(40, 65%, 38%)",
    "tint": "hsl(40, 65%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  rajpolice: { title: "Rajasthan Police Constable Mock Test", description: "Practice reasoning, basic computer, GK, laws on women and children, and Rajasthan GK in 100-question mock tests at the real exam's pace, with every answer explained." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  rajpolice: "IN",
// NON_DRIVING_TESTS: add
  "rajpolice",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  rajpolice: "Mock tests for the Rajasthan Police Constable written exam: reasoning and basic computer knowledge, general knowledge and science, laws on crimes against women and children, and Rajasthan GK, in the real 60/45/45 balance and at the real pace, with negative marking explained.",
// EXAM_ORG
  rajpolice: "Rajasthan Police · Constable written exam",
// SEARCH_ALIASES
  rajpolice: "rajasthan police constable mock test rajasthan police mock test raj police constable rajasthan sipahi bharti police constable exam rajasthan gk rajasthan computer reasoning women and children laws practice set free sarkari exam government job exam india",
// RELATED_OVERRIDES (if the group would otherwise be thin)
  rajpolice: ["uppolice", "ssccgl", "rrbntpc"],
```
Hub group "India government job exams": add `"rajpolice"` next to `"uppolice"`:
```ts
  { title: "India government job exams", ids: ["ssccgl", "rrbntpc", "ibpspo", "ctet", /* batch ids */ "uppolice", "rajpolice"] },
```

## lib/examFacts.ts
```ts
  rajpolice: {
    answer:
      "The Rajasthan Police Constable written exam is set by Rajasthan Police for constable posts. As guides report the 2025 notification, it has 150 objective questions in 2 hours, in three parts: logical ability, reasoning and basic computer knowledge 60; general knowledge, general science, social science, current affairs and laws on crimes against women and children 45; and Rajasthan's history, culture, geography, economy and polity 45. A quarter of a question's marks is taken off for each wrong answer. There is no Hindi language section; the paper is set in Hindi and English. The latest written exam was held on 13 and 14 September 2025; candidates who clear it go on to physical tests and document checks.",
    rows: [
      { label: "Questions", value: "150 objective (1 mark each, per guides)" },
      { label: "Time", value: "2 hours" },
      { label: "Parts", value: "Reasoning and computer 60, GK with laws on women and children 45, Rajasthan GK 45" },
      { label: "Negative marking", value: "A quarter of a question's marks per wrong answer (per guides)" },
      { label: "Latest exam", value: "13 and 14 September 2025 (notification of 9 April 2025)" },
      { label: "Next stages", value: "Physical efficiency and standards tests, documents and medical" },
      { label: "Given by", value: "Rajasthan Police" },
    ],
    basedOn: "the Rajasthan Police constable recruitment of 2025 as reported by exam guides, checked November 2026",
    source: { name: "Rajasthan Police", url: "https://police.rajasthan.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  rajpolice: "a Rajasthan Police coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"rajpolice"` (coaching institutes run constable batches).

## lib/tigerAssets.ts
Nothing required (falls back to the DMV tiger). Optionally borrow the police tiger like `uppolice`:
```ts
// BORROWED_SETS
  rajpolice: "police",
```

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section with the other India exams, after UP Police Constable:
```md
- **Rajasthan Police Constable** (`/rajasthan-police-constable`, landing `/rajasthan-police-constable-practice-test`, `[data-theme="rajpolice"]` desert ochre, region IN, hub group "India government job exams"): the Rajasthan Police constable written exam (latest: notification 9 April 2025, exam 13 and 14 September 2025; per guides, the department's site did not load: 150 questions in 2 hours, reasoning and basic computer 60, GK/science/current affairs/laws on crimes against women and children 45, Rajasthan GK 45, a quarter of a question's marks off per wrong answer, explained, not scored; no Hindi language section). Modelled at 100 questions in 80 minutes (the real pace, 40/30/30 by part, one module grouped in the paper's order), two tests with Test 2 held out, 8 drills (`rajVerbal`, `rajLogical`, `rajComputer`, `rajIndia`, `rajLaw`, `rajHistory`, `rajCulture`, `rajGeo`; 14/14/12/20/10/10/10/10 per test, 4 drill-only each), so the dashboard is 10 steps. Bank `data/v2/rajpolice/questions.json` (232 original single-answer items in English, prefix `RAJPOLICE-`) built by `python3 -I tools/next100/rajpolice/build.py`. GK is static facts only (no schemes, district lists or office-holders); reasoning is text only. Sources in `tools/next100/rajpolice/sources.md`.
```
