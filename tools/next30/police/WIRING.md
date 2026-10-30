# Wiring for `police` (police officer entrance written exam, US, v1)

Files already written by the builder: `data/police-exam-questions.json` (200, PASS),
`lib/banks/police.ts`, `app/police-exam/*` (8 wrappers, copied from `app/life-in-the-uk/`),
`app/police-exam-practice-test/page.tsx`, `tools/next30/police/*` (spec, sources, `q_*.py`, `build.py`).
Everything below goes in shared files.

Format note: generic exam, no vendor. 4 tests x 50 (each pool exactly 4x its per-test count, so no
item repeats across tests), 5 content training sets. Dashboard = 5 sets + 4 tests = 9 steps.
Pass line `ceil(0.70 * 50) = 35`. Set 5 (56) is under the 60 part limit, so no parts.

## lib/exams.ts

Add `"police"` to the `ExamId` union. Icon `badge` already exists in the icon union.

```ts
const police: ExamConfig = {
  id: "police",
  stateCode: "POLICE",
  idBase: 11300,
  slug: "/police-exam",
  landingPath: "/police-exam-practice-test",
  name: "Police Exam Practice Test",
  shortName: "Police Exam",
  examLabel: "Police Officer Written Exam",
  fullName: "police officer entrance written exam",
  questionIdPrefix: "POLICE-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // There is no national police exam: agencies use a vendor test (NPOST, FrontLine National,
  // California POST's PELLETB, reported by secondary sources, not confirmed by POST, to have
  // dropped its CLOZE sub-test from January 2025), a civil service exam or their own. This blueprint covers the skills they share, weighted toward
  // reading and writing as every format is: reading 20%, grammar/spelling/vocabulary 20%,
  // report writing 16%, math 16%, situational judgment 16%, reasoning 12%. Memory/observation
  // sections (picture study) are omitted. 70% is a common agency cut-off, used as a marker.
  // Sources checked October 2026; all items original, no vendor named.
  blueprint: {
    polReading: 10,
    polGrammar: 10,
    polReports: 8,
    polMath: 8,
    polJudgment: 8,
    polReasoning: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 11301, name: "Reading Comprehension", categories: ["polReading"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 11302, name: "Grammar, Spelling & Vocabulary", categories: ["polGrammar"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 11303, name: "Report Writing & Clarity", categories: ["polReports"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 4, id: 11304, name: "Math", categories: ["polMath"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 5, id: 11305, name: "Judgment & Reasoning", categories: ["polJudgment", "polReasoning"], size: 56, weightLabel: "14 of 50 test questions" },
  ],
  categoryLabels: {
    polReading: "Reading Comprehension",
    polGrammar: "Grammar, Spelling & Vocabulary",
    polReports: "Report Writing & Clarity",
    polMath: "Math",
    polJudgment: "Situational Judgment & Ethics",
    polReasoning: "Reasoning & Problem Solving",
  },
  copy: {
    guestPrompt: "to save your police exam progress and track every question you miss",
    trainingHeading: "Train by skill",
    trainingSub: "Five sets covering every section of the police written exam: reading, grammar and spelling, report writing, math, and judgment and reasoning. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across every section, 70% to pass",
    heroSubs: [
      "Six skills, four tests. Reading and writing weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Go apply and book your written exam.",
    ],
    sourceLine: "Based on the skills police entrance exams share: reading, writing, report writing, math and judgment. Original questions; your agency's test, cut-off and later steps vary.",
    analyticsKey: "police",
  },
};
```

Append `police` to the `EXAMS` array next to `security`.

Check: 11301-11305 (sets) and 11301-11304 (tests) must be free; SPEC.md assigns idBase 11300.

## lib/banks/all.ts

```ts
import "./police";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/police.ts`.

## types/index.ts

- `QuestionType`: add `| "POLICE"`.
- `QuestionCategory`, under a `// Police officer entrance exam` comment:

```ts
  | "polReading"
  | "polGrammar"
  | "polReports"
  | "polMath"
  | "polJudgment"
  | "polReasoning"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    polReading: "Reading Comprehension",
    polGrammar: "Grammar, Spelling & Vocabulary",
    polReports: "Report Writing & Clarity",
    polMath: "Math",
    polJudgment: "Situational Judgment & Ethics",
    polReasoning: "Reasoning & Problem Solving",
```

## app/globals.css

Suggested hue 222, a navy police blue (re-pick if it clashes with `security` or `uklitu`), then
run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Police exam theme */
  [data-theme="police"] {
    --brand: 222 65% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 222 70% 96%;
    --brand-hover: 222 65% 25%;
    --brand-dark: 222 65% 22%;
    --brand-darker: 222 60% 14%;
    --brand-muted: 222 30% 70%;
    --brand-border: 222 35% 80%;
    --brand-border-light: 222 32% 89%;
    --brand-gradient-to: 45 80% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `police: "Police officer written exam prep: reading comprehension, grammar and spelling, incident report writing, math, situational judgment and reasoning, the skills every agency's entrance test checks.",`
- `EXAM_ORG`: `police: "Police officer entrance exams · agency and civil service",`
- Hub group: add `"police"` to `{ title: "Emergency services", ids: ["emt", "paramedic", "cpr", ...] }`
  (with `ffi` from this batch if merged).
- `SEARCH_ALIASES`:
  `police: "police exam police officer test law enforcement written exam entrance exam cop test police academy civil service police test npost frontline pelletb leab sheriff deputy corrections officer trooper",`

## lib/region.ts

Nothing: US is the default, so no `TEST_REGIONS` entry, and it stays out of `NON_DRIVING_TESTS`
(that set lists non-US exams only).

## lib/examFacts.ts

```ts
  police: {
    answer:
      "There is no single national police exam. Most US agencies start hiring with a multiple-choice written test, from a testing company, a state board such as California POST (the PELLETB) or a civil service commission, that checks reading comprehension, writing and grammar, report writing, basic math and judgment. Each agency sets its own passing score, often 70 percent, and many rank candidates by score. Passing leads to a physical ability test, an oral board, a background investigation and psychological and medical exams.",
    rows: [
      { label: "Format", value: "Multiple choice, by agency" },
      { label: "Sections", value: "Reading, writing, math, judgment" },
      { label: "Passing score", value: "Set by the agency (often 70%)" },
      { label: "Given by", value: "Agency, civil service or state board" },
      { label: "Next steps", value: "Physical test, oral board, background" },
    ],
    basedOn: "common police entrance test formats and California POST's PELLETB guide, checked October 2026",
    source: { name: "California POST: PELLETB", url: "https://post.ca.gov/portals/0/post_docs/publications/Applicant_Preparation_Guide_for-the-POST_Entry-Level-Law-Enforcement-Test-Battery.pdf" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx

Add `"police"` to `TEACHER_LED` (criminal justice programs and academy prep courses), next to `"security"`.

## components/exam/ExamClassFaq.tsx

In `TEACHES`: `police: "a criminal justice or police exam prep course",`. The landing already renders
`<ExamClassFaq examId="police" />` and `classFaqJsonLd("police")`.

## lib/tigerAssets.ts

Nothing: falls back to the DMV tiger.

## Landing breadcrumbs

The brief asks for `<ExamLandingBreadcrumbs examId>`, but no such component exists in this tree
(the uklitu template does not render one either). If the integrator adds it, place it right after
the JSON-LD script in `app/police-exam-practice-test/page.tsx`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects, `badge`
icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing police:police-exam:11301`

## CLAUDE.md (under Additional Exams)

```md
- **Police Exam** (police officer entrance written exam, generic, no vendor, `/police-exam/*`, landing `/police-exam-practice-test`): `data/police-exam-questions.json` (200 original questions: reading 40 with embedded passages about a fictional department, grammar/spelling/vocabulary 40, report writing 32, math 32, situational judgment 32, reasoning 24), test IDs 11301-11304, sets 11301-11305 (by skill; set 5 joins judgment and reasoning), state `POLICE`, 70% pass (a common agency cut-off; each agency sets its own). 10/10/8/8/8/6 per test. No memory/observation section (needs pictures), no state law. Built by `tools/next30/police/build.py`; sources in `tools/next30/police/sources.md`. Hub group "Emergency services".
```
