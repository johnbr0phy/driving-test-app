# NZ amateur radio (GAOC) bank sources

All 200 questions are original, written for Tigertest from the official rules and syllabus
below. None is copied, adapted or reworded from the NZART question bank (the public 600-question
pool the real papers are drawn from), its "Question File" sections in the Study Guide, mock
exams from the NZART exam generator, or any overseas question pool. The US FCC Technician pool
(`data/ham-questions.json`) was checked item by item and every repeated fact-and-answer pair was
rewritten (ammeter in series, dummy load purpose, SWR meter and ATU placement, selectivity and
sensitivity definitions, tropospheric ducting, coax loss with frequency, the 13.8 V power sum,
the 2 m quarter-wave length, series current, stored charge in filter capacitors, 10 m at high
sunspot numbers). No US rule appears.

## Syllabus and format (NZART, which runs the exams for RSM)

- NZART, NZ Amateur Radio Certificate Block Course Study Notes ("NZART Study Guide 2025",
  dated 19/10/2025), fetched 2026-11-15:
  https://nzart.org.nz/wp-content/uploads/2025/10/NZART-Study-Guide-2025.pdf
  Gives the syllabus as thirty study topics with the number of questions each contributes to
  a 60-question paper: 1 Regulations 7, 2 Frequencies 2, 3 Electronics fundamentals 2,
  4 Measurement units 1, 5 Ohm's law 2, 6 Resistance 3, 7 Power 2, 8 AC 1, 9 Capacitors,
  inductors and resonance 2, 10 Safety 1, 11 Semiconductors 2, 12 Device recognition 1,
  13 Meters 1, 14 Decibels 1, 15 HF station 1, 16 Receiver block diagrams 2, 17 Receiver
  operation 3, 18 Transmitter block diagrams 2, 19 Transmitter theory 1, 20 Harmonics and
  parasitics 2, 21 Power supplies 1, 22 Regulated power supplies 1, 23 General operating 1,
  24 Practical operating 2, 25 Q signals 1, 26 Transmission lines 2, 27 Antennas 4,
  28 Propagation 5, 29 Interference and filtering 3, 30 Digital systems 1. "One question out of
  every ten questions is randomly selected from the topics"; "Each examination paper has 60
  questions and is unique." The topic notes (not the question files) were used for the
  operating practice items (calling, repeater pauses, tuning at low power, distress watch), the
  station block diagram (linear amplifier, low-pass filter, SWR bridge, antenna switch) and the
  safety items (RCD, Class I and II, NZ flex colours brown, blue, green and yellow).
- NZART, 2025 NZART Examination Procedure, fetched 2026-11-15:
  https://nzart.org.nz/wp-content/uploads/2026/03/2025-NZART-Examination-Procedure.pdf
  Exams test the HAREC syllabus for the General Amateur Operator Certificate; run by RSM-approved
  ARXs and NZART exam supervisors; pass mark "a total of 40 or more correct answers"; time limit
  2 hours; pen, blank paper and a calculator allowed (a phone in flight mode as a basic or
  scientific calculator only); a candidate with 35 to 39 may, at the supervisor's discretion, sit
  a second, different paper; a pass gets a blue ERN form, then a callsign application (ZL1 to
  ZL4 and a 2 to 5 letter suffix). Used only for the landing and facts, never for questions.

## Regulator (Radio Spectrum Management, MBIE)

- RSM, Radio Operator Certificate and Callsign Rules (PIB 46), Issue 19.1, July 2025, fetched
  2026-11-15:
  https://www.rsm.govt.nz/assets/Uploads/documents/pibs/radio-operator-certificate-and-callsign-rules-pib-46.pdf
  Callsign shape (ZL, a digit 0 to 9, one to six letters); permanent primary and secondary
  callsigns; temporary callsigns 3 to 12 months; ZL10 to ZL100 anniversary series for 3 days to
  3 months (ZL2ZZ at 40 years becomes ZL40ZZ); ZL5 Antarctica, ZL7 Chatham Islands, ZL8 Kermadec
  Islands, ZL9 Sub-Antarctic Islands; ZL6 special purpose only with NZART's written approval;
  ZM for contests and commemorative events; XT suffix for supervised candidate training with a
  log kept 1 year after the last contact; silent key callsigns held 12 months for family;
  section 4.10.1: the GAOC syllabus is CEPT T/R 61-02 (HAREC).
- RSM, PIB 46 page, fetched 2026-11-15: https://www.rsm.govt.nz/about/publications/pibs/pib-46
  Confirms Issue 19.1 (July 2025) is current.
- RSM, Get a certificate and/or callsign, fetched 2026-11-15:
  https://www.rsm.govt.nz/licensing/how-do-i/get-a-certificate-callsign
  Exams are offered by an Approved Radio Examiner; amateur certificates and callsigns are issued
  by an Amateur ARX; certificates and callsigns can be searched in the Register of Radio
  Frequencies.
- RSM, Amateur Radio Operators GUSL page, fetched 2026-11-15:
  https://www.rsm.govt.nz/licensing/frequencies-for-anyone/amateur-radio-operators-gusl
  No licence fee; operators need a GAOC and a callsign; only New Zealand citizens or permanent
  residents can be granted a GAOC; beacons, repeaters and fixed links need a separate licence.
  (The page calls the licence a General User Spectrum Licence; the gazette notice below calls it
  the General User Radio Licence for Amateur Radio Operators. Questions use GURL, the notice's
  name.)
- Radiocommunications Regulations (General User Radio Licence for Amateur Radio Operators)
  Notice 2025, New Zealand Gazette 2025-go3272, in force 1 July 2025, fetched 2026-11-15:
  https://www.rsm.govt.nz/assets/Uploads/documents/gazette/radiocommunications-regulations-general-user-radio-licence-for-amateur-radio-operators-notice-2025.pdf
  Band table with power limits (30 dBW PEP on most bands; 11.8 dBW e.i.r.p. on 5.3515 to
  5.3665 MHz; 7 dBW e.i.r.p. on 0.130 to 0.190 MHz and 26.95 to 27.30 MHz; 80 m 3.5 to 3.9 MHz;
  40 m 7.0 to 7.3 MHz with 7.1 to 7.3 MHz under special condition 1; 70 cm 430 to 440 MHz);
  special conditions 1 to 8; general conditions (callsign at least every 15 minutes, personal
  communications without pecuniary interest, third-party messages with no fee, no encoding
  except remote control signals, disaster relief preparation under Article 25, no beacons,
  repeaters or fixed links, chief executive may require a change of frequency, power or
  operation, power as PEP under RR 1.157); new operators barred from 5 to 25 MHz until three
  months and 50 logged contacts, logbook kept at least one year; ZM in contests; visitors up to
  90 days under CEPT T/R 61-01 or 61-02 with ZL, ZL7, ZL8 or ZL9.

## Could not be loaded

- legislation.govt.nz (the Radiocommunications Act 1989 and Radiocommunications Regulations
  2001) refused automated requests (403 and empty 202 responses). No question cites an Act or
  regulation section; the regulation items rest on the gazette notice and PIB 46 above.
- CEPT T/R 61-02 (HAREC) Annex 6 at docdb.cept.org downloaded as a Word file and was not used
  beyond PIB 46's statement that it is the syllabus. The electronics, radio and propagation items
  follow the NZART topic list and standard textbook physics (Ohm's law, reactance, resonance,
  Carson's rule, Nyquist sampling, decibels), and every calculation is computed and asserted in
  its q_*.py file.

## Left out on purpose

- The NZART Study Guide's band table differs from the 2025 GURL in places (32 cm, 9 cm and 4 mm
  edges, 60 m as "15 W"). Only GURL band edges and limits are asked, and the 3.4 GHz segment
  (covered by a separate RSM letter) is not asked.
- Study Guide statements that no longer match the current regulator pages (for example
  certificates "licensed by MBIE", change-of-address timing, relinquished callsign periods) are
  not asked.
- Fees, office-holders, the exam itself (question count, pass mark, time, resits) and NZART
  membership are never turned into questions.
- Topic 12 (device recognition) is taught from circuit-symbol pictures; with no images, the bank
  covers what the components do (diodes, Zeners, varactors, crystals, electrolytics) rather
  than asking candidates to name a drawn symbol.
