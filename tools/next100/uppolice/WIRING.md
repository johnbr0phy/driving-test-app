# UP Police Constable (`uppolice`) wiring for the integrator

v2 exam, template `rrbntpc`. Files written (unique to this exam): `tools/next100/uppolice/*` (8 domain sources as
Python data, `build.py`, `sources.md`, this file), `data/v2/uppolice/questions.json` (plain array, 232 items, prefix
`UPPOLICE-`), `lib/v2/exams/uppolice.ts` (export `UPPOLICE`), `lib/v2/banks/uppolice.ts` (`plainBank`),
`app/up-police-constable/*` (layout, root redirect, dashboard, practice/[n], stats, test/[id], test/[id]/results;
copied from `app/rrb-ntpc/`), `app/up-police-constable-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/uppolice/build.py`, then
`python3 -I tools/validate_v2_bank.py uppolice '{"1": {"paper": {"1": 100}}, "2": {"paper": {"1": 100}}}'`
(232 questions, 0 stimuli, 0 problems; key strictly longest 44/232 = 19%; the conclusion and assumption items
are in natural order with `lockedOrder`). The validator also writes the
`lib/v2/bankSizes.ts` line below; I ran a copy that skips that write, so add it by hand.

Shape: one section `paper`, one module of 100 items in 80 minutes (the real 150 in 120 at the same pace), items grouped
GK, Hindi, Numerical, Reasoning; two tests, Test 2 held out; 8 drills (one per domain), so the dashboard is 10 steps.
No Basics, no premium. Per test 15/10/13/12/15/10/13/12, 4 drill-only each.

Decisions to check:
- **General Hindi is written in Hindi** (stems and options in Devanagari, explanations in English with the Hindi
  terms), as on the real paper. 58 items (domains `uppHindiShabd`, `uppHindiVyakaran`). They are machine-free but
  have had no native-speaker review; worth a read by a Hindi speaker before launch.
- **Negative marking** is not confirmed from the board's own notice (reviewer tried uppbpb.gov.in on 2026-11-01: the
  notices PDFs there are in a legacy Hindi font or scanned, and the recruitment portal upcons2025.com is behind a
  Cloudflare challenge). Guides say 0.5 per wrong answer (of 2 marks), 0.25, or none for the 2025 recruitment. Copy
  says guides disagree and "check your own notification". No qualifying marks are stated anywhere.
- Hue 239 45% 30% (as in the config and globals.css) sits within 8 degrees of osslt (232 52% 42%, 12 points lighter), caguard (228 80% 30%, 35 points
  more saturated) and naplan7 (240 90% 44%); each differs enough by the CLAUDE.md rule.
- Overlap: rewritten against ssccgl, rrbntpc, ibpspo, ctet and the batch's rrbgroupd, sscgd, sscmts, jnvst as they
  stood on 2026-10-31 (any item with the same fact or numbers). Those batch banks were still changing, so re-run a
  stem comparison after the batch lands.
- Screenshots still needed: `public/landing/uppolice-mobile.png`, `uppolice-desktop.png` (+ dark).

## lib/v2/bankSizes.ts
```ts
  uppolice: 232,
```

## lib/v2/registry.ts
```ts
import { UPPOLICE } from "./exams/uppolice";
// EXAMS_V2: add UPPOLICE with the other India government job exams
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ SSCCGL, RRBNTPC, /* ... */ UPPOLICE, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/uppolice";          // classQuestions.ts
import '@/lib/v2/banks/uppolice';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `UPPOLICE.domainLabels` (keys `uppIndia`, `uppState`, `uppHindiShabd`,
`uppHindiVyakaran`, `uppArith`, `uppNumber`, `uppVerbal`, `uppLogical`).

## app/globals.css
Light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint (it lifts the 30% brand to 50%).
```css
  /* UP Police Constable theme: police navy indigo (v2 exam; matches lib/v2/exams/uppolice.ts theme) */
  [data-theme="uppolice"] {
    --brand: 239 45% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 239 45% 96%;
    --brand-hover: 239 45% 26%;
    --brand-dark: 239 45% 24%;
    --brand-darker: 239 40% 16%;
    --brand-muted: 239 25% 72%;
    --brand-border: 239 30% 80%;
    --brand-border-light: 239 30% 90%;
    --brand-gradient-to: 220 45% 96%;
  }
```

## lib/shareCards.ts
```ts
  "uppolice": {
    "color": "hsl(239, 45%, 30%)",
    "tint": "hsl(239, 45%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  uppolice: { title: "UP Police Constable Mock Test", description: "Practice GK, General Hindi, Numerical Ability and Reasoning in 100-question mock tests at the real exam's pace, with every answer explained." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  uppolice: "IN",
// NON_DRIVING_TESTS: add
  "uppolice",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  uppolice: "Mock tests for the UP Police Constable written exam: General Knowledge (India, Uttar Pradesh, police and law), General Hindi in Hindi, Numerical and Mental Ability, and Reasoning, at the real exam's pace, with negative marking explained.",
// EXAM_ORG
  uppolice: "UPPRPB · Constable Civil Police written exam",
// SEARCH_ALIASES
  uppolice: "up police constable mock test up police mock test upp constable uppbpb upprpb uttar pradesh police bharti sipahi aarakshi police constable exam up police gk hindi reasoning practice set free sarkari exam government job exam india",
// RELATED_OVERRIDES (if the group would otherwise be thin)
  uppolice: ["ssccgl", "rrbntpc", "ibpspo"],
```
Hub group "India government job exams": add `"uppolice"`:
```ts
  { title: "India government job exams", ids: ["ssccgl", "rrbntpc", "ibpspo", "ctet", /* batch ids */ "uppolice"] },
```

## lib/examFacts.ts
```ts
  uppolice: {
    answer:
      "The UP Police Constable written exam is set by the Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) for Constable Civil Police and equivalent posts. It has 150 objective questions worth 2 marks each, 300 marks in all, in 2 hours: General Knowledge 38, General Hindi 37, Numerical and Mental Ability 38, and Mental Aptitude, IQ and Reasoning 37. Guides disagree on negative marking (0.5 or 0.25 mark per wrong answer, or none); check the notification. The latest recruitment, Advt. 07/2025 for 32,679 posts, held its written exam on 8 to 10 June 2026; candidates who clear it go on to document verification and physical tests.",
    rows: [
      { label: "Questions", value: "150 objective (2 marks each, 300 marks)" },
      { label: "Time", value: "2 hours" },
      { label: "Subjects", value: "GK 38, General Hindi 37, Numerical Ability 38, Reasoning 37" },
      { label: "Negative marking", value: "Not confirmed: guides report 0.5, 0.25 or none; check your notice" },
      { label: "Latest exam", value: "8 to 10 June 2026 (Advt. 07/2025, 32,679 posts)" },
      { label: "Next stages", value: "Document verification and physical tests" },
      { label: "Given by", value: "UP Police Recruitment and Promotion Board (UPPRPB)" },
    ],
    basedOn: "the UPPRPB constable recruitment of 2025 (Advt. 07/2025) as reported by exam guides, checked October 2026",
    source: { name: "UP Police Recruitment and Promotion Board", url: "https://uppbpb.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  uppolice: "a UP Police coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"uppolice"` (coaching institutes run constable batches).

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section with the other India exams:
```md
- **UP Police Constable** (`/up-police-constable`, landing `/up-police-constable-practice-test`, `[data-theme="uppolice"]` police navy, region IN, hub group "India government job exams"): the UPPRPB Constable Civil Police written exam (latest: Advt. 07/2025, 32,679 posts, exam 8 to 10 June 2026; 150 questions, 300 marks, 2 hours: GK 38, General Hindi 37, Numerical and Mental Ability 38, Reasoning 37; negative marking unconfirmed (guides say 0.5, 0.25 or none), explained, not scored). Modelled at 100 questions in 80 minutes (the real pace, 25 per subject, one module grouped GK, Hindi, Numerical, Reasoning), two tests with Test 2 held out, 8 drills (`uppIndia`, `uppState` (Uttar Pradesh, police and law), `uppHindiShabd`, `uppHindiVyakaran`, `uppArith`, `uppNumber`, `uppVerbal`, `uppLogical`; 15/10/13/12/15/10/13/12 per test, 4 drill-only each), so the dashboard is 10 steps. General Hindi items are in Hindi (Devanagari) with English explanations. Bank `data/v2/uppolice/questions.json` (232 original single-answer items, prefix `UPPOLICE-`) built by `python3 -I tools/next100/uppolice/build.py`. GK is static facts only; reasoning is text only; Hindi passage and letter items are not modelled. Sources in `tools/next100/uppolice/sources.md`.
```
