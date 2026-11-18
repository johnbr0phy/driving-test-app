# Wiring for `cadronebasic` (Transport Canada Small Basic Exam, drone pilot basic operations, CA, v1)

Files already written by the builder: `data/canada-drone-basic-questions.json` (200, PASS),
`lib/banks/cadronebasic.ts`, `app/canada-drone-basic/*` (layout, redirect, dashboard, drill,
stats, copied from `app/nz-drone-part-101/`; no test or practice folders),
`app/canada-drone-basic-exam-practice-test/page.tsx` (copied from the nzdrone landing, same
classes and sections), `tools/build-run-2026-11-18/cadronebasic/*` (sources.md, `q_*.py`,
`build.py`, this file). Everything below goes in shared files.

Rebuild: `python3 -I tools/build-run-2026-11-18/cadronebasic/build.py`, then validate:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/canada-drone-basic-questions.json --pool cdrLaw=28 --pool cdrRules=32 --pool cdrAirspace=28 --pool cdrSystems=24 --pool cdrHuman=24 --pool cdrWeather=24 --pool cdrNav=18 --pool cdrFlightOps=22`

Format: five real-length tests of 35 (like the real exam; the nzroad pattern), pools are 5x each
per-test count plus 25 training-only spares (3/2/3/4/4/4/3/2 at the end of each pool). Four topic
sets (56/50/48/46), 9 dashboard steps. Premium by the v1 default. Not teacher-led.

Slug and landing confirmed unused (`grep -rn canada-drone app lib` empty on 2026-11-18). idBase
35000: tests 35001-35005, sets 35001-35004.

## lib/exams.ts

Add `"cadronebasic"` to the `ExamId` union. Icon `plane` exists (nzdrone, part107). Add before
`const htl` and append `cadronebasic` to `EXAMS` (after `crfsc` or next to `nzdrone`).

```ts
const cadronebasic: ExamConfig = {
  id: "cadronebasic",
  stateCode: "CADRONE",
  idBase: 35000,
  slug: "/canada-drone-basic",
  landingPath: "/canada-drone-basic-exam-practice-test",
  name: "Canada Drone Basic Exam Practice Test",
  shortName: "Drone Basic (Canada)",
  examLabel: "Small Basic Exam",
  fullName: "Transport Canada Small Basic Exam (Pilot Certificate - Basic Operations)",
  questionIdPrefix: "CADRONE-",
  icon: "plane",
  testCount: 5,
  questionsPerTest: 35,
  passPct: 65,
  // Transport Canada Small Basic Exam page (modified 2025-11-04, checked 2026-11-18): 35 multiple-
  // choice questions, 90 minutes, 65% to pass, age 14, questions based on TP 15263 (Fourth Edition,
  // 03/2025). TC publishes no per-topic counts; these follow the topics TP 15263 marks "Basic":
  // air law and registration 5, Part IX operating rules 6, airspace and aerodromes 5, RPAS systems
  // 4, human factors 4, meteorology 4, navigation and time 3, flight operations and theory of
  // flight 4. Five real-length tests; pools are 5x each count plus 25 training-only spares.
  // passPct 65 = ceil(0.65 * 35) = 23. Rules as in force on 2026-11-18, after SOR/2025-70 (in force
  // 1 April and 4 November 2025). All items original.
  blueprint: {
    cdrLaw: 5,
    cdrRules: 6,
    cdrAirspace: 5,
    cdrSystems: 4,
    cdrHuman: 4,
    cdrWeather: 4,
    cdrNav: 3,
    cdrFlightOps: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 35001, name: "Air Law & Airspace", categories: ["cdrLaw", "cdrAirspace"], size: 56, weightLabel: "10 of 35 test questions" },
    { setNumber: 2, id: 35002, name: "Operating Rules & Navigation", categories: ["cdrRules", "cdrNav"], size: 50, weightLabel: "9 of 35 test questions" },
    { setNumber: 3, id: 35003, name: "Drone Systems & Weather", categories: ["cdrSystems", "cdrWeather"], size: 48, weightLabel: "8 of 35 test questions" },
    { setNumber: 4, id: 35004, name: "Human Factors & Flight Ops", categories: ["cdrHuman", "cdrFlightOps"], size: 46, weightLabel: "8 of 35 test questions" },
  ],
  categoryLabels: {
    cdrLaw: "Air Law, Registration & Certificates",
    cdrRules: "General Operating Rules",
    cdrAirspace: "Airspace & Aerodromes",
    cdrSystems: "Drone Systems & Batteries",
    cdrHuman: "Human Factors",
    cdrWeather: "Meteorology",
    cdrNav: "Navigation, Charts & Time",
    cdrFlightOps: "Flight Operations & Emergencies",
  },
  copy: {
    guestPrompt: "to save your drone exam progress and track every question you miss",
    trainingHeading: "Train by TP 15263 topic",
    trainingSub: "Four sets covering every topic Transport Canada marks for basic operations: air law and airspace, operating rules and navigation, drone systems and weather, and human factors and flight operations. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock exams · 35 questions like the real Small Basic Exam",
    heroSubs: [
      "Four training sets, five real-length mock exams. Start with Air Law & Airspace.",
      "Master each set, then take a mock exam.",
      "Keep going. Take a mock exam to see where you stand.",
      "Review your mistakes, then retake any mock exam you haven't passed.",
      "All done. Book your Small Basic Exam in the Drone Management Portal.",
    ],
    sourceLine: "Based on CARs Part IX, TP 15263 and the TC AIM. Original questions; 35 per test like the real exam. Not affiliated with Transport Canada.",
    analyticsKey: "cadronebasic",
  },
};
// IDs: tests 35001-35005, sets 35001-35004 (block 35000 assigned for this run).
```

## lib/banks/all.ts

`import "./cadronebasic";`

## types/index.ts

- `QuestionType`: add `"CADRONE"`.
- `QuestionCategory` (comment `// Transport Canada Small Basic Exam (cadronebasic)`):
  `"cdrLaw" | "cdrRules" | "cdrAirspace" | "cdrSystems" | "cdrHuman" | "cdrWeather" | "cdrNav" | "cdrFlightOps"`
  (grepped: no `cdr*` key exists in `types/index.ts` or this run's other builders' files.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    cdrLaw: "Air Law, Registration & Certificates",
    cdrRules: "General Operating Rules",
    cdrAirspace: "Airspace & Aerodromes",
    cdrSystems: "Drone Systems & Batteries",
    cdrHuman: "Human Factors",
    cdrWeather: "Meteorology",
    cdrNav: "Navigation, Charts & Time",
    cdrFlightOps: "Flight Operations & Emergencies",
```

## app/globals.css

Suggested hue 287 45% 34%, muted twilight violet (white text 8.7:1; checked against every
`--brand` in `app/globals.css` and this run's other WIRING.md files with the clash rule on
2026-11-18: the blues, teals and reds near aviation and Canada colours are all taken). Re-check
against anything merged since. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Transport Canada Small Basic Exam (drone) theme: twilight violet */
  [data-theme="cadronebasic"] {
    --brand: 287 45% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 287 40% 95%;
    --brand-hover: 287 45% 28%;
    --brand-dark: 287 45% 22%;
    --brand-darker: 287 40% 14%;
    --brand-muted: 287 20% 70%;
    --brand-border: 287 25% 80%;
    --brand-border-light: 287 25% 89%;
    --brand-gradient-to: 302 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `cadronebasic: "Practice Transport Canada's Small Basic Exam for the drone pilot certificate (basic operations): registration and recency, the 30 m and 122 m limits, airspace, airports and heliports, weather, human factors, drone systems and emergencies, in five 35-question tests.",`
- `EXAM_ORG`: `cadronebasic: "Transport Canada · Small Basic Exam, TP 15263 and CARs Part IX",`
- Hub group: no Canada group fits a pilot licence exactly. Put `"cadronebasic"` in **"Canada
  trades and workplace certificates"** after `"crfsc"` (the Canadian licence group: firearms
  licences, guard licences). Alternative if the integrator prefers subject over country:
  "Aviation, radio & trade licenses" after `"part107"` (that group is US-led). The integrator
  should put Canada Amateur Radio Basic (`cahambasic`, same run) in the same group.
- `SEARCH_ALIASES`:
  `cadronebasic: "drone licence canada drone license canada canadian drone licence canada drone test transport canada drone exam drone exam canada small basic exam basic drone exam basic drone certificate pilot certificate basic operations rpas basic exam tp 15263 cars part ix drone pilot certificate canada drone management portal exam",`
- `tests/test-search-aliases.test.cjs` cases to add:
  `["drone licence canada", "CA", "cadronebasic"], ["small basic exam", "CA", "cadronebasic"], ["transport canada drone exam", "CA", "cadronebasic"],`
  Check "drone license" from the US still finds `part107` first (region ranking should do it).
- `RELATED_OVERRIDES`: `cadronebasic: ["part107", "nzdrone", "capal"],` (the Canada group's other
  members are trades; these are the closest tests).

## lib/region.ts

`TEST_REGIONS`: `cadronebasic: "CA",`

## lib/tigerAssets.ts

`BORROWED_SETS`: `cadronebasic: "part107",` (the drone tiger, like nzdrone).

## lib/examFacts.ts

```ts
  cadronebasic: {
    answer:
      "In Canada, anyone flying a drone that weighs 250 g to 25 kg needs a pilot certificate from Transport Canada, and the drone must be registered and marked. The Pilot Certificate - Basic Operations comes from passing the Small Basic Exam online in Transport Canada's Drone Management Portal: 35 multiple-choice questions in 90 minutes, with 65% or higher to pass, open to people 14 and older. Questions are based on Transport Canada's knowledge requirements document TP 15263. A basic certificate covers flights in uncontrolled airspace, at least 30 m horizontally from people not involved, below 122 m (400 ft) above ground and outside 3 nautical miles of an airport and 1 nautical mile of a heliport. Flying in controlled airspace or near people needs the advanced certificate. The certificate does not expire, but pilots must show recent activity within 24 months.",
    rows: [
      { label: "Questions", value: "35 multiple choice" },
      { label: "Time", value: "90 minutes" },
      { label: "Pass mark", value: "65%" },
      { label: "Minimum age", value: "14" },
      { label: "Based on", value: "TP 15263 (Fourth Edition, March 2025) and CARs Part IX" },
      { label: "Where", value: "Online, Transport Canada Drone Management Portal, English or French" },
      { label: "Retakes", value: "After a 24-hour wait, as often as needed" },
      { label: "Certificate", value: "Does not expire; 24-month recency rule" },
      { label: "Run by", value: "Transport Canada" },
    ],
    basedOn: "Transport Canada's Small Basic Exam page and TP 15263, and CARs Part IX as amended by SOR/2025-70, checked November 2026",
    source: { name: "Transport Canada: Small Basic Exam", url: "https://tc.canada.ca/en/aviation/drone-safety/drone-pilot-licensing/take-drone-pilot-online-exam/small-basic" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date, comment naming `cadronebasic`.

## TEACHER_LED / TEACHES

None (self-study online exam; flight schools exist but the exam is not class-led).

## lib/examFreshness.json

```json
    {
      "exam": "cadronebasic",
      "date": "2025-11-04",
      "kind": "law",
      "what": "SOR/2025-70 amended CARs Part IX in two stages (1 April and 4 November 2025): Level 1 Complex certificate and lower-risk BVLOS, medium RPA to 150 kg, sheltered and EVLOS for advanced pilots, basic operations redefined as uncontrolled airspace and 30 m at any altitude, micro drones at advertised events need an SFOC.",
      "action": "Bank written to the amended rules; re-check basic-operation items (CADRONE-LAW, -OPS, -AIR) against any further Part IX amendment or a new TP 15263 edition.",
      "source": "https://gazette.gc.ca/rp-pr/p2/2025/2025-03-26/html/sor-dors70-eng.html",
      "done": "2026-11-18"
    },
```

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. No set exceeds 60 (largest 56), so no parts.

## lib/examSources.json

Run `python3 -I tools/build_exam_sources.py` (sources.md is in place; the first three URLs are
the TC exam page, TP 15263 and the TC certificate page).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing cadronebasic:canada-drone-basic:35001`

## CLAUDE.md (under Additional Exams, after the NZ Drone (Part 101) bullet)

```md
- **Canada Drone Basic** (`cadronebasic`, Transport Canada's Small Basic Exam for the Pilot Certificate - Basic Operations, drones 250 g to 25 kg, `/canada-drone-basic/*`, landing `/canada-drone-basic-exam-practice-test`): `data/canada-drone-basic-questions.json` (200 original questions on the topics TP 15263 (Fourth Edition, March 2025) marks for basic operations, with CARs Part IX as amended by SOR/2025-70 (in force 1 April and 4 November 2025): air law, registration and certificates (250 g registration, marking on the main body, owner at 14, 7-day notices, 60 days missing, certificate at 14 and the basic exam, direct supervision under 14, 24-month recency and its records, no expiry, indoor flights outside the CARs, Aeronautics Act aerodrome, airport certificate, peace officer demands, small and medium weight classes, weapons need an SFOC, PIPEDA) 28, general operating rules (30 m at any altitude, people in cars and buildings not counted, 122 m AGL and 30 m above a structure within 61 m, unaided VLOS, visual observers and FPV, observers need no certificate, procedures, site survey, maximum distance, pilot intervention, critical surfaces, formation, five aircraft, advertised events, handovers, no ELT, transponder airspace, records 12 and 24 months, CAR 901.49, payloads on a line, night lights, security perimeters, crew follow the pilot, give way, carriage of persons) 32, airspace and aerodromes (uncontrolled airspace only, Class F, CYR and CYA, Class C, D to E, Class E at 700 ft, 3 NM airport, 1 NM heliport, DND 3 NM, Reg/Cert/Mil, forest fires 5 NM below 3,000 ft, notifying ATS or the user agency, NOTAM decisions, Aeronautics Act 5.1, DAH 56 days, NRC site tool colours, aerodrome operators, Canadian Domestic Airspace, the Saguenay-St. Lawrence Marine Park 2,000 ft rule, bird sanctuaries, Class A) 28, drone systems and batteries (RPAS parts, 2.4 GHz, radio line-of-sight, Fresnel zone 40%, multipath, antennas, EMI, 4 satellites, 75 ft GPS altitude error, northern latitudes, compass calibration distances, IMU, barometer zeroed at launch, ESC, outrunners, Kv x voltage, C-rating, cold limits, LiPo power drop, payload, IP ratings, launchers) 24, human factors (12 hours alcohol, 28 days cannabis, IM SAFE and its 24-hour rest check, dark adaptation, empty field myopia, refocusing, block scan, fovea, CO, the four hazardous attitudes asked, Reason's model and its five layers, automation, CRM, decision steps, sterile environment, fatigue, diving) 24, meteorology (radiation, ice, steam and frontal fog, katabatic, anabatic, lake breezes, mechanical turbulence, lee waves, stability, air mass thunderstorms, mature stage, 15 NM advice, rime ice, icing conditions, freezing rain, Beaufort scale, wind direction, urban airflow, micro climate, space weather, density) 24, navigation, charts and time (Z, UTC offsets, 24-hour time, nautical and statute miles, map scale, VNC 1:500 000, CFS, ASL from launch height, civil twilight, 126.7 MHz, ROC-A, aircraft lights, position reports, variation) 18, flight operations and emergencies (CAR 901.23 list, flyaway, flight termination systems, lost-link checks, RTH from a boat, losing sight, full inspections, drag, four forces, angle of attack, stall, induced drag, load factor at 45 degrees, turn radius, multirotor control, fixed-wing, vortex ring state, dynamic rollover, motor failure, tethered drones, marine mammals) 22), five real-length tests: test IDs 35001-35005 (35 questions each), sets 35001-35004 (by topic: Air Law & Airspace 56, Operating Rules & Navigation 50, Drone Systems & Weather 48, Human Factors & Flight Ops 46), state `CADRONE`, prefix `CADRONE-`, 65% pass (23 of 35, like the real exam: 35 questions in 90 minutes, 65% to pass, age 14, online in the Drone Management Portal in English or French, 24-hour wait after a fail). 5/6/5/4/4/4/3/4 per test, Tigertest's split over the TP 15263 topics marked Basic (TC publishes no weights); the last items of each pool (25 in all) are training-only. Advanced, Level 1 Complex and BVLOS rules only as the edge of basic operations; no fines or fees; TSB thresholds and lapse rates (sources disagree) not asked. Kept clear of the `part107`, `nzdrone` and `faapvt` banks (items that matched them on VLOS glasses, the uncontrolled class, advection fog, registration marking and the 60-degree load factor were rewritten). Built by `tools/build-run-2026-11-18/cadronebasic/build.py`; sources in `tools/build-run-2026-11-18/cadronebasic/sources.md`. Region CA, hub group "Canada trades and workplace certificates" (after crfsc), `[data-theme="cadronebasic"]` twilight violet (287 45% 34%), borrows the Part 107 tiger, not teacher-led.
```
