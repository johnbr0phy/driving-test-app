# Wiring for `esdgt` in Spanish (es-ES)

Files already written (do not need edits): `data/spain-dgt-questions_es.json` (200, same ids,
order, categories and keys as the English bank; `check.py` PASS), `lib/examTranslations/esdgt.es.json`,
`lib/landings/esdgt.es.json`, `app/es/test-dgt-permiso-b/page.tsx` (three-line
`TranslatedExamLanding` wrapper), `tools/next100/esdgt/es/*` (sources, `build.py`, `check.py`,
`glossary.md`, `NOTES.md`). Rebuild the bank with `python3 -I tools/next100/esdgt/es/build.py`.

Review status: **machine** (machine translation, pending native review), for the bank, the exam
copy and the landing.

Everything below goes in shared files.

## lib/banks/esdgt.ts

Register the Spanish bank as a translated bank (same pattern as `lib/banks/cna.ts`):

```ts
import { Question } from "@/types";
import esdgtQuestions from "@/data/spain-dgt-questions.json";
import esdgtQuestionsEs from "@/data/spain-dgt-questions_es.json";
import { registerExamBanks } from "@/lib/examData";

// The Spain DGT theory exam bank (permiso B): English base, Spanish (es-ES) translation.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ esdgt: esdgtQuestions as Question[] }, { esdgt: { es: esdgtQuestionsEs as Question[] } });
```

## lib/exams.ts

Import with the other translation JSONs (top of file):

```ts
import esdgtEs from "./examTranslations/esdgt.es.json";
```

On the `esdgt` config:

```ts
  translations: {
    es: examTranslation(esdgtEs),
  },
  review: { es: "machine" },   // once the phase 0 `review` field exists
```

The JSON carries `"locale": "es-ES"` and `"landingPath": "/es/test-dgt-permiso-b"`. Until phase 0
adds `locale?: string` to `ExamTranslation`, the extra key is harmless (the JSON is cast);
once it exists, `TranslatedExamLanding` must use it instead of its hard-coded
`LOCALES.es = "es-US"` (otherwise this page gets `og:locale es_US` and `inLanguage es-US`).

The esdgt training sets are topic sets (not `testSets()`), so `esdgt.es.json` has a
`trainingSets` block with Spanish names and weight labels for sets 1 to 5; no set is split into
parts (largest is 53), so there are no `partNames`.

## Landing and SEO

- `app/es/test-dgt-permiso-b/page.tsx` is a static folder, so it wins over `app/es/[slug]`.
  Note that `app/es/layout.tsx` already sets `lang="es"`, which is right for this page.
- hreflang: today `examLandingAlternates("esdgt")` returns `en`, `es`, `x-default` = English.
  Per LANGUAGES.md 3.3 the keys should be locale-tagged (`en`, `es-ES`) and x-default should be the
  Spanish page for Spain (the test's main language). The CNA `es` page stays `es-US`, so the key
  must come from the translation's `locale`, not the bare language.
- The English landing `app/spain-driving-theory-test/page.tsx` sets only `canonical`; add
  `languages: examLandingAlternates("esdgt")` to its `alternates` so hreflang is reciprocal.
- `TranslatedExamLanding` hard-codes `priceCurrency: "USD"`; Spain should be `EUR` (3.2 of the plan).
- Facts footnote: the link text after it comes from `EXAM_FACTS.esdgt.source.name`, which is
  English ("DGT: requirements, preparation and taking the exam"). Either allow a `source` override
  in the landing JSON or accept English link text. Suggested Spanish: "DGT: requisitos, preparación
  y presentación a examen" (same URL).
- `ExamLandingHero` receives `exam.shortName` (English, "Spain DGT theory test"); if it is shown
  on the page, it needs a translated short name (no `shortName` in `ExamTranslation` today).
- Screenshots: `TranslatedExamLanding` expects `public/landing/esdgt-mobile-es.png` and
  `public/landing/esdgt-desktop-es.png` (not made; no npm in this session).
- Sitemap and `llms.txt` pick up the translation landing path automatically; bump
  `EXAM_LANDINGS_UPDATED_AT` in `lib/seoDates.ts`.
- The landing does not render `ExamSampleQuestions` (the component has no language support yet);
  when 3.2 adds it, pass `lang="es"` so it reads the Spanish bank.

## Other per-language tables

- Category labels: the Spanish labels are in `esdgt.es.json` (`categoryLabels`). If results pages
  still read `i18n/es.ts` `categories.*` (plan 2.1 step 2 not done yet), add these to
  `i18n/es.ts`:
  `esdgtLicence` "Permisos, documentación y vehículo", `esdgtSigns` "Señales y agentes",
  `esdgtMarkings` "Marcas viales y semáforos", `esdgtPriority` "Prioridad, intersecciones y glorietas",
  `esdgtSpeed` "Velocidad, distancias y carriles", `esdgtOvertaking` "Adelantamientos y usuarios vulnerables",
  `esdgtParking` "Parada y estacionamiento", `esdgtLights` "Alumbrado, túneles y mal tiempo",
  `esdgtSafety` "Alcohol, distracciones y emergencias".
- Shuffle guard: no Spanish option in this bank references other options (checked with a port of
  the `lib/shuffleOptions.ts` pattern); the existing Spanish patterns are enough.
- The `es` UI dictionary has a few Latin American words (celular, computadora) per plan 2.1; the
  bank and landing use Spain terms (móvil, ordenador).
- Region: when `ES` switches its homepage to Spanish (plan section 4), link this exam to
  `/es/test-dgt-permiso-b` there and list the English version with the English flag.

## Validation

`python3 -I tools/next100/esdgt/es/check.py` (run by `build.py` too): same questionIds in the
same order; same type, state, category, correctAnswer, correctIndex; every text field translated
(only bare numbers, units and the 112/091 style codes may equal the English); four distinct
options; position-dependent-answer guard identical per row; no em or en dashes; no "todas las
anteriores", "ninguna de las anteriores", "ambas" or "A y B" options; decimal comma; no tuteo
forms; no leftover English words. Run `.claude/skills/exam-bank/scripts/validate_translation.py`
too once it exists (it did not when this was written).
