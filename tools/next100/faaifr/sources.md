# FAA Instrument Rating Airplane (IRA) sources

All 200 items are original, written from the public FAA standards, handbooks and regulations below.
Nothing is copied or reworded from the FAA airman knowledge test bank (not public), the FAA sample
question PDF for IRA, any prep company or app. No item needs the FAA testing supplement: chart values,
METAR/TAF strings and approach data are written into the stem.

## Outline and format (fetched 2026-11-23)
- Instrument Rating - Airplane ACS, FAA-S-ACS-8C (November 2023, still the edition listed on the FAA
  ACS page on 2026-11-23): https://www.faa.gov/training_testing/testing/acs/instrument_rating_airplane_acs_8.pdf
  (fetched 2026-11-23). Areas of operation I to VIII; knowledge elements used: I.A (qualifications,
  recency), I.B (weather products and hazards), I.C (route planning, fuel, flight plans), II.A (ice
  protection), II.B (instruments, navigation systems, automation), II.C (IFR airworthiness), III
  (clearances, lost communications, holding), IV (attitude instrument flying, unusual attitudes),
  V (navigation, departures, arrivals), VI (approaches, missed and circling, landing), VII (loss of
  communications, loss of primary instruments), risk management elements and Appendix 2 (ADM, SRM).
- FAA ACS page listing the current ACS editions: https://www.faa.gov/training_testing/testing/acs (fetched 2026-11-23).
- ACS Knowledge Test Table (updated October 2024): https://www.faa.gov/training_testing/testing/acs/acs_knowledge_test_table.pdf
  (fetched 2026-11-23): IRA, 60 questions, minimum age 15, 2.0 hours allotted (effective 7/31/23),
  passing score 70.
- FAA IRA sample questions (8/10/2021): https://www.faa.gov/sites/faa.gov/files/training_testing/testing/test_questions/ira_questions.pdf
  (fetched 2026-11-23). Confirms 60 questions and three answer choices (A, B, C). Used only for the
  format and the similarity check below, never as a source of items.
- Knowledge test result valid 24 calendar months: 14 CFR 61.39 (eCFR, below).

## Regulations (eCFR, current as of 2026-11-19, fetched 2026-11-23)
- https://www.ecfr.gov/current/title-14/chapter-I/subchapter-D/part-61 : 61.3(e), 61.39, 61.51(g),
  61.57(c) and (d), 61.65(d).
- https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-91 : 91.103, 91.109(c), 91.123,
  91.167, 91.169, 91.171, 91.175, 91.177, 91.179, 91.183, 91.185, 91.187, 91.205(d), 91.211, 91.411,
  91.413.
- https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-95 and part 97 (MEA, MOCA, MCA
  terms; standard instrument approach procedures).

## Handbooks and the AIM (fetched 2026-11-23)
- Aeronautical Information Manual, current HTML edition: https://www.faa.gov/air_traffic/publications/atpubs/aim_html/
  chapters 1-1 and 1-2 (VOR, DME, ILS, GPS, WAAS, CDI scaling), 4-4 (clearances, VFR-on-top), 5-2
  (departures, void times, ODP climb gradient), 5-3 (required reports, holding speeds, timing, entries),
  5-4 (approach categories, MSA, VDP, side-step, circling missed approach, visual and contact
  approaches, hold in lieu of PT), 5-5-15 (minimum fuel), 7-1 (SIGMET, convective SIGMET, AIRMET,
  FIS-B use, flight categories, SPECI criteria, thunderstorm flying), 8-1-2 (night vision and oxygen).
- Instrument Flying Handbook, FAA-H-8083-15B: https://www.faa.gov/sites/faa.gov/files/pilots/FAA-H-8083-15B.pdf
  (vestibular and visual illusions, primary and supporting instruments, control and performance,
  scan errors, unusual attitude recovery, gyros, compass, localizer width, glidepath thickness,
  false glide slopes, DME groundspeed, standard-rate bank rule of thumb).
- Instrument Procedures Handbook, FAA-H-8083-16B: https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/instrument_procedures_handbook/FAA-H-8083-16B.pdf
  (en route altitudes MEA, MOCA, MRA, MCA, MTA, MAA, changeover points, OROCA).
- Aviation Weather Handbook, FAA-H-8083-28A: https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28A_FAA_Web.pdf
  (icing types and SLD, fog types and the narrowing temperature-dewpoint spread, fronts, turbulence, FB coding, TAF WS
  groups, LLWS on ATIS, AIRMET content).
- Risk Management Handbook, FAA-H-8083-2A (risk = likelihood x severity), named in the ACS references.

## Copyright and similarity check (2026-11-23)
The FAA IRA sample question PDF (59 items parsed) was compared with every item: stem similarity
(difflib ratio over 0.5), word overlap (over half of a stem's content words) and shared option sets
(two or more). Close matches were rewritten with a different fact or angle and new options:
precision alternate minimums (now a procedure's published alternate minimums), the airborne VOR
checkpoint tolerance (now which check comes next), alternate static indications (now when to use it),
RVR 2400 to 1/2 SM (now RVR 1600), what the MEA assures (now the MTA), the 5 percent / 10 knot TAS
report (now the 500 fpm report), VFR-on-top altitudes (now where VFR-on-top is not allowed), the
standard 200 ft/NM climb gradient (now the 400-foot turn height), and contact approach requirements
(now IFR status on a visual approach). What remains shares only topic words. The same check was run
against data/v2/faapvt and data/part107-questions.json: items repeating a sibling's fact and answer
(VOT tolerance, the macho attitude and antidote, VFR cruising altitudes, DME slant range) were replaced.

## Blueprint
The FAA publishes no per-area counts for IRA. Per test, Tigertest's estimate from the ACS: regulations
and qualifications 8, weather theory 7, weather reports and forecasts 7, instruments and systems 8,
navigation and en route charts 8, ATC, departures and holding 8, approaches 8, human factors and ADM 6
(= 60). Pools (tests 1, 2 and drill-only): 8/8/10, 7/7/10, 7/7/10, 8/8/10, 8/8/10, 8/8/10, 8/8/11, 6/6/9 = 200.

## Facts deliberately avoided
BasicMed (61.113 and Part 68 limits, rulemaking from the FAA Reauthorization Act of 2024 pending),
fees, chart-specific numbers that need the supplement, convective SIGMET validity time, TAA arc radii,
cold-temperature restricted airport corrections, and the old composite flight plan (the AIM says
current automation can't process them).

## Second review (2026-11-23)
Blind pass over all 200 items, every number recomputed (61.57 calendar months: January tasks current
through July 31; March tasks current through September 30, grace through March 31, IPC from April 1;
lost comms 91.185(c)(2) highest of assigned, MIA and expected altitude; 600 fpm, 3 minutes, 477 fpm,
18 degrees, 400 fpm). Nine items changed: the fog item rewritten (the 2 degree C "seldom forms"
figure was not found in FAA text; FAA guidance uses about 5 degrees F or less), unsupported details
dropped (FIS "20 minutes", RAIM "1 hour either side", false glide slope angles), the anvil hail
attribution, AIM thunderstorm paragraph numbers and two CFR paragraph letters made generic.
Confirmed: tailplane stall after flap extension (AC 91-74B), MRA definition (Pilot/Controller
Glossary), SPC categories TSTM, MRGL, SLGT, ENH, MDT, HIGH, airspeed primary for pitch in a
constant-airspeed climb (FAA-H-8083-15B), FB rules (no temperature at 3,000 feet, sign omitted above
24,000), procedure turn normally within 10 NM (AIM 5-4-9). The similarity check against the 59 FAA
IRA sample items was repeated (difflib, word overlap, shared options): only topic-word overlaps
remain; sample item 58 asks the Category A speed limit, while our item asks which category a VREF of
95 knots falls in.
