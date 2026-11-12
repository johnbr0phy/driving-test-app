# ukplumb wiring notes

## (a) CLAUDE.md bullet

- **Plumbing Theory** (`ukplumb`, UK Level 2 and 3 plumbing and domestic heating theory: the knowledge tests of City & Guilds 6035 Plumbing Studies and the ST0303 Plumbing and domestic heating technician apprenticeship knowledge test, `/plumbing-theory/*`, landing `/plumbing-theory-practice-test`): `data/uk-plumbing-theory-questions.json` (200 original questions on the C&G 6035-02 handbook v5.12 (September 2026) learning outcomes and the ST0303 v1.2 core knowledge K1 to K18: health and safety 24, scientific principles 20, common plumbing processes 24, cold water systems 24, domestic hot water 24, central heating and controls 32, sanitation and above-ground drainage 20, rainwater 8, electrical principles for plumbers 12, environmental technology awareness 12), test IDs 26901-26904, sets 26901-26905 (by topic: Health, Safety & Science 44, Plumbing Processes & Electrics 36, Cold & Hot Water Systems 48, Central Heating & Low Carbon 44, Sanitation, Drainage & Rainwater 28), state `UKPLUMB`, prefix `UKPLUMB-`, 60% pass (the ST0303 paper 1 pass of 36 of 60 and C&G's approx. 60% on each Level 2 test). 6/5/6/6/6/8/5/2/3/3 per test (Tigertest's split from the C&G test specification sizes). The real tests: each C&G 6035-02 unit is an e-volve online multiple-choice test (mostly 40 questions in 75 minutes, H&S 42), graded pass, merit or distinction; the ST0303 EPA knowledge test paper 1 is 60 four-option questions in 120 minutes (distinction 50), with option papers for gas (ACS CCN1 and CENWAT), heat pumps and solar thermal (30 in 60 minutes each, 18 to pass). England figures: Approved Documents H (2015), G (2015 with 2016 amendments) and L Volume 1 (2021 with 2023 amendments; the figures used also hold in the 2026 edition, in force from 24 March 2027), HSE legionella, ladder and asbestos guidance, RIDDOR reg 4. Water Regulations, unvented storage, gas and BS 7671 only lightly touched (siblings ukwater, ukg3, ukgas, uk18ed); no joist notch figures (no longer in Approved Document A). Built by `tools/next100/ukplumb/build.py`; sources in `tools/next100/ukplumb/sources.md`. Region UK, hub group "UK workplace and trade certificates", `[data-theme="ukplumb"]` deep water blue (196 75% 26%), borrows the Red Seal Plumber (caplumb) tiger, teacher-led (FE colleges and plumbing training centres).

## (b) lib/examFacts.ts entry (draft content)

Answer: Plumbing theory in England is assessed by multiple-choice knowledge tests. On the City & Guilds 6035-02 Level 2 Diploma in Plumbing Studies, each unit (health and safety, scientific principles, common processes, cold water, hot water, central heating, drainage, electrical principles) is an online multiple-choice test, mostly 40 questions in 75 minutes, with a pass mark of about 60%. On the Level 3 Plumbing and domestic heating technician apprenticeship (ST0303), the end-point knowledge test paper 1 is 60 multiple-choice questions in 120 minutes: 36 to pass and 50 for a distinction, followed by an option paper.

Facts rows:
- Who sets it: City & Guilds (6035 qualifications); end-point assessment organisations to the Skills England ST0303 assessment plan
- Format: C&G 6035-02: e-volve online multiple choice per unit, mostly 40 questions in 75 minutes. ST0303 paper 1: 60 four-option questions in 120 minutes
- Pass mark: C&G approx. 60% per test (pass, merit, distinction). ST0303 paper 1: 36 of 60 (distinction 50)
- Option papers (ST0303): gas via ACS CCN1 and CENWAT; heat pumps and solar thermal 30 questions in 60 minutes each, 18 to pass; non-domestic 30 questions
- Source: City & Guilds 6035-02 qualification handbook v5.12, September 2026 (https://www.cityandguilds.com/-/media/productdocuments/building_services_engineering/plumbing/6035/6035_level_2/centre_documents/6035-02-level-2-diploma-in-plumbing-studies_qhb_v5,-d-,12-pdf.pdf); ST0303 v1.2 EPA plan, July 2025 (https://skillsengland.education.gov.uk/apprenticeship-standards/st0303-v1-2), checked 12 November 2026

## (c) Landing FAQ

1. Q: What does the plumbing theory test cover?
   A: Health and safety, scientific principles, pipework and jointing, cold and hot water systems, central heating and controls, sanitation and above-ground drainage, rainwater, electrical basics for plumbers and an awareness of heat pumps and solar thermal. Those are the units of the City & Guilds 6035 Level 2 Diploma and the core knowledge of the Level 3 apprenticeship.
2. Q: How many questions are on the real tests and what is the pass mark?
   A: Each City & Guilds 6035-02 unit test is an online multiple-choice test, mostly 40 questions in 75 minutes, passing at about 60%. The ST0303 apprenticeship knowledge test paper 1 is 60 questions in 120 minutes: 36 to pass, 50 for a distinction.
3. Q: Is this the gas or unvented exam?
   A: No. Gas (ACS CCN1), unvented hot water storage and the Water Regulations each have their own practice test on Tigertest. This one covers the general plumbing and heating theory and touches those only lightly.
4. Q: Which rules are the questions based on?
   A: England: Approved Documents H, G and L, HSE guidance on legionella, ladders and asbestos, and RIDDOR. Wales, Scotland and Northern Ireland have their own building regulations, so check local figures there.
5. Q: Can I use it with my college class?
   A: Yes. Tutors can make a free class at /teach/new, share the link, and see every student's scores and the questions the group gets wrong most.

## (d) Catalog

- Blurb: Level 2 and 3 plumbing and heating theory: cold and hot water, central heating, drainage, safety and science.
- Org line: City & Guilds · 6035 Plumbing Studies and ST0303 apprenticeship
- Search aliases: plumbing theory, plumbing level 2, plumbing level 3, 6035, 6189, city and guilds plumbing, plumbing diploma, plumbing apprenticeship, st0303, plumbing and domestic heating, plumber exam uk, plumbing epa, plumbing knowledge test
