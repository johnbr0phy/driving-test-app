# Sources for `ccs` (AHIMA Certified Coding Specialist exam)

All 200 questions are original, written by Tigertest from public guidelines and CMS rules. No AHIMA
practice exam, study guide or commercial question bank was copied, no item reproduces a CPT code
descriptor (CPT is AMA copyright), and none needs a code-book look-up. Modifier numbers and HCPCS
modifier letters appear as concepts only. Checked 2026-11-04.

## Exam format
- AHIMA, "Certified Coding Specialist (CCS)": https://ahima.org/certification/ccs/ (checked
  2026-11-04): 107 questions, 97 scored and 10 pretest placed at random; 4 hours; computer based at
  Pearson VUE test centers, offered in the US and internationally; candidates may move between
  items once an answer is selected and may flag items for review before submitting; passing score
  300. Eligibility options are recommended, not required (for example two years of related coding
  experience; a CCA plus one year; a coding credential from another body plus one year; or a CCS-P,
  RHIT or RHIA). The page refers to a Medical Scenarios section but gives no size or format, so the
  landing only names the outline's inpatient/outpatient/ED split and says it is not modelled. Fees kept off the site.
- AHIMA, CCS Exam Content Outline (effective 05/01/2024, (c) 2023):
  https://www.ahima.org/media/ecklaulp/css-exam-content-outline-1-1.pdf (PDF read 2026-11-04).
  Domain 1 Coding Knowledge and Skills 39-41% (10 tasks: assign codes, principal/first-listed,
  conventions, CPT/HCPCS modifiers, sequencing, POA, NCCI and medical necessity edits, DRG and APC,
  abstracting, MCC/CC); Domain 2 Coding Documentation 18-22%; Domain 3 Provider Queries 9-11%;
  Domain 4 Regulatory Compliance 18-22% (record completeness, payer-specific guidelines, PSIs and
  HACs, HIPAA, AHIMA Standards of Ethical Coding, UHDDS); Domain 5 Information Technologies 9-11%
  (EHR types, encoder and grouper, CAC, HITECH). Medical Scenarios: inpatient 33.3%, outpatient
  33.3%, emergency department 33.3% (not modelled).
- AHIMA, CCS 2026 Exam Required Code Books, effective 05/01/2026 (updated 01/13/2026):
  https://www.ahima.org/media/4vxpzr3q/ccs_2026_codebook_list.pdf : one 2026 ICD-10-CM book and one
  2026 ICD-10-PCS book from the approved list, and the AMA CPT 2026 Professional Edition; candidates
  without the correct books cannot test and forfeit their fees.

## Blueprint used here (per 50-question test)
Domain midpoints (40/20/10/20/10) scaled to 50: Domain 1 20 (inpatient ICD-10-CM 6, ICD-10-PCS 4,
outpatient and ED coding with CPT/HCPCS modifiers 5, MS-DRGs, APCs, edits and abstracting 5),
Domain 2 10, Domain 3 5, Domain 4 10, Domain 5 5. The split inside Domain 1 is Tigertest's. Pools
are four times each count, so no item repeats across tests. Multiple choice only.

## Content sources
- ICD-10-CM Official Guidelines for Coding and Reporting FY2026 (Sections I to IV, Appendix I POA)
  and ICD-10-PCS Official Guidelines FY2026 (CMS / CDC NCHS; public domain).
- CMS: MS-DRG definitions (CC/MCC lists and CC exclusions, Pre-MDC, unrelated OR DRGs), IPPS
  HAC-POA payment provision and HAC categories, HAC Reduction Program, Hospital Readmissions
  Reduction Program, two-midnight rule, condition code 44, MOON, OPPS (status indicators,
  pass-through, C codes, observation, facility visit level guidelines, drug administration
  hierarchy, modifiers 27, 73, 74, PO, PN), JW/JZ policy, NCCI Policy Manual and MUE adjudication
  indicators, I/OCE and MCE, Conditions of Participation (H&P timing, authentication), Medicaid
  NDC requirement, ACA 60-day overpayment rule.
- AHRQ Patient Safety Indicators (PSI 03, 06, 13, PSI 90 composite).
- AHIMA Standards of Ethical Coding; AHIMA/ACDIS Guidelines for Achieving a Compliant Query
  Practice (2022 update).
- HHS: HIPAA Privacy, Security and Breach Notification Rules and HITECH (45 CFR 160 and 164),
  HIPAA code set standards; de-identification guidance (Safe Harbor).
- UHDDS definitions (significant procedure, data elements); ONC and HL7, SNOMED CT, LOINC, RxNorm.

## Kept apart from other banks
Written against `data/cca-questions.json` and `data/cpc-questions.json`: no item repeats a fact and
answer from either (for example CCA's modifier 77, NCCI indicators 0/1/9, CAC precision and
OIG/False Claims items, and CPC's modifier and surgery-package items are left to those banks).
