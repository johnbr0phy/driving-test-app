# Wiring for `pakarmy` (Pakistan Army soldier recruitment, initial written and intelligence test, v1)

Files already written by the builder: `data/pak-army-questions.json` (200, PASS), `lib/banks/pakarmy.ts`,
`app/pak-army-test/*` (5 wrappers: layout, redirect, dashboard, drill, stats; copied from
`app/nigerian-army-recruitment/`), `app/pak-army-initial-test-practice-test/page.tsx`,
`tools/next100/pakarmy/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/pakarmy/build.py`. Everything below goes in shared files.

Format note: the Pakistan Army publishes no syllabus, question count, time or pass mark for the
soldier written test. The Associated Press of Pakistan's report on the September to November 2025
drive lists the selection process as a written test, physical and medical tests and an interview at
the Army Selection and Recruitment Centres (AS&RC). Guides describe verbal and non-verbal
intelligence sections plus matric-level MCQs (English, maths, GK, Islamiat, Pakistan studies), with
conflicting counts and times. joinpakarmy.gov.pk did not load (503 / connection reset). Tigertest
models four 50-question tests at a 70% target (35 of 50); weights are Tigertest's own. The
non-verbal (picture) section is written as text patterns, and the landing says so. Pools are
exactly 4x each per-test count (no spares). Dashboard = 5 sets + 4 tests = 9 steps. No set over 60.

## lib/exams.ts

Add `"pakarmy"` to the `ExamId` union. Icon `medal` already exists.

```ts
const pakarmy: ExamConfig = {
  id: "pakarmy",
  stateCode: "PKARMY",
  idBase: 20100,
  slug: "/pak-army-test",
  landingPath: "/pak-army-initial-test-practice-test",
  name: "Pak Army Initial Test Practice",
  shortName: "Pak Army test",
  examLabel: "Pak Army soldier initial test",
  fullName: "Pakistan Army soldier recruitment (initial) written and intelligence test",
  questionIdPrefix: "PKARMY-",
  icon: "medal",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // The Pakistan Army publishes no syllabus, question count, time or pass mark for the soldier
  // written test. Registration is online at joinpakarmy.gov.pk or at an Army Selection and
  // Recruitment Centre; APP's report on the 2025 drive gives the selection process as a written
  // test, physical and medical tests and an interview. Guides describe verbal and non-verbal
  // intelligence sections and matric-level academic MCQs (English, maths, GK, Islamiat, Pakistan
  // studies), with conflicting counts and times. Four 50-question tests at 70% (35 of 50) is
  // Tigertest's target; weights are Tigertest's own. Non-verbal items are written as text.
  // GK is static: Army ranks, corps and institutions, everyday science, Islamiat, national
  // symbols. Checked 2026-11-05. Pools are exactly 4x each count (no spares). All items original.
  blueprint: {
    pkarmyEnglish: 8,
    pkarmyMaths: 8,
    pkarmyVerbal: 7,
    pkarmyNonVerbal: 5,
    pkarmyScience: 8,
    pkarmyArmy: 7,
    pkarmyIslamiat: 4,
    pkarmyPakistan: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 20101, name: "English", categories: ["pkarmyEnglish"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 20102, name: "Mathematics", categories: ["pkarmyMaths"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 3, id: 20103, name: "Verbal & Non-Verbal Intelligence", categories: ["pkarmyVerbal", "pkarmyNonVerbal"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 20104, name: "Everyday Science & First Aid", categories: ["pkarmyScience"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 5, id: 20105, name: "The Army, Islamiat & Pakistan", categories: ["pkarmyArmy", "pkarmyIslamiat", "pkarmyPakistan"], size: 56, weightLabel: "14 of 50 test questions" },
  ],
  categoryLabels: {
    pkarmyEnglish: "English Grammar & Vocabulary",
    pkarmyMaths: "Mathematics",
    pkarmyVerbal: "Verbal Intelligence",
    pkarmyNonVerbal: "Non-Verbal Intelligence",
    pkarmyScience: "Everyday Science & First Aid",
    pkarmyArmy: "The Pakistan Army",
    pkarmyIslamiat: "Islamic Studies",
    pkarmyPakistan: "Pakistan General Knowledge",
  },
  copy: {
    guestPrompt: "to save your Pak Army test progress and track every question you miss",
    trainingHeading: "Train by subject",
    trainingSub: "Five sets on the English, maths, intelligence and general knowledge that the soldier initial test covers. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 35 or more",
    heroSubs: [
      "Five subjects, four 50-question tests.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Get ready for your centre.",
    ],
    sourceLine: "Original questions in the subjects the soldier test covers; the Army publishes no format. 50 per test, 70% is Tigertest's target. Not affiliated with the Pakistan Army.",
    analyticsKey: "pakarmy",
  },
};
```

Append `pakarmy` to the `EXAMS` array next to `ppsc` and `punjabpolice` (after `pkdrive`).

Check: 20101-20105 (sets) and 20101-20104 (tests) must be free (BRIEF reserves idBase 20100).

## lib/banks/all.ts

```ts
import "./pakarmy";
```

## types/index.ts

- `QuestionType`: add `| "PKARMY"`.
- `QuestionCategory`, under a `// Pak Army soldier initial test` comment:

```ts
  | "pkarmyEnglish"
  | "pkarmyMaths"
  | "pkarmyVerbal"
  | "pkarmyNonVerbal"
  | "pkarmyScience"
  | "pkarmyArmy"
  | "pkarmyIslamiat"
  | "pkarmyPakistan"
```

(Keys grepped against `types/index.ts` and `i18n/en.ts` on 2026-11-05: no `pkarmy*` keys exist.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    pkarmyEnglish: "English Grammar & Vocabulary",
    pkarmyMaths: "Mathematics",
    pkarmyVerbal: "Verbal Intelligence",
    pkarmyNonVerbal: "Non-Verbal Intelligence",
    pkarmyScience: "Everyday Science & First Aid",
    pkarmyArmy: "The Pakistan Army",
    pkarmyIslamiat: "Islamic Studies",
    pkarmyPakistan: "Pakistan General Knowledge",
```

## app/globals.css

Hue from the brief's table, used as given: **95 70% 18%** (deep army green). Then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Pak Army soldier initial test theme */
  [data-theme="pakarmy"] {
    --brand: 95 70% 18%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 95 45% 95%;
    --brand-hover: 95 70% 14%;
    --brand-dark: 95 70% 12%;
    --brand-darker: 95 65% 8%;
    --brand-muted: 95 25% 65%;
    --brand-border: 95 25% 76%;
    --brand-border-light: 95 22% 88%;
    --brand-gradient-to: 80 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `pakarmy: "Four 50-question mock tests for the written and intelligence test in Pakistan Army soldier recruitment: English, matric maths, verbal and non-verbal intelligence, everyday science and first aid, the Army's ranks, corps and institutions, Islamic studies and Pakistan general knowledge.",`
- `EXAM_ORG`: `pakarmy: "Pakistan Army · soldier recruitment at Army Selection and Recruitment Centres",`
- Hub group, new, right after `{ title: "Pakistan driving tests", ids: ["pkdrive"] }` (the same line
  ppsc's and punjabpolice's WIRING.md give):
  `{ title: "Pakistan government and police recruitment tests", ids: ["ppsc", "punjabpolice", "pakarmy", "pkpaf"] },`
  (if pakarmy ships before two others, add `RELATED_OVERRIDES` `pakarmy: ["pkdrive", "ngarmy", "asvab"],`).
- `SEARCH_ALIASES`:
  `pakarmy: "pak army test join pak army pakistan army soldier test pak army initial test pak army intelligence test verbal non verbal intelligence test sipahi test soldier general duty gd soldier clerk test army selection and recruitment centre asrc pak army written test mcqs pak army test preparation joinpakarmy",`

## lib/region.ts

- `TEST_REGIONS`: `pakarmy: "PK",` (on the line with `pkdrive: "PK"`).
- `NON_DRIVING_TESTS`: add `"pakarmy"`.

## lib/examFacts.ts

```ts
  pakarmy: {
    answer:
      "The Pakistan Army recruits soldiers (General Duty, Technical, Driver, Military Police, Clerk, Cook and other categories) through registration online at joinpakarmy.gov.pk or in person at an Army Selection and Recruitment Centre or regimental centre. The Associated Press of Pakistan's report on the 2025 drive listed the selection process as a written test, physical and medical tests and an interview at the selection and recruitment centres. The Army does not publish a syllabus, question count or pass mark for the written test; candidates and guides describe verbal and non-verbal intelligence sections and matric-level multiple-choice questions on English, mathematics, general knowledge, Islamiat and Pakistan studies. For the drive with registration from 1 September to 23 November 2026, most soldier categories took candidates aged 17½ to 23 with at least Matric (Intermediate for clerks), as reported in the news.",
    rows: [
      { label: "Run by", value: "Pakistan Army (Army Selection and Recruitment Centres)" },
      { label: "Registration", value: "Online at joinpakarmy.gov.pk or in person at an AS&RC" },
      { label: "Selection stages", value: "Written test, physical and medical tests, interview" },
      { label: "Written test content", value: "Not published; guides say verbal and non-verbal intelligence plus matric-level MCQs" },
      { label: "Pass mark", value: "Not published" },
      { label: "Age (most soldier categories, 2026 drive)", value: "17½ to 23, with relaxations for some areas" },
      { label: "Education (2026 drive)", value: "Matric for General Duty; Intermediate for Clerk" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
    ],
    basedOn: "the Associated Press of Pakistan's report on the 2025 soldier recruitment drive and news reports of the 2026 advertisement, checked November 2026 (joinpakarmy.gov.pk did not load)",
    source: { name: "Join Pak Army", url: "https://www.joinpakarmy.gov.pk" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: the brief does not list pakarmy as teacher-led, and the landing has no `ExamClassFaq`.
(Coaching academies do prepare recruits; if wanted, add `pakarmy` to `TEACHER_LED` and
`pakarmy: "a Pak Army test coaching class",` to `TEACHES`.)

## lib/tigerAssets.ts

`BORROWED_SETS`: `pakarmy: "asvab",` (like `ngarmy`, `nda` and `agniveer`).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `medal` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing pakarmy:pak-army-test:20101`

## CLAUDE.md (after the PPSC and Punjab Police bullets)

```md
- **Pak Army Initial Test** (`pakarmy`, Pakistan Army soldier recruitment written and intelligence test, `/pak-army-test/*`, landing `/pak-army-initial-test-practice-test`): `data/pak-army-questions.json` (200 original questions: English grammar and vocabulary 32, mathematics 32, verbal intelligence 28, non-verbal intelligence written as text 20, everyday science and first aid 32, the Pakistan Army (ranks, corps, institutions, map and radio basics) 28, Islamic studies 16, Pakistan general knowledge 12), test IDs 20101-20104, sets 20101-20105 (by subject), state `PKARMY`, prefix `PKARMY-`, 70% pass (Tigertest's target: the Army publishes no syllabus, count or pass mark; APP lists a written test, physical and medical tests and an interview at the Army Selection and Recruitment Centres; guides describe verbal and non-verbal intelligence plus matric-level MCQs, and joinpakarmy.gov.pk did not load when checked). 8/8/7/5/8/7/4/3 per test, no spares. GK lane in its batch: the Army, everyday science, mainstream Islamiat and national symbols; no current affairs, office-holders, conflicts or Kashmir. Built by `tools/next100/pakarmy/build.py`; sources in `tools/next100/pakarmy/sources.md`. Region PK, hub group "Pakistan government and police recruitment tests", `[data-theme="pakarmy"]` deep army green (95 70% 18%), borrows the ASVAB tiger.
```
