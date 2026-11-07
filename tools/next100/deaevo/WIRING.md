# Wiring for `deaevo` (German trainer aptitude exam, Ausbildereignungsprüfung nach AEVO, written in German, v1)

Germany's first workplace exam and the second native-language exam (template `detheorie`). The
base bank and base copy are German (`language: "de"`). Files already written by the builder:
- `data/de-aevo-questions.json` (200, `validate_bank.py --lang de` PASS, key-longest 12 %)
- `lib/banks/deaevo.ts`
- `app/ausbildereignung/*` (layout, redirect, dashboard, drill, stats; copied from `app/fuehrerschein-theorie/`)
- `lib/landings/deaevo.de.json` (German landing content, German `facts.source`)
- `app/de/aevo-pruefung-test/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `de`, `samples` and `related`)
- `tools/next100/deaevo/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/deaevo/build.py`. Everything below goes in shared files.

Format note (AEVO § 4, checked 2026-11-06 at gesetze-im-internet.de, plus IHK Darmstadt 12/2024,
IHK Bonn 11/2025, IHK Gießen-Friedberg and the IHK tablet Handreichung 09/2025): written part of
case-based tasks from all four Handlungsfelder, "soll drei Stunden dauern"; at the IHKs about 80
programmed multiple-choice tasks in several Ausgangssituationen, the number of correct answers
stated, all-or-nothing scoring, 100 points, 50 = ausreichend; increasingly on tablet or notebook.
Practical part: presentation (at most 15 minutes) or practical demonstration of a training
situation plus Fachgespräch, together at most 30 minutes (agriculture and home economics up to
60). Passed when each part is at least ausreichend; two repeats. Tigertest models only the written
part: four 50-question tests (half the real 80 at a similar pace) weighted like the BIBB Rahmenplan
2023 (HF 1 15 %, HF 2 20 %, HF 3 50 %, HF 4 15 %): per test 8/10/24/8. Single best answer of four,
equal weight. `passPct: 70` (35 of 50) is Tigertest's target, because the real 50 points are
earned only on fully correct multi-answer tasks; the landing says so. Training is by
Handlungsfeld: 5 Übungssets (26401-26405, each at most 60) + 4 Testbögen = 9 dashboard steps.

## lib/exams.ts

Add `"deaevo"` to the `ExamId` union. Icon `graduation` already exists. 26401-26405 are free
(highest existing idBase is 21900, aswbclin). Set ids 26401-26404 share numbers with test ids
like `detheorie` and other topic-set exams.

```ts
const deaevo: ExamConfig = {
  id: "deaevo",
  stateCode: "DEAEVO",
  idBase: 26400,
  slug: "/ausbildereignung",
  landingPath: "/de/aevo-pruefung-test",
  name: "AEVO Prüfung Test",
  shortName: "AEVO Prüfung",
  examLabel: "Ausbildereignungsprüfung (AEVO)",
  fullName: "Ausbildereignungsprüfung nach der Ausbilder-Eignungsverordnung (AEVO), schriftlicher Teil",
  questionIdPrefix: "DEAEVO-",
  icon: "graduation",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  language: "de",
  locale: "de-DE",
  english: {
    name: "German Trainer Aptitude Exam (AEVO)",
    shortName: "German AEVO trainer exam",
    fullName: "German trainer aptitude exam (Ausbildereignungsprüfung, AEVO), written part, in German",
  },
  review: { de: "model" },
  // Real exam (AEVO § 4, checked 2026-11-06; IHK Darmstadt 12/2024, IHK Bonn 11/2025, IHK
  // Gießen-Friedberg, IHK tablet Handreichung 09/2025): written part of case-based tasks from all
  // four Handlungsfelder, 3 hours; at the IHKs about 80 programmed tasks, number of correct
  // answers stated, all-or-nothing, 100 points, 50 = ausreichend; practical part (presentation
  // or demonstration up to 15 minutes plus Fachgespräch, together up to 30) not modelled.
  // Categories follow AEVO § 3 and the BIBB Rahmenplan 2023 (HA 135, BAnz AT 14.07.2023 S2),
  // whose course-time split 15/20/50/15 % sets the per-test weights 8/10/24/8. The split inside
  // each Handlungsfeld is Tigertest's own. Four tests of 50, pools exactly 4x (200, all original,
  // written in German). Single best answer of four, so passPct 70 (35 of 50) is Tigertest's target.
  blueprint: {
    aevoNutzen: 4,
    aevoRahmen: 4,
    aevoPlan: 3,
    aevoVertrag: 4,
    aevoRechte: 3,
    aevoLernen: 7,
    aevoMethoden: 6,
    aevoBegleitung: 6,
    aevoBeurteilung: 5,
    aevoAbschluss: 8,
  },
  // Five sets by Handlungsfeld (HF 3 split in two to stay at most 60), not testSets():
  // 5 + 4 tests = 9 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 26401, name: "Handlungsfeld 1: Voraussetzungen prüfen, Ausbildung planen", categories: ["aevoNutzen", "aevoRahmen"], size: 32, weightLabel: "8 von 50 Fragen je Testbogen" },
    { setNumber: 2, id: 26402, name: "Handlungsfeld 2: Ausbildung vorbereiten, Azubis einstellen", categories: ["aevoPlan", "aevoVertrag", "aevoRechte"], size: 40, weightLabel: "10 von 50 Fragen je Testbogen" },
    { setNumber: 3, id: 26403, name: "Handlungsfeld 3: Lernen und Methoden", categories: ["aevoLernen", "aevoMethoden"], size: 52, weightLabel: "13 von 50 Fragen je Testbogen" },
    { setNumber: 4, id: 26404, name: "Handlungsfeld 3: Begleiten und Beurteilen", categories: ["aevoBegleitung", "aevoBeurteilung"], size: 44, weightLabel: "11 von 50 Fragen je Testbogen" },
    { setNumber: 5, id: 26405, name: "Handlungsfeld 4: Ausbildung abschließen", categories: ["aevoAbschluss"], size: 32, weightLabel: "8 von 50 Fragen je Testbogen" },
  ],
  categoryLabels: {
    aevoNutzen: "Nutzen der Ausbildung und duales System",
    aevoRahmen: "Rechtsrahmen, Eignung und zuständige Stellen",
    aevoPlan: "Ausbildungsplan, Mitbestimmung und Kooperation",
    aevoVertrag: "Auswahl und Ausbildungsvertrag",
    aevoRechte: "Rechte, Freistellung und Jugendarbeitsschutz",
    aevoLernen: "Lernen, Motivation und Lernziele",
    aevoMethoden: "Ausbildungsmethoden und Medien",
    aevoBegleitung: "Probezeit, Lernbegleitung und Konflikte",
    aevoBeurteilung: "Leistungen beurteilen",
    aevoAbschluss: "Prüfung, Zeugnis und Perspektiven",
  },
  copy: {
    guestPrompt: "um deinen Fortschritt für die AEVO-Prüfung zu speichern und jede falsche Antwort im Blick zu behalten",
    trainingHeading: "Übungssets",
    trainingSub: "Jedes Übungsset deckt ein Handlungsfeld der AEVO ab. Du bekommst sofort Rückmeldung, und falsch beantwortete Fragen kommen wieder, bis du sie sicher kannst.",
    testsHeading: "Testbögen · 50 Fragen, 35 zum Bestehen",
    heroSubs: [
      "Fünf Übungssets, vier Testbögen. Handlungsfeld 3, Ausbildung durchführen, ist die Hälfte der Prüfung.",
      "Erst das Set meistern, dann den Testbogen.",
      "Die Hälfte ist geschafft. Mach einen Testbogen.",
      "Fehler wiederholen, dann noch einmal testen.",
      "Alles grün. Melde dich bei deiner Kammer zur Prüfung an.",
    ],
    sourceLine: "Nach AEVO, Rahmenplan 2023, BBiG, JArbSchG und BetrVG, Stand November 2026. Eigene Fragen mit je einer richtigen Antwort; der praktische Teil wird nicht nachgebildet.",
    analyticsKey: "deaevo",
  },
};
```

Append `deaevo` to the `EXAMS` array after `detheorie`. No `translations` (an English version
would be `translations.en`, LANGUAGES.md phase 2). Set names are German topic names, so
`TEST_SET_NAMES.de` is not used. `ExamDashboard` shows topic sets first, then the tests.

## lib/banks/all.ts

```ts
import "./deaevo";
```

## types/index.ts

- `QuestionType`: add `| "DEAEVO"`.
- `QuestionCategory`, under a `// German trainer aptitude exam (AEVO)` comment:

```ts
  | "aevoNutzen"
  | "aevoRahmen"
  | "aevoPlan"
  | "aevoVertrag"
  | "aevoRechte"
  | "aevoLernen"
  | "aevoMethoden"
  | "aevoBegleitung"
  | "aevoBeurteilung"
  | "aevoAbschluss"
```

(`grep -n "aevo" types/index.ts` was empty on 2026-11-06.)

## i18n

Results and stats read `exam.categoryLabels` first (LANGUAGES.md 2.1), so `i18n/de.ts` needs
nothing. Add to `i18n/en.ts`, `es.ts`, `ko.ts`, `vi.ts`, `zh.ts` (English labels everywhere):

```ts
    aevoNutzen: "Benefits of Training & the Dual System",
    aevoRahmen: "Legal Framework & Suitability",
    aevoPlan: "Training Plan & Cooperation",
    aevoVertrag: "Selection & Training Contract",
    aevoRechte: "Apprentice Rights & Youth Protection",
    aevoLernen: "Learning, Motivation & Objectives",
    aevoMethoden: "Training Methods & Media",
    aevoBegleitung: "Probation, Support & Conflicts",
    aevoBeurteilung: "Assessing Performance",
    aevoAbschluss: "Final Exam, Reference & Career Paths",
```

## lib/shuffleOptions.ts

No position-dependent options ("A und B", "Beide", "Alle Antworten"); `build.py` asserts it.
The four-step order item (`DEAEVO-MET-001`) lists sequences as whole options, so shuffling is safe.

## app/globals.css

Suggested `28 45% 34%` clashes (notary 35 45 36, cacarp 24 50 30, nhie 30 35 28). Checked
against every light `[data-theme]` block with the 8-degree / 15-saturation / 8-lightness rule:
`28 20% 28%` (warm dark umber, white text 9.0:1) is clear; fallback `28 10% 34%` (7.2:1).
Then run `tools/gen_dark_brand_css.py`.

```css
  /* German trainer aptitude exam (AEVO) theme */
  [data-theme="deaevo"] {
    --brand: 28 20% 28%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 28 30% 96%;
    --brand-hover: 28 20% 23%;
    --brand-dark: 28 20% 20%;
    --brand-darker: 28 20% 14%;
    --brand-muted: 28 15% 62%;
    --brand-border: 28 18% 78%;
    --brand-border-light: 28 18% 88%;
    --brand-gradient-to: 28 45% 93%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `deaevo: "Four 50-question tests in German for the written part of the German trainer aptitude exam (Ausbildereignungsprüfung, AEVO): all four fields of action, from planning and hiring to teaching methods, assessment and the final exam, written from the AEVO, BBiG, JArbSchG and the 2023 Rahmenplan as of November 2026.",`
- `EXAM_ORG`: `deaevo: "IHK and Handwerkskammer · Ausbildereignungsprüfung (AEVO), in German",`
- Hub group: a new Germany group for its non-driving tests, after the group holding `detheorie`
  ("EU driving theory tests", or a "Germany driving tests" group if one is created for
  `detheorie` and `demotorrad`):
  `{ title: "Germany professional and licensing exams", ids: ["deaevo", "de34a", "deheilpr"] },`
  (drop the ids of siblings that are not wired). Until it has three members, add
  `RELATED_OVERRIDES`: `deaevo: ["de34a", "deheilpr", "detheorie"],`.
- `SEARCH_ALIASES` (native and English):
  `deaevo: "aevo aevo prüfung aevo pruefung ausbildereignung ausbildereignungsprüfung ausbildereignungspruefung ausbilderschein ausbilder schein ada ada schein ausbildung der ausbilder ausbildereignungsverordnung ihk prüfung ausbilder handwerkskammer handlungsfelder bbig jarbschg azubi ausbilden deutschland german trainer exam german trainer aptitude exam germany apprenticeship trainer certificate aevo exam aevo test ada certificate",`
- Native name on the German homepage, `english.name` elsewhere (LANGUAGES.md 1.6).

## lib/region.ts

```ts
  deaevo: "DE",
```

in `TEST_REGIONS`. Not a driving test: add `"deaevo"` to `NON_DRIVING_TESTS`. `REGION_HOME.DE`
needs no change; if the `/de` homepage lists local tests by group, the new Germany group shows
there.

## lib/landingContent.ts

```ts
import deaevoDe from "@/lib/landings/deaevo.de.json";
  "deaevo.de": deaevoDe as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  deaevo: {
    answer:
      "The German trainer aptitude exam (Ausbildereignungsprüfung) under the Ausbilder-Eignungsverordnung (AEVO) proves that someone may train apprentices in Germany's dual system. It has a written and a practical part, and each must be graded at least 'ausreichend' (sufficient). The written part covers case-based tasks from all four fields of action (check requirements and plan training, prepare training and hire apprentices, carry out training, complete training) and is meant to last three hours. At the chambers of commerce (IHKs) it is about 80 programmed multiple-choice tasks built around several case situations; each task states how many answers are correct and scores only if all of them are marked, and 50 of 100 points pass. Many IHKs now run it on a tablet or notebook. In the practical part the candidate presents a training situation (at most 15 minutes) or carries it out, followed by a technical discussion, at most 30 minutes in all. A failed exam can be repeated twice. The exam is in German and is taken at the competent chamber, usually the IHK or the Handwerkskammer; a master craftsman's exam already includes it.",
    rows: [
      { label: "Run by", value: "Competent chamber, usually IHK or Handwerkskammer" },
      { label: "Parts", value: "Written and practical, each at least 'ausreichend'" },
      { label: "Written part", value: "Case-based tasks from all four fields of action, 3 hours" },
      { label: "Tasks at the IHKs", value: "About 80, multiple answers possible, all or nothing" },
      { label: "Pass mark (written)", value: "50 of 100 points" },
      { label: "Practical part", value: "Presentation or demonstration (up to 15 min) plus discussion, up to 30 min" },
      { label: "Retakes", value: "Two" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in German, 35 to pass" },
    ],
    basedOn: "Ausbilder-Eignungsverordnung § 4, the BIBB Rahmenplan of July 2023 and the exam guidance of several IHKs (Darmstadt, Bonn/Rhein-Sieg, Gießen-Friedberg), checked November 2026",
    source: { name: "Ausbilder-Eignungsverordnung (AEVO), gesetze-im-internet.de", url: "https://www.gesetze-im-internet.de/ausbeignv_2009/" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in German)" per LANGUAGES.md 3.5; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## lib/tigerAssets.ts

Add to `BORROWED_SETS`: `deaevo: "praxisplt",` (the teaching tiger; CAPM is the alternative).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Teacher-led (AdA courses at IHK Bildungszentren, Handwerkskammern and private providers):
- `TEACHER_LED`: add `"deaevo"`.
- `TEACHES`: `deaevo: "an AEVO trainer course (Ausbildung der Ausbilder)",`

`TranslatedExamLanding` does not render `ExamClassFaq`, so the class FAQ shows only once the
platform adds it to native landings (the English `TEACHES` sentence would also need a German one).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the native `landingPath` under `/de` is emitted once, hreflang
`de-DE`, x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 32 to 52 (all at most 60),
so no parts. Then `python3 -I tools/build_exam_sources.py` (sources.md lists the AEVO, Rahmenplan
and BBiG first) and `npx tsx scripts/build-landing-dates.ts`.

## lib/examFreshness.json

Nothing dated is known. Note for the yearly review: the 2023 Rahmenplan has been exam-relevant
since July 2024; watch the DIHK for a new Aufgabenpool and the BBiG for amendments.

## Screenshots

`TranslatedExamLanding` reads `/landing/deaevo-{mobile,desktop}-de.png` (plus `-dark` twins):
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing deaevo:ausbildereignung:26401`
then rename to the `-de` names, as for `detheorie`.

## CLAUDE.md (after the `detheorie` bullet)

```md
- **AEVO Prüfung** (`deaevo`, German trainer aptitude exam, Ausbildereignungsprüfung under the Ausbilder-Eignungsverordnung, written part only, Germany's first workplace exam, base language German, `language: "de"`, `locale: "de-DE"`, `review: { de: "model" }`, `/ausbildereignung/*`, landing `/de/aevo-pruefung-test` from `lib/landings/deaevo.de.json`): `data/de-aevo-questions.json` (200 original questions written in German, in "Sie", on the four Handlungsfelder of AEVO § 3 and the BIBB Rahmenplan 2023 (HA 135, course time 15/20/50/15 %): HF 1 Nutzen und duales System 16, Rechtsrahmen und Eignung 16; HF 2 Ausbildungsplan und Kooperation 12, Auswahl und Vertrag 16, Rechte und Jugendarbeitsschutz 12; HF 3 Lernen und Lernziele 28, Methoden und Medien 24, Probezeit, Lernbegleitung und Konflikte 24, Leistungen beurteilen 20; HF 4 Prüfung, Zeugnis und Perspektiven 32), four 50-question tests (IDs 26401-26404, 4/4/3/4/3/7/6/6/5/8 per test, HF 8/10/24/8, no spares) and five German-named sets by Handlungsfeld 26401-26405 (HF 3 in two), 9 dashboard steps, state `DEAEVO`, prefix `DEAEVO-`, 70% pass (35 of 50, Tigertest's target: the real written part, case-based tasks in 3 hours, about 80 programmed tasks at the IHKs with all-or-nothing scoring, passes at 50 of 100 points; AEVO § 4 and IHK guidance). The practical part (presentation or demonstration up to 15 minutes plus Fachgespräch, up to 30) and multi-answer, matching, ordering and number tasks are not modelled. Law as in force November 2026: BBiG Neufassung of 16 April 2025 (Textform contract, digital mobile training, § 15 release also for adults), JArbSchG, BetrVG (JAV, § 78a, § 98), BUrlG, AGG; no Mindestvergütung amounts, fees or chamber dates. Kept clear of `de34a`'s communication items (Schulz von Thun, Ich-Botschaft, aktives Zuhören). Built by `tools/next100/deaevo/build.py`; sources in `tools/next100/deaevo/sources.md`, terms in `glossary.md`. Region DE, hub group "Germany professional and licensing exams", `[data-theme="deaevo"]` warm dark umber (28 20% 28%), borrows the Praxis PLT tiger, teacher-led (AdA courses).
```

## Decisions for the integrator

1. **Pass mark.** 70 (35 of 50) as Tigertest's target. The real written line is 50 of 100 points,
   but each real task counts only if every correct option is marked; 50 % of single-answer items
   would overstate readiness. If 50 is preferred (like ACCA FA), change `passPct`, the
   `testsHeading`, the landing's "35 von 50" and "über 70 Prozent", and the examFacts last row.
2. **Length.** 50 per test, not the real 80: 200 items fill four tests at the Rahmenplan weights.
3. **Hue.** Suggested 28 45% 34% clashes; `28 20% 28%` proposed (see globals.css).
4. **Hub group** name and membership depend on which German siblings are wired.
5. **Register.** Questions "Sie", landing and dashboard copy "du", as `detheorie`.
6. **Unconfirmed:** no national yearly candidate count (DIHK) and no official pass rate; the
   commercial 89.6 % (Testhelden, 2024) is not used anywhere.
