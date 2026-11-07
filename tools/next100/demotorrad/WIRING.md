# Wiring for `demotorrad` (German motorcycle theory test, Klassen A, A1, A2, written in German, v1)

Native-language exam built on the `detheorie` template: base bank and base copy are German
(`language: "de"`). Files already written by the builder:
- `data/de-motorrad-questions.json` (210, validator PASS with `--rows 210 --lang de`)
- `lib/banks/demotorrad.ts`
- `app/motorrad-theorie/*` (layout, redirect, dashboard, drill, stats; copied from `app/fuehrerschein-theorie/`)
- `lib/landings/demotorrad.de.json` (German landing content, with a German `facts.source`)
- `app/de/motorrad-fuehrerschein-theorie-test/page.tsx` (three-line `TranslatedExamLanding`, lang `de`, `samples related`)
- `tools/next100/demotorrad/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/demotorrad/build.py`. Everything below goes in shared files.

Format note: the real test (FeV Anlage 7, checked 2026-11-06) for a first licence of class A, A1
or A2 is 30 questions (20 Grundstoff, 10 Zusatzstoff per TÜV NORD), 2 to 5 error points each (110
in all), pass with at most 10, fail with two wrong 5-point questions; an extension (e.g. a class B
holder adding A2) is 20 questions, 72 points, at most 6 error points. No fixed time limit. Aufstieg
A1 to A2 or A2 to A after two years needs only a practical test (FeV § 15); B196 needs a
Fahrerschulung, no test (FeV § 6b). Tigertest models seven 30-question tests (210 items, pools
exactly 7x each per-test count) with 15 Grundstoff items written from the rider's point of view and
15 motorcycle Zusatzstoff items per test (the motorcycle part weighted up on purpose), single best
answer of four, equal weight, `passPct: 93` (28 of 30) as for `detheorie`. Five topic sets
(22201-22205, each at most 60) + 7 tests = 12 dashboard steps.

## lib/exams.ts

Add `"demotorrad"` to the `ExamId` union. Icon `bike` already exists (moto, nzmoto). 22201-22207
are free (highest existing idBase is 21900, aswbclin; 22100 is de34a in this batch). Set ids
22201-22205 share numbers with test ids 22201-22205, like detheorie.

```ts
const demotorrad: ExamConfig = {
  id: "demotorrad",
  stateCode: "DEMOTORRAD",
  idBase: 22200,
  slug: "/motorrad-theorie",
  landingPath: "/de/motorrad-fuehrerschein-theorie-test",
  name: "Motorrad Führerschein Theorie Test Klasse A, A1, A2",
  shortName: "Motorrad Theorie",
  examLabel: "Theorieprüfung Klasse A",
  fullName: "Theoretische Fahrerlaubnisprüfung Klassen A, A1 und A2 (Motorrad)",
  questionIdPrefix: "DEMOT-",
  icon: "bike",
  testCount: 7,
  questionsPerTest: 30,
  passPct: 93,
  language: "de",
  locale: "de-DE",
  english: {
    name: "Germany Motorcycle Theory Test (Class A, A1, A2)",
    shortName: "German motorcycle theory test",
    fullName: "German motorcycle licence theory test, classes A, A1 and A2 (Motorradführerschein), in German",
  },
  review: { de: "model" },
  // Real test (FeV Anlage 7 Nr. 1.2, TÜV NORD; checked 2026-11-06): first licence A, A1, A2:
  // 30 questions (20 Grundstoff, 10 Zusatzstoff), 2 to 5 error points each (110), pass with at
  // most 10, two wrong 5-point questions fail; extension 20 questions, 72 points, 6 error points;
  // no fixed time; German plus foreign languages (FeV now lists 14, TÜV | DEKRA still says 12);
  // video, multi-answer and image-selection tasks. Tigertest: seven tests of 30, 15 Grundstoff
  // (motorcycle perspective, 4/4/3/2/2) + 15 Zusatzstoff (5/3/3/2/2), pools exactly 7x, written
  // in German, kept clear of detheorie's stems. Equal weight, so passPct 93 (28 of 30) is
  // Tigertest's target. The split is Tigertest's own.
  blueprint: {
    demotGefahren: 4,
    demotVerhalten: 4,
    demotVorfahrt: 3,
    demotZeichen: 2,
    demotUmwelt: 2,
    demotFahrtechnik: 5,
    demotSchutz: 3,
    demotSozius: 3,
    demotKlassen: 2,
    demotTechnik: 2,
  },
  // Five topic sets, not testSets(): 5 + 7 tests = 12 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 22201, name: "Fahrtechnik: Bremsen und Kurven", categories: ["demotFahrtechnik"], size: 35, weightLabel: "5 von 30 Fragen je Testbogen" },
    { setNumber: 2, id: 22202, name: "Schutzkleidung und Technik", categories: ["demotSchutz", "demotTechnik"], size: 35, weightLabel: "5 von 30 Fragen je Testbogen" },
    { setNumber: 3, id: 22203, name: "Beifahrer, Gruppe und Fahrerlaubnis", categories: ["demotSozius", "demotKlassen"], size: 35, weightLabel: "5 von 30 Fragen je Testbogen" },
    { setNumber: 4, id: 22204, name: "Gefahrenlehre und Verhalten", categories: ["demotGefahren", "demotVerhalten"], size: 56, weightLabel: "8 von 30 Fragen je Testbogen" },
    { setNumber: 5, id: 22205, name: "Vorfahrt, Zeichen, Umwelt und Eignung", categories: ["demotVorfahrt", "demotZeichen", "demotUmwelt"], size: 49, weightLabel: "7 von 30 Fragen je Testbogen" },
  ],
  categoryLabels: {
    demotGefahren: "Gefahrenlehre",
    demotVerhalten: "Verhalten im Verkehr",
    demotVorfahrt: "Vorfahrt und Vorrang",
    demotZeichen: "Verkehrszeichen",
    demotUmwelt: "Umweltschutz und Eignung",
    demotFahrtechnik: "Fahrtechnik: Bremsen und Kurven",
    demotSchutz: "Schutzkleidung und Sichtbarkeit",
    demotSozius: "Beifahrer, Gepäck und Gruppe",
    demotKlassen: "Klassen A1, A2, A und B196",
    demotTechnik: "Motorradtechnik und Wartung",
  },
  copy: {
    guestPrompt: "um deinen Fortschritt für die Motorrad-Theorie zu speichern und jede falsche Antwort im Blick zu behalten",
    trainingHeading: "Übungssets",
    trainingSub: "Jedes Übungsset deckt ein Thema der Prüfung ab. Du bekommst sofort Rückmeldung, und falsch beantwortete Fragen kommen wieder, bis du sie sicher kannst.",
    testsHeading: "Testbögen · 30 Fragen, höchstens 2 Fehler",
    heroSubs: [
      "Fünf Übungssets, sieben Testbögen. Fahrtechnik kommt am häufigsten dran.",
      "Erst das Set meistern, dann den Testbogen.",
      "Die Hälfte ist geschafft. Mach einen Testbogen.",
      "Fehler wiederholen, dann noch einmal testen.",
      "Alles grün. Melde dich zur Theorieprüfung an.",
    ],
    sourceLine: "Nach StVO, StVZO und Fahrerlaubnis-Verordnung, Stand November 2026. Eigene Fragen, nicht aus dem amtlichen Fragenkatalog; 30 pro Testbogen, halb Motorrad-Zusatzstoff, ohne Fehlerpunkte-Gewichtung.",
    analyticsKey: "demotorrad",
  },
};
```

Append `demotorrad` to the `EXAMS` array right after `detheorie`.

## lib/banks/all.ts

```ts
import "./demotorrad";
```

## types/index.ts

- `QuestionType`: add `| "DEMOTORRAD"`.
- `QuestionCategory`, under a `// German motorcycle theory test (Klassen A, A1, A2)` comment:

```ts
  | "demotGefahren"
  | "demotVerhalten"
  | "demotVorfahrt"
  | "demotZeichen"
  | "demotUmwelt"
  | "demotFahrtechnik"
  | "demotSchutz"
  | "demotSozius"
  | "demotKlassen"
  | "demotTechnik"
```

## i18n

Only if results and `/stats` do not already prefer `exam.categoryLabels` (they did for detheorie).
`i18n/de.ts`: the German labels above. `i18n/en.ts`:

```ts
    demotGefahren: "Hazard Awareness",
    demotVerhalten: "Behaviour in Traffic",
    demotVorfahrt: "Right of Way & Priority",
    demotZeichen: "Traffic Signs",
    demotUmwelt: "Environment & Rider Fitness",
    demotFahrtechnik: "Riding Technique: Braking & Bends",
    demotSchutz: "Protective Gear & Visibility",
    demotSozius: "Passengers, Luggage & Group Riding",
    demotKlassen: "Classes A1, A2, A & B196",
    demotTechnik: "Motorcycle Technology & Maintenance",
```

## lib/shuffleOptions.ts

No position-dependent options; the build asserts none of "A und B", "Alle Antworten" and similar.
(One class item has options "A1 und AM", "A2 und BE", "A1 und B", "AM und L": licence classes, not
option letters; the validator's option-reference check passes.)

## .claude/skills/exam-bank/scripts/validate_bank.py

Add to `KNOWN_BANKS` so the default call passes like detheorie:
`"de-motorrad-questions.json": dict(rows=210, why="seven 30-question tests"),`

## app/globals.css

Suggested: deep plum `300 55% 32%`. The suggested `8 60% 30%` and every hue from 0 to 18 clash
under the 8-degree rule (barber 4 60% 31%, cssgb 14 50% 26%, casfa, llqp, apgov...). Checked
`300 55% 32%` against every light `[data-theme]` block and the three German siblings (deaevo 258,
de34a 28, deheilpr 142): clear. White text about 9:1. Then run `tools/gen_dark_brand_css.py`.

```css
  /* German motorcycle theory test (Klassen A, A1, A2) theme */
  [data-theme="demotorrad"] {
    --brand: 300 55% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 300 50% 96%;
    --brand-hover: 300 55% 27%;
    --brand-dark: 300 55% 24%;
    --brand-darker: 300 55% 18%;
    --brand-muted: 300 30% 65%;
    --brand-border: 300 35% 80%;
    --brand-border-light: 300 40% 90%;
    --brand-gradient-to: 300 60% 93%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `demotorrad: "Seven 30-question tests in German for the German motorcycle theory test (classes A, A1 and A2): riding technique, protective gear, passengers and group riding, licence classes and B196, motorcycle technology, plus hazard awareness, right of way and signs from the rider's point of view, written from the StVO, StVZO and FeV as of November 2026.",`
- `EXAM_ORG`: `demotorrad: "TÜV / DEKRA test centres · Klasse A, A1, A2 theory test, in German",`
- Hub group: a licence category, so the driving group, right after `detheorie`:
  `{ title: "EU driving theory tests", ids: ["detheorie", "demotorrad", "esdgt", ...] },`
- `RELATED_OVERRIDES` (optional): `demotorrad: ["detheorie", "ukmoto", "moto"],`
- `SEARCH_ALIASES` (German and English):
  `demotorrad: "motorrad führerschein theorie motorradführerschein motorrad theorie motorrad theorieprüfung klasse a klasse a1 klasse a2 a2 führerschein a1 führerschein leichtkraftrad b196 schlüsselzahl 196 125er führerschein motorrad prüfungsbogen motorrad fragenkatalog tüv dekra deutschland german motorcycle theory test germany motorcycle licence theory test german motorbike test class a a2 a1",`

## lib/region.ts

```ts
  demotorrad: "DE",
```
in `TEST_REGIONS`. A driving licence test, so NOT in `NON_DRIVING_TESTS`. `REGION_HOME.DE` can
stay as it is (it leads with class B); optionally widen `testsTitle` to "Theorieprüfung Klasse B und A".

## lib/landingContent.ts

```ts
import demotorradDe from "@/lib/landings/demotorrad.de.json";
  "demotorrad.de": demotorradDe as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  demotorrad: {
    answer:
      "The German motorcycle theory test (theoretische Fahrerlaubnisprüfung for classes A, A1 and A2) is taken on screen at a TÜV or DEKRA test centre. For a first licence it has 30 questions, 20 from the basic material shared by every class (Grundstoff) and 10 motorcycle questions (Zusatzstoff), each worth 2 to 5 error points, 110 in all; you pass with no more than 10 error points, but two wrong 5-point questions always fail. If you already hold another licence, such as class B, the extension test has 20 questions, 72 points and at most 6 error points. There is no fixed time limit. Moving up from A1 to A2 or from A2 to A after two years needs only a practical test, and the B196 entitlement for light motorcycles needs a training course, not a test. The test is in German and can also be taken in several foreign languages, including English.",
    rows: [
      { label: "Run by", value: "TÜV and DEKRA test centres (official test bodies)" },
      { label: "Questions, first licence", value: "30 (20 basic, 10 motorcycle)" },
      { label: "Questions, extension (e.g. from B)", value: "20, at most 6 error points" },
      { label: "Scoring", value: "2 to 5 error points per question" },
      { label: "Pass mark, first licence", value: "At most 10 of 110 error points, not two 5-point errors" },
      { label: "Time", value: "No fixed limit" },
      { label: "Languages", value: "German and several foreign languages incl. English" },
      { label: "Tigertest mock tests", value: "7 x 30 questions in German, half motorcycle topics, 28 to pass" },
    ],
    basedOn: "Fahrerlaubnis-Verordnung Anlage 7, §§ 6, 6b and 15 FeV, TÜV NORD and TÜV | DEKRA arge tp 21 guidance on the theory test, StVO and StVZO as in force, checked November 2026",
    source: { name: "TÜV | DEKRA arge tp 21: driving licence test", url: "https://fahrerlaubnis.tuev-dekra.de/en/" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in German)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## lib/tigerAssets.ts

`BORROWED_SETS`: `demotorrad: "moto",` (the motorcycle tiger, like ukmoto, nzmoto, sgrtt, zak53moto).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the `/de/...` landing is emitted once with hreflang `de-DE` and
x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. Sets are 35 to 56, so no parts.

## tools/build_exam_sources.py

Run `python3 -I tools/build_exam_sources.py` so `lib/examSources.json` picks up the first three
URLs of `tools/next100/demotorrad/sources.md` (FeV Anlage 7 twice, TÜV NORD).

## lib/examFreshness.json (optional)

The planned 2027 theory reform (smaller catalogue, equal weighting) applies to motorcycles too; if
detheorie has an event for it, add `demotorrad` to the same event.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing demotorrad:motorrad-theorie:22201`
then rename to `/landing/demotorrad-{mobile,desktop}-de.png` as for detheorie.

## CLAUDE.md (after the detheorie bullet)

```md
- **Motorrad Theorie** (`demotorrad`, the German theory test for a first motorcycle licence, classes A, A1 and A2, native German exam, `language: "de"`, `locale: "de-DE"`, English names in `english`, `review: { de: "model" }`, `/motorrad-theorie/*`, landing `/de/motorrad-fuehrerschein-theorie-test` from `lib/landings/demotorrad.de.json`): `data/de-motorrad-questions.json` (210 original questions written in German, in "Sie": Grundstoff from the rider's point of view, Gefahrenlehre 28, Verhalten im Verkehr 28, Vorfahrt und Vorrang 21, Verkehrszeichen 14, Umweltschutz und Eignung 14; motorcycle Zusatzstoff, Fahrtechnik 35, Schutzkleidung 21, Beifahrer, Gepäck und Gruppe 21, Klassen A1, A2, A und B196 14, Motorradtechnik 14), seven 30-question tests (IDs 22201-22207, 15 Grundstoff + 15 Zusatzstoff, 4/4/3/2/2 and 5/3/3/2/2 per test, no spares; the real test is 20 + 10, so the motorcycle part is weighted up on purpose) and five German-named topic sets 22201-22205, 12 dashboard steps, state `DEMOTORRAD`, prefix `DEMOT-`, 93% pass (28 of 30, Tigertest's target: the real first-licence test passes at 10 of 110 error points and fails on two wrong 5-pointers, the extension test from class B is 20 questions with 6 error points; FeV Anlage 7). Multi-answer, number-entry, image and video tasks, the weighting and the riding test are not modelled; signs described in words with their StVO number. Class limits from FeV § 6 (A1 125 cm³ and 11 kW, A2 35 kW and 0,2 kW/kg from at most 70 kW), B196 from § 6b, Aufstieg by practical test only (§ 15, landing only). Kept clear of `detheorie` stems and of the `moto`, `ukmoto`, `nzmoto`, `zak53moto` and `sgrtt` banks. Built by `tools/next100/demotorrad/build.py`; sources in `tools/next100/demotorrad/sources.md`, terms in `glossary.md`. Region DE, hub group "EU driving theory tests" (after detheorie), `[data-theme="demotorrad"]` deep plum, borrows the motorcycle tiger.
```

## Decisions for the integrator

1. **Languages count.** FeV Anlage 7 Nr. 1.3 as read on 2026-11-06 lists 14 foreign languages
   (Kurmanji and Ukrainian added); TÜV | DEKRA's page still says 12. The landing and examFacts say
   "several foreign languages". detheorie's landing and examFacts say 12: worth rechecking.
2. **Weighting.** 15 + 15 per test (the research note asked to weight the Zusatzstoff up); the
   landing says so. Strict 20 + 10 would need a larger Grundstoff pool.
3. **Hue.** `300 55% 32%` because every hue near the suggested 8 clashes.
4. **Key length.** Key-longest 0.5%, key-shortest 23% (chance 25%), so no length tell either way.
5. **Not confirmed:** the research note's "2025 catalogue update added A, A1, A2 questions" and the
   cohort size; neither is stated anywhere.
