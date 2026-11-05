# Wiring for `iespsv` (Ireland SPSV Driver Entry Test, Industry Knowledge module; IE, v1)

Files already written by the builder: `data/spsv-entry-test-questions.json` (200, PASS),
`lib/banks/iespsv.ts`, `app/spsv-entry-test/*` (5 wrappers copied from `app/seru/`: layout,
redirect, dashboard, drill, stats; no test or practice folders), `app/spsv-entry-test-practice-test/page.tsx`,
`tools/next100/iespsv/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/iespsv/build.py` (writes the data file and prints the key-longest share).
Everything below goes in shared files.

Format note: the real SPSV Driver Entry Test (NTA page and Official Manual Edition 8.1, checked
2026-11-05) is 90 multiple-choice questions in two modules: Industry Knowledge, 54 questions in
54 minutes, and Area Knowledge, 36 questions in 36 minutes on the chosen county; 75% in each
module. Only Industry Knowledge is modelled: three real-length tests of 54 at 75%,
`ceil(0.75 x 54) = 41`. Five training sets by Manual chapter, so the dashboard is 3 tests + 5 sets
= 8 steps. Each pool is 3x its per-test count plus 2 to 6 training-only spares (the last items of
each pool, 38 in all), so no item repeats across tests. `examTestQuestions` reads `testCount` /
`questionsPerTest` generically, as for `ukseru` (5 x 36) and `uklitu` (8 x 24).

## lib/exams.ts

Add `"iespsv"` to the `ExamId` union. Icon `car` already exists.

```ts
const iespsv: ExamConfig = {
  id: "iespsv",
  stateCode: "IESPSV",
  idBase: 21000,
  slug: "/spsv-entry-test",
  landingPath: "/spsv-entry-test-practice-test",
  name: "SPSV Entry Test Practice",
  shortName: "SPSV Entry Test",
  examLabel: "SPSV Driver Entry Test",
  fullName: "SPSV Driver Entry Test, Industry Knowledge module (taxi, hackney and limousine, Ireland)",
  questionIdPrefix: "IESPSV-",
  icon: "car",
  testCount: 3,
  questionsPerTest: 54,
  passPct: 75,
  // NTA SPSV Driver Entry Test, Industry Knowledge module (nationaltransport.ie and the Official
  // Manual for Operating in the SPSV Industry, Edition 8.1, September 2026, checked 2026-11-05):
  // 54 questions in 54 minutes, 75% to pass; the Area Knowledge module (36 questions on the
  // chosen county) is not modelled. Three real-length tests of 54 at 75%: ceil(0.75 x 54) = 41.
  // The NTA publishes no per-chapter split, so these weights follow the Manual's chapters 1 to 10.
  // Each pool is 3x its count plus 2 to 6 training-only spares. All items original; single answer
  // only (the real test has a few "pick two" items).
  blueprint: {
    spsvIndustry: 4,
    spsvDriverLicence: 6,
    spsvVehicle: 5,
    spsvVehicleLicence: 5,
    spsvOperating: 8,
    spsvRoutes: 3,
    spsvFares: 5,
    spsvCustomer: 5,
    spsvAccessibility: 4,
    spsvBusiness: 3,
    spsvSafety: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 21001, name: "The Industry & Driver Licensing", categories: ["spsvIndustry", "spsvDriverLicence"], size: 37, weightLabel: "10 of 54 test questions" },
    { setNumber: 2, id: 21002, name: "Vehicles & Vehicle Licensing", categories: ["spsvVehicle", "spsvVehicleLicence"], size: 37, weightLabel: "10 of 54 test questions" },
    { setNumber: 3, id: 21003, name: "Operating Rules & Fares", categories: ["spsvOperating", "spsvFares"], size: 49, weightLabel: "13 of 54 test questions" },
    { setNumber: 4, id: 21004, name: "Customers & Accessibility", categories: ["spsvCustomer", "spsvAccessibility"], size: 33, weightLabel: "9 of 54 test questions" },
    { setNumber: 5, id: 21005, name: "Routes, Business & Safety", categories: ["spsvRoutes", "spsvBusiness", "spsvSafety"], size: 44, weightLabel: "12 of 54 test questions" },
  ],
  categoryLabels: {
    spsvIndustry: "The SPSV Industry & the NTA",
    spsvDriverLicence: "SPSV Driver Licensing",
    spsvVehicle: "Vehicle Standards & Age Rules",
    spsvVehicleLicence: "Vehicle Licensing",
    spsvOperating: "Working as an SPSV Operator",
    spsvRoutes: "Finding Your Way Around",
    spsvFares: "Fares, Receipts & Payment",
    spsvCustomer: "Customer Service & Complaints",
    spsvAccessibility: "Passengers with Disabilities",
    spsvBusiness: "Running Your SPSV Business",
    spsvSafety: "Staying Safe",
  },
  copy: {
    guestPrompt: "to save your SPSV Entry Test progress and track every question you miss",
    trainingHeading: "Train by Manual chapter",
    trainingSub: "Five sets covering all ten study chapters of the NTA's Official Manual. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 54 questions, 41 to pass (75%), like the real module",
    heroSubs: [
      "Ten Manual chapters, three real-length mock tests.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for Industry Knowledge.",
    ],
    sourceLine: "Original practice questions written from the NTA's Official Manual for Operating in the SPSV Industry (Edition 8.1, 2026). Industry Knowledge module only; not affiliated with the NTA. 54 per test, 75% to pass.",
    analyticsKey: "iespsv",
  },
};
```

Append `iespsv` to the `EXAMS` array with the other Ireland exams (after `iedttcv`).

Check: 21001-21005 (tests 21001-21003, sets 21001-21005) must be free; the batch table assigns
idBase 21000 to this row. Grepped: nothing at 21000 in `lib/exams.ts` or `lib/v2`.

## lib/banks/all.ts

```ts
import "./iespsv";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/iespsv.ts`.

## types/index.ts

- `QuestionType`: add `| "IESPSV"`.
- `QuestionCategory`, under a `// Ireland SPSV Driver Entry Test` comment:

```ts
  | "spsvIndustry"
  | "spsvDriverLicence"
  | "spsvVehicle"
  | "spsvVehicleLicence"
  | "spsvOperating"
  | "spsvRoutes"
  | "spsvFares"
  | "spsvCustomer"
  | "spsvAccessibility"
  | "spsvBusiness"
  | "spsvSafety"
```

(Grepped: no existing key starts with `spsv`.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; the six newer UI languages fall back)

```ts
    spsvIndustry: "The SPSV Industry & the NTA",
    spsvDriverLicence: "SPSV Driver Licensing",
    spsvVehicle: "Vehicle Standards & Age Rules",
    spsvVehicleLicence: "Vehicle Licensing",
    spsvOperating: "Working as an SPSV Operator",
    spsvRoutes: "Finding Your Way Around",
    spsvFares: "Fares, Receipts & Payment",
    spsvCustomer: "Customer Service & Complaints",
    spsvAccessibility: "Passengers with Disabilities",
    spsvBusiness: "Running Your SPSV Business",
    spsvSafety: "Staying Safe",
```

## app/globals.css

Hue from the international batch 4 table (262 85% 20%, already checked against every theme), a
deep taxi-night violet. Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Ireland SPSV Entry Test theme */
  [data-theme="iespsv"] {
    --brand: 262 85% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 262 60% 96%;
    --brand-hover: 262 85% 16%;
    --brand-dark: 262 85% 14%;
    --brand-darker: 262 80% 9%;
    --brand-muted: 262 30% 70%;
    --brand-border: 262 30% 80%;
    --brand-border-light: 262 30% 89%;
    --brand-gradient-to: 145 50% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `iespsv: "Mock tests for the Industry Knowledge module of Ireland's SPSV Driver Entry Test for taxi, hackney and limousine drivers: licensing, vehicle rules, ranks and bus lanes, fares, customers with disabilities and safety, from the NTA's Official Manual.",`
- `EXAM_ORG`: `iespsv: "NTA (Ireland) · SPSV Driver Entry Test, Industry Knowledge module",`
- Hub group: a new group placed right after `{ title: "Ireland driving tests", ids: ["iedtt", "iedttcv"] }`:
  `{ title: "Ireland licences and workplace certificates", ids: ["iesafepass", "iespsv", "ieqfa", "iepsa"] },`
  (the other three are this batch's iesafepass, ieqfa and iepsa; drop any that are not wired).
- `SEARCH_ALIASES`:
  `iespsv: "spsv spsv test spsv entry test spsv driver entry test industry knowledge test industry knowledge module taxi test ireland taxi licence ireland taxi driver test hackney licence hackney test limousine licence nta taxi test small public service vehicle skills development certificate area knowledge",`
- `RELATED_OVERRIDES` (the new group is small until the rest of the batch lands): 
  `iespsv: ["ukseru", "iedtt", "iesafepass"],`

## lib/region.ts

`iespsv: "IE",` in `TEST_REGIONS`, and add `"iespsv"` to `NON_DRIVING_TESTS` (it is a licensing
knowledge test, not a driving theory test).

`REGION_HOME.IE` (integrator's call, once the batch's Ireland tests land): the copy can widen from
driver theory tests to "driving, taxi and workplace tests". `faqsFor("IE")`, if it lists tests,
add: "Is there a practice test for the taxi SPSV Entry Test? Yes. Tigertest has free mock tests for
its Industry Knowledge module: 54 questions with 75% to pass, written from the NTA's Official
Manual."

## lib/examFacts.ts

```ts
  iespsv: {
    answer:
      "The SPSV Driver Entry Test is the National Transport Authority's computer test that everyone must pass before applying to An Garda Síochána for a licence to drive a taxi, hackney or limousine in Ireland (not needed for a local area hackney driver licence). It has two modules: Industry Knowledge, 54 multiple-choice questions on SPSV regulations and good practice from the NTA's Official Manual, and Area Knowledge, 36 questions on the county you want to work in. You need 75 percent in each module, and if you fail one you retake only that module, within 12 months.",
    rows: [
      { label: "Questions", value: "90: Industry Knowledge 54, Area Knowledge 36" },
      { label: "Time", value: "54 minutes and 36 minutes" },
      { label: "Pass mark", value: "75% in each module" },
      { label: "Format", value: "Multiple choice on a computer; a few ask for two answers" },
      { label: "Where", value: "Five NTA test locations around Ireland" },
      { label: "Study material", value: "NTA Official Manual for Operating in the SPSV Industry" },
      { label: "Pass one module", value: "Retake only the other, within 12 months" },
      { label: "Needed for", value: "An SPSV driver licence from An Garda Síochána" },
    ],
    basedOn: "the NTA's SPSV driver entry test page and the Official Manual for Operating in the SPSV Industry, Edition 8.1 (September 2026), checked November 2026",
    source: { name: "NTA: The SPSV driver entry test", url: "https://www.nationaltransport.ie/taxi/driver-licensing/applying-for-an-spsv-driver-licence/the-spsv-driver-entry-test/" },
  },
```
(The fee is left out: house style avoids money.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: not in the brief's teacher-led list (people self-study from the NTA's Manual), and the
landing renders no `ExamClassFaq`.

## lib/tigerAssets.ts

Borrow the DMV (driving) tiger like `iedtt`: add `iespsv: "driving",` to `BORROWED_SETS`. The
landing calls `getTigerAsset("iespsv", 1)`.

## Landing sample questions

The landing renders `<ExamSampleQuestions examId="iespsv" />` and imports `@/lib/banks/iespsv`
at the top, as the Ireland driving test landings do. Drop both lines if non-driving landings
should not carry samples.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: the `car` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (writes `lib/trainingParts.json` and
`lib/examBankSizes.json`). No set exceeds 60, so no parts. Then `npx tsx scripts/build-landing-dates.ts`.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing iespsv:spsv-entry-test:21001`
(the landing references `/landing/iespsv-mobile.png` and `/landing/iespsv-desktop.png`).

## CLAUDE.md (under Additional Exams, with the other Ireland exams)

```md
- **SPSV Entry Test** (`iespsv`, NTA SPSV Driver Entry Test, Industry Knowledge module, the test before an SPSV driver licence for taxi, hackney and limousine drivers in Ireland, `/spsv-entry-test/*`, landing `/spsv-entry-test-practice-test`): `data/spsv-entry-test-questions.json` (200 original questions written from the NTA's Official Manual for Operating in the SPSV Industry, Edition 8.1, September 2026, one category per study chapter: industry and NTA 15, driver licensing 22, vehicle standards and age rules 18, vehicle licensing 19, working as an operator 30, finding your way 11, fares 19, customer service 18, passengers with disabilities 15, business 11, staying safe 22), three real-length tests of 54 (test IDs 21001-21003), sets 21001-21005 (by chapter), state `IESPSV`, prefix `IESPSV-`, 75% pass (41 of 54, the real module's mark). 4/6/5/5/8/3/5/5/4/3/6 per test (Tigertest's weights; the NTA publishes none); the last items of each pool (38 in all) are training-only. The 36-question county Area Knowledge module and the real test's few "pick two" items are not modelled. No fees, fines or fare amounts (fare rules as concepts under the Order in force from 1 December 2024). Built by `tools/next100/iespsv/build.py`; sources in `tools/next100/iespsv/sources.md`. Region IE, hub group "Ireland licences and workplace certificates", `[data-theme="iespsv"]` deep violet (262 85% 20%), borrows the DMV tiger.
```
