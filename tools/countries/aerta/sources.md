# Sources for `aerta` (UAE driving theory test, RTA Dubai knowledge test, light vehicle)

All 200 questions are original. No official RTA question bank or commercial app was copied. Rules come
from federal traffic law, RTA and UAE government pages, and police guidance reported in the national
press. Signs are described in words (no images). Checked 2026-10-31 unless stated.

## Test format
- RTA, Knowledge Test service (service 510):
  https://www.rta.ae/wps/portal/rta/ae/home/rta-services/service-details?serviceId=510
  "There are 40 questions in the Knowledge Test"; "a minimum of 30 correct answers to pass it"
  (75%, so `passPct: 75` gives ceil(0.75 x 40) = 30). Eligibility: citizens and residents with a valid
  learning permit; requirement: Emirates ID; complete the theory lectures before the test (8 hours
  light vehicle, motorcycle and buses; 9 heavy vehicle; 4 equipment); arrive 30 minutes before the
  appointment. No time limit or per-topic counts are published.
- Driving schools (Excellence Driving blog) say the theory test also has a video hazard section that
  must be passed in full. Not on the RTA page, so the landing says "driving schools say" and the bank
  does not model it. Older commercial sites still quote 35 questions / 23 to pass; not used.
- Blueprint (4/9/5/7/6/5/4 per 40) is Tigertest's own mix, weighted to signs and right of way.

## Minimum age (disputed, worded non-committally)
- u.ae Road safety page (https://u.ae/en/information-and-services/justice-safety-and-the-law/safety/road-safety)
  says applicants must be at least 17; Federal Decree-Law 14 of 2024 lowered the age to 17; RTA pages
  have said 18. Bank and landing say only "check with your emirate's licensing authority".

## Federal law
- Federal Decree-Law No. 14 of 2024 on Traffic Regulation, issued 30 Sep 2024, in force 29 Mar 2025,
  replacing Federal Law 21 of 1995 (Gulf News "New UAE traffic law comes into force";
  https://gulfnews.com/uae/transport/new-uae-traffic-law-comes-into-force-1.2051739).
- u.ae Road safety page (above): pedestrians may not cross roads where the speed limit exceeds
  80 km/h (ROW-029); driving under the influence of alcohol, drugs or psychotropic substances is a
  serious violation (LIC-008); horn use within city limits only in emergencies (LIC-013); no parking,
  stopping or repairing vehicles on roads or footpaths (SAF-018, SAF-019); excessive-noise vehicles
  not permitted (LIC-014); trainees may not drive in populated areas until they can control the
  vehicle safely (LIC-016); fleeing an accident scene and driving with a suspended licence are
  violations (LIC-020); minor accidents can be reported online through police apps (CON-016).
- Gulf News, "New UAE traffic law: Provide first aid only if you have the necessary medical knowledge"
  (https://gulfnews.com/living-in-uae/ask-us/new-uae-traffic-law-provide-first-aid-only-if-you-have-the-necessary-medical-knowledge-1.1730195615314): CON-021.

## Emergencies
- u.ae Handling emergencies (https://u.ae/en/information-and-services/justice-safety-and-the-law/handling-emergencies):
  police 999, ambulance 998, civil defence 997 (coastguard 996); minor accident with no injuries, move
  the vehicle to the shoulder; with injuries, leave the vehicles until the ambulance arrives
  (CON-016 to CON-020).

## Children and school buses (Ministerial Resolution 178 of 2017 as amended; press reports)
- Child seat for children under 4; children under 10 or under 145 cm not in the front seat
  (Gulf News, Emirates 24|7 "5 UAE child road safety rules"; Ajman Police via Gulf News). SAF-001, SAF-002.
- School bus stop arm: all traffic stops, both directions where there is no physical divider, no
  closer than 5 metres (Gulf News "Back to school: See a school bus stop sign?", Khaleej Times
  school-zone rules). SAF-004 to SAF-006.

## Weather
- Wadis: Ministry of Interior amendment (May 2023) to Ministerial Resolution 178 of 2017 made entering
  a valley flowing with rainwater, and gathering near valleys, floods and dams in rainy weather,
  violations (Gulf News "UAE: Driving in bad weather or during an emergency? Be aware of these three
  traffic violations", https://gulfnews.com/living-in-uae/transport/uae-driving-in-bad-weather-or-during-an-emergency-be-aware-of-these-three-traffic-violations-1.1684420891246).
  CON-007, CON-008. Penalties are not asked.
- Fog: police say hazard lights while driving in fog are a violation, use them only when parked; at
  zero visibility pull off and park somewhere safe (Abu Dhabi Police via Gulf News,
  https://gulfnews.com/uae/transport/dh500-fine-and-black-points-for-driving-with-hazard-lights-on-during-fog-in-uae-1.2146717).
  CON-001 to CON-003.

## Driving
- Following distance: the RTA light vehicle handbook recommends a two-second gap, more in poor
  visibility (Gulf News "Tailgating in Dubai: Fine, vehicle impoundment and rules, explained",
  https://gulfnews.com/living-in-uae/transport/dubai-tailgating-fine-rules-1.500083210). The
  handbook PDF itself (licensing.rta.ae/handbook/DrivingSafelyInDubaiEN.pdf) could not be text-extracted
  here. LAN-012 to LAN-014.
- Roundabouts: give way to traffic already circulating, coming from the left (Gulf News "Confused about
  how to navigate a roundabout?"). ROW-001 to ROW-009.
- RTA red bus lanes are reserved for public buses and taxis (RTA bus and taxi lanes). MRK-017.

## Deliberately avoided
- Every fine amount, black point total and impoundment period.
- Default speed limits and the speed "buffer" (they differ by emirate and road).
- A precise minimum driving age; tinting rules; Salik and other tolls.
