---
name: build-tests
description: Start a run that builds the next Tigertest practice tests toward the 1,000-test goal. Picks the top candidates from live data, builds each one end to end with the exam-bank skill, has a second reviewer check every question, opens one PR, and updates the progress sheet. Use when John says "start the builds", "build tests", "build the next N tests" or types /build-tests, with an optional number (default 6) and optional test ids.
---

# Build tests

John starts this by hand, from his phone or desktop, and stops it by saying stop. There is no
schedule. `/build-tests` builds 6 tests; `/build-tests 10` builds 10; `/build-tests cphq,ptcb2`
builds exactly those backlog ids. Never more than 12 in one run.

Rules that hold for the whole run:

- **Work from current main.** `git fetch origin` and branch from `origin/main` (`claude/build-tests-<date>`).
  Never build on a stale checkout.
- **Never touch main directly and never merge.** One PR at the end. A PR with new tests always
  waits for John.
- **Stop means stop.** If John says stop, finish nothing new: commit what is complete, push, and
  report which tests are done, which are half built (left out of the PR) and which never started.
- **Skip, do not guess.** If the exam owner's official outline, handbook or primary law cannot be
  read (blocked site, timeout, no document), mark the candidate failed with the reason and move
  to the next one. Never write a bank from prep sites or memory.
- Write to John in plain words, no em-dashes, "Tigertest" spelled that way.

## 1. Pick

**The database key is never put in a cloud session, on purpose** (John, 2026-11-15: a session that
reads outside websites should not hold a key to the live database). So there are two ways to pick:

- **Ids given** (`/build-tests bcba,rpt`, the normal way from a phone): John got the list from a
  desktop session that ran the ranking. Do not run `scripts/build-queue.ts`. Read each id's entry
  in `tools/queue/backlog.json` (name, owner, region, engine, siblings). An id that is not in the
  backlog, or is already in `lib/testCatalog.ts`, is skipped with a line saying why. For each v1
  pick choose a free 100-wide `idBase`: the next unused hundred above the highest `idBase` in
  `lib/exams.ts`, one block per pick.
- **A number or nothing** (`/build-tests 6`): this needs the ranking, which needs
  `FIREBASE_SERVICE_ACCOUNT_KEY`. Where the key is present (John's desktop):

  ```bash
  npx tsx scripts/build-queue.ts --count <N>
  ```

  It ranks the backlog from live answers, paywall views, purchases and failed searches and writes
  `audits/build-queue/<date>.md` and `.json` (each pick with its engine and, for v1, a free
  `idBase`). Where the key is missing, do not ask for it and do not pick in file order: tell John
  to ask a desktop session "what should we build next?" and come back with ids.

Tell John the picks in one short list before building, then carry on without waiting.

## 2. Build each pick

For each pick, follow the `exam-bank` skill in full (`.claude/skills/exam-bank/SKILL.md` and
`references/wiring.md`): step 0 research with `sources.md`, the bank, the validator, the config,
routes, landing, facts, catalog entry, theme, search aliases, CLAUDE.md entry.

- Run picks as parallel subagents where the session allows it, at most 4 at a time, each in its
  own worktree or on its own files. Shared files (`lib/exams.ts`, `lib/testCatalog.ts`,
  `app/globals.css`, `types/index.ts`, `i18n/*`, `CLAUDE.md`, the generated JSON files) are merged
  by you afterwards, one test at a time, and the generated files are regenerated once at the end.
- Price follows the standing rule: career, licence and government-job exams are Premium (v1 locks,
  or `PREMIUM_V2_IDS` for v2); school, college-entrance and children's tests are free.
- A new theme must pass the hue clash rule against every theme on main and in this run.

## 3. Second review

Every bank gets a blind review by a reviewer that did not write it: it answers every question
without the key, recomputes every number, and lists disagreements. It also does an options-only
pass (see the exam-bank skill): reading only the options, category by category, a guess
that beats 40% means the options carry a cue, and those items are rewritten. Check each finding against the
official source, fix real ones in the bank's source files and rebuild. Then fact-check the landing
and `examFacts` against the owner's pages.

Record it in `tools/queue/reviews.json`:
`"<id>": [{ "date": "YYYY-MM-DD", "kind": "blind review at build", "pr": <number>, "findings": <n> }]`.

## 4. Check and open the PR

```bash
bash scripts/automerge-checks.sh
```

Plus, per test: `tools/check_sources.py`, `validate_bank.py` (v1) or `validate_v2_bank.py` (v2).
The production build is checked with a Vercel preview of the branch (push, wait for READY), not a
local build. Curl the preview for each landing, `/og/<id>`, the dashboard and `/tests`, and take
the landing screenshots against it.

Open one PR titled "N new tests: A, B, C" with the table the earlier batches used (exam, route,
engine, bank size, pass mark as the owner states it, price), the review findings per test, what
is not modelled, and the checks run. In the PR body, list every id that went in and every id
that failed with its reason. Where the database key is present, also record outcomes (a session
without the key skips this; the desktop session does it from the PR body):

```bash
npx tsx scripts/build-queue.ts --mark <id> --status pr       # in the PR
npx tsx scripts/build-queue.ts --mark <id> --status failed --note "why"
```

## 5. Update the progress sheet

The Google Sheet "Tigertest: road to 1,000 tests" (id and link in `tools/queue/progress-sheet.json`)
lists every live test with how well its questions have been checked.

```bash
npx tsx scripts/test-progress.ts
```

writes `audits/progress/rows.json`. This step needs the database key, so a cloud session skips it
and says in its report that the sheet is refreshed from the desktop. Where the key and the Google
Sheets tools are both available:

1. Write `rows` to `'All tests'!A2` with `update_values`, in blocks of about 100 rows. Columns W
   and X are formulas already filled to row 2000: never write to them.
2. Set `Summary!B2` to the date as text (`'2026-11-20`).
3. If a country appears that has no row under "By country" on the Summary tab, add a row there
   with the same three formulas as the row above it.
4. Read `Summary!A1:D40` back and check "Tests live" equals the number of rows written.

Run it from main after a merge when you can, so the sheet counts only what is live. If the script
reports `live data: NO`, or the Sheets tools are missing, do not write: tell John the sheet was
not updated and why. Never replace the sheet with a new file; the link must stay the same.

## 6. Report

In a few lines: what is in the PR (with its link), what was skipped and why, the new "Tests live"
count out of 1,000, and anything John has to decide.
