# Wiring for `fihunt` (Finnish hunter's examination, metsästäjätutkinto, written in Finnish, v1)

A native-language exam (base language Finnish, `language: "fi"`), built from the `detheorie`
template (and shaped like `sejakt`). Files already written by the builder:
- `data/finland-hunter-exam-questions.json` (200, validator PASS with `--lang fi`)
- `lib/banks/fihunt.ts`
- `app/metsastajatutkinto/*` (5 wrappers: layout, page, dashboard, drill, stats; copied from
  `app/fuehrerschein-theorie/`; drill and stats import the bank)
- `lib/landings/fihunt.fi.json` (Finnish landing content, Finnish `facts.source`)
- `app/fi/metsastajatutkinto-harjoituskoe/page.tsx` (three-line `TranslatedExamLanding` wrapper, lang `fi`)
- `tools/next100/fihunt/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/fihunt/build.py`. Validate with
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/finland-hunter-exam-questions.json --lang fi --pool fihnLaji=48 --pool fihnLaki=40 --pool fihnTurva=26 --pool fihnAseet=24 --pool fihnEtiikka=17 --pool fihnPyynti=17 --pool fihnRiista=17 --pool fihnSaalis=11`
-> `letters {'A': 52, 'B': 52, 'C': 48, 'D': 48}  avg option 18 chars  key-longest 20%  key>1.2x 11%  PASS` (rebuilt 2026-11-07 after review fixes to FIHUNT-LAJ-040 and -041, then to FIHUNT-TUR-014, -PYY-008 and -ASE-020 in a second review against Finlex 615/1993 and 666/1993 and the riistakeskus 2026 instruction PDF).
`python3 -I tools/check_banks.py` PASS with the bank on disk (2026-11-06).
Everything below goes in shared files.

Format note (checked 2026-11-06, see sources.md): Suomen riistakeskus's instruction to the
riistanhoitoyhdistykset dated 1.1.2026 and MMMa 1160/2014: 60 multiple-choice questions written
by the riistakeskus, 15 species-identification questions from pictures (first, 15 minutes, then
the pictures are removed) and 45 theory questions, at most 1.5 hours in all; passed with at most
8 wrong (52 of 60); unanswered counts as wrong; electronic on the candidate's own device or on
paper; held only by riistanhoitoyhdistykset, registration compulsory from 1.1.2026; Finnish,
Swedish, English or Sámi from 1.1.2026; needed before the first riistanhoitomaksu (hunting card).
The riistakeskus keeps the questions confidential (an old guide says 10 pictures; the 2026
instruction and the riistakeskus page say 15). Tigertest models three real-length 60-question
tests plus 20 training-only spares (200 items), `passPct: 86` = ceil(0.86 x 60) = 52 of 60, the
real line. The 15 lajintuntemus items per test stand in for the picture part, written in words;
the picture part itself is not modelled and the landing says so. Five topic sets 24201-24205 +
3 tests = 8 dashboard steps.

## lib/exams.ts

Add `"fihunt"` to the `ExamId` union. Icon `target` already exists (hunter, nzfirearms, sejakt).
idBase 24200 grepped free (fihygiene 24000, fimoto 24100). Set ids share numbers with test ids
like `detheorie` and `sejakt` (topic sets, not `testSets()`). ID header comment if wanted:
` *   FIHUNT 24200s (tests 24201-24203, sets 24201-24205)`.

```ts
const fihunt: ExamConfig = {
  id: "fihunt",
  stateCode: "FIHUNT",
  idBase: 24200,
  slug: "/metsastajatutkinto",
  landingPath: "/fi/metsastajatutkinto-harjoituskoe",
  name: "Metsästäjätutkinto harjoituskoe",
  shortName: "Metsästäjätutkinto",
  examLabel: "Metsästäjätutkinto",
  fullName: "Metsästäjätutkinto (Suomen riistakeskus)",
  questionIdPrefix: "FIHUNT-",
  icon: "target",
  testCount: 3,
  questionsPerTest: 60,
  passPct: 86,
  language: "fi",
  locale: "fi-FI",
  english: {
    name: "Finland Hunter's Examination (Metsästäjätutkinto)",
    shortName: "Finnish hunter's exam",
    fullName: "Finnish hunter's examination (metsästäjätutkinto), in Finnish",
  },
  review: { fi: "model" },
  // Real exam (Suomen riistakeskus instruction 1.1.2026, asia 336/02.02.01.02/2025, and MMMa
  // 1160/2014 2-3 §; checked 2026-11-06): 60 multiple-choice questions written by the
  // riistakeskus, 15 species-identification pictures (15 minutes, first) and 45 theory questions,
  // at most 1.5 hours; at most 8 wrong (52 of 60); held by riistanhoitoyhdistykset, electronic or
  // paper; Finnish, Swedish, English or Sámi from 1.1.2026. Categories are the eight topic areas of
  // MMMa 1160/2014 2 §; the 15/12/8/7/5/5/5/3 split is Tigertest's own (no published weights),
  // with 15 species items standing in for the picture part, written in words. Three tests of 60
  // plus 20 training-only spares (200, all original, written in Finnish). passPct 86 gives
  // ceil(51.6) = 52 of 60, the real pass line.
  blueprint: {
    fihnLaji: 15,
    fihnLaki: 12,
    fihnTurva: 8,
    fihnAseet: 7,
    fihnEtiikka: 5,
    fihnPyynti: 5,
    fihnRiista: 5,
    fihnSaalis: 3,
  },
  // Five topic sets, then the three tests: 8 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 24201, name: "Lajintuntemus", categories: ["fihnLaji"], size: 48, weightLabel: "15 / 60 kysymystä koetta kohden" },
    { setNumber: 2, id: 24202, name: "Metsästyslainsäädäntö", categories: ["fihnLaki"], size: 40, weightLabel: "12 / 60 kysymystä koetta kohden" },
    { setNumber: 3, id: 24203, name: "Turvallisuus, aseet ja patruunat", categories: ["fihnTurva", "fihnAseet"], size: 50, weightLabel: "15 / 60 kysymystä koetta kohden" },
    { setNumber: 4, id: 24204, name: "Etiikka ja pyyntimenetelmät", categories: ["fihnEtiikka", "fihnPyynti"], size: 34, weightLabel: "10 / 60 kysymystä koetta kohden" },
    { setNumber: 5, id: 24205, name: "Riistanhoito ja saaliin käsittely", categories: ["fihnRiista", "fihnSaalis"], size: 28, weightLabel: "8 / 60 kysymystä koetta kohden" },
  ],
  categoryLabels: {
    fihnLaji: "Lajintuntemus",
    fihnLaki: "Metsästyslainsäädäntö",
    fihnTurva: "Metsästyksen turvallisuus",
    fihnAseet: "Aseet ja patruunat metsästyksessä",
    fihnEtiikka: "Eettinen ja kestävä metsästys",
    fihnPyynti: "Pyyntivälineet ja pyyntimenetelmät",
    fihnRiista: "Riistanhoito ja riistaekologia",
    fihnSaalis: "Saaliin käsittely",
  },
  copy: {
    guestPrompt: "jotta edistymisesi metsästäjätutkintoon tallentuu ja näet jokaisen väärän vastauksen",
    trainingHeading: "Harjoitussarjat",
    trainingSub: "Jokainen harjoitussarja käsittelee yhtä tai kahta tutkinnon aihealuetta. Saat palautteen heti, ja väärin menneet kysymykset tulevat uudelleen, kunnes osaat ne.",
    testsHeading: "Harjoituskokeet · 60 kysymystä, enintään 8 virhettä",
    heroSubs: [
      "Viisi harjoitussarjaa, kolme harjoituskoetta. Lajintuntemusta ja metsästyslakia kysytään eniten.",
      "Hallitse harjoitussarja ensin, sitten harjoituskoe.",
      "Puolivälissä. Tee harjoituskoe.",
      "Kertaa virheesi ja testaa uudelleen.",
      "Kaikki vihreänä. Ilmoittaudu metsästäjätutkintoon.",
    ],
    sourceLine: "Metsästyslain, metsästysasetuksen ja ampuma-aselain mukaan, marraskuu 2026. Omat kysymykset, ei riistakeskuksen; lajit kuvataan sanoin, kuvaosiota ei ole.",
    analyticsKey: "fihunt",
  },
};
```

Append `fihunt` to the `EXAMS` array (after the Finnish tests `fitheory`/`fimoto`/`fihygiene`,
or with the other licence exams). No `translations` yet: the riistakeskus offers the real exam in
English, Swedish and Sámi from 1.1.2026, so `translations.en` and `translations.sv` on this id are
sensible phase-2 candidates. Set names are Finnish topic names, so `TEST_SET_NAMES.fi` is not used.

## lib/banks/all.ts

```ts
import "./fihunt";
```

## types/index.ts

- `QuestionType`: add `| "FIHUNT"`.
- `QuestionCategory`, under a `// Finland hunter's examination (metsästäjätutkinto)` comment
  (grepped: no existing `fihn` keys):

```ts
  | "fihnLaji"
  | "fihnLaki"
  | "fihnTurva"
  | "fihnAseet"
  | "fihnEtiikka"
  | "fihnPyynti"
  | "fihnRiista"
  | "fihnSaalis"
```

## i18n

Results and stats read `exam.categoryLabels` first (Finnish above). `i18n/fi.ts` has no category
names (platform rule). Add English labels to `i18n/en.ts` (and `es`, `ko`, `vi`, `zh` if they list
every key):

```ts
    fihnLaji: "Species Identification",
    fihnLaki: "Hunting Law",
    fihnTurva: "Hunting Safety",
    fihnAseet: "Firearms & Ammunition",
    fihnEtiikka: "Ethical & Sustainable Hunting",
    fihnPyynti: "Hunting Equipment & Methods",
    fihnRiista: "Game Management & Ecology",
    fihnSaalis: "Handling the Game",
```

## lib/shuffleOptions.ts

The `fi` patterns are in place. No position-dependent options ("A ja B", "Molemmat", "Kaikki
edellä mainitut"); `build.py` asserts it. 16 all-number items are sorted ascending by the build
(key in an end slot in 9 of them); "1 vuosi"/"N vuotta", "1 patruuna"/"N patruunaa" count as one
unit, and the no-break space thousands separator ("2 700 J", "1 000 ha") is parsed.

## validate_bank.py KNOWN_BANKS

Nothing: 200 rows (three 60-question tests plus 20 training-only spares, the last items of each
pool), so no `KNOWN_BANKS` line is needed.

## app/globals.css

Suggested `95 40% 24%` clashes with `sejakt` (95 45 22), `nptepta` (100 30 26) and `dkjagt`
(100 35 30). Checked with a script against every `[data-theme]` in `app/globals.css` and every
`--brand` in `tools/next100/*/WIRING.md` (603 themes): `75 60% 20%` (dark hunting olive) is clear
(nearest: `nzheavy` 80 40 20 differs by 20 saturation, `cask` 84 and `gcsemaths` 82 by more than 8
degrees). White text far above 4.5:1. Below the house 30% lightness floor, like `sejakt`,
`pakarmy` and `nzheavy`. Then run `tools/gen_dark_brand_css.py`.

```css
  /* Finland hunter's examination (metsästäjätutkinto) theme */
  [data-theme="fihunt"] {
    --brand: 75 60% 20%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 75 45% 95%;
    --brand-hover: 75 60% 16%;
    --brand-dark: 75 60% 13%;
    --brand-darker: 75 60% 8%;
    --brand-muted: 75 25% 60%;
    --brand-border: 75 25% 76%;
    --brand-border-light: 75 30% 88%;
    --brand-gradient-to: 40 70% 92%;
  }
```

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `fihunt: "Three 60-question tests in Finnish for the Finnish hunter's examination (metsästäjätutkinto): species identification written in words, hunting law, safety, firearms and cartridges, ethics, hunting methods and dogs, game management and handling game meat, from the Hunting Act and Decree as of November 2026, with the real 52 of 60 pass line.",`
- `EXAM_ORG`: `fihunt: "Suomen riistakeskus · metsästäjätutkinto, held by riistanhoitoyhdistykset, in Finnish",`
- Hub group: a new Finland group for its non-driving tests, right after `"EU driving theory tests"`
  (Finland's licence categories `fitheory`, `fimoto`, `fitruck` stay in the driving group). Shared
  with sibling `fihygiene`, whose WIRING.md proposes the same group:
  `{ title: "Finland licences and workplace certificates", ids: ["fihygiene", "fihunt"] },`
- `RELATED_OVERRIDES` (needed while the Finland group has fewer than three other members):
  `fihunt: ["sejakt", "dkjagt", "nzfirearms", "hunter"],` (drop any not wired).
- `SEARCH_ALIASES` (Finnish, Swedish and English):
  `fihunt: "metsästäjätutkinto metsastajatutkinto metsästäjätutkinto harjoituskoe metsästäjätutkinto kysymykset metsästäjätutkinto harjoittelu metsästyskortti metsästäjän opas metsästys tentti metsästyskoe riistakeskus riistanhoitoyhdistys rhy riistanhoitomaksu lajintuntemus hirvijahti jägarexamen finland jägarexamen finland finnish hunter exam finnish hunting exam finland hunting licence finland hunter's examination hunting card finland",`
- Native name on Finnish surfaces, `english.name` elsewhere (as `detheorie`).

## lib/region.ts

- `TEST_REGIONS`: add `fihunt: "FI",` (next to `fitheory: "FI"`).
- Add `"fihunt"` to `NON_DRIVING_TESTS`.
- Region language: FI stays `lang: "en"` for now (`fitheory`, `fimoto`, `fihygiene` are English).
  This is Finland's first Finnish-language test; switching FI to `lang: "fi"` with a Finnish
  `REGION_HOME.FI` is a decision for when more Finnish tests exist. If `REGION_HOME.FI` gets a
  line for non-driving tests, an English one:
  "The metsästäjätutkinto, Finland's hunter's examination, in Finnish: 200 original questions and the real 52 of 60 pass line."

## app/fi/layout.tsx

Do NOT add a `lang="fi"` layout under `app/fi` while `/fi` is the English Finland homepage
(it would label the homepage Finnish). `lib/urlLanguage.ts` already has
`{ prefix: "/fi", lang: "fi", includeRoot: false }`, so `/fi/metsastajatutkinto-harjoituskoe`
gets `Content-Language: fi` and `<html lang="fi">` from the URL. If a layout is wanted, wrap only
this landing (or move to a route group) rather than all of `/fi`.

## lib/landingContent.ts

```ts
import fihuntFi from "@/lib/landings/fihunt.fi.json";
  "fihunt.fi": fihuntFi as TranslatedLandingContent,
```

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  fihunt: {
    answer:
      "The Finnish hunter's examination (metsästäjätutkinto) must be passed before you pay the game management fee (riistanhoitomaksu) and get a Finnish hunting card for the first time. It has 60 multiple-choice questions written by the Finnish Wildlife Agency (Suomen riistakeskus): first 15 species-identification questions from pictures, with 15 minutes for that part, then 45 theory questions, with at most an hour and a half in all. You pass with no more than 8 wrong answers, 52 points of 60, and unanswered questions count as wrong. The exam covers hunting law, species knowledge, game ecology and management, ethical and sustainable hunting, firearms and cartridges, hunting safety, hunting equipment and methods, and handling the game. Local game management associations (riistanhoitoyhdistykset) hold the exam, electronically on your own phone, tablet or computer or on paper, and advance registration is compulsory. From 1 January 2026 it can be taken in Finnish, Swedish, English or Sámi. Anyone who paid the fee in one of the five previous hunting years, and foreigners entitled to hunt in their own country, do not need it.",
    rows: [
      { label: "Questions written by", value: "Suomen riistakeskus (Finnish Wildlife Agency)" },
      { label: "Held by", value: "Riistanhoitoyhdistykset (local game management associations)" },
      { label: "Questions", value: "60: 15 species pictures, 45 theory" },
      { label: "Pass mark", value: "At most 8 wrong, 52 of 60" },
      { label: "Time", value: "At most 1.5 hours; species part 15 minutes" },
      { label: "Languages", value: "Finnish, Swedish, English or Sámi (from 2026)" },
      { label: "Needed for", value: "The first hunting card (riistanhoitomaksu)" },
      { label: "Tigertest mock tests", value: "3 x 60 questions in Finnish, 52 to pass" },
    ],
    basedOn: "Suomen riistakeskus's instruction on the hunter's examination (1 January 2026), MMMa 1160/2014 on the hunter's examination, the Hunting Act 615/1993 and Hunting Decree 666/1993, checked November 2026",
    source: { name: "Suomen riistakeskus: metsästäjätutkinto", url: "https://riista.fi/tietoa-metsastyksesta/haluatko-metsastajaksi/metsastajatutkinto/" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Finnish)" like `detheorie` and `sejakt`; nothing exam-specific.
Check `LANGUAGE_NAMES` has `fi: "Finnish"` (added with the fi UI).

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` (and `HUB_PAGES_UPDATED_AT` for the new Finland group) to the
integration date with a comment naming the wave, then `npx tsx scripts/build-landing-dates.ts`.

## lib/shareImageUrl.ts, lib/shareCardCopy.ts, lib/shareCards.ts

As for the other native exams, if share copy is per exam: add `"fihunt"` to `SHARE_COPY_IDS` and
`fihunt: { title: "Metsästäjätutkinto", description: "Lajintuntemus, metsästyslaki, turvallisuus ja aseet suomeksi." },`
(card in the exam's language; `CARD_FOOTERS.fi` exists).

## lib/tigerAssets.ts

`BORROWED_SETS`: `fihunt: "hunter",` (like `nzfirearms` and `sejakt`).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx

The riistanhoitoyhdistykset run a recommended 12-hour preparatory course (metsästäjävalmennus-
kurssi, usually 3 to 4 evenings) before the exam, so it fits `TEACHER_LED`: add `"fihunt"` there
and to `TEACHES`: `fihunt: "a metsästäjätutkinto preparation course",`. The class FAQ string is
English and the native landing does not render it, so this only affects English surfaces; leave
it out if the class FAQ cannot be localised.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts, components/TestIcon.tsx

Sitemaps map over `EXAMS` (check `/fi/metsastajatutkinto-harjoituskoe` is emitted once, hreflang
`fi-FI`, x-default to itself). Class questions import `lib/banks/all`. No redirects. `target`
exists.

## scripts and checks

- `npx tsx scripts/build-training-parts.ts` (sets 28 to 50, all at most 60, so no parts).
- `python3 -I tools/build_exam_sources.py` (sources.md lists the riistakeskus 2026 instruction,
  the riistakeskus exam page and Finlex 615/1993 first).
- Freshness worth recording in `lib/examFreshness.json`: none dated. The riistakeskus revises the
  questions with each new Metsästäjän opas edition; the bank avoids season dates, quotas and fees.

## Screenshots

`TranslatedExamLanding` reads `/landing/fihunt-{mobile,desktop}-fi.png` (and the `-dark` twins):
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing fihunt:metsastajatutkinto:24201`
then rename to the `-fi` names (as for `detheorie`'s `-de` and `sejakt`'s `-sv`).

## CLAUDE.md (after the Finland tests in the EU section, or with the native-language exams)

```md
- **Metsästäjätutkinto** (`fihunt`, the Finnish hunter's examination needed before the first hunting card, base language Finnish, `language: "fi"`, `locale: "fi-FI"`, English names in `english`, `review: { fi: "model" }`, `/metsastajatutkinto/*`, landing `/fi/metsastajatutkinto-harjoituskoe` from `lib/landings/fihunt.fi.json`): `data/finland-hunter-exam-questions.json` (200 original questions written in Finnish on the eight topic areas of MMMa 1160/2014: species identification 48 (written in words), hunting law 40, hunting safety 26, firearms and cartridges 24, ethical and sustainable hunting 17, hunting equipment and methods 17, game management and ecology 17, handling the game 11), three real-length tests (IDs 24201-24203, 60 questions each, 15/12/8/7/5/5/5/3 per test, Tigertest's split, the last items of each pool (20 in all) training-only) and five Finnish-named topic sets 24201-24205 (Lajintuntemus 48, Metsästyslainsäädäntö 40, Turvallisuus, aseet ja patruunat 50, Etiikka ja pyyntimenetelmät 34, Riistanhoito ja saaliin käsittely 28), 8 dashboard steps, state `FIHUNT`, prefix `FIHUNT-`, 86% pass (52 of 60, the real line: Suomen riistakeskus's instruction of 1.1.2026 and MMMa 1160/2014, 60 questions written by the riistakeskus, 15 species pictures in 15 minutes then 45 theory questions, at most 1.5 hours, at most 8 wrong; held by riistanhoitoyhdistykset, electronic or paper; Finnish, Swedish, English or Sámi from 1.1.2026). The riistakeskus keeps its questions confidential, so all items are written from the Hunting Act 615/1993 (hunting year, 150 m from homes, roads, 100 m from vehicles, prohibited methods, transport, always-protected species, dogs 1.3.-19.8., found game), the Hunting Decree 666/1993 (catch reports, one adult or two calves, traps, gauges 10 to 20, bullet energies, expanding bullets, bows 180 N and 22 mm, orange two thirds), the Firearms Act 1/1998 (supervised use, storage) and Ruokavirasto's guidance on game meat; no season dates, quotas or fees; species described in words. The picture part is not modelled. Built by `tools/next100/fihunt/build.py` (sorts all-number options with Finnish decimal commas and no-break thousands); sources in `tools/next100/fihunt/sources.md`, terms in `glossary.md`. Region FI, hub group "Finland licences and workplace certificates", `[data-theme="fihunt"]` dark hunting olive (75 60% 20%), borrows the hunter tiger.
```

## Decisions for the integrator

1. **Test length.** Three real-length 60-question tests with 20 training-only spares, rather than
   4 x 50, so the mock matches the real 52-of-60 rule exactly. The brief suggested modelling 50
   text questions; the official 2026 instruction says 15 picture questions (not 10) and 45 theory,
   so each test keeps 15 species items, written in words.
2. **Hue.** Suggested `95 40% 24%` clashes with `sejakt`, `nptepta` and `dkjagt`; `75 60% 20%` is
   clear but below the 30% lightness floor.
3. **English exam exists.** From 1.1.2026 the real exam is offered in English, Swedish and Sámi
   too, so the FI English-language market can be served later by `translations.en` on this id.
4. **Region language and `/fi` layout**: see above (keep FI English, no `app/fi/layout.tsx`).
5. **Review.** `review: { fi: "model" }`; a native Finnish reviewer pass is still owed.
