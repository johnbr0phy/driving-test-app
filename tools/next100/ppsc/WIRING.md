# Wiring for `ppsc` (PPSC general ability and GK screening test, Punjab Public Service Commission, v1)

Files already written by the builder: `data/ppsc-questions.json` (200, PASS), `lib/banks/ppsc.ts`,
`app/ppsc/*` (5 wrappers: layout, redirect, dashboard, drill, stats; copied from
`app/nigeria-police-recruitment/`), `app/ppsc-practice-test/page.tsx`, `tools/next100/ppsc/*`
(spec, sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/ppsc/build.py`.
Everything below goes in shared files.

Format note: PPSC publishes a syllabus with each advertisement; ppsc.gop.pk did not load from this
environment (503 / connection reset, 2026-11-05), so the format is from guides and search snippets
of PPSC syllabus PDFs: a one-paper MCQ test, commonly 100 questions in 90 minutes, a general ability
part (GK, Pakistan Studies, Islamic Studies or Ethics, current affairs, geography, English, basic
maths, everyday science, computers), negative marking
reported both ways. Tigertest models four 50-question tests at a 70% target (35 of 50). Pools are
exactly 4x each per-test count (no spares). Dashboard = 5 topic sets + 4 tests = 9 steps. No set
exceeds 60. GK lane in this batch: Pakistan Studies (to 1956), the 1973 Constitution, Pakistan and
world geography, Islamiat and computers; no current affairs, everyday science, Punjab districts,
policing or office-holders.

## lib/exams.ts

Add `"ppsc"` to the `ExamId` union. Icon `building` already exists.

Block (after `pkdrive`, with the other Pakistan exams of international batch 3):

```ts
const ppsc: ExamConfig = {
  id: "ppsc",
  stateCode: "PKPPSC",
  idBase: 19900,
  slug: "/ppsc",
  landingPath: "/ppsc-practice-test",
  name: "PPSC Practice Test",
  shortName: "PPSC test",
  examLabel: "PPSC general ability test",
  fullName: "PPSC general ability and general knowledge screening test (Punjab Public Service Commission)",
  questionIdPrefix: "PPSC-",
  icon: "building",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Source: the Punjab Public Service Commission (Pakistan) sets a syllabus per advertisement.
  // ppsc.gop.pk did not load when checked (2026-11-05); guides and search snippets of PPSC
  // syllabus PDFs describe a one-paper MCQ test of 100 questions in 90 minutes whose general
  // ability part covers general knowledge, Pakistan Studies, Islamic Studies (Ethics for
  // non-Muslims), current affairs, geography, English, basic maths, everyday science and
  // computers; negative marking and the qualifying mark vary by post. Weights are Tigertest's own
  // (English 13, maths 7, reasoning 5, Pakistan Studies 7, Constitution 6, geography 6, Islamiat 3,
  // computers 3 per test) and 70% (35 of 50) is Tigertest's target. Constitution items checked
  // against the 1973 Constitution text (pakistani.org). Current affairs and everyday science are
  // not modelled. Pools are exactly 4x each count (no spares). All items original.
  blueprint: {
    ppscEnglish: 7,
    ppscVocab: 6,
    ppscMaths: 7,
    ppscReasoning: 5,
    ppscHistory: 7,
    ppscConstitution: 6,
    ppscGeography: 6,
    ppscIslamiat: 3,
    ppscComputer: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 19901, name: "English Grammar & Vocabulary", categories: ["ppscEnglish", "ppscVocab"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 19902, name: "Mathematics & Reasoning", categories: ["ppscMaths", "ppscReasoning"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 19903, name: "Pakistan Studies & Islamiat", categories: ["ppscHistory", "ppscIslamiat"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 19904, name: "Constitution & Computers", categories: ["ppscConstitution", "ppscComputer"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 19905, name: "Pakistan & World Geography", categories: ["ppscGeography"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    ppscEnglish: "English: Grammar & Usage",
    ppscVocab: "English: Vocabulary & Idioms",
    ppscMaths: "Basic Mathematics",
    ppscReasoning: "Reasoning & Mental Ability",
    ppscHistory: "Pakistan Studies: History to 1956",
    ppscConstitution: "The 1973 Constitution",
    ppscGeography: "Pakistan & World Geography",
    ppscIslamiat: "Islamic Studies",
    ppscComputer: "Basic Computer Skills",
  },
  copy: {
    guestPrompt: "to save your PPSC test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the English, mathematics, reasoning and general knowledge in the general ability part of PPSC tests. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 35 or more",
    heroSubs: [
      "Five topics, four 50-question tests. English and maths weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Check your advertisement's syllabus and go.",
    ],
    sourceLine: "Based on the general ability syllabus of PPSC written tests and the 1973 Constitution. Original questions; 50 per test, 70% is Tigertest's target.",
    analyticsKey: "ppsc",
  },
};
```

Append `ppsc` to the `EXAMS` array (after `pkdrive`).

Check: 19901-19905 (sets) and 19901-19904 (tests) are free (BRIEF reserves idBase 19900).

## lib/banks/all.ts

```ts
import "./ppsc";
```

## types/index.ts

- `QuestionType`: add `| "PKPPSC"`.
- `QuestionCategory`, under a `// PPSC general ability (Pakistan)` comment:

```ts
  | "ppscEnglish"
  | "ppscVocab"
  | "ppscMaths"
  | "ppscReasoning"
  | "ppscHistory"
  | "ppscConstitution"
  | "ppscGeography"
  | "ppscIslamiat"
  | "ppscComputer"
```

(Keys grepped against `types/index.ts` and `i18n/en.ts` on 2026-11-05: no `ppsc*` keys exist.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ppscEnglish: "English: Grammar & Usage",
    ppscVocab: "English: Vocabulary & Idioms",
    ppscMaths: "Basic Mathematics",
    ppscReasoning: "Reasoning & Mental Ability",
    ppscHistory: "Pakistan Studies: History to 1956",
    ppscConstitution: "The 1973 Constitution",
    ppscGeography: "Pakistan & World Geography",
    ppscIslamiat: "Islamic Studies",
    ppscComputer: "Basic Computer Skills",
```

## app/globals.css

Hue from the brief's table, used as given: **145 55% 18%** (deep government green). Then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* PPSC general ability (Pakistan) theme */
  [data-theme="ppsc"] {
    --brand: 145 55% 18%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 145 45% 95%;
    --brand-hover: 145 55% 14%;
    --brand-dark: 145 55% 12%;
    --brand-darker: 145 50% 8%;
    --brand-muted: 145 25% 65%;
    --brand-border: 145 25% 76%;
    --brand-border-light: 145 22% 88%;
    --brand-gradient-to: 160 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ppsc: "Four 50-question mock tests for the general ability part of Punjab Public Service Commission written tests: English grammar and vocabulary, basic mathematics, reasoning, Pakistan Studies, the 1973 Constitution, Pakistan and world geography, Islamic Studies and computers.",`
- `EXAM_ORG`: `ppsc: "Punjab Public Service Commission (Pakistan) · one-paper MCQ test, general ability part",`
- Hub group, new, right after `{ title: "Pakistan driving tests", ids: ["pkdrive"] }` (the same line
  punjabpolice's WIRING.md gives):
  `{ title: "Pakistan government and police recruitment tests", ids: ["ppsc", "punjabpolice", "pakarmy", "pkpaf"] },`
  (if ppsc ships before two others, add `RELATED_OVERRIDES` `ppsc: ["pkdrive", "punjabpolice", "phcse"],`).
- `SEARCH_ALIASES`:
  `ppsc: "ppsc punjab public service commission ppsc test preparation ppsc mcqs ppsc one paper mcq ppsc general ability test ppsc screening test ppsc past papers pakistan studies mcqs islamiat mcqs general knowledge mcqs pakistan english mcqs lecturer assistant junior clerk tehsildar naib tehsildar sub inspector ppsc lahore punjab jobs fpsc spsc kppsc",`

## lib/region.ts

- `TEST_REGIONS`: `ppsc: "PK",` (on the line with `pkdrive: "PK"`).
- `NON_DRIVING_TESTS`: add `"ppsc"`.

## lib/examFacts.ts

```ts
  ppsc: {
    answer:
      "The Punjab Public Service Commission (PPSC), founded in 1937 and based in Lahore, recruits for posts in the Government of Punjab, Pakistan. Each advertisement links its own syllabus. Many posts use a one-paper MCQ written test, which guides describe as 100 questions in 90 minutes, with a general ability part covering general knowledge, Pakistan Studies, Islamic Studies (Ethics for non-Muslims), current affairs, geography, English, basic mathematics, everyday science and computers, often alongside questions on the post's own subject. The qualifying mark and whether wrong answers lose marks vary by post, so check the advertisement. Qualified candidates are usually interviewed.",
    rows: [
      { label: "Run by", value: "Punjab Public Service Commission, Lahore" },
      { label: "Format", value: "One-paper MCQ test (syllabus set per post)" },
      { label: "Questions and time (guides)", value: "Commonly 100 MCQs in 90 minutes" },
      { label: "General ability topics", value: "GK, Pakistan Studies, Islamiat, current affairs, English, maths, science, computers" },
      { label: "Pass mark", value: "Varies by post (not published as one figure)" },
      { label: "Negative marking", value: "Varies by post; check your advertisement" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
      { label: "After the test", value: "Interview for qualified candidates" },
    ],
    basedOn: "Guides to PPSC one-paper MCQ tests and search listings of PPSC syllabus notices, checked November 2026 (ppsc.gop.pk did not load when checked)",
    source: { name: "Punjab Public Service Commission", url: "https://www.ppsc.gop.pk/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: the brief does not list ppsc as teacher-led, and the landing has no `ExamClassFaq`.

## lib/tigerAssets.ts

`BORROWED_SETS`: `ppsc: "phcse",` (the Philippine civil service exam tiger; `"ssccgl"` also fits).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `building` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ppsc:ppsc:19901`

## CLAUDE.md (after the Pakistan Driving Test bullet, with the other Pakistan recruitment bullets)

```md
- **PPSC Test** (`ppsc`, Punjab Public Service Commission, Pakistan: the general ability and general knowledge part of its one-paper MCQ written tests, `/ppsc/*`, landing `/ppsc-practice-test`): `data/ppsc-questions.json` (200 original questions: English grammar and usage 28, vocabulary, idioms and one-word substitutes 24, basic mathematics 28, reasoning 20, Pakistan Studies to 1956 28, the 1973 Constitution 24, Pakistan and world geography 24, Islamic Studies 12, basic computers 12), test IDs 19901-19904 (50 questions each), sets 19901-19905 (by topic), state `PKPPSC`, prefix `PPSC-`, 70% pass (Tigertest's target: PPSC sets a syllabus per advertisement; guides describe 100 MCQs in 90 minutes, qualifying marks and negative marking vary by post, and ppsc.gop.pk did not load when checked). 7/6/7/5/7/6/6/3/3 per test, no spares. GK lane in its batch: Pakistan Studies, the 1973 Constitution (articles checked against its text), geography, mainstream Islamiat and computers; no current affairs, everyday science, office-holders or Kashmir. Built by `tools/next100/ppsc/build.py`; sources in `tools/next100/ppsc/sources.md`. Region PK, hub group "Pakistan government and police recruitment tests", `[data-theme="ppsc"]` deep green (145 55% 18%), borrows the PHCSE tiger.
```
