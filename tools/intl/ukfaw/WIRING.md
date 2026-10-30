# Wiring for `ukfaw` (First Aid at Work, UK, v1)

Files already written by the builder: `data/first-aid-at-work-questions.json` (200, validator PASS),
`lib/banks/ukfaw.ts`, `app/first-aid-at-work/*` (8 wrappers copied from `app/uk-theory/`),
`app/first-aid-at-work-practice-test/page.tsx`, `tools/intl/ukfaw/*` (spec, sources, `src/*.py`,
`build.py`, `patch_lengths.py` one-off length fixes already applied to `src/`). Everything below
goes in shared files.

## lib/exams.ts

Add `"ukfaw"` to the `ExamId` union. Icon `bandage` already exists (used by `cpr`).

Block (with the other UK exams, before `const htl`):

```ts
const ukfaw: ExamConfig = {
  id: "ukfaw",
  stateCode: "UKFAW",
  idBase: 8500,
  slug: "/first-aid-at-work",
  landingPath: "/first-aid-at-work-practice-test",
  name: "First Aid at Work Practice Test",
  shortName: "First Aid at Work",
  examLabel: "First Aid at Work",
  fullName: "First Aid at Work (FAW) course theory assessment",
  questionIdPrefix: "UKFAW-",
  icon: "bandage",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // First Aid at Work (3-day course, usually the Level 3 Award in First Aid at Work), content
  // per HSE L74 (2024 reissue) Appendix 6 (EFAW: role, assessment, unresponsive casualty, CPR and
  // AED, choking, wounds and bleeding, shock, minor injuries) and Appendix 5 (FAW adds bones,
  // muscles, joints and spinal injuries, chest injuries, burns and scalds, eye injuries,
  // poisoning, anaphylaxis, major illness). Clinical answers follow the Resuscitation Council UK
  // 2025 guidelines. Assessment is practical observation plus awarding-body MCQ theory papers;
  // pass marks vary by awarding body (about 70%). No body publishes topic weights; counts are ours.
  // All items original.
  blueprint: {
    ukfawRole: 6,
    ukfawResus: 8,
    ukfawBleed: 8,
    ukfawBones: 7,
    ukfawChest: 5,
    ukfawBurns: 7,
    ukfawIllness: 9,
  },
  trainingSets: testSets(8500, 4),
  categoryLabels: {
    ukfawRole: "The First-Aider's Role & Assessment",
    ukfawResus: "Unresponsive Casualty, CPR & AED",
    ukfawBleed: "Wounds, Bleeding & Shock",
    ukfawBones: "Bones, Joints, Head & Spinal Injuries",
    ukfawChest: "Choking, Breathing & Chest Injuries",
    ukfawBurns: "Burns, Eyes, Electricity & Poisoning",
    ukfawIllness: "Major Illness & Anaphylaxis",
  },
  copy: {
    guestPrompt: "to save your First Aid at Work progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all seven parts of the FAW syllabus. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across the First Aid at Work syllabus",
    heroSubs: [
      "Seven topics, four mock tests. Major illness is the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Practise the hands-on skills on your course.",
    ],
    sourceLine: "Based on HSE's First Aid at Work syllabus (L74) and the Resuscitation Council UK 2025 guidelines. Awarding bodies set their own theory papers; 70% here is a practice target.",
    analyticsKey: "ukfaw",
  },
};
```

Append `ukfaw` to the `EXAMS` array (with the other UK exams, before `caon`).

## lib/banks/all.ts

```ts
import "./ukfaw";
```
`lib/banks/ukfaw.ts` is already written (imports `@/data/first-aid-at-work-questions.json`).

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/ukfaw.ts`, like `ukcar`.

## types/index.ts

- `QuestionType`: add `| "UKFAW"`.
- `QuestionCategory`, under a `// First Aid at Work (UK)` comment:

```ts
  | "ukfawRole"
  | "ukfawResus"
  | "ukfawBleed"
  | "ukfawBones"
  | "ukfawChest"
  | "ukfawBurns"
  | "ukfawIllness"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ukfawRole: "The First-Aider's Role & Assessment",
    ukfawResus: "Unresponsive Casualty, CPR & AED",
    ukfawBleed: "Wounds, Bleeding & Shock",
    ukfawBones: "Bones, Joints, Head & Spinal Injuries",
    ukfawChest: "Choking, Breathing & Chest Injuries",
    ukfawBurns: "Burns, Eyes, Electricity & Poisoning",
    ukfawIllness: "Major Illness & Anaphylaxis",
```

## app/globals.css

Light block only (hue 142, first-aid-sign green, unused; neighbours 135 and 150); then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* First Aid at Work theme (UK) */
  [data-theme="ukfaw"] {
    --brand: 142 70% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 142 55% 95%;
    --brand-hover: 142 70% 25%;
    --brand-dark: 142 70% 21%;
    --brand-darker: 142 65% 14%;
    --brand-muted: 142 30% 70%;
    --brand-border: 142 35% 78%;
    --brand-border-light: 142 35% 88%;
    --brand-gradient-to: 160 55% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ukfaw: "Free mock tests for the UK First Aid at Work course: CPR and AEDs, bleeding and shock, fractures and spinal injuries, burns, choking and major illness, written to the 2025 UK resuscitation guidelines.",`
- `EXAM_ORG`: `ukfaw: "HSE First Aid at Work syllabus · Level 3",`
- Hub group: the suggested new "UK workplace and trade certificates" group with the other
  wave-2 UK work exams (`cscs`, `ukfood`, `ukaplh`, `ukfaw`, `ukcare`).
- `SEARCH_ALIASES`:
  `ukfaw: "first aid at work faw efaw emergency first aid at work level 3 award first aider workplace first aid hse 3 day course requalification cpr aed resuscitation council uk drsabcd recovery position",`
- `RELATED_OVERRIDES` only if the UK work group has fewer than three others: `ukfaw: ["ukcare", "cscs", "cpr"]`.

## lib/region.ts

`ukfaw: "UK",` in `TEST_REGIONS`, and add `"ukfaw"` to `NON_DRIVING_TESTS`.

## lib/tigerAssets.ts (optional)

It has no art of its own; it falls back to the DMV tiger. To wear the CPR tiger instead, add
`ukfaw: "cpr",` to `BORROWED_SETS` (and widen that map's comment beyond driving exams).

## lib/examFacts.ts

```ts
  ukfaw: {
    answer:
      "First Aid at Work (FAW) is the three-day workplace first aid course set out in HSE's guidance on the Health and Safety (First-Aid) Regulations 1981, usually certificated as a Level 3 Award in First Aid at Work. You are assessed on practical skills such as CPR, AED use and bandaging, and on theory through a written or multiple-choice paper set by the awarding body, with pass marks around 70%. The certificate lasts 3 years, and requalifying takes a 2-day course.",
    rows: [
      { label: "Course length", value: "3 days (EFAW is 1 day)" },
      { label: "Assessment", value: "Practical observation plus a theory paper" },
      { label: "Pass mark", value: "Set by each awarding body, about 70%" },
      { label: "Certificate valid", value: "3 years" },
      { label: "Requalification", value: "2-day course before expiry" },
      { label: "Refresher", value: "Annual, strongly recommended by HSE" },
      { label: "Guidelines", value: "Resuscitation Council UK, 2025" },
      { label: "Content set by", value: "HSE (L74, Appendices 5 and 6)" },
    ],
    basedOn: "HSE guidance L74 on the Health and Safety (First-Aid) Regulations 1981 and the Resuscitation Council UK 2025 guidelines, checked October 2026",
    source: { name: "HSE: First aid at work (L74)", url: "https://www.hse.gov.uk/pubns/books/l74.htm" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave (includes the First Aid at Work landing).

## components/TeachNudge.tsx

Add `"ukfaw"` to `TEACHER_LED`.

## components/exam/ExamClassFaq.tsx

In `TEACHES` (next to `cpr`): `ukfaw: "First Aid at Work courses",`
(reads "I teach First Aid at Work courses. Can my students use Tigertest?")

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing expected: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `bandage` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (writes `lib/trainingParts.json`).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ukfaw:first-aid-at-work:8501`

## CLAUDE.md (under Additional Exams)

```md
- **First Aid at Work** (UK FAW course theory, `/first-aid-at-work/*`, landing `/first-aid-at-work-practice-test`): `data/first-aid-at-work-questions.json` (200 questions: role/assessment/RIDDOR 24, unresponsive casualty/CPR/AED 32, wounds/bleeding/shock 32, bones/head/spinal 28, choking/breathing/chest 20, burns/eyes/electricity/poisoning 28, major illness/anaphylaxis 36), test IDs 8501-8504, sets 8501-8504 (one per test), state `UKFAW`, 70% pass (awarding bodies set their own theory papers, about 70%). 6/8/8/7/5/7/9 per test. HSE L74 Appendices 5 and 6 and the Resuscitation Council UK 2025 guidelines; no awarding body named. Built by `tools/intl/ukfaw/build.py`.
```
