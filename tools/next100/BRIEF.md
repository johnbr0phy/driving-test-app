# Builder brief: one exam for the next-100 wave

You build ONE practice exam for Tigertest. Up to ten builders work at once in the same checkout,
`/home/user/driving-test-app` (branch `next100-batchN`), each on a different exam. The integrator
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

## Batch 1

| id | Test | Engine | Template | Region | slug | landing | hue (HSL) |
|---|---|---|---|---|---|---|---|
| rrbgroupd | RRB Group D (Level 1) CBT | v2 | rrbntpc | IN | /rrb-group-d | /rrb-group-d-practice-test | 6 55% 36% |
| sscgd | SSC GD Constable (CBE) | v2 | ssccgl | IN | /ssc-gd-constable | /ssc-gd-constable-practice-test | 132 45% 30% |
| sscchsl | SSC CHSL Tier 1 | v2 | ssccgl | IN | /ssc-chsl | /ssc-chsl-practice-test | 196 55% 34% |
| sscmts | SSC MTS and Havaldar | v2 | ssccgl | IN | /ssc-mts | /ssc-mts-practice-test | 26 70% 38% |
| uppolice | UP Police Constable (UPPRPB) | v2 | rrbntpc | IN | /up-police-constable | /up-police-constable-practice-test | 236 45% 30% |
| ibpsclerk | IBPS Clerk Prelims | v2 | ibpspo | IN | /ibps-clerk | /ibps-clerk-prelims-practice-test | 338 55% 34% |
| jnvst | JNVST Class 6 (Navodaya Vidyalaya) | v2 | rrbntpc | IN | /jnvst | /jnvst-class-6-practice-test | 54 70% 32% |
| jambeng | JAMB UTME Use of English | v2 | ibpspo (shared passages as stimuli) | NG | /jamb-use-of-english | /jamb-use-of-english-practice-test | 140 60% 24% |
| appsych | AP Psychology (MCQ section) | v2 | gre (single section, stimuli where the real exam uses them) | US | /ap-psychology | /ap-psychology-practice-test | 274 35% 42% |
| pkdrive | Pakistan driving licence test (sign and rules) | v1 | nzroad; idBase 13000, stateCode PKDRIVE, prefix PKDRV- | PK, wire as GLOBAL | /pakistan-driving-test | /pakistan-driving-licence-test | 152 70% 22% |

Exam-specific notes:
- Indian government exams: avoid overlap with the existing `ssccgl`, `rrbntpc`, `ibpspo` and `ctet`
  banks (grep them; rewrite any item that tests the same fact with the same numbers). General
  awareness is static facts only. Rupees and Indian names. Negative marking is explained, not
  scored, as in `rrbntpc`.
- `uppolice`: one state's recruitment exam; date-stamp the notification you used.
- `jnvst`: the test is for Class 5 students (about age 10 to 12); write for that reader. Mental
  ability items that need figures must be redone as text or left out, and the landing says so.
- `jambeng`: Nigerian English context; comprehension and cloze passages are original.
- `appsych`: the current College Board course framework (the 2024 redesign) and exam format; the
  free-response section is not modelled and the landing says so. Score as percent with a note on the
  1 to 5 scale. US exam: no "Region" work needed beyond US.
- `pkdrive`: Punjab, Sindh, KP and Islamabad run their own tests; build for what they share
  (signs, rules of the road from the national highway code) and say where provinces differ. Signs
  are described in words. Left-hand traffic.
