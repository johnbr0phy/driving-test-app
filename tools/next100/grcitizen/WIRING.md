# Wiring for `grcitizen` (Εξετάσεις ΠΕΓΠ, Greek naturalisation knowledge test, written in Greek, v1)

Tigertest's first Greek native-language exam (`language: "el"`), built from the `detheorie`
template (structure) and `dkmedborger` (a native citizenship-type exam). The Greek platform pieces
already exist: `i18n/el.ts`, `EXAM_UI.el`, `COPY.el`, `SAMPLE_COPY.el`, `RELATED_COPY.el`,
`CARD_FOOTERS.el`, `TEST_SET_NAMES.el`, the shuffle guard's `el` entry, `LANG_RULES["el"]`,
`/el` in `lib/urlLanguage.ts` and `GR: "EUR"` in `TranslatedExamLanding`'s `CURRENCY`.

Files already written by the builder:
- `data/gr-citizenship-questions.json` (200, validator PASS with `--lang el`, see below)
- `lib/banks/grcitizen.ts`
- `app/eksetaseis-pegp/*` (5 wrappers copied from `app/medborgerskabsproeve/`: layout, redirect,
  dashboard, drill and stats; drill and stats import the bank; no test or practice folders)
- `lib/landings/grcitizen.el.json` (Greek landing content, `facts.source` the ministry's exam platform)
- `app/el/eksetaseis-pegp-politografisi/page.tsx` (three-line `TranslatedExamLanding` wrapper,
  `lang="el"`, `samples`, `related`)
- `tools/next100/grcitizen/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/grcitizen/build.py`.

## Validator: the Greek question mark (shared tool change needed)

Greek ends a question with «;» (U+003B), not «?». The bank uses it on 198 stems (2 are colon
completions). `validate_bank.py` only accepts `?` or `:`, so it reports 198 "stem does not end with
? or :" errors and nothing else. With this one-line change it prints PASS; please apply it to
`.claude/skills/exam-bank/scripts/validate_bank.py` (line 242):

```py
        if not (q.endswith("?") or q.endswith(":") or (args.lang == "el" and q.endswith(";"))):
```

Validated with a patched copy (identical otherwise):
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/gr-citizenship-questions.json --lang el --pool grcitGeo=48 --pool grcitCulture=40 --pool grcitHistory=56 --pool grcitInst=56`
-> `letters {'A': 43, 'B': 55, 'C': 55, 'D': 47}  avg option 16 chars  key-longest 20%  key>1.2x 19%  PASS`
`python3 -I tools/check_banks.py` -> PASS (280 v1 bank files).

If the app ever checks stem endings for `?` (none found), it needs the same allowance.

## Shape

The real exam (Οδηγός εξεταστικής διαδικασίας ΠΕΓΠ, April 2026; checked 2026-11-07) has three
parts. Part A (written, 150 minutes): the Θεματικές Ενότητες, 20 questions (4 geography,
4 culture, 6 history, 6 institutions), 2 points each, max 40; plus written Greek comprehension and
production (18 questions and an 80 to 100 word text). Part B: listening, 10 questions. Part C:
speaking, up to 15 minutes. Pass: at least 70/100 overall with at least 20/40 in the thematic
units and 40/60 in Greek. Topics are drawn on the day from the public Τράπεζα Θεμάτων.

Tigertest models only the thematic units: eight 20-question tests at the real 4/4/6/6 split
(test IDs 25201-25208; tests use 32/32/48/48 items, the last 16/8/8/8 of each pool, 40 in all,
are training-only), four topic sets 25201-25204 (48/40/56/56, all at most 60, no parts), so
4 + 8 = 12 dashboard steps. `passPct: 70` (14 of 20) is Tigertest's target: the real thematic
minimum is 10 of 20 correct (20/40), but the overall 70/100 includes the Greek-language part.
Original items with four options; the landing says the wording will not match the official bank
and that the language, essay and oral parts are not modelled.

## lib/exams.ts

Add `"grcitizen"` to the `ExamId` union. Icon `flag` exists. idBase 25200 was assigned by the
brief; check 25201-25208 are free. ID header comment: ` *   GRCITIZEN 25200s (tests 25201-25208, sets 25201-25204)`.

```ts
const grcitizen: ExamConfig = {
  id: "grcitizen",
  stateCode: "GRCITIZEN",
  idBase: 25200,
  slug: "/eksetaseis-pegp",
  landingPath: "/el/eksetaseis-pegp-politografisi",
  name: "Εξετάσεις ΠΕΓΠ για την πολιτογράφηση",
  shortName: "Εξετάσεις ΠΕΓΠ",
  examLabel: "Εξετάσεις ΠΕΓΠ",
  fullName: "Πιστοποιητικό Επάρκειας Γνώσεων για Πολιτογράφηση (Θεματικές Ενότητες)",
  questionIdPrefix: "GRCIT-",
  icon: "flag",
  testCount: 8,
  questionsPerTest: 20,
  passPct: 70,
  language: "el",
  locale: "el-GR",
  english: {
    name: "Greek Citizenship Test (PEGP)",
    shortName: "Greek citizenship test",
    fullName: "Greek naturalisation knowledge test (Πιστοποιητικό Επάρκειας Γνώσεων για Πολιτογράφηση, PEGP), thematic units, in Greek",
  },
  review: { el: "model" },
  // Real exam (General Secretariat for Citizenship, Οδηγός εξεταστικής διαδικασίας, April 2026;
  // checked 2026-11-07): Part A written, 150 min: thematic units 20 questions (4 geography,
  // 4 culture, 6 history, 6 institutions), 2 points each, max 40; written Greek 18 questions and
  // an 80-100 word text. Part B listening (10), Part C speaking (up to 15 min). Pass 70/100 with
  // at least 20/40 thematic and 40/60 Greek. Topics drawn on the day from the public question
  // bank. Only the thematic units are modelled, at the real 4/4/6/6 split; all items original.
  // passPct 70 (14 of 20) is Tigertest's target.
  blueprint: {
    grcitGeo: 4,
    grcitCulture: 4,
    grcitHistory: 6,
    grcitInst: 6,
  },
  // Four topic sets, not testSets(): 4 + 8 tests = 12 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 25201, name: "Γεωγραφία", categories: ["grcitGeo"], size: 48, weightLabel: "4 από τις 20 ερωτήσεις κάθε τεστ" },
    { setNumber: 2, id: 25202, name: "Πολιτισμός", categories: ["grcitCulture"], size: 40, weightLabel: "4 από τις 20 ερωτήσεις κάθε τεστ" },
    { setNumber: 3, id: 25203, name: "Ιστορία", categories: ["grcitHistory"], size: 56, weightLabel: "6 από τις 20 ερωτήσεις κάθε τεστ" },
    { setNumber: 4, id: 25204, name: "Θεσμοί του Πολιτεύματος", categories: ["grcitInst"], size: 56, weightLabel: "6 από τις 20 ερωτήσεις κάθε τεστ" },
  ],
  categoryLabels: {
    grcitGeo: "Γεωγραφία",
    grcitCulture: "Πολιτισμός",
    grcitHistory: "Ιστορία",
    grcitInst: "Θεσμοί του Πολιτεύματος",
  },
  copy: {
    guestPrompt: "για να κρατήσεις την πρόοδό σου για τις εξετάσεις ΠΕΓΠ και κάθε λάθος απάντηση",
    trainingHeading: "Σετ εξάσκησης",
    trainingSub: "Κάθε σετ καλύπτει μία Θεματική Ενότητα. Βλέπεις αμέσως τη σωστή απάντηση και την εξήγηση, και όσες ερωτήσεις έχασες ξανάρχονται ώσπου να τις μάθεις.",
    testsHeading: "Τεστ · 20 ερωτήσεις, στόχος 14",
    heroSubs: [
      "Τέσσερα σετ, οκτώ τεστ των 20 ερωτήσεων με την κατανομή της εξέτασης.",
      "Μάθε πρώτα το σετ, μετά κάνε το τεστ.",
      "Είσαι στα μισά. Κάνε ένα τεστ.",
      "Επανάλαβε τα λάθη σου και ξανακάνε το τεστ.",
      "Όλα πράσινα. Ώρα για τις εξετάσεις ΠΕΓΠ.",
    ],
    sourceLine: "Δικές μας ερωτήσεις στις τέσσερις Θεματικές Ενότητες, με βάση το Σύνταγμα και τον Οδηγό εξεταστικής διαδικασίας του Απριλίου 2026. Δεν είναι η επίσημη Τράπεζα Θεμάτων, και η γλώσσα και το προφορικό δεν προσομοιώνονται.",
    analyticsKey: "grcitizen",
  },
};
```

Append `grcitizen` to the `EXAMS` array with the citizenship tests (after `aucit`, or after the
Danish ones if wired). The set names are Greek topic names, so `TEST_SET_NAMES.el` is not used.
`ExamDashboard` shows topic sets first, then the tests (like CDL Endorsements and cacit).

## lib/banks/all.ts

```ts
import "./grcitizen";
```

## types/index.ts

- `QuestionType`: add `| "GRCITIZEN"`.
- `QuestionCategory`, under a `// Greek naturalisation knowledge test (ΠΕΓΠ)` comment:

```ts
  | "grcitGeo"
  | "grcitCulture"
  | "grcitHistory"
  | "grcitInst"
```

## i18n

Results and stats read `exam.categoryLabels` first, so nothing is needed for Greek. If a
dictionary still needs the keys, `i18n/en.ts` (others fall back to English):

```ts
    grcitGeo: "Geography",
    grcitCulture: "Culture",
    grcitHistory: "History",
    grcitInst: "Institutions of the Polity",
```

## lib/shuffleOptions.ts

No position-dependent Greek options («Και τα δύο», «Όλα τα παραπάνω», «Α και Β»); the build
asserts it.

## app/globals.css

The suggested `215 45% 34%` clashes with `security` (222 35% 36%), `sbiclerk` (209 40% 34%) and
`phcse` (221 50% 30%). Scanned every light `[data-theme]` block plus `grdriving` (210 55% 46%,
suggested) and `dkmedborger` (202 100% 26%) with the rule (within 8 degrees: 15 points of
saturation or 8 of lightness): the 210 to 220 band is clear only at very high saturation and low
lightness. Suggested `214 90% 22%`, a deep Greek blue (white text far above 7:1). Siblings
grinsure and grsecurity are being built now: check them against it. Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Greek naturalisation knowledge test (Εξετάσεις ΠΕΓΠ) theme */
  [data-theme="grcitizen"] {
    --brand: 214 90% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 214 80% 96%;
    --brand-hover: 214 90% 18%;
    --brand-dark: 214 90% 14%;
    --brand-darker: 214 90% 10%;
    --brand-muted: 214 40% 68%;
    --brand-border: 214 45% 80%;
    --brand-border-light: 214 45% 90%;
    --brand-gradient-to: 0 0% 98%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `grcitizen: "Eight 20-question mock tests in Greek for the thematic units of the Greek naturalisation exam (PEGP), split 4 geography, 4 culture, 6 history and 6 institutions like the real exam: mountains, rivers and regions, Orthodox customs and the arts, ancient to modern history, and the 1975 Constitution.",`
- `EXAM_ORG`: `grcitizen: "General Secretariat for Citizenship (Greece) · PEGP thematic units, in Greek",`
- Hub group: the brief asks for "Citizenship tests":
  `{ title: "Citizenship tests", ids: ["civics", "uklitu", "cacit", "aucit", "grcitizen"] },`
  (keep any Danish ids already added there). If the integrator instead opens a Greece group for
  the non-driving Greek tests, put it right after "EU driving theory tests":
  `{ title: "Greece citizenship and licensing exams", ids: ["grcitizen", "grinsure", "grsecurity"] },`
  with `RELATED_OVERRIDES`: `grcitizen: ["grdriving", "uklitu", "cacit", "aucit"],`
  (drop ids that are not wired). grmoto, a licence category, belongs in the driving group.
- `SEARCH_ALIASES` (Greek and English):
  `grcitizen: "εξετάσεις πεγπ π.ε.γ.π. πεγπ πιστοποιητικό επάρκειας γνώσεων για πολιτογράφηση εξετάσεις πολιτογράφησης εξετάσεις ιθαγένειας ελληνική ιθαγένεια τράπεζα θεμάτων ιθαγένειας θεσμοί του πολιτεύματος γεωγραφία ιστορία πολιτισμός eksetaseis pegp politografisi ithageneia greek citizenship test greece citizenship test greek naturalisation test greek naturalization exam pegp exam greek citizenship exam athens thessaloniki",`

## lib/region.ts

```ts
  grcitizen: "GR",
```
(in `TEST_REGIONS`, next to `grdriving: "GR"`). Region `GR` exists with `lang: "en"`; the Greek
landing lives under `/el` and runs in Greek whatever the region language. Not a driving test, so
add `"grcitizen"` to `NON_DRIVING_TESTS`. `REGION_HOME.GR` needs no change; the second local test
card comes from the hub group. If GR later switches to `lang: "el"`, write `REGION_HOME.GR` in Greek
and mention this test in it.

## app/el/layout.tsx (new, shared with any other Greek landing)

```tsx
// Every page under /el is Greek: Greek-language exam landings.
export default function GreekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="el">{children}</div>;
}
```

`TranslatedExamLanding` uses the base `landingPath` when `lang === exam.language`; currency EUR
via `CURRENCY.GR`.

## lib/landingContent.ts

Only needed when a Greek country homepage should quote the facts answer (GR is English today):

```ts
import grcitizenEl from "@/lib/landings/grcitizen.el.json";
  "grcitizen.el": grcitizenEl as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  grcitizen: {
    answer:
      "The Certificate of Adequate Knowledge for Naturalisation (Πιστοποιητικό Επάρκειας Γνώσεων για Πολιτογράφηση, PEGP) is required before you can apply for Greek citizenship by naturalisation. The General Secretariat for Citizenship of the Ministry of the Interior runs the exam, usually twice a year, in Greek only. It has three parts. Part A, up to 150 minutes on paper, holds the thematic units, 20 questions (4 on geography, 4 on culture, 6 on history and 6 on the institutions of the polity) worth 2 points each, and the written Greek section (18 questions and a short text of 80 to 100 words). Parts B and C test listening (10 questions) and speaking (up to 15 minutes). You pass with at least 70 of 100 points, provided you score at least 20 of 40 in the thematic units and 40 of 60 in Greek. Questions are drawn on the day from the official question bank, which is published on the exam platform. Candidates over 62 or with a learning difficulty answer the same questions orally.",
    rows: [
      { label: "Run by", value: "General Secretariat for Citizenship, Ministry of the Interior" },
      { label: "Thematic units", value: "20 questions: 4 geography, 4 culture, 6 history, 6 institutions" },
      { label: "Scoring", value: "2 points per correct thematic answer, 40 in all" },
      { label: "Greek language", value: "Written, listening and speaking, 60 points" },
      { label: "Pass mark", value: "70/100 overall, with at least 20/40 and 40/60" },
      { label: "Time", value: "Part A up to 150 minutes" },
      { label: "Language", value: "Greek only" },
      { label: "Tigertest mock tests", value: "8 x 20 thematic questions in Greek, 14 as a target" },
    ],
    basedOn: "The General Secretariat for Citizenship's exam procedure guides for written and oral candidates (April 2026) and the Ministry of Education's call for examiners of 3 March 2026, checked November 2026",
    source: { name: "PEGP exam platform, General Secretariat for Citizenship (in Greek)", url: "https://exetaseis-ithageneia.ypes.gr/" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Greek)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## lib/tigerAssets.ts

Borrow the US citizenship tiger like the other citizenship tests, in `BORROWED_SETS`:
`grcitizen: "civics",`.

## Teacher-led lists

Optional: Greek-language schools and university programmes (for example the University of
Ioannina's Hellenic Center) run preparation courses, so `TEACHER_LED` and `ExamClassFaq` fit if
the integrator wants classes to pick it. Not added by default, like dkmedborger.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the `/el/...` landing is emitted once, hreflang `el-GR`,
x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 40 to 56, so no parts.

## Question quality hooks

Run `python3 -I tools/build_exam_sources.py` (the first three https URLs of `sources.md` are the
exam platform, the written-candidate guide and the oral-candidate guide). Freshness: the
Τράπεζα Θεμάτων and the guide are reissued for each sitting (next: 15 November 2026). A possible
`lib/examFreshness.json` event: `{ "exam": "grcitizen", "date": "2027-03-01", "kind": "notice",
"action": "Check the spring 2027 guide for any change to the 4/4/6/6 split or the pass rule" }`.

## Screenshots

`TranslatedExamLanding` reads `/landing/grcitizen-{mobile,desktop}-el.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing grcitizen:eksetaseis-pegp:25201`
then rename the two files (and the dark twins) to the `-el` names.

## CLAUDE.md (after the Australian Citizenship bullet)

```md
- **Εξετάσεις ΠΕΓΠ** (`grcitizen`, the Greek naturalisation knowledge test, Πιστοποιητικό Επάρκειας Γνώσεων για Πολιτογράφηση, thematic units only, Tigertest's first Greek native-language exam, `language: "el"`, `locale: "el-GR"`, `review: { el: "model" }`, `/eksetaseis-pegp/*`, landing `/el/eksetaseis-pegp-politografisi` from `lib/landings/grcitizen.el.json`): `data/gr-citizenship-questions.json` (200 original questions written directly in Greek: geography 48, culture with Orthodox customs and the arts 40, history from the Minoans to 2002 56, the 1975 Constitution and its institutions 56), eight 20-question tests at the real 4/4/6/6 split (IDs 25201-25208; the last 16/8/8/8 of each pool, 40 in all, are training-only) and four Greek-named topic sets 25201-25204 (48/40/56/56), 12 dashboard steps, state `GRCITIZEN`, prefix `GRCIT-`, 70% (14 of 20, Tigertest's target). The real exam (General Secretariat for Citizenship, exam procedure guide April 2026) is Part A of 150 minutes with the 20 thematic questions at 2 points each (40) and written Greek (18 questions and an 80 to 100 word text), then listening and speaking; pass 70/100 with at least 20/40 thematic and 40/60 Greek; questions are drawn from the public Τράπεζα Θεμάτων, which is never copied, so wording differs and the landing says so. Language, essay and oral parts not modelled. Stems end with the Greek question mark «;» (validate_bank.py accepts it with `--lang el`). No officeholders, fees or current affairs. English names in `english`. Built by `tools/next100/grcitizen/build.py`; sources in `tools/next100/grcitizen/sources.md`, terms in `glossary.md`. Region GR, hub group "Citizenship tests", `[data-theme="grcitizen"]` deep Greek blue (214 90% 22%), borrows the civics tiger.
```

## Decisions for the integrator

1. **Validator.** Greek stems end with «;». Apply the one-line `validate_bank.py` change above;
   without it the validator fails on stem endings only.
2. **Shape and pass mark.** Real 4/4/6/6 split, eight tests of 20, 40 training-only items.
   `passPct: 70` (14 of 20) is Tigertest's target; the real thematic minimum is 10 of 20 inside a
   70/100 total that includes Greek. 50 would match the thematic minimum but overstate readiness.
3. **Hue** `214 90% 22%` instead of the suggested `215 45% 34%` (clashes with security, sbiclerk,
   phcse). Check against grinsure and grsecurity.
4. **Format facts** are from the official April 2026 guides (written and oral candidates) on the
   ministry's platform. The Secretary General's decisions (10787/2025, 21536/2026) could not be
   fetched as PDFs. Next sitting 15 November 2026 (lawspot, 16 July 2026). The fee is not shown.
5. **Option count.** Real thematic items are closed questions from the bank (the guide says the
   committee may reorder the correct answers); their exact option count was not checked against
   the bank to avoid reading its items. Ours have four; the landing says so.
6. **Lanes.** Siblings grmoto (English motorcycle theory), grinsure and grsecurity: no shared facts.
   grinsure and grsecurity were not on disk when this bank was written; this bank asks no
   insurance, policing or security-law questions (the constitutional rights items cite the
   Constitution only).
7. **Register.** Questions impersonal; landing and dashboard copy in the singular «εσύ».
   Gendered forms («έτοιμος») are avoided.

## Review pass (2026-11-07)

Reviewer read all 200 items in Greek, fixed in the sources, rebuilt; validator (with the `;`
patch above) PASS, `check_banks.py` PASS. 21 items changed, no wrong keys found:
- Ambiguous: GRCIT-IST-029 (Aegina was also called the first capital; now "capital just before
  Athens", Aegina dropped from the options), GRCIT-IST-047 (stem said "incorporated" with key 1947
  while the explanation gave 1948; now asks the year of the Paris peace treaty), GRCIT-IST-050
  ("the military dictatorship" could also read as 1936-1941; now "the colonels"),
  GRCIT-GEO-039 (Strongyli islet lies east of Kastellorizo; now "inhabited island").
- Grammar/idiom: GRCIT-POL-001 (genitive answers to "Ποια θρησκεία"; stem recast),
  GRCIT-THE-046 ("την ραδιοφωνία" to "τη ραδιοφωνία"), GRCIT-POL-035 (invented "δασυτονικό").
- Weak distractors: GRCIT-THE-030, -037, -039, -042.
- Sorted number options (REVIEW 2b): keys sat in an end slot 1 time in 21; distractors changed on
  GRCIT-GEO-009, -022, GRCIT-IST-017, -030, -048, -054, GRCIT-THE-009, -014, -031, -051, now 11 of 21.
Format facts re-checked against the April 2026 written-candidate guide (PDF text extracted):
20 thematic questions 4/4/6/6, 2 points each, 150 minutes, 18 written questions plus an 80 to 100
word text, 10 listening questions, pass 70/100 with 40/60 and 20/40. Landing, FAQ, examFacts and
sources.md agree. No near-duplicates with grinsure, grsecurity, grdriving or grmoto.
