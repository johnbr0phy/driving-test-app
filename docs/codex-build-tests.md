# Building tests with Codex / ChatGPT

How a coding agent that is not Claude Code builds Tigertest practice tests. John runs it by hand.
It follows the same rules as Claude's `/build-tests` run; this file only says what differs.

John starts a run by saying: **"Read docs/codex-build-tests.md and build these tests: id, id, id"**.
The ids come from `tools/queue/backlog.json`. No ids given: stop and ask for them. Do not run
`scripts/build-queue.ts` and do not ask for the database key.

## Rules

1. **Read first, in this order:** `AGENTS.md`, `CLAUDE.md`, `.claude/skills/build-tests/SKILL.md`,
   `.claude/skills/exam-bank/SKILL.md`, `.claude/skills/exam-bank/references/wiring.md`,
   `docs/claude/v1-engine.md` (or `v2-engine.md` for a v2 pick). Do not read other exams' banks or
   notes files unless a step tells you to: they are large and cost credits for nothing.
2. **Your own worktree, never John's folder.** Claude sessions edit `~/driving-test-app` live.

   ```bash
   cd ~/driving-test-app && git fetch origin
   git worktree add ~/tt-codex-<date> -b codex/build-tests-<date> origin/main
   cd ~/tt-codex-<date> && npm ci
   ```

   Commit after each test is complete, so a stopped run loses nothing.
3. **At most 4 tests per run, built one after another.** One PR at the end, titled
   "N new tests: A, B, C" with the table `build-tests/SKILL.md` step 4 describes. Never merge it,
   never push to main. A PR with new tests always waits for John.
4. **Skip an id** that is already in `lib/testCatalog.ts`, is not in the backlog, or already has an
   open PR (`gh pr list --search "<id>"`): a Claude session may be building it. Say so and move on.
5. **`idBase`:** the next unused hundred above the highest `idBase` in `lib/exams.ts` on
   `origin/main`, one block per v1 pick. Right before opening the PR, `git fetch` and check again:
   if main now uses your block, move to the next free one and rebuild.
6. **Sources:** only the exam owner's official outline, handbook or primary law, fetched in this
   run and recorded in the bank's `sources.md`. If it cannot be read, mark the pick failed with the
   reason and go to the next. Never write from prep sites, sample questions or memory.
7. **Stop means stop.** Commit what is complete, push, and report done / half built / not started.

## The second review

The agent that wrote a bank cannot review it. For every bank:

```bash
python3 -I tools/blind_answers.py make <bank> <dir>
```

Then start a **fresh session with no memory of the build** (a new `codex exec` run, or a subagent
if you have them) that is given only `<dir>/rev/`, answers every question without the key and
recomputes every number. Then `python3 -I tools/blind_answers.py score <dir>` and settle every
disagreement against `sources.md`. A second fresh session does the options-only pass
(`tools/options_only.py`). Run the scripts `build-tests/SKILL.md` step 3 lists
(`check_option_reuse.py`, `check_length_rank.py`, `check_stem_length.py`) and fix what they find
in the bank's source files, never by raising a limit or adding the bank to a baseline.

If you cannot start a fresh session, say so in the PR body under "Second review: NOT DONE" and do
not write an entry in `tools/queue/reviews.json`. A Claude session will do the review before John
merges.

## Before the PR

```bash
bash scripts/automerge-checks.sh
```

Plus `tools/check_sources.py` and `validate_bank.py` (v1) or `validate_v2_bank.py` (v2) per test.
Vercel previews are off, so do not wait for one: say in the PR that the production build and the
landing screenshots are not checked. Steps 5 (progress sheet) and the `--mark` commands need the
database key: skip them and list the ids in the PR body so a desktop Claude session can record
them.

## Report

A few plain lines for John: the PR link, each test in it, each id skipped or failed and why, and
whether the second review was done. No em-dashes; "Tigertest" spelled that way.
