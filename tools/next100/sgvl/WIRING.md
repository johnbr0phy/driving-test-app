# Wiring for `sgvl` (Singapore taxi and private hire vocational licence test, TDVL / PDVL, v1, region SG)

Files already written by the builder: `data/singapore-vocational-licence-questions.json` (200, PASS,
key-longest 7%), `lib/banks/sgvl.ts`, `app/singapore-vocational-licence/*` (layout, redirect,
dashboard, drill, stats, copied from `app/sira-security/`, itself from `app/seru/`; no test or
practice folders, the shared `app/[slug]` routes serve them),
`app/singapore-vocational-licence-practice-test/page.tsx`, `tools/next100/sgvl/*` (spec, sources,
`q_*.py`, `build.py`, this file). Everything below goes in shared files.

Format note: LTA lists the TDVL test as three papers (e-test at an LTA-appointed test centre after the
vocational licence course); the course providers describe Paper A (on-the-road safety, passenger
engagement and handling), Paper B (rules and regulations for taxi and PHC drivers) and Paper C
(routes: route planning with a street directory and navigation tools; TDVL adds key routes and
landmarks). Nobody publishes the question count, time or pass mark. Here: four 50-question mock tests
mixing the papers (A 21, B 24, C 5 per test, Tigertest's split) with 80% as Tigertest's target, and
four content sets, so 4 sets + 4 tests = 8 dashboard steps. Pools are exactly 4x the per-test counts
(no spares). Content sets, so sets first, then tests. Key slots are dealt evenly by a stem hash
(50 per letter).

## lib/exams.ts

Add `"sgvl"` to the `ExamId` union. Icon `car` already exists.

```ts
const sgvl: ExamConfig = {
  id: "sgvl",
  stateCode: "SGVL",
  idBase: 21800,
  slug: "/singapore-vocational-licence",
  landingPath: "/singapore-vocational-licence-practice-test",
  name: "Singapore Vocational Licence Practice Test",
  shortName: "TDVL / PDVL",
  examLabel: "TDVL / PDVL test",
  fullName: "Singapore taxi and private hire car driver's vocational licence test (TDVL / PDVL)",
  questionIdPrefix: "SGVL-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // LTA's vocational licence e-test for taxi (TDVL) and private hire car (PDVL) drivers, taken after
  // the vocational licence course at an LTA-listed provider. Three papers: A on-the-road safety and
  // passenger engagement, B rules and regulations, C routes and route planning. LTA and the providers
  // publish no question count, time or pass mark, so 4 x 50 mixing the papers (A 21, B 24, C 5) and
  // an 80% target are Tigertest's own. Rules from OneMotoring's VL pages, the VLPS Rules 2017
  // (consolidated 30 Oct 2020) and LTA's PHC and point-to-point pages, checked November 2026.
  blueprint: {
    sgvlRoadSafety: 8,
    sgvlPassenger: 8,
    sgvlInclusive: 5,
    sgvlLicensing: 6,
    sgvlConduct: 8,
    sgvlFares: 6,
    sgvlStopping: 4,
    sgvlRoutes: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 21801, name: "Road Safety & Stopping Rules", categories: ["sgvlRoadSafety", "sgvlStopping"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 2, id: 21802, name: "Passenger Engagement", categories: ["sgvlPassenger", "sgvlInclusive"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 3, id: 21803, name: "Licences & Demerit Points", categories: ["sgvlLicensing", "sgvlConduct"], size: 56, weightLabel: "14 of 50 test questions" },
    { setNumber: 4, id: 21804, name: "Fares, Bookings & Routes", categories: ["sgvlFares", "sgvlRoutes"], size: 44, weightLabel: "11 of 50 test questions" },
  ],
  categoryLabels: {
    sgvlRoadSafety: "On-the-Road Safety",
    sgvlPassenger: "Passenger Engagement & Handling",
    sgvlInclusive: "Passengers with Disabilities, Seniors & Children",
    sgvlLicensing: "Vocational Licences & Renewal",
    sgvlConduct: "Conduct Rules & Demerit Points (VLPS)",
    sgvlFares: "Bookings, Decals & Fares",
    sgvlStopping: "Pick-up, Set-down & Taxi Stands",
    sgvlRoutes: "Routes & Route Planning",
  },
  copy: {
    guestPrompt: "to save your TDVL / PDVL progress and track every question you miss",
    trainingHeading: "Train by paper",
    trainingSub: "Four sets covering the three papers: safety and passengers, rules and demerit points, fares, bookings and routes. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 80% target",
    heroSubs: [
      "Three papers, four mock tests.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for the e-test.",
    ],
    sourceLine: "Original practice questions from LTA's published vocational licence rules. Not affiliated with LTA; 50 per test, 80% is Tigertest's target (LTA publishes no count or pass mark).",
    analyticsKey: "sgvl",
  },
};
```

Append `sgvl` to the `EXAMS` array with the other Singapore exams.

Check: 21801-21804 (tests and sets) must be free; the batch 4 table assigns idBase 21800.

## lib/banks/all.ts

```ts
import "./sgvl";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/sgvl.ts`.

## types/index.ts

- `QuestionType`: add `| "SGVL"`.
- `QuestionCategory`, under a `// Singapore taxi and private hire vocational licence` comment:

```ts
  | "sgvlRoadSafety"
  | "sgvlPassenger"
  | "sgvlInclusive"
  | "sgvlLicensing"
  | "sgvlConduct"
  | "sgvlFares"
  | "sgvlStopping"
  | "sgvlRoutes"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    sgvlRoadSafety: "On-the-Road Safety",
    sgvlPassenger: "Passenger Engagement & Handling",
    sgvlInclusive: "Passengers with Disabilities, Seniors & Children",
    sgvlLicensing: "Vocational Licences & Renewal",
    sgvlConduct: "Conduct Rules & Demerit Points (VLPS)",
    sgvlFares: "Bookings, Decals & Fares",
    sgvlStopping: "Pick-up, Set-down & Taxi Stands",
    sgvlRoutes: "Routes & Route Planning",
```

## app/globals.css

Hue from the international batch 4 table (290 55% 22%, already checked). Then run
`tools/gen_dark_brand_css.py`.

```css
  /* Singapore taxi and private hire vocational licence (TDVL / PDVL) theme */
  [data-theme="sgvl"] {
    --brand: 290 55% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 290 55% 96%;
    --brand-hover: 290 55% 17%;
    --brand-dark: 290 55% 16%;
    --brand-darker: 290 50% 10%;
    --brand-muted: 290 20% 70%;
    --brand-border: 290 20% 80%;
    --brand-border-light: 290 18% 89%;
    --brand-gradient-to: 295 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `sgvl: "Practice for Singapore's taxi and private hire car vocational licence test (TDVL and PDVL): road safety, passenger handling, licence rules and VLPS demerit points, bookings, decals, fares, pick-up rules and routes, in four 50-question mock tests with every answer explained.",`
- `EXAM_ORG`: `sgvl: "LTA (Land Transport Authority) · TDVL and PDVL e-test, Papers A to C",`
- Hub group: add `"sgvl"` to the existing `{ title: "Singapore licensing exams", ids: [...] }` (after
  `sgres` and `sgm5` if that is wired).
- `SEARCH_ALIASES`:
  `sgvl: "tdvl tdvl test pdvl pdvl test vocational licence singapore taxi vocational licence private hire vocational licence phv licence singapore grab driver licence gojek driver taxi driver test singapore pdvl exam tdvl exam vlps demerit points lta vocational licence course ptvl private hire car driver",`
- `RELATED_OVERRIDES`: `sgvl: ["ukseru", "iespsv", "sgbtt", "sgftt"],` (the Singapore licensing group is small and
  unrelated in topic; drop `iespsv` if it is not wired).

## lib/region.ts

`sgvl: "SG",` in `TEST_REGIONS`, and add `"sgvl"` to `NON_DRIVING_TESTS` (a licensing knowledge
test, not a driving theory test).

## lib/examFacts.ts

```ts
  sgvl: {
    answer:
      "In Singapore, anyone who drives a taxi or private hire car for hire needs a vocational licence from the Land Transport Authority (LTA): a Taxi Driver's Vocational Licence (TDVL), which covers taxis and private hire cars, or a Private Hire Car Driver's Vocational Licence (PDVL), which covers private hire cars only. Applicants must be Singapore Citizens aged at least 30 who have held a class 3 or 3A licence for more than a year. After LTA approves the application they attend the vocational licence course at an LTA-listed provider and sit an e-test at an LTA-appointed test centre: three papers on road safety and passenger engagement, rules and regulations, and routes. LTA does not publish the question count or pass mark. The licence is valid for three years.",
    rows: [
      { label: "Papers", value: "A: road safety and passengers; B: rules and regulations; C: routes" },
      { label: "Questions", value: "Not published" },
      { label: "Pass mark", value: "Not published; 80% is Tigertest's target" },
      { label: "Format", value: "E-test at an LTA-appointed test centre" },
      { label: "Before the test", value: "Vocational licence course (TDVL course 16 hours)" },
      { label: "Licence", value: "Valid three years; refresher course every six years" },
      { label: "Run by", value: "LTA (Land Transport Authority), Singapore" },
    ],
    basedOn: "LTA's OneMotoring vocational licence application and renewal pages and the course providers' published paper outlines, checked November 2026",
    source: { name: "OneMotoring (LTA): Vocational Licence Application", url: "https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/vocational_licence/vocational_licence_application.html" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Drivers sit the e-test at the end of the vocational licence course, so it is teacher-led (brief):
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"sgvl"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `sgvl: "the taxi or private hire car vocational licence course",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `sgvl: "driving",` (the car tiger, as `sgftt` borrows).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects,
the `car` icon exists.

## Country homepage `/sg`

`regionHeadline()` builds the lead from the hub groups, so the new group member shows by itself. The
integrator may widen REGION_HOME for SG to mention "the taxi and private hire car vocational licence
test (TDVL / PDVL)".

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 56, set 3).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing sgvl:singapore-vocational-licence:21801`

## CLAUDE.md (under Additional Exams, with the other international batch 4 exams)

```md
- **Singapore Vocational Licence** (`sgvl`, LTA taxi and private hire car driver's vocational licence test, TDVL / PDVL, `/singapore-vocational-licence/*`, landing `/singapore-vocational-licence-practice-test`): `data/singapore-vocational-licence-questions.json` (200 original questions across the three e-test papers: Paper A road safety 32, passenger engagement 32, passengers with disabilities, seniors and children 20; Paper B vocational licences and renewal 24, conduct rules and VLPS demerit points 32, bookings, decals and fares 24, pick-up, set-down and taxi stands 16; Paper C routes and route planning 20), test IDs 21801-21804, sets 21801-21804 (content sets: road safety and stopping 48, passengers 52, licences and demerit points 56, fares, bookings and routes 44), state `SGVL`, prefix `SGVL-`, 80% Tigertest's target (LTA lists three papers but publishes no count, time or pass mark). 8/8/5/6/8/6/4/5 per test (A 21, B 24, C 5, Tigertest's split). Rules from OneMotoring's VL pages (TDVL covers taxis and PHCs, PDVL PHCs only; three-year licence, refresher every six years, medical from 50, on-road assessment at 70, 73 and 74, age limit 75), the VLPS Rules 2017 as consolidated 30 Oct 2020 (24-month window; 6 to 10 points two weeks, 11 to 15 four, 16+ eight, over 20 revocation; 21-point offences) and LTA's PHC and point-to-point pages (street-hail for taxis only, PHC bookings through licensed or exempt operators, decals, no PHC boarding at taxi stands, child restraints under 1.35 m); no fares, fees or fines. Paper C street-directory lookups only partly modelled. Kept clear of `ukseru`, `iespsv`, `sgbtt` and `sgftt`. Built by `tools/next100/sgvl/build.py`; sources in `tools/next100/sgvl/sources.md`. Region SG, hub group "Singapore licensing exams", `[data-theme="sgvl"]` deep plum (290 55% 22%), borrows the car tiger, teacher-led (vocational licence course providers).
```
