# Wiring for `dkmedborger` (Medborgerskabsprøven, Danish permanent residence test, written in Danish, v1)

A native-language exam in Danish (`language: "da"`), built from the `detheorie` template and
alongside `dkindfoed` (same platform pieces: `i18n/da.ts`, `EXAM_UI.da`, `COPY.da`,
`SAMPLE_COPY.da`, `RELATED_COPY.da`, `CARD_FOOTERS.da`, the shuffle guard's `da` entry,
`LANG_RULES["da"]` and `/da` in `lib/urlLanguage.ts` already exist).

Files already written by the builder:
- `data/dk-medborgerskab-questions.json` (200, validator PASS with `--lang da`)
- `lib/banks/dkmedborger.ts`
- `app/medborgerskabsproeve/*` (5 wrappers copied from `app/indfoedsretsproeve/`: layout,
  redirect, dashboard, drill and stats; drill and stats import the bank; no test or practice
  folders)
- `lib/landings/dkmedborger.da.json` (Danish landing content, `facts.source` Retsinformation)
- `app/da/medborgerskabsproeven-oevelsesproeve/page.tsx` (three-line `TranslatedExamLanding`
  wrapper, `lang="da"`, `samples`, `related`)
- `tools/next100/dkmedborger/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/dkmedborger/build.py`. Validate with:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/dk-medborgerskab-questions.json --lang da --pool dkmedSkole=24 --pool dkmedArbejde=32 --pool dkmedVelfaerd=24 --pool dkmedFamilie=24 --pool dkmedDemokrati=32 --pool dkmedRettigheder=24 --pool dkmedVerden=24 --pool dkmedKultur=16`
-> `letters {'A': 50, 'B': 49, 'C': 50, 'D': 51}  avg option 17 chars  key-longest 21%  key>1.2x 22%  PASS`

## Shape

The real test (BEK nr. 452 af 13. maj 2024, §§ 9 and 35; checked 2026-11-06) is 25 multiple-choice
questions in 30 minutes, no aids, 20 correct to pass, all questions equal. Tigertest models it
exactly: eight 25-question tests (200 items, pools exactly 8x each per-test count, every item in
one test), `passPct: 80` (20 of 25). Real items have two or three options; ours four. Training:
four topic sets 23901-23904 (48/56/56/40, all at most 60, so no parts); 4 sets + 8 tests = 12
dashboard steps. Set ids share numbers with test ids 23901-23904 like other topic-set exams.

## lib/exams.ts

Add `"dkmedborger"` to the `ExamId` union. Icon `flag` already exists. 23900 block was assigned
by the brief (dkindfoed is 23600); check 23901-23908 are free.

```ts
const dkmedborger: ExamConfig = {
  id: "dkmedborger",
  stateCode: "DKMEDB",
  idBase: 23900,
  slug: "/medborgerskabsproeve",
  landingPath: "/da/medborgerskabsproeven-oevelsesproeve",
  name: "Medborgerskabsprøven",
  shortName: "Medborgerskabsprøven",
  examLabel: "Medborgerskabsprøven",
  fullName: "Medborgerskabsprøven (demokrati og hverdagsliv i Danmark)",
  questionIdPrefix: "DKMED-",
  icon: "flag",
  testCount: 8,
  questionsPerTest: 25,
  passPct: 80,
  language: "da",
  locale: "da-DK",
  english: {
    name: "Danish Permanent Residence Test (Medborgerskabsprøven)",
    shortName: "Danish permanent residence test",
    fullName: "Danish active citizenship test for permanent residence (medborgerskabsprøven), in Danish",
  },
  review: { da: "model" },
  // Real test (BEK nr. 452 af 13.05.2024 §§ 1, 9, 10, 35; May 2025 booklet; UC+ Dansk; checked
  // 2026-11-06): run by SIRI through approved language centres, twice a year (May/June and
  // Nov/Dec); 25 multiple-choice questions (2 or 3 options) on paper in 30 minutes, no aids,
  // pass with 20 of 25, all equal; questions within SIRI's "Læremateriale til
  // medborgerskabsprøven: demokrati og hverdagsliv i Danmark" (Aug 2024, 26 fakta-ark). A pass is
  // one of the 2-of-4 supplementary conditions for permanent residence. SIRI publishes no topic
  // weights: the 3/4/3/3/4/3/3/2 split is Tigertest's. All items original.
  blueprint: {
    dkmedSkole: 3,
    dkmedArbejde: 4,
    dkmedVelfaerd: 3,
    dkmedFamilie: 3,
    dkmedDemokrati: 4,
    dkmedRettigheder: 3,
    dkmedVerden: 3,
    dkmedKultur: 2,
  },
  // Four topic sets, not testSets(): 4 + 8 tests = 12 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 23901, name: "Hverdagsliv: skole, familie og fritid", categories: ["dkmedSkole", "dkmedFamilie"], size: 48, weightLabel: "6 af 25 spørgsmål pr. prøve" },
    { setNumber: 2, id: 23902, name: "Arbejde og velfærd", categories: ["dkmedArbejde", "dkmedVelfaerd"], size: 56, weightLabel: "7 af 25 spørgsmål pr. prøve" },
    { setNumber: 3, id: 23903, name: "Demokrati, rettigheder og pligter", categories: ["dkmedDemokrati", "dkmedRettigheder"], size: 56, weightLabel: "7 af 25 spørgsmål pr. prøve" },
    { setNumber: 4, id: 23904, name: "Danmark i verden, historie og kultur", categories: ["dkmedVerden", "dkmedKultur"], size: 40, weightLabel: "5 af 25 spørgsmål pr. prøve" },
  ],
  categoryLabels: {
    dkmedSkole: "Skole, uddannelse og dagtilbud",
    dkmedArbejde: "Arbejdsmarked og erhvervsliv",
    dkmedVelfaerd: "Velfærd, sundhed og skat",
    dkmedFamilie: "Familie, foreninger og ligestilling",
    dkmedDemokrati: "Valg, Folketing og retssamfund",
    dkmedRettigheder: "Kommune, rettigheder og tro",
    dkmedVerden: "Danmark i verden, geografi og klima",
    dkmedKultur: "Historie, kultur og mærkedage",
  },
  copy: {
    guestPrompt: "for at gemme dine fremskridt til medborgerskabsprøven og holde styr på hvert forkert svar",
    trainingHeading: "Træningssæt",
    trainingSub: "Hvert træningssæt dækker en del af lærematerialet. Du får svar med det samme, og de spørgsmål, du svarer forkert på, kommer igen, til du kan dem.",
    testsHeading: "Prøver · 25 spørgsmål, 20 for at bestå",
    heroSubs: [
      "Fire træningssæt, otte prøver med 25 spørgsmål som den rigtige.",
      "Bliv sikker i sættet, tag så prøven.",
      "Halvvejs. Tag en prøve på 30 minutter.",
      "Øv dine fejl, og tag prøven igen.",
      "Alt er grønt. Du er klar til medborgerskabsprøven.",
    ],
    sourceLine: "Egne spørgsmål om emnerne i SIRI's læremateriale til medborgerskabsprøven, november 2026. 25 spørgsmål og 20 for at bestå som den rigtige prøve; fire svarmuligheder i stedet for to eller tre.",
    analyticsKey: "dkmedborger",
  },
};
```

Append `dkmedborger` to the `EXAMS` array after `dkindfoed` (with the citizenship tests). ID
header comment if wanted: ` *   DKMEDB 23900s (tests 23901-23908, sets 23901-23904)`.

## lib/banks/all.ts

```ts
import "./dkmedborger";
```

## types/index.ts

- `QuestionType`: add `| "DKMEDB"`.
- `QuestionCategory`, under a `// Danish permanent residence test (medborgerskabsprøven)` comment:

```ts
  | "dkmedSkole"
  | "dkmedArbejde"
  | "dkmedVelfaerd"
  | "dkmedFamilie"
  | "dkmedDemokrati"
  | "dkmedRettigheder"
  | "dkmedVerden"
  | "dkmedKultur"
```

## i18n

Results and stats read `exam.categoryLabels` first, so nothing is needed for Danish. If a
dictionary still needs the keys, `i18n/en.ts` (others fall back to English):

```ts
    dkmedSkole: "School, Education & Childcare",
    dkmedArbejde: "Labour Market & Business",
    dkmedVelfaerd: "Welfare, Health & Tax",
    dkmedFamilie: "Family, Associations & Equality",
    dkmedDemokrati: "Elections, Parliament & Justice",
    dkmedRettigheder: "Municipality, Rights & Religion",
    dkmedVerden: "Denmark & the World, Geography, Climate",
    dkmedKultur: "History, Culture & Holidays",
```

## lib/shuffleOptions.ts

No position-dependent Danish options ("A og B", "Begge", "Alle svar"); the build asserts it.

## app/globals.css

The suggested `215 45% 30%` clashes with `security` (222 35% 36%), `phlto` (212 40% 26%),
`sbiclerk` (209 40% 34%) and `phcse` (221 50% 30%). Scanned every light `[data-theme]` block
(plus dkindfoed's `350 90% 40%`) with the rule (within 8 degrees: 15 points of saturation or 8 of
lightness): the 200 to 230 band is full except `202 100% 26%` (deep petrol blue, clear; white
text well above 7:1) and `215 10% 26%` (slate grey, clear). Suggested: `202 100% 26%`, a blue
to set it apart from the two red Danish themes (dkteori, dkindfoed). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Danish permanent residence test (medborgerskabsprøven) theme */
  [data-theme="dkmedborger"] {
    --brand: 202 100% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 202 80% 96%;
    --brand-hover: 202 100% 21%;
    --brand-dark: 202 100% 17%;
    --brand-darker: 202 100% 12%;
    --brand-muted: 202 40% 68%;
    --brand-border: 202 45% 80%;
    --brand-border-light: 202 45% 90%;
    --brand-gradient-to: 0 0% 98%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `dkmedborger: "Eight 25-question mock tests in Danish for the Danish permanent residence test (medborgerskabsprøven), 20 to pass like the real test: school and daycare, work and unions, health care and welfare, family life, elections, courts, the municipality, rights and duties, written on the topics of SIRI's learning material.",`
- `EXAM_ORG`: `dkmedborger: "SIRI (Denmark) · medborgerskabsprøven, in Danish",`
- Hub group: the brief asks for "Citizenship tests":
  `{ title: "Citizenship tests", ids: ["civics", "uklitu", "cacit", "aucit", "dkindfoed", "dkmedborger"] },`
  If the integrator instead opens a Denmark group for the non-driving Danish tests (as dkindfoed's
  WIRING offers), put it right after "EU driving theory tests":
  `{ title: "Denmark citizenship and licence tests", ids: ["dkindfoed", "dkmedborger", "dkjagt"] },`
  with `RELATED_OVERRIDES`: `dkmedborger: ["dkindfoed", "dkteori", "uklitu", "cacit"],`
  (drop ids that are not wired).
- `SEARCH_ALIASES` (Danish and English):
  `dkmedborger: "medborgerskabsprøven medborgerskabsprøve medborgerskabsproeven medborgerskabsproven medborgerskab prøve permanent ophold prøve tidsubegrænset opholdstilladelse læremateriale medborgerskabsprøven demokrati og hverdagsliv i danmark siri danish permanent residence test denmark permanent residence test active citizenship test denmark danish citizenship test permanent residency copenhagen aarhus odense aalborg",`
- Native name on Danish surfaces, `english.name` elsewhere (the platform's language field).

## lib/region.ts

```ts
  dkmedborger: "DK",
```
(in `TEST_REGIONS`, next to `dkteori: "DK"` and `dkindfoed: "DK"`). Region `DK` already exists
with `lang: "en"`; the Danish landing works under the `/da` prefix regardless. `REGION_HOME.DK`
needs no change; a second local test card comes from the hub group. Not a driving test, so add it
to `NON_DRIVING_TESTS` if that list is used for the DK homepage's local section.

## lib/landingContent.ts

```ts
import dkmedborgerDa from "@/lib/landings/dkmedborger.da.json";
  "dkmedborger.da": dkmedborgerDa as TranslatedLandingContent,
```

## app/da/layout.tsx

Shared with dkindfoed: if the platform adds `app/da/layout.tsx` (copy of `app/de/layout.tsx` with
`lang="da"`), this landing uses it; nothing exam-specific. `TranslatedExamLanding` uses the base
`landingPath` when `lang === exam.language`; currency DKK is in its `CURRENCY` table.

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  dkmedborger: {
    answer:
      "The Danish active citizenship test (medborgerskabsprøven) is a written test on democracy and everyday life in Denmark. Passing it meets the citizenship requirement, one of four supplementary conditions for permanent residence (tidsubegrænset opholdstilladelse), of which applicants must meet two. It has 25 multiple-choice questions in Danish with two or three options each, answered on paper in 30 minutes with no aids. You pass with at least 20 correct answers, and all questions count equally. The questions are written within SIRI's official free learning material (Læremateriale til medborgerskabsprøven, 26 fact sheets on school, work, welfare, health, family life, democracy, rights and duties, geography, history and culture). The test is run by SIRI (the Danish Agency for International Recruitment and Integration) through approved language centres, twice a year in May or June and November or December; SIRI publishes each test afterwards.",
    rows: [
      { label: "Run by", value: "SIRI, through approved language centres" },
      { label: "Questions", value: "25 multiple choice (2 or 3 options)" },
      { label: "Time", value: "30 minutes, no aids" },
      { label: "Pass mark", value: "20 of 25, all questions equal" },
      { label: "Language", value: "Danish" },
      { label: "When", value: "Twice a year, May/June and November/December" },
      { label: "Used for", value: "1 of 4 supplementary conditions for permanent residence" },
      { label: "Tigertest mock tests", value: "8 x 25 questions in Danish, 20 to pass" },
    ],
    basedOn: "Executive order no. 452 of 13 May 2024 on the medborgerskabsprøve, the May 2025 test booklet and SIRI's learning material (August 2024), checked November 2026",
    source: { name: "Retsinformation: Bekendtgørelse om medborgerskabsprøven (in Danish)", url: "https://www.retsinformation.dk/eli/lta/2024/452" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Danish)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## lib/tigerAssets.ts

Borrow the US citizenship tiger like dkindfoed, in `BORROWED_SETS`: `dkmedborger: "civics",`.

## Teacher-led lists

Optional: language schools (UC+ Dansk, Studieskolen, the municipal sprogcentre) run preparation
courses, so `TEACHER_LED` and `ExamClassFaq` fit if the integrator wants classes to pick it.
Not added by default, like dkindfoed.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the `/da/...` landing is emitted once, hreflang `da-DK`,
x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 40 to 56, so no parts.

## Question quality hooks

Run `python3 -I tools/build_exam_sources.py` (the first three https URLs of `sources.md` are
retsinformation.dk twice and cphpost.dk). Freshness events worth adding to
`lib/examFreshness.json`: a new edition of the learning material (the current one is August
2024; check each sitting), and any change to the permanent residence conditions in
udlændingeloven § 11 (no dated change known as of 2026-11-06).

## Screenshots

`TranslatedExamLanding` reads `/landing/dkmedborger-{mobile,desktop}-da.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing dkmedborger:medborgerskabsproeve:23901`
then rename the two files to the `-da` names.

## CLAUDE.md (after the dkindfoed bullet)

```md
- **Medborgerskabsprøven** (`dkmedborger`, the Danish active citizenship test for permanent residence, base language Danish, `language: "da"`, `locale: "da-DK"`, `review: { da: "model" }`, `/medborgerskabsproeve/*`, landing `/da/medborgerskabsproeven-oevelsesproeve` from `lib/landings/dkmedborger.da.json`): `data/dk-medborgerskab-questions.json` (200 original questions written directly in Danish on the topics of SIRI's Læremateriale til medborgerskabsprøven (August 2024, 26 fakta-ark): school, education and daycare 24, labour market and business 32, welfare, health and tax 24, family, associations and equality 24, elections, Folketing and the justice system 32, municipality, rights, duties and religion 24, Denmark in the world, geography and climate 24, history, culture and holidays 16), eight 25-question tests like the real test (IDs 23901-23908, 3/4/3/3/4/3/3/2 per test, no spares) and four Danish-named topic sets 23901-23904 (48/56/56/40), 12 dashboard steps, state `DKMEDB`, prefix `DKMED-`, 80% pass (20 of 25, the real mark). The real test (BEK nr. 452 af 13. maj 2024; SIRI through approved language centres, twice a year) is 25 multiple-choice questions with two or three options, on paper in 30 minutes, no aids, 20 to pass, all equal; a pass is one of the 2-of-4 supplementary conditions for permanent residence. Ours have four options. Written in its own lane beside `dkindfoed` (everyday citizenship rather than history and the Constitution) and checked against it for repeated fact-and-answer pairs. Facts that change (regions, pension and abortion ages, alcohol ages, conscription, benefit amounts) are left out; no officeholders. English names in `english`. Built by `tools/next100/dkmedborger/build.py`; sources in `tools/next100/dkmedborger/sources.md`, terms in `glossary.md`. Region DK, hub group "Citizenship tests", `[data-theme="dkmedborger"]` deep petrol blue, borrows the civics tiger.
```

## Decisions for the integrator

1. **Shape** is the real test's: eight tests of 25 with 20 to pass (passPct 80).
2. **Hue** `202 100% 26%` instead of the suggested `215 45% 30%` (clashes with security, phlto,
   sbiclerk, phcse); fallback `215 10% 26%`.
3. **Format facts** come from the executive order (Retsinformation PDF) and the May 2025 test
   booklet; siri.dk and danskogproever.dk returned 404 for the test page on 2026-11-06. Whether
   a newer edition of the learning material than August 2024 exists could not be confirmed (none
   found).
4. **Register**: questions neutral ("man", "en borger"), landing and dashboard copy "du".
5. **Overlap with dkindfoed** checked by script (same key or stem similarity over 0.7): no repeated
   fact-and-answer pair. Both banks touch democracy and culture, but on different facts; if the
   market only takes one, dkindfoed is the priority per the brief.
6. **Hub group**: "Citizenship tests" as the brief asks; it is not a citizenship test in law
   (it is for permanent residence), so the blurb and English name say so.
