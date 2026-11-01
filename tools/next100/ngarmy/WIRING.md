# Wiring for `ngarmy` (Nigerian Army recruitment aptitude test, v1)

Files already written by the builder: `data/nigerian-army-questions.json` (200, PASS),
`lib/banks/ngarmy.ts`, `app/nigerian-army-recruitment/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/nigerian-army-recruitment-practice-test/page.tsx`,
`tools/next100/ngarmy/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/ngarmy/build.py`. Everything below goes in shared files.

Format note: the Nigerian Army publishes no aptitude test syllabus, question count, time or pass
mark. Its 90 and 91 RRI notices said there would be no pre-selection CBT (screening in the state
of origin: documents, physical, medical); the 89RRI notice (April 2025) had announced one. Officer
routes go before a selection board (SSC 49/2026: documents, physical, medical and academic tests,
oral interview, per reports).
Guides describe written aptitude papers in English, mathematics and general knowledge. Tigertest
models four 50-question tests at a 70% target (35 of 50); weights are Tigertest's own. GK lane
per BRIEF batch 5: Nigerian history to independence, the armed forces, Africa/ECOWAS/AU. Pools are
exactly 4x each per-test count (no spares). Dashboard = 5 sets + 4 tests = 9 steps. No set over 60.

## lib/exams.ts

Add `"ngarmy"` to the `ExamId` union. Icon `medal` already exists.

Block (with the other Nigeria recruitment tests):

```ts
const ngarmy: ExamConfig = {
  id: "ngarmy",
  stateCode: "NGARMY",
  idBase: 13400,
  slug: "/nigerian-army-recruitment",
  landingPath: "/nigerian-army-recruitment-practice-test",
  name: "Nigerian Army Recruitment Practice Test",
  shortName: "Nigerian Army recruitment test",
  examLabel: "Nigerian Army aptitude test",
  fullName: "Nigerian Army recruitment aptitude test (Regular Recruits Intake, SSC and DSSC)",
  questionIdPrefix: "NGARMY-",
  icon: "medal",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // The Nigerian Army publishes no written or aptitude test syllabus, question count, time or pass
  // mark. Its 90th and 91st Regular Recruits Intake notices (91RRI: applications 30 March to 17 May
  // 2026, state screening from 9 June 2026) said there would be no pre-selection CBT (the 89RRI
  // notice of April 2025 had announced one); screening is documents, physical and medical. Officer
  // routes (SSC, DSSC) go before a selection board, which for SSC 49/2026 included academic tests
  // and an oral interview (per reports). Guides describe aptitude papers in English, mathematics
  // and general knowledge.
  // Four 50-question tests at 70% (35 of 50) is Tigertest's target; topic weights are Tigertest's
  // own. GK is static: Nigerian history to 1963, the armed forces, Africa/ECOWAS/AU.
  // Checked 2026-11-01. Pools are exactly 4x each count (no spares). All items original.
  blueprint: {
    ngarmyGrammar: 7,
    ngarmyVocab: 6,
    ngarmyArith: 8,
    ngarmyMaths: 6,
    ngarmyReasoning: 6,
    ngarmyHistory: 7,
    ngarmyForces: 5,
    ngarmyAfrica: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 13401, name: "English Language", categories: ["ngarmyGrammar", "ngarmyVocab"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 13402, name: "Mathematics", categories: ["ngarmyArith", "ngarmyMaths"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 3, id: 13403, name: "Verbal & Logical Reasoning", categories: ["ngarmyReasoning"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 4, id: 13404, name: "Nigerian History", categories: ["ngarmyHistory"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 5, id: 13405, name: "Armed Forces, Africa & ECOWAS", categories: ["ngarmyForces", "ngarmyAfrica"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    ngarmyGrammar: "English Grammar & Usage",
    ngarmyVocab: "English Vocabulary & Idioms",
    ngarmyArith: "Arithmetic & Number Work",
    ngarmyMaths: "Algebra, Shapes & Statistics",
    ngarmyReasoning: "Verbal & Logical Reasoning",
    ngarmyHistory: "Nigerian History to Independence",
    ngarmyForces: "The Nigerian Army & Armed Forces",
    ngarmyAfrica: "Africa, ECOWAS & the AU",
  },
  copy: {
    guestPrompt: "to save your Army aptitude test progress and track every question you miss",
    trainingHeading: "Train by subject",
    trainingSub: "Five sets on the English, mathematics, reasoning and general knowledge that Army aptitude tests cover. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 35 or more",
    heroSubs: [
      "Five subjects, four 50-question tests.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Get ready for screening.",
    ],
    sourceLine: "Original questions in the subjects Army aptitude tests cover; the Army publishes no format. 50 per test, 70% is Tigertest's target. Not affiliated with the Nigerian Army.",
    analyticsKey: "ngarmy",
  },
};
```

Append `ngarmy` to the `EXAMS` array next to `ngpolice`, `cdcfib` and `ngcustoms`.

Check: 13401-13405 (sets) and 13401-13404 (tests) must be free (BRIEF reserves idBase 13400).

## lib/banks/all.ts

```ts
import "./ngarmy";
```

## types/index.ts

- `QuestionType`: add `| "NGARMY"`.
- `QuestionCategory`, under a `// Nigerian Army recruitment` comment:

```ts
  | "ngarmyGrammar"
  | "ngarmyVocab"
  | "ngarmyArith"
  | "ngarmyMaths"
  | "ngarmyReasoning"
  | "ngarmyHistory"
  | "ngarmyForces"
  | "ngarmyAfrica"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ngarmyGrammar: "English Grammar & Usage",
    ngarmyVocab: "English Vocabulary & Idioms",
    ngarmyArith: "Arithmetic & Number Work",
    ngarmyMaths: "Algebra, Shapes & Statistics",
    ngarmyReasoning: "Verbal & Logical Reasoning",
    ngarmyHistory: "Nigerian History to Independence",
    ngarmyForces: "The Nigerian Army & Armed Forces",
    ngarmyAfrica: "Africa, ECOWAS & the AU",
```

## app/globals.css

The brief suggests `80 30% 30%`, but `agniveer` is `86 35% 30%` (6 degrees, 5 of saturation, 0 of
lightness: a clash). Suggested instead: `80 18% 30%`, a greyer army olive: against agniveer 17
points of saturation; against cask/zak53 (`82 65% 28%`, `84 50% 28%`, `81 90% 30%`) 32+ points;
`70 45% 32.9%` is 10 degrees away. White text contrast about 7.3:1. Then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Nigerian Army recruitment theme */
  [data-theme="ngarmy"] {
    --brand: 80 18% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 80 25% 95%;
    --brand-hover: 80 18% 26%;
    --brand-dark: 80 18% 22%;
    --brand-darker: 80 16% 16%;
    --brand-muted: 80 12% 68%;
    --brand-border: 80 12% 78%;
    --brand-border-light: 80 12% 88%;
    --brand-gradient-to: 60 25% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ngarmy: "Four 50-question mock tests for the written and aptitude tests in Nigerian Army recruitment (RRI, SSC and DSSC): English grammar and vocabulary, arithmetic and algebra, reasoning, Nigerian history to independence, the armed forces, and Africa, ECOWAS and the AU.",`
- `EXAM_ORG`: `ngarmy: "Nigerian Army · recruitment screening and selection",`
- Hub group, new (after "Nigeria university entrance tests"), shared with the other batch 5
  recruitment CBTs: `{ title: "Nigeria government recruitment tests", ids: ["ngpolice", "cdcfib", "ngarmy", "ngcustoms"] },`
  (if built alone, add `RELATED_OVERRIDES`: `ngarmy: ["ngfrsc", "jambeng", "asvab"],`)
- `SEARCH_ALIASES`:
  `ngarmy: "nigerian army recruitment nigerian army aptitude test army past questions nigeria army exam rri regular recruits intake 91rri 92rri ssc short service combatant dssc direct short service army screening depot zaria nda kaduna military recruitment nigeria soldier recruitment test army cbt general knowledge",`

## lib/region.ts

- `TEST_REGIONS`: `ngarmy: "NG",` (next to `jambeng`).
- Add `"ngarmy"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  ngarmy: {
    answer:
      "The Nigerian Army recruits soldiers through its Regular Recruits Intake (RRI) and officers through Short Service (SSC) and Direct Short Service (DSSC) courses, applied for free on its recruitment portal. It does not publish a syllabus, question count or pass mark for its written tests. For the 90th and 91st Regular Recruits Intakes (2025 and 2026), the Army said there would be no pre-selection computer-based test: shortlisted applicants were screened in their state of origin on documents, physical fitness and medical fitness (the 89th intake, in 2025, had announced one). Officer applicants go before a selection board; for Short Service Course 49/2026 it was reported to include document checks, physical, medical and academic tests and an oral interview. Candidates and guides describe written aptitude papers in English language, mathematics and general knowledge. For 91RRI, applicants needed at least four passes including English Language in no more than two sittings and had to apply through their state of origin.",
    rows: [
      { label: "Run by", value: "Nigerian Army (recruitment portal)" },
      { label: "Routes", value: "Regular Recruits Intake, SSC and DSSC officer courses" },
      { label: "Pre-selection CBT", value: "None in the 90th and 91st intakes (the 89th had one)" },
      { label: "Recruit screening", value: "State of origin: documents, physical fitness, medical" },
      { label: "Officer selection board", value: "Documents, physical, medical, academic tests, interview (SSC 49/2026, per reports)" },
      { label: "Written test content", value: "Not published; guides say English, mathematics, general knowledge" },
      { label: "Pass mark", value: "Not published" },
      { label: "Recruit entry (91RRI)", value: "4 passes incl. English, 2 sittings max; NIN and BVN" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
    ],
    basedOn: "the Army's 91RRI (2026), SSC 49/2026 and DSSC 29/2026 notices as reprinted in Nigerian news and job listings, checked November 2026; the portal itself could not be loaded",
    source: { name: "Nigerian Army recruitment portal", url: "https://recruitment.army.mil.ng" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing by default (the landing does not render `ExamClassFaq`). Coaching centres do prepare
recruits; if you want it teacher-led, add `ngarmy` to `TEACHER_LED`,
`ngarmy: "an Army recruitment coaching class",` to `TEACHES`, and the `<ExamClassFaq>` block.

## lib/tigerAssets.ts

Borrow the ASVAB tiger like `nda` and `agniveer`: `ngarmy: "asvab",` in `BORROWED_SETS`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `medal` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ngarmy:nigerian-army-recruitment:13401`

## CLAUDE.md (after the other Nigeria recruitment bullets, or after the Pakistan bullet)

```md
- **Nigerian Army Recruitment** (written and aptitude test practice for Regular Recruits Intake, SSC and DSSC selection, `/nigerian-army-recruitment/*`, landing `/nigerian-army-recruitment-practice-test`): `data/nigerian-army-questions.json` (200 original questions: grammar 28, vocabulary 24, arithmetic 32, algebra/shapes/statistics 24, verbal and logical reasoning 24, Nigerian history to independence 28, the Nigerian Army and armed forces 20, Africa/ECOWAS/AU 20), test IDs 13401-13404, sets 13401-13405 (by subject), state `NGARMY`, prefix `NGARMY-`, 70% pass (Tigertest's target: the Army publishes no syllabus, count or pass mark, and its 90th and 91st RRI notices said no pre-selection CBT, though the 89th announced one; recruit screening is in the state of origin, officers go before a selection board with academic tests and an interview). 7/6/8/6/6/7/5/5 per test, no spares. GK lane in the Nigeria recruitment family: Nigerian history to 1963, the armed forces, Africa/ECOWAS/AU; static facts, no office-holders. Built by `tools/next100/ngarmy/build.py`; sources in `tools/next100/ngarmy/sources.md`. Region NG, hub group "Nigeria government recruitment tests", `[data-theme="ngarmy"]` grey army olive, borrows the ASVAB tiger.
```
