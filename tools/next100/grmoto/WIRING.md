# Wiring for `grmoto` (Greece motorcycle theory test, categories A1, A2 and A, v1)

Files already written by the builder: `data/greece-motorcycle-questions.json` (200, PASS),
`lib/banks/grmoto.ts`, `app/greece-motorcycle-theory/*` (layout, redirect, dashboard, drill,
stats; copied from `app/greece-driving-theory/`, no test or practice folders),
`app/greece-motorcycle-theory-test/page.tsx` (renders `ExamSampleQuestions`),
`tools/next100/grmoto/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/grmoto/build.py`. Everything below goes in shared files.

Format note: the Ministry's computer theory test page (ΜΣΘΕΥΟ) confirms a motorcycle (δίκυκλο)
licence group with a random questionnaire per candidate and shuffled answers, but gives no count,
time or pass mark. Guides (autoviatest, read 2026-11-07) give 30 questions and 29 to pass for the
motorcycle test, the same as the car test; no source gives its time, so none is stated. Law
4850/2021 art. 6 makes the questionnaires available in foreign languages. Tigertest models six
real-length 30-question tests at passPct 96 (ceil(0.96 x 30) = 29), like `grdriving`. Pools are 6x
each per-test count plus spares: 20 training-only items (the last of each pool by ID). Dashboard =
4 topic sets + 6 tests = 10 steps. No set exceeds 60. Test IDs 25301-25306, set IDs 25301-25304.
Lane: motorcycle-specific content only; no road-sign, priority-from-the-right, tram, roundabout,
zebra, pavement-parking or alcohol-figure items (all asked in `grdriving`).

## lib/exams.ts

Add `"grmoto"` to the `ExamId` union. Icon `bike` already exists.

Block (after `grdriving`):

```ts
const grmoto: ExamConfig = {
  id: "grmoto",
  stateCode: "GRMOTO",
  idBase: 25300,
  slug: "/greece-motorcycle-theory",
  landingPath: "/greece-motorcycle-theory-test",
  name: "Greece Motorcycle Theory Test Practice",
  shortName: "Greece motorcycle theory",
  examLabel: "Greek motorcycle theory test",
  fullName: "Greece motorcycle theory test (categories A1, A2 and A)",
  questionIdPrefix: "GRMOTO-",
  icon: "bike",
  testCount: 6,
  questionsPerTest: 30,
  passPct: 96,
  // Greek motorcycle theory test (licence group "δίκυκλο" of the Ministry of Infrastructure and
  // Transport's computer theory test, ΜΣΘΕΥΟ): random multiple-choice questionnaire per
  // candidate, offered in foreign languages (Law 4850/2021 art. 6). 30 questions, 29 to pass per
  // guides (autoviatest, Nov 2026); not confirmed on a ministry page, and no time is published.
  // No topic weights are published; these are Tigertest's, riding control and road position
  // heaviest. Rider rules from the 2025 Highway Code (Law 5209/2025 arts. 21, 33, 37, 38, 44) as in
  // force 2026-11-07. Six real-length tests; pools are 6x each count plus 20 training-only spares.
  // passPct 96 = ceil(0.96 * 30) = 29. All items original; no road-sign items (grdriving's lane).
  blueprint: {
    grmoLicence: 3,
    grmoGear: 4,
    grmoBike: 3,
    grmoControl: 5,
    grmoPosition: 5,
    grmoJunctions: 4,
    grmoPassenger: 2,
    grmoHazards: 3,
    grmoRules: 1,
  },
  trainingSets: [
    { setNumber: 1, id: 25301, name: "Gear & the Machine", categories: ["grmoGear", "grmoBike"], size: 46, weightLabel: "7 of 30 test questions" },
    { setNumber: 2, id: 25302, name: "Control & Road Hazards", categories: ["grmoControl", "grmoHazards"], size: 52, weightLabel: "8 of 30 test questions" },
    { setNumber: 3, id: 25303, name: "Road Position & Junctions", categories: ["grmoPosition", "grmoJunctions"], size: 58, weightLabel: "9 of 30 test questions" },
    { setNumber: 4, id: 25304, name: "Licences, Passengers & the Code", categories: ["grmoLicence", "grmoPassenger", "grmoRules"], size: 44, weightLabel: "6 of 30 test questions" },
  ],
  categoryLabels: {
    grmoLicence: "Licences, Documents & Rider Conduct",
    grmoGear: "Helmets & Protective Gear",
    grmoBike: "Motorcycle Checks & Controls",
    grmoControl: "Braking, Cornering & Control",
    grmoPosition: "Road Position, Filtering & Overtaking",
    grmoJunctions: "Junctions, Priority & Being Seen",
    grmoPassenger: "Passengers & Loads",
    grmoHazards: "Road Surfaces, Weather & Hazards",
    grmoRules: "Highway Code Rules for Riders",
  },
  copy: {
    guestPrompt: "to save your Greek motorcycle theory progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets on riding skills and the 2025 Greek Highway Code's rules for riders, in English. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 30 questions, 29 to pass",
    heroSubs: [
      "Four topics, six real-length tests. One mistake is all you can afford.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Ask your driving school to book your motorcycle theory test.",
    ],
    sourceLine: "Based on the Greek Highway Code (2025) and motorcycle safety practice. Original questions in English; 30 per test, 29 to pass as guides report.",
    analyticsKey: "grmoto",
  },
};
```

Append `grmoto` to the `EXAMS` array right after `grdriving`.

Check: 25301-25306 (tests) and 25301-25304 (sets) must be free (the batch reserves idBase 25300;
`grep -n "253[0-9][0-9]" lib/exams.ts` was empty on 2026-11-07).

## lib/banks/all.ts

```ts
import "./grmoto";
```

## types/index.ts

- `QuestionType`: add `| "GRMOTO"`.
- `QuestionCategory`, under a `// Greece motorcycle theory` comment (no `grmo` keys exist yet):

```ts
  | "grmoLicence"
  | "grmoGear"
  | "grmoBike"
  | "grmoControl"
  | "grmoPosition"
  | "grmoJunctions"
  | "grmoPassenger"
  | "grmoHazards"
  | "grmoRules"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    grmoLicence: "Licences, Documents & Rider Conduct",
    grmoGear: "Helmets & Protective Gear",
    grmoBike: "Motorcycle Checks & Controls",
    grmoControl: "Braking, Cornering & Control",
    grmoPosition: "Road Position, Filtering & Overtaking",
    grmoJunctions: "Junctions, Priority & Being Seen",
    grmoPassenger: "Passengers & Loads",
    grmoHazards: "Road Surfaces, Weather & Hazards",
    grmoRules: "Highway Code Rules for Riders",
```

## app/globals.css

The brief's 25 60% 34% clashes (within 8 degrees, under 15 saturation and 8 lightness apart) with
cacarp, sscmts, biharpolice, upscse, phrebroker and nzfirearms. I ran the checker over every theme
in `globals.css` plus every pending `tools/next100/*/WIRING.md`: nothing from hue 10 to 45 at 28
to 42% lightness is free. The nearest free terracotta is **16 35% 22%** (dark terracotta, white
text well above 4.5:1). Integrator settles. Then run `tools/gen_dark_brand_css.py` once.

```css
  /* Greece motorcycle theory theme */
  [data-theme="grmoto"] {
    --brand: 16 35% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 16 40% 96%;
    --brand-hover: 16 35% 18%;
    --brand-dark: 16 35% 16%;
    --brand-darker: 16 35% 11%;
    --brand-muted: 16 20% 68%;
    --brand-border: 16 25% 80%;
    --brand-border-light: 16 25% 90%;
    --brand-gradient-to: 30 45% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `grmoto: "Six 30-question mock tests in English for the Greek motorcycle theory test, categories A1, A2 and A: helmets and gear, braking and cornering, filtering and road position under the 2025 Highway Code, junctions and being seen, passengers and loads, road surfaces and the rider rules of the Code.",`
- `EXAM_ORG`: `grmoto: "Ministry of Infrastructure and Transport · Transport Directorate theory test, motorcycle group",`
- Hub group: a licence category, so it joins the driving group. Add `"grmoto"` to
  "EU driving theory tests" right after `"grdriving"`:
  `{ title: "EU driving theory tests", ids: ["detheorie", "esdgt", "ptimt", "bedriving", "dkteori", "setrafik", "fitheory", "grdriving", "grmoto", "rodrpciv", "hukresz", "mttheory"] },`
  (If the integrator splits the EU group by country, as `ptmoto` proposes for Portugal, use
  `{ title: "Greece driving tests", ids: ["grdriving", "grmoto"] },` right after "EU driving
  theory tests", and the Greek non-driving siblings go in a Greece group after it.)
- `RELATED_OVERRIDES` (riders compare motorcycle tests):
  `grmoto: ["grdriving", "ukmoto", "nzmoto"],`
  and add `"grmoto"` at the front of `grdriving`'s override list if it has one.
- `SEARCH_ALIASES` (English and Greek):
  `grmoto: "greece motorcycle theory test greek motorcycle licence test in english greek motorbike licence motorcycle licence greece category a greece a1 licence greece a2 licence greece 125cc licence greece scooter licence greece moped licence greece diploma michanis diploma motosikletas δίπλωμα μηχανής δίπλωμα μοτοσυκλέτας δίπλωμα μοτοσικλέτας θεωρητικές εξετάσεις μηχανής κατηγορία Α κατηγορία Α1 κατηγορία Α2 δίκυκλο theory test athens thessaloniki crete",`

## lib/region.ts

- `TEST_REGIONS`: add `grmoto: "GR",` next to `grdriving` (a driving licence test, so NOT in
  `NON_DRIVING_TESTS`).
- `REGION_HOME.GR` stays as it is (its CTA is the car test). Optional, once `grmoto` is wired,
  extend `testsSub`:
  `"200 questions on the Greek Highway Code, in km/h for right-hand traffic. Six full 30-question tests, 29 to pass. Riding? The motorcycle theory test (A1, A2 and A) has its own 200 questions."`

## components/home/HomePage.tsx

Nothing: `AUTHORITY.GR` already names the Ministry and the Transport Directorates.

## lib/examFacts.ts

```ts
  grmoto: {
    answer:
      "The Greek motorcycle theory test is the computer-based multiple-choice test for categories A1, A2 and A, taken at a Transport Directorate exam centre before the practical riding test. The Ministry of Infrastructure and Transport runs its computer theory test in four licence groups, car, motorcycle, lorry and bus, and draws each candidate's questionnaire at random from its question bank. Greek law makes the questionnaires available in foreign languages as well as in Greek, in Greek with audio and in Greek Sign Language. Guides describe the motorcycle test like the car test, 30 questions with a pass at 29 correct; check the time and the current rule with your driving school or Transport Directorate. A1 covers motorcycles up to 125 cc and 11 kW, A2 up to 35 kW, and A any motorcycle.",
    rows: [
      { label: "Run by", value: "Ministry of Infrastructure and Transport (Transport Directorates)" },
      { label: "Format", value: "Multiple choice on a computer, random draw from the question bank, motorcycle licence group" },
      { label: "Questions", value: "30 (as guides report)" },
      { label: "Pass mark", value: "29 of 30 (as guides report)" },
      { label: "Languages", value: "Greek and foreign languages; Greek with audio; Greek Sign Language" },
      { label: "Categories", value: "A1 (125 cc, 11 kW), A2 (35 kW), A (no limit)" },
      { label: "Rules tested", value: "Greek Highway Code (Law 5209/2025) and safe riding" },
      { label: "Tigertest mock tests", value: "6 x 30 questions, 29 to pass" },
    ],
    basedOn: "The Ministry of Infrastructure and Transport's computer theory test page, Law 4850/2021 article 6, the 2025 Highway Code (Law 5209/2025) articles 21, 33, 37, 38 and 44, EU Directive 2006/126/EC category limits and guides on the test format, checked November 2026",
    source: { name: "Ministry of Infrastructure and Transport: computer theory test (ΜΣΘΕΥΟ)", url: "https://www.yme.gov.gr/metafores/adeies-odigisis/theoritiki-exetasi-ypopsifion-odigon-meso-i-y-mstheyo" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## lib/tigerAssets.ts

`BORROWED_SETS`: `grmoto: "moto",` (the motorcycle tiger, like `ptmoto`, `zak53moto` and `nzmoto`;
check the key `ptmoto` used once it is wired).

## lib/shareCardCopy.ts, lib/shareCards.ts, lib/shareImageUrl.ts

```ts
  grmoto: { title: "Greece Motorcycle Theory Test", description: "Practise filtering, gear, braking, cornering and the 2025 rider rules in English for the Greek A1, A2 and A theory test." },
```

```json
  "grmoto": {
    "color": "hsl(16, 35%, 22%)",
    "tint": "hsl(16, 40%, 96%)"
  },
```

and `"grmoto"` in `SHARE_COPY_IDS`.

## Generated files

- `npx tsx scripts/build-training-parts.ts` (no set exceeds 60, so no parts; writes the bank size
  to `lib/examBankSizes.json`).
- `npx tsx scripts/build-landing-dates.ts` after committing.
- `python3 -I tools/build_exam_sources.py` (picks up `tools/next100/grmoto/sources.md`).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `bike` already exists.

## TEACHER_LED / TeachNudge / ExamClassFaq

Nothing: driving licence tests are not in `TEACHER_LED`.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing grmoto:greece-motorcycle-theory:25301`

## CLAUDE.md (after the Greece Driving Theory bullet under the EU driving theory tests)

```md
- **Greece Motorcycle Theory** (Greek theory test for categories A1, A2 and A, in English, `/greece-motorcycle-theory/*`, landing `/greece-motorcycle-theory-test`): `data/greece-motorcycle-questions.json` (200 original questions on riding and the Greek Highway Code's rules for riders (Law 5209/2025): licences, documents and rider conduct 20, helmets and protective gear 26, motorcycle checks and controls 20, braking, cornering and control 32, road position, filtering and overtaking 32, junctions, priority and being seen 26, passengers and loads 14, road surfaces, weather and hazards 20, Highway Code rules for riders 10), six real-length tests: test IDs 25301-25306 (30 questions each), sets 25301-25304 (by topic), state `GRMOTO`, prefix `GRMOTO-`, 96% pass (29 of 30, the format guides report for the motorcycle group of the Ministry's computer theory test, the same as the car test; no time is published). 3/4/3/5/5/4/2/3/1 per test; the last items of each pool (20 in all) are training-only. Rider rules: filtering between stopped lanes of the same direction on roads with two or more lanes each way at up to 20 km/h with dipped lights (art. 21), no riding abreast, no earphones, phone and camera only in a fixed holder, no towing or pushing objects, both hands on the bars except to signal (art. 44), passenger only on the pillion seat with feet on the footrests and a child of five or under in an approved restraint (art. 37), two-wheelers may park side by side or at an angle and need no warning device (art. 38), motorways barred to vehicles that cannot exceed 70 km/h (art. 33); A1 125 cc and 11 kW, A2 35 kW. No licence ages (sources disagree), fines, points, alcohol figures or road-sign items (signs, priority from the right and the 0.2 g/l rider limit are `grdriving`'s). Situations described in words. Built by `tools/next100/grmoto/build.py`; sources in `tools/next100/grmoto/sources.md`. Region GR, hub group "EU driving theory tests" (after `grdriving`), `[data-theme="grmoto"]` dark terracotta (16 35% 22%), borrows the motorcycle tiger.
```

## Review (2026-11-07)
Reviewer pass done: 42 items rewritten in the sources (duplicates of `grdriving` and other
motorcycle banks, two factual or wording fixes), bank rebuilt, validator PASS. Landing FAQ no
longer says English is offered (the law lists no languages) and labels the 2021 125 cc route as
guides' description. Nothing above in this file changed.
