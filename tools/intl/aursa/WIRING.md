# aursa wiring (RSA, SITHFAB021 Provide responsible service of alcohol, Australia)

v1 exam. Already written by the builder: `data/au-rsa-questions.json` (built by
`python3 -I tools/intl/aursa/build.py`), `lib/banks/aursa.ts`, `app/rsa/*` (8 wrappers, copied from
`app/personal-licence/`), `app/rsa-practice-test/page.tsx`, `tools/intl/aursa/{spec.json,sources.md,build.py,report.py,src/*.py}`.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/au-rsa-questions.json --pool aursaLaw=36 --pool aursaAge=36 --pool aursaDrinks=36 --pool aursaIntox=36 --pool aursaRefuse=32 --pool aursaCare=24` prints PASS (letters 50/50/50/50, avg option 25 chars, key-longest 13%, key>1.2x 6%).

## lib/exams.ts
Add `| "aursa"` to the `ExamId` union. Icon `wine` already exists (no union change).
Add before `const htl`:

```ts
const aursa: ExamConfig = {
  id: "aursa",
  stateCode: "AURSA",
  idBase: 9500,
  slug: "/rsa",
  landingPath: "/rsa-practice-test",
  name: "RSA Practice Test",
  shortName: "RSA",
  examLabel: "RSA assessment (SITHFAB021)",
  fullName: "SITHFAB021 Provide responsible service of alcohol (Australia)",
  questionIdPrefix: "AURSA-",
  icon: "wine",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // SITHFAB021 Provide responsible service of alcohol, Release 1 (training.gov.au, generated July
  // 2024, checked Oct 2026): 4 elements plus the knowledge evidence in its assessment requirements.
  // No national exam or published weights: RTOs assess, usually requiring every knowledge question
  // correct, so 80% is a readiness line. Counts are ours. State rules (ID, minors, certification,
  // delivery) are "varies by state". All items original.
  blueprint: {
    aursaLaw: 9,
    aursaAge: 9,
    aursaDrinks: 9,
    aursaIntox: 9,
    aursaRefuse: 8,
    aursaCare: 6,
  },
  trainingSets: testSets(9500, 4),
  categoryLabels: {
    aursaLaw: "RSA Law & Harm Minimisation",
    aursaAge: "Minors & Proof of Age",
    aursaDrinks: "Standard Drinks & Effects",
    aursaIntox: "Recognising Intoxication",
    aursaRefuse: "Refusing Service",
    aursaCare: "At-Risk Customers & Safety",
  },
  copy: {
    guestPrompt: "to save your RSA progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all six topic areas. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 80% readiness line",
    heroSubs: [
      "Six topic areas, four practice tests. Aim for 40 of 50 on each.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Check your state's RSA rules and book your course.",
    ],
    sourceLine: "Based on SITHFAB021 Provide responsible service of alcohol and its assessment requirements, checked October 2026. Original questions; 80% is a readiness target, not an official pass mark, and state rules vary.",
    analyticsKey: "aursa",
  },
};
```

Append `aursa` to `EXAMS` before `htl` (with the other international exams).

## lib/banks/all.ts
```ts
import "./aursa";
```

## types/index.ts
- `QuestionType`: add `| "AURSA"`.
- `QuestionCategory`, after the ukcar block (or with the other wave-2 blocks):
```ts
  // RSA (SITHFAB021, Australia) categories
  | "aursaLaw"
  | "aursaAge"
  | "aursaDrinks"
  | "aursaIntox"
  | "aursaRefuse"
  | "aursaCare"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts
In the category label map, after `ukcarEmerg` (English labels in every file):
```ts
    aursaLaw: "RSA Law & Harm Minimisation",
    aursaAge: "Minors & Proof of Age",
    aursaDrinks: "Standard Drinks & Effects",
    aursaIntox: "Recognising Intoxication",
    aursaRefuse: "Refusing Service",
    aursaCare: "At-Risk Customers & Safety",
```

## app/globals.css
Light block after the last exam theme. Hue 128 (deep bottle green), unused in globals.css and in
every other wave-2 WIRING.md as of writing (nearest taken: 120, 135). A yellow/amber hue was rejected:
at 30% lightness it fails 4.5:1 with white text; this block gives about 5.4:1. Then run
`tools/gen_dark_brand_css.py` once for all wave-2 themes.
```css
  /* RSA theme (Australia) */
  [data-theme="aursa"] {
    --brand: 128 50% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 128 45% 95%;
    --brand-hover: 128 50% 25%;
    --brand-dark: 128 50% 22%;
    --brand-darker: 128 45% 15%;
    --brand-muted: 128 25% 68%;
    --brand-border: 128 25% 78%;
    --brand-border-light: 128 30% 88%;
    --brand-gradient-to: 45 70% 94%;
  }
```

## lib/testCatalog.ts
- `EXAM_BLURBS`:
```ts
  aursa: "Practice for SITHFAB021, the national Responsible Service of Alcohol unit in Australia: standard drinks, proof of age, signs of intoxication and refusing service, with state rules marked where they vary.",
```
- `EXAM_ORG`: `aursa: "SITHFAB021 · national RSA unit, Australia",`
- Hub group: "Australia school and work certificates" (or the AU work group), with aurcg, aufss, aufirstaid, auforklift, auwah.
- `SEARCH_ALIASES`:
```ts
  aursa: "rsa responsible service of alcohol sithfab021 sithfab002 rsa certificate rsa course rsa quiz rsa answers bar staff bartender bottle shop liquor licence nsw victoria queensland wa sa tasmania act nt australia competency card",
```
- `RELATED_OVERRIDES` only if its hub group ends up with fewer than three other members (aurcg is the natural sibling).

## lib/region.ts
`TEST_REGIONS`: `aursa: "AU",`. Add `"aursa"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts
```ts
  aursa: {
    answer:
      "SITHFAB021 Provide responsible service of alcohol is the national RSA unit for anyone who sells, serves or supplies alcohol in Australia. It is a short course, often a few hours online or in a classroom, assessed by a registered training organisation with knowledge questions and practical tasks rather than a single national exam; most providers require every knowledge question to be correct. Each state and territory sets its own certification rules, such as approved courses, photo cards and refreshers.",
    rows: [
      { label: "Unit", value: "SITHFAB021 (replaced SITHFAB002)" },
      { label: "Format", value: "RTO knowledge questions plus practical tasks" },
      { label: "Pass mark", value: "Set by the RTO, usually all knowledge questions correct (80% here is a readiness line)" },
      { label: "Course length", value: "Usually a few hours, by provider" },
      { label: "Legal drinking age", value: "18 in every state and territory" },
      { label: "Standard drink", value: "10 g of alcohol" },
      { label: "Certificate validity", value: "Varies by state (some require refreshers)" },
    ],
    basedOn: "the SITHFAB021 unit and assessment requirements on training.gov.au and the national alcohol guidelines, checked October 2026",
    source: { name: "training.gov.au: SITHFAB021 Provide responsible service of alcohol", url: "https://training.gov.au/Training/Details/SITHFAB021" },
  },
```

## components/TeachNudge.tsx
Add `"aursa"` to `TEACHER_LED` (hospitality / RTO course line).

## components/exam/ExamClassFaq.tsx
`TEACHES`: `aursa: "an RSA course",`

## lib/tigerAssets.ts
Optional: `BORROWED_SETS`: `aursa: "alcohol",` (the alcohol server tiger exists and fits; same as ukaplh).

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` (wave-2 international landings, incl. RSA).

## scripts/build-training-parts.ts
Run `npx tsx scripts/build-training-parts.ts` after wiring.

## Not needed
No new icon, no next.config redirect; sitemap and /og pick it up from `EXAMS`.

## CLAUDE.md (Additional Exams, with the other Australian exams)
```md
- **RSA** (Australia, SITHFAB021 Provide responsible service of alcohol, `/rsa/*`, landing `/rsa-practice-test`): `data/au-rsa-questions.json` (200 questions: law/harm minimisation 36, minors/proof of age 36, standard drinks/effects 36, recognising intoxication 36, refusing service 32, at-risk customers/safety 24), test IDs 9501-9504, sets 9501-9504 (one per test), state `AURSA`, 80% readiness line (no national exam; RTOs usually require every knowledge question correct). 9/9/9/9/8/6 per test. National unit and assessment requirements (Release 1), NHMRC 2020 guidelines; certification, ID, minors and delivery rules "vary by state". Built by `tools/intl/aursa/build.py`. Hub group "Australia school and work certificates".
```

## Screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing aursa:rsa:9501`
