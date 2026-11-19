# Wiring: Red Seal Hairstylist (`carshair`, v1)

Files already written by the builder (exam-only):
- `data/red-seal-hairstylist-questions.json` (built by `python3 -I tools/build-run-2026-11-18/carshair/build.py`)
- `lib/banks/carshair.ts`
- `app/red-seal-hairstylist/` (layout, redirect, dashboard, drill, stats; copied from `app/red-seal-cook/`,
  drill and stats import the bank; no test or practice folders)
- `app/red-seal-hairstylist-practice-test/page.tsx` (copied from `app/red-seal-cook-practice-test/`)
- `tools/build-run-2026-11-18/carshair/` (sources.md, q_*.py, build.py, this file)

Validator (PASS, key-longest 21%, key>1.2x 16%, letters 50/50/50/50):
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/red-seal-hairstylist-questions.json --pool rshairSafety=12 --pool rshairClient=12 --pool rshairScalp=20 --pool rshairCut=32 --pool rshairFacial=8 --pool rshairStyle=28 --pool rshairWave=16 --pool rshairRelax=12 --pool rshairColour=16 --pool rshairLighten=12 --pool rshairCorrect=12 --pool rshairSpecial=8 --pool rshairSalon=12`

Format: 4 tests x 50, five topic sets (44/40/56/40/20), 9 dashboard steps; pools exactly 4x per test.

**Ontario note.** Skilled Trades Ontario says Ontario does not offer the Red Seal endorsement for
Hairstylist (trade 332A): Ontario candidates write a provincial Certificate of Qualification exam.
So the name and copy do NOT say "332A in Ontario" like the cook and welder banks; 332A is only a
search alias and an FAQ answer.

## lib/exams.ts

`ExamId` union: add `| "carshair"`. Icon `"scissors"` already exists (no new icon).

Block (before `const htl`):

```ts
const carshair: ExamConfig = {
  id: "carshair",
  stateCode: "CAHAIR",
  idBase: 35100,
  slug: "/red-seal-hairstylist",
  landingPath: "/red-seal-hairstylist-practice-test",
  name: "Red Seal Hairstylist Practice Test",
  shortName: "Red Seal Hairstylist",
  examLabel: "Red Seal Hairstylist exam",
  fullName: "Red Seal Hairstylist interprovincial exam",
  questionIdPrefix: "CAHAIR-",
  icon: "scissors",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Red Seal Hairstylist exam breakdown (red-seal.ca exam information and weightings, Red Seal
  // Occupational Standard for Hairstylist 2019; checked 2026-11-18): 120 four-option questions,
  // 4 hours, 70%. MWA A common occupational skills 14 (A-1 4, A-2 4, A-3 3, A-4 3), B hair and
  // scalp care 11, C cuts hair 24 (C-7 19, C-8 5), D styles hair 16, E chemical texture services
  // 17 (E-11 10, E-12 7), F alters hair colour 25 (F-13 9, F-14 7, F-15 9), G specialized services
  // 6, H salon operations 7. Scaled to 50 by largest remainder: A 6, B 5, C 10, D 7, E 7, F 10,
  // G 2, H 3, split inside each MWA by task counts.
  blueprint: {
    rshairSafety: 3,
    rshairClient: 3,
    rshairScalp: 5,
    rshairCut: 8,
    rshairFacial: 2,
    rshairStyle: 7,
    rshairWave: 4,
    rshairRelax: 3,
    rshairColour: 4,
    rshairLighten: 3,
    rshairCorrect: 3,
    rshairSpecial: 2,
    rshairSalon: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 35101, name: "Safety, Clients & Hair Care", categories: ["rshairSafety", "rshairClient", "rshairScalp"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 2, id: 35102, name: "Cutting & Facial Hair", categories: ["rshairCut", "rshairFacial"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 35103, name: "Styling, Perms & Relaxers", categories: ["rshairStyle", "rshairWave", "rshairRelax"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 4, id: 35104, name: "Colour, Lightening & Correction", categories: ["rshairColour", "rshairLighten", "rshairCorrect"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 35105, name: "Wigs, Face Services & Salon", categories: ["rshairSpecial", "rshairSalon"], size: 20, weightLabel: "5 of 50 test questions" },
  ],
  categoryLabels: {
    rshairSafety: "Safety, Tools & Equipment",
    rshairClient: "Client Prep & Communication",
    rshairScalp: "Hair & Scalp Care",
    rshairCut: "Haircutting",
    rshairFacial: "Facial & Nape Hair",
    rshairStyle: "Styling & Finishing",
    rshairWave: "Chemical Waving",
    rshairRelax: "Chemical Relaxing",
    rshairColour: "Hair Colouring",
    rshairLighten: "Lightening & Toning",
    rshairCorrect: "Colour Correction",
    rshairSpecial: "Wigs, Extensions & Face Services",
    rshairSalon: "Salon Operations",
  },
  copy: {
    guestPrompt: "to save your Red Seal Hairstylist progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets that follow the 8 Major Work Activities of the Red Seal Occupational Standard for Hairstylist, from safety and consultation to colour correction and salon operations. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the Red Seal exam's proportions, 70% to pass",
    heroSubs: [
      "Five training sets, four practice tests. Start with Safety, Clients & Hair Care.",
      "Master each topic, then test yourself.",
      "Keep going. Every topic you master shows up on the tests.",
      "Review your mistakes, then retake any test you haven't passed.",
      "All done. Book your Red Seal exam.",
    ],
    sourceLine: "Based on the Red Seal exam breakdown for Hairstylist, Health Canada and CCOHS. Original questions; always follow the manufacturer's directions and your province's salon rules.",
    analyticsKey: "carshair",
  },
};
```

`EXAMS` array: append `carshair` before `htl` (after `carscook` and the other Canada trade exams).

## lib/banks/all.ts

```ts
import "./carshair";
```

## types/index.ts

`QuestionType`: add `| "CAHAIR"`.

`QuestionCategory` union:

```ts
  // Red Seal Hairstylist (Canada)
  | "rshairSafety"
  | "rshairClient"
  | "rshairScalp"
  | "rshairCut"
  | "rshairFacial"
  | "rshairStyle"
  | "rshairWave"
  | "rshairRelax"
  | "rshairColour"
  | "rshairLighten"
  | "rshairCorrect"
  | "rshairSpecial"
  | "rshairSalon"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (category label map, English in all five)

```ts
    rshairSafety: "Safety, Tools & Equipment",
    rshairClient: "Client Prep & Communication",
    rshairScalp: "Hair & Scalp Care",
    rshairCut: "Haircutting",
    rshairFacial: "Facial & Nape Hair",
    rshairStyle: "Styling & Finishing",
    rshairWave: "Chemical Waving",
    rshairRelax: "Chemical Relaxing",
    rshairColour: "Hair Colouring",
    rshairLighten: "Lightening & Toning",
    rshairCorrect: "Colour Correction",
    rshairSpecial: "Wigs, Extensions & Face Services",
    rshairSalon: "Salon Operations",
```

## app/globals.css (light block only; run gen_dark_brand_css.py once at integration)

Hue 340, deep raspberry. Checked against every theme in `app/globals.css` and the other builders'
WIRING.md hues on 2026-11-18: no theme within 8 degrees is within 15 saturation and 8 lightness
(nearest: the in-flight 331 85% 36%, 9 degrees away; carscook 350 100% 32%). White on `--brand`
is about 6.3:1.

```css
  /* Red Seal Hairstylist theme (Canada) */
  [data-theme="carshair"] {
    --brand: 340 85% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 340 80% 96%;
    --brand-hover: 340 85% 34%;
    --brand-dark: 340 85% 30%;
    --brand-darker: 340 80% 20%;
    --brand-muted: 340 45% 72%;
    --brand-border: 340 45% 78%;
    --brand-border-light: 340 40% 89%;
    --brand-gradient-to: 355 80% 96%;
  }
```

## lib/testCatalog.ts

```ts
// EXAM_BLURBS
  carshair: "Free practice for the Red Seal Hairstylist exam: safety and consultation, hair and scalp care, cutting and facial hair, styling, perms and relaxers, colour, lightening and colour correction, wigs and salon operations, weighted like the real exam with its 70% pass mark.",
// EXAM_ORG
  carshair: "Red Seal interprovincial exam · Occupational Standard for Hairstylist",
// SEARCH_ALIASES
  carshair: "red seal hairstylist hairdresser hair stylist hairstyling cosmetologist journeyperson interprovincial certificate of qualification 332a coiffure coiffeur coiffeuse apprentice salon canada",
```

Hub group: "Canada trades and workplace certificates" (with caelec, caplumb, cacarp, caweld, caauto,
carscook...), placed after `carscook`. The group is large, so no `RELATED_OVERRIDES` needed. If
the integrator wants salon cross-links instead: `carshair: ["cosmetology", "barber", "caweld"]`.

## lib/region.ts

`TEST_REGIONS`: `carshair: "CA",` and add `"carshair"` to `NON_DRIVING_TESTS` (and to any Canada
province lists that already carry `caweld` / `carscook`).

## components/TeachNudge.tsx

Add `"carshair"` to `TEACHER_LED` (after `"carscook"`).

## components/exam/ExamClassFaq.tsx

```ts
  carshair: "a hairstyling apprenticeship program",
```

(The landing already renders `<ExamClassFaq examId="carshair" />` and `classFaqJsonLd("carshair")`.)

## lib/examFacts.ts

```ts
  carshair: {
    answer:
      "The Red Seal Hairstylist exam is the interprovincial certificate of qualification exam for hairstylists in Canada. It has 120 multiple-choice questions with four options each, a pass mark of 70%, and up to four hours to write it. The questions follow the Red Seal Occupational Standard for Hairstylist across 8 Major Work Activities, led by altering hair colour (25 questions) and cutting hair (24). Ontario (trade 332A) does not currently offer the Red Seal endorsement for this trade and uses its own Certificate of Qualification exam.",
    rows: [
      { label: "Questions", value: "120 multiple choice, 4 options each" },
      { label: "Time", value: "Up to 4 hours" },
      { label: "Pass mark", value: "70%" },
      { label: "Largest areas", value: "Hair colour 25, cutting 24, chemical texture 17, styling 16" },
      { label: "Other areas", value: "Common occupational skills 14, hair and scalp care 11, salon operations 7, specialized services 6" },
      { label: "Standard", value: "Red Seal Occupational Standard for Hairstylist" },
      { label: "Booked through", value: "Your provincial or territorial apprenticeship authority" },
    ],
    basedOn: "the Red Seal Hairstylist exam breakdown and the Red Seal Exam Preparation Guide, checked November 2026",
    source: { name: "Red Seal: Hairstylist exam information", url: "https://red-seal.ca/eng/trades/hairstylists/exam-information.shtml" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` (comment: build run 2026-11-18 incl. Red Seal Hairstylist).

## lib/tigerAssets.ts

No tiger set. Suggested borrow in `BORROWED_SETS`: `carshair: "cosmetology",` (or `"barber"`), whichever has art.

## tools/build_exam_sources.py

Re-run `python3 -I tools/build_exam_sources.py` so `lib/examSources.json` includes
`tools/build-run-2026-11-18/carshair/sources.md`.

## lib/examFreshness.json

No dated change found: red-seal.ca gives no date for a new Hairstylist standard or exam. Nothing to add.

## scripts/build-training-parts.ts

Nothing to edit; re-run `npx tsx scripts/build-training-parts.ts` after wiring (no set over 60, no split).

## CLAUDE.md (Additional Exams list, after Red Seal Cook)

```md
- **Red Seal Hairstylist** (`carshair`, Canada interprovincial exam, `/red-seal-hairstylist/*`, landing `/red-seal-hairstylist-practice-test`): `data/red-seal-hairstylist-questions.json` (200 original questions on the Red Seal Occupational Standard for Hairstylist (2019): safety, tools and equipment 12, client preparation and communication (PIPEDA, draping, mentoring) 12, hair and scalp care 20, haircutting 32, facial and nape hair 8, styling and finishing 28, chemical waving 16, chemical relaxing 12, hair colouring 16, lightening and toning 12, colour correction 12, wigs, extensions and face services 8, salon operations 12), test IDs 35101-35104, sets 35101-35105 (by topic: Safety, Clients & Hair Care 44, Cutting & Facial Hair 40, Styling, Perms & Relaxers 56, Colour, Lightening & Correction 40, Wigs, Face Services & Salon 20), state `CAHAIR`, prefix `CAHAIR-`, 70% pass. 3/3/5/8/2/7/4/3/4/3/3/2/3 per test, the red-seal.ca breakdown (120 questions: A 14, B 11, C 24, D 16, E 17, F 25, G 6, H 7) scaled to 50 by largest remainder and split by task counts. Ontario (332A) does not offer the Red Seal endorsement for this trade (Skilled Trades Ontario), so the copy never calls it 332A's exam. Safety from Health Canada (hair dye skin test before each use) and CCOHS; provincial salon rules not asked. Built by `tools/build-run-2026-11-18/carshair/build.py`; sources in `tools/build-run-2026-11-18/carshair/sources.md`. Region CA, hub group "Canada trades and workplace certificates", `[data-theme="carshair"]` deep raspberry (340 85% 40%), borrows the cosmetology tiger, teacher-led (hairstyling apprenticeship programs).
```

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing carshair:red-seal-hairstylist:35101`
(writes `carshair-desktop.png`, `carshair-mobile.png` and dark twins used by the landing hero).
