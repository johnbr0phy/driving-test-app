# Sources for `series65` (NASAA Series 65 Uniform Investment Adviser Law Examination)

All 200 questions are original, written from NASAA's published Series 65 test specifications and
the public statutes and rules they cover. No commercial question bank, prep course or NASAA/FINRA
sample item was copied. Checked 2026-11-02.

## Exam format (format facts go in the landing, FAQ and examFacts, never in the bank)
- NASAA, "Series 65 Exam Content Outline" page:
  https://www.nasaa.org/exams/study-guides/series-65-exam-content-outline/ (checked 2026-11-02):
  130 scored questions plus 10 pretest questions, 180 minutes, at least 92 correct to pass,
  closed book, administered by FINRA. NASAA is updating exam questions affected by the
  investment adviser advertising amendments to four model rules adopted in May 2026
  (102(a)(4)-1, USA 2002 502(b), 203(a)-2, 411(c)-1); the updates take effect in early 2027,
  date to be announced. The bank asks nothing about adviser advertising, testimonials or
  social media for that reason.
- NASAA, "Series 65 Test Specifications", effective June 12, 2023:
  https://www.nasaa.org/wp-content/uploads/2023/02/Series-65-Outline-June-2023.pdf (checked
  2026-11-02): I Economic Factors and Business Information 15% (20), II Investment Vehicle
  Characteristics 25% (32), III Client Investment Recommendations and Strategies 30% (39),
  IV Laws, Regulations, and Guidelines, including Prohibition on Unethical Business Practices
  30% (39). Subtopics used to split the bank's 11 categories (see spec.json).
- FINRA, "Series 65 - NASAA Investment Advisers Law Examination":
  https://www.finra.org/registration-exams-ce/qualification-exams/series65 (checked 2026-11-02):
  130 scored and 10 unscored, 180 minutes, 92 of 130, no corequisites. Retake waits change on
  January 4, 2027 (60 days after a third failure instead of 180). Fee $187 (not used in copy).
- NASAA, "Exams FAQ" (updated February 14, 2025):
  https://nasaa.org/wp-content/uploads/2025/02/Exams-FAQ-PRINTABLE-2025.pdf (checked 2026-11-02):
  92 of 130 is not a percentage cut; no sponsor needed (unsponsored candidates enroll through
  FINRA); passing is a prerequisite to IAR registration, and most states accept CFP, ChFC, PFS,
  CFA and other designations instead (updated May 2024); the Series 66 equals the 63 plus 65;
  two-year rule for state registration.

## Mock test design
Four 50-question tests, 8/12/15/15 by section (20/32/39/39 of 130 scaled), pass line passPct 71
(ceil(0.71 x 50) = 36, close to 92/130 = 70.8%). Pools are exactly 4x the per-test counts.

## Rules and facts used (current as of 2026-11-02)
- Uniform Securities Act (1956, with the 2002 Act where named): definitions of investment adviser,
  IAR, broker-dealer, agent, issuer, nonissuer, sale and offer (bona fide pledge and stock dividend
  not sales; gift of assessable stock is), exclusions (banks, incidental professionals,
  publishers, institutional-only and de minimis), exemptions (offers to existing holders, manual
  exemption), registration by coordination and qualification (prospectus delivery, escrow),
  Administrator powers (cease and desist, final orders need notice, opportunity for hearing and
  written findings), civil liability (survival of actions; 2002 Act 509(f) remedy against an
  adviser), minimum financial requirements.
- NSMIA 1996 and Investment Advisers Act section 203A: federal covered advisers (any adviser to a
  registered investment company; SEC registration from $100 million / $110 million; states keep
  antifraud authority and notice filings; IARs of federal covered advisers register where they
  have a place of business); Rule 506 offerings are federal covered securities (Form D notice).
- SEC three-part adviser test (Release IA-1092); exempt reporting advisers (venture capital fund
  advisers, Advisers Act 203(l)).
- NASAA model rules for state-registered advisers: 102(a)(4)-1 unethical business practices
  (written discretionary authority within 10 business days, unreasonable fees, loans to and from
  clients, misrepresenting qualifications, contract terms on assignment and partnership changes);
  custody rule (fee deduction is custody; inadvertent receipt returned promptly); 203(a)-2 books
  and records (five years, memorandum of each order); brochure delivery (48 hours / five business
  days); business continuity and succession planning; Form ADV annual update within 90 days.
- SEC Rule 204A-1 code of ethics (initial and annual holdings, quarterly transaction reports);
  Rule 206(4)-5 pay-to-play two-year time-out; Advisers Act 206(3) principal and agency cross
  transactions; Section 28(e) soft dollars disclosed in Form ADV Part 2A; ITSFEA written
  insider trading policies; NASAA Model Act to Protect Vulnerable Adults (2016).
- Tax and retirement: SECURE 2.0 RMD age 73 for those born 1951 to 1959; Roth IRA no lifetime RMDs;
  step-up in basis at death, gift basis rules (dual basis for losses); unlimited marital deduction
  and portability; governmental 457(b) not subject to the 10% additional tax; ERISA 404(c) and the
  QDIA rule; HSA, 529, UTMA basics. No indexed dollar figures (contribution limits, exclusions,
  brackets, IRMAA tiers) are asked.

## Overlap checks
Scanned with a string-similarity pass against `data/sie-questions.json`,
`data/series-7-questions.json`, `data/nmls-questions.json` and `tools/next100/series63/q_*.py`
(built at the same time; its lane is the agent and broker-dealer side of the Uniform Securities
Act). Items testing the same fact with the same answer were rewritten: this bank keeps to the
adviser side (IA and IAR definitions, federal covered advisers, fiduciary duty, custody,
discretion, fees) and uses different Uniform Securities Act facts (sale and offer definitions,
manual and existing-holder exemptions, qualification escrow, survival of actions).
