# Wiring for `phnapolcom` (NAPOLCOM PNP Entrance Examination, v1)

Files already written by the builder: `data/philippines-napolcom-questions.json` (200, PASS),
`lib/banks/phnapolcom.ts`, `app/napolcom-exam/*` (5 wrappers: layout, redirect, dashboard, drill,
stats, copied from `app/nigeria-police-recruitment/`), `app/napolcom-exam-reviewer-practice-test/page.tsx`,
`tools/next100/phnapolcom/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/phnapolcom/build.py`. Everything below goes in shared files.

Format note: NAPOLCOM's own announcement (June 30, 2024 exam, posted on its Region 6 site; the
national site blocks automated reads) gives the four subject areas, 3 hours, 8:00 to 11:00 A.M.,
objective multiple choice, and the qualifications (Filipino, bachelor's degree, 21 to 30 on exam
day; temporary Patrolmen/Patrolwomen without age limit). It gives no item count, subject split or
pass mark. Guides say 70% passes; that is Tigertest's target here and is labelled "guides say".
Latest sitting confirmed: April 19, 2026 (9,224 PNPE passers, NAPOLCOM release in The Manila
Times). Tigertest models four 50-question tests, pools exactly 4x each per-test count (no spares).
Dashboard = 5 topic sets + 4 tests = 9 steps. No set exceeds 60.

## lib/exams.ts

Add `"phnapolcom"` to the `ExamId` union. Icon `badge` already exists.

Block (with the Philippines exams, after `phlto` or the other batch-2 PH exams):

```ts
const phnapolcom: ExamConfig = {
  id: "phnapolcom",
  stateCode: "PHNAPOLCOM",
  idBase: 18900,
  slug: "/napolcom-exam",
  landingPath: "/napolcom-exam-reviewer-practice-test",
  name: "NAPOLCOM Exam Reviewer",
  shortName: "NAPOLCOM exam",
  examLabel: "PNP Entrance Exam",
  fullName: "NAPOLCOM PNP Entrance Examination (PNPE)",
  questionIdPrefix: "PHNAP-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Source: NAPOLCOM, PNP Entrance and Promotional Examinations Announcement (June 30, 2024 exam),
  // section X, Examination Coverage: three hours, objective multiple choice, four areas:
  // I. General Information/Uprightness (Philippine Constitution; PNP laws R.A. 6975 and R.A. 8551
  // as amended; criminal justice system; social awareness and value judgment; values),
  // II. Verbal Reasoning (synonyms, antonyms; paragraph organization, reading comprehension;
  // correct usage), III. Quantitative Reasoning (percentage, fraction, number series; problem
  // solving, bar graph interpretation), IV. Logical Reasoning (verbal, non-verbal). NAPOLCOM
  // publishes no item count, split or pass mark; the weights are Tigertest's own (general
  // information 14, verbal 16, quantitative 13, logical 7 per test) and 70% follows guides.
  // Latest sitting checked: April 19, 2026. Checked 2026-11-05. All items original.
  blueprint: {
    phnapVocab: 6,
    phnapReading: 5,
    phnapGrammar: 5,
    phnapNumber: 7,
    phnapProblems: 6,
    phnapLogic: 7,
    phnapConstitution: 6,
    phnapPnpLaw: 5,
    phnapValues: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 18901, name: "Vocabulary & Grammar", categories: ["phnapVocab", "phnapGrammar"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 2, id: 18902, name: "Reading & Logical Reasoning", categories: ["phnapReading", "phnapLogic"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 18903, name: "Quantitative Reasoning", categories: ["phnapNumber", "phnapProblems"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 4, id: 18904, name: "Constitution & Criminal Justice", categories: ["phnapConstitution"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 5, id: 18905, name: "PNP Laws & Values", categories: ["phnapPnpLaw", "phnapValues"], size: 32, weightLabel: "8 of 50 test questions" },
  ],
  categoryLabels: {
    phnapVocab: "Verbal: Vocabulary",
    phnapReading: "Verbal: Paragraph Organization & Reading",
    phnapGrammar: "Verbal: Grammar & Correct Usage",
    phnapNumber: "Quantitative: Percentages, Fractions & Number Series",
    phnapProblems: "Quantitative: Problem Solving & Bar Graphs",
    phnapLogic: "Logical Reasoning",
    phnapConstitution: "Philippine Constitution & Criminal Justice",
    phnapPnpLaw: "PNP Laws (R.A. 6975 & R.A. 8551)",
    phnapValues: "Values & Social Awareness",
  },
  copy: {
    guestPrompt: "to save your NAPOLCOM exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the general information, verbal, quantitative and logical reasoning the PNP Entrance Examination covers. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions, aim for 35 or more",
    heroSubs: [
      "Five topics, four 50-question mock exams. Start with the math.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. Bring your Notice of Admission and go.",
    ],
    sourceLine: "Based on the four subject areas in NAPOLCOM's PNP Entrance Examination announcement, the 1987 Constitution, R.A. 6975 and R.A. 8551. Original questions; 50 per test, 70% is Tigertest's target.",
    analyticsKey: "phnapolcom",
  },
};
```

Append `phnapolcom` to the `EXAMS` array (with the other PH exams). Check: 18901-18905 (sets) and
18901-18904 (tests) are free (BRIEF reserves idBase 18900; grepped `lib/exams.ts` on 2026-11-05).

## lib/banks/all.ts

```ts
import "./phnapolcom";
```

## types/index.ts

- `QuestionType`: add `| "PHNAPOLCOM"`.
- `QuestionCategory`, under a `// NAPOLCOM PNP Entrance Examination` comment:

```ts
  | "phnapVocab"
  | "phnapReading"
  | "phnapGrammar"
  | "phnapNumber"
  | "phnapProblems"
  | "phnapLogic"
  | "phnapConstitution"
  | "phnapPnpLaw"
  | "phnapValues"
```

(Keys grepped against `types/index.ts` on 2026-11-05: no `phnap*` keys exist.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    phnapVocab: "Verbal: Vocabulary",
    phnapReading: "Verbal: Paragraph Organization & Reading",
    phnapGrammar: "Verbal: Grammar & Correct Usage",
    phnapNumber: "Quantitative: Percentages, Fractions & Number Series",
    phnapProblems: "Quantitative: Problem Solving & Bar Graphs",
    phnapLogic: "Logical Reasoning",
    phnapConstitution: "Philippine Constitution & Criminal Justice",
    phnapPnpLaw: "PNP Laws (R.A. 6975 & R.A. 8551)",
    phnapValues: "Values & Social Awareness",
```

## app/globals.css

Hue from the brief (225 70% 20%, checked by the brief's script). Then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* NAPOLCOM PNP Entrance Examination theme */
  [data-theme="phnapolcom"] {
    --brand: 225 70% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 225 55% 95%;
    --brand-hover: 225 70% 16%;
    --brand-dark: 225 70% 14%;
    --brand-darker: 225 65% 10%;
    --brand-muted: 225 30% 68%;
    --brand-border: 225 30% 78%;
    --brand-border-light: 225 28% 88%;
    --brand-gradient-to: 215 45% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `phnapolcom: "NAPOLCOM reviewer for the PNP Entrance Examination: four 50-question mock exams on the 1987 Constitution, R.A. 6975 and R.A. 8551, the criminal justice system, values, vocabulary, reading, grammar, percentages, number series, bar graphs and logical reasoning.",`
- `EXAM_ORG`: `phnapolcom: "National Police Commission (NAPOLCOM) · PNP Entrance Examination",`
- Hub group, new, right after "Philippines government and licensure exams", shared with the batch-2
  peers: `{ title: "Philippines police, military and criminology exams", ids: ["phnapolcom", "afpsat", "phcle"] },`
  (with three members no `RELATED_OVERRIDES` is needed; if it ships before its peers, add
  `phnapolcom: ["phcse", "phlto", "police"],`).
- `SEARCH_ALIASES`:
  `phnapolcom: "napolcom napolcom exam napolcom reviewer pnp entrance exam pnp entrance examination pnpe pnpee police entrance exam philippines patrolman eligibility patrolwoman police eligibility exam napolcom exam 2026 napolcom practice test pnp exam reviewer national police commission exam",`

## lib/region.ts

```ts
// TEST_REGIONS: on the PH entry (next to phlto, phcse, phlet)
  phnapolcom: "PH",
// NON_DRIVING_TESTS: add
  "phnapolcom",
```

## lib/examFacts.ts

```ts
  phnapolcom: {
    answer:
      "The PNP Entrance Examination (PNPE) is given nationwide by the National Police Commission (NAPOLCOM), the latest confirmed sitting was on April 19, 2026, when 9,224 examinees passed it. It is an objective, multiple-choice paper with three hours allotted (8:00 to 11:00 A.M.) on four areas: general information and uprightness (the Constitution, R.A. 6975 and R.A. 8551, the criminal justice system, values), verbal reasoning, quantitative reasoning and logical reasoning. Passing confers the police eligibility needed for appointment as Patrolman or Patrolwoman. Civilian applicants must have a bachelor's degree and be 21 to 30 years old on exam day. NAPOLCOM does not publish the number of items or the passing score; guides say 70%.",
    rows: [
      { label: "Run by", value: "National Police Commission (NAPOLCOM)" },
      { label: "Format", value: "Objective multiple choice" },
      { label: "Time", value: "3 hours (8:00 to 11:00 A.M.)" },
      { label: "Areas", value: "General information, verbal, quantitative, logical reasoning" },
      { label: "Number of items", value: "Not published" },
      { label: "Passing score", value: "Not published (guides: 70%)" },
      { label: "Tigertest mock exams", value: "4 x 50 questions, 70% target" },
      { label: "Civilian applicants", value: "Bachelor's degree, age 21 to 30 on exam day" },
      { label: "Passing gives", value: "Police eligibility for Patrolman/Patrolwoman" },
    ],
    basedOn: "NAPOLCOM's PNP Entrance and Promotional Examinations Announcement (June 30, 2024 exam) and NAPOLCOM's April 2026 results release, checked November 2026",
    source: { name: "National Police Commission", url: "https://www.napolcom.gov.ph/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: the brief lists only the PRC board exams and `phcle` as teacher-led. The landing does not
render `ExamClassFaq`. (Review centers do run NAPOLCOM classes; if the integrator adds it to
`TEACHER_LED`, add `TEACHES: phnapolcom: "a NAPOLCOM review class",` and put
`<ExamClassFaq examId="phnapolcom" />` plus `classFaqJsonLd("phnapolcom")` back in the landing as
`app/nigeria-police-recruitment-practice-test/page.tsx` does.)

## lib/tigerAssets.ts

`BORROWED_SETS`: `phnapolcom: "police",` (the police tiger, like `ngpolice` and the Indian police exams).

## lib/region.ts home copy (optional)

If the `/ph` homepage lists its exams in `REGION_HOME`/`faqsFor("PH")` by name, add "the NAPOLCOM
PNP Entrance Exam" next to the Civil Service Exam and the LET.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `badge` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing phnapolcom:napolcom-exam:18901`

## CLAUDE.md (with the other Philippines exams, after the LET Reviewer bullet or the batch-2 PH bullets)

```md
- **NAPOLCOM Exam** (NAPOLCOM PNP Entrance Examination, PNPE, `/napolcom-exam/*`, landing `/napolcom-exam-reviewer-practice-test`): `data/philippines-napolcom-questions.json` (200 original questions on the four areas of NAPOLCOM's exam coverage: vocabulary 24, paragraph organization and reading 20, grammar and correct usage 20, percentages, fractions and number series 28, problem solving and bar graphs 24, logical reasoning (verbal and non-verbal in text) 28, the 1987 Constitution and the criminal justice system 24, PNP laws R.A. 6975, R.A. 8551 and R.A. 11200 20, values and social awareness 12), test IDs 18901-18904 (50 questions each), sets 18901-18905 (by topic), state `PHNAPOLCOM`, prefix `PHNAP-`, 70% pass (guides; NAPOLCOM publishes no item count, split or pass mark; its announcement gives 3 hours, 8 to 11 A.M., objective multiple choice; latest sitting April 19, 2026). 6/5/5/7/6/7/6/5/3 per test, Tigertest's split, no spares. No current events, office-holders, fees or heights; bar graphs and figures described in words. Kept clear of `ngpolice`, `police`, `phcse` and the batch-2 peer `phcle` (items on facts phcle asks were rewritten). Built by `tools/next100/phnapolcom/build.py`; sources in `tools/next100/phnapolcom/sources.md`. Region PH, hub group "Philippines police, military and criminology exams", `[data-theme="phnapolcom"]` deep police navy (225 70% 20%), borrows the police tiger.
```
