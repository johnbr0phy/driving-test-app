# Wiring for `sejakt` (Swedish hunting licence theory test, jägarexamen teoriprov, written in Swedish, v1)

A native-language exam (base language Swedish, `language: "sv"`), built from the `detheorie`
template. Files already written by the builder:
- `data/sweden-hunting-theory-questions.json` (210, validator PASS with `--lang sv --rows 210`)
- `lib/banks/sejakt.ts`
- `app/jagarexamen/*` (5 wrappers: layout, page, dashboard, drill, stats; copied from `app/fuehrerschein-theorie/`)
- `lib/landings/sejakt.sv.json` (Swedish landing content, Swedish `facts.source`)
- `app/sv/jagarexamen-teoriprov/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `sv`)
- `tools/next100/sejakt/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/sejakt/build.py`. Validate with
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/sweden-hunting-theory-questions.json --lang sv --rows 210 --pool sejkArter=36 --pool sejkLag=36 --pool sejkSakerhet=30 --pool sejkVapen=30 --pool sejkEtik=24 --pool sejkMetoder=21 --pool sejkVilt=18 --pool sejkKott=15`.
Everything below goes in shared files.

Format note (checked 2026-11-06, see sources.md): NFS 2015:10 13 a § as amended by NFS 2019:8:
70 questions in at most 60 minutes, at least 60 correct; 13 b §: up to three unscored test
questions. Naturvårdsverket's page (reviewed 26 Oct 2026): four options, one correct, sometimes a
picture; done in the app "Teoriprov för jägarexamen" on your own phone or tablet before a
provledare; preliminary result, approved by the provledare; Swedish or English (the whole test
switches to English in the app), audio, interpreter at own cost approved by the hunting
organisation; questions are secret. Practical shooting tests follow a passed theory test.
Tigertest models three real-length 70-question tests (210 items, pools exactly 3x, every item in
exactly one test), `passPct: 85` = ceil(0.85 x 70) = 60 of 70, the real line. Five topic sets
23401-23405 + 3 tests = 8 dashboard steps. Picture questions and the shooting tests are not
modelled; the landing says so.

## lib/exams.ts

Add `"sejakt"` to the `ExamId` union. Icon `target` already exists (hunter, nzfirearms). idBase
23400 (test ids 23401-23403, set ids 23401-23405) as assigned in the batch row; check it is still
free. Set ids share numbers with test ids like `detheorie` (topic sets, not `testSets()`).

```ts
const sejakt: ExamConfig = {
  id: "sejakt",
  stateCode: "SEJAKT",
  idBase: 23400,
  slug: "/jagarexamen",
  landingPath: "/sv/jagarexamen-teoriprov",
  name: "Jägarexamen teoriprov",
  shortName: "Jägarexamen",
  examLabel: "Teoriprov i jägarexamen",
  fullName: "Jägarexamen, teoretiskt prov (Naturvårdsverket)",
  questionIdPrefix: "SEJAKT-",
  icon: "target",
  testCount: 3,
  questionsPerTest: 70,
  passPct: 85,
  language: "sv",
  locale: "sv-SE",
  english: {
    name: "Sweden Hunting Licence Theory Test (Jägarexamen)",
    shortName: "Swedish hunting licence test",
    fullName: "Swedish hunting licence theory test (jägarexamen, teoriprov), in Swedish",
  },
  review: { sv: "model" },
  // Real test (NFS 2015:10 13 a-13 b §§ as amended by NFS 2019:8; Naturvårdsverket's teoriprov
  // page, checked 2026-11-06): 70 questions, at most 60 minutes, at least 60 correct, up to three
  // unscored test questions; four options, one correct; app on own device before a provledare;
  // Swedish or English. Categories group the 16 areas of Naturvårdsverket's kompetensbeskrivning
  // (2020); no weights are published, so the 12/12/10/10/8/7/6/5 split is Tigertest's own.
  // Three tests of 70, pools exactly 3x (210, all original, written in Swedish). passPct 85 gives
  // ceil(59.5) = 60 of 70, the real pass line.
  blueprint: {
    sejkArter: 12,
    sejkLag: 12,
    sejkSakerhet: 10,
    sejkVapen: 10,
    sejkEtik: 8,
    sejkMetoder: 7,
    sejkVilt: 6,
    sejkKott: 5,
  },
  // Five topic sets, then the three tests: 8 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 23401, name: "Viltarter och ekologi", categories: ["sejkArter"], size: 36, weightLabel: "12 av 70 frågor per prov" },
    { setNumber: 2, id: 23402, name: "Jakt- och vapenlagar", categories: ["sejkLag"], size: 36, weightLabel: "12 av 70 frågor per prov" },
    { setNumber: 3, id: 23403, name: "Säkerhet, vapen och ammunition", categories: ["sejkSakerhet", "sejkVapen"], size: 60, weightLabel: "20 av 70 frågor per prov" },
    { setNumber: 4, id: 23404, name: "Etik, eftersök och jaktmetoder", categories: ["sejkEtik", "sejkMetoder"], size: 45, weightLabel: "15 av 70 frågor per prov" },
    { setNumber: 5, id: 23405, name: "Viltvård och viltkött", categories: ["sejkVilt", "sejkKott"], size: 33, weightLabel: "11 av 70 frågor per prov" },
  ],
  categoryLabels: {
    sejkArter: "Artkännedom och ekologi",
    sejkLag: "Jakt- och vapenlagstiftning",
    sejkSakerhet: "Säkerhet vid vapenhantering",
    sejkVapen: "Vapen, ammunition och ballistik",
    sejkEtik: "Jaktetik, skadskjutning och eftersök",
    sejkMetoder: "Jaktmetoder och jakthundar",
    sejkVilt: "Viltvård, viltförvaltning och fångst",
    sejkKott: "Omhändertagande av fällt vilt",
  },
  copy: {
    guestPrompt: "för att spara dina framsteg inför jägarexamen och hålla koll på varje fel svar",
    trainingHeading: "Övningsset",
    trainingSub: "Varje övningsset tar upp ett eller två ämnen från teoriprovet. Du får svar direkt, och frågor du svarar fel på kommer tillbaka tills du kan dem.",
    testsHeading: "Övningsprov · 70 frågor, 60 rätt för godkänt",
    heroSubs: [
      "Fem övningsset, tre övningsprov. Viltarter och jaktlagar kommer oftast.",
      "Klara övningssetet först, sedan övningsprovet.",
      "Halvvägs. Gör ett övningsprov.",
      "Repetera dina fel och testa igen.",
      "Allt grönt. Boka ditt teoriprov.",
    ],
    sourceLine: "Enligt jaktlagen, jaktförordningen, vapenlagen och Naturvårdsverkets föreskrifter, november 2026. Egna frågor, inte Naturvårdsverkets; 70 per övningsprov, utan bildfrågor.",
    analyticsKey: "sejakt",
  },
};
```

Append `sejakt` to the `EXAMS` array (after the Swedish tests `setrafik`/`semoto`, or with the
other licence exams). No `translations` (an English version would be `translations.en` on this id;
Naturvårdsverket offers the real test in English, so it is a sensible phase-2 candidate). Set names
are Swedish topic names, so `TEST_SET_NAMES.sv` is not used.

## lib/banks/all.ts

```ts
import "./sejakt";
```

## types/index.ts

- `QuestionType`: add `| "SEJAKT"`.
- `QuestionCategory`, under a `// Sweden hunting licence theory test (jägarexamen)` comment:

```ts
  | "sejkArter"
  | "sejkLag"
  | "sejkSakerhet"
  | "sejkVapen"
  | "sejkEtik"
  | "sejkMetoder"
  | "sejkVilt"
  | "sejkKott"
```

## i18n

Results and stats read `exam.categoryLabels` first (Swedish above). Add English labels to
`i18n/en.ts` (and `es`, `ko`, `vi`, `zh`, which keep English labels for exam categories):

```ts
    sejkArter: "Species & Ecology",
    sejkLag: "Hunting & Firearms Law",
    sejkSakerhet: "Firearm Safety",
    sejkVapen: "Firearms, Ammunition & Ballistics",
    sejkEtik: "Ethics, Wounded Game & Tracking",
    sejkMetoder: "Hunting Methods & Dogs",
    sejkVilt: "Game Management & Trapping",
    sejkKott: "Handling Game Meat",
```

`i18n/sv.ts` has no category names (platform rule); nothing to add there.

## lib/shuffleOptions.ts

The `sv` patterns are in place. No position-dependent options ("A och B", "Båda", "Alla svaren");
`build.py` asserts it. Ten all-number items are sorted ascending by the build (key in an end slot
in 5 of them); "1 minut" / "N minuter" and "1 timme" / "N timmar" count as one unit.

## validate_bank.py KNOWN_BANKS (.claude/skills/exam-bank/scripts/validate_bank.py)

The bank is 210 rows by design (three real-length 70-question tests), like `de-theorie`:

```py
    "sweden-hunting-theory-questions.json": dict(rows=210, why="three real-length 70-question tests"),
```

## app/globals.css

Suggested `95 35% 26%` clashes with `nptepta` (100 30 26). Checked with a script against every
light and dark `--brand`: the moss band is full at lightness 30 to 42, and `95 45% 22%` is clear
(nearest: `pakarmy` 95 70 18 differs by 25 saturation; `nptepta` 100 30 26 by 15 saturation;
`gcsescience` 103 58 30 by 8 lightness). A dark moss green; white text well over 4.5:1. Below
the house 30% lightness floor, like `pakarmy`, `nzheavy` and `semoto`. Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Sweden hunting licence theory test (jägarexamen) theme */
  [data-theme="sejakt"] {
    --brand: 95 45% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 95 40% 95%;
    --brand-hover: 95 45% 17%;
    --brand-dark: 95 45% 14%;
    --brand-darker: 95 45% 9%;
    --brand-muted: 95 25% 60%;
    --brand-border: 95 25% 76%;
    --brand-border-light: 95 30% 88%;
    --brand-gradient-to: 95 45% 92%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `sejakt: "Three 70-question tests in Swedish for the theory test of the Swedish hunting licence (jägarexamen): game species, hunting and firearms law, firearm safety, cartridge classes and ballistics, ethics and tracking wounded game, hunting methods and dogs, game management and handling game meat, written from Swedish law as of November 2026, with the real 60 of 70 pass line.",`
- `EXAM_ORG`: `sejakt: "Naturvårdsverket · jägarexamen theory test, in Swedish",`
- Hub group: a new Sweden group for the non-driving tests, right after `"EU driving theory tests"`
  (Sweden's driving tests `setrafik` and `semoto` stay there). Shared with the sibling builders
  `sehp` and `semedb`; keep one group with all three if they land together:
  `{ title: "Sweden licences and tests", ids: ["sejakt", "semedb", "sehp"] },`
  (title per the batch row is "Sweden licences"; with SweSAT in it "Sweden licences and tests"
  reads better; the integrator picks.)
- `RELATED_OVERRIDES` (needed while the Sweden group has fewer than three other members):
  `sejakt: ["nzfirearms", "hunter", "capal"],`
- `SEARCH_ALIASES` (Swedish and English):
  `sejakt: "jägarexamen jagarexamen jägarexamen teoriprov teoriprov jägarexamen jägarexamen prov jägarexamen frågor öva jägarexamen jaktexamen jaktkort jaktlicens vapenlicens jakt jägare jägarskolan jaktboken naturvårdsverket svenska jägareförbundet jägarnas riksförbund älgjakt kulpatron klass 1 sweden hunting licence test swedish hunting exam swedish hunter exam hunting licence sweden swedish hunting theory test",`
- Native name on Swedish surfaces, `english.name` elsewhere (as `detheorie`).

## lib/region.ts

- `TEST_REGIONS`: add `sejakt: "SE",` (next to `setrafik: "SE"`).
- Add `"sejakt"` to `NON_DRIVING_TESTS`.
- Region language: shared decision with `semoto`, `sehp` and `semedb` (see semoto's WIRING.md:
  switch SE to `lang: "sv"` with `app/se/layout.tsx` and a Swedish `REGION_HOME.SE`, or keep it
  English). If `REGION_HOME.SE` gets a section for non-driving tests, a Swedish line for it:
  "Teoriprov för jägarexamen med 210 egna frågor på svenska, med samma gräns som på riktigt: 60 rätt av 70."

## app/sv/layout.tsx

Shared with every /sv landing; created once (semoto's WIRING.md has the block).
`lib/urlLanguage.ts` already has `{ prefix: "/sv", lang: "sv", includeRoot: false }`.

## lib/landingContent.ts

```ts
import sejaktSv from "@/lib/landings/sejakt.sv.json";
  "sejakt.sv": sejaktSv as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  sejakt: {
    answer:
      "The theory test of the Swedish hunting licence (jägarexamen) has 70 multiple-choice questions to be answered in at most 60 minutes, and you need at least 60 correct to pass. Each question has four options with one correct answer, sometimes with a picture. Naturvårdsverket, the Swedish Environmental Protection Agency, is responsible for the test, which you take in an app on your own phone or tablet in front of an approved test supervisor (provledare), often through a hunting organisation. You first see a preliminary result, which the supervisor then approves. The test is in Swedish and can be switched to English in the app, and the questions can be read aloud. Naturvårdsverket may add up to three unscored test questions and does not publish the questions. You must pass the theory test before the practical shooting tests for shotgun and rifle, and jägarexamen is required before you can get a licence for a hunting weapon.",
    rows: [
      { label: "Run by", value: "Naturvårdsverket (Swedish Environmental Protection Agency), through approved test supervisors" },
      { label: "Questions", value: "70, four options each, plus up to 3 unscored" },
      { label: "Time", value: "At most 60 minutes" },
      { label: "Pass mark", value: "At least 60 of 70 correct" },
      { label: "Format", value: "App on your own phone or tablet, before a provledare" },
      { label: "Languages", value: "Swedish or English, with audio" },
      { label: "Afterwards", value: "Practical shooting tests (shotgun, rifle, big game)" },
      { label: "Tigertest mock tests", value: "3 x 70 questions in Swedish, 60 to pass" },
    ],
    basedOn: "Naturvårdsverket's regulations on jägarexamen (NFS 2015:10 as amended by NFS 2019:8), its theory test page and the 2020 kompetensbeskrivning, checked November 2026",
    source: { name: "Naturvårdsverket: theory test for jägarexamen", url: "https://www.naturvardsverket.se/amnesomraden/jakt-och-vilt/for-jagare/teoriprov-jagarexamen/" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Swedish)" like `detheorie`; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave, then
`npx tsx scripts/build-landing-dates.ts`.

## lib/tigerAssets.ts

`BORROWED_SETS`: `sejakt: "hunter",` (like `nzfirearms`).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Jägarexamen is usually taken after a course (study circles and courses run by the hunting
organisations), so it fits `TEACHER_LED`: add `"sejakt"` there and to `TEACHES`:
`sejakt: "a jägarexamen course",`
(The class FAQ string is English; `TranslatedExamLanding` renders the Swedish landing, so this
only affects English surfaces. Leave it out if the class FAQ cannot be localised.)

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check `/sv/jagarexamen-teoriprov` is emitted once, hreflang `sv-SE`,
x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts and checks

- `npx tsx scripts/build-training-parts.ts` (sets are 33 to 60, all at most 60, so no parts).
- `python3 -I tools/build_exam_sources.py` (sources.md lists Naturvårdsverket and lagen.nu first).
- `python3 -I tools/check_banks.py` passed with the new bank on disk (2026-11-06).

## Screenshots

`TranslatedExamLanding` reads `/landing/sejakt-{mobile,desktop}-sv.png` (and the `-dark` twins):
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing sejakt:jagarexamen:23401`
then rename to the `-sv` names (as for `detheorie`'s `-de`).

## CLAUDE.md (after the Swedish driving tests or with the native-language exams)

```md
- **Jägarexamen teoriprov** (`sejakt`, the theory test of the Swedish hunting licence, base language Swedish, `language: "sv"`, `locale: "sv-SE"`, English names in `english`, `review: { sv: "model" }`, `/jagarexamen/*`, landing `/sv/jagarexamen-teoriprov` from `lib/landings/sejakt.sv.json`): `data/sweden-hunting-theory-questions.json` (210 original questions written in Swedish, in "du", on the 16 areas of Naturvårdsverket's kompetensbeskrivning (2020) grouped as species and ecology 36, hunting and firearms law 36, firearm safety 30, firearms, ammunition and ballistics 30, ethics, wounded game and tracking 24, hunting methods and dogs 21, game management and trapping 18, handling game meat 15), three real-length tests (IDs 23401-23403, 70 questions each, 12/12/10/10/8/7/6/5 per test, Tigertest's split, no spares) and five Swedish-named topic sets 23401-23405 (Viltarter och ekologi 36, Jakt- och vapenlagar 36, Säkerhet, vapen och ammunition 60, Etik, eftersök och jaktmetoder 45, Viltvård och viltkött 33), 8 dashboard steps, state `SEJAKT`, prefix `SEJAKT-`, 85% pass (60 of 70, the real line: NFS 2015:10 13 a § as amended by NFS 2019:8, 70 questions in at most 60 minutes; up to three unscored test questions; app on own device before a provledare, preliminary result approved by the provledare; Swedish or English). Naturvårdsverket keeps the questions secret, so all items are written from jaktlagen (1987:259, as amended to SFS 2026:832, including 9 a § on putting down badly injured game from 1 July 2026), jaktförordningen (1987:905), vapenlagen (1996:67), NFS 2023:8 (cartridge classes 1 to 4, barrel lengths, magazine limits, 4,1 mm shot, slugs, lead shot near wetlands, thermal sights for wild boar), terrängkörningslagen and the dog supervision law; no hunting season dates, fees or volume limits; animals described in words. Picture questions and the practical shooting tests are not modelled. Built by `tools/next100/sejakt/build.py` (sorts all-number options with Swedish decimal commas); sources in `tools/next100/sejakt/sources.md`, terms in `glossary.md`. Region SE, hub group "Sweden licences and tests", `[data-theme="sejakt"]` dark moss green (95 45% 22%), borrows the hunter tiger.
```

## Decisions for the integrator

1. **Test length.** Three real-length 70-question tests (210 items) rather than 4 x 50, so the
   mock matches the real 60-of-70 rule exactly; needs the `KNOWN_BANKS` line above.
2. **Hue.** Suggested `95 35% 26%` clashes with `nptepta`; `95 45% 22%` is clear but below the
   30% lightness floor (no clear moss hue exists at 30 to 42).
3. **Region language and hub group** shared with semoto, sehp and semedb.
4. **New law.** One item (SEJAKT-LAG-029) relies on jaktlagen 9 a §, in force 1 July 2026
   (SFS 2026:832); its explanation dates it.
5. **Review.** `review: { sv: "model" }`; a native Swedish reviewer pass is still owed.

## Review (2026-11-07)

Reviewed per tools/next100/REVIEW.md. Bank rebuilt, validator PASS. Fixes in the sources (ids unchanged):
SEJAKT-VAP-002 and -VAP-003 (ambiguous: "lägsta klass" could mean klass 1; now "svagaste klassen"),
SEJAKT-VAP-017 (distractor Älg replaced: NFS 2023:8 allows some night equipment for hjortdjur where
dygnet-runt-jakt is allowed), SEJAKT-LAG-014 (key wording, explanation cited 22 § for the
länsstyrelse exception that is in 23 §), SEJAKT-LAG-022 (stem word order, explanation cites 9 §),
SEJAKT-ETI-012 (distractors "i dagsljus" made the key stand out; unverified exception removed),
SEJAKT-ETI-019 (explanation now quotes the four 44 § factors), SEJAKT-SAK-004 (key "kan svikta" ->
"kan fallera"), SEJAKT-ART-020 (grammar). Naturvårdsverket's teoriprov page moved to
/for-jagare/teoriprov-jagarexamen/; the examFacts block above, the landing JSON and sources.md use it.
