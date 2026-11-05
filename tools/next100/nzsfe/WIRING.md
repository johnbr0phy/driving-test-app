# Wiring for `nzsfe` (Nursing Council of New Zealand State Final Examination, registered nurse, v1, region NZ)

Files already written by the builder: `data/nz-nursing-state-final-questions.json` (200, PASS,
key-longest 17%, key>1.2x 20%), `lib/banks/nzsfe.ts`, `app/nz-nursing-state-final/*` (layout,
redirect, dashboard, drill, stats, copied from `app/kenya-nursing-council/`; no test or practice
folders, the shared `app/[slug]` routes serve them),
`app/nursing-council-nz-state-final-exam-practice-test/page.tsx`, `tools/next100/nzsfe/*` (spec,
sources, `q_*.py`, `build.py`, this file). Everything below goes in shared files.

Format note: the Nursing Council of New Zealand (Te Kaunihera Tapuhi o Aotearoa) sets a State Final
Examination for registered and enrolled nurses; New Zealand graduates supply their results with
their registration application and are registered as soon as practicable after passing (Register
as a nurse page, read 2026-11-05). The Council's public site has no page giving the question count,
time, format, sittings or pass standard (old exam URLs return 404; web search was unavailable this
session, so no other source was checked). Here: four 50-question mock tests (Tigertest's blueprint
around the 2025 standards of competence and NZ clinical practice), DMV-style sets (Set N = Test N),
8 dashboard steps, 70% as Tigertest's readiness target. The integrator may want to confirm the real
format (count, time, pass standard) before launch and adjust the landing FAQ and examFacts.

## lib/exams.ts

Add `"nzsfe"` to the `ExamId` union. Icon `stethoscope` already exists.

```ts
const nzsfe: ExamConfig = {
  id: "nzsfe",
  stateCode: "NZSFE",
  idBase: 21500,
  slug: "/nz-nursing-state-final",
  landingPath: "/nursing-council-nz-state-final-exam-practice-test",
  name: "Nursing Council NZ State Final Exam Practice Test",
  shortName: "NZ State Final",
  examLabel: "State Final Examination",
  fullName: "Nursing Council of New Zealand State Final Examination (registered nurse)",
  questionIdPrefix: "NZSFE-",
  icon: "stethoscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Nursing Council of New Zealand State Final Examination (checked November 2026): set by the
  // Council for graduates of approved programmes before registration. The Council's public site
  // gives no question count, time or pass standard, so this split, organised around the 2025
  // standards of competence (six pou, in force for all purposes from 1 January 2026) and NZ
  // clinical practice, is Tigertest's, and 70% is a readiness target. All items original.
  blueprint: {
    nzsfeTiriti: 5,
    nzsfeLaw: 6,
    nzsfeAssess: 6,
    nzsfeMeds: 7,
    nzsfeAcute: 9,
    nzsfeLongTerm: 5,
    nzsfeMental: 4,
    nzsfeChild: 4,
    nzsfeLead: 4,
  },
  trainingSets: testSets(21500, 4),
  categoryLabels: {
    nzsfeTiriti: "Te Tiriti, Māori Health & Cultural Safety",
    nzsfeLaw: "Law, Ethics & Professional Practice",
    nzsfeAssess: "Assessment & Clinical Reasoning",
    nzsfeMeds: "Medicines & Calculations",
    nzsfeAcute: "Acute & Medical-Surgical Care",
    nzsfeLongTerm: "Long-term Conditions & Older Adults",
    nzsfeMental: "Mental Health & Addiction",
    nzsfeChild: "Child, Maternal & Whānau Health",
    nzsfeLead: "Leadership, Safety & Communication",
  },
  copy: {
    guestPrompt: "to save your State Final progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all nine topics. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 70% readiness line",
    heroSubs: [
      "Nine topics, four mock tests. Acute care and medicines are the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for State Finals.",
    ],
    sourceLine: "Based on New Zealand law, the Nursing Council's 2025 standards of competence and NZ clinical guidance. Original questions; the format and the 70% line are Tigertest's. Not affiliated with the Nursing Council of New Zealand.",
    analyticsKey: "nzsfe",
  },
};
```

Append `nzsfe` to the `EXAMS` array after `nzlcq`. Dashboard: 4 sets + 4 tests = 8 steps. Check:
21501-21504 (tests and sets) must be free (the batch assigns 21500).

## lib/banks/all.ts

```ts
import "./nzsfe";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/nzsfe.ts`.

## types/index.ts

- `QuestionType`: add `| "NZSFE"`.
- `QuestionCategory`, under a `// Nursing Council of New Zealand State Final Examination` comment:

```ts
  | "nzsfeTiriti"
  | "nzsfeLaw"
  | "nzsfeAssess"
  | "nzsfeMeds"
  | "nzsfeAcute"
  | "nzsfeLongTerm"
  | "nzsfeMental"
  | "nzsfeChild"
  | "nzsfeLead"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nzsfeTiriti: "Te Tiriti, Māori Health & Cultural Safety",
    nzsfeLaw: "Law, Ethics & Professional Practice",
    nzsfeAssess: "Assessment & Clinical Reasoning",
    nzsfeMeds: "Medicines & Calculations",
    nzsfeAcute: "Acute & Medical-Surgical Care",
    nzsfeLongTerm: "Long-term Conditions & Older Adults",
    nzsfeMental: "Mental Health & Addiction",
    nzsfeChild: "Child, Maternal & Whānau Health",
    nzsfeLead: "Leadership, Safety & Communication",
```

## app/globals.css

Hue from the international batch 4 table (305 30% 22%), rechecked against app/globals.css on 2026-11-05: the themes within 8 degrees (ukfood 305 70% 34%, pmp 305 90% 43%, aswbclin 300 20% 34%, timestables, hesi, cysa) all differ by 15+ points of saturation or 8+ of lightness. Then
run `tools/gen_dark_brand_css.py`.

```css
  /* Nursing Council of New Zealand State Final Examination theme */
  [data-theme="nzsfe"] {
    --brand: 305 30% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 305 25% 95%;
    --brand-hover: 305 30% 18%;
    --brand-dark: 305 30% 16%;
    --brand-darker: 305 28% 11%;
    --brand-muted: 305 15% 68%;
    --brand-border: 305 15% 78%;
    --brand-border-light: 305 12% 88%;
    --brand-gradient-to: 320 25% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nzsfe: "Practice for the Nursing Council of New Zealand State Final Examination for registered nurses: Te Tiriti and cultural safety, the HPCA Act and Code of Rights, assessment, medicines and drug calculations, acute care, mental health and whānau health.",`
- `EXAM_ORG`: `nzsfe: "Nursing Council of New Zealand · registered nurse State Final Examination",`
- Hub group: append `"nzsfe"` to `{ title: "New Zealand licences", ids: ["nzfirearms", "nzlcq"] }`
  (the brief's group), giving `ids: ["nzfirearms", "nzlcq", "nzsfe"]`.
- `SEARCH_ALIASES`:
  `nzsfe: "state final exam nz state finals nursing state final examination nursing council of new zealand ncnz exam te kaunihera tapuhi o aotearoa registered nurse exam nz rn exam new zealand nursing registration exam bachelor of nursing state finals nz nursing exam questions",`
- `RELATED_OVERRIDES` (its group neighbours are firearms and the LCQ): `nzsfe: ["uknmc", "rexpn", "nclex"],`

## lib/region.ts

- `TEST_REGIONS`: `nzsfe: "NZ",` (next to `nzlcq: "NZ"`), and add `"nzsfe"` to `NON_DRIVING_TESTS`.
- `REGION_HOME.NZ` now lists a fourth test. Suggested update (same shape; the CTA stays on the learner
  licence test):

```ts
  NZ: {
    title: "Free NZ Practice Tests: Learner, Firearms, LCQ & Nursing | Tigertest",
    description: "Free practice for New Zealand: the learner licence test, the firearms licence theory test, the LCQ for duty managers and the Nursing Council State Final Examination. No account needed.",
    lead: "Practice for the learner licence theory test, the firearms licence theory test, the Licence Controller Qualification and the registered nurse State Final Examination. Original questions, every answer explained. No signup.",
    cta: { label: "Learner licence test", href: "/nz-learner-licence-practice-test" },
    testsTitle: "Learner licence theory test",
    testsSub: "200 questions on the Road Code, in km/h for left-hand traffic. The real test is 35 questions and you need 32 right.",
  },
```
(Other batch-4 NZ builders, nzmoto and nzheavy, may propose their own REGION_HOME.NZ text; merge.)

## lib/examFacts.ts

```ts
  nzsfe: {
    answer:
      "The State Final Examination is the examination the Nursing Council of New Zealand (Te Kaunihera Tapuhi o Aotearoa) sets for graduates of approved nursing programmes before it registers them as registered or enrolled nurses. A New Zealand graduate applying for registration as a registered nurse supplies their State Final Examination results, support from the head of their school of nursing and two referees, and the Council registers successful applicants as soon as practicable after they pass. The Council's public website does not set out the number of questions, time or pass standard; candidates should ask their school of nursing or the Council for the current exam details.",
    rows: [
      { label: "Run by", value: "Nursing Council of New Zealand (Te Kaunihera Tapuhi o Aotearoa)" },
      { label: "Who sits it", value: "Graduates of approved NZ nursing programmes, before registration" },
      { label: "Standards", value: "Standards of competence for registered nurses 2025 (six pou), in force for all purposes from 1 January 2026" },
      { label: "Questions and time", value: "Not published on the Council's website; ask your school of nursing" },
      { label: "Pass standard", value: "Not published on the Council's website" },
      { label: "After passing", value: "Registration, then an annual practising certificate" },
    ],
    basedOn: "Nursing Council of New Zealand: Register as a nurse, Registered nurse scope of practice (January 2025) and Standards of competence for registered nurses (2025), checked November 2026",
    source: { name: "Nursing Council of New Zealand: Register as a nurse", url: "https://www.nursingcouncil.org.nz/Public/NCNZ/nursing-section/Register_as_a_nurse.aspx" },
  },
```
(Fees are left out.)

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx and components/exam/ExamClassFaq.tsx

Add `"nzsfe"` to `TEACHER_LED` (schools of nursing run State Final revision) and in `TEACHES`:
`nzsfe: "a nursing school class",`. The landing already renders `<ExamClassFaq examId="nzsfe" />`
and `classFaqJsonLd("nzsfe")`.

## lib/tigerAssets.ts

Borrow the nursing tiger through `BORROWED_SETS`: `nzsfe: "nclex",` (as `kenck`, `gulfrn` and `uknmc` do).

## components/TestIcon.tsx, components/CDLHeader.tsx, lib/sitemaps.ts, next.config.ts, lib/server/classQuestions.ts

Nothing: `stethoscope` exists, sitemaps map over `EXAMS`, no redirects, v1 banks load through
`lib/banks/all.ts`.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 50 each, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nzsfe:nz-nursing-state-final:21501`

## CLAUDE.md (under Additional Exams, after the NCK Exam bullet)

```md
- **NZ State Final** (Nursing Council of New Zealand State Final Examination, registered nurse, `/nz-nursing-state-final/*`, landing `/nursing-council-nz-state-final-exam-practice-test`): `data/nz-nursing-state-final-questions.json` (200 original questions: Te Tiriti, Māori health and cultural safety 20, law, ethics and professional practice (HPCA Act, Code of Rights, privacy, EPA, End of Life Choice Act) 24, assessment and clinical reasoning 24, medicines and calculations 28, acute and medical-surgical care 36, long-term conditions and older adults 20, mental health and addiction 16, child, maternal and whānau health 16, leadership, safety and communication 16), test IDs 21501-21504, sets 21501-21504 (`testSets`, one per test), state `NZSFE`, prefix `NZSFE-`, 70% readiness line (the Council's public site gives no question count, time or pass standard; New Zealand graduates supply State Final results to register). 5/6/6/7/9/5/4/4/4 per test, Tigertest's split around the 2025 standards of competence (six pou, in force for all purposes from 1 January 2026). NZ law and practice (Medicines Act 1981, Misuse of Drugs Act 1975, Medsafe classification, Pharmac and Medsafe, TSANZ oxygen targets, NZEWS, ABC smoking cessation, safe sleep, rheumatic fever), British spelling, mmol/L and micrograms. Kept clear of `kenck`, `gulfrn`, `phnle`, `pkpnmc`, `cna` and the v2 nursing banks. Built by `tools/next100/nzsfe/build.py`; sources in `tools/next100/nzsfe/sources.md`. Region NZ, hub group "New Zealand licences", `[data-theme="nzsfe"]` muted plum (305 30% 22%), borrows the NCLEX tiger, teacher-led (schools of nursing).
```
