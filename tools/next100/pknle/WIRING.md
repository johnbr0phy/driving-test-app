# Wiring for `pknle` (PMDC National Registration Examination, formerly NLE, Step 1 theory, v1, region PK)

Files already written by the builder: `data/pmdc-nle-questions.json` (200, PASS, key-longest 19%,
key>1.2x 16%), `lib/banks/pknle.ts`, `app/pmdc-nle/*` (layout, redirect, dashboard, drill, stats,
copied from `app/kenya-nursing-council/`; no test or practice folders, the shared `app/[slug]`
routes serve them), `app/pmdc-nle-practice-test/page.tsx`, `tools/next100/pknle/*` (spec, sources,
`q_*.py`, `build.py`, this file). Everything below goes in shared files.

Name note: the brief calls it the "PMDC National Licensing Examination (NLE)". Under the Pakistan
Medical and Dental Council Act, 2022 (section 18) the exam is now the National Registration
Examination (NRE); "NLE" was the Pakistan Medical Commission's name (2021-2022) and survives in
searches and in PMDC's results URL (`/result/NLEStepOne`). Copy says "PMDC NRE (formerly NLE)";
the id, slug and landing keep `nle` as the brief assigned.

Format note (PM&DC NRE Standards, Structure and Syllabus 2024, notified 30 April 2024; PMDC press
releases of June 2025, December 2025 and 15 January 2026): for Pakistani graduates of foreign
medical colleges; Step 1 theory is 200 MCQs, 30% applied basic sciences (60) and 70% clinical
sciences (140); 60% to pass with no negative marking (Angoff standardisation also mentioned);
conducted by NUMS at least twice a year; the June 2025 theory paper lasted 3 h 30 min; Step 2 is a
20-station OSCE (CSE), not modelled. Next Step 1: Sunday 8 November 2026 (PMDC notice of
5 October 2026). Here: four 50-question mock tests (a quarter of the paper, same 30/70 split),
DMV-style sets (Set N = Test N), 8 dashboard steps, 60% pass line (the real one). The official
basic sciences rows add up to 56, not the 60 printed; the landing says so.

## lib/exams.ts

Add `"pknle"` to the `ExamId` union. Icon `stethoscope` already exists.

```ts
const pknle: ExamConfig = {
  id: "pknle",
  stateCode: "PKNLE",
  idBase: 20200,
  slug: "/pmdc-nle",
  landingPath: "/pmdc-nle-practice-test",
  name: "PMDC NRE (NLE) Practice Test",
  shortName: "PMDC NRE",
  examLabel: "PMDC NRE Step 1",
  fullName: "PMDC National Registration Examination (formerly NLE), Step 1 theory",
  questionIdPrefix: "PKNLE-",
  icon: "stethoscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  // PM&DC NRE (Medical) Standards, Structure and Syllabus 2024 (notified 30 April 2024; checked
  // November 2026): Step 1 is 200 MCQs, 60 applied basic sciences (pathology 11, anatomy 11,
  // physiology 10, clinical pharmacology 8, biochemistry 6, community medicine 6, forensic medicine
  // 4, as printed) and 140 clinical (medicine 52, surgery 48, O&G 14, paediatrics 14, eye 6, ENT 6),
  // 60% to pass, no negative marking. Each 50-question mock is a quarter of the paper with the same
  // 30/70 split; the grouping of disciplines is Tigertest's. All items original.
  blueprint: {
    pknleAnatPhys: 5,
    pknlePathBio: 5,
    pknlePharm: 2,
    pknleCommForensic: 3,
    pknleMedicine: 13,
    pknleSurgery: 11,
    pknleObGyn: 4,
    pknlePaeds: 4,
    pknleEyeEnt: 3,
  },
  trainingSets: testSets(20200, 4),
  categoryLabels: {
    pknleAnatPhys: "Applied Anatomy & Physiology",
    pknlePathBio: "Pathology & Biochemistry",
    pknlePharm: "Clinical Pharmacology",
    pknleCommForensic: "Community & Forensic Medicine",
    pknleMedicine: "Medicine & Allied",
    pknleSurgery: "Surgery & Allied",
    pknleObGyn: "Obstetrics & Gynaecology",
    pknlePaeds: "Paediatrics",
    pknleEyeEnt: "Eye & ENT",
  },
  copy: {
    guestPrompt: "to save your PMDC NRE progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across basic and clinical sciences. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 60% to pass",
    heroSubs: [
      "Basic and clinical sciences, four mock tests. Medicine and surgery are half the paper.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for NRE Step 1.",
    ],
    sourceLine: "Based on the PM&DC NRE Standards, Structure and Syllabus 2024: 30% basic and 70% clinical sciences, 60% to pass. Original questions. Not affiliated with the Pakistan Medical and Dental Council or NUMS.",
    analyticsKey: "pknle",
  },
};
```

Append `pknle` to the `EXAMS` array after `pkdrive` (or after the other Pakistan batch-3 exams).
Dashboard: 4 sets + 4 tests = 8 steps. Check: 20201-20204 (tests and sets) must be free (the batch
assigns 20200).

## lib/banks/all.ts

```ts
import "./pknle";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/pknle.ts`.

## types/index.ts

- `QuestionType`: add `| "PKNLE"`.
- `QuestionCategory`, under a `// PMDC National Registration Examination (NRE, formerly NLE)` comment:

```ts
  | "pknleAnatPhys"
  | "pknlePathBio"
  | "pknlePharm"
  | "pknleCommForensic"
  | "pknleMedicine"
  | "pknleSurgery"
  | "pknleObGyn"
  | "pknlePaeds"
  | "pknleEyeEnt"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    pknleAnatPhys: "Applied Anatomy & Physiology",
    pknlePathBio: "Pathology & Biochemistry",
    pknlePharm: "Clinical Pharmacology",
    pknleCommForensic: "Community & Forensic Medicine",
    pknleMedicine: "Medicine & Allied",
    pknleSurgery: "Surgery & Allied",
    pknleObGyn: "Obstetrics & Gynaecology",
    pknlePaeds: "Paediatrics",
    pknleEyeEnt: "Eye & ENT",
```

## app/globals.css

Hue from the international batch 3 table (175 55% 22%, already checked). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* PMDC National Registration Examination (NRE, formerly NLE) theme */
  [data-theme="pknle"] {
    --brand: 175 55% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 175 45% 95%;
    --brand-hover: 175 55% 18%;
    --brand-dark: 175 55% 16%;
    --brand-darker: 175 50% 11%;
    --brand-muted: 175 25% 68%;
    --brand-border: 175 25% 78%;
    --brand-border-light: 175 22% 88%;
    --brand-gradient-to: 190 45% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `pknle: "Practice for PMDC NRE Step 1 (formerly the NLE) for foreign medical graduates: applied anatomy, physiology, pathology and pharmacology, then medicine, surgery, obstetrics, paediatrics, eye and ENT, with hepatitis, typhoid, dengue, malaria and the EPI schedule as practised in Pakistan.",`
- `EXAM_ORG`: `pknle: "PM&DC · National Registration Examination Step 1, conducted by NUMS",`
- Hub group: new group `{ title: "Pakistan medical and nursing licensing exams", ids: ["pknle", "pkpnmc"] }`,
  placed after "Pakistan government and police recruitment tests" (itself after
  `{ title: "Pakistan driving tests", ids: ["pkdrive"] }`), as the batch brief names it.
- `SEARCH_ALIASES`:
  `pknle: "pmdc nre pmdc nle nre step 1 nle step 1 national registration examination national licensing examination pakistan pmc nle nums nre foreign medical graduates pakistan fmg exam pakistan mbbs abroad licence pakistan pmdc exam for foreign graduates pmdc registration exam house job pakistan foreign graduate",`
- `RELATED_OVERRIDES` (a small group needs padding): `pknle: ["pkpnmc", "neet", "nclex"],`
  (drop `pkpnmc` if it is not wired in the same batch).

## lib/region.ts

- `TEST_REGIONS`: `pknle: "PK",` (next to `pkdrive: "PK"`), and add `"pknle"` to `NON_DRIVING_TESTS`.
- `REGION_HOME.PK`: the batch adds several non-driving tests to Pakistan, so the integrator should
  rewrite the PK block once for all of them (keep the CTA on the driving test or the biggest
  recruitment test). A line this exam can contribute to `lead`: "...and Step 1 of the PMDC National
  Registration Examination for foreign medical graduates."
- `faqsFor` and `lib/regionHeadline.ts` build from hub groups, so the new group appears without a change.

## lib/examFacts.ts

```ts
  pknle: {
    answer:
      "The National Registration Examination (NRE), formerly called the National Licensing Examination (NLE), is the exam a Pakistani graduate of a foreign medical college must pass before the Pakistan Medical and Dental Council grants full registration, under section 18 of the PMDC Act 2022. It has two steps. Step 1 is a theory paper of 200 multiple-choice questions, 30 percent applied basic sciences and 70 percent clinical sciences, and Step 2 is a 20-station clinical skills OSCE. Each needs 60 percent, with no negative marking. NUMS, Rawalpindi conducts it for the PM&DC at least twice a year.",
    rows: [
      { label: "Run by", value: "PM&DC, conducted by NUMS Rawalpindi" },
      { label: "For", value: "Pakistani graduates of foreign medical colleges" },
      { label: "Step 1", value: "200 MCQs: 60 basic sciences, 140 clinical" },
      { label: "Step 1 length", value: "3 hours 30 minutes (June 2025 sitting)" },
      { label: "Pass mark", value: "60% in each step, no negative marking" },
      { label: "Step 2", value: "Clinical Skills Examination, 20 OSCE stations" },
      { label: "Next Step 1", value: "8 November 2026 (PMDC notice of 5 October 2026)" },
    ],
    basedOn: "PM&DC NRE (Medical) Standards, Structure and Syllabus 2024 and PMDC press releases and notices, checked November 2026",
    source: { name: "Pakistan Medical and Dental Council", url: "https://pmdc.pk/" },
  },
```
(Fees, the dental NRE and eligibility details are left out. Update "Next Step 1" after 8 November 2026.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"pknle"` to `TEACHER_LED` (the batch brief: medical colleges and NRE preparation classes) and
in `TEACHES`: `pknle: "an NRE preparation class",`. The landing already renders
`<ExamClassFaq examId="pknle" />` and `classFaqJsonLd("pknle")`.

## lib/tigerAssets.ts

Borrow the clinical tiger through `BORROWED_SETS`: `pknle: "nclex",` (as `kenck`, `gulfrn` and `uknmc` do).

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/classQuestions.ts

Nothing: `stethoscope` exists, sitemaps map over `EXAMS`, no redirects, v1 banks load through
`lib/banks/all.ts`.

## scripts/build-training-parts.ts and scripts/build-landing-dates.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (sets are 50 each, so no parts), then
`npx tsx scripts/build-landing-dates.ts` once committed.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing pknle:pmdc-nle:20201`

## CLAUDE.md (under Additional Exams, after the Pakistan Driving Test bullet)

```md
- **PMDC NRE** (`pknle`, PM&DC National Registration Examination, formerly the PMC's National Licensing Examination (NLE), Step 1 theory, for Pakistani graduates of foreign medical colleges, `/pmdc-nle/*`, landing `/pmdc-nle-practice-test`): `data/pmdc-nle-questions.json` (200 original questions on the PM&DC NRE (Medical) Standards, Structure and Syllabus 2024: applied anatomy and physiology 20, pathology and biochemistry 20, clinical pharmacology 8, community and forensic medicine 12, medicine and allied 52, surgery and allied 44, obstetrics and gynaecology 16, paediatrics 16, eye and ENT 12), test IDs 20201-20204, sets 20201-20204 (`testSets`, one per test), state `PKNLE`, prefix `PKNLE-`, 60% pass like the real Step 1 (200 MCQs, 30% basic and 70% clinical sciences, no negative marking, conducted by NUMS at least twice a year; the June 2025 paper ran 3 h 30 min; the official basic sciences rows add up to 56 of the 60 printed). 5/5/2/3/13/11/4/4/3 per test, a quarter of the paper with the same 30/70 split. Step 2 (a 20-station OSCE) is not modelled. Pakistani practice: the EPI schedule (birth BCG, OPV-0, hepatitis B; TCV and MR-1 at 9 months), sofosbuvir and daclatasvir for hepatitis C, XDR typhoid, dengue, vivax malaria, CCHF, rabies, snakebite, organophosphate and aluminium phosphide poisoning, PPC s. 337 shajjah; British spelling. Kept clear of `kenck`, `phnle`, `gulfrn`, `nclex`, `uknmc` and `neet`. Built by `tools/next100/pknle/build.py`; sources in `tools/next100/pknle/sources.md`. Region PK, hub group "Pakistan medical and nursing licensing exams", `[data-theme="pknle"]` deep teal (175 55% 22%), borrows the NCLEX tiger, teacher-led (NRE preparation classes).
```
