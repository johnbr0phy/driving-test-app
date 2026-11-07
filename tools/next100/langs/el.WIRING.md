# Greek (el, el-GR) UI: wiring

New files (no edits elsewhere were made):

- `i18n/el.ts` (same shape and keys as `i18n/de.ts`, no category names, DMV-only blocks English)
- `components/home/copy/el.ts` (same shape as `components/home/copy/nl.ts`; exports `el` and `countryNames`. Greek puts a country name in the accusative with an article that depends on its gender and number ("στη Γερμανία", "στις ΗΠΑ"), so every sentence puts the country after a colon or in brackets, like the Dutch copy, and no `inNames` table is needed)
- `tools/next100/langs/el.json` (every per-language table value below, as data)

All copy is machine-translated, pending native review, register informal "εσύ". No em-dashes, no prices (the US FAQ names Premium as an optional one-time purchase without the figure). Where a line addresses the reader with an adjective that changes by gender, it uses the slash form "έτοιμος/η".

The blocks below are written against the files as they stand (last language `pt`). The Swedish, Danish, Finnish and Hungarian UIs (`sv`, `da`, `fi`, `hu` WIRING files here) are waiting to be wired the same way; if they land first, add `el` after them instead of after `pt`.

Adding `'el'` to the `Language` union makes TypeScript require it in every full `Record<Language, ...>` and in every inline `{...}[language]` map, so blocks 1, 2, 7 and 8 must land in the same commit.

## 1. `i18n/index.ts`

```ts
import { el } from './el';
```

```ts
export type Language = 'en' | 'es' | 'vi' | 'ko' | 'zh' | 'de' | 'fr' | 'it' | 'pl' | 'nl' | 'pt' | 'el';

const translations: Record<Language, TranslationKeys> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, el };
```

Append to `LANGUAGES` (after `pt`):

```ts
  { code: 'el', flag: '\u{1F1EC}\u{1F1F7}', label: 'Ελληνικά', englishName: 'Greek' },
```

```ts
export { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, el };
```

## 2. `lib/exams.ts`

`TEST_SET_NAMES` (a full `Record<Language, ...>`), after `pt`:

```ts
  el: (n) => `Σετ εξάσκησης ${n}`,
```

`trainingPartName()`, after the `pt` line, before the English fallback:

```ts
  if (lang === "el") return `${p.set.name}, μέρος ${p.part} από ${p.partCount}`;
```

## 3. `lib/examUi.ts` (EXAM_UI)

Add after the `pt` const:

```ts
const el: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Ολοκλήρωσε και τα ${total} βήματα`;
    if (done === total) return "Τα κατάφερες";
    if (done === total - 1) return "Μένει ένα";
    if (done === 1) return `Καλή αρχή. 1/${total} έτοιμο`;
    const frac = done / total;
    if (frac < 0.45) return `${done}/${total} έτοιμα`;
    if (frac < 0.55) return "Στα μισά του δρόμου";
    if (frac < 0.8) return "Πέρα από τη μέση";
    return `${done}/${total}, σχεδόν έτοιμο`;
  },
  questionsCount: (n) => `${n} ερωτήσεις`,
  needToPass: (pct) => `Χρειάζεσαι ${pct} % για να περάσεις`,
  fullLengthExam: "🎯 Πλήρης εξέταση",
  testN: (n) => `🎯 Τεστ ${n}`,
  examTestN: (shortName, n) => `${shortName}, τεστ ${n}`,
  pctToPass: (pct) => `${pct} % για επιτυχία`,
  yourStats: "Τα στατιστικά σου",
  yourStatsSub: "Κάθε ερώτηση που έχεις δει, ταξινομημένη με βάση αυτές που απαντάς πιο συχνά λάθος",
  aboutThisTest: "Σχετικά με αυτό το τεστ εξάσκησης",
  trainingBadge: (shortName) => `ΕΞΑΣΚΗΣΗ ${shortName}`,
  masteredMyTraining: (shortName) => `${shortName}: Η ΕΞΑΣΚΗΣΗ ΚΑΤΑΚΤΗΘΗΚΕ`,
  mastered: "ΚΑΤΑΚΤΗΘΗΚΕ",
  nextPart: (name) => `Επόμενο: ${name}`,
  setN: (n) => `Σετ ${n}`,
  statsSeen: (seen, total, shortName) => `Έχεις δει ${seen} από τις ${total} ερωτήσεις του ${shortName}. Πάτα μια γραμμή για να απαντήσεις ξανά.`,
  dateLocale: "el-GR",
};
```

```ts
const EXAM_UI: Partial<Record<Language, ExamUi>> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, el };
```

Also add `el` to the header comment's list of machine-translated entries.

## 4. `components/exam/ExamLandingHero.tsx` (COPY), after `pt`

```ts
  el: {
    start: "Ξεκίνα την εξάσκηση",
    dashboard: "Στον πίνακα",
    mobile: "Εξασκήσου στο κινητό",
    desktop: "Κάνε το τεστ στον υπολογιστή",
    mobileAlt: (name: string) => `Tigertest ${name}: εξάσκηση στο κινητό`,
    desktopAlt: (name: string) => `Tigertest ${name}: τεστ εξάσκησης στον υπολογιστή`,
  },
```

## 5. `components/exam/ExamSampleQuestions.tsx` (SAMPLE_COPY), after `pt`

```ts
  el: {
    title: (name) => `${name}: δείγμα ερωτήσεων με απαντήσεις`,
    sub: (n, total) => `${n} από τις ${total} ερωτήσεις εξάσκησης, μία από κάθε θέμα, με εξήγηση της απάντησης.`,
    answer: "Απάντηση",
    quiz: (name) => `${name}: δείγμα ερωτήσεων`,
  },
```

## 6. `components/exam/ExamRelatedTests.tsx` (RELATED_COPY), after `pt`

```ts
  el: {
    title: "Περισσότερα τεστ εξάσκησης",
    sub: "Όλα τα τεστ του Tigertest είναι δωρεάν και δεν χρειάζεσαι λογαριασμό για να ξεκινήσεις.",
    country: (name) => `Δωρεάν τεστ εξάσκησης: ${name}`,
    all: (n) => `Δες και τα ${n} τεστ εξάσκησης`,
  },
```

## 7. `components/exam/ExamTrainingPage.tsx` (celebrationCopy, indexed by `lang`, so required)

After the `pt:` line (about line 300):

```ts
    el: { title: "Αυτό το βήμα είναι τώρα πράσινο!", part: "Το μέρος ολοκληρώθηκε", set: "Η εξάσκηση ολοκληρώθηκε", progress: "Δες την πρόοδό σου", description: "Η εξάσκηση απέδωσε. Αυτό το βήμα είναι τώρα πράσινο στον πίνακά σου.", remaining: "Ολοκλήρωσες αυτό το μέρος. Συνέχισε για να τελειώσεις το σετ.", resetPart: "Έτσι θα μηδενιστεί η πρόοδός σου μόνο σε αυτό το μέρος. Σίγουρα;" },
```

## 8. `components/results/ResultsHeroDebrief.tsx` (lines 66 and 67, indexed by `language`, so required)

Add to the end of each object:

```ts
progressLabel: ..., pt: "Ver o progresso", el: "Δες την πρόοδό σου" }[language];
completedLabel: ..., pt: "Teste de treino concluído", el: "Το τεστ εξάσκησης ολοκληρώθηκε" }[language];
```

## 9. `components/ReportExamQuestion.tsx` (COPY), after `pl`

```ts
  el: {
    open: "Ανάφερε αυτή την ερώτηση", what: "Τι δεν πάει καλά;", note: "Τι θα έπρεπε να γράφει; (προαιρετικό)", send: "Αποστολή", sending: "Αποστολή...", cancel: "Ακύρωση",
    thanks: "Ευχαριστούμε. Ελέγχουμε κάθε αναφορά και διορθώνουμε την ερώτηση αν είναι λάθος.", error: "Η αποστολή απέτυχε. Δοκίμασε ξανά.",
    reasons: { wrong_answer: "Η σημειωμένη απάντηση είναι λάθος", two_answers: "Περισσότερες από μία απαντήσεις είναι σωστές", unclear: "Η ερώτηση δεν είναι σαφής", outdated: "Ο κανόνας ή η πληροφορία είναι παλιά", typo: "Έχει ορθογραφικό λάθος", other: "Κάτι άλλο" },
  },
```

## 10. `lib/shareCards.ts` (CARD_FOOTERS), after `pt`

```ts
  el: "Δωρεάν εξάσκηση. Κάθε απάντηση εξηγείται.",
```

Note: the OG and share cards render in Inter, which has Greek glyphs, so Greek cards need no fallback (unlike ko and zh).

## 11. `lib/shuffleOptions.ts` (LANGUAGE_PATTERNS), after `pt`

```ts
  el: { connectors: ["και", "ή"], phrases: ["Όλα τα παραπάνω", "Όλες οι παραπάνω", "Όλοι οι παραπάνω", "Κανένα από τα παραπάνω", "Καμία από τις παραπάνω", "Κανένας από τους παραπάνω", "Όλες οι απαντήσεις"], both: ["Και τα δύο", "Και οι δύο", "Αμφότερα", "Και οι δύο απαντήσεις"] },
```

Greek writes "A and B" as "Α και Β" (or "Και το Α και το Β"); with Latin option letters that is "A και B", which the connectors above catch.

## 12. `.claude/skills/exam-bank/scripts/validate_translation.py` (LANGUAGE_PATTERNS, keep in step with 11)

```python
    "el": (["και", "ή"], ["Όλα τα παραπάνω", "Όλες οι παραπάνω", "Όλοι οι παραπάνω", "Κανένα από τα παραπάνω", "Καμία από τις παραπάνω", "Κανένας από τους παραπάνω", "Όλες οι απαντήσεις"], ["Και τα δύο", "Και οι δύο", "Αμφότερα", "Και οι δύο απαντήσεις"]),
```

## 13. `.claude/skills/exam-bank/scripts/validate_bank.py`

`LANG_RULES` (this also adds `el` to the `--lang` choices):

```python
    "el": (r"όλα τα παραπάνω|όλες οι παραπάνω|όλοι οι παραπάνω|κανένα από τα παραπάνω|καμία από τις παραπάνω|κανένας από τους παραπάνω|όλες οι απαντήσεις", ["και", "ή"], ["και", "αμφότερα"]),
```

The "both" word is "και" because Greek opens a "both A and B" option with it ("και A και B"), which the option-reference regex then matches as `και A και B`.

`LEN_SCALE` (Greek runs about a fifth longer than English):

```python
LEN_SCALE = {"de": 1.3, "nl": 1.25, "fr": 1.2, "pl": 1.2, "it": 1.15, "pt": 1.15, "es": 1.15, "tr": 1.1, "el": 1.2}
```

Also add `el 1.2` to the docstring list on line 13.

## 14. `lib/llmsTxt.ts` (LANGUAGE_NAMES)

```ts
  de: "German", fr: "French", it: "Italian", pl: "Polish", nl: "Dutch", pt: "Portuguese", el: "Greek",
```

## 15. `lib/homeLanguages.ts` (middleware reads it)

```ts
export const HOME_LANGUAGES = ["en", "de", "es", "pt", "fr", "it", "nl", "pl", "vi", "ko", "zh", "el"] as const;
```

`app/home-lang/[region]/[lang]` needs nothing: it renders on demand and checks `isHomeLanguage()`.

## 16. `components/home/copy/index.ts`

```ts
import { el, countryNames as elNames } from "./el";
```

```ts
export const TRANSLATED_COPY: Partial<Record<Language, HomeCopy>> = { es, pt, fr, it, nl, pl, vi, ko, zh, el };
```

Add to `TRANSLATED_COUNTRY_NAMES`:

```ts
  el: elNames,
```

No `TRANSLATED_IN_NAMES` entry: the Greek copy never inflects a country name.

## Optional, not required for the UI

- `lib/region.ts`: Greece stays `lang: "en", locale: "en-GR"` (its test, `grdriving`, is in English). Switch it to `lang: "el", locale: "el-GR"` only if the `/gr` homepage should default to Greek; then `REGION_HREFLANG` changes too, and the GR `REGION_HOME` lines would need Greek text.
- `lib/urlLanguage.ts`: add `{ prefix: "/el", lang: "el", includeRoot: false }` only once a Greek-language landing exists under `/el/`. `/el` is not a country homepage, so the prefix is free (Greece's homepage is `/gr`).
- `lib/shuffleOptions.ts` and the validators use plain regex: Greek matching with `re.I` handles accented capitals (Ό/ό), but a bank written with the final-sigma or unaccented variants ("ΟΛΑ ΤΑ ΠΑΡΑΠΑΝΩ") would slip through; keep options in sentence case.
- CLAUDE.md, "Native-language exams" paragraph: "The UI runs in twelve languages: `i18n/{de,fr,it,pl,nl,pt,el}.ts`" (count rises again as sv, da, fi and hu land).
