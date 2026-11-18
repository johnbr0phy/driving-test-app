# AGENTS.md

Instructions for coding agents other than Claude Code (Codex, ChatGPT and others) working in this
repository. They are the same rules Claude Code follows.

1. **Read `CLAUDE.md` first.** It is the project guide: architecture, routing, the exam registry,
   the house style and the checks every PR must pass. Everything in it applies to you.
2. **Building or changing a practice test or question bank:** follow
   `.claude/skills/exam-bank/SKILL.md` step by step, and its wiring checklist in
   `.claude/skills/exam-bank/references/wiring.md`. A run that builds several tests also follows
   `.claude/skills/build-tests/SKILL.md`.
3. **Before you open a PR, run `bash scripts/automerge-checks.sh`.** It is the same list of checks
   CI runs. Do not lower a threshold or add your bank to a baseline file to make a check pass.

## Question writing: rules that were broken before

- **Every question has its own four options.** Never generate questions in groups that share one
  option set ("families" or "quartets", each option keyed once). `tools/check_option_reuse.py`
  fails a bank where more than 10% of questions share an exact option set.
- **The key must not be the only option that repeats the question's words.** Picking that option
  must not beat guessing (`tools/check_option_reuse.py`, echo gain limit 4.5 marks per 50, aim for
  2 or less).
- **Wrong options are plausible mistakes written for that question**, not options borrowed from
  other questions, and the key is not the longest option by habit.
- **No word marks the key** across the bank (`tools/check_answer_patterns.py`).
- **Edit the bank's source files** (under `tools/`) and rebuild; never hand-edit only the built JSON.
- **Every fact comes from the exam owner's official documents**, recorded in the bank's
  `sources.md`. Never from prep sites, sample questions or memory.
- **Short stems**: say the fact or situation and the ask, nothing more (median 12 to 18 words; `tools/check_stem_length.py`).
- **Landing pages** are copies of the template; **a v2 exam with two tests** holds out only Test 2.
- **An options-only review and perfectly even answer letters do not prove a bank is good.** Review
  stem and options together, as a test-wise candidate would.
- Plain apostrophes, no em or en dashes, and never refer to an option by its position.
