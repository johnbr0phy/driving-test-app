# Native-language exams: plan

Status: plan, November 2026. Owner: integrator. Nothing here is built yet.

Goal: run exams whose own language is not English (Germany, France, Spain, Italy, Poland,
Netherlands, Portugal, later Latin America, Brazil, Turkey, Indonesia) on the existing v1 engine,
with the fewest changes to the shared code.

What exists today:
- UI dictionaries in `i18n/{en,es,vi,ko,zh}.ts`.
- v1 exams with translated banks (`TRANSLATED_BANKS` in `lib/examData.ts`, the same ids and keys as
  the English bank) and translated landings at `/<lang>/<slug>`, rendered by
  `components/exam/TranslatedExamLanding.tsx`.
- The DMV in five languages.
- English country homepages (`lib/region.ts`, `components/home/HomePage.tsx`).

## 0. Fix now (found while planning)

- **The English Spain homepage would be labelled Spanish.** `app/es/layout.tsx` wraps everything
  under `/es` in `<div lang="es">`, so the EU batch's English Spain homepage at `/es` would be tagged
  Spanish. Wrap that page in `lang="en"` (and `en-ES` hreflang), or add `lang` to `REGIONS` now
  (section 4).
- **DMV pages would show German chrome over English questions.** The footer switcher on DMV pages
  lists every language. Once a landing sets the language to `de`, the DMV chrome turns German while
  `getQuestionsData` falls back to English questions. Needs `DMV_LANGUAGES` and a DMV-only language
  limit before any new language ships.
- **Language choices are lost on sign-in.** `store/useStore.ts` (about line 944) keeps the saved
  `users/{uid}.language` only when it is `en` or `es`, so vi, ko and zh are already dropped. Fix with
  `isLanguage()`.
- **Missing dictionary keys show as raw key paths.** `createT` returns the key path (for example
  `categories.foo`) when a dictionary lacks a key. New dictionaries need it to fall back to English.

## 1. Data model

### 1.1 One exam id per real test, any base language

Rule: one `ExamId` per real-world test. The bank written first is the base bank; every other
language is a translation aligned by `questionId`.

- Spain: `esdgt` (English) stays the base. Spanish becomes `translations.es` plus
  `TRANSLATED_BANKS.esdgt.es`: today's Translated exams mechanism unchanged.
- Portugal: `ptimt` the same way, with `translations.pt`.
- Germany, Italy, France, Poland, Netherlands, Turkey, Brazil, Indonesia: a new exam whose base bank
  is in the local language. An English version, if added later, is `translations.en`.

Same id, not a separate `esdgt-es`, because:
- One progress record: training sets, tests, classes, `analytics/questions.byExam`, enrollments and
  `primaryExam` all key on the exam id. Two ids would split one country's learners and double the
  catalog cards.
- Same content: DGT and IMT tests have the same content in every language offered, so one blueprint
  and one answer key is the honest model. A key fix applies to both banks.
- Fewest changes: Spain and Portugal need zero new data-model code.
- Let the translator reword each stem idiomatically, as long as the key, option meaning and option
  order stay the same.

### 1.2 ExamConfig changes (`lib/exams.ts`)

```ts
/** Language of the base bank and base copy (name, categoryLabels, copy). Default "en". */
language?: Language;
/** BCP 47 tag of the base language for hreflang, og:locale, JSON-LD inLanguage and dates: "de-DE". */
locale?: string;
/** English names for English surfaces (catalog, /tests, All tests menu, llms.txt, admin, emails). */
english?: { name: string; shortName: string; fullName: string };
/** Review state per language: "machine", "model" (written natively by a model), "native" (paid native reviewer done). */
review?: Partial<Record<Language, "machine" | "model" | "native">>;
```

Also:
- Widen `translations?` to `Partial<Record<Language, ExamTranslation>>` so a German-base exam can
  carry `en`; add `locale?: string` to `ExamTranslation` (`esdgt` es is `es-ES`, `/es/examen-cna`
  stays `es-US`).
- `examLanguages(exam)`: `[exam.language ?? "en", ...other translation keys]`.
- `examLanguage(exam, language)`: fall back to `exam.language ?? "en"` (the core change: an
  English-UI person opening the German exam gets German questions).
- `localizeExam(exam, lang)`: unchanged exam when `lang` is the base language.
- `TEST_SET_NAMES`: de "Übungsset N", fr "Série d'entraînement N", it "Set di esercizi N",
  pl "Zestaw treningowy N", nl "Oefenset N", pt "Conjunto de treino N".
- `trainingPartName()`: the "part 2 of 3" pattern per language.
- `getExamByPath()`: no change.

### 1.3 Banks

No change to `registerExamBanks()` or `getExamQuestions()`: `TRANSLATED_BANKS[id][lang] ?? BANKS[id]`
already falls back to the base bank, which for a German-base exam is German. Server callers with no
language (`lib/server/classQuestions.ts`, `ExamSampleQuestions`) get the base bank.

### 1.4 Shuffle guard (`lib/shuffleOptions.ts`)

Per-language pattern list joined at module load:
- de: `A und B`, `A oder B`, `Beide`, `Alle Antworten sind richtig`, `Keine der Antworten`
- fr: `A et B`, `A ou B`, `Les deux`, `Toutes les réponses`, `Aucune de ces réponses`
- it: `A e B`, `A o B`, `Entrambe`, `Tutte le precedenti`, `Nessuna delle precedenti`
- pl: `A i B`, `A lub B`, `Obie`, `Wszystkie powyższe`, `Żadna z powyższych`
- nl: `A en B`, `A of B`, `Beide`, `Alle bovenstaande`, `Geen van de bovenstaande`
- pt: `A e B`, `A ou B`, `Ambas`, `Todas as anteriores`, `Nenhuma das anteriores`
- later tr: `A ve B`, `Hepsi`, `Hiçbiri`; id: `A dan B`, `Semua benar`

### 1.5 Validators

`validate_bank.py` gets `--lang xx` (banned phrases and option-reference connectors per language)
and `--len-scale` (defaults de 1.3, nl 1.25, fr 1.2, pl 1.2, it 1.15, pt 1.15, es 1.15, tr 1.1,
applied to the 12..42 average and the 110-character soft limit). The em-dash ban stays.

New `validate_translation.py <base.json> <xx.json> --lang xx`: same questionIds in the same order,
same category, correctAnswer and correctIndex; no text field identical to the base (numbers and sign
codes whitelisted); position-dependent-answer parity per row; the language's banned phrases.

### 1.6 Catalog

`languages: examLanguages(exam)` already puts the base first. Native exams use `exam.english?.name`
on English surfaces (`/tests`, US homepage, All tests menu, llms.txt, admin) and the native name on
their own country homepage. Search aliases list native and English terms.

## 2. UI language

### 2.1 Dictionaries

`i18n/en.ts` is about 1,680 lines; about 960 are `categories` (a new dictionary may omit them),
leaving about 560 strings (about 3,400 words).

1. English fallback in `createT()` (`i18n/index.ts`).
2. `ResultsHeroDebrief` (and `app/stats/page.tsx`) prefer the localized `exam.categoryLabels`, so
   native exams never need category labels in `i18n/*`.
3. New `i18n/{de,fr,it,pl,nl,pt}.ts`, typed `TranslationKeys`, `categories: {}`, DMV-only blocks may
   stay English. About 700 lines and 4,000 words each. Machine-translate with a glossary, mark
   "machine-translated, pending native review", then book a native review per language.
4. Other per-language tables: `TEST_SET_NAMES`, `trainingPartName` (`lib/exams.ts`); `EXAM_UI`
   (`lib/examUi.ts`, with `dateLocale`, and the missing `zh`); `COPY` in
   `components/exam/ExamLandingHero.tsx`; headings in `ExamSampleQuestions.tsx` and
   `ExamRelatedTests.tsx`; language branches in `components/Footer.tsx`; `LANGUAGE_NAMES` in
   `lib/llmsTxt.ts`.
5. `i18n/index.ts`: extend `Language` and `LANGUAGES` (Deutsch, Français, Italiano, Polski,
   Nederlands, Português) and export `DMV_LANGUAGES = ["en", "es", "vi", "ko", "zh"]`.

Later: `tr`, `id`, and `pt-BR` as a separate dictionary (European and Brazilian Portuguese UI
differ). `es` stays one dictionary; reword the few Latin American strings ("celular",
"computadora") neutrally for Spain.

Register: questions neutral or formal like the official catalogues (German "Sie"); UI the
consumer-app norm (German "du", French "vous", Italian "tu", Polish "ty", Dutch "je", European
Portuguese without pronouns, Brazilian "você", Turkish "sen", Indonesian "Anda").

### 2.2 The exam's language wins on its pages

In `contexts/LanguageContext.tsx`, keep the stored choice as `preferredLanguage` and expose an
effective `language` from `usePathname()`:
- a registry exam whose `language` is not `"en"`: `examLanguage(exam, preferred)`;
- DMV paths: preferred if in `DMV_LANGUAGES`, else `"en"`;
- a country homepage: that region's `lang`;
- anything else: preferred.
Set `document.documentElement.lang` from it. Fix the `useStore.ts` language load with `isLanguage()`.
Audit hard-coded English on v1 exam pages with a dev-only bracketing pseudo-locale.

### 2.3 Footer switcher

DMV pages: `DMV_LANGUAGES`. Registry exam app pages: `examLanguages(exam)` when more than one.
Neutral pages: every language with a full dictionary. Landings: unchanged.

## 3. URLs and SEO

### 3.1 Paths

A country-bound exam's landing in that country's language lives under the country homepage path
(for DE, FR, IT, PL, NL, ES, PT the country code is the language code):

| Exam | Base or translation | Landing | App slug (noindex) |
|---|---|---|---|
| esdgt | en base, es translation | `/spain-driving-theory-test`, `/es/test-dgt-permiso-b` | `/spain-driving-theory` |
| ptimt | en base, pt translation | `/portugal-driving-theory-test`, `/pt/testes-codigo-imt` | `/portugal-driving-theory` |
| detheorie | de base | `/de/fuehrerschein-theorie-test` | `/fuehrerschein-theorie` |
| itpatente | it base | `/it/quiz-patente-b` | `/quiz-patente` |
| frcode | fr base | `/fr/code-de-la-route-test` | `/code-de-la-route` |
| plteoria | pl base | `/pl/testy-na-prawo-jazdy-kategoria-b` | `/prawo-jazdy-teoria` |
| nlcbr | nl base | `/nl/cbr-theorie-oefenen` | `/cbr-theorie` |
| trehliyet (later) | tr base | `/tr/ehliyet-sinav-sorulari` | `/ehliyet-sinavi` |
| brdetran (later) | pt-BR base | `/br/simulado-detran` | `/simulado-detran` |
| idsim (later) | id base | `/id/soal-ujian-teori-sim` | `/ujian-sim` |

ASCII slugs in the language people search. Each landing is the three-line `TranslatedExamLanding`
wrapper with `lib/landings/<id>.<lang>.json`. `app/{de,fr,it,pl,nl,pt}/layout.tsx` copy
`app/es/layout.tsx`. `/es/*` already holds US Spanish pages and the `app/es/[slug]` DMV state route;
static folders win, avoid slugs ending `-examen-practica-dmv`.

### 3.2 `TranslatedExamLanding` for any non-English page

`urls()` uses `exam.landingPath` when `lang` is the base language; locale from the exam or
translation; optional `ExamSampleQuestions` (Quiz JSON-LD with `inLanguage`) and
`ExamRelatedTests`; `priceCurrency` EUR for EU exams.

### 3.3 hreflang

`examLandingAlternates()` in `lib/examSeo.ts`: locale-tagged keys (`en`, `es-ES`, `x-default`);
x-default is the landing in the test's main language (Spanish page for Spain); US exams keep the
English x-default. `REGION_HREFLANG` derives from `REGIONS[].locale`.

### 3.4 Country homepages in the local language

One homepage per country, in its language, at its usual path; English versions of its tests are
listed on it with the English flag and link to their English landings. Needs
`components/home/homeCopy.ts` (about 30 strings plus the `faqsFor` template per language),
`HomePage.tsx` reading `regionInfo(region).lang`, "About each test" from the landing JSON's
`facts.answer`, and `REGION_HOME[region]` written in the page's language.

### 3.5 Sitemap, llms.txt, ExamFacts, JSON-LD

Sitemap: already lists translation landing paths; bump `EXAM_LANDINGS_UPDATED_AT`. llms.txt stays
English (`english.name` with "(in German)"). `EXAM_FACTS[id]` stays English; the native landing's
facts come from its landing JSON. `ExamFacts.tsx` uses `regionInfo(r).locale` and
`Intl.DateTimeFormat(locale)`. JSON-LD `inLanguage` from the locale.

### 3.6 OG cards

Inter (`public/fonts/share/Inter-{Regular,Bold}.ttf`) covers Polish, German (ß, ẞ), French (œ « »),
Spanish, Portuguese, Italian, Romanian, Hungarian, Turkish, Greek and Cyrillic; only CJK is missing.
`getShareCard(id, language)` should use share copy in the exam's base language with a per-language
footer. Keep German card titles short.

## 4. Regions

- English EU batch (in progress): ES, PT, RO, SE, GR, DK, HU, BE, FI, MT as English country pages.
- DE, FR, IT, PL, NL arrive with their first native exam, native from day one.
- ES and PT switch to Spanish and Portuguese pages when `esdgt.es` and `ptimt.pt` ship; URLs stay.

`lib/region.ts`: `REGIONS` gains `lang` (default `"en"`) and `locale`; `REGION_HOME` in `lang`;
native driving tests stay out of `NON_DRIVING_TESTS`; `regionFromCountry` DE, FR (plus MC),
IT (plus SM, VA), PL, NL; leave AT, CH, LU, LI unmapped (own tests and rules). `middleware.ts`
needs no change.

`components/CountryPills.tsx`: with about 31 countries the row is too long: show the visitor's
country, the last chosen and the five largest, plus "More countries" (plain `<a>` list for
crawlers). Admin: "By country" card and `visit_region_*` keys need the new codes.

## 5. Content pipeline

### 5.1 Write natively or translate

- English sibling with identical content (ES, PT, later Belgium FR/NL): translate item by item with
  the authority's own terms from a glossary (Spain: permiso B, turismo, arcén, glorieta, vía
  interurbana, adelantamiento; Portugal: Código da Estrada, faixa de rodagem, berma, rotunda,
  ultrapassagem, taxa de alcoolemia). Reword for idiom; never change the key, option meaning or
  order. Run `validate_translation.py`.
- Native-only exams (DE, IT, FR, PL, NL, TR, BR, ID): write directly in the target language from
  official law and manuals (StVO, StVZO, FeV; Codice della Strada; Code de la route; Prawo o ruchu
  drogowym; RVV 1990; Karayolları Trafik Kanunu; CTB and CONTRAN; UU LLAJ 22/2009). Never draft in
  English and translate. The builder writes `tools/next100/<id>/glossary.md` and English names in
  `WIRING.md`.
- Typography: French non-breaking space before ? ! : ; and « »; German „ “; Polish „ ”; decimal
  comma (0,5 ‰); dates DD.MM.YYYY; km/h and m.
- Same house rules: original questions only, no verbatim official items, signs described in words,
  no amounts that change unless stated in current law with the date, landing says what is not
  modelled.

### 5.2 Review

1. Builder, then a `REVIEW.md` reviewer pass in that language (add a "Native-language banks"
   section: grammar, register, official terms, key against the cited article).
2. Ship with `review: { de: "model" }` (or `"machine"` for translated banks and UI dictionaries).
3. Book a paid native reviewer per language (UI dictionary about 4,000 words; a bank about 12,000 to
   15,000) and set `"native"` when done.
4. The admin data-health list shows every exam and language not yet `"native"`.

### 5.3 Per-country fit (verify every figure from the authority before writing)

| Country | Real test (to verify) | Text fit | Notes |
|---|---|---|---|
| Spain (DGT) | 30 questions, 30 min, max 3 wrong, 3 options, some photo items, offered in English | Good | 4 options here, 3 on the real test: disclose or add 3-option support (phase 3). |
| Portugal (IMT) | About 30 questions, 30 min, max 3 wrong, offered in English | Good | pt-PT, never Brazilian forms. |
| Germany | Class B: 30 questions (20 basic, 10 class), official catalogue revised each April and October, 2 to 5 error points, fail above 10 or with two 5-point errors, some multi-answer, numeric and video questions, offered in 12 languages incl. English | Good for most of the catalogue | Original items on the catalogue's chapters, never copied. Not modelled: point weighting, multi-answer (rewritten as single best answer), video. `testSets(idBase, n, 30)`. |
| Italy | 30 true/false statements, 20 min, max 3 wrong, many on a pictured sign | Good once true/false exists | Needs a 2-option format (phase 2). |
| France (ETG) | 40 questions, 35 to pass, every question photo or video, some multi-answer, confidential bank | Weak | Only honest as rule revision by the 10 themes, labelled so. Phase 3. |
| Poland | 32 questions (20 yes/no, 12 A/B/C), 74 points, 68 to pass, every question has a photo or film | Weak | Needs yes/no, 3-option and media. Phase 3. |
| Netherlands (CBR) | 65 questions in three parts (hazard perception, knowledge, insight), photo-based | Weak | Knowledge part only, labelled. Phase 3. |
| Turkey (MEB e-sınav) | 50 questions, 45 min, 70 to pass, 4 options | Very good | Watch Turkish i/İ casing. |
| Brazil (DETRAN) | 30 questions, 21 to pass, 4 options, national CONTRAN syllabus | Very good | pt-BR dictionary, region BR; check 2025-2026 CNH changes. |
| Indonesia (SIM) | About 30 questions, format changed recently | Fair | Verify first; CPNS is a bigger later market. |
| Latin America | Peru (official 200-question list), Chile (CONASET class B), Argentina by province, Colombia | Good for Peru, Chile | Spanish UI as is, `/pe`, `/cl` in Spanish. |

## 6. Phased rollout

### Phase 0: platform (one integrator session, about 30 files)

Code: `i18n/index.ts` (Language, LANGUAGES, DMV_LANGUAGES, English fallback);
`i18n/{de,fr,it,pl,nl,pt}.ts`; `contexts/LanguageContext.tsx`; `store/useStore.ts`; `lib/exams.ts`;
`lib/examUi.ts`; `lib/shuffleOptions.ts`; `lib/examSeo.ts`; `lib/testCatalog.ts`; `lib/region.ts`;
`components/home/HomePage.tsx` plus new `homeCopy.ts`; `components/CountryPills.tsx`;
`components/Footer.tsx`; `components/exam/{TranslatedExamLanding,ExamLandingHero,ExamSampleQuestions,ExamRelatedTests,ExamFacts}.tsx`;
`components/results/ResultsHeroDebrief.tsx`; `lib/shareCards.ts`; `lib/llmsTxt.ts`.
Tooling and docs: `validate_bank.py` (`--lang`, `--len-scale`), new `validate_translation.py`,
`.claude/skills/exam-bank/references/wiring.md`, `tools/next100/BRIEF.md` (native batch section),
`tools/next100/REVIEW.md`, `CLAUDE.md` ("Native-language exams").
Acceptance: tsc clean; pseudo-locale shows no hard-coded English on v1 exam pages; an English exam in
German UI shows German chrome; DMV pages with stored `de` show English; CDL es unchanged.

### Phase 1: first native exams

1. Spain: `esdgt` in Spanish (translation; `/es` homepage turns Spanish).
2. Portugal: `ptimt` in Portuguese (same steps, pt-PT; `/pt` turns Portuguese).
3. Germany: `detheorie`, native German (largest EU market, text-modellable, English offered so a
   later `translations.en` reuses the id). Next free id block (14700 if free), region DE, `/de`.

Italy waits for true/false; France, Poland and the Netherlands are photo or video exams text cannot
model honestly.

### Phase 2: format and new markets

True/false format (`ExamConfig.answerFormat`, two-option rendering, `validate_bank.py --format tf`)
then Italy `itpatente`; EU sign images in `lib/signImages.ts` (public-domain Vienna Convention SVGs);
Turkey `trehliyet`; Brazil `brdetran`; Peru or Chile; `translations.en` for `detheorie`.

### Phase 3: hard ones and the long tail

3-option support; France `frcode` (rule revision, labelled); Netherlands `nlcbr` (knowledge part);
Poland `plteoria` (only with media cleared); Indonesia; Argentina and Colombia; Belgian FR and NL
versions of `bedriving`; localized emails.
