# Wiring for `kenck` (Nursing Council of Kenya licensure exam, registered nurse, v1, region KE)

Files already written by the builder: `data/kenya-nursing-council-questions.json` (200, PASS,
key-longest 3%, key>1.2x 2%), `lib/banks/kenck.ts`, `app/kenya-nursing-council/*` (layout,
redirect, dashboard, drill, stats, copied from `app/llqp/`; no test or practice folders, the shared
`app/[slug]` routes serve them), `app/nursing-council-of-kenya-exam-practice-test/page.tsx`,
`tools/next100/kenck/*` (spec, sources, `q_*.py`, `build.py`, this file). Everything below goes in
shared files.

Format note: the Nursing Council of Kenya (NCK) runs its licensure exam online at designated
regional centres. Its "Instructions and schedules for 2026 and 2027 licensure examinations" give
two papers of two hours each (9 to 11 am and 2 to 4 pm on one day) for KRCHN, BScN, KRN/M and
KRN/MH, with a compulsory rehearsal and two mock exams first. The Council publishes no question
count, no numeric pass mark ("satisfy the Board of Examiners on each paper") and no topic weights;
its examination page lists MCQ, short-answer and long-answer questions. Here: four 50-question mixed
mock tests (Tigertest's blueprint over general nursing, midwifery and community health), DMV-style
sets (Set N = Test N), 8 dashboard steps, 60% as Tigertest's readiness target (like `gulfrn`).
Short and long answers are not modelled; the landing says so.

## lib/exams.ts

Add `"kenck"` to the `ExamId` union. Icon `stethoscope` already exists.

```ts
const kenck: ExamConfig = {
  id: "kenck",
  stateCode: "KENCK",
  idBase: 18700,
  slug: "/kenya-nursing-council",
  landingPath: "/nursing-council-of-kenya-exam-practice-test",
  name: "Nursing Council of Kenya Exam Practice Test",
  shortName: "NCK Exam",
  examLabel: "NCK licensure exam",
  fullName: "Nursing Council of Kenya Licensure Examination (registered nurse)",
  questionIdPrefix: "KENCK-",
  icon: "stethoscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  // Nursing Council of Kenya licensure exam (checked November 2026): online at regional centres;
  // KRCHN, BScN, KRN/M and KRN/MH sit two 2-hour papers on one day (NCK Instructions and Schedules
  // for 2026 and 2027 Licensure Examinations). NCK publishes no question count, pass mark or
  // blueprint, so this split over general nursing, midwifery and community health is Tigertest's,
  // and 60% is a readiness target. Kenyan MoH and WHO guidelines and Kenyan law. All items original.
  blueprint: {
    kenckFund: 7,
    kenckPharm: 4,
    kenckMedSurg: 9,
    kenckMidwifery: 8,
    kenckRepro: 3,
    kenckPaeds: 6,
    kenckCommunity: 6,
    kenckMental: 3,
    kenckLaw: 4,
  },
  trainingSets: testSets(18700, 4),
  categoryLabels: {
    kenckFund: "Fundamentals of Nursing",
    kenckPharm: "Pharmacology & Dosage",
    kenckMedSurg: "Medical-Surgical Nursing",
    kenckMidwifery: "Midwifery & Newborn Care",
    kenckRepro: "Reproductive Health",
    kenckPaeds: "Child Health & IMCI",
    kenckCommunity: "Community Health & PHC",
    kenckMental: "Mental Health Nursing",
    kenckLaw: "Law, Ethics & Leadership",
  },
  copy: {
    guestPrompt: "to save your NCK exam progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all nine topics. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 60% readiness line",
    heroSubs: [
      "Nine topics, four mock tests. Midwifery and med-surg are the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your NCK papers.",
    ],
    sourceLine: "Based on Kenyan Ministry of Health and WHO guidelines and Kenyan nursing law. Original questions; the Council publishes no question count or pass mark, so 60% is a readiness target. Not affiliated with the Nursing Council of Kenya.",
    analyticsKey: "kenck",
  },
};
```

Append `kenck` to the `EXAMS` array after `gulfrn` (or after `kentsa`). Dashboard: 4 sets + 4 tests
= 8 steps. Check: 18701-18704 (tests and sets) must be free (the batch assigns 18700).

## lib/banks/all.ts

```ts
import "./kenck";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/kenck.ts`.

## types/index.ts

- `QuestionType`: add `| "KENCK"`.
- `QuestionCategory`, under a `// Nursing Council of Kenya licensure exam` comment:

```ts
  | "kenckFund"
  | "kenckPharm"
  | "kenckMedSurg"
  | "kenckMidwifery"
  | "kenckRepro"
  | "kenckPaeds"
  | "kenckCommunity"
  | "kenckMental"
  | "kenckLaw"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    kenckFund: "Fundamentals of Nursing",
    kenckPharm: "Pharmacology & Dosage",
    kenckMedSurg: "Medical-Surgical Nursing",
    kenckMidwifery: "Midwifery & Newborn Care",
    kenckRepro: "Reproductive Health",
    kenckPaeds: "Child Health & IMCI",
    kenckCommunity: "Community Health & PHC",
    kenckMental: "Mental Health Nursing",
    kenckLaw: "Law, Ethics & Leadership",
```

## app/globals.css

Hue from the international batch 1 table (160 55% 22%, already checked). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Nursing Council of Kenya licensure exam theme */
  [data-theme="kenck"] {
    --brand: 160 55% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 160 45% 95%;
    --brand-hover: 160 55% 18%;
    --brand-dark: 160 55% 16%;
    --brand-darker: 160 50% 11%;
    --brand-muted: 160 25% 68%;
    --brand-border: 160 25% 78%;
    --brand-border-light: 160 22% 88%;
    --brand-gradient-to: 175 45% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `kenck: "Practice for the Nursing Council of Kenya licensure exam (KRCHN, BScN, KRN/M): fundamentals, med-surg with malaria, TB and HIV, midwifery and newborn care, IMCI, community health and Kenyan nursing law, with drug calculations.",`
- `EXAM_ORG`: `kenck: "Nursing Council of Kenya · registered nurse licensure exam",`
- Hub group: new group `{ title: "Kenya licensing exams", ids: ["kenck"] }` right after
  `{ title: "Kenya driving tests", ids: ["kentsa"] }` (the brief's name). Alternative if the
  integrator prefers no one-exam group: append `"kenck"` to "International nurse licensing exams"
  after `"gulfrn"`.
- `SEARCH_ALIASES`:
  `kenck: "nck exam nursing council of kenya nck licensure exam nck licensing exam kenya nursing exam krchn bscn krn/m krn kenya registered community health nurse nurse midwife kenya kmtc nursing nck past papers nck revision questions nck results nck portal registered nurse kenya licence",`
- `RELATED_OVERRIDES` (a one-exam group needs padding): `kenck: ["gulfrn", "uknmc", "nclex"],`

## lib/region.ts

- `TEST_REGIONS`: `kenck: "KE",` (next to `kentsa: "KE"`), and add `"kenck"` to `NON_DRIVING_TESTS`.
- `REGION_HOME.KE` now has a second, non-driving test. Suggested update (same shape; the CTA stays
  on the driving test, which has more searches, or switch it to the nursing exam):

```ts
  KE: {
    title: "Free Kenya Practice Tests: NTSA Driving Test & NCK Nursing Exam | Tigertest",
    description: "Free practice tests for Kenya: the NTSA driving test on the Highway Code and Traffic Act, and the Nursing Council of Kenya licensure exam, every answer explained. No account needed.",
    lead: "Practice for the theory part of the NTSA driving test and the Nursing Council of Kenya licensure exam. Original questions, every answer explained. No signup.",
    cta: { label: "NTSA driving test", href: "/kenya-ntsa-driving-test" },
    testsTitle: "NTSA driving test",
    testsSub: "200 questions on the Kenya Highway Code, in km/h for left-hand traffic. Four full 50-question tests.",
  },
```

- `faqsFor` in `components/home/HomePage.tsx` counts non-driving tests on its own; `AUTHORITY.KE`
  ("the NTSA") stays, since it only describes the driving tests. `lib/regionHeadline.ts` builds from
  hub groups, so the new group appears without a change.

## lib/examFacts.ts

```ts
  kenck: {
    answer:
      "The Nursing Council of Kenya (NCK) licensure examination is the exam a nurse or midwife must pass before the Council registers and licenses them to practise in Kenya. It is taken online at designated regional centres in series in August, November and May. Under the Council's 2026 and 2027 schedule, registered nurse candidates (KRCHN, BScN, KRN/M and KRN/MH) sit two papers on one day, each lasting two hours, after a compulsory rehearsal and two mock exams. The Council does not publish the number of questions or a numeric pass mark: each paper must satisfy its Board of Examiners.",
    rows: [
      { label: "Run by", value: "Nursing Council of Kenya" },
      { label: "Papers", value: "2 for KRCHN, BScN, KRN/M and KRN/MH; 1 for post-basic specialties" },
      { label: "Time", value: "2 hours per paper" },
      { label: "Delivery", value: "Online, at designated regional centres" },
      { label: "Questions", value: "Not published; MCQ, short and long answer" },
      { label: "Pass mark", value: "Not published; satisfy the Board of Examiners" },
      { label: "Next series", value: "November 2026 (results 11 December 2026), then May 2027" },
    ],
    basedOn: "NCK Instructions and Schedules for 2026 and 2027 Licensure Examinations and the NCK examination page, checked November 2026",
    source: { name: "Nursing Council of Kenya: Examination", url: "https://nckenya.com/examination/" },
  },
```
(Resit limits, fees and eligibility rules are left out.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"kenck"` to `TEACHER_LED` (nursing colleges such as KMTC campuses run NCK revision classes)
and in `TEACHES`: `kenck: "a nursing college class",`. The landing already renders
`<ExamClassFaq examId="kenck" />` and `classFaqJsonLd("kenck")`.

## lib/tigerAssets.ts

Borrow the nursing tiger through `BORROWED_SETS`: `kenck: "nclex",` (as `gulfrn` and `uknmc` do).

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/classQuestions.ts

Nothing: `stethoscope` exists, sitemaps map over `EXAMS`, no redirects, v1 banks load through
`lib/banks/all.ts`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 50 each, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing kenck:kenya-nursing-council:18701`

## CLAUDE.md (under Additional Exams, after the Kenya NTSA bullet)

```md
- **NCK Exam** (Nursing Council of Kenya licensure examination, registered nurse: KRCHN, BScN, KRN/M, `/kenya-nursing-council/*`, landing `/nursing-council-of-kenya-exam-practice-test`): `data/kenya-nursing-council-questions.json` (200 original questions: fundamentals 28, pharmacology and dosage 16, medical-surgical (malaria, TB, HIV, sickle cell, snakebite, burns) 36, midwifery and newborn care 32, reproductive health 12, child health and IMCI 24, community health and PHC (KEPH levels, community health promoters, WASH, neglected tropical diseases) 24, mental health 12, law, ethics and leadership 16), test IDs 18701-18704, sets 18701-18704 (`testSets`, one per test), state `KENCK`, prefix `KENCK-`, 60% readiness line (the Council publishes no question count or pass mark; registered nurse candidates sit two 2-hour papers online at regional centres per the 2026-2027 schedule; short and long answers not modelled). 7/4/9/8/3/6/6/3/4 per test, Tigertest's split. Kenyan MoH and WHO guidelines (AL, IV artesunate, GeneXpert, TLD, KEPI, IMCI, WHO ANC and PPH) and Kenyan law (Nurses and Midwives Act Cap 257, Constitution Art. 43, Children Act 2022, Data Protection Act 2019, FGM Act 2011, PHC Act 2023); British spelling, Kenyan drug names. Kept clear of `gulfrn`, `cna` and the v2 nursing banks. Built by `tools/next100/kenck/build.py`; sources in `tools/next100/kenck/sources.md`. Region KE, hub group "Kenya licensing exams", `[data-theme="kenck"]` deep green (160 55% 22%), borrows the NCLEX tiger, teacher-led (nursing colleges).
```
