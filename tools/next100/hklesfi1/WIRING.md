# Wiring for `hklesfi1` (Hong Kong LE Paper 1, Fundamentals of Securities and Futures Regulation, v1, region HK)

Files already written by the builder: `data/hk-le-paper-1-questions.json` (200, PASS, key-longest 8%),
`lib/banks/hklesfi1.ts`, `app/le-paper-1/*` (layout, redirect, dashboard, drill, stats, copied from
`app/llqp/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/le-paper-1-practice-test/page.tsx`, `tools/next100/hklesfi1/*` (spec, sources, `q_*.py`,
`build.py`, this file). Everything below goes in shared files.

Format note: the real LE Paper 1 (HKSI Institute) is 60 multiple-choice questions in 90 minutes,
70% to pass, computer based, in English or Traditional Chinese; syllabus Version 3.5 from
30 June 2026, nine topics, no published topic weights. Here: three real-length 60-question mock
tests (`passPct: 70` gives 42 of 60, as the real 70%) with Tigertest's own split
6/5/9/9/9/8/5/5/4 across the nine topics; pools are 3x per test plus 20 training-only spares
(like `series63`). Six content sets + 3 tests = 9 dashboard steps, sets first, then tests.

## lib/exams.ts

Add `"hklesfi1"` to the `ExamId` union. Icon `building` already exists (as `sie`, `series7`).

```ts
const hklesfi1: ExamConfig = {
  id: "hklesfi1",
  stateCode: "HKLE1",
  idBase: 18200,
  slug: "/le-paper-1",
  landingPath: "/le-paper-1-practice-test",
  name: "LE Paper 1 Practice Test",
  shortName: "LE Paper 1",
  examLabel: "LE Paper 1",
  fullName: "Licensing Examination for Securities and Futures Intermediaries, Paper 1: Fundamentals of Securities and Futures Regulation",
  questionIdPrefix: "HKLE1-",
  icon: "building",
  testCount: 3,
  questionsPerTest: 60,
  passPct: 70,
  // HKSI Institute LE Paper 1 (checked November 2026): 60 MCQs, 90 minutes, 70% pass, English or
  // Traditional Chinese; syllabus Version 3.5 effective 30 June 2026, nine topics. HKSI publishes
  // no topic weights; per test (Tigertest's split): overview 6, law and CO 5, SFO 9, licensing and
  // subsidiary legislation 9, business conduct 9, operations/ICG/AML/PDPO 8, exchanges 5, public
  // capital 5, market misconduct 4. Pools are 3x per test plus 20 training-only spares.
  // Hong Kong law as of November 2026. All items original.
  blueprint: {
    hkle1Overview: 6,
    hkle1Law: 5,
    hkle1Sfo: 9,
    hkle1Licensing: 9,
    hkle1Conduct: 9,
    hkle1Operations: 8,
    hkle1Exchanges: 5,
    hkle1Capital: 5,
    hkle1Misconduct: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 18201, name: "Regulatory Overview & Hong Kong Law", categories: ["hkle1Overview", "hkle1Law"], size: 36, weightLabel: "11 of 60 test questions" },
    { setNumber: 2, id: 18202, name: "The SFO & Market Misconduct", categories: ["hkle1Sfo", "hkle1Misconduct"], size: 44, weightLabel: "13 of 60 test questions" },
    { setNumber: 3, id: 18203, name: "Licensing, Client Assets & Records", categories: ["hkle1Licensing"], size: 30, weightLabel: "9 of 60 test questions" },
    { setNumber: 4, id: 18204, name: "Business Conduct & Client Relations", categories: ["hkle1Conduct"], size: 30, weightLabel: "9 of 60 test questions" },
    { setNumber: 5, id: 18205, name: "Internal Control, AML & Privacy", categories: ["hkle1Operations"], size: 28, weightLabel: "8 of 60 test questions" },
    { setNumber: 6, id: 18206, name: "Exchanges & Public Capital", categories: ["hkle1Exchanges", "hkle1Capital"], size: 32, weightLabel: "10 of 60 test questions" },
  ],
  categoryLabels: {
    hkle1Overview: "Regulatory Overview of the Financial Industry",
    hkle1Law: "Hong Kong Law & the Companies Ordinance",
    hkle1Sfo: "Securities and Futures Ordinance",
    hkle1Licensing: "Licensing & Subsidiary Legislation",
    hkle1Conduct: "Business Conduct & Client Relations",
    hkle1Operations: "Business Operations, Internal Control & AML",
    hkle1Exchanges: "Participating in the Hong Kong Exchanges",
    hkle1Capital: "Accessing Public Capital",
    hkle1Misconduct: "Market Misconduct & Improper Trading",
  },
  copy: {
    guestPrompt: "to save your LE Paper 1 progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Six sets covering all nine topics of the Paper 1 syllabus. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 60 questions like the real Paper 1, 70% to pass",
    heroSubs: [
      "Six sets, three full mock tests. The SFO and conduct rules weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your Paper 1.",
    ],
    sourceLine: "Based on the HKSI Institute's LE Paper 1 syllabus (Version 3.5, from 30 June 2026) and Hong Kong law as of November 2026. Original questions; 60 per test, topic split by Tigertest. Not affiliated with the HKSI Institute, the SFC or HKEX.",
    analyticsKey: "hklesfi1",
  },
};
```

Append `hklesfi1` to the `EXAMS` array after `hkiiqe1` (or after `hkdrive` if it lands first).

Check: 18201-18206 (tests 18201-18203, sets 18201-18206) must be free (batch assigns 18200).

## lib/banks/all.ts

```ts
import "./hklesfi1";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/hklesfi1.ts`.

## types/index.ts

- `QuestionType`: add `| "HKLE1"`.
- `QuestionCategory`, under a `// Hong Kong LE Paper 1 (securities and futures regulation)` comment:

```ts
  | "hkle1Overview"
  | "hkle1Law"
  | "hkle1Sfo"
  | "hkle1Licensing"
  | "hkle1Conduct"
  | "hkle1Operations"
  | "hkle1Exchanges"
  | "hkle1Capital"
  | "hkle1Misconduct"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; the newer six fall back to English)

```ts
    hkle1Overview: "Regulatory Overview of the Financial Industry",
    hkle1Law: "Hong Kong Law & the Companies Ordinance",
    hkle1Sfo: "Securities and Futures Ordinance",
    hkle1Licensing: "Licensing & Subsidiary Legislation",
    hkle1Conduct: "Business Conduct & Client Relations",
    hkle1Operations: "Business Operations, Internal Control & AML",
    hkle1Exchanges: "Participating in the Hong Kong Exchanges",
    hkle1Capital: "Accessing Public Capital",
    hkle1Misconduct: "Market Misconduct & Improper Trading",
```

## app/globals.css

Hue from the batch table (275 70% 22%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Hong Kong LE Paper 1 theme */
  [data-theme="hklesfi1"] {
    --brand: 275 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 275 70% 96%;
    --brand-hover: 275 70% 18%;
    --brand-dark: 275 70% 17%;
    --brand-darker: 275 65% 11%;
    --brand-muted: 275 25% 70%;
    --brand-border: 275 25% 80%;
    --brand-border-light: 275 22% 89%;
    --brand-gradient-to: 280 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `hklesfi1: "Hong Kong LE Paper 1 practice for an SFC licence: regulators and company law, the Securities and Futures Ordinance, licensing, client money and records rules, the Code of Conduct, internal control and AML, the exchanges, listing and takeovers, and market misconduct, in three 60-question mock tests with every answer explained.",`
- `EXAM_ORG`: `hklesfi1: "HKSI Institute · LE Paper 1 syllabus v3.5, SFC licensing",`
- Hub group: a new group shared with `hkiiqe1`, right after "Hong Kong driving tests":
  `{ title: "Hong Kong insurance and securities exams", ids: ["hkiiqe1", "hklesfi1"] },`
  (if `hkiiqe1` is not wired, `ids: ["hklesfi1"]`).
- `SEARCH_ALIASES`:
  `hklesfi1: "le paper 1 hksi paper 1 hksi le paper 1 licensing examination for securities and futures intermediaries fundamentals of securities and futures regulation sfc licence exam sfc license exam hong kong securities licence exam hk securities exam type 1 licence type 4 type 9 representative licence responsible officer exam hksi exam paper one sfo exam",`
- `RELATED_OVERRIDES`: `hklesfi1: ["hkiiqe1", "sie", "series7"],` (a small group needs padding; drop
  `hkiiqe1` if it is not wired).

## lib/region.ts

`hklesfi1: "HK",` in `TEST_REGIONS` (next to `hkdrive: "HK"`), and add `"hklesfi1"` to
`NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  hklesfi1: {
    answer:
      "LE Paper 1, Fundamentals of Securities and Futures Regulation, is the local regulatory framework paper of the Licensing Examination for Securities and Futures Intermediaries, run by the HKSI Institute to meet the competence requirements the SFC recognises for representatives and responsible officers. It is 60 multiple-choice questions in 90 minutes with a 70% pass mark, taken as a computer-based exam in English or Traditional Chinese. Syllabus Version 3.5, in force from 30 June 2026, has nine topics, from Hong Kong's regulators and the Securities and Futures Ordinance to business conduct, anti-money laundering, listing and market misconduct.",
    rows: [
      { label: "Questions", value: "60 multiple choice" },
      { label: "Time", value: "90 minutes" },
      { label: "Pass mark", value: "70%" },
      { label: "Languages", value: "English or Traditional Chinese" },
      { label: "Format", value: "Computer-based, in Hong Kong or at global centres" },
      { label: "Syllabus", value: "Version 3.5, from 30 June 2026, nine topics" },
      { label: "Run by", value: "HKSI Institute, for SFC licensing" },
    ],
    basedOn: "HKSI Institute LE overview page and the Paper 1 syllabus Version 3.5, checked November 2026",
    source: { name: "HKSI Institute: Licensing Examination for Securities and Futures Intermediaries", url: "https://www.hksi.org/en/qualification/practising-qualifications/licensing-examination-for-securities-and-futures-intermediaries/overview/" },
  },
```
(Fees differ between HKSI pages and are left out. Which papers a person needs depends on the
role and the SFC's Guidelines on Competence.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing: people self-study for Paper 1 (firms and course providers may run classes; an optional
`hklesfi1: "LE Paper 1 courses"` TEACHES line is reasonable if the integrator wants it).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing required: sitemaps map over `EXAMS`, no redirects, `building` icon exists, tiger falls back
to the DMV one. Optionally borrow the Series 7 set through `BORROWED_SETS` (`hklesfi1: "series7"`).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 44).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing hklesfi1:le-paper-1:18201`

## CLAUDE.md (under Additional Exams, after the LLQP bullet or with `hkiiqe1`)

```md
- **LE Paper 1** (`hklesfi1`, Hong Kong Licensing Examination for Securities and Futures Intermediaries, Paper 1: Fundamentals of Securities and Futures Regulation, run by the HKSI Institute for SFC licensing, `/le-paper-1/*`, landing `/le-paper-1-practice-test`): `data/hk-le-paper-1-questions.json` (200 original questions on the nine topics of syllabus Version 3.5, effective 30 June 2026: regulatory overview 20, Hong Kong law and the Companies Ordinance 16, the SFO 30, licensing and subsidiary legislation (FRR, client money and securities, contract notes, records, audit, OTC derivatives, OFCs) 30, business conduct (Code of Conduct, FMCC, CFA, CRA, OFC and share registrar codes) 30, operations, ICG and MIC, AML/CFT, PDPO and governance 28, the exchanges and Stock Connect 16, listing, takeovers and authorised products 16, market misconduct 14), three real-length tests: test IDs 18201-18203 (60 questions each), sets 18201-18206 (by topic), state `HKLE1`, prefix `HKLE1-`, 70% pass (42 of 60, like the real 60 questions in 90 minutes at 70%, English or Traditional Chinese, computer based). 6/5/9/9/9/8/5/5/4 per test (Tigertest's split: HKSI publishes no topic weights); the last items of each pool (20 in all) are training-only. Hong Kong law as of November 2026; no money figures. Kept clear of the US `sie` bank and of `hkiiqe1`'s JFIU, tipping off and PDPO items. Built by `tools/next100/hklesfi1/build.py`; sources in `tools/next100/hklesfi1/sources.md`. Region HK, hub group "Hong Kong insurance and securities exams", `[data-theme="hklesfi1"]` deep violet (275 70% 22%), borrows the Series 7 tiger.
```
