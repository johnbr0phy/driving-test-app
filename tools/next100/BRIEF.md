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
