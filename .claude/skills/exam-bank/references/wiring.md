# Wiring a new exam into the app

Everything below is keyed off one `ExamConfig`. Use the most recently added v1 exam (VTNE,
`app/vtne/` and `app/vtne-practice-test/`, as of October 2026) as the template and diff the
latest "Add ... exams" commit (`git log --oneline --grep "exams"`) if anything here is stale.
Placeholders: `<id>` exam id (e.g. `forklift`), `<CODE>` stateCode, `<slug>` route folder
(e.g. `forklift` or `osha-10`), `<landing>` landing folder (e.g. `forklift-certification-practice-test`).

Sectioned, timed exams (SAT-style modules, NGN item formats, adaptive) are v2 exams: follow
"To add a v2 exam" in CLAUDE.md instead, copying the newest v2 exam (`lib/v2/exams/ged.ts`).

## 0. Inherit the site, never fork it
A new exam looks and behaves like every other exam because its pages are thin wrappers around
shared components. Never copy a shared component into an exam folder to change it; change the
shared one (and check the other exams) or add a field to `ExamConfig`. The shared pieces:
- Dashboard, practice sets, tests, results, drill, stats: `components/exam/*` (`ExamDashboard`,
  `ExamTrainingPage`, `ExamTestPage`, `ExamResultsPage`, `ExamDrillPage`, `ExamStatsPage`) and
  `components/dashboard/ProgressCard.tsx`.
- Header logo, header and footer: `components/BrandLockup.tsx`, `HeaderSwitch`, `Footer.tsx`
  (they pick the exam by path; nothing to add per exam).
- Landing hero, facts, class FAQ, related tests: `ExamLandingHero`, `ExamFacts`,
  `ExamClassFaq`, `ExamRelatedTests`. No breadcrumb above the hero (removed in #488).
- Copy says "Tigertest", never "TigerTest" or "tigertest" (URLs and storage keys excepted).

## 1. `lib/exams.ts`
- Add `"<id>"` to the `ExamId` union.
- Add the icon key to the `icon` union if it is new (then see step 7).
- Add a `const <id>: ExamConfig = { ... }` block before `const htl` with: id, stateCode, idBase,
  slug, landingPath, name, shortName, examLabel, fullName, questionIdPrefix, icon, testCount 4,
  questionsPerTest 50, passPct, a comment naming the outline the blueprint follows, `blueprint`
  (per-test counts summing to 50), `trainingSets` (setNumber, id = idBase + setNumber, name,
  categories, size = sum of pools, weightLabel "N% of the tests"), `categoryLabels`, and `copy`
  (guestPrompt, trainingHeading, trainingSub, testsHeading, five heroSubs, sourceLine,
  analyticsKey = id).
- Append `<id>` to the `EXAMS` array before `htl`.

## 2. Bank module `lib/banks/<id>.ts`
- Copy `lib/banks/vtne.ts`: import `@/data/<file>.json` and call `registerExamBanks({ <id>: ... })`.
  Each exam page imports it for that side effect, so a page bundles only its own bank.
- Add `import "./<id>";` to `lib/banks/all.ts` (server code and the MCP tools load every bank there).

## 3. `types/index.ts`
- Add `"<CODE>"` to `QuestionType`.
- Add each category key to the `QuestionCategory` union under a comment naming the exam.

## 4. `i18n/en.ts`, `es.ts`, `ko.ts`, `vi.ts`, `zh.ts`
- Add each category key with its English label to the category label map in all five files
  (the other languages keep English labels for exam categories). The newer dictionaries
  (`de`, `fr`, `it`, `pl`, `nl`, `pt`) carry no category names: `createT` falls back to English,
  and results and stats read the exam's own `categoryLabels` first.

## 5. `app/globals.css`
- Add a `[data-theme="<id>"]` block after the last exam theme with the ten `--brand*` variables.
  Pick an unused hue; keep `--brand` lightness 30 to 48% so white text passes contrast.

## 6. `lib/testCatalog.ts`
- `EXAM_BLURBS[<id>]`: one or two sentences, name the real exam and the big topics.
- `EXAM_ORG[<id>]`: the issuing body or exam family in a few words.
- Add `<id>` to a hub group in `GROUPS` (or create a group when three or more exams fit).
- `SEARCH_ALIASES[<id>]`: the words people type that are not in the name.
- `RELATED_OVERRIDES[<id>]` if its hub group has fewer than three other members.

## 7. Icons (only for a new icon key)
- `components/CDLHeader.tsx` and `components/TestIcon.tsx`: import the lucide icon and add the
  `if (icon === "<key>")` line. Check the icon exists: `node -e "console.log(typeof require('lucide-react').<Name>)"`.

## 8. `app/<slug>/` wrappers (eight files)
Copy `app/vtne/` and replace `vtne` with `<id>` (in `getExamById`, `examAppMetadata`,
`data-theme`, the `@/lib/banks/<id>` import and the redirect) and `Vtne` with the exam's
PascalCase name in component names: `layout.tsx`, `page.tsx` (redirects to the dashboard),
`dashboard/page.tsx`, `drill/page.tsx`, `practice/[n]/page.tsx`, `stats/page.tsx`,
`test/[id]/page.tsx`, `test/[id]/results/page.tsx`. Each is a few lines around a shared
component; if a wrapper needs more than that, the change belongs in the shared component.

Then run `npx tsx scripts/build-training-parts.ts` (it writes the exam's practice-set split to
`lib/trainingParts.json`).

## 9. `app/<landing>/page.tsx`
Model on `app/vtne-practice-test/page.tsx`. Keep the structure: metadata (title with the
year, description, keywords, canonical, OG image `/og/<id>`), `WebApplication` + `Organization`
+ `FAQPage` JSON-LD, `<ExamLandingHero>` with `shots` at
`/landing/<id>-mobile.png` and `/landing/<id>-desktop.png` (it shows the dark twins and turns the
button into Go to Dashboard once the test is started), `<ExamFacts examId>` right under it, How It
Works, blueprint list with weights (per-test count x 2), `getTigerAsset("<id>", 1)`, We Just
Launched, four study tips, five FAQs whose JSX text matches the JSON-LD text exactly,
`<ExamClassFaq examId>` (and `classFaqJsonLd`) for a teacher-led exam, `<ExamRelatedTests examId>`,
`<ExamLandingCTA>`.

Alongside the landing:
- `lib/examFacts.ts`: an entry for `<id>` (plain answer, facts table, official source, dated).
- `lib/seoDates.ts`: bump `EXAM_LANDINGS_UPDATED_AT` with a comment naming the new exam.
- Teacher-led exams (taught in a program or class: healthcare, school, military): add `<id>` to
  `TEACHER_LED` in `components/TeachNudge.tsx` and a line to `TEACHES` in
  `components/exam/ExamClassFaq.tsx`.
Plain apostrophes in metadata and JSON-LD; `&apos;` only inside JSX text. No em-dashes.

## 10. `CLAUDE.md`
Add a bullet under "Additional Exams" in the same shape as the others: route, landing, data
file with per-category pools, test and set IDs, state code, pass percentage, per-test counts,
source outline, hub group.

## 11. Screenshots
```bash
npm run build && PORT=3123 npm start &
node .claude/skills/exam-bank/scripts/shoot_landing.js http://localhost:3123 public/landing <id>:<slug>:<idBase+1>
```
This writes four files: `<id>-desktop.png`, `<id>-mobile.png` and their `-dark.png` twins, which
`ThemedScreenshot` (used by `ExamLandingHero`) shows when the site is dark. Never ship a light shot
without its dark twin. v2 exams use `<id>:<slug>:v2:<drillKey>`.
(`playwright` must be resolvable by node; install it in a scratch folder if it is not in
node_modules. Chromium is preinstalled in cloud sessions.)

## 12. Mascots (optional, later)
`lib/tigerAssets.ts` lists exams with finished art under `public/tigers/<id>/`. New exams fall
back to the DMV tiger automatically; add the id only once eight expressions exist.

## Native-language exam (a bank written in German, Italian, Polish...)
A native exam is a normal v1 exam whose base bank and base copy are in its own language
(LANGUAGES.md in `tools/next100/` is the plan). Everything above applies, plus:
- `ExamConfig`: `language: "de"`, `locale: "de-DE"`, `english: { name, shortName, fullName }`
  (the English names every English surface uses: catalog, `/tests`, All tests menu, llms.txt,
  admin), `review: { de: "model" }` (`"machine"` for a machine translation, `"native"` once a paid
  native reviewer is done). `name`, `shortName`, `examLabel`, `fullName`, `categoryLabels`, `copy`
  and set names are in the base language. DMV-style sets: `testSets(idBase, n, size)`, whose names
  come from `TEST_SET_NAMES[language]`.
- Its pages run in its language whatever the person chose (`lib/pageLanguage.ts`); an English
  version later is `translations.en` with its own landing, never a second exam id.
- Landing: `landingPath` under the country path (`/de/fuehrerschein-theorie-test`), the
  three-line `TranslatedExamLanding` wrapper with `lang` set to the base language and content in
  `lib/landings/<id>.<lang>.json` (`facts.source` gives the source link in that language); pass
  `samples` (and import `@/lib/banks/<id>` at the top of the page) and `related`. Register the
  landing JSON in `lib/landingContent.ts` so the country homepage can quote its facts answer.
- Region: `TEST_REGIONS[<id>]` in `lib/region.ts`; a new country also needs a `REGIONS` entry with
  `lang` and `locale`, `regionFromCountry`, `REGION_HOME` written in that language, `AUTHORITY`
  in `components/home/HomePage.tsx`, `FLAGS` in `components/CountryPills.tsx`, strings in
  `components/home/homeCopy.ts` for a language with no country page yet, `app/<cc>/page.tsx` and
  `app/<cc>/layout.tsx` with `lang="<lang>"`.
- Per-language tables: `EXAM_UI` (`lib/examUi.ts`), `COPY` (`ExamLandingHero`), `SAMPLE_COPY`
  (`ExamSampleQuestions`), `RELATED_COPY` (`ExamRelatedTests`), `CARD_FOOTERS` (`lib/shareCards.ts`),
  the shuffle guard (`lib/shuffleOptions.ts`) and `LANG_RULES` in `validate_bank.py`. All six EU
  languages are in place; a new language needs a line in each and an `i18n/<lang>.ts`.
- Validate with `validate_bank.py --lang <lang>` (length limits scale per language); a
  translation of an existing bank with `validate_translation.py <base> <translation> --lang <lang>`.
- `EXAM_FACTS[<id>]` stays English (the English landing and llms.txt read it).

## 13. Verify before committing
```bash
npx tsc --noEmit -p .
npm run lint          # zero errors
npm run build
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3123/<landing>
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3123/og/<id>
curl -s http://localhost:3123/sitemaps/exams | grep -c "<landing>"
```
