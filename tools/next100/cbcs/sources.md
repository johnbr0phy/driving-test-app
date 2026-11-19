# CBCS (NHA) bank sources

All 200 questions are original, written for Tigertest from the official test plan and the primary
laws, regulations and CMS manuals below. None is copied, adapted or reworded from NHA study
guides, NHA practice tests, the CBCS Preparation Suite, released items or any commercial review
book or prep site. No CPT descriptor is quoted and no item needs a code book lookup.

PDFs were downloaded with curl and read as text with macOS PDFKit (osascript JavaScript), since
the local python3 is 3.9 with no PDF library; `build.py` needs no shim because it uses no
3.10-only syntax.

## Outline (National Healthcareer Association)

- NHA, Certified Billing and Coding Specialist (CBCS) Test Plan for the CBCS Exam, the plan NHA's
  certification page links, fetched 2026-11-19:
  https://fs.hubspotusercontent00.net/hubfs/1430252/Test%20Plans/2021-nha-certified-billing-and-coding-specialist-(cbcs)-test-plan-10-08.pdf
  (same content at https://staticcontent.nhanow.com/externalcontent/cbcs/resources/NHA_CBCS_TestPlan.pdf,
  fetched 2026-11-19). "Based on the results of a job analysis completed in 2020" (footer:
  "2020 Practice Analysis Study"). 100 scored items and 25 pretest items, exam time 3 hours.
  Domains and scored items: 1 The Revenue Cycle and Regulatory Compliance 15; 2 Insurance
  Eligibility and Other Payer Requirements 20; 3 Coding and Coding Guidelines 32; 4 Billing and
  Reimbursement 33. Tasks 1A-1E, 2A-2C, 3A-3F, 4A-4M and knowledge statements k1 to k57 were used
  category by category.
- NHA, Medical Billing and Coding certification page, fetched 2026-11-19:
  https://www.nhanow.com/certifications/billing-coding
  Links the test plan above. Eligibility: a medical billing and coding training program within
  the last 5 years, or 1 year of supervised work experience in the last 3 years (or 2 in the last
  5), plus a high school diploma or equivalent. Exam at the candidate's school, a PSI testing
  center or by live remote proctoring. Renewal every two years with 10 continuing education
  credits.
- NHA, CBCS Study Guide, Practice Tests, and Exam: Common FAQ (6/2025), fetched 2026-11-19:
  https://info.nhanow.com/hubfs/FAQs/CBCS%20FAQ_June%202024.pdf
  The exam covers CPT, HCPCS Level II and ICD-10-CM. Since September 24, 2024, coding manuals
  are neither needed nor allowed: the information each coding item needs is shown with it. The
  exam is reviewed every year; the blueprint stays the same. No pharmacology content.

## Format (NHA Candidate Handbook, updated 10/05/2026)

- NHA Candidate Handbook, fetched 2026-11-19:
  https://www.nhanow.com/docs/default-source/test-plans/candidate_handbook.pdf
  Scaled scores run from 200 to 500 and a scaled score of 390 or higher passes any NHA exam; the
  scale weights questions by difficulty, so 390 is not a fixed percentage. Built-in exam
  calculator only. After a failed attempt a candidate waits 30 days; three attempts with at least
  30 days between them, then one year after each further failure; each retake is paid in full
  (fees are never stated by Tigertest).
- NHA, 2024 Pass Rates for NHA Examinations, fetched 2026-11-19:
  https://www.nhanow.com/docs/default-source/annual-pass-rates/nha-annual-pass-rates.pdf
  "The scaled passing score for all examinations is 390/500." CBCS: 6,905 exams in 2024, 73.82%
  passing, 16,700 active certifications at the end of 2024.

## Law, regulation and CMS guidance used in questions

- CMS, FY 2027 ICD-10-CM Official Guidelines for Coding and Reporting (October 1, 2026 to
  September 30, 2027), fetched 2026-11-19:
  https://www.cms.gov/files/document/fy-2027-icd-10-cm-coding-guidelines.pdf
  Conventions (NEC, brackets, parentheses, "and", "with", "see also", default codes, clinical
  criteria), I.B (Index then Tabular, combination codes, one code per encounter, laterality,
  impending conditions, syndromes), I.C.9 hypertensive CKD, I.C.19 (superficial injuries, nerve
  injury, iatrogenic injury, fractures, burns and the rule of nines), Section IV (observation,
  diagnostic services, chemotherapy, general exams with abnormal findings, ambulatory surgery).
- CMS, ICD-10 page (current guideline files), fetched 2026-11-19:
  https://www.cms.gov/medicare/coding-billing/icd-10-codes
- CMS, Medicare Claims Processing Manual, chapter 26 (CMS-1500 items), fetched 2026-11-19:
  https://www.cms.gov/Regulations-and-Guidance/Guidance/Manuals/downloads/clm104c26.pdf
  Items 11, 12 (signature by mark), 13, 17, 21 (no decimal, ICD indicator 0), 23, 24B, 24E (one
  pointer), 24F, 24G (anesthesia minutes, units), 24J (incident-to supervisor), 32, 33.
- NUCC, 1500 Claim Form Reference Instruction Manual, version 13.0 7/25, fetched 2026-11-19:
  https://www.nucc.org/images/stories/PDF/1500_claim_form_instruction_manual_2025_07-v13.pdf
  Item 22 frequency codes 7 (replacement) and 8 (void/cancel); item 23 prior authorization,
  referral, mammography or CLIA number.
- CMS, Medicare Claims Processing Manual, chapter 12 (physician services), fetched 2026-11-19:
  https://www.cms.gov/Regulations-and-Guidance/Guidance/Manuals/downloads/clm104c12.pdf
  Modifiers 22 (statement plus operative report; 0, 10 or 90 day globals), 54, 55, 58, 62, 66,
  80, 82, AS; multiple surgery 100%/50%; consultation codes not recognized since 2010; AWV G0438
  and G0439, IPPE G0402.
- CMS, Medicare Claims Processing Manual, chapter 30 (ABN), fetched 2026-11-19:
  https://www.cms.gov/Regulations-and-Guidance/Guidance/Manuals/downloads/clm104c30.pdf
  Emergency or great duress, Option 1 and 2, dually eligible beneficiaries check Option 1.
- CMS, Medicare Claims Processing Manual, chapter 1 (participation and mandatory assignment,
  section 30.3), fetched 2026-11-19:
  https://www.cms.gov/Regulations-and-Guidance/Guidance/Manuals/downloads/clm104c01.pdf
- CMS, Evaluation and Management Services, MLN006764 (May 2026), fetched 2026-11-19:
  https://www.cms.gov/outreach-and-education/medicare-learning-network-mln/mlnproducts/downloads/eval-mgmt-serv-guide-icn006764.pdf
  Level by MDM or time; full time needed, no midpoint rule; documenting time; history and exam
  do not set the level; chief complaint; split or shared visits and modifier FS; same-day
  admission and discharge; services crossing midnight; primary care exception.
- CMS, Place of Service Code Set, fetched 2026-11-19:
  https://www.cms.gov/medicare/coding-billing/place-of-service-codes/code-sets
- CMS, NCCI edits pages and How to Use the Medicare NCCI Tools (MLN901346) chapters 1 and 2,
  fetched 2026-11-19:
  https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits
  https://www.cms.gov/Outreach-and-Education/MLN/Educational-Tools/MLN901346-How-to-use-the-Medicare-NCCI/ncci-medicare/chapter_2_using_the_ncci_tools/
  https://www.cms.gov/outreach-and-education/mln/educational-tools/mln901346-how-to-use-the-medicare-ncci/ncci-medicare/chapter_1_introduction/
  https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-add-code-edits
  https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-medically-unlikely-edits
  MUE adjudication indicators 1, 2 and 3; MUEs are not usage guidelines; modifiers only when
  clinically justified; add-on codes payable only with an eligible primary.
- CMS, Discarded Drugs and Biologicals: JW and JZ Modifier Policy FAQs, fetched 2026-11-19:
  https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/HospitalOutpatientPPS/Downloads/JW-Modifier-FAQs.pdf
- CMS, Healthcare Common Procedure Coding System page (last modified 10/02/2026), fetched 2026-11-19:
  https://www.cms.gov/medicare/coding-billing/healthcare-common-procedure-system
- 45 CFR Part 164 (HIPAA Privacy and Breach rules), read through the eCFR API as of 2026-11-17,
  fetched 2026-11-19:
  https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164
  Sections 164.402 (presumed breach), 164.502(b) (minimum necessary, not for disclosures to the
  individual), 164.504(e) and 164.502(e) (business associates), 164.506 (TPO, consent optional),
  164.508 (authorization core elements, revocation in writing, no conditioning, copy to the
  individual), 164.510(b) (family involved in payment), 164.512(e) and (l) (subpoenas, workers'
  compensation), 164.514(b) (identifiers of relatives), 164.520 (notice by first service),
  164.522 (restrictions, confidential communications), 164.524 (30 days).
- 45 CFR 162.1002 (HIPAA code sets: CPT, CDT, NDC, ICD-10-PCS), 45 CFR 147.120 (dependent
  coverage to 26), 45 CFR 147.136 (internal appeals and external review), 29 CFR 2560.503-1
  (180 days to appeal), 42 CFR 424.44 (Medicare filing limit), 12 CFR 1002.2 (Regulation B
  prohibited bases), 16 CFR 681 (Red Flags Rule), all read through the eCFR API, fetched 2026-11-19:
  https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-162/subpart-J/section-162.1002
  https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XXV/subchapter-G/part-2560/section-2560.503-1
  https://www.ecfr.gov/current/title-16/chapter-I/subchapter-F/part-681
- False Claims Act, 31 U.S.C. 3729 and 3730, fetched 2026-11-19:
  https://www.govinfo.gov/content/pkg/USCODE-2023-title31/html/USCODE-2023-title31-subtitleIII-chap37-subchapIII-sec3729.htm
  https://www.law.cornell.edu/uscode/text/31/3730
- Fair Debt Collection Practices Act definitions, 15 U.S.C. 1692a(6), fetched 2026-11-19:
  https://www.law.cornell.edu/uscode/text/15/1692a
- HHS OIG, Health Care Fraud Self-Disclosure Protocol (updated October 15, 2026), fetched 2026-11-19:
  https://oig.hhs.gov/documents/self-disclosure-info/11951/hhs-oig-self-disclosure-protocol.pdf
  Overpayment-only matters go to the contractor's refund process; Stark-only conduct to CMS's
  SRDP; not for opinions (advisory opinions); minimum 1.5 multiplier; presumption against
  integrity agreements; the Hotline is for others' misconduct.
- HHS OIG, General Compliance Program Guidance (November 2023), fetched 2026-11-19:
  https://oig.hhs.gov/documents/compliance/1135/HHS-OIG-GCPG-2023.pdf
- CMS, Medicare Fee-for-Service Recovery Audit Program page (last modified 09/28/2026) and the
  Recovery Audit Program Improvements document, fetched 2026-11-19:
  https://www.cms.gov/data-research/monitoring-programs/medicare-fee-service-compliance-programs/medicare-fee-service-recovery-audit-program
  https://www.cms.gov/Research-Statistics-Data-and-Systems/Monitoring-Programs/Medicare-FFS-Compliance-Programs/Recovery-Audit-Program/Downloads/Recovery-Audit-Program-Improvements-November-24-2017.pdf
- X12, Claim Adjustment Group Codes and Claim Adjustment Reason Codes, fetched 2026-11-19:
  https://x12.org/codes/claim-adjustment-group-codes
  https://x12.org/codes/claim-adjustment-reason-codes
- NAIC Coordination of Benefits Model Regulation (MDL-120), fetched 2026-11-19:
  https://content.naic.org/sites/default/files/model-law-120.pdf
  Birthday rule (month and day only), non-dependent before dependent, active before retired,
  employee before COBRA, court decree, joint custody, a plan without a COB provision is primary.
- CMS, Qualified Medicare Beneficiary Program page (03/16/2026), fetched 2026-11-19:
  https://www.cms.gov/medicare/medicaid-coordination/about/qualified-medicare-beneficiary-program
- Medicare.gov, Skilled nursing facility care, fetched 2026-11-19:
  https://www.medicare.gov/coverage/skilled-nursing-facility-snf-care
- HealthCare.gov, Out-of-pocket maximum/limit glossary, fetched 2026-11-19:
  https://www.healthcare.gov/glossary/out-of-pocket-maximum-limit/
- FTC, Debts and Deceased Relatives (February 2023), fetched 2026-11-19:
  https://consumer.ftc.gov/articles/debts-and-deceased-relatives
- U.S. Courts, Chapter 13 Bankruptcy Basics, fetched 2026-11-19:
  https://www.uscourts.gov/court-programs/bankruptcy/bankruptcy-basics/chapter-13-bankruptcy-basics

## Could not be loaded or confirmed

- The current MLN Fraud & Abuse booklet (MLN4649244) is no longer on cms.gov; false claim
  examples come from OIG's General Compliance Program Guidance instead.
- medicaid.gov's CHIP page returned 404; the CHIP item states only the program's general purpose
  (uninsured children in families with incomes above Medicaid limits), which is not disputed.
- CMS's Medicare audio-only telehealth rules (modifier 93) depend on legislation that may lapse;
  no item asks about them.
- NHA publishes no split inside its four domains; the category split below is Tigertest's.

## Bank decisions

- Per 50-question test, scaled from the test plan's 15/20/32/33 of 100: Domain 1, 8 (privacy 4,
  compliance and revenue cycle 4); Domain 2, 10 (eligibility 5, payers and COB 5); Domain 3, 16
  (ICD-10-CM 6, CPT and HCPCS 5, E/M and place of service 3, documentation and terminology 2);
  Domain 4, 16 (claims and edits 6, payments and adjustments 5, appeals, aging and collections 5).
- Tigertest's 70% line is a readiness target; NHA's 390 is a scaled score, not a percent.
- No question asks about the exam itself; no fees, penalty amounts or state rules. Money appears
  only inside worked computations.
- Duplicates: written against data/cpc, cca, ccs, cpb, crc, cmaa, cehrs and ccma question banks
  and scanned item by item (stem and key overlap). About 35 drafts that repeated a fact and answer
  there (NCCI quarterly updates, consultation codes since 2010, ABN timing, October 1 updates, OIG
  seven elements, the 835, an out-of-pocket maximum sum, JZ, HCPCS format, acute and chronic,
  upcoding, unbundling, CPT and HCPCS maintainers, integral symptoms, ICD-10-PCS, informed consent,
  business associate agreements, 30-day access, displaced and closed fractures, next of kin,
  cholecystectomy, modifier 58, code also, NDC, authorization expiration, ERA posting, rule of
  nines, ABN for Original Medicare, canceled surgery, encounter form) were replaced.
