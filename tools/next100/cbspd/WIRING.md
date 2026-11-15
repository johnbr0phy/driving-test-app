# cbspd wiring (paste-ready)

Exam: CBSPD Certified Sterile Processing and Distribution Technician (CSPDT). v1, idBase 29900,
state code `CBSPD`, prefix `CBSPD-`, slug `/cspdt`, landing `/cbspd-cspdt-practice-test`,
bank `data/cbspd-cspdt-questions.json` (200), built by `python3 -I tools/next100/cbspd/build.py`.
Premium through the standard v1 locks (nothing to add).

Files written by the builder: `tools/next100/cbspd/*`, `data/cbspd-cspdt-questions.json`,
`lib/banks/cbspd.ts`, `app/cspdt/{page,layout}.tsx`, `app/cspdt/{dashboard,drill,stats}/page.tsx`,
`app/cbspd-cspdt-practice-test/page.tsx`.

## How it differs from CRCST (crcst)

- Owner and outline: CBSPD (Certification Board for Sterile Processing and Distribution), eight
  areas in its 2026 Technician Candidate Bulletin (2020 job analysis); CRCST is HSPA's, seven
  sections on the HSPA outline rev. Nov 2023.
- Weights: CBSPD 13/9/19/16/18/11/6/8 (roles, life science, decontamination, preparation,
  sterilization, storage and distribution, patient care equipment, ethics), with its own Life
  Science and Ethics areas; scored 70 on a scale, valid 5 years with 100 points, at PSI centers.
  The bank was checked against crcst, hspacer and hspachl stems and fact-and-answer pairs.

Suggested follow-up (integrator's call): `lib/exams.ts` crcst `sourceLine` still says "Also covers
the CBSPD CSPDT."; now that CSPDT has its own test, change it to
`"Weighted to the HSPA CRCST exam content outline (rev. Nov 2023)."` The crcst blurb in
`lib/testCatalog.ts` already says the two exams differ.

## config (lib/exams.ts)

Add `"cbspd"` to the `ExamId` union and `cbspd` to `EXAMS` (next to `crcst`). Icon `microscope`
(already in the icon union).

```ts
const cbspd: ExamConfig = {
  id: "cbspd",
  stateCode: "CBSPD",
  idBase: 29900,
  slug: "/cspdt",
  landingPath: "/cbspd-cspdt-practice-test",
  name: "CBSPD CSPDT Practice Test",
  shortName: "CSPDT (CBSPD)",
  examLabel: "CSPDT exam",
  fullName: "Certified Sterile Processing and Distribution Technician (CSPDT) Exam",
  questionIdPrefix: "CBSPD-",
  icon: "microscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // CBSPD Technician Candidate Bulletin, 2026 Version (exam built on the 2020 Job Analysis):
  // 1 Roles and Responsibilities 13%, 2 Life Science 9%, 3 Decontamination and Disinfection 19%,
  // 4 Preparation and Handling 16%, 5 Sterilization 18%, 6 Sterile Storage, Inventory Management
  // and Distribution 11%, 7 Patient Care Equipment 6%, 8 Ethics 8%. Of 50: 6.5/4.5/9.5/8/9/5.5/3/4,
  // rounded by Tigertest to 7/4/9/8/9/6/3/4. The real exam is 150 multiple-choice questions (125
  // scored, 25 pretest) in 3 hours at PSI; passing scaled score 70, which is not a percent correct,
  // so 70% here is a readiness marker. All items original.
  blueprint: {
    cbspdRoles: 7,
    cbspdLife: 4,
    cbspdDecon: 9,
    cbspdPrep: 8,
    cbspdSteril: 9,
    cbspdStorage: 6,
    cbspdPce: 3,
    cbspdEthics: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 29901, name: "Roles, Safety & Life Science", categories: ["cbspdRoles", "cbspdLife"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 2, id: 29902, name: "Decontamination & Disinfection", categories: ["cbspdDecon"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 3, id: 29903, name: "Preparation & Handling", categories: ["cbspdPrep"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 4, id: 29904, name: "Sterilization", categories: ["cbspdSteril"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 29905, name: "Storage, Equipment & Ethics", categories: ["cbspdStorage", "cbspdPce", "cbspdEthics"], size: 52, weightLabel: "13 of 50 test questions" },
  ],
  categoryLabels: {
    cbspdRoles: "Roles & Responsibilities",
    cbspdLife: "Life Science",
    cbspdDecon: "Decontamination & Disinfection",
    cbspdPrep: "Preparation & Handling",
    cbspdSteril: "Sterilization",
    cbspdStorage: "Sterile Storage, Inventory & Distribution",
    cbspdPce: "Patient Care Equipment",
    cbspdEthics: "Ethics",
  },
  copy: {
    guestPrompt: "to save your CSPDT progress and track every question you miss",
    trainingHeading: "Train by CBSPD outline area",
    trainingSub: "Five sets covering the eight areas of the CBSPD technician exam outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Five training sets, four practice tests. Start with Roles, Safety & Life Science.",
      "Master each set, then take a practice test.",
      "Keep going. Take a practice test to see where you stand.",
      "Review your mistakes, then retake any test you haven't passed.",
      "All done. You're ready for the CSPDT.",
    ],
    sourceLine: "Based on the CBSPD Technician Examination Outline (2026 candidate bulletin). Original questions; 50 per test, weighted like the real exam. Not affiliated with the Certification Board for Sterile Processing and Distribution.",
    analyticsKey: "cbspd",
  },
};
```

## bank (lib/banks/all.ts)

```ts
import "./cbspd";
```

Then run `npx tsx scripts/build-training-parts.ts` (no set over 60, so no parts) and
`npx tsx scripts/build-landing-dates.ts`.

## types (types/index.ts, category keys)

```
CBSPD
cbspdRoles
cbspdLife
cbspdDecon
cbspdPrep
cbspdSteril
cbspdStorage
cbspdPce
cbspdEthics
```

## labels (i18n/*.ts, the `// cbspd` block in each of en, es, vi, ko, zh; English labels in all)

```ts
    // cbspd
    cbspdRoles: "Roles & Responsibilities",
    cbspdLife: "Life Science",
    cbspdDecon: "Decontamination & Disinfection",
    cbspdPrep: "Preparation & Handling",
    cbspdSteril: "Sterilization",
    cbspdStorage: "Sterile Storage, Inventory & Distribution",
    cbspdPce: "Patient Care Equipment",
    cbspdEthics: "Ethics",
```

## theme (app/globals.css)

Hue `161 75% 18%` (set by the integrator: passes white-text contrast and the clash check).

```css
  [data-theme="cbspd"] {
    --brand: 161 75% 18%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 161 50% 95%;
    --brand-hover: 161 75% 13%;
    --brand-dark: 161 75% 11%;
    --brand-darker: 161 70% 7%;
    --brand-muted: 161 40% 70%;
    --brand-border: 161 40% 78%;
    --brand-border-light: 161 40% 88%;
    --brand-gradient-to: 176 50% 95%;
  }
```

Dark block: rerun `tools/gen_dark_brand_css.py`. Email palette: add `cbspd` to
`lib/email-brand-palette.json` the way the other themes were generated.

## catalog (lib/testCatalog.ts)

- Blurb: `cbspd: "Sterile processing practice on CBSPD's technician exam outline: safety and OSHA rules, microbiology, decontamination, instrument prep and packaging, sterilization, storage and ethics.",`
- Org (`EXAM_ORG`): `cbspd: "Certification Board for Sterile Processing and Distribution (CBSPD)",`
- Hub group "Healthcare certification exams": add `"cbspd"` right after `"crcst"`.
- Search aliases: `cbspd: "cbspd cspdt cbspd exam certified sterile processing and distribution technician sterile processing and distribution cbspd technician cspdt exam",`
  Leave "cspdt" out of crcst's aliases if it is there, so a CSPDT search opens this test first.
- Region: US (`TEST_REGIONS` default; add `cbspd: "US"` if the list is explicit).
- Tiger: `lib/tigerAssets.ts` `BORROWED_SETS`: `cbspd: "crcst",`
- Share copy (`lib/shareCardCopy.ts` and `SHARE_COPY_IDS` in `lib/shareImageUrl.ts`):
  `cbspd: { title: "Free CBSPD CSPDT Practice Test", description: "200 original questions on CBSPD's technician exam outline, from decontamination to sterilization and storage. Free to start." },`
- Teacher-led: `TEACHER_LED` add `"cbspd"`; `components/exam/ExamClassFaq.tsx` `TEACHES`:
  `cbspd: "a sterile processing program",`; `components/TeachNudge.tsx` add `"cbspd"`.
- `tests/test-search-aliases.test.cjs`:

```js
  ["cbspd", "US", "cbspd"],
  ["cspdt", "US", "cbspd"],
  ["cbspd cspdt", "US", "cbspd"],
  ["certified sterile processing and distribution technician", "US", "cbspd"],
```

## facts (lib/examFacts.ts)

```ts
  cbspd: {
    answer:
      "The Certified Sterile Processing and Distribution Technician (CSPDT) exam is the Certification Board for Sterile Processing and Distribution's (CBSPD) certification exam for sterile processing and central service technicians. CBSPD's 2026 candidate bulletin gives it 150 multiple-choice questions, 125 scored and 25 unscored pretest items, taken on a computer at a PSI test center in 3 hours, four times a year in a one-week window. The passing scaled score is 70, which is not the same as 70 percent correct; candidates testing in the U.S. get an official pass or fail at the end, and only failing candidates receive a numeric score. Certification is valid for five years and is renewed with 100 points of continuing education and related activity over that time.",
    rows: [
      { label: "Questions", value: "150 multiple choice (125 scored, 25 pretest)" },
      { label: "Time", value: "3 hours" },
      { label: "Pass mark", value: "Scaled score of 70 (not a percent correct)" },
      { label: "Largest areas", value: "Decontamination and disinfection 19%, sterilization 18%" },
      { label: "Where", value: "Computer based at PSI test centers, four windows a year" },
      { label: "Renewal", value: "Every 5 years, with 100 recertification points" },
      { label: "Run by", value: "Certification Board for Sterile Processing and Distribution (CBSPD)" },
    ],
    basedOn: "CBSPD's Technician Candidate Bulletin (2026 version) and 2020 technician test specifications, checked November 2026",
    source: { name: "CBSPD: Technician certification", url: "https://www.cbspd.net/tech/" },
  },
```

## claude.md (CLAUDE.md bullet, after CER (HSPA))

- **CSPDT (CBSPD)** (`cbspd`, Certification Board for Sterile Processing and Distribution Certified Sterile Processing and Distribution Technician exam, `/cspdt/*`, landing `/cbspd-cspdt-practice-test`): `data/cbspd-cspdt-questions.json` (200 original questions on the Technician Examination Outline in CBSPD's 2026 Technician Candidate Bulletin, built on the 2020 job analysis: roles and responsibilities (OSHA bloodborne pathogens and ethylene oxide rules, SDS sections, latex, ergonomics, IFUs, loaners, CJD, label symbols) 28, life science (resistance ranking, biofilm, chain of infection, hand hygiene, terminology and basic anatomy) 16, decontamination and disinfection 36, preparation and handling (instrument anatomy and names from the ACS instrument module, care per manufacturer guides, packaging, inspection, indicators) 32, sterilization 36, sterile storage, inventory management and distribution 24, patient care equipment 12, ethics 16), test IDs 29901-29904, sets 29901-29905 (by outline area: Roles, Safety & Life Science 44, Decontamination & Disinfection 36, Preparation & Handling 32, Sterilization 36, Storage, Equipment & Ethics 52), state `CBSPD`, prefix `CBSPD-`, 70% readiness line (the real exam is 150 multiple choice, 125 scored and 25 pretest, 3 hours at PSI, four windows a year; passing scaled score 70, not a percent; valid 5 years with 100 points). 7/4/9/8/9/6/3/4 per test (the bulletin's 13/9/19/16/18/11/6/8 of 50, rounded by Tigertest; the 2020 test specification PDF prints domain counts that do not match its percentages, so they are not used). Facts from CDC's Guideline for Disinfection and Sterilization (2008, updated 2024) and CJD page, OSHA 1910.1030, 1910.1047 and 1910.1200, FDA 21 CFR 801.15 and reprocessing guidance, MedlinePlus word parts; no AAMI ST79 figures (paywalled), fees or exam-admin questions. A separate exam from HSPA's CRCST (`crcst`), kept clear of the crcst, hspacer and hspachl banks. Built by `tools/next100/cbspd/build.py`; sources in `tools/next100/cbspd/sources.md`. Region US, hub group "Healthcare certification exams" (after crcst), `[data-theme="cbspd"]` deep green (161 75% 18%), borrows the CRCST tiger, teacher-led (sterile processing programs).
