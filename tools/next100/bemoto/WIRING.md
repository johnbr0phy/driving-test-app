# Wiring for `bemoto` (Belgium motorcycle theory exam, categories A1, A2 and A, v1)

Files already written by the builder: `data/belgium-motorcycle-questions.json` (200, PASS),
`lib/banks/bemoto.ts`, `app/belgium-motorcycle-theory/*` (5 wrappers: layout, redirect,
dashboard, drill, stats, copied from `app/belgium-driving-theory/`; no test or practice folders),
`app/belgium-motorcycle-theory-test/page.tsx` (renders `ExamSampleQuestions`),
`tools/next100/bemoto/*` (spec, sources, `q_*.py`, `build.py`).
Rebuild with `python3 -I tools/next100/bemoto/build.py`. Everything below goes in shared files.

Format note: the motorcycle theory exam (A1, A2, A) is separate from the B exam: 50 multiple-choice
questions on a computer, 41/50 to pass, pass valid 3 years (be.brussels A1/A2/A page; Touring guide
updated 6 Feb 2026). Brussels: Dutch or French, English or German only in booked sessions with an
interpreter appointed by the centre; sit from 17 years 9 months. Flanders: sit from 17y9m (A1),
19y9m (A2), 23y9m (A). Exempt from the A theory exam with A2 held 2 years (and from A2 theory with
A1 held 2 years, Brussels). No official page confirms the B exam's 5-point serious faults or the
English audio translation for category A, so neither is claimed for A. Tigertest models four
50-question tests at 82% (41 of 50). Pools are exactly 4x each per-test count (no spares).
Dashboard = 5 topic sets + 4 tests = 9 steps. No set exceeds 60. Tests 25701-25704 and sets
25701-25705 share the block like bedriving's.

## lib/exams.ts

Add `"bemoto"` to the `ExamId` union. Icon `bike` already exists.

Block (with the other EU driving tests, right after `bedriving`):

```ts
const bemoto: ExamConfig = {
  id: "bemoto",
  stateCode: "BEMOTO",
  idBase: 25700,
  slug: "/belgium-motorcycle-theory",
  landingPath: "/belgium-motorcycle-theory-test",
  name: "Belgium Motorcycle Theory Practice Test",
  shortName: "Belgium motorcycle theory",
  examLabel: "Belgian motorcycle theory exam",
  fullName: "Belgium motorcycle theory exam, categories A1, A2 and A",
  questionIdPrefix: "BEMOTO-",
  icon: "bike",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 82,
  // Source: the Belgian Highway Code (Royal Decree of 1 December 1975, consolidated text on
  // codedelaroute.be: art. 9.3.2 lane position, 16.2bis filtering, 30bis lights, 35.1.1 children,
  // 36 helmet and clothing, 43ter groups, 44 passengers, 46 loads) and the licence categories
  // (be.brussels A1/A2/A page, vlaanderen.be, Autosécurité category A guide 02/2026; checked
  // 2026-11-07). The motorcycle theory exam is 50 questions, 41/50 to pass, in all three regions;
  // passPct 82 = 41/50. No region publishes topic weights, so the blueprint is Tigertest's own,
  // rider-specific topics first. Pools are exactly 4x each count (no spares). Original, British English.
  blueprint: {
    bmLicence: 4,
    bmGear: 5,
    bmControl: 6,
    bmPosition: 6,
    bmPassenger: 4,
    bmPriority: 6,
    bmSigns: 6,
    bmSpeed: 5,
    bmRoad: 5,
    bmParking: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 25701, name: "Licence, Gear & Passengers", categories: ["bmLicence", "bmGear", "bmPassenger"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 25702, name: "Braking, Cornering & Road Hazards", categories: ["bmControl", "bmRoad"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 25703, name: "Road Position, Speed & Overtaking", categories: ["bmPosition", "bmSpeed"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 4, id: 25704, name: "Priority, Lights & Parking", categories: ["bmPriority", "bmParking"], size: 36, weightLabel: "9 of 50 test questions" },
    { setNumber: 5, id: 25705, name: "Road Signs for Riders", categories: ["bmSigns"], size: 24, weightLabel: "6 of 50 test questions" },
  ],
  categoryLabels: {
    bmLicence: "Licence Categories, Learners & Fitness",
    bmGear: "Protective Gear & Motorcycle Checks",
    bmControl: "Braking, Cornering & Control",
    bmPosition: "Road Position, Filtering & Group Riding",
    bmPassenger: "Passengers, Children & Loads",
    bmPriority: "Priority & Junctions",
    bmSigns: "Road Signs for Riders",
    bmSpeed: "Speed Limits, Overtaking & Motorways",
    bmRoad: "Road Surface, Weather & Hazards",
    bmParking: "Lights, Parking & Breakdowns",
  },
  copy: {
    guestPrompt: "to save your motorcycle theory progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the Belgian Highway Code for motorcyclists, tested in Flanders, Wallonia and Brussels alike. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, pass at 41",
    heroSubs: [
      "Five topics, four 50-question tests. Rider rules weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your motorcycle theory exam.",
    ],
    sourceLine: "Based on the Belgian Highway Code for motorcyclists. Original questions in English; 50 per test, 41 to pass like the real exam.",
    analyticsKey: "bemoto",
  },
};
```

Append `bemoto` to the `EXAMS` array right after `bedriving`.

Check: 25701-25705 (sets) and 25701-25704 (tests) must be free (the queue reserves idBase 25700;
grep of `lib/exams.ts` and `tools/next100/*/spec.json` found nothing at 257xx on 2026-11-07).

## lib/banks/all.ts

```ts
import "./bemoto";
```

## types/index.ts

- `QuestionType`: add `| "BEMOTO"`.
- `QuestionCategory`, under a `// Belgium motorcycle theory` comment:

```ts
  | "bmLicence"
  | "bmGear"
  | "bmControl"
  | "bmPosition"
  | "bmPassenger"
  | "bmPriority"
  | "bmSigns"
  | "bmSpeed"
  | "bmRoad"
  | "bmParking"
```

(`bm` was grepped against `types/index.ts` and every `tools/next100/*/spec.json`: no clash.
Siblings betoelating, bevracht and befsmavz should use other prefixes.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five; the others fall back)

```ts
    bmLicence: "Licence Categories, Learners & Fitness",
    bmGear: "Protective Gear & Motorcycle Checks",
    bmControl: "Braking, Cornering & Control",
    bmPosition: "Road Position, Filtering & Group Riding",
    bmPassenger: "Passengers, Children & Loads",
    bmPriority: "Priority & Junctions",
    bmSigns: "Road Signs for Riders",
    bmSpeed: "Speed Limits, Overtaking & Motorways",
    bmRoad: "Road Surface, Weather & Hazards",
    bmParking: "Lights, Parking & Breakdowns",
```

## app/globals.css

The suggested `30 70% 30%` clashes (within 8 degrees needs 15 points of saturation or 8 of
lightness) with upscse 28 65% 30%, ctet 22 80% 28% and cawhmis 37 62% 30%; 30 to 33 at any useful
saturation also hit itil, jelec, phrebroker, nzfirearms and pending ptcam/escapcond. A script over
`app/globals.css` plus every pending `tools/next100/*/WIRING.md` theme on 2026-11-07 found
**21 65% 22%** (deep rust brown) clear of all of them; white text on it is about 11:1. Lightness 22%
is under the 30 to 48% band (as nzfirearms and phrebroker are), needed to find a free slot here.
The integrator picks the final value; then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Belgium motorcycle theory theme */
  [data-theme="bemoto"] {
    --brand: 21 65% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 21 60% 95%;
    --brand-hover: 21 65% 18%;
    --brand-dark: 21 65% 16%;
    --brand-darker: 21 60% 11%;
    --brand-muted: 21 30% 66%;
    --brand-border: 21 35% 78%;
    --brand-border-light: 21 35% 88%;
    --brand-gradient-to: 28 60% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `bemoto: "Four 50-question mock tests in English for the Belgian motorcycle theory exam, categories A1, A2 and A: lane position and filtering, protective clothing, braking and cornering, group riding, passengers and children, priority, signs and regional speed limits, at the real 41/50 pass mark.",`
- `EXAM_ORG`: `bemoto: "Approved exam centres in Flanders, Wallonia and Brussels · motorcycle theory exam, A1, A2 and A",`
- Hub group: a licence category, so the driving group, right after `bedriving` (as dkmoto,
  semoto, ptmoto and demotorrad do for their countries; the Belgium group for the non-driving
  siblings betoelating, befsmavz and, if it is not filed as driving, bevracht, is theirs):
  `{ title: "EU driving theory tests", ids: ["detheorie", "esdgt", "ptimt", "bedriving", "bemoto", "dkteori", "dkmoto", "setrafik", "fitheory", "grdriving", "rodrpciv", "hukresz", "mttheory"] },`
  (merge with whatever the other motorcycle siblings add in the same wave).
- `SEARCH_ALIASES` (English, Dutch, French and German):
  `bemoto: "belgium motorcycle theory test belgian motorcycle theory exam motorbike theory test belgium motorcycle licence belgium in english rijbewijs a theorie examen theorie-examen motorfiets motorrijbewijs theorie motor theorie examen rijbewijs a1 rijbewijs a2 permis moto theorique permis a theorique examen theorique moto permis moto belgique permis a2 belgique motorradfuhrerschein theorie belgien a1 a2 category a theory test belgium goca autoveiligheid autosecurite aibv sbat brussels flanders vlaanderen wallonia wallonie bruxelles brussel antwerp ghent liege",`

## lib/region.ts

- `TEST_REGIONS`: `bemoto: "BE",` (a driving licence test, so NOT in `NON_DRIVING_TESTS`).
- Region BE already exists (bedriving). No change to `REGION_HOME` is required; optionally extend
  its `testsSub` to mention motorcycles:
  `"Theory exams in English for a car (category B) or a motorcycle (A1, A2, A), in km/h for right-hand traffic. Four full 50-question tests each, 41 to pass."`

## lib/tigerAssets.ts

Add `bemoto: "moto",` to `BORROWED_SETS` (the motorcycle tiger, like ukmoto, nzmoto, dkmoto).

## lib/shareCards.ts, lib/shareCardCopy.ts, lib/shareImageUrl.ts

- `lib/shareCards.ts`: `"bemoto": { "color": "hsl(21, 65%, 22%)", "tint": "hsl(21, 60%, 95%)" },` (match the final hue)
- `lib/shareCardCopy.ts`: `bemoto: { title: "Belgium Motorcycle Theory Test", description: "Practise filtering, lane position, protective gear, passengers and Belgian road rules for categories A1, A2 and A, in English." },`
- `lib/shareImageUrl.ts`: add `"bemoto"` to `SHARE_COPY_IDS`.

## lib/examFacts.ts

```ts
  bemoto: {
    answer:
      "The Belgian motorcycle theory exam covers categories A1, A2 and A and is separate from the car exam. It is taken at an approved exam centre in Flanders, Wallonia or Brussels and has 50 multiple-choice questions on a computer, on the Highway Code and safe motorcycle riding; you need at least 41 of 50 to pass. A pass is valid for three years. Brussels lets you sit it from 17 years and 9 months; Flanders sets the age by category (17 years 9 months for A1, 19 years 9 months for A2, 23 years 9 months for A). Holding A2 for at least two years exempts you from the category A theory exam. In Brussels the exam is in Dutch or French, with English or German only in booked sessions with an interpreter; ask your centre about English elsewhere. Licences: A1 from 18, A2 from 20, A from 24, or from 22 after two years on A2.",
    rows: [
      { label: "Run by", value: "Approved exam centres in Flanders, Wallonia and Brussels" },
      { label: "Questions", value: "50 multiple choice" },
      { label: "Pass mark", value: "41 of 50" },
      { label: "In English", value: "Brussels: booked sessions with an interpreter; elsewhere ask your centre" },
      { label: "Pass valid for", value: "3 years" },
      { label: "Exempt", value: "With A2 held for 2 years (for category A)" },
      { label: "Licence ages", value: "A1 from 18, A2 from 20, A from 24 (22 after 2 years of A2)" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 41 to pass" },
    ],
    basedOn: "The Brussels A1/A2/A licence page (be.brussels), Vlaanderen.be's step-by-step page for licences A1, A2 and A, Autosécurité's category A guide (February 2026) and the Belgian Highway Code (Royal Decree of 1 December 1975), checked November 2026",
    source: { name: "be.brussels: training and exams for licence A1/A2/A", url: "https://be.brussels/nl/transport-mobiliteit/rijbewijs-en-kentekenbewijs/rijbewijs-behalen/rijopleiding-en-rijexamen-voor-rijbewijs-a1a2a" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` and `HUB_PAGES_UPDATED_AT` to the integration date with a comment
naming the wave. Then `npx tsx scripts/build-landing-dates.ts`.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, middleware.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed,
region BE already mapped.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `bike` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing bemoto:belgium-motorcycle-theory:25701`

## CLAUDE.md (after the Belgium Driving Theory bullet in the EU driving theory list)

```md
- **Belgium Motorcycle Theory** (`bemoto`, motorcycle theory exam for categories A1, A2 and A, in English, `/belgium-motorcycle-theory/*`, landing `/belgium-motorcycle-theory-test`): `data/belgium-motorcycle-questions.json` (200 original questions on the Belgian Highway Code for motorcyclists (Royal Decree of 1 December 1975: art. 9.3.2 lane position, 16.2bis filtering at up to 50 km/h and 20 km/h faster than traffic, between the two leftmost lanes on motorways, 30bis dipped beam day and night, 35.1.1 children (none under 3; 3 to 7 only on bikes up to 125 cc in a child seat), 36 helmet, gloves, jacket, trousers and ankle boots, 43ter group riding and road captains, 44 and 46 passengers and loads) and safe riding: licences, learners and fitness 16, gear and checks 20, braking, cornering and control 24, road position, filtering and groups 24, passengers, children and loads 16, priority and junctions 24, signs for riders 24, speed, overtaking and motorways 20, surface, weather and hazards 20, lights, parking and breakdowns 12), test IDs 25701-25704 (50 questions each), sets 25701-25705 (by topic), state `BEMOTO`, prefix `BEMOTO-`, 82% pass (41 of 50 like the real exam in all three regions). 4/5/6/6/4/6/6/5/5/3 per test, no spares. Licence rules: A1 125 cc and 11 kW from 18, A2 35 kW from 20, A from 24 (22 after two years of A2); Walloon model 3 provisional licence rules labelled Walloon (no passenger, no guide, 22:00 to 06:00 weekend ban under 24, Belgium only, 12 months); speed questions name the region. English: Brussels by booked interpreter only; the B exam's audio translation and 5-point serious faults are not confirmed for category A, so neither is claimed. No fines, fees or tread figures. Signs and situations described in words. Kept clear of `bedriving` stems and checked against every motorcycle bank. Built by `tools/next100/bemoto/build.py`; sources in `tools/next100/bemoto/sources.md`. Region BE, hub group "EU driving theory tests" (after bedriving), `[data-theme="bemoto"]` deep rust brown (21 65% 22%), borrows the motorcycle tiger.
```
