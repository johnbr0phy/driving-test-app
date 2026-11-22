# Wiring for `nlmoto` (Netherlands motorcycle theory exam, CBR, rijbewijs A1, A2 and A, written in Dutch, v1)

Native-language exam built on the `detheorie` template (and its motorcycle sibling `demotorrad`):
the base bank and base copy are Dutch (`language: "nl"`). Files already written by the builder:
- `data/nl-motor-questions.json` (200, validator PASS with `--lang nl`)
- `lib/banks/nlmoto.ts`
- `app/motor-theorie/*` (layout, redirect, dashboard, drill, stats; copied from `app/motorrad-theorie/`)
- `lib/landings/nlmoto.nl.json` (Dutch landing content, with a Dutch `facts.source`)
- `app/nl/motor-theorie-examen-oefenen/page.tsx` (three-line `TranslatedExamLanding`, lang `nl`, `samples related`)
- `tools/next100/nlmoto/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/nlmoto/build.py`. Everything below goes in shared files.

Format note: the real exam (CBR, checked 2026-11-22) is one theory exam for all motorcycle
licences (A1, A2, A): 50 scored questions on traffic rules and traffic insight plus 2 unscored
test questions, after 2 practice questions; 30 minutes (45 with extra time or individually
guided); pass with at least 41 of 50 (82%); from age 17; in Dutch, other languages only with an
interpreter (the CBR offers the English exam for the car only, so the base stays Dutch). Several
question types, often on a picture. Tigertest models four 50-question tests (200 items, pools
exactly 4x each per-test count, every item in exactly one test) of single best answers from four,
`passPct: 82` (41 of 50, the real norm). Five topic sets (45301-45305, each at most 60) + 4 tests
= 9 dashboard steps.

## lib/exams.ts

Add `"nlmoto"` to the `ExamId` union. Icon `bike` already exists (moto, demotorrad, semoto).
45301-45305 are free (idBase 45300 from the queue; siblings nltheorie 45000, nlbrom 45200).
Set ids 45301-45305 share numbers with test ids 45301-45304, like detheorie.

```ts
const nlmoto: ExamConfig = {
  id: "nlmoto",
  stateCode: "NLMOTO",
  idBase: 45300,
  slug: "/motor-theorie",
  landingPath: "/nl/motor-theorie-examen-oefenen",
  name: "Motor theorie-examen (CBR, rijbewijs A)",
  shortName: "Motor theorie",
  examLabel: "Theorie-examen motor",
  fullName: "CBR theorie-examen motor voor rijbewijs A1, A2 en A",
  questionIdPrefix: "NLMOT-",
  icon: "bike",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 82,
  language: "nl",
  locale: "nl-NL",
  english: {
    name: "Netherlands Motorcycle Theory Test (CBR, category A/A1/A2)",
    shortName: "Dutch motorcycle theory test",
    fullName: "Netherlands CBR motorcycle theory exam for licence categories A1, A2 and A, in Dutch",
  },
  review: { nl: "model" },
  // Real exam (CBR "Hoe gaat het theorie-examen motor?" and Theorie-examenplan motor, checked
  // 2026-11-22): 50 scored questions + 2 unscored test questions, 30 minutes, pass 41 of 50,
  // from 17, in Dutch (other languages with an interpreter). Eight CBR subjects, no published
  // weights, plus motorcycle items (protective gear, visibility, slippery surfaces, kill switch,
  // oil and chain, the passenger). The 7/6/6/8/5/5/4/3/3/3 split is Tigertest's own. Four tests
  // of 50, pools exactly 4x (200, all original, written in Dutch); single best answer of four.
  blueprint: {
    nlmotGebruik: 7,
    nlmotVoorrang: 6,
    nlmotBijzonder: 6,
    nlmotRijtechniek: 8,
    nlmotTekens: 5,
    nlmotUitrusting: 5,
    nlmotPassagier: 4,
    nlmotVerantwoord: 3,
    nlmotWet: 3,
    nlmotVoertuig: 3,
  },
  // Five topic sets, not testSets(): 5 + 4 tests = 9 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 45301, name: "Remmen, bochten en je motor", categories: ["nlmotRijtechniek", "nlmotVoertuig"], size: 44, weightLabel: "11 van 50 vragen per examen" },
    { setNumber: 2, id: 45302, name: "Uitrusting, passagier en groep", categories: ["nlmotUitrusting", "nlmotPassagier"], size: 36, weightLabel: "9 van 50 vragen per examen" },
    { setNumber: 3, id: 45303, name: "Plaats op de weg en bijzondere wegen", categories: ["nlmotGebruik", "nlmotBijzonder"], size: 52, weightLabel: "13 van 50 vragen per examen" },
    { setNumber: 4, id: 45304, name: "Voorrang en verkeerstekens", categories: ["nlmotVoorrang", "nlmotTekens"], size: 44, weightLabel: "11 van 50 vragen per examen" },
    { setNumber: 5, id: 45305, name: "Rijbewijs en verantwoord rijden", categories: ["nlmotWet", "nlmotVerantwoord"], size: 24, weightLabel: "6 van 50 vragen per examen" },
  ],
  categoryLabels: {
    nlmotGebruik: "Gebruik van de weg",
    nlmotVoorrang: "Voorrang en voor laten gaan",
    nlmotBijzonder: "Bijzondere wegen, file en autosnelweg",
    nlmotRijtechniek: "Veilig rijden: remmen en bochten",
    nlmotTekens: "Verkeerstekens en aanwijzingen",
    nlmotUitrusting: "Beschermende uitrusting en zichtbaarheid",
    nlmotPassagier: "Passagier, bagage en groepsrijden",
    nlmotVerantwoord: "Verantwoord en milieubewust rijden",
    nlmotWet: "Wetgeving: rijbewijs A1, A2 en A",
    nlmotVoertuig: "Voertuigkennis motor",
  },
  copy: {
    guestPrompt: "om je voortgang voor het theorie-examen motor te bewaren en elke foute vraag bij te houden",
    trainingHeading: "Oefensets",
    trainingSub: "Elke oefenset behandelt een onderwerp van het examen. Je krijgt meteen uitleg, en foute antwoorden komen terug tot je ze kent.",
    testsHeading: "Proefexamens · 50 vragen, 41 goed om te slagen",
    heroSubs: [
      "Vijf oefensets, vier proefexamens. Remmen en bochten komen het vaakst terug.",
      "Eerst de oefenset beheersen, dan het proefexamen.",
      "De helft is binnen. Doe een proefexamen.",
      "Herhaal je fouten en test jezelf opnieuw.",
      "Alles groen. Plan je theorie-examen motor bij het CBR.",
    ],
    sourceLine: "Volgens het RVV 1990, de Wegenverkeerswet 1994, de RDW en het CBR-examenplan motor, stand november 2026. Eigen vragen, niet uit CBR-examens; 50 per proefexamen, 41 goed om te slagen.",
    analyticsKey: "nlmoto",
  },
};
```

Append `nlmoto` to the `EXAMS` array with the other Netherlands driving tests (after `nlbrom`,
or after `nltheorie` if nlbrom is not wired yet).

## lib/banks/all.ts

```ts
import "./nlmoto";
```

## types/index.ts

- `QuestionType`: add `| "NLMOTO"`.
- `QuestionCategory`, under a `// Netherlands motorcycle theory exam (CBR, A1, A2, A)` comment
  (prefix `nlmot` grepped against `types/index.ts`: no collision):

```ts
  | "nlmotGebruik"
  | "nlmotVoorrang"
  | "nlmotBijzonder"
  | "nlmotRijtechniek"
  | "nlmotTekens"
  | "nlmotUitrusting"
  | "nlmotPassagier"
  | "nlmotVerantwoord"
  | "nlmotWet"
  | "nlmotVoertuig"
```

## i18n

Only if results and `/stats` do not already prefer `exam.categoryLabels` (they did for detheorie).
`i18n/nl.ts`: the Dutch labels above. `i18n/en.ts` (other dictionaries fall back to English):

```ts
    nlmotGebruik: "Use of the Road",
    nlmotVoorrang: "Priority & Giving Way",
    nlmotBijzonder: "Special Roads, Filtering & Motorways",
    nlmotRijtechniek: "Riding Technique: Braking & Bends",
    nlmotTekens: "Signs & Directions",
    nlmotUitrusting: "Protective Gear & Visibility",
    nlmotPassagier: "Passengers, Luggage & Group Riding",
    nlmotVerantwoord: "Responsible & Eco Riding",
    nlmotWet: "Law: Licences A1, A2 & A",
    nlmotVoertuig: "Motorcycle Knowledge",
```

## lib/shuffleOptions.ts

No position-dependent Dutch options ("A en B", "Beide", "Alle antwoorden"); build.py asserts it.
Nothing beyond the platform's `nl` patterns.

## app/globals.css

Suggested `8 70% 28%` (queue) clashes with `fimoto` (12 70 22), `sgftt` (0 70 22), `casfa`
(2 78 31) and `barber` (4 60 31). A scan of hues 340 to 40 at saturation 40 to 100 and lightness
20 to 44 against all 967 `[data-theme]` blocks found only `19 100% 22%` and `19 100% 20%` free with
white text at least 4.5:1. Suggested: `19 100% 22%` (a deep burnt orange, Dutch orange darkened
for white text; about 9:1). Siblings: nltheorie suggested 24 90% 34% (12 points lighter, clear),
nlbrom magenta. The integrator settles the final hue and writes it here and nowhere else in the
config. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Netherlands motorcycle theory exam (CBR, rijbewijs A) theme */
  [data-theme="nlmoto"] {
    --brand: 19 100% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 22 90% 96%;
    --brand-hover: 19 100% 18%;
    --brand-dark: 19 100% 15%;
    --brand-darker: 19 100% 10%;
    --brand-muted: 22 50% 62%;
    --brand-border: 22 60% 80%;
    --brand-border-light: 22 60% 90%;
    --brand-gradient-to: 28 95% 92%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `nlmoto: "Four 50-question tests in Dutch for the CBR motorcycle theory exam (rijbewijs A1, A2 and A): braking and cornering, slippery surfaces, filtering in traffic jams, protective gear and being seen, passengers and group riding, licence limits, kill switch, oil and chain, plus priority and signs from the rider's point of view, written from the RVV 1990 and RDW rules as of November 2026.",`
- `EXAM_ORG`: `nlmoto: "CBR · theorie-examen motor (A1, A2, A), in Dutch",`
- Hub group: a licence category, so it joins the Netherlands driving group with `nltheorie` and
  `nlbrom`: add `"nlmoto"` to the `"EU driving theory tests"` group right after `"nlbrom"` (after
  `"nltheorie"` if nlbrom is not wired). Not in a non-driving group (nlvca and nlwft go in the
  new "Netherlands licensing and finance exams" group placed after it, per nltheorie's WIRING).
- `RELATED_OVERRIDES`: `nlmoto: ["nltheorie", "nlbrom", "bemoto", "demotorrad"],`
- `SEARCH_ALIASES` (Dutch and English):
  `nlmoto: "motor theorie theorie-examen motor theorie examen motor motortheorie cbr motor motorrijbewijs rijbewijs a rijbewijs a1 rijbewijs a2 theorie a1 theorie a2 motor proefexamen motorexamen avb avd motorrijles netherlands motorcycle theory test dutch motorcycle theory exam cbr motorcycle test holland motorcycle licence theory amsterdam rotterdam utrecht den haag eindhoven",`
- Native name on the Dutch homepage, `english.name` elsewhere (LANGUAGES.md 1.6).

## lib/region.ts

Region NL is new in this wave; nltheorie's WIRING adds it (`lang: "nl"`, `locale: "nl-NL"`,
`regionFromCountry` NL, `REGION_HOME.NL`, `AUTHORITY.NL`). Add only:

```ts
  nlmoto: "NL",
```

to `TEST_REGIONS`. A driving test, so NOT in `NON_DRIVING_TESTS`. If `REGION_HOME.NL.testsSub`
mentions only the car test, it still fits (rules from the RVV 1990, CBR exam style not modelled).

## lib/landingContent.ts

Register the Dutch landing so `/nl` can quote its facts answer:

```ts
import nlmotoNl from "@/lib/landings/nlmoto.nl.json";
  "nlmoto.nl": nlmotoNl as TranslatedLandingContent,
```

## app/nl/layout.tsx

Already exists (`lang="nl"`, Belgian Dutch landings). The landing is
`app/nl/motor-theorie-examen-oefenen/page.tsx`; `TranslatedExamLanding` uses `exam.landingPath`
when `lang === exam.language`, locale `nl-NL`, `priceCurrency` EUR.

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  nlmoto: {
    answer:
      "The Dutch motorcycle theory exam (theorie-examen motor) is one CBR exam for every motorcycle licence, A1, A2 and A. You answer 50 questions on traffic rules and traffic insight on a touchscreen, plus 2 unscored test questions, after 2 practice questions. You have 30 minutes, or 45 minutes with extra time or an individually guided exam, and you pass with at least 41 of the 50 correct. The result appears straight after the exam. You can sit it from age 17. The exam is in Dutch; for another language you book an exam with an approved interpreter. Questions come in several formats, often on a picture. After the theory exam come the practical exams AVB (vehicle control) and AVD (traffic participation).",
    rows: [
      { label: "Run by", value: "CBR (Centraal Bureau Rijvaardigheidsbewijzen)" },
      { label: "Questions", value: "50 scored, plus 2 unscored test questions" },
      { label: "Time", value: "30 minutes (45 with extra time)" },
      { label: "Pass mark", value: "41 of 50 correct" },
      { label: "Minimum age", value: "17" },
      { label: "Language", value: "Dutch, other languages with an interpreter" },
      { label: "Covers", value: "A1, A2 and A (one theory exam)" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Dutch, 41 to pass" },
    ],
    basedOn: "CBR exam pages and Theorie-examenplan motor, RDW licence categories, RVV 1990 and Wegenverkeerswet 1994 as in force, checked November 2026",
    source: { name: "CBR: theory exam for the motorcycle", url: "https://www.cbr.nl/nl/rijbewijs-halen/motor/theorie-examen-motor/hoe-gaat-het-theorie-examen-motor" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Dutch)" per LANGUAGES.md 3.5; nothing exam-specific.

## lib/seoDates.ts / lib/landingDates.json

Bump via `scripts/build-landing-dates.ts` at integration, as for the other wave exams.

## lib/tigerAssets.ts

Add to `BORROWED_SETS` with the other motorcycle tests: `nlmoto: "moto",`

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED` (a rijschool teaches it, but the house treats
licence tests as self-study; follow `demotorrad`).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the native `landingPath` under `/nl` is emitted once, with
hreflang `nl-NL` and x-default to itself). Class questions import `lib/banks/all`. No redirects.
Route budget: 5 wrappers under `app/motor-theorie/` (no test/practice routes) and 1 landing.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 24 to 52 (all at most 60),
so no parts.

## Screenshots

`TranslatedExamLanding` reads `/landing/nlmoto-{mobile,desktop}-nl.png` (as for the other native
landings): `node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nlmoto:motor-theorie:45301`
then rename to the `-nl` names if the platform has not been taught the base-language names.

## docs/exams/nlmoto.md

```md
# nlmoto: Netherlands motorcycle theory exam (CBR, rijbewijs A1, A2, A), in Dutch

- **What**: the CBR theorie-examen motor, one theory exam for all motorcycle licences (A1, A2, A), followed by the practical exams AVB and AVD.
- **Official format** (cbr.nl, checked 2026-11-22): 50 scored questions + 2 unscored test questions (after 2 practice questions), 30 minutes (45 with extra time or individually guided), pass 41 of 50, from age 17, in Dutch (other languages with an interpreter; English is offered for the car exam only). Several question types, often on a picture.
- **Tigertest model**: v1, native Dutch (`language: "nl"`, `locale: "nl-NL"`, `review: { nl: "model" }`). 200 questions, four 50-question tests (45301-45304), 7/6/6/8/5/5/4/3/3/3 per test, pools exactly 4x, no spares; `passPct: 82`. Five topic sets 45301-45305 (44/36/52/44/24); 9 dashboard steps.
- **Categories**: Gebruik van de weg 28, Voorrang 24, Bijzondere wegen/file/autosnelweg 24, Rijtechniek 32, Verkeerstekens 20, Uitrusting en zichtbaarheid 20, Passagier/bagage/groep 16, Verantwoord rijden 12, Wetgeving A1/A2/A 12, Voertuigkennis 12. Built on the eight CBR subjects plus the exam plan's motorcycle items (3.1.1 to 3.1.4 and the passenger).
- **IDs**: state `NLMOTO`, prefix `NLMOT-`, segments GBR, VRR, BYZ, RTK, TKN, UIT, PAS, VER, WET, VTG.
- **Sources**: `tools/next100/nlmoto/sources.md`; terms in `glossary.md`. Build: `python3 -I tools/next100/nlmoto/build.py` (sorts all-number options, Dutch decimal comma).
- **Theme**: `[data-theme="nlmoto"]` (suggested 19 100% 22%, burnt orange); borrows the motorcycle tiger (`moto`).
- **Region and hub**: region NL (homepage `/nl`), hub group "EU driving theory tests" after `nlbrom`.
- **Lane**: rider-specific content and RVV priority and signs from a rider's view; facts and answers kept clear of `nlbrom` and `nltheorie`.
- **Not modelled**: picture, drag, hotspot and number-entry questions; code 80 and the A age paths (sources disagree); the filtering code is a Motorplatform code of conduct, not law, and is presented that way.
```

## CLAUDE.md (after the nlbrom bullet, with the Netherlands exams)

```md
- **Motor theorie-examen** (`nlmoto`, CBR motorcycle theory exam for Dutch licences A1, A2 and A, native Dutch exam, `language: "nl"`, `locale: "nl-NL"`, `review: { nl: "model" }`, `/motor-theorie/*`, landing `/nl/motor-theorie-examen-oefenen` from `lib/landings/nlmoto.nl.json`): `data/nl-motor-questions.json` (200 original questions written directly in Dutch, in "je": Gebruik van de weg 28, Voorrang 24, Bijzondere wegen, file en autosnelweg 24, Veilig rijden: remmen en bochten 32, Verkeerstekens 20, Beschermende uitrusting en zichtbaarheid 20, Passagier, bagage en groepsrijden 16, Verantwoord rijden 12, Wetgeving A1/A2/A 12, Voertuigkennis 12), four 50-question tests (IDs 45301-45304, 7/6/6/8/5/5/4/3/3/3 per test, no spares) and five Dutch-named topic sets 45301-45305 (44/36/52/44/24), 9 dashboard steps, state `NLMOTO`, prefix `NLMOT-`, 82% pass (41 of 50, as the real exam: 50 scored plus 2 unscored, 30 minutes, in Dutch or with an interpreter; CBR publishes no subject weights, so ours are Tigertest's). Rider's view: front brake and ABS, countersteering, bends and slippery surfaces, the Motorplatform filtering code (10 km/u, leftmost lanes, never the hard shoulder) as a code not law, helmet for rider and passenger (art. 60 RVV 1990), RDW limits A1 125 cc/11 kW/0,1 kW/kg and A2 35 kW/0,2 kW/kg not derived from more than double, 90 km/u with a trailer (art. 22), no APK for motorcycles; no fees or fines; code 80 not asked; photos and other question types not modelled; signs described in words. Built by `tools/next100/nlmoto/build.py`; sources in `tools/next100/nlmoto/sources.md`, terms in `glossary.md`. Region NL, hub group "EU driving theory tests" (after nlbrom), `[data-theme="nlmoto"]` burnt orange, borrows the motorcycle tiger.
```

## Decisions for the integrator

1. **Language.** CBR offers the English theory exam for the car only; for the motorcycle another
   language means an interpreter. So the base is Dutch, not English via setrafik.
2. **Hue.** Queue hue `8 70% 28%` clashes (fimoto, sgftt, casfa, barber); the only free spot near
   it is `19 100% 22%`. Check it against nltheorie's final hue.
3. **Dashboard.** 5 sets + 4 tests = 9 steps (same shape as nlbrom). Set 3 is 52, the largest.
4. **Facts with one source.** "A B licence does not cover a 125 cc motorcycle" rests on the
   Rijksoverheid line "Rijden op een motor mag alleen wanneer de bestuurder een motorrijbewijs
   heeft"; "a motorcycle carries one number plate, at the rear" and "a motorcycle may not be
   parked on the pavement like a moped" are standard Dutch rules not re-read in the source text
   (NLMOT-WET-011, NLMOT-GBR-019). The C6-style sign "closed to motor vehicles except two-wheeled
   motorcycles" (NLMOT-TKN-002) is from the RVV sign list as commonly described; Bijlage 1 itself
   did not load in full.
