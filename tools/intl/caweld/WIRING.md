# Wiring: Red Seal Welder (`caweld`, v1)

Files already written by the builder (exam-only):
- `data/red-seal-welder-questions.json` (built by `python3 -I tools/intl/caweld/build.py`)
- `lib/banks/caweld.ts`
- `app/red-seal-welder/` (8 wrappers, copied from `app/uk-theory/`)
- `app/red-seal-welder-practice-test/page.tsx`
- `tools/intl/caweld/` (spec, sources, q_*.py, build.py)

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/red-seal-welder-questions.json --pool caweldCommon=32 --pool caweldLayout=20 --pool caweldFab=24 --pool caweldCut=36 --pool caweldSmaw=32 --pool caweldWire=28 --pool caweldGtaw=28` prints PASS.

## lib/exams.ts

`ExamId` union: add `| "caweld"`. Icon `"hardhat"` already exists (no new icon).

Block (before `const htl`):

```ts
const caweld: ExamConfig = {
  id: "caweld",
  stateCode: "CAWELD",
  idBase: 9000,
  slug: "/red-seal-welder",
  landingPath: "/red-seal-welder-practice-test",
  name: "Red Seal Welder Practice Test",
  shortName: "Red Seal Welder",
  examLabel: "Red Seal Welder exam",
  fullName: "Red Seal Welder interprovincial exam (456A in Ontario)",
  questionIdPrefix: "CAWELD-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Red Seal Welder exam breakdown for the 2023 Red Seal Occupational Standard (red-seal.ca
  // exam information and weightings, confirmed by the Saskatchewan Feb 2026 exam sheet and the
  // NL "RSOS 2023" study guide; checked October 2026): 125 four-option questions, 4 hours, 70%.
  // MWA A common occupational skills 20, B layout and fabrication 28 (layout 12, fabricates 16),
  // C cutting and gouging 23, D welding processes 54 (SMAW 18, FCAW/MCAW/GMAW 18, GTAW 13,
  // SAW 5). Scaled to 50: A 8, B 11, C 9, D 22. CSA W47.1, W48 and W59 at concept level only.
  blueprint: {
    caweldCommon: 8,
    caweldLayout: 5,
    caweldFab: 6,
    caweldCut: 9,
    caweldSmaw: 8,
    caweldWire: 7,
    caweldGtaw: 7,
  },
  trainingSets: testSets(9000, 4),
  categoryLabels: {
    caweldCommon: "Common Occupational Skills",
    caweldLayout: "Layout & Drawings",
    caweldFab: "Fabrication & Fit-Up",
    caweldCut: "Cutting & Gouging",
    caweldSmaw: "Shielded Metal Arc Welding (SMAW)",
    caweldWire: "GMAW, FCAW & MCAW",
    caweldGtaw: "GTAW & Submerged Arc (SAW)",
  },
  copy: {
    guestPrompt: "to save your Red Seal Welder progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all four Major Work Activities. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the Red Seal exam's proportions, 70% to pass",
    heroSubs: [
      "Four work activities, four tests. Welding processes are 44% of the exam.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your Red Seal exam.",
    ],
    sourceLine: "Based on the Red Seal exam breakdown for the 2023 Welder Occupational Standard. Original questions; always follow your company's welding procedures.",
    analyticsKey: "caweld",
  },
};
```

`EXAMS` array: append `caweld` before `htl` (after the other wave-2 Canada trade exams).

## lib/banks/all.ts

```ts
import "./caweld";
```

## types/index.ts

`QuestionType`: add `| "CAWELD"`.

`QuestionCategory` union:

```ts
  // Red Seal Welder (Canada)
  | "caweldCommon"
  | "caweldLayout"
  | "caweldFab"
  | "caweldCut"
  | "caweldSmaw"
  | "caweldWire"
  | "caweldGtaw"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (category label map, English in all five)

```ts
    caweldCommon: "Common Occupational Skills",
    caweldLayout: "Layout & Drawings",
    caweldFab: "Fabrication & Fit-Up",
    caweldCut: "Cutting & Gouging",
    caweldSmaw: "Shielded Metal Arc Welding (SMAW)",
    caweldWire: "GMAW, FCAW & MCAW",
    caweldGtaw: "GTAW & Submerged Arc (SAW)",
```

## app/globals.css (light block only; run gen_dark_brand_css.py once at integration)

Hue 14 (weld-spark orange-red; unused, 20 and 24 are taken). White on `--brand` is about 5.1:1.

```css
  /* Red Seal Welder theme (Canada) */
  [data-theme="caweld"] {
    --brand: 14 78% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 14 80% 95%;
    --brand-hover: 14 78% 36%;
    --brand-dark: 14 78% 30%;
    --brand-darker: 14 70% 20%;
    --brand-muted: 14 45% 72%;
    --brand-border: 14 45% 78%;
    --brand-border-light: 14 40% 88%;
    --brand-gradient-to: 30 80% 95%;
  }
```

## lib/testCatalog.ts

```ts
// EXAM_BLURBS
  caweld: "Free practice for the Red Seal Welder exam (456A): safety and rigging, layout and weld symbols, fabrication, cutting and gouging, and SMAW, GMAW, FCAW, GTAW and SAW, with the real 70% pass mark.",
// EXAM_ORG
caweld: "Red Seal interprovincial exam · 2023 Welder RSOS",
// SEARCH_ALIASES
  caweld: "red seal welder welding 456a journeyperson interprovincial exam certificate of qualification smaw gmaw fcaw gtaw tig mig stick flux core cwb canada apprentice",
```

Hub group: suggested "Canada school and trade tests" (with caelec, caauto, caplumb, cacarp...).
`RELATED_OVERRIDES` (only if its group has fewer than three others): `caweld: ["caauto", "caplumb", "cacarp"]`.

## lib/region.ts

`TEST_REGIONS`: `caweld: "CA",` and add `"caweld"` to `NON_DRIVING_TESTS`.

## components/TeachNudge.tsx

Add `"caweld"` to `TEACHER_LED` (trade schools line).

## components/exam/ExamClassFaq.tsx

```ts
  caweld: "a welding program",
```

(The landing already renders `<ExamClassFaq examId="caweld" />` and `classFaqJsonLd("caweld")`.)

## lib/examFacts.ts

```ts
  caweld: {
    answer:
      "The Red Seal Welder exam is the interprovincial certificate of qualification exam for welders in Canada (trade code 456A in Ontario). It has 125 multiple-choice questions with four options each, a four-hour time limit and a pass mark of 70%. Since 2026 it follows the 2023 Red Seal Occupational Standard: common occupational skills 20 questions, layout and fabrication 28, cutting and gouging 23, and welding processes 54.",
    rows: [
      { label: "Questions", value: "125 multiple choice, 4 options each" },
      { label: "Time", value: "Up to 4 hours" },
      { label: "Pass mark", value: "70%" },
      { label: "Welding processes", value: "54 questions: SMAW 18, GMAW/FCAW/MCAW 18, GTAW 13, SAW 5" },
      { label: "Other areas", value: "Common skills 20, layout and fabrication 28, cutting and gouging 23" },
      { label: "Standard", value: "2023 Red Seal Occupational Standard for Welder" },
      { label: "Booked through", value: "Your provincial or territorial apprenticeship authority" },
    ],
    basedOn: "the Red Seal Welder exam breakdown and the Red Seal Exam Preparation Guide, checked October 2026",
    source: { name: "Red Seal: Welder exam information", url: "https://red-seal.ca/eng/trades/weld/exam-information.shtml" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` (comment: wave-2 international exams incl. Red Seal Welder).

## lib/tigerAssets.ts (optional)

No tiger set; falls back to the DMV tiger. If the integrator wants a borrowed set, `caweld: "osha"` fits a trade exam.

## scripts/build-training-parts.ts

Nothing to edit; re-run `npx tsx scripts/build-training-parts.ts` after wiring (test sets of 50 should not split).

## CLAUDE.md (Additional Exams list)

```md
- **Red Seal Welder** (interprovincial exam, 456A in Ontario, `/red-seal-welder/*`, landing `/red-seal-welder-practice-test`): `data/red-seal-welder-questions.json` (200 questions: common skills 32, layout 20, fabrication 24, cutting/gouging 36, SMAW 32, GMAW/FCAW/MCAW 28, GTAW/SAW 28), test IDs 9001-9004, sets 9001-9004 (one per test), state `CAWELD`, 70% pass. 8/5/6/9/8/7/7 per test from the red-seal.ca breakdown for the 2023 RSOS (A 20, B 28, C 23, D 54 of 125). CSA W47.1/W48/W59 at concept level; Canadian spelling, metric. Sources in `tools/intl/caweld/sources.md`.
```

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing caweld:red-seal-welder:9001`
(writes `caweld-desktop.png`, `caweld-mobile.png` and dark twins used by the landing hero).
