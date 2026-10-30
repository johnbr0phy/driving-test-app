# PSM I (`psm`) wiring for the integrator

v2 exam, modelled on PMP. Files already written (unique to this exam):
`tools/psm/*` (6 domain sources as Python data, `build.py`, `sources.md`), `data/v2/psm/questions.json`
(plain array, 200 items), `lib/v2/exams/psm.ts` (export `PSM`), `lib/v2/banks/psm.ts` (`plainBank`, like AWS),
`app/psm-1/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results; copied from
`app/pmp/`), `app/psm-1-practice-test/page.tsx`.

Rebuild: `python3 -I tools/psm/build.py`, then
`python3 -I tools/validate_v2_bank.py psm '{"1": {"psm": {"1": 80}}, "2": {"psm": {"1": 80}}}'`
(passes: 200 questions, 0 stimuli, 0 problems). Do not add `psm` to `tools/build_v2_bank.py` PLANS: it has
its own build (keys authored first and shuffled by a stem seed; True/False items keep the fixed order).

Dashboard: 6 drills + 2 tests = 8 steps. Test 2 is held out of the drills.
Screenshots still needed: `public/landing/psm-mobile.png`, `psm-desktop.png` (+ `-dark`).
The landing has no `ExamLandingBreadcrumbs` because the PMP template landing does not render it in this tree;
add it after the JSON-LD script if the integrator's tree has it.

## lib/v2/bankSizes.ts
```ts
  psm: 200,
```

## lib/v2/registry.ts
```ts
import { PSM } from "./exams/psm";
// EXAMS_V2: add PSM after PMP
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ PMP, PSM, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the pmp bank import:
```ts
import "@/lib/v2/banks/psm";          // classQuestions.ts
import '@/lib/v2/banks/psm';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `PSM.domainLabels` (keys `psmTheory`, `psmTeam`, `psmEvents`,
`psmArtifacts`, `psmValue`, `psmFacilitation`).

## app/globals.css
Suggested hue 262 (violet); the integrator should re-pick if it clashes. Keep `lib/v2/exams/psm.ts` `theme` in step.
```css
  /* PSM I theme: violet (v2 exam; matches lib/v2/exams/psm.ts theme) */
  [data-theme="psm"] {
    --brand: 262 52% 50%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 262 70% 96%;
    --brand-hover: 262 52% 44%;
    --brand-dark: 262 52% 38%;
    --brand-darker: 262 48% 20%;
    --brand-muted: 262 30% 74%;
    --brand-border: 262 40% 82%;
    --brand-border-light: 262 40% 91%;
    --brand-gradient-to: 276 60% 96%;
  }
```
Then run `tools/gen_dark_brand_css.py` for the `.dark` tint.

## lib/shareCards.ts
```ts
  "psm": {
    "color": "hsl(262, 52%, 50%)",
    "tint": "hsl(262, 70%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  psm: { title: "PSM I Professional Scrum Master", description: "Practice the 2020 Scrum Guide: accountabilities, events, artifacts and commitments, in 80 questions in 60 minutes." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line, after pmp
  pmp: "GLOBAL", psm: "GLOBAL",
```
Not in `NON_DRIVING_TESTS` (GLOBAL tests are listed in every country).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  psm: "Scrum.org Professional Scrum Master I on the 2020 Scrum Guide. Scrum theory and values, the Product Owner, Scrum Master and Developers, events and timeboxes, artifacts and their commitments, in 80 questions in 60 minutes with an 85 percent pass mark.",
// EXAM_ORG
  psm: "Scrum.org · Scrum Guide 2020",
// SEARCH_ALIASES
  psm: "psm psm1 psm i professional scrum master scrum.org scrum master certification scrum guide 2020 agile scrum exam csm sprint product owner",
// hub group
  { title: "Business and project management", ids: ["pmp", "psm" /* , itil, capm ... */] },
```
If the group stays small, `RELATED_OVERRIDES` could add `psm: ["pmp", "secplus", "aws"]`.

## lib/examFacts.ts
```ts
  psm: {
    answer:
      "The Professional Scrum Master I (PSM I) assessment from Scrum.org has 80 questions in 60 minutes, taken online in English. Questions are multiple choice, multiple answer and true/false, all based on the Scrum Guide (2020 edition), and you need 85 percent, 68 of 80, to pass. No course is required and the certification does not expire.",
    rows: [
      { label: "Questions", value: "80" },
      { label: "Time", value: "60 minutes" },
      { label: "Pass mark", value: "85% (68 of 80)" },
      { label: "Question types", value: "Multiple choice, multiple answer, true/false" },
      { label: "Based on", value: "The Scrum Guide (November 2020)" },
      { label: "Renewal", value: "None: the certification does not expire" },
      { label: "Given by", value: "Scrum.org, online" },
    ],
    basedOn: "Scrum.org's PSM I assessment page and the Scrum Guide (November 2020)",
    source: { name: "Scrum.org", url: "https://www.scrum.org/assessments/professional-scrum-master-i-certification" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, near `pmp`:
```ts
  psm: "a Scrum or agile course",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"psm"` after `"pmp"`.

## lib/tigerAssets.ts
Nothing (falls back to the DMV tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the PMP bullet in the v2 section:
```md
- **PSM I** (`/psm-1`, landing `/psm-1-practice-test`, `[data-theme="psm"]` violet, region GLOBAL, hub group "Business and project management"): Scrum.org Professional Scrum Master I, 80 questions in 60 minutes, 85% to pass, multiple choice, multiple answer and true/false. Two full 80-item tests at the real pace, Test 2 held out, 6 drills that follow the 2020 Scrum Guide (`psmTheory`, `psmTeam`, `psmEvents`, `psmArtifacts`, `psmValue`, `psmFacilitation`; 12/14/18/14/10/12 per test, 40 drill-only items), so the dashboard is 8 steps. True/false items are `single` with options True and False in fixed order. Bank `data/v2/psm/questions.json` (200 original items, prefix `PSM-`, plain array) built from `tools/psm/` by its own `tools/psm/build.py`; written from the Scrum Guide (CC BY-SA 4.0), never from Scrum.org's Open Assessments. Goal choices 80 to 95 with 85 as the pass line. Sources in `tools/psm/sources.md`.
```
