# Sources for `dispatcher` (911 Public Safety Telecommunicator)

All 200 questions are original, written by Tigertest from APCO and NENA standards, the FCC's 911
rules, the ADA regulation and FEMA's NIMS doctrine. No APCO course, exam, sample question,
commercial prep test or app item was used. Checked 2026-11-19.

## Training standard and course (APCO International, official)
- APCO International, "APCO ANS 3.103.3-2025 Minimum Training Standards for Public Safety
  Telecommunicators", PDF https://www.apcointl.org/~documents/standard/31033-2025-public-safety-telecommunicator
  linked from https://www.apcointl.org/standards/standards-to-download/ (standard page
  https://www.apcointl.org/standards/3-103-3-2025-minimum-training-standards-for-public-safety-telecommunicators/),
  fetched 2026-11-19, 49 pages. The brief named "APCO/NENA ANS 1.116.1"; no such standard exists.
  APCO's PST minimum training standard is ANS 3.103, now in its third edition (3.103.3-2025, which
  replaced 3.103.2-2015). It gave: the numbering scheme (1 operations, 2 technical, 3 training;
  edition; year) and five-year review; shall/should; agency responsibilities (chapter 2, including
  NIMS, ICS and TICP roles, COOP, CISM, EAP, QA, 24 hours of continuing education a year as a
  recommendation); organizational integrity and confidentiality (NCIC, NLETS, CJIS, HIPAA);
  general knowledge and skills lists (chapter 4); equipment (chapter 5); professional competence
  (chapter 6); the call taker chapter (7: answering, priority, location and phone number
  verification, repetitive persistence, special callers, referrals, pre-dispatch instructions,
  TTY, CAD, GIS, Deaf and hard of hearing callers, multimedia, COOP); law enforcement (8: status
  checks, acknowledgments, BOLO and ATL, FCC Part 90, NCIC, RMS, testifying in court), fire (9:
  notifications, mutual aid, shift and safety briefings) and EMS (10: PAIs and PDIs, hospital
  status, additional resources, CISM) chapters; acronyms and the glossary (AHJ, learning domains,
  primary and secondary PSAP, PST, RMS, QA, telematics, RTT, EMD, call taker, supervisor).
- APCO Institute, "Public Safety Telecommunicator 1, 8th Ed., Online" course listing,
  https://apcointl.org/apco_course_category/pst, fetched 2026-11-19: the PST1 8th edition modules
  (introduction to the career, interpersonal communications, call processing, resource awareness,
  telephony, TTY and relay services, telematics and collision notification, CAD and related
  technologies, radio technology, radio communications techniques, call classification, NIMS and
  ICS, liability, the workplace and workforce of today's ECC, work-life balance), 40 CDEs, and
  that attendees who pass the final exam receive APCO Institute certification. The page publishes
  no question count, time limit or pass mark, so Tigertest uses its own 75% readiness line and
  says so. Recertification (48 hours of CDE every two years) is on the landing only.

## Call processing and TTY standards (NENA, NENA and APCO)
- NENA, "NENA Standard for 9-1-1 Call Processing", NENA-STA-020.2-2026,
  https://cdn.ymaws.com/www.nena.org/resource/resmgr/standards/standards1/NENA-STA-020.2-2026_911CallP.pdf,
  fetched 2026-11-19. This replaces the old NENA 56-005 call answering standard named in the
  brief (its 2020 edition, STA-020.1, consolidated the older documents). It gave: answering 90% of
  911 calls within 15 seconds (SHALL) and 95% within 20 seconds (SHOULD), measured from call
  arrival to call answer and evaluated monthly; order of answering priority; answering with
  "9-1-1" and asking and verifying location first; text-to-911 and RTT information gathering and
  avoiding abbreviations; non-emergency answering; processing targets of 60 seconds for imminent
  threats and 90 seconds for other emergencies, from the start of two-way communication; minimum
  information; location and callback verification; warm transfers and NENA's recommendation against
  unattended transfers; abandoned, disconnected, non-responsive and silent calls; misdials,
  misroutes (EPRC, NLETS), intentional misuse, alternate routing, foreign language, redundant
  calls; ASAP alarm automation, AI on non-emergency lines, apps and sensors; location failure,
  number portability, NSI devices, database errors, trouble reports; call taking protocols,
  recertification and QA; High Impact Events; the glossary (ACD, AEAN, ALI, CAD, ECRF, ESInet,
  ESRP, NG911, PIDF-LO, pre-alert).
- NENA and APCO, "NENA/APCO Minimum Training and Operational Standards for TTY/TDD Communications
  in Public Safety Answering Points", NENA/APCO-STA-051.2-2026,
  https://www.apcointl.org/~documents/standard/nenaapco-sta-0512-2026-minimum-training-and-operational-standards-for-ttytdd-communications-in-psaps,
  fetched 2026-11-19: one TTY per position plus a backup; no reliance solely on a relay service and
  never requiring callers to use one; starting a TTY response after two failed voice attempts;
  Baudot tones and the ASCII handshake; the acoustic coupler with the cord typically to the left;
  voice and hearing carry over; relay calls; refresher training and QA review at least every six
  months; the quick reference card (GA, Q GA, GASK, SKSK).

## Federal rules (eCFR, official)
- 47 CFR Part 9, 911 Requirements, eCFR XML
  https://www.ecfr.gov/api/versioner/v1/full/2026-11-01/title-47.xml?part=9 (reader page
  https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-9), fetched 2026-11-19:
  9.3 definitions (ALI, ANI, pseudo-ANI, dispatchable location, MLTS, MLTS notification,
  location-based routing, PSAP, statewide default answering point, appropriate local emergency
  authority, RTT, TTY); 9.10 wireless E911 (Phase I, Phase II, accuracy 50/150 and 100/300 meters,
  30-second latency, z-axis within 3 meters for 80% in height above ellipsoid, non-service
  initialized handsets and their label, text-to-911 bounce-back and temporary suspension);
  9.11 interconnected VoIP registered location; 9.16 and 9.17 Kari's Law and RAY BAUM'S Act
  dispatchable location for multi-line systems (direct 911 dialing, notification, January 6, 2021
  and January 6, 2022 dates, February 16, 2020 compliance date). fcc.gov pages returned 403 to
  automated reads, so the rule text was read on eCFR instead.
- 47 CFR 90.425, Station identification, https://www.ecfr.gov/api/versioner/v1/full/2026-11-01/title-47.xml?part=90&section=90.425,
  fetched 2026-11-19: call sign with each transmission or exchange or every 15 minutes (30 in the
  Public Safety Pool), voice in English or Morse, unscrambled mode, the 450 MHz mobile relay exception.
- 28 CFR 35.162, Telephone emergency services, https://www.ecfr.gov/api/versioner/v1/full/2026-11-01/title-28.xml?part=35&section=35.162,
  fetched 2026-11-19: 911 services shall provide direct access to people who use TDDs and computer modems.

## NIMS and ICS (FEMA, official)
- FEMA, "National Incident Management System", third edition, October 2017,
  https://www.fema.gov/sites/default/files/2020-07/fema_nims_doctrine-2017.pdf, fetched 2026-11-19
  (and https://www.fema.gov/emergency-managers/nims/components): management characteristics,
  modular organization, IAPs and operational periods, span of control (1 to 5 as a guideline),
  establishment and transfer of command, Unified Command, chain and unity of command,
  accountability, dispatch and deployment, Command Staff (PIO, Safety and Liaison Officers),
  General Staff sections, ICP and staging areas, JIC, EOCs and MAC Groups, plain language, clear
  text and tactical language. The NIMS doctrine text says ICS has five major functional areas
  while FEMA's components page lists six (adding intelligence and investigations); the bank asks
  no question on the count.

## Radio phonetics (FAA, official)
- FAA, Aeronautical Information Manual, chapter 4 section 2, paragraph 4-2-7 and table 4-2-7,
  https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_2.html,
  fetched 2026-11-19: the ICAO phonetic alphabet (Alfa, Juliett, Quebec, Xray...), digit
  pronunciation (TREE, FIFE, NIN-ER) and when to use it.

## Could not be read, and how the copy words it
- 911.gov "Recommended Minimum Guidelines for Initial Public Safety Telecommunicator Training"
  (updated June 2026) returned 403; not used.
- FCC consumer pages (text-to-911, MLTS) returned 403; the rules were read on eCFR.
- PHMSA's Emergency Response Guidebook page returned 403; no ERG questions.
- NENA's ENP exam is a separate, experienced-professional credential and is not modelled.

## Deliberately left out
- State certification rules (hours, exams, recertification): "varies by state" on the landing.
- Emergency medical dispatch protocols and their codes (proprietary), criminal law, fire behavior
  and patient care, which belong to the police, emt, paramedic and firefighter banks.
- Fees, the PST1 price and anything about the APCO exam itself.
