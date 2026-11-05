# Wiring for `zapsira` (PSIRA security officer grade assessment, Grades E to C, v1, region ZA)

Files already written by the builder: `data/psira-security-questions.json` (200, PASS, key-longest 20%),
`lib/banks/zapsira.ts`, `app/psira-security/*` (layout, redirect, dashboard, drill, stats, copied from
`app/sira-security/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/psira-security-officer-practice-test/page.tsx`, `tools/next100/zapsira/*` (spec, sources,
`q_*.py`, `build.py`, this file). Everything below goes in shared files.

Format note: PSIRA-accredited training centres run the Grade E, D and C courses and set their
assessments. psira.co.za could not be loaded when this was built (TLS chain error, then HTTP 503) and
web search was exhausted, so no official count, time or pass mark is used. Four 50-question mock
tests, 70% as Tigertest's target (labelled so on the landing and in examFacts). Four content sets
grouped by grade (Tigertest's own mapping of the course topics), so 4 sets + 4 tests = 8 dashboard
steps; sets first, then tests. Pools are exactly 4x per-test counts.

## lib/exams.ts

Add `"zapsira"` to the `ExamId` union. Icon `badge` already exists.

```ts
const zapsira: ExamConfig = {
  id: "zapsira",
  stateCode: "ZAPSIRA",
  idBase: 20800,
  slug: "/psira-security",
  landingPath: "/psira-security-officer-practice-test",
  name: "PSIRA Security Officer Practice Test",
  shortName: "PSIRA Grades E-C",
  examLabel: "PSIRA grade assessment",
  fullName: "PSIRA security officer grade assessment (Grades E to C)",
  questionIdPrefix: "ZAPSIRA-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // South Africa: Private Security Industry Regulation Act 56 of 2001 (ss. 20, 23, 25, 28),
  // Criminal Procedure Act 51 of 1977 (ss. 23, 42, 48, 49, 50), Occupational Health and Safety Act
  // 85 of 1993 (ss. 8, 14, 15, 17). Training centres set the Grade E to C assessments; no official
  // weights, count or pass mark were found. Tigertest's blueprint over the course topics:
  // law 6, role 6, powers 7, access 7, patrols 6, reports 6, emergencies 7, OHS 5. 70% is
  // Tigertest's target.
  blueprint: {
    zapsiraLaw: 6,
    zapsiraRole: 6,
    zapsiraPowers: 7,
    zapsiraAccess: 7,
    zapsiraPatrol: 6,
    zapsiraReports: 6,
    zapsiraEmergency: 7,
    zapsiraSafety: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 20801, name: "Grade E: PSIRA, Conduct & Your Role", categories: ["zapsiraLaw", "zapsiraRole"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 2, id: 20802, name: "Grade E: Legal Powers & Access Control", categories: ["zapsiraPowers", "zapsiraAccess"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 3, id: 20803, name: "Grade D: Patrols, Radio & Reports", categories: ["zapsiraPatrol", "zapsiraReports"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 20804, name: "Grade C: First Response & Safety", categories: ["zapsiraEmergency", "zapsiraSafety"], size: 48, weightLabel: "12 of 50 test questions" },
  ],
  categoryLabels: {
    zapsiraLaw: "PSIRA, the Act & the Code of Conduct",
    zapsiraRole: "The Security Officer's Role & Conduct",
    zapsiraPowers: "Legal Powers: Arrest, Search & Force",
    zapsiraAccess: "Access Control & Searching",
    zapsiraPatrol: "Patrols, Observation & Radio",
    zapsiraReports: "Occurrence Books, Reports & Evidence",
    zapsiraEmergency: "First Response, Fire & First Aid",
    zapsiraSafety: "Occupational Health & Safety",
  },
  copy: {
    guestPrompt: "to save your PSIRA progress and track every question you miss",
    trainingHeading: "Train grade by grade",
    trainingSub: "Four sets on the Grade E to C course topics: the PSIRA Act and your role, legal powers and access control, patrols, radio and reports, and first response and safety. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across every topic, 70% target",
    heroSubs: [
      "Four grade sets, four mock tests.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Ready for your assessment.",
    ],
    sourceLine: "Based on the Private Security Industry Regulation Act 56 of 2001, the Criminal Procedure Act and the OHS Act. Original questions; 50 per test, 70% is Tigertest's target. Not affiliated with PSIRA, SAPS or any training centre.",
    analyticsKey: "zapsira",
  },
};
```

Append `zapsira` to the `EXAMS` array after the other international batch 3 exams (after `zasaps`).

Check: 20801-20804 (tests and sets) must be free (the batch table assigns 20800).

## lib/banks/all.ts

```ts
import "./zapsira";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/zapsira.ts`.

## types/index.ts

- `QuestionType`: add `| "ZAPSIRA"`.
- `QuestionCategory`, under a `// PSIRA security officer (South Africa)` comment:

```ts
  | "zapsiraLaw"
  | "zapsiraRole"
  | "zapsiraPowers"
  | "zapsiraAccess"
  | "zapsiraPatrol"
  | "zapsiraReports"
  | "zapsiraEmergency"
  | "zapsiraSafety"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    zapsiraLaw: "PSIRA, the Act & the Code of Conduct",
    zapsiraRole: "The Security Officer's Role & Conduct",
    zapsiraPowers: "Legal Powers: Arrest, Search & Force",
    zapsiraAccess: "Access Control & Searching",
    zapsiraPatrol: "Patrols, Observation & Radio",
    zapsiraReports: "Occurrence Books, Reports & Evidence",
    zapsiraEmergency: "First Response, Fire & First Aid",
    zapsiraSafety: "Occupational Health & Safety",
```

## app/globals.css

Hue from the international batch 3 table (270 55% 22%, already checked). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* PSIRA security officer (South Africa) theme */
  [data-theme="zapsira"] {
    --brand: 270 55% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 270 55% 96%;
    --brand-hover: 270 55% 17%;
    --brand-dark: 270 55% 16%;
    --brand-darker: 270 50% 10%;
    --brand-muted: 270 20% 70%;
    --brand-border: 270 20% 80%;
    --brand-border-light: 270 18% 89%;
    --brand-gradient-to: 275 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `zapsira: "PSIRA security officer practice for South Africa's Grade E, D and C courses: the PSIRA Act and code of conduct, arrest and use of force, access control, patrols and radio, occurrence books and crime scenes, first response, fire, first aid and OHS, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `zapsira: "PSIRA (Private Security Industry Regulatory Authority) · security officer grades E to C",`
- Hub group (new, after "South Africa driving tests", or after "South Africa financial services licensing exams" if zare5 ships), shared with zasaps (its WIRING.md has the same line):
  `{ title: "South Africa police and security tests", ids: ["zasaps", "zapsira"] },`
- `SEARCH_ALIASES`:
  `zapsira: "psira psira exam psira test psira grade e grade d grade c psira questions and answers security officer exam south africa security guard test south africa psira training psira course psira registration security grade e test private security industry regulatory authority",`
- `RELATED_OVERRIDES` (the group has two members): `zapsira: ["zasaps", "aesira", "security"],`

## lib/region.ts

`zapsira: "ZA",` in `TEST_REGIONS`, and add `"zapsira"` to `NON_DRIVING_TESTS`.

Country homepage `/za` (REGION_HOME for ZA) describes only the K53 tests; the integrator may widen
its description, e.g. "Free practice for South Africa's K53 learner's licence tests, the SAPS
recruitment assessment and the PSIRA security officer grades: original questions, every answer
explained. No account needed." (`regionHeadline()` builds the lead from the hub groups.)

## lib/examFacts.ts

```ts
  zapsira: {
    answer:
      "In South Africa, nobody may work as a security officer for pay without registering with the Private Security Industry Regulatory Authority (PSIRA), under section 20 of the Private Security Industry Regulation Act 56 of 2001. Section 23 requires an applicant to be a fit and proper person, a South African citizen or permanent resident, at least 18 and mentally sound, to have met the prescribed training requirements, and to have no conviction for an offence listed in the Act's Schedule (within 10 years before applying in the Act as published; the Amendment Act 18 of 2014 drops that limit once in operation). Security officer training is done in grades at PSIRA-accredited training centres, and each course ends in an assessment the centre sets. No official question count or pass mark was found; 70% is Tigertest's target.",
    rows: [
      { label: "Questions", value: "Set by the training centre; not published by PSIRA" },
      { label: "Pass mark", value: "Not published; 70% is Tigertest's target" },
      { label: "Grades covered", value: "E, D and C (Tigertest's grouping of the course topics)" },
      { label: "Before registering", value: "Prescribed training at a PSIRA-accredited centre" },
      { label: "Minimum age", value: "18" },
      { label: "Citizenship", value: "South African citizen or permanent resident" },
      { label: "Run by", value: "PSIRA-accredited training centres; registration by PSIRA" },
    ],
    basedOn: "Private Security Industry Regulation Act 56 of 2001, ss. 20 and 23 (Government Gazette 23051), checked November 2026; assessment format not confirmed",
    source: { name: "South African Government: Private Security Industry Regulation Act", url: "https://www.gov.za/documents/private-security-industry-regulation-act" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Officers take the grade assessments after a course at a PSIRA-accredited training centre, so it is
teacher-led like `aesira`, `security` and `caguard`:
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"zapsira"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `zapsira: "a PSIRA Grade E, D or C security officer course",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `zapsira: "security",` (borrow the security guard tiger).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, no redirects, the `badge` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 56, set 2).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing zapsira:psira-security:20801`

## CLAUDE.md (under Additional Exams, after the zasaps bullet)

```md
- **PSIRA Security Officer** (`zapsira`, South Africa's PSIRA security officer grade assessments, Grades E to C, `/psira-security/*`, landing `/psira-security-officer-practice-test`): `data/psira-security-questions.json` (200 original questions: PSIRA, the Act and the code of conduct 24, the officer's role and conduct 24, legal powers (arrest, search, force) 28, access control and searching 28, patrols, observation and radio 24, occurrence books, reports and evidence 24, first response, fire and first aid 28, OHS 20), test IDs 20801-20804, sets 20801-20804 (content sets grouped by grade, Tigertest's mapping: Grade E law and role 48, Grade E powers and access 56, Grade D patrols and reports 48, Grade C emergencies and OHS 48), state `ZAPSIRA`, prefix `ZAPSIRA-`, 70% Tigertest's target (training centres set the assessments; no official count or pass mark found, and psira.co.za could not be read when built). 6/6/7/7/6/6/7/5 per test. Law from the Private Security Industry Regulation Act 56 of 2001 as published (ss. 2, 3, 20, 21, 23, 25, 28, 43, Schedule; the 2014 Amendment Act's changes avoided), the Criminal Procedure Act 51 of 1977 (ss. 23, 42, 48, 49, 50, Schedule 1: a security officer arrests as a private person; force reasonably necessary and proportional) and the OHS Act 85 of 1993 (ss. 8, 14, 15, 17). 10111/10177/112. No firearm content. Kept clear of `security`, `caguard`, `aesira` and `zasaps`. Built by `tools/next100/zapsira/build.py`; sources in `tools/next100/zapsira/sources.md`. Region ZA, hub group "South Africa police and security tests" (with zasaps), `[data-theme="zapsira"]` deep violet (270 55% 22%), borrows the security guard tiger, teacher-led (PSIRA-accredited training centres).
```
