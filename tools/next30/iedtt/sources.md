# Ireland Driver Theory Test (iedtt) sources

Read October 30, 2026.

## Official
- RSA, Rules of the Road (current edition, rsa.ie "Rules of the Road" PDF, kept up to date online
  by the RSA; 2026 print edition from The O'Brien Press). Every item is written from it in our own
  words: licensing and learner rules, signs, road markings, traffic lights, junctions and
  roundabouts, overtaking, motorways and tunnels, parking, vulnerable road users, alcohol and
  drugs, seatbelts and child restraints, night and bad weather, breakdowns and collisions.
- theorytest.ie FAQs (https://www.theorytest.ie/general-information/faqs/): the car/bike (BW, AM)
  test is 40 questions, 35 correct to pass, 45 minutes; the certificate is valid for two years from
  the test date and must be used for a first learner permit application within that time; the
  score report shows category areas; from 1 November 2026 the minimum age to sit the test is 15.
  No hazard perception part is mentioned.
- RSA learner driver pages (rsa.ie, learner permit, EDT, accompanying driver, L and N plates,
  6 months before the driving test). rsa.ie returned 403 to direct fetch; content checked through
  search results and long-standing RSA rules.
- Speed limits: the rural local road default fell from 80 to 60 km/h on 7 February 2025 (Irish
  Times, RTE, 4 to 7 February 2025). Further cuts announced for national secondary roads (100 to
  80) and urban areas (30 km/h by bye-law) were still pending or rolling out by area in the
  sources found, so the bank does not ask about them. Motorway 120, national primary 100 and
  built-up 50 (unless signed) are asked.
- E-scooters: legal since 20 May 2024, 20 km/h maximum, riders 16 or over, never on footpaths.
- M50 barrier-free toll: pay by 8 p.m. the day after the journey (eFlow).
- RSA cyclist passing advice: at least 1 m up to 50 km/h, 1.5 m above 50 km/h.

## Copyright
- The RSA's official theory test question bank (sold as the Official Driver Theory Test book and
  app) is copyrighted and was NOT used. No item was copied from it or from
  data/uk-car-theory-questions.json; stems that read close to a UK or Ontario item were reworded
  after a similarity scan.

## Choices
- Format: 5 practice tests of 40 questions (the real length), 35 of 40 to pass, so passPct 87
  (ceil(0.87 x 40) = 35). 5 training sets, one per test, size 40. Dashboard 10 steps.
- The RSA publishes no category weights. Ours follow the Rules of the Road chapters, with signs
  and markings 12 of 40.
- No penalty point values, fines or fees are asked (house style). The theory test fee is left
  off the landing because theorytest.ie points to the booking page for current fees.
- Signs are described in words. Only colours and shapes we are sure of are stated: yellow diamond
  warning signs, red-bordered circular regulatory signs, the red octagon STOP, the yield triangle
  with Géill Slí, blue motorway, green national, white regional and local, brown tourist signs.
  Mandatory sign colours and the roadworks sign colour are not asked.
- Traffic light sequence is green, amber, red, green (no red and amber phase, unlike the UK).
