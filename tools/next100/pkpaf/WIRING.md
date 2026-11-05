# Wiring for `pkpaf` (Pakistan Air Force airman recruitment, initial academic and intelligence test, v1)

Files already written by the builder: `data/paf-airman-questions.json` (200, PASS), `lib/banks/pkpaf.ts`,
`app/paf-airman-test/*` (5 wrappers: layout, redirect, dashboard, drill, stats; copied from
`app/pak-army-test/`, which follows `app/nigerian-army-recruitment/`; the drill page also imports the
bank, as CLAUDE.md asks), `app/paf-airman-test-practice-test/page.tsx`, `tools/next100/pkpaf/*` (spec,
sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/pkpaf/build.py`. Everything
below goes in shared files.

Format note: the PAF publishes no syllabus, question count, time or pass mark for the airman tests
that Tigertest could read: joinpaf.gov.pk and paf.gov.pk returned HTTP 503 on 2026-11-05, and the
session's search budget ran out before a news report of the current advertisement could be found,
so nothing about the current intake (categories, ages, education, dates) is asserted anywhere.
Guides describe an academic test (English, maths, physics for technical trades) and verbal and
non-verbal intelligence tests at PAF Selection and Recruitment Centres, then a medical and an
interview; the landing and examFacts present that only as "candidates and guides describe".
Tigertest models four 50-question tests at a 70% target (35 of 50); weights are Tigertest's own.
Non-verbal items are written as text, and the landing says so. Pools are exactly 4x each per-test
count (no spares). Dashboard = 5 sets + 4 tests = 9 steps. No set over 60.

## lib/exams.ts

Add `"pkpaf"` to the `ExamId` union. Icon `medal` already exists.

```ts
const pkpaf: ExamConfig = {
  id: "pkpaf",
  stateCode: "PKPAF",
  idBase: 20400,
  slug: "/paf-airman-test",
  landingPath: "/paf-airman-test-practice-test",
  name: "PAF Airman Test Practice",
  shortName: "PAF airman test",
  examLabel: "PAF airman recruitment test",
  fullName: "Pakistan Air Force airman recruitment (initial) academic and intelligence test",
  questionIdPrefix: "PKPAF-",
  icon: "medal",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // The PAF publishes no syllabus, question count, time or pass mark for the airman tests that
  // could be read (joinpaf.gov.pk and paf.gov.pk returned 503 on 2026-11-05). Guides describe an
  // academic test (English, maths, physics for technical trades) and verbal and non-verbal
  // intelligence tests at PAF Selection and Recruitment Centres, then a medical and an interview.
  // Four 50-question tests at 70% (35 of 50) is Tigertest's target; weights are Tigertest's own.
  // Non-verbal items are written as text. GK is static: PAF ranks and institutions, aviation
  // basics, physics and electricity. Pools are exactly 4x each count (no spares). All items original.
  blueprint: {
    pkpafEnglish: 8,
    pkpafMaths: 9,
    pkpafPhysics: 8,
    pkpafElectronics: 3,
    pkpafVerbal: 7,
    pkpafNonVerbal: 5,
    pkpafAviation: 6,
    pkpafAirForce: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 20401, name: "English", categories: ["pkpafEnglish"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 20402, name: "Mathematics", categories: ["pkpafMaths"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 3, id: 20403, name: "Verbal & Non-Verbal Intelligence", categories: ["pkpafVerbal", "pkpafNonVerbal"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 20404, name: "Physics & Electricity", categories: ["pkpafPhysics", "pkpafElectronics"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 5, id: 20405, name: "Aviation & the Air Force", categories: ["pkpafAviation", "pkpafAirForce"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    pkpafEnglish: "English Grammar & Vocabulary",
    pkpafMaths: "Mathematics",
    pkpafPhysics: "Physics Basics",
    pkpafElectronics: "Electricity & Electronics",
    pkpafVerbal: "Verbal Intelligence",
    pkpafNonVerbal: "Non-Verbal Intelligence",
    pkpafAviation: "Aviation & Flight Basics",
    pkpafAirForce: "The Pakistan Air Force",
  },
  copy: {
    guestPrompt: "to save your PAF airman test progress and track every question you miss",
    trainingHeading: "Train by subject",
    trainingSub: "Five sets on the English, maths, physics, intelligence and aviation that the airman tests cover. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 35 or more",
    heroSubs: [
      "Five subjects, four 50-question tests.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Get ready for your centre.",
    ],
    sourceLine: "Original questions in the subjects the airman tests cover; the PAF publishes no format. 50 per test, 70% is Tigertest's target. Not affiliated with the Pakistan Air Force.",
    analyticsKey: "pkpaf",
  },
};
```

Append `pkpaf` to the `EXAMS` array after `pakarmy` (next to `ppsc` and `punjabpolice`, after `pkdrive`).

Check: 20401-20405 (sets) and 20401-20404 (tests) must be free (BRIEF reserves idBase 20400; grepped
`lib/exams.ts` on 2026-11-05: no 2040x ids).

## lib/banks/all.ts

```ts
import "./pkpaf";
```

## types/index.ts

- `QuestionType`: add `| "PKPAF"`.
- `QuestionCategory`, under a `// PAF airman test` comment:

```ts
  | "pkpafEnglish"
  | "pkpafMaths"
  | "pkpafPhysics"
  | "pkpafElectronics"
  | "pkpafVerbal"
  | "pkpafNonVerbal"
  | "pkpafAviation"
  | "pkpafAirForce"
```

(Keys grepped against `types/index.ts` and `i18n/en.ts` on 2026-11-05: no `pkpaf*` keys exist.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    pkpafEnglish: "English Grammar & Vocabulary",
    pkpafMaths: "Mathematics",
    pkpafPhysics: "Physics Basics",
    pkpafElectronics: "Electricity & Electronics",
    pkpafVerbal: "Verbal Intelligence",
    pkpafNonVerbal: "Non-Verbal Intelligence",
    pkpafAviation: "Aviation & Flight Basics",
    pkpafAirForce: "The Pakistan Air Force",
```

## app/globals.css

Hue from the brief's table, used as given: **205 70% 18%** (deep air force blue). Then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* PAF airman test theme */
  [data-theme="pkpaf"] {
    --brand: 205 70% 18%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 205 45% 95%;
    --brand-hover: 205 70% 14%;
    --brand-dark: 205 70% 12%;
    --brand-darker: 205 65% 8%;
    --brand-muted: 205 25% 65%;
    --brand-border: 205 25% 76%;
    --brand-border-light: 205 22% 88%;
    --brand-gradient-to: 190 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `pkpaf: "Four 50-question mock tests for the academic and intelligence tests in Pakistan Air Force airman recruitment: English, matric maths, physics, electricity, verbal and non-verbal intelligence, aviation and flight basics, and the PAF's ranks and institutions.",`
- `EXAM_ORG`: `pkpaf: "Pakistan Air Force · airman recruitment at PAF selection and recruitment centres",`
- Hub group (the same line ppsc, punjabpolice and pakarmy give), right after
  `{ title: "Pakistan driving tests", ids: ["pkdrive"] }`:
  `{ title: "Pakistan government and police recruitment tests", ids: ["ppsc", "punjabpolice", "pakarmy", "pkpaf"] },`
  (if pkpaf ships before two others, add `RELATED_OVERRIDES` `pkpaf: ["pakarmy", "afpsat", "asvab"],`).
- `SEARCH_ALIASES`:
  `pkpaf: "paf test paf airman test join paf airman pakistan air force airman test paf initial test paf aero apprentice test aero apprentice paf intelligence test verbal non verbal paf academic test paf selection and recruitment centre airman recruitment paf mcqs joinpaf",`

## lib/region.ts

- `TEST_REGIONS`: `pkpaf: "PK",` (on the line with `pkdrive: "PK"`).
- `NON_DRIVING_TESTS`: add `"pkpaf"`.

## lib/examFacts.ts

```ts
  pkpaf: {
    answer:
      "The Pakistan Air Force recruits airmen through its official recruitment portal and its selection and recruitment centres, which announce each intake in an advertisement. The PAF does not publish a syllabus, question count or pass mark for the airman tests. Candidates and guides describe an academic test at matric or intermediate level (English, mathematics, and physics for technical trades) and intelligence tests with verbal and non-verbal parts, followed by a medical and an interview. Categories, ages and education rules are set in each advertisement, so check the current one.",
    rows: [
      { label: "Run by", value: "Pakistan Air Force (PAF selection and recruitment centres)" },
      { label: "Registration", value: "Through the PAF's official recruitment portal, per each advertisement" },
      { label: "Written test content", value: "Not published; guides say English, maths, physics and verbal and non-verbal intelligence" },
      { label: "Pass mark", value: "Not published" },
      { label: "Airman training", value: "PAF Airmen Academy, Korangi, Karachi (since 2019)" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
    ],
    basedOn: "the PAF's rank structure and training institutions as documented in November 2026; joinpaf.gov.pk and paf.gov.pk did not load when checked",
    source: { name: "Join PAF", url: "https://joinpaf.gov.pk" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: the brief does not list pkpaf as teacher-led, and the landing has no `ExamClassFaq`.
(If wanted, as for pakarmy: add `pkpaf` to `TEACHER_LED` and `pkpaf: "a PAF test coaching class",` to `TEACHES`.)

## lib/tigerAssets.ts

`BORROWED_SETS`: `pkpaf: "asvab",` (like `pakarmy`, `ngarmy`, `nda` and `agniveer`; `agniveervayu`
also borrows asvab).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `medal` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing pkpaf:paf-airman-test:20401`

## CLAUDE.md (after the Pak Army bullet)

```md
- **PAF Airman Test** (`pkpaf`, Pakistan Air Force airman recruitment academic and intelligence test, `/paf-airman-test/*`, landing `/paf-airman-test-practice-test`): `data/paf-airman-questions.json` (200 original questions: English grammar and vocabulary 32, mathematics 36, physics basics 32, electricity and electronics 12, verbal intelligence 28, non-verbal intelligence written as text 20, aviation and flight basics 24, the Pakistan Air Force (ranks, academies, bases) 16), test IDs 20401-20404, sets 20401-20405 (by subject), state `PKPAF`, prefix `PKPAF-`, 70% pass (Tigertest's target: the PAF publishes no syllabus, count or pass mark that could be read; joinpaf.gov.pk and paf.gov.pk returned 503 when checked, and guides describe an academic test in English, maths and physics plus verbal and non-verbal intelligence at PAF selection and recruitment centres). 8/9/8/3/7/5/6/4 per test, no spares. GK lane in its batch: PAF ranks and institutions, aviation, physics and electricity; no current affairs, office-holders, conflicts or Kashmir. Built by `tools/next100/pkpaf/build.py`; sources in `tools/next100/pkpaf/sources.md`. Region PK, hub group "Pakistan government and police recruitment tests", `[data-theme="pkpaf"]` deep air force blue (205 70% 18%), borrows the ASVAB tiger.
```
