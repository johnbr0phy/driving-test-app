# Wiring for `cisa` (ISACA Certified Information Systems Auditor, GLOBAL, v1)

Files already written by the builder: `data/cisa-questions.json` (200, PASS, key-longest 6%),
`lib/banks/cisa.ts`, `app/cisa/*` (layout, redirect, dashboard, drill, stats, copied from
`app/salesforce-admin/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/cisa-practice-test/page.tsx`, `tools/next100/cisa/*` (spec, sources, `q_*.py`, `build.py`,
this file). Everything below goes in shared files.

Format note: ISACA's content outline (job practice effective 1 August 2024) gives 150 questions
and five domains weighted 18/18/12/26/26. Guides quoting ISACA's candidate guide give 4 hours and a
scaled score of 200 to 800 with 450 to pass (no percent published). Here: four 50-question tests at
the real pace (about 80 minutes each), weighted exactly 9/9/6/13/13, no spares (pools 4x per test).
Pass line 70% (35 of 50) is Tigertest's readiness target. Five training sets (one per domain) +
4 tests = 9 dashboard steps. Content sets, so sets first, then tests.

## lib/exams.ts

Add `"cisa"` to the `ExamId` union. Icon `shield` already exists.

```ts
const cisa: ExamConfig = {
  id: "cisa",
  stateCode: "CISA",
  idBase: 17100,
  slug: "/cisa",
  landingPath: "/cisa-practice-test",
  name: "CISA Practice Test",
  shortName: "CISA",
  examLabel: "CISA exam",
  fullName: "ISACA Certified Information Systems Auditor (CISA)",
  questionIdPrefix: "CISA-",
  icon: "shield",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // ISACA CISA Exam Content Outline, job practice effective 1 August 2024 (checked 2026-11-04):
  // 150 questions (4 hours, scaled 200 to 800 with 450 to pass, per guides quoting the candidate
  // guide). Domain 1 Information System Auditing Process 18%, Domain 2 Governance and Management
  // of IT 18%, Domain 3 IS Acquisition, Development and Implementation 12%, Domain 4 IS Operations
  // and Business Resilience 26%, Domain 5 Protection of Information Assets 26%, scaled to 50:
  // 9/9/6/13/13 exactly. Four 50-question tests at the real pace; 70% is Tigertest's readiness line.
  blueprint: {
    cisaAudit: 9,
    cisaGovernance: 9,
    cisaAcquisition: 6,
    cisaOperations: 13,
    cisaProtection: 13,
  },
  trainingSets: [
    { setNumber: 1, id: 17101, name: "Auditing Process", categories: ["cisaAudit"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 2, id: 17102, name: "Governance & Management of IT", categories: ["cisaGovernance"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 3, id: 17103, name: "Acquisition & Development", categories: ["cisaAcquisition"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 4, id: 17104, name: "Operations & Resilience", categories: ["cisaOperations"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 5, id: 17105, name: "Protection of Information Assets", categories: ["cisaProtection"], size: 52, weightLabel: "13 of 50 test questions" },
  ],
  categoryLabels: {
    cisaAudit: "Information System Auditing Process",
    cisaGovernance: "Governance & Management of IT",
    cisaAcquisition: "IS Acquisition, Development & Implementation",
    cisaOperations: "IS Operations & Business Resilience",
    cisaProtection: "Protection of Information Assets",
  },
  copy: {
    guestPrompt: "to save your CISA progress and track every question you miss",
    trainingHeading: "Train by domain",
    trainingSub: "Five sets, one for each CISA job practice domain. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam, 70% readiness line",
    heroSubs: [
      "Five domain sets, four tests. Operations and protection weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your CISA exam.",
    ],
    sourceLine: "Based on ISACA's CISA job practice areas (effective August 2024). Original questions; 50 per test, weighted like the real exam. Not affiliated with ISACA.",
    analyticsKey: "cisa",
  },
};
```

Append `cisa` to the `EXAMS` array with the IT certifications (after `sfadmin`, or after the last
batch C exam).

Check: 17101-17104 (tests) and 17101-17105 (sets) must be free (batch C assigns 17100).

## lib/banks/all.ts

```ts
import "./cisa";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/cisa.ts`.

## types/index.ts

- `QuestionType`: add `| "CISA"`.
- `QuestionCategory`, under a `// ISACA CISA` comment:

```ts
  | "cisaAudit"
  | "cisaGovernance"
  | "cisaAcquisition"
  | "cisaOperations"
  | "cisaProtection"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cisaAudit: "Information System Auditing Process",
    cisaGovernance: "Governance & Management of IT",
    cisaAcquisition: "IS Acquisition, Development & Implementation",
    cisaOperations: "IS Operations & Business Resilience",
    cisaProtection: "Protection of Information Assets",
```

## app/globals.css

Hue from the batch C table (250 20% 32%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* ISACA CISA theme */
  [data-theme="cisa"] {
    --brand: 250 20% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 250 20% 96%;
    --brand-hover: 250 20% 27%;
    --brand-dark: 250 20% 22%;
    --brand-darker: 250 18% 15%;
    --brand-muted: 250 12% 70%;
    --brand-border: 250 12% 80%;
    --brand-border-light: 250 11% 89%;
    --brand-gradient-to: 210 40% 95%;
  }
```

## lib/tigerAssets.ts

`BORROWED_SETS`: `cisa: "cissp",` (security and audit certification; CISSP has its own set).

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cisa: "ISACA CISA practice on the job practice areas in effect since August 2024: audit planning, sampling and evidence, IT governance and vendor management, system development and changeover, operations, backups and continuity, and access, network and physical security, answered from the auditor's point of view.",`
- `EXAM_ORG`: `cisa: "ISACA · CISA job practice areas, effective August 2024",`
- Hub group: "IT certifications", add `"cisa"` after `"cissp"`.
- `SEARCH_ALIASES`:
  `cisa: "cisa isaca certified information systems auditor it audit is audit it auditor information systems audit audit certification itgc it general controls cism crisc cobit",`
- `RELATED_OVERRIDES` (optional): `cisa: ["cissp", "secplus", "cpaaud"],`

## lib/region.ts

`cisa: "GLOBAL",` in `TEST_REGIONS` (ISACA runs one exam worldwide at PSI centers and online).
Not in `NON_DRIVING_TESTS` (GLOBAL tests are not listed there, like `cissp`, `sfadmin`).

## lib/examFacts.ts

```ts
  cisa: {
    answer:
      "The CISA (Certified Information Systems Auditor) exam is ISACA's certification exam for IT audit, control and assurance professionals. ISACA's content outline gives 150 questions across five job practice domains, in effect since 1 August 2024: Information System Auditing Process 18%, Governance and Management of IT 18%, Information Systems Acquisition, Development and Implementation 12%, Information Systems Operations and Business Resilience 26%, and Protection of Information Assets 26%. Guides quoting ISACA's candidate guide give 4 hours and a scaled score of 200 to 800, with 450 needed to pass. It is taken on a computer at a PSI test center or with a remote proctor.",
    rows: [
      { label: "Questions", value: "150 multiple choice" },
      { label: "Time", value: "4 hours (guides quoting ISACA)" },
      { label: "Passing score", value: "450 on a 200 to 800 scale" },
      { label: "Largest domains", value: "Operations and resilience, protection of assets, 26% each" },
      { label: "Outline in effect", value: "Since 1 August 2024" },
      { label: "Certification", value: "Also needs 5 years of IS audit, control or security work" },
      { label: "Run by", value: "ISACA, delivered by PSI" },
    ],
    basedOn: "ISACA CISA exam content outline and certification requirements, checked November 2026",
    source: { name: "ISACA: CISA Exam Content Outline", url: "https://www.isaca.org/credentialing/cisa/cisa-exam-content-outline" },
  },
```
(Fee deliberately left out.)

## lib/shareImageUrl.ts, lib/shareCardCopy.ts, lib/shareCards.ts

If the integrator adds batch C to the share-card lists (as for batch B):
- `SHARE_COPY_IDS`: add `"cisa"`.
- `shareCardCopy.ts`: `cisa: { title: "ISACA CISA", description: "Practice the IS audit process, IT governance, development, operations and resilience, and protecting information assets." },`
- `shareCards.ts`: `"cisa": { "color": "hsl(250, 20%, 32%)", "tint": "hsl(250, 20%, 96%)" },`

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing: self-study (like `cissp` and `sfadmin`). Bootcamps exist, but the convention for paid
certifications is no TEACHER_LED.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing: sitemaps map over `EXAMS`, no redirects, `shield` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 52).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cisa:cisa:17101`

## CLAUDE.md (under Additional Exams, after the Salesforce Admin bullet or with batch C)

```md
- **CISA** (ISACA Certified Information Systems Auditor, `/cisa/*`, landing `/cisa-practice-test`): `data/cisa-questions.json` (200 original auditor's-perspective best/first/most questions on the CISA job practice areas effective 1 August 2024: information system auditing process 36, governance and management of IT 36, IS acquisition, development and implementation 24, IS operations and business resilience 52, protection of information assets 52), test IDs 17101-17104 (50 questions each; the real exam is 150 in 4 hours per guides, scaled 200 to 800 with 450 to pass), sets 17101-17105 (one per domain), state `CISA`, prefix `CISA-`, 70% readiness line (Tigertest's; ISACA publishes no percent). 9/9/6/13/13 per test, exactly the 18/18/12/26/26 weights, no spares. Kept clear of the facts in `cissp`, `secplus`, `cysa` and `cpaaud`. US spelling. Built by `tools/next100/cisa/build.py`; sources in `tools/next100/cisa/sources.md`. Region GLOBAL, hub group "IT certifications", `[data-theme="cisa"]` muted slate violet (250 20% 32%), borrows the CISSP tiger.
```
