# FAA Commercial Pilot Airplane (CAX) sources

All 210 questions are original, written from the public FAA standards, handbooks and regulations below.
Nothing is copied or reworded from the FAA airman knowledge test bank (not public), the FAA CAX sample
question PDF, the PSI practice test, or any prep company's or app's questions. No item needs a figure:
weight and balance data, winds, chart values and performance figures are written into the stem.

## Official sources (fetched 2026-11-23)
- Commercial Pilot for Airplane Category ACS, FAA-S-ACS-7B (November 2023, in effect since May 31, 2024):
  https://www.faa.gov/training_testing/testing/acs/commercial_airplane_acs_7.pdf
  Areas of operation I to XI, knowledge, risk management and skill elements; commercial maneuver
  standards (steep turn 50 degrees, steep spiral, chandelle, lazy eight, eights on pylons up to 40
  degrees, power-off 180 within 200 feet, short-field landing within 100 feet, normal landing within
  200 feet, slow flight +5/-0 knots, accelerated stall at 45 degrees no lower than 3,000 feet AGL,
  emergency descent at 30 to 45 degrees of bank).
- FAA ACS Knowledge Test Table, correct allotted times (updated October 2024), fetched 2026-11-23:
  https://www.faa.gov/training_testing/testing/acs/acs_knowledge_test_table.pdf
  CAX Commercial Pilot Airplane: 100 questions, 2.5 hours (effective April 24, 2023), passing score 70,
  minimum age 16 for the knowledge test.
- FAA CAX sample questions (dated 8/10/2021), read only to know the topics and to run the similarity
  check below, never used as a source of items:
  https://www.faa.gov/sites/faa.gov/files/training_testing/testing/test_questions/cax_questions.pdf
- 14 CFR on eCFR (current), checked 2026-11-23: https://www.ecfr.gov/current/title-14
  61.1 (complex airplane), 61.23 (medical classes and durations), 61.31(d), (e), (f), (g), (i)
  (class ratings, complex, high-performance, pressurized, tailwheel), 61.56(d), 61.57, 61.123, 61.129
  (commercial aeronautical experience, TAA definition in (j)), 61.133 (privileges and the 50 nm / night
  limitation without an instrument rating), 21.197, 43.3(g), 91.3, 91.113, 91.117, 91.129, 91.130,
  91.151, 91.155, 91.159, 91.211, 91.215, 91.225, 91.307, 91.313, 91.409, 117.3, 119.1(e).
- Airplane Flying Handbook, FAA-H-8083-3C (2021), chapter 7 excerpt on eights on pylons and pivotal
  altitude (ground speed squared / 11.3 in knots, / 15 in mph; reference line moving ahead of the pylon
  means climb), fetched 2026-11-23 from the FAA Safety Team copy:
  https://www.faasafety.gov/files/events/SO/SO15/2023/SO15125653/AirplaneFlyingHandbook_ch7-p10-18.pdf
  Other chapters used: 3 (overbanking), 5 (stalls and spins), 9 (approaches and landings), 13
  (multiengine: Vmc, critical engine, zero sideslip, accelerate-stop), 18 (emergencies).
- Pilot's Handbook of Aeronautical Knowledge, FAA-H-8083-25C (2023): chapters 5 (aerodynamics),
  7 (systems: constant-speed propeller, turbocharging, retractable gear, pressurization, ice protection),
  10 and 11 (weight and balance, performance, hydroplaning 9 x square root of tire pressure, 10 percent
  weight gives 21 percent more takeoff distance), 12 (weather theory), 17 (aeromedical: hypoxia types,
  time of useful consciousness, decompression sickness, oxygen systems).
  https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak
- Aviation Weather Handbook, FAA-H-8083-28A: METAR and TAF codes, winds aloft coding above 99 knots,
  SIGMET and convective SIGMET criteria, G-AIRMETs, PIREPs, cloud types, squall definition.
- Aeronautical Information Manual (current edition): 2-1-2 (PAPI), 2-1-6 (runway status lights),
  3-2 (airspace classes), 3-4 and 3-5 (special use and other airspace, TRSA), 4-1-15, 4-3-11 (LAHSO),
  4-3-18 (runway crossings), 6-2-7 (flight plan search and rescue), 7-1-24 (microbursts), 7-1-29
  (thunderstorms), 7-4 (wake turbulence), 8-1-5 (visual illusions).
- Aircraft Weight and Balance Handbook FAA-H-8083-1B; Risk Management Handbook FAA-H-8083-2A;
  AC 91-74B (flight in icing conditions); AC 91-36 (2,000 feet over national parks); AC 120-12A
  (private carriage versus common carriage); FAA guidance on over-the-counter medications.

## Test format used on the landing and in examFacts
100 multiple-choice questions, three answer choices, 2.5 hours, 70 percent to pass, minimum age 16 for
the test (18 for the certificate, 14 CFR 61.123), knowledge test report valid 24 calendar months
(14 CFR 61.39). The real test uses the Airman Knowledge Testing Supplement FAA-CT-8080-1E for figures;
this bank has no figure items.

## Blueprint
The FAA publishes no per-area weights for CAX. Each Tigertest practice test is 50 questions in 75
minutes (half the real test at its pace): regulations 7, airspace and airport operations 5, weather 6,
navigation 5, aerodynamics 6, systems 6, performance and weight and balance 6, commercial maneuvers and
emergencies 5, human factors and high altitude 4. Pools (test 1, test 2, drill only): 7/7/15,
5/5/11, 6/6/13, 5/5/11, 6/6/13, 6/6/11, 6/6/12, 5/5/13, 4/4/11 = 210.

## Similarity and overlap checks (run 2026-11-23)
- FAA CAX sample questions: every item compared by stem word overlap and key overlap
  (`~/tt-run100/faacax-sim.py`); no item scored above 0.31 against a sample question. Topics the sample
  covers (60 degree bank load factor, high-performance endorsement for a given person, sightseeing tours,
  LAHSO expectations, Class E above 10,000 feet, alert areas, thunderstorm avoidance distance, exhaust
  heater leaks, snow and slush gear) are asked from another angle or not at all.
- Tigertest faapvt, part107 and faaifr (the Instrument Rating bank being built in parallel): 46 items
  that repeated a fact and answer there were rewritten (for example VV004, G-AIRMET Zulu, the GFA,
  advection and upslope fog, structural icing, tailwheel currency, the GAMA empty weight, Mode C veil,
  special VFR at night, convective SIGMET hail, freezing rain, tailplane icing, the 5x dosing rule).
  What remains in common is arithmetic with different numbers (CG, crosswind, fuel).

## Facts deliberately avoided
BasicMed limits and compensation rules (the FAA Reauthorization Act of 2024 changes BasicMed;
rulemaking pending), fees, figure-supplement chart readings, ICAO flight plan form details, and
anything about the test itself.
