# SSC GD Constable (`sscgd`) wiring for the integrator

v2 exam, built on the `ssccgl` template. Files already written (unique to this exam):
`tools/next100/sscgd/*` (8 domain sources as Python data, `stimuli.json` with 2 cloze and 2 reading passages,
`build.py`, `sources.md`), `data/v2/sscgd/questions.json` (object form `{ stimuli, questions }`),
`lib/v2/exams/sscgd.ts` (export `SSCGD`), `lib/v2/banks/sscgd.ts` (`withStimuli`), `app/ssc-gd-constable/*` (layout,
root redirect, dashboard, practice/[n], stats, test/[id], test/[id]/results; copied from `app/ssc-cgl/`),
`app/ssc-gd-constable-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/sscgd/build.py`, then
`python3 -I tools/validate_v2_bank.py sscgd '{"1": {"cbe": {"1": 80}}, "2": {"cbe": {"1": 80}}}'`
(passes: 208 questions, 4 stimuli, 0 problems; the validator rewrites `lib/v2/bankSizes.ts`, so it was run on a copy
and the line is given below). Key strictly the longest option: 28/208 = 13%.

Screenshots still needed: `public/landing/sscgd-mobile.png`, `sscgd-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  sscgd: 208,
```

## lib/v2/registry.ts
```ts
import { SSCGD } from "./exams/sscgd";
// EXAMS_V2: add SSCGD after SSCCGL
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/sscgd";
```
(mcpV2Practice uses single quotes: `import '@/lib/v2/banks/sscgd';`)

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `SSCGD.domainLabels` (keys `sscgdVerbal`, `sscgdLogical`, `sscgdHistory`,
`sscgdScience`, `sscgdNumber`, `sscgdArith`, `sscgdGrammar`, `sscgdVocab`).

## app/globals.css
The brief's hue was `132 45% 30%`, but that is 4 degrees from `uksia` (`128 45% 30%`, the same saturation and
lightness) and 3 from `foodhandler` (`135 55% 33.4%`). The house rule (within 8 degrees, differ by 15 points of
saturation or 8 of lightness) is met by dropping the lightness to 22%: 8 below uksia and ukfaw (124 72% 30%),
11 below foodhandler, and 15 points of saturation from jambeng (140 60% 24%). `SSCGD.theme` uses this value.
Light block (then run `tools/gen_dark_brand_css.py` for the `.dark` tint):
```css
  /* SSC GD Constable theme: deep forest green (v2 exam; matches lib/v2/exams/sscgd.ts theme) */
  [data-theme="sscgd"] {
    --brand: 132 45% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 132 45% 95%;
    --brand-hover: 132 45% 19%;
    --brand-dark: 132 45% 16%;
    --brand-darker: 132 40% 11%;
    --brand-muted: 132 25% 68%;
    --brand-border: 132 28% 78%;
    --brand-border-light: 132 28% 88%;
    --brand-gradient-to: 142 45% 95%;
  }
```

## lib/shareCards.ts
```ts
  "sscgd": {
    "color": "hsl(132, 45%, 22%)",
    "tint": "hsl(132, 45%, 95%)"
  },
```

## lib/shareCardCopy.ts
```ts
  sscgd: { title: "SSC GD Constable Mock Test", description: "Practice reasoning, general knowledge, elementary maths and English in full 80-question, 60-minute mock tests." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  sscgd: "IN",
```
Add `"sscgd"` to `NON_DRIVING_TESTS` (next to `"ssccgl"`).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  sscgd: "Mock tests for the SSC GD Constable CBE: 80 questions in 60 minutes on reasoning, general knowledge, elementary mathematics and English at Class 10 level, with negative marking explained.",
// EXAM_ORG
  sscgd: "Staff Selection Commission · Constable (GD) in CAPFs, SSF and Assam Rifles",
// SEARCH_ALIASES
  sscgd: "ssc gd mock test ssc gd constable ssc gd practice set ssc gd 2026 gd constable exam capf constable bsf cisf crpf ssb itbp assam rifles rifleman ssf staff selection commission sarkari exam government job exam india police constable reasoning gk maths english",
```
Hub group: add to "India government job exams", right after `"ssccgl"`:
```ts
  { title: "India government job exams", ids: ["ssccgl", "sscgd", "rrbntpc", "ibpspo", "ctet" /* , ... */] },
```

## lib/examFacts.ts
```ts
  sscgd: {
    answer:
      "The SSC GD Constable Computer Based Examination (CBE) is the first stage of the Staff Selection Commission's recruitment of Constables (GD) in the Central Armed Police Forces (BSF, CISF, CRPF, SSB, ITBP) and the SSF, and Riflemen (GD) in the Assam Rifles. It has 80 multiple-choice questions in 60 minutes, in four parts of 20: General Intelligence and Reasoning, General Knowledge and General Awareness, Elementary Mathematics, and English or Hindi, at matriculation level. Each right answer earns 2 marks (160 in all) and each wrong answer loses 0.25 marks. Candidates who qualify go on to the Physical Efficiency Test and Physical Standard Test, a medical examination and document verification.",
    rows: [
      { label: "Questions", value: "80 (20 per part)" },
      { label: "Time", value: "60 minutes, no sectional timing" },
      { label: "Marks", value: "2 per right answer, 160 in all" },
      { label: "Negative marking", value: "0.25 per wrong answer" },
      { label: "Parts", value: "Reasoning, General Knowledge, Elementary Mathematics, English or Hindi" },
      { label: "Minimum qualifying marks", value: "UR 30%, OBC and EWS 25%, all other categories 20%" },
      { label: "Calculator", value: "Not allowed" },
      { label: "Next stages", value: "PET and PST, medical examination, document verification" },
      { label: "Given by", value: "Staff Selection Commission, computer-based, in English, Hindi and 13 regional languages" },
    ],
    basedOn: "the SSC Constable (GD) in CAPFs and SSF, and Rifleman (GD) in Assam Rifles Examination notice (2026 cycle, 1 December 2025)",
    source: { name: "Staff Selection Commission", url: "https://ssc.gov.in" },
    tigertest:
      "Tigertest has two full SSC GD mock tests of 80 questions in 60 minutes and eight topic drills, two for each part. All of it is free with no account required; scores are percent correct, with negative marking explained rather than applied. Part D is practised in English.",
  },
```
(checked 2026-10-31; scheme, marks and qualifying marks confirmed against the notice PDF 2026-11-01)

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  sscgd: "an SSC GD coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"sscgd"` (coaching institutes and defence academies run SSC GD batches).

## lib/tigerAssets.ts, lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering (unknown ids fall back to the DMV tiger). Bump the exams date in `lib/seoDates.ts` with the wave.

## next.config.ts
Nothing needed.

## CLAUDE.md
Add in the v2 section after the SSC CGL bullet:
```md
- **SSC GD Constable** (`/ssc-gd-constable`, landing `/ssc-gd-constable-practice-test`, `[data-theme="sscgd"]` deep forest green, region IN, hub group "India government job exams"): the Staff Selection Commission's Constable (GD) in CAPFs and SSF, and Rifleman (GD) in Assam Rifles CBE (2026 notice of 1 December 2025), 80 questions in 60 minutes with no sectional timing, four parts of 20 (reasoning, general knowledge, elementary mathematics, English or Hindi) at matriculation level, 2 marks each and 0.25 off per wrong answer; minimum qualifying marks UR 30%, OBC/EWS 25%, all other categories 20%. Two 80-item mock tests (one section `cbe`, in the paper's order), Test 2 held out, 8 drills, two per part (`sscgdVerbal`, `sscgdLogical`, `sscgdHistory`, `sscgdScience`, `sscgdNumber`, `sscgdArith`, `sscgdGrammar`, `sscgdVocab`; 10 each per test, 6 drill-only each), so the dashboard is 10 steps. Bank `data/v2/sscgd/questions.json` (208 original single-answer items, prefix `SSCGD-`, object form with cloze stimuli `SSCGD-CL1/2` and reading stimuli `SSCGD-RC1/2`) built by `tools/next100/sscgd/build.py`. Part D in English only (no Hindi), reasoning text only, GK static; rupees and Indian names. Percent score; negative marking explained, not applied. Sources in `tools/next100/sscgd/sources.md`.
```
