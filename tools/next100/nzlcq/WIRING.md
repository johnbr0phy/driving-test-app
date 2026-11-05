# Wiring for `nzlcq` (New Zealand Licence Controller Qualification, v1, region NZ)

Files already written by the builder: `data/nz-lcq-questions.json` (200, PASS, key-longest 12%),
`lib/banks/nzlcq.ts`, `app/lcq/*` (layout, redirect, dashboard, drill, stats, copied from
`app/llqp/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/lcq-practice-test/page.tsx`, `tools/next100/nzlcq/*` (spec, sources, `q_*.py`, `build.py`,
this file). Everything below goes in shared files.

Format note: the LCQ is awarded on two NZQA Level 4 unit standards, 4646 (Sale and Supply of
Alcohol Act 2012, 2 credits) and 16705 (host responsibility as a duty manager, 3 credits), each
graded Achieved / Not Achieved by the approved provider (ServiceIQ online, polytechnics,
hospitality associations). No question count, time or pass mark is published nationally, so the
four 50-question mock tests and the 80% readiness line are Tigertest's target (said on the landing,
in the FAQ and in examFacts, as zak53 does). Per test 28 Act (4646) + 22 host responsibility
(16705). 4 content sets + 4 tests = 8 dashboard steps; sets first, then tests. Pools are exactly
4x per-test counts.

## lib/exams.ts

Add `"nzlcq"` to the `ExamId` union. Icon `wine` already exists.

```ts
const nzlcq: ExamConfig = {
  id: "nzlcq",
  stateCode: "NZLCQ",
  idBase: 18400,
  slug: "/lcq",
  landingPath: "/lcq-practice-test",
  name: "LCQ Practice Test",
  shortName: "LCQ",
  examLabel: "LCQ assessment",
  fullName: "Licence Controller Qualification (LCQ)",
  questionIdPrefix: "NZLCQ-",
  icon: "wine",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // NZQA unit standards 4646 v11 (Sale and Supply of Alcohol Act 2012, 2 credits) and 16705 v7
  // (host responsibility as a duty manager, 3 credits), both Level 4, registered March 2023. Graded
  // Achieved / Not Achieved by the provider; no national question count or pass mark, so 50
  // questions and 80% are Tigertest's readiness target. Per test: 4646 = object/bodies/LAPs 6,
  // licences/hours/conditions 8, managers 6, minors/ID/offences 8 (28); 16705 = alcohol and the
  // body 7, intoxication and intervention 8, safe drinking environment 7 (22). Original items, New
  // Zealand law as in force November 2026.
  blueprint: {
    nzlcqObject: 6,
    nzlcqLicences: 8,
    nzlcqManagers: 6,
    nzlcqOffences: 8,
    nzlcqAlcohol: 7,
    nzlcqIntox: 8,
    nzlcqSafety: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 18401, name: "The Act & Licences", categories: ["nzlcqObject", "nzlcqLicences"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 2, id: 18402, name: "Managers, Minors & Offences", categories: ["nzlcqManagers", "nzlcqOffences"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 3, id: 18403, name: "Alcohol & Intoxication", categories: ["nzlcqAlcohol", "nzlcqIntox"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 4, id: 18404, name: "Safe Drinking Environment", categories: ["nzlcqSafety"], size: 28, weightLabel: "7 of 50 test questions" },
  ],
  categoryLabels: {
    nzlcqObject: "The Act, Licensing Bodies & LAPs",
    nzlcqLicences: "Licence Types, Hours & Conditions",
    nzlcqManagers: "Manager's Certificates & Duty Managers",
    nzlcqOffences: "Minors, ID, Offences & Enforcement",
    nzlcqAlcohol: "Alcohol and the Body",
    nzlcqIntox: "Intoxication & Intervention",
    nzlcqSafety: "Safe Drinking Environment",
  },
  copy: {
    guestPrompt: "to save your LCQ progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets across both unit standards: the Act and licences, managers and offences, alcohol and intoxication, and a safe drinking environment. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across both unit standards, 80% readiness line",
    heroSubs: [
      "Two unit standards, four mock tests. Start with the Act.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You're ready for your LCQ assessment.",
    ],
    sourceLine: "Original questions on NZQA unit standards 4646 and 16705 and the Sale and Supply of Alcohol Act 2012. Not affiliated with NZQA, ServiceIQ or any LCQ provider.",
  },
};
```
(Match the other fields of the `copy` block to the current `llqp` config if its shape has
changed; nothing else is exam-specific.)

Append `nzlcq` to the `EXAMS` array after the last international batch 1 exam.

Check: 18401-18404 (tests and sets) must be free (batch assigns 18400).

## lib/banks/all.ts

```ts
import "./nzlcq";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/nzlcq.ts`.

## types/index.ts

- `QuestionType`: add `| "NZLCQ"`.
- `QuestionCategory`, under a `// LCQ (New Zealand duty manager)` comment:

```ts
  | "nzlcqObject"
  | "nzlcqLicences"
  | "nzlcqManagers"
  | "nzlcqOffences"
  | "nzlcqAlcohol"
  | "nzlcqIntox"
  | "nzlcqSafety"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nzlcqObject: "The Act, Licensing Bodies & LAPs",
    nzlcqLicences: "Licence Types, Hours & Conditions",
    nzlcqManagers: "Manager's Certificates & Duty Managers",
    nzlcqOffences: "Minors, ID, Offences & Enforcement",
    nzlcqAlcohol: "Alcohol and the Body",
    nzlcqIntox: "Intoxication & Intervention",
    nzlcqSafety: "Safe Drinking Environment",
```

## app/globals.css

Hue from the international batch 1 table (340 70% 22%, already checked). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* LCQ (New Zealand duty manager) theme */
  [data-theme="nzlcq"] {
    --brand: 340 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 340 70% 96%;
    --brand-hover: 340 70% 18%;
    --brand-dark: 340 70% 16%;
    --brand-darker: 340 65% 10%;
    --brand-muted: 340 20% 70%;
    --brand-border: 340 20% 80%;
    --brand-border-light: 340 18% 89%;
    --brand-gradient-to: 345 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nzlcq: "LCQ practice for New Zealand duty managers: the Sale and Supply of Alcohol Act 2012, licences, manager's certificates, minors and ID, assessing intoxication and host responsibility, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `nzlcq: "NZQA unit standards 4646 and 16705 · approved LCQ providers",`
- Hub group: new group `{ title: "New Zealand licences", ids: ["nzlcq"] }` right after
  "New Zealand driving tests" (nzfirearms, from the same batch, belongs in it too:
  `ids: ["nzlcq", "nzfirearms"]` once both are wired).
- `SEARCH_ALIASES`:
  `nzlcq: "lcq licence controller qualification license controller qualification duty manager nz duty manager test managers certificate manager's certificate nz bar manager nz unit standard 4646 16705 sale and supply of alcohol act host responsibility serviceiq liquor licence nz alcohol licence new zealand",`
- `RELATED_OVERRIDES`: `nzlcq: ["aursa", "ukaplh", "alcohol"],` (padding while the NZ group is
  small; drop it if nzfirearms makes the group big enough).

## lib/region.ts

`nzlcq: "NZ",` in `TEST_REGIONS`, and add `"nzlcq"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  nzlcq: {
    answer:
      "The Licence Controller Qualification (LCQ) is the New Zealand qualification for people who manage the sale of alcohol on licensed premises, and you need it to apply for or renew a manager's certificate. It is awarded on two NZQA Level 4 unit standards: 4646, knowledge of the Sale and Supply of Alcohol Act 2012 and its implications for licensed premises (2 credits), and 16705, knowledge of host responsibility requirements as a duty manager (3 credits). Each is graded Achieved or Not Achieved by the approved course provider, which sets its own assessment; no national question count or pass mark is published, so Tigertest's mock tests use an 80% readiness target.",
    rows: [
      { label: "Unit standards", value: "4646 (the Act, 2 credits) and 16705 (host responsibility, 3 credits)" },
      { label: "Level", value: "NZQA Level 4" },
      { label: "Grading", value: "Achieved or Not Achieved, per unit standard" },
      { label: "Assessment", value: "Set by the provider; no national question count or pass mark" },
      { label: "Needed for", value: "Applying for or renewing a manager's certificate" },
      { label: "Offered by", value: "ServiceIQ (online) and other approved course providers" },
    ],
    basedOn: "NZQA unit standards 4646 v11 and 16705 v7 (March 2023), checked November 2026",
    source: { name: "NZQA: unit standard 16705", url: "https://www.nzqa.govt.nz/nqfdocs/units/pdf/16705.pdf" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

The LCQ is usually done on a one-day course or a provider's online programme, like the RSA and
the UK personal licence (both TEACHER_LED). Suggested:
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"nzlcq"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `nzlcq: "an LCQ course",`

## lib/tigerAssets.ts

Borrow the UK personal licence (alcohol licence holder) set: add `nzlcq: "ukaplh",` to
`BORROWED_SETS` (or `"aursa"` / `"alcohol"`).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, no redirects, `wine` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 60).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nzlcq:lcq:18401`

## CLAUDE.md (under Additional Exams, after the LLQP bullet or with the other NZ exams)

```md
- **LCQ** (`nzlcq`, New Zealand Licence Controller Qualification for duty managers, `/lcq/*`, landing `/lcq-practice-test`): `data/nz-lcq-questions.json` (200 original questions on NZQA unit standards 4646 v11 (Sale and Supply of Alcohol Act 2012, 2 credits) and 16705 v7 (host responsibility as a duty manager, 3 credits): the Act, licensing bodies and LAPs 24, licence types, hours and conditions 32, manager's certificates and duty managers 24, minors, ID, offences and enforcement 32; alcohol and the body 28, intoxication and intervention 32, safe drinking environment 28), test IDs 18401-18404 (50 questions each, 28 Act + 22 host responsibility), sets 18401-18404 (by topic), state `NZLCQ`, prefix `NZLCQ-`, 80% readiness line (Tigertest's target: each unit standard is graded Achieved / Not Achieved by the provider and no national count or pass mark is published). 6/8/6/8/7/8/7 per test. New Zealand law as in force Nov 2026 (default hours 8am to 4am and 7am to 11pm, purchase age 18, manager's certificate from 20, 48-hour manager notices, the legal definition of intoxicated, approved ID, irresponsible promotions, Trespass Act, HSWA); no fines, fees, licence terms or acting-manager week limits. Kept clear of `data/alcohol-server-questions.json`, `data/au-rsa-questions.json` and `data/uk-personal-licence-questions.json`. Built by `tools/next100/nzlcq/build.py`; sources in `tools/next100/nzlcq/sources.md`. Region NZ, hub group "New Zealand licences", `[data-theme="nzlcq"]` deep raspberry (340 70% 22%), borrows the UK personal licence tiger, teacher-led (LCQ courses).
```
