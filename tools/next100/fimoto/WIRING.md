# Wiring for `fimoto` (Finland motorcycle theory test, categories A1, A2 and A, v1)

Files already written by the builder: `data/finland-motorcycle-theory-questions.json` (200, PASS),
`lib/banks/fimoto.ts`, `app/finland-motorcycle-theory/*` (5 wrappers, copied from
`app/finland-driving-theory/`), `app/finland-motorcycle-theory-test/page.tsx`,
`tools/next100/fimoto/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/fimoto/build.py`. Everything below goes in shared files.

Format note: the real A1, A2 and A teoriakoe (Traficom regulation TRAFICOM/523973/03.04.03.00/2019,
section 5, and Traficom's "Driving examination" page) is 20 multiple choice (14 to pass), 50 traffic
picture questions (43 to pass) and 5 risk recognition questions (4 to pass) in 30 minutes, each part
passed separately, on a tablet at an Ajovarma (A-Katsastus) service point, in Finnish, Swedish or
English. Tigertest models four 50-question multiple choice tests at 86% (43 of 50, the share of the
picture part); pictures and risk videos are described in words. Pools are exactly 4x each per-test
count (no spares). Dashboard = 5 topic sets + 4 tests = 9 steps. No set exceeds 60.
Region FI is already wired (by `fitheory`); this exam only joins it.

## lib/exams.ts

Add `"fimoto"` to the `ExamId` union. Icon `bike` already exists (used by `moto`, `ukmoto`, `nzmoto`).

Block (with the EU driving tests, right after `fitheory`):

```ts
const fimoto: ExamConfig = {
  id: "fimoto",
  stateCode: "FIMOTO",
  idBase: 24100,
  slug: "/finland-motorcycle-theory",
  landingPath: "/finland-motorcycle-theory-test",
  name: "Finland Motorcycle Theory Practice Test",
  shortName: "Finland motorcycle test",
  examLabel: "Finland motorcycle theory test",
  fullName: "Finland motorcycle theory test, categories A1, A2 and A (teoriakoe)",
  questionIdPrefix: "FIMOTO-",
  icon: "bike",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 86,
  // Source: Traficom regulation on the driving theory test (TRAFICOM/523973/03.04.03.00/2019, in
  // force 15.6.2020) and Traficom's "Driving examination" page: categories A1, A2 and A are 20
  // multiple choice (14 to pass), 50 traffic picture questions (43) and 5 risk recognition
  // questions (4) in 30 minutes, each part passed separately. Topic areas from the regulation: the
  // general traffic rules plus, for A1/A2/A, protective gear, rider visibility, road-condition
  // hazards and motorcycle mechanics; pictures on driving straight, turning, giving way,
  // overtaking, lane changes, stopping, parking. No official weights, so the split is Tigertest's
  // own. Rules from the Road Traffic Act 729/2018 as consolidated to 17 April 2026; licence limits
  // and upgrades from Traficom's motorcycle licence pages. 86% (43 of 50) mirrors the picture part.
  // Checked 2026-11-06. Pools are exactly 4x each count. All items original.
  blueprint: {
    fimotoGear: 5,
    fimotoBike: 5,
    fimotoControl: 7,
    fimotoPosition: 6,
    fimotoYield: 7,
    fimotoOvertake: 5,
    fimotoSurface: 6,
    fimotoLoad: 4,
    fimotoRider: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 24101, name: "Gear, Checks & Your Motorcycle", categories: ["fimotoGear", "fimotoBike"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 24102, name: "Control, Surfaces & Winter", categories: ["fimotoControl", "fimotoSurface"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 3, id: 24103, name: "Junctions, Overtaking & Large Vehicles", categories: ["fimotoYield", "fimotoOvertake"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 24104, name: "Road Position, Passengers & Loads", categories: ["fimotoPosition", "fimotoLoad"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 5, id: 24105, name: "The Rider & Licence Categories", categories: ["fimotoRider"], size: 20, weightLabel: "5 of 50 test questions" },
  ],
  categoryLabels: {
    fimotoGear: "Helmet, Protective Gear & Being Seen",
    fimotoBike: "Motorcycle Checks & Mechanics",
    fimotoControl: "Braking, Cornering & Control",
    fimotoPosition: "Road Position, Speed & Parking",
    fimotoYield: "Junctions & Giving Way",
    fimotoOvertake: "Overtaking, Meeting & Large Vehicles",
    fimotoSurface: "Road Surfaces, Weather & Winter",
    fimotoLoad: "Passengers, Luggage & Trailers",
    fimotoRider: "The Rider, Alcohol & Licence Categories",
  },
  copy: {
    guestPrompt: "to save your motorcycle theory progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on Finnish rules for riders, in English: gear and checks, braking and cornering, junctions and overtaking, road surfaces and winter, passengers and the A1, A2 and A licences. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 43 or more",
    heroSubs: [
      "Five topics, four 50-question tests. Control and giving way weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your theory test at Ajovarma.",
    ],
    sourceLine: "Based on the Finnish Road Traffic Act and Traficom's theory test and licence rules. Original questions in English; 50 per test, 86% is Tigertest's target.",
    analyticsKey: "fimoto",
  },
};
```

Append `fimoto` to the `EXAMS` array right after `fitheory`.

Check: 24101-24105 (sets) and 24101-24104 (tests) must be free (grepped `lib/exams.ts` and
`lib/v2` on 2026-11-06: nothing in 24100-24199).

## lib/banks/all.ts

```ts
import "./fimoto";
```

## types/index.ts

- `QuestionType`: add `| "FIMOTO"`.
- `QuestionCategory`, under a `// Finland motorcycle theory test` comment:

```ts
  | "fimotoGear"
  | "fimotoBike"
  | "fimotoControl"
  | "fimotoPosition"
  | "fimotoYield"
  | "fimotoOvertake"
  | "fimotoSurface"
  | "fimotoLoad"
  | "fimotoRider"
```

(Grepped: no existing `fimoto` keys.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    fimotoGear: "Helmet, Protective Gear & Being Seen",
    fimotoBike: "Motorcycle Checks & Mechanics",
    fimotoControl: "Braking, Cornering & Control",
    fimotoPosition: "Road Position, Speed & Parking",
    fimotoYield: "Junctions & Giving Way",
    fimotoOvertake: "Overtaking, Meeting & Large Vehicles",
    fimotoSurface: "Road Surfaces, Weather & Winter",
    fimotoLoad: "Passengers, Luggage & Trailers",
    fimotoRider: "The Rider, Alcohol & Licence Categories",
```

## app/globals.css

The suggested `12 70% 30%` clashes under the 8-degree rule with barber (4 60% 31%) and biharpolice
(18 65% 30%). Checked against every `[data-theme]` block plus every unwired hue in
`tools/next100/*/WIRING.md` (dkmoto 12 85% 24%, nzmoto 12 85% 16%, ptmoto 14 100% 30% and the
Finland siblings on disk): `12 70% 22%` (deep rust) clears all of them (dkmoto differs by 15
saturation points, the rule's minimum). Lightness 22 is below the 30 to 48 band like fitheory's 26;
white text passes easily. Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Finland motorcycle theory test theme */
  [data-theme="fimoto"] {
    --brand: 12 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 12 60% 95%;
    --brand-hover: 12 70% 18%;
    --brand-dark: 12 70% 16%;
    --brand-darker: 12 65% 11%;
    --brand-muted: 12 35% 70%;
    --brand-border: 12 35% 80%;
    --brand-border-light: 12 30% 89%;
    --brand-gradient-to: 30 50% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `fimoto: "Four 50-question mock tests in English for the Finnish motorcycle theory test (teoriakoe) for categories A1, A2 and A: helmets and protective gear, being seen, motorcycle checks, braking and cornering, the right-hand rule from the saddle, overtaking and large vehicles, spring grit, winter tyres and moose, passengers and trailers, and the A1, A2 and A power limits.",`
- `EXAM_ORG`: `fimoto: "Traficom · A1, A2 and A theory test at Ajovarma (A-Katsastus)",`
- Hub group: a licence category, so the driving group "EU driving theory tests", right after
  `fitheory` (as dkmoto, semoto and demotorrad sit after their car tests):
  `ids: [..., "fitheory", "fimoto", "grdriving", ...]`. The group is large, so no
  `RELATED_OVERRIDES` line is needed. (If the integrator splits out a "Finland driving and licence
  tests" group for fihygiene, fihunt and fitruck, put fitheory, fimoto and fitruck in it first.)
- `SEARCH_ALIASES`:
  `fimoto: "finland motorcycle theory test finnish motorcycle test teoriakoe a1 teoriakoe a2 a2 teoriakoe moottoripyörä moottoripyöräkortti moottoripyörän ajokortti mp kortti kevytmoottoripyörä a1 kortti a2 kortti motorcycle licence finland bike licence finland in english traficom ajovarma a-katsastus helsinki espoo tampere turku oulu",`

## lib/region.ts

- `TEST_REGIONS`: `fimoto: "FI",` (a driving licence test, so NOT in `NON_DRIVING_TESTS`).
- Region FI, `REGIONS`, hreflang and the `/fi` homepage already exist. Optional copy update now
  that FI has a second test (`REGION_HOME.FI`):

```ts
    lead: "Practise in English for the Finnish theory tests, the first step to a car or motorcycle licence. Original questions on giving way, signs, parking, riding and winter conditions, every answer explained. No signup.",
    testsTitle: "Car and motorcycle theory tests",
    testsSub: "200 questions each on the Finnish Road Traffic Act, in km/h for right-hand traffic. Four full 50-question tests per licence, 43 to pass.",
```

## components/home/HomePage.tsx

Nothing: `AUTHORITY.FI` ("Traficom, Ajovarma or A-Katsastus") already fits.

## lib/examFacts.ts

```ts
  fimoto: {
    answer:
      "The Finnish motorcycle theory test (teoriakoe) for categories A1, A2 and A is taken on a tablet at an Ajovarma service point, run for Traficom by A-Katsastus. It has three parts in 30 minutes: 20 multiple choice questions, 50 picture questions about traffic situations and 5 risk recognition questions, and you must reach the minimum in each part (14, 43 and 4). The test is offered in Finnish, Swedish and English, with an oral test of 60 minutes in some cases. A passed theory test is valid for one year; a handling test and a driving test follow. A1 is open from 16, A2 from 18 and A from 24, or 20 after two years on A2.",
    rows: [
      { label: "Run by", value: "Traficom, at Ajovarma (A-Katsastus) service points" },
      { label: "Format", value: "20 multiple choice, 50 traffic picture questions, 5 risk recognition" },
      { label: "Pass marks", value: "14 of 20, 43 of 50 and 4 of 5, each part separately" },
      { label: "Time", value: "30 minutes (60 for an oral test)" },
      { label: "Languages", value: "Finnish, Swedish, English" },
      { label: "Valid for", value: "One year after passing" },
      { label: "Then", value: "Handling test and driving test" },
      { label: "Minimum age", value: "A1 16, A2 18, A 24 (20 after two years on A2)" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 86% target" },
    ],
    basedOn: "Traficom regulation on the driving theory test (TRAFICOM/523973/03.04.03.00/2019), Traficom's driving examination, motorcycle licence and upgrade pages, and the Road Traffic Act 729/2018 as consolidated to April 2026, checked November 2026",
    source: { name: "Traficom: Driving examination", url: "https://traficom.fi/en/drivers-and-vehicles/driving-licenses/driving-examination" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` (and `HUB_PAGES_UPDATED_AT` for the hub group and `/fi`) with a
comment naming the Finland batch.

## lib/shareImageUrl.ts, lib/shareCardCopy.ts, lib/shareCards.ts

As for fitheory: add `"fimoto"` to `SHARE_COPY_IDS` and, in `lib/shareCardCopy.ts`:
`fimoto: { title: "Finland Motorcycle Theory Test", description: "Review gear, braking and cornering, giving way and the A1, A2 and A rules for the Finnish teoriakoe." },`
and a `"fimoto"` entry in `lib/shareCards.ts` copied from `"fitheory"` with the motorcycle title.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

`BORROWED_SETS`: `fimoto: "moto",` (the motorcycle tiger, like ukmoto, nzmoto and dkmoto).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.
`llms.txt` picks the exam up from the catalog and `EXAM_FACTS`.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `bike` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing fimoto:finland-motorcycle-theory:24101`

## CLAUDE.md (with the EU batch, right after the Finland Theory Test bullet)

```md
- **Finland Motorcycle Theory Test** (`fimoto`, the Traficom teoriakoe for categories A1, A2 and A, offered in Finnish, Swedish and English, `/finland-motorcycle-theory/*`, landing `/finland-motorcycle-theory-test`): `data/finland-motorcycle-theory-questions.json` (200 original questions on the Road Traffic Act 729/2018 as consolidated to April 2026 and Traficom's motorcycle licence pages, following the regulation's extra A topics: helmet, protective gear and being seen 20, motorcycle checks and mechanics 20, braking, cornering and control 28, road position, speed and parking 24, junctions and giving way 28, overtaking, meeting and large vehicles 20, road surfaces, weather and winter 24, passengers, luggage and trailers 16, the rider, alcohol and licence categories 20), test IDs 24101-24104 (50 questions each), sets 24101-24105 (by topic), state `FIMOTO`, prefix `FIMOTO-`, 86% pass (Tigertest's target, 43 of 50 like the real picture part; the real A1/A2/A test is 20 multiple choice (14 to pass), 50 traffic picture questions (43) and 5 risk recognition questions (4) in 30 minutes, each part passed separately, per Traficom's regulation). 5/5/7/6/7/5/6/4/5 per test, no spares. Rider rules: approved, fastened helmets for rider and passenger (the rider answers for passengers under 15, a doctor's certificate for the health exemption), 1.0 mm tread, winter tyres November to March when conditions require and studs from the start of November to the end of March for motorcycles too, one passenger with a suitable seat and footrests (two in a sidecar), a trailer at most half the bike's unladen mass, no towing that hampers riding, no parking on the pavement or beside a parked vehicle (bicycles and mopeds only), only cyclists may pass on the right; A1 16 / 125 cm³ / 11 kW / 0.1 kW/kg, A2 18 / 35 kW / 0.2 kW/kg / not from over 70 kW, A at 24 or 20 after two years on A2; no fines, fees or durations that may change. Pictures and risk videos are described in words. Kept clear of `fitheory` and `fitruck` facts and of the `moto`, `ukmoto`, `nzmoto`, `zak53moto`, `sgrtt`, `dkmoto`, `ptmoto`, `semoto`, `demotorrad`, `grmoto`, `mtmoto`, `bemoto` and `hukreszmoto` stems. Built by `tools/next100/fimoto/build.py`; sources in `tools/next100/fimoto/sources.md`. Region FI, hub group "EU driving theory tests" (after fitheory), `[data-theme="fimoto"]` deep rust (12 70% 22%), borrows the motorcycle tiger.
```
