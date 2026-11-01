# Wiring for `ngcustoms` (Nigeria Customs Service recruitment CBT, v1)

Files already written by the builder: `data/nigeria-customs-questions.json` (200, validator PASS),
`lib/banks/ngcustoms.ts`, `app/nigeria-customs-recruitment/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/nigeria-customs-recruitment-practice-test/page.tsx`,
`tools/next100/ngcustoms/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/ngcustoms/build.py`. Everything below goes in shared files.

Format note: the Nigeria Customs Service publishes no question count, time limit, subject list or
pass mark for its recruitment CBT (press release of September 2025 covers only logistics: online,
laptop/desktop with webcam, pre-test two days before, extra CBT for Superintendent applicants).
Tigertest models four 50-question tests at a 70% target, labelled as Tigertest's. Pools are exactly
4x each per-test count (no spares). Dashboard = 5 topic sets + 4 tests = 9 steps. No set exceeds 60.

## lib/exams.ts

Add `"ngcustoms"` to the `ExamId` union. Icon `badge` already exists.

```ts
const ngcustoms: ExamConfig = {
  id: "ngcustoms",
  stateCode: "NGCUSTOMS",
  idBase: 13500,
  slug: "/nigeria-customs-recruitment",
  landingPath: "/nigeria-customs-recruitment-practice-test",
  name: "Nigeria Customs Recruitment Practice Test",
  shortName: "Customs recruitment",
  examLabel: "Nigeria Customs recruitment CBT",
  fullName: "Nigeria Customs Service recruitment computer-based test (CBT)",
  questionIdPrefix: "NGCUS-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Source: Nigeria Customs Service press release NCS/PR/SP/S.582/025/028/VOLIII (September 2025)
  // on the 2024-25 exercise (advertised 27 December 2024, 3,927 vacancies in the Superintendent,
  // Inspectorate and Customs Assistant cadres): an online CBT on a laptop or desktop with a webcam,
  // a compulsory pre-test two days before, and an extra CBT for Superintendent applicants. NCS
  // publishes no question count, time, subject split or pass mark; guides describe English,
  // mathematics and general knowledge. Four 50-question tests at 70% and the topic weights are
  // Tigertest's. GK lane (batch 5 split): customs, trade, ports, economics, ECOWAS trade, world
  // geography; no current affairs or office-holders. Checked 2026-11-01. All items original.
  blueprint: {
    cusGrammar: 8,
    cusVocab: 7,
    cusArith: 7,
    cusQuant: 6,
    cusReason: 5,
    cusCustoms: 7,
    cusEconomy: 5,
    cusWorld: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 13501, name: "English Language", categories: ["cusGrammar", "cusVocab"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 2, id: 13502, name: "Mathematics", categories: ["cusArith", "cusQuant"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 3, id: 13503, name: "Customs, Trade & Ports", categories: ["cusCustoms"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 4, id: 13504, name: "Economics, ECOWAS & World Geography", categories: ["cusEconomy", "cusWorld"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 13505, name: "Logical Reasoning", categories: ["cusReason"], size: 20, weightLabel: "5 of 50 test questions" },
  ],
  categoryLabels: {
    cusGrammar: "English: Grammar & Usage",
    cusVocab: "English: Vocabulary & Comprehension",
    cusArith: "Maths: Arithmetic, Percentages & Duty",
    cusQuant: "Maths: Algebra, Ratio & Data",
    cusReason: "Verbal & Logical Reasoning",
    cusCustoms: "Customs, Trade & Ports",
    cusEconomy: "Economics & ECOWAS Trade",
    cusWorld: "World Geography & Capitals",
  },
  copy: {
    guestPrompt: "to save your Customs CBT progress and track every question you miss",
    trainingHeading: "Train by subject",
    trainingSub: "Five sets on the English, maths, reasoning and customs and trade knowledge a Customs aptitude test covers. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 35 or more",
    heroSubs: [
      "Five subjects, four 50-question tests. No calculator.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Watch for your CBT invitation.",
    ],
    sourceLine: "Based on the aptitude pattern of Nigeria Customs Service recruitment CBTs. Original questions; 50 per test, 70% is Tigertest's target.",
    analyticsKey: "ngcustoms",
  },
};
```

Append `ngcustoms` to the `EXAMS` array (with the other Nigeria exams, after `ngfrsc`).
Check: 13501-13505 (sets) and 13501-13504 (tests) must be free (BRIEF reserves idBase 13500).

## lib/banks/all.ts

```ts
import "./ngcustoms";
```

## types/index.ts

- `QuestionType`: add `| "NGCUSTOMS"`.
- `QuestionCategory`, under a `// Nigeria Customs recruitment` comment:

```ts
  | "cusGrammar"
  | "cusVocab"
  | "cusArith"
  | "cusQuant"
  | "cusReason"
  | "cusCustoms"
  | "cusEconomy"
  | "cusWorld"
```

(Grep before pasting: no `cus*` keys existed in `types/index.ts` on 2026-11-01.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cusGrammar: "English: Grammar & Usage",
    cusVocab: "English: Vocabulary & Comprehension",
    cusArith: "Maths: Arithmetic, Percentages & Duty",
    cusQuant: "Maths: Algebra, Ratio & Data",
    cusReason: "Verbal & Logical Reasoning",
    cusCustoms: "Customs, Trade & Ports",
    cusEconomy: "Economics & ECOWAS Trade",
    cusWorld: "World Geography & Capitals",
```

## app/globals.css

The brief's `200 50% 30%` clashes with `realestate` (200 45% 36%) and `sie` (204 60% 28%) under the
8-degree / 15-saturation / 8-lightness rule. Checked against every theme in `globals.css` plus the
other batch-5 suggestions: `184 20% 33%` (muted customs slate-teal) clears all of them; white text
contrast 6.6:1. Integrator picks the final hue. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Nigeria Customs recruitment theme */
  [data-theme="ngcustoms"] {
    --brand: 184 20% 33%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 184 25% 95%;
    --brand-hover: 184 20% 28%;
    --brand-dark: 184 22% 24%;
    --brand-darker: 184 24% 16%;
    --brand-muted: 184 14% 66%;
    --brand-border: 184 14% 78%;
    --brand-border-light: 184 14% 88%;
    --brand-gradient-to: 170 25% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ngcustoms: "Four 50-question mock tests for the Nigeria Customs Service recruitment CBT: English grammar and comprehension, arithmetic and duty sums without a calculator, algebra and data, reasoning, and customs, ports, economics, ECOWAS trade and world geography.",`
- `EXAM_ORG`: `ngcustoms: "Nigeria Customs Service · recruitment CBT for Superintendent, Inspectorate and Customs Assistant cadres",`
- Hub group, new, shared with the other three batch-5 recruitment exams (after "Nigeria university entrance tests"):
  `{ title: "Nigeria recruitment exams", ids: ["ngpolice", "cdcfib", "ngarmy", "ngcustoms"] },`
  (With four members no `RELATED_OVERRIDES` is needed. If ngcustoms lands alone, use
  `ngcustoms: ["ngfrsc", "jambeng", "police"],`.)
- `SEARCH_ALIASES`:
  `ngcustoms: "nigeria customs service recruitment customs cbt customs aptitude test customs exam past questions ncs recruitment customs superintendent cadre inspectorate cadre customs assistant paramilitary recruitment nigeria customs screening test online cbt webcam",`

## lib/region.ts

- `TEST_REGIONS`: `ngcustoms: "NG",` (on the line with `ngfrsc`, `jambeng`).
- `NON_DRIVING_TESTS`: add `"ngcustoms",` (next to `"jambeng"`).

## lib/examFacts.ts

```ts
  ngcustoms: {
    answer:
      "The Nigeria Customs Service recruits through an online application, document screening and then a computer-based test (CBT). In the exercise advertised on 27 December 2024 for 3,927 places in the Superintendent, Inspectorate and Customs Assistant cadres, 573,523 people applied and 286,697 were invited to the CBT in September and October 2025. Candidates sat it online from any location, on a laptop or desktop with a webcam, after a compulsory pre-test two days earlier; Superintendent applicants were told to expect a further CBT. The Service has not published the number of questions, the time or the pass mark. Guides describe a general aptitude test in English, mathematics and general knowledge.",
    rows: [
      { label: "Run by", value: "Nigeria Customs Service" },
      { label: "Cadres", value: "Superintendent, Inspectorate, Customs Assistant" },
      { label: "Format", value: "Online CBT on a laptop or desktop with webcam (2025)" },
      { label: "Pre-test", value: "Compulsory, two days before the CBT (2025)" },
      { label: "Questions and pass mark", value: "Not published by the Service" },
      { label: "Subjects (guides)", value: "English, mathematics, general knowledge" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
      { label: "Latest exercise", value: "Advertised 27 December 2024; CBT September to October 2025" },
    ],
    basedOn: "Nigeria Customs Service press release on its recruitment CBT (September 2025) and news reports of the 9 October 2025 Inspectorate and Customs Assistant CBT, checked November 2026",
    source: { name: "Nigeria Customs Service", url: "https://customs.gov.ng/" },
  },
```
(The press release PDF itself: https://cms.customs.gov.ng/wp-content/uploads/2026/06/PRESS-RELEASE-RECRUITMENT-CBT-pdf.pdf)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: recruitment candidates prepare alone; not proposed for `TEACHER_LED`. (If the integrator
adds the recruitment family as coaching-centre exams: `ngcustoms: "a Customs recruitment coaching class",`.)

## lib/tigerAssets.ts

Falls back to the DMV tiger. Optionally add `ngcustoms` to `BORROWED_SETS` with the `security`
(guard) set, as other uniformed-service exams do.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects, icon
`badge` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ngcustoms:nigeria-customs-recruitment:13501`

## CLAUDE.md (after the Kenya NTSA or Nigeria Highway Code bullet, or in a new Nigeria recruitment paragraph)

```md
- **Nigeria Customs Recruitment** (Nigeria Customs Service recruitment CBT, `/nigeria-customs-recruitment/*`, landing `/nigeria-customs-recruitment-practice-test`): `data/nigeria-customs-questions.json` (200 original questions: English grammar 32, vocabulary and comprehension 28 (three short passages), arithmetic and duty sums 28, algebra, ratio and data 24, reasoning 20, customs, trade and ports 28, economics and ECOWAS trade 20, world geography 20), test IDs 13501-13504 (50 questions each), sets 13501-13505 (by subject), state `NGCUSTOMS`, prefix `NGCUS-`, 70% pass (Tigertest's target: the Service publishes no count, time or pass mark; its September 2025 press release describes an online CBT on a laptop or desktop with webcam, a pre-test two days before and an extra CBT for Superintendent applicants). 8/7/7/6/5/7/5/5 per test, no spares. GK lane in the batch-5 recruitment family: customs, trade, ports, economics, ECOWAS trade, world geography; no current affairs or office-holders; maths without a calculator. Built by `tools/next100/ngcustoms/build.py`; sources in `tools/next100/ngcustoms/sources.md`. Region NG, hub group "Nigeria recruitment exams".
```
