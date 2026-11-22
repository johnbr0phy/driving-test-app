# Sources for `shrmcp` (SHRM Certified Professional, SHRM-CP)

All 200 questions are original, written from the 2026 SHRM BASK and the SHRM Certification
Handbook and from the federal statutes and regulations the BASK lists. No SHRM sample question,
SHRM Learning System item, past exam item or commercial prep question was copied or reworded, and
no prep provider is named. Built 2026-11-22.

## Exam format (official, SHRM)
- SHRM, SHRM Certified Professional page: https://www.shrm.org/credentials/certification/shrm-cp
  (fetched 2026-11-22): "Four hours in length (including 3 hours and 40 minutes of testing time).
  134 questions (80 knowledge items and 54 situational-judgment items, of which 24 are field-test
  items)." Field-test items do not count toward the score and are mixed with scored items.
  Computer-based, in person at an authorized Prometric test center. About half the items cover the
  three behavioral competency clusters and half the three HR knowledge domains. For people who
  perform HR or HR-related duties at the operational level.
- SHRM, 2026 SHRM Certification Handbook (PDF):
  https://www.shrm.org/content/dam/en/shrm/credentials/shrm-certification/2026-shrm-certification-handbook.pdf
  (fetched 2026-11-22): 134 multiple-choice questions, 80 stand-alone knowledge items and 54
  situational judgment items, plus the statement that both exams include 24 unscored field-test
  items. Item types: Situational Judgment 40%, Foundational Knowledge 10% (behavioral competency
  key concepts), HR-Specific Knowledge 50%. Clusters: Leadership 19%, Business 17.5%, Interpersonal
  13.5%. Domains: People 19%, Organization 18%, Workplace 13%. Timing: two sections of up to 110
  minutes each, independently timed, plus a 2-minute confidentiality reminder, 10-minute tutorial
  and 8-minute survey. Delivered at Prometric test centers in two testing windows a year (May 1 to
  July 15, 2026 and December 1, 2026 to February 15, 2027). Passing scores are set by the Modified
  Angoff method; "The range of possible scores is 120 to 200; all candidates who pass the exam
  receive the maximum score of 200." SHRM publishes no percentage passing score. Eligibility: no HR
  title, degree or prior HR experience required for the SHRM-CP. Fees are listed; deliberately not
  used in copy.
- Older handbooks (2022, 2025) give different cluster weights (for example Leadership 17%); the 2026
  handbook is the version in force on the build date and is the one used.
- SHRM, Certification FAQs (https://www.shrm.org/credentials/certification/certification-faqs) still
  mentions roughly equal knowledge and situational judgment counts; it conflicts with the 2026
  handbook and the SHRM-CP page, so it is not used.

## Content outline (official, SHRM BASK)
- SHRM, SHRM Body of Applied Skills and Knowledge (2026 SHRM BASK, PDF):
  https://www.shrm.org/content/dam/en/shrm/credentials/shrm-certification/bask/shrm-bask.pdf
  (fetched 2026-11-22), linked from https://www.shrm.org/credentials/certification/exam-preparation/bask.
  Eight behavioral competencies in three clusters: Leadership (Leadership & Navigation, Ethical
  Practice, Inclusive Mindset), Interpersonal (Relationship Management, Communication), Business
  (Business Acumen, Consultation, Analytical Aptitude). HR Expertise in three domains and 14
  functional areas: People (HR Strategy, Talent Acquisition, Employee Engagement & Retention,
  Learning & Development, Total Rewards), Organization (Structure of the HR Function,
  Organizational Effectiveness & Development, Workforce Management, Employee & Labor Relations,
  Technology Management), Workplace (Managing a Global Workforce, Risk Management, Corporate Social
  Responsibility, U.S. Employment Law & Regulations). The key concepts listed under each (leadership
  and motivation theories, privacy principles, biases such as microaggressions and cultural
  taxation, Hofstede, conflict styles, negotiation, the communication model, financial statements,
  growth-share matrix, balanced scorecard, Lewin, Kotter, McKinsey 7S, Kubler-Ross, consulting
  phases, reliability and validity, ADDIE, 70-20-10, build/buy/borrow, 9-box grid, ADR, progressive
  discipline, Weingarten, ATS/HRIS/BYOD, expatriate roles, ALE, business continuity, CSR and the
  list of federal laws) set the topics of every question. The BASK gives no weights below the
  cluster and domain level.

## Blueprint (Tigertest)
Handbook weights scaled to 50: Leadership 9.5, Business 8.75, Interpersonal 6.75, People 9.5,
Organization 9, Workplace 6.5. Floors sum to 47; the largest remainders go to Business (9) and
Interpersonal (7); of the three tied half remainders, People (the largest domain) takes 10, giving
Leadership 9, Interpersonal 7, Business 9, People 10, Organization 9, Workplace 6 (25 behavioral,
25 knowledge, matching SHRM's half and half). Pools are four times each count. The three
competency categories mix situational judgment scenarios (single best action) with foundational
knowledge items, roughly in the handbook's 40:10 ratio; the three domain categories are knowledge
items. passPct 70 is Tigertest's readiness line, not a SHRM figure.

## Federal law used (as in force 2026-11-22)
- Title VII of the Civil Rights Act of 1964 (15 or more employees; religious accommodation unless
  undue hardship, Groff v. DeJoy, 600 U.S. 447 (2023)); Uniform Guidelines on Employee Selection
  Procedures, 29 CFR 1607.4(D), four-fifths rule; ADEA (age 40 and over, 20 or more employees);
  Equal Pay Act of 1963 (no reducing any employee's pay to comply).
- Fair Credit Reporting Act, 15 U.S.C. 1681b(b)(3): pre-adverse action notice with a copy of the
  report and the summary of rights.
- FMLA, 29 U.S.C. 2612 (12 workweeks; 26 for military caregiver leave).
- WARN Act, 29 U.S.C. 2101-2102 (100 or more employees; 60 days' notice).
- Employee Polygraph Protection Act of 1988; ERISA; Drug-Free Workplace Act of 1988 (federal
  contractors and grantees; no testing mandate); IRCA and Form I-9 for every new hire; OSHA
  recordkeeping, 29 CFR 1904 (Forms 300, 300A, 301).
- NLRA Section 7 (protected concerted activity, union or not); Section 8 unfair labor practices;
  NLRB v. J. Weingarten, Inc., 420 U.S. 251 (1975).
- H-1B specialty occupation visas (8 U.S.C. 1101(a)(15)(H)(i)(b)).

## Left out on purpose
- Fees, the exam's application windows and deadlines, and any dollar thresholds that change by
  rule or each year (FLSA salary level, benefit limits).
- The exam's own format, scoring and eligibility (landing page and `lib/examFacts.ts` only).
- EEOC guidance documents whose status changed in 2025 are not cited as authority; the background
  check item rests on the FCRA and general disparate impact principles.
- Multiple-response or scored-by-effectiveness formats: SHRM's items are single-best-answer, as here.
