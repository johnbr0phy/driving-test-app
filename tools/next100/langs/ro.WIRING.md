# Romanian (ro, ro-RO) UI: wiring

New files (no edits elsewhere were made):

- `i18n/ro.ts` (same shape and keys as `i18n/de.ts`, no category names, DMV-only blocks English)
- `components/home/copy/ro.ts` (same shape as `components/home/copy/nl.ts`; exports `ro` and `countryNames`. Every sentence puts the country after "pentru" or a colon, where Romanian uses the plain name with its own article ("pentru Regatul Unit", "pentru Statele Unite"), so no `inNames` table is needed. The US FAQ names Premium as an optional one-time purchase without the figure.)
- `tools/next100/langs/ro.json` (every per-language table value below, as data)

All copy is machine-translated, pending native review, register informal "tu". No em-dashes, no prices. Romanian puts "de" between a number and its noun from 20 up ("8 pași", "20 de pași", "101 teste", "200 de întrebări"); the function entries below use a small `roDe()` helper for that. The fixed `{{n}}` strings in `i18n/ro.ts` cannot branch, so a few read "{{n}} întrebări" where a native writer would add "de" for 20 or more; a native reviewer may prefer to rephrase them.

The blocks below are written against the files as they stand (last language `pt`). The Swedish, Danish, Finnish and Hungarian UIs (`sv`, `da`, `fi`, `hu` `.WIRING.md`) are waiting to be wired the same way; if they land first, add `ro` after them instead of after `pt`.

Adding `'ro'` to the `Language` union makes TypeScript require it in every full `Record<Language, ...>` and in every inline `{...}[language]` map, so blocks 1, 2, 7 and 8 must land in the same commit.

## 1. `i18n/index.ts`

```ts
import { ro } from './ro';
```

```ts
export type Language = 'en' | 'es' | 'vi' | 'ko' | 'zh' | 'de' | 'fr' | 'it' | 'pl' | 'nl' | 'pt' | 'ro';

const translations: Record<Language, TranslationKeys> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, ro };
```

Append to `LANGUAGES` (after `pt`):

```ts
  { code: 'ro', flag: '\u{1F1F7}\u{1F1F4}', label: 'Română', englishName: 'Romanian' },
```

```ts
export { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, ro };
```

## 2. `lib/exams.ts`

`TEST_SET_NAMES` (a full `Record<Language, ...>`), after `pt`:

```ts
  ro: (n) => `Setul de antrenament ${n}`,
```

`trainingPartName()`, after the `pt` line, before the English fallback:

```ts
  if (lang === "ro") return `${p.set.name}, partea ${p.part} din ${p.partCount}`;
```

## 3. `lib/examUi.ts` (EXAM_UI)

Add after the `pt` const:

```ts
/** Romanian: "de" between a number and its noun from 20 up ("8 pași", "20 de pași"). */
const roDe = (n: number, noun: string) => {
  const r = n % 100;
  return (r === 0 && n !== 0) || r >= 20 ? `${n} de ${noun}` : `${n} ${noun}`;
};

const ro: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Fă toți cei ${roDe(total, "pași")}`;
    if (done === total) return "Ești pregătit";
    if (done === total - 1) return "Încă unul";
    if (done === 1) return `Început bun. 1 din ${total} gata`;
    const frac = done / total;
    if (frac < 0.45) return `${done} din ${total} gata`;
    if (frac < 0.55) return "La jumătatea drumului";
    if (frac < 0.8) return "Peste jumătate";
    return `${done} din ${total}, aproape gata`;
  },
  questionsCount: (n) => roDe(n, "întrebări"),
  needToPass: (pct) => `Ai nevoie de ${pct}% ca să treci`,
  fullLengthExam: "🎯 Examen complet",
  testN: (n) => `🎯 Testul ${n}`,
  examTestN: (shortName, n) => `${shortName}, testul ${n}`,
  pctToPass: (pct) => `${pct}% pentru promovare`,
  yourStats: "Statisticile tale",
  yourStatsSub: "Fiecare întrebare pe care ai văzut-o, ordonată după cele pe care le greșești cel mai des",
  aboutThisTest: "Despre acest test de exersare",
  trainingBadge: (shortName) => `ANTRENAMENT: ${shortName}`,
  masteredMyTraining: (shortName) => `AM STĂPÂNIT ANTRENAMENTUL ${shortName}`,
  mastered: "STĂPÂNIT",
  nextPart: (name) => `Urmează: ${name}`,
  setN: (n) => `Setul ${n}`,
  statsSeen: (seen, total, shortName) => `${shortName}: ai văzut ${seen} din ${roDe(total, "întrebări")}. Atinge un rând ca să răspunzi din nou.`,
  dateLocale: "ro-RO",
};
```

```ts
const EXAM_UI: Partial<Record<Language, ExamUi>> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, ro };
```

Also add `ro` to the header comment's list of machine-translated entries.

## 4. `components/exam/ExamLandingHero.tsx` (COPY), after `pt`

```ts
  ro: {
    start: "Începe să exersezi",
    dashboard: "Mergi la panou",
    mobile: "Exersează pe telefon",
    desktop: "Dă testul pe computer",
    mobileAlt: (name: string) => `Tigertest ${name}: modul de exersare pe telefon`,
    desktopAlt: (name: string) => `Tigertest ${name}: test de exersare pe computer`,
  },
```

## 5. `components/exam/ExamSampleQuestions.tsx` (SAMPLE_COPY), after `pt`

```ts
  ro: {
    title: (name) => `${name}: exemple de întrebări cu răspunsuri`,
    sub: (n, total) => `${n} din cele ${total % 100 >= 20 || (total % 100 === 0 && total !== 0) ? `${total} de` : total} întrebări de exersare, câte una din fiecare temă, cu răspunsul explicat.`,
    answer: "Răspuns",
    quiz: (name) => `${name}: exemple de întrebări`,
  },
```

## 6. `components/exam/ExamRelatedTests.tsx` (RELATED_COPY), after `pt`

```ts
  ro: {
    title: "Alte teste de exersare",
    sub: "Pe Tigertest fiecare test e gratuit și nu ai nevoie de cont ca să începi.",
    country: (name) => `Teste de exersare gratuite: ${name}`,
    all: (n) => `Vezi toate testele de exersare (${n})`,
  },
```

## 7. `components/exam/ExamTrainingPage.tsx` (celebrationCopy, indexed by `lang`, so required)

After the `pt:` line:

```ts
    ro: { title: "Pasul ăsta e verde acum!", part: "Partea e gata", set: "Antrenamentul e gata", progress: "Vezi progresul tău", description: "A meritat să exersezi. Pasul ăsta e acum verde în panoul tău.", remaining: "Ai terminat această parte. Continuă ca să termini restul setului.", resetPart: "Asta resetează doar progresul din această parte. Ești sigur?" },
```

## 8. `components/results/ResultsHeroDebrief.tsx` (lines 66 and 67, indexed by `language`, so required)

Add to the end of each object:

```ts
progressLabel: ..., pt: "Ver o progresso", ro: "Vezi progresul tău" }[language];
completedLabel: ..., pt: "Teste de treino concluído", ro: "Test de exersare terminat" }[language];
```

## 9. `components/ReportExamQuestion.tsx` (COPY), after `pl` (or the last entry)

```ts
  ro: {
    open: "Raportează întrebarea", what: "Ce e greșit?", note: "Care ar fi varianta corectă? (opțional)", send: "Trimite", sending: "Se trimite...", cancel: "Anulează",
    thanks: "Mulțumim. Verificăm fiecare raport și corectăm întrebarea dacă e greșită.", error: "Nu s-a putut trimite. Încearcă din nou.",
    reasons: { wrong_answer: "Răspunsul marcat e greșit", two_answers: "Mai multe răspunsuri sunt corecte", unclear: "Întrebarea nu e clară", outdated: "Regula sau datele sunt depășite", typo: "Are o greșeală de scriere", other: "Altceva" },
  },
```

## 10. `lib/shareCards.ts` (CARD_FOOTERS), after `pt`

```ts
  ro: "Exersare gratuită. Fiecare răspuns explicat.",
```

## 11. `lib/shuffleOptions.ts` (LANGUAGE_PATTERNS), after `pt`

Connectors are case-sensitive and need capital option letters on both sides, so "A" or "O" as ordinary Romanian words never match. "o" is left out: in Romanian it is the article "a/one", not "or".

```ts
  ro: { connectors: ["și", "sau", "ori"], phrases: ["Toate cele de mai sus", "Niciuna dintre cele de mai sus", "Niciunul dintre cele de mai sus", "Toate variantele", "Toate variantele sunt corecte", "Toate răspunsurile sunt corecte", "Niciuna dintre variante", "Niciun răspuns nu este corect"], both: ["Ambele", "Amândouă", "Amândoi", "Ambii", "Ambele variante", "Ambele răspunsuri", "Ambele sunt corecte"] },
```

## 12. `.claude/skills/exam-bank/scripts/validate_translation.py` (LANGUAGE_PATTERNS, keep in step with 11)

```python
    "ro": (["și", "sau", "ori"], ["Toate cele de mai sus", "Niciuna dintre cele de mai sus", "Niciunul dintre cele de mai sus", "Toate variantele", "Toate variantele sunt corecte", "Toate răspunsurile sunt corecte", "Niciuna dintre variante", "Niciun răspuns nu este corect"], ["Ambele", "Amândouă", "Amândoi", "Ambii", "Ambele variante", "Ambele răspunsuri", "Ambele sunt corecte"]),
```

## 13. `.claude/skills/exam-bank/scripts/validate_bank.py`

`LANG_RULES` (this also adds `ro` to the `--lang` choices):

```python
    "ro": (r"toate cele de mai sus|niciuna (dintre|din) cele de mai sus|niciunul (dintre|din) cele de mai sus|toate variantele|toate răspunsurile|niciuna dintre variante|niciun răspuns nu", ["și", "sau", "ori"], ["ambele", "amândouă", "amândoi", "ambii"]),
```

`LEN_SCALE` (Romanian runs about a fifth longer than English):

```python
LEN_SCALE = {"de": 1.3, "nl": 1.25, "fr": 1.2, "pl": 1.2, "ro": 1.2, "it": 1.15, "pt": 1.15, "es": 1.15, "tr": 1.1}
```

(If the Hungarian block landed first, keep its `"hu": 1.15` too.) Also add `ro 1.2` to the docstring list near the top.

Write Romanian with comma-below "ș" and "ț" (U+0219, U+021B), never the cedilla forms "ş" and "ţ"; the validator patterns above use comma-below and will miss cedilla text.

## 14. `lib/llmsTxt.ts` (LANGUAGE_NAMES)

```ts
  de: "German", fr: "French", it: "Italian", pl: "Polish", nl: "Dutch", pt: "Portuguese", ro: "Romanian",
```

## 15. `lib/homeLanguages.ts` (middleware reads it)

```ts
export const HOME_LANGUAGES = ["en", "de", "es", "pt", "fr", "it", "nl", "pl", "vi", "ko", "zh", "ro"] as const;
```

`app/home-lang/[region]/[lang]` needs nothing: it renders on demand and checks `isHomeLanguage()`.

## 16. `components/home/copy/index.ts`

```ts
import { ro, countryNames as roNames } from "./ro";
```

```ts
export const TRANSLATED_COPY: Partial<Record<Language, HomeCopy>> = { es, pt, fr, it, nl, pl, vi, ko, zh, ro };
```

Add to `TRANSLATED_COUNTRY_NAMES`:

```ts
  ro: roNames,
```

No `TRANSLATED_IN_NAMES` entry (see the header of `components/home/copy/ro.ts`).

## Optional, not required for the UI

- `lib/region.ts`: Romania stays `lang: "en", locale: "en-RO"` (its test, `rodrpciv`, is in English). Switch it to `lang: "ro", locale: "ro-RO"` only if the `/ro` homepage should default to Romanian; then `REGION_HREFLANG` changes too, and `/ro` would need a Romanian `REGION_HOME` entry.
- `lib/urlLanguage.ts`: add `{ prefix: "/ro", lang: "ro", includeRoot: false }` only once Romanian-language landings exist under a prefix. `/ro` is already the Romania country homepage, so a Romanian landing prefix needs care (every URL under `/ro` would be served as Romanian).
- CLAUDE.md, "Native-language exams" paragraph: add `ro` to the list of machine-translated UI dictionaries and bump the language count.
