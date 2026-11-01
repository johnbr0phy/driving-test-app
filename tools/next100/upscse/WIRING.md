# UPSC Civil Services Prelims (`upscse`) wiring for the integrator

v2 exam, built on the `rrbntpc` template (via the `rrbgroupd` next100 copy). Files written (unique to this exam):
`tools/next100/upscse/*` (8 domain sources as Python data, `build.py`, `sources.md`, this file),
`data/v2/upscse/questions.json` (plain array, 234 items, prefix `UPSCSE-`, CSAT items carry an inline `passage`),
`lib/v2/exams/upscse.ts` (export `UPSCSE`), `lib/v2/banks/upscse.ts` (`plainBank`), `app/upsc-prelims/*` (layout,
root redirect, dashboard, practice/[n], test/[id], test/[id]/results, stats; copied from `app/rrb-group-d/`),
`app/upsc-prelims-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/upscse/build.py`, then validate (from a copy that does not write bankSizes):
`python3 -I tools/validate_v2_bank.py upscse '{"1": {"gs": {"1": 100}}, "2": {"gs": {"1": 100}}}'`
(234 questions, 0 stimuli, 0 problems; key strictly longest 28/234 = 12%). Do not add `upscse` to
`tools/build_v2_bank.py` PLANS.

Dashboard: 8 drills + 2 tests = 10 steps. No Basics, no premium. Per test 14 ancient/medieval/culture, 14 modern,
16 geography, 16 polity, 14 economy, 14 environment, 12 science (Tigertest's split); 2 drill-only per GS domain;
CSAT is 20 drill-only items (section `gs`, domain `upscseCsat`, never in a test). 102 statement-format items use
`lockedOrder` (option sets "1 only / 2 only / Both / Neither", "1 and 2 only ... 1, 2 and 3", "Only one / Only two /
All three / None of them", "...pairs"); 9 all-number items are sorted and locked (key in an end slot 5 of 9).

Screenshots still needed: `public/landing/upscse-mobile.png`, `upscse-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  upscse: 234,
```

## lib/v2/registry.ts
```ts
import { UPSCSE } from "./exams/upscse";
// EXAMS_V2: add UPSCSE after the India government job exams (e.g. after SSCCGL)
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/upscse";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `UPSCSE.domainLabels` (keys `upscseAncient`, `upscseModern`, `upscseGeography`,
`upscsePolity`, `upscseEconomy`, `upscseEnvironment`, `upscseScience`, `upscseCsat`).

## app/globals.css
Hue: the brief suggested 28 45% 34%, but that clashes with `notary` (35 45% 36%), `cacarp` (24 50% 30%) and the
batch-3 suggestion for `apworld` (30 30% 36%). Using **28 65% 30%** (deep rust brown), which passes the 8-degree rule
against every theme in globals.css and every batch-3 suggestion (nearest: ctet 22 80% 28%, sat +15; itil 28 90% 31%,
sat +25; sscmts 26 70% 38%, light +8; cacarp 24 50% 30%, sat +15). Matches `lib/v2/exams/upscse.ts` `theme`. Run
`tools/gen_dark_brand_css.py` afterwards.
```css
  /* UPSC Prelims theme: deep rust brown (v2 exam; matches lib/v2/exams/upscse.ts theme) */
  [data-theme="upscse"] {
    --brand: 28 65% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 28 65% 96%;
    --brand-hover: 28 65% 25%;
    --brand-dark: 28 65% 22%;
    --brand-darker: 28 60% 12%;
    --brand-muted: 28 30% 72%;
    --brand-border: 28 35% 80%;
    --brand-border-light: 28 35% 90%;
    --brand-gradient-to: 40 65% 96%;
  }
```

## lib/shareCards.ts
```ts
  "upscse": {
    "color": "hsl(28, 65%, 30%)",
    "tint": "hsl(28, 65%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  upscse: { title: "UPSC Prelims GS Paper I", description: "Full 100-question GS Paper I mock tests, subject drills in the UPSC statement format and a CSAT drill, with every answer explained." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  upscse: "IN",
// NON_DRIVING_TESTS: add
  "upscse",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  upscse: "Mock tests for UPSC Civil Services Prelims GS Paper I: 100 questions in 2 hours on history, geography, polity, economy, environment and science in the UPSC statement format, plus a CSAT drill, with negative marking explained.",
// EXAM_ORG
  upscse: "Union Public Service Commission · Civil Services (Preliminary) GS Paper I",
// SEARCH_ALIASES
  upscse: "upsc prelims mock test upsc prelims practice test ias prelims mock test civil services preliminary exam cse prelims gs paper 1 general studies upsc csat paper 2 ias exam ips ifs upsc polity questions upsc history questions free upsc mock test india government exam",
// RELATED_OVERRIDES (if needed)
  upscse: ["ssccgl", "ibpspo", "sscchsl"],
```
Hub group "India government job exams": add `"upscse"` first (or right after `"ssccgl"`), as the flagship
civil services exam.

## lib/examFacts.ts
```ts
  upscse: {
    answer:
      "The UPSC Civil Services Preliminary Examination is the screening stage for the IAS, IPS, IFS and other central services. It has two compulsory objective papers of 200 marks each, two hours each, set in Hindi and English. General Studies Paper I decides who qualifies for the Main examination; Paper II (CSAT) is qualifying, with 33% needed. Every question has four options, and one-third of a question's marks is deducted for each wrong answer. Guides list 100 questions in Paper I and 80 in Paper II. Prelims marks are not counted in the final ranking.",
    rows: [
      { label: "Papers", value: "GS Paper I and GS Paper II (CSAT), 200 marks each" },
      { label: "Time", value: "2 hours per paper" },
      { label: "Questions", value: "Paper I 100, Paper II 80 (as guides list)" },
      { label: "Negative marking", value: "One-third of the question's marks per wrong answer" },
      { label: "CSAT", value: "Qualifying, 33% needed" },
      { label: "Languages", value: "Hindi and English" },
      { label: "Given by", value: "Union Public Service Commission (UPSC)" },
    ],
    basedOn: "UPSC Examination Notice No. 05/2026-CSE (4 February 2026); the 2027 Preliminary is scheduled for 23 May 2027",
    source: { name: "Union Public Service Commission", url: "https://upsc.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  upscse: "a civil services coaching class",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"upscse"` (UPSC coaching institutes and test series).

## lib/tigerAssets.ts
Nothing (no tiger set; DMV tiger fallback).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
After the SSC CGL bullet (or with the other India exams):
```md
- **UPSC Prelims** (`/upsc-prelims`, landing `/upsc-prelims-practice-test`, `[data-theme="upscse"]` deep rust brown, region IN, hub group "India government job exams"): the UPSC Civil Services (Preliminary) Examination on Examination Notice No. 05/2026-CSE (4 February 2026; Prelims 24 May 2026, the 2027 one scheduled for 23 May 2027): two compulsory objective papers of 200 marks and 2 hours each in Hindi and English, GS Paper I deciding Mains qualification and Paper II (CSAT) qualifying at 33%, four options with one-third of a question's marks off per wrong answer; 100 and 80 questions per paper as guides list. Two full GS Paper I mocks (one section `gs`, one 100-item module in 120 minutes, subjects mixed), Test 2 held out, 8 drills (`upscseAncient`, `upscseModern`, `upscseGeography`, `upscsePolity`, `upscseEconomy`, `upscseEnvironment`, `upscseScience`; 14/14/16/16/14/14/12 per test, Tigertest's split, 2 drill-only each; plus `upscseCsat`, 20 drill-only items of comprehension on inline passages, reasoning and numeracy, never in a test), so the dashboard is 10 steps. 102 items use the UPSC statement and pair formats with `lockedOrder`. Bank `data/v2/upscse/questions.json` (234 original items, prefix `UPSCSE-`) built by `python3 -I tools/next100/upscse/build.py` (sources call `S` for shuffled items, `L` for locked statement items, `stmts()` for the numbered statements). Static syllabus only: no current affairs, no office-holders. Percent score; negative marking explained in `scoreNote` and on the landing, not applied. Sources in `tools/next100/upscse/sources.md`.
```
