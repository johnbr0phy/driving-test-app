# JEE (Main) Paper 1 sources

Checked 1 November 2026.

## Official (National Testing Agency)
- JEE (Main) website, https://jeemain.nta.nic.in/ (home page loaded 1 November 2026): links to the JEE (Main) 2027
  Information Bulletin, the 2027 syllabus, the public notice inviting applications for Session 1, and the
  online application form for JEE (Main) 2027 Session 1.
- Information Bulletin, Joint Entrance Examination (Main) 2027, read in full on 1 November 2026:
  https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/202610241890224107.pdf
  Confirmed from it:
  - Session 1 (January 2027): online applications 24 October to 22 November 2026; examination on 20, 21, 22, 23,
    24 and 28 January 2027. Session 2 (April 2027): examination on 2, 3, 4, 5, 6 and 7 April 2027.
  - Paper 1 (B.E./B.Tech.): Mathematics, Physics and Chemistry with equal weightage, computer based test only,
    3 hours (4 hours for PwD/PwBD candidates eligible for a scribe); shifts 9:00 a.m. to 12:00 noon and
    3:00 p.m. to 6:00 p.m. IST.
  - Pattern (section 2.4): per subject, Section A 20 questions and Section B 5 questions, 100 marks; total 75
    questions, 300 marks. Section A is multiple-choice; Section B questions have a numerical value answer: "a
    candidate has to enter the correct integer value of the answer using the mouse and the on-screen virtual
    numeric keypad", "the answer should be rounded off to the nearest integer".
  - Marking: +4 correct, -1 incorrect, 0 unanswered, in both Section A and Section B ("There will be negative
    marking for incorrect answer in Section A and Section B").
  - Merit: raw scores in Mathematics, Physics, Chemistry and total converted to NTA scores; merit by merging the
    NTA scores of all shifts of both sessions; for candidates who sit both sessions the better total NTA score
    counts. Ties are broken by the Mathematics, then Physics, then Chemistry NTA score, then by the proportion
    of wrong to right answers.
  - Paper 1 also decides eligibility for JEE (Advanced), held for admission to the IITs.
  - Languages (section 2.2): 13, English, Hindi, Assamese, Bengali, Gujarati, Kannada, Malayalam, Marathi, Odia,
    Punjabi, Tamil, Telugu and Urdu; the paper is in English plus the chosen language.
  - Calculators, log tables and slide rules are not allowed; rough sheets are given at the centre.
- Public notice, Inviting Online Application Form for JEE (Main) 2027 (Session 1), dated 24.10.2026:
  https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/20261024390682350.pdf
  (two sessions, January and April 2027; Paper 1 for B.E./B.Tech. at NITs, IIITs and other CFTIs and an
  eligibility test for JEE (Advanced); applications 24 October to 22 November 2026).
- Syllabus for JEE (Main) 2027:
  https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/20261024683680768.pdf
  Mathematics units 1 to 14 (sets, relations and functions; complex numbers and quadratic equations; matrices
  and determinants; permutations and combinations; binomial theorem; sequence and series; limit, continuity
  and differentiability; integral calculus; differential equations; coordinate geometry; three-dimensional
  geometry; vector algebra; statistics and probability; trigonometry). Physics units 1 to 20 (units and
  measurements through electronic devices and experimental skills). Chemistry: physical units 1 to 8, inorganic
  units 9 to 12 (periodicity, p-block, d- and f-block, coordination compounds), organic units 13 to 20. The
  drills follow these units.

## Not confirmed or not used
- No official subject or chapter weights exist below the 20 + 5 per subject; the split of each subject's 25
  questions across the three drills of that subject is Tigertest's own.
- Cut-off percentiles and the number of candidates who qualify for JEE (Advanced) change every year and are not
  stated anywhere in the bank or on the landing.
- Guides (for example competishun.com, motion.ac.in, careers360.com, consulted 1 November 2026) still disagree
  on whether Section B carries negative marking and on the 2027 pattern; the 2027 bulletin above settles both,
  so no guide figure is used.

## Question writing
All 204 items are original. Numerical value keys and the values behind all-number multiple-choice keys are
computed in the Python sources (and asserted by `build.py`). Physical constants are given in the stem where
needed (g = 10 m/s², hc = 1240 eV nm, F = 96 500 C/mol, R = 8.3 J/mol K). No item is taken from an NTA paper,
a past paper or a coaching package.

## Review, 1 November 2026
The Information Bulletin PDF above was downloaded again and re-read by the reviewer on 1 November 2026
(section 2.4 pattern table, marking scheme, section 2.5 duration, session dates, 13 languages, best NTA score
of the sessions counting, calculator and log tables barred): every figure used in the config, landing and
examFacts block matches. Session 1 dates are 20 to 24 and 28 January 2027 (not a continuous range), so the
examFacts row now says so.
