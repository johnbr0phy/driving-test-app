# Wiring for `gulfrn` (Gulf registered nurse licensing exam, v1)

Files already written by the builder: `data/gulf-nursing-questions.json` (200, PASS),
`lib/banks/gulfrn.ts`, `app/gulf-nursing-exam/*` (8 wrappers copied from ukfood),
`app/prometric-nursing-exam-practice-test/page.tsx`, `tools/global/gulfrn/*` (spec, sources,
`q_*.py`, `build.py`). Everything below goes in shared files.

Slug choice: landing `/prometric-nursing-exam-practice-test` (people search "prometric exam for
nurses"; the brand is used only descriptively, and the landing says twice that Tigertest is not
affiliated with Prometric or any authority). App routes `/gulf-nursing-exam/*` are noindex.

## lib/exams.ts

Add `"gulfrn"` to the `ExamId` union. Icon `stethoscope` already exists.

```ts
const gulfrn: ExamConfig = {
  id: "gulfrn",
  stateCode: "GULFRN",
  idBase: 10500,
  slug: "/gulf-nursing-exam",
  landingPath: "/prometric-nursing-exam-practice-test",
  name: "Gulf Nursing Licensing Exam Practice Test",
  shortName: "Gulf RN",
  examLabel: "Gulf nursing exam",
  fullName: "Registered Nurse Licensing Exam (DHA, DOH, MOHAP, SCFHS, DHP, Oman, Kuwait, Bahrain)",
  questionIdPrefix: "GULFRN-",
  icon: "stethoscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  // Gulf registered nurse licensing exams (checked October 2026). Each authority sets its own
  // exam. Qatar DHP's Qualifying Examination Blueprint: 150 MCQs, pass 50%, Nursing Fundamentals 30,
  // Adult Nursing 61, Maternal-Child 44, Unit Management and Leadership 15. SCFHS SNLE Applicant
  // Guide (2024): 200 MCQs in two 120-minute parts, same four sections (adult nursing includes
  // critical care, community and mental health; fundamentals includes pharmacology and nutrition),
  // pass 500 on 200-800. Counts follow that 20/40/30/10 split, with adult nursing split by system.
  // DHA, DOH, MOHAP, Oman, Kuwait and Bahrain figures were not verifiable from official pages.
  // 60% is a readiness line a little above the 50% marks DHP publishes. All items original.
  blueprint: {
    gulfrnFund: 7,
    gulfrnPharm: 4,
    gulfrnCardioResp: 7,
    gulfrnMedSurg: 8,
    gulfrnMental: 3,
    gulfrnCommunity: 2,
    gulfrnMaternal: 7,
    gulfrnPeds: 7,
    gulfrnLead: 5,
  },
  trainingSets: testSets(10500, 4),
  categoryLabels: {
    gulfrnFund: "Nursing Fundamentals",
    gulfrnPharm: "Pharmacology & Dosage",
    gulfrnCardioResp: "Cardiovascular & Respiratory",
    gulfrnMedSurg: "Medical-Surgical Nursing",
    gulfrnMental: "Mental Health Nursing",
    gulfrnCommunity: "Community Health Nursing",
    gulfrnMaternal: "Maternal & Newborn Nursing",
    gulfrnPeds: "Pediatric Nursing",
    gulfrnLead: "Leadership, Ethics & Infection Control",
  },
  copy: {
    guestPrompt: "to save your nursing exam progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all nine topics. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 60% to pass",
    heroSubs: [
      "Nine topics, four mock tests. Adult nursing is the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your licensing exam.",
    ],
    sourceLine: "Based on the registered nurse blueprints published by Qatar's DHP and Saudi Arabia's SCFHS. Original questions; each authority sets its own length and pass mark.",
    analyticsKey: "gulfrn",
  },
};
```

Append `gulfrn` to the `EXAMS` array (with the global / international exams).
Dashboard: 4 training sets + 4 tests = 8 steps.

## lib/banks/all.ts

```ts
import "./gulfrn";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/gulfrn.ts`.

## types/index.ts

- `QuestionType`: add `| "GULFRN"`.
- `QuestionCategory`, under `// Gulf registered nurse licensing exam`:

```ts
  | "gulfrnFund"
  | "gulfrnPharm"
  | "gulfrnCardioResp"
  | "gulfrnMedSurg"
  | "gulfrnMental"
  | "gulfrnCommunity"
  | "gulfrnMaternal"
  | "gulfrnPeds"
  | "gulfrnLead"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    gulfrnFund: "Nursing Fundamentals",
    gulfrnPharm: "Pharmacology & Dosage",
    gulfrnCardioResp: "Cardiovascular & Respiratory",
    gulfrnMedSurg: "Medical-Surgical Nursing",
    gulfrnMental: "Mental Health Nursing",
    gulfrnCommunity: "Community Health Nursing",
    gulfrnMaternal: "Maternal & Newborn Nursing",
    gulfrnPeds: "Pediatric Nursing",
    gulfrnLead: "Leadership, Ethics & Infection Control",
```

## app/globals.css

Suggested hue 146 (emerald, unused as of this build; integrator re-picks to avoid clashes), then
run `tools/gen_dark_brand_css.py`.

```css
  /* Gulf nursing licensing exam theme */
  [data-theme="gulfrn"] {
    --brand: 146 55% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 146 50% 95%;
    --brand-hover: 146 55% 25%;
    --brand-dark: 146 55% 21%;
    --brand-darker: 146 50% 14%;
    --brand-muted: 146 30% 70%;
    --brand-border: 146 30% 78%;
    --brand-border-light: 146 28% 88%;
    --brand-gradient-to: 165 50% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `gulfrn: "Practice for the Gulf registered nurse licensing exams (DHA, DOH, MOHAP, SCFHS, Qatar, Oman, Kuwait, Bahrain): fundamentals, med-surg, maternity, pediatrics, dosage and leadership.",`
- `EXAM_ORG`: `gulfrn: "Gulf health authorities · RN licensing exam",`
- Hub group: proposed new group "International nurse licensing exams" holding `gulfrn` with the UK
  NMC CBT (`uknmc`, if it lands in this batch); otherwise append `gulfrn` to
  "Healthcare certification exams" (after `nclexpn`).
- `SEARCH_ALIASES`:
  `gulfrn: "prometric exam for nurses prometric nursing exam dha exam nurses dubai health authority doh haad abu dhabi mohap moh uae scfhs saudi snle saudi prometric qchp dhp qatar omsb oman kuwait moh nhra bahrain gulf gcc middle east registered nurse licensing exam rn license",`
- `RELATED_OVERRIDES` if the group has fewer than three others: `gulfrn: ["nclex", "uknmc", "nclexpn"]`
  (drop `uknmc` if it does not exist).

## lib/region.ts

`gulfrn: "GLOBAL",` in `TEST_REGIONS` (taken by nurses from India, the Philippines, Egypt, Jordan,
Pakistan, Kenya and the Gulf itself). Not in `NON_DRIVING_TESTS` (GLOBAL tests are not listed there,
like `aws`).

## lib/examFacts.ts

```ts
  gulfrn: {
    answer:
      "The Gulf registered nurse licensing exam, often called the Prometric exam for nurses, is a computer-based multiple-choice test that each Gulf health authority sets for nurses who want to practise there: DHA in Dubai, DOH in Abu Dhabi, MOHAP elsewhere in the UAE, SCFHS in Saudi Arabia, the DHP in Qatar, and the authorities in Oman, Kuwait and Bahrain. Each sets its own number of questions, time and pass mark. Qatar's DHP lists 150 questions with a 50 percent pass mark, and Saudi Arabia's SNLE has 200 questions in two 120-minute parts with a scaled pass score of 500. The published blueprints weight adult nursing most, about 40 percent.",
    rows: [
      { label: "Format", value: "Computer-based, multiple choice, one best answer" },
      { label: "Qatar (DHP)", value: "150 questions, 50% to pass" },
      { label: "Saudi Arabia (SNLE)", value: "200 questions, 2 x 120 min, 500 on 200-800" },
      { label: "Other authorities", value: "Check your authority's current guide" },
      { label: "Content", value: "Fundamentals, adult, maternal-child, leadership" },
      { label: "Biggest area", value: "Adult nursing, about 40%" },
      { label: "Set by", value: "Each Gulf health authority" },
    ],
    basedOn: "Qatar DHP's qualifying examination page and blueprint and the SCFHS SNLE Applicant Guide (2024), checked October 2026",
    source: { name: "Qatar DHP: Qualifying Examination", url: "https://dhp.moph.gov.qa/en/Pages/QualifyingExamination.aspx" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"gulfrn"` to `TEACHER_LED` (agencies and nursing schools run Gulf exam review classes) and in
`TEACHES`: `gulfrn: "a Gulf nursing exam review course",`. The landing already renders
`<ExamClassFaq examId="gulfrn" />` and `classFaqJsonLd("gulfrn")`.

## lib/tigerAssets.ts (optional)

Falls back to the DMV tiger. If a nursing tiger set is preferred, map `gulfrn` to whatever `nclex`
or `nclexpn` uses.

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: `stethoscope` exists, sitemaps map over `EXAMS`, no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing gulfrn:gulf-nursing-exam:10501`

## CLAUDE.md (under Additional Exams)

```md
- **Gulf RN** (registered nurse licensing exams of DHA, DOH, MOHAP, SCFHS, Qatar DHP, Oman, Kuwait and Bahrain, `/gulf-nursing-exam/*`, landing `/prometric-nursing-exam-practice-test`): `data/gulf-nursing-questions.json` (200 questions: fundamentals 28, pharmacology/dosage 16, cardiovascular/respiratory 28, other med-surg 32, mental health 12, community 8, maternal/newborn 28, pediatrics 28, leadership/ethics/infection control 20), test IDs 10501-10504, sets 10501-10504 (one per test), state `GULFRN`, 60% readiness line (DHP publishes 50%). 7/4/7/8/3/2/7/7/5 per test, the DHP/SCFHS 20/40/30/10 split. Each authority sets its own length and pass mark; the landing tabulates only what DHP and the SCFHS SNLE guide publish and says "check your authority's guide" for the rest. Not affiliated with Prometric. GLOBAL region. Built by `tools/global/gulfrn/build.py`; sources in `tools/global/gulfrn/sources.md`.
```
