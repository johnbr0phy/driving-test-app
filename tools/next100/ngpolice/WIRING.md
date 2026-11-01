# Wiring for `ngpolice` (Nigeria Police Force constable recruitment aptitude test, v1)

Files already written by the builder: `data/nigeria-police-questions.json` (200, PASS),
`lib/banks/ngpolice.ts`, `app/nigeria-police-recruitment/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/nigeria-police-recruitment-practice-test/page.tsx`,
`tools/next100/ngpolice/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/ngpolice/build.py`. Everything below goes in shared files.

Format note: the Police Service Commission publishes no question count, time, subject split or
pass mark for the constable aptitude test (a CBT; JAMB ran it in 2024; the 2025/2026 exercise sat
it on 28 to 30 April 2026). Guides report 60 to 100 questions in 30 to 60 minutes on English,
mathematics, general knowledge and current affairs. Tigertest models four 50-question tests at a
70% target (35 of 50). Pools are exactly 4x each per-test count (no spares). Dashboard = 5 topic
sets + 4 tests = 9 steps. No set exceeds 60. GK lane for this batch: civics, the 1999
Constitution, rights and policing; no current affairs (the landing says so).

## lib/exams.ts

Add `"ngpolice"` to the `ExamId` union. Icon `badge` already exists (the US `police` exam uses it).

Block (after `ngfrsc`, or with the other batch-5 Nigeria recruitment exams):

```ts
const ngpolice: ExamConfig = {
  id: "ngpolice",
  stateCode: "NGPOLICE",
  idBase: 13200,
  slug: "/nigeria-police-recruitment",
  landingPath: "/nigeria-police-recruitment-practice-test",
  name: "Nigeria Police Recruitment Practice Test",
  shortName: "Nigeria Police test",
  examLabel: "Nigeria Police recruitment test",
  fullName: "Nigeria Police Force constable recruitment aptitude test (CBT)",
  questionIdPrefix: "NGPOL-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Source: the Police Service Commission's constable recruitment exercises (2025/2026: 50,000
  // constables, applications 15 Dec 2025 to early Feb 2026, written aptitude test 28-30 April 2026
  // for General Duty and Specialist applicants who passed screening; 2024: a CBT run by JAMB).
  // The PSC publishes no question count, time, subject split or pass mark; guides report English,
  // mathematics, general knowledge and current affairs, 60 to 100 questions in 30 to 60 minutes.
  // Weights are Tigertest's own (English 15, maths 14, reasoning 5, civics/Constitution/rights/
  // policing 16 per test), and 70% (35 of 50) is Tigertest's target. GK from the 1999
  // Constitution (as amended), the Police Act 2020 and the ACJA 2015; current affairs are not
  // modelled. Checked 2026-11-01. Pools are exactly 4x each count (no spares). All items original.
  blueprint: {
    ngpolGrammar: 8,
    ngpolVocab: 7,
    ngpolNumber: 8,
    ngpolWordProblems: 6,
    ngpolReasoning: 5,
    ngpolConstitution: 7,
    ngpolRights: 4,
    ngpolPolicing: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 13201, name: "English Grammar & Usage", categories: ["ngpolGrammar"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 13202, name: "Vocabulary & Comprehension", categories: ["ngpolVocab"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 3, id: 13203, name: "Mathematics", categories: ["ngpolNumber", "ngpolWordProblems"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 4, id: 13204, name: "Constitution & Rights", categories: ["ngpolConstitution", "ngpolRights"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 5, id: 13205, name: "Policing & Reasoning", categories: ["ngpolPolicing", "ngpolReasoning"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    ngpolGrammar: "English: Grammar & Usage",
    ngpolVocab: "English: Vocabulary & Comprehension",
    ngpolNumber: "Mathematics: Number & Algebra",
    ngpolWordProblems: "Mathematics: Word Problems & Data",
    ngpolReasoning: "Logical & Verbal Reasoning",
    ngpolConstitution: "The 1999 Constitution & Government",
    ngpolRights: "Fundamental Rights & the Law",
    ngpolPolicing: "The Nigeria Police Force & Policing",
  },
  copy: {
    guestPrompt: "to save your police recruitment test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the English, mathematics, reasoning and civics the constable aptitude test covers. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock CBTs · 50 questions, aim for 35 or more",
    heroSubs: [
      "Five topics, four 50-question tests. English and maths weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock CBT.",
      "Fix the misses, then retake.",
      "All done. Print your invitation card and go.",
    ],
    sourceLine: "Based on the subjects the Police Service Commission's constable aptitude test covers, the 1999 Constitution and the Police Act 2020. Original questions; 50 per test, 70% is Tigertest's target.",
    analyticsKey: "ngpolice",
  },
};
```

Append `ngpolice` to the `EXAMS` array (after `ngfrsc` or with the batch-5 Nigeria exams).

Check: 13201-13205 (sets) and 13201-13204 (tests) must be free (BRIEF reserves idBase 13200).

## lib/banks/all.ts

```ts
import "./ngpolice";
```

## types/index.ts

- `QuestionType`: add `| "NGPOLICE"`.
- `QuestionCategory`, under a `// Nigeria Police recruitment` comment:

```ts
  | "ngpolGrammar"
  | "ngpolVocab"
  | "ngpolNumber"
  | "ngpolWordProblems"
  | "ngpolReasoning"
  | "ngpolConstitution"
  | "ngpolRights"
  | "ngpolPolicing"
```

(Keys grepped against `types/index.ts` on 2026-11-01: no `ngpol*` keys exist.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ngpolGrammar: "English: Grammar & Usage",
    ngpolVocab: "English: Vocabulary & Comprehension",
    ngpolNumber: "Mathematics: Number & Algebra",
    ngpolWordProblems: "Mathematics: Word Problems & Data",
    ngpolReasoning: "Logical & Verbal Reasoning",
    ngpolConstitution: "The 1999 Constitution & Government",
    ngpolRights: "Fundamental Rights & the Law",
    ngpolPolicing: "The Nigeria Police Force & Policing",
```

## app/globals.css

The brief's suggestion, 215 45% 30%, clashes under the 8-degree / 15-saturation / 8-lightness rule
with `security` (222 35% 36%), `phlto` (212 40% 26%), `sbiclerk` (209 40% 34%) and `phcse`
(221 50% 30%). Checked against every theme in globals.css plus the batch-5 suggested hues, the
nearest free colour with lightness 30 or more is **235 65% 30%** (deep police navy-indigo); white
text passes easily at 30% lightness. Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Nigeria Police recruitment theme */
  [data-theme="ngpolice"] {
    --brand: 235 65% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 235 55% 95%;
    --brand-hover: 235 65% 25%;
    --brand-dark: 235 65% 22%;
    --brand-darker: 235 60% 15%;
    --brand-muted: 235 30% 68%;
    --brand-border: 235 30% 78%;
    --brand-border-light: 235 28% 88%;
    --brand-gradient-to: 215 45% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ngpolice: "Four 50-question mock CBTs for the Nigeria Police Force constable recruitment aptitude test: English grammar, vocabulary and comprehension, mathematics, logical reasoning, the 1999 Constitution, fundamental rights and policing.",`
- `EXAM_ORG`: `ngpolice: "Police Service Commission · constable recruitment aptitude test",`
- Hub group, new (after "Nigeria university entrance tests"), shared with the other batch-5
  recruitment CBTs: `{ title: "Nigeria recruitment tests", ids: ["ngpolice", "cdcfib", "ngarmy", "ngcustoms"] },`
  (with three or more members no `RELATED_OVERRIDES` is needed; if it ships alone, add
  `ngpolice: ["ngfrsc", "jambeng", "police"],`).
- `SEARCH_ALIASES`:
  `ngpolice: "nigeria police recruitment npf recruitment police service commission psc police cbt police aptitude test police constable exam npfapplication psc gov ng police past questions general duty specialist constable recruitment 2026 police recruitment english maths current affairs",`

## lib/region.ts

- `TEST_REGIONS`: `ngpolice: "NG",` (on the line with `ngfrsc: "NG"`).
- `NON_DRIVING_TESTS`: add `"ngpolice"`.

## lib/examFacts.ts

```ts
  ngpolice: {
    answer:
      "Constables are recruited into the Nigeria Police Force by the Police Service Commission (PSC), working with the Force. In the 2025/2026 exercise for 50,000 constables, applicants applied free on the PSC portal, then attended physical, medical and credentials screening, and those who passed sat a written aptitude test on 28 to 30 April 2026 at centres in all 36 states and the FCT, before background checks. In 2024 the PSC had JAMB run the test as a CBT. The PSC does not publish the number of questions, the time or a pass mark; guides describe English, mathematics, general knowledge and current affairs. General Duty applicants in 2025/2026 had to be 18 to 25 with five credits including English and Mathematics.",
    rows: [
      { label: "Run by", value: "Police Service Commission, with the Nigeria Police Force" },
      { label: "Format", value: "Written aptitude test, computer based (CBT)" },
      { label: "Questions and time", value: "Not published (guides: 60 to 100 questions in up to an hour)" },
      { label: "Subjects (guides)", value: "English, mathematics, general knowledge, current affairs" },
      { label: "Pass mark", value: "Not published" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
      { label: "Age (General Duty, 2025/2026)", value: "18 to 25" },
      { label: "Education (General Duty)", value: "Five credits incl. English and Mathematics" },
      { label: "Cost", value: "Free (the PSC warns against anyone charging)" },
    ],
    basedOn: "Police Service Commission notices of December 2025 to April 2026, the 2025/2026 recruitment advertisement and the PSC's 2024 statement on the JAMB-run CBT, checked November 2026",
    source: { name: "Police Service Commission", url: "https://www.psc.gov.ng/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Coaching centres run police recruitment prep classes, like the Indian police exams, and the
landing already renders `<ExamClassFaq examId="ngpolice" />` and `classFaqJsonLd("ngpolice")`.
- `TEACHER_LED`: add `"ngpolice"`.
- `TEACHES`: `ngpolice: "a police recruitment coaching class",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `ngpolice: "police",` (the police tiger, like the Indian state police exams).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `badge` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ngpolice:nigeria-police-recruitment:13201`

## CLAUDE.md (after the Kenya NTSA bullet, or with the other batch-5 Nigeria recruitment bullets)

```md
- **Nigeria Police Recruitment** (Nigeria Police Force constable recruitment aptitude test, `/nigeria-police-recruitment/*`, landing `/nigeria-police-recruitment-practice-test`): `data/nigeria-police-questions.json` (200 original questions: English grammar and usage 32, vocabulary, idioms and comprehension 28, number and algebra 32, word problems and data 24, logical and verbal reasoning 20, the 1999 Constitution and government 28, fundamental rights and the law 16, the Nigeria Police Force and policing 20), test IDs 13201-13204 (50 questions each), sets 13201-13205 (by topic), state `NGPOLICE`, prefix `NGPOL-`, 70% pass (Tigertest's target: the Police Service Commission publishes no question count, time or pass mark; guides report 60 to 100 questions in up to an hour on English, maths, general knowledge and current affairs; the 2025/2026 exercise sat it on 28 to 30 April 2026, and in 2024 JAMB ran it as a CBT). 8/7/8/6/5/7/4/5 per test, no spares. GK lane in its batch: civics, the Constitution (ss. 1-9, 35, 214-216, Third Schedule), the Police Act 2020 and the ACJA 2015; no current affairs or office-holders. Built by `tools/next100/ngpolice/build.py`; sources in `tools/next100/ngpolice/sources.md`. Region NG, hub group "Nigeria recruitment tests", teacher-led, borrows the police tiger.
```
