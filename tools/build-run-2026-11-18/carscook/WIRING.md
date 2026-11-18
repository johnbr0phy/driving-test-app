# Wiring: Red Seal Cook (`carscook`, v1)

Files already written by the builder (exam-only):
- `data/red-seal-cook-questions.json` (built by `python3 -I tools/build-run-2026-11-18/carscook/build.py`)
- `lib/banks/carscook.ts`
- `app/red-seal-cook/` (layout, redirect, dashboard, drill, stats; copied from `app/red-seal-welder/`,
  drill and stats import the bank; no test or practice folders)
- `app/red-seal-cook-practice-test/page.tsx` (copied from `app/red-seal-welder-practice-test/`)
- `tools/build-run-2026-11-18/carscook/` (sources.md, q_*.py, build.py, this file)

Validator (PASS, key-longest 10%, key>1.2x 15%, letters 50/50/50/50):
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/red-seal-cook-questions.json --pool rscookSafety=20 --pool rscookSkills=16 --pool rscookProduce=16 --pool rscookStocks=16 --pool rscookSauces=16 --pool rscookDairy=12 --pool rscookPasta=12 --pool rscookGrains=16 --pool rscookMeats=20 --pool rscookFish=20 --pool rscookSalads=12 --pool rscookSpecialty=12 --pool rscookBaking=12`

Format: 4 tests x 50, five topic sets (36/48/40/40/36), 9 dashboard steps; pools exactly 4x per test.

## lib/exams.ts

`ExamId` union: add `| "carscook"`. Icon `"chef"` already exists (no new icon).

Block (before `const htl`):

```ts
const carscook: ExamConfig = {
  id: "carscook",
  stateCode: "CACOOK",
  idBase: 34900,
  slug: "/red-seal-cook",
  landingPath: "/red-seal-cook-practice-test",
  name: "Red Seal Cook Practice Test",
  shortName: "Red Seal Cook",
  examLabel: "Red Seal Cook exam",
  fullName: "Red Seal Cook interprovincial exam (415A in Ontario)",
  questionIdPrefix: "CACOOK-",
  icon: "chef",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Red Seal Cook exam breakdown (red-seal.ca exam information and weightings, Red Seal
  // Occupational Standard for Cook 2020; checked 2026-11-18): 150 four-option questions, 4 hours,
  // 70%. MWA A hygiene, sanitation and safety 13, B common occupational skills 11, C produce 12,
  // D stocks, broths and soups 12, E sauces 13, F cheese, dairy and eggs 10, G pastas, noodles and
  // dumplings 10, H grains, pulses, seeds, nuts and alternative proteins 11, I meats, game,
  // poultry and variety meats 16, J fish and seafood 15, K salads and sandwiches 9, L specialty
  // preparation 8, M baked goods and desserts 10. Scaled to 50 by largest remainder. Food safety
  // figures from Health Canada; provincial food premises rules are not asked.
  blueprint: {
    rscookSafety: 5,
    rscookSkills: 4,
    rscookProduce: 4,
    rscookStocks: 4,
    rscookSauces: 4,
    rscookDairy: 3,
    rscookPasta: 3,
    rscookGrains: 4,
    rscookMeats: 5,
    rscookFish: 5,
    rscookSalads: 3,
    rscookSpecialty: 3,
    rscookBaking: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 34901, name: "Hygiene, Safety & Kitchen Skills", categories: ["rscookSafety", "rscookSkills"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 2, id: 34902, name: "Produce, Stocks & Sauces", categories: ["rscookProduce", "rscookStocks", "rscookSauces"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 34903, name: "Dairy, Eggs, Pasta & Grains", categories: ["rscookDairy", "rscookPasta", "rscookGrains"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 34904, name: "Meats, Poultry, Fish & Seafood", categories: ["rscookMeats", "rscookFish"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 34905, name: "Salads, Charcuterie & Baking", categories: ["rscookSalads", "rscookSpecialty", "rscookBaking"], size: 36, weightLabel: "9 of 50 test questions" },
  ],
  categoryLabels: {
    rscookSafety: "Hygiene, Sanitation & Safety",
    rscookSkills: "Common Occupational Skills",
    rscookProduce: "Produce",
    rscookStocks: "Stocks, Broths & Soups",
    rscookSauces: "Sauces",
    rscookDairy: "Cheese, Dairy & Eggs",
    rscookPasta: "Pastas, Noodles & Dumplings",
    rscookGrains: "Grains, Pulses, Nuts & Alt. Proteins",
    rscookMeats: "Meats, Poultry & Variety Meats",
    rscookFish: "Fish & Seafood",
    rscookSalads: "Salads & Sandwiches",
    rscookSpecialty: "Specialty Preparation",
    rscookBaking: "Baked Goods & Desserts",
  },
  copy: {
    guestPrompt: "to save your Red Seal Cook progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets that follow the 13 Major Work Activities of the Red Seal Occupational Standard for Cook, from hygiene and safety to baking. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the Red Seal exam's proportions, 70% to pass",
    heroSubs: [
      "Five training sets, four practice tests. Start with Hygiene, Safety & Kitchen Skills.",
      "Master each topic, then test yourself.",
      "Keep going. Every topic you master shows up on the tests.",
      "Review your mistakes, then retake any test you haven't passed.",
      "All done. Book your Red Seal exam.",
    ],
    sourceLine: "Based on the Red Seal exam breakdown for Cook and Health Canada food safety guidance. Original questions; always follow your province's food premises rules.",
    analyticsKey: "carscook",
  },
};
```

`EXAMS` array: append `carscook` before `htl` (after the other Canada trade exams).

## lib/banks/all.ts

```ts
import "./carscook";
```

## types/index.ts

`QuestionType`: add `| "CACOOK"`.

`QuestionCategory` union:

```ts
  // Red Seal Cook (Canada)
  | "rscookSafety"
  | "rscookSkills"
  | "rscookProduce"
  | "rscookStocks"
  | "rscookSauces"
  | "rscookDairy"
  | "rscookPasta"
  | "rscookGrains"
  | "rscookMeats"
  | "rscookFish"
  | "rscookSalads"
  | "rscookSpecialty"
  | "rscookBaking"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (category label map, English in all five)

```ts
    rscookSafety: "Hygiene, Sanitation & Safety",
    rscookSkills: "Common Occupational Skills",
    rscookProduce: "Produce",
    rscookStocks: "Stocks, Broths & Soups",
    rscookSauces: "Sauces",
    rscookDairy: "Cheese, Dairy & Eggs",
    rscookPasta: "Pastas, Noodles & Dumplings",
    rscookGrains: "Grains, Pulses, Nuts & Alt. Proteins",
    rscookMeats: "Meats, Poultry & Variety Meats",
    rscookFish: "Fish & Seafood",
    rscookSalads: "Salads & Sandwiches",
    rscookSpecialty: "Specialty Preparation",
    rscookBaking: "Baked Goods & Desserts",
```

## app/globals.css (light block only; run gen_dark_brand_css.py once at integration)

Hue 350, deep beet red. Checked against every theme in `app/globals.css` on 2026-11-18: no theme
within 8 degrees is within 15 saturation and 8 lightness (nearest: aursa 352 40% 30%, rrbalp 355
55% 32%, alcohol 345 55% 36%). White on `--brand` is about 8.1:1.

```css
  /* Red Seal Cook theme (Canada) */
  [data-theme="carscook"] {
    --brand: 350 100% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 350 80% 96%;
    --brand-hover: 350 100% 27%;
    --brand-dark: 350 100% 24%;
    --brand-darker: 350 90% 16%;
    --brand-muted: 350 45% 72%;
    --brand-border: 350 45% 78%;
    --brand-border-light: 350 40% 89%;
    --brand-gradient-to: 10 80% 96%;
  }
```

## lib/testCatalog.ts

```ts
// EXAM_BLURBS
  carscook: "Free practice for the Red Seal Cook exam (415A): food safety, kitchen skills, produce, stocks and sauces, eggs, pasta and grains, meats, fish and seafood, garde manger and baking, weighted like the real exam with its 70% pass mark.",
// EXAM_ORG
  carscook: "Red Seal interprovincial exam · Occupational Standard for Cook",
// SEARCH_ALIASES
  carscook: "red seal cook 415a cook exam chef culinary journeyperson interprovincial certificate of qualification professional cook 3 pc3 cuisinier apprentice kitchen canada",
```

Hub group: "Canada trades and workplace certificates" (with caelec, caplumb, cacarp, caweld, caauto...),
placed after `caweld`. The group is large, so no `RELATED_OVERRIDES` needed. If the integrator
wants food-safety cross-links instead: `carscook: ["caweld", "foodmgr", "aufss"]`.

## lib/region.ts

`TEST_REGIONS`: `carscook: "CA",` and add `"carscook"` to `NON_DRIVING_TESTS` (and to each of the
Canada province lists that already carry `caweld`, lines near 198 to 201, if those are per-province
catalog lists).

## components/TeachNudge.tsx

Add `"carscook"` to `TEACHER_LED` (after `"caweld"`).

## components/exam/ExamClassFaq.tsx

```ts
  carscook: "a culinary apprenticeship program",
```

(The landing already renders `<ExamClassFaq examId="carscook" />` and `classFaqJsonLd("carscook")`.)

## lib/examFacts.ts

```ts
  carscook: {
    answer:
      "The Red Seal Cook exam is the interprovincial certificate of qualification exam for cooks in Canada (trade code 415A in Ontario). It has 150 multiple-choice questions with four options each, a pass mark of 70%, and up to four hours to write it. The questions follow the Red Seal Occupational Standard for Cook across 13 Major Work Activities, led by meats, game, poultry and variety meats (16 questions) and fish and seafood (15).",
    rows: [
      { label: "Questions", value: "150 multiple choice, 4 options each" },
      { label: "Time", value: "Up to 4 hours" },
      { label: "Pass mark", value: "70%" },
      { label: "Largest areas", value: "Meats and poultry 16, fish and seafood 15, hygiene and safety 13, sauces 13" },
      { label: "Other areas", value: "Produce 12, stocks and soups 12, kitchen skills 11, grains and nuts 11, dairy and eggs 10, pasta 10, baking 10, salads 9, specialty 8" },
      { label: "Standard", value: "Red Seal Occupational Standard for Cook" },
      { label: "Booked through", value: "Your provincial or territorial apprenticeship authority" },
    ],
    basedOn: "the Red Seal Cook exam breakdown and the Red Seal Exam Preparation Guide, checked November 2026",
    source: { name: "Red Seal: Cook exam information", url: "https://red-seal.ca/eng/trades/cooks/exam-information.shtml" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` (comment: build run 2026-11-18 incl. Red Seal Cook).

## lib/tigerAssets.ts

No tiger set. Suggested borrow in `BORROWED_SETS`: `carscook: "foodhandler",` (the kitchen tiger).

## tools/build_exam_sources.py

Re-run `python3 -I tools/build_exam_sources.py` so `lib/examSources.json` includes
`tools/build-run-2026-11-18/carscook/sources.md`.

## lib/examFreshness.json

No dated change found. red-seal.ca's Cook page says new exams based on the new standard "are being
implemented" with no date; nothing to add.

## scripts/build-training-parts.ts

Nothing to edit; re-run `npx tsx scripts/build-training-parts.ts` after wiring (no set over 60, no split).

## CLAUDE.md (Additional Exams list, after Red Seal Welder)

```md
- **Red Seal Cook** (`carscook`, Canada interprovincial exam, 415A in Ontario, `/red-seal-cook/*`, landing `/red-seal-cook-practice-test`): `data/red-seal-cook-questions.json` (200 original questions, one category per Major Work Activity of the Red Seal Occupational Standard for Cook (2020): hygiene, sanitation and safety 20, common occupational skills 16 (knives, menus, food cost, yield and recipe conversion, receiving, dietary requirements, priority allergens, communication), produce 16, stocks, broths and soups 16, sauces 16, cheese, dairy and eggs 12, pastas, noodles and dumplings 12, grains, pulses, seeds, nuts and alternative proteins 16, meats, poultry and variety meats 20, fish and seafood 20, salads and sandwiches 12, specialty preparation (garde manger, cures, gels, marinades) 12, baked goods and desserts 12), test IDs 34901-34904, sets 34901-34905 (by topic: Hygiene, Safety & Kitchen Skills 36, Produce, Stocks & Sauces 48, Dairy, Eggs, Pasta & Grains 40, Meats, Poultry, Fish & Seafood 40, Salads, Charcuterie & Baking 36), state `CACOOK`, prefix `CACOOK-`, 70% pass. 5/4/4/4/4/3/3/4/5/5/3/3/3 per test, one third of the red-seal.ca breakdown (150 questions: 13/11/12/12/13/10/10/11/16/15/9/8/10) by largest remainder. Food safety figures from Health Canada (danger zone 4 to 60°C, fridge 4°C, freezer -18°C, safe internal temperatures, leftovers 74°C, two-hour rule, priority allergens); provincial food premises rules (cooling times, hot holding, sanitizer strengths) not asked. Built by `tools/build-run-2026-11-18/carscook/build.py`; sources in `tools/build-run-2026-11-18/carscook/sources.md`. Region CA, hub group "Canada trades and workplace certificates", `[data-theme="carscook"]` deep beet red (350 100% 32%), borrows the food handler tiger, teacher-led (culinary apprenticeship programs).
```

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing carscook:red-seal-cook:34901`
(writes `carscook-desktop.png`, `carscook-mobile.png` and dark twins used by the landing hero).
