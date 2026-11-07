# Wiring for `rodrpciv` in Romanian (ro-RO)

Files already written (no edits needed):
- `data/romania-drpciv-questions_ro.json` (200 rows, same ids, order, categories, keys and option
  order as the English bank; `check.py` and `validate_translation.py --lang ro` PASS)
- `lib/examTranslations/rodrpciv.ro.json` (locale `ro-RO`, landingPath `/ro/chestionare-drpciv-categoria-b`)
- `lib/landings/rodrpciv.ro.json`
- `app/ro/chestionare-drpciv-categoria-b/page.tsx` (three-line `TranslatedExamLanding` wrapper, `samples related`)
- `lib/banks/rodrpciv.ts` (now registers the Romanian bank, line below)
- `tools/next100/rodrpciv/ro/*` (sources, `build.py`, `check.py`, `glossary.md`, `NOTES.md`).
  Rebuild with `python3 -I tools/next100/rodrpciv/ro/build.py`.

Review status: **machine** (machine translation, pending native review), for the bank, the exam
copy and the landing.

Everything below goes in shared files.

## lib/banks/rodrpciv.ts (done)

```ts
registerExamBanks({ rodrpciv: rodrpcivQuestions as Question[] }, { rodrpciv: { ro: rodrpcivQuestionsRo as Question[] } });
```

## lib/exams.ts

Import with the other translation JSONs (top of file, next to `ptimtPt`):

```ts
import rodrpcivRo from "./examTranslations/rodrpciv.ro.json";
```

At the end of the `rodrpciv` config (after `copy`, as `ptimt` has it):

```ts
  review: { ro: "machine" },
  translations: {
    ro: examTranslation(rodrpcivRo),
  },
```

The rodrpciv training sets are topic sets (not `testSets()`), so the JSON has a `trainingSets`
block with Romanian names and weight labels for sets 1 to 4; no set is over 60, so no `partNames`.

## Landing and SEO

- hreflang and x-default: `examLandingAlternates("rodrpciv")` needs no change. The base is English
  and the translation's locale `ro-RO` ends with the exam's country tag (`TEST_REGIONS.rodrpciv =
  "RO"`), so it returns `en` (English landing), `ro-RO` (Romanian landing) and **x-default = the
  Romanian landing** `/ro/chestionare-drpciv-categoria-b`, the native landing for this exam.
- The English landing `app/romania-driving-theory-test/page.tsx` sets only `canonical`; add the
  alternates so hreflang is reciprocal (as `app/portugal-driving-theory-test/page.tsx` does):

```ts
import { examLandingAlternates } from "@/lib/examSeo";
// ...
  alternates: {
    canonical: `${siteUrl}/romania-driving-theory-test`,
    languages: examLandingAlternates("rodrpciv"),
  },
```

- `app/ro/` has no layout; `lib/urlLanguage.ts` already maps `/ro` to `lang="ro"` (Content-Language
  and `<html lang>`), and `TranslatedExamLanding` already prices RO in RON and takes og:locale and
  inLanguage `ro-RO` from the translation's `locale`.
- The landing JSON carries `facts.source` in Romanian (DGPCI, same URL as `EXAM_FACTS.rodrpciv`).
- `lib/landingContent.ts` (only needed if a Romanian-language homepage should quote it under
  "About each test"):

```ts
import rodrpcivRo from "@/lib/landings/rodrpciv.ro.json";
// in LANDINGS:
  "rodrpciv.ro": rodrpcivRo as TranslatedLandingContent,
```

- Screenshots: `TranslatedExamLanding` expects `public/landing/rodrpciv-mobile-ro.png` and
  `public/landing/rodrpciv-desktop-ro.png` (plus `-dark` variants if the English set has them);
  not made (no dev server in this session).
- Sitemap and `llms.txt` pick up the translation's landingPath automatically. Bump
  `EXAM_LANDINGS_UPDATED_AT` in `lib/seoDates.ts` (append "the Romanian DRPCIV landing (rodrpciv ro)")
  and rerun `npx tsx scripts/build-landing-dates.ts` after committing.

## Other per-language tables

- Category labels: the Romanian labels are in `rodrpciv.ro.json` (`categoryLabels`), which results
  and stats pages read before `i18n` categories. If any surface still reads `i18n/ro.ts`
  `categories.*`, add:
  `rodrLicence` "Permis, examen și documente", `rodrWarning` "Indicatoare de avertizare",
  `rodrRegulatory` "Indicatoare de prioritate, interzicere și obligare",
  `rodrMarkings` "Marcaje, semafoare și semnalele polițistului",
  `rodrPriority` "Prioritate, intersecții, tramvaie și treceri la nivel",
  `rodrSpeed` "Limite de viteză, depășire și benzi", `rodrParking` "Oprire, staționare și autostrăzi",
  `rodrSafety` "Alcool, centuri, lumini și comportament",
  `rodrEmergency` "Defecțiuni, accidente și prim ajutor".
- Shuffle guard: no option in either bank references other options (guarded 0 in both);
  `lib/shuffleOptions.ts` already has the Romanian list. The one translated option that began with
  "Ambii" was reworded ("Cei doi conducători au permis").
- `lib/testCatalog.ts` `SEARCH_ALIASES.rodrpciv` already holds "chestionare drpciv" and "chestionare
  auto categoria b"; optionally append Romanian words with diacritics:
  `"chestionare auto drpciv romana examen teoretic sala permis categoria b codul rutier indicatoare rutiere"`.
- Region: `RO` homepage is English today (`REGIONS` `lang: "en"`). When it switches to Romanian,
  point `REGION_HOME.RO.cta` at `/ro/chestionare-drpciv-categoria-b` and list the English version
  with the English flag. A test card in a Romanian page already links to the landing in the page's
  language once the translation is registered.
- The exam's `examLanguages()` becomes `en, ro`: the dashboard's `TestLanguageChoice` and the
  footer switcher on its app pages will offer Romanian with no further change.

## Validation

```
python3 -I tools/next100/rodrpciv/ro/build.py      # runs check.py, writes the bank
python3 -I .claude/skills/exam-bank/scripts/validate_translation.py data/romania-drpciv-questions.json data/romania-drpciv-questions_ro.json --lang ro
python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/romania-drpciv-questions_ro.json --lang ro
```

All three PASS (November 2026). `check.py` checks: same ids in the same order; same type, state,
category, correctAnswer, correctIndex; every text field translated; four distinct options; the
position guard identical per row; no em or en dashes; decimal comma; comma-below ș ț; Romanian
quotes; no "tu" forms in questions; no leftover English words.
