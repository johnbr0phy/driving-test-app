# AP Calculus AB (`apcalcab`) wiring for the integrator

v2 exam, built on the apbio template (own build script, one KaTeX bank, percent score) with two sections like
gcsehigher (a no-calculator part and a calculator part). Files already written (unique to this exam):
`tools/next100/apcalcab/*` (`build.py`; sources as Python data, one file per unit: `u1_limits.py`,
`u2_derivatives.py`, `u3_composite.py`, `u4_contextual.py`, `u5_analytical.py`, `u6_integration.py`,
`u7_diffeq.py`, `u8_applications.py`; `sources.md`), `data/v2/apcalcab/questions.json` (plain array,
215 questions, no stimuli), `lib/v2/exams/apcalcab.ts` (export `APCALCAB`), `lib/v2/banks/apcalcab.ts`
(`plainBank`), `app/ap-calculus-ab/*` (layout, root redirect, dashboard, practice/[n], test/[id],
test/[id]/results, stats; copied from `app/ap-biology/`), `app/ap-calculus-ab-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/apcalcab/build.py` (no third-party packages; it recomputes every answer
numerically and exits non-zero on any problem), then (from a copy, since the validator rewrites bankSizes)
```
python3 -I tools/validate_v2_bank.py apcalcab '{"1": {"nocalc": {"1": 29}, "calc": {"1": 13}}, "2": {"nocalc": {"1": 29}, "calc": {"1": 13}}}'
```
(passes: 215 questions, 0 stimuli, 0 problems). Do not add `apcalcab` to `tools/build_v2_bank.py` PLANS.

Shape: the real Section I at the May 2027 length and pace, as two sections: `nocalc` (Part A, 29 questions,
62 minutes, no calculator) and `calc` (Part B, 13 questions, 38 minutes, `calculator: true`), no break
(`breakSeconds: 0`). Two tests, Test 2 held out, 8 drills (one per unit, all `section: "nocalc"`, 20 questions
each: Test 1's Part A items plus 14 to 18 drill-only items), so 8 + 2 = 10 dashboard steps. Per test by unit
5/5/3/5/7/8/3/6 (Part A 4/4/3/3/5/6/2/2, Part B 1/1/0/2/2/2/1/4). All items `single` with four options;
all-number options sorted and locked (134 items, key in an end slot 54%). Key strictly longest: 15/81 = 19%
(numeric items excluded). No Premium, no Basics, no reference sheet (the real exam has none).
Screenshots still needed: `public/landing/apcalcab-mobile.png`, `apcalcab-desktop.png` (+ `-dark`).

Calculator note: Tigertest's calculator is scientific and works in degrees. Part B items were written to need
only exponentials, logarithms, roots and arithmetic (no radian trigonometry, no numerical integration); the
config directions, `scoreNote` and landing FAQ say the real Part B needs a graphing calculator. If a Desmos
drawer ever replaces `components/v2/Calculator.tsx`, harder Part B items could be added.

## lib/v2/bankSizes.ts
```ts
  apcalcab: 215,
```

## lib/v2/registry.ts
```ts
import { APCALCAB } from "./exams/apcalcab";
// EXAMS_V2: after APBIO
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the apbio (or aplang) bank import:
```ts
import "@/lib/v2/banks/apcalcab";      // classQuestions.ts
import '@/lib/v2/banks/apcalcab';      // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: domain labels live in `APCALCAB.domainLabels` (keys `apcalcabLimits`, `apcalcabDerivatives`,
`apcalcabComposite`, `apcalcabContextual`, `apcalcabAnalytical`, `apcalcabIntegration`, `apcalcabDiffEq`,
`apcalcabApplications`).

## app/globals.css
HUE CHECK: the brief's `210 35% 36%` clashes with sbiclerk (`209 40% 34%`: hue 1, saturation 5, lightness 2)
and caauto (`205 22% 34%`: hue 5, saturation 13, lightness 2). I used `211 40% 42%` in `lib/v2/exams/apcalcab.ts`:
lightness 8 from sbiclerk, saturation 15 from nda (`213 25% 44%`), hue 9 from realestate (`200 45% 36%`) and
nzroad/sie (204); checked against every theme in globals.css on 1 November 2026, not against the rest of batch 4
(ugcnet's suggested `240 25% 40%` is 29 degrees away). Run `tools/gen_dark_brand_css.py` after.
```css
  /* AP Calculus AB theme: slate blue (v2 exam; matches lib/v2/exams/apcalcab.ts theme) */
  [data-theme="apcalcab"] {
    --brand: 211 40% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 211 50% 96%;
    --brand-hover: 211 40% 37%;
    --brand-dark: 211 40% 32%;
    --brand-darker: 211 40% 22%;
    --brand-muted: 211 25% 72%;
    --brand-border: 211 30% 80%;
    --brand-border-light: 211 30% 90%;
    --brand-gradient-to: 223 45% 96%;
  }
```

## lib/shareCardCopy.ts and lib/shareImageUrl.ts
```ts
  apcalcab: { title: "AP Calculus AB Practice Test", description: "Two full 42-question AP Calculus AB multiple-choice sections, with and without a calculator, plus a drill for every unit." },
```
Add `"apcalcab"` to `SHARE_COPY_IDS` in `lib/shareImageUrl.ts` (as apbio is).

## lib/region.ts
US is the default in `regionOfTest()`. apworld and aplang are listed in `NON_DRIVING_TESTS`; if that is how the
wave places US school exams on the country pages, add `"apcalcab"` beside them:
```ts
  "apworld", "aplang", "apcalcab",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  apcalcab: "Two full AP Calculus AB multiple-choice sections at the May 2027 length: 29 questions in 62 minutes without a calculator, then 13 in 38 minutes with one, all eight units weighted like the real exam.",
// EXAM_ORG
  apcalcab: "College Board · AP Calculus AB, CED with the changes for May 2027",
// SEARCH_ALIASES
  apcalcab: "ap calculus ab ap calc ab ap calc ap calculus advanced placement calculus college board ap exam math mcq multiple choice limits continuity derivatives chain rule implicit differentiation related rates l'hospital mean value theorem extrema optimization integrals riemann sums fundamental theorem of calculus u substitution differential equations slope fields area volume high school",
// RELATED_OVERRIDES
  apcalcab: ["apbio", "sat", "act", "psat"],
```
Hub group: add to "AP exams":
```ts
  { title: "AP exams", ids: ["appsych", "apush", "apworld", "aplang", "apbio", "apcalcab"] },
```

## lib/examFacts.ts
```ts
  apcalcab: {
    answer:
      "The AP Calculus AB Exam is a 3 hour 10 minute exam from the College Board, given in May. From May 2027, Section I has 42 multiple-choice questions with four choices in 1 hour 40 minutes (50% of the score): Part A, 29 questions in 62 minutes with no calculator, and Part B, 13 questions in 38 minutes with a graphing calculator required. Section II has 6 free-response questions in 90 minutes (50%). The exam is hybrid digital: multiple choice in the Bluebook app, which has a built-in Desmos graphing calculator for the calculator parts, and free responses handwritten. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "42 questions, 1 hr 40 min, 50% of score" },
      { label: "Part A", value: "29 questions, 62 minutes, no calculator" },
      { label: "Part B", value: "13 questions, 38 minutes, graphing calculator required" },
      { label: "Free response", value: "6 questions, 90 minutes, 50%" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Units", value: "8, from 5-10% (Differential Equations) to 15-20% (Integration)" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
    ],
    basedOn: "the College Board AP Calculus AB exam page and Course and Exam Description with the clarifications for fall 2026 (May 2027 exam)",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-calculus-ab/exam" },
    tigertest:
      "Tigertest has two full 42-question AP Calculus AB multiple-choice sections and eight drills, one per unit, all free with no account required. The free-response section is not included.",
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, after `apbio`:
```ts
  apcalcab: "AP Calculus AB",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"apcalcab"` after `"apbio"` (an AP class teacher sets it).

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger). Optionally borrow a maths set (`timestables` or `ged`)
through `BORROWED_SETS`.

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the AP Biology bullet in the v2 section:
```md
- **AP Calculus AB** (`/ap-calculus-ab`, landing `/ap-calculus-ab-practice-test`, `[data-theme="apcalcab"]` slate blue, region US, hub group "AP exams"): the College Board exam at the May 2027 length (the CED clarifications for fall 2026 changed Section I to 42 multiple-choice questions in 1 hour 40 minutes, 50% of the score: Part A 29 in 62 minutes with no calculator, Part B 13 in 38 minutes with a graphing calculator required; it was 30 in 60 and 15 in 45). Free response not modelled. Two sections, `nocalc` (Part A) and `calc` (Part B, `calculator: true`), no break, two tests with Test 2 held out, 8 drills, one per unit (`apcalcabLimits`, `apcalcabDerivatives`, `apcalcabComposite`, `apcalcabContextual`, `apcalcabAnalytical`, `apcalcabIntegration`, `apcalcabDiffEq`, `apcalcabApplications`; 5/5/3/5/7/8/3/6 per test inside the CED AB unit weightings, Part B 1/1/0/2/2/2/1/4), all drills from Part A (drills have no calculator), 20 questions each, 10 dashboard steps, free, no Basics. Tigertest's calculator is scientific and in degrees, so Part B items need only exponentials, logarithms and arithmetic; `scoreNote` and the landing say the real Part B needs a graphing calculator. KaTeX throughout; all-number options sorted and locked. Bank `data/v2/apcalcab/questions.json` (215 original items, plain array, ids `APCALCAB-T<n>-NNN`, Part A first, and `APCALCAB-D-NNN`) built by `python3 -I tools/next100/apcalcab/build.py` from one Python source per unit; the build recomputes every answer numerically (derivatives, integrals, limits, an RK4 solver) and fails if a key or distractor is wrong. Sources in `tools/next100/apcalcab/sources.md`.
```
