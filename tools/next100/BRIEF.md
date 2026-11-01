# Builder brief: one exam for the next-100 wave

You build ONE practice exam for Tigertest. Up to ten builders work at once in the same checkout,
`/home/user/driving-test-app` (branch `next100-batch3`), each on a different exam. The integrator
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

## Batch 3

| id | Test | Engine | Template | Region | slug | landing | suggested hue |
|---|---|---|---|---|---|---|---|
| upscse | UPSC Civil Services Prelims, GS Paper I (with a CSAT drill) | v2 | rrbntpc | IN | /upsc-prelims | /upsc-prelims-practice-test | 28 45% 34% |
| nda | NDA and NA exam (Mathematics + General Ability Test) | v2 | sscmts (two sections) | IN | /nda | /nda-exam-practice-test | 214 55% 32% |
| agniveer | Agniveer Army CEE (General Duty) | v2 | rrbgroupd | IN | /agniveer-army | /agniveer-army-cee-practice-test | 95 40% 30% |
| agniveervayu | Agniveer Vayu (Indian Air Force), Science group | v2 | sscmts (sections) | IN | /agniveer-vayu | /agniveer-vayu-practice-test | 205 60% 40% |
| rrbalp | RRB ALP CBT 1 | v2 | rrbgroupd | IN | /rrb-alp | /rrb-alp-practice-test | 355 45% 34% |
| rpfconst | RPF Constable CBT | v2 | rrbgroupd | IN | /rpf-constable | /rpf-constable-practice-test | 230 35% 34% |
| ssccpo | SSC CPO (Sub-Inspector) Paper 1 | v2 | ssccgl | IN | /ssc-cpo | /ssc-cpo-practice-test | 262 40% 36% |
| apworld | AP World History: Modern (multiple-choice section) | v2 | apush | US | /ap-world-history | /ap-world-history-practice-test | 30 30% 36% |
| aplang | AP English Language and Composition (multiple-choice section) | v2 | apush (passage sets as stimuli) | US | /ap-english-language | /ap-english-language-practice-test | 200 25% 34% |
| phlet | Philippines Licensure Examination for Professional Teachers (LET), General and Professional Education | v1 | tools/next30/rbt (v1 certification exam); idBase 13100, stateCode PHLET, prefix PHLET- | PH | /let-reviewer | /let-reviewer-practice-test | 160 45% 30% |

Exam-specific notes:
- India exams: the India bank family is now 18 banks; check against all of them while writing (see the list in REVIEW.md). Confirm each pattern from the latest official notification (UPSC, NDA via upsc.gov.in; Agniveer via joinindianarmy.nic.in and agnipathvayu.cdac.in; RRB CEN notices on the RRB regional sites; SSC via ssc.gov.in/api/attachment PDFs).
- `upscse`: GS Paper I only for the tests (100 questions, 2 hours, 2 marks, 1/3 negative); CSAT Paper II is qualifying (33%), so offer it as one drill of comprehension, reasoning and basic numeracy, not a full test. Static GK only, never current affairs or office-holders.
- `nda`: two sections like the real papers (Maths 120 in 150 min, GAT 150 in 150 min); model shorter at the real pace if needed and say so.
- `agniveervayu`: Science subjects group (English, Physics, Mathematics); the Other-than-Science and combined options are not modelled; say so.
- `apworld`, `aplang`: download the current CED PDF; Section I only; original stimuli (practice texts attributed to a kind of writer, never real copyrighted passages beyond short public-domain quotes). AP English Language passages are original nonfiction prose; the reading and writing (revision) item types both appear. Add both to the "AP exams" hub group.
- `phlet`: PRC's LET, General Education and Professional Education parts (Elementary level; the Secondary major is not modelled). Philippine context, US spelling, pesos. Confirm the current PRC table of specifications and passing rule (75 general average, no rating below 50).

