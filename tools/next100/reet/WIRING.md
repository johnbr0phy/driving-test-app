# REET Level 1 (`reet`) wiring for the integrator

v2 exam, template `ctet`. Files written (unique to this exam): `tools/next100/reet/*` (9 domain sources as Python
data, `stimuli.py`, `build.py`, `sources.md`, this file), `data/v2/reet/questions.json` (object form, 201 items,
6 stimuli, prefix `REET-`), `lib/v2/exams/reet.ts` (export `REET`), `lib/v2/banks/reet.ts` (`withStimuli`),
`app/reet/*` (layout, root redirect, dashboard, practice/[n], stats, test/[id], test/[id]/results; copied from
`app/ctet/`), `app/reet-level-1-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/reet/build.py`, then
`python3 -I tools/validate_v2_bank.py reet '{"1": {"cdp": {"1": 15}, "hindi": {"1": 15}, "english": {"1": 15}, "maths": {"1": 15}, "evs": {"1": 15}}, "2": {"cdp": {"1": 15}, "hindi": {"1": 15}, "english": {"1": 15}, "maths": {"1": 15}, "evs": {"1": 15}}}'`
(201 questions, 6 stimuli, 0 problems; key strictly longest 29/196 singles = 15%; 20 all-number items sorted and
locked, key in an end slot in 10). I ran a copy of the validator that skips the `bankSizes.ts` write, so add the
line below by hand.

Shape: five sections (`cdp`, `hindi`, `english`, `maths`, `evs`), each one module of 15 items in 15 minutes
(75 in 75, the real pace of 150 in 2 hours 30 minutes), no break; two tests, Test 2 held out; 9 drills, one per
domain (`reetCdp` 15, `reetHindi` 10, `reetHindiPed` 5, `reetEnglish` 10, `reetEnglishPed` 5, `reetMaths` 10,
`reetMathsPed` 5, `reetEvs` 10, `reetEvsPed` 5 per test; 51 drill-only), so the dashboard is 11 steps. No Basics,
no premium. Each test has one Hindi passage (5 items, `REET-H1`/`H2`) and one English passage (5 items,
`REET-E1`/`E2`); the drills have short ones (`REET-HD`, `REET-ED`, 3 items each).

Decisions to check:
- **Official notice (reviewer, 2026-11-01).** rajeduboard.rajasthan.gov.in still refuses connections, but the
  board's short notice (No. 01/2024, 12 Dec 2024) loads from the REET exam CDN and the detailed notice
  (reet2024final121224.PDF) was read from a Scribd copy. Confirmed: 150 one-mark MCQs, 2.5 hours, five parts of 30,
  four options in the paper and a fifth OMR bubble E for "not answering"; a question with no bubble filled loses
  1/3 mark, more than 10% left with no bubble disqualifies; no deduction for wrong answers is stated; qualifying
  60% general, 55% SC/OBC/MBC/EWS/ST (36% ST in TSP), 50% widows/divorcees/ex-servicemen, 40% PwD, 36% Sahariya;
  paper bilingual Hindi/English except languages; certificate valid for life. Copy now states these as the
  notification's rules.
- **Rajasthan GK**: REET Level 1 has no separate GK part (that is REET Mains, RSSB). Guides list Rajasthan's fairs,
  festivals, crafts and tourist places in Level 1 EVS, so about 14 EVS items are Rajasthan facts (static only). Checked
  against `rajpolice` and every India bank; the reviewer replaced Keoladeo (rrbgroupd), Sambhar (delhipolice) and
  the Indira Gandhi Canal (mppolice) with Tal Chhapar, Kalbelia and Ana Sagar.
- **Language choice**: Hindi as Language I and English as Language II (the most common pair). Hindi items are in
  Devanagari with English explanations, as in `uppolice`; no native-speaker review yet, worth a read.
- **Hue**: the brief suggested 40 45% 34%, which clashes with notary (35 45% 36%) and cscs (46 50% 34%). I used
  **40 25% 34%** (sandstone brown) in the config: vs notary 20 points less saturated, cscs 25, praxis (48 40% 28%)
  15, rajpolice and cawhmis 37. Change both places if you pick another.
- **Overlap with `uptet`** (written at the same time, same syllabus shape): I compared against uptet's bank as it
  stood on 2026-11-01 and rewrote every REET item that shared a fact and answer (Erikson, Pavlov, Kohler, Maslow,
  Spearman, readiness, plateau, Ebbinghaus, transfer, RTE sections, RPwD, Bloom, Dewey, LSRW, look-and-say,
  dictation, reading aloud, textbook, survey, concept map, inquiry, gender pictures, tangram, maths lab, inductive
  method, passive and narration items, LCM/decimal numbers). uptet also has a potter passage; mine was replaced by
  a quilt (गुदड़ी) passage. Re-run a stem comparison after both land.
- Screenshots still needed: `public/landing/reet-mobile.png`, `reet-desktop.png` (+ dark), drill key `cdp`.

## lib/v2/bankSizes.ts
```ts
  reet: 201,
```

## lib/v2/registry.ts
```ts
import { REET } from "./exams/reet";
// EXAMS_V2: add REET next to CTET (and UPTET)
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ CTET, REET, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/reet";          // classQuestions.ts
import '@/lib/v2/banks/reet';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `REET.domainLabels` (keys `reetCdp`, `reetHindi`, `reetHindiPed`, `reetEnglish`,
`reetEnglishPed`, `reetMaths`, `reetMathsPed`, `reetEvs`, `reetEvsPed`).

## app/globals.css
Light only; run `tools/gen_dark_brand_css.py` for the `.dark` tint.
```css
  /* REET Level 1 theme: Rajasthan sandstone brown (v2 exam; matches lib/v2/exams/reet.ts theme) */
  [data-theme="reet"] {
    --brand: 40 25% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 40 25% 96%;
    --brand-hover: 40 25% 30%;
    --brand-dark: 40 25% 24%;
    --brand-darker: 40 22% 16%;
    --brand-muted: 40 15% 72%;
    --brand-border: 40 18% 80%;
    --brand-border-light: 40 18% 90%;
    --brand-gradient-to: 30 25% 96%;
  }
```

## lib/shareCards.ts
```ts
  "reet": {
    "color": "hsl(40, 25%, 34%)",
    "tint": "hsl(40, 25%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  reet: { title: "REET Level 1 (Classes 1 to 5)", description: "Practise child development and pedagogy, Hindi, English, maths and EVS with Rajasthan, with content and pedagogy questions." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the IN line
  reet: "IN",
// NON_DRIVING_TESTS: add
  "reet",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  reet: "Rajasthan Eligibility Examination for Teachers, Level 1 for Classes 1 to 5. Child Development and Pedagogy, Hindi and English with unseen passages, Mathematics and EVS with Rajasthan's culture and environment, each with content and pedagogy questions.",
// EXAM_ORG
  reet: "BSER (Rajasthan) · REET Level 1 eligibility test",
// SEARCH_ALIASES
  reet: "reet reet level 1 reet level i reet pre reet mock test reet practice set rajasthan eligibility examination for teachers rajasthan tet rtet teacher eligibility test rbse bser primary teacher third grade teacher cdp hindi pedagogy evs rajasthan india",
// RELATED_OVERRIDES (if the group would otherwise be thin)
  reet: ["ctet", "uptet", "rajpolice"],
```
Hub group "India government job exams": add `"reet"` after `"ctet"` (and `"uptet"`):
```ts
  { title: "India government job exams", ids: [/* ..., */ "ctet", "uptet", "reet"] },
```

## lib/examFacts.ts
```ts
  reet: {
    answer:
      "REET Level 1 is the Rajasthan Eligibility Examination for Teachers of Classes 1 to 5, conducted by the Board of Secondary Education, Rajasthan. Under the REET 2024 notification (exam held 27 and 28 February 2025), it has 150 one-mark multiple-choice questions in 2 hours 30 minutes, in five parts of 30: Child Development and Pedagogy, Language I, Language II, Mathematics and Environmental Studies. Each question has four options, and the OMR sheet has a fifth bubble, E, for a question the candidate chooses not to answer; a question with no bubble filled loses one-third of a mark, more than 10 percent left with no bubble disqualifies, and no deduction is set for a wrong answer. General candidates qualify with 60 percent and SC, OBC, MBC, EWS and ST candidates with 55 percent, with lower marks for some other groups, and the certificate is valid for life. No new REET notice had been published as of November 2026.",
    rows: [
      { label: "Questions", value: "150 MCQs, 1 mark each" },
      { label: "Time", value: "2 hours 30 minutes" },
      { label: "Parts", value: "CDP, Language I, Language II, Maths, EVS (30 each)" },
      { label: "Negative marking", value: "1/3 mark for a question with no bubble filled (E = not answering); none for wrong answers" },
      { label: "Qualifying mark", value: "60% general; 55% SC, OBC, MBC, EWS, ST (36% ST in TSP areas)" },
      { label: "Latest exam", value: "REET 2024, held 27 and 28 February 2025" },
      { label: "Certificate", value: "Valid for life" },
      { label: "Conducted by", value: "Board of Secondary Education, Rajasthan (BSER)" },
    ],
    basedOn: "the board's REET 2024 notification No. 01/2024 of 12 December 2024, checked November 2026",
    source: { name: "Board of Secondary Education, Rajasthan", url: "https://rajeduboard.rajasthan.gov.in/" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`:
```ts
  reet: "a REET or BSTC coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"reet"` (D.El.Ed/BSTC colleges and coaching institutes run REET batches).

## lib/tigerAssets.ts
`BORROWED_SETS`: `reet: "ctet"` if CTET has its own set (uptet borrows it too); otherwise nothing (DMV tiger).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add in the v2 section next to CTET:
```md
- **REET Level 1** (`/reet`, landing `/reet-level-1-practice-test`, `[data-theme="reet"]` sandstone brown, region IN, hub group "India government job exams"): the Rajasthan Eligibility Examination for Teachers, Level 1 (Classes 1 to 5), conducted by the Board of Secondary Education, Rajasthan (REET 2024 notification No. 01/2024 of 12 December 2024: 150 one-mark MCQs in 2.5 hours, five parts of 30, CDP, Language I, Language II, Maths, EVS; four options per question plus a fifth OMR bubble E for not answering, a question with no bubble losing 1/3 mark and more than 10% blank disqualifying, no deduction for wrong answers, explained, not scored; 60% to qualify for general candidates, 55% for SC, OBC, MBC, EWS and ST). Modelled with all five sections, Hindi as Language I and English as Language II, each 15 questions in 15 minutes (75 in 75, the real pace), two tests with Test 2 held out, 9 drills (`reetCdp`, `reetHindi`, `reetHindiPed`, `reetEnglish`, `reetEnglishPed`, `reetMaths`, `reetMathsPed`, `reetEvs`, `reetEvsPed`; 15, 10/5, 10/5, 10/5, 10/5 per test, 51 drill-only), 11 dashboard steps. EVS includes Rajasthan's fairs, festivals, dances, crafts, wildlife and water systems (static facts). Hindi items are in Devanagari with English explanations; three Hindi and three English original passages as stimuli (`REET-H1/H2/HD`, `REET-E1/E2/ED`). Bank `data/v2/reet/questions.json` (201 original items, prefix `REET-`, object form) built by `python3 -I tools/next100/reet/build.py` (key first; all-number options sorted and locked). Kept clear of the ctet, uptet and rajpolice banks. Sources in `tools/next100/reet/sources.md`.
```
