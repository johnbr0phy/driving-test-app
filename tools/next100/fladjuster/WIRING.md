# Wiring for `fladjuster` (Florida 6-20 All-Lines Adjuster license exam, Pearson VUE, US, v1)

Files already written by the builder: `data/florida-adjuster-questions.json` (200, PASS,
key-longest 16%), `lib/banks/fladjuster.ts`, `app/florida-adjuster/*` (layout, redirect,
dashboard, drill, stats, copied from `app/texas-adjuster/`; no test or practice folders, the shared
`app/[slug]` routes serve them), `app/florida-6-20-adjuster-practice-test/page.tsx`,
`tools/next100/fladjuster/*` (spec, sources, `q_*.py`, `build.py`, this file). Everything below goes
in shared files.

Format note: the real exam (Pearson VUE InsFL-ALJ16, "FLA All Lines Adjuster (0620, 0720, 7020)")
is 100 scored questions plus 10 pretest in 2 hours, 70% correct to pass, English only (content
outline effective January 1, 2026; candidate handbook 2024). Here: four 50-question mock tests
weighted 14/28/28/15/2/2/11 like the outline, 7 training sets + 4 tests = 11 dashboard steps. Pass
line `ceil(0.70 * 50) = 35`. Pools are exactly 4x per-test counts, so no item repeats across tests.
Sets are content sets, so not interleaved: sets first, then tests.

## lib/exams.ts

Add `"fladjuster"` to the `ExamId` union. Icon `umbrella` already exists.

```ts
const fladjuster: ExamConfig = {
  id: "fladjuster",
  stateCode: "FLADJ",
  idBase: 17600,
  slug: "/florida-adjuster",
  landingPath: "/florida-6-20-adjuster-practice-test",
  name: "Florida 6-20 Adjuster Practice Test",
  shortName: "FL 6-20 Adjuster",
  examLabel: "Florida 6-20 exam",
  fullName: "Florida All-Lines Adjuster license exam (6-20)",
  questionIdPrefix: "FLADJ-",
  icon: "umbrella",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Florida Insurance Examination Content Outlines effective January 1, 2026 (Pearson VUE 121003),
  // Florida Adjuster's All Lines Insurance: 100 scored questions plus 10 pretest in 2 hours, 70% to
  // pass (handbook 121000). I concepts, contracts and adjusting 14%, II casualty/liability 28%,
  // III fire and allied lines, marine and dwelling 28%, IV motor vehicle physical damage and
  // mechanical breakdown 15%, V health 2%, VI residual markets 2%, VII Florida statutes 11%,
  // scaled to 50 as 7/14/14/7/1/1/6 (V and VI share one category of 2):
  // I = concepts 4, adjusting 3; II = auto 4, PIP/UM 3, liability/boiler/crime 4, workers' comp 3;
  // III = homeowners/dwelling 6, commercial 3, flood 2, marine 3; IV = 7; V+VI = 2;
  // VII = licensing 3, conduct/ethics 3. All items original; Florida law as in force November 2026.
  blueprint: {
    fladjConcepts: 4,
    fladjAdjusting: 3,
    fladjAuto: 4,
    fladjPip: 3,
    fladjLiability: 4,
    fladjWorkComp: 3,
    fladjHome: 6,
    fladjCommercial: 3,
    fladjFlood: 2,
    fladjMarine: 3,
    fladjPhysDamage: 7,
    fladjResidual: 2,
    fladjLicensing: 3,
    fladjConduct: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 17601, name: "Insurance Concepts & Adjusting", categories: ["fladjConcepts", "fladjAdjusting"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 2, id: 17602, name: "Auto Liability, PIP & UM", categories: ["fladjAuto", "fladjPip"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 3, id: 17603, name: "Auto Physical Damage & Mechanical Breakdown", categories: ["fladjPhysDamage"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 4, id: 17604, name: "Liability, Workers' Comp & Residual Markets", categories: ["fladjLiability", "fladjWorkComp", "fladjResidual"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 17605, name: "Homeowners, Dwelling & Flood", categories: ["fladjHome", "fladjFlood"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 6, id: 17606, name: "Commercial Property & Marine", categories: ["fladjCommercial", "fladjMarine"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 7, id: 17607, name: "Florida Licensing, Conduct & Ethics", categories: ["fladjLicensing", "fladjConduct"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    fladjConcepts: "Insurance Concepts & Contracts",
    fladjAdjusting: "Adjusting Practices & Settlements",
    fladjAuto: "Auto Liability (Personal & Business)",
    fladjPip: "Florida PIP & Uninsured Motorists",
    fladjLiability: "General Liability, Umbrella, Boiler & Crime",
    fladjWorkComp: "Florida Workers' Compensation",
    fladjHome: "Homeowners, Dwelling & Hurricane Rules",
    fladjCommercial: "Commercial Property & BOP",
    fladjFlood: "Flood Insurance",
    fladjMarine: "Inland Marine, Ocean Marine & Aviation",
    fladjPhysDamage: "Auto Physical Damage & Mechanical Breakdown",
    fladjResidual: "Health Insurance & Residual Markets",
    fladjLicensing: "Florida Adjuster Licensing",
    fladjConduct: "Florida Adjuster Conduct & Ethics",
  },
  copy: {
    guestPrompt: "to save your Florida 6-20 progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Seven sets covering all seven parts of the Florida all-lines adjuster outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions weighted like the real Florida 6-20 exam, 70% to pass",
    heroSubs: [
      "Seven sets, four mock tests. Casualty and property lines are over half the exam.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Schedule your Florida 6-20 exam.",
    ],
    sourceLine: "Based on the Florida all-lines adjuster content outline effective January 2026. Original questions; 50 per test, weighted like the real 100-question exam. Not affiliated with the Florida Department of Financial Services or Pearson VUE.",
    analyticsKey: "fladjuster",
  },
};
```

Append `fladjuster` to the `EXAMS` array right after `txadjuster`.

Check: 17601-17604 (tests) and 17601-17607 (sets) must be free (batch C assigns 17600).

## lib/banks/all.ts

```ts
import "./fladjuster";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/fladjuster.ts`.

## types/index.ts

- `QuestionType`: add `| "FLADJ"`.
- `QuestionCategory`, under a `// Florida 6-20 all-lines adjuster` comment:

```ts
  | "fladjConcepts"
  | "fladjAdjusting"
  | "fladjAuto"
  | "fladjPip"
  | "fladjLiability"
  | "fladjWorkComp"
  | "fladjHome"
  | "fladjCommercial"
  | "fladjFlood"
  | "fladjMarine"
  | "fladjPhysDamage"
  | "fladjResidual"
  | "fladjLicensing"
  | "fladjConduct"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    fladjConcepts: "Insurance Concepts & Contracts",
    fladjAdjusting: "Adjusting Practices & Settlements",
    fladjAuto: "Auto Liability (Personal & Business)",
    fladjPip: "Florida PIP & Uninsured Motorists",
    fladjLiability: "General Liability, Umbrella, Boiler & Crime",
    fladjWorkComp: "Florida Workers' Compensation",
    fladjHome: "Homeowners, Dwelling & Hurricane Rules",
    fladjCommercial: "Commercial Property & BOP",
    fladjFlood: "Flood Insurance",
    fladjMarine: "Inland Marine, Ocean Marine & Aviation",
    fladjPhysDamage: "Auto Physical Damage & Mechanical Breakdown",
    fladjResidual: "Health Insurance & Residual Markets",
    fladjLicensing: "Florida Adjuster Licensing",
    fladjConduct: "Florida Adjuster Conduct & Ethics",
```

## app/globals.css

Hue from the batch C table (320 30% 30%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Florida 6-20 all-lines adjuster theme */
  [data-theme="fladjuster"] {
    --brand: 320 30% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 320 30% 96%;
    --brand-hover: 320 30% 25%;
    --brand-dark: 320 30% 22%;
    --brand-darker: 320 26% 15%;
    --brand-muted: 320 18% 70%;
    --brand-border: 320 18% 80%;
    --brand-border-light: 320 16% 89%;
    --brand-gradient-to: 195 60% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `fladjuster: "Florida 6-20 all-lines adjuster practice on the content outline effective January 2026: Florida PIP and auto, liability and workers' comp, homeowners, hurricane deductibles and flood, commercial and marine lines, Citizens, and the Florida claim-handling, mediation and ethics rules, every answer explained.",`
- `EXAM_ORG`: `fladjuster: "Florida DFS · Pearson VUE all-lines adjuster exam",`
- Hub group `"Real estate, insurance, securities & notary licenses"`: add `"fladjuster"` right after `"txadjuster"`.
- `SEARCH_ALIASES`:
  `fladjuster: "florida adjuster 6-20 620 6 20 all lines adjuster license exam test fl claims adjuster insurance adjuster pearson vue dfs 7-20 70-20 designated home state independent adjuster company adjuster catastrophe cat adjuster hurricane adjuster",`
- `RELATED_OVERRIDES` (optional): `fladjuster: ["txadjuster", "pnc", "insurance"],`

## lib/region.ts

US exam: no `TEST_REGIONS` entry. Add `"fladjuster"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  fladjuster: {
    answer:
      "The Florida 6-20 exam is the Florida All-Lines Adjuster exam, the licensing exam the Florida Department of Financial Services requires for the all-lines adjuster license, which covers every line of insurance except life and annuities. Pearson VUE gives it in English: 100 scored questions plus 10 unscored pretest questions in 2 hours, with 70 percent correct to pass. Under the content outline effective January 1, 2026, it covers casualty and liability insurance (28%), fire and allied lines, marine and dwelling (28%), motor vehicle physical damage and mechanical breakdown (15%), insurance concepts and adjusting practices (14%), Florida statutes and rules (11%), health (2%) and residual markets (2%). The same exam serves the nonresident 7-20 and 70-20 licenses.",
    rows: [
      { label: "Questions", value: "100 scored plus 10 pretest" },
      { label: "Time", value: "2 hours" },
      { label: "Passing score", value: "70% correct" },
      { label: "Largest areas", value: "Casualty/liability and fire/allied lines, 28% each" },
      { label: "Languages", value: "English" },
      { label: "Run by", value: "Florida Department of Financial Services, delivered by Pearson VUE" },
    ],
    basedOn: "Florida content outlines effective January 1, 2026 and the Pearson VUE Florida candidate handbook, checked November 2026",
    source: { name: "Pearson VUE: Florida Insurance", url: "https://www.pearsonvue.com/us/en/fl/insurance.html" },
  },
```
(Fee deliberately left out; the handbook lists one.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing: self-study or a pre-licensing course (the template sets none).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing required: sitemaps map over `EXAMS`, no redirects, `umbrella` icon exists, tiger falls back
to the DMV one. Optionally borrow the `pnc` set through `BORROWED_SETS` (`fladjuster: "pnc"`), as
`txadjuster` may.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 36).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing fladjuster:florida-adjuster:17601`

## CLAUDE.md (under Additional Exams, after the Texas All-Lines Adjuster bullet)

```md
- **Florida 6-20 Adjuster** (Florida DFS All-Lines Adjuster license exam given by Pearson VUE, also used for the nonresident 7-20 and 70-20 licenses, `/florida-adjuster/*`, landing `/florida-6-20-adjuster-practice-test`): `data/florida-adjuster-questions.json` (200 questions on the Florida content outline effective January 1, 2026, 14/28/28/15/2/2/11: concepts and contracts 16, adjusting practices 12; auto liability 16, Florida PIP and UM 12, general liability, umbrella, boiler and crime 16, Florida workers' comp 12; homeowners, dwelling and hurricane rules 24, commercial property and BOP 12, flood 8, marine and aviation 12; auto physical damage and mechanical breakdown 28; health and residual markets 8; Florida licensing 12, conduct and ethics 12), a shorter mock of the real 100 scored questions (plus 10 pretest) in 2 hours, 70% correct to pass, English only: test IDs 17601-17604 (50 questions each), sets 17601-17607, state `FLADJ`, prefix `FLADJ-`, 70% pass. 4/3/4/3/4/3/6/3/2/3/7/2/3/3 per test. Florida law as of Nov 2026 (ch. 626 Part VI, 626.9541, 627.70131, 627.70132, 627.70152, 627.7015, 627.701, 627.7011, 627.736, ch. 440, 319.30, Rule 69B-220.201); no fees. Kept clear of the facts in `txadjuster`, `pnc` and `pnc-fl`. Built by `tools/next100/fladjuster/build.py`; sources in `tools/next100/fladjuster/sources.md`. Hub group "Real estate, insurance, securities & notary licenses", `[data-theme="fladjuster"]` muted plum (320 30% 30%).
```
