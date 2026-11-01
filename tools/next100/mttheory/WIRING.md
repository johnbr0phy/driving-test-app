# Wiring for `mttheory` (Malta driving theory test, category B, v1)

Files already written by the builder: `data/malta-driving-theory-questions.json` (200, PASS),
`lib/banks/mttheory.ts`, `app/malta-driving-theory/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/malta-driving-theory-test/page.tsx` (renders
`ExamSampleQuestions`), `tools/next100/mttheory/*` (spec, sources, `q_*.py`, `build.py`).
Rebuild with `python3 -I tools/next100/mttheory/build.py`. Everything below goes in shared files.

Format note: Transport Malta's theory test is 35 multiple-choice questions on a touch screen in
45 minutes, 30 correct to pass (official page, read via search extracts because transport.gov.mt
returns a Cloudflare 403 to this sandbox). Tigertest models five real-length tests of 35 with
passPct 85 (ceil(0.85 x 35) = 30), like `nzroad`. Pools are 5x each per-test count plus 25
training-only spares (the last items of each pool). Dashboard = 4 topic sets + 5 tests = 9 steps.
No set exceeds 60.

## lib/exams.ts

Add `"mttheory"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests, after `pkdrive` or with the other EU batch 1 exams):

```ts
const mttheory: ExamConfig = {
  id: "mttheory",
  stateCode: "MTTHEORY",
  idBase: 14600,
  slug: "/malta-driving-theory",
  landingPath: "/malta-driving-theory-test",
  name: "Malta Driving Theory Test Practice",
  shortName: "Malta theory test",
  examLabel: "Malta driving theory test",
  fullName: "Malta driving theory test (category B car)",
  questionIdPrefix: "MTTHE-",
  icon: "car",
  testCount: 5,
  questionsPerTest: 35,
  passPct: 85,
  // Real test (Transport Malta, "Obtaining your driving licence", checked 2026-11-01): 35
  // multiple-choice questions on a touch screen, 45 minutes, 30 correct to pass; candidates 18+
  // with a category B learner's permit; offered in English or Maltese. Transport Malta publishes
  // no per-topic counts, so these are Tigertest's, signs and priority weighted most. Rules as in
  // force November 2026: left-hand traffic, British-style signs, cars 80/50 km/h, alcohol 0.5 g/l
  // (0.2 for probationary and commercial drivers). Five real-length tests; pools are 5x each count
  // plus 25 training-only spares. passPct 85 = ceil(0.85 * 35) = 30. All items original; the
  // official question bank was not used.
  blueprint: {
    mtLicence: 3,
    mtSigns: 7,
    mtMarkings: 4,
    mtJunctions: 6,
    mtRoad: 4,
    mtParking: 2,
    mtVulnerable: 4,
    mtSafety: 3,
    mtEmergency: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 14601, name: "Road Signs", categories: ["mtSigns"], size: 38, weightLabel: "7 of 35 test questions" },
    { setNumber: 2, id: 14602, name: "Markings, Signals & Junctions", categories: ["mtMarkings", "mtJunctions"], size: 54, weightLabel: "10 of 35 test questions" },
    { setNumber: 3, id: 14603, name: "Speed, Parking & Sharing the Road", categories: ["mtRoad", "mtParking", "mtVulnerable"], size: 56, weightLabel: "10 of 35 test questions" },
    { setNumber: 4, id: 14604, name: "Licences, Safety & Emergencies", categories: ["mtLicence", "mtSafety", "mtEmergency"], size: 52, weightLabel: "8 of 35 test questions" },
  ],
  categoryLabels: {
    mtLicence: "Licences, Learners & the Test",
    mtSigns: "Road Signs",
    mtMarkings: "Road Markings, Lights & Signals",
    mtJunctions: "Roundabouts, Junctions & Priority",
    mtRoad: "Speed, Lanes & Overtaking",
    mtParking: "Stopping & Parking",
    mtVulnerable: "Pedestrians, Cyclists & Other Road Users",
    mtSafety: "Alcohol, Phones, Seat Belts & Your Car",
    mtEmergency: "Night, Weather, Breakdowns & Crashes",
  },
  copy: {
    guestPrompt: "to save your theory test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets on the Maltese road rules the theory test asks about. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 35 questions like the real test, 30 to pass",
    heroSubs: [
      "Four topics, five real-length tests. Signs and priority weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your theory test.",
    ],
    sourceLine: "Based on Malta's road rules and Highway Code. Original questions; 35 per test, 30 to pass like the real test.",
    analyticsKey: "mttheory",
  },
};
```

Append `mttheory` to the `EXAMS` array with the other driving tests.

Check: 14601-14605 (tests) and 14601-14604 (sets) must be free (BRIEF reserves idBase 14600).

## lib/banks/all.ts

```ts
import "./mttheory";
```

## types/index.ts

- `QuestionType`: add `| "MTTHEORY"`.
- `QuestionCategory`, under a `// Malta driving theory` comment:

```ts
  | "mtLicence"
  | "mtSigns"
  | "mtMarkings"
  | "mtJunctions"
  | "mtRoad"
  | "mtParking"
  | "mtVulnerable"
  | "mtSafety"
  | "mtEmergency"
```

(Grepped: no existing `mt*` category keys.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    mtLicence: "Licences, Learners & the Test",
    mtSigns: "Road Signs",
    mtMarkings: "Road Markings, Lights & Signals",
    mtJunctions: "Roundabouts, Junctions & Priority",
    mtRoad: "Speed, Lanes & Overtaking",
    mtParking: "Stopping & Parking",
    mtVulnerable: "Pedestrians, Cyclists & Other Road Users",
    mtSafety: "Alcohol, Phones, Seat Belts & Your Car",
    mtEmergency: "Night, Weather, Breakdowns & Crashes",
```

## app/globals.css

The brief's `0 65% 40%` clashes with Canada red `356 68% 40%` (4 degrees, 3 sat, 0 light) and
`355 70% 44%`. Suggested instead: `0 88% 40%` (Malta flag red). Checked against every light
`[data-theme]` block and the nine other EU batch 1 suggestions: no clash under the 8 degree /
15 sat / 8 light rule (nearest: `356 68% 40%` sat +20, `0 100% 32%` sat 12 light 8, `2 78% 31%`
sat 10 light 9). White on it is 6.4:1. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Malta driving theory theme */
  [data-theme="mttheory"] {
    --brand: 0 88% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 0 80% 96%;
    --brand-hover: 0 88% 35%;
    --brand-dark: 0 88% 32%;
    --brand-darker: 0 80% 22%;
    --brand-muted: 0 35% 70%;
    --brand-border: 0 40% 80%;
    --brand-border-light: 0 40% 90%;
    --brand-gradient-to: 15 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `mttheory: "Five 35-question mock tests for the Transport Malta theory test for a car licence, 30 to pass like the real test: road signs, markings, roundabouts and priority, speed limits, parking, other road users, alcohol and seat belts, and breakdowns.",`
- `EXAM_ORG`: `mttheory: "Transport Malta · category B theory test",`
- Hub group, new (with the other EU batch 1 groups, or one shared "Europe driving theory tests"
  group if the integrator prefers): `{ title: "Malta driving tests", ids: ["mttheory"] },`
  With one member, add `RELATED_OVERRIDES`: `mttheory: ["iedtt", "ukcar", "esdgt"],`
  (swap `esdgt` for any other EU batch 1 id if it is not merged).
- `SEARCH_ALIASES`:
  `mttheory: "malta driving theory test malta theory test transport malta theory test driving licence malta learner permit malta category b licence malta highway code malta road code theory test centre pieta gozo driving test maltese driving test questions",`

## lib/region.ts (new region MT, follow how PK was added)

- `Region` union: add `| "MT"`.
- `REGIONS`: `{ code: "MT", name: "Malta", short: "MT", inName: "Malta" },`
- `regionFromCountry`: `case "MT": return "MT";`
- `REGION_HREFLANG`: `MT: "en-MT"`
- `TEST_REGIONS`: `mttheory: "MT",` (a driving test, so NOT in `NON_DRIVING_TESTS`).
- `REGION_HOME`:

```ts
  MT: {
    title: "Free Malta Driving Theory Test Practice | Tigertest",
    description: "Free driving theory test practice for Malta: 200 original questions on Maltese road rules and signs, every answer explained. No account needed.",
    lead: "Practice for the Transport Malta theory test for your car licence. Original questions on signs, roundabouts, speed limits and safe driving, every answer explained. No signup.",
    cta: { label: "Theory test", href: "/malta-driving-theory-test" },
    testsTitle: "Driving theory test",
    testsSub: "200 questions on Malta's road rules, in km/h for left-hand traffic. Five full 35-question tests, 30 to pass.",
  },
```

- Also: the file's top comment list of country pages (`/mt`), the integrator's `app/mt/page.tsx`,
  middleware country mapping, sitemap and `llms.txt` lines.

## components/home/HomePage.tsx (`faqsFor` via `AUTHORITY`)

```ts
  MT: "Transport Malta",
```

The generic `faqsFor` text then reads correctly ("For Malta it has a driving test written from the
official rules ... not affiliated with Transport Malta or any testing company").

## lib/examFacts.ts

```ts
  mttheory: {
    answer:
      "The Malta driving theory test is run by Transport Malta at its Theory Test Centre. It is a multiple-choice test on a touch-screen computer: 35 questions in 45 minutes, and you need at least 30 correct to pass. You must be at least 18 and hold a learner's permit for the licence category, and you show your ID card before the test. It is offered in English or Maltese. After passing, you take the practical driving test. Malta drives on the left, and the questions follow Malta's own road rules and Highway Code.",
    rows: [
      { label: "Run by", value: "Transport Malta" },
      { label: "Questions", value: "35 multiple choice, on a touch screen" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "30 of 35" },
      { label: "Languages", value: "English or Maltese" },
      { label: "Minimum age (category B)", value: "18, with a learner's permit" },
      { label: "Tigertest mock tests", value: "5 x 35 questions, 30 to pass" },
      { label: "Study material", value: "Transport Malta's Highway Code (updated July 2025)" },
    ],
    basedOn: "Transport Malta's licensing guidance and the Highway Code of Malta (updated 25 July 2025), checked November 2026",
    source: { name: "Transport Malta: Obtaining your driving licence", url: "https://www.transport.gov.mt/land/licence/obtaining-your-driving-licence-786" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

Optionally add `mttheory` to `BORROWED_SETS` with the DMV set like the other car tests.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing exam-specific: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no
redirects. Add `/mt` to the country-page sitemap lines with the region.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing mttheory:malta-driving-theory:14601`

## CLAUDE.md (with the other EU batch 1 bullets, after the Pakistan bullet under International driving tests)

```md
- **Malta Driving Theory** (Transport Malta theory test, category B car, `/malta-driving-theory/*`, landing `/malta-driving-theory-test`): `data/malta-driving-theory-questions.json` (200 original questions on Malta's road rules and Highway Code (updated 25 July 2025): licences/learners 18, signs 38, markings and signals 22, roundabouts/junctions 32, speed/lanes/overtaking 22, parking 12, other road users 22, alcohol/phones/seat belts 18, night/weather/crashes 16), five real-length tests: test IDs 14601-14605 (35 questions each), sets 14601-14604 (by topic), state `MTTHEORY`, prefix `MTTHE-`, 85% pass (30 of 35 like the real test: 35 questions on a touch screen in 45 minutes, English or Maltese). 3/7/4/6/4/2/4/3/2 per test (Tigertest's split); the last items of each pool (25 in all) are training-only. Left-hand traffic, roundabouts clockwise (give way to vehicles already on them), priority to the right at equal crossroads (S.L. 65.11 reg. 82), cars 80/50 km/h, alcohol 50 mg per 100 ml of blood (20 for probationary and commercial drivers); no fees, fines or penalty points. Transport Malta's official question bank is never used; signs are described in words. Built by `tools/next100/mttheory/build.py`; sources in `tools/next100/mttheory/sources.md`. Region MT (homepage `/mt`), hub group "Malta driving tests", `[data-theme="mttheory"]` Malta red, borrows the car tiger.
```
