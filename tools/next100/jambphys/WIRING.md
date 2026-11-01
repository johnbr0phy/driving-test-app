# JAMB UTME Physics (`jambphys`) wiring for the integrator

v2 exam. Files already written (unique to this exam):
`tools/next100/jambphys/*` (7 domain sources as Python data, `build.py`, `sources.md`),
`data/v2/jambphys/questions.json` (plain array), `lib/v2/exams/jambphys.ts` (export `JAMBPHYS`),
`lib/v2/banks/jambphys.ts` (`plainBank`), `app/jamb-physics/*` (layout, root redirect, dashboard,
practice/[n], stats, test/[id], test/[id]/results; copied from `app/jamb-use-of-english/`),
`app/jamb-physics-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/jambphys/build.py`, then
`python3 -I tools/validate_v2_bank.py jambphys '{"1": {"phys": {"1": 40}}, "2": {"phys": {"1": 40}}}'`
(passes: 200 questions, 0 stimuli, 0 problems; key strictly longest 21/200 = 10%; 119 all-number
items sorted ascending and locked, key in an end slot on 53 of them, 45%). Do not add `jambphys` to
`tools/build_v2_bank.py` PLANS: it has its own build. Calculations use the `N()` helper: the build
asserts the displayed key matches the formula to 0.6% and that the explanation states the key.

Shape: one section `phys`, one module of 40 four-option questions in 30 minutes (pro rata share of the
UTME's 2 hours for 180 questions), free navigation and flags, `breakSeconds: 0`. Two practice tests,
Test 2 held out, 7 drills (per test 7 motion, 7 forces, 7 heat, 7 waves, 5 electricity, 4 magnetism,
3 modern; pools 30/30/30/30/28/26/26), 9 dashboard steps. No Basics, no Premium gating. Unicode
units (m s⁻², Ω, ×10ⁿ), no KaTeX, g = 10 m s⁻².

Screenshots still needed: `public/landing/jambphys-mobile.png`, `jambphys-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  jambphys: 200,
```

## lib/v2/registry.ts
```ts
import { JAMBPHYS } from "./exams/jambphys";
// EXAMS_V2: add JAMBPHYS after the other JAMB subjects
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports (classQuestions uses double quotes, mcpV2Practice single):
```ts
import "@/lib/v2/banks/jambphys";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `JAMBPHYS.domainLabels` (keys `jambphysMotion`, `jambphysForces`,
`jambphysHeat`, `jambphysWaves`, `jambphysElectricity`, `jambphysMagnetism`, `jambphysModern`).

## app/globals.css
Suggested hue 231 36% 40% (the brief's 225 30% 36% is within 8 degrees of `security` 222 35% 36%,
`aplang` 222 18% 34% and `cissp` 220 40% 43% without the saturation or lightness gap). 231 36% 40%
clears every theme in globals.css as of 1 November 2026, and white text on it is above 4.5:1.
Batch-5 neighbours: ngpolice 215, ngcustoms 200 (both more than 8 degrees away). If you change it,
change `JAMBPHYS.theme` to match. Run `tools/gen_dark_brand_css.py` for the `.dark` tint.
```css
  /* JAMB Physics theme: slate indigo (v2 exam; matches lib/v2/exams/jambphys.ts theme) */
  [data-theme="jambphys"] {
    --brand: 231 36% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 231 36% 96%;
    --brand-hover: 231 36% 34%;
    --brand-dark: 231 36% 30%;
    --brand-darker: 231 32% 16%;
    --brand-muted: 231 20% 70%;
    --brand-border: 231 28% 82%;
    --brand-border-light: 231 28% 91%;
    --brand-gradient-to: 225 30% 97%;
  }
```

## lib/tigerAssets.ts
No tiger set. Suggest borrowing the same set as the other UTME subjects, e.g. in `BORROWED_SETS`:
```ts
  jambphys: "sat",
```

## lib/shareCardCopy.ts
```ts
  jambphys: { title: "JAMB Physics Practice Test", description: "Practise the whole UTME Physics syllabus in full 40-question tests, with every calculation worked." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  jambphys: "NG",
```
Add `"jambphys"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  jambphys: "Practice tests for JAMB UTME Physics: 40 questions across the whole syllabus, from motion, heat and waves to electricity, magnetism and modern physics, with every calculation worked and a score out of 100 like the real subject.",
// EXAM_ORG
  jambphys: "JAMB · UTME Physics",
// SEARCH_ALIASES
  jambphys: "jamb physics utme physics jamb cbt practice physics jamb past questions physics jamb 2027 physics calculations mechanics electricity waves optics modern physics nigeria university admission post utme science",
```
Hub group "Nigeria university entrance tests": add `"jambphys"` after the other JAMB subjects, so the
group reads `["jambeng", "jambmath", "jambbio", "jambchem", "jambphys"]`. With five members no
`RELATED_OVERRIDES` entry is needed (drop jambeng's override if the group no longer needs padding).

## lib/examFacts.ts
```ts
  jambphys: {
    answer:
      "Physics is one of the subjects candidates for science, engineering and medical courses take in the JAMB Unified Tertiary Matriculation Examination (UTME), the computer-based test for admission to Nigerian universities, polytechnics and colleges of education. Guides that reproduce the JAMB brochure give the UTME as 180 objective questions in 2 hours across four subjects: Use of English has 60 questions and each other subject, Physics included, has 40. Each subject is scored out of 100, so the total is out of 400. The Physics syllabus runs from measurement, motion and energy through heat, waves and light to electricity, magnetism, modern physics, electronics, and fibre optics and lasers. JAMB set minimum scores of 150 for universities and 100 for polytechnics and colleges of education for 2026 admissions; institutions and courses set their own, usually higher, cut-off marks.",
    rows: [
      { label: "Questions", value: "40 in Physics (180 in the whole UTME)" },
      { label: "Time", value: "2 hours for all four subjects" },
      { label: "Format", value: "Computer-based, four-option multiple choice" },
      { label: "Syllabus", value: "Mechanics, heat, waves and optics, electricity and magnetism, modern physics and electronics" },
      { label: "Score", value: "Out of 100 per subject, 400 in all" },
      { label: "2026 minimum score", value: "150 universities, 100 polytechnics and colleges of education" },
      { label: "Run by", value: "Joint Admissions and Matriculation Board (JAMB)" },
    ],
    basedOn: "the JAMB website and UTME Physics syllabus guides that reproduce the IBASS brochure, checked November 2026. Question counts are guides' figures; JAMB publishes no topic weights",
    source: { name: "JAMB", url: "https://www.jamb.gov.ng" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  jambphys: "a JAMB tutorial class",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"jambphys"` (SS3 physics classes and JAMB tutorial centres).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section, after the JAMB Use of English bullet (and the other batch-5 JAMB subjects):
```md
- **JAMB Physics** (`/jamb-physics`, landing `/jamb-physics-practice-test`, `[data-theme="jambphys"]` slate indigo, region NG, hub group "Nigeria university entrance tests"): the Physics paper of JAMB's UTME (180 questions in 2 hours across four subjects per guides, Physics 40, each subject out of 100). One section `phys` of 40 four-option questions in 30 minutes (the pro rata share of the 2 hours), free navigation, two practice tests with Test 2 held out, 7 drills (`jambphysMotion` 7, `jambphysForces` 7, `jambphysHeat` 7, `jambphysWaves` 7, `jambphysElectricity` 5, `jambphysMagnetism` 4, `jambphysModern` 3 per test; Tigertest's split, JAMB publishes no weights), 9 dashboard steps. Syllabus topics as guides reproduce the 2026/2027 list, fibre optics and lasers included. Unicode units, no KaTeX, g = 10 m s⁻². Bank `data/v2/jambphys/questions.json` (200 original items, prefix `JAMBPHYS-`, plain array, 119 calculations whose all-number options are sorted and locked) built by `python3 -I tools/next100/jambphys/build.py` (`N()` asserts every key against its formula and its explanation). Percent score out of 100. Sources in `tools/next100/jambphys/sources.md`.
```
