# RPF Constable (`rpfconst`) wiring for the integrator

v2 exam, built on the `rrbgroupd` template. Files written (unique to this exam):
`tools/next100/rpfconst/*` (8 domain sources as Python data, `build.py`, `sources.md`, this file),
`data/v2/rpfconst/questions.json` (plain array, 232 items, prefix `RPFC-`), `lib/v2/exams/rpfconst.ts` (export
`RPFCONST`), `lib/v2/banks/rpfconst.ts` (`plainBank`), `app/rpf-constable/*` (layout, root redirect, dashboard,
practice/[n], test/[id], test/[id]/results, stats; copied from `app/rrb-group-d/`),
`app/rpf-constable-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/rpfconst/build.py`, then validate with the bankSizes write stubbed out:
`python3 -I tools/validate_v2_bank.py rpfconst '{"1": {"cbt": {"1": 100}}, "2": {"cbt": {"1": 100}}}'`
(232 questions, 0 stimuli, 0 problems; key strictly longest 32/232 = 14%; 79 all-number items sorted and locked,
key in an end slot 41/79 = 52%; 9 conclusion, assumption and data sufficiency sets locked in their usual order).
`lib/v2/bankSizes.ts` was not touched. Do not add `rpfconst` to `tools/build_v2_bank.py` PLANS.

Model: the real CBT (CEN RPF 02/2024) is 120 questions in 90 minutes (GA 50, Arithmetic 35, Reasoning 35, per
guides). The mocks are 100 questions in 75 minutes, the same pace and balance: GA 42 (history 11, geography 10,
polity/economy/railways/sports 11, general science 10), Arithmetic 29 (word problems 15, numbers/algebra/geometry
14), Reasoning 29 (verbal 15, logical 14); 4 drill-only per domain. Dashboard: 8 drills + 2 tests = 10 steps. No
Basics, no premium.

Screenshots still needed: `public/landing/rpfconst-mobile.png`, `rpfconst-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  rpfconst: 232,
```

## lib/v2/registry.ts
```ts
import { RPFCONST } from "./exams/rpfconst";
// EXAMS_V2: add RPFCONST after RRBGROUPD (or after RRBALP if that lands first)
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/rpfconst";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `RPFCONST.domainLabels` (keys `rpfconstHistory`, `rpfconstGeography`,
`rpfconstPolity`, `rpfconstScience`, `rpfconstArith`, `rpfconstMaths`, `rpfconstVerbal`, `rpfconstLogical`).

## app/globals.css
The brief's 230 35% 34% clashes with `security` (222 35% 36%) and `awssaa` (235 30% 32%) under the 8-degree rule,
so this uses **228 20% 40%** (steel slate): within 8 degrees of `awssaa` it differs by 10 in saturation and 8 in
lightness, of `security` by 15 in saturation, of `caguard` (228 80% 30%) by 60, of `psat` (230 50% 28%) by 30, of
`police` (226 70% 28%) by 50, of `uklitu` (229 100% 42%) by 80 and of `osslt` (232 52% 42%) by 32. Checked against
every block in globals.css and every `lib/v2/exams/*.ts` theme on 2026-11-01 (not against other batch 3 builders'
suggestions still unregistered; ssccpo 262, nda 214, agniveervayu 205 and aplang 200 are all more than 8 degrees
away). Run `tools/gen_dark_brand_css.py` afterwards. Matches `lib/v2/exams/rpfconst.ts` `theme`.
```css
  /* RPF Constable theme: steel slate (v2 exam; matches lib/v2/exams/rpfconst.ts theme) */
  [data-theme="rpfconst"] {
    --brand: 228 20% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 228 30% 96%;
    --brand-hover: 228 20% 35%;
    --brand-dark: 228 20% 30%;
    --brand-darker: 228 20% 16%;
    --brand-muted: 228 15% 72%;
    --brand-border: 228 18% 80%;
    --brand-border-light: 228 18% 90%;
    --brand-gradient-to: 245 30% 96%;
  }
```

## lib/shareCards.ts
```ts
  "rpfconst": {
    "color": "hsl(228, 20%, 40%)",
    "tint": "hsl(228, 30%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  rpfconst: { title: "RPF Constable CBT", description: "100-question Railway Protection Force constable mock tests on General Awareness, Arithmetic and Reasoning, with every answer explained." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  rpfconst: "IN",
// NON_DRIVING_TESTS: add
  "rpfconst",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  rpfconst: "Mock tests for the RPF Constable CBT: 100 questions at the real pace on General Awareness (history, geography, polity, the railways and general science), Arithmetic, and General Intelligence and Reasoning, with negative marking explained.",
// EXAM_ORG
  rpfconst: "Railway Recruitment Boards · RPF and RPSF Constable CBT",
// SEARCH_ALIASES
  rpfconst: "rpf constable mock test rpf constable practice test rpf mock test railway protection force constable rpsf constable rpf exam cbt rpf gk questions rpf constable 2026 railway police constable free mock test india government job exam",
// RELATED_OVERRIDES
  rpfconst: ["rrbgroupd", "rrbntpc", "sscgd"],
```
Hub group "India government job exams": add `"rpfconst"` right after `"rrbgroupd"` (after `"rrbalp"` if that is
placed after Group D).

## lib/examFacts.ts
```ts
  rpfconst: {
    answer:
      "The RPF Constable exam is the Computer Based Test for Constable (Executive) posts in the Railway Protection Force and the Railway Protection Special Force. In the last recruitment, CEN RPF 02/2024 run by the Railway Recruitment Boards (CBT held in March 2025), it had 120 multiple-choice questions in 90 minutes: exam guides give 50 on General Awareness, 35 on Arithmetic and 35 on General Intelligence and Reasoning. One third of a mark is deducted for each wrong answer, and guides report minimum qualifying marks of 35 percent for UR, EWS and OBC and 30 percent for SC and ST. Shortlisted candidates then take the Physical Efficiency and Physical Measurement Tests (qualifying) and document verification. The next notice had not been published as of November 2026.",
    rows: [
      { label: "Questions", value: "120 multiple choice" },
      { label: "Time", value: "90 minutes" },
      { label: "Sections", value: "General Awareness 50, Arithmetic 35, Reasoning 35 (as reported by guides)" },
      { label: "Negative marking", value: "1/3 mark per wrong answer" },
      { label: "Qualifying marks", value: "UR, EWS and OBC 35%, SC and ST 30% (as reported by guides)" },
      { label: "Next stages", value: "PET and PMT (qualifying), document verification" },
      { label: "Given by", value: "Railway Recruitment Boards (CEN RPF 02/2024)" },
    ],
    basedOn: "the RRB notice CEN RPF 02/2024 (Constable) and its March 2025 CBT",
    source: { name: "Railway Recruitment Boards", url: "https://www.rrbcdg.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  rpfconst: "an RPF or railway exam coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"rpfconst"` (coaching institutes run RPF Constable batches).

## lib/tigerAssets.ts
`BORROWED_SETS`: add `rpfconst: "police"` (as uppolice does).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
After the RRB Group D bullet:
```md
- **RPF Constable** (`/rpf-constable`, landing `/rpf-constable-practice-test`, `[data-theme="rpfconst"]` steel slate, borrows the police tiger, region IN, hub group "India government job exams"): the Railway Protection Force and RPSF Constable (Executive) CBT as run by the Railway Recruitment Boards under CEN RPF 02/2024 (4,208 posts, CBT March 2025): 120 questions in 90 minutes, General Awareness 50, Arithmetic 35, General Intelligence and Reasoning 35 (the split per guides; the notice could not be opened), 1/3 mark off per wrong answer (explained, not scored), qualifying UR/EWS/OBC 35% and SC/ST 30% per guides, then PET and PMT (qualifying) and document verification. The next notice had not been published as of November 2026 (coaching sites say SSC may run it; unconfirmed). Modelled at 100 questions in 75 minutes (the real pace, GA 42, Arithmetic 29, Reasoning 29, one module grouped in that order), two tests with Test 2 held out, 8 drills (`rpfconstHistory`, `rpfconstGeography`, `rpfconstPolity` (polity, economy, sports and the railways), `rpfconstScience`, `rpfconstArith`, `rpfconstMaths`, `rpfconstVerbal`, `rpfconstLogical`; 11/10/11/10/15/14/15/14 per test, 4 drill-only each), so the dashboard is 10 steps. Bank `data/v2/rpfconst/questions.json` (232 original single-answer items, prefix `RPFC-`) built by `python3 -I tools/next100/rpfconst/build.py` (all-number options sorted and locked, conclusion, assumption and data sufficiency sets locked). GA is static facts only and uses less common facts to stay clear of the other India banks; reasoning is text only. Sources in `tools/next100/rpfconst/sources.md`.
```
