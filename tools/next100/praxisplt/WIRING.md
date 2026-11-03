# Wiring for `praxisplt` (Praxis Principles of Learning and Teaching: Grades K-6, 5622, US, v1)

Files already written by the builder: `data/praxis-plt-questions.json` (200, PASS),
`lib/banks/praxisplt.ts`, `app/praxis-plt/*` (5 wrappers: layout, redirect, dashboard, drill,
stats, copied from `app/let-reviewer/`; no test or practice folders, the shared `app/[slug]`
routes serve them), `app/praxis-plt-practice-test/page.tsx`, `tools/next100/praxisplt/*` (spec,
sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/praxisplt/build.py`.
Everything below goes in shared files. `npx tsc` reports an error in `lib/banks/praxisplt.ts`
until `"praxisplt"` is in `ExamId`.

Format note: the real 5622 is 2 hours, 70 selected-response questions plus 4 constructed-response
questions on two case histories (ETS Study Companion, Test at a Glance). Selected response: I
Students as Learners 21 (22.5%), II Instructional Process 21 (22.5%), III Assessment 14 (15%), IV
Professional Development, Leadership and Community 14 (15%); V Analysis of Instructional
Scenarios is the 4 constructed responses (25%), not modelled. ETS expects about 70 minutes on the
selected-response section. Tigertest models four 50-question selected-response tests at the same
proportions, 15/15/10/10, with each ETS category split along its own subheadings: I.A 6, I.B 5,
I.C 4; II.A 5, II.B 6, II.C+D 4; III.A 5, III.B 5; IV items 1-6 6, IV item 7 (legislation and
court decisions) 4. Pools exactly 4x per test. Dashboard = 4 category sets + 4 tests = 8 steps
(sets 60/60/40/40, none over 60, no parts). ETS sets no pass mark (states set qualifying scores;
guides report 160 on 100-200 in many states), so 70% is Tigertest's readiness line.

## lib/exams.ts

Add `"praxisplt"` to the `ExamId` union. Icon `graduation` already exists.

```ts
const praxisplt: ExamConfig = {
  id: "praxisplt",
  stateCode: "PRAXISPLT",
  idBase: 15800,
  slug: "/praxis-plt",
  landingPath: "/praxis-plt-practice-test",
  name: "Praxis PLT K-6 Practice Test",
  shortName: "Praxis PLT",
  examLabel: "Praxis PLT K-6",
  fullName: "Praxis Principles of Learning and Teaching: Grades K-6 (5622)",
  questionIdPrefix: "PLT-",
  icon: "graduation",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // ETS Praxis Study Companion for 5622 (Test at a Glance, checked 2026-11-02): 2 hours, 70
  // selected-response + 4 constructed-response on two case histories. Selected response: I
  // Students as Learners 21 (22.5%), II Instructional Process 21 (22.5%), III Assessment 14 (15%),
  // IV Professional Development, Leadership and Community 14 (15%); V (constructed response,
  // 25%) not modelled. 21/21/14/14 of 70 scales to 15/15/10/10 of 50, split by ETS subheadings:
  // I.A 6, I.B 5, I.C 4; II.A 5, II.B 6, II.C+D 4; III.A 5, III.B 5; IV.1-6 6, IV.7 4.
  // ETS sets no pass mark (states do); 70% is a readiness line. Pools exactly 4x. All items original.
  blueprint: {
    pltDevelopment: 6,
    pltDiverse: 5,
    pltMotivation: 4,
    pltPlanning: 5,
    pltStrategies: 6,
    pltQuestioning: 4,
    pltAssessStrategies: 5,
    pltTesting: 5,
    pltProfessional: 6,
    pltLaw: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 15801, name: "Students as Learners", categories: ["pltDevelopment", "pltDiverse", "pltMotivation"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 2, id: 15802, name: "Instructional Process", categories: ["pltPlanning", "pltStrategies", "pltQuestioning"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 3, id: 15803, name: "Assessment", categories: ["pltAssessStrategies", "pltTesting"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 15804, name: "Professional Development, Leadership & Community", categories: ["pltProfessional", "pltLaw"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    pltDevelopment: "Student Development & the Learning Process",
    pltDiverse: "Students as Diverse Learners",
    pltMotivation: "Motivation & the Learning Environment",
    pltPlanning: "Planning Instruction",
    pltStrategies: "Instructional Strategies",
    pltQuestioning: "Questioning & Communication",
    pltAssessStrategies: "Assessment & Evaluation Strategies",
    pltTesting: "Standardized Tests & Scoring",
    pltProfessional: "Professional Growth & Collaboration",
    pltLaw: "Laws & Court Decisions",
  },
  copy: {
    guestPrompt: "to save your Praxis PLT progress and track every question you miss",
    trainingHeading: "Train by PLT content category",
    trainingSub: "Four sets, one per ETS selected-response category: students as learners, instructional process, assessment, and professional development, leadership and community. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 selected-response questions, weighted like the 5622",
    heroSubs: [
      "Four categories, four practice tests. Students and instruction weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. You're ready for the PLT.",
    ],
    sourceLine: "Based on the ETS test specifications for Praxis PLT K-6 (5622). Original selected-response questions; the case-history written responses are not modelled. Not affiliated with ETS.",
    analyticsKey: "praxisplt",
  },
};
```

Append `praxisplt` to the `EXAMS` array (near `praxis`, or after the other batch A exams).

Check: 15801-15804 (sets and tests) must be free (BRIEF reserves idBase 15800; nothing in
`lib/exams.ts` used 158xx when checked).

## lib/banks/all.ts

```ts
import "./praxisplt";
```

## types/index.ts

- `QuestionType`: add `| "PRAXISPLT"`.
- `QuestionCategory`, under a `// Praxis PLT K-6 (5622)` comment:

```ts
  | "pltDevelopment"
  | "pltDiverse"
  | "pltMotivation"
  | "pltPlanning"
  | "pltStrategies"
  | "pltQuestioning"
  | "pltAssessStrategies"
  | "pltTesting"
  | "pltProfessional"
  | "pltLaw"
```

(Grepped: no existing `plt*` keys in `types/index.ts`.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    pltDevelopment: "Student Development & the Learning Process",
    pltDiverse: "Students as Diverse Learners",
    pltMotivation: "Motivation & the Learning Environment",
    pltPlanning: "Planning Instruction",
    pltStrategies: "Instructional Strategies",
    pltQuestioning: "Questioning & Communication",
    pltAssessStrategies: "Assessment & Evaluation Strategies",
    pltTesting: "Standardized Tests & Scoring",
    pltProfessional: "Professional Growth & Collaboration",
    pltLaw: "Laws & Court Decisions",
```

## app/globals.css

Hue from the brief (51 80% 38%, already checked against every theme). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Praxis PLT K-6 (5622) theme */
  [data-theme="praxisplt"] {
    --brand: 51 80% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 51 80% 95%;
    --brand-hover: 51 80% 32%;
    --brand-dark: 51 80% 26%;
    --brand-darker: 51 80% 17%;
    --brand-muted: 51 50% 70%;
    --brand-border: 51 55% 80%;
    --brand-border-light: 51 55% 89%;
    --brand-gradient-to: 35 70% 95%;
  }
```

Note: white text on 51 80% 38% is close to the 4.5:1 line for a yellow hue; if the integrator's
contrast check fails, darken to 51 80% 34% rather than changing the hue.

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `praxisplt: "Praxis Principles of Learning and Teaching: Grades K-6 (5622) for future elementary teachers: students as learners, the instructional process, assessment, and professional development, leadership and community, including IDEA, FERPA and key court cases, in four 50-question selected-response practice tests on the ETS specifications. The case-history written responses are not modelled.",`
- `EXAM_ORG`: `praxisplt: "ETS · Praxis PLT Grades K-6 (5622)",`
- Hub group: add a new group right after "GED, college, military & nursing school entrance":
  `{ title: "US teacher certification exams", ids: ["praxisplt", "texesppr"] },`
  (coordinate with the `texesppr` builder, who may propose the same group; `praxis` (Core) can
  move here too if the integrator wants all teacher tests together).
- `SEARCH_ALIASES`:
  `praxisplt: "praxis plt praxis plt k-6 praxis 5622 5622 principles of learning and teaching plt k-6 plt k6 praxis 2 plt praxis ii pedagogy elementary teacher certification test elementary teaching license exam ets plt praxis pedagogy test",`
- `RELATED_OVERRIDES`: `praxisplt: ["texesppr", "praxis", "phlet"],` and add `"praxisplt"` to
  `praxis`'s list (`praxis: ["praxisplt", "ged", "accuplacer", "sat"]`) if the integrator wants them
  linked both ways.

## lib/region.ts

Nothing: US is the default region (`regionOfTest()` falls back to "US").

## lib/examFacts.ts

```ts
  praxisplt: {
    answer:
      "Praxis Principles of Learning and Teaching: Grades K-6 (test code 5622) is an ETS test that many states require for an elementary teaching license. It lasts 2 hours and has 70 selected-response questions plus 4 constructed-response questions about two case histories. The selected-response questions cover Students as Learners (22.5% of the score), Instructional Process (22.5%), Assessment (15%), and Professional Development, Leadership and Community (15%); the written responses, Analysis of Instructional Scenarios, are the other 25%. ETS does not set a passing score: each state sets its own qualifying score.",
    rows: [
      { label: "Run by", value: "ETS (Praxis program)" },
      { label: "Questions", value: "70 selected response + 4 constructed response on two case histories" },
      { label: "Time", value: "2 hours (about 70 minutes selected response, 50 minutes written)" },
      { label: "Content", value: "Students as Learners 22.5%, Instructional Process 22.5%, Assessment 15%, Professional Development 15%, case histories 25%" },
      { label: "Pass mark", value: "Set by each state (guides report 160 on a 100-200 scale in many states)" },
      { label: "Delivery", value: "Computer delivered, at a test center or at home online" },
      { label: "Based on", value: "InTASC Model Core Teaching Standards" },
      { label: "Not modelled here", value: "The four case-history written responses" },
    ],
    basedOn: "The ETS Praxis Study Companion for Principles of Learning and Teaching: Grades K-6 (5622) and the ETS 5622 test page, checked November 2026",
    source: { name: "ETS Praxis: PLT Grades K-6 (5622)", url: "https://praxis.ets.org/test/5622.html" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Per the batch A brief, do NOT add `"praxisplt"` to `TEACHER_LED` (people self-study). The template
(phlet) has a TEACHES line, so add one; the landing renders `<ExamClassFaq examId="praxisplt" />`
and `classFaqJsonLd("praxisplt")`, which need it for their wording:
`praxisplt: "a teacher preparation program",`
(If the integrator prefers no class FAQ on self-study exams, delete the `ExamClassFaq` element and
the `classFaqJsonLd("praxisplt")` entry from the landing instead.)

## lib/tigerAssets.ts

Falls back to the DMV tiger. Borrow the Praxis Core tiger:
`praxisplt: "praxis",` in `BORROWED_SETS`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/*

Nothing: `graduation` exists; sitemaps map over `EXAMS`; class questions import `lib/banks/all`;
no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing praxisplt:praxis-plt:15801`

## CLAUDE.md (under Additional Exams, after the LET Reviewer bullet or with the other batch A exams)

```md
- **Praxis PLT K-6** (ETS Principles of Learning and Teaching: Grades K-6, test 5622, `/praxis-plt/*`, landing `/praxis-plt-practice-test`): `data/praxis-plt-questions.json` (200 original selected-response questions on the ETS test specifications: I Students as Learners as development and learning theory 24, diverse learners 20, motivation and environment 16; II Instructional Process as planning 20, strategies 24, questioning and communication 16; III Assessment as assessment strategies 20, standardized tests and scoring 20; IV Professional Development, Leadership and Community as professional growth and collaboration 24, laws and court decisions 16), test IDs 15801-15804 (50 questions each), sets 15801-15804 (one per ETS category, 60/60/40/40), state `PRAXISPLT`, prefix `PLT-`, 70% readiness line (ETS sets no pass mark; states set qualifying scores). 6/5/4/5/6/4/5/5/6/4 per test, the real 21/21/14/14 of 70 scaled to 50, no spares. The real test is 2 hours, 70 selected response plus 4 constructed responses on two case histories (25% of the score), which are not modelled; many items carry a short classroom scenario. Federal law only (IDEA, Section 504, ADA, FERPA, Title IX, Brown, Tinker, Lau, Goss, Plyler); mandated reporting "as state law requires". Built by `tools/next100/praxisplt/build.py`; sources in `tools/next100/praxisplt/sources.md`. Region US, `[data-theme="praxisplt"]` dark gold (51 80% 38%), borrows the Praxis tiger, not teacher-led.
```
