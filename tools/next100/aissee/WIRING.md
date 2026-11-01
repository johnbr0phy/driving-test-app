# AISSEE Class 6 (`aissee`) wiring for the integrator

v2 exam, template `jnvst` (object form with shared passages through `withStimuli()`). Files written (unique to this exam):
`tools/next100/aissee/*` (8 domain sources as Python data, `stimuli.py`, `build.py`, `sources.md`, this file),
`data/v2/aissee/questions.json` (object form `{ stimuli, questions }`, 237 items, 5 stimuli, prefix `AISSEE-`),
`lib/v2/exams/aissee.ts` (export `AISSEE`), `lib/v2/banks/aissee.ts`,
`app/aissee/*` (layout, root redirect, dashboard, practice/[n], stats, test/[id], test/[id]/results; copied from
`app/jnvst/`), `app/aissee-class-6-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/aissee/build.py`, then
`python3 -I tools/validate_v2_bank.py aissee '{"1": {"ais": {"1": 100}}, "2": {"ais": {"1": 100}}}'`
(passes: 237 questions, 5 stimuli, 0 problems; key strictly longest 36/237 = 15%; 100 all-number items sorted and
locked, key in an end slot 47%). The validator rewrites `lib/v2/bankSizes.ts`; I ran a copy with that write stubbed, so
the shared file is untouched. Do not add `aissee` to `tools/build_v2_bank.py` PLANS: it has its own build.

Shape: one section `ais`, one 100-question module in 120 minutes (the real pace: 125 questions in 150 minutes), items in
the real paper order (Language 1-20 with two 5-question passages last, Mathematics 21-60, Intelligence 61-80, General
Knowledge 81-100). Two tests, Test 2 held out. 8 drills + 2 tests = 10 dashboard steps. No Basics, no premium.
Per test: grammar 10, reading 10, numbers 14, everyday arithmetic 13, shapes and measurement 13, intelligence 20,
GK India 10, GK science 10; 37 drill-only items.

Screenshots still needed: `public/landing/aissee-mobile.png`, `aissee-desktop.png` (+ `-dark`), e.g.
`aissee:aissee:v2:numbers` or `aissee:aissee:v2:intelligence`.

## lib/v2/bankSizes.ts
```ts
  aissee: 237,
```

## lib/v2/registry.ts
```ts
import { AISSEE } from "./exams/aissee";
// EXAMS_V2: add AISSEE after JNVST (India school entrance)
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ JNVST, AISSEE, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/aissee";          // classQuestions.ts
import '@/lib/v2/banks/aissee';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `AISSEE.domainLabels` (keys `aisseeGrammar`, `aisseeReading`, `aisseeNumbers`,
`aisseeCommercial`, `aisseeGeometry`, `aisseeReasoning`, `aisseeIndia`, `aisseeScience`).

## app/globals.css
Light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint. Hue from the brief, 120 25% 34% (muted cantonment
green). Neighbours checked: `phleb` 120 40% 36% (same hue, saturation exactly 15 apart, so it meets the rule only at the
edge), `uksia` 128 45% 30%, `apbio` 112 58% 32%, `ukfaw` 124 72% 30%, `ngfrsc` 123 60% 26%, `inrto` 116 85% 28.5% (all
15+ saturation apart). If you re-pick, keep `lib/v2/exams/aissee.ts` `theme` in step. White text on 120 25% 34% is about
6.0:1.
```css
  /* AISSEE theme: muted cantonment green (v2 exam; matches lib/v2/exams/aissee.ts theme) */
  [data-theme="aissee"] {
    --brand: 120 25% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 120 25% 96%;
    --brand-hover: 120 25% 30%;
    --brand-dark: 120 25% 26%;
    --brand-darker: 120 20% 16%;
    --brand-muted: 120 15% 70%;
    --brand-border: 120 18% 78%;
    --brand-border-light: 120 18% 88%;
    --brand-gradient-to: 100 25% 95%;
  }
```

## lib/shareCards.ts
```ts
  "aissee": {
    "color": "hsl(120, 25%, 34%)",
    "tint": "hsl(120, 25%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  aissee: { title: "AISSEE Class 6 Mock Test", description: "Sainik School entrance practice: 100-question mock tests on Language, Mathematics, Intelligence and General Knowledge." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  jnvst: "IN", aissee: "IN",
// NON_DRIVING_TESTS: add (it is not a driving test)
  "aissee",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  aissee: "Sainik School Class 6 entrance practice: 100-question AISSEE mock tests in 2 hours at the real pace, on Language, Mathematics, Intelligence and General Knowledge, with an explanation on every answer.",
// EXAM_ORG
  aissee: "NTA · All India Sainik Schools Entrance Examination, Class VI",
// SEARCH_ALIASES
  aissee: "aissee sainik school sainik school entrance exam sainik school class 6 class vi all india sainik schools entrance examination nta aissee mock test aissee practice test sainik school mock test new sainik school rimc military school entrance class 5 students maths intelligence gk language india",
// RELATED_OVERRIDES (school entrance sibling plus India defence neighbours)
  aissee: ["jnvst", "nda", "agniveer"],
```
Hub group: add to the existing "India school entrance tests" group:
```ts
  { title: "India school entrance tests", ids: ["jnvst", "aissee"] },
```
and add `aissee: ["jnvst", "nda", "agniveer"]` as above (the group has only two members). Also consider adding
`"aissee"` to `jnvst`'s override list in place of one of its job exams.

## lib/examFacts.ts
```ts
  aissee: {
    answer:
      "The AISSEE (All India Sainik Schools Entrance Examination) is the National Testing Agency's entrance test for Class 6 and Class 9 of the Sainik Schools and approved New Sainik Schools, run for the Sainik Schools Society of the Ministry of Defence. Under the AISSEE-2026 Information Bulletin, the Class 6 paper has 125 multiple-choice questions for 300 marks in 150 minutes, on an OMR sheet: Language 25 questions (2 marks each), Mathematics 50 (3 marks each), Intelligence 25 and General Knowledge 25 (2 marks each), with no negative marking. Candidates aged 10 to 12 can take it in English, Hindi or 11 other languages, and girls may apply for Class 6. To qualify for the existing Sainik Schools a candidate needs at least 25 percent in each subject and 40 percent overall (no minimum for SC and ST candidates there); seats are then given by school-wise merit lists and e-counselling.",
    rows: [
      { label: "Questions", value: "125 multiple choice, 300 marks" },
      { label: "Time", value: "150 minutes" },
      { label: "Sections", value: "Language 25, Mathematics 50, Intelligence 25, General Knowledge 25" },
      { label: "Marking", value: "3 marks per Mathematics question, 2 for the others, no negative marking" },
      { label: "Qualifying marks", value: "25% in each subject and 40% overall (existing Sainik Schools; none for SC/ST)" },
      { label: "Who can take it", value: "Boys and girls aged 10 to 12 on 31 March of the admission year" },
      { label: "Given by", value: "National Testing Agency (NTA) for the Sainik Schools Society" },
    ],
    basedOn: "the AISSEE-2026 Information Bulletin (exam held on 18 January 2026); check the AISSEE-2027 bulletin when NTA publishes it",
    source: { name: "National Testing Agency", url: "https://exams.nta.nic.in/sainik-school-society/" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  aissee: "a Sainik School coaching class or a Class 5 classroom",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"aissee"` (Sainik School coaching centres and Class 5 teachers prepare students in groups).

## lib/tigerAssets.ts
No tiger set. Suggest borrowing the ASVAB tiger (as NDA and Agniveer do) through `BORROWED_SETS`:
```ts
  aissee: "asvab",
```

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section after JNVST:
```md
- **AISSEE** (`/aissee`, landing `/aissee-class-6-practice-test`, `[data-theme="aissee"]` muted cantonment green, borrows the ASVAB tiger, region IN, hub group "India school entrance tests"): the National Testing Agency's All India Sainik Schools Entrance Examination for Class VI of the Sainik Schools and approved New Sainik Schools, on the AISSEE-2026 Information Bulletin (exam held on 18 January 2026; no 2027 bulletin on NTA's page as of 1 November 2026): 125 questions for 300 marks in 150 minutes on an OMR sheet, Language 25 x 2, Mathematics 50 x 3, Intelligence 25 x 2, General Knowledge 25 x 2, no negative marking, 13 languages; qualifying 25% in each subject and 40% overall for the existing Sainik Schools (no minimum for SC/ST there). Modelled at 100 questions in 120 minutes, the real pace and mix (20/40/20/20), one section `ais` in the real order, two tests with Test 2 held out, 8 drills (`aisseeGrammar`, `aisseeReading`, `aisseeNumbers`, `aisseeCommercial`, `aisseeGeometry`, `aisseeReasoning`, `aisseeIndia`, `aisseeScience`; 10/10/14/13/13/20/10/10 per test, 37 drill-only), 10 dashboard steps, free. Percent score; the 3-mark Mathematics weighting is explained in `scoreNote`. English only; spatial Intelligence items in words; GK static (the syllabus's "current" awards and personalities are not modelled). Bank `data/v2/aissee/questions.json` (237 items, 5 passages `AISSEE-T1-L1`.., object form through `withStimuli()`; all-number options sorted and locked) built by `python3 -I tools/next100/aissee/build.py`. Kept clear of the JNVST bank and the other India banks. Sources in `tools/next100/aissee/sources.md`.
```
