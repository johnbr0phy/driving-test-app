# Sources for `cahambasic` (Canada Amateur Radio Operator Certificate, Basic Qualification)

All 200 questions are original, written by Tigertest from ISED's Basic syllabus and the rules
below. None is copied, adapted or reworded from ISED's public Basic question bank (the exam
generator, its study questions and printable lists, updated July 15, 2025), any older RIC-7
question bank, club course material or any overseas pool. The ISED question bank pages were
opened only to confirm that the bank and its exam generator exist and when they changed; no
question in them was read for writing. The US FCC Technician pool (`data/ham-questions.json`) and
the New Zealand bank (`data/nz-amateur-radio-questions.json`) were checked item by item: repeated
facts with the same answer (sideband filter, buffer stage, bleeder resistor, antenna switch and
dummy load, skip zone, MUF, D and F2 layers, sunspot cycle, K = Kilo, best insulator, power in
watts, 12 V x 2.5 A, 0.1 A in 470 ohms, 10:1 transformer, two equal series capacitors, inductive
reactance, lowest-loss feed line) were rewritten. Checked 2026-11-18.

## Syllabus, format and pass marks (ISED, official)

- ISED, RIC-3, Information on the Amateur Radio Service, Issue 5, March 2022, fetched 2026-11-18:
  https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/licences-and-certificates/radiocom-information-circulars-ric/ric-3-information-amateur-radio-service
  Section 5.1: the Basic exam has 100 questions, one drawn from each of 100 topic areas; pass mark
  70%; 80% or above gives Basic with Honours. The 100 topics in eight sections: 001 Regulations
  and Policies (25), 002 Operating and Procedures (9), 003 Station Assembly, Practice and Safety
  (21), 004 Circuit Components (6), 005 Basic Electronics and Theory (13), 006 Feedlines and
  Antenna Systems (13), 007 Radio Wave Propagation (8), 008 Interference and Suppression (5).
  Section 4: Basic privileges (bands above 30 MHz, 250 W DC input, commercial kits only,
  software re-programming, cross-band repeaters, no remote control of fixed stations; operating
  through a repeater is not remote control); Honours adds the bands below 30 MHz; Basic issued
  before April 1, 2002 gets Honours privileges; Radiotelephone Operator's General Certificates
  (Aeronautical, Maritime, Land) give Basic privileges; Advanced privileges for comparison.
  Section 5.4: closed book, no time limit (most finish within an hour). Section 5.5: retakes as
  often as needed with a different paper. Section 7: no age or nationality limit, photo ID.
  Section 8: Canada-US convention, CEPT T/R 61-01 and IARP permits issued by RAC, IARP Class 2
  above 30 MHz, third-party traffic.
- ISED, RIC-1, Guide for Examiners Accredited to Conduct Examinations for Amateur Radio Operator
  Certificates, Issue 8, May 2025, fetched 2026-11-18:
  https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/licences-and-certificates/radiocom-information-circulars-ric/ric-1-guide-examiners-accredited-conduct-examinations-amateur-radio-operator-certificates
  Exams must use the Basic or Advanced question bank on the exam generator page; pass mark 70%,
  80% for Basic with Honours; no time limit; closed book except ISED's approved formula and block
  diagram sheet; calculators allowed if they cannot store formulas or text; virtual exams by
  videoconference with camera and microphone on; accessibility options including oral exams.
- ISED, Amateur radio exam generator, page dated 2025-07-15, fetched 2026-11-18:
  https://ised-isde.canada.ca/site/amateur-radio-operator-certificate-services/en/amateur-radio-exam-generator
  Basic questions and answers were updated; from July 15, 2025 all examiners and candidates must
  use the new exam; the Basic practice exam has 100 questions; links to the reference material.
- ISED, Reference Material for Amateur Radio Exam, Basic Qualification (version 1, May 2025) and
  Amateur Basic: Formulas and Block Diagrams, for training purposes only (version 1, May 2025),
  zip fetched 2026-11-18:
  https://ised-isde.canada.ca/site/amateur-radio-operator-certificate-services/sites/default/files/documents/Reference%20Material%20for%20Amateur%20Radio%20Basic%20EN%202025%20.zip
  Formulas used for every calculation (F = 300/wavelength, half-wave wire 142/F, quarter-wave
  71/F, delta or quad loop 306/F, Ohm's law, power, series and parallel R, C and L) and the block
  diagrams used for the station items: AM, SSB/CW and FM superheterodyne receivers, CW, AM, SSB
  and FM transmitters, linear regulated power supply, Yagi-Uda antenna with gamma match, legacy
  (TNC) and current (sound card) digital stations, typical HF installation.
- ISED, Publications (amateur radio services), fetched 2026-11-18:
  https://ised-isde.canada.ca/site/amateur-radio-operator-certificate-services/en/publications
  Confirms the current issues: RIC-1 Issue 8 (May 2025), RIC-3 Issue 5 (March 2022), RIC-9 Issue
  2 (provisional, October 2005), RBR-4 Issue 3 (July 2022).

## Rules and law

- ISED, RBR-4, Standards for the Operation of Radio Stations in the Amateur Radio Service, Issue 3,
  July 2022, fetched 2026-11-18:
  https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/licences-and-certificates/regulations-reference-rbr/rbr-4-standards-operation-radio-stations-amateur-radio-service
  Foreign amateur equivalence (s 3.2), bandwidth measured 26 dB down (s 4), radio control of
  models above 30 MHz (s 5), third-party traffic (s 6), operation outside Canada and ITU regions
  (s 7), interference (s 8), identification at start and end and at most every 30 minutes in
  English or French, US licensees' identification (s 9), power limits for Basic (250 W DC input,
  560 W PEP SSB, 190 W carrier) and Advanced, amplifier not capable of exceeding by more than 3 dB
  (s 10), brief tests only for unmodulated carriers below 30 MHz, retransmission below 29.5 MHz,
  100% AM modulation, crystal-control stability below 148 MHz, frequency and overmodulation
  indication (s 11), CPC-2-0-03 for antennas (s 12), change of address within 30 days (s 13),
  Schedule I band edges, bandwidths and qualifications (including 60 m footnote C21: 100 W PEP
  ERP, 2.8 kHz; C11 for 219 to 222 MHz), Schedule V call sign prefixes.
- Radiocommunication Regulations, SOR/96-484 (Justice Laws, current to the site's date),
  fetched 2026-11-18:
  https://laws-lois.justice.gc.ca/eng/regulations/SOR-96-484/FullText.html
  Definition of the amateur radio service; s 15.3 licence exemption; s 42 qualifying certificates;
  s 44 Advanced needed for non-commercial transmitters and amplifiers, same-band voice repeaters
  and club stations; s 46 supervised participation; s 47 amateur stations only, no secret codes,
  no music, commercially recorded material, broadcast programming or business communications;
  s 48 emergency communications; s 49 no remuneration; s 52 orders to cease or modify operation.
- Radiocommunication Act, R.S.C. 1985, c. R-2, fetched 2026-11-18:
  https://laws-lois.justice.gc.ca/eng/acts/R-2/FullText.html
  s 8 inspectors' entry (dwelling-house only with consent, warrant or exigent circumstances);
  s 8.1 seizure; s 9(1)(a) false distress signals; s 9(2) intercepting and divulging.
- ISED, RIC-9, Call Sign Policy and Special Event Prefixes, Issue 2 (provisional), fetched
  2026-11-18:
  https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/licences-and-certificates/radiocom-information-circulars-ric/ric-9-call-sign-policy-and-special-event-prefixes
  New prefix after moving to another prefix area; deceased amateur's call sign held one year for
  immediate family. RIC-9 is an old provisional issue, so only these two long-standing rules are
  asked; its two-letter waiting rules and fees are not.
- Health Canada, Safety Code 6 (2015), Limits of Human Exposure to Radiofrequency Electromagnetic
  Energy in the Frequency Range from 3 kHz to 300 GHz, fetched 2026-11-18:
  https://www.canada.ca/en/health-canada/services/publications/health-risks-safety/limits-human-exposure-radiofrequency-electromagnetic-energy-range-3-300.html
  Controlled and uncontrolled environments (uncontrolled stricter), nerve stimulation limits
  from 3 kHz to 10 MHz, SAR limits averaged over 6 minutes.
- Recommendation ITU-R M.1172 (in force), Miscellaneous abbreviations and signals, fetched
  2026-11-18: https://www.itu.int/rec/R-REC-M.1172-0-199510-I/en
  Meanings of QRL, QRM, QRN, QRS, QRT, QRV, QRZ, QSA, QSB, QSL, QSY, QTH and of CQ, CP, CS, K, AR,
  AS, VA, CL. The phonetic words (Juliett, Quebec) are those of ITU Radio Regulations Appendix 14.

## Not from an ISED page

- Operating courtesy items (listen before calling, pause between overs, give your call to join,
  check a frequency before tuning up) and the RST report scale are long-standing amateur practice
  named in RIC-3 topics 2-1 to 2-6 but not written out in an ISED document; they are kept general.
- Electronics, receiver, antenna, propagation and interference items follow standard textbook
  physics within the RIC-3 topic list, and every calculation is computed and asserted in its
  q_*.py file using ISED's formula sheet.

## Could not be confirmed or deliberately left out

- CPC-2-0-03's antenna height exclusion is under an ISED consultation (RAC and RAQI responses,
  2026), so no height or exclusion figure is asked; only the duty to follow CPC-2-0-03 is.
- ISED's July 2025 question bank changed the questions, not the syllabus; RIC-3 Issue 5 remains
  the published syllabus and no newer issue is listed on ISED's publications page.
- Fees (call sign changes, examiners' own fees), the exam itself (count, pass mark, time, ID,
  retakes), examiner accreditation and special event call sign categories are never turned into
  questions.
- Figure-based items (circuit symbols, block diagrams shown as pictures) are written as text that
  names the blocks in ISED's diagrams.
