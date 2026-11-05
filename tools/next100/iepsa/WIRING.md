# Wiring for `iepsa` (QQI Level 4 Security Guarding Skills for the PSA licence, Ireland, v1, region IE)

Files already written by the builder: `data/ie-psa-security-questions.json` (200, PASS, key-longest 20%),
`lib/banks/iepsa.ts`, `app/psa-security-licence/*` (layout, redirect, dashboard, drill, stats, copied from
`app/psira-security/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/psa-security-guard-practice-test/page.tsx`, `tools/next100/iepsa/*` (spec, sources, `q_*.py`,
`build.py`, this file). Everything below goes in shared files.

Format note: the Private Security (Licensing and Qualifications) Regulations 2022 (S.I. 574/2022, as
amended by S.I. 204/2024) require QQI Level 4 minor award 4N20604 Security Guarding Skills, or an
equivalent, for a security guard (guarding) licence. QQI's component specification sets a theory
examination (50%) and a skills demonstration (50%), each of which must be passed, graded Pass 50-64%,
Merit 65-79%, Distinction 80-100%; the training provider writes the paper. No question count or time
is published, so four 50-question mock tests model the theory exam, with 70% as Tigertest's target.
psa.gov.ie could not be read (503, then an expired TLS certificate); the regulations were read on the
Irish Statute Book and the award on QQI's QSearch. The brief named "Guarding Skills and Security
Industry Awareness components": those are the older awards; 4N20604 is the current one (since
1 November 2022). Four content sets (8 dashboard steps), sets first, then tests.

## lib/exams.ts

Add `"iepsa"` to the `ExamId` union. Icon `badge` already exists.

```ts
const iepsa: ExamConfig = {
  id: "iepsa",
  stateCode: "IEPSA",
  idBase: 21200,
  slug: "/psa-security-licence",
  landingPath: "/psa-security-guard-practice-test",
  name: "PSA Security Guard Practice Test",
  shortName: "QQI Security Guarding",
  examLabel: "QQI Security Guarding exam",
  fullName: "QQI Level 4 Security Guarding Skills (4N20604) for the PSA security guard licence",
  questionIdPrefix: "IEPSA-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Ireland: QQI component specification 4N20604 Security Guarding Skills (Level 4, units 1 Private
  // Security Sector and 2 Security Guarding Skills), required for the PSA security guard (guarding)
  // licence by S.I. 574/2022 as amended by S.I. 204/2024. The provider sets the theory exam (50% of
  // the award; Pass from 50%); no official count or weights. Tigertest's blueprint over the learning
  // outcomes: law 6, role 6, powers 8, access 6, patrols 6, reports 6, emergencies 6, events and
  // retail 6. 70% is Tigertest's target.
  blueprint: {
    iepsaLaw: 6,
    iepsaRole: 6,
    iepsaPowers: 8,
    iepsaAccess: 6,
    iepsaPatrol: 6,
    iepsaReports: 6,
    iepsaEmergency: 6,
    iepsaEvents: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 21201, name: "The Sector, the PSA & Your Role", categories: ["iepsaLaw", "iepsaRole"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 2, id: 21202, name: "The Law: Arrest, Force & Access Control", categories: ["iepsaPowers", "iepsaAccess"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 3, id: 21203, name: "Patrols, Reports & Court", categories: ["iepsaPatrol", "iepsaReports"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 21204, name: "Emergencies, Events & Retail", categories: ["iepsaEmergency", "iepsaEvents"], size: 48, weightLabel: "12 of 50 test questions" },
  ],
  categoryLabels: {
    iepsaLaw: "PSA Licensing & the Security Sector",
    iepsaRole: "Role, Conduct & Customer Care",
    iepsaPowers: "Arrest, Force, Search & Trespass",
    iepsaAccess: "Access Control, Keys & Confidentiality",
    iepsaPatrol: "Patrols, Alarms & Radio",
    iepsaReports: "Reports, Evidence & Court",
    iepsaEmergency: "Emergencies, Fire & First Response",
    iepsaEvents: "Events, Crowds & Retail Security",
  },
  copy: {
    guestPrompt: "to save your Security Guarding progress and track every question you miss",
    trainingHeading: "Train unit by unit",
    trainingSub: "Four sets on the QQI 4N20604 course: the sector, the PSA and your role, arrest, force and access control, patrols, reports and court, and emergencies, events and retail. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across every topic, 70% target",
    heroSubs: [
      "Four topic sets, four mock tests.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Ready for your exam.",
    ],
    sourceLine: "Based on the QQI 4N20604 Security Guarding Skills learning outcomes, the Private Security Services Act 2004 and the Criminal Law Act 1997. Original questions; 50 per test, 70% is Tigertest's target. Not affiliated with the PSA, QQI or any training provider.",
    analyticsKey: "iepsa",
  },
};
```

Append `iepsa` to the `EXAMS` array after the other international batch 4 exams (after `ieqfa` if it
ships, else after `iedttcv` or the last batch 3 exam).

Check: 21201-21204 (tests and sets) must be free (the batch table assigns 21200).

## lib/banks/all.ts

```ts
import "./iepsa";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/iepsa.ts`.

## types/index.ts

- `QuestionType`: add `| "IEPSA"`.
- `QuestionCategory`, under a `// PSA security guard (Ireland)` comment:

```ts
  | "iepsaLaw"
  | "iepsaRole"
  | "iepsaPowers"
  | "iepsaAccess"
  | "iepsaPatrol"
  | "iepsaReports"
  | "iepsaEmergency"
  | "iepsaEvents"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    iepsaLaw: "PSA Licensing & the Security Sector",
    iepsaRole: "Role, Conduct & Customer Care",
    iepsaPowers: "Arrest, Force, Search & Trespass",
    iepsaAccess: "Access Control, Keys & Confidentiality",
    iepsaPatrol: "Patrols, Alarms & Radio",
    iepsaReports: "Reports, Evidence & Court",
    iepsaEmergency: "Emergencies, Fire & First Response",
    iepsaEvents: "Events, Crowds & Retail Security",
```

## app/globals.css

Hue from the international batch 4 table (245 30% 22%, already checked; no theme within 8 degrees
is closer than 15 saturation or 8 lightness points). Then run `tools/gen_dark_brand_css.py`.

```css
  /* PSA security guard, QQI Level 4 Security Guarding (Ireland) theme */
  [data-theme="iepsa"] {
    --brand: 245 30% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 245 30% 96%;
    --brand-hover: 245 30% 17%;
    --brand-dark: 245 30% 16%;
    --brand-darker: 245 28% 10%;
    --brand-muted: 245 15% 70%;
    --brand-border: 245 15% 80%;
    --brand-border-light: 245 14% 89%;
    --brand-gradient-to: 250 40% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `iepsa: "Practice for the theory exam of QQI Level 4 Security Guarding Skills (4N20604), the qualification for a PSA security guard licence in Ireland: the Private Security Services Act and licence rules, arrest and reasonable force, access control, patrols, reports and court, fire and emergencies, events and retail, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `iepsa: "QQI 4N20604 · Private Security Authority security guard (guarding) licence",`
- Hub group (new, placed right after "Ireland driving tests"), shared with the other Irish batch 4
  exams (each of their WIRING.md files names the same group; include whichever ship):
  `{ title: "Ireland licences and workplace certificates", ids: ["iesafepass", "iespsv", "ieqfa", "iepsa"] },`
- `SEARCH_ALIASES`:
  `iepsa: "psa psa licence psa license psa licence exam psa security licence ireland security guard licence ireland qqi security qqi level 4 security guarding 4n20604 security guarding skills security guard course ireland security guard exam ireland static guard licence private security authority",`
- `RELATED_OVERRIDES` (only if the Ireland group ends up with fewer than three other members):
  `iepsa: ["iesafepass", "uksia", "security"],`

## lib/region.ts

`iepsa: "IE",` in `TEST_REGIONS`, and add `"iepsa"` to `NON_DRIVING_TESTS`.

Country homepage `/ie` (`REGION_HOME.IE`) describes only the driver theory tests; once the batch 4
Irish exams ship, the integrator may widen it, e.g. description "Free practice for Ireland: the
Driver Theory Test for car, truck and bus, Safe Pass, the SPSV entry test, the QFA exam and the QQI
Security Guarding exam for a PSA licence. No account needed." (`regionHeadline()` builds the lead
from the hub groups.)

## lib/examFacts.ts

```ts
  iepsa: {
    answer:
      "In Ireland, a security guard must hold a licence from the Private Security Authority (PSA) under the Private Security Services Act 2004, and the PSA must refuse anyone under 18 or not a fit and proper person. Since 1 November 2022 the Private Security (Licensing and Qualifications) Regulations require QQI Level 4 minor award 4N20604 Security Guarding Skills, or an equivalent, for a security guard (guarding) licence. QQI's specification assesses it by a theory examination worth 50% and a skills demonstration worth 50%, both of which must be passed; the training provider writes the exam paper, so no official question count or time is published. The award is graded Pass 50 to 64%, Merit 65 to 79% and Distinction 80 to 100%. 70% is Tigertest's target for these mock tests.",
    rows: [
      { label: "Qualification", value: "QQI Level 4 minor award 4N20604 Security Guarding Skills (10 credits)" },
      { label: "Assessment", value: "Theory examination 50% and skills demonstration 50%; pass both" },
      { label: "Questions", value: "Set by the training provider; not published" },
      { label: "Grades", value: "Pass 50-64%, Merit 65-79%, Distinction 80-100% (70% is Tigertest's target)" },
      { label: "Licence", value: "PSA security guard (guarding) licence" },
      { label: "Minimum age", value: "18" },
      { label: "Run by", value: "QQI-validated training providers; licensing by the PSA" },
    ],
    basedOn: "QQI component specification 4N20604 and S.I. 574/2022 as amended by S.I. 204/2024, checked November 2026",
    source: { name: "QQI: Security Guarding Skills 4N20604", url: "https://qsearch.qqi.ie/WebPart/AwardDetails?awardCode=4N20604" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Learners sit the exam at the end of a course with a QQI-validated training provider, so it is
teacher-led like `aesira`, `zapsira` and `uksia`:
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"iepsa"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `iepsa: "a QQI Level 4 Security Guarding Skills course",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `iepsa: "security",` (borrow the security guard tiger).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, no redirects, the `badge` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 56, set 2).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing iepsa:psa-security-licence:21201`

## CLAUDE.md (under Additional Exams, after the other international batch 4 Irish exams)

```md
- **PSA Security Guard** (`iepsa`, the theory exam of QQI Level 4 minor award 4N20604 Security Guarding Skills, the qualification S.I. 574/2022 as amended by S.I. 204/2024 requires for a PSA security guard (guarding) licence in Ireland, `/psa-security-licence/*`, landing `/psa-security-guard-practice-test`): `data/ie-psa-security-questions.json` (200 original questions on the award's two units: PSA licensing and the sector 24, role, conduct and customer care 24, arrest, force, search and trespass 32, access control, keys and confidentiality 24, patrols, alarms and radio 24, reports, evidence and court 24, emergencies, fire and first response 24, events, crowds and retail 24), test IDs 21201-21204, sets 21201-21204 (content sets: sector and role 48, law and access 56, patrols and reports 48, emergencies, events and retail 48), state `IEPSA`, prefix `IEPSA-`, 70% Tigertest's target (QQI: theory exam 50% and skills demonstration 50%, both to pass, graded Pass 50-64%, Merit 65-79%, Distinction 80-100%; providers write the paper, no count published; psa.gov.ie could not be read when built). 6/6/8/6/6/6/6/6 per test. Law from the Private Security Services Act 2004 (ss. 2, 6, 8, 21, 22, 23, 26, 27, 27A, 29, 30, 32, 33, 36 to 41), the Identity Badge Regulations 2024, the Criminal Law Act 1997 ss. 2 and 4 (any person's arrest; the would-otherwise-avoid-Garda-arrest condition; hand over as soon as practicable), the Non-Fatal Offences Against the Person Act 1997 ss. 15, 18, 20, the Theft and Fraud Offences Act 2001 s. 4, the Criminal Damage Act 1991 s. 2, the Public Order Act 1994 ss. 11 and 13, the Safety, Health and Welfare at Work Act 2005 s. 13 and the Equal Status Act 2000 s. 3; 112/999. No fees, fines or licence periods. Kept clear of `uksia`, `security`, `caguard`, `aesira` and `zapsira`. Built by `tools/next100/iepsa/build.py`; sources in `tools/next100/iepsa/sources.md`. Region IE, hub group "Ireland licences and workplace certificates", `[data-theme="iepsa"]` dark slate indigo (245 30% 22%), borrows the security guard tiger, teacher-led (QQI security course providers).
```
