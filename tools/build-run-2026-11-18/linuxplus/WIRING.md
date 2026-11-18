# CompTIA Linux+ (`linuxplus`) wiring for the integrator

v2 exam on the `pentestplus` / `netplus` template. Files written (unique to this exam):
`tools/build-run-2026-11-18/linuxplus/*` (helpers.py, eight domain sources as Python data,
build.py, sources.md, this file), `data/v2/linuxplus/questions.json` (plain array, 204 items,
prefix `LINUXPLUS-`), `lib/v2/exams/linuxplus.ts` (export `LINUXPLUS`),
`lib/v2/banks/linuxplus.ts` (`plainBank`), `app/comptia-linux-plus/*` (layout, root redirect,
dashboard, stats; no test or practice folders), `app/comptia-linux-plus-practice-test/page.tsx`.

## Exam checked (XK0-006 is the only exam in force; build proceeds)
CompTIA Linux+ V8, XK0-006, launched July 15, 2025; CompTIA estimates retirement in 2028. The V7
exam XK0-005 retired January 13, 2026 in English and April 14, 2026 in Japanese, Portuguese and
Spanish (CompTIA Linux+ page FAQ, read 2026-11-18), so every candidate now sits XK0-006. Maximum 90
questions, multiple choice and performance-based, 90 minutes, 720 on a 100 to 900 scale, English
only. Domains: System Management 23%, Services and User Management 20%, Security 18%, Automation,
Orchestration, and Scripting 17%, Troubleshooting 22% (official XK0-006 Exam Objectives, Document
Version 5.0; see sources.md).

Rebuild: `python3 -I tools/build-run-2026-11-18/linuxplus/build.py`. Validate from a copy that does
not write bankSizes: `python3 -I tools/validate_v2_bank.py linuxplus '{"1": {"linux": {"1": 90}}, "2": {"linux": {"1": 90}}}'`
(204 questions, 0 stimuli, 0 problems; key strictly longest 28/188 = 14.9%). Do not add
`linuxplus` to `tools/build_v2_bank.py` PLANS.

Dashboard: 8 drills + 2 tests = 10 steps. Two 90-item tests in 90 minutes (Test 2 held out), per
test 10/11/9/9/16/15/10/10 across the eight domain files; 3 drill-only per domain (24). Formats:
mostly single, 4 choose-two, 3 typed numeric (octal modes), 3 order, 6 matrix (PBQ stand-ins).
Premium through PREMIUM_V2_IDS: the registry locks the last three steps, Practice Test 2 and the
two troubleshooting drills (the landing FAQ says so).

Screenshots still needed: `public/landing/linuxplus-mobile.png`, `linuxplus-desktop.png` (and
`-dark`). Shoot with `linuxplus:comptia-linux-plus:v2:system`.

## lib/v2/bankSizes.ts
```ts
  linuxplus: 204,
```

## lib/v2/registry.ts
```ts
import { LINUXPLUS } from "./exams/linuxplus";
// EXAMS_V2: add LINUXPLUS right after NETPLUS (IT certs cluster)
// PREMIUM_V2_IDS: add "linuxplus" on the IT line, after "netplus"
```

## lib/server/classQuestions.ts
```ts
import "@/lib/v2/banks/linuxplus";
```

## lib/server/mcpV2Practice.ts
```ts
import '@/lib/v2/banks/linuxplus';
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `LINUXPLUS.domainLabels` (keys `linuxSystem`, `linuxStorage`,
`linuxFiles`, `linuxServices`, `linuxSecurity`, `linuxAutomation`, `linuxTroubleSystem`,
`linuxTroubleNetSec`).

## app/globals.css
Hue 39 25% 42% (muted khaki amber). White text 4.6:1. Checked against every `[data-theme]` in
globals.css on 2026-11-18: no theme within 8 degrees is within 15 saturation and 8 lightness
(the amber band is crowded; 30, 33 and 39 at 20 to 25% saturation and 42 to 44% lightness were
the only free slots). Matches `lib/v2/exams/linuxplus.ts` `theme`. Run
`tools/gen_dark_brand_css.py` afterwards to generate the `.dark` block.
```css
  /* CompTIA Linux+ XK0-006 theme: muted khaki amber (v2 exam; matches lib/v2/exams/linuxplus.ts theme) */
  [data-theme="linuxplus"] {
    --brand: 39 25% 42%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 39 30% 96%;
    --brand-hover: 39 25% 37%;
    --brand-dark: 39 25% 33%;
    --brand-darker: 39 28% 22%;
    --brand-muted: 39 18% 70%;
    --brand-border: 39 22% 80%;
    --brand-border-light: 39 20% 89%;
    --brand-gradient-to: 50 30% 96%;
  }
```

## lib/shareCardCopy.ts
```ts
  linuxplus: { title: "CompTIA Linux+ XK0-006", description: "Practise system management, services and users, security, automation and scripting, and troubleshooting." },
```

## lib/tigerAssets.ts
```ts
// BORROWED_SETS (IT line, next to netplus): linuxplus borrows the Security+ tiger
  linuxplus: "secplus",
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line, next to netplus
  linuxplus: "GLOBAL",
// NON_DRIVING_TESTS: add
  "linuxplus",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  linuxplus: "CompTIA Linux+ XK0-006. Boot, devices, storage and LVM, networking and virtualization, files, accounts and processes, packages, systemd and containers, permissions, SELinux, firewalls and SSH, Ansible, Kubernetes, Bash, Python and Git, and troubleshooting a misbehaving server.",
// EXAM_ORG
  linuxplus: "CompTIA · Linux+ XK0-006 exam objectives",
// SEARCH_ALIASES
  linuxplus: "comptia linux plus linux+ linux plus xk0-006 xk0 006 xk0006 xk0-005 linux v8 linux certification linux admin linux administrator linux sysadmin linux system administration",
// RELATED_OVERRIDES (optional; the IT group is large)
  linuxplus: ["netplus", "aplus", "secplus"],
```
Hub group "IT certifications" (`TEST_GROUPS` line in testCatalog.ts): add `"linuxplus"` right
after `"netplus"`.
`tests/test-search-aliases.test.cjs`: add cases for "linux+", "xk0-006" and "linux plus" opening
`linuxplus` (no other exam's aliases claim these words; check that "linux" alone does not pull
CCNA or A+ ahead).

## lib/examFacts.ts
```ts
  linuxplus: {
    answer:
      "The CompTIA Linux+ exam (XK0-006) has a maximum of 90 questions in 90 minutes, multiple choice and performance-based, and you need 720 on a 100 to 900 scale to pass. It covers System Management 23%, Services and User Management 20%, Security 18%, Automation, Orchestration, and Scripting 17% and Troubleshooting 22%. XK0-006 launched on July 15, 2025, and the English XK0-005 exam retired on January 13, 2026.",
    rows: [
      { label: "Questions", value: "Up to 90" },
      { label: "Time", value: "90 minutes" },
      { label: "Passing score", value: "720 on a 100 to 900 scale" },
      { label: "Exam code", value: "XK0-006 (replaced XK0-005)" },
      { label: "Valid for", value: "3 years" },
      { label: "Given by", value: "CompTIA, at Pearson VUE or online" },
    ],
    basedOn: "the CompTIA Linux+ XK0-006 exam objectives (Document Version 5.0)",
    source: { name: "CompTIA", url: "https://www.comptia.org/en-us/certifications/linux/" },
  },
```

## Teacher-led (Linux+ is taught in college IT programs and CompTIA Academy courses)
`components/TeachNudge.tsx` `TEACHER_LED`: add `"linuxplus"` next to `"netplus"`.
`components/exam/ExamClassFaq.tsx` `TEACHES`:
```ts
  linuxplus: "a Linux administration or Linux+ course",
```

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` with a comment naming CompTIA Linux+.

## lib/examFreshness.json
```json
    {
      "exam": "linuxplus",
      "date": "2026-01-13",
      "kind": "sunset",
      "what": "CompTIA retired the English Linux+ XK0-005 exam (Japanese, Portuguese and Spanish on April 14, 2026); XK0-006 (Linux+ V8, launched July 15, 2025) is the only version.",
      "action": "Built to XK0-006 from the start; nothing to change.",
      "source": "https://www.comptia.org/en-us/certifications/linux/",
      "done": "2026-11-18"
    },
    {
      "exam": "linuxplus",
      "date": "2028-07-15",
      "kind": "sunset",
      "what": "CompTIA estimates XK0-006 retires about three years after its July 15, 2025 launch (estimated 2028).",
      "action": "Watch for the XK0-007 objectives and rebuild when published.",
      "source": "https://www.comptia.org/en-us/certifications/linux/"
    }
```

## lib/examSources.json
Run `python3 -I tools/build_exam_sources.py` after the merge (sources.md lists the CompTIA page,
the objectives PDF and the netplan docs first).

## CLAUDE.md
Add in the v2 exams section, after the Network+ bullet:

- **CompTIA Linux+** (`linuxplus`, v2, CompTIA Linux+ V8, exam XK0-006, launched July 15, 2025; the English XK0-005 retired January 13, 2026 (Japanese, Portuguese and Spanish April 14, 2026), so XK0-006 is the only version; CompTIA estimates retirement in 2028, `/comptia-linux-plus/*`, landing `/comptia-linux-plus-practice-test`, `[data-theme="linuxplus"]` muted khaki amber (39 25% 42%), region GLOBAL, hub group "IT certifications" (after netplus), Premium, borrows the Security+ tiger, teacher-led (Linux administration courses)): one section `linux`, one 90-item module in 90 minutes like the real exam (maximum 90 multiple choice and performance-based, 720 on a 100 to 900 scale, English only, Pearson VUE or online; percent correct here, 80% goal, the scale in `scoreNote`), weighted to the XK0-006 Exam Objectives Document Version 5.0 (System Management 23%, Services and User Management 20%, Security 18%, Automation, Orchestration, and Scripting 17%, Troubleshooting 22%) as eight domain files (`linuxSystem` 10 (1.1, 1.2, 1.4, 1.7), `linuxStorage` 11 (1.3, 1.5, 1.6), `linuxFiles` 9 (2.1 to 2.3), `linuxServices` 9 (2.4 to 2.6), `linuxSecurity` 16, `linuxAutomation` 15, `linuxTroubleSystem` 10 (5.1, 5.2), `linuxTroubleNetSec` 10 (5.3 to 5.5) per test), two tests with Test 2 held out, 8 drills (one per domain file), no Basics, 10 dashboard steps. Bank `data/v2/linuxplus/questions.json` (204 items, prefix `LINUXPLUS-`, 24 drill-only; mostly single, 4 choose-two, 3 typed octal modes, 3 order, 6 matrix as PBQ stand-ins; commands in monospace through `cmd()`) built by `python3 -I tools/build-run-2026-11-18/linuxplus/build.py` from one source per domain (key first, shuffled by a stem seed). Facts from the objectives and upstream docs (netplan try, PEP 8, crontab(5), chage(1), nice(1), systemctl, the Dockerfile reference, Kubernetes Secrets, git-pull, OpenTofu state, firewall-cmd, FHS 3.0); the objectives' typos (nmconnect, vit-manager, systemd-blame) not used, pam_tally2 not keyed (removed upstream). Stems checked against the A+, Network+, Security+, CySA+, PenTest+ and CCNA banks (nine overlapping facts rewritten to Linux tasks). Sources in `tools/build-run-2026-11-18/linuxplus/sources.md`.
