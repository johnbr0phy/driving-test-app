# Wiring for `phlto` (Philippines LTO driver's license written exam, PH, v1)

Files already written by the builder: `data/philippines-lto-questions.json` (200, validator PASS),
`lib/banks/phlto.ts`, `app/lto-exam/*` (8 wrappers, copied from `app/nz-learner-licence/`),
`app/lto-exam-reviewer-practice-test/page.tsx`, `tools/countries/phlto/*` (spec, sources, `q_*.py`,
`build.py`). Rebuild with `python3 -I tools/countries/phlto/build.py`. Everything below goes in
shared files.

Format note: three full-length tests of 60 (like the TDC module's exam), 48 to pass. `passPct: 80`
gives `ceil(0.80 * 60) = 48`. Dashboard = 5 training sets + 3 tests = 8 steps. Each pool is 3x its
per-test count plus spares (20 training-only items, the last ones in each pool: 1/2/2/2/2/1/1/9).

Spelling: the Philippines uses US spelling, so all visible copy says "license", "meters", "curb".
The category key `phLicence` keeps the brief's spelling (keys are never shown). `REGION_HOME.PH`
in `lib/region.ts` (already merged) says "driver's licence" twice; suggest "driver's license".

## lib/exams.ts

Add `"phlto"` to the `ExamId` union. Icon `car` already exists.

```ts
const phlto: ExamConfig = {
  id: "phlto",
  stateCode: "PHLTO",
  idBase: 12200,
  slug: "/lto-exam",
  landingPath: "/lto-exam-reviewer-practice-test",
  name: "LTO Exam Reviewer Practice Test",
  shortName: "LTO exam",
  examLabel: "LTO license exam",
  fullName: "Philippines LTO driver's license written exam",
  questionIdPrefix: "PHLTO-",
  icon: "car",
  testCount: 3,
  questionsPerTest: 60,
  passPct: 80,
  // Real exam: LTO Theoretical Driving Course module TDC-15-S-01-2 v9-2021, 60 questions, 48 to
  // pass (80%). The older LTO MC AHS-2008-949 (12 March 2008) set 30 of 40 (non-professional) and
  // 45 of 60 (professional). LTO publishes no per-topic counts; this split is Tigertest's own with
  // road signs weighted heaviest. Rules from RA 4136, RA 8750, RA 10054, RA 10666, RA 10913,
  // RA 10586 (+IRR), RA 11229, RA 10930 and the DPWH 2012 road signs manual, checked 2026-10-31.
  // Three full-length tests; pools are 3x each count plus 20 training-only spares.
  // passPct 80 = ceil(0.80 * 60) = 48. All items original.
  blueprint: {
    phLicence: 8,
    phSigns: 12,
    phMarkings: 6,
    phRightOfWay: 9,
    phSpeed: 9,
    phParking: 5,
    phSafetyLaws: 8,
    phEmergency: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 12201, name: "Licenses & Road Safety Laws", categories: ["phLicence", "phSafetyLaws"], size: 50, weightLabel: "16 of 60 test questions" },
    { setNumber: 2, id: 12202, name: "Road Signs", categories: ["phSigns"], size: 38, weightLabel: "12 of 60 test questions" },
    { setNumber: 3, id: 12203, name: "Markings & Right of Way", categories: ["phMarkings", "phRightOfWay"], size: 49, weightLabel: "15 of 60 test questions" },
    { setNumber: 4, id: 12204, name: "Speed, Overtaking & Parking", categories: ["phSpeed", "phParking"], size: 45, weightLabel: "14 of 60 test questions" },
    { setNumber: 5, id: 12205, name: "Emergencies, Crashes & Night", categories: ["phEmergency"], size: 18, weightLabel: "3 of 60 test questions" },
  ],
  categoryLabels: {
    phLicence: "Licenses & Permits",
    phSigns: "Road Signs",
    phMarkings: "Markings & Traffic Lights",
    phRightOfWay: "Right of Way & Intersections",
    phSpeed: "Speed, Lanes & Overtaking",
    phParking: "Parking & Stopping",
    phSafetyLaws: "Road Safety Laws",
    phEmergency: "Emergencies, Crashes & Night",
  },
  copy: {
    guestPrompt: "to save your LTO exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets covering every topic the LTO written exam asks about. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 60 questions, 48 to pass",
    heroSubs: [
      "Five topics, three full-length tests. Road signs weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You're ready for the LTO exam.",
    ],
    sourceLine: "Based on RA 4136 and the Philippine road safety laws. Original questions; 60 per test, 48 to pass as in LTO's TDC module.",
    analyticsKey: "phlto",
  },
};
```

Append `phlto` to the `EXAMS` array with the other driving tests. Check: 12201-12205 must be free.

## lib/banks/all.ts

```ts
import "./phlto";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/phlto.ts`.

## types/index.ts

- `QuestionType`: add `| "PHLTO"`.
- `QuestionCategory`, under a `// Philippines LTO exam` comment (grep found no existing `ph*` keys):

```ts
  | "phLicence"
  | "phSigns"
  | "phMarkings"
  | "phRightOfWay"
  | "phSpeed"
  | "phParking"
  | "phSafetyLaws"
  | "phEmergency"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    phLicence: "Licenses & Permits",
    phSigns: "Road Signs",
    phMarkings: "Markings & Traffic Lights",
    phRightOfWay: "Right of Way & Intersections",
    phSpeed: "Speed, Lanes & Overtaking",
    phParking: "Parking & Stopping",
    phSafetyLaws: "Road Safety Laws",
    phEmergency: "Emergencies, Crashes & Night",
```

## app/globals.css

Light block (hue 212 40% 26% from the brief, a deep slate blue), then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Philippines LTO exam theme */
  [data-theme="phlto"] {
    --brand: 212 40% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 212 40% 95%;
    --brand-hover: 212 40% 21%;
    --brand-dark: 212 40% 19%;
    --brand-darker: 212 40% 13%;
    --brand-muted: 212 25% 70%;
    --brand-border: 212 25% 78%;
    --brand-border-light: 212 25% 88%;
    --brand-gradient-to: 200 45% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `phlto: "Three full 60-question mock tests for the Philippines LTO driver's license written exam: road signs, right of way, speed limits, parking, and the seat belt, helmet, child seat, distracted and drunk driving laws.",`
- `EXAM_ORG`: `phlto: "LTO · Student permit, non-professional and professional license",`
- Hub group "Philippines driving tests" and `RELATED_OVERRIDES.phlto` are already in the tree.
- `SEARCH_ALIASES`:
  `phlto: "lto exam reviewer lto practice test lto written exam lto exam questions philippines driving test driver's license exam philippines non pro license exam professional license exam student permit tdc exam reviewer land transportation office",`

## lib/region.ts

`phlto: "PH"` is already in `TEST_REGIONS`. Driving test, so NOT in `NON_DRIVING_TESTS`. See the
spelling note above for `REGION_HOME.PH`.

## lib/examFacts.ts

```ts
  phlto: {
    answer:
      "The LTO written exam is the knowledge test you pass to get a Philippine driver's license. LTO's Theoretical Driving Course module (TDC-15-S-01-2, version 9-2021) gives it as 60 questions with 48 correct to pass; an older 2008 LTO memorandum set 40 questions with 30 to pass for the non-professional license. You can get a student permit at 16 after the 15-hour Theoretical Driving Course, a non-professional license at 17 and a professional license at 18. A license is valid for five years, or ten if you had no violations.",
    rows: [
      { label: "Questions", value: "60 (TDC module v9-2021)" },
      { label: "Pass mark", value: "48 of 60 (80%)" },
      { label: "Older standard", value: "30 of 40, non-professional (LTO memo, March 2008)" },
      { label: "Minimum age", value: "16 student permit, 17 non-professional, 18 professional" },
      { label: "Student permit", value: "Valid 1 year; drive only with a licensed driver" },
      { label: "Courses", value: "15-hour TDC, then the Practical Driving Course" },
      { label: "License validity", value: "5 years, or 10 with no violations (RA 10930)" },
      { label: "Run by", value: "Land Transportation Office (LTO)" },
    ],
    basedOn: "LTO TDC module TDC-15-S-01-2 v9-2021, LTO MC AHS-2008-949 and RA 10930, checked October 2026",
    source: { name: "LTO MC AHS-2008-949: Standards for written and practical examinations", url: "https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/10/52964" },
  },
```
(No fee figures: house style avoids money. lto.gov.ph refused automated fetches on 2026-10-31, so
the source link is the Supreme Court e-Library copy of the 2008 memo; swap in an LTO URL if one is
found for the TDC module.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

`phlto: "driving"` is already present.

## Landing breadcrumbs

The brief asks for `<ExamLandingBreadcrumbs examId>`, but no such component exists in this tree
(grep of `components/` and `app/` on 2026-10-31) and the NZ template does not render one. If the
integrator adds it, place `<ExamLandingBreadcrumbs examId="phlto" />` right after the JSON-LD
script in `app/lto-exam-reviewer-practice-test/page.tsx`. `ExamFacts` and `ExamRelatedTests` are
rendered. The FAQ is one `faqs` array used for both JSON-LD and the page.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing phlto:lto-exam:12201`

## CLAUDE.md (under Additional Exams)

```md
- **LTO Exam** (Philippines LTO driver's license written exam, `/lto-exam/*`, landing `/lto-exam-reviewer-practice-test`): `data/philippines-lto-questions.json` (200 original questions from RA 4136, the road safety Acts and the DPWH 2012 signs manual: licenses 25, signs 38, markings/lights 20, right of way 29, speed/overtaking 29, parking 16, safety laws 25, emergencies/night 18), three full-length tests: test IDs 12201-12203 (60 questions each), sets 12201-12205, state `PHLTO`, 80% pass (48 of 60, LTO TDC module TDC-15-S-01-2 v9-2021; the landing also gives the 2008 memo's 30 of 40). 8/12/6/9/9/5/8/3 per test; the last items of each pool (20 in all) are training-only. US spelling (license, meters) as used in the Philippines. Signs are described in words. Built by `tools/countries/phlto/build.py`; sources in `tools/countries/phlto/sources.md`. Region PH, hub group "Philippines driving tests".
```
