# Wiring for `escapcond` (Spain Driver CPC, examen CAP inicial, written in Spanish, v1)

A native-language exam (base bank and copy in Spanish, `language: "es"`, `locale: "es-ES"`),
copied end to end from `detheorie`. Files already written by the builder:
- `data/es-cap-conductores-questions.json` (200, validator PASS with `--lang es`)
- `lib/banks/escapcond.ts`
- `app/examen-cap/*` (5 wrappers: layout, redirect, dashboard, drill, stats)
- `lib/landings/escapcond.es.json` (Spanish landing content, Spanish `facts.source`)
- `app/es/test-examen-cap/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `es`)
- `tools/next100/escapcond/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/escapcond/build.py`. Validate with
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/es-cap-conductores-questions.json --lang es --pool escapcCadena=24 --pool escapcFrenos=24 --pool escapcRiesgos=16 --pool escapcTiempos=24 --pool escapcTacografo=20 --pool escapcSalud=24 --pool escapcEmergencias=20 --pool escapcMercancias=24 --pool escapcViajeros=24`.
Everything below goes in shared files.

Format note (Real Decreto 284/2021, BOE-A-2021-6624, Anexo V, read 2026-11-06; Anexo V not
changed by Real Decreto 487/2026): after a 280-hour (ordinaria) or 140-hour (acelerada) course,
the exam is 100 test questions with four options and one valid, at least 2 hours, +1 per right
answer, -0,5 per wrong answer, blanks 0, pass with at least half the possible points (50). 25 of
the 100 are on the candidate's speciality (mercancías for C1/C, viajeros for D1/D). Called by each
comunidad autónoma at least six times a year (art. 17). Tigertest models four 50-question tests of
38 common items plus 6 mercancías and 6 viajeros (the speciality sets let a candidate train only
theirs), single best answer of four, no penalty, so `passPct: 67` (34 of 50) is the real 50 net
points when every question is answered (66,7 of 100 right). Training is by topic: 5 sets
(22701-22705, all 200 items) + 4 tests = 9 dashboard steps.

## lib/exams.ts

Add `"escapcond"` to the `ExamId` union. Icon `truck` already exists. 22701-22705 are free
(grep showed nothing in 22700-22799; the Spain siblings esguardia and espolicia use 22400
and 22500).

```ts
const escapcond: ExamConfig = {
  id: "escapcond",
  stateCode: "ESCAPCOND",
  idBase: 22700,
  slug: "/examen-cap",
  landingPath: "/es/test-examen-cap",
  name: "Test examen CAP inicial",
  shortName: "Examen CAP",
  examLabel: "Examen CAP inicial",
  fullName: "Examen del certificado de aptitud profesional (CAP) de cualificación inicial de conductores, mercancías y viajeros",
  questionIdPrefix: "ESCAP-",
  icon: "truck",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 67,
  language: "es",
  locale: "es-ES",
  english: {
    name: "Spain Driver CPC (CAP) Initial Exam",
    shortName: "Spain CAP exam",
    fullName: "Spain Driver CPC initial qualification exam (examen CAP inicial), goods and passengers, in Spanish",
  },
  review: { es: "model" },
  // Real exam (Real Decreto 284/2021, arts. 5, 6, 16, 17 and Anexo V; BOE-A-2021-6624, checked
  // 2026-11-06; Anexo V unchanged by RD 487/2026, in force 18 Sept 2026): 100 test questions, 4
  // options, one valid, at least 2 hours, +1 / -0,5 / blank 0, pass at half the points (50); 25
  // of the 100 on the speciality (Anexo I A sección 2.ª mercancías or 3.ª viajeros). Categories
  // follow the Anexo I A objectives (1.1 and 1.3; 1.2; 1.3 bis, now 1.4; 2.1 hours; 2.1
  // tachograph, working time and periodic training; 3.1, 3.3, 3.4; 3.2, 3.5, 3.6; mercancías;
  // viajeros). Per test 38 common + 6 + 6; the split inside the common part is Tigertest's.
  // Four tests of 50, pools exactly 4x each count, all original, written in Spanish. No penalty
  // applied, so passPct 67 (34 of 50) = 50 net points answering everything.
  blueprint: {
    escapcCadena: 6,
    escapcFrenos: 6,
    escapcRiesgos: 4,
    escapcTiempos: 6,
    escapcTacografo: 5,
    escapcSalud: 6,
    escapcEmergencias: 5,
    escapcMercancias: 6,
    escapcViajeros: 6,
  },
  // Five topic sets, not testSets(): 5 + 4 tests = 9 dashboard steps. Sets 4 and 5 are the two
  // specialities, so a truck or bus candidate can train only their own.
  trainingSets: [
    { setNumber: 1, id: 22701, name: "Conducción racional y frenos", categories: ["escapcCadena", "escapcFrenos"], size: 48, weightLabel: "12 de 50 preguntas por test" },
    { setNumber: 2, id: 22702, name: "Tiempos de conducción, tacógrafo y jornada", categories: ["escapcTiempos", "escapcTacografo"], size: 44, weightLabel: "11 de 50 preguntas por test" },
    { setNumber: 3, id: 22703, name: "Riesgos, salud y emergencias", categories: ["escapcRiesgos", "escapcSalud", "escapcEmergencias"], size: 60, weightLabel: "15 de 50 preguntas por test" },
    { setNumber: 4, id: 22704, name: "Mercancías", categories: ["escapcMercancias"], size: 24, weightLabel: "6 de 50 preguntas por test (25 de 100 en el examen de mercancías)" },
    { setNumber: 5, id: 22705, name: "Viajeros", categories: ["escapcViajeros"], size: 24, weightLabel: "6 de 50 preguntas por test (25 de 100 en el examen de viajeros)" },
  ],
  categoryLabels: {
    escapcCadena: "Cadena cinemática y conducción económica",
    escapcFrenos: "Frenos y sistemas de seguridad",
    escapcRiesgos: "Riesgos del tráfico",
    escapcTiempos: "Tiempos de conducción y descanso",
    escapcTacografo: "Tacógrafo, jornada y formación continua",
    escapcSalud: "Salud, ergonomía y accidentes de trabajo",
    escapcEmergencias: "Emergencias, delincuencia e imagen de empresa",
    escapcMercancias: "Mercancías: carga, documentos y mercado",
    escapcViajeros: "Viajeros: seguridad, normas y mercado",
  },
  copy: {
    guestPrompt: "para guardar tu progreso en el CAP y no perder ninguna pregunta fallada",
    trainingHeading: "Bloques de repaso",
    trainingSub: "Cada bloque cubre varios objetivos del temario oficial del CAP. Ves la respuesta al momento y las preguntas que fallas vuelven hasta que las dominas. Mercancías y viajeros tienen su propio bloque.",
    testsHeading: "Test · 50 preguntas, 34 para aprobar",
    heroSubs: [
      "Cinco bloques de repaso y cuatro test. Tiempos de conducción y tacógrafo son lo que más se pregunta.",
      "Domina el bloque y después haz el test.",
      "Vas por la mitad. Haz un test completo.",
      "Repasa tus fallos y vuelve a hacer el test.",
      "Todo en verde. A por el examen del CAP.",
    ],
    sourceLine: "Según el anexo I del Real Decreto 284/2021 y las normas vigentes en noviembre de 2026. Preguntas propias, no de exámenes oficiales; sin la penalización de medio punto por error.",
    analyticsKey: "escapcond",
  },
};
```

Append `escapcond` to `EXAMS` after `esdgt` (Spain's driving exams together).
`ExamDashboard` shows topic sets first, then the tests (like detheorie and esguardia).

## lib/banks/all.ts

```ts
import "./escapcond";
```

## types/index.ts

- `QuestionType`: add `| "ESCAPCOND"`.
- `QuestionCategory`, under a `// Spain Driver CPC, CAP inicial (escapcond)` comment:

```ts
  | "escapcCadena"
  | "escapcFrenos"
  | "escapcRiesgos"
  | "escapcTiempos"
  | "escapcTacografo"
  | "escapcSalud"
  | "escapcEmergencias"
  | "escapcMercancias"
  | "escapcViajeros"
```

## i18n

Results and `/stats` read `exam.categoryLabels` first (phase 0), so nothing is needed. If a
dictionary needs them anyway, `i18n/es.ts` takes the Spanish labels above and `i18n/en.ts`:

```ts
    escapcCadena: "Driveline & Fuel-Efficient Driving",
    escapcFrenos: "Brakes & Safety Systems",
    escapcRiesgos: "Traffic Hazards",
    escapcTiempos: "Drivers' Hours & Rest",
    escapcTacografo: "Tachograph, Working Time & Periodic Training",
    escapcSalud: "Health, Ergonomics & Work Accidents",
    escapcEmergencias: "Emergencies, Crime & Company Image",
    escapcMercancias: "Goods: Loading, Documents & Market",
    escapcViajeros: "Passengers: Safety, Rules & Market",
```

## lib/shuffleOptions.ts

No position-dependent options ("Todas las anteriores", "A y B", "Ambas"); the build asserts it.
34 all-number items are sorted ascending by the build (19 keyed in an end slot).

## app/globals.css

The suggested `30 60% 28%` clashes with `upscse` (28 65% 30%), `cacarp` (24 50% 30%),
`nzfirearms` (30 55% 22%) and `cawhmis` (37 62% 30%). A scan of every light theme (plus the
Spain siblings' WIRING hues) for hues 18 to 43 with white text at 4.5:1 or better gives two
clean points at hue 30: `30 85% 20%` (deep bronze brown, proposed: sat 15 above phrebroker
30 70% 22% and zak53c3 38 70% 20%, lightness 8 below jelec 36 90% 28%) or `30 20% 28%`. White text
far above 4.5:1. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Spain Driver CPC, examen CAP inicial theme */
  [data-theme="escapcond"] {
    --brand: 30 85% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 30 60% 95%;
    --brand-hover: 30 85% 16%;
    --brand-dark: 30 85% 14%;
    --brand-darker: 30 85% 10%;
    --brand-muted: 30 30% 60%;
    --brand-border: 30 35% 78%;
    --brand-border-light: 30 40% 88%;
    --brand-gradient-to: 30 70% 91%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `escapcond: "Four 50-question tests in Spanish for Spain's Driver CPC initial qualification exam (examen CAP inicial) for truck and bus drivers: driveline and fuel-efficient driving, brakes and retarders, drivers' hours and the tachograph, health and emergencies, load securing and goods documents, and passenger safety and rights, written from Real Decreto 284/2021 as of November 2026.",`
- `EXAM_ORG`: `escapcond: "Consejerías de transportes of each comunidad autónoma · CAP inicial exam under Real Decreto 284/2021, in Spanish",`
- Hub group: a licence category, so it joins the driving group with `esdgt` (the siblings'
  WIRING files say the same): in `"EU driving theory tests"` put `"escapcond"` right after
  `"esdgt"`. If the integrator prefers a Spain group, the alternative is
  `{ title: "Spain professional driver tests", ids: ["escapcond"] },` after the EU driving group,
  with `RELATED_OVERRIDES`: `escapcond: ["esdgt", "iedttcv", "uklgv", "ukpcv"],`.
- `SEARCH_ALIASES` (Spanish and English):
  `escapcond: "cap test cap examen cap cap inicial cap conductor cap camion cap camión cap autobus cap autobús cap mercancias cap mercancías cap viajeros certificado de aptitud profesional cualificacion inicial cualificación inicial conductor profesional examen cap 2026 test cap gratis preguntas cap tacografo tacógrafo tiempos de conduccion y descanso carnet c carnet d permiso c permiso d tarjeta de cualificacion codigo 95 spain cpc driver cpc spain spanish cap exam spain truck driver test spain bus driver test hgv spain lorry driver spain",`
- Native name on Spanish surfaces, `english.name` elsewhere.

## lib/region.ts

`TEST_REGIONS.escapcond = "ES"` (region ES exists, from esdgt). A licence category, so NOT in
`NON_DRIVING_TESTS` (like `iedttcv` and `zak53c3`). `REGION_HOME.ES.testsSub` could add one
sentence once it ships (integrator's call), e.g. "Y el examen del CAP para conductores
profesionales de camión y autobús."

## lib/landingContent.ts

```ts
import escapcondEs from "@/lib/landings/escapcond.es.json";
  "escapcond.es": escapcondEs as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  escapcond: {
    answer:
      "Spain's Driver CPC initial qualification (certificado de aptitud profesional, CAP inicial) is required by Real Decreto 284/2021 for professional drivers of trucks (licence categories C1 and C) and buses (D1 and D). Candidates first complete a course at an approved centre, 280 hours in the ordinary route or 140 in the accelerated one, and must then pass the exam within a year. Each comunidad autónoma's transport department runs the exam, at least six times a year. It has 100 multiple-choice questions with four options and one correct answer, and lasts at least two hours. A right answer scores 1 point, a wrong one loses 0.5 and a blank scores nothing; the pass is half the possible points, 50. 25 of the 100 questions are on the candidate's speciality, goods or passengers; a holder adding the other speciality takes only that course part and that part of the exam. The common syllabus covers the driveline and fuel-efficient driving, brakes and safety systems, traffic hazards, drivers' hours (Regulation 561/2006), the tachograph, health, emergencies and crime prevention; goods add loading, transport documents, CMR and cabotage, passengers add passenger safety, school transport and passenger rights. The exam is in Spanish.",
    rows: [
      { label: "Run by", value: "Each comunidad autónoma's transport department" },
      { label: "Before the exam", value: "Course of 280 h (ordinary) or 140 h (accelerated)" },
      { label: "Questions", value: "100, four options, one correct (25 on goods or passengers)" },
      { label: "Marking", value: "+1 right, -0.5 wrong, blank 0" },
      { label: "Pass mark", value: "50 points, half the possible" },
      { label: "Time", value: "At least 2 hours" },
      { label: "Sittings", value: "At least six a year in each region" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Spanish, 34 to pass" },
    ],
    basedOn: "Real Decreto 284/2021 (arts. 5, 6, 16, 17 and Annexes I and V) as amended by Real Decreto 487/2026, Regulation (EC) 561/2006 and Regulation (EU) 165/2014 as in force, checked November 2026",
    source: { name: "BOE: Real Decreto 284/2021 (Driver CPC qualification), consolidated", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-6624" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Spanish)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave. Run
`npx tsx scripts/build-landing-dates.ts` after committing.

## lib/tigerAssets.ts

`BORROWED_SETS`: `escapcond: "cdl",` (as `iedttcv` and `zak53c3`).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Not added to `TEACHER_LED`: the course is compulsory at a CAP centre, so a centre could set it
as class practice; the integrator may add `"escapcond"` and `TEACHES`:
`escapcond: "a CAP course class",`. `TranslatedExamLanding` does not render `ExamClassFaq`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check `/es/test-examen-cap` is emitted once, hreflang `es-ES`,
x-default to itself). Class questions import `lib/banks/all`. No redirects. Every `/es/` path is
Spanish in `lib/urlLanguage.ts`; the static `app/es/test-examen-cap` wins over `app/es/[slug]`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. Sets are 24 to 60 (set 3 is exactly 60, at
`TRAINING_PART_MAX`, so no parts).

## tools/build_exam_sources.py

Run `python3 -I tools/build_exam_sources.py` so `lib/examSources.json` picks up
`tools/next100/escapcond/sources.md` (first three URLs: the RD 284/2021 consolidated text, its
BOE PDF and RD 487/2026).

## lib/examFreshness.json

```json
{ "exam": "escapcond", "date": "2026-11-06", "kind": "law", "change": "Real Decreto 487/2026 (in force 18 September 2026) renumbers Annex I of RD 284/2021 to Directive (EU) 2022/2561 and adds online (aula virtual) course hours; Anexo V is unchanged.", "action": "Check the consolidated Annex I wording against the bank's categories when the BOE consolidation is complete.", "source": "https://www.boe.es/eli/es/rd/2026/06/17/487", "done": true },
{ "exam": "escapcond", "date": "2027-07-01", "kind": "review", "change": "Yearly check of Reg. 561/2006 and 165/2014 amendments (smart tachograph scope for light commercial vehicles from July 2026) and of the convocatorias' format.", "action": "Re-read the regulations and two current convocatorias; update the bank and landing.", "source": "https://www.boe.es/buscar/act.php?id=BOE-A-2021-6624" }
```
(Adapt to the file's field names.)

## Screenshots

`TranslatedExamLanding` reads `/landing/escapcond-{mobile,desktop}-es.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing escapcond:examen-cap:22701`
then rename to the `-es` names, as for detheorie.

## CLAUDE.md (after the esdgt bullet)

```md
- **Examen CAP inicial** (`escapcond`, Spain's Driver CPC initial qualification exam for truck and bus drivers, native Spanish exam, `language: "es"`, `locale: "es-ES"`, English names in `english`, `review: { es: "model" }`, `/examen-cap/*`, landing `/es/test-examen-cap` from `lib/landings/escapcond.es.json`): `data/es-cap-conductores-questions.json` (200 original questions written in Spanish on the Annex I A objectives of Real Decreto 284/2021: cadena cinemática y conducción económica 24, frenos y sistemas de seguridad 24, riesgos del tráfico 16, tiempos de conducción y descanso (Reg. 561/2006 with the Mobility Package) 24, tacógrafo, tiempo de trabajo y formación continua 20, salud, ergonomía y accidentes de trabajo 24, emergencias, delincuencia e imagen de empresa 20, mercancías (carga útil, estiba, documento de control, CMR, cabotaje, ATP/ADR) 24, viajeros (voladizo, transporte escolar, cinturones, Reg. 181/2011) 24), four 50-question tests (IDs 22701-22704, 6/6/4/6/5/6/5/6/6 per test: 38 common + 6 goods + 6 passengers, no spares) and five Spanish-named topic sets 22701-22705 (the last two are the specialities), 9 dashboard steps, state `ESCAPCOND`, prefix `ESCAP-`, 67% pass (34 of 50, the real 50 net points when every question is answered). The real exam (RD 284/2021 Anexo V, unchanged by RD 487/2026): after a 280-hour or 140-hour course, 100 questions with four options in at least 2 hours, +1 / -0,5 / blank 0, pass at 50 points, 25 questions on the candidate's own speciality, run by each comunidad autónoma at least six times a year; the penalty and the single-speciality split are not modelled. No fines, fees or alcohol figures. Built by `tools/next100/escapcond/build.py` (sorts all-number options with Spanish decimal commas and thousands points); sources in `tools/next100/escapcond/sources.md`, terms in `glossary.md`. Region ES, hub group "EU driving theory tests" (after esdgt), `[data-theme="escapcond"]` deep bronze brown, borrows the CDL tiger.
```

## Decisions for the integrator

1. **Speciality split.** The real exam has 75 common + 25 of the candidate's speciality. v1
   blueprints are the same for every test, so each test mixes 6 goods and 6 passenger items;
   sets 4 and 5 let a candidate train only their speciality. The landing and FAQ say so.
2. **Pass mark.** 67 (34 of 50) = 50 net points with +1/-0,5 answering everything. Someone who
   leaves blanks needs fewer right answers in the real exam; the landing explains it.
3. **Facts not confirmed** (left out of all copy): 3 reserve questions; the exam languages
   (co-official languages in some communities); a separate 25-question renewal route (only the
   art. 16.3 speciality extension, which is the speciality part of the exam, was confirmed).
4. **Annex I renumbering.** RD 487/2026 (in force 18 Sept 2026) renumbers Annex I objectives to
   Directive (EU) 2022/2561; the landing names topics, not numbers, and the bank comments give
   both numberings.
5. **Hue.** `30 85% 20%` (see globals.css above); the suggested hue clashed with four themes.
6. **Hub group.** EU driving group after esdgt (as the siblings' WIRING assumes), or a new
   "Spain professional driver tests" group.
