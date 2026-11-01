# Wiring for `fitheory` (Finland driving theory test, category B, v1)

Files already written by the builder: `data/finland-driving-theory-questions.json` (200, PASS),
`lib/banks/fitheory.ts`, `app/finland-driving-theory/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/finland-driving-theory-test/page.tsx`,
`tools/next100/fitheory/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/fitheory/build.py`. Everything below goes in shared files.

Format note: the real category B teoriakoe (Traficom regulation TRAFICOM/523973/03.04.03.00/2019)
is 15 multiple choice (11 to pass), 50 traffic picture questions (43 to pass) and 5 risk
recognition questions (4 to pass) in 30 minutes, each part passed separately, on a tablet at an
Ajovarma (A-Katsastus) service point, in Finnish, Swedish or English. Tigertest models four
50-question multiple choice tests at 86% (43 of 50, the share of the picture part); pictures and
risk videos are described in words. Pools are exactly 4x each per-test count (no spares).
Dashboard = 5 topic sets + 4 tests = 9 steps. No set exceeds 60.

## lib/exams.ts

Add `"fitheory"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests, after `pkdrive` or with the EU batch):

```ts
const fitheory: ExamConfig = {
  id: "fitheory",
  stateCode: "FITHEORY",
  idBase: 14500,
  slug: "/finland-driving-theory",
  landingPath: "/finland-driving-theory-test",
  name: "Finland Driving Theory Practice Test",
  shortName: "Finland theory test",
  examLabel: "Finland driving theory test",
  fullName: "Finland driving theory test, category B (teoriakoe)",
  questionIdPrefix: "FITHE-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 86,
  // Source: Traficom regulation on the driving theory test (TRAFICOM/523973/03.04.03.00/2019, in
  // force 15.6.2020) and Traficom's "Driving examination" page: category B is 15 multiple choice
  // (11 to pass), 50 traffic picture questions (43) and 5 risk recognition questions (4) in
  // 30 minutes, each part passed separately; topic areas from the regulation (traffic rules, the
  // driver, the road, other road users, safety equipment, vehicle; pictures on driving straight,
  // turning, giving way, overtaking, lane changes, stopping, parking). No official weights, so
  // the split is Tigertest's own. Rules from the Road Traffic Act 729/2018 as consolidated to
  // 17 April 2026 and the Driving Licence Act reform of 29 May 2026. 86% (43 of 50) mirrors the
  // picture part. Checked 2026-11-01. Pools are exactly 4x each count. All items original.
  blueprint: {
    fiYield: 7,
    fiPosition: 5,
    fiOvertake: 6,
    fiParking: 5,
    fiSigns: 8,
    fiMarkings: 4,
    fiUsers: 5,
    fiDriver: 5,
    fiVehicle: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 14501, name: "Giving Way & Junctions", categories: ["fiYield"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 2, id: 14502, name: "Speed, Lanes & Overtaking", categories: ["fiPosition", "fiOvertake"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 14503, name: "Signs, Markings & Signals", categories: ["fiSigns", "fiMarkings"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 14504, name: "Parking & Other Road Users", categories: ["fiParking", "fiUsers"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 14505, name: "The Driver, Your Car & Winter", categories: ["fiDriver", "fiVehicle"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    fiYield: "Giving Way & Junctions",
    fiPosition: "Speed, Lanes & Motorways",
    fiOvertake: "Overtaking & Meeting",
    fiParking: "Stopping & Parking",
    fiSigns: "Traffic Signs",
    fiMarkings: "Markings, Lights & Police Signals",
    fiUsers: "Pedestrians, Cyclists & Other Road Users",
    fiDriver: "The Driver, Alcohol & Licence Rules",
    fiVehicle: "Vehicle, Winter & Safety Equipment",
  },
  copy: {
    guestPrompt: "to save your theory test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the Finnish rules of the road, in English: giving way, overtaking, parking, signs and winter driving. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 43 or more",
    heroSubs: [
      "Five topics, four 50-question tests. Giving way and signs weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your theory test at Ajovarma.",
    ],
    sourceLine: "Based on the Finnish Road Traffic Act and Traficom's theory test rules. Original questions in English; 50 per test, 86% is Tigertest's target.",
    analyticsKey: "fitheory",
  },
};
```

Append `fitheory` to the `EXAMS` array with the other driving tests.

Check: 14501-14505 (sets) and 14501-14504 (tests) must be free (BRIEF reserves idBase 14500).

## lib/banks/all.ts

```ts
import "./fitheory";
```

## types/index.ts

- `QuestionType`: add `| "FITHEORY"`.
- `QuestionCategory`, under a `// Finland driving theory test` comment:

```ts
  | "fiYield"
  | "fiPosition"
  | "fiOvertake"
  | "fiParking"
  | "fiSigns"
  | "fiMarkings"
  | "fiUsers"
  | "fiDriver"
  | "fiVehicle"
```

(Grepped: no existing `fi[A-Z]` keys.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    fiYield: "Giving Way & Junctions",
    fiPosition: "Speed, Lanes & Motorways",
    fiOvertake: "Overtaking & Meeting",
    fiParking: "Stopping & Parking",
    fiSigns: "Traffic Signs",
    fiMarkings: "Markings, Lights & Police Signals",
    fiUsers: "Pedestrians, Cyclists & Other Road Users",
    fiDriver: "The Driver, Alcohol & Licence Rules",
    fiVehicle: "Vehicle, Winter & Safety Equipment",
```

## app/globals.css

The brief's hue `220 55% 36%` clashes under the 8-degree rule with boating (215 65% 32%), civics
(222 68% 42%), the five UK driving themes (222 62% 38%) and phcse (221 50% 30%). Checked against
every `[data-theme]` block plus the EU proposals on disk (setrafik 203 85% 25%, grdriving
238 85% 34%): `224 100% 26%` (deep Finnish flag blue) clears all of them. Lightness 26 is below
the 30 to 48 band like pkdrive's 22; white text passes easily. If an in-band lightness is wanted,
`234 100% 32%` also clears (bluer violet). Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Finland driving theory test theme */
  [data-theme="fitheory"] {
    --brand: 224 100% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 224 60% 95%;
    --brand-hover: 224 100% 22%;
    --brand-dark: 224 100% 19%;
    --brand-darker: 224 90% 13%;
    --brand-muted: 224 35% 70%;
    --brand-border: 224 35% 80%;
    --brand-border-light: 224 30% 89%;
    --brand-gradient-to: 200 50% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `fitheory: "Four 50-question mock tests in English for the Finnish category B theory test (teoriakoe): the right-hand rule and giving way, overtaking, parking, Finland's yellow warning signs, markings, pedestrians and cyclists, drink driving limits, winter tyres and the 2026 rules for 17-year-olds.",`
- `EXAM_ORG`: `fitheory: "Traficom · theory test at Ajovarma (A-Katsastus)",`
- Hub group, new (with the other EU driving groups, or one "EU driving theory tests" group if the
  integrator prefers): `{ title: "Finland driving tests", ids: ["fitheory"] },`
  With one member, add `RELATED_OVERRIDES`: `fitheory: ["setrafik", "dkteori", "iedtt"],`
  (Sweden and Denmark are the nearest EU neighbours in this batch; swap for `ukcar` if either is
  not wired.)
- `SEARCH_ALIASES`:
  `fitheory: "finland driving theory test finnish driving test teoriakoe teoriakoe english ajokortti ajokoe b ajokortti theory test finland traficom ajovarma a-katsastus helsinki espoo tampere turku oulu driving licence finland in english",`

## lib/region.ts (new region FI)

- `Region` union: add `| "FI"`.
- `REGIONS`: `{ code: "FI", name: "Finland", short: "FI", inName: "Finland" },`
- `regionFromCountry`: `case "FI": return "FI";` (Åland, ISO `AX`, issues its own licences; leave
  it out unless the integrator wants `case "AX"` too.)
- `REGION_HREFLANG`: `FI: "en-FI"`.
- `TEST_REGIONS`: `fitheory: "FI",` (a driving test, so NOT in `NON_DRIVING_TESTS`).
- `REGION_HOME`:

```ts
  FI: {
    title: "Free Finland Driving Theory Test Practice in English | Tigertest",
    description: "Free practice in English for the Finnish category B theory test (teoriakoe): 200 original questions on Finnish traffic rules and signs, every answer explained. No account needed.",
    lead: "Practice in English for the Finnish theory test, the first step to a category B licence. Original questions on giving way, signs, parking and winter driving, every answer explained. No signup.",
    cta: { label: "Finnish theory test", href: "/finland-driving-theory-test" },
    testsTitle: "Category B theory test",
    testsSub: "200 questions on the Finnish Road Traffic Act, in km/h for right-hand traffic. Four full 50-question tests, 43 to pass.",
  },
```

## components/home/HomePage.tsx

`AUTHORITY` (used by `faqsFor`): `FI: "Traficom, Ajovarma or A-Katsastus",`
The rest of `faqsFor` is generated (one local driving test: "a driving test written from the
official rules").

Also for the integrator (follow how PK was added): the `/fi` route
`app/fi/page.tsx`, middleware country mapping, sitemap and `llms.txt` lines, `lib/shareCards.ts`
country card (`fi`), the funnel `visit_region_*` list and the Today tab's By country card if
they enumerate regions.

## lib/examFacts.ts

```ts
  fitheory: {
    answer:
      "The Finnish category B theory test (teoriakoe) is taken on a tablet at an Ajovarma service point, run for Traficom by A-Katsastus. It has three parts in 30 minutes: 15 multiple choice questions, 50 picture questions about traffic situations and 5 risk recognition questions, and you must reach the minimum in each part (11, 43 and 4). The test is offered in Finnish, Swedish and English, with an oral test of 60 minutes in some cases. You can take it one month before reaching the licence age, normally 18. A passed theory test is valid for one year, and you take it before the driving test.",
    rows: [
      { label: "Run by", value: "Traficom, at Ajovarma (A-Katsastus) service points" },
      { label: "Format", value: "15 multiple choice, 50 traffic picture questions, 5 risk recognition" },
      { label: "Pass marks", value: "11 of 15, 43 of 50 and 4 of 5, each part separately" },
      { label: "Time", value: "30 minutes (60 for an oral test)" },
      { label: "Languages", value: "Finnish, Swedish, English" },
      { label: "Valid for", value: "One year after passing" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 86% target" },
      { label: "Minimum age (car)", value: "18 (17 with an age exception permit)" },
    ],
    basedOn: "Traficom regulation on the driving theory test (TRAFICOM/523973/03.04.03.00/2019), Traficom's driving examination page and Driving Licence Act reform page, and the Road Traffic Act 729/2018 as consolidated to April 2026, checked November 2026",
    source: { name: "Traficom: Driving examination", url: "https://traficom.fi/en/drivers-and-vehicles/driving-licenses/driving-examination" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` (and `HUB_PAGES_UPDATED_AT` for the new group and `/fi`) with a
comment naming the EU batch.

## lib/shareImageUrl.ts, lib/shareCardCopy.ts, lib/shareCards.ts

As for pkdrive: add `"fitheory"` to `SHARE_COPY_IDS` and, if share copy is written per exam:
`fitheory: { title: "Finland Driving Theory Test", description: "Review giving way, Finnish signs, parking and winter rules for the category B teoriakoe." },`

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

`BORROWED_SETS`: `fitheory: "driving",` like the other car tests.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing for the exam itself: sitemaps map over `EXAMS`, class questions import `lib/banks/all`,
no redirects needed. (The `/fi` homepage line is the integrator's, as above.)

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing fitheory:finland-driving-theory:14501`

## CLAUDE.md (with the EU batch, after the Pakistan bullet under International driving tests)

```md
- **Finland Theory Test** (category B teoriakoe, offered in Finnish, Swedish and English, `/finland-driving-theory/*`, landing `/finland-driving-theory-test`): `data/finland-driving-theory-questions.json` (200 original questions on the Road Traffic Act 729/2018 as consolidated to April 2026 and the Driving Licence Act reform of 29 May 2026: giving way and junctions 28, speed/lanes/motorways 20, overtaking and meeting 24, stopping and parking 20, signs 32, markings/lights/police signals 16, pedestrians/cyclists/other road users 20, the driver/alcohol/licence rules 20, vehicle/winter/safety equipment 20), test IDs 14501-14504 (50 questions each), sets 14501-14505 (by topic), state `FITHEORY`, prefix `FITHE-`, 86% pass (Tigertest's target, 43 of 50 like the real picture part; the real test is 15 multiple choice (11 to pass), 50 traffic picture questions (43) and 5 risk recognition questions (4) in 30 minutes, each part passed separately, per Traficom's regulation). 7/5/6/5/8/4/5/5/5 per test, no spares. Right-hand rule and its exceptions, Finland's yellow warning and prohibition signs, yellow temporary markings over white, winter tyres November to March when conditions require (3 mm), studs 1 November to end of March, 0.5 per mille / 0.22 mg/l, the 00.00-05.00 ban for 17-year-olds and the minor driver sign from 1 October 2026; no fines, sign codes, motorway or trailer speed figures. Pictures and risk videos are described in words. Built by `tools/next100/fitheory/build.py`; sources in `tools/next100/fitheory/sources.md`. Region FI (its first exam, homepage `/fi`), hub group "Finland driving tests", `[data-theme="fitheory"]` deep Finnish blue, borrows the car tiger.
```
