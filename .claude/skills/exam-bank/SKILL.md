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
into 4 to 6 training sets.

Pick counts from the real exam's published outline (ACS, test plan, content outline). Say which
outline and revision in a comment on the ExamConfig blueprint. For a bank-only job (a pilot, a
rewrite, extra questions for an existing exam) only the state code, prefix, categories and pools
matter; mark the routing fields "n/a".

The real exam's format (question count, time, pass mark, languages, booking, retakes) is researched
for the landing, the FAQ and `lib/examFacts.ts`, not for the bank. Never turn it into questions,
and never plan a category (or part of one) to hold it: a licence or law category covers rules a
holder lives by. If the handbook has too few of those, make the category smaller.

## 2. Write the questions

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

- **No question twice.** Not across tests, drills, sets, modules or variants, and not reworded
  with the same numbers and the same answer. Every item is written for one place only.
- **No Basics skill in two drills (v2).** A skill is learned once per exam, so a second drill
  opening with it shows a step that is already done. Choose each drill's Basics last, across
  the whole exam at once: list every drill's skills side by side and check no id appears
  twice. If a drill cannot reach the four-skill minimum (`tests/basics-min-skills.test.cjs`)
  without borrowing, write a new skill for it, or give it no Basics; never borrow one another
  drill already opens with. This happened in Nov 2026 (MAP Growth: Main idea opened both
  reading drills, Tone opened Literary and Vocabulary) because each drill was picked alone.
- **No domain in two drills (v2).** Two drills on one domain serve the same questions twice.
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
Then have a second pass read every item for factual accuracy and second-defensible-answer
problems: spawn a reviewer agent with the bank and the source outline and ask for a JSON list of
`questionId`, severity (wrong-key, factual, ambiguous, weak), issue, fix. Without an Agent tool,
do the read yourself in a separate step after a break from writing, recomputing every number and
asking of each item "could a well-prepared candidate defend a different option?". Apply the fixes
and validate again.

## 4. Wire it in

Follow `references/wiring.md` exactly. In short: `ExamConfig` in `lib/exams.ts` (plus the `ExamId`
and icon unions), a bank module `lib/banks/<id>.ts` and its line in `lib/banks/all.ts`, category
keys in `types/index.ts` and all five `i18n/*.ts`, a `[data-theme]` block in `app/globals.css`,
catalog blurb, org line, hub group and search aliases in `lib/testCatalog.ts`, the icon in
`components/CDLHeader.tsx` and `components/TestIcon.tsx`, eight wrappers under `app/<slug>/`
copied from the newest exam, `scripts/build-training-parts.ts`, the landing page with its
`lib/examFacts.ts` entry and `lib/seoDates.ts` bump, the teacher-led lists when it is taught in a
class, a CLAUDE.md bullet, and the landing screenshots, light and dark (`scripts/shoot_landing.js`).

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
