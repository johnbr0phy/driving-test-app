# JAMB UTME Chemistry (`jambchem`) wiring for the integrator

v2 exam. Files already written (unique to this exam):
`tools/next100/jambchem/*` (8 domain sources as Python data, `build.py`, `sources.md`),
`data/v2/jambchem/questions.json` (plain array), `lib/v2/exams/jambchem.ts` (export `JAMBCHEM`),
`lib/v2/banks/jambchem.ts` (`plainBank`), `app/jamb-chemistry/*` (layout, root redirect, dashboard,
practice/[n], stats, test/[id], test/[id]/results; copied from `app/jamb-use-of-english/`),
`app/jamb-chemistry-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/jambchem/build.py`, then (from a copy, since it rewrites bankSizes)
`python3 -I tools/validate_v2_bank.py jambchem '{"1": {"chem": {"1": 40}}, "2": {"chem": {"1": 40}}}'`
(passes: 208 questions, 0 stimuli, 0 problems; key strictly longest 31/208 = 15%; 45 all-number items
sorted and locked, key in an end slot 22/45 = 49%; 45 computed keys asserted). Do not add `jambchem`
to `tools/build_v2_bank.py` PLANS: it has its own build (key authored first, options shuffled by a stem
seed, all-number options sorted with `lockedOrder`).

Shape: one section `chem`, one module of 40 four-option questions in 30 minutes (pro rata share of the
UTME's 2 hours for 180 questions), `calculator: true`, free navigation and flags, `breakSeconds: 0`.
Two practice tests, Test 2 held out, 8 drills in syllabus order (per test 4/5/6/5/6/5/4/5, Tigertest's
split: JAMB publishes no topic weights), 10 dashboard steps, drills of 20 to 22 items. No Basics, no
Premium gating. Nigerian school IUPAC names (trioxocarbonate(IV), tetraoxosulphate(VI)) and British
spelling (sulphur), as in the JAMB syllabus.

Screenshots still needed: `public/landing/jambchem-mobile.png`, `jambchem-desktop.png` (+ `-dark`).
No tiger set: borrow one (`jambchem: "sat"` or whatever `jambeng` uses) in `BORROWED_SETS` in
`lib/tigerAssets.ts`, or leave the DMV fallback.

## lib/v2/bankSizes.ts
```ts
  jambchem: 208,
```

## lib/v2/registry.ts
```ts
import { JAMBCHEM } from "./exams/jambchem";
// EXAMS_V2: add JAMBCHEM after JAMBENG
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/jambchem";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `JAMBCHEM.domainLabels` (keys `jambchemMatter`, `jambchemStoich`,
`jambchemAtomic`, `jambchemAcids`, `jambchemPhysical`, `jambchemNonmetals`, `jambchemMetals`,
`jambchemOrganic`).

## app/globals.css
Hue: the brief suggested 190 35% 30%, but that clashes with `ccna` (191 45% 30%) and `sscchsl`
(196 30% 34%) under the 8-degree rule. 186 15% 36% (muted slate cyan) passes the checker against every
theme in globals.css as of 1 November 2026 (nearest: ccna, mppolice, nclexpn, gcsecs at 15+ points of
saturation apart). It is in `JAMBCHEM.theme`; change both if the batch settles another. Run
`tools/gen_dark_brand_css.py` for the `.dark` tint.
```css
  /* JAMB Chemistry theme: muted slate cyan (v2 exam; matches lib/v2/exams/jambchem.ts theme) */
  [data-theme="jambchem"] {
    --brand: 186 15% 36%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 186 15% 96%;
    --brand-hover: 186 15% 31%;
    --brand-dark: 186 15% 26%;
    --brand-darker: 186 15% 16%;
    --brand-muted: 186 10% 70%;
    --brand-border: 186 12% 80%;
    --brand-border-light: 186 12% 90%;
    --brand-gradient-to: 190 15% 97%;
  }
```

## lib/shareCardCopy.ts
```ts
  jambchem: { title: "JAMB Chemistry Practice Test", description: "Practise the whole UTME Chemistry syllabus in full 40-question tests, with every calculation worked out." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  jambchem: "NG",
```
Add `"jambchem"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  jambchem: "Practice tests for JAMB UTME Chemistry: 40 questions on all 18 syllabus topics, from separation of mixtures and the mole to electrolysis, metals and organic chemistry, with every calculation worked out and a score out of 100 like the real subject.",
// EXAM_ORG
  jambchem: "JAMB · UTME Chemistry",
// SEARCH_ALIASES
  jambchem: "jamb chemistry utme chemistry jamb cbt chemistry jamb chemistry past questions jamb 2027 chemistry mock mole concept electrolysis organic chemistry nigeria university admission science post utme",
```
Hub group "Nigeria university entrance tests": add `"jambchem"` after `"jambeng"` (with the other
JAMB subjects of this batch).

## lib/examFacts.ts
```ts
  jambchem: {
    answer:
      "Chemistry is one of the subjects of the JAMB Unified Tertiary Matriculation Examination (UTME), the computer-based test for admission to Nigerian universities, polytechnics and colleges of education, and is required for courses such as medicine, pharmacy and engineering. The UTME is 180 objective questions in 2 hours across four subjects: Use of English has 60 questions and each other subject, including Chemistry, 40. Each subject is scored out of 100, so the total is out of 400. The JAMB Chemistry syllabus has 18 topics, from separation of mixtures and the mole to electrolysis, metals, organic compounds and astronomical chemistry. JAMB set minimum scores of 150 for universities and 100 for polytechnics and colleges of education for 2026 admissions; institutions and courses set their own, usually higher, cut-off marks.",
    rows: [
      { label: "Questions", value: "40 in Chemistry (180 in the whole UTME)" },
      { label: "Time", value: "2 hours for all four subjects" },
      { label: "Format", value: "Computer-based, four-option multiple choice" },
      { label: "Syllabus", value: "18 topics, physical, inorganic and organic chemistry" },
      { label: "Score", value: "Out of 100 per subject, 400 in all" },
      { label: "2026 minimum score", value: "150 universities, 100 polytechnics and colleges of education" },
      { label: "Run by", value: "Joint Admissions and Matriculation Board (JAMB)" },
    ],
    basedOn: "the JAMB UTME Chemistry syllabus (copy for the 2026/2027 cycle), the JAMB website and UTME guides, checked November 2026",
    source: { name: "JAMB", url: "https://www.jamb.gov.ng" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  jambchem: "a JAMB tutorial class",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"jambchem"` (SS3 chemistry classes and JAMB tutorial centres).

## lib/tigerAssets.ts, lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering (and the optional `BORROWED_SETS` line above). Bump the exams date in
`lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section, after JAMB Use of English:
```md
- **JAMB Chemistry** (`/jamb-chemistry`, landing `/jamb-chemistry-practice-test`, `[data-theme="jambchem"]` muted slate cyan, region NG, hub group "Nigeria university entrance tests"): the Chemistry paper of JAMB's UTME (180 questions in 2 hours across four subjects, Chemistry 40, each subject out of 100), on JAMB's 18-topic UTME Chemistry syllabus (a copy for the 2026/2027 cycle; IBASS could not be read). One section `chem` of 40 four-option questions in 30 minutes (the pro rata share), calculator on, free navigation, two practice tests with Test 2 held out, 8 drills in syllabus order (`jambchemMatter` 4, `jambchemStoich` 5, `jambchemAtomic` 6 with nuclear chemistry, `jambchemAcids` 5 with redox, `jambchemPhysical` 6, `jambchemNonmetals` 5 with pollution, `jambchemMetals` 4 with industry and astronomical chemistry, `jambchemOrganic` 5 per test; Tigertest's split, JAMB publishes none), 10 dashboard steps. Syllabus IUPAC names (trioxocarbonate(IV), tetraoxosulphate(VI)) and British spelling. Bank `data/v2/jambchem/questions.json` (208 original items, prefix `JAMBCHEM-`, plain array) built by `python3 -I tools/next100/jambchem/build.py` (45 computed keys asserted; all-number options sorted and locked). Percent score out of 100. Sources in `tools/next100/jambchem/sources.md`.
```
