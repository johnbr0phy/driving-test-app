# Wiring for `grdriving` in Greek (el-GR)

Files already written (no edits needed): `data/greece-driving-questions_el.json` (200, same ids,
order, categories, keys and option order as the English bank; `check.py` and
`validate_translation.py --lang el` PASS), `lib/examTranslations/grdriving.el.json`,
`lib/landings/grdriving.el.json`, `app/el/test-kok-diploma-odigisis/page.tsx` (three-line
`TranslatedExamLanding` wrapper), `tools/next100/grdriving/el/*` (sources `t_*.py`, `build.py`,
`check.py`, `glossary.md`, `NOTES.md`). Rebuild the bank with
`python3 -I tools/next100/grdriving/el/build.py`.

Review status: **machine** (machine translation, pending native review), for the bank, the exam
copy and the landing.

## lib/banks/grdriving.ts (done in this change)

```ts
import grdrivingQuestionsEl from "@/data/greece-driving-questions_el.json";
registerExamBanks({ grdriving: grdrivingQuestions as Question[] }, { grdriving: { el: grdrivingQuestionsEl as Question[] } });
```

Everything below goes in shared files.

## lib/exams.ts

Import with the other translation JSONs (top of file, next to `fitheoryFi`, `ptimtPt`):

```ts
import grdrivingEl from "./examTranslations/grdriving.el.json";
```

On the `grdriving` config (after `copy`, like `esdgt`):

```ts
  review: { el: "machine" },
  translations: {
    el: examTranslation(grdrivingEl),
  },
```

The JSON carries `"locale": "el-GR"` and `"landingPath": "/el/test-kok-diploma-odigisis"`. The
grdriving sets are topic sets (not `testSets()`), so the JSON has a `trainingSets` block with
Greek names and weight labels for sets 1 to 5; no set is split into parts (largest is 52), so
there are no `partNames`. The `heroSubs` block has the five lines `examTranslation()` requires.

## lib/landingContent.ts

So a Greek homepage (`/gr` once its region reads Greek, or `/gr` in Greek via `app/home-lang`)
can quote this landing under "About each test":

```ts
import grdrivingEl from "@/lib/landings/grdriving.el.json";
// in LANDINGS:
  "grdriving.el": grdrivingEl as TranslatedLandingContent,
```

## Landing and SEO (hreflang / x-default)

- The Greek landing at `/el/test-kok-diploma-odigisis` is **x-default** for this exam: it is the
  translation written for the exam's own country (most candidates sit the test in Greek).
  `examLandingAlternates("grdriving")` does this on its own once `translations.el` (locale
  `el-GR`) is wired, because the base is English, the region is `GR` (`grdriving: "GR"` in
  `lib/region.ts`) and the locale ends in `-GR`. Result: `en` = `/greece-driving-theory-test`,
  `el-GR` = `/el/test-kok-diploma-odigisis`, `x-default` = `/el/test-kok-diploma-odigisis`.
- Make hreflang reciprocal on the English landing `app/greece-driving-theory-test/page.tsx`
  (today it sets only `canonical`):

  ```ts
  import { examLandingAlternates } from "@/lib/examSeo";
  // in metadata.alternates:
    alternates: {
      canonical: `${siteUrl}/greece-driving-theory-test`,
      languages: examLandingAlternates("grdriving"),
    },
  ```

- `/el` is already in `lib/urlLanguage.ts` (`includeRoot: false`), so this page gets
  `Content-Language: el` and `<html lang="el">` with no further change. `app/el/test-kok-diploma-odigisis`
  is a static folder next to the existing Greek landings (`eksetaseis-pegp-politografisi`,
  `pistopoiisi-asfalistikon-diamesolaviton`, `pistopoiisi-prosopikou-idiotikis-asfaleias`).
- The landing JSON carries its own `facts.source` in Greek ("Υπουργείο Υποδομών και Μεταφορών:
  θεωρητική εξέταση υποψηφίων οδηγών μέσω Η/Υ (ΜΣΘΕΥΟ)"), same URL as `EXAM_FACTS.grdriving.source`
  (that page is already in Greek).
- `TranslatedExamLanding` already maps `GR` to `EUR` and builds og:locale / inLanguage from
  `examLandingLocale()`, so the page gets `el_GR` and `el-GR` once the translation is wired. Until
  then the page 404s (unwired translation), which is the intended behaviour, not a build failure.
- The page passes `samples` and `related`, so `ExamSampleQuestions` and `ExamRelatedTests` render
  with `lang="el"` from the Greek bank (both components already carry `el` copy).
- Screenshots: `TranslatedExamLanding` expects `public/landing/grdriving-mobile-el.png` and
  `public/landing/grdriving-desktop-el.png` (not made; no dev server in this session).
- Sitemap and `llms.txt` pick up the translation landing path automatically; bump
  `EXAM_LANDINGS_UPDATED_AT` in `lib/seoDates.ts` and rerun
  `npx tsx scripts/build-landing-dates.ts` after committing.

## Other per-language tables

- Category labels: the Greek labels are in `grdriving.el.json` (`categoryLabels`); results pages
  read the exam's own `categoryLabels` first, so nothing goes in `i18n/el.ts`. If a results page
  still reads `i18n/el.ts` `categories.*`, add: `grLicence` "Άδειες, αλκοόλ και νόμος",
  `grWarning` "Πινακίδες κινδύνου", `grRegulatory` "Πινακίδες προτεραιότητας, απαγόρευσης και
  υποχρέωσης", `grInfo` "Πληροφοριακές πινακίδες, διαγραμμίσεις και φανάρια", `grPriority`
  "Διασταυρώσεις, κυκλικοί κόμβοι και προτεραιότητα", `grSpeed` "Ταχύτητα, αποστάσεις και
  προσπέραση", `grParking` "Στάθμευση και άλλοι χρήστες του δρόμου", `grSafety` "Όχημα, επιβάτες
  και ασφαλής οδήγηση", `grEmergency` "Νύχτα, καιρός, αυτοκινητόδρομοι και έκτακτα περιστατικά".
- Shuffle guard: no option in either bank references other options (validate_translation reports
  `guarded 0` for both), so the existing Greek patterns in `lib/shuffleOptions.ts` are enough.
- `lib/examUi.ts`, `ExamLandingHero` `COPY`, `TEST_SET_NAMES` and `CARD_FOOTERS` already carry `el`.
- Region: when `GR` switches its homepage to Greek (`REGIONS` entry `lang: "el"`, `locale:
  "el-GR"`), link this exam to `/el/test-kok-diploma-odigisis` there and list the English version
  with the English flag. Until then the test language picker (`TestLanguageChoice`) offers Ελληνικά
  on the dashboard as soon as `translations.el` is wired.

## Validation

`python3 -I tools/next100/grdriving/el/check.py` (run by `build.py` too): same questionIds in the
same order; same keys, type, state, category, correctAnswer, correctIndex; every text field in
Greek and not identical to English (bare numbers and units excepted); four distinct options; no em
or en dashes; no banned option phrasing; decimal comma; no leftover Latin words outside the
allow-list. Then:

`python3 -I .claude/skills/exam-bank/scripts/validate_translation.py data/greece-driving-questions.json data/greece-driving-questions_el.json --lang el`
(PASS, `guarded 0`, no warnings.)
