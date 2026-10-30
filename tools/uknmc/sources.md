# NMC CBT (`uknmc`) sources

All 272 questions are original, written from the official documents below. No item is copied from
NMC or Pearson VUE practice material or from another Tigertest bank.

## Format and blueprint (checked 2026-10-30)
- NMC, "The Test of Competence 2021 (nursing): Test specification for candidates"
  (nmc.org.uk/globalassets/sitedocuments/registration/toc-21/toc-21-test-specification---nursing.pdf).
  CBT = one test of 115 questions in 3 hours: Part A Numeracy, 15 marks, 30 minutes, "constructed
  one-number answers", correct unit may be needed; Part B Clinical, 100 marks, 2 hours 30 minutes,
  four-option single-answer MCQs. Table 3 (Part A): measuring the correct dose 2, metric units 2, oral
  medications 4, injections 3, intravenous infusions 3, fluid balance 1. Table 4 (Part B): Platform 1
  17, P2 10, P3 14, P4 15, P5 10, P6 10, P7 10, Annexe A 7, Annexe B 7. 10% of Part B items are
  field-specific. Pass marks: Part A 87% (13 of 15); Part B "generally set within a range of
  60%-70%" by field, standard set by Angoff and maintained statistically.
- NMC, "Test of Competence 2021: Adult nursing blueprint" V1.0 (toc-materials-2023): the seven
  platforms of the Standards of proficiency for registered nurses (2018) and Annexes A
  (communication and relationship management skills) and B (nursing procedures).
- NMC, "Test of Competence: Part 1 Midwifery candidate information booklet" V.3, April 2025 (the
  nursing booklet has the same CBT section): on-screen calculator available; erasable note board;
  answers can be reviewed and changed; no negative marking; about 2 minutes per numeracy question
  and 1.5 minutes per MCQ; a pass or fail result for each part.
- NMC CBT web page (nmc.org.uk/registration/joining-the-register/toc/toc-2021/cbt/): Part A and B sat
  together in one sitting, passed or failed independently; fees 83 GBP both parts, 50 GBP Part A
  resit, 70 GBP Part B resit; three attempts per application, at least 10 days apart; failed part only
  resat.
- Note: the builder brief said Part B is 2 hours 40 minutes; every current NMC source says 2 hours 30
  minutes, which is what the config and landing use.

## Clinical content
- NMC, The Code (2015, updated 2018); NMC revalidation guidance (450 hours, 35 CPD hours with 20
  participatory, 5 feedback, 5 reflective accounts, reflective discussion with an NMC registrant);
  NMC guidance on social media and on raising concerns; NMC Standards for student supervision and
  assessment (2018, updated 2023).
- Mental Capacity Act 2005 and Code of Practice; Mental Health Act 1983 s5(4); Care Act 2014;
  Equality Act 2010; Human Rights Act 1998; Public Interest Disclosure Act 1998; FGM mandatory
  reporting duty (Serious Crime Act 2015, England and Wales); Montgomery v Lanarkshire [2015] UKSC 11.
- Royal College of Physicians, NEWS2 (2017): parameter bands, Scale 2 use, thresholds 5 and 7, single
  red score 3.
- NICE NG51 sepsis (2024 update), CG179 and QS89 pressure ulcers (risk assessment within 6 hours,
  repositioning at least 6-hourly, 4-hourly if high risk), NG128 stroke, CG103 delirium, NG5 medicines
  optimisation, NG24 transfusion, NG89 VTE, NICE BMI thresholds for ethnic groups (PH46 / CG189 update).
- BAPEN MUST; IDDSI framework; Bristol Stool Chart; 4AT; Abbey Pain Scale; Clinical Frailty Scale.
- British Thoracic Society oxygen guideline (94 to 98%, 88 to 92% for hypercapnic risk).
- Resuscitation Council UK anaphylaxis guideline (2021): adrenaline 500 micrograms IM for adults.
- JBDS hospital hypoglycaemia and DKA guidance (glucose below 4.0 mmol/L; 15 to 20 g quick-acting
  carbohydrate; DKA ketones 3.0 mmol/L or more).
- National Infection Prevention and Control Manual (England); WHO five moments; Health and Safety
  (Sharp Instruments in Healthcare) Regulations 2013; HTM 07-01 waste colour coding; NHS Improvement
  nasogastric tube placement alert (pH 5.5 or below); VIP score; PSIRF (NHS England, 2022).
- UK CMO alcohol (2016) and physical activity (2019) guidelines; NHS screening programmes in England
  (bowel 50 to 74 every two years, breast 50 to 71st birthday every three years, AAA men at 65, NHS
  Health Check 40 to 74 every five years); folic acid 400 micrograms; vitamin D 10 micrograms.
- Manual Handling Operations Regulations 1992 (TILE); LOLER 1998 (6-monthly thorough examination of
  equipment for lifting people); SCST 12-lead ECG electrode placement.

## Conventions
- UK spelling, UK drug names and units: micrograms written in full, insulin "units" in full,
  standard giving set 20 drops/mL, blood giving set 15 drops/mL, mmol/L.
- Numeric stems say the unit, the rounding and "Type the number only". Answers are digits, ".", "-".
- Sources list each single item's key first; `build.py` shuffles by a stem seed.
