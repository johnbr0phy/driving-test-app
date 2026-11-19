# Sources for `contractorlaw` (contractor Business and Law exam)

All 200 questions are original, written by Tigertest from the subject areas in state Business
and Law candidate bulletins and from primary federal law, IRS publications and standard
construction business practice. No question from the NASCLA Contractors Guide to Business, Law
and Project Management, a state or PSI practice exam, a past exam or a commercial prep course was
used, the Guide (a paid book) was not read or quoted, and no prep provider is named. Every
computed key is recomputed in `build.py`. Checked 2026-11-18.

## Content outline (official, confirmed)
- PSI Services, Georgia State Licensing Board for Residential and General Contractors, Candidate
  Information Bulletin, updated 4/28/2025, https://test-takers.psiexams.com/api/content/bulletin/972
  (fetched 2026-11-18): Business & Law Exam, required of every Georgia residential and general
  contractor; 50 questions, 70% (35 correct), 120 minutes, open book with the
  Georgia-NASCLA Contractors Guide to Business, Law and Project Management (3rd edition);
  subject areas Licensing Requirements 5, Estimating and Bidding 7, Business Organization and
  Financial Management 7, Tax Laws 5, Labor Laws 5, Project Management and Lien Law 6, Contracts 6,
  Risk Management 4, Environmental and Safety 5. Silent non-programmable calculator allowed.
- PSI Services, Hawaii Contractors License Board (hitrade) Candidate Information Bulletin,
  1/20/2026, https://test-takers.psiexams.com/api/content/bulletin/10625 (fetched 2026-11-18):
  Business and Law, required of new applicants; 80 questions, 75%, 180 minutes, closed book;
  Business Organization 3, Contract Management 12, Estimating and Bidding 10, Financial
  Management 7 (9 from 3/30/26), Labor Law 5, Licensing 7 (8 from 3/30/26), Lien Law 5, Project
  Management 9, Risk Management 8, Safety - OSHA 6, Tax Laws 5, Public Works Law 3 (removed from
  3/30/2026). Reference: NASCLA Contractors Guide to Business, Law and Project Management, Hawaii
  edition.
- NASCLA, State Business and Law Exams, https://www.nascla.org/state-business-and-law-exams
  (fetched 2026-11-18): NASCLA does not administer the states' Business and Law exams; it works
  with states to publish their editions of the NASCLA Contractor's Guide; lists the participating
  state agencies.
- NASCLA Accredited Examination bulletin, https://test-takers.psiexams.com/api/content/bulletin/6677
  (11/11/2026) and the commercial general building contractor bulletin,
  https://test-takers.psiexams.com/api/content/bulletin/1458 (updated 4/15/2026), both fetched
  2026-11-18: the NASCLA accredited exams cover the trade portion only, and candidates also take
  their state's business and law examination.

The Tigertest blueprint follows the shared subject areas of these bulletins. The state licensing
requirements area is left out (every state's rules differ), and its share goes to the other
areas: business organization 4, financial management 7, estimating 7, project management and
liens 5, contracts 6, risk management 4, tax 6, labor 6, safety and environment 5 per 50.

## Exam format (official)
- Georgia: 50 questions, 120 minutes, 70%, open book (bulletin 972 above).
- Hawaii: 80 questions, 180 minutes, 75%, closed book (bulletin 10625 above).
- Other states set their own counts, times, pass marks and references; the landing gives only
  these two dated examples and says to check the state's bulletin. Fees exist and are not used.

## Federal law and IRS guidance used in questions
- IRS Publication 15 (2026), Circular E, Employer's Tax Guide, https://www.irs.gov/publications/p15
  (fetched 2026-11-18): Social Security 6.2% each and Medicare 1.45% each for 2026; Additional
  Medicare Tax 0.9% employee only; FUTA 6.0% with up to 5.4% credit (0.6% net); FUTA deposit when
  a quarter's liability is over $500, by the last day of the month after the quarter; Form 941
  due April 30, July 31, October 31, January 31; deposits by EFT; $100,000 next-day rule;
  lookback period; supplemental wages 22%; backup withholding 24% reported on Form 945; keep
  employment tax records at least 4 years; trust fund recovery penalty; employer remains
  responsible when payroll is outsourced.
- IRS Publication 583, Starting a Business and Keeping Records, https://www.irs.gov/publications/p583
  (fetched 2026-11-18): business structures and their returns (Schedule C, Form 1065, Form 1120,
  Form 1120-S, Schedule SE), S election and double taxation, LLC classification (Form 8832), one
  EIN per entity, Form W-9, cash and accrual methods, double-entry bookkeeping, estimated tax.
- IRS, Independent contractor (self-employed) or employee?,
  https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee
  (fetched 2026-11-18): behavioral control, financial control, type of relationship.
- IRS, About Form 941, https://www.irs.gov/forms-pubs/about-form-941 and Instructions for Form
  940, https://www.irs.gov/instructions/i940 (fetched 2026-11-18).
- 8 CFR 274a.2 (eCFR, https://www.ecfr.gov/current/title-8/section-274a.2, fetched 2026-11-18):
  Form I-9 Section 1 at the time of hire, Section 2 within three business days, both at hire for
  employment under three business days, no receipts then, retention 3 years after hire or 1 year
  after termination.
- 29 CFR 778.104, 778.107 (each workweek stands alone; overtime at 1.5 times the regular rate);
  29 CFR 516.5 and 516.6 (payroll records 3 years, time cards 2 years); 29 CFR 570.2, 570.33,
  570.67, 570.68 (child labor: 18 for hazardous orders, parent exemption excluded; 14 and 15 not
  at construction sites; roofing Order 16; excavation Order 17 over 4 feet); 29 CFR 825.104,
  825.110, 825.200 (FMLA 50 employees, 75 miles, 12 workweeks); 29 CFR 5.5 (weekly certified
  payrolls), all from eCFR, https://www.ecfr.gov/current/title-29, fetched 2026-11-18.
- U.S. Code via Cornell LII, fetched 2026-11-18: 29 U.S.C. 630 (ADEA employer, 20 employees),
  https://www.law.cornell.edu/uscode/text/29/630; 42 U.S.C. 2000e (Title VII);
  42 U.S.C. 12111 (ADA, 15 employees); 29 U.S.C. 206(d) (Equal Pay Act exceptions);
  29 U.S.C. 157 (NLRA section 7); 29 U.S.C. 218 (higher state minimum wage);
  29 U.S.C. 660(c) (OSH Act 11(c)); 40 U.S.C. 3131 (Miller Act bonds); 15 U.S.C. 1 (Sherman Act).
- OSHA, 29 CFR 1926 and 1904 (eCFR, fetched 2026-11-18): 1926.20(b)(2) competent person
  inspections; 1926.21(b)(2) training; 1926.451(g) scaffolds; 1926.502(d) fall arrest;
  1926.651(g) atmosphere testing over 4 feet; 1926.652 protective systems; 1926.1053(b)(5)
  ladder angle; 1926.1153(g) silica exposure control plan reviewed at least annually; 1904.1
  partial exemption by company size; 1904.29 seven calendar days; 1904.32 executive
  certification; 1904.33 updating stored logs; 1904.35 employee copy by end of next business
  day; 1904.39 reporting (800 number or online when the area office is closed; public highway
  crashes outside work zones; deaths within 30 days); 1904.40 four business hours.
- EPA, 40 CFR 745.84 and 745.89 and the Lead Renovation, Repair and Painting Program page,
  https://www.epa.gov/lead/lead-renovation-repair-and-painting-program-rules (fetched 2026-11-18):
  pre-1978 homes, pamphlet no more than 60 days before, certificate of mailing at least 7 days
  before, certified renovator assigned to each job.
- EPA, 40 CFR 122.26 (stormwater, one acre or more) and 40 CFR 112.1 (SPCC exemption at 1,320
  gallons aboveground, counting containers of 55 gallons or more), eCFR, fetched 2026-11-18.

## Contract law (general principles)
- UCC 2-201, https://www.law.cornell.edu/ucc/2/2-201 (fetched 2026-11-18), statute of frauds for
  goods of $500 or more.
- Cornell LII Wex entries, fetched 2026-11-18: consideration, liquidated damages, parol evidence
  rule, anticipatory breach, novation, force majeure, indemnity, mechanic's lien, surety,
  arbitration, mediation, counteroffer, consequential damages, implied warranty, severability
  clause, statute of limitations (https://www.law.cornell.edu/wex/).

## Left out on purpose
- Each state's licensing law, lien deadlines and notices, workers' compensation and
  unemployment rules, sales tax, public works law and contractor bonds: they differ by state.
  Questions say lien law and pay-if-paid enforceability vary by state and assert no state rule.
- The NASCLA Contractors Guide's own content and figures (paid, not read).
- Indexed or recently changed dollar thresholds (Social Security wage base, 1099 reporting
  threshold, Miller Act and Davis-Bacon contract amounts), fees, fines and penalty amounts.
- Facts and answers already asked in the `osha`, `phr`, `afsp`, `nhie`, `jelec`,
  `property-casualty`, `real-estate` and `cpa-reg` banks were rewritten or replaced.
