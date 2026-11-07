# Wiring for `pttvde` (Portugal TVDE ride-hailing driver exam, Exame TVDE, written in Portuguese, v1)

A native-language exam like `detheorie`: base bank and base copy are European Portuguese
(`language: "pt"`). Files already written by the builder:
- `data/pt-tvde-questions.json` (200, validator PASS with `--lang pt`)
- `lib/banks/pttvde.ts`
- `app/exame-tvde/*` (layout, redirect, dashboard, drill, stats; copied from `app/fuehrerschein-theorie/`)
- `lib/landings/pttvde.pt.json` (Portuguese landing content, with a Portuguese `facts.source`)
- `app/pt/exame-tvde-teste/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `pt`)
- `tools/next100/pttvde/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/pttvde/build.py`. Everything below goes in shared files.

Format note (sources.md, checked 2026-11-06): Lei n.º 45/2018 as republished by Lei n.º 59/2026
(in force 1 September 2026), art. 10(7)-(8): after the initial course (at least 50 hours, 80%
attendance per module) the trainee passes a final assessment by the IMT or an IMT-authorised exam
centre: a test of 30 questions, passed with at least 27 correct. 60 minutes and one retake within
10 working days come from press reports of Portaria n.º 344/2024 (Correio da Manhã, Renascença,
19 Dec 2024); the Diário da República text of that portaria was not reached. The exam is in
Portuguese; since Lei 59/2026 the course also checks functional Portuguese (art. 10-A). Taxi
driver certificate holders are exempt. Tigertest models five 30-question tests (150 items) plus
50 training-only spares, single best answer of four, so `passPct: 90` (27 of 30) is the real rule.
Training: 4 topic sets (22801-22804, all at most 60) + 5 tests = 9 dashboard steps.

## lib/exams.ts

Add `"pttvde"` to the `ExamId` union. Icon `car` exists. 22801-22805 are free (highest existing
idBase found in the checkout was 21900; siblings building now: ptcam, ptvigil, ptmoto, check their
blocks). Set ids 22801-22804 share numbers with test ids 22801-22804, like `detheorie`.

```ts
const pttvde: ExamConfig = {
  id: "pttvde",
  stateCode: "PTTVDE",
  idBase: 22800,
  slug: "/exame-tvde",
  landingPath: "/pt/exame-tvde-teste",
  name: "Exame TVDE",
  shortName: "Exame TVDE",
  examLabel: "Avaliação final TVDE",
  fullName: "Exame de motorista TVDE (Certificado de Motorista TVDE)",
  questionIdPrefix: "PTTVDE-",
  icon: "car",
  testCount: 5,
  questionsPerTest: 30,
  passPct: 90,
  language: "pt",
  locale: "pt-PT",
  english: {
    name: "Portugal TVDE Ride-Hailing Driver Exam",
    shortName: "Portugal TVDE driver exam",
    fullName: "Portugal TVDE ride-hailing driver certificate exam (Exame TVDE), in Portuguese",
  },
  review: { pt: "model" },
  // Real exam (Lei 45/2018 art. 10(7)-(8) as republished by Lei 59/2026, in force 1 Sept 2026;
  // IMT certification page; Portaria 293/2018 as amended by Portaria 344/2024; checked
  // 2026-11-06): the final assessment of the 50-hour initial course, at the IMT or an
  // IMT-authorised exam centre, 30 multiple-choice questions, pass with at least 27 correct;
  // 60 minutes per the press. In Portuguese. Taxi driver certificate holders are exempt.
  // Categories follow the initial course subjects (art. 10(6); Portaria 293/2018 Annex I), with
  // the regulation module split in three; the IMT publishes no weights, so 6/4/5/5/3/4/3 is
  // Tigertest's. Five tests of 30 (150 items); the last items of each pool (50) are
  // training-only. Single best answer of four, equal weight, so passPct 90 = 27 of 30.
  blueprint: {
    pttvdeAtividade: 6,
    pttvdeVeiculo: 4,
    pttvdeServico: 5,
    pttvdeComunicacao: 5,
    pttvdeNormas: 3,
    pttvdeTecnicas: 4,
    pttvdeEmergencia: 3,
  },
  // Four topic sets, not testSets(): 4 + 5 tests = 9 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 22801, name: "Regulamentação da atividade TVDE", categories: ["pttvdeAtividade"], size: 42, weightLabel: "6 das 30 perguntas do teste" },
    { setNumber: 2, id: 22802, name: "Veículo, preço e direitos do utilizador", categories: ["pttvdeVeiculo", "pttvdeServico"], size: 60, weightLabel: "9 das 30 perguntas do teste" },
    { setNumber: 3, id: 22803, name: "Passageiros e emergências", categories: ["pttvdeComunicacao", "pttvdeEmergencia"], size: 56, weightLabel: "8 das 30 perguntas do teste" },
    { setNumber: 4, id: 22804, name: "Normas e técnicas de condução", categories: ["pttvdeNormas", "pttvdeTecnicas"], size: 42, weightLabel: "7 das 30 perguntas do teste" },
  ],
  categoryLabels: {
    pttvdeAtividade: "Regulamentação da atividade TVDE",
    pttvdeVeiculo: "Veículo, dístico e registo",
    pttvdeServico: "Serviço, preço e direitos do utilizador",
    pttvdeComunicacao: "Comunicação e relações interpessoais",
    pttvdeNormas: "Normas legais de condução",
    pttvdeTecnicas: "Técnicas de condução defensiva e eficiente",
    pttvdeEmergencia: "Emergências e primeiros socorros",
  },
  copy: {
    guestPrompt: "para guardar o progresso no exame TVDE e ver todas as perguntas em que errou",
    trainingHeading: "Treine por tema do curso TVDE",
    trainingSub: "Quatro conjuntos sobre a lei TVDE, os passageiros e a condução. Correção imediata, e as perguntas erradas voltam até as dominar.",
    testsHeading: "Testes de simulação · 30 perguntas como no exame real, 27 para passar",
    heroSubs: [
      "Quatro conjuntos de treino, cinco testes. A regulamentação da atividade é o tema com mais perguntas.",
      "Domine primeiro o conjunto, depois faça o teste.",
      "Já vai a meio. Faça um teste de 30 perguntas.",
      "Reveja os erros e volte a testar.",
      "Tudo verde. Está pronto para o exame TVDE.",
    ],
    sourceLine: "Segundo a Lei n.º 45/2018 na redação da Lei n.º 59/2026, o Código da Estrada e a Portaria n.º 293/2018, em novembro de 2026. Perguntas originais, não copiadas da lista do IMT.",
    analyticsKey: "pttvde",
  },
};
```

Append `pttvde` to the `EXAMS` array after the other Portugal exams (`ptimt`, then the siblings).
No `translations` (an English version later would be `translations.en`).

## lib/banks/all.ts

```ts
import "./pttvde";
```

## types/index.ts

- `QuestionType`: add `| "PTTVDE"`.
- `QuestionCategory`, under a `// Portugal TVDE ride-hailing driver exam` comment:

```ts
  | "pttvdeAtividade"
  | "pttvdeVeiculo"
  | "pttvdeServico"
  | "pttvdeComunicacao"
  | "pttvdeNormas"
  | "pttvdeTecnicas"
  | "pttvdeEmergencia"
```

Grepped against `types/index.ts` on 2026-11-06: no existing key starts with `pttvde`.

## i18n

Results and stats read `exam.categoryLabels` first (platform phase 0), so only the English
fallback is needed, in `i18n/en.ts` (other dictionaries fall back to English):

```ts
    pttvdeAtividade: "TVDE Regulation",
    pttvdeVeiculo: "Vehicle, Sticker & Registration",
    pttvdeServico: "Service, Price & Passenger Rights",
    pttvdeComunicacao: "Communication & Customer Relations",
    pttvdeNormas: "Driving Law",
    pttvdeTecnicas: "Defensive & Eco-Driving",
    pttvdeEmergencia: "Emergencies & First Aid",
```

and, if `i18n/pt.ts` carries category names, the Portuguese labels from `categoryLabels` above.

## lib/shuffleOptions.ts

No position-dependent options ("A e B", "Ambas", "Todas as anteriores"); the build asserts it.

## app/globals.css

Suggested hue 268 45% 32% clashes with `aurcg` (269 40% 30%) and `ssccpo` (262 40% 38%). Checked
every light `[data-theme]` block on 2026-11-06: `266 60% 34%` (deep amethyst) is clear (within 8
degrees: aurcg 269 40% 30% differs by 20 points of saturation; ssccpo 262 40% 38% by 20; phpsychom
265 70% 22% by 12 of lightness). White text about 8:1. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Portugal TVDE ride-hailing driver exam theme */
  [data-theme="pttvde"] {
    --brand: 266 60% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 266 60% 96%;
    --brand-hover: 266 60% 28%;
    --brand-dark: 266 60% 24%;
    --brand-darker: 266 60% 16%;
    --brand-muted: 266 30% 66%;
    --brand-border: 266 35% 80%;
    --brand-border-light: 266 30% 90%;
    --brand-gradient-to: 266 60% 94%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `pttvde: "Five 30-question tests in Portuguese for Portugal's TVDE driver exam, the IMT final assessment for the ride-hailing (Uber, Bolt-type) driver certificate: TVDE law after Lei 59/2026, the vehicle and its sticker, fares and passenger rights, communication, defensive driving and first aid, with the real 27-of-30 pass mark.",`
  (If naming apps on an English surface is unwanted, drop "(Uber, Bolt-type)"; the bank never names a platform.)
- `EXAM_ORG`: `pttvde: "IMT (Portugal) · TVDE driver certificate final assessment, in Portuguese",`
- Hub group: no Portugal group exists yet (`ptimt` sits in "EU driving theory tests"). Same line
  as the sibling `ptcam` WIRING proposes, right after "EU driving theory tests" (drop any id not
  wired yet):
  `{ title: "Portugal driving and transport tests", ids: ["ptmoto", "ptcam", "pttvde"] },`
  If it ends up a one-member group, `RELATED_OVERRIDES` pads it.
- `RELATED_OVERRIDES`: `pttvde: ["ptimt", "ptcam", "ukseru", "iespsv", "sgvl"],`
- `SEARCH_ALIASES` (Portuguese and English):
  `pttvde: "exame tvde teste tvde testes tvde perguntas exame tvde exame motorista tvde certificado de motorista tvde cmtvde avaliacao final tvde avaliação final tvde curso tvde formação tvde formacao tvde motorista uber motorista bolt motorista de plataforma transporte em veiculo descaracterizado lei 45/2018 lei 59/2026 imt tvde dístico tvde distico tvde portugal ride hailing driver exam portugal uber driver test portugal tvde exam tvde certificate portugal rideshare license lisboa porto",`
- Native name on the Portuguese homepage, `english.name` elsewhere (platform `nativeName`).

## lib/region.ts

- `TEST_REGIONS`: `pttvde: "PT",` (next to `ptimt: "PT"`).
- `NON_DRIVING_TESTS`: leave it out. It is a professional driver certificate, grouped with
  `ptcam` (a driving qualification, also left out), and its homepage place is beside the IMT car
  test.
- `REGION_HOME.PT` keeps the IMT car test as its CTA. With more Portuguese tests, the integrator
  may extend `testsSub` (in Portuguese), e.g. append:
  `" Exame TVDE para motoristas de plataformas: 200 perguntas, cinco testes de 30, passa com 27."`
  and use `testsTitle: "Exames do IMT"` (the same title `ptcam` proposes).
- `faqsFor("PT")` counts tests automatically; nothing exam-specific.

## lib/landingContent.ts

```ts
import pttvdePt from "@/lib/landings/pttvde.pt.json";
  "pttvde.pt": pttvdePt as TranslatedLandingContent,
```

## app/pt/layout.tsx

Already exists (from `ptimt`). The landing is `app/pt/exame-tvde-teste/page.tsx` and relies on
`TranslatedExamLanding` accepting the base language (as for `detheorie`): `urls()` using
`exam.landingPath` when `lang === exam.language`, locale `pt-PT`, `priceCurrency` EUR.

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  pttvde: {
    answer:
      "To drive for a TVDE operator in Portugal (ride-hailing booked through an electronic platform), you need the TVDE driver certificate (certificado de motorista de TVDE) issued by the IMT (Instituto da Mobilidade e dos Transportes). You first complete an initial course of at least 50 hours at a driving school or IMT-recognised training entity, attending at least 80% of each module, and then pass the final assessment at the IMT or an IMT-authorised exam centre: 30 multiple-choice questions, passed with at least 27 correct. Press reports give 60 minutes and one retake on request within 10 working days. The test is in Portuguese, and since Lei 59/2026 (in force 1 September 2026) the course also checks functional command of Portuguese. You need a category B licence held for more than three years with the group 2 endorsement and a clean record. The certificate is valid for five years and is renewed with an 8-hour continuing course. Holders of a valid taxi driver certificate need neither the course nor the exam. The IMT publishes the list of questions the final assessment draws on.",
    rows: [
      { label: "Run by", value: "IMT or an IMT-authorised exam centre" },
      { label: "Before the exam", value: "Initial course, at least 50 hours" },
      { label: "Questions", value: "30 multiple choice" },
      { label: "Pass mark", value: "27 of 30 (90%)" },
      { label: "Time", value: "60 minutes (press reports)" },
      { label: "Language", value: "Portuguese" },
      { label: "Certificate valid", value: "5 years, renewable" },
      { label: "Tigertest mock tests", value: "5 x 30 questions in Portuguese, 27 to pass" },
    ],
    basedOn: "Lei 45/2018 as republished by Lei 59/2026 (arts. 10, 10-A, 11 to 15 and 19), Portaria 293/2018 as amended by Portaria 344/2024, and the IMT page on TVDE driver certification, checked November 2026",
    source: { name: "IMT: TVDE driver certification", url: "https://www.imt-ip.pt/?p=10228" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Portuguese)" per LANGUAGES.md 3.5; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## lib/tigerAssets.ts

Add to `BORROWED_SETS` with the other car tests: `pttvde: "driving",`

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx (teacher-led)

The exam is the final assessment of a compulsory 50-hour course at a driving school or
IMT-recognised training entity, so it is set by trainers, like `sgvl`:
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"pttvde"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `pttvde: "the TVDE driver initial course",`
  (English copy; the Portuguese landing does not render `ExamClassFaq`.)

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the native `landingPath` under `/pt` is emitted once, hreflang
`pt-PT`, x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 42 to 60, so no parts.

## lib/examSources.json, lib/examFreshness.json

- Run `python3 -I tools/build_exam_sources.py` (the first three https URLs of `sources.md` are
  Lei 59/2026, the IMT certification page and Portaria 293/2018).
- Suggested freshness event (the portarias Lei 59/2026 calls for are unpublished):

```json
{ "exam": "pttvde", "date": "2027-03-01", "kind": "law", "what": "Portarias under Lei 59/2026 (dístico model, Portuguese-language check, training and final assessment procedures) may change the course or the exam; re-read and update the vehicle and regulation items", "source": "https://files.diariodarepublica.pt/1s/2026/08/16400/0000300044.pdf" }
```

## Screenshots

`TranslatedExamLanding` reads `/landing/pttvde-{mobile,desktop}-pt.png` (or the plain names, as
the platform decided for `detheorie`):
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing pttvde:exame-tvde:22801`

## CLAUDE.md (after the Portugal IMT bullet, or in the native-language exams)

```md
- **Exame TVDE** (`pttvde`, Portugal's TVDE ride-hailing driver exam, the IMT final assessment for the certificado de motorista de TVDE, base language European Portuguese, `language: "pt"`, `locale: "pt-PT"`, `review: { pt: "model" }`, `/exame-tvde/*`, landing `/pt/exame-tvde-teste` from `lib/landings/pttvde.pt.json`): `data/pt-tvde-questions.json` (200 original questions written directly in Portuguese on the initial course subjects and the TVDE law: regulation of the activity 42, vehicle, sticker and registration 26, service, price and passenger rights 34, communication and interpersonal relations 34, legal driving rules 16, defensive and eco-driving 26, emergencies and first aid 22), five 30-question tests (IDs 22801-22805, 6/4/5/5/3/4/3 per test, Tigertest's weights; the last items of each pool, 50 in all, are training-only) and four topic sets 22801-22804 (regulation 42, vehicle and service 60, passengers and emergencies 56, driving 42), 9 dashboard steps, state `PTTVDE`, prefix `PTTVDE-`, 90% pass (27 of 30, the real rule: Lei 45/2018 art. 10(8) as republished by Lei 59/2026; 60 minutes per the press, at the IMT or an authorised exam centre after the 50-hour course; taxi certificate holders exempt). Law as in force November 2026, including Lei 59/2026 (in force 1 September 2026: vehicles under 10 years, 12 for electric; non-removable sticker with QR code; dynamic fares with the formula shown first; Portuguese-speaking driver option; optional image-only video by consent; 25% intermediation cap); the portarias it calls for are unpublished, so their details are not asked. No fees, fares or fines; alcohol limits left to `ptimt`. Kept clear of `ptimt` and `ptcam` stems. The IMT's own published question list is never used; the landing points to it. Built by `tools/next100/pttvde/build.py`; sources in `tools/next100/pttvde/sources.md`, terms in `glossary.md`. Region PT, hub group "Portugal driving and transport tests", `[data-theme="pttvde"]` deep amethyst (266 60% 34%), borrows the car tiger, teacher-led (TVDE course training entities).
```

## Decisions for the integrator

1. **Hue.** The suggested 268 45% 32% clashes with `aurcg` and `ssccpo`; `266 60% 34%` is clear.
2. **Lei 59/2026.** The law changed on 1 September 2026, after the brief's research notes (which
   cite the 2024 Portaria only). The bank follows the republished law; items on the vehicle age
   (10/12 years), the non-removable dístico and its QR code, dynamic fares, the Portuguese-speaking
   driver option and video recording depend on it. The dístico model and the language-check
   portaria are unpublished.
3. **Time limit.** 60 minutes is from the press only (Portaria 344/2024 text not reached); the
   landing and examFacts label it.
4. **Language.** No official source offers the exam in another language; copy says Portuguese.
5. **Hub group and region.** Shares "Portugal driving and transport tests" with `ptcam` and
   `ptmoto`; not in `NON_DRIVING_TESTS`.
6. **Teacher-led.** Proposed, since the exam closes a compulsory course; drop if unwanted.
7. **Register.** Questions and landing in the formal third person ("Deve parar"), like `ptimt`'s
   Portuguese pages.
