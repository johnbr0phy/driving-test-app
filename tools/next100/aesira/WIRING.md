# Wiring for `aesira` (UAE SIRA security guard licensing exam, Dubai, v1, region AE)

Files already written by the builder: `data/sira-security-questions.json` (200, PASS, key-longest 5%),
`lib/banks/aesira.ts`, `app/sira-security/*` (layout, redirect, dashboard, drill, stats, copied from
`app/llqp/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/sira-security-guard-practice-test/page.tsx`, `tools/next100/aesira/*` (spec, sources,
`q_*.py`, `build.py`, this file). Everything below goes in shared files.

Format note: SIRA publishes no question count, time, topic weights or pass mark for the individual
guard licence test. The 2026 executive regulation (Resolution No. (1) of 2026, Art. 11) only says
the applicant passes the theoretical and practical tests SIRA approves. Guides say about 60
multiple-choice questions in English or Arabic, pass mark commonly reported around 70%. Here: four
50-question mock tests with 70% as Tigertest's target (labelled so on the landing and in examFacts),
four content sets, so 4 sets + 4 tests = 8 dashboard steps. Pools are exactly 4x per-test counts.
Content sets, so sets first, then tests.

## lib/exams.ts

Add `"aesira"` to the `ExamId` union. Icon `badge` already exists (used by `security`).

```ts
const aesira: ExamConfig = {
  id: "aesira",
  stateCode: "AESIRA",
  idBase: 18500,
  slug: "/sira-security",
  landingPath: "/sira-security-guard-practice-test",
  name: "SIRA Security Guard Practice Test",
  shortName: "SIRA Guard",
  examLabel: "SIRA security guard exam",
  fullName: "Dubai SIRA security guard licensing exam",
  questionIdPrefix: "AESIRA-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // SIRA (Dubai) individual security licence, Law No. (12) of 2016 and its executive regulation,
  // Resolution No. (1) of 2026 (Official Gazette 783, 4 July 2026; replaces Resolution No. (1) of
  // 2018). SIRA publishes no topic weights, count or pass mark; guides report about 60 questions and
  // about 70%. Tigertest's blueprint over the basic guard course topics: law 6, role 6, access 8,
  // reports 7, legal limits 5, emergencies 7, fire 5, first aid 6. 70% is Tigertest's target.
  blueprint: {
    aesiraLaw: 6,
    aesiraRole: 6,
    aesiraAccess: 8,
    aesiraReports: 7,
    aesiraPowers: 5,
    aesiraEmergency: 7,
    aesiraFire: 5,
    aesiraFirstAid: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 18501, name: "SIRA Law & the Guard's Role", categories: ["aesiraLaw", "aesiraRole"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 2, id: 18502, name: "Access Control, Patrols & Reports", categories: ["aesiraAccess", "aesiraReports"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 3, id: 18503, name: "Legal Limits & Emergencies", categories: ["aesiraPowers", "aesiraEmergency"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 18504, name: "Fire Safety & First Aid", categories: ["aesiraFire", "aesiraFirstAid"], size: 44, weightLabel: "11 of 50 test questions" },
  ],
  categoryLabels: {
    aesiraLaw: "SIRA Law, Licences & Conduct",
    aesiraRole: "The Guard's Role & Professional Standards",
    aesiraAccess: "Access Control, Patrols & CCTV",
    aesiraReports: "Observation, Reports & Evidence",
    aesiraPowers: "Legal Limits, Arrest & Use of Force",
    aesiraEmergency: "Emergencies, Threats & Evacuation",
    aesiraFire: "Fire Safety",
    aesiraFirstAid: "First Aid, Heat & Health and Safety",
  },
  copy: {
    guestPrompt: "to save your SIRA guard progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets on the topics of the Dubai basic guard course: SIRA law and your role, access control and reports, legal limits and emergencies, fire safety and first aid. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across every topic, 70% target",
    heroSubs: [
      "Four topic sets, four mock tests.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your SIRA test.",
    ],
    sourceLine: "Based on Dubai Law No. (12) of 2016, its 2026 executive regulation and the topics of SIRA-accredited guard training. Original questions; 50 per test, 70% is Tigertest's target. Not affiliated with SIRA, Dubai Police or any training centre.",
    analyticsKey: "aesira",
  },
};
```

Append `aesira` to the `EXAMS` array after the last international batch 1 exam (or after `llqp`).

Check: 18501-18504 (tests and sets) must be free (the batch table assigns 18500).

## lib/banks/all.ts

```ts
import "./aesira";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/aesira.ts`.

## types/index.ts

- `QuestionType`: add `| "AESIRA"`.
- `QuestionCategory`, under a `// SIRA security guard (Dubai)` comment:

```ts
  | "aesiraLaw"
  | "aesiraRole"
  | "aesiraAccess"
  | "aesiraReports"
  | "aesiraPowers"
  | "aesiraEmergency"
  | "aesiraFire"
  | "aesiraFirstAid"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    aesiraLaw: "SIRA Law, Licences & Conduct",
    aesiraRole: "The Guard's Role & Professional Standards",
    aesiraAccess: "Access Control, Patrols & CCTV",
    aesiraReports: "Observation, Reports & Evidence",
    aesiraPowers: "Legal Limits, Arrest & Use of Force",
    aesiraEmergency: "Emergencies, Threats & Evacuation",
    aesiraFire: "Fire Safety",
    aesiraFirstAid: "First Aid, Heat & Health and Safety",
```

## app/globals.css

Hue from the international batch 1 table (220 55% 22%, already checked). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* SIRA security guard (Dubai) theme */
  [data-theme="aesira"] {
    --brand: 220 55% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 220 55% 96%;
    --brand-hover: 220 55% 17%;
    --brand-dark: 220 55% 16%;
    --brand-darker: 220 50% 10%;
    --brand-muted: 220 20% 70%;
    --brand-border: 220 20% 80%;
    --brand-border-light: 220 18% 89%;
    --brand-gradient-to: 225 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `aesira: "SIRA security guard licence practice for Dubai: SIRA law and licences, access control and patrols, reports and evidence, a guard's legal limits, emergencies, fire safety and first aid in the heat, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `aesira: "SIRA (Security Industry Regulatory Agency, Dubai) · individual guard licence",`
- Hub group (new, after "UAE driving tests"): `{ title: "UAE licensing exams", ids: ["aesira"] },`
- `SEARCH_ALIASES`:
  `aesira: "sira exam sira test sira security guard sira licence dubai security guard exam security guard test dubai sira questions security licence uae dubai guard card sira mock test sira training security industry regulatory agency dps security",`
- `RELATED_OVERRIDES`: `aesira: ["security", "caguard", "uksia"],` (a one-exam group needs padding).

## lib/region.ts

`aesira: "AE",` in `TEST_REGIONS`, and add `"aesira"` to `NON_DRIVING_TESTS`.

Country homepage `/ae` (REGION_HOME for AE) currently describes only the driving test; the
integrator may widen its description, e.g. "Free practice for the UAE driving theory test and the
Dubai SIRA security guard licence exam: original questions, every answer explained. No account
needed." (`regionHeadline()` builds the lead from the hub groups, so the new group shows by itself.)

## lib/examFacts.ts

```ts
  aesira: {
    answer:
      "In Dubai, anyone who works as a security guard needs an individual licence from the Security Industry Regulatory Agency (SIRA), under Law No. (12) of 2016. The executive regulation issued in June 2026 requires the applicant to be at least 18, hold valid UAE residence if not a UAE national, know the basics of Arabic or English, be of good conduct, and pass the theoretical and practical tests SIRA approves, usually after a basic course at a SIRA-accredited training centre. SIRA does not publish the written test's length or pass mark; guides say about 60 multiple-choice questions in English or Arabic, with about 70% commonly reported as the pass mark. The licence lasts two years.",
    rows: [
      { label: "Questions", value: "Not published; about 60 multiple choice (guides say)" },
      { label: "Pass mark", value: "Not published; about 70% (guides say); 70% is Tigertest's target" },
      { label: "Languages", value: "English or Arabic (guides say)" },
      { label: "Before the test", value: "Basic course at a SIRA-accredited training centre" },
      { label: "Minimum age", value: "18" },
      { label: "Licence", value: "Valid two years; renew at least 30 days before expiry" },
      { label: "Run by", value: "SIRA, Dubai" },
    ],
    basedOn: "Dubai Law No. (12) of 2016 and its executive regulation, Resolution No. (1) of 2026 (Official Gazette, 4 July 2026), checked November 2026; test length and pass mark from guides",
    source: { name: "Dubai Legislation Portal: Law No. (12) of 2016", url: "https://dlp.dubai.gov.ae/Legislation%20Reference/2016/Law%20No.%20(12)%20of%202016.html" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Guards take the written test after a course at a SIRA-accredited training centre, so it is
teacher-led like `security`, `uksia` and `caguard`:
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"aesira"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `aesira: "a SIRA basic security guard course",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `aesira: "security",` (borrow the security guard tiger).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, no redirects, the `badge` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 60, set 2).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing aesira:sira-security:18501`

## CLAUDE.md (under Additional Exams, after the LLQP bullet or with the other international batch 1 exams)

```md
- **SIRA Security Guard** (Dubai SIRA individual security licence written test, `/sira-security/*`, landing `/sira-security-guard-practice-test`): `data/sira-security-questions.json` (200 original questions: SIRA law, licences and conduct 24, the guard's role and standards 24, access control, patrols and CCTV 32, observation, reports and evidence 28, legal limits, arrest and use of force 20, emergencies, threats and evacuation 28, fire safety 20, first aid, heat and health and safety 24), test IDs 18501-18504, sets 18501-18504 (content sets: law and role 48, access and reports 60, legal limits and emergencies 48, fire and first aid 44), state `AESIRA`, prefix `AESIRA-`, 70% Tigertest's target (SIRA publishes no count or pass mark; guides say about 60 questions in English or Arabic and about 70%). 6/6/8/7/5/7/5/6 per test. Law items follow Dubai Law No. (12) of 2016 and its executive regulation Resolution No. (1) of 2026 (Official Gazette 783, 4 July 2026, replacing Resolution No. (1) of 2018): licence at 18, valid UAE residence, basics of Arabic or English, two-year licence renewed 30 days before expiry, 90-day temporary licence, incident report to SIRA within 24 hours, records five years; no fines. Guards have no police powers: consent searches, necessary force only, hand offenders to police. 999/998/997. Kept clear of `security`, `caguard` and `uksia`. Built by `tools/next100/aesira/build.py`; sources in `tools/next100/aesira/sources.md`. Region AE, hub group "UAE licensing exams", `[data-theme="aesira"]` deep navy (220 55% 22%), borrows the security guard tiger, teacher-led (SIRA-accredited training centres).
```
