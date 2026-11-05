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
These format facts go in `sources.md`, the landing, the FAQ and `lib/examFacts.ts`, never into the
bank. No question may ask about the test itself (question count, pass mark, wrong answers allowed,
time, languages, booking, test centre, retakes, how long a pass is valid, who writes the questions,
age to sit it): no real test asks them. A licence or law category is filled with rules a driver or
holder lives by (learner and probation limits, alcohol limits, documents), not exam admin; if the
handbook has too few such rules, shrink the category. `validate_bank.py` fails these stems.
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

## Next-20 batch A: US licensing exams people pay for (Nov 2026)

Chosen for who pays: adults in the US whose job or licence depends on the exam, with a real exam
fee and retake cost, who already buy prep. All v1 (the stats page sells Premium on v1 exams), region
US. Branch `next20-batch-a`. Templates: finance exams copy `tools/next30/series7` (and its
`app/series-7`, `app/series-7-practice-test`); healthcare and social work copy `tools/next30/rbt`;
teacher exams copy `tools/next100/phlet`. Each template has a `WIRING.md`: write yours in the same
sections.

| id | Test | idBase | stateCode | prefix | slug | landing | hue |
|---|---|---|---|---|---|---|---|
| cpafar | CPA Exam FAR (Financial Accounting and Reporting), multiple choice only | 14900 | CPAFAR | CPAFAR- | /cpa-far | /cpa-far-practice-test | 150 45% 38% |
| cpareg | CPA Exam REG (Taxation and Regulation), multiple choice only | 15000 | CPAREG | CPAREG- | /cpa-reg | /cpa-reg-practice-test | 170 40% 38% |
| nmls | NMLS SAFE Mortgage Loan Originator Test (national component with Uniform State Content) | 15100 | NMLS | NMLS- | /nmls | /nmls-safe-practice-test | 45 55% 42% |
| series65 | FINRA/NASAA Series 65 (Uniform Investment Adviser Law Exam) | 15200 | SERIES65 | S65- | /series-65 | /series-65-practice-test | 161 45% 38% |
| series63 | Series 63 (Uniform Securities Agent State Law Exam) | 15300 | SERIES63 | S63- | /series-63 | /series-63-practice-test | 203 25% 42% |
| aswb | ASWB Masters exam (social work licensing) | 15400 | ASWB | ASWB- | /aswb-masters | /aswb-masters-practice-test | 290 35% 42% |
| arrt | ARRT Radiography certification exam | 15500 | ARRT | ARRT- | /arrt-radiography | /arrt-radiography-practice-test | 186 90% 34% |
| nce | NBCC National Counselor Examination (NCE) | 15600 | NCE | NCE- | /nce | /nce-practice-test | 265 20% 40% |
| texesppr | TExES Pedagogy and Professional Responsibilities EC-12 (160) | 15700 | TEXESPPR | TXPPR- | /texes-ppr | /texes-ppr-practice-test | 352 40% 38% |
| praxisplt | Praxis Principles of Learning and Teaching: Grades K-6 (5622) | 15800 | PRAXISPLT | PLT- | /praxis-plt | /praxis-plt-practice-test | 51 80% 38% |

Notes for every batch A builder:
- The hue above is already checked against every theme; use it as given.
- Money: amounts inside a worked problem (an accounting entry, a loan payment, a tax computation)
  are fine. Exam fees, prices, and yearly indexed figures (tax brackets, standard deduction,
  contribution limits, gift exclusion, conforming loan limits) are not, unless the item names the
  year and `sources.md` cites the official figure. Prefer rules that do not change each year.
- Model the real blueprint's content areas and weights from the exam body's current outline (AICPA
  Blueprints 2026 for FAR/REG; NMLS SAFE content outline; NASAA Series 63/65 outlines; ASWB Masters
  content outline; ARRT Radiography content specifications (2027 changes are noted on the landing if
  announced); NBCC NCE content; TEA TExES 160 framework; ETS 5622 test at a glance). Constructed
  responses, task-based simulations and image items are not modelled; the landing says so.
- Images: ARRT items describe positioning, anatomy and image findings in words, never "see image".
- Lanes and duplicates: series63 and series65 both test the Uniform Securities Act; series65 also
  overlaps series7 and sie on products. Grep `data/series-7-questions.json`, `data/sie-questions.json`
  and each other's files as you write and use different scenarios and numbers. aswb and nce share
  ethics, DSM-5-TR and theory: grep each other. texesppr and praxisplt share pedagogy: grep each other
  and `data/v2/praxis`, `data/philippines-let-questions.json`, `data/v2/ctet`. cpafar and cpareg do
  not overlap (FAR has no tax; REG has no GAAP), and cpareg must not repeat `data/cca-questions.json`.
- Never name a commercial prep provider. Say "not affiliated with" the exam body on the landing.
- Teacher exams: TEACHER_LED is no (people self-study); exam prep programs may still set them, so
  add a TEACHES line only if the template does.

## Next-20 batch B: licensing and certification exams people pay for (Nov 2026)

Same rules as batch A (read that section too). All v1. Branch `next20-batch-b` (built on batch A,
so batch A's ten exams are on disk: grep them for duplicates). Templates now include batch A's own
folders, which carry the latest WIRING.md shape: finance and accounting copy `tools/next100/cpafar`
(and `app/cpa-far`, `app/cpa-far-practice-test`); healthcare copies `tools/next100/arrt`; licensing
copies `tools/next100/nmls`. Worldwide (GLOBAL) exams also follow `tools/global/gulfrn` for the
region lines; the UK exam follows `tools/intl/ukfood` (British spelling, region UK).

| id | Test | Region | idBase | stateCode | prefix | slug | landing | hue |
|---|---|---|---|---|---|---|---|---|
| cma | CMA (AAMA) Certified Medical Assistant exam | US | 15900 | CMA | CMA- | /cma-aama | /cma-aama-practice-test | 330 35% 32% |
| nhie | National Home Inspector Examination | US | 16000 | NHIE | NHIE- | /home-inspector | /home-inspector-exam-practice-test | 30 35% 28% |
| txadjuster | Texas All-Lines Adjuster exam (Pearson VUE) | US | 16100 | TXADJ | TXADJ- | /texas-adjuster | /texas-all-lines-adjuster-practice-test | 343 35% 32% |
| sfadmin | Salesforce Certified Platform Administrator | GLOBAL | 16200 | SFADMIN | SFADM- | /salesforce-admin | /salesforce-administrator-practice-test | 238 80% 28% |
| cfal1 | CFA Program Level I | GLOBAL | 16300 | CFAL1 | CFAL1- | /cfa-level-1 | /cfa-level-1-practice-test | 220 25% 26% |
| cpaaud | CPA Exam AUD (Auditing and Attestation), multiple choice only | US | 16400 | CPAAUD | CPAAUD- | /cpa-aud | /cpa-aud-practice-test | 152 15% 30% |
| accafa | ACCA Financial Accounting (FA) | GLOBAL | 16500 | ACCAFA | ACCAFA- | /acca-fa | /acca-fa-practice-test | 341 70% 38% |
| aatl2 | AAT Level 2 Foundation Certificate in Accounting | UK | 16600 | AATL2 | AATL2- | /aat-level-2 | /aat-level-2-practice-test | 270 25% 32% |
| nbdhe | National Board Dental Hygiene Examination | US | 16700 | NBDHE | NBDHE- | /nbdhe | /nbdhe-practice-test | 180 40% 26% |
| nptepta | NPTE for Physical Therapist Assistants | US | 16800 | NPTEPTA | PTA- | /npte-pta | /npte-pta-practice-test | 100 30% 26% |

Notes for every batch B builder:
- Hues above are already checked for white-text contrast (4.5:1) and against every theme; use as given.
- Real formats v1 cannot show: CFA Level I has 3 options (ours 4, say so); Salesforce "choose two"
  becomes single answer; NBDHE case-based items and NPTE-PTA scenarios become text scenarios; CPA AUD
  simulations not modelled. Say each on the landing.
- Never name a commercial prep provider. Say "not affiliated with" the exam body on the landing.
- Lanes and duplicates: cpaaud must not repeat cpafar or cpareg; accafa, aatl2 and cpafar share
  bookkeeping basics (grep each other: accafa is IFRS and UK/international terms, aatl2 UK bookkeeping
  and costing, cpafar US GAAP); cfal1 overlaps series65, series7, sie, cpafar on ethics, quant,
  equity and fixed income (grep them); cma overlaps ccma, phlebotomy, cet, cna (grep them); nbdhe
  overlaps danb; nptepta overlaps nasm-cpt and the healthcare banks; txadjuster overlaps
  property-casualty, property-casualty-tx and life-health-tx; nhie has no close family but grep
  journeyman-electrician and osha.
- Region GLOBAL or UK needs the TEST_REGIONS line in WIRING.md; US is the default.

## Next-20 batch C: more paid licensing and certification exams (Nov 2026)

Same rules as batches A and B (read both sections). All v1. Branch `next20-batch-c` (from main,
which has batches A and B wired: grep their banks for duplicates). Templates: copy the nearest batch
A/B folder and its `WIRING.md` shape: social work and health `tools/next100/aswb` or `tools/next100/cma`;
coding `tools/next100/cca`; finance and insurance `tools/next100/txadjuster` or `tools/next100/series65`;
teacher exams `tools/next100/praxisplt`; IT and business `tools/next100/sfadmin` (GLOBAL region lines);
the Canadian exam follows `tools/next30/pcoc` for region CA; the UK exam `tools/next100/aatl2` for region UK.

| id | Test | Region | idBase | stateCode | prefix | slug | landing | hue |
|---|---|---|---|---|---|---|---|---|
| aswbclin | ASWB Clinical exam (LCSW) | US | 16900 | ASWBCLIN | ASWBCLIN- | /aswb-clinical | /aswb-clinical-practice-test | 300 20% 34% |
| phr | HRCI Professional in Human Resources (PHR) | US | 17000 | PHR | PHR- | /phr | /phr-practice-test | 200 45% 28% |
| cisa | ISACA Certified Information Systems Auditor (CISA) | GLOBAL | 17100 | CISA | CISA- | /cisa | /cisa-practice-test | 250 20% 32% |
| cssgb | ASQ Certified Six Sigma Green Belt (CSSGB) | GLOBAL | 17200 | CSSGB | CSSGB- | /six-sigma-green-belt | /six-sigma-green-belt-practice-test | 14 50% 26% |
| ccs | AHIMA Certified Coding Specialist (CCS), multiple choice only | US | 17300 | CCS | CCS- | /ccs | /ccs-practice-test | 193 30% 26% |
| rdexam | CDR Registration Examination for Dietitians (RD exam) | US | 17400 | RDEXAM | RDEXAM- | /registered-dietitian | /registered-dietitian-exam-practice-test | 91 20% 26% |
| praxis5001 | Praxis Elementary Education: Multiple Subjects (5001) | US | 17500 | PX5001 | PX5001- | /praxis-elementary | /praxis-elementary-education-practice-test | 39 40% 26% |
| fladjuster | Florida 6-20 All-Lines Adjuster exam | US | 17600 | FLADJ | FLADJ- | /florida-adjuster | /florida-6-20-adjuster-practice-test | 320 30% 30% |
| llqp | Life Licence Qualification Program (LLQP) exam, Canada | CA | 17700 | LLQP | LLQP- | /llqp | /llqp-practice-test | 5 45% 28% |
| cemap | CeMAP 1 (LIBF), UK financial regulation for mortgage advisers | UK | 17800 | CEMAP | CEMAP- | /cemap | /cemap-1-practice-test | 203 30% 26% |

Notes for every batch C builder:
- Hues above are checked for white-text contrast (4.5:1) and against every theme; use as given.
- Lanes and duplicates: aswbclin vs `data/aswb-masters-questions.json` and `data/nce-questions.json`
  (clinical assessment, diagnosis and treatment, not repeats of Masters items); ccs vs `data/cca-questions.json`
  and `data/cpc-questions.json` (CCS is inpatient and outpatient coding at a higher level, concepts only,
  no code-book lookups); praxis5001 vs `data/praxis-plt-questions.json`, `data/texes-ppr-questions.json`,
  `data/v2/praxis` (5001 is content knowledge: reading and language arts, maths, social studies, science);
  fladjuster vs `data/texas-adjuster-questions.json` and `data/property-casualty-questions.json` and the
  FL P&C variant (Florida law is the difference); llqp vs `data/life-health-questions.json` (Canadian law
  and products, segregated funds, CLHIA guidelines); cemap vs `data/aat-level-2-questions.json` and the UK
  banks (FCA regulation, MCOB, Consumer Duty); cisa vs `data/v2/cissp`, `data/v2/secplus`, `data/cpa-aud-questions.json`;
  cssgb and phr have no close family, but grep `data/v2/pmp`, `data/v2/capm` and `data/cpa-reg-questions.json`.
- Never name a commercial prep provider; say "not affiliated with" the exam body on the landing.
- Region GLOBAL, CA or UK needs the TEST_REGIONS line in WIRING.md; US is the default.

## International batch 1: thin countries, English-language exams people pay for (Nov 2026)

Same rules as batches A to C (read them). All v1. Branch `intl-batch-1` (from main). Goal: give
countries that have only one Tigertest test their first non-driving or second driving test.
Templates: driving theory tests copy `tools/next100/pkdrive` (or `tools/countries/sgbtt` for
Singapore, `tools/countries/hkdrive` for Hong Kong, `tools/next30/iedtt` for Ireland); licensing and
insurance copy `tools/next100/llqp` (non-US region) and its `WIRING.md` shape; security copy
`tools/next100/txadjuster` for law items. Every exam here has a non-US region, so `WIRING.md` needs
its TEST_REGIONS line, its `NON_DRIVING_TESTS` line when it is not a driving test, and a hub group:
put it in the country's existing driving group only if it is a driving test, otherwise a new group
named in WIRING.md ("Singapore licensing exams", "Hong Kong insurance and securities exams", "New
Zealand licences", "UAE licensing exams", "Malaysia insurance exams", "Kenya licensing exams").

| id | Test | Region | idBase | stateCode | prefix | slug | landing | hue |
|---|---|---|---|---|---|---|---|---|
| sgftt | Singapore Final Theory Test (FTT), class 3/3A | SG | 17900 | SGFTT | SGFTT- | /singapore-ftt | /singapore-ftt-practice-test | 0 70% 22% |
| sgres | Singapore Real Estate Salesperson (RES) exam | SG | 18000 | SGRES | SGRES- | /singapore-res | /singapore-res-exam-practice-test | 350 70% 22% |
| hkiiqe1 | Hong Kong IIQE Paper 1, Principles and Practice of Insurance | HK | 18100 | HKIIQE1 | HKIIQE1- | /iiqe-paper-1 | /iiqe-paper-1-practice-test | 215 70% 22% |
| hklesfi1 | Hong Kong LE Paper 1, Fundamentals of Securities and Futures Regulation | HK | 18200 | HKLE1 | HKLE1- | /le-paper-1 | /le-paper-1-practice-test | 275 70% 22% |
| nzfirearms | New Zealand firearms licence safety test | NZ | 18300 | NZFIREARMS | NZFA- | /nz-firearms-licence | /nz-firearms-licence-practice-test | 30 55% 22% |
| nzlcq | New Zealand Licence Controller Qualification (duty manager) | NZ | 18400 | NZLCQ | NZLCQ- | /lcq | /lcq-practice-test | 340 70% 22% |
| aesira | UAE SIRA security guard licensing exam (Dubai) | AE | 18500 | AESIRA | AESIRA- | /sira-security | /sira-security-guard-practice-test | 220 55% 22% |
| mypce | Malaysia Pre-Contract Examination for insurance agents (PCE) | MY | 18600 | MYPCE | MYPCE- | /malaysia-pce | /pce-exam-practice-test | 230 25% 22% |
| kenck | Nursing Council of Kenya licensure exam (registered nurse) | KE | 18700 | KENCK | KENCK- | /kenya-nursing-council | /nursing-council-of-kenya-exam-practice-test | 160 55% 22% |
| iedttcv | Ireland Driver Theory Test, truck and bus (categories C and D) | IE | 18800 | IEDTTCV | IEDTTCV- | /ireland-truck-bus-theory | /ireland-truck-bus-theory-test | 140 70% 22% |

Notes for every international batch 1 builder:
- Hues above are checked for white-text contrast and clashes; use as given.
- Lanes and duplicates: sgftt vs `data/singapore-btt-questions.json` (FTT is Part C, expressways,
  defensive driving, the rules BTT leaves out; no repeats); iedttcv vs
  `data/ireland-driver-theory-questions.json` (heavy vehicle rules: tachographs, weights, braking,
  load security, passengers); hkiiqe1 vs `data/hong-kong-driving-questions.json` only by style and
  vs `data/property-casualty-questions.json` and `data/llqp-questions.json` (Hong Kong law: Insurance
  Ordinance, IA, conduct requirements); hklesfi1 vs `data/v2/sie` / `data/sie-questions.json` (SFO,
  SFC, HKEX rules, not US); mypce vs `data/llqp-questions.json`, `data/life-health-questions.json`
  (Malaysian law: Financial Services Act 2013, BNM, MII syllabus; general and life parts);
  aesira vs `data/security-guard-questions.json` and `data/ontario-security-guard-questions.json`
  (Dubai law and SIRA rules); kenck vs NCLEX and `data/v2/gulfrn` (Kenyan practice and law,
  NCK scope, Kenyan public health priorities, Kenyan drug names where they differ); nzlcq vs
  `data/alcohol-server-questions.json` and `data/au-rsa-questions.json` (Sale and Supply of Alcohol
  Act 2012, host responsibility, duty manager duties); nzfirearms vs `data/canadian-firearms-questions.json`
  and `data/hunter-questions.json` (NZ Arms Code, Arms Act as amended 2020 and later, the seven
  firearms safety rules as NZ Police states them); sgres vs `data/real-estate-questions.json`
  (Singapore law: Estate Agents Act, CEA, HDB and URA rules, stamp duty concepts without rates).
- Educational safety content only for nzfirearms (no modification or acquisition workarounds).
- Never name a commercial prep provider; say "not affiliated with" the exam body on the landing.
- If an exam's official format (count, pass mark) cannot be confirmed, use a Tigertest target and say
  so in sources.md, the landing and examFacts, as `zak53` does.

## International batch 2: Philippines licensure, insurance and uniformed-service exams (Nov 2026)

Same rules as batches A to C and international batch 1 (read them). All v1. Branch `intl-batch-1`
(international batch 1 is wired there: grep its banks for duplicates). Goal: take the Philippines
(region PH, which has `phlto`, `phcse` and `phlet`) towards 20 tests with the English-language PRC
board exams, the Insurance Commission agent exam and the police and military entrance tests people
and review centres pay for. Templates: PRC board exams copy `tools/next100/phlet` (region PH, PRC
format, its `WIRING.md` shape); NAPOLCOM and AFPSAT copy `tools/next100/ngpolice` (recruitment
aptitude: English, maths, reasoning, general information) with `tools/next100/phcse` for Philippine
verbal and numerical items; insurance copies `tools/next100/llqp` or `tools/next100/mypce`; the real
estate broker exam copies `tools/next100/sgres`. Every exam here is region PH, so `WIRING.md` needs
its TEST_REGIONS line (`<id>: "PH"`) and its `NON_DRIVING_TESTS` line. Hub groups, all new, placed
after "Philippines government and licensure exams": "Philippines health board exams" (phnle,
phmedtech, phpharm, phmidwife, phpsychom), "Philippines police, military and criminology exams"
(phnapolcom, afpsat, phcle) and "Philippines insurance and real estate licences" (phinsurance,
phrebroker); say the group in WIRING.md. The PRC board exams and phcle are teacher-led (review
centres): add them to `TEACHER_LED`.

| id | Test | Region | idBase | stateCode | prefix | slug | landing | hue |
|---|---|---|---|---|---|---|---|---|
| phnapolcom | NAPOLCOM PNP Entrance Examination | PH | 18900 | PHNAPOLCOM | PHNAP- | /napolcom-exam | /napolcom-exam-reviewer-practice-test | 225 70% 20% |
| phcle | Criminologist Licensure Examination (PRC) | PH | 19000 | PHCLE | PHCLE- | /criminologist-licensure-exam | /criminology-board-exam-reviewer-practice-test | 350 50% 22% |
| phnle | Philippine Nurse Licensure Examination (PRC) | PH | 19100 | PHNLE | PHNLE- | /nurse-licensure-exam | /nle-reviewer-practice-test | 185 70% 22% |
| phinsurance | Insurance Commission licensing exam, traditional life agent | PH | 19200 | PHINS | PHINS- | /insurance-commission-exam | /insurance-commission-exam-reviewer-practice-test | 200 15% 22% |
| phpsychom | Psychometrician Licensure Examination (PRC) | PH | 19300 | PHPSYCHOM | PHPSY- | /psychometrician-board-exam | /psychometrician-board-exam-reviewer-practice-test | 265 70% 22% |
| phmedtech | Medical Technologist Licensure Examination (PRC) | PH | 19400 | PHMEDTECH | PHMT- | /medtech-board-exam | /medtech-board-exam-reviewer-practice-test | 170 70% 22% |
| phpharm | Pharmacist Licensure Examination (PRC) | PH | 19500 | PHPHARM | PHRPH- | /pharmacist-board-exam | /pharmacist-board-exam-reviewer-practice-test | 140 20% 22% |
| afpsat | AFP Service Aptitude Test (AFPSAT) | PH | 19600 | AFPSAT | AFPSAT- | /afpsat | /afpsat-reviewer-practice-test | 85 70% 20% |
| phmidwife | Midwife Licensure Examination (PRC) | PH | 19700 | PHMIDWIFE | PHMW- | /midwife-board-exam | /midwife-board-exam-reviewer-practice-test | 330 70% 22% |
| phrebroker | Real Estate Broker Licensure Examination (PRC) | PH | 19800 | PHREB | PHREB- | /real-estate-broker-exam-philippines | /real-estate-broker-board-exam-reviewer-practice-test | 30 70% 22% |

Notes for every international batch 2 builder:
- Hues above were checked with a script against every `[data-theme]` `--brand` in `app/globals.css`
  and every hue in this file (white-text contrast 4.5:1 or better; nothing within 8 degrees unless
  saturation differs by 15 or lightness by 8); use as given. idBases 18900 to 19800 are free in
  `lib/exams.ts` and `lib/v2`; slugs and landings are free in `app/`.
- PRC board exams (phcle, phnle, phpsychom, phmedtech, phpharm, phmidwife, phrebroker): each is several
  subjects of 100 items (or a stated count) over two or three days, passing on a general average of 75%
  with a per-subject floor set by each board's resolution. Blueprint the 200 items by the board's
  current table of specifications (cite the PRC Board Resolution in sources.md), model the general
  average only, and say on the landing that the subject floor is not modelled, as `phlet` does. Use
  Philippine law and practice: the board's own law (R.A. 11131 Criminology, R.A. 9173 Nursing, R.A.
  10029 Psychology, R.A. 5527 as amended Medical Technology, R.A. 10918 Pharmacy, R.A. 7392 Midwifery,
  R.A. 9646 RESA), DOH programmes, the Philippine National Formulary, PhilHealth; generic drug names
  (R.A. 6675); pesos.
- phnapolcom and afpsat: aptitude tests whose official subject split and pass mark may not be
  published (guides report a 70% rating to pass the PNP Entrance, unconfirmed; AFPSAT cut-offs vary by
  branch). Where a figure cannot be confirmed, use a Tigertest target and say so in sources.md, the
  landing and examFacts, as `zak53` and `ngpolice` do. General information items are static facts (the
  1987 Constitution, R.A. 6975 and R.A. 8551 for the PNP, R.A. 7077 and the AFP's structure for
  afpsat); no current affairs, no office-holders, nothing about insurgencies or contested politics.
  English only (Filipino items, if any, follow `phlet`'s four-item pattern with English explanations).
- phinsurance: Insurance Code (P.D. 612 as amended by R.A. 10607), Insurance Commission circulars on
  agent licensing and conduct, traditional life products only (variable life is the separate VUL exam);
  no premium rates, fees or yearly limits.
- Lanes and duplicates: phnapolcom vs `data/nigeria-police-questions.json`, `data/police-exam-questions.json`
  and `data/v2/phcse` (Philippine police law and PNP structure; English, maths and reasoning items written
  fresh, no repeated stems or number sets); afpsat vs `data/v2/asvab`, `data/v2/phcse` and phnapolcom
  (write the two side by side and check each against the other); phcle vs phnapolcom,
  `data/police-exam-questions.json` and `data/security-guard-questions.json` (criminal law and
  jurisprudence under the Revised Penal Code, criminalistics, crime detection, sociology of crimes,
  correctional administration, law enforcement administration); phnle vs `data/v2/nclex`,
  `data/v2/nclexpn`, `data/gulf-nursing-questions.json` and `data/kenya-nursing-council-questions.json`
  (Philippine nursing law, DOH programmes, community health nursing in the Philippine setting; no repeated
  vignettes); phmedtech vs `data/phlebotomy-questions.json` and `data/htl-questions.json` (clinical
  chemistry, microbiology and parasitology, hematology, blood banking and immunoserology, clinical
  microscopy, histopathology and MT laws); phpharm vs `data/ptcb-questions.json` (Philippine pharmacy law,
  FDA Philippines, pharmacognosy, pharmaceutical chemistry, pharmacology, pharmaceutics, hospital and
  dispensing); phmidwife vs phnle, `data/v2/nclex` and `data/cna-questions.json` (midwifery practice,
  maternal and newborn care, family planning, primary health care); phpsychom vs `data/v2/appsych`,
  `data/rbt-questions.json` and `data/nce-questions.json` (theories of personality, abnormal psychology,
  industrial/organizational psychology, psychological assessment, R.A. 10029 and its code of ethics);
  phinsurance vs `data/life-health-questions.json`, `data/llqp-questions.json` and
  `data/malaysia-pce-questions.json`; phrebroker vs `data/real-estate-questions.json`,
  `data/singapore-res-questions.json` and the real estate state variants (Philippine law: RESA, Civil
  Code on property, P.D. 957, Maceda Law R.A. 6552, the Torrens system, Philippine valuation standards;
  no tax or fee rates).
- Never name a commercial review centre or prep provider; say "not affiliated with" the PRC, NAPOLCOM,
  the AFP or the Insurance Commission on the landing.
- US spelling (license, center) and pesos, as used in the Philippines and in `phlto`.

## International batch 3: Pakistan recruitment and licensing, South Africa licensing and police (Nov 2026)

Same rules as batches A to C and international batches 1 and 2 (read them). All v1. Branch
`intl-batch-1` (international batches 1 and 2 are wired there: grep their banks for duplicates). Goal:
give Pakistan (region PK, which has only `pkdrive`) and South Africa (region ZA, which has `zak53` and
`zak53c3`) the English-language tests their adults pay for or train for in a class. Pakistan takes the
three v1 tests queued in QUEUE.md batch 6 (ppsc, punjabpolice, pakarmy; the v2 ones, mdcat, nustnet,
ecat and cssmpt, wait for a v2 batch) plus the medical and nursing licensing exams and the PAF airman
test; South Africa takes the queued zare5 and zasaps plus the K53 motorcycle learner's and PSIRA.
Templates: recruitment and screening tests (ppsc, punjabpolice, pakarmy, pkpaf, zasaps) copy
`tools/next100/ngpolice` (aptitude: English, maths, reasoning, general knowledge) with
`tools/next100/ngarmy` for the military pair and `tools/next100/cdcfib` for a GK-heavy lane; licensing
exams copy `tools/next100/kenck` (pknle, pkpnmc: a non-US health licensing exam and its `WIRING.md`
shape); zare5 copies `tools/next100/llqp` (non-US financial regulation); zapsira copies
`tools/next100/aesira` (security guard, non-US law); zak53moto copies `tools/countries/zak53c3`
(the K53 learner's with a different vehicle code). Every exam has a non-US region, so `WIRING.md`
needs its TEST_REGIONS line (`<id>: "PK"` or `<id>: "ZA"`), its `NON_DRIVING_TESTS` line unless it
is zak53moto, and a hub group. zak53moto joins the existing "South Africa driving tests" group.
New groups, each placed after the country's driving group: "Pakistan government and police
recruitment tests" (ppsc, punjabpolice, pakarmy, pkpaf), "Pakistan medical and nursing licensing
exams" (pknle, pkpnmc), "South Africa financial services licensing exams" (zare5) and "South Africa
police and security tests" (zasaps, zapsira); say the group in WIRING.md. pknle, pkpnmc and zapsira
are teacher-led (medical colleges, nursing schools, PSIRA-accredited training centres): add them to
`TEACHER_LED`.

| id | Test | Region | idBase | stateCode | prefix | slug | landing | hue |
|---|---|---|---|---|---|---|---|---|
| ppsc | PPSC general ability and GK screening test (Punjab Public Service Commission) | PK | 19900 | PKPPSC | PPSC- | /ppsc | /ppsc-practice-test | 145 55% 18% |
| punjabpolice | Punjab Police Constable written test | PK | 20000 | PKPUNJPOL | PJPOL- | /punjab-police-constable | /punjab-police-constable-practice-test | 215 40% 18% |
| pakarmy | Pakistan Army soldier recruitment (initial) test | PK | 20100 | PKARMY | PKARMY- | /pak-army-test | /pak-army-initial-test-practice-test | 95 70% 18% |
| pknle | PMDC National Licensing Examination (NLE) | PK | 20200 | PKNLE | PKNLE- | /pmdc-nle | /pmdc-nle-practice-test | 175 55% 22% |
| pkpnmc | PNMC nursing licensing exam (registered nurse) | PK | 20300 | PKPNMC | PKPNMC- | /pnmc-licensing-exam | /pnmc-licensing-exam-practice-test | 320 70% 22% |
| pkpaf | PAF airman recruitment test (Pakistan Air Force) | PK | 20400 | PKPAF | PKPAF- | /paf-airman-test | /paf-airman-test-practice-test | 205 70% 18% |
| zare5 | RE5 regulatory exam for representatives (FAIS) | ZA | 20500 | ZARE5 | ZARE5- | /re5-exam | /re5-exam-practice-test | 40 55% 22% |
| zasaps | SAPS police trainee recruitment assessment | ZA | 20600 | ZASAPS | ZASAPS- | /saps-trainee-assessment | /saps-recruitment-test-practice-test | 230 55% 18% |
| zak53moto | K53 learner's licence test, Code 1 (motorcycle) | ZA | 20700 | ZAK53C1 | ZAC1- | /k53-motorcycle | /k53-motorcycle-learners-test | 25 40% 18% |
| zapsira | PSIRA security officer grade assessment (Grades E to C) | ZA | 20800 | ZAPSIRA | ZAPSIRA- | /psira-security | /psira-security-officer-practice-test | 270 55% 22% |

Notes for every international batch 3 builder:
- Hues above were checked with a script against every `[data-theme]` `--brand` in `app/globals.css`
  and every hue in this file not yet wired (white-text contrast 4.5:1 or better; nothing within 8
  degrees unless saturation differs by 15 or lightness by 8); use as given. idBases 19900 to 20800
  are free in `lib/exams.ts` and `lib/v2`; slugs and landings are free in `app/`.
- Formats: none of the Pakistan recruitment tests (ppsc, punjabpolice, pakarmy, pkpaf) or zasaps
  publishes a fixed syllabus split, count or pass mark for every sitting. Confirm what the commission
  or force publishes (PPSC's syllabus notes, the Punjab Police advertisement, joinpakarmy.gov.pk,
  joinpaf.gov.pk, the SAPS recruitment notice); where a figure cannot be confirmed, use a Tigertest
  target and say so in sources.md, the landing and examFacts, as `zak53` and `ngpolice` do. Ability
  sections of these tests that are figures only (non-verbal, spatial) are written as text patterns, as
  `jnvst` does, and the landing says so. zasaps: model only the written literacy, numeracy and
  reasoning part and say the psychometric personality assessment, fitness test and interview are not
  modelled; never write personality items.
- General knowledge (ppsc, punjabpolice, pakarmy, pkpaf) is static facts: the 1973 Constitution
  (structure, fundamental rights, institutions), Pakistan's geography, the Pakistan Movement to 1947
  as taught in Pakistan Studies, Islamic studies at the level the commissions set (the five pillars,
  the Prophet's life, basic terms, Quranic chapters by name; mainstream and non-sectarian, nothing on
  sect differences), everyday science and computers, world geography. No current affairs, no
  office-holders, no items on Kashmir, India-Pakistan conflicts, constitutional amendments of the
  last decade, the military's role in politics, blasphemy law, or any party; keep the Armed Forces
  items to structure, ranks, institutions and history to 1971 stated neutrally. English only (an Urdu
  item, if any, follows `uppolice`'s pattern with English explanations). Rupees and Pakistani names in
  word problems.
- pknle: PMDC's NLE as PMDC currently publishes it (Step 1 MCQs on clinical sciences for local and
  foreign graduates; confirm the blueprint and pass mark on pmdc.pk; the practical/OSCE step is not
  modelled). pkpnmc: PNMC's licensing exam for BSN and diploma graduates (confirm on pnmc.gov.pk).
  Both use Pakistani practice: the EPI schedule, national TB and hepatitis programmes, DRAP, generic
  drug names, Pakistani public health priorities, and the PMDC Act 2022 / PNMC Act 2023 where they
  name duties; no fees.
- zare5: the FSCA's RE5 for representatives under the FAIS Act 37 of 2002, the Determination of
  Qualifying Criteria (Board Notice 194 of 2017 and its amendments) and the Fit and Proper
  Requirements; FICA, POPIA, the Code of Conduct and complaints handling at the level the exam
  tests; confirm the current question count, time and pass mark with the FSCA or its exam
  administrator (guides report 50 questions in 2 hours, 65%); no rand thresholds or fees.
- zapsira: the PSIRA Grade E, D and C officer training as the Private Security Industry Regulation Act
  56 of 2001 and the Code of Conduct (2003) set it: legal powers (Criminal Procedure Act 51 of 1977,
  section 49 use of force stated as the law reads, arrest by a private person), access control,
  patrols, incident reports, first response, Occupational Health and Safety Act 85 of 1993; graded
  sets (one per grade). Training centres set the papers, so the pass mark is a Tigertest target.
  No weapons handling or firearm content (that is the separate firearm competency course).
- zak53moto: the K53 learner's licence for Code 1 (motorcycle, motor tricycle or quadricycle), same
  rules-signs-controls split as `zak53` (22/22/6 per test); the controls part is motorcycle controls
  (clutch lever, front brake lever, gear lever, kill switch). Learner rules for Code A1/A (helmet,
  daylight, no pillion) from the National Road Traffic Regulations.
- Lanes and duplicates: zak53moto vs `data/south-africa-k53-questions.json` and
  `data/south-africa-k53-code-3-questions.json` (no shared stem: signs reworded to a motorcyclist's
  situation, rules items on lane position, filtering and visibility); ppsc vs punjabpolice, pakarmy,
  pkpaf, `data/pakistan-driving-questions.json`, `data/nigeria-police-questions.json` and
  `data/v2/phcse` (write the four Pakistan recruitment banks side by side, give each a GK lane: ppsc
  Pakistan Studies, Constitution and world GK; punjabpolice Punjab's geography and districts, policing
  and the Police Order 2002, criminal law basics under the PPC and CrPC; pakarmy and pkpaf the Armed
  Forces, everyday science and maths, pakarmy with Army history and pkpaf with aviation and physics
  basics; no repeated stems or number sets); pakarmy and pkpaf vs `data/nigerian-army-questions.json`,
  `data/afpsat-questions.json` and `data/v2/asvab`; pknle vs `data/kenya-nursing-council-questions.json`,
  `data/v2/nclex`, `data/v2/uknmc` and `data/philippines-nle-questions.json` (doctor's level, not
  nursing; no repeated vignettes); pkpnmc vs `data/kenya-nursing-council-questions.json`,
  `data/philippines-nle-questions.json`, `data/gulf-nursing-questions.json`, `data/v2/nclex` and
  pknle; zare5 vs `data/llqp-questions.json`, `data/sie-questions.json`, `data/malaysia-pce-questions.json`
  and `data/philippines-insurance-questions.json` (South African law only); zasaps vs
  `data/nigeria-police-questions.json`, `data/police-exam-questions.json`,
  `data/philippines-napolcom-questions.json` and punjabpolice; zapsira vs
  `data/security-guard-questions.json`, `data/ontario-security-guard-questions.json`,
  `data/sira-security-questions.json` and zasaps.
- Never name a commercial prep provider or academy; say "not affiliated with" the PPSC, Punjab
  Police, the Pakistan Army, PAF, PMDC, PNMC, the FSCA, SAPS, PSIRA or the RTMC on the landing.
- British spelling for both countries (licence, centre), rupees (Rs) and rand (R).

## International batch 4: Ireland, New Zealand and Singapore licences and driving tests (Nov 2026)

Same rules as batches A to C and international batches 1 to 3 (read them). All v1. Branch
`intl-batch-1` (international batches 1 to 3 are wired there: grep their banks for duplicates). Goal:
take Ireland (region IE, which has `iedtt` and `iedttcv`), New Zealand (region NZ: `nzroad`,
`nzfirearms`, `nzlcq`) and Singapore (region SG: `sgbtt`, `sgftt`, `sgres`) towards 20 tests with the
English-language tests adults pay for or sit at the end of a course. Ireland takes the queued Safe Pass
(QUEUE.md #98) plus the SPSV entry test, the QFA/MCC regulation exam and the PSA security guard award;
New Zealand the Class 6 motorcycle and Class 2 heavy vehicle theory tests and the Nursing Council State
Final Examination; Singapore the Riding Theory Test, CMFAS Module 5 and the taxi and private hire
vocational licence test. Templates: iesafepass copies `tools/next100/aesira` (non-US workplace
licence, its `WIRING.md` shape) with `tools/intl/cscs` for the construction safety content shape;
iespsv and sgvl copy `tools/next30/ukseru` (taxi and private hire driver knowledge, non-driving);
ieqfa copies `tools/next100/llqp` (non-US financial regulation); iepsa copies `tools/next100/zapsira`
(security officer, non-US law); nzmoto copies `tools/next30/nzroad`; nzheavy copies
`tools/next100/iedttcv` (heavy vehicle theory) with `tools/next30/nzroad` for NZ rules; nzsfe copies
`tools/next100/kenck` (non-US nursing licensure); sgrtt copies `tools/countries/sgbtt` (and
`tools/next100/sgftt`); sgm5 copies `tools/next100/hklesfi1` (Asian securities and advisory
regulation). Every exam has a non-US region, so `WIRING.md` needs its TEST_REGIONS line (`<id>: "IE"`,
`"NZ"` or `"SG"`), its `NON_DRIVING_TESTS` line unless it is nzmoto, nzheavy or sgrtt, and a hub group.
nzmoto and nzheavy join the existing "New Zealand driving tests" group and sgrtt "Singapore driving
tests"; nzsfe joins the existing "New Zealand licences" and sgm5 and sgvl "Singapore licensing exams";
Ireland's four go in a new group, "Ireland licences and workplace certificates", placed after "Ireland
driving tests". Say the group in WIRING.md. iesafepass, iepsa, nzsfe and sgvl are teacher-led (SOLAS
Safe Pass trainers, QQI security course providers, nursing schools, the vocational licence course
providers): add them to `TEACHER_LED`.

| id | Test | Region | idBase | stateCode | prefix | slug | landing | hue |
|---|---|---|---|---|---|---|---|---|
| iesafepass | Safe Pass, SOLAS construction health and safety awareness (Ireland) | IE | 20900 | IESAFEPASS | IESP- | /safe-pass | /safe-pass-practice-test | 50 85% 18% |
| iespsv | SPSV Entry Test, industry knowledge (taxi, hackney and limousine, Ireland) | IE | 21000 | IESPSV | IESPSV- | /spsv-entry-test | /spsv-entry-test-practice-test | 262 85% 20% |
| ieqfa | QFA / Minimum Competency Code exam: regulation, ethics and core products (Ireland) | IE | 21100 | IEQFA | IEQFA- | /qfa-mcc | /qfa-mcc-practice-test | 165 40% 20% |
| iepsa | QQI Level 4 Security Guarding for the PSA licence (Ireland) | IE | 21200 | IEPSA | IEPSA- | /psa-security-licence | /psa-security-guard-practice-test | 245 30% 22% |
| nzmoto | New Zealand Class 6 motorcycle learner licence theory test | NZ | 21300 | NZMOTO | NZMOTO- | /nz-motorcycle-learner | /nz-motorcycle-learner-licence-practice-test | 12 85% 16% |
| nzheavy | New Zealand Class 2 heavy vehicle licence theory test | NZ | 21400 | NZHEAVY | NZHV- | /nz-heavy-vehicle-licence | /nz-class-2-licence-practice-test | 80 40% 20% |
| nzsfe | Nursing Council of New Zealand State Final Examination (registered nurse) | NZ | 21500 | NZSFE | NZSFE- | /nz-nursing-state-final | /nursing-council-nz-state-final-exam-practice-test | 305 30% 22% |
| sgrtt | Singapore Riding Theory Test (RTT), class 2B motorcycle | SG | 21600 | SGRTT | SGRTT- | /singapore-rtt | /singapore-rtt-practice-test | 105 60% 22% |
| sgm5 | CMFAS Module 5, Rules and Regulations for Financial Advisory Services (Singapore) | SG | 21700 | SGM5 | SGM5- | /cmfas-m5 | /cmfas-m5-practice-test | 195 60% 18% |
| sgvl | Singapore taxi and private hire vocational licence test (TDVL / PDVL) | SG | 21800 | SGVL | SGVL- | /singapore-vocational-licence | /singapore-vocational-licence-practice-test | 290 55% 22% |

Notes for every international batch 4 builder:
- Hues above were checked with a script against every `[data-theme]` `--brand` in `app/globals.css`
  and every hue in this file not yet wired (white-text contrast 4.5:1 or better; nothing within 8
  degrees unless saturation differs by 15 or lightness by 8); use as given. idBases 20900 to 21800
  are free in `lib/exams.ts` and `lib/v2`; slugs, landings, stateCodes and prefixes are free.
- Formats: confirm each with the body that sets it, and where a figure cannot be confirmed use a
  Tigertest target and say so in sources.md, the landing and examFacts, as `zak53` does. iesafepass:
  SOLAS Safe Pass (blended course since 2021; SOLAS sets the assessment and does not publish it, so the
  count and pass mark are a Tigertest target). iespsv: the NTA's SPSV Entry Test, Industry Knowledge
  module only (confirm count, time and pass mark on nationaltransport.ie); the county Area Knowledge
  module is not modelled and the landing says so. ieqfa: one MCC-recognised module, regulation and
  consumer protection with core product concepts (confirm which module and its format with the
  Institute of Bankers or the LIA; the Central Bank's Minimum Competency Code 2017 and the Consumer
  Protection Code as revised in 2025 set the content). iepsa: the QQI Level 4 Guarding Skills and
  Security Industry Awareness components (confirm award codes on qqi.ie; providers set the papers, so
  the pass mark is a Tigertest target). nzmoto and nzheavy: NZTA Waka Kotahi theory tests (the car
  learner test is 35 questions, 32 to pass, as `nzroad` models; confirm each test's own count and pass
  mark). nzsfe: confirm the State Final Examination's count, time and pass standard on
  nursingcouncil.org.nz (the Council has been revising its registration standards; use the current
  ones). sgrtt: Traffic Police RTT (guides report 50 questions, 45 to pass, as BTT; confirm). sgm5:
  confirm the current count, time and pass mark with the Singapore College of Insurance or IBF (the
  study guide is copyrighted: write original items from the Financial Advisers Act and MAS notices,
  never from the guide). sgvl: confirm with LTA and the vocational licence course providers.
- Law and practice, current as of Nov 2026, no fees, fines, fares or indexed figures:
  iesafepass the Safety, Health and Welfare at Work Act 2005, the Construction Regulations 2013 and
  HSA codes of practice; iespsv the Taxi Regulation Act 2013 and NTA SPSV regulations (vehicle and
  driver licences, the maximum fare structure as a concept, accessibility, passenger conduct, lost
  property, the complaints process); ieqfa the Central Bank Acts, MCC 2017, Fitness and Probity, the
  Consumer Protection Code, the Criminal Justice (Money Laundering and Terrorist Financing) Act 2010 as
  amended, GDPR, the FSPO; iepsa the Private Security Services Act 2004, arrest without warrant under
  section 4 of the Criminal Law Act 1997 stated as the law reads, reasonable force, PSA licensing,
  access control, patrols, incident reports; nzmoto and nzheavy the Official New Zealand Road Code
  for motorcyclists and for heavy vehicle drivers (nzheavy: work time and logbook rules, loads,
  braking, mass and dimension concepts, sharing the road; no RUC rates); nzsfe the Health Practitioners
  Competence Assurance Act 2003, the HDC Code of Rights, the Council's competencies including Te Tiriti
  o Waitangi, the Medicines Act 1981 and Misuse of Drugs Act 1975, NZ generic drug names and units;
  sgrtt the Road Traffic Act and Rules and the Traffic Police riding handbook (class 2B, 2A and 2
  progression stated without dates that change); sgm5 the Financial Advisers Act 2001, its
  Regulations, MAS notices and guidelines on fair dealing, the Balanced Scorecard framework,
  representative notification under the RNF; sgvl the Point-to-Point Passenger Transport Industry
  Act 2019, LTA vocational licence conduct rules, passenger safety and accessibility.
- Lanes and duplicates: iesafepass vs `data/cscs-questions.json`, `data/white-card-questions.json`,
  `data/osha-questions.json` and `data/working-at-heights-questions.json` (Irish law and HSA guidance;
  no repeated stems); iespsv vs `data/seru-questions.json`, `data/ireland-driver-theory-questions.json`
  and sgvl (write iespsv and sgvl side by side; each country's own law); ieqfa vs
  `data/llqp-questions.json`, `data/cemap-questions.json`, `data/life-health-questions.json`,
  `data/re5-questions.json`, `data/malaysia-pce-questions.json`, `data/philippines-insurance-questions.json`
  and `data/hkiiqe1-questions.json`; iepsa vs `data/sia-door-supervisor-questions.json`,
  `data/security-guard-questions.json`, `data/ontario-security-guard-questions.json`,
  `data/sira-security-questions.json` and `data/psira-security-questions.json`; nzmoto vs
  `data/nz-learner-licence-questions.json`, `data/motorcycle-questions.json`,
  `data/uk-motorcycle-theory-questions.json`, `data/south-africa-k53-code-1-questions.json` and sgrtt;
  nzheavy vs `data/nz-learner-licence-questions.json`, `data/uk-lgv-theory-questions.json`,
  `data/ireland-truck-bus-theory-questions.json`, `data/cdl-questions.json` and
  `data/south-africa-k53-code-3-questions.json`; nzsfe vs `data/v2/nclex`, `data/v2/nclexpn`,
  `data/v2/uknmc`, `data/v2/rexpn`, `data/gulf-nursing-questions.json`,
  `data/kenya-nursing-council-questions.json`, `data/philippines-nle-questions.json` and
  `data/pnmc-licensing-questions.json` (NZ practice; no repeated vignettes); sgrtt vs
  `data/singapore-btt-questions.json`, `data/singapore-ftt-questions.json`,
  `data/motorcycle-questions.json` and nzmoto (riding-specific rules: lane position, braking,
  protective gear, pillion, expressways on a motorcycle); sgm5 vs `data/hk-le-paper-1-questions.json`,
  `data/hkiiqe1-questions.json`, `data/malaysia-pce-questions.json`, `data/llqp-questions.json`,
  `data/sie-questions.json` and `data/series-65-questions.json` (Singapore law only); sgvl vs
  `data/seru-questions.json`, `data/singapore-btt-questions.json`, `data/singapore-ftt-questions.json`
  and iespsv.
- Signs in nzmoto, nzheavy and sgrtt are described in words.
- Never name a commercial prep provider or driving school; say "not affiliated with" SOLAS, the NTA,
  the Central Bank or the qualification bodies, the PSA or QQI, NZTA Waka Kotahi, the Nursing Council
  of New Zealand, the Singapore Traffic Police, MAS, SCI or IBF, or LTA on the landing.
- British spelling for Ireland, New Zealand and Singapore (licence, centre); euro (€), NZ dollars ($)
  and Singapore dollars (S$) only where a stem needs money, never a fee or fine.
