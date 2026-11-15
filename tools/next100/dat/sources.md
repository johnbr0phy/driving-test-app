# DAT (`dat`): sources

Every question and every passage in this bank is original, written for Tigertest from the ADA's published DAT
test specifications and standard introductory college biology, general chemistry, organic chemistry and
mathematics. No ADA sample test or tutorial items (the online sample test opened with a DENTPIN keycode), no past,
recalled or leaked DAT items, and no commercial prep material (DAT Bootcamp, DAT Booster, Kaplan, Princeton
Review, Chad's Prep, Orgoman, Crack DAT or others) was read, used or paraphrased. The Candidate Guide itself warns
that DAT items are confidential and copyrighted, so none were looked for. The reading passages are original essays
on scientific topics; the studies and numbers in them are written for this bank.

## Owner documents (fetched 2026-11-14)
The ADA Department of Testing Services (DTS) runs the DAT on behalf of the Council on Dental Education and
Licensure. The PDFs below were downloaded from ada.org on 2026-11-14 and read in full as text (WebFetch could not
parse the binary PDF, so each file was fetched directly from the ada.org URL and its text extracted locally).

- ADA, Dental Admission Test (DAT) web page, fetched 2026-11-14:
  https://www.ada.org/en/education-careers/dental-admission-test
  - Four sections and item counts: Survey of the Natural Sciences 100, Perceptual Ability 90, Reading
    Comprehension 50, Quantitative Reasoning 40 (280 items). Links the Candidate Guide, the new Organic Chemistry
    specifications, the scoring update and the score reporting scale guide.
- ADA, DAT 2026 Candidate Guide (PDF, "Updated: 08/04/2026"), fetched 2026-11-14:
  https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/education/dat_candidate_guide.pdf
  - Examination specifications: all items multiple choice in Standard American English; US customary and metric
    units both used.
  - Survey of the Natural Sciences, 100 items: Biology 40 (Cell and Molecular Biology; Diversity of Life; Structure
    and Function of Systems; Genetics; Evolution and Ecology, each with the listed subtopics), General Chemistry 30
    (Stoichiometry and General Concepts; Gases; Liquids and Solids; Solutions; Acids and Bases; Chemical
    Equilibria; Thermodynamics and Thermochemistry; Chemical Kinetics; Oxidation-Reduction Reactions; Atomic and
    Molecular Structure; Periodic Properties; Nuclear Reactions; Laboratory), Organic Chemistry 30. A periodic
    table is available during General Chemistry. The Guide publishes no split within Biology, General Chemistry or
    Organic Chemistry, so the per-topic counts in this bank are Tigertest's.
  - Organic Chemistry specifications after the April 2026 update (30 items): Mechanisms (curved arrows, single and
    combined mechanisms, reaction coordinate diagrams); Chemical Synthesis (one-step SN1/SN2, E1/E2, alkenes and
    alkynes, alcohols, ethers and epoxides, radical reactions, aromatics, carboxylic acids and derivatives, ketones
    and aldehydes, alpha-carbonyl compounds; two-step; multi-step; reactivity across functional groups); Acid-Base
    Chemistry (ranking acidity and basicity, structure analysis by charge, size, electronegativity, resonance,
    inductive effect, hybridization and sterics; prediction of products and equilibria); Chemical and Physical
    Properties (structure, laboratory techniques: chromatography, extraction, recrystallization, distillation;
    spectroscopy: 1H NMR, 13C NMR, IR); Structural Evaluation (nomenclature, stereochemistry, structure and
    bonding, aromaticity, hybridization, resonance, relative stability).
  - Perceptual Ability, 90 items in six subtests: apertures, view recognition, angle discrimination, paper
    folding, cube counting, 3D form development. Every subtest is a picture task.
  - Reading Comprehension, 50 items on three reading passages on scientific topics; prior knowledge of the topic
    is not required.
  - Quantitative Reasoning, 40 items: algebra (equations and expressions, inequalities, exponential notation,
    absolute value, ratios and proportions, graphical analysis); data analysis, interpretation and sufficiency;
    quantitative comparison; probability and statistics; applied mathematics (word) problems. An on-screen
    calculator is available in this section only.
  - Timing: optional tutorial 15 minutes, Survey of the Natural Sciences 90 minutes, Perceptual Ability 60, optional
    scheduled break 30, Reading Comprehension 60, Quantitative Reasoning 45, optional survey 15; total 5 hours 15
    minutes. Items are presented one at a time.
  - Scoring: scale scores from 200 to 600 in 10-point increments (since March 1, 2025, replacing 1 to 30);
    candidates are not penalized for guessing; some items are unscored experimental items; "there is not an
    official passing score", each program decides what is acceptable.
  - Retesting: 60 days between attempts, at most four in any 12-month period; permission needed after three
    attempts. Partial testing is not permitted.
  - Typical preparation: at least one year of college including biology, general chemistry and organic chemistry;
    advanced biology and physics are not required.
- ADA, NEW Organic Chemistry Examination Specifications (PDF, updated 08/13/2025), fetched 2026-11-14:
  https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/education/new_organic_chemistry_examinationspecifications.pdf
  - The same updated outline as the Guide; "do not represent major changes to the content", new topic names and
    a fuller list of subtopics.
- ADA DTS, Recent and Forthcoming Changes to Examinations 2026 (PDF, updated 10/22/2026; DAT section last updated
  9/23/2026), fetched 2026-11-14:
  https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/education/updates_licensureexaminationsandadmissiontests.pdf
  - DAT: Biology specifications changed January 21, 2022; the 200 to 600 scale from March 1, 2025; the updated
    Organic Chemistry specifications "were implemented in April 2026". No later change is announced.
- ADA, Understanding the New DAT Score Reporting Scale (PDF, updated 01/29/2025), fetched 2026-11-14:
  https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/education/dat_scorereportingscale.pdf
  - The 200 to 600 scale and a concordance table between the old and new scales. It gives no raw-to-scale
    conversion, so this bank scores percent correct.
- ADA, DAT Scoring Update (PDF), fetched 2026-11-14:
  https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/education/changes_dat_scoringandreporting.pdf
  - The scoring change took effect March 1, 2025.

## Science and math content
Questions on biology, chemistry and math are written from standard introductory college content that the
specifications list by topic (cell biology, genetics, physiology, ecology; stoichiometry, gas laws, equilibria,
thermochemistry, kinetics, electrochemistry, nuclear decay; organic reactions, stereochemistry, acidity,
spectroscopy; algebra, statistics and probability). Every computed key in `build.py` is recomputed and asserted
(`chk=`), and no distractor may equal it.

## Not confirmed and how the copy words it
- The number of answer choices per item is not stated in the Guide. This bank uses four choices everywhere and the
  landing does not claim a number.
- The ADA publishes no raw-to-scale conversion, so scores here are percent correct, labelled as practice scores,
  never DAT scale scores.
- No fee is given on the landing (the Guide lists fees that change by year).

## Deliberately left out
- Perceptual Ability: all six subtests are figure tasks (apertures, views, angles, paper folding, cube counting,
  pattern folding). They cannot be written faithfully in text, so the PAT is not modelled and the landing says so.
- No questions about the test itself (length, timing, scoring, registration, retakes).
- No figures: organic structures are given as names and condensed formulas, and curved-arrow mechanisms are asked
  in words (which bond forms, which leaves, which intermediate) rather than drawn.
- Sections are about half the real length at the real pace: Survey of the Natural Sciences 50 questions in 45
  minutes (real 100 in 90), Reading Comprehension 25 on two passages in 30 minutes (real 50 on three in 60),
  Quantitative Reasoning 20 in 23 minutes (real 40 in 45).
