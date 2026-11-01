# Wiring for `setrafik` (Sweden, Trafikverket knowledge test for a category B licence, v1)

Files already written by the builder: `data/sweden-driving-theory-questions.json` (200, PASS),
`lib/banks/setrafik.ts`, `app/sweden-driving-theory/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/sweden-driving-theory-test/page.tsx`, `tools/next100/setrafik/*`
(spec, sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/setrafik/build.py`.
Everything below goes in shared files.

Format note: the real test is 70 questions (5 unscored) in 50 minutes, pass 52 of 65 (80%), offered
in Swedish and 15 other languages including British English. Tigertest models four 50-question
tests at the same 80% line (40 of 50). Trafikverket publishes no per-area weights; the blueprint
follows guides' reported split (traffic rules about half, safety about a quarter). Pools are
exactly 4x each per-test count (no spares). Dashboard = 5 topic sets + 4 tests = 9 steps. No set
exceeds 60.

## lib/exams.ts

Add `"setrafik"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests, after `pkdrive` or with the EU batch):

```ts
const setrafik: ExamConfig = {
  id: "setrafik",
  stateCode: "SETRAFIK",
  idBase: 14000,
  slug: "/sweden-driving-theory",
  landingPath: "/sweden-driving-theory-test",
  name: "Sweden Driving Theory Practice Test",
  shortName: "Sweden theory test",
  examLabel: "Swedish driving theory test",
  fullName: "Trafikverket knowledge test (kunskapsprov) for a category B licence",
  questionIdPrefix: "SETRF-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Source: Trafikverket "Kunskapsprov B" (updated 23 Sept 2026): 70 questions, 5 unscored, 65 max,
  // 52 to pass, 50 minutes, five subject areas (vehicle knowledge and handling, environment,
  // traffic safety, traffic rules, personal prerequisites) with no published weights. Weights are
  // Tigertest's, following guides' reported 7/5/32/16/5 of 65; traffic rules split into five
  // categories. Rules: Trafikförordningen 1998:1276, Körkortslagen, Lag 1951:649 and
  // Transportstyrelsen guidance as of November 2026. Checked 2026-11-01. Pools exactly 4x each
  // count (no spares). All items original; signs described in words, picture items not modelled.
  blueprint: {
    setrJunctions: 7,
    setrSigns: 8,
    setrMarkings: 5,
    setrSpeed: 6,
    setrParking: 4,
    setrSafety: 9,
    setrVehicle: 4,
    setrEnvironment: 3,
    setrPersonal: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 14001, name: "Road Signs", categories: ["setrSigns"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 2, id: 14002, name: "Junctions, Markings & Lights", categories: ["setrJunctions", "setrMarkings"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 3, id: 14003, name: "Speed, Lanes, Parking & Motorways", categories: ["setrSpeed", "setrParking"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 14004, name: "Traffic Safety, Wildlife & Winter", categories: ["setrSafety"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 14005, name: "Vehicle, Environment & You", categories: ["setrVehicle", "setrEnvironment", "setrPersonal"], size: 44, weightLabel: "11 of 50 test questions" },
  ],
  categoryLabels: {
    setrJunctions: "Right of Way & Junctions",
    setrSigns: "Road Signs",
    setrMarkings: "Road Markings & Traffic Lights",
    setrSpeed: "Speed, Overtaking & Lanes",
    setrParking: "Stopping, Parking & Motorways",
    setrSafety: "Traffic Safety, Wildlife & Winter",
    setrVehicle: "Vehicle Knowledge & Handling",
    setrEnvironment: "Environment & Eco-driving",
    setrPersonal: "Personal Factors & Your Licence",
  },
  copy: {
    guestPrompt: "to save your theory test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the Swedish traffic rules, signs and safety topics Trafikverket's theory test covers. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 40 or more",
    heroSubs: [
      "Five topics, four 50-question tests. Right of way weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your theory test with Trafikverket.",
    ],
    sourceLine: "Based on Swedish traffic rules and Trafikverket's theory test areas. Original questions; 50 per test, 80% to pass like the real 52 of 65.",
    analyticsKey: "setrafik",
  },
};
```

Append `setrafik` to the `EXAMS` array with the other driving tests.

Check: 14001-14005 (sets) and 14001-14004 (tests) must be free (BRIEF reserves idBase 14000;
nothing in `lib/exams.ts` used it on 2026-11-01).

## lib/banks/all.ts

```ts
import "./setrafik";
```

## types/index.ts

- `QuestionType`: add `| "SETRAFIK"`.
- `QuestionCategory`, under a `// Sweden driving theory` comment (prefix `setr`, because
  `seatbeltPhone` and the SERU `ser*` keys already exist; grepped, no clash):

```ts
  | "setrJunctions"
  | "setrSigns"
  | "setrMarkings"
  | "setrSpeed"
  | "setrParking"
  | "setrSafety"
  | "setrVehicle"
  | "setrEnvironment"
  | "setrPersonal"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    setrJunctions: "Right of Way & Junctions",
    setrSigns: "Road Signs",
    setrMarkings: "Road Markings & Traffic Lights",
    setrSpeed: "Speed, Overtaking & Lanes",
    setrParking: "Stopping, Parking & Motorways",
    setrSafety: "Traffic Safety, Wildlife & Winter",
    setrVehicle: "Vehicle Knowledge & Handling",
    setrEnvironment: "Environment & Eco-driving",
    setrPersonal: "Personal Factors & Your Licence",
```

## app/globals.css

The brief's `205 75% 34%` clashes (rule: within 8 degrees, at least 15 saturation or 8 lightness
apart) with cdlx 205 70 38, part107 199 89 36, nclex 200 80 36 and caplumb 212 88 30. I scanned
hues 195 to 221, saturation 50 to 100, lightness 30 to 42: the only free spots are 195-196 at
65% / 41-42%, which fail white-text contrast (about 4.0:1). Suggested instead: `203 85% 25%`
(Swedish flag blue, deep): clear of every existing theme by the rule, white text 9.1:1, but below
the 30 to 48% lightness band (pkdrive sits at 22%). Also 7 degrees from grdriving's suggested
210 60% 40% but 25 points of saturation apart. Integrator's call.

```css
  /* Sweden driving theory theme */
  [data-theme="setrafik"] {
    --brand: 203 85% 25%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 203 70% 95%;
    --brand-hover: 203 85% 21%;
    --brand-dark: 203 85% 18%;
    --brand-darker: 203 75% 12%;
    --brand-muted: 203 35% 68%;
    --brand-border: 203 35% 78%;
    --brand-border-light: 203 32% 88%;
    --brand-gradient-to: 50 80% 94%;
  }
```

Then run `tools/gen_dark_brand_css.py` once for everyone.

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `setrafik: "Four 50-question mock tests in English for Trafikverket's knowledge test for a B licence in Sweden: the right-hand rule and priority roads, signs and markings, speed limits, parking and motorways, moose and winter driving, alcohol limits and eco-driving.",`
- `EXAM_ORG`: `setrafik: "Trafikverket · knowledge test (kunskapsprov) B",`
- Hub group, new (with the EU batch): `{ title: "Sweden driving tests", ids: ["setrafik"] },`
  With one member, add `RELATED_OVERRIDES`: `setrafik: ["fitheory", "dkteori", "iedtt"],`
  (swap in any EU batch ids that did not ship).
- `SEARCH_ALIASES`:
  `setrafik: "sweden driving theory test swedish driving theory test in english kunskapsprov b kunskapsprov teoriprov teoriprovet körkort korkort körkortsprov korkortsprov trafikverket theory test swedish driving licence test english högerregeln hogerregeln huvudled riskutbildning riskettan risktvåan stockholm göteborg gothenburg malmö malmo uppsala",`

## lib/region.ts (new region SE, wired like PK)

- `Region` union: add `| "SE"`.
- `REGIONS`: `{ code: "SE", name: "Sweden", short: "SE", inName: "Sweden" },`
- `regionFromCountry`: `case "SE": return "SE";`
- `REGION_HREFLANG`: `SE: "en-SE"`
- `TEST_REGIONS`: `setrafik: "SE",` (a driving test, so NOT in `NON_DRIVING_TESTS`).
- `REGION_HOME`:

```ts
  SE: {
    title: "Free Sweden Driving Theory Test Practice in English | Tigertest",
    description: "Free practice in English for the Swedish driving theory test (kunskapsprov B): 200 original questions on Swedish traffic rules, every answer explained. No account needed.",
    lead: "Practice in English for Trafikverket's theory test, the knowledge test for a Swedish B licence. Original questions on right of way, signs, speed, winter driving and safety, every answer explained. No signup.",
    cta: { label: "Theory test", href: "/sweden-driving-theory-test" },
    testsTitle: "Driving theory test (kunskapsprov B)",
    testsSub: "200 questions on Swedish traffic rules, in km/h for right-hand traffic. The real test has 65 scored questions and you need 52 right.",
  },
```

- File header comment: add `/se` to the list of country homepages.

## components/home/HomePage.tsx

`AUTHORITY` (used by `faqsFor(region)`, whose five answers are generated):
`SE: "Trafikverket or Transportstyrelsen",`

The integrator adds `app/se/page.tsx` (copy `app/pk/page.tsx`), the middleware country mapping
(from `regionFromCountry`), the sitemap and `llms.txt` lines, and the funnel `visit_region_SE`
key if region keys are listed there.

## lib/examFacts.ts

```ts
  setrafik: {
    answer:
      "The knowledge test (kunskapsprov) for a Swedish category B licence is run by Trafikverket at its test centres on a touch screen. It has 70 multiple-choice questions with one correct answer each and lasts 50 minutes. Five questions are unscored trial questions, so the maximum is 65 points, and you need 52 points to pass. It covers traffic rules, traffic safety, vehicle knowledge and handling, the environment and personal prerequisites. It is offered in Swedish (with audio) and in 15 other languages, including British English. To take it you need a learner's permit and both parts of the risk education. From 19 August 2026, a pass is valid for one year, during which you must pass the driving test.",
    rows: [
      { label: "Run by", value: "Trafikverket (Swedish Transport Administration)" },
      { label: "Questions", value: "70 (65 scored, 5 unscored trial questions)" },
      { label: "Time", value: "50 minutes (75 with approved extra time)" },
      { label: "Pass mark", value: "52 of 65 points (80%)" },
      { label: "Languages", value: "Swedish plus 15 others, including British English" },
      { label: "Before the test", value: "Learner's permit and both parts of the risk education" },
      { label: "Pass valid for", value: "One year (passes from 19 August 2026)" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 80% target" },
    ],
    basedOn: "Trafikverket's Kunskapsprov B and Teoriprovet på annat språk pages, Swedish traffic rules (Trafikförordningen) and Transportstyrelsen guidance, checked November 2026",
    source: { name: "Trafikverket: Kunskapsprov B", url: "https://www.trafikverket.se/korkort/korkortsprov/personbil-och-latt-lastbil/kunskapsprov-b/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Optionally add `setrafik` to `BORROWED_SETS` with the DMV set like the
other car tests.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing for the exam: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no
redirects needed. The `/se` homepage lines are the integrator's region work.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing setrafik:sweden-driving-theory:14001`

## CLAUDE.md (with the EU batch, after the Pakistan bullet under International driving tests)

```md
- **Sweden Driving Theory** (Trafikverket knowledge test, kunskapsprov B, `/sweden-driving-theory/*`, landing `/sweden-driving-theory-test`): `data/sweden-driving-theory-questions.json` (200 original questions on Swedish traffic rules: right of way and junctions 28, road signs 32, markings and lights 20, speed/overtaking/lanes 24, stopping, parking and motorways 16, traffic safety, wildlife and winter 36, vehicle knowledge 16, environment 12, personal factors and the licence 16), test IDs 14001-14004 (50 questions each), sets 14001-14005 (by topic), state `SETRAFIK`, prefix `SETRF-`, category keys `setr*`, 80% pass (the real test is 70 questions, 65 scored, 52 to pass, in 50 minutes, offered in British English and 14 other languages besides Swedish; Trafikverket publishes no area weights, so ours follow guides). 7/8/5/6/4/9/4/3/4 per test, no spares. Right-hand traffic, the right-hand rule, 50/70 km/h basic limits, 80 km/h with a trailer, winter tyres 1 Dec to 31 Mar in winter conditions, 0.2 per mille for all drivers, theory pass valid one year from 19 Aug 2026; no tread depths, fines or the trial school-bus 30 km/h rule. Photo questions not modelled; signs described in words. Built by `tools/next100/setrafik/build.py`; sources in `tools/next100/setrafik/sources.md`. Region SE (its first exam, homepage `/se`), hub group "Sweden driving tests".
```
