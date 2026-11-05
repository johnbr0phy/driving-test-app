# Sources for `nzmoto` (New Zealand motorcycle learner licence theory test, Class 6)

All 200 questions are original. NZTA's own sample Road Code questions and any commercial app's
items were not opened or copied. Signs and markings are described in words (no images).

Access note (2026-11-05): nzta.govt.nz (including the motorcycle licence pages and the Road Code
for motorcyclists) and legislation.govt.nz answered automated requests with a bot challenge or 403,
so neither the NZTA motorcycle licence pages nor the Land Transport (Driver Licensing) Rule 1999
text could be read this session. Facts below say where they came from; anything not on an official
page read this session is listed under "Not confirmed against an official page". The session's web
search budget was exhausted before any search could run, so only direct page fetches were used.

## Test format (checked 2026-11-05)
- drive.govt.nz, "Doing the learner licence test" (car page, NZTA's learner site): "The test has 35
  multi-choice questions." "You need to get at least 32 questions right out of 35 to pass."
  "You're given 30 minutes." The page does not mention motorcycles.
  https://drive.govt.nz/learner-licence/doing-the-learner-licence-test
- Wikipedia, "Driving licence in New Zealand" (secondary): a motorcycle learner licence "is gained
  after passing a basic handling test" and "scoring at least 32 out of 35 on the theory test".
  https://en.wikipedia.org/wiki/Driving_licence_in_New_Zealand
- AA (a licensing agent), motorcycle licence page: minimum age 16; step 1 a basic handling skills
  test (BHST) with a motorcycle instructor, step 2 the learner licence theory test.
  https://www.aa.co.nz/drivers/driver-licences/motorcycle-licence/
- So the mocks use 35 questions and 32 to pass (`passPct: 91`, `ceil(0.91 x 35) = 32`), labelled on
  the landing as the same format as the car learner test, from the car page and secondary sources.
  The 30-minute time is from the car page only. NZTA publishes no per-topic counts; the blueprint
  (5/4/4/6/6/5/5 per 35) is Tigertest's, following the Road Code for motorcyclists' themes, with
  give way and road position weighted heaviest.

## Licence conditions (secondary sources, checked 2026-11-05)
- Wikipedia (above): learner riders display a learner plate on the rear; no passengers; no riding
  between 10 pm and 5 am; no towing; LAMS-approved motorcycles only (under 660 cc, power-to-weight
  under 150 kW per tonne). Restricted riders keep the same conditions except the L plate.
- ACC Ride Forever, "Choosing a LAMS approved bike": learner and restricted riders can ride any
  motorcycle under 250 cc except listed prohibited models, and bikes under 660 cc that do not exceed
  150 kW per tonne; NZTA keeps the list.
  https://www.rideforever.co.nz/bike-and-gear/buying-a-bike/choosing-a-lams-approved-bike
- ACC Ride Forever, "Motorcycling licensing": learner minimum age 16; restricted needs 16 and a half
  and six months on the learner licence; full by practical test or CBTA.
  https://www.rideforever.co.nz/riding-in-new-zealand/nz-road-rules-and-regulations-2/motorcycling-licensing
- drive.govt.nz "Preparing for and booking the test": "Motorcycles need their own specialised
  licence"; a (car) learner licence lets you learn on a moped.
  https://drive.govt.nz/learner-licence/preparing-for-and-booking-the-test

## Riding guidance
- ACC Ride Forever, "Road rules": no legislated filtering speed limit; keep under 15 km/h faster
  than the traffic; careless or dangerous driving charges possible; flush medians are not for
  overtaking. https://www.rideforever.co.nz/riding-in-new-zealand/nz-road-rules-and-regulations-2/road-rules
- General road rules shared with `nzroad` (alcohol limits, demerits, crash reporting times, give way
  rules, 1.5 m passing gap and bus give way from 1 October 2026, 20 km/h past a stopped school bus,
  two and four second gaps, three-second signal) as recorded in `tools/next30/nzroad/sources.md`
  (checked 2026-10-30 by that builder and reviewer).

## Fact-check pass (2026-11-05)
nzta.govt.nz (Incapsula bot challenge) and legislation.govt.nz (403) were still unreachable and the
web search budget was exhausted, so primary NZTA and Driver Licensing Rule text could not be read.
Reputable secondary sources were used where the primary was unreachable; claims that could not be
confirmed anywhere were rewritten or replaced (same ids, same counts).
- Test format: drive.govt.nz "Doing the learner licence test" re-read 2026-11-05 (35 questions,
  32 to pass, 30 minutes; car page, no mention of motorcycles). Wikipedia (re-read 2026-11-05) gives
  the motorcycle learner pass as 32 of 35. Landing keeps the hedged wording.
  https://drive.govt.nz/learner-licence/doing-the-learner-licence-test
  https://en.wikipedia.org/wiki/Driving_licence_in_New_Zealand
- Learner conditions (rear L plate, no passengers, no riding 10 pm to 5 am, no towing, LAMS) and
  restricted = learner conditions minus the L plate: Wikipedia, re-read 2026-11-05. Kept
  (LIC-001..005, 008..011, 026, 027).
- LAMS: ACC Ride Forever "Choosing a LAMS approved bike", re-read 2026-11-05: any bike under 250 cc
  except prohibited models; bikes under 660 cc or electric not exceeding 150 kW per tonne. LIC-005..007
  kept; LIC-006 explanation and landing FAQ reworded to this wording.
  https://www.rideforever.co.nz/bike-and-gear/buying-a-bike/choosing-a-lams-approved-bike
- BHST first, then theory test; minimum age 16: AA motorcycle licence page, re-read 2026-11-05.
  LIC-012 kept; LIC-028 (was registration and WoF, unconfirmed for motorcycles) replaced with the
  minimum age of 16. https://www.aa.co.nz/drivers/driver-licences/motorcycle-licence/
- Restricted by practical test at 16 and a half after 6 months on the learner licence (or CBTA):
  AA page and ACC Ride Forever "Motorcycling licensing", re-read 2026-11-05. LIC-021 (was the moped
  50 cc definition, unconfirmed) replaced with this.
  https://www.rideforever.co.nz/riding-in-new-zealand/nz-road-rules-and-regulations-2/motorcycling-licensing
- Moped: drive.govt.nz "Preparing for and booking the test", re-read 2026-11-05: a (car) learner
  licence "also lets you learn on a moped". LIC-020 reworded to "learn on". Eyesight check and proof
  of identity are on that car page only, so the landing FAQ now says so.
  https://drive.govt.nz/learner-licence/preparing-for-and-booking-the-test
- Alcohol limits, demerits, crash reporting times, hand-held phone ban, carrying your licence, the
  1 October 2026 rules, school bus 20 km/h, default limits, 2/4 second gaps, 3-second signal, sign and
  give way rules: kept as recorded in `tools/next30/nzroad/sources.md` (Road Code, drive.govt.nz and
  NZ Police, checked 2026-10-30); the moto items were compared with the matching nzroad items
  2026-11-05 and agree. LIC-014 and LIC-015 lost their unchecked "old limit" history sentences.
- Helmets: ACC Ride Forever "Gear checklist" (2026-11-05): "By law, you have to wear one whenever you
  ride your motorcycle"; "Choosing helmets": any helmet used on NZ roads must conform to one of the
  NZTA-approved standards; it must not come off without undoing the chin strap; snug fit; replace
  every three to five years; a drop onto a hard surface can compromise the shell. GER-001 and GER-002
  rewritten (the pillion and "securely fastened" wording could not be confirmed); GER-003..005 kept;
  GER-014 (earplugs) replaced with the 3 to 5 year replacement.
  https://www.rideforever.co.nz/bike-and-gear/buying-gear-2/gear-checklist
  https://www.rideforever.co.nz/bike-and-gear/choosing-the-right-gear-2/choosing-helmets
- Gear and checks (ACC Ride Forever, 2026-11-05): tinted visors dangerous after dark, clear or high-vis
  yellow in rain (GER-006; GER-008 fog item replaced with the rain visor); motorcycle boots, gloves,
  CE armour for shoulders, elbows and spine, Kevlar denim below textiles and leather (gear checklist,
  choosing boots, gloves, jackets, pants pages); pressures rise with temperature, replace a bulging
  tyre, legal minimum tread 1.5 mm (Tyres; GER-023 new-tyres item replaced with tread depth); chain
  slack and lube (Chain); brake light from front and rear (10-point checklist).
  https://www.rideforever.co.nz/maintenance-and-tips/maintaining-your-bike/tyres
  https://www.rideforever.co.nz/maintenance-and-tips/maintaining-your-bike/chain
  https://www.rideforever.co.nz/maintenance-and-tips/maintaining-your-bike/10-point-checklist
- Road surfaces (ACC Ride Forever "Different road conditions", 2026-11-05): wet paint, diesel as
  rainbow patches, melted tar, cattle grids, manholes, gravel and chip seal, ice; cross slippery
  surfaces upright without braking. HAZ items kept.
  https://www.rideforever.co.nz/riding-in-new-zealand/on-the-road-2/different-road-conditions
- Signs: SGN-020 no longer states the chevron boards' colours (nzroad says black and yellow, this bank
  said black and white; neither re-checked).

## Not confirmed against an official page this session
- That the Class 6 theory test is the same 35 questions, 32 to pass, 30 minutes as the car test
  (Wikipedia and the car page only).
- The learner and restricted conditions (rear L plate, no pillion, 10 pm to 5 am, no towing, LAMS):
  Wikipedia and ACC Ride Forever, not the NZTA page or the Driver Licensing Rule.
- (Removed from the bank 2026-11-05: helmet law for pillions and "securely fastened", motorcycle
  WoF and registration, the moped definition.) Still relying on nzroad's Road Code reading: cycle lanes closed to motorcycles except to cross; bus lanes open only where
  motorcycles are listed; broken yellow edge lines meaning no stopping; 111.
- Riding technique items (braking, countersteering, lane position for bends, pillion behaviour,
  speed wobble, hazards) follow standard rider training as taught in New Zealand, not a page read
  this session.

## Deliberately avoided
- Learner and restricted stage durations (the 2027 graduated licensing changes are for cars), a 70 km/h
  learner limit (not found in any source read), licence expiry, fees, fines, the BHST content,
  helmet standard numbers, tread depth, daytime headlight law (asked only as advice), lane splitting
  legality beyond "not banned, but risky", and the motorway rules for learners.
