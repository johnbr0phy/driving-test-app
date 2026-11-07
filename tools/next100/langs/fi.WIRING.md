# Finnish (fi, fi-FI) UI: wiring

New files (no edits elsewhere were made):

- `i18n/fi.ts` (same shape as `i18n/de.ts`, no category names, DMV-only blocks English)
- `components/home/copy/fi.ts` (same shape as `components/home/copy/nl.ts`; exports `fi` and `countryNames`; every sentence puts the country after a colon or in brackets, so the nominative fits and no `inNames` is needed)
- `tools/next100/langs/fi.json` (every per-language table value below, as data)

All copy is machine-translated, pending native review, register "sinä". No em-dashes, no prices (the US FAQ names Premium as an optional one-time purchase without the figure).

The blocks below are written against the files as they stand (last language `pt`). The Swedish and Danish UIs (`sv.WIRING.md`, `da.WIRING.md`) are waiting to be wired the same way; if they land first, add `fi` after them instead of after `pt`.

Adding `'fi'` to the `Language` union makes TypeScript require it in every full `Record<Language, ...>` and in every inline `{...}[language]` map, so blocks 1, 2, 7 and 8 must land in the same commit.

## 1. `i18n/index.ts`

```ts
import { fi } from './fi';
```

```ts
export type Language = 'en' | 'es' | 'vi' | 'ko' | 'zh' | 'de' | 'fr' | 'it' | 'pl' | 'nl' | 'pt' | 'fi';

const translations: Record<Language, TranslationKeys> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, fi };
```

Append to `LANGUAGES` (after `pt`):

```ts
  { code: 'fi', flag: '\u{1F1EB}\u{1F1EE}', label: 'Suomi', englishName: 'Finnish' },
```

```ts
export { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, fi };
```

## 2. `lib/exams.ts`

`TEST_SET_NAMES` (a full `Record<Language, ...>`), after `pt`:

```ts
  fi: (n) => `Harjoitussarja ${n}`,
```

`trainingPartName()`, after the `pt` line, before the English fallback:

```ts
  if (lang === "fi") return `${p.set.name}, osa ${p.part}/${p.partCount}`;
```

## 3. `lib/examUi.ts` (EXAM_UI)

Add after the `pt` const:

```ts
const fi: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Tee kaikki ${total} vaihetta`;
    if (done === total) return "Olet valmis";
    if (done === total - 1) return "Yksi jäljellä";
    if (done === 1) return `Hyvä alku. 1/${total} tehty`;
    const frac = done / total;
    if (frac < 0.45) return `${done}/${total} tehty`;
    if (frac < 0.55) return "Puolivälissä";
    if (frac < 0.8) return "Yli puolivälin";
    return `${done}/${total}, melkein valmis`;
  },
  questionsCount: (n) => `${n} kysymystä`,
  needToPass: (pct) => `Läpäisyyn tarvitaan ${pct} %`,
  fullLengthExam: "🎯 Täysimittainen koe",
  testN: (n) => `🎯 Koe ${n}`,
  examTestN: (shortName, n) => `${shortName}, koe ${n}`,
  pctToPass: (pct) => `${pct} % läpäisyyn`,
  yourStats: "Omat tilastosi",
  yourStatsSub: "Jokainen näkemäsi kysymys, järjestettynä sen mukaan, mihin vastaat useimmin väärin",
  aboutThisTest: "Tietoa tästä harjoituskokeesta",
  trainingBadge: (shortName) => `HARJOITTELU ${shortName}`,
  masteredMyTraining: (shortName) => `${shortName}: HARJOITTELU HALLUSSA`,
  mastered: "HALLUSSA",
  nextPart: (name) => `Seuraavaksi: ${name}`,
  setN: (n) => `Sarja ${n}`,
  statsSeen: (seen, total, shortName) => `Olet nähnyt ${seen}/${total} kokeen ${shortName} kysymyksistä. Napauta riviä vastataksesi uudelleen.`,
  dateLocale: "fi-FI",
};
```

```ts
const EXAM_UI: Partial<Record<Language, ExamUi>> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, fi };
```

Also add `fi` to the header comment's list of machine-translated entries.

## 4. `components/exam/ExamLandingHero.tsx` (COPY), after `pt`

```ts
  fi: {
    start: "Aloita harjoittelu",
    dashboard: "Yleisnäkymään",
    mobile: "Harjoittele puhelimella",
    desktop: "Tee koe tietokoneella",
    mobileAlt: (name: string) => `Tigertest ${name}: harjoittelutila puhelimessa`,
    desktopAlt: (name: string) => `Tigertest ${name}: harjoituskoe tietokoneella`,
  },
```

## 5. `components/exam/ExamSampleQuestions.tsx` (SAMPLE_COPY), after `pt`

```ts
  fi: {
    title: (name) => `${name}: esimerkkikysymykset vastauksineen`,
    sub: (n, total) => `${n}/${total} harjoituskysymyksestä, yksi kustakin aiheesta, vastaus selitettynä.`,
    answer: "Vastaus",
    quiz: (name) => `${name}: esimerkkikysymykset`,
  },
```

## 6. `components/exam/ExamRelatedTests.tsx` (RELATED_COPY), after `pt`

```ts
  fi: {
    title: "Lisää harjoituskokeita",
    sub: "Kaikki Tigertestin kokeet ovat ilmaisia, eikä aloittamiseen tarvita tiliä.",
    country: (name) => `Ilmaiset harjoituskokeet: ${name}`,
    all: (n) => `Katso kaikki ${n} harjoituskoetta`,
  },
```

## 7. `components/exam/ExamTrainingPage.tsx` (celebrationCopy, indexed by `lang`, so required)

After the `pt:` line (line 300):

```ts
    fi: { title: "Tämä vaihe on nyt vihreä!", part: "Osa valmis", set: "Harjoittelu valmis", progress: "Katso edistymisesi", description: "Harjoittelu kannatti. Tämä vaihe on nyt vihreä yleisnäkymässäsi.", remaining: "Tämä osa on valmis. Jatka, niin saat sarjan loppuun.", resetPart: "Tämä nollaa edistymisesi vain tässä osassa. Oletko varma?" },
```

## 8. `components/results/ResultsHeroDebrief.tsx` (lines 66 and 67, indexed by `language`, so required)

Add to the end of each object:

```ts
progressLabel: ..., pt: "Ver o progresso", fi: "Katso edistymisesi" }[language];
completedLabel: ..., pt: "Teste de treino concluído", fi: "Harjoituskoe tehty" }[language];
```

## 9. `components/ReportExamQuestion.tsx` (COPY), after `pl`

```ts
  fi: {
    open: "Ilmoita tästä kysymyksestä", what: "Mikä on vialla?", note: "Mitä siinä pitäisi lukea? (valinnainen)", send: "Lähetä", sending: "Lähetetään...", cancel: "Peruuta",
    thanks: "Kiitos. Käymme jokaisen ilmoituksen läpi ja korjaamme kysymyksen, jos se on väärin.", error: "Lähetys epäonnistui. Yritä uudelleen.",
    reasons: { wrong_answer: "Merkitty vastaus on väärin", two_answers: "Useampi kuin yksi vastaus on oikein", unclear: "Kysymys on epäselvä", outdated: "Sääntö tai tieto on vanhentunut", typo: "Siinä on kirjoitusvirhe", other: "Jokin muu" },
  },
```

## 10. `lib/shareCards.ts` (CARD_FOOTERS), after `pt`

```ts
  fi: "Ilmaista harjoittelua. Jokainen vastaus selitetään.",
```

## 11. `lib/shuffleOptions.ts` (LANGUAGE_PATTERNS), after `pt`

```ts
  fi: { connectors: ["ja", "tai"], phrases: ["Kaikki edellä mainitut", "Kaikki yllä olevat", "Ei mikään edellä mainituista", "Ei mikään yllä olevista", "Kaikki vastaukset", "Kaikki vaihtoehdot"], both: ["Molemmat", "Molemmat ovat oikein", "Molemmat vastaukset", "Molemmat vaihtoehdot"] },
```

## 12. `.claude/skills/exam-bank/scripts/validate_translation.py` (LANGUAGE_PATTERNS, keep in step with 11)

```python
    "fi": (["ja", "tai"], ["Kaikki edellä mainitut", "Kaikki yllä olevat", "Ei mikään edellä mainituista", "Ei mikään yllä olevista", "Kaikki vastaukset", "Kaikki vaihtoehdot"], ["Molemmat", "Molemmat ovat oikein", "Molemmat vastaukset", "Molemmat vaihtoehdot"]),
```

## 13. `.claude/skills/exam-bank/scripts/validate_bank.py`

`LANG_RULES` (this also adds `fi` to the `--lang` choices):

```python
    "fi": (r"kaikki edellä mainitut|kaikki yllä olevat|ei mikään edellä mainituista|ei mikään yllä olevista|kaikki vastaukset|kaikki vaihtoehdot", ["ja", "tai"], ["molemmat"]),
```

`LEN_SCALE` (Finnish compounds and case endings make it run about a fifth longer than English):

```python
LEN_SCALE = {"de": 1.3, "nl": 1.25, "fr": 1.2, "pl": 1.2, "it": 1.15, "pt": 1.15, "es": 1.15, "tr": 1.1, "fi": 1.2}
```

Also add `fi 1.2` to the docstring list on line 13.

## 14. `lib/llmsTxt.ts` (LANGUAGE_NAMES)

```ts
  de: "German", fr: "French", it: "Italian", pl: "Polish", nl: "Dutch", pt: "Portuguese", fi: "Finnish",
```

## 15. `lib/homeLanguages.ts` (middleware reads it)

```ts
export const HOME_LANGUAGES = ["en", "de", "es", "pt", "fr", "it", "nl", "pl", "vi", "ko", "zh", "fi"] as const;
```

`app/home-lang/[region]/[lang]` needs nothing: it renders on demand and checks `isHomeLanguage()`.

## 16. `components/home/copy/index.ts`

```ts
import { fi, countryNames as fiNames } from "./fi";
```

```ts
export const TRANSLATED_COPY: Partial<Record<Language, HomeCopy>> = { es, pt, fr, it, nl, pl, vi, ko, zh, fi };
```

Add to `TRANSLATED_COUNTRY_NAMES`:

```ts
  fi: fiNames,
```

No `TRANSLATED_IN_NAMES` entry: the Finnish copy never inflects a country name.

## Optional, not required for the UI

- `lib/region.ts`: Finland stays `lang: "en", locale: "en-FI"` (its test, `fitheory`, is in English). Switch it to `lang: "fi", locale: "fi-FI"` only if the `/fi` homepage should default to Finnish; then `REGION_HREFLANG` changes too, and the FI `REGION_HOME` lines would need Finnish text.
- `lib/urlLanguage.ts`: add `{ prefix: "/fi", lang: "fi", includeRoot: false }` only once a Finnish-language landing exists under a separate prefix. Careful: `/fi` is already the Finland homepage (English), so this prefix would mislabel it; a Finnish landing would need another path.
- CLAUDE.md, "Native-language exams" paragraph: "The UI runs in twelve languages: `i18n/{de,fr,it,pl,nl,pt,fi}.ts`" (count rises again if sv and da land).
