/**
 * Registry of the non-DMV exams that run on the shared TigerTest
 * flow (dashboard, tests, training, results debrief, drill, stats).
 *
 * Each exam is namespaced in the store by an ID range and a pseudo state
 * code so its progress never collides with DMV data:
 *   HTL   200s  (tests 201-204, sets 201-205)
 *   CST   300s  (tests 301-304, sets 301-305)
 *   CRCST 400s  (tests 401-404, sets 401-406)
 *
 * Adding an exam = one entry here, a question bank in data/, a data import
 * in lib/examData.ts, a theme block in globals.css, and app/<slug>/ wrappers.
 * This file must stay free of question-data imports (the store imports it).
 */

export type ExamId = "cdl" | "cdlx" | "moto" | "civics" | "part107" | "ham" | "epa608" | "cna" | "ptcb" | "phleb" | "ccma" | "cet" | "danb" | "emt" | "htl" | "cst" | "crcst";

export interface ExamTrainingSetDef {
  /** 1-based set number used in URLs (?set=N). */
  setNumber: number;
  /** Store ID (exam.idBase + setNumber). */
  id: number;
  name: string;
  /** Question categories pooled into this set. */
  categories: string[];
  /** Total questions in the bank for those categories. */
  size: number;
  /** Shown under the set name on the dashboard, e.g. "30–40% of the exam". */
  weightLabel: string;
}

export interface ExamConfig {
  id: ExamId;
  /** Pseudo state code sessions/attempts are stored under. */
  stateCode: string;
  /** Store ID base; tests are idBase+1.. and, unless setIdBase is set, so are sets. */
  idBase: number;
  /** Store ID base for training sets when it differs from idBase (CDL moved its
   *  sets off 101-112 so old sequential-set progress cannot be misread). */
  setIdBase?: number;
  /** URL base, e.g. "/htl". App pages live under it. */
  slug: string;
  /** SEO landing page when it is not at the slug itself (CDL: /cdl-practice-test). */
  landingPath?: string;
  /** Header title, e.g. "HTL Practice Test". */
  name: string;
  /** Short credential name, e.g. "HTL". */
  shortName: string;
  /** Issuing body + credential, e.g. "ASCP HTL". Shown where DMV shows the state. */
  examLabel: string;
  /** Long form for copy, e.g. "ASCP Histotechnologist (HTL) exam". */
  fullName: string;
  /** Question ID prefix, e.g. "HTL-". */
  questionIdPrefix: string;
  /** Header icon key (see CDLHeader). */
  icon: "truck" | "bike" | "flag" | "plane" | "radio" | "thermometer" | "heart" | "pill" | "syringe" | "stethoscope" | "activity" | "tooth" | "siren" | "microscope" | "scissors" | "shield";
  testCount: number;
  questionsPerTest: number;
  passPct: number;
  /** Questions per content area in each practice test (sums to questionsPerTest). */
  blueprint: Record<string, number>;
  trainingSets: ExamTrainingSetDef[];
  categoryLabels: Record<string, string>;
  /** Dashboard copy. */
  copy: {
    guestPrompt: string;
    trainingHeading: string;
    trainingSub: string;
    testsHeading: string;
    /** Five subtitles for 0%, <40%, <70%, <100%, 100% of steps complete. */
    heroSubs: [string, string, string, string, string];
    /** Footer line on the dashboard naming the outline source. */
    sourceLine: string;
    /** Theme-specific analytics tag suffix. */
    analyticsKey: string;
  };
}

const cdl: ExamConfig = {
  id: "cdl",
  stateCode: "CDL",
  idBase: 100,
  setIdBase: 120,
  slug: "/cdl",
  landingPath: "/cdl-practice-test",
  name: "CDL Practice Test",
  shortName: "CDL",
  examLabel: "CDL General Knowledge",
  fullName: "CDL general knowledge exam",
  questionIdPrefix: "CDL-",
  icon: "truck",
  testCount: 6,
  questionsPerTest: 50,
  passPct: 80,
  // Weighted like the general knowledge test: inspection, control and safe
  // driving carry the most. Each count x 6 tests fits inside its pool.
  blueprint: {
    safeDriving: 9,
    vehicleInspection: 7,
    basicControl: 5,
    brakingSystems: 5,
    vehicleSystems: 4,
    cargoHandling: 4,
    emergencyProcedures: 4,
    hazardPerception: 3,
    alcoholDrugs: 3,
    weatherDriving: 2,
    nightDriving: 1,
    mountainDriving: 1,
    railroadCrossings: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 121, name: "Vehicle Inspection", categories: ["vehicleInspection"], size: 60, weightLabel: "14% of each test" },
    { setNumber: 2, id: 122, name: "Basic Control & Braking", categories: ["basicControl", "brakingSystems"], size: 100, weightLabel: "20% of each test" },
    { setNumber: 3, id: 123, name: "Vehicle Systems & Cargo", categories: ["vehicleSystems", "cargoHandling"], size: 100, weightLabel: "16% of each test" },
    { setNumber: 4, id: 124, name: "Safe Driving & Hazards", categories: ["safeDriving", "hazardPerception"], size: 125, weightLabel: "24% of each test" },
    { setNumber: 5, id: 125, name: "Driving Conditions", categories: ["weatherDriving", "nightDriving", "mountainDriving", "railroadCrossings"], size: 125, weightLabel: "12% of each test" },
    { setNumber: 6, id: 126, name: "Emergencies, Alcohol & Drugs", categories: ["emergencyProcedures", "alcoholDrugs"], size: 90, weightLabel: "14% of each test" },
  ],
  categoryLabels: {
    vehicleInspection: "Vehicle Inspection",
    basicControl: "Basic Vehicle Control",
    brakingSystems: "Braking Systems",
    vehicleSystems: "Vehicle Systems",
    cargoHandling: "Cargo Handling",
    safeDriving: "Safe Driving",
    hazardPerception: "Hazard Perception",
    weatherDriving: "Weather Driving",
    nightDriving: "Night Driving",
    mountainDriving: "Mountain Driving",
    railroadCrossings: "Railroad Crossings",
    emergencyProcedures: "Emergency Procedures",
    alcoholDrugs: "Alcohol & Drugs",
  },
  copy: {
    guestPrompt: "to save your CDL progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Six sets covering the whole general knowledge manual. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions like the real exam",
    heroSubs: [
      "Six topics, six full tests. Inspection, control and safe driving carry the most weight.",
      "Mastery first, then test. The sets follow the CDL manual's chapters.",
      "Halfway through the manual. The practice tests will show where you stand.",
      "Fix the misses, then retake. 80% is the pass line on the real test.",
      "Full prep done. Go book your knowledge test at the DMV.",
    ],
    sourceLine: "Covers the CDL general knowledge exam. 80% to pass on the real test.",
    analyticsKey: "cdl",
  },
};

const cdlx: ExamConfig = {
  id: "cdlx",
  stateCode: "CDLE",
  idBase: 700,
  slug: "/cdl-endorsements",
  landingPath: "/cdl-endorsement-practice-test",
  name: "CDL Endorsements",
  shortName: "CDL Endorsements",
  examLabel: "CDL Endorsements",
  fullName: "CDL endorsement knowledge tests",
  questionIdPrefix: "CDLE-",
  icon: "truck",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // One training set per endorsement is the real product; the mixed tests
  // draw from each in proportion to the bank. Based on FMCSA CDL Manual
  // sections 4, 5, 6, 8 and 9.
  blueprint: {
    hazmatEndorsement: 13,
    airBrakes: 11,
    combinationVehicles: 10,
    tankVehicles: 8,
    passengerTransport: 8,
  },
  trainingSets: [
    { setNumber: 1, id: 701, name: "Hazardous Materials (H)", categories: ["hazmatEndorsement"], size: 52, weightLabel: "Real test: 30 questions, 80%" },
    { setNumber: 2, id: 702, name: "Air Brakes", categories: ["airBrakes"], size: 44, weightLabel: "Real test: 25 questions, 80%" },
    { setNumber: 3, id: 703, name: "Combination Vehicles", categories: ["combinationVehicles"], size: 40, weightLabel: "Real test: 20 questions, 80%" },
    { setNumber: 4, id: 704, name: "Tank Vehicles (N)", categories: ["tankVehicles"], size: 32, weightLabel: "Real test: 20 questions, 80%" },
    { setNumber: 5, id: 705, name: "Passenger Transport (P)", categories: ["passengerTransport"], size: 32, weightLabel: "Real test: 20 questions, 80%" },
  ],
  categoryLabels: {
    hazmatEndorsement: "Hazardous Materials",
    airBrakes: "Air Brakes",
    combinationVehicles: "Combination Vehicles",
    tankVehicles: "Tank Vehicles",
    passengerTransport: "Passenger Transport",
  },
  copy: {
    guestPrompt: "to save your endorsement progress and track every question you miss",
    trainingHeading: "Train one endorsement at a time",
    trainingSub: "One set per endorsement, straight from the FMCSA manual section. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mixed practice tests · 50 questions across all five, 80% to pass",
    heroSubs: [
      "Five endorsements, four mixed tests. Pick the set for the endorsement you are adding.",
      "Mastery first, then test. Each set is one section of the CDL manual.",
      "Halfway through. The mixed tests will show where you stand across endorsements.",
      "Fix the misses, then retake. Every endorsement test wants 80%.",
      "Full prep done. Go book your endorsement tests at the DMV.",
    ],
    sourceLine: "Based on FMCSA CDL Manual sections 4, 5, 6, 8 and 9. HazMat also needs a TSA security threat assessment.",
    analyticsKey: "cdlx",
  },
};

const moto: ExamConfig = {
  id: "moto",
  stateCode: "MOTO",
  idBase: 500,
  slug: "/motorcycle",
  landingPath: "/motorcycle-practice-test",
  name: "Motorcycle Practice Test",
  shortName: "Motorcycle",
  examLabel: "Motorcycle Permit",
  fullName: "motorcycle permit knowledge test",
  questionIdPrefix: "MC-",
  icon: "bike",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Weighted to the MSF Motorcycle Operator Manual, which nearly every state
  // permit test is written from. Control and positioning carry the most.
  blueprint: {
    ridingPreparation: 7,
    basicControl: 10,
    laneStrategy: 9,
    intersectionsPassing: 7,
    roadHazards: 6,
    specialSituations: 6,
    alcoholDrugs: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 501, name: "Preparing to Ride", categories: ["ridingPreparation"], size: 28, weightLabel: "14% of each test" },
    { setNumber: 2, id: 502, name: "Controlling the Motorcycle", categories: ["basicControl"], size: 40, weightLabel: "20% of each test" },
    { setNumber: 3, id: 503, name: "Positioning & Being Seen", categories: ["laneStrategy"], size: 36, weightLabel: "18% of each test" },
    { setNumber: 4, id: 504, name: "Intersections, Passing & Hazards", categories: ["intersectionsPassing", "roadHazards"], size: 52, weightLabel: "26% of each test" },
    { setNumber: 5, id: 505, name: "Special Situations, Alcohol & Drugs", categories: ["specialSituations", "alcoholDrugs"], size: 44, weightLabel: "22% of each test" },
  ],
  categoryLabels: {
    ridingPreparation: "Preparing to Ride",
    basicControl: "Basic Vehicle Control",
    laneStrategy: "Positioning & Being Seen",
    intersectionsPassing: "Intersections & Passing",
    roadHazards: "Road Hazards",
    specialSituations: "Special Situations",
    alcoholDrugs: "Alcohol & Drugs",
  },
  copy: {
    guestPrompt: "to save your motorcycle permit progress and track every question you miss",
    trainingHeading: "Train by manual chapter",
    trainingSub: "Five sets following the MSF Motorcycle Operator Manual. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 80% to pass",
    heroSubs: [
      "Five chapters, four full tests. Control and positioning carry the most weight.",
      "Mastery first, then test. The sets follow the MSF manual your state test is written from.",
      "Halfway through the manual. The practice tests will show where you stand.",
      "Fix the misses, then retake. Most states want 80% on the real test.",
      "Full prep done. Go book your permit test at the DMV.",
    ],
    sourceLine: "Based on the MSF Motorcycle Operator Manual used by nearly every state. Check your state's handbook for local rules.",
    analyticsKey: "moto",
  },
};

const civics: ExamConfig = {
  id: "civics",
  stateCode: "CIVICS",
  idBase: 600,
  slug: "/citizenship",
  landingPath: "/citizenship-test",
  name: "Citizenship Test Practice",
  shortName: "Citizenship",
  examLabel: "USCIS Civics Test",
  fullName: "U.S. citizenship civics test",
  questionIdPrefix: "CIV-",
  icon: "flag",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  // The 2025 USCIS list has 128 questions in 8 sections; the bank expands
  // multi-answer questions into several items, in the list's proportions.
  blueprint: {
    principlesDemocracy: 6,
    systemGovernment: 18,
    rightsResponsibilities: 4,
    colonialIndependence: 7,
    history1800s: 4,
    recentHistory: 7,
    symbolsHolidays: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 601, name: "Principles, Rights & Responsibilities", categories: ["principlesDemocracy", "rightsResponsibilities"], size: 40, weightLabel: "20% of each test" },
    { setNumber: 2, id: 602, name: "System of Government", categories: ["systemGovernment"], size: 72, weightLabel: "36% of each test" },
    { setNumber: 3, id: 603, name: "American History", categories: ["colonialIndependence", "history1800s", "recentHistory"], size: 72, weightLabel: "36% of each test" },
    { setNumber: 4, id: 604, name: "Symbols & Holidays", categories: ["symbolsHolidays"], size: 16, weightLabel: "8% of each test" },
  ],
  categoryLabels: {
    principlesDemocracy: "Principles of American Government",
    systemGovernment: "System of Government",
    rightsResponsibilities: "Rights & Responsibilities",
    colonialIndependence: "Colonial Period & Independence",
    history1800s: "1800s",
    recentHistory: "Recent American History",
    symbolsHolidays: "Symbols & Holidays",
  },
  copy: {
    guestPrompt: "to save your civics test progress and track every question you miss",
    trainingHeading: "Train by section of the official list",
    trainingSub: "Four sets covering all 128 official questions. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 60% to pass like the real test",
    heroSubs: [
      "All 128 official questions, four full tests. Government and history are most of the test.",
      "Mastery first, then test. The sets follow the USCIS list section by section.",
      "Halfway through the list. The practice tests will show where you stand.",
      "Fix the misses, then retake. On the real test you need 12 of 20.",
      "Full prep done. Check uscis.gov for answer updates before your interview.",
    ],
    sourceLine: "Built from the official USCIS 2025 civics test list (128 questions). Officials' names change; check uscis.gov/citizenship/testupdates.",
    analyticsKey: "civics",
  },
};

const part107: ExamConfig = {
  id: "part107",
  stateCode: "P107",
  idBase: 800,
  slug: "/part-107",
  landingPath: "/part-107-practice-test",
  name: "Part 107 Practice Test",
  shortName: "Part 107",
  examLabel: "FAA Part 107",
  fullName: "FAA Part 107 remote pilot knowledge test",
  questionIdPrefix: "P107-",
  icon: "plane",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // FAA UAG test: Regulations 15-25%, Airspace 15-25%, Weather 11-16%,
  // Loading & Performance 7-11%, Operations 35-45%.
  blueprint: {
    regulations: 10,
    airspace: 10,
    weather: 7,
    loadingPerformance: 5,
    operations: 18,
  },
  trainingSets: [
    { setNumber: 1, id: 801, name: "Regulations", categories: ["regulations"], size: 40, weightLabel: "15-25% of the exam" },
    { setNumber: 2, id: 802, name: "Airspace & Charts", categories: ["airspace"], size: 40, weightLabel: "15-25% of the exam" },
    { setNumber: 3, id: 803, name: "Weather", categories: ["weather"], size: 28, weightLabel: "11-16% of the exam" },
    { setNumber: 4, id: 804, name: "Loading & Performance", categories: ["loadingPerformance"], size: 20, weightLabel: "7-11% of the exam" },
    { setNumber: 5, id: 805, name: "Operations", categories: ["operations"], size: 72, weightLabel: "35-45% of the exam" },
  ],
  categoryLabels: {
    regulations: "Regulations",
    airspace: "Airspace & Charts",
    weather: "Weather",
    loadingPerformance: "Loading & Performance",
    operations: "Operations",
  },
  copy: {
    guestPrompt: "to save your Part 107 progress and track every question you miss",
    trainingHeading: "Train by ACS area",
    trainingSub: "Five sets following the FAA Airman Certification Standards. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the UAG exam, 70% to pass",
    heroSubs: [
      "Five ACS areas, four full tests. Operations is more than a third of the exam.",
      "Mastery first, then test. The sets follow the FAA ACS areas.",
      "Halfway through the ACS. The practice tests will show where you stand.",
      "Fix the misses, then retake. The real test wants 42 of 60.",
      "Full prep done. Get your FTN on IACRA and book the UAG test at a PSI center.",
    ],
    sourceLine: "Weighted to the FAA Remote Pilot ACS. The real test adds sectional chart figures, so study a chart legend too.",
    analyticsKey: "part107",
  },
};

const ham: ExamConfig = {
  id: "ham",
  stateCode: "HAM",
  idBase: 900,
  slug: "/ham-radio",
  landingPath: "/ham-radio-technician-practice-test",
  name: "Ham Radio Technician Test",
  shortName: "Ham Radio",
  examLabel: "FCC Technician",
  fullName: "FCC amateur radio Technician class exam",
  questionIdPrefix: "HAM-",
  icon: "radio",
  testCount: 4,
  questionsPerTest: 35,
  passPct: 74,
  // The real exam draws one question per group: 35 questions across the ten
  // subelements, 26 to pass. The bank is the official 2026-2030 NCVEC pool.
  blueprint: {
    hamRules: 6,
    hamOperating: 3,
    hamPropagation: 3,
    hamPractices: 2,
    hamElectrical: 4,
    hamComponents: 4,
    hamCircuits: 4,
    hamSignals: 4,
    hamAntennas: 2,
    hamSafety: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 901, name: "FCC Rules (T1)", categories: ["hamRules"], size: 68, weightLabel: "6 of 35 exam questions" },
    { setNumber: 2, id: 902, name: "Operating & Propagation (T2, T3)", categories: ["hamOperating", "hamPropagation"], size: 72, weightLabel: "6 of 35 exam questions" },
    { setNumber: 3, id: 903, name: "Practices & Electrical Principles (T4, T5)", categories: ["hamPractices", "hamElectrical"], size: 73, weightLabel: "6 of 35 exam questions" },
    { setNumber: 4, id: 904, name: "Components & Circuits (T6, T7)", categories: ["hamComponents", "hamCircuits"], size: 78, weightLabel: "8 of 35 exam questions" },
    { setNumber: 5, id: 905, name: "Signals & Antennas (T8, T9)", categories: ["hamSignals", "hamAntennas"], size: 70, weightLabel: "6 of 35 exam questions" },
    { setNumber: 6, id: 906, name: "Safety (T0)", categories: ["hamSafety"], size: 36, weightLabel: "3 of 35 exam questions" },
  ],
  categoryLabels: {
    hamRules: "FCC Rules (T1)",
    hamOperating: "Operating Procedures (T2)",
    hamPropagation: "Radio Wave Propagation (T3)",
    hamPractices: "Amateur Radio Practices (T4)",
    hamElectrical: "Electrical Principles (T5)",
    hamComponents: "Electronic Components (T6)",
    hamCircuits: "Practical Circuits (T7)",
    hamSignals: "Signals & Emissions (T8)",
    hamAntennas: "Antennas & Feed Lines (T9)",
    hamSafety: "Safety (T0)",
  },
  copy: {
    guestPrompt: "to save your Technician exam progress and track every question you miss",
    trainingHeading: "Train by subelement",
    trainingSub: "Six sets covering the whole official 2026-2030 question pool. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice exams · 35 questions drawn like the real exam, 26 to pass",
    heroSubs: [
      "The whole official pool, four full exams. Every question you see here can appear on the real test.",
      "Mastery first, then test. The sets follow the pool's ten subelements.",
      "Halfway through the pool. The practice exams will show where you stand.",
      "Fix the misses, then retake. The real exam wants 26 of 35.",
      "Full prep done. Find a VE session near you and bring your FRN.",
    ],
    sourceLine: "Official NCVEC 2026-2030 Technician pool (effective July 1, 2026). The 12 questions that need a schematic figure are left out.",
    analyticsKey: "ham",
  },
};

const epa608: ExamConfig = {
  id: "epa608",
  stateCode: "EPA608",
  idBase: 1000,
  slug: "/epa-608",
  landingPath: "/epa-608-practice-test",
  name: "EPA 608 Practice Test",
  shortName: "EPA 608",
  examLabel: "EPA Section 608",
  fullName: "EPA Section 608 technician certification exam",
  questionIdPrefix: "EPA-",
  icon: "thermometer",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 72,
  // Four real sections of 25 at 18 to pass (72%). The mixed tests draw from
  // each in proportion; the training sets are the sections themselves.
  blueprint: {
    epaCore: 18,
    epaType1: 10,
    epaType2: 13,
    epaType3: 9,
  },
  trainingSets: [
    { setNumber: 1, id: 1001, name: "Core", categories: ["epaCore"], size: 72, weightLabel: "Required for every certification" },
    { setNumber: 2, id: 1002, name: "Type I: Small Appliances", categories: ["epaType1"], size: 40, weightLabel: "Charges of 5 lb or less" },
    { setNumber: 3, id: 1003, name: "Type II: High-Pressure", categories: ["epaType2"], size: 52, weightLabel: "Split systems, commercial refrigeration" },
    { setNumber: 4, id: 1004, name: "Type III: Low-Pressure", categories: ["epaType3"], size: 36, weightLabel: "Low-pressure chillers" },
  ],
  categoryLabels: {
    epaCore: "Core",
    epaType1: "Type I: Small Appliances",
    epaType2: "Type II: High-Pressure",
    epaType3: "Type III: Low-Pressure",
  },
  copy: {
    guestPrompt: "to save your EPA 608 progress and track every question you miss",
    trainingHeading: "Train one section at a time",
    trainingSub: "Core plus the three types, straight from the EPA test outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mixed practice tests · 50 questions across all four sections, 72% to pass",
    heroSubs: [
      "Four sections, four mixed tests. Core is on every certification, so start there.",
      "Mastery first, then test. Each set is one section of the real exam.",
      "Halfway through. The mixed tests will show where you stand across sections.",
      "Fix the misses, then retake. Every section wants 18 of 25.",
      "Full prep done. Book a proctored session and go Universal.",
    ],
    sourceLine: "Based on 40 CFR Part 82 Subpart F and the EPA Section 608 test outline. Each real section is 25 questions, 18 to pass.",
    analyticsKey: "epa608",
  },
};

const cna: ExamConfig = {
  id: "cna",
  stateCode: "CNA",
  idBase: 1100,
  slug: "/cna",
  landingPath: "/cna-practice-test",
  name: "CNA Practice Test",
  shortName: "CNA",
  examLabel: "CNA Written Exam",
  fullName: "nurse aide written (knowledge) exam",
  questionIdPrefix: "CNA-",
  icon: "heart",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // NNAAP outline: Physical Care 61% (ADL 14, basic nursing 39, restorative 8),
  // Psychosocial 13% (emotional 11, spiritual/cultural 2), Role 26%
  // (communication 8, rights 7, legal/ethical 3, team 8).
  blueprint: {
    activitiesDailyLiving: 8,
    basicNursingSkills: 19,
    restorativeSkills: 4,
    emotionalMentalHealth: 5,
    spiritualCultural: 1,
    communication: 4,
    clientRights: 4,
    legalEthical: 1,
    healthCareTeam: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 1101, name: "Daily Living & Restorative Care", categories: ["activitiesDailyLiving", "restorativeSkills"], size: 48, weightLabel: "22% of the exam" },
    { setNumber: 2, id: 1102, name: "Basic Nursing Skills", categories: ["basicNursingSkills"], size: 76, weightLabel: "39% of the exam" },
    { setNumber: 3, id: 1103, name: "Psychosocial Care", categories: ["emotionalMentalHealth", "spiritualCultural"], size: 24, weightLabel: "13% of the exam" },
    { setNumber: 4, id: 1104, name: "Role of the Nurse Aide", categories: ["communication", "clientRights", "legalEthical", "healthCareTeam"], size: 52, weightLabel: "26% of the exam" },
  ],
  categoryLabels: {
    activitiesDailyLiving: "Activities of Daily Living",
    basicNursingSkills: "Basic Nursing Skills",
    restorativeSkills: "Restorative Skills",
    emotionalMentalHealth: "Emotional & Mental Health Needs",
    spiritualCultural: "Spiritual & Cultural Needs",
    communication: "Communication",
    clientRights: "Client Rights",
    legalEthical: "Legal & Ethical Behavior",
    healthCareTeam: "Member of the Health Care Team",
  },
  copy: {
    guestPrompt: "to save your CNA exam progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets following the NNAAP written exam outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Four content areas, four full tests. Basic nursing skills is almost 40% of the exam.",
      "Mastery first, then test. The sets follow the NNAAP outline most states use.",
      "Halfway through the outline. The practice tests will show where you stand.",
      "Fix the misses, then retake. Most states want about 70%.",
      "Full prep done. Book your written and skills test with your state's vendor.",
    ],
    sourceLine: "Weighted to the NNAAP written exam content outline. Your state may use Prometric or Headmaster with a similar outline.",
    analyticsKey: "cna",
  },
};

const ptcb: ExamConfig = {
  id: "ptcb",
  stateCode: "PTCB",
  idBase: 1200,
  slug: "/ptcb",
  landingPath: "/ptcb-practice-test",
  name: "PTCB Practice Test",
  shortName: "PTCB",
  examLabel: "PTCE Exam",
  fullName: "Pharmacy Technician Certification Exam (PTCE)",
  questionIdPrefix: "PTCB-",
  icon: "pill",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // PTCE outline effective January 2026: Medications 35%, Patient Safety and
  // Quality Assurance 23.75%, Order Entry and Processing 22.5%, Federal
  // Requirements 18.75%. Real exam: 90 items (80 scored), scaled pass 1400/1600.
  blueprint: {
    ptcbMedications: 18,
    ptcbPatientSafety: 12,
    ptcbOrderEntry: 11,
    ptcbFederal: 9,
  },
  trainingSets: [
    { setNumber: 1, id: 1201, name: "Medications", categories: ["ptcbMedications"], size: 72, weightLabel: "35% of the exam" },
    { setNumber: 2, id: 1202, name: "Patient Safety & Quality Assurance", categories: ["ptcbPatientSafety"], size: 48, weightLabel: "24% of the exam" },
    { setNumber: 3, id: 1203, name: "Order Entry & Processing", categories: ["ptcbOrderEntry"], size: 44, weightLabel: "22% of the exam" },
    { setNumber: 4, id: 1204, name: "Federal Requirements", categories: ["ptcbFederal"], size: 36, weightLabel: "19% of the exam" },
  ],
  categoryLabels: {
    ptcbMedications: "Medications",
    ptcbPatientSafety: "Patient Safety & Quality Assurance",
    ptcbOrderEntry: "Order Entry & Processing",
    ptcbFederal: "Federal Requirements",
  },
  copy: {
    guestPrompt: "to save your PTCE progress and track every question you miss",
    trainingHeading: "Train by knowledge domain",
    trainingSub: "Four sets matching the four PTCE domains. Instant feedback, worked math, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Four domains, four full tests. Medications is 35% of the exam and math runs through all of it.",
      "Mastery first, then test. The sets follow the 2026 PTCE content outline.",
      "Halfway through the outline. The practice tests will show where you stand.",
      "Fix the misses, then retake. Aim for 70% or better on every test before exam day.",
      "Full prep done. Schedule your PTCE at a Pearson VUE center.",
    ],
    sourceLine: "Weighted to the PTCB PTCE content outline effective January 2026. Federal law only; state rules vary.",
    analyticsKey: "ptcb",
  },
};

const phleb: ExamConfig = {
  id: "phleb",
  stateCode: "PHLEB",
  idBase: 1300,
  slug: "/phlebotomy",
  landingPath: "/phlebotomy-practice-test",
  name: "Phlebotomy Practice Test",
  shortName: "Phlebotomy",
  examLabel: "Phlebotomy Exam",
  fullName: "phlebotomy technician certification exam (NHA CPT)",
  questionIdPrefix: "PHL-",
  icon: "syringe",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // NHA CPT test plan (2025 plan, exam from January 2026): Routine Blood
  // Collections 28%, Safety and Compliance 26%, Patient Preparation 20%,
  // Processing 14%, Special Collections 12%. Real exam: 120 items (100 scored),
  // scaled pass 390 of 500. Also covers ASCP PBT and AMT RPT material.
  blueprint: {
    routineCollections: 14,
    safetyCompliance: 13,
    patientPreparation: 10,
    specimenProcessing: 7,
    specialCollections: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 1301, name: "Routine Blood Collections", categories: ["routineCollections"], size: 56, weightLabel: "28% of the exam" },
    { setNumber: 2, id: 1302, name: "Safety & Compliance", categories: ["safetyCompliance"], size: 52, weightLabel: "26% of the exam" },
    { setNumber: 3, id: 1303, name: "Patient Preparation", categories: ["patientPreparation"], size: 40, weightLabel: "20% of the exam" },
    { setNumber: 4, id: 1304, name: "Processing & Special Collections", categories: ["specimenProcessing", "specialCollections"], size: 52, weightLabel: "26% of the exam" },
  ],
  categoryLabels: {
    routineCollections: "Routine Blood Collections",
    safetyCompliance: "Safety & Compliance",
    patientPreparation: "Patient Preparation",
    specimenProcessing: "Processing",
    specialCollections: "Special Collections",
  },
  copy: {
    guestPrompt: "to save your phlebotomy exam progress and track every question you miss",
    trainingHeading: "Train by domain",
    trainingSub: "Four sets following the NHA CPT test plan. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Five domains, four full tests. Routine collections and safety are more than half the exam.",
      "Mastery first, then test. The sets follow the NHA CPT test plan.",
      "Halfway through the outline. The practice tests will show where you stand.",
      "Fix the misses, then retake. Aim for 70% or better on every test before exam day.",
      "Full prep done. Schedule your CPT, PBT or RPT exam.",
    ],
    sourceLine: "Weighted to the NHA CPT test plan. Order of draw and technique follow CLSI GP41 and GP42.",
    analyticsKey: "phleb",
  },
};

const ccma: ExamConfig = {
  id: "ccma",
  stateCode: "CCMA",
  idBase: 1400,
  slug: "/ccma",
  landingPath: "/ccma-practice-test",
  name: "CCMA Practice Test",
  shortName: "CCMA",
  examLabel: "CCMA Exam",
  fullName: "Certified Clinical Medical Assistant (NHA CCMA) exam",
  questionIdPrefix: "CCMA-",
  icon: "stethoscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // NHA CCMA test plan (3.0, 2022 job analysis): Foundational Knowledge 10%,
  // Anatomy and Physiology 5%, Clinical Patient Care 56% (intake and vitals,
  // general care, infection control and safety, POC testing and lab,
  // phlebotomy, EKG), Care Coordination and Education 8%, Administrative 8%,
  // Communication 8%, Law and Ethics 5%. Real exam: 180 items (150 scored),
  // scaled pass 390 of 500.
  blueprint: {
    ccmaFoundations: 5,
    ccmaAnatomy: 3,
    ccmaIntakeVitals: 5,
    ccmaGeneralCare: 9,
    ccmaInfectionSafety: 5,
    ccmaLabProcedures: 3,
    ccmaPhlebotomy: 4,
    ccmaEkg: 2,
    ccmaCareCoordination: 4,
    ccmaAdministrative: 4,
    ccmaCommunication: 4,
    ccmaLawEthics: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 1401, name: "Foundations & Anatomy", categories: ["ccmaFoundations", "ccmaAnatomy"], size: 32, weightLabel: "15% of the exam" },
    { setNumber: 2, id: 1402, name: "Intake, Vitals & Patient Care", categories: ["ccmaIntakeVitals", "ccmaGeneralCare"], size: 56, weightLabel: "28% of the exam" },
    { setNumber: 3, id: 1403, name: "Infection Control, Lab, Phlebotomy & EKG", categories: ["ccmaInfectionSafety", "ccmaLabProcedures", "ccmaPhlebotomy", "ccmaEkg"], size: 56, weightLabel: "28% of the exam" },
    { setNumber: 4, id: 1404, name: "Coordination, Admin, Communication & Law", categories: ["ccmaCareCoordination", "ccmaAdministrative", "ccmaCommunication", "ccmaLawEthics"], size: 56, weightLabel: "29% of the exam" },
  ],
  categoryLabels: {
    ccmaFoundations: "Foundational Knowledge & Basic Science",
    ccmaAnatomy: "Anatomy & Physiology",
    ccmaIntakeVitals: "Patient Intake & Vitals",
    ccmaGeneralCare: "General Patient Care",
    ccmaInfectionSafety: "Infection Control & Safety",
    ccmaLabProcedures: "Point of Care Testing & Lab",
    ccmaPhlebotomy: "Phlebotomy",
    ccmaEkg: "EKG & Cardiovascular Testing",
    ccmaCareCoordination: "Patient Care Coordination & Education",
    ccmaAdministrative: "Administrative Assisting",
    ccmaCommunication: "Communication & Customer Service",
    ccmaLawEthics: "Medical Law & Ethics",
  },
  copy: {
    guestPrompt: "to save your CCMA exam progress and track every question you miss",
    trainingHeading: "Train by domain",
    trainingSub: "Four sets covering all seven NHA CCMA domains. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Seven domains, four full tests. Clinical patient care is more than half the exam.",
      "Mastery first, then test. The sets follow the NHA CCMA test plan.",
      "Halfway through the outline. The practice tests will show where you stand.",
      "Fix the misses, then retake. Aim for 70% or better on every test before exam day.",
      "Full prep done. Schedule your CCMA exam with NHA.",
    ],
    sourceLine: "Weighted to the NHA CCMA test plan (3.0). Scope of practice varies by state.",
    analyticsKey: "ccma",
  },
};

const cet: ExamConfig = {
  id: "cet",
  stateCode: "CET",
  idBase: 1500,
  slug: "/ekg",
  landingPath: "/ekg-technician-practice-test",
  name: "EKG Technician Practice Test",
  shortName: "EKG",
  examLabel: "CET Exam",
  fullName: "Certified EKG Technician (NHA CET) exam",
  questionIdPrefix: "CET-",
  icon: "activity",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // NHA CET test plan (2017 job analysis, in force through 2026): EKG
  // Acquisition 44%, Safety, Compliance and Coordinated Patient Care 32%,
  // EKG Analysis and Interpretation 24%. Real exam: 120 items (100 scored),
  // scaled pass 390 of 500.
  blueprint: {
    ekgAcquisition: 22,
    ekgSafetyPatientCare: 16,
    ekgAnalysis: 12,
  },
  trainingSets: [
    { setNumber: 1, id: 1501, name: "EKG Acquisition: Setup & Leads", categories: ["ekgAcquisition"], size: 88, weightLabel: "44% of the exam" },
    { setNumber: 2, id: 1502, name: "Safety, Compliance & Patient Care", categories: ["ekgSafetyPatientCare"], size: 64, weightLabel: "32% of the exam" },
    { setNumber: 3, id: 1503, name: "EKG Analysis & Interpretation", categories: ["ekgAnalysis"], size: 48, weightLabel: "24% of the exam" },
  ],
  categoryLabels: {
    ekgAcquisition: "EKG Acquisition",
    ekgSafetyPatientCare: "Safety, Compliance & Patient Care",
    ekgAnalysis: "EKG Analysis & Interpretation",
  },
  copy: {
    guestPrompt: "to save your EKG exam progress and track every question you miss",
    trainingHeading: "Train by domain",
    trainingSub: "Three sets matching the three NHA CET domains. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Three domains, four full tests. Acquisition is almost half the exam.",
      "Mastery first, then test. The sets follow the NHA CET test plan.",
      "Halfway through the outline. The practice tests will show where you stand.",
      "Fix the misses, then retake. Aim for 70% or better on every test before exam day.",
      "Full prep done. Schedule your CET exam with NHA.",
    ],
    sourceLine: "Weighted to the NHA CET test plan. Rhythm items describe the strip in words; practice with real tracings too.",
    analyticsKey: "cet",
  },
};

const danb: ExamConfig = {
  id: "danb",
  stateCode: "DANB",
  idBase: 1600,
  slug: "/dental-assistant",
  landingPath: "/dental-assistant-practice-test",
  name: "Dental Assistant Practice Test",
  shortName: "Dental",
  examLabel: "DANB CDA Exam",
  fullName: "DANB Certified Dental Assistant (CDA) exam",
  questionIdPrefix: "DA-",
  icon: "tooth",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // The DANB CDA is three component exams: General Chairside (GC, 95
  // items), Radiation Health and Safety (RHS, 75 items) and Infection
  // Control (ICE, 75 items). Mixed tests split 50/25/25 across the three,
  // with GC in its outline's proportions (evaluation 17%, patient management
  // 17%, chairside 50%, materials 16%). Scaled scoring; 70% is a safe target.
  blueprint: {
    gcEvaluation: 4,
    gcPatientManagement: 4,
    gcChairside: 13,
    gcDentalMaterials: 4,
    rhsRadiography: 13,
    iceInfectionControl: 12,
  },
  trainingSets: [
    { setNumber: 1, id: 1601, name: "Chairside Dentistry (GC)", categories: ["gcChairside"], size: 52, weightLabel: "26% of the tests" },
    { setNumber: 2, id: 1602, name: "Evaluation, Patient Management & Materials (GC)", categories: ["gcEvaluation", "gcPatientManagement", "gcDentalMaterials"], size: 48, weightLabel: "24% of the tests" },
    { setNumber: 3, id: 1603, name: "Radiation Health & Safety (RHS)", categories: ["rhsRadiography"], size: 52, weightLabel: "26% of the tests" },
    { setNumber: 4, id: 1604, name: "Infection Control (ICE)", categories: ["iceInfectionControl"], size: 48, weightLabel: "24% of the tests" },
  ],
  categoryLabels: {
    gcEvaluation: "Collection & Recording of Clinical Data",
    gcPatientManagement: "Patient Management & Administration",
    gcChairside: "Chairside Dentistry",
    gcDentalMaterials: "Dental Materials",
    rhsRadiography: "Radiation Health & Safety",
    iceInfectionControl: "Infection Control",
  },
  copy: {
    guestPrompt: "to save your dental assistant exam progress and track every question you miss",
    trainingHeading: "Train by component exam",
    trainingSub: "Four sets covering General Chairside, Radiation Health and Safety, and Infection Control. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across all three CDA components",
    heroSubs: [
      "Three component exams, four full tests. Chairside dentistry is half of the GC exam.",
      "Mastery first, then test. The sets follow the DANB GC, RHS and ICE outlines.",
      "Halfway through the outlines. The practice tests will show where you stand.",
      "Fix the misses, then retake. Aim for 70% or better on every test before exam day.",
      "Full prep done. Schedule your GC, RHS and ICE exams with DANB.",
    ],
    sourceLine: "Weighted to the DANB GC, RHS (March 2025) and ICE (March 2025) outlines. Expanded functions vary by state.",
    analyticsKey: "danb",
  },
};

const emt: ExamConfig = {
  id: "emt",
  stateCode: "EMT",
  idBase: 1700,
  slug: "/emt",
  landingPath: "/emt-practice-test",
  name: "EMT Practice Test",
  shortName: "EMT",
  examLabel: "NREMT EMT Exam",
  fullName: "National Registry EMT cognitive exam",
  questionIdPrefix: "EMT-",
  icon: "siren",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // NREMT EMT examination specifications (April 2025, 2023 practice
  // analysis): Scene Size-up and Safety 15-19%, Primary Assessment 39-43%,
  // Secondary Assessment 5-9%, Patient Treatment and Transport 20-24%,
  // Operations 10-14%. Real exam: adaptive, 70 to 120 items in 2 hours.
  blueprint: {
    sceneSizeUp: 9,
    primaryAssessment: 20,
    secondaryAssessment: 4,
    treatmentTransport: 11,
    emsOperations: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 1701, name: "Scene Size-up & Safety", categories: ["sceneSizeUp"], size: 36, weightLabel: "17% of the exam" },
    { setNumber: 2, id: 1702, name: "Primary Assessment", categories: ["primaryAssessment"], size: 80, weightLabel: "41% of the exam" },
    { setNumber: 3, id: 1703, name: "Secondary Assessment & Operations", categories: ["secondaryAssessment", "emsOperations"], size: 40, weightLabel: "19% of the exam" },
    { setNumber: 4, id: 1704, name: "Patient Treatment & Transport", categories: ["treatmentTransport"], size: 44, weightLabel: "22% of the exam" },
  ],
  categoryLabels: {
    sceneSizeUp: "Scene Size-up & Safety",
    primaryAssessment: "Primary Assessment",
    secondaryAssessment: "Secondary Assessment",
    treatmentTransport: "Patient Treatment & Transport",
    emsOperations: "Operations",
  },
  copy: {
    guestPrompt: "to save your NREMT progress and track every question you miss",
    trainingHeading: "Train by domain",
    trainingSub: "Four sets covering the five NREMT EMT domains. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests \u00b7 50 questions weighted like the real exam",
    heroSubs: [
      "Five domains, four full tests. Primary assessment is more than 40% of the exam.",
      "Mastery first, then test. The sets follow the 2025 NREMT test plan.",
      "Halfway through the outline. The practice tests will show where you stand.",
      "Fix the misses, then retake. Aim for 70% or better on every test before exam day.",
      "Full prep done. Schedule your NREMT cognitive exam at Pearson VUE.",
    ],
    sourceLine: "Weighted to the NREMT EMT examination specifications (April 2025). Protocols vary; follow local medical direction.",
    analyticsKey: "emt",
  },
};

const htl: ExamConfig = {
  id: "htl",
  stateCode: "HTL",
  idBase: 200,
  slug: "/htl",
  name: "HTL Practice Test",
  shortName: "HTL",
  examLabel: "ASCP HTL",
  fullName: "ASCP Histotechnologist (HTL) exam",
  questionIdPrefix: "HTL-",
  icon: "microscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  blueprint: {
    staining: 18,
    fixation: 10,
    embeddingMicrotomy: 10,
    processing: 7,
    laboratoryOperations: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 201, name: "Fixation", categories: ["fixation"], size: 40, weightLabel: "15–25% of the exam" },
    { setNumber: 2, id: 202, name: "Processing", categories: ["processing"], size: 28, weightLabel: "10–20% of the exam" },
    { setNumber: 3, id: 203, name: "Embedding & Microtomy", categories: ["embeddingMicrotomy"], size: 40, weightLabel: "15–25% of the exam" },
    { setNumber: 4, id: 204, name: "Staining", categories: ["staining"], size: 72, weightLabel: "30–40% of the exam" },
    { setNumber: 5, id: 205, name: "Laboratory Operations", categories: ["laboratoryOperations"], size: 20, weightLabel: "10–15% of the exam" },
  ],
  categoryLabels: {
    fixation: "Fixation",
    processing: "Processing",
    embeddingMicrotomy: "Embedding & Microtomy",
    staining: "Staining",
    laboratoryOperations: "Laboratory Operations",
  },
  copy: {
    guestPrompt: "to save your HTL progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "One set per ASCP content area. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Five content areas, four full tests. Work the outline the way ASCP weights it.",
      "Mastery first, then test. The sets mirror the ASCP content guideline.",
      "Halfway through the outline. The practice tests will show where you stand.",
      "Fix the misses, then retake. That's how the pass line gets closer.",
      "Full prep done. Go book your exam window with ASCP.",
    ],
    sourceLine: "Weighted to the ASCP BOC HT/HTL content guideline (rev. Sept 2025).",
    analyticsKey: "htl",
  },
};

const cst: ExamConfig = {
  id: "cst",
  stateCode: "CST",
  idBase: 300,
  slug: "/cst",
  name: "CST Practice Test",
  shortName: "CST",
  examLabel: "NBSTSA CST",
  fullName: "NBSTSA Certified Surgical Technologist (CST) exam",
  questionIdPrefix: "CST-",
  icon: "scissors",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // NBSTSA 2023 outline, 150 scored items, scaled to 50:
  // preop 19, intraop 68, postop 10, admin 7, equipment 16, A&P 18, micro 6, pharm 6
  blueprint: {
    preoperativePreparation: 6,
    intraoperativeProcedures: 23,
    postoperativeProcedures: 3,
    administrativePersonnel: 2,
    equipmentSterilization: 5,
    anatomyPhysiology: 6,
    microbiology: 2,
    surgicalPharmacology: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 301, name: "Preoperative Preparation", categories: ["preoperativePreparation"], size: 24, weightLabel: "13% of the exam" },
    { setNumber: 2, id: 302, name: "Intraoperative Procedures", categories: ["intraoperativeProcedures"], size: 92, weightLabel: "45% of the exam" },
    { setNumber: 3, id: 303, name: "Postoperative Procedures", categories: ["postoperativeProcedures"], size: 12, weightLabel: "7% of the exam" },
    { setNumber: 4, id: 304, name: "Ancillary Duties", categories: ["administrativePersonnel", "equipmentSterilization"], size: 28, weightLabel: "15% of the exam" },
    { setNumber: 5, id: 305, name: "Basic Science", categories: ["anatomyPhysiology", "microbiology", "surgicalPharmacology"], size: 44, weightLabel: "20% of the exam" },
  ],
  categoryLabels: {
    preoperativePreparation: "Preoperative Preparation",
    intraoperativeProcedures: "Intraoperative Procedures",
    postoperativeProcedures: "Postoperative Procedures",
    administrativePersonnel: "Administrative & Personnel",
    equipmentSterilization: "Equipment Sterilization & Maintenance",
    anatomyPhysiology: "Anatomy & Physiology",
    microbiology: "Microbiology",
    surgicalPharmacology: "Surgical Pharmacology",
  },
  copy: {
    guestPrompt: "to save your CST progress and track every question you miss",
    trainingHeading: "Train by exam domain",
    trainingSub: "Sets follow the NBSTSA outline. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Three domains, four full tests. Intraoperative procedures carry almost half the exam.",
      "Mastery first, then test. The sets mirror the NBSTSA content outline.",
      "Halfway through the outline. The practice tests will show where you stand.",
      "Fix the misses, then retake. That's how the pass line gets closer.",
      "Full prep done. Go schedule your CST exam with NBSTSA.",
    ],
    sourceLine: "Weighted to the NBSTSA CST examination content outline (2023 job analysis).",
    analyticsKey: "cst",
  },
};

const crcst: ExamConfig = {
  id: "crcst",
  stateCode: "CRCST",
  idBase: 400,
  slug: "/crcst",
  name: "CRCST Practice Test",
  shortName: "CRCST",
  examLabel: "HSPA CRCST",
  fullName: "HSPA Certified Registered Central Service Technician (CRCST) exam",
  questionIdPrefix: "SPD-",
  icon: "shield",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // HSPA outline (rev. Nov 2023): 15 / 21 / 21 / 21 / 9 / 5 / 8 percent, scaled to 50
  blueprint: {
    departmentalConsiderations: 7,
    cleaningDecontamination: 11,
    preparationPackaging: 10,
    sterilizationProcess: 11,
    sterileStorageInventory: 5,
    patientCareEquipment: 2,
    professionalDevelopment: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 401, name: "Departmental Considerations", categories: ["departmentalConsiderations"], size: 28, weightLabel: "15% of the exam" },
    { setNumber: 2, id: 402, name: "Cleaning, Decontamination & Disinfection", categories: ["cleaningDecontamination"], size: 44, weightLabel: "21% of the exam" },
    { setNumber: 3, id: 403, name: "Preparation & Packaging", categories: ["preparationPackaging"], size: 40, weightLabel: "21% of the exam" },
    { setNumber: 4, id: 404, name: "Sterilization Process", categories: ["sterilizationProcess"], size: 44, weightLabel: "21% of the exam" },
    { setNumber: 5, id: 405, name: "Storage, Inventory & Patient Equipment", categories: ["sterileStorageInventory", "patientCareEquipment"], size: 28, weightLabel: "14% of the exam" },
    { setNumber: 6, id: 406, name: "Professional Skills", categories: ["professionalDevelopment"], size: 16, weightLabel: "8% of the exam" },
  ],
  categoryLabels: {
    departmentalConsiderations: "Departmental Considerations",
    cleaningDecontamination: "Cleaning, Decontamination & Disinfection",
    preparationPackaging: "Preparation & Packaging",
    sterilizationProcess: "Sterilization Process",
    sterileStorageInventory: "Sterile Storage, Transport & Inventory",
    patientCareEquipment: "Patient Care Equipment & Distribution",
    professionalDevelopment: "Professional Development & Human Relations",
  },
  copy: {
    guestPrompt: "to save your CRCST progress and track every question you miss",
    trainingHeading: "Train by exam section",
    trainingSub: "Sets follow the seven HSPA sections. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions weighted like the real exam",
    heroSubs: [
      "Seven sections, four full tests. Decontamination, prep and sterilization are 63% of the exam.",
      "Mastery first, then test. The sets mirror the HSPA content outline.",
      "Halfway through the outline. The practice tests will show where you stand.",
      "Fix the misses, then retake. That's how the pass line gets closer.",
      "Full prep done. Go schedule your CRCST exam with HSPA.",
    ],
    sourceLine: "Weighted to the HSPA CRCST exam content outline (rev. Nov 2023). Also covers the CBSPD CSPDT.",
    analyticsKey: "crcst",
  },
};

export const EXAMS: ExamConfig[] = [cdl, cdlx, moto, civics, part107, ham, epa608, cna, ptcb, phleb, ccma, cet, danb, emt, htl, cst, crcst];

export const examSetBase = (exam: ExamConfig) => exam.setIdBase ?? exam.idBase;
/** Store ID of training set N of an exam. */
export const examSetId = (exam: ExamConfig, setNumber: number) => examSetBase(exam) + setNumber;
/** Landing page URL (the SEO page the switcher, hub and footer link to). */
export const examLandingPath = (exam: ExamConfig) => exam.landingPath ?? exam.slug;

export const examTestIds = (exam: ExamConfig) =>
  Array.from({ length: exam.testCount }, (_, i) => exam.idBase + 1 + i);

export function getExamById(id: string): ExamConfig | undefined {
  return EXAMS.find((e) => e.id === id);
}

export function getExamByStateCode(code: string | null | undefined): ExamConfig | undefined {
  if (!code) return undefined;
  return EXAMS.find((e) => e.stateCode === code.toUpperCase());
}

/** Exam owning a practice-test store ID, if any. */
export function getExamForTestId(testId: number): ExamConfig | undefined {
  return EXAMS.find((e) => testId > e.idBase && testId <= e.idBase + e.testCount);
}

/** Exam owning a training-set store ID, if any. */
export function getExamForSetId(setId: number): ExamConfig | undefined {
  return EXAMS.find((e) => setId > examSetBase(e) && setId <= examSetBase(e) + e.trainingSets.length);
}

/** Exam whose pages a pathname belongs to (landing included), if any. */
export function getExamByPath(pathname: string | null | undefined): ExamConfig | undefined {
  if (!pathname) return undefined;
  return EXAMS.find(
    (e) => pathname === e.slug || pathname.startsWith(`${e.slug}/`) || pathname === e.landingPath
  );
}

export function getExamTrainingSetSize(setId: number): number {
  const exam = getExamForSetId(setId);
  return exam?.trainingSets.find((s) => s.id === setId)?.size ?? 50;
}

export function isExamQuestionId(questionId: string): boolean {
  return EXAMS.some((e) => questionId.startsWith(e.questionIdPrefix));
}
