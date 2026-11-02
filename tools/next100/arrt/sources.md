# ARRT Radiography bank sources

Checked 2026-11-02.

- ARRT, Radiography Examination Content Specifications, board approved January 2021, implementation
  date January 1, 2022 (the version in force for exams through February 28, 2027). Copy published by
  Indian Hills Community College, read directly:
  https://www.indianhills.edu/academics/health/docs/rad-tech/arrt-examination-content-specifcations.pdf
  200 scored questions plus 30 unscored (pilot) questions. Patient Care 33 (Patient Interactions and
  Management 33); Safety 50 (Radiation Physics and Radiobiology 21, Radiation Protection 29); Image
  Production 51 (Image Acquisition and Evaluation 26, Equipment Operation and Quality Assurance 25);
  Procedures 66 (Head, Spine and Pelvis 18, Thorax and Abdomen 20, Extremities 28). SI units are the
  primary units of radiation measurement. Content outline topics used for every category.
- ARRT news, "Updated Radiography Documents" (published 2026-05-01):
  https://www.arrt.org/news/article/2026/05/01/updated-radiography-documents-2026
  Revised content specifications take effect March 1, 2027. Changes: computed radiography (CR) content
  removed; virtual grids added, compensating filters removed; body habitus replaces morbid obesity;
  pregnancy, Image Wisely and Image Gently added; digital detectors (DQE, exposure latitude) replace
  "image receptors"; security, confidentiality and teleradiography added to informatics; lumbar
  puncture and epidural injections added to myelography; joint injections and aspirations to
  arthrography; foreign body, C-arm line placement and NG/OG tube placement to thorax; intravenous
  urography removed.
- ARRT, Radiography Examination Content Specifications (2027), board approved January 2026,
  implementation date March 1, 2027, read directly:
  https://assets-us-01.kc-usercontent.com:443/406ac8c6-58e8-00b3-e3c1-0c312965deb2/99c55d51-15bb-4a87-89f3-d6e7013d8a74/Radiography_Content_Specifications_2027.pdf
  Still 200 scored + 30 pilot. Patient Care 31; Safety 46 (physics/radiobiology 21, protection 25);
  Image Production 51 (26, 25); Procedures 72 (head/spine/pelvis 20, thorax/abdomen 22, extremities 30).

## Guide-only figures (labelled as such on the landing; not from an ARRT page)

- Passing standard: a scaled score of 75 on a scale of 1 to 99 (not 75% correct). Reported
  consistently by study guides, e.g. https://open-exam-prep.com/study-guides/arrt-radiography/introduction/exam-facts-format-scoring
  (checked 2026-11-02). arrt.org exam pages render client-side and could not be read here.
- Appointment and test time: guides conflict (230 minutes of test time in a 250-minute appointment,
  or 200 minutes in a 230-minute window). Left out of the bank and the facts; the landing says to
  check the ARRT handbook.
- Up to three attempts in a three-year window: guides only; not stated on the landing.
- Exam and reapplication fees: never stated.

## Bank decisions

- Tigertest's 75% practice target mirrors the 75 scaled score but is not the ARRT pass mark.
- Per 50-question test: 8 / 5 / 7 / 7 / 6 / 5 / 5 / 7, scaled from the 2022 counts above.
- Clinical facts follow standard radiography references (positioning, radiation protection under
  NCRP Reports 102, 116 and 160 and 21 CFR as named in the outline): NCRP 116 occupational limit
  50 mSv/yr, cumulative 10 mSv x age, embryo-fetus 0.5 mSv/month, under-18 students 1 mSv/yr;
  2.5 mm Al total filtration above 70 kVp; Bucky slot cover 0.25 mm Pb; fluoro 5-minute timer;
  minimum SSD 38 cm fixed / 30 cm mobile; collimator alignment within 2% of SID; mobile exposure
  cord at least 2 m (6 ft); housing leakage 100 mR/h (about 1 mGy/h) at 1 m.
- No image items: positioning, anatomy and findings are described in words.
- Calculation items (mAs, exposure time, inverse square, direct square, 15% rule, grid conversion,
  magnification, heat units, light-field tolerance) compute their keys in the q_*.py source with
  asserts.
- One CR item (ARRT-EQP-014, the plate reader laser) remains because CR is on the outline until
  February 28, 2027; replace it when the 2027 specifications take effect.
- No exam-admin questions; no prices or fees; no commercial prep provider named.

All 200 items are original, written for Tigertest from the outline above. None is copied from any
published registry review or ARRT material.

## Review pass (2026-11-02)

Every calculation recomputed (mAs, time, inverse and direct square, 15% rule, grid factors 8:1 = 4,
12:1 = 5, 16:1 = 6, magnification, heat units 1.35 / 1.41, 2% SID tolerance, 10 mSv x age) and every
positioning angle checked against standard positioning texts. Six Patient Care items were rewritten
because they repeated a fact and answer already in the CNA, CCMA, CET, phlebotomy or VTNE banks
(normal pulse and respiratory rates, TB airborne precautions, needle disposal, water-soluble contrast
for perforation, seizure first aid); the replacements cover the clean and dirty mobile isolation
method, medical asepsis, creatinine before contrast, metformin and contrast (ACR Manual on Contrast
Media: hold for 48 hours when eGFR is below 30 or in AKI), ordered oxygen, and the cervical collar on
a trauma cross-table lateral. The lateral skull item (HSP-007) now asks for a line, not a plane. NCRP Report 180 (2018) keeps the NCRP 116 effective dose limits used here.
