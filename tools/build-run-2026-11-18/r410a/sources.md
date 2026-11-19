# Sources for `r410a` (ESCO Institute R-410A Safety Certification, AC&R Safety Coalition exam)

All 200 questions are original, written by Tigertest from the ESCO program description and the
primary sources below (federal rules, ESCO's own pressure-temperature chart, a manufacturer SDS
and a manufacturer installation guide). No ESCO practice exam item, training-manual question,
interactive CD question or commercial practice question was copied or reworded, and no prep
provider is named. A fact-and-answer scan against `data/epa608-questions.json`,
`data/journeyman-electrician-questions.json` and `data/red-seal-plumber-questions.json` was run
and overlapping items rewritten. Checked 2026-11-18.

## Exam owner and format (official)
- ESCO Institute, "Universal R-410A Safety & Training",
  https://www.escogroup.org/Training/R410A.aspx (fetched 2026-11-18). Gave: the R-410A Safety
  Training Program "addresses the issues of safe handling, training and certification with the
  use of R-410A"; the training manual covers servicing systems with R-410A and R-407C, the R-22
  phase-out, appropriate refrigerant and oil applications, service techniques and safe handling
  of R-410A (English and Spanish); "The AC&R Safety Coalition exam validates that a person
  possess the knowledge to safely work with this refrigerant"; "This 50-question exam covers
  proper safety, handling, and application of R-410A refrigerant systems"; persons who pass
  receive a certificate and an AC&R Safety Coalition R-410A patch.
- ESCO Institute / HVAC Excellence, "Specialty Certifications",
  https://www.escogroup.org/Certifications/Specialty.aspx (fetched 2026-11-18). Gave: "The
  R-410A Certification exam addresses the issues of safe handling with the use of R-410A
  refrigerant ... this high-pressure refrigerant ... The 50-question exam covers: Proper safety,
  Handling, Application of R-410A"; no prerequisite; available to students, technicians and
  instructors. The same page calls the A2L exam "mildly flammable" and the A3 exam "highly
  flammable" refrigerants (used for the two class descriptions in the bank).
- ESCO Institute, "Practice Exam Selection", https://www.escogroup.org/practice/ (fetched
  2026-11-18): a free R-410A practice exam exists ("New R-410A equipment requires updated tools,
  safety standards, and fundamentals"). It was not opened for content and nothing from it is used.
- Not published on any ESCO page fetched: time limit, open or closed book (ESCO states
  "closed-book" for its A2L and A3 exams but says nothing for R-410A), passing score, fees,
  languages of the exam itself. The copy says so; Tigertest's 70% is a readiness line, not
  ESCO's pass mark. Format facts stay on the landing and in examFacts, never in the bank.

## Refrigerant pressures and classes (ESCO's own chart)
- ESCO Institute, 2026 Pressure-Temperature Chart (PDF),
  https://escostrapifiles.blob.core.windows.net/uploads/TP_Chart_091026_ce050d44c5.pdf
  (fetched 2026-11-18, linked from ESCO's practice exam page). Gave (psig): R-410A 40 F 118,
  45 F 130, 50 F 143, 70 F 201, 80 F 238, 100 F 318, 104 F 336, 110 F 365, 120 F 418;
  also 0 F 48, 35 F 107, 60 F 170, 115 F 391;
  R-22 0 F 24.0, 35 F 61.5, 40 F 68.6, 45 F 76.1, 70 F 121, 80 F 144, 100 F 196, 104 F 208; R-407C bubble/dew at 40 F 80.2/63.2 and 104 F 239/209;
  R-454B bubble/dew 40 F 112.0/107.0; R-32 40 F 121.0. ASHRAE class and GWP (AR4): R-410A A1
  2088, R-22 A1 1810, R-32 A2L 675, R-454B A2L 466, R-407C A1 1770. Chart groups R-410A as
  "very-high pressure, over 340 psig at 104 F condensing" (ESCO's grouping, not EPA's).
  Computations used: 336/208 = 1.62 (about 60% higher than R-22 at 104 F); 118 - 68.6 = 49.4.

## Federal rules (primary law)
- 40 CFR 82.152 (eCFR, current), https://www.ecfr.gov/current/title-40/section-82.152 (fetched
  2026-11-18 via the eCFR renderer API): "High-pressure appliance means an appliance that uses a
  refrigerant with a liquid phase saturation pressure between 170 psia and 355 psia at 104 F.
  Examples include ... R-22, R-407A, R-407C, R-410A"; apprentice definition; full charge;
  comfort cooling.
- 40 CFR 82.154, https://www.ecfr.gov/current/title-40/section-82.154 (fetched 2026-11-18):
  venting prohibition covers non-exempt substitutes; de minimis releases; knowing release after
  recovery is venting; sales restriction for non-exempt substitutes starting January 1, 2018;
  buyers who may purchase; seller invoices kept three years.
- 40 CFR 82.156, https://www.ecfr.gov/current/title-40/section-82.156 (fetched 2026-11-18):
  applies to non-exempt substitutes from January 1, 2018; Table 1: high-pressure appliance with
  less than 200 lb full charge, 0 inches Hg vacuum with equipment made before or after
  November 15, 1993; 200 lb or more, 4 / 10 inches Hg; for non-major repair, evacuate a high-
  pressure appliance to no higher than 0 psig; for oil changes, evacuate or pressurize to no
  higher than 5 psig (82.156(a)(1)(iii)); leaking appliance, lowest attainable level, not
  above 0 psig; disposal records for 5 to 50 lb appliances kept three years; refrigerant may be
  returned to the same owner's appliance without reclaim.
- 40 CFR 82.161, https://www.ecfr.gov/current/title-40/section-82.161 (fetched 2026-11-18):
  Type II technicians for medium-, high- and very high-pressure appliances; apprentices closely
  and continually supervised.
- EPA, "Refrigerant Sales Restriction",
  https://www.epa.gov/section608/refrigerant-sales-restriction (fetched 2026-11-18): Section 609
  certified technicians cannot buy refrigerant intended for stationary equipment, regardless of
  container size; wholesaler invoice duties.
- EPA, "Section 608 Technician Certification",
  https://www.epa.gov/section608/section-608-technician-certification-0 (fetched 2026-11-18):
  EPA does not issue certification cards; certifying programs do.
- 40 CFR 84.54 (Technology Transitions), https://www.ecfr.gov/current/title-40/section-84.54
  (fetched 2026-11-18): from January 1, 2025 no manufacture or import of residential
  dehumidifiers with GWP 700 or greater (84.54(a)(2)) or of self-contained
  residential and light commercial AC and heat pump products with GWP 700 or greater; no
  installation of residential or light commercial AC or heat pump systems with GWP 700 or
  greater, except new systems where all specified components were manufactured or imported
  before January 1, 2025; VRF systems from January 1, 2026, installable before January 1, 2027
  if all components predate 2026 (January 1, 2028 with a building permit issued before
  October 5, 2023); "installation" includes assembling a system for the first time from used
  or new components.
- EPA, "Regulatory Actions for Technology Transitions",
  https://www.epa.gov/climate-hfcs-reduction/regulatory-actions-technology-transitions
  (fetched 2026-11-18), and the May 2026 final rule fact sheet,
  https://www.epa.gov/system/files/documents/2026-05/fact-sheet-san-12166-technology-transitions-frm.pdf
  (fetched 2026-11-18): the May 21, 2026 reconsideration rule "removes the January 1, 2026,
  installation compliance date" for residential and light commercial AC and heat pump systems
  above the 700 limit made or imported before January 1, 2025, "allows pre-2025 inventory ... to
  be installed until supply runs out". The December 2023 interim rule (the January 1, 2026
  deadline it set) is therefore not used.
- EPA, "Technology Transitions GWP Reference Table",
  https://www.epa.gov/climate-hfcs-reduction/technology-transitions-gwp-reference-table
  (fetched 2026-11-18): R-410A 2,088 (calculated), HFC-32 675, HFC-125 3,500.
  Check: 0.5 x 675 + 0.5 x 3,500 = 2,087.5, which rounds to 2,088.
- 40 CFR 84.106, 84.108, 84.112, 84.116 (Emissions Reduction and Reclamation), e.g.
  https://www.ecfr.gov/current/title-40/section-84.106 (fetched 2026-11-18): leak repair from
  January 1, 2026 for appliances of 15 lb or more with a regulated substance or a substitute
  above GWP 53, with the residential and light commercial AC and heat pump subsector exempt;
  comfort cooling 10%; certified technician must do repairs; the owner or operator calculates
  the leak rate each time refrigerant is added and the technician provides documentation
  (84.106(b)); the first annualized calculation after January 1, 2026 uses 365 days
  (84.106(b)(1)); follow-up verification within 10 days (84.106(e)(2)); time frames suspended
  while mothballed (84.106(d)(3)); automatic leak detection for commercial and industrial
  process refrigeration of 1,500 lb or more, detecting 10 ppm, alerting at 100 ppm, audited and
  calibrated annually (84.108); reclaimed refrigerant may hold no
  more than 15% virgin regulated substance by weight from January 1, 2026 (84.112); reclaimed
  refrigerant required for servicing supermarket systems, refrigerated transport and automatic
  commercial ice makers from January 1, 2029; disposable cylinders from January 1, 2028 sent
  for heel removal, or a certified technician evacuates the heel to 15 in Hg and signs a
  statement (84.116).
- EPA, "Fact Sheet: EPA Revises Biden-Era Refrigerant Rules", April/May 2026,
  https://www.epa.gov/system/files/documents/2026-05/high-level-refrigerant-fact-sheet.pdf
  (fetched 2026-11-18): proposed ER&R change for road refrigerated transport leak repair. Not
  final, so refrigerated transport leak repair is not asked.
- EPA SNAP, "Substitutes in Residential and Light Commercial Air Conditioning and Heat Pumps",
  https://www.epa.gov/snap/substitutes-residential-and-light-commercial-air-conditioning-and-heat-pumps
  (fetched 2026-11-18): R-410A acceptable for new equipment only (N), A1, ODP 0; R-407C,
  R-422D, R-421A, R-438A acceptable for retrofit and new (R/N), A1; HFC-32 new only, A2L.
- EPA, "Phaseout of Class II Ozone-Depleting Substances",
  https://www.epa.gov/ods-phaseout/phaseout-class-ii-ozone-depleting-substances (fetched
  2026-11-18): 2010 no production or import of HCFC-22 except for equipment manufactured before
  January 1, 2010; 2020 no production or import of HCFC-22; servicing continues.
- EPA SNAP, "Refrigerant Safety", https://www.epa.gov/snap/refrigerant-safety (fetched
  2026-11-18): risks are toxicity, flammability, asphyxiation and physical hazards; acute versus
  chronic exposure; LFL and UFL.
- 49 CFR 173.304a (DOT), https://www.ecfr.gov/current/title-49/section-173.304a (fetched
  2026-11-18): refrigerant gas, n.o.s. "Not liquid full at 130 F"; DOT 39 cylinders need a
  pressure relief device.
- 49 CFR 178.65 (DOT 39), https://www.ecfr.gov/current/title-49/section-178.65 (fetched
  2026-11-18): DOT 39 is a non-reusable (non-refillable) cylinder; marking "Federal law forbids
  transportation if refilled".
- 49 CFR 173.306 (DOT), https://www.ecfr.gov/current/title-49/section-173.306 (fetched
  2026-11-18): refrigerating machines; Group A1 under ASHRAE Standard 15.
- 29 CFR 1910.146 (OSHA), https://www.ecfr.gov/current/title-29/section-1910.146 (fetched
  2026-11-18): oxygen deficient atmosphere is less than 19.5 percent oxygen by volume.
- 29 CFR 1910.1200 (OSHA HazCom), https://www.ecfr.gov/current/title-29/section-1910.1200
  (fetched 2026-11-18): SDS readily accessible during each work shift; training.
- 29 CFR 1910.133 and 1910.252 (OSHA), https://www.ecfr.gov/current/title-29/section-1910.133
  (fetched 2026-11-18): eye and face protection against liquid chemical hazards; welding and
  brazing fire prevention.

## Manufacturer documents (primary product data)
- Daikin Industries, Safety Data Sheet R-410A, revision 23.03.2023,
  https://www.daikinchemicals.com/library/pb_common/pdf/sds/Refrigerants/sds-R-410A-E_20230323.pdf
  (fetched 2026-11-18): pentafluoroethane (HFC-125) 49.5 to 51.5% and difluoromethane (HFC-32)
  48.5 to 50.5%; gas under pressure, may explode if heated; frostbite, asphyxiation, cardiac
  arrhythmia at high levels; respiratory protection with an organic gas cartridge; glove
  material leather; catecholamines (adrenaline) only with special caution; hydrogen
  fluoride and carbonyl fluoride from thermal decomposition; keep away from naked flame or
  metal heated over 300 to 400 C; warm a container only with lukewarm water below 40 C, no
  heaters; boiling point -52.7 C; ether-like odour; not flammable; rescuers wear supplied-air or
  SCBA; stay windward, ventilate before entering. Vapour heavier than air is computed, not
  quoted: molar mass of a 50/50 by weight HFC-32 (52.02) / HFC-125 (120.02) blend is
  1 / (0.5/52.02 + 0.5/120.02) = 72.6 g/mol, against 29 for air.
- Carrier, 38YXA installation instructions with "R-410A Quick Reference Guide" (1997 edition,
  "Copyright 1997 CARRIER Corp."; its old cylinder colour note is not used),
  https://www.shareddocs.com/hvac/docs/1009/Public/01/38YXA-1SI.pdf (fetched 2026-11-18,
  Carrier's document host): 50 to 70 percent higher pressures than R-22; dip tube for liquid
  with the cylinder upright; recovery cylinders 400 psig service pressure (DOT 4BA400 or
  BW400); charge with liquid through a commercial-type metering device; manifold 800 psig high
  side, 250 psig low side with 550 psig low-side retard; hoses 800 psig; leak detectors for HFC;
  POE only; vacuum pumps will not remove moisture from oil; liquid-line driers at least 600 psig;
  never a suction-line drier in the liquid line; POE absorbs moisture rapidly, may damage some
  plastics and roofing; wrap driers and valves with a wet cloth when brazing; liquid-line drier
  on every unit; no R-22 TXV; never open a system under vacuum, break vacuum with dry nitrogen;
  replace the drier after opening; deep vacuum 500 microns; triple evacuation to 28 in Hg, then
  nitrogen to 2 psig and stand 1 hour; never use the compressor as a vacuum pump; crankcase
  heater powered 24 h before start and required for long lines (over 50 ft or 8 ft elevation);
  do not operate in a vacuum, do not disable the low-pressure switch; subcooling charge with a
  TXV; weigh the charge per the rating plate plus or minus 0.6 oz/ft of 3/8-in. liquid line
  above or below 15 ft (used only as worked sums with the figures given in the stem); run at
  least 10 minutes before checking charge (a Carrier figure; the stem names Carrier); lock out and tag the disconnect; safety glasses, gloves.
  Model-specific numbers (ambients, defrost timings, line-length allowances) are not asked as
  rules: the bank says "the manufacturer's instructions" where a figure varies by unit.

## Not confirmed and how the copy words it
- AHRI cylinder colour changes: left out (EPA-CORE-034 in `epa608` already covers the old rose
  colour, and the scheme is in transition).
- ASHRAE Standard 34 text (paywalled; the ASHRAE fact sheet URL returned 404): only the classes
  printed on ESCO's chart and EPA's SNAP list, and ESCO's "mildly flammable" / "highly
  flammable" wording, are used.
- Hose burst ratings, specific recovery cylinder retest intervals for each DOT spec, gauge
  accuracy classes: left out.
- State and local codes, A2L installation code details (ASHRAE 15 and UL 60335-2-40 limits):
  left out; A2L refrigerants are named only as EPA lists them.

## Deliberately left out
- Exam fees, time, pass mark, languages (unpublished by ESCO), and any question about the test.
- Penalties and fines; whistleblower awards; officeholders.
- Proposed (not final) ER&R changes for refrigerated transport.

## Sibling bank note for the integrator
- `data/epa608-questions.json` EPA-T2-021 keys 10 inches Hg for recovering R-410A from a 12 lb
  split system with post-1993 equipment. 40 CFR 82.156 Table 1 (current) lists R-410A as a
  high-pressure appliance and requires 0 inches Hg for a high-pressure appliance under 200 lb,
  with either equipment age. That key looks wrong and should be checked.
