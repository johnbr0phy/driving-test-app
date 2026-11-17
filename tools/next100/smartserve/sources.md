# Sources: Smart Serve Ontario (responsible alcohol service certification), `smartserve`

All 200 questions in the bank are original, written from the rules and facts below. No Smart Serve
course material, final test question, practice question or prep-site item was read or used, even
reworded: the Smart Serve course sits behind a paid login and was not opened. Tigertest is not
affiliated with Smart Serve Ontario or the AGCO, and the bank never names the program in a stem.
All sources fetched 2026-11-16 (WebFetch where the site allowed it, otherwise curl with a browser
user agent and the HTML stripped to text).

## Official: the program and its test (Smart Serve Ontario)

- Smart Serve Ontario home page: https://smartserve.ca/
  - Fetched 2026-11-16. Ontario's responsible alcohol service training, approved by the AGCO. Two
    online courses: the Full Online Training Program (about 4 to 5 hours, self-paced, English,
    French, Korean, Chinese, Punjabi and Spanish) for anyone who serves, sells, delivers or offers
    samples of liquor (servers, bartenders, security staff, delivery drivers, event and catering
    staff), and the Retail Online Training Program for grocery, convenience and other retail store
    staff. "Certification is mandatory by law in Ontario." Pass mark 80% for both courses. Prices
    are on the page and are not used (they change).
- The Smart Serve Full Course page: https://smartserve.ca/full-course
  - Fetched 2026-11-16. Final Test: "The test consists of 33 multiple choice questions that are
    randomly generated." "You must achieve a minimum of 80% to pass." "Each purchase includes two
    (2) attempts at the Final Test." Completed in one sitting, "about 30 mins". All Final Tests are
    proctored online with a webcam and valid government-issued photo ID. Access to the course and
    test expires 30 days after purchase. Used for the landing, `examFacts` and the test length
    (33 questions, 80%), never for questions.
- Smart Serve Certificate FAQs: https://smartserve.ca/certificate-faqs/
  - Fetched 2026-11-16. Final tests completed online with webcam ID verification and screen
    monitoring; an expired certificate means buying and retaking the course and the Final Test;
    eCertificate under "My Results"; printed replacement cards no longer issued. Landing only.
- The retail course's test (20 multiple-choice questions, 80% to pass) is stated on the home page
  above (fetched 2026-11-16). Landing only; the retail course is not modelled separately.

## Official: the regulator and the law (Alcohol and Gaming Commission of Ontario)

The primary texts on Ontario's e-Laws (https://www.ontario.ca/laws/statute/19l15 and
https://www.ontario.ca/laws/regulation/r21746) sit behind a JavaScript bot wall and returned
403 to WebFetch and to curl. The law is therefore taken from the AGCO, the regulator that
administers it, which quotes the sections it relies on. Section numbers in explanations are only
those the AGCO pages quote.

- AGCO, Standards, acts and regulations: https://www.agco.ca/en/alcohol/standards-acts-and-regulations
  - Fetched 2026-11-16. Lists the Liquor Licence and Control Act, 2019 (LLCA), O. Reg. 745/21
    (General), O. Reg. 746/21 (Licensing), O. Reg. 747/21 (Permits), O. Reg. 750/21 and the
    Registrar's Interim Standards and Requirements for Liquor.
- AGCO, Registrar's Interim Standards and Requirements for Liquor (printer version, last updated
  30 June 2026): https://www.agco.ca/en/book/export/html/245756
  - Fetched 2026-11-16. LLCA in force 29 November 2021. Standard 1.2 post the licence; 1.6 post
    the suspension sign visible from outside; 2.1 advertising; 4.1 training: every person involved
    in the sale, service, sampling or delivery of liquor or taking orders, security staff the
    licensee employs (or, for a stadium, uses), motorized vending cart staff and course marshals
    (golf), every large quadricycle chauffeur; 5.1 lists of drinks with the amount of liquor in each
    and prices, and non-alcoholic drinks; 5.3 no minimum purchases; 5.4 complimentary liquor only
    for customer relations and not encouraging immoderate consumption; 5.6 no contests involving
    purchase or consumption, no free liquor as a prize; 5.9 non-alcoholic drinks at moderate prices;
    5.12 no alcohol-without-liquid vaporizers; 5.13 no substitution without consent; 5.14 minors may
    not possess liquor in retail stores; 5.16 (September 2026) vending machines indoors, supervised,
    single-serve beer, cider, wine and ready-to-drink only, nothing else sold from them, a certified
    employee present who controls access; 6.1 capacity includes employees; 6.3 secure storage.
- AGCO, Liquor Sales Licence (Including Tied House) and Mini Bar Licence Guide:
  https://www.agco.ca/en/book/export/html/383901
  - Fetched 2026-11-16. Training list (as above); inspections and common violations (permitting
    intoxication, service outside hours or failing to remove evidence, disorderly conduct including
    drugs and illegal gambling, exceeding capacity, serving under 19); warnings, monetary penalties,
    notices of proposal; 15 days to request a Licence Appeal Tribunal hearing (LAT, part of
    Tribunals Ontario, not the AGCO); civil liability beyond AGCO sanctions; capacity counts staff;
    takeout and delivery of liquor with food, delivery by the licensee, an employee or a delivery
    licence holder, all of whom need the approved training; endorsements (caterer's: sponsored by
    someone else, at most ten days, notice ten days ahead to the AGCO, police, fire, health and
    building departments; room service; mini bar locked with a key separate from the room key,
    stocked with non-alcoholic drinks too, access only 19 and over; golf course carts with
    non-alcoholic drinks; bring-your-own-wine).
- AGCO, Hours for liquor sale, service and delivery:
  https://www.agco.ca/en/alcohol/hours-liquor-sale-service-and-delivery
  - Fetched 2026-11-16. Licensed establishments 9:00 a.m. to 2:00 a.m.; New Year's Eve until
    3:00 a.m.; all signs of liquor cleared 45 minutes after the end time; spring and autumn clock
    changes; airports' sterile areas; by-the-glass and caterer's endorsements 9:00 a.m. to midnight;
    retail sale 7:00 a.m. to 11:00 p.m.; delivery 9:00 a.m. to 11:00 p.m.; permits use the hours on
    the permit; licences may carry conditions that limit hours further.
- AGCO, Legal drinking age and photo identification:
  https://www.agco.ca/en/alcohol/legal-drinking-age-and-photo-identification-id
  - Fetched 2026-11-16. Legal age 19; check ID of anyone who appears under 19 (O. Reg. 746/21);
    minimum age 18 to work handling alcohol; best practices for checking ID and handling an abusive
    customer.
- AGCO, Tips for identifying minors: https://www.agco.ca/en/alcohol/tips-identifying-minors
  - Fetched 2026-11-16. Valid ID is government-issued, current, with photo and date of birth; no
    copies or photos; the Ontario Health Card cannot be required; acceptable ID list; questions to
    ask; second piece of ID; "No ID = No sale".
- AGCO, Tips for checking ID: https://www.agco.ca/en/alcohol/tips-checking-id
  - Fetched 2026-11-16. Ontario driver's licence features (number starts with the first letter of
    the last name; birth year digits; "AGE 19" banner for 16 to 18 year olds; UV trillium; raised
    lettering); spotting a fake (hold it, feel the laminate, consistent characters, never accept ID
    without a photo); equivalent foreign photo ID such as a passport is acceptable.
- AGCO, Information sheet: recognizing intoxication:
  https://www.agco.ca/en/alcohol/information-sheet-recognizing-intoxication
  - Fetched 2026-11-16. Ten signs; strategies for initial, few and multiple signs; s. 43(1) of
    O. Reg. 746/21 (no intoxication, unlawful gambling or disorderly conduct on premises or adjacent
    areas under the licensee's exclusive control); preventing intoxication; Smoke-Free Ontario Act.
- AGCO, Information sheet: house policies: https://www.agco.ca/en/alcohol/information-sheet-house-policies
  - Fetched 2026-11-16. House policies in writing, not the law; door, food, non-alcoholic drinks,
    training, incident log, no drinking on the job, safe transportation plan, under-age servers,
    monitoring, bottle service, hours, disorderly behaviour.
- AGCO, Liability: there's more to lose than your licence:
  https://www.agco.ca/en/alcohol/liability-theres-more-lose-your-licence
  - Fetched 2026-11-16. Quotes LLCA s. 32 (no sale or supply to a person who is or appears to be
    intoxicated), O. Reg. 746/21 s. 24 (immoderate consumption) and LLCA s. 52 (Family Law Act Part V
    action; compensation for injury or damage to others).
- AGCO, Tip sheet: responsible service in multi-room karaoke bars:
  https://www.agco.ca/en/alcohol/tip-sheet-responsible-service-multi-room-karaoke-bars
  - Fetched 2026-11-16. Intoxicated people not admitted or allowed to stay; capacities per area not
    combined; ID original only, no digital ID accepted in Ontario; the 2:00 a.m. end applies to staff
    too; consider not announcing last call; cannabis not smoked or vaped on patios or within 9 metres
    of them; disorderly conduct; training before working; licence conditions.
- AGCO, Information sheet: illegal liquor: https://www.agco.ca/en/alcohol/information-sheet-illegal-liquor
  - Fetched 2026-11-16. What counts as illegal liquor; infusing allowed if the customer is informed
    (s. 25(2)); sealed liquor patrons will take home (s. 39); bring-your-own wine (s. 35(5)); take
    home the rest; dispensing rules.
- AGCO, Information sheet: keep drugs out of your establishment:
  https://www.agco.ca/en/alcohol/information-sheet-keep-drugs-out-your-establishment
  - Fetched 2026-11-16. Controlled substances; behaviours to watch; suspected drink tampering:
    notify police.
- AGCO, Responsible liquor sale, service and delivery training: https://agco.ca/node/340646
  - Fetched 2026-11-16. Who must be trained; retail-only and delivery-only programs; Smart Serve
    the only program for the broader sector; renewal every five years (landing only).
- AGCO, Apply for a bring-your-own-wine endorsement:
  https://www.agco.ca/en/alcohol/apply-bring-your-own-wine-endorsement
  - Fetched 2026-11-16. Sealed commercially made wine only; staff open and serve it; banquet rooms
    seated and eating; not with a caterer's endorsement.
- AGCO, Special occasion permits: https://www.agco.ca/en/alcohol/special-occasion-permits
  - Fetched 2026-11-16. No permit for serving invited guests in your own home or a private place;
    a permit for selling alcohol at a private event, public events, charity events.
- AGCO, Sandy's Law warning sign:
  https://www.agco.ca/en/alcohol/signage-requirement-warning-sign-consumption-liquor-during-pregnancy-sandys-law
  - Fetched 2026-11-16. Warning that drinking during pregnancy causes FASD; English (may add
    French); at least 8 by 10 inches; where liquor is sold and served and in retail stores.
- AGCO, Four steps for a quick and easy AGCO inspection:
  https://www.agco.ca/en/alcohol/four-steps-quick-and-easy-agco-inspection
  - Fetched 2026-11-16. Inspections at any reasonable time; photos, samples, seizures; do not
    obstruct.
- AGCO, Convenience Store Licence Obligation Guide: https://www.agco.ca/en/book/export/html/398256
  - Fetched 2026-11-16. Second party purchasers; refusing a customer who is or appears intoxicated.
- AGCO, Liquor delivery service: https://www.agco.ca/en/alcohol/liquor-delivery-service
  - Fetched 2026-11-16. General Delivery Licence and Affiliate Delivery Licence (from 1 July 2026);
    neither lets the holder sell liquor.

## Official: alcohol and health (federal and provincial health authorities)

- Health Canada, Low-risk alcohol drinking guidelines:
  https://www.canada.ca/en/health-canada/services/substance-use/alcohol/low-risk-alcohol-drinking-guidelines.html
  - Fetched 2026-11-16. A Canadian standard drink is 17.05 mL or 13.45 g of pure alcohol: a 341 mL
    (12 oz) beer or cider at 5%, a 142 mL (5 oz) glass of wine at 12%, a 43 mL (1.5 oz) shot of
    spirits at 40%. Pregnant women should avoid alcohol.
- Canadian Centre on Substance Use and Addiction, Canada's Guidance on Alcohol and Health:
  https://www.ccsa.ca/canadas-guidance-alcohol-and-health
  - Fetched 2026-11-16. More than 2 standard drinks per occasion raises the risk of harm; 3 to 6 a
    week raises cancer risk; 7 or more raises heart disease and stroke risk; no known safe amount
    in pregnancy.
- HealthLinkBC (BC Ministry of Health), Alcohol use:
  https://www.healthlinkbc.ca/mental-health-substance-use/substance-use/alcohol-use
  - Fetched 2026-11-16. BAC rises with amount and speed; food slows absorption; smaller bodies and
    women's bodies (less water) reach a higher BAC; the liver breaks alcohol down; only time brings
    BAC back to zero.
- Criminal Code, s. 320.14(1)(b): https://laws-lois.justice.gc.ca/eng/acts/C-46/section-320.14.html
  - Fetched 2026-11-16. 80 mg of alcohol in 100 mL of blood within two hours of operating a
    conveyance.

## Not confirmed and left out

- Ontario e-Laws could not be read directly (bot wall). No question rests on a section the AGCO
  does not quote; LLCA s. 42 open-liquor rules and Highway Traffic Act novice and young driver
  alcohol rules are left out.
- Fines and penalty amounts, licence and course fees, minimum drink prices and the convenience
  store wine strength limit are left out (they change, and amounts are never asked).
- The certificate's five-year renewal and the test format are on the landing only (never asked).
- Smart Serve's own course content and module list are not public; the blueprint is Tigertest's,
  built from what the AGCO tells licensees and staff to know.
