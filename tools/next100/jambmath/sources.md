# JAMB UTME Mathematics: sources

Checked 1 November 2026.

## Official
- JAMB home page, https://www.jamb.gov.ng/ : points to IBASS (Integrated Brochure and Syllabus
  System, https://ibass.jamb.gov.ng) for the syllabus and brochure; states the 2026 minimum
  admission scores (150 for universities, 100 for polytechnics and colleges of education). IBASS is
  a script-rendered app and could not be read by the fetch tool (same as for jambeng), so the
  syllabus and format below come from guides that reproduce them.
  Retried in review on 1 November 2026 (https://ibass.jamb.gov.ng/Syllabus): the page still
  returns only its title, so the format stays labelled "guides say".
- 2026 minimum scores (policy meeting of 11 May 2026), as reported by ICIR
  (https://www.icirnigeria.org/cut-off-mark-for-varsity-admission-remains-150-says-jamb/) and NAN
  (https://nannews.ng/jamb-fixes-2026-cut-off-marks-sets-deadline-for-admissions/); see
  tools/next100/jambeng/sources.md. Used only in the landing FAQ, dated "for 2026 admissions".
- No 2027 UTME registration dates or brochure had been published as of 1 November 2026 (search of
  news and guide sites; guides expect registration from late January 2027).

## Syllabus (guides reproducing the JAMB UTME Mathematics syllabus)
- Examkits, "JAMB Mathematics Syllabus 2026: Updated UTME Topics, Content & Exam Guide",
  https://examkits.com/blog/wp-json/wp/v2/posts/10184 (read 1 November 2026). Five sections:
  - I Number and Numeration: number bases (operations in bases 2 to 10, conversion including
    fractional parts); fractions, decimals, approximations and percentages (significant figures,
    decimal places, percentage error, simple interest, profit and loss, ratio, proportion and
    rate, shares and VAT); indices, logarithms and surds; sets (types, algebra of sets, Venn
    diagrams).
  - II Algebra: polynomials (change of subject, factor and remainder theorems, factorisation,
    roots up to degree 3, one linear and one quadratic simultaneous equations, graphs);
    variation (direct, inverse, joint, partial, percentage increase and decrease); inequalities
    (linear, quadratic with integral roots); progressions (nth term, sums of AP and GP, sum to
    infinity); binary operations (closure, commutativity, associativity, distributivity, identity
    and inverse); matrices and determinants (up to 3 x 3, inverse of 2 x 2).
  - III Geometry and Trigonometry: Euclidean geometry (angles, polygons, circle theorems, cyclic
    quadrilaterals, intersecting chords, construction); mensuration (plane figures, arcs, chords,
    sectors, segments, surface areas and volumes, the earth as a sphere: longitudes and
    latitudes); loci; coordinate geometry (midpoint, gradient, distance, parallel and
    perpendicular lines, equations of lines); trigonometry (ratios, elevation and depression,
    bearings, areas and solutions of triangles, sine and cosine graphs, sine and cosine rules).
  - IV Calculus: limits; differentiation of algebraic and simple trigonometric functions; rate of
    change; maxima and minima; integration of algebraic and simple trigonometric functions; area
    under a curve.
  - V Statistics: representation of data (frequency distribution, histogram, bar chart, pie
    chart); measures of location (mean, mode, median, grouped data, cumulative frequency);
    measures of dispersion (range, mean deviation, variance, standard deviation); permutation and
    combination (linear and circular, repeated objects); probability (experimental, addition and
    multiplication rules).
- Search summaries of allschool.ng, myschoolgist.com, myeduvantage.com and ulearngo.com (1
  November 2026) list the same five sections. No guide gives an official per-section question
  count; JAMB does not publish one.

## UTME format (guides, as for jambeng)
- 180 objective questions in 2 hours across four subjects: Use of English 60, each other subject
  40; each subject scored out of 100, total 400 (myschoolgist.com, schoolngr.com, ulearngo.com,
  myeduvantage.com search summaries, October 2026; see tools/next100/jambeng/sources.md). No
  negative marking (guides agree). Labelled "guides say" on the landing.

## Calculator (guides and news, 1 November 2026)
- Legit.ng, "UTME 2024: JAMB Allows Calculator, Expert Shares as Exam Begins Today",
  https://www.legit.ng/education/1588602-utme-2024-jamb-calculator-expert-shares-exam-begins-today :
  an on-screen calculator in the CBT software for Mathematics, Physics, Accounts and Economics.
- ulearngo.com, "JAMB UTME: How to Use the On-Screen Calculator For Subjects Like Maths",
  https://ulearngo.com/blog/ng/jamb-2016-how-to-uses-the-on-screen-calculator-for-subjects-like-maths ;
  schoolcontents.info (https://www.schoolcontents.info/2022/03/is-it-true-that-jamb-wont-allow.html):
  personal calculators are not allowed; the on-screen one is basic, not scientific. No official
  JAMB document found. The landing says "guides and news reports say".

## How the facts are used
- 40 four-option questions per subject, scored out of 100: modelled (one 40-item section).
- 2 hours for 180 questions: modelled as 30 minutes for 40 (pro rata), said in the directions and
  on the landing.
- Topic split per test (6/5/5/6/5/4/5/4) is Tigertest's own, labelled so in the config comment
  and on the landing.
- The VAT item gives a hypothetical rate in its stem ("Suppose ... 8%"); no item asserts Nigeria's current
  VAT rate, since rates change.
- JAMB conventions pi = 22/7 and earth radius 6400 km are stated in each stem that needs them.
- Every item is original and every keyed answer is computed and asserted by build.py (198 of 200;
  2 are definitions of loci). No past paper, official sample or commercial app item was used.
- Overlap check: stems' maths expressions and number runs were searched against every other bank
  in data/ and data/v2/ (including jeemain, mhtcet, neet, sat, act, psat, ged, gcsehigher and the
  Nigeria banks); the two near matches found (a perpendicular-line item like one in mhtcet and an
  AP starting 7, 11, 15) were rewritten. The review pass rewrote nine more that shared a
  polynomial, data set, matrix or exact setting with act, gcsehigher, jeemain or nda.
