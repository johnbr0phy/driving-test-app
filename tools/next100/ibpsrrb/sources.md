# IBPS RRB Office Assistant Prelims: sources

Exam: IBPS Common Recruitment Process for Regional Rural Banks (CRP RRBs), post of Office
Assistants (Multipurpose), the "IBPS RRB Clerk" exam, Preliminary Examination. Conducted by the
Institute of Banking Personnel Selection (ibps.in) for the Regional Rural Banks.
All sources below checked on 1 November 2026.

## Official notification (confirmed 1 November 2026)
- IBPS, "CRP RRBs XV: Common Recruitment Process for Recruitment of Officers (Scale-I, II & III) and
  Office Assistants (Multipurpose) in Regional Rural Banks (RRBs)", dated 01.09.2026, 76 pages
  (PDF created 31 August 2026). ibps.in itself was unreachable from here (connection reset), so the
  file was read in full from the copy linked as the "Official Notification PDF" by
  https://hellobanker.in/ibps-rrb-crp-xv-recruitment-2026-notification-pdf-out-for-officer-office-assistant-posts/
  (Google Drive file id 11w_QwYncWBrgbQC7dl4WcQVsr3HrhAK1). It carries the IBPS header, index,
  scribe forms and the 01.09.2026 date, and its dates match every secondary report.
  - Section D, Online Examination Structure, Preliminary Examination (objective), Office Assistants
    (Multipurpose): Reasoning 40 questions, 40 marks, 25 minutes; Numerical Ability 40 questions,
    40 marks, 20 minutes; total 80 questions, 80 marks, 45 minutes. Each test has its own duration
    (sectional timing). CONFIRMED.
  - Same section: "Candidates (for both posts) have to qualify in both the tests by securing minimum
    cut-off marks. Adequate number of candidates in each category, depending upon requirements, will
    be shortlisted for Online Main Examination." CONFIRMED.
  - Main Examination, Office Assistants: Reasoning 40/50/30 min, Computer Knowledge 40/20/15 min,
    General Awareness 40/40/15 min, English or Hindi Language 40/40/30 min, Numerical Ability
    40/50/30 min; 200 questions, 200 marks, 120 minutes. (Landing mention only.)
  - Medium of examination: by state; English and Hindi everywhere, plus the state's language where
    listed (for example Telugu in Andhra Pradesh, Tamil in Tamil Nadu, Bengali in West Bengal and
    Tripura, Urdu in Jammu & Kashmir, Telangana and Uttar Pradesh). "In case of discrepancy between
    English version and the translated version, English version will prevail." CONFIRMED.
  - Section E, Penalty for wrong answers (all levels): one fourth or 0.25 of the marks assigned to a
    question deducted for each wrong answer; none for a blank. CONFIRMED.
  - Section G: corrected scores across sessions normalised by the equi-percentile method; for Office
    Assistants, marks obtained only in the online Main examination are considered for final merit
    listing. CONFIRMED.
  - Important dates (tentative): online registration 01.09.2026 to 21.09.2026; Pre-Exam Training
    November 2026; Preliminary (Officers/OA) November/December 2026; Preliminary result December
    2026/January 2027; Main December 2026/February 2027; provisional allotment February/March 2027.
    CONFIRMED (as tentative).
  - Proficiency in the local language of the state is required for Office Assistants (eligibility,
    not examined in the Prelims). Landing mention only.
- Not in the notification: five options per question (true of past papers, per every guide), and
  the exact Prelims days. Guides report 6, 12 and 13 December 2026 for the Office Assistant Prelims
  and 30 January 2027 for the Mains (hellobanker.in, page above; also
  https://www.sreedharscce.com/blogs/ibps-rrb-xv-office-assistant-notification/). Labelled "guides
  report" wherever used.
- Not stated anywhere official: Prelims cutoff figures. Past cutoffs were published per state and
  category; no figure appears in the bank or landing.

## Pattern modelled
- Two sections, each its own timed module, in the notification's order: Reasoning 40 in 25 minutes,
  Numerical Ability 40 in 20 minutes; 80 questions in 45 minutes. No going back to a closed section.
- Five options on every item, single answer.
- Score shown as a percentage with no negative marking; the 0.25 penalty is explained in `scoreNote`
  and on the landing.
- English only; the real exam is also offered in Hindi and state languages (landing says so).

## Question-type mix
No official topic weights exist. Typical RRB Office Assistant Prelims papers (per coaching analyses
of past papers, e.g. the guides above) carry: Reasoning puzzles and seating (three or four sets),
inequality, syllogism, coding-decoding, blood relations, direction sense, alphanumeric and letter
series, order and ranking; Numerical simplification and approximation, number series, one or two DI
sets and arithmetic (profit and loss, interest, averages, ratio, work, speed, ages, mixtures,
probability). Labelled as guides, not IBPS.

Tigertest per test: Reasoning 8 inequalities and syllogisms, 15 puzzles (three sets of five),
8 coding and alphabet, 9 blood relations, directions and ranking; Numerical 16 simplification,
approximation and series, 10 data interpretation (two tables), 14 arithmetic. Drill-only: 6, 5, 6, 6,
6, 5, 6 (40 in all, 200 items).

## Originality
All puzzles, tables and questions are original; nothing from IBPS papers or coaching banks. Every
puzzle was brute-forced for a unique solution, every inequality and syllogism key is checked by a
model search in `ibpsrrbLogic.py`, and every computed answer is asserted in the source files. The
build warns on stems or number sets shared with the other India banks (ibpspo, ibpsclerk, ssccgl,
rrbntpc, ctet, rrbgroupd, sscgd, sscchsl, sscmts, uppolice, jnvst and the batch 2 banks present at
build time); a fuzzy stem comparison was also run, and items with the same numbers or words as
another bank (reverse alphabet, GARDEN, MARKET, BANK/LOAN, the 360 m train, 2 : 3 : 4 shares, the
56-year ages, the 5 : 4 and 3 : 2 incomes, the direction-renaming rule) were rewritten.

## Review pass (1 November 2026)
- ibps.in still unreachable from here (TLS reset). A web search on 1 November 2026 found the same
  tentative Office Assistant Prelims dates (6, 12 and 13 December 2026) and Mains (30 January 2027)
  on aggregator pages (e.g. https://truejobs.co.in/blog/ibps-rrb-2026-exam-date-office-assistant-and-officer-scale-exam-calendar-released,
  https://competition.careers360.com/articles/ibps-rrb-exam-date), with no admit card yet. Still
  labelled "guides report".
- Items rewritten for near-duplicates with other India banks: T1-036 (direction turns, same start and
  answer as rajpolice), T1-041 (35% of 840, also in sbiclerk), T1-051 (√624 approximation, sbiclerk),
  T1-072 (12 and 18 days, ssccgl and ibpspo), T2-041 (45% of 620, sbiclerk), T2-077 (240 m train at
  54 km/h, delhipolice).
