# Wiring for `dkjagt` (Jagtprøven, the written part of the Danish hunting licence test, in Danish, v1)

A native-language exam (base language Danish, `language: "da"`), built from the `detheorie`
template and laid out like its sibling `dkindfoed`. The Danish phase-0 pieces (`i18n/da.ts`,
`EXAM_UI.da`, `COPY.da`, `SAMPLE_COPY.da`, `RELATED_COPY.da`, `CARD_FOOTERS.da`, the `da` shuffle
guard, `TEST_SET_NAMES.da`, `LANG_RULES["da"]`, `/da` in `lib/urlLanguage.ts`) already exist
(dkindfoed checked them 2026-11-06), so nothing language-level is left.

Files already written by the builder:
- `data/dk-jagtproeve-questions.json` (200, validator PASS with `--lang da`)
- `lib/banks/dkjagt.ts`
- `app/jagtproeve/*` (5 wrappers: layout, page, dashboard, drill, stats; copied from
  `app/indfoedsretsproeve/`; drill and stats import the bank)
- `lib/landings/dkjagt.da.json` (Danish landing content, `facts.source` the SGAV instruks PDF)
- `app/da/jagtproeven-oevelsesproeve/page.tsx` (three-line `TranslatedExamLanding` wrapper,
  `lang="da"`, `samples`, `related`)
- `tools/next100/dkjagt/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/dkjagt/build.py`. Validate with:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/dk-jagtproeve-questions.json --lang da --pool dkjgArter=35 --pool dkjgForvaltning=25 --pool dkjgVaaben=30 --pool dkjgSikkerhed=30 --pool dkjgLov=35 --pool dkjgVildt=15 --pool dkjgEtik=15 --pool dkjgTeknik=15`
-> `letters {'A': 55, 'B': 53, 'C': 47, 'D': 45}  avg option 22 chars  key-longest 2%  key>1.2x 4%  PASS`.
`python3 -I tools/check_banks.py` PASS.

Format note (Instruks for jagtprøven 2026 pkt. 3, checked 2026-11-06, see sources.md): the written
test is 40 questions in 30 minutes, at least 36 right to pass, unanswered count as errors, one
cross per question, questions can be read aloud; yes/no and multiple choice, some with a picture
of a species or a hunting situation. It must be passed before the practical test (shotgun
handling, distance judging, 4 clay targets). Tigertest models five real-length 40-question tests
(200 items, pools exactly 5x each per-test count, every item in exactly one test) at
`passPct: 90` = 36 of 40, the real line. Picture questions and the practical test are not
modelled; the landing says so. Five topic sets 23801-23805 + 5 tests = 10 dashboard steps.

## lib/exams.ts

Add `"dkjagt"` to the `ExamId` union. Icon `target` already exists (hunter, nzfirearms, sejakt).
The 23800 block is free (dkindfoed 23600, dkmoto 23700, dkmedborger 23900). Set ids
23801-23805 share numbers with test ids 23801-23805 like other topic-set exams.

```ts
const dkjagt: ExamConfig = {
  id: "dkjagt",
  stateCode: "DKJAGT",
  idBase: 23800,
  slug: "/jagtproeve",
  landingPath: "/da/jagtproeven-oevelsesproeve",
  name: "Jagtprøven",
  shortName: "Jagtprøven",
  examLabel: "Jagtprøven, skriftlig del",
  fullName: "Jagtprøven: den skriftlige prøve til jagttegn",
  questionIdPrefix: "DKJAG-",
  icon: "target",
  testCount: 5,
  questionsPerTest: 40,
  passPct: 90,
  language: "da",
  locale: "da-DK",
  english: {
    name: "Danish Hunting Licence Test (Jagtprøven)",
    shortName: "Danish hunting test",
    fullName: "Danish hunting licence test (jagtprøven), written part, in Danish",
  },
  review: { da: "model" },
  // Real test (Instruks for jagtprøven 2026 pkt. 3, jagttegnsbekendtgørelsen nr. 238/2025 §§ 8-10;
  // checked 2026-11-06): run by Styrelsen for Grøn Arealomlægning og Vandmiljø, held by
  // Naturstyrelsen; written part 40 questions in 30 minutes, pass with 36, unanswered count as
  // errors, then a practical test. Topics: the eight areas of the 2025 Retningslinjer for
  // spørgsmål til den skriftlige jagtprøve. No weights are published: the 7/5/6/6/7/3/3/3 split
  // is Tigertest's. Five real-length tests, pools exactly 5x (200, all original, written in
  // Danish). No season dates (the jagttider are revised for 2026/27).
  blueprint: {
    dkjgArter: 7,
    dkjgForvaltning: 5,
    dkjgVaaben: 6,
    dkjgSikkerhed: 6,
    dkjgLov: 7,
    dkjgVildt: 3,
    dkjgEtik: 3,
    dkjgTeknik: 3,
  },
  // Five topic sets, not testSets(): 5 + 5 tests = 10 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 23801, name: "Vildtarter og vildtbiologi", categories: ["dkjgArter"], size: 35, weightLabel: "7 af 40 spørgsmål pr. prøve" },
    { setNumber: 2, id: 23802, name: "Vildtforvaltning og jagtetik", categories: ["dkjgForvaltning", "dkjgEtik"], size: 40, weightLabel: "8 af 40 spørgsmål pr. prøve" },
    { setNumber: 3, id: 23803, name: "Våben og sikkerhed", categories: ["dkjgVaaben", "dkjgSikkerhed"], size: 60, weightLabel: "12 af 40 spørgsmål pr. prøve" },
    { setNumber: 4, id: 23804, name: "Jagtlovgivning", categories: ["dkjgLov"], size: 35, weightLabel: "7 af 40 spørgsmål pr. prøve" },
    { setNumber: 5, id: 23805, name: "Jagtpraksis og vildthåndtering", categories: ["dkjgTeknik", "dkjgVildt"], size: 30, weightLabel: "6 af 40 spørgsmål pr. prøve" },
  ],
  categoryLabels: {
    dkjgArter: "Artsbestemmelse og vildtbiologi",
    dkjgForvaltning: "Vildtforvaltning og natur",
    dkjgVaaben: "Jagtvåben og ammunition",
    dkjgSikkerhed: "Sikkerhed og skudafgivelse",
    dkjgLov: "Jagtlovgivning",
    dkjgVildt: "Håndtering af nedlagt vildt",
    dkjgEtik: "Jagtetik og etikette",
    dkjgTeknik: "Jagtteknik og ledelse",
  },
  copy: {
    guestPrompt: "for at gemme dine fremskridt til jagtprøven og holde styr på hvert forkert svar",
    trainingHeading: "Træningssæt",
    trainingSub: "Hvert træningssæt dækker et emne fra retningslinjerne for den skriftlige jagtprøve. Du får svar med det samme, og de spørgsmål, du svarer forkert på, kommer igen, til du kan dem.",
    testsHeading: "Prøver · 40 spørgsmål, 36 for at bestå",
    heroSubs: [
      "Fem træningssæt, fem prøver med 40 spørgsmål. Begynd med våben og sikkerhed.",
      "Bliv sikker i sættet, tag så prøven.",
      "Halvvejs. Højst 4 fejl pr. prøve.",
      "Øv dine fejl, og tag prøven igen.",
      "Alt er grønt. Du er klar til den skriftlige jagtprøve.",
    ],
    sourceLine: "Egne spørgsmål efter jagtloven, våbenreglerne og retningslinjerne for den skriftlige jagtprøve, november 2026. Ingen jagttider; arter beskrevet i ord.",
    analyticsKey: "dkjagt",
  },
};
```

Append `dkjagt` to the `EXAMS` array after `nzfirearms` (with the hunting and firearms tests) or
with the other Danish exams. ID header comment if wanted:
` *   DKJAGT 23800s (tests 23801-23805, sets 23801-23805)`.

## lib/banks/all.ts

```ts
import "./dkjagt";
```

## types/index.ts

- `QuestionType`: add `| "DKJAGT"`.
- `QuestionCategory`, under a `// Danish hunting licence test (jagtprøven)` comment
  (`dkjg` grepped against `types/index.ts` and the sibling WIRING files: no clash):

```ts
  | "dkjgArter"
  | "dkjgForvaltning"
  | "dkjgVaaben"
  | "dkjgSikkerhed"
  | "dkjgLov"
  | "dkjgVildt"
  | "dkjgEtik"
  | "dkjgTeknik"
```

## i18n

Results and stats read `exam.categoryLabels` first, so nothing is needed for Danish. If a
dictionary still needs the keys, `i18n/en.ts` (others fall back to English):

```ts
    dkjgArter: "Species & Game Biology",
    dkjgForvaltning: "Game Management & Nature",
    dkjgVaaben: "Hunting Weapons & Ammunition",
    dkjgSikkerhed: "Safety & Shooting",
    dkjgLov: "Hunting Law",
    dkjgVildt: "Handling Game & Diseases",
    dkjgEtik: "Hunting Ethics & Terms",
    dkjgTeknik: "Hunting Methods, Dogs & Tracking",
```

## lib/shuffleOptions.ts

No position-dependent options ("A og B", "Begge", "Alle svar"); the build asserts it. The
platform's `da` patterns cover the rest. Numeric options are sorted by the build; the app's
shuffle only applies to tests, as for every v1 exam.

## app/globals.css

The suggested `95 40% 24%` clashes with `sejakt` (95 45% 22%, within 8 degrees, 5 points of
saturation, 2 of lightness). Checked against every `[data-theme]` in `app/globals.css` and in all
pending `tools/**/WIRING.md` blocks (302 themes) with the rule: `100 35% 30%`, a moss hunting
green, is clear (nearest gcsescience 103 58% 32.8%, 23 points of saturation apart; sejakt 5
degrees and 10 points of saturation, but 8 of lightness apart). White text on it is about 6.5:1.
Fallback: `110 40% 26%` (also clear). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Danish hunting licence test (jagtprøven) theme */
  [data-theme="dkjagt"] {
    --brand: 100 35% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 95 40% 95%;
    --brand-hover: 100 35% 25%;
    --brand-dark: 100 38% 20%;
    --brand-darker: 100 40% 14%;
    --brand-muted: 100 20% 66%;
    --brand-border: 100 25% 78%;
    --brand-border-light: 100 25% 88%;
    --brand-gradient-to: 45 60% 94%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `dkjagt: "Five 40-question mock tests in Danish for the written part of the Danish hunting licence test (jagtprøven): species and game biology, game management, weapons and ammunition, safety, hunting law, handling game, ethics and hunting methods, written from the Danish hunting and weapons rules as of November 2026.",`
- `EXAM_ORG`: `dkjagt: "Styrelsen for Grøn Arealomlægning og Vandmiljø · jagtprøven, written part, in Danish",`
- Hub group: the Denmark group for the non-driving Danish tests, as proposed in the dkindfoed and
  dkmedborger WIRING files, placed right after "EU driving theory tests":
  `{ title: "Denmark citizenship and licence tests", ids: ["dkindfoed", "dkmedborger", "dkjagt"] },`
  If dkindfoed and dkmedborger go to "Citizenship tests" instead, put `dkjagt` in
  `"Outdoor & recreation licenses"` (after `hunter`) and add
  `RELATED_OVERRIDES`: `dkjagt: ["sejakt", "hunter", "nzfirearms", "capal"],`
  (drop `sejakt` if it is not wired). In the Denmark group, add
  `RELATED_OVERRIDES`: `dkjagt: ["sejakt", "hunter", "nzfirearms"],` so the related row shows
  other hunting tests.
- `SEARCH_ALIASES` (Danish and English):
  `dkjagt: "jagtprøven jagtprøve jagtproeven jagtprove jagttegn jagttegnsprøve jagttegnskursus skriftlig jagtprøve jagtprøve spørgsmål jagttegn prøve haglgevær vildtarter jagtloven jagttider naturstyrelsen jægerforbundet danish hunting licence test denmark hunting test danish hunting exam hunting license denmark jagttegn denmark",`
- Native name on Danish surfaces, `english.name` elsewhere (the platform's language field).

## lib/region.ts

```ts
  dkjagt: "DK",
```
(in `TEST_REGIONS`, next to `dkteori: "DK"`). Not a driving test, so add it to `NON_DRIVING_TESTS`.
Region `DK` already exists with `lang: "en"`; the Danish landing works under the `/da` prefix. If
the DK homepage gets an "About each test" list, it quotes `lib/landingContent.ts` below.

## lib/landingContent.ts

```ts
import dkjagtDa from "@/lib/landings/dkjagt.da.json";
  "dkjagt.da": dkjagtDa as TranslatedLandingContent,
```

## app/da/layout.tsx

Shared with dkindfoed and dkmedborger: none is needed for the landing (`lib/urlLanguage.ts` maps
`/da`). `TranslatedExamLanding` uses the base `landingPath` when `lang === exam.language`;
currency DKK is already in its `CURRENCY` table.

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  dkjagt: {
    answer:
      "The Danish hunting test (jagtprøven) is the test for a first Danish hunting licence (jagttegn). It has a written part and a practical part, and the written part must be passed first. The written test has 40 questions in 30 minutes; you pass with at least 36 correct, and unanswered questions count as errors. Questions are yes/no or multiple choice, some with a picture of a species or a hunting situation, and they can be read aloud. Topics come from the official guidelines: species identification and game biology, game management, hunting weapons and ammunition, hunting law, handling shot game, hunting ethics, hunting methods and leadership, and shooting. The practical test covers safe shotgun handling in the field, judging distances to six game figures and shooting at four clay targets. To sign up you must have finished the compulsory hunting course (at least four days) and turn 16 in the calendar year of the test; you may take up to three written and three practical tests within 18 months of finishing the course. The test is run by the Danish Agency for Green Land Conversion and Aquatic Environment and held by Naturstyrelsen, in Danish.",
    rows: [
      { label: "Run by", value: "Styrelsen for Grøn Arealomlægning og Vandmiljø, held by Naturstyrelsen" },
      { label: "Written test", value: "40 questions in 30 minutes" },
      { label: "Pass mark", value: "36 of 40; unanswered questions count as errors" },
      { label: "Practical test", value: "Shotgun handling, distance judging, 4 clay targets" },
      { label: "Before the test", value: "Compulsory hunting course; turn 16 in the calendar year" },
      { label: "Attempts", value: "Up to 3 written and 3 practical within 18 months of the course" },
      { label: "Language", value: "Danish" },
      { label: "Tigertest mock tests", value: "5 x 40 questions in Danish, 36 to pass" },
    ],
    basedOn: "Instruks for jagtprøven 2026, the 2025 guidelines for questions in the written hunting test, the 2025 guide to hunting licence teaching and Executive Order no. 238 of 27 February 2025 on hunting licences, checked November 2026",
    source: { name: "SGAV: Instruks for jagtprøven 2026 (PDF, in Danish)", url: "https://sgavmst.dk/media/ttndlsbs/instruks-for-jagtproeven-2026.pdf" },
  },
```

## lib/shareCardCopy.ts

```ts
  dkjagt: { title: "Danish Hunting Licence Test", description: "Practise game species, weapons, safety and Danish hunting law in Danish for the written jagtprøve." },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Danish)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the Danish batch.

## lib/tigerAssets.ts

`BORROWED_SETS`: `dkjagt: "hunter",` (like `nzfirearms` and `sejakt`).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

The compulsory jagttegnskursus is taught by approved course teachers (often through Danmarks
Jægerforbund's local clubs), so a class can practise together. Optional, if the integrator wants
course teachers to pick it:
- `TEACHER_LED`: add `"dkjagt"`.
- `TEACHES`: `dkjagt: "a jagttegnskursus",` (check the phrase reads well in the English FAQ; the
  landing is Danish, so the class FAQ is not rendered there).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the `/da/...` landing is emitted once, hreflang `da-DK`,
x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 30 to 60, so no parts.

## Question quality hooks

Run `python3 -I tools/build_exam_sources.py` (the first three https URLs of `sources.md` are the
SGAV instruks, retningslinjer and vejledning PDFs). Freshness event worth adding to
`lib/examFreshness.json`: the jagttidsrevision with effect from the 2026/27 season (the bank asks
no season dates, but the landing FAQ points to the jagttidsbekendtgørelse); the retningslinjer are
revised yearly (last 3 April 2025): review the bank when a new version appears.

## Screenshots

`TranslatedExamLanding` reads `/landing/dkjagt-{mobile,desktop}-da.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing dkjagt:jagtproeve:23801`
then rename the files to the `-da` names (and their `-dark` twins).

## CLAUDE.md (after the NZ Firearms Licence bullet, or with the other Danish exams)

```md
- **Jagtprøven** (`dkjagt`, the written part of the Danish hunting licence test, base language Danish, `language: "da"`, `locale: "da-DK"`, `review: { da: "model" }`, `/jagtproeve/*`, landing `/da/jagtproeven-oevelsesproeve` from `lib/landings/dkjagt.da.json`): `data/dk-jagtproeve-questions.json` (200 original questions written directly in Danish on the eight topics of the 2025 Retningslinjer for spørgsmål til den skriftlige jagtprøve: species identification and game biology 35, game management, nature and invasive species 25, hunting weapons and ammunition 30, safety and shooting 30, hunting law 35, handling shot game and game diseases 15, ethics, etiquette and hunters' terms 15, hunting methods, leadership, dogs and tracking 15), five 40-question tests like the real written test (IDs 23801-23805, 7/5/6/6/7/3/3/3 per test, Tigertest's split, no spares) and five Danish-named topic sets 23801-23805 (Vildtarter og vildtbiologi 35, Vildtforvaltning og jagtetik 40, Våben og sikkerhed 60, Jagtlovgivning 35, Jagtpraksis og vildthåndtering 30), 10 dashboard steps, state `DKJAGT`, prefix `DKJAG-`, 90% pass (36 of 40, the real line). The real written test (Instruks for jagtprøven 2026; jagttegnsbekendtgørelsen nr. 238/2025) is 40 questions in 30 minutes, unanswered count as errors, some with pictures, and must be passed before the practical test (shotgun handling, distance judging, 4 clay targets); the question pool is secret, so all items are written from jagt- og vildtforvaltningsloven (LBK 639/2023), the hunting weapons order nr. 1479/2023 (shotgun at most 2 cartridges, 55 cm, calibre 12; shot at most 4 mm; no lead shot or slugs; ammunition classes 1 to 5), bek. 1652/2017, the jagttid order's time-of-day rules, the tracking order nr. 827/2016 (6 daylight hours), våbenloven § 2 a and våbenbekendtgørelsen (safe, transport, 8-day notice, 10-year rifle permit) and the instruks's maximum shotgun distances. No season dates (jagttider revised for 2026/27), fees or species pictures; species described in words. Picture questions and the practical test are not modelled. Kept clear of `hunter`, `nzfirearms`, `capal` and `sejakt`. English names in `english`. Built by `tools/next100/dkjagt/build.py`; sources in `tools/next100/dkjagt/sources.md`, terms in `glossary.md`. Region DK, hub group "Denmark citizenship and licence tests", `[data-theme="dkjagt"]` moss green (100 35% 30%), borrows the hunter tiger.
```

## Decisions for the integrator

1. **Hue** `100 35% 30%` instead of the suggested `95 40% 24%` (clashes with sejakt).
2. **Hub group** shared with dkindfoed and dkmedborger ("Denmark citizenship and licence
   tests"), or "Outdoor & recreation licenses" if the Danish citizenship tests go elsewhere.
3. **Topic weights** are Tigertest's: the retningslinjer publish eight topics but no counts.
4. **Seasons**: no jagttid dates or "has an open season" items (revision for 2026/27); the only
   protection item is the long-standing fredning of raptors. Regulation species periods are left
   out because the 2022 vildtskadebekendtgørelse is marked historic on retsinformation.
5. **Vejledning URL**: the brief's `2025-vejledning-til-jagttegnsundervisning.pdf` returns 404; the
   working URL is `2025_vejledning-til-jagttegnsundervisning.pdf` (in sources.md).
6. **Register**: neutral questions with »du« in situations; landing and dashboard copy »du«.
7. **Siblings**: grepped dkindfoed and dkmedborger (no hunting content) and dkmoto/dkteori (road
   rules only): no shared fact-and-answer pairs.
