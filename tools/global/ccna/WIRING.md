# Cisco CCNA 200-301 (`ccna`) wiring for the integrator

v2 exam, modelled on Security+ / AWS. Files already written (unique to this exam):
`tools/ccna/*` (8 domain sources as Python, `helpers.py`, `build.py`, `sources.md`), `data/v2/ccna/questions.json`,
`lib/v2/exams/ccna.ts` (export `CCNA`), `lib/v2/banks/ccna.ts`, `app/ccna/*` (6 wrappers copied from `app/paramedic/`),
`app/ccna-practice-test/page.tsx`.

Rebuild: `python3 -I tools/ccna/build.py`, then
`python3 -I tools/validate_v2_bank.py ccna '{"1": {"ccna": {"1": 100}}, "2": {"ccna": {"1": 100}}}'`
(passes: 224 questions, 0 stimuli, 0 problems). Do not add `ccna` to `tools/build_v2_bank.py` PLANS: it has its own
build (Python sources so CLI escapes stay readable, keys authored first and shuffled by a stem seed).

Screenshots still needed: `public/landing/ccna-mobile.png`, `ccna-desktop.png` (+ `-dark`), referenced by the landing hero.

## lib/v2/bankSizes.ts
```ts
  ccna: 224,
```

## lib/v2/registry.ts
```ts
import { CCNA } from "./exams/ccna";
// EXAMS_V2: add CCNA right after AWS
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the aws bank import:
```ts
import "@/lib/v2/banks/ccna";          // classQuestions.ts
import '@/lib/v2/banks/ccna';          // mcpV2Practice.ts
```

## types/index.ts (category union, after the Security+ block) and i18n/{en,es,ko,vi,zh}.ts
v2 reads `domainLabels` from the config, but the other v2 exams also list their keys here; add for parity:
```ts
  // Cisco CCNA 200-301 domains
  | "ccnaFundamentals"
  | "ccnaAddressing"
  | "ccnaAccess"
  | "ccnaRouting"
  | "ccnaOspf"
  | "ccnaServices"
  | "ccnaSecurity"
  | "ccnaAutomation"
```
```ts
    // Cisco CCNA 200-301 domains
    ccnaFundamentals: "Network Fundamentals",
    ccnaAddressing: "IPv4 & IPv6 Addressing",
    ccnaAccess: "Network Access",
    ccnaRouting: "Routing & Static Routes",
    ccnaOspf: "OSPF & First Hop Redundancy",
    ccnaServices: "IP Services",
    ccnaSecurity: "Security Fundamentals",
    ccnaAutomation: "Automation & Programmability",
```
(Same English strings in es/ko/vi/zh, like the Security+ keys.)

## app/globals.css
After the `[data-theme="aws"]` block (light only; run `tools/gen_dark_brand_css.py` once for the `.dark` tint).
Suggested hue 192 (teal-cyan); re-pick if another exam in the wave took it. Keep `lib/v2/exams/ccna.ts` `theme` in step.
```css
  /* CCNA theme: teal-cyan (v2 exam; matches lib/v2/exams/ccna.ts theme) */
  [data-theme="ccna"] {
    --brand: 192 70% 34%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 192 60% 95%;
    --brand-hover: 192 70% 29%;
    --brand-dark: 192 70% 25%;
    --brand-darker: 192 65% 14%;
    --brand-muted: 192 35% 70%;
    --brand-border: 192 40% 76%;
    --brand-border-light: 192 35% 87%;
    --brand-gradient-to: 200 55% 96%;
  }
```

## lib/region.ts
```ts
// TEST_REGIONS, the GLOBAL line:
  aplus: "GLOBAL", secplus: "GLOBAL", aws: "GLOBAL", ccna: "GLOBAL",
```
Not in `NON_DRIVING_TESTS` (that set is for country-specific tests; GLOBAL IT certs like secplus are not in it).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  ccna: "Cisco CCNA 200-301. Subnetting and IPv6, VLANs, trunks and spanning tree, routing tables, static routes and OSPF, NAT and IP services, ACLs and Layer 2 security, and automation, with router and switch output.",
// EXAM_ORG
  ccna: "Cisco 200-301 · exam topics v1.1",
// SEARCH_ALIASES
  ccna: "cisco ccna 200-301 ccent network associate networking routing switching subnetting ospf vlan cisco certification",
// RELATED_OVERRIDES
  ccna: ["secplus", "aplus", "aws"],
// Hub group: IT certifications
  { title: "IT certifications", ids: ["aplus", "secplus", "ccna", "aws"] },
```

## lib/examFacts.ts
```ts
  ccna: {
    answer:
      "The Cisco CCNA (200-301) is a single 120-minute exam with no prerequisites. Cisco does not publish the question count or a passing score; candidates usually see about 100 to 120 questions, including multiple choice, drag-and-drop and simulations, answered in order with no going back. The v1.1 topics run through February 2, 2027: Network Fundamentals 20%, Network Access 20%, IP Connectivity 25%, IP Services 10%, Security Fundamentals 15%, Automation and Programmability 10%. Version 2.0 replaces it on February 3, 2027.",
    rows: [
      { label: "Questions", value: "About 100 to 120 (not published)" },
      { label: "Time", value: "120 minutes" },
      { label: "Passing score", value: "Not published by Cisco" },
      { label: "Exam code", value: "200-301 (topics v1.1; v2.0 from Feb 3, 2027)" },
      { label: "Valid for", value: "3 years" },
      { label: "Given by", value: "Cisco, at Pearson VUE or online" },
    ],
    basedOn: "the Cisco CCNA 200-301 exam topics v1.1",
    source: { name: "Cisco", url: "https://learningnetwork.cisco.com/s/ccna-exam-topics" },
  },
```

## components/exam/ExamClassFaq.tsx
After `aws`:
```ts
  ccna: "a CCNA or Cisco Networking Academy course",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"ccna"` after `"aws"`.

## components/TestIcon.tsx (optional)
The config uses `icon: "cpu"`. A lucide `Network` icon would fit better: `if (icon === "network") return <Network ... />;`
and then set `icon: "network"` in `lib/v2/exams/ccna.ts`.

## lib/sitemaps.ts, app/og/[examId]/route.tsx
Nothing: both read `EXAMS_V2`. Bump the exams date in `lib/seoDates.ts` with the wave.

## lib/tigerAssets.ts
Nothing (no tiger set; falls back like other new exams). `ccna: "aplus"` in `BORROWED_SETS` would give it the A+ tiger.

## CLAUDE.md
Add after the AWS CCP bullet in the v2 section:
```md
- **CCNA** (`/ccna`, landing `/ccna-practice-test`, `[data-theme="ccna"]` teal, region GLOBAL, hub group "IT certifications"): Cisco CCNA 200-301 exam topics v1.1 (live through February 2, 2027; v2.0, five domains, from February 3, 2027: re-weight then). One linear section (Cisco exams have no going back) of 100 items in 120 min, two practice tests with Test 2 held out, 8 drills: `ccnaFundamentals` and `ccnaAddressing` (1.0, 20%), `ccnaAccess` (2.0, 20%), `ccnaRouting` and `ccnaOspf` (3.0, 25%: routing table and static routes; OSPFv2 and FHRP), `ccnaServices` (10%), `ccnaSecurity` (15%), `ccnaAutomation` (10%); per test 11/9/20/13/12/10/15/10, 3 drill-only each. Bank `data/v2/ccna/questions.json` (224 original items, prefix `CCNA-`) built from Python sources by its own `tools/ccna/build.py` (keys authored first, shuffled by a stem seed; `--check <domain>` lints sources). Typed subnetting and AD/cost items (`numeric`, `wholeNumber`), `order` and `matrix` items standing in for drag-and-drop, "Choose two" multi; no simulations. CLI output is monospace through KaTeX `\texttt` (`cmd()` inline, `cli()` as a `$$\begin{array}{l}` block) because RichText has no code block. Cisco publishes no pass mark; goal 80. Sources in `tools/ccna/sources.md`.
```
