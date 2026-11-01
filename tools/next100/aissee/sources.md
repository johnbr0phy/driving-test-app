# AISSEE Class VI (`aissee`) sources

## Pattern followed

**National Testing Agency, Information Bulletin, All India Sainik Schools Entrance Examination (AISSEE) 2026**,
`https://cdnbbsr.s3waas.gov.in/s388a839f2f6f1427879fc33ee4acf4f66/uploads/2025/10/20251010937989896.pdf`, linked as
"Information Bulletin" from NTA's AISSEE page `https://exams.nta.nic.in/sainik-school-society/`. Downloaded and read in
full text on 2026-11-01.

- Conducting body: NTA, for the Sainik Schools Society (Ministry of Defence). Admission to Class VI and Class IX of the
  33 Sainik Schools, Class VI of the 69 approved New Sainik Schools and Class IX of 19 of them, academic year 2026-27.
- Date: "In the month of January, 2026". The NTA page lists the result notices "AISSEE - 2026 Exam Held On
  18.01.2026" (checked 2026-11-01).
- Duration (4.3): Class VI 150 minutes, 2:00 pm to 4:30 pm.
- Mode (4.4.1, 4.4.2): paper and pencil on OMR answer sheets; multiple choice questions.
- Scheme for Class VI (4.4.3.1): Section A Language 25 questions x 2 marks = 50; B Mathematics 50 x 3 = 150;
  C Intelligence 25 x 2 = 50; D General Knowledge 25 x 2 = 50; total 125 questions, 300 marks.
- 4.4.4: "There is no negative marking for a wrong response."
- Medium (4.5.2): Class VI in 13 languages (English, Hindi, Assamese, Bengali, Gujarati, Kannada, Malayalam, Marathi,
  Odiya, Punjabi, Tamil, Telugu, Urdu); English or Hindi candidates get a bilingual booklet; regional language booklets
  also carry English. Class IX is English only.
- Eligibility (5.1.1): Class VI candidates aged 10 to 12 on 31 March 2026 (born 01.04.2014 to 31.03.2016). Girls may
  apply for Class VI. (Dates change every year; the landing does not give them.)
- Passing marks (5.2.1, table in chapter 2): existing Sainik Schools, minimum 25% in each subject and 40% in aggregate;
  no minimum for SC and ST candidates there. Approved New Sainik Schools: 25% in each section and 40% aggregate for all
  candidates including SC and ST.
- Merit (chapter 2 and 6.1.1.2): school-wise, class-wise, gender-wise, category-wise merit lists within Home State and
  Other State quotas, then e-counselling, medical fitness and documents.
- Reservation (6.2, existing schools): 67% of seats for the home state or UT, 33% for other states; within each, 15% SC,
  7.5% ST, 27% OBC-NCL (central list), and 25% of the remaining seats for wards of defence personnel and ex-servicemen
  (subject to an appeal before the Madras High Court, Madurai Bench, noted in the bulletin). Girls: 10% of the Class VI
  strength or 10 seats, whichever is higher, in schools that admit girls (6.2.5). Not modelled; mentioned only in
  general terms.
- Appendix II, topics for Class VI:
  - Mathematics (50 questions, 150 marks): natural numbers, LCM and HCF, unitary method, fractions, ratio and proportion,
    profit and loss, simplification, average, percentage, area and perimeter, simple interest, lines and angles,
    complementary and supplementary angles, conversion of units, Roman numerals, types of angles, circle, volume of cube
    and cuboids, prime and composite numbers, plane figures, decimal numbers, speed and time, operation on numbers,
    temperature, arranging of fractions.
  - Intelligence (25, 50 marks): analogies (mathematical and verbal), pattern (spatial and mathematical),
    classification, visual and logical reasoning, series and sequences, critical thinking and problem solving, familial
    relations.
  - Languages (English, Hindi or regional; 25, 50 marks): comprehension passage, preposition, article, vocabulary,
    verbs and type, confusing words, question tags, types of sentence, tense forms, kinds of nouns, kinds of pronouns,
    correct spelling, ordering of words in a sentence, sentence formation, antonyms, synonyms, adjectives, interjection,
    idioms and phrases, collective nouns, number, gender, adverbs, rhyming words, singular/plural. "Questions in the
    language(s) section will be based on topics dealt till Class V."
  - General Knowledge (25, 50 marks): national symbols of India; India at a glance; art and culture (monuments, dance,
    music, religion, language, food and dress); Indian literary and cultural awards (current); national and
    international personalities and achievements (current); Indian defence system; sports; national and international
    organizations; solar system and our Earth; mountain terrain and lifestyle; water cycle, evaporation and
    condensation; energy (renewable and non-renewable); climate (earthquake, flood and natural calamities); use of water
    in daily life; tasting, digestion and food preservation; life of farmers, farming techniques, seed germination and
    dispersal; tribal communities and forest; scientific devices used in daily life; water pollution and microbial
    diseases; relationship between humans and animals; functions of plant, animal and human; super senses and young
    ones of animals.

## The 2027 cycle

On 2026-11-01 the NTA AISSEE page still listed only the AISSEE-2026 bulletin and notices; no AISSEE-2027 information
bulletin was posted. Guides (Careers360, "Sainik School Exam Date 2027", updated 2026-10-27,
https://school.careers360.com/articles/sainik-school-exam-date-2027) report the 2027 exam on 31 January 2027 and
registration expected from October or November 2026; this is unconfirmed and is not stated on the landing or in the
config. The landing tells readers to check the AISSEE-2027 bulletin when NTA publishes it.

Cross-check of the Class VI pattern: Careers360 news on AISSEE 2026 answer keys and marking scheme
(https://news.careers360.com/aissee-2026-sainik-school-answer-key-soon-objection-process-marking-scheme-class-6-9-tentative-scores-final-result-admission,
checked 2026-11-01) gives the same 125 questions, 300 marks and no negative marking.

## What the bank models and leaves out

- Two mock tests of 100 questions in 120 minutes: the real pace (150 minutes for 125 questions is 1.2 minutes each) and
  the real proportions and order (Language 20, Mathematics 40, Intelligence 20, GK 20). Two full-length tests of 125
  would need 250 items before any drill items; the shorter length is said in the config directions, `scoreNote` and
  the landing FAQ.
- One section, free movement and flagging, no break: the real paper is one booklet with one clock.
- Scored as percent correct. The real paper weights Mathematics at 3 marks a question (half the marks); `scoreNote`
  explains it.
- Language items are in English only (the real paper offers 13 languages). Two reading passages per test and one
  drill-only passage, plus grammar and vocabulary items from the topic list.
- Intelligence: "pattern (spatial)" and "visual reasoning" are pictures on the real paper; they are written in words
  here (counting triangles, painted cubes, directions).
- General Knowledge: static facts only. The two "(current)" topics (awards and personalities of the year) are not
  modelled, nor are people in office. Only the facts of the defence forces that do not change (days, academies, rank
  equivalents, the BSF's role).
- 237 items, all four-option single answer like the real OMR paper.

## Facts checked

- National Heritage Animal: the elephant, declared in October 2010 (the Ganges river dolphin, national aquatic animal
  since 2009, appears only in the explanation). India Gate on Kartavya Path, New Delhi, a memorial to Indian soldiers
  who died in the First World War and the wars of that time. Dhokla (Gujarat), steamed gram-flour snack. Chess knight
  moves in an L and is the only piece that jumps. A baby kangaroo is a joey. Earth's year about 365 days; oceans
  cover about 71 percent of its surface. Curd is set by lactic acid bacteria. Satyameva Jayate, from the Mundaka Upanishad, below the
  State Emblem. National calendar based on the Saka era, adopted 1957, first month Chaitra. National tree banyan. Flag
  bands saffron, white, green.
- Navy Day 4 December (1971 attack on Karachi), Army Day 15 January, Air Force Day 8 October (IAF formed 8 October
  1932). NDA at Khadakwasla, Pune; IMA Dehradun; Indian Naval Academy Ezhimala; Air Force Academy Dundigal. General,
  Admiral and Air Chief Marshal are equal ranks. BSF guards the Pakistan and Bangladesh borders; Assam Rifles the
  Myanmar border.
- National Sports Day, 29 August, Major Dhyan Chand's birthday; Olympic hockey golds 1928, 1932, 1936. Team sizes:
  volleyball 6, kabaddi 7, hockey 11 (in explanations). Carrom striker and coins. Kabaddi raider.
- Phulkari (Punjab), Ghoomar (Rajasthan), mekhela chador (Assam), living root bridges of the Khasi and Jaintia people
  (Meghalaya), Victoria Memorial (Kolkata, opened 1921), Golconda Fort (Hyderabad), Konark Sun
  Temple facts in the drill passage (13th century, Narasimhadeva I of the Eastern Ganga dynasty, 24 wheels, 7 horses,
  sundial wheels, 'Black Pagoda', UNESCO World Heritage Site).
- UNICEF works for children; Red Cross founded by Henry Dunant after Solferino (1859); ISRO headquarters Bengaluru,
  launches from Sriharikota, VSSC at Thiruvananthapuram.
- Olive Ridley turtles: mass nesting (arribada, Spanish for 'arrival') at Gahirmatha and Rushikulya in Odisha, nests dug
  with the hind flippers, about 100 eggs, about 45 to 60 days to hatch ("about seven weeks"), hatchlings head for the
  brightest horizon and are misled by artificial light.
- Fireflies are beetles (family Lampyridae); light from luciferin oxidation is almost heatless ("cold light"); species-
  specific flash patterns attract mates; decline linked to light pollution and habitat loss.
- Toda people of the Nilgiri Hills, buffalo herders, barrel-roofed huts (munds). Malaria by female Anopheles, dengue by
  Aedes. Pitcher plants get nitrogen from insects. Neptune's orbit about 165 years. Venus hotter than Mercury.
- Every arithmetic answer was recomputed in the build review; all-number options are sorted and locked by `build.py`,
  and the key sits in an end slot in about half of them.

## Overlap check (2026-11-01)

Every stem was compared with all India banks present in `data/v2/` (ssccgl, rrbntpc, ibpspo, ctet, rrbgroupd, sscgd,
sscchsl, sscmts, uppolice, ibpsclerk, jnvst, sbiclerk, sbipo, ibpsrrb, biharpolice, rajpolice, delhipolice, mppolice,
upscse, nda, agniveer, agniveervayu, rrbalp, rpfconst, ssccpo, and the batch 4 banks present at the time: jeemain,
cuet, reet, uptet, ugcnet) plus phcse and phlet, by normalised stem, same key with shared content words, and same number
sets. About 60 items that repeated another bank's fact and answer or its numbers were rewritten (e.g. the 2, 5, 11, 23,
47 series, 7 : 50 :: 9, Wednesday + 45 days, the Supreme Commander, Kuchipudi, Gol Gumbaz, Charminar, Hawa Mahal,
Durand and Santosh trophies, kabaddi and volleyball team sizes, barometer, Kanyakumari, the Red Planet, LCM 12 and 15,
radius 7 circumference, 8 workers and 15 days). What remains in common is generic: the same calendar or percentage
method with different numbers, or a common grammar rule. Banks of this batch written at the same time should be
re-checked by the reviewer.

## Reviewer pass (2026-11-01)

- NTA AISSEE page `https://exams.nta.nic.in/sainik-school-society/` re-fetched 2026-11-01 (page stamp 2026-10-31):
  still only AISSEE-2026 notices (results of the exam held on 18.01.2026, score cards, final answer keys) and the
  2026 Information Bulletin; no 2027 bulletin or notice. `https://exams.nta.ac.in/AISSEE/` returned HTTP 503 and a
  certificate error. A web search found only guides projecting the 2027 cycle (form in October or November 2026, exam
  in January 2027, one giving 31 January 2027); none cites an NTA notice, so the bank, config and landing stay on the
  AISSEE-2026 pattern and keep telling readers to check the 2027 bulletin.
- Re-checked every stem against all India banks in `data/v2/` (including the batch 4 banks cuet, reet, uptet,
  ugcnet, jeemain, neet, mhtcet), the US school banks, phcse, phlet and the LTO bank: by normalised text, identical
  number sets, same key with shared content words, and the key appearing in another bank's stem (reversed
  questions). 21 items that repeated another bank's fact and answer or its numbers were rewritten in place (same ids).

