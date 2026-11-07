# Wiring for `bedriving` in Belgian French (fr-BE)

Files already written (no edits needed): `data/belgium-driving-questions_fr.json` (200, same
ids, order, categories and keys as the English bank; `check.py`, `validate_translation.py` and
`validate_bank.py --lang fr` PASS), `lib/examTranslations/bedriving.fr.json`,
`lib/landings/bedriving.fr.json`, `app/fr/examen-theorique-permis-b/page.tsx` (three-line
`TranslatedExamLanding` wrapper), `tools/next100/bedriving/fr/*` (glossary, sources, `build.py`,
`check.py`, `copy_src.py`, `build_copy.py`, `NOTES.md`). Rebuild with
`python3 -I tools/next100/bedriving/fr/build.py` and `python3 -I tools/next100/bedriving/fr/build_copy.py`.

Review status: **machine** (machine translation, pending native review), for the bank, the exam
copy and the landing.

## lib/banks/bedriving.ts (done in this change)

```ts
import { Question } from "@/types";
import bedrivingQuestions from "@/data/belgium-driving-questions.json";
import bedrivingQuestionsNl from "@/data/belgium-driving-questions_nl.json";
import bedrivingQuestionsFr from "@/data/belgium-driving-questions_fr.json";
import { registerExamBanks } from "@/lib/examData";

registerExamBanks(
  { bedriving: bedrivingQuestions as Question[] },
  { bedriving: { nl: bedrivingQuestionsNl as Question[], fr: bedrivingQuestionsFr as Question[] } },
);
```

Everything below goes in shared files.

## lib/exams.ts

Import with the other translation JSONs (top of file), next to the Dutch one from `WIRING_NL.md`:

```ts
import bedrivingNl from "./examTranslations/bedriving.nl.json";
import bedrivingFr from "./examTranslations/bedriving.fr.json";
```

On the `bedriving` config (after `copy`), replacing the block in `WIRING_NL.md`. Keep `nl`
first (see x-default below):

```ts
  review: { nl: "machine", fr: "machine" },
  translations: {
    nl: examTranslation(bedrivingNl),
    fr: examTranslation(bedrivingFr),
  },
```

The JSON carries `"locale": "fr-BE"` and `"landingPath": "/fr/examen-theorique-permis-b"`, five
hero subtitles and a `trainingSets` block with French names for sets 1 to 5 (topic sets, no
parts, largest 48, so no `partNames`). The base stays English (no `language` field). Until the
translation is wired, the landing 404s (as `TranslatedExamLanding` does for any unwired exam).

## hreflang and x-default

The native landing is x-default for this exam. Belgium has two native landings, and the
Belgium homepage is in Dutch (`REGIONS.BE.lang = "nl"`), so x-default should stay on the Dutch
landing `/nl/theorie-examen-rijbewijs-b-oefenen`. Today `examLandingAlternates()` sets x-default
on every translation whose locale ends in `-BE`, so the **last** one in `translations` wins: with
`fr` after `nl` it would move x-default to the French page. Make the first match win (no change
for any exam with one country translation), in `lib/examSeo.ts`:

```ts
    if (countryTag && base === "en" && xDefault === baseUrl && tr.locale?.endsWith(countryTag)) xDefault = url;
```

Result once wired: `{ en: /belgium-driving-theory-test, "nl-BE": /nl/theorie-examen-rijbewijs-b-oefenen,
"fr-BE": /fr/examen-theorique-permis-b, "x-default": /nl/theorie-examen-rijbewijs-b-oefenen }`.
(If you prefer the French page as x-default instead, put `fr` first in `translations` with the
same one-line change.)

The English landing `app/belgium-driving-theory-test/page.tsx` needs the alternates so hreflang
is reciprocal (same block as in `WIRING_NL.md`):

```ts
  alternates: {
    canonical: `${siteUrl}/belgium-driving-theory-test`,
    languages: examLandingAlternates("bedriving"),
  },
```

## Landing and SEO

- `/fr` is not in `URL_LANGUAGE_PREFIXES` in `lib/urlLanguage.ts` and `app/fr/` has no layout,
  so the page would be served as `<html lang="en">`. Add, next to the other entries (France is
  not a region, so `/fr` itself is no country homepage):

  ```ts
    { prefix: "/fr", lang: "fr", includeRoot: false },
  ```

  and optionally `app/fr/layout.tsx`, like `app/de/layout.tsx`:

  ```tsx
  // Every page under /fr is French: translated and native French exam landings.
  export default function FrenchLayout({ children }: { children: React.ReactNode }) {
    return <div lang="fr">{children}</div>;
  }
  ```

  `next.config.ts` builds its `Content-Language` headers from that list, so nothing else is
  needed there.
- `TranslatedExamLanding` gives this page EUR offers (`CURRENCY.BE`) and `og:locale fr_BE` from
  the translation's `locale`. The facts footnote links to the Wallonie.be page through
  `facts.source` in the landing JSON. Check that `ExamLandingHero`, `ExamSampleQuestions` and
  `ExamRelatedTests` have `fr` entries (they do in `COPY`, `SAMPLE_COPY`, `RELATED_COPY`).
- Screenshots: `TranslatedExamLanding` expects `public/landing/bedriving-mobile-fr.png` and
  `public/landing/bedriving-desktop-fr.png` (not made; no dev server in this session).
- Sitemap and `llms.txt` pick up the translation's landing path automatically; bump
  `EXAM_LANDINGS_UPDATED_AT` in `lib/seoDates.ts` and rerun
  `npx tsx scripts/build-landing-dates.ts`.

## lib/landingContent.ts

Register the landing so a French homepage (a visitor in Belgium who picks French, rendered by
`app/home-lang/BE/fr`) can quote it under "About each test":

```ts
import bedrivingFr from "@/lib/landings/bedriving.fr.json";
// in LANDINGS:
  "bedriving.fr": bedrivingFr as TranslatedLandingContent,
```

## lib/region.ts and the Belgium homepage

`REGION_HOME.BE` stays Dutch (the region's language). With French live, mention it in the Dutch
lines (replacing the block in `WIRING_NL.md`):

```ts
    description: "Gratis oefenen voor het Belgische theorie-examen rijbewijs B, in het Nederlands, het Frans of het Engels: 200 eigen vragen over de Wegcode met de echte slaaggrens van 41/50, elk antwoord uitgelegd. Geen account nodig.",
    testsSub: "200 vragen over de Belgische Wegcode, in het Nederlands, het Frans en het Engels, in km/u en voor rechtsverkeer. Vier volledige proefexamens van 50 vragen, 41 om te slagen.",
```

A French-language Belgium homepage (`home-lang/BE/fr`) should link the test card to
`/fr/examen-theorique-permis-b` (test cards already prefer a landing in the page's language).

## Other per-language tables

- Category labels: the French labels are in `bedriving.fr.json` (`categoryLabels`), which results
  pages read before `i18n/*`. If a page still reads `i18n/fr.ts` `categories.*`, add:
  `beLicence` "L'examen, le permis et l'aptitude à conduire", `beDanger` "Signaux de danger",
  `bePriority` "Règles et signaux de priorité", `beSigns` "Signaux d'interdiction, d'obligation
  et d'indication", `beMarkings` "Marquages routiers et feux de signalisation", `beSpeed`
  "Limitations de vitesse et zones", `beManoeuvre` "Dépassement, changement de direction et
  autoroutes", `beParking` "Arrêt et stationnement", `beVulnerable` "Piétons, cyclistes et
  transports en commun", `beSafety` "Éclairage, ceintures et pannes".
- `TEST_SET_NAMES`: not needed (topic sets carry their own names in the translation JSON).
- `EXAM_UI` (`lib/examUi.ts`) already has `fr`; `CARD_FOOTERS` in `lib/shareCards.ts` needs an
  `fr` entry if it has none (Inter covers French).
- Shuffle guard: no option in either bank refers to other options; the fr list in
  `lib/shuffleOptions.ts` (`A et B`, `Les deux`, `Toutes les réponses`...) is enough.
- Catalog languages: `TestCatalogEntry.languages` for bedriving should show en, nl and fr flags
  (derived from `translations` if the catalog reads them; otherwise add `fr`).

## Validation

- `python3 -I tools/next100/bedriving/fr/check.py`: PASS (200 questions, ids, order, categories
  and keys match; no em/en dashes; decimal comma; non-breaking space before ? ! : ;; no tu forms;
  no English left).
- `python3 -I .claude/skills/exam-bank/scripts/validate_translation.py data/belgium-driving-questions.json data/belgium-driving-questions_fr.json --lang fr`: PASS (two warnings: "2 tonnes" and "12 tonnes" are the same in both languages).
- `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/belgium-driving-questions_fr.json --lang fr`: PASS (key-longest 20%, key over 1.2x 24%).
