# Malta Driver CPC theory test (mtcpc) sources

Checked 7 November 2026. transport.gov.mt answers 403 to direct fetches (the Approved Training and
Tests page and the training-provider guidelines PDF, also via the Wayback Machine, which reset the
connection); those pages were read through search-result extracts only and are labelled so.
legislation.mt PDFs load directly and were read in full where cited.

## Official law (read in full, 2026-11-07)
- Motor Vehicles (Driving Licences) Regulations, S.L. 65.18
  (https://legislation.mt/eli/sl/65.18/eng/pdf):
  - Reg. 27: since 10 September 2008 (D1, D1E, D, DE) and 10 September 2009 (C1, C1E, C, CE) a
    driver also needs a certificate of professional competence (CPC) certifying an initial
    qualification.
  - Reg. 28 (substituted by L.N. 193 of 2020): exemptions, including vehicles up to 45 km/h,
    armed forces, civil defence, fire, police and ambulance services, road tests, emergencies,
    driving instruction and tests, and vehicles used for non-commercial carriage of passengers or
    goods; vehicles carrying the driver's own work materials when driving is not the main activity.
  - Reg. 29: initial qualification by theoretical and practical tests held by Transport Malta (the
    Authority) or a body it designates, under Thirteenth Schedule section 2; the certificate is
    valid for five years; a CPC for one passenger category covers the others (and the same for
    goods); drivers who broaden from goods to passengers or the reverse sit only the parts specific
    to the new qualification.
  - Reg. 30: periodic training of 35 hours every five years, in periods of at least seven hours,
    at a training centre approved by the Authority.
  - Reg. 31: drivers normally resident in Malta, and third-country drivers employed by a Malta
    undertaking, obtain the initial qualification and do periodic training in Malta.
  - Reg. 32: the CPC code (95, Seventh Schedule) is marked on the licence; for third-country goods
    drivers it may be marked on the driver attestation (S.L. 65.19).
  - Second Schedule (minimum ages): C1 and C1E 18; C and CE 21, or 19 with a CPC; D1 and D1E 21
    (21 with a CPC); D and DE 24, or 21 with a CPC.
  - Thirteenth Schedule (substituted by L.N. 193 of 2020, transposing Directive 2003/59/EC as
    amended, now codified as Directive (EU) 2022/2561): the list of subjects (1.1 to 1.6 rational
    driving, including ESP, AEBS, ABS, TCS and IVMS; 2.1 to 2.3 application of regulations; 3.1 to
    3.8 health, road and environmental safety, service and logistics); section 2: the theoretical
    test has at least two parts, multiple-choice and/or direct-answer questions, and case studies,
    and lasts at least four hours in total; the practical test is a driving test of at least 90
    minutes and a practical test of at least 30 minutes covering 1.4, 1.5, 1.6, 3.2, 3.3 and 3.5;
    section 3: periodic training 35 hours every five years in periods of at least seven hours,
    which may be split over two consecutive days, e-learning at most 12 hours, at least one period
    on a road safety subject.
- Motor Vehicles Regulations, S.L. 65.11 (https://legislation.mt/eli/sl/65.11/eng/pdf), reg. 127:
  minibuses and goods vehicles (up to and over 3 tonnes) 40 km/h in towns and villages and 60 km/h
  outside; a lower signed limit applies. (The table has no separate row for full-size buses, so
  the bank asks only about minibuses and goods vehicles.)
- Traffic Regulation Ordinance, Cap. 65 (https://legislation.mt/eli/cap/65/eng/pdf, consolidated
  with Act II of 2026):
  - Art. 15I prescribed alcohol limits: most drivers 22 µg/100 ml breath (50 mg/100 ml blood);
    commercial vehicles and probationary licence holders 9 µg (20 mg); buses, coaches, vehicles
    on priority duty and other vehicles carrying passengers for a fee 0.
  - Art. 15BA: driving with any amount of a drug in the body is an offence. Art. 15CD (added by
    Act II of 2026): THC threshold of 2 µg per litre of blood for drivers other than commercial
    vehicles, buses, coaches, vehicles carrying passengers for a fee and M2/M3 vehicles.
- International Carriage of Goods by Road Act, Cap. 486 (Act XI of 2006): Malta applies the CMR
  Convention; UN depositary listing shows accession 21 December 2007 (via search, 2026-11-07).
  CMR art. 5: the consignment note is made out in three original copies.

## Format of the Malta CPC tests (Transport Malta, via search extracts, 2026-11-07)
- Transport Malta "Guidelines for approved training providers"
  (https://www.transport.gov.mt/Land-approved-training-providers-guidelines-1.pdf-f969, 403 to
  fetch; content from a search extract): the initial qualification is made up of modules. Module 1
  is the category theory test (35 multiple-choice questions, 45 minutes, 85% to pass); Module 2 is
  a theory test of 80 multiple-choice questions on the CPC subjects in 100 minutes with a minimum
  pass mark of 60%; Module 3 is six case studies in 100 minutes, 60% to pass; then the practical
  modules. The document dates from the scheme's start (it refers to 2008 dates), so the landing
  says "Transport Malta's guidelines for training providers" and does not call the figures
  current-year. They are consistent with the four-hour minimum in S.L. 65.18.
- Transport Malta "Approved Training and Tests"
  (https://www.transport.gov.mt/Land/Professional-Transport-Services/Approved-Training-and-Tests-820,
  403): lists approved CPC training providers for initial qualification and periodic training,
  goods and passengers.
- Languages: guides and the batch notes say English or Maltese. Not confirmed on an official page;
  the landing says "English or Maltese (check with your training provider)".
- Third-party guide (not official), https://www.easy-quizzz.com/mt/license-test/theory-test-malta/simulator-driver-cpc-multiple-choice-test/
  : about 100 minutes for the multiple-choice paper. Matches the guidelines; not otherwise used.

## Modelling
- Four tests of 50 questions at the Module 2 pace (80 in 100 minutes is 1.25 minutes a question)
  and the 60% pass line: ceil(0.6 x 50) = 30. Module 1 (category theory) is the ordinary licence
  theory test, covered by `mttheory`. Case studies and practical modules are not modelled.
- Transport Malta publishes no topic weights. Categories follow the Thirteenth Schedule list of
  subjects; weights are Tigertest's.

## EU rules used (stable, long-standing; checked against the regulations' known text)
- Regulation (EC) No 561/2006 as amended by Regulation (EU) 2020/1054: 4.5 h then 45 min (15 + 30
  split), 9 h daily (10 h twice a week), 56 h weekly, 90 h in two weeks; fixed week Monday 00:00
  to Sunday 24:00; daily rest 11 h (3 + 9 split; reduced 9 h) within 24 h; weekly rest 45 h or
  reduced 24 h, compensated en bloc attached to another rest of at least 9 h by the end of the third
  following week; reduced weekly rest in a stationary vehicle with suitable sleeping facilities,
  regular weekly rest not in the vehicle; two consecutive reduced weekly rests for international
  goods drivers outside the member state of establishment; ferry or train: regular daily rest
  interrupted twice, 1 hour in total, with access to a sleeper cabin, bunk or couchette; regular
  weekly rest on a ferry or train of 8 hours or more with a sleeping cabin; multi-manning: second
  driver optional in the first hour; break in a moving multi-manned vehicle allowed if not
  assisting; art. 12: exceed by up to 1 hour, or 2 hours after a 30-minute break, to reach base or
  home for a weekly (regular weekly for the 2-hour case) rest, reason written by hand on a printout,
  record sheet or duty roster; art. 10: no payment by distance or goods carried that endangers
  road safety; scope over 3.5 t goods vehicles and passenger vehicles for more than 9 persons
  including the driver.
- From 1 July 2026, light goods vehicles over 2.5 t up to 3.5 t in international carriage or
  cabotage for hire or reward need a smart tachograph (RSA "Smart Tachograph 2 (LCVs)",
  https://www.rsa.ie/services/professional-drivers/tachographs-information/smart-tachograph-2-(lcvs),
  and several trade sources, via search 2026-11-07).
- Directive 2002/15/EC (working time of mobile workers): average 48 h, 60 h maximum in a week;
  no more than 6 h of work without a break; 30 min for 6 to 9 h, 45 min over 9 h; breaks split
  into periods of at least 15 min; periods of availability known in advance.
- Regulation (EU) No 165/2014 and Implementing Regulation (EU) 2016/799 as amended: GNSS position
  at start and end of daily work and every 3 h of accumulated driving; version 2 adds border
  crossings and loading/unloading; remote early detection by DSRC; driver card from the member
  state of normal residence; lost or stolen card reported within 7 calendar days, theft declared to
  the authorities where it happened, driving up to 15 calendar days with printouts; renewal at
  least 15 working days before expiry; inspection at least every two years; repair en route if the
  vehicle cannot return within a week; UTC time. Regulation (EU) No 581/2010: driver card data
  downloaded at least every 28 days, vehicle unit at least every 90 days.
- Regulation (EC) No 1072/2009 as amended by (EU) 2020/1055: Community licence (certified copy in
  the vehicle), driver attestation for third-country drivers, cabotage 3 operations in 7 days,
  4-day cooling-off.
- Regulation (EU) No 181/2011: disability awareness training for staff dealing with passengers.
  Regulation (EC) No 1073/2009: regular, special regular and occasional services.
- EN 12195-1 load securing: 0.8 g forward, 0.5 g sideways and rearward for road transport.
- ADR: instructions in writing carried in the cab in a language each crew member can read.

## Not used
Fees, fines, penalty points, test-centre details, booking, retake rules and the question count or
pass mark (those are on the landing only). No item asks about the CPC test itself; rules a
professional driver lives by (Code 95, periodic training, ages, exemptions) are asked.
Duplicates: checked by script against iedttcv, uklgv, ukpcv, cdl, cdlx, nzheavy, zak53c3, mttheory,
mttaxi, mtmoto and mtguard; ten near-repeats rewritten (lost card, 15 days, UTC, crossed hammers,
crosswind, harsh acceleration, cab steps, recovery position, bleeding, zero limit for passengers).

## Review pass (2026-11-07)
- Re-read in full from legislation.mt PDFs: S.L. 65.18 Second Schedule (C/CE 21, or 19 with a
  CPC; D/DE 24, or 21 with a CPC), reg. 29(3) to (6) (five-year validity, one passenger or goods
  CPC covers the other categories, broadening repeats only the specific parts), Thirteenth
  Schedule (theory at least four hours; periodic training periods of at least seven hours, e-learning
  at most 12 hours); Cap. 65 art. 15I (22 / 9 / 0 / 9 micrograms) and art. 15CD (THC 2 micrograms
  per litre except commercial vehicles, buses, coaches, paid passenger vehicles and M2/M3);
  S.L. 65.11 reg. 127 (minibuses and goods vehicles 40 / 60 km/h).
- Module 2 as 80 multiple-choice questions in 100 minutes with a 60% minimum confirmed again by
  search extract of the Transport Malta guidelines PDF (still 403 to fetch).
- Rewritten: MTCPC-DOC-007 (asked which test parts a driver must pass, a question about the test
  itself) and 28 items that repeated the same scenario and answer as the EU CPC banks
  (hungary-gki, romania-cpi, ireland-truck-bus-theory, uk-lgv, uk-pcv) or other banks: ECO-006,
  ECO-009, ECO-015, BRK-015, RSK-005, RSK-011, RSK-014, LOD-001, LOD-002, LOD-008, LOD-011,
  LOD-012, HRS-007, HRS-011, HRS-012, HRS-013, HRS-018, TAC-007, TAC-009, TAC-014, TAC-018,
  DOC-001, DOC-011, DOC-013, DOC-014, DOC-016, EMG-013. New facts used: Reg 561/2006 art. 8(8)
  (multi-manning 9 h rest within 30 h), art. 12 (extension compensated en bloc by the end of the
  third following week), art. 34 (country entered at start and end of daily work, manual entries);
  Reg 1071/2009 as amended (vehicle returns within 8 weeks); ADR 5.3.2 (plain orange plates);
  S.L. 65.18 reg. 28 exemptions (road tests after repair, emergency and civil defence services,
  driving lessons). No repeats remain against mttaxi, mtguard, mtmoto or mttheory.
