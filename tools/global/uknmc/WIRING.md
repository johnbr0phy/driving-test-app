# NMC CBT (`uknmc`) wiring for the integrator

v2 exam (Part A needs typed numeric answers). Files already written (unique to this exam):
`tools/uknmc/*` (10 domain sources `src_<domain>.py`, `build.py`, `sources.md`),
`data/v2/uknmc/questions.json` (built), `lib/v2/exams/uknmc.ts` (export `UKNMC`),
`lib/v2/banks/uknmc.ts`, `app/nmc-cbt/*` (6 wrappers copied from `app/rex-pn/`),
`app/nmc-cbt-practice-test/page.tsx`.

Rebuild: `python3 -I tools/uknmc/build.py`, then
`python3 -I tools/validate_v2_bank.py uknmc '{"1": {"nmcA": {"1": 15}, "nmcB": {"1": 100}}, "2": {"nmcA": {"1": 15}, "nmcB": {"1": 100}}}'`
(passes: 272 questions, 0 problems). Do not add `uknmc` to `tools/build_v2_bank.py`: it has its own
build (Python tuple sources, key listed first, options shuffled by a stem seed).

Screenshots still needed: `public/landing/uknmc-mobile.png`, `uknmc-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  uknmc: 272,
```

## lib/v2/registry.ts
```ts
import { UKNMC } from "./exams/uknmc";
// EXAMS_V2: add UKNMC after REXPN
... NCLEX, NCLEXPN, REXPN, UKNMC, EMT, ...
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
```ts
import "@/lib/v2/banks/uknmc";
```

## app/globals.css
Light block (then run `tools/gen_dark_brand_css.py` for the `.dark` tint). Hue 214 is a darker NHS-style
blue; blues are crowded (nclex, 205-212 blocks), so re-pick if it clashes. The exam config's
`theme` uses the same triplets; keep them in step.
```css
  /* NMC CBT theme: NHS-style blue (v2 exam; matches lib/v2/exams/uknmc.ts theme) */
  [data-theme="uknmc"] {
    --brand: 214 80% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 214 80% 96%;
    --brand-hover: 214 80% 29%;
    --brand-dark: 214 80% 24%;
    --brand-darker: 214 70% 14%;
    --brand-muted: 214 40% 70%;
    --brand-border: 214 45% 78%;
    --brand-border-light: 214 40% 88%;
    --brand-gradient-to: 205 70% 96%;
  }
```

## lib/shareCards.ts
```ts
  "uknmc": {
    "color": "hsl(214, 80%, 34%)",
    "tint": "hsl(214, 80%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  uknmc: { title: "NMC CBT: UK Nursing Registration", description: "Review numeracy, the NMC Code, NEWS2, consent, safeguarding and safe UK nursing care." },
```

## lib/region.ts
```ts
// TEST_REGIONS, UK line
  ukcare: "UK", uknmc: "UK",
// NON_DRIVING_TESTS: add "uknmc"
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  uknmc: "NMC CBT practice for internationally educated nurses joining the UK register: Part A numeracy with typed answers and a calculator, and Part B clinical questions on the NMC Code, NEWS2, the Mental Capacity Act, safeguarding and safe UK care, weighted by the seven platforms.",
// EXAM_ORG
  uknmc: "NMC Test of Competence Part 1 · adult nursing, Pearson VUE",
// SEARCH_ALIASES
  uknmc: "nmc cbt nmc computer based test test of competence toc part 1 nmc exam uk nursing registration international nurses overseas nurses ien india philippines nigeria kenya ghana zimbabwe nepal adult nursing numeracy part a part b clinical nhs nurse uk register pearson vue osce",
// related tests
  uknmc: ["nclex", "ukcare", "rexpn"],
```
Hub group: propose a new group "UK healthcare and nursing" holding `["uknmc", "ukcare", "ukfaw"]`
(moved out of "UK workplace and trade certificates"), placed after "UK school tests". If the
integrator prefers not to move ukcare/ukfaw, add `uknmc` first in "UK workplace and trade certificates".

## lib/examFacts.ts
```ts
  uknmc: {
    answer:
      "The NMC computer-based test (CBT) is Part 1 of the Test of Competence that nurses educated outside the UK take to join the Nursing and Midwifery Council register; the practical OSCE is Part 2. It is one sitting of 115 questions in 3 hours at a Pearson VUE test centre: Part A, 15 numeracy questions with typed answers in 30 minutes, and Part B, 100 four-option clinical questions in 2 hours 30 minutes mapped to the seven platforms of the NMC Future Nurse standards. Each part is passed or failed on its own: Part A needs 13 of 15 (87%), and Part B pass marks are generally 60% to 70% depending on the field of nursing.",
    rows: [
      { label: "Questions", value: "115: 15 numeracy (Part A) and 100 clinical (Part B)" },
      { label: "Time", value: "3 hours: 30 minutes for Part A, 2 hours 30 minutes for Part B" },
      { label: "Pass mark", value: "Part A 13 of 15 (87%); Part B generally 60% to 70%" },
      { label: "Calculator", value: "On-screen calculator for numeracy" },
      { label: "Fee", value: "83 GBP (resit Part A 50 GBP, Part B 70 GBP)" },
      { label: "Attempts", value: "3 per application, at least 10 days apart" },
      { label: "Where", value: "Pearson VUE test centres in most countries" },
    ],
    basedOn: "the NMC Test of Competence 2021 nursing test specification and adult nursing blueprint, and the CBT candidate information booklet (April 2025)",
    source: { name: "Nursing and Midwifery Council", url: "https://www.nmc.org.uk/registration/joining-the-register/toc/toc-2021/cbt/" },
  },
```

## components/exam/ExamClassFaq.tsx and components/TeachNudge.tsx
Optional. The landing does not render `ExamClassFaq` (five FAQs only). If the integrator wants it for
NHS trusts and agencies that run CBT prep for overseas recruits: `uknmc: "CBT preparation for internationally recruited nurses",`
in `TEACHES`, `"uknmc"` in `TEACHER_LED`, then add `<ExamClassFaq examId="uknmc" />` and
`classFaqJsonLd("uknmc")` to the landing.

## lib/tigerAssets.ts
Nothing (no reviewed tiger set; falls back to the DMV tiger). `BORROWED_SETS` could give it `"nclex"`.

## lib/sitemaps.ts, app/og/[examId]/route.tsx
Nothing: both read `EXAMS_V2`. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the REx-PN bullet in the v2 section:
```md
- **NMC CBT** (`/nmc-cbt`, landing `/nmc-cbt-practice-test`, `[data-theme="uknmc"]` NHS-style blue, region UK): the NMC Test of Competence Part 1 for internationally educated nurses joining the UK register (adult nursing). One sitting, two sections with no break, free navigation and flagging: Part A Numeracy (`nmcA`, 15 typed numeric items in 30 min, calculator on, real pass 13/15) and Part B Clinical (`nmcB`, 100 four-option items in 150 min, real pass generally 60-70%). Two practice tests, Test 2 held out, 8 drills (numeracy; accountable; health; assess; provide; lead + coordinating; safety; communication + procedures), so the dashboard is 10 steps. Bank `data/v2/uknmc/questions.json` (272 original items, prefix `NMC-`: numeracy 15/test + 10 drill-only; Part B per test by the ToC 2021 nursing test specification, P1 17, P2 10, P3 14, P4 15, P5 10, P6 10, P7 10, Annexe A 7, Annexe B 7, plus 32 drill-only), built from Python tuple sources in `tools/uknmc/` by its own `tools/uknmc/build.py` (key first, stem-seeded shuffle). UK practice only: the NMC Code, NEWS2, NICE, Mental Capacity Act, Care Act, micrograms in full, 20 drops/mL giving sets. Composite is overall percent; `scoreNote` says each real part is passed separately. Sources in `tools/uknmc/sources.md`.
```
