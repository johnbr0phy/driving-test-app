# Wiring for `pllek` (Lekarski Egzamin Koncowy, LEK, Poland Medical Final Examination, English, v1)

An English-language v1 registry exam (base language `en`; CEM runs the real LEK in English as
well as Polish) for the new Tigertest region PL, shared with the sibling builds `plteoria`,
`plaplik`, `plbron` and `plcpc`. Template: `tools/next100/cma`. A Polish translation (`pl`) can
follow as a `translations.pl` block later; it is not part of this build.

Files already written by the builder:
- `data/poland-lek-questions.json` (200, validator PASS)
- `lib/banks/pllek.ts`
- `app/poland-lek-medical-exam/*` (layout, redirect, dashboard, drill, stats; copied from
  `app/cma-aama/`; no test or practice folders, the shared `app/[slug]` routes serve them)
- `app/poland-lek-practice-test/page.tsx` (landing, renders `ExamSampleQuestions`)
- `tools/next100/pllek/*` (spec, sources, `q_*.py`, `build.py`, this file)

`npx tsc` reports an error in `lib/banks/pllek.ts` and the app pages until `"pllek"` is in `ExamId`.

Rebuild with `python3 -I tools/next100/pllek/build.py`. Validate with:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/poland-lek-questions.json --pool pllekInternal=40 --pool pllekPaeds=28 --pool pllekSurgery=28 --pool pllekObgyn=24 --pool pllekPsych=16 --pool pllekFamily=20 --pool pllekEmergency=20 --pool pllekLaw=8 --pool pllekCert=8 --pool pllekPublic=8`
-> `letters {'A': 50, 'B': 50, 'C': 50, 'D': 50}  avg option 17 chars  key-longest 16%  key>1.2x 14%  PASS`.
Also clean: `check_answer_patterns.py` (no answer patterns), `check_option_reuse.py` (0 shared
sets, echo gain -0.3 per 50), `check_option_refs.py --list` (0), `check_stem_length.py` (median
14 words, 0% article openers), `check_sources.py pllek` (10 primary pages).

## Shape

The real LEK (CEM, checked 2026-11-21): 200 single-answer questions with 5 options, 4 hours, pass
at 56% of valid questions (112 of 200), February and September sessions. CEM thematic structure:
internal 39, paediatrics 29, surgery 27, obstetrics and gynaecology 26, psychiatry 14, family
medicine 20, emergency medicine and intensive therapy 20, bioethics and medical law 10, medical
certification 7, public health 8; at least 20 oncology.

Modelled as the standard four 50-question tests, 10/7/7/6/4/5/5/2/2/2 per test (pools exactly 4x,
no item repeats across tests), pass line `ceil(0.56 * 50) = 28`, the real rule. Seven topic
sets + 4 tests = 11 dashboard steps. Items are 4-option because the v1 engine has optionA to
optionD; the real exam's fifth option is not modelled (said in `scoreNote`-style copy on the
landing FAQ and in `sources.md`). 23 oncology items spread across the clinical categories.

## lib/exams.ts

Add `"pllek"` to the `ExamId` union. Icon `stethoscope` already exists.

```ts
const pllek: ExamConfig = {
  id: "pllek",
  stateCode: "PLLEK",
  idBase: 45700,
  slug: "/poland-lek-medical-exam",
  landingPath: "/poland-lek-practice-test",
  name: "Poland LEK Practice Test",
  shortName: "LEK",
  examLabel: "LEK",
  fullName: "Lekarski Egzamin Koncowy (LEK), Poland Medical Final Examination",
  questionIdPrefix: "PLLEK-",
  icon: "stethoscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 56,
  // CEM thematic structure of LEK (cem.edu.pl/english_lek_struktura.php, checked November 2026):
  // 200 questions, internal medicine 39, paediatrics 29, surgery 27, obstetrics and gynaecology 26,
  // psychiatry 14, family medicine 20, emergency medicine and intensive therapy 20, bioethics and
  // medical law 10, medical certification 7, public health 8, at least 20 oncology. Scaled to 50
  // per test: 10/7/7/6/4/5/5/2/2/2 (the rounding is Tigertest's). The real exam has 5 options per
  // item and passes at 56% of valid questions; 56% is used here too. Law and certification items
  // follow Polish statutes. All items original.
  blueprint: {
    pllekInternal: 10,
    pllekPaeds: 7,
    pllekSurgery: 7,
    pllekObgyn: 6,
    pllekPsych: 4,
    pllekFamily: 5,
    pllekEmergency: 5,
    pllekLaw: 2,
    pllekCert: 2,
    pllekPublic: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 45701, name: "Internal Medicine", categories: ["pllekInternal"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 45702, name: "Paediatrics & Neonatology", categories: ["pllekPaeds"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 3, id: 45703, name: "Surgery", categories: ["pllekSurgery"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 4, id: 45704, name: "Obstetrics & Gynaecology", categories: ["pllekObgyn"], size: 24, weightLabel: "6 of 50 test questions" },
    { setNumber: 5, id: 45705, name: "Psychiatry & Family Medicine", categories: ["pllekPsych", "pllekFamily"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 6, id: 45706, name: "Emergency Medicine & Intensive Care", categories: ["pllekEmergency"], size: 20, weightLabel: "5 of 50 test questions" },
    { setNumber: 7, id: 45707, name: "Law, Certification & Public Health", categories: ["pllekLaw", "pllekCert", "pllekPublic"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    pllekInternal: "Internal Medicine",
    pllekPaeds: "Paediatrics & Neonatology",
    pllekSurgery: "Surgery",
    pllekObgyn: "Obstetrics & Gynaecology",
    pllekPsych: "Psychiatry",
    pllekFamily: "Family Medicine",
    pllekEmergency: "Emergency Medicine & Intensive Care",
    pllekLaw: "Bioethics & Medical Law",
    pllekCert: "Medical Certification",
    pllekPublic: "Public Health",
  },
  copy: {
    guestPrompt: "to save your LEK progress and track every question you miss",
    trainingHeading: "Train by LEK subject",
    trainingSub: "Seven sets on the CEM thematic structure, from internal medicine to Polish medical law. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions weighted like the 200-question LEK",
    heroSubs: [
      "Ten subjects, four mock exams. Internal medicine weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All sets and mock exams done. Keep revising your weakest subject.",
    ],
    sourceLine: "Based on the CEM thematic structure of the LEK. Original questions in English; 50 per test, weighted like the real exam, 4 options instead of the real 5. Not affiliated with CEM or the Ministry of Health.",
    analyticsKey: "pllek",
  },
};
```

Append `pllek` to the `EXAMS` array with the other Poland exams (after `plaplik`), or with the
healthcare exams after `rorezid`.

Check: 45701-45707 (tests 45701-45704, sets 45701-45707) must be free (row assigns idBase 45700;
`grep "4570" lib/exams.ts` found nothing on 2026-11-21).

## lib/banks/all.ts

```ts
import "./pllek";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/pllek.ts`.

## types/index.ts

- `QuestionType`: add `| "PLLEK"`.
- `QuestionCategory`, under a `// Poland LEK` comment (no `pllek*` keys exist yet):

```ts
  | "pllekInternal"
  | "pllekPaeds"
  | "pllekSurgery"
  | "pllekObgyn"
  | "pllekPsych"
  | "pllekFamily"
  | "pllekEmergency"
  | "pllekLaw"
  | "pllekCert"
  | "pllekPublic"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels; i18n/pl.ts with the Polish ones)

```ts
    pllekInternal: "Internal Medicine",
    pllekPaeds: "Paediatrics & Neonatology",
    pllekSurgery: "Surgery",
    pllekObgyn: "Obstetrics & Gynaecology",
    pllekPsych: "Psychiatry",
    pllekFamily: "Family Medicine",
    pllekEmergency: "Emergency Medicine & Intensive Care",
    pllekLaw: "Bioethics & Medical Law",
    pllekCert: "Medical Certification",
    pllekPublic: "Public Health",
```

`i18n/pl.ts` (if every category key must be present there; Polish names as used by CEM):

```ts
    pllekInternal: "Choroby wewnętrzne",
    pllekPaeds: "Pediatria z neonatologią",
    pllekSurgery: "Chirurgia",
    pllekObgyn: "Położnictwo i ginekologia",
    pllekPsych: "Psychiatria",
    pllekFamily: "Medycyna rodzinna",
    pllekEmergency: "Medycyna ratunkowa i intensywna terapia",
    pllekLaw: "Bioetyka i prawo medyczne",
    pllekCert: "Orzecznictwo lekarskie",
    pllekPublic: "Zdrowie publiczne",
```

## app/globals.css

The suggested hue 172 60% 30% clashes (checked against every `[data-theme]` on disk and the two
Polish siblings' hues 255 100% 22% and 354 72% 38%): cst 172 66% 31%, phmedtech 170 70% 30%,
accuplacer 175 55% 32%, pknle 175 55% 33%, realestatebroker 176 60% 32%, danb 165 60% 32%. The
whole 140 to 210 band is taken at saturation 15%+ and lightness 16 to 42%. The only clash-free
teal with 4.5:1 white contrast is very dark: **172 80% 14%** (used below). The integrator may
prefer to move pllek to a free hue elsewhere; change both this block and nothing else (the
landing and layout only use `data-theme="pllek"`). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Poland LEK theme */
  [data-theme="pllek"] {
    --brand: 172 80% 14%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 172 45% 95%;
    --brand-hover: 172 80% 11%;
    --brand-dark: 172 80% 12%;
    --brand-darker: 172 80% 8%;
    --brand-muted: 172 25% 70%;
    --brand-border: 172 30% 78%;
    --brand-border-light: 172 30% 88%;
    --brand-gradient-to: 185 45% 95%;
  }
```

## lib/tigerAssets.ts

`BORROWED_SETS`: `pllek: "rorezid",` (the reviewed EU doctor mascot) until LEK gets its own set.

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `pllek: "Practice in English for Poland's Medical Final Examination (LEK) on the CEM thematic structure: internal medicine, paediatrics, surgery, obstetrics and gynaecology, psychiatry, family and emergency medicine, with Polish medical law, sickness certification and public health, 56% to pass like the real exam.",`
- `EXAM_ORG`: `pllek: "Centrum Egzaminow Medycznych (CEM), Lodz · LEK thematic structure, English version",`
- Hub group: the brief puts Poland's non-driving tests in a Poland group after Poland's driving
  group (`plteoria` joins "EU driving theory tests" per its WIRING). Same block as `plaplik`'s
  WIRING; apply once:
  `{ title: "Poland professional and licensing exams", ids: ["plaplik", "pllek", "plbron"] },`
  (add `plcpc` only if it is not placed with the driving tests; drop ids that are not wired)
- `RELATED_OVERRIDES`: `pllek: ["rorezid", "pknle", "pance", "plaplik"],`
- `SEARCH_ALIASES` (English and Polish, with and without diacritics):
  `pllek: "lek lek exam lek test lek english lek in english lekarski egzamin koncowy lekarski egzamin końcowy egzamin lek testy lek pytania lek baza pytan lek baza pytań lek 2026 lek luty lek wrzesien lek wrzesień cem lek centrum egzaminow medycznych centrum egzaminów medycznych poland medical final exam polish medical final examination poland medical licensing exam polish medical licence exam medical final exam poland doctor exam poland ldek lek lodz łódź warszawa krakow kraków wroclaw wrocław poznan poznań gdansk gdańsk lublin katowice bialystok białystok szczecin bydgoszcz",`

## lib/region.ts (region PL; the region itself is written once by the siblings)

- `TEST_REGIONS`: `pllek: "PL",` (with `plteoria: "PL", plaplik: "PL", plbron: "PL", plcpc: "PL",`).
- `NON_DRIVING_TESTS`: add `"pllek",` (next to `"plaplik", "plbron"`).
- `REGION_HOME.PL` (`plteoria`/`plaplik` carry the block; keep theirs). Add one sentence to
  `testsSub`, in Polish like the rest of the block:
  `Dla lekarzy LEK w języku angielskim: 200 pytań według struktury tematycznej CEM, cztery testy po 50 pytań i 56% do zaliczenia.`
- Nothing else: `Region`, `REGIONS`, `regionFromCountry` and hreflang `pl-PL` come from the
  sibling blocks.

## components/home/HomePage.tsx (`AUTHORITY`, used by `faqsFor`)

If `faqsFor` lists bodies per region, add CEM after the siblings' bodies for PL:
`"Centrum Egzaminów Medycznych (CEM)"`.

## lib/examFacts.ts

```ts
  pllek: {
    answer:
      "The Lekarski Egzamin Koncowy (LEK) is Poland's Medical Final Examination, organised and run twice a year, in February and September, by the Centrum Egzaminow Medycznych (CEM) in Lodz, a state body under the Minister of Health. It has 200 multiple-choice questions, each with five possible answers and one correct, and lasts 4 hours. CEM's thematic structure gives internal medicine 39 questions, paediatrics 29, surgery 27, obstetrics and gynaecology 26, psychiatry 14, family medicine 20, emergency medicine and intensive therapy 20, bioethics and medical law 10, medical certification 7 and public health 8, with at least 20 on oncology. The pass mark is 56% of the valid questions, 112 if all 200 are valid. It is offered in Polish and in English, and under the Act on the professions of physician and dentist a pass, in Polish or in the language of study, is needed for the full right to practise.",
    rows: [
      { label: "Run by", value: "Centrum Egzaminow Medycznych (CEM), Lodz" },
      { label: "Questions", value: "200, five options each, one correct" },
      { label: "Time", value: "4 hours" },
      { label: "Pass mark", value: "56% of valid questions (112 of 200)" },
      { label: "Largest subjects", value: "Internal medicine 39, paediatrics 29, surgery 27, obstetrics and gynaecology 26" },
      { label: "Sessions", value: "February and September, applications through SMK" },
      { label: "Languages", value: "Polish and English" },
    ],
    basedOn: "CEM's LEK information pages and thematic structure, and the Act of 5 December 1996 on the professions of physician and dentist (Dz.U. 2026 item 37, art. 5 and 14a), checked November 2026",
    source: { name: "CEM: LEK information (English)", url: "https://www.cem.edu.pl/english_info_lek.php" },
  },
```

## lib/llmsTxt.ts

Nothing exam-specific (it maps over `EXAMS` and `EXAM_FACTS`).

## lib/seoDates.ts / lib/landingDates.json

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date and run `scripts/build-landing-dates.ts`.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"pllek"` to `TEACHER_LED` (medical universities and LEK courses set it), and in `TEACHES`:
`pllek: "a LEK preparation course",`. The landing already renders `<ExamClassFaq examId="pllek" />`
and `classFaqJsonLd("pllek")`.

## lib/privacyRegion.ts

Nothing: an adult professional exam, not in `CHILD_PATH_PREFIXES`.

## Premium

Standard v1 locks (a career licensing exam; nothing to add, `lib/examLocks.ts` applies to every
v1 exam).

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `stethoscope` exists; sitemaps map over `EXAMS`; no redirects. `lib/server/classQuestions.ts`
imports `lib/banks/all`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 20 to 40 (all at most 60).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing pllek:poland-lek-medical-exam:45701`

## docs/exams/pllek.md (new notes file)

```md
# pllek: Lekarski Egzamin Koncowy (LEK), Poland Medical Final Examination

- **What**: Poland's medical final exam, run by the Centrum Egzaminow Medycznych (CEM), Lodz, under
  the Ministry of Health (Act on the professions of physician and dentist, art. 14a). Needed for the
  full right to practise (art. 5(4)). Twice a year, February and September; applications via SMK.
- **Official format** (CEM, checked 2026-11-21): 200 single-answer questions, 5 options, 4 hours,
  pass 56% of valid questions (112 of 200). Offered in Polish and English.
- **Blueprint** (CEM thematic structure): internal 39, paediatrics 29, surgery 27, obstetrics and
  gynaecology 26, psychiatry 14, family medicine 20, emergency medicine and intensive therapy 20,
  bioethics and medical law 10, medical certification 7, public health 8; at least 20 oncology.
- **Tigertest model**: v1, English, 200 items, four 50-question tests at 10/7/7/6/4/5/5/2/2/2, pools
  4x (40/28/28/24/16/20/20/8/8/8), pass 56% (28 of 50). Seven topic sets (45701-45707), tests
  45701-45704. 4 options per item (the engine has 4; the real exam has 5). 23 oncology items.
- **IDs**: exam `pllek`, state code `PLLEK`, prefix `PLLEK-` with segments INT, PED, SUR, OBG, PSY,
  FAM, EMR, LAW, CER, PUB. Bank `data/poland-lek-questions.json`.
- **Sources**: `tools/next100/pllek/sources.md` (CEM pages; Sejm ELI consolidated texts of the
  physician act, the Patient Rights Act, the Mental Health Protection Act and the Sickness
  Benefits Act; NFZ DiLO page; named clinical guidelines). Build: `python3 -I tools/next100/pllek/build.py`.
- **Law and certification**: Polish statutes only (consent at 16, art. 30, 33, 34, 39, 40, 42, 43,
  record retention, e-ZLA codes A to E, 182/270-day limits, 5 days for alcohol, Mental Health Act
  art. 18, 23, 24). Sick-leave control rules amended in 2026 are not used.
- **Theme**: `[data-theme="pllek"]` 172 80% 14% (deep teal; the suggested 172 60% 30% clashed),
  borrows the `rorezid` tiger. Region PL, hub group "Poland professional and licensing exams".
- **Not modelled**: the fifth option, the CEM public question base (never copied), the LDEK
  (dental) sibling, score use in residency qualification, a Polish-language version (a `pl`
  translation can follow).
- **Overlap**: written against pknle, pance, rorezid, ccrn, cen, the nursing banks and the CPR and
  first-aid banks; repeats of fact and answer were rewritten.
```

## CLAUDE.md (an "Additional Exams" bullet, with the other Poland exams)

```md
- **LEK** (Poland Medical Final Examination, Lekarski Egzamin Koncowy, in English, `/poland-lek-medical-exam/*`, landing `/poland-lek-practice-test`): `data/poland-lek-questions.json` (200 questions on the CEM thematic structure, checked 2026-11-21: internal medicine 40, paediatrics 28, surgery 28, obstetrics and gynaecology 24, psychiatry 16, family medicine 20, emergency medicine and intensive care 20, bioethics and medical law 8, medical certification 8, public health 8; 23 oncology), test IDs 45701-45704, sets 45701-45707, state `PLLEK`, prefix `PLLEK-`, 56% pass like the real exam (200 questions, 5 options, 4 hours, 56% of valid questions, CEM Lodz). 10/7/7/6/4/5/5/2/2/2 per test; 4 options instead of the real 5. Law and certification follow Polish statutes. Built by `tools/next100/pllek/build.py`; sources in `tools/next100/pllek/sources.md`; notes `docs/exams/pllek.md`. Region PL, hub group "Poland professional and licensing exams", `[data-theme="pllek"]` deep teal (172 80% 14%), borrows the rorezid tiger, teacher-led (LEK courses).
```

## Decisions for the integrator

- Hue: suggested 172 60% 30% clashes with six themes; 172 80% 14% is the only clash-free teal
  that passes white contrast. Pick another hue if that is too dark.
- Options: the brief asked for 5-option items, but the v1 engine (`types/index.ts` `Question`,
  shuffle, runners, validator) has exactly four. Built 4-option; a fifth option needs engine work.
- Eligibility: the CEM FAQ still says students cannot sit LEK, while art. 14a(3) of the Act now
  allows it after 10 semesters. The landing avoids eligibility claims.
- The Ministry of Health LEK URL from the brief now opens the gov.pl home page; all format facts
  are from CEM pages and the Act.
- A Polish translation should follow quickly (most candidates sit the Polish paper); keep every
  questionId, key and order when writing `pl`.
