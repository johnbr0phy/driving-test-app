# Wiring for `deheilpr` (German Heilpraktiker licensing exam, written part, in German, v1)

Native-language exam (base bank and copy German, `language: "de"`), built from the `detheorie`
template. Files already written by the builder:
- `data/de-heilpraktiker-questions.json` (200, validator PASS with `--lang de`)
- `lib/banks/deheilpr.ts`
- `app/heilpraktiker-pruefung/*` (layout, redirect, dashboard, drill, stats; copied from `app/fuehrerschein-theorie/`)
- `lib/landings/deheilpr.de.json` (German landing content, German `facts.source`)
- `app/de/heilpraktiker-pruefung-test/page.tsx` (three-line `TranslatedExamLanding`, lang `de`, `samples related`)
- `tools/next100/deheilpr/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/deheilpr/build.py`. Everything below goes in shared files.

Format note (two Bavarian Landratsamt Merkblätter, Stand 07/2025 and 09/2025, checked
2026-11-06): the written part for the general licence is 60 multiple-choice questions in
120 minutes; at least 45 correct (75 %) admits to the oral and practical part, chaired by an
Amtsarzt. Content: BMG Leitlinien of 7 December 2017. Tigertest models three real-length tests
of 60 (75 % = 45 of 60, the real line), 200 items, the last items of each pool (20) training-only.
Aussagenkombination items ("Nur 1, 2 und 4") are single answer; multi-select items are not
modelled. Training: 5 topic sets (22301-22305) + 3 tests = 8 dashboard steps.

## lib/exams.ts

Add `"deheilpr"` to the `ExamId` union. Icon `stethoscope` exists. 22301-22305 are free per the
brief's row (deaevo holds 22000s, check de34a and demotorrad's blocks).

```ts
const deheilpr: ExamConfig = {
  id: "deheilpr",
  stateCode: "DEHEILPR",
  idBase: 22300,
  slug: "/heilpraktiker-pruefung",
  landingPath: "/de/heilpraktiker-pruefung-test",
  name: "Heilpraktikerprüfung Test",
  shortName: "Heilpraktikerprüfung",
  examLabel: "Heilpraktikerüberprüfung, schriftlicher Teil",
  fullName: "Heilpraktikerüberprüfung nach dem Heilpraktikergesetz, schriftlicher Teil (allgemeine Erlaubnis)",
  questionIdPrefix: "DEHP-",
  icon: "stethoscope",
  testCount: 3,
  questionsPerTest: 60,
  passPct: 75,
  language: "de",
  locale: "de-DE",
  english: {
    name: "German Heilpraktiker Licensing Exam (written part)",
    shortName: "German Heilpraktiker exam",
    fullName: "German Heilpraktiker licensing exam (Heilpraktikerüberprüfung), written part for the general licence, in German",
  },
  review: { de: "model" },
  // Real exam (Merkblätter LRA München 07/2025 and LRA Fürstenfeldbruck 09/2025, checked
  // 2026-11-06): 60 multiple-choice questions in 120 minutes, at least 45 correct (75 %) to reach
  // the oral and practical part under an Amtsarzt; content per the BMG Leitlinien of 7 Dec 2017.
  // No official weights: the 7/7/5/7/5/7/6/6/4/6 split is Tigertest's, along the Leitlinien.
  // Three real-length tests of 60 (pools 200, the last items of each pool training-only).
  blueprint: {
    dehpRecht: 7,
    dehpInfekt: 7,
    dehpHygiene: 5,
    dehpHerz: 7,
    dehpAtmung: 5,
    dehpStoffwechsel: 7,
    dehpBlut: 6,
    dehpNerven: 6,
    dehpBewegung: 4,
    dehpNotfall: 6,
  },
  // Five topic sets, sets first then tests (like detheorie): 5 + 3 = 8 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 22301, name: "Recht und Infektionsschutz", categories: ["dehpRecht", "dehpInfekt"], size: 48, weightLabel: "14 von 60 Fragen je Probeprüfung" },
    { setNumber: 2, id: 22302, name: "Hygiene, Untersuchung und Notfälle", categories: ["dehpHygiene", "dehpNotfall"], size: 36, weightLabel: "11 von 60 Fragen je Probeprüfung" },
    { setNumber: 3, id: 22303, name: "Herz, Kreislauf und Atmung", categories: ["dehpHerz", "dehpAtmung"], size: 38, weightLabel: "12 von 60 Fragen je Probeprüfung" },
    { setNumber: 4, id: 22304, name: "Stoffwechsel, Blut und Niere", categories: ["dehpStoffwechsel", "dehpBlut"], size: 42, weightLabel: "13 von 60 Fragen je Probeprüfung" },
    { setNumber: 5, id: 22305, name: "Nerven, Psyche, Haut und Bewegung", categories: ["dehpNerven", "dehpBewegung"], size: 36, weightLabel: "10 von 60 Fragen je Probeprüfung" },
  ],
  categoryLabels: {
    dehpRecht: "Berufs- und Gesetzeskunde",
    dehpInfekt: "Infektionskrankheiten und Infektionsschutz",
    dehpHygiene: "Hygiene, Untersuchung und Injektion",
    dehpHerz: "Herz, Kreislauf und Gefäße",
    dehpAtmung: "Atmung, Hals, Nase und Ohren",
    dehpStoffwechsel: "Verdauung, Stoffwechsel und Hormone",
    dehpBlut: "Blut, Immunsystem, Niere und Labor",
    dehpNerven: "Nervensystem, Psyche und Sinnesorgane",
    dehpBewegung: "Bewegungsapparat, Haut, Frauen- und Kinderheilkunde",
    dehpNotfall: "Notfälle und Erste Hilfe",
  },
  copy: {
    guestPrompt: "um deinen Fortschritt für die Heilpraktikerprüfung zu speichern und jede falsche Antwort im Blick zu behalten",
    trainingHeading: "Übungssets",
    trainingSub: "Jedes Übungsset deckt Themen der Leitlinien ab. Du bekommst sofort Rückmeldung, und falsch beantwortete Fragen kommen wieder, bis du sie sicher kannst.",
    testsHeading: "Probeprüfungen · 60 Fragen, 45 zum Bestehen",
    heroSubs: [
      "Fünf Übungssets, drei Probeprüfungen. Recht und Infektionsschutz kommen in jeder Prüfung dran.",
      "Erst die Sets meistern, dann die Probeprüfung.",
      "Die Hälfte ist geschafft. Mach eine Probeprüfung mit 60 Fragen.",
      "Fehler wiederholen, dann noch einmal testen.",
      "Alles grün. Du bist bereit für den schriftlichen Teil.",
    ],
    sourceLine: "Nach Heilpraktikergesetz, Infektionsschutzgesetz und den BMG-Leitlinien von 2017, Stand November 2026. Eigene Fragen, nicht aus früheren Prüfungen; 60 pro Probeprüfung wie beim Gesundheitsamt.",
    analyticsKey: "deheilpr",
  },
};
```

Append `deheilpr` to the `EXAMS` array after `deaevo` / `de34a`. No `translations` (an English
version would be `translations.en`, LANGUAGES.md phase 2). Set names are German.

## lib/banks/all.ts

```ts
import "./deheilpr";
```

## types/index.ts

- `QuestionType`: add `| "DEHEILPR"`.
- `QuestionCategory`, under a `// German Heilpraktiker exam` comment:

```ts
  | "dehpRecht"
  | "dehpInfekt"
  | "dehpHygiene"
  | "dehpHerz"
  | "dehpAtmung"
  | "dehpStoffwechsel"
  | "dehpBlut"
  | "dehpNerven"
  | "dehpBewegung"
  | "dehpNotfall"
```

## i18n

If results and `/stats` prefer `exam.categoryLabels` (LANGUAGES.md 2.1 item 2), nothing is
needed. Otherwise add the German labels above to `i18n/de.ts`, and to `i18n/en.ts`:

```ts
    dehpRecht: "Law and Professional Rules",
    dehpInfekt: "Infectious Diseases and Infection Control",
    dehpHygiene: "Hygiene, Examination and Injections",
    dehpHerz: "Heart, Circulation and Vessels",
    dehpAtmung: "Respiratory System and ENT",
    dehpStoffwechsel: "Digestion, Metabolism and Hormones",
    dehpBlut: "Blood, Immune System, Kidneys and Lab",
    dehpNerven: "Nervous System, Mental Health and Senses",
    dehpBewegung: "Musculoskeletal, Skin, Gynaecology and Paediatrics",
    dehpNotfall: "Emergencies and First Aid",
```

## lib/shuffleOptions.ts

Nothing. Aussagenkombination options name their statements ("Nur 1, 2 und 4"), so shuffling is
safe; no option starts with "Beide" or uses "Alle Antworten" (the build asserts it).

## app/globals.css

Suggested `160 35% 24%` clashes (hscmaths 168 38 30, ieqfa 165 40 20, uptet 156 30 31), and every
other teal-green near 160 either clashes or fails white-text contrast. Checked against every light
`[data-theme]` block with the 8-degree / 15-saturation / 8-lightness rule: `142 25% 30%` (muted
sage green, white text about 7.2:1) is clear; fallback `144 20% 38%`. Then run
`tools/gen_dark_brand_css.py`.

```css
  /* German Heilpraktiker exam theme */
  [data-theme="deheilpr"] {
    --brand: 142 25% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 142 30% 96%;
    --brand-hover: 142 25% 25%;
    --brand-dark: 142 25% 22%;
    --brand-darker: 142 25% 16%;
    --brand-muted: 142 15% 62%;
    --brand-border: 142 18% 78%;
    --brand-border-light: 142 20% 88%;
    --brand-gradient-to: 142 35% 92%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `deheilpr: "Three 60-question mock exams in German for the written part of the German Heilpraktiker licensing exam: law and the Infection Protection Act, hygiene, emergencies and the recognition of disease across all organ systems, written from the HeilprG, IfSG and the 2017 federal guidelines as of November 2026.",`
- `EXAM_ORG`: `deheilpr: "Local health offices (Gesundheitsamt) · Heilpraktikerüberprüfung, in German",`
- Hub group: the Germany group for non-driving tests, after the group holding `detheorie`
  (shared with the siblings; drop ids not wired):
  `{ title: "Germany professional and licensing exams", ids: ["deaevo", "de34a", "deheilpr"] },`
  Until it has three members, `RELATED_OVERRIDES`: `deheilpr: ["deaevo", "de34a", "gulfrn"],`.
- `SEARCH_ALIASES` (native and English):
  `deheilpr: "heilpraktiker heilpraktikerprüfung heilpraktikerpruefung heilpraktikerüberprüfung heilpraktikerueberpruefung heilpraktiker prüfung heilpraktiker pruefung heilpraktikerschein amtsarztprüfung amtsarzt prüfung hp prüfung hpp heilpraktiker prüfungsfragen gesundheitsamt infektionsschutzgesetz ifsg heilprg naturheilkunde ausbildung heilpraktikerschule deutschland german heilpraktiker exam heilpraktiker licensing exam german naturopath exam germany naturopathic practitioner exam alternative practitioner exam germany",`
- Native name on the German homepage, `english.name` elsewhere (LANGUAGES.md 1.6).

## lib/region.ts

```ts
  deheilpr: "DE",
```

in `TEST_REGIONS`. Not a driving test: add `"deheilpr"` to `NON_DRIVING_TESTS`.

## lib/landingContent.ts

```ts
import deheilprDe from "@/lib/landings/deheilpr.de.json";
  "deheilpr.de": deheilprDe as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  deheilpr: {
    answer:
      "In Germany anyone who wants to practise medicine without a doctor's licence (Approbation) needs a permit under the Heilpraktikergesetz. Before it is granted, the local health office checks in a knowledge test (Heilpraktikerüberprüfung) whether the candidate would be a danger to public health or to patients. The written part has 60 multiple-choice questions in 120 minutes; at least 45 correct answers (75 percent) admit the candidate to the oral and practical part, chaired by a public health doctor (Amtsarzt) with assessors, which decides the result. The content follows the federal health ministry's guidelines of 7 December 2017: law (Heilpraktikergesetz, Infection Protection Act, patients' rights, advertising law), hygiene, emergencies, medical terminology, anatomy, physiology and pathology, and recognising physical and mental illness in all age groups. Dates and deadlines are set by the states and authorities; in Bavaria the written part is held on fixed days in March and October. A licence limited to psychotherapy has its own shorter written test.",
    rows: [
      { label: "Run by", value: "Local health office (Gesundheitsamt) or district authority" },
      { label: "Written part", value: "60 multiple-choice questions, 120 minutes" },
      { label: "Pass mark", value: "At least 45 correct (75 percent)" },
      { label: "Then", value: "Oral and practical part chaired by an Amtsarzt" },
      { label: "Content", value: "Federal guidelines of 7 December 2017" },
      { label: "Language", value: "German" },
      { label: "Tigertest mock tests", value: "3 x 60 questions in German, 45 to pass" },
    ],
    basedOn: "Heilpraktikergesetz and its implementing regulation, the BMG guidelines of 7 December 2017 and the guidance sheets of the Landratsamt München (July 2025) and Fürstenfeldbruck (September 2025), checked November 2026",
    source: { name: "Landratsamt München: guidance sheet on the Heilpraktiker knowledge test (PDF, German)", url: "https://www.landkreis-erding.de/media/23374/merkblatt-heilpraktiker-stand-juli-2023.pdf" },
  },
```

"Language: German" is from the Merkblätter's German-only procedure; neither sheet mentions
another language, so the row could be dropped if the integrator prefers only stated facts.

## lib/llmsTxt.ts

Uses `english.name` with "(in German)" per LANGUAGES.md 3.5; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## lib/tigerAssets.ts

Add to `BORROWED_SETS`: `deheilpr: "nclex",` (the clinical tiger, as gulfrn, kenck, nzsfe).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Teacher-led (Heilpraktikerschulen run one- to three-year prep courses):
- `TEACHER_LED`: add `"deheilpr"`.
- `TEACHES`: `deheilpr: "a Heilpraktiker exam preparation course",`

`TranslatedExamLanding` does not render `ExamClassFaq`, so the class FAQ shows only once the
platform adds it to native landings.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the native `landingPath` under `/de` is emitted once, hreflang
`de-DE`, x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 36 to 48 (all at most 60),
so no parts.

## Screenshots

`TranslatedExamLanding` reads `/landing/deheilpr-{mobile,desktop}-de.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing deheilpr:heilpraktiker-pruefung:22301`
then rename the two files to the `-de` names (as for detheorie).

## CLAUDE.md (after the `deaevo` / `de34a` bullets)

```md
- **Heilpraktikerprüfung** (`deheilpr`, the written part of the German Heilpraktiker licensing exam, Heilpraktikerüberprüfung for the general licence under the Heilpraktikergesetz, base language German, `language: "de"`, `locale: "de-DE"`, `review: { de: "model" }`, `/heilpraktiker-pruefung/*`, landing `/de/heilpraktiker-pruefung-test` from `lib/landings/deheilpr.de.json`): `data/de-heilpraktiker-questions.json` (200 original questions written in German on the BMG Leitlinien of 7 December 2017: Berufs- und Gesetzeskunde 24 (HeilprG, Arztvorbehalte, AMG § 48, BtMG § 13, BGB §§ 630a ff., StGB § 203 and StPO § 53 not covering Heilpraktiker, HWG), Infektionskrankheiten und Infektionsschutz 24 (IfSG §§ 6, 7, 8, 9, 24, 34, 42), Hygiene, Untersuchung und Injektion 16, Herz und Kreislauf 22, Atmung und HNO 16, Verdauung, Stoffwechsel und Hormone 22, Blut, Immunsystem, Niere und Labor 20, Nervensystem, Psyche und Sinnesorgane 20, Bewegungsapparat, Haut, Frauen- und Kinderheilkunde 16, Notfälle und Erste Hilfe 20 (ERC 2025)), three real-length tests of 60 (IDs 22301-22303, 7/7/5/7/5/7/6/6/4/6 per test, Tigertest's split; the last items of each pool, 20 in all, training-only) and five German-named topic sets 22301-22305, 8 dashboard steps, state `DEHEILPR`, prefix `DEHP-`, 75% pass (45 of 60, the real line: 60 multiple-choice questions in 120 minutes, then an oral and practical part under an Amtsarzt; Merkblätter LRA München 07/2025 and Fürstenfeldbruck 09/2025). Aussagenkombination items are single answer ("Nur 1, 2 und 4"); the oral part and the psychotherapy-only licence (28 questions) are not modelled. Conventional medicine, legal limits and referral only; no claims for or against any therapy; no fees or dates outside Bavaria. Built by `tools/next100/deheilpr/build.py`; sources in `tools/next100/deheilpr/sources.md`, terms in `glossary.md`. Region DE, hub group "Germany professional and licensing exams", `[data-theme="deheilpr"]` muted sage green (142 25% 30%), borrows the NCLEX tiger, teacher-led (Heilpraktikerschulen).
```

## Decisions for the integrator

1. **Hue.** Suggested 160 35% 24% clashes; `142 25% 30%` proposed (see globals.css).
2. **Length.** Three real-length tests (60, 120 minutes, 45 to pass); 8 dashboard steps.
3. **Copy care.** Landing and bank make no health claims; they cover what the Gesundheitsamt
   checks (law, limits, recognising disease and emergencies, referral). The landing says
   Tigertest does not assess individual therapies.
4. **Unconfirmed:** no national candidate count or pass rate; fees vary by authority and are not
   stated; dates are given for Bavaria only. § 24 IfSG wording checked via search excerpts
   (gesetze-im-internet.de returned 503).
5. **Register.** Questions "Sie"/impersonal, landing and dashboard copy "du", as `detheorie`.

## Review (2026-11-06)

Reviewer pass per `tools/next100/REVIEW.md`. Merkblätter LRA München (Stand Juli 2025, file name
says 2023 but the PDF reads "Stand: Juli 2025") and LRA Fürstenfeldbruck (Stand 09/2025) re-read:
60 questions, 120 minutes, 45 (75 %) to the oral part; psychotherapy 28 questions, 21 to pass,
60 (München) or 55 (FFB) minutes; Bavarian dates third Wednesday in March and second Wednesday
in October. Landing, FAQ, examFacts and sources.md agree. Items changed (7):
- DEHP-REC-017 duplicate: was § 323c StGB (unterlassene Hilfeleistung), same fact and answer as
  DE34A-STR-031 and close to DETH-VER-022; now § 43 AMG (Apothekenpflicht: apply, never sell).
- DEHP-REC-011, DEHP-STW-012 weak: sorted number options rewritten so the key sits at an end.
- DEHP-STW-007 grammar ("Worauf weist das ... hin?"), DEHP-INF-002 ("verbietet das"),
  DEHP-HYG-009 option parallelism, DEHP-NOT-015 explanation (children: only small areas, briefly).
Validator: PASS (`--lang de`, all ten pools).
