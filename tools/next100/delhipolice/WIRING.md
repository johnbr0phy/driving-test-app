# Delhi Police Constable (`delhipolice`) wiring for the integrator

v2 exam, built on the `sscgd` template. Files already written (unique to this exam):
`tools/next100/delhipolice/*` (8 domain sources as Python data, `build.py`, `sources.md`, this file),
`data/v2/delhipolice/questions.json` (plain array, no stimuli), `lib/v2/exams/delhipolice.ts` (export `DELHIPOLICE`),
`lib/v2/banks/delhipolice.ts` (`plainBank`), `app/delhi-police-constable/*` (layout, root redirect, dashboard,
practice/[n], stats, test/[id], test/[id]/results; copied from `app/ssc-gd-constable/`),
`app/delhi-police-constable-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/delhipolice/build.py`, then
`python3 -I tools/validate_v2_bank.py delhipolice '{"1": {"cbe": {"1": 100}}, "2": {"cbe": {"1": 100}}}'`
(passes: 234 questions, 0 stimuli, 0 problems; run on a /tmp copy because the validator rewrites
`lib/v2/bankSizes.ts`). Key strictly the longest option: 33/234 = 14%. 74 all-number items are sorted and locked;
the key is in an end slot in 40 of them (54%). Statement-conclusion items use the locked I / II / both / neither order.

Screenshots still needed: `public/landing/delhipolice-mobile.png`, `delhipolice-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  delhipolice: 234,
```

## lib/v2/registry.ts
```ts
import { DELHIPOLICE } from "./exams/delhipolice";
// EXAMS_V2: add DELHIPOLICE after UPPOLICE
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/delhipolice";
```
(mcpV2Practice uses single quotes: `import '@/lib/v2/banks/delhipolice';`)

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `DELHIPOLICE.domainLabels` (keys `delhipoliceHistory`, `delhipolicePolity`,
`delhipoliceGeography`, `delhipoliceScience`, `delhipoliceVerbal`, `delhipoliceLogical`, `delhipoliceArith`,
`delhipoliceComputer`).

## app/globals.css
The brief's hue `248 40% 36%` is within 8 degrees of `netplus` (`252 40% 40%`: same saturation, 4 points of
lightness) and `nswsel` (`250 50% 42%`: 10 and 6). Dropping lightness to 30% clears both (10 and 12 points of
lightness), and stays 15+ points of saturation from `az900` (248 90% 32%), `elevenplus` (245 70% 36%),
`eqao9` (255 70% 32%), `emt` (240 55% 48%) and `capm` (256 60% 28%). Check against the other batch-2 hues.
`DELHIPOLICE.theme` uses this value. Light block (then run `tools/gen_dark_brand_css.py` for the `.dark` tint):
```css
  /* Delhi Police Constable theme: police indigo (v2 exam; matches lib/v2/exams/delhipolice.ts theme) */
  [data-theme="delhipolice"] {
    --brand: 248 40% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 248 40% 96%;
    --brand-hover: 248 40% 26%;
    --brand-dark: 248 40% 22%;
    --brand-darker: 248 36% 15%;
    --brand-muted: 248 22% 68%;
    --brand-border: 248 26% 78%;
    --brand-border-light: 248 26% 88%;
    --brand-gradient-to: 258 40% 95%;
  }
```

## lib/shareCards.ts
```ts
  "delhipolice": {
    "color": "hsl(248, 40%, 30%)",
    "tint": "hsl(248, 40%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  delhipolice: { title: "Delhi Police Constable Mock Test", description: "Practice general knowledge, reasoning, numerical ability and computer in full 100-question, 90-minute mock tests." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  delhipolice: "IN",
```
Add `"delhipolice"` to `NON_DRIVING_TESTS` (next to `"uppolice"`).

## lib/tigerAssets.ts
`BORROWED_SETS`: `delhipolice: "police",` (as `uppolice` does).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  delhipolice: "Mock tests for the Delhi Police Constable (Executive) CBE conducted by SSC: 100 questions in 90 minutes on general knowledge, reasoning, numerical ability and computer fundamentals at Class 10 level, with negative marking explained.",
// EXAM_ORG
  delhipolice: "Staff Selection Commission · Constable (Executive) in Delhi Police",
// SEARCH_ALIASES
  delhipolice: "delhi police constable mock test delhi police mock test delhi police constable executive ssc delhi police dp constable delhi police bharti delhi police exam pattern delhi police gk reasoning computer practice set free sarkari exam government job exam india police constable",
```
Hub group: add to "India government job exams", right after `"uppolice"`:
```ts
  { title: "India government job exams", ids: ["ssccgl", "sscchsl", "sscgd", "sscmts", "rrbntpc", "rrbgroupd", "uppolice", "delhipolice", "ibpspo", "ibpsclerk", "ctet" /* , ... */] },
```

## lib/examFacts.ts
```ts
  delhipolice: {
    answer:
      "The Delhi Police Constable (Executive) Computer Based Examination (CBE) is conducted by the Staff Selection Commission for Delhi Police. It is one objective paper of 100 multiple-choice questions for 100 marks in 90 minutes: General Knowledge and Current Affairs 50, Reasoning 25, Numerical Ability 15, and Computer Fundamentals, MS Excel, MS Word, Communication, Internet, WWW and Web Browsers 10, at matriculation level, in English and Hindi. Each wrong answer loses 0.25 marks. Candidates who reach the cut-off marks are shortlisted for the Physical Endurance and Measurement Test and document verification with Delhi Police, and the final merit list follows the CBE marks.",
    rows: [
      { label: "Questions", value: "100 (GK 50, Reasoning 25, Numerical Ability 15, Computer 10)" },
      { label: "Time", value: "90 minutes, no sectional timing" },
      { label: "Marks", value: "1 per right answer, 100 in all" },
      { label: "Negative marking", value: "0.25 per wrong answer" },
      { label: "Cut-off for PE&MT", value: "UR 35, SC/ST/OBC/EWS 30, ex-servicemen 25 (normalised marks)" },
      { label: "Level", value: "Matriculation (Class 10)" },
      { label: "Language", value: "English and Hindi" },
      { label: "Next stages", value: "PE&MT and document verification by Delhi Police, medical examination" },
      { label: "Given by", value: "Staff Selection Commission, computer-based, for Delhi Police" },
    ],
    basedOn: "the SSC notice for the Constable (Executive) Male and Female in Delhi Police Examination, 2025 (22 September 2025)",
    source: { name: "Staff Selection Commission", url: "https://ssc.gov.in" },
    tigertest:
      "Tigertest has two full Delhi Police Constable mock tests of 100 questions in 90 minutes and eight topic drills: four for general knowledge, two for reasoning, one for numerical ability and one for computer. All of it is free with no account required; scores are percent correct, with negative marking explained rather than applied.",
  },
```
(checked 2026-11-01 against the notice PDF; no 2026-cycle notice had been published)

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  delhipolice: "a Delhi Police constable coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"delhipolice"` (coaching institutes run Delhi Police constable batches).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## next.config.ts
Nothing needed.

## CLAUDE.md
Add in the v2 section after the UP Police Constable bullet:
```md
- **Delhi Police Constable** (`/delhi-police-constable`, landing `/delhi-police-constable-practice-test`, `[data-theme="delhipolice"]` police indigo, borrows the police tiger, region IN, hub group "India government job exams"): the Staff Selection Commission's Constable (Executive) Male and Female in Delhi Police CBE (2025 notice of 22 September 2025, the latest as of November 2026): 100 questions for 100 marks in 90 minutes with no sectional timing, General Knowledge/Current Affairs 50, Reasoning 25, Numerical Ability 15, Computer Fundamentals, MS Excel, MS Word, Communication, Internet, WWW and Web Browsers 10, matriculation level, English and Hindi, 0.25 off per wrong answer; cut-off marks for the PE&MT UR 35, SC/ST/OBC/EWS 30, ESM 25. Two full 100-item mock tests (one section `cbe`, in the paper's order), Test 2 held out, 8 drills (`delhipoliceHistory`, `delhipolicePolity` (with Delhi's status under Article 239AA), `delhipoliceGeography`, `delhipoliceScience`, `delhipoliceVerbal`, `delhipoliceLogical`, `delhipoliceArith`, `delhipoliceComputer`; 13/12/12/13/13/12/15/10 per test, 4 drill-only each and 6 for computer), so the dashboard is 10 steps. Bank `data/v2/delhipolice/questions.json` (234 original single-answer items, prefix `DELHIPOLICE-`, plain array) built by `tools/next100/delhipolice/build.py`. GK static only, reasoning text only (the notice's figure items not modelled), English only. Percent score; negative marking explained, not applied. Sources in `tools/next100/delhipolice/sources.md`.
```

## Overlap with other banks
Checked against ssccgl, rrbntpc, ibpspo, ctet, rrbgroupd, sscgd, sscchsl, sscmts, uppolice, ibpsclerk, jnvst and the
batch-2 banks present on disk (biharpolice, rajpolice, mppolice, ibpsrrb): about 90 first-draft items that shared a
fact and answer or the same numbers were rewritten. Remaining same-answer matches are structural only (different
numbers or scenario), and a few against concurrent batch-2 banks that were rewritten as they appeared. Recheck once those banks are final.
