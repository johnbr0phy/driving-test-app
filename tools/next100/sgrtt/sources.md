# Sources for `sgrtt` (Singapore Riding Theory Test, class 2B motorcycle)

All 200 questions are original. They were written from the rule text of the Traffic Police Riding
Theory Booklet and do not copy any official practice set (the police online practice test was not
opened) or any commercial app. Diagrams are described in words. Web search for this builder ran out
of budget at the start of the session, so every fact below comes from the two official pages and
the handbook PDF fetched directly.

## Primary source (checked 2026-11-05)
- Singapore Traffic Police, "Riding Theory Booklet, Official Handbook", "Published online by
  Singapore Traffic Police ... Published on 2.1.2026", 102 pages. Served at
  https://www.police.gov.sg/-/media/SPF/Advisories/TP/RT-ENG-2126.pdf, linked as the English Riding
  Theory handbook from
  https://www.police.gov.sg/Knowledge-Hub/Traffic/Traffic-Matters/Online-Learning-Portal (checked
  2026-11-05; Mandarin, Malay and Tamil versions are RTTCN24, RTTMY24 and RTTTM24 on the same page).
  Chapters used: Introduction (licence classes, probation); Human Senses and Judgement; Basic Structure
  of Motorcycle and Vehicle Maintenance; Pre-riding Checks; Proper Handling of Controls; Handling of
  Motorcycle; Speed Changing Operations; Riding Skill; Riding under Various Road Conditions (incl.
  expressways); Defensive Riding; General Knowledge (insurance, pillion, heavy vehicles,
  malfunctions, bus lane, fire, accidents); Circuit Courses (technique only); Courteous Riding
  (incl. the mobile device rule).
- Handbook para 7(b): after passing the BTT you must pass the RTT before the Practical Riding Test;
  the RTT tests "riding safety and proper techniques of riding, as well as your interaction with
  other road users"; after passing it you must pass the Practical Riding Test within one year or
  retake the RTT (landing copy only, never a question).
- Handbook para 3: Class 2B (petrol below 200 cc, electric below 15 kW) needs the BTT, RTT and Class
  2B practical test; Class 2A (200 to 400 cc, 15 to 25 kW) needs Class 2B held for at least one year;
  Class 2 (above 400 cc, above 25 kW) needs Class 2A held for at least one year.
- Handbook paras 4 and 5: new licence holders are on probation for one year and a class 2B rider
  displays the Probation Plate above or below the headlamp and above or below the rear plate.

## Test format
- The Traffic Police Online Learning Portal and the e-services page "Practise Driving and Riding
  Theory Test" (https://www.police.gov.sg/E-Services/Practise-Driving-and-Riding-Theory-Test, checked
  2026-11-05) give no RTT question count, time or pass mark. The practice page says practice sets are
  free, available 24/7, in English, Malay, Mandarin and Tamil (RTT_EN, RTT_MS, RTT_ZH, RTT_TA), and
  estimates "20 mins per set" for practice.
- 50 questions with 45 to pass (90%) is a Tigertest target, the same format guides quote for the BTT
  and FTT (see `tools/countries/sgbtt/sources.md` and `tools/next100/sgftt/sources.md`). It was NOT
  confirmed for the RTT: the web search budget was used up again on 2026-11-05, and the Traffic
  Police practice page (re-read 2026-11-05) gives no count, time or pass mark. RTT time limit:
  not stated on any official page read, so it is left out everywhere. Languages of the real test:
  not stated officially; only the practice set and handbook languages are claimed. The landing, FAQ and examFacts say the
  Traffic Police do not publish the format and label the 45 of 50 line as Tigertest's.
- Booking: the SSDC help page "How do I book the Traffic Police Theory Tests (BTT, FTT and RTT)
  online?" (https://help.ssdcl.com.sg/portal/en/kb/articles/how-do-i-book-the-traffic-police-theory-tests-btt-ftt-and-rtt-online,
  checked 2026-11-05) confirms the RTT is booked through the SSDC student portal and held at its
  Level 1. It does not name the other centres; BBDC (bot check) and CDC (403) could not be read on
  2026-11-05, so the examFacts "Run by" row says only "booked through your driving centre", not
  "the three driving centres".
- The Traffic Police publish no per-topic counts. The blueprint (7/8/8/8/7/7/5 per 50) follows the
  handbook's chapters, weighted by length: rider fitness, gear and posture 14%; motorcycle parts,
  checks and handling 16%; controls, gears and braking 16%; moving off, turns and junctions 16%;
  bends, slopes, weather and expressways 14%; defensive riding 14%; pillions, malfunctions,
  accidents and courtesy 10%.

## Numbers used (all from the 2.1.2026 handbook)
- Tread depth below 1.6 mm (paras 28, 42, 65); chain slack about 20 mm (42, 70); brake lever and
  pedal free play 15 to 20 mm (42, 71); clutch lever free play 10 to 20 mm (42, 72).
- Mirrors: tip of the shoulder at the lower edge, not adjusted on the main stand (73).
- Gears: 1st 0 to 20 km/h and 2nd 15 to 35 km/h (80, 93; the two tables disagree on 3rd to 5th, so
  those ranges are not asked); change up at about 3,000 to 4,000 rpm (97); move off at 2,000 to
  3,000 rpm (112, 281). Engine braking downhill: 3rd gradual, 2nd steep, 1st with the foot brake on
  a short steep slope (102); 3rd or 2nd on a low slope, 2nd or 1st on a steep slope (175).
- Stop about a motorcycle length behind a stationary vehicle (116). Signal at least 3 seconds
  (134, 144, 289). Six-second rule for large vehicles, tailgaters, adverse conditions, heavy loads
  and fatigue (125). Average reaction 3/4 of a second (127). Turning out of a minor road: traffic
  from the right more than 6 seconds away, from the left 8 seconds (131, 137). Pedestrian about 5 m
  clear of your path before turning (223). Easing off past side roads saves 8 to 10 m of reaction
  distance (251). Stop one vehicle length short of road works if you must give way (211).
- Pillion: no child below 10 years (256). Expressways: motorcycles with side-cars and motorcycles
  propelled by electric motors are prohibited (188); breakdown triangle 20 m or more behind,
  rider and pillion behind the guardrails (195).
- Mobile device offence: one hand holding, any function used, vehicle in motion (300).

## Deliberately avoided
- Everything the BTT and FTT banks already ask with the same fact and answer (headlight hours, who
  must ride with headlights on by day, road hogging, flashing amber, amber "may proceed", missed turns, the
  lights facing you at complex junctions, shared lanes, U-turn signs, roundabout signals, the
  three-second rule, zig-zag lines, exhaust smoke, passing stationary vehicles, the horn rule).
- The alcohol figures (para 16 still prints 80 mg per 100 ml of blood and 35 ug per 100 ml of
  breath; the 2026 Act changes them), demerit points, fines and penalties (paras 6, 43, 194,
  284-285, 300), the practical test procedure and the circuit course timings (paras 7(c), 271-282),
  appeals (287) and the KPE speed limit.
- The handbook's conflicting following-distance rules (two-, three-, four- and six-second rules in
  paras 124, 125, 234, 241, 243, 254) except the six-second rule, which para 125 states as current
  ("previously 4 seconds"); and the conflicting aquaplaning responses (para 29 "do not brake" vs
  para 185 intermittent braking), so only the warning sign is asked.
- The wet-road timings (para 29 says 20-30 minutes, para 200 says 10 and 15 minutes).

## Fact-check pass (2026-11-05)
Handbook re-downloaded from https://www.police.gov.sg/-/media/SPF/Advisories/TP/RT-ENG-2126.pdf on
2026-11-05 and the law-based questions re-checked against it (the Singapore Statutes Online pages
for the Road Traffic Rules returned 403, so the Act and Rules themselves could not be read):
- Para 47: under the RTA every motorcyclist and pillion rider wears an approved helmet (turbaned Sikh
  men exempt); an unfastened helmet is illegal (RDR-014, RDR-015). Confirmed.
- Paras 3-5: licence classes 2B/2A/2, one-year probation, Probation Plate by headlamp and rear plate
  (RDR-025 to RDR-028). Confirmed.
- Para 188: motorcycles with side-cars and motorcycles propelled by electric motors are on the
  expressway prohibited list (CND-026, which names the handbook as its source). Confirmed in the
  handbook; not checked against the Expressways (Prohibition of Use) Rules.
- Para 255: third-party insurance (GEN-006). Para 256: no pillion below 10 (GEN-001). Para 300:
  mobile device offence, hands-free acceptable if not held (GEN-017). Confirmed.
- Para 267: bus lane during restricted hours only to avoid a collision. GEN-013 was reworded so it no
  longer says "only": other LTA rules (such as entering to turn left) could not be checked, so the
  question now asks which listed reason lets a rider in, with the same key.
