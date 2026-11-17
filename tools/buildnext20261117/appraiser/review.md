# Independent appraiser review

All200 independently solved answers agree with the keys. Options-only accuracy50/200(25%), and25% in each of nine domains. Review used separately randomized blind inputs and recorded answers before key access.

Two precision findings fixed: USPAP019and020 now explicitly specify assignment-related testimony in a judicial proceeding. Keys unchanged. No other required changes or arithmetic errors;55 explicit derivations checked. Detailed all-item ledger and source audit: review-audit.md.

The initial bank passed the cue gate. Introductory/applied difficulty is disclosed, with no calibrated difficulty or comprehensive mastery claim. Rebuilt bank validator passes after wording corrections.

## Rewrite, 2026-11-17

The bank was first built as option "families" (four questions sharing one option set, each option keyed once), and keys often repeated the stem's words. Both were rewritten: every question now has its own wrong options and no stem echo (`tools/check_option_reuse.py`: 0% shared option sets, echo gain under 0). Keys, ids and test slots are unchanged. The options-only figures above describe the old build.

## Second review, 2026-11-17

200 questions solved blind from stems and options only, with every number recomputed (market, sales, cost, income, statistics, USPAP retention dates). 200/200 agreed with the keys. No fixes needed. USPAP facts rechecked against the 2024 edition text (still the current edition per appraisalfoundation.org/pages/uspap): Standard 3 covers review development and reporting, retention is 5 years or 2 years after final disposition of testimony, the procurement-fee disclosure omits the amount, and a Restricted Appraisal Report names additional intended users. Checks: option reuse OK (0% shared, echo gain -2.9), answer patterns OK, check_banks PASS, validate_bank PASS.

## Third review (blind, Opus), 2026-11-17

Blind agreement 199/200. Three items listed for adjudication:

- APPRAISER-SALES-048 (key "Distinguishing correlation from cause"): no problem. The reviewer agreed with high confidence; the view difference is a confounding variable, and none of the other options describes it.
- APPRAISER-USPAP-006 (key "Hypothetical condition"): key correct. USPAP 2024 defines a hypothetical condition as contrary to what is known to exist on the effective date. To rule out a prospective value opinion, the stem now says the appraisal has a current effective date and construction has not begun as of that date.
- APPRAISER-USPAP-012 (key "Standard 4"): key correct, reviewer wrong. USPAP 2024 (Nebraska Legislature copy, table of contents and Standard text) titles Standard 3 "Appraisal Review, Development" and Standard 4 "Appraisal Review, Reporting"; Standard 3 has covered development only since the 2020-21 edition split. No change. Correction to the second review note above: Standard 3 covers review development, Standard 4 review reporting.

Checks after rebuild: option reuse OK (0% shared, echo gain -2.9), answer patterns OK, check_banks PASS, validate_bank PASS.
