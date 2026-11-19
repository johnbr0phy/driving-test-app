# Wiring for `esthetician` (NIC National Esthetics Theory Examination, US, v1)

Files already written by the builder: `data/esthetician-questions.json` (200, PASS, key-longest
18%, key>1.2x 19%), `lib/banks/esthetician.ts`, `app/esthetician/*` (layout, redirect, dashboard,
drill, stats, copied from `app/nail-technician/`; no test or practice folders, the shared
`app/[slug]` routes serve them), `app/esthetician-practice-test/page.tsx` (copied from
`app/nail-technician-practice-test/`), `tools/build-run-2026-11-18/esthetician/*` (sources,
`q_*.py`, `build.py`, this file). Everything below goes in shared files.

Rebuild: `python3 -I tools/build-run-2026-11-18/esthetician/build.py`, then validate:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/esthetician-questions.json --pool esthInfection=24 --pool esthAnatomy=20 --pool esthSkin=20 --pool esthDisorders=24 --pool esthHair=8 --pool esthChemistry=12 --pool esthConsult=20 --pool esthFacial=28 --pool esthElectric=12 --pool esthMakeup=12 --pool esthHairRemoval=12 --pool esthBody=8`

Format: 4 tests x 50, five topic sets (36/48/44/36/36), 9 dashboard steps; pools exactly 4x per
test. Pass line 75% (each board sets the cut; many use 75, e.g. South Carolina).

## lib/exams.ts

Add `"esthetician"` to the `ExamId` union. Icon `sparkles` already exists (cosmetology, nailtech).

```ts
const esthetician: ExamConfig = {
  id: "esthetician",
  stateCode: "ESTH",
  idBase: 40500,
  slug: "/esthetician",
  landingPath: "/esthetician-practice-test",
  name: "Esthetician Practice Test",
  shortName: "Esthetician",
  examLabel: "Esthetician state board",
  fullName: "NIC National Esthetics Theory Examination",
  questionIdPrefix: "ESTH-",
  icon: "sparkles",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // NIC National Esthetics Theory Examination CIB, effective September 1, 2025, revised
  // March 1, 2026: 110 items, 100 scored, 90 minutes. Scientific Concepts 55% (here 27: infection
  // control 6, anatomy 5, skin 5, disorders 6, hair 2, chemistry 3) and Skin Care and Services 45%
  // (here 23: consultation 5, facials 7, equipment 3, makeup 3, hair removal and lashes 3, body
  // and other services 2); the split inside each domain is Tigertest's. Each board sets its pass
  // mark (75 in many, e.g. South Carolina). References: Milady Standard Esthetics 12th ed., Pivot
  // Point Fundamentals: Esthetics. All items original.
  blueprint: {
    esthInfection: 6,
    esthAnatomy: 5,
    esthSkin: 5,
    esthDisorders: 6,
    esthHair: 2,
    esthChemistry: 3,
    esthConsult: 5,
    esthFacial: 7,
    esthElectric: 3,
    esthMakeup: 3,
    esthHairRemoval: 3,
    esthBody: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 40501, name: "Infection Control & Chemistry", categories: ["esthInfection", "esthChemistry"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 2, id: 40502, name: "Anatomy, Skin & Hair", categories: ["esthAnatomy", "esthSkin", "esthHair"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 40503, name: "Skin Disorders & Consultation", categories: ["esthDisorders", "esthConsult"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 4, id: 40504, name: "Facials & Body Treatments", categories: ["esthFacial", "esthBody"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 40505, name: "Equipment, Makeup & Hair Removal", categories: ["esthElectric", "esthMakeup", "esthHairRemoval"], size: 36, weightLabel: "9 of 50 test questions" },
  ],
  categoryLabels: {
    esthInfection: "Infection Control & Safety",
    esthAnatomy: "Anatomy & Physiology",
    esthSkin: "Skin Histology & Functions",
    esthDisorders: "Skin Disorders & Diseases",
    esthHair: "Hair & Hair Growth",
    esthChemistry: "Chemistry & Ingredients",
    esthConsult: "Consultation & Skin Analysis",
    esthFacial: "Facial Procedures",
    esthElectric: "Equipment & Advanced Treatments",
    esthMakeup: "Makeup",
    esthHairRemoval: "Hair Removal, Lashes & Brows",
    esthBody: "Body & Other Services",
  },
  copy: {
    guestPrompt: "to save your esthetics exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the NIC esthetics theory outline: infection control and chemistry; anatomy, skin and hair; skin disorders and consultation; facials and body treatments; and equipment, makeup and hair removal. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the NIC proportions, 75% readiness line",
    heroSubs: [
      "Five training sets, four practice tests. Start with Infection Control & Chemistry.",
      "Master each set, then test.",
      "Keep going. Every topic you master shows up on the tests.",
      "Fix the misses, then retake.",
      "All done. Go pass your state board.",
    ],
    sourceLine: "Based on the NIC National Esthetics Theory Examination outline (bulletin effective September 1, 2025: 110 items, 100 scored, 90 minutes). Original questions. Some states use a different exam; check your board. Not affiliated with NIC.",
    analyticsKey: "esthetician",
  },
};
```

Append `esthetician` to the `EXAMS` array right after `nailtech` (cosmetology, barber, nailtech,
esthetician together).

Check: 40501-40505 (tests 40501-40504 and sets 40501-40505) must be free; the run assigned
idBase 40500.

## lib/banks/all.ts

```ts
import "./esthetician";
```

## types/index.ts

- `QuestionType`: add `| "ESTH"`.
- `QuestionCategory`, under a `// Esthetician (NIC esthetics theory)` comment:

```ts
  | "esthInfection"
  | "esthAnatomy"
  | "esthSkin"
  | "esthDisorders"
  | "esthHair"
  | "esthChemistry"
  | "esthConsult"
  | "esthFacial"
  | "esthElectric"
  | "esthMakeup"
  | "esthHairRemoval"
  | "esthBody"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    esthInfection: "Infection Control & Safety",
    esthAnatomy: "Anatomy & Physiology",
    esthSkin: "Skin Histology & Functions",
    esthDisorders: "Skin Disorders & Diseases",
    esthHair: "Hair & Hair Growth",
    esthChemistry: "Chemistry & Ingredients",
    esthConsult: "Consultation & Skin Analysis",
    esthFacial: "Facial Procedures",
    esthElectric: "Equipment & Advanced Treatments",
    esthMakeup: "Makeup",
    esthHairRemoval: "Hair Removal, Lashes & Brows",
    esthBody: "Body & Other Services",
```

## app/globals.css

Suggested hue 330 20% 40%, dusty rose (white text 6.5:1). Checked against every theme in
`app/globals.css` plus this run's settled hues (nailtech 331 85% 36% differs by 65 saturation;
carscook 350 and cahambasic 356 are more than 8 degrees away). Re-check against the other
builders of this run. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Esthetician theme: dusty rose */
  [data-theme="esthetician"] {
    --brand: 330 20% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 330 25% 96%;
    --brand-hover: 330 20% 34%;
    --brand-dark: 330 20% 28%;
    --brand-darker: 330 20% 18%;
    --brand-muted: 330 15% 70%;
    --brand-border: 330 15% 80%;
    --brand-border-light: 330 15% 89%;
    --brand-gradient-to: 345 25% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `esthetician: "Esthetician state board theory prep on the NIC Esthetics outline: infection control, skin anatomy and disorders, chemistry, consultation and skin analysis, facials, electrical equipment, makeup, waxing, lash and brow services and body treatments.",`
- `EXAM_ORG`: `esthetician: "NIC (National-Interstate Council of State Boards of Cosmetology) · esthetics theory",`
- Hub group "Workplace & job certifications": insert `"esthetician"` right after `"nailtech"`
  (after `"barber"` if nailtech is not in yet).
- `SEARCH_ALIASES`:
  `esthetician: "esthetician esthetics aesthetician aesthetics esthetic skin care skincare facial facialist nic esthetics esthetics state board esthetician license esthetician exam esthetics theory waxing lash brow skin therapist",`
- Drop `esthetics esthetician` from the `cosmetology` alias so an "esthetician" search lands on
  this test first (only if `tests/test-search-aliases.test.cjs` has no case relying on it), and
  add a case: `"esthetician state board"` finds `esthetician`.
- `RELATED_OVERRIDES`: none needed (the hub group has many members).

## lib/region.ts

Nothing: US is the default region.

## lib/examFacts.ts

```ts
  esthetician: {
    answer:
      "Most US states license estheticians (skin care specialists) and require a written theory exam and usually a practical exam. Many state boards use the NIC National Esthetics Theory Examination, developed by the National-Interstate Council of State Boards of Cosmetology. It has 110 multiple-choice questions, 100 of them scored, in 90 minutes, each with four options and one correct answer. The outline has two domains: Scientific Concepts, 55 percent (microbiology, infection control and safety, anatomy and physiology, the skin, skin disorders, hair and chemistry), and Skin Care and Services, 45 percent (consultation and skin analysis, facial procedures, electrical equipment, makeup, body treatments, lash and brow services, hair removal and advanced treatments). Each state board sets its passing score; many use 75. Training hours, fees, scope of practice and the practical exam vary by state, and some states use a different exam provider.",
    rows: [
      { label: "Questions", value: "110 (100 scored), four options each" },
      { label: "Time", value: "90 minutes" },
      { label: "Passing score", value: "Set by each board; 75 in many states (e.g. South Carolina)" },
      { label: "Largest domain", value: "Scientific Concepts, 55%" },
      { label: "Also required", value: "Usually a practical exam (varies by state)" },
      { label: "Developed by", value: "NIC (National-Interstate Council of State Boards of Cosmetology)" },
    ],
    basedOn: "the NIC National Esthetics Theory Examination candidate information bulletin, effective September 1, 2025 (revised March 1, 2026), checked November 2026",
    source: { name: "NIC Esthetics Theory CIB", url: "https://prov-testing.github.io/nic_cib/esthetics_national_theory_english.html" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date, comment naming `esthetician`.

## TEACHER_LED / TEACHES

Taught in esthetics and cosmetology schools, like `cosmetology`, `barber` and `nailtech`:
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"esthetician"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `esthetician: "at an esthetics school",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `esthetician: "cosmetology",` (borrow the cosmetology tiger; the landing uses
`getTigerAsset("esthetician", 3)`).

## lib/examFreshness.json

Nothing dated: no newer NIC esthetics outline announced as of 2026-11-18 (the CIB was revised
March 1, 2026). The yearly review covers it.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. No set exceeds 60 (largest 48), so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing esthetician:esthetician:40501`

## CLAUDE.md (under Additional Exams, after the Nail Technician bullet, or after Barber)

```md
- **Esthetician** (`esthetician`, NIC National Esthetics Theory Examination, the written state board exam for estheticians in NIC states, `/esthetician/*`, landing `/esthetician-practice-test`): `data/esthetician-questions.json` (200 original questions on the NIC Esthetics theory CIB effective September 1, 2025, revised March 1, 2026 (110 items, 100 scored, 90 minutes; Scientific Concepts 55%, Skin Care and Services 45%): infection control and safety (OSHA bloodborne pathogens and HazCom SDS sections) 24, anatomy and physiology 20, skin histology and functions 20, skin disorders and diseases (NCI ABCDE signs) 24, hair 8, chemistry (FDA labeling order, AHAs and BHAs) 12, consultation and Fitzpatrick skin analysis 20, facial procedures (FDA sunscreen facts) 28, electrical and advanced equipment 12, makeup (FDA kohl, mascara, lash adhesives) 12, hair removal, lashes and brows (FDA silver nitrate tint) 12, body and other services (FDA DHA rules) 8), test IDs 40501-40504, sets 40501-40505 (Infection Control & Chemistry 36, Anatomy, Skin & Hair 48, Skin Disorders & Consultation 44, Facials & Body Treatments 36, Equipment, Makeup & Hair Removal 36), state `ESTH`, prefix `ESTH-`, 75% pass (each board sets its cut; 75 in many states, e.g. South Carolina). 6/5/5/6/2/3 and 5/7/3/3/3/2 per test (27/23, close to the 55/45 domains; the split inside each is Tigertest's). Training hours, fees, scope of practice and the practical exam vary by state and are not asked. Checked against `cosmetology`, `barber`, `nailtech` and `mblex` for repeated fact-and-answer pairs. Built by `tools/build-run-2026-11-18/esthetician/build.py`; sources in `tools/build-run-2026-11-18/esthetician/sources.md`. Region US, hub group "Workplace & job certifications" (after nailtech), `[data-theme="esthetician"]` dusty rose (330 20% 40%), borrows the cosmetology tiger, teacher-led (esthetics schools).
```
