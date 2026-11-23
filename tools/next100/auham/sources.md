# Australian amateur radio (ACMA recognition certificate, Foundation) bank sources

All 200 questions are original, written for Tigertest from the ACMA syllabus, the Amateur Class
Licence and ACMA's own guidance listed below. The ACMA publishes no question pool or past papers:
each accredited assessor sets the paper, and ACMA only publishes the syllabus and examination
information. So there was no official question catalogue to run a similarity check against; no
prep site's or app's questions were read or used. The sibling banks `ham`, `hamgeneral`,
`hamextra` (US FCC pools), `nzham`, `cahambasic` and `grol` were checked item by item with a stem
similarity scan (difflib ratio over every pair) and a same-key scan (same key text with shared
numbers or similar stem): every repeated fact-and-answer pair was rewritten (unit of frequency,
oscillator makes the carrier, modulator and detector stages, 50 ohm coax, dipole broadside
pattern, peak envelope power, the 70 cm band edges, the 0.25 A x 56 ohm sum, the encoding
question). Calculations use numbers not used in those banks.

## Which level and why

ACMA has three recognition certificates: Foundation, Standard and Advanced. Foundation is "the
entry-level qualification for amateur radio in Australia" and "the basic level for a person who
wants to use amateur radio", and it is the level every newcomer starts at, so it has the most
candidates. This bank models the Foundation multiple-choice paper. Standard and Advanced are not
modelled.

## Syllabus and format (ACMA, which administers the exams)

- ACMA, "ACMA recognition certificate (Foundation) Syllabus and examination information",
  February 2024 (file dated 2024-06), fetched 2026-11-23 through a browser (acma.gov.au times out
  for scripted downloads; the PDF text was read with pdf.js in the browser):
  https://www.acma.gov.au/sites/default/files/2024-06/ACMA%20recognition%20certificate%20%28Foundation%29%20Syllabus%20and%20examination%20information.pdf
  Nine syllabus sections: 1 Nature of amateur radio, 2 Licence conditions (2.1 to 2.19),
  3 Technical basics (3.1 to 3.14), 4 Transmitters and receivers (4.1 to 4.11), 5 Transmission
  lines and antennas (5.1 to 5.16), 6 Propagation (6.1 to 6.8), 7 Interference (7.1 to 7.13),
  8 Operating practices and procedures (practical), 9 Safety (9.1 to 9.21). Examination
  information: a multi-choice paper of 25 questions covering theory and regulations, drawn from
  every section except section 8; a practical component based mainly on section 8 (and sections
  2 and 9); 30 minutes for the paper when sat in one session; reference materials supplied;
  certificate for 70% (18/25) or more plus competence in all practical elements. Station
  identification "at least every 10 minutes", SSB is a form of AM, VSWR of 1.5 or less is a
  satisfactory match, ERP is transmitter power times antenna gain, mains 230 V class facts,
  electrical safety and lightning practice all come from this syllabus. Format facts are used
  only on the landing and in examFacts, never in questions.
- ACMA, "Qualifications to operate amateur radio", fetched 2026-11-23:
  https://www.acma.gov.au/qualifications-operate-amateur-radio
  Three levels; recognition certificates required from 19 February 2024; exams are sat with an
  accredited assessor and are free; three components (theoretical, regulatory, practical); 70%
  to pass the theoretical and regulatory components; resit at least 3 months later on a
  different paper; pass, then apply to the ACMA (application fee) through ACMA Assist.
- ACMA, "Amateur radio accredited assessors", fetched 2026-11-23:
  https://www.acma.gov.au/amateur-radio-accredited-assessors
  The ACMA administers examination services through a network of voluntary accredited
  assessors (including former Australian Maritime College supervisors); General and Specialist
  assessors; assessors must hold an Advanced qualification.
- ACMA, "Amateur radio resources" (document list), fetched 2026-11-23:
  https://www.acma.gov.au/amateur-radio-resources
  Lists the Foundation, Standard and Advanced syllabus PDFs, the qualification framework (April
  2024), the accredited assessor guidelines and the call sign policy.

## Law and ACMA guidance (used for the questions)

- Radiocommunications (Amateur Stations) Class Licence 2023 (F2023L01648), as made 7 December
  2023, in force from 19 February 2024; the Register's version list shows compilation 0 only
  (no amendments) as at 2026-11-23. Word file fetched 2026-11-23:
  https://www.legislation.gov.au/F2023L01648/asmade/2023-12-12/text/original/word
  Version list checked 2026-11-23 via the Register's API:
  https://api.prod.legislation.gov.au/v1/Versions?$filter=titleId%20eq%20'F2023L01648'
  Used: amateur purposes (s 5); qualified persons and visitors up to 365 continuous days (s 8);
  qualified or supervised operation (s 11); call sign at start, end and every 10 minutes, the
  supervisor's call sign, VK added to overseas call signs, AX on 26 January, 25 April and 17 May,
  VK0 only in the Antarctic Territory, VK9 only in other external territories (s 12);
  emergency services identification every 30 minutes (s 14); no financial gain, advertising,
  repeater or beacon operation, and no encoding except satellite control, unattended station
  control and emergency services operations or training; 10-minute shutdown timer for
  unattended automatic or computer controlled operation (s 13); harmful interference and
  spurious emission limits, below 30 MHz the lesser of 43 + 10 log(pX) dB and 50 dB, at and
  above 30 MHz the lesser of 43 + 10 log(P) dB and 70 dB (s 15); Foundation and Standard
  frequency tables (s 17, Schedule 2 Tables A and B: Foundation 3.500 to 3.700, 7.000 to 7.300,
  21.000 to 21.450, 28.000 to 29.700, 144 to 148 and 430 to 450 MHz at 10 W pX, 8 kHz bandwidth
  cap on 7.100 to 7.300 MHz, 1 W per 100 kHz density above 8 kHz or 16 kHz); Radio Quiet Zone
  (s 18); electromagnetic energy conditions and the low risk presumption at 100 W (Schedule 1).
- ACMA, "Amateur radio operating procedures", fetched 2026-11-23:
  https://www.acma.gov.au/amateur-radio-operating-procedures
  Identification by voice in English, image or Morse; internet-linked stations; retransmission
  needs permission; primary and secondary users and the harmful interference definition;
  amateurs primary on most HF bands, 52 to 54 and 144 to 148 MHz; band plan is a voluntary
  agreement; emission designators 2K80J3E and 16K0F3E; MAYDAY and PAN-PAN procedure, police
  via 000 for land and the Rescue Coordination Centre in Canberra for air and sea; test
  transmissions into a dummy load; Q codes (QSB).
- ACMA, "Amateur radio call sign policy", September 2024, fetched 2026-11-23:
  https://www.acma.gov.au/sites/default/files/2024-09/Amateur%20radio%20call%20sign%20policy_September%202024.pdf
  State numerals 0 to 9; 2-letter call signs for Advanced only; 3-letter call signs for any
  level; F-series no longer assigned but existing ones kept; contest call signs (VJ, VK or VL,
  one-letter suffix) for Advanced only; VK9 islands (not Lord Howe Island); no new call sign
  needed after moving interstate or upgrading; keep contact details current.
- ITU Radio Regulations Article 1 (Nos. 1.156 to 1.158), definitions of peak envelope power
  (pX), mean power (pY) and carrier power (pZ), as used by the class licence, checked 2026-11-23:
  https://www.itu.int/pub/R-REG-RR
- Standards Australia, AS 60038:2012 Standard voltages (catalogue page), checked 2026-11-23:
  https://store.standards.org.au/product/as-60038-2012
  Australia's nominal low-voltage supply is 230 V at 50 Hz (the syllabus asks candidates to
  recall the mains voltage and frequency).

## Left out on purpose

- The practical component (syllabus section 8: connecting a station, on-air contacts, repeater
  access, measuring power and VSWR) is not modelled; a few operating facts that also sit in
  sections 2, 6 and 9 are asked.
- No fees, ACMA processing times, assessor arrangements or anything about the exam itself.
- Standard and Advanced syllabus content (beyond naming bands Foundation cannot use).
- Identification of pictures and symbols (connectors, antenna shapes) is asked in words.
