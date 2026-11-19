# Wiring: MLS(ASCP) Medical Laboratory Scientist (`ascpmls`, v1)

Files already written by the builder (exam-only):
- `data/ascp-mls-questions.json` (built by `python3 -I tools/build-run-2026-11-18/ascpmls/build.py`,
  which recomputes the 13 computed keys from the stem numbers and checks each value appears in
  its explanation)
- `lib/banks/ascpmls.ts`
- `app/ascp-mls/` (layout, redirect, dashboard, drill, stats; copied from `app/ascp-mlt/`, stats
  imports the bank like the template; no test or practice folders)
- `app/ascp-mls-practice-test/page.tsx` (copied from `app/ascp-mlt-practice-test/`)
- `tools/build-run-2026-11-18/ascpmls/` (sources.md, q_*.py, build.py, this file)

Validator (PASS, key-longest 15%, key>1.2x 17%, letters 50/50/50/50, avg option 18 chars, median
stem 12 words, 0% article-led options, option reuse 0%, echo gain 0.8, no answer patterns, 0 option
refs):
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/ascp-mls-questions.json --pool mlsBbProd=16 --pool mlsBbSero=24 --pool mlsUa=16 --pool mlsChemGen=20 --pool mlsChemSpec=16 --pool mlsHeme=24 --pool mlsHemost=16 --pool mlsImmuno=16 --pool mlsMicro=36 --pool mlsOps=16`

Format: 4 tests x 50, five topic sets (40/52/40/36/32), 9 dashboard steps; pools exactly 4x per test.
idBase 40700 (tests 40701-40704, sets 40701-40705); prefix `MLS-` (does not collide with `NMLS-`).

## lib/exams.ts

`ExamId` union: add `| "ascpmls"`. Icon `"microscope"` already exists. Append `ascpmls` to `EXAMS`
next to `ascpmlt`.

Block (before `const htl`):

```ts
const ascpmls: ExamConfig = {
  id: "ascpmls",
  stateCode: "ASCPMLS",
  idBase: 40700,
  slug: "/ascp-mls",
  landingPath: "/ascp-mls-practice-test",
  name: "MLS(ASCP) Practice Test",
  shortName: "MLS(ASCP)",
  examLabel: "MLS exam",
  fullName: "ASCP Medical Laboratory Scientist MLS(ASCP) Certification Exam",
  questionIdPrefix: "MLS-",
  icon: "microscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // ASCP BOC Medical Laboratory Scientist MLS(ASCP) and MLS(ASCPi) Examination Content Guideline
  // (revised September 25, 2025, checked November 2026): 100 questions in 2 hours 30 minutes,
  // computer adaptive. Blood Banking 17-22%, Urinalysis and Other Body Fluids 5-10%, Chemistry
  // 17-22%, Hematology (with hemostasis) 17-22%, Immunology 5-10%, Microbiology 17-22%,
  // Laboratory Operations 5-10%. Per 50-question fixed form: 10/4/9/10/4/9/4
  // (20/8/18/20/8/18/8%), all inside the ranges; blood banking 4/6, chemistry 5/4 and
  // hematology 6/4 are Tigertest's splits. The real exam is CAT and scaled; 70% here is a
  // readiness marker. All items original.
  blueprint: {
    mlsBbProd: 4,
    mlsBbSero: 6,
    mlsUa: 4,
    mlsChemGen: 5,
    mlsChemSpec: 4,
    mlsHeme: 6,
    mlsHemost: 4,
    mlsImmuno: 4,
    mlsMicro: 9,
    mlsOps: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 40701, name: "Blood Banking", categories: ["mlsBbProd", "mlsBbSero"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 40702, name: "Urinalysis & Chemistry", categories: ["mlsUa", "mlsChemGen", "mlsChemSpec"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 3, id: 40703, name: "Hematology & Hemostasis", categories: ["mlsHeme", "mlsHemost"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 40704, name: "Microbiology", categories: ["mlsMicro"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 40705, name: "Immunology & Lab Operations", categories: ["mlsImmuno", "mlsOps"], size: 32, weightLabel: "8 of 50 test questions" },
  ],
  categoryLabels: {
    mlsBbProd: "Blood Products & Transfusion Practice",
    mlsBbSero: "Blood Groups & Serologic Testing",
    mlsUa: "Urinalysis & Other Body Fluids",
    mlsChemGen: "Carbohydrates, Lipids, Proteins & Enzymes",
    mlsChemSpec: "Acid-Base, Electrolytes, Hormones & Drugs",
    mlsHeme: "Hematology Physiology, Disease & Testing",
    mlsHemost: "Hemostasis",
    mlsImmuno: "Immunology",
    mlsMicro: "Microbiology",
    mlsOps: "Laboratory Operations",
  },
  copy: {
    guestPrompt: "to save your MLS(ASCP) progress and track every question you miss",
    trainingHeading: "Train by BOC content area",
    trainingSub: "Five sets covering the seven content areas of the ASCP BOC MLS guideline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Five training sets, four practice tests. Start with Blood Banking.",
      "Master each set, then take a practice test.",
      "Keep going. Take a practice test to see where you stand.",
      "Review your mistakes, then retake any test you haven't passed.",
      "All done. You're ready for the MLS(ASCP).",
    ],
    sourceLine: "Based on the ASCP BOC MLS(ASCP) Examination Content Guideline. Original questions; 50 per test, weighted like the real exam. Not affiliated with the American Society for Clinical Pathology.",
    analyticsKey: "ascpmls",
  },
};
```

## lib/banks/all.ts

`import "./ascpmls";` next to `import "./ascpmlt";`.

## types/index.ts

`QuestionType`: add `| "ASCPMLS"`. `QuestionCategory`, under `// MLS(ASCP)`:
`"mlsBbProd" | "mlsBbSero" | "mlsUa" | "mlsChemGen" | "mlsChemSpec" | "mlsHeme" | "mlsHemost" | "mlsImmuno" | "mlsMicro" | "mlsOps"`
(grepped: no existing key starts with `mls`; `nmls*` keys are distinct).

## i18n (en, es, ko, vi, zh: English labels, like ascpmlt)

```ts
    mlsBbProd: "Blood Products & Transfusion Practice",
    mlsBbSero: "Blood Groups & Serologic Testing",
    mlsUa: "Urinalysis & Other Body Fluids",
    mlsChemGen: "Carbohydrates, Lipids, Proteins & Enzymes",
    mlsChemSpec: "Acid-Base, Electrolytes, Hormones & Drugs",
    mlsHeme: "Hematology Physiology, Disease & Testing",
    mlsHemost: "Hemostasis",
    mlsImmuno: "Immunology",
    mlsMicro: "Microbiology",
    mlsOps: "Laboratory Operations",
```

## app/globals.css

`[data-theme="ascpmls"]` brand suggestion `292 75% 38%` (deep orchid violet; white text 7.0:1;
checked against every `--brand` in globals.css: no theme within 8 degrees is within 15 saturation
and 8 lightness). Derive the other nine `--brand*` values like the neighbouring blocks, then run
`python3 -I tools/gen_dark_brand_css.py`. The integrator settles the final hue.

## lib/testCatalog.ts

- `EXAM_BLURBS.ascpmls`: "ASCP Board of Certification Medical Laboratory Scientist MLS(ASCP) exam on the BOC content guideline: blood banking, urinalysis and body fluids, chemistry, hematology and hemostasis, immunology, microbiology and laboratory operations, at scientist depth."
- `EXAM_ORG.ascpmls`: "ASCP Board of Certification · MLS(ASCP) content guideline, September 2025"
- Hub group "Healthcare certification exams": insert `"ascpmls"` right after `"ascpmlt"`.
- `SEARCH_ALIASES.ascpmls`: "mls mls ascp ascp mls mls(ascp) mls ascpi ascp mls exam ascp boc mls medical laboratory scientist medical lab scientist mls exam mls certification clinical laboratory scientist cls exam medical technologist ascp ascp medical laboratory scientist board of certification mls"
  (note: `phmedtech` carries "medical laboratory science board exam"; country ranking should keep
  ascpmls first for US visitors, and ascpmls deliberately does not take "medtech").
- `RELATED_OVERRIDES.ascpmls`: `["ascpmlt", "ascppbt", "htl", "phmedtech"]`
- Search alias test cases for `tests/test-search-aliases.test.cjs`:
  `["ascp mls", "US", "ascpmls"]`, `["mls ascp exam", "US", "ascpmls"]`,
  `["medical laboratory scientist exam", "US", "ascpmls"]`, `["mls practice test", "US", "ascpmls"]`.
  Keep the existing `ascpmlt` cases passing ("mlt practice test" must still find ascpmlt).

## lib/region.ts

US (the default; no `TEST_REGIONS` line, like ascpmlt).

## Teacher-led

- `components/TeachNudge.tsx` `TEACHER_LED`: add `"ascpmls",` next to `"ascpmlt",`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `ascpmls: "an MLS program",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `ascpmls: "htl",` (as ascpmlt).

## lib/examFacts.ts

```ts
  ascpmls: {
    answer:
      "The MLS(ASCP) exam is the medical laboratory scientist certification exam of the American Society for Clinical Pathology Board of Certification (ASCP BOC), which earns the MLS(ASCP) credential (MLS(ASCPi) internationally). The BOC content guideline (revised September 25, 2025) gives 100 multiple-choice questions with one best answer in 2 hours 30 minutes, delivered as computer adaptive testing. Blood Banking, Chemistry, Hematology and Microbiology are 17 to 22% each, and Urinalysis and Other Body Fluids, Immunology and Laboratory Operations are 5 to 10% each. Regulatory questions are based on U.S. sources. The BOC reports a scaled score from 100 to 999, with 400 to pass.",
    rows: [
      { label: "Questions", value: "100 multiple choice, one best answer" },
      { label: "Time", value: "2 hours 30 minutes" },
      { label: "Format", value: "Computer adaptive testing (CAT)" },
      { label: "Largest areas", value: "Blood banking, chemistry, hematology and microbiology, 17 to 22% each" },
      { label: "Pass mark", value: "Scaled score of 400 on a 100 to 999 scale" },
      { label: "Run by", value: "ASCP Board of Certification (BOC)" },
    ],
    basedOn: "The ASCP BOC Medical Laboratory Scientist MLS(ASCP) and MLS(ASCPi) Examination Content Guideline (revised September 25, 2025), checked November 2026",
    source: { name: "ASCP BOC: MLS(ASCP) Examination Content Guideline", url: "https://ascpcontentwebsite.blob.core.windows.net/boccontent/docs/default-source/explore-credentials/content-guidelines/ascp_ascpi_mls_content_guideline.pdf" },
  },
```

## Freshness

No dated change announced in the guideline or on the content host as of 2026-11-18; no event.

## CLAUDE.md bullet (after the MLT(ASCP) bullet)

- **MLS(ASCP)** (ASCP Board of Certification Medical Laboratory Scientist certification exam, MLS(ASCP) and MLS(ASCPi), `/ascp-mls/*`, landing `/ascp-mls-practice-test`): `data/ascp-mls-questions.json` (200 original questions on the BOC MLS Examination Content Guideline revised September 25, 2025, written at scientist depth (workups, interferences, correlation) to stay clear of the MLT bank: blood banking as blood products, storage and dating (21 CFR 610.53, 640.34, 640.54), transfusion reactions and reporting (21 CFR 606.170) and practice 16 and blood groups, special reagents (lectins, neutralization, prewarm), DAT patterns, HDFN and RhIG dosing, platelet antigens and genotyping 24; urinalysis and other body fluids 16; chemistry as carbohydrates, lipids, heme derivatives, enzymes and proteins 20 and acid-base, electrolytes, endocrinology (biotin and hook interferences), vitamins, TDM and toxicology 16; hematology as physiology, disease states, flow and cytogenetics, special stains and calculations 24 and hemostasis (mixing studies, inhibitors, VWD types, DOACs, TEG, HIT) 16; immunology 16 (CDC HIV, hepatitis B, Lyme and reverse syphilis algorithms); microbiology 36; laboratory operations 16 (Westgard, CLIA verification, competency and records under 42 CFR 493, OSHA 1910.1030, 49 CFR 173.199 packaging, predictive values, dilutions, instrumentation, management and education)), test IDs 40701-40704, sets 40701-40705 (by content area: Blood Banking 40, Urinalysis & Chemistry 52, Hematology & Hemostasis 40, Microbiology 36, Immunology & Lab Operations 32), state `ASCPMLS`, prefix `MLS-`, 70% readiness line (the real exam is 100 questions in 2 h 30 min, computer adaptive, scaled 100 to 999 with 400 to pass per the BOC's About the Examination page, read from a search summary since ascp.org returned 403; the guideline was read from ASCP's own blob content host). 4/6/4/5/4/6/4/4/9/4 per test (blood banking 20%, urinalysis 8%, chemistry 18%, hematology 20%, immunology 8%, microbiology 18%, lab operations 8%, all inside the BOC ranges; the splits inside blood banking, chemistry and hematology are Tigertest's). Every computed key (13) is recomputed in build.py. Fixed 50-question forms model a CAT exam; the landing says so. Written against `ascpmlt`, `phmedtech`, `ascpht`, `ascppbt`, `rpt`, `phleb` and `htl` and scanned against every v1 bank for repeated fact-and-answer pairs (about 30 rewritten). Built by `tools/build-run-2026-11-18/ascpmls/build.py`; sources in `tools/build-run-2026-11-18/ascpmls/sources.md`. Hub group "Healthcare certification exams" (after ascpmlt), `[data-theme="ascpmls"]` (hue set by the integrator), borrows the HTL tiger, teacher-led (MLS programs).

## Also

`scripts/build-training-parts.ts` run (no set over 60, so no parts), `lib/seoDates.ts` /
landing dates bump, `python3 -I tools/build_exam_sources.py`, screenshots
`/landing/ascpmls-{mobile,desktop}.png` and dark twins. Premium: standard v1 locks (nothing to add).
