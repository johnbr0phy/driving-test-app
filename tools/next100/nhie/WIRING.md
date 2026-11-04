# Wiring for `nhie` (National Home Inspector Examination, US, v1)

Files already written by the builder: `data/nhie-questions.json` (200, PASS, key-longest 18%),
`lib/banks/nhie.ts`, `app/home-inspector/*` (layout, redirect, dashboard, drill, stats, copied from
`app/nmls/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/home-inspector-exam-practice-test/page.tsx`, `tools/next100/nhie/*` (spec, sources, `q_*.py`,
`build.py`, this file). Everything below goes in shared files.

Format note: the real NHIE (EBPHI FAQ and content outline PDF, checked 2026-11-03) is 200
multiple-choice questions, 25 unscored pretest, in four hours, scaled 200 to 800 with 500 to pass
(no fixed percent). Here: four 50-question mock tests weighted to EBPHI's 70/20/10 domains, 5
training sets + 4 tests = 9 dashboard steps. `passPct: 70` is Tigertest's readiness target, so the
pass line is `ceil(0.70 * 50) = 35`. Pools are exactly 4x per-test counts, so no item repeats
across tests. Sets are content sets (not test sets): sets first, then tests.

## lib/exams.ts

Add `"nhie"` to the `ExamId` union. Icon `house` already exists (real estate uses it); `hardhat` or
`building` would also work if the integrator prefers a distinct icon.

```ts
const nhie: ExamConfig = {
  id: "nhie",
  stateCode: "NHIE",
  idBase: 16000,
  slug: "/home-inspector",
  landingPath: "/home-inspector-exam-practice-test",
  name: "Home Inspector Practice Test",
  shortName: "Home Inspector",
  examLabel: "NHIE",
  fullName: "National Home Inspector Examination (NHIE)",
  questionIdPrefix: "NHIE-",
  icon: "house",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // EBPHI "Overview: Policies, Procedures, Content" content outline (PDF dated 2023, posted 2024,
  // checked 2026-11-03): 200 items (175 scored), 4 hours, scaled 200-800, 500 to pass. Domain 1
  // Property and Building Inspection/Site Review 70% (13 tasks), Domain 2 Analysis of Findings and
  // Reporting 20%, Domain 3 Professional Responsibilities 10%, scaled to 50: site/exterior/roof 8
  // (5+5+6%), structure and interior 5 (6+4%), electrical 4 (7%), heating and cooling 4 (4+5%),
  // insulation, moisture and exhaust 5 (5+5%), plumbing and fuel 3 (6%), fireplaces and life
  // safety 6 (6+6%); reporting tasks 1-2 4 (4+4%), tasks 3-4 6 (6+6%); professional 5. 70% is
  // Tigertest's readiness line (the real cut is a scaled 500). All items original.
  blueprint: {
    nhieExterior: 8,
    nhieStructure: 5,
    nhieElectrical: 4,
    nhieHvac: 4,
    nhieVentilation: 5,
    nhiePlumbing: 3,
    nhieFireplace: 6,
    nhieReporting: 4,
    nhieDefects: 6,
    nhieProfessional: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 16001, name: "Site, Exterior & Roofing", categories: ["nhieExterior"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 16002, name: "Structure, Interiors, Fireplaces & Life Safety", categories: ["nhieStructure", "nhieFireplace"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 16003, name: "Electrical & Plumbing", categories: ["nhieElectrical", "nhiePlumbing"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 4, id: 16004, name: "Heating, Cooling & Ventilation", categories: ["nhieHvac", "nhieVentilation"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 16005, name: "Reporting & Professional Practice", categories: ["nhieReporting", "nhieDefects", "nhieProfessional"], size: 60, weightLabel: "15 of 50 test questions" },
  ],
  categoryLabels: {
    nhieExterior: "Site, Exterior & Roofing",
    nhieStructure: "Structure & Interiors",
    nhieElectrical: "Electrical Systems",
    nhieHvac: "Heating & Cooling",
    nhieVentilation: "Insulation, Moisture & Exhaust",
    nhiePlumbing: "Plumbing & Fuel Systems",
    nhieFireplace: "Fireplaces, Chimneys & Life Safety",
    nhieReporting: "Inspection Methods & Limitations",
    nhieDefects: "Defects, Service Life & Referrals",
    nhieProfessional: "Agreements, Ethics & Liability",
  },
  copy: {
    guestPrompt: "to save your home inspector exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets covering all three domains of the EBPHI content outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions weighted like the real NHIE, 70% target",
    heroSubs: [
      "Five sets, four mock tests. Inspecting the house is 70% of the exam.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Schedule your home inspector exam.",
    ],
    sourceLine: "Based on the EBPHI content outline for the National Home Inspector Examination. Original questions; 50 per test, weighted like the real 200-question exam. Not affiliated with EBPHI.",
    analyticsKey: "nhie",
  },
};
```

Append `nhie` to the `EXAMS` array right after `jelec` (or after the last batch B exam).

Check: 16001-16004 (tests) and 16001-16005 (sets) must be free (batch B assigns 16000).

## lib/banks/all.ts

```ts
import "./nhie";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/nhie.ts`.

## types/index.ts

- `QuestionType`: add `| "NHIE"`.
- `QuestionCategory`, under a `// National Home Inspector Examination` comment:

```ts
  | "nhieExterior"
  | "nhieStructure"
  | "nhieElectrical"
  | "nhieHvac"
  | "nhieVentilation"
  | "nhiePlumbing"
  | "nhieFireplace"
  | "nhieReporting"
  | "nhieDefects"
  | "nhieProfessional"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nhieExterior: "Site, Exterior & Roofing",
    nhieStructure: "Structure & Interiors",
    nhieElectrical: "Electrical Systems",
    nhieHvac: "Heating & Cooling",
    nhieVentilation: "Insulation, Moisture & Exhaust",
    nhiePlumbing: "Plumbing & Fuel Systems",
    nhieFireplace: "Fireplaces, Chimneys & Life Safety",
    nhieReporting: "Inspection Methods & Limitations",
    nhieDefects: "Defects, Service Life & Referrals",
    nhieProfessional: "Agreements, Ethics & Liability",
```

## app/globals.css

Hue from the batch B table (30 35% 28%, already checked: white on it is well over 4.5:1). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* National Home Inspector Examination theme */
  [data-theme="nhie"] {
    --brand: 30 35% 28%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 30 35% 96%;
    --brand-hover: 30 35% 24%;
    --brand-dark: 30 35% 20%;
    --brand-darker: 30 30% 14%;
    --brand-muted: 30 20% 70%;
    --brand-border: 30 20% 80%;
    --brand-border-light: 30 18% 89%;
    --brand-gradient-to: 205 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nhie: "National Home Inspector Examination practice on the EBPHI content outline: site and roofing, structure, electrical, heating and cooling, plumbing, fireplaces and life safety, reporting, and agreements and ethics, every answer explained.",`
- `EXAM_ORG`: `nhie: "EBPHI · National Home Inspector Examination",`
- Hub group `"Aviation, radio & trade licenses"`: add `"nhie"` after `"jelec"`.
- `SEARCH_ALIASES`:
  `nhie: "nhie national home inspector exam examination home inspection inspector license test ebphi home inspector certification house inspection building inspection psi home inspector",`
- `RELATED_OVERRIDES` (optional): `nhie: ["jelec", "realestate", "osha"],`

## lib/region.ts

US exam: no `TEST_REGIONS` entry. Add `"nhie"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  nhie: {
    answer:
      "The National Home Inspector Examination (NHIE) is the home inspector competency exam written by the Examination Board of Professional Home Inspectors (EBPHI) and used for licensing in 35 states and several Canadian provinces. It has 200 multiple-choice questions, 25 of them unscored pretest items, in four hours. Scores are scaled from 200 to 800 and 500 passes. It covers property and building inspection (70%), analysis of findings and reporting (20%) and professional responsibilities (10%), and is delivered by PSI in most states and Pearson VUE in a few.",
    rows: [
      { label: "Questions", value: "200 (175 scored, 25 pretest)" },
      { label: "Time", value: "4 hours" },
      { label: "Passing score", value: "500 on a 200 to 800 scale" },
      { label: "Largest domain", value: "Property and building inspection, 70%" },
      { label: "Where", value: "PSI test centers; Pearson VUE in FL, NV and TX" },
      { label: "Run by", value: "Examination Board of Professional Home Inspectors (EBPHI)" },
    ],
    basedOn: "EBPHI FAQ and NHIE content outline, checked November 2026",
    source: { name: "EBPHI: Frequently Asked Questions", url: "https://nationalhomeinspectorexam.org/frequently-asked-questions-2/" },
  },
```
(Fee deliberately left out; EBPHI lists one on the same page.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing: self-study after a pre-licensing course (the template sets none). Pre-licensing schools
may set it as a class; add a TEACHES line only if the integrator wants home inspection schools.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing: sitemaps map over `EXAMS`, no redirects, `house` icon exists, tiger falls back to the DMV
one (optionally borrow the `realestate` set through `BORROWED_SETS`).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 60).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nhie:home-inspector:16001`

## CLAUDE.md (under Additional Exams, after the Journeyman Electrician bullet)

```md
- **Home Inspector** (EBPHI National Home Inspector Examination, `/home-inspector/*`, landing `/home-inspector-exam-practice-test`): `data/nhie-questions.json` (200 questions on the EBPHI content outline, Domain 1 inspection 70%, Domain 2 reporting 20%, Domain 3 professional 10%: site, exterior and roofing 32, structure and interiors 20, electrical 16, heating and cooling 16, insulation, moisture and exhaust 20, plumbing and fuel 12, fireplaces, chimneys and life safety 24, methods and limitations 16, defects, service life and referrals 24, agreements, ethics and liability 20), a shorter mock of the real 200 (175 scored) in 4 hours: test IDs 16001-16004 (50 questions each), sets 16001-16005, state `NHIE`, prefix `NHIE-`, 70% readiness line (the real exam is scaled 200 to 800, 500 to pass). 8/5/4/4/5/3/6/4/6/5 per test. IRC 2021 and NEC 2023 figures (the outline's references); conditions described in words; state licensing rules left out. Built by `tools/next100/nhie/build.py`; sources in `tools/next100/nhie/sources.md`.
```
