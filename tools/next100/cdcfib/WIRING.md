# Wiring for `cdcfib` (CDCFIB recruitment CBT: Civil Defence, Correctional, Fire, Immigration; v1)

Files already written by the builder: `data/cdcfib-questions.json` (200, PASS),
`lib/banks/cdcfib.ts`, `app/cdcfib-recruitment/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/cdcfib-recruitment-practice-test/page.tsx`,
`tools/next100/cdcfib/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/cdcfib/build.py`. Everything below goes in shared files.

Format note: the Civil Defence, Correctional, Fire and Immigration Services Board publishes no
question count, time limit, subject split or pass mark (cdcfib.gov.ng was a maintenance page on
2026-11-01). For the November 2025 online CBT, guides reported 100 questions in 60 or 90 minutes;
candidates quoted in the press reported 40. Tigertest models four 50-question tests at a 70%
target (35 of 50), like `pkdrive`. Weights are Tigertest's own.
Pools are exactly 4x each per-test count (no spares). Dashboard = 5 topic sets + 4 tests = 9 steps.
No set exceeds 60.

GK lane (BRIEF batch 5): the four services and the Board, Nigerian geography and environment, plus
fire safety and first aid. English, maths and reasoning items were checked by script against the
ngpolice, ngarmy, ngcustoms, trcnpqe, ngfrsc and jambeng banks on disk and repeats rewritten.

## lib/exams.ts

Add `"cdcfib"` to the `ExamId` union. Icon `shield` already exists.

Block (after `pkdrive`, or with the other Nigeria recruitment exams):

```ts
const cdcfib: ExamConfig = {
  id: "cdcfib",
  stateCode: "NGCDCFIB",
  idBase: 13300,
  slug: "/cdcfib-recruitment",
  landingPath: "/cdcfib-recruitment-practice-test",
  name: "CDCFIB Recruitment Practice Test",
  shortName: "CDCFIB recruitment test",
  examLabel: "CDCFIB recruitment CBT",
  fullName: "CDCFIB recruitment CBT (Civil Defence, Correctional, Fire and Immigration Services)",
  questionIdPrefix: "NGCDCFIB-",
  icon: "shield",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Source: the Civil Defence, Correctional, Fire and Immigration Services Board's 2025
  // recruitment (online, AI-proctored CBT, 12 to 19 November 2025, as reported from Board
  // statements). The Board publishes no question count, time, subject split or pass mark; guides
  // report 100 multiple-choice questions on English, maths, reasoning, general knowledge and the
  // services, and some candidates reported 40. Four 50-question tests at 70% is Tigertest's
  // target; topic weights are Tigertest's own (aptitude core 27 of 50, general knowledge 23).
  // No current affairs or office-holders. Checked 2026-11-01. Pools are exactly 4x each count.
  blueprint: {
    cdcfibServices: 8,
    cdcfibSafety: 5,
    cdcfibGeography: 6,
    cdcfibEnvironment: 5,
    cdcfibGrammar: 6,
    cdcfibVocab: 5,
    cdcfibMaths: 9,
    cdcfibReasoning: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 13301, name: "The Four Services & Safety", categories: ["cdcfibServices", "cdcfibSafety"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 13302, name: "Nigerian Geography & Environment", categories: ["cdcfibGeography", "cdcfibEnvironment"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 13303, name: "English Language", categories: ["cdcfibGrammar", "cdcfibVocab"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 4, id: 13304, name: "Numerical Ability", categories: ["cdcfibMaths"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 13305, name: "Logical Reasoning", categories: ["cdcfibReasoning"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    cdcfibServices: "The Four Services & the Board",
    cdcfibSafety: "Fire Safety, First Aid & Emergencies",
    cdcfibGeography: "Nigerian Geography",
    cdcfibEnvironment: "Environment & Disasters",
    cdcfibGrammar: "English Grammar & Usage",
    cdcfibVocab: "English Vocabulary",
    cdcfibMaths: "Numerical Ability",
    cdcfibReasoning: "Logical Reasoning",
  },
  copy: {
    guestPrompt: "to save your CDCFIB test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the four services, Nigerian geography, English, maths and reasoning. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 35 or more",
    heroSubs: [
      "Five topics, four 50-question tests. Maths and English weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Watch the Board's portal for your CBT slot.",
    ],
    sourceLine: "General aptitude and service knowledge for the CDCFIB recruitment CBT. Original questions; 50 per test, 70% is Tigertest's target. Not affiliated with the CDCFIB.",
    analyticsKey: "cdcfib",
  },
};
```

Append `cdcfib` to the `EXAMS` array (after `pkdrive`, with the other Nigeria recruitment exams).

Check: 13301-13305 (sets) and 13301-13304 (tests) must be free (BRIEF reserves idBase 13300).

## lib/banks/all.ts

```ts
import "./cdcfib";
```

## types/index.ts

- `QuestionType`: add `| "NGCDCFIB"`.
- `QuestionCategory`, under a `// CDCFIB recruitment CBT (Nigeria)` comment:

```ts
  | "cdcfibServices"
  | "cdcfibSafety"
  | "cdcfibGeography"
  | "cdcfibEnvironment"
  | "cdcfibGrammar"
  | "cdcfibVocab"
  | "cdcfibMaths"
  | "cdcfibReasoning"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cdcfibServices: "The Four Services & the Board",
    cdcfibSafety: "Fire Safety, First Aid & Emergencies",
    cdcfibGeography: "Nigerian Geography",
    cdcfibEnvironment: "Environment & Disasters",
    cdcfibGrammar: "English Grammar & Usage",
    cdcfibVocab: "English Vocabulary",
    cdcfibMaths: "Numerical Ability",
    cdcfibReasoning: "Logical Reasoning",
```

## app/globals.css

The brief's `15 35% 32%` clashes with `fsmaths` (15 45 34: 0 degrees, 10 sat, 2 light) and
`jeemain` (18 30 32). Checked against every `[data-theme]` block on 2026-11-01: `9 30% 34%`
(a muted brick red, fire-service feel) is clear of all of them and gives white text 8.1:1. It is
9 degrees from batch 5's suggested `apgov` 0 35% 36% (outside the 8-degree rule, but close; if the
integrator moves apgov toward 5, re-check). Then run `tools/gen_dark_brand_css.py`.

```css
  /* CDCFIB recruitment theme */
  [data-theme="cdcfib"] {
    --brand: 9 30% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 9 40% 95%;
    --brand-hover: 9 30% 29%;
    --brand-dark: 9 30% 26%;
    --brand-darker: 9 30% 17%;
    --brand-muted: 9 20% 68%;
    --brand-border: 9 22% 80%;
    --brand-border-light: 9 22% 89%;
    --brand-gradient-to: 30 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cdcfib: "Four 50-question mock tests for the CDCFIB recruitment CBT into the Civil Defence Corps, Correctional Service, Fire Service and Immigration Service: the four services, fire safety and first aid, Nigerian geography and environment, English, numerical ability and logical reasoning.",`
- `EXAM_ORG`: `cdcfib: "Civil Defence, Correctional, Fire and Immigration Services Board · recruitment CBT",`
- Hub group, new (after "Nigeria university entrance tests"), shared with this batch's other
  Nigeria recruitment CBTs (merge with their WIRING):
  `{ title: "Nigeria recruitment tests", ids: ["ngpolice", "cdcfib", "ngarmy", "ngcustoms"] },`
  If cdcfib ends up alone, add `RELATED_OVERRIDES`: `cdcfib: ["ngfrsc", "jambeng", "police"],`.
- `SEARCH_ALIASES`:
  `cdcfib: "cdcfib recruitment cdcfib cbt cdcfib past questions cdcfib online test civil defence recruitment nscdc recruitment nscdc aptitude test civil defence aptitude test nigerian correctional service recruitment ncos recruitment prisons service recruitment federal fire service recruitment ffs recruitment nigeria immigration service recruitment nis recruitment immigration cbt paramilitary recruitment nigeria ministry of interior recruitment",`

## lib/region.ts

```ts
// TEST_REGIONS: on the NG entries (next to ngfrsc, jambeng)
  cdcfib: "NG",
// NON_DRIVING_TESTS: add
  "cdcfib",
```

## lib/examFacts.ts

```ts
  cdcfib: {
    answer:
      "The CDCFIB recruitment test is the computer-based test set by the Civil Defence, Correctional, Fire and Immigration Services Board, which recruits for four paramilitary services under the Federal Ministry of Interior: the Nigeria Security and Civil Defence Corps, the Nigerian Correctional Service, the Federal Fire Service and the Nigeria Immigration Service. You apply through the Board's recruitment portal when an exercise opens; shortlisted applicants take the test, then physical screening, document checks and a medical. In the 2025 exercise the test was online from 12 to 19 November, taken on a laptop, desktop or phone with camera and microphone and watched by AI proctoring. The Board does not publish the number of questions, the time limit, the subjects or a pass mark; guides describe multiple-choice questions on English, mathematics, reasoning, general knowledge and the services.",
    rows: [
      { label: "Run by", value: "Civil Defence, Correctional, Fire and Immigration Services Board (CDCFIB)" },
      { label: "Services", value: "NSCDC, Correctional Service, Federal Fire Service, Immigration Service" },
      { label: "Format (2025)", value: "Online CBT, multiple choice, AI-proctored, at a scheduled slot" },
      { label: "Questions and time", value: "Not published by the Board (guides report 100; some candidates reported 40)" },
      { label: "Pass mark", value: "Not published" },
      { label: "Topics (guides)", value: "English, mathematics, reasoning, general knowledge, the four services" },
      { label: "After the CBT", value: "Physical screening, document checks, medical" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
    ],
    basedOn: "Board instructions for the November 2025 online CBT as reported by Nigerian news outlets, with the cdcfib.gov.ng portal under maintenance, checked November 2026",
    source: { name: "CDCFIB", url: "https://cdcfib.gov.ng" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: a recruitment test, not taught in a class (coaching centres exist, but the landing has no
class FAQ, like `police`).

## lib/tigerAssets.ts

Falls back to the DMV tiger. Suggest borrowing the firefighter set (`public/tigers/ffi/` exists):
`cdcfib: "ffi",` in `BORROWED_SETS` (or `"security"`).

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/*

Nothing: `shield` exists; sitemaps map over `EXAMS`; class questions import `lib/banks/all`;
no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cdcfib:cdcfib-recruitment:13301`

## CLAUDE.md (under Additional Exams, after the Pakistan bullet, with the other Nigeria recruitment CBTs)

```md
- **CDCFIB Recruitment** (Civil Defence, Correctional, Fire and Immigration Services Board recruitment CBT, `/cdcfib-recruitment/*`, landing `/cdcfib-recruitment-practice-test`): `data/cdcfib-questions.json` (200 original questions: the four services and the Board 32, fire safety, first aid and emergencies 20, Nigerian geography 24, environment and disasters 20, English grammar 24, vocabulary 20, numerical ability 36, logical reasoning 24), test IDs 13301-13304 (50 questions each), sets 13301-13305 (by topic), state `NGCDCFIB`, prefix `NGCDCFIB-`, 70% pass (Tigertest's target: the Board publishes no question count, time, subject split or pass mark; guides report 100 questions for the November 2025 online, AI-proctored CBT and some candidates reported 40). 8/5/6/5/6/5/9/6 per test, no spares, weights Tigertest's own. GK lane of the batch: the NSCDC, NCoS, FFS and NIS (their Acts, duties and history), fire safety and first aid, Nigerian geography and environment; no current affairs or office-holders. English, maths and reasoning checked against the ngpolice, ngarmy, ngcustoms, trcnpqe, ngfrsc and jambeng banks. Built by `tools/next100/cdcfib/build.py`; sources in `tools/next100/cdcfib/sources.md`. Region NG, hub group "Nigeria recruitment tests", `[data-theme="cdcfib"]` muted brick red.
```
