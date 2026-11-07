# Wiring for `detheorie` in English (en, locale en-DE)

The German theory test is a native German exam (base bank and copy in German). This adds its
British English translation for people living in Germany who sit the test in English, as
`translations.en` on the same exam id: same questionIds, order, categories, keys and option
order, so tests, sets and progress are identical across the two languages.

Files already written (no edits needed):
- `data/de-theorie-questions_en.json` (210 rows; `validate_translation.py --lang en` PASS)
- `tools/next100/detheorie/en/` (`t_gef.py`, `t_ver.py`, `t_vor_vz.py`, `t_rest.py`, `build.py`,
  `check.py`, `glossary.md`, `NOTES.md`). Rebuild with `python3 -I tools/next100/detheorie/en/build.py`.
- `lib/examTranslations/detheorie.en.json` (locale `en-DE`, landingPath
  `/en/fuehrerschein-theorie-test`, English set names, category labels and copy, five heroSubs)
- `lib/landings/detheorie.en.json` (same keys as `detheorie.de.json`, plus one FAQ "Can I take
  the German theory test in English?")
- `app/en/fuehrerschein-theorie-test/page.tsx` (three-line `TranslatedExamLanding` wrapper,
  `lang="en"`, `samples related`)
- `lib/banks/detheorie.ts` (edited: registers the English bank, below)

Review status: **machine** (machine translation pending native review) for the bank, the exam
copy and the landing.

Validation:
```
python3 -I .claude/skills/exam-bank/scripts/validate_translation.py data/de-theorie-questions.json data/de-theorie-questions_en.json --lang en
python3 -I tools/next100/detheorie/en/check.py
```

Everything below goes in shared files.

## lib/banks/detheorie.ts (done)

```ts
import { Question } from "@/types";
import detheorieQuestions from "@/data/de-theorie-questions.json";
import detheorieQuestionsEn from "@/data/de-theorie-questions_en.json";
import { registerExamBanks } from "@/lib/examData";

registerExamBanks({ detheorie: detheorieQuestions as Question[] }, { detheorie: { en: detheorieQuestionsEn as Question[] } });
```

## lib/exams.ts

Import with the other translation JSONs at the top of the file:

```ts
import detheorieEn from "./examTranslations/detheorie.en.json";
```

On the `detheorie` config (after `english: {...}`), replace the `review` line and add
`translations`:

```ts
  translations: {
    en: examTranslation(detheorieEn),
  },
  review: { de: "model", en: "machine" },
```

`detheorie` uses five topic sets (not `testSets()`), so the JSON carries a `trainingSets` block
with English names and weight labels for sets 1 to 5; no set is split into parts.

With `translations.en` present, `examLanguages(detheorie)` becomes `["de", "en"]`, so the
`TestLanguageChoice` on the dashboard offers English, and a person whose interface language is
English gets the English questions by default (`examLanguage()` picks the interface language
when the exam has it). Nothing else in the config changes.

## lib/examSeo.ts: x-default must stay on the German landing

The native German landing is x-default for this exam. Today `examLandingAlternates()` moves
x-default to any translation whose locale ends in the country tag, and `en-DE` ends in `-DE`,
so it would pick the English page. Limit that rule to English-base exams (it exists so that
Spain's and Portugal's own-language translations win over an English base):

```ts
    if (countryTag && base === "en" && tr.locale?.endsWith(countryTag)) xDefault = url;
```

Result for detheorie: `de-DE` and `x-default` = `/de/fuehrerschein-theorie-test`, `en-DE` =
`/en/fuehrerschein-theorie-test`. The German landing already passes
`examLandingAlternates("detheorie")` through `translatedLandingMetadata`, so hreflang is
reciprocal once the config is wired; the English page gets `og:locale en_DE`, `inLanguage en-DE`
and EUR offers from `TranslatedExamLanding`.

## lib/examData.ts: callers with no language should get the base bank

`getExamQuestions(examId, language = "en")` returns `TRANSLATED_BANKS[examId]["en"]` when a call
passes no language. Before this, no exam had an `en` translation, so the default always fell
through to the base bank. Now `lib/server/classQuestions.ts` (class and quiz reports, admin
question lookups) and `scripts/build-training-parts.ts` would read the English text for
detheorie. Same ids, categories and keys, so nothing breaks, but reports would mix languages.
Suggested change:

```ts
export function getExamQuestions(examId: ExamId, language?: Language): Question[] {
  const bank = (language ? TRANSLATED_BANKS[examId]?.[language] : undefined) ?? BANKS[examId];
```

(Every page-side caller already passes a language: `examTestGenerator`, `ExamStatsPage`,
`ExamSampleQuestions`, `mcpCatalogPractice`.)

## Landing and SEO

- `app/en/` is a new top-level folder holding only this page. The root layout already serves
  `<html lang="en">`, so no `URL_LANGUAGE_PREFIXES` entry is needed (an `/en` prefix would only
  matter if `LanguageContext` should force English on it, which the page content already is).
  Check that `middleware.ts` and `next.config.ts` have nothing matching `/en/*` (they did not when
  this was written). Note `/en` itself is not a page and stays a 404.
- Screenshots: `TranslatedExamLanding` expects `public/landing/detheorie-mobile-en.png` and
  `public/landing/detheorie-desktop-en.png` (and the `-dark` pair like the German ones). Not made
  (no npm or dev server in this session); shoot them with
  `.claude/skills/exam-bank/scripts/shoot_landing.js` once wired.
- OG image: `shareImageUrl("detheorie", "en")`; check `app/og/[examId]` renders the English
  name for `lang=en` (it should read `localizeExam(exam, "en")`).
- Sitemap and `llms.txt` pick up the translation landing path from `translations`
  automatically (`lib/sitemaps.ts` reads `tr.landingPath`). Bump `EXAM_LANDINGS_UPDATED_AT` in
  `lib/seoDates.ts` and run `npx tsx scripts/build-landing-dates.ts`.
- `facts.source` in the English landing JSON overrides `EXAM_FACTS.detheorie.source` with an
  English link text ("TÜV | DEKRA arge tp 21: driving licence test", same URL).
- Catalog: the card for detheorie may show a flag per language; add `en` to its
  `TestCatalogEntry.languages` if that list is not derived from `translations`. The search
  aliases in `lib/testCatalog.ts` already include "german driving theory test", "germany driving
  licence theory test"; add "theory test in english germany" and "führerschein english" so an
  English search lands on this page:
  ```
  detheorie: "... german driving theory test germany driving licence theory test german driving test class b theory test in english germany führerschein in english fuehrerschein english ...",
  ```
- Region DE: the `/de` homepage is German. When the visitor's interface language is English
  (`app/home-lang/DE/en`), the DE test card should link to `/en/fuehrerschein-theorie-test`
  ("Test cards link to a test's landing in the page's language when it has one", which follows
  from `translations.en.landingPath`). Optionally add an English line to `REGION_HOME.DE` or the
  home copy pointing at it.
- `lib/landingContent.ts` registers landing JSONs a non-English homepage quotes; the German one is
  already there. Register `detheorie.en.json` too if the English DE homepage
  (`home-lang/DE/en`) should quote the English facts answer.

## Other per-language tables

- Category labels: English labels are in `detheorie.en.json` (`categoryLabels`); results and
  stats read the exam's own labels before `i18n`, so nothing is needed in `i18n/en.ts`.
- `TEST_SET_NAMES` / `EXAM_UI` / `SAMPLE_COPY` / `RELATED_COPY` / `CARD_FOOTERS` / `COPY` in
  `ExamLandingHero` already have `en`.
- Shuffle guard: no option in either bank is position-dependent (`guarded 0` in the validator);
  nothing to add.
- Exam facts: `EXAM_FACTS.detheorie` is English already; leave it.
