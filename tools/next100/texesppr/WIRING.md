# Wiring for `texesppr` (TExES Pedagogy and Professional Responsibilities EC-12, test 160, v1)

Files already written by the builder: `data/texes-ppr-questions.json` (200, PASS),
`lib/banks/texesppr.ts`, `app/texes-ppr/*` (layout, redirect, dashboard, drill, stats; copied from
`app/let-reviewer/`, no test or practice folders), `app/texes-ppr-practice-test/page.tsx`,
`tools/next100/texesppr/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/texesppr/build.py`. Everything below goes in shared files. `npx tsc`
reports an error in `lib/banks/texesppr.ts` until `"texesppr"` is in `ExamId`.

Format note: the real PPR is 100 selected-response questions (some unscored, many in decision
sets) in a 5-hour appointment (4 h 45 min testing), scored 100 to 300 with 240 to pass
(tx.nesinc.com, checked 2026-11-02). Framework: Domain I 34% (001-004), II 13% (005-006), III 33%
(007-010), IV 20% (011-013). Tigertest models four 50-question tests: I 17 (8+5+4), II 7, III 16
(9+3+4), IV 10 (3+7); Domain II rounds up from 6.5 and III down from 16.5. 80% is Tigertest's
readiness line (the scale is not a percent). Dashboard = 6 sets + 4 tests = 10 steps; no set over
60. Replacement status: TEA plans T-TEP (performance-based) as the required pedagogy assessment,
pending SBEC; TEA's TEA page still shows September 2027 but its April and July 2026 newsletters
list 2029. The PPR is still offered with no end date posted; an old 19 TAC 230.21 filing gave
"last operational date 8/31/2026" (superseded in practice). The landing says this without a date.

## lib/exams.ts

Add `"texesppr"` to the `ExamId` union. Icon `graduation` already exists.

```ts
const texesppr: ExamConfig = {
  id: "texesppr",
  stateCode: "TEXESPPR",
  idBase: 15700,
  slug: "/texes-ppr",
  landingPath: "/texes-ppr-practice-test",
  name: "TExES PPR Practice Test",
  shortName: "TExES PPR",
  examLabel: "PPR",
  fullName: "TExES Pedagogy and Professional Responsibilities EC-12 (160)",
  questionIdPrefix: "TXPPR-",
  icon: "graduation",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // TExES PPR EC-12 (160) exam framework (tx.nesinc.com study guide section 3, checked 2026-11-02):
  // Domain I Designing Instruction and Assessment 34% (competencies 001-004), Domain II Classroom
  // Environment 13% (005-006), Domain III Implementing Responsive Instruction and Assessment 33%
  // (007-010), Domain IV Professional Roles and Responsibilities 20% (011-013). The real test is
  // 100 selected-response questions in a 5-hour appointment, scaled 100-300, 240 to pass; 80% is
  // Tigertest's readiness line. Per 50-question test: I 17 (8/5/4), II 7, III 16 (9/3/4), IV 10
  // (3/7). Pools are exactly 4x each count. All items original.
  blueprint: {
    txpprDevelop: 8,
    txpprDiversity: 5,
    txpprPlanning: 4,
    txpprEnvironment: 7,
    txpprInstruction: 9,
    txpprTechnology: 3,
    txpprFeedback: 4,
    txpprFamily: 3,
    txpprProfessional: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 15701, name: "Human Development & Learning", categories: ["txpprDevelop"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 15702, name: "Diversity & Planning", categories: ["txpprDiversity", "txpprPlanning"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 3, id: 15703, name: "Classroom Environment", categories: ["txpprEnvironment"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 4, id: 15704, name: "Communication & Engagement", categories: ["txpprInstruction"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 15705, name: "Technology, Assessment & Feedback", categories: ["txpprTechnology", "txpprFeedback"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 6, id: 15706, name: "Families, Ethics & Texas Law", categories: ["txpprFamily", "txpprProfessional"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    txpprDevelop: "Human Development & Learning",
    txpprDiversity: "Student Diversity",
    txpprPlanning: "Goals, Objectives & Planning",
    txpprEnvironment: "Classroom Environment & Management",
    txpprInstruction: "Communication & Engagement",
    txpprTechnology: "Technology in Instruction",
    txpprFeedback: "Assessment & Feedback",
    txpprFamily: "Family Involvement",
    txpprProfessional: "Professional, Legal & Ethical Roles",
  },
  copy: {
    guestPrompt: "to save your PPR progress and track every question you miss",
    trainingHeading: "Train by PPR competency",
    trainingSub: "Six sets covering all 13 competencies of the PPR framework, from human development to Texas legal and ethical duties. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the four domains",
    heroSubs: [
      "Four domains, 13 competencies. Start with Set 1.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. You're ready for the PPR.",
    ],
    sourceLine: "Based on the TExES PPR EC-12 (160) exam framework. Original questions; 50 per test, weighted like the four domains. Not affiliated with TEA, SBEC or Pearson.",
    analyticsKey: "texesppr",
  },
};
```

Append `texesppr` to the `EXAMS` array (near `praxis` / `praxisplt`).

Check: 15701-15706 (sets) and 15701-15704 (tests) must be free (BRIEF reserves idBase 15700).

## lib/banks/all.ts

```ts
import "./texesppr";
```

## types/index.ts

- `QuestionType`: add `| "TEXESPPR"`.
- `QuestionCategory`, under a `// TExES PPR EC-12 (160)` comment:

```ts
  | "txpprDevelop"
  | "txpprDiversity"
  | "txpprPlanning"
  | "txpprEnvironment"
  | "txpprInstruction"
  | "txpprTechnology"
  | "txpprFeedback"
  | "txpprFamily"
  | "txpprProfessional"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    txpprDevelop: "Human Development & Learning",
    txpprDiversity: "Student Diversity",
    txpprPlanning: "Goals, Objectives & Planning",
    txpprEnvironment: "Classroom Environment & Management",
    txpprInstruction: "Communication & Engagement",
    txpprTechnology: "Technology in Instruction",
    txpprFeedback: "Assessment & Feedback",
    txpprFamily: "Family Involvement",
    txpprProfessional: "Professional, Legal & Ethical Roles",
```

## app/globals.css

Hue from the BRIEF (already checked): 352 40% 38%. Then run `tools/gen_dark_brand_css.py`.

```css
  /* TExES PPR EC-12 (160) theme */
  [data-theme="texesppr"] {
    --brand: 352 40% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 352 45% 96%;
    --brand-hover: 352 40% 32%;
    --brand-dark: 352 40% 28%;
    --brand-darker: 352 40% 18%;
    --brand-muted: 352 25% 72%;
    --brand-border: 352 25% 82%;
    --brand-border-light: 352 25% 90%;
    --brand-gradient-to: 15 45% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `texesppr: "TExES Pedagogy and Professional Responsibilities EC-12 (160) practice for Texas teacher certification: all 13 competencies, from human development, student diversity and planning to classroom management, engagement, technology, assessment, families, the Educators' Code of Ethics and Texas education law. Four 50-question tests weighted like the real domains. Free.",`
- `EXAM_ORG`: `texesppr: "TEA · Texas Educator Certification Examination Program, test 160",`
- Hub group: a new group right after "GED, college, military & nursing school entrance":
  `{ title: "US teacher certification exams", ids: ["texesppr", "praxisplt"] },`
  (coordinate with the praxisplt builder; if the integrator prefers, add `texesppr` to the group
  holding `praxis`).
- `SEARCH_ALIASES`:
  `texesppr: "texes ppr ppr 160 texes 160 ppr ec-12 ppr ec 12 pedagogy and professional responsibilities texas teacher certification texas teacher exam texes pedagogy exam tx ppr ppr exam texas teacher certification test alternative certification texas",`
- `RELATED_OVERRIDES`: `texesppr: ["praxisplt", "praxis", "phlet"],` (drop `praxisplt` if it is not wired).

## lib/region.ts

No `TEST_REGIONS` line: US is the default (`TEST_REGIONS[testId] ?? "US"`). Add to
`NON_DRIVING_TESTS` (US non-driving exams such as `apgov` are listed there):

```ts
  "texesppr",
```

## lib/examFacts.ts

```ts
  texesppr: {
    answer:
      "The TExES Pedagogy and Professional Responsibilities EC-12 (160), the PPR, is the pedagogy exam most Texas teacher candidates take for a standard classroom certificate, alongside a content exam. It is a computer-administered test of 100 selected-response questions, some unscored, in a 5-hour appointment (4 hours 45 minutes of testing), offered year round by appointment. Scores run from 100 to 300 and 240 passes. It covers four domains and 13 competencies: designing instruction and assessment (34%), the classroom environment (13%), implementing instruction and assessment (33%) and professional roles and responsibilities (20%). TEA plans a performance-based Texas Test of Educator Proficiency (T-TEP) to replace it as the required pedagogy assessment, pending SBEC action; TEA's 2026 newsletters list 2029.",
    rows: [
      { label: "Run by", value: "Texas Educator Certification Examination Program (Pearson) for TEA" },
      { label: "Questions", value: "100 selected-response, some unscored" },
      { label: "Time", value: "5-hour appointment, 4 hours 45 minutes of testing" },
      { label: "Passing score", value: "240 on a 100 to 300 scale" },
      { label: "Domains", value: "I 34%, II 13%, III 33%, IV 20% (13 competencies)" },
      { label: "Grades covered", value: "Early childhood to grade 12" },
      { label: "Alternative", value: "edTPA is accepted alongside the PPR; T-TEP planned, pending SBEC" },
      { label: "Not modelled here", value: "Decision sets are written as single scenario questions" },
    ],
    basedOn: "Texas Educator Certification Examination Program test page and exam framework for 160 PPR EC-12, TEA's Chapter 235 pedagogy standards FAQ (May 2025) and TEA educator preparation newsletters (April and July 2026), checked November 2026",
    source: { name: "Texas Educator Certification Examination Program", url: "https://www.tx.nesinc.com/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Per the batch A brief, TEACHER_LED is no (people self-study), so no lines. The landing does not
render `ExamClassFaq` or link `/teach`. If the integrator wants educator preparation programs to
see it, add `"texesppr"` to `TEACHER_LED` and `TEACHES`:
`texesppr: "an educator preparation program or a PPR review course",` and re-add
`<ExamClassFaq examId="texesppr" />` with `classFaqJsonLd("texesppr")` to the landing.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Borrow the teacher-exam tiger in `BORROWED_SETS`:
`texesppr: "praxis",`

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/*

Nothing: `graduation` exists; sitemaps map over `EXAMS`; class questions import `lib/banks/all`;
no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (and `scripts/build-landing-dates.ts`
after committing). No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing texesppr:texes-ppr:15701`

## CLAUDE.md (under Additional Exams, after the LET Reviewer bullet or near Praxis PLT)

```md
- **TExES PPR** (Texas Pedagogy and Professional Responsibilities EC-12, test 160, `/texes-ppr/*`, landing `/texes-ppr-practice-test`): `data/texes-ppr-questions.json` (200 original scenario questions on the 13 competencies of the 160 exam framework: human development and learning 32 (001, 004), student diversity 20 (002), goals, objectives and planning 16 (003), classroom environment and management 28 (005, 006), communication and engagement 36 (007, 008), technology 12 (009), assessment and feedback 16 (010), family involvement 12 (011), professional, legal and ethical roles 28 (012, 013)), test IDs 15701-15704 (50 questions each), sets 15701-15706 (by competency), state `TEXESPPR`, prefix `TXPPR-`, 80% readiness line (the real test is 100 selected-response questions in a 5-hour appointment, scaled 100 to 300, 240 to pass). 8/5/4/7/9/3/4/3/7 per test (domains 34/13/33/20), no spares. Decision sets are written as single scenario questions. Texas rules where the framework asks: the Educators' Code of Ethics (19 TAC 247), 48-hour abuse reporting (Family Code 261.101), ELPS, ARD committee, LPAC, SBOE/SBEC/TEA/ESCs. TEA plans T-TEP to replace the PPR, pending SBEC (TEA's 2026 newsletters list 2029); the landing says so. Built by `tools/next100/texesppr/build.py`; sources in `tools/next100/texesppr/sources.md`. Region US, `[data-theme="texesppr"]` muted crimson (352 40% 38%), borrows the Praxis tiger.
```
