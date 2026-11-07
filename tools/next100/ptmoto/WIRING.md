# Wiring for `ptmoto` (Portugal IMT motorcycle theory exam, categories A1, A2 and A, v1)

Files already written by the builder: `data/portugal-motorcycle-questions.json` (200, PASS),
`lib/banks/ptmoto.ts`, `app/portugal-motorcycle-theory/*` (layout, redirect, dashboard, drill,
stats, copied from `app/portugal-driving-theory/`; no test or practice folders),
`app/portugal-motorcycle-theory-test/page.tsx` (renders `ExamSampleQuestions`),
`tools/next100/ptmoto/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/ptmoto/build.py`. Everything below goes in shared files.

Format note: the real test for a motorcycle licence (RHLC, Decreto-Lei 138/2012, art. 43(1)(b),
46(b), 47(1)) is 40 questions in 40 minutes, 30 on the rules common to all vehicles and 10 on the
specific programme for A1, A2 and A, pass with 36 correct. A B or B1 holder seeking A2 or A sits only
the 10 specific questions (art. 43(1)(c), 10 minutes, 9 to pass). The brief's "20 + 10" note was
wrong; the law says 30 + 10. Tigertest models five real-length 40-question tests (30 common written
from the rider's seat + 10 specific), 90% to pass (36 of 40). Pools are exactly 5x each per-test
count (no spares). Dashboard = 4 topic sets + 5 tests = 9 steps. Test IDs 23101-23105, set IDs
23101-23104 (separate ranges, as in `ptimt`).

## lib/exams.ts

Add `"ptmoto"` to the `ExamId` union. Icon `bike` already exists.

Block (with the other driving tests, after `ptimt`):

```ts
const ptmoto: ExamConfig = {
  id: "ptmoto",
  stateCode: "PTMOTO",
  idBase: 23100,
  slug: "/portugal-motorcycle-theory",
  landingPath: "/portugal-motorcycle-theory-test",
  name: "Portugal Motorcycle Theory Practice Test",
  shortName: "Portugal motorcycle theory",
  examLabel: "Portugal IMT motorcycle theory exam",
  fullName: "Portugal IMT motorcycle theory exam (exame de código), categories A1, A2 and A",
  questionIdPrefix: "PTMOTO-",
  icon: "bike",
  testCount: 5,
  questionsPerTest: 40,
  passPct: 90,
  // Real test (Regulamento da Habilitação Legal para Conduzir, Decreto-Lei 138/2012, checked
  // 2026-11-06): categories A1, A2 and A, 40 questions, 30 on the common programme (Annex VII
  // part I section II) and 10 on the A-specific programme (section III point I) (art. 43(1)(b)),
  // 40 minutes (art. 46(b)), pass with 36 correct (art. 47(1)); B or B1 holders seeking A2 or A
  // take only the 10 specific questions in 10 minutes, 9 to pass (arts. 43(1)(c), 46(c), 47(1)).
  // Translated test on request (art. 44(2) as amended by DL 114/2026). The IMT publishes no topic
  // weights: the 30 common items split 6/6/6/4/4/4 like the programme, written from the rider's
  // seat; the 10 specific items follow the eight points of section III point I (gear and
  // visibility 3, handling 3, surfaces 2, machine 2). Five real-length tests, pools 5x each count,
  // no spares. passPct 90 = 36 of 40. All items original.
  blueprint: {
    ptmoSigns: 6,
    ptmoPriority: 6,
    ptmoSpeed: 6,
    ptmoParking: 4,
    ptmoRider: 4,
    ptmoLicence: 4,
    ptmoGear: 3,
    ptmoHandling: 3,
    ptmoRoad: 2,
    ptmoMachine: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 23101, name: "Signs & Priority", categories: ["ptmoSigns", "ptmoPriority"], size: 60, weightLabel: "12 of 40 test questions" },
    { setNumber: 2, id: 23102, name: "Speed, Overtaking & Parking", categories: ["ptmoSpeed", "ptmoParking"], size: 50, weightLabel: "10 of 40 test questions" },
    { setNumber: 3, id: 23103, name: "The Rider, Licences & Accidents", categories: ["ptmoRider", "ptmoLicence"], size: 40, weightLabel: "8 of 40 test questions" },
    { setNumber: 4, id: 23104, name: "Riding Skills & the Machine", categories: ["ptmoGear", "ptmoHandling", "ptmoRoad", "ptmoMachine"], size: 50, weightLabel: "10 of 40 test questions" },
  ],
  categoryLabels: {
    ptmoSigns: "Road Signs & Markings",
    ptmoPriority: "Priority & Junctions",
    ptmoSpeed: "Speed, Lanes & Overtaking",
    ptmoParking: "Stopping, Parking & Motorways",
    ptmoRider: "Alcohol, Fatigue & Attitude",
    ptmoLicence: "Licences, Documents & Accidents",
    ptmoGear: "Protective Gear & Visibility",
    ptmoHandling: "Braking, Cornering & Passengers",
    ptmoRoad: "Road Surfaces & Weather",
    ptmoMachine: "Controls, Checks & Faults",
  },
  copy: {
    guestPrompt: "to save your motorcycle theory progress and track every question you miss",
    trainingHeading: "Train by topic, from the rider's seat",
    trainingSub: "Four sets on the Código da Estrada and the motorcycle programme the IMT exam asks about, in English. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 40 questions like the real exam, 36 to pass",
    heroSubs: [
      "Four topic sets, five real-length tests. 30 common and 10 motorcycle questions each.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your motorcycle theory exam.",
    ],
    sourceLine: "Based on Portugal's Código da Estrada and the IMT programme for categories A1, A2 and A. Original questions in English; 40 per test, 36 to pass like the real exam.",
    analyticsKey: "ptmoto",
  },
};
```

Append `ptmoto` to the `EXAMS` array right after `ptimt`.

Check: 23101-23105 (tests) and 23101-23104 (sets) must be free (the task reserves idBase 23100).

## lib/banks/all.ts

```ts
import "./ptmoto";
```

## types/index.ts

- `QuestionType`: add `| "PTMOTO"`.
- `QuestionCategory`, under a `// Portugal IMT motorcycle theory` comment:

```ts
  | "ptmoSigns"
  | "ptmoPriority"
  | "ptmoSpeed"
  | "ptmoParking"
  | "ptmoRider"
  | "ptmoLicence"
  | "ptmoGear"
  | "ptmoHandling"
  | "ptmoRoad"
  | "ptmoMachine"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels, as for ptimt)

```ts
    ptmoSigns: "Road Signs & Markings",
    ptmoPriority: "Priority & Junctions",
    ptmoSpeed: "Speed, Lanes & Overtaking",
    ptmoParking: "Stopping, Parking & Motorways",
    ptmoRider: "Alcohol, Fatigue & Attitude",
    ptmoLicence: "Licences, Documents & Accidents",
    ptmoGear: "Protective Gear & Visibility",
    ptmoHandling: "Braking, Cornering & Passengers",
    ptmoRoad: "Road Surfaces & Weather",
    ptmoMachine: "Controls, Checks & Faults",
```

## app/globals.css

The suggested `14 75% 30%` clashes under the 8-degree rule with `caweld` (16 85% 32%), `ctet`
(22 80% 28%) and `biharpolice` (18 65% 30%). Checked against all 549 `--brand` values in
globals.css plus every `--brand` proposed in `tools/next100/*/WIRING.md`: `14 100% 30%` (deep
motorcycle red-orange) is clear (15 points of saturation from `caweld`) and gives white text
about 8:1. Integrator picks the final value, then runs `tools/gen_dark_brand_css.py`.

```css
  /* Portugal IMT motorcycle theory theme */
  [data-theme="ptmoto"] {
    --brand: 14 100% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 14 70% 95%;
    --brand-hover: 14 100% 26%;
    --brand-dark: 14 100% 23%;
    --brand-darker: 14 90% 16%;
    --brand-muted: 14 35% 68%;
    --brand-border: 14 35% 78%;
    --brand-border-light: 14 30% 88%;
    --brand-gradient-to: 30 55% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ptmoto: "Five 40-question mock tests in English for Portugal's IMT motorcycle theory exam, categories A1, A2 and A: the common rules from the rider's seat plus the motorcycle programme (helmets and gear, being seen, braking and cornering, passengers, road surfaces and the machine), with the real 36-of-40 pass mark.",`
- `EXAM_ORG`: `ptmoto: "IMT (Instituto da Mobilidade e dos Transportes) · motorcycle theory exam, categories A1, A2 and A",`
- Hub group: no Portugal group exists yet (`ptimt` sits in "EU driving theory tests"). Same line
  the sibling `ptcam` and `pttvde` WIRING files propose, right after "EU driving theory tests"
  (drop any id not wired yet):
  `{ title: "Portugal driving and transport tests", ids: ["ptmoto", "ptcam", "pttvde"] },`
- `RELATED_OVERRIDES` (the group may be small, and riders compare motorcycle tests):
  `ptmoto: ["ptimt", "ukmoto", "nzmoto"],`
  and add `"ptmoto"` at the front of `ptimt`'s override list if it has one.
- `SEARCH_ALIASES` (English and Portuguese):
  `ptmoto: "portugal motorcycle theory test portugal motorbike licence portugal motorcycle licence in english imt motorcycle exam category a licence portugal a1 a2 licence portugal 125cc licence portugal carta de mota carta de moto carta de condução de motociclos exame de código mota exame de codigo moto teste de código motociclo categoria a categoria a1 categoria a2 motociclos imt lisbon porto algarve madeira azores scooter licence portugal",`

## lib/region.ts

- `TEST_REGIONS`: add `ptmoto: "PT",` next to `ptimt` (a driving licence test, so NOT in
  `NON_DRIVING_TESTS`).
- `REGION_HOME.PT` stays as it is (its CTA is the car test). Optional, once `ptmoto` is wired,
  add a sentence to `testsSub` (Portuguese, machine-translated like the rest):
  `"... Seis testes completos de 30 perguntas, passa com 27. Também em inglês: o exame de código para mota (categorias A1, A2 e A), 40 perguntas, passa com 36."`

## components/home/HomePage.tsx

Nothing: `AUTHORITY.PT` is already "the IMT".

## lib/examFacts.ts

```ts
  ptmoto: {
    answer:
      "Portugal's motorcycle theory exam is the IMT's computer theory test (exame de código) for categories A1, A2 and A, taken at an exam centre after enrolling at a driving school. A candidate with no licence answers 40 multiple-choice questions in 40 minutes: 30 on the rules common to all vehicles and 10 on the motorcycle programme (protective gear, being seen, handling, road surfaces and the machine), and passes with at least 36 correct. A holder of a car licence (B or B1) seeking A2 or A answers only the 10 motorcycle questions in 10 minutes and needs 9 right. The test is in Portuguese; a candidate without enough Portuguese can ask the IMT for a translated test. A pass is valid for one year. Minimum ages are 16 for A1 (with a parent's consent under 18), 18 for A2, and 24 for A, or 20 after two years with A2.",
    rows: [
      { label: "Set by", value: "IMT (Instituto da Mobilidade e dos Transportes)" },
      { label: "Questions", value: "40 (30 common + 10 motorcycle)" },
      { label: "Time", value: "40 minutes" },
      { label: "Pass mark", value: "36 of 40 (90%)" },
      { label: "Car licence holders (A2 or A)", value: "10 motorcycle questions, 10 minutes, 9 to pass" },
      { label: "Language", value: "Portuguese; a translated test (including English) on request" },
      { label: "Theory pass valid", value: "1 year" },
      { label: "Minimum age", value: "A1 16, A2 18, A 24 (20 after 2 years of A2)" },
      { label: "Tigertest mock tests", value: "5 x 40 questions, 36 to pass" },
    ],
    basedOn: "Regulamento da Habilitação Legal para Conduzir (Decreto-Lei 138/2012), arts. 20, 43, 44 (as amended by Decreto-Lei 114/2026), 46 and 47 and Annex VII, the IMT's motorcycle licence page and the Código da Estrada as amended to Lei 24/2025, checked November 2026",
    source: { name: "IMT, cartas de condução de motociclos", url: "https://www.imt-ip.pt/condutores/informacoes-gerais/quero-ser-condutor/cartas-de-conducao-de-motociclos/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## lib/tigerAssets.ts

`BORROWED_SETS`: `ptmoto: "moto",` (the motorcycle tiger, like `zak53moto` and `nzmoto`).

## lib/shareCardCopy.ts, lib/shareCards.ts, lib/shareImageUrl.ts

```ts
  ptmoto: { title: "Portugal Motorcycle Theory Test", description: "Practise the common rules and the motorcycle programme in English for the IMT A1, A2 and A exam." },
```

```json
  "ptmoto": {
    "color": "hsl(14, 100%, 30%)",
    "tint": "hsl(14, 80%, 96%)"
  },
```

and `"ptmoto"` in `SHARE_COPY_IDS`.

## Generated files

- `npx tsx scripts/build-training-parts.ts` (no set exceeds 60, so no parts; writes the bank size
  to `lib/examBankSizes.json`).
- `npx tsx scripts/build-landing-dates.ts` after committing.
- `python3 -I tools/build_exam_sources.py` (picks up `tools/next100/ptmoto/sources.md`).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `bike` already exists.

## TEACHER_LED / TeachNudge / ExamClassFaq

Nothing: driving licence tests are not in `TEACHER_LED`.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ptmoto:portugal-motorcycle-theory:23101`

## CLAUDE.md (after the Portugal Driving Theory bullet under the EU driving theory tests)

```md
- **Portugal Motorcycle Theory** (IMT theory exam for categories A1, A2 and A, `/portugal-motorcycle-theory/*`, landing `/portugal-motorcycle-theory-test`): `data/portugal-motorcycle-questions.json` (200 original questions in English: the common programme written from the rider's seat, signs and markings 30, priority and junctions 30, speed, lanes and overtaking 30, stopping, parking and motorways 20, alcohol, fatigue and attitude 20, licences, documents and accidents 20; and the A-specific programme of RHLC Annex VII section III point I, protective gear and visibility 15, braking, cornering and passengers 15, road surfaces and weather 10, controls, checks and faults 10), five real-length tests: test IDs 23101-23105 (40 questions each, 30 common + 10 motorcycle like the real test), sets 23101-23104 (by topic), state `PTMOTO`, prefix `PTMOTO-`, 90% pass (36 of 40, RHLC arts. 43(1)(b), 46(b), 47(1); a B or B1 holder seeking A2 or A sits only the 10 motorcycle questions in 10 minutes, 9 to pass, on the landing only). 6/6/6/4/4/4/3/3/2/2 per test, no spares. Code rules for riders: helmets fitted and fastened for rider and passenger, dipped headlight always on, no passengers under 7, loads only in a box or trailer, no riding side by side or hands off, motorcycles may use bus lanes, no motorcycles of 50 cc or less on motorways, two-wheelers exempt from the triangle and vest; A1 125 cc and 11 kW, A2 35 kW not derived from over double, B holders 25+ on 125 cc per the IMT; no fines, points or fees, and no item on whether the no overtaking sign binds a motorcycle (sources disagree). The real test is in Portuguese with a translated test on request (RHLC art. 44(2) as amended by DL 114/2026); signs and situations are described in words. Kept clear of `ptimt` facts. Built by `tools/next100/ptmoto/build.py`; sources in `tools/next100/ptmoto/sources.md`. Region PT, hub group "Portugal driving and transport tests", `[data-theme="ptmoto"]` deep red-orange (14 100% 30%), borrows the motorcycle tiger.
```

## Decisions for the integrator

1. **Format.** The brief's research note (20 common + 10 motorcycle; same as ptimt's 30 in 30) was
   checked against the RHLC text: it is 40 questions (30 + 10), 40 minutes, 36 to pass; B holders
   10 questions, 10 minutes, 9 to pass. RHLC amendments between 2012 and 2026 other than DL
   114/2026 were not each re-read for arts. 43, 46 and 47 (same limitation as ptimt).
2. **Blueprint.** Mirrors the real 30 + 10 split. The brief asked for about two thirds
   motorcycle-specific; the 30 common items are all written for a rider (most stems put you on the
   motorcycle), so the motorcycle framing holds while the weights stay true to the law.
3. **Hue.** `14 100% 30%` instead of the suggested `14 75% 30%` (clash with caweld, ctet,
   biharpolice).
4. **Hub group.** "Portugal driving and transport tests" with ptcam and pttvde, as their WIRING
   files propose.
5. **Lane filtering.** SPD-012 and SPD-022 say passing between queues is not allowed, from the
   Code's general rules (overtake on the left, art. 36; lane rules, art. 13) as a September 2026
   press article quoting a lawyer reads them; there is no explicit article. Drop them if that
   reading is thought too strong.
6. **Bus lanes.** SPD-005 relies on Código da Estrada art. 77(3) (motorcycles may use reserved
   lanes). Local signs may differ; the item does not mention them.
