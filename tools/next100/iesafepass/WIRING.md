# Wiring for `iesafepass` (SOLAS Safe Pass, Ireland, v1, region IE)

Files already written by the builder: `data/safe-pass-questions.json` (200, PASS, key-longest 23%),
`lib/banks/iesafepass.ts`, `app/safe-pass/*` (layout, redirect, dashboard, drill, stats, copied from
`app/sira-security/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/safe-pass-practice-test/page.tsx`, `tools/next100/iesafepass/*` (spec, sources, `q_*.py`,
`build.py`, this file). Everything below goes in shared files.

Format note: Safe Pass is a one-day SOLAS course; SOLAS says its assessment is a tutor-read
multiple-choice test but publishes no question count or pass mark. The alternative renewal computer
test (Pearson VUE) is 50 multiple-choice questions in 45 minutes, 45 correct to pass (solas.ie,
constructioncourses.ie, checked 5 Nov 2026). Here: four 50-question mock tests at 90% (45 of 50, the
renewal test's line), four content sets over the course's 13 learning units, so 4 sets + 4 tests = 8
dashboard steps. Pools are exactly 4x per-test counts. Content sets, so sets first, then tests.

## lib/exams.ts

Add `"iesafepass"` to the `ExamId` union. Icon `hardhat` already exists (used by `cscs`).

```ts
const iesafepass: ExamConfig = {
  id: "iesafepass",
  stateCode: "IESAFEPASS",
  idBase: 20900,
  slug: "/safe-pass",
  landingPath: "/safe-pass-practice-test",
  name: "Safe Pass Practice Test",
  shortName: "Safe Pass",
  examLabel: "Safe Pass test",
  fullName: "SOLAS Safe Pass construction health and safety awareness (Ireland)",
  questionIdPrefix: "IESP-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 90,
  // SOLAS Safe Pass, the one-day construction safety awareness course required by the Safety,
  // Health and Welfare at Work (Construction) Regulations 2013 (Schedule 4). SOLAS publishes no
  // weights or count for the course assessment; the alternative renewal test is 50 questions,
  // 45 to pass. Tigertest's blueprint over the course's 13 learning units: law (units 1-2) 7,
  // accident reporting (3) 5, risk and behaviour-based safety (4, 8) 6, electricity (5) 5,
  // excavations (6) 5, heights (7) 7, equipment and vehicles (9-10) 6, health, welfare, noise and
  // vibration (11-12) 5, PPE (13) 4. 90% mirrors the renewal test's 45 of 50.
  blueprint: {
    iespLaw: 7,
    iespAccidents: 5,
    iespRisk: 6,
    iespElectric: 5,
    iespExcav: 5,
    iespHeights: 7,
    iespVehicles: 6,
    iespHealth: 5,
    iespPPE: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 20901, name: "Site Safety, the Law & Accident Reporting", categories: ["iespLaw", "iespAccidents"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 2, id: 20902, name: "Risk, Health & PPE", categories: ["iespRisk", "iespHealth", "iespPPE"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 3, id: 20903, name: "Electricity & Excavations", categories: ["iespElectric", "iespExcav"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 20904, name: "Work at Height, Equipment & Vehicles", categories: ["iespHeights", "iespVehicles"], size: 52, weightLabel: "13 of 50 test questions" },
  ],
  categoryLabels: {
    iespLaw: "Site Safety & the Law",
    iespAccidents: "Accident Reporting & Emergencies",
    iespRisk: "Risk Assessment & Safe Behaviour",
    iespElectric: "Electricity",
    iespExcav: "Excavations & Buried Services",
    iespHeights: "Work at Height",
    iespVehicles: "Construction Equipment & Vehicles",
    iespHealth: "Health, Welfare, Noise & Vibration",
    iespPPE: "Personal Protective Equipment",
  },
  copy: {
    guestPrompt: "to save your Safe Pass progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets over the 13 units of the Safe Pass course: site safety law and accident reporting, risk, health and PPE, electricity and excavations, and work at height, plant and vehicles. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across every unit, 45 to pass",
    heroSubs: [
      "Four topic sets, four mock tests.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Ready for Safe Pass.",
    ],
    sourceLine: "Based on the Safety, Health and Welfare at Work Act 2005, the Construction Regulations 2013, the General Application Regulations 2007, HSA guidance and the 13 Safe Pass learning units. Original questions; 50 per test, 45 to pass like the renewal test. Not affiliated with SOLAS, the HSA or any Safe Pass tutor.",
    analyticsKey: "iesafepass",
  },
};
```

Append `iesafepass` to the `EXAMS` array after the last international batch 3 exam (or after `iedttcv`).

Check: 20901-20904 (tests and sets) must be free (the batch table assigns 20900).

## lib/banks/all.ts

```ts
import "./iesafepass";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/iesafepass.ts`.

## types/index.ts

- `QuestionType`: add `| "IESAFEPASS"`.
- `QuestionCategory`, under a `// Safe Pass (Ireland)` comment:

```ts
  | "iespLaw"
  | "iespAccidents"
  | "iespRisk"
  | "iespElectric"
  | "iespExcav"
  | "iespHeights"
  | "iespVehicles"
  | "iespHealth"
  | "iespPPE"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    iespLaw: "Site Safety & the Law",
    iespAccidents: "Accident Reporting & Emergencies",
    iespRisk: "Risk Assessment & Safe Behaviour",
    iespElectric: "Electricity",
    iespExcav: "Excavations & Buried Services",
    iespHeights: "Work at Height",
    iespVehicles: "Construction Equipment & Vehicles",
    iespHealth: "Health, Welfare, Noise & Vibration",
    iespPPE: "Personal Protective Equipment",
```

## app/globals.css

Hue from the international batch 4 table (50 85% 18%, already checked). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Safe Pass (Ireland) theme */
  [data-theme="iesafepass"] {
    --brand: 50 85% 18%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 50 85% 95%;
    --brand-hover: 50 85% 14%;
    --brand-dark: 50 85% 13%;
    --brand-darker: 50 80% 8%;
    --brand-muted: 50 25% 68%;
    --brand-border: 50 30% 78%;
    --brand-border-light: 50 25% 88%;
    --brand-gradient-to: 45 85% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `iesafepass: "Safe Pass practice for Irish construction sites: site safety law and the PSCS, accident reporting, risk assessment, electricity, excavations, work at height, plant and vehicles, noise, vibration and PPE, across the 13 course units in four 50-question mock tests at the renewal test's 45 out of 50.",`
- `EXAM_ORG`: `iesafepass: "SOLAS · Safe Pass construction safety awareness programme",`
- Hub group (new, placed right after "Ireland driving tests"; the other three Irish batch 4 exams join it):
  `{ title: "Ireland licences and workplace certificates", ids: ["iesafepass"] },`
  (final order with the others: iesafepass, iespsv, ieqfa, iepsa, or as the integrator prefers)
- `SEARCH_ALIASES`:
  `iesafepass: "safe pass safepass safe pass test safe pass exam safe pass questions safe pass renewal safe pass renewal test safe pass mock test solas safe pass solas card construction safety card ireland safety awareness card construction course ireland site safety test ireland pearson safe pass",`
- `RELATED_OVERRIDES`: `iesafepass: ["cscs", "auwhite", "osha"],` (padding until the group has its other members).

## lib/region.ts

`iesafepass: "IE",` in `TEST_REGIONS`, and add `"iesafepass"` to `NON_DRIVING_TESTS`.

Country homepage `/ie` (REGION_HOME for IE) describes the driving tests; the integrator may widen it
once the four Irish batch 4 exams land, e.g. "Free practice for Ireland's driver theory tests, Safe
Pass and more: original questions, every answer explained. No account needed."

## lib/examFacts.ts

```ts
  iesafepass: {
    answer:
      "Safe Pass is a one-day construction health and safety awareness programme run by SOLAS. Under the Construction Regulations 2013, craft and general construction workers, apprentices and people doing on-site security work in Ireland must hold a valid Safe Pass card. The course is given by SOLAS-approved tutors and ends with a multiple-choice assessment that the tutor reads aloud; SOLAS does not publish its length or pass mark. Cards are valid for four years. To renew, you repeat the course or take the alternative renewal test on a computer at a Pearson test centre: 50 multiple-choice questions in 45 minutes, with 45 correct needed to pass.",
    rows: [
      { label: "Course", value: "One day, with a SOLAS-approved tutor" },
      { label: "Course assessment", value: "Multiple choice, read aloud by the tutor; length and pass mark not published" },
      { label: "Renewal test", value: "50 questions in 45 minutes at a Pearson centre" },
      { label: "Renewal pass mark", value: "45 of 50 (90%)" },
      { label: "Card", value: "Valid four years" },
      { label: "Minimum age", value: "16 on the day of the course" },
      { label: "Run by", value: "SOLAS" },
    ],
    basedOn: "SOLAS Safe Pass and constructioncourses.ie Safe Pass information pages, and the Construction Regulations 2013, checked November 2026",
    source: { name: "SOLAS: Safe Pass", url: "https://www.solas.ie/construction-lp/safe-pass" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Safe Pass is taught by SOLAS-approved tutors in a one-day class, so it is teacher-led (brief):
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"iesafepass"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `iesafepass: "a Safe Pass course or construction safety training",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `iesafepass: "cscs",` (borrow the CSCS construction tiger; use `"osha"` if `cscs`
has no set of its own).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, no redirects, the `hardhat` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 60, set 2).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing iesafepass:safe-pass:20901`

## CLAUDE.md (under Additional Exams, with the other international batch 4 exams)

```md
- **Safe Pass** (SOLAS construction health and safety awareness, Ireland, `/safe-pass/*`, landing `/safe-pass-practice-test`): `data/safe-pass-questions.json` (200 original questions over the 13 learning units of the one-day course: site safety and the law 28, accident reporting and emergencies 20, risk assessment and safe behaviour 24, electricity 20, excavations and buried services 20, work at height 28, construction equipment and vehicles 24, health, welfare, noise and vibration 20, PPE 16), test IDs 20901-20904, sets 20901-20904 (content sets: law and accidents 48, risk, health and PPE 60, electricity and excavations 40, heights and vehicles 52), state `IESAFEPASS`, prefix `IESP-`, 90% pass (45 of 50, the alternative renewal test's line: 50 questions, 45 minutes at a Pearson centre; SOLAS publishes no length or pass mark for the course's tutor-read multiple-choice assessment). 7/5/6/5/5/7/6/5/4 per test. Irish law: Safety, Health and Welfare at Work Act 2005 (ss. 8, 13, 19, 20, 25, 27), Construction Regulations 2013 (PSCS/PSDP, Safe Pass and CSCS cards, notification over 30 working days or 500 person days, site safety representative over 20 persons, plant operators 18+), General Application Regulations 2007 (RCD 30 mA over 125 V, guard rail 950 mm and 470 mm gaps, platforms inspected every 7 days, noise 80/85/87 dB(A), HAV 2.5/5 m/s²) and HSA guidance (accident reporting over three days, excavation inspections, AF3). No fines or fees. Kept clear of `cscs`, `auwhite`, `osha` and `auwah` stems. Built by `tools/next100/iesafepass/build.py`; sources in `tools/next100/iesafepass/sources.md`. Region IE, hub group "Ireland licences and workplace certificates", `[data-theme="iesafepass"]` deep ochre (50 85% 18%), borrows the CSCS tiger, teacher-led (SOLAS-approved Safe Pass tutors).
```
