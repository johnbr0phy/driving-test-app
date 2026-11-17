# Sources: Ontario air brake endorsement (Z) knowledge test, `caairbrake`

All 200 questions in the bank are original, written from the rules and figures in the Ministry of
Transportation's own Official Air Brake Handbook below. No DriveTest question, official sample,
prep-site practice test or question pool was used, even reworded. All sources fetched 2026-11-16
(curl with a browser user agent; ontario.ca pages read as text).

## Official: the handbook (MTO, the whole knowledge base of the test)

- The Official Air Brake Handbook (ontario.ca, the online edition of "The Official MTO Air Brake
  Handbook"): https://www.ontario.ca/document/official-air-brake-handbook
  - Print view of the whole book read in full: https://www.ontario.ca/document/print/book/82162
    (fetched 2026-11-16). Says it "contains the information you need to prepare for the air brake
    endorsement examination" and that "Air brake examinations are conducted at DriveTest Centres".
    Illustrations credited Techni-Com Inc., 2008; the online text carries the September 1, 2023
    renewal note, so it is the current edition.
  - Chapters used, one bank category each: 1 Vehicle Braking Systems and 6 Foundation Brakes
    (caairBasics); 2 Air Supply Subsystem (caairSupply); 3 Service Brake Subsystem (caairService);
    4 Spring (Parking and Emergency) Brake Subsystem (caairSpring); 5 Trailer Brake Subsystem
    (caairTrailer); 7 Demands on Brakes While Driving (caairDriving); 8 Air Brake Compliance and
    9 Inspecting Air Brake Components (caairInspect); 10 Inspecting Air Brake System Operation
    (caairTests); 11 Inspecting Air Brake Adjustment and 12 Brake Adjustment Limits Chart
    (caairAdjust).
  - Key figures, all in the handbook's own kPa and psi pairs: cut-out normally 138 to 173 kPa
    (20 to 25 psi) above cut-in; normal range about 690 to 828 kPa (100 to 120 psi); never below
    552 kPa (80 psi) or above 1000 kPa (145 psi); safety valves normally open at 1035 kPa
    (150 psi); low air warning must come on before 380 kPa (55 psi), most at 414 kPa (60 psi);
    spring brakes need about 414 kPa (60 psi) to stay released; trailer supply valve closes
    automatically between 138 and 311 kPa (20 and 45 psi); trailer spring brakes apply below
    414 kPa (60 psi); build-up test from below 552 kPa, 600 to 900 rpm, 587 to 690 kPa (85 to
    100 psi) within two minutes; air loss with brakes applied 21 kPa (3 psi), 28 kPa (4 psi),
    41 kPa (6 psi) per minute by vehicle type; brake adjustment checked with pressure at 621 to
    690 kPa (90 to 100 psi), engine off, spring brakes released, service brakes fully applied;
    adjustment limits from the clamp-type chamber chart (for example type 30 standard 2 in (51 mm),
    30 LS 2-1/2 in (64 mm), 24 standard 1-3/4 in (45 mm), 30 DD3 2-1/4 in (57 mm), 36 2-1/4 in
    (57 mm)); doubling weight doubles stopping distance, doubling speed quadruples it, both eight
    times; brake lag up to one-half second.

## Official: how the endorsement is obtained (MTO pages)

- Get a truck driver's licence, "Air brake (Z) endorsement program":
  https://www.ontario.ca/page/get-truck-drivers-licence (fetched 2026-11-16, page updated
  September 21, 2026). A Z endorsement is needed for a vehicle with an air brake or air-over-hydraulic
  brake system; obtained either through an air brake endorsement course (vehicle fleet owner,
  community college or safety organization; B, C, D, E, F or G holders must use a fleet owner;
  referral envelope taken to DriveTest within 6 months) or by tests at a DriveTest centre: an air
  brake knowledge test, then a practical test (Version 1 with a tractor-trailer air brake system,
  Version 2 without). Items to bring to the practical. Renewal on or after September 1, 2023 uses
  an online air brake learning module instead of the knowledge test; from age 80 the module and
  practical test each year, under 80 usually every 5 years. A fee applies (amount not used).
- Get a bus driver's licence: https://www.ontario.ca/page/get-bus-drivers-licence (fetched
  2026-11-16). Same renewal rule for Class B, C, E, F or G holders with a Z endorsement.

## Law

- The handbook states that the Highway Traffic Act and its regulations govern; its statements of
  what the Act prohibits (operating with a brake out of adjustment, a defective low air warning,
  excessive air loss, defective drain valves, and so on), the daily adjustment check and the
  driver's duty to report defects are used as the handbook words them. The regulations on e-Laws
  (https://www.ontario.ca/laws/regulation/940340, O. Reg. 340/94) render only with JavaScript and
  could not be read, so no section number is cited in any question.

## Format (landing and facts only, never in questions)

- MTO publishes no question count, time limit or pass mark for the air brake knowledge test. Guides
  say it is multiple choice with a pass mark of about 80%; Tigertest uses 80% as a readiness line
  and the landing says MTO does not publish one. The practical test is not modelled.

## Left out on purpose

- Fees, the print price of the handbook, penalty amounts.
- Facts already asked in the US CDL air brake banks (`data/cdl-endorsement-questions.json`
  `airBrakes`, `data/cdl-questions.json` `brakingSystems`) in the same fact-and-answer form: the
  150 psi safety valve setting as the answer, US governor figures, US leakage limits, "S-cam is the
  most common", "drain tanks daily", "brake normally with ABS", the colour of the trailer supply and
  parking knobs as the answer. Where the handbook gives the same idea, questions ask it from a
  different angle (Ontario's kPa limits, a pass or fail call, what to do next).
- The practical test as an exam (its booking, versions and kit list are on the landing only).
