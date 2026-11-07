# Wiring for `setrafik` in Swedish (sv-SE)

Files already written (no edits needed): `data/sweden-driving-theory-questions_sv.json` (200, same
ids, order, categories, keys and option order as the English bank; `check.py` and
`validate_translation.py --lang sv` PASS), `lib/examTranslations/setrafik.sv.json`,
`lib/landings/setrafik.sv.json`, `app/sv/teoriprov-korkort-b/page.tsx` (three-line
`TranslatedExamLanding` wrapper), `tools/next100/setrafik/sv/*` (sources `t_*.py`, `build.py`,
`check.py`, `glossary.md`, `NOTES.md`). Rebuild the bank with
`python3 -I tools/next100/setrafik/sv/build.py`.

Review status: **machine** (machine translation, pending native review), for the bank, the exam
copy and the landing.

## lib/banks/setrafik.ts (done in this change)

```ts
import setrafikQuestionsSv from "@/data/sweden-driving-theory-questions_sv.json";
registerExamBanks({ setrafik: setrafikQuestions as Question[] }, { setrafik: { sv: setrafikQuestionsSv as Question[] } });
```

Everything below goes in shared files.

## lib/exams.ts

Import with the other translation JSONs (top of file, next to `esdgtEs`, `ptimtPt`):

```ts
import setrafikSv from "./examTranslations/setrafik.sv.json";
```

On the `setrafik` config (after `copy`, like `esdgt`):

```ts
  review: { sv: "machine" },
  translations: {
    sv: examTranslation(setrafikSv),
  },
```

The JSON carries `"locale": "sv-SE"` and `"landingPath": "/sv/teoriprov-korkort-b"`. The
setrafik sets are topic sets (not `testSets()`), so the JSON has a `trainingSets` block with
Swedish names and weight labels for sets 1 to 5; no set is split into parts (largest is 48), so
there are no `partNames`.

## lib/landingContent.ts

So the Swedish homepage (`/se` once its region reads Swedish) can quote this landing under
"About each test":

```ts
import setrafikSv from "@/lib/landings/setrafik.sv.json";
// in LANDINGS:
  "setrafik.sv": setrafikSv as TranslatedLandingContent,
```

## Landing and SEO (hreflang / x-default)

- The Swedish landing at `/sv/teoriprov-korkort-b` is **x-default** for this exam: it is the
  translation written for the exam's own country. `examLandingAlternates("setrafik")` already does
  this on its own once `translations.sv` (locale `sv-SE`) is wired, because the base is English,
  the region is `SE` and the locale ends in `-SE`. Result: `en` = `/sweden-driving-theory-test`,
  `sv-SE` = `/sv/teoriprov-korkort-b`, `x-default` = `/sv/teoriprov-korkort-b`.
- Make hreflang reciprocal on the English landing `app/sweden-driving-theory-test/page.tsx`:

  ```ts
  import { examLandingAlternates } from "@/lib/examSeo";
  // in metadata.alternates:
    alternates: {
      canonical: `${siteUrl}/sweden-driving-theory-test`,
      languages: examLandingAlternates("setrafik"),
    },
  ```

- `/sv` is already in `lib/urlLanguage.ts` (`includeRoot: false`), so this page gets
  `Content-Language: sv` and `<html lang="sv">` with no further change.
- The landing JSON carries its own `facts.source` (Trafikverket: Kunskapsprov B, same URL as
  `EXAM_FACTS.setrafik.source`), so the footnote link is in Swedish.
- Screenshots: `TranslatedExamLanding` expects `public/landing/setrafik-mobile-sv.png` and
  `public/landing/setrafik-desktop-sv.png` (not made here; no npm in this session).
- Sitemap and `llms.txt` pick up the translation landing path automatically; bump
  `EXAM_LANDINGS_UPDATED_AT` in `lib/seoDates.ts` and rerun
  `npx tsx scripts/build-landing-dates.ts`.
- The page passes `samples` and `related`, so `ExamSampleQuestions` reads the Swedish bank via
  `lang="sv"` (the `sv` entries in `SAMPLE_COPY`, `RELATED_COPY`, `EXAM_UI` and `ExamLandingHero`
  already exist for the semoto landing).

## Other per-language tables

- Category labels: the Swedish labels are in `setrafik.sv.json` (`categoryLabels`). If a results
  page still reads `i18n/sv.ts` categories, add:
  `setrJunctions` "Företräde och korsningar", `setrSigns` "Vägmärken",
  `setrMarkings` "Vägmarkeringar och trafiksignaler", `setrSpeed` "Hastighet, omkörning och körfält",
  `setrParking` "Stannande, parkering och motorväg", `setrSafety` "Trafiksäkerhet, vilt och vinter",
  `setrVehicle` "Fordonskännedom och manövrering", `setrEnvironment` "Miljö och sparsam körning",
  `setrPersonal` "Personliga förutsättningar och körkortet".
- Shuffle guard: no Swedish option references other options ("A och B", "Båda", "Alla
  ovanstående"); `validate_translation.py` reports 0 guarded rows in both banks.
- Region: when `SE` switches its homepage to Swedish, link this exam to `/sv/teoriprov-korkort-b`
  there (catalog cards pick the page-language landing automatically once wired).
- `CLAUDE.md` "Translated exams" list: add "Sweden theory test (sv-SE, landing
  `/sv/teoriprov-korkort-b`)", and on the setrafik entry: "Also offered in Swedish
  (`translations.sv`, locale sv-SE, `review: { sv: "machine" }`): bank
  `data/sweden-driving-theory-questions_sv.json` built by `tools/next100/setrafik/sv/build.py`,
  landing `/sv/teoriprov-korkort-b` (x-default for this exam, hreflang both ways with the English
  landing), machine-translated pending native review."

## Validation

```
python3 -I tools/next100/setrafik/sv/build.py        # runs check.py, refuses to write on failure
python3 -I .claude/skills/exam-bank/scripts/validate_translation.py \
  data/sweden-driving-theory-questions.json data/sweden-driving-theory-questions_sv.json --lang sv
```

Last run: `lang sv  base rows 200  translated rows 200  guarded 0`, two soft warnings (JNC-028,
VEH-010 stems shorter because the bracketed Swedish term is not repeated), **PASS**.
