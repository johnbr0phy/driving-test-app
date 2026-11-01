# Wiring for `ptimt` in European Portuguese (`translations.pt`)

Files written by the translator (no shared file touched):
- `data/portugal-imt-questions_pt.json`: 200 questions, same questionIds, order, type, state,
  category, correctAnswer, correctIndex and option order as `data/portugal-imt-questions.json`.
  Built from `tools/next100/ptimt/pt/t01.json`..`t04.json` by
  `python3 -I tools/next100/ptimt/pt/build_pt.py` (also validates parity; PASS).
- `lib/examTranslations/ptimt.pt.json`: name, labels, the four topic set names (this exam does not
  use `testSets()`, so `trainingSets` is filled), category labels, dashboard copy (5 heroSubs).
- `lib/landings/ptimt.pt.json`: the `TranslatedLandingContent` for `/pt/testes-codigo-imt`.
- `app/pt/testes-codigo-imt/page.tsx`: the three-line `TranslatedExamLanding` wrapper (lang `"pt"`).
- `app/pt/layout.tsx` (NEW, did not exist): `<div lang="pt">`, copied from `app/es/layout.tsx`.
  Caution: it also wraps the existing English Portugal homepage `app/pt/page.tsx`, which would now
  be tagged Portuguese while its copy is still English (the same issue LANGUAGES.md section 0 flags
  for `/es`). Either turn `/pt` Portuguese in the same release (LANGUAGES.md 3.4 / section 4), or
  wrap `app/pt/page.tsx` in `<div lang="en">` until then. The platform agent may prefer
  `lang="pt-PT"`.
- `tools/next100/ptimt/pt/`: `glossary.md`, `NOTES.md`, `build_pt.py`, sources `t01-t04.json`.

Review status: machine translation by a model, November 2026, pending native review.

Everything below goes in shared files (depends on the platform agent's `pt` language).

## lib/banks/ptimt.ts

```ts
import { Question } from "@/types";
import ptimtQuestions from "@/data/portugal-imt-questions.json";
import ptimtQuestionsPt from "@/data/portugal-imt-questions_pt.json";
import { registerExamBanks } from "@/lib/examData";

// The Portugal IMT driving theory (category B) bank, English base plus the pt-PT translation.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ ptimt: ptimtQuestions as Question[] }, { ptimt: { pt: ptimtQuestionsPt as Question[] } });
```

## lib/exams.ts

Import with the other translation JSONs:

```ts
import ptimtPt from "./examTranslations/ptimt.pt.json";
```

In the `ptimt` config (after `categoryLabels` / `copy`, like `cna`):

```ts
  review: { pt: "machine" },
  translations: {
    pt: { ...examTranslation(ptimtPt), locale: "pt-PT" },
  },
```

(If `examTranslation()` gains a `locale` parameter or the JSON should carry it, move
`"locale": "pt-PT"` into `ptimt.pt.json` instead; the landingPath there is already
`/pt/testes-codigo-imt`.) The base stays English (no `language` field), per LANGUAGES.md 1.1.

`TEST_SET_NAMES.pt` ("Conjunto de treino N") is not needed by this exam, whose sets are named.

## components/exam/TranslatedExamLanding.tsx (platform)

- `LOCALES` needs `pt: "pt-PT"` (or read the translation's `locale`), otherwise `inLanguage` and
  `og:locale` come out as plain `pt`.
- `priceCurrency` should be `EUR` for this exam (LANGUAGES.md 3.2).
- Optional per 3.2: render `ExamSampleQuestions` (pt bank, `inLanguage` pt-PT) and
  `ExamRelatedTests`. The English landing renders both.
- The footnote string in `lib/landings/ptimt.pt.json` ends "confirme os detalhes atuais em" and is
  followed by the `EXAM_FACTS.ptimt.source` link ("IMT, carta de condução"), as for other exams.

## lib/examSeo.ts

`examLandingAlternates("ptimt")` will add `pt` automatically from `translations`. Per LANGUAGES.md
3.3 the key should be `pt-PT`, and x-default for this exam should be the Portuguese page (main
language of the test). The English landing `app/portugal-driving-theory-test/page.tsx` sets only a
canonical today: add `languages: examLandingAlternates("ptimt")` to its `alternates` so the pages
link both ways.

## lib/shuffleOptions.ts

No row in the pt bank uses "A e B", "A ou B", "Ambas", "Todas as anteriores" or "Nenhuma das
anteriores" (none in English either), so the pt pattern list changes nothing for this bank.

## lib/examUi.ts, i18n/pt.ts, ExamLandingHero COPY

Need `pt` strings (platform). The landing hero receives `lang="pt"`.

## lib/sitemaps.ts, lib/seoDates.ts, lib/llmsTxt.ts

The exams sitemap already lists translation landing paths; bump `EXAM_LANDINGS_UPDATED_AT`.
llms.txt: add the Portuguese landing line if translated landings are listed there
("Portugal driving theory test (in Portuguese): /pt/testes-codigo-imt").

## Screenshots

`public/landing/ptimt-{mobile,desktop}-pt.png` with the app in Portuguese, if the translated hero
expects language-specific shots.

## CLAUDE.md

Add to the Portugal bullet: "Also in European Portuguese (`translations.pt`, locale pt-PT, bank
`data/portugal-imt-questions_pt.json` built by `tools/next100/ptimt/pt/build_pt.py`, landing
`/pt/testes-codigo-imt`, machine-translated pending native review)." and add ptimt (pt) to the
"Translated so far" list in "Translated exams".
