# PSAT/NMSQT sources

All 211 items are original, written for Tigertest to the published digital PSAT/NMSQT specifications.
None is copied or adapted from College Board materials or from the Tigertest SAT bank (topics that
already appear in `data/v2/sat/` were avoided).

## Test format and content (checked October 2026)
- College Board, PSAT/NMSQT "What's on the test": Reading and Writing and Math overviews,
  https://satsuite.collegeboard.org/psat-nmsqt/whats-on-the-test (digital format since fall 2023).
  - Reading and Writing: 54 questions in two 32-minute modules; Craft and Structure ~28%,
    Information and Ideas ~26%, Standard English Conventions ~26%, Expression of Ideas ~20%.
  - Math: 44 questions in two 35-minute modules, calculator throughout, about a quarter
    student-produced responses; Algebra ~35%, Advanced Math ~32.5%, Problem-Solving and Data
    Analysis ~20%, Geometry and Trigonometry ~12.5% (College Board gives these as approximate
    ranges; third-party summaries agree on the PSDA and algebra shares, one rounds advanced math to
    35% and geometry to 15%). Per 22-item module the bank uses 8 / 7 / 4 / 3.
  - Multistage adaptive by section; the second module is easier or harder depending on module 1.
  - Scores: 160 to 760 per section, 320 to 1520 total.
- National Merit Scholarship Corporation, PSAT/NMSQT Student Guide: Selection Index =
  2 x Reading and Writing + Math, divided by 10 (range 48 to 228); Semifinalist cutoffs are set by
  state each year.

## Scale curves
`lib/v2/exams/psat.ts` uses piecewise-linear raw-to-scaled anchors (an estimate, not an official
table), with the lower-path module capping each section near 560, mirroring how the SAT config caps
its easier path near 610.

## Facts used in passages
Real-world facts were kept to stable, widely documented ones (Petra, Golden Gate Bridge 1933 to 1937,
the 1983 handheld phone, Wangari Maathai and the Green Belt Movement, Lake Superior and Lake Baikal,
synchronous fireflies in the Great Smoky Mountains, Hokusai's Great Wave, the Rosetta Stone, the
Hope Diamond, Hedy Lamarr's 1942 patent and 1997 EFF Pioneer Award, emperor penguins, the tallest
coast redwood, Hubble, Valentina Tereshkova, the Statue of Liberty, Percy Spencer, Marie Curie,
pencil graphite, zebra-stripe and duck-egg experiments, honeyguides). Named researchers in
hypothetical studies (Okoye, Adeyemi, Lindqvist, Mensah, Varga, Novak, Mwangi and others), the towns
of Alder Falls, Marlow, Harlow Bay and Millbrook, and all tables are fictional.
