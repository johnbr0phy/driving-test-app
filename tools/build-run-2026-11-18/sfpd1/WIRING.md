# Salesforce Certified Platform Developer (`sfpd1`) wiring for the integrator

v2 exam on the `linuxplus` / `pentestplus` template. Files written (unique to this exam):
`tools/build-run-2026-11-18/sfpd1/*` (helpers.py, nine domain sources as Python data, build.py,
sources.md, this file), `data/v2/sfpd1/questions.json` (plain array, 201 items, prefix `SFPD1-`,
unused before this build), `lib/v2/exams/sfpd1.ts` (export `SFPD1`), `lib/v2/banks/sfpd1.ts`
(`plainBank`), `app/salesforce-platform-developer/*` (layout, root redirect, dashboard, stats; no
test or practice folders), `app/salesforce-platform-developer-practice-test/page.tsx`.

## Exam checked (build proceeds)
Trailhead's credential page is titled "Salesforce Certified Platform Developer" (URL still
`/credentials/platformdeveloperi`; the prep trailmix still says Platform Developer I). Section
weights are official, from Salesforce's Trailhead cert prep modules: Developer Fundamentals 27%,
Process Automation and Logic 28%, User Interface 25%, Testing, Debugging, and Deployment 20%. The
exam guide itself (Help article 005298965) does not render for automated fetchers, so format is
"guides say" (two guides that agree): 60 scored multiple-choice/multiple-select plus up to 5
unscored, 105 minutes, 68% to pass, registered through Trailhead Academy, Pearson VUE onsite or
online. No fee is stated anywhere.

Rebuild: `python3 -I tools/build-run-2026-11-18/sfpd1/build.py`. Validate from a copy that does not
write bankSizes: `python3 -I tools/validate_v2_bank.py sfpd1 '{"1": {"pd": {"1": 60}}, "2": {"pd": {"1": 60}}}'`
(201 questions, 0 stimuli, 0 problems; key strictly longest 28/195 single = 14.4%). Do not add
`sfpd1` to `tools/build_v2_bank.py` PLANS.

Dashboard: 9 drills + 2 tests = 11 steps. Two 60-item tests in 105 minutes (Test 2 held out), per
test 8/8/6/6/5/9/6/7/5 across the nine domain files; 9 drill-only per domain (81). Formats: single
plus 6 choose-two (the real exam's two formats); all-number options are sorted and `lockedOrder`.
Apex and SOQL shown through `cmd()` / `cli()` (KaTeX `\texttt`, as ccna and linuxplus).
Premium through PREMIUM_V2_IDS: the registry locks the last three of 11 steps, Practice Test 2 and
the Testing and Debugging and Deployment drills (the landing FAQ says so).

Screenshots still needed: `public/landing/sfpd1-mobile.png`, `sfpd1-desktop.png` (and `-dark`).
Shoot with `sfpd1:salesforce-platform-developer:v2:platform`.

## lib/v2/bankSizes.ts
```ts
  sfpd1: 201,
```

## lib/v2/registry.ts
```ts
import { SFPD1 } from "./exams/sfpd1";
// EXAMS_V2: add SFPD1 in the IT certs cluster (next to the other cloud/vendor certs)
// PREMIUM_V2_IDS: add "sfpd1" on the IT line
```

## lib/server/classQuestions.ts
```ts
import "@/lib/v2/banks/sfpd1";
```

## lib/server/mcpV2Practice.ts
```ts
import '@/lib/v2/banks/sfpd1';
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `SFPD1.domainLabels` (keys `sfpdPlatform`, `sfpdDataModel`,
`sfpdApex`, `sfpdQueries`, `sfpdTriggers`, `sfpdLwc`, `sfpdUiSecurity`, `sfpdTesting`,
`sfpdDeploy`).

## app/globals.css
Hue 266 100% 32% (deep violet). White text 11.7:1. Checked against every `[data-theme]`
in globals.css on 2026-11-18 with the clash rule (within 8 degrees, differ by 15 saturation or 8
lightness): no clash. The whole blue band (190 to 225) at lightness 30 to 48 is taken, so Salesforce
blue was not possible. Matches `lib/v2/exams/sfpd1.ts` `theme`. Run `tools/gen_dark_brand_css.py`
afterwards to generate the `.dark` block.
```css
  /* Salesforce Certified Platform Developer theme: deep violet (v2 exam; matches lib/v2/exams/sfpd1.ts theme) */
  [data-theme="sfpd1"] {
    --brand: 266 100% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 266 60% 96%;
    --brand-hover: 266 100% 28%;
    --brand-dark: 266 100% 25%;
    --brand-darker: 266 90% 17%;
    --brand-muted: 266 40% 72%;
    --brand-border: 266 45% 82%;
    --brand-border-light: 266 40% 90%;
    --brand-gradient-to: 276 60% 96%;
  }
```

## lib/shareCardCopy.ts
```ts
  sfpd1: { title: "Salesforce Platform Developer", description: "Practise Apex, SOQL, triggers, Lightning Web Components, security, testing and deployment." },
```

## lib/tigerAssets.ts
```ts
// BORROWED_SETS (next to sfadmin): sfpd1 borrows the AWS tiger, like sfadmin
  sfpd1: "aws",
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line, next to sfadmin
  sfpd1: "GLOBAL",
// NON_DRIVING_TESTS: add
  "sfpd1",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  sfpd1: "Salesforce Certified Platform Developer (formerly Platform Developer I) practice on the exam's four sections: multitenancy, governor limits and the data model, Apex, SOQL, SOSL, DML and triggers, Lightning Web Components, security and Visualforce, and testing, debugging and deployment, every answer explained.",
// EXAM_ORG
  sfpd1: "Salesforce · Platform Developer exam sections, Trailhead cert prep 2026",
// SEARCH_ALIASES
  sfpd1: "salesforce developer platform developer i platform developer 1 pd1 pdi pd 1 plat-dev-201 plat dev 201 salesforce dev certification apex developer apex certification soql lwc lightning web components salesforce developer exam",
// RELATED_OVERRIDES (optional; the IT group is large)
  sfpd1: ["sfadmin", "awssaa", "az900"],
```
Hub group "IT certifications" (`TEST_GROUPS` line in testCatalog.ts): add `"sfpd1"` right after
`"sfadmin"`.
`tests/test-search-aliases.test.cjs`: add cases for "pd1", "salesforce developer" and
"platform developer i" opening `sfpd1` (check that "salesforce admin" still opens `sfadmin` first
and "salesforce developer" does not rank sfadmin above sfpd1).

## lib/examFacts.ts
```ts
  sfpd1: {
    answer:
      "The Salesforce Certified Platform Developer exam, formerly Platform Developer I (PDI), tests building custom business logic and interfaces on the Salesforce Platform with Apex, SOQL, triggers and Lightning Web Components. Guides quoting the current exam guide give 60 scored multiple-choice and multiple-select questions plus up to 5 unscored ones in 105 minutes, with 68% needed to pass. Salesforce's Trailhead cert prep weights its four sections Developer Fundamentals 27%, Process Automation and Logic 28%, User Interface 25%, and Testing, Debugging, and Deployment 20%.",
    rows: [
      { label: "Questions", value: "60 scored, plus up to 5 unscored" },
      { label: "Time", value: "105 minutes" },
      { label: "Passing score", value: "68%" },
      { label: "Largest section", value: "Process Automation and Logic, 28%" },
      { label: "Formerly", value: "Platform Developer I (PDI)" },
      { label: "Run by", value: "Salesforce, registered through Trailhead" },
    ],
    basedOn: "Salesforce's Trailhead Platform Developer cert prep section weights, and the exam guide as quoted by study guides, checked November 2026",
    source: { name: "Trailhead: Salesforce Certified Platform Developer", url: "https://trailhead.salesforce.com/credentials/platformdeveloperi" },
  },
```

## Teacher-led (Apex development is taught in Trailhead Academy courses, bootcamps and college Salesforce programs)
`components/TeachNudge.tsx` `TEACHER_LED`: add `"sfpd1"`.
`components/exam/ExamClassFaq.tsx` `TEACHES`:
```ts
  sfpd1: "a Salesforce developer course or bootcamp",
```
(The landing renders `<ExamClassFaq examId="sfpd1" />` and `classFaqJsonLd("sfpd1")`; if you
decide it is not teacher-led, drop both from the landing instead.)

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` with a comment naming Salesforce Platform Developer.

## lib/examFreshness.json
```json
    {
      "exam": "sfpd1",
      "date": "2026-11-18",
      "kind": "review",
      "what": "Apex API version 67.0 (Summer '26) made classes without a sharing keyword run with sharing, made Apex run in user context by default and disallowed WITH SECURITY_ENFORCED; the Visualforce guide still says custom controllers run in system mode.",
      "action": "Built with version-named questions on these defaults only. Recheck when Salesforce's Platform Developer exam guide names the release it aligns to.",
      "source": "https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_apex_developer_guide.pdf",
      "done": "2026-11-18"
    }
```

## lib/examSources.json
Run `python3 -I tools/build_exam_sources.py` after the merge (sources.md lists the Trailhead
credential page and the cert prep units first).

## CLAUDE.md
Add in the v2 exams section, after the SC-200 bullet:

- **Salesforce Platform Developer** (`sfpd1`, v2, Salesforce Certified Platform Developer, formerly Platform Developer I (PDI, Plat-Dev-201; Trailhead's credential URL is still `/credentials/platformdeveloperi`), `/salesforce-platform-developer/*`, landing `/salesforce-platform-developer-practice-test`, `[data-theme="sfpd1"]` deep violet (266 100% 32%; the blue band is full), region GLOBAL, hub group "IT certifications" (after sfadmin), Premium, borrows the AWS tiger like sfadmin, teacher-led (Salesforce developer courses)): section weights from Salesforce's Trailhead cert prep modules (Developer Fundamentals 27%, Process Automation and Logic 28%, User Interface 25%, Testing, Debugging, and Deployment 20%); the exam guide (Help article 005298965) does not render for automated fetchers, so format is from two guides quoting it: 60 scored multiple-choice and multiple-select plus up to 5 unscored, 105 minutes, 68% to pass, Trailhead Academy registration, Pearson VUE onsite or online. One section `pd`, one 60-item module in 105 minutes, two tests with Test 2 held out, 9 drills, one per domain file (`sfpdPlatform` 8 and `sfpdDataModel` 8 = Developer Fundamentals; `sfpdApex` 6, `sfpdQueries` 6, `sfpdTriggers` 5 (with async Apex) = Process Automation and Logic; `sfpdLwc` 9 (with Apex for flows and Agentforce actions) and `sfpdUiSecurity` 6 (security and Visualforce) = User Interface; `sfpdTesting` 7 and `sfpdDeploy` 5 per test), 9 drill-only per domain, no Basics, 11 dashboard steps (Premium: Practice Test 2 and the Testing and Debugging and Deployment drills). Bank `data/v2/sfpd1/questions.json` (201 items, prefix `SFPD1-`, plain array; single plus 6 choose-two; all-number options sorted and locked; Apex and SOQL in monospace through `cmd()` / `cli()`, with no single-quoted string literals since KaTeX curls them) built by `python3 -I tools/build-run-2026-11-18/sfpd1/build.py` from one source per domain (key first, shuffled by a stem seed). Facts from Salesforce's Winter '27 PDFs on resources.docs.salesforce.com (Apex Developer Guide, SOQL and SOSL Reference, Visualforce, Salesforce DX and Aura guides; developer.salesforce.com returns 403) and Trailhead LWC, data modeling, flow and Agentforce Vibes units. API 67.0 changed Apex's default sharing and user mode, so questions on defaults name the version; no heap figure (the guide disagrees with itself). Kept clear of the `sfadmin` bank (eight shared facts rewritten from the developer's side). Sources in `tools/build-run-2026-11-18/sfpd1/sources.md`.
