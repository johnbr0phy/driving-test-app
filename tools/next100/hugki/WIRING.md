# Wiring for `hugki` (Hungary GKI, Driver CPC theory exams for truck and bus drivers, v1)

Files already written by the builder: `data/hungary-gki-questions.json` (200, PASS),
`lib/banks/hugki.ts`, `app/hungary-gki/*` (layout, redirect, dashboard, drill, stats; copied from
`app/hungary-driving-theory/`, no test or practice folders), `app/hungary-driver-cpc-gki-test/page.tsx`
(landing, renders `ExamSampleQuestions` like hukresz), `tools/next100/hugki/*` (spec, sources,
`q_*.py`, `build.py`, this file). Rebuild with `python3 -I tools/next100/hugki/build.py`.
Everything below goes in shared files.

Format note (official, KAV-published GKI curriculum and exam requirements, signed 2025-03-11, in
force 2025-03-17): the basic qualification (CA truck, DA bus, CDA both) has three computer-based
theory subjects, BSZAVSZ, EASZ and EKKKBSZLSZ, each 40 multiple-choice questions in 40 minutes,
40 points, 30 to pass; then a 120-minute written case study (100 points, 60 to pass) and practical
exams, not modelled. Tigertest models four 40-question tests that mix the three subjects
(14 + 13 + 13 per test, Tigertest's split), passPct 75 = ceil(0.75 x 40) = 30, the real line.
Pools are 4 x each count plus 4 training-only spares (40 in all). Dashboard = 5 sets + 4 tests
= 9 steps; no set exceeds 60. Truck and bus share one bank.

## lib/exams.ts

Add `"hugki"` to the `ExamId` union. Icon `truck` already exists.

Block (with the international driving tests, after `hukresz`):

```ts
const hugki: ExamConfig = {
  id: "hugki",
  stateCode: "HUGKI",
  idBase: 24500,
  slug: "/hungary-gki",
  landingPath: "/hungary-driver-cpc-gki-test",
  name: "Hungary GKI (Driver CPC) Theory Practice Test",
  shortName: "Hungary GKI test",
  examLabel: "Hungary GKI theory exam",
  fullName: "Hungary GKI (Driver CPC) theory exams, truck and bus (Gépjárművezetői Képesítési Igazolvány)",
  questionIdPrefix: "HUGKI-",
  icon: "truck",
  testCount: 4,
  questionsPerTest: 40,
  passPct: 75,
  // Real exam: GKI basic qualification (EU Driver CPC), KAV computer-based theory exams per the
  // "Tantervi és vizsgakövetelmények" for bus and truck driver courses (signed 2025-03-11, in
  // force 2025-03-17): three subjects, BSZAVSZ (safe, rational driving), EASZ (applying the
  // regulations) and EKKKBSZLSZ (health, road and environmental safety, service, logistics), each
  // 40 multiple-choice questions in 40 minutes, 40 points, 30 to pass. Case study (120 min,
  // 60/100) and practical exams not modelled. Tigertest's tests mix the three subjects 14/13/13;
  // the split inside each subject is Tigertest's (the curriculum gives no weights). passPct 75 =
  // 30 of 40, the real line. Test sheets in English and Russian since September 2022, Serbian and
  // Ukrainian since 2020 (trade press). Pools are 4x each count plus 4 training-only spares.
  // All items original; the KAV bank is not public.
  blueprint: {
    hugkiEco: 4,
    hugkiBrakes: 4,
    hugkiLoads: 3,
    hugkiPassengers: 3,
    hugkiHours: 5,
    hugkiTacho: 3,
    hugkiLaw: 5,
    hugkiHealth: 5,
    hugkiEmergency: 4,
    hugkiBusiness: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 24501, name: "Eco-Driving & Brakes", categories: ["hugkiEco", "hugkiBrakes"], size: 40, weightLabel: "8 of 40 test questions" },
    { setNumber: 2, id: 24502, name: "Loads & Passengers", categories: ["hugkiLoads", "hugkiPassengers"], size: 32, weightLabel: "6 of 40 test questions" },
    { setNumber: 3, id: 24503, name: "Driving Times & Tachographs", categories: ["hugkiHours", "hugkiTacho"], size: 40, weightLabel: "8 of 40 test questions" },
    { setNumber: 4, id: 24504, name: "Rules, Permits & the Business", categories: ["hugkiLaw", "hugkiBusiness"], size: 44, weightLabel: "9 of 40 test questions" },
    { setNumber: 5, id: 24505, name: "Health, Safety & Emergencies", categories: ["hugkiHealth", "hugkiEmergency"], size: 44, weightLabel: "9 of 40 test questions" },
  ],
  categoryLabels: {
    hugkiEco: "Eco-Driving, Engine & Fuel",
    hugkiBrakes: "Brakes & Safety Systems",
    hugkiLoads: "Loads, Stability & Securing",
    hugkiPassengers: "Buses & Passengers",
    hugkiHours: "Driving Times, Rest & Working Time",
    hugkiTacho: "Tachographs",
    hugkiLaw: "Hungarian Rules, Permits & Documents",
    hugkiHealth: "Health, Fitness & Fatigue",
    hugkiEmergency: "Emergencies, Crime & Security",
    hugkiBusiness: "Transport Business, Service & Logistics",
  },
  copy: {
    guestPrompt: "to save your GKI exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets for truck and bus drivers, in English. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Full tests · 40 questions, 30 to pass like each real subject",
    heroSubs: [
      "Five topics, four 40-question tests. Driving times and the rules weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a full test.",
      "Fix the misses, then retake.",
      "All done. Book your GKI exams through your course provider.",
    ],
    sourceLine: "Original questions in English on the GKI curriculum, EU driving time and tachograph rules and Hungarian law (2026). Each real subject is 40 questions, 30 to pass. Not affiliated with the KAV.",
    analyticsKey: "hugki",
  },
};
```

Append `hugki` to the `EXAMS` array right after `hukresz`. Check: test IDs 24501-24504 and set
IDs 24501-24505 are free (idBase 24500 assigned in the task).

## lib/banks/all.ts

```ts
import "./hugki";
```

## types/index.ts

- `QuestionType`: add `| "HUGKI"`.
- `QuestionCategory`, under a `// Hungary GKI (Driver CPC) theory exams` comment (keys grepped:
  no collision):

```ts
  | "hugkiEco"
  | "hugkiBrakes"
  | "hugkiLoads"
  | "hugkiPassengers"
  | "hugkiHours"
  | "hugkiTacho"
  | "hugkiLaw"
  | "hugkiHealth"
  | "hugkiEmergency"
  | "hugkiBusiness"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five, as hukresz)

```ts
    hugkiEco: "Eco-Driving, Engine & Fuel",
    hugkiBrakes: "Brakes & Safety Systems",
    hugkiLoads: "Loads, Stability & Securing",
    hugkiPassengers: "Buses & Passengers",
    hugkiHours: "Driving Times, Rest & Working Time",
    hugkiTacho: "Tachographs",
    hugkiLaw: "Hungarian Rules, Permits & Documents",
    hugkiHealth: "Health, Fitness & Fatigue",
    hugkiEmergency: "Emergencies, Crime & Security",
    hugkiBusiness: "Transport Business, Service & Logistics",
```

## app/globals.css

Suggested hue `35 45% 30%` clashes with notary (35 45% 36%), nhie (30 35% 28%), praxis5001
(39 40% 26%) and zare5 (40 55% 37%). Checked every theme in `app/globals.css` (rule: within 8
degrees, differ by 15 saturation or 8 lightness) and white-text contrast: the nearest free value
is `35 40% 18%`, a dark walnut amber (white text 12.5:1; batch 4 already uses lightness
16 to 22). Lighter alternative, also free: `35 20% 26%` (muted brown-grey). Integrator picks;
write the same value into `shareCards.ts`. Siblings hukreszmoto, huelsoseg and hubizt are being
wired at the same time: check their hues against this one.

```css
  /* Hungary GKI (Driver CPC) theory exams theme */
  [data-theme="hugki"] {
    --brand: 35 40% 18%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 35 35% 95%;
    --brand-hover: 35 42% 14%;
    --brand-dark: 35 45% 12%;
    --brand-darker: 35 50% 8%;
    --brand-muted: 35 20% 60%;
    --brand-border: 35 20% 75%;
    --brand-border-light: 35 18% 87%;
    --brand-gradient-to: 25 35% 95%;
  }
```
Then run `tools/gen_dark_brand_css.py` once for everyone.

## lib/shareCards.ts, lib/shareCardCopy.ts, lib/shareImageUrl.ts

```ts
  "hugki": {
    "color": "hsl(35, 40%, 18%)",
    "tint": "hsl(35, 35%, 96%)"
  },
```
`SHARE_COPY` line:
`hugki: { title: "Hungary GKI Driver CPC Test", description: "Practise driving times, tachographs, brakes, loads, passengers and Hungarian heavy vehicle rules in English, in 40-question tests." },`
and add `"hugki"` to `SHARE_COPY_IDS` in `lib/shareImageUrl.ts` (as hukresz is).

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `hugki: "Four 40-question tests in English for the GKI theory exams, Hungary's EU Driver CPC for truck and bus drivers: eco-driving and brakes, loads and passengers, EU driving and rest times, tachographs, Hungarian heavy vehicle rules and permits, health, emergencies and logistics.",`
- `EXAM_ORG`: `hugki: "KAV (Hungary's transport exam centre) · GKI (Driver CPC) theory exams, truck and bus",`
- Hub group, new, placed right after "EU driving theory tests":
  `{ title: "Hungary licences and professional exams", ids: ["hugki", "huelsoseg", "hubizt"] },`
  (sibling ids as they land; hukreszmoto, a licence category, goes in the driving group with
  hukresz). If the integrator prefers to keep professional driving tests in a driving group, as
  iedttcv sits in "Ireland driving tests", put `hugki` after `hukresz` in "EU driving theory tests"
  instead. Until the Hungary group has three members, add `RELATED_OVERRIDES`:
  `hugki: ["hukresz", "iedttcv", "uklgv"],`
- `SEARCH_ALIASES`:
  `hugki: "gki gki vizsga gki teszt gki elmeleti vizsga gki elméleti vizsga gki angolul gki english driver cpc hungary hungarian driver cpc code 95 95 kod 95-ös kód gépjárművezetői képesítési igazolvány gepjarmuvezetoi kepesitesi igazolvany tehergépkocsi-vezető autóbuszvezető kamionos vizsga buszvezető vizsga truck driver exam hungary bus driver exam hungary professional driver hungary bszav easz ekkkbszl alapképzés továbbképzés kav vizsgakozpont",`

## lib/region.ts

```ts
// TEST_REGIONS:
  hugki: "HU",
```
It is a professional driving qualification, like iedttcv: NOT in `NON_DRIVING_TESTS`.

Optional, for the `/hu` homepage once more Hungary tests land: extend `REGION_HOME.HU.lead` to
mention "the GKI (Driver CPC) theory exams for truck and bus drivers". No change is needed for the
page to list the test.

## lib/examFacts.ts

```ts
  hugki: {
    answer:
      "The GKI (gépjárművezetői képesítési igazolvány) is Hungary's EU Driver CPC, which truck and bus drivers need to drive for work. After a compulsory course of at least 44 hours (66 for truck and bus together), you sit three computer-based theory exams at a KAV centre: safe and rational driving, applying the regulations, and health, safety, service and logistics. Each has 40 multiple-choice questions in 40 minutes, and you need 30 of 40 points in each. A 120-minute written case study (60 of 100 points to pass) and practical exams follow, and everything must be passed within a year of starting the course. According to the trade press, since September 2022 the theory exams can be taken in English or Russian without an interpreter. The GKI card carries the EU code 95, is valid for five years and is renewed by periodic training of at least 35 hours.",
    rows: [
      { label: "Run by", value: "KAV Közlekedési Alkalmassági és Vizsgaközpont" },
      { label: "Theory exams", value: "3 subjects, 40 multiple-choice questions each" },
      { label: "Time", value: "40 minutes per subject" },
      { label: "Pass mark", value: "30 of 40 points in each subject" },
      { label: "Case study", value: "120 minutes, 60 of 100 points (not modelled)" },
      { label: "Languages", value: "Hungarian, English, Russian, Serbian, Ukrainian (trade press)" },
      { label: "Card valid for", value: "5 years, code 95 on the licence" },
      { label: "Tigertest tests", value: "4 x 40 questions, 75% target" },
    ],
    basedOn: "the KAV-published GKI curriculum and exam requirements (in force 17 March 2025), Decree 24/2005 GKM and EU Regulations 561/2006 and 165/2014, checked November 2026",
    source: { name: "KAV Közlekedési Alkalmassági és Vizsgaközpont", url: "https://vizsgakozpont.hu/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date if the wave does.

## lib/tigerAssets.ts

`BORROWED_SETS`: `hugki: "cdl",` (the CDL tiger, like iedttcv).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: not added to `TEACHER_LED` (GKI courses are run by training providers, but the brief did
not list it; add `hugki` there if the integrator treats course providers as teachers).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, components/TestIcon.tsx, CDLHeader

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects, `truck`
icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing hugki:hungary-gki:24501`

## CLAUDE.md (with the international driving tests, after Hungary KRESZ)

```md
- **Hungary GKI** (`hugki`, Hungary's EU Driver CPC (gépjárművezetői képesítési igazolvány, code 95) for truck and bus drivers, the three KAV computer-based theory exams, in English, `/hungary-gki/*`, landing `/hungary-driver-cpc-gki-test`): `data/hungary-gki-questions.json` (200 original questions on the KAV-published GKI curriculum and exam requirements in force 17 March 2025, truck and bus in one bank: BSZAVSZ as eco-driving, engine and fuel 20, brakes and safety systems (air brakes, retarder and DBL, ABS/ASR/EBS/ESP, ACC, BAS) 20, loads, stability and securing (EN 12195-1, Euro pallets, payload and volume sums) 16, buses and passengers 16; EASZ as driving times, rest and working time (Reg 561/2006 with the 2020 Mobility Package, Directive 2002/15, AETR) 24, tachographs (Reg 165/2014, smart tachograph v2, vans over 2.5 t in international haulage from 1 July 2026) 16, Hungarian rules, permits and documents (KRESZ heavy vehicle limits 80/70/50 and coaches 100/70/50, the car-sized following gap, heavy trucks on motorways, expressways and main roads, the weekend ban of Decree 190/2008, HU-GO distance toll, GKI card rules, CMR, cabotage 3 in 7 days and 4-day cooling-off, 8-week vehicle return, journey form) 24; EKKKBSZLSZ as health, fitness and fatigue 24, emergencies, crime and security (people smuggling, cargo theft) 20, transport business, service and logistics 20), four 40-question tests mixing the three subjects 14/13/13 (Tigertest's split): test IDs 24501-24504, sets 24501-24505 (by topic), state `HUGKI`, prefix `HUGKI-`, 75% pass (30 of 40, the real line of each subject: 40 questions, 40 minutes, 40 points). 4/4/3/3/5/3/5/5/4/4 per test; the last 4 items of each pool (40 in all) are training-only. The case study (120 minutes, 60 of 100) and practical exams are not modelled. Test sheets in English and Russian since September 2022, Serbian and Ukrainian since 2020 (trade press). No fines, fees or toll rates; Hungarian facts already asked in hukresz (zero alcohol, triangle, reflective vest) left to it. Built by `tools/next100/hugki/build.py`; sources in `tools/next100/hugki/sources.md`. Region HU, hub group "Hungary licences and professional exams", `[data-theme="hugki"]` dark walnut amber (35 40% 18%), borrows the CDL tiger.
```
