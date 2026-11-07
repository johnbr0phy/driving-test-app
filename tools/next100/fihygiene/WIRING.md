# Wiring for `fihygiene` (Finland Hygiene Passport test, hygieniapassitesti, v1)

Files already written by the builder: `data/finland-hygiene-passport-questions.json` (200, PASS),
`lib/banks/fihygiene.ts`, `app/finland-hygiene-passport/*` (5 wrappers copied from
`app/finland-driving-theory/`; drill and stats import the bank),
`app/finland-hygiene-passport-practice-test/page.tsx` (renders `ExamSampleQuestions`),
`tools/next100/fihygiene/*` (spec, sources, `q_*.py`, `build.py`). Rebuild with
`python3 -I tools/next100/fihygiene/build.py`. Validate with:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/finland-hygiene-passport-questions.json --pool fihygMicro=30 --pool fihygPoison=30 --pool fihygTemp=35 --pool fihygHandling=25 --pool fihygPersonal=35 --pool fihygClean=20 --pool fihygOwncheck=15 --pool fihygLaw=10`
-> `letters {'A': 53, 'B': 52, 'C': 49, 'D': 46}  avg option 21 chars  key-longest 20%  key>1.2x 14%  PASS`

Format note: the real test (Ruokavirasto regulation 7/2021) is 40 true/false statements in
45 minutes, at least 34 correct to pass, in Finnish, Swedish or English, on paper, run by an
examiner Ruokavirasto approves. Tigertest models five 40-question tests at 85% (34 of 40) with
four options per question; about 15 items ask "Which statement about ... is true?" to keep the
true/false reasoning. Pools are exactly 5x each per-test count (no spares). Dashboard = 5 topic
sets + 5 tests = 10 steps. No set exceeds 60. Set ids share numbers with test ids 24001-24005,
as `fitheory` and `dkindfoed` do.

## lib/exams.ts

Add `"fihygiene"` to the `ExamId` union. Icon `chef` already exists. 24000 block grepped free.
ID header comment if wanted: ` *   FIHYGIENE 24000s (tests 24001-24005, sets 24001-24005)`.

```ts
const fihygiene: ExamConfig = {
  id: "fihygiene",
  stateCode: "FIHYGIENE",
  idBase: 24000,
  slug: "/finland-hygiene-passport",
  landingPath: "/finland-hygiene-passport-practice-test",
  name: "Finland Hygiene Passport Practice Test",
  shortName: "Hygiene Passport",
  examLabel: "Hygiene Passport test",
  fullName: "Finland Hygiene Passport test (hygieniapassitesti)",
  questionIdPrefix: "FIHYG-",
  icon: "chef",
  testCount: 5,
  questionsPerTest: 40,
  passPct: 85,
  // Real test (Ruokavirasto regulation 7/2021 on hygiene proficiency, in force 21.4.2021, and
  // hygieniapassi.fi, checked 2026-11-06): 40 true/false statements, 45 minutes, at least 34 correct;
  // Finnish, Swedish or English, special situation tests by arrangement; held by examiners
  // Ruokavirasto approves (Food Act 297/2021 ss. 19-20). Areas from Annex 1 of 7/2021 (six areas;
  // area 2 split into food poisoning, temperatures and hygienic handling). No official weights, so
  // the split is Tigertest's. Figures are Finland's own (decree 318/2021 s. 23 and Ruokavirasto's
  // restaurant guidance): 6 °C, 4 °C minced meat, 0-3 °C cold-smoked fish, 12 °C for 4 h on display,
  // hot at least 60 °C, cooling within 4 h, 70 °C cooking, 75 °C poultry. Four options per item,
  // not true/false. Pools exactly 5x each count. All items original.
  blueprint: {
    fihygMicro: 6,
    fihygPoison: 6,
    fihygTemp: 7,
    fihygHandling: 5,
    fihygPersonal: 7,
    fihygClean: 4,
    fihygOwncheck: 3,
    fihygLaw: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 24001, name: "Microbes & Food Poisoning", categories: ["fihygMicro", "fihygPoison"], size: 60, weightLabel: "12 of 40 test questions" },
    { setNumber: 2, id: 24002, name: "Temperatures", categories: ["fihygTemp"], size: 35, weightLabel: "7 of 40 test questions" },
    { setNumber: 3, id: 24003, name: "Hygienic Handling & Cleaning", categories: ["fihygHandling", "fihygClean"], size: 45, weightLabel: "9 of 40 test questions" },
    { setNumber: 4, id: 24004, name: "Personal Hygiene", categories: ["fihygPersonal"], size: 35, weightLabel: "7 of 40 test questions" },
    { setNumber: 5, id: 24005, name: "Self-Monitoring & Food Law", categories: ["fihygOwncheck", "fihygLaw"], size: 25, weightLabel: "5 of 40 test questions" },
  ],
  categoryLabels: {
    fihygMicro: "Microbes & Contamination",
    fihygPoison: "Food Poisoning",
    fihygTemp: "Storage, Cooking & Cooling Temperatures",
    fihygHandling: "Hygienic Handling & Allergens",
    fihygPersonal: "Personal Hygiene",
    fihygClean: "Cleaning, Waste & Pests",
    fihygOwncheck: "Self-Monitoring & Oiva",
    fihygLaw: "Food Law & Authorities",
  },
  copy: {
    guestPrompt: "to save your Hygiene Passport progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets on Ruokavirasto's areas, in English: microbes and food poisoning, Finnish temperatures, handling and cleaning, personal hygiene, self-monitoring and food law. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 40 questions, 34 to pass",
    heroSubs: [
      "Five topics, five 40-question tests. Start with temperatures.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for the Hygiene Passport test.",
    ],
    sourceLine: "Based on Ruokavirasto's regulation 7/2021, the Food Act and decree 318/2021. Original questions in English; the real test is 40 true/false statements, 34 to pass.",
    analyticsKey: "fihygiene",
  },
};
```

Append `fihygiene` to the `EXAMS` array (with the other workplace certificates, or after `fitheory`).

## lib/banks/all.ts

```ts
import "./fihygiene";
```

## types/index.ts

- `QuestionType`: add `| "FIHYGIENE"`.
- `QuestionCategory`, under a `// Finland Hygiene Passport test` comment:

```ts
  | "fihygMicro"
  | "fihygPoison"
  | "fihygTemp"
  | "fihygHandling"
  | "fihygPersonal"
  | "fihygClean"
  | "fihygOwncheck"
  | "fihygLaw"
```

(Grepped: no existing `fihyg` keys.)

## i18n/en.ts (others fall back to English; add to es, ko, vi, zh too if they list every key)

```ts
    fihygMicro: "Microbes & Contamination",
    fihygPoison: "Food Poisoning",
    fihygTemp: "Storage, Cooking & Cooling Temperatures",
    fihygHandling: "Hygienic Handling & Allergens",
    fihygPersonal: "Personal Hygiene",
    fihygClean: "Cleaning, Waste & Pests",
    fihygOwncheck: "Self-Monitoring & Oiva",
    fihygLaw: "Food Law & Authorities",
```

## app/globals.css

The suggested `172 45% 30%` clashes (8-degree rule) with accuplacer (175 55% 32%), gcsecs
(180 35% 34%), hscmaths (168 38% 30%) and nbdhe (180 40% 26%). Checked against every light
`[data-theme]` block and every `--brand` in `tools/next100/*/WIRING.md`: `172 90% 22%` (deep teal)
clears them all (nearest: phmedtech 170 70% 22%, 20 points of saturation apart; cst 172 66% 30.6%);
white text is well above 4.5:1. Lightness 22 is below the 30 to 48 band, like pkdrive and ieqfa.
`170 50% 24%` and `168 60% 22%` also clear. Siblings fimoto, fihunt and fitruck had no WIRING on
disk when checked. Then run `tools/gen_dark_brand_css.py` once for everyone.

```css
  /* Finland Hygiene Passport test theme */
  [data-theme="fihygiene"] {
    --brand: 172 90% 22%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 172 50% 95%;
    --brand-hover: 172 90% 18%;
    --brand-dark: 172 90% 15%;
    --brand-darker: 172 85% 10%;
    --brand-muted: 172 30% 68%;
    --brand-border: 172 35% 80%;
    --brand-border-light: 172 30% 89%;
    --brand-gradient-to: 150 40% 95%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `fihygiene: "Five 40-question mock tests in English for the Finnish Hygiene Passport test (hygieniapassi): microbes, food poisoning, Finland's 6 °C, 60 °C and 4-hour cooling rules, hand hygiene, cleaning, self-monitoring and Oiva, and the Food Act. 34 of 40 to pass, like the real test.",`
- `EXAM_ORG`: `fihygiene: "Ruokavirasto (Finnish Food Authority) · Hygiene Passport test, approved examiners",`
- Hub group, new, placed right after "EU driving theory tests" (the Finland driving group;
  `fitheory`, and siblings `fimoto` and `fitruck`, stay there as licence categories):
  `{ title: "Finland licences and workplace certificates", ids: ["fihygiene", "fihunt"] },`
  (drop `fihunt` if it is not wired). While the group is small, `RELATED_OVERRIDES`:
  `fihygiene: ["fihunt", "ukfood", "aufss", "foodhandler"],`
- `SEARCH_ALIASES` (English, Finnish, Swedish):
  `fihygiene: "hygiene passport finland hygiene passport test hygienepassport finnish hygiene passport hygieniapassi hygieniapassitesti hygieniapassi testi hygieniaosaamistesti hygieniaosaaminen hygieniapassi englanniksi hygienpass hygienpasstest hygienkompetens ruokavirasto food hygiene test finland food hygiene certificate finland restaurant kitchen work finland helsinki espoo tampere turku oulu",`

## lib/region.ts

- `TEST_REGIONS`: `fihygiene: "FI",` (next to `fitheory: "FI"`).
- `NON_DRIVING_TESTS`: add `"fihygiene"`.
- Region `FI` already exists. Optional `REGION_HOME.FI` change once the test is in the catalog, so
  the Finland homepage no longer reads as driving only (keep the CTA on the theory test):

```ts
    description: "Free practice in English for Finnish tests: the category B theory test (teoriakoe) and the Hygiene Passport test (hygieniapassi), original questions with every answer explained. No account needed.",
```

  and in `components/home/HomePage.tsx` `AUTHORITY.FI` if it is used for every local test:
  `"Traficom, Ajovarma, Ruokavirasto or an approved examiner"` (otherwise leave as is).

## lib/examFacts.ts

```ts
  fihygiene: {
    answer:
      "The Finnish Hygiene Passport test (hygieniapassitesti) proves basic food hygiene knowledge. Anyone who handles unpackaged, easily perishable food on food premises, in cafes, restaurants, shops or food factories, needs a Hygiene Passport once they have done such work for three months. The test has 40 statements, each marked true or false, in 45 minutes, and you need at least 34 correct answers to pass. It covers microbes and contamination, food poisoning and hygienic working methods, personal hygiene, cleaning, self-monitoring, and food law and authorities. The normal test is on paper in Finnish, Swedish or English; an oral test, an interpreter or another language can be arranged with the examiner in advance. Tests are held by examiners approved by Ruokavirasto (the Finnish Food Authority), who issue the passport as a certificate and a card. Hygiene certificates from other countries are not accepted in Finland.",
    rows: [
      { label: "Set by", value: "Ruokavirasto (Finnish Food Authority)" },
      { label: "Held by", value: "Examiners approved by Ruokavirasto" },
      { label: "Format", value: "40 true/false statements, on paper" },
      { label: "Pass mark", value: "34 of 40 correct" },
      { label: "Time", value: "45 minutes (no limit in a special situation test)" },
      { label: "Languages", value: "Finnish, Swedish, English; others by arrangement" },
      { label: "Who needs it", value: "Anyone handling unpackaged perishable food, within 3 months" },
      { label: "Tigertest mock tests", value: "5 x 40 questions, 85% (34 of 40)" },
    ],
    basedOn: "Ruokavirasto regulation 7/2021 on hygiene proficiency, the Food Act 297/2021 (sections 19 and 20) and hygieniapassi.fi, checked November 2026",
    source: { name: "Ruokavirasto: Hygiene Passport", url: "https://www.ruokavirasto.fi/en/foodstuffs/hygiene-passport/" },
  },
```

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` (and `HUB_PAGES_UPDATED_AT` for the new group) to the integration date.

## lib/shareImageUrl.ts, lib/shareCardCopy.ts, lib/shareCards.ts

As for fitheory: add `"fihygiene"` to `SHARE_COPY_IDS` and:
`fihygiene: { title: "Finland Hygiene Passport Test", description: "Review microbes, Finnish food temperatures, hand hygiene, cleaning and self-monitoring for the hygieniapassi." },`

## lib/tigerAssets.ts

`BORROWED_SETS`: `fihygiene: "ukfood",` (food hygiene tiger; `foodhandler` also fits).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Add `"fihygiene"` to `TEACHER_LED`: vocational schools, adult education centres and the examiners'
own courses teach the Hygiene Passport as a class before the test (as for `ukfood` and `aufss`).

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, components/TestIcon.tsx

Nothing: sitemaps map over `EXAMS`, class questions import `lib/banks/all`, no redirects, `chef`
exists.

## scripts/build-training-parts.ts and quality hooks

Run `npx tsx scripts/build-training-parts.ts` after wiring (sets 25 to 60, so no parts), then
`python3 -I tools/build_exam_sources.py` (first three https URLs of `sources.md` are
hygieniapassi.fi, ruokavirasto.fi regulation 7/2021 and the Ruokavirasto Hygiene Passport page) and
`npx tsx scripts/build-landing-dates.ts`. Freshness worth watching: Ruokavirasto revises its test
statements and model questions (last update March 2025); a 2026 draft would remove the salmonella
health statement provision of the Communicable Diseases Act (not asked in the bank).

## Screenshots

`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing fihygiene:finland-hygiene-passport:24001`

## CLAUDE.md (after the Finland Theory Test bullet in the EU section)

```md
- **Finland Hygiene Passport** (`fihygiene`, the Finnish Hygiene Passport test (hygieniapassitesti, hygieniaosaamistesti) for anyone handling unpackaged perishable food, set by Ruokavirasto and held by approved examiners, `/finland-hygiene-passport/*`, landing `/finland-hygiene-passport-practice-test`): `data/finland-hygiene-passport-questions.json` (200 original questions on the six areas of Ruokavirasto regulation 7/2021 Annex 1, area 2 split three ways: microbes and contamination 30, food poisoning 30, storage, cooking and cooling temperatures 35, hygienic handling and allergens 25, personal hygiene 35, cleaning, waste and pests 20, self-monitoring and Oiva 15, food law and authorities 10), five 40-question tests (IDs 24001-24005, 6/6/7/5/7/4/3/2 per test, no spares) and five topic sets 24001-24005, 10 dashboard steps, state `FIHYGIENE`, prefix `FIHYG-`, 85% pass (34 of 40, like the real test). The real test is 40 true/false statements in 45 minutes on paper, in Finnish, Swedish or English; ours have four options, about 15 asking which statement is true. Finnish figures from decree 318/2021 s. 23 and Ruokavirasto's restaurant guidance (6 °C, 4 °C minced meat, 0 to 3 °C cold-smoked fish, 8 °C yoghurt, 12 °C for 4 hours on display, hot at least 60 °C and once only, cooling within 4 hours, 70 °C cooking, 75 °C poultry, danger zone 6 to 60 °C); no UK FSA figures, no fees, no salmonella health statement (pending change). Kept clear of `ukfood`, `foodhandler`, `aufss` and `foodmgr` stems. Built by `tools/next100/fihygiene/build.py`; sources in `tools/next100/fihygiene/sources.md`. Region FI, hub group "Finland licences and workplace certificates", `[data-theme="fihygiene"]` deep teal (172 90% 22%), borrows the UK food hygiene tiger, teacher-led.
```
