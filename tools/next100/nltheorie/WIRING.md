# Wiring for `nltheorie` (Netherlands, CBR theory exam for a category B car licence, v1)

Files already written by the builder: `data/netherlands-driving-theory-questions.json` (350, PASS
with `--rows 350`), `lib/banks/nltheorie.ts`, `app/netherlands-driving-theory/*` (layout, redirect,
dashboard, drill, stats; copied from `app/sweden-driving-theory/`),
`app/netherlands-driving-theory-test/page.tsx`, `tools/next100/nltheorie/*` (spec, sources,
`q_*.py`, `build.py`, this file). Rebuild with `python3 -I tools/next100/nltheorie/build.py`.
Everything below goes in shared files.

Format note: the real exam (CBR, since 7 April 2025) is 50 scored questions plus 2 unscored test
questions in 30 minutes (45 with extra time), pass 44 of 50 (88%), in Dutch or English. Tigertest
models seven 50-question tests at the same 88% line (44 of 50), so the pool is 350 (7 x each
per-test count, no spares). CBR names eight subjects and publishes no weights; Tigertest splits
subject 1 (Gebruik van de weg) into road use and parking, and weights the K+ subjects above the K
subjects (law, vehicle). Dashboard = 7 topic sets + 7 tests = 14 steps (as `dkindfoed`, 6 + 8 = 14);
a 350 pool cannot fit in 6 sets of at most 60 when every pool is a multiple of 7. No set exceeds 60.

## .claude/skills/exam-bank/scripts/validate_bank.py (KNOWN_BANKS)

```python
    "netherlands-driving-theory-questions.json": dict(rows=350, why="seven 50-question tests at the real 44/50 line"),
```

Validate: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/netherlands-driving-theory-questions.json --rows 350 --pool nlthRoad=49 --pool nlthParking=28 --pool nlthPriority=56 --pool nlthSpecial=49 --pool nlthSafety=49 --pool nlthSigns=49 --pool nlthHazard=28 --pool nlthLaw=21 --pool nlthVehicle=21`

## lib/exams.ts

Add `"nltheorie"` to the `ExamId` union. Icon `car` already exists.

Block (with the EU driving tests, after `bedriving` or `setrafik`):

```ts
const nltheorie: ExamConfig = {
  id: "nltheorie",
  stateCode: "NLTHEORIE",
  idBase: 45000,
  slug: "/netherlands-driving-theory",
  landingPath: "/netherlands-driving-theory-test",
  name: "Netherlands Driving Theory Practice Test",
  shortName: "Netherlands theory test",
  examLabel: "Dutch driving theory exam",
  fullName: "CBR theory exam (theorie-examen) for a category B car licence",
  questionIdPrefix: "NLTH-",
  icon: "car",
  testCount: 7,
  questionsPerTest: 50,
  passPct: 88,
  // Source: CBR "Hoe gaat het theorie-examen auto?" and "Theorie-examenplan auto" (checked
  // 2026-11-21): one combined exam since 7 April 2025, 50 questions plus 2 unscored test questions,
  // 44 of 50 to pass, 30 minutes (45 with extra time), in Dutch or English, from age 16. Eight
  // subjects with no published weights (1 Gebruik van de weg, 2 Voorrang en voor laten gaan,
  // 3 Bijzondere wegen en manoeuvres, 4 Veilig rijden en noodsituaties, 5 Verkeerstekens en
  // aanwijzingen, 6 Verantwoorde verkeersdeelname en milieubewust rijden, 7 Wetgeving,
  // 8 Voertuigkennis); driver assistance systems added from 1 April 2026 (Stcrt. 2025, 40398).
  // Weights are Tigertest's: subject 1 split into road use (7) and parking (4), K+ subjects above
  // the K subjects. Rules: RVV 1990 (version 1 July 2026), Wegenverkeerswet 1994, RDW and
  // Rijksoverheid pages. Seven tests of 50, pools exactly 7x each count (350, all original; signs
  // described in words; pictures, animations and hazard timing not modelled). passPct 88 = 44/50.
  blueprint: {
    nlthRoad: 7,
    nlthParking: 4,
    nlthPriority: 8,
    nlthSpecial: 7,
    nlthSafety: 7,
    nlthSigns: 7,
    nlthHazard: 4,
    nlthLaw: 3,
    nlthVehicle: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 45001, name: "Use of the Road", categories: ["nlthRoad"], size: 49, weightLabel: "7 of 50 test questions" },
    { setNumber: 2, id: 45002, name: "Priority & Giving Way", categories: ["nlthPriority"], size: 56, weightLabel: "8 of 50 test questions" },
    { setNumber: 3, id: 45003, name: "Motorways, Roundabouts & Special Roads", categories: ["nlthSpecial"], size: 49, weightLabel: "7 of 50 test questions" },
    { setNumber: 4, id: 45004, name: "Safe Driving & Emergencies", categories: ["nlthSafety"], size: 49, weightLabel: "7 of 50 test questions" },
    { setNumber: 5, id: 45005, name: "Signs, Markings & Directions", categories: ["nlthSigns"], size: 49, weightLabel: "7 of 50 test questions" },
    { setNumber: 6, id: 45006, name: "Stopping, Parking & Traffic Law", categories: ["nlthParking", "nlthLaw"], size: 49, weightLabel: "7 of 50 test questions" },
    { setNumber: 7, id: 45007, name: "Responsible Driving & Your Car", categories: ["nlthHazard", "nlthVehicle"], size: 49, weightLabel: "7 of 50 test questions" },
  ],
  categoryLabels: {
    nlthRoad: "Use of the Road",
    nlthParking: "Stopping & Parking",
    nlthPriority: "Priority & Giving Way",
    nlthSpecial: "Motorways, Roundabouts & Special Roads",
    nlthSafety: "Safe Driving & Emergencies",
    nlthSigns: "Signs, Markings & Directions",
    nlthHazard: "Responsible & Eco Driving",
    nlthLaw: "Licence & Traffic Law",
    nlthVehicle: "Vehicle & Driver Assistance",
  },
  copy: {
    guestPrompt: "to save your theory exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Seven sets on the Dutch traffic rules, signs and safety subjects CBR's theory exam covers. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, aim for 44 or more",
    heroSubs: [
      "Seven topics, seven 50-question tests. Priority weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your theory exam with the CBR.",
    ],
    sourceLine: "Based on the Dutch traffic rules (RVV 1990) and CBR's theory exam plan. Original questions; 50 per test, 44 to pass like the real exam.",
    analyticsKey: "nltheorie",
  },
};
```

Append `nltheorie` to the `EXAMS` array with the other EU driving tests.

Check: 45001-45007 (sets and tests) must be free. On 2026-11-21 nothing in `lib/exams.ts` or
`lib/v2` used 45000-45099 (grepped). The other Netherlands builders in this wave were given their
own idBases.

Translation later (`nl`, landing `/nl/theorie-examen-auto-oefenen`, x-default, like `bedriving` and
`setrafik`): add `translations.nl` with `locale: "nl-NL"` and `landingPath` when the Dutch bank is
built. Not part of this build.

## lib/banks/all.ts

```ts
import "./nltheorie";
```

## types/index.ts

- `QuestionType`: add `| "NLTHEORIE"`.
- `QuestionCategory`, under a `// Netherlands driving theory (nltheorie)` comment (prefix `nlth`;
  grepped, no clash with any existing key):

```ts
  | "nlthRoad"
  | "nlthParking"
  | "nlthPriority"
  | "nlthSpecial"
  | "nlthSafety"
  | "nlthSigns"
  | "nlthHazard"
  | "nlthLaw"
  | "nlthVehicle"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nlthRoad: "Use of the Road",
    nlthParking: "Stopping & Parking",
    nlthPriority: "Priority & Giving Way",
    nlthSpecial: "Motorways, Roundabouts & Special Roads",
    nlthSafety: "Safe Driving & Emergencies",
    nlthSigns: "Signs, Markings & Directions",
    nlthHazard: "Responsible & Eco Driving",
    nlthLaw: "Licence & Traffic Law",
    nlthVehicle: "Vehicle & Driver Assistance",
```

## app/globals.css

The suggested `24 90% 34%` clashes (within 8 degrees, under 15 saturation and under 8 lightness
apart) with ham 32 90 35.6, aws 20 90 41.4, caweld 16 85 32, auwhite 28 85 38.5, itil 28 90 31,
ctet 22 80 28 and crc 20 90 40. I scanned hues 10 to 39, saturation 20 to 100 (step 5), lightness
16 to 43 against all 499 light themes: the only free spots with white text at 4.5:1 or better
are `19 100% 16-22%`. Suggested: `19 100% 22%` (deep Dutch orange, white text 10.8:1), below the
30 to 48% band like pkdrive (22%) and setrafik (25%). The other Netherlands builders (nlbrom,
nlmoto) may also reach for orange: integrator's call.

```css
  /* Netherlands driving theory theme */
  [data-theme="nltheorie"] {
    --brand: 19 100% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 19 80% 95%;
    --brand-hover: 19 100% 18%;
    --brand-dark: 19 100% 15%;
    --brand-darker: 19 90% 10%;
    --brand-muted: 19 35% 68%;
    --brand-border: 19 40% 78%;
    --brand-border-light: 19 35% 88%;
    --brand-gradient-to: 215 60% 95%;
  }
```

Then run `tools/gen_dark_brand_css.py` once for everyone.

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nltheorie: "Seven 50-question mock tests in English for the CBR theory exam for a car licence (category B) in the Netherlands: priority to the right, trams and shark's teeth, speed limits, motorways, matrix signs and the erf, parking discs, alcohol limits, the 2toDrive coach rules and driver assistance systems, at the real 44/50 pass mark.",`
- `EXAM_ORG`: `nltheorie: "CBR · theory exam (theorie-examen) car, category B",`
- Hub group: add `"nltheorie"` to the existing `"EU driving theory tests"` group (after
  `"bevracht"`, next to Belgium). It is a driving test, so it never goes in a non-driving group;
  the Netherlands licence-category siblings (nlbrom, nlmoto) join the same group, and the
  non-driving ones (nlvca, nlwft) go in a new group placed after it, "Netherlands licensing and
  workplace exams" (their builders name it).
- `RELATED_OVERRIDES`: `nltheorie: ["bedriving", "detheorie", "ukcar"],` (swap in `nlmoto` and
  `nlbrom` once they ship).
- `SEARCH_ALIASES`:
  `nltheorie: "netherlands driving theory test dutch driving theory test in english cbr theory exam cbr theorie examen theorie-examen auto theorie examen auto theorieexamen rijbewijs b theorie rijbewijs halen cbr examen engels autotheorie auto theorie oefenen theorie oefenexamen voorrang van rechts haaientanden erf autoweg 2todrive begeleid rijden dutch car licence test english holland driving test amsterdam rotterdam den haag the hague utrecht eindhoven",`

## lib/region.ts (new region NL, wired like SE and BE)

- `Region` union: add `| "NL"`.
- `REGIONS`: `{ code: "NL", name: "Netherlands", short: "NL", inName: "the Netherlands", lang: "nl", locale: "nl-NL" },`
  Language note: `regionHomePath("NL")` is `/nl`, which is the folder of the Dutch-language
  landings, whose `app/nl/layout.tsx` sets `lang="nl"`. So `app/nl/page.tsx` (the homepage)
  renders inside a Dutch layout, and the region should be `lang: "nl"` with the Dutch home copy
  below. If the integrator prefers English until the `nl` translation ships, use `lang: "en",
  locale: "en-NL"` with the English copy and wrap `app/nl/page.tsx` accordingly.
- `regionFromCountry`: `case "NL": return "NL";`
- `REGION_HREFLANG`: derived from `locale` (`nl-NL`).
- `TEST_REGIONS`: `nltheorie: "NL",` (a driving test, so NOT in `NON_DRIVING_TESTS`).
- `REGION_HOME` (Dutch, for `lang: "nl"`; model-written, final):

```ts
  // In Dutch (REGIONS[].lang), model-written. The theory test runs in English until its Dutch
  // translation ships; then point the CTA at /nl/theorie-examen-auto-oefenen.
  NL: {
    title: "Gratis oefenen voor het CBR theorie-examen auto | Tigertest",
    description: "Gratis oefenen voor het CBR theorie-examen auto (rijbewijs B), nu in het Engels: 350 eigen vragen over de Nederlandse verkeersregels, zeven proefexamens van 50 vragen, elk antwoord uitgelegd. Geen account nodig.",
    lead: "Oefen voor het theorie-examen auto van het CBR met eigen vragen over voorrang, borden, snelheid, de snelweg, parkeren en rijhulpsystemen, elk antwoord uitgelegd. De vragen zijn nu in het Engels, zoals het CBR het examen ook aanbiedt. Zonder account.",
    cta: { label: "Theorie-examen", href: "/netherlands-driving-theory-test" },
    testsTitle: "Oefenexamens voor Nederland",
    testsSub: "Theorie-examen auto (rijbewijs B): 350 vragen over het RVV 1990, in km/u en voor rechtsverkeer, zeven proefexamens van 50 vragen; op het echte examen heb je er 44 van de 50 goed nodig.",
  },
```

  English version (for `lang: "en"`):

```ts
  NL: {
    title: "Free Netherlands Driving Theory Test Practice in English | Tigertest",
    description: "Free practice in English for the Dutch CBR theory exam for a car licence (category B): 350 original questions on Dutch traffic rules, every answer explained. No account needed.",
    lead: "Practice in English for the CBR theory exam, the knowledge test for a Dutch car licence. Original questions on priority, signs, speed, motorways, parking and driver assistance systems, every answer explained. No signup.",
    cta: { label: "Theory exam", href: "/netherlands-driving-theory-test" },
    testsTitle: "Driving theory exam (category B)",
    testsSub: "350 questions on Dutch traffic rules, in km/h for right-hand traffic. The real exam has 50 scored questions and you need 44 right.",
  },
```

- File header comment: add `/nl` to the list of country homepages.

## components/home/HomePage.tsx

- `AUTHORITY`: `NL: "the CBR",`
- Dutch list, next to `AUTHORITY_NL_BE`: `const AUTHORITY_NL_NL = "het CBR";` and in
  `authorityIn`: `if (region === "NL" && lang === "nl") return AUTHORITY_NL_NL;` (before the
  generic fallback, which would otherwise print "CBR"). Extend the comment above the constants.

The integrator adds `app/nl/page.tsx` (copy `app/se/page.tsx` with `"NL"`; it sits inside the
existing `app/nl/layout.tsx`), the middleware country mapping (from `regionFromCountry`), the
sitemap and `llms.txt` lines, and the funnel `visit_region_NL` key if region keys are listed.

## lib/examFacts.ts

```ts
  nltheorie: {
    answer:
      "The theory exam for a Dutch car licence (category B) is run by the CBR (Centraal Bureau Rijvaardigheidsbewijzen) at its exam centres, on a touch screen. Since 7 April 2025 it is one combined exam: after 2 practice questions you answer 50 exam questions plus 2 test questions that do not count, and you need at least 44 of the 50 right. You have 30 minutes, or 45 with extra time or in an individually guided exam. The exam covers eight subjects: use of the road, priority, special roads and manoeuvres, safe driving and emergencies, signs and directions, responsible and eco-friendly driving, traffic law and vehicle knowledge, including driver assistance systems since 1 April 2026. Questions come in several forms, many built on a picture: multiple choice, yes or no, number entry, drag and drop and hotspot. You can take it in Dutch or English, or with an approved interpreter, from age 16; you get the result straight away.",
    rows: [
      { label: "Run by", value: "CBR (Centraal Bureau Rijvaardigheidsbewijzen)" },
      { label: "Questions", value: "50 scored, plus 2 unscored test questions" },
      { label: "Time", value: "30 minutes (45 with extra time)" },
      { label: "Pass mark", value: "44 of 50 (88%)" },
      { label: "Languages", value: "Dutch or English; other languages with an approved interpreter" },
      { label: "Minimum age", value: "16" },
      { label: "Subjects", value: "8, from road use and priority to vehicle knowledge" },
      { label: "Tigertest mock tests", value: "7 x 50 questions, 44 to pass" },
    ],
    basedOn: "CBR's theory exam pages and theory exam plan for the car, the Regeling eisen theorie-examen rijbewijscategorie B as amended in 2025, and the Dutch traffic rules (RVV 1990), checked November 2026",
    source: { name: "CBR: Hoe gaat het theorie-examen auto?", url: "https://www.cbr.nl/nl/rijbewijs-halen/auto/theorie-examen-auto/hoe-gaat-het-theorie-examen-auto" },
  },
```

## lib/seoDates.ts and lib/landingDates.json

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave, and run
`npx tsx scripts/build-landing-dates.ts`.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED` (driving schools teach for it, but the EU driving
tests are not teacher-led; follow `bedriving`).

## lib/tigerAssets.ts

Add `nltheorie: "driving",` to `BORROWED_SETS` next to `bedriving` and `setrafik`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing for the exam: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no
redirects needed. The `/nl` homepage lines are the integrator's region work.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nltheorie:netherlands-driving-theory:45001`

## docs/exams/nltheorie.md (new file)

```md
# nltheorie: Netherlands Driving Theory (CBR theorie-examen auto, category B)

- **What it is**: the CBR theory exam for a Dutch car licence (category B), offered in Dutch or English. Tigertest's version is in English (base); a Dutch (`nl`) translation is planned (landing `/nl/theorie-examen-auto-oefenen`, x-default, like `bedriving` and `setrafik`).
- **Official format** (CBR, checked 2026-11-21): one combined exam since 7 April 2025; 2 practice questions, then 50 exam questions plus 2 unscored test questions; 44 of 50 to pass; 30 minutes (45 with extra time or individually guided); Dutch or English, interpreter for other languages; from age 16. Eight subjects, no published weights; driver assistance systems in the rules from 1 April 2026 (Stcrt. 2025, 40398). Question types: multiple choice, multiple response, yes/no, number entry, drag, single drag, hotspot, mostly on pictures; hazard recognition by animation (press reports).
- **Tigertest model**: 350 text-only single-answer questions, seven 50-question tests at 88% (44/50), every item used once in tests. Per test: road use 7, parking 4, priority 8, motorways/roundabouts/special roads 7, safe driving and emergencies 7, signs/markings/directions 7, responsible and eco driving 4, licence and law 3, vehicle and driver assistance 3. Pools 49/28/56/49/49/49/28/21/21.
- **IDs**: idBase 45000, tests 45001-45007, sets 45001-45007 (7 topic sets; 14 dashboard steps), state code `NLTHEORIE`, prefix `NLTH-`, segments ROD, PRK, PRI, SPC, SAF, SGN, HAZ, LAW, VEH, category keys `nlth*`.
- **Routes**: app `/netherlands-driving-theory/*`, landing `/netherlands-driving-theory-test`.
- **Sources and build**: `tools/next100/nltheorie/sources.md`; `python3 -I tools/next100/nltheorie/build.py` (key rotated A-D by item index). KNOWN_BANKS entry (350 rows).
- **Content**: RVV 1990 (1 July 2026 version), Wegenverkeerswet 1994 (alcohol 0.5 / novice 0.2 per mille), RDW APK schedule, Rijksoverheid 2toDrive coach rules (27 years, 5 years licence, up to five coaches), beginner's and points licences, ISA on new cars from July 2024. Dutch terms kept as CBR keeps them untranslated (erf, autoweg, APK, brommobiel, snorfiets, speed pedelec).
- **Not modelled**: pictures, animations, hazard-recognition timing, drag/hotspot/number formats; no fees, surcharges or fines; no city-specific zone lists; no exam-admin questions. Kept clear of `bedriving` (Belgian rules).
- **Theme**: `[data-theme="nltheorie"]` `19 100% 22%` (deep Dutch orange; the suggested 24 90% 34% clashed), borrows the car tiger.
- **Region and hub**: region NL (its first exam, homepage `/nl`), hub group "EU driving theory tests".
```

## CLAUDE.md

None: per its own rule, a new exam gets a `docs/exams/<id>.md` file, never a paragraph in
CLAUDE.md. If the integrator keeps the older bullet list (as the setrafik WIRING did), the bullet
in the house shape is:

```md
- **Netherlands Driving Theory** (CBR theory exam, theorie-examen auto B, `/netherlands-driving-theory/*`, landing `/netherlands-driving-theory-test`): `data/netherlands-driving-theory-questions.json` (350 original questions on Dutch traffic rules: road use 49, stopping and parking 28, priority and giving way 56, motorways, roundabouts and special roads 49, safe driving and emergencies 49, signs, markings and directions 49, responsible and eco driving 28, licence and traffic law 21, vehicle and driver assistance 21), test IDs 45001-45007 (50 questions each), sets 45001-45007 (by topic), state `NLTHEORIE`, prefix `NLTH-`, category keys `nlth*`, 88% pass (the real exam is 50 scored questions plus 2 unscored, 44 to pass, in 30 minutes, in Dutch or English; CBR publishes eight subjects but no weights, so ours are Tigertest's). 7/4/8/7/7/7/4/3/3 per test, no spares. Right-hand traffic, priority to the right (trams first, unpaved yields to paved), 50/80/100/130 km/h, 15 km/h in an erf, 90 with a trailer up to 3,500 kg, 0.5 per mille (0.2 novices), 2toDrive coaches, ADAS from 1 Apr 2026; no fees or fines. Pictures, animations and hazard timing not modelled; signs described in words. Built by `tools/next100/nltheorie/build.py`; sources in `tools/next100/nltheorie/sources.md`. Region NL (its first exam, homepage `/nl`), hub group "EU driving theory tests".
```
