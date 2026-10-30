# Wiring for `ukseru` (London private hire SERU assessment, UK, v1)

Files already written by the builder: `data/seru-questions.json` (200, PASS), `lib/banks/ukseru.ts`,
`app/seru/*` (8 wrappers, copied from `app/life-in-the-uk/`), `app/seru-practice-test/page.tsx`,
`tools/next30/ukseru/*` (spec, sources, `q_*.py`, `build.py`). Everything below goes in shared files.

Format note: 5 tests of 36 questions (TfL does not publish the count; driver guides report 36 or
37 questions, 60% pass), 5 training sets by handbook section, so the dashboard is 10 steps. Pass
line `ceil(0.60 * 36) = 22`. Each pool is 5x its per-test count plus 2 training-only spares (the
last two items of each segment), so no item repeats across tests. `examTestQuestions` reads
`testCount` / `questionsPerTest` generically, as for `uklitu` (8 x 24).

## lib/exams.ts

Add `"ukseru"` to the `ExamId` union. Icon `car` already exists in the icon union.

```ts
const ukseru: ExamConfig = {
  id: "ukseru",
  stateCode: "UKSERU",
  idBase: 11900,
  slug: "/seru",
  landingPath: "/seru-practice-test",
  name: "SERU Practice Test",
  shortName: "SERU",
  examLabel: "SERU assessment",
  fullName: "SERU assessment (London private hire driver Safety, Equality and Regulatory Understanding)",
  questionIdPrefix: "UKSERU-",
  icon: "car",
  testCount: 5,
  questionsPerTest: 36,
  passPct: 60,
  // TfL's Safety, Equality and Regulatory Understanding assessment for London PHV drivers, based
  // only on the TfL PHV Driver's Handbook, version 1.0 (30 September 2021; still current as of
  // October 2026). TfL publishes no question count or per-section split; driver guides report
  // 36 to 37 questions (multiple choice, sentence completion, 2 reading passages) in 45 to 60
  // minutes and a 60% pass mark. Here: 5 tests of 36 four-option items weighted by handbook
  // section length; each pool is 5x its count plus 2 training-only spares. All items original.
  blueprint: {
    serLicensing: 6,
    serVehicles: 2,
    serJourneys: 5,
    serSafety: 4,
    serBehaviour: 3,
    serParking: 5,
    serDriving: 4,
    serEquality: 4,
    serSafeguarding: 2,
    serRideshare: 1,
  },
  trainingSets: [
    { setNumber: 1, id: 11901, name: "Licensing & Vehicles", categories: ["serLicensing", "serVehicles"], size: 44, weightLabel: "8 of 36 test questions" },
    { setNumber: 2, id: 11902, name: "Journeys & Ridesharing", categories: ["serJourneys", "serRideshare"], size: 34, weightLabel: "6 of 36 test questions" },
    { setNumber: 3, id: 11903, name: "Staying Safe & Driver Behaviour", categories: ["serSafety", "serBehaviour"], size: 39, weightLabel: "7 of 36 test questions" },
    { setNumber: 4, id: 11904, name: "Driving & Parking in London", categories: ["serParking", "serDriving"], size: 49, weightLabel: "9 of 36 test questions" },
    { setNumber: 5, id: 11905, name: "Equality & Safeguarding", categories: ["serEquality", "serSafeguarding"], size: 34, weightLabel: "6 of 36 test questions" },
  ],
  categoryLabels: {
    serLicensing: "London PHV Driver Licensing",
    serVehicles: "Licensing Requirements for PHVs",
    serJourneys: "Carrying Out Private Hire Journeys",
    serSafety: "Staying Safe",
    serBehaviour: "Driver Behaviour",
    serParking: "Driving & Parking in London",
    serDriving: "Safer Driving",
    serEquality: "Equality & Disability",
    serSafeguarding: "Safeguarding Children & Adults at Risk",
    serRideshare: "Ridesharing",
  },
  copy: {
    guestPrompt: "to save your SERU progress and track every question you miss",
    trainingHeading: "Train by handbook section",
    trainingSub: "Five sets covering all ten sections of the PHV Driver's Handbook. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 36 questions, 22 to pass (60%)",
    heroSubs: [
      "Ten handbook sections, five mock tests.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for SERU.",
    ],
    sourceLine: "Original practice questions based on the published SERU guide, TfL's PHV Driver's Handbook (version 1.0). Not affiliated with TfL; 36 per test, 60% to pass.",
    analyticsKey: "ukseru",
  },
};
```

Append `ukseru` to the `EXAMS` array with the other UK exams.

Check: 11901-11905 (tests and sets) must be free; the SPEC assigns idBase 11900 to this row.

## lib/banks/all.ts

```ts
import "./ukseru";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/ukseru.ts`.

## types/index.ts

- `QuestionType`: add `| "UKSERU"`.
- `QuestionCategory`, under a `// London private hire SERU` comment:

```ts
  | "serLicensing"
  | "serVehicles"
  | "serJourneys"
  | "serSafety"
  | "serBehaviour"
  | "serParking"
  | "serDriving"
  | "serEquality"
  | "serSafeguarding"
  | "serRideshare"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    serLicensing: "London PHV Driver Licensing",
    serVehicles: "Licensing Requirements for PHVs",
    serJourneys: "Carrying Out Private Hire Journeys",
    serSafety: "Staying Safe",
    serBehaviour: "Driver Behaviour",
    serParking: "Driving & Parking in London",
    serDriving: "Safer Driving",
    serEquality: "Equality & Disability",
    serSafeguarding: "Safeguarding Children & Adults at Risk",
    serRideshare: "Ridesharing",
```

## app/globals.css

Light block (suggested hue 200, a London-transport teal blue; re-pick if it clashes), then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* London private hire SERU theme */
  [data-theme="ukseru"] {
    --brand: 200 75% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 200 85% 96%;
    --brand-hover: 200 75% 28%;
    --brand-dark: 200 75% 24%;
    --brand-darker: 200 70% 16%;
    --brand-muted: 200 35% 72%;
    --brand-border: 200 35% 80%;
    --brand-border-light: 200 35% 89%;
    --brand-gradient-to: 220 60% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ukseru: "Mock tests for the SERU assessment London private hire drivers take: licensing rules, red routes and bus lanes, passenger safety, equality and safeguarding, from the PHV Driver's Handbook.",`
- `EXAM_ORG`: `ukseru: "London PHV driver licence · PHV Driver's Handbook v1.0",` (no TfL name in the org line,
  to avoid implying affiliation; change to "TfL (London) · PHV driver licence" only if the other
  regulator-named lines such as "DVSA (Great Britain)" are judged fine for this one too).
- Hub group: add `"ukseru"` to `{ title: "UK workplace and trade certificates", ... }`
  (alternative: the "UK driving and instructor theory tests" group, but SERU is a licensing
  knowledge test, not a driving theory test).
- `SEARCH_ALIASES`:
  `ukseru: "seru seru test seru assessment tfl seru safety equality and regulatory understanding pco licence pco test private hire driver phv driver minicab uber driver london phv handbook topographical",`

## lib/region.ts

`ukseru: "UK",` in `TEST_REGIONS`, and add `"ukseru"` to `NON_DRIVING_TESTS` (it is a licensing
knowledge test, not a driving theory test; drop it from that list if the integrator files it with
the UK driving tests instead).

## lib/examFacts.ts

```ts
  ukseru: {
    answer:
      "SERU (Safety, Equality and Regulatory Understanding) is the computer-based assessment that people applying for or holding a London private hire (PHV) driver's licence take at a TfL assessment centre. It tests the PHV Driver's Handbook: licensing rules, carrying out bookings, staying safe, driver behaviour, driving and parking in London, equality and disability, safeguarding and ridesharing. Passing it also shows the English reading and writing a London PHV licence needs. TfL does not publish the question count; driver guides report about 36 to 37 multiple-choice and sentence-completion questions with a 60 percent pass mark.",
    rows: [
      { label: "Questions", value: "About 36 to 37 (reported)" },
      { label: "Format", value: "Multiple choice and sentence completion" },
      { label: "Time", value: "45 to 60 minutes (reported)" },
      { label: "Pass mark", value: "About 60% (reported)" },
      { label: "Where", value: "TfL assessment centre, on a computer" },
      { label: "Study material", value: "PHV Driver's Handbook, version 1.0" },
      { label: "Also counts for", value: "English reading and writing" },
      { label: "Needed for", value: "A London PHV driver's licence" },
    ],
    basedOn: "the PHV Driver's Handbook (version 1.0, September 2021) and TfL's SERU requirement page, checked October 2026",
    source: { name: "TfL: Safety, equality and regulatory understanding requirement", url: "https://tfl.gov.uk/info-for/taxis-and-private-hire/safety-equality-and-regulatory-understanding-requirement" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: not a classroom exam, and the landing does not render `ExamClassFaq`.

## lib/tigerAssets.ts

Nothing: falls back to the DMV tiger.

## Landing breadcrumbs

`ExamLandingBreadcrumbs` does not exist in this tree and the template landing (`app/life-in-the-uk-test`)
does not render one. If the integrator adds it, place `<ExamLandingBreadcrumbs examId="ukseru" />`
right after the JSON-LD script in `app/seru-practice-test/page.tsx`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ukseru:seru:11901`

## CLAUDE.md (under Additional Exams)

```md
- **SERU** (London private hire driver Safety, Equality and Regulatory Understanding assessment, `/seru/*`, landing `/seru-practice-test`): `data/seru-questions.json` (200 original questions based on TfL's PHV Driver's Handbook v1.0, Sept 2021, one category per handbook section: licensing 32, vehicles 12, journeys 27, staying safe 22, behaviour 17, driving and parking 27, safer driving 22, equality 22, safeguarding 12, ridesharing 7), five tests of 36 (test IDs 11901-11905), sets 11901-11905, state `UKSERU`, 60% pass (22 of 36). 6/2/5/4/3/5/4/4/2/1 per test; the last two items of each pool are training-only. TfL publishes no count or pass mark (36-37 questions and 60% are reported by driver guides), and the copy never implies TfL affiliation. Built by `tools/next30/ukseru/build.py`; sources in `tools/next30/ukseru/sources.md`.
```
