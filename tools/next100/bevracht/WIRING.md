# Wiring for `bevracht` (Belgium truck licence C/CE theory and driver CPC, vakbekwaamheid, written in Dutch, v1)

Native-language exam (base bank and copy in Dutch, `language: "nl"`, Belgian usage, locale
`nl-BE`), built from the `detheorie` template. Files already written by the builder:
- `data/be-vrachtwagen-c-questions.json` (200, validator PASS with `--lang nl`; `check_banks.py` PASS)
- `lib/banks/bevracht.ts`
- `app/theorie-vrachtwagen-c/*` (layout, redirect, dashboard, drill, stats; copied from `app/fuehrerschein-theorie/`)
- `lib/landings/bevracht.nl.json` (Dutch landing content, Dutch `facts.source` on vlaanderen.be)
- `app/nl/theorie-examen-vrachtwagen-c-oefenen/page.tsx` (three-line `TranslatedExamLanding`, lang `nl`, `samples related`)
- `tools/next100/bevracht/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/bevracht/build.py`. Everything below goes in shared files.

Format note (GOCA brochures Doc C-C1.NL.TH-PR and Doc C-C1.CAP.NL.TH-PR, 16.11.2022, and
vlaanderen.be, checked 2026-11-07, see `sources.md`): rijbewijs C/C1 alone is 50 multiple-choice
questions, max. 50 minutes, 41 of 50 to pass, from 17 years 9 months. The combined exam with
vakbekwaamheid (code 95) has three theory proeven: A) 100 questions (50 licence + 50
vakbekwaamheid), max. 100 minutes, 80 of 100, and 40 of 50 on one half exempts that half for
3 years; B) 8 case studies x 5 questions, max. 80 minutes, 32 of 40; C) oral, 10 questions, max.
60 minutes, 80 of 100. Each question has 2 or 3 options. Dutch, French or German; other languages
only with a sworn interpreter paid by the candidate (English is not offered as such).

Tigertest models four tests of 50, each like one half of proef A: about half licence theory and
half vakbekwaamheid (24/26, Tigertest's split; GOCA publishes no weights), four options with one
key, equal weight, `passPct: 80` (40 of 50, the per-half exemption line; C alone needs 41). Case
studies, the oral and the practical tests are not modelled; the landing says so. Training: 5 topic
sets (25801-25805, 48/48/48/24/32, all at most 60) + 4 tests = 9 dashboard steps.

## lib/exams.ts

Add `"bevracht"` to the `ExamId` union. Icon `truck` exists. idBase 25800 per the brief's row
(25801-25805 free when checked; siblings betoelating 25600, bemoto 25700).

```ts
const bevracht: ExamConfig = {
  id: "bevracht",
  stateCode: "BEVRACHT",
  idBase: 25800,
  slug: "/theorie-vrachtwagen-c",
  landingPath: "/nl/theorie-examen-vrachtwagen-c-oefenen",
  name: "Theorie-examen vrachtwagen C en vakbekwaamheid",
  shortName: "Theorie vrachtwagen C",
  examLabel: "Theorie-examen rijbewijs C",
  fullName: "Theorie-examen rijbewijs C/CE en vakbekwaamheid (code 95)",
  questionIdPrefix: "BEVRC-",
  icon: "truck",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  language: "nl",
  locale: "nl-BE",
  english: {
    name: "Belgium Truck Licence Theory Test (C/CE and CPC)",
    shortName: "Belgian truck theory test",
    fullName: "Belgium truck licence C/CE theory exam and driver CPC (vakbekwaamheid, code 95), in Dutch",
  },
  review: { nl: "model" },
  // Real exam (GOCA Doc C-C1.NL.TH-PR and C-C1.CAP.NL.TH-PR, 16.11.2022; vlaanderen.be, checked
  // 2026-11-07): C/C1 alone 50 MCQ in max. 50 min, 41/50, from 17 y 9 m. With vakbekwaamheid:
  // proef A 100 MCQ (50 licence + 50 CPC) in max. 100 min, 80/100, 40/50 on one half exempts it
  // for 3 years; proef B 8 case studies x 5 (32/40); proef C oral 10 questions (80/100). 2 or 3
  // options per question; Dutch, French or German, others with a sworn interpreter.
  // Four tests of 50 like one half of proef A: licence 8/4/6/6 + vakbekwaamheid 7/5/6/5/3
  // (Tigertest's split, no published weights). Pools exactly 4x each count (200, all original,
  // written in Dutch). passPct 80 = 40 of 50.
  blueprint: {
    bevrVerkeer: 8,
    bevrRijbewijs: 4,
    bevrTechniek: 6,
    bevrRemmen: 6,
    bevrRijtijden: 7,
    bevrTachograaf: 5,
    bevrLading: 6,
    bevrVeiligheid: 5,
    bevrMilieu: 3,
  },
  // Five topic sets, not testSets(): 5 + 4 tests = 9 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 25801, name: "Verkeersregels en rijbewijs", categories: ["bevrVerkeer", "bevrRijbewijs"], size: 48, weightLabel: "12 van 50 vragen per test" },
    { setNumber: 2, id: 25802, name: "Voertuigtechniek en remmen", categories: ["bevrTechniek", "bevrRemmen"], size: 48, weightLabel: "12 van 50 vragen per test" },
    { setNumber: 3, id: 25803, name: "Rij- en rusttijden en tachograaf", categories: ["bevrRijtijden", "bevrTachograaf"], size: 48, weightLabel: "12 van 50 vragen per test" },
    { setNumber: 4, id: 25804, name: "Lading, gewichten en afmetingen", categories: ["bevrLading"], size: 24, weightLabel: "6 van 50 vragen per test" },
    { setNumber: 5, id: 25805, name: "Veiligheid, milieu en documenten", categories: ["bevrVeiligheid", "bevrMilieu"], size: 32, weightLabel: "8 van 50 vragen per test" },
  ],
  categoryLabels: {
    bevrVerkeer: "Verkeersregels voor vrachtwagens",
    bevrRijbewijs: "Rijbewijs, documenten en alcohol",
    bevrTechniek: "Voertuigtechniek en koppelen",
    bevrRemmen: "Remmen en vertragers",
    bevrRijtijden: "Rij- en rusttijden",
    bevrTachograaf: "Tachograaf",
    bevrLading: "Lading, gewichten en afmetingen",
    bevrVeiligheid: "Veiligheid, gezondheid en noodsituaties",
    bevrMilieu: "Zuinig rijden, documenten en transportmarkt",
  },
  copy: {
    guestPrompt: "om je voortgang voor het theorie-examen vrachtwagen te bewaren en elke foute vraag bij te houden",
    trainingHeading: "Oefensets",
    trainingSub: "Elke oefenset behandelt een deel van de leerstof voor rijbewijs C en vakbekwaamheid. Je krijgt meteen feedback, en foute vragen komen terug tot je ze kent.",
    testsHeading: "Testen · 50 vragen, 40 juist om te slagen",
    heroSubs: [
      "Vijf oefensets, vier testen. Rij- en rusttijden en verkeersregels komen het vaakst terug.",
      "Eerst een oefenset beheersen, dan een test.",
      "Halverwege. Doe een test.",
      "Fouten herhalen, dan opnieuw testen.",
      "Alles groen. Plan je theorie-examen.",
    ],
    sourceLine: "Volgens de Wegcode en de Europese regels voor rij- en rusttijden en de tachograaf, stand november 2026. Eigen vragen, niet uit de officiële vragenbank; 4 antwoorden per vraag, zonder case study's of mondeling.",
    analyticsKey: "bevracht",
  },
};
```

Append `bevracht` to the `EXAMS` array with the driving tests (after `bemoto`, or after
`bedriving` if bemoto is not in yet). `ExamDashboard` shows topic sets first, then the tests.

## lib/banks/all.ts

```ts
import "./bevracht";
```

## types/index.ts

- `QuestionType`: add `| "BEVRACHT"`.
- `QuestionCategory`, under a `// Belgium truck licence C/CE theory and vakbekwaamheid` comment
  (prefix `bevr` grepped: no clash with `bedrv*`, `bemoto*`, `betoel*`):

```ts
  | "bevrVerkeer"
  | "bevrRijbewijs"
  | "bevrTechniek"
  | "bevrRemmen"
  | "bevrRijtijden"
  | "bevrTachograaf"
  | "bevrLading"
  | "bevrVeiligheid"
  | "bevrMilieu"
```

## i18n

Results and stats read `exam.categoryLabels` first (platform phase 0), so `i18n/nl.ts` needs
nothing. For English surfaces (admin, `i18n/en.ts`, the other dictionaries fall back to English):

```ts
    bevrVerkeer: "Traffic Rules for Trucks",
    bevrRijbewijs: "Licence, Documents & Alcohol",
    bevrTechniek: "Vehicle Technology & Coupling",
    bevrRemmen: "Brakes & Retarders",
    bevrRijtijden: "Driving & Rest Times",
    bevrTachograaf: "Tachograph",
    bevrLading: "Load, Weights & Dimensions",
    bevrVeiligheid: "Safety, Health & Emergencies",
    bevrMilieu: "Eco-driving, Documents & Market",
```

## lib/shuffleOptions.ts

No position-dependent options ("A en B", "Beide", "Alle bovenstaande"); the build asserts it.
All-number options are sorted ascending by the build; the app's shuffle of a v1 exam keeps that
as the platform does for the other banks (nothing extra).

## app/globals.css

The brief's `215 50% 22%` clashes (within 8 degrees, under 15 points of saturation and 8 of
lightness) with `phlto` (212 40% 26%), `punjabpolice` (215 40% 18%) and `aesira` (220 55% 22%).
Suggested instead: deep road-haulage navy `214 90% 22%` (clear of every light block when checked;
`hkiiqe1` 215 70% 22% is 20 points of saturation away, sibling `bemoto` 21 and the 202 100% 28%
sibling are more than 8 degrees away). White text far above 4.5:1. Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Belgium truck licence C/CE theory and vakbekwaamheid theme */
  [data-theme="bevracht"] {
    --brand: 214 90% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 214 60% 96%;
    --brand-hover: 214 90% 17%;
    --brand-dark: 214 90% 15%;
    --brand-darker: 214 90% 10%;
    --brand-muted: 214 40% 65%;
    --brand-border: 214 45% 78%;
    --brand-border-light: 214 45% 88%;
    --brand-gradient-to: 214 70% 92%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `bevracht: "Four 50-question tests in Dutch for the Belgian truck licence C/CE theory exam and the driver CPC (vakbekwaamheid, code 95): EU driving and rest times, tachograph, load securing, weights and dimensions, air brakes and retarders, coupling and truck rules of the Belgian Highway Code, as of November 2026.",`
- `EXAM_ORG`: `bevracht: "Approved exam centres (GOCA) in Flanders, Wallonia and Brussels · C/C1 theory and vakbekwaamheid, in Dutch",`
- Hub group: a licence category, so the driving group, right after `bedriving` and `bemoto`:
  `{ title: "EU driving theory tests", ids: ["detheorie", "esdgt", "ptimt", "bedriving", "bemoto", "bevracht", "dkteori", "setrafik", "fitheory", "grdriving", "rodrpciv", "hukresz", "mttheory"] },`
  (keep whatever other siblings are already in the list, e.g. `dkmoto`).
  `RELATED_OVERRIDES`: `bevracht: ["bedriving", "iedttcv", "uklgv", "cdl"],`
- `SEARCH_ALIASES` (native and English):
  `bevracht: "theorie vrachtwagen theorie-examen vrachtwagen theorie examen rijbewijs c rijbewijs ce rijbewijs c1 vrachtwagenrijbewijs vrachtwagenchauffeur camionneur camion permis c théorie permis poids lourd vakbekwaamheid code 95 basiskwalificatie cap aptitude professionnelle rij- en rusttijden rijtijden tachograaf goca autoveiligheid vdab belgium truck licence theory belgian truck driving test hgv theory belgium lorry licence belgium cpc driver cpc belgium c licence belgium vlaanderen brussel wallonie antwerpen gent",`
- Native name on Dutch surfaces, `english.name` elsewhere (the platform's `TestCatalogEntry` language field).

## lib/region.ts

`TEST_REGIONS`: `bevracht: "BE",` (region BE already exists from `bedriving`; no homepage
change needed, though `REGION_HOME.BE` / `faqsFor("BE")` may add a line: "Ook voor
vrachtwagenchauffeurs: theorie rijbewijs C en vakbekwaamheid, in het Nederlands."). A driving
test, so NOT in `NON_DRIVING_TESTS`.

## lib/landingContent.ts

```ts
import bevrachtNl from "@/lib/landings/bevracht.nl.json";
  "bevracht.nl": bevrachtNl as TranslatedLandingContent,
```

## app/nl/layout.tsx

Needed if not already made (copy of `app/de/layout.tsx` with `lang="nl"`; sibling `betoelating`
needs it too). The landing is `app/nl/theorie-examen-vrachtwagen-c-oefenen/page.tsx`.

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  bevracht: {
    answer:
      "In Belgium the theory exam for a truck licence is taken on a computer at an approved exam centre (GOCA members such as Autoveiligheid and Autosécurité). For category C or C1 alone it is 50 multiple-choice questions in at most 50 minutes, and you pass with at least 41 correct; you can sit it from 17 years and 9 months. A professional driver also needs the certificate of professional competence (vakbekwaamheid, code 95): the combined theory exam is 100 questions in at most 100 minutes, 50 on the licence and 50 on professional competence, with at least 80 of 100 to pass, and 40 of 50 on one half exempts that half for three years. It is followed by a case-study test (8 case studies of 5 questions, 32 of 40) and an oral test of 10 questions (80 of 100). Each question has 2 or 3 options. The exam is in Dutch, French or German; for another language a sworn interpreter appointed by the centre can be booked at the candidate's cost.",
    rows: [
      { label: "Run by", value: "Approved exam centres (GOCA) in Flanders, Wallonia and Brussels" },
      { label: "C or C1 alone", value: "50 questions, max. 50 minutes, 41 to pass" },
      { label: "With professional competence (code 95)", value: "100 questions (50 + 50), max. 100 minutes, 80 to pass" },
      { label: "Case studies", value: "8 x 5 questions, max. 80 minutes, 32 of 40" },
      { label: "Oral test", value: "10 questions, max. 60 minutes, 80 of 100" },
      { label: "Answer options", value: "2 or 3 per question" },
      { label: "Languages", value: "Dutch, French, German (interpreter for others)" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Dutch, 40 to pass" },
    ],
    basedOn: "GOCA brochures for categories C/C1 and C/C1 with professional competence (16.11.2022), Vlaanderen.be's C and D licence page, the Belgian Highway Code and EU Regulations 561/2006 and 165/2014, checked November 2026",
    source: { name: "Vlaanderen.be: truck and bus licence step by step (in Dutch)", url: "https://www.vlaanderen.be/rijbewijs-c-en-d-stap-voor-stap" },
  },
```

## lib/shareCardCopy.ts

`bevracht: { title: "Belgium Truck Theory Test", description: "Practise EU driving and rest times, the tachograph, load securing and truck rules for the Belgian C/CE theory exam and code 95, in Dutch." },`

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## lib/tigerAssets.ts

`BORROWED_SETS`: `bevracht: "cdl",` (the CDL tiger, like `uklgv` and `iedttcv`).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: licence tests are not in `TEACHER_LED` (driving schools set C/CE theory, but the
driving tests are kept out of the list; add it with `bedriving` if that policy changes).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the `/nl/...` landing is emitted once with hreflang `nl-BE` and
x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 24 to 48, so no parts.

## Question quality hooks

Run `python3 -I tools/build_exam_sources.py` (the first three https URLs of `sources.md` are the
two GOCA PDFs and vlaanderen.be). A dated freshness event worth adding to `lib/examFreshness.json`:
the 1975 Wegcode ceases on 1 June 2027 (art. 87), replaced by federal and regional codes; re-check
the speed, distance and parking items then.

## Screenshots

`TranslatedExamLanding` reads `/landing/bevracht-{mobile,desktop}-nl.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing bevracht:theorie-vrachtwagen-c:25801`
then rename to the `-nl` names (as for detheorie).

## CLAUDE.md (after the Belgium motorcycle bullet, or after Belgium Driving Theory)

```md
- **Theorie vrachtwagen C** (`bevracht`, Belgium truck licence C/CE theory exam and driver CPC (vakbekwaamheid, code 95), native-language exam in Dutch, `language: "nl"`, `locale: "nl-BE"`, `review: { nl: "model" }`, `/theorie-vrachtwagen-c/*`, landing `/nl/theorie-examen-vrachtwagen-c-oefenen` from `lib/landings/bevracht.nl.json`): `data/be-vrachtwagen-c-questions.json` (200 original questions written directly in Dutch, in "u", on the GOCA leerstof for C/C1 and vakbekwaamheid: truck traffic rules 32 (Wegcode art. 11.2 90 km/u on motorways above 3,5 t, 11.3 60 km/u outside built-up areas above 7,5 t, 17.2 no overtaking in rain above 7,5 t, 18.2 50 m gap, 21.3, 27.5.2 eight-hour parking, 48bis, 51, signs C21 to C39), licence, documents and alcohol 16, vehicle technology and coupling 24, brakes and retarders 24, driving and rest times 28 (Reg. 561/2006 as amended 2020, Directive 2002/15), tachograph 20 (Reg. 165/2014, 56 days, 28/90-day downloads), load, weights and dimensions 24 (art. 45 to 47, Directive 96/53, EN 12195-1), safety, health and emergencies 20, eco-driving, CMR and market 12), test IDs 25801-25804 (50 each, like one half of the real proef A: licence 8/4/6/6, vakbekwaamheid 7/5/6/5/3, Tigertest's split), five topic sets 25801-25805 (48/48/48/24/32), 9 dashboard steps, state `BEVRACHT`, prefix `BEVRC-`, 80% pass (40 of 50, the real per-half exemption line; GOCA: C alone 50 questions in 50 min, 41/50; combined 100 in 100 min, 80/100; then 8 case studies x 5 (32/40) and an oral of 10 questions, none modelled; 2 or 3 options a question, ours 4; Dutch, French or German, others with a sworn interpreter). No fines, fees, axle-load or gross-mass figures; the official question bank is not public and never used. English names in `english`. Built by `tools/next100/bevracht/build.py` (sorts all-number options with Dutch decimal commas); sources in `tools/next100/bevracht/sources.md`, terms in `glossary.md`. Region BE, hub group "EU driving theory tests" (after bedriving and bemoto), `[data-theme="bevracht"]` deep navy (214 90% 22%), borrows the CDL tiger.
```

## Decisions for the integrator

1. **Pass mark.** 80 (40 of 50), the per-half exemption line of the combined exam and its 80/100
   rate. The C-alone exam needs 41 of 50 (82%); the landing states both.
2. **Options.** The real exam has 2 or 3 options per question; the bank has 4 (validator shape).
   Said on the landing FAQ "Wat oefent Tigertest niet?" and in `sourceLine`.
3. **Hue.** `214 90% 22%`, since the brief's `215 50% 22%` clashes (see above).
4. **English.** Not offered as an exam language (GOCA: Dutch, French, German, interpreter
   otherwise), so the exam is native Dutch only; a French version (`translations.fr`) would serve
   Wallonia and Brussels later. A bus D sibling could reuse the RYT and TAC sources.
5. **Regional differences.** The GOCA brochures read are the Brussels editions; vlaanderen.be
   confirms the same counts and pass marks for Flanders. Wallonia was not separately confirmed.
