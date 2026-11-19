# Sources for `backflow` (Backflow Prevention Assembly Tester exam, ASSE 5110)

All 200 questions are original, written by Tigertest from the ASSE tester course objectives,
ASSE's own field test flow charts and report forms, the US EPA Cross-Connection Control Manual
and the federal regulations below. No ASSE, ABPA, USC FCCCHR, AWWA or state exam item, course
workbook question, past paper or commercial practice question was used or reworded, and no prep
provider is named. A fact-and-answer scan against `data/epa608-questions.json`,
`data/uk-water-regulations-questions.json` and `data/red-seal-plumber-questions.json` was run.
Checked 2026-11-18.

## Exam owner, outline and format (official)
- ASSE International, "ASSE Backflow Instructor Guide",
  https://asse-plumbing.org/personnel-certification/backflow-prevention/guidelines-and-forms/asse-backflow-instructor-guide
  (fetched 2026-11-18). Gave: tester classes follow ASSE/IAPMO/ANSI Series 5000, Cross-Connection
  Control Professional Qualifications Standard (first issued 1990, ANSI 1991); links to the
  tester course objectives, written exam directions, recertification directions, and the
  field test flow charts and report forms used below.
- ASSE, "Instructional Objectives Checklist" for the tester course (dated 04/2004, the version
  ASSE links today), https://asse-plumbing.org/media/kqhbe40w/tester-ioc.pdf (fetched
  2026-11-18). The 14 objectives the bank follows: introduction (types of cross-connections,
  history, incidents, public health); drinking water regulations (SDWA, primary and secondary
  standards, MCLs, toxicology); cross-connection programs (purveyor, tester, surveyor, repairer
  responsibilities, surveys, security of assemblies); definitions; hydraulics (backsiphonage,
  backpressure, atmospheric, absolute and gauge pressure, backflow, thermal expansion, Venturi
  principle); laws, rules, codes; listing agencies, testing laboratories, associations; test
  gauge equipment; parts, identification, application and installation of the air gap, ASSE
  1001, 1013, 1015, 1020, 1047, 1048, 1052, 1056 and 1064 (field test kits); test procedures
  for 1013, 1015, 1020, 1047, 1048; troubleshooting failures and causes (check valves, relief
  valve, air inlet, test cocks, shutoff valves); documentation; tester responsibilities; safety.
  ASSE publishes no weights, so the category split is Tigertest's.
- ASSE, "Examination for Backflow Prevention Assembly Tester, Written Examination Instructions",
  https://asse-plumbing.org/media/o2ucmdfd/tester-directions.pdf (fetched 2026-11-18). Gave: 2
  hours, no notes, textbooks or other references, calculator allowed, one correct or best answer,
  answer sheet with the signed objectives checklist and the written and practical exam booklets,
  graded by ASSE, 70% or better passes. No question count is published.
- ASSE, recertification written exam instructions,
  https://asse-plumbing.org/media/mtqnxf2j/recert-directions.pdf (fetched 2026-11-18): 1 hour,
  closed book, 70% to pass. The recertification interval is not stated in any page read.
- IAPMO press release, 20 June 2025, "California State Water Board formally recognizes ASSE 5110
  certification for backflow testers",
  https://iapmo.org/newsroom/press-releases/california-state-water-board-formally-recognizes-asse-5110-certification-for-backflow-testers
  (fetched 2026-11-18). Gave: ASSE 5110 accepted under section 3.4.1 of California's
  Cross-Connection Control Policy Handbook.

## Field test procedures and pass criteria (official)
- ASSE trouble-shooting flow charts (fetched 2026-11-18):
  1013 RP https://asse-plumbing.org/media/sd3phcbc/asse_1013_flow_chart.pdf (test 1 tightness of
  #2 shutoff, test 2 #2 check under backpressure with a bypass from TC #2 to TC #4, test 3 #1
  check at 5 psid or more, test 4 relief valve drips at 2 psid or more; intermittent discharge
  means line pressure fluctuation; failures and causes);
  1015 DC https://asse-plumbing.org/media/dvgiynv2/asse_1015_flow_chart.pdf (test 1 #2 shutoff,
  test 2 #1 check, test 3 #2 check with high hose on TC #3 and low hose on TC #4, each over
  1 psid);
  1020 PVB https://asse-plumbing.org/media/uh3nr3ai/asse_1020_flow_chart.pdf (#2 shutoff, check
  at 1 psid or more, air inlet opens at 1 psid or more with the canopy removed; failure causes);
  1056 SRVB https://asse-plumbing.org/media/14bfjvm2/asse_1056_flow_chart.pdf (flush TC #1, close
  #2 then #1 shutoff, remove bleed screw, check at 1 psi or more, air inlet at 1 psid or more).
- ASSE field test report forms for 1013, 1015, 1020 and 1056, e.g.
  https://asse-plumbing.org/media/g5plrkly/1013-test-report-form.pdf (fetched 2026-11-18): the
  fields a tester records (owner, location, make, model, size, serial, test kit and calibration
  date, date, time, static line pressure, initial and final results, repairs, pass or fail,
  certification number, signature).

## Technical reference and law
- US EPA, Cross-Connection Control Manual, EPA 816-R-03-002 (February 2003),
  https://19january2021snapshot.epa.gov/sites/static/files/2015-09/documents/epa816r03002_0.pdf
  (fetched 2026-11-18). Gave: case histories (Chicago 1933, funeral aspirator, propane purge,
  sodium dichromate boiler water, car wash, chlordane hose); pressure terms (14.7 psia,
  0.433 psi per foot, 33.9 ft, vacuum), Venturi and pump suction, backpressure from pumps and
  thermal expansion; air gap twice the supply diameter and never under 1 inch; barometric loop
  35 ft; AVB, hose bibb VB, PVB, SVB, double check with intermediate vent, DC, DC detector,
  residential dual check and RP descriptions and installation notes (AVB 6 inches above the
  outlet, no shutoff downstream; RP 12 to 30 inches above the floor; RP zone at least 2 psi below
  supply, second check opens at 1 psi, 10 to 20 psi loss); pre-test steps (owner permission,
  warn occupants, flow direction, bleed test cocks, wait before hooking up an RP); test kit
  (0 to 15 psid gauge, 500 psi working pressure, calibration, draining); PVB water column method
  (28 inches equals 1 psi); containment, fixture isolation, surveys, model program definitions
  (contaminant, pollutant, backpressure, backsiphonage, owner duties, no unprotected bypass).
- 40 CFR 141.2, definitions (MCL, MCLG, public, community and non-community water systems),
  https://www.ecfr.gov/current/title-40/section-141.2 (read through the eCFR API, 2026-11-18).
- 40 CFR 143.1, National Secondary Drinking Water Regulations, purpose (aesthetic, not federally
  enforceable), https://www.ecfr.gov/current/title-40/section-143.1 (read 2026-11-18).
- 29 CFR 1910.146, permit-required confined spaces, definition of confined space (vaults and
  pits listed), https://www.ecfr.gov/current/title-29/section-1910.146 (read 2026-11-18).

## Not loaded or not confirmed
- ABPA tester certification pages (abpa.org) returned 403. Nothing from ABPA is used; the copy
  says many programs accept ABPA or ASSE certification and to check with the local water
  supplier.
- The ASSE/IAPMO/ANSI Series 5000 standard itself (paid; ANSI preview did not load), the USC
  FCCCHR Manual (paid) and AWWA M14 (paid). Their figures are not used.
- Question count of the real written exam, practical exam scoring, fees, prerequisites in
  hours or years, and the recertification interval: not published on pages read; left out.

## Deliberately left out
- State and local rules that differ: test frequency, who may test, report deadlines, PVB and
  RP installation heights beyond the EPA manual, enclosure rules. Questions say "local rules"
  where a jurisdiction decides.
- Repair procedures beyond identifying failures (repairer certification is separate).
- Any fact about the exam itself; format facts stay on the landing and in examFacts.
