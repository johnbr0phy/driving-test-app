# Fortinet NSE 1 (formerly FCF) (`fortinse`) wiring for the integrator

v2 exam on the `tools/cysa` template. Files written (unique to this exam):
`tools/next100/fortinse/*` (helpers.py, ten module sources as Python data, build.py, sources.md,
this file, wiring/), `data/v2/fortinse/questions.json` (plain array, 200 items, prefix `FCF-`),
`lib/v2/exams/fortinse.ts` (export `FORTINSE`), `lib/v2/banks/fortinse.ts` (`plainBank`),
`app/fortinet-nse-1/*` (layout, root redirect, dashboard, stats; no test or practice folders),
`app/fortinet-nse-1-practice-test/page.tsx`.

## Decision to check: FCF no longer exists
Fortinet retired Fortinet Certified Fundamentals (FCF) in Cybersecurity on July 15, 2026 when the
NSE program moved to eight levels; active FCF holders were awarded NSE 1 and NSE 2
(fortinet.com/nse-training-update). Its successor is NSE 1 in Cybersecurity: pass the online exam
at the end of the free course "Cybersecurity and Cloud Fundamentals" (ten modules, which merge the
old FCF courses Introduction to the Threat Landscape and Technical Introduction to Cybersecurity).
So the bank is written to the NSE 1 course agenda and named "Fortinet NSE 1 (FCF) Practice Test",
keeping the slug and landing from the run table so FCF searches land on it. NSE 2 (Introduction to
Next Generation Firewall) is not modelled; `fortigate` covers FortiGate. Fortinet publishes no
question count, time or pass mark for the course exam: 40 in 60 minutes and the 80% goal are
Tigertest's (said in scoreNote, landing and facts).

Rebuild: `python3 -I tools/next100/fortinse/build.py`. Validate from a copy that does not write
bankSizes: `python3 -I tools/validate_v2_bank.py fortinse '{"1": {"fcf": {"1": 40}}, "2": {"fcf": {"1": 40}}}'`
(200 questions, 0 stimuli, 0 problems; key strictly longest 23/200 = 11.5%). Do not add
`fortinse` to `tools/build_v2_bank.py` PLANS.

Dashboard: 7 drills + 2 tests = 9 steps. Per test 4 items from each of the 10 modules; 12
drill-only per module. All single answer, four options. Premium through PREMIUM_V2_IDS: the
registry locks Practice Test 2 and the last drill (Data, Apps and Cloud).

Screenshots still needed: `public/landing/fortinse-mobile.png`, `fortinse-desktop.png` (+ `-dark`).

## lib/v2/bankSizes.ts
```ts
  fortinse: 200,
```

## lib/v2/registry.ts
```ts
import { FORTINSE } from "./exams/fortinse";
// EXAMS_V2: add FORTINSE right after CYSA (or after CISSP)
// PREMIUM_V2_IDS: add "fortinse" on the IT line, after "cysa"
```

## lib/server/classQuestions.ts
```ts
import "@/lib/v2/banks/fortinse";
```

## lib/server/mcpV2Practice.ts
```ts
import '@/lib/v2/banks/fortinse';
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `FORTINSE.domainLabels` (keys `fcfIntro`, `fcfThreat`,
`fcfSocial`, `fcfMalware`, `fcfCrypto`, `fcfNetwork`, `fcfAuth`, `fcfEndpoint`, `fcfData`, `fcfCloud`).

## app/globals.css
Hue as given in the run table, 355 35% 20% (nearest: fortigate 355 25% 28%, saturation +10 and
lightness -8). Matches `lib/v2/exams/fortinse.ts` `theme`. Run `tools/gen_dark_brand_css.py` afterwards.
```css
  /* Fortinet NSE 1 (FCF) theme: deep oxblood (v2 exam; matches lib/v2/exams/fortinse.ts theme) */
  [data-theme="fortinse"] {
    --brand: 355 35% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 355 35% 96%;
    --brand-hover: 355 35% 16%;
    --brand-dark: 355 35% 15%;
    --brand-darker: 355 32% 10%;
    --brand-muted: 355 18% 70%;
    --brand-border: 355 18% 80%;
    --brand-border-light: 355 16% 89%;
    --brand-gradient-to: 210 40% 95%;
  }
```

## lib/shareCards.ts
```ts
  "fortinse": {
    "color": "hsl(355, 35%, 20%)",
    "tint": "hsl(355, 35%, 96%)"
  },
```

## lib/shareCardCopy.ts
```ts
  fortinse: { title: "Fortinet NSE 1 (FCF)", description: "Practice all ten modules of NSE 1 Cybersecurity and Cloud Fundamentals, the course that replaced FCF." },
```

## lib/tigerAssets.ts
```ts
// BORROWED_SETS
  fortinse: "secplus",
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line, next to fortigate
  fortinse: "GLOBAL",
// NON_DRIVING_TESTS: add
  "fortinse",
```

## lib/testCatalog.ts
See `wiring/catalog.json`.
```ts
// EXAM_BLURBS
  fortinse: "Practice for Fortinet NSE 1 Cybersecurity and Cloud Fundamentals, the entry-level course exam that replaced Fortinet Certified Fundamentals (FCF) in July 2026: the threat landscape, social engineering, malware, cryptography and PKI, secure networking, authentication, endpoint security, secure data and apps, and cloud security.",
// EXAM_ORG
  fortinse: "Fortinet Training Institute · NSE 1 Cybersecurity and Cloud Fundamentals (formerly FCF)",
// SEARCH_ALIASES
  fortinse: "fortinet fcf fortinet certified fundamentals fcf cybersecurity fortinet fundamentals nse 1 nse1 nse 2 nse2 fortinet nse 1 cybersecurity and cloud fundamentals introduction to the threat landscape technical introduction to cybersecurity getting started in cybersecurity fortinet entry level cybersecurity certification free cybersecurity certification",
// RELATED_OVERRIDES
  fortinse: ["fortigate", "secplus", "netplus"],
```
Hub group "IT certifications": add `"fortinse"` right before `"fortigate"`. Note: `fortigate`'s
SEARCH_ALIASES contain "fcp" but not "fcf"; check `tests/test-search-aliases.test.cjs` and add a
case for "fortinet fcf" and "nse 1" opening `fortinse`.

## lib/examFacts.ts
See `wiring/facts.ts.txt`.

## CLAUDE.md
See `wiring/claude.md`.
