# Agniveer Army GD CEE (`agniveer`) wiring for the integrator

v2 exam, built on the `rrbgroupd` template. Files written (unique to this exam):
`tools/next100/agniveer/*` (9 domain sources as Python data, `build.py`, `sources.md`, this file),
`data/v2/agniveer/questions.json` (plain array, 231 items, prefix `AGNIVEER-`), `lib/v2/exams/agniveer.ts` (export
`AGNIVEER`), `lib/v2/banks/agniveer.ts` (`plainBank`), `app/agniveer-army/*` (layout, root redirect, dashboard,
practice/[n], test/[id], test/[id]/results, stats; copied from `app/rrb-group-d/`), `app/agniveer-army-cee-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/agniveer/build.py`, then
`python3 -I tools/validate_v2_bank.py agniveer '{"1": {"cee": {"1": 50}}, "2": {"cee": {"1": 50}}}'`
(231 questions, 0 stimuli, 0 problems; key strictly longest 31/231 = 13%; sorted all-number items 81, key in an end
slot 44 = 54%). I ran the validator from a /tmp copy with the bankSizes write removed. Do not add `agniveer` to
`tools/build_v2_bank.py` PLANS.

Dashboard: 9 drills + 2 tests = 11 steps. No Basics, no premium. Per test 5 history/culture/defence, 5 Constitution/
economy/sports, 5 geography, 5 physics, 5 chemistry, 5 biology, 9 arithmetic, 6 numbers/algebra/geometry, 5 reasoning;
drill-only 15 per domain (arithmetic 12, maths 14).

Screenshots still needed: `public/landing/agniveer-mobile.png`, `agniveer-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  agniveer: 231,
```

## lib/v2/registry.ts
```ts
import { AGNIVEER } from "./exams/agniveer";
// EXAMS_V2: add AGNIVEER after NDA (or after the last India exam)
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/agniveer";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `AGNIVEER.domainLabels` (keys `agniveerHistory`, `agniveerPolity`,
`agniveerGeography`, `agniveerPhysics`, `agniveerChemistry`, `agniveerBiology`, `agniveerArith`, `agniveerMaths`,
`agniveerReasoning`).

## app/globals.css
Hue changed from the brief's 95 40% 30%: hue 95 already holds teas (95 50% 33.5%), asvab (95 30% 34%, a clash: 10
points of saturation and 4 of lightness) and aufss (95 75% 29%). Army olive at **86 35% 30%** is 9 degrees from all of
those, 15 points of saturation below cask (84 50% 28%), 30 below gcsemaths (82 65% 28%) and 55 below zak53 (81 90%).
Run `tools/gen_dark_brand_css.py` afterwards. Matches `lib/v2/exams/agniveer.ts` `theme`.
```css
  /* Agniveer Army GD CEE theme: army olive (v2 exam; matches lib/v2/exams/agniveer.ts theme) */
  [data-theme="agniveer"] {
    --brand: 86 35% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 86 35% 96%;
    --brand-hover: 86 35% 25%;
    --brand-dark: 86 35% 22%;
    --brand-darker: 86 30% 12%;
    --brand-muted: 86 20% 70%;
    --brand-border: 86 25% 80%;
    --brand-border-light: 86 25% 90%;
    --brand-gradient-to: 70 35% 96%;
  }
```

## lib/shareCards.ts
```ts
  "agniveer": {
    "color": "hsl(86, 35%, 30%)",
    "tint": "hsl(86, 35%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  agniveer: { title: "Agniveer Army GD CEE", description: "Full 50-question Agniveer General Duty mock tests on General Knowledge, Science, Maths and Reasoning, with every answer explained." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  agniveer: "IN",
// NON_DRIVING_TESTS: add
  "agniveer",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  agniveer: "Mock tests for the Indian Army Agniveer (General Duty) Common Entrance Exam: 50 questions in 60 minutes on General Knowledge, General Science, Mathematics and Logical Reasoning, with negative marking explained.",
// EXAM_ORG
  agniveer: "Indian Army · Agniveer (General Duty) CEE",
// SEARCH_ALIASES
  agniveer: "agniveer mock test agniveer army gd practice test agnipath indian army gd exam agniveer cee online common entrance exam army bharti soldier general duty sena bharti fauji exam free mock test india defence exam",
// RELATED_OVERRIDES
  agniveer: ["agniveervayu", "nda", "sscgd"],
```
Hub group "India government job exams" (or a defence group if the integrator makes one with `nda` and
`agniveervayu`): add `"agniveer"` next to `"nda"` / `"agniveervayu"`.

## lib/examFacts.ts
```ts
  agniveer: {
    answer:
      "The Agniveer (General Duty) Common Entrance Exam is the online written test that is the first step of Indian Army recruitment under the Agnipath scheme. Guides describe the GD paper as 50 multiple-choice questions for 100 marks in 60 minutes: 15 on General Knowledge, 15 on General Science, 15 on Mathematics and 5 on Logical Reasoning, 2 marks each with half a mark deducted for a wrong answer, and a pass mark of 35. The Army holds the CEE in 13 languages; shortlisted candidates then go to a recruitment rally for physical tests and a medical examination.",
    rows: [
      { label: "Questions", value: "50 multiple choice, 2 marks each (guides)" },
      { label: "Time", value: "60 minutes (guides)" },
      { label: "Sections", value: "GK 15, General Science 15, Maths 15, Reasoning 5 (guides)" },
      { label: "Negative marking", value: "0.5 mark per wrong answer (guides)" },
      { label: "Pass mark", value: "35 out of 100 for GD (guides)" },
      { label: "Languages", value: "13 languages" },
      { label: "Next stages", value: "Recruitment rally (physical tests), then medical" },
      { label: "Given by", value: "Indian Army" },
    ],
    basedOn: "the Army's 2025-26 recruiting press release and the 2026 cycle notice (registration 13 February to 1 April 2026, extended to 10 April per news reports, CEE from June 2026), with the GD paper pattern as reported by guides",
    source: { name: "Join Indian Army", url: "https://joinindianarmy.nic.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  agniveer: "a defence exam coaching class",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"agniveer"` (defence academies run Agniveer batches).

## lib/tigerAssets.ts
Suggest `BORROWED_SETS`: `agniveer: "asvab"` (the military-entrance tiger), or the NDA/Vayu choice if those borrow
one, so the three defence exams match. Without it the DMV tiger falls back.

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
After the NDA bullet (or the last India v2 bullet):
```md
- **Agniveer GD** (`/agniveer-army`, landing `/agniveer-army-cee-practice-test`, `[data-theme="agniveer"]` army olive, region IN, hub group "India government job exams"): the Indian Army's Agniveer (General Duty) Online Common Entrance Exam, the first phase of Agnipath recruitment (2026 cycle: registration 13 February to 1 April 2026, extended to 10 April per news reports, CEE from June 2026, in 13 languages per the Army; joinindianarmy.nic.in could not be read). The GD paper as guides report it: 50 questions for 100 marks in 60 minutes, General Knowledge 15, General Science 15, Mathematics 15, Logical Reasoning 5, 2 marks each, 0.5 off per wrong answer (explained in `scoreNote` and on the landing, not scored), pass mark 35; then the rally and medical, not modelled. Two full 50-question tests in 60 minutes (one module, GK, Science, Maths, Reasoning), Test 2 held out, 9 drills (`agniveerHistory` (history, culture and the Army's battles, awards and days), `agniveerPolity`, `agniveerGeography`, `agniveerPhysics`, `agniveerChemistry`, `agniveerBiology`, `agniveerArith`, `agniveerMaths`, `agniveerReasoning`; 5/5/5/5/5/5/9/6/5 per test), so the dashboard is 11 steps. Bank `data/v2/agniveer/questions.json` (231 original four-option items, prefix `AGNIVEER-`) built by `python3 -I tools/next100/agniveer/build.py` (all-number options sorted and locked). GK static only, science to class 10, reasoning text only; checked against every India bank for repeated facts and numbers. Sources in `tools/next100/agniveer/sources.md`.
```
