# ITIL 4 Foundation (`itil`) wiring for the integrator

v2 exam, modelled on AWS CCP / AWS SAA. Files already written (unique to this exam):
`tools/itil/*` (6 domain sources as Python data, `build.py` copied from `tools/awssaa/build.py`, `sources.md`),
`data/v2/itil/questions.json` (plain array, 160 items, prefix `ITIL-`), `lib/v2/exams/itil.ts` (export `ITIL`),
`lib/v2/banks/itil.ts` (`plainBank`), `app/itil-4-foundation/*` (layout, root redirect, dashboard,
practice/[n], test/[id], test/[id]/results; copied from `app/pmp/`), `app/itil-4-foundation-practice-test/page.tsx`.

Rebuild: `python3 -I tools/itil/build.py`, then
`python3 -I tools/validate_v2_bank.py itil '{"1": {"itil": {"1": 40}}, "2": {"itil": {"1": 40}}}'`
(passes: 160 questions, 0 stimuli, 0 problems; key strictly longest 14/160 = 8.8%). Do not add `itil` to
`tools/build_v2_bank.py` PLANS: it has its own build.

Screenshots still needed: `public/landing/itil-mobile.png`, `itil-desktop.png` (+ `-dark`).
The landing has no `ExamLandingBreadcrumbs` (the component is not in this tree; the PMP template does not use it).

## lib/v2/bankSizes.ts
```ts
  itil: 160,
```

## lib/v2/registry.ts
```ts
import { ITIL } from "./exams/itil";
// EXAMS_V2: add ITIL after PMP
export const EXAMS_V2: ExamV2Config[] = [/* ..., */ AWS, PMP, ITIL, /* ... */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the pmp bank import:
```ts
import "@/lib/v2/banks/itil";          // classQuestions.ts
import '@/lib/v2/banks/itil';          // mcpV2Practice.ts
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `ITIL.domainLabels` (keys `itilConcepts`, `itilPrinciples`, `itilSystem`,
`itilPracticePurpose`, `itilChangeImprove`, `itilSupport`).

## app/globals.css
Light block (run `tools/gen_dark_brand_css.py` for the `.dark` tint). Suggested hue 38 (dark ochre/amber),
between AWS 20 and the 76-103 olive/green range; re-pick if it clashes.
```css
  /* ITIL 4 Foundation theme: dark ochre (v2 exam; matches lib/v2/exams/itil.ts theme) */
  [data-theme="itil"] {
    --brand: 38 78% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 38 80% 95%;
    --brand-hover: 38 78% 29%;
    --brand-dark: 38 78% 26%;
    --brand-darker: 38 70% 14%;
    --brand-muted: 38 40% 70%;
    --brand-border: 38 50% 78%;
    --brand-border-light: 38 55% 89%;
    --brand-gradient-to: 48 80% 95%;
  }
```

## lib/shareCards.ts
```ts
  "itil": {
    "color": "hsl(38, 78%, 34%)",
    "tint": "hsl(38, 80%, 95%)"
  },
```

## lib/shareCardCopy.ts
```ts
  itil: { title: "ITIL 4 Foundation", description: "Practice the 40-question ITIL 4 Foundation exam: guiding principles, the value chain and the ITIL practices." },
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line
  pmp: "GLOBAL", itil: "GLOBAL",
```
Not in `NON_DRIVING_TESTS` (GLOBAL tests are listed in every country).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  itil: "PeopleCert ITIL 4 Foundation: 40 questions in 60 minutes with a 65 percent pass line. Key concepts, the seven guiding principles, the four dimensions, the service value chain and the ITIL practices, weighted like the real syllabus.",
// EXAM_ORG
  itil: "PeopleCert · ITIL 4 Foundation syllabus",
// SEARCH_ALIASES
  itil: "itil itil4 itil 4 foundation itil v4 itil v5 itil version 5 peoplecert axelos it service management itsm service desk incident problem change management certification",
```
Hub group "Business and project management" (spec row 23), after `pmp`:
```ts
  { title: "Business and project management", ids: ["pmp", "itil", /* psm, capm ... */] },
```

## lib/examFacts.ts
```ts
  itil: {
    answer:
      "The ITIL 4 Foundation exam has 40 multiple-choice questions in 60 minutes. It is closed book and the pass mark is 65 percent, 26 of 40, with no negative marking. It covers key service management concepts, the seven guiding principles, the four dimensions, the service value system and value chain, the purpose of 15 practices and seven practices in detail. PeopleCert released ITIL (Version 5) in early 2026 and still offers ITIL 4 Foundation alongside it; its current plan is to retire all ITIL 4 modules on 31 December 2027.",
    rows: [
      { label: "Questions", value: "40 multiple choice, one answer each" },
      { label: "Time", value: "60 minutes, closed book" },
      { label: "Pass mark", value: "65 percent (26 of 40)" },
      { label: "Biggest area", value: "Seven practices in detail, 17 of 40 marks" },
      { label: "Prerequisites", value: "None" },
      { label: "Newer version", value: "ITIL (Version 5) since early 2026; ITIL 4 modules planned to retire 31 December 2027" },
      { label: "Given by", value: "PeopleCert, online or at a test centre" },
    ],
    basedOn: "the ITIL 4 Foundation candidate syllabus, PeopleCert's exam page and PeopleCert's ITIL FAQ (checked October 2026)",
    source: { name: "PeopleCert", url: "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-4-foundation-2565" },
  },
```

## components/exam/ExamClassFaq.tsx
In `TEACHES`, near `pmp`:
```ts
  itil: "an IT service management course",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"itil"` after `"pmp"`.

## lib/tigerAssets.ts, lib/sitemaps.ts, app/og/[examId]/route.tsx, lib/llmsTxt.ts
Nothing beyond registering (no tiger set; the rest read `EXAMS_V2` and the catalog). Bump the exams date in
`lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the PMP bullet in the v2 section:
```md
- **ITIL 4 Foundation** (`/itil-4-foundation`, landing `/itil-4-foundation-practice-test`, `[data-theme="itil"]` dark ochre, region GLOBAL, hub group "Business and project management"): PeopleCert ITIL 4 Foundation, 40 single-answer items in 60 minutes, closed book, 65% (26 of 40). Two full-length 40-item tests, Test 2 held out, 6 drills by syllabus learning outcome (`itilConcepts` 5, `itilPrinciples` 6, `itilSystem` 5 = four dimensions 2 + SVS 1 + value chain 2, `itilPracticePurpose` 7, `itilChangeImprove` 8 and `itilSupport` 9 = the 17 marks of the seven practices in detail), 80 drill-only items, so the dashboard is 8 steps. Bank `data/v2/itil/questions.json` (160 original items, prefix `ITIL-`, plain array) built from `tools/itil/` by its own `tools/itil/build.py` (Python-data sources, key authored first, shuffled by a stem seed). ITIL (Version 5) was released in early 2026 and runs in parallel with ITIL 4; PeopleCert's ITIL FAQ (peoplecert.org/help-and-support/faq-itil) gives a current plan to sunset all ITIL 4 modules on 31 December 2027. The landing says so and the bank is ITIL 4 only. Sources in `tools/itil/sources.md`.
```
