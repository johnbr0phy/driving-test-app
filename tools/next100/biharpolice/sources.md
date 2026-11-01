# Bihar Police Constable (`biharpolice`) sources

All checked 2026-11-01.

## Who runs it and the current recruitment (official)

- **Central Selection Board of Constable (CSBC), Bihar** (केन्द्रीय चयन पर्षद (सिपाही भर्ती)), Home Department
  (Police Branch), Government of Bihar, 05 Harding Road, Patna. Site: https://csbc.bihar.gov.in . The home page
  (fetched 2026-11-01) lists the constable advertisements and notices below.
- **Advertisement No. 01/2025** (dated 11-03-2025), "Constable" (सिपाही) in Bihar Police and Bihar Special Armed
  Police, **19,838 posts**, online applications 18-03-2025 to 18-04-2025 (later extended, notice of 16-04-2025).
  PDF: https://csbc.bihar.gov.in/Advt/Advt-01-2025-Constables.pdf (14 pages, Hindi in a legacy Kruti Dev font,
  read by hand after `pdftotext`). Section on the selection process (page 5) says:
  - Stage 1, written exam: level of Class 10 (Matric) of the Bihar School Examination Board or equivalent.
    Objective questions on 1. Hindi, 2. English, 3. Mathematics, 4. Social Science (History, Geography, Civics,
    Economics), 5. Science (Physics, Chemistry, Zoology, Botany), 6. General Knowledge and Current Affairs. The
    detailed syllabus is on the board's website (none is posted for Advt. 01/2025; only a 2020 syllabus file).
  - 100 marks: one question paper of two hours with 100 questions, **one mark for each correct answer**. OMR-sheet
    based. The advertisement mentions no deduction for wrong answers.
  - Multi-shift exams are normalised by the equi-percentile method.
  - Candidates scoring **less than 30%** in the written exam are declared unsuccessful for the physical test.
  - About **5 times** the vacancies in each reservation category are called to the physical efficiency test (PET)
    on written marks; all candidates tied at the cut-off go through.
  - **The written exam is not the basis of the final merit list; it is qualifying only** for the PET.
  - Stage 2, PET of 100 marks (running, high jump, shot put; each must be passed separately); height and chest/weight
    are measured but carry no marks. The final merit list is prepared on the total PET marks.
  - No subject-wise question counts are given.
  - Re-read in review on 2026-11-01 (PDF downloaded again, Kruti Dev text decoded by hand): section (क)(ii)-(vi)
    confirms 100 marks, one 2-hour paper of 100 questions, one mark per correct answer, OMR, under 30% unsuccessful,
    5 times the vacancies per category called to the PET, written exam qualifying only. No deduction is mentioned.
- **Notice of 12-06-2025** for Advt. 01/2025, https://csbc.bihar.gov.in/Advt/Notice%20-%2012-06-2025.pdf : written
  exam on 16, 20, 23, 27, 30 July and 3 August 2025, one shift a day, 12:00 to 14:00 (two hours), in 38 districts.
- Later milestones on the home page: written results for PET shortlisting 26-09-2025, final selection list
  27-05-2026, provisional selection notices to 25-09-2026.
- Newer CSBC advertisements are for other cadres (01/2026 Special Branch constable, 02/2026 Constable (Operator)),
  not the general constable post. As of 2026-11-01 no newer general constable advertisement was found on the site.

## Secondary sources (used only where labelled)

- Negative marking: the advertisement mentions none, and most guides say there is none
  (https://biharhelp.in/bihar-police-constable-exam-pattern-2025/ , https://mycoaching.in/sarkari/bihar-police-constable-csbc-exam-pattern-syllabus-2025).
  One news article (Free Press Journal, 15 July 2025,
  https://www.freepressjournal.in/education/bihar-police-constable-exam-2025-begins-tomorrow-check-timing-pattern-and-dos-donts)
  says a quarter mark is deducted. The copy says the advertisement gives one mark per right answer and mentions no
  deduction, and to check the next advertisement. The app scores percent correct.
- Language: guides say the paper is in Hindi and English (bilingual) except the language parts. Not stated in the
  advertisement; the copy does not assert it.
- Subject weights: the board publishes none. Careers360 exam analysis of 16 July 2025
  (https://competition.careers360.com/articles/bihar-police-constable-exam-analysis) gives only difficulty levels and
  "good attempts", suggesting GK and social science carry the most questions.

## Modelling decisions

- Real length 100 questions in 2 hours, modelled at the full length and time (no cut needed).
- Per test, Tigertest's own split (the board publishes none): Hindi 15, English 15, Mathematics 15, History and
  Civics 13, Geography and Economics 12, Science 15, Bihar GK 8, General Knowledge 7. Items grouped in the
  advertisement's subject order. Two tests, Test 2 held out of the drills, 4 drill-only items per domain: 232 in all.
- Hindi items are written in Hindi (Devanagari) with English explanations, like `uppolice`. Everything else in English.
- GK is static facts (Bihar, India, the world), no current affairs, no office-holders, no money figures.
- Questions are original, written to Class 10 level. Checked against the India banks present on 2026-11-01
  (ssccgl, rrbntpc, ibpspo, ctet, rrbgroupd, sscgd, sscchsl, sscmts, uppolice, ibpsclerk, jnvst) for the same
  correct answer to the same fact, and rewritten where they matched.

## Fact checks for Bihar GK items (2026-11-01)

- State animal gaur: https://en.wikipedia.org/wiki/List_of_Indian_state_animals (and BPSC prelims answer keys).
- Kanwar Lake (Kabartal), Begusarai, Bihar's first Ramsar site (2020): https://rsis.ramsar.org/ris/2436 . Sources
  differ on whether it is an oxbow of the Gandak or the Burhi Gandak, so the item does not name the river.
- Bihar Diwas 22 March (Bihar separated from the Bengal Presidency, 1912); Jharkhand formed 15 November 2000; Bihar
  Vidhan Sabha 243 seats; Maithili added to the Eighth Schedule by the 92nd Amendment (2003); Bihar reserves 50% of
  panchayat seats for women (Bihar Panchayat Raj Act 2006). Standard references, cross-checked with Bihar
  government pages and NCERT where possible.
