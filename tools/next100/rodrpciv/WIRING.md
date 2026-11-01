# Wiring for `rodrpciv` (Romania driving licence theory exam, category B, v1)

Files already written by the builder: `data/romania-drpciv-questions.json` (200, PASS),
`lib/banks/rodrpciv.ts`, `app/romania-driving-theory/*` (8 wrappers, copied from
`app/pakistan-driving-test/`), `app/romania-driving-theory-test/page.tsx`,
`tools/next100/rodrpciv/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/rodrpciv/build.py`. Everything below goes in shared files.

Format note: the real exam (Order MAI 268/2010 art. 10-11) is 26 questions in 30 minutes, at least
22 correct to pass, 3 options per question with one to three correct, after 3 unscored warm-up
questions. Tigertest models seven real-length tests of 26 (one key per item, 4 options), passPct 84
(22/26 = 84.6% passes, 21/26 = 80.8% fails, the same trick as `nzroad`'s 91). Pools are 7x each
per-test count plus 18 training-only spares. Dashboard = 4 topic sets + 7 tests = 11 steps. No set
exceeds 60.

## lib/exams.ts

Add `"rodrpciv"` to the `ExamId` union. Icon `car` already exists.

Block (with the other driving tests, after `pkdrive`):

```ts
const rodrpciv: ExamConfig = {
  id: "rodrpciv",
  stateCode: "RODRPCIV",
  idBase: 13900,
  slug: "/romania-driving-theory",
  landingPath: "/romania-driving-theory-test",
  name: "Romania Driving Theory Practice Test",
  shortName: "Romania driving theory",
  examLabel: "Romania DRPCIV theory exam",
  fullName: "Romania driving licence theory exam (DGPCI, formerly DRPCIV, category B)",
  questionIdPrefix: "RODRP-",
  icon: "car",
  testCount: 7,
  questionsPerTest: 26,
  passPct: 84,
  // Real exam (Order MAI 268/2010 as amended, art. 10(2)(b) and 11, checked 2026-11-01): category B
  // is 26 questions in 30 minutes, at least 22 correct to pass, preceded by 3 unscored warm-up
  // questions; each question has 3 options with one, two or three correct. Offered in Romanian,
  // Hungarian or German (minority mother tongue) and, for foreigners and EU/EEA/Swiss citizens, in
  // English, French or German. The DGPCI publishes no topic split; weights are Tigertest's, from
  // the topics in art. 10(4). Rules: OUG 195/2002 (Codul rutier) and its regulation (HG 1391/2006),
  // with the 2022 expressway limit of 120 km/h. Seven real-length tests; pools are 7x each count
  // plus 18 training-only spares. passPct 84 = 22 of 26. Tigertest items have one key each.
  blueprint: {
    rodrLicence: 2,
    rodrWarning: 3,
    rodrRegulatory: 4,
    rodrMarkings: 3,
    rodrPriority: 4,
    rodrSpeed: 3,
    rodrParking: 2,
    rodrSafety: 3,
    rodrEmergency: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 13901, name: "Road Signs", categories: ["rodrWarning", "rodrRegulatory"], size: 54, weightLabel: "7 of 26 test questions" },
    { setNumber: 2, id: 13902, name: "Markings, Signals & Priority", categories: ["rodrMarkings", "rodrPriority"], size: 56, weightLabel: "7 of 26 test questions" },
    { setNumber: 3, id: 13903, name: "Speed, Overtaking & Parking", categories: ["rodrSpeed", "rodrParking"], size: 38, weightLabel: "5 of 26 test questions" },
    { setNumber: 4, id: 13904, name: "Licence, Safety & Emergencies", categories: ["rodrLicence", "rodrSafety", "rodrEmergency"], size: 52, weightLabel: "7 of 26 test questions" },
  ],
  categoryLabels: {
    rodrLicence: "Licence, Exam & Documents",
    rodrWarning: "Warning Signs",
    rodrRegulatory: "Priority, Prohibition & Mandatory Signs",
    rodrMarkings: "Markings, Lights & Police Signals",
    rodrPriority: "Priority, Junctions, Trams & Level Crossings",
    rodrSpeed: "Speed Limits, Overtaking & Lanes",
    rodrParking: "Stopping, Parking & Motorways",
    rodrSafety: "Alcohol, Seat Belts, Lights & Behaviour",
    rodrEmergency: "Breakdowns, Accidents & First Aid",
  },
  copy: {
    guestPrompt: "to save your theory test progress and track every question you miss",
    trainingHeading: "Train by Codul rutier topic",
    trainingSub: "Four sets on the Romanian traffic rules and signs the category B theory exam asks about, in English. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 26 questions like the real exam, 22 to pass",
    heroSubs: [
      "Four topics, seven real-length tests. Priority rules weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your theory exam.",
    ],
    sourceLine: "Based on the Romanian traffic code (OUG 195/2002) and Order MAI 268/2010. Original questions; 26 per test, 22 to pass like the real exam (where a question can have up to 3 correct answers).",
    analyticsKey: "rodrpciv",
  },
};
```

Append `rodrpciv` to the `EXAMS` array with the other driving tests (after `pkdrive`).

Check: test IDs 13901-13907 and set IDs 13901-13904 must be free (BRIEF reserves idBase 13900;
13800 `ptimt` and 14000 `setrafik` are the neighbours).

## lib/banks/all.ts

```ts
import "./rodrpciv";
```

## types/index.ts

- `QuestionType`: add `| "RODRPCIV"`.
- `QuestionCategory`, under a `// Romania DRPCIV theory exam` comment:

```ts
  | "rodrLicence"
  | "rodrWarning"
  | "rodrRegulatory"
  | "rodrMarkings"
  | "rodrPriority"
  | "rodrSpeed"
  | "rodrParking"
  | "rodrSafety"
  | "rodrEmergency"
```

(`grep '"rodr' types/index.ts` was empty on 2026-11-01.)

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    rodrLicence: "Licence, Exam & Documents",
    rodrWarning: "Warning Signs",
    rodrRegulatory: "Priority, Prohibition & Mandatory Signs",
    rodrMarkings: "Markings, Lights & Police Signals",
    rodrPriority: "Priority, Junctions, Trams & Level Crossings",
    rodrSpeed: "Speed Limits, Overtaking & Lanes",
    rodrParking: "Stopping, Parking & Motorways",
    rodrSafety: "Alcohol, Seat Belts, Lights & Behaviour",
    rodrEmergency: "Breakdowns, Accidents & First Aid",
```

## app/globals.css

The brief's hue `215 70% 32%` clashes (within 8 degrees and inside 15/8) with `boating`
(215 65% 32%) and the five UK driving themes (222 62% 38%). A scan of every `--brand` on
2026-11-01 found no free slot from hue 205 to 232 at 40-95% saturation and 28-42% lightness; the
nearest free is `234 95% 30%` (deep cobalt, close to the Romanian flag's blue). Other EU builders
may land there too, so the integrator should settle it. White text on 234 95% 30% is far above 4.5:1.
Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Romania DRPCIV theory exam theme */
  [data-theme="rodrpciv"] {
    --brand: 234 95% 30%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 234 70% 96%;
    --brand-hover: 234 95% 25%;
    --brand-dark: 234 95% 22%;
    --brand-darker: 234 85% 15%;
    --brand-muted: 234 35% 70%;
    --brand-border: 234 40% 80%;
    --brand-border-light: 234 40% 90%;
    --brand-gradient-to: 214 60% 96%;
  }
```

## lib/shareCards.ts, lib/shareCardCopy.ts, lib/shareImageUrl.ts (as `pkdrive` has them)

```ts
  "rodrpciv": {
    "color": "hsl(234, 95%, 30%)",
    "tint": "hsl(234, 80%, 96%)"
  },
```
`shareCardCopy.ts`: `rodrpciv: { title: "Romania Driving Theory Test", description: "Review priority to the right, trams, level crossings, speed limits and signs for the category B exam." },`
`shareImageUrl.ts`: add `"rodrpciv"` to `SHARE_COPY_IDS`.

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `rodrpciv: "Seven 26-question mock tests in English for the Romanian category B theory exam (22 to pass): priority to the right, trams, level crossings, signs and markings, speed limits, overtaking, parking, alcohol and accidents, from the Codul rutier.",`
- `EXAM_ORG`: `rodrpciv: "DGPCI (formerly DRPCIV) · category B theory exam, in English on request",`
- Hub group, new (with the other EU driving groups): `{ title: "Romania driving tests", ids: ["rodrpciv"] },`
  With one member, add `RELATED_OVERRIDES`: `rodrpciv: ["hukresz", "grdriving", "ukcar"],`
  (swap in any other EU batch exam if the hub groups them).
- `SEARCH_ALIASES`:
  `rodrpciv: "romania driving theory test romanian driving test in english drpciv dgpci chestionare drpciv chestionare auto categoria b permis auto permis de conducere sala examen teoretic codul rutier bucharest bucuresti cluj timisoara iasi brasov constanta foreigner driving licence romania",`

## lib/region.ts (new region RO, follow how PK was added)

- `Region` union: add `| "RO"`.
- `REGIONS`: `{ code: "RO", name: "Romania", short: "RO", inName: "Romania" },`
- `regionFromCountry`: `case "RO": return "RO";`
- `REGION_HREFLANG`: `RO: "en-RO",`
- `TEST_REGIONS`: `rodrpciv: "RO",` (a driving test, so NOT in `NON_DRIVING_TESTS`).
- `REGION_HOME`:

```ts
  RO: {
    title: "Free Romania Driving Theory Test Practice in English | Tigertest",
    description: "Free practice in English for the Romanian category B driving theory exam: 200 original questions on the traffic code, seven 26-question mock tests, every answer explained. No account needed.",
    lead: "Practice in English for the DRPCIV category B theory exam. Original questions on Romanian priority rules, trams, signs, speed limits and parking, every answer explained. No signup.",
    cta: { label: "Romania theory test", href: "/romania-driving-theory-test" },
    testsTitle: "Category B theory exam",
    testsSub: "200 questions on the Romanian traffic code, in km/h for right-hand traffic. Seven 26-question tests, 22 to pass.",
  },
```

## components/home/HomePage.tsx (`faqsFor` authority line)

`AUTHORITY`: `RO: "the DGPCI (formerly DRPCIV) or any county driving licence service",`

The integrator adds `app/ro/page.tsx`, middleware mapping, the `ro` sitemap line in `lib/sitemaps.ts`,
`llms.txt` and any `visit_region_*` / Today-tab country rows, as for PK.

## lib/examFacts.ts

```ts
  rodrpciv: {
    answer:
      "The Romanian driving licence theory exam for category B is a computer test of 26 questions in 30 minutes, and you need at least 22 correct answers to pass. It is set nationally by the Ministry of Internal Affairs' driving licence directorate (DGPCI, formerly DRPCIV) and taken at your county's driving licence service. Three warm-up questions come first and do not count. Each question has three answers, and one, two or all three can be correct. The test is in Romanian; foreigners and citizens of other EU and EEA countries and Switzerland may ask for English, French or German, and Romanian citizens of the Hungarian and German minorities may use their mother tongue. You must be 18 and have trained at an authorised driving school.",
    rows: [
      { label: "Run by", value: "DGPCI (formerly DRPCIV), Ministry of Internal Affairs" },
      { label: "Questions", value: "26, after 3 unscored warm-up questions" },
      { label: "Time", value: "30 minutes" },
      { label: "Pass mark", value: "22 correct (at most 4 wrong)" },
      { label: "Answer format", value: "3 options, one to three correct" },
      { label: "Languages", value: "Romanian; English, French or German on request; Hungarian or German for minorities" },
      { label: "Minimum age (car)", value: "18" },
      { label: "Tigertest mock tests", value: "7 x 26 questions, 22 to pass" },
    ],
    basedOn: "Order MAI 268/2010 on the driving licence examination procedure (art. 5, 10 and 11, as amended to 2014), OUG 195/2002 (Codul rutier) and its implementing regulation, checked November 2026",
    source: { name: "DGPCI (Direcția Generală Permise de Conducere și Înmatriculări)", url: "https://dgpci.mai.gov.ro/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming EU batch 1.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Nothing: driving tests are not in `TEACHER_LED`.

## lib/tigerAssets.ts

`BORROWED_SETS`: `rodrpciv: "driving",` (like `pkdrive`).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Nothing for the exam: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no
redirects needed. (The `ro` country homepage line is the integrator's, above.)

## components/TestIcon.tsx, components/CDLHeader.tsx

Nothing: `car` already exists.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60, so no parts.

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing rodrpciv:romania-driving-theory:13901`

## CLAUDE.md (after the Pakistan bullet under International driving tests)

```md
- **Romania Driving Theory** (DGPCI/DRPCIV category B theory exam, in English, `/romania-driving-theory/*`, landing `/romania-driving-theory-test`): `data/romania-drpciv-questions.json` (200 original questions on OUG 195/2002 (Codul rutier), its regulation (HG 1391/2006) and the topics of Order MAI 268/2010: licence and exam 16, warning signs 24, priority/prohibition/mandatory signs 30, markings, lights and police signals 24, priority, junctions, trams and level crossings 32, speed and overtaking 24, stopping, parking and motorways 14, alcohol, seat belts, lights and behaviour 22, breakdowns, accidents and first aid 14), seven real-length tests: test IDs 13901-13907 (26 questions each), sets 13901-13904 (by topic), state `RODRPCIV`, prefix `RODRP-`, 84% pass (22 of 26 like the real test, which has 3 options with one to three correct; ours have 4 options and one key). 2/3/4/3/4/3/2/3/2 per test; the last items of each pool (18 in all) are training-only. Car limits 50 in towns (up to 80 where signed), 90, 100 on E roads, 120 on expressways (since 2022), 130 on motorways, 20 km/h less outside towns in the first year; zero alcohol; trams have priority at unmarked junctions. Offered in English, French or German to foreigners and EU/EEA/Swiss citizens. Signs are described in words; no fines, fees or points. Built by `tools/next100/rodrpciv/build.py`; sources in `tools/next100/rodrpciv/sources.md`. Region RO (its first exam, homepage `/ro`), hub group "Romania driving tests", `[data-theme="rodrpciv"]` deep cobalt, borrows the car tiger.
```
