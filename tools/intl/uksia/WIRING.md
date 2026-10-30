# uksia wiring (SIA Door Supervisor, v1 engine)

Files already written by the builder: `data/sia-door-supervisor-questions.json` (built by
`python3 -I tools/intl/uksia/build.py`), `app/sia-door-supervisor/*` (seven wrappers),
`app/sia-door-supervisor-practice-test/page.tsx`, and this folder.
Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/sia-door-supervisor-questions.json --pool uksiaIndustry=28 --pool uksiaSafety=20 --pool uksiaComms=16 --pool uksiaTerror=20 --pool uksiaCrime=28 --pool uksiaVenue=28 --pool uksiaConflict=24 --pool uksiaPhysical=36` prints PASS.

## lib/exams.ts

1. `ExamId` union: add `| "uksia"` (next to `"ukadi"`).
2. Icon: uses the existing `"shield"` key, no union change.
3. Add this block before `const htl` (next to the other UK exams):

```ts
const uksia: ExamConfig = {
  id: "uksia",
  stateCode: "UKSIA",
  idBase: 7700,
  slug: "/sia-door-supervisor",
  landingPath: "/sia-door-supervisor-practice-test",
  name: "SIA Door Supervisor Practice Test",
  shortName: "Door Supervisor",
  examLabel: "SIA door supervisor exams",
  fullName: "SIA door supervisor licence exams (Level 2 Award for Door Supervisors)",
  questionIdPrefix: "UKSIA-",
  icon: "shield",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Level 2 Award for Door Supervisors in the Private Security Industry, the SIA
  // licence-linked qualification (SIA door supervision specifications, April 2021, still
  // current Oct 2026; counts and pass marks from the Pearson BTEC spec Issue 2, Sept 2023):
  // Unit 1 core 72 MCQ in 110 min at 70%, Unit 2 door supervision 50 in 75 min at 70%,
  // Unit 3 conflict management 20 in 30 min at 70%, Unit 4 physical intervention 30 in
  // 45 min at 80%. 172 MCQ in all, so 50 per test is 21/14/6/9 by unit; Unit 1 is split
  // by learning outcome into four categories and Unit 2 into two. Practical assessments
  // and the EFAW first aid prerequisite are not modelled. Licensing, arrest and force
  // questions follow England and Wales law. All questions are original.
  blueprint: {
    uksiaIndustry: 7,
    uksiaSafety: 5,
    uksiaComms: 4,
    uksiaTerror: 5,
    uksiaCrime: 7,
    uksiaVenue: 7,
    uksiaConflict: 6,
    uksiaPhysical: 9,
  },
  trainingSets: testSets(7700, 4),
  categoryLabels: {
    uksiaIndustry: "Security Industry, Law & Arrest",
    uksiaSafety: "Health & Safety, Fire & Emergencies",
    uksiaComms: "Communication, Records & Post-Incident",
    uksiaTerror: "Terrorism & Vulnerable People",
    uksiaCrime: "Crime, Drugs & Evidence",
    uksiaVenue: "Licensing Law, Searching & Queues",
    uksiaConflict: "Conflict Management",
    uksiaPhysical: "Physical Intervention",
  },
  copy: {
    guestPrompt: "to save your SIA exam progress and track every question you miss",
    trainingHeading: "Train for each mock exam",
    trainingSub: "Four sets, one per mock exam: Set 1 holds exactly the 50 questions of Test 1, and so on, across all four units. Missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions mixing all four units like the real exams",
    heroSubs: [
      "Four units, four mock exams. Physical intervention needs 80%, the rest 70%.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You are ready for your course exams.",
    ],
    sourceLine: "Based on the SIA door supervision specifications (April 2021) and England and Wales law, checked October 2026. Multiple-choice exams only; the practical assessments are done with your trainer.",
    analyticsKey: "uksia",
  },
};
```

4. `EXAMS` array: add `uksia` right after `ukadi`.

## lib/banks/uksia.ts (already created by the builder; shown for reference)

```ts
import { Question } from "@/types";
import uksiaQuestions from "@/data/sia-door-supervisor-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The SIA door supervisor bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ uksia: uksiaQuestions as Question[] });
```

## lib/banks/all.ts

Add `import "./uksia";` after `import "./ukpcv";`.

## lib/examData.ts

Nothing (banks register through `lib/banks/`).

## types/index.ts

- `QuestionType`: add `| "UKSIA"`.
- `QuestionCategory`: add after the ukpcv keys:

```ts
  // SIA door supervisor (UK)
  | "uksiaIndustry"
  | "uksiaSafety"
  | "uksiaComms"
  | "uksiaTerror"
  | "uksiaCrime"
  | "uksiaVenue"
  | "uksiaConflict"
  | "uksiaPhysical"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts

Same English labels in all five, after the `ukpcvSigns` line:

```ts
    uksiaIndustry: "Security Industry, Law & Arrest",
    uksiaSafety: "Health & Safety, Fire & Emergencies",
    uksiaComms: "Communication, Records & Post-Incident",
    uksiaTerror: "Terrorism & Vulnerable People",
    uksiaCrime: "Crime, Drugs & Evidence",
    uksiaVenue: "Licensing Law, Searching & Queues",
    uksiaConflict: "Conflict Management",
    uksiaPhysical: "Physical Intervention",
```

## app/globals.css

Hue 285 (night-time violet; unused). Light block after the last UK theme:

```css
  /* SIA door supervisor theme (UK) */
  [data-theme="uksia"] {
    --brand: 285 55% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 285 60% 95%;
    --brand-hover: 285 55% 34%;
    --brand-dark: 285 55% 28%;
    --brand-darker: 285 45% 19%;
    --brand-muted: 285 35% 72%;
    --brand-border: 285 35% 78%;
    --brand-border-light: 285 30% 88%;
    --brand-gradient-to: 315 60% 95%;
  }
```

Dark block (or re-run `tools/gen_dark_brand_css.py`):

```css
  .dark [data-theme="uksia"] {
    --brand: 285 55% 50%;
    --brand-hover: 285 55% 42%;
    --brand-light: 285 40% 13%;
    --brand-gradient-to: 315 35% 11%;
    --brand-border-light: 285 30% 24%;
    --brand-border: 285 35% 34%;
    --brand-muted: 285 35% 45%;
    --brand-dark: 285 55% 65%;
    --brand-darker: 285 45% 78%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `uksia: "Free mock exams for the SIA door supervisor licence course: the law and arrest, licensing, searching, drugs, terrorism, conflict management and physical intervention, weighted like the four unit exams.",`
- `EXAM_ORG`: `uksia: "SIA licence-linked qualification (UK)",`
- `GROUPS`: new group after "UK driving and instructor theory tests":
  `{ title: "UK workplace and trade certificates", ids: ["uksia"] },` (add the other UK workplace exams from this batch to the same group).
- `SEARCH_ALIASES`:
  `uksia: "sia door supervisor licence badge bouncer doorman door staff security industry authority level 2 award ds course mock exam conflict management physical intervention nightclub pub security uk",`
- `RELATED_OVERRIDES` (only if the new group ends up with fewer than three other members):
  `uksia: ["security", "alcohol", "cpr"],`

## lib/region.ts

`TEST_REGIONS`: add `uksia: "UK",` to the UK line.

## lib/tigerAssets.ts

`BORROWED_SETS`: `uksia: "security",` (the US security guard tiger fits until it has its own set).

## components/TeachNudge.tsx

Add `"uksia"` to `TEACHER_LED` under "Trade schools, pre-licensing courses and instructor-led certifications". The course is mandatory and face to face, so every candidate has a trainer.

## components/exam/ExamClassFaq.tsx

`TEACHES`: `uksia: "an SIA door supervisor course",`

## lib/examFacts.ts

```ts
  uksia: {
    answer:
      "To get an SIA door supervisor licence you must pass the Level 2 Award for Door Supervisors in the Private Security Industry, a face-to-face course with four multiple-choice exams: 72 questions on working in the private security industry, 50 on door supervision, 20 on conflict management and 30 on physical intervention. You need 70 percent on the first three and 80 percent on physical intervention, plus practical assessments. You must be 18 or over and hold an emergency first aid qualification before the course starts.",
    rows: [
      { label: "Exams", value: "4 multiple-choice unit exams, 172 questions" },
      { label: "Core unit", value: "72 questions in 110 minutes, pass 50 (70%)" },
      { label: "Door supervision unit", value: "50 questions in 75 minutes, pass 35 (70%)" },
      { label: "Conflict management", value: "20 questions in 30 minutes, pass 14 (70%)" },
      { label: "Physical intervention", value: "30 questions in 45 minutes, pass 24 (80%)" },
      { label: "Before the course", value: "Emergency First Aid at Work or First Aid at Work" },
      { label: "Licence", value: "Age 18+, £204, lasts 3 years" },
      { label: "Regulator", value: "Security Industry Authority (SIA)" },
    ],
    basedOn: "the SIA door supervision specifications (April 2021) and an awarding body's published exam structure, checked October 2026",
    source: { name: "GOV.UK: SIA licence-linked training specifications", url: "https://www.gov.uk/guidance/read-the-specifications-for-sia-licence-linked-training" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` (the integrator's batch comment covers it; mention the SIA door supervisor landing).

## lib/sitemaps.ts, next.config.ts, lib/server/classQuestions.ts

Nothing exam-specific: the sitemap reads the catalog, and `classQuestions` imports `lib/banks/all` (covered above).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (sets are 50 each, so it likely writes nothing new for uksia).

## CLAUDE.md

Bullet under "Additional Exams" after the PCV / ADI bullets:

```md
- **SIA Door Supervisor** (UK licence-linked qualification, `/sia-door-supervisor/*`, landing `/sia-door-supervisor-practice-test`): `data/sia-door-supervisor-questions.json` (200 questions: industry, law & arrest 28, health & safety, fire & emergencies 20, communication, records & post-incident 16, terrorism & vulnerable people 20, crime, drugs & evidence 28, licensing law, searching & queues 28, conflict management 24, physical intervention 36), test IDs 7701-7704, sets 7701-7704, state `UKSIA`, 70% pass (the real physical intervention exam is 80%). 7/5/4/5/7/7/6/9 per test, from the four unit exams' 72/50/20/30 MCQ (SIA door supervision specs, April 2021; SIA review due to replace them spring 2027). England and Wales law; Scotland and NI flagged on the landing. Build with `tools/intl/uksia/build.py`. Hub group "UK workplace and trade certificates".
```

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing uksia:sia-door-supervisor:7701`
