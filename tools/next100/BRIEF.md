# Builder brief: one exam for the next-100 wave

You build ONE practice exam for Tigertest. Up to ten builders work at once in the same checkout,
`/home/user/driving-test-app` (branch `next100-batch5`), each on a different exam. The integrator
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

## Batch 5

| id | Test | Engine | Template | Region | slug | landing | suggested hue |
|---|---|---|---|---|---|---|---|
| jambmath | JAMB UTME Mathematics | v2 | jambeng (KaTeX like apcalcab) | NG | /jamb-mathematics | /jamb-mathematics-practice-test | 150 40% 30% |
| jambbio | JAMB UTME Biology | v2 | jambeng | NG | /jamb-biology | /jamb-biology-practice-test | 135 30% 32% |
| jambchem | JAMB UTME Chemistry | v2 | jambeng | NG | /jamb-chemistry | /jamb-chemistry-practice-test | 190 35% 30% |
| jambphys | JAMB UTME Physics | v2 | jambeng | NG | /jamb-physics | /jamb-physics-practice-test | 225 30% 36% |
| ngpolice | Nigeria Police Force constable recruitment CBT | v1 | tools/next100/pkdrive; idBase 13200, stateCode NGPOLICE, prefix NGPOL- | NG | /nigeria-police-recruitment | /nigeria-police-recruitment-practice-test | 215 45% 30% |
| cdcfib | CDCFIB recruitment CBT (Civil Defence, Correctional, Fire, Immigration) | v1 | pkdrive; idBase 13300, stateCode NGCDCFIB, prefix NGCDCFIB- | NG | /cdcfib-recruitment | /cdcfib-recruitment-practice-test | 15 35% 32% |
| ngarmy | Nigerian Army recruitment exam (DSSC/RRI aptitude test) | v1 | pkdrive; idBase 13400, stateCode NGARMY, prefix NGARMY- | NG | /nigerian-army-recruitment | /nigerian-army-recruitment-practice-test | 80 30% 30% |
| ngcustoms | Nigeria Customs Service recruitment CBT | v1 | pkdrive; idBase 13500, stateCode NGCUSTOMS, prefix NGCUS- | NG | /nigeria-customs-recruitment | /nigeria-customs-recruitment-practice-test | 200 50% 30% |
| trcnpqe | TRCN Professional Qualifying Examination | v1 | phlet (teacher licensure, v1); idBase 13600, stateCode TRCNPQE, prefix TRCN- | NG | /trcn-pqe | /trcn-pqe-practice-test | 170 30% 34% |
| apgov | AP U.S. Government and Politics (multiple-choice section) | v2 | apush (stimulus sets) | US | /ap-us-government | /ap-us-government-practice-test | 0 35% 36% |

Exam-specific notes:
- Nigeria family: banks on disk are ngfrsc (v1) and jambeng (v2); all ten of this batch join it. British spelling as used in Nigeria, naira, Nigerian names and places. Static facts only: no office-holders, no current affairs, no figures that change yearly (salaries, quotas, cut-offs). Confirm each exam body's current format from its own site or notice (jamb.gov.ng and its brochure/syllabus for 2027; npf.gov.ng / policerecruitment.gov.ng and the Police Service Commission; cdcfib.gov.ng; recruitment.army.mil.ng; customs.gov.ng; trcn.gov.ng). Where a body publishes no question count or pass mark, write a Tigertest target and say so.
- JAMB subjects: each is one UTME subject of 40 questions out of 100 (Use of English is 60), all four subjects sharing a 2-hour clock; confirm against the current JAMB brochure. Model 40 four-option questions in 30 minutes (the pro rata share), two tests with Test 2 held out, drills by syllabus topic area. Follow the current JAMB UTME syllabus for the subject. jambmath: KaTeX, every answer computed and asserted; jambchem and jambphys: numeric answers computed and asserted, all-number options sorted and locked. No overlap with neet/jeemain/mhtcet (grep them) or each other.
- The four recruitment CBTs (ngpolice, cdcfib, ngarmy, ngcustoms): these are general aptitude tests (English, quantitative reasoning, general knowledge and current affairs, sometimes verbal/logical reasoning). Confirm the latest exercise's pattern. To avoid colliding with each other, split the GK lanes: ngpolice takes Nigerian civics, the 1999 Constitution and policing; cdcfib takes the four services (Civil Defence, Correctional, Fire, Immigration), Nigerian geography and environment; ngarmy takes Nigerian history (pre-colonial to independence), the armed forces and Africa/ECOWAS/AU; ngcustoms takes economics, trade, ports, ECOWAS trade, and world geography. English and maths items: use fresh sentences and numbers, and grep the other three banks on disk before finalising.
- trcnpqe: TRCN PQE for teacher registration (education theory, pedagogy, curriculum, assessment, educational psychology, the teaching profession and its ethics, Nigerian education policy such as the National Policy on Education, ICT in education). Confirm the current format (CBT, number of questions, pass mark) from trcn.gov.ng. Check against phlet, ctet, reet, uptet, ugcnet for overlap.
- apgov: Section I only (55 questions, 80 minutes, 50% per the current CED; confirm), with the required foundational documents and Supreme Court cases as the College Board lists them; original stimuli (quantitative charts as tables, text-based excerpts written as practice texts, short quotes from public-domain founding documents allowed); add to "AP exams". Check against apush.

