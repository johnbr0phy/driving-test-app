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

## Third review (blind, Opus), 2026-11-17

Blind agreement: 240/240. Nine items were listed (low confidence or a flagged issue); no key was wrong. Changes are in the source `.py` files and the bank was rebuilt; keys, ids and test slots unchanged.

- GRC-001: giveaway (key a noun phrase among imperatives). Key reworded to "Map each obligation to the controls and artifacts proving it".
- ARCHITECTURE-041: wording misled (stem blames the tenant policy, key fixed a bucket ACL, which may not override a policy grant). Key now "Revoke the anonymous read permission in that policy".
- ENGINEERING-007: giveaway (key phrased unlike the others). Key now "The device health attestation from the laptop".
- ENGINEERING-010: stem asked for a "dimension" but options are actions. Stem now asks "Which change corrects the excess access?".
- ENGINEERING-039: mild echo ("restore" / "Recovery"). Stem now says the mechanism replaces the damaged image with a verified copy; explanation adjusted.
- ENGINEERING-049: key was an absolute ("takes priority over any control"). Key now "The control must not impair the validated safety function"; explanation adjusted.
- OPERATIONS-033: key echoed "limit further harm". Key now "Containment of the attacker".
- OPERATIONS-035: key "Restoring operations under watch" echoed the stem and did not read as a phase name. Key now "Recovery after eradication"; stem's "recovery copy" now "backup copy".
- OPERATIONS-038: unclear antecedent in "Redact them". Key now "Redact the secrets before they are written".

Checks after rebuild: check_option_reuse OK (0% shared sets, echo gain -1.4), check_answer_patterns --strict no patterns, check_banks PASS, validate_v2_bank 240 questions, 0 problems.
