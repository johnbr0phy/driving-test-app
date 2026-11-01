# Wiring for `grdriving` (Greece driving theory test, category B, v1)

Files already written by the builder: `data/greece-driving-questions.json` (200, PASS),
`lib/banks/grdriving.ts`, `app/greece-driving-theory/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/greece-driving-theory-test/page.tsx`, `tools/next100/grdriving/*`
(spec, sources, `q_*.py`, `build.py`). Rebuild with `python3 -I tools/next100/grdriving/build.py`.
Everything below goes in shared files.

Format note: guides and the Greek motoring press (not a ministry page; the ministry and
opengov.gr returned WAF/403 pages on 2026-11-01) describe the category B theory test as 30
multiple-choice questions in 35 minutes, pass at 29 of 30. Law 4850/2021 art. 6 confirms a
random draw from the Ministry's question bank and questionnaires in foreign languages. Tigertest
models six real-length 30-question tests at passPct 96 (ceil(0.96 x 30) = 29). Pools are 6x
each per-test count plus spares: 20 training-only items (the last of each pool by ID). Dashboard =
5 topic sets + 6 tests = 11 steps. No set exceeds 60. Test IDs 14101-14106, set IDs 14101-14105.

## lib/exams.ts

Add `"grdriving"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests, after `pkdrive` or with the EU batch):

```ts
const grdriving: ExamConfig = {
  id: "grdriving",
  stateCode: "GRDRIVE",
  idBase: 14100,
  slug: "/greece-driving-theory",
  landingPath: "/greece-driving-theory-test",
  name: "Greece Driving Theory Test Practice",
  shortName: "Greece theory test",
  examLabel: "Greek driving theory test",
  fullName: "Greece driving theory test (category B car)",
  questionIdPrefix: "GRDRV-",
  icon: "car",
  testCount: 6,
  questionsPerTest: 30,
  passPct: 96,
  // Greek category B theory test: random multiple-choice questionnaires from the Ministry of
  // Infrastructure and Transport's question bank, offered in foreign languages including English
  // (Law 4850/2021 art. 6). 30 questions, 35 minutes, pass at 29 of 30 per guides and the Greek
  // motoring press (gocar.gr, Feb 2025); not confirmed on a ministry page. No topic weights are
  // published; these are Tigertest's, signs and priority heaviest. Rules are the 2025 Highway
  // Code (Law 5209/2025: 30 km/h built-up default, 90/110/130 outside towns) as in force
  // 2026-11-01. Six real-length tests; pools are 6x each count plus 20 training-only spares.
  // passPct 96 = ceil(0.96 * 30) = 29. All items original; signs described in words.
  blueprint: {
    grLicence: 3,
    grWarning: 4,
    grRegulatory: 4,
    grInfo: 4,
    grPriority: 4,
    grSpeed: 4,
    grParking: 3,
    grSafety: 2,
    grEmergency: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 14101, name: "Warning Signs", categories: ["grWarning"], size: 26, weightLabel: "4 of 30 test questions" },
    { setNumber: 2, id: 14102, name: "Priority & Regulatory Signs", categories: ["grRegulatory"], size: 26, weightLabel: "4 of 30 test questions" },
    { setNumber: 3, id: 14103, name: "Markings, Signals & Junctions", categories: ["grInfo", "grPriority"], size: 52, weightLabel: "8 of 30 test questions" },
    { setNumber: 4, id: 14104, name: "Speed, Overtaking & Parking", categories: ["grSpeed", "grParking"], size: 46, weightLabel: "7 of 30 test questions" },
    { setNumber: 5, id: 14105, name: "Licences, Safety & Emergencies", categories: ["grLicence", "grSafety", "grEmergency"], size: 50, weightLabel: "7 of 30 test questions" },
  ],
  categoryLabels: {
    grLicence: "Licences, Alcohol & the Law",
    grWarning: "Warning Signs",
    grRegulatory: "Priority, Prohibition & Mandatory Signs",
    grInfo: "Information Signs, Markings & Signals",
    grPriority: "Junctions, Roundabouts & Priority",
    grSpeed: "Speed, Distances & Overtaking",
    grParking: "Parking & Sharing the Road",
    grSafety: "Vehicle, Passengers & Safe Driving",
    grEmergency: "Night, Weather, Motorways & Emergencies",
  },
  copy: {
    guestPrompt: "to save your Greek theory test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the Greek Highway Code and road signs, in English. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 30 questions, 29 to pass",
    heroSubs: [
      "Five topics, six real-length tests. One mistake is all you can afford.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Ask your driving school to book your theory test.",
    ],
    sourceLine: "Based on the Greek Highway Code (2025) and Greek road signs. Original questions in English; 30 per test, 29 to pass as guides report.",
    analyticsKey: "grdriving",
  },
};
```

Append `grdriving` to the `EXAMS` array with the other driving tests.

Check: 14101-14106 (tests) and 14101-14105 (sets) must be free (BRIEF reserves idBase 14100).
`getExamForTestId`/`getExamForSetId` are range checks, so six tests are fine.

## lib/banks/all.ts

```ts
import "./grdriving";
```

## types/index.ts

- `QuestionType`: add `| "GRDRIVE"`.
- `QuestionCategory`, under a `// Greece driving theory` comment (none of these keys exist yet;
  grep found no `"gr[A-Z]` keys):

```ts
  | "grLicence"
  | "grWarning"
  | "grRegulatory"
  | "grInfo"
  | "grPriority"
  | "grSpeed"
  | "grParking"
  | "grSafety"
  | "grEmergency"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    grLicence: "Licences, Alcohol & the Law",
    grWarning: "Warning Signs",
    grRegulatory: "Priority, Prohibition & Mandatory Signs",
    grInfo: "Information Signs, Markings & Signals",
    grPriority: "Junctions, Roundabouts & Priority",
    grSpeed: "Speed, Distances & Overtaking",
    grParking: "Parking & Sharing the Road",
    grSafety: "Vehicle, Passengers & Safe Driving",
    grEmergency: "Night, Weather, Motorways & Emergencies",
```

## app/globals.css

The brief's 210 60% 40% clashes (within 8 degrees, under 15 saturation and 8 lightness apart)
with cdlx 205 70% 38%, osha 205 55% 38%, sbipo 212 70% 46% and sie 204 60% 43%. I ran the hue
checker over every theme plus the other nine EU suggestions: no blue from 195 to 230 at 30-48%
lightness passes. The nearest free Greek blue is **238 85% 34%** (deep Aegean ultramarine,
white text 9.6:1). Integrator settles. Then run `tools/gen_dark_brand_css.py` once.

```css
  /* Greece driving theory theme */
  [data-theme="grdriving"] {
    --brand: 238 85% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 238 70% 96%;
    --brand-hover: 238 85% 29%;
    --brand-dark: 238 85% 26%;
    --brand-darker: 238 80% 18%;
    --brand-muted: 238 35% 70%;
    --brand-border: 238 40% 80%;
    --brand-border-light: 238 35% 90%;
    --brand-gradient-to: 215 60% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `grdriving: "Six 30-question mock tests in English for the Greek category B driving theory test: warning, priority and regulatory signs, markings, priority from the right and roundabouts, the 2025 Highway Code speed limits, overtaking, parking, alcohol limits and emergencies.",`
- `EXAM_ORG`: `grdriving: "Ministry of Infrastructure and Transport · Transport Directorate theory test",`
- Hub group, new (with the other EU batch groups): `{ title: "Greece driving tests", ids: ["grdriving"] },`
  (or one shared "EU driving theory tests" group if the integrator prefers). With one member, add
  `RELATED_OVERRIDES`: `grdriving: ["mttheory", "esdgt", "ukcar"],` (swap in any EU sibling that ships).
- `SEARCH_ALIASES`:
  `grdriving: "greece driving theory test greek driving test in english greek driving licence theory exam category b greece kok highway code greece diploma odigisis δίπλωμα οδήγησης θεωρητικές εξετάσεις theory test athens thessaloniki crete greek road signs expat driving licence greece",`

## lib/region.ts (new region GR, follow how PK was added)

- `Region` union: add `| "GR"`.
- `REGIONS`: `{ code: "GR", name: "Greece", short: "GR", inName: "Greece" },`
- `regionFromCountry`: `case "GR": return "GR";`
- `REGION_HREFLANG`: `GR: "en-GR"`
- `TEST_REGIONS`: `grdriving: "GR",` (a driving test, so NOT in `NON_DRIVING_TESTS`).
- `REGION_HOME`:

```ts
  GR: {
    title: "Free Greece Driving Theory Test Practice in English | Tigertest",
    description: "Free Greek driving theory test practice in English: 200 original category B questions on the Greek Highway Code and road signs, every answer explained. No account needed.",
    lead: "Practice in English for the category B theory test before your Greek driving licence. Original questions on Greek road signs, priority, the 2025 Highway Code and safe driving, every answer explained. No signup.",
    cta: { label: "Greek theory test", href: "/greece-driving-theory-test" },
    testsTitle: "Driving theory test (category B)",
    testsSub: "200 questions on the Greek Highway Code, in km/h for right-hand traffic. Six full 30-question tests, 29 to pass.",
  },
```

## components/home/HomePage.tsx (`faqsFor` via `AUTHORITY`)

```ts
  GR: "the Ministry of Infrastructure and Transport or any Transport Directorate",
```

Also: `app/gr/page.tsx` (copy `app/pk/page.tsx`), middleware country mapping, sitemap and
`llms.txt` lines, and the funnel `visit_region_GR` key if the integrator extends that list.

## lib/examFacts.ts

```ts
  grdriving: {
    answer:
      "The Greek driving theory test is a computer-based multiple-choice test taken at a Transport Directorate exam centre before the practical driving test. Its questions are drawn at random from the Ministry of Infrastructure and Transport's question bank, and Greek law makes the questionnaires available in foreign languages, English among them, as well as in Greek with audio and in Greek Sign Language. Guides describe the category B test as 30 questions in 35 minutes with a pass at 29 correct. You train through a licensed driving school; a full licence is issued at 18, and since 2021 a 17-year-old who passes can drive accompanied on a provisional licence.",
    rows: [
      { label: "Run by", value: "Ministry of Infrastructure and Transport (Transport Directorates)" },
      { label: "Format", value: "Multiple choice on a computer, random draw from the question bank" },
      { label: "Questions and time", value: "30 questions, 35 minutes (as guides report)" },
      { label: "Pass mark", value: "29 of 30 (as guides report)" },
      { label: "Languages", value: "Greek, English and other foreign languages; Greek with audio; Greek Sign Language" },
      { label: "Minimum age (category B)", value: "18, or 17 for accompanied driving" },
      { label: "Rules tested", value: "Greek Highway Code (Law 5209/2025) and road signs" },
      { label: "Tigertest mock tests", value: "6 x 30 questions, 29 to pass" },
    ],
    basedOn: "The Ministry of Infrastructure and Transport's computer theory test page, Law 4850/2021 article 6, the 2025 Highway Code (Law 5209/2025) and Greek motoring press on the test format, checked November 2026",
    source: { name: "Ministry of Infrastructure and Transport: computer theory test (ΜΣΘΕΥΟ)", url: "https://www.yme.gov.gr/metafores/adeies-odigisis/theoritiki-exetasi-ypopsifion-odigon-meso-i-y-mstheyo" },
  },
```
(Reviewer, 2026-11-01: the ministry's theory test page loads and confirms a computer test with a
random questionnaire per candidate and shuffled answer order; it gives no count, time or pass
mark, so those stay "as guides report".)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

Optionally add `grdriving` to `BORROWED_SETS` with the DMV set like the other car tests.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing for the exam: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no
redirects. (The `/gr` country page needs its own sitemap line, see the region section.)

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing grdriving:greece-driving-theory:14101`

## CLAUDE.md (after the Pakistan bullet under International driving tests)

```md
- **Greece Driving Theory** (Greek category B driving theory test, in English, `/greece-driving-theory/*`, landing `/greece-driving-theory-test`): `data/greece-driving-questions.json` (200 original questions on the Greek Highway Code (Law 5209/2025) and road signs: licences/alcohol/law 20, warning signs 26, priority/prohibition/mandatory signs 26, information signs/markings/signals 26, junctions/roundabouts/priority 26, speed/distances/overtaking 26, parking and sharing the road 20, vehicle/passengers/safe driving 14, night/weather/motorways/emergencies 16), six real-length tests: test IDs 14101-14106 (30 questions each), sets 14101-14105 (by topic), state `GRDRIVE`, prefix `GRDRV-`, 96% pass (29 of 30, the format guides and the Greek motoring press report: 30 questions, 35 minutes; Law 4850/2021 art. 6 confirms the Ministry's random question bank and foreign-language questionnaires). 3/4/4/4/4/4/3/2/2 per test; the last items of each pool (20 in all) are training-only. Right-hand traffic, priority from the right where nothing is signed (including an unsigned roundabout; a give way sign at the entry gives circulating traffic priority), 30 km/h built-up default from 1 January 2026 (50 on one-way streets with two marked lanes and on roads with two marked lanes each way or a central island), 90/110/130 outside towns, 0.5 g/l and 0.2 g/l for novices; no fines or points. Signs are described in words. Built by `tools/next100/grdriving/build.py`; sources in `tools/next100/grdriving/sources.md`. Region GR (its first exam, homepage `/gr`), hub group "Greece driving tests".
```
