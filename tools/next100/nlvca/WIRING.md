# Wiring for `nlvca` (VCA Basic Safety, B-VCA, v1, region NL, also serves BE)

Files already written by the builder: `data/vca-basic-safety-questions.json` (200, PASS, key-longest
15%), `lib/banks/nlvca.ts`, `app/vca-basic-safety/*` (layout, redirect, dashboard, drill, stats,
copied from `app/safe-pass/`; no test or practice folders, the shared `app/[slug]` routes serve them),
`app/vca-basic-safety-practice-test/page.tsx`, `tools/next100/nlvca/*` (spec, sources, `q_*.py`,
`build.py`, this file). Everything below goes in shared files.

Format note: SSVV's B-VCA toetsmatrijs 2026 sets 40 closed questions in 60 minutes (75 for the
read-aloud exam), pass 2,580 of 4,000 points (64.5%; PBNA says 65%), with fixed counts per ETT section.
Here: four 40-question mock tests at 65% (ceil(0.65 x 40) = 26), each with the toetsmatrijs counts, and
four content sets, so 4 sets + 4 tests = 8 dashboard steps. Pools are at least 4x the per-test counts
plus 40 training-only spares (the `aerta` pattern), 200 in all. Content sets, so sets first, then tests.
Real items include multiple response, matrix and matching; Tigertest uses single-answer items only.

## lib/exams.ts

Add `"nlvca"` to the `ExamId` union. Icon `hardhat` already exists (used by `cscs`, `iesafepass`).

```ts
const nlvca: ExamConfig = {
  id: "nlvca",
  stateCode: "NLVCA",
  idBase: 45100,
  slug: "/vca-basic-safety",
  landingPath: "/vca-basic-safety-practice-test",
  name: "VCA Basic Safety Practice Test",
  shortName: "B-VCA",
  examLabel: "B-VCA exam",
  fullName: "VCA Basic Safety exam (B-VCA, Basisveiligheid VCA), Netherlands and Belgium",
  questionIdPrefix: "NLVCA-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 40,
  passPct: 65,
  // B-VCA (Basisveiligheid VCA), the SSVV / BeSaCC-VCA personal safety diploma. Blueprint = the SSVV
  // B-VCA toetsmatrijs 2026 (VCA-ETT-Toetsmatrijzen-2026.xlsx, checked 2026-11-22): A.01 regulations
  // and safety rules 4, A.02 working safely + A.03 prevention 4, B.01 workplace 5, B.02 PPE 4,
  // B.03 work equipment 4, B.04 specific work and circumstances 6, C.01 hazardous substances 6,
  // C.02 electricity 2, C.03 fire and explosion 2, D incidents and emergencies 3 = 40. Real pass
  // line 2,580 of 4,000 points (64.5%); passPct 65 = 26 of 40. Pools are 4x each count plus 40
  // training-only spares. Content from the VCA-ETT 3.0 (2026), English edition. All items original.
  blueprint: {
    nlvcaLaw: 4,
    nlvcaSafeWork: 4,
    nlvcaWorkplace: 5,
    nlvcaPPE: 4,
    nlvcaEquip: 4,
    nlvcaHeights: 6,
    nlvcaSubstances: 6,
    nlvcaElectric: 2,
    nlvcaFire: 2,
    nlvcaEmergency: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 45101, name: "Rules, Safe Behaviour & LMRA", categories: ["nlvcaLaw", "nlvcaSafeWork"], size: 48, weightLabel: "8 of 40 test questions" },
    { setNumber: 2, id: 45102, name: "Workplace, Signs & PPE", categories: ["nlvcaWorkplace", "nlvcaPPE"], size: 44, weightLabel: "9 of 40 test questions" },
    { setNumber: 3, id: 45103, name: "Equipment, Heights & Confined Spaces", categories: ["nlvcaEquip", "nlvcaHeights"], size: 50, weightLabel: "10 of 40 test questions" },
    { setNumber: 4, id: 45104, name: "Substances, Fire & Emergencies", categories: ["nlvcaSubstances", "nlvcaElectric", "nlvcaFire", "nlvcaEmergency"], size: 58, weightLabel: "13 of 40 test questions" },
  ],
  categoryLabels: {
    nlvcaLaw: "Laws, Duties & Safe-Work Agreements",
    nlvcaSafeWork: "Safe Behaviour, Toolbox & LMRA",
    nlvcaWorkplace: "Workplace, Signs & Marking",
    nlvcaPPE: "Personal Protective Equipment",
    nlvcaEquip: "Machines, Tools & Lifting",
    nlvcaHeights: "Heights, Openings & Confined Spaces",
    nlvcaSubstances: "Hazardous Substances",
    nlvcaElectric: "Electricity",
    nlvcaFire: "Fire & Explosion",
    nlvcaEmergency: "Accidents & Emergencies",
  },
  copy: {
    guestPrompt: "to save your B-VCA progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets over the B-VCA eindtermen: rules, safe behaviour and the LMRA, workplace, signs and PPE, equipment, heights and confined spaces, and hazardous substances, electricity, fire and emergencies. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 40 questions with the official topic counts, 26 to pass",
    heroSubs: [
      "Four training sets, four mock tests. Start with Rules, Safe Behaviour & LMRA.",
      "Master each set, then test.",
      "Keep going. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Retake any test to keep it fresh.",
    ],
    sourceLine: "Based on the SSVV VCA eindtermen and toetstermen (ETT 2026) and the B-VCA toetsmatrijs 2026. Original questions; 40 per test, 26 to pass (65%). Not affiliated with SSVV, BeSaCC-VCA or any VCA exam institute.",
    analyticsKey: "nlvca",
  },
};
```

Append `nlvca` to the `EXAMS` array after `nltheorie` (or after the last Netherlands exam).

Check: 45101-45104 (tests and sets) must be free (the batch table assigns 45100; `nltheorie` uses 45000-45014).

## lib/banks/all.ts

```ts
import "./nlvca";
```

## lib/examData.ts

Nothing: the bank registers itself through `lib/banks/nlvca.ts`.

## types/index.ts

- `QuestionType`: add `| "NLVCA"`.
- `QuestionCategory`, under a `// VCA Basic Safety (B-VCA, Netherlands and Belgium)` comment:

```ts
  | "nlvcaLaw"
  | "nlvcaSafeWork"
  | "nlvcaWorkplace"
  | "nlvcaPPE"
  | "nlvcaEquip"
  | "nlvcaHeights"
  | "nlvcaSubstances"
  | "nlvcaElectric"
  | "nlvcaFire"
  | "nlvcaEmergency"
```

## i18n/en.ts, es.ts, ko.ts, vi.ts, zh.ts (English labels in all five)

```ts
    nlvcaLaw: "Laws, Duties & Safe-Work Agreements",
    nlvcaSafeWork: "Safe Behaviour, Toolbox & LMRA",
    nlvcaWorkplace: "Workplace, Signs & Marking",
    nlvcaPPE: "Personal Protective Equipment",
    nlvcaEquip: "Machines, Tools & Lifting",
    nlvcaHeights: "Heights, Openings & Confined Spaces",
    nlvcaSubstances: "Hazardous Substances",
    nlvcaElectric: "Electricity",
    nlvcaFire: "Fire & Explosion",
    nlvcaEmergency: "Accidents & Emergencies",
```

## app/globals.css

The suggested hue (48 95% 32%) fails: white text is 3.8:1 and it clashes with `bedriving`
(52 100% 26%), `iesafepass` (50 85% 18%/29% dark), `foodmgr` and `dat`. The whole amber band 25 to 60
is full at lightness 20 or more. Checked against every `--brand` in `app/globals.css` on 2026-11-22:
62 100% 16% (deep olive gold, close to the VCA yellow family) clears the rule and gives white text
well above 4.5:1. The integrator settles the final hue (siblings `nltheorie`, `nlbrom`, `nlmoto`,
`nlwft` were not wired yet). Then run `tools/gen_dark_brand_css.py`.

```css
  /* VCA Basic Safety (B-VCA) theme */
  [data-theme="nlvca"] {
    --brand: 62 100% 16%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 62 85% 95%;
    --brand-hover: 62 100% 12%;
    --brand-dark: 62 100% 11%;
    --brand-darker: 62 90% 7%;
    --brand-muted: 62 25% 66%;
    --brand-border: 62 30% 76%;
    --brand-border-light: 62 25% 88%;
    --brand-gradient-to: 57 85% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `nlvca: "B-VCA (VCA Basic Safety, Basisveiligheid VCA) practice in English for the Netherlands and Belgium: safety law and duties, safe-work agreements, toolbox meetings and the LMRA, signs, PPE, machines and lifting, work at height and confined spaces, hazardous substances, electricity, fire and emergencies, in four 40-question mock tests with the official toetsmatrijs topic counts and a 65% pass line.",`
- `EXAM_ORG`: `nlvca: "SSVV · VCA personal safety diploma (B-VCA)",`
- Hub group: a new group for the Netherlands' non-driving tests, placed right after the Netherlands
  driving group that `nltheorie` adds ("Netherlands driving tests", with `nlbrom` and `nlmoto`):
  `{ title: "Netherlands licences and workplace certificates", ids: ["nlvca", "nlwft"] },`
  (`nlwft` is the sibling Wft Basis exam; drop it if it does not land in this batch.)
- `SEARCH_ALIASES` (English and Dutch):
  `nlvca: "vca b-vca bvca vca basis vca basic vca basic safety basisveiligheid basisveiligheid vca vca examen vca exam vca test vca diploma vca certificate vca certificaat vca cursus vca course vca english vca engels vca examen engels vca proefexamen vca oefenexamen vca oefenen vca vragen vca questions vca veiligheid veiligheidsdiploma lmra toolbox ssvv besacc vol-vca",`
- `RELATED_OVERRIDES`: `nlvca: ["iesafepass", "cscs", "osha"],` (padding until the Netherlands group has three other members).

## lib/region.ts

`nlvca: "NL",` in `TEST_REGIONS`, and add `"nlvca"` to `NON_DRIVING_TESTS`. The NL region itself (REGIONS,
`regionFromCountry`, REGION_HOME, hreflang) comes with `nltheorie`. B-VCA also serves Belgium (BE): if the
integrator lists tests on more than one country page, add it to the BE page too; otherwise NL only.

Country homepage `/nl` (REGION_HOME for NL) may widen once the batch lands, e.g. "Free practice for the
Dutch theory tests, the VCA safety exam and more: original questions, every answer explained."

## lib/examFacts.ts

```ts
  nlvca: {
    answer:
      "B-VCA (Basisveiligheid VCA, VCA Basic Safety) is the basic personal safety diploma of the VCA scheme, owned by SSVV in the Netherlands and managed by BeSaCC-VCA in Belgium. Contractors in construction, industry, petrochemicals and installation work, and many staffing agencies, ask operational workers to hold it. The exam is taken at a recognised exam centre and has 40 closed questions in 60 minutes (75 minutes for the read-aloud version). You pass with 2,580 of 4,000 points, 64.5%, which exam centres describe as 65%. It is offered in Dutch, English and several other languages. The diploma is valid for 10 years and is recorded in the Central Diploma Register.",
    rows: [
      { label: "Questions", value: "40 closed questions (multiple choice, multiple response, matrix, matching)" },
      { label: "Time", value: "60 minutes; 75 minutes read aloud" },
      { label: "Pass mark", value: "2,580 of 4,000 points (64.5%)" },
      { label: "Languages", value: "Dutch, English and several other languages" },
      { label: "Diploma", value: "Valid 10 years, recorded in the CDR" },
      { label: "Content", value: "SSVV eindtermen and toetstermen (ETT 2026)" },
      { label: "Scheme owner", value: "SSVV (NL), BeSaCC-VCA (BE)" },
    ],
    basedOn: "SSVV B-VCA toetsmatrijs 2026, the SSVV exams page and FAQ, and the PBNA VCA Basis exam page and exam rules 2024-01, checked November 2026",
    source: { name: "SSVV: VCA exams", url: "https://ssvv.nl/examens/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date.

## TEACHER_LED / TEACHES, components/TeachNudge.tsx, ExamClassFaq

B-VCA is usually a one- or two-day course followed by the exam (course providers, staffing agencies,
MBO schools), so it is teacher-led:
- `components/TeachNudge.tsx` `TEACHER_LED`: add `"nlvca"`.
- `components/exam/ExamClassFaq.tsx` `TEACHES`: `nlvca: "a VCA course or safety training for your workers or students",`

The landing follows the `iesafepass` template, which does not render `ExamClassFaq`; the integrator may
add `<ExamClassFaq examId="nlvca" />` and `classFaqJsonLd("nlvca")` as `app/11-plus-practice-test` does.

## lib/tigerAssets.ts

`BORROWED_SETS`: `nlvca: "cscs",` (borrow the CSCS construction tiger, as `iesafepass` does; use `"osha"`
if `cscs` has no set of its own).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, TestIcon/CDLHeader

Nothing required: sitemaps map over `EXAMS`, no redirects, the `hardhat` icon exists. llms.txt gets
the catalog line through `EXAM_BLURBS`.

## lib/examSources.json

Run `python3 -I tools/build_exam_sources.py` after merging (sources.md lists SSVV first).

## lib/examFreshness.json (optional)

SSVV changes the ETT yearly (ETT 3.1 in exams from 1 September 2026). Suggested event:
`{ "examId": "nlvca", "date": "2027-09-01", "note": "SSVV usually updates the VCA-ETT and toetsmatrijs each year; recheck https://ssvv.nl/examens/" }`

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. No set exceeds 60 (largest 58, set 4).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing nlvca:vca-basic-safety:45101`

## docs/exams/nlvca.md

```md
# nlvca: VCA Basic Safety (B-VCA), Netherlands and Belgium

Route `/vca-basic-safety/*`, landing `/vca-basic-safety-practice-test`. v1 registry exam, region NL (also serves BE), hub group "Netherlands licences and workplace certificates".

- **Real exam:** B-VCA (Basisveiligheid VCA), SSVV scheme (BeSaCC-VCA in Belgium), run by recognised exam centres such as PBNA. SSVV toetsmatrijs 2026: 40 closed questions (multiple choice, multiple response, matrix, matching), 60 minutes (75 read aloud), pass 2,580 of 4,000 points (64.5%; PBNA says 65%). Diploma valid 10 years, in the Central Diploma Register. Offered in Dutch, English and other languages; renewed exams since 1 January 2026 (ETT 3.0, ETT 3.1 in exams from 1 September 2026).
- **Bank:** `data/vca-basic-safety-questions.json`, 200 original questions in English: laws, duties and safe-work agreements 26, safe behaviour, toolbox and LMRA 22, workplace, signs and marking 24, PPE 20, machines, tools and lifting 20, heights, openings and confined spaces 30, hazardous substances 26, electricity 10, fire and explosion 10, accidents and emergencies 12. State `NLVCA`, prefix `NLVCA-`, segments LAW, SWK, WPL, PPE, EQP, HGT, SUB, ELE, FIR, EMG.
- **Tests:** four 40-question tests, IDs 45101-45104, 65% (26 of 40), per test 4/4/5/4/4/6/6/2/2/3 (the official toetsmatrijs counts). Pools are 4x those counts plus 40 training-only spares.
- **Sets:** 45101-45104, content sets: Rules, Safe Behaviour & LMRA 48; Workplace, Signs & PPE 44; Equipment, Heights & Confined Spaces 50; Substances, Fire & Emergencies 58.
- **Sources:** SSVV VCA-ETT 3.0 (2026) English edition and the B-VCA toetsmatrijs 2026; `tools/next100/nlvca/sources.md`. Dutch and Belgian variants stated as such (23 kg NL / 25 kg B lifting, 2.5 m NL / 2 m B work at height, Welfare at Work Act, IDPBW). Pictograms described in words.
- **Build:** `python3 -I tools/next100/nlvca/build.py`, then `validate_bank.py` with the pools above.
- **Theme:** `[data-theme="nlvca"]` deep olive gold (62 100% 16%, or the integrator's pick), `hardhat` icon, borrows the CSCS tiger. Teacher-led (VCA course providers).
- **Not modelled:** multiple response, matrix and matching item forms; the read-aloud exam; VOL-VCA (60 questions, 60 minutes from 2026) and VIL-VCU; a Dutch translation (worthwhile later); sling angles (left the VCA exams in 2026). Kept clear of `iesafepass`, `cscs`, `auwhite`, `osha` and `auwah` stems.
```

## CLAUDE.md

CLAUDE.md now says new exams get a `docs/exams/<id>.md` file, never a paragraph in CLAUDE.md, so the
house-shape bullet below is for the integrator's list or the docs file only if still wanted:

```md
- **VCA Basic Safety (B-VCA)** (SSVV basic safety diploma, Netherlands and Belgium, `/vca-basic-safety/*`, landing `/vca-basic-safety-practice-test`): `data/vca-basic-safety-questions.json` (200 original questions from the SSVV VCA-ETT 3.0 (2026): laws, duties and safe-work agreements 26, safe behaviour, toolbox and LMRA 22, workplace, signs and marking 24, PPE 20, machines, tools and lifting 20, heights, openings and confined spaces 30, hazardous substances 26, electricity 10, fire and explosion 10, accidents and emergencies 12), test IDs 45101-45104 (40 questions each), sets 45101-45104 (rules and LMRA 48, workplace and PPE 44, equipment, heights and confined spaces 50, substances, fire and emergencies 58), state `NLVCA`, prefix `NLVCA-`, 65% pass (26 of 40; real exam 40 questions, 60 minutes, 2,580 of 4,000 points). 4/4/5/4/4/6/6/2/2/3 per test, the official B-VCA toetsmatrijs 2026. Built by `tools/next100/nlvca/build.py`; sources in `tools/next100/nlvca/sources.md`. Region NL (also serves BE), hub group "Netherlands licences and workplace certificates", `[data-theme="nlvca"]` deep olive gold, borrows the CSCS tiger, teacher-led (VCA course providers).
```
