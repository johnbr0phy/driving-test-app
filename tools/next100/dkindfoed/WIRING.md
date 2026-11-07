# Wiring for `dkindfoed` (Indfødsretsprøven, Danish citizenship test, written in Danish, v1)

Tigertest's first Danish-language bank. The base bank and base copy are Danish (`language: "da"`).
The `da` UI dictionary (`i18n/da.ts`), `EXAM_UI.da`, `COPY.da`, `SAMPLE_COPY.da`, `RELATED_COPY.da`,
`CARD_FOOTERS.da`, the shuffle guard's `da` entry, `TEST_SET_NAMES.da`, `LANG_RULES["da"]` and the
`/da` entry in `lib/urlLanguage.ts` already exist (checked 2026-11-06), so no phase-0 language work
is left beyond the items below.

Files already written by the builder:
- `data/dk-indfoedsret-questions.json` (200, validator PASS with `--lang da`)
- `lib/banks/dkindfoed.ts`
- `app/indfoedsretsproeve/*` (5 wrappers copied from `app/fuehrerschein-theorie/`; drill and stats
  import the bank)
- `lib/landings/dkindfoed.da.json` (Danish landing content, `facts.source` Lex)
- `app/da/indfoedsretsproeven-oevelsesproeve/page.tsx` (three-line `TranslatedExamLanding`
  wrapper, `lang="da"`, `samples`, `related`)
- `tools/next100/dkindfoed/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/dkindfoed/build.py`. Validate with:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/dk-indfoedsret-questions.json --lang da --pool dkindHistOld=20 --pool dkindHistEarly=20 --pool dkindHistDemo=25 --pool dkindHistNew=20 --pool dkindDemokrati=35 --pool dkindSamfund=30 --pool dkindKultur=25 --pool dkindVaerdier=25`
-> `letters {'A': 48, 'B': 45, 'C': 52, 'D': 55}  avg option 16 chars  key-longest 22%  key>1.2x 18%  PASS`

## Shape (why 5 x 40, not 8)

The real test is 45 questions: 35 from the learning material, 5 current affairs, 5 values. The
current-affairs questions follow the news and cannot be modelled, so each Tigertest test has the
other 40 (35 + 5 values) and passes at 36 of 40 (`passPct: 90`, the real 36-line). Eight tests of
40 would need 320 items; the brief's 200-item bank gives five, each item in exactly one test.
Training: five topic sets 23601-23605 (all at most 60, so no parts), 5 sets + 5 tests = 10 steps.
Set ids share numbers with test ids 23601-23605 like other topic-set exams.

**Values rule not enforced.** The real test also needs 4 of the 5 values questions right. The
engine scores only the total; the copy (testsHeading, sourceLine, landing) says to check it, as
for `aucit`. The shared follow-up suggested in `tools/global/aucit/WIRING.md`
(`ExamConfig.mustAllCorrect`) would need a "at least N of category" variant for this exam.

## lib/exams.ts

Add `"dkindfoed"` to the `ExamId` union. Icon `flag` already exists. 23600 block checked free.

```ts
const dkindfoed: ExamConfig = {
  id: "dkindfoed",
  stateCode: "DKINDFOED",
  idBase: 23600,
  slug: "/indfoedsretsproeve",
  landingPath: "/da/indfoedsretsproeven-oevelsesproeve",
  name: "Indfødsretsprøven",
  shortName: "Indfødsretsprøven",
  examLabel: "Indfødsretsprøven",
  fullName: "Indfødsretsprøven (danske samfundsforhold, dansk kultur og historie)",
  questionIdPrefix: "DKIND-",
  icon: "flag",
  testCount: 5,
  questionsPerTest: 40,
  passPct: 90,
  language: "da",
  locale: "da-DK",
  english: {
    name: "Danish Citizenship Test (Indfødsretsprøven)",
    shortName: "Danish citizenship test",
    fullName: "Danish citizenship test (indfødsretsprøven), in Danish",
  },
  review: { da: "model" },
  // Real test (Lex, last changed 2025-10-28; Lovguiden 2026-06-01; checked 2026-11-06): run by
  // SIRI under Udlændinge- og Integrationsministeriet, twice a year (May/June, Nov/Dec) at
  // language centres; 45 questions in 45 minutes, in Danish, mostly three options, some yes/no:
  // 35 from "Læremateriale til indfødsretsprøven" (danske samfundsforhold, dansk kultur og
  // historie), 5 current affairs, 5 values; pass 36 of 45 with at least 4 of the 5 values right.
  // Current affairs not modelled, so 40 per test (35 + 5 values) and 36 to pass. SIRI publishes no
  // topic weights: the 4/4/5/4/7/6/5 split of the 35 is Tigertest's. All items original.
  blueprint: {
    dkindHistOld: 4,
    dkindHistEarly: 4,
    dkindHistDemo: 5,
    dkindHistNew: 4,
    dkindDemokrati: 7,
    dkindSamfund: 6,
    dkindKultur: 5,
    dkindVaerdier: 5,
  },
  // Five topic sets, not testSets(): 5 + 5 tests = 10 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 23601, name: "Historie indtil 1849", categories: ["dkindHistOld", "dkindHistEarly"], size: 40, weightLabel: "8 af 40 spørgsmål pr. prøve" },
    { setNumber: 2, id: 23602, name: "Historie fra 1849", categories: ["dkindHistDemo", "dkindHistNew"], size: 45, weightLabel: "9 af 40 spørgsmål pr. prøve" },
    { setNumber: 3, id: 23603, name: "Grundloven og folkestyret", categories: ["dkindDemokrati"], size: 35, weightLabel: "7 af 40 spørgsmål pr. prøve" },
    { setNumber: 4, id: 23604, name: "Samfund og kultur", categories: ["dkindSamfund", "dkindKultur"], size: 55, weightLabel: "11 af 40 spørgsmål pr. prøve" },
    { setNumber: 5, id: 23605, name: "Danske værdier", categories: ["dkindVaerdier"], size: 25, weightLabel: "5 af 40, mindst 4 skal være rigtige" },
  ],
  categoryLabels: {
    dkindHistOld: "Oldtid, vikingetid og middelalder",
    dkindHistEarly: "Fra Reformationen til Grundloven",
    dkindHistDemo: "Fra Grundloven til befrielsen",
    dkindHistNew: "Danmark efter 1945",
    dkindDemokrati: "Grundloven og folkestyret",
    dkindSamfund: "Samfund, velfærd og økonomi",
    dkindKultur: "Kultur og traditioner",
    dkindVaerdier: "Danske værdier",
  },
  copy: {
    guestPrompt: "for at gemme dine fremskridt til indfødsretsprøven og holde styr på hvert forkert svar",
    trainingHeading: "Træningssæt",
    trainingSub: "Hvert træningssæt dækker et emne. Du får svar med det samme, og de spørgsmål, du svarer forkert på, kommer igen, til du kan dem. Danske værdier har sit eget sæt, fordi 4 af 5 værdispørgsmål skal være rigtige.",
    testsHeading: "Prøver · 40 spørgsmål, 36 for at bestå, 4 af 5 værdier",
    heroSubs: [
      "Fem træningssæt, fem prøver med 40 spørgsmål. Begynd med danske værdier.",
      "Bliv sikker i sættet, tag så prøven.",
      "Halvvejs. Hold styr på værdispørgsmålene.",
      "Øv dine fejl, og tag prøven igen.",
      "Alt er grønt. Du er klar til indfødsretsprøven.",
    ],
    sourceLine: "Egne spørgsmål om emnerne i SIRI's læremateriale og danske værdier, november 2026. Aktuelle spørgsmål er ikke med; tjek selv, at du har mindst 4 af 5 værdispørgsmål rigtige.",
    analyticsKey: "dkindfoed",
  },
};
```

Append `dkindfoed` to the `EXAMS` array after `aucit` (with the citizenship tests). ID header
comment if wanted: ` *   DKINDFOED 23600s (tests 23601-23605, sets 23601-23605)`.
`heroSubs[0]` names the values set: check it fits the hero on a phone.

## lib/banks/all.ts

```ts
import "./dkindfoed";
```

## types/index.ts

- `QuestionType`: add `| "DKINDFOED"`.
- `QuestionCategory`, under a `// Danish citizenship test (indfødsretsprøven)` comment:

```ts
  | "dkindHistOld"
  | "dkindHistEarly"
  | "dkindHistDemo"
  | "dkindHistNew"
  | "dkindDemokrati"
  | "dkindSamfund"
  | "dkindKultur"
  | "dkindVaerdier"
```

## i18n

Results and stats read `exam.categoryLabels` first (LANGUAGES.md), so nothing is needed for
Danish. If a dictionary still needs the keys, `i18n/en.ts` (others fall back to English):

```ts
    dkindHistOld: "Prehistory, Vikings & Middle Ages",
    dkindHistEarly: "Reformation to the Constitution",
    dkindHistDemo: "Constitution to Liberation (1849 to 1945)",
    dkindHistNew: "Denmark after 1945",
    dkindDemokrati: "Constitution & Democracy",
    dkindSamfund: "Society, Welfare & Economy",
    dkindKultur: "Culture & Traditions",
    dkindVaerdier: "Danish Values",
```

## lib/shuffleOptions.ts

The bank has no position-dependent Danish options ("A og B", "Begge", "Alle svar"); the build
asserts it. The platform's `da` patterns cover the rest.

## app/globals.css

The suggested `352 60% 32%` clashes with `dkteori` (348 70% 30%), `rrbalp` (355 55% 32%) and
`alcohol` (345 55% 36%). Checked against every light `[data-theme]` block with the rule (within
8 degrees: 15 points of saturation or 8 of lightness): `350 90% 40%`, Dannebrog red, is clear
(nearest: dkteori 20 points of saturation apart). White text on it is about 6.2:1. Fallback: deep
wine `341 55% 26%` (clear, about 11.6:1). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Danish citizenship test (indfødsretsprøven) theme */
  [data-theme="dkindfoed"] {
    --brand: 350 90% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 350 80% 96%;
    --brand-hover: 350 90% 34%;
    --brand-dark: 350 90% 28%;
    --brand-darker: 350 85% 20%;
    --brand-muted: 350 40% 70%;
    --brand-border: 350 45% 80%;
    --brand-border-light: 350 45% 90%;
    --brand-gradient-to: 0 0% 98%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `dkindfoed: "Five 40-question mock tests in Danish for the Danish citizenship test (indfødsretsprøven): history, the Constitution, democracy, society, culture and five values questions per test, written on the topics of SIRI's learning material.",`
- `EXAM_ORG`: `dkindfoed: "SIRI (Denmark) · indfødsretsprøven, in Danish",`
- Hub group: add to the citizenship group, which the research notes ask for:
  `{ title: "Citizenship tests", ids: ["civics", "uklitu", "cacit", "aucit", "dkindfoed"] },`
  If the integrator instead opens a Denmark group for the non-driving Danish tests being built now
  (dkindfoed, dkmedborger, dkjagt), place it right after "EU driving theory tests":
  `{ title: "Denmark citizenship and licence tests", ids: ["dkindfoed", "dkmedborger", "dkjagt"] },`
  with `RELATED_OVERRIDES`: `dkindfoed: ["dkmedborger", "uklitu", "aucit", "cacit"],`
  (drop `dkmedborger` if it is not wired).
- `SEARCH_ALIASES` (Danish and English):
  `dkindfoed: "indfødsretsprøven indfødsretsprøve indfoedsretsproeven indfodsretsproven indfødsret statsborgerskabsprøve statsborgerskab prøve dansk statsborgerskab dansk pas læremateriale værdispørgsmål siri danish citizenship test denmark citizenship test danish naturalisation test danish passport test citizenship test denmark copenhagen aarhus odense",`
- Native name on Danish surfaces, `english.name` elsewhere (the platform's language field).

## lib/region.ts

```ts
  dkindfoed: "DK",
```
(in `TEST_REGIONS`, next to `dkteori: "DK"`). Region `DK` already exists with `lang: "en"`; the
Danish landing works under the `/da` prefix regardless. Optional `REGION_HOME.DK` addition so the
English Denmark homepage mentions it (only once the test is in the catalog):
`testsSub` stays the driving line; a second local test card comes from the hub group. If the DK
homepage gets an "About each test" list, it quotes `lib/landingContent.ts` below.

## lib/landingContent.ts

```ts
import dkindfoedDa from "@/lib/landings/dkindfoed.da.json";
  "dkindfoed.da": dkindfoedDa as TranslatedLandingContent,
```

## app/da/layout.tsx

`app/da/` did not exist before this exam. `lib/urlLanguage.ts` already maps `/da` to `da` (header
and `<html lang>` before paint). If the platform wants a layout like `app/de/layout.tsx`, copy it
with `lang="da"`; the landing page itself needs nothing more. `TranslatedExamLanding` uses the
base `landingPath` when `lang === exam.language`; currency DKK is already in its `CURRENCY` table.

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  dkindfoed: {
    answer:
      "The Danish citizenship test (indfødsretsprøven) is a written test for people applying for Danish citizenship by statute. It has 45 multiple-choice questions in Danish and lasts 45 minutes. 35 questions come from the official free learning material on Danish society, culture and history (Læremateriale til indfødsretsprøven, in text and audio), 5 are about current affairs from the months before the test, and 5 are about Danish values. To pass you need at least 36 correct answers, including at least 4 of the 5 values questions. Most questions have three options and some are yes or no. The test is run by SIRI (the Danish Agency for International Recruitment and Integration) and held twice a year, in May or June and in November or December, at language centres across Denmark; SIRI publishes each test and its answers afterwards. In May 2025, 58.2% of candidates passed.",
    rows: [
      { label: "Run by", value: "SIRI, under the Ministry of Immigration and Integration" },
      { label: "Questions", value: "45 (35 learning material, 5 current affairs, 5 values)" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "36 of 45, with at least 4 of 5 values questions" },
      { label: "Language", value: "Danish" },
      { label: "When", value: "Twice a year, May/June and November/December" },
      { label: "Tigertest mock tests", value: "5 x 40 questions in Danish, 36 to pass" },
    ],
    basedOn: "Lex (Den Store Danske) and Lovguiden on the indfødsretsprøve, and the topics of SIRI's learning material, checked November 2026",
    source: { name: "Lex: Indfødsretsprøve (in Danish)", url: "https://lex.dk/indf%C3%B8dsretspr%C3%B8ve" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Danish)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## lib/tigerAssets.ts

Borrow the US citizenship tiger like the other citizenship tests, in `BORROWED_SETS`:
`dkindfoed: "civics",` (or "uklitu"/"aucit", which have their own complete sets).

## Teacher-led lists

Not added: the real test is self-study for adult applicants, though language schools (UC+ Dansk,
Studieskolen) run courses for it. Optional: `TEACHER_LED` and `ExamClassFaq` if the integrator
wants language-school classes to pick it.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the `/da/...` landing is emitted once, hreflang `da-DK`, x-default
to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 25 to 55, so no parts.

## Question quality hooks

Run `python3 -I tools/build_exam_sources.py` (the first three https URLs of `sources.md` are
lex.dk, lovguiden.dk and ucplusdansk.dk). Freshness event worth adding to `lib/examFreshness.json`:
the values questions follow integration policy and may change with legislation (no dated change
known as of 2026-11-06).

## Screenshots

`TranslatedExamLanding` reads `/landing/dkindfoed-{mobile,desktop}-da.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing dkindfoed:indfoedsretsproeve:23601`
then rename the two files to the `-da` names.

## CLAUDE.md (after the Australian citizenship bullet, or under native-language exams)

```md
- **Indfødsretsprøven** (`dkindfoed`, the Danish citizenship test, Tigertest's first Danish-language bank, base language Danish, `language: "da"`, `locale: "da-DK"`, `review: { da: "model" }`, `/indfoedsretsproeve/*`, landing `/da/indfoedsretsproeven-oevelsesproeve` from `lib/landings/dkindfoed.da.json`): `data/dk-indfoedsret-questions.json` (200 original questions written directly in Danish on the topics of SIRI's Læremateriale til indfødsretsprøven and on Danish values: prehistory, Vikings and Middle Ages 20, Reformation to the Constitution 20, Constitution to liberation 25, after 1945 20, Grundloven and folkestyret 35, society, welfare and economy 30, culture and traditions 25, values 25), five 40-question tests (IDs 23601-23605, 4/4/5/4/7/6/5/5 per test, no spares) and five Danish-named topic sets 23601-23605 (history to 1849 40, from 1849 45, Grundloven 35, samfund og kultur 55, værdier 25), 10 dashboard steps, state `DKINDFOED`, prefix `DKIND-`, 90% pass (36 of 40). The real test (SIRI, twice a year at language centres) is 45 questions in 45 minutes: 35 from the learning material, 5 current affairs, 5 values, pass at 36 with at least 4 of 5 values right; current affairs are not modelled and the values rule is not enforced (the copy says to check it). Real items mostly have three options or yes/no; ours four. No current officeholders, no past-test items. English names in `english`. Built by `tools/next100/dkindfoed/build.py`; sources in `tools/next100/dkindfoed/sources.md`, terms in `glossary.md`. Region DK, hub group "Citizenship tests", `[data-theme="dkindfoed"]` Dannebrog red, borrows the civics tiger.
```

## Decisions for the integrator

1. **Five tests, not eight.** The task asked for eight real-length tests; at 40 per test that is
   320 items. Built to the brief's 200-item rule as 5 x 40 (each item in one test). Eight would
   need 120 more items written to the same plan (pools 32/32/40/32/56/48/40/40).
2. **Pass mark** 90 (36 of 40), the real 36-line on the modelled 40; the 4-of-5 values rule is in
   the copy only.
3. **Hue** `350 90% 40%` instead of the suggested `352 60% 32%` (clashes with dkteori, rrbalp,
   alcohol).
4. **Format facts** come from Lex and Lovguiden; siri.dk returned 404 for its test page on
   2026-11-06. Not confirmed: whether any aids are allowed (not stated, so not on the landing).
5. **Register**: questions neutral ("man", "en vælger"), landing and dashboard copy "du".
6. **Siblings**: no `dkmedborger` or `dkjagt` bank was on disk while writing, so overlap with them
   could not be checked; the medborgerskabsprøve covers similar society facts, so a cross-check is
   worth running once it lands.
