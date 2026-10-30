# Wiring for `inrto` (India RTO learner's licence test, v1)

Files already written by the builder: `data/india-learners-licence-questions.json` (200, PASS),
`lib/banks/inrto.ts`, `app/india-learners-licence/*` (8 wrappers), `app/rto-learners-licence-test/page.tsx`,
`tools/global/inrto/*` (spec, sources, `q_*.py`, `build.py`). Everything below goes in shared files.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/india-learners-licence-questions.json --pool inrtoLicence=24 --pool inrtoMandatory=32 --pool inrtoCaution=28 --pool inrtoSignals=24 --pool inrtoRules=36 --pool inrtoParking=20 --pool inrtoSafety=20 --pool inrtoDuties=16`
-> letters 50/50/50/50, key-longest 10%, key>1.2x 10%, PASS.

This is the first exam for the new region `IN` (India). The integrator adds the region itself (`Region`
union, `REGIONS` entry, country detection, `REGION_HOME.IN` below).

## lib/exams.ts

Add `"inrto"` to the `ExamId` union. Icon `car` already exists.

Block (with the other non-US driving tests, e.g. after the AU learner tests):

```ts
const inrto: ExamConfig = {
  id: "inrto",
  stateCode: "INRTO",
  idBase: 10600,
  slug: "/india-learners-licence",
  landingPath: "/rto-learners-licence-test",
  name: "RTO Learner's Licence Practice Test",
  shortName: "LL Test",
  examLabel: "learner's licence test",
  fullName: "Learner's Licence (LL) Test, RTO / Sarathi Parivahan (India)",
  questionIdPrefix: "INRTO-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  // India's learner's licence test (checked October 2026). Written from the Motor Vehicles Act 1988 as
  // amended in 2019, the Central Motor Vehicles Rules 1989 (Rule 11: online tutorial, 60% to pass), the
  // Motor Vehicles (Driving) Regulations 2017 (which replaced the Rules of the Road Regulations 1989) and the road signs in the Act's schedule (mandatory, cautionary,
  // informatory). Each state sets the question count (Kerala 30, 18 to pass since Oct 2025; few states publish theirs),
  // so passPct is the central 60%. A draft of Oct 2026 proposes 75%; not in force.
  // No state publishes topic weights, so counts are ours, weighted to signs and the rules of the road.
  // Signs are described in words; no fine amounts (states may raise the 2019 minimums).
  blueprint: {
    inrtoLicence: 6,
    inrtoMandatory: 8,
    inrtoCaution: 7,
    inrtoSignals: 6,
    inrtoRules: 9,
    inrtoParking: 5,
    inrtoSafety: 5,
    inrtoDuties: 4,
  },
  trainingSets: testSets(10600, 4),
  categoryLabels: {
    inrtoLicence: "Licences, Learner Rules & Documents",
    inrtoMandatory: "Mandatory Road Signs",
    inrtoCaution: "Cautionary & Informatory Signs",
    inrtoSignals: "Traffic Lights, Hand Signals & Markings",
    inrtoRules: "Rules of the Road",
    inrtoParking: "Parking, Horn, Lights & Towing",
    inrtoSafety: "Helmets, Seat Belts, Alcohol & Phones",
    inrtoDuties: "Accidents, Insurance, PUC & RC",
  },
  copy: {
    guestPrompt: "to save your learner's licence progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions: road signs, traffic lights and hand signals, the rules of the road, parking, helmets and seat belts, and accident duties. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 60% to pass",
    heroSubs: [
      "Eight topics, four mock tests. Road signs are the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your LL test on Sarathi.",
    ],
    sourceLine: "Based on the Motor Vehicles Act 1988 (as amended in 2019), the Central Motor Vehicles Rules and the Motor Vehicles (Driving) Regulations 2017. Original questions; the test format varies by state, 60% to pass.",
    analyticsKey: "inrto",
  },
};
```

Append `inrto` to the `EXAMS` array (after the AU driving tests).

## lib/banks/all.ts

```ts
import "./inrto";
```
`lib/banks/inrto.ts` is already written.

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/inrto.ts`.

## types/index.ts

- `QuestionType`: add `| "INRTO"`.
- `QuestionCategory`, under a `// India RTO learner's licence` comment:

```ts
  | "inrtoLicence"
  | "inrtoMandatory"
  | "inrtoCaution"
  | "inrtoSignals"
  | "inrtoRules"
  | "inrtoParking"
  | "inrtoSafety"
  | "inrtoDuties"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    inrtoLicence: "Licences, Learner Rules & Documents",
    inrtoMandatory: "Mandatory Road Signs",
    inrtoCaution: "Cautionary & Informatory Signs",
    inrtoSignals: "Traffic Lights, Hand Signals & Markings",
    inrtoRules: "Rules of the Road",
    inrtoParking: "Parking, Horn, Lights & Towing",
    inrtoSafety: "Helmets, Seat Belts, Alcohol & Phones",
    inrtoDuties: "Accidents, Insurance, PUC & RC",
```

## app/globals.css

Suggested saffron, hue 26 (28 and 32 are close and taken, so re-pick if it clashes; 63 or 338 are alternatives).
Then run `tools/gen_dark_brand_css.py`.

```css
  /* India RTO learner's licence theme */
  [data-theme="inrto"] {
    --brand: 26 85% 45%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 26 90% 95%;
    --brand-hover: 26 85% 39%;
    --brand-dark: 26 80% 32%;
    --brand-darker: 26 75% 22%;
    --brand-muted: 26 50% 72%;
    --brand-border: 26 55% 80%;
    --brand-border-light: 26 50% 89%;
    --brand-gradient-to: 40 90% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `inrto: "Mock tests for India's RTO learner's licence (LL) test: mandatory, cautionary and informatory road signs, hand signals, keep left and overtaking rules, helmets, seat belts, PUC and insurance.",`
- `EXAM_ORG`: `inrto: "Learner's licence test · RTO / Sarathi Parivahan",`
- Hub group: a new India group, e.g. `{ title: "India driving tests", tests: [inrto] }` (the first IN exam; it leads the IN region's homepage through `orderGroupsForRegion`).
- `SEARCH_ALIASES`:
  `inrto: "rto exam questions rto test learner licence learners licence learning licence ll test llr test learner licence test questions sarathi parivahan mock test india driving licence test road signs india rto mock test two wheeler lmv",`
- `RELATED_OVERRIDES`: the group has only one test, so `inrto: ["moto", "aunsw", "ukcar"]` (or whatever driving tests the integrator prefers) until more IN exams exist.

## lib/region.ts

- `TEST_REGIONS`: `inrto: "IN",`
- It is a driving test: do NOT add it to `NON_DRIVING_TESTS`.
- `REGION_HOME.IN` (title 51 chars, description 146 chars), modelled on UK/CA/AU:

```ts
  IN: {
    title: "Free Indian Practice Tests: RTO LL Test | Tigertest",
    description: "Free RTO learner's licence (LL) test practice for India: 200 original questions on road signs and traffic rules, all explained. No account needed.",
    lead: "Practice for the learner's licence test at the RTO or online through Sarathi Parivahan. Original questions on road signs and the rules of the road, every answer explained. No signup.",
    cta: { label: "LL test practice", href: "/rto-learners-licence-test" },
    testsTitle: "Learner's licence test",
    testsSub: "200 questions from the Motor Vehicles Act and the Rules of the Road, in km/h for left-hand traffic. The test format varies by state.",
  },
```

## lib/examFacts.ts

```ts
  inrto: {
    answer:
      "The learner's licence (LL) test is a short computer-based multiple-choice test on road signs and traffic rules that you must pass to get a learner's licence in India. You apply through Sarathi Parivahan and, depending on the state, take it at the RTO or online from home after an Aadhaar check and a road safety tutorial. Each state sets the number of questions (Kerala, for example, asks 30), and the central rules set the pass mark at 60 percent. The learner's licence is valid for six months, and you can take the driving test after holding it for 30 days.",
    rows: [
      { label: "Format", value: "Computer-based multiple choice" },
      { label: "Questions", value: "Varies by state (Kerala 30)" },
      { label: "Pass mark", value: "60% (e.g. 18 of 30 in Kerala)" },
      { label: "Where", value: "At the RTO or online via Sarathi, by state" },
      { label: "Minimum age", value: "18 for a car; 16 for up to 50cc with consent" },
      { label: "LL validity", value: "6 months" },
      { label: "Driving test", value: "After holding the LL for 30 days" },
      { label: "Topics", value: "Road signs, rules of the road, safety, documents" },
    ],
    basedOn: "the Motor Vehicles Act 1988 as amended in 2019, the Central Motor Vehicles Rules and the Motor Vehicles (Driving) Regulations 2017, checked October 2026",
    source: { name: "Sarathi Parivahan (Ministry of Road Transport and Highways)", url: "https://sarathi.parivahan.gov.in/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## Road sign images (done)

`python3 -I tools/global/inrto/signs.py` draws 53 original signs to `public/signs/in/` (mandatory circles, cautionary
triangles, informatory blue rectangles, per the MV Act schedule; overtaking prohibited uses arrows). They are mapped by
questionId in `SIGN_BY_QUESTION_ID` (`lib/signImages.ts`) with visual-only alt text in `SIGN_DESCRIPTIONS`, and those
stems read "What does this sign mean?". MAN-025, MAN-026, MAN-032, CAU-018 and CAU-019 (group and shape questions) stay
in words. The bank validator skips the duplicate-stem check for questions with a sign image.

## lib/tigerAssets.ts, components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts

Nothing: tiger falls back to the DMV tiger, `car` icon exists, sitemaps map over `EXAMS`, no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing inrto:india-learners-licence:10601`

## CLAUDE.md (under Additional Exams)

```md
- **India LL test** (RTO learner's licence test, taken at the RTO or online via Sarathi Parivahan, `/india-learners-licence/*`, landing `/rto-learners-licence-test`): `data/india-learners-licence-questions.json` (200 questions: licences/learner rules 24, mandatory signs 32, cautionary and informatory signs 28, lights/hand signals/markings 24, rules of the road 36, parking/horn/lights/towing 20, helmets/seat belts/alcohol/phones 20, accidents/insurance/PUC/RC 16), test IDs 10601-10604, sets 10601-10604 (one per test), state `INRTO`, 60% pass (central CMVR mark; the question count varies by state, Kerala 30). 6/8/7/6/9/5/5/4 per test. Motor Vehicles Act as amended 2019, CMVR, Motor Vehicles (Driving) Regulations 2017 and the Act's sign schedule; left-hand traffic, km/h, signs described in words, no fine amounts. First exam of region `IN`. Built by `tools/global/inrto/build.py`; sources in `tools/global/inrto/sources.md`.
```
