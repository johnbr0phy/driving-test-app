# JNVST Class VI (`jnvst`) sources

## Pattern followed

**Navodaya Vidyalaya Samiti, Prospectus for Jawahar Navodaya Vidyalaya Selection Test 2027 (Class VI, session
2027-28)**, `https://cbseitms.rcil.gov.in/nvs/assets/pdf/Final_Prospectus_2027.pdf`, linked from the NVS admission
portal `https://cbseitms.rcil.gov.in/nvs/` (via https://navodaya.gov.in). Read in full text on 2026-10-31.

- Test date: 28 November 2026 for summer-bound and winter-bound JNVs, single phase. Last date to apply was
  31 July 2026. Timing 11:30 AM to 1:30 PM.
- Eligibility: studying in Class V for the whole 2026-27 session in a recognised school in the district (or NIOS 'B'
  certificate), having passed Classes III, IV and V; born between 01.05.2015 and 31.07.2017 (both inclusive). Once
  only. (Dates change every year; the landing says "check the current prospectus".)
- Composition (clause 5): 2 hours, 3 sections, objective only, 80 questions for 100 marks:
  Mental Ability Test and Environmental Studies (EVS) 20 + 20 questions, 25 + 25 marks, 60 minutes;
  Arithmetic Test 20 questions, 25 marks, 30 minutes; Language Test 20 questions, 25 marks, 30 minutes.
  One booklet for all sections; 40 minutes extra for Divyang students.
- Marking (clause 6): OMR sheet, four options with one correct, 1.25 marks per correct answer, no negative marking.
  Only a blue or black ball point pen on the OMR sheet; pencil not allowed (clause 6b).
- Clause 7: two hours without a break; minimum qualifying marks 14 in Mental Ability and EVS, 07 in Arithmetic and
  07 in Language; candidates are free to adjust the total time; a bell every 30 minutes. Tie-break by Mental Ability
  and EVS marks, then Arithmetic.
- Mental Ability: "This is a non-verbal test. Questions are based on figures and diagrams only." Five parts of 4
  questions each: I pattern completion (including alphabetical and number patterns), II figure series completion,
  III geometrical figure completion (triangle, square, circle), IV mirror and water imaging, V embedded figure.
- EVS (questions 21 to 40): 15 MCQs and one passage followed by 5 questions; themes: the natural world
  (transportation, rivers, mountains, plants and animals, natural disasters, houses, water cycle), the human body
  (food and nutrients, hygiene, super senses, digestive, circulatory, respiratory systems), science in daily life
  (food preservation, water and air pollution, conservation of water and soil), social surroundings (superlatives
  of India, states and capitals, national symbols, landscapes, festivals, seasons, forests, crops, clothes and fibres).
- Arithmetic topics: number system and number names, four operations on whole numbers, factors and multiples,
  fractions (addition and subtraction of like fractions and multiplication; unlike fractions and division of
  fractions not included), measurement of length, mass, capacity, time, money and unit conversion, simplification,
  perimeter and area (polygon perimeter, square, rectangle, triangle as part of a rectangle), types of angles with
  directions and mapping, data from bar diagrams, tables and pictographs.
- Language Test: reading comprehension, four passages each followed by 5 questions.
- Languages: the test is given in many languages, State/UT-wise (English and Hindi everywhere, plus regional
  languages; the prospectus table lists them). The medium chosen in the application cannot be changed.
- Seats: district-wise merit; at least 75% of a district's seats for rural candidates, at least one third girls,
  SC/ST/OBC reservation as per Government of India norms (OBC 27% for the Central list), Divyang reservation.

Cross-check: Careers360 news "JNVST 2027: NVS announces Class 6 admission schedule" (checked 2026-10-31,
https://news.careers360.com/jnvst-notiification-2027-out-class-6-navodaya-admission-2027-exam-date-eligibility-selection-process)
gives the same table (MAT and EVS 20 + 20) and qualifying marks. Some guide sites still show the older
40-question Mental Ability pattern without EVS; the 2027 prospectus is followed here.

## What the bank models and leaves out

- Two full 80-question tests in 2 hours in the real order (Mental Ability, EVS, Arithmetic, Language), one
  section with free movement (the real candidate can adjust time between sections), plus 45 drill-only items:
  205 items, all four-option single answer.
- Mental Ability is the one part that cannot be modelled faithfully: the real questions are pictures. The 20 per
  test here are text versions of the same reasoning (letter and number patterns, which Part I includes, plus
  mirror and water images of letters, digits, words and clocks, paper folding and punching, counting triangles
  and squares, symmetry, shape series described in words). The config directions, `scoreNote` and the landing say
  so and point to the NVS sample questions for the picture formats.
- EVS: 15 standalone items (8 natural and social world, 7 body and daily life) and one original passage of 5 per
  test, like the real part. Static facts only.
- Arithmetic follows the prospectus topic list; no unlike fractions or division of fractions.
- Language: four original passages per test (stories and short information texts), 5 questions each.
- Written for a Class 5 reader (about age 10 to 12): short stems, Indian names, rupees, metric units.
- The bank was checked against the SSC CGL, RRB NTPC, IBPS PO and CTET banks; items that tested the same fact or
  the same numbers (a CAT/DBU code, the 1, 4, 9, 16, 25 series, Z X V T, largest state by area, Bihu, smallest
  4-digit number from digits, LCM of 6 and 8, a 5-per-symbol pictograph with 7 symbols) were rewritten.

## Facts checked

- EVS facts are standard NCERT EVS (Classes 3 to 5, "Looking Around") and Class 6 social science content:
  national symbols (tiger, peacock, lotus), capitals (Dispur, Gangtok, Bhubaneswar), Gujarat's longest coastline,
  Goa the smallest state by area, Varanasi on the Ganga, Onam, Pongal, jute from the stem, igloos, Dal Lake
  houseboats, kunds in the Thar, the Chipko Movement (Reni, 1974, Gaura Devi), seed dispersal (madar, coconut,
  balsam).
- Darjeeling Himalayan Railway: 2 ft (610 mm) gauge, opened 1881, UNESCO World Heritage Site (1999). The passage
  says only "more than a hundred years ago".
- Every arithmetic answer was recomputed; February 2028 has 29 days (2028 is a leap year).

## Review pass (2026-11-01)

Re-downloaded the prospectus PDF from the URL above on 2026-11-01 and re-read clauses 5 to 7 and the sample
questions: test date 28 November 2026, 80 questions / 100 marks / 2 hours, 20 + 20 MAT and EVS in 60 minutes,
30 + 30 minutes for Arithmetic and Language, 40 minutes extra for Divyang students, 1.25 marks, no negative marking,
blue or black ball point pen, qualifying 14 / 07 / 07, bell every 30 minutes, tie-break MAT and EVS then Arithmetic,
EVS = 15 MCQs + one passage of 5, Language = four passages of 5, birth dates 01.05.2015 to 31.07.2017, at least 75%
rural and one third girls, OBC 27% (central list). All landing, config and examFacts figures match.
The official EVS sample passage (Ghadsisar lake, Jaisalmer) and Language sample (forests) are not reused.
Items rewritten in review because another bank in the wave tests the same fact with the same answer: longest
coastline (SSC CGL), smallest state by area (RRB Group D, SSC MTS), Pongal as Tamil Nadu's harvest festival
(RRB Group D), vitamin D from sunlight (SSC CHSL, SSC MTS), clock angle at 3 o'clock (SSC MTS), monsoon first
reaching Kerala (RRB NTPC), wheat as the winter crop (a rabi-crop item elsewhere). The coastline replacement also
avoids the east-coast ranking, which changed with the 2025 coastline re-measurement.
