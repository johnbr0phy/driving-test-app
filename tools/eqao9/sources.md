# EQAO Grade 9 Math: sources (checked 2026-10-30)

- EQAO, Grade 9 Assessment of Mathematics page (structure, item types, tools, windows, sample test links).
  https://eqao.com/the-assessments/grade-9-math
  Online on EQAO's e-assessment platform; two sessions (A and B), each two stages, about 60 minutes
  each; 54 questions (50 operational, 4 field test); multi-stage computer adaptive; single selection,
  multiple selection, drag and drop, drop-down menu; built-in calculator (own scientific or graphing
  calculator also allowed); EQAO formula sheet and English-French glossaries in the platform; IRT
  scoring onto levels 1 to 4.
- EQAO, Grade 9 Assessment of Mathematics Framework (PDF, via
  https://www.eqao.com/framework-grade9-assessment-of-mathematics/ ->
  https://www.eqao.com/wp-content/uploads/2025/01/Framework-grade9-assessment-of-mathematics.pdf).
  Blueprint: Number 10 (20%), Algebra 18 (36%, coding included), Data 8 (16%), Geometry and
  Measurement 8 (16%), Financial Literacy 6 (12%). Item types also include key entry. Stage 1 module
  medium; stage 2 module low/medium or medium/high. Categories: Knowledge and Understanding,
  Application, Thinking (not Communication). "Starting in the 2026-2027 school year, students' final
  result from the assessment will be weighted as 20% of their final mark" in MTH1W. Specific
  expectations B1 to F1 listed and used for topic coverage.
- EQAO Grade 9 formula sheet (PDF, revised 2025-10):
  https://www.eqao.com/wp-content/uploads/2021/09/g9-formula-sheet.pdf
  Perimeter/area of circle, parallelogram, rectangle, trapezoid, triangle; a² + b² = c²; surface
  area/volume of cone, cube, cylinder, rectangle-based prism, square-based pyramid, triangle-based
  prism. Restated in words in the config's reference panel.
- Ontario Ministry of Education, Mathematics, Grade 9 (MTH1W), 2021 curriculum (strands B to F),
  as summarized in the framework above.

Not used: EQAO released questions and the EQAO sample test (no item was copied or adapted).

Practice format here: per test, sessions A and B, each 13 stage-1 items (3 number, 4 algebra, 2 data,
2 geometry, 2 financial) and an adaptive 12-item stage 2 (2/5/2/2/1) in a lower and an upper variant,
so each student answers 50 items in the blueprint's 10/18/8/8/6. Field-test items are not modelled.
Drill-only items (test 0) are in session A. Code items use Python, the language most Ontario Grade 9
classes use (the curriculum does not name a language).

Unsure / not confirmed: exact minutes per stage (EQAO gives only about 60 minutes per session; this
bank uses 31 + 29); how EQAO counts the quartiles of an even/odd data set (items state the method used:
leave the median out, take the median of each half).

Build and validate:
  python3 -I tools/eqao9/build.py && python3 -I tools/validate_v2_bank.py eqao9 \
  '{"1": {"a": {"1": 13, "2:lower": 12, "2:upper": 12}, "b": {"1": 13, "2:lower": 12, "2:upper": 12}}, "2": {"a": {"1": 13, "2:lower": 12, "2:upper": 12}, "b": {"1": 13, "2:lower": 12, "2:upper": 12}}}'
