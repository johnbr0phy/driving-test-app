# Wiring for `cpaaud` (CPA Exam, Auditing and Attestation (AUD) section, US, v1)

Files already written by the builder: `data/cpa-aud-questions.json` (200, PASS), `lib/banks/cpaaud.ts`,
`app/cpa-aud/*` (5 wrappers copied from `app/cpa-far/`: layout, redirect, dashboard, drill, stats),
`app/cpa-aud-practice-test/page.tsx`, `tools/next100/cpaaud/*` (spec, sources, `q_*.py`, `build.py`).
Everything below goes in shared files.

Format note: the real AUD section is 4 hours, 78 multiple-choice questions (two testlets of 39) and
7 task-based simulations, scored 50/50, reported 0 to 99 with 75 to pass (scaled, not percent correct).
Here: the multiple-choice half only, four 50-question tests weighted to the AICPA 2026 blueprint's four
areas (I 10, II 15, III 17, IV 8 per test), 6 content training sets + 4 tests = 10 dashboard steps.
Pass line 75% as a readiness target. Pools are exactly 4x per-test counts. Content sets as in cpafar
(sets first, then tests).

## lib/exams.ts

Add `"cpaaud"` to the `ExamId` union (next to `"cpareg"`). Icon `calculator` already exists.

```ts
const cpaaud: ExamConfig = {
  id: "cpaaud",
  stateCode: "CPAAUD",
  idBase: 16400,
  slug: "/cpa-aud",
  landingPath: "/cpa-aud-practice-test",
  name: "CPA AUD Practice Test",
  shortName: "CPA AUD",
  examLabel: "CPA Exam AUD section",
  fullName: "CPA Exam Auditing and Attestation (AUD) section",
  questionIdPrefix: "CPAAUD-",
  icon: "calculator",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // AICPA Uniform CPA Examination Blueprints effective January 1, 2026 (the 2027 Blueprints, approved
  // Sept 16, 2026, only revise examples in four Area III tasks; checked Nov 2026).
  // Real AUD: 4 hours, 78 MCQs (39 + 39) + 7 TBSs, scored 50/50, 75 on a 0-99 scale to pass. MCQ half only.
  // Area I Ethics, Professional Responsibilities and General Principles 15-25% -> 10,
  // Area II Assessing Risk and Developing a Planned Response 25-35% -> 15,
  // Area III Performing Further Procedures and Obtaining Evidence 30-40% -> 17,
  // Area IV Forming Conclusions and Reporting 10-20% -> 8 per 50-question test. All items original.
  blueprint: {
    cpaaudEthics: 6,
    cpaaudEngagement: 4,
    cpaaudPlanning: 5,
    cpaaudControls: 5,
    cpaaudRisk: 5,
    cpaaudEvidence: 6,
    cpaaudSampling: 4,
    cpaaudSpecial: 7,
    cpaaudAuditReports: 4,
    cpaaudOtherReports: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 16401, name: "Ethics, Independence & Engagement Basics", categories: ["cpaaudEthics", "cpaaudEngagement"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 16402, name: "Planning, Materiality & Internal Control", categories: ["cpaaudPlanning", "cpaaudControls"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 16403, name: "Fraud, Specialists & Specific Risks", categories: ["cpaaudRisk"], size: 20, weightLabel: "5 of 50 test questions" },
    { setNumber: 4, id: 16404, name: "Evidence & Sampling", categories: ["cpaaudEvidence", "cpaaudSampling"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 16405, name: "Special Matters & Subsequent Events", categories: ["cpaaudSpecial"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 6, id: 16406, name: "Audit, Attestation & SSARS Reports", categories: ["cpaaudAuditReports", "cpaaudOtherReports"], size: 32, weightLabel: "8 of 50 test questions" },
  ],
  categoryLabels: {
    cpaaudEthics: "Ethics & Independence",
    cpaaudEngagement: "Engagement Terms, Documentation & Quality",
    cpaaudPlanning: "Planning, Risk Assessment & Materiality",
    cpaaudControls: "Internal Control & IT",
    cpaaudRisk: "Fraud, Specialists & Specific Risk Areas",
    cpaaudEvidence: "Audit Evidence & Procedures",
    cpaaudSampling: "Audit Sampling",
    cpaaudSpecial: "Special Matters, Representations & Subsequent Events",
    cpaaudAuditReports: "Audit Reports",
    cpaaudOtherReports: "Attestation, SSARS & Other Reports",
  },
  copy: {
    guestPrompt: "to save your CPA AUD progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Six sets covering all four areas of the AICPA AUD blueprint. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 multiple-choice questions weighted like the AUD blueprint, 75% readiness line",
    heroSubs: [
      "Six sets, four tests. Start with independence.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Practice simulations, then sit AUD.",
    ],
    sourceLine: "Based on the AICPA's 2026 AUD blueprint. Original multiple-choice questions; simulations not included. Not affiliated with the AICPA, NASBA or the PCAOB.",
    analyticsKey: "cpaaud",
  },
};
```

Append `cpaaud` to the `EXAMS` array after `cpareg`.

Check: 16401-16404 (tests) and 16401-16406 (sets) must be free (batch B table assigns 16400; cfal1 is 16300, accafa 16500).

## lib/banks/all.ts

```ts
import "./cpaaud";
```

## types/index.ts

- `QuestionType`: add `| "CPAAUD"`.
- `QuestionCategory`, under a `// CPA Exam AUD` comment:

```ts
  | "cpaaudEthics"
  | "cpaaudEngagement"
  | "cpaaudPlanning"
  | "cpaaudControls"
  | "cpaaudRisk"
  | "cpaaudEvidence"
  | "cpaaudSampling"
  | "cpaaudSpecial"
  | "cpaaudAuditReports"
  | "cpaaudOtherReports"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels, wherever cpafar's labels sit)

```ts
    cpaaudEthics: "Ethics & Independence",
    cpaaudEngagement: "Engagement Terms, Documentation & Quality",
    cpaaudPlanning: "Planning, Risk Assessment & Materiality",
    cpaaudControls: "Internal Control & IT",
    cpaaudRisk: "Fraud, Specialists & Specific Risk Areas",
    cpaaudEvidence: "Audit Evidence & Procedures",
    cpaaudSampling: "Audit Sampling",
    cpaaudSpecial: "Special Matters, Representations & Subsequent Events",
    cpaaudAuditReports: "Audit Reports",
    cpaaudOtherReports: "Attestation, SSARS & Other Reports",
```

## app/globals.css

Hue from the batch B table (already checked): 152 15% 30% (cpafar is 147 35% 38%, series65 161 15% 32%,
cpareg 170 23% 30%). Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* CPA Exam AUD theme */
  [data-theme="cpaaud"] {
    --brand: 152 15% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 152 15% 96%;
    --brand-hover: 152 15% 25%;
    --brand-dark: 152 15% 24%;
    --brand-darker: 152 15% 16%;
    --brand-muted: 152 12% 70%;
    --brand-border: 152 12% 80%;
    --brand-border-light: 152 10% 89%;
    --brand-gradient-to: 45 70% 95%;
  }
```

## lib/shareCards.ts and lib/shareImageUrl.ts (as cpafar)

```ts
  "cpaaud": {
    "color": "hsl(152, 15%, 30%)",
    "tint": "hsl(152, 15%, 96%)"
  },
```
and add `"cpaaud"` to `SHARE_COPY_IDS`.

## lib/tigerAssets.ts

`BORROWED_SETS`: `cpaaud: "cpc",` (same as cpafar and cpareg).

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cpaaud: "CPA Exam AUD multiple-choice practice on the AICPA 2026 blueprint: independence and ethics, quality management, risk assessment under SAS 145, internal control and IT, fraud, evidence, sampling, going concern, subsequent events and audit, attestation and SSARS reports, with every answer explained.",`
- `EXAM_ORG`: `cpaaud: "AICPA and NASBA · Uniform CPA Examination, AUD Core section",`
- Hub group: add to the existing group:
  `{ title: "Accounting and CPA exams", ids: ["cpafar", "cpareg", "cpaaud"] },`
  (accafa and aatl2 from this batch may join it too; the integrator orders the group.)
- `RELATED_OVERRIDES`: `cpaaud: ["cpafar", "cpareg", "series65"],` (and consider adding `"cpaaud"` to
  cpafar's and cpareg's lists).
- `SEARCH_ALIASES`:
  `cpaaud: "cpa aud cpa exam auditing and attestation aud section uniform cpa examination aicpa nasba pcaob audit auditing gaas sas attestation ssars independence internal control cpa core accountant license certified public accountant",`

## lib/region.ts

US exam: no `TEST_REGIONS` entry (as cpafar).

## lib/examFacts.ts

```ts
  cpaaud: {
    answer:
      "AUD (Auditing and Attestation) is one of the three Core sections of the Uniform CPA Examination, developed by the AICPA and delivered with NASBA and the state boards of accountancy. It lasts 4 hours and has 78 multiple-choice questions and 7 task-based simulations, each half of the score. Scores run from 0 to 99 and 75 passes; it is a scaled score, not a percent correct. Under the Blueprints effective January 1, 2026 its four content areas are Ethics, Professional Responsibilities and General Principles (15 to 25%), Assessing Risk and Developing a Planned Response (25 to 35%), Performing Further Procedures and Obtaining Evidence (30 to 40%) and Forming Conclusions and Reporting (10 to 20%).",
    rows: [
      { label: "Time", value: "4 hours" },
      { label: "Questions", value: "78 multiple choice, 7 task-based simulations" },
      { label: "Score weighting", value: "50% multiple choice, 50% simulations" },
      { label: "Passing score", value: "75 on a 0 to 99 scale" },
      { label: "Content areas", value: "Ethics and General Principles, Risk Assessment, Further Procedures and Evidence, Reporting" },
      { label: "Blueprint", value: "AICPA, effective January 1, 2026" },
      { label: "Run by", value: "AICPA, NASBA and state boards of accountancy" },
    ],
    basedOn: "the AICPA CPA Exam Blueprints effective January 1, 2026 and the 2027 summary of changes, checked November 2026",
    source: { name: "AICPA: What is tested on the CPA Exam", url: "https://www.aicpa-cima.com/resources/article/learn-what-is-tested-on-the-cpa-exam" },
  },
```
(Fees left out: they vary by jurisdiction.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date; run `npx tsx scripts/build-landing-dates.ts`.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx, TEACHER_LED

Nothing: candidates self-study (as cpafar); the landing does not render `ExamClassFaq`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing: sitemaps map over `EXAMS`, no redirects, `calculator` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 40).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cpaaud:cpa-aud:16401`

## CLAUDE.md (under Additional Exams, after the CPA REG bullet)

```md
- **CPA AUD** (Uniform CPA Examination, Auditing and Attestation section, multiple choice only, `/cpa-aud/*`, landing `/cpa-aud-practice-test`): `data/cpa-aud-questions.json` (200 original questions on the AICPA Blueprints effective January 1, 2026; the 2027 Blueprints only revise examples in four Area III tasks: Area I ethics and independence 24, engagement terms, documentation and quality management 16; Area II planning, risk assessment and materiality 20, internal control and IT 20, fraud, specialists and specific risk areas 20; Area III evidence and procedures 24, sampling 16, special matters, representations and subsequent events 28; Area IV audit reports 16, attestation, SSARS and other reports 16), test IDs 16401-16404, sets 16401-16406, state `CPAAUD`, prefix `CPAAUD-`, 75% readiness line (the real section is 4 hours, 78 MCQs and 7 simulations scored 50/50, 75 on a 0-99 scale). 6/4, 5/5/5, 6/4/7, 4/4 per test (Areas I/II/III/IV 10/15/17/8 inside 15-25/25-35/30-40/10-20%). Current standards: clarified SASs with SAS 143, 145, 146 and 149, SQMS 1 and 2, PCAOB standards, SSARS, SSAE 19 and 21, Yellow Book and Uniform Guidance; no dollar thresholds. Simulations not modelled. Built by `tools/next100/cpaaud/build.py`; sources in `tools/next100/cpaaud/sources.md`.
```
