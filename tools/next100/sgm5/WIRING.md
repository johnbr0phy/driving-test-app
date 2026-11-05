# Wiring for `sgm5` (Singapore CMFAS RES5, formerly Module 5, v1, region SG)

Files already written by the builder: `data/sg-cmfas-res5-questions.json` (200, PASS, key-longest 22%,
key > 1.2x 16%), `lib/banks/sgm5.ts`, `app/cmfas-m5/*` (layout, redirect, dashboard, drill, stats,
copied from `app/le-paper-1/`; no test or practice folders, the shared `app/[slug]` routes serve
them), `app/cmfas-m5-practice-test/page.tsx`, `tools/next100/sgm5/*` (spec, sources, `q_*.py`,
`build.py`, this file). Everything below goes in shared files.

**Decision to check: Module 5 no longer exists.** MAS Notice FAA-N26 (in force 1 April 2024)
replaced CMFAS Module 5 with RES5, "Rules, Ethics and Skills for Financial Advisory Services"
(SCI). A Module 5 pass is deemed a RES5 pass (para 4.11); SCI's M5 page shows "No exams available"
and RES5 sittings run in November 2026. So the exam is built as RES5 (both Part I rules and Part II
ethics and skills), named "CMFAS RES5", with "formerly Module 5 / M5" in the copy and aliases so
people searching "M5" find it. Id `sgm5`, slug `/cmfas-m5` and landing `/cmfas-m5-practice-test`
are kept as the batch table assigned (people still search "cmfas m5"); rename the slug to
`/cmfas-res5` if you prefer, in which case add a redirect.

Format note: the real RES5 (SCI) is 150 MCQs in 3 hours, Part I 110 questions (75% to pass) and
Part II 40 (80% to pass), no negative marking, English, closed-book computer screen exam at SCI,
approved non-programmable calculator. Here: four 50-question mock tests at the real pace (60
minutes each is 1.2 minutes a question), 37 Part I + 13 Part II per test (the paper's 110:40
share), with the single pass line at the stricter 80% (`passPct: 80`). Six content sets + 4 tests
= 10 dashboard steps, sets first, then tests. Pools are exactly 4x per test (no spares).

## lib/exams.ts

Add `"sgm5"` to the `ExamId` union. Icon `building` already exists (as `hklesfi1`, `sie`).

```ts
const sgm5: ExamConfig = {
  id: "sgm5",
  stateCode: "SGM5",
  idBase: 21700,
  slug: "/cmfas-m5",
  landingPath: "/cmfas-m5-practice-test",
  name: "CMFAS RES5 Practice Test",
  shortName: "CMFAS RES5",
  examLabel: "RES5",
  fullName: "CMFAS RES5: Rules, Ethics and Skills for Financial Advisory Services (formerly Module 5)",
  questionIdPrefix: "SGM5-",
  icon: "building",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // SCI RES5 (checked November 2026): 150 MCQs in 3 hours, Part I (chapters 1-13, rules and
  // regulations) 110 questions at 75%, Part II (chapters 14-27, ethics and skills) 40 at 80%.
  // RES5 replaced CMFAS Module 5 under MAS Notice FAA-N26 from 1 April 2024. Modelled as four
  // 50-question tests at the real pace with the 110:40 share (37 + 13); the pass line is the
  // stricter 80%. Per test (Tigertest's split by chapter): FAA and representatives 6, conduct of
  // business 5, FAA-N16 8, balanced scorecard and other notices 6, AML/CFT 4, ILPs, CIS, market
  // conduct and CPF 8 (Part I 37); ethics and fair dealing 7, advisory skills 6 (Part II 13).
  // Singapore law and MAS notices as of November 2026. All items original.
  blueprint: {
    sgm5Faa: 6,
    sgm5Business: 5,
    sgm5Advice: 8,
    sgm5Notices: 6,
    sgm5Aml: 4,
    sgm5Products: 8,
    sgm5Ethics: 7,
    sgm5Skills: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 21701, name: "The FAA, Representatives & Conduct", categories: ["sgm5Faa", "sgm5Business"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 2, id: 21702, name: "Recommendations (FAA-N16)", categories: ["sgm5Advice"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 3, id: 21703, name: "Balanced Scorecard, Notices & AML", categories: ["sgm5Notices", "sgm5Aml"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 21704, name: "ILPs, CIS, Market Conduct & CPF", categories: ["sgm5Products"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 5, id: 21705, name: "Ethics & Fair Dealing", categories: ["sgm5Ethics"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 6, id: 21706, name: "Advisory Skills & Financial Planning", categories: ["sgm5Skills"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    sgm5Faa: "FAA & FAR: Advisers & Representatives",
    sgm5Business: "Conduct of Business, MAS Powers & Offences",
    sgm5Advice: "Recommendations on Investment Products (FAA-N16)",
    sgm5Notices: "Balanced Scorecard & Other MAS Notices",
    sgm5Aml: "AML/CFT (FAA-N06)",
    sgm5Products: "ILPs, CIS, Market Conduct & CPF",
    sgm5Ethics: "Ethics, Professionalism & Fair Dealing",
    sgm5Skills: "Advisory Skills & Financial Planning",
  },
  copy: {
    guestPrompt: "to save your RES5 progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Six sets covering both parts of the RES5 syllabus, rules and regulations and ethics and skills. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions at the real RES5 pace, 80% to pass",
    heroSubs: [
      "Six sets, four mock tests. FAA-N16 and the products chapters weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your RES5.",
    ],
    sourceLine: "Based on SCI's RES5 syllabus (which replaced CMFAS Module 5 in April 2024), the Financial Advisers Act and MAS notices as of November 2026. Original questions; 50 per test with the real 110:40 part mix, chapter split by Tigertest. Not affiliated with SCI, MAS or IBF.",
    analyticsKey: "sgm5",
  },
};
```

Append `sgm5` to the `EXAMS` array after `sgres` (or with the other batch 4 Singapore exams).

Check: 21701-21706 (tests 21701-21704, sets 21701-21706) must be free (batch assigns 21700).

## lib/banks/all.ts

```ts
import "./sgm5";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/sgm5.ts`.

## types/index.ts

- `QuestionType`: add `| "SGM5"`.
- `QuestionCategory`, under a `// Singapore CMFAS RES5 (formerly Module 5)` comment:

```ts
  | "sgm5Faa"
  | "sgm5Business"
  | "sgm5Advice"
  | "sgm5Notices"
  | "sgm5Aml"
  | "sgm5Products"
  | "sgm5Ethics"
  | "sgm5Skills"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; the newer six fall back to English)

```ts
    sgm5Faa: "FAA & FAR: Advisers & Representatives",
    sgm5Business: "Conduct of Business, MAS Powers & Offences",
    sgm5Advice: "Recommendations on Investment Products (FAA-N16)",
    sgm5Notices: "Balanced Scorecard & Other MAS Notices",
    sgm5Aml: "AML/CFT (FAA-N06)",
    sgm5Products: "ILPs, CIS, Market Conduct & CPF",
    sgm5Ethics: "Ethics, Professionalism & Fair Dealing",
    sgm5Skills: "Advisory Skills & Financial Planning",
```

## app/globals.css

Hue from the batch table (195 60% 18%, already checked by the batch script). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Singapore CMFAS RES5 (formerly M5) theme */
  [data-theme="sgm5"] {
    --brand: 195 60% 18%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 195 60% 96%;
    --brand-hover: 195 60% 14%;
    --brand-dark: 195 60% 13%;
    --brand-darker: 195 55% 8%;
    --brand-muted: 195 25% 70%;
    --brand-border: 195 25% 80%;
    --brand-border-light: 195 22% 89%;
    --brand-gradient-to: 200 60% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `sgm5: "CMFAS RES5 practice for Singapore financial adviser representatives (the module that replaced M5): the Financial Advisers Act and Regulations, MAS Notice FAA-N16 on recommendations, the balanced scorecard, AML/CFT, ILPs, unit trusts, market conduct and CPF, ethics and fair dealing, and advisory skills, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `sgm5: "Singapore College of Insurance (SCI) · RES5 under MAS Notice FAA-N26",`
- Hub group: add to the existing "Singapore licensing exams":
  `{ title: "Singapore licensing exams", ids: ["sgres", "sgm5"] },` (plus `sgvl` when wired).
- `SEARCH_ALIASES`:
  `sgm5: "cmfas m5 cmfas module 5 m5 exam module 5 rules and regulations for financial advisory services res5 cmfas res5 rules ethics and skills for financial advisory services sci exam singapore college of insurance financial adviser representative exam singapore insurance agent exam singapore financial advisers act exam mas faa-n16 faa-n26 cmfas exam financial consultant singapore",`
- `RELATED_OVERRIDES`: `sgm5: ["sgres", "hklesfi1", "mypce"],` (a small group needs padding).

## lib/region.ts

`sgm5: "SG",` in `TEST_REGIONS` (next to `sgres: "SG"`), and add `"sgm5"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  sgm5: {
    answer:
      "RES5, Rules, Ethics and Skills for Financial Advisory Services, is the CMFAS module set by the Singapore College of Insurance (SCI) that representatives of financial advisers in Singapore need under MAS Notice FAA-N26. It replaced CMFAS Module 5 (M5) when that notice took effect on 1 April 2024, and a valid M5 pass counts as a RES5 pass. The paper is 150 multiple-choice questions in 3 hours: 110 in Part I on rules and regulations, which needs 75%, and 40 in Part II on ethics and skills, which needs 80%. It is a closed-book computer screen examination in English at SCI, with no marks deducted for wrong answers.",
    rows: [
      { label: "Questions", value: "150 multiple choice (Part I 110, Part II 40)" },
      { label: "Time", value: "3 hours" },
      { label: "Pass mark", value: "75% in Part I and 80% in Part II" },
      { label: "Marking", value: "1 mark each, no deduction for wrong answers" },
      { label: "Format", value: "Closed-book computer screen exam at SCI, in English" },
      { label: "Replaces", value: "CMFAS Module 5 (M5), from 1 April 2024" },
      { label: "Run by", value: "Singapore College of Insurance, under MAS Notice FAA-N26" },
    ],
    basedOn: "SCI's RES5 exam page and MAS Notice FAA-N26, checked November 2026",
    source: { name: "Singapore College of Insurance: RES5 exam details", url: "https://www.scicollege.org.sg/Exam/ExamDetails/RES5" },
  },
```
(Fees are on SCI's fee page and are left out. Which product modules a person also needs depends on
what they advise on: FAA-N26 Table 1.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing required: most candidates self-study with the SCI e-book, though financial adviser firms run
induction classes. An optional `sgm5: "RES5 courses"` TEACHES line is reasonable.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing required: sitemaps map over `EXAMS`, no redirects, `building` icon exists, tiger falls back
to the DMV one. Optionally borrow the Series 7 set through `BORROWED_SETS` (`sgm5: "series7"`, as
`hklesfi1` does).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 44).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing sgm5:cmfas-m5:21701`

## CLAUDE.md (under Additional Exams, with `sgres` or after `hklesfi1`)

```md
- **CMFAS RES5** (`sgm5`, Singapore CMFAS RES5, Rules, Ethics and Skills for Financial Advisory Services, run by the Singapore College of Insurance under MAS Notice FAA-N26, which replaced CMFAS Module 5 (M5) from 1 April 2024 and deems an M5 pass a RES5 pass, `/cmfas-m5/*`, landing `/cmfas-m5-practice-test`): `data/sg-cmfas-res5-questions.json` (200 original questions on the 27 RES5 chapters: Part I as the FAA, FAR, representatives, fit and proper and FAA-N26 competency 24, conduct of business, MAS powers and offences 20, FAA-N16 recommendations (selected clients, CKA, CAR, documentation, switching, the pre-transaction checks from 29 December 2025) 32, the FAA-N20 balanced scorecard and other notices 24, FAA-N06 AML/CFT 16, ILPs, CIS, SFA market conduct and CPF 32; Part II as ethics, professionalism and fair dealing 28, advisory skills and financial planning 24), four 50-question tests at the real pace (test IDs 21701-21704, 37 Part I + 13 Part II each, the real paper's 110:40), sets 21701-21706 (by topic), state `SGM5`, prefix `SGM5-`, 80% pass (the stricter of the real 75% Part I and 80% Part II; the real paper is 150 MCQs in 3 hours, no negative marking, closed-book computer screen exam in English at SCI). 6/5/8/6/4/8/7/6 per test (Tigertest's split by chapter; SCI publishes only the part split). Singapore law and MAS notices as of November 2026; no money figures beyond planning sums. Kept clear of `hklesfi1`, `hkiiqe1`, `mypce`, `llqp`, `cemap`, `sie` and `sgres`. Built by `tools/next100/sgm5/build.py`; sources in `tools/next100/sgm5/sources.md`. Region SG, hub group "Singapore licensing exams", `[data-theme="sgm5"]` deep teal (195 60% 18%), borrows the Series 7 tiger.
```
