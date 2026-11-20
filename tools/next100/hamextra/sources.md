# FCC Amateur Extra (Element 4) bank sources

The questions are not original: like the Technician bank (`ham`), this bank IS the official
NCVEC 2024-2028 Element 4 question pool, which the NCVEC Question Pool Committee releases into
the public domain and which every VE team must draw its exams from (47 CFR 97.507(b), 97.523).
That is the one allowed exception to the no-question-material rule. Every explanation is
original, written for Tigertest from 47 CFR Part 97 and standard radio and electronics theory.
No commercial study guide, prep test or forum was used for any explanation.

## Question pool (the outline and the questions)

- NCVEC, "2024-2028 Extra Class Question Pool Release", https://ncvec.org/index.php/2024-2028-extra-class-question-pool-release
  (fetched 2026-11-19 in a browser; the site's Cloudflare check blocks scripts). Gives the four
  errata: E9E10 withdrawn and five questions corrected (Jan 31 2024), E2A13 withdrawn (Nov 8
  2024), E6D07 withdrawn (Sept 25 2025, more than one correct answer), E4D05 withdrawn (Feb 4
  2026).
- NCVEC, "2024-2028 Extra Class Question Pool and Syllabus Public Release with 4th Errata Feb 4
  2026.docx", https://ncvec.org/downloads/2024-2028%20Extra%20Class%20Question%20Pool%20and%20Syllabus%20Public%20Release%20with%204th%20Errata%20Feb%204%202026.docx
  (fetched 2026-11-19). The syllabus (10 subelements, 50 groups, one exam question per group:
  E1 6, E2 5, E3 3, E4 5, E5 4, E6 6, E7 8, E8 4, E9 8, E0 1) and the 599 live questions with
  their keys. Parsed into `pool.json` (curly quotes made straight, nothing else changed).
- ARRL, "Question Pools", https://www.arrl.org/question-pools (fetched 2026-11-19): the Extra pool
  is valid July 1, 2024 to June 30, 2028 and has 10 schematic diagrams.
- ARRL, "Withdrawn Questions", https://www.arrl.org/withdrawn-questions (fetched 2026-11-19):
  confirms E2A13, E4D05, E6D07 and E9E10 are withdrawn.

## Exam format and rules

- 47 CFR 97.503 Element standards (eCFR, current text), https://www.ecfr.gov/current/title-47/chapter-I/subchapter-D/part-97/subpart-F/section-97.503
  (fetched 2026-11-19): Element 4 is 50 questions, 37 correct to pass.
- 47 CFR 97.507 and 97.523, https://www.ecfr.gov/current/title-47/chapter-I/subchapter-D/part-97/subpart-F/section-97.523
  (fetched 2026-11-19): question sets come from the public pool; each pool holds at least ten
  times an exam's questions.
- 47 CFR Part 97 full text, https://www.ecfr.gov/current/title-47/chapter-I/subchapter-D/part-97
  (fetched 2026-11-19 through the eCFR API): checked against every rules explanation (E1).
  The December 2025 amendment of 97.315 left the keyed answers to E1F03 and E1F11 correct.

## Left out

- The 27 questions that need a pool figure (Figure E5-1, E6-1 to E6-3, E7-1 to E7-3, E9-1 to
  E9-3, the Smith chart): E5C10-12, E6A10-11, E6B10, E6C08, E6C10-11, E7B10-12, E7D06-08,
  E7G07, E7G09-11, E9B01-06, E9G06-07. 572 of 599 questions remain.
- Fees (the VEC session fee and the FCC application fee) and VE session booking: not in the bank.
- E1D07: the pool's key (40, 20, 15 and 10 meters) is the only right option, but 97.207(c) also
  lists 17 and 12 meters; the explanation says so.
