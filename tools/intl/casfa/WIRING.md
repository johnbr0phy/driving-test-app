# Wiring for `casfa` (Standard First Aid with CPR Level C, Canada, v1)

Files already written by the builder: `data/standard-first-aid-questions.json` (200, built by
`tools/intl/casfa/build.py` from `src/*.py`), `lib/banks/casfa.ts`, `app/standard-first-aid/*`
(8 wrappers copied from `app/uk-theory/`), `app/standard-first-aid-canada-practice-test/page.tsx`,
`tools/intl/casfa/{spec.json,sources.md,build.py,src/*.py}`.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/standard-first-aid-questions.json --pool casfaRole=28 --pool casfaCpr=36 --pool casfaAirway=24 --pool casfaBleed=28 --pool casfaInjury=28 --pool casfaMedical=32 --pool casfaEnviro=24` -> PASS (key-longest 16%, key>1.2x 1%, letters 50/50/50/50).

## lib/exams.ts
Add `| "casfa"` to the `ExamId` union. Icon `bandage` already exists (no icon union change).
Add before `const htl` (with the other Canada exams):

```ts
const casfa: ExamConfig = {
  id: "casfa",
  stateCode: "CASFA",
  idBase: 9400,
  slug: "/standard-first-aid",
  landingPath: "/standard-first-aid-canada-practice-test",
  name: "Standard First Aid Practice Test",
  shortName: "Standard First Aid",
  examLabel: "Standard First Aid & CPR C",
  fullName: "Standard (Intermediate) First Aid with CPR Level C and AED written test",
  questionIdPrefix: "CASFA-",
  icon: "bandage",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // Standard First Aid with CPR Level C and AED (Canada): the intermediate level of
  // CSA Z1210 (Z1210-17, superseded by Z1210:24 published March 2024), usually 2 days.
  // Topics per the Z1210 intermediate curriculum; clinical answers follow the current
  // ILCOR-based Canadian first aid and resuscitation guidelines. Assessment is a skills check
  // plus the training agency's written multiple-choice test; Z1210 sets no pass mark and
  // agencies use 70 to 80%, most often 75%. No one publishes topic weights; counts are ours.
  // Provincial rules (workplace kits, certificate validity) are "varies". All items original.
  blueprint: {
    casfaRole: 7,
    casfaCpr: 9,
    casfaAirway: 6,
    casfaBleed: 7,
    casfaInjury: 7,
    casfaMedical: 8,
    casfaEnviro: 6,
  },
  trainingSets: testSets(9400, 4),
  categoryLabels: {
    casfaRole: "The First Aider's Role, Consent & Assessment",
    casfaCpr: "CPR Level C & AED",
    casfaAirway: "Choking & Breathing Emergencies",
    casfaBleed: "Wounds, Bleeding & Shock",
    casfaInjury: "Bone, Joint, Head, Spine & Chest Injuries",
    casfaMedical: "Sudden Medical Emergencies",
    casfaEnviro: "Burns, Eyes, Poisons & Environment",
  },
  copy: {
    guestPrompt: "to save your first aid progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all seven topics. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 75% to pass, like most course written tests",
    heroSubs: [
      "Seven topics, four practice tests. Most courses pass at 75%.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Practise your hands-on skills and book your course.",
    ],
    sourceLine: "Based on the CSA Z1210 intermediate first aid curriculum and current Canadian first aid and CPR guidelines. Original questions; works for any training agency's course.",
    analyticsKey: "casfa",
  },
};
```

Append `casfa` to `EXAMS` before `htl` (after the other Canada exams). Sets are 50 questions,
so no `partNames`.

## lib/banks/all.ts
```ts
import "./casfa";
```
(`lib/banks/casfa.ts` is already written.)

## types/index.ts
- Add `| "CASFA"` to `QuestionType`.
- Add to `QuestionCategory`:
```ts
  // Standard First Aid with CPR Level C (Canada)
  | "casfaRole"
  | "casfaCpr"
  | "casfaAirway"
  | "casfaBleed"
  | "casfaInjury"
  | "casfaMedical"
  | "casfaEnviro"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (same English labels in all five)
```ts
    casfaRole: "The First Aider's Role, Consent & Assessment",
    casfaCpr: "CPR Level C & AED",
    casfaAirway: "Choking & Breathing Emergencies",
    casfaBleed: "Wounds, Bleeding & Shock",
    casfaInjury: "Bone, Joint, Head, Spine & Chest Injuries",
    casfaMedical: "Sudden Medical Emergencies",
    casfaEnviro: "Burns, Eyes, Poisons & Environment",
```

## app/globals.css
Light block only (hue 2, a Canadian red, unused; nearest are 356/355 cpr and 8). Then run
`tools/gen_dark_brand_css.py` once for everyone. If another wave-2 exam also took hue 2,
shift this one to 250 (also unused).
```css
  /* Standard First Aid theme (Canada) */
  [data-theme="casfa"] {
    --brand: 2 72% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 2 80% 95%;
    --brand-hover: 2 72% 34%;
    --brand-dark: 2 72% 28%;
    --brand-darker: 2 60% 16%;
    --brand-muted: 2 50% 72%;
    --brand-border: 2 50% 78%;
    --brand-border-light: 2 45% 88%;
    --brand-gradient-to: 20 70% 95%;
  }
```

## lib/testCatalog.ts
- `EXAM_BLURBS`:
```ts
  casfa: "Free practice tests for the written test on a Canadian Standard First Aid and CPR Level C course: CPR and AEDs for all ages, choking, bleeding, fractures, medical emergencies and burns.",
```
- `EXAM_ORG`: `casfa: "CSA Z1210 intermediate level (Canada)"`
- Hub group: suggested "Canada school and trade tests" (or a Canada work certificates group with cawhmis, caguard, capsw). Also a good related test for `cpr`.
- `SEARCH_ALIASES`:
```ts
  casfa: "standard first aid sfa cpr c level c cpr-c aed intermediate first aid csa z1210 workplace first aid canada canadian ontario alberta bc quiz written test recertification",
```
- `RELATED_OVERRIDES` if its group has fewer than three others: `casfa: ["cpr", "cawhmis", "capsw"]`.

## lib/region.ts
Add `casfa: "CA"` to `TEST_REGIONS` and `"casfa"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts
```ts
  casfa: {
    answer:
      "Standard First Aid with CPR Level C is the intermediate level of workplace first aid in Canada under the CSA Z1210 standard, usually a two-day course. You pass a hands-on skills check and a written multiple-choice test set by the training agency, most often at 75%, and the certificate usually lasts three years. Which workers need it, and how many first aiders a workplace needs, vary by province and territory.",
    rows: [
      { label: "Course length", value: "About 2 days (13 to 16 hours)" },
      { label: "Written test", value: "Multiple choice, set by the training agency" },
      { label: "Pass mark", value: "Usually 75% (70 to 80% by agency)" },
      { label: "Also required", value: "Hands-on skills check" },
      { label: "CPR level", value: "C: adult, child and infant, with AED" },
      { label: "Valid for", value: "Usually 3 years" },
      { label: "Standard", value: "CSA Z1210 intermediate level" },
      { label: "Workplace rules", value: "Vary by province and territory" },
    ],
    basedOn: "the CSA Z1210 first aid training standard and current Canadian first aid guidelines",
    source: { name: "Standards Council of Canada: CSA Z1210:24", url: "https://scc-ccn.ca/standardsdb/standards/4032281" },
  },
```
(Checked 30 Oct 2026.)

## components/TeachNudge.tsx
Add `"casfa"` to `TEACHER_LED` (healthcare line, next to `cpr`, or the instructor-led certifications line).

## components/exam/ExamClassFaq.tsx
Add to `TEACHES` (next to `cpr`):
```ts
  casfa: "Standard First Aid and CPR Level C courses",
```

## lib/server/classQuestions.ts
Nothing to add: it imports `@/lib/banks/all`, which picks up casfa once `import "./casfa";` is in.

## lib/tigerAssets.ts (optional)
Leave out (falls back to the DMV tiger), or borrow `cpr`'s set if one exists.

## lib/sitemaps.ts / lib/seoDates.ts
Landing `/standard-first-aid-canada-practice-test` comes from the catalog; bump `EXAM_LANDINGS_UPDATED_AT` (batch comment covers casfa).

## scripts/build-training-parts.ts
Run `npx tsx scripts/build-training-parts.ts` after wiring.

## Screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing casfa:standard-first-aid:9401`

## CLAUDE.md (bullet under "Additional Exams")
```md
- **Standard First Aid** (Canada, Standard/Intermediate First Aid with CPR Level C and AED, `/standard-first-aid/*`, landing `/standard-first-aid-canada-practice-test`): `data/standard-first-aid-questions.json` (200 questions: role/consent/assessment 28, CPR C and AED 36, choking/breathing 24, bleeding/shock 28, bone/head/spine/chest 28, medical emergencies 32, burns/eyes/poisons/environment 24), test IDs 9401-9404, sets 9401-9404 (one per test), state `CASFA`, 75% pass (agencies use 70 to 80%). 7/9/6/7/7/8/6 per test. CSA Z1210 intermediate curriculum and ILCOR-based Canadian guidelines; no training agency named; provincial rules "vary". Built by `tools/intl/casfa/build.py`. Hub group with the other Canada work certificates.
```
