# Sources for `zasaps` (SAPS police trainee recruitment assessment)

All 200 questions are original: fictional people, places and incidents in a South African setting,
British/South African spelling, rand and metric units. No past paper, SAPS sample or commercial
app was opened for its questions. Checked 2026-11-05.

## Official SAPS sources (fact-check, 2026-11-05)
saps.gov.za sends its certificate without the Sectigo intermediate. TLS verification was kept on:
the missing intermediate ("Sectigo Public Server Authentication CA OV R36") was fetched from
Sectigo's own AIA URL (http://crt.sectigo.com/SectigoPublicServerAuthenticationCAOVR36.crt,
issued by Sectigo Root R46) and added to the CA bundle, after which the pages below verified and
loaded. https://www.saps.gov.za/careers/ (the directory) answers 403; the careers pages are the
.php URLs below. Web search was unavailable (turn budget used up).
- SAPS, "Vacancies for entry level police trainees: 2026/2027", reference TRA26/27, closing date
  13 November 2026, read 2026-11-05:
  https://www.saps.gov.za/careers/downloads/2026/trainee/Police-Trainee-Advert-2026-2027.pdf .
  Confirms (landing FAQs 1, 3, 4, study tip 4; examFacts in WIRING.md): SA citizenship; 18 to 35
  at the closing date; Grade 12 or equivalent; proficiency in English and one other official
  language; physical and medical examination; "psychological and integrity assessment"; "fitness,
  psychometric and integrity testing as well as medical evaluation", interview (short-listed
  applicants), vetting with security screening, reference checks, social media and fingerprint
  verification, background enquiries and a buccal sample; fitness assessment only with BMI <= 30
  and waist <= 102 cm (men) / 90 cm (women); no criminal convictions or pending cases; no tattoos
  visible in uniform; basic training "at any SAPS Training Academy"; online application through
  the e-Recruitment system; "Applicants are cautioned not to pay any fee". It gives NO question
  count, time limit, pass mark or content for the psychometric test, so those stay "not
  published", and the literacy, numeracy and reasoning content stays labelled "guides describe"
  (no official description of the test's content was found; not confirmable officially).
- SAPS Police Trainees page, read 2026-11-05: https://www.saps.gov.za/careers/ptrainees.php
  (lists the TRA26/27 advertisement, stipend R5000 a month, closing 2026/11/13). Used as the
  examFacts source URL in WIRING.md in place of the 403 directory URL /careers/.
- SAPS e-Recruitment FAQ 21, read 2026-11-05: https://www.saps.gov.za/careers/faq21.php ("No,
  there will be no costs involved by the applicant in the recruitment process"). Confirms
  "Free to apply".
- SAPS, 2024 Practical Guide: Community Policing, read 2026-11-05:
  https://www.saps.gov.za/services/downloads/2024-Practical-Guide-Community-Policing.pdf .
  Confirms RDG-002: sector policing divides a station's area into manageable sectors; a sector
  commander is appointed (one may manage all the sectors); objectives include bringing the police
  closer to the community. RDG-002's passage was reworded from "each with its own sector
  commander" to "managed by a sector commander" to match.
- Second-Hand Goods Act 6 of 2009 (Government Gazette 32087), SAPS copy, read 2026-11-05:
  https://www.saps.gov.za/resource_centre/acts/downloads/juta/shg_act_6_2009.pdf . s. 21(2)(a)(iii):
  a dealer's register must record the identity number of the person from whom goods are acquired
  (confirms RDG-016; s. 25 brings recyclers of controlled metal under the Act). s. 1 defines the
  IMEI as the International Mobile Equipment Identity "that uniquely identifies mobile
  communication equipment" (used in the rewritten RDG-006).
- SAPS, "Report sexual offences", read 2026-11-05:
  https://www.saps.gov.za/services/report_sexual_offence.php ("a docket must be opened,
  registered on the CAS"). Supports the word "docket" in the replacement VRB-003.

## Items rewritten because their real-world claim could not be confirmed officially (2026-11-05)
- RDG-006: the "15-digit" IMEI and "blacklisted phones cannot connect in South Africa" were not
  confirmed; the passage now says only what the Second-Hand Goods Act defines (the IMEI uniquely
  identifies the handset) plus advice to note it. Key unchanged ("It identifies the handset").
- RDG-009: "rural safety plans" made a fictional farm watch (Doringkloof); key unchanged.
- RDG-010: "eleven police agencies before 1995" (Wikipedia only) replaced by a fictional station
  merger (Ndlovu Valley); key unchanged ("More focus on human rights").
- RDG-013: victim-friendly rooms at police stations in general not confirmed officially; now one
  fictional station's new room (Mzamomhle Heights); key unchanged.
- RDG-014: the Comrades Marathon / R103 closure (real names) replaced by a fictional race and
  places (Valley Ultra, Kwaggasdrift, Bloemhof Ridge); key unchanged.
- RDG-019: smoke-alarm intervals are now the instructions on one alarm's box (fictional product
  text), not general guidance; key unchanged ("Once a month").
- RDG-027: "banks never ask for a PIN" is now one fictional bank's own warning (Imvula Bank); key
  unchanged ("Refuse and end the call").
- RDG-031: "a dark traffic light is a four-way stop" could not be checked against the National
  Road Traffic Regulations (gov.za and transport.gov.za reset the connection); replaced by a
  fictional municipal notice about a pointsman at a dark intersection, key "Follow the
  pointsman's signals".
- VRB-003: the SAPS rank classification (commissioned vs non-commissioned) was not found on an
  official page (the SAPS rank page 404s); replaced by "witness, complainant, suspect, docket"
  (key "Docket").

## Other passages
All other reading passages are fictional notices and scenarios that make no real-world claim
beyond the passage itself.

## Arithmetic
Every numeric key was recomputed by hand while writing (see the explanation of each item); all
keys sit in rotation A, B, C, D by `build.py`, so no sorting can move a key.

## Duplicates
Grepped (stem similarity >= 0.8 and identical number sets) against every `data/*-questions.json`
on disk on 2026-11-05, including the batch-3 siblings already written (ppsc, punjab-police,
pak-army, paf-airman) and nigeria-police, police-exam, philippines-napolcom, afpsat, nigerian-army,
nigeria-customs, cdcfib, trcn-pqe. Thirteen items that shared a number set or a stem pattern
(18% of 650, 45 x 32 m, 2.4 km in 12 min, CAT/DOG = 24/26, 81-27-9-3, 7th/12th in a queue,
20-21-29 triangle, AZ-BY-CX-DW, 6 km north/right/right, two folds and a punch, 35% of 460,
45-degree arrow) were rewritten with new numbers.
