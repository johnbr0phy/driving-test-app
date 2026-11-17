# Independent SecurityX review

Full blind agreement: 240/240. All eight numerical items correct. Options-only: 60/240 (25%); every domain 25%, below the 40% gate. No wrong keys or material technical defects.

One minor clarification completed: ARCHITECTURE001 now explicitly supplies existing network segmentation and requires per-application authorization. The answer and options are unchanged. Rebuilt validator passes.

The reviewer grouped 60 repeated four-option sets and applied a consistent cue heuristic. Exact 25% reflects balanced concept families, not 240 independent statistical trials or proof against every cue. Scenarios support foundational conceptual discrimination; they are not calibrated enterprise-exam difficulty, exhaustive readiness or interactive PBQ practice. Public copy preserves those limitations.

Full frozen answer ledger, independent source verification and findings: review-audit.md.

## Rewrite, 2026-11-17

The bank was first built as option "families" (four questions sharing one option set, each option keyed once), and keys often repeated the stem's words. Both were rewritten: every question now has its own wrong options and no stem echo (`tools/check_option_reuse.py`: 0% shared option sets, echo gain under 0). Keys, ids and test slots are unchanged. The options-only figures above describe the old build.

## Second review, 2026-11-17

240 questions answered blind from stem and options only; 240/240 agreed with the key, all eight numeric items recomputed (OPERATIONS-041 to 048) and correct. No wrong keys, outdated rules or unclear stems found.

One fix, in `build.py` (not content): the key position was a strict repeating cycle (A, B, C, D, A, B, C, D ... for all 240 in id order), so a student answering in order could predict every answer. The key slot is now a seeded, balanced shuffle per domain (60 each of A to D overall, no run of three equal and no ABCD or BCDA run). Stems, options, keys' meaning and ids unchanged; `check_answer_patterns.py` skips v2 so this was not caught by CI.

Checks after rebuild: option reuse OK (0% shared sets, echo gain -1.3), check_banks PASS, v2 validator clean.
