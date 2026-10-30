# Wiring for `pcoc` (Transport Canada Pleasure Craft Operator Card test, CA, v1)

Files already written by the builder: `data/pcoc-questions.json` (200, PASS), `lib/banks/pcoc.ts`,
`app/boating-canada/*` (8 wrappers, copied from `app/life-in-the-uk/`),
`app/pcoc-practice-test/page.tsx`, `tools/next30/pcoc/*` (spec, sources, `q_*.py`, `build.py`).
Rebuild with `python3 -I tools/next30/pcoc/build.py`. Everything below goes in shared files.

Format note: SPEC.md said 36 questions. That was the pre-2011 test; the current accredited test
is 50 multiple-choice questions, 75% (38 of 50), so this exam has four 50-question tests
(4 x 50 = 200, every item in exactly one test). Dashboard = 5 training sets + 4 tests = 9 steps.

## lib/exams.ts

Add `"pcoc"` to the `ExamId` union. Icon `sailboat` already exists.

```ts
const pcoc: ExamConfig = {
  id: "pcoc",
  stateCode: "PCOC",
  idBase: 11600,
  slug: "/boating-canada",
  landingPath: "/pcoc-practice-test",
  name: "PCOC Practice Test",
  shortName: "Boating Canada",
  examLabel: "PCOC test",
  fullName: "Pleasure Craft Operator Card test (Canada)",
  questionIdPrefix: "PCOC-",
  icon: "sailboat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // Transport Canada Pleasure Craft Operator Card test (checked October 2026): 50 multiple-choice
  // questions, 75% (38 of 50) to pass, set by accredited course providers (the 36-question test
  // was replaced in 2011). Content follows the Boating Safety Course and Transport Canada's Safe
  // Boating Guide (TP 511E), the Small Vessel Regulations (SOR/2010-91), the Collision
  // Regulations and the Canadian Aids to Navigation System (TP 968). TC publishes no per-topic
  // counts; weights follow the course: equipment and rules of the road 10 each. All items original.
  blueprint: {
    pcocRules: 7,
    pcocEquipment: 10,
    pcocBefore: 8,
    pcocRoadRules: 10,
    pcocAids: 7,
    pcocEmergencies: 8,
  },
  trainingSets: [
    { setNumber: 1, id: 11601, name: "Regulations & Before You Go", categories: ["pcocRules", "pcocBefore"], size: 60, weightLabel: "15 of 50 test questions" },
    { setNumber: 2, id: 11602, name: "Minimum Safety Equipment", categories: ["pcocEquipment"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 3, id: 11603, name: "Rules of the Road", categories: ["pcocRoadRules"], size: 40, weightLabel: "10 of 50 test questions" },
    { setNumber: 4, id: 11604, name: "Buoys & Navigation Aids", categories: ["pcocAids"], size: 28, weightLabel: "7 of 50 test questions" },
    { setNumber: 5, id: 11605, name: "Emergencies & Cold Water", categories: ["pcocEmergencies"], size: 32, weightLabel: "8 of 50 test questions" },
  ],
  categoryLabels: {
    pcocRules: "Regulations & Licensing",
    pcocEquipment: "Minimum Safety Equipment",
    pcocBefore: "Before You Go",
    pcocRoadRules: "Rules of the Road",
    pcocAids: "Buoys & Navigation Aids",
    pcocEmergencies: "Emergencies & Cold Water",
  },
  copy: {
    guestPrompt: "to save your PCOC progress and track every question you miss",
    trainingHeading: "Train by course topic",
    trainingSub: "Five sets covering the boating safety course: regulations and trip planning, safety equipment, rules of the road, Canadian buoys, emergencies. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions like the real test, 38 to pass",
    heroSubs: [
      "Five topics, four full-length tests. Equipment and rules of the road weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Take your accredited PCOC test.",
    ],
    sourceLine: "Based on Transport Canada's Safe Boating Guide and the Small Vessel and Collision Regulations. Original questions; 50 per test, 75% to pass like the real test.",
    analyticsKey: "pcoc",
  },
};
```

Append `pcoc` to the `EXAMS` array with the other Canadian exams. Check 11601-11605 are free.

## lib/banks/all.ts

```ts
import "./pcoc";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/pcoc.ts`.

## types/index.ts

- `QuestionType`: add `| "PCOC"`.
- `QuestionCategory`, under a `// Pleasure Craft Operator Card (Canada)` comment:

```ts
  | "pcocRules"
  | "pcocEquipment"
  | "pcocBefore"
  | "pcocRoadRules"
  | "pcocAids"
  | "pcocEmergencies"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    pcocRules: "Regulations & Licensing",
    pcocEquipment: "Minimum Safety Equipment",
    pcocBefore: "Before You Go",
    pcocRoadRules: "Rules of the Road",
    pcocAids: "Buoys & Navigation Aids",
    pcocEmergencies: "Emergencies & Cold Water",
```

## app/globals.css

Suggested hue 195, a deep lake blue-teal (re-pick if it clashes with US `boating`), then run
`tools/gen_dark_brand_css.py`.

```css
  /* PCOC (Canada boating) theme */
  [data-theme="pcoc"] {
    --brand: 195 75% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 195 70% 95%;
    --brand-hover: 195 75% 27%;
    --brand-dark: 195 75% 24%;
    --brand-darker: 195 70% 15%;
    --brand-muted: 195 35% 70%;
    --brand-border: 195 40% 78%;
    --brand-border-light: 195 40% 88%;
    --brand-gradient-to: 0 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `pcoc: "Four 50-question practice tests for the Pleasure Craft Operator Card: Canadian safety equipment, rules of the road, buoys and emergencies, 75% to pass.",`
- `EXAM_ORG`: `pcoc: "Transport Canada · accredited course providers",`
- Hub group: add `"pcoc"` to `{ title: "Outdoor & recreation licenses", ids: ["boating", "hunter", "lifeguard", "pcoc"] }`.
- `SEARCH_ALIASES`:
  `pcoc: "pcoc pleasure craft operator card canadian boating licence boating license canada boat card transport canada boater exam ontario bc quebec alberta pwc sea-doo",`
- `RELATED_OVERRIDES`: `pcoc: ["boating", "capal", "caon"],` (Canadian visitors get Canadian neighbours; drop if the integrator prefers the group).

## lib/region.ts

`pcoc: "CA",` in `TEST_REGIONS`, and add `"pcoc"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  pcoc: {
    answer:
      "The Pleasure Craft Operator Card (PCOC) is the most common proof of competency needed to operate a recreational boat with any motor in Canada, electric trolling motors included. You earn it by passing a test of 50 multiple-choice questions with a course provider accredited by Transport Canada, scoring at least 75 percent (38 of 50). The card is valid for life. Operators under 16 have horsepower limits and no one under 16 may operate a personal watercraft.",
    rows: [
      { label: "Questions", value: "50 multiple choice" },
      { label: "Pass mark", value: "75% (38 of 50)" },
      { label: "Time", value: "Up to 75 minutes online, set by the provider" },
      { label: "Who needs it", value: "Operators of any motorized pleasure craft" },
      { label: "Valid for", value: "Life, no renewal" },
      { label: "Youth limits", value: "Under 12: 10 hp; 12 to 15: 40 hp unless supervised; no PWC under 16" },
      { label: "Study material", value: "Transport Canada Safe Boating Guide (TP 511E)" },
      { label: "Run by", value: "Transport Canada-accredited course providers" },
    ],
    basedOn: "Transport Canada's proof of competency rules and the Small Vessel Regulations, checked October 2026",
    source: { name: "Transport Canada: Proof of competency for recreational boaters", url: "https://tc.canada.ca/en/marine-transportation/marine-safety/proof-competency-recreational-boaters" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## Teacher-led lists

Optional: `TEACHER_LED` in `components/TeachNudge.tsx` and `TEACHES` in
`components/exam/ExamClassFaq.tsx` (`pcoc: "boating safety classes"`). The landing does not render
`ExamClassFaq`; add it plus `classFaqJsonLd("pcoc")` to the FAQ list if wired.

## Landing breadcrumbs

No `ExamLandingBreadcrumbs` component exists in this tree. If the integrator adds it, place it
right after the JSON-LD script in `app/pcoc-practice-test/page.tsx`.

## Nothing needed

`lib/sitemaps.ts`, `next.config.ts`, `components/TestIcon.tsx`, `components/CDLHeader.tsx`
(`sailboat` exists). `scripts/build-training-parts.ts`: no set exceeds 60.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing pcoc:boating-canada:11601`

## CLAUDE.md (under Additional Exams)

```md
- **PCOC** (Transport Canada Pleasure Craft Operator Card, `/boating-canada/*`, landing `/pcoc-practice-test`): `data/pcoc-questions.json` (200 questions from the Safe Boating Guide, Small Vessel Regulations, Collision Regulations and the Canadian buoy system: regulations 28, safety equipment 40, before you go 32, rules of the road 40, buoys 28, emergencies 32), test IDs 11601-11604 (50 questions each, like the current test), sets 11601-11605, state `PCOC`, 75% pass (38 of 50). 7/10/8/10/7/8 per test. Federal rules only; pleasure craft licence term left out (being changed). Built by `tools/next30/pcoc/build.py`; sources in `tools/next30/pcoc/sources.md`. Hub group "Outdoor & recreation licenses", region CA.
```
