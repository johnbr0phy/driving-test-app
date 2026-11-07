# Wiring for `ptcam` (Exame CAM, Portugal Driver CPC for truck and bus drivers, written in Portuguese, v1)

A native-language exam (base bank and base copy in European Portuguese, `language: "pt"`), built
like `detheorie`. Files already written by the builder (no shared file touched):
- `data/portugal-cam-questions.json` (200, validator `--lang pt` PASS)
- `lib/banks/ptcam.ts`
- `app/exame-cam/*` (layout, redirect, dashboard, drill, stats; no test or practice folders)
- `lib/landings/ptcam.pt.json` (Portuguese landing content, with a Portuguese `facts.source`)
- `app/pt/exame-cam-teste/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `pt`)
- `tools/next100/ptcam/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/ptcam/build.py` (prints the key-longest share).
Everything below goes in shared files.

Format note: the real exam (Despacho IMTT n.º 26482/2009, still listed on gov.pt as the act in
force, checked 2026-11-06) is a written test of 60 questions, four-option multiple choice and/or
direct answer, 2 hours, 0 to 100 with equal weight, pass at 60% or more; admission only within two
years of finishing the initial qualification course. Tigertest models three real-length tests of
60 at the real 60% (`ceil(0.6 x 60) = 36`). Pools are 3x each per-test count plus spares (the last
two items of each pool, four in economia; 20 in all) that only training uses. Direct-answer
questions are not modelled; the landing says so. One bank for trucks and buses, like `iedttcv`.

## lib/exams.ts

Add `"ptcam"` to the `ExamId` union. Icon `truck` already exists. 22900 is free (highest idBase on
disk 21900); tests 22901-22903 and sets 22901-22905 share numbers like `detheorie`'s topic sets.

```ts
const ptcam: ExamConfig = {
  id: "ptcam",
  stateCode: "PTCAM",
  idBase: 22900,
  slug: "/exame-cam",
  landingPath: "/pt/exame-cam-teste",
  name: "Exame CAM (Certificado de Aptidão para Motorista)",
  shortName: "Exame CAM",
  examLabel: "Exame CAM",
  fullName: "Exame do Certificado de Aptidão para Motorista (CAM), qualificação inicial de motoristas de pesados",
  questionIdPrefix: "PTCAM-",
  icon: "truck",
  testCount: 3,
  questionsPerTest: 60,
  passPct: 60,
  language: "pt",
  locale: "pt-PT",
  english: {
    name: "Portugal Driver CPC (CAM) Exam",
    shortName: "Portugal CAM exam",
    fullName: "Portugal Driver CPC initial qualification exam (CAM) for truck and bus drivers, in Portuguese",
  },
  review: { pt: "model" },
  // Real exam (Despacho IMTT n.º 26482/2009 under Decreto-Lei 126/2009, republished by Decreto-Lei
  // 102-C/2020; checked 2026-11-06): written test of 60 questions, four-option and/or direct answer,
  // 2 hours, 0 to 100 with equal weight, pass at 60%; IMT, after the initial qualification course
  // (C/CE and D/DE). Content follows Directive 2003/59/EC Annex I as amended by 2018/645; the IMT
  // publishes no topic weights, so 10/7/7/9/6/5/5/7/4 is Tigertest's. Three tests of 60 at 60%
  // (36); pools 3x per test plus 20 training-only spares. One bank for trucks and buses.
  blueprint: {
    ptcamRacional: 10,
    ptcamCarga: 7,
    ptcamPassageiros: 7,
    ptcamTempos: 9,
    ptcamTacografo: 6,
    ptcamRegulamentacao: 5,
    ptcamSaude: 5,
    ptcamEmergencias: 7,
    ptcamEconomia: 4,
  },
  // Five topic sets, not testSets(): 5 + 3 tests = 8 dashboard steps; every item in one set.
  trainingSets: [
    { setNumber: 1, id: 22901, name: "Condução racional e veículo", categories: ["ptcamRacional"], size: 32, weightLabel: "10 de 60 perguntas por teste" },
    { setNumber: 2, id: 22902, name: "Carga e passageiros", categories: ["ptcamCarga", "ptcamPassageiros"], size: 46, weightLabel: "14 de 60 perguntas por teste" },
    { setNumber: 3, id: 22903, name: "Tempos de condução e tacógrafo", categories: ["ptcamTempos", "ptcamTacografo"], size: 49, weightLabel: "15 de 60 perguntas por teste" },
    { setNumber: 4, id: 22904, name: "Regulamentação e economia", categories: ["ptcamRegulamentacao", "ptcamEconomia"], size: 33, weightLabel: "9 de 60 perguntas por teste" },
    { setNumber: 5, id: 22905, name: "Saúde, segurança e emergências", categories: ["ptcamSaude", "ptcamEmergencias"], size: 40, weightLabel: "12 de 60 perguntas por teste" },
  ],
  categoryLabels: {
    ptcamRacional: "Condução racional e tecnologia do veículo",
    ptcamCarga: "Carga e acondicionamento",
    ptcamPassageiros: "Segurança e conforto dos passageiros",
    ptcamTempos: "Tempos de condução e repouso",
    ptcamTacografo: "Tacógrafo",
    ptcamRegulamentacao: "Regulamentação do transporte e da profissão",
    ptcamSaude: "Saúde, fadiga e ergonomia",
    ptcamEmergencias: "Riscos, acidentes e emergências",
    ptcamEconomia: "Ambiente económico e imagem da empresa",
  },
  copy: {
    guestPrompt: "para guardar o seu progresso no exame CAM e acompanhar cada pergunta em que erra",
    trainingHeading: "Conjuntos de treino",
    trainingSub: "Cada conjunto cobre um bloco de matérias da qualificação inicial. Tem a resposta logo a seguir, e as perguntas em que erra voltam até as dominar.",
    testsHeading: "Testes · 60 perguntas, 36 para passar, como no exame",
    heroSubs: [
      "Cinco conjuntos de treino, três testes de 60. Tempos de condução e condução racional são os temas que mais saem.",
      "Domine primeiro o conjunto, depois faça o teste.",
      "Já vai a meio. Faça um teste de 60.",
      "Reveja os erros e repita o teste.",
      "Tudo verde. Está pronto para o exame CAM no IMT.",
    ],
    sourceLine: "Perguntas originais a partir do Regulamento (CE) 561/2006, do Regulamento (UE) 165/2014, do Decreto-Lei 126/2009 e do Código da Estrada, novembro de 2026. Não copiadas das listas do IMT. Sem ligação ao IMT.",
    analyticsKey: "ptcam",
  },
};
```

Append `ptcam` to the `EXAMS` array with the other driving tests (after `ptimt`, or after
`iedttcv` with the other professional driver tests). No `translations`.

## lib/banks/all.ts

```ts
import "./ptcam";
```

## types/index.ts

- `QuestionType`: add `| "PTCAM"`.
- `QuestionCategory`, under a `// Portugal CAM (Driver CPC) exam` comment (grepped: no key starts
  with `ptcam`):

```ts
  | "ptcamRacional"
  | "ptcamCarga"
  | "ptcamPassageiros"
  | "ptcamTempos"
  | "ptcamTacografo"
  | "ptcamRegulamentacao"
  | "ptcamSaude"
  | "ptcamEmergencias"
  | "ptcamEconomia"
```

## i18n

If results and `/stats` already prefer `exam.categoryLabels` (they do for `detheorie`), nothing
is needed for Portuguese. For English surfaces, add to `i18n/en.ts` (others fall back):

```ts
    ptcamRacional: "Rational Driving & Vehicle Technology",
    ptcamCarga: "Loading & Load Securing",
    ptcamPassageiros: "Passenger Safety & Comfort",
    ptcamTempos: "Driving Times & Rest",
    ptcamTacografo: "Tachograph",
    ptcamRegulamentacao: "Transport & Profession Rules",
    ptcamSaude: "Health, Fatigue & Ergonomics",
    ptcamEmergencias: "Risks, Accidents & Emergencies",
    ptcamEconomia: "Economic Environment & Company Image",
```

## lib/shuffleOptions.ts

No position-dependent options ("Ambos", "A e B", "todas as anteriores"): the build asserts it.

## app/globals.css

Suggested `28 70% 28%` clashes (within 8 degrees and inside 15 saturation and 8 lightness) with
`ctet` (22 80% 28%), `upscse` (28 65% 30%) and `phrebroker` (30 70% 22%). Checked free:
`28 90% 20%`, a deep burnt orange-brown (white text well above 4.5:1). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Portugal CAM (Driver CPC) exam theme */
  [data-theme="ptcam"] {
    --brand: 28 90% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 28 60% 95%;
    --brand-hover: 28 90% 16%;
    --brand-dark: 28 90% 14%;
    --brand-darker: 28 85% 9%;
    --brand-muted: 28 30% 66%;
    --brand-border: 28 35% 78%;
    --brand-border-light: 28 30% 88%;
    --brand-gradient-to: 140 50% 94%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `ptcam: "Three 60-question tests in Portuguese for Portugal's CAM exam, the IMT written test after Driver CPC initial qualification for truck and bus drivers: driving and rest times, tachograph, load securing, passengers, rational driving and emergencies, with the real 60% pass mark.",`
- `EXAM_ORG`: `ptcam: "IMT (Portugal) · CAM exam after Driver CPC initial qualification, in Portuguese",`
- Hub group: there is no Portugal group yet (`ptimt` sits in "EU driving theory tests"). Add one
  right after "EU driving theory tests" for Portugal's licence-category and professional driver
  tests, shared with the siblings building now (drop any id not wired yet):
  `{ title: "Portugal driving and transport tests", ids: ["ptmoto", "ptcam", "pttvde"] },`
  (or, if siblings land elsewhere, `{ title: "Portugal driving tests", ids: ["ptcam"] }`; with
  one member, `RELATED_OVERRIDES` pads it).
- `RELATED_OVERRIDES`: `ptcam: ["ptimt", "iedttcv", "uklgv"],`
- `SEARCH_ALIASES` (Portuguese and English):
  `ptcam: "exame cam testes cam exame cam imt cam motorista certificado de aptidão para motorista certificado de aptidao para motorista cam pesados cam mercadorias cam passageiros qualificação inicial qualificacao inicial motoristas código 95 codigo 95 motorista profissional camião camiao autocarro tacógrafo tacografo tempos de condução cqm carta de qualificação de motorista portugal driver cpc portugal cpc test portugal truck driver exam portugal bus driver exam cam exam portugal hgv portugal",`
- Native name on the Portuguese homepage, `english.name` elsewhere (platform `nativeName`).

## lib/region.ts

- `TEST_REGIONS`: `ptcam: "PT",` (next to `ptimt: "PT"`).
- Not in `NON_DRIVING_TESTS`: a driving qualification, like `iedttcv` and `uklgv`.
- `REGION_HOME.PT` keeps the IMT car test as its CTA; with more Portuguese tests, a suggested
  `testsSub` (integrator's call, in Portuguese):
  `"Exame de código (categoria B): 200 perguntas, seis testes de 30, passa com 27. Exame CAM para motoristas de pesados: 200 perguntas, três testes de 60, passa com 36."`
  and `testsTitle: "Exames do IMT"`.
- `faqsFor("PT")` counts tests automatically; nothing exam-specific.

## lib/landingContent.ts

```ts
import ptcamPt from "@/lib/landings/ptcam.pt.json";
  "ptcam.pt": ptcamPt as TranslatedLandingContent,
```

## app/pt/layout.tsx

Already exists (from `ptimt`). The landing is `app/pt/exame-cam-teste/page.tsx`; it needs
`TranslatedExamLanding` to accept the base language (as for `detheorie`): `urls()` using
`exam.landingPath` when `lang === exam.language`, locale `pt-PT`, `priceCurrency` EUR.

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  ptcam: {
    answer:
      "The CAM exam (exame do Certificado de Aptidão para Motorista) is the written test that Portugal's IMT sets at the end of the Driver CPC initial qualification course, common or accelerated, which professional truck (C, CE) and bus (D, DE) drivers must complete at a recognised training provider. It has 60 questions, four-option multiple choice, direct answer or a mix of the two, in 2 hours. Every question carries equal weight on a 0 to 100 scale and you pass with at least 60%. Only candidates who finished the course less than two years earlier are admitted, and the training provider registers them. The CAM is valid for five years, renewed with periodic training, and for drivers resident in Portugal the qualification is shown by code 95 on the driving licence. The test is in Portuguese.",
    rows: [
      { label: "Run by", value: "IMT (Instituto da Mobilidade e dos Transportes)" },
      { label: "Questions", value: "60, multiple choice and/or direct answer" },
      { label: "Time", value: "2 hours" },
      { label: "Pass mark", value: "60% (36 of 60), equal weight per question" },
      { label: "Admission", value: "Initial qualification course finished less than 2 years earlier" },
      { label: "CAM valid", value: "5 years; code 95 on the licence" },
      { label: "Language", value: "Portuguese" },
      { label: "Tigertest mock tests", value: "3 x 60 questions in Portuguese, 36 to pass" },
    ],
    basedOn: "Despacho IMTT n.º 26482/2009 (CAM exam conditions), Decreto-Lei 126/2009 as republished by Decreto-Lei 102-C/2020, and gov.pt, checked November 2026",
    source: { name: "IMT: Driver CPC training and certification", url: "https://www.imt-ip.pt/?p=5600" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Portuguese)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date; rerun
`npx tsx scripts/build-landing-dates.ts`.

## lib/tigerAssets.ts

`BORROWED_SETS`: `ptcam: "cdl",` (like `iedttcv`).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx (optional)

The CAM is taken only after a mandatory classroom course at a training provider, so trainers
could set it as class practice. If the integrator agrees:
- `TEACHER_LED`: add `"ptcam",`
- `TEACHES`: `ptcam: "a CAM (Driver CPC) initial qualification course",`
Otherwise nothing (driving tests are usually not teacher-led).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the native `landingPath` under `/pt` is emitted once, hreflang
`pt-PT`, x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 32 to 49 (all at most 60),
so no parts.

## Screenshots

`TranslatedExamLanding` reads `/landing/ptcam-{mobile,desktop}-pt.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ptcam:exame-cam:22901`
then rename to the `-pt` names (as for `detheorie`).

## CLAUDE.md (after the EU driving tests, near `ptimt`)

```md
- **Exame CAM** (`ptcam`, Portugal's Driver CPC exam, the IMT written test after the initial qualification course for truck (C, CE) and bus (D, DE) drivers, native-language exam, base language European Portuguese, `language: "pt"`, `locale: "pt-PT"`, `review: { pt: "model" }`, `/exame-cam/*`, landing `/pt/exame-cam-teste` from `lib/landings/ptcam.pt.json`): `data/portugal-cam-questions.json` (200 original questions written directly in Portuguese on Annex I of Directive 2003/59/EC as amended by 2018/645 (Decreto-Lei 126/2009, republished by Decreto-Lei 102-C/2020): condução racional e tecnologia do veículo 32, carga e acondicionamento 23, segurança e conforto dos passageiros 23, tempos de condução e repouso 29, tacógrafo 20, regulamentação do transporte e da profissão 17, saúde, fadiga e ergonomia 17, riscos, acidentes e emergências 23, ambiente económico e imagem da empresa 16), three real-length tests of 60 (IDs 22901-22903, 10/7/7/9/6/5/5/7/4 per test, Tigertest's weights; the last items of each pool, 20 in all, are training-only) and five Portuguese-named topic sets 22901-22905 (32, 46, 49, 33, 40), 8 dashboard steps, state `PTCAM`, prefix `PTCAM-`, 60% pass like the real exam (Despacho IMTT n.º 26482/2009: 60 questions, multiple choice and/or direct answer, 2 hours, equal weight, 60%; admission within two years of the course). Direct-answer questions are not modelled; one bank for trucks and buses. Rules: Reg. 561/2006 with Reg. 2020/1054 (regular weekly rest not in the cab, return every four weeks, 2,5 t to 3,5 t international vans from 1 July 2026), Reg. 165/2014 (56 days of records), DL 237/2007 working time, Regs 1072/2009 and 1073/2009, Reg. 181/2011, CMR, DL 239/2003, Código da Estrada (0,2 g/l for heavy vehicle drivers); no fines, fees or weight limits; never copied from the IMT's published CAM question lists. Kept clear of `ptimt` and `pttvde`. Built by `tools/next100/ptcam/build.py`; sources in `tools/next100/ptcam/sources.md`, terms in `glossary.md`. Region PT, `[data-theme="ptcam"]` deep burnt orange (28 90% 20%), borrows the CDL tiger.
```

## Decisions for the integrator

1. **Hue.** Suggested 28 70% 28% clashes with ctet, upscse and phrebroker; `28 90% 20%` passes.
2. **Hub group.** No Portugal group exists; proposed "Portugal driving and transport tests"
   shared with ptmoto and pttvde (coordinate with those builders' WIRING).
3. **Format facts.** The 2009 despacho is still listed on gov.pt as in force; course hours and
   minimum ages are not on any current Portuguese page I could read, so they are left out.
4. **Teacher-led.** Optional TEACHER_LED / TEACHES lines above.
5. **Register.** Formal third person in questions and copy, like `ptimt`'s Portuguese landing.
