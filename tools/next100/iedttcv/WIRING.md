# Wiring for `iedttcv` (Ireland Driver Theory Test, truck and bus, categories C and D; IE, v1)

Files already written by the builder: `data/ireland-truck-bus-theory-questions.json` (200, PASS),
`lib/banks/iedttcv.ts`, `app/ireland-truck-bus-theory/*` (5 wrappers copied from
`app/ireland-driver-theory/`: layout, redirect, dashboard, drill, stats; no test or practice
folders), `app/ireland-truck-bus-theory-test/page.tsx`, `tools/next100/iedttcv/*` (spec, sources,
`q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/iedttcv/build.py` (writes the data
file and prints the key-longest share). Everything below goes in shared files.

Format note: the real C or D test is 100 questions in 120 minutes, 74 to pass (theorytest.ie FAQs,
checked 2026-11-05). Modelled as four 50-question tests at the real pace with the real 74%:
`passPct: 74`, `ceil(0.74 x 50) = 37`. DMV-style sets `testSets(18800, 4)` (size 50), so the
dashboard is 4 sets + 4 tests = 8 steps. Pools are exactly 4x the per-test counts.

## lib/exams.ts

Add `"iedttcv"` to the `ExamId` union. Icon `truck` already exists (uklgv uses it).

Block (with the other driving tests, after `iedtt`):

```ts
const iedttcv: ExamConfig = {
  id: "iedttcv",
  stateCode: "IEDTTCV",
  idBase: 18800,
  slug: "/ireland-truck-bus-theory",
  landingPath: "/ireland-truck-bus-theory-test",
  name: "Ireland Truck and Bus Theory Test Practice",
  shortName: "Truck & Bus Theory (IE)",
  examLabel: "Truck and Bus Theory Test",
  fullName: "Ireland Driver Theory Test, truck and bus (categories C and D, RSA)",
  questionIdPrefix: "IEDTTCV-",
  icon: "truck",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 74,
  // RSA Driver Theory Test, categories C (truck) and D (bus), per theorytest.ie FAQs checked
  // 2026-11-05: 100 questions in 120 minutes, 74 to pass, English or Irish; combined CD test 140
  // questions, 180 minutes, 104 to pass (English only). Modelled at 50 questions at the same pace
  // and 74%: ceil(0.74 x 50) = 37. The RSA publishes no topic weights, so these are Tigertest's,
  // weighted to the heavy-vehicle material (EU Reg 561/2006 drivers' hours, Reg 165/2014
  // tachographs, S.I. 546/2008 and 75/2012 speed limits, Driver CPC). Bank covers truck and bus.
  // The official RSA question bank is copyrighted and was not used: all items original.
  blueprint: {
    iedttcvLicence: 4,
    iedttcvHours: 7,
    iedttcvTacho: 5,
    iedttcvBrakes: 7,
    iedttcvLoads: 6,
    iedttcvPassengers: 6,
    iedttcvRoad: 7,
    iedttcvSafety: 5,
    iedttcvEmergencies: 3,
  },
  trainingSets: testSets(18800, 4),
  categoryLabels: {
    iedttcvLicence: "Licences, Driver CPC & Roadworthiness",
    iedttcvHours: "Drivers' Hours & Working Time",
    iedttcvTacho: "Tachographs & Records",
    iedttcvBrakes: "Brakes, Coupling & Vehicle Checks",
    iedttcvLoads: "Weights, Dimensions & Load Security",
    iedttcvPassengers: "Carrying Passengers",
    iedttcvRoad: "Speed Limits, Lanes & Large Vehicles",
    iedttcvSafety: "Blind Spots, Fatigue & Alcohol",
    iedttcvEmergencies: "Eco-Driving, Breakdowns & Incidents",
  },
  copy: {
    guestPrompt: "to save your truck and bus theory progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 74% to pass, like the real test",
    heroSubs: [
      "Four tests on drivers' hours, tachographs, brakes, loads and passengers. You need 74%.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your truck or bus theory test at theorytest.ie.",
    ],
    sourceLine: "Original questions written from Irish and EU rules for truck and bus drivers (2026). The real C or D test is 100 questions and you need 74 right. Not affiliated with the RSA.",
    analyticsKey: "iedttcv",
  },
};
```

Append `iedttcv` to the `EXAMS` array right after `iedtt`.

Check: 18801-18804 (tests and sets) must be free (batch table assigns idBase 18800).

## lib/banks/all.ts

```ts
import "./iedttcv";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/iedttcv.ts`.

## types/index.ts

- `QuestionType`: add `| "IEDTTCV"`.
- `QuestionCategory`, under a `// Ireland truck and bus theory test` comment:

```ts
  | "iedttcvLicence"
  | "iedttcvHours"
  | "iedttcvTacho"
  | "iedttcvBrakes"
  | "iedttcvLoads"
  | "iedttcvPassengers"
  | "iedttcvRoad"
  | "iedttcvSafety"
  | "iedttcvEmergencies"
```

(Grepped: no existing key starts with `iedttcv`.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; the six newer UI languages fall back)

```ts
    iedttcvLicence: "Licences, Driver CPC & Roadworthiness",
    iedttcvHours: "Drivers' Hours & Working Time",
    iedttcvTacho: "Tachographs & Records",
    iedttcvBrakes: "Brakes, Coupling & Vehicle Checks",
    iedttcvLoads: "Weights, Dimensions & Load Security",
    iedttcvPassengers: "Carrying Passengers",
    iedttcvRoad: "Speed Limits, Lanes & Large Vehicles",
    iedttcvSafety: "Blind Spots, Fatigue & Alcohol",
    iedttcvEmergencies: "Eco-Driving, Breakdowns & Incidents",
```

## app/globals.css

Hue from the international batch 1 table (140 70% 22%, already checked). Within 8 degrees of
`iedtt` (145 63% 32%) but 10 points darker, so it passes the clash rule. Then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Ireland truck and bus theory test theme */
  [data-theme="iedttcv"] {
    --brand: 140 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 140 50% 95%;
    --brand-hover: 140 70% 18%;
    --brand-dark: 140 70% 16%;
    --brand-darker: 140 65% 10%;
    --brand-muted: 140 25% 68%;
    --brand-border: 140 28% 78%;
    --brand-border-light: 140 25% 88%;
    --brand-gradient-to: 30 90% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `iedttcv: "Ireland's truck and bus Driver Theory Test (categories C and D): EU drivers' hours, tachographs, air brakes and coupling, loads, passengers and heavy vehicle speed limits, in four 50-question tests with the real 74% pass line.",`
- `EXAM_ORG`: `iedttcv: "RSA (Ireland) · category C and D theory test, Driver CPC step 1",`
- Hub group: add to the existing Ireland group (it is a driving test):
  `{ title: "Ireland driving tests", ids: ["iedtt", "iedttcv"] },`
- `SEARCH_ALIASES`:
  `iedttcv: "truck theory test ireland bus theory test ireland hgv theory test ireland category c theory test category d theory test cd theory test c1 d1 lorry theory test ireland driver cpc ireland cpc step 1 rsa truck test rsa bus test tachograph drivers hours ireland",`
- `RELATED_OVERRIDES`: `iedttcv: ["iedtt", "uklgv", "ukpcv"],`
  and, so the car test links its new sibling, consider `iedtt: ["iedttcv", "ukcar", "nzroad"],`
  (replacing the current `iedtt` override).

## lib/region.ts

`iedttcv: "IE",` in `TEST_REGIONS`. Not in `NON_DRIVING_TESTS` (it is a driving test).

`REGION_HOME.IE` now has two tests. Suggested copy (integrator's call):

```ts
    title: "Free Irish Practice Tests: Driver Theory Test, Car, Truck and Bus | Tigertest",
    description: "Free Driver Theory Test practice for Ireland: car, truck and bus. Original questions on the Rules of the Road, drivers' hours, tachographs and loads, every answer explained. No account needed.",
    lead: "Practice for the Driver Theory Test you need before your first learner permit, for a car, truck or bus. Original questions, every answer explained. No signup.",
    cta: { label: "Driver Theory Test", href: "/ireland-driver-theory-test" },
    testsTitle: "Driver Theory Tests",
    testsSub: "Car: 40 questions, 35 to pass. Truck or bus (C or D): 100 questions, 74 to pass. All in km/h for left-hand traffic.",
```

`faqsFor("IE")`, if it lists tests, add: "Is there a truck or bus theory test? Yes. Categories C and D
each have a 100-question test in 120 minutes with 74 to pass, and a full category B licence is
needed first. Tigertest has a free truck and bus practice test."

## lib/examFacts.ts

```ts
  iedttcv: {
    answer:
      "The truck and bus Driver Theory Test is the computer test you must pass in Ireland before you can get a learner permit for a truck (category C or C1) or a bus (category D or D1). The truck test and the bus test are each 100 multiple-choice questions in 120 minutes, and you need 74 correct to pass; the combined truck and bus test is 140 questions in 180 minutes with 104 to pass. You need a full car licence first, the certificate is valid for two years, and the full bus or truck test also counts as the first step of the Driver CPC.",
    rows: [
      { label: "Questions", value: "100 multiple choice (C or D); 140 for the combined CD test" },
      { label: "Time", value: "120 minutes (C or D); 180 minutes (CD)" },
      { label: "Pass mark", value: "74 of 100 (C or D); 104 of 140 (CD)" },
      { label: "Languages", value: "English or Irish (C, D); English only (CD and module tests)" },
      { label: "Module test", value: "40 questions, 45 minutes, 30 to pass, to add the other category" },
      { label: "You need first", value: "A full category B (car) licence" },
      { label: "Certificate valid", value: "2 years" },
      { label: "Run by", value: "Road Safety Authority (RSA), booked at theorytest.ie" },
    ],
    basedOn: "theorytest.ie FAQs and booking pages, checked November 2026",
    source: { name: "Official RSA Driver Theory Test", url: "https://www.theorytest.ie/general-information/faqs/" },
  },
```
(Fees left out: house style avoids money.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not teacher-led (the template landing renders no `ExamClassFaq`).

## lib/tigerAssets.ts

Borrow the CDL tiger like `uklgv` and `ukpcv`: add `iedttcv: "cdl",` to `BORROWED_SETS` (next to
`iedtt: "driving"`). The landing calls `getTigerAsset("iedttcv", 1)`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: the `truck` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (writes `lib/trainingParts.json` and
`lib/examBankSizes.json`). Sets are 50, so no parts. Then `npx tsx scripts/build-landing-dates.ts`.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing iedttcv:ireland-truck-bus-theory:18801`
(the landing references `/landing/iedttcv-mobile.png` and `/landing/iedttcv-desktop.png`).

## CLAUDE.md (under Additional Exams, after the Ireland Driver Theory Test bullet)

```md
- **Ireland Truck and Bus Theory Test** (`iedttcv`, RSA Driver Theory Test categories C and D, before a truck or bus learner permit and Driver CPC step 1, `/ireland-truck-bus-theory/*`, landing `/ireland-truck-bus-theory-test`): `data/ireland-truck-bus-theory-questions.json` (200 original questions: licences, Driver CPC and roadworthiness 16, EU drivers' hours and working time 28, tachographs 20, brakes, coupling and checks 28, weights, dimensions and load security 24, carrying passengers 24, speed limits, lanes and large vehicles 28, blind spots, fatigue and alcohol 20, eco-driving, breakdowns and incidents 12), test IDs 18801-18804 (50 questions each, half the real 100 at the same pace), sets 18801-18804 (`testSets`), state `IEDTTCV`, prefix `IEDTTCV-`, 74% pass (the real 74 of 100; the combined CD test is 140 with 104 to pass). 4/7/5/7/6/6/7/5/3 per test (Tigertest's weights; the RSA publishes none). Covers truck and bus in one bank; the module tests and the CPC case study test are not modelled. Irish heavy vehicle limits (S.I. 546/2008, 75/2012: trucks 90 km/h motorway, 80 elsewhere; coaches 100/80; buses with standing passengers 65), Reg 561/2006 with the 2020 Mobility Package, 56 days of tachograph records since 31 December 2024, 20 mg for professional drivers; no fees, fines or weight limits. Kept clear of `iedtt`, `uklgv` and `ukpcv` stems. Built by `tools/next100/iedttcv/build.py`; sources in `tools/next100/iedttcv/sources.md`. Region IE, hub group "Ireland driving tests", `[data-theme="iedttcv"]` deep green (140 70% 22%), borrows the CDL tiger.
```
