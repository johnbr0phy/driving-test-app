# Home Health Aide (HHA) bank sources

All 200 questions are original, written for Tigertest from the federal rule, the official state
candidate handbook's content outline and skills listing, and the CDC pages below. None is copied,
adapted or reworded from any state or vendor sample question, practice test, agency competency
test (such as the North Carolina in-home aide knowledge tests or the OAHC test) or prep site.

PDFs were downloaded with curl into the session scratchpad and read as text with pypdf. The local
python3 is 3.9: `build.py` starts with `from __future__ import annotations` so it needs no newer
syntax.

## Outline (federal rule and the state program that publishes a written outline)

- eCFR, 42 CFR 484.80 Condition of participation: Home health aide services (as amended 86 FR
  62421, Nov. 9, 2021), read through the eCFR versioner API on 2026-11-19 (fetched 2026-11-19):
  https://www.ecfr.gov/api/versioner/v1/full/2026-11-01/title-42.xml?part=484&section=484.80
  Gave: the subjects a training program must cover, (b)(3)(i) to (xv); the competency evaluation
  rule, (c): every subject must be evaluated, communication, temperature-pulse-respiration,
  personal hygiene, transfers and range of motion only by watching the aide with a patient or
  pseudo-patient, the rest by written or oral exam or observation; an "unsatisfactory" task may
  not be done without direct RN supervision until retrained and re-evaluated; more than one
  unsatisfactory area is a fail. Also: at least 75 hours of training with 16 classroom hours
  before 16 supervised practical hours; 12 hours of in-service training every 12 months; a
  24-month lapse without paid aide work means a new program; RN or skilled professional assigns
  the aide with written care instructions; duties (hands-on personal care, simple procedures as
  an extension of therapy or nursing, help with walking or exercises, help with medications
  ordinarily self-administered); aides report changes to the RN or skilled professional;
  supervisory assessments every 14 days (skilled patients) or every 60 days (aide-only patients).
- District of Columbia Department of Health and Board of Nursing, Home Health Aide Candidate
  Handbook (Pearson VUE edition), fetched 2026-11-19:
  https://doh.dc.gov/sites/default/files/dc/sites/doh/publication/attachments/2017%20HHA%20Candidate%20Handbook.pdf
  Content outline of the HHA written examination: I Role of the Home Health Aide 25%, II Physical
  Care 50%, III Psychosocial Care 13%, IV Personal and Household Maintenance Activities 12%, with
  the topics under each. The skills listing (hand hygiene, knee-high elastic stocking, ambulation
  and bed-to-wheelchair transfer with a transfer belt, bedpan, denture care, radial pulse and
  respirations counted for a full minute, dressing a client with a weak arm, feeding, modified
  bed bath, urinary output, weight, passive range of motion of the knee, ankle and shoulder,
  positioning on the side, catheter care, foot care, mouth care, perineal care) gave the
  procedure facts used in the personal care and mobility categories.
- Credentia, DC Home Health Aide help center (the current DC vendor), fetched 2026-11-19:
  https://kb-dchha.credentia.com/en/article/content-outline-home-health-aide
  Same four areas and percentages (25/50/13/12). This page says the written exam is seventy-five
  (75) multiple-choice questions; the help center's exam overview page still says seventy (70):
  https://kb-dchha.credentia.com/en/article/exam-overview (fetched 2026-11-19). The copy says
  "70 to 75" and names DC as one example.
- Credentia, DC HHA exam results, fetched 2026-11-19:
  https://kb-dchha.credentia.com/en/article/exam-results
  Written exam reported as pass or fail with no published passing score; skills need
  Satisfactory on all five; three attempts; both parts passed within 24 months.

## Format and pass mark

- No national written HHA test exists: 42 CFR 484.80(c)(2) lets any organization offer the
  competency evaluation, run by a registered nurse, and states and agencies set their own. DC
  (above) publishes its outline but no passing score.
- North Carolina DHHS, In-Home Aide Services Competency Testing Tools, directions for the
  knowledge-based test, fetched 2026-11-19: https://ncdhhs.gov/documents/files/guide/open
  "Recommended minimum passing score: 80% of all questions are correctly answered"; the test may
  be given orally or in writing. (Only the directions were used; the NC test items themselves
  were not.)
- Oregon Association for Home Care, 2024 Home Health Aide Exam testing instructions, fetched
  2026-11-19:
  https://oahcmail.memberclicks.net/assets/HomeHealthAideExam/2024%20Home%20Health%20Aide%20Exam%20Testing%20Instruction.pdf
  An agency-administered tool: two hours, 80% on each section. A trade association, used only
  to show how agency tests are scored.
- So Tigertest uses 80% as a readiness line, not a pass mark, and says so.

## Patient rights, care planning, infection control and safety

- eCFR, 42 CFR 484.50 Patient rights, fetched 2026-11-19:
  https://www.ecfr.gov/api/versioner/v1/full/2026-11-01/title-42.xml?part=484&section=484.50
  Respect for property and person; freedom from abuse, neglect and misappropriation; complaints;
  the right to refuse care; a confidential record; staff must report suspected abuse, neglect or
  misappropriation immediately to the HHA and authorities per state law; language services.
- eCFR, 42 CFR 484.60 Care planning, coordination of services, and quality of care, fetched
  2026-11-19:
  https://www.ecfr.gov/api/versioner/v1/full/2026-11-01/title-42.xml?part=484&section=484.60
  Individualized plan of care reviewed at least every 60 days; drugs and treatments only as
  ordered; written visit and medication schedule given to the patient.
- eCFR, 42 CFR 484.70 Infection prevention and control, fetched 2026-11-19:
  https://www.ecfr.gov/api/versioner/v1/full/2026-11-01/title-42.xml?part=484&section=484.70
  Standard precautions; infection control education for staff, patients and caregivers.
- CDC, Clinical Safety: Hand Hygiene for Healthcare Workers, fetched 2026-11-19:
  https://www.cdc.gov/clean-hands/hcp/clinical-safety/index.html
  Alcohol-based sanitizer preferred unless hands are visibly soiled; about 20 seconds until dry;
  soap and water when soiled, after the restroom and in C. difficile or norovirus outbreaks;
  gloves never replace hand hygiene; nails no longer than the fingertip.
- CDC, Standard Precautions for All Patient Care, fetched 2026-11-19:
  https://www.cdc.gov/infection-control/hcp/basics/standard-precautions.html
- CDC, Older Adult Falls Facts, fetched 2026-11-19:
  https://www.cdc.gov/falls/data-research/facts-stats/index.html
  Modifiable risks: weakness, medicines such as sedatives, vision, footwear, home hazards such as
  throw rugs and clutter; anyone on blood thinners who hits their head needs to be seen.
- CDC, Four Steps to Food Safety, fetched 2026-11-19:
  https://www.cdc.gov/food-safety/prevention/index.html
  Poultry 165°F, ground meat 160°F, leftovers 165°F; refrigerator 40°F or below; 2-hour rule (1
  hour above 90°F); thaw in the refrigerator, cold water or microwave, never on the counter.
- FDA, Are You Storing Food Safely?, fetched 2026-11-19:
  https://www.fda.gov/consumers/consumer-updates/are-you-storing-food-safely
- NIDDK (NIH), Diabetes and Foot Problems, fetched 2026-11-19 (second review):
  https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/foot-problems
  "Have a foot doctor trim your toenails if" the person cannot see, feel or reach her feet, or
  the nails are thick or yellowed. Source for HHA-PER toenail item (key: a foot doctor).
- MedlinePlus, Using oxygen at home, fetched 2026-11-19:
  https://medlineplus.gov/ency/patientinstructions/000049.htm
  No smoking where oxygen is used, no petroleum-based creams on the face, keep away from flames
  and heaters.

## Left out

- Fees, state training hours above the federal 75, state registry rules, abuse-report deadlines
  and who must be told: these vary by state and are worded "per state law" where needed.
- The oxygen distance from flames: MedlinePlus says 6 feet, NFPA copies 5 feet, some states 10
  feet, so no number is asked.
- Normal vital sign ranges beyond basic recognition, and any medication dosing: aides only help
  with self-administered medications.
- The skills evaluation itself is not modelled; the procedure facts it lists are asked as
  knowledge.
- Nothing about the test format is asked; it is on the landing page only.
