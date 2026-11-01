# Bihar Police Constable (`biharpolice`) wiring for the integrator

v2 exam, template `uppolice`. Files written (unique to this exam): `tools/next100/biharpolice/*` (8 domain sources as
Python data, `build.py`, `sources.md`, this file), `data/v2/biharpolice/questions.json` (plain array, 232 items, prefix
`BIHARPOLICE-`), `lib/v2/exams/biharpolice.ts` (export `BIHARPOLICE`), `lib/v2/banks/biharpolice.ts` (`plainBank`),
`app/bihar-police-constable/*` (layout, root redirect, dashboard, practice/[n], stats, test/[id], test/[id]/results;
copied from `app/up-police-constable/`), `app/bihar-police-constable-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/biharpolice/build.py`, then
`python3 -I tools/validate_v2_bank.py biharpolice '{"1": {"paper": {"1": 100}}, "2": {"paper": {"1": 100}}}'`
(232 questions, 0 stimuli, 0 problems; key strictly longest 40/232 = 17%). I ran a copy of the validator that skips
its `lib/v2/bankSizes.ts` write, so add the line below by hand.

Shape: one section `paper`, one module of 100 items in 120 minutes (the real paper's own length and time, so no
cut), items grouped in the advertisement's subject order (Hindi, English, Mathematics, Social Science, Science, GK);
two tests, Test 2 held out; 8 drills (one per domain), so the dashboard is 10 steps. No Basics, no premium. Per test
15/15/15/13/12/15/8/7, 4 drill-only each.

build.py differs from the template in two ways: all-number options (same unit) are sorted ascending and locked,
error-spotting parts are locked in sentence order with "No error" last, and "No improvement" is locked last (46
locked items); and free items have their key slot chosen to balance A to D against the locked ones (57/60/58/57),
picked by a stem hash among the least-used slots so there is no visible pattern.

Decisions to check:
- **Pattern is from the board's own advertisement** (CSBC Advt. 01/2025, read from the PDF on 2026-11-01): 100
  questions, 2 hours, 1 mark each, Class 10 level, six subjects, under 30% fails, written exam qualifying only (5x for
  PET; final merit on PET marks). **No subject split is published**: the 15/15/15/25/15/15 split is Tigertest's and the
  copy says so. Negative marking: the advertisement mentions none; most guides say none, one news report says 1/4; the
  copy says "mentions no deduction, check your notice".
- **Hindi is written in Hindi** (34 items), with English explanations, like `uppolice`; no native-speaker review yet.
- **Overlap**: checked every item against all v2 India banks present on 2026-11-01 (ssccgl, rrbntpc, ibpspo, ctet,
  rrbgroupd, sscgd, sscchsl, sscmts, uppolice, ibpsclerk, jnvst and batch 2's sbiclerk, sbipo, ibpsrrb, rajpolice,
  delhipolice, mppolice as they then stood) for the same fact and answer or the same numbers; about 90 items were
  rewritten. What remains flagged by a loose stem/key match is the same topic with different numbers or a different
  fact (e.g. CI on different sums). Batch 2 banks were still changing, so re-run a comparison after the batch lands.
- **Hue** 18 65% 30% (brick red; the suggested 18 60% 40% clashed with auforklift 21 55% 42%, paramedic 10 65% 42% and
  sscmts 26 70% 38%). Neighbours within 8 degrees: caweld 16 85% 32% (20 sat), fsmaths 15 45% 34% (20 sat), auforklift
  21 55% 42% (12 light), cacarp 24 50% 30% (15 sat), ctet 22 80% 28% (15 sat), ffi 22 40% 43% (25 sat), aws 20 90%
  (25 sat), paramedic 10 65% 42% (12 light), sscmts 26 70% 38% (8 light), nasm 12 90% (25 sat). Each passes the rule.
- Screenshots still needed: `public/landing/biharpolice-mobile.png`, `biharpolice-desktop.png` (+ dark).

## lib/v2/bankSizes.ts
```ts
  biharpolice: 232,
```

## lib/v2/registry.ts
```ts
import { BIHARPOLICE } from "./exams/biharpolice";
// EXAMS_V2: add BIHARPOLICE with the other India government job exams (after UPPOLICE)
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ UPPOLICE, BIHARPOLICE, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/biharpolice";       // classQuestions.ts
import '@/lib/v2/banks/biharpolice';       // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `BIHARPOLICE.domainLabels` (keys `bihpHindi`, `bihpEnglish`, `bihpMaths`,
`bihpHistory`, `bihpGeography`, `bihpScience`, `bihpBihar`, `bihpGK`).

## app/globals.css
Light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint (it lifts the 30% brand to 50%).
```css
  /* Bihar Police Constable theme: brick red (v2 exam; matches lib/v2/exams/biharpolice.ts theme) */
  [data-theme="biharpolice"] {
    --brand: 18 65% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 18 65% 96%;
    --brand-hover: 18 65% 26%;
    --brand-dark: 18 65% 24%;
    --brand-darker: 18 60% 16%;
    --brand-muted: 18 30% 72%;
    --brand-border: 18 35% 80%;
    --brand-border-light: 18 35% 90%;
    --brand-gradient-to: 30 60% 96%;
  }
```

## lib/shareCards.ts
```ts
  "biharpolice": {
    "color": "hsl(18, 65%, 30%)",
    "tint": "hsl(18, 65%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  biharpolice: { title: "Bihar Police Constable Mock Test", description: "Practice Hindi, English, Maths, Social Science, Science and GK in full 100-question CSBC-pattern mock tests, with every answer explained." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  biharpolice: "IN",
// NON_DRIVING_TESTS: add
  "biharpolice",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  biharpolice: "Mock tests for the Bihar Police Constable (CSBC) written exam at Class 10 level: Hindi in Hindi, English, Mathematics, Social Science, Science and GK with Bihar GK, in full 100-question papers at the real 2-hour length.",
// EXAM_ORG
  biharpolice: "CSBC Bihar · Constable written exam",
// SEARCH_ALIASES
  biharpolice: "bihar police constable mock test bihar police mock test csbc constable csbc bihar sipahi bharti bihar sipahi exam bihar police gk hindi practice set bsap constable bihar special armed police matric level police exam free sarkari exam government job exam india",
// RELATED_OVERRIDES (if the group would otherwise be thin)
  biharpolice: ["uppolice", "sscgd", "rrbgroupd"],
```
Hub group "India government job exams": add `"biharpolice"` next to `"uppolice"`:
```ts
  { title: "India government job exams", ids: ["ssccgl", "rrbntpc", "ibpspo", "ctet", /* batch ids */ "uppolice", "biharpolice"] },
```

## lib/examFacts.ts
```ts
  biharpolice: {
    answer:
      "The Bihar Police Constable written exam is set by the Central Selection Board of Constable (CSBC), Bihar, for Constable posts in Bihar Police and the Bihar Special Armed Police. Under Advertisement No. 01/2025 (19,838 posts) it is one objective OMR paper of 100 questions in 2 hours, one mark each, at Class 10 (Matric) level on Hindi, English, Mathematics, Social Science, Science and General Knowledge with current affairs. The advertisement mentions no deduction for wrong answers. Candidates under 30% are out; the written exam only shortlists about five times the vacancies for the physical efficiency test, whose marks make the final merit list.",
    rows: [
      { label: "Questions", value: "100 objective (1 mark each, 100 marks), OMR sheet" },
      { label: "Time", value: "2 hours" },
      { label: "Subjects", value: "Hindi, English, Maths, Social Science, Science, GK and current affairs (Class 10 level)" },
      { label: "Negative marking", value: "None mentioned in Advt. 01/2025; check your notice" },
      { label: "Minimum", value: "30% to stay in; written exam is qualifying only" },
      { label: "Latest exam", value: "16 July to 3 August 2025 (Advt. 01/2025, 19,838 posts)" },
      { label: "Next stage", value: "Physical efficiency test (final merit on its marks)" },
      { label: "Given by", value: "Central Selection Board of Constable (CSBC), Bihar" },
    ],
    basedOn: "CSBC Advertisement No. 01/2025 and its exam notice of 12 June 2025, checked November 2026",
    source: { name: "Central Selection Board of Constable, Bihar", url: "https://csbc.bihar.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  biharpolice: "a Bihar Police coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"biharpolice"` (coaching institutes run constable batches).

## lib/tigerAssets.ts
Optional: borrow the police tiger like `uppolice` (`BORROWED_SETS`: `biharpolice: "police"`), otherwise it falls back
to the DMV tiger.

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section with the other India exams, after UP Police Constable:
```md
- **Bihar Police Constable** (`/bihar-police-constable`, landing `/bihar-police-constable-practice-test`, `[data-theme="biharpolice"]` brick red, region IN, hub group "India government job exams"): the CSBC Bihar constable written exam (latest: Advt. 01/2025, 19,838 posts in Bihar Police and BSAP, exam 16 July to 3 August 2025; one OMR paper of 100 questions, 1 mark each, 2 hours, Class 10 level, on Hindi, English, Maths, Social Science, Science and GK; no deduction mentioned; under 30% out; qualifying only, final merit on PET marks). Modelled at full length (100 in 2 hours, one module grouped in the advertisement's subject order), two tests with Test 2 held out, 8 drills (`bihpHindi`, `bihpEnglish`, `bihpMaths`, `bihpHistory` (history and civics), `bihpGeography` (geography and economics), `bihpScience`, `bihpBihar`, `bihpGK`; 15/15/15/13/12/15/8/7 per test, Tigertest's split since the board publishes none, 4 drill-only each), so the dashboard is 10 steps. Hindi items are in Hindi with English explanations. Bank `data/v2/biharpolice/questions.json` (232 original single-answer items, prefix `BIHARPOLICE-`) built by `python3 -I tools/next100/biharpolice/build.py` (all-number and error-spotting options locked). GK is static facts only. Sources in `tools/next100/biharpolice/sources.md`.
```
