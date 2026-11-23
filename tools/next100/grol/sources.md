# FCC GROL (Elements 1 and 3) bank sources

All 200 questions are original, written for Tigertest from 47 CFR Parts 13, 80 and 87, the FAA
Aeronautical Information Manual and standard electronics, all listed below. None is copied,
adapted or reworded from the FCC Commercial Element 1 or Element 3 question pools, any COLEM's
exam, past paper, prep book, app or website. The pools are public-domain government works, but
they were used only to see which topics each element covers (see "Copyright check" below).
The FCC amateur pools on the site (data/ham-questions.json, ham-general, ham-extra), the NZ and
Canada amateur banks and the journeyman and Red Seal electrician banks were checked so no
fact-and-answer pair or worked number repeats.

## License, elements and format

- FCC, Types of Commercial Radio Operator Licenses, fetched 2026-11-23:
  https://www.fcc.gov/types-licenses
  General Radiotelephone Operator License (PG): needed to adjust, maintain or internally repair
  FCC-licensed radiotelephone transmitters in the aviation, maritime and international fixed
  public services; also to operate compulsory ship radiotelephones above 1500 W PEP and voluntary
  ship and aircraft stations above 1000 W PEP. Issued for the holder's lifetime. Requires Written
  Elements 1 and 3. Element 1: basic radio law and operating practice, at least 18 of 24 correct.
  Element 3: general radiotelephone, at least 75 of 100 correct, from operating procedures, radio
  wave propagation, radio practice, electrical principles, circuit components, practical circuits,
  signals and emissions, antennas and feed lines. Exams are given by COLEMs; applicants file FCC
  Form 605 in ULS with their Proof of Passing Certificates.
- FCC, Commercial Radio Operator License Program, examination elements page, fetched 2026-11-23:
  https://www.fcc.gov/node/182085
  Same element list and pass marks; notes the FCC may change question counts by public notice.
- eCFR, 47 CFR Part 13 (Commercial Radio Operators), current to 2026-11-18, fetched 2026-11-23:
  https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-13
  13.7 license classes; 13.9 eligibility (legally eligible for employment, English by voice);
  13.19 operator's responsibility (maintenance entries, posting the license); 13.201 Elements 1
  and 3 for the PG; 13.203 element subject matter.
- FCC Public Notice DA 09-1417, released 2009-06-25, fetched 2026-11-23:
  https://docs.fcc.gov/public/attachments/DA-09-1417A1.pdf
  The Wireless Telecommunications Bureau approved the current Element 1, 3 and 8 pools; old pools
  could be used for six months after. No later Element 1 or 3 pool notice was found (searches of
  fcc.gov and docs.fcc.gov on 2026-11-23 found only the 2021 Element 7 notice), so the 2009 pools
  are the ones in force.

## Topic outline (pools used only for topic coverage)

- FCC Commercial Element 1 Question Pool (approved 25 June 2009), fetched 2026-11-23:
  https://www.fcc.gov/file/11789/download (also https://fcc.gov/file/3798/download, Word)
  Four subelements of six key topics, one question per key topic on a 24-question exam:
  A Rules and Regulations, B Communications Procedures, C Equipment Operations, D Other Equipment.
- FCC Commercial Element 3 Question Pool (approved 25 June 2009), fetched 2026-11-23:
  https://www.fcc.gov/file/11790/download
  Seventeen subelements, one question per key topic on a 100-question exam: A Principles 8,
  B Electrical Math 10, C Components 10, D Circuits 4, E Digital Logic 8, F Receivers 10,
  G Transmitters 6, H Modulation 3, I Power Sources 3, J Antennas 5, K Aircraft 6, L Installation,
  Maintenance and Repair 8, M Communications Technology 3, N Marine 5, O RADAR 5, P Satellite 4,
  Q Safety 2.

## Law and technical sources for the questions

- eCFR, 47 CFR Part 80 (Maritime services), current to 2026-11-18, fetched 2026-11-23:
  https://www.ecfr.gov/current/title-47/chapter-I/subchapter-D/part-80
  80.71, 80.89, 80.92, 80.101 (test procedure), 80.143, 80.148, 80.159 (operator class by power),
  80.215 (power limits), 80.302 to 80.305, 80.309, 80.310 (channel 9 for noncommercial vessels),
  80.311 to 80.317 (distress), 80.327 (urgency), 80.329 (safety), 80.331 (bridge-to-bridge),
  80.335 (cancelling false alerts), 80.409 (logs), 80.917 to 80.925 (power supply), 80.1013,
  80.1023, 80.1069 (sea areas), 80.1083 to 80.1091 (GMDSS equipment), 80.1123 (watches), the
  GMDSS frequency table (NAVTEX 518 kHz, warnings 490 and 4209.5 kHz, SART 9200 to 9500 MHz) and
  the MMSI definition.
- eCFR, 47 CFR Part 87 (Aviation services), current to 2026-11-18, fetched 2026-11-23:
  https://www.ecfr.gov/current/title-47/chapter-I/subchapter-D/part-87
  87.87 and 87.89 operator licenses; 87.195 (no new 121.5 MHz-only ELTs from July 10, 2019);
  87.197 (ELT tests into a dummy load).
- FAA, Aeronautical Information Manual, Chapter 1 Section 1 (navigation aids), fetched 2026-11-23:
  https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap1_section_1.html
  NDB 190 to 535 kHz with 400 or 1020 Hz tones; VOR 108.0 to 117.95 MHz; localizer 108.10 to
  111.95 MHz; glide slope 329.15 to 335.00 MHz; DME paired-pulse timing.
- FAA, Aeronautical Information Manual, Chapter 4 Section 1 (transponder operation), fetched
  2026-11-23: https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_1.html
  Avoiding 7500, 7600 and 7700 when changing codes.
- eCFR, 47 CFR 1.1310 (RF radiation exposure limits), checked 2026-11-23:
  https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-1/subpart-I/section-1.1310
  Cited only for the existence of maximum permissible exposure limits; no limit values are asked.
- NIST, SI units (Special Publication 330), checked 2026-11-23:
  https://www.nist.gov/pml/special-publication-330
  Units and prefixes for the electrical math.

Electronics principles, components, receivers, transmitters, antennas, radar timing (about 12.36
microseconds per nautical mile round trip) and digital logic are standard physics and
engineering; every calculation is computed in the source file and checked by build.py (the
key's number must match the computed value within 1% and appear in the explanation, and no
distractor may equal it).

## Modelling decision: two elements in one bank

Tigertest's v1 engine gives every practice test the same length, so the two elements share one
bank and one test format: four 50-question tests, 10 Element 1 items and 40 Element 3 items each,
about the real 24 to 100 ratio. Both elements pass at 75% (18 of 24, 75 of 100), so the test pass
mark is 75%. Element 1 is its own training set, so a candidate can drill it alone; Element 3 is
split into four sets in the pool's subelement order. The Element 3 per-test counts follow the
pool's subelement weights scaled to 40: principles 3, math 4, components and circuits 6, digital
3, receivers 4, transmitters and modulation 4, power sources and antennas 3, aircraft 2,
installation, maintenance and safety 4, communications technology, marine and satellite 4,
radar 3. Element 1 per test: rules 3, communications procedures 3, equipment 4.

## Copyright check

`tools/next100/grol/similarity.py` parses both official pools (743 items) and compares every
bank item with every pool item: difflib stem ratio, content-word Jaccard and shared options.
First run (2026-11-23) flagged 40 items; every real match (same fact with close wording, the
same key with shared options, or the same worked numbers such as a 62 microsecond radar echo
and a 5 kHz / 3 kHz Carson's rule) was rewritten with a different angle, numbers and
distractors. A second pass listed every bank item whose key equals a pool key with two or more
shared stem words; those were rewritten too (three-year distress logs, the radar echo). The
remaining flags are short "What is a ...?" stems on unrelated subjects, or standard term sets
(logic gate names, power terms) with a different question and key. The same comparison was run
against the site's amateur and electrician banks; 26 repeats were rewritten.

## Left out

Fees, penalties, COLEM names and exam logistics (they are on the landing, never in questions);
figure-dependent items; RF exposure limit values; Element 8 (ship radar endorsement), Elements 7
and 9 (GMDSS).

## Second review (2026-11-23)

Blind review of all 200 items, every number recomputed: no wrong key. Law items checked
against the eCFR text of Parts 80 and 87 (current to 2026-11-18): 80.101(a)(3), 80.159(c),
80.310, 80.312, 80.327(f), 80.331, 80.335, 80.919, 80.1023, 80.1083(b) and (e), 87.195, 87.197.
Seven items changed: AIR-006 (key said the rules require 406 MHz ELTs; 87.195 only bars making
and selling new 121.5 MHz-only units), RCV-013 and RCV-016 (same fact and close wording as pool
items 3-41F5 and 3-42F2; rewritten as a noise-figure cascade and an LO-isolation item), MNT-016
and MAR-016 (weak distractors; replaced with rosin flux and 80.1083(b)(4) lighting), E1R-003
and RCV-015 (key much longer than the other options; shortened). similarity.py re-run against
both pools: 19 flags, all short stems on unrelated subjects.
