# Wiring for `dkteori` (Denmark driving theory test, teoriprøve, category B, v1)

Files already written by the builder: `data/denmark-driving-theory-questions.json` (200, PASS),
`lib/banks/dkteori.ts`, `app/denmark-driving-theory/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/denmark-driving-theory-test/page.tsx` (renders
`ExamSampleQuestions`), `tools/next100/dkteori/*` (spec, sources, `q_*.py`, `build.py`).
Rebuild with `python3 -I tools/next100/dkteori/build.py`. Everything below goes in shared files.

Format note: Færdselsstyrelsen's theory test lasts 25 minutes and allows at most five errors; its
own online practice test is 25 questions with 20 to pass. Tigertest models eight real-length
25-question tests at 80% (20 of 25), like `uklitu`. The blueprint follows Færdselsstyrelsen's
published randomisation key for the digital category B test (afsnit 1 8%, afsnit 3, 4, 5, 6 and 8
4% each, afsnit 7 72%). Pools are exactly 8x each per-test count (no spares). Dashboard = 4 topic
sets + 8 tests = 12 steps. No set exceeds 60. Tests 14201-14208 and sets 14201-14204 share the
block like uklitu's.

## lib/exams.ts

Add `"dkteori"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests, after `pkdrive`):

```ts
const dkteori: ExamConfig = {
  id: "dkteori",
  stateCode: "DKTEORI",
  idBase: 14200,
  slug: "/denmark-driving-theory",
  landingPath: "/denmark-driving-theory-test",
  name: "Denmark Driving Theory Practice Test",
  shortName: "Denmark theory test",
  examLabel: "Danish theory test",
  fullName: "Danish driving theory test (teoriprøve), category B",
  questionIdPrefix: "DKTEO-",
  icon: "car",
  testCount: 8,
  questionsPerTest: 25,
  passPct: 80,
  // Source: Færdselsstyrelsen (fstyr.dk, checked 2026-11-01): the theory test lasts 25 minutes,
  // digital or analogue, at most five errors; the official online practice test is 25 questions
  // with 20 to pass. Offered in Danish, English, German, Faroese and Greenlandic. Questions are
  // drawn at random from the category B teaching plan (undervisningsplan, version 1.1, May 2026,
  // in use from 1 July 2026). Weights from Færdselsstyrelsen's published randomisation key for the
  // digital test: afsnit 1 8%, afsnit 3, 4, 5, 6 and 8 4% each, afsnit 7 72%, so per 25:
  // afsnit 1 = 2, afsnit 3 + 4 = 2, afsnit 5 + 6 + 8 = 3, afsnit 7 = 18 (split 3/4/5/6 by
  // sub-section, Tigertest's own). The real test is picture-based with one or more correct answers
  // per question; ours are text, single answer, signs described in words. Eight real-length tests;
  // pools are exactly 8x each count. All items original.
  blueprint: {
    dkVehicle: 2,
    dkBehaviour: 2,
    dkBasics: 3,
    dkLanes: 3,
    dkPassing: 4,
    dkJunctions: 5,
    dkMotorway: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 14201, name: "Car, Road Users & Basic Rules", categories: ["dkVehicle", "dkBehaviour", "dkBasics"], size: 56, weightLabel: "7 of 25 test questions" },
    { setNumber: 2, id: 14202, name: "Lanes, Passing & Overtaking", categories: ["dkLanes", "dkPassing"], size: 56, weightLabel: "7 of 25 test questions" },
    { setNumber: 3, id: 14203, name: "Junctions, Give Way & Roundabouts", categories: ["dkJunctions"], size: 40, weightLabel: "5 of 25 test questions" },
    { setNumber: 4, id: 14204, name: "Motorways, Parking & Darkness", categories: ["dkMotorway"], size: 48, weightLabel: "6 of 25 test questions" },
  ],
  categoryLabels: {
    dkVehicle: "Car, Equipment & Documents",
    dkBehaviour: "Vehicles, Road Users & Fitness to Drive",
    dkBasics: "Roads, Basic Rules & Special Risks",
    dkLanes: "Moving Off, Speed & Changing Lanes",
    dkPassing: "Passing, Meeting, Following & Overtaking",
    dkJunctions: "Junctions, Give Way & Roundabouts",
    dkMotorway: "Motorways, Parking, Darkness & Tunnels",
  },
  copy: {
    guestPrompt: "to save your Danish theory test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets covering the whole category B teaching plan, in English. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 25 questions like the real test, 20 to pass",
    heroSubs: [
      "Four topics, eight real-length tests. Junctions and give way weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your teoriprøve.",
    ],
    sourceLine: "Based on Færdselsstyrelsen's category B teaching plan (undervisningsplan, 2026). Original questions in English; 25 per test, 20 to pass like the real test's five-error limit.",
    analyticsKey: "dkteori",
  },
};
```

Append `dkteori` to the `EXAMS` array with the other driving tests (after `pkdrive`).

Check: 14201-14208 (tests) and 14201-14204 (sets) must be free (BRIEF reserves idBase 14200).

## lib/banks/all.ts

```ts
import "./dkteori";
```

## types/index.ts

- `QuestionType`: add `| "DKTEORI"`.
- `QuestionCategory`, under a `// Denmark driving theory test` comment:

```ts
  | "dkVehicle"
  | "dkBehaviour"
  | "dkBasics"
  | "dkLanes"
  | "dkPassing"
  | "dkJunctions"
  | "dkMotorway"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    dkVehicle: "Car, Equipment & Documents",
    dkBehaviour: "Vehicles, Road Users & Fitness to Drive",
    dkBasics: "Roads, Basic Rules & Special Risks",
    dkLanes: "Moving Off, Speed & Changing Lanes",
    dkPassing: "Passing, Meeting, Following & Overtaking",
    dkJunctions: "Junctions, Give Way & Roundabouts",
    dkMotorway: "Motorways, Parking, Darkness & Tunnels",
```

## app/globals.css

The brief suggested `355 70% 38%`, but it clashes (hue rule: within 8 degrees needs 15 points of
saturation or 8 of lightness) with cpr 355 70 44, moto 355 72 44, act 350 70 42, aplus 350 75 44,
the Canadian driving themes 356 68 40 and casfa 2 78 31. Every lightness in 30 to 48 at hues
355 to 1 clashes with something. Checked with a script over `app/globals.css` on 2026-11-01:
`352 75% 32%` (Dannebrog red, deeper) passes against every theme then on disk. Other EU builders
(Malta suggested 0 65% 40%) may land nearby; re-check after merging. White text on 352 75% 32%
is well above 4.5:1. Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Denmark driving theory test theme */
  [data-theme="dkteori"] {
    --brand: 352 75% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 352 70% 96%;
    --brand-hover: 352 75% 27%;
    --brand-dark: 352 75% 24%;
    --brand-darker: 352 70% 17%;
    --brand-muted: 352 35% 70%;
    --brand-border: 352 40% 82%;
    --brand-border-light: 352 40% 90%;
    --brand-gradient-to: 10 60% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `dkteori: "Eight 25-question mock tests in English for the Danish driving theory test (teoriprøve), category B: give way to the right, roundabouts and cyclists, overtaking, motorways, parking, alcohol limits and driving in the dark, weighted like Færdselsstyrelsen's digital test.",`
- `EXAM_ORG`: `dkteori: "Færdselsstyrelsen (Denmark) · teoriprøve, category B",`
- Hub group, new (with the other EU driving groups after "Pakistan driving tests"):
  `{ title: "Denmark driving tests", ids: ["dkteori"] },`
  (or one shared "EU driving theory tests" group if the integrator prefers; the region pages work
  either way since a group is a country's own when any member is). With one member, add
  `RELATED_OVERRIDES`: `dkteori: ["setrafik", "fitheory", "ukcar"],` (swap `setrafik`/`fitheory`
  for any that are not wired).
- `SEARCH_ALIASES`:
  `dkteori: "denmark driving theory test danish theory test teoriprøve teoriprove teoriproeve koerekort kørekort danish driving licence theory test in english category b færdselsstyrelsen faerdselsstyrelsen fstyr copenhagen aarhus odense aalborg teori test english denmark",`

## lib/region.ts (new region DK, follow how PK was added)

- `Region` union: add `| "DK"`.
- `REGIONS`: `{ code: "DK", name: "Denmark", short: "DK", inName: "Denmark" },`
- `regionFromCountry`: `case "DK": return "DK";` (Faroe Islands `FO` and Greenland `GL` have
  their own licensing; leave them unmapped.)
- `REGION_HREFLANG`: `DK: "en-DK"`.
- `TEST_REGIONS`: `dkteori: "DK",` (a driving test, so NOT in `NON_DRIVING_TESTS`).
- `REGION_HOME`:

```ts
  DK: {
    title: "Free Denmark Theory Test Practice in English | Tigertest",
    description: "Free Danish driving theory test (teoriprøve) practice in English: 200 original questions on Danish road rules, every answer explained. No account needed.",
    lead: "Practice in English for the teoriprøve, the theory test for a Danish category B car licence. Original questions on give way, roundabouts, cyclists, motorways and parking, every answer explained. No signup.",
    cta: { label: "Danish theory test", href: "/denmark-driving-theory-test" },
    testsTitle: "Theory test (teoriprøve)",
    testsSub: "200 questions on Danish road rules, in km/h for right-hand traffic. Eight 25-question tests, 20 to pass like the real test.",
  },
```

## components/home/HomePage.tsx (`AUTHORITY`, used by `faqsFor`)

```ts
  DK: "Færdselsstyrelsen",
```

`faqsFor("DK")` then reads "not affiliated with Færdselsstyrelsen or any testing company".

## app/dk/page.tsx (new, copy of app/pk/page.tsx)

```tsx
import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Denmark homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("DK");

export default function HomeDK() {
  return <HomePage region="DK" />;
}
```

Plus the middleware matcher/mapping, sitemap and `llms.txt` lines as for PK, and optionally:

- `lib/shareCards.ts` country card: `dk: { title: "Free practice tests for Denmark", lines: ["Free practice tests", "for Denmark"], description: "Danish theory test in English and IT certifications.", footer: "Find your test at tigertest.io/dk", color: "#8C1426", tint: "#FBEAEC", mascots: ["dmv", "aws", "sat"] },`
- `lib/shareCards.ts` exam colour: `"dkteori": { "color": "hsl(352, 75%, 32%)", "tint": "hsl(352, 75%, 96%)" },`
- `lib/shareCardCopy.ts`: `dkteori: { title: "Denmark Driving Theory Test", description: "Practise give way, roundabouts, cyclists and motorway rules for the teoriprøve, in English." },`

## lib/examFacts.ts

```ts
  dkteori: {
    answer:
      "The Danish theory test (teoriprøve) for a category B car licence is run by Færdselsstyrelsen, the Danish Road Traffic Authority, at its own test centres. It lasts 25 minutes and you may make at most five errors; an unanswered question counts as an error. You choose a digital test on a touch screen, where you can go back and have questions read aloud, or an analogue test with a paper answer sheet. Each question shows a picture of a traffic situation and you pick the correct answer or answers. Questions are drawn at random from the category B teaching plan. Besides Danish, the test is offered in English (digital or analogue, at every test centre, no interpreter), German, Faroese and Greenlandic. You take it after the theory lessons and closed-track lessons, from 16 years and 11 months, and a pass is valid for 18 months.",
    rows: [
      { label: "Run by", value: "Færdselsstyrelsen (Danish Road Traffic Authority)" },
      { label: "Time", value: "25 minutes" },
      { label: "Pass rule", value: "At most 5 errors (official practice test: 20 of 25)" },
      { label: "Format", value: "Picture-based, one or more correct answers; digital or analogue" },
      { label: "Languages", value: "Danish, English, German, Faroese, Greenlandic" },
      { label: "Tigertest mock tests", value: "8 x 25 questions, 20 to pass" },
      { label: "Earliest test", value: "16 years 11 months (licence at 17)" },
      { label: "Pass valid for", value: "18 months" },
    ],
    basedOn: "Færdselsstyrelsen's driving licence guide and published randomisation key for the digital test, and the category B teaching plan (undervisningsplan, version 1.1, May 2026, in use from 1 July 2026), checked November 2026",
    source: { name: "Færdselsstyrelsen: Tag kørekort til bil", url: "https://www.fstyr.dk/privat/koerekort/dit-foerste-koerekort/tag-koerekort-saadan-goer-du" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` and `HUB_PAGES_UPDATED_AT` (new /dk page and group) to the
integration date with a comment naming the wave.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

Add `dkteori: "driving",` to `BORROWED_SETS` like `pkdrive` (car tiger).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing for the exam: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no
redirects needed. The `/dk` country page needs its sitemap line like `/pk`.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing dkteori:denmark-driving-theory:14201`

## CLAUDE.md (after the Pakistan bullet under International driving tests)

```md
- **Denmark Theory Test** (Færdselsstyrelsen teoriprøve, category B, in English, `/denmark-driving-theory/*`, landing `/denmark-driving-theory-test`): `data/denmark-driving-theory-questions.json` (200 original questions from Færdselsstyrelsen's category B teaching plan, undervisningsplan version 1.1, May 2026: car/equipment/documents 16 (afsnit 1), vehicles, road users and fitness to drive 16 (afsnit 3 and 4), roads, basic rules and special risks 24 (afsnit 5, 6, 8), moving off, speed and lanes 24 (7.1-7.5), passing, meeting, following and overtaking 32 (7.6-7.9), junctions, give way and roundabouts 40 (7.10-7.15), motorways, parking, darkness, tunnels and light rail 48 (7.16-7.21)), eight real-length tests: test IDs 14201-14208 (25 questions each), sets 14201-14204 (by topic), state `DKTEORI`, prefix `DKTEO-`, 80% pass (20 of 25: the real test is 25 minutes with at most 5 errors, and Færdselsstyrelsen's practice test is 25 questions, 20 to pass). 2/2/3/3/4/5/6 per test, following Færdselsstyrelsen's published randomisation key for the digital test (afsnit 1 8%, afsnits 3 to 6 and 8 4% each, afsnit 7 72%), no spares. Offered in Danish, English, German, Faroese and Greenlandic; the real test is picture-based with one or more correct answers, ours single-answer text with signs described in words. Right-hand traffic, give way to the right by default; no fines, fees or klip counts. Built by `tools/next100/dkteori/build.py`; sources in `tools/next100/dkteori/sources.md`. Region DK (its first exam, homepage `/dk`), hub group "Denmark driving tests", `[data-theme="dkteori"]` deep Dannebrog red, borrows the car tiger.
```
