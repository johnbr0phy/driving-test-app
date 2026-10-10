# Wiring a new exam into the app

Everything below is keyed off one `ExamConfig`. Use the most recently added exam in
`lib/exams.ts` as the template and diff a previous "Add N exams" commit if anything here is stale.
Placeholders: `<id>` exam id (e.g. `forklift`), `<CODE>` stateCode, `<slug>` route folder
(e.g. `forklift` or `osha-10`), `<landing>` landing folder (e.g. `forklift-certification-practice-test`).

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

## 2. `lib/examData.ts`
- `import <id>Questions from "@/data/<file>.json";` and `<id>: <id>Questions as Question[],` in `BANKS`.

## 3. `types/index.ts`
- Add `"<CODE>"` to `QuestionType`.
- Add each category key to the `QuestionCategory` union under a comment naming the exam.

## 4. `i18n/en.ts`, `es.ts`, `ko.ts`, `vi.ts`
- Add each category key with its English label to the category label map in all four files
  (the other languages keep English labels for exam categories).

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

## 8. `app/<slug>/` wrappers (seven files)
Copy `app/hesi/` and replace `hesi` with `<id>` in `getExamById`, `examAppMetadata`,
`data-theme`, and `Hesi` with the exam's PascalCase name in component names:
`layout.tsx`, `dashboard/page.tsx`, `drill/page.tsx`, `stats/page.tsx`, `test/[id]/page.tsx`,
`test/[id]/results/page.tsx`, `training/page.tsx`.

## 9. `app/<landing>/page.tsx`
Model on `app/hesi-a2-practice-test/page.tsx`. Keep the structure: metadata (title with the
year, description, keywords, canonical, OG image `/og/<id>`), `WebApplication` + `Organization`
+ `FAQPage` JSON-LD, `<ExamLandingBreadcrumbs examId>`, hero with `shots` at
`/landing/<id>-mobile.png` and `/landing/<id>-desktop.png`, How It Works, blueprint list with
weights (per-test count x 2), `getTigerAsset("<id>", 1)`, We Just Launched, four study tips, five
FAQs whose JSX text matches the JSON-LD text exactly, `<ExamRelatedTests examId>`, final CTA.
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
(`playwright` must be resolvable by node; install it in a scratch folder if it is not in
node_modules. Chromium is preinstalled in cloud sessions.)

## 12. Mascots (optional, later)
`lib/tigerAssets.ts` lists exams with finished art under `public/tigers/<id>/`. New exams fall
back to the DMV tiger automatically; add the id only once eight expressions exist.

## 13. Verify before committing
```bash
npx tsc --noEmit -p .
npm run lint          # zero errors
npm run build
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3123/<landing>
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3123/og/<id>
curl -s http://localhost:3123/sitemaps/exams | grep -c "<landing>"
```
