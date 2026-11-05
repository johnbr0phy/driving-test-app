# Wiring for `afpsat` (AFP Service Aptitude Test, v1, region PH)

Files already written by the builder: `data/afpsat-questions.json` (200, validator PASS),
`lib/banks/afpsat.ts`, `app/afpsat/*` (layout, redirect, dashboard, drill, stats; copied from
`app/nigeria-police-recruitment/`), `app/afpsat-reviewer-practice-test/page.tsx`,
`tools/next100/afpsat/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/afpsat/build.py`. Everything below goes in shared files.

Format note: the AFP publishes no AFPSAT item count, time limit, subtest split or passing score
(guides say each service sets its own cut-off; reviewer sites quote "150 items", unconfirmed). The
official AFP sites did not load this session (see `sources.md`). Tigertest models four 50-question
tests at a 70% target (35 of 50). Pools are exactly 4x each per-test count (no spares). Dashboard =
5 topic sets + 4 tests = 9 steps. No set exceeds 60.

Lanes: written side by side with `phnapolcom` (and grepped against every bank on disk, including
`data/v2/asvab`, `data/v2/phcse`, `data/nigeria-police-questions.json`,
`data/nigerian-army-questions.json`, the India banks and the school banks); 40 near-repeats of
series, codes, analogies, cube and paper-folding items, number sets and passages were rewritten.
General information is the defense lane: the 1987 Constitution on the armed forces (Art. I, II
ss. 2-4 and 8, VI s. 23, VII ss. 16, 18 and 21, XVI ss. 4-5, XVIII s. 25), R.A. 7077, R.A. 8491,
C.A. No. 1, the AFP's structure and military history to 1955. No current events, office-holders,
insurgencies or contested politics.

## lib/exams.ts

Add `"afpsat"` to the `ExamId` union. Icon `badge` already exists.

Block (after `phnapolcom`, with the batch-2 Philippines exams):

```ts
const afpsat: ExamConfig = {
  id: "afpsat",
  stateCode: "AFPSAT",
  idBase: 19600,
  slug: "/afpsat",
  landingPath: "/afpsat-reviewer-practice-test",
  name: "AFPSAT Reviewer",
  shortName: "AFPSAT",
  examLabel: "AFPSAT",
  fullName: "AFP Service Aptitude Test (AFPSAT)",
  questionIdPrefix: "AFPSAT-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Source: the AFP Service Aptitude Test, the Armed Forces of the Philippines' first filter for
  // officer and enlisted applicants to the Army, Navy and Air Force (AFP Circulars of 2013, 2015
  // and 2020, cited in Gamos and Usona, Graduate Forum 18(1), 2024). The AFP publishes no item
  // count, time, subtest split or passing score; guides describe verbal, numerical, logical and
  // abstract, spatial and mechanical reasoning, and general information, and say each service
  // sets its own cut-off. Weights are Tigertest's own (verbal 17, numerical 12, logical 7,
  // abstract and spatial 4, general information 10 per test) and 70% (35 of 50) is Tigertest's
  // target. Abstract items are written in words (the real test uses figures). General
  // information from the 1987 Constitution, R.A. 7077 and R.A. 8491. Checked 2026-11-05. Pools
  // are exactly 4x each count (no spares). All items original.
  blueprint: {
    afpsatVocab: 7,
    afpsatGrammar: 6,
    afpsatReading: 4,
    afpsatNumber: 6,
    afpsatProblems: 6,
    afpsatLogic: 7,
    afpsatAbstract: 4,
    afpsatCivics: 6,
    afpsatHeritage: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 19601, name: "Vocabulary & Grammar", categories: ["afpsatVocab", "afpsatGrammar"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 19602, name: "Reading & Logical Reasoning", categories: ["afpsatReading", "afpsatLogic"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 19603, name: "Numerical Ability", categories: ["afpsatNumber", "afpsatProblems"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 19604, name: "Abstract & Spatial Reasoning", categories: ["afpsatAbstract"], size: 16, weightLabel: "4 of 50 test questions" },
    { setNumber: 5, id: 19605, name: "General Information", categories: ["afpsatCivics", "afpsatHeritage"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    afpsatVocab: "Verbal: Vocabulary & Analogies",
    afpsatGrammar: "Verbal: Grammar & Correct Usage",
    afpsatReading: "Verbal: Reading Comprehension",
    afpsatNumber: "Numerical: Arithmetic & Algebra",
    afpsatProblems: "Numerical: Word Problems",
    afpsatLogic: "Logical Reasoning",
    afpsatAbstract: "Abstract & Spatial Reasoning",
    afpsatCivics: "The Constitution & National Defense",
    afpsatHeritage: "The AFP, History & Geography",
  },
  copy: {
    guestPrompt: "to save your AFPSAT progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the verbal, numerical, reasoning and general information areas the AFPSAT covers. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 35 or more",
    heroSubs: [
      "Five topics, four 50-question tests. Verbal and numerical weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Report early and bring your documents.",
    ],
    sourceLine: "Based on the areas reviewers describe for the AFP Service Aptitude Test, the 1987 Constitution and the AFP's defense laws. Original questions; 50 per test, 70% is Tigertest's target.",
    analyticsKey: "afpsat",
  },
};
```

Append `afpsat` to the `EXAMS` array (after `phnapolcom`).

Check: 19601-19605 (sets) and 19601-19604 (tests) are free (the brief reserves idBase 19600).

## lib/banks/all.ts

```ts
import "./afpsat";
```

## types/index.ts

- `QuestionType`: add `| "AFPSAT"`.
- `QuestionCategory`, under a `// AFPSAT (AFP Service Aptitude Test)` comment:

```ts
  | "afpsatVocab"
  | "afpsatGrammar"
  | "afpsatReading"
  | "afpsatNumber"
  | "afpsatProblems"
  | "afpsatLogic"
  | "afpsatAbstract"
  | "afpsatCivics"
  | "afpsatHeritage"
```

(Keys grepped against `types/index.ts` on 2026-11-05: no `afpsat*` keys exist.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    afpsatVocab: "Verbal: Vocabulary & Analogies",
    afpsatGrammar: "Verbal: Grammar & Correct Usage",
    afpsatReading: "Verbal: Reading Comprehension",
    afpsatNumber: "Numerical: Arithmetic & Algebra",
    afpsatProblems: "Numerical: Word Problems",
    afpsatLogic: "Logical Reasoning",
    afpsatAbstract: "Abstract & Spatial Reasoning",
    afpsatCivics: "The Constitution & National Defense",
    afpsatHeritage: "The AFP, History & Geography",
```

## app/globals.css

The brief's hue, used as given (checked by the brief's script): 85 70% 20%, a deep army olive.
Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* AFPSAT (AFP Service Aptitude Test) theme */
  [data-theme="afpsat"] {
    --brand: 85 70% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 85 45% 94%;
    --brand-hover: 85 70% 16%;
    --brand-dark: 85 70% 14%;
    --brand-darker: 85 65% 10%;
    --brand-muted: 85 25% 66%;
    --brand-border: 85 25% 78%;
    --brand-border-light: 85 22% 88%;
    --brand-gradient-to: 60 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `afpsat: "AFPSAT reviewer for the AFP Service Aptitude Test, the entrance test for the Philippine Army, Navy and Air Force: vocabulary, grammar, reading, numerical ability, logical, abstract and spatial reasoning, the 1987 Constitution on national defense and the AFP.",`
- `EXAM_ORG`: `afpsat: "Armed Forces of the Philippines · Army, Navy and Air Force entrance",`
- Hub group, new, after "Philippines government and licensure exams" (shared with the batch-2
  peers): `{ title: "Philippines police, military and criminology exams", ids: ["phnapolcom", "afpsat", "phcle"] },`
  (with three members no `RELATED_OVERRIDES` is needed; if it ships with fewer, add
  `afpsat: ["phnapolcom", "phcse", "asvab"],`).
- `SEARCH_ALIASES`:
  `afpsat: "afpsat afp service aptitude test afp aptitude test afp exam afpsat reviewer philippine army exam philippine navy exam philippine air force exam philippine marines exam candidate soldier course csc officer candidate course occ army qualifying exam enlisted personnel military entrance exam philippines sundalo exam",`

## lib/region.ts

```ts
// TEST_REGIONS: on the PH entry (next to phlto, phcse, phlet, phnapolcom)
  afpsat: "PH",
// NON_DRIVING_TESTS: add
  "afpsat",
```

## lib/examFacts.ts

```ts
  afpsat: {
    answer:
      "The AFP Service Aptitude Test (AFPSAT) is the written aptitude test the Armed Forces of the Philippines uses as the first filter for applicants to the Philippine Army, the Philippine Navy (including the Marines) and the Philippine Air Force, for officer and enlisted programs. It is set out in AFP circulars and given in batches by the services' testing and recruitment offices around the country; applicants bring original documents such as a diploma or certificate, transcript of records or Form 137, PSA birth certificate and a government ID. The AFP does not publish the number of items, the time limit or a passing score, and guides say each service sets its own cut-off. Reviewers describe verbal, numerical, logical and abstract, spatial and mechanical reasoning and general information. Passing is followed by each service's own physical, medical and background screening.",
    rows: [
      { label: "Run by", value: "Armed Forces of the Philippines (service testing and recruitment offices)" },
      { label: "For", value: "Officer and enlisted applicants to the Army, Navy and Air Force" },
      { label: "Format", value: "Written aptitude test, multiple choice" },
      { label: "Items and time", value: "Not published (some reviewers quote about 150 items)" },
      { label: "Areas (guides)", value: "Verbal, numerical, logical and abstract, spatial and mechanical, general information" },
      { label: "Passing score", value: "Not published; guides say each service sets its own" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
      { label: "Bring (2025 regional notice)", value: "Original diploma or certificate, TOR or Form 137, PSA birth certificate, valid ID" },
    ],
    basedOn: "AFP regional AFPSAT announcements as reported by RMN (April 2025) and the PIA (2023), and Gamos and Usona, Graduate Forum 18(1), 2024, which cites AFP Circulars on the AFPSAT of 2013, 2015 and 2020, checked November 2026",
    source: { name: "Armed Forces of the Philippines", url: "https://www.afp.mil.ph/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: the brief lists only the PRC board exams and `phcle` as teacher-led, and the landing does
not render `ExamClassFaq`. (If the integrator adds review-center classes later:
`TEACHER_LED` `"afpsat"`, `TEACHES` `afpsat: "an AFPSAT review class",` and add
`<ExamClassFaq examId="afpsat" />` plus `classFaqJsonLd("afpsat")` to the landing.)

## lib/tigerAssets.ts

`BORROWED_SETS`: `afpsat: "asvab",` (the military tiger, like `ngarmy`, `nda` and `agniveer`).

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/*

Nothing: `badge` exists; sitemaps map over `EXAMS`; class questions import `lib/banks/all`; no
redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing afpsat:afpsat:19601`

## CLAUDE.md (after the NAPOLCOM Exam bullet)

```md
- **AFPSAT** (AFP Service Aptitude Test, the written entrance test for officer and enlisted applicants to the Philippine Army, Navy and Air Force, `/afpsat/*`, landing `/afpsat-reviewer-practice-test`): `data/afpsat-questions.json` (200 original questions: vocabulary and analogies 28, grammar and correct usage 24, reading comprehension 16, arithmetic and algebra 24, word problems 24, logical reasoning 28, abstract and spatial reasoning in words 16, the 1987 Constitution on national defense 24, the AFP, military history and geography 16), test IDs 19601-19604 (50 questions each), sets 19601-19605 (by topic), state `AFPSAT`, prefix `AFPSAT-`, 70% pass (Tigertest's target: the AFP publishes no item count, time, subtest split or passing score; guides say each service sets its own cut-off and describe verbal, numerical, logical and abstract, spatial and mechanical, and general information areas). 7/6/4/6/6/7/4/6/4 per test, Tigertest's split, no spares. Abstract items written as series, codes and spatial problems in words (the real test uses figures). General information from the 1987 Constitution (Art. I, II, VI s. 23, VII ss. 16, 18, 21, XVI ss. 4-5, XVIII s. 25), R.A. 7077, R.A. 8491 and C.A. No. 1; no current events, office-holders or insurgency items. Written side by side with `phnapolcom` and kept clear of `asvab`, `phcse`, `ngarmy` and the India banks. Built by `tools/next100/afpsat/build.py`; sources in `tools/next100/afpsat/sources.md`. Region PH, hub group "Philippines police, military and criminology exams", `[data-theme="afpsat"]` deep army olive (85 70% 20%), borrows the ASVAB tiger.
```
