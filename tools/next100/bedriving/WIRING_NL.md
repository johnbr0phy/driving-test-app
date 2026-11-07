# Wiring for `bedriving` in Belgian Dutch (nl-BE)

Files already written (no edits needed): `data/belgium-driving-questions_nl.json` (200, same
ids, order, categories and keys as the English bank; `check.py` and `validate_translation.py`
PASS), `lib/examTranslations/bedriving.nl.json`, `lib/landings/bedriving.nl.json`,
`app/nl/theorie-examen-rijbewijs-b-oefenen/page.tsx` (three-line `TranslatedExamLanding`
wrapper), `tools/next100/bedriving/nl/*` (sources, `build.py`, `check.py`, `glossary.md`,
`NOTES.md`). Rebuild the bank with `python3 -I tools/next100/bedriving/nl/build.py`.

Review status: **machine** (machine translation, pending native review), for the bank, the exam
copy and the landing.

## lib/banks/bedriving.ts (done in this change)

```ts
import { Question } from "@/types";
import bedrivingQuestions from "@/data/belgium-driving-questions.json";
import bedrivingQuestionsNl from "@/data/belgium-driving-questions_nl.json";
import { registerExamBanks } from "@/lib/examData";

registerExamBanks({ bedriving: bedrivingQuestions as Question[] }, { bedriving: { nl: bedrivingQuestionsNl as Question[] } });
```

Everything below goes in shared files.

## lib/exams.ts

Import with the other translation JSONs (top of file):

```ts
import bedrivingNl from "./examTranslations/bedriving.nl.json";
```

On the `bedriving` config (after `copy`):

```ts
  review: { nl: "machine" },
  translations: {
    nl: examTranslation(bedrivingNl),
  },
```

The JSON carries `"locale": "nl-BE"` and `"landingPath": "/nl/theorie-examen-rijbewijs-b-oefenen"`,
five hero subtitles and a `trainingSets` block with Dutch names for sets 1 to 5 (topic sets, no
parts, largest 48, so no `partNames`). The base stays English (no `language` field).

## hreflang and x-default

The Dutch landing is x-default for this exam. No code change is needed for that:
`examLandingAlternates()` hands x-default to a translation of an English-base exam whose
`locale` ends in the exam's country tag (`-BE`), so once the translation is wired it returns
`{ en: /belgium-driving-theory-test, "nl-BE": /nl/theorie-examen-rijbewijs-b-oefenen,
"x-default": /nl/theorie-examen-rijbewijs-b-oefenen }`.

The English landing `app/belgium-driving-theory-test/page.tsx` sets only `canonical`; add
the alternates so hreflang is reciprocal:

```ts
  alternates: {
    canonical: `${siteUrl}/belgium-driving-theory-test`,
    languages: examLandingAlternates("bedriving"),
  },
```

(with `import { examLandingAlternates } from "@/lib/examSeo";`).

## Landing and SEO

- `app/nl/` has no layout, and `/nl` is not yet in `URL_LANGUAGE_PREFIXES` in
  `lib/urlLanguage.ts` (the three existing `/nl/*` native landings are served as
  `<html lang="en">` today). Add, next to the other entries:

  ```ts
    { prefix: "/nl", lang: "nl", includeRoot: false },
  ```

  `next.config.ts` builds its `Content-Language` headers from that list (`urlLanguageHeaders()`),
  so nothing else is needed there.
- `TranslatedExamLanding` gives this page EUR offers (`CURRENCY.BE`) and `og:locale nl_BE` from
  the translation's `locale`. The facts footnote links to the Dutch Vlaanderen.be page through
  `facts.source` in the landing JSON.
- Screenshots: `TranslatedExamLanding` expects `public/landing/bedriving-mobile-nl.png` and
  `public/landing/bedriving-desktop-nl.png` (not made; no dev server in this session).
- Sitemap and `llms.txt` pick up the translation's landing path automatically; bump
  `EXAM_LANDINGS_UPDATED_AT` in `lib/seoDates.ts` and rerun
  `npx tsx scripts/build-landing-dates.ts`.

## lib/landingContent.ts

The Belgium homepage (`/be`) is in Dutch (`REGIONS.BE.lang = "nl"`), so register the landing for
its "About each test" block:

```ts
import bedrivingNl from "@/lib/landings/bedriving.nl.json";
// in LANDINGS:
  "bedriving.nl": bedrivingNl as TranslatedLandingContent,
```

## lib/region.ts (REGION_HOME.BE)

The Belgian homepage copy says the test is in English. With the Dutch version live, point the CTA
at the Dutch landing and update the lines:

```ts
  // In Dutch (REGIONS[].lang), machine-translated, pending native review.
  BE: {
    title: "Gratis oefenen voor het Belgische theorie-examen | Tigertest",
    description: "Gratis oefenen voor het Belgische theorie-examen rijbewijs B, in het Nederlands of het Engels: 200 eigen vragen over de Wegcode met de echte slaaggrens van 41/50, elk antwoord uitgelegd. Geen account nodig.",
    lead: "Oefen voor het theorie-examen rijbewijs B in Vlaanderen, Wallonië en Brussel, in het Nederlands of het Engels. Eigen vragen over voorrang van rechts, verkeersborden, snelheidsbeperkingen en parkeren, elk antwoord uitgelegd. Zonder account.",
    cta: { label: "Theorie-examen", href: "/nl/theorie-examen-rijbewijs-b-oefenen" },
    testsTitle: "Theorie-examen rijbewijs B",
    testsSub: "200 vragen over de Belgische Wegcode, in het Nederlands en het Engels, in km/u en voor rechtsverkeer. Vier volledige proefexamens van 50 vragen, 41 om te slagen.",
  },
```

## Other per-language tables

- Category labels: the Dutch labels are in `bedriving.nl.json` (`categoryLabels`), which results
  pages read before `i18n/*`. If a page still reads `i18n/nl.ts` `categories.*`, add:
  `beLicence` "Het examen, het rijbewijs en rijgeschiktheid", `beDanger` "Gevaarsborden",
  `bePriority` "Voorrangsregels en voorrangsborden", `beSigns` "Verbods-, gebods- en
  aanwijzingsborden", `beMarkings` "Wegmarkeringen en verkeerslichten", `beSpeed`
  "Snelheidsbeperkingen en zones", `beManoeuvre` "Inhalen, afslaan en autosnelwegen",
  `beParking` "Stilstaan en parkeren", `beVulnerable` "Voetgangers, fietsers en openbaar
  vervoer", `beSafety` "Verlichting, gordels en pech".
- `TEST_SET_NAMES`: not needed (topic sets carry their own names in the translation JSON).
- Shuffle guard: no option in either bank refers to other options; nothing to add to
  `lib/shuffleOptions.ts` for nl beyond its existing list.
- Catalog languages: `TestCatalogEntry.languages` for bedriving should now show en and nl flags
  (derived from `translations` if the catalog reads them; otherwise add `nl`).

## Validation

- `python3 -I tools/next100/bedriving/nl/check.py`: PASS (200 questions, ids, order, categories
  and keys match; no em/en dashes; decimal comma; km/u; no je/jij in the bank; no English left).
- `python3 -I .claude/skills/exam-bank/scripts/validate_translation.py data/belgium-driving-questions.json data/belgium-driving-questions_nl.json --lang nl`: PASS.
