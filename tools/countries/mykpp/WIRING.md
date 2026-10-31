# Wiring for `mykpp` (Malaysia JPJ KPP01 theory test, car, v1)

Files already written by the builder: `data/malaysia-kpp-questions.json` (200, PASS),
`lib/banks/mykpp.ts`, `app/malaysia-kpp/*` (8 wrappers, copied from `app/nz-learner-licence/`),
`app/malaysia-kpp01-practice-test/page.tsx`, `tools/countries/mykpp/*` (spec, sources, `q_*.py`,
`build.py`). Rebuild with `python3 -I tools/countries/mykpp/build.py`. Everything below goes in
shared files.

Format note: four tests of 50 (the length of the car KPP01 computer test), 42 to pass.
`passPct: 84` gives `ceil(0.84 * 50) = 42` in `ExamDashboard`. Dashboard = 5 training sets + 4
tests = 9 steps. Pools are exactly 4x each per-test count (no spares), 200 in all.

## lib/exams.ts

Add `"mykpp"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests):

```ts
const mykpp: ExamConfig = {
  id: "mykpp",
  stateCode: "MYKPP",
  idBase: 12800,
  slug: "/malaysia-kpp",
  landingPath: "/malaysia-kpp01-practice-test",
  name: "Malaysia KPP01 Practice Test",
  shortName: "Malaysia KPP01",
  examLabel: "KPP01 theory test",
  fullName: "Malaysia JPJ KPP01 computer theory test (Ujian Undang-Undang Bahagian 1, car)",
  questionIdPrefix: "MYKPP-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 84,
  // Real test (JPJ KPP Gabungan FAQ, checked October 2026): car KPP01 computer test 50 questions in
  // 45 minutes, 42 to pass; since 29 August 2025 the combined motorcycle + car module is 70
  // questions in 1 h 15 min, 56 to pass (80%). JPJ publishes no topic counts; study guides say
  // 15 sign questions (Bahagian A), 25 traffic rules (B) and 10 law/safety/KEJARA (C), so each test
  // is 15 signs and markings, 25 rules/speed/parking/hazards, 10 licences/law/emergencies.
  // Road Transport Act 1987, National Speed Limit Order 1989, RTA (Amendment) 2020. All items
  // original. passPct 84 = ceil(0.84 * 50) = 42.
  blueprint: {
    mySigns: 11,
    myMarkings: 4,
    myRules: 10,
    mySpeed: 6,
    myParking: 3,
    myLicence: 6,
    myDefensive: 7,
    myEmergency: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 12801, name: "Road Signs", categories: ["mySigns"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 2, id: 12802, name: "Markings, Lights & Parking", categories: ["myMarkings", "myParking"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 3, id: 12803, name: "Traffic Rules & Right of Way", categories: ["myRules"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 12804, name: "Speed, Licences & the Law", categories: ["mySpeed", "myLicence"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 5, id: 12805, name: "Defensive Driving & Emergencies", categories: ["myDefensive", "myEmergency"], size: 40, weightLabel: "10 of 50 test questions" },
  ],
  categoryLabels: {
    mySigns: "Road Signs",
    myMarkings: "Road Markings & Traffic Lights",
    myRules: "Traffic Rules & Right of Way",
    mySpeed: "Speed, Lanes & Expressways",
    myParking: "Parking & Stopping",
    myLicence: "Licences, Law & KEJARA",
    myDefensive: "Defensive Driving & Hazards",
    myEmergency: "Breakdowns & Crashes",
  },
  copy: {
    guestPrompt: "to save your KPP01 progress and track every question you miss",
    trainingHeading: "Train by KPP01 topic",
    trainingSub: "Five sets covering every part of the KPP01 syllabus, from road signs to expressway emergencies. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions like the real KPP01, 42 to pass",
    heroSubs: [
      "Five topics, four real-length tests. Signs weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your KPP01 test.",
    ],
    sourceLine: "Based on Malaysian road law and the JPJ KPP syllabus. Original questions; 50 per test, 42 to pass like the KPP01 computer test.",
    analyticsKey: "mykpp",
  },
};
```

Append `mykpp` to the `EXAMS` array with the other driving tests.

Check: 12801-12805 (sets) and 12801-12804 (tests) must be free (idBase 12800 is reserved for this
exam in the brief).

## lib/banks/all.ts

```ts
import "./mykpp";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/mykpp.ts`.

## types/index.ts

- `QuestionType`: add `| "MYKPP"`.
- `QuestionCategory`, under a `// Malaysia KPP01` comment (no `my*` key exists yet; checked):

```ts
  | "mySigns"
  | "myMarkings"
  | "myRules"
  | "mySpeed"
  | "myParking"
  | "myLicence"
  | "myDefensive"
  | "myEmergency"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    mySigns: "Road Signs",
    myMarkings: "Road Markings & Traffic Lights",
    myRules: "Traffic Rules & Right of Way",
    mySpeed: "Speed, Lanes & Expressways",
    myParking: "Parking & Stopping",
    myLicence: "Licences, Law & KEJARA",
    myDefensive: "Defensive Driving & Hazards",
    myEmergency: "Breakdowns & Crashes",
```

## app/globals.css

Light block (hue 280 100% 48% from the brief, a vivid purple), then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Malaysia KPP01 theme */
  [data-theme="mykpp"] {
    --brand: 280 100% 48%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 280 80% 96%;
    --brand-hover: 280 100% 42%;
    --brand-dark: 280 100% 36%;
    --brand-darker: 280 90% 24%;
    --brand-muted: 280 40% 72%;
    --brand-border: 280 45% 80%;
    --brand-border-light: 280 40% 90%;
    --brand-gradient-to: 300 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `mykpp: "Four 50-question mock tests for Malaysia's JPJ KPP01 computer theory test: road signs in Malay, markings, traffic rules, expressways, parking, licences and KEJARA, with the 42 of 50 pass mark.",`
- `EXAM_ORG`: `mykpp: "JPJ (Road Transport Department Malaysia) · KPP01 car",`
- Hub group: put `mykpp` in the integrator's Asia driving tests group (with `phlto`, `sgbtt`,
  `hkdrive`). If it ends up alone, add `mykpp: ["sgbtt", "phlto", "hkdrive"],` to `RELATED_OVERRIDES`.
- `SEARCH_ALIASES`:
  `mykpp: "kpp01 kpp 01 ujian kpp jpj theory test jpj computer test ujian undang-undang bahagian 1 soalan kpp01 malaysia driving test lesen memandu ldl kpp gabungan malaysia learner licence",`

## lib/region.ts

`mykpp: "MY",` is already in `TEST_REGIONS` (line with the other wave-3 countries). It is a driving
test, so NOT in `NON_DRIVING_TESTS`. If `REGION_HOME.MY` copy names the pass mark, it should say 42
of 50 for KPP01, or 56 of 70 for KPP Gabungan since 29 August 2025.

## lib/examFacts.ts

```ts
  mykpp: {
    answer:
      "KPP01 is the computer theory test (Ujian Undang-Undang Bahagian 1) you pass before you get a Learner's Driving Licence in Malaysia. JPJ's KPP FAQ lists the car test as 50 multiple-choice questions in 45 minutes, with 42 correct needed to pass; since 29 August 2025 candidates on the combined motorcycle and car module sit 70 questions in 1 hour 15 minutes and need 56. You take a KPP01 class at a JPJ-registered driving institute first, and you must be at least 17 for a car licence. After passing you get an LDL, which lets you drive only under an institute instructor or a JPJ examiner.",
    rows: [
      { label: "Questions", value: "50 (car KPP01); 70 for KPP Gabungan" },
      { label: "Pass mark", value: "42 of 50; 56 of 70 for KPP Gabungan" },
      { label: "Time", value: "45 minutes; 1 h 15 min for KPP Gabungan" },
      { label: "Minimum age", value: "17 (class D car)" },
      { label: "Before the test", value: "KPP01 class at a JPJ-registered driving institute" },
      { label: "After passing", value: "Learner's Driving Licence (LDL), then circuit and road training" },
      { label: "Run by", value: "JPJ (Jabatan Pengangkutan Jalan)" },
    ],
    basedOn: "JPJ KPP Gabungan FAQ and MyGOV driving licence guidance, checked October 2026",
    source: { name: "MyGOV: Memohon lesen memandu", url: "https://www.malaysia.gov.my/my/categories/pengangkutan/lesen-memandu/memohon-lesen-memandu" },
  },
```
(Fees left out: house style avoids money figures. The JPJ FAQ page itself could not be fetched;
the 42/50, 56/70 and 29 August 2025 figures were confirmed by the brief's fact-checkers.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

Falls back to the DMV tiger. Do not add to `TIGER_EXAM_IDS` without reviewed artwork.

## Landing breadcrumbs

No `ExamLandingBreadcrumbs` component exists in this tree (same as for nzroad), so the landing does
not render one. If the integrator adds it, place `<ExamLandingBreadcrumbs examId="mykpp" />` right
after the JSON-LD script in `app/malaysia-kpp01-practice-test/page.tsx`. The landing renders
`ExamFacts` under the hero and `ExamRelatedTests` before the final CTA. The FAQ is one `faqs`
array rendered both as JSON-LD and on the page.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts are written.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing mykpp:malaysia-kpp:12801`

## CLAUDE.md (under Additional Exams)

```md
- **Malaysia KPP01** (JPJ KPP01 computer theory test for a car licence, `/malaysia-kpp/*`, landing `/malaysia-kpp01-practice-test`): `data/malaysia-kpp-questions.json` (200 original questions: signs 44, markings and traffic lights 16, traffic rules 40, speed/expressways 24, parking 12, licences/law/KEJARA 24, defensive driving 28, breakdowns/crashes 12), test IDs 12801-12804 (50 questions each), sets 12801-12805, state `MYKPP`, 84% pass (42 of 50 like the real car KPP01; the combined KPP Gabungan since 29 August 2025 is 56 of 70, on the landing only). 11/4/10/6/3/6/7/3 per test, following the guides' 15 signs / 25 rules / 10 law split. Malay sign wording (BERHENTI, BERI LALUAN...) described in words; no "give way to the right" rule, no sunset-to-sunrise headlight rule, hazard lights only for a stopped vehicle. Built by `tools/countries/mykpp/build.py`; sources in `tools/countries/mykpp/sources.md`. Region MY.
```
