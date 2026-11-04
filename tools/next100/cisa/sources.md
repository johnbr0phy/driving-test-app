# Sources for `cisa` (ISACA Certified Information Systems Auditor)

All 200 questions are original, written by Tigertest from the job practice areas and general IS
audit, governance and control practice. No ISACA review manual item, QAE database item, past exam
question or commercial practice question was copied, and no prep provider is named. Checked
2026-11-04.

## Job practice areas (official, confirmed)
- ISACA, "CISA Exam Content Outline", https://www.isaca.org/credentialing/cisa/cisa-exam-content-outline
  (fetched 2026-11-04): Domain 1 Information System Auditing Process 18%, Domain 2 Governance and
  Management of IT 18%, Domain 3 Information Systems Acquisition, Development and Implementation
  12%, Domain 4 Information Systems Operations and Business Resilience 26%, Domain 5 Protection of
  Information Assets 26%. The page also states 150 questions.
- ISACA press release, "ISACA's CISA Exam Updated to Reflect Innovations and Evolving Technologies
  Impacting IT Audit", 1 May 2024,
  https://www.isaca.org/about-us/newsroom/press-releases/2024/isacas-cisa-exam-updated-to-reflect-innovations-and-evolving-technologies-impacting-it-audit
  (fetched 2026-11-04): updated exam available from 1 August 2024, same five domains with the
  weights above, new content on risk, security and controls for disruptive and emerging
  technologies. No newer outline was announced on either page as of 2026-11-04.

## Exam format
- ISACA CISA page, https://www.isaca.org/credentialing/cisa (fetched 2026-11-04): computer-based,
  at PSI test centers worldwide or remotely proctored.
- 150 questions: ISACA content outline page (above).
- 4 hours (240 minutes), multiple choice; scaled score 200 to 800 with 450 to pass: guides say
  (open-exam-prep.com "Current CISA Exam Facts",
  https://open-exam-prep.com/study-guides/cisa/orientation-and-exam-strategy/current-exam-facts,
  checked 2026-11-04; a 2020 copy of ISACA's Exam Candidate Guide on Scribd gives 4 hours and 150
  multiple-choice questions). ISACA's current candidate guide did not load for our fetcher (404),
  so these stay labelled "guides say" / "ISACA's candidate guide" where used. The raw-to-scaled
  conversion is not published; we never state a percent pass mark for the real exam.
- Languages: not confirmed on ISACA's pages fetched, so not stated.
- Fees: exist, deliberately not used.

## Certification after the exam (official)
- ISACA, "Get CISA Certified", https://www.isaca.org/credentialing/cisa/get-cisa-certified
  (fetched 2026-11-04): pass the exam, then apply within five years of passing; five or more years
  of IS audit, control or security work experience within the ten years before applying (the exam
  may be taken first); agree to the Code of Professional Ethics and ISACA's IS Auditing Standards;
  at least 120 CPE hours per three-year period with at least 20 a year. Substitutions and waivers
  were not on that page, so the landing does not describe them.

## Facts used in explanations (stable practice)
- ISACA Code of Professional Ethics (confidentiality of information obtained in an audit).
- COBIT 2019: governance objectives in the Evaluate, Direct and Monitor domain; management
  domains Align, Plan and Organize; Build, Acquire and Implement; Deliver, Service and Support;
  Monitor, Evaluate and Assess.
- ISO/IEC 27001: Statement of Applicability; certificate scope.
- General IS audit techniques (integrated test facility, embedded audit modules, parallel
  simulation, discovery and stop-or-go sampling), application controls, changeover methods,
  backup rotation, RAID, two-phase commit, data center environmental controls and classic attack
  names (salami, data diddling, logic bomb, war driving) as described in standard IS audit texts.

## Blueprint (Tigertest)
The real exam is 150 questions in 4 hours. Each practice test here is 50 questions at that pace,
weighted 9/9/6/13/13 (exactly 18/18/12/26/26 percent of 50). Four tests; pools 36/36/24/52/52 =
200, so every question appears in exactly one test. Five training sets, one per domain, then the
four tests: 9 dashboard steps. Pass line 70% (35 of 50) is Tigertest's readiness target, not
ISACA's.

## Lanes and duplicates
Stems and facts were checked by token overlap against `data/v2/cissp`, `data/v2/secplus`,
`data/v2/cysa`, `data/v2/netplus`, `data/v2/aplus`, `data/v2/pmp`, `data/v2/capm`, `data/v2/itil`
and `data/cpa-aud-questions.json`; eight items that shared a fact (most reliable evidence, risk
appetite owner, access review owner, SSO risk, low humidity, problem management purpose, BIA
output, CSF 2.0 Govern) were rewritten to other facts. Topics CISSP already asks (emergency
change follow-up, test restores, pen test authorization, phishing metrics, fire suppression
without water, dismissed administrator) were left out.

## Review pass (2026-11-04)
- NIST, "The NIST Cybersecurity Framework (CSF) 2.0", NIST CSWP 29, February 2024: Tiers
  (Partial, Risk Informed, Repeatable, Adaptive) characterize the rigor of cybersecurity risk
  governance and management practices; Profiles describe current and target outcomes (GOV-010).
- ISACA IS Audit and Assurance Standards (2021): proficiency (1006) and the use of other experts'
  work (1206) (AUD-025, AUD-029).
- Rewritten for overlap with other banks: ACQ-001 (CISSP-T1-008, cost-effective stage), AUD-025
  (CPAAUD-CTL-016, walkthrough), AUD-012 (CPAAUD-EVD-015, completeness of client data), GOV-010
  (CISSP-T1-078, mandatory vacation), OPS-023 (SECPLUS-D-008, journaling), PRO-022
  (SECPLUS-T1-055, IoT segmentation); inside this bank GOV-013 (same fact as OPS-029) and OPS-026
  (same fact as GOV-009).
