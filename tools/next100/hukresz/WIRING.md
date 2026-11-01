# Wiring for `hukresz` (Hungary KRESZ theory exam, category B, v1)

Files already written by the builder: `data/hungary-kresz-questions.json` (200, PASS),
`lib/banks/hukresz.ts`, `app/hungary-driving-theory/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/hungary-kresz-test/page.tsx` (landing, renders
`ExamSampleQuestions`), `tools/next100/hukresz/*` (spec, sources, `q_*.py`, `build.py`).
Rebuild with `python3 -I tools/next100/hukresz/build.py`. Everything below goes in shared files.

Format note: the real exam (KAV, "Közlekedési alapismeretek") is 55 multiple-choice questions in
55 minutes, 75 points, 65 to pass. Tigertest models three real-length tests of 55 (165 items) plus
35 training-only spares (the last items of each pool), passPct 87 (ceil(0.87 x 55) = 48), close to
65/75 = 86.7%. Guides say 10 questions are worth 3 points and 45 worth 1; Tigertest scores all
equally. Dashboard = 5 sets + 3 tests = 8 steps. No set exceeds 60.

## lib/exams.ts

Add `"hukresz"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests, after `pkdrive` or with the other EU batch-1 tests):

```ts
const hukresz: ExamConfig = {
  id: "hukresz",
  stateCode: "HUKRESZ",
  idBase: 14300,
  slug: "/hungary-driving-theory",
  landingPath: "/hungary-kresz-test",
  name: "Hungary KRESZ Theory Practice Test",
  shortName: "Hungary KRESZ test",
  examLabel: "Hungary KRESZ theory exam",
  fullName: "Hungary KRESZ theory exam (Közlekedési alapismeretek), category B",
  questionIdPrefix: "HUKRZ-",
  icon: "car",
  testCount: 3,
  questionsPerTest: 55,
  passPct: 87,
  // Real exam: KAV computer-based "Közlekedési alapismeretek" theory exam, category B: 55
  // multiple-choice questions, 55 minutes, 75 points, 65 to pass (KAV curriculum and exam
  // requirements as quoted in a driving school's 2025-05-01 learner information sheet). Guides say
  // 10 questions are worth 3 points and 45 worth 1; Tigertest scores every question equally, so
  // passPct 87 = ceil(0.87 x 55) = 48 of 55, close to 65/75. Offered in Hungarian, English, German
  // and Romanian (guides). No official topic weights; this split is Tigertest's own, signs and
  // right of way heaviest. Rules from the KRESZ (1/1975. (II. 5.) KPM-BM decree) as in force
  // 2026-11-01; the draft new KRESZ (Jan 2026) was not in force. Three real-length tests; pools
  // are 3x each count plus 35 training-only spares. All items original.
  blueprint: {
    huLicence: 5,
    huWarning: 6,
    huRegulatory: 9,
    huMarkings: 6,
    huPriority: 8,
    huSpeed: 7,
    huMotorway: 4,
    huParking: 5,
    huSafety: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 14301, name: "Warning Signs, Markings & Lights", categories: ["huWarning", "huMarkings"], size: 44, weightLabel: "12 of 55 test questions" },
    { setNumber: 2, id: 14302, name: "Priority, Prohibition & Mandatory Signs", categories: ["huRegulatory"], size: 32, weightLabel: "9 of 55 test questions" },
    { setNumber: 3, id: 14303, name: "Right of Way & Trams", categories: ["huPriority"], size: 30, weightLabel: "8 of 55 test questions" },
    { setNumber: 4, id: 14304, name: "Speed, Overtaking & Motorways", categories: ["huSpeed", "huMotorway"], size: 40, weightLabel: "11 of 55 test questions" },
    { setNumber: 5, id: 14305, name: "Licences, Parking & Safety", categories: ["huLicence", "huParking", "huSafety"], size: 54, weightLabel: "15 of 55 test questions" },
  ],
  categoryLabels: {
    huLicence: "Licences, Alcohol & the Driver",
    huWarning: "Warning Signs",
    huRegulatory: "Priority, Prohibition & Mandatory Signs",
    huMarkings: "Markings, Traffic Lights & Police Signals",
    huPriority: "Right of Way, Junctions & Trams",
    huSpeed: "Speed, Lanes & Overtaking",
    huMotorway: "Motorways & Level Crossings",
    huParking: "Stopping, Parking, Lights & Towing",
    huSafety: "Seat Belts, Children, Breakdowns & Crashes",
  },
  copy: {
    guestPrompt: "to save your KRESZ exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the Hungarian Highway Code, in English. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Full tests · 55 questions, aim for 48 or more",
    heroSubs: [
      "Five topics, three 55-question tests. Signs and right of way weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a full test.",
      "Fix the misses, then retake.",
      "All done. Book your KRESZ exam.",
    ],
    sourceLine: "Based on the Hungarian Highway Code (KRESZ). Original questions in English; 55 per test, 87% is close to the real 65 of 75 points.",
    analyticsKey: "hukresz",
  },
};
```

Append `hukresz` to the `EXAMS` array with the other driving tests. Check: test IDs 14301-14303
and set IDs 14301-14305 are free (BRIEF reserves idBase 14300).

## lib/banks/all.ts

```ts
import "./hukresz";
```

## types/index.ts

- `QuestionType`: add `| "HUKRESZ"`.
- `QuestionCategory`, under a `// Hungary KRESZ theory exam` comment (keys grepped: no collision):

```ts
  | "huLicence"
  | "huWarning"
  | "huRegulatory"
  | "huMarkings"
  | "huPriority"
  | "huSpeed"
  | "huMotorway"
  | "huParking"
  | "huSafety"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    huLicence: "Licences, Alcohol & the Driver",
    huWarning: "Warning Signs",
    huRegulatory: "Priority, Prohibition & Mandatory Signs",
    huMarkings: "Markings, Traffic Lights & Police Signals",
    huPriority: "Right of Way, Junctions & Trams",
    huSpeed: "Speed, Lanes & Overtaking",
    huMotorway: "Motorways & Level Crossings",
    huParking: "Stopping, Parking, Lights & Towing",
    huSafety: "Seat Belts, Children, Breakdowns & Crashes",
```

## app/globals.css

The brief's hue `120 45% 30%` clashes: uksia is `128 45% 30%` (identical saturation and lightness),
phleb `120 40% 36%` and apbio `112 58% 32%` are inside the 15/8 rule. The green band is full.
Checked every free green that keeps lightness 30 to 48% and white text at 4.5:1 or better; the
best is a muted Hungarian-flag green `125 20% 42%` (white text 4.51:1; nearest: aissee 120 22% 34%
is 8 points lighter, sscgd 132 30% 30% is 10/12 off). If the integrator prefers more contrast,
`126 15% 42%` gives 4.72:1. Integrator picks; write the same value into `shareCards.ts` below.

```css
  /* Hungary KRESZ theory exam theme */
  [data-theme="hukresz"] {
    --brand: 125 20% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 125 25% 95%;
    --brand-hover: 125 22% 36%;
    --brand-dark: 125 24% 31%;
    --brand-darker: 125 26% 22%;
    --brand-muted: 125 15% 68%;
    --brand-border: 125 15% 78%;
    --brand-border-light: 125 14% 88%;
    --brand-gradient-to: 110 25% 95%;
  }
```
Then run `tools/gen_dark_brand_css.py` once for everyone.

## lib/shareCards.ts, lib/shareCardCopy.ts, lib/shareImageUrl.ts

```ts
  "hukresz": {
    "color": "hsl(125, 20%, 42%)",
    "tint": "hsl(125, 25%, 96%)"
  },
```
`SHARE_COPY` line:
`hukresz: { title: "Hungary KRESZ Theory Test", description: "Practise Hungarian signs, the right-hand rule, trams, speed limits and level crossings in English, in full 55-question tests." },`
and add `"hukresz"` to `SHARE_COPY_IDS` in `lib/shareImageUrl.ts` (as pkdrive is).

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `hukresz: "Three full 55-question tests in English for Hungary's KRESZ theory exam (category B): warning, priority and prohibition signs, the right-hand rule and trams, speed limits, overtaking, motorways and level crossings, parking, lights and crashes.",`
- `EXAM_ORG`: `hukresz: "KAV (Hungary's transport exam centre) · Közlekedési alapismeretek, category B",`
- Hub group, new: `{ title: "Hungary driving tests", ids: ["hukresz"] },` (or, if the integrator
  makes one group for the ten EU batch-1 tests, put it there). With one member, add
  `RELATED_OVERRIDES`: `hukresz: ["rodrpciv", "grdriving", "ukcar"],` (swap for whichever EU
  tests land).
- `SEARCH_ALIASES`:
  `hukresz: "kresz kresz teszt kresz vizsga kresz test english kresz angolul hungary driving test hungarian driving licence theory exam in english hungarian highway code kozlekedesi alapismeretek közlekedési alapismeretek kav vizsgakozpont jogsi jogositvany jogosítvány budapest driving school english elmeleti vizsga elméleti vizsga",`

## lib/region.ts (new region HU)

```ts
// Region union: add "HU"
  { code: "HU", name: "Hungary", short: "HU", inName: "Hungary" },
// regionFromCountry:
    case "HU": return "HU";
// REGION_HREFLANG:
  HU: "en-HU",
// TEST_REGIONS:
  hukresz: "HU",
```
It is a driving test, so NOT in `NON_DRIVING_TESTS`. Home path is `/hu` (from `regionHomePath`).

`REGION_HOME` entry, in the shape of PK:

```ts
  HU: {
    title: "Free Hungary KRESZ Theory Test Practice in English | Tigertest",
    description: "Free KRESZ theory exam practice for Hungary in English: 200 original questions on the Hungarian Highway Code, every answer explained. No account needed.",
    lead: "Practise in English for the KRESZ theory exam (Közlekedési alapismeretek) before your category B driving test. Original questions on Hungarian signs, the right-hand rule, trams, speed limits and level crossings, every answer explained. No signup.",
    cta: { label: "KRESZ theory test", href: "/hungary-kresz-test" },
    testsTitle: "KRESZ theory exam",
    testsSub: "200 questions on the Hungarian Highway Code, in km/h for right-hand traffic. Three full 55-question tests; the real exam needs 65 of 75 points.",
  },
```

## components/home/HomePage.tsx (`AUTHORITY`, used by `faqsFor`)

```ts
  HU: "the KAV or any Hungarian authority",
```

Integrator also adds `app/hu/page.tsx` (copy of `app/pk/page.tsx` with `"HU"`), the middleware
country mapping (ISO `HU` to region `HU`), sitemap and `llms.txt` lines, as for PK.

## lib/examFacts.ts

```ts
  hukresz: {
    answer:
      "Hungary's category B theory exam, officially Közlekedési alapismeretek and widely called the KRESZ exam, is taken on a computer at a centre of the KAV, the national transport exam centre. It has 55 multiple-choice questions and lasts 55 minutes, one minute per question. The questions are worth 75 points in total and you need at least 65 to pass; guides say 10 questions are worth 3 points and 45 are worth 1. Guides and driving schools say the exam is offered in Hungarian, English, German and Romanian. You may sit it from 16 years and 9 months after a driving school course, and a pass stays valid for two years while you complete the driving test, which you may take from 17.",
    rows: [
      { label: "Run by", value: "KAV Közlekedési Alkalmassági és Vizsgaközpont" },
      { label: "Questions", value: "55 multiple choice" },
      { label: "Time", value: "55 minutes" },
      { label: "Pass mark", value: "65 of 75 points" },
      { label: "Languages", value: "Hungarian, English, German, Romanian (guides)" },
      { label: "Minimum age", value: "16 years 9 months (theory), 17 (driving test)" },
      { label: "Pass valid for", value: "2 years" },
      { label: "Tigertest tests", value: "3 x 55 questions, 87% target" },
    ],
    basedOn: "KRESZ (1/1975. (II. 5.) KPM-BM decree) as in force in November 2026 and the KAV's category B exam requirements as quoted by driving schools, checked November 2026",
    source: { name: "KAV Közlekedési Alkalmassági és Vizsgaközpont", url: "https://www.vizsgakozpont.hu/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the EU wave.

## lib/tigerAssets.ts

`BORROWED_SETS`: `hukresz: "driving",` (the DMV car tiger, like pkdrive).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, components/TestIcon.tsx, CDLHeader

Nothing beyond the region page: sitemaps map over `EXAMS`, class questions import `lib/banks/all`,
no redirects, `car` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing hukresz:hungary-driving-theory:14301`

## CLAUDE.md (with the other international driving tests, after Pakistan)

```md
- **Hungary KRESZ** (KAV theory exam "Közlekedési alapismeretek", category B, in English, `/hungary-driving-theory/*`, landing `/hungary-kresz-test`): `data/hungary-kresz-questions.json` (200 original questions on the KRESZ, decree 1/1975 as in force Nov 2026: licences/alcohol/driver 18, warning signs 22, priority/prohibition/mandatory signs 32, markings/lights/police signals 22, right of way/junctions/trams 30, speed/lanes/overtaking 26, motorways/level crossings 14, stopping/parking/lights/towing 18, seat belts/children/breakdowns/crashes 18), three real-length tests: test IDs 14301-14303 (55 questions each), sets 14301-14305 (by topic), state `HUKRESZ`, prefix `HUKRZ-`, 87% pass (48 of 55, close to the real 65 of 75 points; guides say 10 questions are worth 3 points and 45 worth 1, Tigertest scores all equally). 5/6/9/6/8/7/4/5/5 per test; the last items of each pool (35 in all) are training-only. Right-hand rule and trams from the left, zero alcohol, speed and overtaking signs end at the next junction, flashing white light at level crossings, daytime lights outside built-up areas; no fines, points or novice rules; the draft new KRESZ (2026) is not used. Exam offered in Hungarian, English, German and Romanian (guides). Signs are described in words. Built by `tools/next100/hukresz/build.py`; sources in `tools/next100/hukresz/sources.md`. Region HU (homepage `/hu`), hub group "Hungary driving tests", borrows the car tiger.
```
