# WIRING for caguard (Ontario security guard licence test), v1, idBase 9300

Files already written by the builder (no action): `data/ontario-security-guard-questions.json`
(built by `tools/intl/caguard/build.py`), `lib/banks/caguard.ts`, `app/ontario-security-guard/*`
(8 wrappers copied from `app/ontario-g1/`), `app/ontario-security-guard-practice-test/page.tsx`.

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/ontario-security-guard-questions.json --pool caguardIndustry=28 --pool caguardProcedures=20 --pool caguardReports=16 --pool caguardEmergency=28 --pool caguardLaw=52 --pool caguardCommunication=24 --pool caguardForce=16 --pool caguardFirstAid=16` -> PASS.

## lib/exams.ts
Add `"caguard"` to the `ExamId` union (after the other wave-2 Canada ids). Icon `badge` already exists (US `security`).
Add before `const htl`:

```ts
const caguard: ExamConfig = {
  id: "caguard",
  stateCode: "CAGUARD",
  idBase: 9300,
  slug: "/ontario-security-guard",
  landingPath: "/ontario-security-guard-practice-test",
  name: "Ontario Security Guard Practice Test",
  shortName: "Security Guard",
  examLabel: "Ontario security guard test",
  fullName: "Ontario security guard licence test",
  questionIdPrefix: "CAGUARD-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 62,
  // Ontario ministry basic test for security guards (ontario.ca testing page and security guard
  // study guide, checked Oct 2026): 60 multiple-choice questions in 75 minutes, 62% cut score.
  // Blueprint follows the suggested hours of the 12-section Training Syllabus for Security Guards
  // (updated July 2026, 80 h in and outside class): sections 1+2 (9 h) 7, 3 (8 h) 5, 4 (4 h) 4,
  // 5+6 (10 h) 7, 7+8 (26.5 h, capped) 13, 9+10 (12 h) 6, 11 (4 h) 4, 12 first aid (6.5 h) 4.
  blueprint: {
    caguardIndustry: 7,
    caguardProcedures: 5,
    caguardReports: 4,
    caguardEmergency: 7,
    caguardLaw: 13,
    caguardCommunication: 6,
    caguardForce: 4,
    caguardFirstAid: 4,
  },
  trainingSets: testSets(9300, 4),
  categoryLabels: {
    caguardIndustry: "The Industry, PSISA & Code of Conduct",
    caguardProcedures: "Basic Security Procedures",
    caguardReports: "Report Writing",
    caguardEmergency: "Health, Safety & Emergency Response",
    caguardLaw: "Canadian Law & Legal Authorities",
    caguardCommunication: "Communication & Sensitivity",
    caguardForce: "Use of Force",
    caguardFirstAid: "Emergency First Aid",
  },
  copy: {
    guestPrompt: "to save your security guard test progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across all twelve syllabus sections",
    heroSubs: [
      "Twelve syllabus sections, four tests. The real cut score is 62%.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your ministry test.",
    ],
    sourceLine: "Based on the Ontario Training Syllabus for Security Guards (2026) and the ministry study guide. Original questions; the real test's cut score is 62%.",
    analyticsKey: "caguard",
  },
};
```
Append `caguard` to the `EXAMS` array (before `htl`, next to the other Canada exams).

## lib/banks/all.ts
```ts
import "./caguard";
```

## types/index.ts
- `QuestionType`: add `| "CAGUARD"`.
- `QuestionCategory`: add under a comment `// Ontario security guard (caguard)`:
```ts
  | "caguardIndustry"
  | "caguardProcedures"
  | "caguardReports"
  | "caguardEmergency"
  | "caguardLaw"
  | "caguardCommunication"
  | "caguardForce"
  | "caguardFirstAid"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (same English labels in all five)
```ts
    caguardIndustry: "The Industry, PSISA & Code of Conduct",
    caguardProcedures: "Basic Security Procedures",
    caguardReports: "Report Writing",
    caguardEmergency: "Health, Safety & Emergency Response",
    caguardLaw: "Canadian Law & Legal Authorities",
    caguardCommunication: "Communication & Sensitivity",
    caguardForce: "Use of Force",
    caguardFirstAid: "Emergency First Aid",
```

## app/globals.css (light block; then run tools/gen_dark_brand_css.py once for all)
Hue 228 (navy), unused.
```css
  /* Ontario security guard theme (Canada) */
  [data-theme="caguard"] {
    --brand: 228 52% 36%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 228 60% 95%;
    --brand-hover: 228 52% 30%;
    --brand-dark: 228 52% 26%;
    --brand-darker: 228 48% 18%;
    --brand-muted: 228 35% 72%;
    --brand-border: 228 35% 78%;
    --brand-border-light: 228 30% 88%;
    --brand-gradient-to: 200 60% 95%;
  }
```

## lib/testCatalog.ts
- `EXAM_BLURBS`:
```ts
  caguard: "Ontario security guard licence test prep on the ministry training syllabus: the PSISA and Code of Conduct, citizen's arrest and trespass powers, use of force, report writing, emergency response and first aid.",
```
- `EXAM_ORG`: `caguard: "Ontario Ministry of the Solicitor General (PSISB)",`
- `SEARCH_ALIASES`:
```ts
  caguard: "ontario security guard test security licence ontario psisa guard card canada 40 hour security course serco ministry test security guard exam ontario private security",
```
- Hub group: suggested "Canada school and trade tests" (or a Canada workplace group with caauto, caplumb, cacarp, caweld, capsw, cawhmis, casfa). If its group ends up with fewer than three other members, add `RELATED_OVERRIDES.caguard = ["security", "cawhmis", "casfa"]` (or whichever exist).

## lib/region.ts
`TEST_REGIONS`: `caguard: "CA",` and add `"caguard"` to `NON_DRIVING_TESTS`.

## lib/examFacts.ts
```ts
  caguard: {
    answer:
      "The Ontario security guard test is the ministry's basic test you must pass before applying for a security guard licence. It has 60 multiple-choice questions in 75 minutes on the topics of the mandatory 40-hour basic training course, and the cut score is 62%. You book it with the training completion number from your course and take it online or at select DriveTest centres; you must be 18, entitled to work in Canada and have a clean criminal record to be licensed.",
    rows: [
      { label: "Questions", value: "60 multiple choice" },
      { label: "Time", value: "75 minutes (2-hour appointment)" },
      { label: "Passing score", value: "62%" },
      { label: "Training first", value: "40 hours incl. emergency first aid (33.5 without)" },
      { label: "Minimum age", value: "18" },
      { label: "Licence", value: "Digital, $80, renewed every two years" },
      { label: "Where", value: "Online or at select DriveTest centres" },
      { label: "Given by", value: "Ontario Ministry of the Solicitor General" },
    ],
    basedOn: "the Ontario Training Syllabus for Security Guards (updated July 2026) and the ministry security guard study guide, checked October 2026",
    source: { name: "Ontario.ca: Security guard and private investigator testing", url: "https://www.ontario.ca/page/security-guard-and-private-investigator-testing" },
  },
```

## components/exam/ExamClassFaq.tsx (TEACHES, trade schools block)
```ts
  caguard: "an Ontario security guard course",
```

## components/TeachNudge.tsx (TEACHER_LED, trade/instructor-led line)
Add `"caguard"`.

## lib/tigerAssets.ts
Same as caon if Canada exams are listed there: `caguard: "dmv",` (otherwise nothing; it falls back to the DMV tiger).

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` for the wave (comment names the new landings, incl. Ontario security guard).

## scripts/build-training-parts.ts
Run `npx tsx scripts/build-training-parts.ts` after wiring (writes the caguard split to `lib/trainingParts.json`).

## Screenshots
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing caguard:ontario-security-guard:9301`

## CLAUDE.md (Additional Exams list, near Security Guard)
```md
- **Ontario Security Guard** (ministry basic test for the PSISA guard licence, `/ontario-security-guard/*`, landing `/ontario-security-guard-practice-test`): `data/ontario-security-guard-questions.json` (200 questions: industry/PSISA 28, procedures 20, reports 16, health, safety and emergency 28, law and legal authorities 52, communication and sensitivity 24, use of force 16, first aid 16), test IDs 9301-9304, sets 9301-9304 (one per test), state `CAGUARD`, 62% pass (the ministry cut score; real test 60 questions in 75 minutes). 7/5/4/7/13/6/4/4 per test, weighted by the suggested hours of the 2026 Training Syllabus for Security Guards. Ontario law (PSISA, Trespass to Property Act) plus the Criminal Code. Sources in `tools/intl/caguard/sources.md`.
```
