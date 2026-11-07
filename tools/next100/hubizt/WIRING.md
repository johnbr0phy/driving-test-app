# Wiring for `hubizt` (Hungarian insurance intermediary exam, MNB biztosításközvetítői hatósági vizsga, in Hungarian, v1)

A native-language exam (base language Hungarian, `language: "hu"`), built from the `detheorie`
template and laid out like `de34a` and its Hungarian sibling `huelsoseg`. The Hungarian phase-0
pieces (`i18n/hu.ts`, `EXAM_UI.hu`, `COPY.hu`, `SAMPLE_COPY.hu`, `RELATED_COPY.hu`,
`CARD_FOOTERS.hu`, the `hu` shuffle guard, `LANG_RULES["hu"]`, `/hu/` in `lib/urlLanguage.ts`,
`TEST_SET_NAMES.hu`) already exist (checked 2026-11-06), so nothing language-level is left.

Files already written by the builder:
- `data/hu-biztositaskozvetito-questions.json` (200, validator PASS with `--lang hu`)
- `lib/banks/hubizt.ts`
- `app/biztositaskozvetitoi-vizsga/*` (5 wrappers: layout, page, dashboard, drill, stats; copied
  from `app/sachkunde-34a/`; stats imports the bank; no test or practice folders)
- `lib/landings/hubizt.hu.json` (Hungarian landing content, `facts.source` the MNB Vizsgaszabályzat)
- `app/hu/biztositaskozvetitoi-vizsga-teszt/page.tsx` (three-line `TranslatedExamLanding` wrapper,
  `lang="hu"`, `samples`, `related`)
- `tools/next100/hubizt/*` (spec, sources, glossary, `q_*.py`, `build.py`, this file)

Rebuild with `python3 -I tools/next100/hubizt/build.py`. Validate with:
`python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/hu-biztositaskozvetito-questions.json --lang hu --pool hubiztPenzpiac=25 --pool hubiztKozvetito=30 --pool hubiztHatosag=30 --pool hubiztKockazat=30 --pool hubiztDij=25 --pool hubiztSzerzodes=25 --pool hubiztMegszunes=15 --pool hubiztTipusok=20`
-> `letters {'A': 56, 'B': 48, 'C': 50, 'D': 46}  avg option 25 chars  key-longest 3%  key>1.2x 3%  PASS`.
`python3 -I tools/check_banks.py` PASS. 16 all-number items are sorted by the build; the key sits
in an end slot in 8 of them.

Format note (MNB Vizsgaszabályzat in force from 12 June 2025, the 40/2015. (XII. 30.) NGM decree
and the MNB notice of 14 May 2026, checked 2026-11-06, see sources.md): the MNB's official exam
is a Hungarian-language multiple-choice computer test drawn from the MNB question bank, taken after
the compulsory course at a registered training body (képző szerv), in its exam room or online from
the candidate's own computer. Dependent intermediary (ügynök, többes ügynök): 40 questions,
40 minutes, pass at 30 points. Independent (alkusz): 60, 60 minutes, pass at 45. Independent
differential exam: 20, 20 minutes, pass at 15. An answer cannot be changed after moving on. The
bank was revised from 2 June 2026 (13 questions changed, 10 deleted). Tigertest models the
dependent exam's three subjects: five 40-question tests (200 items, pools exactly 5x each per-test
count, every item in exactly one test), `passPct: 75` = 30 of 40, the real line. The independent
exam's fourth subject (független biztosításközvetítői alapismeretek) is not modelled; the landing
says so. All items are original, never from the MNB bank.

## lib/exams.ts

Add `"hubizt"` to the `ExamId` union. Icon `umbrella` already exists (insurance). The 24700 block
is the one assigned in the brief (hukreszmoto 24400, hugki 24500, huelsoseg 24600); set ids
24701-24704 share numbers with test ids 24701-24705 like other topic-set exams.

```ts
const hubizt: ExamConfig = {
  id: "hubizt",
  stateCode: "HUBIZT",
  idBase: 24700,
  slug: "/biztositaskozvetitoi-vizsga",
  landingPath: "/hu/biztositaskozvetitoi-vizsga-teszt",
  name: "Biztosításközvetítői vizsga teszt",
  shortName: "Biztosításközvetítői vizsga",
  examLabel: "Függő biztosításközvetítői hatósági vizsga",
  fullName: "Függő biztosításközvetítői hatósági vizsga (Magyar Nemzeti Bank)",
  questionIdPrefix: "HUBIZT-",
  icon: "umbrella",
  testCount: 5,
  questionsPerTest: 40,
  passPct: 75,
  language: "hu",
  locale: "hu-HU",
  english: {
    name: "Hungary Insurance Intermediary Exam (MNB)",
    shortName: "Hungarian insurance intermediary exam",
    fullName: "Hungarian insurance intermediary licensing exam (biztosításközvetítői hatósági vizsga, Magyar Nemzeti Bank), dependent intermediary level, in Hungarian",
  },
  review: { hu: "model" },
  // Real exam (MNB Vizsgaszabályzat in force 12 June 2025; 40/2015. (XII. 30.) NGM rendelet
  // annexes 2 and 3; MNB notice of 14 May 2026; checked 2026-11-06): Hungarian multiple-choice
  // computer test from the MNB question bank, classroom or online. Dependent intermediary 40
  // questions, 40 minutes, pass at 30 points; independent 60/60/45; differential 20/20/15.
  // Categories follow annex 2's three subjects (1 A-C, 2, 3 A-B); the 5/6/6/6/5/5/3/4 split is
  // Tigertest's (17/11/12 by subject). Five tests of 40, pools exactly 5x each count (200, all
  // original, written in Hungarian). passPct 75 (30 of 40) is the real dependent pass line.
  blueprint: {
    hubiztPenzpiac: 5,
    hubiztKozvetito: 6,
    hubiztHatosag: 6,
    hubiztKockazat: 6,
    hubiztDij: 5,
    hubiztSzerzodes: 5,
    hubiztMegszunes: 3,
    hubiztTipusok: 4,
  },
  // Four topic sets, not testSets(): 4 + 5 tests = 9 dashboard steps.
  trainingSets: [
    { setNumber: 1, id: 24701, name: "Pénzügyi és biztosítási piac", categories: ["hubiztPenzpiac", "hubiztKozvetito"], size: 55, weightLabel: "11 kérdés a 40-ből tesztenként" },
    { setNumber: 2, id: 24702, name: "Hatóságok és fogyasztóvédelem", categories: ["hubiztHatosag"], size: 30, weightLabel: "6 kérdés a 40-ből tesztenként" },
    { setNumber: 3, id: 24703, name: "Biztosításszakmai alapfogalmak", categories: ["hubiztKockazat", "hubiztDij"], size: 55, weightLabel: "11 kérdés a 40-ből tesztenként" },
    { setNumber: 4, id: 24704, name: "Biztosítási szerződésjog", categories: ["hubiztSzerzodes", "hubiztMegszunes", "hubiztTipusok"], size: 60, weightLabel: "12 kérdés a 40-ből tesztenként" },
  ],
  categoryLabels: {
    hubiztPenzpiac: "Pénzügyi piacok szereplői",
    hubiztKozvetito: "Biztosítók és biztosításközvetítők",
    hubiztHatosag: "Hatóságok, titokvédelem és pénzmosás",
    hubiztKockazat: "Kockázat, kár és kockázatmegosztás",
    hubiztDij: "Díj, tartalékok és pénzügyi számítások",
    hubiztSzerzodes: "A biztosítási szerződés általános szabályai",
    hubiztMegszunes: "A szerződés megszűnése",
    hubiztTipusok: "Vagyon-, felelősség-, élet- és balesetbiztosítás",
  },
  copy: {
    guestPrompt: "hogy elmentsd a haladásodat a biztosításközvetítői vizsgához, és minden rossz válaszodat számon tartsd",
    trainingHeading: "Gyakorlósorok",
    trainingSub: "Minden gyakorlósor a vizsga egy-egy témakörét fedi le. Azonnal látod, jól válaszoltál-e, és a rossz válaszaid visszajönnek, amíg biztosan nem tudod őket.",
    testsHeading: "Tesztek · 40 kérdés, 30 jó választól sikeres",
    heroSubs: [
      "Négy gyakorlósor, öt teszt. A piac szereplői és a szerződésjog adja a kérdések nagy részét.",
      "Előbb tanuld meg a gyakorlósort, aztán írd meg a tesztet.",
      "Félúton jársz. Írj meg egy tesztet.",
      "Gyakorold a hibáidat, aztán teszteld magad újra.",
      "Minden zöld. Jelentkezz a hatósági vizsgára a képző szervednél.",
    ],
    sourceLine: "Saját kérdések a 40/2015. (XII. 30.) NGM rendelet követelményei, a Bit., a Ptk., a Gfbt. és a Pmt. alapján, 2026. novemberi állapot. Nem az MNB kérdésbankjából valók.",
    analyticsKey: "hubizt",
  },
};
```

Append `hubizt` to the `EXAMS` array with the Hungarian exams (after `huelsoseg`) or with the
insurance exams (after `insurance`). ID header comment if wanted:
` *   HUBIZT 24700s (tests 24701-24705, sets 24701-24704)`.

## lib/banks/all.ts

```ts
import "./hubizt";
```

## types/index.ts

- `QuestionType`: add `| "HUBIZT"`.
- `QuestionCategory`, under a `// Hungarian insurance intermediary exam (MNB)` comment (keys
  grepped: no `hubizt` key exists):

```ts
  | "hubiztPenzpiac"
  | "hubiztKozvetito"
  | "hubiztHatosag"
  | "hubiztKockazat"
  | "hubiztDij"
  | "hubiztSzerzodes"
  | "hubiztMegszunes"
  | "hubiztTipusok"
```

## i18n

Results and stats read `exam.categoryLabels` first, so nothing is needed for Hungarian. If a
dictionary still needs the keys, `i18n/en.ts` (others fall back to English):

```ts
    hubiztPenzpiac: "Financial Market Players",
    hubiztKozvetito: "Insurers & Intermediaries",
    hubiztHatosag: "Authorities, Secrecy & AML",
    hubiztKockazat: "Risk, Loss & Risk Sharing",
    hubiztDij: "Premiums, Reserves & Financial Maths",
    hubiztSzerzodes: "Insurance Contract: General Rules",
    hubiztMegszunes: "Ending the Contract",
    hubiztTipusok: "Property, Liability, Life & Accident Cover",
```

## lib/shuffleOptions.ts

No position-dependent options ("A és B", "Mindkettő", "A fentiek mindegyike"); the build asserts
it. All-number options (days, years, hours, forint amounts) are sorted ascending by the build.

## app/globals.css

The suggested `215 35% 30%` clashes with `security` (222 35% 36%), `phlto` (212 40% 26%),
`sbiclerk` (209 40% 34%) and `cfal1` (220 25% 26%); the whole 195 to 240 band is taken at that
saturation and lightness. Scanned every `[data-theme]` in `app/globals.css` plus the pending
siblings (hugki 35 40% 18%, hukreszmoto 160 25% 22%, huelsoseg 345 20% 34%) with the rule
(within 8 degrees: 15 points of saturation or 8 of lightness apart): `232 15% 32%`, a grey slate
blue, is clear and keeps the insurance-blue feel. White text about 9:1. Fallback: `196 15% 32%`
(also clear). Then run `tools/gen_dark_brand_css.py`.

```css
  /* Hungarian insurance intermediary exam (biztosításközvetítői hatósági vizsga) theme */
  [data-theme="hubizt"] {
    --brand: 232 15% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 232 25% 96%;
    --brand-hover: 232 16% 26%;
    --brand-dark: 232 18% 20%;
    --brand-darker: 232 20% 14%;
    --brand-muted: 232 10% 64%;
    --brand-border: 232 12% 80%;
    --brand-border-light: 232 14% 90%;
    --brand-gradient-to: 215 40% 94%;
  }
```

## lib/shareCards.ts, lib/shareCardCopy.ts

```ts
  "hubizt": {
    "color": "hsl(232, 15%, 32%)",
    "tint": "hsl(232, 25%, 96%)"
  },
```
`SHARE_COPY` line (English surfaces):
`hubizt: { title: "Hungary Insurance Intermediary Exam", description: "Practise the MNB dependent intermediary exam in Hungarian: market players, insurance basics and contract law, in 40-question tests." },`

## lib/testCatalog.ts

- `EXAM_BLURBS` (English surfaces):
  `hubizt: "Five 40-question tests in Hungarian for the MNB insurance intermediary exam (dependent intermediary): financial and insurance market players, agents and brokers, supervision, secrecy and anti-money laundering, risk and premium basics, and insurance contract law in the Civil Code, written from the 40/2015 NGM decree as of November 2026.",`
- `EXAM_ORG`: `hubizt: "MNB (Magyar Nemzeti Bank) · biztosításközvetítői hatósági vizsga, in Hungarian",`
- Hub group: the Hungary group for non-driving tests, right after `"EU driving theory tests"`
  (which holds hukresz and hukreszmoto), shared with the siblings:
  `{ title: "Hungary licences and professional exams", ids: ["hugki", "huelsoseg", "hubizt"] },`
  (the title hugki's and huelsoseg's WIRING files use; if the integrator puts hugki in the
  driving group, the group is huelsoseg and hubizt). Optional `RELATED_OVERRIDES` so the landing
  links other insurance licensing exams too:
  `hubizt: ["huelsoseg", "hugki", "ieqfa", "mypce", "insurance"],`
- `SEARCH_ALIASES` (Hungarian with and without accents, and English):
  `hubizt: "biztosításközvetítői vizsga biztositaskozvetitoi vizsga biztosításközvetítői hatósági vizsga hatosagi vizsga mnb vizsga mnb hatósági vizsga függő biztosításközvetítő fuggo biztositaskozvetito független biztosításközvetítő alkusz vizsga ügynök vizsga ugynok vizsga többes ügynök biztosítási ügynök biztositasi ugynok biztosítási tanácsadó biztosítási vizsga biztositasi vizsga kérdésbank ptk biztosítási szerződés kgfb hungary insurance intermediary exam hungarian insurance agent exam hungary insurance broker exam mnb exam insurance licence hungary",`
- Native name on Hungarian surfaces, `english.name` elsewhere.

## lib/region.ts

```ts
  hubizt: "HU",
```
(in `TEST_REGIONS`, next to `hukresz: "HU"`). Not a driving test, so add it to
`NON_DRIVING_TESTS`. Region `HU` exists with `lang: "en"`; the Hungarian landing works under the
`/hu/` prefix (`lib/urlLanguage.ts`, `includeRoot: false`, so `/hu` itself stays the English
homepage). Optional: `REGION_HOME.HU.lead` could mention, in English, "the MNB insurance
intermediary exam, practised in Hungarian" once it is in the catalog.

## lib/landingContent.ts

```ts
import hubiztHu from "@/lib/landings/hubizt.hu.json";
  "hubizt.hu": hubiztHu as TranslatedLandingContent,
```

## app/hu/layout.tsx

None needed (`lib/urlLanguage.ts` maps pages under `/hu/` to `hu`). `TranslatedExamLanding` uses
the base `landingPath` when `lang === exam.language`; HUF is in its currency table.

## lib/examFacts.ts (English, for llms.txt and English surfaces)

```ts
  hubizt: {
    answer:
      "To sell insurance in Hungary as a tied agent (ügynök or többes ügynök) you need, among the routes the Insurance Act (Bit.) allows, the official exam of the Magyar Nemzeti Bank (MNB), taken after the compulsory course at a training body registered with the MNB. The exam is a Hungarian-language multiple-choice computer test, sat in the training body's exam room or online from your own computer with video and sound recording. The dependent intermediary exam has 40 questions in 40 minutes and you pass with 30 points. The independent (broker) exam has 60 questions in 60 minutes with 45 points to pass, and the differential exam that takes a tied agent to broker level has 20 questions in 20 minutes with 15 points to pass. Each test sheet is drawn from the MNB's question bank, revised most recently from 2 June 2026. The dependent exam covers three subjects set by decree 40/2015 NGM: financial and insurance market players and authorities, basic insurance concepts, and insurance contract law. Once you move on from a question you cannot change its answer.",
    rows: [
      { label: "Run by", value: "Magyar Nemzeti Bank, through registered training bodies" },
      { label: "Dependent exam", value: "40 questions, 40 minutes, pass at 30" },
      { label: "Independent exam", value: "60 questions, 60 minutes, pass at 45" },
      { label: "Differential exam", value: "20 questions, 20 minutes, pass at 15" },
      { label: "Format", value: "Multiple-choice computer test, exam room or online" },
      { label: "Language", value: "Hungarian" },
      { label: "Question bank", value: "MNB bank, revised from 2 June 2026" },
      { label: "Tigertest mock tests", value: "5 x 40 questions in Hungarian, 30 to pass" },
    ],
    basedOn: "the MNB exam rules (Vizsgaszabályzat, in force 12 June 2025), annexes 2 and 3 of decree 40/2015 (XII. 30.) NGM, and the MNB notice on the question bank of 14 May 2026, checked November 2026",
    source: { name: "MNB exam rules (Vizsgaszabályzat, in Hungarian)", url: "https://www.mnb.hu/letoltes/vizsgaszabalyzat.pdf" },
  },
```

## lib/llmsTxt.ts

Uses `english.name` with "(in Hungarian)"; nothing exam-specific.

## lib/seoDates.ts

Bump `EXAM_LANDINGS_UPDATED_AT` to the integration date with a comment naming the Hungary batch.
Run `npx tsx scripts/build-landing-dates.ts` after committing.

## lib/tigerAssets.ts

`BORROWED_SETS`: `hubizt: "insurance",` (the life and health insurance tiger, as the brief asks).

## components/TeachNudge.tsx, components/exam/ExamClassFaq.tsx (teacher-led)

The exam can only be taken after the compulsory hatósági képzés run by a training body, so a
course leader can set it for a class:
- `TEACHER_LED`: add `"hubizt"`.
- `TEACHES`: `hubizt: "a hatósági képzés course for insurance intermediaries",`
`TranslatedExamLanding` does not render `ExamClassFaq`, so the Hungarian landing has no class FAQ;
the nudge and `/teach` still work.

## lib/sitemaps.ts, lib/server/classQuestions.ts, next.config.ts

Sitemaps map over `EXAMS` (check `/hu/biztositaskozvetitoi-vizsga-teszt` is emitted once,
hreflang `hu-HU`, x-default to itself). Class questions import `lib/banks/all`. No redirects.

## scripts/build-training-parts.ts

Run `npx tsx scripts/build-training-parts.ts` after wiring. Sets are 30 to 60, so no parts.

## Question quality hooks

Run `python3 -I tools/build_exam_sources.py` (the first three https URLs of `sources.md` are the
MNB Vizsgaszabályzat, decree 40/2015 NGM on net.jogtar.hu and the MNB question-bank notice of May
2026). Optional `lib/examFreshness.json` event (already followed by this bank, so `done: true`):

```json
{ "exam": "hubizt", "date": "2026-06-02", "kind": "notice", "what": "MNB revised the insurance intermediary question bank (13 questions changed, 10 deleted).", "action": "None needed: Tigertest items are original and follow the decree's topics.", "source": "https://www.mnb.hu/letoltes/tajekoztato-a-biztositaskozvetitoi-hatosagi-vizsga-kerdesbankjanak-valtozasarol-2026-05.pdf", "done": true }
```

## Screenshots

`TranslatedExamLanding` reads `/landing/hubizt-{mobile,desktop}-hu.png`:
`node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing hubizt:biztositaskozvetitoi-vizsga:24701`
then rename the files to the `-hu` names (and their `-dark` twins).

## CLAUDE.md (after the huelsoseg bullet, or with the other insurance exams)

```md
- **Biztosításközvetítői vizsga** (`hubizt`, the Magyar Nemzeti Bank's official exam for insurance intermediaries (biztosításközvetítői hatósági vizsga), dependent intermediary level (ügynök, többes ügynök), native Hungarian exam, `language: "hu"`, `locale: "hu-HU"`, English names in `english`, `review: { hu: "model" }`, `/biztositaskozvetitoi-vizsga/*`, landing `/hu/biztositaskozvetitoi-vizsga-teszt` from `lib/landings/hubizt.hu.json`): `data/hu-biztositaskozvetito-questions.json` (200 original questions written directly in Hungarian on the three subjects of annex 2 of decree 40/2015 (XII. 30.) NGM: financial market players 25, insurers, agents, brokers and the MABISZ funds 30, MNB, GVH, NAIH, insurance secrecy, Pmt. and the Pénzügyi Békéltető Testület 30; risk, loss, risk management and risk sharing 30; premiums, reserves, claims and interest maths 25; general contract rules of the Ptk. 25, ending the contract 15, property, liability, life and accident insurance and KGFB 20), five 40-question tests (IDs 24701-24705, 5/6/6/6/5/5/3/4 per test, Tigertest's split, no spares) and four Hungarian-named topic sets 24701-24704 (55/30/55/60), 9 dashboard steps, state `HUBIZT`, prefix `HUBIZT-`, 75% pass (30 of 40, the real dependent line). The real exam (MNB Vizsgaszabályzat in force 12 June 2025): Hungarian multiple-choice computer test from the MNB question bank (revised from 2 June 2026), classroom at the training body or online; dependent 40 questions in 40 minutes, pass at 30; independent (alkusz) 60/60/45; differential 20/20/15; no changing an answer after moving on. The independent exam's fourth subject is not modelled; no fees, euro liability limits or other money figures except worked interest and pro rata sums. Law as of November 2026 (Ptk. 6:439 to 6:490, Bit., Gfbt., Pmt.). Built by `tools/next100/hubizt/build.py`; sources in `tools/next100/hubizt/sources.md`, terms in `glossary.md`. Region HU, hub group "Hungary licences and professional exams" (with hugki and huelsoseg), `[data-theme="hubizt"]` grey slate blue (232 15% 32%), borrows the life and health insurance tiger, teacher-led (hatósági képzés courses).
```

## Decisions for the integrator

1. **Hue** `232 15% 32%` instead of the suggested `215 35% 30%` (clashes with security, phlto,
   sbiclerk and cfal1; the blue band is full at that saturation).
2. **Which exam is modelled.** The dependent exam (40 questions), as the brief asks; independent
   brokers need the extra fourth subject, which the landing and FAQ say is not covered.
3. **The MNB question bank is public.** Every item is original and written from the decree's
   topic list and the statutes; the landing says the official bank is worth reviewing too.
4. **Number of answer options** on the real test is not stated in the exam rules; nothing on the
   landing claims a count beyond Tigertest's own four.
5. **Teacher-led** (training bodies run the compulsory course), with no class FAQ on the
   Hungarian landing (component limitation).
6. **Register**: questions impersonal or third person; landing and dashboard copy in "te", as in
   `huelsoseg`.
7. **Siblings**: grepped hukresz, hukreszmoto and hugki (English, driving; their only insurance
   facts are the compulsory motor insurance document and the accident statement form) and
   huelsoseg (first aid): no shared fact-and-answer pairs. The KGFB items here are about civil-law
   claims, the bonus-malus and the MABISZ funds, not about carrying insurance to drive.
8. **Key-longest share** is 3% after length tuning (the validator allows up to 25%); the key is
   the strictly shortest option in about 15% of items, below chance.
