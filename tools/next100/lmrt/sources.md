# ARRT Limited Scope of Practice in Radiography bank sources

Every question is original, written for Tigertest from the outline and the primary texts below. None is
copied or reworded from ARRT material, a registry review, a published limited scope review book or any
practice test.

## Outline (what the exam covers)

- ARRT, Limited Scope of Practice in Radiography Examination Content Specifications, board approved
  January 2022, implementation date January 1, 2023 (the version in force in November 2026), read in full:
  https://assets-us-01.kc-usercontent.com:443/406ac8c6-58e8-00b3-e3c1-0c312965deb2/7deaf7d9-9770-427b-b9c6-3e6a555020cc/LIM_CSTI_2023.pdf
  (linked from https://www.arrt.org/Content-Specifications), fetched 2026-11-19.
  Core module 100 scored + 15 pilot, 1 hr 55 min: Patient Care 18 (patient interactions and management 18);
  Safety 40 (radiation physics and radiobiology 12, radiation protection 28); Image Production 42 (image
  acquisition and evaluation 20, equipment operation and quality assurance 22). Procedure modules, each with
  5 extra pilot questions: Chest 20 (routine 16, other 4), 25 min; Extremities 25 (lower 11, upper 11,
  pectoral girdle 3), 30 min; Skull/Sinuses 20 (skull 8, paranasal sinuses 8, facial bones 4), 25 min; Spine 25
  (cervical 8, thoracic 6, lumbar 8, sacrum/coccyx/SI 2, scoliosis 1), 30 min; Podiatric 20 (foot and toes 14,
  ankle 5, calcaneus 1), 25 min. Focus of procedure questions: positioning (high), anatomy (medium), evaluation
  of displayed anatomy (medium), procedure adaptation (low), equipment and accessories (low; not on podiatric).
  Attachment A lists every position and projection; Attachment B the standard positioning terminology. There
  is no bone densitometry module: ARRT runs bone densitometry as a separate exam.
- ARRT news, "ARRT Seeks Comments on Proposed Changes to the Limited Scope of Practice in Radiography Content
  Specifications" (2026-04-29), fetched 2026-11-19:
  https://www.arrt.org/news/article/2026/04/29/proposed-changes-limited-scope-documents-2026
  Revised specifications are scheduled for January 1, 2028: CR content removed, sterile technique and needles
  removed from patient care, AEC, pregnancy, Image Wisely and Image Gently added, mandible added to
  skull/sinuses. Recorded in lib/examFreshness.json; the bank keeps CR to two items and asks no sterile
  technique or needle items, so little changes then.

## Format (for the landing and facts, never for questions)

- ARRT, 2026 Handbook for State Candidates, fetched 2026-11-19:
  https://www.arrt.org/pdfs/disciplines/handbooks/state-handbook.pdf
  The limited scope exam is the only ARRT exam delivered in modules (Core, Chest, Extremities,
  Skull/Sinuses, Spine, Podiatric); every candidate takes Core, and the state decides which procedure modules.
  No breaks between modules; once the review of a module ends it cannot be reopened. Mostly single best
  answer multiple choice, some multiple-select, ordering and image hot spot items; pilot items unscored;
  online calculator; Pearson VUE test centers. ARRT reports the number correct in each module to the state,
  and the state entity decides pass or fail. Passing the exam is not an ARRT credential.

## Law, regulations and standards the questions use

- 21 CFR 1020.31, radiographic equipment (light field to x-ray field and receptor alignment within 2% of SID,
  light localizer at least 160 lux at 100 cm, positive beam limitation 3% of SID per side and 4% summed, mobile
  source-skin distance not less than 30 cm), fetched 2026-11-19:
  https://www.law.cornell.edu/cfr/text/21/1020.31
- 21 CFR 1020.30, Table 1 minimum half-value layer (2.9 mm Al at 80 kVp for current systems) and tube housing
  leakage of 0.88 mGy air kerma (100 mR) in 1 hour at 1 m, fetched 2026-11-19:
  https://www.law.cornell.edu/cfr/text/21/1020.30
- 10 CFR 20.1201, occupational dose limits (TEDE 0.05 Sv, lens of the eye 0.15 Sv, skin and extremities
  0.5 Sv per year), fetched 2026-11-19:
  https://www.law.cornell.edu/cfr/text/10/20.1201
- CDC, Transmission-Based Precautions (contact: gown and gloves; droplet: mask on entry, patient masked for
  transport; airborne: fit-tested N95, AIIR, patient in a surgical mask for transport), fetched 2026-11-19:
  https://www.cdc.gov/infection-control/hcp/basics/transmission-based-precautions.html
- NCRP Reports 102, 116 and 160 are named in the ARRT outline but are paid documents that could not be read.
  The bank uses only their long-settled figures that agree with the CFR text above or with the ARRT radiography
  bank's sources: occupational effective dose 50 mSv per year, public 1 mSv per year for continuous or frequent exposure and 5 mSv for infrequent exposure, embryo-fetus 0.5 mSv per
  month after declaration, 2.5 mm Al total filtration above 70 kVp, 0.5 mm Pb aprons.
- Positioning, anatomy and evaluation criteria follow the projections and terminology in Attachments A and B
  of the ARRT outline and standard radiographic positioning practice (central ray angles, landmarks,
  evaluation criteria), described in words. Values on which common references differ (for example exact
  degrees for some axial projections) are given as the usual range or left out.

## Left out on purpose

- State rules (who needs a license, which modules, pass marks, supervision, scope, renewal) vary by state and
  are never asked as one state's rule; questions say "varies by state" where it matters.
- Fees, the exam format itself, retake rules: never asked.
- Bone densitometry: a separate ARRT exam, not a limited scope module, so not modelled.
- No item repeats a fact and answer from data/arrt-questions.json (checked item by item).

## Review pass (2026-11-19)

A second reviewer answered all 200 items blind (0 disagreements with the key) and recomputed every
calculation (all correct). Four findings confirmed and fixed: LMRT-PRO-001 (the NCRP 116 infrequent public
limit of 5 mSv was missing from these notes), LMRT-EQP-012 (21 CFR 1020.31 says 3% of SID in length or width,
not "per side"), LMRT-POD-014 (the external-rotation ankle oblique answer reworded to "medial malleolus and
subtalar area") and LMRT-SPN-007 (AP thoracic spine centered at T7, 3 to 4 inches below the jugular notch).
The reviewer also noted the stored key letters rotate A to D; the app shuffles options on every showing, as
for every v1 bank. Options-only pass: 0 surface-cue hits (79 knowledge, 121 guess), PASS.
