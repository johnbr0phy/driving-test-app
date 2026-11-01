# JAMB UTME Biology (`jambbio`) wiring for the integrator

v2 exam. Files already written (unique to this exam):
`tools/next100/jambbio/*` (6 domain sources as Python data, `build.py`, `sources.md`, this file),
`data/v2/jambbio/questions.json` (plain array, no stimuli), `lib/v2/exams/jambbio.ts` (export `JAMBBIO`),
`lib/v2/banks/jambbio.ts` (`plainBank`), `app/jamb-biology/*` (layout, root redirect, dashboard, practice/[n], stats,
test/[id], test/[id]/results; copied from `app/jamb-use-of-english/`), `app/jamb-biology-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/jambbio/build.py`, then (from a /tmp copy so bankSizes is not rewritten)
`python3 -I tools/validate_v2_bank.py jambbio '{"1": {"bio": {"1": 40}}, "2": {"bio": {"1": 40}}}'`
(203 questions, 0 stimuli, 0 problems; key strictly longest 27/203 = 13%; 9 all-number items sorted and locked,
key in an end slot on 6). Do not add `jambbio` to `tools/build_v2_bank.py` PLANS: it has its own build.

Shape: one section `bio`, one module of 40 four-option questions in 30 minutes (pro rata share of the UTME's 2 hours
for 180 questions), free navigation and flags, `breakSeconds: 0`. Two practice tests, Test 2 held out, 6 drills
(per test 8 variety, 6 nutrition, 6 transport, 6 reproduction, 8 ecology, 6 genetics; drill-only 23/20/20/20/20/20),
8 dashboard steps. No Basics, no Premium gating.

Screenshots still needed: `public/landing/jambbio-mobile.png`, `jambbio-desktop.png` (+ `-dark`).
Tiger: suggest `jambbio: "sat"` in `BORROWED_SETS` (`lib/tigerAssets.ts`)
like the India entrance exams.

## lib/v2/bankSizes.ts
```ts
  jambbio: 203,
```

## lib/v2/registry.ts
```ts
import { JAMBBIO } from "./exams/jambbio";
// EXAMS_V2: add JAMBBIO right after JAMBENG
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/jambbio";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `JAMBBIO.domainLabels` (keys `jambbioVariety`, `jambbioNutrition`,
`jambbioTransport`, `jambbioReproduction`, `jambbioEcology`, `jambbioGenetics`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). The brief suggested 135 30% 32%, which clashes
with `sscgd` (132 30% 30%) and `iedtt` (142 40% 28%). Used 135 30% 38% instead: 8 points lighter than sscgd, 10 lighter
than iedtt, 15 degrees from jambmath's suggested 150, 2 degrees and 40 points of saturation from jambeng (133 70% 30%);
white text contrast 4.83:1. If you change it, change `JAMBBIO.theme` too.
```css
  /* JAMB Biology theme: muted leaf green (v2 exam; matches lib/v2/exams/jambbio.ts theme) */
  [data-theme="jambbio"] {
    --brand: 135 30% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 135 30% 96%;
    --brand-hover: 135 30% 32%;
    --brand-dark: 135 30% 28%;
    --brand-darker: 135 30% 18%;
    --brand-muted: 135 20% 70%;
    --brand-border: 135 25% 80%;
    --brand-border-light: 135 25% 90%;
    --brand-gradient-to: 125 30% 96%;
  }
```

## lib/shareCardCopy.ts
```ts
  jambbio: { title: "JAMB Biology Practice Test", description: "Practise the whole UTME Biology syllabus in full 40-question timed tests, with every answer explained." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  jambbio: "NG",
```
Add `"jambbio"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  jambbio: "Practice tests for JAMB UTME Biology: 40 questions in 30 minutes on the whole syllabus, from cells and the kingdoms to nutrition, body systems, ecology, genetics and evolution, scored out of 100 like the real subject.",
// EXAM_ORG
  jambbio: "JAMB · UTME Biology",
// SEARCH_ALIASES
  jambbio: "jamb biology utme biology jamb cbt practice jamb past questions biology jamb 2026 jamb 2027 jamb biology syllabus ecology genetics nigeria university admission post utme medicine nursing",
```
Hub group "Nigeria university entrance tests": add `"jambbio"` after `"jambeng"`
(with the other JAMB subjects of this batch: `["jambeng", "jambmath", "jambbio", "jambchem", "jambphys"]`).
If the group is still one member short of padding, `RELATED_OVERRIDES` is not needed.

## lib/examFacts.ts
```ts
  jambbio: {
    answer:
      "Biology is one of the subjects in JAMB's Unified Tertiary Matriculation Examination (UTME), the computer-based test for admission to Nigerian universities, polytechnics and colleges of education, and is required for most medical, health, agricultural and life-science courses. The UTME is 180 objective questions in 2 hours across four subjects: Use of English has 60 questions and each of the other three subjects, Biology included, has 40. Each subject is scored out of 100, so the total is out of 400. The Biology syllabus has five sections: Variety of Organisms, Form and Functions, Ecology, Heredity and Variations, and Evolution. JAMB set minimum scores of 150 for universities and 100 for polytechnics and colleges of education for 2026 admissions; institutions and courses set their own, usually higher, cut-off marks.",
    rows: [
      { label: "Questions", value: "40 in Biology (180 in the whole UTME)" },
      { label: "Time", value: "2 hours for all four subjects" },
      { label: "Format", value: "Computer-based, objective (multiple choice)" },
      { label: "Sections", value: "Variety of Organisms, Form and Functions, Ecology, Heredity and Variations, Evolution" },
      { label: "Score", value: "Out of 100 per subject, 400 in all" },
      { label: "2026 minimum score", value: "150 universities, 100 polytechnics and colleges of education" },
      { label: "Run by", value: "Joint Admissions and Matriculation Board (JAMB)" },
    ],
    basedOn: "the JAMB website and widely reproduced UTME syllabus guides, checked November 2026. JAMB publishes no split of the 40 questions by topic",
    source: { name: "JAMB", url: "https://www.jamb.gov.ng" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  jambbio: "a JAMB tutorial class",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"jambbio"` (SS3 biology classes and JAMB tutorial centres).

## lib/tigerAssets.ts, lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering (and the optional `BORROWED_SETS` line above). Bump the exams date in `lib/seoDates.ts`
with the wave.

## CLAUDE.md
Add in the v2 section, after JAMB Use of English:
```md
- **JAMB Biology** (`/jamb-biology`, landing `/jamb-biology-practice-test`, `[data-theme="jambbio"]` muted leaf green (135 30% 38%), region NG, hub group "Nigeria university entrance tests"): the Biology paper of JAMB's UTME (180 questions in 2 hours across four subjects, Biology 40, each subject out of 100). One section `bio` of 40 four-option questions in 30 minutes (the pro rata share of the 2 hours), free navigation, two practice tests with Test 2 held out, 6 drills by syllabus area (`jambbioVariety` 8, `jambbioNutrition` 6, `jambbioTransport` 6, `jambbioReproduction` 6, `jambbioEcology` 8, `jambbioGenetics` 6 per test; JAMB publishes no split, so this is Tigertest's), 8 dashboard steps, free, no Basics. Diagrams described in words; JAMB names such as carbon(IV) oxide; Nigerian examples (vegetation zones, Niger Delta mangroves, malaria, river blindness, guinea worm). Bank `data/v2/jambbio/questions.json` (203 original items, prefix `JAMBBIO-`, plain array; 9 all-number items sorted and locked) built by `python3 -I tools/next100/jambbio/build.py`. Percent score out of 100. Sources in `tools/next100/jambbio/sources.md`.
```
