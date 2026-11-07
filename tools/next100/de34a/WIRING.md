# Wiring for `de34a` (German security guard competence exam, Sachkundeprüfung § 34a GewO, written in German, v1)

A native-language exam like `detheorie`: the base bank and base copy are German
(`language: "de"`). Files already written by the builder:
- `data/de-34a-questions.json` (200, validator PASS with `--lang de`)
- `lib/banks/de34a.ts`
- `app/sachkunde-34a/*` (layout, redirect, dashboard, drill, stats; copied from `app/fuehrerschein-theorie/`)
- `lib/landings/de34a.de.json` (German landing content, German `facts.source`)
- `app/de/sachkundepruefung-34a-test/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `de`, `samples related`)
- `tools/next100/de34a/*` (spec, sources, glossary, `q_*.py`, `build.py`)

Rebuild with `python3 -I tools/next100/de34a/build.py`. Validate with
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/de-34a-questions.json --lang de --pool d34Oeffentlich=24 --pool d34Gewerbe=24 --pool d34Datenschutz=16 --pool d34Bgb=28 --pool d34Straf=36 --pool d34Waffen=12 --pool d34Uvv=16 --pool d34Menschen=28 --pool d34Technik=16`.
Everything below goes in shared files.

Format note (sources.md, checked 2026-11-06): the IHK exam has a written part (120 minutes,
digital multiple choice; IHK Hannover and IHK Emden give 82 tasks for 120 points, a task scores
as many points as it has correct answers, at most two correct answers, ticking more than the
correct number scores 0; pass with 50 percent; no aids per IHK Emden; German) and an oral part
(about 15 minutes per candidate, up to five together, pass with 50 percent; focus on Sachgebiete
1 and 6). Retakes are unlimited; a failed oral must be passed within two years of the written
pass. The 82-task format applies since 1 July 2025; older Merkblätter give 72 questions, and the landing says so.
Tigertest models four 50-question tests (200 items, pools exactly 4x each per-test count, every
item in one test) with one correct answer of four and equal weight; `passPct: 50` is the real
written mark. The oral part and the two-answer scoring are not modelled.

## lib/exams.ts

Add `"de34a"` to the `ExamId` union. Icon `shield` exists. 22101-22105 are free (highest
existing idBase is 21900). Set ids 22101-22105 share numbers with test ids 22101-22104 like the
other topic-set exams (detheorie, CDL Endorsements).

```ts
const de34a: ExamConfig = {
  id: "de34a",
  stateCode: "DE34A",
  idBase: 22100,
  slug: "/sachkunde-34a",
  landingPath: "/de/sachkundepruefung-34a-test",
  name: "Sachkundeprüfung 34a Test",
  shortName: "Sachkunde 34a",
  examLabel: "Sachkundeprüfung § 34a GewO",
  fullName: "Sachkundeprüfung im Bewachungsgewerbe nach § 34a GewO (schriftlicher Teil)",
  questionIdPrefix: "DE34A-",
  icon: "shield",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 50,
  language: "de",
  locale: "de-DE",
  english: {
    name: "German Security Guard Competence Exam (§ 34a GewO)",
    shortName: "German § 34a security exam",
    fullName: "German security guard competence exam (Sachkundeprüfung im Bewachungsgewerbe, § 34a GewO), written part, in German",
  },
  review: { de: "model" },
  // Real exam (§ 34a GewO, BewachV 2019, DIHK Rahmenplan from 1 June 2019, IHK Hannover page of
  // 23.06.2026 and IHK Emden; checked 2026-11-06): written part 120 minutes, digital multiple
  // choice, 82 tasks for 120 points (since 1 July 2025; 72 before), up to two correct answers per task,
  // pass with 50 percent; oral part about 15 minutes, up to 5 candidates, pass with 50 percent.
  // Categories are the Sachgebiete of § 7 BewachV with Anlage 2, split as in the DIHK
  // Rahmenplan (1a/1b, 4a/4b). No official weights: the 6/6/4/7/9/3/4/7/4 split is Tigertest's.
  // Four tests of 50, pools exactly 4x each count (200, all original, written in German).
  // Single best answer of four, equal weight; passPct 50 is the real written mark.
  blueprint: {
    d34Oeffentlich: 6,
    d34Gewerbe: 6,
    d34Datenschutz: 4,
    d34Bgb: 7,
    d34Straf: 9,
    d34Waffen: 3,
    d34Uvv: 4,
    d34Menschen: 7,
    d34Technik: 4,
  },
  // Five topic sets, not testSets(): 5 + 4 tests = 9 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 22101, name: "Öffentliches Recht und Gewerberecht", categories: ["d34Oeffentlich", "d34Gewerbe"], size: 48, weightLabel: "12 von 50 Fragen je Testbogen" },
    { setNumber: 2, id: 22102, name: "BGB und Datenschutz", categories: ["d34Bgb", "d34Datenschutz"], size: 44, weightLabel: "11 von 50 Fragen je Testbogen" },
    { setNumber: 3, id: 22103, name: "Strafrecht, Strafverfahren und Waffen", categories: ["d34Straf", "d34Waffen"], size: 48, weightLabel: "12 von 50 Fragen je Testbogen" },
    { setNumber: 4, id: 22104, name: "Umgang mit Menschen", categories: ["d34Menschen"], size: 28, weightLabel: "7 von 50 Fragen je Testbogen" },
    { setNumber: 5, id: 22105, name: "Unfallverhütung und Sicherheitstechnik", categories: ["d34Uvv", "d34Technik"], size: 32, weightLabel: "8 von 50 Fragen je Testbogen" },
  ],
  categoryLabels: {
    d34Oeffentlich: "Recht der öffentlichen Sicherheit und Ordnung",
    d34Gewerbe: "Gewerberecht",
    d34Datenschutz: "Datenschutzrecht",
    d34Bgb: "Bürgerliches Gesetzbuch",
    d34Straf: "Straf- und Strafverfahrensrecht",
    d34Waffen: "Umgang mit Waffen",
    d34Uvv: "Unfallverhütungsvorschrift Wach- und Sicherungsdienste",
    d34Menschen: "Umgang mit Menschen",
    d34Technik: "Grundzüge der Sicherheitstechnik",
  },
  copy: {
    guestPrompt: "um deinen Fortschritt für die Sachkundeprüfung zu speichern und jede falsche Antwort im Blick zu behalten",
    trainingHeading: "Übungssets",
    trainingSub: "Jedes Übungsset deckt Sachgebiete der Prüfung ab. Du bekommst sofort Rückmeldung, und falsch beantwortete Fragen kommen wieder, bis du sie sicher kannst.",
    testsHeading: "Testbögen · 50 Fragen, Bestehen ab 50 Prozent",
    heroSubs: [
      "Fünf Übungssets, vier Testbögen. Strafrecht, BGB und Umgang mit Menschen kommen am häufigsten dran.",
      "Erst das Set meistern, dann den Testbogen.",
      "Die Hälfte ist geschafft. Mach einen Testbogen.",
      "Fehler wiederholen, dann noch einmal testen.",
      "Alles grün. Melde dich bei deiner IHK zur Sachkundeprüfung an.",
    ],
    sourceLine: "Nach § 34a GewO, BewachV, BGB, StGB, StPO, WaffG, DSGVO und DGUV Vorschrift 23, Stand November 2026. Eigene Fragen nach dem DIHK-Rahmenplan, nicht aus einem amtlichen Aufgabensatz; ohne mündliche Prüfung.",
    analyticsKey: "de34a",
  },
};
```

Append `de34a` to the `EXAMS` array (after `detheorie`).
No `translations` (an English version would be `translations.en`, LANGUAGES.md phase 2).
Set names are German topic names, so `TEST_SET_NAMES.de` is not used. `ExamDashboard` shows
topic sets first, then the tests; the results plan points at the weakest topic set.

## lib/banks/all.ts

```ts
import "./de34a";
```

## types/index.ts

- `QuestionType`: add `| "DE34A"`.
- `QuestionCategory`, under a `// German security guard competence exam (§ 34a GewO)` comment
  (keys grepped: no `d34` key exists):

```ts
  | "d34Oeffentlich"
  | "d34Gewerbe"
  | "d34Datenschutz"
  | "d34Bgb"
  | "d34Straf"
  | "d34Waffen"
  | "d34Uvv"
  | "d34Menschen"
  | "d34Technik"
```

## i18n

If results and `/stats` prefer `exam.categoryLabels` (they do for native exams, per CLAUDE.md),
nothing is needed. Otherwise `i18n/de.ts`: the German labels above; `i18n/en.ts` (others fall back):

```ts
    d34Oeffentlich: "Public Security & Order Law",
    d34Gewerbe: "Trade Law (GewO, BewachV)",
    d34Datenschutz: "Data Protection",
    d34Bgb: "Civil Code (BGB)",
    d34Straf: "Criminal Law & Procedure",
    d34Waffen: "Handling Weapons",
    d34Uvv: "Accident Prevention (DGUV 23)",
    d34Menschen: "Dealing with People",
    d34Technik: "Security Technology",
```

## lib/shuffleOptions.ts

No position-dependent options ("A und B", "Beide", "Alle Antworten ..."); the build asserts it.

## app/globals.css

The suggested `220 35% 26%` clashes with `cfal1` (220 25% 26%) and `phlto` (212 40% 26%).
Clash-free candidate found by scanning every light theme: `258 35% 28%` (dark slate violet). The
DE siblings (deaevo, demotorrad, deheilpr) are picking hues at the same time; check them too.
White text well above 4.5:1 at 28% lightness. Then run `tools/gen_dark_brand_css.py`.

```css
  /* German security guard competence exam (Sachkundeprüfung § 34a GewO) theme */
  [data-theme="de34a"] {
    --brand: 258 35% 28%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 258 40% 96%;
    --brand-hover: 258 35% 23%;
    --brand-dark: 258 35% 20%;
    --brand-darker: 258 35% 14%;
    --brand-muted: 258 20% 62%;
    --brand-border: 258 25% 78%;
    --brand-border-light: 258 30% 88%;
    --brand-gradient-to: 258 45% 92%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS`:
  `de34a: "Four 50-question tests in German for the IHK security guard competence exam (Sachkundeprüfung § 34a GewO): public security law, trade law and the BewachV, data protection, civil and criminal law, weapons law, DGUV Vorschrift 23, de-escalation and security technology, written from the DIHK framework as of November 2026.",`
- `EXAM_ORG`: `de34a: "IHK (Industrie- und Handelskammer) · Sachkundeprüfung nach § 34a GewO, in German",`
- Hub group: a new Germany group for non-driving tests, right after `"EU driving theory tests"`
  (which holds detheorie; demotorrad, a licence category, belongs there too). The DE siblings
  deaevo and deheilpr go in the same group:
  `{ title: "Germany certificates and licensing exams", ids: ["de34a"] },`
  `RELATED_OVERRIDES`: `de34a: ["security", "uksia", "iepsa", "caguard"],` (the other guard
  exams, until the German group has siblings; then put deaevo and deheilpr first).
- `SEARCH_ALIASES` (German and English):
  `de34a: "sachkundeprüfung 34a sachkundepruefung 34a sachkunde 34a § 34a gewo paragraph 34a 34a schein 34a prüfung 34a test 34a fragen bewachungsgewerbe sicherheitsdienst sicherheitsmitarbeiter wachmann security türsteher ihk sachkundeprüfung unterrichtung bewachv gewo notwehr festnahme 127 stpo german security guard exam germany security licence sachkunde exam security guard germany ihk security exam",`
- Native name on German surfaces, `english.name` elsewhere.

## lib/region.ts

`TEST_REGIONS.de34a = "DE"`. Region DE already exists (detheorie). NOT a driving test, so add
`de34a` to `NON_DRIVING_TESTS`. `REGION_HOME.DE` is driving-only copy; once German non-driving
tests ship, consider a second line in `testsSub` (integrator's call), e.g.
"Dazu die Sachkundeprüfung nach § 34a GewO für den Sicherheitsdienst."

## lib/landingContent.ts

```ts
import de34aDe from "@/lib/landings/de34a.de.json";
  "de34a.de": de34aDe as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  de34a: {
    answer:
      "The Sachkundeprüfung under § 34a of the German Trade Regulation Act (GewO) is the competence exam for security work, taken before a chamber of commerce (IHK). It is compulsory for security business owners and managers and for guards on patrols in public spaces or publicly accessible private areas, store detectives, door staff at discotheques, and those in charge at refugee accommodation and access-controlled major events. The written part lasts 120 minutes and is digital multiple choice; since 1 July 2025 it has 82 tasks for 120 points (older guides give 72 questions), and a task can have up to two correct answers. You pass the written part with at least 50 percent of the points and then take an oral exam of about 15 minutes, with up to five candidates, also passed at 50 percent. The exam is in German, no aids are allowed, and you may retake it as often as you need. Subjects follow § 7 of the Bewachungsverordnung: public security law and trade law, data protection, the civil code, criminal law and procedure with weapons, the accident prevention rules for guarding services, dealing with people, and security technology.",
    rows: [
      { label: "Run by", value: "IHK (German chambers of commerce)" },
      { label: "Written part", value: "120 minutes, digital multiple choice" },
      { label: "Tasks", value: "82 tasks, 120 points (since 1 July 2025; 72 before)" },
      { label: "Pass mark", value: "50 percent of the points in each part" },
      { label: "Oral part", value: "About 15 minutes, up to 5 candidates" },
      { label: "Language", value: "German" },
      { label: "Retakes", value: "Unlimited" },
      { label: "Tigertest mock tests", value: "4 x 50 questions in German, 25 to pass" },
    ],
    basedOn: "§ 34a GewO, the Bewachungsverordnung (BewachV) of 2019, the DIHK Rahmenplan for the Sachkundeprüfung and the exam pages of IHK Hannover and IHK Emden, checked November 2026",
    source: { name: "IHK Hannover: Sachkundeprüfung Bewachungsgewerbe", url: "https://www.ihk.de/hannover/hauptnavigation/ausbildung-und-weiterbildung/pruefungen-und-unterrichtungen/sach-und-fachkundepruefungen-unterrichtungen/sachkundepruefung-bewachungsgewerbe-5137130" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in German)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the wave. Run
`npx tsx scripts/build-landing-dates.ts` after committing.

## lib/tigerAssets.ts

`BORROWED_SETS`: `de34a: "security",`

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx (teacher-led)

34a is taught in courses of 2 to 6 weeks (often Jobcenter- or Bildungsgutschein-funded), so add
`"de34a"` to `TEACHER_LED`, and to `TEACHES`:
`de34a: "a Sachkunde 34a preparation course",`
Note: `TranslatedExamLanding` does not render `ExamClassFaq` (the German landing has no class
FAQ); the nudge and `/teach` still work. If the integrator adds class-FAQ support to
`TranslatedExamLanding`, it needs German copy.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check `/de/sachkundepruefung-34a-test` is emitted once, hreflang
`de-DE`, x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts`. Sets are 28 to 48, so no parts.

## tools/build_exam_sources.py

Run `python3 -I tools/build_exam_sources.py` so `lib/examSources.json` picks up
`tools/next100/de34a/sources.md` (first three URLs: IHK Hannover, IHK Emden, DIHK Rahmenplan).

## lib/examFreshness.json (optional)

No dated change known. The BewachV and GewO are stable; a yearly review is due by default.

## Screenshots

`TranslatedExamLanding` reads `/landing/de34a-{mobile,desktop}-de.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing de34a:sachkunde-34a:22101`
then rename to the `-de` names, as for detheorie.

## CLAUDE.md (after the detheorie bullet)

```md
- **Sachkundeprüfung 34a** (`de34a`, the IHK competence exam for the security trade under § 34a GewO, written part, native German exam, `language: "de"`, `locale: "de-DE"`, English names in `english`, `review: { de: "model" }`, `/sachkunde-34a/*`, landing `/de/sachkundepruefung-34a-test` from `lib/landings/de34a.de.json`): `data/de-34a-questions.json` (200 original questions written in German on the Sachgebiete of § 7 BewachV as split in the DIHK Rahmenplan: öffentliche Sicherheit und Ordnung 24, Gewerberecht (GewO, BewachV, Bewacherregister) 24, Datenschutz (DSGVO, §§ 201 ff. StGB) 16, BGB (Notwehr, Notstand, Selbsthilfe, Besitz, Hausrecht, Fund) 28, Straf- und Strafverfahrensrecht (StGB, § 127 StPO) 36, Umgang mit Waffen (WaffG, rules only) 12, DGUV Vorschrift 23 and 1 16, Umgang mit Menschen 28, Sicherheitstechnik und Brandschutz 16), four 50-question tests (IDs 22101-22104, 6/6/4/7/9/3/4/7/4 per test, Tigertest's split, no spares) and five German-named topic sets 22101-22105, 9 dashboard steps, state `DE34A`, prefix `DE34A-`, 50% pass like the real written part. The real exam (IHK Hannover and Emden, 2026): written 120 minutes, 82 digital multiple-choice tasks for 120 points (since 1 July 2025; 72 before), up to two correct answers per task, 50 percent to pass; oral about 15 minutes, up to 5 candidates, 50 percent; German, no aids, unlimited retakes. The two-answer scoring and the oral part are not modelled. German law as of November 2026; a guard has only Jedermannsrechte; no fines, fees or insurance sums; cannabis (KCanG) left out. Kept clear of `security`, `uksia`, `caguard`, `aesira`, `iepsa` and `zapsira` by using German law only. Built by `tools/next100/de34a/build.py`; sources in `tools/next100/de34a/sources.md`, terms in `glossary.md`. Region DE, hub group "Germany certificates and licensing exams", `[data-theme="de34a"]` dark slate violet, borrows the security guard tiger, teacher-led (34a course providers).
```

## Decisions for the integrator

1. **Hue.** Suggested 220 35% 26% clashes with cfal1 and phlto; proposed `258 35% 28%`. Check
   against the DE siblings built in parallel.
2. **Pass mark.** 50 (25 of 50) mirrors the real written mark; the dashboard copy and landing tell
   learners to aim higher, since the real tasks can need two correct ticks.
3. **Task count.** 82 since 1 July 2025 (IHK Hannover); 72 is the earlier format (2019 Merkblatt,
   DIHK practice book). Landing and examFacts say so (reviewer, 2026-11-06).
4. **Laws not re-read in full.** gesetze-im-internet.de returned 503 on 2026-11-06; items rest on
   the DIHK Rahmenplan's paragraph list and settled wording of GG, BGB, StGB, StPO, WaffG, DSGVO
   and DGUV Vorschrift 1/23. A native reviewer should spot-check: GEW-013 (Zuverlässigkeit
   reviewed at the latest after five years, § 34a Abs. 1 GewO), GEW-015 (name or number badge),
   UVV-008/009/011/012 (DGUV Vorschrift 23 details).
5. **Teacher-led** with no class FAQ on the German landing (component limitation).
6. **Hub group name** shared with deaevo and deheilpr: agree one title across the three WIRING files.
