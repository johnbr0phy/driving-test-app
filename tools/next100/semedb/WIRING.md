# Wiring for `semedb` (Swedish citizenship test in civics, medborgarskapsprovet, written in Swedish, v1)

A native-language exam with base language Swedish (`language: "sv"`), built on the `detheorie`
template with the citizenship content shape of `uklitu` / `cacit` / `aucit` (real-length tests
plus training-only spares, topic sets). UHR gives the test only in Swedish, so there is no
English version. Files already written by the builder:
- `data/sweden-citizenship-test-questions.json` (200, validator PASS with `--lang sv`)
- `lib/banks/semedb.ts`
- `app/medborgarskapsprovet/*` (5 wrappers copied from `app/motorcykel-teori/`)
- `lib/landings/semedb.sv.json` (Swedish landing content, Swedish `facts.source`)
- `app/sv/medborgarskapsprov-ovning/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `sv`)
- `tools/next100/semedb/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/semedb/build.py`. Everything below goes in shared files.

Format note (checked 2026-11-06, `sources.md`): UHR runs the test under Förordning (2026:451)
om medborgarskapsprov; Migrationsverket decides citizenship and assigns test takers. UHR's own
page says: Swedish, on paper, multiple choice, four options, one right; length and time of the
next sitting (April to May 2027) not yet announced. Press reports of the first sitting (15 August
2026, a trial "utprövningsprov"): 60 questions in 90 minutes, 40 scored, 28 of 40 (70%) to pass,
about 8 in 10 passed. The test is based on UHR's study material "Sverige i fokus" (13 chapters).
Tigertest models three real-length 60-question tests at 70% (42 of 60), every test item used once,
plus two training-only spares per category (20), and five topic sets: 8 dashboard steps. The
landing says only 40 of the 60 counted in August 2026 and that the 2027 format is not announced.

## lib/exams.ts

Add `"semedb"` to the `ExamId` union. Icon `flag` already exists (citizenship tests use it).
idBase 23500 (tests 23501-23503, sets 23501-23505) was assigned in the batch table and is free.
Set ids share numbers with test ids like `detheorie` and `semoto` (topic sets, not `testSets()`).

```ts
const semedb: ExamConfig = {
  id: "semedb",
  stateCode: "SEMEDB",
  idBase: 23500,
  slug: "/medborgarskapsprovet",
  landingPath: "/sv/medborgarskapsprov-ovning",
  name: "Medborgarskapsprovet, övningsprov",
  shortName: "Medborgarskapsprovet",
  examLabel: "Medborgarskapsprov i samhällskunskap",
  fullName: "Medborgarskapsprov i samhällskunskap (UHR)",
  questionIdPrefix: "SEMEDB-",
  icon: "flag",
  testCount: 3,
  questionsPerTest: 60,
  passPct: 70,
  language: "sv",
  locale: "sv-SE",
  english: {
    name: "Swedish Citizenship Test (Civics)",
    shortName: "Swedish citizenship test",
    fullName: "Swedish citizenship test in civics (medborgarskapsprovet i samhällskunskap, UHR), in Swedish",
  },
  review: { sv: "model" },
  // Real test (UHR, Om medborgarskapsprovet, updated 22 Oct 2026; Förordning (2026:451); press
  // reports of the 15 Aug 2026 sitting; checked 2026-11-06): Swedish, on paper, four options and
  // one right answer; 60 questions in 90 minutes, of which 40 scored, 28 of 40 (70%) to pass.
  // Length and time of the April to May 2027 sitting not yet announced. Content: UHR's study
  // material "Sverige i fokus" (1st ed., corrected 2026-08-10), whose chapters are the ten
  // categories below (val och partier joined with demokrati, arbete with välfärd, religion with
  // traditioner); UHR publishes no weights, so the 6/7/6/7/4/7/7/7/4/5 split is Tigertest's.
  // Three 60-question tests; each pool is 3x its count plus 2 training-only spares (200, all
  // original, written in Swedish).
  blueprint: {
    smdbLandet: 6,
    smdbDemokrati: 7,
    smdbStyrning: 6,
    smdbLag: 7,
    smdbMedier: 4,
    smdbRattigheter: 7,
    smdbArbete: 7,
    smdbHistoria: 7,
    smdbOmvarlden: 4,
    smdbReligion: 5,
  },
  // Five topic sets, then the three tests: 8 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 23501, name: "Landet, demokratin och valen", categories: ["smdbLandet", "smdbDemokrati"], size: 43, weightLabel: "13 av 60 frågor per prov" },
    { setNumber: 2, id: 23502, name: "Styrning, lag och rätt", categories: ["smdbStyrning", "smdbLag"], size: 43, weightLabel: "13 av 60 frågor per prov" },
    { setNumber: 3, id: 23503, name: "Medier och mänskliga rättigheter", categories: ["smdbMedier", "smdbRattigheter"], size: 37, weightLabel: "11 av 60 frågor per prov" },
    { setNumber: 4, id: 23504, name: "Arbete, välfärd och historia", categories: ["smdbArbete", "smdbHistoria"], size: 46, weightLabel: "14 av 60 frågor per prov" },
    { setNumber: 5, id: 23505, name: "Omvärlden, religion och traditioner", categories: ["smdbOmvarlden", "smdbReligion"], size: 31, weightLabel: "9 av 60 frågor per prov" },
  ],
  categoryLabels: {
    smdbLandet: "Landet Sverige",
    smdbDemokrati: "Demokrati, val och partier",
    smdbStyrning: "Så styrs Sverige",
    smdbLag: "Lag och rätt",
    smdbMedier: "Mediernas roll",
    smdbRattigheter: "Mänskliga rättigheter",
    smdbArbete: "Arbete, privatekonomi och välfärd",
    smdbHistoria: "Sveriges moderna historia",
    smdbOmvarlden: "Sverige och omvärlden",
    smdbReligion: "Religion, traditioner och högtider",
  },
  copy: {
    guestPrompt: "för att spara dina framsteg inför medborgarskapsprovet och hålla koll på varje fel svar",
    trainingHeading: "Övningsset",
    trainingSub: "Varje övningsset tar upp två kapitel ur Sverige i fokus. Du får svar direkt, och frågor du svarar fel på kommer tillbaka tills du kan dem.",
    testsHeading: "Övningsprov · 60 frågor, 70 procent för godkänt",
    heroSubs: [
      "Fem övningsset, tre övningsprov. Demokrati, lag, rättigheter, välfärd och historia kommer oftast.",
      "Klara övningssetet först, sedan övningsprovet.",
      "Halvvägs. Gör ett övningsprov.",
      "Repetera dina fel och testa igen.",
      "Allt grönt. Du är redo för medborgarskapsprovet.",
    ],
    sourceLine: "Utifrån UHR:s utbildningsmaterial Sverige i fokus och svensk lag, november 2026. Egna frågor, inte UHR:s; 60 per övningsprov och 70 procent för godkänt.",
    analyticsKey: "semedb",
  },
};
```

Append `semedb` to the `EXAMS` array with the other citizenship tests (after `aucit`). No
`translations`. Set names are Swedish topic names, so `TEST_SET_NAMES.sv` is not used.
`ExamDashboard` shows topic sets first, then the tests (like `detheorie`, `uklitu`).
Five-digit idBase: `getExamForTestId` / `getExamForSetId` are range checks, fine.

## lib/banks/all.ts

```ts
import "./semedb";
```

## types/index.ts

- `QuestionType`: add `| "SEMEDB"`.
- `QuestionCategory`, under a `// Swedish citizenship test (medborgarskapsprovet, civics)` comment:

```ts
  | "smdbLandet"
  | "smdbDemokrati"
  | "smdbStyrning"
  | "smdbLag"
  | "smdbMedier"
  | "smdbRattigheter"
  | "smdbArbete"
  | "smdbHistoria"
  | "smdbOmvarlden"
  | "smdbReligion"
```

(`smdb` is unused in `types/index.ts` as of 2026-11-06.)

## i18n

Results and stats read `exam.categoryLabels` first (Swedish above). Add English labels to
`i18n/en.ts` (and `es`, `ko`, `vi`, `zh`, which keep English labels for exam categories):

```ts
    smdbLandet: "The Country of Sweden",
    smdbDemokrati: "Democracy, Elections & Parties",
    smdbStyrning: "How Sweden Is Governed",
    smdbLag: "Law & Justice",
    smdbMedier: "The Role of the Media",
    smdbRattigheter: "Human Rights",
    smdbArbete: "Work, Personal Finance & Welfare",
    smdbHistoria: "Sweden's Modern History",
    smdbOmvarlden: "Sweden & the World",
    smdbReligion: "Religion, Traditions & Holidays",
```

`i18n/sv.ts` carries no category names (platform rule); nothing to add there.

## lib/shuffleOptions.ts

The `sv` patterns are in place. The bank has no position-dependent options ("A och B", "Båda",
"Alla svaren", "ovanstående"); `build.py` asserts it. 30 all-number items (years, counts,
"2,5 miljoner", "250 000") are sorted ascending by the build, the key at an end slot in 15 of 30.

## app/globals.css

The suggested `215 60% 36%` clashes with eight themes under the 8-degree rule (boating, civics,
the five UK driving themes, phcse). Checked with a script against every light `[data-theme]`
`--brand` (2026-11-06): the 205 to 230 band is full except very dark or very grey blues.
`212 90% 22%` is clear (nearest: `hkiiqe1` 215 70 22 differs by 20 saturation; `boating` 215 65 32
by 10 lightness; `sie` 204 is 8 degrees off at 28% lightness, 6 points lighter and 30 points less
saturated), a deep Swedish-flag blue. White text about 13:1. Then run `tools/gen_dark_brand_css.py`.
Siblings: `sehp` 265 55% 30%, `semoto` 50 65% 22%; no clash.

```css
  /* Swedish citizenship test (medborgarskapsprovet) theme */
  [data-theme="semedb"] {
    --brand: 212 90% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 212 70% 95%;
    --brand-hover: 212 90% 17%;
    --brand-dark: 212 90% 14%;
    --brand-darker: 212 90% 9%;
    --brand-muted: 212 35% 64%;
    --brand-border: 212 40% 76%;
    --brand-border-light: 212 45% 88%;
    --brand-gradient-to: 48 90% 92%;
  }
```

(Gradient ends on the flag's yellow, like `setrafik`.)

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `semedb: "Three 60-question mock tests in Swedish for the Swedish citizenship test in civics (medborgarskapsprovet): democracy and elections, how Sweden is governed, law and the courts, the media, human rights, work and welfare, modern history, Sweden and the world, religion and traditions, written from UHR's study material Sverige i fokus.",`
- `EXAM_ORG`: `semedb: "UHR (Universitets- och högskolerådet) · medborgarskapsprov i samhällskunskap, in Swedish",`
- Hub group: the research notes for this exam put it with the other citizenship tests:
  `{ title: "Citizenship tests", ids: ["civics", "uklitu", "cacit", "aucit", "semedb"] },`
  Alternative (sehp's WIRING proposes it): a "Sweden tests" group right after
  "EU driving theory tests" with `["sehp", "semedb", "sejakt"]`. Pick one; if semedb goes in the
  Sweden group, add `RELATED_OVERRIDES.semedb = ["uklitu", "cacit", "aucit"]` so its landing still
  links the other citizenship tests.
- `SEARCH_ALIASES` (Swedish and English):
  `semedb: "medborgarskapsprov medborgarskapsprovet medborgarskapsprov samhällskunskap medborgarskapsprovet frågor medborgarskap prov svenskt medborgarskap medborgarskapstest sverige i fokus uhr medborgarskap migrationsverket medborgarskap samhällsorientering samhällskunskap prov sverige swedish citizenship test sweden citizenship test swedish citizenship exam civics test sweden swedish naturalisation test swedish naturalization test sweden civics",`

## lib/region.ts

- `TEST_REGIONS`: add `semedb: "SE",` (next to `setrafik: "SE"`).
- `NON_DRIVING_TESTS`: add `"semedb"` (with `uklitu`, `cacit`, `aucit`).
- Region language: the shared Sweden decision in `semoto`'s WIRING (switch SE to `lang: "sv"` or
  keep it English). Either way this exam's landing and app pages are Swedish
  (`lib/pageLanguage.ts`). If SE goes Swedish, the `REGION_HOME.SE` there can name this test in
  `testsSub`; if SE stays English, semedb shows in the Sweden list under `english.name`.
  A suggested Swedish line for the "Also in Sweden" list or an FAQ (`faqsFor("SE")`):
  `{ q: "Finns det övning inför medborgarskapsprovet?", a: "Ja. Tigertest har 200 egna frågor på svenska om allt som UHR:s material Sverige i fokus tar upp, och tre övningsprov med 60 frågor. Gratis och utan inloggning." }`

## app/sv/layout.tsx

Shared by every `/sv` landing; created once by whichever of semoto, sehp, sejakt, semedb lands
first (copy in `semoto`'s WIRING). `lib/urlLanguage.ts` already has the `/sv` prefix.
`TranslatedExamLanding` must accept the base language (`lang === exam.language` uses
`exam.landingPath`, locale `sv-SE`); the offer currency for SE is SEK (`CURRENCY.SE` exists).

## lib/landingContent.ts

```ts
import semedbSv from "@/lib/landings/semedb.sv.json";
  "semedb.sv": semedbSv as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  semedb: {
    answer:
      "Since 6 June 2026, applicants for Swedish citizenship aged 16 to 66 must show knowledge of Swedish society. Those who cannot show it with grades from Swedish schooling can take the citizenship test in civics (medborgarskapsprovet i samhällskunskap), run by the Swedish Council for Higher Education (UHR) under Ordinance (2026:451); only people sent a letter by the Swedish Migration Agency can register. The test is in Swedish, on paper, with four options per question and one right answer. At the first sitting on 15 August 2026 there were, per press reports, 60 questions in 90 minutes, of which 40 were scored, and 28 of 40 (70%) was needed to pass; about eight in ten passed. UHR has not yet announced the length or time of the next sitting, planned for April to May 2027. The test is based on UHR's free study material Sverige i fokus, written with the Swedish National Agency for Education. A separate Swedish-language test is to follow later.",
    rows: [
      { label: "Run by", value: "UHR (Swedish Council for Higher Education)" },
      { label: "Who takes it", value: "Citizenship applicants aged 16 to 66, on a letter from Migrationsverket" },
      { label: "Questions", value: "60 multiple choice, 40 scored (August 2026, per press reports)" },
      { label: "Pass mark", value: "28 of 40 scored questions, 70% (August 2026)" },
      { label: "Time", value: "90 minutes (August 2026)" },
      { label: "Format and language", value: "On paper, in Swedish, four options, one right" },
      { label: "Study material", value: "Sverige i fokus (UHR and Skolverket)" },
      { label: "Tigertest mock tests", value: "3 x 60 questions in Swedish, 70% target" },
    ],
    basedOn: "UHR's citizenship test pages, the study material Sverige i fokus (corrected 10 August 2026), Ordinance (2026:451) on citizenship tests, Migrationsverket's notices of 6 May and 30 September 2026 and press reports of the 15 August 2026 sitting, checked November 2026",
    source: { name: "UHR: About the citizenship test (in Swedish)", url: "https://www.uhr.se/medborgarskapsprovet/om-medborgarskapsprovet/" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Swedish)" like `detheorie`; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave, then
`npx tsx scripts/build-landing-dates.ts`.

## lib/tigerAssets.ts

Add to `BORROWED_SETS`: `semedb: "uklitu",` (the citizenship tiger; `civics` is the US one).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Citizenship tests are teacher-led (`uklitu`, `cacit`, `aucit` are in both lists):
- `TEACHER_LED`: add `"semedb"` next to `"uklitu", "cacit", "aucit"`.
- `TEACHES`: `semedb: "SFI, samhällsorientering or folkhögskola civics classes",`
  (If `TranslatedExamLanding` renders `ExamClassFaq` in Swedish, the Swedish line is
  "SFI-, samhällsorienterings- eller folkhögskolekurser".)

## lib/examFreshness.json

A dated change the bank must follow: UHR announces the length, time and pass mark of the April to
May 2027 sitting. Suggested event (`python3 -I tools/check_freshness.py`):

```json
{
  "exam": "semedb",
  "date": "2027-03-01",
  "kind": "format",
  "what": "UHR announces the length, time and pass mark of the April to May 2027 civics sitting (August 2026 was a trial: 60 questions, 40 scored, 28 of 40).",
  "action": "Update testCount, questionsPerTest and passPct, the landing JSON and EXAM_FACTS to the announced format.",
  "source": "https://www.uhr.se/medborgarskapsprovet/om-medborgarskapsprovet/"
}
```


## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check `/sv/medborgarskapsprov-ovning` is emitted once, hreflang
`sv-SE` and x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 31 to 46 (all at most 60),
so no parts. Then `python3 -I tools/build_exam_sources.py` (sources.md lists UHR, the Sverige i
fokus PDF and the ordinance first).

## Screenshots

`TranslatedExamLanding` reads `/landing/semedb-{mobile,desktop}-sv.png` (and the `-dark` twins):
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing semedb:medborgarskapsprovet:23501`
then rename to the `-sv` names (as for `detheorie`'s `-de`).

## CLAUDE.md (after the Australian Citizenship bullet)

```md
- **Medborgarskapsprovet** (`semedb`, the Swedish citizenship test in civics, medborgarskapsprov i samhällskunskap, base language Swedish, `language: "sv"`, `locale: "sv-SE"`, English names in `english`, `review: { sv: "model" }`, `/medborgarskapsprovet/*`, landing `/sv/medborgarskapsprov-ovning` from `lib/landings/semedb.sv.json`): `data/sweden-citizenship-test-questions.json` (200 original questions written in Swedish, in "du", along the chapters of UHR's study material Sverige i fokus (1st ed., corrected 10 August 2026): landet Sverige 20, demokrati, val och partier 23, så styrs Sverige 20, lag och rätt 23, mediernas roll 14, mänskliga rättigheter 23, arbete, privatekonomi och välfärd 23, modern historia 23, Sverige och omvärlden 14, religion, traditioner och högtider 17), three real-length tests of 60 (test IDs 23501-23503, 6/7/6/7/4/7/7/7/4/5 per test, Tigertest's split since UHR publishes none; the last two items of each pool, 20 in all, are training-only) and five Swedish-named topic sets 23501-23505 (43/43/37/46/31), 8 dashboard steps, state `SEMEDB`, prefix `SEMEDB-`, 70% pass (42 of 60). Real test (UHR under Förordning (2026:451), checked November 2026): in Swedish, on paper, four options and one right; at the first sitting (15 August 2026, a trial) 60 questions in 90 minutes, 40 scored, 28 of 40 to pass, per press reports; the length of the April to May 2027 sitting is not yet announced, and a Swedish-language test follows later. Applicants aged 16 to 66 without qualifying grades take it on a letter from Migrationsverket. UHR's five example questions are not reused; no named office-holders, party lists, fees or the age of criminal responsibility (a 2026 proposal). Built by `tools/next100/semedb/build.py` (sorts all-number options: years, "2,5 miljoner", "250 000"); sources in `tools/next100/semedb/sources.md`, terms in `glossary.md`. Region SE, hub group "Citizenship tests", `[data-theme="semedb"]` deep Swedish blue, borrows the Life in the UK tiger, teacher-led (SFI and samhällsorientering).
```

## Decisions for the integrator

1. **Hue.** Suggested `215 60% 36%` clashes with eight themes; `212 90% 22%` passes the rule.
2. **Hub group.** "Citizenship tests" (research notes) or a shared "Sweden tests" group with
   sehp and sejakt (sehp's proposal). Whichever, keep the citizenship cross-links.
3. **Format is press-reported.** UHR's site confirms Swedish, paper and four options with one
   right, but gives no count, time or pass mark; 60 / 90 min / 40 scored / 28 of 40 are from
   hurbra.se, TV4 and Wikipedia and are labelled "augusti 2026" on the landing. Re-check when UHR
   announces the spring 2027 sitting (freshness event above).
4. **Test length.** 3 x 60 at 70% (42 of 60) as the research notes asked, with 20 spares.
   The real pass is 28 of the 40 scored, which equal-weight scoring of 60 cannot model exactly.
5. **Region language.** Shared Sweden decision (see `semoto`).
6. **Review.** `review: { sv: "model" }`; a native Swedish reviewer pass is still owed.
