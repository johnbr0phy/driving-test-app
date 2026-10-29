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
      "Tigertest has two full-length adaptive SAT practice tests with score estimates and skill drills. Practice Test 1 and most drills are free with no account required.",
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
      "Tigertest has two full-length ACT practice tests in the enhanced format with score estimates and skill drills. Practice Test 1 and most drills are free with no account required.",
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
      "The Manitoba Class 5 knowledge test is the written test for a Class 5L learner licence. Manitoba Public Insurance (MPI) gives it on a computer, booked through an Autopac agent, with a 30-minute time limit and a $12 fee; it is not open book and covers traffic laws, safe driving practices and road signs from the MPI Driver's Handbook, and is usually reported as 30 multiple-choice questions. You must be 16 (15 and a half in a high school driver education course), and GDL applicants who fail wait seven days to retake it.",
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
    basedOn: "the Official MTO Driver's Handbook (updated March 2026)",
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
};
