# Wiring for `hukresz` in Hungarian (hu-HU)

Files already written (no edits needed):
- `data/hungary-kresz-questions_hu.json` (200 rows, same ids, order, categories, keys and option
  order as the English bank; `validate_translation.py --lang hu` PASS, `validate_bank.py --lang hu` PASS)
- `lib/examTranslations/hukresz.hu.json` (name, labels, set names and weight labels, category
  labels, dashboard copy; carries `"locale": "hu-HU"` and `"landingPath": "/hu/kresz-teszt"`)
- `lib/landings/hukresz.hu.json` (landing content, with `facts.source` in Hungarian)
- `app/hu/kresz-teszt/page.tsx` (three-line `TranslatedExamLanding` wrapper, `samples related`)
- `lib/banks/hukresz.ts` (edited: registers the Hungarian bank, below)
- `tools/next100/hukresz/hu/*` (sources, `build.py`, `check.py`, `glossary.md`, `NOTES.md`).
  Rebuild with `python3 -I tools/next100/hukresz/hu/build.py`.

Review status: **machine** (machine translation, pending native review) for the bank, the exam
copy and the landing.

Everything below goes in shared files.

## lib/banks/hukresz.ts (already done)

```ts
import { Question } from "@/types";
import hukreszQuestions from "@/data/hungary-kresz-questions.json";
import hukreszQuestionsHu from "@/data/hungary-kresz-questions_hu.json";
import { registerExamBanks } from "@/lib/examData";

registerExamBanks({ hukresz: hukreszQuestions as Question[] }, { hukresz: { hu: hukreszQuestionsHu as Question[] } });
```

## lib/exams.ts

Import with the other translation JSONs (top of file):

```ts
import hukreszHu from "./examTranslations/hukresz.hu.json";
```

On the `hukresz` config (after `copy`):

```ts
  translations: {
    hu: examTranslation(hukreszHu),
  },
  review: { hu: "machine" },
```

`hukresz` trains by topic (not `testSets()`), so the JSON has a `trainingSets` block with
Hungarian names and weight labels for sets 1 to 5. No set is split into parts (largest is 54),
so there are no `partNames`.

Also worth changing on the English config now that a Hungarian version exists:
`trainingSub` says "Five sets on the Hungarian Highway Code, in English." (still true for the
English copy, leave it) and the landing FAQ in `app/hungary-kresz-test/page.tsx` may add one
line: "Tigertest also has this test in Hungarian: /hu/kresz-teszt".

## Landing and SEO

- `app/hu/kresz-teszt/page.tsx` is a static folder; `/hu` already gets `lang="hu"` and the
  `Content-Language` header from `lib/urlLanguage.ts`.
- hreflang and x-default: the Hungarian page is x-default for this exam. `examLandingAlternates("hukresz")`
  already does this with no code change, because the base is English, the exam's region is HU
  and the translation's locale `hu-HU` ends with `-HU`; it returns
  `{ en: /hungary-kresz-test, "hu-HU": /hu/kresz-teszt, "x-default": /hu/kresz-teszt }`.
  (If `regionOfTest("hukresz")` is not `HU`, set it, or x-default stays English.)
- The English landing `app/hungary-kresz-test/page.tsx` sets only `canonical`; add
  `languages: examLandingAlternates("hukresz")` to its `alternates` (import from `@/lib/examSeo`)
  so hreflang is reciprocal.
- Screenshots: `TranslatedExamLanding` expects `public/landing/hukresz-mobile-hu.png` and
  `public/landing/hukresz-desktop-hu.png` (not made; no npm/dev server in this session).
- Sitemap and `llms.txt` pick up `translations.hu.landingPath` automatically; bump
  `EXAM_LANDINGS_UPDATED_AT` in `lib/seoDates.ts` with "the Hungary KRESZ test in Hungarian".
- Run `npx tsx scripts/build-landing-dates.ts` after committing so `lib/landingDates.json`
  dates the new landing JSON.
- Hungary homepage (`/hu`): when the HU region runs in Hungarian, link this exam's card to
  `/hu/kresz-teszt` and, in `lib/landingContent.ts`, register `hukresz` + `hu` so the homepage
  "About each test" section can quote this landing's facts answer:
  ```ts
  import hukreszHuLanding from "./landings/hukresz.hu.json";
  // in LANDINGS:
  "hukresz.hu": hukreszHuLanding as TranslatedLandingContent,
  ```

## lib/testCatalog.ts

The catalog blurb (line ~267) says "Three full 55-question tests in English"; suggested:
`"Three full 55-question tests in English or Hungarian for Hungary's KRESZ theory exam (category B): ..."`
(rest unchanged). The search aliases (line ~691) already include "kresz teszt", "kresz vizsga".

## Other per-language tables

- Category labels: the Hungarian labels are in `hukresz.hu.json` (`categoryLabels`); results
  pages read the exam's own labels first, so nothing is needed in `i18n/hu.ts`.
- Shuffle guard: no Hungarian option refers to other options (`guarded 0` in both banks).
- `lib/examUi.ts` already has a `hu` entry.

## Validation

```
python3 -I tools/next100/hukresz/hu/build.py
python3 -I .claude/skills/exam-bank/scripts/validate_translation.py data/hungary-kresz-questions.json data/hungary-kresz-questions_hu.json --lang hu
python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/hungary-kresz-questions_hu.json --lang hu
```
