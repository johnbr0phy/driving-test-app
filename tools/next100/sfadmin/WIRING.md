# Wiring for `sfadmin` (Salesforce Certified Platform Administrator, GLOBAL, v1)

Files already written by the builder: `data/salesforce-admin-questions.json` (200, PASS,
key-longest 16%), `lib/banks/sfadmin.ts`, `app/salesforce-admin/*` (layout, redirect, dashboard,
drill, stats, copied from `app/nmls/`; no test or practice folders, the shared `app/[slug]` routes
serve them), `app/salesforce-administrator-practice-test/page.tsx`, `tools/next100/sfadmin/*`
(spec, sources, `q_*.py`, `build.py`, this file). Everything below goes in shared files.

Format note: guides quoting the current exam guide (refreshed December 15, 2025; the official
Help article did not render for us, see `sources.md`) give 60 scored questions plus up to 5
unscored in 105 minutes, 68% to pass (English). Here: three real-length 60-question tests in the
exam guide's 15/15/10/10/10/17/15/8 weights, 6 training sets + 3 tests = 9 dashboard steps.
Pass line `ceil(0.68 * 60) = 41`. Pools are 3x per test plus 20 training-only spares (the last
items of each pool). Sets are content sets, so not interleaved: sets first, then tests.
Real "choose two/three" items are single answer here (said on the landing FAQ).

## lib/exams.ts

Add `"sfadmin"` to the `ExamId` union. Icon `cloud` already exists.

```ts
const sfadmin: ExamConfig = {
  id: "sfadmin",
  stateCode: "SFADMIN",
  idBase: 16200,
  slug: "/salesforce-admin",
  landingPath: "/salesforce-administrator-practice-test",
  name: "Salesforce Platform Administrator Practice Test",
  shortName: "Salesforce Admin",
  examLabel: "Platform Administrator exam",
  fullName: "Salesforce Certified Platform Administrator",
  questionIdPrefix: "SFADM-",
  icon: "cloud",
  testCount: 3,
  questionsPerTest: 60,
  passPct: 68,
  // Salesforce Certified Platform Administrator exam guide (blueprint refreshed December 15,
  // 2025, figures from guides quoting it, checked 2026-11-03): 60 scored items plus up to 5
  // unscored, 105 minutes, 68% to pass (English). Configuration and Setup 15%, Object Manager
  // and Lightning App Builder 15%, Sales and Marketing Applications 10%, Service and Support
  // Applications 10%, Productivity and Collaboration 10%, Data and Analytics Management 17%,
  // Automation 15%, Agentforce 8%, scaled to 60 by largest remainder: 9/9/6/6/6/10/9/5. Three
  // real-length tests; 20 training-only spares. Choose-two items written as single answer.
  blueprint: {
    sfadminConfig: 9,
    sfadminObjects: 9,
    sfadminSales: 6,
    sfadminService: 6,
    sfadminProductivity: 6,
    sfadminData: 10,
    sfadminAutomation: 9,
    sfadminAgentforce: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 16201, name: "Configuration & Setup", categories: ["sfadminConfig"], size: 30, weightLabel: "9 of 60 test questions" },
    { setNumber: 2, id: 16202, name: "Object Manager & Lightning App Builder", categories: ["sfadminObjects"], size: 30, weightLabel: "9 of 60 test questions" },
    { setNumber: 3, id: 16203, name: "Sales & Service Apps", categories: ["sfadminSales", "sfadminService"], size: 40, weightLabel: "12 of 60 test questions" },
    { setNumber: 4, id: 16204, name: "Productivity & Agentforce", categories: ["sfadminProductivity", "sfadminAgentforce"], size: 37, weightLabel: "11 of 60 test questions" },
    { setNumber: 5, id: 16205, name: "Data & Analytics", categories: ["sfadminData"], size: 33, weightLabel: "10 of 60 test questions" },
    { setNumber: 6, id: 16206, name: "Automation", categories: ["sfadminAutomation"], size: 30, weightLabel: "9 of 60 test questions" },
  ],
  categoryLabels: {
    sfadminConfig: "Configuration & Setup",
    sfadminObjects: "Object Manager & Lightning App Builder",
    sfadminSales: "Sales & Marketing Apps",
    sfadminService: "Service & Support Apps",
    sfadminProductivity: "Productivity & Collaboration",
    sfadminData: "Data & Analytics Management",
    sfadminAutomation: "Automation",
    sfadminAgentforce: "Agentforce",
  },
  copy: {
    guestPrompt: "to save your Salesforce admin progress and track every question you miss",
    trainingHeading: "Train by section",
    trainingSub: "Six sets covering all eight sections of the Platform Administrator exam guide. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 60 questions weighted like the real exam, 68% to pass",
    heroSubs: [
      "Six sets, three full-length tests. Data, security and Flow weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your Platform Administrator exam.",
    ],
    sourceLine: "Based on the Salesforce Certified Platform Administrator exam guide. Original questions; 60 per test, weighted like the real exam, 68% to pass. Not affiliated with Salesforce.",
    analyticsKey: "sfadmin",
  },
};
```

Append `sfadmin` to the `EXAMS` array with the IT certifications (after `gcdl` if it is a v1
neighbour; otherwise after `nmls`/batch B's last exam).

Check: 16201-16203 (tests) and 16201-16206 (sets) must be free (batch B assigns 16200).

## lib/banks/all.ts

```ts
import "./sfadmin";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/sfadmin.ts`.

## types/index.ts

- `QuestionType`: add `| "SFADMIN"`.
- `QuestionCategory`, under a `// Salesforce Platform Administrator` comment:

```ts
  | "sfadminConfig"
  | "sfadminObjects"
  | "sfadminSales"
  | "sfadminService"
  | "sfadminProductivity"
  | "sfadminData"
  | "sfadminAutomation"
  | "sfadminAgentforce"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    sfadminConfig: "Configuration & Setup",
    sfadminObjects: "Object Manager & Lightning App Builder",
    sfadminSales: "Sales & Marketing Apps",
    sfadminService: "Service & Support Apps",
    sfadminProductivity: "Productivity & Collaboration",
    sfadminData: "Data & Analytics Management",
    sfadminAutomation: "Automation",
    sfadminAgentforce: "Agentforce",
```

## app/globals.css

Hue from the batch B table (238 80% 28%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Salesforce Platform Administrator theme */
  [data-theme="sfadmin"] {
    --brand: 238 80% 28%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 238 80% 96%;
    --brand-hover: 238 80% 23%;
    --brand-dark: 238 80% 20%;
    --brand-darker: 238 75% 14%;
    --brand-muted: 238 35% 70%;
    --brand-border: 238 35% 80%;
    --brand-border-light: 238 33% 89%;
    --brand-gradient-to: 205 60% 95%;
  }
```

## lib/tigerAssets.ts

`BORROWED_SETS`: `sfadmin: "aws",` (cloud certification, like `gcdl` and `az900`).

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `sfadmin: "Salesforce Certified Platform Administrator practice on the 2026 exam guide: users, profiles and sharing, Object Manager and Lightning App Builder, sales and service apps, reports and dashboards, Flow and approvals, and Agentforce subagents and Prompt Builder, every answer explained.",`
- `EXAM_ORG`: `sfadmin: "Salesforce · Platform Administrator exam guide, 2026",`
- Hub group: "IT certifications", add `"sfadmin"` after `"gcdl"`. (If the integrator opens a
  business-software group for batch B, put it there instead.)
- `SEARCH_ALIASES`:
  `sfadmin: "salesforce admin administrator platform administrator certified administrator adm 201 adm201 salesforce certification crm admin trailhead flow agentforce lightning salesforce exam",`
- `RELATED_OVERRIDES` (optional): `sfadmin: ["aws", "az900", "gcdl"],`

## lib/region.ts

`sfadmin: "GLOBAL",` in `TEST_REGIONS` (taken worldwide; Salesforce runs one exam in several
languages). Not in `NON_DRIVING_TESTS` (GLOBAL tests are not listed there, like `aws`, `gulfrn`).

## lib/examFacts.ts

```ts
  sfadmin: {
    answer:
      "The Salesforce Certified Platform Administrator exam, formerly Salesforce Certified Administrator, is Salesforce's core admin certification. Guides quoting the current exam guide give 60 scored multiple-choice and multiple-select questions plus up to 5 unscored ones in 105 minutes, with 68% needed to pass the English exam. Its eight sections were refreshed for 2026: Configuration and Setup 15%, Object Manager and Lightning App Builder 15%, Sales and Marketing Applications 10%, Service and Support Applications 10%, Productivity and Collaboration 10%, Data and Analytics Management 17%, Automation 15% and Agentforce 8%.",
    rows: [
      { label: "Questions", value: "60 scored, plus up to 5 unscored" },
      { label: "Time", value: "105 minutes" },
      { label: "Passing score", value: "68% (English exam)" },
      { label: "Largest section", value: "Data and Analytics Management, 17%" },
      { label: "New section", value: "Agentforce, 8%" },
      { label: "Run by", value: "Salesforce, registered through Trailhead" },
    ],
    basedOn: "Salesforce Platform Administrator exam guide as quoted by study guides, checked November 2026",
    source: { name: "Trailhead: Salesforce Certified Platform Administrator", url: "https://trailhead.salesforce.com/credentials/platformadministrator" },
  },
```
(Fee deliberately left out.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing: self-study (the template sets none). Bootcamps exist, but the template convention for
paid certifications is no TEACHER_LED.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing: sitemaps map over `EXAMS`, no redirects, `cloud` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 40).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing sfadmin:salesforce-admin:16201`

## CLAUDE.md (under Additional Exams, after the NMLS SAFE bullet or with batch B)

```md
- **Salesforce Admin** (Salesforce Certified Platform Administrator, formerly Salesforce Certified Administrator, `/salesforce-admin/*`, landing `/salesforce-administrator-practice-test`): `data/salesforce-admin-questions.json` (200 questions on the exam guide refreshed December 15, 2025: configuration and setup 30, Object Manager and Lightning App Builder 30, sales and marketing 20, service and support 20, productivity and collaboration 20, data and analytics 33, automation 30, Agentforce 17), three real-length tests: test IDs 16201-16203 (60 questions each), sets 16201-16206 (by section), state `SFADMIN`, prefix `SFADM-`, 68% pass (41 of 60). 9/9/6/6/6/10/9/5 per test; the last items of each pool (20 in all) are training-only. Choose-two items are single answer. Product names as of Nov 2026: Flow (workflow rules and Process Builder retired), Dynamic Forms, Agentforce subagents (formerly called topics), Agent Script, Prompt Builder, Testing Center. Section weights confirmed by the Trailhead module "Get Started with Administrator Certification Prep"; question count, time and pass mark are from guides quoting the official exam guide, which did not render. Built by `tools/next100/sfadmin/build.py`; sources in `tools/next100/sfadmin/sources.md`. Region GLOBAL, hub group "IT certifications", `[data-theme="sfadmin"]` deep indigo (238 80% 28%), borrows the AWS tiger.
```
