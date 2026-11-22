# Wiring for `nlwft` (Wft Basis, Dutch financial services competence exam, written in Dutch, v1)

A native-language exam: the base bank and base copy are Dutch (`language: "nl"`, `locale:
"nl-NL"`). Files already written by the builder:
- `data/nl-wft-basis-questions.json` (200, validator PASS with `--lang nl`)
- `lib/banks/nlwft.ts`
- `app/wft-basis/*` (layout, redirect, dashboard, drill, stats; copied from `app/fuehrerschein-theorie/`)
- `lib/landings/nlwft.nl.json` (Dutch landing content, with a Dutch `facts.source`)
- `app/nl/wft-basis-oefenexamen/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `nl`)
- `tools/next100/nlwft/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/nlwft/build.py`. Validate with:

```bash
python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/nl-wft-basis-questions.json --lang nl \
  --pool nlwftHuishouden=24 --pool nlwftBetalen=20 --pool nlwftKrediet=20 --pool nlwftRisico=28 \
  --pool nlwftVerzBegrip=16 --pool nlwftVerzRecht=20 --pool nlwftToezicht=32 --pool nlwftRekenen=12 \
  --pool nlwftPraktijk=16 --pool nlwftIntegriteit=12
```

Everything below goes in shared files.

Format note: the real exam (CDFD "Initieel examen Basis", kenmerken geldig vanaf 1 april 2026,
checked 2026-11-22) is 42 questions worth 63 points in 120 minutes: 21 KB (kennis en begrip,
1 point), 2 PG (professioneel gedrag, 2 points) and 19 VC (vaardigheden en competenties,
2 points); pass with 68% of the points (42,84 of 63); Dutch only; taken at a recognised exam
institute, result and diploma via DUO (Mijn Wft); content updated every 1 April. Tigertest
models four 50-question tests (200 items, pools exactly 4x each per-test count, every item in
exactly one test), single best answer of four, equal weight, at the real 68% line (34 of 50).
Point weighting, multiple select, dropdown, ordering and numeric-entry formats and long VC cases
with practice documents are not modelled; the landing says so. Categories are the eindtermen of
the module Basis; CDFD publishes counts per question type, not per eindterm, so the split is
Tigertest's. Dashboard: 5 Dutch-named topic sets (45401-45405) + 4 tests = 9 steps.

## lib/exams.ts

Add `"nlwft"` to the `ExamId` union. Icon `building` already exists. 45401-45405 are free
(sibling blocks this wave: nltheorie 45000, nlvca 45100, nlbrom 45200, nlmoto 45300).

```ts
const nlwft: ExamConfig = {
  id: "nlwft",
  stateCode: "NLWFT",
  idBase: 45400,
  slug: "/wft-basis",
  landingPath: "/nl/wft-basis-oefenexamen",
  name: "Wft Basis oefenexamen",
  shortName: "Wft Basis",
  examLabel: "Wft-examen Basis",
  fullName: "Wft Basis (vakbekwaamheidsexamen financiële dienstverlening, module Basis)",
  questionIdPrefix: "NLWFT-",
  icon: "building",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 68,
  language: "nl",
  locale: "nl-NL",
  english: {
    name: "Wft Basis Exam (Dutch financial services competence)",
    shortName: "Wft Basis exam",
    fullName: "Dutch Wft Basis exam (financial services competence, Basis module), in Dutch",
  },
  review: { nl: "model" },
  // Real exam (CDFD "Initieel examen Basis", kenmerken geldig vanaf 1 april 2026, and the
  // kandidatenbrochure initiële Wft-examens vs 2.1; checked 2026-11-22): 42 questions, 63 points,
  // 120 minutes: 21 KB (1 point), 2 PG (2 points), 19 VC (2 points); pass with 68% of points;
  // Dutch only; recognised exam institutes, result via DUO; omslagdatum 1 April. Categories are
  // the eindtermen of the CDFD "Eindtermen en toetstermen module Basis" (1 April 2026): 1a, 1b,
  // 1c, 1d, 1e, 1g, 1f, 2a/2b (rekenen), 2b-2d/3a-3d (praktijk), 4a (integriteit). CDFD publishes
  // no weights per eindterm, so the 6/5/5/7/4/5/8/3/4/3 split is Tigertest's. Four tests of 50,
  // pools exactly 4x each count (200, all original, written in Dutch). Single best answer of
  // four, equal weight; passPct 68 = the real line (34 of 50).
  blueprint: {
    nlwftHuishouden: 6,
    nlwftBetalen: 5,
    nlwftKrediet: 5,
    nlwftRisico: 7,
    nlwftVerzBegrip: 4,
    nlwftVerzRecht: 5,
    nlwftToezicht: 8,
    nlwftRekenen: 3,
    nlwftPraktijk: 4,
    nlwftIntegriteit: 3,
  },
  // Five topic sets in eindterm order, sets first then tests (like detheorie, befsmavz):
  // 5 + 4 = 9 dashboard steps. Every set at most 60, so no parts.
  trainingSets: [
    { setNumber: 1, id: 45401, name: "Financiële huishouding, betalen en sparen", categories: ["nlwftHuishouden", "nlwftBetalen"], size: 44, weightLabel: "11 van 50 vragen per oefenexamen" },
    { setNumber: 2, id: 45402, name: "Krediet, risico's en sociale zekerheid", categories: ["nlwftKrediet", "nlwftRisico"], size: 48, weightLabel: "12 van 50 vragen per oefenexamen" },
    { setNumber: 3, id: 45403, name: "Verzekeringsbegrippen en verzekeringsrecht", categories: ["nlwftVerzBegrip", "nlwftVerzRecht"], size: 36, weightLabel: "9 van 50 vragen per oefenexamen" },
    { setNumber: 4, id: 45404, name: "Ordening, toezicht en zorgplicht", categories: ["nlwftToezicht"], size: 32, weightLabel: "8 van 50 vragen per oefenexamen" },
    { setNumber: 5, id: 45405, name: "Rekenen, klantcontact en integriteit", categories: ["nlwftRekenen", "nlwftPraktijk", "nlwftIntegriteit"], size: 40, weightLabel: "10 van 50 vragen per oefenexamen" },
  ],
  categoryLabels: {
    nlwftHuishouden: "Financiële huishouding van de klant",
    nlwftBetalen: "Betalen, sparen en beleggen",
    nlwftKrediet: "Consumptief en hypothecair krediet",
    nlwftRisico: "Persoonlijke risico's, sociale zekerheid en pensioen",
    nlwftVerzBegrip: "Verzekeringsbegrippen",
    nlwftVerzRecht: "Verzekeringsrecht",
    nlwftToezicht: "Ordening en toezicht",
    nlwftRekenen: "Rekenen",
    nlwftPraktijk: "Klantcontact en praktijk",
    nlwftIntegriteit: "Integer handelen",
  },
  copy: {
    guestPrompt: "om je vooruitgang voor het Wft-examen Basis te bewaren en elke fout bij te houden",
    trainingHeading: "Oefensets",
    trainingSub: "Elke oefenset behandelt een of meer eindtermen van de module Basis. Je krijgt meteen feedback, en vragen die je fout had, komen terug tot je ze beheerst.",
    testsHeading: "Oefenexamens · 50 vragen, 68% om te slagen",
    heroSubs: [
      "Vijf oefensets, vier oefenexamens. Begin met financiële huishouding, betalen en sparen.",
      "Eerst de oefenset beheersen, dan het oefenexamen.",
      "Ga zo door. Maak een oefenexamen van 50 vragen om te zien waar je staat.",
      "Herhaal je fouten en test jezelf opnieuw.",
      "Alles groen. Plan je examen bij een erkend exameninstituut.",
    ],
    sourceLine: "Volgens de eind- en toetstermen module Basis van het CDFD (1 april 2026), de Wft, het Burgerlijk Wetboek en de Wwft, stand november 2026. Eigen vragen, niet uit de examenbank van het CDFD; oefenexamens van 50 vragen, zonder puntenweging.",
    analyticsKey: "nlwft",
  },
};
```

Append `nlwft` to the `EXAMS` array after `nlvca` (the last Netherlands exam), before `htl`.
No `translations` (the CDFD exam is Dutch only, so no English version is planned). The set
names above are Dutch topic names, so `TEST_SET_NAMES.nl` is not used for this exam.

## lib/banks/all.ts

```ts
import "./nlwft";
```

## types/index.ts

- `QuestionType`: add `| "NLWFT"`.
- `QuestionCategory`, under a `// Wft Basis (Dutch financial services competence, module Basis)` comment:

```ts
  | "nlwftHuishouden"
  | "nlwftBetalen"
  | "nlwftKrediet"
  | "nlwftRisico"
  | "nlwftVerzBegrip"
  | "nlwftVerzRecht"
  | "nlwftToezicht"
  | "nlwftRekenen"
  | "nlwftPraktijk"
  | "nlwftIntegriteit"
```

## i18n

Results and stats read `exam.categoryLabels` first, so nothing is needed for Dutch pages. For
the five category label maps that still need every key (`en`, `es`, `ko`, `vi`, `zh`), add the
English labels (the others fall back to English):

```ts
    nlwftHuishouden: "Client's Household Finances",
    nlwftBetalen: "Payments, Savings & Investing",
    nlwftKrediet: "Consumer Credit & Mortgages",
    nlwftRisico: "Personal Risks, Social Security & Pensions",
    nlwftVerzBegrip: "Insurance Concepts",
    nlwftVerzRecht: "Insurance Law",
    nlwftToezicht: "Market Structure & Supervision",
    nlwftRekenen: "Calculations",
    nlwftPraktijk: "Client Contact & Practice",
    nlwftIntegriteit: "Acting with Integrity",
```

## lib/shuffleOptions.ts

No position-dependent options ("A en B", "Beide", "Alle antwoorden ..."); `build.py` asserts it.
All-number options (12 calculation items, plus "20%", "104 weken", "5 jaar") are sorted
ascending by the build, and the app shuffles them like any other item; nothing extra beyond the
platform's `nl` patterns.

## app/globals.css

Requested hue `222 55% 32%` clashes (rule: within 8 degrees, under 15 points of saturation and
under 8 of lightness apart) with `phcse` (221 50% 30%), `boating` (215 65% 32%) and the UK
driving family `ukcar`, `ukmoto`, `uklgv`, `ukpcv`, `ukadi` (222 62% 38%). A scan of every
`[data-theme]` block in `globals.css` and every pending `tools/**/WIRING.md` block (1,272 themes)
found no free navy in the 30 to 48% lightness band; the nearest free slots are greyish. Suggested
clash-free: a muted aubergine-grey `330 20% 30%` (white text about 10:1). The integrator picks
the final hue and writes it here and in `globals.css`; then run `tools/gen_dark_brand_css.py`.

```css
  /* Wft Basis (Dutch financial services competence exam) theme */
  [data-theme="nlwft"] {
    --brand: 330 20% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 330 30% 96%;
    --brand-hover: 330 20% 25%;
    --brand-dark: 330 20% 21%;
    --brand-darker: 330 22% 15%;
    --brand-muted: 330 12% 62%;
    --brand-border: 330 15% 80%;
    --brand-border-light: 330 18% 90%;
    --brand-gradient-to: 330 30% 93%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `nlwft: "Four 50-question mock exams in Dutch for the Wft Basis exam, the first module of every Dutch financial adviser qualification: the client's household finances, payments and saving, credit and mortgages, social security and pensions, insurance concepts and contract law, AFM and DNB supervision, duty of care and the AVG, the Wwft, calculations and integrity dilemmas, at the real 68% pass line.",`
- `EXAM_ORG`: `nlwft: "CDFD · Wft vakbekwaamheid, module Basis, in Dutch",`
- Hub group: the Netherlands group for non-driving tests, placed right after the driving group
  that holds `nltheorie`, `nlbrom` and `nlmoto` (they join "EU driving theory tests"). Same title
  and members as the `nlvca` WIRING, so whichever lands first creates it:
  `{ title: "Netherlands licences and workplace certificates", ids: ["nlvca", "nlwft"] },`
- `RELATED_OVERRIDES` (the group has only one other member):
  `nlwft: ["befsmavz", "cemap", "ieqfa"],`
- `SEARCH_ALIASES` (Dutch and English):
  `nlwft: "wft basis wft-basis wft examen basis wft basis examen wft basis oefenexamen wft oefenen wft oefenvragen wft proefexamen module basis wft diploma vakbekwaamheid wft cdfd duo mijn wft wet op het financieel toezicht financieel adviseur examen zorgplicht afm dnb kifid wwft bankmedewerker examen verzekeringen examen hypotheekadviseur basis dutch financial services exam netherlands financial adviser exam wft exam practice dutch wft test amsterdam rotterdam utrecht",`
- Native name on the Dutch homepage, `english.name` elsewhere (the platform's `TestCatalogEntry`
  language field).

## lib/region.ts

- `TEST_REGIONS`: `nlwft: "NL",`
- Add `"nlwft"` to `NON_DRIVING_TESTS`.
- Region `NL` itself (REGIONS, `regionFromCountry`, REGION_HOME) is written in `nltheorie`'s
  WIRING. If `REGION_HOME.NL.testsSub` lists the tests, add a clause such as "en het Wft-examen
  Basis voor financiële dienstverlening". A Dutch exam only, so not on the BE page.

## lib/landingContent.ts

Register the Dutch landing so `/nl` can quote its facts answer:

```ts
import nlwftNl from "@/lib/landings/nlwft.nl.json";
  "nlwft.nl": nlwftNl as TranslatedLandingContent,
```

## app/nl/layout.tsx

Already exists (`lang="nl"`). The landing is `app/nl/wft-basis-oefenexamen/page.tsx` and relies
on `TranslatedExamLanding` using `exam.landingPath` when `lang === exam.language`, locale `nl-NL`,
`priceCurrency` EUR (as for `befsmavz`, which is `nl-BE`).

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  nlwft: {
    answer:
      "Anyone in the Netherlands who advises consumers on financial products must be professionally competent under the Financial Supervision Act (Wft), shown by a professional qualification made of one or more exam modules. The Basis module is the first step for every qualification except health insurance adviser. The initial Basis exam lasts 120 minutes and has 42 questions worth 63 points: 21 knowledge and understanding questions of 1 point, 2 professional conduct questions of 2 points and 19 skills and competences questions of 2 points, often built on a case. You pass with 68% of the points. The exam is in Dutch only and is taken at an exam institute recognised by the CDFD; DUO sends the result within two working days and records the diploma in Mijn Wft. Exams follow the law in force on 1 January from each 1 April. From April to September 2026, 56.1% of Basis exams were passed (CDFD, all attempts).",
    rows: [
      { label: "Exam owner", value: "CDFD for the Minister of Finance; recognised exam institutes" },
      { label: "Questions", value: "42 questions, 63 points" },
      { label: "Question types", value: "21 knowledge, 2 professional conduct, 19 skills and competences" },
      { label: "Time", value: "120 minutes" },
      { label: "Pass mark", value: "68% of the points" },
      { label: "Language", value: "Dutch only" },
      { label: "Results", value: "DUO, within two working days, diploma in Mijn Wft" },
      { label: "Content updates", value: "Each 1 April (law of 1 January)" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Dutch, 34 to pass" },
    ],
    basedOn: "CDFD exam characteristics for the initial Basis exam (from 1 April 2026), the CDFD final and test objectives for the Basis module, the CDFD candidate brochure for initial Wft exams, CDFD statistics April to September 2026, and DUO's Wft pages, checked November 2026",
    source: { name: "CDFD: Initieel examen Basis", url: "https://cdfd.nl/initieel-examen-basis/" },
  },
```

## lib/examFreshness.json

Dated change to watch: CDFD's advice of 20 October 2026 on the exams from 1 April 2027 (Basis
toetstermen 1b.16 wording and 1f.39/1f.40 privacy wording). Suggested event:
`{ "exam": "nlwft", "date": "2027-04-01", "kind": "outline", "what": "New Wft eind- en toetstermen take effect (CDFD advice of 20 October 2026): Basis 1b.16 wording and 1f.39/1f.40 privacy wording; recheck the kenmerken.", "action": "Read the CDFD toetstermen and kenmerken for module Basis from 1 April 2027, update affected items and the landing, record in sources.md, rebuild.", "source": "https://cdfd.nl/nieuws/advies-over-de-inhoud-van-de-wft-examens-vanaf-1-april-2027/" }`
in `events`, then `python3 -I tools/check_freshness.py`.

## lib/examSources.json

Run `python3 -I tools/build_exam_sources.py` (reads `tools/next100/nlwft/sources.md`).

## lib/llmsTxt.ts

Uses `english.name` with "(in Dutch)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## lib/tigerAssets.ts

Add to `BORROWED_SETS` with the other finance exams (as `cemap`): `nlwft: "nmls",`

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Teacher-led: Wft Basis is taught in classroom and e-learning courses and in bank and insurer
academies (as `befsmavz`).
- `TEACHER_LED`: add `"nlwft"` next to `"befsmavz"`.
- `TEACHES`: `nlwft: "a Wft Basis course or a bank or insurer academy",`

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the native `landingPath` under `/nl` is emitted once, with
hreflang `nl-NL` and x-default to itself). Class questions import `lib/banks/all`. No redirects.

## lib/privacyRegion.ts

Not a children's test; nothing.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 32 to 48 (all at most 60),
so no parts.

## Screenshots

`TranslatedExamLanding` reads the base-language shots; shoot with
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nlwft:wft-basis:45401`
and rename or keep per the platform's convention for a base-language landing (as `befsmavz`).

## docs/exams/nlwft.md

```md
# nlwft: Wft Basis (Dutch financial services competence, module Basis)

Route `/wft-basis/*`, landing `/nl/wft-basis-oefenexamen` (Dutch, `TranslatedExamLanding` from `lib/landings/nlwft.nl.json`). v1 registry exam, native Dutch (`language: "nl"`, `locale: "nl-NL"`, `review: { nl: "model" }`), English names in `english`. Region NL, hub group "Netherlands licences and workplace certificates", teacher-led.

- **What it is**: the initial Wft exam for the Basis module, the first module of every Dutch financial adviser qualification except Adviseur Zorgverzekering. The CDFD advises the Minister of Finance on the exams and keeps the secret central bank; recognised exam institutes run the sittings; DUO issues results and records diplomas in Mijn Wft.
- **Real format** (CDFD, from 1 April 2026): 42 questions, 63 points, 120 minutes (21 KB of 1 point, 2 PG and 19 VC of 2 points); pass at 68% of points; Dutch only; content follows the law of 1 January from each 1 April.
- **Bank**: `data/nl-wft-basis-questions.json`, 200 original questions written directly in Dutch on the CDFD eindtermen: financiële huishouding 24 (1a), betalen, sparen en beleggen 20 (1b), krediet en hypotheek 20 (1c), persoonlijke risico's, sociale zekerheid en pensioen 28 (1d), verzekeringsbegrippen 16 (1e), verzekeringsrecht 20 (1g), ordening en toezicht 32 (1f), rekenen 12 (2a, 2b), klantcontact en praktijk 16 (2b to 3d, with the Wwft), integer handelen 12 (4a). State `NLWFT`, prefix `NLWFT-`, segments HUI, BSB, KRE, RIS, VBG, VRE, TOE, REK, PRK, INT, category keys `nlwft*`.
- **Tests and sets**: four 50-question tests (IDs 45401-45404, 6/5/5/7/4/5/8/3/4/3 per test, no spares), five Dutch-named topic sets 45401-45405 (44/48/36/32/40), 9 dashboard steps, pass 68% (34 of 50).
- **Not modelled**: point weighting, multiple select, dropdown, ordering and numeric entry, long VC cases with documents. No tax rates, thresholds or yearly amounts; the two rates in calculation items are given in the stem.
- **Sources**: `tools/next100/nlwft/sources.md` (CDFD kenmerken, toetstermen and kandidatenbrochure; BW, Wft, Wwft, Wet IB 2001, Successiewet, AOW, Anw, WIA, WAM, Pensioenwet from the BWB repository). Terms in `glossary.md`. Build `python3 -I tools/next100/nlwft/build.py` (sorts all-number options with Dutch decimal commas and thousands points).
- **Lane**: distinct from `befsmavz` (Belgian insurance law), `ieqfa`, `cemap`, `llqp`, `nmls`. Specialist modules (Schade, Leven, Vermogen, Krediet, Hypothecair, Inkomen, Pensioen, Zorg) can be later siblings.
- **Theme**: `[data-theme="nlwft"]`, hue set by the integrator (requested 222 55% 32% clashes; see WIRING).
```

## CLAUDE.md (a bullet with the native-language exams, in the house shape)

```md
- **Wft Basis** (`nlwft`, Dutch financial services competence exam, module Basis, native Dutch exam, `language: "nl"`, `locale: "nl-NL"`, `review: { nl: "model" }`, `/wft-basis/*`, landing `/nl/wft-basis-oefenexamen` from `lib/landings/nlwft.nl.json`): `data/nl-wft-basis-questions.json` (200 original questions written directly in Dutch on the CDFD eind- en toetstermen module Basis of 1 April 2026: financiële huishouding 24, betalen, sparen en beleggen 20, krediet en hypotheek 20, persoonlijke risico's, sociale zekerheid en pensioen 28, verzekeringsbegrippen 16, verzekeringsrecht 20, ordening en toezicht 32, rekenen 12, klantcontact en praktijk 16, integer handelen 12), four 50-question tests (IDs 45401-45404, 6/5/5/7/4/5/8/3/4/3 per test, no spares) and five Dutch-named topic sets 45401-45405 (44/48/36/32/40), 9 dashboard steps, state `NLWFT`, prefix `NLWFT-`, 68% pass (34 of 50, the real line; the real exam is 42 questions and 63 points in 120 minutes with 2-point case questions, Dutch only). Point weighting and the multiple-select, dropdown, ordering and numeric formats are not modelled; no tax rates or yearly amounts. Rules from the Wft, BW, Wwft, Wet IB 2001, Successiewet, AOW, Anw, WIA, WAM, Pensioenwet and AVG as in force November 2026. Built by `tools/next100/nlwft/build.py`; sources in `tools/next100/nlwft/sources.md`, terms in `glossary.md`. Region NL, hub group "Netherlands licences and workplace certificates", teacher-led, `[data-theme="nlwft"]`.
```

## Decisions for the integrator

1. **Hue.** Requested `222 55% 32%` clashes with phcse, boating and the UK driving family; the
   block above uses clash-free `330 20% 30%`. Pick another if a navy is freed.
2. **Length.** Four tests of 50 (standard v1 shape) rather than the real 42, at the real 68%
   line; with equal weights 34 of 50 passes. The landing and FAQ say the real exam is 42
   questions and weights case questions double.
3. **Pass-rate figure.** The Dutch landing does not quote a pass rate; `EXAM_FACTS.answer`
   quotes CDFD's official 56.1% (April to September 2026, all attempts), dated. Drop it if
   figures on English surfaces should be avoided.
4. **Register.** Questions neutral/"u", landing and dashboard copy "je" (as `befsmavz`).
5. **Hub group title.** Matches the `nlvca` WIRING ("Netherlands licences and workplace
   certificates"); `nltheorie`'s WIRING suggested "Netherlands licensing and workplace exams".
   Use one title for both.
