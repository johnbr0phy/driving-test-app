# Wiring for `zasaps` (SAPS police trainee recruitment assessment, v1)

Files already written by the builder: `data/saps-recruitment-questions.json` (200, PASS),
`lib/banks/zasaps.ts`, `app/saps-trainee-assessment/*` (5 wrappers: layout, redirect, dashboard,
drill, stats; copied from `app/nigeria-police-recruitment/`, no test or practice folders),
`app/saps-recruitment-test-practice-test/page.tsx`, `tools/next100/zasaps/*` (spec, sources,
`q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/zasaps/build.py`. Everything below
goes in shared files.

**Integrator, note:** the format facts below were checked on 2026-11-05 against the official
SAPS 2026/2027 entry-level police trainee advertisement (reference TRA26/27, closing 13 November
2026, https://www.saps.gov.za/careers/downloads/2026/trainee/Police-Trainee-Advert-2026-2027.pdf),
the SAPS Police Trainees page (https://www.saps.gov.za/careers/ptrainees.php) and e-Recruitment
FAQ 21 (https://www.saps.gov.za/careers/faq21.php). The advertisement names fitness,
psychometric and integrity testing, a medical evaluation, an interview and vetting, but does not
say what the psychometric test contains or publish a question count, time or pass mark, so the
literacy, numeracy and reasoning content stays labelled "guides describe". See `sources.md`.

Format note: Tigertest models only the written literacy, numeracy and reasoning part; the
personality questionnaire, physical fitness assessment, interview, medical and vetting are not
modelled, and no personality items are written. Four 50-question tests at a 70% target (35 of 50),
Tigertest's own. Pools are exactly 4x each per-test count (no spares). Dashboard = 5 topic sets
+ 4 tests = 9 steps. No set exceeds 60. No GK or law items (kept clear of punjabpolice, ngpolice,
police, phnapolcom: those banks were grepped for stems and number sets).

## lib/exams.ts

Add `"zasaps"` to the `ExamId` union. Icon `badge` already exists.

Block (after `zak53c3`, or with the other international batch 3 exams):

```ts
const zasaps: ExamConfig = {
  id: "zasaps",
  stateCode: "ZASAPS",
  idBase: 20600,
  slug: "/saps-trainee-assessment",
  landingPath: "/saps-recruitment-test-practice-test",
  name: "SAPS Recruitment Practice Test",
  shortName: "SAPS test",
  examLabel: "SAPS police trainee assessment",
  fullName: "SAPS police trainee recruitment assessment (written literacy, numeracy and reasoning)",
  questionIdPrefix: "ZASAPS-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // The South African Police Service recruits police trainees through advertised intakes; the
  // 2026/2027 advertisement (TRA26/27) names fitness, psychometric and integrity testing, a
  // medical evaluation, an interview and vetting (guides: the written test covers literacy,
  // numeracy and reasoning).
  // SAPS publishes no question count, time, subject split or pass mark. Tigertest models only
  // the written literacy, numeracy and reasoning part; weights (English and reading 22,
  // numeracy 18, reasoning 10 per test) and 70% (35 of 50) are Tigertest's own. Figure-only
  // reasoning is written as text patterns. No personality, GK or law items. Checked 2026-11-05
  // against the SAPS 2026/2027 trainee advertisement (see tools/next100/zasaps/sources.md). Pools are exactly
  // 4x each count (no spares). All items original.
  blueprint: {
    zasapsGrammar: 8,
    zasapsVocab: 6,
    zasapsReading: 8,
    zasapsNumber: 7,
    zasapsWordProblems: 7,
    zasapsData: 4,
    zasapsVerbal: 5,
    zasapsLogic: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 20601, name: "Grammar, Spelling & Vocabulary", categories: ["zasapsGrammar", "zasapsVocab"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 2, id: 20602, name: "Reading Comprehension", categories: ["zasapsReading"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 3, id: 20603, name: "Numbers & Data", categories: ["zasapsNumber", "zasapsData"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 4, id: 20604, name: "Word Problems", categories: ["zasapsWordProblems"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 5, id: 20605, name: "Verbal & Logical Reasoning", categories: ["zasapsVerbal", "zasapsLogic"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    zasapsGrammar: "English: Grammar & Spelling",
    zasapsVocab: "English: Vocabulary & Idioms",
    zasapsReading: "Reading Comprehension",
    zasapsNumber: "Numeracy: Numbers & Calculation",
    zasapsWordProblems: "Numeracy: Word Problems",
    zasapsData: "Numeracy: Tables & Data",
    zasapsVerbal: "Verbal Reasoning",
    zasapsLogic: "Logical & Pattern Reasoning",
  },
  copy: {
    guestPrompt: "to save your SAPS assessment progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the English, reading, numeracy and reasoning the written trainee assessment checks. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 35 or more",
    heroSubs: [
      "Five topics, four 50-question tests. English and reading weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Now get fit for the physical assessment.",
    ],
    sourceLine: "Original literacy, numeracy and reasoning questions for the written part of the SAPS police trainee assessment. SAPS publishes no format; 50 per test and 70% are Tigertest's own.",
    analyticsKey: "zasaps",
  },
};
```

Append `zasaps` to the `EXAMS` array (with the other international batch 3 exams).

Check: 20601-20605 (sets) and 20601-20604 (tests) must be free (BRIEF reserves idBase 20600).

## lib/banks/all.ts

```ts
import "./zasaps";
```

## types/index.ts

- `QuestionType`: add `| "ZASAPS"`.
- `QuestionCategory`, under a `// SAPS police trainee assessment` comment:

```ts
  | "zasapsGrammar"
  | "zasapsVocab"
  | "zasapsReading"
  | "zasapsNumber"
  | "zasapsWordProblems"
  | "zasapsData"
  | "zasapsVerbal"
  | "zasapsLogic"
```

(Keys grepped against `types/index.ts` on 2026-11-05: no `zasaps*` keys exist.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    zasapsGrammar: "English: Grammar & Spelling",
    zasapsVocab: "English: Vocabulary & Idioms",
    zasapsReading: "Reading Comprehension",
    zasapsNumber: "Numeracy: Numbers & Calculation",
    zasapsWordProblems: "Numeracy: Word Problems",
    zasapsData: "Numeracy: Tables & Data",
    zasapsVerbal: "Verbal Reasoning",
    zasapsLogic: "Logical & Pattern Reasoning",
```

## app/globals.css

Hue as given in the BRIEF (230 55% 18%, already checked there). Then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* SAPS police trainee assessment theme */
  [data-theme="zasaps"] {
    --brand: 230 55% 18%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 230 50% 95%;
    --brand-hover: 230 55% 14%;
    --brand-dark: 230 55% 14%;
    --brand-darker: 230 55% 10%;
    --brand-muted: 230 25% 66%;
    --brand-border: 230 28% 78%;
    --brand-border-light: 230 26% 88%;
    --brand-gradient-to: 230 35% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `zasaps: "Four 50-question mock tests for the written part of the SAPS police trainee recruitment assessment: English grammar, vocabulary and reading comprehension, numeracy, word problems and tables, and verbal and logical reasoning.",`
- `EXAM_ORG`: `zasaps: "South African Police Service · police trainee recruitment assessment",`
- Hub group, new, placed after "South Africa driving tests" (and after "South Africa financial
  services licensing exams" if zare5 ships), shared with zapsira:
  `{ title: "South Africa police and security tests", ids: ["zasaps", "zapsira"] },`
- `RELATED_OVERRIDES` (the group has two members): `zasaps: ["zapsira", "zak53", "ngpolice"],`
- `SEARCH_ALIASES`:
  `zasaps: "saps recruitment test saps police trainee saps trainee assessment saps psychometric test saps aptitude test police trainee south africa saps literacy numeracy test saps intake south african police service recruitment police constable south africa saps application 2026 police academy south africa",`

## lib/region.ts

- `TEST_REGIONS`: `zasaps: "ZA",` (on the line with `zak53: "ZA"`).
- `NON_DRIVING_TESTS`: add `"zasaps"`.

## lib/examFacts.ts

```ts
  zasaps: {
    answer:
      "The South African Police Service (SAPS) recruits entry-level police trainees through advertised intakes; the 2026/2027 advertisement (reference TRA26/27) closes on 13 November 2026. Applicants must be South African citizens aged 18 to 35 at the closing date, hold a Grade 12 certificate, be proficient in English and one other official language and have no criminal convictions or pending cases. Every applicant faces fitness, psychometric and integrity testing, a medical evaluation and an interview, and vetting that includes fingerprint verification; trainees then attend a SAPS Training Academy. SAPS does not publish the number of questions, the time or a pass mark for the written assessment; guides describe literacy, numeracy and reasoning questions. Applying costs nothing. Tigertest practises the literacy, numeracy and reasoning part with four 50-question mock tests and a 70% target.",
    rows: [
      { label: "Run by", value: "South African Police Service (SAPS)" },
      { label: "Assessments", value: "Fitness, psychometric and integrity testing, medical, interview, vetting" },
      { label: "Written test content (guides)", value: "Literacy, numeracy and reasoning" },
      { label: "Questions and time", value: "Not published" },
      { label: "Pass mark", value: "Not published" },
      { label: "Age and education", value: "18 to 35 at the closing date, Grade 12" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
      { label: "Cost", value: "Free to apply" },
    ],
    basedOn: "SAPS entry-level police trainee advertisement 2026/2027 (TRA26/27) and e-Recruitment FAQ, checked November 2026",
    source: { name: "South African Police Service", url: "https://www.saps.gov.za/careers/ptrainees.php" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: not teacher-led in the BRIEF (people self-study for the SAPS assessment). The landing
does not render `ExamClassFaq`.

## lib/tigerAssets.ts

`BORROWED_SETS`: `zasaps: "police",` (the police tiger, like ngpolice and the Indian state police exams).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `badge` already exists.

## Region homepage (ZA)

`faqsFor("ZA")` / `REGION_HOME.ZA` need no change; once the hub group exists the ZA homepage lists
the test under its own tests. If the ZA home copy lists tests by name, add "the SAPS police trainee
assessment".

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing zasaps:saps-trainee-assessment:20601`

## CLAUDE.md (after the Nigeria recruitment bullets, or with the other international batch 3 bullets)

```md
- **SAPS Recruitment** (`zasaps`, the written literacy, numeracy and reasoning part of the South African Police Service police trainee recruitment assessment, `/saps-trainee-assessment/*`, landing `/saps-recruitment-test-practice-test`): `data/saps-recruitment-questions.json` (200 original questions: grammar and spelling 32, vocabulary and idioms 24, reading comprehension 32 (short notices, reports and passages in the stem), numbers and calculation 28, word problems 28, tables and data 16, verbal reasoning 20, logical and pattern reasoning 20 (figure-style items written as text)), test IDs 20601-20604 (50 questions each), sets 20601-20605 (by topic), state `ZASAPS`, prefix `ZASAPS-`, 70% pass (Tigertest's target: SAPS publishes no question count, time or pass mark). 8/6/8/7/7/4/5/5 per test, no spares. The personality questionnaire, fitness assessment, interview, medical and vetting are not modelled; no personality, GK or law items. South African settings, rand and metric. Selection stages, requirements and the free application are from the SAPS 2026/2027 trainee advertisement (TRA26/27); SAPS publishes no count, time or pass mark. Built by `tools/next100/zasaps/build.py`; sources in `tools/next100/zasaps/sources.md`. Region ZA, hub group "South Africa police and security tests" (with zapsira), `[data-theme="zasaps"]` deep navy (230 55% 18%), borrows the police tiger.
```
