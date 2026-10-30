# Wiring for `aufirstaid` (HLTAID011 Provide First Aid, Australia, v1)

Files already written by the builder: `data/au-first-aid-questions.json` (200, validator PASS),
`lib/banks/aufirstaid.ts`, `app/au-first-aid/*` (8 wrappers copied from `app/first-aid-at-work/`),
`app/first-aid-course-practice-test-australia/page.tsx`, `tools/intl/aufirstaid/*` (spec, sources,
`src/*.py`, `build.py`). Everything below goes in shared files.

## lib/exams.ts

Add `"aufirstaid"` to the `ExamId` union. Icon `bandage` already exists (used by `cpr`, `ukfaw`).

Block (with the other AU exams, before `const htl`):

```ts
const aufirstaid: ExamConfig = {
  id: "aufirstaid",
  stateCode: "AUFIRSTAID",
  idBase: 9800,
  slug: "/au-first-aid",
  landingPath: "/first-aid-course-practice-test-australia",
  name: "HLTAID011 Provide First Aid Practice Test",
  shortName: "First Aid (HLTAID011)",
  examLabel: "HLTAID011 Provide First Aid",
  fullName: "HLTAID011 Provide First Aid knowledge assessment (Australia)",
  questionIdPrefix: "AUFIRSTAID-",
  icon: "bandage",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // HLTAID011 Provide First Aid (training.gov.au, Release 1): categories follow the unit's
  // knowledge evidence list (legal and WHS considerations, CPR and AED, and the listed conditions
  // from anaphylaxis to stroke). Clinical answers follow the Australian Resuscitation Council
  // (ANZCOR) guidelines; allergy items follow ASCIA; workplace items follow Safe Work Australia's
  // model Code of Practice on first aid. RTOs set their own knowledge assessments and there is no
  // national pass mark; 80% is a readiness line. No body publishes topic weights; counts are ours.
  // All items original.
  blueprint: {
    aufirstaidRole: 7,
    aufirstaidCpr: 9,
    aufirstaidAirway: 7,
    aufirstaidBleed: 7,
    aufirstaidBones: 6,
    aufirstaidMedical: 6,
    aufirstaidEnviro: 4,
    aufirstaidVenom: 4,
  },
  trainingSets: testSets(9800, 4),
  categoryLabels: {
    aufirstaidRole: "Role, Legal & DRSABCD",
    aufirstaidCpr: "CPR, AED & the Unconscious Casualty",
    aufirstaidAirway: "Choking, Asthma & Anaphylaxis",
    aufirstaidBleed: "Bleeding, Shock, Wounds & Eyes",
    aufirstaidBones: "Fractures, Sprains, Head & Spine",
    aufirstaidMedical: "Heart, Stroke, Diabetes, Seizures & Poisons",
    aufirstaidEnviro: "Burns, Heat, Cold & Smoke",
    aufirstaidVenom: "Bites & Stings",
  },
  copy: {
    guestPrompt: "to save your first aid course progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all eight parts of HLTAID011. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across HLTAID011 Provide First Aid",
    heroSubs: [
      "Eight topics, four mock tests. CPR is the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Practise 2 minutes of floor CPR on your course.",
    ],
    sourceLine: "Based on the HLTAID011 unit on training.gov.au and current Australian Resuscitation Council guidelines. Training organisations set their own knowledge quizzes; 80% here is a readiness line.",
    analyticsKey: "aufirstaid",
  },
};
```

Append `aufirstaid` to the `EXAMS` array (with the other AU work exams, e.g. after `aufss`).

## lib/banks/all.ts

```ts
import "./aufirstaid";
```
`lib/banks/aufirstaid.ts` is already written (imports `@/data/au-first-aid-questions.json`).

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/aufirstaid.ts`.

## types/index.ts

- `QuestionType`: add `| "AUFIRSTAID"`.
- `QuestionCategory`, under a `// HLTAID011 Provide First Aid (Australia)` comment:

```ts
  | "aufirstaidRole"
  | "aufirstaidCpr"
  | "aufirstaidAirway"
  | "aufirstaidBleed"
  | "aufirstaidBones"
  | "aufirstaidMedical"
  | "aufirstaidEnviro"
  | "aufirstaidVenom"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    aufirstaidRole: "Role, Legal & DRSABCD",
    aufirstaidCpr: "CPR, AED & the Unconscious Casualty",
    aufirstaidAirway: "Choking, Asthma & Anaphylaxis",
    aufirstaidBleed: "Bleeding, Shock, Wounds & Eyes",
    aufirstaidBones: "Fractures, Sprains, Head & Spine",
    aufirstaidMedical: "Heart, Stroke, Diabetes, Seizures & Poisons",
    aufirstaidEnviro: "Burns, Heat, Cold & Smoke",
    aufirstaidVenom: "Bites & Stings",
```

## app/globals.css

Light block only (hue 2, first-aid red; unused on this branch, neighbours 356 and 8). Then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* HLTAID011 Provide First Aid theme (Australia) */
  [data-theme="aufirstaid"] {
    --brand: 2 72% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 2 70% 96%;
    --brand-hover: 2 72% 36%;
    --brand-dark: 2 72% 30%;
    --brand-darker: 2 70% 20%;
    --brand-muted: 2 35% 72%;
    --brand-border: 2 45% 80%;
    --brand-border-light: 2 45% 90%;
    --brand-gradient-to: 18 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `aufirstaid: "Free mock tests for HLTAID011 Provide First Aid, Australia's workplace first aid unit: DRSABCD, CPR and AEDs, choking, asthma and anaphylaxis, bleeding, fractures, snake bite and marine stings, written to current ARC guidelines.",`
- `EXAM_ORG`: `aufirstaid: "HLTAID011 · Australian Resuscitation Council guidelines",`
- Hub group: "Australia school and work certificates" (or the AU work group) with `aursa`, `aurcg`, `aufss`, `auforklift`, `auwah`.
- `SEARCH_ALIASES`:
  `aufirstaid: "hltaid011 provide first aid hltaid009 hltaid010 cpr first aid certificate australia first aid course quiz arc anzcor drsabcd triple zero 000 snake bite pressure immobilisation jellyfish vinegar asthma 4x4x4 workplace first aider",`
- `RELATED_OVERRIDES` only if the AU work group has fewer than three others: `aufirstaid: ["aufss", "aursa", "cpr"]`.

## lib/region.ts

`aufirstaid: "AU",` in `TEST_REGIONS`, and add `"aufirstaid"` to `NON_DRIVING_TESTS`.

## lib/tigerAssets.ts (optional)

No art of its own; falls back to the DMV tiger. To wear the CPR tiger instead, add
`aufirstaid: "cpr",` to `BORROWED_SETS` if that map exists.

## lib/examFacts.ts

```ts
  aufirstaid: {
    answer:
      "HLTAID011 Provide First Aid is the national unit of competency that most Australian workplaces require of their first aiders. It is taught by registered training organisations and assessed by practical demonstration, including at least 2 minutes of uninterrupted CPR on adult and infant manikins and use of an AED, plus a knowledge assessment set by the training organisation. Answers follow Australian Resuscitation Council guidelines, and the certificate is usually renewed every 3 years with CPR refreshed every 12 months.",
    rows: [
      { label: "Unit", value: "HLTAID011 Provide First Aid (includes CPR)" },
      { label: "Assessment", value: "Practical skills plus a knowledge quiz" },
      { label: "CPR requirement", value: "2 minutes uninterrupted on a floor manikin" },
      { label: "Pass mark", value: "Set by each training organisation" },
      { label: "Renewal", value: "Usually every 3 years" },
      { label: "CPR refresher", value: "Every 12 months" },
      { label: "Guidelines", value: "Australian Resuscitation Council (ANZCOR)" },
      { label: "Emergency number", value: "000 (112 from mobiles)" },
    ],
    basedOn: "The HLTAID011 unit and assessment requirements on training.gov.au, the Australian Resuscitation Council guidelines and Safe Work Australia's model Code of Practice on first aid, checked October 2026",
    source: { name: "training.gov.au: HLTAID011 Provide First Aid", url: "https://training.gov.au/Training/Details/HLTAID011" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date (wave 2, includes the HLTAID011 landing).

## components/TeachNudge.tsx

Add `"aufirstaid"` to `TEACHER_LED`.

## components/exam/ExamClassFaq.tsx

In `TEACHES` (next to `cpr`): `aufirstaid: "HLTAID011 first aid courses",`

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing expected: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `bandage` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing aufirstaid:au-first-aid:9801`

## CLAUDE.md (under Additional Exams)

```md
- **First Aid (Australia)** (HLTAID011 Provide First Aid knowledge, `/au-first-aid/*`, landing `/first-aid-course-practice-test-australia`): `data/au-first-aid-questions.json` (200 questions: role/legal/DRSABCD 28, CPR/AED/unconscious 36, choking/asthma/anaphylaxis 28, bleeding/shock/wounds/eyes 28, fractures/head/spine 24, heart/stroke/diabetes/seizures/poisons 24, burns/heat/cold/smoke 16, bites and stings 16), test IDs 9801-9804, sets 9801-9804 (one per test), state `AUFIRSTAID`, 80% readiness line (RTOs set their own knowledge quizzes). 7/9/7/7/6/6/4/4 per test. HLTAID011 knowledge evidence and current ARC (ANZCOR) guidelines; 000 throughout; back blows then chest thrusts, 4 x 4 x 4 asthma, pressure immobilisation, vinegar for box jellyfish. Built by `tools/intl/aufirstaid/build.py`.
```
