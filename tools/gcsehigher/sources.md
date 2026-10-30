# GCSE Maths Higher: sources (checked 2026-10-29)

- DfE, GCSE mathematics: subject content and assessment objectives (DFE-00233-2013, published 1 November 2013).
  https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
  Content areas N, A, R, G, P, S; Higher-only content; topic weightings by tier.
- AQA GCSE Mathematics (8300) subject content, which restates the DfE weightings: Higher tier Number 15%,
  Algebra 30%, Ratio, proportion and rates of change 20%, Geometry and measures 20%, Probability and
  statistics 15% (Foundation 25/20/25/15/15).
  https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification/subject-content
- AQA 8300 scheme of assessment: three papers, 80 marks each, each 33 1/3% of the qualification; AO1 40%,
  AO2 30%, AO3 30%. https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification/scheme-of-assessment
- JustMaths assessment information pages (summary of the DfE weightings with the plus or minus 3% tolerance).
  https://justmaths.co.uk/algebra/
- Pearson Edexcel GCSE (9-1) Mathematics 1MA1 grade boundaries, November 2025 (Higher out of 240:
  9 = 211, 8 = 182, 7 = 153, 6 = 119, 5 = 85, 4 = 51, allowed 3 = 34).
  https://qualifications.pearson.com/content/dam/pdf/Support/Grade-boundaries/GCSE/grade-boundaries-november-2025-gcse.pdf
- Pearson Edexcel 1MA1 grade boundaries, June 2025 (Higher out of 240: 9 = 217, 8 = 186, 7 = 156, 6 = 121,
  5 = 87, 4 = 53, allowed 3 = 36), read from the official PDF 2026-10-30. Used for the landing FAQ's
  "53 of 240 (about 22%) for grade 4 and 217 (about 90%) for grade 9".
  https://qualifications.pearson.com/content/dam/pdf/Support/Grade-boundaries/GCSE/grade-boundaries-june-2025-gcse.pdf

Paper format (all three boards): 3 papers x 1 h 30 min x 80 marks; Paper 1 non-calculator, Papers 2 and 3
calculator; Higher tier grades 9 to 4 with an allowed grade 3. Formulae for the volume of a cone, sphere
and pyramid are given in questions; the quadratic formula, sine and cosine rules, 1/2 ab sin C and
compound interest are not given (DfE formulae requirements in the subject content document).

Practice format here: 3 papers x 20 items x 45 min, 3/6/4/4/3 items of number/algebra/ratio/geometry/
statistics per paper (15/30/20/20/15%). All items are original; no board or past-paper item was used.

Validate: python3 -I tools/gcsehigher/build.py && python3 -I tools/validate_v2_bank.py gcsehigher \
  '{"1": {"p1": {"1": 20}, "p2": {"1": 20}, "p3": {"1": 20}}, "2": {"p1": {"1": 20}, "p2": {"1": 20}, "p3": {"1": 20}}}'
