# SSCP independent review summary

Reviewed 2026-11-17. Full independent item ledger and primary-source checks are preserved in `review-audit.md`.

- All 260 stems independently answered before answer-key comparison: 260/260 agreement. All eight numerical items recomputed correctly.
- Options-only longest-choice strategy: 69/260 correct (26.54%). Domain rates: Concepts 25%, Access 27.5%, Risk 27.5%, Incident 30.56%, Crypto 29.17%, Network 22.5%, Systems 25%. Every domain is below the 40% gate.
- One wording finding fixed: NETWORK037 and its option family now explicitly require authenticated, encrypted administrative access. Authentication alone was insufficient wording for protecting the exchange. Keys and intended meaning preserved; rebuilt bank passes the v2 validator with zero problems.
- Current ISC2 format, seven weights, no-backtracking CAT distinction, published 700/1000 standard and absence of raw-percentage conversion independently verified. No format correction needed.

These results are not psychometric validation. There are 65 four-item answer families, creating correlated outcomes and concept overlap between the separately worded tests. The options-only check tests a length cue, not every possible strategy. Questions provide selected conceptual foundation practice, with limited multi-constraint troubleshooting or hands-on interpretation. Product copy explicitly avoids exhaustive coverage, calibrated difficulty, CAT equivalence and readiness claims.

No unresolved material content findings. Remote preview and batch-level integration remain separate gates.

## Rewrite, 2026-11-17

The bank was first built as option "families" (four questions sharing one option set, each option keyed once), and keys often repeated the stem's words. Both were rewritten: every question now has its own wrong options and no stem echo (`tools/check_option_reuse.py`: 0% shared option sets, echo gain under 0). Keys, ids and test slots are unchanged. The options-only figures above describe the old build.

## Second review, 2026-11-17

All 260 questions answered blind from stem and options (picks written to the scratchpad), numbers recomputed (RISK-037 to 040 percentages, INCIDENT-033 to 036 RTO/RPO). Agreement 260/260. No confirmed problems, so no fixes and no rebuild. Single-key echo only on NETWORK-024 (key echoing the stem, a rogue endpoint on a wired port); left because it is the only natural answer. Checks: option reuse OK (0% shared sets, echo gain -2.7), check_banks PASS, v2 validator run.
