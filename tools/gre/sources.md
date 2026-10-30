# GRE General Test: sources

All 194 items are original. No ETS question, passage or Official Guide item was used or paraphrased.

## Format (checked October 2026)
- ETS, "GRE General Test structure": https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html
  - Shorter test since 22 September 2023, about 1 hour 58 minutes.
  - Analytical Writing: one "Analyze an Issue" task, 30 minutes (not modelled).
  - Verbal Reasoning: section 1, 12 questions in 18 minutes; section 2, 15 questions in 23 minutes.
  - Quantitative Reasoning: section 1, 12 questions in 21 minutes; section 2, 15 questions in 26 minutes.
  - Section-level adaptive: the first section of each measure is of average difficulty; the second section's difficulty depends on performance on the first.
  - No unscored/research section, no scheduled break.
- ETS, "GRE General Test enhancements" (2023): https://www.ets.org/gre/test-takers/general-test/enhancements.html
- ETS, GRE scores: Verbal and Quant 130 to 170 in 1-point increments; Analytical Writing 0 to 6 in half-point increments.
- ETS question-type descriptions (Verbal: text completion with one to three blanks and no partial credit, sentence equivalence with two of six answers, reading comprehension single, select-all-that-apply with three choices and select-in-passage; Quant: quantitative comparison with four fixed choices, one-answer multiple choice with five choices, one-or-more-answer multiple choice, numeric entry).

The 12/18 and 15/23 Verbal timing is on the ETS page; the Quant 21/26 split was confirmed only by third-party summaries in a search (total 47 minutes matches ETS's measure total). Treat as verified-by-consistency.

## Modelling choices
- Second sections come in an easier (`lower`) and a harder (`upper`) variant, chosen at 60 percent on section 1 (8 of 12), like the SAT module 2 in this codebase.
- Scaled scores: `curve()` anchors in `lib/v2/exams/gre.ts`. Not an ETS concordance; the lower path caps near 153 Verbal and 155 Quant.
- Composite "Verbal + Quant" (260 to 340) is how programs commonly read the two scores; ETS reports the measures separately.
- Per test: Verbal section 1 = 4 TC, 5 RC, 3 SE; each section 2 variant = 5 TC, 7 RC, 3 SE. Quant section 1 = 4 QC, 1 numeric entry, 1 multiple answer, 6 problem solving (3 per content area); each section 2 variant = 5 QC, 2 numeric entry, 1 multiple answer, 7 problem solving (arithmetic 4, algebra 4, geometry 3, data analysis 4).
- Quant content areas follow ETS's four: arithmetic, algebra, geometry, data analysis.
