# Wiring for `nzfirearms` (New Zealand firearms licence theory test, v1, region NZ)

Files already written by the builder: `data/nz-firearms-questions.json` (200, PASS, key-longest 6%),
`lib/banks/nzfirearms.ts`, `app/nz-firearms-licence/*` (layout, redirect, dashboard, drill, stats, copied from
`app/llqp/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/nz-firearms-licence-practice-test/page.tsx`, `tools/next100/nzfirearms/*` (spec, sources, `q_*.py`,
`build.py`, this file). Everything below goes in shared files.

Format note: the real theory test (first part of the Firearms Safety Course, run by Firearms Safety and Education
New Zealand) is 30 multiple-choice questions in 30 minutes, in English, Simplified Chinese or te reo Māori, sat
before a practical handling session. No pass mark is published; candidates report 27 of 30, so 90% is
Tigertest's target (ceil(0.9 x 30) = 27). Here: six real-length tests of 30 (180 items) plus 20 training-only
spares (the last items of each pool), five topic sets, so 5 sets + 6 tests = 11 dashboard steps. Content sets,
so sets first, then tests. Largest set 60.

The Arms Act 2026 replaced the Arms Act 1983 on 23 September 2026 and the regulator says its Firearms Safety Code
is being updated: the bank uses the 2026 terms (restricted firearms, business licences, high-energy airguns) and
leaves out 1983 figures that may have changed (60-minute vehicle rule, 30-day address notice, licence terms).

## lib/exams.ts

Add `"nzfirearms"` to the `ExamId` union. Icon `target` already exists (Hunter Safety's; CFSC uses it too).

```ts
const nzfirearms: ExamConfig = {
  id: "nzfirearms",
  stateCode: "NZFIREARMS",
  idBase: 18300,
  slug: "/nz-firearms-licence",
  landingPath: "/nz-firearms-licence-practice-test",
  name: "NZ Firearms Licence Practice Test",
  shortName: "NZ firearms licence test",
  examLabel: "firearms theory test",
  fullName: "New Zealand firearms licence theory test (Firearms Safety Course)",
  questionIdPrefix: "NZFA-",
  icon: "target",
  testCount: 6,
  questionsPerTest: 30,
  passPct: 90,
  // Firearms Safety Course theory test (Firearms Safety and Education New Zealand, course options page, checked
  // November 2026): 30 multiple-choice questions in 30 minutes on the Firearms Safety Code, safe practice and the
  // law; no published pass mark (candidates report 27 of 30, so 90% is Tigertest's target). No topic weights are
  // published: the blueprint follows the code's sections. Six real-length tests of 30; pools are 6x the
  // per-test count plus 20 training-only spares. Arms Act 2026 terms throughout.
  blueprint: {
    nzfaRules: 5,
    nzfaTarget: 4,
    nzfaZone: 4,
    nzfaStates: 4,
    nzfaHandling: 4,
    nzfaStorage: 3,
    nzfaLaw: 3,
    nzfaAmmo: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 18301, name: "The First Three Rules & Firearm States", categories: ["nzfaRules", "nzfaStates"], size: 60, weightLabel: "9 of 30 test questions" },
    { setNumber: 2, id: 18302, name: "Identify Your Target & Firing Zone", categories: ["nzfaTarget", "nzfaZone"], size: 54, weightLabel: "8 of 30 test questions" },
    { setNumber: 3, id: 18303, name: "Safe Handling in the Field", categories: ["nzfaHandling"], size: 27, weightLabel: "4 of 30 test questions" },
    { setNumber: 4, id: 18304, name: "Storage, Transport, Alcohol & the Law", categories: ["nzfaStorage", "nzfaLaw"], size: 40, weightLabel: "6 of 30 test questions" },
    { setNumber: 5, id: 18305, name: "Firearms, Ammunition & Malfunctions", categories: ["nzfaAmmo"], size: 19, weightLabel: "3 of 30 test questions" },
  ],
  categoryLabels: {
    nzfaRules: "Rules 1 to 3: Loaded, Muzzle & Chamber",
    nzfaTarget: "Rule 4: Identify Your Target",
    nzfaZone: "Rule 5: Check Your Firing Zone",
    nzfaStates: "States of Readiness",
    nzfaHandling: "Safe Handling in the Field",
    nzfaStorage: "Rules 6 & 7: Storage, Transport & Alcohol",
    nzfaLaw: "Licence Holder Obligations & the Law",
    nzfaAmmo: "Firearms, Ammunition & Malfunctions",
  },
  copy: {
    guestPrompt: "to save your firearms licence test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on the Firearms Safety Code: the first three rules and the states of readiness, target identification and firing zones, safe handling, storage and the law, and ammunition. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 30 questions like the real theory test, aim for 27",
    heroSubs: [
      "Thirty questions on the Firearms Safety Code. Start with the seven rules.",
      "Master each set, then try a test.",
      "Halfway there. Take a practice test.",
      "Fix the misses, then retake.",
      "All done. You're ready for your safety course.",
    ],
    sourceLine: "Based on the Firearms Safety Code, the regulator's storage guidance and the Arms Act 2026, as of November 2026. Original questions; 30 per test, like the real theory test. Not affiliated with Firearms Safety and Education New Zealand or New Zealand Police.",
    analyticsKey: "nzfirearms",
  },
};
```

Append `nzfirearms` to the `EXAMS` array after `nzroad` (or after the last international batch 1 exam).

Check: 18301-18306 (tests) and 18301-18305 (sets) must be free (the batch table assigns 18300).

## lib/banks/all.ts

```ts
import "./nzfirearms";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/nzfirearms.ts`.

## types/index.ts

- `QuestionType`: add `| "NZFIREARMS"`.
- `QuestionCategory`, under a `// NZ firearms licence theory test` comment:

```ts
  | "nzfaRules"
  | "nzfaTarget"
  | "nzfaZone"
  | "nzfaStates"
  | "nzfaHandling"
  | "nzfaStorage"
  | "nzfaLaw"
  | "nzfaAmmo"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nzfaRules: "Rules 1 to 3: Loaded, Muzzle & Chamber",
    nzfaTarget: "Rule 4: Identify Your Target",
    nzfaZone: "Rule 5: Check Your Firing Zone",
    nzfaStates: "States of Readiness",
    nzfaHandling: "Safe Handling in the Field",
    nzfaStorage: "Rules 6 & 7: Storage, Transport & Alcohol",
    nzfaLaw: "Licence Holder Obligations & the Law",
    nzfaAmmo: "Firearms, Ammunition & Malfunctions",
```

## app/globals.css

Hue from the international batch 1 table (30 55% 22%, already checked). Then run `tools/gen_dark_brand_css.py`.

```css
  /* NZ firearms licence theory test theme */
  [data-theme="nzfirearms"] {
    --brand: 30 55% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 30 55% 96%;
    --brand-hover: 30 55% 17%;
    --brand-dark: 30 55% 15%;
    --brand-darker: 30 50% 10%;
    --brand-muted: 30 20% 70%;
    --brand-border: 30 20% 80%;
    --brand-border-light: 30 18% 89%;
    --brand-gradient-to: 25 70% 96%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nzfirearms: "Practice for New Zealand's firearms licence theory test on the Firearms Safety Code: the seven rules, LOAD, ACTION, INSTANT and UNLOAD, target identification and firing zones, safe handling, storage and transport, and the Arms Act 2026, in six 30-question tests.",`
- `EXAM_ORG`: `nzfirearms: "Firearms Safety and Education New Zealand · Firearms Safety Course theory test",`
- Hub group: no New Zealand non-driving group exists. New group, right after "New Zealand driving tests":
  `{ title: "New Zealand licences", ids: ["nzfirearms"] },`
  (`nzlcq`, built in the same batch, belongs in it too: `ids: ["nzfirearms", "nzlcq"]`.)
- `SEARCH_ALIASES`:
  `nzfirearms: "nz firearms licence test firearms licence nz gun licence nz firearms safety course firearms safety code arms code theory test firearms theory test nz seven rules of firearm safety te tari pureke firearms safety and education new zealand fse police firearms licence hunting licence nz",`
- `RELATED_OVERRIDES`: `nzfirearms: ["capal", "hunter", "nzroad"],` (pads the new group until `nzlcq` lands).

## lib/region.ts

`nzfirearms: "NZ",` in `TEST_REGIONS`, and add `"nzfirearms"` to `NON_DRIVING_TESTS`.

`REGION_HOME.NZ` now names only the learner licence. Suggested update (merge with `nzlcq`'s wording if it
lands in the same batch):

```ts
  NZ: {
    title: "Free NZ Practice Tests: Learner Licence & Firearms Licence | Tigertest",
    description: "Free practice for New Zealand: the learner licence theory test on the Road Code and the firearms licence theory test on the Firearms Safety Code, original questions with every answer explained. No account needed.",
    lead: "Practice for the learner licence theory test and the firearms licence theory test. Original questions on the Road Code and the Firearms Safety Code, every answer explained. No signup.",
    cta: { label: "Learner licence test", href: "/nz-learner-licence-practice-test" },
    testsTitle: "Learner licence theory test",
    testsSub: "200 questions on the Road Code, in km/h for left-hand traffic. The real test is 35 questions and you need 32 right.",
  },
```

`faqsFor(NZ)` counts tests automatically; no change needed. No middleware or sitemap change (region NZ exists).

## lib/examFacts.ts

```ts
  nzfirearms: {
    answer:
      "Anyone applying for a New Zealand firearms licence for the first time, or whose licence expired more than a year ago, must pass the free Firearms Safety Course before the vetting interview. Its theory test is 30 multiple-choice questions in 30 minutes on the Firearms Safety Code, safe firearms practice and the law, offered in English, Simplified Chinese and te reo Māori, followed by a practical session handling a deactivated firearm. The regulator publishes no pass mark; candidates report needing about 27 of 30. A failed first attempt can be resat after the practical session.",
    rows: [
      { label: "Questions", value: "30 multiple choice" },
      { label: "Time", value: "30 minutes" },
      { label: "Pass mark", value: "Not published; candidates report 27 of 30 (Tigertest's target)" },
      { label: "Languages", value: "English, Simplified Chinese, te reo Māori" },
      { label: "Study from", value: "Firearms Safety Code (being updated for the Arms Act 2026)" },
      { label: "Also on the course", value: "Practical safe handling session" },
      { label: "Run by", value: "Firearms Safety and Education New Zealand" },
    ],
    basedOn: "Firearms Safety and Education New Zealand's firearms safety course pages, checked November 2026",
    source: { name: "Firearms Safety and Education NZ: Firearms safety course options", url: "https://www.firearmssafety.govt.nz/individual-licence/courses-and-education/firearms-safety-course-options" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## lib/tigerAssets.ts

Borrow the hunter safety set: `nzfirearms: "hunter",` in `BORROWED_SETS` (as `capal` does).

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

Nothing: people self-study the code before the regulator's course.

## lib/privacyRegion.ts

Nothing: adult exam (applicants are 16 or older).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, no redirects, `target` icon exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 60, exactly).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nzfirearms:nz-firearms-licence:18301`

## CLAUDE.md (under Additional Exams, after the NZ Learner Licence bullet)

```md
- **NZ Firearms Licence** (`nzfirearms`, the theory test of New Zealand's Firearms Safety Course for a first firearms licence, `/nz-firearms-licence/*`, landing `/nz-firearms-licence-practice-test`): `data/nz-firearms-questions.json` (200 original questions from the Firearms Safety Code (v4.0, January 2025), the regulator's October 2026 storage guidance and the Arms Act 2026: rules 1 to 3 (loaded, muzzle, chamber, Safety Precautions, safety catch) 33, rule 4 target identification 27, rule 5 firing zone 27, states of readiness (LOAD, ACTION, INSTANT, UNLOAD) 27, safe handling in the field (fences, carries, formations, maimai, vehicles) 27, rules 6 and 7 storage, transport and alcohol 20, licence holder obligations and the law 20, firearms, ammunition and malfunctions 19), six real-length tests: test IDs 18301-18306 (30 questions each), sets 18301-18305 (by topic), state `NZFIREARMS`, prefix `NZFA-`, 90% pass (27 of 30, Tigertest's target: Firearms Safety and Education New Zealand publishes no pass mark; candidates report 27). 5/4/4/4/4/3/3/3 per test; the last items of each pool (20 in all) are training-only. The real test is 30 questions in 30 minutes in English, Simplified Chinese or te reo Māori, then a practical session (not modelled). Arms Act 2026 terms (restricted firearms, business licences, high-energy airguns); 1983 Act figures that may have changed (60-minute vehicle rule, 30-day address notice, licence terms) and fees left out. Educational safety content only. Built by `tools/next100/nzfirearms/build.py`; sources in `tools/next100/nzfirearms/sources.md`. Region NZ, hub group "New Zealand licences", `[data-theme="nzfirearms"]` dark walnut brown (30 55% 22%), borrows the hunter tiger.
```
