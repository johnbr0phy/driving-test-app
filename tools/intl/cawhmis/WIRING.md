# cawhmis wiring (WHMIS 2015, Canada, v1)

Files already written by the builder: `data/whmis-questions.json` (built by
`python3 -I tools/intl/cawhmis/build.py`), `lib/banks/cawhmis.ts`, `app/whmis/*` (8 wrappers),
`app/whmis-practice-test/page.tsx`, `tools/intl/cawhmis/*` (spec.json, sources.md, src/*.py, build.py).

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/whmis-questions.json --pool cawhmisBasics=32 --pool cawhmisHazards=28 --pool cawhmisPictos=36 --pool cawhmisLabels=36 --pool cawhmisSds=36 --pool cawhmisSafe=32` -> PASS (letters 50/50/50/50, key-longest 8%, key>1.2x 12%).

## lib/exams.ts
`ExamId` union: add `| "cawhmis"`. Icon: existing `"hardhat"` (same as osha; no new icon). Add before `const htl`, and append `cawhmis` to `EXAMS` before `htl`:

```ts
const cawhmis: ExamConfig = {
  id: "cawhmis",
  stateCode: "CAWHMIS",
  idBase: 9200,
  slug: "/whmis",
  landingPath: "/whmis-practice-test",
  name: "WHMIS Practice Test",
  shortName: "WHMIS",
  examLabel: "WHMIS training quiz",
  fullName: "WHMIS 2015 (Workplace Hazardous Materials Information System) training quiz",
  questionIdPrefix: "CAWHMIS-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // WHMIS 2015 under the Hazardous Products Act and Regulations as amended December 15, 2022
  // (GHS Rev. 7, transition ended December 14, 2025; Health Canada and CCOHS, checked Oct 2026).
  // There is no national WHMIS exam: employers and trainers set their own course quiz and pass mark,
  // so the 80% line is a practice target. Weights are ours, across the core of every WHMIS
  // general-education course: roles and laws 16%, hazard classes 14%, pictograms 18%,
  // labels 18%, SDS 18%, safe handling and emergencies 16%. All items original.
  blueprint: {
    cawhmisBasics: 8,
    cawhmisHazards: 7,
    cawhmisPictos: 9,
    cawhmisLabels: 9,
    cawhmisSds: 9,
    cawhmisSafe: 8,
  },
  trainingSets: testSets(9200, 4),
  categoryLabels: {
    cawhmisBasics: "WHMIS Basics, Laws & Roles",
    cawhmisHazards: "Hazard Classes & Categories",
    cawhmisPictos: "Pictograms",
    cawhmisLabels: "Supplier & Workplace Labels",
    cawhmisSds: "Safety Data Sheets",
    cawhmisSafe: "Safe Handling & Emergencies",
  },
  copy: {
    guestPrompt: "to save your WHMIS progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all six WHMIS topics. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across every WHMIS topic, 80% to pass",
    heroSubs: [
      "Six topics, four tests. Pictograms, labels and SDSs are the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your WHMIS course quiz.",
    ],
    sourceLine: "Based on the Hazardous Products Regulations as amended in December 2022 and Health Canada and CCOHS guidance. Original questions; your employer still trains you on its own products.",
    analyticsKey: "cawhmis",
  },
};
```
Tests 9201-9204, sets 9201-9204 (one per test, 4 + 4 = 8 dashboard steps). Run `npx tsx scripts/build-training-parts.ts` after wiring.

## lib/banks/all.ts
```ts
import "./cawhmis";
```

## lib/examData.ts
Nothing (the bank registers through `lib/banks/cawhmis.ts`).

## lib/server/classQuestions.ts
Nothing extra: it imports `@/lib/banks/all`, which picks up `./cawhmis`.

## types/index.ts
`QuestionType`: add `| "CAWHMIS"`. `QuestionCategory`, under a comment `// WHMIS 2015, Canada (cawhmis)`:
```ts
  | "cawhmisBasics"
  | "cawhmisHazards"
  | "cawhmisPictos"
  | "cawhmisLabels"
  | "cawhmisSds"
  | "cawhmisSafe"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all)
```ts
    cawhmisBasics: "WHMIS Basics, Laws & Roles",
    cawhmisHazards: "Hazard Classes & Categories",
    cawhmisPictos: "Pictograms",
    cawhmisLabels: "Supplier & Workplace Labels",
    cawhmisSds: "Safety Data Sheets",
    cawhmisSafe: "Safe Handling & Emergencies",
```

## app/globals.css (light block; generate the dark twin with tools/gen_dark_brand_css.py)
Hue 45 (hazard amber), unused by existing themes when checked; white text contrast about 4.7:1 at 30% lightness.
```css
  /* WHMIS theme (Canada) */
  [data-theme="cawhmis"] {
    --brand: 45 90% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 45 85% 94%;
    --brand-hover: 45 90% 25%;
    --brand-dark: 45 90% 22%;
    --brand-darker: 45 80% 15%;
    --brand-muted: 45 50% 70%;
    --brand-border: 45 55% 76%;
    --brand-border-light: 45 50% 87%;
    --brand-gradient-to: 30 80% 95%;
  }
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  cawhmis: "Free WHMIS practice tests for Canadian workers and students: hazard classes, the GHS pictograms, supplier and workplace labels and the 16-section safety data sheet, updated for the 2022 amendments.",
// EXAM_ORG
  cawhmis: "Health Canada HPR · WHMIS 2015 workplace training",
// SEARCH_ALIASES
  cawhmis: "whmis 2015 whmis quiz whmis symbols pictograms ghs sds msds safety data sheet hazardous products regulations workplace label canada ontario alberta bc co-op student new hire chemical safety ccohs",
```
Hub group: suggested "Canada school and trade tests" (with the Red Seal trades, capsw, caguard, casfa). If the group has fewer than three other members, add `RELATED_OVERRIDES.cawhmis = ["casfa", "caguard", "capsw"]` (or osha, forklift).

## lib/region.ts
`TEST_REGIONS`: `cawhmis: "CA",`. `NON_DRIVING_TESTS`: add `"cawhmis"`.

## components/TeachNudge.tsx
`TEACHER_LED`, trade schools / instructor-led certifications line: add `"cawhmis"`.

## components/exam/ExamClassFaq.tsx
`TEACHES`, trade schools section:
```ts
  cawhmis: "WHMIS training for new hires or a co-op class",
```
(The landing already renders `<ExamClassFaq examId="cawhmis" />` and `classFaqJsonLd("cawhmis")`.)

## lib/examFacts.ts
```ts
  cawhmis: {
    answer:
      "WHMIS is Canada's hazard communication system for hazardous products at work, aligned with the GHS. There is no single national WHMIS exam: every worker who may be exposed must get general WHMIS education and workplace-specific training, which usually ends with the employer's or trainer's own quiz. Suppliers must provide bilingual labels and 16-section safety data sheets under the Hazardous Products Regulations, amended in December 2022 with a transition that ended on December 14, 2025.",
    rows: [
      { label: "Exam", value: "No national exam; a course quiz set by the employer or trainer" },
      { label: "Pass mark", value: "Set by the trainer (practice line here: 80%)" },
      { label: "Who needs it", value: "Workers who use or may be exposed to hazardous products" },
      { label: "Training review", value: "At least yearly in most jurisdictions; varies" },
      { label: "Safety data sheet", value: "16 sections, English and French" },
      { label: "Pictograms", value: "GHS set in a red diamond, plus the WHMIS biohazard in a circle" },
      { label: "Latest change", value: "HPR amended Dec 15, 2022; transition ended Dec 14, 2025" },
      { label: "Rules set by", value: "Health Canada (suppliers) and provincial, territorial or federal OHS law (workplaces)" },
    ],
    basedOn: "Health Canada's amended Hazardous Products Regulations page and CCOHS WHMIS fact sheets, checked October 2026",
    source: { name: "Health Canada: Amended Hazardous Products Regulations", url: "https://www.canada.ca/en/health-canada/services/environmental-workplace-health/occupational-health-safety/workplace-hazardous-materials-information-system/amendments-hazardous-products-regulations.html" },
  },
```

## lib/sitemaps.ts / lib/seoDates.ts
Add `/whmis-practice-test` wherever the other exam landings are listed (if the exams sitemap is not catalog-driven), and bump `EXAM_LANDINGS_UPDATED_AT` with the wave comment.

## lib/classes.ts
Nothing if `classExamInfo` reads `EXAMS`; otherwise mirror how `osha` or `caauto` is listed.

## CLAUDE.md (Additional Exams bullet)
```md
- **WHMIS** (WHMIS 2015 workplace training quiz, Canada, `/whmis/*`, landing `/whmis-practice-test`): `data/whmis-questions.json` (200 questions: basics/laws/roles 32, hazard classes 28, pictograms 36, labels 36, SDS 36, safe handling 32), test IDs 9201-9204, sets 9201-9204, state `CAWHMIS`, 80% pass (practice line; no national exam). 8/7/9/9/9/8 per test. Hazardous Products Regulations as amended Dec 2022 (transition ended Dec 14, 2025); pictograms described in words; training review and decant rules "vary by jurisdiction". Built by `tools/intl/cawhmis/build.py`.
```

## Screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cawhmis:whmis:9201`
(landing expects `/landing/cawhmis-mobile.png` and `/landing/cawhmis-desktop.png` plus dark twins).
