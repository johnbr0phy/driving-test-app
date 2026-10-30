# Wiring for `caelec` (Red Seal Construction Electrician, v1)

Files already written by the builder: `data/red-seal-electrician-questions.json` (built by
`python3 -I tools/intl/caelec/build.py`), `app/red-seal-electrician/*` (eight wrappers copied
from `app/uk-theory/`), `app/red-seal-electrician-practice-test/page.tsx`.
Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/red-seal-electrician-questions.json --pool caelecCommon=24 --pool caelecDist=56 --pool caelecWiring=60 --pool caelecMotors=40 --pool caelecSignal=20` prints PASS.

## lib/banks/caelec.ts (already written by the builder; shown for reference)
```ts
import { Question } from "@/types";
import caelecQuestions from "@/data/red-seal-electrician-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Red Seal Construction Electrician bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ caelec: caelecQuestions as Question[] });
```

## lib/banks/all.ts
Add after the other international banks:
```ts
import "./caelec";
```

## lib/exams.ts
1. Add `| "caelec"` to the `ExamId` union (after `"ausa"`).
2. Icon: uses the existing `"hardhat"` key, so no union change. (Optional nicer icon: a new
   `"zap"` key with lucide `Zap` in `components/TestIcon.tsx` and `components/CDLHeader.tsx`.)
3. Add this block before `const htl`:
```ts
const caelec: ExamConfig = {
  id: "caelec",
  stateCode: "CAELEC",
  idBase: 8000,
  slug: "/red-seal-electrician",
  landingPath: "/red-seal-electrician-practice-test",
  name: "Red Seal Electrician Practice Test",
  shortName: "Red Seal Electrician",
  examLabel: "Red Seal Construction Electrician",
  fullName: "Red Seal Construction Electrician (309A) interprovincial exam",
  questionIdPrefix: "CAELEC-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Red Seal Construction Electrician interprovincial exam (red-seal.ca exam information and
  // exam weightings, checked Oct 2026): 100 four-option multiple-choice questions in 4 hours,
  // 70% to pass, calculator and code reference supplied. Current exams are built on the previous
  // RSOS; its breakdown by major work activity is A common skills 11, B generating, distribution
  // and service 28, C wiring 30, D motors and controls 21, E signalling and communication 10. The
  // new RSOS (exams in development) shifts to 12/26/34/18/10. Scaled to 50: 6/14/15/10/5, which
  // sits between the two. Code content follows the 2024 CEC Part I (used on the exam since
  // June 1, 2025). All items original.
  blueprint: {
    caelecCommon: 6,
    caelecDist: 14,
    caelecWiring: 15,
    caelecMotors: 10,
    caelecSignal: 5,
  },
  trainingSets: testSets(8000, 4),
  categoryLabels: {
    caelecCommon: "Common Occupational Skills",
    caelecDist: "Generating, Distribution & Service Systems",
    caelecWiring: "Wiring Systems",
    caelecMotors: "Motors & Control Systems",
    caelecSignal: "Signalling & Communication Systems",
  },
  copy: {
    guestPrompt: "to save your Red Seal progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all five major work activities. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the Red Seal exam's proportions, 70% to pass",
    heroSubs: [
      "Five work activities, four tests. Wiring and distribution are over half the exam.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Tab your code book and book your exam.",
    ],
    sourceLine: "Based on the Red Seal Occupational Standard exam breakdown for Construction Electrician and the 2024 Canadian Electrical Code. Original questions; provincial amendments vary.",
    analyticsKey: "caelec",
  },
};
```
4. Append `caelec` to the `EXAMS` array (before `htl`, after the other international exams).

## lib/examData.ts
Nothing to add (the bank registers itself through `lib/banks/caelec.ts`).

## types/index.ts
- Add `| "CAELEC"` to `QuestionType` (before `"HTL"`).
- Add to `QuestionCategory` under a comment:
```ts
  // Red Seal Construction Electrician (Canada)
  | "caelecCommon"
  | "caelecDist"
  | "caelecWiring"
  | "caelecMotors"
  | "caelecSignal"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts (and zh.ts, which also exists)
Same English labels in every file, next to the `ukcar*` keys:
```ts
    caelecCommon: "Common Occupational Skills",
    caelecDist: "Generating, Distribution & Service Systems",
    caelecWiring: "Wiring Systems",
    caelecMotors: "Motors & Control Systems",
    caelecSignal: "Signalling & Communication Systems",
```

## app/globals.css
Hue 28 (electrical orange) is unused. Light block after the last exam theme:
```css
  /* Red Seal Construction Electrician theme (Canada) */
  [data-theme="caelec"] {
    --brand: 28 85% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 28 85% 95%;
    --brand-hover: 28 85% 34%;
    --brand-dark: 28 85% 28%;
    --brand-darker: 28 75% 20%;
    --brand-muted: 28 50% 72%;
    --brand-border: 28 50% 78%;
    --brand-border-light: 28 45% 88%;
    --brand-gradient-to: 45 80% 95%;
  }
```
Then run `python3 tools/gen_dark_brand_css.py` for the `.dark [data-theme="caelec"]` block.

## lib/testCatalog.ts
- `EXAM_BLURBS`:
```ts
  caelec: "Free practice for the Red Seal Construction Electrician (309A) exam: services, grounding, transformers, wiring methods, motors, drives and fire alarm, weighted like the real 100-question test.",
```
- `EXAM_ORG`: `caelec: "Red Seal interprovincial exam · provincial apprenticeship authorities",`
- `GROUPS`: new group (suggested, shared with the other Canadian trade/safety exams in this batch):
```ts
  { title: "Canada trade and safety certificates", ids: ["caelec"] },
```
  If fewer than three other members end up in that group, add
  `RELATED_OVERRIDES.caelec = ["osha", "forklift", "caon"]` (or the other Canadian trade exams).
- `SEARCH_ALIASES`:
```ts
  caelec: "red seal electrician 309a construction electrician interprovincial exam ip exam journeyperson certificate of qualification c of q canadian electrical code cec apprentice electrician canada ontario alberta bc electrical exam",
```

## lib/examFacts.ts
```ts
  caelec: {
    answer:
      "The Red Seal Construction Electrician exam is the interprovincial journeyperson exam for electricians in Canada (309A in Ontario). It has 100 four-option multiple-choice questions in four hours, and you need 70% to pass. The questions are drawn from the Red Seal Occupational Standard's five major work activities, with code questions answered from the 2024 Canadian Electrical Code, Part I, supplied at the exam.",
    rows: [
      { label: "Questions", value: "100 multiple choice, four options each" },
      { label: "Time", value: "4 hours" },
      { label: "Pass mark", value: "70%" },
      { label: "Biggest areas", value: "Wiring systems 30, distribution and service 28" },
      { label: "Code edition", value: "2024 CEC Part I (since June 2025)" },
      { label: "Calculator", value: "Supplied at the exam; no personal devices" },
      { label: "Given by", value: "Provincial and territorial apprenticeship authorities" },
    ],
    basedOn: "the Red Seal Construction Electrician exam breakdown and Exam Preparation Guide on red-seal.ca, checked October 2026",
    source: { name: "Red Seal: Construction Electrician exam information", url: "https://red-seal.ca/eng/trades/constelectric/exam-information.shtml" },
  },
```

## components/TeachNudge.tsx
Add `"caelec"` to `TEACHER_LED` in the "Trade schools, pre-licensing courses and instructor-led
certifications" line.

## components/exam/ExamClassFaq.tsx
Under the trade schools comment in `TEACHES`:
```ts
  caelec: "an electrical apprenticeship program",
```

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` (comment: Red Seal Construction Electrician landing).

## lib/sitemaps.ts, next.config.ts, lib/server/classQuestions.ts
Nothing exam-specific: the sitemap reads the catalog, there are no redirects, and class
questions come through `lib/banks/all.ts`.

## scripts
`npx tsx scripts/build-training-parts.ts` after wiring (writes the set split to
`lib/trainingParts.json`). Screenshots:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing caelec:red-seal-electrician:8001`

## CLAUDE.md
Under "Additional Exams":
```md
- **Red Seal Electrician** (Construction Electrician interprovincial exam, 309A in Ontario, `/red-seal-electrician/*`, landing `/red-seal-electrician-practice-test`): `data/red-seal-electrician-questions.json` (200 questions across the five RSOS major work activities: common skills 24, generating/distribution/service 56, wiring 60, motors and controls 40, signalling and communication 20), test IDs 8001-8004, sets 8001-8004, state `CAELEC`, 70% pass. 6/14/15/10/5 per test (Red Seal exam breakdown 11/28/30/21/10 of 100; the new RSOS's 12/26/34/18/10 is close). 2024 CEC Part I; provincial amendments "vary by province"; no rule numbers cited. Teacher-led (apprenticeship in-school blocks). Hub group "Canada trade and safety certificates". Rebuild with `tools/intl/caelec/build.py`.
```
