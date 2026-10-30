# Wiring for `jelec` (journeyman electrician exam, 2023 NEC, US, v1)

Files already written by the builder: `data/journeyman-electrician-questions.json` (200, PASS),
`lib/banks/jelec.ts`, `app/journeyman-electrician/*` (8 wrappers, copied from `app/life-in-the-uk/`),
`app/journeyman-electrician-practice-test/page.tsx`, `tools/next30/jelec/*` (spec, sources,
`q_*.py`, `build.py`). Everything below goes in shared files.

Format: standard v1 shape, 4 tests x 50 questions, 70% pass (35 of 50). Dashboard = 5 training
sets + 4 tests = 9 steps. Each pool is exactly 4x its per-test count, so no item repeats across tests.
Rebuild: `python3 -I tools/next30/jelec/build.py`.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/journeyman-electrician-questions.json --pool jelecGeneral=20 --pool jelecTheory=20 --pool jelecBranch=24 --pool jelecServices=20 --pool jelecGround=28 --pool jelecWiring=32 --pool jelecEquip=16 --pool jelecMotors=20 --pool jelecSpecial=20`
-> `letters A/B/C/D 50 each, key-longest 18%, key>1.2x 15%, PASS`.

## lib/exams.ts

Add `"jelec"` to the `ExamId` union. Icon `hardhat` already exists (optional: a new `zap` icon
would read better, but needs `TestIcon.tsx` and `CDLHeader.tsx` changes).

```ts
const jelec: ExamConfig = {
  id: "jelec",
  stateCode: "JELEC",
  idBase: 11000,
  slug: "/journeyman-electrician",
  landingPath: "/journeyman-electrician-practice-test",
  name: "Journeyman Electrician Practice Test",
  shortName: "Journeyman Electrician",
  examLabel: "journeyman electrician exam",
  fullName: "Journeyman electrician license exam (2023 NEC)",
  questionIdPrefix: "JELEC-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // No single national exam: states and cities use the ICC National Standard Journeyman
  // Electrician exam (about 80 questions, 4 hours, open book) or their own PSI/Prometric exams,
  // most at 70% (some 75%). Content is NFPA 70, the 2023 NEC (checked October 2026), plus
  // theory and calculations. No state publishes a national per-article split, so this is a
  // typical journeyman weighting, heaviest on wiring methods and grounding. National content
  // only; state licensing law is not covered. All items original.
  blueprint: {
    jelecGeneral: 5,
    jelecTheory: 5,
    jelecBranch: 6,
    jelecServices: 5,
    jelecGround: 7,
    jelecWiring: 8,
    jelecEquip: 4,
    jelecMotors: 5,
    jelecSpecial: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 11001, name: "Code Basics & Electrical Theory", categories: ["jelecGeneral", "jelecTheory"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 11002, name: "Branch Circuits, Feeders & Services", categories: ["jelecBranch", "jelecServices"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 11003, name: "Grounding & Bonding", categories: ["jelecGround"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 4, id: 11004, name: "Wiring Methods & Materials", categories: ["jelecWiring"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 5, id: 11005, name: "Equipment, Motors & Special Occupancies", categories: ["jelecEquip", "jelecMotors", "jelecSpecial"], size: 56, weightLabel: "14 of 50 test questions" },
  ],
  categoryLabels: {
    jelecGeneral: "General Requirements & Definitions",
    jelecTheory: "Electrical Theory & Calculations",
    jelecBranch: "Branch Circuits, Feeders & Load Calculations",
    jelecServices: "Services & Overcurrent Protection",
    jelecGround: "Grounding & Bonding",
    jelecWiring: "Wiring Methods & Materials",
    jelecEquip: "Equipment for General Use",
    jelecMotors: "Motors & Air Conditioning",
    jelecSpecial: "Special Occupancies, Equipment & Systems",
  },
  copy: {
    guestPrompt: "to save your journeyman electrician progress and track every question you miss",
    trainingHeading: "Train by Code topic",
    trainingSub: "Five sets covering the NEC articles and calculations the journeyman exam leans on. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across the whole Code, 70% to pass",
    heroSubs: [
      "Five Code topics, four full mock tests. Grounding and wiring weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Schedule your journeyman exam.",
    ],
    sourceLine: "Based on the 2023 National Electrical Code (NFPA 70) and standard electrical theory. Original questions; 50 per test, 70% to pass. State licensing law not included.",
    analyticsKey: "jelec",
  },
};
```

Append `jelec` to the `EXAMS` array with the other US trade exams (near `epa608`).
Check 11001-11005 are free; if another builder took 11000, move the whole block to the next free hundred.

## lib/banks/all.ts

```ts
import "./jelec";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/jelec.ts`.

## types/index.ts

- `QuestionType`: add `| "JELEC"`.
- `QuestionCategory`, under a `// Journeyman electrician` comment:

```ts
  | "jelecGeneral"
  | "jelecTheory"
  | "jelecBranch"
  | "jelecServices"
  | "jelecGround"
  | "jelecWiring"
  | "jelecEquip"
  | "jelecMotors"
  | "jelecSpecial"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    jelecGeneral: "General Requirements & Definitions",
    jelecTheory: "Electrical Theory & Calculations",
    jelecBranch: "Branch Circuits, Feeders & Load Calculations",
    jelecServices: "Services & Overcurrent Protection",
    jelecGround: "Grounding & Bonding",
    jelecWiring: "Wiring Methods & Materials",
    jelecEquip: "Equipment for General Use",
    jelecMotors: "Motors & Air Conditioning",
    jelecSpecial: "Special Occupancies, Equipment & Systems",
```

## app/globals.css

Suggested hue 42 (a dark electric amber that keeps white text readable); re-pick if it clashes with
foodmgr/others. Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Journeyman electrician theme */
  [data-theme="jelec"] {
    --brand: 38 95% 36%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 45 100% 95%;
    --brand-hover: 38 95% 30%;
    --brand-dark: 36 90% 27%;
    --brand-darker: 34 85% 18%;
    --brand-muted: 42 60% 70%;
    --brand-border: 42 70% 78%;
    --brand-border-light: 44 75% 88%;
    --brand-gradient-to: 210 60% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `jelec: "Four 50-question mock tests for the journeyman electrician exam on the 2023 NEC: grounding, wiring methods, load calculations, services, motors and theory.",`
- `EXAM_ORG`: `jelec: "2023 NEC · state and ICC journeyman exams",`
- Hub group: add to `{ title: "Aviation, radio & trade licenses", ids: ["part107", "ham", "epa608", "foodmgr", "jelec"] }`.
- `SEARCH_ALIASES`:
  `jelec: "journeyman electrician electrical license electrician exam nec 2023 national electrical code nfpa 70 icc journeyman psi prometric electrician test wireman apprentice",`
- `RELATED_OVERRIDES` (optional, cross-links the other electrician exams):
  `jelec: ["epa608", "osha", "caelec"],`

## lib/region.ts

Nothing: US is the default region, and `NON_DRIVING_TESTS` lists only non-US exams (epa608, ham and the other US trade exams are not in it).

## lib/examFacts.ts

```ts
  jelec: {
    answer:
      "The journeyman electrician exam is a state or city licensing exam on the National Electrical Code, electrical theory and calculations, taken after a set amount of supervised work, often about 8,000 hours or a completed apprenticeship. There is no single national version: many places use the ICC national journeyman exam of about 80 multiple-choice questions in 4 hours, open book with the NEC, and 70 percent is the most common passing score. Most exams now test the 2023 NEC, but each state sets its own edition, eligibility and pass mark.",
    rows: [
      { label: "Questions", value: "About 80 multiple choice (varies by state)" },
      { label: "Time", value: "About 4 hours" },
      { label: "Passing score", value: "Usually 70% (some states 75%)" },
      { label: "Format", value: "Open book with the NEC in most states" },
      { label: "Code edition", value: "The edition your state adopted, often 2023 NEC" },
      { label: "Given by", value: "State boards via ICC, PSI or Prometric" },
    ],
    basedOn: "NFPA 70, National Electrical Code 2023, and state journeyman exam bulletins, checked October 2026",
    source: { name: "NFPA 70: National Electrical Code", url: "https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx

Add `"jelec"` to `TEACHER_LED` (taught in apprenticeship and trade-school code classes).

## components/exam/ExamClassFaq.tsx

In `TEACHES`: `jelec: "an electrical apprenticeship or NEC code class",`. The landing already renders
`<ExamClassFaq examId="jelec" />` and `classFaqJsonLd("jelec")`.

## lib/tigerAssets.ts

Nothing: falls back to the DMV tiger.

## Landing breadcrumbs

`<ExamLandingBreadcrumbs examId>` does not exist in this tree (the template does not render it
either). If the integrator adds it, place it right after the JSON-LD script in
`app/journeyman-electrician-practice-test/page.tsx`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing jelec:journeyman-electrician:11001`

## CLAUDE.md (under Additional Exams)

```md
- **Journeyman Electrician** (state/ICC journeyman license exam, `/journeyman-electrician/*`, landing `/journeyman-electrician-practice-test`): `data/journeyman-electrician-questions.json` (200 questions on the 2023 NEC and theory: general 20, theory/calculations 20, branch circuits/feeders/load calcs 24, services/overcurrent 20, grounding/bonding 28, wiring methods 32, equipment 16, motors/AC 20, special occupancies 20), test IDs 11001-11004, sets 11001-11005, state `JELEC`, 70% pass. 5/5/6/5/7/8/4/5/5 per test. National NEC content only, never state licensing law; the landing says the exam, edition and pass mark vary by state. Built by `tools/next30/jelec/build.py`; sources in `tools/next30/jelec/sources.md`.
```
