# Wiring for `befsmavz` (Belgium FSMA-recognised insurance distribution exam, verzekeringsdistributie, written in Dutch, v1)

Native-language exam (base bank and copy Dutch, `language: "nl"`, Belgian usage), built from the
`detheorie` template, with `ieqfa` as the content model. Files already written by the builder:
- `data/be-fsma-verzekeringen-questions.json` (200, validator PASS with `--lang nl`, key-longest 10%,
  key over 1.2x the wrong-option average 6%)
- `lib/banks/befsmavz.ts`
- `app/fsma-examen-verzekeringen/*` (layout, redirect, dashboard, drill, stats; copied from
  `app/fuehrerschein-theorie/`; no test or practice folders, the shared `app/[slug]` routes serve them)
- `lib/landings/befsmavz.nl.json` (Dutch landing content, Dutch `facts.source`)
- `app/nl/fsma-examen-verzekeringen-oefenen/page.tsx` (three-line `TranslatedExamLanding`, lang `nl`, `samples related`)
- `tools/next100/befsmavz/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/befsmavz/build.py`. Everything below goes in shared files.

Format note (Febelfin Academy FAQ and course pages, FSMA_2019_14, checked 2026-11-07; see
`sources.md`): since 1 January 2021 the FSMA-recognised exams follow four modules (KB of 18 June
2019): module 1 basiskennis (1.1 verzekeringsmarkt en regelgeving op de verzekeringsovereenkomst,
1.2 diverse wetgeving), module 2 niet-leven (2.1 aansprakelijkheid en rechtsbijstand, 2.2
motorrijtuigen en bijstand, 2.3 zaakverzekeringen, 2.4 persoonsverzekeringen andere dan leven),
module 3 leven (3.1 toepasselijk recht en financiële kennis, 3.2 antiwitwas, verzekeringsmarkt,
pensioenstelsels, gedragsregels) and module 4 leven met beleggingscomponent. Each submodule is a
separate exam of 20 multiple-choice questions, no guessing correction, about 30 minutes, 60% to
pass. PCPs take module 1; responsible persons add the modules of the products distributed;
module 4 counts only with module 3. The basiskennis/beroepskennis split in the brief was the
2019-2020 transition (FSMA_2019_14), not the current system.

Tigertest models four 50-question mock tests that mix all four modules (6/8/8/4/4/4/4/5/4/3,
Tigertest's split: no weights are published), at the real 60% (30 of 50). Training: five module
sets (25901-25905, at most 60 each) + 4 tests = 9 dashboard steps, sets first.

## lib/exams.ts

Add `"befsmavz"` to the `ExamId` union. Icon `umbrella` exists (LLQP and the insurance exams use
it). idBase 25900 per the brief's row (25901-25905 free on 2026-11-07; grepped `lib/exams.ts`).
Set ids 25901-25905 share numbers with test ids 25901-25904 like other topic-set exams.

```ts
const befsmavz: ExamConfig = {
  id: "befsmavz",
  stateCode: "BEFSMA",
  idBase: 25900,
  slug: "/fsma-examen-verzekeringen",
  landingPath: "/nl/fsma-examen-verzekeringen-oefenen",
  name: "FSMA-examen verzekeringsdistributie",
  shortName: "FSMA-examen verzekeringen",
  examLabel: "Examen verzekeringsdistributie",
  fullName: "FSMA-erkend examen verzekeringsdistributie (modules 1 tot 4: basiskennis, niet-leven, leven, leven met beleggingscomponent)",
  questionIdPrefix: "BEFSMA-",
  icon: "umbrella",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  language: "nl",
  locale: "nl-BE",
  english: {
    name: "Belgium FSMA Insurance Distribution Exam",
    shortName: "Belgian insurance distribution exam",
    fullName: "Belgium FSMA-recognised insurance distribution exam (verzekeringsdistributie, modules 1 to 4), in Dutch",
  },
  review: { nl: "model" },
  // Real exam (Febelfin Academy FAQ and course pages, FSMA_2019_14; checked 2026-11-07): KB of
  // 18 June 2019, four modules since 1 January 2021: 1 basiskennis (1.1 markt en overeenkomst,
  // 1.2 diverse wetgeving), 2 niet-leven (2.1 BA en rechtsbijstand, 2.2 motorrijtuigen en
  // bijstand, 2.3 zaak, 2.4 persoon), 3 leven (3.1 recht, 3.2 antiwitwas, markt, pensioenen,
  // gedragsregels), 4 leven met beleggingscomponent. Each submodule: 20 MCQ, no guessing
  // correction, about 30 minutes, 60% to pass. Four mixed mock tests of 50 here; the
  // 6/8/8/4/4/4/4/5/4/3 split is Tigertest's (no weights published). passPct 60 = the real mark.
  blueprint: {
    bfsMarkt: 6,
    bfsContract: 8,
    bfsDistributie: 8,
    bfsAansprak: 4,
    bfsAuto: 4,
    bfsZaak: 4,
    bfsPersoon: 4,
    bfsLeven: 5,
    bfsWitwas: 4,
    bfsBeleg: 3,
  },
  // Five module sets, sets first then tests (like detheorie): 5 + 4 = 9 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 25901, name: "Module 1.1: markt en verzekeringsovereenkomst", categories: ["bfsMarkt", "bfsContract"], size: 56, weightLabel: "14 van 50 vragen per proefexamen" },
    { setNumber: 2, id: 25902, name: "Module 1.2: distributie en gedragsregels", categories: ["bfsDistributie"], size: 32, weightLabel: "8 van 50 vragen per proefexamen" },
    { setNumber: 3, id: 25903, name: "Niet-leven: aansprakelijkheid en motorrijtuigen", categories: ["bfsAansprak", "bfsAuto"], size: 32, weightLabel: "8 van 50 vragen per proefexamen" },
    { setNumber: 4, id: 25904, name: "Niet-leven: zaak- en persoonsverzekeringen", categories: ["bfsZaak", "bfsPersoon"], size: 32, weightLabel: "8 van 50 vragen per proefexamen" },
    { setNumber: 5, id: 25905, name: "Leven, beleggingsverzekeringen en antiwitwas", categories: ["bfsLeven", "bfsWitwas", "bfsBeleg"], size: 48, weightLabel: "12 van 50 vragen per proefexamen" },
  ],
  categoryLabels: {
    bfsMarkt: "Verzekeringsmarkt en toezicht",
    bfsContract: "De verzekeringsovereenkomst",
    bfsDistributie: "Distributie, gedragsregels en privacy",
    bfsAansprak: "Aansprakelijkheid en rechtsbijstand",
    bfsAuto: "Motorrijtuigen en bijstand",
    bfsZaak: "Zaakverzekeringen",
    bfsPersoon: "Persoonsverzekeringen niet-leven",
    bfsLeven: "Levensverzekering",
    bfsWitwas: "Antiwitwas en pensioenpijlers",
    bfsBeleg: "Leven met beleggingscomponent",
  },
  copy: {
    guestPrompt: "om je vooruitgang voor het examen verzekeringsdistributie te bewaren en elke fout bij te houden",
    trainingHeading: "Oefensets",
    trainingSub: "Elke oefenset behandelt de stof van een module van het examen. Je krijgt meteen feedback, en vragen die je fout had, komen terug tot je ze beheerst.",
    testsHeading: "Proefexamens · 50 vragen, 60 % om te slagen",
    heroSubs: [
      "Vijf oefensets, vier proefexamens. Begin met module 1: die is voor iedereen verplicht.",
      "Eerst de oefenset beheersen, dan het proefexamen.",
      "De helft is gedaan. Maak een proefexamen van 50 vragen.",
      "Herhaal je fouten en test jezelf opnieuw.",
      "Alles groen. Je bent klaar voor het examen verzekeringsdistributie.",
    ],
    sourceLine: "Volgens de wet van 4 april 2014 betreffende de verzekeringen en de antiwitwaswet, stand november 2026. Eigen vragen, niet uit een erkend examen; proefexamens van 50 vragen over alle modules.",
    analyticsKey: "befsmavz",
  },
};
```

Append `befsmavz` to the `EXAMS` array (with the Belgian siblings, after `betoelating`). No
`translations` (a French version would be `translations.fr` later; the real exam also runs in
French and English). Set names are Dutch module names, so `TEST_SET_NAMES.nl` is not used.

## lib/banks/all.ts

```ts
import "./befsmavz";
```

## types/index.ts

- `QuestionType`: add `| "BEFSMA"`.
- `QuestionCategory`, under a `// Belgium FSMA insurance distribution exam` comment (no `bfs*`
  keys exist; grepped):

```ts
  | "bfsMarkt"
  | "bfsContract"
  | "bfsDistributie"
  | "bfsAansprak"
  | "bfsAuto"
  | "bfsZaak"
  | "bfsPersoon"
  | "bfsLeven"
  | "bfsWitwas"
  | "bfsBeleg"
```

## i18n

If results and `/stats` prefer `exam.categoryLabels`, nothing is needed. Otherwise add the Dutch
labels above to `i18n/nl.ts`, and to `i18n/en.ts` (others fall back to English):

```ts
    bfsMarkt: "Insurance Market & Supervision",
    bfsContract: "The Insurance Contract",
    bfsDistributie: "Distribution, Conduct Rules & Privacy",
    bfsAansprak: "Liability & Legal Expenses",
    bfsAuto: "Motor & Assistance",
    bfsZaak: "Property Insurance",
    bfsPersoon: "Non-life Personal Insurance",
    bfsLeven: "Life Insurance",
    bfsWitwas: "Anti-Money Laundering & Pensions",
    bfsBeleg: "Investment-linked Life Insurance",
```

## lib/shuffleOptions.ts

Nothing. No option uses "A en B", "Beide" or "Alle antwoorden"; the build asserts no letter
references. Number options are sorted in the build (decimal comma or thousands point).

## lib/urlLanguage.ts and app/nl/layout.tsx

Shared with `betoelating` and `bevracht` (the first pages under `/nl`): their WIRING adds the
`{ prefix: "/nl", lang: "nl", includeRoot: false }` entry and `app/nl/layout.tsx`. Nothing extra.

## app/globals.css

Suggested `345 40% 26%` clashes (txadjuster 343 35 32, roadmed 340 45 24, phcle 350 50 22, aursa
352 40 30). Checked with the 8-degree / 15-saturation / 8-lightness rule against every
`[data-theme]` in `app/globals.css` and every pending `tools/next100/*/WIRING.md`: clear options at
hue 345 are `345 90% 20%` (deep wine, white text about 14:1) and `345 20% 26%` (muted plum grey).
Proposed `345 90% 20%`; then run `tools/gen_dark_brand_css.py`.

```css
  /* Belgium FSMA insurance distribution exam theme */
  [data-theme="befsmavz"] {
    --brand: 345 90% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 345 70% 96%;
    --brand-hover: 345 90% 16%;
    --brand-dark: 345 90% 14%;
    --brand-darker: 345 90% 10%;
    --brand-muted: 345 35% 60%;
    --brand-border: 345 45% 80%;
    --brand-border-light: 345 55% 90%;
    --brand-gradient-to: 345 80% 93%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `befsmavz: "Four 50-question mock exams in Dutch for Belgium's FSMA-recognised insurance distribution exam (verzekeringsdistributie): the insurance market and contract law, distribution and conduct rules, liability, motor, property and personal insurance, life and unit-linked (tak 21 and tak 23) insurance, and anti-money laundering, written from the Insurance Act of 4 April 2014.",`
- `EXAM_ORG`: `befsmavz: "FSMA-recognised exams (Febelfin Academy and others) · insurance distribution, in Dutch",`
- Hub group: the Belgium group for non-driving tests that `betoelating`'s WIRING creates, after the
  group holding `bedriving` (drop ids not wired):
  `{ title: "Belgium admission and licensing exams", ids: ["betoelating", "befsmavz"] },`
  Until it has three members, `RELATED_OVERRIDES`: `befsmavz: ["ieqfa", "llqp", "insurance"],`
  (drop ids not wired; `insurance` is the US life and health exam).
- `SEARCH_ALIASES` (Dutch and English):
  `befsmavz: "fsma examen fsma examen verzekeringen examen verzekeringsdistributie verzekeringsdistributie verzekeringsbemiddeling examen verzekeringsbemiddeling idd examen module 1 basiskennis verzekeringen basiskennis verzekeringen niet-leven examen examen leven tak 21 tak 23 pcp persoon in contact met het publiek verantwoordelijke voor de distributie verzekeringsmakelaar examen verzekeringsagent examen subagent febelfin academy examen febelfin verzekeringen beroepskennis verzekeringen belgium insurance exam belgian insurance distribution exam fsma insurance exam insurance broker exam belgium insurance agent exam belgium",`
- Native name on the Belgian homepage, `english.name` elsewhere (LANGUAGES.md 1.6).

## lib/region.ts

```ts
  befsmavz: "BE",
```

in `TEST_REGIONS`. Not a driving test: add `"befsmavz"` to `NON_DRIVING_TESTS`. Region BE exists
(`bedriving`, lang `nl`). Optional `faqsFor("BE")` entry:

```ts
  { q: "Kan ik oefenen voor het FSMA-examen verzekeringsdistributie?", a: "Ja. Tigertest heeft vier gratis proefexamens van 50 vragen in het Nederlands over de stof van de vier modules: verzekeringsmarkt en verzekeringsovereenkomst, distributie en gedragsregels, niet-leven, leven, tak 23 en antiwitwas, met vijf oefensets per module." },
```

## lib/landingContent.ts

```ts
import befsmavzNl from "@/lib/landings/befsmavz.nl.json";
  "befsmavz.nl": befsmavzNl as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  befsmavz: {
    answer:
      "Anyone who distributes insurance in Belgium, whether as a broker, agent, sub-agent, bank employee or other person in contact with the public, must prove their professional knowledge with an exam recognised by the FSMA. Since 1 January 2021 it is split into four modules: module 1 basic knowledge (the insurance market and the insurance contract, and other legislation), module 2 non-life (liability and legal expenses, motor and assistance, property, and personal insurance other than life), module 3 life, and module 4 life insurance with an investment component. Each submodule is a separate exam of 20 multiple-choice questions with no guessing correction, taking about 30 minutes, and you pass with at least 60% per submodule. A person in contact with the public takes module 1; the person responsible for distribution also takes the modules for the products the firm sells, and module 4 counts only with module 3. Febelfin Academy, one recognised organiser, runs the exams in Dutch, French and English, in person or online with remote supervision.",
    rows: [
      { label: "Recognised by", value: "FSMA (Febelfin Academy and other recognised organisers)" },
      { label: "Modules", value: "1 basic knowledge, 2 non-life, 3 life, 4 life with investment component" },
      { label: "Per submodule", value: "20 multiple-choice questions, about 30 minutes" },
      { label: "Pass mark", value: "At least 60% per submodule" },
      { label: "Guessing correction", value: "None" },
      { label: "Who takes what", value: "Module 1 for everyone; modules 2 to 4 by product" },
      { label: "Languages", value: "Dutch, French and English (Febelfin Academy)" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Dutch across all modules, 30 to pass" },
    ],
    basedOn: "Royal Decree of 18 June 2019 on professional knowledge in insurance distribution, FSMA communication FSMA_2019_14, Febelfin Academy's IDD exam pages and the Insurance Act of 4 April 2014, checked November 2026",
    source: { name: "Febelfin Academy: knowledge requirements under the IDD", url: "https://www.febelfin-academy.be/en/faq/insurances/what-are-knowledge-requirements-context-european-insurance-distribution-directive" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Dutch)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## lib/tigerAssets.ts

Add to `BORROWED_SETS` with `llqp` and `ieqfa`: `befsmavz: "insurance",` (the life and health
insurance tiger).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Teacher-led (insurer and bank in-house academies, Febelfin Academy and Syntra courses set it):
- `TEACHER_LED`: add `"befsmavz"`.
- `TEACHES`: `befsmavz: "an insurer or bank academy, or an IDD course for new insurance staff",`

`TranslatedExamLanding` does not render `ExamClassFaq`, so the class FAQ shows only once the
platform adds it to native landings.

## lib/examFreshness.json

No dated change known (the 2021 module structure is current). Optional `review` event a year
after integration.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the native `landingPath` under `/nl` is emitted once, hreflang
`nl-BE`, x-default to itself). Class questions import `lib/banks/all`. No redirects.

## tools/build_exam_sources.py

Run `python3 -I tools/build_exam_sources.py` so `lib/examSources.json` includes this exam (the
first three URLs in `sources.md` are the two Febelfin Academy pages and FSMA_2019_14).

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 32 to 56 (all at most 60),
no parts.

## Screenshots

`TranslatedExamLanding` reads `/landing/befsmavz-{mobile,desktop}-nl.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing befsmavz:fsma-examen-verzekeringen:25901`
then rename to the `-nl` names (as for detheorie and betoelating).

## CLAUDE.md (with the Belgian siblings, after the `betoelating` bullet)

```md
- **FSMA-examen verzekeringsdistributie** (`befsmavz`, Belgium's FSMA-recognised insurance distribution exam, verzekeringsdistributie, written in Dutch, `language: "nl"`, `locale: "nl-BE"`, `review: { nl: "model" }`, `/fsma-examen-verzekeringen/*`, landing `/nl/fsma-examen-verzekeringen-oefenen` from `lib/landings/befsmavz.nl.json`): `data/be-fsma-verzekeringen-questions.json` (200 original questions written in Dutch across the four modules of the KB of 18 June 2019, as Febelfin Academy runs them since 1 January 2021: module 1.1 verzekeringsmarkt en toezicht 24 and de verzekeringsovereenkomst 32, 1.2 distributie, gedragsregels en privacy 32, module 2 aansprakelijkheid en rechtsbijstand 16, motorrijtuigen en bijstand 16, zaakverzekeringen 16, persoonsverzekeringen niet-leven 16, module 3 levensverzekering 20 and antiwitwas en pensioenpijlers 16, module 4 leven met beleggingscomponent 12), four 50-question mock tests mixing the modules (IDs 25901-25904, 6/8/8/4/4/4/4/5/4/3 per test, Tigertest's split) and five Dutch-named module sets 25901-25905 (56/32/32/32/48), 9 dashboard steps, state `BEFSMA`, prefix `BEFSMA-`, 60% pass like each real submodule (the real exams are separate per submodule, 20 multiple-choice questions, no guessing correction, about 30 minutes; module 1 for persons in contact with the public, modules 2 to 4 by product for responsible persons, module 4 only with module 3; Dutch, French and English). Belgian law as in force November 2026: the Insurance Act of 4 April 2014 (contract law, distribution and conduct rules, IPID, POG, suitability and appropriateness), the AML law of 18 September 2017, the WAM law of 1989 with art. 29bis, the GDPR and the Flemish Woninghuurdecreet; no fees, premiums, tax rates or guarantee ceilings. Built by `tools/next100/befsmavz/build.py`; sources in `tools/next100/befsmavz/sources.md`, terms in `glossary.md`. Region BE, hub group "Belgium admission and licensing exams", `[data-theme="befsmavz"]` deep wine (345 90% 20%), borrows the life and health insurance tiger, teacher-led (insurer and bank academies).
```

## Decisions for the integrator

1. **Hue.** Suggested 345 40% 26% clashes with four themes; `345 90% 20%` proposed, fallback
   `345 20% 26%`.
2. **Module structure.** The brief's basiskennis/beroepskennis split was the 2019-2020 transition
   (FSMA_2019_14); the current system is four modules of 20-question submodule exams. Confirmed on
   Febelfin Academy's live pages; its exam regulation PDF and structure PDF returned 404, and
   fsma.be had no insurance-side page with the module list. Module 4's number of submodule exams
   is not stated.
3. **Test shape.** Mixed 4 x 50 rather than 10 separate 20-question submodule exams, so every test
   covers module 1 to module 4 and the dashboard stays at 9 steps; module sets let people train
   one module. A variant with one 20-question test per submodule would be 9 or 10 tests.
4. **Pass mark.** 60, the real per-submodule mark, applied to the mixed test.
5. **Languages.** Febelfin Academy runs the exam in Dutch, French and English (English confirmed on
   the course page, French from course sheets in search). A French version (`translations.fr`)
   would serve Wallonia and Brussels.
6. **Register.** Questions neutral third person; landing and dashboard copy "je".
