# Wiring for `aucit` (Australian citizenship test, v1)

Files already written by the builder: `data/aucit-questions.json` (200, PASS), `lib/banks/aucit.ts`,
`app/australian-citizenship/*` (8 wrappers, copied from `app/uk-food-hygiene/`),
`app/australian-citizenship-test/page.tsx`, `tools/global/aucit/*` (spec, sources, `q_*.py`, `build.py`).
Rebuild the bank with `python3 -I tools/global/aucit/build.py`. Everything below goes in shared files.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/aucit-questions.json --pool aucitPeople=48 --pool aucitDemocracy=42 --pool aucitGov=60 --pool aucitValues=50`
-> `letters {'A': 51, 'B': 51, 'C': 49, 'D': 49}  avg option 23 chars  key-longest 16%  key>1.2x 14%  PASS`

## Shape (why 8 x 20)

The engine supports it as is: `examTestQuestions` slices `perTest` items per category per test, so
`testCount: 8, questionsPerTest: 20` with a blueprint summing to 20 works; pools only need to be at
least `8 x perTest` (people 48 >= 40, democracy 42 >= 32, government 60 >= 48, values 50 >= 40; the
spare 40 items are training-only). `testSets()` is NOT used (it hardcodes size 50), so training is
four category sets, one per part of the book, all <= 60 so none is split by `TRAINING_PART_MAX`.
Dashboard: 4 sets + 8 tests = **12 steps** (not interleaved, since sets != tests).

**Values rule not enforced.** The real test also requires all 5 values questions correct; the v1
results page only scores `passPct` (75% = 15/20). The copy says so (testsHeading, sourceLine,
landing FAQ). Optional shared follow-up if wanted: an `ExamConfig.mustAllCorrect?: string` (category
key) checked in `ExamResultsPage`/`useTestResults` pass logic and the dashboard `testComplete`.

## lib/exams.ts

Add `"aucit"` to the `ExamId` union. Icon `flag` already exists (civics uses it).

Block (with the other AU exams):

```ts
const aucit: ExamConfig = {
  id: "aucit",
  stateCode: "AUCIT",
  idBase: 10300,
  slug: "/australian-citizenship",
  landingPath: "/australian-citizenship-test",
  name: "Australian Citizenship Test Practice",
  shortName: "Citizenship",
  examLabel: "Australian citizenship test",
  fullName: "Australian citizenship test (Our Common Bond)",
  questionIdPrefix: "AUCIT-",
  icon: "flag",
  testCount: 8,
  questionsPerTest: 20,
  passPct: 75,
  // Department of Home Affairs, "Australian Citizenship: Our Common Bond", testable section (current
  // edition, checked 2026-10-30: King Charles III, Türkiye, "over 150" MPs). Real test: 20 multiple-choice
  // questions in English, 45 minutes, five of them on Australian values (since 15 Nov 2020); pass = at
  // least 75% overall AND all five values questions correct. Home Affairs does not publish the split
  // of the other 15 across parts 1 to 3, so 5/4/6 is ours, roughly by the length of each part. The
  // values rule is not enforced by the engine; the copy tells people to check it. All items original.
  blueprint: {
    aucitPeople: 5,
    aucitDemocracy: 4,
    aucitGov: 6,
    aucitValues: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 10301, name: "Australia and Its People", categories: ["aucitPeople"], size: 48, weightLabel: "Part 1 · 5 of 20 test questions" },
    { setNumber: 2, id: 10302, name: "Democratic Beliefs, Rights & Liberties", categories: ["aucitDemocracy"], size: 42, weightLabel: "Part 2 · 4 of 20 test questions" },
    { setNumber: 3, id: 10303, name: "Government & the Law", categories: ["aucitGov"], size: 60, weightLabel: "Part 3 · 6 of 20 test questions" },
    { setNumber: 4, id: 10304, name: "Australian Values", categories: ["aucitValues"], size: 50, weightLabel: "Part 4 · 5 of 20, all 5 must be right" },
  ],
  categoryLabels: {
    aucitPeople: "Australia and Its People",
    aucitDemocracy: "Democratic Beliefs, Rights & Liberties",
    aucitGov: "Government & the Law",
    aucitValues: "Australian Values",
  },
  copy: {
    guestPrompt: "to save your citizenship test progress and track every question you miss",
    trainingHeading: "Train each part of Our Common Bond",
    trainingSub: "Four sets, one per part of the book. Australian values has its own set because one values mistake fails the real test. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 20 questions, 15 to pass, all 5 values right",
    heroSubs: [
      "Four parts, eight 20-question mock tests. Start with values.",
      "Master each part, then take a mock test.",
      "Halfway there. Keep every values answer right.",
      "Fix the misses, then retake.",
      "All done. You are ready for your citizenship test.",
    ],
    sourceLine: "Based on Australian Citizenship: Our Common Bond (Department of Home Affairs). Original questions. The real test also needs all five values questions right; check yours after each mock test.",
    analyticsKey: "aucit",
  },
};
```

Append `aucit` to the `EXAMS` array with the other AU exams. Comment line for the ID header if wanted:
` *   AUCIT 10300s (tests 10301-10308, sets 10301-10304)`

## lib/banks/all.ts

```ts
import "./aucit";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/aucit.ts`.

## types/index.ts

- `QuestionType`: add `| "AUCIT"`.
- `QuestionCategory`, under a `// Australian citizenship test` comment:

```ts
  | "aucitPeople"
  | "aucitDemocracy"
  | "aucitGov"
  | "aucitValues"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    aucitPeople: "Australia and Its People",
    aucitDemocracy: "Democratic Beliefs, Rights & Liberties",
    aucitGov: "Government & the Law",
    aucitValues: "Australian Values",
```

## app/globals.css

Suggested hue 150 (green, for green and gold); re-pick if it clashes. Then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Australian citizenship test theme */
  [data-theme="aucit"] {
    --brand: 150 55% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 150 50% 95%;
    --brand-hover: 150 55% 25%;
    --brand-dark: 150 55% 22%;
    --brand-darker: 150 50% 15%;
    --brand-muted: 150 30% 68%;
    --brand-border: 150 30% 78%;
    --brand-border-light: 150 30% 88%;
    --brand-gradient-to: 45 80% 94%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `aucit: "Practice for the Australian citizenship test from Our Common Bond: eight 20-question mock tests with five values questions each, and a values set to get all five right.",`
- `EXAM_ORG`: `aucit: "Department of Home Affairs · Our Common Bond",`
- Hub group (proposal): extend the existing US group and rename it so the other citizenship builders
  (Canada `cacit`, Life in the UK `uklitu`) join it:
  `{ title: "Citizenship tests", ids: ["civics", "aucit", "cacit", "uklitu"] },`
  If the integrator keeps groups per country instead, put `aucit` in a new
  `{ title: "Australia citizenship", ids: ["aucit"] }` next to the other AU groups (a one-item group
  then needs `RELATED_OVERRIDES`).
- `SEARCH_ALIASES`:
  `aucit: "australian citizenship test citizenship test australia our common bond australian values home affairs citizenship practice test become an australian citizen naturalisation pledge",`
- `RELATED_OVERRIDES` (only if the group ends up with fewer than three others): `aucit: ["civics", "cacit", "uklitu"]`.

## lib/region.ts

`aucit: "AU",` in `TEST_REGIONS`, and add `"aucit"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  aucit: {
    answer:
      "The Australian citizenship test is a computer-based test in English of 20 multiple-choice questions, taken in 45 minutes. All questions come from the testable section of the Home Affairs book Australian Citizenship: Our Common Bond, and five of them are about Australian values. To pass you need at least 75 percent (15 of 20) and you must answer all five values questions correctly.",
    rows: [
      { label: "Questions", value: "20 multiple choice" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "75% (15 of 20)" },
      { label: "Values questions", value: "5, and all 5 must be right" },
      { label: "Language", value: "English (text-to-speech available)" },
      { label: "Study book", value: "Our Common Bond, Parts 1 to 4" },
      { label: "Given by", value: "Department of Home Affairs" },
    ],
    basedOn: "Australian Citizenship: Our Common Bond and the Home Affairs citizenship test page, checked October 2026",
    source: { name: "Department of Home Affairs: Learn about the citizenship test", url: "https://immi.homeaffairs.gov.au/citizenship/test-and-interview/learn-about-citizenship-interview-and-test/learn-about-citizenship-test" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the batch.

## components/TeachNudge.tsx

Add `"aucit"` to `TEACHER_LED` (citizenship and AMEP English classes teach it), like `civics`.

## components/exam/ExamClassFaq.tsx

In `TEACHES`: `aucit: "citizenship or English classes for new migrants",`. The landing already renders
`<ExamClassFaq examId="aucit" />` and `classFaqJsonLd("aucit")` (it falls back to "this course" without it).

## lib/tigerAssets.ts (optional)

Falls back to the DMV tiger. To wear the US citizenship tiger: `aucit: "civics",` in `BORROWED_SETS`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `flag` exists, sitemaps map over `EXAMS`, no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (no set is over 60, so nothing should split).

## Landing breadcrumbs

The brief mentions `ExamLandingBreadcrumbs`, but no such component exists in this tree (the ukfood
template does not use one), so the landing does not render it. Add `<ExamLandingBreadcrumbs examId="aucit" />`
after the JSON-LD script if the integrator has it.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing aucit:australian-citizenship:10301`

## CLAUDE.md (under Additional Exams)

```md
- **Australian Citizenship** (Home Affairs citizenship test, `/australian-citizenship/*`, landing `/australian-citizenship-test`): `data/aucit-questions.json` (200 questions from the testable section of Our Common Bond: Australia and its people 48, democratic beliefs/rights/liberties 42, government and the law 60, Australian values 50), eight real-length tests of 20 (IDs 10301-10308; 5/4/6/5 per test, the 5 values like the real test, the 5/4/6 split ours), sets 10301-10304 (one per part of the book, so values trains on its own), state `AUCIT`, 75% pass. The real rule also needs all 5 values questions right; the engine scores only the 75%, so the copy says to check values. 40 items are training-only. Built by `tools/global/aucit/build.py` (interleaves each part so every test gets a spread); sources in `tools/global/aucit/sources.md`.
```
