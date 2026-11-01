# AP U.S. Government and Politics (`apgov`) wiring for the integrator

v2 exam, built on the AP U.S. History template (one section, one module, percent score, shared stimuli).
Files already written (unique to this exam):
`tools/next100/apgov/*` (`build.py`; sources as Python data, one file per domain: `u1.py`, `congress.py`,
`courts.py`, `u3.py`, `u4.py`, `voting.py`, `groups.py`; `sources.md`),
`data/v2/apgov/questions.json` (object form `{ stimuli, questions }`, 201 questions, 27 stimuli),
`lib/v2/exams/apgov.ts` (export `APGOV`), `lib/v2/banks/apgov.ts` (`withStimuli`),
`app/ap-us-government/*` (layout, root redirect, dashboard, practice/[n], test/[id], test/[id]/results, stats; copied from `app/ap-us-history/`),
`app/ap-us-government-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/apgov/build.py`, then (from a /tmp copy, since the validator rewrites bankSizes)
```
python3 -I tools/validate_v2_bank.py apgov '{"1": {"mcq": {"1": 55}}, "2": {"mcq": {"1": 55}}}'
```
(passes: 201 questions, 27 stimuli, 0 problems). Do not add `apgov` to `tools/build_v2_bank.py` PLANS.

Shape: one section `mcq`, one 55-item module in 80 minutes per test (the real Section I at full length and pace),
in unit order with every set kept together; two tests with Test 2 held out; 7 drills (Unit 1, Unit 2 split into
Congress/presidency and courts/bureaucracy, Unit 3, Unit 4, Unit 5 split into voting/parties and
campaigns/groups/media), so 7 + 2 = 9 dashboard steps. All items `single` with four options. Per test: 30
individual questions, five hypothetical data tables (12 questions), two text sets (a foundational document
excerpt, 4; a practice text, 3) and three visuals described in words (2 each), like the CED. 7 items use
`lockedOrder` (4 all-number, 3 label lists). Key strictly longest: 3/196 = 2%; key strictly shortest 13%.
Not Premium, no Basics. Screenshots still needed: `public/landing/apgov-mobile.png`, `apgov-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  apgov: 201,
```

## lib/v2/registry.ts
```ts
import { APGOV } from "./exams/apgov";
// EXAMS_V2: after APUSH
export const EXAMS_V2: ExamV2Config[] = [GED, PRAXIS, SAT, PSAT, ACT, APPSYCH, APUSH, APGOV, APWORLD, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the apush bank import:
```ts
import "@/lib/v2/banks/apgov";      // classQuestions.ts
import '@/lib/v2/banks/apgov';      // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: domain labels live in `APGOV.domainLabels` (keys `apgovFoundations`, `apgovCongress`, `apgovCourts`,
`apgovRights`, `apgovIdeology`, `apgovVoting`, `apgovCampaigns`).

## app/globals.css
HUE: the brief's `0 35% 36%` clashes with apush (`0 25% 38%`: hue 0, saturation 10, lightness 2), aursa
(`352 40% 30%`) and rrbgroupd (`6 45% 36%`). I used `5 30% 30%` in `lib/v2/exams/apgov.ts`, a deep brick: from
apush hue 5, lightness 8 (clear); rrbgroupd saturation 15; barber (`4 60% 31%`) saturation 30; casfa, sgbtt,
aufirstaid, cet, paramedic all 15+ saturation or 8+ lightness away; aursa and cdcfib (`15 35% 32%`, batch 5) 10+
degrees. Checked against all 190 themes in globals.css and every WIRING.md. White text on it is about 9.6:1.
Run `tools/gen_dark_brand_css.py` after.
```css
  /* AP U.S. Government and Politics theme: deep brick (v2 exam; matches lib/v2/exams/apgov.ts theme) */
  [data-theme="apgov"] {
    --brand: 5 30% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 5 30% 96%;
    --brand-hover: 5 30% 26%;
    --brand-dark: 5 30% 24%;
    --brand-darker: 5 30% 14%;
    --brand-muted: 5 15% 70%;
    --brand-border: 5 20% 82%;
    --brand-border-light: 5 20% 91%;
    --brand-gradient-to: 20 30% 96%;
  }
```

## lib/shareCardCopy.ts
```ts
  apgov: { title: "AP US Government Practice Test", description: "Two full 55-question AP Gov multiple-choice sections with data, document and visual sets, plus a drill for every unit." },
```

## lib/region.ts
Nothing in `TEST_REGIONS` (US is the default). Add `"apgov"` to `NON_DRIVING_TESTS` beside `"apworld", "aphug", "aplang", "apcalcab"`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  apgov: "Two full AP U.S. Government and Politics multiple-choice sections: 55 questions with four choices in 80 minutes, about 30 on their own and the rest in sets on data, foundational documents and visuals, weighted across all five units.",
// EXAM_ORG
  apgov: "College Board · AP U.S. Government and Politics, CED effective fall 2026",
// SEARCH_ALIASES
  apgov: "ap us government ap gov ap government and politics apgo ap us gov politics civics advanced placement college board ap exam mcq multiple choice required supreme court cases foundational documents federalist 10 51 70 78 39 brutus 1 constitution bill of rights congress president courts bureaucracy civil liberties civil rights public opinion ideology voting parties interest groups media campaign finance frq scotus comparison argument essay high school",
// RELATED_OVERRIDES
  apgov: ["apush", "apworld", "aphug", "aplang"],
```
Hub group "AP exams": add `"apgov"` after `"apush"`:
```ts
  { title: "AP exams", ids: ["appsych", "apush", "apgov", "apworld", "aphug", "aplang", "apbio", "apcalcab"] },
```
Optionally add `"apgov"` to the apush and apworld `RELATED_OVERRIDES` lists.

## lib/examFacts.ts
```ts
  apgov: {
    answer:
      "The AP U.S. Government and Politics Exam is a fully digital, 3-hour exam from the College Board. Section I has 55 multiple-choice questions in 80 minutes (50% of the score): about 30 stand alone and the rest come in sets on quantitative data, a foundational document or other text, and visuals such as maps and cartoons. Section II has four free-response questions in 100 minutes (50%): concept application, quantitative analysis, SCOTUS comparison and an argument essay. The course has five units and requires 13 foundational documents (four added for 2026-27) and 14 Supreme Court cases. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "55 questions, 80 minutes, 50% of score" },
      { label: "Free response", value: "4 questions, 100 minutes, 50%" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Units", value: "5; Unit 2 (branches) is 25-36% of the multiple choice" },
      { label: "Required content", value: "13 foundational documents, 14 Supreme Court cases" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
      { label: "Given by", value: "College Board, digital in the Bluebook app" },
    ],
    basedOn: "the College Board AP U.S. Government and Politics Course and Exam Description (effective fall 2026), its fall 2026 clarifications and the AP Central exam page",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-united-states-government-and-politics/exam" },
    tigertest:
      "Tigertest has two full 55-question AP U.S. Government and Politics multiple-choice sections and seven drills by unit, all free with no account required. The free-response questions are not included.",
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, after `apush`:
```ts
  apgov: "AP U.S. Government and Politics",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"apgov"` after `"apush"` (an AP Gov or civics teacher sets it).

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger, as apush does).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the AP U.S. History bullet in the v2 section:
```md
- **AP U.S. Government and Politics** (`/ap-us-government`, landing `/ap-us-government-practice-test`, `[data-theme="apgov"]` deep brick (5 30% 30%), region US, hub group "AP exams"): the College Board exam on the Course and Exam Description effective fall 2026 with its fall 2026 clarifications (four required foundational documents added: Federalist No. 39, the Emancipation Proclamation, the Gettysburg Address and Adam Smith's The Wealth of Nations, so 13 documents and 14 required cases; Roe is off the list). Multiple-choice section only (Section I: 55 questions with four choices in 80 minutes, 50% of the score, about 30 individual questions plus five quantitative sets of 2-3, two text sets of 3-4 and three visual sets of 2; the four free-response questions are not modelled). One section `mcq`, one 55-item module at the real pace in unit order, two tests with Test 2 held out, 7 drills (`apgovFoundations`, `apgovCongress`, `apgovCourts`, `apgovRights`, `apgovIdeology`, `apgovVoting`, `apgovCampaigns`; 10/9/8/9/7/6/6 per test, inside the CED unit weights 15-22/25-36/13-18/10-15/20-27), 9 dashboard steps, free, no Basics. 27 stimuli: public-domain foundational document excerpts (labelled adapted), original practice texts, hypothetical data tables (labelled so) and maps, cartoons and infographics described in words; "Letter from a Birmingham Jail" is described, never quoted. Percent score; `scoreNote` says the College Board converts a composite to 1 to 5 each year. Bank `data/v2/apgov/questions.json` (201 items, ids `APGOV-T<n>-NNN`, `APGOV-D-NNN`) built by `python3 -I tools/next100/apgov/build.py` from one Python source per domain (`lock=True` keeps label lists such as President A to D in order). Sources in `tools/next100/apgov/sources.md`.
```
