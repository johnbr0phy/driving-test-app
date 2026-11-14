# MCAT (`mcat`): sources

Every question and every passage in this bank is original, written for Tigertest from the AAMC's public
content outline and standard introductory science and social science. No AAMC official practice material
(Official Prep Hub, sample test, practice exams, section banks, question packs, Khan Academy MCAT items), no
commercial prep material (Kaplan, UWorld, Blueprint, Princeton Review, Jack Westin, Altius, Examkrackers or
others) and no past or leaked exam content was read, used or paraphrased. The CARS passages are original essays
written in the style the AAMC describes (excerpts from the kinds of books, journals and magazines college students
read); none is an excerpt of a published work, and the writers and works they discuss are invented. The research
studies in the science and behavior passages are fictional, with hypothetical data. Classic findings mentioned in
explanations (Asch's conformity work, Weber's law, the demographic transition) are standard textbook content
described in our own words.

## Content outline (fetched 2026-11-14)
- AAMC, "What's on the MCAT Exam?" (web page): https://students-residents.aamc.org/prepare-mcat-exam/whats-mcat-exam
  - Four multiple-choice sections: Biological and Biochemical Foundations of Living Systems; Chemical and Physical
    Foundations of Biological Systems; Psychological, Social, and Biological Foundations of Behavior; Critical
    Analysis and Reasoning Skills. Links the PDF outline below.
- AAMC, "What's on the MCAT Exam?" PDF outline (footer (c) 2020 AAMC, the version the page links on 2026-11-14),
  fetched 2026-11-14: https://students-residents.aamc.org/media/9261/download
  - Section tables: Bio/Biochem 59 questions, 95 minutes; Chem/Phys 59, 95 minutes; Psych/Soc 59, 95 minutes
    ("questions are a combination of passage-based and discrete questions"); CARS 53 questions, 90 minutes
    ("questions are all passage-based").
  - Bio/Biochem distribution: first-semester biochemistry 25%, introductory biology 65%, general chemistry 5%,
    organic chemistry 5%; Foundational Concept 1 55%, FC 2 20%, FC 3 25%; Skills 1-4 35/45/10/10%.
  - Chem/Phys distribution: biochemistry 25%, biology 5%, general chemistry 30%, organic chemistry 15%,
    introductory physics 25%; FC 4 40%, FC 5 60%; Skills 35/45/10/10%.
  - Psych/Soc distribution: introductory psychology 65%, sociology 30%, biology 5%; FC 6 25%, FC 7 35%, FC 8 20%,
    FC 9 15%, FC 10 5%; Skills 35/45/10/10%.
  - CARS distribution: Foundations of Comprehension 30%, Reasoning Within the Text 30%, Reasoning Beyond the Text
    40%; passage content humanities 50%, social sciences 50%. Passages "are excerpted from the kinds of books,
    journals, and magazines that college students are likely to read"; CARS needs no outside content knowledge.
  - Content categories, used as item `skill` labels: 1A Structure and function of proteins and their constituent
    amino acids; 1B Transmission of genetic information from the gene to the protein; 1C Transmission of heritable
    information from generation to generation and the processes that increase genetic diversity; 1D Principles of
    bioenergetics and fuel molecule metabolism; 2A Assemblies of molecules, cells, and groups of cells; 2B The
    structure, growth, physiology, and genetics of prokaryotes and viruses; 2C Processes of cell division,
    differentiation, and specialization; 3A Nervous and endocrine systems; 3B Main organ systems; 4A Translational
    motion, forces, work, energy, and equilibrium; 4B Fluids, blood circulation, gas movement and gas exchange;
    4C Electrochemistry and electrical circuits; 4D How light and sound interact with matter; 4E Atoms, nuclear
    decay, electronic structure, and atomic chemical behavior; 5A Water and its solutions; 5B Molecules and
    intermolecular interactions; 5C Separation and purification methods; 5D Structure, function, and reactivity of
    biologically relevant molecules; 5E Chemical thermodynamics and kinetics; 6A Sensing the environment;
    6B Making sense of the environment; 6C Responding to the world; 7A Individual influences on behavior; 7B Social
    processes that influence human behavior; 7C Attitude and behavior change; 8A Self-identity; 8B Social thinking;
    8C Social interactions; 9A Understanding social structure; 9B Demographic characteristics and processes;
    10A Social inequality.
  - Math expected: arithmetic with probability, ratio, percentage and square-root estimation; exponentials and
    logarithms; scientific notation; basic trigonometry; vectors. "An understanding of calculus is not required,
    and a periodic table will be provided during the exam." Calculations in this bank are written to be done by
    hand, and every computed key is recomputed and asserted in `build.py`.

## Format and scoring (fetched 2026-11-14)
- AAMC, "How is the MCAT Exam Scored?":
  https://students-residents.aamc.org/applying-medical-school/article/how-new-mcat-exam-scored/
  - Each section scored 118 to 132; number-correct scores converted to scaled scores by equating, form by form;
    "Wrong answers are scored exactly the same as unanswered questions and do not affect your score."
  - The total range 472 to 528 is the sum of four 118-132 sections (also stated on AAMC pages in search results;
    this page states only the section range).
- AAMC, "The MCAT Essentials for Testing Year 2027" (PDF, effective September 2026), fetched 2026-11-14:
  https://students-residents.aamc.org/media/11711/download
  - "The MCAT exam contains three optional, scheduled breaks." Electronic devices, books, notes and other written
    materials are prohibited during the exam; examinees get a noteboard booklet. No personal calculator is allowed
    (it is an electronic device), so every section here sets `calculator: false`.
- AAMC, "MCAT Test Day", fetched 2026-11-14: https://students-residents.aamc.org/taking-mcat-exam/mcat-test-day
  - "two 10-minute breaks and one 30-minute mid-exam break"; a noteboard booklet and marker for notes or
    calculations.
- Total content time 6 hours 15 minutes and seated time about 7 hours 30 minutes (excluding check-in): from the
  AAMC "What's on the MCAT Exam?" publication chapter as shown in AAMC search results, checked 2026-11-14
  (https://students-residents.aamc.org/whats-mcat-exam/publication-chapters/whats-mcat-exam).
- Section order on test day: Chemical and Physical, CARS, Biological and Biochemical, Psychological and Social.

## Not confirmed and how the copy words it
- The AAMC publishes no raw-to-scaled conversion table. The 118 to 132 section estimates come from `curve()`
  anchors chosen by Tigertest and are labelled an estimate everywhere (config `scoreNote`, landing FAQ).
- The registration fee was not on the pages read; the landing gives no fee.
- The PDF outline footer is dated 2020; the AAMC page links it as the current outline on 2026-11-14 and the 2027
  Essentials announce no content change.

## Deliberately left out
- No questions about the test itself (length, timing, breaks, scoring, registration).
- No figures: graphs and structures are described in words or as tables; molecules are named.
- Section lengths are about half the real exam at the real pace: science sections 30 questions in 48 minutes
  (real 59 in 95), CARS 27 in 46 minutes (real 53 in 90).
