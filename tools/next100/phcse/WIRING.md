# Philippine Civil Service Exam (`phcse`) wiring for the integrator

v2 exam, built on the `rrbntpc` template (one section, one module). Files written (unique to this exam):
`tools/next100/phcse/*` (9 domain sources as Python data, `build.py`, `sources.md`, this file),
`data/v2/phcse/questions.json` (plain array, 245 items, prefix `PHCSE-`), `lib/v2/exams/phcse.ts` (export `PHCSE`),
`lib/v2/banks/phcse.ts` (`plainBank`), `app/civil-service-exam/*` (layout, root redirect, dashboard, practice/[n],
test/[id], test/[id]/results, stats; copied from `app/rrb-ntpc/`), `app/civil-service-exam-reviewer-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/phcse/build.py`, then validate from a copy that does not write bankSizes:
`sed 's#^open(sizes_path, "w").write(src)#pass#' tools/validate_v2_bank.py > /tmp/v.py && python3 -I /tmp/v.py phcse '{"1": {"cse": {"1": 100}}, "2": {"cse": {"1": 100}}}'`
(245 questions, 0 stimuli, 0 problems; key strictly longest 39/245 = 16%). Do not add `phcse` to
`tools/build_v2_bank.py` PLANS.

Shape: one bank for both levels. Practice Test 1 is a Professional mock (Verbal 30, Analytical 25, Numerical 25,
General Information 20), Practice Test 2 a Subprofessional mock (Verbal 30, Clerical 25, Numerical 25, General
Information 20), held out of the drills. 100 items in 2 hours each (real: 170 in 3 h 10 min and 165 in 2 h 40 min).
9 drills + 2 tests = 11 dashboard steps. Drill pools: analytical 28 (Test 1 + 3 drill-only), clerical 21 (all
drill-only, since Test 2 is held out), the others 13 to 16. No Basics, no premium.

Decisions to check:
- Hue. The brief's 222 60% 32% clashes with the UK navy family (222 62% 38%) and 215 65% 32%; the 214 to 230 band is
  full. 221 50% 30% is the only nearby value that passes the 8-degree rule against every theme on disk
  (psat 230 50% 28% is 9 degrees away). Change both here and in `lib/v2/exams/phcse.ts` `theme` if you pick another.
- The CSC site (csc.gov.ph) was 403 from this session; every CSC figure is from news and review sites quoting the
  2026 announcements (see `sources.md`). The 20 questionnaire items, the calculator ban and "no penalty for wrong
  answers" are guides only; the copy labels or omits them.
- Region PH already exists (homepage `/ph`, driving test `phlto`). Consider adding the CSE to the PH homepage copy
  ("Also used in" / country tests) when the integrator next touches `REGION_HOME`; not done here.

Screenshots still needed: `public/landing/phcse-mobile.png`, `phcse-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  phcse: 245,
```

## lib/v2/registry.ts
```ts
import { PHCSE } from "./exams/phcse";
// EXAMS_V2: add PHCSE (after the batch-2 India exams, or anywhere; order is not shown to users)
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/phcse";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `PHCSE.domainLabels` (keys `phcseGrammar`, `phcseVocab`, `phcseReading`,
`phcseAnalytical`, `phcseClerical`, `phcseNumbers`, `phcseWordProblems`, `phcseConstitution`, `phcsePublicService`).

## app/globals.css
Run `tools/gen_dark_brand_css.py` afterwards. Matches `lib/v2/exams/phcse.ts` `theme`.
```css
  /* Philippine Civil Service Exam theme: deep government blue (v2 exam; matches lib/v2/exams/phcse.ts theme) */
  [data-theme="phcse"] {
    --brand: 221 50% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 221 50% 96%;
    --brand-hover: 221 50% 25%;
    --brand-dark: 221 50% 23%;
    --brand-darker: 221 45% 13%;
    --brand-muted: 221 30% 72%;
    --brand-border: 221 35% 80%;
    --brand-border-light: 221 35% 90%;
    --brand-gradient-to: 235 50% 96%;
  }
```

## lib/shareCards.ts
```ts
  "phcse": {
    "color": "hsl(221, 50%, 30%)",
    "tint": "hsl(221, 50%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  phcse: { title: "Civil Service Exam Reviewer", description: "Professional and Subprofessional mock exams on verbal, analytical, clerical and numerical ability and general information, with every answer explained." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the PH entry (next to phlto)
  phcse: "PH",
// NON_DRIVING_TESTS: add
  "phcse",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  phcse: "Reviewer for the Philippine Civil Service Exam (CSE-PPT): a Professional and a Subprofessional mock exam on verbal, analytical, clerical and numerical ability, the 1987 Constitution, R.A. 6713, human rights and the environment.",
// EXAM_ORG
  phcse: "Civil Service Commission · Career Service Exam, Professional and Subprofessional",
// SEARCH_ALIASES
  phcse: "civil service exam reviewer civil service exam philippines cse ppt reviewer career service exam professional subprofessional csc exam reviewer civil service eligibility ra 6713 reviewer philippine constitution reviewer clerical ability analytical ability numerical ability verbal ability government exam philippines",
// RELATED_OVERRIDES
  phcse: ["phlto", "ibpsclerk", "sscchsl"],
```
Hub groups: add a new group right after "Philippines driving tests":
```ts
  { title: "Philippines government exams", ids: ["phcse"] },
```
(`phlet`, batch 3, could join it later, or a separate licensure group.)

## lib/examFacts.ts
```ts
  phcse: {
    answer:
      "The Civil Service Exam (Career Service Examination, Pen and Paper Test or CSE-PPT) is the Civil Service Commission's test for eligibility for permanent government positions in the Philippines. It has two levels. Both test verbal ability (in English and Filipino), numerical ability and general information on the Philippine Constitution, R.A. 6713, peace and human rights, and the environment; the Professional level adds analytical ability and the Subprofessional level adds clerical ability. For the 2026 sittings the Professional level had 170 items in 3 hours and 10 minutes and the Subprofessional level 165 items in 2 hours and 40 minutes. You need a general rating of at least 80.00 to pass. Professional eligibility covers first and second level positions; Subprofessional covers first level positions only.",
    rows: [
      { label: "Professional", value: "170 items, 3 hours 10 minutes (2026)" },
      { label: "Subprofessional", value: "165 items, 2 hours 40 minutes (2026)" },
      { label: "Both levels", value: "Verbal, numerical, general information" },
      { label: "Level-specific", value: "Analytical (Professional), clerical (Subprofessional)" },
      { label: "Passing", value: "General rating of 80.00" },
      { label: "2026 dates", value: "8 March and 9 August 2026" },
      { label: "Run by", value: "Civil Service Commission (CSC)" },
    ],
    basedOn: "the CSC examination announcements for the March and August 2026 CSE-PPT (No. 08, s. 2025 and No. 03, s. 2026) as reported, checked November 2026",
    source: { name: "Civil Service Commission", url: "https://csc.gov.ph" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  phcse: "a civil service exam review class",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"phcse"` (review centers and LGU and school review classes run CSE batches).

## lib/tigerAssets.ts
Nothing (no tiger set; DMV tiger fallback). Optionally borrow one through `BORROWED_SETS` (e.g. the `ssccgl` set).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
After the JAMB Use of English bullet (or with the batch-2 exams):
```md
- **Civil Service Exam** (`/civil-service-exam`, landing `/civil-service-exam-reviewer-practice-test`, `[data-theme="phcse"]` deep government blue, region PH, hub group "Philippines government exams"): the Civil Service Commission's Career Service Examination, Pen and Paper Test (CSE-PPT), as announced for the 8 March and 9 August 2026 sittings (Professional 170 items in 3 h 10 min, Subprofessional 165 in 2 h 40 min, reported from the CSC announcements; guides say 20 of each are a personal-data questionnaire; passing is a general rating of 80.00). Both levels: verbal ability (English and Filipino), numerical ability and general information (1987 Constitution, R.A. 6713, peace and human rights, environment); Professional adds analytical ability, Subprofessional clerical ability (filing, spelling). One bank serves both: Practice Test 1 is a Professional mock and Practice Test 2 (held out) a Subprofessional mock, each one 100-item module in 2 hours (30 verbal, 25 analytical or clerical, 25 numerical, 20 general information, the split Tigertest's own), 9 drills (`phcseGrammar`, `phcseVocab`, `phcseReading`, `phcseAnalytical`, `phcseClerical`, `phcseNumbers`, `phcseWordProblems`, `phcseConstitution`, `phcsePublicService`), so the dashboard is 11 steps; the clerical drill is all drill-only items. English only (Filipino verbal items not modelled), abstract reasoning as letter patterns, US spelling, pesos. All-number options are sorted and locked, as are the I/II conclusion sets. Bank `data/v2/phcse/questions.json` (245 original items, prefix `PHCSE-`) built by `python3 -I tools/next100/phcse/build.py`. Percent score; `scoreNote` says the CSC's raw-to-rating conversion is unpublished. Sources in `tools/next100/phcse/sources.md`.
```
