# Wiring for `plteoria` (Polish car theory test, prawo jazdy kategorii B, written in Polish, v1)

Native-language exam, template `detheorie`: the base bank and base copy are Polish
(`language: "pl"`). It opens a new Tigertest region, PL (Poland), with a Polish homepage at `/pl`.
Files already written by the builder:
- `data/pl-teoria-questions.json` (200, `validate_bank.py --lang pl` PASS)
- `lib/banks/plteoria.ts`
- `app/poland-driving-theory/*` (5 wrappers copied from `app/fuehrerschein-theorie/`)
- `lib/landings/plteoria.pl.json` (Polish landing content, Polish `facts.source`)
- `app/pl/egzamin-teoretyczny-prawo-jazdy/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `pl`)
- `tools/next100/plteoria/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/plteoria/build.py`. Everything below goes in shared files.

Format note: the real test (rozporządzenie MI z 24.11.2023, Dz.U. 2023 poz. 2659, § 19, read
2026-11-21; unchanged by Dz.U. 2025 poz. 696) is 32 questions drawn at random at a WORD: 20 basic
(wiedza podstawowa) answered TAK/NIE with 20 s to read and 15 s to answer, and 12 specialist
(wiedza specjalistyczna) with A/B/C answers and 50 s each; each worth 3, 2 or 1 point by importance
(10/6/4 and 6/4/2), 74 points, pass at 68; 25 minutes; no going back once an answer is confirmed;
every question carries a photo or video clip. Offered in Polish, English, German, sign language and,
for category B, Ukrainian (Ministry answers to Sejm interpellations 9840 and 13691, 2025).
Tigertest models six 32-question tests (192 of 200 items, 8 training-only spares) with four-option
single best answers and equal weight, so `passPct: 92` (30 of 32, at most two mistakes) is
Tigertest's target: two mistakes always pass the real rule (at most 6 points lost). TAK/NIE and
A/B/C formats, the point weighting, timing per question and the media are not modelled; the landing
says so. Training is by topic: 5 zestawy (ids 45501-45505, each at most 60 questions, all 200 items)
plus the 6 tests = 11 dashboard steps.

Slug and landing: the brief row gives `/poland-driving-theory` and `/pl/egzamin-teoretyczny-prawo-jazdy`;
`tools/next100/LANGUAGES.md` 3.1 had planned `/prawo-jazdy-teoria` and
`/pl/testy-na-prawo-jazdy-kategoria-b`. The builder followed the brief row; see Decisions.

## lib/exams.ts

Add `"plteoria"` to the `ExamId` union. Icon `car` already exists. 45501-45506 are free (no
`idBase` 45500 in `lib/exams.ts` on 2026-11-21). Set ids 45501-45505 share numbers with test ids
45501-45505 like the other topic-set exams.

```ts
const plteoria: ExamConfig = {
  id: "plteoria",
  stateCode: "PLTEORIA",
  idBase: 45500,
  slug: "/poland-driving-theory",
  landingPath: "/pl/egzamin-teoretyczny-prawo-jazdy",
  name: "Egzamin teoretyczny na prawo jazdy kat. B",
  shortName: "Prawo jazdy kat. B",
  examLabel: "Egzamin teoretyczny kat. B",
  fullName: "Część teoretyczna egzaminu państwowego na prawo jazdy kategorii B",
  questionIdPrefix: "PLTEO-",
  icon: "car",
  testCount: 6,
  questionsPerTest: 32,
  passPct: 92,
  language: "pl",
  locale: "pl-PL",
  english: {
    name: "Poland Driving Theory Test (Category B)",
    shortName: "Polish driving theory test",
    fullName: "Polish driving licence theory test, category B car (egzamin teoretyczny na prawo jazdy), in Polish",
  },
  review: { pl: "model" },
  // Real test (rozporządzenie MI z 24.11.2023 w sprawie egzaminowania, Dz.U. 2023 poz. 2659, § 19;
  // checked 2026-11-21): computer-based at a WORD, 32 random questions, 20 basic TAK/NIE (20 s to
  // read, 15 s to answer) and 12 specialist A/B/C (50 s), 3/2/1 points by importance, 74 in all,
  // pass at 68, 25 minutes, no return to a confirmed answer, every question with a photo or video.
  // Polish, English, German, sign language and (category B) Ukrainian. A smaller public catalogue
  // is planned (MI, 30.03.2026), not in force. Categories are Tigertest's own split of the PoRD and
  // the signs regulation; the 6/5/4/4/4/3/3/3 weights are Tigertest's. Six tests of 32 from 200
  // original items written in Polish (8 training-only spares). Four-option single answer, equal
  // weight, so passPct 92 (30 of 32, at most two mistakes) is Tigertest's target. Rules as in force
  // November 2026, incl. Dz.U. 2025 poz. 1676 (okres próbny, 17-year-olds, helmets, tractors 40 km/h).
  blueprint: {
    plteoZnaki: 6,
    plteoPierwszenstwo: 5,
    plteoPredkosc: 4,
    plteoManewry: 4,
    plteoPostoj: 4,
    plteoNiechronieni: 3,
    plteoKierowca: 3,
    plteoWypadki: 3,
  },
  // Five topic sets, not testSets(): 5 + 6 tests = 11 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 45501, name: "Znaki i sygnały drogowe", categories: ["plteoZnaki"], size: 38, weightLabel: "6 z 32 pytań w teście" },
    { setNumber: 2, id: 45502, name: "Pierwszeństwo i skrzyżowania", categories: ["plteoPierwszenstwo"], size: 31, weightLabel: "5 z 32 pytań w teście" },
    { setNumber: 3, id: 45503, name: "Prędkość i manewry", categories: ["plteoPredkosc", "plteoManewry"], size: 50, weightLabel: "8 z 32 pytań w teście" },
    { setNumber: 4, id: 45504, name: "Postój, piesi i rowerzyści", categories: ["plteoPostoj", "plteoNiechronieni"], size: 44, weightLabel: "7 z 32 pytań w teście" },
    { setNumber: 5, id: 45505, name: "Kierowca, wypadki i pojazd", categories: ["plteoKierowca", "plteoWypadki"], size: 37, weightLabel: "6 z 32 pytań w teście" },
  ],
  categoryLabels: {
    plteoZnaki: "Znaki i sygnały drogowe",
    plteoPierwszenstwo: "Pierwszeństwo i skrzyżowania",
    plteoPredkosc: "Prędkość, odstępy i hamowanie",
    plteoManewry: "Wyprzedzanie, manewry i holowanie",
    plteoPostoj: "Zatrzymanie, postój i światła",
    plteoNiechronieni: "Piesi, rowerzyści i inni uczestnicy ruchu",
    plteoKierowca: "Kierowca: alkohol, pasażerowie i okres próbny",
    plteoWypadki: "Wypadki, pierwsza pomoc i pojazd",
  },
  copy: {
    guestPrompt: "żeby zapisać postępy przed egzaminem teoretycznym i mieć na oku każdą błędną odpowiedź",
    trainingHeading: "Zestawy ćwiczeń",
    trainingSub: "Każdy zestaw obejmuje jeden temat egzaminu. Od razu widzisz wyjaśnienie, a błędne odpowiedzi wracają, aż je opanujesz.",
    testsHeading: "Testy · 32 pytania, najwyżej 2 błędy",
    heroSubs: [
      "Pięć zestawów ćwiczeń, sześć testów. Zacznij od znaków i sygnałów drogowych.",
      "Najpierw opanuj zestaw, potem zrób test.",
      "Tak trzymaj. Zrób test i zobacz, gdzie jesteś.",
      "Powtórz błędy, potem zrób test jeszcze raz.",
      "Wszystko na zielono. Powtarzaj testy, żeby utrwalić wiedzę.",
    ],
    sourceLine: "Według Prawa o ruchu drogowym i przepisów o znakach, stan na listopad 2026. Własne pytania, nie z ministerialnej bazy; 32 w teście, bez punktacji 1-3 i bez zdjęć.",
    analyticsKey: "plteoria",
  },
};
```

Append `plteoria` to the `EXAMS` array with the other EU driving tests (after `frcode`).
No `translations` yet (an English or Ukrainian version would be `translations.en` / `translations.uk`
later). The set names are Polish topic names, so `TEST_SET_NAMES.pl` is not used for this exam.

## lib/banks/all.ts

```ts
import "./plteoria";
```

## types/index.ts

- `QuestionType`: add `| "PLTEORIA"`.
- `QuestionCategory`, under a `// Polish car theory test (prawo jazdy kat. B)` comment:

```ts
  | "plteoZnaki"
  | "plteoPierwszenstwo"
  | "plteoPredkosc"
  | "plteoManewry"
  | "plteoPostoj"
  | "plteoNiechronieni"
  | "plteoKierowca"
  | "plteoWypadki"
```

## i18n

Results and stats read `exam.categoryLabels` first, so `i18n/pl.ts` needs nothing. For English
surfaces add to `i18n/en.ts` (and `es.ts`, `ko.ts`, `vi.ts`, `zh.ts`, which keep English labels):

```ts
    plteoZnaki: "Road Signs & Signals",
    plteoPierwszenstwo: "Right of Way & Junctions",
    plteoPredkosc: "Speed, Distance & Braking",
    plteoManewry: "Overtaking, Manoeuvres & Towing",
    plteoPostoj: "Stopping, Parking & Lights",
    plteoNiechronieni: "Pedestrians, Cyclists & Other Road Users",
    plteoKierowca: "Driver: Alcohol, Passengers & Probation",
    plteoWypadki: "Accidents, First Aid & Vehicle",
```

## lib/shuffleOptions.ts

The bank has no position-dependent Polish options ("A i B", "Obie", "Wszystkie powyższe"); the
build asserts it. The platform's `pl` patterns already exist; nothing to add.

## app/globals.css

Suggested by the brief: `354 72% 38%` (Polish red). Checked with the house rule against every
`[data-theme]` `--brand` on 2026-11-21: it clashes with `aplus` (350 75% 44%), `cpr` (355 70% 44%),
`act` (350 70% 42%), `moto` (355 72% 44%), `camb` and `caon` (356 68% 40%). A scan of every hue from
325 to 25 with saturation 20-100% and lightness 30-42% found no free slot with 4.5:1 white-text
contrast except grey-pinks at 329-336, 20% saturation. The integrator settles the hue (the brief
says it may re-pick); the block below uses the suggested value. White text on it is about 7.4:1.
Then run `tools/gen_dark_brand_css.py`.

```css
  /* Polish car theory test (prawo jazdy kat. B) theme */
  [data-theme="plteoria"] {
    --brand: 354 72% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 354 70% 96%;
    --brand-hover: 354 72% 33%;
    --brand-dark: 354 72% 28%;
    --brand-darker: 354 72% 20%;
    --brand-muted: 354 40% 70%;
    --brand-border: 354 50% 82%;
    --brand-border-light: 354 50% 90%;
    --brand-gradient-to: 354 80% 94%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `plteoria: "Six 32-question mock tests in Polish for the Polish category B car theory test at the WORD: road signs, right of way, speed limits, overtaking, parking and lights, pedestrians and cyclists, alcohol and the probation period, and first aid, written from the Prawo o ruchu drogowym as of November 2026.",`
- `EXAM_ORG`: `plteoria: "WORD exam centres (Poland) · category B theory test, in Polish",`
- Hub group: it is a driving licence test, so add `"plteoria"` to `"EU driving theory tests"`
  (after `"frcode"`). Poland's non-driving siblings (`plaplik`, `pllek`, `plbron`, `plcpc`) get their
  own group after it, for example `{ title: "Poland professional and licensing exams", ids: [...] }`,
  written by their builders (`plcpc` may instead join the driving group as a licence category).
- `RELATED_OVERRIDES`: `plteoria: ["detheorie", "hukresz", "dkteori"],` (neighbouring countries'
  car tests; swap in `plcpc` once it ships).
- `SEARCH_ALIASES` (native and English):
  `plteoria: "testy na prawo jazdy test na prawo jazdy prawo jazdy kategoria b prawo jazdy kat b egzamin teoretyczny egzamin teoretyczny prawo jazdy egzamin na prawo jazdy pytania na prawo jazdy testy prawo jazdy 2026 word egzamin word teoria teoria prawo jazdy znaki drogowe pierwszeństwo przejazdu kodeks drogowy prawo o ruchu drogowym polish driving test poland driving theory test polish driving licence theory test poland driving licence category b warszawa kraków wrocław poznań gdańsk łódź",`
- Native name on the Polish homepage, `english.name` elsewhere (LANGUAGES.md 1.6).

## lib/region.ts (new region PL)

```ts
// Region union: add | "PL"
  { code: "PL", name: "Poland", short: "PL", inName: "Poland", lang: "pl", locale: "pl-PL" },
```

`regionFromCountry`:

```ts
    // Poland only.
    case "PL": return "PL";
```

`TEST_REGIONS`: `plteoria: "PL",` (the siblings `plaplik`, `pllek`, `plbron`, `plcpc` add theirs).
A driving test, so NOT in `NON_DRIVING_TESTS`.

`REGION_HOME.PL` (written in Polish, REGIONS[].lang; the CTA shows once plteoria is in the catalog):

```ts
  // Written in Polish (REGIONS[].lang). The CTA shows once plteoria is in the catalog.
  PL: {
    title: "Testy na prawo jazdy kat. B za darmo | Tigertest",
    description: "Darmowe testy do egzaminu teoretycznego na prawo jazdy kat. B: własne pytania po polsku o znakach, pierwszeństwie i prędkości, każda odpowiedź wyjaśniona. Bez zakładania konta.",
    lead: "Ćwicz do egzaminu teoretycznego na prawo jazdy kat. B w WORD. Własne pytania o znakach, pierwszeństwie, prędkości i pierwszej pomocy według Prawa o ruchu drogowym, każda odpowiedź wyjaśniona. Bez rejestracji.",
    cta: { label: "Testy na prawo jazdy", href: "/pl/egzamin-teoretyczny-prawo-jazdy" },
    testsTitle: "Testy dla Polski",
    testsSub: "Egzamin teoretyczny na prawo jazdy kat. B: 200 pytań według Prawa o ruchu drogowym, w km/h i dla ruchu prawostronnego, sześć testów po 32 pytania i cel 30 z 32. Zdjęcia, filmy i punktacja 1-3 nie są odwzorowane.",
  },
```

(Extend `testsSub` when the siblings ship.)

## components/home/HomePage.tsx

```ts
// AUTHORITY:
  PL: "the WORD exam centres or the Ministry of Infrastructure",
// with the other per-language constants:
const AUTHORITY_PL_PL = "WORD lub Ministerstwo Infrastruktury";
// in authorityIn():
  if (region === "PL" && lang === "pl") return AUTHORITY_PL_PL;
```

`components/home/copy/pl.ts` already exists; check `COUNTRY_NAMES` / `TRANSLATED_COUNTRY_NAMES` have
`PL` ("Polska" in Polish, "Poland" in English) and every other dictionary's country list gains `PL`.

## app/pl/layout.tsx and app/pl/page.tsx

Not present on 2026-11-21. Create both, copying `app/it/`:

```tsx
// app/pl/layout.tsx
// Every page under /pl is Polish: the Poland homepage and Polish exam landings.
export default function PolishLayout({ children }: { children: React.ReactNode }) {
  return <div lang="pl">{children}</div>;
}
```

```tsx
// app/pl/page.tsx
import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Poland homepage (lib/region.ts), in Polish (REGIONS[].lang). A first visit to "/" from
// Poland lands here. Its CTA and local section show once Poland's tests are in the catalog.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("PL");

export default function HomePL() {
  return <HomePage region="PL" />;
}
```

Middleware needs no change (it maps through `regionFromCountry`). Add `/pl` to the country
homepage sitemap entries the same way as `/it`, and the admin "By country" card / `visit_region_*`
keys gain `PL`.

## components/exam/TranslatedExamLanding.tsx

`CURRENCY` has no `PL`: add `PL: "PLN",` (`lib/pricing.ts` already maps PL to `pln`).

## lib/landingContent.ts

```ts
import plteoriaPl from "@/lib/landings/plteoria.pl.json";
  "plteoria.pl": plteoriaPl as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  plteoria: {
    answer:
      "The Polish theory test for a category B car licence (część teoretyczna egzaminu państwowego) is taken on a computer at a regional road traffic centre (WORD). You get 32 questions drawn at random: 20 basic questions answered yes or no (TAK/NIE), with 20 seconds to read and 15 seconds to answer, and 12 specialist questions with three answers (A, B, C) and 50 seconds each. Every question comes with a photo or video clip and is worth 1, 2 or 3 points depending on its importance for road safety, 74 points in all, and you pass with at least 68. The test lasts 25 minutes and you cannot go back to a confirmed answer. Besides Polish it can be taken in English, German and sign language, and for category B also in Ukrainian. The Ministry of Infrastructure plans a smaller, public question catalogue, not yet in force.",
    rows: [
      { label: "Run by", value: "WORD regional road traffic centres" },
      { label: "Questions", value: "32 (20 yes/no, 12 with three options)" },
      { label: "Scoring", value: "1 to 3 points per question, 74 in all" },
      { label: "Pass mark", value: "At least 68 points" },
      { label: "Time", value: "25 minutes, timed per question" },
      { label: "Languages", value: "Polish, English, German, sign language; Ukrainian for category B" },
      { label: "Tigertest mock tests", value: "6 x 32 questions in Polish, 30 to pass" },
    ],
    basedOn: "Regulation of the Minister of Infrastructure of 24 November 2023 on driving examinations (Dz.U. 2023 item 2659, par. 19), Ministry of Infrastructure answers to Sejm interpellations 9840 and 13691, and the Road Traffic Act (Prawo o ruchu drogowym) as in force, checked November 2026",
    source: { name: "Dziennik Ustaw 2023 item 2659 (Sejm legal acts database)", url: "https://api.sejm.gov.pl/eli/acts/DU/2023/2659/text.html" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Polish)" per LANGUAGES.md 3.5; nothing exam-specific.

## lib/seoDates.ts / lib/landingDates.json

Bump `EXAM_LANDINGS_UPDATED_AT` with a comment naming the wave, and run
`scripts/build-landing-dates.ts`.

## lib/tigerAssets.ts

Add to `BORROWED_SETS` with the other car tests: `plteoria: "driving",`

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the native `landingPath` under `/pl` is emitted once, with
hreflang `pl-PL` and x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 31 to 50 (all at most 60),
so no parts.

## validate_bank.py

200 rows, so no `KNOWN_BANKS` entry is needed. Command:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/pl-teoria-questions.json --lang pl --pool plteoZnaki=38 --pool plteoPierwszenstwo=31 --pool plteoPredkosc=25 --pool plteoManewry=25 --pool plteoPostoj=25 --pool plteoNiechronieni=19 --pool plteoKierowca=19 --pool plteoWypadki=18`

## Screenshots

`TranslatedExamLanding` reads `/landing/plteoria-{mobile,desktop}-pl.png` (same as detheorie's
`-de` names):
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing plteoria:poland-driving-theory:45501`
then rename the two files to the `-pl` names.

## docs/exams/plteoria.md

```md
# plteoria: Egzamin teoretyczny na prawo jazdy kat. B (Poland Driving Theory Test, Category B)

- What: the theory part of the Polish state driving exam for a category B car licence, taken on a
  computer at a WORD (wojewódzki ośrodek ruchu drogowego). Native-language exam, base language
  Polish (`language: "pl"`, `locale: "pl-PL"`, `review: { pl: "model" }`).
- Official format (Dz.U. 2023 poz. 2659, § 19, checked 2026-11-21): 32 random questions, 20 basic
  TAK/NIE (20 s + 15 s) and 12 specialist A/B/C (50 s); 3/2/1 points by importance (10/6/4 and
  6/4/2); 74 points, pass at 68; 25 minutes; no going back; every question has a photo or video.
  Languages: Polish, English, German, sign language, Ukrainian for category B.
- Pools and blueprint: 200 items in 8 categories, Znaki 38, Pierwszeństwo 31, Prędkość 25,
  Manewry 25, Postój 25, Niechronieni 19, Kierowca 19, Wypadki 18; per test 6/5/4/4/4/3/3/3 = 32;
  six tests 45501-45506 use 192 items, 8 spares (2 Znaki, 1 each in the next six) are
  training-only.
- Training sets 45501-45505: Znaki i sygnały drogowe 38, Pierwszeństwo i skrzyżowania 31,
  Prędkość i manewry 50, Postój, piesi i rowerzyści 44, Kierowca, wypadki i pojazd 37.
  Dashboard 11 steps. passPct 92 = 30 of 32 (Tigertest's target; the weighting is not modelled).
- IDs: idBase 45500, state `PLTEORIA`, prefix `PLTEO-` (segments ZN, PIE, PRE, MAN, POS, NIE, KIE, WYP).
- Routes: app `/poland-driving-theory/*`, landing `/pl/egzamin-teoretyczny-prawo-jazdy` from
  `lib/landings/plteoria.pl.json`. Region PL, homepage `/pl`.
- Sources: `tools/next100/plteoria/sources.md`; terms and register: `glossary.md`.
- Build: `python3 -I tools/next100/plteoria/build.py` (sorts all-number options with Polish
  decimal commas; the key's letter is found after sorting).
- Theme `[data-theme="plteoria"]` (Polish red, hue settled by the integrator); borrows the car tiger.
- Hub group: "EU driving theory tests".
- Rules as in force November 2026: PoRD t.j. Dz.U. 2024 poz. 1251 with Dz.U. 2025 poz. 1676 (from
  3 March 2026: okres próbny 2 years, 3 from 17, 0,0 alcohol; category B from 17 with a 25+ mentor,
  Poland only until 18; helmets under 16; no e-scooter up to 13; tractors 40 km/h).
- Not modelled: TAK/NIE and A/B/C formats, 1-3 point weighting, per-question timers, photos and
  video, the motorcycle and other categories (A/A2 is a later sibling bank). No fines, points or
  fees. The old 8-month novice speed limits were repealed on 3 March 2026 and are not asked.
- Quirks: questions use "ty" and avoid gendered verb forms; signs by code ("znak A-7"). The planned
  reform (smaller public catalogue, MI 30.03.2026) is on the landing only.
```

## CLAUDE.md (with the other native-language exams, after `detheorie` / `itpatente`)

```md
- **Egzamin teoretyczny na prawo jazdy kat. B** (`plteoria`, Polish car theory test, native-language exam, base language Polish, `language: "pl"`, `locale: "pl-PL"`, `review: { pl: "model" }`, `/poland-driving-theory/*`, landing `/pl/egzamin-teoretyczny-prawo-jazdy` from `lib/landings/plteoria.pl.json`): `data/pl-teoria-questions.json` (200 original questions written directly in Polish, in "ty" without gendered forms: Znaki i sygnały 38, Pierwszeństwo 31, Prędkość 25, Manewry 25, Postój i światła 25, Niechronieni 19, Kierowca 19, Wypadki i pojazd 18), six 32-question tests (IDs 45501-45506, 6/5/4/4/4/3/3/3 per test, 8 training-only spares) and five Polish-named topic sets 45501-45505 (38/31/50/44/37), 11 dashboard steps, state `PLTEORIA`, prefix `PLTEO-`, 92% pass (30 of 32, Tigertest's target: the real test is 20 TAK/NIE + 12 A/B/C questions weighted 1-3 points, 74 points, pass 68, 25 minutes, rozporządzenie MI Dz.U. 2023 poz. 2659 § 19). Photos, video, the TAK/NIE format and the weighting are not modelled; signs are described in words with their code ("znak A-7"). Rules from PoRD (t.j. Dz.U. 2024 poz. 1251) with Dz.U. 2025 poz. 1676 in force from 3 March 2026 (okres próbny, 0,0 alcohol for novices, licence from 17); no fines, points or fees. English names in `english` for English surfaces. Built by `tools/next100/plteoria/build.py`; sources in `tools/next100/plteoria/sources.md`, terms in `glossary.md`. Opens region PL (homepage `/pl`), `[data-theme="plteoria"]` Polish red, borrows the car tiger.
```

## Decisions for the integrator

1. **Hue.** `354 72% 38%` clashes with six themes and no free red slot exists at 30-42% lightness;
   please re-pick (or relax lightness) and update both `app/globals.css` and nothing else (the
   config has no hue field).
2. **Paths.** Brief row (`/poland-driving-theory`, `/pl/egzamin-teoretyczny-prawo-jazdy`) used
   instead of the LANGUAGES.md plan (`/prawo-jazdy-teoria`, `/pl/testy-na-prawo-jazdy-kategoria-b`).
   Both are ASCII; switch in the config, the wrapper folder and `REGION_HOME.PL.cta` if you prefer
   the plan.
3. **Region PL is new.** `Region` union, `REGIONS`, `regionFromCountry`, `REGION_HOME.PL`,
   `AUTHORITY`, `CURRENCY` (PLN), `app/pl/layout.tsx` and `app/pl/page.tsx` are all needed before
   the landing renders under `/pl`.
4. **Novice rules.** The 0,0 alcohol, 2-year probation and 17-year-old items cite the new art. 8a,
   91 and 92 of the ustawa o kierujących pojazdami (Dz.U. 2025 poz. 1676), in force from 3 March
   2026 per the act's art. 22 and KRBRD/MI announcements. The old consolidated text (Dz.U. 2025
   poz. 1226) carried a footnote delaying chapter 14 until a data system went live; the builder
   found no sign that this delay still applies, but a reviewer may want to confirm.
5. **Pass mark.** 92 (30 of 32). Two mistakes always pass the real rule; three can pass or fail.
6. **Siblings.** No other Polish bank was on disk while writing; `plcpc` may repeat road-rule
   facts (speed limits, alcohol thresholds), so its builder should grep this bank.
