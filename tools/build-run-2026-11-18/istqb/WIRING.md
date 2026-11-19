# ISTQB CTFL (`istqb`) wiring for the integrator

v2 exam on the `itil` template. Files written (unique to this exam):
`tools/build-run-2026-11-18/istqb/*` (helpers.py, eight domain sources as Python data, build.py,
sources.md, this file), `data/v2/istqb/questions.json` (plain array, 200 items, prefix `ISTQB-`),
`lib/v2/exams/istqb.ts` (export `ISTQB`), `lib/v2/banks/istqb.ts` (`plainBank`),
`app/istqb-ctfl/*` (layout, root redirect, dashboard, stats; no test or practice folders),
`app/istqb-ctfl-practice-test/page.tsx`.

## Exam checked (CTFL v4.0, syllabus v4.0.1, is current; build proceeds)
ISTQB Certified Tester Foundation Level v4.0. The certificate page's syllabus download is v4.0.1
(errata of v4.0, 15.09.2024). Exam Structure Tables v1.21 (9 November 2026): 40 questions, 40
points, pass 26 (65%), 60 minutes (75 with the non-native 25% extension); chapters 8/6/4/11/9/2;
K1 8, K2 24, K3 8. The ISTQB news page (2026-11-18) announces no new Foundation syllabus. No dated
change to add to `lib/examFreshness.json`.

Rebuild: `python3 -I tools/build-run-2026-11-18/istqb/build.py` (recomputes every K3 key in
`CHECKS`). Validate from a copy that does not write bankSizes:
`python3 -I tools/validate_v2_bank.py istqb '{"1": {"ctfl": {"1": 40}}, "2": {"ctfl": {"1": 40}}}'`
(200 questions, 0 stimuli, 0 problems). Do not add `istqb` to `tools/build_v2_bank.py` PLANS.

Dashboard: 8 drills + 2 tests = 10 steps. Two 40-item tests in 60 minutes (Test 2 held out), per
test istqbFundamentals 5, istqbTestProcess 3, istqbLifecycle 6, istqbStatic 4, istqbBlackBox 5,
istqbTechniques 6, istqbPlanning 4, istqbManaging 7; 15 drill-only per domain (120). Formats: 194
single (23 locked: sorted numbers, R1 to R4, Q1 to Q4), 6 choose-two (drill-only). Premium through
PREMIUM_V2_IDS: the registry locks the last quarter (Practice Test 2 and the last drills; the
landing FAQ says "the last drills and the final practice test").

Screenshots still needed: `public/landing/istqb-mobile.png`, `istqb-desktop.png` (and `-dark`).
Shoot with `istqb:istqb-ctfl:v2:fundamentals`.

## lib/v2/bankSizes.ts
```ts
  istqb: 200,
```

## lib/v2/registry.ts
```ts
import { ISTQB } from "./exams/istqb";
// EXAMS_V2: add ISTQB right after ITIL
// PREMIUM_V2_IDS: add "istqb" on the IT / business line, after "itil"
```

## lib/server/classQuestions.ts
```ts
import "@/lib/v2/banks/istqb";
```

## lib/server/mcpV2Practice.ts
```ts
import '@/lib/v2/banks/istqb';
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `ISTQB.domainLabels` (keys `istqbFundamentals`,
`istqbTestProcess`, `istqbLifecycle`, `istqbStatic`, `istqbBlackBox`, `istqbTechniques`,
`istqbPlanning`, `istqbManaging`).

## app/globals.css
Suggested hue 276 95% 38% (vivid violet). White text 8.4:1. Checked against every `[data-theme]` in
globals.css on 2026-11-18: no theme within 8 degrees is within 15 saturation and 8 lightness.
Alternative if another new test takes it: 316 100% 32% (deep magenta, 7.4:1, also free). Matches
`lib/v2/exams/istqb.ts` `theme` (change both if the hue moves). Run
`tools/gen_dark_brand_css.py` afterwards.
```css
  /* ISTQB CTFL v4.0 theme: vivid violet (v2 exam; matches lib/v2/exams/istqb.ts theme) */
  [data-theme="istqb"] {
    --brand: 276 95% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 276 80% 97%;
    --brand-hover: 276 95% 33%;
    --brand-dark: 276 95% 28%;
    --brand-darker: 276 90% 18%;
    --brand-muted: 276 50% 72%;
    --brand-border: 276 60% 82%;
    --brand-border-light: 276 60% 90%;
    --brand-gradient-to: 290 80% 97%;
  }
```

## lib/shareCardCopy.ts
```ts
  istqb: { title: "ISTQB Foundation Level (CTFL v4.0)", description: "Practise the 40-question CTFL exam: principles, test levels, reviews, test techniques, test management and tools." },
```

## lib/tigerAssets.ts
```ts
// BORROWED_SETS (business/IT line): istqb borrows the ITIL tiger
  istqb: "itil",
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line, next to itil
  istqb: "GLOBAL",
// NON_DRIVING_TESTS: add
  "istqb",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  istqb: "ISTQB Certified Tester Foundation Level, CTFL v4.0: 40 questions in 60 minutes with a 26-point pass line. The seven testing principles, test activities and roles, test levels and types, reviews, equivalence partitioning, boundary values, decision tables, state transitions, statement and branch coverage, estimation, risk, defect reports and test tools.",
// EXAM_ORG
  istqb: "ISTQB · Certified Tester Foundation Level syllabus v4.0.1",
// SEARCH_ALIASES
  istqb: "istqb ctfl ct fl istqb foundation istqb foundation level certified tester foundation level ctfl 4.0 ctfl v4 ctfl 4 istqb v4 software testing certification software tester certification qa tester certification test analyst istqb exam",
// RELATED_OVERRIDES (optional)
  istqb: ["psm", "itil", "capm"],
```
Hub group "IT certifications" (`TEST_GROUPS` line in testCatalog.ts): add `"istqb"` after
`"ccna"` (or after `"sfappbuilder"`).
`tests/test-search-aliases.test.cjs`: add cases for "istqb", "ctfl" and "istqb foundation level"
opening `istqb` (no other exam's aliases claim these words; check that "software testing" does not
pull a different exam ahead, and that "qa tester" still finds istqb first).

## lib/examFacts.ts
```ts
  istqb: {
    answer:
      "The ISTQB Certified Tester Foundation Level (CTFL v4.0) exam has 40 multiple-choice questions worth one point each, and you need 26 points (65 percent) to pass. You have 60 minutes, or 75 minutes if you take it in a language that is not your native one. Questions come from six syllabus chapters: Fundamentals of Testing 8, Testing Throughout the SDLC 6, Static Testing 4, Test Analysis and Design 11, Managing the Test Activities 9 and Test Tools 2. The current syllabus document is v4.0.1.",
    rows: [
      { label: "Questions", value: "40 multiple choice, one point each" },
      { label: "Time", value: "60 minutes (75 in a non-native language)" },
      { label: "Pass mark", value: "26 of 40 points (65 percent)" },
      { label: "Biggest chapter", value: "Test Analysis and Design, 11 of 40" },
      { label: "Syllabus", value: "CTFL v4.0, document v4.0.1 (2024)" },
      { label: "Given by", value: "ISTQB member boards and exam providers" },
    ],
    basedOn: "the ISTQB CTFL v4.0.1 syllabus and the ISTQB Exam Structure Tables v1.21 (November 2026)",
    source: { name: "ISTQB", url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  },
```

## Teacher-led (CTFL is taught in accredited training courses and university testing modules)
`components/TeachNudge.tsx` `TEACHER_LED`: add `"istqb"` next to `"itil"`.
`components/exam/ExamClassFaq.tsx` `TEACHES`:
```ts
  istqb: "a software testing or ISTQB Foundation course",
```

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` with a comment naming ISTQB CTFL.

## lib/examFreshness.json
Nothing dated (no new Foundation syllabus announced as of 2026-11-18).

## lib/examSources.json
Run `python3 -I tools/build_exam_sources.py` after the merge.

## CLAUDE.md
Add in the v2 exams section, after the ITIL 4 Foundation bullet:

- **ISTQB CTFL** (`istqb`, v2, ISTQB Certified Tester Foundation Level v4.0, syllabus document v4.0.1 (errata of v4.0, 15 September 2024), `/istqb-ctfl/*`, landing `/istqb-ctfl-practice-test`, `[data-theme="istqb"]` vivid violet (276 95% 38%), region GLOBAL, hub group "IT certifications", Premium, borrows the ITIL tiger, teacher-led (software testing courses)): one section `ctfl`, one 40-item module in 60 minutes like the real exam (40 one-point multiple-choice questions, 26 to pass, 75 minutes in a non-native language; delivery, languages and fees set by member boards and exam providers), weighted to the ISTQB Exam Structure Tables v1.21 (November 2026: chapters 8/6/4/11/9/2, K1 8, K2 24, K3 8) as eight domains (`istqbFundamentals` 5 (1.1 to 1.3, 1.5), `istqbTestProcess` 3 (1.4), `istqbLifecycle` 6, `istqbStatic` 4, `istqbBlackBox` 5 (4.1, 4.2), `istqbTechniques` 6 (4.3 to 4.5), `istqbPlanning` 4 (5.1), `istqbManaging` 7 (5.2 to 5.5 and chapter 6) per test), two tests with Test 2 held out, 8 drills (one per domain), no Basics, 10 dashboard steps. Bank `data/v2/istqb/questions.json` (200 original items, prefix `ISTQB-`, 120 drill-only; mostly single, 6 choose-two, sorted and locked number options for the K3 sums (partitions, boundaries, decision table columns, transitions, coverage, three-point and ratio estimates, risk level); decision and state tables as pipe tables, pseudocode in monospace through `code()`) built by `python3 -I tools/build-run-2026-11-18/istqb/build.py` from one source per domain (key first, shuffled by a stem seed; every K3 key recomputed in `CHECKS`). Written from the syllabus body text only; the ISTQB sample exams were never opened and the glossary site did not render. Checked against the itil, psm and capm banks (INVEST and Definition of Ready items reworded away from CAPM's). Sources in `tools/build-run-2026-11-18/istqb/sources.md`.
