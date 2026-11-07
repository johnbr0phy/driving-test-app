# Wiring for `fitheory` in Finnish (fi-FI)

Files already written (no edits needed): `data/finland-driving-theory-questions_fi.json` (200,
same ids, order, categories, keys and option order as the English bank; `check.py` and
`validate_translation.py --lang fi` PASS), `lib/examTranslations/fitheory.fi.json`,
`lib/landings/fitheory.fi.json`, `app/fi/ajokortin-teoriakoe/page.tsx` (three-line
`TranslatedExamLanding` wrapper), `tools/next100/fitheory/fi/*` (sources `t_*.py`, `build.py`,
`check.py`, `glossary.md`, `NOTES.md`). Rebuild the bank with
`python3 -I tools/next100/fitheory/fi/build.py`.

Review status: **machine** (machine translation, pending native review), for the bank, the exam
copy and the landing.

## lib/banks/fitheory.ts (done in this change)

```ts
import fitheoryQuestionsFi from "@/data/finland-driving-theory-questions_fi.json";
registerExamBanks({ fitheory: fitheoryQuestions as Question[] }, { fitheory: { fi: fitheoryQuestionsFi as Question[] } });
```

Everything below goes in shared files.

## lib/exams.ts

Import with the other translation JSONs (top of file, next to `ptimtPt`, `setrafikSv`):

```ts
import fitheoryFi from "./examTranslations/fitheory.fi.json";
```

On the `fitheory` config (after `copy`, like `esdgt`):

```ts
  review: { fi: "machine" },
  translations: {
    fi: examTranslation(fitheoryFi),
  },
```

The JSON carries `"locale": "fi-FI"` and `"landingPath": "/fi/ajokortin-teoriakoe"`. The
fitheory sets are topic sets (not `testSets()`), so the JSON has a `trainingSets` block with
Finnish names and weight labels for sets 1 to 5; no set is split into parts (largest is 48), so
there are no `partNames`.

## lib/landingContent.ts

So the Finnish homepage (`/fi` once its region reads Finnish) can quote this landing under
"About each test":

```ts
import fitheoryFi from "@/lib/landings/fitheory.fi.json";
// in LANDINGS:
  "fitheory.fi": fitheoryFi as TranslatedLandingContent,
```

## Landing and SEO (hreflang / x-default)

- The Finnish landing at `/fi/ajokortin-teoriakoe` is **x-default** for this exam: it is the
  translation written for the exam's own country. `examLandingAlternates("fitheory")` does this
  on its own once `translations.fi` (locale `fi-FI`) is wired, because the base is English, the
  region is `FI` and the locale ends in `-FI`. Result: `en` = `/finland-driving-theory-test`,
  `fi-FI` = `/fi/ajokortin-teoriakoe`, `x-default` = `/fi/ajokortin-teoriakoe`. Check after
  wiring that the region of `fitheory` resolves to `FI` (it is the first exam of `/fi`).
- Make hreflang reciprocal on the English landing `app/finland-driving-theory-test/page.tsx`:

  ```ts
  import { examLandingAlternates } from "@/lib/examSeo";
  // in metadata.alternates:
    alternates: {
      canonical: `${siteUrl}/finland-driving-theory-test`,
      languages: examLandingAlternates("fitheory"),
    },
  ```

- `/fi` is already in `lib/urlLanguage.ts` (`includeRoot: false`), so this page gets
  `Content-Language: fi` and `<html lang="fi">` with no further change. `app/fi/ajokortin-teoriakoe`
  is a static folder next to the existing `app/fi/metsastajatutkinto-harjoituskoe`.
- The landing JSON carries its own `facts.source` named "Traficom: Kuljettajantutkinto". Its URL is
  the English Traficom page from `EXAM_FACTS.fitheory.source` (the Finnish twin could not be
  confirmed in this session); swap it for the Finnish-language Traficom kuljettajantutkinto page
  once checked.
- Screenshots: `TranslatedExamLanding` expects `public/landing/fitheory-mobile-fi.png` and
  `public/landing/fitheory-desktop-fi.png` (not made here; no npm in this session).
- Sitemap and `llms.txt` pick up the translation landing path automatically; bump
  `EXAM_LANDINGS_UPDATED_AT` in `lib/seoDates.ts` and rerun
  `npx tsx scripts/build-landing-dates.ts`.
- The page passes `samples` and `related`, so `ExamSampleQuestions` reads the Finnish bank via
  `lang="fi"` (the `fi` entries in `SAMPLE_COPY`, `EXAM_UI` and `ExamLandingHero` already exist
  for the fihunt landing; check `RELATED_COPY` has `fi` too).
- The English landing's FAQ says "Tigertest's practice is in English"; once wired, add "and in
  Finnish" there and in `EXAM_FACTS.fitheory` if wanted.

## Other per-language tables

- Category labels: the Finnish labels are in `fitheory.fi.json` (`categoryLabels`). If a results
  page still reads `i18n/fi.ts` categories, add:
  `fiYield` "Väistäminen ja risteykset", `fiPosition` "Nopeus, kaistat ja moottoritiet",
  `fiOvertake` "Ohittaminen ja kohtaaminen", `fiParking` "Pysähtyminen ja pysäköinti",
  `fiSigns` "Liikennemerkit", `fiMarkings` "Tiemerkinnät, liikennevalot ja poliisin merkit",
  `fiUsers` "Jalankulkijat, pyöräilijät ja muut tienkäyttäjät",
  `fiDriver` "Kuljettaja, alkoholi ja ajokorttisäännöt",
  `fiVehicle` "Ajoneuvo, talvi ja turvavarusteet".
- Shuffle guard: no Finnish option references other options ("A ja B", "Molemmat", "Kaikki edellä
  mainitut"); `validate_translation.py` reports 0 guarded rows in both banks.
- Region: when `FI` switches its homepage to Finnish, link this exam to `/fi/ajokortin-teoriakoe`
  there (catalog cards pick the page-language landing automatically once wired).
- `CLAUDE.md` "Translated exams" list: add "Finland theory test (fi-FI, landing
  `/fi/ajokortin-teoriakoe`)", and on the fitheory entry: "Also offered in Finnish
  (`translations.fi`, locale fi-FI, `review: { fi: "machine" }`): bank
  `data/finland-driving-theory-questions_fi.json` built by `tools/next100/fitheory/fi/build.py`,
  landing `/fi/ajokortin-teoriakoe` (x-default for this exam, hreflang both ways with the English
  landing), machine-translated pending native review."

## Validation

```
python3 -I tools/next100/fitheory/fi/build.py        # runs check.py, refuses to write on failure
python3 -I .claude/skills/exam-bank/scripts/validate_translation.py \
  data/finland-driving-theory-questions.json data/finland-driving-theory-questions_fi.json --lang fi
```

Last run: `lang fi  base rows 200  translated rows 200  guarded 0`, one soft warning (POS-015
stem shorter because the English gloss of "pihakatu" is not repeated), **PASS**.
