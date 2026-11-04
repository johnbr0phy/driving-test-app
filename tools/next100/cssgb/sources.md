# Sources for `cssgb` (ASQ Certified Six Sigma Green Belt)

All 200 questions are original, written from the 2022 CSSGB Body of Knowledge topic list and
standard Six Sigma statistics. No ASQ sample question, question bank item, past exam item or
commercial practice question was copied, and no prep provider is named. Checked 2026-11-04.

## Exam format (official, ASQ / ASQ Excellence)
- ASQ certification page, https://www.asq.org/cert/six-sigma-green-belt, checked 2026-11-04:
  computer-based exam (Prometric) of 110 questions, 100 scored and 10 unscored; total appointment
  4.5 hours, exam time 4 hours 18 minutes; English only. Paper-and-pencil version: 100 questions in
  4 hours, offered in Mandarin in certain locations. Open book (bound reference materials only).
- 2022 CSSGB Body of Knowledge brochure, https://www.asq.org/cert/resource/pdf/certification/cssgb-cert-insert.pdf
  (footer "2022 CSSGB BoK"), checked 2026-11-04: same format text, three years of work
  experience in one or more BoK areas, no educational waivers. Section question counts:
  I. Overview: Six Sigma and the Organization 11; II. Define Phase 20; III. Measure Phase 20;
  IV. Analyze Phase 18; V. Improve Phase 16; VI. Control Phase 15 (= 100 scored).
- CSSGB fact sheet, https://www.asq.org/cert/resource/pdf/certification/cert-fact-sheet-cssgb.pdf,
  checked 2026-11-04: three years of on-the-job experience; "No, the CSSGB is a lifetime
  certification" (no recertification).
- ASQ Certification Candidate Handbook, https://www.asq.org/cert/resource/pdf/certification/ASQ-Certification-Candidate-Handbook.pdf,
  checked 2026-11-04: all ASQE exams are open book with bound materials; computer-based exams
  have an on-screen basic scientific calculator and a simple calculator is enough; fixed forms of
  dichotomously scored multiple-choice questions; the outcome is set by total raw score with
  pre-equating between forms; a passing candidate is told only that they reached the passing
  score of 550 (scaled). Live remote proctoring is mentioned.

Not confirmed from ASQ (left out or labelled):
- The top of the 550 scale (guides say 750). Not stated on the landing.
- Any raw pass percentage. ASQ publishes none, so the 70% line is "Tigertest's readiness line".
- No newer BoK than 2022 was found on asq.org on 2026-11-04 (a 2026 guide, examcert.app
  "CSSGB Body of Knowledge 2026", also says the 2022 BoK is current; secondary only).
- Fees: deliberately left out.

## Blueprint
Tests of 50: 6/10/10/9/8/7 (halving 11/20/20/18/16/15; the two half remainders, Overview 5.5
and Control 7.5, were split one each way). Six training sets, one per BoK section.

## Content references (concepts, not copied)
- Control chart constants (A2 0.577, D3 0, D4 2.114 for n = 5; E2 2.66 for individuals) from
  the standard ASTM / AIAG SPC factor tables; NIST/SEMATECH e-Handbook of Statistical Methods
  (https://www.itl.nist.gov/div898/handbook/) for capability indices, gauge R&R, DOE effects,
  chi square and ANOVA. Every numerical item was recomputed in Python before writing
  (Cp, Cpk, Cpm, Pp/Ppk, sigma level with the 1.5 shift, DPMO, DPU, RTY, control limits,
  binomial and Poisson probabilities, t, F and chi square statistics, regression prediction).
- Lean and quality history (Shewhart, Deming, Juran, Ishikawa; Womack and Jones' five lean
  principles; Tuckman's stages; Kano model) as in standard quality texts.

## Duplicates checked
Grepped `data/v2/pmp`, `data/v2/capm`, `data/v2/itil`, `data/cpa-reg-questions.json`,
`data/phr-questions.json`, `data/cisa-questions.json` and all banks for takt, PERT, Kano, RACI,
Tuckman, poka-yoke, SMED. The PERT item first used PMP's 4/7/16 days and the team-stage item
duplicated PMP's storming scenario; both were rewritten (PERT now 3/9/21, team stage now
adjourning).
