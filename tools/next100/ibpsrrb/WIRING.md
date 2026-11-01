# IBPS RRB Office Assistant Prelims (`ibpsrrb`) wiring for the integrator

v2 exam, built on the IBPS Clerk template (`tools/next100/ibpsclerk`, `app/ibps-clerk`). Files written (unique
to this exam): `tools/next100/ibpsrrb/*` (7 domain sources as Python data, `stimuli.py` with 12 shared stimuli,
`build.py`, `sources.md`, this file), `data/v2/ibpsrrb/questions.json` (object form `{ stimuli, questions }`),
`lib/v2/exams/ibpsrrb.ts` (export `IBPSRRB`), `lib/v2/banks/ibpsrrb.ts` (`withStimuli`), `app/ibps-rrb-clerk/*`
(layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results, stats; copied from
`app/ibps-clerk/`), `app/ibps-rrb-office-assistant-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/ibpsrrb/build.py`, then
`python3 -I tools/validate_v2_bank.py ibpsrrb '{"1": {"reason": {"1": 40}, "quant": {"1": 40}}, "2": {"reason": {"1": 40}, "quant": {"1": 40}}}'`
(200 questions, 12 stimuli, 0 problems; run here through a copy without the bankSizes write, so the validator
will add the bankSizes line itself when you run it). Key strictly longest: 10/200 = 5%. All-number options are
sorted ascending and locked (`N()`), conclusion sets locked (`L()`); every other item is shuffled by a stem seed.
Every puzzle was brute-forced for a unique solution, every inequality and syllogism key is checked by a model
search inside `ibpsrrbLogic.py`, every computed answer is asserted, and the build warns on stems or number sets
shared with the other India banks (none now).

Shape: sections `reason` (Reasoning, 40 in 25 min) then `quant` (Numerical Ability, 40 in 20 min), one module
each, `breakSeconds: 0`, as in the CRP RRBs-XV notification (1 September 2026). Two mock tests, Test 2 held out,
7 drills (4 Reasoning, 3 Numerical), 9 dashboard steps. Free, no Premium gating. Screenshots still needed:
`public/landing/ibpsrrb-mobile.png`, `ibpsrrb-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  ibpsrrb: 200,
```

## lib/v2/registry.ts
```ts
import { IBPSRRB } from "./exams/ibpsrrb";
// EXAMS_V2: add IBPSRRB right after IBPSCLERK
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports (classQuestions uses double quotes, mcpV2Practice single):
```ts
import "@/lib/v2/banks/ibpsrrb";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `IBPSRRB.domainLabels` (keys `ibpsrrbLogic`, `ibpsrrbPuzzle`, `ibpsrrbCoding`,
`ibpsrrbRelations`, `ibpsrrbNumber`, `ibpsrrbDI`, `ibpsrrbArith`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). As integrated: 105 75% 30%, matching
`IBPSRRB.theme` (the builder's first pick, 92 90% 30%, was moved by the integrator; keep the config and CSS in step).
```css
  /* IBPS RRB Office Assistant theme: paddy green (v2 exam; matches lib/v2/exams/ibpsrrb.ts theme) */
  [data-theme="ibpsrrb"] {
    --brand: 105 75% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 105 60% 96%;
    --brand-hover: 105 75% 26%;
    --brand-dark: 105 75% 22%;
    --brand-darker: 105 70% 12%;
    --brand-muted: 105 30% 72%;
    --brand-border: 105 40% 80%;
    --brand-border-light: 105 40% 90%;
    --brand-gradient-to: 90 60% 96%;
  }
```

## lib/shareCards.ts
```ts
  "ibpsrrb": {
    "color": "hsl(105, 75%, 30%)",
    "tint": "hsl(105, 60%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  ibpsrrb: { title: "IBPS RRB Office Assistant Prelims Mock Test", description: "Practice reasoning and numerical ability in full 80-question mock tests with 25 and 20-minute sectional timing." },
```

## lib/shareImageUrl.ts and lib/tigerAssets.ts
Add `"ibpsrrb"` to `SHARE_COPY_IDS` (next to `"ibpsclerk"`), and borrow the IBPS PO tiger in the tigerAssets
borrowed map next to `ibpsclerk: "ibpspo"`:
```ts
  ibpsrrb: "ibpspo",
```

## lib/region.ts
```ts
// TEST_REGIONS
  ibpsrrb: "IN",
```
Add `"ibpsrrb"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  ibpsrrb: "Mock tests for the IBPS RRB Office Assistant (Clerk) Preliminary exam: 80 questions in 45 minutes with sectional timing, Reasoning 40 in 25 minutes and Numerical Ability 40 in 20 minutes, with negative marking explained.",
// EXAM_ORG
  ibpsrrb: "IBPS · CRP RRBs Office Assistant (Multipurpose) Preliminary Examination",
// SEARCH_ALIASES
  ibpsrrb: "ibps rrb clerk mock test ibps rrb office assistant multipurpose prelims crp rrbs regional rural bank gramin bank clerk exam rrb clerk rrb assistant bank exam india reasoning puzzles seating arrangement inequality syllogism coding simplification approximation number series data interpretation sarkari exam government job",
```
Hub group "India government job exams": add after `ibpsclerk`:
```ts
  { title: "India government job exams", ids: ["ssccgl", "sscchsl", "sscgd", "sscmts", "rrbntpc", "rrbgroupd", "uppolice", "ibpspo", "ibpsclerk", "ibpsrrb", "ctet"] },
```
(keep any batch 2 additions such as sbipo / sbiclerk in the order you settle.)
RELATED_OVERRIDES, if the group needs one: `ibpsrrb: ["ibpsclerk", "ibpspo", "sbiclerk"]`.

## lib/examFacts.ts
```ts
  ibpsrrb: {
    answer:
      "The IBPS RRB Office Assistant (Multipurpose) Preliminary Examination, often called IBPS RRB Clerk, is one online objective paper of 80 questions in 45 minutes, with each test timed separately: Reasoning 40 questions in 25 minutes and Numerical Ability 40 questions in 20 minutes. Each question carries one mark and a quarter of a mark is deducted for every wrong answer. Candidates must clear a minimum cutoff set by IBPS in both tests; Prelims is qualifying for the Main examination, and only Main marks count for the final merit list and provisional allotment to a Regional Rural Bank. Under the CRP RRBs-XV notification of 1 September 2026, the Prelims is scheduled for November or December 2026.",
    rows: [
      { label: "Questions", value: "80 (five options each in past papers)" },
      { label: "Time", value: "45 minutes: Reasoning 25, Numerical Ability 20" },
      { label: "Sections", value: "Reasoning 40, Numerical Ability 40" },
      { label: "Marks", value: "1 per question, 80 in all" },
      { label: "Negative marking", value: "1/4 mark per wrong answer" },
      { label: "Result", value: "A cutoff in both tests, set by IBPS, then the Mains" },
      { label: "Given by", value: "Institute of Banking Personnel Selection (IBPS), online" },
      { label: "Medium", value: "English, Hindi or the state's listed language" },
    ],
    basedOn: "the IBPS CRP RRBs-XV notification of 1 September 2026, section D (Online Examination Structure) and E (Penalty for Wrong Answers)",
    source: { name: "IBPS", url: "https://www.ibps.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  ibpsrrb: "a bank exam coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"ibpsrrb"` (bank exam coaching institutes).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section, after IBPS Clerk:
```md
- **IBPS RRB Clerk** (`/ibps-rrb-clerk`, landing `/ibps-rrb-office-assistant-practice-test`, `[data-theme="ibpsrrb"]` paddy green, borrows the IBPS PO tiger, region IN, hub group "India government job exams"): IBPS CRP RRBs Office Assistant (Multipurpose) Preliminary Examination, 80 five-option questions in 45 minutes with sectional timing (Reasoning 40 in 25 min, Numerical Ability 40 in 20 min, no English section), a quarter mark off per wrong answer, a cutoff in both tests, Mains marks alone for merit; pattern confirmed in the official CRP RRBs-XV notification of 1 September 2026 (Prelims November or December 2026; guides report 6, 12 and 13 December). Two sections (`reason`, `quant`), each one timed module. Two 80-item mock tests, Test 2 held out, 7 drills (`ibpsrrbLogic`, `ibpsrrbPuzzle`, `ibpsrrbCoding`, `ibpsrrbRelations`, `ibpsrrbNumber`, `ibpsrrbDI`, `ibpsrrbArith`; 8/15/8/9 and 16/10/14 per test, 40 drill-only), so the dashboard is 9 steps. Bank `data/v2/ibpsrrb/questions.json` (200 original single-answer items, prefix `IBPSRRB-`, object form with 12 stimuli: 7 puzzles, 5 data tables) built by `python3 -I tools/next100/ibpsrrb/build.py` (puzzles brute-forced unique, inequality and syllogism keys model-checked, computed answers asserted; warns on stems or number sets shared with the other India banks). English only, though the real exam is also offered in Hindi and state languages (the landing says so). Percent score with no negative marking; penalty and cutoffs in `scoreNote` and on the landing. Sources in `tools/next100/ibpsrrb/sources.md`.
```
