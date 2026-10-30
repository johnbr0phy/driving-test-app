# capal wiring (Canadian Firearms Safety Course, PAL non-restricted, v1)

Files already written by this exam (no action needed): `data/canadian-firearms-questions.json`
(built by `python3 -I tools/intl/capal/build.py`), `lib/banks/capal.ts` (bank module, same shape as
`lib/banks/ukcar.ts`), `app/canadian-firearms/*` (8 wrappers copied from `app/uk-theory/`),
`app/canadian-firearms-safety-course-practice-test/page.tsx`.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/canadian-firearms-questions.json --pool capalHistory=20 --pool capalActions=24 --pool capalAmmo=24 --pool capalSafety=32 --pool capalHandling=24 --pool capalFiring=16 --pool capalCare=12 --pool capalStorage=24 --pool capalLaw=24` prints PASS.

## lib/banks/all.ts
Append:
```ts
import "./capal";
```

## lib/exams.ts
1. `ExamId` union: add `| "capal"` (after `"camb"` is fine).
2. Icon: reuse the existing `"target"` key (Hunter Safety's); no icon union change.
3. Add before `const htl`:
```ts
const capal: ExamConfig = {
  id: "capal",
  stateCode: "CAPAL",
  idBase: 7900,
  slug: "/canadian-firearms",
  landingPath: "/canadian-firearms-safety-course-practice-test",
  name: "Canadian Firearms Safety Course Practice Test",
  shortName: "CFSC",
  examLabel: "CFSC written test",
  fullName: "Canadian Firearms Safety Course (CFSC) written test for the non-restricted PAL",
  questionIdPrefix: "CAPAL-",
  icon: "target",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // RCMP Canadian Firearms Program, Canadian Firearms Safety Course (rcmp.ca safety courses page,
  // checked Oct 2026): classroom course by provincially designated instructors, then a written
  // test (usually 50 questions, mostly multiple choice) and a practical handling test, 80% to pass each. The
  // categories follow the course's required topics in student handbook order; RCMP publishes no
  // per-topic weights, so the counts are ours. Law current to Oct 2026 (SOR/98-209 storage,
  // display, transport and handling; Criminal Code Part III; Bill C-21). All items original.
  blueprint: {
    capalHistory: 5,
    capalActions: 6,
    capalAmmo: 6,
    capalSafety: 8,
    capalHandling: 6,
    capalFiring: 4,
    capalCare: 3,
    capalStorage: 6,
    capalLaw: 6,
  },
  trainingSets: testSets(7900, 4),
  categoryLabels: {
    capalHistory: "Evolution & Parts of Firearms",
    capalActions: "Types & Actions",
    capalAmmo: "Ammunition",
    capalSafety: "Basic Safety: ACTS & PROVE",
    capalHandling: "Safe Handling & Carrying",
    capalFiring: "Firing Techniques",
    capalCare: "Care of Firearms",
    capalStorage: "Storage, Display & Transport",
    capalLaw: "Licensing & the Law",
  },
  copy: {
    guestPrompt: "to save your firearms safety course progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all nine course topics. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 80% to pass, like the CFSC written test",
    heroSubs: [
      "Nine course topics, four practice tests. You need 40 of 50 to pass.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Practise PROVE with your instructor and book your test.",
    ],
    sourceLine: "Based on the RCMP Canadian Firearms Safety Course topics and federal law as of October 2026. Original questions; the practical handling test is not modelled.",
    analyticsKey: "capal",
  },
};
```
4. `EXAMS` array: add `capal` before `htl` (after `ausa`).

## types/index.ts
- `QuestionType`: add `| "CAPAL"`.
- `QuestionCategory`: add under a comment:
```ts
  // Canadian Firearms Safety Course (capal)
  | "capalHistory"
  | "capalActions"
  | "capalAmmo"
  | "capalSafety"
  | "capalHandling"
  | "capalFiring"
  | "capalCare"
  | "capalStorage"
  | "capalLaw"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (same English labels in all, next to the ukcar keys)
```ts
    capalHistory: "Evolution & Parts of Firearms",
    capalActions: "Types & Actions",
    capalAmmo: "Ammunition",
    capalSafety: "Basic Safety: ACTS & PROVE",
    capalHandling: "Safe Handling & Carrying",
    capalFiring: "Firing Techniques",
    capalCare: "Care of Firearms",
    capalStorage: "Storage, Display & Transport",
    capalLaw: "Licensing & the Law",
```

## app/globals.css
Forest green, hue 110 (unused as of this build; check the other agents' picks). Light block after the last exam theme:
```css
  [data-theme="capal"] {
    --brand: 110 38% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 110 40% 95%;
    --brand-hover: 110 38% 25%;
    --brand-dark: 110 38% 20%;
    --brand-darker: 110 30% 14%;
    --brand-muted: 110 22% 72%;
    --brand-border: 110 22% 78%;
    --brand-border-light: 110 18% 88%;
    --brand-gradient-to: 80 50% 95%;
  }
```
Dark block: run `tools/gen_dark_brand_css.py`, or by hand (brand under 50% lifts to 50%):
```css
  .dark [data-theme="capal"] {
    --brand: 110 38% 50%;
    --brand-hover: 110 38% 42%;
    --brand-light: 110 30% 13%;
    --brand-gradient-to: 80 30% 11%;
    --brand-border-light: 110 18% 24%;
    --brand-border: 110 22% 34%;
    --brand-muted: 110 22% 45%;
    --brand-dark: 110 38% 65%;
    --brand-darker: 110 30% 78%;
  }
```

## lib/testCatalog.ts
- `EXAM_BLURBS`:
```ts
  capal: "Free practice for the Canadian Firearms Safety Course (CFSC) written test for the non-restricted PAL: ACTS and PROVE, actions, ammunition, safe handling, storage and transport rules and firearms law, with the 80% pass mark.",
```
- `EXAM_ORG`: `capal: "RCMP Canadian Firearms Program · non-restricted PAL"`
- `GROUPS`: new group (shared with the Red Seal electrician exam from the `caelec` agent; use its real id):
```ts
  { title: "Canada trade and safety certificates", ids: ["<caelec id>", "capal"] },
```
- `SEARCH_ALIASES`:
```ts
  capal: "pal pal test pal exam cfsc canadian firearms safety course firearms licence possession and acquisition licence gun licence canada rcmp non-restricted acts prove hunting rifle shotgun",
```
- `RELATED_OVERRIDES` (the new group has fewer than three other members):
```ts
  capal: ["hunter", "boating", "caon"],
```

## lib/examFacts.ts
```ts
  capal: {
    answer:
      "The Canadian Firearms Safety Course (CFSC) is the RCMP course you must pass before applying for a Possession and Acquisition Licence (PAL) for non-restricted firearms. After classroom instruction from a provincially designated instructor you take a written test, usually 50 questions and mostly multiple choice, and a practical handling test, and you need 80% on each. Anyone 12 or older can take it; the PAL itself is for adults 18 and over and lasts 5 years.",
    rows: [
      { label: "Written test", value: "Usually 50 questions, mostly multiple choice" },
      { label: "Practical test", value: "Handling and PROVE on common actions" },
      { label: "Pass mark", value: "80% on each test" },
      { label: "Course delivered by", value: "Instructors designated by each province's Chief Firearms Officer" },
      { label: "Minimum age", value: "12 for the course, 18 for a PAL" },
      { label: "Licence", value: "PAL, valid 5 years; 28-day minimum wait for new applicants" },
      { label: "Restricted firearms", value: "Separate CRFSC course" },
    ],
    basedOn: "the RCMP Canadian Firearms Program course requirements and federal firearms law, checked October 2026",
    source: { name: "RCMP: Firearms safety courses", url: "https://rcmp.ca/en/firearms/firearms-safety-training-transport-and-storage/safety-courses" },
  },
```

## components/exam/ExamClassFaq.tsx (`TEACHES`)
```ts
  capal: "the Canadian Firearms Safety Course",
```

## components/TeachNudge.tsx (`TEACHER_LED`)
Add `"capal"` to the "Trade schools, pre-licensing courses and instructor-led certifications" line.

## lib/server/classQuestions.ts
Nothing to add: it imports `@/lib/banks/all`, which picks up capal once `import "./capal";` is added there.

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` (comment: add the Canadian Firearms Safety Course landing).

## lib/sitemaps.ts / next.config.ts
Nothing exam-specific found for v1 exams (the exams sitemap reads the catalog); no redirects needed.

## scripts/build-training-parts.ts
Run `npx tsx scripts/build-training-parts.ts` after wiring so `lib/trainingParts.json` has capal.

## Landing screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing capal:canadian-firearms:7901`
(writes `capal-desktop.png`, `capal-mobile.png` and the `-dark` twins used by the landing).

## CLAUDE.md (bullet under Additional Exams)
```md
- **CFSC** (Canadian Firearms Safety Course, the written test for the non-restricted PAL, `/canadian-firearms/*`, landing `/canadian-firearms-safety-course-practice-test`): `data/canadian-firearms-questions.json` (200 questions: history/parts 20, types/actions 24, ammunition 24, ACTS and PROVE 32, handling/carries 24, firing 16, care 12, storage/display/transport 24, licensing/law 24), test IDs 7901-7904, sets 7901-7904 (one per test), state `CAPAL`, 80% pass. 5/6/6/8/6/4/3/6/6 per test, in RCMP course-topic order (no official weights). Federal law as of Oct 2026 (SOR/98-209, Criminal Code Part III, Bill C-21); the May 2020 prohibitions kept general. Educational safety content only. Built by `tools/intl/capal/build.py`. Hub group "Canada trade and safety certificates".
```

## Note
The brief asks for `<ExamLandingBreadcrumbs>`, but no such component exists in this worktree
(no landing uses it), so the landing omits it, like `app/uk-driving-theory-test/page.tsx`.
