# Wiring for `barber` (barber state board written theory exam, US, v1)

Files already written by the builder: `data/barber-questions.json` (200, PASS),
`lib/banks/barber.ts`, `app/barber/*` (8 wrappers, copied from `app/life-in-the-uk/`),
`app/barber-practice-test/page.tsx`, `tools/next30/barber/*` (spec, sources, `q_*.py`, `build.py`).
Everything below goes in shared files.

Format: same shape as `cosmetology` (its sibling): 4 tests x 50, training sets from
`testSets(11100, 4)` (one set per test, DMV style), so the dashboard is 8 steps. Each pool is
exactly 4x its per-test count, so no item repeats across tests. Pass line 75%.

Rebuild: `python3 -I tools/next30/barber/build.py`, then validate:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/barber-questions.json --pool barInfection=32 --pool barAnatomy=28 --pool barChemistry=12 --pool barTools=20 --pool barConsult=20 --pool barCutting=28 --pool barStyling=12 --pool barChemical=20 --pool barShaving=16 --pool barFacial=12`

## lib/exams.ts

Add `"barber"` to the `ExamId` union. Icon `scissors` already exists in the icon union.

Block (next to `cosmetology`):

```ts
const barber: ExamConfig = {
  id: "barber",
  stateCode: "BARBER",
  idBase: 11100,
  slug: "/barber",
  landingPath: "/barber-practice-test",
  name: "Barber Practice Test",
  shortName: "Barber",
  examLabel: "Barber state board",
  fullName: "Barber state board written (theory) exam",
  questionIdPrefix: "BARBER-",
  icon: "scissors",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // NIC National Barber Theory Examination. Candidate bulletin effective June 1, 2025
  // (revised September 1, 2025): 60 items, 50 scored, 90 minutes. Scientific Concepts 35%
  // (infection 8, anatomy 7, chemistry 3 = 18 of 50), Implements and Equipment 10% (5),
  // Hair Care Services 40% (consultation 5, cutting 7, styling 3, chemical 5 = 20),
  // Facial Hair and Skin Care Services 15% (shaving 4, facials 3 = 7). NIC reports a scaled
  // score; the pass mark is set by each board (75 in most NIC states). Some states use their
  // own or a non-NIC exam. References: Milady Standard Barbering 7th ed. (2026). All items original.
  blueprint: {
    barInfection: 8,
    barAnatomy: 7,
    barChemistry: 3,
    barTools: 5,
    barConsult: 5,
    barCutting: 7,
    barStyling: 3,
    barChemical: 5,
    barShaving: 4,
    barFacial: 3,
  },
  trainingSets: testSets(11100, 4),
  categoryLabels: {
    barInfection: "Infection Control & Safety",
    barAnatomy: "Anatomy, Hair & Skin Disorders",
    barChemistry: "Chemistry of Barbering Products",
    barTools: "Implements & Equipment",
    barConsult: "Consultation, Shampoo & Scalp Care",
    barCutting: "Haircutting & Head Shaving",
    barStyling: "Hairstyling & Natural Hair",
    barChemical: "Haircolor, Perms & Relaxers",
    barShaving: "Shaving & Facial Hair Design",
    barFacial: "Facials & Electrotherapy",
  },
  copy: {
    guestPrompt: "to save your barber exam progress and track every question you miss",
    trainingHeading: "Train by test",
    trainingSub: "Four sets, one per practice test, covering every NIC barber theory topic: infection control, anatomy, tools, cutting, chemical services, shaving and facials. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, the scored length of the NIC barber theory exam",
    heroSubs: [
      "Ten topics, four tests. Infection control, anatomy and haircutting carry the most questions.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Go pass your state board.",
    ],
    sourceLine: "Based on the NIC National Barber Theory Examination outline (bulletin effective June 1, 2025: 60 items, 50 scored, 90 minutes). Original questions. Some states use their own exam; check your board.",
    analyticsKey: "barber",
  },
};
```

Append `barber` to the `EXAMS` array right after `cosmetology`.

Check: 11101-11104 (tests and sets) must be free; SPEC.md assigns idBase 11100 to this exam.

## lib/banks/all.ts

```ts
import "./barber";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/barber.ts`.

## types/index.ts

- `QuestionType`: add `| "BARBER"`.
- `QuestionCategory`, under a `// Barber (NIC barber theory)` comment:

```ts
  | "barInfection"
  | "barAnatomy"
  | "barChemistry"
  | "barTools"
  | "barConsult"
  | "barCutting"
  | "barStyling"
  | "barChemical"
  | "barShaving"
  | "barFacial"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    barInfection: "Infection Control & Safety",
    barAnatomy: "Anatomy, Hair & Skin Disorders",
    barChemistry: "Chemistry of Barbering Products",
    barTools: "Implements & Equipment",
    barConsult: "Consultation, Shampoo & Scalp Care",
    barCutting: "Haircutting & Head Shaving",
    barStyling: "Hairstyling & Natural Hair",
    barChemical: "Haircolor, Perms & Relaxers",
    barShaving: "Shaving & Facial Hair Design",
    barFacial: "Facials & Electrotherapy",
```

## app/globals.css

Light block (suggested hue 4, barber-pole red; re-pick if it clashes with ACT red), then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Barber theme: barber-pole red */
  [data-theme="barber"] {
    --brand: 4 65% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 4 80% 96%;
    --brand-hover: 4 65% 36%;
    --brand-dark: 4 65% 28%;
    --brand-darker: 4 55% 18%;
    --brand-muted: 4 40% 72%;
    --brand-border: 4 40% 80%;
    --brand-border-light: 4 35% 89%;
    --brand-gradient-to: 215 70% 96%;
  }
```

## lib/shareCards.ts (if share cards list every exam)

```ts
  "barber": {
    "color": "hsl(4, 65%, 42%)",
    "tint": "hsl(4, 80%, 96%)"
  },
```

and in `lib/shareCardCopy.ts`:
`barber: { title: "NIC Barber Theory", description: "Review infection control, tools, haircutting, chemical services, shaving and facials." },`

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `barber: "Barber state board theory prep on the NIC outline: infection control, anatomy, clippers and razors, haircutting and fades, color and relaxers, shaves and facials.",`
- `EXAM_ORG`: `barber: "NIC national barber theory exam; some states use their own",`
- Hub group: add `"barber"` to `{ title: "Workplace & job certifications", ... }` right after `"cosmetology"`.
- `SEARCH_ALIASES`:
  `barber: "barber barbering barber license barber state board barber written exam nic barber theory master barber barber school fade razor shave clipper",`
  and remove `barber` from the `cosmetology` alias string so a search for "barber" finds this exam first.
- `RELATED_OVERRIDES`: `barber: ["cosmetology", "osha", "cpr"],` and change `cosmetology` to
  `["barber", "cpr", "foodhandler"]`.

## lib/region.ts

Nothing: US is the default. Not in `NON_DRIVING_TESTS` (that set lists non-US exams).

## lib/examFacts.ts

```ts
  barber: {
    answer:
      "In states that use it, the NIC National Barber Theory Examination is 60 multiple-choice questions, 50 of them scored, in 90 minutes. Its content outline (candidate bulletin effective June 1, 2025) gives Scientific Concepts 35 percent (infection control, anatomy and physiology, product chemistry), Implements and Equipment 10 percent, Hair Care Services 40 percent and Facial Hair and Skin Care Services 15 percent. NIC reports a scaled score and each state board sets the pass mark, 75 in most NIC states. Some states write their own barber exam or use another testing company, and most also require a practical exam.",
    rows: [
      { label: "Questions", value: "60 (50 scored)" },
      { label: "Time", value: "90 minutes" },
      { label: "Passing score", value: "Scaled, set by each state (75 in most NIC states)" },
      { label: "Largest domain", value: "Hair Care Services, 40%" },
      { label: "Also required", value: "Practical exam in most states" },
      { label: "Run by", value: "NIC, through each state board" },
    ],
    basedOn: "the NIC National Barber Theory Examination candidate bulletin, effective June 1, 2025 (revised September 1, 2025), checked October 2026",
    source: { name: "NIC Barber Theory CIB", url: "https://prov-testing.github.io/nic_cib/barber_national_theory_english.html" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx

Add `"barber"` to `TEACHER_LED` (taught in barber schools).

## components/exam/ExamClassFaq.tsx

In `TEACHES`: `barber: "at a barber school",`. The landing already renders
`<ExamClassFaq examId="barber" />` and `classFaqJsonLd("barber")`.

## lib/tigerAssets.ts

Nothing; falls back to the DMV tiger.

## Landing breadcrumbs

`ExamLandingBreadcrumbs` does not exist in this tree (the cosmetology and uklitu landings do not
render one). If the integrator adds it, place `<ExamLandingBreadcrumbs examId="barber" />` right after
the JSON-LD script in `app/barber-practice-test/page.tsx`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects, `scissors` exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (test-linked sets of 50, as cosmetology).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing barber:barber:11101`

## CLAUDE.md (under Additional Exams, after Cosmetology if listed)

```md
- **Barber** (state board written theory exam, `/barber/*`, landing `/barber-practice-test`): `data/barber-questions.json` (200 original questions on the NIC National Barber Theory outline, bulletin effective June 1, 2025: infection 32, anatomy/disorders 28, chemistry 12, implements 20, consultation/shampoo 20, haircutting/head shaving 28, styling 12, chemical services 20, shaving/facial hair design 16, facials/electrotherapy 12), test IDs 11101-11104, sets 11101-11104 (one per test), state `BARBER`, 75% pass. 8/7/3/5/5/7/3/5/4/3 per test (NIC: Scientific Concepts 35%, Implements 10%, Hair Care 40%, Facial Hair and Skin 15%). The real NIC exam is 60 items (50 scored) in 90 minutes; pass marks, laws and rules, and non-NIC states vary. Built by `tools/next30/barber/build.py`; sources in `tools/next30/barber/sources.md`.
```
