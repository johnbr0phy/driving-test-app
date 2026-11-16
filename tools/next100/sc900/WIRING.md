# Microsoft SC-900 (`sc900`) wiring for the integrator

v2 exam on the `tools/az900` template. Files written (unique to this exam):
`tools/next100/sc900/*` (build.py adapted from `tools/az900/build.py`, eight domain sources as
Python data with the S/M/YN/MT helpers, sources.md, this file, wiring/),
`data/v2/sc900/questions.json` (plain array, 201 items, prefix `SC900-`),
`lib/v2/exams/sc900.ts` (export `SC900`), `lib/v2/banks/sc900.ts` (`plainBank`),
`app/sc-900/*` (layout, root redirect, dashboard, stats; no test or practice folders),
`app/sc-900-practice-test/page.tsx`.

Exam checked 2026-11-16: the SC-900 study guide shows "Skills measured as of October 21, 2026"
(minor changes only), the certification page has no retirement banner, and the Microsoft Learn
credential retirement list does not include it. (That list shows the Azure Security Engineer
Associate, AZ-500, retired on August 31, 2026; the az500 builder wrote FAILED.md.)

Rebuild: `python3 -I tools/next100/sc900/build.py` (key strictly longest 19/178 single and multi
items = 10.7%; yes/no rows 36 Yes, 36 No; no all-number option sets). Validate from a copy that
does not write bankSizes: `python3 -I tools/validate_v2_bank.py sc900 '{"1": {"sc900": {"1": 50}}, "2": {"sc900": {"1": 50}}}'`
(201 questions, 0 stimuli, 0 problems). `tools/check_option_refs.py --list` prints 0.
`tools/check_sources.py sc900` passes (19 primary pages; run it on Python 3.10+, it uses `X | None`).
Do not add `sc900` to `tools/build_v2_bank.py` PLANS.

Dashboard: 8 drills + 2 tests = 10 steps, no Basics. Premium through PREMIUM_V2_IDS: the registry
locks Practice Test 2 and the last two drills (Compliance Management, Information Protection),
which the landing FAQ says ("every drill but the last two").

Overlap: stems and key-answer pairs checked against az900, secplus, cysa, cissp, netplus, gcdl,
awssaa, aws, ccna and the sc200 bank on disk; only the shared yes/no boilerplate stem matched. One
item that repeated secplus's data sovereignty definition was rewritten to data privacy.

Screenshots still needed: `public/landing/sc900-mobile.png`, `sc900-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  sc900: 201,
```

## lib/v2/registry.ts
```ts
import { SC900 } from "./exams/sc900";
// EXAMS_V2: add SC900 right after AZ900
// PREMIUM_V2_IDS: add "sc900" on the IT line, after "az900"
```

## lib/server/classQuestions.ts
```ts
import "@/lib/v2/banks/sc900";
```

## lib/server/mcpV2Practice.ts
```ts
import '@/lib/v2/banks/sc900';
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `SC900.domainLabels` (keys `sc900Concepts`, `sc900Identity`,
`sc900Access`, `sc900Infra`, `sc900CloudSec`, `sc900Xdr`, `sc900Compliance`, `sc900InfoProt`).

## app/globals.css
Hue as given in the run table, 241 15% 26%. Matches `lib/v2/exams/sc900.ts` `theme`. Run
`tools/gen_dark_brand_css.py` afterwards.
```css
  /* Microsoft SC-900 theme: deep slate indigo (v2 exam; matches lib/v2/exams/sc900.ts theme) */
  [data-theme="sc900"] {
    --brand: 241 15% 26%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 241 15% 96%;
    --brand-hover: 241 15% 21%;
    --brand-dark: 241 15% 18%;
    --brand-darker: 241 15% 12%;
    --brand-muted: 241 10% 70%;
    --brand-border: 241 10% 80%;
    --brand-border-light: 241 10% 89%;
    --brand-gradient-to: 210 40% 95%;
  }
```

## lib/shareCards.ts
```ts
  "sc900": {
    "color": "hsl(241, 15%, 26%)",
    "tint": "hsl(241, 15%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  sc900: { title: "Microsoft Security, Compliance, and Identity Fundamentals SC-900", description: "Review Zero Trust and identity concepts, Microsoft Entra, Defender, Sentinel and Purview." },
```

## lib/tigerAssets.ts
```ts
// BORROWED_SETS
  sc900: "secplus",
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line, next to az900
  sc900: "GLOBAL",
// NON_DRIVING_TESTS: add
  "sc900",
```

## lib/testCatalog.ts
See `wiring/catalog.json`.
```ts
// EXAM_BLURBS
  sc900: "Practice for Microsoft Security, Compliance, and Identity Fundamentals (SC-900): shared responsibility, Zero Trust and identity concepts, Microsoft Entra ID, Conditional Access, PIM and ID Protection, Azure network security, Defender for Cloud, Microsoft Sentinel, Defender XDR, and Microsoft Purview compliance, labels, DLP, retention, eDiscovery and audit.",
// EXAM_ORG
  sc900: "Microsoft · Microsoft Certified: Security, Compliance, and Identity Fundamentals",
// SEARCH_ALIASES
  sc900: "sc-900 sc900 sc 900 microsoft sc-900 microsoft security fundamentals microsoft security compliance and identity fundamentals security compliance identity fundamentals microsoft entra fundamentals microsoft identity fundamentals microsoft security certification microsoft compliance fundamentals purview fundamentals sentinel fundamentals defender fundamentals",
// RELATED_OVERRIDES
  sc900: ["az900", "secplus", "sc200"],
```
Hub group "IT certifications": add `"sc900"` right after `"az900"` (and `"sc200"` after it if
that exam is wired). Add cases to `tests/test-search-aliases.test.cjs` for "sc-900" and
"microsoft security fundamentals" opening `sc900`.

## lib/examFacts.ts
See `wiring/facts.ts.txt`.

## CLAUDE.md
See `wiring/claude.md`.
