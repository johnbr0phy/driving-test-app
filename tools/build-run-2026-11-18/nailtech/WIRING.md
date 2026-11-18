# Wiring for `nailtech` (NIC National Nail Technology Theory Examination, US, v1)

Files already written by the builder: `data/nail-technician-questions.json` (200, PASS, key-longest
12%), `lib/banks/nailtech.ts`, `app/nail-technician/*` (layout, redirect, dashboard, drill, stats,
copied from `app/mblex/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/nail-technician-practice-test/page.tsx` (copied from `app/mblex-practice-test/`),
`tools/build-run-2026-11-18/nailtech/*` (sources, `q_*.py`, `build.py`, this file). Everything
below goes in shared files.

Rebuild: `python3 -I tools/build-run-2026-11-18/nailtech/build.py`, then validate:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/nail-technician-questions.json --pool nailInfection=32 --pool nailStructure=16 --pool nailDisorders=16 --pool nailChemistry=20 --pool nailConsult=16 --pool nailTools=24 --pool nailManiPedi=36 --pool nailEnhance=40`

Format: 4 tests x 50, four topic sets (52/48/60/40), 8 dashboard steps; pools exactly 4x per test.
Pass line 75% (NIC reports a scaled score; boards set the cut, many at 75, e.g. South Carolina).

## lib/exams.ts

Add `"nailtech"` to the `ExamId` union. Icon `sparkles` already exists (used by `cosmetology`).

```ts
const nailtech: ExamConfig = {
  id: "nailtech",
  stateCode: "NAILTECH",
  idBase: 34400,
  slug: "/nail-technician",
  landingPath: "/nail-technician-practice-test",
  name: "Nail Technician Practice Test",
  shortName: "Nail Tech",
  examLabel: "Nail technician state board",
  fullName: "NIC National Nail Technology Theory Examination",
  questionIdPrefix: "NAIL-",
  icon: "sparkles",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // NIC National Nail Technology Theory Examination CIB, effective September 1, 2025, revised
  // March 1, 2026: 110 items, 100 scored, 90 minutes. Infection Control and Safety 15%, Anatomy
  // and Physiology 15% (split here into structure 4 and disorders 4), Chemistry of Nail Products
  // 10%, Pre-service 5% + Post-service 4% (consultation 4), Nail Service Tools 13%, Manicure and
  // Pedicure Services 18%, Nail Enhancement Services 20%. NIC reports a scaled score; each board
  // sets its pass mark (75 in many, e.g. South Carolina). References: Milady Standard Nail
  // Technology 8th ed., Pivot Point Fundamentals: Nails. All items original.
  blueprint: {
    nailInfection: 8,
    nailStructure: 4,
    nailDisorders: 4,
    nailChemistry: 5,
    nailConsult: 4,
    nailTools: 6,
    nailManiPedi: 9,
    nailEnhance: 10,
  },
  trainingSets: [
    { setNumber: 1, id: 34401, name: "Infection Control & Chemistry", categories: ["nailInfection", "nailChemistry"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 34402, name: "Anatomy, Disorders & Consultation", categories: ["nailStructure", "nailDisorders", "nailConsult"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 34403, name: "Tools, Manicures & Pedicures", categories: ["nailTools", "nailManiPedi"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 4, id: 34404, name: "Nail Enhancements", categories: ["nailEnhance"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    nailInfection: "Infection Control & Safety",
    nailStructure: "Nail, Skin & Limb Anatomy",
    nailDisorders: "Nail & Skin Disorders",
    nailChemistry: "Chemistry of Nail Products",
    nailConsult: "Consultation & Post-Service",
    nailTools: "Nail Service Tools",
    nailManiPedi: "Manicures & Pedicures",
    nailEnhance: "Nail Enhancements",
  },
  copy: {
    guestPrompt: "to save your nail tech exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets on the NIC nail technology theory outline: infection control and chemistry; anatomy, disorders and consultation; tools, manicures and pedicures; and nail enhancements. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the NIC proportions, 75% readiness line",
    heroSubs: [
      "Four training sets, four practice tests. Start with Infection Control & Chemistry.",
      "Master each set, then test.",
      "Keep going. Every topic you master shows up on the tests.",
      "Fix the misses, then retake.",
      "All done. Go pass your state board.",
    ],
    sourceLine: "Based on the NIC National Nail Technology Theory Examination outline (bulletin effective September 1, 2025: 110 items, 100 scored, 90 minutes). Original questions. Some states use a different exam; check your board. Not affiliated with NIC.",
    analyticsKey: "nailtech",
  },
};
```

Append `nailtech` to the `EXAMS` array right after `barber` (or after `cosmetology`).

Check: 34401-34404 (tests and sets) must be free; the run assigned idBase 34400.

## lib/banks/all.ts

```ts
import "./nailtech";
```

## types/index.ts

- `QuestionType`: add `| "NAILTECH"`.
- `QuestionCategory`, under a `// Nail technician (NIC nail technology theory)` comment:

```ts
  | "nailInfection"
  | "nailStructure"
  | "nailDisorders"
  | "nailChemistry"
  | "nailConsult"
  | "nailTools"
  | "nailManiPedi"
  | "nailEnhance"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nailInfection: "Infection Control & Safety",
    nailStructure: "Nail, Skin & Limb Anatomy",
    nailDisorders: "Nail & Skin Disorders",
    nailChemistry: "Chemistry of Nail Products",
    nailConsult: "Consultation & Post-Service",
    nailTools: "Nail Service Tools",
    nailManiPedi: "Manicures & Pedicures",
    nailEnhance: "Nail Enhancements",
```

## app/globals.css

Suggested hue 331 85% 36%, nail-polish raspberry (white text 7.2:1; checked against every theme
on disk: SSAT is 331 95% 26%, 10 points darker, so it passes the clash rule; re-check against the
other builders in this run). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Nail technician theme: nail-polish raspberry */
  [data-theme="nailtech"] {
    --brand: 331 85% 36%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 331 80% 96%;
    --brand-hover: 331 85% 30%;
    --brand-dark: 331 85% 24%;
    --brand-darker: 331 75% 15%;
    --brand-muted: 331 35% 70%;
    --brand-border: 331 35% 80%;
    --brand-border-light: 331 30% 89%;
    --brand-gradient-to: 345 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nailtech: "Nail technician state board theory prep on the NIC Nail Technology outline: infection control and salon safety, nail anatomy and disorders, product chemistry, tools, manicures and pedicures, and acrylic, gel and dip enhancements.",`
- `EXAM_ORG`: `nailtech: "NIC (National-Interstate Council of State Boards of Cosmetology) · nail technology theory",`
- Hub group "Workplace & job certifications": insert `"nailtech"` right after `"barber"`.
- `SEARCH_ALIASES`:
  `nailtech: "nail tech nail technician manicurist manicure pedicure nail technology nic nail exam nail state board nail license nail tech license nail tech test nail salon acrylic gel nails nail school",`
- Optional: drop `nails nail tech` from the `cosmetology` alias so a "nail tech" search lands on
  this test first (only if `tests/test-search-aliases.test.cjs` has no case relying on it).
- `RELATED_OVERRIDES`: none needed (the hub group has 10 other members).

## lib/region.ts

Nothing: US is the default region (cosmetology and barber have no `TEST_REGIONS` line).

## lib/examFacts.ts

```ts
  nailtech: {
    answer:
      "Most US states license nail technicians (called manicurists in some states) and require a written theory exam and usually a practical exam. Many state boards use the NIC National Nail Technology Theory Examination, developed by the National-Interstate Council of State Boards of Cosmetology. It has 110 multiple-choice questions, 100 of them scored, in 90 minutes, each with four options and one correct answer. The outline weights infection control and safety 15 percent, anatomy and physiology 15 percent, chemistry of nail products 10 percent, pre-service 5 percent, nail service tools 13 percent, manicure and pedicure services 18 percent, nail enhancement services 20 percent and post-service 4 percent. NIC reports a scaled score and each board sets its passing score; many use 75. Training hours, fees and the practical exam vary by state, and some states use a different exam provider.",
    rows: [
      { label: "Questions", value: "110 (100 scored), four options each" },
      { label: "Time", value: "90 minutes" },
      { label: "Passing score", value: "Scaled; set by each board, 75 in many states (e.g. South Carolina)" },
      { label: "Largest area", value: "Nail enhancement services, 20%" },
      { label: "Also required", value: "Usually a practical exam (varies by state)" },
      { label: "Developed by", value: "NIC (National-Interstate Council of State Boards of Cosmetology)" },
    ],
    basedOn: "the NIC National Nail Technology Theory Examination candidate information bulletin, effective September 1, 2025 (revised March 1, 2026), checked November 2026",
    source: { name: "NIC Nail Technology Theory CIB", url: "https://prov-testing.github.io/nic_cib/nail_technology_national_theory_english.html" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date, comment naming `nailtech`.

## TEACHER_LED / TEACHES

Taught in nail technology and cosmetology schools, like `cosmetology` and `barber`:
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"nailtech"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `nailtech: "at a nail technology school",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `nailtech: "cosmetology",` (borrow the cosmetology tiger).

## lib/examFreshness.json

Nothing dated: no newer NIC nail outline announced as of 2026-11-18 (the CIB was revised
March 1, 2026 with the outline unchanged in structure). The yearly review covers it.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. No set exceeds 60 (largest 60, set 3), so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nailtech:nail-technician:34401`

## CLAUDE.md (under Additional Exams, after the Barber bullet)

```md
- **Nail Technician** (`nailtech`, NIC National Nail Technology Theory Examination, the written state board exam for nail technicians and manicurists in NIC states, `/nail-technician/*`, landing `/nail-technician-practice-test`): `data/nail-technician-questions.json` (200 original questions on the NIC Nail Technology theory CIB effective September 1, 2025, revised March 1, 2026 (110 items, 100 scored, 90 minutes): infection control and safety (OSHA nail salon guidance: exhaust ventilation at least 50%, HVAC fan On, monthly charcoal filters, self-closing metal cans, nitrile gloves and latex or vinyl for acetone, N95 for dust only, goggles when transferring products, ergonomics) 32, nail, skin and limb anatomy 16, nail and skin disorders 16, chemistry of nail products (FDA: MMA, formaldehyde hardeners, toluene, DBP, EMA) 20, consultation and post-service 16, nail service tools 24, manicures and pedicures (shapes, massage, polish, paraffin, add-ons) 36, nail enhancements (tips, acrylic, soft, hard and hybrid gels, dip) 40), test IDs 34401-34404, sets 34401-34404 (Infection Control & Chemistry 52, Anatomy, Disorders & Consultation 48, Tools, Manicures & Pedicures 60, Nail Enhancements 40), state `NAILTECH`, prefix `NAIL-`, 75% pass (NIC reports a scaled score and each board sets its cut; 75 in many states, e.g. South Carolina). 8/4/4/5/4/6/9/10 per test (the outline's 15/15/10/9/13/18/20 rounded). Training hours, fees, scope rules and the practical exam vary by state and are not asked. Checked against `cosmetology`, `barber` and `mblex` for repeated fact-and-answer pairs. Built by `tools/build-run-2026-11-18/nailtech/build.py`; sources in `tools/build-run-2026-11-18/nailtech/sources.md`. Region US, hub group "Workplace & job certifications" (after barber), `[data-theme="nailtech"]` nail-polish raspberry (331 85% 36%), borrows the cosmetology tiger, teacher-led (nail technology schools).
```
