# JAMB UTME Mathematics (`jambmath`) wiring for the integrator

v2 exam. Files already written (unique to this exam):
`tools/next100/jambmath/*` (8 domain sources as Python data: `number.py`, `algebra.py`, `seqmat.py`, `geometry.py`,
`coordtrig.py`, `calculus.py`, `statistics.py`, `probability.py`; `build.py`; `sources.md`),
`data/v2/jambmath/questions.json` (plain array, KaTeX), `lib/v2/exams/jambmath.ts` (export `JAMBMATH`),
`lib/v2/banks/jambmath.ts` (`plainBank`), `app/jamb-mathematics/*` (layout, root redirect, dashboard, practice/[n],
stats, test/[id], test/[id]/results; copied from `app/jamb-use-of-english/`),
`app/jamb-mathematics-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/jambmath/build.py` (exits 1 on any problem), then
`python3 -I tools/validate_v2_bank.py jambmath '{"1": {"math": {"1": 40}}, "2": {"math": {"1": 40}}}'`
(passes: 200 questions, 0 stimuli, 0 problems; key strictly longest 11/200 = 6%, 4/42 = 10% of the non-number items;
158 all-number items sorted and locked, key in an end slot 85/158 = 54%; every KaTeX span renders with
`throwOnError: true`). Do not add `jambmath` to `tools/build_v2_bank.py` PLANS: it has its own build (key authored
first; all-number options sorted ascending and locked; others shuffled by a stem seed; every key checked against a
computed value `chk`: a number, a function of x, or a string built by the computation; 2 concept items).

Shape: one section `math` (`calculator: true`), one module of 40 four-option questions in 30 minutes (pro rata share
of the UTME's 2 hours for 180 questions), free navigation and flags, `breakSeconds: 0`. Two practice tests, Test 2
held out, 8 drills (per test 6 number, 5 algebra, 5 progressions/binary operations/matrices, 6 geometry and
mensuration, 5 coordinate geometry and trigonometry, 4 calculus, 5 statistics, 4 permutation/combination/probability;
15 drill-only items per domain, so each drill pool is 19 to 21), 10 dashboard steps. No Basics, no Premium gating.

Screenshots still needed: `public/landing/jambmath-mobile.png`, `jambmath-desktop.png` (+ `-dark`), drill key e.g.
`jambmath:jamb-mathematics:v2:number`. No tiger set: falls back to the DMV tiger; add `jambmath: "sat"` (or the
choice made for jambeng) to `BORROWED_SETS` in `lib/tigerAssets.ts` if wanted.

## lib/v2/bankSizes.ts
```ts
  jambmath: 200,
```

## lib/v2/registry.ts
```ts
import { JAMBMATH } from "./exams/jambmath";
// EXAMS_V2: add JAMBMATH right after JAMBENG
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the jambeng import in each (classQuestions uses double quotes, mcpV2Practice single):
```ts
import "@/lib/v2/banks/jambmath";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `JAMBMATH.domainLabels` (keys `jambmathNumber`, `jambmathAlgebra`,
`jambmathSequences`, `jambmathGeometry`, `jambmathCoordTrig`, `jambmathCalculus`, `jambmathStatistics`,
`jambmathProbability`).

## app/globals.css
Light block (then run `tools/gen_dark_brand_css.py` for the `.dark` tint). Hue: the brief suggested 150 40% 30%, which
clashes with `iedtt` (142 40% 36.8%: 8 degrees, same saturation, 6.8 lightness). Checked against every `--brand` in
globals.css and every v2 config theme: 148 45% 28% is clear of all (nearest jambeng 133 70% 30% is 15 degrees away;
batch-5 jambbio's suggested 135 30% 32% is 13 degrees away). White text on 28% lightness passes 4.5:1.
`JAMBMATH.theme` already uses it; if you pick another, change both.
```css
  /* JAMB Mathematics theme: deep green (v2 exam; matches lib/v2/exams/jambmath.ts theme) */
  [data-theme="jambmath"] {
    --brand: 148 45% 28%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 148 45% 95%;
    --brand-hover: 148 45% 24%;
    --brand-dark: 148 45% 20%;
    --brand-darker: 148 40% 10%;
    --brand-muted: 148 20% 70%;
    --brand-border: 148 30% 80%;
    --brand-border-light: 148 30% 90%;
    --brand-gradient-to: 128 40% 96%;
  }
```

## lib/shareCardCopy.ts
```ts
  jambmath: { title: "JAMB Mathematics Practice Test", description: "Practise number bases, algebra, geometry, trigonometry, calculus and statistics in full 40-question UTME Mathematics tests." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  jambmath: "NG",
```
Add `"jambmath"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  jambmath: "Practice tests for JAMB UTME Mathematics: 40 questions across the whole syllabus (number bases, indices and logarithms, algebra, progressions and matrices, geometry and mensuration, trigonometry, calculus, statistics and probability), scored out of 100 like the real subject.",
// EXAM_ORG (inside the one-line object)
  jambmath: "JAMB · UTME Mathematics",
// SEARCH_ALIASES
  jambmath: "jamb mathematics jamb maths utme maths utme mathematics jamb cbt practice maths jamb past questions mathematics jamb 2026 jamb 2027 number bases logarithms surds matrices calculus statistics probability nigeria university admission post utme",
```
Hub group: add to "Nigeria university entrance tests", after `jambeng`:
```ts
  { title: "Nigeria university entrance tests", ids: ["jambeng", "jambmath", /* other JAMB subjects of this batch */] },
```
`RELATED_OVERRIDES`: not needed once the group has three or more members; until then:
```ts
  jambmath: ["jambeng", "sat", "gcsemaths"],
```

## lib/examFacts.ts
```ts
  jambmath: {
    answer:
      "Mathematics is one of the subjects of the JAMB Unified Tertiary Matriculation Examination (UTME), the computer-based test for admission to Nigerian universities, polytechnics and colleges of education, and is required for most science, engineering and social science courses. Guides give the UTME as 180 objective questions in 2 hours across four subjects: Use of English has 60 questions and each other subject, Mathematics included, 40. Each subject is scored out of 100, so the total is out of 400. The syllabus has five sections: Number and Numeration, Algebra, Geometry and Trigonometry, Calculus, and Statistics. Candidates may not bring a calculator; guides say the CBT has a basic on-screen one. JAMB set minimum scores of 150 for universities and 100 for polytechnics and colleges of education for 2026 admissions; institutions and courses set their own, usually higher, cut-off marks.",
    rows: [
      { label: "Questions", value: "40 in Mathematics (180 in the whole UTME)" },
      { label: "Time", value: "2 hours for all four subjects" },
      { label: "Format", value: "Computer-based, objective (multiple choice)" },
      { label: "Sections", value: "Number and Numeration, Algebra, Geometry and Trigonometry, Calculus, Statistics" },
      { label: "Score", value: "Out of 100 per subject, 400 in all" },
      { label: "2026 minimum score", value: "150 universities, 100 polytechnics and colleges of education" },
      { label: "Run by", value: "Joint Admissions and Matriculation Board (JAMB)" },
    ],
    basedOn: "the JAMB website and widely reproduced UTME syllabus guides, checked November 2026. Question counts are guides' figures; JAMB publishes no count per topic",
    source: { name: "JAMB", url: "https://www.jamb.gov.ng" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  jambmath: "a JAMB tutorial class",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"jambmath"` (SS3 Mathematics classes and JAMB tutorial centres).

## lib/tigerAssets.ts, lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section, after JAMB Use of English:
```md
- **JAMB Mathematics** (`/jamb-mathematics`, landing `/jamb-mathematics-practice-test`, `[data-theme="jambmath"]` deep green, region NG, hub group "Nigeria university entrance tests"): the Mathematics subject of JAMB's UTME (guides: 180 questions in 2 hours across four subjects, 40 for each subject but English, each out of 100, 400 in all; no own calculator, a basic on-screen one per guides). One section `math` of 40 four-option questions in 30 minutes (the pro rata share), calculator on, free navigation, two practice tests with Test 2 held out, 8 drills on the syllabus's five sections (`jambmathNumber` 6, `jambmathAlgebra` 5 (polynomials, variation, inequalities), `jambmathSequences` 5 (progressions, binary operations, matrices), `jambmathGeometry` 6 (including the earth as a sphere and loci), `jambmathCoordTrig` 5, `jambmathCalculus` 4, `jambmathStatistics` 5, `jambmathProbability` 4 per test, Tigertest's split since JAMB publishes none; 15 drill-only each), 10 dashboard steps. Bank `data/v2/jambmath/questions.json` (200 original items, prefix `JAMBMATH-`, plain array, KaTeX, pi = 22/7 and R = 6400 km stated in stems) built by `python3 -I tools/next100/jambmath/build.py`, which checks every key against a computed value and sorts and locks all-number options. Percent score out of 100. Sources in `tools/next100/jambmath/sources.md`.
```
