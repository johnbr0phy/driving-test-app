# Wiring for `ptimt` (Portugal IMT driving theory exam, category B, v1)

Files already written by the builder: `data/portugal-imt-questions.json` (200, PASS),
`lib/banks/ptimt.ts`, `app/portugal-driving-theory/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/portugal-driving-theory-test/page.tsx` (renders
`ExamSampleQuestions`), `tools/next100/ptimt/*` (spec, sources, `q_*.py`, `build.py`).
Rebuild with `python3 -I tools/next100/ptimt/build.py`. Everything below goes in shared files.

Format note: the real category B test (RHLC, Decreto-Lei 138/2012, arts. 43, 46, 47) is 30
questions in 30 minutes, pass with 27 correct. Tigertest models six real-length 30-question tests
at 90% (27 of 30). Pools are 6x each per-test count plus 20 training-only spares (the last items of
each pool). Dashboard = 4 topic sets + 6 tests = 10 steps. No set exceeds 60. Test IDs 13801-13806,
set IDs 13801-13804 (tests and sets are separate ranges, as in `hkdrive`).

## lib/exams.ts

Add `"ptimt"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests, after `pkdrive`):

```ts
const ptimt: ExamConfig = {
  id: "ptimt",
  stateCode: "PTIMT",
  idBase: 13800,
  slug: "/portugal-driving-theory",
  landingPath: "/portugal-driving-theory-test",
  name: "Portugal Driving Theory Practice Test",
  shortName: "Portugal driving theory",
  examLabel: "Portugal IMT theory exam",
  fullName: "Portugal IMT driving theory exam (exame de código), category B",
  questionIdPrefix: "PTIMT-",
  icon: "car",
  testCount: 6,
  questionsPerTest: 30,
  passPct: 90,
  // Real test (Regulamento da Habilitação Legal para Conduzir, Decreto-Lei 138/2012, checked
  // 2026-11-01): category B is 30 questions on the common programme of Annex VII part I section II
  // (art. 43), 30 minutes (art. 46), pass with 27 correct (art. 47), valid one year; set in
  // Portuguese, with a translated test on request (art. 44(2) as amended by DL 114/2026, from 8 July 2026).
  // The IMT publishes no topic weights; this split follows the Annex VII programme with signs and
  // priority heaviest. Rules from the Código da Estrada as amended to Lei 24/2025 and the
  // Regulamento de Sinalização do Trânsito. Six real-length tests; pools are 6x each count plus
  // 20 training-only spares. passPct 90 = 27 of 30. All items original.
  blueprint: {
    ptSigns: 6,
    ptMarkings: 3,
    ptPriority: 5,
    ptSpeed: 4,
    ptParking: 3,
    ptDriver: 3,
    ptVehicle: 3,
    ptLicence: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 13801, name: "Road Signs & Markings", categories: ["ptSigns", "ptMarkings"], size: 60, weightLabel: "9 of 30 test questions" },
    { setNumber: 2, id: 13802, name: "Priority, Licences & Accidents", categories: ["ptPriority", "ptLicence"], size: 54, weightLabel: "8 of 30 test questions" },
    { setNumber: 3, id: 13803, name: "Speed, Overtaking & Parking", categories: ["ptSpeed", "ptParking"], size: 46, weightLabel: "7 of 30 test questions" },
    { setNumber: 4, id: 13804, name: "The Driver & the Vehicle", categories: ["ptDriver", "ptVehicle"], size: 40, weightLabel: "6 of 30 test questions" },
  ],
  categoryLabels: {
    ptSigns: "Road Signs",
    ptMarkings: "Markings, Lights & Police Signals",
    ptPriority: "Priority, Junctions & Roundabouts",
    ptSpeed: "Speed, Distance & Overtaking",
    ptParking: "Stopping, Parking & Motorways",
    ptDriver: "Alcohol, Fatigue & Distraction",
    ptVehicle: "Seat Belts, Children, Lights & Equipment",
    ptLicence: "Licences, Documents & Accidents",
  },
  copy: {
    guestPrompt: "to save your theory test progress and track every question you miss",
    trainingHeading: "Train by Código da Estrada topic",
    trainingSub: "Four sets on the rules the IMT theory exam asks about, in English. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 30 questions like the real exam, 27 to pass",
    heroSubs: [
      "Four topic sets, six real-length tests. Signs and priority weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your exame de código.",
    ],
    sourceLine: "Based on Portugal's Código da Estrada and the IMT theory programme. Original questions in English; 30 per test, 27 to pass like the real exam.",
    analyticsKey: "ptimt",
  },
};
```

Append `ptimt` to the `EXAMS` array with the other driving tests (after `pkdrive`).

Check: 13801-13806 (tests) and 13801-13804 (sets) must be free (BRIEF reserves idBase 13800).

## lib/banks/all.ts

```ts
import "./ptimt";
```

## types/index.ts

- `QuestionType`: add `| "PTIMT"`.
- `QuestionCategory`, under a `// Portugal IMT driving theory` comment:

```ts
  | "ptSigns"
  | "ptMarkings"
  | "ptPriority"
  | "ptSpeed"
  | "ptParking"
  | "ptDriver"
  | "ptVehicle"
  | "ptLicence"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ptSigns: "Road Signs",
    ptMarkings: "Markings, Lights & Police Signals",
    ptPriority: "Priority, Junctions & Roundabouts",
    ptSpeed: "Speed, Distance & Overtaking",
    ptParking: "Stopping, Parking & Motorways",
    ptDriver: "Alcohol, Fatigue & Distraction",
    ptVehicle: "Seat Belts, Children, Lights & Equipment",
    ptLicence: "Licences, Documents & Accidents",
```

## app/globals.css

The brief's `140 55% 28%` clashes under the 8-degree rule with `foodhandler` (135 55% 33%) and
`naplan` (142 64% 30%). Checked against every `--brand` in globals.css plus `hukresz` (120 45% 30%):
`133 85% 28%` (Portugal flag green) is clear and gives white text 4.8:1. Lightness 28% is below the
30 to 48% band; at 30% or above no free green near 140 passes 4.5:1. Integrator picks the final
value. Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Portugal IMT driving theory theme */
  [data-theme="ptimt"] {
    --brand: 133 85% 28%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 133 55% 95%;
    --brand-hover: 133 85% 24%;
    --brand-dark: 133 85% 21%;
    --brand-darker: 133 75% 15%;
    --brand-muted: 133 30% 68%;
    --brand-border: 133 30% 78%;
    --brand-border-light: 133 28% 88%;
    --brand-gradient-to: 110 45% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ptimt: "Six 30-question mock tests in English for Portugal's IMT driving theory exam (exame de código), category B: signs, markings, priority and roundabouts, speed and overtaking, parking and motorways, alcohol, child seats, licences and accidents, with the real 27-of-30 pass mark.",`
- `EXAM_ORG`: `ptimt: "IMT (Instituto da Mobilidade e dos Transportes) · category B theory exam",`
- Hub group, new (with the other EU driving groups): `{ title: "Portugal driving tests", ids: ["ptimt"] },`
  With one member, add `RELATED_OVERRIDES` (swap in EU siblings once they are wired, e.g. `esdgt`):
  `ptimt: ["iedtt", "ukcar", "esdgt"],`
- `SEARCH_ALIASES`:
  `ptimt: "portugal driving theory test portuguese driving test in english imt exam exame de codigo codigo da estrada carta de conducao carta de condução teste de codigo category b licence portugal driving licence lisbon porto algarve faro braga coimbra madeira azores expat driving licence portugal",`

## lib/region.ts (new region PT)

- `Region` union: add `| "PT"`.
- `REGIONS`: `{ code: "PT", name: "Portugal", short: "PT", inName: "Portugal" },`
- `regionFromCountry`: `case "PT": return "PT";` (Madeira and the Azores report as PT.)
- `REGION_HREFLANG`: `PT: "en-PT"`
- `TEST_REGIONS`: `ptimt: "PT",` (a driving test, so NOT in `NON_DRIVING_TESTS`).
- `REGION_HOME`:

```ts
  PT: {
    title: "Free Portugal Driving Theory Test Practice in English | Tigertest",
    description: "Free practice in English for Portugal's IMT driving theory exam (exame de código), category B: 200 original questions on the Código da Estrada, every answer explained. No account needed.",
    lead: "Practise in English for the exame de código, the IMT theory exam for a car licence. Original questions on signs, priority, roundabouts, speed limits and safe driving, every answer explained. No signup.",
    cta: { label: "IMT theory exam", href: "/portugal-driving-theory-test" },
    testsTitle: "IMT driving theory exam",
    testsSub: "200 questions on the Código da Estrada, in km/h for right-hand traffic. Six full 30-question tests, 27 to pass.",
  },
```

- Header comment at the top of the file: add `/pt` to the list of country homepages.
- New route `app/pt/page.tsx` copied from `app/pk/page.tsx` (`countryHomeMetadata("PT")`,
  `<HomePage region="PT" />`); middleware, sitemap and `llms.txt` lines as for PK.

## components/home/HomePage.tsx

`AUTHORITY`: `PT: "the IMT",`
(`faqsFor("PT")` then reads: one driving test, "written from the official rules", "not affiliated
with the IMT or any testing company".)

## lib/funnel.ts / funnel route

If the visit-region list is explicit, add `PT` (`visit_region_PT`).

## lib/examFacts.ts

```ts
  ptimt: {
    answer:
      "Portugal's driving theory exam, the exame de código, is set by the IMT (Instituto da Mobilidade e dos Transportes) and taken on a computer at an exam centre after enrolling at a driving school. For a category B car licence it has 30 multiple-choice questions on the rules common to all vehicles, with 30 minutes to answer, and you pass with at least 27 correct. Many questions show a photo or drawing of a traffic situation. The test is in Portuguese; a candidate without enough Portuguese can ask the IMT for a translated test (open to every licence category since Decree-Law 114/2026 of June 2026), a request usually made through the driving school. A pass is valid for one year, during which you must pass the practical driving test. The minimum age for a category B licence is 18.",
    rows: [
      { label: "Set by", value: "IMT (Instituto da Mobilidade e dos Transportes)" },
      { label: "Questions", value: "30 multiple choice (category B)" },
      { label: "Time", value: "30 minutes" },
      { label: "Pass mark", value: "27 of 30 (90%)" },
      { label: "Language", value: "Portuguese; a translated test (including English) on request" },
      { label: "Theory pass valid", value: "1 year" },
      { label: "Minimum age (car)", value: "18" },
      { label: "Tigertest mock tests", value: "6 x 30 questions, 27 to pass" },
    ],
    basedOn: "Regulamento da Habilitação Legal para Conduzir (Decreto-Lei 138/2012, art. 44 as amended by Decreto-Lei 114/2026), arts. 43, 44, 46 and 47, and the Código da Estrada as amended to Lei 24/2025, checked November 2026",
    source: { name: "IMT, carta de condução", url: "https://www.imt-ip.pt/pt/condutores/carta-de-conducao" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

`BORROWED_SETS`: `ptimt: "driving",` (the car tiger, like the other car tests).

## lib/shareCardCopy.ts, lib/shareCards.ts, lib/shareImageUrl.ts (as for pkdrive)

```ts
  ptimt: { title: "Portugal Driving Theory Test", description: "Practise signs, priority, roundabouts and speed limits in English for the IMT exame de código." },
```

```json
  "ptimt": {
    "color": "hsl(133, 85%, 28%)",
    "tint": "hsl(133, 75%, 96%)"
  },
```

and `"ptimt"` in `SHARE_COPY_IDS`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing for the exam: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no
redirects. Add `/pt` with the other country homepages.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ptimt:portugal-driving-theory:13801`

## CLAUDE.md (after the Pakistan bullet under International driving tests)

```md
- **Portugal Driving Theory** (IMT theory exam, the exame de código, category B, `/portugal-driving-theory/*`, landing `/portugal-driving-theory-test`): `data/portugal-imt-questions.json` (200 original questions in English from the Código da Estrada as amended to Lei 24/2025, the RHLC theory programme and the Regulamento de Sinalização do Trânsito: signs 40, markings/lights/police signals 20, priority and roundabouts 34, speed and overtaking 26, stopping/parking/motorways 20, alcohol/fatigue/distraction 20, seat belts/children/lights/equipment 20, licences/documents/accidents 20), six real-length tests: test IDs 13801-13806 (30 questions each), sets 13801-13804 (by topic), state `PTIMT`, prefix `PTIMT-`, 90% pass (27 of 30, RHLC art. 47; 30 minutes, art. 46). 6/3/5/4/3/3/3/3 per test; the last items of each pool (20 in all) are training-only. The real test is in Portuguese with a translated test on request (RHLC art. 44(2), as amended by DL 114/2026), and its questions carry photos; here signs and situations are described in words. Right-hand traffic, priority to the right, the 2014 roundabout lane rules, descending driver gives way on steep narrow roads, 0.5 g/l (0.2 g/l on probation); no fines or points. Built by `tools/next100/ptimt/build.py`; sources in `tools/next100/ptimt/sources.md`. Region PT (its first exam, homepage `/pt`), hub group "Portugal driving tests", `[data-theme="ptimt"]` Portugal flag green, borrows the car tiger.
```
