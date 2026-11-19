# Sources for `cosmoinstructor` (NIC National Instructor Theory Examination)

All 200 questions are original, written by Tigertest from the NIC instructor content outline and
the federal rules below. No NIC sample question, past paper, textbook workbook item or commercial
practice question was copied or reworded, and no prep provider or textbook is named in a stem.
A fact-and-answer scan against `data/praxis-plt-questions.json`, `data/texes-ppr-questions.json`,
`data/cosmetology-questions.json`, `data/barber-questions.json`, `data/esthetician-questions.json`,
`data/nail-technician-questions.json` and `data/de-aevo-questions.json` was run and the
overlapping items rewritten (domain identification, summative and formative assessment,
criterion-referenced tests, content validity, scorer reliability, rating scales, peer
observation, reflective journals, wait time, flipped classroom, FERPA rights at 18, universal
precautions, sharps container type and engineering controls were replaced). Checked 2026-11-18.

## Content outline and format (official)
- NIC, National Instructor Theory Examination Candidate Information Bulletin (CIB), effective
  December 1, 2024, revision date January 1, 2026,
  https://prov-testing.github.io/nic_cib/instructor_national_theory_english.html
  (fetched 2026-11-18; served by Prov, NIC's exam provider, the same host as the Esthetics and
  Nail Technology CIBs used in this run). Gave: the exam is a licensure examination for
  instructors developed by the National-Interstate Council of State Boards of Cosmetology; 90
  minutes; 85 items, 75 weighted and counted in the score; four options with one correct (from
  the sample question notes). Three domains: Instructional Planning 33% (manage curriculum
  delivery: syllabus, course outline, lesson plans, delivery of course content, instructional
  outcomes, performance assessment; identify learning styles and needs: learning types,
  instruction adaptations; utilize instructional materials: printed, audiovisual, demonstration,
  technology; determine application of assessment: written, practical, oral), Instructional
  Methods 33% (lecture, demonstration, group learning; obstacles to learning and practice
  adaptations; verbal, non-verbal and listening skills; time management; assessment
  implementation, evaluation of results, reliability and validity), Theory and Practical
  Classroom 34% (physical and virtual learning environments: organization and layout,
  conditions, adaptations, inventory and supplies; professional responsibilities: conduct,
  academic advising and remediation, administrative responsibilities, self-evaluation and
  continuing education; safe learning environment: characteristics, hazards, infection control).
  References: Milady Professional Educator 4th ed. (2022), McKeachie's Teaching Tips 14th ed.
  (2014), Pivot Point Fundamentals: Mindful Teaching 2nd ed. (2025); supplemental Mindful
  Teaching Pro eBook (2023). The eight sample questions were read for format only and not
  reused; their keys (time utilization log, reference book, gestures, cluster arrangement,
  instructor responsibility for a hazard, kinesthetic learners, theory before practice, rubric)
  were avoided as keys.

## Pass mark (official state source)
- South Carolina LLR, Board of Cosmetology, "Examination Information",
  https://llr.sc.gov/cosmo/examins.aspx (fetched 2026-11-18): applicants must obtain a passing
  score of 75% on the NIC examination for cosmetology, nail technology and esthetics, and "a
  score of 80% is needed for instructor licensure". NIC publishes no national pass mark; each
  board sets its own, so the landing names South Carolina as an example and the app uses 80% as
  a readiness line.

## Federal rules used in questions
- U.S. Department of Education, Student Privacy Policy Office, "FERPA" (34 CFR Part 99),
  https://studentprivacy.ed.gov/ferpa (fetched 2026-11-18): eligible student is 18 or older or
  attending a postsecondary institution (99.3); records excluded include sole-possession memory
  aids (99.3); access within no more than 45 days (99.10); request to amend inaccurate or
  misleading records (99.20); written consent must specify the records, state the purpose and
  identify the recipient, signed and dated (99.30); directory information includes name and
  dates of attendance (99.3); school officials with a legitimate educational interest may see records without consent (99.31); a record of each request and disclosure is kept (99.32).
- Electronic Code of Federal Regulations, 34 CFR 668.34, Satisfactory academic progress,
  https://www.ecfr.gov/current/title-34/subtitle-B/chapter-VI/part-668/subpart-B/section-668.34
  (read through the eCFR versioner API on 2026-11-18, title 34 as amended to 2026-11-10):
  maximum timeframe for an undergraduate clock-hour program no longer than 150% of the published
  length; financial aid warning for one payment period; probation with an academic plan; appeal
  bases (death of a relative, injury or illness, other special circumstances).
- eCFR, 29 CFR 1910.37, Maintenance, safeguards and operational features for exit routes,
  https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-E/section-1910.37
  (fetched 2026-11-18): exit routes free and unobstructed, no materials placed there even
  temporarily; no exit access through a room that can be locked or into a dead end; doors that
  could be mistaken for an exit marked "Not an Exit" or with their actual use; exit sign letters not less than six inches high (b)(7).
- eCFR, 29 CFR 1910.151, Medical services and first aid,
  https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-K/section-1910.151
  (fetched 2026-11-18): first aid supplies readily available; quick drenching or flushing
  facilities where eyes or body may meet injurious corrosive materials.
- eCFR, 29 CFR 1910.157, Portable fire extinguishers,
  https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-L/section-1910.157
  (fetched 2026-11-18): monthly visual inspection, annual maintenance check; education on
  initial employment and at least annually.
- eCFR, 29 CFR 1910.1030, Bloodborne pathogens,
  https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-Z/section-1910.1030
  (fetched 2026-11-18): exposure incident definition (eye, mouth, mucous membrane, non-intact
  skin or parenteral contact); written Exposure Control Plan with an exposure determination,
  reviewed at least annually; sharps containers easily accessible and as close as feasible to
  where sharps are used; hand washing immediately or as soon as feasible after removing gloves;
  hepatitis B vaccination made available; engineering controls defined.
- eCFR, 29 CFR 1910.1200, Hazard communication (fetched 2026-11-18): manufacturers supply
  safety data sheets with handling and protective measures.
- OSHA's own pages (osha.gov) returned 403 to automated fetches; the regulation text was read on
  eCFR instead.

## Textbook facts
Learning domains (cognitive, affective, psychomotor), the revised Bloom's taxonomy, Krathwohl's
affective levels, learning types (visual, auditory, tactile), andragogy, Maslow's hierarchy,
Gardner's multiple intelligences, objective writing (behavior, condition, criterion), lesson
plan parts, lecture, demonstration and group methods (jigsaw, think-pair-share, role play, case
study, panel, Socratic questioning, discovery learning, learning stations), communication and
feedback techniques, assessment types (formative, summative, diagnostic, norm- and
criterion-referenced, analytic and holistic scoring), reliability, validity and item analysis,
classroom layouts (U shape, rows, chevron, cluster, boardroom), inventory practice (first in, first out; par levels; physical, perpetual and cycle counts), Knowles' adult learning principles (need to know, self-concept, experience, readiness, orientation), the four stages of competence, the four-step job instruction method, scaffolding, chunking, interleaving, growth mindset, intrinsic and extrinsic motivation, accommodation and modification, the communication model and paralanguage, advance organizers, source evaluation criteria (authority, currency, coverage, purpose), the 6 x 6 slide guideline and time management ideas (Pareto principle, Parkinson's law, SMART goals, the urgent-important matrix, batching, delegation) are standard content
of the NIC reference texts above and of general teaching references. The textbooks are paid and
were not fetched; items keep to widely taught, stable facts.

## Left out on purpose
Instructor training hours, apprenticeship or teaching-experience requirements, license fees,
renewal periods, continuing education hours and each state's pass mark vary by state and are not
asked; the one continuing-education item says requirements vary by state. Accreditation agency
standards, school policies and the practical or teaching-demonstration exams some states require
are not asked. No item names a textbook, publisher or training provider. No item asks about the
test itself.

## Blueprint (Tigertest)
Per 50-question test: Instructional Planning 16 (curriculum and lesson planning 6, learners 4,
materials 3, assessment planning 3), Instructional Methods 17 (methods 5, obstacles 3,
communication 4, time management 2, evaluation 3), Theory and Practical Classroom 17
(environment 5, professional responsibilities 7, safety 5); 16/17/17 is 32/34/34%, within one
item of NIC's 33/33/34. NIC weights only the three domains; the split inside each is
Tigertest's. Pools are 4x per test, so no question repeats across the four tests. Five topic
sets (36/40/40/44/40), 9 dashboard steps.
