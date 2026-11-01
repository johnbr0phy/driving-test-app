# SBI Clerk Prelims (`sbiclerk`) wiring for the integrator

v2 exam, built on the IBPS Clerk template (`tools/next100/ibpsclerk`, `app/ibps-clerk`). Files written (unique
to this exam): `tools/next100/sbiclerk/*` (9 domain sources as Python data, `stimuli.py` with 17 shared stimuli,
`build.py`, `sources.md`, this file), `data/v2/sbiclerk/questions.json` (object form `{ stimuli, questions }`),
`lib/v2/exams/sbiclerk.ts` (export `SBICLERK`), `lib/v2/banks/sbiclerk.ts` (`withStimuli`), `app/sbi-clerk/*`
(layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results, stats; copied from
`app/ibps-clerk/`), `app/sbi-clerk-prelims-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/sbiclerk/build.py`, then
`python3 -I tools/validate_v2_bank.py sbiclerk '{"1": {"eng": {"1": 30}, "quant": {"1": 35}, "reason": {"1": 35}}, "2": {"eng": {"1": 30}, "quant": {"1": 35}, "reason": {"1": 35}}}'`
(227 questions, 17 stimuli, 0 problems; run from a /tmp copy, so the validator will add the bankSizes line
itself when you run it in the repo). Key strictly longest: 31/227 = 14%.
Its own build (keys first, stem-seeded shuffle; error spotting letters, sentence improvement, phrase
rearrangement sequences and inequality/syllogism conclusions carry `lockedOrder`; all-number options are
sorted and locked, and evenly respaced around the key by a stem seed unless a distractor is a named trap, so
the key is not always the middle option). Every computed answer is asserted in the sources; puzzles were
brute-forced for unique solutions. The build warns when a stem without a stimulus matches, or uses the same
3+ numbers as, an item in any other India bank (none now; two clashes with the in-progress `sbipo` bank were
rewritten on my side). Reading passages (handloom weavers, QR payments for street vendors) were chosen after
finding the millets and urban-heat topics already used by ibpsclerk, sscchsl and ibpspo.

Shape: sections `eng` (30 in 20 min), `quant` (Numerical Ability, 35 in 20 min), `reason` (35 in 20 min), one
module each, `breakSeconds: 0`. Two mock tests, Test 2 held out, 9 drills (3 per section), 11 dashboard steps.
Free, no Premium gating. Screenshots still needed: `public/landing/sbiclerk-mobile.png`, `sbiclerk-desktop.png`
(+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  sbiclerk: 227,
```

## lib/v2/registry.ts
```ts
import { SBICLERK } from "./exams/sbiclerk";
// EXAMS_V2: add SBICLERK right after IBPSCLERK
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/sbiclerk";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `SBICLERK.domainLabels` (keys `sbiclerkReading`, `sbiclerkCloze`,
`sbiclerkGrammar`, `sbiclerkNumber`, `sbiclerkDI`, `sbiclerkArith`, `sbiclerkLogic`, `sbiclerkPuzzle`,
`sbiclerkVerbal`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). HUE DECISION: the brief's suggested
`205 75% 34%` breaks the 8-degree rule against cdlx (205 70% 38%), part107 (199 89% 36%), nclex (200 80% 36%)
and caplumb (212 88% 30%); the blue band 195 to 215 at 30 to 40% lightness has no free saturation above 45%.
I used the nearest clash-free value, `209 40% 34%` (steel bank blue, white-text contrast 7.5:1), matching
`SBICLERK.theme`. It is 9 degrees from the sbipo suggestion (218 70% 30%). A brighter alternative that also
passes is `205 75% 46%`, but white text on it is only about 4.0:1.
```css
  /* SBI Clerk theme: steel bank blue (v2 exam; matches lib/v2/exams/sbiclerk.ts theme) */
  [data-theme="sbiclerk"] {
    --brand: 209 40% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 209 40% 96%;
    --brand-hover: 209 40% 30%;
    --brand-dark: 209 40% 26%;
    --brand-darker: 209 35% 14%;
    --brand-muted: 209 20% 70%;
    --brand-border: 209 30% 82%;
    --brand-border-light: 209 30% 91%;
    --brand-gradient-to: 200 40% 96%;
  }
```

## lib/shareCards.ts
```ts
  "sbiclerk": {
    "color": "hsl(209, 40%, 34%)",
    "tint": "hsl(209, 40%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  sbiclerk: { title: "SBI Clerk Prelims Mock Test", description: "Practice English, numerical ability and reasoning in full 100-question mock tests with 20-minute sectional timing." },
```

## lib/shareImageUrl.ts and lib/tigerAssets.ts
Add `"sbiclerk"` wherever `"ibpsclerk"` is listed in `lib/shareImageUrl.ts`, and borrow the IBPS PO tiger in
`BORROWED_SETS` (`lib/tigerAssets.ts`):
```ts
  sbiclerk: "ibpspo",
```

## lib/region.ts
```ts
// TEST_REGIONS
  sbiclerk: "IN",
```
Add `"sbiclerk"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  sbiclerk: "Mock tests for the SBI Clerk (Junior Associates) Preliminary exam: 100 questions in 60 minutes with sectional timing across English Language, Numerical Ability and Reasoning Ability, with negative marking explained.",
// EXAM_ORG
  sbiclerk: "State Bank of India · Junior Associates Preliminary Examination",
// SEARCH_ALIASES
  sbiclerk: "sbi clerk mock test sbi clerk prelims sbi junior associate customer support and sales sbi ja bank clerk exam state bank of india recruitment bank exam india reasoning puzzles seating arrangement simplification approximation number series data interpretation english cloze sarkari exam government job",
```
Hub group "India government job exams": add after `ibpsclerk`:
```ts
  ..., "ibpspo", "ibpsclerk", "sbiclerk", "ctet"] },
```
(If `sbipo` and `ibpsrrb` land in the same wave, a bank order of `ibpspo, sbipo, ibpsclerk, sbiclerk, ibpsrrb` reads well.)
RELATED_OVERRIDES, if the group needs one: `sbiclerk: ["ibpsclerk", "ibpspo", "ssccgl"]`. Remove the words
"sbi clerk" from the `ibpsclerk` SEARCH_ALIASES line so search sends SBI queries here.

## lib/examFacts.ts
```ts
  sbiclerk: {
    answer:
      "The SBI Clerk (Junior Associates) Preliminary Examination is one online objective test of 100 questions for 100 marks in one hour, with each section timed separately: English Language 30 questions in 20 minutes, Numerical Ability 35 in 20 minutes and Reasoning Ability 35 in 20 minutes. A quarter of a question's marks is deducted for each wrong answer. There are no minimum qualifying marks for any section or for the total: SBI shortlists about ten times the vacancies in each category for the Main exam by aggregate marks, and only Main exam marks count in the final merit list. The 2026 advertisement set the Prelims tentatively for September 2026.",
    rows: [
      { label: "Questions", value: "100 (five options each in past papers)" },
      { label: "Time", value: "1 hour, 20 minutes per section" },
      { label: "Sections", value: "English 30, Numerical Ability 35, Reasoning Ability 35" },
      { label: "Marks", value: "1 per question, 100 in all" },
      { label: "Negative marking", value: "1/4 mark per wrong answer" },
      { label: "Result", value: "No sectional cutoff; about 10 times the vacancies called to the Mains by total marks" },
      { label: "Given by", value: "State Bank of India (CRPD), online" },
      { label: "Medium", value: "English test in English; the others in English, Hindi and, in many states, the state's language" },
    ],
    basedOn: "SBI's Recruitment of Junior Associates (Customer Support & Sales) advertisement CRPD/CR/2026-27/17 (registration 11 to 31 August 2026), section 4, Selection Procedure",
    source: { name: "State Bank of India Careers", url: "https://sbi.bank.in/web/careers/current-openings" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  sbiclerk: "a bank exam coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"sbiclerk"` (bank exam coaching institutes).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section, after IBPS Clerk:
```md
- **SBI Clerk** (`/sbi-clerk`, landing `/sbi-clerk-prelims-practice-test`, `[data-theme="sbiclerk"]` steel bank blue, borrows the IBPS PO tiger, region IN, hub group "India government job exams"): State Bank of India Junior Associates (Customer Support & Sales) Preliminary Examination on advertisement CRPD/CR/2026-27/17 (registration 11 to 31 August 2026, Prelims tentatively September 2026; guides report 26 and 27 September): 100 questions, 100 marks, 1 hour, each test separately timed (English Language 30 in 20 min, Numerical Ability 35 in 20 min, Reasoning Ability 35 in 20 min), a quarter mark off per wrong answer, and, unlike IBPS, no minimum qualifying marks for any section or the aggregate (about 10 times the vacancies in each category called to the Mains by total marks; Mains marks alone make the merit list). Three sections (`eng`, `quant`, `reason`), each one timed module. Two 100-item mock tests, Test 2 held out, 9 drills, three per section (`sbiclerkReading`, `sbiclerkCloze`, `sbiclerkGrammar`, `sbiclerkNumber`, `sbiclerkDI`, `sbiclerkArith`, `sbiclerkLogic`, `sbiclerkPuzzle`, `sbiclerkVerbal`; 10/10/10, 15/10/10, 8/15/12 per test, 3 drill-only each), so the dashboard is 11 steps. Bank `data/v2/sbiclerk/questions.json` (227 original five-option single-answer items, prefix `SBICLK-`, object form with 17 stimuli) built by `python3 -I tools/next100/sbiclerk/build.py` (answers asserted, puzzles brute-forced, all-number options respaced so the key is not always central; warns on stems or number sets shared with any other India bank). English only, though Numerical and Reasoning are also offered in Hindi and state languages (the landing says so). Score out of 100 with no negative marking; penalty and the no-cutoff shortlist in `scoreNote` and on the landing. Sources in `tools/next100/sbiclerk/sources.md`.
```
