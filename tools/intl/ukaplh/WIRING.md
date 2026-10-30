# ukaplh wiring (Award for Personal Licence Holders, England and Wales)

v1 exam. Already written by the builder: `data/uk-personal-licence-questions.json` (built by
`python3 -I tools/intl/ukaplh/build.py`), `lib/banks/ukaplh.ts`, `app/personal-licence/*` (8 wrappers),
`app/personal-licence-practice-test/page.tsx`, `tools/intl/ukaplh/{spec.json,sources.md,build.py,report.py,src/*.py}`.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/uk-personal-licence-questions.json --pool ukaplhAuth=24 --pool ukaplhPersonal=28 --pool ukaplhPremises=32 --pool ukaplhDps=16 --pool ukaplhActivities=28 --pool ukaplhPowers=24 --pool ukaplhChildren=28 --pool ukaplhAlcohol=20` prints PASS (letters 50/50/50/50, key-longest 18%, key>1.2x 8%).

## lib/exams.ts
Add `| "ukaplh"` to the `ExamId` union. Icon `wine` already exists (no union change).
Add before `const htl`:

```ts
const ukaplh: ExamConfig = {
  id: "ukaplh",
  stateCode: "UKAPLH",
  idBase: 8400,
  slug: "/personal-licence",
  landingPath: "/personal-licence-practice-test",
  name: "Personal Licence Practice Test",
  shortName: "Personal Licence",
  examLabel: "Personal licence exam (APLH)",
  fullName: "Level 2 Award for Personal Licence Holders (England and Wales)",
  questionIdPrefix: "UKAPLH-",
  icon: "wine",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Level 2 Award for Personal Licence Holders (RQF), England and Wales: one unit, "Legal and
  // social responsibilities of a personal licence holder"; 40 multiple-choice questions, 28 to
  // pass (70%), 40 to 60 minutes by awarding body (TQUK spec; Highfield and BIIAB outlines,
  // checked Oct 2026). No per-topic weights are published, so counts are ours. Law: Licensing
  // Act 2003 as amended to 2026, mandatory conditions, s.182 guidance. All items original.
  blueprint: {
    ukaplhAuth: 6,
    ukaplhPersonal: 7,
    ukaplhPremises: 8,
    ukaplhDps: 4,
    ukaplhActivities: 7,
    ukaplhPowers: 6,
    ukaplhChildren: 7,
    ukaplhAlcohol: 5,
  },
  trainingSets: testSets(8400, 4),
  categoryLabels: {
    ukaplhAuth: "Licensing Objectives & Authorities",
    ukaplhPersonal: "Personal Licences",
    ukaplhPremises: "Premises Licences & Conditions",
    ukaplhDps: "Designated Premises Supervisor",
    ukaplhActivities: "Licensable Activities & TENs",
    ukaplhPowers: "Police Powers & Offences",
    ukaplhChildren: "Protecting Children",
    ukaplhAlcohol: "Alcohol & Responsible Retail",
  },
  copy: {
    guestPrompt: "to save your personal licence progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all eight topic areas. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 70% to pass, like the real 28 of 40",
    heroSubs: [
      "Eight topic areas, four mock tests. The real exam needs 28 of 40.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your exam with your course provider.",
    ],
    sourceLine: "Based on the Licensing Act 2003, the mandatory licensing conditions and the section 182 guidance for England and Wales, checked October 2026. Original questions, not an awarding body's papers.",
    analyticsKey: "ukaplh",
  },
};
```

Append `ukaplh` to `EXAMS` before `htl` (after the other UK/intl exams).

## lib/banks/all.ts
```ts
import "./ukaplh";
```

## types/index.ts
- `QuestionType`: add `| "UKAPLH"`.
- `QuestionCategory`, after the ukcar block:
```ts
  // Personal licence (APLH, England and Wales) categories
  | "ukaplhAuth"
  | "ukaplhPersonal"
  | "ukaplhPremises"
  | "ukaplhDps"
  | "ukaplhActivities"
  | "ukaplhPowers"
  | "ukaplhChildren"
  | "ukaplhAlcohol"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts
In the category label map, after `ukcarEmerg` (English labels in every file):
```ts
    ukaplhAuth: "Licensing Objectives & Authorities",
    ukaplhPersonal: "Personal Licences",
    ukaplhPremises: "Premises Licences & Conditions",
    ukaplhDps: "Designated Premises Supervisor",
    ukaplhActivities: "Licensable Activities & TENs",
    ukaplhPowers: "Police Powers & Offences",
    ukaplhChildren: "Protecting Children",
    ukaplhAlcohol: "Alcohol & Responsible Retail",
```

## app/globals.css
Light block after the last exam theme (hue 335, wine-berry; 330 and 340 are taken, check no other wave-2 exam picked 335). Then run `tools/gen_dark_brand_css.py` once for all wave-2 themes.
```css
  /* Personal licence (APLH) theme (UK) */
  [data-theme="ukaplh"] {
    --brand: 335 55% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 335 60% 96%;
    --brand-hover: 335 55% 32%;
    --brand-dark: 335 55% 27%;
    --brand-darker: 335 50% 18%;
    --brand-muted: 335 35% 72%;
    --brand-border: 335 35% 80%;
    --brand-border-light: 335 35% 89%;
    --brand-gradient-to: 15 65% 95%;
  }
```

## lib/testCatalog.ts
- `EXAM_BLURBS`:
```ts
  ukaplh: "Mock exams for the Level 2 Award for Personal Licence Holders in England and Wales: the Licensing Act 2003, premises licences, the DPS, TENs and underage sales, with the real 70% pass line.",
```
- `EXAM_ORG`: `ukaplh: "Licensing Act 2003 · England and Wales",`
- Hub group: "UK workplace and trade certificates" (with cscs, ukfood, ukfaw, ukcare).
- `SEARCH_ALIASES`:
```ts
  ukaplh: "personal licence aplh award for personal licence holders licensing act 2003 dps designated premises supervisor ten temporary event notice pub bar licence alcohol licence uk england wales level 2 bar manager",
```

## lib/region.ts
`TEST_REGIONS`: `ukaplh: "UK",`. Add `"ukaplh"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts
```ts
  ukaplh: {
    answer:
      "The Level 2 Award for Personal Licence Holders (APLH) is the accredited qualification you need before applying for a personal licence to sell alcohol in England and Wales. It is a one-unit course on the Licensing Act 2003, usually taught in a day, ending in a 40-question multiple-choice exam where you need 28 correct (70%). You then apply to the licensing authority where you live; the licence lasts indefinitely.",
    rows: [
      { label: "Questions", value: "40 multiple choice" },
      { label: "Time", value: "40 to 60 minutes, by awarding body" },
      { label: "Pass mark", value: "28 of 40 (70%)" },
      { label: "Level", value: "Level 2 (RQF), one unit" },
      { label: "Minimum age for the licence", value: "18" },
      { label: "Licence lasts", value: "Indefinitely (no renewal since 2015)" },
      { label: "Applies in", value: "England and Wales (Licensing Act 2003)" },
    ],
    basedOn: "the Licensing Act 2003, the GOV.UK personal licence guidance and awarding body specifications for the Level 2 APLH, checked October 2026",
    source: { name: "GOV.UK: Personal licence to sell alcohol", url: "https://www.gov.uk/personal-licence-to-sell-alcohol" },
  },
```

## components/TeachNudge.tsx
Add `"ukaplh"` to `TEACHER_LED` (trade schools / pre-licensing line).

## components/exam/ExamClassFaq.tsx
`TEACHES`: `ukaplh: "a personal licence course",`

## lib/tigerAssets.ts
Optional: `BORROWED_SETS`: `ukaplh: "alcohol",` (the alcohol server tiger exists and fits).

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` (wave-2 international landings, incl. personal licence).

## scripts/build-training-parts.ts
Run `npx tsx scripts/build-training-parts.ts` after wiring.

## Not needed
No new icon, no next.config redirect, sitemap and /og pick it up from `EXAMS`.

## CLAUDE.md (Additional Exams, after Property & Casualty or with the UK exams)
```md
- **Personal Licence** (UK Level 2 Award for Personal Licence Holders, England and Wales, `/personal-licence/*`, landing `/personal-licence-practice-test`): `data/uk-personal-licence-questions.json` (200 questions: objectives/authorities 24, personal licences 28, premises licences 32, DPS 16, activities/TENs 28, powers/offences 24, children 28, alcohol/retail 20), test IDs 8401-8404, sets 8401-8404 (one per test), state `UKAPLH`, 70% pass (real exam 28 of 40). 6/7/8/4/7/6/7/5 per test. Licensing Act 2003 as amended to 2026; Scotland and NI excluded. Built from `tools/intl/ukaplh/`. Hub group "UK workplace and trade certificates".
```

## Screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ukaplh:personal-licence:8401`
