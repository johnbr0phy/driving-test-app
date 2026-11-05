# Wiring for `nzmoto` (New Zealand motorcycle learner licence theory test, Class 6, v1)

Files already written by the builder: `data/nz-motorcycle-learner-questions.json` (200, PASS,
key-longest 8%), `lib/banks/nzmoto.ts`, `app/nz-motorcycle-learner/*` (layout, redirect,
dashboard, drill, stats, copied from `app/nz-learner-licence/`; no test or practice folders),
`app/nz-motorcycle-learner-licence-practice-test/page.tsx`, `tools/next100/nzmoto/*` (spec,
sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/nzmoto/build.py`.
Everything below goes in shared files.

Format note: five 35-question tests and 32 to pass, the same format as the car learner test
(`nzroad`). `passPct: 91` gives `ceil(0.91 * 35) = 32`. NZTA's motorcycle pages blocked automated
reads, so the 35/32 format for Class 6 comes from drive.govt.nz's learner test page (car) and
Wikipedia, and the landing and examFacts say so. Pools are 5x each per-test count plus 25
training-only spares (the last items of each pool), so no item repeats across tests. Dashboard =
5 training sets + 5 tests = 10 steps. No stem matches `nzroad`, `moto`, `ukmoto`, `zak53moto`,
`zak53`, `zak53c3`, `sgbtt`, `sgftt` or `nzheavy` above 0.78 (difflib, normalised); `sgrtt` was not
on disk when this bank was checked: the integrator should run the same check once it lands.

## lib/exams.ts

Add `"nzmoto"` to the `ExamId` union. Icon `bike` already exists (used by `moto`, `ukmoto`,
`zak53moto`).

```ts
const nzmoto: ExamConfig = {
  id: "nzmoto",
  stateCode: "NZMOTO",
  idBase: 21300,
  slug: "/nz-motorcycle-learner",
  landingPath: "/nz-motorcycle-learner-licence-practice-test",
  name: "NZ Motorcycle Learner Licence Practice Test",
  shortName: "NZ motorcycle learner",
  examLabel: "NZ motorcycle learner licence test",
  fullName: "New Zealand motorcycle learner licence theory test (Class 6)",
  questionIdPrefix: "NZMOTO-",
  icon: "bike",
  testCount: 5,
  questionsPerTest: 35,
  passPct: 91,
  // Real test: computer-based multi-choice theory test at a driver licensing agent, after the basic
  // handling skills test (AA, Wikipedia). drive.govt.nz gives the learner test as 35 questions, 32 to
  // pass, 30 minutes (car page, checked 2026-11-05); Wikipedia gives 32 of 35 for the motorcycle
  // learner licence. NZTA's own motorcycle pages blocked automated reads, so the Class 6 format is
  // from those sources. NZTA publishes no per-topic counts; the split is Tigertest's. Pools are 5x
  // each count plus 25 training-only spares. passPct 91 = ceil(0.91 * 35) = 32. Learner and
  // restricted conditions (rear L plate, no pillion, 10 pm to 5 am, no towing, LAMS under 660 cc
  // and 150 kW/t) from Wikipedia and ACC Ride Forever. All items original; signs described in words.
  blueprint: {
    nzmLicence: 5,
    nzmGear: 4,
    nzmSigns: 4,
    nzmGiveWay: 6,
    nzmPosition: 6,
    nzmControl: 5,
    nzmHazards: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 21301, name: "Licence Conditions & Riding Gear", categories: ["nzmLicence", "nzmGear"], size: 52, weightLabel: "9 of 35 test questions" },
    { setNumber: 2, id: 21302, name: "Signs & Giving Way", categories: ["nzmSigns", "nzmGiveWay"], size: 58, weightLabel: "10 of 35 test questions" },
    { setNumber: 3, id: 21303, name: "Road Position, Speed & Overtaking", categories: ["nzmPosition"], size: 34, weightLabel: "6 of 35 test questions" },
    { setNumber: 4, id: 21304, name: "Braking, Cornering & Bike Control", categories: ["nzmControl"], size: 28, weightLabel: "5 of 35 test questions" },
    { setNumber: 5, id: 21305, name: "Road Surfaces, Weather & Hazards", categories: ["nzmHazards"], size: 28, weightLabel: "5 of 35 test questions" },
  ],
  categoryLabels: {
    nzmLicence: "Licence Conditions, Alcohol & Crashes",
    nzmGear: "Helmets, Gear & Bike Checks",
    nzmSigns: "Signs, Signals & Markings",
    nzmGiveWay: "Intersections & Giving Way",
    nzmPosition: "Road Position, Speed & Overtaking",
    nzmControl: "Braking, Cornering & Bike Control",
    nzmHazards: "Road Surfaces, Weather & Hazards",
  },
  copy: {
    guestPrompt: "to save your motorcycle learner licence progress and track every question you miss",
    trainingHeading: "Train by topic for riders",
    trainingSub: "Five sets on the learner and restricted conditions, helmets and gear, giving way, road position, braking and cornering, and road surface hazards. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 35 questions, 32 to pass",
    heroSubs: [
      "Five topics, five 35-question tests. Giving way and road position weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your motorcycle learner licence test.",
    ],
    sourceLine: "Based on New Zealand's road rules for motorcyclists. Original questions; 35 per test, 32 to pass like the car learner test.",
    analyticsKey: "nzmoto",
  },
};
```

Append `nzmoto` to the `EXAMS` array after `nzroad`. Ids 21301-21305 (tests and sets) are free
(block 21300 reserved for this exam in BRIEF.md).

## lib/banks/all.ts

```ts
import "./nzmoto";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/nzmoto.ts`.

## types/index.ts

Grepped: no `nzm*` key and no `NZMOTO` exists.

- `QuestionType`: add `| "NZMOTO"`.
- `QuestionCategory`, under a `// NZ motorcycle (class 6) learner licence` comment:

```ts
  | "nzmLicence"
  | "nzmGear"
  | "nzmSigns"
  | "nzmGiveWay"
  | "nzmPosition"
  | "nzmControl"
  | "nzmHazards"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nzmLicence: "Licence Conditions, Alcohol & Crashes",
    nzmGear: "Helmets, Gear & Bike Checks",
    nzmSigns: "Signs, Signals & Markings",
    nzmGiveWay: "Intersections & Giving Way",
    nzmPosition: "Road Position, Speed & Overtaking",
    nzmControl: "Braking, Cornering & Bike Control",
    nzmHazards: "Road Surfaces, Weather & Hazards",
```

## app/globals.css

Light block, hue 12 85% 16% (from the brief, checked there), then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* NZ motorcycle (class 6) learner licence theme */
  [data-theme="nzmoto"] {
    --brand: 12 85% 16%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 12 60% 95%;
    --brand-hover: 12 85% 12%;
    --brand-dark: 12 85% 11%;
    --brand-darker: 12 75% 8%;
    --brand-muted: 12 30% 70%;
    --brand-border: 12 35% 78%;
    --brand-border-light: 12 30% 88%;
    --brand-gradient-to: 20 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nzmoto: "Five 35-question mock tests for New Zealand's Class 6 motorcycle learner licence theory test: learner and restricted conditions, LAMS, helmets and gear, giving way, road position, braking and cornering, and road surface hazards.",`
- `EXAM_ORG`: `nzmoto: "NZTA Waka Kotahi · Class 6 motorcycle learner licence",`
- Hub group: add to the existing group (nzheavy's WIRING adds `nzheavy` too; merge both):
  `{ title: "New Zealand driving tests", ids: ["nzroad", "nzmoto", "nzheavy"] },`
- `SEARCH_ALIASES`:
  `nzmoto: "nz motorcycle learner licence class 6 learner licence motorbike learners licence nz motorcycle road code nz motorcycle theory test learner rider nz lams nz moto licence test nzta motorcycle test scooter licence nz",`
- `RELATED_OVERRIDES`: `nzmoto: ["nzroad", "ukmoto", "zak53moto"],` and, integrator's call, change
  `nzroad: ["aunsw", "auvic", "auqld"]` to `nzroad: ["nzmoto", "nzheavy", "aunsw"]` now that the
  group has members.

## lib/region.ts

`TEST_REGIONS`: add `nzmoto: "NZ",` on the NZ line (`nzroad: "NZ", nzfirearms: "NZ", nzlcq: "NZ",`).
Driving test, so NOT in `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  nzmoto: {
    answer:
      "The Class 6 learner licence is the first step to riding a motorcycle in New Zealand. You must be at least 16 and pass a basic handling skills test with an approved motorcycle instructor, then a computer-based multi-choice theory test on the road rules for motorcyclists at a driver licensing agent. Published guidance gives it the same format as the car learner test, 35 questions with at least 32 right to pass (drive.govt.nz gives 30 minutes for that test). On a learner licence you ride with no passenger, show an L plate on the rear, stay off the road between 10 pm and 5 am, do not tow, and ride only a LAMS-approved motorcycle.",
    rows: [
      { label: "Questions", value: "35 multi-choice (as the car learner test)" },
      { label: "Pass mark", value: "32 of 35" },
      { label: "Minimum age", value: "16" },
      { label: "First", value: "Basic handling skills test with an instructor" },
      { label: "Learner conditions", value: "No pillion, rear L plate, no riding 10 pm to 5 am, LAMS bike" },
      { label: "Run by", value: "NZTA Waka Kotahi, at licensing agents" },
    ],
    basedOn: "drive.govt.nz learner test page, ACC Ride Forever licensing and LAMS pages, and Wikipedia's summary of NZ licensing, checked November 2026 (NZTA's motorcycle pages could not be read)",
    source: { name: "drive.govt.nz: Doing the learner licence test", url: "https://drive.govt.nz/learner-licence/doing-the-learner-licence-test" },
  },
```

## lib/tigerAssets.ts

`BORROWED_SETS`: `nzmoto: "moto",` (the motorcycle tiger, as `ukmoto` and `zak53moto` borrow it).

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## Landing

Renders `ExamFacts`, `ExamSampleQuestions` (imports `@/lib/banks/nzmoto`) and `ExamRelatedTests`;
the FAQ is one `faqs` array rendered as JSON-LD and on the page. Says "not affiliated with NZTA Waka
Kotahi" in the last FAQ.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## lib/landingDates.json, lib/examBankSizes.json

Run `npx tsx scripts/build-landing-dates.ts` after committing and
`npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nzmoto:nz-motorcycle-learner:21301`

## CLAUDE.md (under Additional Exams, after the NZ Learner Licence bullet)

```md
- **NZ Motorcycle Learner Licence** (`nzmoto`, New Zealand Class 6 motorcycle learner licence theory test, `/nz-motorcycle-learner/*`, landing `/nz-motorcycle-learner-licence-practice-test`): `data/nz-motorcycle-learner-questions.json` (200 original questions on New Zealand's road rules for motorcyclists: licence conditions/alcohol/crashes 28, helmets/gear/bike checks 24, signs and markings 24, giving way 34, road position/speed/overtaking 34, braking/cornering/control 28, road surfaces/weather/hazards 28), five 35-question tests: test IDs 21301-21305, sets 21301-21305, state `NZMOTO`, prefix `NZMOTO-`, 91% pass (32 of 35, the car learner test's format; NZTA's motorcycle pages could not be read, so Class 6 format is from drive.govt.nz's learner page and Wikipedia). 5/4/4/6/6/5/5 per test; the last items of each pool (25 in all) are training-only. Learner and restricted conditions (no pillion, rear L plate, 10 pm to 5 am, no towing, LAMS under 660 cc and 150 kW/t) from ACC Ride Forever and Wikipedia; no learner speed limit, stage durations, fees or helmet standard numbers. Signs described in words. Built by `tools/next100/nzmoto/build.py`; sources in `tools/next100/nzmoto/sources.md`. Region NZ, hub group "New Zealand driving tests", `[data-theme="nzmoto"]` deep rust (12 85% 16%), borrows the motorcycle tiger.
```
