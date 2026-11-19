# Wiring for `natecore` (NATE Core exam, North American Technician Excellence, US, v1)

Files already written by the builder: `data/nate-core-questions.json` (200, PASS, key-longest 16%),
`lib/banks/natecore.ts`, `app/nate-core/*` (layout, redirect, dashboard, drill, stats, copied from
`app/r410a/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/nate-core-practice-test/page.tsx` (structure copied from `app/r410a-certification-practice-test/`,
itself from the current v1 landing template), `tools/build-run-2026-11-18/natecore/*` (sources.md,
`q_*.py`, `build.py`, this file). Everything below goes in shared files.

Rebuild: `python3 -I tools/build-run-2026-11-18/natecore/build.py`, then validate:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/nate-core-questions.json --pool nateSafety=36 --pool nateTools=20 --pool nateConstruction=16 --pool nateScience=20 --pool nateComfort=28 --pool nateMeasure=28 --pool nateElectric=52`

Format: 4 tests x 50 (the real Core exam is 50 questions, closed book, 1.5 hours, pass/fail),
weighted by NATE's published section percentages; four topic sets in KATE order (56/36/56/52),
8 dashboard steps; pools exactly 4x per test. 70% is Tigertest's readiness line (NATE publishes
no percentage cut score). Ready-to-Work and HVAC Support Technician are separate NATE
certificates with their own KATEs and are not modelled.

`tools/check_sources.py` needs Python 3.10+; on this Mac (3.9) it was run from a copy with
`from __future__ import annotations`: 33 primary pages, 13 dated reads.

## lib/exams.ts

Add `"natecore"` to the `ExamId` union. Icon `thermometer` already exists (used by `epa608`).

```ts
const natecore: ExamConfig = {
  id: "natecore",
  stateCode: "NATECORE",
  idBase: 41000,
  slug: "/nate-core",
  landingPath: "/nate-core-practice-test",
  name: "NATE Core Exam Practice Test",
  shortName: "NATE Core",
  examLabel: "NATE Core Exam",
  fullName: "NATE (North American Technician Excellence) Core exam",
  questionIdPrefix: "NATE-",
  icon: "thermometer",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // NATE Core Exam KATE (Knowledge Areas of Technician Expertise), natex.org, read 2026-11-18:
  // 50 questions, closed book, 1.5 hours, pass/fail; Basic Electricity 26%, Safety 18%, Taking
  // Temp. & Humidity Measurements 14%, Achieving Desired Conditions 14%, Tools 10%, Using Basic
  // Science 10%, Basic Construction 8%, scaled to 50 below. NATE publishes no percentage cut
  // score, so 70% is Tigertest's readiness line. Facts from OSHA 29 CFR 1910/1926, DOT 49 CFR
  // 172/177, EPA, EIA, ENERGY STAR and ACCA pages, Copeland AE4-1331 R9, Fluke, and physics.
  blueprint: {
    nateSafety: 9,
    nateTools: 5,
    nateConstruction: 4,
    nateScience: 5,
    nateComfort: 7,
    nateMeasure: 7,
    nateElectric: 13,
  },
  trainingSets: [
    { setNumber: 1, id: 41001, name: "Safety & Tools", categories: ["nateSafety", "nateTools"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 2, id: 41002, name: "Basic Construction & Science", categories: ["nateConstruction", "nateScience"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 3, id: 41003, name: "Comfort & Measurements", categories: ["nateComfort", "nateMeasure"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 4, id: 41004, name: "Basic Electricity", categories: ["nateElectric"], size: 52, weightLabel: "13 of 50 test questions" },
  ],
  categoryLabels: {
    nateSafety: "Safety",
    nateTools: "Tools",
    nateConstruction: "Basic Construction",
    nateScience: "Using Basic Science",
    nateComfort: "Achieving Desired Conditions",
    nateMeasure: "Temperature & Humidity Measurements",
    nateElectric: "Basic Electricity",
  },
  copy: {
    guestPrompt: "to save your NATE Core progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets in NATE's order: safety and tools, construction and basic science, comfort and measurements, and basic electricity. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions like the real Core exam, 70% readiness line",
    heroSubs: [
      "Four training sets, four practice tests. Start with Safety & Tools.",
      "Master each set, then test.",
      "Keep going. Every topic you master shows up on the tests.",
      "Fix the misses, then retake.",
      "All done. Go pass your NATE Core exam.",
    ],
    sourceLine: "Based on NATE's Core exam KATE outline and weights, OSHA and DOT safety rules, EPA, ENERGY STAR and ACCA guidance and HVAC physics. Original questions. Not affiliated with North American Technician Excellence (NATE).",
    analyticsKey: "natecore",
  },
};
```

Append `natecore` to the `EXAMS` array right after `epa608` (or after `r410a` if that is wired).

Check: 41001-41004 (tests and sets) must be free; the run assigned idBase 41000 (grep found no
410xx ids in `lib/exams.ts` or the other WIRING files on 2026-11-18).

## lib/banks/all.ts

```ts
import "./natecore";
```

## types/index.ts

- `QuestionType`: add `| "NATECORE"`.
- `QuestionCategory`, under a `// NATE Core exam` comment:

```ts
  | "nateSafety"
  | "nateTools"
  | "nateConstruction"
  | "nateScience"
  | "nateComfort"
  | "nateMeasure"
  | "nateElectric"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nateSafety: "Safety",
    nateTools: "Tools",
    nateConstruction: "Basic Construction",
    nateScience: "Using Basic Science",
    nateComfort: "Achieving Desired Conditions",
    nateMeasure: "Temperature & Humidity Measurements",
    nateElectric: "Basic Electricity",
```

## app/globals.css

The wheel is almost full. Checked against every `--brand` in `app/globals.css` and every
WIRING.md in this run on 2026-11-18 with the clash rule and white-text contrast of 4.5:1: the only
free slots were hue 289 to 291 at 20% saturation (lightness 38 to 42) and 329 to 333 at 20%
(lightness 30 or 48). Suggested: 290 20% 40%, a muted slate mauve. Re-check against the other
builders' final hues. Then run `tools/gen_dark_brand_css.py`.

```css
  /* NATE Core exam theme: muted slate mauve */
  [data-theme="natecore"] {
    --brand: 290 20% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 290 20% 96%;
    --brand-hover: 290 20% 34%;
    --brand-dark: 290 20% 27%;
    --brand-darker: 290 20% 17%;
    --brand-muted: 290 15% 70%;
    --brand-border: 290 15% 80%;
    --brand-border-light: 290 15% 89%;
    --brand-gradient-to: 300 15% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `natecore: "NATE Core exam practice for HVACR technicians: safety, tools, basic construction, basic science, comfort and indoor air, temperature and humidity measurements, and basic electricity, weighted like NATE's 50-question Core exam.",`
- `EXAM_ORG`: `natecore: "NATE · North American Technician Excellence Core exam",`
- Hub group "Aviation, radio & trade licenses": insert `"natecore"` right after `"epa609"` (after
  `"r410a"` if that is wired).
- `SEARCH_ALIASES`:
  `natecore: "nate nate core nate core exam nate core test nate certification nate exam nate test north american technician excellence hvac core exam hvac certification hvacr certification hvac technician test hvac practice test kate nate kate",`
- `RELATED_OVERRIDES`: optional `natecore: ["epa608", "r410a", "jelec"],` (the hub group already
  has more than three members).

## lib/region.ts

Nothing: US is the default region (epa608 has no `TEST_REGIONS` line). NATE also certifies in
Canada, but the bank uses US federal rules (OSHA, DOT, EPA).

## lib/examFacts.ts

```ts
  natecore: {
    answer:
      "The NATE Core exam is the knowledge exam from North American Technician Excellence (NATE) that tests an HVACR technician's general knowledge, construction knowledge and HVACR knowledge in safety, tools, basic construction, basic science, achieving desired conditions, taking measurements and basic electricity. NATE says it is a requirement for most installation or service specialty certifications. It has 50 questions, is closed book with a 1.5 hour time limit, and is scored pass/fail; NATE sets the passing score through a Passing Score Study and does not publish a percentage. On the traditional pathway a technician passes the Core exam and a 100-question Specialty exam. NATE certifications are renewed every two years.",
    rows: [
      { label: "Questions", value: "50" },
      { label: "Time limit", value: "1.5 hours, closed book" },
      { label: "Scoring", value: "Pass/fail; no percentage published (Tigertest uses 70% as a readiness line)" },
      { label: "Weights", value: "Electricity 26%, Safety 18%, Measurements 14%, Desired Conditions 14%, Tools 10%, Basic Science 10%, Construction 8%" },
      { label: "Needed for", value: "Most NATE installation or service specialty certifications" },
      { label: "Renewal", value: "Every two years (16 continuing education hours or a Specialty retake)" },
    ],
    basedOn: "NATE's Core exam KATE, Traditional Pathway and Recertification FAQ pages, checked November 2026",
    source: { name: "NATE Core exam KATE (PDF)", url: "https://natex.org/wp-content/uploads/2022/06/Core-KATE-Final.pdf" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date, comment naming `natecore`.

## TEACHER_LED / TEACHES

Taught in HVAC programs and NATE prep classes:
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"natecore"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `natecore: "an HVAC program or NATE prep class",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `natecore: "epa608",` (borrow the EPA 608 tiger, if epa608 has a set; otherwise
the DMV fallback applies).

## lib/examFreshness.json

No dated change announced. The Core KATE PDF is dated 2022; re-check natex.org's KATE page at
the yearly review for a revised Core KATE.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. No set exceeds 60 (largest 56), so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing natecore:nate-core:41001`

## CLAUDE.md (under Additional Exams, after the EPA 608 or R-410A bullet)

```md
- **NATE Core** (`natecore`, North American Technician Excellence Core exam for HVACR technicians, the knowledge exam most NATE installation and service specialty certifications require, `/nate-core/*`, landing `/nate-core-practice-test`): `data/nate-core-questions.json` (200 original questions on NATE's Core exam KATE: safety (OSHA ladders 3 feet and one quarter of working length, nonconductive rails, oxygen 20 feet from fuel gas, acetylene 15 psig, fire watch 35 feet and 30 minutes, fire classes, 85 dBA and 50% dose, permit space test order and 23.5% oxygen, lockout, deenergized verification, cords, GFCI, nip points, SDS sections, DOT hazmat training 90 days and every three years, vermiculite) 36, tools (measuring, scale drawings, tolerances, 3-4-5, flaring, reaming, swaging, benders, snips, taps, punches) 20, basic construction (plans and specs, fenestration and NFRC, R-value, trusses, girders, headers, rafters, ENERGY STAR attic sealing and duct leakage 20 to 30 percent) 16, using basic science (Ohm's law, series and parallel, transformer ratio, solid state, absolute pressure, gas laws, combustion, areas, volumes, tons, power factor, levers) 20, achieving desired conditions (EPA humidity below 60, ideally 30 to 50 percent, IAQ strategies, MERV, ventilation, ERV and HRV, sound, ACCA Manuals J, S, D and T) 28, temperature and humidity measurements (sensible and latent heat, Btu, conduction, convection, radiation, IR emissivity, psychrometer, dew point, enthalpy, 1.08 x CFM x delta T, 4.5 x CFM x delta h) 28, basic electricity (symbols, pictorial, field and ladder diagrams, thermostat terminals, PSC, shaded-pole, CSCR, windings, run capacitors, LRA, three-phase rotation and imbalance, Copeland AE4-1331 voltage range, ECM, actuators, meters, RMS, microamps, megohm) 52), test IDs 41001-41004, sets 41001-41004 (Safety & Tools 56, Basic Construction & Science 36, Comfort & Measurements 56, Basic Electricity 52), state `NATECORE`, prefix `NATE-`, 70% readiness line (NATE: 50 questions, closed book, 1.5 hours, pass/fail with no published percentage). 9/5/4/5/7/7/13 per test, NATE's 18/10/8/10/14/14/26 percent. Ready-to-Work and HVAC Support Technician certificates not modelled. Checked against `epa608`, `r410a`, `jelec`, `ase` and `osha` for repeated fact-and-answer pairs. Built by `tools/build-run-2026-11-18/natecore/build.py`; sources in `tools/build-run-2026-11-18/natecore/sources.md`. Region US, hub group "Aviation, radio & trade licenses" (after epa609), `[data-theme="natecore"]` muted slate mauve (290 20% 40%), borrows the EPA 608 tiger, teacher-led (HVAC programs).
```
