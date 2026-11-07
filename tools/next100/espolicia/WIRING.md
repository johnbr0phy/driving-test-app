# Wiring for `espolicia` (Policía Nacional, Escala Básica: prueba de conocimientos, written in Spanish, v1)

A native-language exam like `detheorie`: the base bank and base copy are Spanish (`language: "es"`,
`locale: "es-ES"`). Files already written by the builder:
- `data/policia-nacional-questions.json` (200, validator PASS with `--lang es`)
- `lib/banks/espolicia.ts`
- `app/oposiciones-policia-nacional/*` (layout, redirect, dashboard, drill, stats; copied from `app/fuehrerschein-theorie/`)
- `lib/landings/espolicia.es.json` (Spanish landing content, with a Spanish `facts.source` pointing at the BOE)
- `app/es/test-oposiciones-policia-nacional/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `es`, `samples related`)
- `tools/next100/espolicia/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/espolicia/build.py`. Validate with
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/policia-nacional-questions.json --lang es --pool espnConstitucion=24 --pool espnAdministracion=20 --pool espnExtranjeria=12 --pool espnSeguridad=16 --pool espnPenal=24 --pool espnProcesal=12 --pool espnIgualdad=12 --pool espnSociales=28 --pool espnLengua=16 --pool espnInformatica=20 --pool espnArmasVial=16`.
Everything below goes in shared files.

Format note (sources.md, BOE-A-2026-15055 read 2026-11-06): the real knowledge test is 100
questions with three options (one correct) in 50 minutes on the 45-tema temario, scored
[A − E/(n−1)] × 10 / P (a wrong answer takes off half a right one), 0 to 10; at least 3 points and a
place among the best 1,75 candidates per open place (2.163 open of 2.704) to go on; eliminatory,
held in one sitting with the psicotécnicos. Tigertest models four 50-question tests (200 items, pools
exactly 4x each per-test count, every item in one test) with four options, equal weight and no
penalty, so `passPct: 70` (35 of 50) is Tigertest's target. The landing says the real test has
three options and penalises errors (as esdgt says it has three options). Psicotécnicos, physical
tests, medical and interview are not modelled. There is no separate spelling or English test in the
2026 bases (English A2 is an entry requirement; spelling is tema 37, in the bank).

## lib/exams.ts

Add `"espolicia"` to the `ExamId` union. Icon `badge` exists (police uses it). 22501-22506 are
free (highest idBase in `lib/exams.ts` is 21900; de34a takes 22100 in this wave; 22500 was
assigned to this exam). Set ids 22501-22506 share numbers with test ids 22501-22504 like the other
topic-set exams (detheorie, de34a).

```ts
const espolicia: ExamConfig = {
  id: "espolicia",
  stateCode: "ESPOLICIA",
  idBase: 22500,
  slug: "/oposiciones-policia-nacional",
  landingPath: "/es/test-oposiciones-policia-nacional",
  name: "Test Oposiciones Policía Nacional",
  shortName: "Policía Nacional",
  examLabel: "Prueba de conocimientos, Escala Básica",
  fullName: "Oposición a la Escala Básica de la Policía Nacional: prueba de conocimientos",
  questionIdPrefix: "ESPN-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  language: "es",
  locale: "es-ES",
  english: {
    name: "Spain National Police Entrance Exam (Escala Básica)",
    shortName: "Spain National Police exam",
    fullName: "Spain National Police entrance exam, Escala Básica knowledge test (oposiciones Policía Nacional), in Spanish",
  },
  review: { es: "model" },
  // Real exam (Resolución de 7 de julio de 2026 de la DGP, BOE núm. 167 de 10-07-2026,
  // BOE-A-2026-15055, base 6.1.1 and anexo I; checked 2026-11-06): knowledge test of 100 questions
  // with three options, 50 minutes, [A − E/(n−1)] × 10 / P, minimum 3 of 10 and the best 1,75 per
  // open place go on; eliminatory; same sitting as the psicotécnicos. 2.704 places (2.163 open,
  // 541 reserved). Temario of 45 temas: Ciencias Jurídicas 1-26, Ciencias Sociales 27-37,
  // Técnico-Científicas 38-45. No official weights: 30/11/9 per test follows the temas per block;
  // the split inside each block is Tigertest's. Four tests of 50, pools exactly 4x each count
  // (200, all original, written in Spanish). Four options, equal weight, no penalty; passPct 70
  // (35 of 50) is Tigertest's target, since the real cut-off is set by ranking.
  blueprint: {
    espnConstitucion: 6,
    espnAdministracion: 5,
    espnExtranjeria: 3,
    espnSeguridad: 4,
    espnPenal: 6,
    espnProcesal: 3,
    espnIgualdad: 3,
    espnSociales: 7,
    espnLengua: 4,
    espnInformatica: 5,
    espnArmasVial: 4,
  },
  // Six topic sets, not testSets(): 6 + 4 tests = 10 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 22501, name: "Constitución, Unión Europea y Administración", categories: ["espnConstitucion", "espnAdministracion"], size: 44, weightLabel: "11 de 50 preguntas por test" },
    { setNumber: 2, id: 22502, name: "Extranjería y seguridad ciudadana", categories: ["espnExtranjeria", "espnSeguridad"], size: 28, weightLabel: "7 de 50 preguntas por test" },
    { setNumber: 3, id: 22503, name: "Derecho Penal y Procesal", categories: ["espnPenal", "espnProcesal"], size: 36, weightLabel: "9 de 50 preguntas por test" },
    { setNumber: 4, id: 22504, name: "Igualdad y Ciencias Sociales", categories: ["espnIgualdad", "espnSociales"], size: 40, weightLabel: "10 de 50 preguntas por test" },
    { setNumber: 5, id: 22505, name: "Lengua española", categories: ["espnLengua"], size: 16, weightLabel: "4 de 50 preguntas por test" },
    { setNumber: 6, id: 22506, name: "Materias técnico-científicas", categories: ["espnInformatica", "espnArmasVial"], size: 36, weightLabel: "9 de 50 preguntas por test" },
  ],
  categoryLabels: {
    espnConstitucion: "Derecho, Constitución y Unión Europea",
    espnAdministracion: "Administración y Policía Nacional",
    espnExtranjeria: "Extranjería y protección internacional",
    espnSeguridad: "Seguridad privada y seguridad ciudadana",
    espnPenal: "Derecho Penal",
    espnProcesal: "Derecho Procesal Penal y víctimas",
    espnIgualdad: "Igualdad, prevención y protección de datos",
    espnSociales: "Ciencias Sociales",
    espnLengua: "Lengua española",
    espnInformatica: "Informática, inteligencia y ciberdelincuencia",
    espnArmasVial: "Armas, vehículos prioritarios y seguridad vial",
  },
  copy: {
    guestPrompt: "para guardar tu progreso en la oposición y no perder de vista ninguna pregunta fallada",
    trainingHeading: "Bloques de entrenamiento",
    trainingSub: "Cada bloque cubre temas del temario de la Escala Básica. Tienes la respuesta al momento, y las preguntas que fallas vuelven hasta que las domines.",
    testsHeading: "Tests · 50 preguntas, 35 para aprobar",
    heroSubs: [
      "Seis bloques, cuatro tests. Las Ciencias Jurídicas son más de la mitad del temario.",
      "Domina primero el bloque, después haz el test.",
      "Vas por la mitad. Haz un test completo.",
      "Repasa los fallos y vuelve a hacer el test.",
      "Todo en verde. Prepárate para la prueba de conocimientos.",
    ],
    sourceLine: "Según la convocatoria de 2026 (BOE de 10 de julio de 2026) y las leyes del temario vigentes en noviembre de 2026. Preguntas propias, no de exámenes oficiales; cuatro opciones y sin penalización por error.",
    analyticsKey: "espolicia",
  },
};
```

Append `espolicia` to the `EXAMS` array (after `esdgt` or with the Spain siblings esguardia,
esvigilante, escapcond). No `translations`. Set names are Spanish topic names, so
`TEST_SET_NAMES.es` is not used. `ExamDashboard` shows topic sets first, then the tests.

## lib/banks/all.ts

```ts
import "./espolicia";
```

## types/index.ts

- `QuestionType`: add `| "ESPOLICIA"`.
- `QuestionCategory`, under a `// Spain National Police entrance exam (Escala Básica)` comment
  (grepped: no `espn` key exists):

```ts
  | "espnConstitucion"
  | "espnAdministracion"
  | "espnExtranjeria"
  | "espnSeguridad"
  | "espnPenal"
  | "espnProcesal"
  | "espnIgualdad"
  | "espnSociales"
  | "espnLengua"
  | "espnInformatica"
  | "espnArmasVial"
```

## i18n

Results and `/stats` read `exam.categoryLabels` first for native exams, so nothing is needed in
`i18n/es.ts`. For English surfaces, `i18n/en.ts` (the others fall back):

```ts
    espnConstitucion: "Law, Constitution & EU",
    espnAdministracion: "Administration & National Police",
    espnExtranjeria: "Immigration & Asylum",
    espnSeguridad: "Private & Public Security",
    espnPenal: "Criminal Law",
    espnProcesal: "Criminal Procedure & Victims",
    espnIgualdad: "Equality, Safety at Work & Data",
    espnSociales: "Social Sciences",
    espnLengua: "Spanish Language",
    espnInformatica: "IT, Intelligence & Cybercrime",
    espnArmasVial: "Firearms, Emergency Vehicles & Road Safety",
```

## lib/shuffleOptions.ts

No position-dependent options ("A y B", "Ambas", "Todas las anteriores"); the build asserts it.
Nineteen all-number items are sorted ascending by the build (key in an end slot in 10 of 19); the
app shuffles v1 options per attempt anyway.

## app/globals.css

Suggested `222 60% 28%` clashes with police (226 70% 28%), phcse (221 50% 30%), psat, boating,
hkiiqe1 and aesira. Clash-free on a scan of every light theme: `222 85% 22%` (deep police
navy; nearest is police at 226 70% 28%, 15 points of saturation apart, which the rule allows).
White text about 13:1. Check against the
Spain siblings picking at the same time (esguardia likely green). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Spain National Police entrance exam (Policía Nacional, Escala Básica) theme */
  [data-theme="espolicia"] {
    --brand: 222 85% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 222 70% 96%;
    --brand-hover: 222 85% 18%;
    --brand-dark: 222 85% 15%;
    --brand-darker: 222 85% 10%;
    --brand-muted: 222 30% 62%;
    --brand-border: 222 40% 78%;
    --brand-border-light: 222 50% 88%;
    --brand-gradient-to: 222 70% 92%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `espolicia: "Four 50-question tests in Spanish for the knowledge test of Spain's National Police entrance exam (Escala Básica): the Constitution, the EU, the Interior ministry and LO 2/1986, immigration, citizen security, criminal law and procedure, equality, social sciences, Spanish grammar and spelling, IT and cybercrime, firearms and emergency vehicles, written from the 2026 temario.",`
- `EXAM_ORG`: `espolicia: "Dirección General de la Policía (Ministerio del Interior) · Escala Básica, convocatoria in the BOE, in Spanish",`
- Hub group: a new Spain group for non-driving tests, right after `"EU driving theory tests"`
  (Spain's driving group). The siblings esguardia and esvigilante go in it; escapcond (a licence
  category) belongs with the driving tests:
  `{ title: "Spain police and security exams", ids: ["espolicia", "esguardia", "esvigilante"] },`
  `RELATED_OVERRIDES`: `espolicia: ["esguardia", "esvigilante", "police", "phnapolcom"],` (drop the
  siblings that do not ship).
- `SEARCH_ALIASES` (Spanish and English):
  `espolicia: "policia nacional policía nacional oposiciones policia nacional oposiciones policía nacional escala basica escala básica test policia nacional examen policia nacional prueba de conocimientos temario policia nacional cnp cuerpo nacional de policia oposicion policia policia españa ser policia policía alumno escuela nacional de policia avila spain police exam spanish national police entrance exam policia nacional test spain police officer exam oposiciones",`
- Native name on Spanish surfaces, `english.name` elsewhere.

## lib/region.ts

`TEST_REGIONS.espolicia = "ES"`. Region ES exists (esdgt). NOT a driving test, so add `espolicia`
to `NON_DRIVING_TESTS`. `REGION_HOME.ES` is driving-only copy; once Spanish non-driving tests ship,
consider a second line in `testsSub` (integrator's call), e.g. "Además, oposiciones de Policía
Nacional y Guardia Civil y el examen de vigilante de seguridad."

## lib/landingContent.ts

```ts
import espoliciaEs from "@/lib/landings/espolicia.es.json";
  "espolicia.es": espoliciaEs as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  espolicia: {
    answer:
      "The knowledge test (prueba de conocimientos) is the first stage of the competitive entrance exam (oposición) for the Escala Básica, rank of Policía, of Spain's National Police. Under the 2026 call (Resolución de 7 de julio de 2026, BOE of 10 July 2026) it is a written paper of 100 questions with three options, one correct, answered in 50 minutes, on an official syllabus of 45 topics in three blocks: legal sciences, social sciences and technical-scientific subjects. The score is [correct − wrong/(options − 1)] × 10 / questions, so each wrong answer cancels half a right one and blanks score nothing, on a 0 to 10 scale. Candidates need at least 3 points, and only the best go on, up to 1.75 per open place, so the real cut-off is higher. The test is eliminatory and taken in the same sitting as the psychometric aptitude tests; physical tests, a medical and an interview follow. The 2026 call offers 2,704 places (2,163 open, 541 reserved for professional soldiers and sailors). The exam is in Spanish; candidates must hold Spanish nationality, a Bachiller, a car licence and at least A2 in English or French.",
    rows: [
      { label: "Run by", value: "Dirección General de la Policía (Ministry of the Interior)" },
      { label: "Questions", value: "100, three options each" },
      { label: "Time", value: "50 minutes" },
      { label: "Scoring", value: "Each wrong answer takes off half a correct one; 0 to 10" },
      { label: "To go on", value: "At least 3, then ranked: best 1.75 per open place" },
      { label: "Syllabus", value: "45 topics: legal, social, technical-scientific" },
      { label: "Language", value: "Spanish" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Spanish, 35 to pass" },
    ],
    basedOn: "the 2026 call for the Escala Básica of the Policía Nacional (Resolución de 7 de julio de 2026, BOE-A-2026-15055) and the laws on its syllabus as in force, checked November 2026",
    source: { name: "BOE: 2026 call for the Policía Nacional Escala Básica", url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-15055" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Spanish)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave; run
`npx tsx scripts/build-landing-dates.ts` after committing.

## lib/tigerAssets.ts

`BORROWED_SETS`: `espolicia: "police",`

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx (teacher-led)

Most candidates prepare in an academia de oposiciones, so add `"espolicia"` to `TEACHER_LED`, and
to `TEACHES`:
`espolicia: "a Policía Nacional oposiciones class",`
`TranslatedExamLanding` does not render `ExamClassFaq`; the Spanish landing's last FAQ mentions
that a teacher can make a class. The nudge and `/teach` still work.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check `/es/test-oposiciones-policia-nacional` is emitted once, hreflang
`es-ES`, x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. Sets are 16 to 44 (all at most 60), so no parts.

## tools/build_exam_sources.py

Run `python3 -I tools/build_exam_sources.py` so `lib/examSources.json` picks up
`tools/next100/espolicia/sources.md` (first three URLs: the BOE convocatoria PDF, the BOE sumario,
the Interior ministry page).

## lib/examFreshness.json (suggested)

```json
{ "examId": "espolicia", "date": "2027-07-01", "kind": "notice", "action": "Read the 2027 Escala Básica convocatoria in the BOE: question count, options, time, scoring formula, temario changes; update the landing, examFacts and any affected items.", "source": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/empleo-publico/procesos-selectivos/policia-nacional/escala-basica/" }
```

Also: the bill transposing Directive (EU) 2022/2557 (critical entities) may replace Ley 8/2011;
ESPN-SEG-013 uses only the definition of infraestructura crítica.

## Screenshots

`TranslatedExamLanding` reads `/landing/espolicia-{mobile,desktop}-es.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing espolicia:oposiciones-policia-nacional:22501`
then rename to the `-es` names, as for detheorie.

## CLAUDE.md (after the de34a bullet, or with the EU and Spain exams)

```md
- **Oposiciones Policía Nacional** (`espolicia`, knowledge test of the entrance exam for the Escala Básica of Spain's Policía Nacional, native Spanish exam, `language: "es"`, `locale: "es-ES"`, English names in `english`, `review: { es: "model" }`, `/oposiciones-policia-nacional/*`, landing `/es/test-oposiciones-policia-nacional` from `lib/landings/espolicia.es.json`): `data/policia-nacional-questions.json` (200 original questions written in Spanish on the 45-tema temario of the 2026 convocatoria: Ciencias Jurídicas as Derecho, Constitución y UE 24, Administración, Interior y Policía Nacional (LO 2/1986, LO 9/2015) 20, extranjería y protección internacional 12, seguridad privada, LO 4/2015 y ciberseguridad 16, Derecho Penal 24, Procesal Penal y víctimas 12, igualdad, PRL y protección de datos 12; Ciencias Sociales 28 and Lengua española (gramática y ortografía) 16; Técnico-Científicas as informática, inteligencia y ciberdelincuencia 20, armas, vehículos prioritarios y seguridad vial 16), four 50-question tests (IDs 22501-22504, 6/5/3/4/6/3/3/7/4/5/4 per test, 30/11/9 by block following the temas per block, no spares) and six Spanish-named topic sets 22501-22506, 10 dashboard steps, state `ESPOLICIA`, prefix `ESPN-`, 70% pass (35 of 50, Tigertest's target). The real test (Resolución de 7 de julio de 2026, BOE-A-2026-15055): 100 questions with three options in 50 minutes, [A − E/(n−1)] × 10 / P, at least 3 of 10 and then the best 1,75 per open place (2.163 open of 2.704), eliminatory, same sitting as the psicotécnicos; ours have four options and no penalty, and the landing says so. Psicotécnicos, physical tests, medical and interview are not modelled. Law as in force November 2026; no item names juzgados (LO 1/2025) or rests on Ley 8/2011's plans; no fines, fees or officeholders. Kept clear of `esguardia` (every shared fact and answer rewritten). Built by `tools/next100/espolicia/build.py`; sources in `tools/next100/espolicia/sources.md`, terms in `glossary.md`. Region ES, hub group "Spain police and security exams", `[data-theme="espolicia"]` deep police navy, borrows the police tiger, teacher-led (academias de oposiciones).
```

## Decisions for the integrator

1. **Hue.** Suggested 222 60% 28% clashes with police, phcse, psat and others; proposed
   `222 85% 22%`. Check against the Spain siblings.
2. **Pass mark.** 70 (35 of 50), Tigertest's target. The real minimum is 3 of 10 after penalty,
   but entry is by ranking, so the landing tells learners to aim at 70% or more.
3. **Format vs research notes.** The 2026 BOE has no separate spelling or English test (the notes
   said there was); landing and examFacts follow the BOE. 2026 sitting date (26 September, per
   academies) is not on the landing.
4. **Sibling overlap.** Compared against `data/es-guardia-civil-questions.json`: 19 items
   sharing a fact and answer were rewritten here. A second pass against
   `data/es-vigilante-seguridad-questions.json` and `data/es-cap-conductores-questions.json`
   (both on disk by then) found one shared fact (a private person's arrest of an in fraganti
   offender, art. 490 LECrim, which belongs to esvigilante); ESPN-PRO-008 now asks how a detainee
   must be informed of their rights (art. 520.2). No other shared fact-and-answer pairs. Review pass (2026-11-07) rewrote five more that still matched esguardia: ESPN-ADM-001, PEN-004, PEN-008, PEN-013, PRO-010 (see sources.md).
5. **Hub group name** shared with esguardia and esvigilante: agree one title across the WIRING files.
