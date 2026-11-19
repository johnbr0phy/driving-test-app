# Wiring: ExCPT (NHA) (`excpt`, v1)

Files already written by the builder (exam-only):
- `data/excpt-questions.json` (built by `python3 -I tools/build-run-2026-11-18/excpt/build.py`,
  which recomputes all 16 calculation keys in `CHECKS`, places keys in seeded balanced slots per category and keeps all-number options in ascending order)
- `lib/banks/excpt.ts`
- `app/excpt/` (layout, redirect, dashboard, drill, stats; copied from `app/cpcta/`, stats imports
  the bank like the template; no test or practice folders)
- `app/excpt-practice-test/page.tsx` (copied from `app/cpct-practice-test/`)
- `tools/build-run-2026-11-18/excpt/` (sources.md, q_*.py, build.py, this file)

Validator (PASS, key-longest 6%, key>1.2x 7%, letters 48/54/52/46 (seeded balanced slots per category; all-number options sorted),
median stem 13 words, 22% article-led options, option reuse 1%, no answer patterns, 0 option refs):
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/excpt-questions.json --pool excptRole=28 --pool excptLaws=20 --pool excptControlled=12 --pool excptClasses=16 --pool excptTopDrugs=12 --pool excptIntake=24 --pool excptDispense=24 --pool excptCalc=16 --pool excptCompound=20 --pool excptSafety=28`

`tools/check_sources.py` needs Python 3.10+ (`Path | None`); this Mac has 3.9, so it was run with
`from __future__ import annotations` prepended: 32 primary pages, 27 dated reads, PASS.

Format: 4 tests x 50, five topic sets (48/40/48/36/28), 9 dashboard steps; pools exactly 4x per test.

## lib/exams.ts

`ExamId` union: add `| "excpt"`. Icon `"pill"` already exists (ptcb uses it).

Block (next to `const ptcb`):

```ts
const excpt: ExamConfig = {
  id: "excpt",
  stateCode: "EXCPT",
  idBase: 41300,
  slug: "/excpt",
  landingPath: "/excpt-practice-test",
  name: "ExCPT Practice Test",
  shortName: "ExCPT (NHA)",
  examLabel: "ExCPT exam",
  fullName: "Exam for the Certification of Pharmacy Technicians (ExCPT)",
  questionIdPrefix: "EXCPT-",
  icon: "pill",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // NHA Certified Pharmacy Technician (CPhT) Test Plan for the ExCPT Exam, based on the 2023 job
  // analysis, used for exams from July 9, 2025 (NHA media center; checked November 2026):
  // 100 scored + 20 pretest items in 2 hours 10 minutes. Scored items: 1 technician role and
  // practice 15; 2A federal requirements 9, 2B controlled substances 6; 3A drug classification 8,
  // 3B top drugs 5; 4A intake and entry 13, 4B preparing and dispensing 13, 4C calculations 7,
  // 4D compounding, unit dose and repackaging 10; 5 medication safety and QA 14. Scaled to 50:
  // 7/5/3/4/3/6/6/4/5/7 (Tigertest's rounding). NHA reports a scaled score (200 to 500, 390 to
  // pass, not a percent); 70% here is a readiness marker. Federal law only. All items original.
  blueprint: {
    excptRole: 7,
    excptLaws: 5,
    excptControlled: 3,
    excptClasses: 4,
    excptTopDrugs: 3,
    excptIntake: 6,
    excptDispense: 6,
    excptCalc: 4,
    excptCompound: 5,
    excptSafety: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 41301, name: "Technician Role & Pharmacy Law", categories: ["excptRole", "excptLaws"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 2, id: 41302, name: "Controlled Substances & Drug Therapy", categories: ["excptControlled", "excptClasses", "excptTopDrugs"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 41303, name: "Prescription Intake & Dispensing", categories: ["excptIntake", "excptDispense"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 41304, name: "Calculations & Compounding", categories: ["excptCalc", "excptCompound"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 41305, name: "Medication Safety & Quality", categories: ["excptSafety"], size: 28, weightLabel: "7 of 50 test questions" },
  ],
  categoryLabels: {
    excptRole: "Technician Role & Practice",
    excptLaws: "Federal Requirements",
    excptControlled: "Controlled Substances",
    excptClasses: "Drug Classes, Routes & Dosage Forms",
    excptTopDrugs: "Top Drugs & Drug Therapy",
    excptIntake: "Prescription Intake & Entry",
    excptDispense: "Preparing & Dispensing",
    excptCalc: "Calculations",
    excptCompound: "Compounding & Repackaging",
    excptSafety: "Medication Safety & Quality Assurance",
  },
  copy: {
    guestPrompt: "to save your ExCPT progress and track every question you miss",
    trainingHeading: "Train by NHA test plan domain",
    trainingSub: "Five sets covering every domain of the NHA ExCPT test plan. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Five training sets, four practice tests. Start with Technician Role & Pharmacy Law.",
      "Master each set, then take a practice test.",
      "Keep going. Take a practice test to see where you stand.",
      "Review your mistakes, then retake any test you haven't passed.",
      "All done. You're ready for the ExCPT.",
    ],
    sourceLine: "Based on the NHA ExCPT test plan (2023 job analysis). Original questions; 50 per test, weighted like the real exam. Not affiliated with the National Healthcareer Association.",
    analyticsKey: "excpt",
  },
};
// IDs: tests 41301-41304, sets 41301-41305 (block 41300 assigned for this run).
// Dashboard: 5 sets + 4 tests = 9 steps; the 25% lock takes the last two steps.
```

`EXAMS` array: append `excpt` right after `ptcb`.

## lib/banks/all.ts

```ts
import "./excpt";
```

## types/index.ts

`QuestionType`: add `| "EXCPT"`.

`QuestionCategory` union (keys grepped: none exist yet):

```ts
  // ExCPT (NHA) pharmacy technician
  | "excptRole"
  | "excptLaws"
  | "excptControlled"
  | "excptClasses"
  | "excptTopDrugs"
  | "excptIntake"
  | "excptDispense"
  | "excptCalc"
  | "excptCompound"
  | "excptSafety"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (category label map, English in all five)

```ts
    excptRole: "Technician Role & Practice",
    excptLaws: "Federal Requirements",
    excptControlled: "Controlled Substances",
    excptClasses: "Drug Classes, Routes & Dosage Forms",
    excptTopDrugs: "Top Drugs & Drug Therapy",
    excptIntake: "Prescription Intake & Entry",
    excptDispense: "Preparing & Dispensing",
    excptCalc: "Calculations",
    excptCompound: "Compounding & Repackaging",
    excptSafety: "Medication Safety & Quality Assurance",
```

## app/globals.css (light block only; run gen_dark_brand_css.py once at integration)

Hue 287, deep violet (PTCB is a lighter 292 60% 50%, which differs by 40 saturation and 20
lightness, so the two pharmacy tests read as related but distinct). Checked against every
`--brand` in `app/globals.css` on 2026-11-18 with the rule (within 8 degrees, differ by 15
saturation or 8 lightness): no clash. White on `--brand` is about 9:1. Not checked against the
other builders' in-flight hues; the integrator settles those.

```css
  /* ExCPT (NHA) pharmacy technician theme */
  [data-theme="excpt"] {
    --brand: 287 100% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 287 70% 96%;
    --brand-hover: 287 100% 25%;
    --brand-dark: 287 100% 22%;
    --brand-darker: 287 90% 14%;
    --brand-muted: 287 40% 72%;
    --brand-border: 287 40% 80%;
    --brand-border-light: 287 35% 90%;
    --brand-gradient-to: 300 60% 96%;
  }
```

## lib/testCatalog.ts

```ts
// EXAM_BLURBS
  excpt: "NHA Exam for the Certification of Pharmacy Technicians (ExCPT), the CPhT exam, on the 2023 test plan: technician role, federal law and controlled substances, drug classes and top drugs, prescription intake and dispensing, calculations, compounding and medication safety.",
// EXAM_ORG
  excpt: "National Healthcareer Association (NHA) · ExCPT test plan (2023 job analysis)",
// SEARCH_ALIASES
  excpt: "excpt nha excpt exam for the certification of pharmacy technicians nha pharmacy technician nha pharmacy tech nha cpht cpht nha pharmacy technician nha certified pharmacy technician nha",
// RELATED_OVERRIDES
  excpt: ["ptcb", "naplex", "cpcta", "ccma"],
```

Also add `"excpt"` to `ptcb`'s RELATED_OVERRIDES if it has a list. Do not move "pharmacy
technician" off `ptcb`: a bare "pharmacy technician" search should still find both (ptcb first by
popularity). Hub group: "Healthcare certification exams", placed right after `ptcb`. Region US.
Share copy (`lib/shareCardCopy.ts`, and add the id to `SHARE_COPY_IDS` in `lib/shareImageUrl.ts`
like cpcta):

```ts
  excpt: { title: "Free-to-Start ExCPT Practice Test", description: "200 original questions on the NHA ExCPT test plan for pharmacy technicians. Free to start." },
```

Search tests (`tests/test-search-aliases.test.cjs`): `["excpt", "US", "excpt"]`,
`["nha pharmacy technician", "US", "excpt"]`, `["cpht nha", "US", "excpt"]`.

## lib/region.ts

`TEST_REGIONS`: `excpt: "US",` (US is the default; add it only if the file lists every US exam)
and add `"excpt"` to `NON_DRIVING_TESTS` if ptcb is there.

## components/TeachNudge.tsx

Add `"excpt"` to `TEACHER_LED` (after `"ptcb"`).

## components/exam/ExamClassFaq.tsx

```ts
  excpt: "a pharmacy technician program",
```

(The landing already renders `<ExamClassFaq examId="excpt" />` and `classFaqJsonLd("excpt")`.)

## lib/tigerAssets.ts

`BORROWED_SETS`: `excpt: "ptcb",`

## lib/examFacts.ts

```ts
  excpt: {
    answer:
      "The ExCPT (Exam for the Certification of Pharmacy Technicians) is the National Healthcareer Association's (NHA) exam for the Certified Pharmacy Technician (CPhT) credential. NHA's test plan, from a 2023 job analysis and used for exams from July 9, 2025, gives it 100 scored questions plus 20 unscored pretest questions, with 2 hours 10 minutes to finish. Of the scored questions, 15 cover the technician's role and practice, 15 pharmacy law (9 federal requirements, 6 controlled substances), 13 drugs and drug therapy, 43 the dispensing process (13 prescription intake, 13 dispensing, 7 calculations, 10 compounding and repackaging) and 14 medication safety and quality assurance. It is scored on a 200 to 500 scale and 390 passes, which is not a fixed percentage. It is taken at a PSI testing center or by live remote proctoring.",
    rows: [
      { label: "Questions", value: "120 (100 scored, 20 pretest)" },
      { label: "Time", value: "2 hours 10 minutes" },
      { label: "Passing score", value: "390 on a 200 to 500 scale" },
      { label: "Largest domain", value: "Dispensing process, 43 of 100" },
      { label: "Current plan", value: "2023 job analysis, exams from July 9, 2025" },
      { label: "Eligibility", value: "Training program within 5 years, or 1 year (1,200 hours) of supervised work in the last 3 years" },
      { label: "Where", value: "PSI testing center or live remote proctoring" },
      { label: "Renewal", value: "Every 2 years, 20 CE credits (1 law, 1 patient safety)" },
      { label: "Given by", value: "NHA" },
    ],
    basedOn: "NHA's ExCPT test plan (2023 job analysis), CPhT certification page and 2024 pass rate report, checked November 2026",
    source: { name: "NHA: Certified Pharmacy Technician (CPhT)", url: "https://www.nhanow.com/certification/nha-certifications/certified-pharmacy-technician-(cpht)" },
  },
```

## lib/examCosts.json

Not added: the exam fee was not read on NHA's own page.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` (once for the batch) naming `excpt`.

## scripts/build-training-parts.ts

Run once at the end (no set is over 60, so no parts or `partNames`).

## CLAUDE.md (Additional Exams list, after PTCB)

- **ExCPT (NHA)** (`excpt`, National Healthcareer Association Exam for the Certification of Pharmacy Technicians, the CPhT credential, `/excpt/*`, landing `/excpt-practice-test`): `data/excpt-questions.json` (200 original questions on the NHA ExCPT Test Plan based on the 2023 job analysis, used for exams from July 9, 2025: technician role and practice (pharmacist-only tasks, final check, med rec, MTM, compliance aids, terminology, communication, PAR and just-in-time inventory, stock rotation, expiration dating, recall classes, FDA disposal and flush list, references such as the Orange Book and Handbook on Injectables, LTC setting, security) 28, federal requirements (1906, 1938, Durham-Humphrey, Kefauver-Harris, Hatch-Waxman, Drug Listing Act, MMA, DSCSA, HIPAA minimum necessary and six-year records, PPPA purchaser or prescriber request and exemptions under 15 U.S.C. 1473(b) and 16 CFR 1700.14, OBRA 1990 prospective DUR and state counseling standards, CMS, fraud) 20, controlled substances (DEA Form 106 within 45 days, Form 222 valid 60 days, power of attorney with two witnesses, exact count over 1,000 units, 72-hour and 60-day LTCF partial fills, "Authorization for Emergency Dispensing", OTC Schedule V at 18 by a pharmacist, M for mid-level DEA numbers, red C, schedules, PDMPs) 12, drug classes, routes and dosage forms 16, top drugs and drug therapy 12, prescription intake and entry (NPI 10 digits, sig codes, DAW 2 and 4, BIN, refill-too-soon and prior authorization rejects, coordination of benefits, formularies and tiers, Medicare Part B test strips) 24, preparing and dispensing (forgery signs, NDC segments and the 12-digit NDC from March 7, 2033, lot numbers, LTCF automated dispensing systems, controlled substance labels, auxiliary labels, Medication Guides, PPIs for oral contraceptives and estrogens, IFUs, REMS, mailing, 42 CFR 456.705 toll-free counseling, Drug Facts, household pickup, CENTRAL FILL, meniscus) 24, calculations 16 (every key recomputed in build.py), compounding (FDA Insanitary Conditions guidance November 2020 and OSHA's hazardous drug pages as the only USP sources: first air, ISO 5, ISO 7 buffer with ante-room, BSCs, negative-pressure storage, ASTM D6978 gloves, SCA beyond-use dates, sporicidals, trituration and levigation, media fills) 20, medication safety (FDA Tall Man pairs, IU and µg rules from FDA's 2022 label guidance, hand hygiene, sharps, barcode checks, spills, cold-chain excursions, high-alert drugs) 28), test IDs 41301-41304, sets 41301-41305 (Technician Role & Pharmacy Law 48, Controlled Substances & Drug Therapy 40, Prescription Intake & Dispensing 48, Calculations & Compounding 36, Medication Safety & Quality 28), state `EXCPT`, prefix `EXCPT-`, 70% readiness line (NHA: 100 scored + 20 pretest items in 2 hours 10 minutes, scaled 200 to 500 with 390 to pass, not a percentage; PSI test center or live remote proctoring; renewal every 2 years with 20 CE credits; 2024 pass rate 62%). 7/5/3/4/3/6/6/4/5/7 per test, the plan's 15/9/6/8/5/13/13/7/10/14 of 100 scaled to 50. Federal law only; ISMP, USP and The Joint Commission pages blocked automated reads and nothing rests on them. Written against `ptcb` (same job: its facts and answers were avoided), `phpharm`, `cpcta`, `ccma`, `cma`, `rma` and `ncpt`, and scanned for repeated fact-and-answer pairs. Built by `tools/build-run-2026-11-18/excpt/build.py`; sources in `tools/build-run-2026-11-18/excpt/sources.md`. Hub group "Healthcare certification exams" (after ptcb), `[data-theme="excpt"]` deep violet (287 100% 30%), borrows the PTCB tiger, teacher-led (pharmacy technician programs).

## lib/examFreshness.json

No dated change found: the 2023-job-analysis plan has been live since July 9, 2025. The yearly
review covers it. (FDA's 12-digit NDC rule takes effect March 7, 2033; one item asks about it,
and it needs no action before then.)

## Screenshots

`/landing/excpt-mobile.png` and `/landing/excpt-desktop.png` (the integrator shoots them).
