# Wiring for `nlbrom` (Netherlands moped theory exam, CBR theorie-examen bromfiets, rijbewijs AM, written in Dutch, v1)

Native-language exam built on the `detheorie` template: base bank and base copy are Dutch
(`language: "nl"`, Netherlands usage). Files already written by the builder:
- `data/nl-bromfiets-questions.json` (200, validator PASS with `--lang nl`, key-longest 4%)
- `lib/banks/nlbrom.ts`
- `app/bromfiets-theorie/*` (layout, redirect, dashboard, drill, stats; copied from `app/fuehrerschein-theorie/`)
- `lib/landings/nlbrom.nl.json` (Dutch landing content, Dutch `facts.source`)
- `app/nl/bromfiets-theorie-examen-oefenen/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `nl`, `samples related`)
- `tools/next100/nlbrom/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/nlbrom/build.py`. Validate with:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/nl-bromfiets-questions.json --lang nl --pool nlbrGebruik=32 --pool nlbrVoorrang=32 --pool nlbrBijzonder=28 --pool nlbrVeilig=28 --pool nlbrTekens=32 --pool nlbrVerantwoord=20 --pool nlbrWet=16 --pool nlbrVoertuig=12`
A standard 200-question bank, so no `KNOWN_BANKS` entry. Everything below goes in shared files.

Format note: the real exam (CBR, checked 2026-11-22) is 2 practice questions, then 50 exam
questions plus 2 unscored test questions, 43 of 50 to pass (86%), 30 minutes (45 with extra time
or individually guided), result straight away; in Dutch, other languages only with an approved
interpreter; theory from 15.5, practical exam from 16. Eight subjects (the same eight as the car
exam plan) with no published weights. Tigertest models four 50-question tests at the same 86% line
(43 of 50), pools exactly 4x each per-test count (200, every item in exactly one test). Per-test
weights 8/8/7/7/8/5/4/3 are Tigertest's (K+ subjects above the K subjects). Training: 5 topic sets
(45201-45205, 60/32/32/48/28) plus the 4 tests = 9 dashboard steps.

## lib/exams.ts

Add `"nlbrom"` to the `ExamId` union. Icon `bike` already exists (the motorcycle exams use it).
45201-45205 (sets) and 45201-45204 (tests) must be free: on 2026-11-22 nothing in `lib/exams.ts`
used 45200-45299 (grepped; nltheorie has 45000, the other Netherlands builders have their own
blocks).

```ts
const nlbrom: ExamConfig = {
  id: "nlbrom",
  stateCode: "NLBROM",
  idBase: 45200,
  slug: "/bromfiets-theorie",
  landingPath: "/nl/bromfiets-theorie-examen-oefenen",
  name: "Bromfiets theorie-examen",
  shortName: "Bromfiets theorie",
  examLabel: "Theorie-examen bromfiets",
  fullName: "CBR theorie-examen bromfiets (rijbewijs AM)",
  questionIdPrefix: "NLBRM-",
  icon: "bike",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 86,
  language: "nl",
  locale: "nl-NL",
  english: {
    name: "Netherlands Moped Theory Test (CBR, category AM)",
    shortName: "Dutch moped theory test",
    fullName: "CBR moped theory exam for a Dutch category AM licence (bromfiets, snorfiets, brommobiel), in Dutch",
  },
  review: { nl: "model" },
  // Real exam (CBR "Hoe gaat het theorie-examen bromfiets?" and "Theorie-examenplan bromfiets",
  // checked 2026-11-22): 50 exam questions plus 2 unscored test questions after 2 practice
  // questions, 43 of 50 to pass, 30 minutes (45 with extra time or individually guided), in
  // Dutch or with an approved interpreter; theory from 15.5. Eight subjects with no published
  // weights (1 Gebruik van de weg, 2 Voorrang en voor laten gaan, 3 Bijzondere wegen,
  // weggedeelten, weggebruikers en manoeuvres, 4 Veilig rijden en noodsituaties,
  // 5 Verkeerstekens en aanwijzingen, 6 Verantwoorde verkeersdeelname en milieubewust rijden,
  // 7 Wetgeving, 8 Voertuigkennis). The 8/8/7/7/8/5/4/3 split is Tigertest's. Rules: RVV 1990
  // (version 1 July 2026), Wegenverkeerswet 1994, Rijksoverheid moped pages. Four tests of 50,
  // pools exactly 4x each count (200, all original, written in Dutch; signs described in words;
  // photos and other question types not modelled). passPct 86 = 43/50, as the real exam.
  blueprint: {
    nlbrGebruik: 8,
    nlbrVoorrang: 8,
    nlbrBijzonder: 7,
    nlbrVeilig: 7,
    nlbrTekens: 8,
    nlbrVerantwoord: 5,
    nlbrWet: 4,
    nlbrVoertuig: 3,
  },
  // Five topic sets, not testSets(): 5 + 4 tests = 9 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 45201, name: "Gebruik van de weg en bijzondere wegen", categories: ["nlbrGebruik", "nlbrBijzonder"], size: 60, weightLabel: "15 van 50 vragen per proefexamen" },
    { setNumber: 2, id: 45202, name: "Voorrang en voor laten gaan", categories: ["nlbrVoorrang"], size: 32, weightLabel: "8 van 50 vragen per proefexamen" },
    { setNumber: 3, id: 45203, name: "Verkeerstekens en aanwijzingen", categories: ["nlbrTekens"], size: 32, weightLabel: "8 van 50 vragen per proefexamen" },
    { setNumber: 4, id: 45204, name: "Veilig en verantwoord rijden", categories: ["nlbrVeilig", "nlbrVerantwoord"], size: 48, weightLabel: "12 van 50 vragen per proefexamen" },
    { setNumber: 5, id: 45205, name: "Wetgeving en voertuigkennis", categories: ["nlbrWet", "nlbrVoertuig"], size: 28, weightLabel: "7 van 50 vragen per proefexamen" },
  ],
  categoryLabels: {
    nlbrGebruik: "Gebruik van de weg",
    nlbrVoorrang: "Voorrang en voor laten gaan",
    nlbrBijzonder: "Bijzondere wegen, weggebruikers en manoeuvres",
    nlbrVeilig: "Veilig rijden en noodsituaties",
    nlbrTekens: "Verkeerstekens en aanwijzingen",
    nlbrVerantwoord: "Verantwoord en milieubewust rijden",
    nlbrWet: "Wetgeving",
    nlbrVoertuig: "Voertuigkennis",
  },
  copy: {
    guestPrompt: "om je voortgang voor het theorie-examen bromfiets te bewaren en elke fout bij te houden",
    trainingHeading: "Oefensets",
    trainingSub: "Elke oefenset behandelt onderwerpen uit het examenplan van het CBR. Je krijgt meteen uitleg, en vragen die je fout had, komen terug tot je ze kent.",
    testsHeading: "Proefexamens · 50 vragen, 43 goed om te slagen",
    heroSubs: [
      "Vijf oefensets, vier proefexamens. Voorrang, verkeerstekens en gebruik van de weg komen het vaakst voor.",
      "Eerst de oefenset beheersen, dan het proefexamen.",
      "De helft is gedaan. Maak een proefexamen van 50 vragen.",
      "Herhaal je fouten en test jezelf opnieuw.",
      "Alles groen. Plan je theorie-examen bij het CBR.",
    ],
    sourceLine: "Volgens het RVV 1990 en de regels van de Rijksoverheid, stand november 2026. Eigen vragen, niet uit het CBR-examen; 50 per proefexamen, 43 goed om te slagen zoals bij het echte examen.",
    analyticsKey: "nlbrom",
  },
};
```

Append `nlbrom` to the `EXAMS` array with the other EU driving tests (after `nltheorie`).
No `translations`. Set names are Dutch topic names, so `TEST_SET_NAMES.nl` is not used.

## lib/banks/all.ts

```ts
import "./nlbrom";
```

## types/index.ts

- `QuestionType`: add `| "NLBROM"`.
- `QuestionCategory`, under a `// Netherlands moped theory exam (nlbrom)` comment (prefix `nlbr`;
  grepped, no existing key starts with it):

```ts
  | "nlbrGebruik"
  | "nlbrVoorrang"
  | "nlbrBijzonder"
  | "nlbrVeilig"
  | "nlbrTekens"
  | "nlbrVerantwoord"
  | "nlbrWet"
  | "nlbrVoertuig"
```

## i18n

If `ResultsHeroDebrief` and `/stats` already prefer `exam.categoryLabels`, nothing is needed.
Otherwise add the Dutch labels above to `i18n/nl.ts`, and to `i18n/en.ts` (others fall back to
English):

```ts
    nlbrGebruik: "Use of the Road",
    nlbrVoorrang: "Priority & Giving Way",
    nlbrBijzonder: "Special Roads, Road Users & Manoeuvres",
    nlbrVeilig: "Safe Riding & Emergencies",
    nlbrTekens: "Signs & Directions",
    nlbrVerantwoord: "Responsible & Eco Riding",
    nlbrWet: "Licence & Law",
    nlbrVoertuig: "Vehicle Knowledge",
```

## lib/shuffleOptions.ts

Nothing. No option uses "A en B", "Beide" or "Alle antwoorden" (the build asserts the letter
forms). All-number options (km/u, m, jaar, promille with a decimal comma) are sorted in the build.

## lib/urlLanguage.ts and app/nl/layout.tsx

Already there (`/nl` prefix, `lang="nl"`, from the Belgian Dutch pages). Nothing extra.

## app/globals.css

The suggested `190 80% 30%` clashes with ccma (188 70 32.8), lifeguard (190 75 33), crcst
(195 85 34.3), nclexpn (185 70 32), kentsa (182 90 26) and rorezid (194 75 24). I scanned hues
160 to 230, saturation 20 to 100 (step 5), lightness 14 to 44 against all 499 light themes:
nothing at 15% lightness or above is free with white text at 4.5:1, so teal only works as a
near-black `185 80% 14%`. Clear elsewhere (also against the pending WIRING hues at 290 to 305):
`305 75% 44%`, a bright magenta (white text 5.0:1), which reads well for a teen scooter test and
sits apart from nltheorie's orange `19 100% 22%`. Proposed `305 75% 44%`; integrator's call.

```css
  /* Netherlands moped theory exam (rijbewijs AM) theme */
  [data-theme="nlbrom"] {
    --brand: 305 75% 44%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 305 70% 96%;
    --brand-hover: 305 75% 38%;
    --brand-dark: 305 75% 32%;
    --brand-darker: 305 75% 22%;
    --brand-muted: 305 40% 70%;
    --brand-border: 305 45% 82%;
    --brand-border-light: 305 50% 91%;
    --brand-gradient-to: 25 95% 93%;
  }
```

Then run `tools/gen_dark_brand_css.py` once for everyone.

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `nlbrom: "Four 50-question mock tests in Dutch for the CBR moped theory exam (theorie-examen bromfiets) for a Dutch AM licence: where a bromfiets, snorfiets and brommobiel ride and how fast, priority on cycle paths and at junctions, signs, helmets, insurance and the novice alcohol limit, at the real 43/50 pass mark.",`
- `EXAM_ORG`: `nlbrom: "CBR · theory exam moped (theorie-examen bromfiets), category AM, in Dutch",`
- Hub group: a licence category, so it joins the Netherlands driving group with `nltheorie`:
  add `"nlbrom"` to the `"EU driving theory tests"` group after `"nltheorie"` (nltheorie's WIRING
  puts it after `"bevracht"`). Not in a non-driving group.
- `RELATED_OVERRIDES`: `nlbrom: ["nltheorie", "bemoto", "demotorrad"],` (swap in `nlmoto` once it ships;
  drop ids not wired).
- `SEARCH_ALIASES` (Dutch and English):
  `nlbrom: "bromfiets theorie-examen bromfiets theorie examen brommer theorie brommer theorie-examen scooter theorie scooter theorie-examen snorfiets theorie theorie-examen bromfiets oefenen brommerrijbewijs bromfietsrijbewijs rijbewijs am theorie am rijbewijs am4 brommobiel cbr bromfiets examen theorie brommer oefenen speed pedelec helmplicht fiets/bromfietspad dutch moped theory test netherlands moped test moped licence netherlands am licence netherlands scooter licence netherlands holland scooter test",`
- Native name on the Netherlands homepage, `english.name` elsewhere (LANGUAGES.md 1.6).

## lib/region.ts

```ts
  nlbrom: "NL",
```

in `TEST_REGIONS`. Region NL is new in this wave (nltheorie's WIRING adds it: `lang: "nl"`,
`locale: "nl-NL"`, homepage `/nl`). A licence test, so NOT in `NON_DRIVING_TESTS`. Optional
`faqsFor("NL")` entry (Dutch, if REGION_HOME.NL is Dutch):

```ts
  { q: "Kan ik oefenen voor het theorie-examen bromfiets?", a: "Ja. Tigertest heeft vier gratis proefexamens van 50 vragen in het Nederlands voor het CBR theorie-examen bromfiets (rijbewijs AM), over voorrang, verkeerstekens, waar je rijdt met brommer, snorfiets en brommobiel, en de regels voor helm, verzekering en beginners. Net als bij het echte examen heb je 43 van de 50 goed nodig." },
```

If REGION_HOME.NL's `testsSub` lists the tests, add a clause such as "en het theorie-examen
bromfiets (rijbewijs AM), in het Nederlands".

## lib/landingContent.ts

```ts
import nlbromNl from "@/lib/landings/nlbrom.nl.json";
  "nlbrom.nl": nlbromNl as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  nlbrom: {
    answer:
      "The moped theory exam (theorie-examen bromfiets) for a Dutch AM licence is run by the CBR (Centraal Bureau Rijvaardigheidsbewijzen) on a computer at its exam centres. After 2 practice questions you answer 50 exam questions plus 2 test questions that do not count, and you need at least 43 of the 50 right. You have 30 minutes, or 45 with extra time or in an individually guided exam, and you get the result straight away. The exam covers eight subjects, from use of the road and priority to special roads, safe riding, signs, responsible riding, traffic law and vehicle knowledge, with several question types, many on a picture. It is taken in Dutch; for another language you book an exam with an approved interpreter. You can sit it from 15.5; lessons and the practical exam start at 16. The AM licence covers a bromfiets (45 km/h), a snorfiets (25 km/h), a speed pedelec and a brommobiel.",
    rows: [
      { label: "Run by", value: "CBR (Centraal Bureau Rijvaardigheidsbewijzen)" },
      { label: "Questions", value: "50 scored, plus 2 unscored test questions" },
      { label: "Pass mark", value: "43 of 50 (86%)" },
      { label: "Time", value: "30 minutes (45 with extra time)" },
      { label: "Language", value: "Dutch; other languages with an approved interpreter" },
      { label: "Minimum age", value: "15.5 for theory, 16 for the practical exam" },
      { label: "Subjects", value: "8, from road use and priority to vehicle knowledge" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Dutch, 43 to pass" },
    ],
    basedOn: "CBR's moped theory exam pages and theorie-examenplan bromfiets, Rijksoverheid's moped and AM licence pages and the Dutch traffic rules (RVV 1990), checked November 2026",
    source: { name: "CBR: Hoe gaat het theorie-examen bromfiets?", url: "https://www.cbr.nl/nl/rijbewijs-halen/bromfiets/theorie-examen-bromfiets/hoe-gaat-het-theorie-examen-bromfiets" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Dutch)"; nothing exam-specific.

## lib/seoDates.ts and lib/landingDates.json

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave, and run
`npx tsx scripts/build-landing-dates.ts`.

## lib/tigerAssets.ts

Add to `BORROWED_SETS` with the other moped and motorcycle tests: `nlbrom: "moto",` (next to the
Netherlands line nltheorie adds, or a new `// Netherlands (Nov 2026)` comment).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving and licence tests are not in `TEACHER_LED`.

## lib/privacyRegion.ts

Nothing. Most candidates are 15 to 17, but this is a licence test, not a children's school test,
so it is not added to `CHILD_PATH_PREFIXES` (same as every other driving test).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the native `landingPath` under `/nl` is emitted once, with
hreflang `nl-NL` and x-default to itself). Class questions import `lib/banks/all`. No redirects.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `bike` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 28 to 60 (all at most 60),
so no parts.

## Screenshots

`TranslatedExamLanding` reads the base-language names the platform uses for detheorie:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nlbrom:bromfiets-theorie:45201`
then rename to the `-nl` names if the component still expects them for a base-language landing.

## docs/exams/nlbrom.md (new file)

```md
# nlbrom: Netherlands Moped Theory Exam (CBR theorie-examen bromfiets, rijbewijs AM)

- **What it is**: the CBR theory exam for a Dutch AM licence (bromfiets, scooter, snorfiets, speed pedelec, brommobiel). Native Dutch exam: base bank and copy in Dutch (`language: "nl"`, `locale: "nl-NL"`, `review: { nl: "model" }`), English names in `english`.
- **Official format** (CBR, checked 2026-11-22): 2 practice questions, then 50 exam questions plus 2 unscored test questions; 43 of 50 to pass (86%); 30 minutes (45 with extra time or individually guided); result straight away; Dutch, or another language with an approved interpreter; theory from 15.5, practical from 16. Eight subjects (same as the car exam plan), no published weights.
- **Tigertest model**: 200 text-only single-answer questions in Dutch ("je"), four 50-question tests at 86% (43/50), every item used once in tests. Per test: road use 8, priority 8, special roads and manoeuvres 7, safe riding and emergencies 7, signs 8, responsible and eco riding 5, law 4, vehicle 3. Pools 32/32/28/28/32/20/16/12.
- **IDs**: idBase 45200, tests 45201-45204, sets 45201-45205 (5 topic sets; 9 dashboard steps), state code `NLBROM`, prefix `NLBRM-`, segments GEB, VRR, BYZ, VEI, TKN, VER, WET, VTG, category keys `nlbr*`.
- **Routes**: app `/bromfiets-theorie/*`, landing `/nl/bromfiets-theorie-examen-oefenen` (`lib/landings/nlbrom.nl.json`, `TranslatedExamLanding`).
- **Sources and build**: `tools/next100/nlbrom/sources.md`, terms in `glossary.md`; `python3 -I tools/next100/nlbrom/build.py` (key rotated A-D by index; all-number options sorted with decimal commas). Validate with `--lang nl`.
- **Content**: RVV 1990 (1 July 2026 version): where a bromfiets, snorfiets, brommobiel and brombakfiets ride (art. 5, 6, 2a, 2b), moped speeds 30/40 on the fiets/bromfietspad and 45 on the carriageway, snorfiets 25 with engine off on the optional cycle path, no motorway or autoweg, overtaking on the left (only cyclists pass on the right), priority, signs G11/G12a/G12b/C13, helmet duty (snorfiets since 1 Jan 2023, brombakfiets exempt), children under 8, no passenger on a snorfiets carrier, phone ban; Wegenverkeerswet 0.5 / novice 0.2 per mille, 7-year novice period for AM at 16, second penalty point to a CBR investigation; Rijksoverheid yellow and blue plates, ECE 22.05/22.06 and NTA 8776 helmets, lights and reflectors.
- **Not modelled**: photos, yes/no, number entry, drag and hotspot formats; no fees, fines or penalty amounts; no city rules (Amsterdam and Utrecht snorfiets rules); no exam-admin questions. Kept clear of `nltheorie` (car, English) facts and answers and of `bedriving` (Belgian rules).
- **Theme**: `[data-theme="nlbrom"]` `305 75% 44%` (magenta; the suggested 190 80% 30% clashed with six teal themes), borrows the motorcycle tiger.
- **Region and hub**: region NL (homepage `/nl`), hub group "EU driving theory tests" after `nltheorie`. Not a children's test (GA rules unchanged).
```

## CLAUDE.md

None: per its own rule, a new exam gets a `docs/exams/<id>.md` file, never a paragraph in
CLAUDE.md. If the integrator keeps the older bullet list, the bullet in the house shape is:

```md
- **Bromfiets theorie-examen** (`nlbrom`, CBR moped theory exam for a Dutch AM licence, native Dutch exam, `language: "nl"`, `locale: "nl-NL"`, `review: { nl: "model" }`, `/bromfiets-theorie/*`, landing `/nl/bromfiets-theorie-examen-oefenen` from `lib/landings/nlbrom.nl.json`): `data/nl-bromfiets-questions.json` (200 original questions written directly in Dutch, in "je", on the eight CBR subjects: Gebruik van de weg 32, Voorrang en voor laten gaan 32, Bijzondere wegen, weggebruikers en manoeuvres 28, Veilig rijden en noodsituaties 28, Verkeerstekens en aanwijzingen 32, Verantwoord en milieubewust rijden 20, Wetgeving 16, Voertuigkennis 12), four 50-question tests (IDs 45201-45204, 8/8/7/7/8/5/4/3 per test, no spares) and five Dutch-named topic sets 45201-45205 (60/32/32/48/28), 9 dashboard steps, state `NLBROM`, prefix `NLBRM-`, 86% pass (43 of 50, as the real exam: 50 scored plus 2 unscored, 30 minutes, in Dutch or with an interpreter; CBR publishes no subject weights, so ours are Tigertest's). Rider's view of the RVV 1990: bromfiets 30/40 on the fiets/bromfietspad and 45 on the carriageway, snorfiets cycle rules and engine off on the optional cycle path, brommobiel car rules, helmet duty, 0.2 per mille for novices (7 years for AM at 16); no fees or fines; photos and other question types not modelled; signs described in words. Built by `tools/next100/nlbrom/build.py`; sources in `tools/next100/nlbrom/sources.md`, terms in `glossary.md`. Region NL, hub group "EU driving theory tests" (after nltheorie), `[data-theme="nlbrom"]` magenta, borrows the motorcycle tiger.
```

## Decisions for the integrator

1. **Hue.** Suggested teal clashes everywhere usable; proposed `305 75% 44%` magenta (5.0:1). The
   only clear teal is `185 80% 14%` (near black).
2. **Region NL and the `/nl` prefix.** `/nl` already hosts the Belgian Dutch pages; nltheorie's
   WIRING makes `/nl` the Netherlands homepage too. This landing sits under `/nl` like those.
3. **Language.** CBR lists no English moped exam, only an exam with an interpreter, so the copy
   says Dutch only. No English translation is planned.
4. **Register.** "je" throughout (CBR's own moped pages use "je"; candidates are 15 to 17).
5. **Article numbers** 16, 62 to 64, 63a and 63b were taken from the nltheorie builder's reading of
   the same RVV text (sources.md says so); the rest were read for this build.
