# Wiring for `plbron` (Egzamin na pozwolenie na broń, część teoretyczna, written in Polish, v1)

A native-language exam in Polish (`language: "pl"`), built from the `detheorie` template. The
Polish platform pieces (`i18n/pl.ts`, `LANG_RULES["pl"]`, the `pl` entry in
`lib/shuffleOptions.ts`) already exist. Poland is a new Tigertest region shared with `plteoria`,
`plaplik`, `pllek` and `plcpc`; the region, `/pl` homepage and `/pl` layout blocks are in
`tools/next100/plaplik/WIRING.md` (and `plteoria`'s): apply them once. Below are only this exam's
lines and its additions to the shared Poland blocks.

Files already written by the builder:
- `data/pl-bron-questions.json` (200, validator PASS with `--lang pl`)
- `lib/banks/plbron.ts`
- `app/poland-firearms-permit-exam/*` (5 wrappers copied from `app/fuehrerschein-theorie/` via
  `app/poland-legal-apprenticeship-exam/`: layout, redirect, dashboard, drill and stats; drill
  and stats import the bank; no test or practice folders, the shared `app/[slug]` routes serve them)
- `lib/landings/plbron.pl.json` (Polish landing content, `facts.source` the Dz. U. text on the Sejm ELI service)
- `app/pl/egzamin-na-pozwolenie-na-bron/page.tsx` (three-line `TranslatedExamLanding` wrapper,
  `lang="pl"`, `samples`, `related`)
- `tools/next100/plbron/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/plbron/build.py`. Validate with:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/pl-bron-questions.json --lang pl --pool plbrPojecia=28 --pool plbrPozwolenia=36 --pool plbrObowiazki=32 --pool plbrPrzechowywanie=24 --pool plbrGranica=16 --pool plbrStrzelnica=20 --pool plbrKarne=24 --pool plbrObrona=20`
-> `letters {'A': 52, 'B': 49, 'C': 48, 'D': 51}  avg option 30 chars  key-longest 2%  key>1.2x 2%  PASS` (all-number items: key in an end slot 10 of 18)
Also clean: `check_answer_patterns.py` (no answer patterns), `check_option_reuse.py` (2 shared
sets, 1%; echo gain -0.4), `check_option_refs.py --list` (0), `check_stem_length.py` (median 11
words, 0% The/A/An), `check_sources.py plbron` (9 primary pages, 6 dated reads).

## Shape

The real theory part (rozporządzenie MSWiA z 28 lipca 2023 r., Dz. U. poz. 1475, § 4; art. 16
ustawy o broni i amunicji; checked 2026-11-21) is a test of 20 single-choice questions with three
options (A, B, C), 30 minutes, pass with at least 18 correct; scope is the Ustawa o broni i
amunicji with its implementing regulations and the Kodeks karny provisions on weapon offences.
A practical part at a range follows (not modelled). Tigertest models the theory at the real
length and line: six 20-question tests (ids 45801-45806, 3/4/3/2/2/2/2/2 per test, 120 of the 200
items), `passPct: 90` = ceil(0.9 x 20) = 18 of 20. Our items have four options (v1 engine); the
landing says so. Training: five topic sets 45801-45805 (28, 36, 32, 60, 44; all at most 60, so no
parts), covering all 200 items; 5 sets + 6 tests = 11 dashboard steps. Set ids share numbers with
test ids like other topic-set exams.

## lib/exams.ts

Add `"plbron"` to the `ExamId` union. Icon `target` already exists (the AU firearms exams use it).
45800 was assigned by the brief; 45801-45806 are free (checked `lib/exams.ts` and `lib/v2`).

```ts
const plbron: ExamConfig = {
  id: "plbron",
  stateCode: "PLBRON",
  idBase: 45800,
  slug: "/poland-firearms-permit-exam",
  landingPath: "/pl/egzamin-na-pozwolenie-na-bron",
  name: "Egzamin na pozwolenie na broń",
  shortName: "Pozwolenie na broń",
  examLabel: "Egzamin na pozwolenie na broń, część teoretyczna",
  fullName: "Egzamin ze znajomości przepisów dotyczących posiadania broni (część teoretyczna)",
  questionIdPrefix: "PLBRON-",
  icon: "target",
  testCount: 6,
  questionsPerTest: 20,
  passPct: 90,
  language: "pl",
  locale: "pl-PL",
  english: {
    name: "Poland Firearms Permit Exam (Theory Part)",
    shortName: "Polish firearms permit exam",
    fullName: "Polish firearms permit exam, theory part (egzamin na pozwolenie na broń, część teoretyczna), in Polish",
  },
  review: { pl: "model" },
  // Real exam (art. 16 ustawy o broni i amunicji, t.j. Dz. U. z 2024 r. poz. 485 ze zm.;
  // rozporządzenie MSWiA z 28.07.2023 r., Dz. U. poz. 1475; checked 2026-11-21): a commission of
  // at least three named by the permit authority (the KWP/KSP for firearms); theory part of 20
  // single-choice questions with three options, 30 minutes, at least 18 correct to pass; then a
  // practical part at a range with a shooting test; one resit of each part. Scope: the ustawa
  // and its regulations plus the Kodeks karny on weapon offences. No published weights, so the
  // 3/4/3/2/2/2/2/2 split is Tigertest's. Six tests of 20 at the real length and line (passPct
  // 90 = 18 of 20); four options instead of three. All items original, written in Polish; the
  // police-published regional banks were not used.
  blueprint: {
    plbrPojecia: 3,
    plbrPozwolenia: 4,
    plbrObowiazki: 3,
    plbrPrzechowywanie: 2,
    plbrGranica: 2,
    plbrStrzelnica: 2,
    plbrKarne: 2,
    plbrObrona: 2,
  },
  // Five topic sets, not testSets(): 5 + 6 tests = 11 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 45801, name: "Rodzaje broni i amunicja", categories: ["plbrPojecia"], size: 28, weightLabel: "3 z 20 pytań w teście" },
    { setNumber: 2, id: 45802, name: "Pozwolenie na broń", categories: ["plbrPozwolenia"], size: 36, weightLabel: "4 z 20 pytań w teście" },
    { setNumber: 3, id: 45803, name: "Obowiązki posiadacza broni", categories: ["plbrObowiazki"], size: 32, weightLabel: "3 z 20 pytań w teście" },
    { setNumber: 4, id: 45804, name: "Przechowywanie, przewóz i strzelnica", categories: ["plbrPrzechowywanie", "plbrGranica", "plbrStrzelnica"], size: 60, weightLabel: "6 z 20 pytań w teście" },
    { setNumber: 5, id: 45805, name: "Prawo karne i obrona konieczna", categories: ["plbrKarne", "plbrObrona"], size: 44, weightLabel: "4 z 20 pytań w teście" },
  ],
  categoryLabels: {
    plbrPojecia: "Rodzaje broni i amunicja",
    plbrPozwolenia: "Pozwolenie na broń",
    plbrObowiazki: "Obowiązki posiadacza broni",
    plbrPrzechowywanie: "Przechowywanie, noszenie i przewóz",
    plbrGranica: "Europejska karta broni palnej, przywóz i wywóz",
    plbrStrzelnica: "Strzelnica i regulamin strzelnicy",
    plbrKarne: "Przestępstwa i wykroczenia związane z bronią",
    plbrObrona: "Obrona konieczna i stan wyższej konieczności",
  },
  copy: {
    guestPrompt: "aby zapisywać postępy przed egzaminem na pozwolenie na broń i wracać do każdej błędnej odpowiedzi",
    trainingHeading: "Zestawy ćwiczeń",
    trainingSub: "Każdy zestaw obejmuje dział przepisów o broni. Od razu widzisz, czy odpowiedź jest dobra, a pytania, w których się mylisz, wracają, aż je opanujesz.",
    testsHeading: "Testy · 20 pytań, 18 do zaliczenia",
    heroSubs: [
      "Pięć zestawów i sześć testów po 20 pytań. Zacznij od pozwolenia na broń.",
      "Najpierw opanuj zestaw, potem zrób test.",
      "Zrób teraz pełny test: 20 pytań w 30 minut.",
      "Powtórz błędy i zrób test jeszcze raz.",
      "Wszystko na zielono. Powtarzaj testy, żeby utrwalić przepisy.",
    ],
    sourceLine: "Na podstawie ustawy o broni i amunicji, rozporządzeń wydanych na jej podstawie i Kodeksu karnego, w brzmieniu z listopada 2026 r. Własne pytania, nie z baz pytań komend Policji; 20 pytań w teście i 18 do zaliczenia, jak na egzaminie. Cztery odpowiedzi zamiast trzech.",
    analyticsKey: "plbron",
  },
};
```

Append `plbron` to the `EXAMS` array after the AU firearms exams (or after `plaplik` with the
Polish exams). ID header comment if wanted: ` *   PLBRON 45800s (tests 45801-45806, sets 45801-45805)`.
The set names are Polish topic names, so `TEST_SET_NAMES.pl` is not used for this exam.

## lib/banks/all.ts

```ts
import "./plbron";
```

## types/index.ts

- `QuestionType`: add `| "PLBRON"`.
- `QuestionCategory`, under a `// Polish firearms permit exam, theory part (pozwolenie na broń)` comment:

```ts
  | "plbrPojecia"
  | "plbrPozwolenia"
  | "plbrObowiazki"
  | "plbrPrzechowywanie"
  | "plbrGranica"
  | "plbrStrzelnica"
  | "plbrKarne"
  | "plbrObrona"
```

(`plbr` is not used by any other key in `types/index.ts`; checked.)

## i18n

Results and stats read `exam.categoryLabels` first, so nothing is needed for Polish. If a
dictionary still needs the keys, `i18n/en.ts` (others fall back to English):

```ts
    plbrPojecia: "Types of Weapons & Ammunition",
    plbrPozwolenia: "Firearm Permits",
    plbrObowiazki: "Duties of a Firearm Holder",
    plbrPrzechowywanie: "Storage, Carrying & Transport",
    plbrGranica: "European Firearms Pass, Import & Export",
    plbrStrzelnica: "Shooting Ranges & Range Rules",
    plbrKarne: "Weapon Offences",
    plbrObrona: "Self-Defence & Necessity",
```

## lib/shuffleOptions.ts

No position-dependent Polish options ("A i B", "A lub B", "Obie", "Wszystkie odpowiedzi"); the
build asserts it. Options joined by "i", "lub" or "albo" ("Areszt albo grzywna", "Kratami,
siatką, żaluzjami lub szybą P4A") name things, never letters.

## app/globals.css

The suggested `28 64% 34%` clashes with `upscse` (28 65% 30%), `cacarp` (24 50% 30%), `sscmts`
(26 70% 38%) and `rajpolice` (35 62% 38%). Scanned every light `[data-theme]` block (499) with the
rule (within 8 degrees: 15 points of saturation or 8 of lightness): the whole warm band 10 to 50
is full for saturation 15% and up at lightness 26 to 42%. Free and close to a firearms look:
`68 30% 20%` (dark olive drab, the colour of shooting gear; white text about 10.4:1). It sits
below the usual 30 to 48% lightness, like `plaplik`'s 22%. Alternative: `114 100% 26%` (deep
green; white text about 7:1). Both clear today and clear of `plaplik` (255 100% 22%) and
`plteoria` (354 72% 38%); the integrator settles clashes. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Polish firearms permit exam (egzamin na pozwolenie na broń) theme */
  [data-theme="plbron"] {
    --brand: 68 30% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 68 35% 96%;
    --brand-hover: 68 30% 15%;
    --brand-dark: 68 30% 12%;
    --brand-darker: 68 30% 8%;
    --brand-muted: 68 15% 62%;
    --brand-border: 68 20% 80%;
    --brand-border-light: 68 20% 90%;
    --brand-gradient-to: 45 40% 94%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `plbron: "Six 20-question tests in Polish for the theory part of the Polish firearms permit exam (egzamin na pozwolenie na broń), 18 to pass like the real test: permit purposes and valid reasons, weapon types, registration and holder duties, storage, carrying and transport, the European Firearms Pass, range rules, weapon offences and self-defence, written from the Ustawa o broni i amunicji and the Kodeks karny as of November 2026.",`
- `EXAM_ORG`: `plbron: "Polish Police (regional headquarters' permit commissions) · firearms permit exam, theory part, in Polish",`
- Hub group (a Poland group for the non-driving tests, after Poland's driving group; shared
  with `plaplik` and `pllek`, so add `plbron` to that line once):
  `{ title: "Poland professional and licensing exams", ids: ["plaplik", "pllek", "plbron"] },`
  (if the integrator prefers firearms with firearms, the alternative is right after
  `"Australia firearms licences"`: `{ title: "Firearms licences", ids: [...au, "plbron"] }`; the
  Poland group is the brief's default)
  with `RELATED_OVERRIDES`: `plbron: ["aufirearmsnsw", "aufirearmsvic", "plaplik", "plteoria"],`
- `SEARCH_ALIASES` (Polish, with and without diacritics, and English):
  `plbron: "pozwolenie na broń pozwolenie na bron egzamin na pozwolenie na broń egzamin na pozwolenie na bron test na pozwolenie na broń test na bron testy na broń testy na bron pytania na pozwolenie na broń pytania egzaminacyjne broń egzamin na broń egzamin na bron ustawa o broni i amunicji pozwolenie na broń sportową pozwolenie na broń do ochrony osobistej pozwolenie na broń kolekcjonerską patent strzelecki obrona konieczna strzelnica komenda wojewódzka policji wpa polish firearms licence poland gun licence poland firearms permit exam polish gun permit test warszawa kraków wrocław poznań gdańsk łódź",`
- Native name on Polish surfaces, `english.name` elsewhere (the platform's language field).

## lib/region.ts

Region `PL` and the `/pl` homepage come from the shared Poland blocks in
`tools/next100/plaplik/WIRING.md`. This exam's lines:

- `TEST_REGIONS`: `plbron: "PL",`
- `NON_DRIVING_TESTS`: add `"plbron",` (next to `"plaplik", "pllek"`).
- `REGION_HOME.PL.testsSub`: append one sentence for this exam, for example
  `" Dla strzelców egzamin na pozwolenie na broń: 200 pytań z ustawy o broni i amunicji i Kodeksu karnego, sześć testów po 20 pytań i 18 do zaliczenia."`
- `AUTHORITY.PL` (components/home/HomePage.tsx): the shared string names "other Polish
  authorities", which covers the Police; if it is rewritten, include "the Police" /
  "Policją" (instrumental) in `AUTHORITY_PL_PL`.

## lib/landingContent.ts

```ts
import plbronPl from "@/lib/landings/plbron.pl.json";
  "plbron.pl": plbronPl as TranslatedLandingContent,
```

`TranslatedExamLanding` uses the base `landingPath` when `lang === exam.language`.

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  plbron: {
    answer:
      "Anyone applying for a firearm permit in Poland must pass an exam before a commission of at least three members named by the competent police authority, for firearms the regional police headquarters (in Warsaw the Metropolitan Police). The exam has a theory part and a practical part. The theory part is a test of 20 single-choice questions, each with three answers (A, B or C), taken in 30 minutes; you pass with at least 18 correct answers. It covers the Act on Weapons and Ammunition and the regulations issued under it, and the Penal Code provisions on weapon offences. Only after passing the theory do you sit the practical part at a shooting range, which checks range safety rules, the parts and handling of the weapon, loading, unloading and clearing stoppages, and includes a shooting test for each kind of firearm applied for; at least one commission member is a police or shooting instructor. Each part may be resat once. The exam is in Polish.",
    rows: [
      { label: "Run by", value: "Polish Police, the permit authority's exam commission" },
      { label: "Questions", value: "20 single choice, three options each" },
      { label: "Time", value: "30 minutes" },
      { label: "Pass mark", value: "At least 18 of 20 correct" },
      { label: "Scope", value: "Act on Weapons and Ammunition, its regulations, Penal Code" },
      { label: "Then", value: "Practical part at a range with a shooting test" },
      { label: "Resits", value: "One resit of each part" },
      { label: "Tigertest mock tests", value: "6 x 20 questions in Polish, 18 to pass" },
    ],
    basedOn: "Article 16 of the Act on Weapons and Ammunition of 21 May 1999 (Journal of Laws 2024 item 485 as amended) and the Minister of the Interior and Administration's regulation of 28 July 2023 on the exam (Journal of Laws 2023 item 1475), checked November 2026",
    source: { name: "Journal of Laws 2023 item 1475: regulation on the firearms permit exam (in Polish)", url: "https://api.sejm.gov.pl/eli/acts/DU/2023/1475/text.html" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Polish)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date, and `lib/landingDates.json` via
`scripts/build-landing-dates.ts`.

## lib/tigerAssets.ts

Borrow the firearms tiger used by the AU and ZA firearms exams, in `BORROWED_SETS`: `plbron: "capal",`.

## Teacher-led lists

Shooting clubs and firearms schools run courses for the permit exam, and the landing FAQ says a
club instructor can set up a class, so:
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"plbron",` (next to `"zafirearm"`).
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `plbron: "a firearms permit course at a shooting club",`
If the integrator would rather not, drop the last sentence of the fifth FAQ in
`lib/landings/plbron.pl.json` ("Jeśli uczysz się w klubie strzeleckim, ...").

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check `/pl/egzamin-na-pozwolenie-na-bron` is emitted once, hreflang
`pl-PL`, x-default to itself). Class questions import `lib/banks/all`. No redirects.

## lib/privacyRegion.ts

Not a children's test; nothing.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 28 to 60, so no parts.

## Question quality hooks

Run `python3 -I tools/build_exam_sources.py` (the first https URLs of `sources.md` are the Sejm ELI
texts of the exam regulation and the ustawa). Freshness events for `lib/examFreshness.json`: a new
tekst jednolity of the Ustawa o broni i amunicji (the 2024 one plus Dz. U. 2025 poz. 1795 and
2026 poz. 187; the latter enters into force 19.05.2028 and changes who issues the psychological
certificates, re-check the art. 15 items then), any new regulation replacing Dz. U. 2023 poz. 1475
(exam format), and amendments to KK art. 25, 26 and 263.

## Screenshots

`TranslatedExamLanding` reads `/landing/plbron-{mobile,desktop}-pl.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing plbron:poland-firearms-permit-exam:45801`
then rename the two files to the `-pl` names.

## CLAUDE.md (next to the other Polish exams or the AU firearms bullets)

```md
- **Pozwolenie na broń** (`plbron`, Polish firearms permit exam, theory part, native Polish, `language: "pl"`, `locale: "pl-PL"`, `review: { pl: "model" }`, `/poland-firearms-permit-exam/*`, landing `/pl/egzamin-na-pozwolenie-na-bron` from `lib/landings/plbron.pl.json`): `data/pl-bron-questions.json` (200 original questions written directly in Polish from the Ustawa o broni i amunicji, the storage regulation (Dz. U. 2023 poz. 364), the model range rules and the Kodeks karny: weapon types 28, permits 36, holder duties 32, storage, carrying and transport 24, European Firearms Pass and import/export 16, ranges 20, weapon offences 24, self-defence and necessity 20), six 20-question tests (IDs 45801-45806, 3/4/3/2/2/2/2/2 per test, 120 of 200 items) and five Polish-named topic sets 45801-45805 (28, 36, 32, 60, 44), 11 dashboard steps, state `PLBRON`, prefix `PLBRON-`, 90% pass (18 of 20, the real line: rozporządzenie MSWiA Dz. U. 2023 poz. 1475 § 4, 20 questions, 30 minutes, three options). Four options instead of three; the practical range part is not modelled; no fees, no exam-admin questions, no weapon construction. Built by `tools/next100/plbron/build.py`; sources in `tools/next100/plbron/sources.md`, terms in `glossary.md`. Region PL, Poland professional group, `[data-theme="plbron"]` dark olive, borrows the `capal` tiger.
```

## docs/exams/plbron.md (new notes file)

```md
# plbron: Egzamin na pozwolenie na broń, część teoretyczna (Poland)

- What: the theory part of the exam every applicant for a Polish firearm permit sits before a
  police commission (art. 16 ustawy o broni i amunicji). Native Polish exam, `language: "pl"`,
  `review: { pl: "model" }`.
- Real format (checked 2026-11-21, rozporządzenie MSWiA z 28.07.2023, Dz. U. poz. 1475): 20
  single-choice questions with three options (A, B, C), 30 minutes, pass with 18 (§ 4); scope is
  the ustawa with its regulations and the KK on weapon offences; then a practical part at a range
  with a shooting test (§ 5); one resit of each part (§ 7). Paid (percentage of the minimum
  wage, § 8); no amount on Tigertest.
- Tigertest: `data/pl-bron-questions.json`, 200 items in 8 categories (plbrPojecia 28,
  plbrPozwolenia 36, plbrObowiazki 32, plbrPrzechowywanie 24, plbrGranica 16, plbrStrzelnica 20,
  plbrKarne 24, plbrObrona 20); six 20-question tests 45801-45806 (3/4/3/2/2/2/2/2), five topic
  sets 45801-45805 (28/36/32/60/44), 11 steps; passPct 90 (18 of 20). Four options instead of three.
- IDs: idBase 45800, state `PLBRON`, prefix `PLBRON-`, segments POJ POZ OBO PRZ EKB STR KAR OBR.
- Sources: `tools/next100/plbron/sources.md` (Sejm ELI texts: ustawa t.j. 2024 poz. 485,
  storage regulation t.j. 2023 poz. 364, wzorcowy regulamin strzelnic 2000 poz. 234 as amended,
  KK t.j. 2026 poz. 1342, KW t.j. 2026 poz. 1372). Build: `python3 -I tools/next100/plbron/build.py`.
- Theme `[data-theme="plbron"]` (suggested 68 30% 20%, dark olive), tiger borrowed from `capal`,
  region PL, hub group "Poland professional and licensing exams", landing
  `/pl/egzamin-na-pozwolenie-na-bron`.
- Not modelled: the practical part, three-option format, the police-published regional banks
  (never copied), exam admin (fee, resits, exemptions), hunting law and entity rules beyond storage.
- Quirks: the 2026 psychologists' act (Dz. U. 2026 poz. 187, in force 19.05.2028) will change the
  art. 15 certificate wording; KK and KW consolidated texts of October 2026 used.
- Lane: the KK general part is shared with `plaplik`; this bank avoids its pairs (art. 9 § 1,
  10, 25 § 2a, 31 § 3).
```

## Decisions for the integrator

1. **Pass mark and length.** 90 (18 of 20) at the real 20-question length; tests use 120 of the
   200 items and the other 80 are training-only. More tests would push the dashboard past 12
   steps, so 6 tests + 5 sets = 11.
2. **Hue.** Suggested `28 64% 34%` clashes; proposed `68 30% 20%` (dark olive). Check it on the
   shared header and buttons.
3. **Hub group.** Poland professional group (brief default) vs. a firearms group with the AU exams.
4. **Teacher-led.** Added on the strength of shooting-club courses; drop together with the FAQ
   sentence if not wanted.
5. **Register.** Questions impersonal (statute style), landing and dashboard "ty".
