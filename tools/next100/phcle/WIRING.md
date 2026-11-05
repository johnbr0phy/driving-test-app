# Wiring for `phcle` (Philippines Licensure Examination for Criminologists, v1)

Files already written by the builder: `data/criminologist-licensure-questions.json` (200, PASS),
`lib/banks/phcle.ts`, `app/criminologist-licensure-exam/*` (layout, redirect, dashboard, drill,
stats; copied from `app/let-reviewer/`, no test or practice folders),
`app/criminology-board-exam-reviewer-practice-test/page.tsx`, `tools/next100/phcle/*` (spec,
sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/phcle/build.py`. Everything
below goes in shared files. `npx tsc` reports an error in `lib/banks/phcle.ts` until `"phcle"` is in
`ExamId`.

Format note: the real CLE is six subjects over three days (PRC programs for February 4 to 6 and
August 1 to 3, 2026): Criminal Law and Jurisprudence 20%, Law Enforcement Administration 15%,
Crime Detection and Investigation 20%, Forensic Science 15%, Criminology 20%, Correctional
Administration 10%; mornings 8:00 to 11:30 a.m., afternoons 1:30 to 4:00 p.m. The Board's TOS
(Resolution No. 05, s. 2022) has 100 items in each 20% subject. To pass (R.A. 11131 Sec. 17): a
weighted average of 75% with no subject below 60%; a subject below 60% with a 75% average is
deferred and retaken within two years (80% needed). Tigertest models four 50-question tests at the
board weights: 10 CLJ (6 criminal law + 4 evidence/procedure/human rights), 8 LEA, 10 CDI (5 + 5),
7 Forensic Science, 10 Criminology (6 + 4), 5 Correctional. The 15% subjects round to 8 and 7.
Pass line 75%; the 60% floor is not modelled (the landing says so). Pools exactly 4x per test.
Dashboard = 6 subject sets + 4 tests = 10 steps. No set exceeds 60.

## lib/exams.ts

Add `"phcle"` to the `ExamId` union. Icon `badge` already exists.

```ts
const phcle: ExamConfig = {
  id: "phcle",
  stateCode: "PHCLE",
  idBase: 19000,
  slug: "/criminologist-licensure-exam",
  landingPath: "/criminology-board-exam-reviewer-practice-test",
  name: "Criminology Board Exam Reviewer",
  shortName: "CLE",
  examLabel: "CLE",
  fullName: "Licensure Examination for Criminologists (CLE)",
  questionIdPrefix: "PHCLE-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // PRC programs of the February and August 2026 Licensure Examinations for Criminologists
  // (checked 2026-11-05): Criminal Law and Jurisprudence 20%, Law Enforcement Administration 15%,
  // Crime Detection and Investigation 20%, Forensic Science 15%, Criminology 20%, Correctional
  // Administration 10%. Topic splits inside CLJ, CDI and Criminology follow the Board's TOS
  // (Board Resolution No. 05, s. 2022). Each test: 10/8/10/7/10/5. Pass: weighted average 75%
  // with no subject below 60% (R.A. 11131 Sec. 17); only the 75% is scored here.
  // Pools are exactly 4x each count. All items original.
  blueprint: {
    phcleCrimLaw: 6,
    phcleProcedure: 4,
    phcleLea: 8,
    phcleInvestigation: 5,
    phcleTrafficFireDrugs: 5,
    phcleForensic: 7,
    phcleCriminology: 6,
    phcleEthicsJuvenile: 4,
    phcleCorrections: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 19001, name: "Criminal Law & Jurisprudence", categories: ["phcleCrimLaw", "phcleProcedure"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 2, id: 19002, name: "Law Enforcement Administration", categories: ["phcleLea"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 3, id: 19003, name: "Crime Detection & Investigation", categories: ["phcleInvestigation", "phcleTrafficFireDrugs"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 19004, name: "Forensic Science", categories: ["phcleForensic"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 5, id: 19005, name: "Criminology", categories: ["phcleCriminology", "phcleEthicsJuvenile"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 6, id: 19006, name: "Correctional Administration", categories: ["phcleCorrections"], size: 20, weightLabel: "5 of 50 test questions" },
  ],
  categoryLabels: {
    phcleCrimLaw: "Criminal Law (RPC & Special Laws)",
    phcleProcedure: "Evidence, Procedure & Human Rights",
    phcleLea: "Law Enforcement Administration",
    phcleInvestigation: "Criminal Investigation & Legal Medicine",
    phcleTrafficFireDrugs: "Traffic, Fire & Drug Investigation",
    phcleForensic: "Forensic Science",
    phcleCriminology: "Criminology Theories & Research",
    phcleEthicsJuvenile: "Ethics, Juvenile Justice & Dispute Resolution",
    phcleCorrections: "Correctional Administration",
  },
  copy: {
    guestPrompt: "to save your criminology board exam progress and track every question you miss",
    trainingHeading: "Train by board subject",
    trainingSub: "Six sets, one for each subject of the Licensure Examination for Criminologists. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions at the board subject weights",
    heroSubs: [
      "Six subjects, four mock exams. Criminal law, investigation and criminology weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You're ready for the board exam.",
    ],
    sourceLine: "Based on the PRC subject weights and the Board of Criminology table of specifications. Original questions; 50 per test, weighted like the real exam. Not affiliated with the PRC.",
    analyticsKey: "phcle",
  },
};
```

Append `phcle` to the `EXAMS` array (next to `phlet`).

Check: 19001-19006 (sets) and 19001-19004 (tests) must be free (BRIEF reserves idBase 19000).

## lib/banks/all.ts

```ts
import "./phcle";
```

## types/index.ts

- `QuestionType`: add `| "PHCLE"`.
- `QuestionCategory`, under a `// Philippines Criminologist Licensure Examination` comment:

```ts
  | "phcleCrimLaw"
  | "phcleProcedure"
  | "phcleLea"
  | "phcleInvestigation"
  | "phcleTrafficFireDrugs"
  | "phcleForensic"
  | "phcleCriminology"
  | "phcleEthicsJuvenile"
  | "phcleCorrections"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    phcleCrimLaw: "Criminal Law (RPC & Special Laws)",
    phcleProcedure: "Evidence, Procedure & Human Rights",
    phcleLea: "Law Enforcement Administration",
    phcleInvestigation: "Criminal Investigation & Legal Medicine",
    phcleTrafficFireDrugs: "Traffic, Fire & Drug Investigation",
    phcleForensic: "Forensic Science",
    phcleCriminology: "Criminology Theories & Research",
    phcleEthicsJuvenile: "Ethics, Juvenile Justice & Dispute Resolution",
    phcleCorrections: "Correctional Administration",
```

## app/globals.css

Hue from the BRIEF table (350 50% 22%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Philippines Criminologist Licensure Examination theme */
  [data-theme="phcle"] {
    --brand: 350 50% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 350 45% 95%;
    --brand-hover: 350 50% 17%;
    --brand-dark: 350 50% 18%;
    --brand-darker: 350 50% 12%;
    --brand-muted: 350 25% 70%;
    --brand-border: 350 30% 80%;
    --brand-border-light: 350 30% 89%;
    --brand-gradient-to: 15 45% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `phcle: "Criminology board exam reviewer for the Philippine Licensure Examination for Criminologists: Criminal Law and Jurisprudence, Law Enforcement Administration, Crime Detection and Investigation, Forensic Science, Criminology and Correctional Administration, at the PRC subject weights.",`
- `EXAM_ORG`: `phcle: "PRC · Professional Regulatory Board of Criminology",`
- Hub group (new, after "Philippines government and licensure exams", shared with phnapolcom and
  afpsat): `{ title: "Philippines police, military and criminology exams", ids: ["phnapolcom", "afpsat", "phcle"] }`
- `SEARCH_ALIASES`:
  `phcle: "cle cle reviewer criminology board exam criminology board exam reviewer criminologist licensure exam criminologist licensure examination lec licensure examination for criminologists criminology licensure exam prc criminology board exam criminology reviewer criminal law and jurisprudence reviewer cdi reviewer forensic science reviewer correctional administration reviewer law enforcement administration reviewer crim board exam",`
- `RELATED_OVERRIDES`: `phcle: ["phnapolcom", "afpsat", "phcse", "phlet"],`

## lib/region.ts

```ts
// TEST_REGIONS: on the PH entry (next to phlto, phcse, phlet)
  phcle: "PH",
// NON_DRIVING_TESTS: add
  "phcle",
```

## lib/examFacts.ts

```ts
  phcle: {
    answer:
      "The Licensure Examination for Criminologists (CLE) is given by the Professional Regulation Commission (PRC) through the Professional Regulatory Board of Criminology; passing it is required to register as a criminologist under R.A. 11131, the Philippine Criminology Profession Act of 2018. It covers six subjects over three days: Criminal Law and Jurisprudence 20%, Law Enforcement Administration 15%, Crime Detection and Investigation 20%, Forensic Science 15%, Criminology 20% and Correctional Administration 10%. To pass you need a weighted average of at least 75% with no grade below 60% in any subject; a subject below 60% with a 75% average is deferred and must be retaken within two years with at least 80%.",
    rows: [
      { label: "Run by", value: "PRC, Professional Regulatory Board of Criminology" },
      { label: "Subjects", value: "Six over three days, two a day" },
      { label: "Weights", value: "Criminal Law 20%, Law Enforcement 15%, Crime Detection 20%, Forensic Science 15%, Criminology 20%, Correctional Administration 10%" },
      { label: "Time", value: "Morning subjects 8:00 to 11:30 a.m., afternoon subjects 1:30 to 4:00 p.m." },
      { label: "Items", value: "100 in each 20% subject (Board table of specifications)" },
      { label: "Pass mark", value: "Weighted average 75%, no subject below 60%" },
      { label: "Sittings", value: "February and August in 2026; check PRC for later dates" },
      { label: "Not modelled here", value: "The 60% subject floor and the full exam length" },
    ],
    basedOn: "PRC programs of the February and August 2026 Licensure Examinations for Criminologists, Board of Criminology Resolution No. 05, s. 2022 (table of specifications) and R.A. 11131 Sec. 17, checked November 2026",
    source: { name: "Professional Regulation Commission", url: "https://www.prc.gov.ph/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"phcle"` to `TEACHER_LED` (criminology review centers and criminology programs), and in
`TEACHES`: `phcle: "a criminology board exam review class or a criminology program",`. The landing
already renders `<ExamClassFaq examId="phcle" />` and `classFaqJsonLd("phcle")`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Suggest borrowing the police tiger: `phcle: "police",` in
`BORROWED_SETS`.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/*

Nothing: `badge` exists; sitemaps map over `EXAMS`; class questions import `lib/banks/all`; no
redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing phcle:criminologist-licensure-exam:19001`

## CLAUDE.md (under Additional Exams, after the LET Reviewer bullet)

```md
- **Criminology Board Exam** (Philippines Licensure Examination for Criminologists, PRC, `/criminologist-licensure-exam/*`, landing `/criminology-board-exam-reviewer-practice-test`): `data/criminologist-licensure-questions.json` (200 original questions on the six board subjects at the PRC weights in the February and August 2026 programs: Criminal Law and Jurisprudence 20% as criminal law (RPC Books 1 and 2, special penal laws) 24 and evidence, procedure and human rights 16; Law Enforcement Administration 15% (R.A. 6975, 8551, 11200, comparative policing, industrial security, planning) 32; Crime Detection and Investigation 20% as investigation, legal medicine, report writing and cybercrime 20 and traffic, fire and arson, and drugs 20; Forensic Science 15% 28; Criminology 20% as theories, victimology and research 24 and ethics, juvenile justice (R.A. 9344 as amended) and dispute resolution 16; Correctional Administration 10% 20), test IDs 19001-19004, sets 19001-19006 (one per board subject), state `PHCLE`, prefix `PHCLE-`, 75% pass (the real rule, R.A. 11131 Sec. 17, also needs no subject below 60%, not modelled). 6/4/8/5/5/7/6/4/5 per test (10/8/10/7/10/5 by subject), no spares. The real exam runs three days, 100 items in each 20% subject (Board Resolution No. 05, s. 2022). Kept clear of `phnapolcom`, `police-exam` and `security-guard`. Built by `tools/next100/phcle/build.py`; sources in `tools/next100/phcle/sources.md`. Region PH, hub group "Philippines police, military and criminology exams", `[data-theme="phcle"]` deep maroon (350 50% 22%), borrows the police tiger, teacher-led (review centers).
```
