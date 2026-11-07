# Wiring for `grinsure` (Bank of Greece insurance intermediary certification, in Greek, v1)

A native-language exam (base language Greek, `language: "el"`), built from the `detheorie`
template and laid out like `dkjagt`. The Greek phase-0 pieces (`i18n/el.ts`, `EXAM_UI.el`,
`COPY.el`, `SAMPLE_COPY.el`, `RELATED_COPY.el`, the `el` shuffle guard, `/el` in
`lib/urlLanguage.ts`, `GR: "EUR"` in `TranslatedExamLanding`) already exist, so nothing
language-level is left except the validator note below.

Files written by the builder:
- `data/gr-insurance-intermediary-questions.json` (200, validator PASS with `--lang el`, see note)
- `lib/banks/grinsure.ts`
- `app/pistopoiisi-asfalistikon-diamesolaviton/*` (5 wrappers: layout, page, dashboard, drill,
  stats; drill and stats import the bank)
- `lib/landings/grinsure.el.json` (Greek landing content, `facts.source` the ΤτΕ Act 153/2/2019)
- `app/el/pistopoiisi-asfalistikon-diamesolaviton/page.tsx` (three-line `TranslatedExamLanding`
  wrapper, `lang="el"`, `samples`, `related`)
- `tools/next100/grinsure/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/grinsure/build.py`. Validate with:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/gr-insurance-intermediary-questions.json --lang el --pool grinBasics=23 --pool grinContract=27 --pool grinDistrib=27 --pool grinConduct=27 --pool grinNonlife=26 --pool grinLife=24 --pool grinIbip=24 --pool grinAml=22`
-> `letters {'A': 53, 'B': 52, 'C': 49, 'D': 46}  avg option 36 chars  key-longest 16%  key>1.2x 12%  PASS`
(key strictly shortest 25%). `python3 -I tools/check_banks.py` PASS.

**Validator note (shared file, not edited):** Greek stems end with the Greek question mark ";"
(ASCII semicolon, as `grcitizen` also does). `validate_bank.py` accepts only "?" or ":", so the
PASS above came from a scratch copy whose one stem-end check also accepts ";". Suggested change
in `.claude/skills/exam-bank/scripts/validate_bank.py` (line ~242):

```py
        if not (q.endswith("?") or q.endswith(":") or (args.lang == "el" and q.endswith(";"))):
```

(or allow ";" and ";" whenever `--lang el`). The same applies to `grcitizen`.

Format note (Πράξη Εκτελεστικής Επιτροπής ΤτΕ 153/2/08.01.2019, ΦΕΚ Β' 27/2019, checked
2026-11-07, see sources.md): three certificates (agent, broker, IBIP); written multiple-choice
exams of at least 60 questions drawn from a question bank the Bank publishes with the answers;
pass with 90% correct; only the list of successful candidates is published; syllabus Annex XIII
of ν. 4583/2018. Duration and fee not found; bankofgreece.gr blocked automated reads.
Tigertest models three 60-question tests (180 of 200 items; the last 2/3/3/3/2/3/3/1 of each
pool, 20 in all, are training-only) at `passPct: 90` = 54 of 60, the real line. Questions are
original and do not match the official bank's wording; the landing says so. Six topic sets
25401-25406 + 3 tests = 9 dashboard steps; the IBIP topics are their own set (25405).

## lib/exams.ts

Add `"grinsure"` to the `ExamId` union. Icon `umbrella` exists (the insurance exams). The 25400
block was assigned by the batch. Set ids 25401-25406 share numbers with test ids 25401-25403 like
other topic-set exams.

```ts
const grinsure: ExamConfig = {
  id: "grinsure",
  stateCode: "GRINSURE",
  idBase: 25400,
  slug: "/pistopoiisi-asfalistikon-diamesolaviton",
  landingPath: "/el/pistopoiisi-asfalistikon-diamesolaviton",
  name: "Πιστοποίηση Ασφαλιστικών Διαμεσολαβητών ΤτΕ",
  shortName: "Πιστοποίηση ΤτΕ",
  examLabel: "Εξετάσεις πιστοποίησης ΤτΕ",
  fullName: "Πιστοποίηση επαγγελματικών γνώσεων ασφαλιστικών διαμεσολαβητών της Τράπεζας της Ελλάδος",
  questionIdPrefix: "GRINS-",
  icon: "umbrella",
  testCount: 3,
  questionsPerTest: 60,
  passPct: 90,
  language: "el",
  locale: "el-GR",
  english: {
    name: "Bank of Greece Insurance Intermediary Certification",
    shortName: "Greek insurance agent exam",
    fullName: "Bank of Greece professional knowledge certification for insurance agents, brokers and insurance-based investment products, in Greek",
  },
  review: { el: "model" },
  // Real exam (ΤτΕ Act 153/2/08.01.2019, ΦΕΚ Β' 27/2019, arts. 3 and 5 to 7; checked 2026-11-07):
  // certificates for insurance agents (also coordinators and insurers' distribution staff),
  // brokers, and insurance-based investment products; written multiple choice, at least 60
  // questions from a question bank the Bank publishes with answers; pass with 90% correct;
  // syllabus Annex XIII of ν. 4583/2018 (IDD). Held several times a year (2026: Athens,
  // Thessaloniki, Heraklion, Ioannina). Duration not published in the Act. No topic weights are
  // published: the 7/8/8/8/8/7/7/7 split is Tigertest's. Three tests of 60 (180 of 200; 20
  // training-only), all original, written in Greek. passPct 90 = 54 of 60, the real line.
  blueprint: {
    grinBasics: 7,
    grinContract: 8,
    grinDistrib: 8,
    grinConduct: 8,
    grinNonlife: 8,
    grinLife: 7,
    grinIbip: 7,
    grinAml: 7,
  },
  // Six topic sets, not testSets(): 6 + 3 tests = 9 dashboard steps. IBIP has its own set.
  trainingSets: [
    { setNumber: 1, id: 25401, name: "Αρχές και σύμβαση ασφάλισης", categories: ["grinBasics", "grinContract"], size: 50, weightLabel: "15 από 60 ερωτήσεις ανά τεστ" },
    { setNumber: 2, id: 25402, name: "Διανομή και κανόνες συμπεριφοράς", categories: ["grinDistrib", "grinConduct"], size: 54, weightLabel: "16 από 60 ερωτήσεις ανά τεστ" },
    { setNumber: 3, id: 25403, name: "Ασφαλίσεις ζημιών", categories: ["grinNonlife"], size: 26, weightLabel: "8 από 60 ερωτήσεις ανά τεστ" },
    { setNumber: 4, id: 25404, name: "Ασφαλίσεις ζωής και υγείας", categories: ["grinLife"], size: 24, weightLabel: "7 από 60 ερωτήσεις ανά τεστ" },
    { setNumber: 5, id: 25405, name: "Επενδυτικά ασφαλιστικά προϊόντα (IBIP)", categories: ["grinIbip"], size: 24, weightLabel: "7 από 60 ερωτήσεις ανά τεστ" },
    { setNumber: 6, id: 25406, name: "Ξέπλυμα χρήματος, δεδομένα και δεοντολογία", categories: ["grinAml"], size: 22, weightLabel: "7 από 60 ερωτήσεις ανά τεστ" },
  ],
  categoryLabels: {
    grinBasics: "Βασικές αρχές ασφάλισης και αντασφάλισης",
    grinContract: "Η σύμβαση ασφάλισης (ν. 2496/1997)",
    grinDistrib: "Ασφαλιστική διανομή και εποπτεία",
    grinConduct: "Κανόνες συμπεριφοράς και πληροφόρηση",
    grinNonlife: "Ασφαλίσεις ζημιών",
    grinLife: "Ασφαλίσεις ζωής και υγείας",
    grinIbip: "Επενδυτικά προϊόντα βασιζόμενα σε ασφάλιση",
    grinAml: "Ξέπλυμα χρήματος, δεδομένα και δεοντολογία",
  },
  copy: {
    guestPrompt: "για να κρατήσεις την πρόοδό σου για την πιστοποίηση και να βλέπεις κάθε λάθος σου",
    trainingHeading: "Σετ εξάσκησης",
    trainingSub: "Κάθε σετ καλύπτει μια ενότητα της ύλης της πιστοποίησης. Βλέπεις αμέσως αν απάντησες σωστά, και όσες ερωτήσεις έχασες ξαναέρχονται μέχρι να τις μάθεις.",
    testsHeading: "Τεστ · 60 ερωτήσεις, 54 για επιτυχία",
    heroSubs: [
      "Έξι σετ εξάσκησης, τρία τεστ των 60. Ξεκίνα από τη σύμβαση ασφάλισης.",
      "Μάθε πρώτα το σετ, μετά κάνε το τεστ.",
      "Στα μισά. Το πολύ 6 λάθη ανά τεστ.",
      "Ξαναδούλεψε τα λάθη σου και ξανακάνε το τεστ.",
      "Όλα πράσινα. Είσαι έτοιμος για τις εξετάσεις της ΤτΕ.",
    ],
    sourceLine: "Δικές μας ερωτήσεις με βάση τον ν. 4583/2018, τον ν. 2496/1997 και τους κανονισμούς της ΕΕ, Νοέμβριος 2026. Όχι από την επίσημη τράπεζα θεμάτων της ΤτΕ.",
    analyticsKey: "grinsure",
  },
};
```

Append `grinsure` to the `EXAMS` array with the other insurance licensing exams (after
`ieqfa`), or with the Greek exams. ID header comment if wanted:
` *   GRINSURE 25400s (tests 25401-25403, sets 25401-25406)`.

## lib/banks/all.ts

```ts
import "./grinsure";
```

## types/index.ts

- `QuestionType`: add `| "GRINSURE"`.
- `QuestionCategory`, under a `// Bank of Greece insurance intermediary certification` comment
  (`grin` grepped against `types/index.ts` and the Greek siblings' files: no clash; grcitizen
  uses `grcit`):

```ts
  | "grinBasics"
  | "grinContract"
  | "grinDistrib"
  | "grinConduct"
  | "grinNonlife"
  | "grinLife"
  | "grinIbip"
  | "grinAml"
```

## i18n

Results and stats read `exam.categoryLabels` first, so nothing is needed for Greek. If a
dictionary still needs the keys, `i18n/en.ts` (others fall back to English):

```ts
    grinBasics: "Insurance Principles & Reinsurance",
    grinContract: "The Insurance Contract",
    grinDistrib: "Insurance Distribution & Supervision",
    grinConduct: "Conduct of Business & Disclosure",
    grinNonlife: "Non-Life Insurance",
    grinLife: "Life & Health Insurance",
    grinIbip: "Insurance-Based Investment Products",
    grinAml: "AML, Data Protection & Ethics",
```

## lib/shuffleOptions.ts

No position-dependent options ("Και τα δύο", "Όλα τα παραπάνω", "Α και Β"); the build asserts
it. Numeric options (days, years, hours, pages, euro amounts) are sorted by the build.

## app/globals.css

The suggested `170 35% 26%` clashes with `ieqfa` (165 40% 20%: 5 degrees, 5 points of saturation,
6 of lightness). Checked against every `[data-theme]` in `app/globals.css` and all pending
`tools/**/WIRING.md` blocks: `170 35% 30%`, a dark sea teal, is clear (ieqfa 10 points of
lightness apart; cpareg 170 40% 38% 8 apart; nbdhe 180 is 10 degrees away). White text on it is
about 6.5:1. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Bank of Greece insurance intermediary certification theme */
  [data-theme="grinsure"] {
    --brand: 170 35% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 170 40% 95%;
    --brand-hover: 170 35% 25%;
    --brand-dark: 170 38% 20%;
    --brand-darker: 170 40% 14%;
    --brand-muted: 170 20% 66%;
    --brand-border: 170 25% 78%;
    --brand-border-light: 170 25% 88%;
    --brand-gradient-to: 200 60% 94%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `grinsure: "Practice in Greek for the Bank of Greece certification of insurance agents, brokers and insurance-based investment products: insurance principles, the insurance contract (Law 2496/1997), distribution and conduct rules (Law 4583/2018, IDD), non-life, life and health, IBIPs and the KID, anti-money laundering and data protection, in three 60-question mock tests with every answer explained.",`
- `EXAM_ORG`: `grinsure: "Bank of Greece · certification of insurance intermediaries (agent, broker, IBIP), in Greek",`
- Hub group: a new Greece group for the non-driving Greek tests, placed right after
  `"EU driving theory tests"` (where `grdriving` and `grmoto` sit), shared with the siblings
  built now (check their WIRING files for the same title and merge):
  `{ title: "Greece licensing and citizenship tests", ids: ["grcitizen", "grinsure", "grsecurity"] },`
  `RELATED_OVERRIDES`: `grinsure: ["ieqfa", "mypce", "hkiiqe1", "insurance"],` (other
  insurance-intermediary exams; the Greek group is small).
- `SEARCH_ALIASES` (Greek and English):
  `grinsure: "πιστοποίηση ασφαλιστικών διαμεσολαβητών πιστοποιηση ασφαλιστικων διαμεσολαβητων εξετάσεις τράπεζας της ελλάδος εξετασεις τραπεζας της ελλαδος εξετάσεις ττε πιστοποίηση ττε ασφαλιστικός πράκτορας ασφαλιστικος πρακτορας μεσίτης ασφαλίσεων μεσιτης ασφαλισεων συντονιστής πρακτόρων επενδυτικά προϊόντα βασιζόμενα σε ασφάλιση unit linked τράπεζα θεμάτων ασφαλιστών ν 4583/2018 idd greece insurance exam bank of greece insurance certification greek insurance agent exam greek insurance broker exam ibip certification greece",`
- Native name on Greek surfaces, `english.name` elsewhere (the platform's language field).

## lib/region.ts

```ts
  grinsure: "GR",
```
(in `TEST_REGIONS`, next to `grdriving: "GR"`). Not a driving test, so add it to
`NON_DRIVING_TESTS`. Region `GR` exists with `lang: "en"`; the Greek landing works under the
`/el` prefix (`lib/urlLanguage.ts`). If the GR homepage gets an "About each test" list, it quotes
`lib/landingContent.ts` below.

## lib/landingContent.ts

```ts
import grinsureEl from "@/lib/landings/grinsure.el.json";
  "grinsure.el": grinsureEl as TranslatedLandingContent,
```

## app/el/layout.tsx

None needed (`lib/urlLanguage.ts` maps `/el`; `app/el/eksetaseis-pegp-politografisi` from
grcitizen works the same way). `TranslatedExamLanding` uses the base `landingPath` when
`lang === exam.language`; currency EUR is in its `CURRENCY` table for GR.

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  grinsure: {
    answer:
      "Anyone who distributes insurance in Greece, as an insurance agent, coordinator of agents, broker or an insurer's distribution staff, needs a certificate of professional knowledge from the Bank of Greece. There are three certificates: insurance agent, insurance and reinsurance broker, and insurance-based investment products (IBIPs, such as unit-linked policies), the last needed on top of the first two to sell those products. The exams are written and multiple choice. Each exam has at least 60 questions drawn from a question bank that the Bank of Greece publishes with the correct answers, and you pass by answering 90% correctly. Only the list of successful candidates is published, not scores. The syllabus follows Annex XIII of Law 4583/2018, which transposed the EU Insurance Distribution Directive, with emphasis on distribution and conduct rules. Exams are held several times a year in Athens, Thessaloniki and other cities, in Greek.",
    rows: [
      { label: "Run by", value: "Bank of Greece (private insurance supervision)" },
      { label: "Certificates", value: "Insurance agent, broker, insurance-based investment products" },
      { label: "Questions", value: "At least 60, multiple choice" },
      { label: "Pass mark", value: "90% correct" },
      { label: "Question bank", value: "Published by the Bank of Greece with answers" },
      { label: "Syllabus", value: "Annex XIII of Law 4583/2018 (IDD)" },
      { label: "Language", value: "Greek" },
      { label: "Tigertest mock tests", value: "3 x 60 questions in Greek, 54 to pass" },
    ],
    basedOn: "Bank of Greece Executive Committee Act 153/2/08.01.2019 on the certification of professional knowledge for insurance distribution, Law 4583/2018 and the Bank's 2026 exam schedule as reported by the insurance press, checked November 2026",
    source: { name: "Bank of Greece Act 153/2/2019 (text on taxheaven, in Greek)", url: "https://www.taxheaven.gr/circulars/30155/153-2-2019" },
  },
```

## lib/shareCardCopy.ts

```ts
  grinsure: { title: "Bank of Greece Insurance Certification", description: "Practise insurance law, distribution rules, life, non-life and IBIP topics in Greek for the Bank of Greece agent and broker exams." },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Greek)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the Greek batch.

## lib/tigerAssets.ts

`BORROWED_SETS`: `grinsure: "insurance",` (the life and health insurance tiger, like `ieqfa` and
`mypce`).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Insurers and private training providers run preparation programmes for this exam, so a trainer
can set it as class practice. Optional:
- `TEACHER_LED`: add `"grinsure"`.
- `TEACHES`: `grinsure: "an insurance agent preparation course",` (the landing is Greek, so the
  English class FAQ is not rendered there).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the `/el/...` landing is emitted once, hreflang `el-GR`,
x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 22 to 54, so no parts.

## Question quality hooks

Run `python3 -I tools/build_exam_sources.py` (the first https URLs in `sources.md` are the
taxheaven text of Act 153/2/2019 and the insurance press schedule). Freshness events worth adding
to `lib/examFreshness.json`: a new or amended Bank of Greece Act on the certification (question
count, pass mark), and any IDD review (the EU Retail Investment Strategy amends the IDD's IBIP
rules; not adopted as of Nov 2026).

## Screenshots

`TranslatedExamLanding` reads `/landing/grinsure-{mobile,desktop}-el.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing grinsure:pistopoiisi-asfalistikon-diamesolaviton:25401`
then rename the files to the `-el` names (and their `-dark` twins).

## CLAUDE.md (with the other Greek exams, or after the LLQP / QFA insurance bullets)

```md
- **Πιστοποίηση Ασφαλιστικών Διαμεσολαβητών ΤτΕ** (`grinsure`, the Bank of Greece certification of professional knowledge for insurance distribution, base language Greek, `language: "el"`, `locale: "el-GR"`, `review: { el: "model" }`, `/pistopoiisi-asfalistikon-diamesolaviton/*`, landing `/el/pistopoiisi-asfalistikon-diamesolaviton` from `lib/landings/grinsure.el.json`): `data/gr-insurance-intermediary-questions.json` (200 original questions written directly in Greek on the topics of Annex XIII of ν. 4583/2018: insurance principles and reinsurance 23, the insurance contract (ν. 2496/1997: disclosure, aggravation within 14 days, under-insurance and first loss, subrogation, limitation 4 and 5 years) 27, distribution, intermediaries and supervision 27, conduct of business, IPID and POG 27, non-life (motor liability, Επικουρικό Κεφάλαιο, property, liability, marine) 26, life and health 24, insurance-based investment products (PRIIPs KID, suitability, appropriateness, sustainability preferences) 24, AML (ν. 4557/2018), GDPR and ethics 22), three 60-question tests (IDs 25401-25403, 7/8/8/8/8/7/7/7 per test, Tigertest's split; 20 items training-only) and six Greek-named topic sets 25401-25406 (IBIP its own set), 9 dashboard steps, state `GRINSURE`, prefix `GRINS-`, 90% pass (54 of 60, the real line). The real exams (ΤτΕ Act 153/2/2019) are written multiple choice, at least 60 questions from a question bank the Bank publishes with answers, 90% to pass, three certificates (agent, broker, IBIP); the bank here is original and does not match the official wording, which the landing says. No premiums, fees, tax rates or cover amounts. Greek stems end with ";" (the validator needs `--lang el` to accept it). English names in `english`. Built by `tools/next100/grinsure/build.py`; sources in `tools/next100/grinsure/sources.md`, terms in `glossary.md`. Region GR, hub group "Greece licensing and citizenship tests", `[data-theme="grinsure"]` dark sea teal (170 35% 30%), borrows the life and health insurance tiger.
```

## Decisions for the integrator

1. **Hue** `170 35% 30%` instead of the suggested `170 35% 26%` (clashes with ieqfa).
2. **Validator** needs ";" accepted as a Greek stem end (see the note at the top); grcitizen
   has the same need.
3. **Hub group** shared with grcitizen and grsecurity; settle one title across the three WIRING
   files.
4. **Unconfirmed format facts**: exam duration, fee, the 2022 question-bank size (about 600 per
   set per the research notes) and whether a later Act changed 153/2/2019; bankofgreece.gr and
   nextdeal.gr blocked automated reads. The landing states only the Act's facts (at least 60
   questions, 90%) and points to the current announcement.
5. **Article numbers of ν. 2496/1997** are not cited in questions (the text could not be
   fetched); the 14-day aggravation notice and the 4/5-year limitation were confirmed from
   secondary sources.
6. **Register**: questions neutral and third person; landing and dashboard copy informal "εσύ".

## Review (2026-11-07)

Reviewer pass per `tools/next100/REVIEW.md`: 25 wording fixes in the sources, no key changed, ids
and counts unchanged; rebuilt, validator PASS (scratch copy accepting ";"), `check_banks.py` PASS.
Facts in the landing, FAQ and examFacts match Act 153/2/2019 arts. 6(4) and 7(5) (re-read on
taxheaven). Number items: key in an end slot 4 of 8. No shared-file changes beyond those above.
