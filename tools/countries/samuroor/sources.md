# Sources for `samuroor` (Saudi Arabia driving theory test, private licence)

All 200 questions are original. No official Muroor question pool, driving school question set,
past paper or commercial app was copied or reworded. Rules come from the Saudi Traffic Law (Arabic
text), its violation tables, the driving school regulation in the official gazette and the Saudi
Highway Code manual on traffic control devices. Signs are described in words (no images).

## Official sources (watched first)

- SHC 602, Manual on Uniform Traffic Control Devices (Saudi Highway Code, Ministry of Transport and
  Logistic Services, 2023, 575 pages, English), hosted on the National Competitiveness Center portal:
  https://istitlaa.ncc.gov.sa/ar/transportation/mot/saudihighwaycode/Documents/SHC%20602%20final.pdf
  fetched 2026-11-25. Gave: sign functions, shapes and colours (3.1.3); Stop and Yield signs
  (3.2.1 to 3.2.3); speed, night, photo-enforced and truck speed signs (3.2.4 to 3.2.7);
  overtaking, priority for oncoming traffic, horn, one-way, roundabout, parking, no stopping,
  clearway, bus lane, bus and taxi stop, pick-up, tow-away, neighbourhood, end of prohibitions,
  priority roadway, cycle and foot path signs (3.2.14 to 3.2.75); warning signs, chevrons,
  countdown markers and hazard markers (3.3); brown tourist signs and Turn on Lights (3.4, 3.5);
  marking colours, centre, lane, no-passing, prohibitory, edge, hatched, chevron, kerb, island,
  crosswalk, stop and yield lines, arrows, Do Not Block, roundabout and bus lane markings, road
  studs (4.1 to 4.6); signal meanings, flashing operation, pedestrian signals and countdowns,
  pedestrian hybrid beacons, emergency-vehicle signals, railway pre-emption (5.4 to 5.9); school
  zones (6.2); work zone sign colours, flaggers, cones and arrow panels (7.1 to 7.5).
- Traffic Law, Royal Decree No. M/85 of 26/10/1428H, with its amendments by M/70 (1437H) and
  M/115 (1439H) marked in the text (Arabic), as published by King Khalid University (a Saudi public
  university): https://www.kku.edu.sa/sites/default/files/2023-11/traffic_system.pdf
  fetched 2026-11-25. Gave: definitions (shoulder, stopping and parking, high, low and position
  lights, pedestrians, traffic accident and its minor and serious kinds, tafheet as amended);
  plates (Arts. 4 to 6); registration carried in the vehicle (Art. 11); insurance (Art. 8 as
  amended); modifications (Art. 25); periodic inspection (Art. 26); load responsibility (Art. 28);
  unauthorised horns and lights (Art. 29); lights or reflectors on a towed vehicle (Art. 30);
  licence required and carried (Arts. 32, 33); recognised foreign licences for one year (Art. 42);
  disabled drivers (Art. 43); no holding licences as security (Art. 46); medical fitness (Art. 48);
  road for all (Art. 50); signs part of the law (Arts. 51, 52); keep right (Art. 53); emergency
  vehicles and motorcades (Art. 54); pedestrians (Art. 55); school buses (Art. 56); seat belts and
  child seats (Art. 57); helmets (Art. 58); crash liability and duties (Arts. 60, 63); wrecked
  vehicle sales (Art. 65); points and withdrawal (Art. 76); unlicensed drivers (Art. 77); vehicles
  sold abroad (Art. 78); driving authorisation (Art. 17 as amended). Also Art. 2(20) as amended (a private car whose driver holds a Transport General Authority permit may carry passengers for a fare) and Art. 2(27) (emergency vehicles may exceed the set speed and not stop at signals when their work requires it). Articles marked "amended by
  M/115, refer to it" whose new text is not in this copy were not used for figures.
- Traffic violation tables (four classes of violations, KKU copy of the law's annexed tables, last
  updated 3 Jumada I 1438H): https://www.kku.edu.sa/sites/default/files/2023-11/traffic_violations_list.pdf
  fetched 2026-11-25. Gave the behaviours that are violations: driving before a licence, under the
  influence, through a red light, against traffic, weaving, speeding by any amount, overtaking where
  prohibited, stopping on railway tracks, uncovered loads, not stopping at Stop, not yielding at
  Yield, priority to the right at equal junctions, priority to the main road, police hand signals
  over lights, priority inside roundabouts, defective brakes and lights, lights in poor visibility
  and tunnels, polluting vehicles, checkpoints, lanes, objects left on roads, emergency vehicles,
  school buses, expired licences, emergency stops, view obstructions, slopes, seat belts, child
  seats, handheld phones, horn misuse, helmets, animals on roads, throwing objects, getting on or
  off moving vehicles, pedestrians crossing away from crossings or against signals, slow driving,
  parking in disabled bays, distraction, insurance. The violation classes, fine bands and point
  values in this older copy were amended by M/115 (1439H) and are not used.
- Regulation on driving schools and driving instruction (Umm Al-Qura official gazette, 1443-3-09,
  15 October 2021): https://www.uqn.gov.sa/details?p=18426 fetched 2026-11-25. Article 1(18): after the
  set theory and practical training hours the trainee sits a practical test and a theory test on
  the Traffic Law and its Implementing Regulations, road traffic rules, signs and signals and
  public safety rules, conducted by the traffic authority or a body the General Department of
  Traffic authorises. Also names the Implementing Regulations (Ministerial Decision 2249 of
  10/3/1441H). Used for the landing and `lib/examFacts.ts`, not for questions.
- Umm Al-Qura, paragraphs added to the Implementing Regulations of the Traffic Law (12 June 2026,
  self-driving vehicles): https://www.uqn.gov.sa/decisions-and-regulations/4001174 fetched
  2026-11-25. Confirms the regulation in force and its 2026 additions; nothing in it is asked.

## Test format

- The owner (General Department of Traffic, moi.gov.sa) publishes no question count, time limit,
  pass mark, languages or per-topic weights on any page that loaded here. Prep sites quote 20, 30
  or 35 questions and 75% or 85% to pass and disagree with each other, so none is quoted.
  `passPct: 80` is Tigertest's own target, stated as such on the dashboard, landing and facts.
- Blueprint (5/8/7/5/6/7/7/5 per 50) is Tigertest's own mix, weighted to signs, markings and right
  of way, which make up most of SHC 602 and the violation tables.
- Language: the bank is English. The site has no Arabic or right-to-left support, so Arabic is not
  modelled; the landing tells learners to check the languages offered with their school.

## Could not be loaded

- moi.gov.sa, absher.sa, laws.boe.gov.sa, ncar.gov.sa and web.archive.org reset the connection
  from this build environment (probably geoblocked); portal.mot.gov.sa returned a proxy error. So
  the Implementing Regulations (Ministerial Decision 2249 of 1441H) and the current M/115 violation
  tables could not be read in full. Rules that live only there (default speed limits, following
  distances, U-turn details, emergency numbers) are left out. The passing side (left) is taken
  only from how SHC 602 3.2.14 and 3.2.15 draw the overtaking signs, and parking details only
  from the SHC 602 signs and markings listed below.
- qanoniah.com (a third-party law mirror) returned 403 and was not used.

## Deliberately left out

- Every fine amount, points value, impoundment period and detention period.
- Minimum licence ages and licence validity periods (both amended by M/115, new text not read).
- Default speed limits by road type, and any rule found only in prep sites.
- Najm, Absher and other procedures for reporting minor crashes online.

## Redesign of licence, conduct, stopping and right-of-way items (2026-11-25)

The saLicence, saConduct and saStopping pools and 14 right-of-way items were rewritten from
scratch after the bank failed an options-only check (wrong options read as loopholes beside a
strict key). Each new item asks for one fact: a number, a place, a vehicle or person, a document,
a colour or the meaning of a device. Only 9 allowed-or-forbidden items remain in these four
categories, all keyed on the permissive answer. No rule outside the two primary texts above was
added. Texts re-read 2026-11-25 for this rewrite:

- Traffic Law (KKU copy above), re-read 2026-11-25: Art. 2 definitions as amended (3 lane, 5
  island, 6 shoulder, 9 freeway, 10 service road, 11 stopping, 20 private car for a fare, 21 taxi
  of up to eight persons, 22 public and private buses, 27 emergency vehicles, 30 public works
  vehicles, 31 high, low and position lights, 32 technical check at approved centres, 40 traffic
  accident, minor and serious, 41 tafheet, 42 empty, gross, net and axle weights); Arts. 3(b)
  registration number is the plate number; 4 and 5 plates, one rear plate on motorcycles, trailers
  and semi-trailers, trailers carry the towing vehicle's number; 9 registered owner liable until
  transfer; 16 no transfer fee on vehicles sold for dismantling; 17 as amended, driving
  authorisation; 24 Saudi Standards Organization specifications; 28 driver liable for loads; 31
  rear and side lights or reflective strips on large vehicles; 34 military licence holders; 35
  licence types; 37 test waived for recognised foreign licences; 42 one year from entry; 43
  medical report; 48 cancelling a licence; 54 emergency vehicles and official motorcades; 56
  school buses stopped for pupils; 63 crash duties. Violation tables: priority inside roundabouts
  without signals or an officer; passengers over the registered number.
- SHC 602 (NCC copy above), re-read 2026-11-25: 3.2.3 Yield with a pedestrian plate at
  unsignalled marked crossings; 3.2.5 Night plate on unlighted roads only; 3.2.8 compulsory
  minimum speed and its end (red oblique bar); 3.2.10 lane control signs no less than 150 m
  before a junction; 3.2.14 and 3.2.15 passing side drawn on the left, two-wheeled motorcycles
  exempt; 3.2.18 Pass Either Side; 3.2.41 and 3.2.42 parking restriction (pick-up allowed), No
  Stopping except emergencies or police, clearway repeaters at no more than 700 m; 3.2.43
  parking time limit signs (green border and text); 3.2.45 pay-and-display, ticket inside the
  windscreen, arrows toward the payment point, black-and-turquoise standard and
  white-and-turquoise premium kerbs; 3.2.54 Bus Stop sign black on white; 3.2.56 Loading Zone
  1 hour; 3.2.58 bus lanes beside the median on dual carriageways; 3.2.59 neighbourhoods (local
  deliveries only, humps and mini roundabouts without warning); 3.2.65 Look Right or Look Left
  signs for pedestrians crossing cycle routes; 3.2.67 path for animal riders; 3.2.68 shared and
  separated paths; 3.2.69 No Loading plates every 25 m over 50 m; 3.2.71 No Waiting Except taxis,
  ambulances or police; 3.2.72 truck waiting ban by gross weight; 3.2.75 Priority Roadway sign
  repeated after each intersection; 3.3.53 truck escape ramps; 3.6.10 kilometre posts west to
  east and south to north; 3.6.13 Exit Only panels; 4.2.6 green studs at exit ramps; 4.2.10
  turquoise paid-parking kerbs; 4.6.1 speed measurement markings; 4.6.2 speed reduction
  markings; 4.6.5 part-time and full-time bus lanes, continuity line at junctions, red bus stop
  surface; 4.6.7 HOV lanes for a driver plus one or more passengers; 4.10 longitudinal and
  yellow transverse rumble strips; 6.2 school zones (30 km/h when flashing, up to 150 m past the
  school, No Parking at least 20 m before a school zebra crossing, white-on-red Children Crossing
  plate).
