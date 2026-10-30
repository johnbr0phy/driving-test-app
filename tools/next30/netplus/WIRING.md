# CompTIA Network+ N10-009 (`netplus`) wiring for the integrator

v2 exam, modelled on Security+ (`secplus`) and CCNA (`ccna`). Files already written (unique to this exam):
`tools/netplus/*` (8 domain sources as Python, `helpers.py`, `build.py`, `sources.md`),
`data/v2/netplus/questions.json`, `lib/v2/exams/netplus.ts` (export `NETPLUS`), `lib/v2/banks/netplus.ts`,
`app/comptia-network-plus/{layout,page,dashboard/page,practice/[n]/page,test/[id]/page,test/[id]/results/page}.tsx`
(copied from `app/ccna/`), `app/comptia-network-plus-practice-test/page.tsx`.

Rebuild: `python3 -I tools/netplus/build.py` (own build, like ccna: keys authored first, single/multi
options shuffled by a stem seed, matrix columns with more than two headings shuffled the same way;
do not add `netplus` to `tools/build_v2_bank.py` PLANS), then
`python3 -I tools/validate_v2_bank.py netplus '{"1": {"netplus": {"1": 90}}, "2": {"netplus": {"1": 90}}}'`
(passes: 204 questions, 0 stimuli, 0 problems; key strictly longest in 18.5% of single items).

Screenshots still needed: `public/landing/netplus-mobile.png`, `netplus-desktop.png` (+ `-dark`), referenced by the landing hero.
The landing has no `ExamLandingBreadcrumbs` (not in this tree), matching the ccna template.

## lib/v2/bankSizes.ts
```ts
  netplus: 204,
```

## lib/v2/registry.ts
```ts
import { NETPLUS } from "./exams/netplus";
// EXAMS_V2: add NETPLUS right after SECPLUS (CompTIA siblings), before or after CCNA
```

## lib/server/classQuestions.ts and lib/server/mcpV2Practice.ts
After the ccna bank import:
```ts
import "@/lib/v2/banks/netplus";          // classQuestions.ts
import '@/lib/v2/banks/netplus';          // mcpV2Practice.ts
```

## types/index.ts (category union, after the CCNA block) and i18n/{en,es,ko,vi,zh}.ts
v2 reads `domainLabels` from the config; add for parity with the other v2 exams:
```ts
  // CompTIA Network+ N10-009 domains
  | "netModels"
  | "netInfra"
  | "netSwitchRoute"
  | "netWireless"
  | "netOps"
  | "netSecurity"
  | "netTroubleMethod"
  | "netTroubleServices"
```
```ts
    // CompTIA Network+ N10-009 domains
    netModels: "OSI Model, Ports & Protocols",
    netInfra: "Appliances, Cloud, Media & Addressing",
    netSwitchRoute: "Routing & Switching",
    netWireless: "Wireless & Physical Installation",
    netOps: "Network Operations",
    netSecurity: "Network Security",
    netTroubleMethod: "Troubleshooting Method, Cabling & Tools",
    netTroubleServices: "Troubleshooting Services & Performance",
```
(Same English strings in es/ko/vi/zh, like the Security+ and CCNA keys.)

## app/globals.css
After the `[data-theme="ccna"]` block (light only; run `tools/gen_dark_brand_css.py` once for the `.dark` tint).
Suggested hue 152 (network green; secplus 260, aplus 350, aws 20, awssaa 235, az900 248, ccna 191 are taken).
Re-pick if another exam in the wave took it, and keep `theme` in `lib/v2/exams/netplus.ts` in step.
```css
  /* CompTIA Network+ theme: green (v2 exam; matches lib/v2/exams/netplus.ts theme) */
  [data-theme="netplus"] {
    --brand: 152 55% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 152 60% 95%;
    --brand-hover: 152 55% 25%;
    --brand-dark: 152 55% 20%;
    --brand-darker: 152 50% 12%;
    --brand-muted: 152 30% 68%;
    --brand-border: 152 35% 75%;
    --brand-border-light: 152 30% 87%;
    --brand-gradient-to: 165 50% 96%;
  }
```

## lib/region.ts
```ts
// TEST_REGIONS, the GLOBAL line with aplus/secplus/ccna:
  ..., ccna: "GLOBAL", netplus: "GLOBAL", ...
```
Not in `NON_DRIVING_TESTS` (same treatment as `secplus` and `ccna`).

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  netplus: "CompTIA Network+ N10-009. The OSI model, ports and protocols, subnetting, cloud and SD-WAN, routing, switching and Wi-Fi, DHCP, DNS and monitoring, network security, and the troubleshooting methodology, tools and common faults.",
// EXAM_ORG
  netplus: "CompTIA N10-009",
// SEARCH_ALIASES
  netplus: "comptia network plus network+ n10-009 n10 009 net+ networking certification subnetting osi ports",
// RELATED_OVERRIDES
  netplus: ["secplus", "aplus", "ccna"],
// Hub group: IT certifications (CompTIA trio together)
  { title: "IT certifications", ids: ["aplus", "netplus", "secplus", "aws", "awssaa", "az900", "ccna"] },
```
The catalog entry itself is built from `EXAMS_V2` (title "CompTIA Network+ Practice Test", landing
`/comptia-network-plus-practice-test`); the question count comes from `bankSizes.ts`.

## lib/examFacts.ts
```ts
  netplus: {
    answer:
      "The CompTIA Network+ exam (N10-009) has a maximum of 90 questions in 90 minutes, multiple choice and performance-based, and you need 720 on a 100 to 900 scale to pass. It covers Networking Concepts 23%, Network Implementation 20%, Network Operations 19%, Network Security 14% and Network Troubleshooting 24%. N10-009 launched in June 2024; CompTIA estimates it will retire in 2027.",
    rows: [
      { label: "Questions", value: "Up to 90" },
      { label: "Time", value: "90 minutes" },
      { label: "Passing score", value: "720 on a 100 to 900 scale" },
      { label: "Exam code", value: "N10-009" },
      { label: "Valid for", value: "3 years" },
      { label: "Given by", value: "CompTIA, at Pearson VUE or online" },
    ],
    basedOn: "the CompTIA Network+ N10-009 exam objectives",
    source: { name: "CompTIA", url: "https://www.comptia.org/en-us/certifications/network/" },
  },
```
(No fee row: CompTIA's page lists none; third parties quote about 390 USD at the US store. Add
`{ label: "Fee", value: "About 390 USD" }` only after checking store.comptia.org.)

## components/exam/ExamClassFaq.tsx
Next to `secplus`:
```ts
  netplus: "a networking or Network+ course",
```

## components/TeachNudge.tsx
`TEACHER_LED`: add `"netplus"` after `"secplus"`.

## components/TestIcon.tsx (optional)
The config uses `icon: "cpu"`, like CCNA. If a lucide `Network` icon is added for CCNA, use it here too.

## lib/tigerAssets.ts
Suggest borrowing the Security+ tiger: `BORROWED_SETS` add `netplus: "secplus"` (otherwise it falls back like other new exams).

## lib/sitemaps.ts, app/og/[examId]/route.tsx
Nothing: both read `EXAMS_V2`. Bump the exams date in `lib/seoDates.ts` with the wave.

## CLAUDE.md
Add after the Security+ bullet in the v2 section:
```md
- **Network+** (`/comptia-network-plus`, landing `/comptia-network-plus-practice-test`, `[data-theme="netplus"]` green, region GLOBAL, hub group "IT certifications"): CompTIA Network+ N10-009 (launched June 2024, CompTIA estimates retirement in 2027), two 90-item tests in 90 minutes with free navigation, Test 2 held out, 8 drills splitting the three biggest domains: `netModels` and `netInfra` (1.0 Concepts 23%: OSI, ports and traffic types; appliances, cloud, media, topologies, IPv4 and SD-WAN/VXLAN/SASE), `netSwitchRoute` and `netWireless` (2.0 Implementation 20%), `netOps` (3.0, 19%), `netSecurity` (4.0, 14%), `netTroubleMethod` and `netTroubleServices` (5.0 Troubleshooting 24%: methodology, cabling and tools; services and performance); per test 11/10/11/7/17/13/10/11, 3 drill-only each, so the dashboard has 10 steps. Bank `data/v2/netplus/questions.json` (204 original items, prefix `NETPLUS-`) built from Python sources by its own `tools/netplus/build.py` (ccna-style helpers; options and wide matrix columns shuffled by a stem seed). `matrix` and `order` items stand in for PBQs, 13 "Choose two", 6 typed numeric (ports, subnet, MTBF, transfer time). Percent score; the real 720/900 is in `scoreNote`. Sources in `tools/netplus/sources.md`.
```
