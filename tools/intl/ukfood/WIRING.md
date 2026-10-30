# Wiring for `ukfood` (Level 2 Food Safety and Hygiene for Catering, UK, v1)

Files already written by the builder: `data/uk-food-hygiene-questions.json` (200, PASS),
`lib/banks/ukfood.ts`, `app/uk-food-hygiene/*` (8 wrappers), `app/level-2-food-hygiene-practice-test/page.tsx`,
`tools/intl/ukfood/*` (spec, sources, `q_*.py`, `build.py`). Everything below goes in shared files.

## lib/exams.ts

Add `"ukfood"` to the `ExamId` union. Icon `chef` already exists in the icon union.

Block (with the other UK exams, before `const htl`):

```ts
const ukfood: ExamConfig = {
  id: "ukfood",
  stateCode: "UKFOOD",
  idBase: 8300,
  slug: "/uk-food-hygiene",
  landingPath: "/level-2-food-hygiene-practice-test",
  name: "Level 2 Food Hygiene Practice Test",
  shortName: "Food Hygiene",
  examLabel: "Level 2 food hygiene",
  fullName: "Level 2 Award in Food Safety and Hygiene for Catering (UK)",
  questionIdPrefix: "UKFOOD-",
  icon: "chef",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Level 2 Award in Food Safety (and Hygiene) for Catering, RQF (checked October 2026): one unit,
  // "Food Safety in Catering", with four outcomes: personal responsibility for food safety, keeping
  // yourself clean and hygienic, keeping the work area clean and hygienic, keeping food safe.
  // Awarding bodies set a short MCQ (Open Awards 30 questions, 20 to pass; Highfield 20 in 45 min,
  // 12 or 13 to pass) and publish no per-topic weights, so counts are ours. Figures follow FSA
  // guidance and the England/Wales/NI hygiene regulations (8°C, 63°C, 75°C), with Scotland's
  // differences (82°C reheat, FHIS, CookSafe) stated as such. 70% is a readiness line a little above
  // the real pass marks. All items original; no provider named.
  blueprint: {
    ukfoodLaw: 7,
    ukfoodHazards: 9,
    ukfoodHygiene: 8,
    ukfoodTemp: 10,
    ukfoodStorage: 4,
    ukfoodClean: 8,
    ukfoodAllergen: 4,
  },
  trainingSets: testSets(8300, 4),
  categoryLabels: {
    ukfoodLaw: "Law, Responsibilities & HACCP",
    ukfoodHazards: "Hazards & Food Poisoning",
    ukfoodHygiene: "Personal Hygiene",
    ukfoodTemp: "Temperature Control",
    ukfoodStorage: "Deliveries, Storage & Stock",
    ukfoodClean: "Cleaning, Premises & Pests",
    ukfoodAllergen: "Allergens",
  },
  copy: {
    guestPrompt: "to save your food hygiene progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all seven topics. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 70% to pass",
    heroSubs: [
      "Seven topics, four mock tests. Temperature control is the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your Level 2 exam.",
    ],
    sourceLine: "Based on the Level 2 Food Safety in Catering unit, FSA guidance and UK food hygiene law. Original questions; pass marks vary by awarding body.",
    analyticsKey: "ukfood",
  },
};
```

Append `ukfood` to the `EXAMS` array with the other UK exams (before `caon`).

## lib/banks/all.ts

```ts
import "./ukfood";
```
(next to `import "./ukcar";`). `lib/banks/ukfood.ts` is already written.

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/ukfood.ts`, like `ukcar`.

## types/index.ts

- `QuestionType`: add `| "UKFOOD"`.
- `QuestionCategory`, under a `// Level 2 food hygiene (UK)` comment:

```ts
  | "ukfoodLaw"
  | "ukfoodHazards"
  | "ukfoodHygiene"
  | "ukfoodTemp"
  | "ukfoodStorage"
  | "ukfoodClean"
  | "ukfoodAllergen"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ukfoodLaw: "Law, Responsibilities & HACCP",
    ukfoodHazards: "Hazards & Food Poisoning",
    ukfoodHygiene: "Personal Hygiene",
    ukfoodTemp: "Temperature Control",
    ukfoodStorage: "Deliveries, Storage & Stock",
    ukfoodClean: "Cleaning, Premises & Pests",
    ukfoodAllergen: "Allergens",
```

## app/globals.css

Light block only (hue 280 violet, unused; 52, 110 and 315 are taken by other wave-2 exams); then
run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Level 2 food hygiene theme (UK) */
  [data-theme="ukfood"] {
    --brand: 280 50% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 280 60% 96%;
    --brand-hover: 280 50% 36%;
    --brand-dark: 280 50% 30%;
    --brand-darker: 280 45% 20%;
    --brand-muted: 280 32% 72%;
    --brand-border: 280 32% 80%;
    --brand-border-light: 280 30% 89%;
    --brand-gradient-to: 300 55% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ukfood: "Mock tests for the UK Level 2 Food Safety and Hygiene for Catering course: temperatures, the 14 allergens and Natasha's Law, hand washing, cleaning, pests and HACCP.",`
- `EXAM_ORG`: `ukfood: "Level 2 Food Safety in Catering · RQF awarding bodies",`
- Hub group: the new "UK workplace and trade certificates" group with `cscs`, `ukfood`, `ukaplh`, `ukfaw`, `ukcare`.
- `SEARCH_ALIASES`:
  `ukfood: "level 2 food hygiene certificate food safety and hygiene for catering level 2 award food handler uk food hygiene course food safety certificate kitchen chef catering fsa haccp allergens natashas law",`
- `RELATED_OVERRIDES` only if the UK work group ends up with fewer than three others: `ukfood: ["ukaplh", "ukfaw", "foodhandler"]`.

## lib/region.ts

`ukfood: "UK",` in `TEST_REGIONS`, and add `"ukfood"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  ukfood: {
    answer:
      "The Level 2 Award in Food Safety (or Food Safety and Hygiene) for Catering is a short regulated qualification for anyone who prepares or serves food in the UK, usually a one-day course ending in a multiple-choice exam of 20 to 30 questions. Pass marks are set by each awarding body, usually 60 to 70 percent. The law does not require the certificate itself, but food handlers must be supervised and trained in food hygiene to suit their work, and most employers use the Level 2 to show it.",
    rows: [
      { label: "Exam", value: "Multiple choice, usually 20 to 30 questions" },
      { label: "Time", value: "Up to about 1 hour" },
      { label: "Pass mark", value: "Set by awarding body, about 60 to 70%" },
      { label: "Course length", value: "About 6 to 9 guided hours" },
      { label: "Legally required?", value: "Training yes; a certificate no" },
      { label: "Key temperatures", value: "8°C chill, 63°C hot hold, 75°C cook" },
      { label: "Allergens to know", value: "14, plus Natasha's Law labels" },
      { label: "Regulated by", value: "Ofqual, Qualifications Wales and CCEA" },
    ],
    basedOn: "the Level 2 Food Safety in Catering unit and Food Standards Agency guidance, checked October 2026",
    source: { name: "Food Standards Agency: Safer food, better business", url: "https://www.food.gov.uk/business-guidance/safer-food-better-business" },
  },
```
(checked 2026-10-30. "6 to 9 guided hours": Open Awards lists 9 GLH / 10 TQT, Highfield 7 hours TQT
including GLH; if the integrator prefers, use "About a day".)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx

Add `"ukfood"` to `TEACHER_LED` (taught by colleges, councils and trainers as a class).

## components/exam/ExamClassFaq.tsx

In `TEACHES` (trade schools / instructor-led section): `ukfood: "Level 2 food hygiene courses",`
(reads "I teach Level 2 food hygiene courses. Can my students use Tigertest?"). The landing already
renders `<ExamClassFaq examId="ukfood" />` and `classFaqJsonLd("ukfood")`.

## lib/tigerAssets.ts (optional)

Falls back to the DMV tiger automatically. If you want a family tiger like `foodhandler`, map
`ukfood` to whatever `foodhandler` uses.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `chef` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (writes `lib/trainingParts.json`).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ukfood:uk-food-hygiene:8301`

## CLAUDE.md (under Additional Exams)

```md
- **Level 2 Food Hygiene** (UK Level 2 Award in Food Safety and Hygiene for Catering, `/uk-food-hygiene/*`, landing `/level-2-food-hygiene-practice-test`): `data/uk-food-hygiene-questions.json` (200 questions: law/responsibilities/HACCP 28, hazards and food poisoning 36, personal hygiene 32, temperature control 40, deliveries/storage/stock 16, cleaning/premises/pests 32, allergens 16), test IDs 8301-8304, sets 8301-8304 (one per test), state `UKFOOD`, 70% readiness line (awarding bodies' pass marks are about 60 to 67%). 7/9/8/10/4/8/4 per test. FSA guidance and England/Wales/NI figures (8°C, 63°C, 75°C), Scotland's 82°C reheat and FHIS stated as Scottish; no provider named. Built by `tools/intl/ukfood/build.py`; sources in `tools/intl/ukfood/sources.md`.
```
