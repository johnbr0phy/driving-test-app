# Missouri state version: review record (2026-11-18)

All reviews are model reviews; no human expert review is claimed.

## Build
- Research and the 40 Missouri items were written from the PSI Missouri candidate handbook (7/18/2024), RSMo 339 and other statutes, and 20 CSR 2250, all read on 2026-11-18 (see mo.md).
- 100 national items picked at PSI's salesperson weights; 12 excluded for conflict with Missouri law (mo.md lists them).
- National stems were shortened for this form (question overrides in mo-national.json, keys and options unchanged), so the bank's median stem is 16 words.

## Blind key review
An independent reviewer answered all 140 items with no keys and the official sources only: 140 of 140 matched the key. Flags and what was done:
- RE-VAL-008: the stem described highest and best use in its own words. Rewritten around the four tests.
- RE-CON-034: one wrong option ("The broker hiring new staff") was obviously not a termination event. Replaced with "The listing salesperson leaving the brokerage", a real misconception.
- REMO-MOGEN-001: the definition of commercial real estate is in the statute (RSMo 339.710), not the rules. Stem now says license law.
- RE-PROP-014 (metes and bounds, "point of beginning"): kept. The term is the knowledge being tested.
- REMO-MOBUS-015: medium confidence because 8.150(2) keeps each broker responsible when a title company closes; the key follows 8.150(1), which puts delivery on the listing broker.

## Options-only review (tools/options_only.py)
96 of 140 right (69%, ceiling 82%): K 58/62, S 0/0, G 38/78. No surface-cue hits. PASS.
