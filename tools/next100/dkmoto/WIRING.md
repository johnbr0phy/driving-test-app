# Wiring for `dkmoto` (Denmark motorcycle theory test, teoriprøve, categories A1, A2 and A, v1)

Files already written by the builder: `data/denmark-motorcycle-theory-questions.json` (200, PASS),
`lib/banks/dkmoto.ts`, `app/denmark-motorcycle-theory/*` (5 wrappers: layout, redirect, dashboard,
drill, stats, copied from `app/denmark-driving-theory/`; no test or practice folders),
`app/denmark-motorcycle-theory-test/page.tsx` (renders `ExamSampleQuestions`),
`tools/next100/dkmoto/*` (spec, sources, `q_*.py`, `build.py`).
Rebuild with `python3 -I tools/next100/dkmoto/build.py`. Everything below goes in shared files.

Format note: Færdselsstyrelsen runs the category A theory test under the same rules as category B
(undervisningsplan A, 10.2.2, points to B 10.2.2): about half an hour, at most five errors, random
series from the whole teaching plan, digital tests with computer-generated pictures. Its page on
digital theory tests lists category A and says digital tests in Danish and English run at every
digital test site (German only in Aabenraa). The question count for A is not on an fstyr.dk page;
guides give 25. Tigertest models eight real-length 25-question tests at 80% (20 of 25), like
`dkteori`. The blueprint follows Færdselsstyrelsen's published randomisation key for the digital
category A test (afsnit 1, 3, 4, 5, 6 and 8 8% each, afsnit 7 52%): 2 per section and 13 for
afsnit 7, split 4/3/3/3 (Tigertest's own). Pools are exactly 8x each per-test count (no spares).
Dashboard = 4 topic sets + 8 tests = 12 steps. No set exceeds 60. Tests 23701-23708 and sets
23701-23704 share the block like dkteori's.

## lib/exams.ts

Add `"dkmoto"` to the `ExamId` union. Icon `bike` already exists.

Block (with the other EU driving tests, after `dkteori`):

```ts
const dkmoto: ExamConfig = {
  id: "dkmoto",
  stateCode: "DKMOTO",
  idBase: 23700,
  slug: "/denmark-motorcycle-theory",
  landingPath: "/denmark-motorcycle-theory-test",
  name: "Denmark Motorcycle Theory Practice Test",
  shortName: "Denmark motorcycle theory",
  examLabel: "Danish motorcycle theory test",
  fullName: "Danish motorcycle theory test (teoriprøve), categories A1, A2 and A",
  questionIdPrefix: "DKMC-",
  icon: "bike",
  testCount: 8,
  questionsPerTest: 25,
  passPct: 80,
  // Source: Færdselsstyrelsen (fstyr.dk, checked 2026-11-06): the digital theory test is offered
  // for category A among others, in Danish and English at every digital test site (German only in
  // Aabenraa), at most five errors; the category A teaching plan (undervisningsplan AM, A1, A2 og A,
  // version 1.0 2026, in use from 1 July 2026) runs the theory test under the category B rules
  // (about half an hour, random series, computer-generated pictures). 25 questions per guides.
  // Weights from Færdselsstyrelsen's published randomisation key for the digital category A test:
  // afsnit 1, 3, 4, 5, 6 and 8 8% each, afsnit 7 52%, so per 25: 2 each and 13 for afsnit 7
  // (split 4/3/3/3 by sub-section, Tigertest's own). The real test is picture-based with one or
  // more correct answers; ours are text, single answer, signs described in words. Eight
  // real-length tests; pools are exactly 8x each count. All items original.
  blueprint: {
    dkmcBike: 2,
    dkmcVehicles: 2,
    dkmcRider: 2,
    dkmcRoad: 2,
    dkmcRules: 2,
    dkmcPosition: 4,
    dkmcPassing: 3,
    dkmcJunctions: 3,
    dkmcMotorway: 3,
    dkmcRisk: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 23701, name: "Your Motorcycle, Licence & Other Vehicles", categories: ["dkmcBike", "dkmcRules", "dkmcVehicles"], size: 48, weightLabel: "6 of 25 test questions" },
    { setNumber: 2, id: 23702, name: "Rider, Road & Risk", categories: ["dkmcRider", "dkmcRoad", "dkmcRisk"], size: 48, weightLabel: "6 of 25 test questions" },
    { setNumber: 3, id: 23703, name: "Position, Bends & Overtaking", categories: ["dkmcPosition", "dkmcPassing"], size: 56, weightLabel: "7 of 25 test questions" },
    { setNumber: 4, id: 23704, name: "Junctions, Motorways & Darkness", categories: ["dkmcJunctions", "dkmcMotorway"], size: 48, weightLabel: "6 of 25 test questions" },
  ],
  categoryLabels: {
    dkmcBike: "Motorcycle, Gear & Documents",
    dkmcVehicles: "Other Vehicles & How They Handle",
    dkmcRider: "Perception, Fitness & Other Road Users",
    dkmcRoad: "Road Conditions & Grip",
    dkmcRules: "Licences, Passengers & Basic Rules",
    dkmcPosition: "Moving Off, Position, Bends & Lanes",
    dkmcPassing: "Meeting, Following & Overtaking",
    dkmcJunctions: "Junctions & Roundabouts",
    dkmcMotorway: "Motorways, Parking & Darkness",
    dkmcRisk: "Alcohol, Drugs & Speed",
  },
  copy: {
    guestPrompt: "to save your Danish motorcycle theory progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets covering the whole motorcycle teaching plan, in English. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 25 questions like the real test, 20 to pass",
    heroSubs: [
      "Four topics, eight real-length tests. Riding on the road weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your teoriprøve.",
    ],
    sourceLine: "Based on Færdselsstyrelsen's teaching plan for categories A1, A2 and A (undervisningsplan, 2026). Original questions in English; 25 per test, 20 to pass like the real test's five-error limit.",
    analyticsKey: "dkmoto",
  },
};
```

Append `dkmoto` to the `EXAMS` array right after `dkteori`.

Check: 23701-23708 (tests) and 23701-23704 (sets) must be free (the queue reserves idBase 23700;
grep found nothing at 237xx on 2026-11-06).

## lib/banks/all.ts

```ts
import "./dkmoto";
```

## types/index.ts

- `QuestionType`: add `| "DKMOTO"`.
- `QuestionCategory`, under a `// Denmark motorcycle theory test` comment:

```ts
  | "dkmcBike"
  | "dkmcVehicles"
  | "dkmcRider"
  | "dkmcRoad"
  | "dkmcRules"
  | "dkmcPosition"
  | "dkmcPassing"
  | "dkmcJunctions"
  | "dkmcMotorway"
  | "dkmcRisk"
```

(`dkmc` was grepped against `types/index.ts` and `lib/*.ts`: no clash. Siblings dkindfoed, dkjagt
and dkmedborger should use other prefixes.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; the other languages fall back)

```ts
    dkmcBike: "Motorcycle, Gear & Documents",
    dkmcVehicles: "Other Vehicles & How They Handle",
    dkmcRider: "Perception, Fitness & Other Road Users",
    dkmcRoad: "Road Conditions & Grip",
    dkmcRules: "Licences, Passengers & Basic Rules",
    dkmcPosition: "Moving Off, Position, Bends & Lanes",
    dkmcPassing: "Meeting, Following & Overtaking",
    dkmcJunctions: "Junctions & Roundabouts",
    dkmcMotorway: "Motorways, Parking & Darkness",
    dkmcRisk: "Alcohol, Drugs & Speed",
```

## app/globals.css

Suggested `10 60% 30%` clashes (hue rule: within 8 degrees needs 15 points of saturation or 8 of
lightness) with barber 4 60 31, biharpolice 18 65 30 and cssgb 14 50 26. Checked with a script over
`app/globals.css` on 2026-11-06: `12 85% 24%` (deep rust red) passes against every theme then on
disk. Nearest: nzmoto 12 85% 16% (8 points lighter, passes on lightness alone); the integrator may
prefer `14 30% 24%` (muted brown, also passes). White text on 12 85% 24% is well above 4.5:1. Then
run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Denmark motorcycle theory test theme */
  [data-theme="dkmoto"] {
    --brand: 12 85% 24%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 12 70% 96%;
    --brand-hover: 12 85% 20%;
    --brand-dark: 12 85% 18%;
    --brand-darker: 12 80% 13%;
    --brand-muted: 12 35% 70%;
    --brand-border: 12 40% 82%;
    --brand-border-light: 12 40% 90%;
    --brand-gradient-to: 20 60% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `dkmoto: "Eight 25-question mock tests in English for the Danish motorcycle theory test (teoriprøve), categories A1, A2 and A: lane position and bends, being seen at junctions, sidecars and passengers, helmets, overtaking, motorways and riding in the dark, weighted like Færdselsstyrelsen's digital test.",`
- `EXAM_ORG`: `dkmoto: "Færdselsstyrelsen (Denmark) · teoriprøve, categories A1, A2 and A",`
- Hub group: a licence category, so the driving group, right after `dkteori` (as semoto and
  demotorrad do for their countries; the Denmark group for the non-driving siblings dkindfoed,
  dkjagt and dkmedborger is theirs, dkmoto does not go in it):
  `{ title: "EU driving theory tests", ids: ["detheorie", "esdgt", "ptimt", "bedriving", "dkteori", "dkmoto", "setrafik", "fitheory", "grdriving", "rodrpciv", "hukresz", "mttheory"] },`
  (merge with whatever demotorrad, semoto and ptmoto add in the same wave).
- `SEARCH_ALIASES` (English and Danish):
  `dkmoto: "denmark motorcycle theory test danish motorcycle theory test motorbike theory test denmark teoriprøve motorcykel teoriprove motorcykel teoriproeve motorcykel mc teori mc-teori mc kørekort mc korekort kørekort til motorcykel korekort motorcykel motorcykelkørekort a1 a2 category a theory test denmark lille motorcykel mellemstor motorcykel stor motorcykel færdselsstyrelsen faerdselsstyrelsen fstyr copenhagen aarhus odense aalborg in english",`

## lib/region.ts

- `TEST_REGIONS`: `dkmoto: "DK",` (a driving test, so NOT in `NON_DRIVING_TESTS`).
- Region DK already exists (dkteori). No change to `REGION_HOME`; optionally extend its
  `testsSub` to mention motorcycles: `"Theory tests in English for a car (category B) or a motorcycle (A1, A2, A), in km/h for right-hand traffic. Eight 25-question tests each, 20 to pass like the real test."`

## lib/tigerAssets.ts

Add `dkmoto: "moto",` to `BORROWED_SETS` (the motorcycle tiger, like ukmoto, nzmoto, zak53moto).

## lib/shareCards.ts, lib/shareCardCopy.ts, lib/shareImageUrl.ts

- `lib/shareCards.ts` exam colour: `"dkmoto": { "color": "hsl(12, 85%, 24%)", "tint": "hsl(12, 85%, 96%)" },`
- `lib/shareCardCopy.ts`: `dkmoto: { title: "Denmark Motorcycle Theory Test", description: "Practise lane position, bends, junctions and motorway rules for the motorcycle teoriprøve, in English." },`
- `lib/shareImageUrl.ts`: add `"dkmoto"` to `SHARE_COPY_IDS`.

## lib/examFacts.ts

```ts
  dkmoto: {
    answer:
      "The Danish theory test (teoriprøve) for a motorcycle licence, categories A1, A2 and A, is run by Færdselsstyrelsen, the Danish Road Traffic Authority, under the same rules as the car test. It lasts about half an hour and you may make at most five errors; an unanswered question counts as an error. On the digital test, held on a touch screen, each question shows a computer-generated picture of a traffic situation and you pick the correct answer or answers. Questions are drawn at random from the teaching plan for motorcycles. Digital theory tests in Danish and English run at all of Færdselsstyrelsen's digital test sites; German only in Aabenraa. You take it after lessons with an approved motorcycle instructor. A1 can be issued from 18, A2 from 20 and A from 24, or from 22 after two years with A2.",
    rows: [
      { label: "Run by", value: "Færdselsstyrelsen (Danish Road Traffic Authority)" },
      { label: "Time", value: "About half an hour" },
      { label: "Pass rule", value: "At most 5 errors (guides: 25 questions, so 20 right)" },
      { label: "Format", value: "Picture-based, one or more correct answers" },
      { label: "Languages", value: "Danish and English at every digital site; German in Aabenraa" },
      { label: "Tigertest mock tests", value: "8 x 25 questions, 20 to pass" },
      { label: "Licence ages", value: "A1 from 18, A2 from 20, A from 24 (22 after 2 years of A2)" },
    ],
    basedOn: "Færdselsstyrelsen's pages on digital theory tests and its published randomisation key for the digital category A test, and the teaching plan for categories AM, A1, A2 and A (undervisningsplan, version 1.0 2026, in use from 1 July 2026), checked November 2026",
    source: { name: "Færdselsstyrelsen: Hvor kan jeg tage en teoriprøve?", url: "https://www.fstyr.dk/erhverv/koereskoler-og-koerelaerere/digitale-teoriproever" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` and `HUB_PAGES_UPDATED_AT` to the integration date with a comment
naming the wave. Then `npx tsx scripts/build-landing-dates.ts`.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, middleware.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed,
region DK already mapped.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `bike` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing dkmoto:denmark-motorcycle-theory:23701`

## CLAUDE.md (after the Denmark Theory Test bullet in the EU driving theory list)

```md
- **Denmark Motorcycle Theory Test** (`dkmoto`, Færdselsstyrelsen teoriprøve for categories A1, A2 and A, in English, `/denmark-motorcycle-theory/*`, landing `/denmark-motorcycle-theory-test`): `data/denmark-motorcycle-theory-questions.json` (200 original questions from Færdselsstyrelsen's teaching plan for categories AM, A1, A2 and A, version 1.0 2026, in use from 1 July 2026: motorcycle, gear and documents 16 (afsnit 1), other vehicles and how they handle 16 (afsnit 3), perception, fitness and other road users 16 (afsnit 4), road conditions and grip 16 (afsnit 5), licences, passengers and basic rules 16 (afsnit 6), moving off, position, bends and lanes 32 (7.1-7.5), meeting, following and overtaking 24 (7.6-7.9), junctions and roundabouts 24 (7.10-7.15), motorways, parking and darkness 24 (7.16-7.21), alcohol, drugs and speed 16 (afsnit 8)), eight real-length tests: test IDs 23701-23708 (25 questions each), sets 23701-23704 (by topic), state `DKMOTO`, prefix `DKMC-`, 80% pass (20 of 25: the real test allows at most 5 errors; Færdselsstyrelsen gives no question count for A, guides give 25). 2/2/2/2/2/4/3/3/3/2 per test, following Færdselsstyrelsen's published randomisation key for the digital category A test (afsnit 1, 3, 4, 5, 6 and 8 8% each, afsnit 7 52%), no spares. Digital theory tests in Danish and English at every digital test site (German in Aabenraa); the real test is picture-based with one or more correct answers, ours single-answer text with signs described in words. Motorcycle rules from the plan: A1 125 cm³ and 11 kW from 18, A2 35 kW from 20, A from 24 (22 after two years of A2), helmets from age 5, children under 135 cm only from 5 in a child seat, sidecar extras, no towing or being towed, always signal on motorways, tread 1 mm, trailer 125 cm³ bike and 200 kg; the novice 0.2 per mille limit is car-only and not asked; no fines, fees or klip counts. Kept clear of `dkteori` facts. Built by `tools/next100/dkmoto/build.py`; sources in `tools/next100/dkmoto/sources.md`. Region DK, hub group "EU driving theory tests" (after dkteori), `[data-theme="dkmoto"]` deep rust red (12 85% 24%), borrows the motorcycle tiger.
```
