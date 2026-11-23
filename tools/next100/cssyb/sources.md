# Sources for `cssyb` (ASQ Certified Six Sigma Yellow Belt)

All 200 questions are original, written from the 2022 CSSYB Body of Knowledge topic list and
standard quality and Six Sigma practice. No ASQ sample question, ASQ question bank item, past
exam item or commercial practice question was copied or reworded, and no prep provider is named.
Every calculation (mean, median, mode, range, variance, standard deviation, DPU, DPMO, RTY,
yield, cycle time, COPQ shares, RPN, cost-benefit payback, control limits, binomial counts) was
computed in `build.py`'s source files and asserted there before the bank was built.

## Body of Knowledge (official, ASQ / ASQ Excellence)
- CSSYB certification brochure with the Body of Knowledge, https://www.asq.org/cert/resource/pdf/certification/cssyb-cert-insert.pdf
  (footer "2022 CSSYB BoK"), fetched 2026-11-22: five sections with scored question counts,
  I. Six Sigma Fundamentals 20 (Six Sigma and lean foundations, roles, team types and stages,
  brainstorming, multivoting, NGT, agendas and minutes, the seven quality tools, DPU, DPMO, RTY,
  cycle time, COPQ); II. Define Phase 14 (VOC and CTQs, project selection, stakeholders, SIPOC,
  supply chain, charter, communication plan, WBS and Gantt, activity network, affinity, matrix,
  relations and tree diagrams, tollgate reviews); III. Measure Phase 15 (mean, median, mode,
  standard deviation, range, variance, data collection plans and operational definitions,
  qualitative and quantitative data, surveys, interviews, check sheets and checklists, MSA terms,
  gauge R&R); IV. Analyze Phase 17 (5S, value analysis, FMEA and RPN, 5 Whys, process mapping,
  8D, force-field analysis, matrix charts, corrective and preventive action, normal and binomial
  distributions, skewed and bimodal shapes, common and special cause variation, correlation,
  regression, hypothesis terms); V. Improve and Control Phases 14 (kaizen and kaizen blitz,
  PDCA, cost-benefit analysis, control plan, X-bar and R charts, document control, work
  instructions and SOPs) = 80 scored. Each topic carries a maximum cognitive level (Understand
  or Apply); the bank keeps to that depth.
- CSSYB certification page, https://www.asq.org/cert/six-sigma-yellow-belt, fetched 2026-11-22:
  computer-based exam of 90 questions, 80 scored and 10 unscored, 2 hours 18 minutes of exam
  time; paper-and-pencil version 80 questions in 2 hours; English only; open book with bound
  materials; no education or work experience requirement.
- CSSYB fact sheet, https://www.asq.org/cert/resource/pdf/certification/cert-fact-sheet-cssyb.pdf,
  fetched 2026-11-22: no education or work experience requirements; "the CSSYB is a lifetime
  certification" (no recertification). Yellow Belts support projects led by Green or Black Belts.
- ASQ Certification Candidate Handbook, https://www.asq.org/cert/resource/pdf/certification/ASQ-Certification-Candidate-Handbook.pdf,
  fetched 2026-11-22: all ASQE exams are open book (bound references); computer-based exams have
  an on-screen basic scientific calculator and a simple calculator is enough; a passing candidate
  is told only that they reached the passing score of 550 (scaled); CSSYB is listed among the
  lifetime certifications with no recertification.
- No newer CSSYB BoK than 2022 was found on asq.org on 2026-11-22.

## Not confirmed from ASQ (left out or labelled)
- Any raw pass percentage: ASQ publishes none, so the 70% line is Tigertest's readiness line.
- The top of the 550 scale is not stated, so the landing gives only "550 (scaled)".
- Fees: left out of the bank and of examFacts (the page lists them; they change).
- ASQ's own quality-resources pages (asq.org/quality-resources/...) returned 403 to automated
  fetches on 2026-11-22, so they are not cited.

## Content references (concepts, not copied)
- NIST/SEMATECH e-Handbook of Statistical Methods, https://www.itl.nist.gov/div898/handbook/,
  fetched 2026-11-22: measures of location and spread, normal and binomial distributions,
  skewness and bimodal histograms, X-bar and R charts (https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc32.htm),
  correlation, regression and hypothesis test terms (null, alternative, type I and II error,
  p-value, power).
- Control chart constants for n = 5 (A2 0.577, D3 0, D4 2.114) and n = 4 (A2 0.729, D4 2.282)
  from the standard SPC factor tables also given by the NIST handbook.
- Team stages (Tuckman, with adjourning added in 1977), PDCA (Shewhart and Deming), lean
  principles, 5S, kaizen, 8D, force-field analysis (Lewin), the seven basic quality tools and the
  seven management and planning tools as in standard quality texts.

## Blueprint
Tests of 50: 12/9/9/11/9, scaling 20/14/15/17/14 of 80 by 50/80 (12.5, 8.75, 9.375, 10.625,
8.75) and rounding so the sum is 50 (Fundamentals 12.5 rounded down, Define and Improve/Control
rounded up). Pools 48/36/36/44/36, four tests cover the whole bank, five training sets, one per
BoK section.

## Duplicates checked
Grepped `data/six-sigma-green-belt-questions.json` (CSSGB), `data/v2/pmp`, `data/v2/capm`,
`data/v2/itil` and `data/v2/psm` for shared facts and numbers. The CSSGB bank's numbers (its
DPMO, DPU, RTY, RPN, control limit and probability figures) are not reused, and team stages,
SIPOC, Kano-free VOC, FMEA, 5 Whys and PDCA items are asked from other angles.
