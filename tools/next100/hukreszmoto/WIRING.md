# Wiring for `hukreszmoto` (Hungary motorcycle theory exam, categories AM, A1, A2 and A, v1)

Files already written by the builder: `data/hungary-motorcycle-theory-questions.json` (200, PASS),
`lib/banks/hukreszmoto.ts`, `app/hungary-motorcycle-theory/*` (5 wrappers, copied from
`app/hungary-driving-theory/`), `app/hungary-motorcycle-theory-test/page.tsx` (landing, renders
`ExamSampleQuestions`), `tools/next100/hukreszmoto/*` (spec, sources, `q_*.py`, `build.py`).
Rebuild with `python3 -I tools/next100/hukreszmoto/build.py`. Everything below goes in shared files.

Format note: motorcycle learners sit the KAV computer-based "Közlekedési alapismeretek" exam with
category-specific questions. A1, A2 and A: 55 multiple-choice questions, 55 minutes, 75 points, 65
to pass (KAV curricula, A2 2020 and A after A1/A2 2023, both read 2026-11-06). AM: 25 questions,
25 minutes, 35 points, 30 to pass (KAV AM curriculum 2023). Tigertest models three A-length tests of
55 (165 items) plus 35 training-only spares (the last items of each pool), passPct 87
(ceil(0.87 x 55) = 48), close to 65/75 = 86.7% (AM's 30/35 is 85.7%). Guides say questions carry
unequal points; Tigertest scores all equally. English availability is from guides (eduKRESZ: the
motorcycle and B computer exams in Hungarian, German, English and Romanian), not a KAV page, so the
base language stays `en`, like `hukresz`. Dashboard = 5 sets + 3 tests = 8 steps. No set exceeds 60.
Region HU is already wired (by `hukresz`); this exam only joins it.

## lib/exams.ts

Add `"hukreszmoto"` to the `ExamId` union. Icon `bike` already exists.

Block (with the EU driving tests, right after `hukresz`):

```ts
const hukreszmoto: ExamConfig = {
  id: "hukreszmoto",
  stateCode: "HUKRMOTO",
  idBase: 24400,
  slug: "/hungary-motorcycle-theory",
  landingPath: "/hungary-motorcycle-theory-test",
  name: "Hungary Motorcycle Theory Practice Test",
  shortName: "Hungary motorcycle test",
  examLabel: "Hungary motorcycle theory exam",
  fullName: "Hungary motorcycle theory exam (Közlekedési alapismeretek), categories AM, A1, A2 and A",
  questionIdPrefix: "HUKRM-",
  icon: "bike",
  testCount: 3,
  questionsPerTest: 55,
  passPct: 87,
  // Real exam: KAV computer-based "Közlekedési alapismeretek" theory exam with motorcycle
  // questions. A1, A2 and A: 55 multiple-choice questions, 55 minutes, 75 points, 65 to pass (KAV
  // tantervi és vizsgakövetelmények, A2 2020 and A after A1/A2/A korl. 2023). AM: 25 questions,
  // 25 minutes, 35 points, 30 to pass (KAV AM document 2023). Guides say questions carry unequal
  // points; Tigertest scores every question equally, so passPct 87 = 48 of 55, close to 65/75.
  // Exam content per the A curriculum: traffic rules for riders, riding theory, and motorcycle
  // structure and operation. No official topic weights; this split is Tigertest's own. Rules from
  // the KRESZ (1/1975. (II. 5.) KPM-BM) and Decree 326/2011 as in force 2026-11-06; rules a car
  // driver shares are left to hukresz. Three A-length tests; pools are 3x each count plus 35
  // training-only spares. All items original.
  blueprint: {
    hukmLicence: 6,
    hukmGear: 5,
    hukmChecks: 6,
    hukmControl: 7,
    hukmPosition: 7,
    hukmSpeed: 6,
    hukmPriority: 6,
    hukmPassengers: 6,
    hukmHazards: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 24401, name: "Licences, Helmets & Gear", categories: ["hukmLicence", "hukmGear"], size: 40, weightLabel: "11 of 55 test questions" },
    { setNumber: 2, id: 24402, name: "Checks, Braking & Cornering", categories: ["hukmChecks", "hukmControl"], size: 48, weightLabel: "13 of 55 test questions" },
    { setNumber: 3, id: 24403, name: "Road Position & Junctions", categories: ["hukmPosition", "hukmPriority"], size: 48, weightLabel: "13 of 55 test questions" },
    { setNumber: 4, id: 24404, name: "Speed, Passengers & Mopeds", categories: ["hukmSpeed", "hukmPassengers"], size: 44, weightLabel: "12 of 55 test questions" },
    { setNumber: 5, id: 24405, name: "Hazards, Weather & Breakdowns", categories: ["hukmHazards"], size: 20, weightLabel: "6 of 55 test questions" },
  ],
  categoryLabels: {
    hukmLicence: "Categories, Licences & the Rider",
    hukmGear: "Helmets, Protective Gear & Being Seen",
    hukmChecks: "Motorcycle Checks & How It Works",
    hukmControl: "Braking, Cornering & Control",
    hukmPosition: "Road Position, Filtering & Overtaking",
    hukmSpeed: "Speed, Signs & Motorways for Riders",
    hukmPriority: "Junctions, Trams & Being Seen",
    hukmPassengers: "Passengers, Loads, Parking & Mopeds",
    hukmHazards: "Hazards, Weather, Night & Breakdowns",
  },
  copy: {
    guestPrompt: "to save your motorcycle theory progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on Hungarian rules and riding for AM, A1, A2 and A, in English. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Full tests · 55 questions, aim for 48 or more",
    heroSubs: [
      "Five topics, three 55-question tests. Control and road position weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a full test.",
      "Fix the misses, then retake.",
      "All done. Book your motorcycle theory exam.",
    ],
    sourceLine: "Based on the Hungarian Highway Code (KRESZ) and the KAV motorcycle curriculum. Original questions in English; 55 per test, 87% is close to the real 65 of 75 points.",
    analyticsKey: "hukreszmoto",
  },
};
```

Append `hukreszmoto` to the `EXAMS` array right after `hukresz`. Check: test IDs 24401-24403 and
set IDs 24401-24405 are free (grepped `lib/exams.ts` 2026-11-06: nothing in 24400-24499).

## lib/banks/all.ts

```ts
import "./hukreszmoto";
```

## types/index.ts

- `QuestionType`: add `| "HUKRMOTO"`.
- `QuestionCategory`, under a `// Hungary motorcycle theory exam` comment (grepped: no `hukm` keys):

```ts
  | "hukmLicence"
  | "hukmGear"
  | "hukmChecks"
  | "hukmControl"
  | "hukmPosition"
  | "hukmSpeed"
  | "hukmPriority"
  | "hukmPassengers"
  | "hukmHazards"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    hukmLicence: "Categories, Licences & the Rider",
    hukmGear: "Helmets, Protective Gear & Being Seen",
    hukmChecks: "Motorcycle Checks & How It Works",
    hukmControl: "Braking, Cornering & Control",
    hukmPosition: "Road Position, Filtering & Overtaking",
    hukmSpeed: "Speed, Signs & Motorways for Riders",
    hukmPriority: "Junctions, Trams & Being Seen",
    hukmPassengers: "Passengers, Loads, Parking & Mopeds",
    hukmHazards: "Hazards, Weather, Night & Breakdowns",
```

## app/globals.css

The suggested `160 30% 32%` clashes under the 8-degree rule with uptet (156 30% 31%) and hscmaths
(168 38% 30%); the darker variants near it hit ieqfa (165 40% 20%) and kenck (160 55% 22%). Checked every
`[data-theme]` block plus every hue in `tools/**/WIRING.md` (2026-11-06): `160 25% 22%` (deep sage
teal) clears all of them; white text contrast about 11:1. Lightness 22 is below the 30 to 48 band,
like most of this batch. Integrator picks; then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Hungary motorcycle theory exam theme */
  [data-theme="hukreszmoto"] {
    --brand: 160 25% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 160 25% 95%;
    --brand-hover: 160 25% 18%;
    --brand-dark: 160 27% 16%;
    --brand-darker: 160 28% 11%;
    --brand-muted: 160 15% 68%;
    --brand-border: 160 15% 78%;
    --brand-border-light: 160 14% 88%;
    --brand-gradient-to: 145 25% 95%;
  }
```

## lib/shareCards.ts, lib/shareCardCopy.ts, lib/shareImageUrl.ts

```ts
  "hukreszmoto": {
    "color": "hsl(160, 25%, 22%)",
    "tint": "hsl(160, 25%, 96%)"
  },
```
`SHARE_COPY` line:
`hukreszmoto: { title: "Hungary Motorcycle Theory Test", description: "Practise Hungarian rules for riders in English: AM, A1, A2 and A limits, filtering, bus lanes, mopeds, braking and cornering, in full 55-question tests." },`
and add `"hukreszmoto"` to `SHARE_COPY_IDS` in `lib/shareImageUrl.ts` (as hukresz is).

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `hukreszmoto: "Three full 55-question tests in English for Hungary's motorcycle theory exam (categories AM, A1, A2 and A): licence categories and power limits, helmets and gear, motorcycle checks, braking and cornering, filtering, bus lanes and overtaking, moped rules, passengers and parking, and riding hazards in rain, wind and at night.",`
- `EXAM_ORG`: `hukreszmoto: "KAV (Hungary's transport exam centre) · Közlekedési alapismeretek, categories AM, A1, A2 and A",`
- Hub group: a licence category, so the driving group "EU driving theory tests", right after
  `hukresz` (as fimoto, dkmoto, semoto and demotorrad sit after their car tests):
  `ids: [..., "rodrpciv", "hukresz", "hukreszmoto", "mttheory"]`. The group is large, so no
  `RELATED_OVERRIDES` line is needed. (If the integrator makes a Hungary group for hugki,
  huelsoseg and hubizt, those non-driving tests go in "Hungary licences and workplace exams" after
  this group; hukreszmoto stays with hukresz.)
- `SEARCH_ALIASES`:
  `hukreszmoto: "hungary motorcycle theory test hungarian motorcycle licence motorbike licence hungary moped licence hungary scooter licence am a1 a2 a category motoros kresz motoros kresz teszt kresz motor motor jogsi motorjogsi motoros jogosítvány motoros jogositvany motorkerékpár motorkerekpar segédmotoros kerékpár segedmotoros robogó robogo jogsi am kategória a1 kategória a2 kategória a kategória közlekedési alapismeretek motor kav motoros vizsga elméleti vizsga motor budapest",`

## lib/region.ts

- `TEST_REGIONS`: `hukreszmoto: "HU",` (a driving licence test, so NOT in `NON_DRIVING_TESTS`).
- Region HU, `REGIONS`, hreflang and `/hu` already exist. Optional copy update now that HU has a
  second driving test (`REGION_HOME.HU`):

```ts
    lead: "Practise in English for the Hungarian theory exams (Közlekedési alapismeretek) before your car or motorcycle test. Original questions on Hungarian signs, the right-hand rule, trams, speed limits and riding, every answer explained. No signup.",
    testsTitle: "Car and motorcycle theory exams",
    testsSub: "200 questions each on the Hungarian Highway Code, in km/h for right-hand traffic. Three full 55-question tests per licence; the real exam needs 65 of 75 points.",
```

## components/home/HomePage.tsx

Nothing: `AUTHORITY.HU` ("the KAV or any Hungarian authority") already fits.

## lib/examFacts.ts

```ts
  hukreszmoto: {
    answer:
      "Motorcycle and moped learners in Hungary sit the computer-based theory exam Közlekedési alapismeretek at a centre of the KAV, the national transport exam centre, with questions for their category. For categories A1, A2 and A it has 55 multiple-choice questions in 55 minutes, worth 75 points, and you need at least 65. For the AM moped category it has 25 questions in 25 minutes, worth 35 points, and you need 30. Guides say the motorcycle and car exams can be taken in Hungarian, English, German and Romanian. AM is open from 14, A1 from 16, A2 from 18, and A from 20 after two years on A2 or from 24 without it.",
    rows: [
      { label: "Run by", value: "KAV Közlekedési Alkalmassági és Vizsgaközpont" },
      { label: "A1, A2, A", value: "55 questions, 55 minutes, 65 of 75 points to pass" },
      { label: "AM (moped)", value: "25 questions, 25 minutes, 30 of 35 points to pass" },
      { label: "Languages", value: "Hungarian, English, German, Romanian (guides)" },
      { label: "Minimum age", value: "AM 14, A1 16, A2 18, A 20 (after two years on A2) or 24" },
      { label: "Then", value: "Handling and road riding tests" },
      { label: "Tigertest tests", value: "3 x 55 questions, 87% target" },
    ],
    basedOn: "KAV curriculum and exam requirements for categories A2 (2020), A after A1/A2 (2023) and AM (2023), Government Decree 326/2011 Annex 7 and the KRESZ (1/1975. (II. 5.) KPM-BM decree) as in force in November 2026, checked November 2026",
    source: { name: "KAV Közlekedési Alkalmassági és Vizsgaközpont", url: "https://www.vizsgakozpont.hu/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` (and `HUB_PAGES_UPDATED_AT` for the hub group and `/hu`) with a
comment naming the Hungary batch.

## lib/tigerAssets.ts

`BORROWED_SETS`: `hukreszmoto: "moto",` (the motorcycle tiger, like ukmoto, nzmoto and fimoto).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, components/TestIcon.tsx, CDLHeader

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects, `bike`
icon exists. `llms.txt` picks the exam up from the catalog and `EXAM_FACTS`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing hukreszmoto:hungary-motorcycle-theory:24401`

## CLAUDE.md (with the EU batch, right after the Hungary KRESZ bullet)

```md
- **Hungary Motorcycle Theory** (`hukreszmoto`, KAV theory exam "Közlekedési alapismeretek" for categories AM, A1, A2 and A, in English, `/hungary-motorcycle-theory/*`, landing `/hungary-motorcycle-theory-test`): `data/hungary-motorcycle-theory-questions.json` (200 original questions on the KRESZ (decree 1/1975) and Decree 326/2011 as in force Nov 2026 and the subjects of the KAV A curriculum: categories, licences and the rider 22, helmets, gear and being seen 18, motorcycle checks and how it works 22, braking, cornering and control 26, road position, filtering and overtaking 26, speed, signs and motorways for riders 22, junctions, trams and being seen 22, passengers, loads, parking and mopeds 22, hazards, weather, night and breakdowns 20), three real-length tests: test IDs 24401-24403 (55 questions each), sets 24401-24405 (by topic), state `HUKRMOTO`, prefix `HUKRM-`, 87% pass (48 of 55, close to the real A1/A2/A 65 of 75 points; AM is 25 questions, 30 of 35 points; Tigertest scores all equally). 6/5/6/7/7/6/6/6/6 per test; the last items of each pool (35 in all) are training-only. Rider rules: AM 14 / 45 km/h / 50 cc, A1 16 / 125 cc / 11 kW / 0.1 kW/kg, A2 18 / 35 kW / 0.2 kW/kg / not from over double the power, A at 20 after two years on A2 or 24; fastened helmets for rider and passenger; dipped beam by day; filtering between stopped vehicles if there is room and no one signalling is hindered; bus lanes without disturbing buses; one pillion whose feet reach the footrests; mopeds 40 km/h, no motorways or expressways, no passenger on two wheels, no trailer, single file, no cycle lanes in town; no warning triangle and no towing for two-wheelers; parking two abreast and pavement stopping with 1.5 m free. Rules a car driver shares are left to `hukresz`; stems checked against every motorcycle bank. English availability from guides only. Signs described in words. Built by `tools/next100/hukreszmoto/build.py`; sources in `tools/next100/hukreszmoto/sources.md`. Region HU, hub group "EU driving theory tests" (after hukresz), `[data-theme="hukreszmoto"]` deep sage teal (160 25% 22%), borrows the motorcycle tiger.
```
