# Wastewater Treatment Operator Class I bank sources

All 200 questions are original, written for Tigertest from the exam owner's Need-to-Know
Criteria and formula table and from the federal regulations and government guidance below.
None is copied, adapted or reworded from WPI/ABC sample items, past exams, the CSUS (Sacramento
State Office of Water Programs) workbooks, WEF or AWWA study guides, or any prep site, app or
question pool. The three sample items printed in the Need-to-Know Criteria (the chlorine contact
time item, the activated sludge wasting item and the reservoir pressure item) were not reused, and
no item asks about the chlorine contact time or tank bottom pressure. Every calculation uses
numbers chosen for this bank and is worked and asserted in its source file.

The bank was checked against Tigertest's Water Treatment Operator Class I bank
(`data/water-treatment-operator-questions.json`, `waterop`), EPA 608, OSHA 10, OSHA 30 and CDL
banks: no fact and answer pair is repeated. Facts asked there (chlorine gas collects near the
floor, the 1 ppm chlorine ceiling, the 10 percent LFL and 23.5 percent oxygen-enriched lines,
testing oxygen first, trying the start controls after lockout, eyewash rules, gate valves, valve
exercising, air gaps, feed pump calibration columns, cavitation, packing, the affinity laws,
SDS sections, fall protection heights and respirator fit testing) are left out here.

## Outline and format (Water Professionals International, formerly the Association of Boards of Certification)

ABC renamed itself Water Professionals International (WPI, gowpi.org); its exams are still the
ABC standardized exams. As with the water treatment bank, the owner's documents were read from
state agencies that host them for candidates.

- WPI, Need-to-Know Criteria, Wastewater Treatment Operator Class I (copyright 2025), hosted by the
  Alabama Department of Environmental Management, fetched 2026-11-23:
  https://adem.alabama.gov/sites/default/files/2025-08/NTK%20WWT1.pdf
  Exam content: Equipment Evaluation, Maintenance, and/or Operation 39 questions (13 recall, 26
  application, 0 calculation items); Treatment Process Evaluation and Adjustment 38 (6, 32, 9);
  Laboratory Analysis 10 (4, 6, 1); Security, Safety, and Administrative Procedures 13 (8, 5, 0);
  100 scored questions plus up to 10 unscored pre-test questions; 40% recall, 60% application;
  10% calculation items, printed in US and metric units. The job task lists (screening, grit,
  equalization, clarifiers, ponds, aeration, fixed film, filtration, chlorination and
  dechlorination, UV, dewatering, drying beds, aerobic digestion, pumps, mixers, chemical dosing,
  motors and MCC, instruments and analyzers, SCADA, generators, compressors, conveyors, valves,
  hoists; activated sludge, nutrient removal, landfill and surface water and RIB disposal;
  sampling and BOD, CBOD, WET, COD, nutrients, solids and bacteria tests; lockout, confined space,
  hazard communication, spill response, reports, security and SOPs) set the categories here.
  Primary and secondary references are CSUS Operation of Wastewater Treatment Plants Volumes 1 and
  2 (8th ed.) and WEF Wastewater Treatment Fundamentals 1 (paid books, not used).
- WPI, Formula/Conversion Table, Wastewater Treatment, Collection, Industrial Waste, & Wastewater
  Laboratory Exams (copyright 2023), hosted by NEIWPCC, fetched 2026-11-23:
  https://neiwpcc.org/wp-content/uploads/2024/09/WWT-FCT_081023_with-Pie-Wheels.pdf
  Every calculation uses its formulas: feed and loading rate lb/day = dose x MGD x 8.34 / purity;
  chemical feed pump setting mL/min; detention time; surface overflow rate; filter rate;
  F/M = BOD5 lb/day / MLVSS lb; SVI = SSV30 x 1,000 / MLSS; MCRT; return rate percent; return
  sludge rate by solids balance; trickling filter organic loading per 1,000 cu ft;
  recirculation ratio; percent removal; volatile solids reduction (Van Kleeck); total solids
  percent; solids mg/L; unseeded BOD; CFU/100 mL; composite single portion; 0.785 D2; 7.48 gal per
  cu ft; 8.34 lb/gal.
- Oregon DEQ, Wastewater Operator Certification: New 2025 Exam (fact sheet), fetched 2026-11-23:
  https://www.oregon.gov/deq/FilterDocs/fsORwwopcertEXup.pdf
  WPI 2025 standardized exams: 100 scored items and 10 unscored pre-test items; scores reported on
  a scale where 70 scaled score units is the pass mark ("the water and wastewater industry has
  long dictated a 70% passing score"). Who certifies, the exam used and the pass mark vary by
  state; the landing says to check the state program. 70% is the readiness line here.

## Federal regulations (eCFR, current text)

- 40 CFR 133.102 and 133.105, secondary treatment and treatment equivalent to secondary, fetched 2026-11-23:
  https://www.ecfr.gov/current/title-40/chapter-I/subchapter-D/part-133
  BOD5 and SS 30 mg/L (30-day) and 45 mg/L (7-day); CBOD5 25 and 40 mg/L; at least 85 percent
  removal; pH 6.0 to 9.0; equivalent to secondary 45/65 mg/L and 65 percent.
- 40 CFR 122.41, conditions applicable to all NPDES permits, fetched 2026-11-23:
  https://www.ecfr.gov/current/title-40/chapter-I/subchapter-D/part-122/subpart-C/section-122.41
  (d) duty to mitigate; (e) proper operation and maintenance; (j)(2) records kept at least 3 years
  (sludge records 5); (l)(4) DMR; (l)(6) 24-hour oral report and 5-day written report; (m) bypass;
  (n) upset.
- 40 CFR 136.3 Table II, preservation and holding times, fetched 2026-11-23:
  https://www.ecfr.gov/current/title-40/chapter-I/subchapter-D/part-136/section-136.3
  Coliform and E. coli 8 hours, cooled below 10 C, thiosulfate; BOD and CBOD 48 hours, cooled to
  6 C or below; TSS 7 days; ammonia and total phosphorus cooled and H2SO4 to pH below 2, 28 days;
  DO by probe, temperature, chlorine and pH within 15 minutes.
- 40 CFR 503.32 and 503.33, pathogen and vector attraction reduction, fetched 2026-11-23:
  https://www.ecfr.gov/current/title-40/chapter-I/subchapter-O/part-503/subpart-D
  Class A fecal coliform below 1,000 MPN per gram of total solids (or Salmonella below 3 MPN per
  4 g); Class B alternative 1 geometric mean of seven samples below 2,000,000 MPN or CFU per gram;
  vector attraction reduction by at least 38 percent volatile solids reduction.

## OSHA and NIOSH

- OSHA, Hydrogen Sulfide: Hazards, fetched 2026-11-23:
  https://www.osha.gov/hydrogen-sulfide/hazards
  Odor at low levels, loss of smell at 100 to 150 ppm, highly flammable with an explosive range of
  4.3 to 45 percent, general industry ceiling 20 ppm with a 50 ppm peak for up to 10 minutes,
  NIOSH IDLH 100 ppm.

## Government guidance used for operating practice

- US EPA, Wastewater Technology Fact Sheet: Trickling Filters, EPA 832-F-00-014, September 2000,
  fetched 2026-11-23: https://www.epa.gov/system/files/documents/2022-10/trickling-filters-factsheet.pdf
  Sloughing, recirculation, ponding and its remedies, filter flies, snails, odor, ventilation
  through the underdrains, rotary distributors.
- US EPA, Principles of Design and Operations of Wastewater Treatment Pond Systems for Plant
  Operators, Engineers, and Managers, EPA/600/R-11/088, 2011, fetched 2026-11-23:
  https://www.epa.gov/sites/default/files/2014-09/documents/lagoon-pond-treatment-2011.pdf
  Facultative pond layers, algae and photosynthesis, daily DO and pH swings, spring turnover,
  duckweed, aerated ponds, dike maintenance, transfer structures.
- US EPA, Wastewater Technology Fact Sheet: Disinfection for Small Systems, fetched 2026-11-23:
  https://19january2021snapshot.epa.gov/sites/static/files/2015-06/documents/disinfection_small.pdf
  Chlorination and dechlorination, contact time, low-pressure UV lamps at 253.7 nm, quartz
  sleeves and fouling, loss of UV effectiveness with turbidity and TSS.

- US EPA, NPDES Compliance Inspection Manual, Chapter 4 (Interim Revised, 2017), fetched 2026-11-23:
  https://www.epa.gov/sites/default/files/2017-03/documents/npdesinspect-chapter-04.pdf
  Flags velocity-controlled grit removal running well above or below 1 ft per second; treats
  aeration tank DO below 1.0 mg/L as low and nitrification DO below 2 mg/L as a problem; lists
  pin floc, stable dark tan foam and white sudsy foam as activated sludge indicators.
- US EPA, Preliminary Wastewater Treatment (technical assistance webinar, July 2023), fetched 2026-11-23:
  https://www.epa.gov/system/files/documents/2023-10/tawebinar_preliminarywastewatertreatment_230725.pdf
  Horizontal-flow grit chambers kept near 1 ft/sec; grit buildup from velocity that is too low.

## Left out

Fees, state classification and experience rules, collection system and industrial waste topics
(separate WPI exams), anaerobic digestion (not on the Class I outline), the metric versions of the
calculations (the real exam prints US and metric units side by side; the bank uses US units),
drawings and figure items, and state reporting forms.

## Second review (2026-11-23)

Blind review of all 200 items; every calculation recomputed. Rule-of-thumb items checked against
EPA: grit velocity and aeration DO against the NPDES inspection manual and the preliminary
treatment webinar, UV at 253.7 nm, sleeve fouling and TSS against the disinfection fact sheet,
snails, ponding and filter fly remedies against the trickling filter fact sheet, pond DO and pH
swings, spring odor after ice-out and duckweed shading against the pond manual, and the 70 scaled
pass mark against the Oregon DEQ fact sheet. The BOD dark incubation and the 1-hour Imhoff cone
reading are the approved Standard Methods procedures referenced by 40 CFR 136.3. Six items that
repeated a fact and answer from the water treatment, OSHA 10 or OSHA 30 banks (compressor receiver
drains, UV damaging DNA, alum using alkalinity, the jar test, confined space rescuers, drawing from
the best water layer) were rewritten on new facts.
