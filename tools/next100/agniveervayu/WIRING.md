# Agniveer Vayu, Science subjects (`agniveervayu`) wiring for the integrator

v2 exam, template `sscmts` (sections). Files already written (unique to this exam):
`tools/next100/agniveervayu/*` (8 domain sources as Python data, `stimuli.json` with 3 reading passages, `build.py`,
`sources.md`), `data/v2/agniveervayu/questions.json` (object form `{ stimuli, questions }`),
`lib/v2/exams/agniveervayu.ts` (export `AGNIVEERVAYU`), `lib/v2/banks/agniveervayu.ts` (`withStimuli`),
`app/agniveer-vayu/*` (layout, root redirect, dashboard, practice/[n], stats, test/[id], test/[id]/results; copied from
`app/ssc-mts/`), `app/agniveer-vayu-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/agniveervayu/build.py`, then
`python3 -I tools/validate_v2_bank.py agniveervayu '{"1": {"eng": {"1": 20}, "phy": {"1": 25}, "math": {"1": 25}}, "2": {"eng": {"1": 20}, "phy": {"1": 25}, "math": {"1": 25}}}'`
(passes: 204 questions, 3 stimuli, 0 problems; key strictly longest 12% of all items, 18% of non-number items;
all-number items 83, sorted and locked, key in an end slot 49%). Error-spotting and sentence-improvement items and
all-number options get `lockedOrder` from the build. The validator rewrites `lib/v2/bankSizes.ts`; it was run against
a copy, so that file is untouched. Do not add `agniveervayu` to `tools/build_v2_bank.py` PLANS: it has its own build.

Shape: three sections that are the three subjects of the real Science subjects test, `eng` (20 items, 15 min:
`agniveervayuGrammar` 10, `agniveervayuReading` 10 incl. a 5-item reading passage), `phy` (25 items, 22 min:
`agniveervayuMechanics` 10, `agniveervayuHeatOptics` 7, `agniveervayuElectricity` 8) and `math` (25 items, 23 min:
`agniveervayuAlgebra` 9, `agniveervayuGeometry` 8, `agniveervayuCalculus` 8), `breakSeconds: 0`, 60 minutes in all
(the real test is one 60-minute clock; the split keeps its pace). Two tests, Test 2 held out; 8 drills (8 drill-only
items each), so the dashboard is 10 steps. Math uses KaTeX (`$...$`) in stems, options and explanations.

Screenshots still needed: `public/landing/agniveervayu-mobile.png`, `agniveervayu-desktop.png` (+ `-dark`), e.g.
`agniveervayu:agniveer-vayu:v2:mechanics`.

## lib/v2/bankSizes.ts
```ts
  agniveervayu: 204,
```

## lib/v2/registry.ts
```ts
import { AGNIVEERVAYU } from "./exams/agniveervayu";
// EXAMS_V2: add AGNIVEERVAYU after AGNIVEER (the Army CEE, batch 3), or after RRBGROUPD if that is not in yet
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/agniveervayu";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `AGNIVEERVAYU.domainLabels` (keys `agniveervayuGrammar`, `agniveervayuReading`,
`agniveervayuMechanics`, `agniveervayuHeatOptics`, `agniveervayuElectricity`, `agniveervayuAlgebra`,
`agniveervayuGeometry`, `agniveervayuCalculus`).

## app/globals.css
Note (review, 1 Nov 2026): the integrator wired `202 40% 44%`, which is what `AGNIVEERVAYU.theme` and `app/globals.css` now use; the 203 60% 46% block below is the builder's original suggestion.

Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). Hue: the brief suggested 205 60% 40%, which
clashes with `cdlx` (205 70% 38%) and `osha` (205 55% 38%); 205 at 47% would then clash with `sbipo` (212 70% 46%).
Suggested instead 203 60% 46% (air force blue), which matches `AGNIVEERVAYU.theme` and clears every theme within
8 degrees (cdlx and osha by 8 lightness, sbipo by 9 degrees, auwah/nzroad/sscchsl/part107 by 29+ saturation,
sbiclerk/nclex by 20, realestate by 15, sie by 18 lightness). Check against `nda` (214 55% 32%) and `aplang`
(200 25% 34%) from this batch: both clear.
```css
  /* Agniveer Vayu theme: air force blue (v2 exam; matches lib/v2/exams/agniveervayu.ts theme) */
  [data-theme="agniveervayu"] {
    --brand: 203 60% 46%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 203 60% 96%;
    --brand-hover: 203 60% 41%;
    --brand-dark: 203 60% 36%;
    --brand-darker: 203 55% 18%;
    --brand-muted: 203 35% 72%;
    --brand-border: 203 40% 80%;
    --brand-border-light: 203 40% 90%;
    --brand-gradient-to: 213 60% 96%;
  }
```

## lib/shareCards.ts
```ts
  "agniveervayu": {
    "color": "hsl(203, 60%, 46%)",
    "tint": "hsl(203, 60%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  agniveervayu: { title: "Agniveer Vayu Mock Test", description: "Practice English, Physics and Maths for the Indian Air Force Agniveervayu Science test in full 70-question, 60-minute mock tests." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  agniveervayu: "IN",
```
Add `"agniveervayu"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  agniveervayu: "Mock tests for the Indian Air Force Agniveervayu Science subjects online test: English, Physics and Mathematics to the 10+2 CBSE syllabus, 70 questions in 60 minutes, with negative marking explained.",
// EXAM_ORG
  agniveervayu: "Indian Air Force · Agniveervayu (Agnipath)",
// SEARCH_ALIASES
  agniveervayu: "agniveer vayu agniveervayu air force agniveer iaf agniveer agnipath air force group x airmen science subjects mock test practice set physics maths english 10+2 casb star exam online test india defence",
```
Hub group: add `"agniveervayu"` to "India government job exams" right after `"agniveer"` (the Army CEE), or after
the other defence entries if the integrator groups them.

## lib/examFacts.ts
```ts
  agniveervayu: {
    answer:
      "The Agniveervayu Science subjects test is the Phase I online test for the Indian Air Force's Agnipath entry for candidates with Physics, Mathematics and English in Class 12. It lasts 60 minutes and covers English, Physics and Mathematics to the 10+2 CBSE syllabus; guides report 70 questions, 20 English, 25 Physics and 25 Mathematics. Each right answer earns 1 mark and each wrong answer loses 0.25. Questions are in English and Hindi except the English paper. Marks are normalised, and the cut-off for Phase II (fitness and adaptability tests) is set state by state.",
    rows: [
      { label: "Time", value: "60 minutes (Science subjects)" },
      { label: "Subjects", value: "English, Physics, Mathematics (10+2 CBSE)" },
      { label: "Questions", value: "70 as guides report: English 20, Physics 25, Maths 25" },
      { label: "Marking", value: "+1 right, -0.25 wrong, 0 unattempted" },
      { label: "Language", value: "English and Hindi, except the English paper" },
      { label: "Cut-off", value: "Normalised marks; state-wise cut-offs for Phase II" },
      { label: "Next stages", value: "Physical Fitness Test, Adaptability Tests I and II, medical" },
      { label: "Given by", value: "Indian Air Force (CASB), online" },
    ],
    basedOn: "the IAF notification for Agniveervayu intake 01/2027 (January 2026), paragraphs 26 to 37",
    source: { name: "Indian Air Force, CASB", url: "https://iafrecruitment.edcil.co.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES` (the landing already calls `classFaqJsonLd("agniveervayu")` and renders `<ExamClassFaq examId="agniveervayu" />`):
```ts
  agniveervayu: "an Agniveer Vayu coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"agniveervayu"`.

## lib/tigerAssets.ts
No tiger set: borrow one through `BORROWED_SETS` if the integrator wants a mascot (the Army `agniveer` set if it has
one, else the DMV fallback). Nothing else beyond registering for `lib/sitemaps.ts`, `app/og/[examId]/route.tsx` and
`lib/llmsTxt.ts`. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section after Agniveer Army (or after RRB Group D):
```md
- **Agniveer Vayu** (`/agniveer-vayu`, landing `/agniveer-vayu-practice-test`, `[data-theme="agniveervayu"]` air force blue, region IN, hub group "India government job exams"): the Indian Air Force Agniveervayu (Agnipath) Phase I online test, Science subjects only, on the intake 01/2027 notification (January 2026; intake 02/2027, exam 22 and 23 September 2026, keeps it): 60 minutes on English, Physics and Mathematics to the 10+2 CBSE syllabus, +1 per right answer and 0.25 off per wrong one, bilingual except English, normalised marks, state-wise cut-offs, then PFT, Adaptability Tests I and II and medical. The notification gives no counts; guides report 70 questions, English 20, Physics 25, Maths 25, the split modelled. Three sections that are the subjects (`eng` 20 in 15 min, `phy` 25 in 22, `math` 25 in 23; the real test is one 60-minute clock), two mock tests, Test 2 held out, 8 drills (`agniveervayuGrammar`, `agniveervayuReading`, `agniveervayuMechanics`, `agniveervayuHeatOptics`, `agniveervayuElectricity`, `agniveervayuAlgebra`, `agniveervayuGeometry`, `agniveervayuCalculus`; 10/10, 10/7/8, 9/8/8 per test, 8 drill-only each), so the dashboard is 10 steps. Bank `data/v2/agniveervayu/questions.json` (204 original single-answer items, prefix `AGNIVEERVAYU-`, object form with reading stimuli `AGNIVEERVAYU-RC1..3`, KaTeX maths; all-number options sorted and locked) built by `python3 -I tools/next100/agniveervayu/build.py`. Other than Science subjects (English and RAGA, 45 min) and the combined 85-minute option are not modelled. English only. Percent score; negative marking explained in `scoreNote` and on the landing, not applied. Sources in `tools/next100/agniveervayu/sources.md`.
```
