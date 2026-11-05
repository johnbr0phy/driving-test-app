# Wiring for `phinsurance` (Philippines Insurance Commission licensing exam, traditional life agent, v1, region PH)

Files already written by the builder: `data/philippines-insurance-questions.json` (200, PASS, key-longest 15%,
key >1.2x 12%), `lib/banks/phinsurance.ts`, `app/insurance-commission-exam/*` (layout, redirect,
dashboard, drill, stats, copied from `app/malaysia-pce/`; no test or practice folders, the shared
`app/[slug]` routes serve them), `app/insurance-commission-exam-reviewer-practice-test/page.tsx`,
`tools/next100/phinsurance/*` (spec, sources, `q_*.py`, `build.py`, this file). Rebuild with
`python3 -I tools/next100/phinsurance/build.py`. Everything below goes in shared files. `npx tsc`
reports an error in `lib/banks/phinsurance.ts` and the wrappers until `"phinsurance"` is in `ExamId`.

Format note (sources.md, checked 2026-11-05): the Insurance Code (R.A. 10607) Sections 307 and 312
require a license from the Insurance Commissioner and a written exam; IC circulars confirm the
Commission runs the "qualifying insurance agents' examinations" by type (traditional life, variable
life, non-life), registered by the sponsoring insurer, on paper at off-site venues and online through
the Online ACE system. The item count, time and pass mark could not be confirmed from an IC page
(insurance.gov.ph returned 403): review guides report 50 multiple-choice and true or false items in
about one hour, 70% to pass. Here: four 50-question mock tests at a 70% line (labelled a target),
and four content training sets first, so 4 sets + 4 tests = 8 dashboard steps. Pools exactly 4x per
test. The IC publishes no topic weights: the blueprint is Tigertest's. Variable life (VUL) is a
separate exam and is not modelled.

## lib/exams.ts

Add `"phinsurance"` to the `ExamId` union. Icon `umbrella` already exists.

```ts
const phinsurance: ExamConfig = {
  id: "phinsurance",
  stateCode: "PHINS",
  idBase: 19200,
  slug: "/insurance-commission-exam",
  landingPath: "/insurance-commission-exam-reviewer-practice-test",
  name: "Insurance Commission Exam Reviewer",
  shortName: "IC Exam",
  examLabel: "IC licensing exam",
  fullName: "Insurance Commission Licensing Exam for Traditional Life Agents (Philippines)",
  questionIdPrefix: "PHINS-",
  icon: "umbrella",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Insurance Commission qualifying exam for traditional life agents (Insurance Code, R.A. 10607,
  // Sections 307 and 312). The IC publishes no syllabus weights and its format page could not be
  // checked (Nov 2026); guides report 50 items, about 1 hour, 70% to pass, so 70% is a target.
  // Per test (Tigertest's split): principles 5, contract 8, life insurance law 8, products 8,
  // premiums and values 6, underwriting and claims 5, agent licensing and conduct 6,
  // regulation and consumer protection 4. Philippine law as of November 2026; traditional life
  // only (variable contracts are a separate license); no fees, rates or peso limits.
  blueprint: {
    phinsPrinciples: 5,
    phinsContract: 8,
    phinsLifeLaw: 8,
    phinsProducts: 8,
    phinsPolicyValues: 6,
    phinsUnderwriting: 5,
    phinsAgents: 6,
    phinsRegulation: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 19201, name: "Principles & the Insurance Contract", categories: ["phinsPrinciples", "phinsContract"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 19202, name: "Life Insurance Law & Regulation", categories: ["phinsLifeLaw", "phinsRegulation"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 19203, name: "Products, Premiums & Policy Values", categories: ["phinsProducts", "phinsPolicyValues"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 4, id: 19204, name: "Underwriting, Claims & Agent Conduct", categories: ["phinsUnderwriting", "phinsAgents"], size: 44, weightLabel: "11 of 50 test questions" },
  ],
  categoryLabels: {
    phinsPrinciples: "Risk & Principles of Insurance",
    phinsContract: "The Insurance Contract",
    phinsLifeLaw: "Life Insurance Law",
    phinsProducts: "Traditional Life Products & Riders",
    phinsPolicyValues: "Premiums, Values & Options",
    phinsUnderwriting: "Underwriting & Claims",
    phinsAgents: "Agent Licensing & Conduct",
    phinsRegulation: "Regulation & Consumer Protection",
  },
  copy: {
    guestPrompt: "to save your IC exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets: principles and the insurance contract, life insurance law and regulation, products and policy values, and underwriting, claims and agent conduct. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 70% target",
    heroSubs: [
      "Start with the Insurance Code basics.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Ask your insurer to book your IC exam.",
    ],
    sourceLine: "Based on the Amended Insurance Code (R.A. 10607) and Philippine law as of November 2026. Original questions; 50 per test. Not affiliated with the Insurance Commission or any insurance company.",
    analyticsKey: "phinsurance",
  },
};
```

Append `phinsurance` to the `EXAMS` array after `phlet` (or after the other international batch 2
Philippines exams). Check: 19201-19204 (tests 19201-19204, sets 19201-19204) are free (the batch
assigns 19200).

## lib/banks/all.ts

```ts
import "./phinsurance";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/phinsurance.ts`.

## types/index.ts

- `QuestionType`: add `| "PHINS"`.
- `QuestionCategory`, under a `// Philippines Insurance Commission exam (traditional life agents)` comment:

```ts
  | "phinsPrinciples"
  | "phinsContract"
  | "phinsLifeLaw"
  | "phinsProducts"
  | "phinsPolicyValues"
  | "phinsUnderwriting"
  | "phinsAgents"
  | "phinsRegulation"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    phinsPrinciples: "Risk & Principles of Insurance",
    phinsContract: "The Insurance Contract",
    phinsLifeLaw: "Life Insurance Law",
    phinsProducts: "Traditional Life Products & Riders",
    phinsPolicyValues: "Premiums, Values & Options",
    phinsUnderwriting: "Underwriting & Claims",
    phinsAgents: "Agent Licensing & Conduct",
    phinsRegulation: "Regulation & Consumer Protection",
```

## app/globals.css

Hue from the international batch 2 table (200 15% 22%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Philippines Insurance Commission exam (traditional life agents) theme */
  [data-theme="phinsurance"] {
    --brand: 200 15% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 200 15% 96%;
    --brand-hover: 200 15% 17%;
    --brand-dark: 200 15% 16%;
    --brand-darker: 200 12% 10%;
    --brand-muted: 200 8% 70%;
    --brand-border: 200 8% 80%;
    --brand-border-light: 200 8% 89%;
    --brand-gradient-to: 200 25% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `phinsurance: "Insurance Commission exam reviewer for traditional life agents in the Philippines: the Amended Insurance Code on insurable interest, concealment, beneficiaries, suicide, grace period and reinstatement, term, whole life and endowment plans, cash values and options, underwriting, and agent licensing and conduct, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `phinsurance: "Insurance Commission (Philippines) · traditional life agent licensing exam",`
- Hub group: new group placed after "Philippines government and licensure exams" (shared with phrebroker):
  `{ title: "Philippines insurance and real estate licences", ids: ["phinsurance", "phrebroker"] },`
  (the brief's spelling of the group title; the integrator may prefer "licenses" for PH copy).
- `SEARCH_ALIASES`:
  `phinsurance: "insurance commission exam ic exam ic licensure exam ic reviewer insurance agent exam philippines life insurance agent licensing exam traditional life exam traditional life reviewer insurance code reviewer ra 10607 financial advisor exam philippines insurance agent license philippines online ace life agent exam reviewer",`
- `RELATED_OVERRIDES`: `phinsurance: ["phrebroker", "mypce", "llqp"],` (a two-exam group needs
  padding; `mypce` and `llqp` are life agent licence exams elsewhere).

## lib/region.ts

`phinsurance: "PH",` in `TEST_REGIONS`, and add `"phinsurance"` to `NON_DRIVING_TESTS`.
If `REGION_HOME.PH` or `faqsFor("PH")` lists the Philippines' tests by name, add "the Insurance
Commission exam for life insurance agents".

## lib/examFacts.ts

```ts
  phinsurance: {
    answer:
      "The Insurance Commission (IC) licensing exam for traditional life agents is the written qualifying exam a person must pass before the IC issues a license to sell traditional life insurance in the Philippines. Under the Amended Insurance Code (R.A. 10607), no one may act as an insurance agent or receive a commission without a license from the Insurance Commissioner, and applicants must pass a written examination. The life insurer you will represent registers you for the exam and endorses your license application; the IC runs it on paper and online. The IC does not publish the format on a page we could check: review guides report 50 multiple-choice and true or false items in about one hour, with 70% to pass. An agent's license is renewed every three years.",
    rows: [
      { label: "Run by", value: "Insurance Commission (attached to the Department of Finance)" },
      { label: "Who registers you", value: "The life insurance company you will represent" },
      { label: "Questions", value: "About 50, multiple choice and true or false (guides report)" },
      { label: "Time", value: "About 1 hour (guides report)" },
      { label: "Pass mark", value: "70% (guides report; not published by the IC)" },
      { label: "Format", value: "Paper at IC venues or online (Online ACE)" },
      { label: "License", value: "Renewed every 3 years (Insurance Code, Section 307)" },
    ],
    basedOn: "Amended Insurance Code (R.A. 10607) Sections 307 and 312, and IC Circular Letters 2021-01, 2021-08 and 2024-21, checked November 2026",
    source: { name: "Republic Act No. 10607 (Lawphil)", url: "https://lawphil.net/statutes/repacts/ra2013/ra_10607_2013.html" },
  },
```
(Exam fee is in the IC circulars; left out by house rule.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Not required by the brief (only the PRC board exams and phcle are teacher-led). Insurers run
pre-licensing classes for recruits, so an optional `phinsurance: "pre-licensing classes for new life agents"`
TEACHES line is reasonable if the integrator wants it.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader, lib/tigerAssets.ts

Nothing required: sitemaps map over `EXAMS`, no redirects, `umbrella` icon exists. Borrow a tiger
through `BORROWED_SETS`, like `mypce` and `llqp`: `phinsurance: "insurance",`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 56).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing phinsurance:insurance-commission-exam:19201`

## CLAUDE.md (under Additional Exams, after the LET Reviewer bullet or the Malaysia PCEIA bullet)

```md
- **Insurance Commission Exam** (`phinsurance`, Philippines Insurance Commission licensing exam for traditional life agents, `/insurance-commission-exam/*`, landing `/insurance-commission-exam-reviewer-practice-test`): `data/philippines-insurance-questions.json` (200 original questions on the Amended Insurance Code (R.A. 10607) and life insurance practice: risk and principles 20, the insurance contract (insurable interest, concealment, representations, warranties, premium) 32, life insurance law (beneficiaries, Article 2012, minors, suicide, incontestability, Section 233 provisions, claims within 60 days) 32, traditional life products and riders (term, whole life, endowment, group and industrial life, microinsurance, annuities) 32, premiums, values and options 24, underwriting and claims 20, agent licensing and conduct (Sections 307 to 315, 370 to 374, CL 2024-21) 24, regulation and consumer protection (IC, Security Fund, AMLA, R.A. 11765) 16), test IDs 19201-19204, sets 19201-19204 (by topic, sets first), state `PHINS`, prefix `PHINS-`, 70% target. 5/8/8/8/6/5/6/4 per test (the IC publishes no weights; the split is Tigertest's). The IC's format page could not be read: guides report 50 items, about 1 hour, 70% to pass, and the landing and examFacts say so. Traditional life only (VUL is a separate license); no fees, rates or peso limits. Kept clear of `life-health`, `llqp` and `mypce`. Built by `tools/next100/phinsurance/build.py`; sources in `tools/next100/phinsurance/sources.md`. Region PH, hub group "Philippines insurance and real estate licences", `[data-theme="phinsurance"]` dark slate (200 15% 22%), borrows the life and health insurance tiger.
```
