# Wiring for `pkdrive` (Pakistan driving licence sign and theory test, v1)

Files already written by the builder: `data/pakistan-driving-questions.json` (200, PASS),
`lib/banks/pkdrive.ts`, `app/pakistan-driving-test/*` (8 wrappers, copied from
`app/nz-learner-licence/`), `app/pakistan-driving-licence-test/page.tsx`, `tools/next100/pkdrive/*`
(spec, sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/pkdrive/build.py`.
Everything below goes in shared files.

Format note: no national test exists. Punjab, Sindh, KP, Balochistan and ICT each run their own
sign test (Punjab's e-sign test is reported as about 10 questions; pass marks reported 50 to 70%,
none confirmed officially). Tigertest models four 50-question tests at an 80% target (40 of 50),
like `kentsa`. Pools are exactly 4x each per-test count (no spares). Dashboard = 5 topic sets +
4 tests = 9 steps. No set exceeds 60.

## lib/exams.ts

Add `"pkdrive"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests, after `hkdrive`):

```ts
const pkdrive: ExamConfig = {
  id: "pkdrive",
  stateCode: "PKDRIVE",
  idBase: 13000,
  slug: "/pakistan-driving-test",
  landingPath: "/pakistan-driving-licence-test",
  name: "Pakistan Driving Licence Practice Test",
  shortName: "Pakistan driving test",
  examLabel: "Pakistan driving licence test",
  fullName: "Pakistan driving licence sign and theory test (car)",
  questionIdPrefix: "PKDRV-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Source: road signs in Pakistan (Manual of Signs, Signals and Markings 1989, Vienna Convention
  // shapes) and the driving regulations of the Provincial Motor Vehicles Ordinance 1965 (Tenth
  // Schedule: keep left, overtake on the right, give way to the right at uncontrolled
  // intersections). Licences are issued by Punjab, Sindh, KP, Balochistan and ICT, each with its
  // own sign/theory test; none publishes a national question count, pass mark or topic split
  // (Punjab's e-sign test is reported as about 10 questions). Four 50-question tests at 80%
  // (40 of 50) is Tigertest's target; topic weights are Tigertest's own, signs heaviest. Speed
  // limit figures are not asked (NHMP cut and restored them in 2026). Checked 2026-10-31.
  // Pools are exactly 4x each count (no spares). All items original.
  blueprint: {
    pkLicence: 5,
    pkWarning: 7,
    pkRegulatory: 8,
    pkMarkings: 5,
    pkJunctions: 6,
    pkRoad: 6,
    pkMotorway: 4,
    pkSafety: 5,
    pkEmergency: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 13001, name: "Warning Signs", categories: ["pkWarning"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 2, id: 13002, name: "Regulatory & Information Signs", categories: ["pkRegulatory"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 3, id: 13003, name: "Markings, Signals & Junctions", categories: ["pkMarkings", "pkJunctions"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 4, id: 13004, name: "Lanes, Speed & Motorways", categories: ["pkRoad", "pkMotorway"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 13005, name: "Licences, Safety & Emergencies", categories: ["pkLicence", "pkSafety", "pkEmergency"], size: 56, weightLabel: "14 of 50 test questions" },
  ],
  categoryLabels: {
    pkLicence: "Licences, Documents & the Law",
    pkWarning: "Warning Signs",
    pkRegulatory: "Regulatory, Mandatory & Information Signs",
    pkMarkings: "Markings, Lights & Signals",
    pkJunctions: "Junctions, Roundabouts & Right of Way",
    pkRoad: "Lanes, Overtaking, Speed & Parking",
    pkMotorway: "Motorways & Highways",
    pkSafety: "Seat Belts, Helmets & Safe Driving",
    pkEmergency: "Night, Weather & Emergencies",
  },
  copy: {
    guestPrompt: "to save your driving licence test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the road signs and traffic rules every licensing centre in Pakistan tests. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 40 or more",
    heroSubs: [
      "Five topics, four 50-question tests. Signs weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your sign test and road test.",
    ],
    sourceLine: "Based on Pakistan's road signs and the driving regulations of the Motor Vehicles Ordinance. Original questions; 50 per test, 80% is Tigertest's target.",
    analyticsKey: "pkdrive",
  },
};
```

Append `pkdrive` to the `EXAMS` array with the other driving tests (after `hkdrive`).

Check: 13001-13005 (sets) and 13001-13004 (tests) must be free (BRIEF reserves idBase 13000).

## lib/banks/all.ts

```ts
import "./pkdrive";
```

## types/index.ts

- `QuestionType`: add `| "PKDRIVE"`.
- `QuestionCategory`, under a `// Pakistan driving licence` comment:

```ts
  | "pkLicence"
  | "pkWarning"
  | "pkRegulatory"
  | "pkMarkings"
  | "pkJunctions"
  | "pkRoad"
  | "pkMotorway"
  | "pkSafety"
  | "pkEmergency"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    pkLicence: "Licences, Documents & the Law",
    pkWarning: "Warning Signs",
    pkRegulatory: "Regulatory, Mandatory & Information Signs",
    pkMarkings: "Markings, Lights & Signals",
    pkJunctions: "Junctions, Roundabouts & Right of Way",
    pkRoad: "Lanes, Overtaking, Speed & Parking",
    pkMotorway: "Motorways & Highways",
    pkSafety: "Seat Belts, Helmets & Safe Driving",
    pkEmergency: "Night, Weather & Emergencies",
```

## app/globals.css

Hue from the brief, 152 70% 22% (Pakistan flag green). Clash check: `[data-theme]` blocks at
`150 60% 28%` (Australia green, several) are within 8 degrees with only 10 points of saturation
and 6 of lightness, under the 15/8 rule. If that is too close, use `152 76% 20%` (16 and 8 off).
Lightness 22% is below the wiring guide's 30 to 48% band but white text passes easily.
Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Pakistan driving licence theme */
  [data-theme="pkdrive"] {
    --brand: 152 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 152 55% 95%;
    --brand-hover: 152 70% 18%;
    --brand-dark: 152 70% 16%;
    --brand-darker: 152 60% 11%;
    --brand-muted: 152 30% 68%;
    --brand-border: 152 30% 78%;
    --brand-border-light: 152 28% 88%;
    --brand-gradient-to: 120 45% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `pkdrive: "Four 50-question mock tests for the driving licence sign and theory tests in Pakistan: warning, regulatory and mandatory signs, markings, roundabouts, overtaking, motorway rules, safety and emergencies, for Punjab, Sindh, KP, Balochistan and Islamabad.",`
- `EXAM_ORG`: `pkdrive: "Provincial and ICT licensing authorities · sign test and road test",`
- Hub group, new (after "India driving tests"): `{ title: "Pakistan driving tests", ids: ["pkdrive"] },`
  With one member, add `RELATED_OVERRIDES`: `pkdrive: ["inrto", "aerta", "ukcar"],`
- `SEARCH_ALIASES`:
  `pkdrive: "pakistan driving license test driving licence test pakistan e sign test esign test punjab sign test road signs pakistan traffic signs test dlims dastak learner permit islamabad driving license test itp karachi driving license sindh kpk driving license test lahore rawalpindi peshawar quetta motorway police nhmp",`

## lib/region.ts

Per the brief, wire as GLOBAL (Pakistan has no region yet):
`pkdrive: "GLOBAL",` in `TEST_REGIONS` (on the GLOBAL line). Note this lists a Pakistan-only
driving test in the "worldwide" group of every country homepage and puts it in the `GLOBAL`
country filter on the Today tab; if a `PK` region is added later, move it there. It is a driving
test, so NOT in `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  pkdrive: {
    answer:
      "There is no single national driving test in Pakistan. Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan and the Islamabad Capital Territory each issue licences and run their own tests, and every province recognises the others' licences. Under the Motor Vehicles Ordinance you must be at least 18 for a private car licence (21 to drive for pay), hold a CNIC and pass an eyesight check. You start on a learner permit, driving only with a licensed driver beside you, then take a sign test (Punjab's computer e-sign test, or a theory and sign test elsewhere) and a practical road test. The question count, pass mark and waiting period are set by each licensing authority and are not published as one national rule.",
    rows: [
      { label: "Run by", value: "Provincial and ICT licensing authorities" },
      { label: "Parts", value: "Learner permit, sign or theory test, road test" },
      { label: "Sign test format", value: "Set by each authority (Punjab e-sign test reported as about 10 questions)" },
      { label: "Pass mark", value: "Set by each authority, not published nationally" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 80% target" },
      { label: "Minimum age (car)", value: "18" },
      { label: "Also required", value: "CNIC, proof of residence, eyesight check" },
      { label: "Study material", value: "Traffic signs, the Tenth Schedule driving regulations and the Highway Code (Motor Vehicles Ordinance, Third Schedule)" },
    ],
    basedOn: "Provincial Motor Vehicles Ordinance 1965 (Punjab Transport Department copy amended to November 2023: section 4, Third, Tenth and Eleventh Schedules), road signs in Pakistan and provincial licensing guidance, checked November 2026",
    source: { name: "Punjab Driving License Information Management System (DLIMS)", url: "https://dlims.punjab.gov.pk/" },
  },
```
(No national licensing page exists and nhmp.gov.pk did not answer on 2026-10-31 or 2026-11-01.
DLIMS is the official Punjab licensing site and loads; the Ordinance PDF itself is
https://transport.punjab.gov.pk/system/files/The%20Provincial%20Motor%20Vehicles%20Ordinance%2C%201965%20%2830-11-2023%29_0.pdf
if a law link is preferred.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Optionally add `pkdrive` to `BORROWED_SETS` with the DMV set like the
other car tests.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing pkdrive:pakistan-driving-test:13001`

## CLAUDE.md (after the Hong Kong bullet under International driving tests)

```md
- **Pakistan Driving Test** (driving licence sign and theory test, car, `/pakistan-driving-test/*`, landing `/pakistan-driving-licence-test`): `data/pakistan-driving-questions.json` (200 original questions on Pakistan's road signs and the driving regulations of the Provincial Motor Vehicles Ordinance 1965: licences/documents 20, warning signs 28, regulatory/mandatory/information signs 32, markings and signals 20, junctions and roundabouts 24, lanes/overtaking/parking 24, motorways 16, safety 20, night/weather/emergencies 16), test IDs 13001-13004 (50 questions each), sets 13001-13005 (by topic), state `PKDRIVE`, prefix `PKDRV-`, 80% pass (Tigertest's target: Punjab, Sindh, KP, Balochistan and ICT each run their own test and none publishes a national count or pass mark; Punjab's e-sign test is reported as about 10 questions). 5/7/8/5/6/6/4/5/4 per test, no spares. Left-hand traffic, roundabouts clockwise, give way to the right at uncontrolled junctions; no speed limit figures (NHMP cut and restored them in 2026), fees, fines or provincial waiting periods. Signs are described in words. Built by `tools/next100/pkdrive/build.py`; sources in `tools/next100/pkdrive/sources.md`. Wired as GLOBAL (no PK region yet), hub group "Pakistan driving tests".
```
