# ServiceNow CSA independent review

All 200 stems independently answered before key comparison: 200/200 agreement, including all 16 choose-two items. Zero mandatory findings. Options-only accuracy 46/200 (23%); Navigation25%, Configuration25%, Collaboration15%, Automation27.5%, Database23.21%, Migration25%. All pass the 40% gate.

Official blueprint, current product behavior and public scope/cut-score copy independently verified. Full all-item ledger and source checks: review-audit.md. Fifty repeated option families are correlated; this heuristic audit is not proof against every cue, calibrated difficulty or hands-on readiness. No unresolved material content findings.

## Rewrite, 2026-11-17

The bank was first built as option "families" (four questions sharing one option set, each option keyed once), and keys often repeated the stem's words. Both were rewritten: every question now has its own wrong options and no stem echo (`tools/check_option_reuse.py`: 0% shared option sets, echo gain under 0). Keys, ids and test slots are unchanged. The options-only figures above describe the old build.

## Second review, 2026-11-17

200 questions answered blind from stem and options only; 200/200 agreed with the key (including all 16 choose-two items). Platform facts re-checked against ServiceNow docs: Visual Task Board types (Freeform, Flexible, Guided), the "Total" list calculation, and the Security posture console (best practices, never logged-in users, privileged accounts, My Security Tasks).

Fix: SERVICENOWCSA-DATABASE-049 (database.py). The distractor list_edit is arguably also allowed by "correct approved values", so a second defensible answer; replaced with create. Key unchanged (read, write).

Not changed: the keys follow a fixed 0,1,2,3 rotation in source order, harmless because choices are shuffled at runtime. Checks: option reuse OK (0% shared sets), answer patterns OK, check_banks PASS, v2 validator run.
