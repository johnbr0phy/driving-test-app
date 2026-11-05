# Sources for `sgvl` (Singapore taxi and private hire vocational licence test, TDVL / PDVL)

Checked 5 November 2026. Web search was unavailable this session (shared search budget used up), so
every page below was fetched directly by URL.

## Format of the real test (what is and is not confirmed)

- OneMotoring (LTA), Vocational Licence Application:
  https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/vocational_licence/vocational_licence_application.html
  - TDVL lets the holder drive a taxi and a private hire car; PDVL covers private hire cars only
    (also https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/vocational_licence.html).
  - Eligibility: Singapore Citizen, at least 30, valid class 3 or 3A licence held for more than
    1 year, basic English (D7 at GCE O/N level or WPLN Level 3), up-to-date MediSave for the
    self-employed, clean criminal record, medical check-up and chest X-ray (HMER digital from
    2 February 2026).
  - Course: "16-hour TDVL course"; TDVL test "3 papers"; PDVL to TDVL "8-hour conversion course" and
    a test of "2 papers". The converted TDVL is valid only for the rest of the PDVL's period.
  - Validity: 3 years (shorter from 67); Assessment of Fitness to Drive before 70, 73 and 74;
    statutory age limit 75; revoked on a court conviction or when the driving licence is
    disqualified or suspended for one year or more; temporary VL on the day of passing, digital VL
    within 20 working days; digital VLs for those passing on or after 1 April 2023.
  - Not stated: number of questions, time per paper, pass mark, test languages.
- ComfortDelGro Taxi, vocational licence courses (course provider listed by LTA):
  https://www.cdgtaxi.com.sg/vocational-licence-courses/
  - TDVL: 1.5 days; modules Road Safety & Passenger Engagement Technique, Rules and Regulations,
    Routes and Landmarks; assessment "E-Test at LTA appointed Test Centre", Paper A (on-the-road
    safety practices; engagement and handling techniques with passengers), Paper B (rules and
    regulations for taxi and PHC drivers), Paper C (key routes; route planning with a printed street
    directory and digital navigation tools).
  - PDVL: 1 full day or 2 nights; same three papers, Paper C on route planning only.
  - Not stated: question counts, durations, pass marks, languages, retakes.
- NTUC LearningHub course page (the other listed provider):
  https://www.ntuclearninghub.com/topics/taxi-private-hire-driver-vocational-licence-course
  - Refresher once every six years; renewal every three years. No test format given.
- OneMotoring, Vocational Licence Renewal:
  https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/vocational_licence/vocational_licence_renewal.html
  - Renewed for 3 years; refresher once every 6 years: PDVL 3 hours, TDVL active drivers with a good
    VLPS record 3 hours, other TDVL holders 5 hours; medical certification before renewal from 50;
    on-road assessment at 70, 73 and 74; age limit 75; expired under 6 months renew normally, over
    3 years needs a new application.

**Tigertest's modelling.** Neither LTA nor the course providers publish the question count, time or
pass mark of the three e-test papers. Tigertest models four 50-question mock tests mixing the three
papers (A 21, B 24, C 5 per test, Tigertest's split) with an 80% target. This is stated in the
config's `sourceLine`, on the landing and in examFacts. Paper C's street-directory lookups and
landmark recall are not modelled beyond route-planning principles, postal codes and the expressways.

## Law and rules used in the bank

- Road Traffic (Chauffeured Private Hire Car and Taxi Vocational Licence Demerit Points System)
  Rules 2017 (S 365/2017), informal consolidation in force from 30 October 2020, LTA copy:
  https://www.lta.gov.sg/content/dam/ltagov/industry_innovations/industry_matters/regulations_licensing/taxis_private_hire_cars/private_hire_car_licence/pdf/Road%20Traffic%20(Chauffeured%20Private%20Hire%20Car%20and%20Taxi%20Vocational%20Licence%20Demerit%20Points%20System)%20Rules%20wef%2030%20Oct%202020.pdf
  - Points on conviction or composition; relevant period any 24 months; suspension 1 to 5 none,
    6 to 10 two weeks, 11 to 15 four weeks, 16+ eight weeks; revocation above 20; 14 days for
    representations. Scheduled offences and points used: 21 (lending VL, expired or suspended VL,
    unauthorised audio/visual recording equipment, disclosing in-vehicle recordings, keeping left
    property 7 days or more, no PHC decal, removing decals, PHC plying for hire, meter tampering),
    12 (PHC soliciting or loitering, faded/illegible/defaced decals, taxi soliciting), 6 (taxi
    refusing hire, unauthorised ride-hail booking), 5 (using another's VL, hurting a passenger,
    sexual harassment of a passenger, terminating a hire, windscreen obstruction, left property
    24 hours to 7 days, covering the meter), 3 (non-sexual insult, obstructing an officer, failing
    to surrender a VL, meter start/stop/reset, not taking the shortest route, taxi stand rules,
    hindering other taxis).
- LTA, Offences applicable to PDVL holders (accurate as at 1 April 2023):
  https://www.lta.gov.sg/content/dam/ltagov/industry_innovations/industry_matters/regulations_licensing/taxis_private_hire_cars/private_hire_car_licence/pdf/PDVL_holders_Offences.pdf
  - Unauthorised CBD pick-up/set-down, failing to display identification, failing to behave in a
    civil and orderly manner, failing to ensure passenger safety, failing to produce the VL,
    leaving the driver's seat without reasonable cause, failing to stop close to the verge,
    stopping within 9 metres of a bus stop, stopping at a taxi stop or stand.
- LTA, Private Hire Car Licence page and FAQs for PHC matters:
  https://www.lta.gov.sg/content/ltagov/en/industry_innovations/industry_matters/regulations_licensing/taxi_private_hire_cars/private_hire_car_licence.html
  https://www.lta.gov.sg/content/dam/ltagov/industry_innovations/pdf/Enhanced_FAQs_for_PHC.pdf
  - Pair of tamper-evident decals, front and back windscreens; replace damaged decals within three
    calendar days; not transferable; non-PHC may not display them; annual PHC inspection since
    1 January 2021, taxis every six months; inward conversion inspection; converting out of the
    scheme does not affect the VL; VL holders may do car-pool trips in a chauffeured PHC; PDVL or
    TDVL plus adequate insurance needed for paid trips.
- LTA, Taxi & Private Hire Cars (Point-to-Point framework):
  https://www.lta.gov.sg/content/ltagov/en/industry_innovations/industry_matters/regulations_licensing/taxi_private_hire_cars.html
  - P2P framework introduced in 2020 after the Point-to-Point Passenger Transport Industry Bill;
    ride-hail and car-pool operators with 800 or more vehicles need an RSOL or CSOL.
- LTA, Getting a ride:
  https://www.lta.gov.sg/content/ltagov/en/getting_around/point_to_point_transport_and_cross_border_services/getting_a_ride.html
  - Street-hail for taxis only; PHCs booked through a licensed or licence-exempt (under 800 vehicles)
    operator; flat fares shown upfront; PHC passengers cannot board or alight at taxi stands;
    taxis cannot stop in bus lanes during operating hours, within 9 m of a bus stop, or where signs
    and lines prohibit stopping; CBD bus lane scheme; roads where taxis must not stop (Finlayson
    Green, High Street, Orchard Link, Esplanade Drive); stands, stops and driveways safest; stands
    carry an LTA sign and appear in MyTransport.SG; PHCs must provide booster seats or child
    restraints for passengers below 1.35 m, regardless of age.
- LTA, Taxi fares and payment methods:
  https://www.lta.gov.sg/content/ltagov/en/getting_around/point_to_point_transport_and_cross_border_services/taxi_fares_payment_methods.html
  - Flag-down, distance and time-based unit fares, surcharges and booking fees; peak and late-night
    surcharges as a share of the metered fare; location surcharges (Changi Airport, Marina Bay Sands,
    Resorts World Sentosa and others); fares set by each taxi company with LTA and the PTC keeping
    some aspects standard; cash, credit cards, NETS, CEPAS. No amounts are used in the bank.
## Fact check, 5 November 2026

Web search was again out of budget, so pages were fetched by URL. Checked 2026-11-05.

- Traffic Police, Basic Theory of Driving handbook (PDF, downloaded and read in full text):
  https://www.police.gov.sg/-/media/SPF/Knowledge-Hub/Traffic/BT-ENG-24126.pdf (checked 2026-11-05)
  - Unbroken double yellow lines: no parking at all times except immediate picking up and letting
    down of passengers; double yellow zig-zag lines: no stopping at all times. Confirmed.
  - Seat belts: "All persons travelling in vehicles, irrespective of their age, should be
    appropriately belted up"; 3 demerit points for failing to belt up. Confirmed.
  - Mobile communication device: an offence to use one (hold it in at least one hand while
    operating a function) when driving; use it only when stationary in a safe place. Confirmed.
  - "Start of silver zone" sign: slow down, look out for elderly pedestrians, do not exceed the
    posted speed limit on the attached sign; Silver Zones in estates with high senior populations.
    The Silver Zone question now quotes that sign (the "elderly couple" picture was not confirmed).
  - "White walking sticks" sign: slow down, stop if necessary to give way to blind people crossing.
    Used for the question that replaced the guide dog item (guide dogs in taxis not confirmed).
  - Safe gap: the "three-second" rule (previously two-second). The two-second question was wrong
    and now tests the three-second rule.
  - Aquaplaning: loss of steering control and braking efficiency; slow down by braking
    intermittently (on/off). The aquaplaning key now follows this.
  - Bad weather: reduce speed, headlights on, stop at the side with hazard lights if you cannot see;
    wet stopping distance about twice a dry one. Hazard lights on for a broken-down vehicle; dip
    headlights when following or facing vehicles; amber means stop unless too close to stop safely.
  - Personal mobility devices on roads: not covered. The claim that PMDs are banned from roads was
    removed from the explanation; the question tests only giving a small device rider room.
- NEA, Smoking prohibition in educational institutions, private hire cars on paid chauffeured
  service, trishaws and excursion buses:
  https://www.nea.gov.sg/our-services/smoking-prohibition/smoking-prohibition-extension/smoking-prohibition-in-educational-institutions-private-hire-cars-on-paid-chauffeured-service-trishaw-and-excursion-buses
  (checked 2026-11-05): smoking prohibited in taxis; extended to private hire cars on paid
  chauffeured service from 1 October 2017. Vaping law not reached (HSA pages 404), so the question
  now uses a lit cigarette and no longer says vaping is illegal.
- LTA, Getting a ride (re-checked 2026-11-05): "Within the CBD, taxis must adhere to the bus lane
  scheme"; no CBD taxi-stand-only rule or times. The CBD question now tests the bus lane scheme.
- LTA, Offences applicable to PDVL holders (accurate as at 1 April 2023, re-read 2026-11-05):
  item 4, verbally insulting, intimidating or harassing a passenger "in any manner (including
  sexually)", 5 points, which differs from the 2020 consolidated Rules (sexual 5, other 3). The
  question comparing the two was removed; the bank now asks only about sexual harassment (5 under
  both) and no longer says non-sexual forms carry fewer points.
- Expressways (secondary source; LTA had no fetchable page): Wikipedia, Expressways of Singapore,
  https://en.wikipedia.org/wiki/Expressways_of_Singapore (checked 2026-11-05). PIE longest (42.8 km,
  Changi Airport/ECP to Tuas/AYE); AYE to Tuas Checkpoint and the Second Link; CTE from the AYE to
  the SLE and TPE; ECP from Changi Airport to Sheares Avenue/the city; KPE from the ECP and MCE to the
  TPE, 9 of 12 km underground; MCE from the AYE to the ECP and KPE with Singapore's first undersea
  tunnel; BKE from the PIE to Woodlands Checkpoint and the Causeway; KJE links the PIE and BKE; SLE
  BKE to CTE; TPE PIE to SLE and CTE. All route questions confirmed.
- Postal codes (secondary): Wikipedia, Postal codes in Singapore,
  https://en.wikipedia.org/wiki/Postal_codes_in_Singapore (checked 2026-11-05): six digits, the first
  two give the sector. Confirmed.
- LTA, Active mobility rules and code of conduct,
  https://www.lta.gov.sg/content/ltagov/en/getting_around/active_mobility/rules_and_public_education/rules_and_code_of_conduct.html
  (checked 2026-11-05): no statement on PMDs and roads (see above).

## Still general practice (no official source cited)

Passenger service and disability etiquette (asking before helping with a wheelchair, introducing
yourself to a blind passenger, facing a deaf passenger), fatigue, drowsy medicine, door checks,
lifting and loading, and similar defensive driving habits. None states a rule or a number.
