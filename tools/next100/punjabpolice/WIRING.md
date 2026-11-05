# Wiring for `punjabpolice` (Punjab Police, Pakistan: Constable written test, v1)

Files already written by the builder: `data/punjab-police-questions.json` (200, PASS),
`lib/banks/punjabpolice.ts`, `app/punjab-police-constable/*` (layout, redirect, dashboard, drill,
stats; copied from `app/nigeria-police-recruitment/`, no test or practice folders),
`app/punjab-police-constable-practice-test/page.tsx`, `tools/next100/punjabpolice/*` (spec,
sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/punjabpolice/build.py`.
Everything below goes in shared files.

Format note: Punjab Police advertises Constable and Lady Constable posts (BPS-7) district by district
(latest read: 25 Jan 2025 province-wide advertisement; 31 Oct 2026 Rahim Yar Khan and Rajanpur).
Stages: height and chest, a 1.6 km race, a written examination, an interview. No advertisement or
notice states the number of questions, the time, the subjects or a pass mark.
Tigertest models four 50-question tests at a 70% target (35 of 50). Pools are exactly 4x each
per-test count (no spares). Dashboard = 5 topic sets + 4 tests = 9 steps. No set exceeds 60.
GK lane in batch 3: Punjab geography and landmarks, the Police Order 2002 and Punjab Police Code of
Conduct, PPC and CrPC basics, basic computers. Urdu, Islamiat, Pakistan Studies and current affairs
are left out (the landing says so).

## lib/exams.ts

Add `"punjabpolice"` to the `ExamId` union. Icon `badge` already exists.

Block (with the other batch-3 Pakistan exams, after `pkdrive` or `ppsc`):

```ts
const punjabpolice: ExamConfig = {
  id: "punjabpolice",
  stateCode: "PKPUNJPOL",
  idBase: 20000,
  slug: "/punjab-police-constable",
  landingPath: "/punjab-police-constable-practice-test",
  name: "Punjab Police Constable Practice Test",
  shortName: "Punjab Police test",
  examLabel: "Punjab Police constable test",
  fullName: "Punjab Police (Pakistan) Constable and Lady Constable written test",
  questionIdPrefix: "PJPOL-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Source: Punjab Police advertisements for Constables and Lady Constables (BPS-7), 25 Jan 2025
  // (province-wide) and 31 Oct 2026 (Rahim Yar Khan and Rajanpur): Matric with 50% marks, age 18 to
  // 22 in settled areas, height and chest, 1.6 km race, then a written examination and an
  // interview. Punjab Police publishes no question count, time, subject split or pass mark; the
  // format can change between recruitments. Weights are Tigertest's own (English 13,
  // maths 7, reasoning 5, Punjab 7, Police Order 7, criminal law 6, computer 5 per test), and 70%
  // (35 of 50) is Tigertest's target. Law from the Police Order 2002 (text as promulgated), the
  // Punjab Police Code of Conduct, the PPC 1860 and CrPC 1898. Checked 2026-11-05. Pools are
  // exactly 4x each count (no spares). All items original.
  blueprint: {
    pjpolGrammar: 7,
    pjpolVocab: 6,
    pjpolMaths: 7,
    pjpolReasoning: 5,
    pjpolPunjab: 7,
    pjpolPoliceOrder: 7,
    pjpolCriminalLaw: 6,
    pjpolComputer: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 20001, name: "English", categories: ["pjpolGrammar", "pjpolVocab"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 20002, name: "Maths & Reasoning", categories: ["pjpolMaths", "pjpolReasoning"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 20003, name: "Police Order 2002 & Policing", categories: ["pjpolPoliceOrder"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 4, id: 20004, name: "Criminal Law (PPC & CrPC)", categories: ["pjpolCriminalLaw"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 5, id: 20005, name: "Punjab & Computers", categories: ["pjpolPunjab", "pjpolComputer"], size: 48, weightLabel: "12 of 50 test questions" },
  ],
  categoryLabels: {
    pjpolGrammar: "English: Grammar & Usage",
    pjpolVocab: "English: Vocabulary & Spelling",
    pjpolMaths: "Mathematics",
    pjpolReasoning: "Reasoning",
    pjpolPunjab: "Punjab: Geography & Landmarks",
    pjpolPoliceOrder: "Police Order 2002 & Policing",
    pjpolCriminalLaw: "Criminal Law: PPC & CrPC",
    pjpolComputer: "Basic Computer Skills",
  },
  copy: {
    guestPrompt: "to save your Punjab Police test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the English, maths, reasoning, Punjab, police law and computer skills a constable candidate needs. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 35 or more",
    heroSubs: [
      "Five topics, four 50-question tests. English and maths weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Keep running for the race and go.",
    ],
    sourceLine: "Based on the Police Order 2002, the Punjab Police Code of Conduct, the PPC and CrPC, and the English, maths and reasoning the written test covers. Original questions; 50 per test, 70% is Tigertest's target.",
    analyticsKey: "punjabpolice",
  },
};
```

Append `punjabpolice` to the `EXAMS` array.

Check: 20001-20005 (sets) and 20001-20004 (tests) must be free (BRIEF reserves idBase 20000).

## lib/banks/all.ts

```ts
import "./punjabpolice";
```

## types/index.ts

- `QuestionType`: add `| "PKPUNJPOL"`.
- `QuestionCategory`, under a `// Punjab Police (Pakistan) constable` comment:

```ts
  | "pjpolGrammar"
  | "pjpolVocab"
  | "pjpolMaths"
  | "pjpolReasoning"
  | "pjpolPunjab"
  | "pjpolPoliceOrder"
  | "pjpolCriminalLaw"
  | "pjpolComputer"
```

(Keys grepped against `types/index.ts` on 2026-11-05: no `pjpol*` keys exist.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    pjpolGrammar: "English: Grammar & Usage",
    pjpolVocab: "English: Vocabulary & Spelling",
    pjpolMaths: "Mathematics",
    pjpolReasoning: "Reasoning",
    pjpolPunjab: "Punjab: Geography & Landmarks",
    pjpolPoliceOrder: "Police Order 2002 & Policing",
    pjpolCriminalLaw: "Criminal Law: PPC & CrPC",
    pjpolComputer: "Basic Computer Skills",
```

## app/globals.css

The brief's hue, 215 40% 18% (checked by the brief's script), deep police navy. Then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Punjab Police (Pakistan) constable theme */
  [data-theme="punjabpolice"] {
    --brand: 215 40% 18%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 215 35% 95%;
    --brand-hover: 215 40% 15%;
    --brand-dark: 215 40% 13%;
    --brand-darker: 215 35% 9%;
    --brand-muted: 215 20% 66%;
    --brand-border: 215 20% 78%;
    --brand-border-light: 215 18% 88%;
    --brand-gradient-to: 200 35% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `punjabpolice: "Four 50-question mock tests for the Punjab Police constable and lady constable written test in Pakistan: English, maths, reasoning, Punjab's geography, the Police Order 2002, the PPC and CrPC, and basic computer skills.",`
- `EXAM_ORG`: `punjabpolice: "Punjab Police (Pakistan) · Constable and Lady Constable recruitment",`
- Hub group, new, right after `{ title: "Pakistan driving tests", ids: ["pkdrive"] }`, shared with
  the other batch-3 Pakistan recruitment tests:
  `{ title: "Pakistan government and police recruitment tests", ids: ["ppsc", "punjabpolice", "pakarmy", "pkpaf"] },`
  (with three or more members no `RELATED_OVERRIDES` is needed; if it ships with fewer, add
  `punjabpolice: ["ppsc", "ngpolice", "police"],`).
- `SEARCH_ALIASES`:
  `punjabpolice: "punjab police constable test punjab police written test punjab police mcqs punjab police past papers lady constable test punjab police recruitment 2026 punjab police jobs constable bps 7 driver constable police order 2002 mcqs ppc crpc mcqs lahore police test rahim yar khan rajanpur police jobs punjabpolice gov pk",`

## lib/region.ts

- `TEST_REGIONS`: `punjabpolice: "PK",` (on the line with `pkdrive: "PK"`).
- `NON_DRIVING_TESTS`: add `"punjabpolice"`.
- `REGION_HOME.PK` gains non-driving tests in this batch (ppsc, punjabpolice, pakarmy, pkpaf and the
  licensing exams). The ppsc builder or the integrator should write one combined PK block; a line
  for this exam: "the Punjab Police constable written test (English, maths, Punjab, police law)".
  The CTA can stay on the driving test.

## lib/examFacts.ts

```ts
  punjabpolice: {
    answer:
      "The Punjab Police in Pakistan recruits Constables and Lady Constables (BPS-7) district by district, through advertisements issued from the Central Police Office in Lahore. In its 2025 and 2026 advertisements, applicants in settled areas had to be 18 to 22 with a Matric certificate of at least 50% marks, a domicile of the district and minimum height (and, for men, chest) measurements, with wider limits in the de-excluded areas of Dera Ghazi Khan and Rajanpur. Candidates are measured, run 1.6 km (7 minutes for men, 10 for women), and those who pass take a written examination; those who pass that are called for interview. Punjab Police does not publish the number of questions, the time, the subjects or a pass mark for the written test.",
    rows: [
      { label: "Run by", value: "Punjab Police (district recruitment committees)" },
      { label: "Posts", value: "Constable, Lady Constable (BPS-7); Driver Constable" },
      { label: "Stages", value: "Height and chest, 1.6 km race, written test, interview" },
      { label: "Questions and time", value: "Not published" },
      { label: "Subjects", value: "Not published" },
      { label: "Pass mark", value: "Not published" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
      { label: "Age (settled areas, 2025-2026)", value: "18 to 22" },
      { label: "Education", value: "Matric, at least 50% marks (settled areas)" },
    ],
    basedOn: "Punjab Police advertisements of 25 January 2025 and 31 October 2026 and its March 2025 notice on the written examinations, checked November 2026",
    source: { name: "Punjab Police", url: "https://punjabpolice.gov.pk/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

The brief does not list punjabpolice as teacher-led. The landing renders
`<ExamClassFaq examId="punjabpolice" />` and `classFaqJsonLd("punjabpolice")` as the ngpolice
template does (the component renders whatever the lists say). Integrator's choice: police test
coaching classes are common in Punjab, so either add
- `TEACHER_LED`: `"punjabpolice"`, and `TEACHES`: `punjabpolice: "a police test coaching class",`
or remove both `ExamClassFaq` lines from the landing.

## lib/tigerAssets.ts

`BORROWED_SETS`: `punjabpolice: "police",` (the police tiger, like ngpolice and the Indian state police exams).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `badge` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing punjabpolice:punjab-police-constable:20001`

## CLAUDE.md (after the Pakistan Driving Test bullet, or with the other batch-3 Pakistan bullets)

```md
- **Punjab Police Constable** (Punjab Police, Pakistan: Constable and Lady Constable written test, `/punjab-police-constable/*`, landing `/punjab-police-constable-practice-test`): `data/punjab-police-questions.json` (200 original questions: English grammar 28, vocabulary and spelling 24, mathematics 28, reasoning 20, Punjab geography and landmarks 28, the Police Order 2002 and Punjab Police Code of Conduct 28, PPC and CrPC basics 24, basic computers 20), test IDs 20001-20004 (50 questions each), sets 20001-20005 (by topic), state `PKPUNJPOL`, prefix `PJPOL-`, 70% pass (Tigertest's target: Punjab Police recruits BPS-7 constables district by district through height, chest, a 1.6 km race, a written examination and an interview, and publishes no question count, time or pass mark). 7/6/7/5/7/7/6/5 per test, no spares. GK lane in its batch: Punjab, police law (Police Order 2002 as promulgated, articles on duties, conduct and offences only) and computers; no Urdu, Islamiat, Pakistan Studies or current affairs. Built by `tools/next100/punjabpolice/build.py`; sources in `tools/next100/punjabpolice/sources.md`. Region PK, hub group "Pakistan government and police recruitment tests", borrows the police tiger.
```
