# Wiring for `aufss` (Food Safety Supervisor, Australia, v1)

Files already written by the builder: `data/food-safety-supervisor-questions.json` (200, PASS),
`lib/banks/aufss.ts`, `app/food-safety-supervisor/*` (8 wrappers), `app/food-safety-supervisor-practice-test/page.tsx`,
`tools/intl/aufss/*` (spec, sources, `q_*.py`, `build.py`, `report.py`). Everything below goes in shared files.

## lib/exams.ts

Add `"aufss"` to the `ExamId` union. Icon `chef` already exists in the icon union.

Block (with the other wave-2 exams, before `const htl`):

```ts
const aufss: ExamConfig = {
  id: "aufss",
  stateCode: "AUFSS",
  idBase: 9700,
  slug: "/food-safety-supervisor",
  landingPath: "/food-safety-supervisor-practice-test",
  name: "Food Safety Supervisor Practice Test",
  shortName: "Food Safety Supervisor",
  examLabel: "food safety supervisor",
  fullName: "Food Safety Supervisor course, SITXFSA005 and SITXFSA006 (Australia)",
  questionIdPrefix: "AUFSS-",
  icon: "chef",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Australian food safety supervisor (checked October 2026): FSANZ Standard 3.2.2A (supervisor, food handler
  // training, records; in force December 2023) on top of Standards 3.2.2 and 3.2.3, and the hospitality units
  // SITXFSA005 Use hygienic practices for food safety and SITXFSA006 Participate in safe food handling practices
  // (Release 1). NSW key focus areas (allergens, eggs, cleaning and sanitising, Food Act offences) included and
  // labelled as NSW. Assessment is competency based with no pass mark and no published weights, so counts are
  // ours and 80% is a readiness line. State rules (notification, renewal, rating schemes) are "varies by state".
  blueprint: {
    aufssLaw: 7,
    aufssHazards: 8,
    aufssHygiene: 8,
    aufssTemp: 9,
    aufssHandling: 6,
    aufssClean: 6,
    aufssAllergen: 6,
  },
  trainingSets: testSets(9700, 4),
  categoryLabels: {
    aufssLaw: "Food Safety Law & Supervision",
    aufssHazards: "Hazards & Foodborne Illness",
    aufssHygiene: "Personal Hygiene & Health",
    aufssTemp: "Temperature Control",
    aufssHandling: "Receiving, Storage & Display",
    aufssClean: "Cleaning, Sanitising & Pests",
    aufssAllergen: "Allergens & Eggs",
  },
  copy: {
    guestPrompt: "to save your food safety supervisor progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all seven topics. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 80% readiness line",
    heroSubs: [
      "Seven topics, four mock tests. Temperature control is the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your supervisor assessment.",
    ],
    sourceLine: "Based on FSANZ Standards 3.2.2 and 3.2.2A and units SITXFSA005 and SITXFSA006. Original questions; the real course is competency based, with no pass mark.",
    analyticsKey: "aufss",
  },
};
```

Append `aufss` to the `EXAMS` array with the other AU exams.

## lib/banks/all.ts

```ts
import "./aufss";
```
`lib/banks/aufss.ts` is already written.

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/aufss.ts`.

## types/index.ts

- `QuestionType`: add `| "AUFSS"`.
- `QuestionCategory`, under a `// Food safety supervisor (Australia)` comment:

```ts
  | "aufssLaw"
  | "aufssHazards"
  | "aufssHygiene"
  | "aufssTemp"
  | "aufssHandling"
  | "aufssClean"
  | "aufssAllergen"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    aufssLaw: "Food Safety Law & Supervision",
    aufssHazards: "Hazards & Foodborne Illness",
    aufssHygiene: "Personal Hygiene & Health",
    aufssTemp: "Temperature Control",
    aufssHandling: "Receiving, Storage & Display",
    aufssClean: "Cleaning, Sanitising & Pests",
    aufssAllergen: "Allergens & Eggs",
```

## app/globals.css

Light block only (hue 76, olive; not used by any existing theme or wave-2 WIRING I could see); then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Food safety supervisor theme (Australia) */
  [data-theme="aufss"] {
    --brand: 76 55% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 76 55% 95%;
    --brand-hover: 76 55% 27%;
    --brand-dark: 76 55% 24%;
    --brand-darker: 76 50% 16%;
    --brand-muted: 76 30% 68%;
    --brand-border: 76 32% 78%;
    --brand-border-light: 76 30% 88%;
    --brand-gradient-to: 96 50% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `aufss: "Mock tests for the Australian food safety supervisor course: Standard 3.2.2A, the 5°C and 60°C rules, cooling and the 2-hour/4-hour rule, hygiene, cleaning, allergens and safe egg handling.",`
- `EXAM_ORG`: `aufss: "SITXFSA005 + SITXFSA006 · FSANZ Standard 3.2.2A",`
- Hub group: the Australia work certificates group with `aursa`, `aurcg`, `aufss`, `aufirstaid`, `auforklift`, `auwah`.
- `SEARCH_ALIASES`:
  `aufss: "food safety supervisor fss certificate course australia nsw sitxfsa005 sitxfsa006 standard 3.2.2a food handler training food safety supervision skill set fsanz 2 hour 4 hour rule cafe restaurant kitchen",`
- `RELATED_OVERRIDES` only if its group has fewer than three others: `aufss: ["aursa", "aurcg", "foodmgr"]`.

## lib/region.ts

`aufss: "AU",` in `TEST_REGIONS`, and add `"aufss"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  aufss: {
    answer:
      "A food safety supervisor (FSS) is the certified person that Australian caterers, food service and related retail businesses must appoint under Standard 3.2.2A of the Food Standards Code, which has applied since December 2023. The certificate comes from a registered training organisation, usually for units SITXFSA005 and SITXFSA006 in hospitality, and must have been obtained within the past five years. Assessment is competency based, with knowledge questions and practical tasks and no fixed pass mark. NSW adds its own key focus areas.",
    rows: [
      { label: "Who needs one", value: "Category one and two food businesses" },
      { label: "Units (hospitality)", value: "SITXFSA005 and SITXFSA006" },
      { label: "Assessment", value: "Competency based, no pass mark" },
      { label: "Certificate valid", value: "Obtained within the past 5 years" },
      { label: "Key temperatures", value: "5°C or below, 60°C or above" },
      { label: "Cooling", value: "60°C to 21°C in 2 h, to 5°C in 4 more" },
      { label: "Records (category one)", value: "Kept at least 3 months" },
      { label: "NSW extras", value: "Allergens, eggs, cleaning, Food Act offences" },
    ],
    basedOn: "FSANZ Standards 3.2.2 and 3.2.2A and the SITXFSA005 and SITXFSA006 units, checked October 2026",
    source: { name: "FSANZ: Food safety supervisor", url: "https://www.foodstandards.gov.au/business/food-safety/food-safety-supervisor" },
  },
```
(checked 2026-10-30)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx

Add `"aufss"` to `TEACHER_LED` (taught by RTOs and TAFEs as a class).

## components/exam/ExamClassFaq.tsx

In `TEACHES` (trade schools / instructor-led section): `aufss: "food safety supervisor courses",`
(reads "I teach food safety supervisor courses. Can my students use Tigertest?"). The landing already
renders `<ExamClassFaq examId="aufss" />` and `classFaqJsonLd("aufss")`.

## lib/tigerAssets.ts (optional)

Falls back to the DMV tiger. Map to whatever `foodmgr` uses if you want a food tiger.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `chef` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing aufss:food-safety-supervisor:9701`

## CLAUDE.md (under Additional Exams)

```md
- **Food Safety Supervisor** (Australia, SITXFSA005 + SITXFSA006 and FSANZ Standard 3.2.2A, `/food-safety-supervisor/*`, landing `/food-safety-supervisor-practice-test`): `data/food-safety-supervisor-questions.json` (200 questions: law and supervision 28, hazards 32, hygiene 32, temperature 36, receiving/storage/display 24, cleaning/pests 24, allergens and eggs 24), test IDs 9701-9704, sets 9701-9704 (one per test), state `AUFSS`, 80% readiness line (competency based, no real pass mark). 7/8/8/9/6/6/6 per test. Standard 3.2.2 figures (5°C, 60°C, 2 h + 4 h cooling, 2-hour/4-hour rule); NSW key focus areas and raw egg guidance labelled as NSW; other state rules "vary". Built by `tools/intl/aufss/build.py`; sources in `tools/intl/aufss/sources.md`.
```
