# RPF Constable CBT (`rpfconst`) sources

All checked 2026-11-01.

## Pattern followed

**Railway Recruitment Boards, Centralised Employment Notice CEN RPF 02/2024 (Constable, Executive, in the Railway
Protection Force and Railway Protection Special Force), 4,208 posts.** The notice is hosted on every RRB site, for
example https://rrbcdg.gov.in/uploads/2024/RPF02-CONS/CEN%202024-02%20RPF-Const.pdf. The RRB hosts reset direct
connections from this environment (curl: connection reset; WebFetch: HTTP 503), so the notice was read through
search-engine extracts and the secondary pages below, not by opening the PDF.
Reviewer retry, 2026-11-01: the CEN PDF on rrbcdg.gov.in, the RRB Bhopal CEN page (rrbbhopal.gov.in/hcenrpf0224.htm),
RRB Secunderabad and RRB Chennai notices and the IIT Kanpur SATHEE pattern page all failed again (curl: connection
reset; WebFetch: HTTP 503); indianrailways.gov.in answers but does not host the CEN. A search extract of the CEN
itself confirms "Centralized Employment Notice No. RPF 02/2024", Constable (Executive), Level 3, age 18 to 28,
4,208 vacancies, a 22-page notice. The 50/35/35 split and the 35%/30% qualifying marks are still from guides only.

- CBT dates: 2 to 18 March 2025 (secondary reports; the RRB CDG exam-schedule PDF is listed at
  https://www.rrbcdg.gov.in/uploads/2024/RPF02-CONS/CEN%20RPF02-2024%20(Constable)%20-%20Exam-Schedule%20for%20CBT.pdf).
  Result and cut-offs reported 19 June 2025, with 42,143 candidates called to the PET and PMT
  (https://www.careerindia.com/news/rpf-constable-result-2025-declared-42-143-candidates-qualified-check-pet-pmt-details-051155.html).
  The final result was reported on 16 February 2026.
- **Negative marking: 1/3 mark for each wrong answer**, none for an unanswered question; marks normalised across
  shifts. Search extract of the official CEN text ("There will be negative marking (@1/3rd mark for every wrong
  answer) in CBT"; "Normalization of marks will be done for CBTs held in multiple shifts"). Explained in the copy
  only (landing FAQ, section directions, `scoreNote`); the app scores percent correct.
- **120 questions, 120 marks, 90 minutes; General Awareness 50, Arithmetic 35, General Intelligence and Reasoning 35.**
  Not read in the CEN itself; given identically by Oliveboard (https://www.oliveboard.in/rpf-constable-exam-pattern/,
  fetched), Khan Global Studies (https://www.khanglobalstudies.com/blog/rpf-constable-syllabus-and-exam-pattern/,
  fetched), Sarkari Network and Sakshi Education (search results). Labelled "as reported by guides" where the landing
  states the split.
- **Minimum qualifying marks: 35% for UR, EWS and OBC (non-creamy layer), 30% for SC and ST** (search extract of
  an aglasem summary of the CEN, https://career.aglasem.com/railway/rpf-constable/syllabus, which blocks direct
  fetching). Labelled "guides report" in the copy.
- Selection: CBT, then the Physical Efficiency Test and Physical Measurement Test (qualifying, no marks), document
  verification and a final merit list on CBT marks (Oliveboard; aglasem extract "this exam stage is qualifying in
  nature and therefore, no marks will be awarded in PET/PMT"). PET standards per Oliveboard (men: 1,600 m in 5 min
  45 s, long jump 14 ft, high jump 4 ft; women: 800 m in 3 min 40 s, long jump 9 ft, high jump 3 ft); mentioned only
  generally in the copy, not as figures.
- Syllabus (guides, from the CEN annexure): General Awareness: current affairs, general knowledge, Indian history,
  art and culture, geography, polity, sports, general science. Arithmetic: number system, simplification, decimals
  and fractions, LCM and HCF, ratio and proportion, percentage, mensuration, time and work, time and distance,
  simple and compound interest, profit and loss, algebra, geometry, trigonometry, elementary statistics, probability,
  data interpretation. General Intelligence and Reasoning: analogies, similarities and differences, spatial
  orientation, problem solving, decision making, relationships, arithmetical reasoning, verbal and figure
  classification, number series, non-verbal series, coding and decoding, syllogistic reasoning, statement and
  conclusion.

## The next recruitment

As of 1 November 2026 no new RPF Constable notice had been published. Coaching sites (Physics Wallah, Oliveboard)
say the next drive may be run by the Staff Selection Commission rather than the RRBs, but no official notice or SSC
calendar entry confirms this (search of the SSC 2026-27 calendar coverage, 2026-11-01). The copy says only that the
next notice has not been published and that its body and pattern should be checked when it appears.

## What the bank covers and leaves out

- Two practice tests of 100 questions in 75 minutes, the real pace (45 seconds a question) and the real subject
  balance (General Awareness 42, Arithmetic 29, Reasoning 29), grouped in that order, plus 32 drill-only items: 232
  four-option single-answer items. The real paper is 120 questions in 90 minutes; this is said in `scoreNote`, the
  section directions and on the landing.
- General Awareness is static facts only, with general science included as the guides list it. No current
  affairs, no office-holders, no award winners of a given year, no money figures.
- Reasoning is text only: no figure series, mirror images, embedded figures or Venn diagram pictures.
- Indian English, rupee amounts in arithmetic, Indian names.
- Every item is original. The bank was checked by script against every India bank in `data/v2/` (ssccgl, rrbntpc,
  ibpspo, ctet, rrbgroupd, sscgd, sscchsl, sscmts, uppolice, ibpsclerk, jnvst, sbiclerk, sbipo, ibpsrrb,
  biharpolice, rajpolice, delhipolice, mppolice, and the batch 3 banks present on 2026-11-01: upscse, nda, agniveer,
  agniveervayu, rrbalp, ssccpo, plus phcse) by stem similarity, numbers and keyed fact; about 150 items were
  rewritten while writing (the static GA facts in the family overlap heavily, so most GA items use less common
  facts: lakes, passes, dams, railway factories and hill lines, regional revolts and festivals). What remains shares
  only generic templates with different numbers or content (a clock angle at another time, a syllogism with other
  terms).

## Facts checked

- Calendar: 1 January 2026 is a Thursday, so 2 October 2026 is a Friday and 2 November 2026 a Monday; the next year
  with the 2026 calendar is 2037 (non-leap, starts Thursday).
- Constitution: Articles 48A (environment), 78 (PM's duty to inform the President), 85 (summoning), 343 (official
  language), against the Constitution of India text (legislative.gov.in).
- Railways: East Central Railway HQ Hajipur, South East Central Railway HQ Bilaspur (indianrailways.gov.in zone
  list); Konkan Railway Roha to Thokur; Rail Coach Factory Kapurthala; Banaras Locomotive Works Varanasi; Rail Wheel
  Factory Yelahanka; Kalka-Shimla, Nilgiri and Matheran lines; broad gauge 1,676 mm; Fairy Queen built 1855; National
  Rail Museum New Delhi (1977). RPF Act, 1957; RPF under the Ministry of Railways.
- Science to school level (NCERT classes 6 to 10).
