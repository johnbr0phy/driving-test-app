# Sources for `osha30` (OSHA 30-hour Construction Outreach course final)

All 200 questions are original, written by Tigertest from OSHA's Outreach Training Program topic
list for the 30-hour Construction class and the text of 29 CFR 1926, 1904 and 1910 as published
on osha.gov. No authorized trainer's or online provider's course exam, quiz, practice test or
commercial question was copied or reworded, and no training provider is named. The OSHA 10 bank
(`data/osha-questions.json`) was read item by item before writing, and no fact-and-answer pair
from it is repeated: where OSHA 10 asks the basic rule (6-foot trigger, 42-inch top rail, 4:1
scaffold ties, 5-foot trench, 811, silica PEL), this bank asks the next layer of the same subpart
(controlled access zones, net extents, tie intervals, soil classes, action levels). A
fact-and-answer scan against every v1 bank on disk (`osha`, `forklift`, `natecore`, `cscs`,
`auwhite`, `iesafepass` and the rest) was run on 2026-11-22. Checked 2026-11-22.

## Decision: one Construction bank

OSHA runs two 30-hour Outreach classes, Construction and General Industry, with different topic
lists. This bank covers **Construction**, the class most people search for and the one many state
laws, unions and contractors name (OSHA FAQ: some states, municipalities, employers and unions
mandate the training). General Industry topics that overlap (introduction to OSHA, managing safety
and health, electrical, PPE, hazard communication, fall protection, confined spaces, welding) are
covered through their construction rules; general-industry-only topics (machine guarding, exit
routes and emergency action plans, bloodborne pathogens in depth) are not modelled, and the landing
says so. A separate General Industry bank could follow later.

## Outreach program, topics and format (official)
- OSHA, "Outreach Training Program Construction Industry Procedures", revised July 1, 2024,
  https://www.osha.gov/sites/default/files/OTP_Construction_Procedures_2024.pdf (fetched
  2026-11-22). Gave: the 30-hour class is for workers with some safety responsibility, at least
  30 hours, emphasising hazard identification, avoidance, control and prevention. Required 14
  hours: Introduction to OSHA (1 hour), Managing Safety and Health (2), Focus Four Hazards (6,
  falls at least 1 hour 30 minutes, electrocution, struck-by, caught-in or between), PPE (2),
  Health Hazards in Construction (2), Stairways and Ladders (1). Elective 12 hours, at least six
  of: concrete and masonry, permit-required confined spaces, cranes, derricks, hoists, elevators
  and conveyors, ergonomics, excavations, fire protection and prevention, materials handling,
  storage, use and disposal, motor vehicles and mechanized equipment with ROPS and signs, signals
  and barricades, powered industrial vehicles, safety and health programs, scaffolds, steel
  erection, hand and power tools, welding and cutting, Foundations for Safety Leadership. Optional
  4 hours. CPR and first aid do not count. The bank's ten categories follow this list.
- OSHA, "Outreach Training Program General Industry Procedures", revised 2024,
  https://www.osha.gov/sites/default/files/OTP_General_Industry_Procedures_2024.pdf (fetched
  2026-11-22). Gave the 30-hour General Industry list for the landing: required 12 hours
  (introduction 1, managing safety and health 2, walking-working surfaces 1, exit routes and fire
  protection 2, electrical 2, PPE 1, materials handling 2, hazard communication 1), elective 10
  hours (at least five topics), optional 8.
- OSHA, "Outreach Training Program Requirements" (2024), university-hosted copy of the OSHA
  document, https://oshce.uw.edu/sites/default/files/documents/osha/OTP_Requirements_2024.pdf
  (fetched 2026-11-22). Gave: at most 7.5 student contact hours a day, so a 30-hour class takes at
  least four days; testing and breaks are not contact hours; a 10-hour student can receive a
  30-hour card after 20 more hours with the same trainer within 180 days; only OSHA-authorized
  online providers may run asynchronous classes.
- OSHA, "Outreach Training Program Frequently Asked Questions",
  https://www.osha.gov/training/outreach/faq (fetched 2026-11-22). Gave: "testing is not a
  requirement for Outreach classes"; trainers may give a test at their discretion; the card is not
  a certification or license; the program is voluntary but some states, municipalities, employers
  and unions require it; replacement cards only within five years of the class. Online classes are
  run by independent providers. There is no single official final exam, so the 70% line used here
  is Tigertest's readiness target and the landing says the provider sets the real one.

## Standards (29 CFR, osha.gov regulation pages, all fetched 2026-11-22)
- Part 1926 Subpart C and definitions: https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.20
  (frequent and regular inspections by competent persons), 1926.21 (instruction in recognizing
  unsafe conditions), https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.32
  (competent person, qualified).
- Subpart M fall protection: 1926.500 (low-slope roof 4 in 12), 1926.501 (safety monitor alone on
  roofs 50 feet or less wide; steep roofs need guardrails with toeboards),
  https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.502 (midrail 150 lb,
  balusters 19 in, banding, net mesh, 400-lb drop test, net extent table, weekly net inspection,
  snaphook proof test 3,600 lb, SRL 3,000 lb, horizontal lifelines, positioning 3,000 lb, warning
  lines 34 to 39 in and 6/10 ft, CAZ 6 to 25 ft and 10 to 15 ft, safety monitor duties, covers
  marked HOLE or COVER, fall protection plan, prompt rescue), 1926.503 (certification record).
- Subpart X stairways and ladders: 1926.1051 (19 in, 25 employees), 1926.1052 (30 to 50
  degrees, 1/4 in, handrails 30 to 37 in), 1926.1053 (rungs 10 to 14 in, 11 1/2 in, opaque
  coatings, ladders tied together).
- Subpart L scaffolds: https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.451
  (1-in gaps, 14 in from work, 12-in overlaps, access over 2 ft, hook-on ladders 24 in and rest
  platforms 35 ft, ties 26 and 30 ft, power line table, counterweights, 6x suspension ropes,
  competent person supervision, 38 to 45 in toprails, cross bracing 38 to 48 in, high winds,
  makeshift devices, 1/60 deflection, front-end loaders), 1926.452(w) (2:1 to ride), 1926.454
  (training by a qualified person).
- Subpart K electrical: 1926.403 (approved equipment, marked disconnects), 1926.405 (temporary
  lights, removal of temporary wiring, cord splices, strain relief), 1926.416 (insulated gloves,
  ascertain circuits), 1926.417 (tags). Cranes and power lines: 1926.1408 (20 feet, Table A,
  planning meeting, dedicated spotter).
- Subpart P excavations: 1926.651 (24-hour utility rule, exact location, atmosphere testing over 4
  ft, water monitoring, warning systems, walkways 6 ft, footings), 1926.652 (shields), Appendix A
  https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926SubpartPAppA (soil types,
  fissured, thumb and plasticity tests) and Appendix B (Table B-1 slopes, short-term 1/2:1).
- Subparts H, G, N, O and CC: 1926.250 (floor loads, bags, brick, block, lumber, setbacks),
  1926.251 (markings, U-bolt clips, knots, web sling removal), 1926.252 (chutes, barricades),
  1926.200 (danger signs), 1926.601 (dump bodies, shift checks), 1926.1402 (ground conditions),
  1926.1412 (annual inspection), 1926.1417(y) (stop signal).
- Subparts Q and R: 1926.701, 1926.702, 1926.703, 1926.706 (limited access zone), 1926.752 (75
  percent), 1926.753(e) (five members), 1926.754 (shear connectors), 1926.755 (4 anchor rods),
  1926.760 (15 ft, connectors 30 ft, CDZ 90 by 90).
- Health: 1926.1153 (silica action level 25, 30 days, housekeeping, written plan, Table 1),
  1926.62 (lead action level 30, removal at 50), 1926.1101 (asbestos 0.1 and 1.0 f/cc), 1926.52
  Table D-2 and 1926.101 (noise), 1926.1126 (chromium VI 5), 1926.59 with 1910.1200(f)(6)
  (workplace labels), 1926.1202, 1926.1203(h), 1926.1205(b), 1926.1211(c) (confined spaces).
- PPE: 1926.102(a)(3), 1926.106, 1910.134 (voluntary use, seal checks, APF table, change
  schedules, IDLH, administrator, fit tests), 1910.137 (insulating glove classes and test
  intervals).
- Fire, welding and tools: 1926.150, 1926.152, 1926.350, 1926.351, 1926.352, 1926.300(b)(5),
  1926.302.
- Recordkeeping: https://www.osha.gov/laws-regs/regulations/standardnumber/1904/1904.7 (first aid
  list, 180-day cap), 1904.10 (hearing loss), 1904.29 (7 days, privacy cases), 1904.32
  (executive certification), 1904.35 (no retaliation).

## Program pages (osha.gov, fetched 2026-11-22)
- OSHA, "Multi-Employer Citation Policy", CPL 02-00-124 (December 10, 1999),
  https://www.osha.gov/enforcement/directives/cpl-02-00-124: creating, exposing, correcting and
  controlling employers, with the guardrail contractor example.
- OSHA, "Recommended Practices for Safety and Health Programs" core elements,
  https://www.osha.gov/safety-management (construction version linked from the page).
- OSHA, "On-Site Consultation", https://www.osha.gov/consultation: no cost, confidential,
  separate from enforcement, for small and medium-sized businesses.
- OSHA, "Voluntary Protection Programs", https://www.osha.gov/vpp: recognizes employers and workers
  with strong programs and low injury rates.
- OSHA, "Heat", https://www.osha.gov/heat-exposure: heat stroke is a medical emergency needing
  immediate attention.

## Left out on purpose
- Penalty amounts, citation counts and any figure OSHA indexes for inflation.
- OSHA's proposed heat injury and illness prevention rule (not final as of 2026-11-22).
- Crane wire rope removal criteria, welding filter shade tables and hard hat ANSI classes (from
  consensus standards OSHA incorporates by reference, not read here).
- Anything about the course test itself (length, pass mark, attempts): providers set those, and
  they belong on the landing, not in the bank.
