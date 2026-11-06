# Danish (da, da-DK) UI wiring

New files (no wiring yet): `i18n/da.ts`, `components/home/copy/da.ts`, `tools/next100/langs/da.json`.
Machine-translated, pending native review. Register: "du". No prices in the copy (the US FAQ
mentions Premium as an optional one-time purchase without the figure).

Every block below goes next to the `pl` (or `nl`) entry in the named shared file.

## 1. i18n/index.ts
```ts
import { da } from './da';
export type Language = 'en' | 'es' | 'vi' | 'ko' | 'zh' | 'de' | 'fr' | 'it' | 'pl' | 'nl' | 'pt' | 'da';
const translations: Record<Language, TranslationKeys> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, da };
// LANGUAGES, after pt:
  { code: 'da', flag: '\u{1F1E9}\u{1F1F0}', label: 'Dansk', englishName: 'Danish' },
// final export line: add da
export { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, da };
```
Adding `'da'` to `Language` makes `TEST_SET_NAMES` (a full `Record<Language, ...>`) fail typecheck until step 3 lands. Land 1 and 3 together.

## 2. components/home/copy/index.ts
```ts
import { da, countryNames as daNames } from "./da";
export const TRANSLATED_COPY: Partial<Record<Language, HomeCopy>> = { es, pt, fr, it, nl, pl, vi, ko, zh, da };
// TRANSLATED_COUNTRY_NAMES:
  da: daNames,
```
No `TRANSLATED_IN_NAMES` entry: Danish needs no article before a country name.

## 3. lib/exams.ts
TEST_SET_NAMES:
```ts
  da: (n) => `Træningssæt ${n}`,
```
trainingPartName, before the English fallback:
```ts
  if (lang === "da") return `${p.set.name}, del ${p.part} af ${p.partCount}`;
```

## 4. lib/examUi.ts
```ts
const da: ExamUi = {
  heroTitle: (done, total) => {
    if (done === 0) return `Gør alle ${total} trin færdige`;
    if (done === total) return "Du er klar";
    if (done === total - 1) return "Ét tilbage";
    if (done === 1) return `Godt begyndt. 1 af ${total} færdig`;
    const frac = done / total;
    if (frac < 0.45) return `${done} af ${total} færdige`;
    if (frac < 0.55) return "Halvvejs";
    if (frac < 0.8) return "Mere end halvdelen";
    return `${done} af ${total}, næsten klar`;
  },
  questionsCount: (n) => `${n} spørgsmål`,
  needToPass: (pct) => `Du skal have ${pct}% for at bestå`,
  fullLengthExam: "🎯 Hel prøve",
  testN: (n) => `🎯 Prøve ${n}`,
  examTestN: (shortName, n) => `${shortName} prøve ${n}`,
  pctToPass: (pct) => `${pct}% for at bestå`,
  yourStats: "Din statistik",
  yourStatsSub: "Hvert spørgsmål, du har set, sorteret efter det, du oftest svarer forkert på",
  aboutThisTest: "Om denne øvelsesprøve",
  trainingBadge: (shortName) => `${shortName} TRÆNING`,
  masteredMyTraining: (shortName) => `${shortName} TRÆNING MESTRET`,
  mastered: "MESTRET",
  nextPart: (name) => `Næste: ${name}`,
  setN: (n) => `Sæt ${n}`,
  statsSeen: (seen, total, shortName) => `${seen} af ${total} ${shortName}-spørgsmål set. Tryk på en række for at svare igen.`,
  dateLocale: "da-DK",
};
// and add da to EXAM_UI:
const EXAM_UI: Partial<Record<Language, ExamUi>> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, da };
```

## 5. components/exam/ExamLandingHero.tsx (COPY)
```ts
  da: {
    start: "Begynd at øve",
    dashboard: "Til din oversigt",
    mobile: "Øv på din telefon",
    desktop: "Tag prøven på computeren",
    mobileAlt: (name: string) => `Tigertest ${name}: træning på telefonen`,
    desktopAlt: (name: string) => `Tigertest ${name}: øvelsesprøve på computeren`,
  },
```

## 6. components/exam/ExamSampleQuestions.tsx (SAMPLE_COPY)
```ts
  da: {
    title: (name) => `${name}: eksempler på spørgsmål med svar`,
    sub: (n, total) => `${n} af de ${total} øvelsesspørgsmål, ét fra hvert emne, med svaret forklaret.`,
    answer: "Svar",
    quiz: (name) => `${name}: eksempler på spørgsmål`,
  },
```

## 7. components/exam/ExamRelatedTests.tsx (RELATED_COPY)
```ts
  da: {
    title: "Andre øvelsesprøver",
    sub: "Alle prøver på Tigertest er gratis, og du skal ikke have en konto for at begynde.",
    country: (name) => `Gratis øvelsesprøver: ${name}`,
    all: (n) => `Se alle ${n} øvelsesprøver`,
  },
```

## 8. lib/shareCards.ts (CARD_FOOTERS)
```ts
  da: "Gratis øvelse. Hvert svar forklaret.",
```

## 9. lib/shuffleOptions.ts (LANGUAGE_PATTERNS)
```ts
  da: { connectors: ["og", "eller"], phrases: ["Alle ovenstående", "Ingen af ovenstående", "Alle svarene er rigtige", "Alle svar er rigtige", "Ingen af svarene"], both: ["Begge", "Begge dele", "Begge svar", "Begge svar er rigtige"] },
```

## 10. .claude/skills/exam-bank/scripts/validate_translation.py (LANGUAGE_PATTERNS)
```py
    "da": (["og", "eller"], ["Alle ovenstående", "Ingen af ovenstående", "Alle svarene er rigtige", "Alle svar er rigtige", "Ingen af svarene"], ["Begge", "Begge dele", "Begge svar", "Begge svar er rigtige"]),
```

## 11. .claude/skills/exam-bank/scripts/validate_bank.py
LANG_RULES:
```py
    "da": (r"alle ovenstående|ingen af ovenstående|alle svar(ene)? er rigtige|ingen af svarene", ["og", "eller"], ["begge"]),
```
LEN_SCALE: add `"da": 1.15` (Danish runs about as long as Spanish and Portuguese, shorter than German and Dutch).

## 12. components/ReportExamQuestion.tsx
```ts
  da: {
    open: "Rapportér dette spørgsmål", what: "Hvad er der galt?", note: "Hvad burde der stå? (valgfrit)", send: "Send", sending: "Sender...", cancel: "Annuller",
    thanks: "Tak. Vi ser på hver rapport og retter spørgsmålet, hvis det er forkert.", error: "Kunne ikke sende. Prøv igen.",
    reasons: { wrong_answer: "Det markerede svar er forkert", two_answers: "Mere end ét svar er rigtigt", unclear: "Spørgsmålet er uklart", outdated: "Reglen eller faktaen er forældet", typo: "Der er en tastefejl", other: "Noget andet" },
  },
```

## 13. components/exam/ExamTrainingPage.tsx (completion copy)
```ts
    da: { title: "Dette trin er nu grønt!", part: "Del færdig", set: "Træning færdig", progress: "Se dit fremskridt", description: "Din øvelse har betalt sig. Dette trin er nu grønt i din oversigt.", remaining: "Du har gjort denne del færdig. Fortsæt for at gøre resten af sættet færdigt.", resetPart: "Det nulstiller kun dit fremskridt i denne del. Er du sikker?" },
```

## 14. components/results/ResultsHeroDebrief.tsx
Add to the two inline maps (they are indexed by `language`, so they need `da` once `Language` has it):
```ts
progressLabel: da: "Se dit fremskridt"
completedLabel: da: "Øvelsesprøve klaret"
```

## 15. lib/llmsTxt.ts (LANGUAGE_NAMES)
```ts
  da: "Danish",
```

## 16. lib/homeLanguages.ts
```ts
export const HOME_LANGUAGES = ["en", "de", "es", "pt", "fr", "it", "nl", "pl", "vi", "ko", "zh", "da"] as const;
```

## Not done here (decide separately)
- `lib/region.ts`: Denmark (`DK`) currently has `lang: "en"`; switching it to `lang: "da", locale: "da-DK"` would make `/dk` render in Danish. The Danish exam (dkteori) is in English, so leave DK English until a Danish homepage is wanted (Belgium is the precedent for a non-English homepage over an English test).
- `components/FocusBar.tsx` COPY has no pl entry either; da falls back the same way.
- CLAUDE.md: the "UI runs in eleven languages" line becomes twelve once wired.
