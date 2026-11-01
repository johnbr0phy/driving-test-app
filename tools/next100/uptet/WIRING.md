# UPTET Paper 1 (`uptet`) wiring for the integrator

v2 exam, template `ctet`. Files written (unique to this exam): `tools/next100/uptet/*` (9 domain sources as Python data,
`stimuli.json` with 3 Hindi and 3 English passages, `build.py`, `sources.md`, this file), `data/v2/uptet/questions.json`
(object form `{stimuli, questions}`, 200 items, prefix `UPTET-`), `lib/v2/exams/uptet.ts` (export `UPTET`),
`lib/v2/banks/uptet.ts` (`withStimuli`), `app/uptet/*` (layout, root redirect, dashboard, practice/[n], stats, test/[id],
test/[id]/results; copied from `app/ctet/`), `app/uptet-paper-1-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/uptet/build.py`, then validate (from a copy that does not write bankSizes):
`python3 -I tools/validate_v2_bank.py uptet '{"1": {"cdp": {"1": 12}, "hindi": {"1": 12}, "english": {"1": 12}, "maths": {"1": 12}, "evs": {"1": 12}}, "2": {"cdp": {"1": 12}, "hindi": {"1": 12}, "english": {"1": 12}, "maths": {"1": 12}, "evs": {"1": 12}}}'`
(200 questions, 6 stimuli, 0 problems; key strictly longest 24/197 singles = 12%; 22 all-number items sorted and
`lockedOrder`, key in an end slot 12 of 22 = 55%; 3 typed numeric maths items).

Shape: five sections in paper order (`cdp`, `hindi`, `english`, `maths`, `evs`), each one module of 12 items in 12
minutes (the real 30 per section at the real pace of one minute per question), 60 in 60 minutes, no break; two tests,
Test 2 held out; 9 drills (one per domain), so the dashboard is 11 steps. No Basics, no premium.
Per test: uptetDev 6, uptetLearn 6 | uptetHindi 8 (4 on a passage), uptetHindiPed 4 | uptetEnglish 12 (4 on a passage,
4 grammar, 4 pedagogy) | uptetMaths 8, uptetMathsPed 4 | uptetEvs 8, uptetEvsPed 4. Drill-only: 10/10/8/10/6/8/10/8/10.

Decisions to check:
- **Language II is modelled as English** (the real paper lets candidates pick English, Urdu or Sanskrit); the landing,
  config directions and FAQ say so. Language I is Hindi for everyone.
- **Hindi items are in Hindi** (stems and options in Devanagari, explanations in English with the Hindi terms), as in
  `uppolice`: 24 Hindi-content items (grammar, three original passages) and 18 Hindi-pedagogy items. No native-speaker
  review yet; worth a read by a Hindi speaker.
- **Facts checked against the information booklet** (review, 2026-11-01): upessc.up.gov.in still refused connections
  and updeled.gov.in's TET page says the schedule is closed, but the commission's 32-page UPTET 2026 information booklet
  (Adv. No. 01/UPTET/2026) was read from a copy hosted by an exam blog (see sources.md). It confirms the pattern (150
  four-option MCQs, 150 minutes, five compulsory sections of 30, no negative marking, Hindi and English medium except
  the language papers), the dates (published 20 March 2026, registration 27 March to 26 April 2026, exam 2, 3 and 4 July
  2026), the qualifying marks (90/150 general, 82/150 reserved) and lifetime validity. The result date (26 August 2026)
  is from the Careers360 result report.
- **Hue** 160 30% 32% (as suggested). Near themes: phlet 160 25% 40% (8 points lighter, passes), pnc 160 50% 30%
  (20 points more saturated), vtne 158 60% 32%, hscmaths 168 38% 30% (exactly 8 degrees away with 8 points of saturation;
  borderline). The integrator owns the final hue; change it in `lib/v2/exams/uptet.ts` and the CSS block together.
- **Overlap**: compared on 2026-11-01 against every bank in `data/v2` plus the India and Philippine v1 banks; about 40 items
  that repeated a fact and answer were rewritten, most of them against the sibling `reet` bank (same CTET template, written
  in parallel). Review pass (2026-11-01) re-ran the comparison against every family bank, including the current `reet` and `aissee`, and rewrote 14 more items (see sources.md).
- Tiger: borrows the CTET tiger (line below).
- Screenshots still needed: `public/landing/uptet-mobile.png`, `uptet-desktop.png` (+ dark).

## lib/v2/bankSizes.ts
```ts
  uptet: 200,
```

## lib/v2/registry.ts
```ts
import { UPTET } from "./exams/uptet";
// EXAMS_V2: add UPTET next to CTET
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ CTET, UPTET, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/uptet";          // classQuestions.ts
import '@/lib/v2/banks/uptet';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `UPTET.domainLabels` (keys `uptetDev`, `uptetLearn`, `uptetHindi`, `uptetHindiPed`,
`uptetEnglish`, `uptetMaths`, `uptetMathsPed`, `uptetEvs`, `uptetEvsPed`).

## app/globals.css
Light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint.
```css
  /* UPTET Paper 1 theme: muted slate jade (v2 exam; matches lib/v2/exams/uptet.ts theme) */
  [data-theme="uptet"] {
    --brand: 160 30% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 160 30% 96%;
    --brand-hover: 160 30% 28%;
    --brand-dark: 160 30% 23%;
    --brand-darker: 160 26% 15%;
    --brand-muted: 160 18% 70%;
    --brand-border: 160 22% 80%;
    --brand-border-light: 160 22% 90%;
    --brand-gradient-to: 175 30% 96%;
  }
```

## lib/shareCards.ts
```ts
  "uptet": {
    "color": "hsl(160, 30%, 32%)",
    "tint": "hsl(160, 30%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  uptet: { title: "UPTET Paper 1 (Classes 1 to 5)", description: "Practise child development and pedagogy, Hindi, English, maths and EVS, with content and pedagogy questions." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  uptet: "IN",
// NON_DRIVING_TESTS: add
  "uptet",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  uptet: "Uttar Pradesh Teacher Eligibility Test, Paper 1 for Classes 1 to 5. Child Development and Pedagogy, Hindi in Hindi with an unseen passage, English, Mathematics and EVS, each with content and pedagogy questions, at the real paper's pace.",
// EXAM_ORG
  uptet: "UPESSC · UPTET Paper 1 (primary level)",
// SEARCH_ALIASES
  uptet: "uptet up tet uptet paper 1 uptet mock test uttar pradesh teacher eligibility test upessc updeled tet teacher eligibility test primary teacher cdp child development and pedagogy hindi pedagogy evs maths pedagogy super tet basic shiksha parishad sahayak adhyapak india",
// RELATED_OVERRIDES (if the group would otherwise be thin)
  uptet: ["ctet", "reet", "uppolice"],
```
Hub group "India government job exams": add `"uptet"` right after `"ctet"` (and next to `"reet"` if that lands):
```ts
  { title: "India government job exams", ids: [/* ..., */ "ctet", "uptet", /* ... */] },
```

## lib/examFacts.ts
```ts
  uptet: {
    answer:
      "UPTET Paper 1 is the Uttar Pradesh Teacher Eligibility Test for teachers of Classes 1 to 5, conducted since 2026 by the Uttar Pradesh Education Service Selection Commission (UPESSC). It has 150 one-mark multiple-choice questions in 2 hours 30 minutes, in five sections of 30: Child Development and Pedagogy, Language I (Hindi), Language II (English, Urdu or Sanskrit), Mathematics and Environmental Studies. There is no negative marking. The qualifying mark is 90 of 150 (60 percent) for general candidates and 82 of 150 (55 percent) for SC, ST, OBC, EWS, dependants of freedom fighters, ex-servicemen and candidates with disabilities. The 2026 test (Advertisement No. 01/UPTET/2026, published 20 March 2026) was held on OMR sheets on 2 to 4 July 2026, with results on 26 August 2026.",
    rows: [
      { label: "Questions", value: "150 MCQs, 1 mark each" },
      { label: "Time", value: "2 hours 30 minutes" },
      { label: "Sections", value: "CDP, Hindi, Language II, Maths, EVS (30 each)" },
      { label: "Language II", value: "English, Urdu or Sanskrit" },
      { label: "Negative marking", value: "None" },
      { label: "Qualifying mark", value: "90/150 (60%) general, 82/150 (55%) reserved" },
      { label: "Latest test", value: "2 to 4 July 2026 (OMR); result 26 August 2026" },
      { label: "Certificate", value: "Valid for life (UP government order, June 2021)" },
      { label: "Conducted by", value: "UP Education Service Selection Commission (UPESSC)" },
    ],
    basedOn: "the UPESSC UPTET 2026 information booklet (Adv. No. 01/UPTET/2026) and the August 2026 result reports, checked November 2026",
    source: { name: "UPESSC", url: "https://upessc.up.gov.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  uptet: "a UPTET or D.El.Ed coaching class",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"uptet"` (D.El.Ed colleges and TET coaching batches set it).

## lib/tigerAssets.ts
In `BORROWED_SETS`:
```ts
  uptet: "ctet",
```

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section after the CTET bullet:
```md
- **UPTET** (`/uptet`, landing `/uptet-paper-1-practice-test`, `[data-theme="uptet"]` muted slate jade, borrows the CTET tiger, region IN, hub group "India government job exams"): Uttar Pradesh Teacher Eligibility Test Paper 1 (Classes 1 to 5), conducted since 2026 by UPESSC (2026 test 2 to 4 July 2026 on OMR, result 26 August 2026; per the 2026 information booklet: 150 one-mark MCQs in 2.5 hours, five sections of 30, CDP, Language I Hindi, Language II English/Urdu/Sanskrit, Maths, EVS, no negative marking, qualifying 90/150 general and 82/150 reserved per the 2026 information booklet). Modelled with all five sections, Language II as English, each 12 questions in 12 minutes (60 in 60, the real pace), two tests with Test 2 held out, 9 drills (`uptetDev`, `uptetLearn`, `uptetHindi`, `uptetHindiPed`, `uptetEnglish`, `uptetMaths`, `uptetMathsPed`, `uptetEvs`, `uptetEvsPed`; 6/6, 8/4, 12, 8/4, 8/4 per test), 11 dashboard steps. Hindi items are in Hindi with English explanations; three Hindi and three English original passages as stimuli (`UPTET-H1/H2/HD`, `UPTET-E1/E2/ED`). Bank `data/v2/uptet/questions.json` (200 original items, prefix `UPTET-`, object form) built by `python3 -I tools/next100/uptet/build.py` (key first; all-number options sorted and locked). Kept clear of the ctet and reet banks. Sources in `tools/next100/uptet/sources.md`.
```
