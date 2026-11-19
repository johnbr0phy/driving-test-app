# Wiring: HT(ASCP) Histotechnician (`ascpht`, v1)

Files already written by the builder (exam-only):
- `data/ascp-ht-questions.json` (built by `python3 -I tools/build-run-2026-11-18/ascpht/build.py`,
  which recomputes the 6 computed keys)
- `lib/banks/ascpht.ts`
- `app/ascp-ht/` (layout, redirect, dashboard, drill, stats; copied from `app/ascp-mlt/`, stats
  imports the bank like the template; no test or practice folders)
- `app/ascp-ht-practice-test/page.tsx` (copied from `app/ascp-mlt-practice-test/`)
- `tools/build-run-2026-11-18/ascpht/` (sources.md, q_*.py, build.py, this file)

Validator (PASS, key-longest 16%, key>1.2x 12%, letters 50/50/50/50, median stem 10 words,
5% article-led options, option reuse 0%, echo gain 0.9, no answer patterns, 0 option refs):
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/ascp-ht-questions.json --pool htFix=40 --pool htProc=28 --pool htEmbed=40 --pool htStainNuc=24 --pool htStainCt=24 --pool htStainPig=20 --pool htOps=24`

Format: 4 tests x 50, five topic sets (40/28/40/48/44), 9 dashboard steps; pools exactly 4x per test.

**HTL overlap note (please apply).** The existing `htl` catalog blurb says "ASCP histotechnologist
and histotechnician certification" and its search alias carries "histotechnician". Now that HT has
its own test, change the `htl` blurb to the histotechnologist (HTL) exam only and move
"histotechnician" to `ascpht` (the alias line below has it). Suggested htl blurb: "ASCP
histotechnologist HTL(ASCP) certification. Fixation, processing, embedding, microtomy, staining
(including IHC theory and enzyme histochemistry) and lab operations." Add a case to
`tests/test-search-aliases.test.cjs`: "histotechnician" -> `ascpht`, "ht ascp" -> `ascpht`, and
keep "histotechnologist" -> `htl`.

## lib/exams.ts

`ExamId` union: add `| "ascpht"`. Icon `"microscope"` already exists.

Block (before `const htl`):

```ts
const ascpht: ExamConfig = {
  id: "ascpht",
  stateCode: "ASCPHT",
  idBase: 40600,
  slug: "/ascp-ht",
  landingPath: "/ascp-ht-practice-test",
  name: "HT(ASCP) Practice Test",
  shortName: "HT(ASCP)",
  examLabel: "HT exam",
  fullName: "ASCP Histotechnician HT(ASCP) Certification Exam",
  questionIdPrefix: "HT-",
  icon: "microscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // ASCP BOC Histotechnician HT(ASCP)/HT(ASCPi) and HTL Examination Content Guideline (revised
  // June 24, 2026, checked November 2026): 100 questions in 2 hours 30 minutes, computer adaptive.
  // Fixation 15-25%, Processing 10-20%, Embedding/Microtomy 15-25%, Staining 30-40%, Laboratory
  // Operations 10-15%; HTL-only items left out. Per 50-question fixed form: 10/7/10/17/6
  // (20/14/20/34/12%), all inside the ranges; the staining split 6/6/5 is Tigertest's. The real
  // exam is CAT and scaled; 70% here is a readiness marker. All items original.
  blueprint: {
    htFix: 10,
    htProc: 7,
    htEmbed: 10,
    htStainNuc: 6,
    htStainCt: 6,
    htStainPig: 5,
    htOps: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 40601, name: "Fixation", categories: ["htFix"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 40602, name: "Processing & Decalcification", categories: ["htProc"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 3, id: 40603, name: "Embedding & Microtomy", categories: ["htEmbed"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 40604, name: "H&E, Carbohydrate & Connective Stains", categories: ["htStainNuc", "htStainCt"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 5, id: 40605, name: "Special Stains & Lab Operations", categories: ["htStainPig", "htOps"], size: 44, weightLabel: "11 of 50 test questions" },
  ],
  categoryLabels: {
    htFix: "Fixation",
    htProc: "Processing & Decalcification",
    htEmbed: "Embedding & Microtomy",
    htStainNuc: "H&E, Mounting, Cytology & IHC Basics",
    htStainCt: "Carbohydrate, Connective Tissue, Nerve & Lipid Stains",
    htStainPig: "Microorganism, Pigment & Mineral Stains",
    htOps: "Laboratory Operations",
  },
  copy: {
    guestPrompt: "to save your HT(ASCP) progress and track every question you miss",
    trainingHeading: "Train by BOC content area",
    trainingSub: "Five sets covering the five content areas of the ASCP BOC histotechnician guideline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Five training sets, four practice tests. Start with Fixation.",
      "Master each set, then take a practice test.",
      "Keep going. Take a practice test to see where you stand.",
      "Review your mistakes, then retake any test you haven't passed.",
      "All done. You're ready for the HT(ASCP).",
    ],
    sourceLine: "Based on the ASCP BOC HT and HTL Examination Content Guideline. Original questions; 50 per test, weighted like the real exam. Not affiliated with the American Society for Clinical Pathology.",
    analyticsKey: "ascpht",
  },
};
```

`EXAMS` array: append `ascpht` next to `ascpmlt` (before `htl`).

## lib/banks/all.ts

```ts
import "./ascpht";
```

## types/index.ts

`QuestionType`: add `| "ASCPHT"`.

`QuestionCategory` union (keys grepped: none exist yet):

```ts
  // HT(ASCP) Histotechnician
  | "htFix"
  | "htProc"
  | "htEmbed"
  | "htStainNuc"
  | "htStainCt"
  | "htStainPig"
  | "htOps"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (category label map, English in all five)

```ts
    htFix: "Fixation",
    htProc: "Processing & Decalcification",
    htEmbed: "Embedding & Microtomy",
    htStainNuc: "H&E, Mounting, Cytology & IHC Basics",
    htStainCt: "Carbohydrate, Connective Tissue, Nerve & Lipid Stains",
    htStainPig: "Microorganism, Pigment & Mineral Stains",
    htOps: "Laboratory Operations",
```

## app/globals.css (light block only; run gen_dark_brand_css.py once at integration)

Hue 296, deep magenta violet (hematoxylin and eosin). Checked against every `--brand` in
`app/globals.css` on 2026-11-18 with the rule (within 8 degrees, differ by 15 saturation or 8
lightness): no clash. White on `--brand` is about 7.1:1. Not checked against the other builders'
in-flight hues; the integrator settles those.

```css
  /* HT(ASCP) Histotechnician theme */
  [data-theme="ascpht"] {
    --brand: 296 75% 36%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 296 70% 96%;
    --brand-hover: 296 75% 30%;
    --brand-dark: 296 75% 27%;
    --brand-darker: 296 70% 18%;
    --brand-muted: 296 40% 72%;
    --brand-border: 296 40% 78%;
    --brand-border-light: 296 35% 89%;
    --brand-gradient-to: 310 70% 96%;
  }
```

(Derive the nine companion values the way the neighbouring blocks do if they differ from these.)

## lib/testCatalog.ts

```ts
// EXAM_BLURBS
  ascpht: "ASCP Board of Certification Histotechnician HT(ASCP) exam on the BOC content guideline: fixation, processing and decalcification, embedding and microtomy, H&E and special stains, and laboratory operations.",
// EXAM_ORG
  ascpht: "ASCP Board of Certification · HT(ASCP) content guideline, June 2026",
// SEARCH_ALIASES
  ascpht: "ht ht ascp ascp ht ht(ascp) ht ascpi ascp ht exam ascp boc ht histotechnician histology technician histotech histology tech exam ht certification histotechnician certification",
// RELATED_OVERRIDES
  ascpht: ["htl", "ascpmlt", "ascppbt", "cst"],
```

Hub group: "Healthcare certification exams", placed right after `htl` (or after `ascpmlt`).
Region US. Share copy (`lib/shareCardCopy.ts`, and add the id to `SHARE_COPY_IDS` in
`lib/shareImageUrl.ts` like ascpmlt):

```ts
  ascpht: { title: "Free HT(ASCP) Practice Test", description: "200 original questions on the ASCP BOC histotechnician content guideline, four 50-question practice tests." },
```

Search tests (if the alias test lists cases): `["ht ascp", "US", "ascpht"]`,
`["histotechnician exam", "US", "ascpht"]`, `["histotechnician practice test", "US", "ascpht"]`.

## lib/region.ts

`TEST_REGIONS`: `ascpht: "US",` (US is the default; add it where ascpmlt is listed, if it is) and
add `"ascpht"` to `NON_DRIVING_TESTS` if ascpmlt is there.

## components/TeachNudge.tsx

Add `"ascpht"` to `TEACHER_LED` (after `"ascpmlt"`).

## components/exam/ExamClassFaq.tsx

```ts
  ascpht: "a histotechnician program",
```

(The landing already renders `<ExamClassFaq examId="ascpht" />` and `classFaqJsonLd("ascpht")`.)

## lib/tigerAssets.ts

`BORROWED_SETS`: `ascpht: "htl",`

## lib/examFacts.ts

```ts
  ascpht: {
    answer:
      "The HT(ASCP) exam is the histotechnician certification exam of the American Society for Clinical Pathology Board of Certification (ASCP BOC), which earns the HT(ASCP) credential (HT(ASCPi) internationally). The BOC content guideline (revised June 24, 2026) gives 100 multiple-choice questions with one best answer in 2 hours 30 minutes, delivered as computer adaptive testing. Content areas are Staining 30 to 40%, Fixation 15 to 25%, Embedding/Microtomy 15 to 25%, Processing 10 to 20% and Laboratory Operations 10 to 15%. Regulatory questions are based on U.S. sources. Some topics, such as immunohistochemistry staining theory, enzyme histochemistry staining and management, are on the HTL exam only. The BOC reports a scaled score from 100 to 999, with 400 to pass.",
    rows: [
      { label: "Questions", value: "100 multiple choice, one best answer" },
      { label: "Time", value: "2 hours 30 minutes" },
      { label: "Format", value: "Computer adaptive testing (CAT)" },
      { label: "Largest area", value: "Staining, 30 to 40%" },
      { label: "Pass mark", value: "Scaled score of 400 on a 100 to 999 scale" },
      { label: "Run by", value: "ASCP Board of Certification (BOC)" },
    ],
    basedOn: "The ASCP BOC Histotechnician HT(ASCP) and Scientist in Histotechnology HTL(ASCP) Examination Content Guideline (revised June 24, 2026), checked November 2026",
    source: { name: "ASCP BOC: HT and HTL Examination Content Guideline", url: "https://ascpcontentwebsite.blob.core.windows.net/boccontent/docs/default-source/explore-credentials/content-guidelines/ascp_ascpi_ht_htl_content_guideline.pdf" },
  },
```

The pass-mark row comes from the BOC "About the Examination" page as read from a search summary
(ascp.org returns 403 to automated requests), the same as ascpmlt.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` (once for the batch) naming `ascpht`.

## scripts/build-training-parts.ts

Run once at the end (no set is over 60, so no parts or `partNames`).

## CLAUDE.md (Additional Exams list, after MLT(ASCP))

- **HT(ASCP)** (`ascpht`, ASCP Board of Certification Histotechnician certification exam, HT(ASCP) and HT(ASCPi), `/ascp-ht/*`, landing `/ascp-ht-practice-test`): `data/ascp-ht-questions.json` (200 original questions on the BOC HT and HTL Examination Content Guideline revised June 24, 2026, HTL-only items left out: fixation 40 (NBF, Bouin, Carnoy, Zamboni, glutaraldehyde and osmium for EM, alcohols, Michel medium, specimen triage, microwave fixation), processing and decalcification 28, embedding and microtomy 40 (orientation, microtome and cryostat use, troubleshooting, safety), staining as H&E, mounting, Pap and Romanowsky stains, IHC terms and CLIA stain QC 24, carbohydrate, connective tissue, nerve and lipid stains 24 and microorganism, pigment, mineral, bone marrow and tissue component stains 20, laboratory operations 24 (OSHA formaldehyde 1910.1048 and xylene limits, SDS, Chemical Hygiene Plan, bloodborne pathogens, lab math, pipette checks, HIPAA, CLIA retention, labels and kit lots)), test IDs 40601-40604, sets 40601-40605 (by content area: Fixation 40, Processing & Decalcification 28, Embedding & Microtomy 40, H&E, Carbohydrate & Connective Stains 48, Special Stains & Lab Operations 44), state `ASCPHT`, prefix `HT-`, 70% readiness line (the real exam is 100 questions in 2 h 30 min, computer adaptive, scaled 100 to 999 with 400 to pass per the BOC's About the Examination page, read from a search summary since ascp.org returned 403; the guideline was read from ASCP's own blob content host). 10/7/10/6/6/5/6 per test (fixation 20%, processing 14%, embedding/microtomy 20%, staining 34%, lab operations 12%, all inside the BOC ranges; the staining split is Tigertest's). Fixed 50-question forms model a CAT exam; the landing says so. Written against `htl` (same guideline: its facts and answers were avoided, so shared topics are asked through other facts), `ascpmlt` and `cst`, and scanned against every bank for repeated fact-and-answer pairs. Built by `tools/build-run-2026-11-18/ascpht/build.py`; sources in `tools/build-run-2026-11-18/ascpht/sources.md`. Hub group "Healthcare certification exams" (after htl), `[data-theme="ascpht"]` deep magenta violet (296 75% 36%), borrows the HTL tiger, teacher-led (histotechnician programs).

## lib/examFreshness.json

No dated change found: the June 24, 2026 guideline is current. The yearly review covers it.

## Screenshots

`/landing/ascpht-mobile.png` and `/landing/ascpht-desktop.png` (the integrator shoots them).
