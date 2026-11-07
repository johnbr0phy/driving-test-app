# Wiring for `huelsoseg` (Hungarian road first aid exam for the driving licence, in Hungarian, v1)

A native-language exam (base language Hungarian, `language: "hu"`), built from the `detheorie`
template and laid out like `dkjagt`. The Hungarian phase-0 pieces (`i18n/hu.ts`, `EXAM_UI.hu`,
`COPY.hu`, `SAMPLE_COPY.hu`, `RELATED_COPY.hu`, `CARD_FOOTERS.hu`, the `hu` shuffle guard,
`LANG_RULES["hu"]`, `/hu/` in `lib/urlLanguage.ts`, HUF in `TranslatedExamLanding`'s currency
table) already exist (checked 2026-11-06), so nothing language-level is left. This is the first
Hungarian-language exam: the HU region and its homepage stay English (`hukresz`).

Files already written by the builder:
- `data/hungary-first-aid-questions.json` (200, validator PASS with `--lang hu`)
- `lib/banks/huelsoseg.ts`
- `app/elsosegely-vizsga/*` (5 wrappers: layout, page, dashboard, drill, stats; copied from
  `app/jagtproeve/`; drill and stats import the bank)
- `lib/landings/huelsoseg.hu.json` (Hungarian landing content, `facts.source` the decree on
  net.jogtar.hu)
- `app/hu/elsosegely-vizsga-teszt/page.tsx` (three-line `TranslatedExamLanding` wrapper,
  `lang="hu"`, `samples`, `related`)
- `tools/next100/huelsoseg/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/huelsoseg/build.py`. Validate with:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/hungary-first-aid-questions.json --lang hu --pool huelHelyszin=32 --pool huelVizsgalat=28 --pool huelUjraeleszt=32 --pool huelGyermek=20 --pool huelVerzes=28 --pool huelSerules=24 --pool huelKornyezet=16 --pool huelBelgyogy=20`
-> `letters {'A': 50, 'C': 50, 'D': 49, 'B': 51}  avg option 22 chars  key-longest 10%  key>1.2x 3%  PASS`.
`python3 -I tools/check_banks.py` PASS.

Format note (31/1992. NM rendelet and the Magyar Vöröskereszt exam rules MVK-SZ-036, checked
2026-11-06, see sources.md): every first driving licence needs proof of road first aid
knowledge, examined only by the county and Budapest organisations of the Magyar Vöröskereszt.
The exam is mainly practical (compulsory one-rescuer CPR, examination of the casualty, recovery
position, then an "A" and a "B" task from a drawn card) with the theory asked orally (some
counties write it); 2 to 4 candidates at a time; graded megfelelt / nem felelt meg, a fail-level
error or an act that would worsen the casualty fails. No question count, time or pass mark
exists. A course is optional; the exam is based on Hornyák István's "Elsősegélynyújtás
mindenkinek". Health professionals are exempt with their diploma, and secondary-school drivers
with the certificate of the online first aid exam (OMSZ course for students). Tigertest models
the theory behind the tasks: four 50-question tests (200 items, pools exactly 4x each per-test
count, every item in exactly one test) at `passPct: 80` = 40 of 50, Tigertest's readiness line.
The practical part is not modelled; the landing says so. Four topic sets 24601-24604 + 4 tests =
8 dashboard steps.

## lib/exams.ts

Add `"huelsoseg"` to the `ExamId` union. Icon `bandage` already exists (cpr, ukfaw, casfa,
aufirstaid). The 24600 block is the one assigned in the brief (hukreszmoto 24400); set ids
24601-24604 share numbers with test ids 24601-24604 like other topic-set exams.

```ts
const huelsoseg: ExamConfig = {
  id: "huelsoseg",
  stateCode: "HUELSOSEG",
  idBase: 24600,
  slug: "/elsosegely-vizsga",
  landingPath: "/hu/elsosegely-vizsga-teszt",
  name: "Elsősegély vizsga teszt a jogosítványhoz",
  shortName: "Elsősegély vizsga",
  examLabel: "Közúti elsősegélynyújtási vizsga",
  fullName: "Közúti elsősegélynyújtási vizsga a vezetői engedélyhez",
  questionIdPrefix: "HUELS-",
  icon: "bandage",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  language: "hu",
  locale: "hu-HU",
  english: {
    name: "Hungary First Aid Exam for the Driving Licence",
    shortName: "Hungarian first aid exam",
    fullName: "Hungarian road first aid exam for the driving licence (közúti elsősegélynyújtási vizsga), in Hungarian",
  },
  review: { hu: "model" },
  // Real exam (31/1992. (XII. 19.) NM rendelet; Magyar Vöröskereszt MVK-SZ-036 exam rules,
  // checked 2026-11-06): examined by the Red Cross county organisations; mainly practical
  // (one-rescuer CPR, casualty examination, recovery position, then an "A" and a "B" task from a
  // drawn card) with oral or written theory; megfelelt / nem felelt meg, no question count or
  // pass mark. passPct 80 (40 of 50) is Tigertest's readiness line. Categories follow the Red
  // Cross list of fail-level errors and the ERC 2025 first aid and BLS guidelines (Hungarian
  // summary, Orv Hetil 2026;167(33)); the 8/7/8/5/7/6/4/5 split is Tigertest's own. Four tests
  // of 50, pools exactly 4x each count (200, all original, written in Hungarian).
  blueprint: {
    huelHelyszin: 8,
    huelVizsgalat: 7,
    huelUjraeleszt: 8,
    huelGyermek: 5,
    huelVerzes: 7,
    huelSerules: 6,
    huelKornyezet: 4,
    huelBelgyogy: 5,
  },
  // Four topic sets, not testSets(): 4 + 4 tests = 8 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 24601, name: "Helyszín és betegvizsgálat", categories: ["huelHelyszin", "huelVizsgalat"], size: 60, weightLabel: "15 kérdés az 50-ből tesztenként" },
    { setNumber: 2, id: 24602, name: "Újraélesztés és félrenyelés", categories: ["huelUjraeleszt", "huelGyermek"], size: 52, weightLabel: "13 kérdés az 50-ből tesztenként" },
    { setNumber: 3, id: 24603, name: "Vérzések és sérülések", categories: ["huelVerzes", "huelSerules"], size: 52, weightLabel: "13 kérdés az 50-ből tesztenként" },
    { setNumber: 4, id: 24604, name: "Égés, mérgezés és belgyógyászat", categories: ["huelKornyezet", "huelBelgyogy"], size: 36, weightLabel: "9 kérdés az 50-ből tesztenként" },
  ],
  categoryLabels: {
    huelHelyszin: "Baleseti helyszín, segélyhívás és mentés",
    huelVizsgalat: "Betegvizsgálat, eszméletlenség és fektetés",
    huelUjraeleszt: "Felnőtt újraélesztés és AED",
    huelGyermek: "Félrenyelés, gyermek és csecsemő",
    huelVerzes: "Vérzések, sebek és sokk",
    huelSerules: "Törések, fej-, gerinc- és mellkassérülések",
    huelKornyezet: "Égés, áramütés, mérgezés, hő és hideg",
    huelBelgyogy: "Belgyógyászati vészhelyzetek",
  },
  copy: {
    guestPrompt: "hogy elmentsd a haladásodat az elsősegély vizsgához, és minden rossz válaszodat számon tartsd",
    trainingHeading: "Gyakorlókészletek",
    trainingSub: "Minden gyakorlókészlet a vizsga két témakörét fedi le. Azonnal látod, jól válaszoltál-e, és a rossz válaszaid visszajönnek, amíg biztosan nem tudod őket.",
    testsHeading: "Tesztek · 50 kérdés, 40 a cél",
    heroSubs: [
      "Négy gyakorlókészlet, négy teszt. Kezdd a helyszínnel és az újraélesztéssel.",
      "Előbb tanuld meg a készletet, aztán írd meg a tesztet.",
      "Félúton jársz. Írj meg egy tesztet.",
      "Gyakorold a hibáidat, aztán teszteld magad újra.",
      "Minden zöld. Jelentkezz az elsősegély vizsgára.",
    ],
    sourceLine: "Saját kérdések az ERC 2025-ös irányelvei, a KRESZ és a Btk. alapján, 2026. novemberi állapot. A gyakorlati részt (újraélesztés bábun, kötözés) kézzel kell begyakorolni.",
    analyticsKey: "huelsoseg",
  },
};
```

Append `huelsoseg` to the `EXAMS` array with the other first aid exams (after `aufirstaid`) or
with the Hungarian exams (after `hukresz`). ID header comment if wanted:
` *   HUELSOSEG 24600s (tests 24601-24604, sets 24601-24604)`.

## lib/banks/all.ts

```ts
import "./huelsoseg";
```

## types/index.ts

- `QuestionType`: add `| "HUELSOSEG"`.
- `QuestionCategory`, under a `// Hungarian road first aid exam (elsősegély vizsga)` comment
  (`huel` grepped against `types/index.ts` and the sibling WIRING files: no clash):

```ts
  | "huelHelyszin"
  | "huelVizsgalat"
  | "huelUjraeleszt"
  | "huelGyermek"
  | "huelVerzes"
  | "huelSerules"
  | "huelKornyezet"
  | "huelBelgyogy"
```

## i18n

Results and stats read `exam.categoryLabels` first, so nothing is needed for Hungarian. If a
dictionary still needs the keys, `i18n/en.ts` (others fall back to English):

```ts
    huelHelyszin: "Accident Scene, Calling for Help & Rescue",
    huelVizsgalat: "Assessment, Unconsciousness & Positions",
    huelUjraeleszt: "Adult CPR & AED",
    huelGyermek: "Choking, Children & Infants",
    huelVerzes: "Bleeding, Wounds & Shock",
    huelSerules: "Fractures, Head, Spine & Chest Injuries",
    huelKornyezet: "Burns, Electricity, Poisoning, Heat & Cold",
    huelBelgyogy: "Medical Emergencies",
```

## lib/shuffleOptions.ts

No position-dependent options ("A és B", "Mindkettő", "A fentiek mindegyike"); the build
asserts it. The platform's `hu` patterns cover the rest. All-number options (104 and the other
emergency numbers, seconds, the 30:2 count, grams) are sorted ascending by the build.

## app/globals.css

The suggested `345 45% 34%` clashes with `alcohol` (345 55% 36%), `txadjuster` (343 35% 32%)
and `gmat` (340 40% 40%). Checked against every `[data-theme]` in `app/globals.css` and the
pending sibling blocks with the rule (within 8 degrees: 15 points of saturation or 8 of
lightness apart): `345 20% 34%`, a muted wine red, is clear (nearest txadjuster 343 35% 32%,
15 points of saturation apart; aursa 352 40% 30%, 20 points apart). White text on it is about
8:1. Fallback: `355 25% 30%` (also clear). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Hungarian road first aid exam (elsősegély vizsga) theme */
  [data-theme="huelsoseg"] {
    --brand: 345 20% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 345 30% 96%;
    --brand-hover: 345 20% 28%;
    --brand-dark: 345 22% 22%;
    --brand-darker: 345 25% 15%;
    --brand-muted: 345 12% 66%;
    --brand-border: 345 15% 80%;
    --brand-border-light: 345 15% 90%;
    --brand-gradient-to: 0 60% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `huelsoseg: "Four 50-question tests in Hungarian for the road first aid exam every Hungarian learner driver must pass: the accident scene and calling 112, examination and the recovery position, adult CPR and AED, choking and child CPR, bleeding and shock, fractures and spinal injuries, burns and poisoning, and medical emergencies, written from the ERC 2025 guidelines and Hungarian law as of November 2026.",`
- `EXAM_ORG`: `huelsoseg: "Magyar Vöröskereszt county organisations · közúti elsősegélynyújtási vizsga, in Hungarian",`
- Hub group: the Hungary group for its non-driving tests, as proposed in the `hugki` WIRING file,
  placed right after "EU driving theory tests" (which holds `hukresz`):
  `{ title: "Hungary licences and professional exams", ids: ["hugki", "huelsoseg", "hubizt"] },`
  (drop ids that are not wired). If that group is not made, put `huelsoseg` in "Emergency
  services" after `cpr`. Either way add
  `RELATED_OVERRIDES`: `huelsoseg: ["hukresz", "cpr", "ukfaw", "aufirstaid"],`
  so the related row shows the Hungarian driving test and other first aid tests.
- `SEARCH_ALIASES` (Hungarian and English):
  `huelsoseg: "elsősegély vizsga elsosegely vizsga elsősegélynyújtási vizsga elsősegély teszt elsősegély tanfolyam elsősegély jogosítvány vöröskeresztes vizsga voroskereszt vizsga közúti elsősegély újraélesztés teszt elsősegély tételek kresz elsősegély magyar elsősegély hungary first aid exam hungarian first aid test driving licence hungary first aid red cross exam hungary budapest debrecen szeged pécs győr",`
- Native name on Hungarian surfaces, `english.name` elsewhere (the platform's language field).

## lib/region.ts

```ts
  huelsoseg: "HU",
```
(in `TEST_REGIONS`, next to `hukresz: "HU"`). Not a driving test, so add it to
`NON_DRIVING_TESTS`. Region `HU` already exists with `lang: "en"`; the Hungarian landing works
under the `/hu/` prefix (`lib/urlLanguage.ts`, `includeRoot: false`, so `/hu` itself stays the
English homepage). Optional: `REGION_HOME.HU` could mention the first aid exam in its lead once
it is in the catalog, for example add to `lead`: " Also: the road first aid exam every learner
driver needs, practised in Hungarian." (English, since the HU homepage is English).

## lib/landingContent.ts

```ts
import huelsosegHu from "@/lib/landings/huelsoseg.hu.json";
  "huelsoseg.hu": huelsosegHu as TranslatedLandingContent,
```

## app/hu/layout.tsx

None needed (`lib/urlLanguage.ts` maps the pages under `/hu/` to `hu`). `TranslatedExamLanding`
uses the base `landingPath` when `lang === exam.language`; currency HUF is already in its
`CURRENCY` table.

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  huelsoseg: {
    answer:
      "Every first driving licence in Hungary needs proof of road first aid knowledge (közúti elsősegélynyújtási ismeretek), examined only by the county and Budapest organisations of the Hungarian Red Cross (Magyar Vöröskereszt). The exam is mainly practical: you perform one-rescuer CPR, examine a casualty and put an unconscious casualty in the recovery position, then solve an \"A\" and a \"B\" task from a drawn card, such as controlling bleeding, splinting or treating a burn. The theory is asked orally, or in writing at some county organisations. There is no question count or pass mark: the examiner grades you pass or fail, and a fail-level error (for example wrong CPR depth or rate, a pressure bandage on the neck, or removing a helmet without holding the neck) or anything that would worsen the casualty fails. A course is optional; the exam is based on the book Elsősegélynyújtás mindenkinek by István Hornyák. Health professionals are exempt with their diploma, and secondary-school students with the certificate of the online first aid exam. The exam is in Hungarian.",
    rows: [
      { label: "Run by", value: "Hungarian Red Cross county and Budapest organisations" },
      { label: "Practical part", value: "CPR, casualty examination, recovery position" },
      { label: "Drawn task", value: "One \"A\" and one \"B\" task (bleeding, splints, burns...)" },
      { label: "Theory", value: "Oral, or written at some counties" },
      { label: "Result", value: "Pass or fail, no points" },
      { label: "Course", value: "Optional" },
      { label: "Language", value: "Hungarian" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Hungarian, 40 to pass" },
    ],
    basedOn: "Decree 31/1992 (XII. 19.) NM, the Hungarian Red Cross first aid exam rules (MVK-SZ-036, examinee extract 2022) and the ERC 2025 first aid and BLS guidelines as summarised for Hungary (Orvosi Hetilap 2026), checked November 2026",
    source: { name: "Decree 31/1992 (XII. 19.) NM on net.jogtar.hu (in Hungarian)", url: "https://net.jogtar.hu/jogszabaly?docid=99200031.nm" },
  },
```

## lib/shareCardCopy.ts

```ts
  huelsoseg: { title: "Hungary First Aid Exam", description: "Practise CPR, the recovery position, bleeding, injuries and medical emergencies in Hungarian for the road first aid exam." },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Hungarian)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the Hungary batch.

## lib/tigerAssets.ts

`BORROWED_SETS`: `huelsoseg: "cpr",` (the CPR tiger, as the brief asks).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Driving schools and Red Cross branches run the preparation courses, so a class can practise
together. Optional, if the integrator wants course leaders to pick it:
- `TEACHER_LED`: add `"huelsoseg"`.
- `TEACHES`: `huelsoseg: "a first aid course for learner drivers",` (the landing is Hungarian,
  so the class FAQ is not rendered there).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the `/hu/...` landing is emitted once, hreflang `hu-HU`,
x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 36 to 60, so no parts.

## Question quality hooks

Run `python3 -I tools/build_exam_sources.py` (the first three https URLs of `sources.md` are the
decree on net.jogtar.hu, the Red Cross exam rules PDF and the Hajdú-Bihar county exam rules).
No dated change is known; the bank follows the ERC 2025 guidelines (next ERC revision due about
2030), so no `lib/examFreshness.json` event is needed now.

## Screenshots

`TranslatedExamLanding` reads `/landing/huelsoseg-{mobile,desktop}-hu.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing huelsoseg:elsosegely-vizsga:24601`
then rename the files to the `-hu` names (and their `-dark` twins).

## CLAUDE.md (after the Hungary KRESZ bullet, or with the other first aid exams)

```md
- **Elsősegély vizsga** (`huelsoseg`, the Hungarian road first aid exam every first driving licence needs (közúti elsősegélynyújtási vizsga, 31/1992. NM rendelet), Tigertest's first Hungarian-language exam, base language Hungarian, `language: "hu"`, `locale: "hu-HU"`, `review: { hu: "model" }`, `/elsosegely-vizsga/*`, landing `/hu/elsosegely-vizsga-teszt` from `lib/landings/huelsoseg.hu.json`): `data/hungary-first-aid-questions.json` (200 original questions written directly in Hungarian, in the polite "Ön" form: accident scene, calling 112 or 104, KRESZ 58. § and Btk. 166. and 239. §, Rautek grip and helmet removal 32, ABCDE, ACVPU, recovery position and positions 28, adult CPR and AED 32, choking, child and infant CPR 20, bleeding, wounds and shock 28, fractures, head, spine and chest injuries 24, burns, electricity, poisoning, heat, cold, drowning and viper bites 16, medical emergencies 20), four 50-question tests (IDs 24601-24604, 8/7/8/5/7/6/4/5 per test, Tigertest's split, no spares) and four Hungarian-named topic sets 24601-24604 (Helyszín és betegvizsgálat 60, Újraélesztés és félrenyelés 52, Vérzések és sérülések 52, Égés, mérgezés és belgyógyászat 36), 8 dashboard steps, state `HUELSOSEG`, prefix `HUELS-`, 80% readiness line (40 of 50, Tigertest's: the real exam, run only by the Magyar Vöröskereszt county organisations, is mainly practical (one-rescuer CPR, casualty examination, recovery position, then an "A" and "B" task from a drawn card) with oral or written theory, graded megfelelt / nem felelt meg with no question count or pass mark; secondary-school students may use the online exam certificate instead). Content follows the ERC 2025 first aid and BLS guidelines as summarised for Hungary in Orvosi Hetilap 2026;167(33) (5-6 cm, 100-120 a minute, 30:2, call 112 for every unresponsive person, AED within 1 minute, children start with 5 breaths, 250 mg aspirin chewed, no cervical collars, open chest wounds left open) and the Red Cross list of fail-level errors; no tourniquet, pressure-point or elevation items (the older Red Cross list and ERC 2025 disagree), no fees. The practical part is not modelled. English names in `english`. Built by `tools/next100/huelsoseg/build.py`; sources in `tools/next100/huelsoseg/sources.md`, terms in `glossary.md`. Region HU, hub group "Hungary licences and professional exams" (with hugki and hubizt), `[data-theme="huelsoseg"]` muted wine red (345 20% 34%), borrows the CPR tiger.
```

## Decisions for the integrator

1. **Hue** `345 20% 34%` instead of the suggested `345 45% 34%` (clashes with alcohol,
   txadjuster and gmat).
2. **No real question count or pass mark.** The brief's "written multiple-choice test" is not
   how the Red Cross exam works: the official rules say it is mainly practical with oral theory
   (a few counties write the theory). Tigertest's 4 x 50 at 80% is a readiness line, and the
   landing, FAQ and examFacts say so.
3. **Hub group** shared with hugki and hubizt ("Hungary licences and professional exams"), or
   "Emergency services" after `cpr` if that group is not made.
4. **Topic weights** are Tigertest's, led by the Red Cross fail-error list.
5. **Guideline conflicts left out**: tourniquet for bleeding, pressure points and limb elevation
   (older Red Cross list vs ERC 2025), and recovery position for trauma casualties (recovery
   position items use non-trauma casualties).
6. **Register**: questions in the polite "Ön" form; landing and dashboard copy in "te".
7. **Siblings**: grepped hukresz, hukreszmoto and hugki (English; accident, helmet and 112
   items) and hubizt (insurance): no shared fact-and-answer pairs.
