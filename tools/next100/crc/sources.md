# CRC (AAPC Certified Risk Adjustment Coder) bank sources

All 200 questions are original, written for Tigertest from AAPC's own CRC exam page and the CMS,
HHS and NCHS primary documents below. None is copied, adapted or reworded from AAPC practice
exams, the CRC study guide or training course, released items, or any commercial review book or
prep site. Guidelines and concepts only: no code-book lookups. Code numbers appear only where the
ICD-10-CM Official Guidelines themselves name them, and HCC facts always name the model year.

## Outline and format (AAPC)

- AAPC, Taking the CRC exam, fetched 2026-11-19:
  https://www.aapc.com/certifications/crc/taking-the-crc-exam
  100 multiple-choice questions, one 4-hour sitting, 70% to pass (more than 30 wrong fails);
  online with a live remote proctor or at a testing center; ICD-10-CM code book only (current or
  prior year, print or eBook), on-screen calculator. Domains and counts: Compliance 15; Diagnosis
  coding 30 (subtopics: amputations, artificial openings, atherosclerosis, AV fistulas, CHF, CKD,
  complications of devices, COPD, CVA, dementia, depression, DVT, hypertension, malnutrition,
  manifestations, mental disorders, neoplasms, pneumonia, pressure ulcers, pulmonary embolism,
  pulmonary fibrosis, seizures, skin ulcers); Documentation improvement 12; Pathophysiology,
  terminology and anatomy 5; Purpose and use of risk adjustment models 10 (data mining,
  predictive modeling, trumping in the hierarchy); Quality of care 3 (HEDIS, Star Ratings);
  Risk adjustment models 15 (ACA, CDPS, HCC, private payer, elements of a risk score); Cases 10
  (at the end of the exam). No dated change notice on the page.

Blueprint: the eight AAPC domains scaled to 50 per test (7/15/6/3/5/2/7/5). Cases are short
record excerpts applying the coding guidelines and model rules, standing in for AAPC's longer
medical-record cases.

## CMS risk adjustment (Medicare Advantage)

- CMS, Announcement of CY 2027 MA Capitation Rates and Part C and D Payment Policies (April 6,
  2026), fetched 2026-11-19:
  https://www.cms.gov/files/document/2027-announcement.pdf
  CY 2027 keeps the 2024 CMS-HCC model (fully implemented in CY 2026) instead of the proposed
  2027 model; PACE 50/50 blend of 2024 and 2017 models; 2023 ESRD models; normalization factor
  1.079 for the 2024 model; statutory minimum MA coding pattern adjustment 5.90%; diagnoses from
  audio-only services (modifiers 93, FQ) excluded; unlinked chart review records excluded except
  for beneficiaries who switch MA organizations (not for PACE); frailty for FIDE SNPs and PACE;
  risk scores from encounter data and FFS claims only for non-PACE.
- CMS, 2027 MA and Part D Rate Announcement fact sheet, fetched 2026-11-19:
  https://www.cms.gov/newsroom/fact-sheets/2027-medicare-advantage-part-d-rate-announcement
- CMS, Announcement of CY 2024 MA Capitation Rates and Part C and D Payment Policies, fetched 2026-11-19:
  https://www.cms.gov/files/document/2024-announcement-pdf.pdf
  2024 CMS-HCC model: 2018 diagnoses and 2019 expenditures (the 2020 model used 2014 and 2015);
  3-year phase-in 33/67/100%; payment HCCs from 86 to 115; every code maps to an HCC, only payment
  HCCs count; heart failure split into five payment HCCs with cardiomyopathy hierarchically
  excluded; CKD stage 3B and other stage 3 HCCs constrained equal; protein-calorie malnutrition
  and angina pectoris HCCs removed; depression limited to moderate or severe major depression,
  bipolar excludes depression; diabetes with glycemic complications in the lowest payment HCC;
  extremity atherosclerosis payment HCCs mainly rest pain and ulceration or gangrene; toe and
  finger absence in a non-payment HCC; count variables from the 21st Century Cures Act.
- CMS, Medicare Managed Care Manual, Chapter 7, Risk Adjustment (Rev. 118), fetched 2026-11-19:
  https://www.cms.gov/regulations-and-guidance/guidance/manuals/downloads/mc86c07.pdf
  Face-to-face rule; acceptable sources (hospital inpatient, hospital outpatient, physician);
  diagnostic radiology unacceptable; excluded providers; SNFs and hospice as non-covered inpatient
  facilities; additive, prospective, site-neutral models with hierarchies and interactions; five
  demographic factors; community, institutional (more than 90 days) and new enrollee segments
  (under 12 months of Part B in the data year); normalization and MA coding adjustment concepts;
  risk adjustment standardizes bids. Older operational details (RAPS, dated normalization tables)
  are not asked.
- CMS, Risk Adjustment page (model software and acceptable specialty lists), fetched 2026-11-19:
  https://www.cms.gov/medicare/payment/medicare-advantage-rates-statistics/risk-adjustment

## RADV and regulations

- 42 CFR 422.310, Risk adjustment data, Cornell LII, fetched 2026-11-19:
  https://www.law.cornell.edu/cfr/text/42/422.310
  Data definitions, NPI in the billing provider field, medical record samples, penalties for
  false data, repayment of RADV findings, extrapolation from PY 2018, deadlines (first Friday in
  September and March; final deadline not before January 31 after the payment year; after it only
  overpayment corrections).
- 42 CFR 422.311, RADV audit dispute and appeal processes, Cornell LII, fetched 2026-11-19:
  https://www.law.cornell.edu/cfr/text/42/422.311
  60 days to appeal; preponderance of the evidence; one reviewed medical record per audited HCC.
- CMS, Medicare Risk Adjustment Data Validation Program page, fetched 2026-11-19:
  https://www.cms.gov/data-research/monitoring-programs/medicare-risk-adjustment-data-validation-program
- CMS, Contract-Level RADV Medical Record Reviewer Guidance (Version 2.0, January 2020), fetched 2026-11-19:
  https://www.cms.gov/files/document/medical-record-reviewer-guidance-january-2020.pdf
  CMS-generated attestations for missing signatures or credentials; signature stamps; electronic
  signatures; telephone encounters not valid; HRAs valid only face to face with a valid provider;
  amendments (treating physician, observation on the date of service, generally within 90 days;
  third-party additions unacceptable); query forms signed and dated by the provider; abbreviations
  with more than one meaning read in context; acceptable specialty list (nurse practitioner,
  physician assistant). Written for ICD-9-CM; only rules that do not depend on the code set are used.

## Coding guidelines

- NCHS/CDC, ICD-10-CM Official Guidelines for Coding and Reporting FY 2027 (October 1, 2026 to
  September 30, 2027), fetched 2026-11-19:
  https://ftp.cdc.gov/pub/health_statistics/nchs/publications/ICD10CM/2027/ICD-10-CM-October-1-2026-FY27-Guidelines.pdf
  "With" convention; sequela; borderline diagnosis; complications of care; documentation by
  other clinicians (BMI, ulcer depth and stage, NIHSS); HIV; neoplasm current versus history;
  diabetes (combination codes, E11.A remission, Z79 drug codes, secondary diabetes); obesity class;
  substance use hierarchy and remission; dementia severity; dominant side defaults; hypertension
  (I11, I12, I13, I15, I16, I1A.0, H35.0, cerebrovascular); CAD with angina; I69 sequelae and Z86.73;
  AMI 4-week rule, I25.2, I22; COPD exacerbation; pressure and non-pressure ulcers; CKD stages and
  transplant; status codes (Z89 to Z99 note), aftercare (Z43 with Z93), Z79; Section IV
  outpatient rules (chronic diseases, coexisting conditions).

## Other models and quality

- CMS, HHS-Developed Risk Adjustment Model Algorithm DIY Software Instructions, 2025 benefit year
  (March 30, 2026 update), fetched 2026-11-19:
  https://www.cms.gov/files/document/cy2025-diy-instructions-03-30-2026.pdf
  V08 HHS-HCC; concurrent models per metal level and age group (adult 21+, child 2 to 20,
  infant 0 to 1); RXCs in adult models only; enrollment duration factors for adults with an HCC
  enrolled 6 months or less; transfers net to zero within a state market risk pool; EDGE data.
- UC San Diego, Chronic Illness and Disability Payment System (CDPS + Rx), fetched 2026-11-19:
  https://hwsph.ucsd.edu/research/programs-groups/cdps.html
  Medicaid diagnostic model; hierarchical within major categories, additive across them; MRX
  uses NDC codes.
- CMS, Medicare 2027 Part C and D Star Ratings Technical Notes (updated 11/04/2026), fetched 2026-11-19:
  https://www.cms.gov/files/document/2027-tech-notes-2026-09-30.pdf
  1 to 5 stars; half stars at summary and overall levels; outcome, intermediate outcome, patient
  experience, access and process measures; CAHPS, HOS and HEDIS data; Categorical Adjustment
  Index by LIS/dual and disability.
- NCQA, HEDIS page, fetched 2026-11-19: https://www.ncqa.org/hedis/
- MedlinePlus (NLM), A1C test, heart failure and deep vein thrombosis pages, fetched 2026-11-19:
  https://medlineplus.gov/lab-tests/hemoglobin-a1c-hba1c-test/ ,
  https://medlineplus.gov/ency/article/000158.htm and https://medlineplus.gov/deepveinthrombosis.html

## Not confirmed, and left out

- AAPC Knowledge Center articles disagree on MEAT and TAMPER, and CMS does not define either, so
  neither acronym is asked (the cca bank already asks MEAT's letters).
- AHA Coding Clinic is paid and was not read, so no item rests on Coding Clinic advice (chronic
  PE, AV fistula status, hormone therapy as cancer treatment, problem-list linking under ICD-10).
- No HCC numbers, coefficients or relative factors except counts and facts the CY 2024 and CY
  2027 announcements state for a named model year. The proposed 2027 CMS-HCC model was not
  adopted and is not asked beyond that fact.
- Quality bonus payment thresholds were not confirmed on a CMS page read for this build, so they
  are not asked.
- Private payer models are not asked: they are proprietary and vary by payer.
