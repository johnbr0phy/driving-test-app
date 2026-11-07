# Wiring for `dkteori` in Danish (da-DK)

Files already written (no edits needed): `data/denmark-driving-theory-questions_da.json` (200,
same ids, order, categories and keys as the English bank; `check.py` and
`validate_translation.py --lang da` PASS), `lib/examTranslations/dkteori.da.json`,
`lib/landings/dkteori.da.json`, `app/da/teoriproeve-bil/page.tsx` (three-line
`TranslatedExamLanding` wrapper), `tools/next100/dkteori/da/*` (sources, `build.py`, `check.py`,
`glossary.md`, `NOTES.md`), and `lib/banks/dkteori.ts` (already edited, below). Rebuild the bank
with `python3 -I tools/next100/dkteori/da/build.py`.

Review status: **machine** (machine translation, pending native review), for the bank, the exam
copy and the landing.

## lib/banks/dkteori.ts (done)

```ts
import { Question } from "@/types";
import dkteoriQuestions from "@/data/denmark-driving-theory-questions.json";
import dkteoriQuestionsDa from "@/data/denmark-driving-theory-questions_da.json";
import { registerExamBanks } from "@/lib/examData";

registerExamBanks({ dkteori: dkteoriQuestions as Question[] }, { dkteori: { da: dkteoriQuestionsDa as Question[] } });
```

Everything below goes in shared files.

## lib/exams.ts

Import with the other translation JSONs (top of file, after `ptimtPt`):

```ts
import dkteoriDa from "./examTranslations/dkteori.da.json";
```

On the `dkteori` config (after `copy`, like `esdgt` and `ptimt`):

```ts
  review: { da: "machine" },
  translations: {
    da: examTranslation(dkteoriDa),
  },
```

The JSON carries `"locale": "da-DK"` and `"landingPath": "/da/teoriproeve-bil"`. The dkteori
training sets are topic sets (not `testSets()`), so `dkteori.da.json` has a `trainingSets` block
with Danish names and weight labels for sets 1 to 4; no set is split into parts (largest is 56),
so there are no `partNames`.

## Landing, hreflang and x-default

- `app/da/teoriproeve-bil/page.tsx` is a static folder; `lib/urlLanguage.ts` already maps `/da`
  to Danish (`Content-Language` and `<html lang="da">`).
- hreflang: once the translation is registered, `examLandingAlternates("dkteori")` returns
  `en` (the English landing), `da-DK` (this page) and `x-default` = **the Danish page**: the exam's
  region is DK and the translation's locale ends in `-DK`, so the English-base rule hands x-default
  to the country's own language. The native landing is x-default for this exam. No code change.
- The English landing `app/denmark-driving-theory-test/page.tsx` sets only `canonical`; add
  `languages: examLandingAlternates("dkteori")` to its `alternates` (import from `@/lib/examSeo`)
  so hreflang is reciprocal:

```ts
  alternates: {
    canonical: `${siteUrl}/denmark-driving-theory-test`,
    languages: examLandingAlternates("dkteori"),
  },
```

- Currency: `TranslatedExamLanding` already maps DK to DKK.
- Facts footnote link: `facts.source` in the landing JSON gives Danish link text
  ("Færdselsstyrelsen: Tag kørekort til bil", the fstyr.dk page in `sources.md`).
- Screenshots: `TranslatedExamLanding` expects `public/landing/dkteori-mobile-da.png` and
  `public/landing/dkteori-desktop-da.png` (not made: no npm or browser in this session). Shoot with
  `.claude/skills/exam-bank/scripts/shoot_landing.js` once the exam is wired.
- Sitemap and `llms.txt` pick up the translation landing path automatically; bump
  `EXAM_LANDINGS_UPDATED_AT` in `lib/seoDates.ts`, and rerun
  `npx tsx scripts/build-landing-dates.ts` after committing.
- The page passes `samples related`; `ExamSampleQuestions` and `ExamRelatedTests` already carry
  Danish strings and read the Danish bank through `lang="da"`.

## Other per-language tables

- Category labels: the Danish labels are in `dkteori.da.json` (`categoryLabels`). If a results
  page still reads `i18n/da.ts` `categories.*` before the exam's own labels, add:
  `dkVehicle` "Bilen, udstyr og papirer", `dkBehaviour` "Køretøjer, trafikanter og førerens
  tilstand", `dkBasics` "Veje, grundregler og særlige risici", `dkLanes` "Igangsætning, hastighed
  og vognbaneskift", `dkPassing` "Passage, møde, afstand og overhaling", `dkJunctions` "Kryds,
  vigepligt og rundkørsler", `dkMotorway` "Motorvej, parkering, mørke og tunneler".
- Shuffle guard: no option in the English or Danish bank references other options (guarded 0 in
  both); the existing Danish patterns in `lib/shuffleOptions.ts` are enough.
- Region DK: the `/dk` homepage is English today. When DK switches its homepage to Danish, link
  this exam to `/da/teoriproeve-bil` there, and `components/home/copy/da.ts` / `lib/landingContent.ts`
  can quote `lib/landings/dkteori.da.json` (`facts.answer`) under "About each test".
- The English landing's FAQ "Can I take the Danish theory test in English?" can add one line:
  "Tigertest has the same test in Danish too." (optional).
- CLAUDE.md, "Translated exams": add "Denmark teoriprøve (da-DK, landing `/da/teoriproeve-bil`)"
  to the list of translated exams, and in the `dkteori` entry: "Also offered in Danish
  (`translations.da`, locale da-DK, `review: { da: "machine" }`): bank
  `data/denmark-driving-theory-questions_da.json` built by `tools/next100/dkteori/da/build.py`,
  landing `/da/teoriproeve-bil` (x-default for this exam, hreflang both ways with the English
  landing), machine-translated pending native review."

## Validation

```
python3 -I tools/next100/dkteori/da/build.py
python3 -I .claude/skills/exam-bank/scripts/validate_translation.py data/denmark-driving-theory-questions.json data/denmark-driving-theory-questions_da.json --lang da
```

Both PASS (validator warnings: BAS-001 stem shorter, because the English "Danish traffic rules
(færdselsloven)" becomes just "færdselsloven"; "Orange" identical in both languages, twice).
`python3 -I tools/check_banks.py` will pick up the `_da` bank as a translated bank of the base.
