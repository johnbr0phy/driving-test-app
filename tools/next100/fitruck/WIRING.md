# Wiring for `fitruck` (Finland truck and bus theory test, categories C, CE, D and DE; FI, v1)

Files already written by the builder: `data/finland-truck-theory-questions.json` (200, PASS),
`lib/banks/fitruck.ts`, `app/finland-truck-theory/*` (5 wrappers copied from
`app/finland-driving-theory/`: layout, redirect, dashboard, drill, stats; no test or practice
folders), `app/finland-truck-theory-test/page.tsx`, `tools/next100/fitruck/*` (spec, sources,
`q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/fitruck/build.py` (writes the data file
and prints the key-longest share). Everything below goes in shared files.

Format note: the real C, CE, D and DE teoriakoe (Traficom regulation TRAFICOM/523973/03.04.03.00/2019,
Traficom's driving examination page, both checked 2026-11-06) is 20 multiple choice (14 to pass), 30
traffic picture questions (26 to pass) and 5 risk recognition questions (4 to pass) in 30 minutes,
each part passed separately, on a tablet at an Ajovarma (A-Katsastus) service point. Tigertest
models four 50-question multiple choice tests at 80%, the share the three minimums add up to
(44 of 55); `ceil(0.80 x 50) = 40`. Pictures and risk videos are described in words. Truck and bus
in one bank (CE and DE coupling items included). Pools are exactly 4x each per-test count (no
spares). Topic sets like `fitheory` (not `testSets`): 5 sets + 4 tests = 9 dashboard steps, no set
over 60.

Language: Traficom's rules name Finnish, Swedish and English as the theory test languages without
limiting them by category, but no Traficom page confirms English for C and D specifically. The
landing, FAQ and examFacts say so ("check the language when you book"); please keep that wording.

## lib/exams.ts

Add `"fitruck"` to the `ExamId` union. Icon `truck` already exists.

Block (with the other driving tests, after `fitheory`):

```ts
const fitruck: ExamConfig = {
  id: "fitruck",
  stateCode: "FITRUCK",
  idBase: 24300,
  slug: "/finland-truck-theory",
  landingPath: "/finland-truck-theory-test",
  name: "Finland Truck and Bus Theory Practice Test",
  shortName: "Finland truck & bus theory",
  examLabel: "Finland truck and bus theory test",
  fullName: "Finland truck and bus theory test, categories C, CE, D and DE (teoriakoe)",
  questionIdPrefix: "FITRK-",
  icon: "truck",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Source: Traficom regulation on the driving theory test (TRAFICOM/523973/03.04.03.00/2019, in
  // force 15.6.2020) and Traficom's "Driving examination" page, checked 2026-11-06: categories C,
  // CE, D and DE are 20 multiple choice (14 to pass), 30 traffic picture questions (26) and 5 risk
  // recognition questions (4) in 30 minutes, each part passed separately. Topic areas from the
  // regulation (driving and rest times, goods or passengers, documents, accidents, tyre changing,
  // masses, dimensions and speed limiters, blind spots, route planning, load safety, passenger
  // responsibility, vehicle construction, lubrication and antifreeze, tyres, brakes and speed
  // governors, coupling, fault finding, maintenance; pictures on turning, giving way, overtaking,
  // lane changes, stopping, parking). No official weights, so the split is Tigertest's own. Rules
  // from the Road Traffic Act 729/2018 and its annexes, Act 730/2016 on alcohol interlocks and EU
  // Regulations 561/2006 (as amended 2020/1054) and 165/2014. 80% = 44 of 55, the real minimums
  // added up. Truck and bus in one bank. Pools are exactly 4x each count. All items original.
  blueprint: {
    fitrkHours: 7,
    fitrkTacho: 5,
    fitrkLoads: 6,
    fitrkPassengers: 5,
    fitrkVehicle: 5,
    fitrkBrakes: 7,
    fitrkRoad: 7,
    fitrkSafety: 5,
    fitrkRoute: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 24301, name: "Drivers' Hours & Tachographs", categories: ["fitrkHours", "fitrkTacho"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 2, id: 24302, name: "Loads & Passengers", categories: ["fitrkLoads", "fitrkPassengers"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 24303, name: "Brakes, Tyres & the Vehicle", categories: ["fitrkBrakes", "fitrkVehicle"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 24304, name: "Heavy Vehicles in Traffic", categories: ["fitrkRoad"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 5, id: 24305, name: "Blind Spots, Winter & Incidents", categories: ["fitrkSafety", "fitrkRoute"], size: 32, weightLabel: "8 of 50 test questions" },
  ],
  categoryLabels: {
    fitrkHours: "Driving & Rest Times",
    fitrkTacho: "Tachographs, Documents & Driver CPC",
    fitrkLoads: "Loads, Masses & Dimensions",
    fitrkPassengers: "Carrying Passengers",
    fitrkVehicle: "Vehicle Systems, Maintenance & Faults",
    fitrkBrakes: "Brakes, Tyres & Coupling",
    fitrkRoad: "Heavy Vehicles in Traffic",
    fitrkSafety: "Blind Spots, Risks & Fitness to Drive",
    fitrkRoute: "Route Planning, Winter & Incidents",
  },
  copy: {
    guestPrompt: "to save your truck and bus theory progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the Finnish and EU rules for truck and bus drivers, in English: driving and rest times, loads and passengers, brakes and tyres, heavy vehicles in traffic, and winter driving. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 40 or more",
    heroSubs: [
      "Five topics, four 50-question tests. Drivers' hours, brakes and traffic weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your theory test at Ajovarma.",
    ],
    sourceLine: "Based on the Finnish Road Traffic Act, the EU driving time and tachograph rules and Traficom's theory test topics. Original questions in English; 50 per test, 80% is Tigertest's target. Not affiliated with Traficom.",
    analyticsKey: "fitruck",
  },
};
```

Append `fitruck` to the `EXAMS` array right after `fitheory`.

Check: 24301-24305 (sets) and 24301-24304 (tests) are free (grepped `lib/` and every
`tools/next100/*/spec.json` on 2026-11-06: no `idBase: 243xx`, `FITRUCK` or `FITRK-`).

## lib/banks/all.ts

```ts
import "./fitruck";
```

## types/index.ts

- `QuestionType`: add `| "FITRUCK"`.
- `QuestionCategory`, under a `// Finland truck and bus theory test` comment:

```ts
  | "fitrkHours"
  | "fitrkTacho"
  | "fitrkLoads"
  | "fitrkPassengers"
  | "fitrkVehicle"
  | "fitrkBrakes"
  | "fitrkRoad"
  | "fitrkSafety"
  | "fitrkRoute"
```

(Grepped: no existing `fitrk` keys.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    fitrkHours: "Driving & Rest Times",
    fitrkTacho: "Tachographs, Documents & Driver CPC",
    fitrkLoads: "Loads, Masses & Dimensions",
    fitrkPassengers: "Carrying Passengers",
    fitrkVehicle: "Vehicle Systems, Maintenance & Faults",
    fitrkBrakes: "Brakes, Tyres & Coupling",
    fitrkRoad: "Heavy Vehicles in Traffic",
    fitrkSafety: "Blind Spots, Risks & Fitness to Drive",
    fitrkRoute: "Route Planning, Winter & Incidents",
```

## app/globals.css

The brief's hue `35 60% 26%` clashes under the 8-degree rule with cawhmis, zak53c3, upscse
(28 65% 30%), phrebroker (30 70% 22%), zare5 (40 55% 22%) and nzfirearms (30 55% 22%). Checked by
script against every light `[data-theme]` block in `app/globals.css` plus every proposal in
`tools/next100/*/WIRING.md` (306 themes): `35 40% 18%` (dark amber brown) clears all of them, white-text contrast 12.5:1. Lightness 18 is below the 30 to 48 band
like pkdrive's and phrebroker's; no in-band value within hue 15 to 55 clears the wheel except grey
25%-saturation tones (`39 25% 42%`, contrast 4.6). Then run `tools/gen_dark_brand_css.py` once.

```css
  /* Finland truck and bus theory test theme */
  [data-theme="fitruck"] {
    --brand: 35 40% 18%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 35 45% 95%;
    --brand-hover: 35 40% 14%;
    --brand-dark: 35 40% 12%;
    --brand-darker: 35 40% 8%;
    --brand-muted: 35 25% 68%;
    --brand-border: 35 25% 80%;
    --brand-border-light: 35 25% 89%;
    --brand-gradient-to: 45 50% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `fitruck: "Four 50-question mock tests in English for the Finnish truck and bus theory test (teoriakoe, categories C, CE, D and DE): EU driving and rest times, tachographs and code 95, load securing, carrying passengers, air brakes, 5 mm winter tyres and coupling, and heavy vehicles in Finnish traffic.",`
- `EXAM_ORG`: `fitruck: "Traficom · theory test at Ajovarma (A-Katsastus)",`
- Hub group: licence categories stay in the driving group (as `fihygiene`'s WIRING.md also says).
  Add `"fitruck"` to "EU driving theory tests" right after `"fitheory"` (and after `"fimoto"` if
  that sibling is wired first):
  `{ title: "EU driving theory tests", ids: ["detheorie", "esdgt", "ptimt", "bedriving", "dkteori", "setrafik", "fitheory", "fimoto", "fitruck", "grdriving", "rodrpciv", "hukresz", "mttheory"] },`
- `RELATED_OVERRIDES` (the group is big, but the nearest tests are the other heavy theory tests):
  `fitruck: ["fitheory", "iedttcv", "uklgv", "ukpcv"],`
- `SEARCH_ALIASES` (English, Finnish, Swedish):
  `fitruck: "finland truck theory test finland bus theory test finnish truck licence finnish bus licence lorry theory test finland hgv theory finland category c theory test category ce category d category de c theory test d theory test teoriakoe c teoriakoe ce teoriakoe d c-luokka ce-luokka d-luokka kuorma-auto kuorma-auton ajokortti kuorma-auto teoriakoe rekka rekkakortti linja-auto linja-auton ajokortti linja-auto teoriakoe bussikortti ammattipätevyys ammattipatevyys ajo- ja lepoajat ajopiirturi kuljettajakortti lastbil körkort lastbil buss körkort teoriprov c traficom ajovarma a-katsastus helsinki vantaa tampere turku oulu",`

## lib/region.ts

- `TEST_REGIONS`: `fitruck: "FI",` (next to `fitheory: "FI"`). A driving test, so NOT in `NON_DRIVING_TESTS`.
- Region `FI` already exists. Nothing else.

## lib/examFacts.ts

```ts
  fitruck: {
    answer:
      "The Finnish theory test for truck and bus categories C, CE, D and DE (teoriakoe) is taken on a tablet at an Ajovarma service point, run for Traficom by A-Katsastus. It has three parts in 30 minutes: 20 multiple choice questions, 30 picture questions about traffic situations and 5 risk recognition questions, and you must reach the minimum in each part (14, 26 and 4). Traficom's rules name Finnish, Swedish and English as the test languages; check the language for your category when you book. You need a valid category B licence, and you can take the test one month before the minimum age (21 for C and CE, or 18 with a basic professional qualification; 24 for D and DE). A passed theory test is valid for one year. Drivers in commercial transport also need professional competence (code 95).",
    rows: [
      { label: "Run by", value: "Traficom, at Ajovarma (A-Katsastus) service points" },
      { label: "Format", value: "20 multiple choice, 30 traffic picture questions, 5 risk recognition" },
      { label: "Pass marks", value: "14 of 20, 26 of 30 and 4 of 5, each part separately" },
      { label: "Time", value: "30 minutes (60 for an oral test)" },
      { label: "Languages", value: "Finnish, Swedish, English (check for your category)" },
      { label: "Valid for", value: "One year after passing" },
      { label: "Minimum age", value: "C and CE 21 (18 with a professional qualification), D and DE 24" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 80% target" },
    ],
    basedOn: "Traficom regulation on the driving theory test (TRAFICOM/523973/03.04.03.00/2019), Traficom's driving examination, lorry licence and bus licence pages, the Road Traffic Act 729/2018 and EU Regulation 561/2006 as amended, checked November 2026",
    source: { name: "Traficom: Driving examination", url: "https://traficom.fi/en/drivers-and-vehicles/driving-licenses/driving-examination" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` with a comment naming the Finland batch.

## lib/shareImageUrl.ts, lib/shareCardCopy.ts

Add `"fitruck"` to `SHARE_COPY_IDS`, and to the share copy:
`fitruck: { title: "Finland Truck and Bus Theory Test", description: "Review driving and rest times, tachographs, loads, passengers, brakes and winter rules for the C and D teoriakoe." },`

## lib/tigerAssets.ts

`BORROWED_SETS`: `fitruck: "cdl",` (like `iedttcv`, `uklgv`, `nzheavy`).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`. (Heavy licences are mostly taught by driving schools
and vocational colleges; the integrator may add it to `TEACHER_LED` with
`fitruck: "truck and bus licence courses at driving schools and vocational colleges"` if teacher-led
heavy tests are wanted, but `iedttcv` and `uklgv` are not in the list, so it is left out.)

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, middleware.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects, FI is
already a region with a homepage.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `truck` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Question quality hooks

- `python3 -I tools/build_exam_sources.py` so `lib/examSources.json` picks up
  `tools/next100/fitruck/sources.md` (first three URLs are the Traficom regulation, the driving
  examination page and the lorry licence page).
- No dated change pending: the theory test regulation is in force until further notice. Optional
  `lib/examFreshness.json` review entry: the oral-test transition ends 31 Dec 2026 (landing does not
  rely on it).
- `python3 -I tools/check_banks.py` PASSes with the bank in place (checked 2026-11-06).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing fitruck:finland-truck-theory:24301`

## CLAUDE.md (with the EU batch, after the Finland Theory Test bullet)

```md
- **Finland Truck and Bus Theory Test** (`fitruck`, the Finnish teoriakoe for categories C, CE, D and DE, `/finland-truck-theory/*`, landing `/finland-truck-theory-test`): `data/finland-truck-theory-questions.json` (200 original questions on Traficom's topic areas for heavy categories: driving and rest times 28, tachographs, documents and driver CPC 20, loads, masses and dimensions 24, carrying passengers 20, vehicle systems, maintenance and faults 20, brakes, tyres and coupling 28, heavy vehicles in traffic 28, blind spots, risks and fitness to drive 20, route planning, winter and incidents 12), test IDs 24301-24304 (50 questions each), sets 24301-24305 (by topic), state `FITRUCK`, prefix `FITRK-`, 80% pass (Tigertest's target, 44 of 55 as the real minimums add up; the real test is 20 multiple choice (14 to pass), 30 traffic picture questions (26) and 5 risk recognition questions (4) in 30 minutes, each part passed separately, per Traficom's regulation). 7/5/6/5/5/7/7/5/3 per test, no spares. Truck and bus in one bank: EU Reg 561/2006 with the Mobility Package (vans over 2.5 t abroad from 1 July 2026), tachographs (56 days of records), code 95 and 35 hours of continuing training, the Road Traffic Act's heavy vehicle rules (truck 80 km/h, bus 80 or 100 km/h with approved equipment and no standees, two right lanes on three-lane motorways for trucks and combinations over 7 m, 1 m front and 2 m rear overhang, 4.40 m height, 5 mm winter tread on driven axles, ABS on combinations over 22 m, 30% bus overload in public transport, seats only on school buses, school transport sign) and alcohol interlocks on school transport (Act 730/2016); no fines, masses or lengths. English test availability for C and D is not confirmed by Traficom by category, and the copy says to check when booking. Pictures and risk videos described in words; the CPC initial qualification is not modelled. Built by `tools/next100/fitruck/build.py`; sources in `tools/next100/fitruck/sources.md`. Region FI, hub group "EU driving theory tests", `[data-theme="fitruck"]` dark amber brown (35 40% 18%), borrows the CDL tiger.
```
