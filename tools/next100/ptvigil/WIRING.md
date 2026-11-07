# Wiring for `ptvigil` (Portugal private security guard exam, vigilante, PSP/CNESP, written in Portuguese, v1)

A native-language exam (base bank and copy in European Portuguese, `language: "pt"`,
`locale: "pt-PT"`), copied end to end from `detheorie`, with the security-exam shape of
`esvigilante`. Files already written by the builder:
- `data/pt-vigilante-questions.json` (200, validator PASS with `--lang pt`)
- `lib/banks/ptvigil.ts`
- `app/exame-vigilante/*` (5 wrappers: layout, redirect, dashboard, drill, stats)
- `lib/landings/ptvigil.pt.json` (Portuguese landing content, Portuguese `facts.source`)
- `app/pt/exame-vigilante-seguranca-privada/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `pt`)
- `tools/next100/ptvigil/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/ptvigil/build.py`. Validate with
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/pt-vigilante-questions.json --lang pt --pool ptvigRegime=36 --pool ptvigDireitos=20 --pool ptvigPenal=28 --pool ptvigAcessos=28 --pool ptvigVigilancia=20 --pool ptvigConflitos=20 --pool ptvigRelatorios=12 --pool ptvigEmergencia=36`.
Everything below goes in shared files.

Format note (Despacho n.º 8270/2019, Anexo, art. 8.º, read 2026-11-06): the CNESP theory exam is
on computer, 40 minutes, 20 questions, multiple choice with two to four options and one correct
answer or true/false, possibly with figures; pass with at least 10 correct. The task note's
provisional model (4 x 50 at a 70% Tigertest target) was replaced by the confirmed format:
eight real-length tests of 20 (IDs 23001-23008, 160 items; the last items of each pool, 40 in
all, are training-only) with `passPct: 50` (10 of 20, the real rule). Ours are always four
options; true/false and image questions are not modelled (landing says so). Training: 4 topic
sets (23001-23004, all 200 items) + 8 tests = 12 dashboard steps.

## lib/exams.ts

Add `"ptvigil"` to the `ExamId` union. Icon `shield` already exists. 23001-23008 are free (grep
found no idBase 23000 and nothing in 23000-23099 in `lib/exams.ts` or `lib/v2`). Set ids
23001-23004 share numbers with test ids like `uklitu` (tests 10101-10108, sets 10101-10104).

```ts
const ptvigil: ExamConfig = {
  id: "ptvigil",
  stateCode: "PTVIGIL",
  idBase: 23000,
  slug: "/exame-vigilante",
  landingPath: "/pt/exame-vigilante-seguranca-privada",
  name: "Exame de Vigilante de Segurança Privada",
  shortName: "Exame de vigilante",
  examLabel: "Exame teórico de vigilante (CNESP)",
  fullName: "Exame teórico de acesso à profissão de segurança privado, especialidade de vigilante (PSP, CNESP)",
  questionIdPrefix: "PTVIG-",
  icon: "shield",
  testCount: 8,
  questionsPerTest: 20,
  passPct: 50,
  language: "pt",
  locale: "pt-PT",
  english: {
    name: "Portugal Private Security Guard Exam (PSP)",
    shortName: "Portugal security guard exam",
    fullName: "Portugal private security guard (vigilante) theory exam set by the PSP at the CNESP, in Portuguese",
  },
  review: { pt: "model" },
  // Real exam (Despacho n.º 8270/2019 of the PSP Director Nacional, DR 2.ª série n.º 179, 18 Sep
  // 2019, Anexo arts. 1.º to 14.º; checked 2026-11-06): run by the PSP Departamento de Segurança
  // Privada at the CNESP, on computer, 40 minutes, 20 questions (multiple choice with 2 to 4
  // options and one correct, or true/false; figures allowed), pass with at least 10 correct;
  // content of the base and specific modules of Portaria 148/2014 (as amended by Portaria
  // 114/2015); booked by the training provider on SIGESP; pass valid 6 months for the card.
  // Categories follow the units BAS01-BAS06, UFCD 4478/4798, VIG01-VIG07, ALM01-ALM02; the
  // 4/2/3/3/2/2/1/3 split is Tigertest's (the PSP publishes no weights). Eight real-length
  // tests of 20; 40 training-only spares. Four options always, so passPct 50 = the real 10 of 20.
  blueprint: {
    ptvigRegime: 4,
    ptvigDireitos: 2,
    ptvigPenal: 3,
    ptvigAcessos: 3,
    ptvigVigilancia: 2,
    ptvigConflitos: 2,
    ptvigRelatorios: 1,
    ptvigEmergencia: 3,
  },
  // Four topic sets, not testSets(): 4 + 8 tests = 12 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 23001, name: "Regime jurídico e direitos fundamentais", categories: ["ptvigRegime", "ptvigDireitos"], size: 56, weightLabel: "6 de 20 perguntas por teste" },
    { setNumber: 2, id: 23002, name: "Direito penal, detenção e conflitos", categories: ["ptvigPenal", "ptvigConflitos"], size: 48, weightLabel: "5 de 20 perguntas por teste" },
    { setNumber: 3, id: 23003, name: "Acessos, vigilância e relatórios", categories: ["ptvigAcessos", "ptvigVigilancia", "ptvigRelatorios"], size: 60, weightLabel: "6 de 20 perguntas por teste" },
    { setNumber: 4, id: 23004, name: "Incêndios, socorrismo e segurança no trabalho", categories: ["ptvigEmergencia"], size: 36, weightLabel: "3 de 20 perguntas por teste" },
  ],
  categoryLabels: {
    ptvigRegime: "Regime jurídico da segurança privada",
    ptvigDireitos: "Direitos fundamentais e deontologia",
    ptvigPenal: "Direito penal, detenção e prova",
    ptvigAcessos: "Segurança física e controlo de acessos",
    ptvigVigilancia: "Vigilância eletrónica e alarmes",
    ptvigConflitos: "Gestão de conflitos e defesa pessoal",
    ptvigRelatorios: "Relatórios e comunicações",
    ptvigEmergencia: "Incêndios, socorrismo e segurança no trabalho",
  },
  copy: {
    guestPrompt: "para guardar o seu progresso para o exame de vigilante e não perder nenhuma pergunta errada",
    trainingHeading: "Conjuntos de treino",
    trainingSub: "Cada conjunto cobre um bloco das matérias do curso. Vê a resposta certa logo a seguir, e as perguntas que erra voltam até as dominar.",
    testsHeading: "Testes · 20 perguntas, 10 certas para passar",
    heroSubs: [
      "Quatro conjuntos de treino e oito testes. O regime jurídico da segurança privada é o que mais pesa.",
      "Domine o conjunto e depois faça o teste.",
      "Já vai a meio. Faça um teste completo.",
      "Reveja os erros e volte a fazer o teste.",
      "Tudo a verde. Está pronto para o exame no CNESP.",
    ],
    sourceLine: "Segundo a Lei n.º 34/2013 (redação da Lei n.º 46/2019), o Código Penal, o Código de Processo Penal e as matérias da Portaria n.º 148/2014, em vigor em novembro de 2026. Perguntas originais, não copiadas das questões divulgadas pela PSP; sempre quatro respostas, sem verdadeiro ou falso.",
    analyticsKey: "ptvigil",
  },
};
```

Append `ptvigil` to `EXAMS` after the other Portugal exams (`ptimt`, `ptcam`, `pttvde`, `ptmoto`).
`ExamDashboard` shows topic sets first, then the tests (like detheorie and esvigilante); the
results plan points at the weakest topic set.

## lib/banks/all.ts

```ts
import "./ptvigil";
```

## types/index.ts

- `QuestionType`: add `| "PTVIGIL"`.
- `QuestionCategory`, under a `// Portugal private security guard exam (ptvigil)` comment:

```ts
  | "ptvigRegime"
  | "ptvigDireitos"
  | "ptvigPenal"
  | "ptvigAcessos"
  | "ptvigVigilancia"
  | "ptvigConflitos"
  | "ptvigRelatorios"
  | "ptvigEmergencia"
```

## i18n

`ResultsHeroDebrief` and `/stats` prefer `exam.categoryLabels` since phase 0, so nothing is
needed. If a dictionary still needs them, the Portuguese labels are above and these go in
`i18n/en.ts`:

```ts
    ptvigRegime: "Private Security Law",
    ptvigDireitos: "Fundamental Rights & Ethics",
    ptvigPenal: "Criminal Law, Arrest & Evidence",
    ptvigAcessos: "Physical Security & Access Control",
    ptvigVigilancia: "Electronic Surveillance & Alarms",
    ptvigConflitos: "Conflict Management & Self-Defence",
    ptvigRelatorios: "Reports & Radio",
    ptvigEmergencia: "Fire, First Aid & Workplace Safety",
```

## lib/shuffleOptions.ts

No position-dependent options ("Todas as anteriores", "A e B", "Ambas"); the build asserts it.

## app/globals.css

The suggested `218 45% 24%` clashes with phlto (212 40% 26%), phcse (221 50% 30%), punjabpolice
(215 40% 18%) and aesira (220 55% 22%). Checked by script against every light theme in
`app/globals.css` plus every `--brand` in a `tools/**/WIRING*.md` (rule: within 8 degrees, differ
by 15 points of saturation or 8 of lightness): proposed `212 85% 20%` (deep PSP blue), clear of all.
Fallback `218 10% 24%` (slate grey-blue). White text well above 4.5:1. Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Portugal private security guard exam (vigilante, PSP) theme */
  [data-theme="ptvigil"] {
    --brand: 212 85% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 212 60% 96%;
    --brand-hover: 212 85% 16%;
    --brand-dark: 212 85% 13%;
    --brand-darker: 212 85% 9%;
    --brand-muted: 212 30% 62%;
    --brand-border: 212 35% 80%;
    --brand-border-light: 212 40% 89%;
    --brand-gradient-to: 212 55% 92%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `ptvigil: "Eight 20-question tests in Portuguese for Portugal's private security guard (vigilante) exam, the PSP theory test at the CNESP for the professional card: the Private Security Act (Lei 34/2013), citizen's arrest and self-defence, access control and searches, alarms and CCTV, conflict management, reports, fire, first aid and workplace safety, with the real 10-of-20 pass mark.",`
- `EXAM_ORG`: `ptvigil: "PSP (Portugal) · CNESP theory exam for the private security card, in Portuguese",`
- Hub group: Portugal's first non-driving test, so a new group placed right after the Portugal
  driving group (`"Portugal driving and transport tests"` proposed by ptcam; after
  `"EU driving theory tests"` if that group is not created):
  `{ title: "Portugal licences and professional certificates", ids: ["ptvigil"] },`
  With one member, `RELATED_OVERRIDES` pads it:
  `ptvigil: ["esvigilante", "iepsa", "uksia", "pttvde"],` (Spain, Ireland and UK security guard
  tests, then a Portuguese sibling).
- `SEARCH_ALIASES` (Portuguese and English):
  `ptvigil: "exame vigilante exame de vigilante exame vigilante psp exame segurança privada exame seguranca privada segurança privado seguranca privado teste vigilante testes vigilante perguntas exame vigilante cnesp exame cnesp exame teórico segurança privada exame teorico seguranca privada cartão profissional vigilante cartao profissional vigilante curso vigilante formação vigilante lei 34/2013 segurança porteiro seguranca porteiro vigilante psp sigesp portugal security guard exam portugal security licence portugal private security exam portuguese security guard test vigilante portugal",`
- Native name on the Portuguese homepage, `english.name` elsewhere (platform `nativeName`).

## lib/region.ts

- `TEST_REGIONS`: `ptvigil: "PT",` (next to `ptimt: "PT"`). Region PT already exists.
- NOT a driving test: add `ptvigil` to `NON_DRIVING_TESTS`.
- `REGION_HOME.PT` keeps the IMT car test as its CTA. With a non-driving Portuguese test live, a
  suggested extra sentence for `testsSub` (integrator's call, in Portuguese):
  `"E o exame teórico da PSP para o cartão profissional de vigilante: 200 perguntas, oito testes de 20, passa com 10."`
- `faqsFor("PT")` counts non-driving tests automatically; nothing exam-specific.

## lib/landingContent.ts

```ts
import ptvigilPt from "@/lib/landings/ptvigil.pt.json";
  "ptvigil.pt": ptvigilPt as TranslatedLandingContent,
```

## app/pt/layout.tsx

Already exists (from `ptimt`). The landing is `app/pt/exame-vigilante-seguranca-privada/page.tsx`
and uses `TranslatedExamLanding` with the base language, as `ptcam`, `pttvde` and `detheorie` do.

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  ptvigil: {
    answer:
      "To get the professional card of a private security guard (vigilante) in Portugal, candidates complete training at an authorised training provider (the base module common to every speciality, with first aid and fire prevention units, plus the vigilante module, under Portaria 148/2014) and then pass the PSP's theory exam at the Centro Nacional de Exames de Segurança Privada (CNESP). The training provider books the exam through the PSP's SIGESP system. It is taken on computer in an approved exam room: 20 questions in 40 minutes, either multiple choice with two to four options and one correct answer, or true/false, some with figures or images. You pass with at least 10 correct answers. A candidate without sufficient Portuguese is not admitted. After a fail a review can be requested within 48 hours, and a pass counts for six months toward the card application. The card is issued by the PSP and is valid for five years. The test is in Portuguese.",
    rows: [
      { label: "Run by", value: "PSP, Departamento de Segurança Privada (CNESP)" },
      { label: "Questions", value: "20, multiple choice (2 to 4 options) or true/false" },
      { label: "Time", value: "40 minutes" },
      { label: "Pass mark", value: "At least 10 correct (50%)" },
      { label: "Where", value: "On computer in a CNESP exam room" },
      { label: "Booking", value: "By the training provider, through SIGESP" },
      { label: "Pass counts for", value: "6 months toward the card application" },
      { label: "Professional card", value: "Issued by the PSP, valid 5 years" },
      { label: "Language", value: "Portuguese" },
      { label: "Tigertest mock tests", value: "8 x 20 questions in Portuguese, 10 to pass" },
    ],
    basedOn: "Despacho n.º 8270/2019 of the PSP (regulation of the private security theory exam), Lei 34/2013 as amended by Lei 46/2019 and Portaria 148/2014 as amended by Portaria 114/2015, checked November 2026",
    source: { name: "Diário da República: Despacho n.º 8270/2019", url: "https://diariodarepublica.pt/dr/detalhe/despacho/8270-2019-124780748" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Portuguese)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave; rerun
`npx tsx scripts/build-landing-dates.ts` after committing.

## lib/tigerAssets.ts

`BORROWED_SETS`: `ptvigil: "security",` (the security guard tiger).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx (teacher-led)

Every candidate must first complete the base and vigilante modules at an authorised training
provider, which also books the exam, so trainers would set it as class practice:
- `TEACHER_LED`: add `"ptvigil",`
- `TEACHES`: `ptvigil: "a private security (vigilante) training course",`
As for esvigilante, `TranslatedExamLanding` does not render `ExamClassFaq`; the nudge and
`/teach` still work.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check `/pt/exame-vigilante-seguranca-privada` is emitted once,
hreflang `pt-PT`, x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 36 to 60 (all at most 60),
so no parts.

## tools/build_exam_sources.py

Run `python3 -I tools/build_exam_sources.py` so `lib/examSources.json` picks up
`tools/next100/ptvigil/sources.md` (first URLs: the dre.pt PDF of the Despacho, its Diário da
República page, the RTP article).

## lib/examFreshness.json

```json
{ "exam": "ptvigil", "date": "2027-06-30", "kind": "review", "change": "The CNESP exam rules date from Despacho 8270/2019 and Lei 34/2013 was last amended in 2019; check for a new despacho, a Lei 34/2013 amendment or a new training portaria replacing Portaria 148/2014.", "action": "Re-read the Diário da República and psp.pt (Departamento de Segurança Privada) and update the landing, examFacts and sources.md.", "source": "https://diariodarepublica.pt/dr/detalhe/despacho/8270-2019-124780748" }
```
(Adapt to the file's field names.)

## Screenshots

`TranslatedExamLanding` reads `/landing/ptvigil-{mobile,desktop}-pt.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ptvigil:exame-vigilante:23001`
then rename to the `-pt` names, as for detheorie, esvigilante and ptcam.

## CLAUDE.md (after the Portugal driving and transport bullets, near `ptimt`)

```md
- **Exame de vigilante** (`ptvigil`, Portugal's private security guard theory exam, set by the PSP's Departamento de Segurança Privada at the Centro Nacional de Exames de Segurança Privada (CNESP) for the vigilante professional card, native-language exam, base language European Portuguese, `language: "pt"`, `locale: "pt-PT"`, English names in `english`, `review: { pt: "model" }`, `/exame-vigilante/*`, landing `/pt/exame-vigilante-seguranca-privada` from `lib/landings/ptvigil.pt.json`): `data/pt-vigilante-questions.json` (200 original questions written directly in Portuguese on the base module (BAS01-BAS06, UFCD 4478 first aid, 4798 fire) and vigilante module (VIG01-VIG07, ALM01-ALM02) of Portaria 148/2014: regime jurídico (Lei 34/2013) 36, direitos fundamentais e deontologia 20, direito penal, detenção (CPP arts. 255.º and 256.º) e prova 28, segurança física e controlo de acessos 28, vigilância eletrónica e alarmes 20, gestão de conflitos e defesa pessoal 20, relatórios e comunicações 12, incêndios, socorrismo e SST 36), eight real-length tests of 20 (IDs 23001-23008, 4/2/3/3/2/2/1/3 per test, Tigertest's split; the last items of each pool, 40 in all, are training-only) and four Portuguese-named topic sets 23001-23004 (56, 48, 60, 36), 12 dashboard steps, state `PTVIGIL`, prefix `PTVIG-`, 50% pass like the real exam (Despacho n.º 8270/2019: 20 questions in 40 minutes on computer, multiple choice with 2 to 4 options or true/false, some with images, at least 10 correct; booked by the training provider on SIGESP; Portuguese required). True/false and image items are not modelled; ours always have four options. Lei 34/2013 as amended by Lei 46/2019 (revistas only by despacho, same-sex pat-downs under police supervision, uniform and visible card, CCTV kept 30 days, handcuffs and batons banned), the Código Penal and CPP, the Constitution, Lei 58/2019, SCIE; no firearms, fees, coimas or officeholders; never copied from the questions the PSP publishes. Kept clear of `ptimt`, `ptcam`, `pttvde`, `esvigilante`, `iepsa` and `uksia`. Built by `tools/next100/ptvigil/build.py`; sources in `tools/next100/ptvigil/sources.md`, terms in `glossary.md`. Region PT, hub group "Portugal licences and professional certificates", `[data-theme="ptvigil"]` deep PSP blue (212 85% 20%), borrows the security guard tiger, teacher-led (authorised training providers).
```

## Decisions for the integrator

1. **Format confirmed, model changed.** The Despacho gives 20 questions, 40 minutes, 10 correct
   to pass, so the bank is eight real-length tests at `passPct: 50` instead of the provisional
   four 50-question tests at a 70% Tigertest target. If a stricter readiness line is wanted,
   `passPct: 70` (14 of 20) can be set and the copy, landing and examFacts "10 certas" lines
   changed with it.
2. **Hue.** `218 45% 24%` clashed with phlto, phcse, punjabpolice and aesira; proposed
   `212 85% 20%` (clear by script); fallback `218 10% 24%`.
3. **Hub group.** No Portugal non-driving group exists; proposed "Portugal licences and
   professional certificates", placed right after the Portugal driving group.
4. **psp.pt not read.** psp.pt returned 503 and reset connections; every format fact is from the
   Despacho in the Diário da República (read as PDF). The PSP's published CNESP question list was
   never opened, so nothing could be copied from it.
5. **Nationality requirement.** Lei 34/2013 art. 22.º limits the profession to Portuguese, EU/EEA
   and (with reciprocity) CPLP nationals. The task note's "immigrant recruits" line was not used
   in any copy.
6. **Facts for a native reviewer to spot-check:** PTVIG-EME-030 (employer provides and pays for
   PPE, Lei 102/2009 and DL 348/93), PTVIG-DIR-010 (CICDR receives racial discrimination
   complaints under Lei 93/2017; the CICDR has been an independent body since January 2024),
   PTVIG-VIG-008 (Lei 58/2019 art. 19.º camera exclusions, read through secondary summaries).
