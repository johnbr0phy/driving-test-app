# Wiring for `uk18ed` (18th Edition, City & Guilds 2382-26, v1)

Files already written by the builder: `data/uk-18th-edition-questions.json` (built by
`python3 -I tools/intl/uk18ed/build.py data/uk-18th-edition-questions.json`), `lib/banks/uk18ed.ts`,
`app/18th-edition/*` (eight wrappers copied from `app/uk-theory/`),
`app/18th-edition-practice-test/page.tsx`.
Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/uk-18th-edition-questions.json --pool uk18edScope=12 --pool uk18edDefinitions=8 --pool uk18edAssessment=20 --pool uk18edProtection=52 --pool uk18edSelection=48 --pool uk18edInspection=12 --pool uk18edSpecial=24 --pool uk18edAppendices=24` prints PASS.

Note: `ExamLandingBreadcrumbs` does not exist in this tree (wiring.md says the breadcrumb was
removed in #488), so the landing does not render it, like `app/uk-driving-theory-test`.

## lib/banks/all.ts
```ts
import "./uk18ed";
```

## lib/exams.ts
1. Add `| "uk18ed"` to the `ExamId` union (after the other international ids).
2. Icon: existing `"hardhat"` key, no union change. (If the integrator adds a `"zap"` key with
   lucide `Zap` in `components/TestIcon.tsx` for `caelec`, use it here too.)
3. Block before `const htl`:
```ts
const uk18ed: ExamConfig = {
  id: "uk18ed",
  stateCode: "UK18ED",
  idBase: 7800,
  slug: "/18th-edition",
  landingPath: "/18th-edition-practice-test",
  name: "18th Edition Practice Test",
  shortName: "18th Edition",
  examLabel: "18th Edition exam",
  fullName: "City & Guilds 2382-26 18th Edition IET Wiring Regulations (BS 7671:2018+A4:2026) exam",
  questionIdPrefix: "UK18ED-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  // City & Guilds Level 3 Award in the Requirements for Electrical Installations BS 7671:2018
  // (2382-26), handbook v1.0 March 2026, checked October 2026: one open-book online test (2382-626)
  // of 60 multiple-choice questions in 120 minutes on BS 7671:2018+A4:2026, pass mark approx. 60%.
  // Test specification: scope, object and fundamental principles 4; definitions 2; assessment of
  // general characteristics 6; protection for safety 15; selection and erection 14; inspection and
  // testing 4; special installations or locations 7; Part 8 and the appendices 8. Scaled to 50:
  // 3/2/5/13/12/3/6/6. 2382-26 replaced 2382-22 from 16 April 2026; A2+A3 withdrawn 15 Oct 2026.
  // All items original; no regulation text quoted.
  blueprint: {
    uk18edScope: 3,
    uk18edDefinitions: 2,
    uk18edAssessment: 5,
    uk18edProtection: 13,
    uk18edSelection: 12,
    uk18edInspection: 3,
    uk18edSpecial: 6,
    uk18edAppendices: 6,
  },
  trainingSets: testSets(7800, 4),
  categoryLabels: {
    uk18edScope: "Scope, Object & Fundamental Principles",
    uk18edDefinitions: "Definitions",
    uk18edAssessment: "Assessment of General Characteristics",
    uk18edProtection: "Protection for Safety",
    uk18edSelection: "Selection & Erection",
    uk18edInspection: "Inspection & Testing",
    uk18edSpecial: "Special Installations & Locations",
    uk18edAppendices: "Part 8 & Appendices",
  },
  copy: {
    guestPrompt: "to save your 18th Edition progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock exam, each holding exactly that test's 50 questions across every part of BS 7671. Missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions in the 2382-26 proportions, 60% to pass",
    heroSubs: [
      "Eight parts of BS 7671, four mock exams. Parts 4 and 5 are half the paper.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. Tab your BS 7671 and book your exam.",
    ],
    sourceLine: "Based on the City & Guilds 2382-26 test specification and BS 7671:2018+A4:2026. Original questions; keep your own copy of the book open, as in the real open-book exam.",
    analyticsKey: "uk18ed",
  },
};
```
4. Append `uk18ed` to the `EXAMS` array (before `htl`, with the other international exams).

## lib/examData.ts
Nothing (the bank registers itself through `lib/banks/uk18ed.ts`).

## types/index.ts
- Add `| "UK18ED"` to `QuestionType` (before `"HTL"`).
- `QuestionCategory`:
```ts
  // 18th Edition, BS 7671 (UK)
  | "uk18edScope"
  | "uk18edDefinitions"
  | "uk18edAssessment"
  | "uk18edProtection"
  | "uk18edSelection"
  | "uk18edInspection"
  | "uk18edSpecial"
  | "uk18edAppendices"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts
Same English labels in every file, next to the `ukcar*` keys:
```ts
    uk18edScope: "Scope, Object & Fundamental Principles",
    uk18edDefinitions: "Definitions",
    uk18edAssessment: "Assessment of General Characteristics",
    uk18edProtection: "Protection for Safety",
    uk18edSelection: "Selection & Erection",
    uk18edInspection: "Inspection & Testing",
    uk18edSpecial: "Special Installations & Locations",
    uk18edAppendices: "Part 8 & Appendices",
```

## app/globals.css
Hue 50 (dark electrical gold; nothing else sits between 42 and 70). White on 50 80% 30% is 4.5:1.
```css
  /* 18th Edition wiring regulations theme (UK) */
  [data-theme="uk18ed"] {
    --brand: 50 80% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 50 80% 95%;
    --brand-hover: 50 80% 25%;
    --brand-dark: 50 80% 22%;
    --brand-darker: 50 70% 15%;
    --brand-muted: 50 45% 70%;
    --brand-border: 50 45% 76%;
    --brand-border-light: 50 40% 88%;
    --brand-gradient-to: 38 80% 95%;
  }
```
Then run `python3 tools/gen_dark_brand_css.py` for the `.dark [data-theme="uk18ed"]` block.

## lib/testCatalog.ts
- `EXAM_BLURBS`:
```ts
  uk18ed: "Free mock exams for the 18th Edition (City & Guilds 2382-26) on BS 7671:2018+A4:2026: disconnection times, RCDs, cable sizing, earthing and bonding, special locations and the appendices, weighted like the real open-book paper.",
```
- `EXAM_ORG`: `uk18ed: "City & Guilds 2382-26 · BS 7671:2018+A4:2026",`
- `GROUPS`: the new "UK workplace and trade certificates" group (proposed by `uksia`):
  `{ title: "UK workplace and trade certificates", ids: ["uksia", "uk18ed"] },`
- `SEARCH_ALIASES`:
```ts
  uk18ed: "18th edition wiring regulations bs7671 bs 7671 iet regs city and guilds 2382 2382-26 2382-22 amendment 4 a4 2026 electrician exam wiring regs mock open book electrical installation uk",
```
- `RELATED_OVERRIDES` (if the group has fewer than three other members):
  `uk18ed: ["uksia", "epa608", "osha"],` (add `"caelec"` if it is wired).

## lib/region.ts
`TEST_REGIONS`: add `uk18ed: "UK",` to the UK line.

## lib/tigerAssets.ts
`BORROWED_SETS`: `uk18ed: "osha",` (the hard-hat tiger fits a trade exam until it has its own set).

## components/TeachNudge.tsx
Add `"uk18ed"` to `TEACHER_LED` under "Trade schools, pre-licensing courses and instructor-led
certifications" (it is a taught 2382 course at FE colleges and training centres).

## components/exam/ExamClassFaq.tsx
`TEACHES` (trade schools section): `uk18ed: "an 18th Edition (2382) course",`

## lib/examFacts.ts
```ts
  uk18ed: {
    answer:
      "The 18th Edition exam is the City & Guilds Level 3 Award in the Requirements for Electrical Installations (2382-26), on BS 7671:2018 with Amendment 4:2026, the IET Wiring Regulations. It is one online, open-book test of 60 multiple-choice questions in 2 hours, taken with a clean copy of BS 7671, and the pass mark is approximately 60%. 2382-26 replaced 2382-22 from 16 April 2026.",
    rows: [
      { label: "Questions", value: "60 multiple choice" },
      { label: "Time", value: "2 hours" },
      { label: "Pass mark", value: "About 60% (pass or fail)" },
      { label: "Open book", value: "BS 7671:2018+A4:2026 only, no notes or added material" },
      { label: "Biggest areas", value: "Protection for safety 15, selection and erection 14" },
      { label: "Qualification", value: "C&G Level 3 Award, 2382-26 (35 guided learning hours)" },
      { label: "Taken at", value: "Approved colleges and training centres, on screen" },
    ],
    basedOn: "the City & Guilds 2382-26 qualification handbook (v1.0, March 2026) and the IET and NICEIC Amendment 4 guidance, checked October 2026",
    source: { name: "City & Guilds: Requirements for Electrical Installations (2382)", url: "https://www.cityandguilds.com/qualifications-and-apprenticeships/building-services-industry/electrical-installation/2382-requirements-for-electrical-installations" },
  },
```

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` (comment: 18th Edition landing).

## lib/sitemaps.ts, next.config.ts, lib/server/classQuestions.ts
Nothing exam-specific: the sitemap reads `EXAMS`, there are no redirects, and class questions
come through `lib/banks/all.ts`.

## scripts
`npx tsx scripts/build-training-parts.ts` after wiring. Screenshots:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing uk18ed:18th-edition:7801`

## CLAUDE.md
Under "Additional Exams":
```md
- **18th Edition** (City & Guilds 2382-26 on BS 7671:2018+A4:2026, the IET Wiring Regulations, `/18th-edition/*`, landing `/18th-edition-practice-test`): `data/uk-18th-edition-questions.json` (200 questions: scope 12, definitions 8, general characteristics 20, protection for safety 52, selection and erection 48, inspection and testing 12, special locations 24, Part 8 and appendices 24), test IDs 7801-7804, sets 7801-7804, state `UK18ED`, 60% pass (C&G "approx. 60%"). 3/2/5/13/12/3/6/6 per test, scaled from the 2382-26 test specification's 4/2/6/15/14/4/7/8 of 60 (open book, 2 hours). Amendment 4 content (FI no longer fails an EICR, pink functional earth, r1/rn/r2 on Minor Works, PoE, batteries); no regulation text quoted and few regulation numbers. Teacher-led (FE colleges and training centres). Hub group "UK workplace and trade certificates". Rebuild with `tools/intl/uk18ed/build.py`.
```
