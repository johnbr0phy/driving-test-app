# REx-PN (`rexpn`) wiring for the integrator

v2 exam, mirrors NCLEX-PN. Files already written (unique to this exam):
`tools/rexpn/*` (8 domain sources, `build.py`, `sources.md`), `data/v2/rexpn/questions.json`,
`lib/v2/exams/rexpn.ts` (export `REXPN`), `lib/v2/banks/rexpn.ts`, `app/rex-pn/*` (6 wrappers copied
from `app/nclex-pn/`), `app/rex-pn-practice-test/page.tsx`.

Rebuild: `python3 -I tools/rexpn/build.py`, then
`python3 -I tools/validate_v2_bank.py rexpn '{"1": {"rexpn": {"1": 90}}, "2": {"rexpn": {"1": 90}}}'`
(passes: 210 questions, 0 problems; it writes `rexpn: 210` into `lib/v2/bankSizes.ts`).
Do not add `rexpn` to `tools/build_v2_bank.py` PLANS: it has its own build (keys authored first, shuffled by a stem-seeded RNG).

Screenshots still needed: `public/landing/rexpn-mobile.png`, `rexpn-desktop.png` (+ `-dark`), referenced by the landing hero.

## lib/v2/registry.ts
```ts
import { REXPN } from "./exams/rexpn";
// EXAMS_V2: add REXPN right after NCLEXPN
export const EXAMS_V2: ExamV2Config[] = [GED, SAT, ACT, TEAS, HESI, ASVAB, ACCUPLACER, NCLEX, NCLEXPN, REXPN, EMT, PARAMEDIC, SECPLUS, APLUS, AWS, TIMESTABLES /* , ...wave exams */];
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the nclexpn bank import:
```ts
import "@/lib/v2/banks/rexpn";          // classQuestions.ts
import '@/lib/v2/banks/rexpn';          // mcpV2Practice.ts
```

## app/globals.css
After the `[data-theme="nclexpn"]` block (light only; run `tools/gen_dark_brand_css.py` once for the `.dark` tint). Hue 282 (violet) is unused.
```css
  /* REx-PN theme: violet (v2 exam; matches lib/v2/exams/rexpn.ts theme) */
  [data-theme="rexpn"] {
    --brand: 282 55% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 282 60% 96%;
    --brand-hover: 282 55% 37%;
    --brand-dark: 282 55% 30%;
    --brand-darker: 282 50% 16%;
    --brand-muted: 282 35% 72%;
    --brand-border: 282 40% 78%;
    --brand-border-light: 282 35% 88%;
    --brand-gradient-to: 270 55% 96%;
  }
```

## lib/region.ts
```ts
// TEST_REGIONS: add to the CA line
  caon: "CA", caqc: "CA", cabc: "CA", caab: "CA", camb: "CA", rexpn: "CA",
// NON_DRIVING_TESTS: add "rexpn"
export const NON_DRIVING_TESTS = new Set(["timestables", /* ... */ "rexpn"]);
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  rexpn: "REx-PN practice for practical nursing students in Ontario (RPN) and British Columbia (LPN), weighted by the REx-PN test plan: management of care, working with UCPs, consent and privacy, pharmacology and IV therapy, SI lab values and select-all-that-apply items, answered in order like the real CAT.",
// EXAM_ORG
  rexpn: "NCSBN REx-PN test plan · CNO and BCCNM",
// SEARCH_ALIASES
  rexpn: "rex pn rexpn rpn lpn registered practical nurse licensed practical nurse practical nursing exam canada ontario cno british columbia bccnm regulatory exam practical nurse cpnre nclex pn canada sata",
// related tests (the map with timestables: ["sat","act","ged"])
  rexpn: ["capsw", "nclexpn", "casfa"],
```
Hub group: "Canada school and trade tests" (or a Canada health/work group if the integrator splits it); it also fits right after `nclexpn` in "Healthcare certification exams" if Canadian exams are mixed into US groups. Suggest the Canada group.

## lib/examFacts.ts
```ts
  rexpn: {
    answer:
      "The REx-PN (Regulatory Exam - Practical Nurse) is the entry-to-practice exam for Registered Practical Nurses in Ontario and Licensed Practical Nurses in British Columbia, built by NCSBN for those regulators. It is computerized adaptive: you answer 90 to 150 questions, 30 of them unscored pretest items, within four hours, with no going back, and the exam stops once it is 95% certain you are above or below the passing standard. The result is pass or fail, and since January 2026 select all that apply items earn partial credit. Management of Care (18 to 24%) and Pharmacological and Parenteral Therapies (14 to 20%) carry the most questions.",
    rows: [
      { label: "Questions", value: "90 to 150 (30 unscored)" },
      { label: "Time", value: "Up to 4 hours, including breaks" },
      { label: "Format", value: "Computerized adaptive, no going back" },
      { label: "Result", value: "Pass or fail" },
      { label: "Fee", value: "350 CAD plus tax per attempt (paid to Pearson VUE)" },
      { label: "Retakes", value: "Wait at least 60 days between attempts" },
      { label: "Who writes it", value: "RPN applicants (CNO, Ontario) and LPN applicants (BCCNM, British Columbia)" },
    ],
    basedOn: "the NCSBN REx-PN Test Plan (effective January 2022, revised 2025)",
    source: { name: "NCSBN REx-PN", url: "https://www.ncsbn.org/publications/2022-rexpn-test-plan" },
  },
```

## components/exam/ExamClassFaq.tsx
Under the healthcare programs, after `nclexpn`:
```ts
  rexpn: "a practical nursing program",
```

## components/TeachNudge.tsx
`TEACHER_LED`, healthcare line: add `"rexpn"` after `"nclexpn"`.

## lib/sitemaps.ts, app/og/[examId]/route.tsx
Nothing: both read `EXAMS_V2`, so registering `REXPN` adds `/rex-pn-practice-test` to the exams sitemap and `/og/rexpn`. Bump the exams date in `lib/seoDates.ts` with the wave.

## lib/tigerAssets.ts
Nothing (no tiger set; falls back to the DMV tiger like other new exams). If Canadian exams borrow, `rexpn: "nclexpn"` in `BORROWED_SETS` would give it the NCLEX-PN tiger.

## CLAUDE.md
Add after the NCLEX-PN bullet in the v2 section:
```md
- **REx-PN** (`/rex-pn`, landing `/rex-pn-practice-test`, `[data-theme="rexpn"]` violet, region CA): the Canadian practical nurse entry-to-practice exam (RPNs with CNO in Ontario, LPNs with BCCNM in BC), built like NCLEX-PN: one linear section (no going back) of 90 items in 180 min (the real exam's minimum length; the real limit is 4 hours for up to 150), two practice tests with Test 2 held out, 8 drills, one per Client Needs category (`rexpnCare`, `rexpnSafety`, `rexpnHealth`, `rexpnPsych`, `rexpnComfort`, `rexpnPharm`, `rexpnRisk`, `rexpnPhys`), no Basics. Bank `data/v2/rexpn/questions.json` (210 original items, prefix `REXPN-`: pools 42/28/20/24/20/34/23/19, per test 19/12/8/10/8/15/10/8, 30 drill-only) weighted by the NCSBN REx-PN Test Plan (effective January 2022, revised 2025: Management of Care 18-24%, Safety and Infection Control 10-16%, Health Promotion 6-12%, Psychosocial 8-14%, Basic Care 6-12%, Pharmacological and Parenteral Therapies 14-20%, Reduction of Risk 8-14%, Physiological Adaptation 6-12%), built from `tools/rexpn/` by its own `tools/rexpn/build.py` (same id scheme as `build_v2_bank.py`; sources list keys first and the build shuffles options by a stem seed). Formats are the REx-PN's own: multiple choice, SATA, fill-in-the-blank calculation (5 per test, drip and pump rates, tablets, mL, mg/kg) and exhibit items (a table in `passage`); no NGN case studies. Canadian practice: SI units, Canadian drug names, UCPs/PSWs, consent, privacy and substitute decision-makers stated as varying by province. Percent-correct score, all or nothing (the real exam gives SATA partial credit from January 2026). Sources in `tools/rexpn/sources.md`.
```
