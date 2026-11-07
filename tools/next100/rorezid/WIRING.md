# Wiring for `rorezid` (Romania Rezidențiat, domeniul Medicină; written in Romanian, v1, RO)

A native-language exam like `detheorie`: base bank and base copy are Romanian (`language: "ro"`).
Files already written by the builder:
- `data/romania-rezidentiat-questions.json` (200, validator PASS with `--lang ro`)
- `lib/banks/rorezid.ts`
- `app/rezidentiat/*` (layout, redirect, dashboard, drill, stats, copied from `app/fuehrerschein-theorie/`;
  no test or practice folders)
- `lib/landings/rorezid.ro.json` (Romanian landing content, Romanian `facts.source`)
- `app/ro/rezidentiat-medicina-grile/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `ro`)
- `tools/next100/rorezid/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/rorezid/build.py` (prints the key-longest share).

Format note (sources.md, checked 2026-11-07): one national 200-question test per domain in 4 hours,
Romanian only, Sunday 15 November 2026, same model and bibliography as 2025. 25% complement simplu
(1 of 5, 4 points), 75% complement multiplu (2 to 4 of 5, 5 points), maximum 950; results on the
spot; pass at 60% of the national maximum achieved; specialties chosen in score order. Tigertest
models four 50-question tests (a quarter of the paper at its pace, 1 min 12 s a question), single
best answer of four, equal weight, so `passPct: 60` approximates the 60% rule. DMV-style sets
`testSets(24900, 4)`: 4 sets + 4 tests = 8 dashboard steps. Book weights 100 Kumar / 80 Lawrence /
20 Sinopsis (the 2025 paper had 92 / 84 / 24 per a prep company's count).

## lib/exams.ts

Add `"rorezid"` to the `ExamId` union. Icon `stethoscope` exists. 24901-24904 are free (rocpi is 25000).

```ts
const rorezid: ExamConfig = {
  id: "rorezid",
  stateCode: "ROREZID",
  idBase: 24900,
  slug: "/rezidentiat",
  landingPath: "/ro/rezidentiat-medicina-grile",
  name: "Grile Rezidențiat Medicină",
  shortName: "Rezidențiat Medicină",
  examLabel: "Concursul de Rezidențiat, domeniul Medicină",
  fullName: "Concursul național de admitere în Rezidențiat, domeniul Medicină",
  questionIdPrefix: "ROREZ-",
  icon: "stethoscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  language: "ro",
  locale: "ro-RO",
  english: {
    name: "Romania Medical Residency Exam (Rezidențiat, Medicine)",
    shortName: "Romania residency exam",
    fullName: "Romania national medical residency entrance exam (Rezidențiat), Medicine, in Romanian",
  },
  review: { ro: "model" },
  // Real exam (Ministry of Health, Comisia Centrală de Rezidențiat; 2025 instructions, same model
  // in 2026; checked 2026-11-07): 200 questions in 4 hours, one national test per domain, booklets
  // A to D; 50 complement simplu (1 of 5, 4 points) and 150 complement multiplu (2 to 4 of 5,
  // 5 points), maximum 950; results on the spot; pass at 60% of the national maximum achieved.
  // Bibliography (Medicină, 2025 and 2026): Kumar și Clark ed. 10, Lawrence ed. 6, Sinopsis de
  // medicină ed. 5, tematica chapters only. Modelled: 4 x 50, single answer of four, equal weight;
  // the 8-category split (Kumar 50%, Lawrence 40%, Sinopsis 10%) is Tigertest's.
  blueprint: {
    roreCardio: 7,
    rorePneuNeuro: 6,
    roreGastroRenal: 6,
    roreEndoHem: 6,
    roreChirGen: 8,
    roreChirDig: 6,
    roreChirSpec: 6,
    roreSinopsis: 5,
  },
  trainingSets: testSets(24900, 4),
  categoryLabels: {
    roreCardio: "Cardiologie, HTA și boala tromboembolică",
    rorePneuNeuro: "Pneumologie și neurologie",
    roreGastroRenal: "Gastroenterologie, hepatologie și nefrologie",
    roreEndoHem: "Diabet, endocrinologie, hematologie, reumatologie și infecții",
    roreChirGen: "Chirurgie generală, traumă și tub digestiv superior",
    roreChirDig: "Colon, căi biliare, pancreas, ficat și vase",
    roreChirSpec: "ORL, ortopedie și urologie",
    roreSinopsis: "Pediatrie, obstetrică-ginecologie, dermatologie, psihiatrie",
  },
  copy: {
    guestPrompt: "ca să-ți salvezi progresul pentru Rezidențiat și să ții evidența fiecărei grile greșite",
    trainingHeading: "Seturi de antrenament",
    trainingSub: "Fiecare set are întrebările testului cu același număr. Primești imediat răspunsul și explicația, iar grilele greșite revin până le știi sigur.",
    testsHeading: "Teste · 50 de întrebări, 60% pentru promovare",
    heroSubs: [
      "Patru seturi, patru teste. Medicina internă și chirurgia aduc cele mai multe grile.",
      "Întâi stăpânește setul, apoi dă testul.",
      "Ai trecut de jumătate. Dă un test.",
      "Repetă greșelile, apoi testează-te din nou.",
      "Totul e verde. Mult succes la Rezidențiat.",
    ],
    sourceLine: "Grile originale pe tematica domeniului Medicină (Kumar și Clark, Lawrence, Sinopsis de medicină), noiembrie 2026. Un singur răspuns corect din 4; complementul multiplu și punctajul de 950 nu sunt reproduse. Nu suntem afiliați Ministerului Sănătății.",
    analyticsKey: "rorezid",
  },
};
```

Append `rorezid` to `EXAMS` after the other Romania exams. No `translations` (an English version
would be `translations.en`). The set names come from `TEST_SET_NAMES.ro` ("Setul de antrenament N").

## lib/banks/all.ts

```ts
import "./rorezid";
```

## types/index.ts

- `QuestionType`: add `| "ROREZID"`.
- `QuestionCategory`, under a `// Romania Rezidențiat, domeniul Medicină` comment:

```ts
  | "roreCardio"
  | "rorePneuNeuro"
  | "roreGastroRenal"
  | "roreEndoHem"
  | "roreChirGen"
  | "roreChirDig"
  | "roreChirSpec"
  | "roreSinopsis"
```

(Grepped: no `rore*` key exists; siblings use `roadm*`, `rocpi*`, `rotx*`, `rodr*`.)

## i18n

If results and `/stats` read `exam.categoryLabels` first (LANGUAGES.md 2.1), nothing is needed.
Otherwise `i18n/ro.ts`: the eight Romanian labels above; `i18n/en.ts` (others fall back):

```ts
    roreCardio: "Cardiology, Hypertension & VTE",
    rorePneuNeuro: "Respiratory & Neurology",
    roreGastroRenal: "Gastroenterology, Liver & Kidney",
    roreEndoHem: "Diabetes, Endocrine, Haematology, Rheumatology & Infection",
    roreChirGen: "General Surgery, Trauma & Upper GI",
    roreChirDig: "Colorectal, Biliary, Pancreas, Liver & Vascular",
    roreChirSpec: "ENT, Orthopaedics & Urology",
    roreSinopsis: "Paediatrics, Obstetrics & Gynaecology, Dermatology, Psychiatry",
```

## lib/shuffleOptions.ts

No position-dependent Romanian options ("Ambele", "Toate cele de mai sus"...); the build asserts
it and the `ro` patterns already exist.

## app/globals.css

The suggested `200 45% 28%` is identical to `phr`. Checked the whole sheet plus the Romania siblings'
proposals: `194 75% 24%` (deep clinical teal blue) has no theme within 8 degrees closer than
15 points of saturation or 8 of lightness. White text well above 4.5:1. Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Romania Rezidențiat Medicină theme */
  [data-theme="rorezid"] {
    --brand: 194 75% 24%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 194 60% 96%;
    --brand-hover: 194 75% 20%;
    --brand-dark: 194 75% 17%;
    --brand-darker: 194 75% 12%;
    --brand-muted: 194 30% 62%;
    --brand-border: 194 40% 78%;
    --brand-border-light: 194 40% 88%;
    --brand-gradient-to: 194 70% 92%;
  }
```

## lib/shareCards.ts, lib/shareCardCopy.ts, lib/shareImageUrl.ts (as siblings have them)

```ts
  "rorezid": {
    "color": "hsl(194, 75%, 24%)",
    "tint": "hsl(194, 60%, 96%)"
  },
```
`shareCardCopy.ts`: `rorezid: { title: "Grile Rezidențiat Medicină", description: "Grile originale în limba română pe tematica Rezidențiatului, domeniul Medicină: Kumar și Clark, Lawrence, Sinopsis de medicină." },`
(Card footers in the exam's language per `CARD_FOOTERS.ro`.) `shareImageUrl.ts`: add `"rorezid"` to `SHARE_COPY_IDS`.

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `rorezid: "Practice in Romanian for Romania's medical residency exam (Rezidențiat, Medicine): cardiology, respiratory, gastroenterology, nephrology, endocrinology and haematology from Kumar and Clark, general and specialist surgery from Lawrence, and paediatrics, obstetrics and psychiatry from Sinopsis de medicină, in four 50-question tests.",`
- `EXAM_ORG`: `rorezid: "Ministerul Sănătății · Comisia Centrală de Rezidențiat, domeniul Medicină, in Romanian",`
- Hub group: the Romania non-driving group the siblings propose, after "EU driving theory tests"
  (Romania's category B test sits there):
  `{ title: "Romania licences and professional exams", ids: ["rocpi", "rotaxi", "roadmed", "rorezid"] },`
  (same line as `rocpi`'s WIRING; drop any sibling not wired. If the integrator splits medical
  from driver exams: `{ title: "Romania medical exams", ids: ["roadmed", "rorezid"] }`.)
- `RELATED_OVERRIDES`: `rorezid: ["roadmed", "pknle", "uknmc", "gulfrn"],`
- `SEARCH_ALIASES` (Romanian and English):
  `rorezid: "rezidentiat rezidențiat grile rezidentiat grile rezidențiat medicina rezidentiat medicina 2026 concurs rezidentiat examen rezidentiat simulare rezidentiat teste rezidentiat kumar si clark kumar clark grile lawrence chirurgie grile sinopsis de medicina grile rezi rezi 2026 umf rezidentiat medic rezident specialitate admitere rezidentiat comisia centrala de rezidentiat ministerul sanatatii romania medical residency exam romanian residency exam romania residency medicine rezidentiat practice test",`
- Native name on Romanian surfaces, `english.name` elsewhere (LANGUAGES.md 1.6).

## lib/region.ts

`TEST_REGIONS`: `rorezid: "RO",` (next to `rodrpciv: "RO"`). Add `"rorezid"` to
`NON_DRIVING_TESTS`. Region RO stays `lang: "en"` (its homepage is English); the landing lives
under `/ro/`, which `lib/urlLanguage.ts` already marks Romanian (`/ro` prefix, `includeRoot: false`).
`REGION_HOME.RO` and `faqsFor("RO")`: coordinate with `rocpi`, `rotaxi` and `roadmed`. If the
homepage lists local tests, add to `testsSub`: "Rezidențiat Medicină: 200 de întrebări în 4 ore,
în limba română." and an FAQ: "Is there practice for Romania's medical residency exam? Yes,
Tigertest has free practice in Romanian for the Rezidențiat, Medicine domain: original questions
on the Kumar and Clark, Lawrence and Sinopsis de medicină chapters in the official syllabus."

## lib/landingContent.ts

```ts
import rorezidRo from "@/lib/landings/rorezid.ro.json";
  "rorezid.ro": rorezidRo as TranslatedLandingContent,
```

## app/ro/layout.tsx

Not needed: `/ro/*` already gets `lang="ro"` from `lib/urlLanguage.ts`. `TranslatedExamLanding`
must render the base-language landing (`lang === exam.language`, URL `exam.landingPath`, locale
`ro-RO`, currency RON if it shows a price; the copy names none). hreflang: `ro-RO` and x-default to
itself (no English version).

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  rorezid: {
    answer:
      "Romania's national residency entrance exam (concursul de Rezidențiat) is run by the Ministry of Health through the Central Residency Commission at six university centres: Bucharest, Cluj-Napoca, Craiova, Iasi, Targu Mures and Timisoara. The 2026 session is on Sunday 15 November 2026, with the same model and reading list as 2025. Each domain (Medicine, Dentistry, Pharmacy) sits one national multiple-choice test of 200 questions in 4 hours, in Romanian: a quarter are single-answer questions (one correct of five, 4 points) and three quarters are multiple-answer questions (two to four correct of five, 5 points), for a maximum of 950 points. Candidates learn their score on the spot. You pass with at least 60% of the highest score achieved nationally in your domain, and residency places are chosen in score order. For Medicine the syllabus covers set chapters of Kumar and Clark's Clinical Medicine, Lawrence's General Surgery and Surgical Specialties and Sinopsis de medicina.",
    rows: [
      { label: "Run by", value: "Ministry of Health, Central Residency Commission" },
      { label: "2026 session", value: "Sunday 15 November 2026" },
      { label: "Questions", value: "200 in 4 hours, one national test per domain" },
      { label: "Question types", value: "50 single-answer, 150 multiple-answer, 5 options each" },
      { label: "Maximum score", value: "950 points (4 per single, 5 per multiple)" },
      { label: "Pass mark", value: "60% of the national top score in the domain" },
      { label: "Language", value: "Romanian" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Romanian, single answer, 60% to pass" },
    ],
    basedOn: "Ministry of Health announcements for the 2025 and 2026 sessions, the Central Residency Commission's 2025 instructions for candidates and the 2025 Medicine syllabus (kept for 2026), checked November 2026",
    source: { name: "Ministerul Sănătății: Rezidențiat", url: "https://rezidentiat.ms.ro/" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Romanian)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` with a comment naming the Romania batch.

## lib/tigerAssets.ts

`BORROWED_SETS`: `rorezid: "nclex",` (like `pknle`, `kenck`).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Teacher-led (rezidențiat prep courses): add `"rorezid"` to `TEACHER_LED`. `TranslatedExamLanding`
does not render `ExamClassFaq` for a Romanian page; no change needed there.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the `/ro/...` landing is emitted once with hreflang `ro-RO`).
Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. Sets are 50, no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing rorezid:rezidentiat:24901`
then rename to `rorezid-{mobile,desktop}-ro.png` if `TranslatedExamLanding` reads the `-ro` names
(as for `detheorie`'s `-de` files).

## CLAUDE.md (after the Romania Driver CPC bullet, or with the native-language exams)

```md
- **Rezidențiat Medicină** (`rorezid`, Romania's national medical residency entrance exam, domeniul Medicină, run by the Ministry of Health's Comisia Centrală de Rezidențiat in six university centres, native-language exam, base language Romanian, `language: "ro"`, `locale: "ro-RO"`, `review: { ro: "model" }`, `/rezidentiat/*`, landing `/ro/rezidentiat-medicina-grile` from `lib/landings/rorezid.ro.json`): `data/romania-rezidentiat-questions.json` (200 original questions written directly in Romanian on the chapters of the 2025 Medicină tematica, kept for 2026: Kumar și Clark ed. 10 as cardiology, hypertension and VTE 28, respiratory and neurology 24, gastroenterology, liver and kidney 24, diabetes, thyroid, haematology, rheumatology, sepsis, acid-base and HIV 24; Lawrence ed. 6 as perioperative care, trauma, burns, hernias and upper GI 32, colorectal, biliary, pancreas, liver, spleen and vascular 24, ENT, orthopaedics and urology 24; Sinopsis de medicină ed. 5 as paediatrics, obstetrics and gynaecology, dermatology, psychiatry and epidemiology 20), test IDs 24901-24904 (50 questions each, a quarter of the real paper at its pace), sets `testSets(24900, 4)`, state `ROREZID`, prefix `ROREZ-`, 60% pass (approximates the real rule, 60% of the national maximum achieved). 7/6/6/6/8/6/6/5 per test (Tigertest's split; the 2025 paper had 92 Kumar, 84 Lawrence, 24 Sinopsis per a prep company's count). The real exam (15 November 2026, same model as 2025) is 200 questions in 4 hours, 50 complement simplu at 4 points and 150 complement multiplu (2 to 4 of 5) at 5 points, 950 maximum, results on the spot, Romanian only; five-option and multiple-answer items and the point scoring are not modelled. Current guideline values (Sepsis-3, ESC, GINA, GOLD, KDIGO, ADA, ATLS, Atlanta); past papers and grile books never used. Kept clear of `pknle`, `kenck` and the NCLEX banks (overlapping vignettes rewritten). Built by `tools/next100/rorezid/build.py` (sorts all-number options with Romanian decimal commas); sources in `tools/next100/rorezid/sources.md`, terms in `glossary.md`. Region RO, hub group "Romania licences and professional exams", `[data-theme="rorezid"]` deep clinical teal (194 75% 24%), borrows the NCLEX tiger, teacher-led (rezidențiat prep courses).
```

## Decisions for the integrator

1. **Official site down.** rezidentiat.ms.ro returned 503 on 2026-11-07; the tematica was read from
   a page-by-page copy and format facts from press reports quoting the Ministry. Re-check the 2026
   tematica PDF when the site is back (the Ministry said it is unchanged).
2. **Pass mark.** 60 approximates the real relative rule; the real exam is a ranking, so the landing
   tells candidates to aim for 80%+.
3. **Hue.** Suggested 200 45% 28% clashes exactly with `phr`; proposed `194 75% 24%`.
4. **Medical review.** Written to current guidelines by the builder (`review: { ro: "model" }`);
   a Romanian-speaking physician pass is recommended before `"native"`.
5. **Hub group.** Shared with `rocpi`/`rotaxi`/`roadmed`; a separate "Romania medical exams" group
   is the alternative.
