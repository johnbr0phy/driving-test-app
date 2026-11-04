# Praxis Elementary Education: Multiple Subjects (5001) bank sources

Checked 2026-11-04.

## Official

- ETS, The Praxis Study Companion, Elementary Education: Multiple Subjects (5001), copyright 2024,
  read directly (PDF):
  https://praxis.ets.org/on/demandware.static/-/Library-Sites-ets-praxisLibrary/default/pdfs/5001.pdf
  (same file at https://www.ets.org/pdfs/praxis/5001.pdf)
  - Test at a Glance: 4 hours 35 minutes, four separately timed subjects; selected-response and
    numeric-entry questions; computer delivered.
  - 5002 Reading and Language Arts: 90 minutes, 80 questions, selected response. I Reading 38
    (47%); II Writing, Speaking, and Listening 42 (53%). Single-selection multiple choice with four
    choices plus at least four innovative item types (multiple selection, order matching, grids).
    Topics: foundational skills (phonological awareness, phonics and word analysis, syllable types,
    high-frequency words, roots and affixes, fluency: accuracy, rate, prosody); literature and
    informational texts (key ideas, theme, inference, summary, structure across genres, point of
    view, firsthand and secondhand accounts, visual and multimedia elements, claims and evidence,
    text complexity: quantitative, qualitative, reader and task, text leveling); writing (types,
    task, purpose and audience, revision, process, developmental stages, digital tools, research
    process, primary and secondary sources, reliable sources, paraphrase vs plagiarism); language
    (parts of speech, usage and mechanics, sentence types, dialects and registers, context and
    roots, figurative language, word choice and tone, three tiers of vocabulary); speaking and
    listening (collaboration, active listening, oral presentations).
  - 5003 Mathematics: 65 minutes, 50 questions, selected response and numeric entry, on-screen
    scientific calculator. I Numbers and Operations 20 (40%); II Algebraic Thinking 15 (30%);
    III Geometry and Measurement, Data, Statistics, and Probability 15 (30%). Topics: place value,
    expanded form, powers of 10, rounding, remainders, fraction operations, products and quotients
    vs factors, unit fractions, order of operations, properties, ordering, conversions, unit rate,
    percent, primes, factors and multiples; expressions, distributive property, evaluating,
    equations and inequalities, formulas, dependent and independent variables, patterns and
    arithmetic sequences, linear relationships; angles, shapes, nets, area, surface area, volume
    (fractional edges), effect of doubling dimensions, coordinate plane, elapsed time, customary
    and metric conversions, measures of center and range, data displays, probability.
  - 5004 Social Studies: 60 minutes, 60 questions. I United States History, Government, and
    Citizenship 27 (45%); II Geography, Anthropology, and Sociology 18 (30%); III World History
    and Economics 15 (25%). Discussion topics include the Articles of Confederation, Marbury v.
    Madison, checks and balances, the 10th Amendment, the Mayflower Compact, the Declaration,
    Magna Carta, map projections, weather vs climate, melting pot vs pluralism, Egypt, Greece,
    Athens and Sparta, Rome, twentieth-century global culture.
  - 5005 Science: 60 minutes, 55 questions, on-screen scientific calculator. I Earth Science
    17-18 (33%); II Life Science 18-19 (33%); III Physical Science 18-19 (33%). Built on NSES,
    NSTA and NGSS content.
  - "This test may contain some questions that will not count toward your score."
- ETS, Praxis test page for 5001: https://praxis.ets.org/test/5001.html (checked 2026-11-04):
  subtests 5002, 5003, 5004, 5005; 245 questions; 4 hours 35 minutes with four separately timed
  subjects; selected-response and numeric-entry; computer delivered at a test center or at home
  online; the combined test lets a candidate take all four subtests in one session. The page also
  announces the new Elementary Education Fundamentals tests (launching spring 2026).
- ETS, Praxis Steps EPP FAQ (PDF), checked 2026-11-04:
  https://praxis.ets.org/on/demandware.static/-/Library-Sites-ets-praxisLibrary/default/pdfs/praxis-steps-epp-faq.pdf
  "The Elementary Education Fundamentals tests are designed to replace the following tests, which
  are targeted to retire August 2028": Elementary Education: Multiple Subjects (5001; subtests
  5002, 5003, 5004, 5005), along with 7001, 5901 and 7811. Whether an existing 5001 score counts
  toward a state's requirement after the switch is a state decision.
- ETS, Elementary Education V5 flyer (PDF), checked 2026-11-04:
  https://praxis.ets.org/on/demandware.static/-/Library-Sites-ets-praxisLibrary/default/pdfs/Elementary-Education-V5.pdf
  "The redesigned tests will replace the following Elementary Education series of tests: 5001,
  7001, 5901, 7811."
- ETS score requirements: https://praxis.ets.org/scores. ETS does not set passing scores; each
  state or licensing agency sets its own qualifying score for each subtest. Guides report subtest
  cut scores mostly in the mid to high 150s on the 100 to 200 scale; not confirmed from an
  official table, so the landing only says "set by each state".

## Modelling decisions

- 245 questions are too many to be useful as one sitting here, so each practice test is 50
  questions with the subtests in proportion to their share of the 245 (17 RLA, 10 maths, 12 social
  studies, 11 science) and each subtest split by its ETS content categories. The real test is four
  separately timed and separately scored subtests; the landing and config say so.
- Single-answer, four-option items only. Multiple-selection, order-matching, grid and
  numeric-entry items are written as single-answer questions; images, graphs and maps are
  described in words.
- Content knowledge only. Pedagogy belongs to Praxis PLT (5622, `data/praxis-plt-questions.json`).
  Checked against `data/praxis-plt-questions.json`, `data/texes-ppr-questions.json`,
  `data/v2/praxis/questions.json`, `data/philippines-let-questions.json`, `data/v2/ctet`,
  `data/v2/ged`, `data/v2/apgov` and every `data/*-questions.json` stem for repeats; the items that
  matched (15% off an $80 jacket, slope 2 from two points, a Civil War soldier's letter, the
  3/5/2 marbles bag, the Tenth Amendment reserve-powers stem, the largest ocean, demand rising
  with fixed supply, "each of the ... has" agreement) were rewritten with new numbers or facts.
  Review pass (2026-11-04) rewrote five more that repeated a GED or LET fact: the 24-ounce
  $3.60 unit price, the plant-only cell wall, igneous rock from cooling magma, the First
  Amendment freedoms and Congress declaring war.
- All maths keys are recomputed by `assert` lines at the top of each maths and science source file,
  run on every build. The sample questions in the Study Companion were not reused.
- Every item is original. Not affiliated with ETS or the Praxis program.
