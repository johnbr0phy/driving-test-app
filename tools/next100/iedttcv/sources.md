# Ireland Driver Theory Test, truck and bus (iedttcv) sources

Checked November 5, 2026.

## Official
- theorytest.ie FAQs (https://www.theorytest.ie/general-information/faqs/), checked 2026-11-05:
  - Truck (C) and Bus (D) theory tests: 100 questions each, 120 minutes, 74 correct to pass.
    Offered in Irish as well as English.
  - Combined C and D (Bus and Truck) test: 140 questions, 180 minutes, 104 correct to pass.
    English only until further notice.
  - Bus Module and Truck Module tests: 40 questions, 45 minutes, 30 to pass, English only. Only
    for drivers who passed a full C or D theory test on or after 30 September 2014; a module can be
    added within two years of passing the full test.
  - A full Bus test also gives the first part of the Driver CPC.
  - Candidates for truck, bus, CPC and ADI tests must hold a category B licence; not while
    disqualified.
  - The theory test certificate is valid for two years from the test date.
  - Voiceover and reader/recorder options exist. No hazard perception part is mentioned.
- theorytest.ie booking page for bus or truck
  (https://theorytest.ie/book-your-theory-test/driver-theory-test-bus-or-truck/), checked
  2026-11-05: over forty test centres; minimum age to sit a Driver Theory Test is 15 from
  1 November 2026; bring a full B licence (or a C/D learner permit or licence). Fees left out
  (house style).
- RSA Driver CPC pages (rsa.ie, "Become a professional CPC driver", "2. Theory test"): rsa.ie
  returns 403 to direct fetch; content seen in search results 2026-11-05: Driver CPC Step 1 is
  covered by the category C or D Driver Theory Test, Step 2 is a separate case study test; topics
  include the Rules of the Road, risk perception, eco-driving and hazard awareness. Periodic
  training: 35 hours in each five years, done in Ireland as one 7-hour module a year (long-standing
  RSA rule, not re-read this session). Driver Qualification Card (DQC).
- CVRT / RSA "Using a Tachograph" guide, Revision 02, 08/08/2022
  (https://cvrt.ie/ie/Operator-Driver-Obligations/Tachograph-Equipment/~/assets/pdf/Using%20a%20Tachograph%20-%20WEB.pdf),
  read 2026-11-05: EU drivers' hours (Regulation (EC) 561/2006 as amended by 2020/1054): 4.5 h
  driving then 45 min break (or 15 + 30), 9 h daily driving extendable to 10 h twice a week, 56 h
  a week, 90 h in two weeks, 11 h daily rest (reducible to 9 h, at most 3 times between weekly
  rests), weekly rest 45 h (or 24 h reduced, compensated by the end of the third following week),
  weekly rest starting by the end of six 24-hour periods, no regular weekly rest in the vehicle,
  employer pays accommodation, return home or to base once every 4 weeks, multi-manning 9 h within
  30 h, ferry/train interruption twice and 1 hour in total, exceeding by 1 h (2 h after a 30 min
  break) in exceptional circumstances to reach home or base, border country symbol at the first
  safe stop. Road Transport Working Time: average 48 h over 17 weeks, 60 h maximum in a week,
  30 min break after 6 h work, 45 min after more than 9 h, night work 10 h a day, records kept two
  years, tell the employer in writing about work for another employer. Tachograph duties: manual
  records if the tachograph fails, record sheets/printouts for the current day and the previous 56
  days from 31 December 2024 (was 28).
- S.I. No. 546/2008 Road Traffic (Ordinary Speed Limits - Buses, Heavy Goods Vehicles, etc)
  Regulations 2008 (https://www.irishstatutebook.ie/2008/en/si/0546.html), read 2026-11-05:
  buses seating more than 8 passengers with no standing passengers: 100 km/h on motorways and dual
  carriageways, 80 km/h on other roads; buses designed for standing passengers: 65 km/h on any
  road; goods vehicles over 3,500 kg DGVW and any vehicle towing another: 80 km/h; a lower road
  limit always applies.
- S.I. No. 75/2012 amendment (https://www.irishstatutebook.ie/2012/en/si/0075.html), read
  2026-11-05: goods vehicles over 3,500 kg 90 km/h on a motorway, 80 km/h on other roads.
- Rural local road default limit 60 km/h since 7 February 2025 (see tools/next30/iedtt/sources.md).
- Road Traffic Act 2010: 20 mg per 100 ml of blood for "specified drivers" (learners, novices,
  professional drivers of goods vehicles, buses and small public service vehicles); 50 mg others.

## Long-standing EU and Irish rules used (not re-read this session; stable for years)
- Licence categories (Directive 2006/126/EC as applied by the NDLS): C1 over 3,500 kg up to
  7,500 kg; C over 3,500 kg; a trailer over 750 kg needs CE/C1E/DE/D1E; D1 up to 16 passengers
  besides the driver; D more than 8 passengers. C and D licences are renewed every five years with
  a medical report. Learners are accompanied by a full licence holder of the category, display
  L-plates and may not use motorways.
- Regulation (EU) 165/2014 (tachographs): driver card personal, one card per driver, valid up to
  five years; a damaged card: printouts at the start and end of the day; manual entries; operator
  downloads.
- Directive 96/53/EC: maximum width 2.55 m, articulated vehicle 16.5 m, rigid 12 m.
- Directive 92/6/EEC as amended: speed limiters 90 km/h on goods vehicles over 3,500 kg and
  100 km/h on buses with more than 8 passenger seats.
- EU air brake coupling colours: red emergency/supply, yellow service/control.
- CVRT: annual commercial vehicle roadworthiness test for goods vehicles over 3,500 kg and buses.
- Dublin City Council HGV Management Strategy: 5-axle HGVs need a permit to enter the city cordon
  07:00 to 19:00 and use the Dublin Port Tunnel. Asked only as "use the Port Tunnel".
- RSA fatigue advice: stop, take a caffeine drink and a 15-minute nap.
- Rules of the Road: motorway hard shoulder only in an emergency; on other national roads a slow
  vehicle may briefly use the hard shoulder to let traffic pass when safe; goods vehicles over
  3,500 kg, buses and towing vehicles may not use the right-hand lane of a motorway with three or
  more lanes except when directed or passing an obstruction.

## Copyright
- The RSA's official truck and bus question bank (sold as the Official Driver Theory Test
  material) is copyrighted and was NOT used. Every item is original. Items were written against
  `data/ireland-driver-theory-questions.json` (car), `data/uk-lgv-theory-questions.json` and
  `data/uk-pcv-theory-questions.json` so none repeats a stem.

## Choices
- Real C or D test: 100 questions, 120 minutes, 74 to pass. Modelled as four 50-question tests at
  the real pace (60 minutes each) and the real 74%: passPct 74, ceil(0.74 x 50) = 37. The bank
  covers both truck and bus, like the combined CD test (140, 104 to pass, also about 74%).
  testSets(18800, 4): 4 sets + 4 tests = 8 dashboard steps.
- The RSA publishes no topic weights. Ours are Tigertest's, weighted to the heavy-vehicle chapters
  of the official C/D material (drivers' hours, tachographs, brakes, loads, passengers).
- No fines, fees or penalty points. No vehicle weight limits (they vary by axle configuration).
- Not modelled: the Driver CPC Step 2 case study test, the module tests, and any picture items.
