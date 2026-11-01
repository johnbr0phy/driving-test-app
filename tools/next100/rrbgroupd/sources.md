# RRB Group D (Level 1) CBT (`rrbgroupd`) sources

All checked 2026-10-31.

## Pattern followed

**Railway Recruitment Boards, Centralised Employment Notice CEN 08/2024 (Level 1 posts of the 7th CPC pay matrix)**,
scheme of examination for the single-stage Computer Based Test (CBT held from late November 2025 into early 2026;
result and zone-wise cut-offs for the Physical Efficiency Test reported 1 July 2026). The next notice, **CEN 09/2025**
(about 22,000 posts, notified early 2026), is reported to keep the same CBT. Official notices are published on each RRB
website (for example https://www.rrbcdg.gov.in, https://rrbapply.gov.in). The notice PDFs themselves were not read;
every figure below was first taken from the secondary summaries listed, which agree with each other except where noted.

**Official notice (reviewer check, 2026-11-01).** Centralised Employment Notification (CEN) No. 09/2025, Level 1
posts, detailed notice updated on 30.01.2026, published on every RRB site, for example
https://www.rrbcdg.gov.in/uploads/2025/09-LVL1/092025-CEN.pdf,
https://rrbsecunderabad.gov.in/wp-content/uploads/2026/01/Final-Detailed-CEN-09-2025-Level-1-updated-on-30.01.2026-6-pm.pdf,
https://www.rrbchennai.gov.in/downloads/Final-Detailed-CEN-09-2025-Level-1-updated-on-30-01-2026.pdf. The RRB hosts
reset direct connections from this environment, so the text was read through search-engine extracts of these PDFs,
not by opening them. Those extracts confirm: 100 questions, 90 minutes (120 for candidates with a scribe), General
Science 25, Mathematics 25, General Intelligence and Reasoning 30, General Awareness and Current Affairs 20, 1/3 mark
deducted for each wrong answer, General Science at 10th standard level, and the qualifying percentages below. About
22,195 posts. The CEN 09/2025 CBT was held in August 2026 (secondary reports).

- Single CBT: 100 multiple-choice questions, 100 marks, 90 minutes (120 minutes for eligible PwBD candidates with a
  scribe). Oliveboard exam-pattern page, https://www.oliveboard.in/blog/rrb-group-d-exam-pattern-2025/ (fetched).
- Sections: General Science 25, Mathematics 25, General Intelligence and Reasoning 30, General Awareness and Current
  Affairs 20. Oliveboard (fetched); also aglasem, testbook and careerpower summaries in search results. One older-style
  source gives 25 each; ignored.
- Negative marking: 1/3 mark deducted per wrong answer, none for an unanswered question. Oliveboard (fetched), Free
  Press Journal (fetched). Modelled in copy only (landing FAQ, section directions, `scoreNote`); the app scores percent
  correct.
- Minimum qualifying percentage: UR 40, EWS 40, OBC (non-creamy layer) 30, SC 30, ST 30; may be relaxed by 2 marks for
  PwBD candidates in case of a shortage of PwBD candidates against vacancies reserved for them. **Confirmed from the
  official CEN 09/2025 notice** (reviewer, 2026-11-01): the notice reads "Minimum percentage of marks for shortlisting in
  various communities: UR-40%, EWS-40%, OBC (Non creamy layer)-30%, SC-30%, ST-30%". The ST figure of 25% reported by
  one aglasem syllabus page (and pw.live) is wrong; 30% stands. Earlier secondary sources: Free Press Journal
  (https://www.freepressjournal.in/education/rrb-group-d-2025-exam-dates-announced-cbt-from-november-17-check-pattern-selection-process-pass-marks)
  and IIT Kanpur SATHEE.
- Selection: CBT, then Physical Efficiency Test (qualifying), document verification, medical examination (Free Press
  Journal). PET standards (men: carry 35 kg for 100 m in 2 minutes and run 1,000 m in 4 min 15 s; women: 20 kg and
  1,000 m in 5 min 40 s) per Oliveboard; mentioned only generally in the copy, not as figures.
- Languages: Hindi, English and 13 regional languages (search summaries of CEN 09/2025); not stated in the copy.
- Syllabus (CEN annexure, as reproduced by the summaries): Mathematics: number system, BODMAS, decimals, fractions,
  LCM and HCF, ratio and proportion, percentages, mensuration, time and work, time and distance, simple and compound
  interest, profit and loss, algebra, geometry and trigonometry, elementary statistics, square root, age calculations,
  calendar and clock, pipes and cisterns. General Intelligence and Reasoning: analogies, alphabetical and number
  series, coding and decoding, mathematical operations, relationships, syllogism, jumbling, Venn diagrams, data
  interpretation and sufficiency, conclusions and decision making, similarities and differences, analytical
  reasoning, classification, directions, statement arguments and assumptions. General Science: physics, chemistry and
  life sciences up to class 10 (CBSE). General Awareness: current events in science and technology, sports, culture,
  personalities, economics, politics and other subjects of importance.

## What the bank covers and leaves out

- Two full 100-question tests (25/30/25/20, grouped Maths, Reasoning, Science, GA; the order of sections on the real
  paper is not modelled as fixed) plus 32 drill-only items, 232 in all, four-option single answer like the real CBT.
- GA is static facts only (history, culture, sports trophies, geography, Constitution, banking terms, railways,
  environment). No current affairs, no office-holders, no award winners of a given year.
- Reasoning is text only: no Venn diagram figures, mirror images, paper folding or embedded figures; Venn
  relationships are asked in words.
- Indian English, rupee amounts, Indian names.
- Every item is original. The bank was checked by script against `data/v2/rrbntpc`, `ssccgl`, `ibpspo` and `ctet`
  (stem similarity plus same key); every item that repeated a stem, the same numbers or the same fact was rewritten
  (about 30 items). Reviewer pass (2026-11-01): checked again against the whole wave (sscgd, sscchsl, sscmts,
  uppolice, ibpsclerk, jnvst, jambeng, appsych, pakistan-driving) plus ssccgl, rrbntpc, ibpspo and ctet, by stem,
  numbers and keyed fact; 30 more items rewritten and one GA item reworded (Kangchenjunga: India officially counts K2 as its highest peak). What remains shares only generic templates (an LCM question, a clock angle at a different time).

## Facts checked

Calendar items computed: 1 January 2026 is a Thursday, so 26 January 2026 is a Monday, 5 March 2026 a Thursday and
5 April 2026 a Sunday. Constitution Articles 52, 360 and Rajya Sabha age 30 against the Constitution of India text
(legislative.gov.in). First passenger train Bori Bunder to Thane, 16 April 1853; North Eastern Railway headquarters
Gorakhpur (indianrailways.gov.in zone list). Science to NCERT class 9 and 10.
