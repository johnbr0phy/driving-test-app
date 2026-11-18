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

## Third review (blind, Opus), 2026-11-17

Blind agreement 260/260. Nine questions were listed (medium confidence, alternatives or notes) and adjudicated:

- CONCEPTS-009: wording. The key now reads "Written sign-off from the third-party owner to test it", so it says the authorization comes from the supplier (the old "scope document" did not, and echoed nothing the stem required).
- CONCEPTS-030: no problem. A quiz checks knowledge of the handoff section; only rehearsal builds the practiced handoff the exercise found missing.
- ACCESS-004: no problem. Location is offered only as a risk signal against the three factor types; no "somewhere you are" option competes.
- RISK-006: weak distractor. "Risk deterrence" (not a treatment) replaced by "Risk escalation", a real treatment option that does not fit the stem.
- RISK-019: giveaway. Stem now asks for the next remediation step; distractors are steps that come after deployment (rescan, close the change record, update the baseline). Key "Install the patch as scheduled".
- INCIDENT-029: key arguable. ISC2 usage often equates a structured walkthrough with a scenario-driven tabletop, so the key is now "A read-through review" (checklist review) and the explanation says a walkthrough or tabletop adds a scenario. Stem no longer says "read".
- INCIDENT-031: invented term. Key "A system recovery drill" renamed "A backup restoration test"; stem says "retained copies of its data".
- NETWORK-022: giveaway. Stem now a hotel Wi-Fi scenario instead of paraphrasing the definition.
- NETWORK-024: echo. Stem now describes a laptop plugged into a meeting room wall jack, no "port".

Rebuilt with build.py. Checks: option reuse OK (0 shared sets, echo 0/60, gain -2.9), answer patterns strict OK, check_banks PASS, v2 validator 260 questions 0 problems.

## Stem trim, 2026-11-18

Median stem length cut from 21 to 17 words; 250 of 260 stems changed (scenario padding and stacked qualifiers removed; asks, keys and options unchanged). Stem-length, option-reuse, answer-pattern, check_banks and validate_v2_bank checks pass.

## Review after stem trim (blind, Opus), 2026-11-18

Blind agreement 250/250 on the changed questions. Three were listed and adjudicated:

- ACCESS-004: no problem. Location is offered only as a risk signal against the three factor types; no "somewhere you are" option competes.
- INCIDENT-032: giveaway. Distractor "A parallel test with no switchover" told the reader it was wrong; now "A parallel test" (the explanation says why it does not move production).
- SYSTEMS-014: MDM was defensible. Stem now says the company must control only its business apps and data on staff-owned phones, which only MAM does.

Rebuilt with build.py. Checks: stem length (median 17), option reuse OK (0 shared sets, gain -3.0), answer patterns strict OK, check_banks PASS, v2 validator 260 questions 0 problems.
