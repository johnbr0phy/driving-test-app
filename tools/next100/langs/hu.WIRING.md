# Hungarian (hu, hu-HU) UI: wiring

New files (no edits elsewhere were made):

- `i18n/hu.ts` (same shape and keys as `i18n/de.ts`, no category names, DMV-only blocks English)
- `components/home/copy/hu.ts` (same shape as `components/home/copy/nl.ts`; exports `hu` and `countryNames`. Hungarian marks place with case suffixes that depend on the name, so every sentence puts the country after a colon or in brackets, like the Dutch copy, and no `inNames` table is needed)
- `tools/next100/langs/hu.json` (every per-language table value below, as data)

All copy is machine-translated, pending native review, register informal "te". No em-dashes, no prices. Where a number takes a suffix or article that changes with the number, the copy uses "a(z)" or a slash form ("{{fixed}} / {{total}}") rather than guessing it.

Adding `'hu'` to the `Language` union makes TypeScript require it in every full `Record<Language, ...>` and in every inline `{...}[language]` map, so blocks 1, 2, 7 and 8 must land in the same commit. If the Swedish (`sv`) or Danish (`da`) wiring lands first, append `hu` after them instead of after `pt`.

## 1. `i18n/index.ts`

```ts
import { hu } from './hu';
```

```ts
export type Language = 'en' | 'es' | 'vi' | 'ko' | 'zh' | 'de' | 'fr' | 'it' | 'pl' | 'nl' | 'pt' | 'hu';

const translations: Record<Language, TranslationKeys> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, hu };
```

Append to `LANGUAGES` (after `pt`):

```ts
  { code: 'hu', flag: '\u{1F1ED}\u{1F1FA}', label: 'Magyar', englishName: 'Hungarian' },
```

```ts
export { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, hu };
```

## 2. `lib/exams.ts`

`TEST_SET_NAMES` (a full `Record<Language, ...>`), after `pt`:

```ts
  hu: (n) => `${n}. gyakorlósorozat`,
```

`trainingPartName()`, before the English fallback line:

```ts
  if (lang === "hu") return `${p.set.name}, ${p.part}/${p.partCount}. rész`;
```

## 3. `lib/examUi.ts` (EXAM_UI)

Add after the `pt` const:

```ts
const hu: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Teljesítsd mind a(z) ${total} lépést`;
    if (done === total) return "Készen állsz";
    if (done === total - 1) return "Már csak egy";
    if (done === 1) return `Jó kezdés. ${total} lépésből 1 kész`;
    const frac = done / total;
    if (frac < 0.45) return `${total} lépésből ${done} kész`;
    if (frac < 0.55) return "Félúton vagy";
    if (frac < 0.8) return "Túl vagy a felén";
    return `${total} lépésből ${done} kész, majdnem megvan`;
  },
  questionsCount: (n) => `${n} kérdés`,
  needToPass: (pct) => `A sikerhez ${pct}% kell`,
  fullLengthExam: "🎯 Teljes hosszúságú vizsga",
  testN: (n) => `🎯 ${n}. teszt`,
  examTestN: (shortName, n) => `${shortName}, ${n}. teszt`,
  pctToPass: (pct) => `${pct}% a sikerhez`,
  yourStats: "Statisztikáid",
  yourStatsSub: "Minden kérdés, amit láttál, aszerint rendezve, amit a legtöbbször elrontasz",
  aboutThisTest: "Erről a gyakorló tesztről",
  trainingBadge: (shortName) => `GYAKORLÁS: ${shortName}`,
  masteredMyTraining: (shortName) => `ELSAJÁTÍTOTTAM: ${shortName} GYAKORLÁS`,
  mastered: "ELSAJÁTÍTVA",
  nextPart: (name) => `Következik: ${name}`,
  setN: (n) => `${n}. sorozat`,
  statsSeen: (seen, total, shortName) => `${shortName}: eddig ${seen} / ${total} kérdést láttál. Koppints egy sorra, hogy újra válaszolj.`,
  dateLocale: "hu-HU",
};
```

```ts
const EXAM_UI: Partial<Record<Language, ExamUi>> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, hu };
```

Also add `hu` to the header comment's list of machine-translated entries.

## 4. `components/exam/ExamLandingHero.tsx` (COPY), after `pt`

```ts
  hu: {
    start: "Gyakorlás indítása",
    dashboard: "Az áttekintéshez",
    mobile: "Gyakorolj a telefonodon",
    desktop: "Írd meg a tesztet számítógépen",
    mobileAlt: (name: string) => `Tigertest ${name}: gyakorló mód telefonon`,
    desktopAlt: (name: string) => `Tigertest ${name}: gyakorló teszt számítógépen`,
  },
```

## 5. `components/exam/ExamSampleQuestions.tsx` (SAMPLE_COPY), after `pt`

```ts
  hu: {
    title: (name) => `${name}: mintakérdések válaszokkal`,
    sub: (n, total) => `${n} a(z) ${total} gyakorlókérdésből, minden témából egy, elmagyarázott válasszal.`,
    answer: "Válasz",
    quiz: (name) => `${name}: mintakérdések`,
  },
```

## 6. `components/exam/ExamRelatedTests.tsx` (RELATED_COPY), after `pt`

```ts
  hu: {
    title: "További gyakorló tesztek",
    sub: "A Tigertesten minden teszt ingyenes, és a kezdéshez nem kell fiók.",
    country: (name) => `Ingyenes gyakorló tesztek: ${name}`,
    all: (n) => `Mind a(z) ${n} gyakorló teszt megtekintése`,
  },
```

## 7. `components/exam/ExamTrainingPage.tsx` (celebrationCopy, indexed by `lang`, so required)

After the `pt:` line:

```ts
    hu: { title: "Ez a lépés most zöld!", part: "A rész kész", set: "A gyakorlás kész", progress: "Haladásod megtekintése", description: "Megérte gyakorolni. Ez a lépés most zöld az áttekintésedben.", remaining: "Ezzel a résszel végeztél. Folytasd, hogy a sorozat többi részét is teljesítsd.", resetPart: "Ez csak ennek a résznek a haladását nullázza le. Biztos vagy benne?" },
```

## 8. `components/results/ResultsHeroDebrief.tsx` (lines 66 and 67, indexed by `language`, so required)

Add to the end of each object:

```ts
progressLabel: ..., pt: "Ver o progresso", hu: "Haladásod megtekintése" }[language];
completedLabel: ..., pt: "Teste de treino concluído", hu: "Gyakorló teszt kész" }[language];
```

## 9. `components/ReportExamQuestion.tsx` (COPY), after `pl`

```ts
  hu: {
    open: "Kérdés jelentése", what: "Mi a hiba?", note: "Mi lenne a helyes? (nem kötelező)", send: "Küldés", sending: "Küldés...", cancel: "Mégse",
    thanks: "Köszönjük. Minden jelentést átnézünk, és kijavítjuk a kérdést, ha hibás.", error: "Nem sikerült elküldeni. Próbáld újra.",
    reasons: { wrong_answer: "A megjelölt válasz hibás", two_answers: "Több válasz is helyes", unclear: "A kérdés nem egyértelmű", outdated: "A szabály vagy az adat elavult", typo: "Elírás van benne", other: "Valami más" },
  },
```

## 10. `lib/shareCards.ts` (CARD_FOOTERS), after `pt`

```ts
  hu: "Ingyenes gyakorlás. Minden válasz elmagyarázva.",
```

## 11. `lib/shuffleOptions.ts` (LANGUAGE_PATTERNS), after `pt`

Connectors are case-sensitive and need capital option letters on both sides, so the Hungarian article "A" before an ordinary word never matches.

```ts
  hu: { connectors: ["és", "vagy"], phrases: ["A fentiek mindegyike", "A fentiek közül egyik sem", "Egyik fenti sem", "Egyik válasz sem", "Mindegyik válasz helyes", "Minden válasz helyes"], both: ["Mindkettő", "Mindkettő helyes", "Mindkét válasz", "Mindkét válasz helyes"] },
```

## 12. `.claude/skills/exam-bank/scripts/validate_translation.py` (LANGUAGE_PATTERNS, keep in step with 11)

```python
    "hu": (["és", "vagy"], ["A fentiek mindegyike", "A fentiek közül egyik sem", "Egyik fenti sem", "Egyik válasz sem", "Mindegyik válasz helyes", "Minden válasz helyes"], ["Mindkettő", "Mindkettő helyes", "Mindkét válasz", "Mindkét válasz helyes"]),
```

## 13. `.claude/skills/exam-bank/scripts/validate_bank.py`

`LANG_RULES` (this also adds `hu` to the `--lang` choices):

```python
    "hu": (r"a fentiek mindegyike|a fentiek közül egyik sem|egyik fenti sem|egyik válasz sem|mindegyik válasz helyes|minden válasz helyes", ["és", "vagy"], ["mindkettő", "mindkét"]),
```

`LEN_SCALE` (Hungarian runs a little longer than English):

```python
LEN_SCALE = {"de": 1.3, "nl": 1.25, "fr": 1.2, "pl": 1.2, "it": 1.15, "pt": 1.15, "es": 1.15, "hu": 1.15, "tr": 1.1}
```

Also add `hu 1.15` to the docstring list near the top.

## 14. `lib/llmsTxt.ts` (LANGUAGE_NAMES)

```ts
  de: "German", fr: "French", it: "Italian", pl: "Polish", nl: "Dutch", pt: "Portuguese", hu: "Hungarian",
```

## 15. `lib/homeLanguages.ts` (middleware reads it)

```ts
export const HOME_LANGUAGES = ["en", "de", "es", "pt", "fr", "it", "nl", "pl", "vi", "ko", "zh", "hu"] as const;
```

`app/home-lang/[region]/[lang]` needs nothing: it renders on demand and checks `isHomeLanguage()`.

## 16. `components/home/copy/index.ts`

```ts
import { hu, countryNames as huNames } from "./hu";
```

```ts
export const TRANSLATED_COPY: Partial<Record<Language, HomeCopy>> = { es, pt, fr, it, nl, pl, vi, ko, zh, hu };
```

Add to `TRANSLATED_COUNTRY_NAMES`:

```ts
  hu: huNames,
```

No `TRANSLATED_IN_NAMES` entry (see the header of `components/home/copy/hu.ts`).

## Optional, not required for the UI

- `lib/region.ts`: Hungary stays `lang: "en", locale: "en-HU"` (its test, `hukresz`, is in English). Switch it to `lang: "hu", locale: "hu-HU"` only if the `/hu` homepage should default to Hungarian; then `REGION_HREFLANG` changes too.
- `lib/urlLanguage.ts`: add `{ prefix: "/hu", lang: "hu", includeRoot: false }` only once Hungarian-language landings exist under a prefix. Note `/hu` is already the Hungary country homepage, so a Hungarian landing prefix would need care (every URL under `/hu` would be served as Hungarian).
- CLAUDE.md, "Native-language exams" paragraph: add `hu` to the list of machine-translated UI dictionaries and bump the language count.
