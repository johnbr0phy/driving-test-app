# CTET Paper I (`ctet`) wiring for the integrator

v2 exam, modelled on PMP / AWS CCP. Files already written (unique to this exam):
`tools/ctet/*` (8 domain sources as Python data, `stimuli.json` with 5 original passages and poems,
`build.py`, `sources.md`), `data/v2/ctet/questions.json` (object form `{ stimuli, questions }`, 160 items,
prefix `CTET-`), `lib/v2/exams/ctet.ts` (export `CTET`), `lib/v2/banks/ctet.ts` (`withStimuli`),
`app/ctet/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results; copied from
`app/pmp/`), `app/ctet-practice-test/page.tsx`.

Rebuild: `python3 -I tools/ctet/build.py`, then
`python3 -I tools/validate_v2_bank.py ctet '{"1": {"cdp":{"1":15},"lang":{"1":15},"maths":{"1":15},"evs":{"1":15}}, "2": {"cdp":{"1":15},"lang":{"1":15},"maths":{"1":15},"evs":{"1":15}}}'`
(passes: 160 questions, 5 stimuli, 0 problems). Do not add `ctet` to `tools/build_v2_bank.py` PLANS: it has
its own build (keys authored first and shuffled by a stem seed; passage items first in the Language section).

Shape: four sections (`cdp`, `lang`, `maths`, `evs`) of 15 questions in 15 minutes each (60 in 60, the real
one-minute pace), no break; 8 drills (one per domain) + 2 tests = 10 dashboard steps; Test 2 held out.
Per test: ctetDev 10, ctetLearn 5, ctetComp 8 (one prose passage + one poem, 4 items each), ctetLangPed 7,
ctetMaths 8 (2 typed numeric), ctetMathsPed 7, ctetEvs 8, ctetEvsPed 7; drill-only 5 per domain (one passage
CTET-P5). Drill pools: 15/10/13/12/13/12/13/12.

Screenshots still needed: `public/landing/ctet-mobile.png`, `ctet-desktop.png` (+ `-dark`), referenced by the
landing hero. No `ExamLandingBreadcrumbs` (not in this tree; PMP landing does not use it); add it if the
integrator's tree has it.

## lib/v2/bankSizes.ts
```ts
  ctet: 160,
```

## lib/v2/registry.ts
```ts
import { CTET } from "./exams/ctet";
// EXAMS_V2: add CTET with the other India exams (after SSC CGL / RRB NTPC if they are v2)
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ CTET, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/ctet";          // classQuestions.ts
import '@/lib/v2/banks/ctet';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `CTET.domainLabels` (keys `ctetDev`, `ctetLearn`, `ctetComp`,
`ctetLangPed`, `ctetMaths`, `ctetMathsPed`, `ctetEvs`, `ctetEvsPed`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). Suggested hue 55 (dark mustard gold): the
oranges 15 to 42 are crowded and 50 and 60 are the nearest neighbours. Re-pick freely; keep it in step with
`theme` in `lib/v2/exams/ctet.ts`.
```css
  /* CTET theme: mustard gold (v2 exam; matches lib/v2/exams/ctet.ts theme) */
  [data-theme="ctet"] {
    --brand: 55 80% 33%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 55 80% 95%;
    --brand-hover: 55 80% 28%;
    --brand-dark: 55 80% 24%;
    --brand-darker: 55 70% 14%;
    --brand-muted: 55 40% 68%;
    --brand-border: 55 45% 76%;
    --brand-border-light: 55 50% 88%;
    --brand-gradient-to: 45 80% 95%;
  }
```

## lib/shareCards.ts
```ts
  "ctet": {
    "color": "hsl(55, 80%, 33%)",
    "tint": "hsl(55, 80%, 95%)"
  },
```

## lib/shareCardCopy.ts
```ts
  ctet: { title: "CTET Paper 1 (Classes 1 to 5)", description: "Practise child development and pedagogy, English, maths and EVS, with content and pedagogy questions." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  ctet: "IN",
```
Add `"ctet"` to `NON_DRIVING_TESTS` (an India test that is not a driving test).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  ctet: "CBSE Central Teacher Eligibility Test, Paper I for Classes 1 to 5. Child Development and Pedagogy, English comprehension with unseen passages and poems, Mathematics and EVS, each with content and pedagogy questions. Language II is not included.",
// EXAM_ORG
  ctet: "CBSE · CTET Paper I syllabus",
// SEARCH_ALIASES
  ctet: "ctet ctet paper 1 ctet paper i ctet mock test cbse central teacher eligibility test tet teacher eligibility test primary teacher cdp child development and pedagogy evs pedagogy maths pedagogy prt kvs nvs dsssb india",
```
Hub group: the India government job exams group with SSC CGL and RRB NTPC (SPEC row 29 suggests
"India government job exams"); a teacher eligibility test also reads well under a broader "India exams"
title. If it would sit alone, `RELATED_OVERRIDES: ctet: ["ssccgl", "rrbntpc", "praxis"]`.

## lib/examFacts.ts
```ts
  ctet: {
    answer:
      "CTET Paper I is the Central Teacher Eligibility Test for teachers of Classes 1 to 5, conducted by CBSE. It has 150 one-mark multiple-choice questions in 2 hours 30 minutes, in five sections of 30: Child Development and Pedagogy, Language I, Language II, Mathematics and Environmental Studies, with half of each subject section on pedagogy. There is no negative marking. General candidates qualify with 60 percent (90 of 150) and reserved categories with 55 percent, and the certificate is valid for life.",
    rows: [
      { label: "Questions", value: "150 MCQs, 1 mark each" },
      { label: "Time", value: "2 hours 30 minutes" },
      { label: "Sections", value: "CDP, Language I, Language II, Maths, EVS (30 each)" },
      { label: "Negative marking", value: "None" },
      { label: "Qualifying mark", value: "60% (90/150); 55% for reserved categories" },
      { label: "Mode", value: "Pen and paper (OMR) in recent sessions" },
      { label: "Certificate", value: "Valid for life" },
      { label: "Conducted by", value: "CBSE, usually twice a year" },
    ],
    basedOn: "the CBSE CTET information bulletin and Paper I syllabus, checked October 2026",
    source: { name: "CBSE CTET", url: "https://ctet.nic.in/" },
  },
```

## components/exam/ExamClassFaq.tsx
`TEACHES`:
```ts
  ctet: "a CTET or B.Ed coaching class",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"ctet"` (coaching institutes run CTET batches).

## lib/tigerAssets.ts
Nothing (falls back to the DMV tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering; bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section after the other wave exams:
```md
- **CTET** (`/ctet`, landing `/ctet-practice-test`, `[data-theme="ctet"]`, region IN): CBSE Central Teacher Eligibility Test Paper I (Classes 1 to 5; real paper 150 MCQs in 150 minutes, five sections of 30, no negative marking, 60% qualifying, 55% reserved). Modelled: four 15-question sections in 15 minutes each (`cdp`, `lang`, `maths`, `evs`, 60 in 60, the real pace, no break); Language II is not modelled (chosen from 20 languages; the landing says so). Two tests, Test 2 held out, 8 drills (`ctetDev`, `ctetLearn`, `ctetComp`, `ctetLangPed`, `ctetMaths`, `ctetMathsPed`, `ctetEvs`, `ctetEvsPed`; 10/5/8/7/8/7/8/7 per test, 5 drill-only each), 10 dashboard steps. Language I uses original unseen passages and poems as shared stimuli (`CTET-P1`..`P5`). Bank `data/v2/ctet/questions.json` (160 original items, prefix `CTET-`) built by its own `tools/ctet/build.py`; sources in `tools/ctet/sources.md`.
```
