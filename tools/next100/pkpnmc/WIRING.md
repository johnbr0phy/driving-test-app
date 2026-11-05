# Wiring for `pkpnmc` (PNMC nursing licensing exam, registered nurse, v1, region PK)

Files already written by the builder: `data/pnmc-licensing-questions.json` (200, PASS,
key-longest 3%, key>1.2x 6%), `lib/banks/pkpnmc.ts`, `app/pnmc-licensing-exam/*` (layout, redirect,
dashboard, drill, stats, copied from `app/kenya-nursing-council/`; no test or practice folders, the
shared `app/[slug]` routes serve them), `app/pnmc-licensing-exam-practice-test/page.tsx`,
`tools/next100/pkpnmc/*` (spec, sources, `q_*.py`, `build.py`, this file). Everything below goes in
shared files.

Format note (checked 2026-11-05, see `sources.md`): the Pakistan Nursing and Midwifery Council
(Amendment) Act, 2023 (Act V of 2023) renamed the Pakistan Nursing Council and lists among the
Council's functions "to carry out licensure examinations for grant of licence to practice". PNMC's
site has a "Licensing Exams" page (it shows only the Family Welfare Workers licensing exam 2022
results) and its online portal has a "Nursing Council Licensing Examination" menu item with no page
behind it. PNMC publishes no question count, time, delivery mode, pass mark or blueprint for a
registered nurse licensing exam. Here: four 50-question mixed mock tests (Tigertest's blueprint over
the BSN and diploma subjects), DMV-style sets (Set N = Test N), 8 dashboard steps, 60% as
Tigertest's readiness target (like `kenck` and `gulfrn`). The web search budget ran out after one
query, so no news report or guide on the exam's format was checked: the integrator may want to
check for a 2026 PNMC licensing exam announcement before launch and update examFacts and the FAQ.

## lib/exams.ts

Add `"pkpnmc"` to the `ExamId` union. Icon `stethoscope` already exists.

```ts
const pkpnmc: ExamConfig = {
  id: "pkpnmc",
  stateCode: "PKPNMC",
  idBase: 20300,
  slug: "/pnmc-licensing-exam",
  landingPath: "/pnmc-licensing-exam-practice-test",
  name: "PNMC Licensing Exam Practice Test",
  shortName: "PNMC Exam",
  examLabel: "PNMC licensing exam",
  fullName: "Pakistan Nursing and Midwifery Council Licensing Examination (registered nurse)",
  questionIdPrefix: "PKPNMC-",
  icon: "stethoscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  // PNMC licensing exam (checked November 2026): the PNMC (Amendment) Act, 2023 gives the Council
  // the function of holding licensure examinations, but PNMC publishes no question count, time,
  // pass mark or blueprint for a registered nurse licensing exam. This split over the BSN and
  // diploma subjects is Tigertest's, and 60% is a readiness target. Pakistani practice (EPI
  // schedule, DRAP, Lady Health Workers) and law (PNMC Act). All items original.
  blueprint: {
    pkpnmcFund: 7,
    pkpnmcPharm: 4,
    pkpnmcAdult: 9,
    pkpnmcCritical: 4,
    pkpnmcMaternal: 6,
    pkpnmcPaeds: 6,
    pkpnmcCommunity: 6,
    pkpnmcMental: 4,
    pkpnmcLaw: 4,
  },
  trainingSets: testSets(20300, 4),
  categoryLabels: {
    pkpnmcFund: "Fundamentals of Nursing",
    pkpnmcPharm: "Pharmacology & Dosage",
    pkpnmcAdult: "Adult Health Nursing",
    pkpnmcCritical: "Critical Care & Emergency",
    pkpnmcMaternal: "Maternal & Newborn Health",
    pkpnmcPaeds: "Paediatric Nursing & EPI",
    pkpnmcCommunity: "Community Health Nursing",
    pkpnmcMental: "Mental Health Nursing",
    pkpnmcLaw: "Law, Ethics & Leadership",
  },
  copy: {
    guestPrompt: "to save your PNMC exam progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all nine topics. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 60% readiness line",
    heroSubs: [
      "Nine topics, four mock tests. Adult health and fundamentals are the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your PNMC licensing exam.",
    ],
    sourceLine: "Based on WHO guidance, Pakistan's EPI schedule and Pakistani nursing law. Original questions; PNMC publishes no question count or pass mark, so 60% is a readiness target. Not affiliated with the Pakistan Nursing and Midwifery Council.",
    analyticsKey: "pkpnmc",
  },
};
```

Append `pkpnmc` to the `EXAMS` array after `pknle` (or after `pkdrive`). Dashboard: 4 sets + 4
tests = 8 steps. Check: 20301-20304 (tests and sets) must be free (the batch assigns 20300).

## lib/banks/all.ts

```ts
import "./pkpnmc";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/pkpnmc.ts`.

## types/index.ts

- `QuestionType`: add `| "PKPNMC"`.
- `QuestionCategory`, under a `// PNMC nursing licensing exam` comment:

```ts
  | "pkpnmcFund"
  | "pkpnmcPharm"
  | "pkpnmcAdult"
  | "pkpnmcCritical"
  | "pkpnmcMaternal"
  | "pkpnmcPaeds"
  | "pkpnmcCommunity"
  | "pkpnmcMental"
  | "pkpnmcLaw"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    pkpnmcFund: "Fundamentals of Nursing",
    pkpnmcPharm: "Pharmacology & Dosage",
    pkpnmcAdult: "Adult Health Nursing",
    pkpnmcCritical: "Critical Care & Emergency",
    pkpnmcMaternal: "Maternal & Newborn Health",
    pkpnmcPaeds: "Paediatric Nursing & EPI",
    pkpnmcCommunity: "Community Health Nursing",
    pkpnmcMental: "Mental Health Nursing",
    pkpnmcLaw: "Law, Ethics & Leadership",
```

## app/globals.css

Hue from the international batch 3 table (320 70% 22%, already checked). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* PNMC nursing licensing exam theme */
  [data-theme="pkpnmc"] {
    --brand: 320 70% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 320 45% 95%;
    --brand-hover: 320 70% 18%;
    --brand-dark: 320 70% 16%;
    --brand-darker: 320 65% 11%;
    --brand-muted: 320 25% 68%;
    --brand-border: 320 25% 78%;
    --brand-border-light: 320 22% 88%;
    --brand-gradient-to: 335 45% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `pkpnmc: "Practice for the Pakistan Nursing and Midwifery Council licensing exam: fundamentals, adult health with hepatitis, dengue and typhoid, critical care, midwifery and newborn care, paediatrics and the EPI schedule, community health and Lady Health Workers, mental health and nursing law, with drug calculations.",`
- `EXAM_ORG`: `pkpnmc: "Pakistan Nursing and Midwifery Council · registered nurse licensing exam",`
- Hub group: `{ title: "Pakistan medical and nursing licensing exams", ids: ["pknle", "pkpnmc"] }`
  (shared with `pknle`; its WIRING.md has the same line), placed after "Pakistan government and
  police recruitment tests", itself after `{ title: "Pakistan driving tests", ids: ["pkdrive"] }`.
- `SEARCH_ALIASES`:
  `pkpnmc: "pnmc exam pnmc licensing exam pnmc licensing examination pakistan nursing council exam pnc exam pakistan nursing and midwifery council nursing licensing exam pakistan bsn licensing exam generic bsn post rn bsn staff nurse test charge nurse test nursing mcqs pakistan registered nurse pakistan licence nursing council licensing examination",`
- `RELATED_OVERRIDES` (a two-exam group needs padding): `pkpnmc: ["pknle", "kenck", "gulfrn"],`

## lib/region.ts

- `TEST_REGIONS`: `pkpnmc: "PK",` (next to `pkdrive: "PK"`), and add `"pkpnmc"` to `NON_DRIVING_TESTS`.
- `REGION_HOME.PK`: the batch adds several non-driving tests to Pakistan, so the integrator rewrites
  the PK block once for all of them. A phrase this exam can add to `lead`: "...and the PNMC nursing
  licensing exam."
- `faqsFor` and `lib/regionHeadline.ts` build from hub groups, so the new group appears without a change.

## lib/examFacts.ts

```ts
  pkpnmc: {
    answer:
      "The Pakistan Nursing and Midwifery Council (PNMC), formerly the Pakistan Nursing Council, registers and licenses nurses, midwives and Lady Health Visitors in Pakistan. The Pakistan Nursing and Midwifery Council (Amendment) Act, 2023 lists among its functions carrying out licensure examinations for the grant of a licence to practise. As of November 2026, PNMC does not publish a question count, time limit or pass mark for a registered nurse licensing exam on its website, and Generic BSN graduates must complete a one-year internship before registration.",
    rows: [
      { label: "Run by", value: "Pakistan Nursing and Midwifery Council" },
      { label: "Law", value: "PNC Act 1973, amended by the PNMC (Amendment) Act 2023" },
      { label: "Questions", value: "Not published by PNMC" },
      { label: "Pass mark", value: "Not published by PNMC" },
      { label: "BSN registration", value: "One-year internship required for Generic BSN graduates" },
      { label: "Programme exams", value: "Provincial Nursing Examination Boards (Punjab, KP, Sindh, Balochistan)" },
    ],
    basedOn: "PNMC website (Licensing Exams, PNMC Act, registration and examination boards pages) and the PNMC (Amendment) Act 2023, checked November 2026",
    source: { name: "Pakistan Nursing and Midwifery Council", url: "https://pnmc.gov.pk/" },
  },
```
(Fees, attempt limits and dates are left out: none are published.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"pkpnmc"` to `TEACHER_LED` (nursing schools and colleges, as the batch brief says) and in
`TEACHES`: `pkpnmc: "a nursing college class",`. The landing already renders
`<ExamClassFaq examId="pkpnmc" />` and `classFaqJsonLd("pkpnmc")`.

## lib/tigerAssets.ts

Borrow the nursing tiger through `BORROWED_SETS`: `pkpnmc: "nclex",` (as `kenck`, `gulfrn`, `uknmc`
and `pknle` do).

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/classQuestions.ts

Nothing: `stethoscope` exists, sitemaps map over `EXAMS`, no redirects, v1 banks load through
`lib/banks/all.ts`.

## scripts/build-training-parts.ts and scripts/build-landing-dates.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (sets are 50 each, so no parts), then
`npx tsx scripts/build-landing-dates.ts` once committed.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing pkpnmc:pnmc-licensing-exam:20301`

## CLAUDE.md (under Additional Exams, after the PMDC NRE bullet)

```md
- **PNMC Exam** (`pkpnmc`, Pakistan Nursing and Midwifery Council licensing exam, registered nurse, `/pnmc-licensing-exam/*`, landing `/pnmc-licensing-exam-practice-test`): `data/pnmc-licensing-questions.json` (200 original questions: fundamentals 28, pharmacology and dosage 16, adult health (hepatitis B and C, dengue, typhoid, diabetes and Ramadan, heatstroke) 36, critical care and emergency 16, maternal and newborn 24, paediatrics and EPI 24, community health (Lady Health Workers, cold chain, naswar, leishmaniasis) 24, mental health 16, law, ethics and leadership (PNMC Act as amended 2023, DRAP, ICN Code) 16), test IDs 20301-20304, sets 20301-20304 (`testSets`, one per test), state `PKPNMC`, prefix `PKPNMC-`, 60% readiness line (the PNMC (Amendment) Act 2023 gives the Council licensure examinations, but PNMC publishes no question count, time or pass mark as of November 2026). 7/4/9/4/6/6/6/4/4 per test, Tigertest's split over the BSN and diploma subjects. Pakistan EPI schedule (IPV-1 at 14 weeks, MR at 9 and 15 months), WHO guidance, British spelling. Kept clear of `kenck`, `pknle`, `phnle`, `phmidwife`, `gulfrn` and the v2 nursing banks (about 80 overlapping items rewritten). Built by `tools/next100/pkpnmc/build.py`; sources in `tools/next100/pkpnmc/sources.md`. Region PK, hub group "Pakistan medical and nursing licensing exams", `[data-theme="pkpnmc"]` deep magenta (320 70% 22%), borrows the NCLEX tiger, teacher-led (nursing colleges).
```
