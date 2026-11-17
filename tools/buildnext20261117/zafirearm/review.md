# Independent South Africa legal knowledge review

Initial blind agreement199/200(99.5%). The single mismatch was reviewer error: LICENSING044 correctly keys six months under section8(4)(a)(ii), not the nearby60-day disposal rule. All200 supplied keys supported after statutory verification. Original blind answer remains in the audit.

Options-only51/200(25.5%): Legal11/40(27.5%), Licensing15/60(25%), Custody12/48(25%), Duties13/52(25%). Every domain passes the40%cue gate.

One required wording correction completed: LICENSING037 now says obtain lawful authority before possession, rather than apply before possession. Its matched option family was updated consistently; answer indices unchanged. Rebuilt validator PASS.

Detailed source reconciliation, limitations and all-item ledger: review-audit.md. No provider-difficulty or psychometric-validity claim.

## Rewrite, 2026-11-17

The bank was first built as option "families" (four questions sharing one option set, each option keyed once), and keys often repeated the stem's words. Both were rewritten: every question now has its own wrong options and no stem echo (`tools/check_option_reuse.py`: 0% shared option sets, echo gain under 0). Keys, ids and test slots are unchanged. The options-only figures above describe the old build.

## Second review, 2026-11-17

200 questions answered blind from stems and options; 200/200 agreed with the key on a second pass (one first-pass slip on LICENSING-031, section 15 validity, from memory, corrected on reading the Act). No fixes needed. Checked against the gazetted Firearms Control Act 60 of 2000 (Government Gazette 22214, gov.za scan, OCR'd): ss 6, 9, 11 to 16, 21, 22, 24 to 29, 84, 90, 91, 104, 106, 107, 117 to 120, 133, 140 all match the keys (s15 ten years, s15(3) four or three with s13, s25/26 30 days, s28 30-day notice and 60-day disposal, s29 24 hours and 7 days, s104 24 hours). Not confirmable: LICENSING-041 (s7(4) seven days) and LICENSING-044 (s8(4) six months) do not appear in the 2000 text; they come from the amended consolidation, which could not be re-fetched (saps.gov.za returned 503). Left unchanged. Regulation 86 and 91 items not re-verified (regulations not fetched).

## Third review (blind, Opus), 2026-11-17

Blind agreement 197/200 (disagreements LICENSING-010, LICENSING-015, LICENSING-044). All 35 flagged items checked against the amended consolidated Act (SAPS Juta consolidation, read in full this time, including the 2006 amendments to ss 7 and 8), the 2004 regulations and the 2012 amending regulations (sources.md).

- LEGAL-037: key right, s24(4) as consolidated; explanation now cites s24(4) and the 90-day lodging rule. The 2018 Constitutional Court refused to confirm invalidity of ss 24 and 28, so the text stands.
- LEGAL-038: key right, s12(3) (lapses, returned forthwith). No change.
- LEGAL-039: key right, s104(1)(b). No change.
- LEGAL-040: key right, s21(1)(a). Kept; its near duplicate LICENSING-032 was rewritten.
- LICENSING-006, 007, 009: keys right (ss 25, 26, 29(1)). No change.
- LICENSING-010: key right, s29(2) seven days (blind pick of 30 days was wrong). No change.
- LICENSING-011: key right, s25(1). Kept; near duplicate DUTIES-007 rewritten.
- LICENSING-014, 015: keys right, s15(3)(b) three with a s13 licence (blind pick of four ignores para (b)). No change.
- LICENSING-021, 022: keys right, s21(5) and 21(6). No change.
- LICENSING-028: stem was ambiguous (a reg 86(4) authorisation also names the holder's physical address). Rewritten to ask where the firearm must be stored under reg 86(4)(a)(ii); new options.
- LICENSING-032: near duplicate of LEGAL-040. Replaced with s21(1): any person, including a non-citizen.
- LICENSING-039: key right, s23(6). No change.
- LICENSING-042: stem and explanation now cite s28(3)(a) for the 30 days.
- LICENSING-044: key right, s8(4)(a)(ii) six months (added by Act 28 of 2006; blind pick sixty days was wrong). No change.
- LICENSING-055: key right, s7(5)(c); key reworded so it no longer echoes the stem.
- LICENSING-060: key right, reg 91(2). No change.
- CUSTODY-016: key right, reg 86(4)(d). No change.
- CUSTODY-018: key right, reg 86(8) as amended in 2012 (DFO). No change.
- CUSTODY-019: giveaway (only option naming the regulation). Rewritten from reg 86(5)(c): joint-opening lock-away safe against three plausible single-access storage options.
- CUSTODY-038: key right, s91(2)(a) exempts dedicated hunters and sport shooters and professional hunters. No change.
- DUTIES-002, 004, 006, 022: keys right (ss 29(1), 26, 106(1)(c), 104(2)). No change.
- DUTIES-007: near duplicate of LICENSING-011. Replaced with s25(2): Registrar acknowledges receipt in writing within 30 days.
- DUTIES-023: duplicated LEGAL-039 (s104(1)(b)). Replaced with s104(4): an additional licence holder has 30 days to apply in their own name.
- DUTIES-037, 038, 039: keys right (ss 117, 118(1), 119). No change.
- DUTIES-043: key right, s120(11) station nearest to where it occurred. No change.
- DUTIES-048: key right, s148(2). No change.
- DUTIES-050: key right, s140(2)(c). No change.

Checks after rebuild: check_option_reuse, check_answer_patterns --strict, check_banks, validate_bank, check_option_refs and build-training-parts --check all pass.
