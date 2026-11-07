# Wiring for `semoto` (Sweden motorcycle knowledge test, A1, A2 and A, written in Swedish, v1)

Tigertest's first Swedish-language exam: the base bank and base copy are Swedish
(`language: "sv"`). Trafikverket's motorcycle test page names no English version, so there is no
English translation. Files already written by the builder:
- `data/sweden-motorcycle-theory-questions.json` (200, validator PASS with `--lang sv`)
- `lib/banks/semoto.ts`
- `app/motorcykel-teori/*` (5 wrappers copied from `app/fuehrerschein-theorie/`)
- `lib/landings/semoto.sv.json` (Swedish landing content, Swedish `facts.source`)
- `app/sv/motorcykel-teoriprov/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `sv`)
- `tools/next100/semoto/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/semoto/build.py`. Everything below goes in shared files.

Format note: the real test (Trafikverket, checked 2026-11-06) is 70 questions with one right
answer, 5 of them unscored trial questions, max 65 points, 52 to pass (80%), 50 minutes, on a
computer, questions can be heard in Swedish; extended time, oral test or interpreter on
application. Five knowledge areas, no published weights. Tigertest models four 50-question tests
at the same 80% (40 of 50), every item in exactly one test, plus five topic sets: 9 dashboard
steps. Photo and risk-situation questions are not modelled; the landing says so.

## lib/exams.ts

Add `"semoto"` to the `ExamId` union. Icon `bike` already exists. idBase 23200 (ids 23201-23205)
was assigned in the batch table; check it is still free. Set ids 23201-23205 share numbers with
test ids 23201-23204 like `detheorie` (topic sets, not `testSets()`).

```ts
const semoto: ExamConfig = {
  id: "semoto",
  stateCode: "SEMOTO",
  idBase: 23200,
  slug: "/motorcykel-teori",
  landingPath: "/sv/motorcykel-teoriprov",
  name: "Teoriprov motorcykel A, A1, A2",
  shortName: "MC-teori",
  examLabel: "Kunskapsprov för motorcykel",
  fullName: "Kunskapsprov för körkortsbehörighet A1, A2 och A (motorcykel)",
  questionIdPrefix: "SEMOTO-",
  icon: "bike",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  language: "sv",
  locale: "sv-SE",
  english: {
    name: "Sweden Motorcycle Theory Test (A, A1, A2)",
    shortName: "Swedish motorcycle theory test",
    fullName: "Swedish motorcycle licence knowledge test (kunskapsprov) for categories A1, A2 and A, in Swedish",
  },
  review: { sv: "model" },
  // Real test (Trafikverket, Motorcykel, checked 2026-11-06): 70 questions, one right answer each,
  // 5 unscored trial questions, max 65 points, 52 to pass (80%), 50 minutes, read aloud in Swedish.
  // Five knowledge areas (fordonskännedom och manövrering, miljö, trafiksäkerhet, trafikregler,
  // personliga förutsättningar), no published weights: the nine categories and the
  // 5/8/7/6/4/4/7/6/3 split are Tigertest's own, written from trafikförordningen (1998:1276),
  // Transportstyrelsen's A1/A2/A pages and the course plan TSFS 2011:19. Four tests of 50, pools
  // exactly 4x each count (200, all original, written in Swedish).
  blueprint: {
    semoFordon: 5,
    semoManover: 8,
    semoPlacering: 7,
    semoRegler: 6,
    semoPassagerare: 4,
    semoBehorighet: 4,
    semoVaglag: 7,
    semoPersonlig: 6,
    semoMiljo: 3,
  },
  // Five topic sets, then the four tests: 9 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 23201, name: "Motorcykeln och körtekniken", categories: ["semoFordon", "semoManover"], size: 52, weightLabel: "13 av 50 frågor per prov" },
    { setNumber: 2, id: 23202, name: "Placering och trafikregler", categories: ["semoPlacering", "semoRegler"], size: 52, weightLabel: "13 av 50 frågor per prov" },
    { setNumber: 3, id: 23203, name: "Passagerare och behörigheter", categories: ["semoPassagerare", "semoBehorighet"], size: 32, weightLabel: "8 av 50 frågor per prov" },
    { setNumber: 4, id: 23204, name: "Väglag, väder och vilt", categories: ["semoVaglag"], size: 28, weightLabel: "7 av 50 frågor per prov" },
    { setNumber: 5, id: 23205, name: "Du som förare och miljön", categories: ["semoPersonlig", "semoMiljo"], size: 36, weightLabel: "9 av 50 frågor per prov" },
  ],
  categoryLabels: {
    semoFordon: "Motorcykelns teknik och kontroller",
    semoManover: "Bromsning, kurvtagning och balans",
    semoPlacering: "Placering, synbarhet och samspel",
    semoRegler: "Trafikregler för motorcykel",
    semoPassagerare: "Passagerare, packning och släp",
    semoBehorighet: "Behörigheter och övningskörning",
    semoVaglag: "Väglag, väder, mörker och vilt",
    semoPersonlig: "Personliga förutsättningar och skydd",
    semoMiljo: "Miljö",
  },
  copy: {
    guestPrompt: "för att spara dina framsteg inför MC-teorin och hålla koll på varje fel svar",
    trainingHeading: "Övningsset",
    trainingSub: "Varje övningsset tar upp ett eller två ämnen från provet. Du får svar direkt, och frågor du svarar fel på kommer tillbaka tills du kan dem.",
    testsHeading: "Övningsprov · 50 frågor, 80 procent för godkänt",
    heroSubs: [
      "Fem övningsset, fyra övningsprov. Bromsning, kurvor och placering kommer oftast.",
      "Klara övningssetet först, sedan övningsprovet.",
      "Halvvägs. Gör ett övningsprov.",
      "Repetera dina fel och testa igen.",
      "Allt grönt. Boka ditt kunskapsprov.",
    ],
    sourceLine: "Enligt trafikförordningen och Transportstyrelsens regler för A1, A2 och A, november 2026. Egna frågor, inte Trafikverkets; 50 per övningsprov, utan bildfrågor.",
    analyticsKey: "semoto",
  },
};
```

Append `semoto` to the `EXAMS` array with the other EU driving tests (after `setrafik`, or after
`demotorrad` if that lands first). No `translations` (Trafikverket's motorcycle page offers the
test only in Swedish, so an English version is not planned). Set names are Swedish topic names,
so `TEST_SET_NAMES.sv` is not used for this exam.

Five-digit idBase: `getExamForTestId` / `getExamForSetId` are range checks (CLAUDE.md), fine.

## lib/banks/all.ts

```ts
import "./semoto";
```

## types/index.ts

- `QuestionType`: add `| "SEMOTO"`.
- `QuestionCategory`, under a `// Sweden motorcycle knowledge test (A1, A2, A)` comment:

```ts
  | "semoFordon"
  | "semoManover"
  | "semoPlacering"
  | "semoRegler"
  | "semoPassagerare"
  | "semoBehorighet"
  | "semoVaglag"
  | "semoPersonlig"
  | "semoMiljo"
```

## i18n

Results and stats read `exam.categoryLabels` first (Swedish above). Add English labels to
`i18n/en.ts` (and `es`, `ko`, `vi`, `zh`, which keep English labels for exam categories):

```ts
    semoFordon: "Motorcycle Technology & Checks",
    semoManover: "Braking, Cornering & Balance",
    semoPlacering: "Road Position & Being Seen",
    semoRegler: "Motorcycle Traffic Rules",
    semoPassagerare: "Passengers, Luggage & Trailers",
    semoBehorighet: "Licence Categories & Learner Riding",
    semoVaglag: "Road Surface, Weather & Wildlife",
    semoPersonlig: "Personal Factors & Protective Gear",
    semoMiljo: "Environment",
```

`i18n/sv.ts` has no category names (platform rule); nothing to add there.

## lib/shuffleOptions.ts

The `sv` patterns are in place. The bank has no position-dependent options ("A och B", "Båda",
"Alla svaren"); `build.py` asserts it. All-number options are sorted ascending by the build
(15 items), ages written "N år och M månader" included; the app's per-attempt shuffle is the
platform's usual behaviour for v1.

## app/globals.css

The suggested `48 85% 28%` clashes with `foodmgr` (42 90 31), `forklift` (42 80 32), `uk18ed`
(50 80 29.5) and `iesafepass` (50 85 18 dark-tinted 29) under the 8-degree rule. Checked with a
script against every `[data-theme]` `--brand`: `50 65% 22%` is clear (nearest: `iesafepass` 50 85 18
differs by 20 saturation; `jnvst` 51 65 31 by 9 lightness; `uk18ed` 50 80 29.5 by 15 saturation),
a dark mustard olive. White text 8.0:1. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Sweden motorcycle knowledge test (A1, A2, A) theme */
  [data-theme="semoto"] {
    --brand: 50 65% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 50 70% 95%;
    --brand-hover: 50 65% 17%;
    --brand-dark: 50 65% 14%;
    --brand-darker: 50 65% 9%;
    --brand-muted: 50 40% 62%;
    --brand-border: 50 45% 76%;
    --brand-border-light: 50 50% 88%;
    --brand-gradient-to: 50 80% 92%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `semoto: "Four 50-question tests in Swedish for Trafikverket's motorcycle knowledge test (kunskapsprov) for A1, A2 and A: braking and cornering, road position and being seen, helmet, light and trailer rules, passengers, licence categories and learner riding, gravel, wind and wildlife, protective gear and the environment, written from Swedish law as of November 2026.",`
- `EXAM_ORG`: `semoto: "Trafikverket · kunskapsprov för motorcykel A1, A2 och A, in Swedish",`
- Hub group: a licence category, so the driving group, right after `setrafik`:
  `{ title: "EU driving theory tests", ids: ["detheorie", "demotorrad", "esdgt", "ptimt", "bedriving", "dkteori", "setrafik", "semoto", "fitheory", "grdriving", "rodrpciv", "hukresz", "mttheory"] },`
  (keep whatever else is in the list when this lands). Sweden's non-driving siblings (sehp,
  sejakt, semedb) go in their own Sweden group; semoto does not.
- `SEARCH_ALIASES` (Swedish and English):
  `semoto: "mc teori mc-teori mc körkort mc korkort mc-körkort teoriprov motorcykel teoriprov mc kunskapsprov motorcykel kunskapsprov mc motorcykelkörkort motorcykelkorkort körkort motorcykel a1 a2 lätt motorcykel mellanstor motorcykel tung motorcykel mc prov trafikverket mc riskutbildning mc knix sweden motorcycle theory test swedish motorcycle licence test swedish motorbike test sweden motorcycle licence a2 sweden",`
- Native name on Swedish surfaces, `english.name` elsewhere (as `detheorie`).

## lib/region.ts

- `TEST_REGIONS`: add `semoto: "SE",` (next to `setrafik: "SE"`).
- A driving test, so NOT in `NON_DRIVING_TESTS`.
- Region language (decision for the integrator, shared with sehp, sejakt and semedb): after this
  wave four of Sweden's five tests are in Swedish and only `setrafik` is English. LANGUAGES.md says
  a region's `lang` switches "when the country's translated test ships". If you switch it:
  `{ code: "SE", name: "Sweden", short: "SE", inName: "Sweden", lang: "sv", locale: "sv-SE" },`
  plus `app/se/layout.tsx` with `lang="sv"` (copy of `app/de/layout.tsx`) and a Swedish
  `REGION_HOME.SE`, for example:

```ts
  SE: {
    title: "Gratis teoriprov och övningsprov på svenska | Tigertest",
    description: "Gratis övning inför svenska prov: teoriprov för motorcykel A1, A2 och A och fler, egna frågor på svenska med varje svar förklarat. Ingen inloggning.",
    lead: "Öva gratis inför Trafikverkets kunskapsprov för motorcykel och andra svenska prov. Egna frågor på svenska, varje svar förklarat. Ingen inloggning.",
    cta: { label: "Teoriprov motorcykel", href: "/sv/motorcykel-teoriprov" },
    testsTitle: "Teoriprov för körkort",
    testsSub: "Frågor enligt svenska trafikregler, i km/h för högertrafik. Kunskapsprovet har 65 frågor som räknas och du behöver 52 rätt.",
  },
```

  If you keep SE English, the current `REGION_HOME.SE` stays and `semoto` simply appears in the
  Sweden test list with its Swedish name; `setrafik` keeps the CTA.

## app/sv/layout.tsx (new, shared by every /sv landing; create once)

```tsx
// Every page under /sv is Swedish: Swedish exam landings.
export default function SwedishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="sv">{children}</div>;
}
```

`lib/urlLanguage.ts` already has `{ prefix: "/sv", lang: "sv", includeRoot: false }`.
`TranslatedExamLanding` must accept the base language (`lang === exam.language` uses
`exam.landingPath`, locale `sv-SE` from `examLandingLocale()`); the currency for SE is SEK, not EUR.

## lib/landingContent.ts

Register the Swedish landing so `/se` (if Swedish) can quote its facts answer:

```ts
import semotoSv from "@/lib/landings/semoto.sv.json";
  "semoto.sv": semotoSv as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  semoto: {
    answer:
      "The knowledge test (kunskapsprov) for a Swedish motorcycle licence, categories A1, A2 and A, is run by Trafikverket at its test centres on a computer. It has 70 multiple-choice questions with one correct answer each and lasts 50 minutes. Five questions are unscored trial questions, so the maximum is 65 points, and you need 52 points to pass (80%). It covers vehicle knowledge and handling, the environment, traffic safety, traffic rules and personal prerequisites. The questions can be heard in Swedish through headphones; Trafikverket's motorcycle page names no English version, but extended time, an oral test or a test with an interpreter can be applied for. Both parts of the motorcycle risk training must be completed and valid on the day. Age limits are 16 for A1, 18 for A2 and 24 for A, or 20 after two years with A2.",
    rows: [
      { label: "Run by", value: "Trafikverket (Swedish Transport Administration)" },
      { label: "Questions", value: "70 (65 scored, 5 unscored trial questions)" },
      { label: "Time", value: "50 minutes" },
      { label: "Pass mark", value: "52 of 65 points (80%)" },
      { label: "Language", value: "Swedish, with audio; interpreter on application" },
      { label: "Categories", value: "A1 (from 16), A2 (from 18), A (from 24, or 20 after 2 years of A2)" },
      { label: "Before the test", value: "Both parts of the motorcycle risk training" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Swedish, 80% target" },
    ],
    basedOn: "Trafikverket's Motorcykel test page, Transportstyrelsen's A1, A2 and A licence pages, the Traffic Ordinance (trafikförordningen 1998:1276) and the course plan TSFS 2011:19, checked November 2026",
    source: { name: "Trafikverket: driving tests for motorcycle", url: "https://www.trafikverket.se/korkort/korkortsprov/motorcykel/" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Swedish)" like `detheorie`; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.
Then `npx tsx scripts/build-landing-dates.ts`.

## lib/tigerAssets.ts

Add to `BORROWED_SETS` with the other motorcycle tests: `semoto: "moto",`

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## components/home/HomePage.tsx

`AUTHORITY.SE` is "Trafikverket or Transportstyrelsen": fine for this exam.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the `/sv/motorcykel-teoriprov` landing is emitted once, hreflang
`sv-SE` and x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 28 to 52 (all at most 60),
so no parts. Then `python3 -I tools/build_exam_sources.py` (sources.md lists Trafikverket,
Transportstyrelsen and riksdagen.se first).

## Screenshots

`TranslatedExamLanding` reads `/landing/semoto-{mobile,desktop}-sv.png` (and the `-dark` twins):
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing semoto:motorcykel-teori:23201`
then rename to the `-sv` names (as for `detheorie`'s `-de`).

## CLAUDE.md (after the Germany motorcycle bullet, or after `setrafik`)

```md
- **MC-teori** (`semoto`, the Swedish knowledge test for a motorcycle licence, categories A1, A2 and A, Tigertest's first Swedish-language exam, base language Swedish, `language: "sv"`, `locale: "sv-SE"`, English names in `english`, `review: { sv: "model" }`, `/motorcykel-teori/*`, landing `/sv/motorcykel-teoriprov` from `lib/landings/semoto.sv.json`): `data/sweden-motorcycle-theory-questions.json` (200 original questions written in Swedish, in "du": motorcycle technology and checks 20, braking, cornering and balance 32, road position and being seen 28, motorcycle traffic rules 24, passengers, luggage and trailers 16, licence categories and learner riding 16, road surface, weather and wildlife 28, personal factors and protective gear 24, environment 12), test IDs 23201-23204 (50 questions each, 5/8/7/6/4/4/7/6/3 per test, no spares) and five Swedish-named topic sets 23201-23205 (Motorcykeln och körtekniken 52, Placering och trafikregler 52, Passagerare och behörigheter 32, Väglag, väder och vilt 28, Du som förare och miljön 36), 9 dashboard steps, state `SEMOTO`, prefix `SEMOTO-`, 80% pass (the real test: 70 questions, 5 unscored, 52 of 65 in 50 minutes, Trafikverket; five knowledge areas with no published weights, so the split is Tigertest's). Offered by Trafikverket in Swedish with audio (interpreter on application), so no English version. Rules from trafikförordningen (1998:1276) as read in November 2026 (helmet 4:9, passenger only on a motorcycle fitted for one and from age 18 4:6 b, trailer at most 125 cm and half the kerb weight 4:15 a, no passengers in a trailer 4:15 b, no towing 4:19, no winter tyre requirement for motorcycles 4:18 a, light rules 3:69-76, parking 3:55) and Transportstyrelsen's A1/A2/A pages (125 cm³ and 11 kW, 35 kW from at most 70 kW, ages 16/18/24 or 20 after two years of A2, learner riding ages, handledare on a motorcycle, ÖVNINGSKÖR sign); no fines, fees or alcohol figures (setrafik has those). Photo and risk-situation questions not modelled; signs described in words. Kept clear of `setrafik` facts. Built by `tools/next100/semoto/build.py` (sorts all-number options with Swedish decimal commas and "N år och M månader" ages); sources in `tools/next100/semoto/sources.md`, terms in `glossary.md`. Region SE, hub group "EU driving theory tests" (after setrafik), `[data-theme="semoto"]` dark mustard olive, borrows the motorcycle tiger.
```

## Decisions for the integrator

1. **Hue.** Suggested `48 85% 28%` clashes with four themes; `50 65% 22%` passes the rule.
2. **Region language.** Whether SE switches to Swedish now (see lib/region.ts above). The bank,
   landing and app pages are Swedish either way (`lib/pageLanguage.ts`).
3. **English.** Not offered on Trafikverket's motorcycle page (only Swedish audio, interpreter on
   application). Confirmed 2026-11-06; landing FAQ says so.
4. **Test length.** 4 x 50 at 80% like `setrafik`, not 65-question tests: 200 items would not fill
   three 65s without spares, and 50 at the same pace keeps 9 dashboard steps.
5. **Review.** `review: { sv: "model" }`; a native Swedish reviewer pass is still owed
   (LANGUAGES.md 5.2).
