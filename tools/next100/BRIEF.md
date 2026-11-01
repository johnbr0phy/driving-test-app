# Builder brief: one exam for the next-100 wave

You build ONE practice exam for Tigertest. Up to ten builders work at once in the same checkout,
`/home/user/driving-test-app` (branch `next100-batch4`), each on a different exam. The integrator
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

## Batch 4

| id | Test | Engine | Template | Region | slug | landing | suggested hue |
|---|---|---|---|---|---|---|---|
| neet | NEET-UG (Physics, Chemistry, Biology) | v2 | nda (sections) | IN | /neet | /neet-practice-test | 330 40% 40% |
| jeemain | JEE Main Paper 1 (B.E./B.Tech: Maths, Physics, Chemistry, with numeric-value items) | v2 | nda (sections) + numeric like gcsehigher | IN | /jee-main | /jee-main-practice-test | 20 55% 34% |
| cuet | CUET-UG General Aptitude Test (Section III) | v2 | ssccgl | IN | /cuet | /cuet-general-test-practice-test | 280 30% 40% |
| mhtcet | MHT-CET PCM group | v2 | nda (sections) | IN | /mht-cet | /mht-cet-practice-test | 100 30% 32% |
| ugcnet | UGC-NET Paper 1 (Teaching and Research Aptitude) | v2 | ctet | IN | /ugc-net-paper-1 | /ugc-net-paper-1-practice-test | 240 25% 40% |
| reet | REET Level 1 (Rajasthan teacher eligibility) | v2 | ctet | IN | /reet | /reet-level-1-practice-test | 40 45% 34% |
| uptet | UPTET Paper 1 (UP teacher eligibility) | v2 | ctet | IN | /uptet | /uptet-paper-1-practice-test | 160 30% 32% |
| aissee | AISSEE Class 6 (Sainik School entrance) | v2 | jnvst | IN | /aissee | /aissee-class-6-practice-test | 120 25% 34% |
| apcalcab | AP Calculus AB (multiple-choice section) | v2 | apbio (KaTeX math, calculator part) | US | /ap-calculus-ab | /ap-calculus-ab-practice-test | 210 35% 36% |
| aphug | AP Human Geography (multiple-choice section) | v2 | apworld (stimulus sets) | US | /ap-human-geography | /ap-human-geography-practice-test | 55 35% 32% |

Exam-specific notes:
- India exams: the India family is now 25 banks (list in REVIEW.md); grep all of them while writing. Confirm the current pattern from the official information bulletin (NTA: neet.nta.nic.in, jeemain.nta.nic.in, cuet.nta.nic.in, ugcnet.nta.nic.in, exams.nta.ac.in/AISSEE; MHT-CET: cetcell.mahacet.org; REET: rajeduboard.rajasthan.gov.in; UPTET: updeled.gov.in / UPESSC). Date-stamp anything about the 2026 or 2027 cycle.
- `neet`: 180 compulsory questions in 3 hours (no optional section since 2025; confirm), +4/-1. Model shorter at the real pace if needed (for example Physics 45, Chemistry 45, Biology 90 at full length is fine if the drills stay 20). NCERT class 11-12 syllabus, original items; numeric physics computed and asserted. Explain negative marking, do not apply it.
- `jeemain`: per subject, multiple choice plus numeric-value items (`numeric`); confirm the current counts and whether numeric items carry negative marking. Use KaTeX. Every numeric key computed in Python and asserted.
- `cuet`: the General Test (GK, current affairs excluded, general mental ability, numerical ability, quantitative reasoning, logical and analytical reasoning). Static GK only.
- `mhtcet`: Physics and Chemistry (Maths weighted double), Maharashtra State Board class 11 (about 20%) and 12 syllabus, no negative marking; confirm.
- `ugcnet`: Paper 1 only (50 questions, 100 marks, 10 units). Reading comprehension and data interpretation as stimulus sets; no current affairs.
- `reet`, `uptet`: Paper/Level 1 (Classes 1 to 5) like CTET: Child Development and Pedagogy, Language I (Hindi) and II (English), Maths, EVS; REET adds Rajasthan GK where the current pattern has it. Hindi-language items in Devanagari with English explanations as in `uppolice`; keep them correct. Check against `ctet` for overlap.
- `aissee`: Class 6 (Maths, GK, Language, Intelligence), NTA's current pattern and marks; Class 5 reader level like `jnvst`; no overlap with `jnvst`.
- `apcalcab`: Section I Part A (no calculator) and Part B (graphing calculator) as two sections; every answer computed (sympy is fine in build checks). Graph items described in words or tables. Free response not modelled.
- `aphug`: Section I, current CED; stimulus sets (maps described in words, tables, short texts); no overlap with apworld.

