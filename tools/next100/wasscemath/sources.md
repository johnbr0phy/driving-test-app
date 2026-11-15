# WASSCE General Mathematics / Mathematics (Core): sources

Checked 2026-11-15. All 200 questions are original, written for Tigertest from the syllabus topics
below. No WAEC past question (widely posted online) and no prep-site or textbook question was used,
and the bank was compared with the JAMB Mathematics bank (`data/v2/jambmath/questions.json`) so no
fact-and-number pair repeats (six near matches were rewritten: the fraction sum, the 2 : 3 : 4
sharing, the trapezium, similar areas, the alternate segment angle and the partial variation
scenario).

## Owner (WAEC)
- WAEC Nigeria FAQ, https://www.waecnigeria.org/index.php/node/9?page=0 (fetched 2026-11-15):
  for 2026 and 2027 WASSCE entries candidates sit two core subjects, English Language and
  General Mathematics, plus six or seven other subjects. It says nothing about the Mathematics
  paper's format.
- WAEC's own sites (waecnigeria.org, waecgh.org) do not serve the subject syllabus, so the
  syllabus and the paper format come from WAEC's syllabus document as reproduced by the sites
  below. The user approved building from these copies.

## The syllabus document (WAEC's text, as published by third parties)
- waecsyllabus.com, Mathematics page, https://waecsyllabus.com/mathematics/ (fetched
  2026-11-14), an independent guide that says it is not affiliated with WAEC; it notes that it
  follows the syllabus WAEC Nigeria examines and that WAEC Ghana sets its own subject list and,
  from 2026, separate New Curriculum papers.
- The WAEC syllabus PDF it hosts, "GENERAL MATHEMATICS OR MATHEMATICS (CORE)",
  https://waecsyllabus.com/files/ssce/GENERAL%20MATHEMATICS%20OR%20MATHEMATICS%20%28CORE%29.pdf
  (fetched 2026-11-14, read with pdftotext).
- Second and third copies with the same text (fetched 2026-11-15):
  https://zenodo.org/records/3745446/files/GENERAL%20MATHEMATICS%20OR%20MATHEMATICS%20(CORE).pdf
  and https://rachel.core2learn.org/modules/en-wassce/WASSCESYLABUS/GENERAL_MATHEMATICS_OR_MATHEMATICS%20_CORE.pdf
  (the RACHEL offline WASSCE library). The examination scheme, calculator rule and topic list
  agree word for word.

## What the document says (used in the config, landing and examFacts)
- Paper 1: fifty multiple-choice objective questions drawn from the common areas of the
  syllabus, answered in 1 1/2 hours for 50 marks.
- Paper 2: thirteen essay questions in Sections A (five compulsory, elementary, 40 marks, common
  areas) and B (eight longer questions, answer five for 60 marks; at most two may come from parts
  of the syllabus not peculiar to the candidate's country); ten questions in all, 2 1/2 hours,
  100 marks. Not modelled.
- Calculators: non-programmable, silent and cordless calculators are allowed; phones are not;
  some questions may prohibit tables or calculators. WAEC-approved mathematical and statistical
  tables may be used. So the practice tests have the calculator on.
- Currencies named: dalasi (The Gambia), cedi (Ghana), Liberian dollar, naira (Nigeria), leone
  (Sierra Leone). Word problems use naira and cedis.
- Topics: A Number and Numeration (number bases; modular arithmetic; fractions, decimals and
  approximations; indices and standard form; logarithms with tables; sequences and series, sum of
  an A.P. included and sum of a G.P. excluded; sets with Venn diagrams of at most 3 sets; logical
  reasoning; positive and negative integers and rational numbers; surds; matrices and
  determinants; ratio, proportion and rates; percentages, compound interest limited to 3 years;
  financial arithmetic; variation), B Algebraic Processes, C Mensuration, D Plane Geometry,
  E Coordinate Geometry of Straight Lines, F Trigonometry, G Introductory Calculus, H Statistics
  and Probability, I Vectors and Transformation.
- The document marks some topics with symbols (asterisks, diamonds, clubs, spades and bullets)
  without a legend in any of the three copies. Paper 2 Section B refers to "parts of the syllabuses
  which may not be peculiar to candidates' home countries", so the marked parts are taken as not
  common to every country and are left out of this bank, since Paper 1 is drawn from the common
  areas: matrices and determinants, financial arithmetic, binary operations, functions and
  relations, completing the square and the quadratic formula, tangents to curves, graphical
  inequalities in two variables, the sine and cosine rules, longitudes and latitudes,
  construction, loci, the intercept theorem, bearings, introductory calculus, standard deviation
  of grouped data, probability without replacement, and vectors and transformation.

## Blueprint (Tigertest's)
WAEC publishes no count per topic. Per 50-question test: 6 number (bases, modular arithmetic,
fractions, approximation, standard form, directed numbers), 5 indices/logarithms/surds,
5 sets/logic/sequences, 6 ratio/percentages/variation, 8 algebraic processes, 6 mensuration,
5 plane geometry, 4 coordinate geometry and trigonometry, 5 statistics and probability.

## Checking
Every key is recomputed by `build.py` (a number, a function of x, or a string built from the
computation); 6 concept items (logical reasoning, congruence, quadrilateral properties) were
checked by hand. All-number options are sorted and locked. Exact trigonometric values, circle
theorems and mensuration formulas are standard results.

## Grades
- WAEC grades WASSCE subjects on the nine-point scale A1 to F9 (WAEC circular reported by GNA: https://www.ghanaweb.com/GhanaHomePage/NewsArchive/WAEC-explains-new-grading-system-under-WASSCE-114576). No WAEC table of marks to grades was found; that is Tigertest's observation.
