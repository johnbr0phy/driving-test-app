# Microsoft SC-200 (`sc200`) wiring for the integrator

v2 exam on the `tools/cysa` template. Files written (unique to this exam):
`tools/next100/sc200/*` (helpers.py, nine domain sources as Python data, build.py, sources.md,
this file, wiring/), `data/v2/sc200/questions.json` (plain array, 212 items, prefix `SC200-`),
`lib/v2/exams/sc200.ts` (export `SC200`), `lib/v2/banks/sc200.ts` (`plainBank`),
`app/sc-200/*` (layout, root redirect, dashboard, stats; no test or practice folders),
`app/sc-200-practice-test/page.tsx`.

Exam checked 2026-11-16: the SC-200 study guide shows "Skills measured as of October 21, 2026"
and the certification page has no retirement banner (unlike AZ-500, retired August 31, 2026).
Rebuild: `python3 -I tools/next100/sc200/build.py` (key strictly longest 22/185 single items =
11.9%; 6 sorted number items, 4 keyed at an end slot). Validate from a copy that does not write
bankSizes: `python3 -I tools/validate_v2_bank.py sc200 '{"1": {"sc200": {"1": 50}}, "2": {"sc200": {"1": 50}}}'`
(212 questions, 0 stimuli, 0 problems). `tools/check_option_refs.py --list` prints 0. Do not add
`sc200` to `tools/build_v2_bank.py` PLANS.

Dashboard: 9 drills + 2 tests = 11 steps, no Basics. Premium through PREMIUM_V2_IDS: the registry
locks Practice Test 2 and the last two drills (KQL Hunting in Defender, Sentinel Hunting). The
landing FAQ says so ("every drill but the last two"); check it against what the registry locks.

Screenshots still needed: `public/landing/sc200-mobile.png`, `sc200-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  sc200: 212,
```

## lib/v2/registry.ts
```ts
import { SC200 } from "./exams/sc200";
// EXAMS_V2: add SC200 right after AZ900 (or after CYSA)
// PREMIUM_V2_IDS: add "sc200" on the IT line, after "az900"
```

## lib/server/classQuestions.ts
```ts
import "@/lib/v2/banks/sc200";
```

## lib/server/mcpV2Practice.ts
```ts
import '@/lib/v2/banks/sc200';
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `SC200.domainLabels` (keys `sc200Automation`, `sc200Platform`,
`sc200Ingest`, `sc200Detect`, `sc200XdrRespond`, `sc200Endpoint`, `sc200M365`, `sc200HuntXdr`,
`sc200HuntSentinel`).

## app/globals.css
Hue as given in the run table, 249 45% 22%. Matches `lib/v2/exams/sc200.ts` `theme`. Run
`tools/gen_dark_brand_css.py` afterwards.
```css
  /* Microsoft SC-200 theme: deep indigo (v2 exam; matches lib/v2/exams/sc200.ts theme) */
  [data-theme="sc200"] {
    --brand: 249 45% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 249 45% 96%;
    --brand-hover: 249 45% 18%;
    --brand-dark: 249 45% 16%;
    --brand-darker: 249 42% 11%;
    --brand-muted: 249 22% 70%;
    --brand-border: 249 22% 80%;
    --brand-border-light: 249 20% 89%;
    --brand-gradient-to: 210 40% 95%;
  }
```

## lib/shareCards.ts
```ts
  "sc200": {
    "color": "hsl(249, 45%, 22%)",
    "tint": "hsl(249, 45%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  sc200: { title: "Microsoft SC-200", description: "Practise Defender XDR, Microsoft Sentinel, detections, incident response and KQL threat hunting." },
```

## lib/tigerAssets.ts
```ts
// BORROWED_SETS
  sc200: "secplus",
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line, next to az900
  sc200: "GLOBAL",
// NON_DRIVING_TESTS: add
  "sc200",
```

## lib/testCatalog.ts
See `wiring/catalog.json`.
```ts
// EXAM_BLURBS
  sc200: "Microsoft SC-200 Security Operations Analyst, skills measured as of October 21, 2026. Defender XDR and Sentinel automation, Sentinel roles, retention and data connectors, custom detections and analytics rules, incident response in Defender XDR and Defender for Endpoint, Purview Audit and Graph activity logs, and KQL threat hunting.",
// EXAM_ORG
  sc200: "Microsoft · Exam SC-200, skills measured as of October 21, 2026",
// SEARCH_ALIASES
  sc200: "sc-200 sc200 sc 200 security operations analyst microsoft security operations analyst security operations analyst associate microsoft sentinel exam defender xdr exam microsoft defender exam kql exam microsoft soc analyst",
// RELATED_OVERRIDES
  sc200: ["sc900", "cysa", "az900"],
```
Hub group "IT certifications": add `"sc200"` right after `"az900"` (and after `"sc900"` if that
is wired next to az900). Add a case to `tests/test-search-aliases.test.cjs` for "sc-200" and
"security operations analyst" opening `sc200`. If `sc900` is not wired in this run, drop it from
RELATED_OVERRIDES.

## Teacher-led
`TEACHER_LED`: add `"sc200"` (Microsoft security operations courses and SOC bootcamps).
`TEACHES` in `ExamClassFaq`: `sc200: "an SC-200 or Microsoft security operations course"`.

## lib/examFacts.ts
See `wiring/facts.ts.txt`.

## CLAUDE.md
See `wiring/claude.md`.
