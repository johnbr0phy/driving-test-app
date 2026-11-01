# Wiring for `detheorie` (German car theory test, Führerschein Klasse B, written in German, v1)

Tigertest's first native-language exam: the base bank and base copy are German
(`language: "de"`). Files already written by the builder:
- `data/de-theorie-questions.json` (210, validator PASS)
- `lib/banks/detheorie.ts`
- `app/fuehrerschein-theorie/*` (8 wrappers copied from `app/pakistan-driving-test/`)
- `lib/landings/detheorie.de.json` (German landing content, with a German `facts.source`)
- `app/de/fuehrerschein-theorie-test/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `de`)
- `tools/next100/detheorie/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/detheorie/build.py`. Everything below goes in shared files.

Format note: the real test (FeV Anlage 7, checked 2026-11-01) is 30 questions for class B (20
Grundstoff, 10 Zusatzstoff per TÜV NORD), each worth 2 to 5 error points (110 in all); pass with
at most 10 error points, fail with two wrong 5-point questions; no fixed time limit (guide time
45 minutes); offered in German and 12 foreign languages. Tigertest models seven 30-question tests
(210 items, pools exactly 7x each per-test count, every item in exactly one test) with single best
answers of four options and equal weight, so `passPct: 93` (28 of 30, at most two mistakes) is
Tigertest's own target. Multi-answer, number-entry, image-selection and video tasks and the point
weighting are not modelled; the landing says so. Training is by topic: 5 Übungssets (ids
14701-14705, each at most 60 questions, all 210 items) plus the 7 Testbögen = 12 dashboard steps.

## lib/exams.ts

Add `"detheorie"` to the `ExamId` union. Icon `car` already exists. 14701-14707 are free (highest
existing idBase is 14600, mttheory). Set ids 14701-14705 share numbers with test ids 14701-14705
like other topic-set exams (CDL Endorsements 701-705).

```ts
const detheorie: ExamConfig = {
  id: "detheorie",
  stateCode: "DETHEORIE",
  idBase: 14700,
  slug: "/fuehrerschein-theorie",
  landingPath: "/de/fuehrerschein-theorie-test",
  name: "Führerschein Theorie Test Klasse B",
  shortName: "Führerschein Theorie",
  examLabel: "Theorieprüfung Klasse B",
  fullName: "Theoretische Fahrerlaubnisprüfung Klasse B (Pkw)",
  questionIdPrefix: "DETH-",
  icon: "car",
  testCount: 7,
  questionsPerTest: 30,
  passPct: 93,
  language: "de",
  locale: "de-DE",
  english: {
    name: "German Driving Theory Test (Class B)",
    shortName: "German driving theory test",
    fullName: "German driving licence theory test, class B car (Führerschein Klasse B), in German",
  },
  review: { de: "model" },
  // Real test (FeV Anlage 7 Nr. 1.2, TÜV NORD, TÜV | DEKRA arge tp 21; checked 2026-11-01): class
  // B first licence, 30 questions (20 Grundstoff, 10 Zusatzstoff), 2 to 5 error points each (110),
  // pass with at most 10, two wrong 5-point questions fail; no fixed time, guide time 45 minutes;
  // German plus 12 foreign languages; catalogue revised each 1 April and 1 October; up to three
  // video tasks; multi-answer and image-selection tasks. A reform (smaller catalogue, equal
  // weighting) passed cabinet on 20 May 2026 for early 2027, not in force. Categories are the
  // eight Sachgebiete of FeV Anlage 7 Nr. 1.1; the 7/6/4/5/2/2/2/2 split is Tigertest's own.
  // Seven tests of 30, pools exactly 7x each count (210, all original, written in German).
  // Single best answer of four, equal weight, so passPct 93 (28 of 30) is Tigertest's target.
  blueprint: {
    dethGefahren: 7,
    dethVerhalten: 6,
    dethVorfahrt: 4,
    dethZeichen: 5,
    dethUmwelt: 2,
    dethBetrieb: 2,
    dethTechnik: 2,
    dethEignung: 2,
  },
  // Five topic sets (reviewer, Nov 2026), not testSets(): 5 + 7 tests = 12 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 14701, name: "Gefahrenlehre", categories: ["dethGefahren"], size: 49, weightLabel: "7 von 30 Fragen je Testbogen" },
    { setNumber: 2, id: 14702, name: "Verhalten im Verkehr", categories: ["dethVerhalten"], size: 42, weightLabel: "6 von 30 Fragen je Testbogen" },
    { setNumber: 3, id: 14703, name: "Vorfahrt und Vorrang", categories: ["dethVorfahrt"], size: 28, weightLabel: "4 von 30 Fragen je Testbogen" },
    { setNumber: 4, id: 14704, name: "Verkehrszeichen", categories: ["dethZeichen"], size: 35, weightLabel: "5 von 30 Fragen je Testbogen" },
    { setNumber: 5, id: 14705, name: "Fahrzeug, Umwelt und Fahreignung", categories: ["dethUmwelt", "dethBetrieb", "dethTechnik", "dethEignung"], size: 56, weightLabel: "8 von 30 Fragen je Testbogen" },
  ],
  categoryLabels: {
    dethGefahren: "Gefahrenlehre",
    dethVerhalten: "Verhalten im Verkehr",
    dethVorfahrt: "Vorfahrt und Vorrang",
    dethZeichen: "Verkehrszeichen",
    dethUmwelt: "Umweltschutz",
    dethBetrieb: "Vorschriften über den Betrieb der Fahrzeuge",
    dethTechnik: "Technik",
    dethEignung: "Eignung und Befähigung von Kraftfahrern",
  },
  copy: {
    guestPrompt: "um deinen Fortschritt für die Theorieprüfung zu speichern und jede falsche Antwort im Blick zu behalten",
    trainingHeading: "Übungssets",
    trainingSub: "Jedes Übungsset deckt ein Sachgebiet der Prüfung ab. Du bekommst sofort Rückmeldung, und falsch beantwortete Fragen kommen wieder, bis du sie sicher kannst.",
    testsHeading: "Testbögen · 30 Fragen, höchstens 2 Fehler",
    heroSubs: [
      "Fünf Übungssets, sieben Testbögen. Gefahrenlehre und Verhalten im Verkehr kommen am häufigsten dran.",
      "Erst das Set meistern, dann den Testbogen.",
      "Die Hälfte ist geschafft. Mach einen Testbogen.",
      "Fehler wiederholen, dann noch einmal testen.",
      "Alles grün. Melde dich zur Theorieprüfung an.",
    ],
    sourceLine: "Nach StVO, StVZO und Fahrerlaubnis-Verordnung, Stand November 2026. Eigene Fragen, nicht aus dem amtlichen Fragenkatalog; 30 pro Testbogen, ohne Fehlerpunkte-Gewichtung.",
    analyticsKey: "detheorie",
  },
};
```

Append `detheorie` to the `EXAMS` array with the other driving tests (after `mttheory`).
No `translations` yet (an English version would be `translations.en`, LANGUAGES.md phase 2).
The set names above are German topic names, so `TEST_SET_NAMES.de` is not used for this exam.
`ExamDashboard` shows topic sets first, then the tests (like CDL Endorsements); the results plan
points at the weakest topic set.

## lib/banks/all.ts

```ts
import "./detheorie";
```

## types/index.ts

- `QuestionType`: add `| "DETHEORIE"`.
- `QuestionCategory`, under a `// German car theory test (Klasse B)` comment:

```ts
  | "dethGefahren"
  | "dethVerhalten"
  | "dethVorfahrt"
  | "dethZeichen"
  | "dethUmwelt"
  | "dethBetrieb"
  | "dethTechnik"
  | "dethEignung"
```

## i18n

If `ResultsHeroDebrief` and `/stats` already prefer `exam.categoryLabels` (LANGUAGES.md 2.1 item 2),
nothing is needed. Otherwise add to `i18n/de.ts`:

```ts
    dethGefahren: "Gefahrenlehre",
    dethVerhalten: "Verhalten im Verkehr",
    dethVorfahrt: "Vorfahrt und Vorrang",
    dethZeichen: "Verkehrszeichen",
    dethUmwelt: "Umweltschutz",
    dethBetrieb: "Vorschriften über den Betrieb der Fahrzeuge",
    dethTechnik: "Technik",
    dethEignung: "Eignung und Befähigung von Kraftfahrern",
```

and to `i18n/en.ts` (and the other dictionaries, which fall back to English):

```ts
    dethGefahren: "Hazard Awareness",
    dethVerhalten: "Behaviour in Traffic",
    dethVorfahrt: "Right of Way & Priority",
    dethZeichen: "Traffic Signs",
    dethUmwelt: "Environmental Protection",
    dethBetrieb: "Vehicle Operation Rules",
    dethTechnik: "Vehicle Technology",
    dethEignung: "Driver Fitness",
```

## lib/shuffleOptions.ts

The bank has no position-dependent German options ("A und B", "Beide", "Alle Antworten ...");
the build asserts it. Nothing extra beyond the platform's `de` patterns.

## app/globals.css

Suggested: anthracite `0 0% 24%` (the black of the German flag; Germany's road signs are
black on white). Clash check against every light `[data-theme]` block: no theme within 8 degrees
has saturation within 15 points (no other theme is grey), so it is clear. White text about 11:1.
Gold accent on the gradient. If a grey brand reads badly on the shared components, the fallback
is a dark red `352 70% 30%`, which needs checking against `esdgt` (352 85% 34%: 15 points of
saturation apart) and `rrbalp`. Then run `tools/gen_dark_brand_css.py` (the dark tint of a 0%
saturation brand stays grey; check it looks right).

```css
  /* German car theory test (Führerschein Klasse B) theme */
  [data-theme="detheorie"] {
    --brand: 0 0% 24%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 45 60% 96%;
    --brand-hover: 0 0% 18%;
    --brand-dark: 0 0% 16%;
    --brand-darker: 0 0% 10%;
    --brand-muted: 0 0% 66%;
    --brand-border: 0 0% 78%;
    --brand-border-light: 0 0% 88%;
    --brand-gradient-to: 45 90% 93%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `detheorie: "Seven 30-question tests in German for the German car theory test (Führerschein Klasse B): hazard awareness, behaviour in traffic, right of way, traffic signs, environment, vehicle rules, technology and driver fitness, written from the StVO, StVZO and FeV as of November 2026.",`
- `EXAM_ORG`: `detheorie: "TÜV / DEKRA test centres · Klasse B theory test, in German",`
- Hub group: add `"detheorie"` to `"EU driving theory tests"` (first, it is the largest market),
  or a new `{ title: "Germany driving tests", ids: ["detheorie"] }` with
  `RELATED_OVERRIDES`: `detheorie: ["dkteori", "bedriving", "hukresz"],`.
- `SEARCH_ALIASES` (native and English):
  `detheorie: "führerschein theorie fuehrerschein theorie theorieprüfung theoriepruefung klasse b führerscheinprüfung fahrschule theorie test prüfungsbogen fragenkatalog tüv dekra vorfahrt verkehrszeichen gefahrenlehre deutschland german driving theory test germany driving licence theory test german driving test class b berlin hamburg münchen köln frankfurt",`
- Native name on the German homepage, `english.name` elsewhere (LANGUAGES.md 1.6; the platform's
  `TestCatalogEntry` language field).

## lib/region.ts, components/home/*

Already wired by the platform agent: region `DE` (`lang: "de"`, `locale: "de-DE"`),
`regionFromCountry` DE, `TEST_REGIONS.detheorie = "DE"`, `REGION_HOME.DE` in German with the CTA
to `/de/fuehrerschein-theorie-test`, `AUTHORITY.DE = "TÜV/DEKRA"`. Check `REGION_HOME.DE.testsSub`
matches: "Fragen nach StVO und Fahrerlaubnis-Verordnung, in km/h für den Rechtsverkehr.
Videofragen und Fehlerpunkte werden nicht nachgebildet." is accurate for this bank. A driving
test, so NOT in `NON_DRIVING_TESTS`.

## lib/landingContent.ts

Register the German landing so `/de` can quote its facts answer:

```ts
import detheorieDe from "@/lib/landings/detheorie.de.json";
  "detheorie.de": detheorieDe as TranslatedLandingContent,
```

## app/de/layout.tsx

Needed if not already made by the platform agent (copy of `app/es/layout.tsx` with `lang="de"`).
The landing page itself is `app/de/fuehrerschein-theorie-test/page.tsx` and expects
`TranslatedExamLanding` to accept the base language (`urls()` using `exam.landingPath` when
`lang === exam.language`; locale `de-DE`; `priceCurrency` EUR).

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  detheorie: {
    answer:
      "The German theory test (theoretische Fahrerlaubnisprüfung) for a first class B car licence has 30 questions, answered on screen at a TÜV or DEKRA test centre: 20 from the basic material that applies to every licence class (Grundstoff) and 10 class B questions (Zusatzstoff). Each question carries 2 to 5 error points depending on its importance for road safety, 110 in all. You pass with no more than 10 error points, but two wrong 5-point questions always fail. There is no fixed time limit; the guide time is 45 minutes. The test is in German and can also be taken in 12 foreign languages, including English, Turkish, Russian and Arabic. Questions come from the official catalogue published by TÜV | DEKRA arge tp 21, revised each April and October; some have several correct answers, some ask for a number, and up to three are short videos. A reform with a smaller catalogue and equal weighting is planned for 2027.",
    rows: [
      { label: "Run by", value: "TÜV and DEKRA test centres (official test bodies)" },
      { label: "Questions", value: "30 (20 basic, 10 class B)" },
      { label: "Scoring", value: "2 to 5 error points per question, 110 in all" },
      { label: "Pass mark", value: "At most 10 error points, not two 5-point errors" },
      { label: "Time", value: "No fixed limit, guide time 45 minutes" },
      { label: "Languages", value: "German and 12 foreign languages incl. English" },
      { label: "Catalogue updates", value: "Each 1 April and 1 October" },
      { label: "Tigertest mock tests", value: "7 x 30 questions in German, 28 to pass" },
    ],
    basedOn: "Fahrerlaubnis-Verordnung Anlage 7, TÜV NORD and TÜV | DEKRA arge tp 21 guidance on the theory test, StVO, StVZO and StVG as in force, checked November 2026",
    source: { name: "TÜV | DEKRA arge tp 21: driving licence test", url: "https://fahrerlaubnis.tuev-dekra.de/en/" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in German)" per LANGUAGES.md 3.5; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## lib/tigerAssets.ts

Add to `BORROWED_SETS` with the other car tests: `detheorie: "driving",`

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the native `landingPath` under `/de` is emitted once, with
hreflang `de-DE` and x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 28 to 56 (all at most 60),
so no parts.

## Screenshots

`TranslatedExamLanding` reads `/landing/detheorie-{mobile,desktop}-de.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing detheorie:fuehrerschein-theorie:14701`
then rename the two files to the `-de` names (or teach the platform's component to use the
plain names for a base-language landing).

## CLAUDE.md (a "Native-language exams" bullet, or after the EU driving tests)

```md
- **Führerschein Theorie** (`detheorie`, German car theory test for a first class B licence, Tigertest's first native-language exam, base language German, `language: "de"`, `locale: "de-DE"`, `review: { de: "model" }`, `/fuehrerschein-theorie/*`, landing `/de/fuehrerschein-theorie-test` from `lib/landings/detheorie.de.json`): `data/de-theorie-questions.json` (210 original questions written directly in German, in "Sie", on the eight Sachgebiete of the official catalogue: Gefahrenlehre 49, Verhalten im Verkehr 42, Vorfahrt und Vorrang 28, Verkehrszeichen 35, Umweltschutz 14, Vorschriften über den Betrieb der Fahrzeuge 14, Technik 14, Eignung und Befähigung 14), seven 30-question tests (IDs 14701-14707, 7/6/4/5/2/2/2/2 per test, no spares) and five German-named topic sets 14701-14705 (Gefahrenlehre 49, Verhalten im Verkehr 42, Vorfahrt und Vorrang 28, Verkehrszeichen 35, Fahrzeug, Umwelt und Fahreignung 56), 12 dashboard steps, state `DETHEORIE`, prefix `DETH-`, 93% pass (28 of 30, Tigertest's target: the real test weights questions 2 to 5 error points and passes at 10 or fewer, failing on two wrong 5-pointers; FeV Anlage 7). Multi-answer, number-entry, image and video tasks and the weighting are not modelled; signs are described in words with their StVO number ("Zeichen 205 (Vorfahrt gewähren)"). Rules from StVO, StVZO, StVG and FeV as in force November 2026 (Alpine-symbol tyres, 3,5 ng/ml THC and the novice cannabis ban of August 2024); no fines, points or fees; the 2027 reform is on the landing only. English names in `english` for English surfaces. Built by `tools/next100/detheorie/build.py` (sorts all-number options with German decimal commas); sources in `tools/next100/detheorie/sources.md`, terms in `glossary.md`. Region DE (homepage `/de`), `[data-theme="detheorie"]` anthracite, borrows the car tiger.
```

## Decisions for the integrator

1. **Dashboard length.** Decided in review: five topic sets (14701-14705, the four small
   Sachgebiete joined in set 5) + 7 tests = 12 steps, inside the house range. `testSets(14700, 7, 30)`
   gave 14.
2. **Pass mark.** 93 (28 of 30). The real rule is points-based: with average weights three wrong
   answers can pass or fail. Two mistakes always passes the real rule unless both are 5-pointers,
   so "at most two" is the closer equal-weight target. 90 (27 of 30) would match esdgt's style but
   overstate the margin.
3. **Hue.** Anthracite grey `0 0% 24%` (no other theme is grey); check it on the shared header and
   buttons.
4. **Register.** Questions "Sie", landing and dashboard copy "du" (LANGUAGES.md 2.1).
