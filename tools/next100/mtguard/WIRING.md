# Wiring for `mtguard` (Malta private guard licence, Award in Private Security Guard Services, v1, region MT)

Files already written by the builder: `data/malta-private-guard-questions.json` (200, PASS,
key-longest 22%, key over 1.2x 20%), `lib/banks/mtguard.ts`, `app/malta-private-guard/*` (layout,
redirect, dashboard, drill, stats, copied from `app/psa-security-licence/`; no test or practice
folders, the shared `app/[slug]` routes serve them), `app/malta-private-guard-licence-practice-test/page.tsx`,
`tools/next100/mtguard/*` (spec, sources, `q_*.py`, `build.py`, this file). Everything below goes in
shared files.

Format note: Jobsplus's course sheet (June 2025) describes the Award in Private Security Guard
Services (MFHEA MQF Level 2, 4 ECTS) as 40 hours in two 20-hour modules, each ending with a 1-hour
written assessment in three sections (true or false, multiple choice, short answers) with a 45% pass
mark. The Commissioner of Police licenses private guards under the Private Guards and Community
Officers Act (Cap. 389, formerly the Private Guards and Local Wardens Act) and approves the courses
(art. 23; S.L. 389.01 reg. 5). Providers write their own papers, so no count exists: four 50-question
mock tests (26 Module 1 + 24 Module 2 each) with 70% as Tigertest's readiness line. True or false
items are written as four-option items; short answers are not modelled. The police's own Private
Guard Licence page (pulizija.gov.mt) returned 403 and was not read. Four content sets, two per
module (8 dashboard steps), sets first, then tests.

## lib/exams.ts

Add `"mtguard"` to the `ExamId` union. Icon `badge` already exists.

```ts
const mtguard: ExamConfig = {
  id: "mtguard",
  stateCode: "MTGUARD",
  idBase: 26100,
  slug: "/malta-private-guard",
  landingPath: "/malta-private-guard-licence-practice-test",
  name: "Malta Private Guard Practice Test",
  shortName: "Malta private guard exam",
  examLabel: "Award in Private Security Guard Services assessment",
  fullName: "Malta Private Guard Licence Exam (Award in Private Security Guard Services)",
  questionIdPrefix: "MTPG-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Malta: Jobsplus Award in Private Security Guard Services (MQF Level 2, 4 ECTS, course sheet June
  // 2025), the approved course behind a private guard licence from the Commissioner of Police
  // (Cap. 389; S.L. 389.01). Two 20-hour modules, each a 1-hour paper (true or false, multiple
  // choice, short answers) passing at 45%; providers write the papers, no official count or
  // weights. Tigertest's blueprint: Module 1 law 6, powers 8, duties 6, people 6 (26); Module 2
  // risk 6, surveillance 6, fire 6, incidents 6 (24). 70% is Tigertest's readiness line.
  blueprint: {
    mtguardLaw: 6,
    mtguardPowers: 8,
    mtguardDuties: 6,
    mtguardPeople: 6,
    mtguardRisk: 6,
    mtguardSurveillance: 6,
    mtguardFire: 6,
    mtguardIncidents: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 26101, name: "Module 1: Licensing, Law & Powers", categories: ["mtguardLaw", "mtguardPowers"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 2, id: 26102, name: "Module 1: Duties & People Skills", categories: ["mtguardDuties", "mtguardPeople"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 26103, name: "Module 2: Risk, Patrols & Surveillance", categories: ["mtguardRisk", "mtguardSurveillance"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 26104, name: "Module 2: Fire, Floods, Threats & Reports", categories: ["mtguardFire", "mtguardIncidents"], size: 48, weightLabel: "12 of 50 test questions" },
  ],
  categoryLabels: {
    mtguardLaw: "Private Guard Licensing & Cap. 389",
    mtguardPowers: "Arrest, Force & Search Powers",
    mtguardDuties: "Duties, Legal Terms & Compliance",
    mtguardPeople: "Communication, Conflict & Customer Care",
    mtguardRisk: "Security Risk & Patrols",
    mtguardSurveillance: "CCTV, Alarms, Access & Searches",
    mtguardFire: "Fire Classes, Fire & Flood Drills",
    mtguardIncidents: "Bomb Threats, Investigations & Reports",
  },
  copy: {
    guestPrompt: "to save your private guard course progress and track every question you miss",
    trainingHeading: "Train module by module",
    trainingSub: "Four sets, two for each module of the Award in Private Security Guard Services: licensing, law and powers, duties and people skills, risk, patrols and surveillance, and fire, floods, bomb threats and reports. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across both modules, 70% target",
    heroSubs: [
      "Four module sets, four mock tests.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Ready for your assessments.",
    ],
    sourceLine: "Based on the Jobsplus Award in Private Security Guard Services outcomes, the Private Guards and Community Officers Act (Cap. 389), the Private Guards Regulations and the Criminal Code. Original questions; 50 per test, 70% is Tigertest's target (each real module passes at 45%). Not affiliated with the Malta Police Force, Jobsplus or any training provider.",
    analyticsKey: "mtguard",
  },
};
```

Append `mtguard` to the `EXAMS` array after `mttaxi` (or after `mttheory` if mttaxi does not ship).

Check: 26101-26104 (tests and sets) must be free (the batch table assigns 26100; mttaxi holds
26001-26005).

## lib/banks/all.ts

```ts
import "./mtguard";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/mtguard.ts`.

## types/index.ts

- `QuestionType`: add `| "MTGUARD"`.
- `QuestionCategory`, under a `// Malta private guard licence` comment:

```ts
  | "mtguardLaw"
  | "mtguardPowers"
  | "mtguardDuties"
  | "mtguardPeople"
  | "mtguardRisk"
  | "mtguardSurveillance"
  | "mtguardFire"
  | "mtguardIncidents"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; other languages fall back)

```ts
    mtguardLaw: "Private Guard Licensing & Cap. 389",
    mtguardPowers: "Arrest, Force & Search Powers",
    mtguardDuties: "Duties, Legal Terms & Compliance",
    mtguardPeople: "Communication, Conflict & Customer Care",
    mtguardRisk: "Security Risk & Patrols",
    mtguardSurveillance: "CCTV, Alarms, Access & Searches",
    mtguardFire: "Fire Classes, Fire & Flood Drills",
    mtguardIncidents: "Bomb Threats, Investigations & Reports",
```

## app/globals.css

The suggested hue (230 40% 28%) clashes with `psat` (230 50% 28%) and `awssaa` (235 30% 32%).
Checked against every `[data-theme]` `--brand` and `mttaxi`: 244 60% 26% is free (nearest: zasaps
230 55% 18% is 14 degrees away; sfadmin 238 80% 28% differs by 20 saturation points) and white text
passes 4.5:1. Integrator settles against the other Malta siblings. Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Malta private guard licence (Award in Private Security Guard Services) theme */
  [data-theme="mtguard"] {
    --brand: 244 60% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 244 60% 96%;
    --brand-hover: 244 60% 21%;
    --brand-dark: 244 60% 20%;
    --brand-darker: 244 55% 13%;
    --brand-muted: 244 25% 70%;
    --brand-border: 244 25% 80%;
    --brand-border-light: 244 22% 89%;
    --brand-gradient-to: 249 65% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `mtguard: "Practice for the Award in Private Security Guard Services, the approved course behind a private guard licence from the Commissioner of Police in Malta: Cap. 389 and the Private Guards Regulations, arrest and minimum force, communication and conflict, patrols, CCTV and alarms, fire classes, fire and flood drills, bomb threats and reports, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `mtguard: "Commissioner of Police (Malta) · Award in Private Security Guard Services, MQF Level 2",`
- Hub group (new, shared with `mttaxi`, placed right after "EU driving theory tests", the group that
  holds Malta's driving test; mttaxi's WIRING.md names the same group):
  `{ title: "Malta licences and workplace certificates", ids: ["mttaxi", "mtguard"] },`
- `SEARCH_ALIASES` (English and Maltese):
  `mtguard: "malta private guard licence malta private guard license private guard licence malta security guard malta security guard licence malta security guard course malta award in private security guard services private security guard services course jobsplus security guard course cap 389 private guards and community officers act private guards and local wardens act commissioner of police private guard licence gwardjan privat gwardjani privati licenzja ta gwardjan privat liċenzja gwardjan privat gwardja tas-sigurta gwardja tas-sigurtà kors gwardjan privat",`
- `RELATED_OVERRIDES` (the Malta group has only one other member):
  `mtguard: ["mttaxi", "iepsa", "uksia"],`

## lib/region.ts

`mtguard: "MT",` in `TEST_REGIONS`, and add `"mtguard"` to `NON_DRIVING_TESTS`.

Country homepage `/mt` (`REGION_HOME.MT`) describes the driving theory test; once the Malta batch
ships the integrator may widen it, e.g. description "Free practice for Malta: the Transport Malta
theory test, the taxi driver theory test and the private guard licence course. No account needed."
(`regionHeadline()` builds the lead from the hub groups.)

## lib/examFacts.ts

```ts
  mtguard: {
    answer:
      "In Malta no one may act as a private guard, and no agency may provide one, without a licence from the Commissioner of Police under the Private Guards and Community Officers Act (Cap. 389). Under the Private Guards Regulations an applicant shows a certificate from a training course the Commissioner has approved, such as the Award in Private Security Guard Services, unless he has served with the police, the armed forces or the prison services. Jobsplus describes that course as 40 hours in two 20-hour modules, each ending with a 1-hour written paper of true or false, multiple choice and short answer questions, with a 45% pass mark. Training providers write their own papers, so there is no fixed question count. 70% is Tigertest's readiness line for these mock tests.",
    rows: [
      { label: "Course", value: "Award in Private Security Guard Services (MQF Level 2, 4 ECTS)" },
      { label: "Modules", value: "Two of 20 hours: legislation and occupational skills; security risk and practices" },
      { label: "Assessment", value: "1-hour paper per module: true or false, multiple choice, short answers" },
      { label: "Pass mark", value: "45% per module (70% is Tigertest's target)" },
      { label: "Questions", value: "Set by the training provider; not published" },
      { label: "Entry", value: "Age 18 to 65, MQF Level 2 maths and English, clean conduct certificate (Jobsplus)" },
      { label: "Licence", value: "Private guard licence from the Commissioner of Police (Cap. 389)" },
    ],
    basedOn: "Jobsplus course sheet (June 2025), Cap. 389 and S.L. 389.01, checked November 2026",
    source: { name: "Jobsplus: Award in Private Security Guard Services", url: "https://jobsplus.gov.mt/media/jysd0buh/award-in-private-security-guard-services.pdf" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Learners sit the assessments at the end of a course with Jobsplus or a police-approved training
provider, so it is teacher-led like `iepsa`, `aesira` and `zapsira`:
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"mtguard"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `mtguard: "an Award in Private Security Guard Services course",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `mtguard: "security",` (borrow the security guard tiger).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, no redirects, the `badge` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 56, set 1).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing mtguard:malta-private-guard:26101`

## CLAUDE.md (under Additional Exams, after `mttaxi`)

```md
- **Malta Private Guard** (`mtguard`, the assessments of the Award in Private Security Guard Services, the Jobsplus or police-approved course (MFHEA MQF Level 2, 4 ECTS) behind a private guard licence from the Commissioner of Police under the Private Guards and Community Officers Act (Cap. 389, formerly the Private Guards and Local Wardens Act), `/malta-private-guard/*`, landing `/malta-private-guard-licence-practice-test`): `data/malta-private-guard-questions.json` (200 original questions on the course's two modules: Module 1 as licensing and Cap. 389 24, arrest, force and search powers 32, duties, legal terms and compliance 24, communication, conflict and customer care 24; Module 2 as security risk and patrols 24, CCTV, alarms, access and searches 24, fire classes, fire and flood drills 24, bomb threats, investigations and reports 24), test IDs 26101-26104, sets 26101-26104 (two content sets per module: licensing, law and powers 56, duties and people 48, risk, patrols and surveillance 48, fire, floods, threats and reports 48), state `MTGUARD`, prefix `MTPG-`, 70% Tigertest's target (Jobsplus course sheet, June 2025: 40 hours in two 20-hour modules, each a 1-hour paper of true or false, multiple choice and short answers, 45% to pass; providers write the papers, no count published; true or false written as four-option items, short answers not modelled; pulizija.gov.mt returned 403 when built). 6/8/6/6/6/6/6/6 per test. Law from Cap. 389 (arts. 2 to 5, 6, 10 to 13, 12A and 12B powers of place-of-entertainment and specialised guards with minimum force, 21, 23, 25(d)), the Private Guards Regulations S.L. 389.01 (licence categories, five years for place-of-entertainment and specialised licences, ten hours of continuing training for renewal, identity card and uniform, cash in transit) and the Criminal Code (art. 355W arrest by a private person for listed crimes in the act or just committed, inform the Police without delay; 355AB; 355AC; 86; 223 and 224); Cap. 424 art. 7; GDPR via Cap. 586; 112. No fees, fines or insurance sums. Kept clear of `iepsa`, `uksia`, `security`, `caguard`, `aesira`, `zapsira` and `mttaxi`. Built by `tools/next100/mtguard/build.py`; sources in `tools/next100/mtguard/sources.md`. Region MT, hub group "Malta licences and workplace certificates", `[data-theme="mtguard"]` deep indigo (244 60% 26%), borrows the security guard tiger, teacher-led (Jobsplus and police-approved training providers).
```
