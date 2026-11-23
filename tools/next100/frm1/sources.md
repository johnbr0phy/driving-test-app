# Sources for `frm1` (GARP FRM Exam Part I)

All 200 questions are original, written by Tigertest from GARP's published topic outline and
learning objectives and from the standard finance, statistics and risk methods they name. No GARP
practice exam, sample question, end-of-chapter question, FRM book text, or any prep provider's
item was read for writing, copied or reworded, and no prep provider is named. Every computed key
is recomputed in Python in the source files (`common.N`), and the build checks that each key's
number appears in its explanation. Checked 2026-11-23.

## Topic outline and weights (official)
- GARP, "2026 FRM Study Guide" (PDF),
  https://www.garp.org/hubfs/GARP%20Design/frm/pdf/study-materials/2026/frm-study-guide-26.pdf
  (fetched 2026-11-23): Part I topic areas and exam weights: Foundations of Risk Management 20%,
  Quantitative Analysis 20%, Financial Markets and Products 30%, Valuation and Risk Models 30%,
  with the broad knowledge points and the chapter list of each GARP book (FRM 1-11, QA 1-15,
  FMP 1-20, VRM 1-16). This is the curriculum for the 2026 windows; GARP says topics and weights
  are reviewed yearly.
- GARP, "2026 FRM Candidate Guide" (PDF),
  https://www.garp.org/hubfs/GARP%20Design/frm/pdf/study-materials/2026/frm-candidate-guide-26.pdf
  (fetched 2026-11-23): repeats the four Part I areas and weights.
- GARP, "FRM Learning Objectives 2025" (PDF),
  https://www.garp.org/hubfs/GARP%20Design/frm/pdf/study-materials/2025/FRM2025-Learning-Objectives.pdf
  (fetched 2026-11-23): the detailed learning objectives per chapter (for example Sharpe,
  Treynor, Jensen, tracking error, information ratio and Sortino in FRM-5; Bayes' rule in QA-1;
  mean-reverting level in QA-10; Jarque-Bera in QA-12; minimum variance hedge ratio and basis risk
  in FMP-8; covered interest parity in FMP-9; EWMA and GARCH in VRM-3; EL and UL in VRM-6; DV01
  and key rate hedging in VRM-12 and 13; binomial trees, BSM and the Greeks in VRM-14 to 16). The
  2026 Learning Objectives file sits behind GARP's download form (the landing page
  https://www.garp.org/landing/frm-learning-objectives, checked 2026-11-23, says it was last
  updated December 1, 2025); its chapter list matches the 2026 Study Guide above, so the 2025
  objectives were used for detail only, never for a topic the 2026 guide dropped.
- GARP, "FRM Study Materials", https://www.garp.org/frm/study-materials (fetched 2026-11-23): only
  2026 materials are posted; no 2027 study guide or weights yet. Early registration for May 2027
  opens December 1.

## Exam format (official)
- 2026 FRM Candidate Guide (above): Part I is 100 equally weighted multiple-choice questions in
  four hours, computer-based testing; candidates in China, Hong Kong and Thailand schedule through
  ATA, all others through PSI; Part I must be passed before Part II is graded; no penalty for
  incorrect answers; results are pass/fail with percentile ranges against peers, no numerical
  score; approved calculators are the HP 12C family, HP 10B II and 10B II+, HP 20B and TI BA II
  Plus; the exam is mainly in English, with Simplified Chinese on select dates for Mainland China;
  three windows a year; no work experience is needed to sit, but two years of risk work are
  needed for certification; Part II must be passed within four years of Part I or the enrollment
  fee is charged again.
- GARP, "FRM Program Exams", https://www.garp.org/frm/program-exams (fetched 2026-11-23): Part I
  and Part II offered in May, August and November; four hours each; results within eight weeks
  with quartile results against other candidates; November 2025 Part I pass rate 47%.
- GARP does not publish a passing score. Tigertest's 70% is a readiness line only, said so on the
  landing.
- The number of answer choices per question is not stated in GARP's guides; our items have four.
  The landing does not state a number for the real exam.

## Not used / left out
- Fees and dates (they change; the candidate guide lists 2026 prices only).
- Part II topics, current issues readings, and anything only in GARP's proprietary book text.
- Named-case facts are limited to the case list in the FRM-9 learning objectives (savings and
  loans, Northern Rock, Metallgesellschaft, LTCM, Barings, Bankers Trust) and widely documented
  outcomes.
- Basel figures that change (capital ratios, multipliers) are not asked; the Basel III
  standardized approach for operational risk is asked only as its structure (business indicator
  and internal loss multiplier from ten years of losses).
- Prometric is not mentioned: GARP's 2026 guide names PSI and ATA as exam providers.

## Overlap check
Written against `data/cfa-level-1-questions.json` (cfal1), the Series 65, Series 7, SIE, CPA BAR
and Six Sigma Green Belt banks, with different numbers and angles where the topics touch (for
example the Treynor, put-call parity, CPR, forward-on-stock, duration-convexity and binomial
items in cfal1). `~/tt-run100/frm1-dup.py` compared every stem with every bank on disk for stem
similarity and shared numbers (results below).

Result (2026-11-23): a word-overlap and shared-number scan (`~/tt-run100/frm1-dup2.py`) over every
v1 and v2 bank flagged five fact-and-answer repeats, all rewritten: defined contribution plan risk
(ieqfa, Series 66), ETFs trading all day (SIE), Moody's lowest investment grade (Series 66 asks the
S&P version), MBS prepayment risk when rates fall (Series 7, SIE) and the definition of test power
(CSSGB). The Jensen's alpha and Sharpe ratio items were given new numbers because the old ones gave
the same answers as CFP, Series 66 and Series 7 items. Remaining matches share only a formula (CAPM,
covariance, duration) with different numbers and answers.
