# Sources: HVAC journeyman mechanical license exam, `hvacjourney`

Every question in `data/hvac-journeyman-questions.json` is original, written by Tigertest from the
code text below. No question was copied or reworded from an official sample, a past paper, a prep
book or a commercial practice test. No code text is reproduced beyond short phrases.

## The code (primary source, read in full where used)

ICC Digital Codes free public-access view, read in a real browser (the site renders its text
with JavaScript and returns 403 to plain fetches). All read 2026-11-19.

- 2024 International Mechanical Code, Chapter 3 General Regulations:
  https://codes.iccsafe.org/content/IMC2024V1.0/chapter-3-general-regulations (fetched 2026-11-19).
  Used 301 to 309 and 312: listing, NSF 14, fuel conversion, flood and coastal zones, trusses,
  prohibited locations (303.3), pits (303.7), elevator shafts, 18-inch ignition source rule and
  FVIR exception (304.3), garages (304.6, 304.7), clearances and doorstops (304.9), slab 3 in /
  suspended 6 in (304.10), roof-edge guards 10 ft / 42 in / 21 in sphere / Z359.1 (304.11), area
  served marking (304.12), pipe support Table 305.4, access and service space (306.1 to 306.5),
  condensate (307), clearance reduction Table 308.4.2 and 308.3, 308.4.2.1, 68°F at 3 ft (309.1),
  ASHRAE/ACCA 183 (312.1).
- 2024 IMC Chapter 4 Ventilation:
  https://codes.iccsafe.org/content/IMC2024V1.0/chapter-4-ventilation (fetched 2026-11-19).
  Used 401.4, Table 401.5, 402.2, 402.3, Equation 4-9 (Q = 0.03 A + 7.5 (N + 1)), 403.3.2.1 (1 hour
  in 4), 403.3.2.2 (0.06 cfm/sq ft corridors), Table 403.3.2.3, 404.1 (0.75 / 0.05 cfm/sq ft).
- 2024 IMC Chapter 5 Exhaust Systems:
  https://codes.iccsafe.org/content/IMC2024V1.0/chapter-5-exhaust-systems (fetched 2026-11-19).
  Used 501.3.1 (environmental exhaust 3 ft / 10 ft from mechanical intakes), 504 (dryer: 3 ft
  termination, 4 in duct, 35 ft and Table 504.9.4.1, 8 ft transition, 1/8 in screws, 4 ft supports,
  6 ft label, 100 sq in closet, 200 cfm makeup), 505.4 (400 cfm hood makeup air), 506.3.1,
  506.3.7, 507.1.6.1 (6 in overhang), 507.2.6 (18 in Type I clearance).
- 2024 IMC Chapter 6 Duct Systems:
  https://codes.iccsafe.org/content/IMC2024V1.0/chapter-6-duct-systems (fetched 2026-11-19).
  Used 601.2, 601.5 return air rules, 602.1, 602.2, 603.4 to 603.8, 603.18.1, 604.2, 604.7,
  606.2.1 (2,000 cfm smoke detectors).
- 2024 IMC Chapter 8 Chimneys and Vents:
  https://codes.iccsafe.org/content/IMC2024V1.0/chapter-8-chimneys-and-vents (fetched 2026-11-19).
  Used 801.12, 801.13, 802.5, 802.6, 802.9, 803.6, 803.8, 803.10.2 (75 percent), 803.10.3,
  803.10.5, 804.3.3 to 804.3.5.
- 2024 IMC Chapter 10 Boilers, Water Heaters and Pressure Vessels:
  https://codes.iccsafe.org/content/IMC2024V1.0/chapter-10-boilers-water-heaters-and-pressure-vessels
  (fetched 2026-11-19). Used 1004.3 (18 in), Table 1004.3.1, 1004.6, 1005.1, 1006.4 to 1006.6,
  1007, 1008.1 (100 psig), 1009 (Table 1009.2, 30 psi ASME, open tank 4 ft), 1010.2.1, 1011.2.
- 2024 IMC Chapter 11 Refrigeration:
  https://codes.iccsafe.org/content/IMC2024V1.0/chapter-11-refrigeration (fetched 2026-11-19).
  Used 1101.7, 1101.9, 1104.2 (6.6 lb), 1105.7 (15 ft / 20 ft), 1108.3.1 (five volume changes),
  1108.3.3 (200 psi), 1109.2.1 to 1109.2.7, 1110.3.1, 1110.7 (55 lb).
- 2024 IMC Chapter 12 Hydronic Piping:
  https://codes.iccsafe.org/content/IMC2024V1.0/chapter-12-hydronic-piping (fetched 2026-11-19).
  Used 1203.9.2 (18 in), 1208.1 (1.5 times, 100 psi, 15 minutes), 1209.2, Table 1209.6.1.
- 2024 International Fuel Gas Code Chapter 3 General Regulations:
  https://codes.iccsafe.org/content/IFGC2024V1.0/chapter-3-general-regulations (fetched 2026-11-19).
  Used 304.5 to 304.11 (combustion air volumes and openings), 310.2 (CSST bonding 6 AWG, 75 ft).
- 2024 IFGC Chapter 4 Gas Piping Installations (current printing, IFGC2024P1):
  https://codes.iccsafe.org/content/IFGC2024P1/chapter-4-gas-piping-installations (fetched 2026-11-19).
  Used 404.9, 404.12, 404.12.1, 406.2, 406.4.1, 406.4.2, 408.4, 409.5.1.
- 2024 IFGC Chapter 5 Chimneys and Vents:
  https://codes.iccsafe.org/content/IFGC2024P1/chapter-5-chimneys-and-vents (fetched 2026-11-19).
  Used 503.5.4, 503.6.5, 503.6.6, 503.10.9, 503.12.7, 503.6.10.1 Item 3.

The IMC chapters were read at IMC2024V1.0, which ICC labels a historical version of the 2024
title (a later printing exists). The sections used are the same requirements the IFGC2024P1
printing shows where the codes overlap (combustion air, vent terminations); a reprint correction
to one of these numbers would be caught by the yearly review.

## Exam format (official candidate bulletin)

- Maryland Department of Labor, State Board of HVACR Contractors, PSI "HVACR Contractors
  Qualification Information Bulletin", updated 9/1/2024:
  https://dllr.state.md.us/LICENSE/hvacr/hvacrcandidateinfobulletin.pdf (fetched 2026-11-19).
  HVACR Journeyman: 100 questions, 70% to pass, 240 minutes, open book; outline: electrical 20,
  piping 15, refrigeration and air conditioning 25, heating systems 20, air distribution 15,
  safety 5; references include the International Mechanical Code (2012 edition for the
  journeyman exam), Modern Refrigeration and Air Conditioning, ACCA Manual J, 29 CFR 1926.
  Used only for the landing and facts, as one state's example. There is no national journeyman
  mechanical exam: question count, time, pass mark and code edition vary by state and city, and
  the copy says so.

## What the bank covers and leaves out

- Code knowledge only: the IMC chapters above and the IFGC combustion air, bonding, piping test
  and venting rules a journeyman mechanical exam leans on. Electrical theory, refrigeration
  theory, Manual J load math and OSHA safety (other parts of state outlines) are not modelled;
  the landing says so.
- Kept clear of the `epa608` (refrigerant handling law), `r410a`, `natecore` and `jelec` banks: no
  recovery, reclaim or venting-rule items, no refrigerant property items, no NEC items.
- No fees, licensing hours or state rules. Many states adopt an older IMC (2018 or 2021) or amend
  it; the landing tells candidates to check the edition their exam uses.
