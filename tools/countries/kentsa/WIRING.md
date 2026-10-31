# Wiring for `kentsa` (Kenya NTSA driving test theory, KE, v1)

Files already written by the builder: `data/kenya-ntsa-questions.json` (200, PASS),
`lib/banks/kentsa.ts`, `app/kenya-driving-test/*` (8 wrappers, copied from `app/nz-learner-licence/`),
`app/kenya-ntsa-driving-test/page.tsx` (landing), `tools/countries/kentsa/*` (spec, sources,
`q_*.py`, `build.py`). Rebuild with `python3 -I tools/countries/kentsa/build.py`. Everything below
goes in shared files.

Format note: four tests of 50, 40 to pass. `passPct: 80` gives `ceil(0.8 * 50) = 40`. NTSA
publishes no current count or pass mark, so 80% is Tigertest's target (it matches the 80% NTSA's
2019 written-test guidelines set, as reported by Business Daily). Every pool is exactly 4x its
per-test count, so there are no spares and no item repeats across tests. Dashboard = 5 training
sets + 4 tests = 9 steps.

Already present in the tree when this builder ran (integrator pre-wiring), so nothing to add:
`lib/region.ts` (`kentsa: "KE"` in `TEST_REGIONS`, `REGION_HOME.KE`), `lib/tigerAssets.ts`
(`kentsa: "driving"`), `lib/testCatalog.ts` hub group `{ title: "Kenya driving tests", ids: ["kentsa"] }`
and `RELATED_OVERRIDES` `kentsa: ["zak53", "ngfrsc", "ukcar"]`. Check `REGION_HOME.KE` copy: it
says "Four full 50-question tests", which matches.

## lib/exams.ts

Add `"kentsa"` to the `ExamId` union. Icon `car` already exists.

```ts
const kentsa: ExamConfig = {
  id: "kentsa",
  stateCode: "KENTSA",
  idBase: 12700,
  slug: "/kenya-driving-test",
  landingPath: "/kenya-ntsa-driving-test",
  name: "Kenya NTSA Driving Test Practice",
  shortName: "Kenya driving test",
  examLabel: "NTSA driving test",
  fullName: "Kenya NTSA driving test theory (Highway Code, Category B)",
  questionIdPrefix: "KENTSA-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Source: the Kenya Highway Code (NTSA) and the Traffic Act (Cap. 403), with the 2026
  // drink-driving rules (LN 12/2026: zero for PSV, commercial and school transport drivers,
  // 35 micrograms per 100 ml of breath for others). NTSA publishes no current question count,
  // pass mark or per-topic split for the theory part; its 2019 written-test guidelines (Business
  // Daily, 13 Dec 2019) set a minimum of 50 multiple-choice questions and 80% to pass, so four
  // 50-question tests at 80% (40 of 50) is Tigertest's target. Topic weights are Tigertest's own.
  // Pools are exactly 4x each count (no spares). Rules as checked on 2026-10-31. All items original.
  blueprint: {
    keLicence: 8,
    keSigns: 10,
    keJunctions: 8,
    keRoad: 9,
    keUsers: 6,
    keParking: 5,
    keConditions: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 12701, name: "Licences, Alcohol & Vehicle Care", categories: ["keLicence", "keConditions"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 2, id: 12702, name: "Road Signs & Signals", categories: ["keSigns"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 12703, name: "Junctions & Roundabouts", categories: ["keJunctions"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 4, id: 12704, name: "Speed, Overtaking & Road Position", categories: ["keRoad"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 12705, name: "Sharing the Road, Parking & Crashes", categories: ["keUsers", "keParking"], size: 44, weightLabel: "11 of 50 test questions" },
  ],
  categoryLabels: {
    keLicence: "Licences, Alcohol & the Law",
    keSigns: "Road Signs & Signals",
    keJunctions: "Junctions & Roundabouts",
    keRoad: "Speed, Overtaking & Road Position",
    keUsers: "Sharing the Road",
    keParking: "Parking, Breakdowns & Crashes",
    keConditions: "Night, Weather & Vehicle Care",
  },
  copy: {
    guestPrompt: "to save your NTSA driving test progress and track every question you miss",
    trainingHeading: "Train by Highway Code topic",
    trainingSub: "Five sets covering the Kenya Highway Code and the Traffic Act rules the theory test asks about. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 40 or more",
    heroSubs: [
      "Five topics, four 50-question tests. Signs weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your NTSA driving test.",
    ],
    sourceLine: "Based on the Kenya Highway Code and the Traffic Act. Original questions; 50 per test, 80% is Tigertest's target.",
    analyticsKey: "kentsa",
  },
};
```

Append `kentsa` to the `EXAMS` array with the other driving tests. Check: ids 12701-12705 (tests
12701-12704, sets 12701-12705) must be free (BRIEF.md reserves the 12700 block for this exam).

## lib/banks/all.ts

```ts
import "./kentsa";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/kentsa.ts`.

## types/index.ts

`ke*` keys were checked free (no `"ke[A-Z]` keys in `types/index.ts` on 2026-10-31).

- `QuestionType`: add `| "KENTSA"`.
- `QuestionCategory`, under a `// Kenya NTSA driving test` comment:

```ts
  | "keLicence"
  | "keSigns"
  | "keJunctions"
  | "keRoad"
  | "keUsers"
  | "keParking"
  | "keConditions"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    keLicence: "Licences, Alcohol & the Law",
    keSigns: "Road Signs & Signals",
    keJunctions: "Junctions & Roundabouts",
    keRoad: "Speed, Overtaking & Road Position",
    keUsers: "Sharing the Road",
    keParking: "Parking, Breakdowns & Crashes",
    keConditions: "Night, Weather & Vehicle Care",
```

## app/globals.css

Hue from BRIEF.md (182 90% 26%, a deep teal). Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Kenya NTSA driving test theme */
  [data-theme="kentsa"] {
    --brand: 182 90% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 182 60% 95%;
    --brand-hover: 182 90% 21%;
    --brand-dark: 182 90% 18%;
    --brand-darker: 182 80% 12%;
    --brand-muted: 182 35% 68%;
    --brand-border: 182 35% 76%;
    --brand-border-light: 182 30% 87%;
    --brand-gradient-to: 150 50% 95%;
  }
```

## lib/testCatalog.ts

(Hub group and `RELATED_OVERRIDES` are already in the tree; add only these.)

- `EXAM_BLURBS`:
  `kentsa: "Four 50-question mock tests for the theory part of Kenya's NTSA driving test: road signs, roundabouts, overtaking, matatus and boda bodas, breakdowns, crashes and the 2026 alcohol limits, from the Kenya Highway Code and the Traffic Act.",`
- `EXAM_ORG`: `kentsa: "NTSA (Kenya) · Highway Code and Traffic Act",`
- `SEARCH_ALIASES`:
  `kentsa: "ntsa driving test kenya driving test ntsa theory test kenya highway code highway code kenya questions ntsa test questions and answers kenya driving licence test class b provisional licence kenya driving school test",`

## lib/region.ts

Already present: `kentsa: "KE",` in `TEST_REGIONS`. It is a driving test, so NOT in
`NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  kentsa: {
    answer:
      "To get a driving licence in Kenya you train at a registered driving school and then pass the NTSA driving test, which by law covers the rules of the road, road signs and signals, the Highway Code and your fitness to drive. NTSA does not publish a current question count or pass mark for the theory part; its 2019 guidelines for written tests set at least 50 multiple-choice questions and 80% to pass. You must be at least 18 for a car licence and able to read a number plate at 25 metres. While learning you drive on a provisional licence, with L plates on the front and rear and a qualified driver licensed for that class beside you.",
    rows: [
      { label: "Questions", value: "Not published by NTSA (2019 guidelines: at least 50)" },
      { label: "Pass mark", value: "Not published by NTSA (2019 guidelines: 80%)" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 80% target" },
      { label: "Minimum age (car)", value: "18 (motorcycles 16)" },
      { label: "Eyesight", value: "Read a number plate at 25 metres" },
      { label: "Learners", value: "Provisional licence, L plates front and rear" },
      { label: "Study material", value: "Kenya Highway Code and the Traffic Act" },
      { label: "Run by", value: "National Transport and Safety Authority (NTSA)" },
    ],
    basedOn: "Traffic Act (Cap. 403) sections 30 to 33 and 39, the 2026 drink-driving rules and NTSA's 2019 written-test guidelines as reported by Business Daily, checked October 2026",
    source: { name: "Traffic Act (Cap. 403) on Kenya Law", url: "https://new.kenyalaw.org/akn/ke/act/1953/39/eng@2022-12-31" },
  },
```
(Fees left out: house style avoids money figures. No model town board claim, per the brief.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

Already present (`kentsa: "driving"`).

## Landing breadcrumbs

The brief asks for `<ExamLandingBreadcrumbs examId>`, but no such component exists in this tree
(grep of `app/`, `components/`, `lib/` finds none, and the NZ template does not render one), so the
landing does not import it. If the integrator adds it, place
`<ExamLandingBreadcrumbs examId="kentsa" />` right after the JSON-LD `<script>` in
`app/kenya-ntsa-driving-test/page.tsx`. The landing renders `ExamFacts` and `ExamRelatedTests`.
The FAQ is one `faqs` array rendered both as JSON-LD and on the page.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing kentsa:kenya-driving-test:12701`

## CLAUDE.md (under Additional Exams)

```md
- **Kenya NTSA** (theory part of the Kenya NTSA driving test, Category B car, `/kenya-driving-test/*`, landing `/kenya-ntsa-driving-test`): `data/kenya-ntsa-questions.json` (200 original questions from the Kenya Highway Code and the Traffic Act: licences/alcohol/law 32, signs and signals 40, junctions and roundabouts 32, speed/overtaking/road position 36, sharing the road 24, parking/breakdowns/crashes 20, night/weather/vehicle care 16), test IDs 12701-12704, sets 12701-12705, state `KENTSA`, 80% pass (40 of 50, Tigertest's target: NTSA publishes no current count or pass mark; its 2019 guidelines said at least 50 questions and 80%). 8/10/8/9/6/5/4 per test, no spares. Drink driving per LN 12/2026 (zero for PSV, commercial and school transport drivers, 35 µg per 100 ml of breath for others); camera instant fines, the second-generation smart DL, open-road car speed limits and provisional licence validity are left out. Signs are described in words. Built by `tools/countries/kentsa/build.py`; sources in `tools/countries/kentsa/sources.md`. Region KE, hub group "Kenya driving tests".
```
