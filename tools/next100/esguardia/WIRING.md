# Wiring for `esguardia` (Guardia Civil entrance exam, Escala de Cabos y Guardias, written in Spanish, v1)

A native-language exam (base bank and copy in Spanish, `language: "es"`, `locale: "es-ES"`),
copied end to end from `detheorie` (and `de34a` for the non-driving, teacher-led parts). Files
already written by the builder:
- `data/es-guardia-civil-questions.json` (200, validator PASS with `--lang es`)
- `lib/banks/esguardia.ts`
- `app/oposiciones-guardia-civil/*` (5 wrappers: layout, redirect, dashboard, drill, stats)
- `lib/landings/esguardia.es.json` (Spanish landing content, Spanish `facts.source`)
- `app/es/test-oposiciones-guardia-civil/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `es`)
- `tools/next100/esguardia/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/esguardia/build.py`. Validate with
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/es-guardia-civil-questions.json --lang es --pool esgcDerechos=24 --pool esgcConstitucion=24 --pool esgcInternacional=16 --pool esgcPenal=32 --pool esgcProcesal=24 --pool esgcAdministrativo=24 --pool esgcSeguridad=24 --pool esgcInstituto=16 --pool esgcTecnico=16`.
Everything below goes in shared files.

Format note (BOE-A-2026-9982, read 2026-11-06): the prueba de conocimientos lasts 140 minutes in
all and has four parts: ortografía (apto/no apto, six or more errors fail), gramática (20
sentences, same rule), conocimientos generales (100 test questions from the temario, four
options, one valid, wrong answers penalise and blanks do not, 0 to 100, minimum 50) and inglés
(20 questions, minimum 8 of 20). The formula is Px = Y/T [A - E/(N-1)] with N = 4, so each wrong
answer cancels a third of a right one. Tigertest models only the conocimientos generales part:
four 50-question tests (half the real 100) of single best answers, without the penalty, so
`passPct: 63` (32 of 50) is the real 50-point minimum when every question is answered (62.5 of
100 right). Training is by topic: 5 sets (22401-22405, all 200 items) + 4 tests = 9 dashboard steps.

## lib/exams.ts

Add `"esguardia"` to the `ExamId` union. Icon `shield` already exists. 22401-22405 are free
(highest existing idBase is 21900, aswbclin's move; the next100 WIRING files use 22100 for de34a;
grep showed nothing in 22400-22499).

```ts
const esguardia: ExamConfig = {
  id: "esguardia",
  stateCode: "ESGUARDIA",
  idBase: 22400,
  slug: "/oposiciones-guardia-civil",
  landingPath: "/es/test-oposiciones-guardia-civil",
  name: "Test oposiciones Guardia Civil",
  shortName: "Oposiciones Guardia Civil",
  examLabel: "Prueba de conocimientos de la Guardia Civil",
  fullName: "Oposiciones a la Escala de Cabos y Guardias de la Guardia Civil: prueba de conocimientos",
  questionIdPrefix: "ESGC-",
  icon: "shield",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 63,
  language: "es",
  locale: "es-ES",
  english: {
    name: "Guardia Civil Entrance Exam (Spain)",
    shortName: "Guardia Civil exam",
    fullName: "Spanish Guardia Civil entrance exam (Escala de Cabos y Guardias), knowledge test, in Spanish",
  },
  review: { es: "model" },
  // Real exam (Resolución 160/38243/2026, BOE 8 May 2026, BOE-A-2026-9982; checked 2026-11-06):
  // prueba de conocimientos of 140 minutes with ortografía, gramática (apto/no apto), 100
  // conocimientos generales questions (4 options, one valid, Px = Y/T [A - E/(N-1)], blanks score
  // nothing, 0 to 100, minimum 50) and 20 English questions (minimum 8). Temario: Resolución de 3
  // de octubre de 2022, updated 29 May 2023, 25 temas; temas 24 (inglés) and 25 (lengua) are the
  // separate parts. Categories group temas 1 to 23; the 6/6/4/8/6/6/6/4/4 split is Tigertest's (no
  // official weights). Four tests of 50, pools exactly 4x each count, all original, written in
  // Spanish. No penalty applied, so passPct 63 (32 of 50) = the 50-point minimum answering all.
  blueprint: {
    esgcDerechos: 6,
    esgcConstitucion: 6,
    esgcInternacional: 4,
    esgcPenal: 8,
    esgcProcesal: 6,
    esgcAdministrativo: 6,
    esgcSeguridad: 6,
    esgcInstituto: 4,
    esgcTecnico: 4,
  },
  // Five topic sets, not testSets(): 5 + 4 tests = 9 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 22401, name: "Derechos humanos, igualdad y Constitución", categories: ["esgcDerechos", "esgcConstitucion"], size: 48, weightLabel: "12 de 50 preguntas por test" },
    { setNumber: 2, id: 22402, name: "Derecho penal, menores y violencia de género", categories: ["esgcPenal"], size: 32, weightLabel: "8 de 50 preguntas por test" },
    { setNumber: 3, id: 22403, name: "Derecho procesal penal", categories: ["esgcProcesal"], size: 24, weightLabel: "6 de 50 preguntas por test" },
    { setNumber: 4, id: 22404, name: "Derecho administrativo y seguridad", categories: ["esgcAdministrativo", "esgcSeguridad"], size: 48, weightLabel: "12 de 50 preguntas por test" },
    { setNumber: 5, id: 22405, name: "Guardia Civil, instituciones y materias técnicas", categories: ["esgcInstituto", "esgcInternacional", "esgcTecnico"], size: 48, weightLabel: "12 de 50 preguntas por test" },
  ],
  categoryLabels: {
    esgcDerechos: "Derechos humanos, igualdad y deontología",
    esgcConstitucion: "Derecho constitucional",
    esgcInternacional: "Unión Europea e instituciones internacionales",
    esgcPenal: "Derecho penal, menores y violencia de género",
    esgcProcesal: "Derecho procesal penal",
    esgcAdministrativo: "Derecho civil, administrativo y protección de datos",
    esgcSeguridad: "Seguridad, extranjería, armas y contrabando",
    esgcInstituto: "Fuerzas y Cuerpos de Seguridad y Guardia Civil",
    esgcTecnico: "Riesgos laborales, protección civil, TIC y topografía",
  },
  copy: {
    guestPrompt: "para guardar tu progreso en la oposición y no perder ninguna pregunta fallada",
    trainingHeading: "Bloques de repaso",
    trainingSub: "Cada bloque cubre varios temas del temario oficial. Ves la respuesta al momento y las preguntas que fallas vuelven hasta que las dominas.",
    testsHeading: "Test · 50 preguntas, 32 para el mínimo",
    heroSubs: [
      "Cinco bloques de repaso y cuatro test. Derecho penal es el bloque que más preguntas pone.",
      "Domina el bloque y después haz el test.",
      "Vas por la mitad. Haz un test completo.",
      "Repasa tus fallos y vuelve a hacer el test.",
      "Todo en verde. A por la prueba de conocimientos.",
    ],
    sourceLine: "Según el temario oficial de la Escala de Cabos y Guardias (2022, actualizado en 2023) y las leyes vigentes en noviembre de 2026. Preguntas propias, no de exámenes oficiales; sin la penalización de un tercio por error.",
    analyticsKey: "esguardia",
  },
};
```

Append `esguardia` to `EXAMS` after the Spanish/EU driving exams (or with the other police exams).
`ExamDashboard` shows topic sets first, then the tests (like detheorie and de34a).

## lib/banks/all.ts

```ts
import "./esguardia";
```

## types/index.ts

- `QuestionType`: add `| "ESGUARDIA"`.
- `QuestionCategory`, under a `// Spain Guardia Civil entrance exam (esguardia)` comment:

```ts
  | "esgcDerechos"
  | "esgcConstitucion"
  | "esgcInternacional"
  | "esgcPenal"
  | "esgcProcesal"
  | "esgcAdministrativo"
  | "esgcSeguridad"
  | "esgcInstituto"
  | "esgcTecnico"
```

## i18n

If `ResultsHeroDebrief` and `/stats` already prefer `exam.categoryLabels` (they do since phase 0),
nothing is needed. Otherwise add the Spanish labels above to `i18n/es.ts` and these to `i18n/en.ts`:

```ts
    esgcDerechos: "Human Rights, Equality & Ethics",
    esgcConstitucion: "Constitutional Law",
    esgcInternacional: "EU & International Bodies",
    esgcPenal: "Criminal Law",
    esgcProcesal: "Criminal Procedure",
    esgcAdministrativo: "Civil, Administrative & Data Law",
    esgcSeguridad: "Public Security, Arms & Customs",
    esgcInstituto: "Police Forces & Guardia Civil",
    esgcTecnico: "Safety, Civil Protection, ICT & Topography",
```

## lib/shuffleOptions.ts

No position-dependent options ("Todas las anteriores", "A y B", "Ambas"); the build asserts it.

## app/globals.css

The suggested `145 45% 26%` clashes with `iedtt` (142 40% 28%), `jambmath` (151 45% 30%) and
`ppsc` (145 55% 33.7%). Scanning every light theme, the only clash-free greens near 145 are at
20 to 25% saturation and 30% lightness: proposed `143 25% 30%` (muted bottle green, close to the
Guardia Civil's uniform). White text well above 4.5:1. The Spain siblings (espolicia,
esvigilante, escapcond) pick hues at the same time; check them. Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Spain Guardia Civil entrance exam (oposiciones, Escala de Cabos y Guardias) theme */
  [data-theme="esguardia"] {
    --brand: 143 25% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 143 30% 95%;
    --brand-hover: 143 25% 25%;
    --brand-dark: 143 25% 21%;
    --brand-darker: 143 25% 15%;
    --brand-muted: 143 15% 62%;
    --brand-border: 143 18% 78%;
    --brand-border-light: 143 22% 88%;
    --brand-gradient-to: 143 35% 91%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `esguardia: "Four 50-question tests in Spanish for the Guardia Civil entrance exam (oposiciones, Escala de Cabos y Guardias), knowledge part: human rights and equality, the Constitution, EU law, criminal law and procedure, administrative and data protection law, public security, arms and customs, the Guardia Civil's own laws and history, and civil protection and topography, written from the official temario as of November 2026.",`
- `EXAM_ORG`: `esguardia: "Dirección General de la Guardia Civil · Escala de Cabos y Guardias, convocatoria in the BOE, in Spanish",`
- Hub group: a new Spain group for non-driving tests, right after `"EU driving theory tests"` (which
  holds esdgt; escapcond, a licence category, belongs in the driving group). The Spain siblings
  espolicia and esvigilante go in the same group; agree one title across the WIRING files:
  `{ title: "Spain police and security exams", ids: ["espolicia", "esguardia", "esvigilante"] },` (the same line is in the espolicia and esvigilante WIRING files; add it once)
  `RELATED_OVERRIDES`: `esguardia: ["espolicia", "esvigilante", "police", "ngpolice"],` (drop the
  last two once the Spain group has its siblings).
- `SEARCH_ALIASES` (Spanish and English):
  `esguardia: "oposiciones guardia civil oposicion guardia civil test guardia civil examen guardia civil temario guardia civil prueba de conocimientos guardia civil escala de cabos y guardias cabos y guardias guardia civil 2026 test por temas preguntas guardia civil psicotecnico guardia civil oposiciones fuerzas y cuerpos de seguridad benemerita spain guardia civil exam spanish civil guard entrance exam guardia civil test spain police exam spanish police entrance test",`
- Native name on Spanish surfaces, `english.name` elsewhere.

## lib/region.ts

`TEST_REGIONS.esguardia = "ES"`. Region ES already exists (esdgt). NOT a driving test, so add
`esguardia` to `NON_DRIVING_TESTS`. `REGION_HOME.ES` is driving-only copy; once the Spain
non-driving tests ship, consider a second sentence in `testsSub` (integrator's call), e.g.
"Y test para las oposiciones a Guardia Civil y Policía Nacional." `faqsFor("ES")` counts the
non-driving tests on its own (`others`), so nothing else is needed.

## lib/landingContent.ts

```ts
import esguardiaEs from "@/lib/landings/esguardia.es.json";
  "esguardia.es": esguardiaEs as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  esguardia: {
    answer:
      "The Guardia Civil entrance exam (oposiciones a la Escala de Cabos y Guardias) is called each year by the Dirección General de la Guardia Civil in Spain's official gazette, the BOE; the 2026 call offered 3,240 places and its first test was held on 11 July 2026 at 20 venues. The knowledge test lasts 140 minutes in all and has four parts: a spelling test and a grammar test of 20 sentences, both pass or fail (six or more errors fail); 100 multiple-choice questions on the official syllabus, each with four options and one correct answer, scored 0 to 100 with a minimum of 50; and 20 English questions, with a minimum of 8. Wrong answers are penalised (each cancels a third of a right one) and blank answers are not. The same day candidates take a psychotechnical test; physical tests, an interview, a medical and a merit assessment follow. The syllabus has 25 topics: human rights, equality, the Constitution, EU law, criminal and procedural law, administrative and data protection law, immigration, public and private security, the Guardia Civil's own laws and history, ethics, juvenile justice, gender violence, arms and explosives, customs, civil protection, ICT and topography, English and Spanish. The exam is in Spanish.",
    rows: [
      { label: "Run by", value: "Dirección General de la Guardia Civil (Ministry of the Interior), call in the BOE" },
      { label: "Knowledge questions", value: "100, four options, one correct" },
      { label: "Marking", value: "Wrong answers cost a third; blanks score nothing" },
      { label: "Minimum", value: "50 of 100 points" },
      { label: "Time", value: "140 minutes for the whole knowledge test" },
      { label: "Other parts", value: "Spelling, grammar (pass/fail), English (8 of 20)" },
      { label: "Places (2026)", value: "3,240" },
      { label: "Language", value: "Spanish" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Spanish, 32 to pass" },
    ],
    basedOn: "Resolución 160/38243/2026 (BOE 8 May 2026), the Guardia Civil temario of 3 October 2022 as updated on 29 May 2023, and the laws it lists as in force, checked November 2026",
    source: { name: "BOE: Guardia Civil Escala de Cabos y Guardias call, 2026", url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-9982" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Spanish)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave. Run
`npx tsx scripts/build-landing-dates.ts` after committing.

## lib/tigerAssets.ts

`BORROWED_SETS`: `esguardia: "police",`

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx (teacher-led)

Most candidates prepare with an academia (Adams, Jesús Ayala, MAD and others run classes), so add
`"esguardia"` to `TEACHER_LED`, and to `TEACHES`:
`esguardia: "a Guardia Civil oposiciones class",`
As for de34a, `TranslatedExamLanding` does not render `ExamClassFaq` (no class FAQ on the Spanish
landing); the nudge and `/teach` still work. If class-FAQ support is added there, it needs Spanish copy.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check `/es/test-oposiciones-guardia-civil` is emitted once, hreflang
`es-ES`, x-default to itself). Class questions import `lib/banks/all`. No redirects. Check
`lib/pageLanguage.ts` / `lib/urlLanguage.ts` treat `/es/test-oposiciones-guardia-civil` as Spanish
(every `/es/` path is) and that the static route wins over `app/es/[slug]`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. Sets are 24 to 48, so no parts.

## tools/build_exam_sources.py

Run `python3 -I tools/build_exam_sources.py` so `lib/examSources.json` picks up
`tools/next100/esguardia/sources.md` (first three URLs: the 2026 BOE call, the Interior page, the
Redopositor structure guide).

## lib/examFreshness.json

```json
{ "exam": "esguardia", "date": "2027-05-01", "kind": "notice", "change": "Next Guardia Civil call (convocatoria) expected in spring 2027; check the format, the temario resolution it cites and the minimum marks.", "action": "Re-read the new BOE call and update the landing, examFacts and sources.md.", "source": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-9982" },
{ "exam": "esguardia", "date": "2026-12-31", "kind": "law", "change": "Ministry of the Interior project 15/2026 to modify the Reglamento de Armas (RD 137/1993).", "action": "If approved, re-check ESGC-SEG items on licences and the guía de pertenencia.", "source": "https://www.interior.gob.es/opencms/pdf/servicios-al-ciudadano/participacion-ciudadana/Participacion-publica-en-proyectos-normativos/Audiencia-e-informacion-publica/15_2026_Proyecto_Modificacion_Reglamento_Armas.pdf" }
```
(Adapt to the file's field names.)

## Screenshots

`TranslatedExamLanding` reads `/landing/esguardia-{mobile,desktop}-es.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing esguardia:oposiciones-guardia-civil:22401`
then rename to the `-es` names, as for detheorie.

## CLAUDE.md (after the esdgt bullet, or in a "Spain police and security exams" line)

```md
- **Oposiciones Guardia Civil** (`esguardia`, the knowledge part of the Guardia Civil entrance exam, Escala de Cabos y Guardias, native Spanish exam, `language: "es"`, `locale: "es-ES"`, English names in `english`, `review: { es: "model" }`, `/oposiciones-guardia-civil/*`, landing `/es/test-oposiciones-guardia-civil` from `lib/landings/esguardia.es.json`): `data/es-guardia-civil-questions.json` (200 original questions written in Spanish on temas 1 to 23 of the official temario, Resolución de 3 de octubre de 2022 updated 29 May 2023: derechos humanos, igualdad y deontología 24, Constitución, Defensor del Pueblo y LO 1/1982 24, UE e instituciones internacionales 16, Código Penal, LO 5/2000 y LO 1/2004 32, LECrim, habeas corpus, Policía Judicial y Estatuto de la víctima 24, Código Civil, Leyes 39/2015 y 40/2015 y LO 3/2018 24, LO 4/2015, Ley 5/2014, extranjería, armas y contrabando 24, LO 2/1986, Ley 29/2014, LO 11/2007 e historia 16, PRL, protección civil, TIC y topografía 16), four 50-question tests (IDs 22401-22404, 6/6/4/8/6/6/6/4/4 per test, Tigertest's split, no spares) and five Spanish-named topic sets 22401-22405, 9 dashboard steps, state `ESGUARDIA`, prefix `ESGC-`, 63% pass (32 of 50, the real 50-point minimum when every question is answered). The real exam (Resolución 160/38243/2026, BOE 8 May 2026, 3,240 places, first test 11 July 2026): 140 minutes for ortografía and gramática (apto/no apto), 100 conocimientos questions (4 options, Px = Y/T [A - E/3], blanks score nothing, minimum 50 of 100) and 20 English questions (minimum 8); then the psicotécnica, physical tests, interview, medical and merits, none modelled, nor the penalty. Spanish law as of November 2026; no fines, fees or contraband thresholds; no officeholders. Kept clear of `espolicia` (shared Constitution, criminal law and procedure facts were split; GC items lean on the Guardia Civil's own laws). Built by `tools/next100/esguardia/build.py`; sources in `tools/next100/esguardia/sources.md`, terms in `glossary.md`. Region ES, hub group "Spain police and security exams", `[data-theme="esguardia"]` muted bottle green, borrows the police tiger, teacher-led (academias).
```

## Decisions for the integrator

1. **Time.** The research notes said 90 to 95 minutes for the 100 questions; the BOE gives 140
   minutes for the whole knowledge test (four parts) and no time for the 100 questions alone. All
   copy says 140 minutes for the whole test.
2. **Pass mark.** 63 (32 of 50) = the real 50-point minimum with the A - E/3 penalty when every
   question is answered. The landing and FAQ say the cut-off in practice is higher.
3. **Hue.** `145 45% 26%` clashed with iedtt, jambmath and ppsc; proposed `143 25% 30%`. No clash with
   the Spain siblings (espolicia 222, esvigilante 266, escapcond 30).
4. **espolicia overlap.** espolicia's bank on disk (2026-11-06) covered many of the same
   Constitution, LECrim, habeas corpus, LO 4/2015 and Ley 5/2014 facts. I replaced 15 of my items
   with other facts (arts. 8, 10.2, 25.3, 28.1, 29.2, 55.2, 116.3 and 162 of the Constitution,
   LECrim 261 and 520, the CEDH art. 2.2 rule on force, the Valdemoro college, and so on). A final cross-check against espolicia, esvigilante and escapcond as on disk (2026-11-06,
   stem plus key similarity) found one shared fact and answer (EU citizen over three months:
   Registro de Extranjeros, ESPN-EXT-002); ESGC-SEG-012 now asks about the TIE (LO 4/2000 art. 4.2). The fuzzy stem
   check left only DUDH (theirs: the organ; mine: the year and the legal form) and the LO 2/1986
   functions (theirs: Policía Nacional's; mine: the Guardia Civil's).
5. **Facts for a native reviewer to spot-check:** ESGC-PEN-032 (LO 8/2021 vicarious violence
   wording in LO 1/2004), ESGC-SEG-014 (name "Intervención de Armas y Explosivos"), ESGC-INS-008/009
   (empleos under Ley 29/2014), ESGC-TEC-004 (Consejo Nacional de Protección Civil), ESGC-PRO-009
   (art. 520 bis prórroga).
6. **Teacher-led** with no class FAQ on the Spanish landing (component limitation, as de34a).
