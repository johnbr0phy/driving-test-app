# Wiring for `esvigilante` (Spain private security guard exam, vigilante de seguridad, written in Spanish, v1)

A native-language exam (base bank and copy in Spanish, `language: "es"`, `locale: "es-ES"`),
copied end to end from `detheorie`, with the Spanish shape of its sibling `esguardia`. Files
already written by the builder:
- `data/es-vigilante-seguridad-questions.json` (200, validator PASS with `--lang es`)
- `lib/banks/esvigilante.ts`
- `app/vigilante-de-seguridad/*` (5 wrappers: layout, redirect, dashboard, drill, stats)
- `lib/landings/esvigilante.es.json` (Spanish landing content, Spanish `facts.source`)
- `app/es/test-vigilante-de-seguridad/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `es`)
- `tools/next100/esvigilante/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/esvigilante/build.py`. Validate with
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/es-vigilante-seguridad-questions.json --lang es --pool esvigConstitucion=16 --pool esvigPenal=32 --pool esvigProcesal=20 --pool esvigSegPrivada=32 --pool esvigLaboral=12 --pool esvigSocioprof=20 --pool esvigTecnico=36 --pool esvigInstrumental=32`.
Everything below goes in shared files.

Format note (BOE-A-2026-813, read 2026-11-06): the bases of 9 January 2026 set the 2026 calls
(01, 02 and 03/2026). The knowledge test for vigilante de seguridad is a cuestionario of 100
questions with three alternatives and one valid answer, in 50 minutes, on the common programme of
Anexo III; scored [A - E/(n-1)] x 10/P with n = 3 (each error cancels half a right answer,
blanks score nothing), 0 to 10, minimum 5. Physical tests (apto / no apto) are eliminatory. The
research note said 100 questions in 50 minutes with 3 alternatives: confirmed. Tigertest models
four 50-question tests (half the real 100) of single best answers with four options and no
penalty, so `passPct: 67` (34 of 50) is the real 5 of 10 when every question is answered (67 of
100 right). Training by area: 5 sets (22601-22605, all 200 items) + 4 tests = 9 dashboard steps.

## lib/exams.ts

Add `"esvigilante"` to the `ExamId` union. Icon `shield` already exists. 22601-22605 are free
(esguardia 22400, espolicia 22500; grep found nothing in 22600-22699).

```ts
const esvigilante: ExamConfig = {
  id: "esvigilante",
  stateCode: "ESVIGIL",
  idBase: 22600,
  slug: "/vigilante-de-seguridad",
  landingPath: "/es/test-vigilante-de-seguridad",
  name: "Test vigilante de seguridad",
  shortName: "Vigilante de seguridad",
  examLabel: "Prueba de conocimientos de vigilante de seguridad",
  fullName: "Pruebas de selección para vigilante de seguridad privada: prueba de conocimientos",
  questionIdPrefix: "ESVIG-",
  icon: "shield",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 67,
  language: "es",
  locale: "es-ES",
  english: {
    name: "Spain Private Security Guard Exam (Vigilante de Seguridad)",
    shortName: "Spain security guard exam",
    fullName: "Spanish private security guard (vigilante de seguridad) licence exam, knowledge test, in Spanish",
  },
  review: { es: "model" },
  // Real exam (Resolución de 9 de enero de 2026, Secretaría de Estado de Seguridad, BOE 14 Jan
  // 2026, BOE-A-2026-813; checked 2026-11-06): calls 01, 02 and 03/2026; cuestionario of 100
  // questions, 3 alternatives, one valid, 50 minutes, on the Anexo III common programme;
  // [A - E/(n-1)] x 10/P with n = 3, 0 to 10, minimum 5; physical tests apto / no apto.
  // Categories follow Anexo III's four areas (jurídica split in five); the 4/8/5/8/3/5/9/8 split
  // is Tigertest's. Four tests of 50, pools exactly 4x each count, all original, written in
  // Spanish. Four options and no penalty, so passPct 67 (34 of 50) = the 5 of 10 answering all.
  blueprint: {
    esvigConstitucion: 4,
    esvigPenal: 8,
    esvigProcesal: 5,
    esvigSegPrivada: 8,
    esvigLaboral: 3,
    esvigSocioprof: 5,
    esvigTecnico: 9,
    esvigInstrumental: 8,
  },
  // Five area sets, not testSets(): 5 + 4 tests = 9 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 22601, name: "Constitución y Derecho penal", categories: ["esvigConstitucion", "esvigPenal"], size: 48, weightLabel: "12 de 50 preguntas por test" },
    { setNumber: 2, id: 22602, name: "Derecho procesal y seguridad privada", categories: ["esvigProcesal", "esvigSegPrivada"], size: 52, weightLabel: "13 de 50 preguntas por test" },
    { setNumber: 3, id: 22603, name: "Derecho laboral y área socio-profesional", categories: ["esvigLaboral", "esvigSocioprof"], size: 32, weightLabel: "8 de 50 preguntas por test" },
    { setNumber: 4, id: 22604, name: "Área técnico-profesional", categories: ["esvigTecnico"], size: 36, weightLabel: "9 de 50 preguntas por test" },
    { setNumber: 5, id: 22605, name: "Área instrumental", categories: ["esvigInstrumental"], size: 32, weightLabel: "8 de 50 preguntas por test" },
  ],
  categoryLabels: {
    esvigConstitucion: "Derecho constitucional y Unión Europea",
    esvigPenal: "Derecho penal",
    esvigProcesal: "Derecho procesal penal",
    esvigSegPrivada: "Seguridad privada y protección de datos",
    esvigLaboral: "Derecho laboral, prevención y práctica jurídica",
    esvigSocioprof: "Área socio-profesional",
    esvigTecnico: "Área técnico-profesional",
    esvigInstrumental: "Área instrumental",
  },
  copy: {
    guestPrompt: "para guardar tu progreso hacia la TIP y no perder ninguna pregunta fallada",
    trainingHeading: "Bloques de repaso",
    trainingSub: "Cada bloque cubre un área del programa oficial. Ves la respuesta al momento y las preguntas que fallas vuelven hasta que las dominas.",
    testsHeading: "Test · 50 preguntas, 34 para el 5",
    heroSubs: [
      "Cinco bloques de repaso y cuatro test. Seguridad privada y Derecho penal son lo que más pesa.",
      "Domina el bloque y después haz el test.",
      "Vas por la mitad. Haz un test completo.",
      "Repasa tus fallos y vuelve a hacer el test.",
      "Todo en verde. A por la prueba de conocimientos.",
    ],
    sourceLine: "Según el programa del anexo III de las bases de 2026 y la Ley 5/2014 de Seguridad Privada, vigentes en noviembre de 2026. Preguntas propias, no de exámenes oficiales; cuatro respuestas y sin la penalización de medio acierto por error.",
    analyticsKey: "esvigilante",
  },
};
```

Append `esvigilante` to `EXAMS` after `espolicia` (the Spain police and security group).
`ExamDashboard` shows topic sets first, then the tests (like detheorie and esguardia).

## lib/banks/all.ts

```ts
import "./esvigilante";
```

## types/index.ts

- `QuestionType`: add `| "ESVIGIL"`.
- `QuestionCategory`, under a `// Spain private security guard exam (esvigilante)` comment:

```ts
  | "esvigConstitucion"
  | "esvigPenal"
  | "esvigProcesal"
  | "esvigSegPrivada"
  | "esvigLaboral"
  | "esvigSocioprof"
  | "esvigTecnico"
  | "esvigInstrumental"
```

## i18n

`ResultsHeroDebrief` and `/stats` prefer `exam.categoryLabels` since phase 0, so nothing is
needed. If a dictionary still needs them, the Spanish labels are above and these go in `i18n/en.ts`:

```ts
    esvigConstitucion: "Constitutional & EU Law",
    esvigPenal: "Criminal Law",
    esvigProcesal: "Criminal Procedure",
    esvigSegPrivada: "Private Security Law & Data Protection",
    esvigLaboral: "Employment Law, Safety & Reports",
    esvigSocioprof: "Professional Conduct & Communication",
    esvigTecnico: "Security Systems & Procedures",
    esvigInstrumental: "Fire, First Aid, Radio & Firearms Safety",
```

## lib/shuffleOptions.ts

No position-dependent options ("Todas las anteriores", "A y B", "Ambas"); the build asserts it.

## app/globals.css

The suggested `265 35% 30%` clashes with `aurcg` (269 40% 30%) and `aatl2` (270 25% 32%).
Checked against every light theme in `app/globals.css` plus the pending WIRING hues (de34a
258 35% 28%, cisa 250 20% 32%, espolicia 222 85% 22%, esguardia 143 25% 30%): proposed
`266 60% 30%` (deep violet). Nearest themes: zapsira 270 55% 22% (8 points of lightness,
exactly at the rule's edge), phpsychom 265 70% 22% (8 of lightness), aurcg 269 40% 30% (20 of
saturation), ssccgl 268 80% 37% (20 of saturation), de34a 258 35% 28% (25 of saturation).
Fallback if the integrator wants more room: `290 20% 30%` (grey plum, clear of every theme).
White text well above 4.5:1. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Spain private security guard exam (vigilante de seguridad) theme */
  [data-theme="esvigilante"] {
    --brand: 266 60% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 266 45% 96%;
    --brand-hover: 266 60% 25%;
    --brand-dark: 266 60% 21%;
    --brand-darker: 266 60% 15%;
    --brand-muted: 266 25% 64%;
    --brand-border: 266 30% 80%;
    --brand-border-light: 266 35% 89%;
    --brand-gradient-to: 266 50% 92%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `esvigilante: "Four 50-question tests in Spanish for Spain's private security guard exam (vigilante de seguridad), the knowledge test for the TIP licence: the Constitution, criminal law and procedure, the Private Security Act (Ley 5/2014), employment law, professional conduct, security systems and access control, fire, first aid, radio and firearms safety, written from the official 2026 programme.",`
- `EXAM_ORG`: `esvigilante: "Ministerio del Interior · Policía Nacional (Unidad Central de Seguridad Privada), vigilante de seguridad tests, in Spanish",`
- Hub group: the Spain non-driving group shared with the siblings (same title in esguardia and
  espolicia), right after `"EU driving theory tests"`:
  `{ title: "Spain police and security exams", ids: ["espolicia", "esguardia", "esvigilante"] },`
  `RELATED_OVERRIDES`: `esvigilante: ["espolicia", "esguardia", "security", "iepsa"],` (drop the
  last two once the group has its siblings).
- `SEARCH_ALIASES` (Spanish and English):
  `esvigilante: "vigilante de seguridad test vigilante de seguridad examen vigilante de seguridad vigilante seguridad privada tip vigilante tarjeta de identidad profesional habilitacion vigilante seguridad privada test ley 5/2014 ley de seguridad privada prueba de conocimientos vigilante pruebas vigilante policia nacional curso vigilante de seguridad escolta privado vigilante de explosivos guarda de seguridad segurata spain security guard exam spanish security guard licence spain private security licence vigilante exam",`
- Native name on Spanish surfaces, `english.name` elsewhere.

## lib/region.ts

`TEST_REGIONS.esvigilante = "ES"`. Region ES already exists (esdgt). NOT a driving test, so add
`esvigilante` to `NON_DRIVING_TESTS`. `REGION_HOME.ES` is driving-only copy; with the Spain
group live, the integrator may add a line to `testsSub`, e.g. "Y test para las oposiciones a
Guardia Civil y Policía Nacional y para vigilante de seguridad." `faqsFor("ES")` counts the
non-driving tests on its own.

## lib/landingContent.ts

```ts
import esvigilanteEs from "@/lib/landings/esvigilante.es.json";
  "esvigilante.es": esvigilanteEs as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  esvigilante: {
    answer:
      "To work as a private security guard (vigilante de seguridad) in Spain you need a licence (habilitación) and the professional ID card (TIP) issued through the Ministry of the Interior, which means passing the selection tests the Secretaría de Estado de Seguridad calls each year and the Policía Nacional runs. In 2026 there are three calls (01, 02 and 03/2026) under rules published in the BOE on 14 January 2026. Candidates first need the diploma of a pre-licence training course of at least 180 hours at an accredited centre. The knowledge test is 100 multiple-choice questions in 50 minutes on the official common programme, each with three options and one correct answer. Each wrong answer cancels half a right one and blank answers score nothing; the result is out of 10 and 5 is the pass mark. There are also eliminatory physical tests (pass or fail). The programme covers the Constitution, criminal law and procedure, the Private Security Act (Ley 5/2014), employment law, professional conduct and communication, security systems, access control and alarms, and fire, first aid, radio and firearms safety. The test is in Spanish.",
    rows: [
      { label: "Run by", value: "Ministry of the Interior (Secretaría de Estado de Seguridad), tests run by the Policía Nacional" },
      { label: "Questions", value: "100, three options, one correct" },
      { label: "Time", value: "50 minutes" },
      { label: "Marking", value: "Each wrong answer cancels half a right one; blanks score nothing" },
      { label: "Pass mark", value: "5 out of 10" },
      { label: "Other tests", value: "Physical tests, pass or fail" },
      { label: "Before the test", value: "Training course of at least 180 hours" },
      { label: "Calls (2026)", value: "Three: 01, 02 and 03/2026" },
      { label: "Language", value: "Spanish" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Spanish, 34 to pass" },
    ],
    basedOn: "Resolución de 9 de enero de 2026 of the Secretaría de Estado de Seguridad (BOE 14 January 2026), Ley 5/2014 de Seguridad Privada and the laws in the Anexo III programme as in force, checked November 2026",
    source: { name: "BOE: rules for the 2026 security guard tests", url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-813" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Spanish)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave. Run
`npx tsx scripts/build-landing-dates.ts` after committing.

## lib/tigerAssets.ts

`BORROWED_SETS`: `esvigilante: "security",` (the security guard tiger).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx (teacher-led)

Every candidate must first pass the curso de formación previa at an accredited training centre,
so add `"esvigilante"` to `TEACHER_LED`, and to `TEACHES`:
`esvigilante: "a vigilante de seguridad training course",`
As for esguardia, `TranslatedExamLanding` does not render `ExamClassFaq` (no class FAQ on the
Spanish landing); the nudge and `/teach` still work.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check `/es/test-vigilante-de-seguridad` is emitted once, hreflang
`es-ES`, x-default to itself). Class questions import `lib/banks/all`. No redirects. Every
`/es/` path is Spanish in `lib/pageLanguage.ts` / `lib/urlLanguage.ts`; the static route wins
over `app/es/[slug]`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. Sets are 32 to 52, so no parts.

## tools/build_exam_sources.py

Run `python3 -I tools/build_exam_sources.py` so `lib/examSources.json` picks up
`tools/next100/esvigilante/sources.md` (first three URLs: the 2026 BOE bases, its PDF, the
Redopositor guide).

## lib/examFreshness.json

```json
{ "exam": "esvigilante", "date": "2027-01-15", "kind": "notice", "change": "Bases for the 2027 vigilante de seguridad calls expected in January 2027; check the number of questions, time, alternatives and the Anexo III programme.", "action": "Re-read the new BOE resolution and update the landing, examFacts and sources.md.", "source": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-813" },
{ "exam": "esvigilante", "date": "2027-06-30", "kind": "law", "change": "A new Reglamento de Seguridad Privada to replace RD 2364/1994 has been pending since Ley 5/2014; check whether it has been approved.", "action": "If approved, re-check ESVIG-SPR items citing the Reglamento (armero, uniform, checks on taking over the post, loss of the weapon).", "source": "https://www.boe.es/buscar/act.php?id=BOE-A-1995-608" }
```
(Adapt to the file's field names.)

## Screenshots

`TranslatedExamLanding` reads `/landing/esvigilante-{mobile,desktop}-es.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing esvigilante:vigilante-de-seguridad:22601`
then rename to the `-es` names, as for detheorie and esguardia.

## CLAUDE.md (after the espolicia bullet, in the "Spain police and security exams" group)

```md
- **Test vigilante de seguridad** (`esvigilante`, the knowledge test of Spain's private security guard selection tests for the habilitación and TIP, native Spanish exam, `language: "es"`, `locale: "es-ES"`, English names in `english`, `review: { es: "model" }`, `/vigilante-de-seguridad/*`, landing `/es/test-vigilante-de-seguridad` from `lib/landings/esvigilante.es.json`): `data/es-vigilante-seguridad-questions.json` (200 original questions written in Spanish on the four areas of the common programme, Anexo III of the 2026 bases: Constitución y UE 16, Código Penal 32, LECrim (detención por particulares, flagrancia, denuncia, protección de pruebas) 20, Ley 5/2014, Reglamento de Seguridad Privada, licencia C y videovigilancia (LO 3/2018) 32, Estatuto de los Trabajadores, PRL y partes 12, área socio-profesional 20, área técnico-profesional 36, área instrumental (radio, detección, incendios, primeros auxilios, defensa personal, armas) 32), four 50-question tests (IDs 22601-22604, 4/8/5/8/3/5/9/8 per test, Tigertest's split, no spares) and five Spanish-named area sets 22601-22605, 9 dashboard steps, state `ESVIGIL`, prefix `ESVIG-`, 67% pass (34 of 50, the real 5 of 10 when every question is answered). The real test (Resolución de 9 de enero de 2026, BOE-A-2026-813, calls 01 to 03/2026, run by the Policía Nacional): 100 questions with three options in 50 minutes, [A - E/2] x 10/P, 0 to 10, minimum 5, after a training course of at least 180 hours; physical tests apto / no apto; ours have four options and no penalty, and the landing says so. Physical tests and the escolta and explosivos specialities are not modelled. Ley 5/2014 as consolidated (last change 2021) and RD 2364/1994 where still in force, as of November 2026; no fines, fees, weapon calibres or officeholders. Kept clear of `esguardia` and `espolicia` (shared Constitution, criminal law and procedure facts asked from other articles). Built by `tools/next100/esvigilante/build.py`; sources in `tools/next100/esvigilante/sources.md`, terms in `glossary.md`. Region ES, hub group "Spain police and security exams", `[data-theme="esvigilante"]` deep violet, borrows the security guard tiger, teacher-led (accredited training centres).
```

## Decisions for the integrator

1. **Format confirmed** from BOE-A-2026-813: 100 questions, 3 alternatives, 50 minutes, minimum
   5 of 10, each error half a right answer. The research note's "Catalonia has its own sittings"
   and "Catalan" were not confirmed: the bases mention no other language and list Tarragona as a
   national venue; the Generalitat's PCA/02/2026 is a separate control d'accés test. No copy
   mentions Catalonia.
2. **Pass mark.** 67 (34 of 50) = the real minimum with the A - E/2 penalty answering all 100.
3. **Hue.** `265 35% 30%` clashed with aurcg and aatl2; proposed `266 60% 30%` (zapsira and
   phpsychom are exactly 8 points of lightness away); fallback `290 20% 30%`.
4. **Facts for a native reviewer to spot-check:** ESVIG-SPR-010 (the security company guarantees training and updating,
   Ley 5/2014 art. 21.1.d), ESVIG-SPR-029 (trato incorrecto = leve,
   art. 58), ESVIG-SPR-028 (prescription 6 months, art. 56), ESVIG-PRO-012 (art. 268 LECrim),
   ESVIG-SOC-016 (the jefe de seguridad organises, directs and inspects staff and services, Ley 5/2014 art. 35.1.b).
5. **Teacher-led** with no class FAQ on the Spanish landing (component limitation, as esguardia).

## Review (2026-11-07)

Reviewer pass per `tools/next100/REVIEW.md`. Format re-read from BOE-A-2026-813 (100 questions,
three alternatives, 50 minutes, [A - E/(n-1)] x 10/P, minimum 5; course of at least 180 hours and
six teaching weeks; three calls 01, 02, 03/2026): landing, FAQ, examFacts and sources.md agree.
Ley 5/2014 (arts. 4, 8, 21, 26, 27, 30, 31, 32, 35, 40, 41, 42, 56, 58, 62) and RD 2364/1994
(arts. 71, 72, 82, 83, 87) re-read on boe.es. Changes: PEN-023 (duplicate of espolicia's
receptación item, now encubrimiento, art. 451 CP), SOC-016 (rebased on Ley 5/2014 art. 35),
SPR-032 (art. 72 RSP applies only where the entity has no responsable de seguridad), LAB-006
(explanation now quotes art. 8.6 as written), SPR-016 (key named the agresor), PEN-020 (stem),
PRO-018 (explanation: secciones de instrucción after LO 1/2025), CON-013, INS-025, TEC-016, and
number distractors on PRO-004, SPR-028, LAB-001 so the key is at an end slot in 4 of 6 sorted
items. No shared-file changes beyond those already listed above.
