# Sources for `natecore` (NATE Core exam, North American Technician Excellence)

All 200 questions are original, written by Tigertest from NATE's Core exam KATE outline and the
primary sources below (federal OSHA and DOT rules, EPA and ENERGY STAR pages, ACCA's manual
descriptions, a compressor maker's application bulletin, a meter maker's guide) and from physics
and arithmetic recomputed in `build.py`. No NATE study guide item, NATE Training Academy item,
practice exam question or commercial question was copied or reworded, and no prep provider is
named. A fact-and-answer scan against `data/epa608-questions.json`, `data/r410a-questions.json`,
`data/journeyman-electrician-questions.json` and `data/ase-questions.json` was run and
overlapping items rewritten. Checked 2026-11-18.

## Exam owner, outline and format (official)
- NATE, "Core Exam KATE: Knowledge Areas of Technician Expertise" (PDF, Canva, created
  2022-09-21), https://natex.org/wp-content/uploads/2022/06/Core-KATE-Final.pdf (fetched
  2026-11-18, linked from the KATE page). Gave: the Core exam tests general knowledge,
  construction knowledge and HVACR specific knowledge in safety, tools, basic construction, basic
  science, achieving desired conditions, taking measurements and basic electricity; "a
  requirement for most installation or service specialty certifications"; closed book, 1.5 hour
  time limit, 50 questions, passing score pass/fail; passing scores set by a Passing Score Study
  and "may vary slightly" between forms. Section weights: Basic Electricity 26%, Taking Temp. &
  Humidity Measurements 14%, Tools 10%, Safety 18%, Achieving Desired Conditions 14%, Using
  Basic Science 10%, Basic Construction 8%. The full KATE list (safety: regulations, ladders,
  confined spaces, moving machinery, electrical safety, brazing, cylinders, hazmat; tools:
  measuring, fabrication, tubing tools; construction: plans, piping layouts, roofing, ceilings,
  walls, floors, fenestration, girders and trusses, chimneys; basic science: chemistry,
  electrons, magnetism, AC and DC, circuit analysis, distribution, solid state, pressure,
  arithmetic, algebra, geometry, graphs, mechanics, gas laws, load types, power factor; desired
  conditions: temperature, humidity, air quality, sound; measurements: latent and sensible heat,
  convection, conduction, radiation, BTU, thermometers, psychrometrics, enthalpy; basic
  electricity: symbols, field, pictorial and ladder diagrams, single and three phase motors, ECM,
  actuators, digital meters, RMS) and the industry references (ACCA Manuals J, D, S, QI, T, RS;
  ICC codes; SMACNA; NFPA; OSHA; generally accepted HVACR and construction textbooks).
- NATE, "Knowledge Areas of Technician Expertise (KATEs)",
  https://natex.org/technician/take-an-exam/kate (fetched 2026-11-18): lists the Core KATE and
  every specialty KATE, including the separate Ready-to-Work and HVAC Support Technician KATEs.
- NATE, "Traditional Pathway", https://natex.org/technician/take-an-exam/traditional-pathway
  (fetched 2026-11-18): "Technicians that choose the traditional NATE certification pathway will
  take two exams: the 50-question NATE Core exam and a 100-question Specialty exam"; live online
  proctoring is offered; specialties earn an Installation, Service or Senior specialization.
- NATE, "Certified HVAC Professional (CHP-5)",
  https://natex.org/technician/take-an-exam/certified-hvac-professional-chp-5 (fetched
  2026-11-18): CHP-5 is offered instead of the Core plus Specialty pair; the traditional pathway
  remains available.
- NATE, "NATE Certificates and Certification Exams",
  https://natex.org/technician/take-an-exam/nate-certificates-and-certification-exams (fetched
  2026-11-18): Ready-to-Work (entry level, online, unproctored) and HVAC Support Technician
  (6 to 12 months in the field, proctored) earn a certificate, not a NATE certification, valid
  5 years. They have their own KATEs and are not modelled here.
- NATE, "Recertification FAQs", https://natex.org/technician/recertification-faqs (fetched
  2026-11-18): certifications renew every two years with 16 continuing education hours or by
  retaking the Specialty exam; 120-day grace period; after it lapses both Core and Specialty must
  be retaken. (Landing and FAQ only; fees left out.)

## Federal safety rules (primary law, eCFR, fetched 2026-11-18)
- 29 CFR 1926.1053, https://www.ecfr.gov/current/title-29/section-1926.1053: side rails 3 feet
  above the landing; non-self-supporting ladders at a horizontal distance of about one quarter
  of the working length; nonconductive side rails near exposed energized equipment; top step of
  a stepladder not used as a step; not moved while occupied.
- 29 CFR 1910.23, https://www.ecfr.gov/current/title-29/section-1910.23: stepladder cap and top
  step not used as steps.
- 29 CFR 1910.95, https://www.ecfr.gov/current/title-29/section-1910.95: hearing conservation
  program at an 8-hour TWA of 85 dBA (the action level).
- 29 CFR 1910.146, https://www.ecfr.gov/current/title-29/section-1910.146: hazardous
  atmosphere below 19.5 or above 23.5 percent oxygen; test first for oxygen, then combustible
  gases, then toxic gases.
- 29 CFR 1910.147, https://www.ecfr.gov/current/title-29/section-1910.147: each lockout or
  tagout device removed by the employee who applied it; affected employees notified.
- 29 CFR 1910.133, https://www.ecfr.gov/current/title-29/section-1910.133: side protection for
  flying-object hazards.
- 29 CFR 1910.135, https://www.ecfr.gov/current/title-29/section-1910.135: helmets where
  falling objects may injure the head.
- 29 CFR 1910.155 and 1910.157, https://www.ecfr.gov/current/title-29/section-1910.155: fire
  classes A (ordinary combustibles), B (flammable liquids, gases, greases), C (energized
  electrical), D (combustible metals); Class A extinguisher travel distance 75 feet or less.
- 29 CFR 1910.212, https://www.ecfr.gov/current/title-29/section-1910.212: guarding against
  point of operation, ingoing nip points, rotating parts.
- 29 CFR 1910.252, https://www.ecfr.gov/current/title-29/section-1910.252: fire watch when
  combustibles are within 35 feet; kept at least a half hour after hot work.
- 29 CFR 1910.253 and 1926.350, https://www.ecfr.gov/current/title-29/section-1910.253:
  acetylene never above 15 psig; oxygen stored 20 feet from fuel gas or behind a 5-foot,
  half-hour barrier; valve caps on except in use; cylinders secured upright; 20 feet from highly
  combustible materials.
- 29 CFR 1910.333 and 1910.334, https://www.ecfr.gov/current/title-29/section-1910.333: a
  qualified person verifies with test equipment that parts are deenergized; cords visually
  inspected before use on any shift.
- 29 CFR 1926.404, https://www.ecfr.gov/current/title-29/section-1926.404: GFCIs on 120 V,
  15 and 20 A temporary receptacles on construction sites.
- 29 CFR 1910.1200, https://www.ecfr.gov/current/title-29/section-1910.1200: SDS section order
  (1 identification, 2 hazards, 4 first aid, 5 fire fighting, 6 accidental release, 7 handling
  and storage, 8 exposure controls/PPE, 13 disposal); signal words "danger" (more severe) and
  "warning".
- 49 CFR 172.704, https://www.ecfr.gov/current/title-49/section-172.704: hazmat training within
  90 days of hire, recurrent at least every three years.
- 49 CFR 177.834, https://www.ecfr.gov/current/title-49/section-177.834: hazmat packages secured
  against shifting in the vehicle.

## Comfort, air quality and building (government pages)
- EPA, "A Brief Guide to Mold, Moisture and Your Home",
  https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home (fetched 2026-11-18): keep
  indoor humidity below 60 percent, ideally 30 to 50 percent.
- EPA, "Improving Indoor Air Quality",
  https://www.epa.gov/indoor-air-quality-iaq/improving-indoor-air-quality (fetched 2026-11-18):
  three strategies, source control, improved ventilation and air cleaners; source control
  usually the most effective.
- EPA, "What is a MERV rating?", https://www.epa.gov/indoor-air-quality-iaq/what-merv-rating
  (fetched 2026-11-18): MERV reports a filter's ability to capture particles of 0.3 to 10
  microns; higher MERV traps more.
- EIA, "British thermal units", https://www.eia.gov/energyexplained/units-and-calculators/british-thermal-units.php
  (fetched 2026-11-18): one Btu raises one pound of water by 1 F.
- ENERGY STAR, "Duct Sealing", https://www.energystar.gov/saveathome/heating-cooling/duct-sealing
  (fetched 2026-11-18): 20 to 30 percent of duct air lost in a typical house; seal with mastic or
  metal tape, never duct tape; insulate ducts in attics, crawlspaces and garages.
- ENERGY STAR, "Recommended Home Insulation R-Values",
  https://www.energystar.gov/saveathome/seal_insulate/identify-problems-you-want-fix/diy-checks-inspections/insulation-r-values
  (fetched 2026-11-18): R-value is resistance to heat flow; higher is better; IECC climate zones.
- ENERGY STAR, "Attic Air Sealing Project",
  https://www.energystar.gov/saveathome/seal_insulate/attic-air-sealing-project (fetched
  2026-11-18): leaks at kneewalls, attic hatch, wiring and plumbing holes, dropped soffits,
  recessed lights, flue and duct chases; aluminum flashing to keep insulation off flue pipes;
  high-temperature caulk at flues and chimneys; walk on joists or truss chords; vermiculite may
  contain asbestos; sealing can cause natural-draft appliances to back-draft.
- ENERGY STAR, "Windows, Doors and Skylights: What makes it ENERGY STAR?",
  https://www.energystar.gov/products/residential_windows_doors_and_skylights/key_product_criteria
  (fetched 2026-11-18): ratings by the National Fenestration Rating Council; criteria vary by
  climate zone; frame materials.
- ACCA, "Technical Manuals", https://www.acca.org/standards/technical-manuals (fetched
  2026-11-18): Manual J residential load calculation, Manual S equipment selection, Manual D
  duct design, Manual T air distribution, Manual P psychrometrics, Manual RS systems overview.

## Equipment and meters (manufacturers)
- Copeland, Application Engineering Bulletin AE4-1331 R9 (September 2024),
  https://apps.copeland.com/Publications/AEB/AE4_1331_R9.pdf (fetched 2026-11-18): three-phase
  scrolls rotate either way with phasing; proper rotation shown by suction falling and discharge
  rising; single-phase always starts the right way; LRA six or more times running amps for 100
  to 300 ms; motors run within plus or minus 10 percent of nameplate (200-230 V gives 180 to
  253 V); overloads react to current and winding temperature; replace the run capacitor with a
  single-phase compressor; never evacuate with the compressor; nitrogen flow while brazing
  prevents copper oxide flakes that block screens.
- Fluke, "How to measure capacitance",
  https://www.fluke.com/en-us/learn/blog/digital-multimeters/how-to-measure-capacitance
  (fetched 2026-11-18): turn power off, confirm with the meter, then discharge the capacitor
  through a resistor before measuring.

## Physics and arithmetic (recomputed in build.py)
Ohm's law, series and parallel resistance, power (P = E x I, P = I squared x R), transformer
ratios, RMS and peak (peak = RMS x 1.414), power factor, sensible heat (1.08 x CFM x delta T,
from 0.075 lb/ft3 x 60 min x 0.24 Btu/lb F), tons (12,000 Btu/h), temperature conversion,
absolute pressure (gauge + 14.7), Boyle's and Charles's laws, areas, volumes, right triangles,
percentages and interpolation. Every computed key is asserted in `build.py`.

## Not confirmed or left out
- NATE publishes no cut score: the copy says pass/fail and uses 70% as Tigertest's readiness
  line. No fees, prices or test-centre details go in the bank.
- ICC code pages (codes.iccsafe.org) returned 403, and DOE Energy Saver pages returned 404 on
  2026-11-18, so no code section numbers or DOE figures are asked. Construction items use
  ENERGY STAR's pages and general framing terms only.
- NFPA standards were not read (paywalled); no NFPA clause is asked.
- EPA Section 608 refrigerant rules are left to the `epa608` and `r410a` banks.
