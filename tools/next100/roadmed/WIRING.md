# Wiring for `roadmed` (Romania medicine admission exam, Biologie și Chimie, written in Romanian, v1)

A native-language exam like `detheorie`: the base bank and base copy are Romanian
(`language: "ro"`). Files already written by the builder:
- `data/romania-medicine-admission-questions.json` (200, validator PASS with `--lang ro`)
- `lib/banks/roadmed.ts`
- `app/admitere-medicina/*` (5 wrappers copied from `app/fuehrerschein-theorie/`: layout,
  redirect, dashboard, drill, stats; no test or practice folders)
- `lib/landings/roadmed.ro.json` (Romanian landing content, with a Romanian `facts.source`)
- `app/ro/admitere-medicina-grile/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `ro`)
- `tools/next100/roadmed/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/roadmed/build.py`. Everything below goes in shared files.

Format note (checked 2026-11-07, see `sources.md`): every university of medicine and pharmacy
sets its own written grile test. UMF "Carol Davila" 2026 regulation: Medicine and Dental Medicine
100 questions in 2 h 30 min, Biology 60 compulsory + Chemistry or Physics 40 by choice, each
question one correct answer (complement simplu or grupat), 1 point, minimum admission grade 5,
ranked by score. UMF "Iuliu Hațieganu" Cluj 2026 guide: Biology and Chemistry, 2 hours,
multiple-answer grile, calculator handed out for chemistry. Tigertest models four 50-question tests
(30 biology, 20 chemistry, the Carol Davila 60:40 split; pools exactly 4x each count, every item
in one test), single answer of four, equal weight; Physics, genetics and multiple-answer formats
are not modelled. `passPct: 80` (40 of 50) is Tigertest's readiness target: admission is ranked.
Training: 5 topic sets (24801-24805, all at most 60) + 4 tests = 9 dashboard steps.

## lib/exams.ts

Add `"roadmed"` to the `ExamId` union. Icon `stethoscope` already exists. 24800-24899 were
free on 2026-11-07 (no `248xx` in `lib/exams.ts` or any `tools/next100/*/WIRING.md`). Set ids
24801-24805 share numbers with test ids 24801-24804 like other topic-set exams (`detheorie`).

```ts
const roadmed: ExamConfig = {
  id: "roadmed",
  stateCode: "ROADMED",
  idBase: 24800,
  slug: "/admitere-medicina",
  landingPath: "/ro/admitere-medicina-grile",
  name: "Admitere Medicină: Biologie și Chimie",
  shortName: "Admitere Medicină",
  examLabel: "Admitere Medicină (grile)",
  fullName: "Concursul de admitere la Medicină: Biologie (anatomie și fiziologie umană) și Chimie organică",
  questionIdPrefix: "ROADM-",
  icon: "stethoscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  language: "ro",
  locale: "ro-RO",
  english: {
    name: "Romania Medicine Admission Exam (Biology and Chemistry)",
    shortName: "Romania medicine admission",
    fullName: "Romanian medical school admission exam (admitere medicină), biology and chemistry, in Romanian",
  },
  review: { ro: "model" },
  // Real test (checked 2026-11-07): each UMF sets its own written grile test on its own syllabus
  // extracts. UMF Carol Davila 2026 regulation: 100 questions in 2 h 30 min, Biology 60 + Chemistry
  // or Physics 40, one correct answer each (complement simplu / grupat), 1 point each, minimum
  // grade 5, ranked by score. UMF Cluj 2026 guide: Biology and Chemistry, 2 hours, multiple-answer
  // grile. Tigertest: 4 x 50, 30 biology (grade XI anatomy and physiology) + 20 organic chemistry
  // (grades X and XI), single answer of four; Physics, genetics and multiple answers not modelled.
  // The split inside each subject is Tigertest's own. passPct 80 is Tigertest's target.
  blueprint: {
    roadmNervos: 7,
    roadmAnaliz: 6,
    roadmMiscare: 4,
    roadmDigestie: 5,
    roadmCirc: 6,
    roadmExcrRep: 2,
    roadmHidro: 6,
    roadmFunctionali: 7,
    roadmBiocompusi: 7,
  },
  // Five topic sets, not testSets(): 5 + 4 tests = 9 dashboard steps, each set a textbook block.
  trainingSets: [
    { setNumber: 1, id: 24801, name: "Sistemul nervos și analizatorii", categories: ["roadmNervos", "roadmAnaliz"], size: 52, weightLabel: "13 din 50 de întrebări pe test" },
    { setNumber: 2, id: 24802, name: "Mișcarea și digestia", categories: ["roadmMiscare", "roadmDigestie"], size: 36, weightLabel: "9 din 50 de întrebări pe test" },
    { setNumber: 3, id: 24803, name: "Circulația, respirația, excreția și reproducerea", categories: ["roadmCirc", "roadmExcrRep"], size: 32, weightLabel: "8 din 50 de întrebări pe test" },
    { setNumber: 4, id: 24804, name: "Hidrocarburi și grupe funcționale", categories: ["roadmHidro", "roadmFunctionali"], size: 52, weightLabel: "13 din 50 de întrebări pe test" },
    { setNumber: 5, id: 24805, name: "Compuși cu importanță biologică", categories: ["roadmBiocompusi"], size: 28, weightLabel: "7 din 50 de întrebări pe test" },
  ],
  categoryLabels: {
    roadmNervos: "Sistemul nervos",
    roadmAnaliz: "Analizatorii și glandele endocrine",
    roadmMiscare: "Organizarea corpului, oasele și mușchii",
    roadmDigestie: "Digestia, absorbția și metabolismul",
    roadmCirc: "Sângele, circulația și respirația",
    roadmExcrRep: "Excreția și reproducerea",
    roadmHidro: "Chimie organică: introducere și hidrocarburi",
    roadmFunctionali: "Compuși cu grupe funcționale",
    roadmBiocompusi: "Compuși cu importanță biologică, izomerie, acizi și baze",
  },
  copy: {
    guestPrompt: "ca să-ți salvezi progresul pentru admitere și să vezi fiecare grilă greșită",
    trainingHeading: "Seturi de exerciții",
    trainingSub: "Fiecare set acoperă un bloc din manualele de biologie și chimie. Afli imediat dacă ai răspuns corect, iar grilele greșite revin până le știi sigur.",
    testsHeading: "Teste · 50 de grile, 30 de biologie și 20 de chimie",
    heroSubs: [
      "Cinci seturi pe capitole, patru teste. Biologia are cea mai mare pondere.",
      "Stăpânește setul, apoi dă testul.",
      "Ai trecut de jumătate. Încearcă un test.",
      "Repetă greșelile, apoi refă testul.",
      "Totul e verde. Verifică regulamentul UMF-ului tău și mult succes.",
    ],
    sourceLine: "După manualele de biologie (clasa a XI-a) și chimie organică (clasele a X-a și a XI-a) și tematicile UMF pentru 2026. Grile originale, nu din caietele de concurs; nu suntem afiliați niciunei universități.",
    analyticsKey: "roadmed",
  },
};
```

Append `roadmed` to the `EXAMS` array after the other Romania exams (`rodrpciv`, `rocpi`,
`rotaxi`). The set names are Romanian topic names, so `TEST_SET_NAMES.ro` is not used.
`ExamDashboard` shows topic sets first, then the tests (like `detheorie`).

## lib/banks/all.ts

```ts
import "./roadmed";
```

## types/index.ts

- `QuestionType`: add `| "ROADMED"`.
- `QuestionCategory`, under a `// Romania medicine admission exam (Biologie și Chimie)` comment
  (`grep '"roadm' types/index.ts` was empty on 2026-11-07):

```ts
  | "roadmNervos"
  | "roadmAnaliz"
  | "roadmMiscare"
  | "roadmDigestie"
  | "roadmCirc"
  | "roadmExcrRep"
  | "roadmHidro"
  | "roadmFunctionali"
  | "roadmBiocompusi"
```

## i18n

Results and stats read `exam.categoryLabels` first (Romanian above). For English surfaces add to
`i18n/en.ts` (the other dictionaries fall back to English):

```ts
    roadmNervos: "Nervous System",
    roadmAnaliz: "Sense Organs & Endocrine Glands",
    roadmMiscare: "Body Organisation, Bones & Muscles",
    roadmDigestie: "Digestion, Absorption & Metabolism",
    roadmCirc: "Blood, Circulation & Respiration",
    roadmExcrRep: "Excretion & Reproduction",
    roadmHidro: "Organic Chemistry Basics & Hydrocarbons",
    roadmFunctionali: "Functional Group Compounds",
    roadmBiocompusi: "Biological Compounds, Isomerism, Acids & Bases",
```

If `i18n/ro.ts` carries category names, add the Romanian labels from `categoryLabels` there too.

## lib/shuffleOptions.ts

Nothing extra: the build asserts no "Toate cele de mai sus" / "Niciuna dintre" options and the
validator found no whole-option "A și B" forms; the platform's `ro` patterns cover the rest.

## app/globals.css

The brief's `350 45% 34%` clashes with `alcohol` (345 55% 36%), `aursa` (352 40% 30%), `rrbalp`,
`texesppr` and `txadjuster`. A scan of every light theme plus all `tools/next100/*/WIRING.md`
blocks on 2026-11-07 found free slots from hue 340 to 352 only at lightness 24%. Suggested: deep
burgundy `340 45% 24%` (clear by the rule; white text well above 4.5:1). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Romania medicine admission exam (Admitere Medicină) theme */
  [data-theme="roadmed"] {
    --brand: 340 45% 24%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 340 40% 96%;
    --brand-hover: 340 45% 20%;
    --brand-dark: 340 45% 18%;
    --brand-darker: 340 45% 12%;
    --brand-muted: 340 25% 62%;
    --brand-border: 340 30% 80%;
    --brand-border-light: 340 30% 90%;
    --brand-gradient-to: 340 50% 94%;
  }
```

## lib/shareCards.ts, lib/shareCardCopy.ts, lib/shareImageUrl.ts (as `detheorie` has them)

```ts
  "roadmed": {
    "color": "hsl(340, 45%, 24%)",
    "tint": "hsl(340, 40%, 96%)"
  },
```
`shareCardCopy.ts`: `roadmed: { title: "Romania Medicine Admission Exam", description: "Practise grade XI anatomy and physiology and organic chemistry grile in Romanian for the UMF admission test." },`
`shareImageUrl.ts`: add `"roadmed"` to `SHARE_COPY_IDS`.

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `roadmed: "Four 50-question mock tests in Romanian for medical school admission in Romania (admitere Medicină): 30 biology questions on grade XI human anatomy and physiology and 20 on organic chemistry, every answer explained, written from the shared high-school syllabus that each UMF's test draws on.",`
- `EXAM_ORG`: `roadmed: "Universities of medicine and pharmacy (UMF) · admission grile, in Romanian",`
- Hub group, as agreed by the Romania siblings: new, right after `{ title: "EU driving theory tests", ... }`:
  `{ title: "Romania licences and professional exams", ids: ["rocpi", "rotaxi", "roadmed", "rorezid"] },`
  (drop any member not wired). `RELATED_OVERRIDES` (the group's others are driving and taxi
  tests): `roadmed: ["rorezid", "neet", "jambbio", "apbio"],` (drop `rorezid` if not wired).
- `SEARCH_ALIASES` (Romanian and English):
  `roadmed: "admitere medicina admitere medicină grile admitere medicina teste admitere medicina admitere umf umf carol davila admitere carol davila umf cluj iuliu hatieganu umf iasi umf timisoara umf craiova umf targu mures admitere stomatologie medicina dentara grile biologie grile biologie clasa a xi a anatomie si fiziologie grile chimie organica chimie organica clasa a x a admitere farmacie concurs admitere medicina pregatire admitere medicina meditatii medicina romania medical school admission romania medicine entrance exam romania medical school entrance test biology chemistry romania",`
- Native name on Romanian surfaces, `english.name` elsewhere (as for `detheorie`).

## lib/region.ts

- `TEST_REGIONS`: `roadmed: "RO",`
- `NON_DRIVING_TESTS`: add `"roadmed"` (an admission exam).
- Region RO is English (`rodrpciv` is in English); this landing lives under `/ro/`, which
  `lib/urlLanguage.ts` already marks Romanian. `REGION_HOME.RO` (integrator's call with the
  batch): widen to "driving theory, professional and medical admission tests".

## lib/landingContent.ts

Only if the Romania homepage is ever shown in Romanian (it quotes landings in the page's
language):

```ts
import roadmedRo from "@/lib/landings/roadmed.ro.json";
  "roadmed.ro": roadmedRo as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  roadmed: {
    answer:
      "There is no single national medical school entrance exam in Romania: each state university of medicine and pharmacy (UMF Carol Davila Bucharest, Iuliu Hațieganu Cluj-Napoca, Grigore T. Popa Iași, Victor Babeș Timișoara and the others) sets its own written multiple-choice test (grile) on a syllabus and textbook list it publishes each year. At UMF Carol Davila in 2026 the Medicine test had 100 questions in 2 hours 30 minutes: 60 on biology (human anatomy and physiology, compulsory) and 40 on chemistry or physics by the candidate's choice, each with one correct answer and worth one point; places go to the highest scores, with a minimum grade of 5. UMF Cluj's 2026 test covered biology and chemistry in 2 hours with multiple-answer questions. The tests are in Romanian and are usually held in July.",
    rows: [
      { label: "Run by", value: "Each university of medicine and pharmacy (UMF)" },
      { label: "Example: UMF Carol Davila 2026", value: "100 questions, 2 h 30 min" },
      { label: "Subjects (Carol Davila)", value: "Biology 60 + Chemistry or Physics 40" },
      { label: "Example: UMF Cluj 2026", value: "Biology and Chemistry, 2 hours, multiple answers" },
      { label: "Ranking", value: "By score; minimum grade 5 at Carol Davila" },
      { label: "Language", value: "Romanian" },
      { label: "Tigertest mock tests", value: "4 x 50 in Romanian (30 biology, 20 chemistry), 40 to pass" },
    ],
    basedOn: "UMF Carol Davila admission regulation 2026 (Senate, 22 January 2026) and UMF Iuliu Hațieganu Cluj admission guide 2026, checked November 2026",
    source: { name: "UMF Carol Davila: admission regulation 2026", url: "https://umfcd.ro/wp-content/uploads/2026/ADMITERE_2026/REGULAMENTUL_DE_ADMITERE/UMFCD_Regulament%20admitere%20licenta%202026_SENAT%2022.01.2026.pdf" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Romanian)" as for `detheorie`; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the Romania batch.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Teacher-led (meditații and UMF / private prep courses):
- `TEACHER_LED`: `"roadmed"`
- `TEACHES`: `roadmed: "medical school admission prep courses and biology and chemistry tutoring (meditații)",`
`TranslatedExamLanding` does not render `ExamClassFaq`; nothing more unless the platform adds it
for native landings (its copy would need Romanian).

## lib/tigerAssets.ts

`BORROWED_SETS`: `roadmed: "sat",` (like `neet` and the JAMB sciences, the other medical
school entrance exams).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the native `landingPath` under `/ro` is emitted once, with
hreflang `ro-RO` and x-default to itself). Class questions import `lib/banks/all`. No redirects.

## Question quality hooks

Run `python3 -I tools/build_exam_sources.py` (sources.md lists the two official UMF documents
first) and `python3 -I tools/check_banks.py`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 28 to 52, so no parts. Then
`npx tsx scripts/build-landing-dates.ts`.

## Screenshots

`TranslatedExamLanding` reads `/landing/roadmed-{mobile,desktop}-ro.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing roadmed:admitere-medicina:24801`
then rename the two files to the `-ro` names (as for `detheorie`).

## CLAUDE.md (after the Romania Driving Theory bullet, or with the native-language exams)

```md
- **Admitere Medicină** (`roadmed`, Romania's medical school admission exam, Biology and Chemistry, base language Romanian, `language: "ro"`, `locale: "ro-RO"`, `review: { ro: "model" }`, `/admitere-medicina/*`, landing `/ro/admitere-medicina-grile` from `lib/landings/roadmed.ro.json`): `data/romania-medicine-admission-questions.json` (200 original questions written directly in Romanian on the shared high-school syllabus: Biologie clasa a XI-a as nervous system 28, analyzers and endocrine glands 24, body organisation, bones and muscles 16, digestion and metabolism 20, blood, circulation and respiration 24, excretion and reproduction 8; organic chemistry (clasele a X-a și a XI-a) as introduction and hydrocarbons 24, functional groups 28, biological compounds, optical isomerism and acid-base character 28), four 50-question tests (IDs 24801-24804, 30 biology + 20 chemistry, the UMF Carol Davila 60:40 split, 7/6/4/5/6/2/6/7/7 per test, no spares) and five Romanian-named topic sets 24801-24805, 9 dashboard steps, state `ROADMED`, prefix `ROADM-`, 80% pass (Tigertest's target: admission is ranked by score). Each UMF sets its own test; the landing gives Carol Davila 2026 (100 questions, 2 h 30 min, Biology 60 + Chemistry or Physics 40, one correct answer each, minimum grade 5) and Cluj 2026 (Biology and Chemistry, 2 hours, multiple answers) as dated examples. Single answer of four; multiple-answer formats, Physics and genetics are not modelled. Never copied from any UMF's caiet de concurs or published question pool. Built by `tools/next100/roadmed/build.py` (sorts all-number options with Romanian decimal commas); sources in `tools/next100/roadmed/sources.md`, terms in `glossary.md`. Region RO, hub group "Romania licences and professional exams", `[data-theme="roadmed"]` deep burgundy (340 45% 24%), borrows the SAT tiger, teacher-led (meditații and prep courses).
```

## Decisions for the integrator

1. **Hue.** `340 45% 24%` instead of the brief's `350 45% 34%` (clashes listed above).
2. **Pass mark.** 80 (40 of 50) is Tigertest's target; no real pass mark exists beyond the
   ranking and Carol Davila's minimum grade 5.
3. **Scope.** Biology XI and organic chemistry only; genetics (XII) is not in Cluj's 2026 list and
   was left out; Physics (Carol Davila's alternative second subject) is not modelled.
4. **Excretion and reproduction** is a small pool (8, 2 per test); widen it in a later pass if
   reviewers want more weight there.
5. **Register.** Questions impersonal (grile-book style), landing and dashboard copy in "tu".
