# Wiring for `aufirearmsvic` (Victoria firearm safety course test)

Built like `aufirearmsnsw`. Bank: `data/vic-firearms-questions.json` (200 rows, built by
`python3 -I tools/next100/aufirearmsvic/build.py`). Files already written: the bank,
`lib/banks/aufirearmsvic.ts`, `app/vic-firearms-licence/{layout,page}.tsx`,
`app/vic-firearms-licence/{dashboard,drill,stats}/page.tsx` and
`app/victoria-firearms-safety-test-practice-test/page.tsx`. Everything below is a shared file.

## config (lib/exams.ts)

Add `"aufirearmsvic"` to the `ExamId` union, the config next to `aufirearmsnsw`, and
`aufirearmsvic` to `EXAMS` after `aufirearmsnsw`.

```ts
const aufirearmsvic: ExamConfig = {
  id: "aufirearmsvic",
  stateCode: "AUFAVIC",
  idBase: 30100,
  slug: "/vic-firearms-licence",
  landingPath: "/victoria-firearms-safety-test-practice-test",
  name: "Victoria Firearms Safety Practice Test",
  shortName: "Vic Firearms Safety",
  examLabel: "firearm safety course test",
  fullName: "Victorian Firearm Safety Course Test (Longarm) for a Firearm Licence",
  questionIdPrefix: "AUFAVIC-",
  icon: "target",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Victorian longarm firearm safety course and its multiple-choice safety and law knowledge test
  // (Victoria Police Licensing and Regulation Division sets the minimum course requirements and
  // approves independent instructors), required before a first longarm or junior licence by the
  // Firearms Act 1996 (Vic) s 17(1)(c)(iii) and s 20(1)(b)(iii). No weights, count or pass mark
  // are published, so the split is Tigertest's: Victorian law 31 (categories 6, licences 7,
  // permits, buying and registration 6, carriage, conduct and offences 7, storage and transport 5)
  // and safe use 19 (the ten rules of the Victorian Firearm Safety Code 7, the field 6, firearm
  // types, actions and ammunition 6). Every legal rule is from the Firearms Act 1996 as in force
  // from 19 August 2026 (authorised version 107: the 2021 steel safe standard in Schedule 4, lever
  // action shotguns in B or D since 2019); the uncommenced Parts 6 and 7 of the Firearms Amendment
  // Act 2026 (citizenship, background checks) and Regulation-only rules are left out. Handling
  // from the Firearm Safety Code booklet (2020), the longarm course slides and the instructors
  // manual. 80% is a readiness target. All items original.
  blueprint: {
    fvicCategories: 6,
    fvicLicence: 7,
    fvicPermits: 6,
    fvicCarriage: 7,
    fvicStorage: 5,
    fvicRules: 7,
    fvicField: 6,
    fvicParts: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 30101, name: "Licence Categories & Applying", categories: ["fvicCategories", "fvicLicence"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 2, id: 30102, name: "Permits, Carriage & the Law", categories: ["fvicPermits", "fvicCarriage"], size: 52, weightLabel: "13 of 50 test questions" },
    { setNumber: 3, id: 30103, name: "Storage & the Ten Safety Rules", categories: ["fvicStorage", "fvicRules"], size: 48, weightLabel: "12 of 50 test questions" },
    { setNumber: 4, id: 30104, name: "The Field & Firearm Basics", categories: ["fvicField", "fvicParts"], size: 48, weightLabel: "12 of 50 test questions" },
  ],
  categoryLabels: {
    fvicCategories: "Licence & Firearm Categories",
    fvicLicence: "Licences, Genuine Reasons & Eligibility",
    fvicPermits: "Permits, Buying & Registration",
    fvicCarriage: "Carriage, Conduct & Offences",
    fvicStorage: "Safe Storage & Transport",
    fvicRules: "The Ten Safety Rules",
    fvicField: "In the Field",
    fvicParts: "Firearm Types, Actions & Ammunition",
  },
  copy: {
    guestPrompt: "to save your Victorian firearm safety progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets covering Victorian licence categories and applying, permits, carriage and the law, storage and the ten safety rules, and the field and firearm basics. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across every topic",
    heroSubs: [
      "Four training sets, four practice tests. Start with Licence Categories & Applying.",
      "Master each set, then take a practice test.",
      "Keep going. Take a practice test to see where you stand.",
      "Review your mistakes, then retake any test you haven't passed.",
      "All done. You're ready for your firearm safety course.",
    ],
    sourceLine: "Based on the Firearms Act 1996 (Vic), the Victoria Police Firearm Safety Code booklet and the longarm safety course material. Original questions. Not affiliated with Victoria Police or its Licensing and Regulation Division.",
    analyticsKey: "aufirearmsvic",
  },
};
```

Then run `npx tsx scripts/build-training-parts.ts` (no set is over 60, so no parts) and
`npx tsx scripts/build-landing-dates.ts`.

## bank module (lib/banks/all.ts)

```ts
import "./aufirearmsvic";
```

## types (types/index.ts, the category union, after the fnsw keys)

```ts
  | "fvicCategories"
  | "fvicLicence"
  | "fvicPermits"
  | "fvicCarriage"
  | "fvicStorage"
  | "fvicRules"
  | "fvicField"
  | "fvicParts"
```

State code: `AUFAVIC`. `grep -c fvic types/index.ts` was 0 before this build.

## labels (i18n/*.ts, after the `// aufirearmsnsw` block, the same English in every file)

```ts
    // aufirearmsvic
    fvicCategories: "Licence & Firearm Categories",
    fvicLicence: "Licences, Genuine Reasons & Eligibility",
    fvicPermits: "Permits, Buying & Registration",
    fvicCarriage: "Carriage, Conduct & Offences",
    fvicStorage: "Safe Storage & Transport",
    fvicRules: "The Ten Safety Rules",
    fvicField: "In the Field",
    fvicParts: "Firearm Types, Actions & Ammunition",
```

## theme (app/globals.css, after `[data-theme="aufirearmsnsw"]`)

Hue as given in the run table (241 45% 38%). Then re-run `tools/gen_dark_brand_css.py` for the
`.dark` block.

```css
  [data-theme="aufirearmsvic"] {
    --brand: 241 45% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 241 50% 95%;
    --brand-hover: 241 45% 32%;
    --brand-dark: 241 45% 28%;
    --brand-darker: 241 40% 18%;
    --brand-muted: 241 25% 70%;
    --brand-border: 241 30% 78%;
    --brand-border-light: 241 30% 88%;
    --brand-gradient-to: 256 50% 95%;
  }
```

## catalog (lib/testCatalog.ts)

Blurb:

```ts
  aufirearmsvic: "Practice for the Victorian firearm safety course test you need before a first firearm licence: the Firearms Act 1996 as in force from August 2026, licence categories, permits to acquire, steel safe storage, carriage and the ten rules of the Firearm Safety Code, in four 50-question tests.",
```

Org (`EXAM_ORG`):

```ts
aufirearmsvic: "Victoria Police Licensing and Regulation Division · longarm firearm safety course test (Firearms Act 1996)",
```

Hub group: add to "Australia firearms licences":

```ts
  { title: "Australia firearms licences", ids: ["aufirearmsqld", "aufirearmsnsw", "aufirearmsvic"] },
```

Search aliases:

```ts
  aufirearmsvic: "victoria firearms licence victoria gun licence vic firearms licence vic gun licence victorian firearm safety course victoria firearm safety test vic firearms safety test longarm safety course victoria firearm safety code victoria licensing and regulation division firearms act 1996 victoria vic gun licence test gun licence melbourne vic permit to acquire",
```

Related (`RELATED_OVERRIDES`):

```ts
  aufirearmsvic: ["aufirearmsnsw", "aufirearmsqld", "nzfirearms"],
```

Search alias tests (`tests/test-search-aliases.test.cjs`):

```js
  ["victoria firearms licence", "AU", "aufirearmsvic"],
  ["vic gun licence test", "AU", "aufirearmsvic"],
  ["firearm safety course victoria", "AU", "aufirearmsvic"],
  ["longarm safety course", "AU", "aufirearmsvic"],
```

## region (lib/region.ts TEST_REGIONS)

```ts
  aufirearmsvic: "AU",
```

## mascot (lib/tigerAssets.ts BORROWED_SETS)

```ts
  aufirearmsvic: "hunter",
```

## share card (lib/shareCardCopy.ts, and add "aufirearmsvic" to SHARE_COPY_IDS in lib/shareImageUrl.ts)

```ts
  aufirearmsvic: { title: "Victoria Firearms Safety Practice Test", description: "Review Victorian firearms law, licence categories, permits, storage and the ten safety rules before your course." },
```

## facts (lib/examFacts.ts)

```ts
  aufirearmsvic: {
    answer:
      "In Victoria, a firearm licence is not issued unless the applicant has satisfactorily completed an approved course of firearms safety and has a good knowledge of firearms law (Firearms Act 1996, s 17). Victoria Police sets the minimum course requirements and approves independent instructors; the longarm course ends with a short multiple-choice safety and law knowledge test sat in person, and a pass earns a certificate for the licence application. Licences are issued by Victoria Police's Licensing and Regulation Division. An adult applicant must be 18 or over, live or work in Victoria, be a fit and proper person with a genuine reason, and be able to meet the storage rules. A first licence cannot be issued until 28 days after applying.",
    rows: [
      { label: "Course", value: "Approved firearm safety course for the licence type (longarm course for categories A and B and junior licences)" },
      { label: "Assessment", value: "Short multiple-choice safety and law knowledge test, sat in person" },
      { label: "Licence age", value: "18 for an adult licence; 12 to 17 for a junior licence with written parental consent" },
      { label: "Waiting period", value: "28 days after applying for a licence" },
      { label: "Licence term", value: "Up to 5 years for categories A and B; up to 3 years for C, D and E" },
      { label: "Permit to acquire", value: "Needed for every firearm, valid 28 days" },
      { label: "Licensing body", value: "Victoria Police Licensing and Regulation Division" },
    ],
    basedOn: "The Firearms Act 1996 (authorised version in force from 19 August 2026) on legislation.vic.gov.au, the Victoria Police eligibility page and the Firearm Safety Code booklet, checked November 2026",
    source: { name: "Victoria Police: eligibility requirements for firearm applications", url: "https://www.police.vic.gov.au/firearm-licence-eligibility-requirements" },
  },
```

## teacher-led

Not teacher-led (like `aufirearmsnsw`): no TEACHER_LED or TEACHES lines.

## Premium

Standard v1 locks (no extra lines).

## CLAUDE.md bullet (after the NSW Firearms Safety bullet)

- **Victoria Firearms Safety** (`aufirearmsvic`, the Victorian longarm firearm safety course and its multiple-choice safety and law knowledge test, which a first-time applicant needs before a firearm licence under the Firearms Act 1996 (Vic) s 17(1)(c)(iii) (junior licences s 20(1)(b)(iii)), run by instructors Victoria Police approves, `/vic-firearms-licence/*`, landing `/victoria-firearms-safety-test-practice-test`): `data/vic-firearms-questions.json` (200 original questions: licence and firearm categories (s 3 definitions: A airguns, non-semi rimfire, shotguns other than lever, pump or semi; B muzzle loaders, non-semi centre fire, lever shotguns up to 5 rounds since 2019; C semi rimfire up to 10 and semi or pump shotguns up to 5; D larger and every semi centre fire; E machine guns and longarms under 75 cm; handguns 65 cm; ss 9 to 13 reasons and number limits, junior licences, Schedule 2 magazine limits, s 134 shortening, s 134A and 134B alterations) 24, licences, genuine reasons and eligibility (ss 10, 17, 20, 33, 39 to 41A, 46, 47, 53, Schedules 1 and 2: age 18, residence or work, course and knowledge of law, storage, 28-day wait, 5 years for A and B and 3 for C, D and E, junior extension, police storage inspections, 7-day change of reason, prohibited persons and intervention orders per Victoria Police, suspension and surrender, landholder permission, 4 clay competitions a year) 28, permits, buying and registration (ss 95 to 98, 102 to 110, 115 to 120, 124, 125, 133 to 136: a permit for every firearm valid 28 days, the 28-day wait only without a registered firearm, private sales through a dealer as agent, 7-day notices into and out of Victoria, ammunition only for the licensed category, no disposal to minors) 24, carriage, conduct and offences (ss 126 to 132, 137, 139, 140, 150, 185, Schedule 3: loaded firearms in public places including vehicles, private property consent, alcohol and drugs, 24-hour loss notice, 14-day change of address, producing the licence, supervised instruction only at approved ranges, interstate visitors) 28, storage and transport (Schedule 4 as substituted in 2021: purpose-built steel receptacle of 1.6 mm to AS/NZS 1594, bolted under 150 kg, alarm over 15 firearms, ammunition locked separately, C and D key carried or in another room; booklet travel and camp advice) 20, the ten rules of the Victorian Firearm Safety Code 28, the field (fences, hazards, semi-readiness, spotlighting from vehicles, Game Licence and GMA rules) 24, firearm types, actions and ammunition 24), test IDs 30101-30104, sets 30101-30104 (by topic: Licence Categories & Applying 52, Permits, Carriage & the Law 52, Storage & the Ten Safety Rules 48, The Field & Firearm Basics 48), state `AUFAVIC`, prefix `AUFAVIC-`, 80% readiness line (Tigertest's: Victoria Police publishes no count or pass mark). 6/7/6/7/5/7/6/6 per test, Tigertest's split. Legal rules from the Firearms Act authorised version 107 (in force 19 August 2026) only; the uncommenced Parts 6 and 7 of the Firearms Amendment Act 2026 (citizenship, background checks), the Firearms Regulations 2018, fees, penalties and danger ranges (the booklet and slides disagree) are left out. Handling from the Firearm Safety Code booklet (2020), the longarm course slides and the draft instructors manual, all on police.vic.gov.au and fetched by the builder on 2026-11-15. Checked against `aufirearmsnsw`, `aufirearmsqld`, `nzfirearms`, `capal` and `crfsc` for repeated fact-and-answer pairs. Built by `tools/next100/aufirearmsvic/build.py`; sources in `tools/next100/aufirearmsvic/sources.md`. Region AU, hub group "Australia firearms licences", `[data-theme="aufirearmsvic"]` muted indigo (241 45% 38%), borrows the hunter tiger, not teacher-led.

## screenshots

`public/landing/aufirearmsvic-mobile.png` and `public/landing/aufirearmsvic-desktop.png` (light
and dark) with `scripts/shoot_landing.js` after wiring.
