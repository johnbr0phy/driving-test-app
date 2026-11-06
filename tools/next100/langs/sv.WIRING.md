# Swedish (sv, sv-SE) UI: wiring

New files (no edits elsewhere were made):

- `i18n/sv.ts` (same shape as `i18n/de.ts`, no category names, DMV-only blocks English)
- `components/home/copy/sv.ts` (same shape as `components/home/copy/nl.ts`; exports `sv` and `countryNames`; Swedish country names take no article, so no `inNames`)
- `tools/next100/langs/sv.json` (every per-language table value below, as data)

All copy is machine-translated, pending native review, register "du". No em-dashes, no prices.

Adding `'sv'` to the `Language` union makes TypeScript require it in every full `Record<Language, ...>` and in every inline `{...}[language]` map, so blocks 1, 2, 7 and 8 must land in the same commit.

## 1. `i18n/index.ts`

```ts
import { sv } from './sv';
```

```ts
export type Language = 'en' | 'es' | 'vi' | 'ko' | 'zh' | 'de' | 'fr' | 'it' | 'pl' | 'nl' | 'pt' | 'sv';

const translations: Record<Language, TranslationKeys> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, sv };
```

Append to `LANGUAGES` (after `pt`):

```ts
  { code: 'sv', flag: '\u{1F1F8}\u{1F1EA}', label: 'Svenska', englishName: 'Swedish' },
```

```ts
export { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, sv };
```

## 2. `lib/exams.ts`

`TEST_SET_NAMES` (a full `Record<Language, ...>`), after `pt`:

```ts
  sv: (n) => `Övningsset ${n}`,
```

`trainingPartName()`, before the English fallback line:

```ts
  if (lang === "sv") return `${p.set.name}, del ${p.part} av ${p.partCount}`;
```

## 3. `lib/examUi.ts` (EXAM_UI)

Add after the `pt` const:

```ts
const sv: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Klara alla ${total} steg`;
    if (done === total) return "Du är redo";
    if (done === total - 1) return "Ett kvar";
    if (done === 1) return `Bra start. 1 av ${total} klart`;
    const frac = done / total;
    if (frac < 0.45) return `${done} av ${total} klara`;
    if (frac < 0.55) return "Halvvägs";
    if (frac < 0.8) return "Mer än halvvägs";
    return `${done} av ${total}, nästan klart`;
  },
  questionsCount: (n) => `${n} frågor`,
  needToPass: (pct) => `${pct} % krävs för godkänt`,
  fullLengthExam: "🎯 Fullängdsprov",
  testN: (n) => `🎯 Prov ${n}`,
  examTestN: (shortName, n) => `${shortName}, prov ${n}`,
  pctToPass: (pct) => `${pct} % för godkänt`,
  yourStats: "Din statistik",
  yourStatsSub: "Varje fråga du har sett, sorterad efter vad du oftast svarar fel på",
  aboutThisTest: "Om det här övningsprovet",
  trainingBadge: (shortName) => `TRÄNING ${shortName}`,
  masteredMyTraining: (shortName) => `JAG HAR BEMÄSTRAT TRÄNINGEN ${shortName}`,
  mastered: "BEMÄSTRAT",
  nextPart: (name) => `Nästa: ${name}`,
  setN: (n) => `Set ${n}`,
  statsSeen: (seen, total, shortName) => `Du har sett ${seen} av ${total} frågor för ${shortName}. Tryck på en rad för att svara igen.`,
  dateLocale: "sv-SE",
};
```

```ts
const EXAM_UI: Partial<Record<Language, ExamUi>> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, sv };
```

Also add `sv` to the header comment's list of machine-translated entries.

## 4. `components/exam/ExamLandingHero.tsx` (COPY), after `pt`

```ts
  sv: {
    start: "Börja öva",
    dashboard: "Till översikten",
    mobile: "Öva i mobilen",
    desktop: "Gör provet på datorn",
    mobileAlt: (name: string) => `Tigertest ${name}: träningsläge i mobilen`,
    desktopAlt: (name: string) => `Tigertest ${name}: övningsprov på datorn`,
  },
```

## 5. `components/exam/ExamSampleQuestions.tsx` (SAMPLE_COPY), after `pt`

```ts
  sv: {
    title: (name) => `${name}: exempelfrågor med svar`,
    sub: (n, total) => `${n} av de ${total} övningsfrågorna, en från varje ämne, med förklarat svar.`,
    answer: "Svar",
    quiz: (name) => `${name}: exempelfrågor`,
  },
```

## 6. `components/exam/ExamRelatedTests.tsx` (RELATED_COPY), after `pt`

```ts
  sv: {
    title: "Fler övningsprov",
    sub: "Alla prov på Tigertest är gratis och du behöver inget konto för att börja.",
    country: (name) => `Gratis övningsprov: ${name}`,
    all: (n) => `Se alla ${n} övningsprov`,
  },
```

## 7. `components/exam/ExamTrainingPage.tsx` (celebrationCopy, indexed by `lang`, so required)

After the `pt:` line:

```ts
    sv: { title: "Det här steget är nu grönt!", part: "Delen är klar", set: "Träningen är klar", progress: "Se dina framsteg", description: "Övningen lönade sig. Det här steget är nu grönt i din översikt.", remaining: "Du är klar med den här delen. Fortsätt för att klara resten av setet.", resetPart: "Då nollställs bara dina framsteg i den här delen. Är du säker?" },
```

## 8. `components/results/ResultsHeroDebrief.tsx` (lines 66 and 67, indexed by `language`, so required)

Add to the end of each object:

```ts
progressLabel: ..., pt: "Ver o progresso", sv: "Se dina framsteg" }[language];
completedLabel: ..., pt: "Teste de treino concluído", sv: "Övningsprovet är klart" }[language];
```

## 9. `components/ReportExamQuestion.tsx` (COPY), after `pl`

```ts
  sv: {
    open: "Rapportera den här frågan", what: "Vad är fel?", note: "Vad borde det stå? (valfritt)", send: "Skicka", sending: "Skickar...", cancel: "Avbryt",
    thanks: "Tack. Vi går igenom varje rapport och rättar frågan om den är fel.", error: "Det gick inte att skicka. Försök igen.",
    reasons: { wrong_answer: "Det markerade svaret är fel", two_answers: "Mer än ett svar är rätt", unclear: "Frågan är otydlig", outdated: "Regeln eller uppgiften är inaktuell", typo: "Det finns ett stavfel", other: "Något annat" },
  },
```

## 10. `lib/shareCards.ts` (CARD_FOOTERS), after `pt`

```ts
  sv: "Gratis övning. Varje svar förklaras.",
```

## 11. `lib/shuffleOptions.ts` (LANGUAGE_PATTERNS), after `pt`

```ts
  sv: { connectors: ["och", "eller"], phrases: ["Alla ovanstående", "Inget av ovanstående", "Ingen av ovanstående", "Alla svaren", "Alla alternativen"], both: ["Båda", "Båda är rätt", "Båda svaren", "Båda alternativen"] },
```

## 12. `.claude/skills/exam-bank/scripts/validate_translation.py` (LANGUAGE_PATTERNS, keep in step with 11)

```python
    "sv": (["och", "eller"], ["Alla ovanstående", "Inget av ovanstående", "Ingen av ovanstående", "Alla svaren", "Alla alternativen"], ["Båda", "Båda är rätt", "Båda svaren", "Båda alternativen"]),
```

## 13. `.claude/skills/exam-bank/scripts/validate_bank.py`

`LANG_RULES` (this also adds `sv` to the `--lang` choices):

```python
    "sv": (r"alla ovanstående|inget av ovanstående|ingen av ovanstående|alla svaren|alla alternativen", ["och", "eller"], ["båda"]),
```

`LEN_SCALE` (Swedish runs about as long as English):

```python
LEN_SCALE = {"de": 1.3, "nl": 1.25, "fr": 1.2, "pl": 1.2, "it": 1.15, "pt": 1.15, "es": 1.15, "tr": 1.1, "sv": 1.05}
```

Also add `sv 1.05` to the docstring list on line 13.

## 14. `lib/llmsTxt.ts` (LANGUAGE_NAMES)

```ts
  de: "German", fr: "French", it: "Italian", pl: "Polish", nl: "Dutch", pt: "Portuguese", sv: "Swedish",
```

## 15. `lib/homeLanguages.ts` (middleware reads it)

```ts
export const HOME_LANGUAGES = ["en", "de", "es", "pt", "fr", "it", "nl", "pl", "vi", "ko", "zh", "sv"] as const;
```

`app/home-lang/[region]/[lang]` needs nothing: it renders on demand and checks `isHomeLanguage()`.

## 16. `components/home/copy/index.ts`

```ts
import { sv, countryNames as svNames } from "./sv";
```

```ts
export const TRANSLATED_COPY: Partial<Record<Language, HomeCopy>> = { es, pt, fr, it, nl, pl, vi, ko, zh, sv };
```

Add to `TRANSLATED_COUNTRY_NAMES`:

```ts
  sv: svNames,
```

No `TRANSLATED_IN_NAMES` entry: Swedish names need no article.

## Optional, not required for the UI

- `lib/region.ts`: Sweden stays `lang: "en", locale: "en-SE"` (its test, `setrafik`, is in English). Switch it to `lang: "sv", locale: "sv-SE"` only if the `/se` homepage should default to Swedish; then `REGION_HREFLANG` changes too.
- `lib/urlLanguage.ts`: add `{ prefix: "/sv", lang: "sv", includeRoot: false }` only once a Swedish-language landing exists under `/sv`.
- CLAUDE.md, "Native-language exams" paragraph: "The UI runs in twelve languages: `i18n/{de,fr,it,pl,nl,pt,sv}.ts`".
