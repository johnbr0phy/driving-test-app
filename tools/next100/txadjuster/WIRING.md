# Wiring for `txadjuster` (Texas All-Lines Adjuster license exam, Pearson VUE, US, v1)

Files already written by the builder: `data/texas-adjuster-questions.json` (200, PASS, key-longest
11%), `lib/banks/txadjuster.ts`, `app/texas-adjuster/*` (layout, redirect, dashboard, drill, stats,
copied from `app/nmls/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/texas-all-lines-adjuster-practice-test/page.tsx`, `tools/next100/txadjuster/*` (spec, sources,
`q_*.py`, `build.py`, this file). Everything below goes in shared files.

Format note: the real exam (Pearson VUE "Adjuster - All Lines", InsTX-ALAdj16 English /
InsTX-ALAdj36 Spanish) is 150 scoreable questions in 150 minutes, scaled 0 to 100 with 70 passing
(handbook #124400, October 2024; outline #124401 effective September 1, 2026). Here: four
50-question mock tests weighted 40/40/20 like the outline, 5 training sets + 4 tests = 9 dashboard
steps. Pass line `ceil(0.70 * 50) = 35`, the house convention for Texas's scaled 70 (as `pnc-tx`).
Pools are exactly 4x per-test counts, so no item repeats across tests. Sets are content sets,
so not interleaved: sets first, then tests.

## lib/exams.ts

Add `"txadjuster"` to the `ExamId` union. Icon `umbrella` already exists.

```ts
const txadjuster: ExamConfig = {
  id: "txadjuster",
  stateCode: "TXADJ",
  idBase: 16100,
  slug: "/texas-adjuster",
  landingPath: "/texas-all-lines-adjuster-practice-test",
  name: "Texas All-Lines Adjuster Practice Test",
  shortName: "TX Adjuster",
  examLabel: "Texas adjuster exam",
  fullName: "Texas All-Lines Adjuster license exam",
  questionIdPrefix: "TXADJ-",
  icon: "umbrella",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Pearson VUE Texas Insurance Content Outlines (#124401, effective September 1, 2026), All Lines
  // Adjuster: 150 scoreable questions in 150 minutes (handbook #124400), scaled score 70 to pass.
  // I General P&C product knowledge for adjusters 40%, II Insurance terms and related concepts
  // 40%, III Texas statutes and rules for P&C adjusting 20%, scaled to 50 as 20/20/10:
  // I = fire policy 4, homeowners 5, auto 4, commercial 4, marine/additional/E&O 3;
  // II = valuation 7, contracts 7, perils/negligence 6; III = licensing 4, claims 3, workers' comp 3.
  // All items original; Texas law as in force November 2026.
  blueprint: {
    txadjFire: 4,
    txadjHome: 5,
    txadjAuto: 4,
    txadjCommercial: 4,
    txadjMarine: 3,
    txadjValuation: 7,
    txadjContract: 7,
    txadjLiability: 6,
    txadjLaw: 4,
    txadjClaims: 3,
    txadjWorkComp: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 16101, name: "Fire Policy & Homeowners", categories: ["txadjFire", "txadjHome"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 2, id: 16102, name: "Auto, Commercial & Marine", categories: ["txadjAuto", "txadjCommercial", "txadjMarine"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 16103, name: "Valuation & Loss Settlement", categories: ["txadjValuation"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 4, id: 16104, name: "Contracts, Perils & Liability", categories: ["txadjContract", "txadjLiability"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 5, id: 16105, name: "Texas Law, Claims & Workers' Comp", categories: ["txadjLaw", "txadjClaims", "txadjWorkComp"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    txadjFire: "Standard Fire Policy & Loss Requirements",
    txadjHome: "Homeowners & Dwelling Coverage",
    txadjAuto: "Personal & Commercial Auto",
    txadjCommercial: "Commercial Property, Boiler, BOP & Crime",
    txadjMarine: "Marine, Additional Coverages & E&O",
    txadjValuation: "Valuation & Loss Settlement",
    txadjContract: "Contracts & Policy Provisions",
    txadjLiability: "Perils, Negligence & Liability",
    txadjLaw: "Texas Licensing & the Commissioner",
    txadjClaims: "Texas Claims Practices",
    txadjWorkComp: "Texas Workers' Compensation",
  },
  copy: {
    guestPrompt: "to save your Texas adjuster progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets covering all three parts of the Pearson VUE all-lines adjuster outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions weighted like the real all-lines adjuster exam, 70% to pass",
    heroSubs: [
      "Five sets, four mock tests. Product knowledge and terms are 80% of the exam.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Schedule your Texas adjuster exam.",
    ],
    sourceLine: "Based on the Pearson VUE Texas all-lines adjuster content outline effective September 2026. Original questions; 50 per test, weighted like the real 150-question exam. Not affiliated with TDI or Pearson VUE.",
    analyticsKey: "txadjuster",
  },
};
```

Append `txadjuster` to the `EXAMS` array right after `pnc`.

Check: 16101-16104 (tests) and 16101-16105 (sets) must be free (batch B assigns 16100).

## lib/banks/all.ts

```ts
import "./txadjuster";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/txadjuster.ts`.

## types/index.ts

- `QuestionType`: add `| "TXADJ"`.
- `QuestionCategory`, under a `// Texas all-lines adjuster` comment:

```ts
  | "txadjFire"
  | "txadjHome"
  | "txadjAuto"
  | "txadjCommercial"
  | "txadjMarine"
  | "txadjValuation"
  | "txadjContract"
  | "txadjLiability"
  | "txadjLaw"
  | "txadjClaims"
  | "txadjWorkComp"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    txadjFire: "Standard Fire Policy & Loss Requirements",
    txadjHome: "Homeowners & Dwelling Coverage",
    txadjAuto: "Personal & Commercial Auto",
    txadjCommercial: "Commercial Property, Boiler, BOP & Crime",
    txadjMarine: "Marine, Additional Coverages & E&O",
    txadjValuation: "Valuation & Loss Settlement",
    txadjContract: "Contracts & Policy Provisions",
    txadjLiability: "Perils, Negligence & Liability",
    txadjLaw: "Texas Licensing & the Commissioner",
    txadjClaims: "Texas Claims Practices",
    txadjWorkComp: "Texas Workers' Compensation",
```

## app/globals.css

Hue from the batch B table (343 35% 32%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Texas all-lines adjuster theme */
  [data-theme="txadjuster"] {
    --brand: 343 35% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 343 35% 96%;
    --brand-hover: 343 35% 27%;
    --brand-dark: 343 35% 24%;
    --brand-darker: 343 30% 16%;
    --brand-muted: 343 20% 70%;
    --brand-border: 343 20% 80%;
    --brand-border-light: 343 18% 89%;
    --brand-gradient-to: 205 60% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `txadjuster: "Texas all-lines adjuster practice on the Pearson VUE outline effective September 2026: the Standard Fire Policy, homeowners, auto, commercial and marine lines, loss settlement math, contracts and liability, and Texas prompt payment, claims practices and workers' comp, every answer explained.",`
- `EXAM_ORG`: `txadjuster: "TDI · Pearson VUE all-lines adjuster exam",`
- Hub group `"Real estate, insurance, securities & notary licenses"`: add `"txadjuster"` right after `"pnc"`.
- `SEARCH_ALIASES`:
  `txadjuster: "texas adjuster all lines adjuster license exam test tx claims adjuster insurance adjuster pearson vue tdi designated home state dhs independent adjuster catastrophe cat adjuster property casualty workers comp adjuster",`
- `RELATED_OVERRIDES` (optional): `txadjuster: ["pnc", "insurance", "realestate"],`

## lib/region.ts

US exam: no `TEST_REGIONS` entry. Add `"txadjuster"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  txadjuster: {
    answer:
      "The Texas All-Lines Adjuster exam is the licensing exam the Texas Department of Insurance requires for the all-lines adjuster license, which covers property, casualty and workers' compensation claims. Pearson VUE gives it in English or Spanish: 150 scored multiple-choice questions in 150 minutes, reported as a scaled score from 0 to 100 with 70 passing. Under the outline effective September 1, 2026, it covers general property and casualty product knowledge (40%), insurance terms and concepts (40%) and Texas statutes and rules for adjusting (20%). A TDI-approved adjuster course or a CPCU or AIC designation can replace the exam.",
    rows: [
      { label: "Questions", value: "150 scored" },
      { label: "Time", value: "150 minutes" },
      { label: "Passing score", value: "70 (scaled, 0 to 100)" },
      { label: "Largest areas", value: "P&C product knowledge and insurance terms, 40% each" },
      { label: "Languages", value: "English or Spanish" },
      { label: "Run by", value: "Texas Department of Insurance, delivered by Pearson VUE" },
    ],
    basedOn: "Pearson VUE Texas candidate handbook and content outline effective September 1, 2026, checked November 2026",
    source: { name: "Pearson VUE: Texas Insurance", url: "https://www.pearsonvue.com/us/en/tx/insurance.html" },
  },
```
(Fee deliberately left out; the handbook lists one.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing: self-study or a pre-licensing course (the template sets none).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing required: sitemaps map over `EXAMS`, no redirects, `umbrella` icon exists, tiger falls back
to the DMV one. Optionally borrow the `pnc` set through `BORROWED_SETS` (`txadjuster: "pnc"`).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 52).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing txadjuster:texas-adjuster:16101`

## CLAUDE.md (under Additional Exams, after the NMLS SAFE bullet)

```md
- **Texas All-Lines Adjuster** (TDI adjuster license exam given by Pearson VUE, `/texas-adjuster/*`, landing `/texas-all-lines-adjuster-practice-test`): `data/texas-adjuster-questions.json` (200 questions on the Pearson VUE All Lines Adjuster outline effective September 1, 2026, 40/40/20: Standard Fire Policy 16, homeowners and dwelling 20, personal and commercial auto 16, commercial property, boiler, BOP and crime 16, marine, additional coverages and E&O 12; valuation and loss settlement 28, contracts and policy provisions 28, perils, negligence and liability 24; Texas licensing and the Commissioner 16, Texas claims practices 12, Texas workers' compensation 12), a shorter mock of the real 150 questions in 150 minutes (scaled 0-100, 70 to pass, English or Spanish): test IDs 16101-16104 (50 questions each), sets 16101-16105, state `TXADJ`, prefix `TXADJ-`, 70% pass. 4/5/4/4/3/7/7/6/4/3/3 per test. Texas law as of Nov 2026 (Insurance Code 4101, 4003, 4004, 83, 542, 4102.163; 28 TAC 21.203; Labor Code 401-409; CPRC 33); no fees or dollar thresholds. Kept clear of the facts in `pnc` and `pnc-tx`. Built by `tools/next100/txadjuster/build.py`; sources in `tools/next100/txadjuster/sources.md`. Hub group "Real estate, insurance, securities & notary licenses", `[data-theme="txadjuster"]` muted wine (343 35% 32%).
```
