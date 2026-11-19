# Salesforce Platform App Builder (`sfappbuilder`) wiring for the integrator

v2 exam on the `linuxplus` / `pentestplus` template. Files written (unique to this exam):
`tools/build-run-2026-11-18/sfappbuilder/*` (helpers.py, eight domain sources as Python data,
build.py, sources.md, this file), `data/v2/sfappbuilder/questions.json` (plain array, 200 items,
prefix `SFAPP-`, unused before this build), `lib/v2/exams/sfappbuilder.ts` (export
`SFAPPBUILDER`), `lib/v2/banks/sfappbuilder.ts` (`plainBank`), `app/salesforce-app-builder/*`
(layout, root redirect, dashboard, stats; no test or practice folders),
`app/salesforce-platform-app-builder-practice-test/page.tsx`.

## Exam checked
Salesforce Certified Platform App Builder. The exam guide (Help article 005298964, linked from the
Trailhead trail) was refreshed in August 2026 to the Summer '26 release: 60 scored
multiple-choice and multiple-select questions plus up to 5 unscored, 105 minutes, 73% to pass
(it was 63%, older guides also say 68%). Sections: Salesforce Fundamentals 18%, Data Modeling and
Management 20%, Business Logic and Process Automation 32%, User Interface 17%, App Deployment 13%.
The Help page does not render for fetchers (same as sfadmin and sfpd1); its text came from the
search index of help.salesforce.com and two dated guides agree (sources.md). Please check the
weights once in a browser at https://help.salesforce.com/s/articleView?id=005298964&type=1.

Rebuild: `python3 -I tools/build-run-2026-11-18/sfappbuilder/build.py`. Validate from a copy that
does not write bankSizes:
`python3 -I tools/validate_v2_bank.py sfappbuilder '{"1": {"pab": {"1": 60}}, "2": {"pab": {"1": 60}}}'`
(200 questions, 0 stimuli, 0 problems). Do not add `sfappbuilder` to `tools/build_v2_bank.py` PLANS.

Dashboard: 8 drills + 2 tests = 10 steps. Two 60-item tests in 105 minutes (Test 2 held out), per
test 5/6/7/5/8/11/10/8 across the eight domain files (18/20/32/17/13 of 60); 10 drill-only per
domain (80). Formats: 185 single, 12 choose-two, 2 typed numeric (formula math), 1 order, 1
matrix. Premium through PREMIUM_V2_IDS: the registry locks the last three steps, Practice Test 2
and the UI and Deploy drills (the landing FAQ says so).

Screenshots still needed: `public/landing/sfappbuilder-mobile.png`, `sfappbuilder-desktop.png`
(and `-dark`). Shoot with `sfappbuilder:salesforce-app-builder:v2:fundamentals`.

## lib/v2/bankSizes.ts
```ts
  sfappbuilder: 200,
```

## lib/v2/registry.ts
```ts
import { SFAPPBUILDER } from "./exams/sfappbuilder";
// EXAMS_V2: add SFAPPBUILDER right after SFPD1 (Salesforce, in the IT certs cluster)
// PREMIUM_V2_IDS: add "sfappbuilder" on the IT line, after "sfpd1" (or after "gcppca")
```

## lib/server/classQuestions.ts
```ts
import "@/lib/v2/banks/sfappbuilder";
```

## lib/server/mcpV2Practice.ts
```ts
import '@/lib/v2/banks/sfappbuilder';
```

## types/index.ts and i18n/*
Nothing: v2 domain labels live in `SFAPPBUILDER.domainLabels` (keys `sfappFundamentals`,
`sfappSecurity`, `sfappDataModel`, `sfappDataMgmt`, `sfappFormulas`, `sfappFlow`, `sfappUI`,
`sfappDeploy`).

## app/globals.css
Hue 278 80% 40% (violet). White text 6.4:1. Checked against every `[data-theme]` in globals.css,
every `lib/v2/exams/*.ts` theme and the brand lines in this run's WIRING.md files (sfpd1 266 100%
32%, linuxplus 39 25% 42%) on 2026-11-18: no theme within 8 degrees is within 15 saturation and
8 lightness. The whole blue band (190 to 260) is taken at every legal lightness, so Salesforce
blue was not possible. Matches `lib/v2/exams/sfappbuilder.ts` `theme`. Run
`tools/gen_dark_brand_css.py` afterwards for the `.dark` block.
```css
  /* Salesforce Platform App Builder theme: violet (v2 exam; matches lib/v2/exams/sfappbuilder.ts theme) */
  [data-theme="sfappbuilder"] {
    --brand: 278 80% 40%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 278 80% 96%;
    --brand-hover: 278 80% 35%;
    --brand-dark: 278 80% 31%;
    --brand-darker: 278 80% 21%;
    --brand-muted: 278 40% 70%;
    --brand-border: 278 50% 82%;
    --brand-border-light: 278 50% 90%;
    --brand-gradient-to: 290 70% 96%;
  }
```

## lib/shareCardCopy.ts
```ts
  sfappbuilder: { title: "Salesforce Platform App Builder", description: "Practise data models, security, formulas, Flow, Lightning pages and app deployment." },
```

## lib/tigerAssets.ts
```ts
// BORROWED_SETS, next to sfadmin: sfappbuilder borrows the AWS tiger like sfadmin
  sfappbuilder: "aws",
```

## lib/region.ts
```ts
// TEST_REGIONS: on the GLOBAL line, next to sfadmin
  sfappbuilder: "GLOBAL",
// NON_DRIVING_TESTS: add
  "sfappbuilder",
```

## lib/testCatalog.ts
```ts
// EXAM_BLURBS
  sfappbuilder: "Salesforce Certified Platform App Builder practice on the Summer '26 exam guide: lookup and master-detail data models, sharing and field access, formulas, roll-ups and validation rules, Flow, approvals and Agentforce, Lightning pages and actions, and sandboxes, change sets and packages, every answer explained.",
// EXAM_ORG
  sfappbuilder: "Salesforce · Platform App Builder exam guide (Summer '26)",
// SEARCH_ALIASES
  sfappbuilder: "salesforce app builder platform app builder certified platform app builder salesforce app builder certification app builder exam pab salesforce developer declarative lightning app builder flow builder salesforce certification",
// RELATED_OVERRIDES (optional; the IT group is large)
  sfappbuilder: ["sfadmin", "sfpd1", "servicenowcsa"],
```
Hub group "IT certifications" (`TEST_GROUPS` line in testCatalog.ts): add `"sfappbuilder"` right
after `"sfpd1"` (or after `"sfadmin"` if sfpd1 is not merged).
`tests/test-search-aliases.test.cjs`: add cases for "platform app builder", "salesforce app
builder" and "app builder" opening `sfappbuilder`. Check that "lightning app builder" and
"salesforce admin" still open sfadmin first (sfadmin's aliases include "lightning"); drop
"lightning app builder" from this alias line if it steals that search.

## lib/examFacts.ts
```ts
  sfappbuilder: {
    answer:
      "The Salesforce Certified Platform App Builder exam has 60 scored multiple-choice and multiple-select questions, plus up to 5 unscored ones, in 105 minutes, and you need 73% to pass. It was refreshed in August 2026 to the Summer '26 release, with Business Logic and Process Automation 32%, Data Modeling and Management 20%, Salesforce Fundamentals 18%, User Interface 17% and App Deployment 13%. Older guides that give 63% or 68% to pass describe earlier versions.",
    rows: [
      { label: "Questions", value: "60 scored, plus up to 5 unscored" },
      { label: "Time", value: "105 minutes" },
      { label: "Passing score", value: "73%" },
      { label: "Largest section", value: "Business Logic and Process Automation, 32%" },
      { label: "Exam guide", value: "Refreshed in August 2026 (Summer '26)" },
      { label: "Run by", value: "Salesforce, registered through Trailhead" },
    ],
    basedOn: "the Salesforce Certified Platform App Builder exam guide (Summer '26), checked November 2026",
    source: { name: "Trailhead: Salesforce Certified Platform App Builder", url: "https://trailhead.salesforce.com/credentials/platformappbuilder" },
  },
```

## Teacher-led (App Builder is taught in Trailhead Academy and Salesforce training courses)
`components/TeachNudge.tsx` `TEACHER_LED`: add `"sfappbuilder"` next to `"sfpd1"` (or `"linuxplus"`).
`components/exam/ExamClassFaq.tsx` `TEACHES`:
```ts
  sfappbuilder: "a Salesforce App Builder or Salesforce admin course",
```

## lib/seoDates.ts
Bump `EXAM_LANDINGS_UPDATED_AT` with a comment naming Salesforce Platform App Builder.

## lib/examFreshness.json
```json
    {
      "exam": "sfappbuilder",
      "date": "2026-08-01",
      "kind": "outline",
      "what": "Salesforce refreshed the Platform App Builder exam guide in August 2026 to the Summer '26 release: weights 18/20/32/17/13, 73% to pass (was 63%), deeper Flow and Agentforce as an automation tool.",
      "action": "Built to the refreshed guide from the start; nothing to change.",
      "source": "https://help.salesforce.com/s/articleView?id=005298964&type=1&language=en_US",
      "done": "2026-11-18"
    }
```

## lib/examSources.json
Run `python3 -I tools/build_exam_sources.py` after the merge (sources.md lists the exam guide, the
Trailhead trail and the Trailhead prep documents first).

## CLAUDE.md
Add in the v2 exams section, after the Salesforce Platform Developer (sfpd1) bullet:

- **Salesforce Platform App Builder** (`sfappbuilder`, v2, Salesforce Certified Platform App Builder, `/salesforce-app-builder/*`, landing `/salesforce-platform-app-builder-practice-test`, `[data-theme="sfappbuilder"]` violet (278 80% 40%; the blue band is full), region GLOBAL, hub group "IT certifications" (after sfpd1), Premium, borrows the AWS tiger like sfadmin, teacher-led (Salesforce App Builder courses)): the exam guide (Help article 005298964) was refreshed in August 2026 to the Summer '26 release: 60 scored multiple-choice and multiple-select questions plus up to 5 unscored in 105 minutes, 73% to pass (63% before; older guides also say 68%), Salesforce Fundamentals 18%, Data Modeling and Management 20%, Business Logic and Process Automation 32%, User Interface 17%, App Deployment 13%. The Help page does not render for automated fetchers, so its text was read from the help.salesforce.com search index and confirmed by two dated guides; the 2021 Trailhead prep documents (23/22/28/17/10, 63%) are out of date. One section `pab`, one 60-item module in 105 minutes, two tests with Test 2 held out, 8 drills, one per domain file (`sfappFundamentals` 5 and `sfappSecurity` 6 = Fundamentals; `sfappDataModel` 7 and `sfappDataMgmt` 5 = Data Modeling and Management; `sfappFormulas` 8 and `sfappFlow` 11 = Business Logic; `sfappUI` 10; `sfappDeploy` 8 per test), 10 drill-only per domain, no Basics, 10 dashboard steps (Premium: Practice Test 2 and the UI and Deploy drills). Bank `data/v2/sfappbuilder/questions.json` (200 items, prefix `SFAPP-`, plain array; single plus 12 choose-two, 2 typed numeric, 1 order, 1 matrix; all-number options sorted and locked) built by `python3 -I tools/build-run-2026-11-18/sfappbuilder/build.py` from one source per domain (key first, shuffled by a stem seed). Facts from Salesforce's Winter '27 PDFs on resources.docs.salesforce.com (Data Loader Guide, validation and formula examples, limits quick reference, packaging guides) and Trailhead data modeling, formulas, data security, actions and record-triggered flow units; product names AgentExchange (formerly AppExchange) and Lifecycle Center (formerly next-generation DevOps Center, renamed from October 2026) follow the Trailhead trail. Kept clear of the `sfadmin` and `sfpd1` banks (about 30 items that shared a fact and answer with sfadmin rewritten to other facts). Sources in `tools/build-run-2026-11-18/sfappbuilder/sources.md`.
