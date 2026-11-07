# Wiring for `mtcpc` (Malta Driver CPC Initial Qualification Theory Test, bus and truck; MT, v1)

Files already written by the builder: `data/malta-driver-cpc-questions.json` (200, PASS),
`lib/banks/mtcpc.ts`, `app/malta-driver-cpc/*` (5 wrappers copied from
`app/ireland-truck-bus-theory/`: layout, redirect, dashboard, drill, stats; no test or practice
folders), `app/malta-driver-cpc-theory-test/page.tsx`, `tools/next100/mtcpc/*` (spec, sources,
`q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/mtcpc/build.py` (writes the data file
and prints the key-longest share). Everything below goes in shared files.

Integrator check: during the build a first run of `tools/next100/mtcpc/build.py` (before its output
path was fixed) overwrote `data/ireland-truck-bus-theory-questions.json`; it was regenerated at once
with `python3 -I tools/next100/iedttcv/build.py` (deterministic from its sources). Run
`git diff --stat data/ireland-truck-bus-theory-questions.json` and confirm it shows no change.

Format note: S.L. 65.18 Thirteenth Schedule sets the theory test as at least four hours of
multiple-choice/direct-answer questions plus case studies, and a practical part of 90 + 30 minutes.
Transport Malta's guidelines for approved training providers (search extract; transport.gov.mt
returns 403) give the CPC multiple-choice module as 80 questions in 100 minutes and the case study
module as six case studies in 100 minutes, 60% each. Modelled as four 50-question tests at the
multiple-choice pace with the 60% line: `passPct: 60`, `ceil(0.6 x 50) = 30`. DMV-style sets
`testSets(26300, 4)` (size 50), so the dashboard is 4 sets + 4 tests = 8 steps. Pools are exactly
4x the per-test counts.

## lib/exams.ts

Add `"mtcpc"` to the `ExamId` union. Icon `truck` already exists (uklgv, iedttcv use it).

Block (with the other driving tests, after `mttheory`, or after `mtmoto` if it lands first):

```ts
const mtcpc: ExamConfig = {
  id: "mtcpc",
  stateCode: "MTCPC",
  idBase: 26300,
  slug: "/malta-driver-cpc",
  landingPath: "/malta-driver-cpc-theory-test",
  name: "Malta Driver CPC Theory Test Practice",
  shortName: "Driver CPC (Malta)",
  examLabel: "Driver CPC theory test",
  fullName: "Malta Driver CPC Initial Qualification Theory Test (bus and truck)",
  questionIdPrefix: "MTCPC-",
  icon: "truck",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  // Driver CPC initial qualification, Motor Vehicles (Driving Licences) Regulations S.L. 65.18
  // Part IV and Thirteenth Schedule (L.N. 193 of 2020, the EU Driver CPC Directive, now Directive
  // (EU) 2022/2561), read 2026-11-07: theory of at least 4 hours, multiple choice plus case
  // studies, held by Transport Malta or a designated body. Transport Malta's training-provider
  // guidelines (search extract): multiple-choice module 80 questions in 100 minutes, case studies
  // 6 in 100 minutes, 60% each. Modelled at 50 questions at the same pace and 60%:
  // ceil(0.6 x 50) = 30. Transport Malta publishes no topic weights; these are Tigertest's, one
  // category per group of Thirteenth Schedule subjects. One bank covers bus and truck. Case
  // studies and practical tests are not modelled. All items original.
  blueprint: {
    mtcpcEco: 5,
    mtcpcBrakes: 5,
    mtcpcRisk: 5,
    mtcpcLoads: 6,
    mtcpcPassengers: 6,
    mtcpcHours: 7,
    mtcpcTacho: 5,
    mtcpcRules: 4,
    mtcpcHealth: 3,
    mtcpcEmergency: 4,
  },
  trainingSets: testSets(26300, 4),
  categoryLabels: {
    mtcpcEco: "Rational Driving & Fuel Economy",
    mtcpcBrakes: "Brakes, Retarders & Driver Assistance",
    mtcpcRisk: "Risk, Weather & Vulnerable Road Users",
    mtcpcLoads: "Loading, Stability & Load Securing",
    mtcpcPassengers: "Passenger Comfort, Safety & Accessibility",
    mtcpcHours: "Drivers' Hours, Rest & Working Time",
    mtcpcTacho: "Tachographs & Records",
    mtcpcRules: "CPC, Licences & Carriage Rules",
    mtcpcHealth: "Health, Fitness, Alcohol & Drugs",
    mtcpcEmergency: "Emergencies, Security & the Transport Business",
  },
  copy: {
    guestPrompt: "to save your Driver CPC progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 60% to pass",
    heroSubs: [
      "Four tests on drivers' hours, tachographs, brakes, loads and passengers. You need 60%.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your CPC theory test through your training provider.",
    ],
    sourceLine: "Original questions written from Maltese and EU rules for professional bus and truck drivers (2026). The real multiple-choice module is 80 questions with 60% to pass. Not affiliated with Transport Malta.",
    analyticsKey: "mtcpc",
  },
};
```

Append `mtcpc` to the `EXAMS` array right after `mttheory` (or `mtmoto`).

Check: 26301-26304 (tests and sets) must be free (batch table assigns idBase 26300; grepped, no
`idBase: 263xx` in `lib/exams.ts` on 2026-11-07).

## lib/banks/all.ts

```ts
import "./mtcpc";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/mtcpc.ts`.

## types/index.ts

- `QuestionType`: add `| "MTCPC"`.
- `QuestionCategory`, under a `// Malta Driver CPC theory test` comment:

```ts
  | "mtcpcEco"
  | "mtcpcBrakes"
  | "mtcpcRisk"
  | "mtcpcLoads"
  | "mtcpcPassengers"
  | "mtcpcHours"
  | "mtcpcTacho"
  | "mtcpcRules"
  | "mtcpcHealth"
  | "mtcpcEmergency"
```

(Grepped: no existing key starts with `mtcpc`; `cpc*` keys belong to the AAPC exam and do not
collide.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; the newer UI languages fall back)

```ts
    mtcpcEco: "Rational Driving & Fuel Economy",
    mtcpcBrakes: "Brakes, Retarders & Driver Assistance",
    mtcpcRisk: "Risk, Weather & Vulnerable Road Users",
    mtcpcLoads: "Loading, Stability & Load Securing",
    mtcpcPassengers: "Passenger Comfort, Safety & Accessibility",
    mtcpcHours: "Drivers' Hours, Rest & Working Time",
    mtcpcTacho: "Tachographs & Records",
    mtcpcRules: "CPC, Licences & Carriage Rules",
    mtcpcHealth: "Health, Fitness, Alcohol & Drugs",
    mtcpcEmergency: "Emergencies, Security & the Transport Business",
```

## app/globals.css

The suggested `200 60% 26%` clashes with `sie` (204 60% 28%). Checked by script against every
`[data-theme]` `--brand` in `app/globals.css` and every `--brand` in a pending `tools/**/WIRING.md`
(rule: within 8 degrees, differ by 15 points of saturation or 8 of lightness): `200 45% 20%` is
free (dark steel blue; white text contrast well over 4.5:1). Then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Malta Driver CPC theory test theme */
  [data-theme="mtcpc"] {
    --brand: 200 45% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 200 45% 95%;
    --brand-hover: 200 45% 16%;
    --brand-dark: 200 45% 14%;
    --brand-darker: 200 40% 9%;
    --brand-muted: 200 20% 66%;
    --brand-border: 200 25% 78%;
    --brand-border-light: 200 22% 88%;
    --brand-gradient-to: 40 80% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `mtcpc: "Malta's Driver CPC initial qualification theory test for bus, coach and truck drivers: EU drivers' hours and tachographs, brakes and safety systems, loads, passengers, Maltese speed and alcohol limits, in four 50-question tests with the 60% pass line.",`
- `EXAM_ORG`: `mtcpc: "Transport Malta · Driver CPC initial qualification (S.L. 65.18), bus and truck",`
- Hub group: it is a licence category (professional driving), so it sits with Malta's driving
  tests. Proposed: a new group right after `"EU driving theory tests"` (which holds `mttheory`),
  shared with `mtmoto`, placed before `"Malta licences and workplace certificates"` (mttaxi,
  mtguard), as mttaxi's WIRING.md anticipates:
  `{ title: "Malta driving tests", ids: ["mtmoto", "mtcpc"] },`
  If the integrator keeps `mtmoto` in the EU group instead, append `"mtcpc"` to
  `"EU driving theory tests"` after `"mttheory"`.
- `SEARCH_ALIASES` (English and Maltese):
  `mtcpc: "driver cpc malta cpc malta cpc theory test malta cpc initial qualification transport malta cpc bus driver malta truck driver malta lorry driver malta coach driver code 95 malta professional driver malta cpc module 2 cpc case study malta category c category d malta drivers hours tachograph malta cpc test malta sewwieq tal-karozza tal-linja sewwieq tat-trakk xufier tal-linja liċenzja tas-sewqan professjonali test tat-teorija cpc kodiċi 95",`
- `RELATED_OVERRIDES`: `mtcpc: ["mttheory", "iedttcv", "uklgv"],`

## lib/region.ts

`mtcpc: "MT",` in `TEST_REGIONS`. Not in `NON_DRIVING_TESTS` (it is a driving test).

`REGION_HOME.MT`: if the integrator updates it for the new Malta tests, suggested lines:

```ts
    testsSub: "Car, motorcycle and Driver CPC theory for Malta, in km/h for left-hand traffic, plus taxi and private guard tests.",
```

`faqsFor("MT")`, if it lists tests, add: "Is there a theory test for bus and truck drivers? Yes.
Professional bus, coach and truck drivers need a Driver CPC as well as the licence, with a theory
test of multiple-choice questions and case studies. Tigertest has a free Driver CPC practice test."

## lib/examFacts.ts

```ts
  mtcpc: {
    answer:
      "The Driver CPC (Certificate of Professional Competence) theory test is part of the initial qualification every professional bus, coach and truck driver in Malta needs as well as the licence. Under the Motor Vehicles (Driving Licences) Regulations the theory test lasts at least four hours and has multiple-choice questions and case studies, followed by practical tests, run by Transport Malta or a body it designates. Transport Malta's guidelines for training providers describe the multiple-choice module as 80 questions in 100 minutes and the case study module as six case studies in 100 minutes, each with a 60% pass mark. The CPC lasts five years, then 35 hours of periodic training renews it.",
    rows: [
      { label: "Who needs it", value: "Drivers of buses, coaches and trucks (C1, C, D1, D) for work" },
      { label: "Theory", value: "At least 4 hours: multiple choice plus case studies" },
      { label: "Multiple-choice module", value: "80 questions in 100 minutes, 60% to pass (training-provider guidelines)" },
      { label: "Case studies", value: "6 case studies in 100 minutes, 60% to pass (training-provider guidelines)" },
      { label: "Practical", value: "Driving test of at least 90 minutes plus a 30-minute practical test" },
      { label: "Valid", value: "5 years, renewed by 35 hours of periodic training" },
      { label: "On your licence", value: "Code 95" },
      { label: "Run by", value: "Transport Malta or a designated body; courses by approved training providers" },
    ],
    basedOn: "S.L. 65.18 (Motor Vehicles (Driving Licences) Regulations) and Transport Malta's guidelines for approved training providers, checked November 2026",
    source: { name: "Motor Vehicles (Driving Licences) Regulations, S.L. 65.18", url: "https://legislation.mt/eli/sl/65.18/eng" },
  },
```
(Languages left out: English or Maltese per guides, not confirmed on an official page. Fees left
out: house style avoids money.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## TEACHER_LED / TEACHES (components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx)

Teacher-led (Transport Malta's approved CPC training providers run initial qualification courses).
The landing already renders `<ExamClassFaq examId="mtcpc" />` and `classFaqJsonLd("mtcpc")`.
- `TEACHER_LED` in `components/TeachNudge.tsx`: add `"mtcpc"`.
- `TEACHES` in `components/exam/ExamClassFaq.tsx`:
  `mtcpc: "Driver CPC initial qualification courses",`

If the integrator decides driving tests are never teacher-led, drop both lines and remove the
`ExamClassFaq` import, its JSX line and the `classFaqJsonLd("mtcpc")` entry from the landing.

## lib/tigerAssets.ts

Borrow the CDL tiger like `uklgv`, `ukpcv` and `iedttcv`: add `mtcpc: "cdl",` to `BORROWED_SETS`.
The landing calls `getTigerAsset("mtcpc", 1)`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: the `truck` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (writes `lib/trainingParts.json` and
`lib/examBankSizes.json`). Sets are 50, so no parts. Then `npx tsx scripts/build-landing-dates.ts`.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing mtcpc:malta-driver-cpc:26301`
(the landing references `/landing/mtcpc-mobile.png` and `/landing/mtcpc-desktop.png`).

## CLAUDE.md (under Additional Exams, after the Malta Driving Theory bullet, or after mtmoto's)

```md
- **Malta Driver CPC Theory Test** (`mtcpc`, the theory part of the Driver CPC initial qualification every professional bus, coach and truck driver (C1, C, D1, D) in Malta needs as well as the licence, under the Motor Vehicles (Driving Licences) Regulations, S.L. 65.18 Part IV, `/malta-driver-cpc/*`, landing `/malta-driver-cpc-theory-test`): `data/malta-driver-cpc-questions.json` (200 original questions on the Thirteenth Schedule list of subjects (the EU Driver CPC Directive, now 2022/2561): rational driving and fuel economy 20, brakes, retarders and driver assistance (ESP, AEBS, ABS, TCS, IVMS) 20, risk, weather and vulnerable road users 20, loading, stability and load securing 24, passenger comfort, safety and accessibility 24, EU drivers' hours and working time 28, tachographs 20, CPC, licences and carriage rules (code 95, periodic training, ages with a CPC, CMR, Community licence, cabotage, driver attestation) 16, health, fitness, alcohol and drugs 12, emergencies, security and the transport business 16), test IDs 26301-26304 (50 questions each), sets 26301-26304 (`testSets`), state `MTCPC`, prefix `MTCPC-`, 60% pass. 5/5/5/6/6/7/5/4/3/4 per test (Tigertest's weights; Transport Malta publishes none). Format: S.L. 65.18 sets at least four hours of theory (multiple choice plus case studies) and a 90 + 30-minute practical; Transport Malta's training-provider guidelines (search extract; transport.gov.mt returns 403) give the multiple-choice module as 80 questions in 100 minutes and six case studies in 100 minutes, 60% each, so the tests run at that pace. Case studies and practical tests not modelled; one bank covers bus and truck. Maltese law: S.L. 65.11 reg. 127 (goods vehicles and minibuses 40 km/h in towns, 60 outside), Cap. 65 art. 15I (9 µg breath / 20 mg blood for commercial vehicles, 0 for buses, coaches and paid passenger transport) and the 2026 THC rules, Second Schedule ages (C 19 and D 21 with a CPC), 35 hours of periodic training in 7-hour periods with at most 12 hours e-learning, Cap. 486 (CMR); Reg 561/2006 with the 2020 Mobility Package, smart tachographs and the July 2026 van rule; no fees, fines or penalty points. Kept clear of `iedttcv`, `uklgv`, `ukpcv`, `cdl`, `nzheavy`, `zak53c3`, `hugki`, `rocpi`, `fitruck` and the Malta banks. Built by `tools/next100/mtcpc/build.py`; sources in `tools/next100/mtcpc/sources.md`. Region MT, hub group "Malta driving tests" (with mtmoto), `[data-theme="mtcpc"]` dark steel blue (200 45% 20%), borrows the CDL tiger, teacher-led (approved CPC training providers).
```
