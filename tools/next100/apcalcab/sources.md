# AP Calculus AB (`apcalcab`): sources

All 215 items are original. No College Board released exam, Course and Exam Description sample question,
AP Classroom item or commercial prep item was used or paraphrased. Every numeric answer and every
function-valued answer is recomputed by `build.py` with numeric differentiation, integration, limits and an
RK4 solver (the `chk` field of each item), and every distractor is checked to differ from the answer.

## Format (checked 1 November 2026)
- College Board, AP Central, "AP Calculus AB Exam": https://apcentral.collegeboard.org/courses/ap-calculus-ab/exam
  - "Clarifications and Exam Updates for 2026-27": the CED has minor clarifications and course content has
    not changed; "The number of multiple-choice questions and the timing on the AP Calculus AB and BC Exams
    have also been updated"; "The updates will be effective starting with the May 2027 exams."
  - Section I: Multiple Choice, "42 Questions | 1 Hour 40 Minutes | 50% of Exam Score"; Part A: 29
    questions, 62 minutes (calculator not permitted); Part B: 13 questions, 38 minutes (graphing
    calculator required). Algebraic, exponential, logarithmic, trigonometric and general functions;
    analytical, graphical, tabular and verbal representations.
  - Section II: Free Response, 6 questions, 1 hour 30 minutes, 50%; Part A 2 questions in 30 minutes
    (graphing calculator required), Part B 4 questions in 60 minutes (calculator not permitted).
  - Hybrid digital: multiple choice answered in Bluebook; free-response questions viewed in Bluebook and
    handwritten in paper booklets.
  - 2027 exam date: Monday, May 10, 2027, morning session (not used in the copy).
- College Board, "AP Calculus AB and BC Course and Exam Description Clarifications and Corrections",
  to be implemented for fall 2026 (PDF dated May 21, 2026):
  https://apcentral.collegeboard.org/media/pdf/ap-calculus-ab-bc-course-and-exam-description-clarifications.pdf
  - "Multiple-choice questions, Part A: The number of questions was changed from 30 to 29, and the timing
    was changed from 60 minutes to 62 minutes."
  - "Multiple-choice questions, Part B: The number of questions was changed from 15 to 13, and the timing
    was changed from 45 minutes to 38 minutes."
  - Content edits only to the wording of EK FUN-1.C.1 (Extreme Value Theorem) and EK FUN-7.B.2.
- College Board, "AP Calculus AB and BC Course and Exam Description" (cover "Effective Fall 2020";
  PDF keywords "07/2026", created June 2026), fetched 1 November 2026:
  https://apcentral.collegeboard.org/media/pdf/ap-calculus-ab-and-bc-course-and-exam-description.pdf
  - Exam Overview: 3 hours 10 minutes; 42 multiple-choice and 6 free-response questions. Section I Part A
    (graphing calculator not permitted) 29 questions, 35% of the exam, 62 minutes; Part B (graphing
    calculator required) 13 questions, 15%, 38 minutes. Section II Part A 2 questions, 16.7%, 30 minutes;
    Part B 4 questions, 33.3%, 60 minutes.
  - "A graphing calculator is required for the final 13 questions (Part B)."
  - Exam weighting for the multiple-choice section, AB: Unit 1 Limits and Continuity 10-15%; Unit 2
    Differentiation: Definition and Basic Derivative Rules 10-15% (the AP Students course page calls it "Definition and Fundamental Properties"); Unit 3 Differentiation: Composite,
    Implicit, and Inverse Functions 5-10%; Unit 4 Contextual Applications of Differentiation 10-15%;
    Unit 5 Applying Derivatives to Analyze Functions 15-20% (the course framework pages call it
    "Analytical Applications of Differentiation"); Unit 6 Integration and Accumulation of Change 15-20%;
    Unit 7 Differential Equations 5-10%; Unit 8 Applications of Integration 10-15%.
    (Several third-party guides still quote older ranges such as 9-13% or 17-20%; the CED figures are used.)
  - Mathematical practices on the multiple choice: Implementing Mathematical Processes 50-70%,
    Connecting Representations 15-30%, Justification 10-20% (Communication and Notation not assessed).
  - Sample multiple-choice questions show four choices, (A) to (D).
  - BC-only topics left out of the bank: 6.11 integration by parts, 6.12 partial fractions, 6.13 improper
    integrals, 7.5 Euler's method, 7.9 logistic models, 8.13 arc length, and Units 9 and 10.
  - Calculator capabilities expected: plot a graph in an arbitrary window, find zeros numerically,
    numerically calculate a derivative and a definite integral.

## Calculator (checked 1 November 2026)
- College Board, AP Exams Calculator Policy:
  https://apcentral.collegeboard.org/exam-administration-ordering-scores/administering-exams/on-exam-day/calculator-policy
  and https://apstudents.collegeboard.org/exam-policies-guidelines/calculator-policies
  - The Desmos graphing calculator is built into Bluebook and available only in the calculator-required parts
    (Section I Part B and Section II Part A); students may also bring up to 2 approved handhelds.
- Tigertest's calculator (`components/v2/Calculator.tsx`) is scientific and works in degrees, so Part B items
  are written to need only exponentials, logarithms, roots and arithmetic: no radian trigonometry, no
  numerical integration, no numerical equation solving. The config's directions, `scoreNote` and the landing
  FAQ say so.

## Scoring
- AP scores 1 to 5; no penalty for wrong answers; the College Board converts a weighted composite each year
  and publishes no fixed cut (AP Central exam and score pages). Tigertest reports percent correct; goals are
  its own targets.

## Reviewer check (1 November 2026)
- AP Central exam page (https://apcentral.collegeboard.org/courses/ap-calculus-ab/exam): Section I 42 questions,
  1 hour 40 minutes, 50%; Part A 29 questions, 62 minutes, calculator not permitted; Part B 13 questions,
  38 minutes, graphing calculator required; updates effective with the May 2027 exams. Confirmed.
- Clarifications PDF (text extracted): "Part A: The number of questions was changed from 30 to 29, and the timing
  was changed from 60 minutes to 62 minutes"; "Part B: ... from 15 to 13 ... from 45 minutes to 38 minutes". Confirmed.
- AP Students course page (https://apstudents.collegeboard.org/courses/ap-calculus-ab): unit weightings
  10-15 / 10-15 / 5-10 / 10-15 / 15-20 / 15-20 / 5-10 / 10-15%, with the unit names "Differentiation: Definition and
  Fundamental Properties" (Unit 2) and "Analytical Applications of Differentiation" (Unit 5), now used on the landing
  and in the config labels. Exam date Monday, May 10, 2027.
- AP Students calculator policy (https://apstudents.collegeboard.org/exam-policies-guidelines/calculator-policies):
  built-in Desmos graphing calculator in Bluebook, available only in Section I Part B and Section II Part A. Confirmed.
