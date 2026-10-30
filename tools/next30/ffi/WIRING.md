# Wiring for `ffi` (Firefighter I written certification, US, v1)

Files already written by the builder: `data/firefighter-questions.json` (200, PASS),
`lib/banks/ffi.ts`, `app/firefighter/*` (8 wrappers, copied from `app/life-in-the-uk/`),
`app/firefighter-practice-test/page.tsx`, `tools/next30/ffi/*` (spec, sources, `q_*.py`, `build.py`).
Rebuild the bank with `python3 -I tools/next30/ffi/build.py`. Everything below goes in shared files.

Format: standard v1 shape, 4 tests x 50, DMV-style training (`testSets(11200, 4)`: set N holds
exactly test N's 50 questions), so the dashboard is 8 steps. Test IDs 11201-11204, set IDs
11201-11204. Pass line 70% (35 of 50).

Validator: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/firefighter-questions.json --pool ffiSafety=28 --pool ffiBehavior=28 --pool ffiPpe=28 --pool ffiTools=24 --pool ffiLadders=20 --pool ffiRescue=24 --pool ffiWater=32 --pool ffiAttack=16`
-> `letters A/B/C/D 50 each, avg option 17 chars, key-longest 18%, key>1.2x 20%, PASS`.

## lib/exams.ts

Add `"ffi"` to the `ExamId` union. Icon `siren` already exists (EMT and paramedic use it); a
dedicated `flame` icon would need `components/CDLHeader.tsx` and `components/TestIcon.tsx`, optional.

```ts
const ffi: ExamConfig = {
  id: "ffi",
  stateCode: "FFI",
  idBase: 11200,
  slug: "/firefighter",
  landingPath: "/firefighter-practice-test",
  name: "Firefighter I Practice Test",
  shortName: "Firefighter I",
  examLabel: "Firefighter I exam",
  fullName: "Firefighter I written certification exam (NFPA 1010)",
  questionIdPrefix: "FFI-",
  icon: "siren",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Firefighter I job performance requirements, NFPA 1010 (2024 edition, Chapter 6; it
  // consolidated NFPA 1001-2019, whose Firefighter I content is the same), checked October 2026.
  // State fire training agencies and IFSAC/Pro Board-accredited bodies set their own written
  // exams (commonly about 100 items, 70% to pass) and publish no national per-topic weights, so
  // counts are ours, weighted to the JPR groupings. Hazmat awareness items follow NFPA 470 and
  // the DOT ERG. All items original; no textbook or provider named.
  blueprint: {
    ffiSafety: 7,
    ffiBehavior: 7,
    ffiPpe: 7,
    ffiTools: 6,
    ffiLadders: 5,
    ffiRescue: 6,
    ffiWater: 8,
    ffiAttack: 4,
  },
  trainingSets: testSets(11200, 4),
  categoryLabels: {
    ffiSafety: "Safety, Communications & Command",
    ffiBehavior: "Fire Behavior & Building Construction",
    ffiPpe: "PPE & SCBA",
    ffiTools: "Extinguishers, Ropes & Forcible Entry",
    ffiLadders: "Ground Ladders",
    ffiRescue: "Search, Rescue & Ventilation",
    ffiWater: "Water Supply, Hose & Fire Streams",
    ffiAttack: "Fire Control, Overhaul & Utilities",
  },
  copy: {
    guestPrompt: "to save your Firefighter I progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all eight topic areas. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 70% to pass",
    heroSubs: [
      "Eight topic areas, four mock tests. Water supply and hose weigh most.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your Firefighter I written exam.",
    ],
    sourceLine: "Based on the NFPA 1010 Firefighter I job performance requirements. Original questions; question count and pass mark vary by certifying agency.",
    analyticsKey: "ffi",
  },
};
```

Append `ffi` to the `EXAMS` array (near `cpr` / the emergency services exams).

Check: 11201-11204 must be free (SPEC row 6 assigns idBase 11200 to `ffi`).

## lib/banks/all.ts

```ts
import "./ffi";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/ffi.ts`.

## types/index.ts

- `QuestionType`: add `| "FFI"`.
- `QuestionCategory`, under a `// Firefighter I` comment:

```ts
  | "ffiSafety"
  | "ffiBehavior"
  | "ffiPpe"
  | "ffiTools"
  | "ffiLadders"
  | "ffiRescue"
  | "ffiWater"
  | "ffiAttack"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    ffiSafety: "Safety, Communications & Command",
    ffiBehavior: "Fire Behavior & Building Construction",
    ffiPpe: "PPE & SCBA",
    ffiTools: "Extinguishers, Ropes & Forcible Entry",
    ffiLadders: "Ground Ladders",
    ffiRescue: "Search, Rescue & Ventilation",
    ffiWater: "Water Supply, Hose & Fire Streams",
    ffiAttack: "Fire Control, Overhaul & Utilities",
```

## app/globals.css

Suggested hue 22, a fire-engine orange red (CPR is 355 and paramedic 10, so re-pick if it reads
too close). Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Firefighter I theme */
  [data-theme="ffi"] {
    --brand: 22 85% 44%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 22 90% 95%;
    --brand-hover: 22 85% 38%;
    --brand-dark: 22 85% 32%;
    --brand-darker: 22 80% 20%;
    --brand-muted: 22 50% 72%;
    --brand-border: 22 55% 80%;
    --brand-border-light: 22 50% 89%;
    --brand-gradient-to: 45 90% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `ffi: "Firefighter I written exam prep on the NFPA 1010 job performance requirements: safety and incident command, fire behavior, building construction, SCBA, ladders, ropes, forcible entry, search, ventilation, hose, water supply and fire attack.",`
- `EXAM_ORG`: `ffi: "NFPA 1010 · state fire certification",`
- Hub group: add `"ffi"` to `{ title: "Emergency services", ids: ["emt", "paramedic", "cpr"] }`
  (and `"police"` from this batch if merged).
- `SEARCH_ALIASES`:
  `ffi: "firefighter 1 firefighter i ff1 ffi fire fighter exam firefighter certification test fire academy nfpa 1001 nfpa 1010 ifsac pro board ifsta essentials scba ladders hose fire department",`

## lib/region.ts

Nothing: US is the default, and `NON_DRIVING_TESTS` lists only non-US exams.

## lib/examFacts.ts

```ts
  ffi: {
    answer:
      "Firefighter I is the entry-level firefighter certification, defined by the job performance requirements in NFPA 1010 (2024), which replaced NFPA 1001. Candidates usually finish a fire academy course, then pass a written exam and a practical skills exam given by their state fire training agency or another accredited certifying body. The written test is multiple choice; many agencies use about 100 questions and a 70 percent pass mark, but each sets its own count, time limit and passing score.",
    rows: [
      { label: "Standard", value: "NFPA 1010 (2024), Firefighter I" },
      { label: "Format", value: "Written multiple choice plus a skills exam" },
      { label: "Questions", value: "Set by the agency, often about 100" },
      { label: "Pass mark", value: "Set by the agency, often 70%" },
      { label: "Given by", value: "State fire training agency or accredited body" },
      { label: "Usually taken", value: "At the end of a fire academy course" },
      { label: "Often paired with", value: "Hazmat awareness and operations" },
    ],
    basedOn: "NFPA 1010 (2024 edition) and state fire certification guidance, checked October 2026",
    source: { name: "NFPA 1010: Standard on Professional Qualifications for Firefighters", url: "https://www.nfpa.org/codes-and-standards/nfpa-1010-standard-development/1010" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## components/TeachNudge.tsx

Add `"ffi"` to `TEACHER_LED` (taught in fire academies).

## components/exam/ExamClassFaq.tsx

In `TEACHES`: `ffi: "a fire academy",`. The landing already renders `<ExamClassFaq examId="ffi" />`
and `classFaqJsonLd("ffi")`.

## lib/tigerAssets.ts

Nothing; falls back to the DMV tiger.

## Landing breadcrumbs

No `ExamLandingBreadcrumbs` component exists in this tree (same as the uklitu template). If the
integrator adds it, place it right after the JSON-LD script in `app/firefighter-practice-test/page.tsx`.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 50, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing ffi:firefighter:11201`

## CLAUDE.md (under Additional Exams)

```md
- **Firefighter I** (written certification exam, `/firefighter/*`, landing `/firefighter-practice-test`): `data/firefighter-questions.json` (200 questions on the NFPA 1010 (2024) Firefighter I JPRs: safety/communications/ICS/hazmat awareness 28, fire behavior and building construction 28, PPE and SCBA 28, extinguishers/ropes/forcible entry 24, ladders 20, search/rescue/ventilation 24, water supply/hose/streams 32, fire control/overhaul/utilities 16), test IDs 11201-11204, sets 11201-11204 (one per test), state `FFI`, 70% pass. 7/7/7/6/5/6/8/4 per test. Count and pass mark vary by certifying agency; no textbook or provider named. Built by `tools/next30/ffi/build.py`; sources in `tools/next30/ffi/sources.md`. Hub group "Emergency services".
```
