# JEE Main Paper 1 (`jeemain`) wiring for the integrator

v2 exam, template `nda` (sections) with typed numeric items like `gcsehigher`; `build.py` is copied from
`tools/next100/agniveervayu/build.py` (KaTeX, sorted and locked all-number options) plus a numeric helper `N()`.
Files already written (unique to this exam): `tools/next100/jeemain/*` (9 domain sources as Python data,
`build.py`, `sources.md`), `data/v2/jeemain/questions.json` (plain array, no stimuli), `lib/v2/exams/jeemain.ts`
(export `JEEMAIN`), `lib/v2/banks/jeemain.ts` (`plainBank`), `app/jee-main/*` (layout, root redirect, dashboard,
practice/[n], stats, test/[id], test/[id]/results; copied from `app/nda/`), `app/jee-main-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/jeemain/build.py`, then validate (from a copy that does not write bankSizes):
`python3 -I tools/validate_v2_bank.py jeemain '{"1": {"maths": {"1": 25}, "phy": {"1": 25}, "chem": {"1": 25}}, "2": {"maths": {"1": 25}, "phy": {"1": 25}, "chem": {"1": 25}}}'`
(passes: 204 questions, 0 stimuli, 0 problems). 156 multiple choice and 48 numerical value items
(`format: "numeric"`, `numeric.wholeNumber: true`, non-negative integer answers, each computed in the source and
asserted by `N()`). Key strictly longest 12% of multiple-choice items; 54 all-number items sorted and locked, key
in an end slot 44%; Statement I / Statement II items keep NTA's option order (locked). Do not add `jeemain` to
`tools/build_v2_bank.py` PLANS: it has its own build.

Shape: the full real paper, 75 questions in 3 hours, as three sections in the bulletin's order: `maths`, `phy`,
`chem`, each 25 items in 60 minutes (20 multiple choice, then 5 numerical value), `breakSeconds: 0`, no
calculator. Per test: `jeemainAlgebra` 7+2, `jeemainCalculus` 7+2, `jeemainCoordGeo` 6+1; `jeemainMechanics` 8+2,
`jeemainElectro` 6+2, `jeemainOpticsModern` 6+1; `jeemainPhysical` 6+3, `jeemainInorganic` 7+1, `jeemainOrganic`
7+1 (MCQ + numeric). Two tests, Test 2 held out; 9 drills (6 drill-only items each), so the dashboard is 11 steps.
Percent score; +4/-1 marking and NTA scores explained in `scoreNote` and on the landing, not applied.

Screenshots still needed: `public/landing/jeemain-mobile.png`, `jeemain-desktop.png` (+ `-dark`), e.g.
`jeemain:jee-main:v2:calculus`.

## lib/v2/bankSizes.ts
```ts
  jeemain: 204,
```

## lib/v2/registry.ts
```ts
import { JEEMAIN } from "./exams/jeemain";
// EXAMS_V2: add JEEMAIN with the other India exams (e.g. after NDA)
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/jeemain";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `JEEMAIN.domainLabels` (keys `jeemainAlgebra`, `jeemainCalculus`,
`jeemainCoordGeo`, `jeemainMechanics`, `jeemainElectro`, `jeemainOpticsModern`, `jeemainPhysical`,
`jeemainInorganic`, `jeemainOrganic`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). The brief suggested 20 55% 34%, but that is
5 degrees from `fsmaths` (15 45% 34%: 10 points of saturation, same lightness) and 2 degrees from `biharpolice`
(18 65% 30%: 10 saturation, 4 lightness), so this uses 18 30% 32% (muted terracotta brown); matches
`JEEMAIN.theme`. Checked against fsmaths 15 45% 34%, ffi 22 40% 43%, cacarp 24 50% 30%, biharpolice 18 65% 30%,
caweld 16 85% 32%, ctet 22 80% 28%, auforklift 21 55% 42%, aws 20 90% 41%, paramedic 10 65% 42% and sscmts
26 70% 38%: each is more than 8 degrees away or differs by at least 15 saturation or 8 lightness. Integrator's
call; change `JEEMAIN.theme` to match if you move it.
```css
  /* JEE Main theme: muted terracotta brown (v2 exam; matches lib/v2/exams/jeemain.ts theme) */
  [data-theme="jeemain"] {
    --brand: 18 30% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 18 30% 96%;
    --brand-hover: 18 30% 27%;
    --brand-dark: 18 30% 24%;
    --brand-darker: 18 30% 14%;
    --brand-muted: 21 23% 72%;
    --brand-border: 21 25% 80%;
    --brand-border-light: 21 25% 90%;
    --brand-gradient-to: 31 30% 96%;
  }
```

## lib/shareCards.ts
```ts
  "jeemain": {
    "color": "hsl(18, 30%, 32%)",
    "tint": "hsl(18, 30%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  jeemain: { title: "JEE Main Mock Test", description: "Full 75-question JEE Main Paper 1 mock tests in Mathematics, Physics and Chemistry, with numerical value questions." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  jeemain: "IN",
```
Add `"jeemain"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  jeemain: "Full JEE Main Paper 1 mock tests: 75 questions in 3 hours across Mathematics, Physics and Chemistry, with Section B numerical value questions and negative marking explained.",
// EXAM_ORG
  jeemain: "National Testing Agency · JEE (Main) Paper 1 (B.E./B.Tech.)",
// SEARCH_ALIASES
  jeemain: "jee main mock test jee mains jee main 2027 jee main paper 1 nta jee iit jee engineering entrance b.tech btech be pcm physics chemistry maths mathematics numerical value questions section b jee practice jee online test nit iiit",
```
Hub group: JEE Main is a national engineering entrance exam taken in Class 12. If `neet`, `cuet` and `mhtcet`
land in this batch, create a group "India college entrance exams" with `["jeemain", "neet", "mhtcet", "cuet"]`
(placed after "India government job exams" or before it); otherwise add `"jeemain"` to "GED, college, military
& nursing school entrance". Integrator's call.

## lib/examFacts.ts
```ts
  jeemain: {
    answer:
      "JEE (Main) Paper 1 is the National Testing Agency's computer-based entrance test for B.E. and B.Tech. admission to NITs, IIITs and other centrally funded institutes, and the qualifying test for JEE (Advanced). It has 75 questions for 300 marks in 3 hours: 25 each in Mathematics, Physics and Chemistry, of which 20 are multiple choice (Section A) and 5 need a numerical value typed as an integer (Section B). Every answer earns 4 marks if correct and loses 1 if wrong, in both sections. For 2027 it is held in two sessions, January and April, and the better NTA score counts.",
    rows: [
      { label: "Subjects", value: "Mathematics, Physics, Chemistry (equal weight)" },
      { label: "Questions", value: "75: per subject 20 multiple choice and 5 numerical value" },
      { label: "Time", value: "3 hours" },
      { label: "Marks", value: "300 (100 per subject)" },
      { label: "Marking", value: "+4 correct, -1 wrong in both sections, 0 unanswered" },
      { label: "Result", value: "NTA scores (percentiles); the better of two sessions counts" },
      { label: "2027 sessions", value: "20 to 24 and 28 January, and 2 to 7 April 2027" },
      { label: "Languages", value: "13, including English and Hindi" },
      { label: "Given by", value: "National Testing Agency" },
    ],
    basedOn: "JEE (Main) 2027 Information Bulletin and syllabus, National Testing Agency, published 24 October 2026",
    source: { name: "National Testing Agency", url: "https://jeemain.nta.nic.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES` (the landing already calls `classFaqJsonLd("jeemain")` and renders `<ExamClassFaq examId="jeemain" />`):
```ts
  jeemain: "a JEE coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"jeemain"` (JEE coaching institutes and school PCM teachers set mock tests).

## lib/tigerAssets.ts
No tiger set yet. Suggest borrowing one through `BORROWED_SETS`: `jeemain: "sat"` (entrance exam) or
`jeemain: "gcsehigher"` (maths).

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## Decisions to check
- Facts come from the official JEE (Main) 2027 Information Bulletin PDF (loaded from the s3waas host linked on
  jeemain.nta.nic.in on 1 November 2026), which settles two points guides disagree on: Section B has 5 compulsory
  questions per subject (no optional ones) and carries negative marking (-1).
- Full length (75 in 3 hours); the only liberty is splitting the single 3-hour clock into three 60-minute
  subject sections, said in the section directions and the landing FAQ.
- Numerical value answers are all non-negative integers, so `wholeNumber: true` (digits keypad). The real keypad
  also has a minus sign and a decimal point; the bank never needs them.
- Duplicates: every stem was compared (normalised text similarity) with all India banks in `data/v2/` and with
  sat, act, psat, ged, apbio, apcalcab, gcsehigher, gcsescience and hscmaths, plus a keyword pass on neet and
  mhtcet, which share the class 11-12 PCM syllabus and were being written at the same time. About 45 items that
  matched a neet, mhtcet, nda, agniveervayu, rrbalp, apbio or gcsehigher item's fact and answer were rewritten.
  What remains are generic templates with different numbers or a different fact (local maximum of a different
  cubic, a different metre-bridge balance). If neet or mhtcet change after 1 November, rerun a stem comparison.
- Hue: see the globals.css section.

## CLAUDE.md
Add in the v2 section after the India exams:
```md
- **JEE Main** (`/jee-main`, landing `/jee-main-practice-test`, `[data-theme="jeemain"]` muted terracotta brown, region IN, hub group "India college entrance exams" or "GED, college, military & nursing school entrance"): NTA's JEE (Main) Paper 1 (B.E./B.Tech.) on the 2027 Information Bulletin (24 October 2026; Session 1 on 20 to 24 and 28 January 2027, Session 2 on 2 to 7 April 2027): 75 questions for 300 marks in 3 hours, Mathematics, Physics and Chemistry with 20 multiple-choice (Section A) and 5 numerical value questions (Section B, an integer typed on a keypad) each, +4/-1 in both sections, NTA scores with the better session counting, 13 languages, no calculator. Modelled at full length: three sections `maths`, `phy`, `chem` of 25 in 60 minutes each (the real paper is one 3-hour clock), multiple choice first, then 5 `numeric` items with `wholeNumber`; two mock tests, Test 2 held out, 9 drills, three per subject (`jeemainAlgebra`, `jeemainCalculus`, `jeemainCoordGeo`, `jeemainMechanics`, `jeemainElectro`, `jeemainOpticsModern`, `jeemainPhysical`, `jeemainInorganic`, `jeemainOrganic`; per test 7+2, 7+2, 6+1, 8+2, 6+2, 6+1, 6+3, 7+1, 7+1), so the dashboard is 11 steps. Bank `data/v2/jeemain/questions.json` (204 original items, 48 numerical value, prefix `JEEMAIN-`, plain array, KaTeX) built by `python3 -I tools/next100/jeemain/build.py` (numeric keys computed in the sources and asserted; all-number options sorted and locked; Statement I/II options locked in NTA order). Percent score; negative marking explained in `scoreNote` and on the landing, not applied. Sources in `tools/next100/jeemain/sources.md`.
```
