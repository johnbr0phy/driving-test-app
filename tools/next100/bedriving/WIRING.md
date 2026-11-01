# Wiring for `bedriving` (Belgium driving theory exam, category B, v1)

Files already written by the builder: `data/belgium-driving-questions.json` (200, PASS),
`lib/banks/bedriving.ts`, `app/belgium-driving-theory/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/belgium-driving-theory-test/page.tsx` (renders
`ExamSampleQuestions`), `tools/next100/bedriving/*` (spec, sources, `q_*.py`, `build.py`).
Rebuild with `python3 -I tools/next100/bedriving/build.py`. Everything below goes in shared files.

Format note: the real exam (same in Flanders, Wallonia and Brussels) is 50 multiple-choice
questions, start at 50 points, -1 per wrong or blank answer, -5 per wrong answer on a serious-fault
question (third/fourth-degree offences and speed limits), pass 41/50. Tigertest models four
50-question tests at 82% (41 of 50) with every miss worth one point; the landing and FAQ say the
5-point rule is not modelled. Pools are exactly 4x each per-test count (no spares). Dashboard =
5 topic sets + 4 tests = 9 steps. No set exceeds 60. English: audio translation in Flanders
(since 1 Jan 2023), by appointment at Couillet and Wandre in Wallonia, interpreter in Brussels.

## lib/exams.ts

Add `"bedriving"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests, after `pkdrive`):

```ts
const bedriving: ExamConfig = {
  id: "bedriving",
  stateCode: "BEDRIVE",
  idBase: 14400,
  slug: "/belgium-driving-theory",
  landingPath: "/belgium-driving-theory-test",
  name: "Belgium Driving Theory Practice Test",
  shortName: "Belgium theory test",
  examLabel: "Belgian theory exam",
  fullName: "Belgium driving theory exam, category B",
  questionIdPrefix: "BEDRV-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 82,
  // Source: the Belgian Highway Code (Royal Decree of 1 December 1975, consolidated text on
  // codedelaroute.be, with its regional speed-limit variants) and the alcohol limits of the Law of
  // 16 March 1968. The theory exam is run by approved centres in Flanders, Wallonia and Brussels:
  // 50 questions, 41/50 to pass, -5 points for a serious fault (vlaanderen.be, wallonie.be, BX1;
  // checked 2026-11-01). passPct 82 = 41/50; the 5-point serious faults are not modelled. No region
  // publishes topic weights, so the blueprint is Tigertest's own, priority and signs heaviest.
  // Pools are exactly 4x each count (no spares). All items original, British English.
  blueprint: {
    beLicence: 5,
    beDanger: 5,
    bePriority: 7,
    beSigns: 6,
    beMarkings: 4,
    beSpeed: 6,
    beManoeuvre: 6,
    beParking: 4,
    beVulnerable: 4,
    beSafety: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 14401, name: "Danger & Other Road Signs", categories: ["beDanger", "beSigns"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 2, id: 14402, name: "Priority, Markings & Lights", categories: ["bePriority", "beMarkings"], size: 44, weightLabel: "11 of 50 test questions" },
    { setNumber: 3, id: 14403, name: "Speed, Overtaking & Motorways", categories: ["beSpeed", "beManoeuvre"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 14404, name: "Vulnerable Road Users & Parking", categories: ["beVulnerable", "beParking"], size: 32, weightLabel: "8 of 50 test questions" },
    { setNumber: 5, id: 14405, name: "Licence, Lights & Safety", categories: ["beLicence", "beSafety"], size: 32, weightLabel: "8 of 50 test questions" },
  ],
  categoryLabels: {
    beLicence: "The Exam, Licence & Fitness to Drive",
    beDanger: "Danger Signs",
    bePriority: "Priority Rules & Priority Signs",
    beSigns: "Prohibition, Mandatory & Information Signs",
    beMarkings: "Road Markings & Traffic Lights",
    beSpeed: "Speed Limits & Zones",
    beManoeuvre: "Overtaking, Turning & Motorways",
    beParking: "Stopping & Parking",
    beVulnerable: "Pedestrians, Cyclists & Public Transport",
    beSafety: "Lights, Seat Belts & Breakdowns",
  },
  copy: {
    guestPrompt: "to save your theory exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the Belgian Highway Code that the exams in Flanders, Wallonia and Brussels all test. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, pass at 41",
    heroSubs: [
      "Five topics, four 50-question tests. Priority and signs weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your theory exam.",
    ],
    sourceLine: "Based on the Belgian Highway Code. Original questions in English; 50 per test, 41 to pass like the real exam.",
    analyticsKey: "bedriving",
  },
};
```

Append `bedriving` to the `EXAMS` array with the other driving tests (after `pkdrive`).

Check: 14401-14405 (sets) and 14401-14404 (tests) must be free (BRIEF reserves idBase 14400).

## lib/banks/all.ts

```ts
import "./bedriving";
```

## types/index.ts

- `QuestionType`: add `| "BEDRIVE"`.
- `QuestionCategory`, under a `// Belgium driving theory` comment (no `be*` keys exist yet; grepped):

```ts
  | "beLicence"
  | "beDanger"
  | "bePriority"
  | "beSigns"
  | "beMarkings"
  | "beSpeed"
  | "beManoeuvre"
  | "beParking"
  | "beVulnerable"
  | "beSafety"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    beLicence: "The Exam, Licence & Fitness to Drive",
    beDanger: "Danger Signs",
    bePriority: "Priority Rules & Priority Signs",
    beSigns: "Prohibition, Mandatory & Information Signs",
    beMarkings: "Road Markings & Traffic Lights",
    beSpeed: "Speed Limits & Zones",
    beManoeuvre: "Overtaking, Turning & Motorways",
    beParking: "Stopping & Parking",
    beVulnerable: "Pedestrians, Cyclists & Public Transport",
    beSafety: "Lights, Seat Belts & Breakdowns",
```

## app/globals.css

The brief's `48 85% 38%` fails both checks: white text on it is only 2.97:1 (yellow needs a dark
shade), and it is within 8 degrees of `forklift` (42 80% 32.3%) and `foodmgr` (42 90% 31.1%)
with under 15 points of saturation and 8 of lightness apart, and of the suggested `esdgt`
(45 80% 34%). Proposed: **52 100% 26%** (a dark Belgian gold): white text 4.73:1; vs `uk18ed`
(50 80% 29.5%) 20 points of saturation; vs `jnvst` (51 65% 31%) 35; vs `cscs` (46 50% 34%) 50;
vs `foodmgr`/`forklift` 10 degrees; vs `caelec` (60 70% 26%) 8 degrees and 30 points; vs `esdgt`
7 degrees and 20 points. Lightness 26% is under the 30 to 48% band (as `caelec` and `pkdrive` are)
but needed for contrast at this hue. The integrator picks the final value. Then run
`tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Belgium driving theory theme */
  [data-theme="bedriving"] {
    --brand: 52 100% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 52 80% 94%;
    --brand-hover: 52 100% 22%;
    --brand-dark: 52 100% 19%;
    --brand-darker: 52 90% 13%;
    --brand-muted: 52 35% 66%;
    --brand-border: 52 40% 76%;
    --brand-border-light: 52 40% 87%;
    --brand-gradient-to: 45 85% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `bedriving: "Four 50-question mock tests in English for the Belgian category B theory exam in Flanders, Wallonia and Brussels: priority to the right, danger and priority signs, markings, regional speed limits, overtaking, motorways, parking and vulnerable road users, at the real 41/50 pass mark.",`
- `EXAM_ORG`: `bedriving: "Approved exam centres in Flanders, Wallonia and Brussels · category B theory exam",`
- Hub group, new (with the other EU batch-1 driving groups): `{ title: "Belgium driving tests", ids: ["bedriving"] },`
  With one member, add `RELATED_OVERRIDES` (adjust to the EU tests the integrator wires):
  `bedriving: ["iedtt", "ukcar", "esdgt"],`
- `SEARCH_ALIASES`:
  `bedriving: "belgium driving theory test belgian theory exam english rijbewijs b theorie examen theorie-examen theorie examen engels permis theorique permis de conduire theorique belgique examen theorique anglais goca autoveiligheid sbat aibv autosecurite wegcode code de la route brussels flanders vlaanderen wallonia wallonie bruxelles brussel antwerp ghent liege driving licence belgium",`

## lib/region.ts (new region BE, wire like PK)

- `Region` union: add `| "BE"`.
- `REGIONS`: `{ code: "BE", name: "Belgium", short: "BE", inName: "Belgium" },`
- `regionFromCountry`: `case "BE": return "BE";`
- `REGION_HREFLANG`: `BE: "en-BE"`
- `TEST_REGIONS`: `bedriving: "BE",` (a driving test, so NOT in `NON_DRIVING_TESTS`).
- `REGION_HOME`:

```ts
  BE: {
    title: "Free Belgium Driving Theory Test Practice | Tigertest",
    description: "Free Belgian driving theory practice in English: 200 original questions on the Highway Code at the real 41/50 pass mark, every answer explained. No account needed.",
    lead: "Practice in English for the category B theory exam in Flanders, Wallonia and Brussels. Original questions on priority to the right, signs, speed limits and parking, every answer explained. No signup.",
    cta: { label: "Theory exam", href: "/belgium-driving-theory-test" },
    testsTitle: "Category B theory exam",
    testsSub: "200 questions on the Belgian Highway Code, in km/h for right-hand traffic. Four full 50-question tests, 41 to pass.",
  },
```

## components/home/HomePage.tsx (`AUTHORITY`, used by `faqsFor`)

```ts
  BE: "GOCA, any exam centre or the regional authorities",
```
(`faqsFor` builds the rest from `inName`; with one local driving test the first answer reads "a
driving test written from the official rules", which fits.)

## app/be/page.tsx (new, copy of `app/pk/page.tsx`)

```tsx
import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Belgium homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("BE");

export default function HomeBE() {
  return <HomePage region="BE" />;
}
```

Plus, as for PK: `middleware.ts` country mapping (ISO `BE`), the country homepages' sitemap line,
the `llms.txt` country section, the funnel's `visit_region_*` list if it is enumerated, and the
CLAUDE.md "Country (region)" sentence (`/be`).

## lib/examFacts.ts

```ts
  bedriving: {
    answer:
      "The Belgian theory exam for a category B (car) licence is taken at an approved exam centre in Flanders, Wallonia or Brussels. It has 50 multiple-choice questions on a screen. You start with 50 points and need at least 41 to pass: a wrong or unanswered question costs 1 point, and a wrong answer on a serious-fault question (a third- or fourth-degree offence or a speed limit) costs 5. You must be at least 17, and a pass is valid for three years. In Flanders the exam is in Dutch with an optional English audio translation; in Wallonia it is in French, with English by appointment at two centres; in Brussels it is in French or Dutch with an interpreter for English. After two consecutive failures you must take 12 hours of theory lessons at a driving school (Flanders and Brussels; guides say the same for Wallonia).",
    rows: [
      { label: "Run by", value: "Approved exam centres in Flanders, Wallonia and Brussels" },
      { label: "Questions", value: "50 multiple choice" },
      { label: "Pass mark", value: "41 of 50 points" },
      { label: "Serious fault", value: "Costs 5 points (third/fourth-degree offences and speed limits)" },
      { label: "Time", value: "Up to 15 seconds per question (Flanders, Brussels); about 30 minutes in Brussels" },
      { label: "In English", value: "Audio translation (Flanders), by appointment (Wallonia), interpreter (Brussels)" },
      { label: "Minimum age", value: "17" },
      { label: "Pass valid for", value: "3 years" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 41 to pass" },
    ],
    basedOn: "Vlaanderen.be and Wallonie.be theory exam pages, the Brussels Mobility exam page (be.brussels), and the Belgian Highway Code (Royal Decree of 1 December 1975), checked November 2026",
    source: { name: "Vlaanderen.be: theory exam for licence B", url: "https://www.vlaanderen.be/rijbewijs-b/theorie-examen-voor-rijbewijs-b" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the EU wave.

## lib/tigerAssets.ts

`BORROWED_SETS`: `bedriving: "driving",` (the car tiger, like the other car tests).

## lib/shareCardCopy.ts / lib/shareCards.ts / lib/shareImageUrl.ts (as for pkdrive)

```ts
  bedriving: { title: "Belgium Driving Theory Test", description: "Practise priority to the right, Belgian signs, regional speed limits and parking rules in English, at the real 41/50 pass mark." },
```
`shareCards.ts`: `"bedriving": { "color": "hsl(52, 100%, 26%)", "tint": "hsl(52, 80%, 94%)" },`
(match the final theme hue). Add `"bedriving"` to `SHARE_COPY_IDS`.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing for the exam: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no
redirects. Add `/be` to the country homepages as for `/pk`.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing bedriving:belgium-driving-theory:14401`

## CLAUDE.md (after the Pakistan bullet under International driving tests)

```md
- **Belgium Driving Theory** (category B theory exam, `/belgium-driving-theory/*`, landing `/belgium-driving-theory-test`): `data/belgium-driving-questions.json` (200 original questions from the Belgian Highway Code, Royal Decree of 1 December 1975, and the alcohol limits of the Law of 16 March 1968: exam/licence/fitness 20, danger signs 20, priority rules and signs 28, prohibition/mandatory/information signs 24, markings and lights 16, speed limits and zones 24, overtaking/turning/motorways 24, stopping and parking 16, pedestrians/cyclists/public transport 16, lights/seat belts/breakdowns 12), test IDs 14401-14404 (50 questions each), sets 14401-14405 (by topic), state `BEDRIVE`, prefix `BEDRV-`, 82% pass (41 of 50 like the real exam in all three regions; the real exam's 5-point serious faults, third/fourth-degree offences and speed limits, are not modelled). 5/5/7/6/4/6/6/4/4/3 per test, no spares. Right-hand traffic, priority to the right, trams first; speed questions name the region (built-up 30 km/h in Brussels, 50 in Flanders and Wallonia; outside 70 in Flanders and Brussels, 90 in Wallonia; motorways 120). English: Flemish audio translation (since 2023), Walloon appointment centres (Couillet, Wandre), Brussels interpreter. No fines, fees or regional provisional-licence rules; the risk perception videos are not modelled. Signs are described in words. Built by `tools/next100/bedriving/build.py`; sources in `tools/next100/bedriving/sources.md`. Region BE (its first exam, homepage `/be`), hub group "Belgium driving tests", `[data-theme="bedriving"]` dark Belgian gold, borrows the car tiger.
```
