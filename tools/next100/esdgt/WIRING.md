# Wiring for `esdgt` (Spain DGT theory exam, permiso B, in English, v1)

Files already written by the builder: `data/spain-dgt-questions.json` (200, PASS),
`lib/banks/esdgt.ts`, `app/spain-driving-theory/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/spain-driving-theory-test/page.tsx`, `tools/next100/esdgt/*`
(spec, sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/esdgt/build.py`.
Everything below goes in shared files.

Format note: the real exam (DGT, confirmed November 2026) is 30 multiple-choice questions with
three options, 30 minutes, pass with at most three mistakes (27 of 30). Tigertest models six
real-length tests of 30 (passPct 90 = ceil(0.9 x 30) = 27) with four options per question.
Pools are 6x each per-test count plus 20 training-only spares (the last items of each pool).
Dashboard = 5 topic sets + 6 tests = 11 steps. No set exceeds 60. Build sorts all-number options
ascending (key found after sorting); 29 such items, key in an end slot (A or D) in 17.

New region `ES` (Spain), its first exam. Follow how `PK` was added.

## lib/exams.ts

Add `"esdgt"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests, after `pkdrive`):

```ts
const esdgt: ExamConfig = {
  id: "esdgt",
  stateCode: "ESDGT",
  idBase: 13700,
  slug: "/spain-driving-theory",
  landingPath: "/spain-driving-theory-test",
  name: "Spain DGT Theory Practice Test",
  shortName: "Spain DGT theory test",
  examLabel: "DGT theory exam",
  fullName: "Spain DGT theory exam for the permiso B (car), in English",
  questionIdPrefix: "ESDGT-",
  icon: "car",
  testCount: 6,
  questionsPerTest: 30,
  passPct: 90,
  // Real exam (DGT, checked 2026-11-01): 30 multiple-choice questions with three options, 30
  // minutes, pass with at most 3 mistakes (27 of 30); offered in Spanish, the co-official
  // languages, English, French and German (DGT form Mod. 04). The DGT confirmed in August 2026
  // the format is unchanged; risk-perception videos have no date. The DGT publishes no topic
  // weights; this split follows the Reglamento General de Conductores annex V syllabus with
  // signs and priority heaviest. Rules from the Reglamento General de Circulación as consolidated
  // with RD 518/2026 (in force 1 October 2026) and the V-16 rule (1 January 2026). Six
  // real-length tests; pools are 6x each count plus 20 training-only spares. Four options per
  // question (the real exam has three). All items original.
  blueprint: {
    esdgtLicence: 3,
    esdgtSigns: 5,
    esdgtMarkings: 3,
    esdgtPriority: 4,
    esdgtSpeed: 4,
    esdgtOvertaking: 3,
    esdgtParking: 2,
    esdgtLights: 3,
    esdgtSafety: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 13701, name: "Signs, Markings & Signals", categories: ["esdgtSigns", "esdgtMarkings"], size: 53, weightLabel: "8 of 30 test questions" },
    { setNumber: 2, id: 13702, name: "Priority & Junctions", categories: ["esdgtPriority"], size: 27, weightLabel: "4 of 30 test questions" },
    { setNumber: 3, id: 13703, name: "Speed, Lanes & Overtaking", categories: ["esdgtSpeed", "esdgtOvertaking"], size: 47, weightLabel: "7 of 30 test questions" },
    { setNumber: 4, id: 13704, name: "Parking, Lights & Bad Weather", categories: ["esdgtParking", "esdgtLights"], size: 34, weightLabel: "5 of 30 test questions" },
    { setNumber: 5, id: 13705, name: "Permits, Alcohol & Emergencies", categories: ["esdgtLicence", "esdgtSafety"], size: 39, weightLabel: "6 of 30 test questions" },
  ],
  categoryLabels: {
    esdgtLicence: "Permits, Documents & the Vehicle",
    esdgtSigns: "Signs & Traffic Officers",
    esdgtMarkings: "Road Markings & Traffic Lights",
    esdgtPriority: "Priority, Junctions & Roundabouts",
    esdgtSpeed: "Speed Limits, Distances & Lanes",
    esdgtOvertaking: "Overtaking & Vulnerable Road Users",
    esdgtParking: "Stopping & Parking",
    esdgtLights: "Lights, Tunnels & Bad Weather",
    esdgtSafety: "Alcohol, Distraction & Emergencies",
  },
  copy: {
    guestPrompt: "to save your DGT theory test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the Spanish traffic rules the DGT theory exam asks about, in English. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 30 questions like the real exam, 27 to pass",
    heroSubs: [
      "Five topics, six real-length tests. Signs and priority weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your DGT theory exam.",
    ],
    sourceLine: "Based on the Spanish Reglamento General de Circulación as in force in November 2026. Original questions; 30 per test, 27 to pass like the real exam (which has 3 options per question).",
    analyticsKey: "esdgt",
  },
};
```

Append `esdgt` to the `EXAMS` array with the other driving tests (after `pkdrive`).

Check: 13701-13706 (tests) and 13701-13705 (sets) must be free (BRIEF reserves idBase 13700).

## lib/banks/all.ts

```ts
import "./esdgt";
```

## types/index.ts

- `QuestionType`: add `| "ESDGT"`.
- `QuestionCategory`, under a `// Spain DGT theory exam` comment:

```ts
  | "esdgtLicence"
  | "esdgtSigns"
  | "esdgtMarkings"
  | "esdgtPriority"
  | "esdgtSpeed"
  | "esdgtOvertaking"
  | "esdgtParking"
  | "esdgtLights"
  | "esdgtSafety"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    esdgtLicence: "Permits, Documents & the Vehicle",
    esdgtSigns: "Signs & Traffic Officers",
    esdgtMarkings: "Road Markings & Traffic Lights",
    esdgtPriority: "Priority, Junctions & Roundabouts",
    esdgtSpeed: "Speed Limits, Distances & Lanes",
    esdgtOvertaking: "Overtaking & Vulnerable Road Users",
    esdgtParking: "Stopping & Parking",
    esdgtLights: "Lights, Tunnels & Bad Weather",
    esdgtSafety: "Alcohol, Distraction & Emergencies",
```

(The es.ts labels may later be translated; the exam itself is English only.)

## app/globals.css

The brief's suggested `45 80% 34%` clashes with `forklift` (42 80% 32.3%, 3 degrees, same
saturation, 1.7 lightness) and `uk18ed` (50 80% 29.5%), and yellows that pass the rule also fail
white-text contrast (about 3.6:1 at 40% lightness). Suggested instead: Spanish flag red
`352 85% 34%` (white text about 8.1:1). Checked against every light `[data-theme]` block and the
other EU batch suggestions: nearest are the Canada reds `356 68% 40%` (4 degrees, 17 saturation
apart) and `dkteori 355 70% 38%` (3 degrees, 15 saturation apart, at the limit) and `mttheory
0 65% 40%` (8 degrees, 20 saturation apart). If dkteori keeps its hue, `350 95% 32%` is also clear
of everything (8.4:1). Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Spain DGT theory theme */
  [data-theme="esdgt"] {
    --brand: 352 85% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 352 80% 96%;
    --brand-hover: 352 85% 29%;
    --brand-dark: 352 85% 27%;
    --brand-darker: 352 80% 19%;
    --brand-muted: 352 35% 70%;
    --brand-border: 352 40% 80%;
    --brand-border-light: 352 40% 90%;
    --brand-gradient-to: 40 80% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `esdgt: "Six 30-question tests in English for the DGT theory exam for the Spanish car licence (permiso B): signs and officers' signals, markings and lights, priority and roundabouts, speed limits, overtaking cyclists, parking, tunnels, alcohol and the V-16 beacon, with the October 2026 rules.",`
- `EXAM_ORG`: `esdgt: "DGT (Dirección General de Tráfico) · permiso B theory exam, in English",`
- Hub group, new (after "Pakistan driving tests", or in an EU block with the other nine EU tests):
  `{ title: "Spain driving tests", ids: ["esdgt"] },`
  With one member, add `RELATED_OVERRIDES`: `esdgt: ["ptimt", "iedtt", "ukcar"],` (drop `ptimt`
  if Portugal is not wired in the same release; `mttheory` or `bedriving` also fit).
- `SEARCH_ALIASES`:
  `esdgt: "spain driving theory test english dgt exam dgt test in english spanish driving licence permiso b carnet de conducir carne de conducir examen teorico dgt test dgt autoescuela driving school spain theory test madrid barcelona valencia malaga alicante seville costa del sol expat driving licence spain",`

## lib/region.ts (new region ES)

- `Region` type: add `| "ES"`.
- `REGIONS`: `{ code: "ES", name: "Spain", short: "ES", inName: "Spain" },`
- `regionFromCountry`: `case "ES": return "ES";` (the Canary Islands, Ceuta and Melilla report `ES`;
  Andorra `AD` is not mapped).
- `REGION_HREFLANG`: `ES: "en-ES"`.
- `TEST_REGIONS`: `esdgt: "ES",` (a driving test, so NOT in `NON_DRIVING_TESTS`).
- `REGION_HOME`:

```ts
  ES: {
    title: "Free Spain DGT Theory Test Practice in English | Tigertest",
    description: "Free practice in English for the Spanish DGT theory exam (permiso B): 200 original questions on Spanish traffic rules, every answer explained. No account needed.",
    lead: "Practice in English for the DGT theory exam for your Spanish car licence. Original questions on signs, priority, speed limits and the 2026 rules, every answer explained. No signup.",
    cta: { label: "DGT theory test", href: "/spain-driving-theory-test" },
    testsTitle: "DGT theory exam (permiso B)",
    testsSub: "200 questions on the Spanish rules of the road, in km/h for right-hand traffic. Six full 30-question tests, 27 to pass.",
  },
```

## components/home/HomePage.tsx

`AUTHORITY`: `ES: "the DGT (Dirección General de Tráfico)",`. `faqsFor()` needs nothing else: it
counts Spain's driving tests and builds the five FAQs ("For Spain it has a driving test written
from the official rules ...").

## Region routes, middleware, sitemap, llms.txt, funnel (integrator)

`app/es/page.tsx` like `app/pk/page.tsx` (`countryHomeMetadata("ES")`, `<HomePage region="ES" />`).
Note the existing Spanish-language DMV pages live under `app/es/` (`/es/examen-practica-cdl`
and others): adding `app/es/page.tsx` makes `/es` the Spain country homepage; `app/es/layout.tsx` (Spanish-language layout) and `app/es/[slug]` already exist there, so check the layout suits an English page and that no existing
`app/es/page.tsx` or redirect claims `/es`, and that hreflang `en-ES` on `/es` cannot be confused
with the Spanish-language pages (hreflang `es`). If that is a problem, the Spain homepage could
live at `/spain` with `regionHomePath()` special-cased. Middleware country mapping, sitemap and
`llms.txt` lines as for PK; add `ES` to the funnel's `visit_region_*` list if the others were.

## lib/examFacts.ts

```ts
  esdgt: {
    answer:
      "The DGT theory exam (examen teórico) is the first test for the Spanish car licence, the permiso B. It has 30 multiple-choice questions with three options each, you have 30 minutes, and you pass with no more than three mistakes, so 27 correct answers. For the permiso B it is offered in Spanish, the co-official languages (Catalan, Basque, Galician, Valencian), English, French and German, and in an Easy Read version. You can sit it from three months before you turn 18, the minimum age for the licence, and a pass is kept for two years while you take the practical driving test. Questions cover the Reglamento General de Circulación: signs, priority, speed limits, overtaking, parking, lights, alcohol, safety equipment and what to do after a crash.",
    rows: [
      { label: "Run by", value: "DGT (Dirección General de Tráfico), provincial traffic offices" },
      { label: "Questions", value: "30, multiple choice, three options each" },
      { label: "Time", value: "30 minutes" },
      { label: "Pass mark", value: "At most 3 mistakes (27 of 30)" },
      { label: "Languages", value: "Spanish, co-official languages, English, French, German" },
      { label: "Minimum age (permiso B)", value: "18 (first exam up to three months before)" },
      { label: "Pass kept for", value: "Two years" },
      { label: "Tigertest mock tests", value: "6 x 30 questions, 27 to pass" },
    ],
    basedOn: "Reglamento General de Circulación (consolidated with RD 518/2026, in force 1 October 2026), Reglamento General de Conductores and DGT guidance on the theory exam, checked November 2026",
    source: { name: "DGT: requirements, preparation and taking the exam", url: "https://www.dgt.es/nuestros-servicios/permisos-de-conducir/obtener-un-nuevo-permiso-de-conducir/requisitos-preparacion-y-presentacion-a-examen/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED` (driving schools could use a class, but no
driving test is listed there).

## lib/tigerAssets.ts

Add to `BORROWED_SETS` with the other car tests: `esdgt: "driving",`

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing esdgt:spain-driving-theory:13701`

## CLAUDE.md (after the Pakistan bullet under International driving tests, or in an EU block)

```md
- **Spain DGT Theory** (DGT theory exam for the permiso B, in English, `/spain-driving-theory/*`, landing `/spain-driving-theory-test`): `data/spain-dgt-questions.json` (200 original questions from the Reglamento General de Circulación as consolidated with RD 518/2026 and the Reglamento General de Conductores: permits/documents/vehicle 20, signs and traffic officers 33, markings and traffic lights 20, priority/junctions/roundabouts 27, speed/distances/lanes 27, overtaking and vulnerable road users 20, stopping and parking 14, lights/tunnels/weather 20, alcohol/distraction/emergencies 19), six real-length tests: test IDs 13701-13706 (30 questions each), sets 13701-13705 (by topic), state `ESDGT`, prefix `ESDGT-`, 90% pass (27 of 30, the DGT's three-mistake rule; the real exam has 3 options per question, ours 4). 3/5/3/4/4/3/2/3/3 per test; the last items of each pool (20 in all) are training-only. Includes the V-16 beacon (1 Jan 2026) and the 1 October 2026 rules (cyclists overtaken 20 km/h below the limit with 1.5 m, full lane change on multi-lane roads, the emergency lane, snow on motorways); alcohol 0.5 g/l (0.3 for the first two years); no fines or points. Offered by the DGT in Spanish, the co-official languages, English, French and German. Signs are described in words. Built by `tools/next100/esdgt/build.py` (sorts all-number options); sources in `tools/next100/esdgt/sources.md`. Region ES (its first exam, homepage `/es`), hub group "Spain driving tests", `[data-theme="esdgt"]` Spanish flag red, borrows the car tiger.
```
