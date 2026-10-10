---
name: exam-bank
description: Write, validate and wire a new TigerTest practice exam (a 200-question bank in data/, its ExamConfig, app routes, landing page and screenshots). Use this whenever the user asks to add, build, generate or rewrite a practice test, question bank, exam, or quiz for any certification, license, entrance or permit test, or to review or fix the quality of an existing bank in data/*-questions.json. Also use it when adding questions to an existing exam, even if the word "skill" or "bank" never appears.
---

# Exam bank

Every exam on the site shares one JSON shape, one engine (`lib/examTestGenerator.ts`) and one
house style for questions. The style matters as much as the schema: the first 30 banks were
written to the answer-length rules in `agentic-rewrite/AGENT-PROMPT.md`, and the one batch that
skipped those rules came back with the correct option being the longest choice in 80 to 90% of
items. A test-wise user passes that bank by always picking the longest answer. This skill exists so
that never happens again: the writing rules, the validator and the wiring checklist travel together.

Work in this order. Do not skip the validator between steps.

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

**Universal content only.** Anything a state sets (hours, ages, fees, training hours, arrest
powers, card renewal) is "varies by state" in both stem and key. Never assert one state's rule.
Never name a training provider in a stem (no Red Cross, TIPS, ServSafe, AHA); the bank serves every
provider's course. Never ask for a dollar amount, a point value or an X/Y/Z insurance limit.

**Banned:** "All of the above", "None of the above", "Both A and B", options that refer to other
options, duplicate options in a row, duplicate or near-duplicate stems in the bank.

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
duplicates, and the length rules above, and exits non-zero on failure. Fix until it prints PASS.
Every bank written in house style passes it as of October 2026; the two that do not are the ham
pool (official FCC text, so its long options are kept verbatim) and the original CDL bank.
Then have a second pass read every item for factual accuracy and second-defensible-answer
problems: spawn a reviewer agent with the bank and the source outline and ask for a JSON list of
`questionId`, severity (wrong-key, factual, ambiguous, weak), issue, fix. Without an Agent tool,
do the read yourself in a separate step after a break from writing, recomputing every number and
asking of each item "could a well-prepared candidate defend a different option?". Apply the fixes
and validate again.

## 4. Wire it in

Follow `references/wiring.md` exactly. In short: `ExamConfig` in `lib/exams.ts` (plus the `ExamId`
and icon unions), bank import in `lib/examData.ts`, category keys in `types/index.ts` and all four
`i18n/*.ts`, a `[data-theme]` block in `app/globals.css`, catalog blurb, org line, hub group and
search aliases in `lib/testCatalog.ts`, the icon in `components/CDLHeader.tsx` and
`components/TestIcon.tsx`, seven wrappers under `app/<slug>/`, the landing page, a CLAUDE.md
bullet, and the two landing screenshots (`scripts/shoot_landing.js`).

Then `npx tsc --noEmit`, `npm run lint`, `npm run build`, and curl the landing, `/og/<id>`,
`/tests` and `/sitemaps/exams` for 200s. Commit only when all of that is green.

## Reviewing an existing bank

Run the validator with no `--pool` flags to get the style report, then a full read for facts.
When fixing a bank with the length problem, shorten keys rather than padding distractors; padding
makes every option a sentence and the bank reads worse. Keys and questionIds never change during
a fix pass, so saved progress stays valid.
