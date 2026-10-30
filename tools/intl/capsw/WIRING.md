# Wiring for `capsw` (Ontario Personal Support Worker, v1)

Files already written by the builder: `data/ontario-psw-questions.json` (200, PASS),
`lib/banks/capsw.ts`, `app/psw/*` (8 wrappers), `app/psw-practice-test/page.tsx`,
`tools/intl/capsw/*` (spec.json, sources.md, q_*.py, build.py). Everything below goes in shared files.

## lib/exams.ts

Add `"capsw"` to the `ExamId` union (with the other Canadian ids). Icon `heart` already exists in the icon union.

Block (with the other Canadian exams, before `const htl`):

```ts
const capsw: ExamConfig = {
  id: "capsw",
  stateCode: "CAPSW",
  idBase: 9100,
  slug: "/psw",
  landingPath: "/psw-practice-test",
  name: "PSW Practice Test",
  shortName: "PSW",
  examLabel: "PSW exam",
  fullName: "Ontario Personal Support Worker (PSW) final exam",
  questionIdPrefix: "CAPSW-",
  icon: "heart",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Ontario Personal Support Worker program standard, January 2022 (Ministry of Colleges and
  // Universities, code 41469; 14 vocational learning outcomes), used by colleges, career colleges
  // and school boards and by the NACC PSW final exam (checked October 2026). The 14 VLOs are
  // grouped into 8 categories (VLO numbers in the comments); neither the Ministry nor NACC
  // publishes exam weights, so counts are ours. Current Ontario law: Fixing Long-Term Care Act,
  // 2021 (replaced the LTCHA 2007 named in the standard), Retirement Homes Act, 2010, HCCA 1996,
  // PHIPA 2004, RHPA 1991, OHSA. 70% is a readiness line; NACC publishes no current pass mark.
  // All items original.
  blueprint: {
    capswRole: 7, // VLO 1 role and law, 2 accountability, 3 interprofessional team
    capswComm: 6, // VLO 5 therapeutic relationships and privacy, 6 observing and reporting
    capswRights: 7, // VLO 4 person-centred ethical care and consent, 12 abuse and neglect
    capswSafety: 8, // VLO 7 safety, infection control, emergencies
    capswAdl: 9, // VLO 8 activities of daily living, body systems, restorative care
    capswHome: 5, // VLO 9 medication, 10 household management, 11 clients who are caregivers
    capswPal: 4, // VLO 13 palliative and end-of-life care
    capswMental: 4, // VLO 14 mental health, cognitive impairment, responsive behaviours
  },
  trainingSets: testSets(9100, 4),
  categoryLabels: {
    capswRole: "PSW Role, Law & Teamwork",
    capswComm: "Communication, Observation & Reporting",
    capswRights: "Rights, Consent, Ethics & Abuse",
    capswSafety: "Safety, Infection Control & Emergencies",
    capswAdl: "Daily Living, Body Systems & Restorative Care",
    capswHome: "Medication, Home Management & Caregivers",
    capswPal: "Palliative & End-of-Life Care",
    capswMental: "Mental Health, Dementia & Responsive Behaviours",
  },
  copy: {
    guestPrompt: "to save your PSW exam progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all 14 program outcomes. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across all 14 PSW outcomes",
    heroSubs: [
      "Eight topics, four tests. Aim for 70% or better on each.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your PSW final exam.",
    ],
    sourceLine: "Based on Ontario's 2022 Personal Support Worker program standard and current Ontario law. Original questions; 70% is a readiness target, not an official pass mark.",
    analyticsKey: "capsw",
  },
};
```

Append `capsw` to the `EXAMS` array (with the Canadian exams, before `htl`).

## lib/banks/all.ts

```ts
import "./capsw";
```
`lib/banks/capsw.ts` is already written.

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/capsw.ts`.

## types/index.ts

- `QuestionType`: add `| "CAPSW"`.
- `QuestionCategory`, under a `// Ontario PSW (Canada)` comment:

```ts
  | "capswRole"
  | "capswComm"
  | "capswRights"
  | "capswSafety"
  | "capswAdl"
  | "capswHome"
  | "capswPal"
  | "capswMental"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    capswRole: "PSW Role, Law & Teamwork",
    capswComm: "Communication, Observation & Reporting",
    capswRights: "Rights, Consent, Ethics & Abuse",
    capswSafety: "Safety, Infection Control & Emergencies",
    capswAdl: "Daily Living, Body Systems & Restorative Care",
    capswHome: "Medication, Home Management & Caregivers",
    capswPal: "Palliative & End-of-Life Care",
    capswMental: "Mental Health, Dementia & Responsive Behaviours",
```

## app/globals.css

Light block only (hue 325, unused on this branch; ukcare took 315); then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Ontario PSW theme (Canada) */
  [data-theme="capsw"] {
    --brand: 325 52% 36%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 325 60% 96%;
    --brand-hover: 325 52% 30%;
    --brand-dark: 325 52% 25%;
    --brand-darker: 325 45% 17%;
    --brand-muted: 325 32% 72%;
    --brand-border: 325 32% 80%;
    --brand-border-light: 325 30% 89%;
    --brand-gradient-to: 345 60% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `capsw: "Practice for the Ontario Personal Support Worker final exam on the 2022 program standard: the PSW role and Ontario law, consent and residents' rights, abuse reporting, infection control, daily living, medication, palliative care and dementia.",`
- `EXAM_ORG`: `capsw: "Ontario PSW program standard · NACC and college finals",`
- Hub group: "Canada school and trade tests" (with `caauto`, `caplumb`, `cacarp`, `caweld`, `cawhmis`, `caguard`, `casfa`, `eqao9`, `rexpn`).
- `SEARCH_ALIASES`:
  `capsw: "psw personal support worker ontario nacc psw exam psw final exam psw certificate health care aide home support worker long term care ltc fltca hscpoa canada",`
- `RELATED_OVERRIDES` if the Canada group has fewer than three others: `capsw: ["rexpn", "casfa", "cna"]`.

## lib/region.ts

`capsw: "CA",` in `TEST_REGIONS`, and add `"capsw"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  capsw: {
    answer:
      "Ontario has no single government PSW licensing exam. Every Personal Support Worker program, at public colleges, private career colleges and district school boards, must meet the 14 vocational learning outcomes of the Ministry of Colleges and Universities PSW program standard released in January 2022, and students sit their program's final exams; career college students usually write the NACC final exam, an online theory test taken after both placements. PSWs are not a regulated health profession, but since 1 December 2024 the Health and Supportive Care Providers Oversight Authority (HSCPOA) has kept a public register of PSWs.",
    rows: [
      { label: "Program standard", value: "Ontario PSW standard, January 2022 (14 learning outcomes)" },
      { label: "Final exam", value: "Set by each program; NACC final for career colleges (online, theory)" },
      { label: "Pass mark", value: "Set by the program (70% here is a readiness line)" },
      { label: "NACC program length", value: "700 hours, including placements" },
      { label: "Key laws", value: "Fixing Long-Term Care Act 2021, Health Care Consent Act, PHIPA, RHPA" },
      { label: "Oversight", value: "HSCPOA public register since December 2024" },
      { label: "Where PSWs work", value: "Long-term care, retirement homes, home and community care, hospitals" },
    ],
    basedOn: "the Ontario Personal Support Worker program standard (Ministry of Colleges and Universities, January 2022)",
    source: { name: "Ontario.ca: College program standard, Personal Support Worker", url: "https://www.ontario.ca/page/college-program-standard-personal-support-worker" },
  },
```
(checked 2026-10-30)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave (includes the Ontario PSW landing).

## components/TeachNudge.tsx

Add `"capsw"` to `TEACHER_LED`.

## components/exam/ExamClassFaq.tsx

In `TEACHES` (healthcare section): `capsw: "a personal support worker program",`
(reads "I teach a personal support worker program. Can my students use Tigertest?")

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `heart` already exists.

## lib/tigerAssets.ts

Nothing required; it falls back to the DMV tiger. Optional: `capsw: "cna"` in the alias map if CNA art exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (writes `lib/trainingParts.json`).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing capsw:psw:9101`

## CLAUDE.md (under Additional Exams)

```md
- **Ontario PSW** (Personal Support Worker final exam, `/psw/*`, landing `/psw-practice-test`): `data/ontario-psw-questions.json` (200 questions on the 14 VLOs of the Ontario PSW program standard, January 2022, grouped: role/law/team 28, communication/reporting 24, rights/consent/ethics/abuse 28, safety/IPAC/emergencies 32, ADLs/body systems/restorative 36, medication/home/caregivers 20, palliative 16, mental health/dementia/responsive behaviours 16), test IDs 9101-9104, sets 9101-9104 (one per test), state `CAPSW`, 70% readiness line (programs and NACC set their own marks). 7/6/7/8/9/5/4/4 per test. Current Ontario law (FLTCA 2021, Retirement Homes Act, HCCA, PHIPA, RHPA, OHSA). Built by `tools/intl/capsw/build.py`.
```
