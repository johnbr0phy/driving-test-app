# Integrator brief: apply the shared-file wiring, build run 2026-11-18 batch 1

Work in `/Users/johnbrophy/tt-b1` (branch `claude/build-tests-2026-11-18-b2`). The banks, wrappers
and landings of each test are already committed. Your job is every shared-file change listed in
each test's `tools/build-run-2026-11-18/<id>/WIRING.md`, applied one test at a time, in the order
given in your prompt. Do not touch `sgsecurity` (held out; its tools folder stays for later).

## Rules
- Read `.claude/skills/exam-bank/references/wiring.md` and CLAUDE.md "To add an exam" / "To add a v2
  exam" first. WIRING.md files are paste-ready but were written separately: re-read the target file
  before each paste, insert at the place named, keep ordering (EXAMS array, hub groups, CLAUDE.md
  bullets near their siblings), and never duplicate a block.
- **Hues are settled; use these, not the WIRING.md suggestions:** nailtech 331 85% 36%, linuxplus
  39 25% 42%, ea2 49 20% 22%, ea3 82 25% 22%, cahambasic 356 30% 46%, carscook 350 100% 32%. Others
  are given in your prompt. Derive the other nine --brand* values the way the neighbouring blocks
  do, write the same hue into any v2 config colour field, then run
  `python3 -I tools/gen_dark_brand_css.py`.
- Hub group order: ea1, ea2, ea3 together; Red Seal trades together; nailtech after barber.
- Search aliases: add a case per new test to `tests/test-search-aliases.test.cjs` only where the
  WIRING.md proposes one; keep every existing alias test passing (do not move "enrolled agent" off ea1).
- `lib/seoDates.ts`: bump `EXAM_LANDINGS_UPDATED_AT` once to 2026-11-18 naming the new tests.
- Generated files, once at the end: `npx tsx scripts/build-training-parts.ts`,
  `python3 -I tools/build_exam_sources.py`, `npx tsx scripts/build-landing-dates.ts`, and for v2 put the
  bankSizes lines in by hand (do not run validate_v2_bank.py, it rewrites the file).
- Do not run `npm run build`, `next build`, `next dev` or Playwright. Do run, once at the end and
  one at a time: `npx tsc --noEmit -p .`, `npm run lint`, `npm test`, `python3 -I tools/check_banks.py`,
  `bash scripts/automerge-checks.sh`. Fix what fails in the wiring; if a failure is in a bank, report
  it instead of editing the bank.
- Commit after each test's wiring (`git add` explicit paths, never `-a`), message
  "<id>: wire shared files", ending with the two trailer lines in your prompt.
- Python is 3.9 here: run 3.10-syntax tools from a scratch copy with `from __future__ import annotations`.

## Finish
Print: tests wired, generated files rerun, each check's result (pass/fail with the failing lines),
and anything you could not apply.
