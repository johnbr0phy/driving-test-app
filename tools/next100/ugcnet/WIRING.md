# UGC-NET Paper 1 (`ugcnet`) wiring for the integrator

v2 exam, built on the `ctet` template (per-domain Python sources plus shared stimuli, keys authored first and
shuffled by a stem seed; build pattern from `tools/next100/jnvst`). Files written (unique to this exam):
`tools/next100/ugcnet/*` (10 unit sources as Python data, `stimuli.py`, `ditables.py`, `build.py`, `sources.md`,
this file), `data/v2/ugcnet/questions.json` (object form `{ stimuli, questions }`, 216 items, 8 stimuli, prefix
`UGCNET-`), `lib/v2/exams/ugcnet.ts` (export `UGCNET`), `lib/v2/banks/ugcnet.ts` (`withStimuli`),
`app/ugc-net-paper-1/*` (layout, root redirect, dashboard, practice/[n], stats, test/[id], test/[id]/results;
copied from `app/ctet/`), `app/ugc-net-paper-1-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/ugcnet/build.py`, then validate (from a copy that does not write bankSizes):
`python3 -I tools/validate_v2_bank.py ugcnet '{"1": {"p1": {"1": 50}}, "2": {"p1": {"1": 50}}}'`
(216 questions, 8 stimuli, 0 problems; key strictly longest 39/216 = 18%). Do not add `ugcnet` to
`tools/build_v2_bank.py` PLANS.

Shape: one section `p1`, one 50-item module in 60 minutes (Paper 1's share of the real 3 hours for 150
questions). Per test 5 items from each of the 10 syllabus units in syllabus order (the UGC syllabus sets five
per unit); Unit III is one passage of 5 (`UGCNET-T1-RC`, `UGCNET-T2-RC`) and Unit VII one table of 5
(`UGCNET-T1-DI`, `UGCNET-T2-DI`); drill-only: 12 per unit, and 2 passages and 2 tables (`UGCNET-D-RC1/2`,
`UGCNET-D-DI1/2`). 9 drills (ICT and Higher Education share one) + 2 tests = 11 dashboard steps. No Basics, no
premium. 38 all-number items are sorted and locked (key in an end slot 20 of 38); 6 Statement I / Statement II
items use `lockedOrder`. Test 2 held out.

Screenshots still needed: `public/landing/ugcnet-mobile.png`, `ugcnet-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  ugcnet: 216,
```

## lib/v2/registry.ts
```ts
import { UGCNET } from "./exams/ugcnet";
// EXAMS_V2: add UGCNET next to CTET (teacher eligibility exams)
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/ugcnet";
```
(`mcpV2Practice.ts` uses single quotes: `import '@/lib/v2/banks/ugcnet';`)

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `UGCNET.domainLabels` (keys `ugcnetTeaching`, `ugcnetResearch`,
`ugcnetComprehension`, `ugcnetCommunication`, `ugcnetMaths`, `ugcnetLogic`, `ugcnetData`, `ugcnetIct`,
`ugcnetEnvironment`, `ugcnetHigherEd`).

## app/globals.css
Hue: the brief's **240 25% 40%** (muted slate indigo). Checked against every theme within 8 degrees: awssaa
235 30% 32% (lightness +8), uppolice 239 45% 30% (saturation -20), emt 240 55% 48% (-30), naplan7 240 90% 44%,
osslt 232 52% 42%, ukseru 232 80% 43%, elevenplus 245 70% 36%, az900 248 90% 32%, delhipolice 248 40% 30%
(saturation -15). No batch-4 suggestion is within 8 degrees. Matches `lib/v2/exams/ugcnet.ts` `theme`. Run
`tools/gen_dark_brand_css.py` afterwards.
```css
  /* UGC-NET Paper 1 theme: muted slate indigo (v2 exam; matches lib/v2/exams/ugcnet.ts theme) */
  [data-theme="ugcnet"] {
    --brand: 240 25% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 240 25% 96%;
    --brand-hover: 240 25% 34%;
    --brand-dark: 240 25% 30%;
    --brand-darker: 240 22% 14%;
    --brand-muted: 240 15% 72%;
    --brand-border: 240 18% 80%;
    --brand-border-light: 240 18% 90%;
    --brand-gradient-to: 252 25% 96%;
  }
```

## lib/shareCards.ts
```ts
  "ugcnet": {
    "color": "hsl(240, 25%, 40%)",
    "tint": "hsl(240, 25%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  ugcnet: { title: "UGC-NET Paper 1", description: "Full 50-question Paper 1 mocks across all ten units of Teaching and Research Aptitude, with every answer explained." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  ugcnet: "IN",
// NON_DRIVING_TESTS: add
  "ugcnet",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  ugcnet: "NTA UGC-NET Paper 1, the General Paper on Teaching and Research Aptitude: 50 questions, five from each of the ten units, including a reading passage, a data table, logical reasoning with Indian logic, ICT, environment and the higher education system. No negative marking. Paper 2 is not included.",
// EXAM_ORG
  ugcnet: "National Testing Agency for the UGC · NET Paper 1 (Teaching and Research Aptitude)",
// SEARCH_ALIASES
  ugcnet: "ugc net ugc-net ugc net paper 1 nta net paper 1 general paper teaching and research aptitude teaching aptitude research aptitude net jrf junior research fellowship assistant professor eligibility phd entrance net mock test free ugc net mock test net exam india csir net",
// RELATED_OVERRIDES (if needed)
  ugcnet: ["ctet", "upscse", "ssccgl"],
```
Hub group: if the integrator creates an India teacher-eligibility group for this batch (with `ctet`, `reet`,
`uptet`), put `"ugcnet"` there first; otherwise add `"ugcnet"` to "India government job exams" right after
`"ctet"`.

## lib/examFacts.ts
```ts
  ugcnet: {
    answer:
      "UGC-NET is the National Eligibility Test that the National Testing Agency conducts for the University Grants Commission, usually in June and December cycles, to decide eligibility for Junior Research Fellowship, Assistant Professor and PhD admission. It is a computer-based test of two papers in one 3-hour sitting with no break. Paper 1, the General Paper on Teaching and Research Aptitude, has 50 compulsory questions for 100 marks, five from each of ten units; Paper 2, on the candidate's subject, has 100 questions for 200 marks. Each question carries 2 marks and there is no negative marking. Candidates need at least 40% aggregate across both papers (35% for reserved categories) to be considered.",
    rows: [
      { label: "Paper 1", value: "50 questions, 100 marks, 5 from each of 10 units" },
      { label: "Paper 2", value: "100 questions, 200 marks, on your subject" },
      { label: "Time", value: "3 hours for both papers, no break" },
      { label: "Negative marking", value: "None (2 marks per correct answer)" },
      { label: "Minimum to be considered", value: "40% aggregate of both papers (35% reserved)" },
      { label: "Languages", value: "English and Hindi" },
      { label: "Given by", value: "National Testing Agency (NTA) for the UGC" },
    ],
    basedOn: "the NTA UGC-NET December 2026 information bulletin and the UGC NET Bureau's Paper I syllabus (code 00)",
    source: { name: "NTA UGC-NET", url: "https://ugcnet.nta.nic.in/" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  ugcnet: "a UGC-NET coaching class or a university NET preparation cell",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"ugcnet"` (NET coaching and university NET/JRF preparation cells).

## lib/tigerAssets.ts
Suggest borrowing the CTET tiger: `ugcnet: "ctet"` in `BORROWED_SETS` if `ctet` has a set; otherwise nothing
(DMV tiger fallback).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
After the CTET bullet:
```md
- **UGC-NET Paper 1** (`/ugc-net-paper-1`, landing `/ugc-net-paper-1-practice-test`, `[data-theme="ugcnet"]` muted slate indigo, region IN): the NTA's UGC-NET General Paper on Teaching and Research Aptitude (Paper I, code 00), per the December 2026 information bulletin (revised 16 October 2026; CBT; Paper 1 50 questions for 100 marks and Paper 2 100 for 200 in one 3-hour sitting with no break; 2 marks each, no negative marking; English and Hindi; at least 40% aggregate of both papers, 35% reserved, to be considered, then subject and category cut-offs) and the UGC NET Bureau's ten-unit syllabus, which sets five questions per unit. One section `p1`, one 50-item module in 60 minutes (Paper 1's share of the 3 hours), 5 per unit in syllabus order, Unit III a 5-question passage and Unit VII a 5-question table as shared stimuli (`UGCNET-T1-RC`, `-T1-DI`, `-T2-RC`, `-T2-DI`, drill `-D-RC1/2`, `-D-DI1/2`); two tests, Test 2 held out, 9 drills (one per unit, ICT and Higher Education together; domains `ugcnetTeaching`, `ugcnetResearch`, `ugcnetComprehension`, `ugcnetCommunication`, `ugcnetMaths`, `ugcnetLogic`, `ugcnetData`, `ugcnetIct`, `ugcnetEnvironment`, `ugcnetHigherEd`), 11 dashboard steps, free. Logical Reasoning includes Indian logic (pramanas, vyapti, hetvabhasa); Statement I / Statement II items are locked. Paper 2 and current affairs are not modelled. Bank `data/v2/ugcnet/questions.json` (216 original items, prefix `UGCNET-`, object form) built by `python3 -I tools/next100/ugcnet/build.py` from one Python source per unit, `stimuli.py` and `ditables.py` (every table key computed and asserted). Percent score; the 40% aggregate rule and cut-offs are explained in `scoreNote` and on the landing. Sources in `tools/next100/ugcnet/sources.md`.
```
