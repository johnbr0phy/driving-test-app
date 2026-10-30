# Wiring for `osslt` (Ontario Secondary School Literacy Test, v2)

Files already written by the builder:
- `tools/osslt/build.py`, `reading.py`, `writing.py`, `sources.md` (edit the `.py` sources, then
  `python3 -I tools/osslt/build.py`; never hand-edit the JSON)
- `data/v2/osslt/questions.json` (200 items, 20 stimuli `OSSLT-P01`..`P20`, ids `OSSLT-T1-`, `OSSLT-T2-`, `OSSLT-D-`)
- `lib/v2/exams/osslt.ts` (exports `OSSLT`), `lib/v2/banks/osslt.ts`
- `app/osslt/{layout,page}.tsx`, `app/osslt/dashboard/page.tsx`, `app/osslt/practice/[n]/page.tsx`,
  `app/osslt/test/[id]/page.tsx`, `app/osslt/test/[id]/results/page.tsx` (copied from `app/ged/`)
- `app/osslt-practice-test/page.tsx`

Validator: `python3 -I tools/validate_v2_bank.py osslt '{"1": {"reading": {"1": 23}, "writing": {"1": 12}}, "2": {"reading": {"1": 23}, "writing": {"1": 12}}}'`
prints `osslt: 200 questions, 20 stimuli, 0 problems` (it also adds `osslt: 200,` to `lib/v2/bankSizes.ts`).

Not done (needs a running build): landing screenshots `public/landing/osslt-{mobile,desktop}{,-dark}.png`
via `.claude/skills/exam-bank/scripts/shoot_landing.js`. No tiger set: `getTigerAsset("osslt", 1)` falls back to the DMV art.

## lib/v2/registry.ts
```ts
import { OSSLT } from "./exams/osslt";
```
and add `OSSLT` to `EXAMS_V2` (after `TIMESTABLES`, or wherever the other school exams go):
```ts
export const EXAMS_V2: ExamV2Config[] = [GED, SAT, ACT, TEAS, HESI, ASVAB, ACCUPLACER, NCLEX, NCLEXPN, EMT, PARAMEDIC, SECPLUS, APLUS, AWS, TIMESTABLES, OSSLT];
```

## lib/v2/bankSizes.ts
`osslt: 200,` (the validator writes it; the integrator regenerates).

## lib/v2/basics.ts, lib/v2/types.ts
Nothing. All Basics skills are existing ones from `reading.json`, `writing.json` and `skills.json`.

## lib/server/classQuestions.ts
After `import "@/lib/v2/banks/hesi";` (alphabetical):
```ts
import "@/lib/v2/banks/osslt";
```

## app/globals.css
Light block, next to the GED and Times Tables blocks (indigo, hue 232, unused):
```css
  /* OSSLT theme: indigo (v2 exam; matches lib/v2/exams/osslt.ts theme) */
  [data-theme="osslt"] {
    --brand: 232 52% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 232 100% 96%;
    --brand-hover: 232 52% 36%;
    --brand-dark: 232 52% 30%;
    --brand-darker: 232 48% 21%;
    --brand-muted: 232 45% 75%;
    --brand-border: 232 45% 80%;
    --brand-border-light: 232 45% 90%;
    --brand-gradient-to: 255 80% 95%;
  }
```
Dark block: re-run `tools/gen_dark_brand_css.py`, or by hand (same rules as GED):
```css
  .dark [data-theme="osslt"] {
    --brand: 232 52% 50%;
    --brand-hover: 232 52% 42%;
    --brand-light: 232 45% 13%;
    --brand-gradient-to: 255 40% 11%;
    --brand-border-light: 232 35% 24%;
    --brand-border: 232 40% 34%;
    --brand-muted: 232 45% 45%;
    --brand-dark: 232 52% 65%;
    --brand-darker: 232 48% 78%;
  }
```

## lib/testCatalog.ts
`EXAM_BLURBS`:
```ts
  osslt: "Practice for the Ontario Secondary School Literacy Test in Grade 10: two 35-question tests on the EQAO blueprint (information paragraph, news report, dialogue, real-life narrative and 12 writing questions), plus four drills that teach the basics first. Free.",
```
`EXAM_ORG`:
```ts
osslt: "EQAO · Ontario Grade 10 literacy test",
```
`GROUPS`: a new Canada school group. If the integrator makes one Canada group for the school and
trade exams of this batch (caelec, capal...), put `osslt` first in it, e.g.
`{ title: "Canada school and trade tests", ids: ["osslt", "caelec", "capal"] }`; otherwise:
```ts
  { title: "Canada school tests", ids: ["osslt"] },
```
`SEARCH_ALIASES`:
```ts
  osslt: "osslt ontario literacy test ontario secondary school literacy test eqao grade 10 literacy osslc literacy course ossd graduation requirement reading writing high school ontario canada",
```
`RELATED_OVERRIDES` (its group is small):
```ts
  osslt: ["caon", "ged", "sat"],
```

## lib/region.ts
Canada test that is not a driving test:
```ts
const TEST_REGIONS = { ..., caon: "CA", ..., osslt: "CA", ... };
export const NON_DRIVING_TESTS = new Set(["timestables", "osslt"]);
```
(Add the other agents' non-driving Canada/UK/AU ids to the same set.)

## lib/examFacts.ts
```ts
  osslt: {
    answer:
      "The Ontario Secondary School Literacy Test (OSSLT) is EQAO's reading and writing test for students working toward the Ontario Secondary School Diploma, normally written for the first time in Grade 10. It is taken online in two sessions, Session A of about 65 minutes and Session B of about 75. It has 37 scored questions: 35 selected-response (23 reading questions on an information paragraph, a news report, a dialogue and a real-life narrative, and 12 writing questions) and two written answers, a short reading response and an opinion essay. Results are a scale score from 200 to 400, and 300 is needed for a successful outcome. Students who have been unsuccessful can rewrite it, and after two opportunities with at least one unsuccessful they can take the Ontario Secondary School Literacy Course (OSSLC) instead.",
    rows: [
      { label: "Who takes it", value: "Ontario secondary students, normally first in Grade 10" },
      { label: "Questions", value: "37 scored: 35 selected-response, 2 written answers" },
      { label: "Reading", value: "Information paragraph, news report, dialogue, real-life narrative" },
      { label: "Time", value: "Session A about 65 min, Session B about 75 min" },
      { label: "Passing score", value: "300 on a 200 to 400 scale (successful)" },
      { label: "If unsuccessful", value: "Rewrite, or the OSSLC after two opportunities" },
      { label: "Given by", value: "EQAO, online at the student's school" },
    ],
    basedOn: "the EQAO Ontario Secondary School Literacy Test Framework and the EQAO OSSLT assessment page",
    source: { name: "EQAO: Ontario Secondary School Literacy Test", url: "https://www.eqao.com/the-assessments/osslt/" },
    tigertest:
      "Tigertest has two 35-question OSSLT practice tests that follow the EQAO blueprint (all four reading forms and the 12 writing questions) and four drills that teach the basics first. All of it is free with no account required; the opinion essay and the written reading answer are not modelled.",
  },
```
(Checked 2026-10-29; the framework PDF is https://www.eqao.com/wp-content/uploads/2021/01/framework-osslt.pdf.)

## components/exam/ExamClassFaq.tsx
In the "High school, military and college classes" block:
```ts
  osslt: "a Grade 10 English class or the OSSLC",
```

## components/TeachNudge.tsx
Add `"osslt"` to `TEACHER_LED`, in the high school line:
```ts
  "ged", "sat", "act", "asvab", "secplus", "aplus", "aws", "osslt",
```

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` to the merge date (new landing `/osslt-practice-test`). The sitemap, OG
card (`/og/osslt`) and `llms.txt` pick the exam up from `EXAMS_V2` and the catalog.

## lib/tigerAssets.ts, next.config.ts, lib/sitemaps.ts, components/TestIcon.tsx
Nothing. Icon is the existing `book` key.

## CLAUDE.md
One bullet in the v2 section, after Times Tables:
```md
- **OSSLT** (`/osslt`, landing `/osslt-practice-test`, `[data-theme="osslt"]` indigo at hue 232, icon `book`, fully free, hub group "Canada school tests"): EQAO's Ontario Secondary School Literacy Test (Grade 10, OSSD literacy requirement) without its two open responses. EQAO Framework: online, Session A about 65 min and B about 75, 37 scored questions = 35 selected-response (reading 23 on four selections: information paragraph 6, news report 5, dialogue 5, real-life narrative 7; writing 12) + a news-report written answer and an opinion essay; scale 200 to 400, 300 successful. Two sections, Reading 23 in 45 min (`ossltInfo`, `ossltNews`, `ossltDialogue`, `ossltNarrative`, one selection each per test) and Writing 12 in 20 min (`ossltIdeas` 4, `ossltOrganize` 3, `ossltConventions` 5; EQAO gives no split, this one is ours), no break; two tests, Test 2 held out; percent score, goals 60 to 85, default 75 as our estimate of a successful result (`scoreNote` says so). Bank `data/v2/osslt/questions.json` (200 items, 20 original Canadian passages `OSSLT-P01..P20` in object form through `withStimuli()`, ids `OSSLT-T1-`, `-T2-`, `-D-`), built by `python3 -I tools/osslt/build.py` from `tools/osslt/reading.py` and `writing.py` (helpers rotate keys; edit the sources). Formats: single, choose two, order, cloze (drop-down), highlight (select a sentence or word); Canadian spelling, no serial-comma or -our/-or items. Four drills of 20, each with shared Basics, so the dashboard is 10 steps: `infoNews`, `storyDialogue`, `ideasOrganize`, `conventions`; 159 of the 165 drill-pool items carry a `basics` tag. Teacher-led (Grade 10 English, OSSLC). DMV tiger.
```
