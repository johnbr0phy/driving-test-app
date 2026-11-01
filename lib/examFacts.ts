// The real exam's format, stated up front on each exam landing page
// (components/exam/ExamFacts.tsx) and in /llms-full.txt. AI answer engines
// quote the first plain, factual sentence they find, so `answer` leads with
// the exam itself, not with Tigertest. Keep every figure in step with the
// landing page's FAQ, which is where these numbers were sourced and checked.
// DMV state pages carry their own facts and are deliberately not listed here.

export interface ExamFactRow {
  label: string;
  value: string;
}

export interface ExamFacts {
  /** Two or three sentences answering "what is on this exam". */
  answer: string;
  /** Short facts table: questions, time, pass mark, who gives it. */
  rows: ExamFactRow[];
  /** What the practice bank follows, for the "Based on" line. */
  basedOn: string;
  /** Official source to verify current rules. Omitted where none is universal. */
  source?: { name: string; url: string };
  /** Replaces the generated Tigertest sentence when the catalog count or pricing misleads. */
  tigertest?: string;
}

export const EXAM_FACTS: Record<string, ExamFacts> = {
  timestables: {
    answer:
      "The Multiplication Tables Check (MTC) is a statutory on-screen check for Year 4 pupils in England, taken at school in June. Children answer 25 multiplication questions on the 2 to 12 times tables, with 6 seconds to type each answer and a 3-second pause between questions. It is multiplication only, the 6, 7, 8, 9 and 12 times tables come up most, and a fact and its reverse (such as 8 × 6 and 6 × 8) never appear in the same check. There is no pass mark; schools see each child's score out of 25.",
    rows: [
      { label: "Who takes it", value: "Year 4 pupils in England, in June" },
      { label: "Questions", value: "25, multiplication only, 2 to 12 times tables" },
      { label: "Time", value: "6 seconds a question, 3-second pause between" },
      { label: "Passing score", value: "No pass mark; a score out of 25" },
      { label: "Curriculum", value: "2, 5 and 10 in Year 2; 3, 4 and 8 in Year 3; all to 12 × 12 in Year 4" },
      { label: "Given by", value: "The child's school, on the Standards and Testing Agency service" },
    ],
    basedOn: "the national curriculum in England for mathematics and the Standards and Testing Agency's multiplication tables check assessment framework",
    source: { name: "Standards and Testing Agency: multiplication tables check assessment framework", url: "https://www.gov.uk/government/publications/multiplication-tables-check-assessment-framework" },
    tigertest:
      "Tigertest has four 25-question practice checks (the Year 2 tables, the Year 3 tables, then two full Year 4 checks) and six drills that each start with a short lesson: a trick for every table, dividing and word problems. All of it is free with no account required.",
  },
  ged: {
    answer:
      "The GED is four separate subject tests: Reasoning Through Language Arts (150 minutes, including a 45-minute essay), Mathematical Reasoning (115 minutes), Science (90 minutes) and Social Studies (70 minutes), taken on a computer at a Pearson VUE test center or online with a proctor. Each subject is scored 100 to 200, and 145 passes (165 is College Ready, 175 College Ready plus Credit). The fee is set per subject and varies by state.",
    rows: [
      { label: "Subjects", value: "RLA, Mathematical Reasoning, Science, Social Studies (taken separately)" },
      { label: "Time", value: "150, 115, 90 and 70 minutes; RLA includes a 45-minute essay" },
      { label: "Passing score", value: "145 on a 100 to 200 scale, per subject" },
      { label: "Calculator", value: "On-screen TI-30XS on Math (all but 5 questions), Science and Social Studies" },
      { label: "Fee", value: "Per subject; varies by state" },
      { label: "Given by", value: "GED Testing Service, at Pearson VUE test centers or online proctored" },
    ],
    basedOn: "the assessment targets in the GED Testing Service Assessment Guide for Educators (October 2020 edition)",
    source: { name: "GED Testing Service Assessment Guide for Educators", url: "https://www.ged.com/content/dam/websites/ged/resources/en/assessment-guide-for-educators-all-subjects.pdf" },
    tigertest:
      "Tigertest has two full-length GED practice tests covering all four subjects, with a percent score per subject and six skill drills that teach the basics first. All of it is free with no account required; the essay is not modeled.",
  },
  sat: {
    answer:
      "The digital SAT has 98 questions in 2 hours 14 minutes: Reading and Writing (54 questions, two 32-minute modules) and Math (44 questions, two 35-minute modules). It is adaptive by module and scored 400 to 1600, with each section scored 200 to 800. There is no pass mark; colleges set their own expectations.",
    rows: [
      { label: "Questions", value: "98 (54 Reading and Writing, 44 Math)" },
      { label: "Time", value: "2 hours 14 minutes, plus a 10-minute break" },
      { label: "Score", value: "400 to 1600 (200 to 800 per section)" },
      { label: "Calculator", value: "Allowed on all of Math (built-in graphing calculator)" },
      { label: "Given by", value: "College Board, in the Bluebook app" },
    ],
    basedOn: "the published digital SAT specifications",
    source: { name: "College Board", url: "https://satsuite.collegeboard.org/sat" },
    tigertest:
      "Tigertest has two full-length adaptive SAT practice tests with score estimates and skill drills. All of it is free with no account required.",
  },
  act: {
    answer:
      "The enhanced ACT (2025 format) has English (50 questions, 35 minutes), Math (45 questions, 50 minutes) and Reading (36 questions, 40 minutes), with Science (40 questions, 40 minutes) and Writing optional. Each section is scored 1 to 36, and the composite is the average of English, Math and Reading. Every question has four answer choices.",
    rows: [
      { label: "Questions", value: "131 core (171 with Science)" },
      { label: "Time", value: "2 hours 5 minutes core (2 hours 45 minutes with Science)" },
      { label: "Score", value: "1 to 36 per section; composite of English, Math, Reading" },
      { label: "Calculator", value: "Allowed on the whole Math section" },
      { label: "Given by", value: "ACT, Inc." },
    ],
    basedOn: "the published enhanced ACT specifications",
    source: { name: "ACT", url: "https://www.act.org" },
    tigertest:
      "Tigertest has two full-length ACT practice tests in the enhanced format with score estimates and skill drills. All of it is free with no account required.",
  },
  cdl: {
    answer:
      "The CDL general knowledge test typically has 50 multiple-choice questions, and you need 40 correct (80%) to pass. It is taken at your state's licensing agency and is required for every class of commercial driver's license. Questions come from the CDL manual: inspection, safe driving, braking, cargo and emergencies.",
    rows: [
      { label: "Questions", value: "50 (typical)" },
      { label: "Passing score", value: "80% (40 correct)" },
      { label: "Where", value: "Your state's driver licensing office" },
      { label: "Required for", value: "Class A, B and C commercial licenses" },
    ],
    basedOn: "the FMCSA-based CDL manual every state uses",
    source: { name: "FMCSA", url: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license" },
  },
  cdlx: {
    answer:
      "Each CDL endorsement has its own knowledge test, and each needs 80% to pass. The HazMat (H) test has 30 questions in most states and also requires a TSA security threat assessment; the air brakes test has 25 questions and removes the L restriction. Combination vehicles is required for a Class A license.",
    rows: [
      { label: "Tests", value: "HazMat, air brakes, combination, tank (N), passenger (P)" },
      { label: "HazMat questions", value: "30 in most states" },
      { label: "Air brakes questions", value: "25" },
      { label: "Passing score", value: "80% on each test" },
      { label: "Where", value: "Your state's driver licensing office" },
    ],
    basedOn: "FMCSA CDL manual sections 4, 5, 6, 8 and 9",
    source: { name: "FMCSA", url: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license" },
  },
  moto: {
    answer:
      "Most states' motorcycle permit test has 20 to 30 multiple-choice questions and needs about 80% to pass, for example 20 of 25 in California. Nearly every state writes it from the Motorcycle Safety Foundation's Motorcycle Operator Manual. Some states waive it for riders who finish an approved course.",
    rows: [
      { label: "Questions", value: "20 to 30, depending on the state" },
      { label: "Passing score", value: "About 80%" },
      { label: "Where", value: "Your state's driver licensing office" },
      { label: "Based on", value: "MSF Motorcycle Operator Manual" },
    ],
    basedOn: "the MSF Motorcycle Operator Manual",
    source: { name: "Motorcycle Safety Foundation", url: "https://msf-usa.org" },
  },
  civics: {
    answer:
      "On the 2025 US citizenship civics test, a USCIS officer asks up to 20 questions from the official list of 128, and you must answer 12 correctly. The test is oral, not multiple choice, and stops at 12 correct or 9 incorrect. It applies to applications filed on or after October 20, 2025; earlier applicants take the 2008 test (10 asked, 6 to pass).",
    rows: [
      { label: "Questions asked", value: "Up to 20, from a list of 128" },
      { label: "Passing score", value: "12 correct" },
      { label: "Format", value: "Oral, at the naturalization interview" },
      { label: "Given by", value: "USCIS" },
    ],
    basedOn: "the 2025 USCIS civics question list",
    source: { name: "USCIS", url: "https://www.uscis.gov/citizenship" },
  },
  part107: {
    answer:
      "The FAA Part 107 knowledge test (Unmanned Aircraft General) has 60 multiple-choice questions in 2 hours, and 70% (42 correct) passes. It is taken at a PSI testing center after you get an FAA Tracking Number from IACRA. It covers regulations, airspace, weather, loading and performance, and operations.",
    rows: [
      { label: "Questions", value: "60" },
      { label: "Time", value: "2 hours" },
      { label: "Passing score", value: "70% (42 correct)" },
      { label: "Where", value: "PSI testing center" },
      { label: "Given by", value: "FAA" },
    ],
    basedOn: "the FAA Remote Pilot Airman Certification Standards",
    source: { name: "FAA", url: "https://www.faa.gov/uas/commercial_operators" },
  },
  ham: {
    answer:
      "The ham radio Technician exam (FCC Element 2) has 35 multiple-choice questions, and 26 correct (about 74%) passes. Every question comes word for word from the public NCVEC pool; the 2026-2030 pool runs from July 1, 2026 to June 30, 2030. Volunteer examiners give it, no Morse code is required, and the license lasts 10 years.",
    rows: [
      { label: "Questions", value: "35, one from each pool group" },
      { label: "Passing score", value: "26 correct (about 74%)" },
      { label: "Question pool", value: "NCVEC 2026-2030 (409 questions)" },
      { label: "Given by", value: "Volunteer examiner teams" },
    ],
    basedOn: "the official NCVEC 2026-2030 Technician pool",
    source: { name: "NCVEC", url: "https://www.ncvec.org" },
    tigertest:
      "Tigertest has 397 of the 409 official pool questions with explanations (the 12 that need a schematic figure are left out), all free with no account required.",
  },
  epa608: {
    answer:
      "The EPA Section 608 exam has four sections (Core, Type I, Type II, Type III) of 25 multiple-choice questions each, and you need 18 correct (72%) on each section. Core plus one type earns that type; Core plus all three is Universal certification, 100 questions in total. Type II and III are always proctored and closed book.",
    rows: [
      { label: "Questions", value: "25 per section, 100 for Universal" },
      { label: "Passing score", value: "18 of 25 (72%) per section" },
      { label: "Sections", value: "Core, Type I, Type II, Type III" },
      { label: "Given by", value: "EPA-approved certifying organizations" },
    ],
    basedOn: "EPA Section 608 technician certification requirements",
    source: { name: "US EPA", url: "https://www.epa.gov/section608" },
  },
  cna: {
    answer:
      "The CNA written exam (NNAAP, used by most states) has 70 multiple-choice questions, 60 scored, in about 90 minutes, and most states pass at roughly 70%. You must also pass a separate hands-on skills evaluation. Physical care skills are 61% of the exam, psychosocial care 13% and the role of the nurse aide 26%.",
    rows: [
      { label: "Questions", value: "70 (60 scored)" },
      { label: "Time", value: "About 90 minutes" },
      { label: "Passing score", value: "About 70% in most states" },
      { label: "Also required", value: "Hands-on skills evaluation" },
    ],
    basedOn: "the NNAAP written exam outline",
    source: { name: "NCSBN (NNAAP)", url: "https://www.ncsbn.org" },
  },
  ptcb: {
    answer:
      "The PTCB exam (PTCE) has 90 multiple-choice questions, 80 scored, with 110 minutes of testing time. It is scored 1,000 to 1,600 and 1,400 passes, which is roughly 70% correct. Since January 2026 it covers Medications 35%, Patient Safety 23.75%, Order Entry 22.5% and Federal Requirements 18.75%.",
    rows: [
      { label: "Questions", value: "90 (80 scored)" },
      { label: "Time", value: "110 minutes" },
      { label: "Passing score", value: "1,400 on a 1,000 to 1,600 scale" },
      { label: "Given by", value: "PTCB, at Pearson VUE centers" },
    ],
    basedOn: "the PTCE content outline effective January 2026",
    source: { name: "PTCB", url: "https://www.ptcb.org" },
  },
  phleb: {
    answer:
      "The NHA phlebotomy exam (CPT) has 120 multiple-choice questions, 100 scored, with 2 hours to finish. It is scored 200 to 500 and 390 passes. Routine blood collections are 28%, safety and compliance 26%, patient preparation 20%, processing 14% and special collections 12%.",
    rows: [
      { label: "Questions", value: "120 (100 scored)" },
      { label: "Time", value: "2 hours" },
      { label: "Passing score", value: "390 on a 200 to 500 scale" },
      { label: "Given by", value: "NHA" },
    ],
    basedOn: "the NHA CPT 2025 test plan",
    source: { name: "NHA", url: "https://www.nhanow.com" },
  },
  ccma: {
    answer:
      "The NHA CCMA exam has 180 multiple-choice questions, 150 scored, with 3 hours to finish. It is scored 200 to 500 and 390 passes. Clinical patient care is 56% of the exam; the rest covers foundational knowledge, care coordination, administration, communication, anatomy and law.",
    rows: [
      { label: "Questions", value: "180 (150 scored)" },
      { label: "Time", value: "3 hours" },
      { label: "Passing score", value: "390 on a 200 to 500 scale" },
      { label: "Given by", value: "NHA" },
    ],
    basedOn: "the NHA CCMA 3.0 test plan",
    source: { name: "NHA", url: "https://www.nhanow.com" },
  },
  cet: {
    answer:
      "The NHA EKG technician exam (CET) has 120 multiple-choice questions, 100 scored, with 2 hours to finish. It is scored 200 to 500 and 390 passes. EKG acquisition is 44%, safety and patient care 32%, and EKG analysis and interpretation 24%.",
    rows: [
      { label: "Questions", value: "120 (100 scored)" },
      { label: "Time", value: "2 hours" },
      { label: "Passing score", value: "390 on a 200 to 500 scale" },
      { label: "Given by", value: "NHA" },
    ],
    basedOn: "the NHA CET test plan",
    source: { name: "NHA", url: "https://www.nhanow.com" },
  },
  danb: {
    answer:
      "The DANB Certified Dental Assistant (CDA) credential is three exams you can take together or separately: General Chairside (95 questions, 75 minutes), Radiation Health and Safety (75 questions, 75 minutes) and Infection Control (75 questions, 75 minutes). Each is scored 100 to 900 and 400 passes.",
    rows: [
      { label: "General Chairside", value: "95 questions, 75 minutes" },
      { label: "Radiation Health and Safety", value: "75 questions, 75 minutes" },
      { label: "Infection Control", value: "75 questions, 75 minutes" },
      { label: "Passing score", value: "400 on a 100 to 900 scale, per exam" },
      { label: "Given by", value: "DANB" },
    ],
    basedOn: "the current DANB GC, RHS and ICE outlines",
    source: { name: "DANB", url: "https://www.danb.org" },
  },
  emt: {
    answer:
      "The NREMT EMT cognitive exam is computer adaptive: 70 to 120 questions in 2 hours, including 10 unscored pilot items. It ends when the computer is 95% confident you are above or below the passing standard, so there is no percentage pass mark. Primary assessment is the largest domain at 39 to 43%.",
    rows: [
      { label: "Questions", value: "70 to 120 (adaptive)" },
      { label: "Time", value: "2 hours" },
      { label: "Passing score", value: "Above the entry-level standard (no percentage)" },
      { label: "Given by", value: "NREMT, at Pearson VUE centers" },
    ],
    basedOn: "the NREMT EMT test plan (April 2025)",
    source: { name: "NREMT", url: "https://www.nremt.org" },
  },
  paramedic: {
    answer:
      "The NREMT Paramedic certification exam is one computer adaptive exam: 110 to 150 questions in 3.5 hours, including 20 unscored pilot items, with no separate psychomotor exam since July 1, 2024. It ends when the computer is 95% confident you are above or below the passing standard, so there is no percentage pass mark. Clinical Judgment is the largest domain at 34 to 38%, and medical, obstetrics and gynecology is next at 24 to 28%.",
    rows: [
      { label: "Questions", value: "110 to 150 (adaptive), 20 unscored" },
      { label: "Time", value: "3.5 hours" },
      { label: "Passing score", value: "Above the entry-level standard (no percentage)" },
      { label: "Fee", value: "$175" },
      { label: "Eligibility", value: "Current EMT plus a CAAHEP-accredited (CoAEMSP) paramedic program or one with a Letter of Review" },
      { label: "Given by", value: "NREMT, at Pearson VUE centers" },
    ],
    basedOn: "the NREMT Paramedic certification examination test plan (July 2024)",
    source: { name: "NREMT", url: "https://www.nremt.org/Pages/Examinations/AEMT-and-Paramedic-Certification-Examinations" },
  },
  foodmgr: {
    answer:
      "Certified Food Protection Manager exams (ServSafe Manager, NRFSP, Prometric and other ANAB-accredited exams) test the FDA Food Code. The ServSafe Manager exam has 90 questions, 80 scored, with 2 hours and a 75% pass line; the others are similar. The exam is proctored and accepted by health departments nationwide.",
    rows: [
      { label: "Questions", value: "About 90 (ServSafe: 80 scored)" },
      { label: "Time", value: "About 2 hours" },
      { label: "Passing score", value: "75% (ServSafe Manager)" },
      { label: "Format", value: "Proctored, in person or online" },
    ],
    basedOn: "the FDA Food Code",
    source: { name: "FDA Food Code", url: "https://www.fda.gov/food/retail-food-protection/fda-food-code" },
  },
  foodhandler: {
    answer:
      "Most accredited food handler course tests have 40 multiple-choice questions, need 75% to pass and have no time limit. They cover personal hygiene, contamination and allergens, time and temperature, and cleaning. Whether you need a card depends on your state and county; cards usually last two to three years.",
    rows: [
      { label: "Questions", value: "About 40 (typical)" },
      { label: "Passing score", value: "75% (typical)" },
      { label: "Time limit", value: "Usually none" },
      { label: "Card valid", value: "2 to 3 years in most places" },
    ],
    basedOn: "the FDA Food Code",
    source: { name: "FDA Food Code", url: "https://www.fda.gov/food/retail-food-protection/fda-food-code" },
  },
  realestate: {
    answer:
      "The real estate salesperson exam has a national portion of 80 scored questions on Pearson VUE (plus 5 unscored) and a similar count on PSI, plus a state portion of 30 to 50 questions. Most states allow 2 to 4 hours for both and pass the national portion at 70 to 75%. About 7 of the 80 national questions are pure math.",
    rows: [
      { label: "National portion", value: "80 scored questions" },
      { label: "State portion", value: "30 to 50 questions" },
      { label: "Time", value: "About 2 to 4 hours total" },
      { label: "Passing score", value: "70 to 75% (national portion)" },
      { label: "Given by", value: "Pearson VUE or PSI, by state" },
    ],
    basedOn: "the Pearson VUE and PSI national outlines",
  },
  insurance: {
    answer:
      "A combined life, accident and health insurance producer exam usually has about 150 scored questions with 2 to 3 hours, and most states pass at 70%. It has a general portion shared by every state and a shorter state law portion. Stand-alone life-only or health-only exams are shorter.",
    rows: [
      { label: "Questions", value: "About 150 (combined exam)" },
      { label: "Time", value: "2 to 3 hours" },
      { label: "Passing score", value: "70% in most states" },
      { label: "Given by", value: "Pearson VUE, PSI or Prometric, by state" },
    ],
    basedOn: "the general portion of state producer exams",
  },
  pnc: {
    answer:
      "A combined property and casualty producer exam typically has 100 to 150 scored questions with 2 to 3 hours, and most states pass at 70%. It has a general portion (policy basics, homeowners and dwelling forms, personal auto, commercial lines) and a state law portion. Each state sets the exact count and time.",
    rows: [
      { label: "Questions", value: "100 to 150 scored" },
      { label: "Time", value: "2 to 3 hours" },
      { label: "Passing score", value: "70% in most states" },
      { label: "Given by", value: "Pearson VUE, PSI or Prometric, by state" },
    ],
    basedOn: "the general portion of state producer exams",
  },
  notary: {
    answer:
      "About a dozen states require a notary exam, including California, New York, Louisiana, Ohio, Oregon, Utah, Colorado and Hawaii; others require a course. Every state's exam tests the same core: notarial acts, identifying signers, journals and seals, and ethics. Fees, terms and remote notarization rules vary by state.",
    rows: [
      { label: "States with an exam", value: "About a dozen" },
      { label: "Core topics", value: "Acts, ID, journal and seal, ethics, commission" },
      { label: "State rules", value: "Fees, terms and remote notarization vary" },
      { label: "Given by", value: "Your state's commissioning office" },
    ],
    basedOn: "general notary law shared across states",
  },
  teas: {
    answer:
      "The ATI TEAS 7 has 170 questions in about 209 minutes: Reading (45 questions, 55 minutes), Math (38, 57), Science (50, 60) and English and Language Usage (37, 37). Twenty questions are unscored. There is no national pass mark; nursing programs commonly set 60 to 70% overall.",
    rows: [
      { label: "Questions", value: "170 (150 scored)" },
      { label: "Time", value: "About 209 minutes" },
      { label: "Sections", value: "Reading, Math, Science, English" },
      { label: "Passing score", value: "Set by each program (often 60 to 70%)" },
      { label: "Given by", value: "ATI" },
    ],
    basedOn: "the ATI TEAS 7 blueprint",
    source: { name: "ATI", url: "https://www.atitesting.com/teas" },
  },
  nclex: {
    answer:
      "The NCLEX-RN is the licensure exam for registered nurses in the US and Canada. It is computerized adaptive: you answer 85 to 150 questions in up to five hours, the test stops once it is 95% certain you are above or below the passing standard, and you get a pass or fail, not a percent. Next Generation NCLEX formats include unfolding case studies and select all that apply items, and the 2026 test plan weights Management of Care (15 to 21%) and Pharmacological and Parenteral Therapies (13 to 19%) the most.",
    rows: [
      { label: "Questions", value: "85 to 150 (15 unscored)" },
      { label: "Time", value: "Up to 5 hours" },
      { label: "Format", value: "Computerized adaptive, no going back" },
      { label: "Result", value: "Pass or fail" },
      { label: "Developed by", value: "NCSBN (given at Pearson VUE centers)" },
    ],
    basedOn: "the NCSBN 2026 NCLEX-RN Test Plan",
    source: { name: "NCSBN", url: "https://www.nclex.com" },
  },
  nclexpn: {
    answer:
      "The NCLEX-PN is the licensure exam for licensed practical and vocational nurses (LPN/LVN) in the US. It is computerized adaptive: you answer 85 to 150 questions in up to five hours, the test stops once it is 95% certain you are above or below the passing standard, and you get a pass or fail, not a percent. Next Generation NCLEX formats include unfolding case studies and select all that apply items, and the 2026 test plan weights Coordinated Care (18 to 24%) the most, followed by Safety and Infection Prevention and Control and Pharmacological Therapies (10 to 16% each).",
    rows: [
      { label: "Questions", value: "85 to 150 (15 unscored)" },
      { label: "Time", value: "Up to 5 hours" },
      { label: "Format", value: "Computerized adaptive, no going back" },
      { label: "Result", value: "Pass or fail" },
      { label: "Fee", value: "$200 registration (NCSBN; rising to $350 from February 1, 2027)" },
      { label: "Developed by", value: "NCSBN (given at Pearson VUE centers)" },
    ],
    basedOn: "the NCSBN 2026 NCLEX-PN Test Plan (effective April 1, 2026)",
    source: { name: "NCSBN", url: "https://www.nclex.com/test-plans.page" },
  },
  rexpn: {
    answer:
      "The REx-PN (Regulatory Exam - Practical Nurse) is the entry-to-practice exam for Registered Practical Nurses in Ontario and Licensed Practical Nurses in British Columbia, built by NCSBN for those regulators. It is computerized adaptive: you answer 90 to 150 questions, 30 of them unscored pretest items, within four hours, with no going back, and the exam stops once it is 95% certain you are above or below the passing standard. The result is pass or fail, and since January 2026 select all that apply items earn partial credit. Management of Care (18 to 24%) and Pharmacological and Parenteral Therapies (14 to 20%) carry the most questions.",
    rows: [
      { label: "Questions", value: "90 to 150 (30 unscored)" },
      { label: "Time", value: "Up to 4 hours, including breaks" },
      { label: "Format", value: "Computerized adaptive, no going back" },
      { label: "Result", value: "Pass or fail" },
      { label: "Fee", value: "350 CAD plus tax per attempt (paid to Pearson VUE)" },
      { label: "Retakes", value: "Wait at least 60 days between attempts" },
      { label: "Who writes it", value: "RPN applicants (CNO, Ontario) and LPN applicants (BCCNM, British Columbia)" },
    ],
    basedOn: "the NCSBN REx-PN Test Plan (effective January 2022, revised 2025)",
    source: { name: "NCSBN REx-PN", url: "https://www.ncsbn.org/publications/2022-rexpn-test-plan" },
  },
  hesi: {
    answer:
      "The HESI A2 is a nursing school entrance exam with separately scored sections: math, reading, vocabulary, grammar, biology, chemistry, anatomy and physiology, and physics. Programs choose which sections you take; a full battery takes about four hours. Most programs want 75% or higher on each required section.",
    rows: [
      { label: "Sections", value: "Up to 8, chosen by your program" },
      { label: "Section length", value: "25 to 55 questions each" },
      { label: "Time", value: "About 4 hours for a full battery" },
      { label: "Passing score", value: "Set by program (often 75% per section)" },
      { label: "Given by", value: "Elsevier" },
    ],
    basedOn: "the HESI Admission Assessment sections",
  },
  asvab: {
    answer:
      "The computer ASVAB (CAT-ASVAB) has ten subtests, and the AFQT score that decides whether you can enlist is a 1 to 99 percentile built from four of them: Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension and Mathematics Knowledge. As of 2026 the minimum AFQT is 31 for the Army, Navy, Marines and Air Force and 36 for the Coast Guard. Calculators are not allowed.",
    rows: [
      { label: "Subtests", value: "10 (CAT-ASVAB)" },
      { label: "Enlistment score", value: "AFQT percentile, 1 to 99" },
      { label: "Minimum AFQT", value: "31 (Army, Navy, Marines, Air Force); 36 (Coast Guard)" },
      { label: "Calculator", value: "Not allowed" },
      { label: "Given by", value: "US Department of Defense, at MEPS or MET sites" },
    ],
    basedOn: "the eight written ASVAB subtests",
    source: { name: "Official ASVAB", url: "https://www.officialasvab.com" },
  },
  accuplacer: {
    answer:
      "The Next-Generation ACCUPLACER is a college placement test, not a pass or fail exam. Its multiple-choice sections (Reading, Writing, Arithmetic, Quantitative Reasoning, Algebra and Statistics, and Advanced Algebra and Functions) are untimed and adaptive, usually 20 questions each, and scored 200 to 300. Each college sets its own cut scores.",
    rows: [
      { label: "Questions", value: "About 20 per section" },
      { label: "Time", value: "Untimed" },
      { label: "Score", value: "200 to 300 per section" },
      { label: "Pass mark", value: "None; colleges set placement cut scores" },
      { label: "Given by", value: "College Board, at your college" },
    ],
    basedOn: "the Next-Generation ACCUPLACER sections",
    source: { name: "College Board", url: "https://accuplacer.collegeboard.org" },
  },
  aws: {
    answer:
      "The AWS Certified Cloud Practitioner exam (CLF-C02) has 65 questions in 90 minutes, 50 scored. It is scored 100 to 1000 and 700 passes. It covers Cloud Concepts 24%, Security and Compliance 30%, Cloud Technology and Services 34%, and Billing, Pricing and Support 12%.",
    rows: [
      { label: "Questions", value: "65 (50 scored)" },
      { label: "Time", value: "90 minutes" },
      { label: "Passing score", value: "700 on a 100 to 1000 scale" },
      { label: "Given by", value: "AWS, at Pearson VUE or online" },
    ],
    basedOn: "the AWS CLF-C02 exam guide",
    source: { name: "AWS", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/" },
  },
  aplus: {
    answer:
      "CompTIA A+ takes two exams: Core 1 (220-1201) and Core 2 (220-1202), each with up to 90 questions in 90 minutes. Core 1 passes at 675 and Core 2 at 700, both on a 100 to 900 scale. The 1200 series replaced 220-1101 and 220-1102 in September 2025.",
    rows: [
      { label: "Exams", value: "Core 1 (220-1201) and Core 2 (220-1202)" },
      { label: "Questions", value: "Up to 90 per exam" },
      { label: "Time", value: "90 minutes per exam" },
      { label: "Passing score", value: "675 (Core 1), 700 (Core 2), of 900" },
      { label: "Given by", value: "CompTIA, at Pearson VUE or online" },
    ],
    basedOn: "the CompTIA A+ V15 (220-1201/1202) objectives",
    source: { name: "CompTIA", url: "https://www.comptia.org/certifications/a" },
  },
  secplus: {
    answer:
      "CompTIA Security+ (SY0-701) has up to 90 questions in 90 minutes, mixing multiple choice and performance-based items. The passing score is 750 on a 100 to 900 scale. There is no prerequisite, though CompTIA recommends Network+ and two years of security-focused IT experience.",
    rows: [
      { label: "Questions", value: "Up to 90" },
      { label: "Time", value: "90 minutes" },
      { label: "Passing score", value: "750 on a 100 to 900 scale" },
      { label: "Exam code", value: "SY0-701" },
      { label: "Given by", value: "CompTIA, at Pearson VUE or online" },
    ],
    basedOn: "the CompTIA SY0-701 objectives",
    source: { name: "CompTIA", url: "https://www.comptia.org/certifications/security" },
  },
  boating: {
    answer:
      "State boater safety exams typically have 50 to 75 multiple-choice questions, taken online at the end of an approved course, with 80% to pass. Most states require a boater education card for operators born after a set date. Cards from NASBLA-approved courses are accepted in every state that requires one, and in most states they never expire.",
    rows: [
      { label: "Questions", value: "50 to 75 (typical)" },
      { label: "Passing score", value: "80% (typical)" },
      { label: "Format", value: "Online, at the end of an approved course" },
      { label: "Reciprocity", value: "NASBLA-approved cards accepted nationwide" },
    ],
    basedOn: "the NASBLA boating education standards",
    source: { name: "NASBLA", url: "https://www.nasbla.org" },
  },
  hunter: {
    answer:
      "Most state hunter education exams have about 50 multiple-choice questions with 80% to pass, taken online or at the end of a field day. Nearly every state requires hunter education for first-time hunters born after a cutoff date. The certificate is recognized in every US state and Canadian province and does not expire.",
    rows: [
      { label: "Questions", value: "About 50 (typical)" },
      { label: "Passing score", value: "80% (typical)" },
      { label: "Format", value: "Online or at a field day" },
      { label: "Recognized", value: "Every US state and Canadian province" },
    ],
    basedOn: "the IHEA-USA hunter education standards",
    source: { name: "IHEA-USA", url: "https://www.ihea-usa.org" },
  },
  lifeguard: {
    answer:
      "Lifeguard certification has a written exam and in-water skills scenarios, and most courses require 80% or higher on the written exam. Courses also have swim prerequisites, such as a 300-yard continuous swim and a timed brick retrieval, and most require you to be at least 15. Certification, including CPR and AED, usually lasts two years.",
    rows: [
      { label: "Passing score", value: "80% on the written exam (typical)" },
      { label: "Also required", value: "In-water skills and swim prerequisites" },
      { label: "Minimum age", value: "15 for most courses" },
      { label: "Valid for", value: "2 years" },
    ],
    basedOn: "the material every major lifeguard program teaches",
  },
  cosmetology: {
    answer:
      "These practice sets follow the NIC National Cosmetology Theory Examination only. That exam is 110 multiple-choice questions, 100 of them scored, in 90 minutes. The 110-question, 90-minute length is NIC only. The content outline effective July 1, 2022 (candidate bulletin revised January 1, 2026, weights unchanged) gives Scientific Concepts 35 percent, Hair Care and Services 45 percent, Skin Care 10 percent and Nail Care 10 percent. PSI gives a different national theory exam: 110 questions (100 scored) in 120 minutes, with infection control 30 percent, client consultation 19 percent, haircoloring 10 percent, chemical texture 12 percent, hair removal 8 percent, nail care 8 percent, skin care 4 percent, eyelash and eyebrow 4 percent, haircutting 3 percent and hairstyling 2 percent. The California Board of Barbering and Cosmetology set April 1, 2026 for that PSI outline. PSI lists national testing in Alabama, Colorado, Georgia, Kentucky, Maryland, Michigan and Tennessee, and theory testing in California, Massachusetts and Hawaii. This bank is not weighted to the PSI outline. A separate practical exam, training hours and fees vary by state.",
    rows: [
      { label: "NIC questions", value: "110 (100 scored). NIC only" },
      { label: "NIC time", value: "90 minutes. NIC only" },
      { label: "PSI questions and time", value: "110 (100 scored) in 120 minutes. Not this bank" },
      { label: "Passing score", value: "NIC scaled score, 75 in most NIC states (varies by state)" },
      { label: "Who uses which", value: "NIC in many states. PSI national: AL, CO, GA, KY, MD, MI, TN. PSI theory: CA, MA, HI" },
    ],
    basedOn: "the NIC National Cosmetology Theory Examination content outline, effective July 1, 2022 (110 items, 90 minutes; NIC only)",
    source: { name: "NIC Cosmetology Theory CIB", url: "https://prov-testing.github.io/nic_cib/cosmetology_national_theory_english.html" },
  },
  vtne: {
    answer:
      "The Veterinary Technician National Examination (VTNE), given by the AAVSB, has 170 multiple-choice questions, 150 scored and 20 unscored pilot items, in 3 hours at Prometric centers. It is scored on a 200 to 800 scale and 425 passes. The outline approved in March 2023 has ten domains: animal care and nursing is 20%, pharmacology, surgical nursing and anesthesia about 13% each, laboratory procedures 9%, imaging 6%, and dentistry, emergency and critical care, pain management and communication 5 to 7% each.",
    rows: [
      { label: "Questions", value: "170 (150 scored)" },
      { label: "Time", value: "3 hours" },
      { label: "Passing score", value: "Scaled 425 of 800" },
      { label: "Fee", value: "$375 per attempt" },
      { label: "Windows", value: "3 a year: Mar 15 to Apr 15, Jul 15 to Aug 15, Nov 15 to Dec 15" },
      { label: "Given by", value: "AAVSB, at Prometric test centers" },
    ],
    basedOn: "the AAVSB VTNE content outline approved March 2023",
    source: { name: "AAVSB VTNE Candidate Information Handbook", url: "https://www.aavsb.org/vtne-overview/" },
  },
  auwa: {
    answer:
      "The Western Australia car learner's theory test (the Computerised Theory Test) is 30 multiple-choice questions on the road rules and safe driving from the Drive Safe handbook, and you need at least 24 correct (80%) to pass. You can sit it at a Driver and Vehicle Services centre or regional agent from age 16, the same day you apply for your learner's permit, and a pass is valid for 5 years. Learners then need 6 months and the Hazard Perception Test, and 50 supervised hours including 5 at night, before the driving assessment at 17.",
    rows: [
      { label: "Questions", value: "30 multiple choice" },
      { label: "Passing score", value: "24 of 30 (80%)" },
      { label: "Minimum age", value: "16 for a car learner's permit" },
      { label: "Pass valid for", value: "5 years" },
      { label: "Handbook", value: "Drive Safe (edition of 5 August 2026)" },
      { label: "Next steps", value: "Hazard Perception Test, 50 logged hours, driving assessment at 17" },
      { label: "Given by", value: "WA Department of Transport and Major Infrastructure, at DVS centres and agents" },
    ],
    basedOn: "Drive Safe, a handbook for Western Australian road users (revised 5 August 2026)",
    source: { name: "Transport WA: Take the theory test", url: "https://www.transport.wa.gov.au/licensing/drivers-licence/get-a-licence/car/take-theory-test" },
  },
  camb: {
    answer:
      "The Manitoba Class 5 knowledge test is the written test for a Class 5L learner licence. Manitoba Public Insurance (MPI) gives it on a computer, booked with an Autopac agent or online, with a 30-minute time limit and a $12 fee; it is not open book and covers traffic laws, safe driving practices and road signs from the MPI Driver's Handbook, and is usually reported as 30 multiple-choice questions. You must be 16 (15 and a half in a high school driver education course), and GDL applicants who fail wait seven days to retake it.",
    rows: [
      { label: "Questions", value: "30 multiple choice (reported; MPI does not publish a count)" },
      { label: "Time", value: "30 minutes" },
      { label: "Passing score", value: "Not published by MPI (prep sites say 24 or 25 of 30)" },
      { label: "Fee", value: "$12 per test" },
      { label: "Minimum age", value: "16, or 15 and a half in high school driver education" },
      { label: "Retake wait", value: "7 days (GDL applicants)" },
      { label: "Languages", value: "English, French and 28 other languages, with audio" },
      { label: "Next stage", value: "Class 5L Learner Stage, at least 9 months" },
    ],
    basedOn: "the MPI Driver's Handbook, October 2026 edition",
    source: { name: "Manitoba Public Insurance: Testing for your Class 5 licence", url: "https://www.mpi.mb.ca/testing-for-your-class-5-licence/" },
  },
  caon: {
    answer:
      "The G1 knowledge test is the written test you pass at a DriveTest Centre to get your learner's licence in Ontario. It is multiple choice, with a road signs section and a rules of the road section drawn from the Official MTO Driver's Handbook, and you need an 80% total score; it is not timed. You must be at least 16 and pass a vision test too, then hold the G1 for 12 months (8 with an approved driver education course) before the G2 road test.",
    rows: [
      { label: "Format", value: "Multiple choice: road signs and rules of the road" },
      { label: "Passing score", value: "80% total" },
      { label: "Time", value: "Not timed (typically 20 to 30 minutes)" },
      { label: "Minimum age", value: "16" },
      { label: "Also required", value: "Vision test and two pieces of ID" },
      { label: "Languages", value: "32 for the G1 test" },
      { label: "Next step", value: "G2 road test after 12 months (8 with approved driver ed)" },
      { label: "Given by", value: "DriveTest, for the Ontario Ministry of Transportation" },
    ],
    basedOn: "the Official MTO Driver's Handbook (chapters updated through September 2026)",
    source: { name: "Official MTO Driver's Handbook", url: "https://www.ontario.ca/document/official-mto-drivers-handbook" },
  },
  caab: {
    answer:
      "The Alberta Class 7 knowledge test is 30 multiple-choice questions taken on a computer at a registry agent office, and you need 25 correct (83%) to pass. It covers safe driving practices, driving laws and road signs from the Driver's Guide. You must be at least 14, pass a vision test, and have a parent's or guardian's consent if you are under 18; you can take it once a day.",
    rows: [
      { label: "Questions", value: "30 multiple choice" },
      { label: "Passing score", value: "25 of 30 (83%)" },
      { label: "Minimum age", value: "14 (parental consent under 18)" },
      { label: "Also required", value: "Vision test" },
      { label: "Attempts", value: "Once per day, fee each time" },
      { label: "Languages", value: "English and 24 others" },
      { label: "Where", value: "Alberta registry agent offices" },
    ],
    basedOn: "the Alberta Driver's Guide (cars and light trucks, Spring 2026)",
    source: { name: "Government of Alberta, Driver's knowledge test", url: "https://www.alberta.ca/drivers-knowledge-test" },
  },
  ukmoto: {
    answer:
      "The DVSA motorcycle theory test has two parts taken on the same day: 50 multiple-choice questions in 57 minutes, where you need 43 to pass, and a hazard perception test of 14 video clips, where you need 44 of 75. You must pass both, it costs 23 pounds and the pass certificate lasts 2 years. From 5 November 2026, three of the multiple-choice questions are based on a short silent riding video.",
    rows: [
      { label: "Multiple-choice", value: "50 questions in 57 minutes" },
      { label: "Pass mark", value: "43 of 50 (86%)" },
      { label: "Hazard perception", value: "14 clips, 44 of 75 to pass" },
      { label: "Fee", value: "£23" },
      { label: "Minimum age", value: "16 for a moped, 17 for a motorcycle" },
      { label: "Certificate valid", value: "2 years" },
    ],
    basedOn: "the DVSA motorcycle theory test guidance and The Highway Code",
    source: { name: "GOV.UK: Motorcycle theory test", url: "https://www.gov.uk/motorcycle-theory-test" },
  },
  aunsw: {
    answer:
      "The NSW Driver Knowledge Test (DKT) is the road rules test you pass before getting a learner licence. It is 45 multiple-choice questions in two parts: 15 general knowledge questions, of which you must get 12 right, and 30 road safety questions, of which you must get 29 right. You can take it online as part of a 4 to 6 hour course from 15 years and 11 months, or in person at a service centre from 16.",
    rows: [
      { label: "Questions", value: "45 (15 general knowledge, 30 road safety)" },
      { label: "Passing score", value: "12 of 15 and 29 of 30 (41 of 45)" },
      { label: "Minimum age", value: "15 years 11 months online, 16 in person" },
      { label: "Online retakes", value: "Unlimited for one fee, after 12 hours" },
      { label: "Languages online", value: "English and 8 community languages" },
      { label: "Given by", value: "Transport for NSW, through Service NSW" },
    ],
    basedOn: "the Transport for NSW Road User Handbook (2026 edition)",
    source: { name: "NSW Government: Driver Knowledge Test", url: "https://www.nsw.gov.au/driving-boating-and-transport/driver-and-rider-licences/driver-licences/driver-licence-tests/driver-knowledge-test" },
  },
  cabc: {
    answer:
      "The ICBC Class 7L knowledge test for a British Columbia learner's licence has 50 multiple-choice questions taken from ICBC's Learn to Drive Smart guide, and you need 40 correct (80%) to pass. You have up to 45 minutes, can take it online or at an ICBC driver licensing office from age 16, and must also pass a vision screening. It is offered in 12 languages.",
    rows: [
      { label: "Questions", value: "50 multiple choice" },
      { label: "Passing score", value: "40 of 50 (80%)" },
      { label: "Time", value: "Up to 45 minutes" },
      { label: "Minimum age", value: "16" },
      { label: "Fee", value: "$15 test, $10 Class 7L licence" },
      { label: "Where", value: "Online or at an ICBC driver licensing office" },
      { label: "Languages", value: "12, including French, Punjabi, Mandarin and Cantonese" },
    ],
    basedOn: "ICBC's Learn to Drive Smart guide and knowledge test tip sheet (June 2026)",
    source: { name: "ICBC: Get your L", url: "https://icbc.com/driver-licensing/new-drivers/Get-your-L" },
  },
  ukpcv: {
    answer:
      "The bus and coach (PCV) theory test is Part 1 of the Driver CPC, run by DVSA in Great Britain. The multiple-choice part has 100 questions in 1 hour 55 minutes and you need 85 correct to pass; a separate hazard perception part has 19 video clips with a pass mark of 67 out of 100. You must pass both within 2 years of each other, and the certificate lasts 2 years from the first pass.",
    rows: [
      { label: "Questions", value: "100 multiple choice" },
      { label: "Time", value: "1 hour 55 minutes" },
      { label: "Pass mark", value: "85 out of 100" },
      { label: "Hazard perception", value: "Separate test: 19 clips, pass 67 of 100 (not in this practice test)" },
      { label: "Fee", value: "£26 multiple choice, £11 hazard perception" },
      { label: "Valid for", value: "2 years from passing the first part" },
      { label: "Run by", value: "DVSA, at theory test centres in Great Britain" },
    ],
    basedOn: "the GOV.UK Driver CPC part 1 theory test guidance and the DVSA bus and coach theory topics, checked October 2026",
    source: { name: "GOV.UK: Driver CPC part 1 theory test", url: "https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-1-theory-test" },
  },
  ukcar: {
    answer:
      "The DVSA car theory test has two parts taken in one sitting: 50 multiple-choice questions in 57 minutes, where you need 43 to pass, then a hazard perception test of 14 video clips scored out of 75, where you need 44. You must pass both, need a provisional licence and must be at least 17 (16 with the higher mobility rate of PIP), and the pass certificate lasts 2 years.",
    rows: [
      { label: "Questions", value: "50 multiple choice (3 on a video clip)" },
      { label: "Time", value: "57 minutes" },
      { label: "Pass mark", value: "43 of 50 (86%)" },
      { label: "Hazard perception", value: "14 clips, 44 of 75 to pass" },
      { label: "Fee", value: "£23" },
      { label: "Minimum age", value: "17 (16 with higher-rate PIP mobility)" },
      { label: "Certificate valid", value: "2 years" },
      { label: "Given by", value: "DVSA, in England, Scotland and Wales" },
    ],
    basedOn: "The Highway Code and the DVSA theory test rules on GOV.UK",
    source: { name: "GOV.UK: Theory test", url: "https://www.gov.uk/theory-test" },
  },
  ukadi: {
    answer:
      "The ADI part 1 test is the first of three DVSA tests to become an approved driving instructor in Great Britain. It has 100 multiple-choice questions in 1 hour 30 minutes, 25 in each of four bands, and you need 85 overall and at least 20 in every band, plus 57 out of 75 on a hazard perception part taken in the same sitting. It costs 81 pounds, and after passing you have 2 years to pass parts 2 and 3.",
    rows: [
      { label: "Questions", value: "100 multiple choice, 25 per band" },
      { label: "Time", value: "1 hour 30 minutes" },
      { label: "Pass mark", value: "85 of 100, and 20 of 25 in each band" },
      { label: "Hazard perception", value: "14 clips, 57 of 75 to pass" },
      { label: "Fee", value: "81 GBP" },
      { label: "Retake", value: "After at least 3 working days" },
      { label: "Given by", value: "DVSA, at theory test centres" },
    ],
    basedOn: "the DVSA ADI part 1 test guidance on GOV.UK, checked October 2026",
    source: { name: "GOV.UK: Approved driving instructor (ADI) part 1 test", url: "https://www.gov.uk/adi-part-1-test" },
  },
  auvic: {
    answer:
      "The VicRoads learner permit test is a computer-based, multiple-choice test of 32 questions on road law and road safety, and you need 25 correct (78%) to pass. It is taken with an eyesight test, you must be at least 16 to get the permit, and the questions come from the Road to Solo Driving handbook. Once you pass, the learner permit is valid for 10 years.",
    rows: [
      { label: "Questions", value: "32, multiple choice" },
      { label: "Passing score", value: "25 correct (78%)" },
      { label: "Also required", value: "Eyesight test, proof of identity" },
      { label: "Minimum age", value: "16 (online course enrolment from 15 years 11 months)" },
      { label: "Based on", value: "Road to Solo Driving handbook" },
      { label: "Permit valid for", value: "10 years" },
      { label: "Given by", value: "VicRoads, in person or online" },
    ],
    basedOn: "Road to Solo Driving (VicRoads, September 2026 edition)",
    source: { name: "VicRoads Road to Solo Driving handbook", url: "https://transport.vic.gov.au/road-and-active-transport/registration-and-licensing/licences/driver-history-handbooks-and-logbooks/driver-handbooks-and-logbooks" },
  },
  ausa: {
    answer:
      "The South Australia learner's theory test at Service SA has 50 questions: 8 give-way diagram questions, which you must all get right, then 42 multiple-choice questions on the road rules and safe driving, of which you need 32. You can sit it from age 16, or instead complete the online myLs course and its 30-question test (27 correct to pass). All questions come from The Driver's Handbook. Learners then hold the permit for at least 12 months if under 25, log 75 supervised hours including 15 at night, and pass the Hazard Perception Test and a practical test before P1.",
    rows: [
      { label: "Questions", value: "50 at Service SA (8 give way + 42 multiple choice)" },
      { label: "Passing score", value: "All 8 give-way questions and 32 of 42" },
      { label: "Online option", value: "myLs course and test: 27 of 30 to pass" },
      { label: "Minimum age", value: "16 for a learner's permit" },
      { label: "Handbook", value: "The Driver's Handbook (February 2026 edition)" },
      { label: "Next steps", value: "12 months on L (under 25), 75 logged hours, Hazard Perception Test, VORT or CBT&A" },
      { label: "Given by", value: "SA Department for Infrastructure and Transport, at Service SA" },
    ],
    basedOn: "The Driver's Handbook, South Australia (February 2026 edition)",
    source: { name: "My Licence SA: The Driver's Handbook", url: "https://mylicence.sa.gov.au/road-rules/the-drivers-handbook/obtaining-permit" },
  },
  auqld: {
    answer:
      "To get a car learner licence in Queensland you must be at least 16 and pass PrepL online or the written road rules test at a TMR customer service centre. Both have 30 multiple-choice questions. The written test is in two sections: you need at least 9 of 10 giving way questions and 18 of 20 road rules and licence questions right, while PrepL needs 27 of 30 (90%).",
    rows: [
      { label: "Questions", value: "30 multiple choice" },
      { label: "Passing score", value: "9 of 10 giving way and 18 of 20 road rules (PrepL: 27 of 30)" },
      { label: "Minimum age", value: "16 (PrepL enrolment from 15 years 11 months)" },
      { label: "Fee", value: "$29.70 per attempt (PrepL: one fee, 12 months access)" },
      { label: "Retakes", value: "Once a day; a pass is valid for 5 years" },
      { label: "Given by", value: "Queensland Department of Transport and Main Roads" },
    ],
    basedOn: "Queensland TMR licensing, road rules and road safety pages and the Queensland Road Rules, October 2026",
    source: { name: "Queensland Government: driver tests", url: "https://www.qld.gov.au/transport/licensing/getting/tests" },
  },
  uklgv: {
    answer:
      "The lorry theory test is part 1 of the Driver CPC, set by the DVSA. The multiple-choice part has 100 questions in 1 hour 55 minutes and you need 85 right to pass; hazard perception is a separate part of 19 video clips with a pass mark of 67 out of 100. The certificate lasts 2 years from passing the first part, and you must pass both parts within 2 years of each other.",
    rows: [
      { label: "Questions", value: "100 multiple choice" },
      { label: "Time", value: "1 hour 55 minutes" },
      { label: "Passing score", value: "85 out of 100" },
      { label: "Hazard perception", value: "Separate part: 19 clips, pass mark 67 of 100" },
      { label: "Fee", value: "£26 (multiple choice), £11 (hazard perception)" },
      { label: "Certificate valid", value: "2 years from passing the first part" },
      { label: "Given by", value: "DVSA, at theory test centres" },
    ],
    basedOn: "the DVSA lorry theory test topics, The Highway Code and the GB drivers' hours rules",
    source: { name: "GOV.UK: Driver CPC part 1 theory test", url: "https://www.gov.uk/become-lorry-bus-driver/driver-cpc-part-1-theory-test" },
  },
  caqc: {
    answer:
      "The SAAQ knowledge test is the written test for a Quebec Class 5 (passenger vehicle) licence. You take it at an SAAQ service centre after holding your learner's licence for at least 10 months. It is multiple choice in three parts, the Highway Safety Code, road signs and traffic signals, and driving behaviours and techniques, and you need 75% on each part. If you fail, you wait at least 28 days to retake it.",
    rows: [
      { label: "Format", value: "Multiple choice, three parts" },
      { label: "Passing score", value: "75% on each part" },
      { label: "When", value: "After 10 months with a learner's licence" },
      { label: "Retake", value: "Wait at least 28 days" },
      { label: "Languages", value: "French or English; Spanish, Mandarin or Arabic on request" },
      { label: "Next step", value: "Road test after 12 months, then a 2-year probationary licence" },
      { label: "Given by", value: "SAAQ, at its service centres" },
    ],
    basedOn: "the SAAQ Road Safety Education Program and Quebec's Highway Safety Code, 2026",
    source: { name: "SAAQ, Obtaining a Passenger Vehicle (Class 5) Driver's Licence", url: "https://saaq.gouv.qc.ca/en/drivers-licences/obtaining-licence/passenger-vehicle-class-5" },
  },
  cpr: {
    answer:
      "Most CPR, AED and first aid written exams require 84% to pass, which is 21 of 25 on a typical 25-question exam. They cover scene safety, adult, child and infant CPR, AED use, choking and basic first aid. Certification also needs a hands-on skills check and usually lasts two years.",
    rows: [
      { label: "Questions", value: "About 25 (typical)" },
      { label: "Passing score", value: "84% (21 of 25)" },
      { label: "Also required", value: "Hands-on skills session" },
      { label: "Valid for", value: "2 years (typical)" },
    ],
    basedOn: "current resuscitation guidelines",
    source: { name: "ILCOR", url: "https://www.ilcor.org" },
  },
  osha: {
    answer:
      "OSHA 10 is a 10-hour safety awareness course in the OSHA Outreach Training Program, in construction and general industry versions. Most providers end it with a 20 to 40 question multiple-choice final, require 70% to pass and allow up to three attempts. The Department of Labor card comes through your OSHA-authorized trainer.",
    rows: [
      { label: "Final exam", value: "20 to 40 questions (typical)" },
      { label: "Passing score", value: "70% (typical)" },
      { label: "Attempts", value: "Up to 3 at most providers" },
      { label: "Versions", value: "Construction and general industry" },
      { label: "Card from", value: "OSHA-authorized trainer" },
    ],
    basedOn: "the OSHA Outreach Training Program topics",
    source: { name: "OSHA", url: "https://www.osha.gov/training/outreach" },
  },
  forklift: {
    answer:
      "There is no government forklift license in the US. Under OSHA 1910.178 your employer certifies you after formal instruction, hands-on training and a performance evaluation on the truck you will drive, and must re-evaluate you at least every three years. Operators must be at least 18 in non-agricultural jobs.",
    rows: [
      { label: "Who certifies", value: "Your employer (no government license)" },
      { label: "Required", value: "Instruction, hands-on training, evaluation" },
      { label: "Re-evaluation", value: "At least every 3 years" },
      { label: "Minimum age", value: "18 (non-agricultural)" },
      { label: "Standard", value: "OSHA 29 CFR 1910.178" },
    ],
    basedOn: "OSHA 1910.178 and ANSI B56.1",
    source: { name: "OSHA", url: "https://www.osha.gov/powered-industrial-trucks" },
  },
  alcohol: {
    answer:
      "Alcohol server and seller exams cover how alcohol affects the body, signs of intoxication, checking IDs, refusing service and liability law. Most state and provider exams require 70 to 80% to pass, and certificates usually last two to three years. Whether training is required depends on your state.",
    rows: [
      { label: "Passing score", value: "70 to 80% (typical)" },
      { label: "Valid for", value: "2 to 3 years (typical)" },
      { label: "Required?", value: "Varies by state and employer" },
      { label: "Given by", value: "State-approved course providers" },
    ],
    basedOn: "responsible beverage service topics common to every state",
  },
  security: {
    answer:
      "Most states license unarmed security guards through a state agency, after a background check, a pre-assignment course of roughly 8 to 40 hours and a written exam. Exams are multiple choice with a pass mark around 70%, covering legal powers and use of force, patrol, access control, reports and emergencies. The minimum age is typically 18.",
    rows: [
      { label: "Passing score", value: "About 70% (varies by state)" },
      { label: "Training", value: "About 8 to 40 hours, by state" },
      { label: "Minimum age", value: "18 (unarmed, typical)" },
      { label: "Given by", value: "Your state licensing agency" },
    ],
    basedOn: "the universal portion of guard training",
  },
  htl: {
    answer:
      "The ASCP HTL and HT exams have 100 multiple-choice questions in 2 hours 30 minutes, delivered by computer adaptive testing. Scores are scaled from 100 to 999 and 400 passes. Staining is the largest area at 30 to 40%.",
    rows: [
      { label: "Questions", value: "100 (adaptive)" },
      { label: "Time", value: "2 hours 30 minutes" },
      { label: "Passing score", value: "400 on a 100 to 999 scale" },
      { label: "Given by", value: "ASCP Board of Certification" },
    ],
    basedOn: "the ASCP BOC content guideline (rev. September 2025)",
    source: { name: "ASCP BOC", url: "https://www.ascp.org/content/board-of-certification" },
  },
  cst: {
    answer:
      "The NBSTSA CST exam has 175 multiple-choice questions, 150 scored, in 4 hours. You need 102 of the 150 scored items correct to pass, about 68%. Perioperative care is 105 of the 150 scored items, with intraoperative care the largest part.",
    rows: [
      { label: "Questions", value: "175 (150 scored)" },
      { label: "Time", value: "4 hours" },
      { label: "Passing score", value: "102 of 150 scored (about 68%)" },
      { label: "Given by", value: "NBSTSA" },
    ],
    basedOn: "the NBSTSA CST content outline",
    source: { name: "NBSTSA", url: "https://www.nbstsa.org" },
  },
  crcst: {
    answer:
      "The HSPA CRCST exam has 150 multiple-choice questions in 3 hours, 140 scored, and a scaled score of 70 passes. Decontamination, preparation and packaging, and sterilization are 21% each. The CBSPD CSPDT exam covers the same material.",
    rows: [
      { label: "Questions", value: "150 (140 scored)" },
      { label: "Time", value: "3 hours" },
      { label: "Passing score", value: "Scaled 70 of 100" },
      { label: "Given by", value: "HSPA" },
    ],
    basedOn: "the HSPA CRCST content outline (rev. November 2023)",
    source: { name: "HSPA", url: "https://myhspa.org" },
  },
  uksia: {
    answer:
      "To get an SIA door supervisor licence you must pass the Level 2 Award for Door Supervisors in the Private Security Industry, a face-to-face course with four multiple-choice exams: 72 questions on working in the private security industry, 50 on door supervision, 20 on conflict management and 30 on physical intervention. You need 70 percent on the first three and 80 percent on physical intervention, plus practical assessments. You must be 18 or over and hold an emergency first aid qualification before the course starts.",
    rows: [
      { label: "Exams", value: "4 multiple-choice unit exams, 172 questions" },
      { label: "Core unit", value: "72 questions in 110 minutes, pass 50 (70%)" },
      { label: "Door supervision unit", value: "50 questions in 75 minutes, pass 35 (70%)" },
      { label: "Conflict management", value: "20 questions in 30 minutes, pass 14 (70%)" },
      { label: "Physical intervention", value: "30 questions in 45 minutes, pass 24 (80%)" },
      { label: "Before the course", value: "Emergency First Aid at Work or First Aid at Work" },
      { label: "Licence", value: "Age 18+, £204, lasts 3 years" },
      { label: "Regulator", value: "Security Industry Authority (SIA)" },
    ],
    basedOn: "the SIA door supervision specifications (April 2021) and an awarding body's published exam structure, checked October 2026",
    source: { name: "GOV.UK: SIA licence-linked training specifications", url: "https://www.gov.uk/guidance/read-the-specifications-for-sia-licence-linked-training" },
  },
  uk18ed: {
    answer:
      "The 18th Edition exam is the City & Guilds Level 3 Award in the Requirements for Electrical Installations (2382-26), on BS 7671:2018 with Amendment 4:2026, the IET Wiring Regulations. It is one online, open-book test of 60 multiple-choice questions in 2 hours, taken with a clean copy of BS 7671, and the pass mark is approximately 60%. 2382-26 replaced 2382-22 from 16 April 2026.",
    rows: [
      { label: "Questions", value: "60 multiple choice" },
      { label: "Time", value: "2 hours" },
      { label: "Pass mark", value: "About 60% (pass or fail)" },
      { label: "Open book", value: "BS 7671:2018+A4:2026 only, no notes or added material" },
      { label: "Biggest areas", value: "Protection for safety 15, selection and erection 14" },
      { label: "Qualification", value: "C&G Level 3 Award, 2382-26 (35 guided learning hours)" },
      { label: "Taken at", value: "Approved colleges and training centres, on screen" },
    ],
    basedOn: "the City & Guilds 2382-26 qualification handbook (v1.0, March 2026) and the IET and NICEIC Amendment 4 guidance, checked October 2026",
    source: { name: "City & Guilds: Requirements for Electrical Installations (2382)", url: "https://www.cityandguilds.com/qualifications-and-apprenticeships/building-services-industry/electrical-installation/2382-requirements-for-electrical-installations" },
  },
  capal: {
    answer:
      "The Canadian Firearms Safety Course (CFSC) is the RCMP course you must pass before applying for a Possession and Acquisition Licence (PAL) for non-restricted firearms. After classroom instruction from a provincially designated instructor you take a written test, usually 50 questions and mostly multiple choice, and a practical handling test, and you need 80% on each. Anyone 12 or older can take it; the PAL itself is for adults 18 and over and lasts 5 years.",
    rows: [
      { label: "Written test", value: "Usually 50 questions, mostly multiple choice" },
      { label: "Practical test", value: "Handling and PROVE on common actions" },
      { label: "Pass mark", value: "80% on each test" },
      { label: "Course delivered by", value: "Instructors designated by each province's Chief Firearms Officer" },
      { label: "Minimum age", value: "12 for the course, 18 for a PAL" },
      { label: "Licence", value: "PAL, valid 5 years; 28-day minimum wait for new applicants" },
      { label: "Restricted firearms", value: "Separate CRFSC course" },
    ],
    basedOn: "the RCMP Canadian Firearms Program course requirements and federal firearms law, checked October 2026",
    source: { name: "RCMP: Firearms safety courses", url: "https://rcmp.ca/en/firearms/firearms-safety-training-transport-and-storage/safety-courses" },
  },
  caelec: {
    answer:
      "The Red Seal Construction Electrician exam is the interprovincial journeyperson exam for electricians in Canada (309A in Ontario). It has 100 four-option multiple-choice questions in four hours, and you need 70% to pass. The questions are drawn from the Red Seal Occupational Standard's five major work activities, with code questions answered from the 2024 Canadian Electrical Code, Part I, supplied at the exam.",
    rows: [
      { label: "Questions", value: "100 multiple choice, four options each" },
      { label: "Time", value: "4 hours" },
      { label: "Pass mark", value: "70%" },
      { label: "Biggest areas", value: "Wiring systems 30, distribution and service 28" },
      { label: "Code edition", value: "2024 CEC Part I (since June 2025)" },
      { label: "Calculator", value: "Supplied at the exam; no personal devices" },
      { label: "Given by", value: "Provincial and territorial apprenticeship authorities" },
    ],
    basedOn: "the Red Seal Construction Electrician exam breakdown and Exam Preparation Guide on red-seal.ca, checked October 2026",
    source: { name: "Red Seal: Construction Electrician exam information", url: "https://red-seal.ca/eng/trades/constelectric/exam-information.shtml" },
  },
  capsw: {
    answer:
      "Ontario has no single government PSW licensing exam. Every Personal Support Worker program, at public colleges, private career colleges and district school boards, must meet the 14 vocational learning outcomes of the Ministry of Colleges and Universities PSW program standard released in January 2022, and students sit their program's final exams; career college students usually write the NACC final exam, an online theory test taken after both placements. PSWs are not a regulated health profession, but since 1 December 2024 the Health and Supportive Care Providers Oversight Authority (HSCPOA) has kept a public register of PSWs.",
    rows: [
      { label: "Program standard", value: "Ontario PSW standard, January 2022 (14 learning outcomes)" },
      { label: "Final exam", value: "Set by each program; NACC final for career colleges (online, theory)" },
      { label: "Pass mark", value: "Set by the program (70% here is a readiness line)" },
      { label: "NACC program length", value: "700 hours, including placements" },
      { label: "Key laws", value: "Fixing Long-Term Care Act 2021, Health Care Consent Act, PHIPA, RHPA" },
      { label: "Oversight", value: "HSCPOA public register since December 2024" },
      { label: "Where PSWs work", value: "Long-term care, retirement homes, home and community care, hospitals" },
    ],
    basedOn: "the Ontario Personal Support Worker program standard (Ministry of Colleges and Universities, January 2022)",
    source: { name: "Ontario.ca: College program standard, Personal Support Worker", url: "https://www.ontario.ca/page/college-program-standard-personal-support-worker" },
  },
  casfa: {
    answer:
      "Standard First Aid with CPR Level C is the intermediate level of workplace first aid in Canada under the CSA Z1210 standard, usually a two-day course. You pass a hands-on skills check and a written multiple-choice test set by the training agency, most often at 75%, and the certificate usually lasts three years. Which workers need it, and how many first aiders a workplace needs, vary by province and territory.",
    rows: [
      { label: "Course length", value: "About 2 days (13 to 16 hours)" },
      { label: "Written test", value: "Multiple choice, set by the training agency" },
      { label: "Pass mark", value: "Usually 75% (70 to 80% by agency)" },
      { label: "Also required", value: "Hands-on skills check" },
      { label: "CPR level", value: "C: adult, child and infant, with AED" },
      { label: "Valid for", value: "Usually 3 years" },
      { label: "Standard", value: "CSA Z1210 intermediate level" },
      { label: "Workplace rules", value: "Vary by province and territory" },
    ],
    basedOn: "the CSA Z1210 first aid training standard and current Canadian first aid guidelines",
    source: { name: "Standards Council of Canada: CSA Z1210:24", url: "https://scc-ccn.ca/standardsdb/standards/4032281" },
  },
  cawhmis: {
    answer:
      "WHMIS is Canada's hazard communication system for hazardous products at work, aligned with the GHS. There is no single national WHMIS exam: every worker who may be exposed must get general WHMIS education and workplace-specific training, which usually ends with the employer's or trainer's own quiz. Suppliers must provide bilingual labels and 16-section safety data sheets under the Hazardous Products Regulations, amended in December 2022 with a transition that ended on December 14, 2025.",
    rows: [
      { label: "Exam", value: "No national exam; a course quiz set by the employer or trainer" },
      { label: "Pass mark", value: "Set by the trainer (practice line here: 80%)" },
      { label: "Who needs it", value: "Workers who use or may be exposed to hazardous products" },
      { label: "Training review", value: "At least yearly in most jurisdictions; varies" },
      { label: "Safety data sheet", value: "16 sections, English and French" },
      { label: "Pictograms", value: "GHS set in a red diamond, plus the WHMIS biohazard in a circle" },
      { label: "Latest change", value: "HPR amended Dec 15, 2022; transition ended Dec 14, 2025" },
      { label: "Rules set by", value: "Health Canada (suppliers) and provincial, territorial or federal OHS law (workplaces)" },
    ],
    basedOn: "Health Canada's amended Hazardous Products Regulations page and CCOHS WHMIS fact sheets, checked October 2026",
    source: { name: "Health Canada: Amended Hazardous Products Regulations", url: "https://www.canada.ca/en/health-canada/services/environmental-workplace-health/occupational-health-safety/workplace-hazardous-materials-information-system/amendments-hazardous-products-regulations.html" },
  },
  caguard: {
    answer:
      "The Ontario security guard test is the ministry's basic test you must pass before applying for a security guard licence. It has 60 multiple-choice questions in 75 minutes on the topics of the mandatory 40-hour basic training course, and the cut score is 62%. You book it with the training completion number from your course and take it online or at select DriveTest centres; you must be 18, entitled to work in Canada and have a clean criminal record to be licensed.",
    rows: [
      { label: "Questions", value: "60 multiple choice" },
      { label: "Time", value: "75 minutes (2-hour appointment)" },
      { label: "Passing score", value: "62%" },
      { label: "Training first", value: "40 hours incl. emergency first aid (33.5 without)" },
      { label: "Minimum age", value: "18" },
      { label: "Licence", value: "Digital, $80, renewed every two years" },
      { label: "Where", value: "Online or at select DriveTest centres" },
      { label: "Given by", value: "Ontario Ministry of the Solicitor General" },
    ],
    basedOn: "the Ontario Training Syllabus for Security Guards (updated July 2026) and the ministry security guard study guide, checked October 2026",
    source: { name: "Ontario.ca: Security guard and private investigator testing", url: "https://www.ontario.ca/page/security-guard-and-private-investigator-testing" },
  },
  caauto: {
    answer:
      "The Red Seal Automotive Service Technician exam is the interprovincial certification exam for auto service technicians in Canada (trade code 310S in Ontario). It has 125 four-option multiple-choice questions, you have up to 4 hours, and you need 70% to pass. Questions follow the 2023 Red Seal Occupational Standard's eight Major Work Activities, with electrical and comfort control, steering, suspension and brakes, and engine systems the largest.",
    rows: [
      { label: "Questions", value: "125 multiple choice, 4 options each" },
      { label: "Time", value: "Up to 4 hours" },
      { label: "Pass mark", value: "70%" },
      { label: "Largest areas", value: "Electrical and HVAC 23, chassis and brakes 23, engine 22" },
      { label: "Hybrid and EV", value: "9 questions (new in the 2023 standard)" },
      { label: "Fees and eligibility", value: "Set by each province or territory" },
      { label: "Given by", value: "Provincial and territorial apprenticeship authorities, for the Red Seal Program" },
    ],
    basedOn: "the Red Seal Automotive Service Technician exam breakdown and weightings (2023 RSOS) and the Red Seal Exam Preparation Guide, checked October 2026",
    source: { name: "Red Seal: Automotive Service Technician exam information", url: "https://red-seal.ca/eng/trades/autoservtech/exam-information.shtml" },
  },
  caplumb: {
    answer:
      "The Red Seal Plumber exam is the interprovincial certification exam for plumbers in Canada (trade code 306A in Ontario). It has 125 four-option multiple-choice questions, you have up to 4 hours, and you need 70% to pass. Questions follow the 2023 Red Seal Occupational Standard's seven Major Work Activities, with sewers, sewage treatment and DWV systems (26%) and water service and distribution (19%) the largest, and code questions are based on the National Plumbing Code of Canada 2020.",
    rows: [
      { label: "Questions", value: "125 multiple choice, 4 options each" },
      { label: "Time", value: "Up to 4 hours" },
      { label: "Pass mark", value: "70%" },
      { label: "Largest areas", value: "Sewers, septic and DWV 26%, water service and distribution 19%" },
      { label: "Code", value: "National Plumbing Code of Canada 2020" },
      { label: "Fees and eligibility", value: "Set by each province or territory" },
      { label: "Given by", value: "Provincial and territorial apprenticeship authorities, for the Red Seal Program" },
    ],
    basedOn: "the Red Seal Plumber exam information and weightings (2023 RSOS) and the Red Seal Exam Preparation Guide, checked October 2026",
    source: { name: "Red Seal: Plumber exam information", url: "https://red-seal.ca/eng/trades/plumbers/exam-information.shtml" },
  },
  cacarp: {
    answer:
      "The Red Seal Carpenter exam is the interprovincial journeyperson exam for carpenters in Canada. It has 100 multiple-choice questions with four options each, you have up to four hours, and you need 70% to pass. Questions follow the 2022 Red Seal Occupational Standard across seven major work activities, and candidates are given the 2020 National Building Code (Volume 2) and a reference booklet. Passing adds the Red Seal endorsement to your provincial or territorial certificate.",
    rows: [
      { label: "Questions", value: "100 multiple choice, 4 options each" },
      { label: "Time", value: "Up to 4 hours" },
      { label: "Pass mark", value: "70%" },
      { label: "Largest areas", value: "Framing 20%, concrete work 16%" },
      { label: "Reference supplied", value: "2020 National Building Code, Volume 2" },
      { label: "Who can write it", value: "Apprentices and experienced tradespeople (hours vary by province)" },
      { label: "Run by", value: "Provincial and territorial apprenticeship authorities, Red Seal Program" },
    ],
    basedOn: "the Red Seal carpenter exam weightings (2022 standard) and the Red Seal Exam Preparation Guide, checked October 2026",
    source: { name: "Red Seal: Carpenter exam weightings", url: "https://red-seal.ca/eng/trades/carpenters/exam-weightings.shtml" },
  },
  caweld: {
    answer:
      "The Red Seal Welder exam is the interprovincial certificate of qualification exam for welders in Canada (trade code 456A in Ontario). It has 125 multiple-choice questions with four options each, a four-hour time limit and a pass mark of 70%. Since 2026 it follows the 2023 Red Seal Occupational Standard: common occupational skills 20 questions, layout and fabrication 28, cutting and gouging 23, and welding processes 54.",
    rows: [
      { label: "Questions", value: "125 multiple choice, 4 options each" },
      { label: "Time", value: "Up to 4 hours" },
      { label: "Pass mark", value: "70%" },
      { label: "Welding processes", value: "54 questions: SMAW 18, GMAW/FCAW/MCAW 18, GTAW 13, SAW 5" },
      { label: "Other areas", value: "Common skills 20, layout and fabrication 28, cutting and gouging 23" },
      { label: "Standard", value: "2023 Red Seal Occupational Standard for Welder" },
      { label: "Booked through", value: "Your provincial or territorial apprenticeship authority" },
    ],
    basedOn: "the Red Seal Welder exam breakdown and the Red Seal Exam Preparation Guide, checked October 2026",
    source: { name: "Red Seal: Welder exam information", url: "https://red-seal.ca/eng/trades/weld/exam-information.shtml" },
  },
  auwhite: {
    answer:
      "The White Card is the general construction induction card everyone needs before doing construction work in Australia. You get it by completing the nationally recognised unit CPCWHS1001 Prepare to work safely in the construction industry with a registered training organisation (RTO), usually face to face in one day. There is no exam with a set pass mark: the trainer assesses you as competent through written and oral questions and practical tasks such as fitting PPE and reporting hazards. The card is recognised in every state and territory, but in most states it lapses if you do no construction work for 2 years.",
    rows: [
      { label: "Unit", value: "CPCWHS1001 Prepare to work safely in the construction industry" },
      { label: "Delivered by", value: "Registered training organisations (RTOs)" },
      { label: "Assessment", value: "Trainer observes you; written, oral and practical tasks" },
      { label: "Pass mark", value: "None; competency-based (80% here is a readiness line)" },
      { label: "Practical tasks", value: "Fit hard hat, eye and hearing protection, hi-vis; report two hazards" },
      { label: "Card", value: "Recognised in every state and territory" },
      { label: "Lapses", value: "In most states after 2 years without construction work" },
      { label: "Issued by", value: "The state or territory regulator, or the RTO on its behalf" },
    ],
    basedOn: "the CPCWHS1001 unit of competency (Release 2) and the model WHS Regulations, checked October 2026",
    source: { name: "training.gov.au: CPCWHS1001", url: "https://training.gov.au/training/details/CPCWHS1001/unitdetails" },
  },
  ks2: {
    answer:
      "The KS2 SATs are the national curriculum tests every Year 6 pupil in England takes at school in May. English reading is one paper of three texts, 50 marks in 60 minutes. Grammar, punctuation and spelling is a 50-mark question paper in 45 minutes plus a 20-word spelling test. Mathematics is an arithmetic paper (40 marks, 30 minutes) and two reasoning papers (35 marks, 40 minutes each), with no calculator. Each subject is reported as a scaled score from 80 to 120, and 100 is the expected standard. Writing is assessed by the teacher, not by a test.",
    rows: [
      { label: "Who takes it", value: "Year 6 pupils in England, in May" },
      { label: "Reading", value: "1 paper, 3 texts, 50 marks, 60 minutes" },
      { label: "Grammar, punctuation and spelling", value: "Paper 1: 50 marks, 45 minutes; Paper 2: 20-word spelling test" },
      { label: "Maths", value: "Arithmetic 40 marks, 30 min; two reasoning papers, 35 marks, 40 min each; no calculator" },
      { label: "Scores", value: "Scaled 80 to 120 per subject; 100 is the expected standard, 110+ a high score" },
      { label: "Marks needed for 100 (2026)", value: "Reading 25/50, GPS 34/70, maths 56/110" },
      { label: "Given by", value: "The child's school, set by the Standards and Testing Agency" },
    ],
    basedOn: "the Standards and Testing Agency's key stage 2 test frameworks for English reading, English grammar, punctuation and spelling, and mathematics, and the 2026 scaled score conversion tables",
    source: { name: "Standards and Testing Agency: 2026 key stage 2 scaled score conversion tables", url: "https://www.gov.uk/government/publications/key-stage-2-tests-2026-scaled-scores" },
    tigertest:
      "Tigertest has two KS2 SATs practice tests (reading, grammar and punctuation Paper 1, and maths Papers 1, 2 and 3, each about 60% of the real length) with an estimated scaled score per subject, and five drills that each start with short lessons. All of it is free with no account required; the spelling test is not modelled.",
  },
  gcsemaths: {
    answer:
      "GCSE Mathematics in England is three written papers of 1 hour 30 minutes and 80 marks each: Paper 1 is non-calculator, and Papers 2 and 3 allow a calculator. The Foundation tier is graded 1 to 5 (4 is a standard pass, 5 a strong pass); about 25% of the marks are number, 20% algebra, 25% ratio, proportion and rates of change, 15% geometry and measures and 15% probability and statistics. AQA, Pearson Edexcel and OCR all follow the same Department for Education subject content, and grade boundaries are set after each exam.",
    rows: [
      { label: "Papers", value: "3 papers, 1 hour 30 minutes and 80 marks each" },
      { label: "Calculator", value: "Not on Paper 1; allowed on Papers 2 and 3" },
      { label: "Grades", value: "Foundation tier 1 to 5; 4 is a standard pass, 5 a strong pass" },
      { label: "Topics", value: "Number 25%, algebra 20%, ratio 25%, geometry 15%, probability and statistics 15%" },
      { label: "Pass mark", value: "Boundaries change by board and year; recently about 60% to 67% for a grade 4" },
      { label: "Exam boards", value: "AQA, Pearson Edexcel and OCR, same DfE subject content" },
    ],
    basedOn: "the Department for Education GCSE mathematics subject content (2013) and Ofqual's Foundation tier weightings, checked October 2026",
    source: { name: "GOV.UK: GCSE mathematics subject content and assessment objectives", url: "https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives" },
    tigertest:
      "Tigertest has two practice tests, each three timed papers of 20 questions (non-calculator, calculator, calculator) weighted like the Foundation tier, and five topic drills that open with short lessons on the basics. Every question has one final answer; the real papers also give marks for working. All of it is free with no account required.",
  },
  osslt: {
    answer:
      "The Ontario Secondary School Literacy Test (OSSLT) is EQAO's reading and writing test for students working toward the Ontario Secondary School Diploma, normally written for the first time in Grade 10. It is taken online in two sessions, Session A of about 65 minutes and Session B of about 75. It has 37 scored questions: 35 selected-response (23 reading questions on an information paragraph, a news report, a dialogue and a real-life narrative, and 12 writing questions) and two written answers, a short reading response and an opinion essay. Results are a scale score from 200 to 400, and 300 is needed for a successful outcome. Students who have been unsuccessful can rewrite it, and after two opportunities with at least one unsuccessful they can take the Ontario Secondary School Literacy Course (OSSLC) instead.",
    rows: [
      { label: "Who takes it", value: "Ontario secondary students, normally first in Grade 10" },
      { label: "Questions", value: "37 scored: 35 selected-response, 2 written answers" },
      { label: "Reading", value: "Information paragraph, news report, dialogue, real-life narrative" },
      { label: "Time", value: "Session A about 65 min, Session B about 75 min" },
      { label: "Passing score", value: "300 on a 200 to 400 scale (successful)" },
      { label: "If unsuccessful", value: "Rewrite, or the OSSLC after two opportunities" },
      { label: "Given by", value: "EQAO, online at the student's school" },
    ],
    basedOn: "the EQAO Ontario Secondary School Literacy Test Framework and the EQAO OSSLT assessment page",
    source: { name: "EQAO: Ontario Secondary School Literacy Test", url: "https://www.eqao.com/the-assessments/osslt/" },
    tigertest:
      "Tigertest has two 35-question OSSLT practice tests that follow the EQAO blueprint (all four reading forms and the 12 writing questions) and four drills that teach the basics first. All of it is free with no account required; the opinion essay and the written reading answer are not modelled.",
  },
  eqao9: {
    answer:
      "The EQAO Grade 9 Assessment of Mathematics is an online, computer-adaptive test that Ontario students write at school at the end of the de-streamed Grade 9 math course (MTH1W). It has two sessions of about 60 minutes, with 54 questions: 50 that count and 4 field-test questions. Each session starts with a medium set and then gives an easier or harder set. The 50 scored questions are 18 algebra (including coding), 10 number, 8 data, 8 geometry and measurement and 6 financial literacy. Results are reported as levels 1 to 4, with Level 3 the provincial standard, and from 2026-2027 the result is 20% of the MTH1W final mark.",
    rows: [
      { label: "Who takes it", value: "Ontario students finishing Grade 9 math (MTH1W), in a winter or spring window" },
      { label: "Format", value: "Online, two sessions of about 60 minutes, multi-stage adaptive" },
      { label: "Questions", value: "54 (50 scored, 4 field test)" },
      { label: "Strands", value: "Algebra 18, number 10, data 8, geometry and measurement 8, financial literacy 6" },
      { label: "Question types", value: "Single and multiple selection, drag and drop, drop-down, key entry" },
      { label: "Tools", value: "Built-in calculator (own calculator allowed) and the EQAO formula sheet" },
      { label: "Results", value: "Levels 1 to 4 (Level 3 is the provincial standard); 20% of the course mark from 2026-2027" },
    ],
    basedOn: "EQAO's Grade 9 Assessment of Mathematics framework and blueprint and the Ontario Grade 9 mathematics curriculum (MTH1W, 2021)",
    source: { name: "EQAO: Grade 9 Assessment of Mathematics", url: "https://eqao.com/the-assessments/grade-9-math" },
    tigertest:
      "Tigertest has two EQAO Grade 9 Math practice tests of two adaptive sessions each (25 scored questions per session, in EQAO's strand counts) and five strand drills that open with short Basics lessons. All of it is free with no account required; scores are percent correct, not EQAO levels.",
  },
  naplan: {
    answer:
      "NAPLAN (the National Assessment Program, Literacy and Numeracy) is sat online by Australian students in Years 3, 5, 7 and 9 each March. Year 9 sits four tests in a set order: Writing (42 minutes), Reading (65 minutes), Conventions of Language (45 minutes, spelling then grammar and punctuation) and Numeracy (65 minutes, a short non-calculator section, then an online calculator). The tests are tailored: how a student does on the first set of questions decides whether the next set is harder or easier. Since 2023 each domain is reported as one of four proficiency levels: Exceeding, Strong, Developing or Needs additional support. There is no pass mark.",
    rows: [
      { label: "Who takes it", value: "Students in Years 3, 5, 7 and 9 across Australia, in March" },
      { label: "Year 9 tests", value: "Writing 42 min, Reading 65 min, Conventions of Language 45 min, Numeracy 65 min" },
      { label: "Calculator", value: "Numeracy only, after a short non-calculator section that is locked once left" },
      { label: "Format", value: "Online, tailored: later testlets are harder or easier depending on earlier answers" },
      { label: "Results", value: "Exceeding, Strong, Developing or Needs additional support per domain; no pass mark" },
      { label: "Year 9 Strong from", value: "Reading 539, Spelling 532, Grammar and punctuation 545, Numeracy 536" },
      { label: "Given by", value: "The student's school, on ACARA's national assessment platform" },
    ],
    basedOn: "ACARA's published NAPLAN test design, tailored test structure and 2023 proficiency standards, and the Year 9 Australian Curriculum (Version 9.0)",
    source: { name: "ACARA: NAPLAN, what's in the tests", url: "https://www.nap.edu.au/naplan/whats-in-the-tests" },
    tigertest:
      "Tigertest has two NAPLAN Year 9 practice tests covering Reading, Conventions of Language and Numeracy in tailored parts, an estimated scale score per domain against the proficiency levels, and six drills that teach the basics first. All of it is free with no account required; Writing and the spelling dictation are not modelled.",
  },
  nswsel: {
    answer:
      "The Selective High School Placement Test is the NSW Department of Education's entry test for Year 7 places in selective high schools, sat on a computer in Year 6. It has four tests, each weighted 25 percent: Reading (17 questions with 38 answers in 45 minutes), Mathematical Reasoning (35 questions in 40 minutes, five options each, no calculator), Thinking Skills (40 questions in 40 minutes, four options each) and Writing (one task in 30 minutes). There is no pass mark: results are scaled and combined into a placement score, places are offered in order of merit, and each school's minimum entry score changes every year.",
    rows: [
      { label: "Who takes it", value: "Year 6 students in NSW applying for Year 7 at a selective high school" },
      { label: "Reading", value: "17 questions, 38 answers, 45 minutes, multiple choice" },
      { label: "Mathematical Reasoning", value: "35 questions, 40 minutes, five options, no calculator" },
      { label: "Thinking Skills", value: "40 questions, 40 minutes, four options" },
      { label: "Writing", value: "1 open response, 30 minutes" },
      { label: "Weighting", value: "Each test 25 percent" },
      { label: "Passing score", value: "No pass mark; places offered in order of merit" },
      { label: "Given by", value: "NSW Department of Education, on computers at test centres" },
    ],
    basedOn: "the NSW Department of Education's published test format for the Selective High School Placement Test",
    source: { name: "NSW Department of Education: get ready for the Selective High School Placement Test", url: "https://education.nsw.gov.au/schooling/students/oc-and-shs/going-to-a-selective-high-school/get-ready-for-the-selective-high-school-placement-test" },
    tigertest:
      "Tigertest has two full practice tests covering Reading, Mathematical Reasoning and Thinking Skills at the real lengths and times, a percent score per section, and five drills that teach the basics first. All of it is free with no account required; Writing is not modelled.",
  },
  naplan7: {
    answer:
      "NAPLAN (the National Assessment Program, Literacy and Numeracy) is sat online by Australian students in Years 3, 5, 7 and 9 each March. Year 7 sits four tests in a set order: Writing (42 minutes), Reading (65 minutes), Conventions of Language (45 minutes, spelling then grammar and punctuation) and Numeracy (65 minutes, a short non-calculator section, then an online calculator). The tests are tailored: how a student does on the first set of questions decides whether the next set is harder or easier. Since 2023 each domain is reported as one of four proficiency levels: Exceeding, Strong, Developing or Needs additional support. There is no pass mark.",
    rows: [
      { label: "Who takes it", value: "Students in Years 3, 5, 7 and 9 across Australia, in March" },
      { label: "Year 7 tests", value: "Writing 42 min, Reading 65 min, Conventions of Language 45 min, Numeracy 65 min" },
      { label: "Calculator", value: "Numeracy only, after a short non-calculator section that is locked once left" },
      { label: "Format", value: "Online, tailored: later testlets are harder or easier depending on earlier answers" },
      { label: "Results", value: "Exceeding, Strong, Developing or Needs additional support per domain; no pass mark" },
      { label: "Year 7 Strong from", value: "Reading 500, Spelling 497, Grammar and punctuation 513, Numeracy 500" },
      { label: "Given by", value: "The student's school, on ACARA's national assessment platform" },
    ],
    basedOn: "ACARA's published NAPLAN test design, tailored test structure and 2023 proficiency standards, and the Year 7 Australian Curriculum (Version 9.0)",
    source: { name: "ACARA: NAPLAN results and reports", url: "https://www.nap.edu.au/naplan/results-and-reports" },
    tigertest:
      "Tigertest has two NAPLAN Year 7 practice tests covering Reading, Conventions of Language and Numeracy in tailored parts, an estimated scale score per domain against the Year 7 proficiency levels, and six drills that teach the basics first. All of it is free with no account required; Writing and the spelling dictation are not modelled.",
  },
  ocnsw: {
    answer:
      "The Opportunity Class Placement Test is the NSW Department of Education's test for Year 5 places in opportunity classes, sat on a computer in mid-May of Year 4. It has three multiple-choice tests, each weighted one third: Reading (14 questions with 33 answers in 40 minutes), Mathematical Reasoning (35 questions in 40 minutes, five options each, no calculator) and Thinking Skills (30 questions in 30 minutes, four options each). There is no writing test and no pass mark: results are scaled, places are offered in order of merit, and each school's minimum entry score changes every year.",
    rows: [
      { label: "Who takes it", value: "Year 4 students applying for a Year 5 opportunity class in NSW" },
      { label: "Reading", value: "14 questions, 33 answers, 40 minutes, multiple choice" },
      { label: "Mathematical Reasoning", value: "35 questions, 40 minutes, five options, no calculator" },
      { label: "Thinking Skills", value: "30 questions, 30 minutes, four options" },
      { label: "Writing", value: "None" },
      { label: "Weighting", value: "Each test one third" },
      { label: "Passing score", value: "No pass mark; places offered in order of merit" },
      { label: "Given by", value: "NSW Department of Education, on computers at test centres, in mid-May" },
    ],
    basedOn: "the NSW Department of Education's published test format for the Opportunity Class Placement Test",
    source: { name: "NSW Department of Education: get ready for the Opportunity Class Placement Test", url: "https://education.nsw.gov.au/schooling/students/oc-and-shs/going-to-an-opportunity-class/get-ready-for-the-opportunity-class-placement-test" },
    tigertest:
      "Tigertest has two full practice tests covering Reading, Mathematical Reasoning and Thinking Skills at the real lengths and times, a percent score per section, and five drills that teach the basics first. All of it is free with no account required.",
  },
  vicsel: {
    answer:
      "The Victorian Selective Entry High Schools exam is the entry test for Year 9 places at Nossal High School, Suzanne Cory High School, The Mac.Robertson Girls' High School and Melbourne High School, sat on paper in June of Year 8. ACER runs applications, the exam and offers for the Victorian Department of Education. The exam has Mathematics and Quantitative Reasoning (60 minutes, multiple choice), a 20-minute break, Reading and Verbal Reasoning (55 minutes, multiple choice) and Writing (two tasks in 40 minutes). Calculators are not allowed and no section goes beyond the Year 8 curriculum. There is no pass mark: about 85 percent of the roughly 1,000 places are offered in rank order of exam performance.",
    rows: [
      { label: "Who takes it", value: "Year 8 students in Victoria applying for Year 9 at a selective entry high school" },
      { label: "Mathematics and Quantitative Reasoning", value: "60 minutes, multiple choice, no calculator" },
      { label: "Reading and Verbal Reasoning", value: "55 minutes, multiple choice" },
      { label: "Writing", value: "2 tasks, 40 minutes" },
      { label: "Content level", value: "Nothing beyond the Year 8 curriculum" },
      { label: "Places", value: "About 1,000 across four schools; 85% standard merit, up to 10% equity, up to 5% principal discretion" },
      { label: "Passing score", value: "No pass mark; places offered in rank order" },
      { label: "Given by", value: "ACER for the Victorian Department of Education, on paper at exam centres in June" },
    ],
    basedOn: "the Victorian Government's selective entry high schools page and ACER's published exam format",
    source: { name: "Victorian Government: selective entry high schools", url: "https://www.vic.gov.au/selective-entry-high-schools" },
    tigertest:
      "Tigertest has two full practice tests covering Mathematics and Quantitative Reasoning and Reading and Verbal Reasoning at the real times, 40 questions per section, a percent score per section, and four drills that teach the basics first. All of it is free with no account required; Writing is not modelled.",
  },
  hscmaths: {
    answer:
      "HSC Mathematics Standard 2 is one written paper sat by Year 12 students in NSW in the HSC exam period: 100 marks in 2 hours 30 minutes plus 10 minutes reading time, with NESA-approved calculators and a reference sheet. Section I is objective-response (multiple-choice) questions worth 15 marks; Section II is 35 to 40 items worth 85 marks, some with parts and at least two worth 4 or 5 marks. From the 2027 HSC it examines the Mathematics Standard 11-12 Syllabus (2024), focusing on Year 12 with Year 11 as assumed knowledge.",
    rows: [
      { label: "Who takes it", value: "Year 12 students in NSW, in the October to November HSC exam period" },
      { label: "Paper", value: "100 marks, 2 hr 30 min plus 10 min reading time" },
      { label: "Sections", value: "Section I: 15 marks objective response; Section II: 85 marks, 35 to 40 items" },
      { label: "Calculator and formulas", value: "NESA-approved calculator; reference sheet provided" },
      { label: "Syllabus", value: "Mathematics Standard 11-12 (2024), first examined in 2027" },
      { label: "Results", value: "HSC mark (exam and school assessment) reported in Bands 1 to 6" },
      { label: "Given by", value: "NSW Education Standards Authority (NESA)" },
    ],
    basedOn: "the NESA Mathematics Standard 11-12 Syllabus (2024) and its HSC examination specifications for Mathematics Standard 2",
    source: { name: "NESA: Mathematics Standard 11-12 Syllabus (2024), HSC examinations", url: "https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-standard-11-12-2024/assessment/hsc-examinations" },
    tigertest:
      "Tigertest has two HSC Maths Standard 2 practice papers (15 multiple-choice and 25 short-answer questions each, with a reference sheet) and six topic drills, three of which open with short Basics lessons. All of it is free with no account required; scores are percent correct, not bands.",
  },
  aursa: {
    answer:
      "SITHFAB021 Provide responsible service of alcohol is the national RSA unit for anyone who sells, serves or supplies alcohol in Australia. It is a short course, often a few hours online or in a classroom, assessed by a registered training organisation with knowledge questions and practical tasks rather than a single national exam; most providers require every knowledge question to be correct. Each state and territory sets its own certification rules, such as approved courses, photo cards and refreshers.",
    rows: [
      { label: "Unit", value: "SITHFAB021 (replaced SITHFAB002)" },
      { label: "Format", value: "RTO knowledge questions plus practical tasks" },
      { label: "Pass mark", value: "Set by the RTO, usually all knowledge questions correct (80% here is a readiness line)" },
      { label: "Course length", value: "Usually a few hours, by provider" },
      { label: "Legal drinking age", value: "18 in every state and territory" },
      { label: "Standard drink", value: "10 g of alcohol" },
      { label: "Certificate validity", value: "Varies by state (some require refreshers)" },
    ],
    basedOn: "the SITHFAB021 unit and assessment requirements on training.gov.au and the national alcohol guidelines, checked October 2026",
    source: { name: "training.gov.au: SITHFAB021 Provide responsible service of alcohol", url: "https://training.gov.au/Training/Details/SITHFAB021" },
  },
  aurcg: {
    answer:
      "RCG (Responsible Conduct of Gambling) or RSG (Responsible Service of Gambling) is the training staff need before working with gaming machines, Keno, wagering or table games in Australian hotels, clubs and casinos. Most courses deliver the national unit SITHGAM022 Provide responsible gambling services, assessed by a registered training organisation as competent or not yet competent, with no national pass mark. Each state or territory adds its own rules, approved courses and refresher periods.",
    rows: [
      { label: "National unit", value: "SITHGAM022 Provide responsible gambling services" },
      { label: "Replaced", value: "SITHGAM001 (equivalent, 2022)" },
      { label: "Assessment", value: "Competency based: questions, scenarios, observation" },
      { label: "Pass mark", value: "None nationally; competent or not yet competent" },
      { label: "Course length", value: "Usually under a day; varies by provider" },
      { label: "Names", value: "RCG in NSW, RSG in Victoria and Queensland" },
      { label: "State rules", value: "Set by each state or territory regulator" },
    ],
    basedOn: "the SITHGAM022 unit and assessment requirements on training.gov.au, checked October 2026",
    source: { name: "training.gov.au: SITHGAM022 unit file", url: "https://training.gov.au/TrainingComponentFiles/SIT/SITHGAM022_R1.xml" },
  },
  aufss: {
    answer:
      "A food safety supervisor (FSS) is the certified person that Australian caterers, food service and related retail businesses must appoint under Standard 3.2.2A of the Food Standards Code, which has applied since December 2023. The certificate comes from a registered training organisation, usually for units SITXFSA005 and SITXFSA006 in hospitality, and must have been obtained within the past five years. Assessment is competency based, with knowledge questions and practical tasks and no fixed pass mark. NSW adds its own key focus areas.",
    rows: [
      { label: "Who needs one", value: "Category one and two food businesses" },
      { label: "Units (hospitality)", value: "SITXFSA005 and SITXFSA006" },
      { label: "Assessment", value: "Competency based, no pass mark" },
      { label: "Certificate valid", value: "Obtained within the past 5 years" },
      { label: "Key temperatures", value: "5°C or below, 60°C or above" },
      { label: "Cooling", value: "60°C to 21°C in 2 h, to 5°C in 4 more" },
      { label: "Records (category one)", value: "Kept at least 3 months" },
      { label: "NSW extras", value: "Allergens, eggs, cleaning, Food Act offences" },
    ],
    basedOn: "FSANZ Standards 3.2.2 and 3.2.2A and the SITXFSA005 and SITXFSA006 units, checked October 2026",
    source: { name: "FSANZ: Food safety supervisor", url: "https://www.foodstandards.gov.au/business/food-safety/food-safety-supervisor" },
  },
  aufirstaid: {
    answer:
      "HLTAID011 Provide First Aid is the national unit of competency that most Australian workplaces require of their first aiders. It is taught by registered training organisations and assessed by practical demonstration, including at least 2 minutes of uninterrupted CPR on adult and infant manikins and use of an AED, plus a knowledge assessment set by the training organisation. Answers follow Australian Resuscitation Council guidelines, and the certificate is usually renewed every 3 years with CPR refreshed every 12 months.",
    rows: [
      { label: "Unit", value: "HLTAID011 Provide First Aid (includes CPR)" },
      { label: "Assessment", value: "Practical skills plus a knowledge quiz" },
      { label: "CPR requirement", value: "2 minutes uninterrupted on a floor manikin" },
      { label: "Pass mark", value: "Set by each training organisation" },
      { label: "Renewal", value: "Usually every 3 years" },
      { label: "CPR refresher", value: "Every 12 months" },
      { label: "Guidelines", value: "Australian Resuscitation Council (ANZCOR)" },
      { label: "Emergency number", value: "000 (112 from mobiles)" },
    ],
    basedOn: "The HLTAID011 unit and assessment requirements on training.gov.au, the Australian Resuscitation Council guidelines and Safe Work Australia's model Code of Practice on first aid, checked October 2026",
    source: { name: "training.gov.au: HLTAID011 Provide First Aid", url: "https://training.gov.au/Training/Details/HLTAID011" },
  },
  auforklift: {
    answer:
      "In Australia, operating a forklift truck at work needs a high risk work licence of class LF. You are assessed by an accredited assessor against the national unit TLILIC0003 Licence to operate a forklift truck: a knowledge assessment, including load weight calculations, and a practical on a real forklift (simulators are not allowed). You then apply to your state or territory WHS regulator, generally within 60 days. Applicants must be 18 or older, and the licence lasts 5 years and is recognised in every state and territory.",
    rows: [
      { label: "Licence", value: "High risk work licence, class LF (order-pickers are class LO)" },
      { label: "Unit of competency", value: "TLILIC0003 Licence to operate a forklift truck" },
      { label: "Assessment", value: "Knowledge (incl. calculations) and practical, by an accredited assessor" },
      { label: "Pass mark", value: "Set by the national assessment materials (practice line here: 80%)" },
      { label: "Minimum age", value: "18" },
      { label: "Apply within", value: "60 days of the assessment (check your regulator)" },
      { label: "Licence valid", value: "5 years, recognised nationally" },
      { label: "Issued by", value: "State or territory WHS regulator; fees vary by state" },
    ],
    basedOn: "The TLILIC0003 Assessment Requirements on training.gov.au and state regulator high risk work licence pages, checked October 2026",
    source: { name: "training.gov.au: TLILIC0003 Licence to operate a forklift truck", url: "https://training.gov.au/Training/Details/tlilic0003" },
  },
  auwah: {
    answer:
      "Working at heights training in Australia is the nationally recognised unit RIIWHS204 Work safely at heights, which replaced RIIWHS204E in September 2026 as an equivalent unit. It is usually a one-day course with a registered training organisation, assessed by practical tasks plus a written knowledge assessment that each RTO sets, with no national pass mark. The unit has no expiry date, though some employers set their own refresher requirements, and site rules vary by state and territory.",
    rows: [
      { label: "Unit", value: "RIIWHS204 (formerly RIIWHS204E)" },
      { label: "Course length", value: "Usually 1 day" },
      { label: "Assessment", value: "Practical tasks plus a knowledge test" },
      { label: "Pass mark", value: "Set by each RTO (competency based)" },
      { label: "Delivered by", value: "Registered training organisations" },
      { label: "Expiry", value: "None set; some employers require refreshers" },
      { label: "Rules", value: "Model WHS Regulations and falls codes" },
      { label: "State differences", value: "Vary by state and territory" },
    ],
    basedOn: "the RIIWHS204 unit, the model WHS Regulations and the Safe Work Australia falls codes of practice",
    source: { name: "training.gov.au: RIIWHS204 Work safely at heights", url: "https://training.gov.au/Training/Details/RIIWHS204" },
  },
  gcsehigher: {
    answer:
      "GCSE Mathematics Higher tier is three written papers sat at the end of Year 11 in England: 1 hour 30 minutes and 80 marks each, with Paper 1 non-calculator and Papers 2 and 3 calculator. Any topic can appear on any paper, weighted 30% algebra, 20% ratio, proportion and rates of change, 20% geometry and measures, 15% number and 15% probability and statistics. Higher tier awards grades 9 to 4, with an allowed grade 3, and grade boundaries are set after each exam series.",
    rows: [
      { label: "Who takes it", value: "Year 11 students in England (and resit students), usually in May and June" },
      { label: "Papers", value: "3 papers, 1 hr 30 min and 80 marks each (240 marks)" },
      { label: "Calculator", value: "Paper 1 non-calculator; Papers 2 and 3 calculator" },
      { label: "Grades", value: "9 to 4, with an allowed grade 3; boundaries change each year" },
      { label: "Content weighting", value: "Algebra 30%, ratio 20%, geometry 20%, number 15%, probability and statistics 15%" },
      { label: "Given by", value: "AQA, Pearson Edexcel or OCR, to the DfE subject content" },
    ],
    basedOn: "the Department for Education's GCSE mathematics subject content and assessment objectives (2013) and its Higher tier weightings",
    source: { name: "DfE: GCSE mathematics subject content and assessment objectives", url: "https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives" },
    tigertest:
      "Tigertest has two GCSE Maths Higher practice tests of three timed papers each (20 questions per paper, Paper 1 without a calculator) and five topic drills, four of which open with short Basics lessons. All of it is free with no account required; scores are percent correct, not grades.",
  },
  gcsescience: {
    answer:
      "GCSE Combined Science is a double award worth two GCSEs, taken by most students in England at the end of Year 11 and graded 9-9 down to 1-1. Students sit six written papers, two each for biology, chemistry and physics; on the most widely taken specification each paper lasts 1 hour 15 minutes, is worth 70 marks and counts for a sixth of the grade. There are Foundation (grades 1-1 to 5-5) and Higher (up to 9-9) tiers, calculators are allowed, and for the 2025 to 2027 exams every candidate is given a physics equation sheet.",
    rows: [
      { label: "Who takes it", value: "Most Year 11 students in England, in May and June" },
      { label: "Papers", value: "Six: two biology, two chemistry, two physics" },
      { label: "Time", value: "1 hour 15 minutes a paper on the largest specification" },
      { label: "Grades", value: "9-9 to 1-1 (double award); Foundation tier up to 5-5" },
      { label: "Given on the day", value: "Calculator; physics equation sheet (2025 to 2027)" },
      { label: "Set by", value: "Exam boards (AQA, Pearson Edexcel, OCR, Eduqas) on DfE subject content" },
    ],
    basedOn: "the Department for Education GCSE combined science subject content and the 2024 decision on equation sheets for 2025 to 2027",
    source: { name: "Department for Education: GCSE combined science subject content", url: "https://www.gov.uk/government/publications/gcse-combined-science" },
    tigertest:
      "Tigertest has two timed practice tests (20 biology, 20 chemistry and 20 physics questions each) and six drills split by paper 1 and paper 2 topics, four of which start with short lessons on the maths skills. All of it is free with no account required.",
  },
  gcsecs: {
    answer:
      "GCSE Computer Science is two written exams of equal weight, sat at the end of Year 11 in England: one on computational thinking, algorithms and programming, and one on computer systems (data representation, hardware, networks, security and the impact of technology). AQA's papers are 2 hours and 1 hour 45 minutes for 90 marks each; OCR's are 1 hour 30 minutes for 80 marks each; Pearson Edexcel's programming paper is a 2-hour on-screen exam. Grades run 9 to 1, with boundaries set after each exam series.",
    rows: [
      { label: "Who takes it", value: "Year 11 students in England, in May and June" },
      { label: "Papers", value: "2 papers, 50% each: programming and computer systems" },
      { label: "Time and marks", value: "AQA 2 h and 1 h 45 min, 90 marks each; OCR 1 h 30 min, 80 marks each" },
      { label: "Calculator", value: "Not allowed on the written papers" },
      { label: "Grades", value: "9 to 1; boundaries change each year" },
      { label: "Given by", value: "AQA, OCR or Pearson Edexcel, to the DfE subject content" },
    ],
    basedOn: "the Department for Education's GCSE subject content for computer science (updated March 2025) and the AQA 8525, OCR J277 and Pearson Edexcel 1CP2 schemes of assessment",
    source: { name: "DfE: GCSE subject content for computer science", url: "https://www.gov.uk/government/publications/gcse-computer-science/gcse-subject-content-for-computer-science" },
    tigertest:
      "Tigertest has two GCSE Computer Science practice tests of two timed 30-question papers each and seven topic drills, three of which open with step-by-step basics (binary, hex, binary addition, file sizes, trace tables and truth tables). All of it is free with no account required; scores are percent correct, not grades.",
  },
  elevenplus: {
    answer:
      "The 11+ is the entrance test for grammar schools in parts of England and in Northern Ireland, usually sat in September of Year 6. There is no single national test: each area or school sets its own. Most multiple-choice 11+ tests are drawn from English (comprehension, spelling, punctuation and grammar), maths (Key Stage 2), verbal reasoning (word and code puzzles) and non-verbal reasoning (shape puzzles), with papers of about 45 to 60 minutes marked by computer. Raw marks are turned into an age-standardised score, and each area or school sets its own qualifying score.",
    rows: [
      { label: "Who takes it", value: "Year 6 pupils applying to grammar schools, usually in September" },
      { label: "Papers", value: "English, maths, verbal reasoning and non-verbal reasoning; areas choose and combine them" },
      { label: "Format", value: "Multiple choice on a separate answer sheet, computer marked" },
      { label: "Typical length", value: "About 45 to 60 minutes a paper" },
      { label: "Passing score", value: "No single pass mark; an age-standardised score against a local qualifying score" },
      { label: "Set by", value: "Each local authority, consortium or grammar school" },
    ],
    basedOn: "the national curriculum in England for Key Stage 2 English and mathematics and the published formats of multiple-choice 11+ tests such as the Kent Test",
    source: { name: "Kent County Council: prepare for the Kent Test", url: "https://www.kent.gov.uk/education-and-children/schools/school-places/kent-test/prepare-for-the-kent-test" },
    tigertest:
      "Tigertest has two timed practice tests (English, Maths and Verbal Reasoning, 90 questions each) and six drills, four of which start with short click-through lessons on skills like hidden words, letter codes and fractions of amounts. Non-verbal reasoning is not covered. All of it is free with no account required.",
  },
  fsmaths: {
    answer:
      "Functional Skills Maths Level 2 is an Ofqual-regulated qualification in England that tests using maths to solve real-life problems. It is one exam set by the awarding body you register with, with a non-calculator part worth 25% of the marks and a calculator part for the rest; about three-quarters of the marks are for multi-step problems. It covers using numbers (including fractions, percentages, ratio and formulas), measures, shape and space, and handling data and probability. Each awarding body sets its own paper length and pass mark.",
    rows: [
      { label: "Who takes it", value: "Adults, apprentices and college learners in England" },
      { label: "Format", value: "One exam: a non-calculator section (25% of marks) and a calculator section" },
      { label: "Time", value: "Set by the awarding body, often around 2 hours (Pearson Edexcel: 25 min + 1 hr 30 min)" },
      { label: "Passing score", value: "Set for each paper by the awarding body" },
      { label: "Content", value: "Number; measures, shape and space; handling information and data" },
      { label: "Given by", value: "Ofqual-regulated awarding bodies, on paper or on screen" },
    ],
    basedOn: "the Department for Education's Functional Skills mathematics subject content (Level 2) and Ofqual's assessment weightings",
    source: { name: "DfE: Functional Skills subject content, mathematics", url: "https://www.gov.uk/government/publications/functional-skills-subject-content-mathematics" },
    tigertest:
      "Tigertest has two Functional Skills Maths Level 2 practice papers (10 non-calculator and 30 calculator questions each) and four topic drills, each opening with short click-through lessons. All of it is free with no account required; scores are percent correct.",
  },
  cscs: {
    answer:
      "Most CSCS cards need a pass in the CITB Health, Safety and Environment test taken in the last 2 years. The operatives version, for site workers, has 50 multiple-choice questions in 45 minutes and you need 45 right (90%). It costs 23.50 pounds and is taken at a Pearson Professional Centre. Supervisors and managers take a separate managers and professionals test, and some trades a specialist test.",
    rows: [
      { label: "Questions", value: "50 multiple choice" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "45 of 50 (90%)" },
      { label: "Fee", value: "£23.50" },
      { label: "Where", value: "Pearson Professional Centres" },
      { label: "Pass valid for a card", value: "2 years" },
      { label: "Versions", value: "Operatives, Specialists, Managers and Professionals" },
      { label: "Given by", value: "CITB, for CSCS cards in Great Britain" },
    ],
    basedOn: "the CITB HS&E test pages and the CSCS test FAQ",
    source: { name: "CITB: Operatives test", url: "https://www.citb.co.uk/courses-tests/health-safety-and-environment-hse-test/operatives-test" },
  },
  ukfood: {
    answer:
      "The Level 2 Award in Food Safety (or Food Safety and Hygiene) for Catering is a short regulated qualification for anyone who prepares or serves food in the UK, usually a one-day course ending in a multiple-choice exam of 20 to 30 questions. Pass marks are set by each awarding body, usually 60 to 70 percent. The law does not require the certificate itself, but food handlers must be supervised and trained in food hygiene to suit their work, and most employers use the Level 2 to show it.",
    rows: [
      { label: "Exam", value: "Multiple choice, usually 20 to 30 questions" },
      { label: "Time", value: "Up to about 1 hour" },
      { label: "Pass mark", value: "Set by awarding body, about 60 to 70%" },
      { label: "Course length", value: "About 6 to 9 guided hours" },
      { label: "Legally required?", value: "Training yes; a certificate no" },
      { label: "Key temperatures", value: "8°C chill, 63°C hot hold, 75°C cook" },
      { label: "Allergens to know", value: "14, plus Natasha's Law labels" },
      { label: "Regulated by", value: "Ofqual, Qualifications Wales and CCEA" },
    ],
    basedOn: "the Level 2 Food Safety in Catering unit and Food Standards Agency guidance, checked October 2026",
    source: { name: "Food Standards Agency: Safer food, better business", url: "https://www.food.gov.uk/business-guidance/safer-food-better-business" },
  },
  ukaplh: {
    answer:
      "The Level 2 Award for Personal Licence Holders (APLH) is the accredited qualification you need before applying for a personal licence to sell alcohol in England and Wales. It is a one-unit course on the Licensing Act 2003, usually taught in a day, ending in a 40-question multiple-choice exam where you need 28 correct (70%). You then apply to the licensing authority where you live; the licence lasts indefinitely.",
    rows: [
      { label: "Questions", value: "40 multiple choice" },
      { label: "Time", value: "40 to 60 minutes, by awarding body" },
      { label: "Pass mark", value: "28 of 40 (70%)" },
      { label: "Level", value: "Level 2 (RQF), one unit" },
      { label: "Minimum age for the licence", value: "18" },
      { label: "Licence lasts", value: "Indefinitely (no renewal since 2015)" },
      { label: "Applies in", value: "England and Wales (Licensing Act 2003)" },
    ],
    basedOn: "the Licensing Act 2003, the GOV.UK personal licence guidance and awarding body specifications for the Level 2 APLH, checked October 2026",
    source: { name: "GOV.UK: Personal licence to sell alcohol", url: "https://www.gov.uk/personal-licence-to-sell-alcohol" },
  },
  ukfaw: {
    answer:
      "First Aid at Work (FAW) is the three-day workplace first aid course set out in HSE's guidance on the Health and Safety (First-Aid) Regulations 1981, usually certificated as a Level 3 Award in First Aid at Work. You are assessed on practical skills such as CPR, AED use and bandaging, and on theory through a written or multiple-choice paper set by the awarding body, with pass marks around 70%. The certificate lasts 3 years, and requalifying takes a 2-day course.",
    rows: [
      { label: "Course length", value: "3 days (EFAW is 1 day)" },
      { label: "Assessment", value: "Practical observation plus a theory paper" },
      { label: "Pass mark", value: "Set by each awarding body, about 70%" },
      { label: "Certificate valid", value: "3 years" },
      { label: "Requalification", value: "2-day course before expiry" },
      { label: "Refresher", value: "Annual, strongly recommended by HSE" },
      { label: "Guidelines", value: "Resuscitation Council UK, 2025" },
      { label: "Content set by", value: "HSE (L74, Appendices 5 and 6)" },
    ],
    basedOn: "HSE guidance L74 on the Health and Safety (First-Aid) Regulations 1981 and the Resuscitation Council UK 2025 guidelines, checked October 2026",
    source: { name: "HSE: First aid at work (L74)", url: "https://www.hse.gov.uk/pubns/books/l74.htm" },
  },
  ukcare: {
    answer:
      "The Care Certificate is the set of 16 standards that new health and social care support workers in England are expected to meet during induction, updated in March 2025 with a new standard on learning disability and autism. It is not a qualification and has no national exam or pass mark: your employer's assessor checks your knowledge and watches your practice, and guidance says it should be completed within 12 weeks of starting.",
    rows: [
      { label: "Standards", value: "16 (updated March 2025)" },
      { label: "Exam", value: "None; workplace assessment of knowledge and practice" },
      { label: "Pass mark", value: "None official (80% here is a readiness line)" },
      { label: "Time to complete", value: "Within 12 weeks of starting" },
      { label: "Who takes it", value: "New care workers, healthcare assistants and support workers" },
      { label: "Fee", value: "None; part of employer induction" },
      { label: "Next step", value: "Level 2 Adult Social Care Certificate (qualification)" },
      { label: "Developed by", value: "Skills for Care, Skills for Health and NHS England" },
    ],
    basedOn: "The Care Certificate standards and guidance published by Skills for Care",
    source: { name: "Skills for Care: Care Certificate", url: "https://www.skillsforcare.org.uk/Developing-your-workforce/Care-Certificate/Care-Certificate.aspx" },
  },
  uklitu: {
    answer:
      "The Life in the UK test is a 45-minute computer test of 24 multiple-choice questions about British values, history, culture, government and law. Most people applying for settlement (indefinite leave to remain) or British citizenship must pass it, and the pass mark is 18 correct answers, 75 percent. Every question comes from the official Home Office handbook, Life in the United Kingdom: A Guide for New Residents, and the test is taken only at approved test centres in the UK.",
    rows: [
      { label: "Questions", value: "24 multiple choice" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "18 of 24 (75%)" },
      { label: "Where", value: "Approved UK test centres, booked online" },
      { label: "Book ahead", value: "At least 3 days" },
      { label: "Needed for", value: "Settlement and British citizenship" },
      { label: "Study material", value: "A Guide for New Residents, 3rd edition" },
      { label: "Run by", value: "Home Office" },
    ],
    basedOn: "GOV.UK's Life in the UK test guidance and the official handbook, checked October 2026",
    source: { name: "GOV.UK: Life in the UK Test", url: "https://www.gov.uk/life-in-the-uk-test" },
  },
  cacit: {
    answer:
      "The Canadian citizenship test has 20 multiple-choice or true-or-false questions, and you have 45 minutes to answer them. You need 15 correct (75 percent) to pass. Every question comes from IRCC's study guide, Discover Canada: The Rights and Responsibilities of Citizenship. Applicants aged 18 to 54 take it, usually online, and get up to three chances to pass before a hearing with a citizenship official.",
    rows: [
      { label: "Questions", value: "20, multiple choice or true/false" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "15 of 20 (75%)" },
      { label: "Who takes it", value: "Applicants aged 18 to 54" },
      { label: "Attempts", value: "Up to 3, then a hearing" },
      { label: "Study guide", value: "Discover Canada (IRCC)" },
      { label: "Given by", value: "Immigration, Refugees and Citizenship Canada" },
    ],
    basedOn: "IRCC's citizenship test pages and the Discover Canada study guide, checked October 2026",
    source: { name: "IRCC: Study for the citizenship test", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test/study" },
  },
  aucit: {
    answer:
      "The Australian citizenship test is a computer-based test in English of 20 multiple-choice questions, taken in 45 minutes. All questions come from the testable section of the Home Affairs book Australian Citizenship: Our Common Bond, and five of them are about Australian values. To pass you need at least 75 percent (15 of 20) and you must answer all five values questions correctly.",
    rows: [
      { label: "Questions", value: "20 multiple choice" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "75% (15 of 20)" },
      { label: "Values questions", value: "5, and all 5 must be right" },
      { label: "Language", value: "English (text-to-speech available)" },
      { label: "Study book", value: "Our Common Bond, Parts 1 to 4" },
      { label: "Given by", value: "Department of Home Affairs" },
    ],
    basedOn: "Australian Citizenship: Our Common Bond and the Home Affairs citizenship test page, checked October 2026",
    source: { name: "Department of Home Affairs: Learn about the citizenship test", url: "https://immi.homeaffairs.gov.au/citizenship/test-and-interview/learn-about-citizenship-interview-and-test/learn-about-citizenship-test" },
  },
  gulfrn: {
    answer:
      "The Gulf registered nurse licensing exam, often called the Prometric exam for nurses, is a computer-based multiple-choice test that each Gulf health authority sets for nurses who want to practise there: DHA in Dubai, DOH in Abu Dhabi, MOHAP elsewhere in the UAE, SCFHS in Saudi Arabia, the DHP in Qatar, and the authorities in Oman, Kuwait and Bahrain. Each sets its own number of questions, time and pass mark. Qatar's DHP lists 150 questions with a 50 percent pass mark, and Saudi Arabia's SNLE has 200 questions in two 120-minute parts with a scaled pass score of 500. The published blueprints weight adult nursing most, about 40 percent.",
    rows: [
      { label: "Format", value: "Computer-based, multiple choice, one best answer" },
      { label: "Qatar (DHP)", value: "150 questions, 50% to pass" },
      { label: "Saudi Arabia (SNLE)", value: "200 questions, 2 x 120 min, 500 on 200-800" },
      { label: "Other authorities", value: "Check your authority's current guide" },
      { label: "Content", value: "Fundamentals, adult, maternal-child, leadership" },
      { label: "Biggest area", value: "Adult nursing, about 40%" },
      { label: "Set by", value: "Each Gulf health authority" },
    ],
    basedOn: "Qatar DHP's qualifying examination page and blueprint and the SCFHS SNLE Applicant Guide (2024), checked October 2026",
    source: { name: "Qatar DHP: Qualifying Examination", url: "https://dhp.moph.gov.qa/en/Pages/QualifyingExamination.aspx" },
  },
  inrto: {
    answer:
      "The learner's licence (LL) test is a short computer-based multiple-choice test on road signs and traffic rules that you must pass to get a learner's licence in India. You apply through Sarathi Parivahan and, depending on the state, take it at the RTO or online from home after an Aadhaar check and a road safety tutorial. Each state sets the number of questions (Kerala, for example, asks 30), and the central rules set the pass mark at 60 percent. The learner's licence is valid for six months, and you can take the driving test after holding it for 30 days.",
    rows: [
      { label: "Format", value: "Computer-based multiple choice" },
      { label: "Questions", value: "Varies by state (Kerala 30)" },
      { label: "Pass mark", value: "60% (e.g. 18 of 30 in Kerala)" },
      { label: "Where", value: "At the RTO or online via Sarathi, by state" },
      { label: "Minimum age", value: "18 for a car; 16 for up to 50cc with consent" },
      { label: "LL validity", value: "6 months" },
      { label: "Driving test", value: "After holding the LL for 30 days" },
      { label: "Topics", value: "Road signs, rules of the road, safety, documents" },
    ],
    basedOn: "the Motor Vehicles Act 1988 as amended in 2019, the Central Motor Vehicles Rules and the Motor Vehicles (Driving) Regulations 2017, checked October 2026",
    source: { name: "Sarathi Parivahan (Ministry of Road Transport and Highways)", url: "https://sarathi.parivahan.gov.in/" },
  },
  awssaa: {
    answer:
      "The AWS Certified Solutions Architect - Associate exam (SAA-C03) has 65 questions in 130 minutes, 50 of them scored. It is scored 100 to 1000 and 720 passes. It covers Design Secure Architectures 30%, Design Resilient Architectures 26%, Design High-Performing Architectures 24%, and Design Cost-Optimized Architectures 20%, mostly as scenario questions.",
    rows: [
      { label: "Questions", value: "65 (50 scored)" },
      { label: "Time", value: "130 minutes" },
      { label: "Passing score", value: "720 on a 100 to 1000 scale" },
      { label: "Fee", value: "150 USD" },
      { label: "Given by", value: "AWS, at Pearson VUE or online" },
    ],
    basedOn: "the AWS SAA-C03 exam guide",
    source: { name: "AWS", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/" },
  },
  az900: {
    answer:
      "The Microsoft Azure Fundamentals exam (AZ-900) gives you 45 minutes; Microsoft does not publish a fixed question count, but candidates usually see 40 to 60 questions. It is scored from 1 to 1000 with 700 to pass. Questions include multiple choice, multiple response, yes/no statement sets and matching. It covers Describe cloud concepts (25 to 30%), Describe Azure architecture and services (35 to 40%) and Describe Azure management and governance (30 to 35%), per the skills measured as of July 20, 2026.",
    rows: [
      { label: "Questions", value: "About 40 to 60 (Microsoft does not publish a fixed count)" },
      { label: "Time", value: "45 minutes" },
      { label: "Passing score", value: "700 on a 1 to 1000 scale" },
      { label: "Price", value: "Varies by country" },
      { label: "Given by", value: "Microsoft, through Pearson VUE (test center or online) or Certiport for students" },
      { label: "Retakes", value: "First retake after 24 hours; longer waits after that" },
    ],
    basedOn: "the Microsoft Learn AZ-900 study guide (skills measured as of July 20, 2026)",
    source: { name: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/" },
  },
  ccna: {
    answer:
      "The Cisco CCNA (200-301) is a single 120-minute exam with no prerequisites. Cisco does not publish the question count or a passing score; candidates usually see about 100 to 120 questions, including multiple choice, drag-and-drop and simulations, answered in order with no going back. The v1.1 topics run through February 2, 2027: Network Fundamentals 20%, Network Access 20%, IP Connectivity 25%, IP Services 10%, Security Fundamentals 15%, Automation and Programmability 10%. Version 2.0 replaces it on February 3, 2027.",
    rows: [
      { label: "Questions", value: "About 100 to 120 (not published)" },
      { label: "Time", value: "120 minutes" },
      { label: "Passing score", value: "Not published by Cisco" },
      { label: "Exam code", value: "200-301 (topics v1.1; v2.0 from Feb 3, 2027)" },
      { label: "Valid for", value: "3 years" },
      { label: "Given by", value: "Cisco, at Pearson VUE or online" },
    ],
    basedOn: "the Cisco CCNA 200-301 exam topics v1.1",
    source: { name: "Cisco", url: "https://learningnetwork.cisco.com/s/ccna-exam-topics" },
  },
  uknmc: {
    answer:
      "The NMC computer-based test (CBT) is Part 1 of the Test of Competence that nurses educated outside the UK take to join the Nursing and Midwifery Council register; the practical OSCE is Part 2. It is one sitting of 115 questions in 3 hours at a Pearson VUE test centre: Part A, 15 numeracy questions with typed answers in 30 minutes, and Part B, 100 four-option clinical questions in 2 hours 30 minutes mapped to the seven platforms of the NMC Future Nurse standards. Each part is passed or failed on its own: Part A needs 13 of 15 (87%), and Part B pass marks are generally 60% to 70% depending on the field of nursing.",
    rows: [
      { label: "Questions", value: "115: 15 numeracy (Part A) and 100 clinical (Part B)" },
      { label: "Time", value: "3 hours: 30 minutes for Part A, 2 hours 30 minutes for Part B" },
      { label: "Pass mark", value: "Part A 13 of 15 (87%); Part B generally 60% to 70%" },
      { label: "Calculator", value: "On-screen calculator for numeracy" },
      { label: "Fee", value: "83 GBP (resit Part A 50 GBP, Part B 70 GBP)" },
      { label: "Attempts", value: "3 per application, at least 10 days apart" },
      { label: "Where", value: "Pearson VUE test centres in most countries" },
    ],
    basedOn: "the NMC Test of Competence 2021 nursing test specification and adult nursing blueprint, and the CBT candidate information booklet (April 2025)",
    source: { name: "Nursing and Midwifery Council", url: "https://www.nmc.org.uk/registration/joining-the-register/toc/toc-2021/cbt/" },
  },
  pmp: {
    answer:
      "The PMP exam has 180 questions in 240 minutes, of which 170 are scored and 10 are unscored pretest items. Since the July 2026 Examination Content Outline it opens with a case-study section and has two 10-minute breaks, and it covers People 33%, Process 41% and Business Environment 26%, with about 40% of items on predictive approaches and 60% on agile or hybrid ones. PMI does not publish a pass mark: results are pass or fail with a rating for each domain from Above Target to Needs Improvement.",
    rows: [
      { label: "Questions", value: "180 (170 scored)" },
      { label: "Time", value: "240 minutes, two 10-minute breaks" },
      { label: "Domains", value: "People 33%, Process 41%, Business Environment 26%" },
      { label: "Approaches", value: "About 40% predictive, 60% agile or hybrid" },
      { label: "Result", value: "Pass or fail, plus a rating per domain" },
      { label: "Retakes", value: "Up to 3 attempts in the 1-year eligibility period" },
      { label: "Given by", value: "PMI, at Pearson VUE test centers or online" },
    ],
    basedOn: "the PMI PMP Examination Content Outline (July 2026)",
    source: { name: "PMI", url: "https://www.pmi.org/certifications/project-management-pmp/new-exam" },
  },
  nasm: {
    answer:
      "The NASM Certified Personal Trainer (NASM-CPT) exam is a proctored, NCCA-accredited computer test of 120 multiple-choice questions in 2 hours. 100 questions are scored and 20 are unscored research items, and you need a scaled score of 70 to pass. To sit it you need a high school diploma or equivalent and current CPR and AED certification. The CPT7 blueprint weights six domains: basic and applied sciences and nutrition 15%, client relations and behavioral coaching 15%, assessment 16%, program design 20%, exercise technique and training instruction 24%, and professional development and responsibility 10%.",
    rows: [
      { label: "Questions", value: "120 (100 scored, 20 research)" },
      { label: "Time", value: "2 hours" },
      { label: "Passing score", value: "Scaled score of 70" },
      { label: "Prerequisites", value: "High school diploma or GED, current CPR and AED" },
      { label: "Largest domain", value: "Exercise technique and training instruction, 24%" },
      { label: "Recertification", value: "Every 2 years, 2.0 CEUs" },
      { label: "Run by", value: "National Academy of Sports Medicine (NASM)" },
    ],
    basedOn: "NASM's exam information and support pages and the CPT7 exam blueprint, checked October 2026",
    source: { name: "NASM: CPT exam information", url: "https://www.nasm.org/certified-personal-trainer/exam-information" },
  },
  rbt: {
    answer:
      "The RBT exam is the Behavior Analyst Certification Board's certification exam for Registered Behavior Technicians, the entry-level practitioners who deliver ABA services under supervision. It has 85 multiple-choice questions in 90 minutes, 75 scored and 10 unscored pilot items, taken at a Pearson VUE test center. Since January 1, 2026 it follows the RBT Test Content Outline (3rd edition): data collection and graphing, behavior assessment, behavior acquisition, behavior reduction, documentation and reporting, and ethics. The result is pass or fail against a passing score set by the modified Angoff method, not published as a percentage.",
    rows: [
      { label: "Questions", value: "85 multiple choice (75 scored, 10 pilot)" },
      { label: "Time", value: "90 minutes" },
      { label: "Pass mark", value: "Pass/fail; passing score set by modified Angoff, no published percentage" },
      { label: "Content", value: "6 domains, 43 tasks (3rd ed. outline)" },
      { label: "Biggest domain", value: "Behavior Acquisition, 19 of 75" },
      { label: "Before the exam", value: "40-hour training and competency assessment" },
      { label: "Where", value: "Pearson VUE test centers" },
      { label: "Run by", value: "Behavior Analyst Certification Board (BACB)" },
    ],
    basedOn: "The BACB RBT Test Content Outline (3rd ed.), effective January 2026, checked October 2026",
    source: { name: "BACB: RBT Certification", url: "https://www.bacb.com/rbt/" },
  },
  cpc: {
    answer:
      "The CPC exam is AAPC's certification test for professional medical coders. It has 100 multiple-choice questions in one 4-hour sitting, and you need 70 percent overall, at least 70 correct, to pass. It is open code book: you bring the AMA CPT Professional Edition and ICD-10-CM and HCPCS Level II manuals, and the questions cover 17 areas, from terminology, anatomy and compliance to every CPT section, plus 10 medical record cases. You can take it at a testing center or at home with a live remote proctor.",
    rows: [
      { label: "Questions", value: "100 multiple choice" },
      { label: "Time", value: "4 hours, one sitting" },
      { label: "Pass mark", value: "70% overall (70 of 100)" },
      { label: "Code books", value: "CPT, ICD-10-CM, HCPCS Level II (open book)" },
      { label: "Cases", value: "10 medical records, 1 question each" },
      { label: "Where", value: "Testing center or live remote proctor" },
      { label: "Run by", value: "AAPC" },
    ],
    basedOn: "AAPC's Taking the CPC Exam page, checked October 2026",
    source: { name: "AAPC: Taking the CPC Exam", url: "https://www.aapc.com/certifications/cpc/taking-the-cpc-exam" },
  },
  jelec: {
    answer:
      "The journeyman electrician exam is a state or city licensing exam on the National Electrical Code, electrical theory and calculations, taken after a set amount of supervised work, often about 8,000 hours or a completed apprenticeship. There is no single national version: many places use the ICC national journeyman exam of about 80 multiple-choice questions in 4 hours, open book with the NEC, and 70 percent is the most common passing score. Most exams now test the 2023 NEC, but each state sets its own edition, eligibility and pass mark.",
    rows: [
      { label: "Questions", value: "About 80 multiple choice (varies by state)" },
      { label: "Time", value: "About 4 hours" },
      { label: "Passing score", value: "Usually 70% (some states 75%)" },
      { label: "Format", value: "Open book with the NEC in most states" },
      { label: "Code edition", value: "The edition your state adopted, often 2023 NEC" },
      { label: "Given by", value: "State boards via ICC, PSI or Prometric" },
    ],
    basedOn: "NFPA 70, National Electrical Code 2023, and state journeyman exam bulletins, checked October 2026",
    source: { name: "NFPA 70: National Electrical Code", url: "https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70" },
  },
  barber: {
    answer:
      "In states that use it, the NIC National Barber Theory Examination is 60 multiple-choice questions, 50 of them scored, in 90 minutes. Its content outline (candidate bulletin effective June 1, 2025) gives Scientific Concepts 35 percent (infection control, anatomy and physiology, product chemistry), Implements and Equipment 10 percent, Hair Care Services 40 percent and Facial Hair and Skin Care Services 15 percent. NIC reports a scaled score and each state board sets the pass mark, 75 in most NIC states. Some states write their own barber exam or use another testing company, and most also require a practical exam.",
    rows: [
      { label: "Questions", value: "60 (50 scored)" },
      { label: "Time", value: "90 minutes" },
      { label: "Passing score", value: "Scaled, set by each state (75 in most NIC states)" },
      { label: "Largest domain", value: "Hair Care Services, 40%" },
      { label: "Also required", value: "Practical exam in most states" },
      { label: "Run by", value: "NIC, through each state board" },
    ],
    basedOn: "the NIC National Barber Theory Examination candidate bulletin, effective June 1, 2025 (revised September 1, 2025), checked October 2026",
    source: { name: "NIC Barber Theory CIB", url: "https://prov-testing.github.io/nic_cib/barber_national_theory_english.html" },
  },
  ffi: {
    answer:
      "Firefighter I is the entry-level firefighter certification, defined by the job performance requirements in NFPA 1010 (2024), which replaced NFPA 1001. Candidates usually finish a fire academy course, then pass a written exam and a practical skills exam given by their state fire training agency or another accredited certifying body. The written test is multiple choice; many agencies use about 100 questions and a 70 percent pass mark, but each sets its own count, time limit and passing score.",
    rows: [
      { label: "Standard", value: "NFPA 1010 (2024), Firefighter I" },
      { label: "Format", value: "Written multiple choice plus a skills exam" },
      { label: "Questions", value: "Set by the agency, often about 100" },
      { label: "Pass mark", value: "Set by the agency, often 70%" },
      { label: "Given by", value: "State fire training agency or accredited body" },
      { label: "Usually taken", value: "At the end of a fire academy course" },
      { label: "Often paired with", value: "Hazmat awareness and operations" },
    ],
    basedOn: "NFPA 1010 (2024 edition) and state fire certification guidance, checked October 2026",
    source: { name: "NFPA 1010: Standard on Professional Qualifications for Firefighters", url: "https://www.nfpa.org/codes-and-standards/nfpa-1010-standard-development/1010" },
  },
  police: {
    answer:
      "There is no single national police exam. Most US agencies start hiring with a multiple-choice written test, from a testing company, a state board such as California POST (the PELLETB) or a civil service commission, that checks reading comprehension, writing and grammar, report writing, basic math and judgment. Each agency sets its own passing score, often 70 percent, and many rank candidates by score. Passing leads to a physical ability test, an oral board, a background investigation and psychological and medical exams.",
    rows: [
      { label: "Format", value: "Multiple choice, by agency" },
      { label: "Sections", value: "Reading, writing, math, judgment" },
      { label: "Passing score", value: "Set by the agency (often 70%)" },
      { label: "Given by", value: "Agency, civil service or state board" },
      { label: "Next steps", value: "Physical test, oral board, background" },
    ],
    basedOn: "common police entrance test formats and California POST's PELLETB guide, checked October 2026",
    source: { name: "California POST: PELLETB", url: "https://post.ca.gov/portals/0/post_docs/publications/Applicant_Preparation_Guide_for-the-POST_Entry-Level-Law-Enforcement-Test-Battery.pdf" },
  },
  sie: {
    answer:
      "The Securities Industry Essentials (SIE) exam is FINRA's entry-level securities exam: 75 scored multiple-choice questions, plus a few unscored pretest questions, in 1 hour and 45 minutes, with a passing score of 70. It covers capital markets, products and their risks, trading, customer accounts and prohibited activities, and the regulatory framework. Anyone 18 or older can take it without a sponsoring firm, a pass is valid for four years, and it is a corequisite for representative exams such as the Series 7.",
    rows: [
      { label: "Questions", value: "75 scored, plus unscored pretest items" },
      { label: "Time", value: "1 hour 45 minutes" },
      { label: "Passing score", value: "70" },
      { label: "Eligibility", value: "Age 18+, no firm sponsorship needed" },
      { label: "Result valid", value: "4 years" },
      { label: "Largest section", value: "Products and their risks, 44%" },
      { label: "Run by", value: "FINRA, delivered by Prometric" },
    ],
    basedOn: "FINRA's SIE exam page and content outline, checked October 2026",
    source: { name: "FINRA: Securities Industry Essentials Exam", url: "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam" },
  },
  series7: {
    answer:
      "The Series 7 is FINRA's General Securities Representative exam: 125 scored multiple-choice questions, plus 5 unscored pretest questions, in 3 hours 45 minutes, with a passing score of 72. Together with the Securities Industry Essentials (SIE) exam, a corequisite, it qualifies a registered representative to sell most securities, including stocks, bonds, options, municipal securities and investment company products. Candidates must be sponsored by a FINRA member firm, and almost three quarters of the questions cover investment information, recommendations and records.",
    rows: [
      { label: "Questions", value: "125 scored, plus 5 unscored" },
      { label: "Time", value: "3 hours 45 minutes" },
      { label: "Passing score", value: "72" },
      { label: "Corequisite", value: "SIE exam" },
      { label: "Eligibility", value: "Sponsored by a FINRA member firm" },
      { label: "Largest function", value: "Information and recommendations, 73%" },
      { label: "Run by", value: "FINRA, delivered by Prometric" },
    ],
    basedOn: "FINRA's Series 7 exam page and content outline, checked October 2026",
    source: { name: "FINRA: Series 7 Exam", url: "https://www.finra.org/registration-exams-ce/qualification-exams/series7" },
  },
  pcoc: {
    answer:
      "The Pleasure Craft Operator Card (PCOC) is the most common proof of competency needed to operate a recreational boat with any motor in Canada, electric trolling motors included. You earn it by passing a test of 50 multiple-choice questions with a course provider accredited by Transport Canada, scoring at least 75 percent (38 of 50). The card is valid for life. Operators under 16 have horsepower limits and no one under 16 may operate a personal watercraft.",
    rows: [
      { label: "Questions", value: "50 multiple choice" },
      { label: "Pass mark", value: "75% (38 of 50)" },
      { label: "Time", value: "Up to 75 minutes online, set by the provider" },
      { label: "Who needs it", value: "Operators of any motorized pleasure craft" },
      { label: "Valid for", value: "Life, no renewal" },
      { label: "Youth limits", value: "Under 12: 10 hp; 12 to 15: 40 hp unless supervised; no PWC under 16" },
      { label: "Study material", value: "Transport Canada Safe Boating Guide (TP 511E)" },
      { label: "Run by", value: "Transport Canada-accredited course providers" },
    ],
    basedOn: "Transport Canada's proof of competency rules and the Small Vessel Regulations, checked October 2026",
    source: { name: "Transport Canada: Proof of competency for recreational boaters", url: "https://tc.canada.ca/en/marine-transportation/marine-safety/proof-competency-recreational-boaters" },
  },
  cask: {
    answer:
      "The Saskatchewan Class 7 knowledge test is the written test for a learner's licence, given by SGI through motor licence issuers and driver examination offices. It has two parts, Basic (driving situations and the rules of the road) and Sign (sign identification), both from the Saskatchewan Driver's Handbook; if you fail one part you rewrite only that part, you may write once a day, and passing results last one year. SGI does not publish the question count or pass mark. You must be 16, or 15 in high school driver education, and pass a vision test, then hold the Class 7 for at least nine months before the Class 5 road test.",
    rows: [
      { label: "Format", value: "Two parts: Basic (rules of the road) and Sign" },
      { label: "Passing score", value: "Not published by SGI (prep sites report 80% per part)" },
      { label: "Retakes", value: "Rewrite only the failed part, once per day" },
      { label: "Results valid", value: "One year" },
      { label: "Minimum age", value: "16, or 15 in high school driver education" },
      { label: "Also required", value: "Vision test, original ID, parental consent under 18" },
      { label: "Learner stage", value: "At least 9 months with a supervising driver" },
      { label: "Given by", value: "SGI, at motor licence issuers and driver exam offices" },
    ],
    basedOn: "the Saskatchewan Driver's Handbook, 2026-27 edition",
    source: { name: "SGI: Saskatchewan Driver's Handbook", url: "https://sgi.sk.ca/handbook" },
  },
  cans: {
    answer:
      "The Nova Scotia Class 7 knowledge test is the written test for a learner's licence. It has two parts, a rules of the road test and a road sign test, each with 20 multiple-choice questions, and you need at least 16 correct on each part (80 percent), with 30 minutes per part. You can take it online in English or French with a webcam, or in person at a Registry of Motor Vehicles office or Access Nova Scotia centre. You must be at least 16, with a parent's written consent at 16 or 17, and you also pass a vision test before the licence is issued.",
    rows: [
      { label: "Format", value: "Two parts: rules of the road and road signs" },
      { label: "Questions", value: "20 multiple choice per part" },
      { label: "Passing score", value: "16 of 20 on each part (80%)" },
      { label: "Time", value: "30 minutes per part" },
      { label: "Where", value: "Online (English or French, webcam) or at the RMV / Access Nova Scotia" },
      { label: "Minimum age", value: "16 (written parental consent at 16 or 17)" },
      { label: "Also required", value: "Vision test, ID, photo" },
      { label: "Retake", value: "Only the failed part; next day in person, no wait online" },
      { label: "Next step", value: "Road test after 12 months (9 with approved driver education)" },
    ],
    basedOn: "novascotia.ca learner's licence test and RMV pages and the Nova Scotia Driver's Handbook, checked October 2026",
    source: { name: "Nova Scotia: Take a driver knowledge test, Learner's Licence (class 7)", url: "https://www.novascotia.ca/take-driver-knowledge-test-learners-licence-class-7" },
  },
  ukseru: {
    answer:
      "SERU (Safety, Equality and Regulatory Understanding) is the computer-based assessment that people applying for or holding a London private hire (PHV) driver's licence take at a TfL assessment centre. It tests the PHV Driver's Handbook: licensing rules, carrying out bookings, staying safe, driver behaviour, driving and parking in London, equality and disability, safeguarding and ridesharing. Passing it also shows the English reading and writing a London PHV licence needs. TfL does not publish the question count; driver guides report about 36 to 37 multiple-choice and sentence-completion questions with a 60 percent pass mark.",
    rows: [
      { label: "Questions", value: "About 36 to 37 (reported)" },
      { label: "Format", value: "Multiple choice and sentence completion" },
      { label: "Time", value: "45 to 60 minutes (reported)" },
      { label: "Pass mark", value: "About 60% (reported)" },
      { label: "Where", value: "TfL assessment centre, on a computer" },
      { label: "Study material", value: "PHV Driver's Handbook, version 1.0" },
      { label: "Also counts for", value: "English reading and writing" },
      { label: "Needed for", value: "A London PHV driver's licence" },
    ],
    basedOn: "the PHV Driver's Handbook (version 1.0, September 2021) and TfL's SERU requirement page, checked October 2026",
    source: { name: "TfL: Safety, equality and regulatory understanding requirement", url: "https://tfl.gov.uk/info-for/taxis-and-private-hire/safety-equality-and-regulatory-understanding-requirement" },
  },
  nzroad: {
    answer:
      "The learner licence theory test is the first step to driving a car in New Zealand. It is 35 multi-choice questions on a computer about the Official New Zealand Road Code, and you need at least 32 right to pass; you get 30 minutes. You must be at least 16, pass an eyesight check and show proof of identity. With a learner licence you may drive only with a supervisor who has held a full licence for at least two years, with L plates on the front and back.",
    rows: [
      { label: "Questions", value: "35 multi-choice" },
      { label: "Pass mark", value: "32 of 35" },
      { label: "Time", value: "30 minutes" },
      { label: "Minimum age", value: "16" },
      { label: "Also required", value: "Eyesight check and proof of identity" },
      { label: "Retakes", value: "Fail twice in a day: wait 10 working days" },
      { label: "Study material", value: "Official New Zealand Road Code" },
      { label: "Run by", value: "NZTA Waka Kotahi, at licensing agents" },
    ],
    basedOn: "drive.govt.nz learner licence guidance and the Official New Zealand Road Code, checked October 2026",
    source: { name: "drive.govt.nz: Doing the learner licence test", url: "https://drive.govt.nz/learner-licence/doing-the-learner-licence-test" },
  },
  phlto: {
    answer:
      "The LTO written exam is the knowledge test you pass to get a Philippine driver's license. LTO's Theoretical Driving Course module (TDC-15-S-01-2, version 9-2021) gives it as 60 questions with 48 correct to pass; an older 2008 LTO memorandum set 40 questions with 30 to pass for the non-professional license. You can get a student permit at 16 after the 15-hour Theoretical Driving Course, a non-professional license at 17 and a professional license at 18. A license is valid for five years, or ten if you had no violations.",
    rows: [
      { label: "Questions", value: "60 (TDC module v9-2021)" },
      { label: "Pass mark", value: "48 of 60 (80%)" },
      { label: "Older standard", value: "30 of 40, non-professional (LTO memo, March 2008)" },
      { label: "Minimum age", value: "16 student permit, 17 non-professional, 18 professional" },
      { label: "Student permit", value: "Valid 1 year; drive only with a licensed driver" },
      { label: "Courses", value: "15-hour TDC, then the Practical Driving Course" },
      { label: "License validity", value: "5 years, or 10 with no violations (RA 10930)" },
      { label: "Run by", value: "Land Transportation Office (LTO)" },
    ],
    basedOn: "LTO TDC module TDC-15-S-01-2 v9-2021, LTO MC AHS-2008-949 and RA 10930, checked October 2026",
    source: { name: "LTO MC AHS-2008-949: Standards for written and practical examinations", url: "https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/10/52964" },
  },
  zak53: {
    answer:
      "The K53 learner's licence test is the first step to driving a car in South Africa. It is a multiple-choice test of 64 questions drawn at random, written at a driving licence testing centre (DLTC), in three sections: rules of the road, road signs and markings, and vehicle controls. Study guides say the sections are 28, 28 and 8 questions and must each be passed separately. For a Code 2 (light motor vehicle) learner's licence you must be at least 17. The learner's licence is valid for 24 months, cannot be extended, and lets you drive only under the supervision of a licensed driver.",
    rows: [
      { label: "Questions", value: "64 multiple-choice, drawn at random" },
      { label: "Sections", value: "Rules, signs and markings, vehicle controls (28/28/8, guides say)" },
      { label: "Pass mark", value: "Each section separately: 22, 23 and 6 (guides say)" },
      { label: "Minimum age", value: "17 for Code 2 (cars)" },
      { label: "Valid for", value: "24 months, cannot be extended" },
      { label: "Driving on it", value: "Only supervised by a licensed driver" },
      { label: "Run by", value: "Driving licence testing centres (DLTCs)" },
    ],
    basedOn: "gov.za learner's licence service page, the National Road Traffic Act and Regulations, and RTMC (May 2026), checked October 2026; section counts and marks from study guides",
    source: { name: "gov.za: Apply for a learner's licence", url: "https://www.gov.za/services/driving-licence/apply-learners-licence" },
  },
  sgbtt: {
    answer:
      "The Basic Theory Test (BTT) is the first theory test for a driving licence in Singapore. It tests traffic rules, traffic regulations, traffic signs and signals and general road safety, from Part B of the Traffic Police handbook Basic Theory of Driving. You take it, with an eyesight test, at one of the three driving centres. Guides say it is 50 multiple-choice questions in 50 minutes with 45 needed to pass; the Traffic Police do not publish the format. Passing lets you apply for a Provisional Driving Licence, valid for 2 years, to learn with a licensed instructor; car learners then take the Final Theory Test.",
    rows: [
      { label: "Questions", value: "50 multiple-choice (as guides say)" },
      { label: "Pass mark", value: "45 of 50 (as guides say)" },
      { label: "Time", value: "50 minutes (as guides say)" },
      { label: "Minimum age", value: "18 for a driving licence" },
      { label: "Also required", value: "Eyesight test when you register" },
      { label: "Next step", value: "Provisional Driving Licence, valid 2 years" },
      { label: "Study material", value: "Basic Theory of Driving, Part B (2 Jan 2026)" },
      { label: "Run by", value: "Traffic Police, at BBDC, CDC and SSDC" },
    ],
    basedOn: "Traffic Police Basic Theory of Driving handbook (last updated 2.1.2026) and the Provisional Driving Licence page, checked October 2026",
    source: { name: "Singapore Police Force: Provisional Driving Licence", url: "https://www.police.gov.sg/Knowledge-Hub/Traffic/Traffic-Matters/Provisional-Driving-Licence" },
  },
  aerta: {
    answer:
      "The RTA knowledge (theory) test is an early step to a Dubai driving licence. It has 40 questions and you need at least 30 correct to pass. Before you can take it you need a valid learning permit and your Emirates ID, and you must finish the theory lectures at your driving institute: 8 hours for a light vehicle. Driving schools say the test also includes a video hazard section. The rules you are tested on are federal, so they are the same across the UAE; check the current minimum age with your emirate's licensing authority.",
    rows: [
      { label: "Questions", value: "40" },
      { label: "Pass mark", value: "30 of 40 (75%)" },
      { label: "Before the test", value: "Valid learning permit and theory lectures" },
      { label: "Theory lectures", value: "8 hours (light vehicle)" },
      { label: "Bring", value: "Emirates ID; arrive 30 minutes early" },
      { label: "Rules", value: "Federal Decree-Law No. 14 of 2024" },
      { label: "Run by", value: "RTA, through approved driving institutes" },
    ],
    basedOn: "RTA Knowledge Test service page and UAE government road safety guidance, checked October 2026",
    source: { name: "RTA: Knowledge Test", url: "https://www.rta.ae/wps/portal/rta/ae/home/rta-services/service-details?serviceId=510" },
  },
  ngfrsc: {
    answer:
      "To get a fresh driver's licence in Nigeria you must be at least 18, train at an FRSC-certified driving school and hold a learner's permit. Since 1 June 2021 the school's training ends with a computer-based theory test (CBT) on the Highway Code: FRSC's July 2021 announcement gives 35 multiple-choice questions in 30 minutes, with 60% needed to pass and a retake after 7 days. You also need a visual acuity and medical fitness certificate, a practical driving test and biometric capture at a Driver's Licence Centre. A learner may drive only with a licensed driver or instructor beside them.",
    rows: [
      { label: "Questions", value: "35 multiple-choice (FRSC, 2021)" },
      { label: "Pass mark", value: "60% (FRSC, 2021)" },
      { label: "Time", value: "30 minutes" },
      { label: "Retake", value: "After 7 days" },
      { label: "Minimum age", value: "18 (26 for a commercial licence)" },
      { label: "Training", value: "26 sessions at an FRSC-certified driving school" },
      { label: "Also required", value: "Learner's permit, medical and eyesight certificate, practical test" },
      { label: "Study material", value: "FRSC Highway Code, National Road Traffic Regulations 2012" },
      { label: "Run by", value: "Federal Road Safety Corps (FRSC)" },
    ],
    basedOn: "FRSC's CBT announcement of 8 July 2021 and the National Road Traffic Regulations 2012, checked October 2026. Tigertest's 50-question tests and 75% target are its own, not FRSC figures",
    source: { name: "FRSC: Computer Based Test for licence applicants", url: "https://frsc.gov.ng/creating-a-safer-road-use-culture-and-enhancing-the-integrity-of-the-national-drivers-license-frsc-commences-computer-based-test-for-applicants/" },
  },
  kentsa: {
    answer:
      "To get a driving licence in Kenya you train at a registered driving school and then pass the NTSA driving test, which by law covers the rules of the road, road signs and signals, the Highway Code and your fitness to drive. NTSA does not publish a current question count or pass mark for the theory part; its 2019 guidelines for written tests set at least 50 multiple-choice questions and 80% to pass. You must be at least 18 for a car licence and able to read a number plate at 25 metres. While learning you drive on a provisional licence, with L plates on the front and rear and a qualified driver licensed for that class beside you.",
    rows: [
      { label: "Questions", value: "Not published by NTSA (2019 guidelines: at least 50)" },
      { label: "Pass mark", value: "Not published by NTSA (2019 guidelines: 80%)" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 80% target" },
      { label: "Minimum age (car)", value: "18 (motorcycles 16)" },
      { label: "Eyesight", value: "Read a number plate at 25 metres" },
      { label: "Learners", value: "Provisional licence, L plates front and rear" },
      { label: "Study material", value: "Kenya Highway Code and the Traffic Act" },
      { label: "Run by", value: "National Transport and Safety Authority (NTSA)" },
    ],
    basedOn: "Traffic Act (Cap. 403) sections 30 to 33 and 39, the 2026 drink-driving rules and NTSA's 2019 written-test guidelines as reported by Business Daily, checked October 2026",
    source: { name: "Traffic Act (Cap. 403) on Kenya Law", url: "https://new.kenyalaw.org/akn/ke/act/1953/39/eng@2022-12-31" },
  },
  mykpp: {
    answer:
      "KPP01 is the computer theory test (Ujian Undang-Undang Bahagian 1) you pass before you get a Learner's Driving Licence in Malaysia. JPJ's KPP FAQ lists the car test as 50 multiple-choice questions in 45 minutes, with 42 correct needed to pass; since 29 August 2025 candidates on the combined motorcycle and car module sit 70 questions in 1 hour 15 minutes and need 56. You take a KPP01 class at a JPJ-registered driving institute first, and you must be at least 17 for a car licence. After passing you get an LDL, which lets you drive only under an institute instructor or a JPJ examiner.",
    rows: [
      { label: "Questions", value: "50 (car KPP01); 70 for KPP Gabungan" },
      { label: "Pass mark", value: "42 of 50; 56 of 70 for KPP Gabungan" },
      { label: "Time", value: "45 minutes; 1 h 15 min for KPP Gabungan" },
      { label: "Minimum age", value: "17 (class D car)" },
      { label: "Before the test", value: "KPP01 class at a JPJ-registered driving institute" },
      { label: "After passing", value: "Learner's Driving Licence (LDL), then circuit and road training" },
      { label: "Run by", value: "JPJ (Jabatan Pengangkutan Jalan)" },
    ],
    basedOn: "JPJ KPP Gabungan FAQ and MyGOV driving licence guidance, checked October 2026",
    source: { name: "MyGOV: Memohon lesen memandu", url: "https://www.malaysia.gov.my/my/categories/pengangkutan/lesen-memandu/memohon-lesen-memandu" },
  },
  hkdrive: {
    answer:
      "The Part A written test is the theory step to a private car driving licence in Hong Kong. It is 20 multiple-choice questions, each with three options, on a computer at the Transport Department's written test centre in Cheung Sha Wan, and you need at least 16 right to pass; you get 20 minutes. The questions are mainly based on the Road Users' Code and recent changes to traffic law. You must be at least 18 to drive a private car, and a learner may drive only with a licensed driving instructor, with L-plates front and rear, and never on an expressway.",
    rows: [
      { label: "Questions", value: "20 multiple-choice, 3 options each" },
      { label: "Pass mark", value: "16 of 20" },
      { label: "Time", value: "20 minutes" },
      { label: "Where", value: "TD written test centre, Cheung Sha Wan Government Offices" },
      { label: "Minimum age", value: "18 (private car)" },
      { label: "Study material", value: "Road Users' Code (Transport Department)" },
      { label: "After passing", value: "Probationary licence for at least 12 months" },
      { label: "Run by", value: "Transport Department, Hong Kong" },
    ],
    basedOn: "td.gov.hk Part A written test page and the Road Users' Code, checked October 2026",
    source: { name: "Transport Department: Part A Test (Written Test)", url: "https://www.td.gov.hk/en/public_services/licences_and_permits/driving_test/wt/index.html" },
  },
  iedtt: {
    answer:
      "The Driver Theory Test is the computer test you must pass in Ireland before you can apply for your first learner permit. The car test is 40 multiple-choice questions in 45 minutes, and you need 35 correct to pass. It is run for the Road Safety Authority (RSA) at test centres around the country, the questions are based on the Rules of the Road, and your pass certificate is valid for two years.",
    rows: [
      { label: "Questions", value: "40 multiple choice" },
      { label: "Time", value: "45 minutes" },
      { label: "Pass mark", value: "35 of 40 (87.5%)" },
      { label: "Where", value: "On computer at a test centre, booked at theorytest.ie" },
      { label: "Needed for", value: "Your first learner permit" },
      { label: "Certificate valid", value: "2 years" },
      { label: "Study material", value: "RSA Rules of the Road" },
      { label: "Run by", value: "Road Safety Authority (RSA)" },
    ],
    basedOn: "theorytest.ie FAQs and the RSA Rules of the Road, checked October 2026",
    source: { name: "Official RSA Driver Theory Test", url: "https://www.theorytest.ie/" },
  },
  faapvt: {
    answer:
      "The FAA Private Pilot Airplane (PAR) knowledge test has 60 multiple-choice questions with three answer choices each, a 2-hour time limit and a passing score of 70 percent. You must be at least 15 and have an instructor or home-study endorsement to take it at an FAA testing center. Questions come from the Private Pilot Airplane ACS and many use a figure supplement of charts and performance tables. A pass is valid for 24 calendar months.",
    rows: [
      { label: "Questions", value: "60, three choices each" },
      { label: "Time", value: "2 hours" },
      { label: "Passing score", value: "70%" },
      { label: "Minimum age", value: "15" },
      { label: "Result valid", value: "24 calendar months" },
      { label: "Given by", value: "FAA, at authorized testing centers" },
    ],
    basedOn: "the FAA Private Pilot for Airplane Category ACS (FAA-S-ACS-6C) and the FAA ACS knowledge test table",
    source: { name: "FAA", url: "https://www.faa.gov/training_testing/testing/acs" },
  },
  psat: {
    answer:
      "The digital PSAT/NMSQT has 98 questions in 2 hours 14 minutes: Reading and Writing (54 questions, two 32-minute modules) and Math (44 questions, two 35-minute modules), with a calculator allowed on all of Math. It is adaptive by module and scored 320 to 1520, with each section scored 160 to 760. It is given to 10th and 11th graders in the fall (the PSAT 10 is the same test in the spring), and juniors' scores are used for the National Merit Scholarship Program through a Selection Index of 48 to 228.",
    rows: [
      { label: "Questions", value: "98 (54 Reading and Writing, 44 Math)" },
      { label: "Time", value: "2 hours 14 minutes, plus a 10-minute break" },
      { label: "Score", value: "320 to 1520 (160 to 760 per section)" },
      { label: "National Merit", value: "Selection Index: (2 x Reading and Writing + Math) / 10" },
      { label: "Calculator", value: "Allowed on all of Math (built-in graphing calculator)" },
      { label: "Given by", value: "College Board, in the Bluebook app at school" },
    ],
    basedOn: "the published digital PSAT/NMSQT specifications",
    source: { name: "College Board", url: "https://satsuite.collegeboard.org/psat-nmsqt/whats-on-the-test" },
    tigertest:
      "Tigertest has a full-length adaptive PSAT practice test with a score estimate and four skill drills that teach the basics first. All of it is free with no account required.",
  },
  praxis: {
    answer:
      "The Praxis Core Academic Skills for Educators is three ETS tests that teacher preparation programs and states use for admission or licensure, taken separately or together as the combined test 5752. Reading (5713) is 56 selected-response questions in 85 minutes. Writing (5723) is a 40-minute section of 40 selected-response questions (usage, sentence correction, revision in context and research skills) followed by two 30-minute essays. Mathematics (5733) is 56 questions in 90 minutes with an on-screen four-function calculator: Number and Quantity 36 percent, Data Interpretation, Statistics and Probability 32 percent, Algebra and Geometry 32 percent. Each test is scored 100 to 200, and each state sets its own passing score.",
    rows: [
      { label: "Reading (5713)", value: "56 questions, 85 minutes" },
      { label: "Writing (5723)", value: "40 questions in 40 minutes, plus two 30-minute essays" },
      { label: "Math (5733)", value: "56 questions, 90 minutes, four-function calculator" },
      { label: "Question types", value: "Five-choice, select one or more, numeric entry (Math)" },
      { label: "Scores", value: "100 to 200 per test; passing score set by each state" },
      { label: "Common cutoffs", value: "Reading 156, Writing 162, Math 150 in many states" },
      { label: "Given by", value: "ETS, at test centers or at home" },
    ],
    basedOn: "the ETS Praxis Study Companions for Core Reading (5713), Writing (5723) and Mathematics (5733)",
    source: { name: "ETS Praxis", url: "https://praxis.ets.org/scores" },
  },
  gre: {
    answer:
      "The GRE General Test takes about 1 hour 58 minutes since its September 2023 update. It has one Analytical Writing task (30 minutes), two Verbal Reasoning sections (12 questions in 18 minutes and 15 in 23 minutes) and two Quantitative Reasoning sections (12 questions in 21 minutes and 15 in 26 minutes). Verbal and Quant are section-level adaptive and each scored 130 to 170; Analytical Writing is scored 0 to 6. There is no pass mark: graduate programs set their own expectations.",
    rows: [
      { label: "Questions", value: "54 (27 Verbal, 27 Quant) plus 1 essay" },
      { label: "Time", value: "About 1 hour 58 minutes, no scheduled break" },
      { label: "Score", value: "130 to 170 for Verbal and for Quant; 0 to 6 for writing" },
      { label: "Adaptive", value: "Second section of each measure set by the first" },
      { label: "Calculator", value: "On-screen calculator for Quant" },
      { label: "Given by", value: "ETS, at test centers or at home" },
    ],
    basedOn: "the ETS description of the GRE General Test structure",
    source: { name: "ETS", url: "https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html" },
    tigertest:
      "Tigertest has two full adaptive GRE practice tests with Verbal and Quant score estimates and seven drills, all free with no account required. The essay is not included.",
  },
  gmat: {
    answer:
      "The GMAT Focus Edition has 64 questions in 2 hours 15 minutes: Quantitative Reasoning (21 questions), Verbal Reasoning (23) and Data Insights (20), 45 minutes each, in any order you choose, with one optional 10-minute break. Each section is scored 60 to 90 and the total runs from 205 to 805; the exam is computer adaptive, and you may review and change up to three answers per section. There is no essay, no geometry and no sentence correction; an on-screen calculator is allowed only in Data Insights.",
    rows: [
      { label: "Questions", value: "64: Quant 21, Verbal 23, Data Insights 20" },
      { label: "Time", value: "2 hr 15 min, 45 minutes per section" },
      { label: "Break", value: "One optional 10-minute break" },
      { label: "Score", value: "205 to 805 total; 60 to 90 per section" },
      { label: "Calculator", value: "Data Insights only" },
      { label: "Format", value: "Computer adaptive; up to 3 answer changes per section" },
      { label: "Given by", value: "GMAC, at test centers or online" },
    ],
    basedOn: "GMAC's GMAT Focus Edition exam structure (as of October 2026)",
    source: { name: "GMAC (mba.com)", url: "https://www.mba.com/exams/gmat-exam/about/exam-structure" },
  },
  netplus: {
    answer:
      "The CompTIA Network+ exam (N10-009) has a maximum of 90 questions in 90 minutes, multiple choice and performance-based, and you need 720 on a 100 to 900 scale to pass. It covers Networking Concepts 23%, Network Implementation 20%, Network Operations 19%, Network Security 14% and Network Troubleshooting 24%. N10-009 launched in June 2024; CompTIA estimates it will retire in 2027.",
    rows: [
      { label: "Questions", value: "Up to 90" },
      { label: "Time", value: "90 minutes" },
      { label: "Passing score", value: "720 on a 100 to 900 scale" },
      { label: "Exam code", value: "N10-009" },
      { label: "Valid for", value: "3 years" },
      { label: "Given by", value: "CompTIA, at Pearson VUE or online" },
    ],
    basedOn: "the CompTIA Network+ N10-009 exam objectives",
    source: { name: "CompTIA", url: "https://www.comptia.org/en-us/certifications/network/" },
  },
  cissp: {
    answer:
      "The CISSP exam is computerized adaptive in every language: 100 to 150 questions in 3 hours, answered in order with no going back. It is scored on a 0 to 1000 scale and 700 passes. The April 15, 2024 outline weights eight domains: Security and Risk Management 16%, Asset Security 10%, Security Architecture and Engineering 13%, Communication and Network Security 13%, Identity and Access Management 13%, Security Assessment and Testing 12%, Security Operations 13% and Software Development Security 10%. Certification also needs five years of paid work in two or more domains.",
    rows: [
      { label: "Questions", value: "100 to 150 (adaptive)" },
      { label: "Time", value: "3 hours" },
      { label: "Passing score", value: "700 on a 0 to 1000 scale" },
      { label: "Domains", value: "8, weighted 10% to 16%" },
      { label: "Experience", value: "5 years in 2 or more domains (or Associate of ISC2)" },
      { label: "Given by", value: "ISC2, at Pearson VUE test centers" },
    ],
    basedOn: "the ISC2 CISSP exam outline effective April 15, 2024",
    source: { name: "ISC2", url: "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline" },
  },
  itil: {
    answer:
      "The ITIL 4 Foundation exam has 40 multiple-choice questions in 60 minutes. It is closed book and the pass mark is 65 percent, 26 of 40, with no negative marking. It covers key service management concepts, the seven guiding principles, the four dimensions, the service value system and value chain, the purpose of 15 practices and seven practices in detail. PeopleCert released ITIL (Version 5) in early 2026 and still offers ITIL 4 Foundation alongside it; its current plan is to retire all ITIL 4 modules on 31 December 2027.",
    rows: [
      { label: "Questions", value: "40 multiple choice, one answer each" },
      { label: "Time", value: "60 minutes, closed book" },
      { label: "Pass mark", value: "65 percent (26 of 40)" },
      { label: "Biggest area", value: "Seven practices in detail, 17 of 40 marks" },
      { label: "Prerequisites", value: "None" },
      { label: "Newer version", value: "ITIL (Version 5) since early 2026; ITIL 4 modules planned to retire 31 December 2027" },
      { label: "Given by", value: "PeopleCert, online or at a test centre" },
    ],
    basedOn: "the ITIL 4 Foundation candidate syllabus, PeopleCert's exam page and PeopleCert's ITIL FAQ (checked October 2026)",
    source: { name: "PeopleCert", url: "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-4-foundation-2565" },
  },
  psm: {
    answer:
      "The Professional Scrum Master I (PSM I) assessment from Scrum.org has 80 questions in 60 minutes, taken online in English. Questions are multiple choice, multiple answer and true/false, all based on the Scrum Guide (2020 edition), and you need 85 percent, 68 of 80, to pass. No course is required and the certification does not expire.",
    rows: [
      { label: "Questions", value: "80" },
      { label: "Time", value: "60 minutes" },
      { label: "Pass mark", value: "85% (68 of 80)" },
      { label: "Question types", value: "Multiple choice, multiple answer, true/false" },
      { label: "Based on", value: "The Scrum Guide (November 2020)" },
      { label: "Renewal", value: "None: the certification does not expire" },
      { label: "Given by", value: "Scrum.org, online" },
    ],
    basedOn: "Scrum.org's PSM I assessment page and the Scrum Guide (November 2020)",
    source: { name: "Scrum.org", url: "https://www.scrum.org/assessments/professional-scrum-master-i-certification" },
  },
  capm: {
    answer:
      "The CAPM exam has 150 questions in 3 hours, of which 135 are scored and 15 are unscored pretest items. It follows PMI's CAPM Examination Content Outline: Project Management Fundamentals and Core Concepts 36%, Predictive Plan-Based Methodologies 17%, Agile Frameworks and Methodologies 20% and Business Analysis Frameworks 27%. PMI does not publish a pass mark: results are pass or fail with a rating for each domain from Above Target to Needs Improvement. Candidates need a secondary diploma and 23 hours of project management education.",
    rows: [
      { label: "Questions", value: "150 (135 scored)" },
      { label: "Time", value: "3 hours" },
      { label: "Domains", value: "Fundamentals 36%, Predictive 17%, Agile 20%, Business Analysis 27%" },
      { label: "Question types", value: "Multiple choice, multiple response, matching, hotspot, fill-in-the-blank" },
      { label: "Result", value: "Pass or fail, plus a rating per domain" },
      { label: "Eligibility", value: "Secondary diploma and 23 hours of project management education" },
      { label: "Given by", value: "PMI, at Pearson VUE test centers or online" },
    ],
    basedOn: "the PMI CAPM Examination Content Outline (2023, current in 2026)",
    source: { name: "PMI", url: "https://www.pmi.org/certifications/certified-associate-capm" },
  },
  gcdl: {
    answer:
      "The Google Cloud Digital Leader exam has 50 to 60 multiple choice and multiple select questions in 90 minutes and costs 99 USD. Google reports pass or fail and does not publish a passing score. The exam guide launched on August 12, 2026 weights Digital Transformation, Data Transformation, Innovating with AI, Modernize Infrastructure and Applications, and Trust and Security at about 18 percent each, and Scaling with Google Cloud Operations at about 10 percent.",
    rows: [
      { label: "Questions", value: "50 to 60" },
      { label: "Time", value: "90 minutes" },
      { label: "Passing score", value: "Pass or fail; no published cut score" },
      { label: "Fee", value: "99 USD" },
      { label: "Given by", value: "Google Cloud, online or at a test center" },
    ],
    basedOn: "the Cloud Digital Leader exam guide launched August 12, 2026",
    source: { name: "Google Cloud", url: "https://cloud.google.com/learn/certification/cloud-digital-leader" },
  },
  ssccgl: {
    answer:
      "SSC CGL Tier 1 is a computer-based paper of 100 multiple-choice questions in 60 minutes, set by the Staff Selection Commission. It has four parts of 25 questions: General Intelligence and Reasoning, General Awareness, Quantitative Aptitude and English Comprehension. Each right answer earns 2 marks (200 in all) and each wrong answer loses 0.50 marks. Tier 1 is qualifying: candidates who clear the cut-off for their category go on to Tier 2, which decides the final merit.",
    rows: [
      { label: "Questions", value: "100 (25 per part)" },
      { label: "Time", value: "60 minutes, no sectional timing" },
      { label: "Marks", value: "2 per right answer, 200 in all" },
      { label: "Negative marking", value: "0.50 per wrong answer" },
      { label: "Parts", value: "Reasoning, General Awareness, Quantitative Aptitude, English" },
      { label: "Result", value: "Qualifying cut-off by category, then Tier 2" },
      { label: "Given by", value: "Staff Selection Commission, computer-based" },
    ],
    basedOn: "the SSC Combined Graduate Level Examination notice and Tier 1 syllabus",
    source: { name: "Staff Selection Commission", url: "https://ssc.gov.in" },
  },
  rrbntpc: {
    answer:
      "RRB NTPC CBT 1 is the first-stage computer-based test for the Railway Recruitment Boards' Non-Technical Popular Categories posts, at both graduate and undergraduate level. It has 100 multiple-choice questions in 90 minutes: 40 on General Awareness, 30 on Mathematics and 30 on General Intelligence and Reasoning, with 1/3 mark deducted for each wrong answer. The minimum qualifying marks are 40 percent for UR and EWS, 30 percent for OBC and SC and 25 percent for ST; CBT 1 only shortlists candidates for CBT 2 on normalised marks and does not count in the final merit.",
    rows: [
      { label: "Questions", value: "100 multiple choice" },
      { label: "Time", value: "90 minutes (120 for eligible PwBD with a scribe)" },
      { label: "Sections", value: "General Awareness 40, Mathematics 30, Reasoning 30" },
      { label: "Negative marking", value: "1/3 mark per wrong answer" },
      { label: "Qualifying marks", value: "UR and EWS 40%, OBC and SC 30%, ST 25%" },
      { label: "Next stage", value: "CBT 2, then a typing or aptitude test where the post needs one" },
      { label: "Given by", value: "Railway Recruitment Boards (RRBs)" },
    ],
    basedOn: "the RRB NTPC notices CEN 05/2024 and 06/2024, the same pattern as CEN 06/2025 and 07/2025",
    source: { name: "Railway Recruitment Boards", url: "https://www.rrbcdg.gov.in" },
  },
  ctet: {
    answer:
      "CTET Paper I is the Central Teacher Eligibility Test for teachers of Classes 1 to 5, conducted by CBSE. It has 150 one-mark multiple-choice questions in 2 hours 30 minutes, in five sections of 30: Child Development and Pedagogy, Language I, Language II, Mathematics and Environmental Studies, with half of each subject section on pedagogy. There is no negative marking. General candidates qualify with 60 percent (90 of 150); recruiters may give reserved categories a concession, usually to 55 percent, and the certificate is valid for life.",
    rows: [
      { label: "Questions", value: "150 MCQs, 1 mark each" },
      { label: "Time", value: "2 hours 30 minutes" },
      { label: "Sections", value: "CDP, Language I, Language II, Maths, EVS (30 each)" },
      { label: "Negative marking", value: "None" },
      { label: "Qualifying mark", value: "60% (90/150); recruiters may give reserved categories a concession, usually to 55%" },
      { label: "Mode", value: "Pen and paper (OMR) in recent sessions" },
      { label: "Certificate", value: "Valid for life" },
      { label: "Conducted by", value: "CBSE, usually twice a year" },
    ],
    basedOn: "the CBSE CTET information bulletin and Paper I syllabus, checked October 2026",
    source: { name: "CBSE CTET", url: "https://ctet.nic.in/" },
  },
  ibpspo: {
    answer:
      "The IBPS PO Preliminary Examination is one online objective paper of 100 questions in 60 minutes, with each section timed separately: English Language 30 questions in 20 minutes, Quantitative Aptitude 35 in 20 minutes and Reasoning Ability 35 in 20 minutes. Each question carries one mark and a quarter of a mark is deducted for every wrong answer. IBPS sets sectional and overall cutoffs for each category every year; Prelims is qualifying for the Mains and its marks do not count in the final merit list.",
    rows: [
      { label: "Questions", value: "100, five options each" },
      { label: "Time", value: "60 minutes, 20 per section" },
      { label: "Sections", value: "English 30, Quantitative Aptitude 35, Reasoning Ability 35" },
      { label: "Marks", value: "1 per question, 100 in all" },
      { label: "Negative marking", value: "1/4 mark per wrong answer" },
      { label: "Result", value: "Sectional and overall cutoffs by category, then the Mains" },
      { label: "Given by", value: "Institute of Banking Personnel Selection (IBPS), online" },
    ],
    basedOn: "the IBPS CRP PO/MT notification and Preliminary Examination pattern",
    source: { name: "IBPS", url: "https://www.ibps.in" },
  },
  rrbgroupd: {
    answer:
      "The RRB Group D exam is the Computer Based Test that the Railway Recruitment Boards hold for Level 1 posts such as Track Maintainer Grade IV and Assistant (Points). It has 100 multiple-choice questions in 90 minutes: 25 on Mathematics, 30 on General Intelligence and Reasoning, 25 on General Science and 20 on General Awareness and Current Affairs, with 1/3 mark deducted for each wrong answer. The minimum qualifying marks are 40 percent for UR and EWS and 30 percent for OBC, SC and ST; candidates are then called to the Physical Efficiency Test on normalised marks.",
    rows: [
      { label: "Questions", value: "100 multiple choice" },
      { label: "Time", value: "90 minutes (120 for eligible PwBD with a scribe)" },
      { label: "Sections", value: "Maths 25, Reasoning 30, General Science 25, General Awareness 20" },
      { label: "Negative marking", value: "1/3 mark per wrong answer" },
      { label: "Qualifying marks", value: "UR and EWS 40%, OBC, SC and ST 30%" },
      { label: "Next stages", value: "Physical Efficiency Test, document verification, medical" },
      { label: "Given by", value: "Railway Recruitment Boards (RRBs)" },
    ],
    basedOn: "the RRB Level 1 notice CEN 09/2025 (updated 30 January 2026), the same pattern as CEN 08/2024",
    source: { name: "Railway Recruitment Boards", url: "https://www.rrbcdg.gov.in" },
  },

  sscgd: {
    answer:
      "The SSC GD Constable Computer Based Examination (CBE) is the first stage of the Staff Selection Commission's recruitment of Constables (GD) in the Central Armed Police Forces (BSF, CISF, CRPF, SSB, ITBP) and the SSF, and Riflemen (GD) in the Assam Rifles. It has 80 multiple-choice questions in 60 minutes, in four parts of 20: General Intelligence and Reasoning, General Knowledge and General Awareness, Elementary Mathematics, and English or Hindi, at matriculation level. Each right answer earns 2 marks (160 in all) and each wrong answer loses 0.25 marks. Candidates who qualify go on to the Physical Efficiency Test and Physical Standard Test, a medical examination and document verification.",
    rows: [
      { label: "Questions", value: "80 (20 per part)" },
      { label: "Time", value: "60 minutes, no sectional timing" },
      { label: "Marks", value: "2 per right answer, 160 in all" },
      { label: "Negative marking", value: "0.25 per wrong answer" },
      { label: "Parts", value: "Reasoning, General Knowledge, Elementary Mathematics, English or Hindi" },
      { label: "Minimum qualifying marks", value: "UR 30%, OBC and EWS 25%, all other categories 20%" },
      { label: "Calculator", value: "Not allowed" },
      { label: "Next stages", value: "PET and PST, medical examination, document verification" },
      { label: "Given by", value: "Staff Selection Commission, computer-based, in English, Hindi and 13 regional languages" },
    ],
    basedOn: "the SSC Constable (GD) in CAPFs and SSF, and Rifleman (GD) in Assam Rifles Examination notice (2026 cycle, 1 December 2025)",
    source: { name: "Staff Selection Commission", url: "https://ssc.gov.in" },
    tigertest:
      "Tigertest has two full SSC GD mock tests of 80 questions in 60 minutes and eight topic drills, two for each part. All of it is free with no account required; scores are percent correct, with negative marking explained rather than applied. Part D is practised in English.",
  },

  sscchsl: {
    answer:
      "SSC CHSL Tier 1 is a computer-based paper of 100 multiple-choice questions in 60 minutes, set by the Staff Selection Commission for LDC, JSA and Data Entry Operator posts. It has four parts of 25 questions: English Language, General Intelligence, Quantitative Aptitude and General Awareness, and the 2026 notice gives each part a sectional timer of 15 minutes. Each right answer earns 2 marks (200 in all) and each wrong answer loses 0.50 marks. Tier 1 is a qualifying stage: candidates who clear the category cut-off go on to Tier 2, which decides the final merit.",
    rows: [
      { label: "Questions", value: "100 (25 per part)" },
      { label: "Time", value: "60 minutes, 15 per part (sectional timer)" },
      { label: "Marks", value: "2 per right answer, 200 in all" },
      { label: "Negative marking", value: "0.50 per wrong answer" },
      { label: "Parts", value: "English, General Intelligence, Quantitative Aptitude, General Awareness" },
      { label: "Minimum qualifying marks", value: "UR 30%, OBC/EWS 25%, others 20% (2026 notice)" },
      { label: "Given by", value: "Staff Selection Commission, computer-based" },
    ],
    basedOn: "the SSC Combined Higher Secondary (10+2) Level Examination, 2026 notice and Tier 1 syllabus",
    source: { name: "Staff Selection Commission", url: "https://ssc.gov.in" },
  },
  sscmts: {
    answer:
      "The SSC MTS and Havaldar exam is a computer-based test of 90 multiple-choice questions worth 270 marks, set by the Staff Selection Commission and taken in two sessions of 45 minutes each. Session 1 has 20 Numerical and Mathematical Ability and 20 Reasoning questions with no negative marking. Session 2 has 25 General Awareness and 25 English questions, and each wrong answer there loses 1 mark. Every question carries 3 marks and both sessions are compulsory; Havaldar candidates also take a walking test and physical measurements.",
    rows: [
      { label: "Questions", value: "90 (40 in Session 1, 50 in Session 2)" },
      { label: "Time", value: "Two sessions of 45 minutes" },
      { label: "Marks", value: "3 per right answer, 270 in all" },
      { label: "Negative marking", value: "None in Session 1; 1 mark per wrong answer in Session 2" },
      { label: "Session 1", value: "Maths 20, Reasoning 20" },
      { label: "Session 2", value: "General Awareness 25, English 25" },
      { label: "Qualifying marks", value: "30% UR, 25% OBC/EWS, 20% others, in each session" },
      { label: "Given by", value: "Staff Selection Commission, computer-based" },
    ],
    basedOn: "the SSC Multi-Tasking (Non-Technical) Staff and Havaldar Examination, 2025 notice (26 June 2025), paragraphs 14 and 18",
    source: { name: "Staff Selection Commission", url: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_mts_2025.pdf" },
  },

  uppolice: {
    answer:
      "The UP Police Constable written exam is set by the Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) for Constable Civil Police and equivalent posts. It has 150 objective questions worth 2 marks each, 300 marks in all, in 2 hours: General Knowledge 38, General Hindi 37, Numerical and Mental Ability 38, and Mental Aptitude, IQ and Reasoning 37. Guides disagree on negative marking (0.5 or 0.25 mark per wrong answer, or none); check the notification. The latest recruitment, Advt. 07/2025 for 32,679 posts, held its written exam on 8 to 10 June 2026; candidates who clear it go on to document verification and physical tests.",
    rows: [
      { label: "Questions", value: "150 objective (2 marks each, 300 marks)" },
      { label: "Time", value: "2 hours" },
      { label: "Subjects", value: "GK 38, General Hindi 37, Numerical Ability 38, Reasoning 37" },
      { label: "Negative marking", value: "Not confirmed: guides report 0.5, 0.25 or none; check your notice" },
      { label: "Latest exam", value: "8 to 10 June 2026 (Advt. 07/2025, 32,679 posts)" },
      { label: "Next stages", value: "Document verification and physical tests" },
      { label: "Given by", value: "UP Police Recruitment and Promotion Board (UPPRPB)" },
    ],
    basedOn: "the UPPRPB constable recruitment of 2025 (Advt. 07/2025) as reported by exam guides, checked October 2026",
    source: { name: "UP Police Recruitment and Promotion Board", url: "https://uppbpb.gov.in" },
  },

  ibpsclerk: {
    answer:
      "The IBPS Clerk Preliminary Examination is one online objective paper of 100 questions in 60 minutes, with each section timed separately: English Language 30 questions in 20 minutes, Numerical Ability 35 in 20 minutes and Reasoning Ability 35 in 20 minutes. Each question carries one mark and a quarter of a mark is deducted for every wrong answer. Candidates must clear a cutoff set by IBPS in each of the three tests (past cutoffs have differed by state and category); Prelims is qualifying for the Mains, and only Mains marks count in the final merit list. The 2026 Prelims (CRP CSA-XVI) was scheduled for October 2026.",
    rows: [
      { label: "Questions", value: "100 (five options each in past papers)" },
      { label: "Time", value: "60 minutes, 20 per section" },
      { label: "Sections", value: "English 30, Numerical Ability 35, Reasoning Ability 35" },
      { label: "Marks", value: "1 per question, 100 in all" },
      { label: "Negative marking", value: "1/4 mark per wrong answer" },
      { label: "Result", value: "A cutoff in each test, set by IBPS, then the Mains" },
      { label: "Given by", value: "Institute of Banking Personnel Selection (IBPS), online" },
      { label: "Medium", value: "English test in English; the others in English, Hindi or a regional language by state" },
    ],
    basedOn: "the IBPS CRP CSA-XVI (Customer Service Associate) notification of 1 August 2026, section D (Structure of Examination) and E (Penalty for Wrong Answers)",
    source: { name: "IBPS", url: "https://www.ibps.in" },
  },

  jnvst: {
    answer:
      "The JNVST (Jawahar Navodaya Vidyalaya Selection Test) Class VI is Navodaya Vidyalaya Samiti's entrance test for Class 5 students seeking a Class 6 seat at the Jawahar Navodaya Vidyalaya of their district. Under the JNVST 2027 prospectus it has 80 multiple-choice questions for 100 marks in 2 hours: Mental Ability 20 and Environmental Studies 20, Arithmetic 20 and Language 20 (four reading passages), with 1.25 marks per right answer and no negative marking. Candidates need at least 14 marks in Mental Ability and EVS, 7 in Arithmetic and 7 in Language; seats are then filled on merit district by district, with at least 75 percent for rural candidates and at least one third for girls.",
    rows: [
      { label: "Questions", value: "80 multiple choice, 100 marks" },
      { label: "Time", value: "2 hours, no break (40 minutes extra for Divyang students)" },
      { label: "Sections", value: "Mental Ability 20 and EVS 20, Arithmetic 20, Language 20" },
      { label: "Marking", value: "1.25 marks per right answer, no negative marking" },
      { label: "Qualifying marks", value: "14 in Mental Ability and EVS, 7 in Arithmetic, 7 in Language" },
      { label: "Who can take it", value: "Class 5 students in the district, once only; birth dates set in each year's prospectus" },
      { label: "Given by", value: "Navodaya Vidyalaya Samiti (NVS)" },
    ],
    basedOn: "the JNVST 2027 prospectus (Class VI admission 2027-28, test on 28 November 2026)",
    source: { name: "Navodaya Vidyalaya Samiti", url: "https://navodaya.gov.in" },
  },
  jambeng: {
    answer:
      "Use of English is the compulsory subject of the JAMB Unified Tertiary Matriculation Examination (UTME), the computer-based test for admission to Nigerian universities, polytechnics and colleges of education. The UTME is 180 objective questions in 2 hours across four subjects: Use of English has 60 questions and each of the other three subjects 40. Each subject is scored out of 100, so the total is out of 400. The syllabus has three sections: Comprehension and Summary (including a cloze passage and a prescribed reading text that changes by cycle), Lexis and Structure, and Oral Forms. JAMB set minimum scores of 150 for universities and 100 for polytechnics and colleges of education for 2026 admissions; institutions and courses set their own, usually higher, cut-off marks.",
    rows: [
      { label: "Questions", value: "60 in Use of English (180 in the whole UTME)" },
      { label: "Time", value: "2 hours for all four subjects" },
      { label: "Format", value: "Computer-based, objective (multiple choice)" },
      { label: "Sections", value: "Comprehension and Summary, Lexis and Structure, Oral Forms" },
      { label: "Score", value: "Out of 100 per subject, 400 in all" },
      { label: "2026 minimum score", value: "150 universities, 100 polytechnics and colleges of education" },
      { label: "Run by", value: "Joint Admissions and Matriculation Board (JAMB)" },
    ],
    basedOn: "the JAMB website and widely reproduced UTME syllabus guides, checked October 2026. Section question counts are guides' figures, not JAMB's",
    source: { name: "JAMB", url: "https://www.jamb.gov.ng" },
  },
  appsych: {
    answer:
      "The AP Psychology Exam is a fully digital, 2 hour 40 minute exam from the College Board, redesigned for 2024-25. Section I has 75 multiple-choice questions with four choices in 90 minutes (66.7% of the score); Section II has 2 free-response questions in 70 minutes (33.3%): an Article Analysis Question and an Evidence-Based Question. Each of the five units is 15% to 25% of the multiple-choice section. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "75 questions, 90 minutes, 66.7% of score" },
      { label: "Free response", value: "2 questions, 70 minutes, 33.3% of score" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Units", value: "5, each 15% to 25% of the multiple choice" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
      { label: "Given by", value: "College Board, digital in the Bluebook app" },
    ],
    basedOn: "the College Board AP Psychology exam page and course overview",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-psychology/exam" },
    tigertest:
      "Tigertest has two full 75-question AP Psychology multiple-choice sections and six drills, one per unit plus research methods and data, all free with no account required. The free-response section is not included.",
  },
  pkdrive: {
    answer:
      "There is no single national driving test in Pakistan. Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan and the Islamabad Capital Territory each issue licences and run their own tests, and every province recognises the others' licences. Under the Motor Vehicles Ordinance you must be at least 18 for a private car licence (21 to drive for pay), hold a CNIC and pass an eyesight check. You start on a learner permit, driving only with a licensed driver beside you, then take a sign test (Punjab's computer e-sign test, or a theory and sign test elsewhere) and a practical road test. The question count, pass mark and waiting period are set by each licensing authority and are not published as one national rule.",
    rows: [
      { label: "Run by", value: "Provincial and ICT licensing authorities" },
      { label: "Parts", value: "Learner permit, sign or theory test, road test" },
      { label: "Sign test format", value: "Set by each authority (Punjab e-sign test reported as about 10 questions)" },
      { label: "Pass mark", value: "Set by each authority, not published nationally" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 80% target" },
      { label: "Minimum age (car)", value: "18" },
      { label: "Also required", value: "CNIC, proof of residence, eyesight check" },
      { label: "Study material", value: "Traffic signs, the Tenth Schedule driving regulations and the Highway Code (Motor Vehicles Ordinance, Third Schedule)" },
    ],
    basedOn: "Provincial Motor Vehicles Ordinance 1965 (Punjab Transport Department copy amended to November 2023: section 4, Third, Tenth and Eleventh Schedules), road signs in Pakistan and provincial licensing guidance, checked November 2026",
    source: { name: "Punjab Driving License Information Management System (DLIMS)", url: "https://dlims.punjab.gov.pk/" },
  },
  sbipo: {
    answer:
      "The SBI PO Preliminary Examination is an online objective test of 100 marks in one hour, with separate timing for each section: English Language 40 questions in 20 minutes, Quantitative Aptitude 30 questions in 20 minutes and Reasoning Ability 30 questions in 20 minutes. This is the pattern in SBI's 2026 advertisement; earlier cycles had 30, 35 and 35 questions. A quarter of a question's marks is deducted for every wrong answer. There is no sectional cut-off in the Prelims: candidates are ranked by category on their total marks and about ten times the vacancies are called for the Main Examination. Prelims marks are not counted in the final merit list.",
    rows: [
      { label: "Questions", value: "100" },
      { label: "Time", value: "1 hour, 20 minutes per section" },
      { label: "Sections", value: "English 40, Quantitative Aptitude 30, Reasoning Ability 30" },
      { label: "Marks", value: "100 in all" },
      { label: "Negative marking", value: "1/4 of the question's marks per wrong answer" },
      { label: "Cut-off", value: "No sectional cut-off; about 10 times the vacancies per category go to the Mains" },
      { label: "Given by", value: "State Bank of India (CRPD), online" },
      { label: "Next stages", value: "Main Examination, then psychometric test, group exercise and interview" },
    ],
    basedOn: "the SBI advertisement CRPD/PO/2026-27/09 (Recruitment of Probationary Officers, 18 June 2026), section 8, Selection Procedure",
    source: { name: "SBI Careers", url: "https://sbi.bank.in/web/careers/current-openings" },
  },
  sbiclerk: {
    answer:
      "The SBI Clerk (Junior Associates) Preliminary Examination is one online objective test of 100 questions for 100 marks in one hour, with each section timed separately: English Language 30 questions in 20 minutes, Numerical Ability 35 in 20 minutes and Reasoning Ability 35 in 20 minutes. A quarter of a question's marks is deducted for each wrong answer. There are no minimum qualifying marks for any section or for the total: SBI shortlists about ten times the vacancies in each category for the Main exam by aggregate marks, and only Main exam marks count in the final merit list. The 2026 advertisement set the Prelims tentatively for September 2026.",
    rows: [
      { label: "Questions", value: "100 (five options each in past papers)" },
      { label: "Time", value: "1 hour, 20 minutes per section" },
      { label: "Sections", value: "English 30, Numerical Ability 35, Reasoning Ability 35" },
      { label: "Marks", value: "1 per question, 100 in all" },
      { label: "Negative marking", value: "1/4 mark per wrong answer" },
      { label: "Result", value: "No sectional cutoff; about 10 times the vacancies called to the Mains by total marks" },
      { label: "Given by", value: "State Bank of India (CRPD), online" },
      { label: "Medium", value: "English test in English; the others in English, Hindi and, in many states, the state's language" },
    ],
    basedOn: "SBI's Recruitment of Junior Associates (Customer Support & Sales) advertisement CRPD/CR/2026-27/17 (registration 11 to 31 August 2026), section 4, Selection Procedure",
    source: { name: "State Bank of India Careers", url: "https://sbi.bank.in/web/careers/current-openings" },
  },
  ibpsrrb: {
    answer:
      "The IBPS RRB Office Assistant (Multipurpose) Preliminary Examination, often called IBPS RRB Clerk, is one online objective paper of 80 questions in 45 minutes, with each test timed separately: Reasoning 40 questions in 25 minutes and Numerical Ability 40 questions in 20 minutes. Each question carries one mark and a quarter of a mark is deducted for every wrong answer. Candidates must clear a minimum cutoff set by IBPS in both tests; Prelims is qualifying for the Main examination, and only Main marks count for the final merit list and provisional allotment to a Regional Rural Bank. Under the CRP RRBs-XV notification of 1 September 2026, the Prelims is scheduled for November or December 2026.",
    rows: [
      { label: "Questions", value: "80 (five options each in past papers)" },
      { label: "Time", value: "45 minutes: Reasoning 25, Numerical Ability 20" },
      { label: "Sections", value: "Reasoning 40, Numerical Ability 40" },
      { label: "Marks", value: "1 per question, 80 in all" },
      { label: "Negative marking", value: "1/4 mark per wrong answer" },
      { label: "Result", value: "A cutoff in both tests, set by IBPS, then the Mains" },
      { label: "Given by", value: "Institute of Banking Personnel Selection (IBPS), online" },
      { label: "Medium", value: "English, Hindi or the state's listed language" },
    ],
    basedOn: "the IBPS CRP RRBs-XV notification of 1 September 2026, section D (Online Examination Structure) and E (Penalty for Wrong Answers)",
    source: { name: "IBPS", url: "https://www.ibps.in" },
  },
  delhipolice: {
    answer:
      "The Delhi Police Constable (Executive) Computer Based Examination (CBE) is conducted by the Staff Selection Commission for Delhi Police. It is one objective paper of 100 multiple-choice questions for 100 marks in 90 minutes: General Knowledge and Current Affairs 50, Reasoning 25, Numerical Ability 15, and Computer Fundamentals, MS Excel, MS Word, Communication, Internet, WWW and Web Browsers 10, at matriculation level, in English and Hindi. Each wrong answer loses 0.25 marks. Candidates who reach the cut-off marks are shortlisted for the Physical Endurance and Measurement Test and document verification with Delhi Police, and the final merit list follows the CBE marks.",
    rows: [
      { label: "Questions", value: "100 (GK 50, Reasoning 25, Numerical Ability 15, Computer 10)" },
      { label: "Time", value: "90 minutes, no sectional timing" },
      { label: "Marks", value: "1 per right answer, 100 in all" },
      { label: "Negative marking", value: "0.25 per wrong answer" },
      { label: "Cut-off for PE&MT", value: "UR 35, SC/ST/OBC/EWS 30, ex-servicemen 25 (normalised marks)" },
      { label: "Level", value: "Matriculation (Class 10)" },
      { label: "Language", value: "English and Hindi" },
      { label: "Next stages", value: "PE&MT and document verification by Delhi Police, medical examination" },
      { label: "Given by", value: "Staff Selection Commission, computer-based, for Delhi Police" },
    ],
    basedOn: "the SSC notice for the Constable (Executive) Male and Female in Delhi Police Examination, 2025 (22 September 2025)",
    source: { name: "Staff Selection Commission", url: "https://ssc.gov.in" },
    tigertest:
      "Tigertest has two full Delhi Police Constable mock tests of 100 questions in 90 minutes and eight topic drills: four for general knowledge, two for reasoning, one for numerical ability and one for computer. All of it is free with no account required; scores are percent correct, with negative marking explained rather than applied.",
  },
  biharpolice: {
    answer:
      "The Bihar Police Constable written exam is set by the Central Selection Board of Constable (CSBC), Bihar, for Constable posts in Bihar Police and the Bihar Special Armed Police. Under Advertisement No. 01/2025 (19,838 posts) it is one objective OMR paper of 100 questions in 2 hours, one mark each, at Class 10 (Matric) level on Hindi, English, Mathematics, Social Science, Science and General Knowledge with current affairs. The advertisement mentions no deduction for wrong answers. Candidates under 30% are out; the written exam only shortlists about five times the vacancies for the physical efficiency test, whose marks make the final merit list.",
    rows: [
      { label: "Questions", value: "100 objective (1 mark each, 100 marks), OMR sheet" },
      { label: "Time", value: "2 hours" },
      { label: "Subjects", value: "Hindi, English, Maths, Social Science, Science, GK and current affairs (Class 10 level)" },
      { label: "Negative marking", value: "None mentioned in Advt. 01/2025; check your notice" },
      { label: "Minimum", value: "30% to stay in; written exam is qualifying only" },
      { label: "Latest exam", value: "16 July to 3 August 2025 (Advt. 01/2025, 19,838 posts)" },
      { label: "Next stage", value: "Physical efficiency test (final merit on its marks)" },
      { label: "Given by", value: "Central Selection Board of Constable (CSBC), Bihar" },
    ],
    basedOn: "CSBC Advertisement No. 01/2025 and its exam notice of 12 June 2025, checked November 2026",
    source: { name: "Central Selection Board of Constable, Bihar", url: "https://csbc.bihar.gov.in" },
  },
  rajpolice: {
    answer:
      "The Rajasthan Police Constable written exam is set by Rajasthan Police for constable posts. As guides report the 2025 notification, it has 150 objective questions in 2 hours, in three parts: logical ability, reasoning and basic computer knowledge 60; general knowledge, general science, social science, current affairs and laws on crimes against women and children 45; and Rajasthan's history, culture, geography, economy and polity 45. A quarter of a question's marks is taken off for each wrong answer. There is no Hindi language section; the paper is set in Hindi and English. The latest written exam was held on 13 and 14 September 2025; candidates who clear it go on to physical tests and document checks.",
    rows: [
      { label: "Questions", value: "150 objective (1 mark each, per guides)" },
      { label: "Time", value: "2 hours" },
      { label: "Parts", value: "Reasoning and computer 60, GK with laws on women and children 45, Rajasthan GK 45" },
      { label: "Negative marking", value: "A quarter of a question's marks per wrong answer (per guides)" },
      { label: "Latest exam", value: "13 and 14 September 2025 (notification of 9 April 2025)" },
      { label: "Next stages", value: "Physical efficiency and standards tests, documents and medical" },
      { label: "Given by", value: "Rajasthan Police" },
    ],
    basedOn: "the Rajasthan Police constable recruitment of 2025 as reported by exam guides, checked November 2026",
    source: { name: "Rajasthan Police", url: "https://police.rajasthan.gov.in" },
  },
  mppolice: {
    answer:
      "The MP Police Constable written exam is the Police Constable Recruitment Test of the Madhya Pradesh Employees Selection Board (MPESB). Guides report 100 objective questions worth 1 mark each, 100 marks in all, in 2 hours, with no negative marking, in three parts: General Knowledge and Reasoning 40, Intellectual and Mental Ability 30, and Science and Simple Arithmetic 30. The latest recruitment, for 7,500 posts, held its online written exam from 30 October 2025; candidates shortlisted on written marks go on to the physical tests.",
    rows: [
      { label: "Questions", value: "100 objective (1 mark each, 100 marks)" },
      { label: "Time", value: "2 hours" },
      { label: "Parts", value: "GK and Reasoning 40, Intellectual and Mental Ability 30, Science and Simple Arithmetic 30" },
      { label: "Negative marking", value: "None (per guides)" },
      { label: "Latest exam", value: "From 30 October 2025, online (7,500 posts)" },
      { label: "Next stages", value: "Physical tests, document verification and medical" },
      { label: "Given by", value: "Madhya Pradesh Employees Selection Board (MPESB)" },
    ],
    basedOn: "the MPESB Police Constable Recruitment Test 2025 as reported by exam guides, checked November 2026",
    source: { name: "Madhya Pradesh Employees Selection Board", url: "https://esb.mp.gov.in" },
  },
  apush: {
    answer:
      "The AP U.S. History Exam is a fully digital, 3 hour 15 minute exam from the College Board. Section I has 55 multiple-choice questions in 55 minutes (40% of the score), usually in sets of three or four that share a primary or secondary source, plus 3 short-answer questions in 40 minutes (20%). Section II has a document-based question in 60 minutes (25%) and a long essay in 40 minutes (15%). The course runs from 1491 to the present in nine periods; Periods 3 to 8 are each 10% to 17% of the multiple-choice section. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "55 questions, 55 minutes, 40% of score" },
      { label: "Short answer", value: "3 questions, 40 minutes, 20%" },
      { label: "Essays", value: "DBQ 60 minutes (25%), long essay 40 minutes (15%)" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Periods", value: "9, from 1491 to the present" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
      { label: "Given by", value: "College Board, digital in the Bluebook app" },
    ],
    basedOn: "the College Board AP U.S. History Course and Exam Description (effective fall 2026) and AP Central exam page",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-united-states-history/exam" },
    tigertest:
      "Tigertest has two full 55-question AP U.S. History multiple-choice sections and seven drills by period, all free with no account required. The short-answer questions and essays are not included.",
  },
  apbio: {
    answer:
      "The AP Biology Exam is a 3-hour exam from the College Board, given in May. Section I has 60 multiple-choice questions with four choices in 90 minutes (50% of the score), some in sets of typically four to five that share a stimulus; Section II has 6 free-response questions in 90 minutes (50%). The exam is hybrid digital: multiple choice in the Bluebook app, free responses handwritten. A calculator is allowed and a formula sheet is provided. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "60 questions, 90 minutes, 50% of score" },
      { label: "Free response", value: "6 questions (2 long, 4 short), 90 minutes, 50%" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Units", value: "8, from 8-11% (Chemistry of Life) to 13-20% (Natural Selection)" },
      { label: "Calculator", value: "Four-function, scientific or graphing; formula sheet provided" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
    ],
    basedOn: "the College Board AP Biology exam page and Course and Exam Description (effective fall 2025)",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-biology/exam" },
    tigertest:
      "Tigertest has two full 60-question AP Biology multiple-choice sections and eight drills, one per unit, all free with no account required. The free-response section is not included.",
  },
  phcse: {
    answer:
      "The Civil Service Exam (Career Service Examination, Pen and Paper Test or CSE-PPT) is the Civil Service Commission's test for eligibility for permanent government positions in the Philippines. It has two levels. Both test verbal ability (in English and Filipino), numerical ability and general information on the Philippine Constitution, R.A. 6713, peace and human rights, and the environment; the Professional level adds analytical ability and the Subprofessional level adds clerical ability. For the 2026 sittings the Professional level had 170 items in 3 hours and 10 minutes and the Subprofessional level 165 items in 2 hours and 40 minutes. You need a general rating of at least 80.00 to pass. Professional eligibility covers first and second level positions; Subprofessional covers first level positions only.",
    rows: [
      { label: "Professional", value: "170 items, 3 hours 10 minutes (2026)" },
      { label: "Subprofessional", value: "165 items, 2 hours 40 minutes (2026)" },
      { label: "Both levels", value: "Verbal, numerical, general information" },
      { label: "Level-specific", value: "Analytical (Professional), clerical (Subprofessional)" },
      { label: "Passing", value: "General rating of 80.00" },
      { label: "2026 dates", value: "8 March and 9 August 2026" },
      { label: "Run by", value: "Civil Service Commission (CSC)" },
    ],
    basedOn: "the CSC examination announcements for the March and August 2026 CSE-PPT (No. 08, s. 2025 and No. 03, s. 2026) as reported, checked November 2026",
    source: { name: "Civil Service Commission", url: "https://csc.gov.ph" },
  },
  upscse: {
    answer:
      "The UPSC Civil Services Preliminary Examination is the screening stage for the IAS, IPS, IFS and other central services. It has two compulsory objective papers of 200 marks each, two hours each, set in Hindi and English. General Studies Paper I decides who qualifies for the Main examination; Paper II (CSAT) is qualifying, with 33% needed. Every question has four options, and one-third of a question's marks is deducted for each wrong answer. Guides list 100 questions in Paper I and 80 in Paper II. Prelims marks are not counted in the final ranking.",
    rows: [
      { label: "Papers", value: "GS Paper I and GS Paper II (CSAT), 200 marks each" },
      { label: "Time", value: "2 hours per paper" },
      { label: "Questions", value: "Paper I 100, Paper II 80 (as guides list)" },
      { label: "Negative marking", value: "One-third of the question's marks per wrong answer" },
      { label: "CSAT", value: "Qualifying, 33% needed" },
      { label: "Languages", value: "Hindi and English" },
      { label: "Given by", value: "Union Public Service Commission (UPSC)" },
    ],
    basedOn: "UPSC Examination Notice No. 05/2026-CSE (4 February 2026); the 2027 Preliminary is scheduled for 23 May 2027",
    source: { name: "Union Public Service Commission", url: "https://upsc.gov.in" },
  },
  ssccpo: {
    answer:
      "SSC CPO Paper-I is the first stage of the Staff Selection Commission's Sub-Inspector in Delhi Police and Central Armed Police Forces exam. From the 2026 notice it is a computer-based test of 100 multiple-choice questions in 1 hour, four parts of 25 (General Intelligence and Reasoning, General Knowledge and General Awareness, Quantitative Aptitude, English Comprehension), each with its own 15-minute timer. Each question carries 1 mark and a wrong answer loses 0.25. Paper-I shortlists candidates for the physical tests; the final merit list is made from Paper-II.",
    rows: [
      { label: "Questions", value: "100 (25 in each of four parts)" },
      { label: "Time", value: "1 hour, 15 minutes per part" },
      { label: "Marks", value: "1 per right answer, 100 in all" },
      { label: "Negative marking", value: "0.25 per wrong answer (0.50 in Paper-II)" },
      { label: "Parts", value: "Reasoning, General Knowledge, Quantitative Aptitude, English" },
      { label: "Qualifying marks", value: "30% UR, 25% OBC/EWS, 20% others" },
      { label: "Languages", value: "Hindi and English (English part in English)" },
      { label: "Given by", value: "Staff Selection Commission, computer-based" },
    ],
    basedOn: "the SSC notice for the Sub-Inspector in Delhi Police and Central Armed Police Forces Examination, 2026 (10 September 2026), paragraphs 12 and 16",
    source: { name: "Staff Selection Commission", url: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_capf_2026.pdf" },
  },
  rrbalp: {
    answer:
      "RRB ALP CBT 1 is the first-stage Computer Based Test that the Railway Recruitment Boards hold for Assistant Loco Pilot posts. Under CEN 01/2026 it has 75 multiple-choice questions in 60 minutes on Mathematics, General Intelligence and Reasoning and General Science at class 10 level; General Awareness, part of earlier ALP CBT 1 papers, was dropped. One third of a mark is deducted for each wrong answer. CBT 1 is a screening test: its marks do not count in the final merit, and shortlisted candidates go on to CBT 2 and a computer based aptitude test.",
    rows: [
      { label: "Questions", value: "75 multiple choice" },
      { label: "Time", value: "60 minutes" },
      { label: "Subjects", value: "Mathematics, General Intelligence and Reasoning, General Science (class 10)" },
      { label: "Negative marking", value: "1/3 mark per wrong answer" },
      { label: "Qualifying marks (reported)", value: "UR and EWS 40%, OBC and SC 30%, ST 25%" },
      { label: "Next stages", value: "CBT 2 (Part A and trade Part B), computer based aptitude test" },
      { label: "Given by", value: "Railway Recruitment Boards (RRBs)" },
    ],
    basedOn: "the RRB Assistant Loco Pilot notice CEN 01/2026 (11,127 posts), as summarised by exam guides",
    source: { name: "Railway Recruitment Boards", url: "https://www.rrbcdg.gov.in" },
  },
  rpfconst: {
    answer:
      "The RPF Constable exam is the Computer Based Test for Constable (Executive) posts in the Railway Protection Force and the Railway Protection Special Force. In the last recruitment, CEN RPF 02/2024 run by the Railway Recruitment Boards (CBT held in March 2025), it had 120 multiple-choice questions in 90 minutes: exam guides give 50 on General Awareness, 35 on Arithmetic and 35 on General Intelligence and Reasoning. One third of a mark is deducted for each wrong answer, and guides report minimum qualifying marks of 35 percent for UR, EWS and OBC and 30 percent for SC and ST. Shortlisted candidates then take the Physical Efficiency and Physical Measurement Tests (qualifying) and document verification. The next notice had not been published as of November 2026.",
    rows: [
      { label: "Questions", value: "120 multiple choice" },
      { label: "Time", value: "90 minutes" },
      { label: "Sections", value: "General Awareness 50, Arithmetic 35, Reasoning 35 (as reported by guides)" },
      { label: "Negative marking", value: "1/3 mark per wrong answer" },
      { label: "Qualifying marks", value: "UR, EWS and OBC 35%, SC and ST 30% (as reported by guides)" },
      { label: "Next stages", value: "PET and PMT (qualifying), document verification" },
      { label: "Given by", value: "Railway Recruitment Boards (CEN RPF 02/2024)" },
    ],
    basedOn: "the RRB notice CEN RPF 02/2024 (Constable) and its March 2025 CBT",
    source: { name: "Railway Recruitment Boards", url: "https://www.rrbcdg.gov.in" },
  },
  nda: {
    answer:
      "The NDA and NA exam is the Union Public Service Commission's written test, held twice a year, for entry to the National Defence Academy (Army, Navy and Air Force wings) and the Naval Academy. It has two objective papers of 2.5 hours each: Mathematics, 120 questions for 300 marks, and the General Ability Test, 150 questions for 600 marks, made up of English (200 marks) and General Knowledge (400 marks). A third of a question's marks is deducted for each wrong answer. Candidates who qualify go on to the 900-mark SSB interview.",
    rows: [
      { label: "Papers", value: "Mathematics; General Ability Test" },
      { label: "Questions", value: "120 in Mathematics, 150 in the GAT" },
      { label: "Time", value: "2.5 hours per paper" },
      { label: "Marks", value: "Mathematics 300, GAT 600 (English 200, General Knowledge 400)" },
      { label: "Negative marking", value: "One third of a question's marks per wrong answer" },
      { label: "Next stage", value: "SSB interview, 900 marks" },
      { label: "Sittings", value: "Twice a year: NDA (I) in April, NDA (II) in September" },
      { label: "Given by", value: "Union Public Service Commission" },
    ],
    basedOn: "UPSC Examination Notice No. 10/2026-NDA-II of 20 May 2026 (exam 13 September 2026); question counts per the question papers",
    source: { name: "Union Public Service Commission", url: "https://upsc.gov.in" },
  },
  agniveer: {
    answer:
      "The Agniveer (General Duty) Common Entrance Exam is the online written test that is the first step of Indian Army recruitment under the Agnipath scheme. Guides describe the GD paper as 50 multiple-choice questions for 100 marks in 60 minutes: 15 on General Knowledge, 15 on General Science, 15 on Mathematics and 5 on Logical Reasoning, 2 marks each with half a mark deducted for a wrong answer, and a pass mark of 35. The Army holds the CEE in 13 languages; shortlisted candidates then go to a recruitment rally for physical tests and a medical examination.",
    rows: [
      { label: "Questions", value: "50 multiple choice, 2 marks each (guides)" },
      { label: "Time", value: "60 minutes (guides)" },
      { label: "Sections", value: "GK 15, General Science 15, Maths 15, Reasoning 5 (guides)" },
      { label: "Negative marking", value: "0.5 mark per wrong answer (guides)" },
      { label: "Pass mark", value: "35 out of 100 for GD (guides)" },
      { label: "Languages", value: "13 languages" },
      { label: "Next stages", value: "Recruitment rally (physical tests), then medical" },
      { label: "Given by", value: "Indian Army" },
    ],
    basedOn: "the Army's 2025-26 recruiting press release and the 2026 cycle notice (registration 13 February to 1 April 2026, extended to 10 April per news reports, CEE from June 2026), with the GD paper pattern as reported by guides",
    source: { name: "Join Indian Army", url: "https://joinindianarmy.nic.in" },
  },
  agniveervayu: {
    answer:
      "The Agniveervayu Science subjects test is the Phase I online test for the Indian Air Force's Agnipath entry for candidates with Physics, Mathematics and English in Class 12. It lasts 60 minutes and covers English, Physics and Mathematics to the 10+2 CBSE syllabus; guides report 70 questions, 20 English, 25 Physics and 25 Mathematics. Each right answer earns 1 mark and each wrong answer loses 0.25. Questions are in English and Hindi except the English paper. Marks are normalised, and the cut-off for Phase II (fitness and adaptability tests) is set state by state.",
    rows: [
      { label: "Time", value: "60 minutes (Science subjects)" },
      { label: "Subjects", value: "English, Physics, Mathematics (10+2 CBSE)" },
      { label: "Questions", value: "70 as guides report: English 20, Physics 25, Maths 25" },
      { label: "Marking", value: "+1 right, -0.25 wrong, 0 unattempted" },
      { label: "Language", value: "English and Hindi, except the English paper" },
      { label: "Cut-off", value: "Normalised marks; state-wise cut-offs for Phase II" },
      { label: "Next stages", value: "Physical Fitness Test, Adaptability Tests I and II, medical" },
      { label: "Given by", value: "Indian Air Force (CASB), online" },
    ],
    basedOn: "the IAF notification for Agniveervayu intake 01/2027 (January 2026), paragraphs 26 to 37",
    source: { name: "Indian Air Force, CASB", url: "https://iafrecruitment.edcil.co.in" },
  },
  apworld: {
    answer:
      "The AP World History: Modern Exam is a fully digital, 3 hour 15 minute exam from the College Board. Section I has 55 multiple-choice questions in 55 minutes (40% of the score), usually in sets of three or four that share a primary or secondary source, plus 3 short-answer questions in 40 minutes (20%). Section II has a document-based question in 60 minutes (25%) and a long essay in 40 minutes (15%). The course runs from c. 1200 to the present in nine units; Units 3 to 6 are each 12% to 15% of the multiple-choice section and the other five units 8% to 10% each. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "55 questions, 55 minutes, 40% of score" },
      { label: "Short answer", value: "3 questions, 40 minutes, 20%" },
      { label: "Essays", value: "DBQ 60 minutes (25%), long essay 40 minutes (15%)" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Units", value: "9, from c. 1200 to the present" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
      { label: "Given by", value: "College Board, digital in the Bluebook app" },
    ],
    basedOn: "the College Board AP World History: Modern Course and Exam Description (effective fall 2026) and AP Central exam page",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-world-history/exam" },
    tigertest:
      "Tigertest has two full 55-question AP World History: Modern multiple-choice sections and six drills by unit, all free with no account required. The short-answer questions and essays are not included.",
  },
  aplang: {
    answer:
      "The AP English Language and Composition Exam is a fully digital, 3 hour 15 minute exam from the College Board. Section I has 45 multiple-choice questions in 60 minutes (45% of the score): 23 to 25 reading questions on nonfiction passages and 20 to 22 writing questions that ask how a draft could be revised, in five sets. Section II has three essays, synthesis, rhetorical analysis and argument, in 2 hours 15 minutes including a 15-minute reading period (55%). Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "45 questions, 60 minutes, 45% of score" },
      { label: "Question types", value: "23-25 reading, 20-22 writing (revision)" },
      { label: "Essays", value: "3 (synthesis, rhetorical analysis, argument), 2 hr 15 min, 55%" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Skill categories", value: "Rhetorical situation, claims and evidence, reasoning and organization, style" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
      { label: "Given by", value: "College Board, digital in the Bluebook app" },
    ],
    basedOn: "the College Board AP English Language and Composition Course and Exam Description (effective fall 2024) and AP Central exam page",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-english-language-and-composition/exam" },
    tigertest:
      "Tigertest has two full 45-question AP English Language multiple-choice sections and eight drills by skill category, all free with no account required. The essays are not included.",
  },
  phlet: {
    answer:
      "The Licensure Examination for Teachers (LET), officially the Licensure Examination for Professional Teachers (LEPT), is given by the Professional Regulation Commission (PRC) through the Board for Professional Teachers; a license is required to teach in Philippine schools. The elementary exam has two parts on one Sunday: General Education, 150 items from 8 to 10 a.m., and Professional Education, 150 items from 11 a.m. to 2 p.m. For elementary examinees without a specialization General Education is 40% of the rating and Professional Education 60%; secondary examinees, and elementary examinees with an early childhood or special needs specialization, also take a specialization part (20/40/40). To pass you need a general average of at least 75% with no rating below 50% in any part.",
    rows: [
      { label: "Run by", value: "PRC, Board for Professional Teachers" },
      { label: "Elementary parts", value: "General Education 150 items, Professional Education 150 items" },
      { label: "Time", value: "GenEd 2 hours (8 to 10 a.m.), ProfEd 3 hours (11 a.m. to 2 p.m.)" },
      { label: "Weights (elementary)", value: "General Education 40%, Professional Education 60% (with a specialization, guides report 20/40/40)" },
      { label: "Pass mark", value: "General average 75%, no part below 50%" },
      { label: "Biggest area", value: "Curriculum, methods and educational technology, 45 of 150 ProfEd items" },
      { label: "Sittings", value: "Usually twice a year (March and September); check PRC" },
      { label: "Not modelled here", value: "Secondary and elementary specialization subjects" },
    ],
    basedOn: "PRC enhanced Table of Specifications for the LEPT (Board Resolution No. 11, s. 2022, Annex A, amended by Board Resolution No. 11, s. 2025), the PRC LEPT examination program and BPT Resolution No. 228, s. 1996, checked November 2026",
    source: { name: "Professional Regulation Commission", url: "https://www.prc.gov.ph/" },
  },
  jeemain: {
    answer:
      "JEE (Main) Paper 1 is the National Testing Agency's computer-based entrance test for B.E. and B.Tech. admission to NITs, IIITs and other centrally funded institutes, and the qualifying test for JEE (Advanced). It has 75 questions for 300 marks in 3 hours: 25 each in Mathematics, Physics and Chemistry, of which 20 are multiple choice (Section A) and 5 need a numerical value typed as an integer (Section B). Every answer earns 4 marks if correct and loses 1 if wrong, in both sections. For 2027 it is held in two sessions, January and April, and the better NTA score counts.",
    rows: [
      { label: "Subjects", value: "Mathematics, Physics, Chemistry (equal weight)" },
      { label: "Questions", value: "75: per subject 20 multiple choice and 5 numerical value" },
      { label: "Time", value: "3 hours" },
      { label: "Marks", value: "300 (100 per subject)" },
      { label: "Marking", value: "+4 correct, -1 wrong in both sections, 0 unanswered" },
      { label: "Result", value: "NTA scores (percentiles); the better of two sessions counts" },
      { label: "2027 sessions", value: "20 to 24 and 28 January, and 2 to 7 April 2027" },
      { label: "Languages", value: "13, including English and Hindi" },
      { label: "Given by", value: "National Testing Agency" },
    ],
    basedOn: "JEE (Main) 2027 Information Bulletin and syllabus, National Testing Agency, published 24 October 2026",
    source: { name: "National Testing Agency", url: "https://jeemain.nta.nic.in" },
  },
  neet: {
    answer:
      "NEET (UG) is the National Testing Agency's entrance exam for MBBS, BDS, AYUSH and other undergraduate medical courses in India. Per the NEET (UG) 2026 information bulletin it is one pen-and-paper paper of 180 compulsory multiple-choice questions in 180 minutes: Physics 45, Chemistry 45 and Biology (Botany and Zoology) 90, for 720 marks. A correct answer earns 4 marks and a wrong one loses 1. It is offered in 13 languages, and admission needs at least the 50th percentile (40th for SC, ST and OBC candidates).",
    rows: [
      { label: "Questions", value: "180, all compulsory, four options each" },
      { label: "Subjects", value: "Physics 45, Chemistry 45, Biology (Botany and Zoology) 90" },
      { label: "Time", value: "180 minutes (2026 window 2:00 to 5:15 PM including formalities)" },
      { label: "Marks", value: "720" },
      { label: "Marking", value: "+4 correct, -1 wrong, 0 unanswered" },
      { label: "Mode", value: "Pen and paper, one shift" },
      { label: "Languages", value: "13, including English and Hindi" },
      { label: "Qualifying", value: "50th percentile (40th for SC, ST, OBC-NCL)" },
      { label: "Given by", value: "National Testing Agency" },
    ],
    basedOn: "NTA Information Bulletin for NEET (UG) 2026 and NTA notices of 15 May and 12 June 2026 (re-examination held 21 June 2026)",
    source: { name: "National Testing Agency", url: "https://neet.nta.nic.in" },
  },
  mhtcet: {
    answer:
      "MHT-CET is the Maharashtra State Common Entrance Test Cell's entrance test for first-year engineering, technology and pharmacy degrees in Maharashtra. In the PCM group it has two papers of multiple choice questions, each worth 100 marks in 90 minutes: Mathematics, 50 questions at 2 marks each, and Physics and Chemistry, 50 questions each at 1 mark each. Questions follow the Maharashtra State Board syllabus, about 20 percent Std XI and 80 percent Std XII, and there is no negative marking. In 2026 the PCM group could sit the exam twice, in April and in May.",
    rows: [
      { label: "Papers", value: "Mathematics; Physics and Chemistry" },
      { label: "Questions", value: "50 Mathematics, 50 Physics, 50 Chemistry" },
      { label: "Marks", value: "100 per paper (Mathematics 2 per question, Physics and Chemistry 1)" },
      { label: "Time", value: "90 minutes per paper" },
      { label: "Negative marking", value: "None" },
      { label: "Syllabus", value: "Maharashtra State Board, about 20% Std XI and 80% Std XII" },
      { label: "Results", value: "Percentiles across sessions" },
      { label: "Given by", value: "State Common Entrance Test Cell, Maharashtra" },
    ],
    basedOn: "State CET Cell syllabus and marking scheme for MHT-CET 2026 and its PCM result notices of 16 and 19 June 2026",
    source: { name: "State Common Entrance Test Cell, Maharashtra", url: "https://cetcell.mahacet.org" },
  },
  cuet: {
    answer:
      "The CUET (UG) General Aptitude Test (test code 501) is one of the 37 papers of the Common University Entrance Test for undergraduate admission to central and participating universities, conducted by the National Testing Agency. Under the CUET (UG) 2026 Information Bulletin it has 50 compulsory multiple-choice questions in 60 minutes, taken as a computer based test in 13 mediums. Each right answer earns 5 marks and each wrong one loses 1. The syllabus is general knowledge, current affairs, general mental ability, numerical ability, quantitative reasoning (arithmetic, algebra, geometry, mensuration and statistics) and logical and analytical reasoning; NTA's 2026 syllabus for test 501 also lists general science and environment literacy. Candidates may take up to five CUET papers, and each university decides which papers a course requires.",
    rows: [
      { label: "Questions", value: "50, all compulsory" },
      { label: "Time", value: "60 minutes" },
      { label: "Marks", value: "5 per right answer, 250 in all" },
      { label: "Negative marking", value: "1 mark per wrong answer" },
      { label: "Syllabus", value: "GK and current affairs, mental ability, numerical ability, quantitative, logical and analytical reasoning, general science and environment" },
      { label: "Mode", value: "Computer based test, multiple shifts, NTA scores" },
      { label: "Mediums", value: "13 Indian languages, English included" },
      { label: "Paper choice", value: "Up to five CUET papers in all, languages included" },
      { label: "Given by", value: "National Testing Agency" },
    ],
    basedOn: "the CUET (UG) 2026 Information Bulletin and the 2026 General Test (501) syllabus of the National Testing Agency",
    source: { name: "National Testing Agency", url: "https://cuet.nta.nic.in" },
    tigertest:
      "Tigertest has two full CUET General Test practice tests of 50 questions in 60 minutes and eight topic drills: three for general knowledge and one each for mental ability, numerical ability, quantitative reasoning, logical reasoning and analytical reasoning. All of it is free with no account required; scores are percent correct, with the +5/-1 marking explained rather than applied.",
  },
  reet: {
    answer:
      "REET Level 1 is the Rajasthan Eligibility Examination for Teachers of Classes 1 to 5, conducted by the Board of Secondary Education, Rajasthan. Under the REET 2024 notification (exam held 27 and 28 February 2025), it has 150 one-mark multiple-choice questions in 2 hours 30 minutes, in five parts of 30: Child Development and Pedagogy, Language I, Language II, Mathematics and Environmental Studies. Each question has four options, and the OMR sheet has a fifth bubble, E, for a question the candidate chooses not to answer; a question with no bubble filled loses one-third of a mark, more than 10 percent left with no bubble disqualifies, and no deduction is set for a wrong answer. General candidates qualify with 60 percent and SC, OBC, MBC, EWS and ST candidates with 55 percent, with lower marks for some other groups, and the certificate is valid for life. No new REET notice had been published as of November 2026.",
    rows: [
      { label: "Questions", value: "150 MCQs, 1 mark each" },
      { label: "Time", value: "2 hours 30 minutes" },
      { label: "Parts", value: "CDP, Language I, Language II, Maths, EVS (30 each)" },
      { label: "Negative marking", value: "1/3 mark for a question with no bubble filled (E = not answering); none for wrong answers" },
      { label: "Qualifying mark", value: "60% general; 55% SC, OBC, MBC, EWS, ST (36% ST in TSP areas)" },
      { label: "Latest exam", value: "REET 2024, held 27 and 28 February 2025" },
      { label: "Certificate", value: "Valid for life" },
      { label: "Conducted by", value: "Board of Secondary Education, Rajasthan (BSER)" },
    ],
    basedOn: "the board's REET 2024 notification No. 01/2024 of 12 December 2024, checked November 2026",
    source: { name: "Board of Secondary Education, Rajasthan", url: "https://rajeduboard.rajasthan.gov.in/" },
  },
  uptet: {
    answer:
      "UPTET Paper 1 is the Uttar Pradesh Teacher Eligibility Test for teachers of Classes 1 to 5, conducted since 2026 by the Uttar Pradesh Education Service Selection Commission (UPESSC). It has 150 one-mark multiple-choice questions in 2 hours 30 minutes, in five sections of 30: Child Development and Pedagogy, Language I (Hindi), Language II (English, Urdu or Sanskrit), Mathematics and Environmental Studies. There is no negative marking. The qualifying mark is 90 of 150 (60 percent) for general candidates and 82 of 150 (55 percent) for SC, ST, OBC, EWS, dependants of freedom fighters, ex-servicemen and candidates with disabilities. The 2026 test (Advertisement No. 01/UPTET/2026, published 20 March 2026) was held on OMR sheets on 2 to 4 July 2026, with results on 26 August 2026.",
    rows: [
      { label: "Questions", value: "150 MCQs, 1 mark each" },
      { label: "Time", value: "2 hours 30 minutes" },
      { label: "Sections", value: "CDP, Hindi, Language II, Maths, EVS (30 each)" },
      { label: "Language II", value: "English, Urdu or Sanskrit" },
      { label: "Negative marking", value: "None" },
      { label: "Qualifying mark", value: "90/150 (60%) general, 82/150 (55%) reserved" },
      { label: "Latest test", value: "2 to 4 July 2026 (OMR); result 26 August 2026" },
      { label: "Certificate", value: "Valid for life (UP government order, June 2021)" },
      { label: "Conducted by", value: "UP Education Service Selection Commission (UPESSC)" },
    ],
    basedOn: "the UPESSC UPTET 2026 information booklet (Adv. No. 01/UPTET/2026) and the August 2026 result reports, checked November 2026",
    source: { name: "UPESSC", url: "https://upessc.up.gov.in" },
  },
  ugcnet: {
    answer:
      "UGC-NET is the National Eligibility Test that the National Testing Agency conducts for the University Grants Commission, usually in June and December cycles, to decide eligibility for Junior Research Fellowship, Assistant Professor and PhD admission. It is a computer-based test of two papers in one 3-hour sitting with no break. Paper 1, the General Paper on Teaching and Research Aptitude, has 50 compulsory questions for 100 marks, five from each of ten units; Paper 2, on the candidate's subject, has 100 questions for 200 marks. Each question carries 2 marks and there is no negative marking. Candidates need at least 40% aggregate across both papers (35% for reserved categories) to be considered.",
    rows: [
      { label: "Paper 1", value: "50 questions, 100 marks, 5 from each of 10 units" },
      { label: "Paper 2", value: "100 questions, 200 marks, on your subject" },
      { label: "Time", value: "3 hours for both papers, no break" },
      { label: "Negative marking", value: "None (2 marks per correct answer)" },
      { label: "Minimum to be considered", value: "40% aggregate of both papers (35% reserved)" },
      { label: "Languages", value: "English and Hindi" },
      { label: "Given by", value: "National Testing Agency (NTA) for the UGC" },
    ],
    basedOn: "the NTA UGC-NET December 2026 information bulletin and the UGC NET Bureau's Paper I syllabus (code 00)",
    source: { name: "NTA UGC-NET", url: "https://ugcnet.nta.nic.in/" },
  },
  aissee: {
    answer:
      "The AISSEE (All India Sainik Schools Entrance Examination) is the National Testing Agency's entrance test for Class 6 and Class 9 of the Sainik Schools and approved New Sainik Schools, run for the Sainik Schools Society of the Ministry of Defence. Under the AISSEE-2026 Information Bulletin, the Class 6 paper has 125 multiple-choice questions for 300 marks in 150 minutes, on an OMR sheet: Language 25 questions (2 marks each), Mathematics 50 (3 marks each), Intelligence 25 and General Knowledge 25 (2 marks each), with no negative marking. Candidates aged 10 to 12 can take it in English, Hindi or 11 other languages, and girls may apply for Class 6. To qualify for the existing Sainik Schools a candidate needs at least 25 percent in each subject and 40 percent overall (no minimum for SC and ST candidates there); seats are then given by school-wise merit lists and e-counselling.",
    rows: [
      { label: "Questions", value: "125 multiple choice, 300 marks" },
      { label: "Time", value: "150 minutes" },
      { label: "Sections", value: "Language 25, Mathematics 50, Intelligence 25, General Knowledge 25" },
      { label: "Marking", value: "3 marks per Mathematics question, 2 for the others, no negative marking" },
      { label: "Qualifying marks", value: "25% in each subject and 40% overall (existing Sainik Schools; none for SC/ST)" },
      { label: "Who can take it", value: "Boys and girls aged 10 to 12 on 31 March of the admission year" },
      { label: "Given by", value: "National Testing Agency (NTA) for the Sainik Schools Society" },
    ],
    basedOn: "the AISSEE-2026 Information Bulletin (exam held on 18 January 2026); check the AISSEE-2027 bulletin when NTA publishes it",
    source: { name: "National Testing Agency", url: "https://exams.nta.nic.in/sainik-school-society/" },
  },
  aphug: {
    answer:
      "The AP Human Geography Exam is a fully digital, 2 hour 15 minute exam from the College Board. Section I has 60 multiple-choice questions in 60 minutes, 50% of the score; some stand alone and some come in sets, and about 30% to 40% use a map, table, chart, graph, image, infographic or landscape. Section II has 3 free-response questions in 75 minutes, the other 50%. The course has seven units: Unit 1, Thinking Geographically, is 8% to 10% of the multiple-choice section and Units 2 to 7 are 12% to 17% each. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "60 questions, 60 minutes, 50% of score" },
      { label: "Free response", value: "3 questions, 75 minutes, 50% of score" },
      { label: "Answer choices", value: "5 per multiple-choice question" },
      { label: "Stimulus questions", value: "About 30% to 40% of the multiple choice" },
      { label: "Units", value: "7: Unit 1 8-10%, Units 2 to 7 12-17% each" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
      { label: "Given by", value: "College Board, digital in the Bluebook app" },
    ],
    basedOn: "the College Board AP Human Geography Course and Exam Description (effective fall 2020, clarifications as of June 2026) and AP Central exam page",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-human-geography/exam" },
    tigertest:
      "Tigertest has two full 60-question AP Human Geography multiple-choice sections and seven drills, one per unit, all free with no account required. The free-response questions are not included, and maps and images are described in words.",
  },
  apcalcab: {
    answer:
      "The AP Calculus AB Exam is a 3 hour 10 minute exam from the College Board, given in May. From May 2027, Section I has 42 multiple-choice questions with four choices in 1 hour 40 minutes (50% of the score): Part A, 29 questions in 62 minutes with no calculator, and Part B, 13 questions in 38 minutes with a graphing calculator required. Section II has 6 free-response questions in 90 minutes (50%). The exam is hybrid digital: multiple choice in the Bluebook app, which has a built-in Desmos graphing calculator for the calculator parts, and free responses handwritten. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "42 questions, 1 hr 40 min, 50% of score" },
      { label: "Part A", value: "29 questions, 62 minutes, no calculator" },
      { label: "Part B", value: "13 questions, 38 minutes, graphing calculator required" },
      { label: "Free response", value: "6 questions, 90 minutes, 50%" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Units", value: "8, from 5-10% (Differential Equations) to 15-20% (Integration)" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
    ],
    basedOn: "the College Board AP Calculus AB exam page and Course and Exam Description with the clarifications for fall 2026 (May 2027 exam)",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-calculus-ab/exam" },
    tigertest:
      "Tigertest has two full 42-question AP Calculus AB multiple-choice sections and eight drills, one per unit, all free with no account required. The free-response section is not included.",
  },
  jambmath: {
    answer:
      "Mathematics is one of the subjects of the JAMB Unified Tertiary Matriculation Examination (UTME), the computer-based test for admission to Nigerian universities, polytechnics and colleges of education, and is required for most science, engineering and social science courses. Guides give the UTME as 180 objective questions in 2 hours across four subjects: Use of English has 60 questions and each other subject, Mathematics included, 40. Each subject is scored out of 100, so the total is out of 400. The syllabus has five sections: Number and Numeration, Algebra, Geometry and Trigonometry, Calculus, and Statistics. Candidates may not bring a calculator; guides say the CBT has a basic on-screen one. JAMB set minimum scores of 150 for universities and 100 for polytechnics and colleges of education for 2026 admissions; institutions and courses set their own, usually higher, cut-off marks.",
    rows: [
      { label: "Questions", value: "40 in Mathematics (180 in the whole UTME)" },
      { label: "Time", value: "2 hours for all four subjects" },
      { label: "Format", value: "Computer-based, objective (multiple choice)" },
      { label: "Sections", value: "Number and Numeration, Algebra, Geometry and Trigonometry, Calculus, Statistics" },
      { label: "Score", value: "Out of 100 per subject, 400 in all" },
      { label: "2026 minimum score", value: "150 universities, 100 polytechnics and colleges of education" },
      { label: "Run by", value: "Joint Admissions and Matriculation Board (JAMB)" },
    ],
    basedOn: "the JAMB website and widely reproduced UTME syllabus guides, checked November 2026. Question counts are guides' figures; JAMB publishes no count per topic",
    source: { name: "JAMB", url: "https://www.jamb.gov.ng" },
  },
  jambbio: {
    answer:
      "Biology is one of the subjects in JAMB's Unified Tertiary Matriculation Examination (UTME), the computer-based test for admission to Nigerian universities, polytechnics and colleges of education, and is required for most medical, health, agricultural and life-science courses. The UTME is 180 objective questions in 2 hours across four subjects: Use of English has 60 questions and each of the other three subjects, Biology included, has 40. Each subject is scored out of 100, so the total is out of 400. The Biology syllabus has five sections: Variety of Organisms, Form and Functions, Ecology, Heredity and Variations, and Evolution. JAMB set minimum scores of 150 for universities and 100 for polytechnics and colleges of education for 2026 admissions; institutions and courses set their own, usually higher, cut-off marks.",
    rows: [
      { label: "Questions", value: "40 in Biology (180 in the whole UTME)" },
      { label: "Time", value: "2 hours for all four subjects" },
      { label: "Format", value: "Computer-based, objective (multiple choice)" },
      { label: "Sections", value: "Variety of Organisms, Form and Functions, Ecology, Heredity and Variations, Evolution" },
      { label: "Score", value: "Out of 100 per subject, 400 in all" },
      { label: "2026 minimum score", value: "150 universities, 100 polytechnics and colleges of education" },
      { label: "Run by", value: "Joint Admissions and Matriculation Board (JAMB)" },
    ],
    basedOn: "the JAMB website and widely reproduced UTME syllabus guides, checked November 2026. JAMB publishes no split of the 40 questions by topic",
    source: { name: "JAMB", url: "https://www.jamb.gov.ng" },
  },
  jambchem: {
    answer:
      "Chemistry is one of the subjects of the JAMB Unified Tertiary Matriculation Examination (UTME), the computer-based test for admission to Nigerian universities, polytechnics and colleges of education, and is required for courses such as medicine, pharmacy and engineering. The UTME is 180 objective questions in 2 hours across four subjects: Use of English has 60 questions and each other subject, including Chemistry, 40. Each subject is scored out of 100, so the total is out of 400. The JAMB Chemistry syllabus has 18 topics, from separation of mixtures and the mole to electrolysis, metals, organic compounds and astronomical chemistry. JAMB set minimum scores of 150 for universities and 100 for polytechnics and colleges of education for 2026 admissions; institutions and courses set their own, usually higher, cut-off marks.",
    rows: [
      { label: "Questions", value: "40 in Chemistry (180 in the whole UTME)" },
      { label: "Time", value: "2 hours for all four subjects" },
      { label: "Format", value: "Computer-based, four-option multiple choice" },
      { label: "Syllabus", value: "18 topics, physical, inorganic and organic chemistry" },
      { label: "Score", value: "Out of 100 per subject, 400 in all" },
      { label: "2026 minimum score", value: "150 universities, 100 polytechnics and colleges of education" },
      { label: "Run by", value: "Joint Admissions and Matriculation Board (JAMB)" },
    ],
    basedOn: "the JAMB UTME Chemistry syllabus (copy for the 2026/2027 cycle), the JAMB website and UTME guides, checked November 2026",
    source: { name: "JAMB", url: "https://www.jamb.gov.ng" },
  },
  jambphys: {
    answer:
      "Physics is one of the subjects candidates for science, engineering and medical courses take in the JAMB Unified Tertiary Matriculation Examination (UTME), the computer-based test for admission to Nigerian universities, polytechnics and colleges of education. Guides that reproduce the JAMB brochure give the UTME as 180 objective questions in 2 hours across four subjects: Use of English has 60 questions and each other subject, Physics included, has 40. Each subject is scored out of 100, so the total is out of 400. The Physics syllabus runs from measurement, motion and energy through heat, waves and light to electricity, magnetism, modern physics, electronics, and fibre optics and lasers. JAMB set minimum scores of 150 for universities and 100 for polytechnics and colleges of education for 2026 admissions; institutions and courses set their own, usually higher, cut-off marks.",
    rows: [
      { label: "Questions", value: "40 in Physics (180 in the whole UTME)" },
      { label: "Time", value: "2 hours for all four subjects" },
      { label: "Format", value: "Computer-based, four-option multiple choice" },
      { label: "Syllabus", value: "Mechanics, heat, waves and optics, electricity and magnetism, modern physics and electronics" },
      { label: "Score", value: "Out of 100 per subject, 400 in all" },
      { label: "2026 minimum score", value: "150 universities, 100 polytechnics and colleges of education" },
      { label: "Run by", value: "Joint Admissions and Matriculation Board (JAMB)" },
    ],
    basedOn: "the JAMB website and UTME Physics syllabus guides that reproduce the IBASS brochure, checked November 2026. Question counts are guides' figures; JAMB publishes no topic weights",
    source: { name: "JAMB", url: "https://www.jamb.gov.ng" },
  },
  apgov: {
    answer:
      "The AP U.S. Government and Politics Exam is a fully digital, 3-hour exam from the College Board. Section I has 55 multiple-choice questions in 80 minutes (50% of the score): about 30 stand alone and the rest come in sets on quantitative data, a foundational document or other text, and visuals such as maps and cartoons. Section II has four free-response questions in 100 minutes (50%): concept application, quantitative analysis, SCOTUS comparison and an argument essay. The course has five units and requires 13 foundational documents (four added for 2026-27) and 14 Supreme Court cases. Scores are reported from 1 to 5, and wrong answers are not penalized.",
    rows: [
      { label: "Multiple choice", value: "55 questions, 80 minutes, 50% of score" },
      { label: "Free response", value: "4 questions, 100 minutes, 50%" },
      { label: "Answer choices", value: "4 per multiple-choice question" },
      { label: "Units", value: "5; Unit 2 (branches) is 25-36% of the multiple choice" },
      { label: "Required content", value: "13 foundational documents, 14 Supreme Court cases" },
      { label: "Score", value: "1 to 5; no penalty for wrong answers" },
      { label: "Given by", value: "College Board, digital in the Bluebook app" },
    ],
    basedOn: "the College Board AP U.S. Government and Politics Course and Exam Description (effective fall 2026), its fall 2026 clarifications and the AP Central exam page",
    source: { name: "College Board AP Central", url: "https://apcentral.collegeboard.org/courses/ap-united-states-government-and-politics/exam" },
    tigertest:
      "Tigertest has two full 55-question AP U.S. Government and Politics multiple-choice sections and seven drills by unit, all free with no account required. The free-response questions are not included.",
  },
  ngpolice: {
    answer:
      "Constables are recruited into the Nigeria Police Force by the Police Service Commission (PSC), working with the Force. In the 2025/2026 exercise for 50,000 constables, applicants applied free on the PSC portal, then attended physical, medical and credentials screening, and those who passed sat a written aptitude test on 28 to 30 April 2026 at centres in all 36 states and the FCT, before background checks. In 2024 the PSC had JAMB run the test as a CBT. The PSC does not publish the number of questions, the time or a pass mark; guides describe English, mathematics, general knowledge and current affairs. General Duty applicants in 2025/2026 had to be 18 to 25 with five credits including English and Mathematics.",
    rows: [
      { label: "Run by", value: "Police Service Commission, with the Nigeria Police Force" },
      { label: "Format", value: "Written aptitude test, computer based (CBT)" },
      { label: "Questions and time", value: "Not published (guides: 60 to 100 questions in up to an hour)" },
      { label: "Subjects (guides)", value: "English, mathematics, general knowledge, current affairs" },
      { label: "Pass mark", value: "Not published" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
      { label: "Age (General Duty, 2025/2026)", value: "18 to 25" },
      { label: "Education (General Duty)", value: "Five credits incl. English and Mathematics" },
      { label: "Cost", value: "Free (the PSC warns against anyone charging)" },
    ],
    basedOn: "Police Service Commission notices of December 2025 to April 2026, the 2025/2026 recruitment advertisement and the PSC's 2024 statement on the JAMB-run CBT, checked November 2026",
    source: { name: "Police Service Commission", url: "https://www.psc.gov.ng/" },
  },
  cdcfib: {
    answer:
      "The CDCFIB recruitment test is the computer-based test set by the Civil Defence, Correctional, Fire and Immigration Services Board, which recruits for four paramilitary services under the Federal Ministry of Interior: the Nigeria Security and Civil Defence Corps, the Nigerian Correctional Service, the Federal Fire Service and the Nigeria Immigration Service. You apply through the Board's recruitment portal when an exercise opens; shortlisted applicants take the test, then physical screening, document checks and a medical. In the 2025 exercise the test was online from 12 to 19 November, taken on a laptop, desktop or phone with camera and microphone and watched by AI proctoring. The Board does not publish the number of questions, the time limit, the subjects or a pass mark; guides describe multiple-choice questions on English, mathematics, reasoning, general knowledge and the services.",
    rows: [
      { label: "Run by", value: "Civil Defence, Correctional, Fire and Immigration Services Board (CDCFIB)" },
      { label: "Services", value: "NSCDC, Correctional Service, Federal Fire Service, Immigration Service" },
      { label: "Format (2025)", value: "Online CBT, multiple choice, AI-proctored, at a scheduled slot" },
      { label: "Questions and time", value: "Not published by the Board (guides report 100; some candidates reported 40)" },
      { label: "Pass mark", value: "Not published" },
      { label: "Topics (guides)", value: "English, mathematics, reasoning, general knowledge, the four services" },
      { label: "After the CBT", value: "Physical screening, document checks, medical" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
    ],
    basedOn: "Board instructions for the November 2025 online CBT as reported by Nigerian news outlets, with the cdcfib.gov.ng portal under maintenance, checked November 2026",
    source: { name: "CDCFIB", url: "https://cdcfib.gov.ng" },
  },
  ngarmy: {
    answer:
      "The Nigerian Army recruits soldiers through its Regular Recruits Intake (RRI) and officers through Short Service (SSC) and Direct Short Service (DSSC) courses, applied for free on its recruitment portal. It does not publish a syllabus, question count or pass mark for its written tests. For the 90th and 91st Regular Recruits Intakes (2025 and 2026), the Army said there would be no pre-selection computer-based test: shortlisted applicants were screened in their state of origin on documents, physical fitness and medical fitness (the 89th intake, in 2025, had announced one). Officer applicants go before a selection board; for Short Service Course 49/2026 it was reported to include document checks, physical, medical and academic tests and an oral interview. Candidates and guides describe written aptitude papers in English language, mathematics and general knowledge. For 91RRI, applicants needed at least four passes including English Language in no more than two sittings and had to apply through their state of origin.",
    rows: [
      { label: "Run by", value: "Nigerian Army (recruitment portal)" },
      { label: "Routes", value: "Regular Recruits Intake, SSC and DSSC officer courses" },
      { label: "Pre-selection CBT", value: "None in the 90th and 91st intakes (the 89th had one)" },
      { label: "Recruit screening", value: "State of origin: documents, physical fitness, medical" },
      { label: "Officer selection board", value: "Documents, physical, medical, academic tests, interview (SSC 49/2026, per reports)" },
      { label: "Written test content", value: "Not published; guides say English, mathematics, general knowledge" },
      { label: "Pass mark", value: "Not published" },
      { label: "Recruit entry (91RRI)", value: "4 passes incl. English, 2 sittings max; NIN and BVN" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
    ],
    basedOn: "the Army's 91RRI (2026), SSC 49/2026 and DSSC 29/2026 notices as reprinted in Nigerian news and job listings, checked November 2026; the portal itself could not be loaded",
    source: { name: "Nigerian Army recruitment portal", url: "https://recruitment.army.mil.ng" },
  },
  ngcustoms: {
    answer:
      "The Nigeria Customs Service recruits through an online application, document screening and then a computer-based test (CBT). In the exercise advertised on 27 December 2024 for 3,927 places in the Superintendent, Inspectorate and Customs Assistant cadres, 573,523 people applied and 286,697 were invited to the CBT in September and October 2025. Candidates sat it online from any location, on a laptop or desktop with a webcam, after a compulsory pre-test two days earlier; Superintendent applicants were told to expect a further CBT. The Service has not published the number of questions, the time or the pass mark. Guides describe a general aptitude test in English, mathematics and general knowledge.",
    rows: [
      { label: "Run by", value: "Nigeria Customs Service" },
      { label: "Cadres", value: "Superintendent, Inspectorate, Customs Assistant" },
      { label: "Format", value: "Online CBT on a laptop or desktop with webcam (2025)" },
      { label: "Pre-test", value: "Compulsory, two days before the CBT (2025)" },
      { label: "Questions and pass mark", value: "Not published by the Service" },
      { label: "Subjects (guides)", value: "English, mathematics, general knowledge" },
      { label: "Tigertest mock tests", value: "4 x 50 questions, 70% target" },
      { label: "Latest exercise", value: "Advertised 27 December 2024; CBT September to October 2025" },
    ],
    basedOn: "Nigeria Customs Service press release on its recruitment CBT (September 2025) and news reports of the 9 October 2025 Inspectorate and Customs Assistant CBT, checked November 2026",
    source: { name: "Nigeria Customs Service", url: "https://customs.gov.ng/" },
  },
  trcnpqe: {
    answer:
      "The Professional Qualifying Examination (PQE) is the computer-based exam candidates take as part of registration with the Teachers Registration Council of Nigeria (TRCN), the regulator set up by the TRCN Act of 1993. TRCN's PQE curriculum guide lists 60 questions in 60 minutes, held in batches in May and November diets, across five core areas worth 20% each: Pedagogy, Literacy, Numeracy, ICT and Safeguarding. Candidates need at least an NCE, PGDE or PDE in Education and sit under Category A (PhD), B (master's), C (bachelor's or PGDE) or D (NCE). TRCN does not publish a pass mark on its PQE pages.",
    rows: [
      { label: "Run by", value: "Teachers Registration Council of Nigeria (TRCN)" },
      { label: "Questions", value: "60" },
      { label: "Time", value: "60 minutes" },
      { label: "Format", value: "Computer-based, multiple choice" },
      { label: "Areas", value: "Pedagogy, Literacy, Numeracy, ICT, Safeguarding, 20% each" },
      { label: "Diets", value: "May and November, in batches" },
      { label: "Eligibility", value: "At least an NCE, PGDE or PDE in Education" },
      { label: "Pass mark", value: "Not published by TRCN (guides say 50%)" },
    ],
    basedOn: "the TRCN PQE curriculum guide, registration and PQE past questions pages on trcn.gov.ng, checked November 2026",
    source: { name: "Teachers Registration Council of Nigeria", url: "https://trcn.gov.ng/pqe-curriculum" },
  },
};
