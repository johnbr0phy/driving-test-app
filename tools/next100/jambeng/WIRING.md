# JAMB UTME Use of English (`jambeng`) wiring for the integrator

v2 exam. Files already written (unique to this exam):
`tools/next100/jambeng/*` (6 domain sources as Python data, `stimuli.py` with 12 original passages, `build.py`,
`sources.md`), `data/v2/jambeng/questions.json` (object form `{ stimuli, questions }`), `lib/v2/exams/jambeng.ts`
(export `JAMBENG`), `lib/v2/banks/jambeng.ts` (`withStimuli`), `app/jamb-use-of-english/*` (layout, root redirect,
dashboard, practice/[n], stats, test/[id], test/[id]/results; copied from `app/ibps-po/`),
`app/jamb-use-of-english-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/jambeng/build.py`, then
`python3 -I tools/validate_v2_bank.py jambeng '{"1": {"eng": {"1": 60}}, "2": {"eng": {"1": 60}}}'`
(passes: 200 questions, 12 stimuli, 0 problems; key strictly longest 15/200 = 8%). Do not add `jambeng` to
`tools/build_v2_bank.py` PLANS: it has its own build (key authored first, options shuffled by a stem+options seed).

Shape: one section `eng`, one module of 60 four-option questions in 40 minutes (pro rata share of the UTME's 2 hours
for 180 questions), free navigation and flags, `breakSeconds: 0`. Two practice tests, Test 2 held out, 6 drills
(per test 15 comprehension on three passages, 10 cloze, 5 interpretation, 10 synonyms/antonyms, 10 completion,
10 oral forms), 8 dashboard steps. No Basics, no Premium gating. Oral forms items underline letters with `__x__`
(RichText underline) and show stress with capital-letter syllables.

Screenshots still needed: `public/landing/jambeng-mobile.png`, `jambeng-desktop.png` (+ `-dark`).
No tiger set: `jambeng` borrows nothing yet (DMV tiger fallback); add `jambeng: "sat"` (or similar) to
`BORROWED_SETS` in `lib/tigerAssets.ts` if a school-exam tiger is preferred.

## lib/v2/bankSizes.ts
```ts
  jambeng: 200,
```

## lib/v2/registry.ts
```ts
import { JAMBENG } from "./exams/jambeng";
// EXAMS_V2: add JAMBENG (with the other school and university entrance exams, or at the end)
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/jambeng";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `JAMBENG.domainLabels` (keys `jambengComprehension`, `jambengCloze`,
`jambengInterpretation`, `jambengVocabulary`, `jambengCompletion`, `jambengOral`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). Hue from the brief, 140 60% 24% (Nigerian
green). CHECK: `naplan` is 142 64% 30% (2 degrees, 4 points saturation, 6 points lightness apart), under the
"8 degrees needs 15 saturation or 8 lightness" rule. If you want it clear, use 140 60% 21% (9 points lighter gap)
and change `JAMBENG.theme` to match.
```css
  /* JAMB Use of English theme: Nigerian green (v2 exam; matches lib/v2/exams/jambeng.ts theme) */
  [data-theme="jambeng"] {
    --brand: 140 60% 24%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 140 60% 95%;
    --brand-hover: 140 60% 20%;
    --brand-dark: 140 60% 18%;
    --brand-darker: 140 55% 10%;
    --brand-muted: 140 25% 70%;
    --brand-border: 140 35% 80%;
    --brand-border-light: 140 35% 90%;
    --brand-gradient-to: 120 50% 96%;
  }
```

## lib/shareCardCopy.ts
```ts
  jambeng: { title: "JAMB Use of English Practice Test", description: "Practise comprehension, cloze, lexis and structure and oral forms in full 60-question UTME English tests." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  jambeng: "NG",
```
Add `"jambeng"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  jambeng: "Practice tests for JAMB UTME Use of English: 60 questions on original comprehension and cloze passages, synonyms and antonyms, sentence interpretation, sentence completion and oral forms, scored out of 100 like the real subject.",
// EXAM_ORG
  jambeng: "JAMB · UTME Use of English",
// SEARCH_ALIASES
  jambeng: "jamb use of english jamb english utme english jamb cbt practice jamb past questions english jamb 2026 jamb 2027 oral english lexis and structure comprehension cloze test synonyms antonyms nigeria university admission post utme",
```
Hub group (new): "Nigeria university entrance tests", right after "Nigeria driving tests":
```ts
  { title: "Nigeria university entrance tests", ids: ["jambeng"] },
```
`RELATED_OVERRIDES` (one-member group):
```ts
  jambeng: ["ngfrsc", "sat", "osslt"],
```

## lib/examFacts.ts
```ts
  jambeng: {
    answer:
      "Use of English is the compulsory subject of the JAMB Unified Tertiary Matriculation Examination (UTME), the computer-based test for admission to Nigerian universities, polytechnics and colleges of education. The UTME is 180 objective questions in 2 hours across four subjects: Use of English has 60 questions and each of the other three subjects 40. Each subject is scored out of 100, so the total is out of 400. The syllabus has three sections: Comprehension and Summary (including a cloze passage and a prescribed reading text that changes by cycle), Lexis and Structure, and Oral Forms. JAMB set minimum scores of 150 for universities and 100 for polytechnics and colleges of education for 2026 admissions; institutions and courses set their own, usually higher, cut-off marks.",
    rows: [
      { label: "Questions", value: "60 in Use of English (180 in the whole UTME)" },
      { label: "Time", value: "2 hours for all four subjects" },
      { label: "Format", value: "Computer-based, objective (multiple choice)" },
      { label: "Sections", value: "Comprehension and Summary, Lexis and Structure, Oral Forms" },
      { label: "Score", value: "Out of 100 per subject, 400 in all" },
      { label: "2026 minimum score", value: "150 universities, 100 polytechnics and colleges of education" },
      { label: "Run by", value: "Joint Admissions and Matriculation Board (JAMB)" },
    ],
    basedOn: "the JAMB website and widely reproduced UTME syllabus guides, checked October 2026. Section question counts are guides' figures, not JAMB's",
    source: { name: "JAMB", url: "https://www.jamb.gov.ng" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  jambeng: "a JAMB tutorial class",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"jambeng"` (secondary school SS3 English classes and JAMB tutorial centres).

## lib/tigerAssets.ts, lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section, after IBPS PO:
```md
- **JAMB Use of English** (`/jamb-use-of-english`, landing `/jamb-use-of-english-practice-test`, `[data-theme="jambeng"]` Nigerian green, region NG, hub group "Nigeria university entrance tests"): the compulsory Use of English paper of JAMB's UTME (180 questions in 2 hours across four subjects, English 60, each subject out of 100, 400 in all). One section `eng` of 60 four-option questions in 40 minutes (the pro rata share of the 2 hours), free navigation, two practice tests with Test 2 held out, 6 drills (`jambengComprehension` 15 on three passages, `jambengCloze` 10, `jambengInterpretation` 5, `jambengVocabulary` 10, `jambengCompletion` 10, `jambengOral` 10 per test), 8 dashboard steps. The prescribed reading text (it changes by cycle; The Lekki Headmaster for 2026 per guides) is not modelled: its share goes to extra original passages, and the landing says so. Section counts follow guides (about 25/25/10), not a JAMB document; IBASS could not be read. Oral forms underline letters with `__x__` and mark stress with capital-letter syllables, judged by RP. Bank `data/v2/jambeng/questions.json` (200 original items, prefix `JAMBENG-`, object form with 12 Nigerian-set passages `JAMBENG-T1-P1`.. and cloze passages `-CZ`) built by its own `tools/next100/jambeng/build.py`. Percent score out of 100. Sources in `tools/next100/jambeng/sources.md`.
```
