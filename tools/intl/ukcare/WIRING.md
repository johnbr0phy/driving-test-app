# Wiring for `ukcare` (Care Certificate, v1)

Files already written by the builder: `data/uk-care-certificate-questions.json` (200, PASS),
`lib/banks/ukcare.ts`, `app/care-certificate/*` (8 wrappers), `app/care-certificate-practice-test/page.tsx`,
`tools/intl/ukcare/*`. Everything below goes in shared files.

## lib/exams.ts

Add `"ukcare"` to the `ExamId` union (after `"ukadi"`). Icon `heart` already exists in the icon union.

Block (place after `const ukadi` or with the other UK exams, before `const htl`):

```ts
const ukcare: ExamConfig = {
  id: "ukcare",
  stateCode: "UKCARE",
  idBase: 8600,
  slug: "/care-certificate",
  landingPath: "/care-certificate-practice-test",
  name: "Care Certificate Practice Test",
  shortName: "Care Certificate",
  examLabel: "Care Certificate",
  fullName: "Care Certificate (16 standards, England)",
  questionIdPrefix: "UKCARE-",
  icon: "heart",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // The Care Certificate standards, updated March 2025 (NHS England, Skills for Care and
  // Skills for Health; 16 standards, to be met within 12 weeks of starting). There is no
  // national exam: workplace assessors sign off knowledge and observed practice. The 16
  // standards are grouped into 8 categories (standard numbers in the labels' comments);
  // counts are ours. 80% is a readiness line, not an official pass mark. All items original.
  blueprint: {
    ukcareRole: 5, // 1 Understand your role, 2 Your personal development
    ukcareDuty: 6, // 3 Duty of care, 4 Equality, diversity, inclusion and human rights
    ukcarePerson: 8, // 5 Work in a person-centred way, 7 Privacy and dignity
    ukcareComms: 6, // 6 Communication, 14 Handling information
    ukcareNutrition: 5, // 8 Fluids and nutrition, 12 Basic life support
    ukcareAwareness: 6, // 9 Mental health and dementia, 16 Learning disability and autism
    ukcareSafeguard: 7, // 10 Adult safeguarding, 11 Safeguarding children
    ukcareSafety: 7, // 13 Health and safety, 15 Infection prevention and control
  },
  trainingSets: testSets(8600, 4),
  categoryLabels: {
    ukcareRole: "Your Role & Personal Development",
    ukcareDuty: "Duty of Care & Equality",
    ukcarePerson: "Person-Centred Care, Privacy & Dignity",
    ukcareComms: "Communication & Handling Information",
    ukcareNutrition: "Fluids, Nutrition & Basic Life Support",
    ukcareAwareness: "Mental Health, Dementia, Learning Disability & Autism",
    ukcareSafeguard: "Safeguarding Adults & Children",
    ukcareSafety: "Health & Safety, Infection Control",
  },
  copy: {
    guestPrompt: "to save your Care Certificate progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all 16 standards. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across all 16 standards",
    heroSubs: [
      "Sixteen standards, four tests. Aim for 80% before your knowledge checks.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Show your assessor what you know.",
    ],
    sourceLine: "Based on the 16 Care Certificate standards as updated in March 2025. There is no official exam; 80% is a readiness target.",
    analyticsKey: "ukcare",
  },
};
```

Append `ukcare` to the `EXAMS` array (after `ukadi`, before `caon`).

## lib/banks/all.ts

```ts
import "./ukcare";
```
(next to `import "./ukcar";`). `lib/banks/ukcare.ts` is already written.

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/ukcare.ts`, like `ukcar`.

## types/index.ts

- `QuestionType`: add `| "UKCARE"`.
- `QuestionCategory`, under a `// Care Certificate (UK)` comment:

```ts
  | "ukcareRole"
  | "ukcareDuty"
  | "ukcarePerson"
  | "ukcareComms"
  | "ukcareNutrition"
  | "ukcareAwareness"
  | "ukcareSafeguard"
  | "ukcareSafety"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ukcareRole: "Your Role & Personal Development",
    ukcareDuty: "Duty of Care & Equality",
    ukcarePerson: "Person-Centred Care, Privacy & Dignity",
    ukcareComms: "Communication & Handling Information",
    ukcareNutrition: "Fluids, Nutrition & Basic Life Support",
    ukcareAwareness: "Mental Health, Dementia, Learning Disability & Autism",
    ukcareSafeguard: "Safeguarding Adults & Children",
    ukcareSafety: "Health & Safety, Infection Control",
```

## app/globals.css

Light block only (hue 315, unused); then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Care Certificate theme (UK) */
  [data-theme="ukcare"] {
    --brand: 315 55% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 315 60% 96%;
    --brand-hover: 315 55% 32%;
    --brand-dark: 315 55% 27%;
    --brand-darker: 315 48% 18%;
    --brand-muted: 315 35% 72%;
    --brand-border: 315 35% 80%;
    --brand-border-light: 315 32% 89%;
    --brand-gradient-to: 335 60% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ukcare: "Practice for the Care Certificate in England: all 16 standards as updated in 2025, from duty of care, person-centred care and safeguarding to dementia, learning disability and autism, and infection control.",`
- `EXAM_ORG`: `ukcare: "Skills for Care · 16 standards, England",`
- Hub group: suggested new "UK workplace and trade certificates" group with the other wave-2 UK work exams (`cscs`, `ukfood`, `ukaplh`, `ukfaw`, `ukcare`).
- `SEARCH_ALIASES`:
  `ukcare: "care certificate care cert 16 standards skills for care induction care worker carer healthcare assistant hca support worker social care adult social care certificate level 2 nhs england",`
- `RELATED_OVERRIDES` only if the UK work group ends up with fewer than three others: `ukcare: ["ukfaw", "ukfood", "cna"]`.

## lib/region.ts

`ukcare: "UK",` in `TEST_REGIONS`, and add `"ukcare"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts

```ts
  ukcare: {
    answer:
      "The Care Certificate is the set of 16 standards that new health and social care support workers in England are expected to meet during induction, updated in March 2025 with a new standard on learning disability and autism. It is not a qualification and has no national exam or pass mark: your employer's assessor checks your knowledge and watches your practice, and guidance says it should be completed within 12 weeks of starting.",
    rows: [
      { label: "Standards", value: "16 (updated March 2025)" },
      { label: "Exam", value: "None; workplace assessment of knowledge and practice" },
      { label: "Pass mark", value: "None official (80% here is a readiness line)" },
      { label: "Time to complete", value: "Within 12 weeks of starting" },
      { label: "Who takes it", value: "New care workers, healthcare assistants and support workers" },
      { label: "Fee", value: "None; part of employer induction" },
      { label: "Next step", value: "Level 2 Adult Social Care Certificate (qualification)" },
      { label: "Developed by", value: "Skills for Care, Skills for Health and NHS England" },
    ],
    basedOn: "The Care Certificate standards and guidance published by Skills for Care",
    source: { name: "Skills for Care: Care Certificate", url: "https://www.skillsforcare.org.uk/Developing-your-workforce/Care-Certificate/Care-Certificate.aspx" },
  },
```
(checked 2026-10-30)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave (includes the Care Certificate landing).

## components/TeachNudge.tsx

Add `"ukcare"` to `TEACHER_LED`.

## components/exam/ExamClassFaq.tsx

In `TEACHES` (healthcare section): `ukcare: "Care Certificate induction training",`
(reads "I teach Care Certificate induction training. Can my students use Tigertest?")

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects needed.

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `heart` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring (writes `lib/trainingParts.json`).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ukcare:care-certificate:8601`

## CLAUDE.md (under Additional Exams)

```md
- **Care Certificate** (England induction standards, `/care-certificate/*`, landing `/care-certificate-practice-test`): `data/uk-care-certificate-questions.json` (200 questions on the 16 standards updated March 2025, grouped: role/development 20, duty of care/equality 24, person-centred/privacy 32, communication/information 24, fluids/nutrition/BLS 20, mental health/dementia/LD/autism 24, safeguarding adults and children 28, health and safety/IPC 28), test IDs 8601-8604, sets 8601-8604 (one per test), state `UKCARE`, 80% readiness line (no official exam or pass mark; workplace assessors sign off). 5/6/8/6/5/6/7/7 per test. England law (Care Act 2014, MCA 2005, Equality Act 2010). Built by `tools/intl/ukcare/build.py`.
```
