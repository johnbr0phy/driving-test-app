# SSC CPO Paper-I (`ssccpo`) wiring for the integrator

v2 exam, template `ssccgl` (sectioned like `sscchsl`). Files already written (unique to this exam):
`tools/next100/ssccpo/*` (8 domain sources as Python data, `stimuli.json` with 2 cloze and 2 reading passages,
`build.py`, `sources.md`, this file), `data/v2/ssccpo/questions.json` (object form `{ stimuli, questions }`),
`lib/v2/exams/ssccpo.ts` (export `SSCCPO`), `lib/v2/banks/ssccpo.ts` (`withStimuli`), `app/ssc-cpo/*` (layout,
root redirect, dashboard, practice/[n], stats, test/[id], test/[id]/results; copied from `app/ssc-chsl/`),
`app/ssc-cpo-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/ssccpo/build.py`, then
`python3 -I tools/validate_v2_bank.py ssccpo '{"1": {"gi": {"1": 25}, "ga": {"1": 25}, "qa": {"1": 25}, "eng": {"1": 25}}, "2": {"gi": {"1": 25}, "ga": {"1": 25}, "qa": {"1": 25}, "eng": {"1": 25}}}'`
(passes: 232 questions, 4 stimuli, 0 problems; key strictly longest 36/232 = 16%; 64 all-number items sorted
ascending and locked, key in an end slot 34/64 = 53%). The validator was run from a copy that does not write
`lib/v2/bankSizes.ts`; add the line below. Positional items (spot the error, sentence improvement, conclusion
sets) and all-number options get `lockedOrder: true` from the build. Do not add `ssccpo` to
`tools/build_v2_bank.py` PLANS: it has its own build.

Shape: the SSC CPO 2026 notice (para 12.1) changed Paper-I to 100 questions in 1 hour with a 15-minute sectional
timer per part (it was 200 in 2 hours), so the mocks are full length: four sections `gi`, `ga`, `qa`, `eng` in the
notice's order, each one module of 25 in 15 minutes, `breakSeconds: 0`. Two mock tests, Test 2 held out, 8 drills
(2 per section, 13/12 per test, 4 drill-only items each), 10 dashboard steps. No Premium gating. Paper-II is not
modelled.

Screenshots still needed: `public/landing/ssccpo-mobile.png`, `ssccpo-desktop.png` (+ `-dark`), e.g.
`ssccpo:ssc-cpo:v2:logic`.

## lib/v2/bankSizes.ts
```ts
  ssccpo: 232,
```

## lib/v2/registry.ts
```ts
import { SSCCPO } from "./exams/ssccpo";
// EXAMS_V2: add SSCCPO after SSCCHSL (or after the last SSC exam)
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/ssccpo";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `SSCCPO.domainLabels` (keys `ssccpoVerbal`, `ssccpoLogic`, `ssccpoHistory`,
`ssccpoScience`, `ssccpoArith`, `ssccpoAdvanced`, `ssccpoGrammar`, `ssccpoVocab`).

## app/globals.css
Light block (then run `tools/gen_dark_brand_css.py` for the `.dark` tint). The brief suggested 262 40% 36%, which is
7 degrees and only 6 points of lightness from `aurcg` (269 40% 30%), so I moved lightness to 38% (8 points from aurcg).
Nearby: secplus 260 55% 48% and ged 265 55% 44% (15 points of saturation away), psm 264 90%, ssccgl 268 80%,
vicsel 256 90%, capm 256 60% 28%. Matches `SSCCPO.theme`.
```css
  /* SSC CPO theme: muted police violet (v2 exam; matches lib/v2/exams/ssccpo.ts theme) */
  [data-theme="ssccpo"] {
    --brand: 262 40% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 262 40% 96%;
    --brand-hover: 262 40% 33%;
    --brand-dark: 262 40% 29%;
    --brand-darker: 262 35% 16%;
    --brand-muted: 262 25% 72%;
    --brand-border: 262 30% 80%;
    --brand-border-light: 262 30% 90%;
    --brand-gradient-to: 272 40% 96%;
  }
```

## lib/shareCards.ts
```ts
  "ssccpo": {
    "color": "hsl(262, 40%, 38%)",
    "tint": "hsl(262, 40%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  ssccpo: { title: "SSC CPO Mock Test", description: "Practice reasoning, general knowledge, maths and English in full 100-question SSC CPO Paper-I mock tests, timed 15 minutes per part." },
```

## lib/tigerAssets.ts
`BORROWED_SETS`: borrow the SSC CGL tiger like the other SSC exams.
```ts
  ssccpo: "ssccgl",
```

## lib/region.ts
```ts
// TEST_REGIONS
  ssccpo: "IN",
```
Add `"ssccpo"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  ssccpo: "Mock tests for SSC CPO Paper-I, the Sub-Inspector exam for Delhi Police and the CAPFs: 100 questions in 60 minutes on the 2026 pattern, timed 15 minutes per part, with negative marking explained.",
// EXAM_ORG
  ssccpo: "Staff Selection Commission · Sub-Inspector in Delhi Police and CAPFs",
// SEARCH_ALIASES
  ssccpo: "ssc cpo mock test ssc cpo paper 1 sub inspector si delhi police si capf si bsf crpf cisf itbp ssb si exam ssc cpo new pattern 2026 100 questions sectional timing police officer exam india reasoning gk maths english",
```
Hub group: add `"ssccpo"` to "India government job exams" after the other SSC exams (`ssccgl`, `sscchsl`, `sscmts`, `sscgd`).

## lib/examFacts.ts
```ts
  ssccpo: {
    answer:
      "SSC CPO Paper-I is the first stage of the Staff Selection Commission's Sub-Inspector in Delhi Police and Central Armed Police Forces exam. From the 2026 notice it is a computer-based test of 100 multiple-choice questions in 1 hour, four parts of 25 (General Intelligence and Reasoning, General Knowledge and General Awareness, Quantitative Aptitude, English Comprehension), each with its own 15-minute timer. Each question carries 1 mark and a wrong answer loses 0.25. Paper-I shortlists candidates for the physical tests; the final merit list is made from Paper-II.",
    rows: [
      { label: "Questions", value: "100 (25 in each of four parts)" },
      { label: "Time", value: "1 hour, 15 minutes per part" },
      { label: "Marks", value: "1 per right answer, 100 in all" },
      { label: "Negative marking", value: "0.25 per wrong answer (0.50 in Paper-II)" },
      { label: "Parts", value: "Reasoning, General Knowledge, Quantitative Aptitude, English" },
      { label: "Qualifying marks", value: "30% UR, 25% OBC/EWS, 20% others" },
      { label: "Languages", value: "Hindi and English (English part in English)" },
      { label: "Given by", value: "Staff Selection Commission, computer-based" },
    ],
    basedOn: "the SSC notice for the Sub-Inspector in Delhi Police and Central Armed Police Forces Examination, 2026 (10 September 2026), paragraphs 12 and 16",
    source: { name: "Staff Selection Commission", url: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_capf_2026.pdf" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES` (the landing already calls `classFaqJsonLd("ssccpo")` and renders `<ExamClassFaq examId="ssccpo" />`):
```ts
  ssccpo: "an SSC CPO coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"ssccpo"`.

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section after SSC CHSL (or the last SSC bullet):
```md
- **SSC CPO** (`/ssc-cpo`, landing `/ssc-cpo-practice-test`, `[data-theme="ssccpo"]` muted police violet, borrows the SSC CGL tiger, region IN, hub group "India government job exams"): Staff Selection Commission Sub-Inspector in Delhi Police and Central Armed Police Forces exam, Paper-I on the 2026 notice (10 September 2026; guides report Paper-I on 20 to 28 November 2026), which cut it from 200 questions in 2 hours to 100 questions, 1 mark each, in 1 hour with a sectional timer of 15 minutes for each of four parts of 25 (General Intelligence and Reasoning, General Knowledge and General Awareness, Quantitative Aptitude, English Comprehension), 0.25 off per wrong answer (0.50 in Paper-II), minimum qualifying marks UR 30%, OBC/EWS 25%, others 20%; Paper-I shortlists for PST/PET and final merit comes from Paper-II (not modelled). Four sections `gi`, `ga`, `qa`, `eng` in the notice's order, each one 25-item, 15-minute module, two full-length mock tests, Test 2 held out, 8 drills, two per part (`ssccpoVerbal`, `ssccpoLogic`, `ssccpoHistory` (with India's neighbours, named in the syllabus), `ssccpoScience`, `ssccpoArith`, `ssccpoAdvanced`, `ssccpoGrammar`, `ssccpoVocab`; 13/12 per part per test, 4 drill-only each), so the dashboard is 10 steps. Bank `data/v2/ssccpo/questions.json` (232 original single-answer items, prefix `SSCCPO-`, object form with cloze stimuli `SSCCPO-CL1/2` and reading stimuli `SSCCPO-RC1/2`) built by `tools/next100/ssccpo/build.py` (all-number options sorted and locked); checked against the other India banks for repeated facts and numbers. Reasoning text only; GK static; rupees and Indian names. Percent score; negative marking explained in `scoreNote` and on the landing, not applied. Sources in `tools/next100/ssccpo/sources.md`.
```

## For the integrator to check
- Duplicates: reviewed 1 November 2026 against every India, US school and Philippines bank in the wave. 25 of
  this bank's items that repeated another bank's fact or numbers were rewritten here; the earlier `rpfconst`
  overlaps (Mudrarakshasa, Part II citizenship, ionosphere) are no longer in `rpfconst`, and the Satyashodhak and
  cousin items were rewritten on this side.
- Paper-I dates: the notice says "to be notified later"; 20 to 28 November 2026 is from guides and is labelled so.
