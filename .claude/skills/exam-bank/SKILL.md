---
name: exam-bank
description: Write, validate and wire a new Tigertest practice exam (a 200-question bank in data/, its ExamConfig, app routes, landing page and screenshots). Use this whenever the user asks to add, build, generate or rewrite a practice test, question bank, exam, or quiz for any certification, license, entrance or permit test, or to review or fix the quality of an existing bank in data/*-questions.json. Also use it when adding questions to an existing exam, even if the word "skill" or "bank" never appears.
---

# Exam bank

Every exam on the site shares one JSON shape, one engine (`lib/examTestGenerator.ts`) and one
house style for questions. The style matters as much as the schema: the first 30 banks were
written to the answer-length rules in `agentic-rewrite/AGENT-PROMPT.md`, and the one batch that
skipped those rules came back with the correct option being the longest choice in 80 to 90% of
items. A test-wise user passes that bank by always picking the longest answer. This skill exists so
that never happens again: the writing rules, the validator and the wiring checklist travel together.

**Engine: v1 unless the exam needs v2.** Build a v1 exam by default. Use v2 only when the real
exam has passages beside the question, select-all, typed numeric, ordering, matrix, cloze or bowtie
items, adaptive modules or scaled scores. A clock alone is not a reason (see "Which engine" in
CLAUDE.md).

Work in this order. Do not skip the validator between steps.

## 0. Research the exam before the spec

A bank is only as good as what it was written from. Do this before step 1, and stop if it fails.

1. **Find the exam owner's own documents.** The body that sets or runs the exam (the certifying
   body, regulator, board, ministry or test vendor named on its site). Fetch them, do not rely on
   search snippets: the current content outline, blueprint, syllabus or test plan with its
   revision date and weights; the candidate handbook or bulletin for format (questions, time, pass
   mark, languages, delivery); and the primary law, standard, code or manual the outline points to
   (statute text, official handbook, published standard). Check the owner's news or announcements
   page for a newer outline or a dated change, and use the version in force on the build date.
2. **Write facts from primary text.** Every rule, number and definition in a question must be
   traceable to an official or primary source you read. Prep sites, forums, Quizlet, YouTube and
   AI answers may point you to a source; they never confirm a fact. Two independent prep sources
   may support format facts only, and only when the owner publishes none, labelled "guides say".
3. **Never use question material.** No official sample or past questions, question pools, review
   manual items, commercial practice tests or leaked material, not even reworded. Write originals
   from the rules.
4. **Keep it current.** Skip facts that change often or are disputed (fees, fines, indexed dollar
   limits, office-holders, current affairs, rules in a pending reform). When two sources disagree,
   use the official one, or leave the fact out and say so in sources.md.
5. **Record it in `tools/<dir>/<examId>/sources.md`.** Like `tools/next100/cisa/sources.md`: a
   line that every question is original, then one section each for the outline, format and law or
   standards, each source as title, full https URL and "fetched YYYY-MM-DD" with what it gave you;
   what could not be loaded or confirmed and how the copy words it; and what was deliberately
   left out. `tools/check_sources.py <examId>` checks the file.

**Stop rule.** If you cannot fetch an official outline, syllabus, handbook or primary law for the
exam, do not build it. Say what you tried and why it was not enough. A thin bank written from
guides is worse than no bank.

## 1. Spec the exam before writing a single question

Write a short spec (a scratchpad file is fine) with: exam id, state code, idBase (next free block of
100 after the highest in `lib/exams.ts`), question-ID prefix, slug, landing path, pass percentage
from the real exam, and the categories. For each category: key (camelCase, prefixed so it cannot
collide, e.g. `forkStability`), label, per-test count and ID segment. Per-test counts sum to 50 and
each category pool is exactly four times its per-test count, so the pool is 200. Group categories
into 4 to 6 training sets. Plan at least eight completable dashboard steps per exam and per state version. Four training sets and four practice tests meet the minimum.

Pick counts from the real exam's published outline (ACS, test plan, content outline). Say which
outline and revision in a comment on the ExamConfig blueprint. For a bank-only job (a pilot, a
rewrite, extra questions for an existing exam) only the state code, prefix, categories and pools
matter; mark the routing fields "n/a".

The real exam's format (question count, time, pass mark, languages, booking, retakes) is researched
for the landing, the FAQ and `lib/examFacts.ts`, not for the bank. Never turn it into questions,
and never plan a category (or part of one) to hold it: a licence or law category covers rules a
holder lives by. If the handbook has too few of those, make the category smaller.

## 2. Write the questions

Use [the question review guide](references/question-review.md) when drafting, shortening or localizing items. It gives examples of keeping the decisive fact and checking the final student-facing forms.

Schema, one object per question, exactly these keys in this order:

```json
{
  "type": "FORKLIFT",            // the exam's stateCode
  "state": "ALL",
  "questionId": "FORK-STA-001",  // <prefix><SEGMENT>-NNN, 001 upward per segment
  "category": "forkStability",
  "question": "What happens to capacity when the load center moves out from 24 to 30 inches?",
  "optionA": "It increases",
  "optionB": "It stays the same",
  "optionC": "It decreases",
  "optionD": "It doubles",
  "correctAnswer": "C",
  "correctIndex": 2,
  "explanation": "A longer load center lengthens the lever arm, so the same weight tips the truck sooner and rated capacity drops. The data plate gives capacity at the rated load center only."
}
```

Order the array by category in spec order, then by number.

### House style (this is what the validator enforces)

**Shortest natural answer.** Options are phrases, not sentences. Match length to the question:
a fact is 1 to 3 words, an action 3 to 6, a reason or condition 6 to 12. Aim for a bank average of
20 to 35 characters per option (the validator's hard limits are wider, 15 to 42). Put the detail
in the explanation, not the option. Numeric distractors are the values a plausible mistake
produces: the adjacent step on the scale, the number from the other standard, the result of the
wrong operation (for "10 gallons per acre over 4 acres": 40, 14, 2.5 and 10).

**Short stems.** Say what the question needs and stop: the fact or the situation, then the ask.
Aim for a bank median of 12 to 18 words per stem (the site's median is 14; reading passages, code
and data tables are extra and do not count). Do not wrap a plain fact in a made-up scenario, and
do not stack qualifiers to rule out a second answer: fix the options instead. Compare with the
nearest existing banks before you finish (`python3 -I tools/check_stem_length.py <bank>`); the
Nov 2026 batch ran 20 to 26 words, 40% over its peers, and read as wordy. CI fails a new bank
whose median is over 20 words (`--all --baseline tools/stem_length_baseline.json`).

Spread key lengths over all four ranks. Trimming the key just under one distractor to pass the
key-longest rule only moves the tell: "pick the second-longest option" scored 50% on PALS and
SHRM-CP in Nov 2026. `python3 -I tools/check_length_rank.py <bank>` must show no rank over 40%
(aim for 18 to 33% each); CI fails a new bank over it.

**Lean answers.** Write options as bare noun phrases: "Appeal Board", not "The Appeal Board";
"Rated-capacity chart", not "The rated-capacity chart". Keep a leading The/A/An only where the
option needs it (a full sentence, or "A comma" in a punctuation question). The site's median is
about 12% of options opening with an article; the Nov 2026 batch ran 28% to 46%. The same check
fails a new English bank where more than 25% of options start with The, A or An.

**The key must not stand out.** Aim for the correct option within 20% of the average length of
the three wrong ones. Across the bank the key may be the single longest option in at most a
quarter of items, and may exceed the wrong-option average by 20% in at most 30% of items (the
existing banks sit at 4 to 16% and 10 to 26%). The cheap way to get there is to write the key first, short, then write three
wrong options of the same shape and length. If a key needs a qualifier ("if the depth is
uncertain"), give a distractor one too. Never let "varies by state" or "follow house policy"
appear only on the key; that phrase becomes a tell.

**Rotate the correct letter.** Question 1 of each segment keys A, then B, C, D, A... so every letter
lands at exactly 25% without a post-hoc shuffle. The validator only insists on 20 to 30% per
letter, but the rotation is the easy way to get there and it also stops a writer from drifting to
"C is usually right". Writing the stem with the key in its slot avoids a shuffle step that can
break position-dependent options.

**Distractors are plausible errors, not strawmen.** Each wrong option should be something a
candidate who half-learned the material would pick: the adjacent number, the rule from the other
standard, the step done in the wrong order. "Ignore it and go home" teaches nothing and flags the
key by tone.

**No answer patterns.** Every question can be right on its own and the bank still be passable
without the content. In Nov 2026 the 200 RBT scenario questions keyed "tell the supervisor" in 43
of the 51 that offered it, CNA keyed "report" 19 of 27 times, and the blind review, which reads one
question at a time, passed them all. Scope-of-practice, safety and ethics banks are where this
happens: the writer anchors on one principle (escalate, report, stop, call 911, decline, follow the
plan, give way) and every scenario becomes "the safe move". So before writing a category:
- Write down the principle's edges: when the safe move is right, and when it is wrong (the written
  plan already covers it, the situation is within the person's own role, waiting is unsafe, it is
  the right move at the wrong time or to the wrong person). Write both kinds, and make the "safe
  move is wrong" kind at least a third of the items where that move is an option.
- When the safe move is the key, give at least one wrong option the same move with the wrong
  timing, person or scope ("tell the supervisor at next week's visit", "report it once it
  repeats", "use it, then tell the supervisor"). The student must know when and how, not just what.
- Vary the wording of keys that do the same thing ("use the plan's backup", "carry out the crisis
  plan"), and put the giveaway verb in wrong options too ("follow the parent's request").
- Never reuse one key word for word in a category, and do not write near-duplicate scenarios
  with the same answer (six "a caregiver raises a concern, tell the supervisor" items teach one
  fact six times).
- Order matters as well as rate. Since Nov 2026 training sets do not ask in ID order: they mix it
  (`lib/trainingOrder.ts`, a golden-ratio stride inside each category, categories spread evenly
  through the set), so a run of one subtopic in ID order (ten roundabout questions written in a
  row) is spread through the set by itself. Write subtopics in whatever order is natural; do not
  hand-shuffle IDs to break up a topic. Still interleave keys that share a word: the answer-pattern
  check reads ID order, and practice tests and sources are read that way too, so 4 or more in a row
  whose answers share a word still fail it.
`tools/check_answer_patterns.py` runs inside the validator and fails a bank where picking the option
with one word beats guessing by a clear margin, a key repeats, or 4+ keys in a row share a word. It
reports the result as marks a test-wise student gains per 50-question test, measured on what one
student meets (a DMV state's 200, not all 2,200); RBT's scenarios gained about 5 before the fix; run it on the bank as a whole
(`python3 -I tools/check_answer_patterns.py data/<file>.json`) while writing, not only at the end.

**Every question gets its own options. Never build in "families".** In Nov 2026 a ten-bank
batch (#876, #877) was written with a `family(options, rows)` helper: four questions shared the
same four options and each option was keyed exactly once. It looks clean on paper (keys exactly
25% per letter, a 25% options-only review) and it is a bad bank: a training set shows the same
four options four times, so after three the last falls to elimination, and the wrong options are
borrowed from neighbouring questions instead of written for the one on screen ("The additional
licence lapses on moving" offered on a question about appeals). So:
- Write the key and three wrong options for each question on its own. No exact option set may
  appear in two questions. The only exceptions are a standard answer format of the real exam used
  across many questions (UPSC "1 only / 2 only / Both / Neither", data sufficiency, True / False /
  Not Given), number answers, and questions on one shared passage or puzzle.
- Terminology questions are where the temptation is strongest: for each one, pick the three terms
  most confusable with that example (for a synecdoche: metonymy, personification, hyperbole), not
  the same four every time.
- Even letters come from rotating the key's slot as you write (above), never from a helper that
  hands out the same options.

**The key must not echo the stem.** The other half of that batch's failure: the key was often the
only option repeating a word of the question ("Which measure protects the sling?" with "Protect
synthetic sling edges"). Always picking "the option that alone shares the most words with the
question" scored 44 to 49% on five of those banks with no knowledge, against 25 to 29% on good
banks. An options-only review hides the stem, so it can never see this. When a stem word shows up
in the key, reword the key, reword the stem, or let wrong options use that word too.

`tools/check_option_reuse.py` measures both (shared option sets as a share of questions, limit
10%; echo gain in marks per 50 over guessing, limit 4.5, aim for 2 or less). It runs inside both
validators and in CI. Run `python3 -I tools/check_option_reuse.py --list data/<file>.json` while
writing: it lists the shared sets and the echo-keyed ids to fix.

**Stems are self-contained.** One question, ending in a question mark or a colon-completion.
Reading and paragraph items embed the passage in the stem (60 to 120 words). Math items have one
numeric answer with the key step in the explanation; describe graphs and tables in words. Quote
label text, sign wording or a sentence under revision with straight double quotes inside the
stem; leave ordinary terms (signal words, form names) unquoted.

**Explanations** are 1 to 3 sentences: why the key is right, why the most tempting wrong option
is wrong. Plain apostrophes, no em-dashes. Cite the standard by name ("OSHA 1910.178", "the
Personal Auto Policy"), not by paragraph number, unless you have checked that paragraph in the
current text. Wrong paragraph citations were the single most common factual error in review.

**Never point at an option by its position.** The app shuffles the options for every student
(and most build scripts move the key after you write the item), so "the second option", "the last
choice", "the first two" or "Choice B" names a different option on every screen, and sometimes
the right answer. Name the option by what it says: "SELECT Pupils FROM Name swaps the field and
table", "0.0.0.255 also covers the second interface", "joining the clauses with only a comma is a
comma splice". The same goes for stems ("Choice A repeats the original" needs `lockedOrder`) and
for Basics `why`, `hint` and `then` lines. Two exceptions: an item whose options keep their order
(v2 `lockedOrder`, or "A and B" / "All of the above" options), and "Choice B" in a v2
explanation, which the app rewrites to the letter on screen (it does not rewrite ordinals, stems
or Basics). Bare ordinals with no noun ("the third changes the meaning", "the last is a fragment")
are the same mistake and no script can catch them, so read for them. This was found in Nov 2026
in 25 explanations across 9 banks, several of which called the correct answer wrong.
`tools/check_option_refs.py` finds the checkable forms; it runs inside both validators and in CI.

**Universal content only.** Anything a state sets (hours, ages, fees, training hours, arrest
powers, card renewal) is "varies by state" in both stem and key. Never assert one state's rule.
Never name a training provider in a stem (no Red Cross, TIPS, ServSafe, AHA); the bank serves every
provider's course. Never ask for a dollar amount, a point value or an X/Y/Z insurance limit.

**Never ask about the test itself.** Every question tests the subject, never the exam: no
question count, pass mark, wrong answers allowed, time limit, languages offered, booking, test
centre, ID on the day, retake waits, cheating, how long a pass stays valid, who writes the
questions, or the age to sit the test. No real test asks these, and a learner who meets one
rightly thinks the bank is padded. Those facts belong on the landing page (`lib/examFacts.ts`,
the FAQ). Licensing rules a holder lives by (learner and probation limits, alcohol limits,
documents to carry) are fine. The validator fails these stems (`META` in `validate_bank.py`).

**Banned:** "All of the above", "None of the above", "Both A and B", options that refer to other
options, duplicate options in a row, duplicate or near-duplicate stems in the bank.

### Never repeat anything inside an exam

A student who meets the same thing twice in one exam feels the bank is padded, and a held-out
test that repeats a drill question measures memory, not readiness. So, in every exam:

- **Mixed state paths.** Their short forms partition an existing approved full exam, which learners take again as the full-length recap. Validate this exception with the state form test in the question review guide.
- **For independently authored forms, no question twice.** Not across tests, drills, sets, modules or variants, and not reworded
  with the same numbers and the same answer. Every item is written for one place only.
- **No Basics skill in two drills (v2).** A skill is learned once per exam, so a second drill
  opening with it shows a step that is already done. Choose each drill's Basics last, across
  the whole exam at once: list every drill's skills side by side and check no id appears
  twice. If a drill cannot reach the four-skill minimum (`tests/basics-min-skills.test.cjs`)
  without borrowing, write a new skill for it, or give it no Basics; never borrow one another
  drill already opens with. This happened in Nov 2026 (MAP Growth: Main idea opened both
  reading drills, Tone opened Literary and Vocabulary) because each drill was picked alone.
- **Split v2 drills by skills when they share a domain.** Verify that the resulting question pools are disjoint and together cover the intended domain.
- **A `basics` tag only names a skill its own drill opens with.** Any other tag can never show
  its brush-up card; drop it in the build (see `DRILL_BASICS` in
  `tools/next100/mapgrowth/build.py`).

`tests/no-repeats.test.cjs` checks all four for every v2 exam in `npm test`, against
`tests/no-repeats-baseline.json` (repeats in exams built before the rule; it may only shrink, so
a new exam must have none). The v1 validator already fails duplicate stems in a bank.

### Generating at scale

Write items as Python data in the scratchpad (one file per category), build the JSON with a
script, and keep both so the bank can be regenerated. Write the key first and short, then the
distractors. Run the validator after each category, not once at the end: fixing 40 long keys is
quick, fixing 180 is a rewrite.

## 3. Validate

```bash
python3 -I .claude/skills/exam-bank/scripts/validate_bank.py data/<file>.json \
  --pool forkBasics=40 --pool forkStability=48 ...      # add --rows N for a pilot smaller than 200
```

It checks the schema, pools, ID sequence, key/index agreement, letter balance, banned phrases,
duplicates, stems ending in `?` or `:`, and the length rules above, and exits non-zero on failure.
Fix until it prints PASS. Banks that differ from a new 200-question bank on purpose (HTL's 214
interleaved rows, the official ham pool, CDL's 600, the German 210) are listed with the reason in
`KNOWN_BANKS`, and state versions (`real-estate-tx-questions.json` and the like) are recognised by
file name: any length, their state code, `sourceQuestionId`, unique rather than sequential ids.
Add a bank to `KNOWN_BANKS` only for a real design reason, never to hide a quality failure.
Then give an independent reviewer only the keyless shuffled questions from `tools/blind_answers.py make` for their first pass. Collect their answers and ambiguity flags before showing the key, explanation or source notes. Resolve flagged items against the official source and record a JSON list of
`questionId`, severity (wrong-key, factual, ambiguous, weak), issue, fix. Without an Agent tool,
do the read yourself in a separate step after a break from writing, recomputing every number and
asking of each item "could a well-prepared candidate defend a different option?". Apply the fixes
and validate again.

Ask the reviewer for an **options-only pass** too, with `tools/options_only.py`: `make` writes a
blind file (stems, keys and categories removed, items and options shuffled with a fresh seed,
anonymous ids) and a private key the reviewer never reads. The reviewer picks the option a
test-wise candidate would pick and tags each pick K (recognises the true fact), S (a surface
cue: length, tone, the odd one out, the most complete or the safest option, repeated wording)
or G (guess). `score` then judges the bank:
- **A surface cue that finds the key is a writing fault.** Every S hit is listed and rewritten
  (parallel wrong options in the same form, not a puzzle). The bank fails while S hits exceed
  3% of items or, from 10 S picks up, 40% of them. S tags vary a lot between reviewers (two
  passes on one bank flagged nearly disjoint sets, mostly knowledge), so each tagged hit then
  goes to a second reviewer who reads the whole question and says whether the options really
  give the key away; its verdicts go in `confirm.json` and only confirmed hits count.
- **Knowledge is not a fault.** A reviewer who knows the subject picks "20 seconds" for
  handwashing without the stem, and so would a real exam's options. Live banks scored 64% (real
  estate) and 82% (food manager) on Nov 18 2026, almost all from knowledge, so there is no flat
  40% ceiling: a bank fails only above 82%, a sign its wrong options are false on their face.
  Never rewrite a sound factual item to push this number down, and never force random guesses.
- **Every item must need exam knowledge.** An item a reader with no subject knowledge answers
  from the stem's own logic (an action log reading "Pilot complete; revision assigned; approval
  pending", a seasoning test spoiled by "Serving temperature") is a fault however it scores.
  Codex's Nov 2026 CDM, VTC and broker drafts were pushed into these by the old 40% rule.
The flat 40% ceiling this replaces failed every factual bank on the site and rewarded those
puzzles. The pass catches what the word counter cannot, such as "the most cautious option is
always right". Run it after the blind key review, and again on any item rewritten for an S hit.

## 4. Wire it in

Follow `references/wiring.md` exactly. In short: `ExamConfig` in `lib/exams.ts` (plus the `ExamId`
and icon unions), a bank module `lib/banks/<id>.ts` and its line in `lib/banks/all.ts`, category
keys in `types/index.ts` and all five `i18n/*.ts`, a `[data-theme]` block in `app/globals.css`,
catalog blurb, org line, hub group and search aliases in `lib/testCatalog.ts`, the icon in
`components/CDLHeader.tsx` and `components/TestIcon.tsx`, eight wrappers under `app/<slug>/`
copied from the newest exam, `scripts/build-training-parts.ts`, the landing page with its
`lib/examFacts.ts` entry and `lib/seoDates.ts` bump, the teacher-led lists when it is taught in a
class, a `docs/exams/<id>.md` notes file, and the landing screenshots, light and dark (`scripts/shoot_landing.js`).

The wrappers only point at shared components, so a new exam gets every dashboard, results,
landing, header and footer change already made to the others. Keep it that way: when an exam
needs something different, change the shared component or add an `ExamConfig` field, never a
copy in the exam's folder. Write the brand as "Tigertest".

Then `npx tsc --noEmit`, `npm run lint`, `npm run build`, and curl the landing, `/og/<id>`,
`/tests` and `/sitemaps/exams` for 200s. Commit only when all of that is green.

## Reviewing an existing bank

Run the validator with no `--pool` flags to get the style report, then a full read for facts.
Run `python3 -I tools/check_option_refs.py --list` as well, and while reading check every
explanation that says "the first", "the second", "the last" or "the other two" against the
options as built, not as written in the source.
When fixing a bank with the length problem, shorten keys rather than padding distractors; padding
makes every option a sentence and the bank reads worse. Keys and questionIds never change during
a fix pass, so saved progress stays valid.
