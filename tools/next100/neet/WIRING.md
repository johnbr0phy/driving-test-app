# NEET (UG) (`neet`) wiring for the integrator

v2 exam, template `nda` (sections). Files already written (unique to this exam):
`tools/next100/neet/*` (9 domain sources as Python data with computed answers asserted, `build.py`, `sources.md`),
`data/v2/neet/questions.json` (plain array, no stimuli), `lib/v2/exams/neet.ts` (export `NEET`),
`lib/v2/banks/neet.ts` (`plainBank`), `app/neet/*` (layout, root redirect, dashboard, practice/[n], stats, test/[id],
test/[id]/results; copied from `app/nda/`), `app/neet-practice-test/page.tsx`.

Rebuild: `python3 -I tools/next100/neet/build.py`, then validate (from a copy that does not write bankSizes):
`python3 -I tools/validate_v2_bank.py neet '{"1": {"phy": {"1": 25}, "chem": {"1": 25}, "bio": {"1": 50}}, "2": {"phy": {"1": 25}, "chem": {"1": 25}, "bio": {"1": 50}}}'`
(passes: 234 questions, 0 stimuli, 0 problems; key strictly longest 16%; 53 sorted all-number items, key in an end
slot 51%; 68 locked items in all, including the NEET Statement I/II and Assertion-Reason option sets, which keep
NEET's fixed order). Do not add `neet` to `tools/build_v2_bank.py` PLANS: it has its own build.

Shape: three sections in the real order at about a minute a question, 100 of the real 180:
`phy` (25 in 30 min: `neetMech` 13, `neetElectro` 12), `chem` (25 in 25 min: `neetPhysChem` 9, `neetInorg` 8,
`neetOrg` 8), `bio` (50 in 45 min: `neetDiversity` 14, `neetGenetics` 14, `neetEcology` 10, `neetHumanPhys` 12),
`breakSeconds: 0`; two tests, Test 2 held out; 9 drills (3 or 4 drill-only items each), so the dashboard is 11 steps.
The real paper has one clock and no subject sections; the subject timing is Tigertest's and is said in the
directions, `scoreNote` and landing FAQ.

Screenshots still needed: `public/landing/neet-mobile.png`, `neet-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  neet: 234,
```

## lib/v2/registry.ts
```ts
import { NEET } from "./exams/neet";
// EXAMS_V2: add NEET after the other India exams (e.g. after NDA)
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the other v2 bank imports:
```ts
import "@/lib/v2/banks/neet";
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `NEET.domainLabels` (keys `neetMech`, `neetElectro`, `neetPhysChem`, `neetInorg`,
`neetOrg`, `neetDiversity`, `neetGenetics`, `neetEcology`, `neetHumanPhys`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). Hue as the brief suggested, 330 40% 40% (muted
berry); matches `NEET.theme`. Checked against existing themes near 330: 330 55% 42% (15 saturation apart),
325 50% 30% (10 lightness), 332 70% 46% and 336 55% 34% (15+ saturation), 340 40% 40% (10 degrees). Batch-4 siblings
not checked.
```css
  /* NEET theme: muted berry (v2 exam; matches lib/v2/exams/neet.ts theme) */
  [data-theme="neet"] {
    --brand: 330 40% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 330 40% 96%;
    --brand-hover: 330 40% 35%;
    --brand-dark: 330 40% 30%;
    --brand-darker: 330 40% 18%;
    --brand-muted: 333 25% 72%;
    --brand-border: 333 25% 80%;
    --brand-border-light: 333 25% 90%;
    --brand-gradient-to: 343 40% 96%;
  }
```

## lib/shareCards.ts
```ts
  "neet": {
    "color": "hsl(330, 40%, 40%)",
    "tint": "hsl(330, 40%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  neet: { title: "NEET Mock Test", description: "Practice Physics, Chemistry and Biology on the NCERT syllabus in timed mock tests at the real pace." },
```

## lib/region.ts
```ts
// TEST_REGIONS
  neet: "IN",
```
Add `"neet"` to `NON_DRIVING_TESTS`.

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  neet: "Mock tests for NEET (UG), India's medical entrance exam: Physics, Chemistry and Biology on the NCERT syllabus at the real pace, with statement and assertion-reason questions and negative marking explained.",
// EXAM_ORG
  neet: "National Testing Agency · NEET (UG), MBBS and BDS entrance",
// SEARCH_ALIASES
  neet: "neet neet ug neet mock test neet practice test nta neet medical entrance mbbs bds entrance neet physics neet chemistry neet biology botany zoology ncert class 11 class 12 pcb aiims neet 2026 neet 2027 neet mcq",
```
Hub group: NEET is a college entrance exam, not a job or defence exam. Suggest a new group after "India school entrance
tests": `{ title: "India college entrance exams", ids: ["neet", "jeemain", "cuet", "mhtcet"] }` (the batch-4 siblings),
or put `"neet"` into "India school entrance tests" if the integrator prefers fewer groups.
RELATED_OVERRIDES (only if the group stays small): `neet: ["jeemain", "mhtcet", "cuet"]`.

## lib/examFacts.ts
```ts
  neet: {
    answer:
      "NEET (UG) is the National Testing Agency's entrance exam for MBBS, BDS, AYUSH and other undergraduate medical courses in India. Per the NEET (UG) 2026 information bulletin it is one pen-and-paper paper of 180 compulsory multiple-choice questions in 180 minutes: Physics 45, Chemistry 45 and Biology (Botany and Zoology) 90, for 720 marks. A correct answer earns 4 marks and a wrong one loses 1. It is offered in 13 languages, and admission needs at least the 50th percentile (40th for SC, ST and OBC candidates).",
    rows: [
      { label: "Questions", value: "180, all compulsory, four options each" },
      { label: "Subjects", value: "Physics 45, Chemistry 45, Biology (Botany and Zoology) 90" },
      { label: "Time", value: "180 minutes (2026 window 2:00 to 5:15 PM including formalities)" },
      { label: "Marks", value: "720" },
      { label: "Marking", value: "+4 correct, -1 wrong, 0 unanswered" },
      { label: "Mode", value: "Pen and paper, one shift" },
      { label: "Languages", value: "13, including English and Hindi" },
      { label: "Qualifying", value: "50th percentile (40th for SC, ST, OBC-NCL)" },
      { label: "Given by", value: "National Testing Agency" },
    ],
    basedOn: "NTA Information Bulletin for NEET (UG) 2026 and NTA notices of 15 May and 12 June 2026 (re-examination held 21 June 2026)",
    source: { name: "National Testing Agency", url: "https://neet.nta.nic.in" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES` (the landing already calls `classFaqJsonLd("neet")` and renders `<ExamClassFaq examId="neet" />`):
```ts
  neet: "a NEET coaching batch",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"neet"` (NEET coaching institutes and school PCB teachers set mock tests).

## lib/tigerAssets.ts
No tiger set yet. Suggest borrowing one through `BORROWED_SETS`: `neet: "nclex"` (medical) or `neet: "ssccgl"`.

## lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering. Bump the exams date in `lib/seoDates.ts` with the wave.

## Decisions to check
- Facts are from the official NEET (UG) 2026 Information Bulletin (full text) and two scanned NTA notices, all
  downloaded from the links on neet.nta.nic.in on 1 November 2026. The 3 May 2026 paper was cancelled and re-held on
  21 June 2026 with a 195-minute window that includes formalities; the copy says "180 minutes" (the bulletin's
  duration) and mentions the 2:00 to 5:15 PM window only as the 2026 sitting's. No NEET 2027 bulletin was out yet.
- Shorter mock (100 of 180 questions) at the real pace; per-subject clocks are Tigertest's, stated in the directions,
  `scoreNote` and landing FAQ.
- Duplicates: every item was checked by stem similarity and same-key matches against all `data/v2/` banks, including
  the in-progress batch-4 banks jeemain and mhtcet, which share the Physics and Chemistry syllabus. About 45 items were
  rewritten during writing; jeemain and mhtcet were still changing while this was done (twice a rewrite landed on the
  same new fact as a sibling's rewrite), so a final family dedupe pass after all three banks settle is worth running.
  Remaining overlaps are generic templates with different numbers or a different answer.

## CLAUDE.md
Add in the v2 section after the India exams:
```md
- **NEET** (`/neet`, landing `/neet-practice-test`, `[data-theme="neet"]` muted berry, borrows a tiger, region IN, hub group "India college entrance exams" or "India school entrance tests"): the National Testing Agency's NEET (UG), the entrance exam for MBBS, BDS and AYUSH courses, per the NEET (UG) 2026 Information Bulletin: one pen-and-paper paper of 180 compulsory four-option questions in 180 minutes (Physics 45, Chemistry 45, Biology 90; 720 marks; +4 / -1; 13 languages; admission from the 50th percentile, 40th for SC, ST and OBC-NCL). The 3 May 2026 paper was cancelled and re-held on 21 June 2026 in a 2:00 to 5:15 PM window including formalities (NTA notices of 15 May and 12 June 2026). Modelled at 100 questions at about a minute each, as three timed sections in the real order: `phy` 25 in 30 min (`neetMech` 13, `neetElectro` 12), `chem` 25 in 25 min (`neetPhysChem` 9, `neetInorg` 8, `neetOrg` 8), `bio` 50 in 45 min (`neetDiversity` 14, `neetGenetics` 14, `neetEcology` 10, `neetHumanPhys` 12); the real paper has one clock, so the subject times are Tigertest's. Two mock tests, Test 2 held out, 9 drills, 11 dashboard steps. Bank `data/v2/neet/questions.json` (234 original single-answer items on the NMC 2026 syllabus, prefix `NEET-`, plain array, including Statement I/II and Assertion-Reason items with NEET's fixed option order) built by `python3 -I tools/next100/neet/build.py` (every numeric answer asserted in the source files; all-number options sorted and locked). Percent score; negative marking explained in `scoreNote` and on the landing, not applied. Sources in `tools/next100/neet/sources.md`.
```
