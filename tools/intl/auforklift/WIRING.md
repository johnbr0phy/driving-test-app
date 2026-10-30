# auforklift wiring (Australian forklift high risk work licence, class LF, v1)

Files already written by the builder: `data/au-forklift-licence-questions.json` (built by
`python3 -I tools/intl/auforklift/build.py`), `lib/banks/auforklift.ts`, `app/au-forklift-licence/*`
(8 wrappers), `app/forklift-licence-practice-test-australia/page.tsx`,
`tools/intl/auforklift/*` (spec.json, sources.md, src/*.py, build.py).

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/au-forklift-licence-questions.json --pool auforkliftLicence=28 --pool auforkliftPlan=36 --pool auforkliftChecks=32 --pool auforkliftLoads=40 --pool auforkliftOperate=40 --pool auforkliftPower=24` -> PASS (letters 50/50/50/50, key-longest 1%, key>1.2x 6%).

## lib/exams.ts
`ExamId` union: add `| "auforklift"`. Icon: existing `"forklift"` (no new icon). Add before `const htl`, and append `auforklift` to `EXAMS` before `htl`:

```ts
const auforklift: ExamConfig = {
  id: "auforklift",
  stateCode: "AUFORKLIFT",
  idBase: 9900,
  slug: "/au-forklift-licence",
  landingPath: "/forklift-licence-practice-test-australia",
  name: "Forklift Licence Practice Test (Australia)",
  shortName: "Forklift Licence",
  examLabel: "forklift licence knowledge assessment",
  fullName: "Australian high risk work licence, class LF (TLILIC0003 Licence to operate a forklift truck)",
  questionIdPrefix: "AUFORKLIFT-",
  icon: "forklift",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // High risk work licence class LF, assessed against TLILIC0003 Licence to operate a forklift truck
  // (Assessment Requirements R1, training.gov.au, checked Oct 2026): knowledge assessment (incl. load
  // weight calculations) plus a practical on a real AS 2359 truck, by an accredited assessor using
  // Safe Work Australia's national assessment materials; licence issued by the state or territory
  // regulator (18+, 5 years, apply within 60 days). No per-topic weights are published, so counts
  // are ours: licensing/WHS 14%, hazards/traffic 18%, checks 16%, load charts/calcs 20%,
  // operation 20%, attachments/fuel/shutdown 12%. The 80% line is a practice target. All items original.
  blueprint: {
    auforkliftLicence: 7,
    auforkliftPlan: 9,
    auforkliftChecks: 8,
    auforkliftLoads: 10,
    auforkliftOperate: 10,
    auforkliftPower: 6,
  },
  trainingSets: testSets(9900, 4),
  categoryLabels: {
    auforkliftLicence: "Licensing, WHS Law & Duties",
    auforkliftPlan: "Planning, Hazards & Traffic",
    auforkliftChecks: "Pre-start & Operational Checks",
    auforkliftLoads: "Load Charts, Stability & Calculations",
    auforkliftOperate: "Safe Operation & Load Handling",
    auforkliftPower: "Attachments, Fuel & Shutdown",
  },
  copy: {
    guestPrompt: "to save your forklift licence progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all six LF topics. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across every LF topic, 80% to pass",
    heroSubs: [
      "Six topics, four tests. Load charts and calculations count the most.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your LF knowledge assessment.",
    ],
    sourceLine: "Based on the TLILIC0003 unit and the high risk work licence rules. Original questions, not the official assessment; fees and forms vary by state.",
    analyticsKey: "auforklift",
  },
};
```
Tests 9901-9904, sets 9901-9904 (one per test, 4 + 4 = 8 dashboard steps). Run `npx tsx scripts/build-training-parts.ts` after wiring.

## lib/banks/all.ts
```ts
import "./auforklift";
```

## lib/examData.ts
Nothing (the bank registers through `lib/banks/auforklift.ts`).

## lib/server/classQuestions.ts
Nothing extra: it imports `@/lib/banks/all`, which picks up `./auforklift`.

## types/index.ts
`QuestionType`: add `| "AUFORKLIFT"`. `QuestionCategory`, under a comment `// Forklift licence LF, Australia (auforklift)`:
```ts
  | "auforkliftLicence"
  | "auforkliftPlan"
  | "auforkliftChecks"
  | "auforkliftLoads"
  | "auforkliftOperate"
  | "auforkliftPower"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all)
```ts
    auforkliftLicence: "Licensing, WHS Law & Duties",
    auforkliftPlan: "Planning, Hazards & Traffic",
    auforkliftChecks: "Pre-start & Operational Checks",
    auforkliftLoads: "Load Charts, Stability & Calculations",
    auforkliftOperate: "Safe Operation & Load Handling",
    auforkliftPower: "Attachments, Fuel & Shutdown",
```

## app/globals.css (light block; generate the dark twin with tools/gen_dark_brand_css.py)
Hue 25 (safety orange), not used by any existing theme or wave-2 WIRING.md when checked; white text contrast about 6:1 at 32% lightness.
```css
  /* Forklift licence theme (Australia) */
  [data-theme="auforklift"] {
    --brand: 25 90% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 25 85% 94%;
    --brand-hover: 25 90% 27%;
    --brand-dark: 25 90% 24%;
    --brand-darker: 25 80% 16%;
    --brand-muted: 25 50% 70%;
    --brand-border: 25 55% 76%;
    --brand-border-light: 25 50% 87%;
    --brand-gradient-to: 40 80% 95%;
  }
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  auforklift: "Free practice for the Australian forklift licence (high risk work licence class LF, TLILIC0003): load charts and load weight calculations, pre-start checks, stability, safe operation, LPG and battery handling.",
// EXAM_ORG
  auforklift: "TLILIC0003 · high risk work licence LF, Australia",
// SEARCH_ALIASES
  auforklift: "forklift licence australia lf licence high risk work licence hrwl tlilic0003 tlilic2001 forklift ticket forklift theory test load chart data plate safework nsw worksafe victoria workplace health and safety queensland worksafe wa warehouse",
```
Hub group: "Australia school and work certificates" (or the AU work group) with aursa, aurcg, aufss, aufirstaid, auwah. If that group has fewer than three other members, add `RELATED_OVERRIDES.auforklift = ["auwah", "aufirstaid", "forklift"]`.

## lib/region.ts
`TEST_REGIONS`: `auforklift: "AU",`. Add `"auforklift"` to `NON_DRIVING_TESTS`.

## components/TeachNudge.tsx
`TEACHER_LED`, trade schools / instructor-led certifications line (next to `"forklift"`): add `"auforklift"`.

## components/exam/ExamClassFaq.tsx
`TEACHES`, next to `forklift`:
```ts
  auforklift: "an LF forklift licence course",
```
(The landing already renders `<ExamClassFaq examId="auforklift" />` and `classFaqJsonLd("auforklift")`; adjust the phrase to the grammar the TEACHES strings use if it reads oddly.)

## lib/examFacts.ts
```ts
  auforklift: {
    answer:
      "In Australia, operating a forklift truck at work needs a high risk work licence of class LF. You are assessed by an accredited assessor against the national unit TLILIC0003 Licence to operate a forklift truck: a knowledge assessment, including load weight calculations, and a practical on a real forklift (simulators are not allowed). You then apply to your state or territory WHS regulator, generally within 60 days. Applicants must be 18 or older, and the licence lasts 5 years and is recognised in every state and territory.",
    rows: [
      { label: "Licence", value: "High risk work licence, class LF (order-pickers are class LO)" },
      { label: "Unit of competency", value: "TLILIC0003 Licence to operate a forklift truck" },
      { label: "Assessment", value: "Knowledge (incl. calculations) and practical, by an accredited assessor" },
      { label: "Pass mark", value: "Set by the national assessment materials (practice line here: 80%)" },
      { label: "Minimum age", value: "18" },
      { label: "Apply within", value: "60 days of the assessment (check your regulator)" },
      { label: "Licence valid", value: "5 years, recognised nationally" },
      { label: "Issued by", value: "State or territory WHS regulator; fees vary by state" },
    ],
    basedOn: "The TLILIC0003 Assessment Requirements on training.gov.au and state regulator high risk work licence pages, checked October 2026",
    source: { name: "training.gov.au: TLILIC0003 Licence to operate a forklift truck", url: "https://training.gov.au/Training/Details/tlilic0003" },
  },
```

## lib/sitemaps.ts / lib/seoDates.ts
Add `/forklift-licence-practice-test-australia` wherever the other exam landings are listed (if the exams sitemap is not catalog-driven), and bump `EXAM_LANDINGS_UPDATED_AT` with the wave comment.

## lib/classes.ts
Nothing if `classExamInfo` reads `EXAMS`; otherwise mirror how `forklift` or `caauto` is listed.

## CLAUDE.md (Additional Exams bullet)
```md
- **Forklift Licence AU** (high risk work licence class LF, TLILIC0003, `/au-forklift-licence/*`, landing `/forklift-licence-practice-test-australia`): `data/au-forklift-licence-questions.json` (200 questions: licensing/WHS 28, planning/hazards/traffic 36, checks 32, load charts/stability/calculations 40, operation 40, attachments/fuel/shutdown 24), test IDs 9901-9904, sets 9901-9904, state `AUFORKLIFT`, 80% pass (practice line). 7/9/8/10/10/6 per test. Original items only, never the national assessment instrument; AS 2359 at concept level; fees, forms and power line distances "vary by state". Built by `tools/intl/auforklift/build.py`.
```

## Screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing auforklift:au-forklift-licence:9901`
(landing expects `/landing/auforklift-mobile.png` and `/landing/auforklift-desktop.png` plus dark twins).
