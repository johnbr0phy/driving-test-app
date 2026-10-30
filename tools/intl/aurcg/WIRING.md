# aurcg wiring (RCG / RSG, SITHGAM022 Provide responsible gambling services, Australia)

v1 exam. Already written by the builder: `data/au-rcg-questions.json` (built by
`python3 -I tools/intl/aurcg/build.py`), `lib/banks/aurcg.ts`, `app/rcg/*` (8 wrappers),
`app/rcg-practice-test/page.tsx`, `tools/intl/aurcg/{spec.json,sources.md,build.py,src/*.py}`.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/au-rcg-questions.json --pool aurcgLaw=32 --pool aurcgHarm=36 --pool aurcgOdds=28 --pool aurcgEnv=32 --pool aurcgExcl=28 --pool aurcgAssist=28 --pool aurcgIncident=16` prints PASS (letters 50/50/50/50, avg option 23 chars, key-longest 18%, key>1.2x 12%).

## lib/exams.ts
Add `| "aurcg"` to the `ExamId` union. Icon `shield` already exists (no union change).
Add before `const htl` (next to the other AU exams):

```ts
const aurcg: ExamConfig = {
  id: "aurcg",
  stateCode: "AURCG",
  idBase: 9600,
  slug: "/rcg",
  landingPath: "/rcg-practice-test",
  name: "RCG Practice Test",
  shortName: "RCG",
  examLabel: "RCG / RSG assessment",
  fullName: "SITHGAM022 Provide responsible gambling services (RCG / RSG)",
  questionIdPrefix: "AURCG-",
  icon: "shield",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // SITHGAM022 Provide responsible gambling services, SIT training package, Release 1 (current on
  // training.gov.au, checked Oct 2026; supersedes SITHGAM001, no successor). Elements: implement
  // responsible gambling practices; provide information and assistance on gambling harm. States
  // call it RCG (NSW) or RSG (Vic, Qld...) and add their own rules ("varies by state" here). The
  // unit is competency based with no national pass mark, so 80% is a readiness line. Category
  // counts are ours, from the unit's knowledge and performance evidence. All items original.
  blueprint: {
    aurcgLaw: 8,
    aurcgHarm: 9,
    aurcgOdds: 7,
    aurcgEnv: 8,
    aurcgExcl: 7,
    aurcgAssist: 7,
    aurcgIncident: 4,
  },
  trainingSets: testSets(9600, 4),
  categoryLabels: {
    aurcgLaw: "Laws, Codes & Compliance",
    aurcgHarm: "Gambling Harm & Warning Signs",
    aurcgOdds: "Odds, Chance & Gambling Myths",
    aurcgEnv: "Safer Gambling Environment",
    aurcgExcl: "Self-Exclusion & Exclusion",
    aurcgAssist: "Helping Customers & Support Services",
    aurcgIncident: "Incidents, Complaints & Records",
  },
  copy: {
    guestPrompt: "to save your RCG progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all seven topic areas. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 80% readiness line",
    heroSubs: [
      "Seven topic areas, four mock tests. Aim for 40 of 50.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Check your state's extra rules before your assessment.",
    ],
    sourceLine: "Based on the national unit SITHGAM022 Provide responsible gambling services and its assessment requirements, checked October 2026. Original questions; state rules vary, and 80% is a readiness line, not an official pass mark.",
    analyticsKey: "aurcg",
  },
};
```

Append `aurcg` to `EXAMS` with the other AU exams (after `ausa`, or after `aursa` if wave 2 puts it there).

## lib/banks/all.ts
```ts
import "./aurcg";
```

## types/index.ts
- `QuestionType`: add `| "AURCG"`.
- `QuestionCategory`, after the other wave-2 AU blocks:
```ts
  // RCG / RSG (SITHGAM022, Australia) categories
  | "aurcgLaw"
  | "aurcgHarm"
  | "aurcgOdds"
  | "aurcgEnv"
  | "aurcgExcl"
  | "aurcgAssist"
  | "aurcgIncident"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts
In the category label map (English labels in every file):
```ts
    aurcgLaw: "Laws, Codes & Compliance",
    aurcgHarm: "Gambling Harm & Warning Signs",
    aurcgOdds: "Odds, Chance & Gambling Myths",
    aurcgEnv: "Safer Gambling Environment",
    aurcgExcl: "Self-Exclusion & Exclusion",
    aurcgAssist: "Helping Customers & Support Services",
    aurcgIncident: "Incidents, Complaints & Records",
```

## app/globals.css
Light block after the last exam theme (hue 252, deep indigo; 240 and 260 are taken, check no other wave-2 exam picked 250 to 254). Then run `tools/gen_dark_brand_css.py` once for all wave-2 themes.
```css
  /* RCG / RSG theme (Australia) */
  [data-theme="aurcg"] {
    --brand: 252 50% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 252 60% 96%;
    --brand-hover: 252 50% 36%;
    --brand-dark: 252 50% 30%;
    --brand-darker: 252 45% 20%;
    --brand-muted: 252 35% 72%;
    --brand-border: 252 35% 80%;
    --brand-border-light: 252 35% 89%;
    --brand-gradient-to: 200 60% 95%;
  }
```

## lib/testCatalog.ts
- `EXAM_BLURBS`:
```ts
  aurcg: "Mock tests for the RCG and RSG course, national unit SITHGAM022: gambling harm and its signs, odds and myths, self-exclusion, support services and incident records, with state rules marked as varying.",
```
- `EXAM_ORG`: `aurcg: "SITHGAM022 · RCG / RSG, all states",`
- Hub group: "Australia school and work certificates" (or the AU work group, with aursa, aufss, aufirstaid, auforklift, auwah).
- `SEARCH_ALIASES`:
```ts
  aurcg: "rcg rsg responsible conduct of gambling responsible service of gambling sithgam022 sithgam001 gaming licence pokies gaming room attendant club hotel pub casino keno tab australia nsw vic qld competency card",
```

## lib/region.ts
`TEST_REGIONS`: `aurcg: "AU",`. Add `"aurcg"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts
```ts
  aurcg: {
    answer:
      "RCG (Responsible Conduct of Gambling) or RSG (Responsible Service of Gambling) is the training staff need before working with gaming machines, Keno, wagering or table games in Australian hotels, clubs and casinos. Most courses deliver the national unit SITHGAM022 Provide responsible gambling services, assessed by a registered training organisation as competent or not yet competent, with no national pass mark. Each state or territory adds its own rules, approved courses and refresher periods.",
    rows: [
      { label: "National unit", value: "SITHGAM022 Provide responsible gambling services" },
      { label: "Replaced", value: "SITHGAM001 (equivalent, 2022)" },
      { label: "Assessment", value: "Competency based: questions, scenarios, observation" },
      { label: "Pass mark", value: "None nationally; competent or not yet competent" },
      { label: "Course length", value: "Usually under a day; varies by provider" },
      { label: "Names", value: "RCG in NSW, RSG in Victoria and Queensland" },
      { label: "State rules", value: "Set by each state or territory regulator" },
    ],
    basedOn: "the SITHGAM022 unit and assessment requirements on training.gov.au, checked October 2026",
    source: { name: "training.gov.au: SITHGAM022 unit file", url: "https://training.gov.au/TrainingComponentFiles/SIT/SITHGAM022_R1.xml" },
  },
```
(If a human-readable source is preferred, `https://training.gov.au/Training/Details/SITHGAM022` is the unit page; it is a JS app, so it was checked through the release files.)

## components/TeachNudge.tsx
Add `"aurcg"` to `TEACHER_LED` (trade / workplace certificates line, with ukaplh, aursa).

## components/exam/ExamClassFaq.tsx
`TEACHES`: `aurcg: "an RCG or RSG course",`

## lib/tigerAssets.ts
Optional: `BORROWED_SETS`: `aurcg: "alcohol",` (closest venue-staff tiger; leave out if aursa takes it and you prefer DMV art).

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` (wave-2 landings, incl. RCG).

## scripts/build-training-parts.ts
Run `npx tsx scripts/build-training-parts.ts` after wiring.

## Not needed
No new icon, no next.config redirect; sitemap, /og and classQuestions pick it up from `EXAMS` and `lib/banks/all.ts`.

## CLAUDE.md (Additional Exams, with the AU work certificates)
```md
- **RCG** (Australia responsible gambling, national unit SITHGAM022, `/rcg/*`, landing `/rcg-practice-test`): `data/au-rcg-questions.json` (200 questions: laws/codes 32, harm and signs 36, odds and myths 28, gaming environment 32, exclusion 28, helping customers 28, incidents/records 16), test IDs 9601-9604, sets 9601-9604 (one per test), state `AURCG`, 80% readiness line (competency based, no official pass mark). 8/9/7/8/7/7/4 per test. National content only; course names, renewals, exclusion programs and venue rules "vary by state". Built from `tools/intl/aurcg/`.
```

## Screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing aurcg:rcg:9601`
