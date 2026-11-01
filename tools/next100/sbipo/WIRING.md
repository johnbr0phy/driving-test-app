# SBI PO Prelims (`sbipo`) wiring for the integrator

v2 exam, built on the IBPS PO template (`tools/ibpspo`, `app/ibps-po`; build script copied via `tools/next100/ibpsclerk`).
Files written (unique to this exam): `tools/next100/sbipo/*` (9 domain sources, `stimuli.py` with 21 shared stimuli,
`build.py`, `sources.md`, this file), `data/v2/sbipo/questions.json` (object form `{ stimuli, questions }`),
`lib/v2/exams/sbipo.ts` (export `SBIPO`), `lib/v2/banks/sbipo.ts` (`withStimuli`), `app/sbi-po/*` (layout,
root redirect, dashboard, practice/[n], test/[id], test/[id]/results, stats), `app/sbi-po-prelims-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/sbipo/build.py`, then
`python3 -I tools/validate_v2_bank.py sbipo '{"1": {"eng": {"1": 40}, "quant": {"1": 30}, "reason": {"1": 30}}, "2": {"eng": {"1": 40}, "quant": {"1": 30}, "reason": {"1": 30}}}'`
(231 questions, 21 stimuli, 0 problems, run from a /tmp copy so bankSizes was not touched). Key strictly longest:
29/231 = 13%.

**Pattern changed in 2026.** SBI's advertisement CRPD/PO/2026-27/09 (18 June 2026) moved the Prelims to English 40,
Quant 30, Reasoning 30 (20 minutes each). The bank and copy follow the new split, unlike ibpspo (30/35/35).
No sectional cut-off in the Prelims (unlike IBPS PO).

Shape: sections `eng` (40 in 20 min), `quant` (30 in 20 min), `reason` (30 in 20 min), one module each,
`breakSeconds: 0`. Two mock tests, Test 2 held out, 9 drills (3 per section), 11 dashboard steps. Free.
Screenshots still needed: `public/landing/sbipo-mobile.png`, `sbipo-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  sbipo: 231,
```

## lib/v2/registry.ts
```ts
import { SBIPO } from "./exams/sbipo";
// EXAMS_V2: add SBIPO right after IBPSCLERK (or IBPSPO)
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/sbipo";
```

## types/index.ts and i18n/*
Nothing: domain labels live in `SBIPO.domainLabels` (`sbipoReading`, `sbipoCloze`, `sbipoGrammar`, `sbipoNumber`,
`sbipoDI`, `sbipoArith`, `sbipoLogic`, `sbipoPuzzle`, `sbipoVerbal`).

## app/globals.css
Hue: the brief suggested 218 70% 30%, but that clashes with boating (215 65% 32%) and police (226 70% 28%), and every
218 to 224 combination in range clashed with something (ukcar, pcoc, caplumb, sat, civics, phlto...). A script over
globals.css and the v2 configs found 212 70% 46% clear of every theme (caplumb 212 88% 30%: sat 18; phlto 212 40% 26%;
series7 212 90% 43%: sat 20). `SBIPO.theme` uses it; change both if you settle on another.
```css
  /* SBI PO theme: bank blue (v2 exam; matches lib/v2/exams/sbipo.ts theme) */
  [data-theme="sbipo"] {
    --brand: 212 70% 46%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 212 70% 96%;
    --brand-hover: 212 70% 41%;
    --brand-dark: 212 70% 36%;
    --brand-darker: 212 65% 18%;
    --brand-muted: 212 30% 70%;
    --brand-border: 212 45% 82%;
    --brand-border-light: 212 45% 91%;
    --brand-gradient-to: 200 70% 96%;
  }
```
Then run `tools/gen_dark_brand_css.py` for the `.dark` block.

## lib/shareCards.ts
```ts
  "sbipo": {
    "color": "hsl(212, 70%, 46%)",
    "tint": "hsl(212, 70%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  sbipo: { title: "SBI PO Prelims Mock Test", description: "Full 100-question mock tests on the 2026 pattern: English 40, Quant 30 and Reasoning 30, with 20-minute sectional timing." },
```

## lib/shareImageUrl.ts and lib/tigerAssets.ts
No tiger set: borrow the IBPS PO tiger (add `sbipo: "ibpspo"` to `BORROWED_SETS`, or add `"sbipo"` next to `"ibpspo"`
wherever ibpsclerk was added). The landing calls `getTigerAsset("sbipo", 1)`.

## lib/region.ts
```ts
// TEST_REGIONS
  sbipo: "IN",
```
Add `"sbipo"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  sbipo: "Mock tests for the SBI PO Preliminary exam on the 2026 pattern: 100 questions in 60 minutes with 20-minute sectional timing across English Language (40), Quantitative Aptitude (30) and Reasoning Ability (30), with negative marking explained.",
// EXAM_ORG
  sbipo: "State Bank of India · Probationary Officers, Phase I Preliminary Examination",
// SEARCH_ALIASES
  sbipo: "sbi po mock test sbi po prelims state bank of india probationary officer sbi po 2026 new pattern bank po exam india crpd po reasoning puzzles seating arrangement simplification number series quadratic equations data interpretation english cloze para jumble sarkari exam government job",
```
Hub group "India government job exams": add after `ibpsclerk` (or `ibpspo`):
```ts
  { title: "India government job exams", ids: ["ssccgl", "rrbntpc", "ibpspo", "ibpsclerk", "sbipo", "ctet" /* ...existing */] },
```
RELATED_OVERRIDES, if the group needs one: `sbipo: ["ibpspo", "sbiclerk", "ibpsclerk"]`.

## lib/examFacts.ts
```ts
  sbipo: {
    answer:
      "The SBI PO Preliminary Examination is an online objective test of 100 marks in one hour, with separate timing for each section: English Language 40 questions in 20 minutes, Quantitative Aptitude 30 questions in 20 minutes and Reasoning Ability 30 questions in 20 minutes. This is the pattern in SBI's 2026 advertisement; earlier cycles had 30, 35 and 35 questions. A quarter of a question's marks is deducted for every wrong answer. There is no sectional cut-off in the Prelims: candidates are ranked by category on their total marks and about ten times the vacancies are called for the Main Examination. Prelims marks are not counted in the final merit list.",
    rows: [
      { label: "Questions", value: "100" },
      { label: "Time", value: "1 hour, 20 minutes per section" },
      { label: "Sections", value: "English 40, Quantitative Aptitude 30, Reasoning Ability 30" },
      { label: "Marks", value: "100 in all" },
      { label: "Negative marking", value: "1/4 of the question's marks per wrong answer" },
      { label: "Cut-off", value: "No sectional cut-off; about 10 times the vacancies per category go to the Mains" },
      { label: "Given by", value: "State Bank of India (CRPD), online" },
      { label: "Next stages", value: "Main Examination, then psychometric test, group exercise and interview" },
    ],
    basedOn: "the SBI advertisement CRPD/PO/2026-27/09 (Recruitment of Probationary Officers, 18 June 2026), section 8, Selection Procedure, and SBI's Acquaint Yourself Booklet for the 2026 Prelims (22 July 2026)",
    source: { name: "SBI Careers", url: "https://sbi.bank.in/web/careers/current-openings" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  sbipo: "a bank exam coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"sbipo"` (bank exam coaching institutes).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section, after IBPS Clerk:
```md
- **SBI PO** (`/sbi-po`, landing `/sbi-po-prelims-practice-test`, `[data-theme="sbipo"]` bank blue, borrows the IBPS PO tiger, region IN, hub group "India government job exams"): State Bank of India Probationary Officers Phase I Preliminary Examination on advertisement CRPD/PO/2026-27/09 (18 June 2026, 1,500 vacancies, prelims August 2026), which moved the paper to English Language 40, Quantitative Aptitude 30 and Reasoning Ability 30 (from 30/35/35), 20 minutes each with separate timing, 100 marks in one hour, a quarter of a question's marks off per wrong answer, no sectional cut-off (about 10 times the vacancies per category go to the Mains on aggregate). Three sections (`eng`, `quant`, `reason`), each one timed module. Two 100-item mock tests, Test 2 held out, 9 drills, three per section (`sbipoReading`, `sbipoCloze`, `sbipoGrammar`, `sbipoNumber`, `sbipoDI`, `sbipoArith`, `sbipoLogic`, `sbipoPuzzle`, `sbipoVerbal`; 16/12/12, 12/8/10, 6/15/9 per test, 31 drill-only), so the dashboard is 11 steps. Bank `data/v2/sbipo/questions.json` (231 original five-option single-answer items, prefix `SBIPO-`, object form with 21 stimuli: two reading passages, a para jumble and a cloze per test, two DI tables and three brute-force-checked puzzles) built by `python3 -I tools/next100/sbipo/build.py`; numbers and sentences kept clear of the other India banks. Score out of 100 with no negative marking; penalty and shortlisting in `scoreNote` and on the landing. Sources in `tools/next100/sbipo/sources.md`.
```
