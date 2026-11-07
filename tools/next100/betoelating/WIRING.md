# Wiring for `betoelating` (Flemish medical and dental admission exam, toelatingsexamen arts en tandarts, written in Dutch, v1)

Native-language exam (base bank and copy Dutch, `language: "nl"`, Flemish usage), built from the
`detheorie` template. Tigertest's first `nl` exam. Files already written by the builder:
- `data/be-toelatingsexamen-arts-questions.json` (200, validator PASS with `--lang nl`)
- `lib/banks/betoelating.ts`
- `app/toelatingsexamen-arts/*` (layout, redirect, dashboard, drill, stats; copied from `app/fuehrerschein-theorie/`)
- `lib/landings/betoelating.nl.json` (Dutch landing content, Dutch `facts.source`)
- `app/nl/toelatingsexamen-arts-oefenen/page.tsx` (three-line `TranslatedExamLanding`, lang `nl`, `samples related`)
- `tools/next100/betoelating/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/betoelating/build.py`. Everything below goes in shared files.

Format note (vlaanderen.be pages checked 2026-11-07, see `sources.md`): two parts. KIW (Kennis en
Inzicht in de Wetenschappen) is 40 four-option questions, 10 each in biologie, fysica, chemie and
wiskunde, 3.5 hours in the morning with a formularium and a simple calculator supplied. GC
(Generieke Competenties) is 15 EMCO (empathie en communicatie) and 25 VAARDIG (questions on short
scientific texts with figures) in 1.5 hours in the afternoon. Marking: +3 right, −1 wrong, 0 blank,
so each part is out of 120; at least 60/120 on each, then a Flanders-wide quota ranking (arts 1,878
in 2026). Dutch only, on paper (Brussels Expo in 2026). 2027: arts Friday 2 July, tandarts Saturday
3 July; a new 2027 leerstofoverzicht is due this autumn (rebuild when it lands).

Tigertest models four tests of 50: the real KIW (10 per science) plus a shortened GC block (4 EMCO,
6 VAARDIG), equal weight, no guessing correction, `passPct: 70` (35 of 50) as Tigertest's readiness
target (the real half-points line, answering everything, is 25 of 40 right per part, and the quota
ranks above it). VAARDIG is one short text per question without figures. Training: 5 subject sets
(25601-25605, 40 each) + 4 tests = 9 dashboard steps.

## lib/exams.ts

Add `"betoelating"` to the `ExamId` union. Icon `stethoscope` exists. idBase 25600 per the brief's
row (check nothing else took 25601-25605).

```ts
const betoelating: ExamConfig = {
  id: "betoelating",
  stateCode: "BETOEL",
  idBase: 25600,
  slug: "/toelatingsexamen-arts",
  landingPath: "/nl/toelatingsexamen-arts-oefenen",
  name: "Toelatingsexamen arts en tandarts",
  shortName: "Toelatingsexamen arts",
  examLabel: "Toelatingsexamen arts en tandarts",
  fullName: "Toelatingsexamen arts en tandarts (Vlaanderen): Kennis en Inzicht in de Wetenschappen en Generieke Competenties",
  questionIdPrefix: "BETOEL-",
  icon: "stethoscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  language: "nl",
  locale: "nl-BE",
  english: {
    name: "Flemish Medical and Dental Admission Exam",
    shortName: "Flemish medical admission exam",
    fullName: "Flemish medical and dental admission exam (toelatingsexamen arts en tandarts), in Dutch",
  },
  review: { nl: "model" },
  // Real exam (vlaanderen.be toelatingsexamens pages and UAntwerpen, checked 2026-11-07): KIW 40
  // four-option questions, 10 each in biology, physics, chemistry and mathematics (3.5 h); GC 15
  // EMCO + 25 VAARDIG (1.5 h); +3 right, -1 wrong, 0 blank; at least 60/120 on each part, then a
  // quota ranking. Content: Leerstofoverzicht KIW 2026 (a 2027 overview is due autumn 2026).
  // Four tests of 50: the real KIW 10/10/10/10 plus a shortened GC block of 4 EMCO and 6 VAARDIG.
  // Equal weight and no guessing correction, so passPct 70 (35 of 50) is Tigertest's target.
  blueprint: {
    betoelBio: 10,
    betoelFys: 10,
    betoelChem: 10,
    betoelWisk: 10,
    betoelEmco: 4,
    betoelVaardig: 6,
  },
  // Five subject sets, sets first then tests (like detheorie): 5 + 4 = 9 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 25601, name: "Biologie", categories: ["betoelBio"], size: 40, weightLabel: "10 van 50 vragen per proefexamen" },
    { setNumber: 2, id: 25602, name: "Fysica", categories: ["betoelFys"], size: 40, weightLabel: "10 van 50 vragen per proefexamen" },
    { setNumber: 3, id: 25603, name: "Chemie", categories: ["betoelChem"], size: 40, weightLabel: "10 van 50 vragen per proefexamen" },
    { setNumber: 4, id: 25604, name: "Wiskunde", categories: ["betoelWisk"], size: 40, weightLabel: "10 van 50 vragen per proefexamen" },
    { setNumber: 5, id: 25605, name: "Generieke competenties", categories: ["betoelEmco", "betoelVaardig"], size: 40, weightLabel: "10 van 50 vragen per proefexamen" },
  ],
  categoryLabels: {
    betoelBio: "Biologie",
    betoelFys: "Fysica",
    betoelChem: "Chemie",
    betoelWisk: "Wiskunde",
    betoelEmco: "Empathie en communicatie (EMCO)",
    betoelVaardig: "Wetenschappelijke teksten (VAARDIG)",
  },
  copy: {
    guestPrompt: "om je vooruitgang voor het toelatingsexamen te bewaren en elke fout bij te houden",
    trainingHeading: "Oefensets",
    trainingSub: "Elke oefenset behandelt één vak van het toelatingsexamen. Je krijgt meteen feedback, en vragen die je fout had, komen terug tot je ze beheerst.",
    testsHeading: "Proefexamens · 50 vragen, 35 als doel",
    heroSubs: [
      "Vijf oefensets, vier proefexamens. Begin met het vak waar je het minst zeker van bent.",
      "Eerst de oefenset beheersen, dan het proefexamen.",
      "De helft is gedaan. Maak een proefexamen van 50 vragen.",
      "Herhaal je fouten en test jezelf opnieuw.",
      "Alles groen. Je bent klaar voor het toelatingsexamen.",
    ],
    sourceLine: "Volgens het leerstofoverzicht KIW 2026 van de Vlaamse overheid, stand november 2026. Eigen vragen, niet uit vroegere examens; 50 per proefexamen, zonder giscorrectie.",
    analyticsKey: "betoelating",
  },
};
```

Append `betoelating` to the `EXAMS` array (after the Belgian siblings or after `deheilpr`). No
`translations`. Set names are Dutch subject names, so `TEST_SET_NAMES.nl` is not used.

## lib/banks/all.ts

```ts
import "./betoelating";
```

## types/index.ts

- `QuestionType`: add `| "BETOEL"`.
- `QuestionCategory`, under a `// Flemish medical and dental admission exam` comment:

```ts
  | "betoelBio"
  | "betoelFys"
  | "betoelChem"
  | "betoelWisk"
  | "betoelEmco"
  | "betoelVaardig"
```

## i18n

If results and `/stats` prefer `exam.categoryLabels`, nothing is needed. Otherwise add the Dutch
labels above to `i18n/nl.ts`, and to `i18n/en.ts` (others fall back to English):

```ts
    betoelBio: "Biology",
    betoelFys: "Physics",
    betoelChem: "Chemistry",
    betoelWisk: "Mathematics",
    betoelEmco: "Empathy and Communication (EMCO)",
    betoelVaardig: "Scientific Texts (VAARDIG)",
```

## lib/shuffleOptions.ts

Nothing. No option uses "A en B", "Beide" or "Alle antwoorden" (the build asserts no single-letter
"A en B" / "A of B" option). The blood-group item says "Alleen bloedgroep A of bloedgroep B" on
purpose so the nl connector rule does not lock it.

## lib/urlLanguage.ts and app/nl/layout.tsx (first page under /nl)

`/nl` has no prefix entry yet. Add, so the landing gets `Content-Language: nl` and `<html lang>`:

```ts
  { prefix: "/nl", lang: "nl", includeRoot: false },
```

and create `app/nl/layout.tsx` (copy of `app/de/layout.tsx`; shared with the Belgian siblings
if they also land under `/nl`):

```tsx
// Every page under /nl is Dutch: Dutch exam landings (Belgium, later the Netherlands).
export default function DutchLayout({ children }: { children: React.ReactNode }) {
  return <div lang="nl">{children}</div>;
}
```

Check `lib/pageLanguage.ts` keeps landings under `/nl/` in Dutch, and that the Belgium homepage
(`/be`, lang `nl`) is unaffected (only paths under `/nl/` count).

## app/globals.css

Suggested `200 45% 32%` clashes (realestate 200 45 36, osha 205 55 38, phr 200 45 28). Checked
against every `[data-theme]` block with the 8-degree / 15-saturation / 8-lightness rule: clear
options near the suggestion are `202 100% 28%` (deep medical blue, white text about 7:1) and
`195 15% 32%` (muted slate). Proposed `202 100% 28%`; then run `tools/gen_dark_brand_css.py`.

```css
  /* Flemish medical and dental admission exam theme */
  [data-theme="betoelating"] {
    --brand: 202 100% 28%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 202 80% 96%;
    --brand-hover: 202 100% 23%;
    --brand-dark: 202 100% 20%;
    --brand-darker: 202 100% 14%;
    --brand-muted: 202 40% 62%;
    --brand-border: 202 50% 78%;
    --brand-border-light: 202 60% 88%;
    --brand-gradient-to: 202 85% 92%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `betoelating: "Four 50-question mock exams in Dutch for the Flemish medical and dental admission exam (toelatingsexamen arts en tandarts): the full science part (KIW) with 10 questions each in biology, physics, chemistry and maths, plus empathy and communication (EMCO) and scientific-text (VAARDIG) items, written on the official 2026 syllabus.",`
- `EXAM_ORG`: `betoelating: "Vlaamse overheid (Flemish Department of Education) · toelatingsexamen arts en tandarts, in Dutch",`
- Hub group: a Belgium group for non-driving tests, after the group holding `bedriving` (shared
  with `befsmavz`; drop ids not wired):
  `{ title: "Belgium admission and licensing exams", ids: ["betoelating", "befsmavz"] },`
  Until it has three members, `RELATED_OVERRIDES`: `betoelating: ["befsmavz", "deheilpr", "neet"],`
  (drop ids not wired).
- `SEARCH_ALIASES` (Dutch and English):
  `betoelating: "toelatingsexamen arts toelatingsexamen tandarts toelatingsexamen geneeskunde toelatingsexamen tandheelkunde ingangsexamen arts ingangsexamen geneeskunde kiw kennis en inzicht in de wetenschappen generieke competenties emco vaardig startquotum giscorrectie leerstofoverzicht geneeskunde studeren vlaanderen belgie belgië medical entrance exam belgium flemish medical admission exam belgium medicine entrance exam dentistry admission exam flanders leuven gent antwerpen brussel hasselt",`
- Native name on the Belgian homepage, `english.name` elsewhere (LANGUAGES.md 1.6).

## lib/region.ts

```ts
  betoelating: "BE",
```

in `TEST_REGIONS`. Not a driving test: add `"betoelating"` to `NON_DRIVING_TESTS`.
`REGION_HOME.BE` is about the driving test; once this exam is in the catalog the Belgium homepage
can list it under the local tests with no copy change (optional `faqsFor("BE")` entry):

```ts
  { q: "Kan ik oefenen voor het toelatingsexamen arts en tandarts?", a: "Ja. Tigertest heeft vier gratis proefexamens van 50 vragen in het Nederlands: de volledige KIW met 10 vragen per wetenschap, plus vragen over empathie en communicatie (EMCO) en wetenschappelijke teksten (VAARDIG), op het officiële leerstofoverzicht." },
```

## lib/landingContent.ts

```ts
import betoelatingNl from "@/lib/landings/betoelating.nl.json";
  "betoelating.nl": betoelatingNl as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  betoelating: {
    answer:
      "Anyone who wants to study medicine or dentistry at a Flemish university must first pass the admission exam (toelatingsexamen arts or tandarts) run by the Flemish government. It has two parts. In the morning, Knowledge and Insight in the Sciences (KIW) has 40 multiple-choice questions, 10 each in biology, physics, chemistry and mathematics, in 3.5 hours, with a formula sheet and a simple calculator supplied. In the afternoon, Generic Competences (GC) has 15 questions on empathy and communication (EMCO) and 25 on short scientific texts about health (VAARDIG), in 1.5 hours. Every question has four options; a right answer earns 3 points, a wrong one costs 1 and a blank scores 0, so each part is out of 120. Candidates need at least 60 out of 120 on each part and are then ranked against a fixed quota for all of Flanders: in 2026, 1,881 of 6,123 medicine candidates got a place. The exam is in Dutch only, on paper, once a year; in 2027 the medicine exam is on 2 July and the dentistry exam on 3 July.",
    rows: [
      { label: "Run by", value: "Flemish government (Department of Education)" },
      { label: "Science part (KIW)", value: "40 questions, 10 per subject, 3.5 hours" },
      { label: "Generic competences (GC)", value: "15 EMCO and 25 VAARDIG, 1.5 hours" },
      { label: "Marking", value: "+3 right, -1 wrong, 0 blank" },
      { label: "Pass mark", value: "At least 60/120 on each part, then a quota ranking" },
      { label: "Language", value: "Dutch only, on paper" },
      { label: "2027 dates", value: "Medicine 2 July, dentistry 3 July" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in Dutch, 35 as the target" },
    ],
    basedOn: "Flemish government pages on the admission exams (exam parts, answer sheet, schedule, 2026 FAQ), the KIW 2026 syllabus and the University of Antwerp's guidance, checked November 2026",
    source: { name: "Vlaamse overheid: Toelatingsexamens arts, tandarts en dierenarts (Dutch)", url: "https://www.vlaanderen.be/toelatingsexamens" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Dutch)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave.

## lib/tigerAssets.ts

Add to `BORROWED_SETS`: `betoelating: "sat",` (college entrance, as `neet`, `jeemain`, `mhtcet`).
`"nclex"` would also fit.

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

Teacher-led (secondary school science teachers and toelatingsexamen preparation courses run by
student associations and course providers set practice):
- `TEACHER_LED`: add `"betoelating"`.
- `TEACHES`: `betoelating: "a toelatingsexamen preparation course or a final-year science class",`

`TranslatedExamLanding` does not render `ExamClassFaq`, so the class FAQ shows only once the
platform adds it to native landings.

## lib/examFreshness.json

Add a dated `outline` event: the Flemish government will publish the 2027 leerstofoverzicht in
autumn 2026 (vlaanderen.be/toelatingsexamens, read 2026-11-07); action: rebuild the bank against it.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check the native `landingPath` under `/nl` is emitted once, hreflang
`nl-BE`, x-default to itself). Class questions import `lib/banks/all`. No redirects.

## tools/build_exam_sources.py

Run `python3 -I tools/build_exam_sources.py` so `lib/examSources.json` includes this exam.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 40 (all at most 60), no parts.

## Screenshots

`TranslatedExamLanding` reads `/landing/betoelating-{mobile,desktop}-nl.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing betoelating:toelatingsexamen-arts:25601`
then rename to the `-nl` names (as for detheorie).

## CLAUDE.md (after the `deheilpr` bullet, or with the Belgian siblings)

```md
- **Toelatingsexamen arts en tandarts** (`betoelating`, the Flemish medical and dental admission exam run by the Vlaamse overheid, Tigertest's first native Dutch exam, `language: "nl"`, `locale: "nl-BE"`, `review: { nl: "model" }`, `/toelatingsexamen-arts/*`, landing `/nl/toelatingsexamen-arts-oefenen` from `lib/landings/betoelating.nl.json`): `data/be-toelatingsexamen-arts-questions.json` (200 original questions written in Dutch on the Leerstofoverzicht KIW 2026: Biologie 40, Fysica 40, Chemie 40, Wiskunde 40, Empathie en communicatie (EMCO) 16, Wetenschappelijke teksten (VAARDIG) 24), four 50-question tests (IDs 25601-25604, 10/10/10/10 KIW like the real exam plus 4 EMCO and 6 VAARDIG, a shortened GC block) and five Dutch-named subject sets 25601-25605 (40 each, the GC set joins EMCO and VAARDIG), 9 dashboard steps, state `BETOEL`, prefix `BETOEL-`, 70% readiness target (35 of 50, Tigertest's: the real exam is KIW 40 questions in 3.5 hours and GC 15 EMCO + 25 VAARDIG in 1.5 hours, four options, +3 right, -1 wrong, 0 blank, at least 60/120 on each part, then a quota ranking; 1,881 of 6,123 arts candidates got a place in 2026). Guessing correction explained, not applied; VAARDIG is one short text per question without figures, with fictional data. Physics uses the official formularium's constants (g = 9,81 m/s²). Dutch only, on paper; 2027 arts on 2 July, tandarts on 3 July; a new 2027 leerstofoverzicht is due in autumn 2026 (rebuild then). Built by `tools/next100/betoelating/build.py` (sorts all-number options with decimal commas and powers of ten); sources in `tools/next100/betoelating/sources.md`, terms in `glossary.md`. Region BE, hub group "Belgium admission and licensing exams", `[data-theme="betoelating"]` deep medical blue (202 100% 28%), borrows the SAT tiger, teacher-led.
```

## Decisions for the integrator

1. **Hue.** Suggested 200 45% 32% clashes; `202 100% 28%` proposed, fallback `195 15% 32%`.
2. **Test shape.** 4 x 50 (real KIW + a 10-item GC block) rather than the real 80; 9 steps.
3. **Pass mark.** 70 (35 of 50) is Tigertest's target; the landing explains the real
   half-points rule, the guessing correction and the quota.
4. **Unconfirmed.** No official split of difficulty or topic weights inside KIW subjects; the
   2027 leerstofoverzicht is not out yet. The VRT registration count (10,412) is from the brief
   and was not re-read; only the July 2026 quota figures were.
5. **Register.** Questions neutral or "je" (as vlaanderen.be), doctors speak "u" to patients;
   landing and dashboard copy "je". Flemish terms (gsm, Bgsin, natronloog, oxidatiegetal +VII).
6. **/nl.** First page under `/nl`: `URL_LANGUAGE_PREFIXES` entry and `app/nl/layout.tsx` above.
7. **Dentistry and veterinary.** One bank for arts and tandarts (same KIW and GC structure). The
   dierenarts exam (since 2025-26) and the ARES concours (French, separate) could be later siblings.
