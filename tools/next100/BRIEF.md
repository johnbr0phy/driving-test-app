# Builder brief: one exam for the next-100 wave

You build ONE practice exam for Tigertest. Up to ten builders work at once in the same checkout,
`/home/user/driving-test-app` (branch `next100-eu1`), each on a different exam. The integrator
applies shared-file changes, builds, screenshots and commits. Your exam's row is in the table at the
bottom of this file and in `tools/next100/QUEUE.md`.

## Read first
- `.claude/skills/exam-bank/SKILL.md` (house style; it applies to v2 items too) and
  `.claude/skills/exam-bank/references/wiring.md`.
- `CLAUDE.md`: the section for your engine (v1 "Additional Exams" or "v2 exams") and the bullet of
  your template exam.
- Your template exam, end to end (its `tools/` folder, `WIRING.md`, data, config, bank module,
  `app/` wrappers and landing). Copy its structure; do not invent a new one.

## Facts come from official sources
Load web search with ToolSearch (`select:WebSearch`, and `select:WebFetch` if listed) and confirm
the real exam's current format before writing anything: who runs it, number of questions, time,
sections and their weights, marking (negative marking, pass or qualifying marks), languages, and the
latest notification or syllabus. Prefer the exam body's own site, notification PDF or syllabus.
Record every source with its URL and the date you checked it in `tools/next100/<id>/sources.md`.
If a figure cannot be confirmed, leave it out or label it ("guides say", "Tigertest's target").
Never assert one state's or one year's rule as permanent; date-stamp anything that changes yearly.
Questions are original. Never copy a past paper, an official sample, or a commercial app's items,
even when they are easy to find.

## You write ONLY these files
- `tools/next100/<id>/`: `spec.json` (or the template's equivalent), `sources.md`, the question
  sources (Python data, one file per domain or category), `build.py`, `WIRING.md`
- the bank: v1 `data/<name>-questions.json`; v2 `data/v2/<id>/questions.json`
- v1: `lib/banks/<id>.ts`; v2: `lib/v2/exams/<id>.ts` and `lib/v2/banks/<id>.ts`
- `app/<slug>/*` wrappers copied from the template, with ids and names replaced
- `app/<landing>/page.tsx`, rewritten for this exam

Do NOT edit any shared file (`lib/exams.ts`, `lib/region.ts`, `lib/testCatalog.ts`,
`lib/examFacts.ts`, `lib/v2/registry.ts`, `lib/v2/bankSizes.ts`, `lib/server/*`, `types/index.ts`,
`i18n/*`, `app/globals.css`, `lib/banks/all.ts`, components, `CLAUDE.md`, `next.config.ts`). Put
every shared change in your `WIRING.md` as paste-ready blocks, in the same sections as the template's
`WIRING.md`, including: the config/registry lines, types and i18n (v1), bankSizes (v2), the
`classQuestions.ts` / `mcpV2Practice.ts` imports (v2), the globals.css block with the hue below,
the testCatalog blurb, org, hub group, search aliases, the TEST_REGIONS line, the examFacts entry,
TEACHER_LED / TEACHES lines if a teacher or coaching class would set it, and the CLAUDE.md bullet.

Do not run git, `npm install`, `next build` or `next dev` (the integrator does). You may run
`npx tsc --noEmit -p .` only if no other builder is likely to be mid-edit; prefer checking your own
files by reading them.

## Rules
- v1: follow the template's spec rules (pools sum to 200, `testCount x perTest <= pool`, sets of
  at most 60, 8 to 12 dashboard steps, category keys prefixed and grepped against `types/index.ts`).
  Validate with `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py <file> --pool k=n ...`
  until it prints PASS.
- v2: about 200 to 240 items, two practice tests when the real length allows (Test 2 held out of
  the drills), 5 to 9 drills, domain keys prefixed with your id. Build with your own
  `tools/next100/<id>/build.py` (keys authored first, options shuffled by a stem seed, as in the
  template) and validate with `python3 -I tools/validate_v2_bank.py <id> '<plan>'` until it reports
  0 problems. Report the share of items whose key is strictly the longest option; keep it under 25%.
  If the template's build writes `lib/v2/bankSizes.ts` or another shared file, write the line into
  `WIRING.md` instead and revert nothing else.
- If the real exam is far longer than is useful (150+ items), model it at a shorter length at the
  real pace and say so in the config's `scoreNote` and on the landing.
- No em-dashes anywhere. The brand is "Tigertest". Use the country's spelling and units. Plain
  apostrophes in metadata and JSON-LD, `&apos;` in JSX text. No money figures, no named officeholders,
  no current-affairs items that date within a year.
- The landing mirrors the template's: metadata with the year, JSON-LD, hero with screenshot paths
  `/landing/<id>-mobile.png` and `/landing/<id>-desktop.png`, `ExamFacts`, how it works, the blueprint,
  tips, five FAQs (JSX text identical to the JSON-LD), `ExamRelatedTests`, the CTA. Every fact about
  the real exam matches `sources.md`; say "not affiliated with <body>".

## Finish
Print the validator output, the key-longest share, the list of files you wrote, and any decision
the integrator should check (a hue clash, a fact you could not confirm, a region question). Keep it
short.

## Lessons from batch 1 (apply them)
- Positional options must not shuffle: the app shuffles v2 options unless `lockedOrder: true`.
  Error spotting (parts in sentence order, then "No error"), sentence improvement ("No improvement"
  last), Only I / Only II / Both / Neither / Either, inequality and syllogism conclusion sets, and
  all-number options (sorted ascending) get natural order plus `lockedOrder` in build.py. See
  `tools/next100/sscgd/build.py`. A plain count answer "None" is fine to shuffle.
- Sorted number options: when all options are numbers they are sorted and locked, so write
  distractors so the key is sometimes the smallest or largest value (an overshooting error, an
  undershooting error). Across the bank the key should sit in an end slot about as often as chance
  (4 options about half the time, 5 options about 40%); otherwise test-wise candidates drop the ends.
- Key-first, then sort: author every item's key as the first option and let build.py move it. If
  the build sorts all-number options, it must find the key's value after sorting. One batch-2
  bank wrote numeric options already ascending, so the smallest value was marked correct on 12
  items. Before you finish, check each all-number item: the marked key must equal the value the
  explanation arrives at.
- `tools/validate_v2_bank.py` rewrites `lib/v2/bankSizes.ts`. Run it from a /tmp copy with that
  write stubbed out; put your bankSizes line in WIRING.md.
- Duplicates: grep EVERY existing bank of your family (all India banks: ssccgl, rrbntpc, ibpspo,
  ctet, rrbgroupd, sscgd, sscchsl, sscmts, uppolice, ibpsclerk, jnvst; all AP/US school banks:
  appsych, sat, act, psat, ged) and rewrite any item with the same fact and answer or the same
  numbers. Batch 1 reviewers rewrote about 200 such items; do it while writing.
- Official PDFs often load by direct URL when the HTML site does not (ssc.gov.in/api/attachment/...,
  state government mirrors on s3waas.gov.in, newspaper copies of the notification PDF). Try them
  before falling back to guides, and label anything from guides.
- Hues: suggest one; the integrator settles clashes (rule: within 8 degrees of another theme,
  differ by 15 points of saturation or 8 of lightness; lightness 30 to 48%).

## Lessons from batches 2 and 3 (apply them too)
- Every item that reads a shared passage, cloze passage, table or puzzle must carry `stimulusId`
  (and `caseStep`/order as the template does). One batch-1 bank left cloze blanks without it, so a
  passage was never shown. Check: no stem says "blank (n)", "the passage" or "the table" without one.
- The wheel of theme hues is crowded (360 themes). Suggest a hue, but the integrator picks the final
  one and writes it into both `app/globals.css` and your config. Reviewers never change the theme.
- Batch 3's dedupe pass still found 33 repeats after per-bank reviews: favourite textbook numbers
  (8-15-17, 5-12-13, x - 1/x, 30% up 10% off, A and B fill/empty a tank) and favourite facts recur.
  Pick less common numbers and facts from the start, and grep your numbers against the family.

## Lessons from batch 4 (apply them too)
- Builders working on the same syllabus at the same time keep landing on each other's replacements.
  In this batch the four JAMB subjects share nothing with each other, but the five Nigeria v1 banks
  (police, CDCFIB, army, customs) share GK, English and maths: before writing, each picks a lane
  (see the notes) and greps the others' files on disk as it goes.
- Official notices often load from a CDN or mirror when the body's site does not (NTA's s3waas
  mirror, digitaloceanspaces CDNs, Scribd copies of the PDF). Try those before falling back to
  guides, and label guide-only figures.
- Run the hue checker yourself (rule in "Lessons from batch 1"); white text on the brand must be at
  least 4.5:1, so a lightness above about 42% usually fails.

## EU batch 1: English-language driving theory tests

Ten EU driving theory tests that the national authority offers in English (Malta's is in English
by default). All v1, template `tools/next100/pkdrive` (a v1 driving test that also opened a new
Tigertest region; its landing renders `ExamSampleQuestions`). Each is a new Tigertest region with
its own country homepage, which the integrator wires (follow how `PK` was added); you only write
your `WIRING.md` lines for it (region code, name, `inName`, hreflang tag `en-XX`, home title,
description and lead, `faqsFor` entries).

| id | Test | Region | idBase | stateCode | prefix | slug | landing | suggested hue |
|---|---|---|---|---|---|---|---|---|
| esdgt | Spain DGT theory exam, permiso B (in English) | ES | 13700 | ESDGT | ESDGT- | /spain-driving-theory | /spain-driving-theory-test | 45 80% 34% |
| ptimt | Portugal IMT theory exam (código), category B | PT | 13800 | PTIMT | PTIMT- | /portugal-driving-theory | /portugal-driving-theory-test | 140 55% 28% |
| rodrpciv | Romania DRPCIV theory exam, category B | RO | 13900 | RODRPCIV | RODRP- | /romania-driving-theory | /romania-driving-theory-test | 215 70% 32% |
| setrafik | Sweden Trafikverket knowledge test, B | SE | 14000 | SETRAFIK | SETRF- | /sweden-driving-theory | /sweden-driving-theory-test | 205 75% 34% |
| grdriving | Greece driving theory test, category B | GR | 14100 | GRDRIVE | GRDRV- | /greece-driving-theory | /greece-driving-theory-test | 210 60% 40% |
| dkteori | Denmark theory test (teoriprøve), category B | DK | 14200 | DKTEORI | DKTEO- | /denmark-driving-theory | /denmark-driving-theory-test | 355 70% 38% |
| hukresz | Hungary KRESZ theory exam, category B | HU | 14300 | HUKRESZ | HUKRZ- | /hungary-driving-theory | /hungary-kresz-test | 120 45% 30% |
| bedriving | Belgium driving theory exam, category B | BE | 14400 | BEDRIVE | BEDRV- | /belgium-driving-theory | /belgium-driving-theory-test | 48 85% 38% |
| fitheory | Finland driving theory test, category B | FI | 14500 | FITHEORY | FITHE- | /finland-driving-theory | /finland-driving-theory-test | 220 55% 36% |
| mttheory | Malta driving theory test, category B | MT | 14600 | MTTHEORY | MTTHE- | /malta-driving-theory | /malta-driving-theory-test | 0 65% 40% |

Notes for every EU builder:
- Confirm from the national authority (DGT, IMT, DRPCIV/DGPCI, Trafikverket, Greek Ministry of Infrastructure and Transport, Færdselsstyrelsen, KAV/KKK, GOCA/the regions in Belgium, Traficom/Ajovarma, Transport Malta) the current format: number of questions, time, pass mark, scoring (Hungary and Belgium use points; Denmark is picture-based), that English is offered, and any 2025-2026 rule changes. Record each with URL and date in sources.md; label anything from guides.
- Rules are that country's own (Highway Code / road traffic act as in force Nov 2026), in its units (km/h, metres), right-hand traffic except Malta (left). EU-harmonised signs (Vienna Convention) but the country's own variants; signs described in words, no images. No fines, fees or demerit point amounts that change; alcohol limits only where stated in current law and labelled with the country's own figure (several have lower novice limits).
- Write in British English (EU English usage), but the test's own terms where a candidate meets them (e.g. Spain's "permiso B", Portugal's "Código da Estrada"), glossed once.
- Copy says the test is offered in English and lists the other languages offered; never implies affiliation with the authority. Picture or video parts (hazard perception, Denmark's photo questions) are not modelled and the landing says so.
- Region pages: write the home copy blocks in WIRING.md in the same shape as PK's (`REGION_HOME`, `faqsFor`, hreflang). The integrator adds the routes, middleware country mapping (ISO code to region) and sitemap lines.
- The EU family is new: grep each other's banks on disk while writing (all ten share the same harmonised rules, so near-identical items are likely; vary wording, numbers and scenarios, and keep each bank to its own country's rule details).


## Native-language batch (LANGUAGES.md phase 1)

Exams whose own language is not English, on the platform built in phase 0 (`tools/next100/LANGUAGES.md`).
- A native exam (detheorie) is written directly in its language from the official law and
  manuals; never draft in English and translate. A translation of an existing English exam
  (esdgt `es`, ptimt `pt`) keeps every questionId, category, key and option order and may reword
  stems for idiom.
- Write `tools/next100/<id>/glossary.md` (the authority's terms) and, in `WIRING.md`, the config
  fields: `language`, `locale`, `english` (name, shortName, fullName), `review`, and for a
  translation the `translations.<lang>` block with `locale` and `landingPath` (and `shortName` if it
  differs). The landing is the three-line `TranslatedExamLanding` wrapper (`samples`, `related`).
- Validate with `validate_bank.py --lang <lang>` (a native bank) or
  `validate_translation.py <base> <translation> --lang <lang>` (a translation).
- Typography as in LANGUAGES.md 5.1; same house rules as every bank.
