# Wiring for `mypce` (Malaysia Pre-Contract Examination for Insurance Agents, PCEIA, v1, region MY)

Files already written by the builder: `data/malaysia-pce-questions.json` (200, PASS, key-longest 4%),
`lib/banks/mypce.ts`, `app/malaysia-pce/*` (layout, redirect, dashboard, drill, stats, copied from
`app/llqp/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/pce-exam-practice-test/page.tsx`, `tools/next100/mypce/*` (spec, sources, `q_*.py`, `build.py`,
this file). Everything below goes in shared files.

Format note (Aii programme page, checked 2026-11-05): Part A Basics of Insurance (compulsory),
Part B General Insurance, Part C Life Insurance, 50 multiple-choice questions each. Route AC (life)
or AB (general) is 100 questions in 2 hours; Part B or C only is 50 questions in 1.5 hours; 50% to
pass; English, Bahasa Malaysia or Mandarin; virtual computer-based exam. Here: four 50-question mock
tests mixing Part A 20, Part B 10, Part C 20, with the 50% line, and five content training sets
(two Part A, one Part B, two Part C), so 5 sets + 4 tests = 9 dashboard steps, sets first.
Pools are exactly 4x per-test counts. Aii publishes no chapter weights: the split is Tigertest's.

## lib/exams.ts

Add `"mypce"` to the `ExamId` union. Icon `umbrella` already exists.

```ts
const mypce: ExamConfig = {
  id: "mypce",
  stateCode: "MYPCE",
  idBase: 18600,
  slug: "/malaysia-pce",
  landingPath: "/pce-exam-practice-test",
  name: "Malaysia PCE Practice Test",
  shortName: "PCEIA",
  examLabel: "PCEIA exam",
  fullName: "Pre-Contract Examination for Insurance Agents (PCEIA), Malaysia",
  questionIdPrefix: "MYPCE-",
  icon: "umbrella",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 50,
  // Aii PCEIA (checked Nov 2026): Part A Basics of Insurance (compulsory) + Part C Life (route AC)
  // or Part B General (route AB), 50 questions each, 100 in 2 hours, 50% to pass. Mock tests mix
  // all three parts 20/10/20: Part A risk 5, principles 5, contract and agency law 4, legislation
  // and regulation 4, medical and health 2; Part B motor 4, fire, property and other 6; Part C life
  // products 6, policy law and nomination 5, rating and underwriting 4, claims 2, code of practice 3.
  // Aii publishes no chapter weights; the split is Tigertest's. Malaysian law as of November 2026
  // (FSA 2013 Schedules 7 to 10, IFSA 2013, Contracts Act 1950, Road Transport Act 1987, PDPA 2010, AMLA).
  blueprint: {
    mypceRisk: 5,
    mypcePrinciples: 5,
    mypceLaw: 4,
    mypceRegulation: 4,
    mypceHealth: 2,
    mypceMotor: 4,
    mypceProperty: 6,
    mypceLifeProducts: 6,
    mypceLifeLegal: 5,
    mypceUnderwriting: 4,
    mypceClaims: 2,
    mypceEthics: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 18601, name: "Risk & Principles of Insurance", categories: ["mypceRisk", "mypcePrinciples"], size: 40, weightLabel: "Part A · 10 of 50 test questions" },
    { setNumber: 2, id: 18602, name: "Law, Regulation & Health Insurance", categories: ["mypceLaw", "mypceRegulation", "mypceHealth"], size: 40, weightLabel: "Part A · 10 of 50 test questions" },
    { setNumber: 3, id: 18603, name: "General Insurance (Part B)", categories: ["mypceMotor", "mypceProperty"], size: 40, weightLabel: "Part B · 10 of 50 test questions" },
    { setNumber: 4, id: 18604, name: "Life Products & Policy Law", categories: ["mypceLifeProducts", "mypceLifeLegal"], size: 44, weightLabel: "Part C · 11 of 50 test questions" },
    { setNumber: 5, id: 18605, name: "Underwriting, Claims & Ethics", categories: ["mypceUnderwriting", "mypceClaims", "mypceEthics"], size: 36, weightLabel: "Part C · 9 of 50 test questions" },
  ],
  categoryLabels: {
    mypceRisk: "Risk & Insurance",
    mypcePrinciples: "Principles of Insurance",
    mypceLaw: "Contract & Agency Law",
    mypceRegulation: "Legislation & Regulation",
    mypceHealth: "Medical & Health Insurance",
    mypceMotor: "Motor Insurance",
    mypceProperty: "Fire, Property & Other General Insurance",
    mypceLifeProducts: "Life Insurance Products",
    mypceLifeLegal: "Life Policy Law & Nomination",
    mypceUnderwriting: "Premium Rating & Underwriting",
    mypceClaims: "Life Claims",
    mypceEthics: "Code of Practice & Ethics",
  },
  copy: {
    guestPrompt: "to save your PCEIA progress and track every question you miss",
    trainingHeading: "Train by part",
    trainingSub: "Two sets for Part A, one for Part B general insurance and two for Part C life insurance. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across Parts A, B and C, 50% to pass",
    heroSubs: [
      "Part A plus Part B or C. Start with the basics.",
      "Master each part's sets, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Register for your PCEIA.",
    ],
    sourceLine: "Based on the PCEIA's Parts A, B and C and Malaysian law (FSA 2013, IFSA 2013, Contracts Act 1950) as of November 2026. Original questions; 50 per test, mixing the three parts. Not affiliated with the Asian Institute of Insurance, Bank Negara Malaysia, LIAM or PIAM.",
    analyticsKey: "mypce",
  },
};
```

Append `mypce` to the `EXAMS` array after `llqp` (or after the last international batch 1 insurance exam).

Check: 18601-18605 (tests 18601-18604, sets 18601-18605) must be free (batch assigns 18600).

## lib/banks/all.ts

```ts
import "./mypce";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/mypce.ts`.

## types/index.ts

- `QuestionType`: add `| "MYPCE"`.
- `QuestionCategory`, under a `// Malaysia PCEIA (insurance agents)` comment:

```ts
  | "mypceRisk"
  | "mypcePrinciples"
  | "mypceLaw"
  | "mypceRegulation"
  | "mypceHealth"
  | "mypceMotor"
  | "mypceProperty"
  | "mypceLifeProducts"
  | "mypceLifeLegal"
  | "mypceUnderwriting"
  | "mypceClaims"
  | "mypceEthics"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    mypceRisk: "Risk & Insurance",
    mypcePrinciples: "Principles of Insurance",
    mypceLaw: "Contract & Agency Law",
    mypceRegulation: "Legislation & Regulation",
    mypceHealth: "Medical & Health Insurance",
    mypceMotor: "Motor Insurance",
    mypceProperty: "Fire, Property & Other General Insurance",
    mypceLifeProducts: "Life Insurance Products",
    mypceLifeLegal: "Life Policy Law & Nomination",
    mypceUnderwriting: "Premium Rating & Underwriting",
    mypceClaims: "Life Claims",
    mypceEthics: "Code of Practice & Ethics",
```

## app/globals.css

Hue from the international batch 1 table (230 25% 22%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Malaysia PCEIA (insurance agents) theme */
  [data-theme="mypce"] {
    --brand: 230 25% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 230 25% 96%;
    --brand-hover: 230 25% 17%;
    --brand-dark: 230 25% 16%;
    --brand-darker: 230 22% 10%;
    --brand-muted: 230 12% 70%;
    --brand-border: 230 12% 80%;
    --brand-border-light: 230 10% 89%;
    --brand-gradient-to: 230 40% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `mypce: "PCEIA practice for Malaysian insurance agents: Part A risk, principles, contract and agency law and the FSA 2013, Part B motor and fire insurance, and Part C life products, nomination, underwriting, claims and the code of practice, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `mypce: "Asian Institute of Insurance (Aii, formerly MII) · PCEIA Parts A, B and C",`
- Hub group: new group after "Malaysia driving tests":
  `{ title: "Malaysia insurance exams", ids: ["mypce"] },`
- `SEARCH_ALIASES`:
  `mypce: "pce pceia pre-contract examination for insurance agents pre contract exam malaysia insurance agent exam life insurance agent malaysia general insurance agent part a part b part c aii mii malaysian insurance institute asian institute of insurance liam piam bnm takaful peperiksaan pra-kontrak ejen insurans",`
- `RELATED_OVERRIDES`: `mypce: ["mykpp", "llqp", "insurance"],` (a one-exam group needs padding; `mykpp` is the
  country's other test, `llqp` and `insurance` are life licence exams elsewhere; `hkiiqe1` once wired
  is the closest match and could replace `insurance`).

## lib/region.ts

`mypce: "MY",` in `TEST_REGIONS`, and add `"mypce"` to `NON_DRIVING_TESTS`.
Malaysia's homepage (`/my`) gains a second, non-driving test: if `REGION_HOME.MY` or `faqsFor("MY")`
says Malaysia has only the KPP01, add a line such as "and the PCEIA for insurance agents".

## lib/examFacts.ts

```ts
  mypce: {
    answer:
      "The Pre-Contract Examination for Insurance Agents (PCEIA) is the exam a person must pass in Malaysia before an insurer can contract them as an insurance agent. It is run by the Asian Institute of Insurance (Aii), formerly the Malaysian Insurance Institute. Part A, the basics of insurance, is compulsory; a life agent adds Part C (life insurance) and a general agent adds Part B (general insurance). Each part has 50 multiple-choice questions: Parts A and C, or A and B, take 2 hours for 100 questions, and Part B or C alone takes 1 hour 30 minutes. The passing mark is 50%, and the exam is a virtual computer-based exam in English, Bahasa Malaysia or Mandarin.",
    rows: [
      { label: "Parts", value: "A Basics (compulsory); B General insurance; C Life insurance" },
      { label: "Questions", value: "100 for Parts A+C or A+B (50 per part); 50 for B or C alone" },
      { label: "Time", value: "2 hours (two parts); 1 hour 30 minutes (one part)" },
      { label: "Pass mark", value: "50%" },
      { label: "Format", value: "Multiple choice, virtual computer-based exam" },
      { label: "Languages", value: "English, Bahasa Malaysia, Mandarin" },
      { label: "Run by", value: "Asian Institute of Insurance (Aii)" },
    ],
    basedOn: "Asian Institute of Insurance PCEIA programme page, checked November 2026",
    source: { name: "Asian Institute of Insurance: PCEIA", url: "https://aiiasia.org/programmes/pre-contract-examination-for-insurance-agents-pceia/" },
  },
```
(Fees are on the Aii page and left out by house rule.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing required (the template sets none). Insurers and agency leaders run PCEIA classes for new
recruits; an optional `mypce: "PCEIA classes for new agents"` TEACHES line is reasonable if the
integrator wants it.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing required: sitemaps map over `EXAMS`, no redirects, `umbrella` icon exists. Borrow a tiger
through `BORROWED_SETS`, like `llqp`: `mypce: "insurance",`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 44).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing mypce:malaysia-pce:18601`

## CLAUDE.md (under Additional Exams, after the LLQP bullet or the Malaysia KPP01 bullet)

```md
- **Malaysia PCEIA** (`mypce`, Pre-Contract Examination for Insurance Agents, run by the Asian Institute of Insurance (Aii, formerly MII), `/malaysia-pce/*`, landing `/pce-exam-practice-test`): `data/malaysia-pce-questions.json` (200 original questions: Part A as risk and insurance 20, principles of insurance 20, contract and agency law 16, legislation and regulation (FSA 2013, IFSA 2013, PIDM, OFS, LIAM/PIAM, AMLA, PDPA) 16, medical and health insurance 8; Part B as motor 16, fire, property and other general insurance 24; Part C as life products 24, policy law and nomination (FSA Schedule 10 trusts, Muslim nominees as executors, assignment, free-look) 20, premium rating and underwriting 16, life claims 8, code of practice and ethics 12), test IDs 18601-18604 (50 questions each, mixing Parts A, B and C 20/10/20), sets 18601-18605 (two Part A, one Part B, two Part C), state `MYPCE`, prefix `MYPCE-`, 50% pass like the real exam. 5/5/4/4/2/4/6/6/5/4/2/3 per test (Aii publishes no chapter weights; the split is Tigertest's). The real exam is Part A with Part C (life) or Part B (general), 100 questions in 2 hours, or one part of 50 in 1.5 hours, 50% to pass, virtual computer-based in English, Bahasa Malaysia or Mandarin. Malaysian law as of November 2026; no fees, limits or NCD percentages. Kept clear of `llqp`, `life-health` and `hkiiqe1`. Built by `tools/next100/mypce/build.py`; sources in `tools/next100/mypce/sources.md`. Region MY, hub group "Malaysia insurance exams", `[data-theme="mypce"]` dark slate indigo (230 25% 22%), borrows the life and health insurance tiger.
```
