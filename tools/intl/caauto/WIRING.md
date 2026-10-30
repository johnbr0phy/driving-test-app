# caauto wiring (Red Seal Automotive Service Technician, v1)

Files already written by the builder: `data/red-seal-automotive-questions.json` (built by
`python3 -I tools/intl/caauto/build.py`), `lib/banks/caauto.ts`, `app/red-seal-automotive/*` (8 wrappers),
`app/red-seal-automotive-service-technician-practice-test/page.tsx`, `tools/intl/caauto/*`.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/red-seal-automotive-questions.json --pool caautoOcc=16 --pool caautoEngine=36 --pool caautoNetwork=20 --pool caautoDriveline=28 --pool caautoElectrical=36 --pool caautoChassis=36 --pool caautoBody=16 --pool caautoHev=12` -> PASS.

## lib/exams.ts
`ExamId` union: add `| "caauto"`. Icon: existing `"car"` (no new icon). Add before `const htl`, and append `caauto` to `EXAMS` before `htl`:

```ts
const caauto: ExamConfig = {
  id: "caauto",
  stateCode: "CAAUTO",
  idBase: 8700,
  slug: "/red-seal-automotive",
  landingPath: "/red-seal-automotive-service-technician-practice-test",
  name: "Red Seal Automotive Service Technician Practice Test",
  shortName: "Red Seal Auto",
  examLabel: "Red Seal Automotive Service Technician exam",
  fullName: "Red Seal Automotive Service Technician (310S) interprovincial exam",
  questionIdPrefix: "CAAUTO-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Red Seal Automotive Service Technician exam (310S in Ontario). Breakdown by Major Work Activity on
  // red-seal.ca (exam-information and exam-weightings pages, checked October 2026), which follows the
  // 2023 RSOS (MWA H, hybrid and EV, is new in it): 125 questions, A 9, B 22, C 12, D 17, E 23, F 23,
  // G 10, H 9. Scaled to 50 per test. 4 hours, 70% pass (Red Seal Exam Preparation Guide). All items original.
  blueprint: {
    caautoOcc: 4,
    caautoEngine: 9,
    caautoNetwork: 5,
    caautoDriveline: 7,
    caautoElectrical: 9,
    caautoChassis: 9,
    caautoBody: 4,
    caautoHev: 3,
  },
  trainingSets: testSets(8700, 4),
  categoryLabels: {
    caautoOcc: "Common Occupational Skills",
    caautoEngine: "Engine & Engine Support Systems",
    caautoNetwork: "Module Communication Networks",
    caautoDriveline: "Driveline Systems",
    caautoElectrical: "Electrical & Comfort Control (HVAC)",
    caautoChassis: "Steering, Suspension, Brakes & Tires",
    caautoBody: "Restraints, Body & Accessories",
    caautoHev: "Hybrid & Electric Vehicles",
  },
  copy: {
    guestPrompt: "to save your Red Seal progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all eight Major Work Activities. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the Red Seal exam's proportions, 70% to pass",
    heroSubs: [
      "Eight Major Work Activities, four tests. Electrical, chassis and engine are the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your Red Seal exam.",
    ],
    sourceLine: "Based on the Red Seal exam breakdown for Automotive Service Technician (2023 RSOS). Original questions; the real exam has 125 questions in 4 hours.",
    analyticsKey: "caauto",
  },
};
```
Tests 8701-8704, sets 8701-8704. Run `npx tsx scripts/build-training-parts.ts` after wiring.

## lib/banks/all.ts
```ts
import "./caauto";
```

## lib/examData.ts
Nothing (banks register through `lib/banks/caauto.ts`).

## types/index.ts
`QuestionType`: add `| "CAAUTO"`. `QuestionCategory`, under a comment `// Red Seal Automotive Service Technician (caauto)`:
```ts
  | "caautoOcc"
  | "caautoEngine"
  | "caautoNetwork"
  | "caautoDriveline"
  | "caautoElectrical"
  | "caautoChassis"
  | "caautoBody"
  | "caautoHev"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all)
```ts
    caautoOcc: "Common Occupational Skills",
    caautoEngine: "Engine & Engine Support Systems",
    caautoNetwork: "Module Communication Networks",
    caautoDriveline: "Driveline Systems",
    caautoElectrical: "Electrical & Comfort Control (HVAC)",
    caautoChassis: "Steering, Suspension, Brakes & Tires",
    caautoBody: "Restraints, Body & Accessories",
    caautoHev: "Hybrid & Electric Vehicles",
```

## app/globals.css (light block; generate the dark twin with tools/gen_dark_brand_css.py)
Hue 14 (rust orange-red), not used by any existing theme.
```css
  /* Red Seal Automotive Service Technician theme (Canada) */
  [data-theme="caauto"] {
    --brand: 14 72% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 14 75% 95%;
    --brand-hover: 14 72% 34%;
    --brand-dark: 14 72% 28%;
    --brand-darker: 14 62% 19%;
    --brand-muted: 14 45% 72%;
    --brand-border: 14 45% 78%;
    --brand-border-light: 14 40% 88%;
    --brand-gradient-to: 30 70% 95%;
  }
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  caauto: "Free practice for the Red Seal Automotive Service Technician exam (310S in Ontario): engines, networks, driveline, electrical and HVAC, brakes and steering, restraints and hybrid and EV systems, with the real 70% pass mark.",
// EXAM_ORG
  caauto: "Red Seal Program · interprovincial trade exam",
// SEARCH_ALIASES
  caauto: "red seal auto mechanic automotive technician 310s interprovincial exam journeyperson certificate of qualification ontario alberta bc canada apprentice licensed mechanic car mechanic",
```
Hub group: suggested "Canada school and trade tests" (with caelec, capal, caplumb, cacarp, caweld...). If the group has fewer than three others, add `RELATED_OVERRIDES.caauto` pointing at the other Red Seal trades.

## lib/region.ts
`TEST_REGIONS`: `caauto: "CA",`. `NON_DRIVING_TESTS`: add `"caauto"`.

## components/TeachNudge.tsx
`TEACHER_LED`, trade schools line: add `"caauto"`.

## components/exam/ExamClassFaq.tsx
`TEACHES`, trade schools section:
```ts
  caauto: "an automotive service technician apprenticeship class",
```
(The landing already renders `<ExamClassFaq examId="caauto" />` and `classFaqJsonLd("caauto")`.)

## lib/examFacts.ts
```ts
  caauto: {
    answer:
      "The Red Seal Automotive Service Technician exam is the interprovincial certification exam for auto service technicians in Canada (trade code 310S in Ontario). It has 125 four-option multiple-choice questions, you have up to 4 hours, and you need 70% to pass. Questions follow the 2023 Red Seal Occupational Standard's eight Major Work Activities, with electrical and comfort control, steering, suspension and brakes, and engine systems the largest.",
    rows: [
      { label: "Questions", value: "125 multiple choice, 4 options each" },
      { label: "Time", value: "Up to 4 hours" },
      { label: "Pass mark", value: "70%" },
      { label: "Largest areas", value: "Electrical and HVAC 23, chassis and brakes 23, engine 22" },
      { label: "Hybrid and EV", value: "9 questions (new in the 2023 standard)" },
      { label: "Fees and eligibility", value: "Set by each province or territory" },
      { label: "Given by", value: "Provincial and territorial apprenticeship authorities, for the Red Seal Program" },
    ],
    basedOn: "the Red Seal Automotive Service Technician exam breakdown and weightings (2023 RSOS) and the Red Seal Exam Preparation Guide, checked October 2026",
    source: { name: "Red Seal: Automotive Service Technician exam information", url: "https://red-seal.ca/eng/trades/autoservtech/exam-information.shtml" },
  },
```

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` (comment names the wave, including caauto).

## lib/server/classQuestions.ts
Nothing: it imports `@/lib/banks/all`, which will include `./caauto`.

## lib/sitemaps.ts, next.config.ts, components/TestIcon.tsx, components/CDLHeader.tsx
Nothing exam-specific needed (icon `car` exists; landing reaches the sitemap through the catalog, as for other v1 exams; check while wiring).

## Screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing caauto:red-seal-automotive:8701`

## CLAUDE.md (bullet under Additional Exams)
- **Red Seal Automotive Service Technician** (Canada interprovincial exam, 310S in Ontario, `/red-seal-automotive/*`, landing `/red-seal-automotive-service-technician-practice-test`): `data/red-seal-automotive-questions.json` (200 questions across the 8 Major Work Activities of the 2023 RSOS: occupational skills 16, engine 36, networks 20, driveline 28, electrical/HVAC 36, steering/suspension/brakes 36, restraints/body 16, hybrid/EV 12), test IDs 8701-8704, sets 8701-8704 (one per test), state `CAAUTO`, 70% pass. 4/9/5/7/9/9/4/3 per test, scaled from the red-seal.ca breakdown (125 questions, 4 hours). Provincial rules (fees, hours, refrigerant certification) are "varies". Sources in `tools/intl/caauto/sources.md`.
