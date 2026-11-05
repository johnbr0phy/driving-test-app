# Wiring for `nzheavy` (New Zealand Class 2 heavy vehicle learner licence theory test; NZ, v1)

Files already written by the builder: `data/nz-heavy-vehicle-licence-questions.json` (200, PASS),
`lib/banks/nzheavy.ts`, `app/nz-heavy-vehicle-licence/*` (5 wrappers copied from
`app/ireland-truck-bus-theory/`: layout, redirect, dashboard, drill, stats; no test or practice
folders), `app/nz-class-2-licence-practice-test/page.tsx`, `tools/next100/nzheavy/*` (spec,
sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/nzheavy/build.py` (writes the
data file and prints the key-longest share). Everything below goes in shared files.

FORMAT NOT CONFIRMED (read `sources.md`): nzta.govt.nz and legislation.govt.nz blocked automated
reads, so the real Class 2 count and pass mark are confirmed only by a secondary source (Wikipedia: heavy learner test 35 questions, 33 to pass).
Modelled as five 35-question tests, 33 to pass (`passPct: 94`), the reported heavy learner pass mark, labelled
"reported, check with NZTA" on the landing and in examFacts. If the integrator can read NZTA's page, adjust
`questionsPerTest`/`passPct`/copy (pools allow up to 5 x 34 per category mix shown in spec.json).
Five topic sets cover all 200 items (25 are training-only, the last of each pool), so the dashboard
is 5 sets + 5 tests = 10 steps.

## lib/exams.ts

Add `"nzheavy"` to the `ExamId` union. Icon `truck` already exists.

Block (with the other driving tests, after `nzroad`):

```ts
const nzheavy: ExamConfig = {
  id: "nzheavy",
  stateCode: "NZHEAVY",
  idBase: 21400,
  slug: "/nz-heavy-vehicle-licence",
  landingPath: "/nz-class-2-licence-practice-test",
  name: "NZ Class 2 Licence Practice Test",
  shortName: "NZ Class 2 licence",
  examLabel: "Class 2 theory test",
  fullName: "New Zealand Class 2 heavy vehicle learner licence theory test",
  questionIdPrefix: "NZHV-",
  icon: "truck",
  testCount: 5,
  questionsPerTest: 35,
  passPct: 94,
  // NZTA Class 2 (medium rigid) learner licence theory test. Its count and pass mark could not be
  // read on nzta.govt.nz (bot wall, 2026-11-05): modelled as 35 questions,
  // 33 to pass as reported by Wikipedia. passPct 94 = ceil(0.94 * 35) = 33. NZTA
  // publishes no topic weights; these are Tigertest's, weighted to heavy vehicle content: licence
  // classes, the Work Time and Logbooks Rule 2007, mass and dimensions, the Truck Loading Code, air
  // brakes, the 90 km/h heavy vehicle limit. Pools are 5x each count plus 25 training-only spares.
  // All items original; signs described in words.
  blueprint: {
    nzhvLicence: 4,
    nzhvWork: 6,
    nzhvMass: 6,
    nzhvBrakes: 6,
    nzhvRoad: 5,
    nzhvSharing: 5,
    nzhvSafety: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 21401, name: "Licences & Work Time", categories: ["nzhvLicence", "nzhvWork"], size: 57, weightLabel: "10 of 35 test questions" },
    { setNumber: 2, id: 21402, name: "Mass, Dimensions & Loads", categories: ["nzhvMass"], size: 34, weightLabel: "6 of 35 test questions" },
    { setNumber: 3, id: 21403, name: "Air Brakes & Vehicle Checks", categories: ["nzhvBrakes"], size: 34, weightLabel: "6 of 35 test questions" },
    { setNumber: 4, id: 21404, name: "Speed, Hills & Emergencies", categories: ["nzhvRoad", "nzhvSafety"], size: 46, weightLabel: "8 of 35 test questions" },
    { setNumber: 5, id: 21405, name: "Sharing the Road", categories: ["nzhvSharing"], size: 29, weightLabel: "5 of 35 test questions" },
  ],
  categoryLabels: {
    nzhvLicence: "Licences, Classes & Alcohol",
    nzhvWork: "Work Time & Logbooks",
    nzhvMass: "Mass, Dimensions & Loads",
    nzhvBrakes: "Air Brakes & Vehicle Checks",
    nzhvRoad: "Speed, Hills & Road Position",
    nzhvSharing: "Sharing the Road & Blind Spots",
    nzhvSafety: "Weather, Breakdowns & Emergencies",
  },
  copy: {
    guestPrompt: "to save your Class 2 theory progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets cover all 200 questions: licences and work time, loads, brakes, the road and sharing it. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 35 questions, 33 to pass",
    heroSubs: [
      "Five tests on work time, logbooks, loads, air brakes and heavy vehicle rules.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Check the current test details with NZTA and book your Class 2 theory test.",
    ],
    sourceLine: "Original questions written from New Zealand rules for heavy vehicle drivers (2026). 33 of 35 is the reported pass mark; check the real test's pass mark with NZTA. Not affiliated with NZTA Waka Kotahi.",
    analyticsKey: "nzheavy",
  },
};
```

Append `nzheavy` to the `EXAMS` array right after `nzroad`.

Check: 21401-21405 (tests and sets) must be free (batch table assigns idBase 21400).

## lib/banks/all.ts

```ts
import "./nzheavy";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/nzheavy.ts`.

## types/index.ts

- `QuestionType`: add `| "NZHEAVY"`.
- `QuestionCategory`, under a `// New Zealand Class 2 heavy vehicle theory test` comment:

```ts
  | "nzhvLicence"
  | "nzhvWork"
  | "nzhvMass"
  | "nzhvBrakes"
  | "nzhvRoad"
  | "nzhvSharing"
  | "nzhvSafety"
```

(Grepped: no existing key starts with `nzhv`.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; the six newer UI languages fall back)

```ts
    nzhvLicence: "Licences, Classes & Alcohol",
    nzhvWork: "Work Time & Logbooks",
    nzhvMass: "Mass, Dimensions & Loads",
    nzhvBrakes: "Air Brakes & Vehicle Checks",
    nzhvRoad: "Speed, Hills & Road Position",
    nzhvSharing: "Sharing the Road & Blind Spots",
    nzhvSafety: "Weather, Breakdowns & Emergencies",
```

## app/globals.css

Hue from the international batch 4 table (80 40% 20%, already checked by the batch script). Then
run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* New Zealand Class 2 heavy vehicle licence theory test theme */
  [data-theme="nzheavy"] {
    --brand: 80 40% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 80 40% 95%;
    --brand-hover: 80 40% 16%;
    --brand-dark: 80 40% 15%;
    --brand-darker: 80 40% 10%;
    --brand-muted: 80 20% 68%;
    --brand-border: 80 25% 78%;
    --brand-border-light: 80 22% 88%;
    --brand-gradient-to: 40 80% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nzheavy: "New Zealand's Class 2 heavy vehicle theory test for a medium rigid truck licence: work time and logbooks, mass and load restraint, air brakes, the 90 km/h heavy vehicle limit and sharing the road, in five 35-question tests.",`
- `EXAM_ORG`: `nzheavy: "NZTA Waka Kotahi · Class 2 learner licence theory test",`
- Hub group: add to the existing NZ driving group (it is a driving test; nzmoto joins it too):
  `{ title: "New Zealand driving tests", ids: ["nzroad", "nzheavy"] },`
- `SEARCH_ALIASES`:
  `nzheavy: "class 2 licence nz class 2 theory test class 2 learner licence nz truck licence heavy vehicle licence nz heavy vehicle road code medium rigid truck licence nzta class 2 logbook rules nz work time rules nz truck theory test new zealand class 4 class 5 truck licence nz",`
- `RELATED_OVERRIDES`: `nzheavy: ["nzroad", "uklgv", "iedttcv"],`
  and consider `nzroad: ["nzheavy", "aunsw", "auvic"],` (replacing the current `nzroad` override).

## lib/region.ts

`nzheavy: "NZ",` in `TEST_REGIONS` (next to `nzroad`). Not in `NON_DRIVING_TESTS` (driving test).

`REGION_HOME.NZ` (integrator's call; merge with nzmoto and nzsfe lines from the same batch):
- add "the Class 2 heavy vehicle theory test" to `description` and `lead`; title could become
  "Free NZ Practice Tests: Learner, Class 2, Firearms & LCQ | Tigertest".

`faqsFor("NZ")`, if it lists tests, add: "Is there a practice test for the Class 2 truck licence?
Yes. Tigertest has a free Class 2 heavy vehicle theory practice test: work time and logbooks,
loads, air brakes and heavy vehicle rules. You need a full Class 1 licence before you can apply."

## lib/examFacts.ts

```ts
  nzheavy: {
    answer:
      "The Class 2 theory test is the computer test you pass in New Zealand to get a learner licence for a medium rigid truck: a rigid vehicle over 6,000 kg and up to 18,000 kg gross laden weight or a combination up to 12,000 kg. You need a full Class 1 licence first. It covers the heavy vehicle Road Code, including work time and logbook rules. Tigertest's practice tests are 35 questions with 33 to pass, the pass mark reported for the heavy learner test; check the official count and pass mark with NZTA.",
    rows: [
      { label: "Licence", value: "Class 2 learner licence (medium rigid vehicles)" },
      { label: "You need first", value: "A full Class 1 (car) licence" },
      { label: "Vehicles covered", value: "Rigid over 6,000 kg up to 18,000 kg GLW; combinations up to 12,000 kg" },
      { label: "Practice target", value: "33 of 35 (reported; check with NZTA)" },
      { label: "Work time", value: "5.5 h then 30 min break; 13 h a work day; 70 h then 24 h off" },
      { label: "Run by", value: "NZTA Waka Kotahi" },
    ],
    basedOn: "New Zealand heavy vehicle rules as in force November 2026; NZTA's test page could not be read",
    source: { name: "NZTA Waka Kotahi heavy vehicle licences", url: "https://www.nzta.govt.nz/driver-licences/getting-a-licence/" },
  },
```
(Fees left out: house style avoids money.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not teacher-led.

## lib/tigerAssets.ts

Borrow the CDL tiger like `uklgv` and `iedttcv`: add `nzheavy: "cdl",` to `BORROWED_SETS` (next to
`nzroad: "driving"`). The landing calls `getTigerAsset("nzheavy", 1)`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: the `truck` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 57/34/34/46/29, all under 60,
so no parts. Then `npx tsx scripts/build-landing-dates.ts`.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nzheavy:nz-heavy-vehicle-licence:21401`
(the landing references `/landing/nzheavy-mobile.png` and `/landing/nzheavy-desktop.png`).

## CLAUDE.md (under Additional Exams, after the NZ Learner Licence bullet)

```md
- **NZ Class 2 Licence** (`nzheavy`, NZTA Waka Kotahi Class 2 heavy vehicle learner licence theory test, medium rigid trucks, `/nz-heavy-vehicle-licence/*`, landing `/nz-class-2-licence-practice-test`): `data/nz-heavy-vehicle-licence-questions.json` (200 original questions: licences, classes and alcohol 23, work time and logbooks 34, mass, dimensions and loads 34, air brakes and vehicle checks 34, speed, hills and road position 29, sharing the road and blind spots 29, weather, breakdowns and emergencies 17), five 35-question tests (test IDs 21401-21405, 4/6/6/6/5/5/3 per test, Tigertest's weights), sets 21401-21405 by topic (25 items training-only), state `NZHEAVY`, prefix `NZHV-`, 94% pass (33 of 35, the heavy learner pass mark reported by a secondary source: NZTA's heavy vehicle pages blocked automated reads, so it was not confirmed on an official page and the landing says so). Work Time and Logbooks Rule (5.5 h then 30 min, 13 h day then 10 h rest, 70 h then 24 h), licence classes by GLW, 90 km/h heavy motor vehicle limit (school buses 80), 2.55 m and 4.3 m, Truck Loading Code 0.8/0.5/0.2, the 1 October 2026 cyclist and bus rules; no fees, RUC rates or stage durations. Kept clear of `nzroad`, `uklgv`, `ukpcv`, `iedttcv`, `cdl` and `zak53c3` stems. Built by `tools/next100/nzheavy/build.py`; sources in `tools/next100/nzheavy/sources.md`. Region NZ, hub group "New Zealand driving tests", `[data-theme="nzheavy"]` dark olive (80 40% 20%), borrows the CDL tiger.
```
