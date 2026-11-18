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

## Stem trim, 2026-11-18

Median stem cut from 23 to 14 words (peers NSW and WA firearms 15); all 200 stems changed. Scenario wrapping and stacked qualifiers dropped; section and regulation references kept wherever the question turns on them. Keys and options unchanged. Keys that alone echo the stem: 4, down from 6. Checks after rebuild: check_stem_length, check_option_reuse, check_answer_patterns --strict, check_banks and validate_bank all pass.

## Review after stem trim (blind, Opus), 2026-11-18

Blind agreement 195/200 after the stem trim. Disagreements: LICENSING-015, LICENSING-041, LICENSING-044, CUSTODY-018, CUSTODY-031. All 49 flagged items re-checked against the SAPS Juta consolidation of the Act (re-downloaded 2026-11-18 with the Sectigo OV R36 intermediate added locally), the 2004 regulations (reg 86(8), 86(11)) and the 2012 amending regulations (Gazette 35047, reg 16(o) collector proviso).

Disagreements (all keys right):
- LICENSING-015: key right, s15(3)(b) three with a s13 licence. Stem now cites s15(3) so the rule is explicit.
- LICENSING-041: key right, s7(4)(b) seven days. No change.
- LICENSING-044: key right, s8(4)(a)(ii) six months. No change.
- CUSTODY-018: key right, reg 86(8) (deemed compliant only if the DFO issues a certificate; "Registrar" replaced by DFO in 2012). Stem now cites reg 86(8); distractor "exempt" reworded; explanation states the rule.
- CUSTODY-031: key right, 2012 proviso to reg 86(11)(a) (collector, one loaded firearm in the safe for self-defence). Stem rewritten to name reg 86(11)(a) and ask the rule directly; new options.

Trim ambiguities and giveaways fixed:
- LEGAL-002: key now "the DFO for their area" (s9 wording), separating it from the station commander distractor.
- LEGAL-024: vague "part of what?" stem replaced with s120(9)(f): knowingly false address in an application is an offence.
- LEGAL-039: key reworded ("still applies until the outcome"), s104(1)(b) cited.
- LICENSING-054: giveaway (no reason / why) rewritten to ask which s7(5) requirement is unmet; key "a clearly stated intended purpose".
- LICENSING-055: distractor "ten-year end date" (also a time limit) replaced; s7(5)(c) cited.
- CUSTODY-006: giveaway rewritten; stem names reg 86(4) and the items given, key "the reason for the storage".
- CUSTODY-012: giveaway rewritten to ask who may store another holder's firearm under reg 86(4)(a).
- CUSTODY-024: giveaway rewritten; key "exclusive access to the safe" (reg 86(11)(b)), distractors are other real duties not breached.
- CUSTODY-030: circular stem rewritten as a direct yes/no on reg 86(11)(a) for a s13 firearm.
- DUTIES-042: explanation cites s120(2)(b). LICENSING-014 and LICENSING-016 read clearly with s15(3); no change.

All other flagged items (LEGAL-037, 038; LICENSING-007, 009, 010, 011, 017, 021, 022, 032, 038, 039, 040, 060; CUSTODY-013, 015, 019, 029, 038; DUTIES-002, 004, 006, 007, 008, 023, 032, 037, 039, 041, 043, 048, 050): keys match the provisions recorded in the third review; the flags were reviewer memory gaps. No change.

Checks after rebuild: check_stem_length (median 14), check_option_reuse (0% shared, 4 echo keys, all pre-existing), check_answer_patterns --strict, check_banks, validate_bank, check_option_refs and build-training-parts --check all pass.
