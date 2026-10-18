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

import TRAINING_PARTS from "./trainingParts.json";

export type ExamId = "realestate-ca" | "realestate-nj" | "realestate-tx" | "realestate-fl" | "realestate-ny" | "insurance-tx" | "insurance-fl" | "insurance-ca" | "pnc-tx" | "pnc-fl" | "pnc-ca" | "cdl" | "cdlx" | "moto" | "civics" | "part107" | "ham" | "epa608" | "cna" | "ptcb" | "phleb" | "ccma" | "cet" | "danb" | "foodmgr" | "realestate" | "insurance" | "notary" | "foodhandler" | "boating" | "hunter" | "cpr" | "osha" | "forklift" | "alcohol" | "security" | "lifeguard" | "pnc" | "htl" | "cst" | "crcst";

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
  /** Set on a state variant (realestate-ca): the exam family it belongs to.
   *  Variants are full exams with their own ID range, pseudo state code and
   *  question prefix, so progress per state never mixes. They stay out of
   *  EXAMS (catalog, sitemap, emails) and are listed in EXAM_VARIANTS. */
  variantOf?: ExamId;
  /** Jurisdiction a variant covers, e.g. { code: "CA", name: "California" }. */
  jurisdiction?: { code: string; name: string };
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
  icon: "truck" | "bike" | "flag" | "plane" | "radio" | "thermometer" | "heart" | "pill" | "syringe" | "stethoscope" | "activity" | "tooth" | "siren" | "utensils" | "house" | "umbrella" | "stamp" | "graduation" | "cloud" | "cpu" | "chef" | "sailboat" | "target" | "lock" | "book" | "medal" | "bandage" | "hardhat" | "forklift" | "wine" | "pencil" | "badge" | "lifebuoy" | "building" | "microscope" | "scissors" | "shield";
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
      "Six topics, six tests. Inspection weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your CDL knowledge test.",
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
      "Pick the set for your endorsement.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your endorsement tests.",
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
      "Five chapters, four tests. Start with control.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your permit test.",
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
    trainingSub: "Four sets with 200 adapted study items for the 2025 civics test. Review the official questions and prepare your own local answers.",
    testsHeading: "Multiple-choice practice · 50 questions · 60% practice target",
    heroSubs: [
      "Four tests. Prep your local answers too.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Check USCIS for your test version.",
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
      "Five areas, four tests. Operations weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Get your FTN and book the test.",
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
      "The full official pool, four exams.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Find a VE session near you.",
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
      "Four sections. Start with Core.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book a proctored session.",
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
      "Four areas, four tests. Nursing skills weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your state's CNA exam.",
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
      "Four domains, four tests. Medications weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Schedule your PTCE.",
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
      "Five domains, four tests. Collections weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Schedule your phlebotomy exam.",
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
      "Seven domains, four tests. Patient care weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Schedule your CCMA exam.",
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
      "Three domains, four tests. Acquisition weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Schedule your CET exam.",
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
      "Three exams, four tests. Chairside weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Schedule your DANB exams.",
    ],
    sourceLine: "Weighted to the DANB GC, RHS (March 2025) and ICE (March 2025) outlines. Expanded functions vary by state.",
    analyticsKey: "danb",
  },
};

const foodmgr: ExamConfig = {
  id: "foodmgr",
  stateCode: "FOODMGR",
  idBase: 1800,
  slug: "/food-manager",
  landingPath: "/food-manager-practice-test",
  name: "Food Manager Practice Test",
  shortName: "Food Safety",
  examLabel: "Food Manager Exam",
  fullName: "Certified Food Protection Manager exam",
  questionIdPrefix: "FSM-",
  icon: "utensils",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Certified Food Protection Manager exams (ServSafe Manager, NRFSP,
  // Prometric, StateFoodSafety and other ANAB-CFP accredited programs) on the
  // FDA Food Code. Typical exam: 80 scored items, 2 hours, 75% to pass.
  blueprint: {
    foodborneContamination: 8,
    flowOfFood: 12,
    timeTemperature: 10,
    personalHygiene: 8,
    cleaningSanitizing: 6,
    facilitiesPests: 3,
    managementSystems: 3,
  },
  trainingSets: [
    { setNumber: 1, id: 1801, name: "Contamination & Personal Hygiene", categories: ["foodborneContamination", "personalHygiene"], size: 64, weightLabel: "32% of the exam" },
    { setNumber: 2, id: 1802, name: "The Flow of Food", categories: ["flowOfFood"], size: 48, weightLabel: "24% of the exam" },
    { setNumber: 3, id: 1803, name: "Time & Temperature Control", categories: ["timeTemperature"], size: 40, weightLabel: "20% of the exam" },
    { setNumber: 4, id: 1804, name: "Cleaning, Facilities & Management", categories: ["cleaningSanitizing", "facilitiesPests", "managementSystems"], size: 48, weightLabel: "24% of the exam" },
  ],
  categoryLabels: {
    foodborneContamination: "Foodborne Illness & Contamination",
    flowOfFood: "The Flow of Food",
    timeTemperature: "Time & Temperature Control",
    personalHygiene: "Personal Hygiene & Employee Health",
    cleaningSanitizing: "Cleaning & Sanitizing",
    facilitiesPests: "Facilities, Equipment & Pest Control",
    managementSystems: "Food Safety Management & Regulation",
  },
  copy: {
    guestPrompt: "to save your food manager exam progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets covering every Food Code content area on the manager exam. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests \u00b7 50 questions weighted like the real exam",
    heroSubs: [
      "Seven areas, four tests. Temperatures weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your food manager exam.",
    ],
    sourceLine: "Built on the FDA Food Code (2017 and 2022). Your local code may differ; check with your health department.",
    analyticsKey: "foodmgr",
  },
};

const realestate: ExamConfig = {
  id: "realestate",
  stateCode: "REALESTATE",
  idBase: 1900,
  slug: "/real-estate",
  landingPath: "/real-estate-practice-test",
  name: "Real Estate Practice Test",
  shortName: "Real Estate",
  examLabel: "Real Estate Exam",
  fullName: "real estate salesperson national exam",
  questionIdPrefix: "RE-",
  icon: "house",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Pearson VUE National/General Exam Content Outline for Salespersons
  // (2025; 80 scored items; I 11, II 9, III 11, IV 16, V 10, VI 9, VII 7,
  // VIII 7), which closely matches the PSI national outline. National
  // portion only; state law is never tested.
  blueprint: {
    rePropertyCharacteristics: 7,
    reOwnershipTitle: 6,
    reValuation: 7,
    reContractsAgency: 10,
    rePractice: 6,
    reDisclosures: 5,
    reFinancing: 4,
    reMath: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 1901, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 52, weightLabel: "25% of the exam" },
    { setNumber: 2, id: 1902, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 40, weightLabel: "20% of the exam" },
    { setNumber: 3, id: 1903, name: "Practice, Disclosures & Financing", categories: ["rePractice", "reDisclosures", "reFinancing"], size: 60, weightLabel: "32% of the exam" },
    { setNumber: 4, id: 1904, name: "Valuation & Real Estate Math", categories: ["reValuation", "reMath"], size: 48, weightLabel: "23% of the exam" },
  ],
  categoryLabels: {
    rePropertyCharacteristics: "Property Characteristics, Descriptions & Use",
    reOwnershipTitle: "Ownership, Transfer & Title",
    reValuation: "Property Value & Appraisal",
    reContractsAgency: "Contracts & Agency",
    rePractice: "Real Estate Practice",
    reDisclosures: "Disclosures & Environmental Issues",
    reFinancing: "Financing & Settlement",
    reMath: "Real Estate Math",
  },
  copy: {
    guestPrompt: "to save your real estate exam progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets covering all eight national outline areas. Instant feedback, worked math, and missed questions come back until you master them.",
    testsHeading: "Practice tests \u00b7 50 questions weighted like the national exam",
    heroSubs: [
      "Eight areas, four tests. Contracts weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Add state law, then schedule.",
    ],
    sourceLine: "Weighted to the Pearson VUE national salesperson outline (2025), which matches PSI's. Your state portion is separate.",
    analyticsKey: "realestate",
  },
};

// State variants of real estate. Built by tools/build_re_state_banks.py from
// the reviewed CA and NJ weighted practice forms (2026-10-10 handoff): each
// item is the form's effective question for that state, national items with
// state overlays applied plus state-law items. One full-length test is the
// reviewed form itself; training sets regroup the same items by area.
// ID ranges sit above every other exam: CA 3901, NJ 3951.
const realestateCA: ExamConfig = {
  id: "realestate-ca",
  variantOf: "realestate",
  jurisdiction: { code: "CA", name: "California" },
  stateCode: "REALESTATE_CA",
  idBase: 3900,
  slug: "/real-estate/ca",
  landingPath: "/real-estate-practice-test",
  name: "California Real Estate Practice Test",
  shortName: "CA Real Estate",
  examLabel: "California Salesperson",
  fullName: "California real estate salesperson exam",
  questionIdPrefix: "RECA-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // The reviewed 150-item form, weighted to the DRE salesperson outline.
  blueprint: {
    rePropertyCharacteristics: 12,
    reOwnershipTitle: 15,
    reValuation: 20,
    reContractsAgency: 38,
    rePractice: 35,
    reDisclosures: 9,
    reFinancing: 15,
    reMath: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 3901, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 27, weightLabel: "18% of the practice exam" },
    { setNumber: 2, id: 3902, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 38, weightLabel: "25% of the practice exam" },
    { setNumber: 3, id: 3903, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 44, weightLabel: "29% of the practice exam" },
    { setNumber: 4, id: 3904, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 41, weightLabel: "27% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your California real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for California, including California law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions weighted to the DRE outline",
    heroSubs: [
      "National topics plus California rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your DRE exam.",
    ],
    sourceLine: "Source-checked practice weighted to the California DRE salesperson outline (checked Oct 2026). Not affiliated with the DRE; confirm rules in official DRE materials.",
    analyticsKey: "realestate",
  },
};

const realestateNJ: ExamConfig = {
  id: "realestate-nj",
  variantOf: "realestate",
  jurisdiction: { code: "NJ", name: "New Jersey" },
  stateCode: "REALESTATE_NJ",
  idBase: 3950,
  slug: "/real-estate/nj",
  landingPath: "/real-estate-practice-test",
  name: "New Jersey Real Estate Practice Test",
  shortName: "NJ Real Estate",
  examLabel: "New Jersey Salesperson",
  fullName: "New Jersey real estate salesperson exam",
  questionIdPrefix: "RENJ-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 110,
  passPct: 70,
  // The reviewed 110-item form: 80 general and 30 New Jersey items, per the
  // PSI candidate bulletin (updated Feb 2026).
  blueprint: {
    rePropertyCharacteristics: 8,
    reOwnershipTitle: 8,
    reValuation: 5,
    reContractsAgency: 30,
    rePractice: 32,
    reDisclosures: 6,
    reFinancing: 11,
    reMath: 10,
  },
  trainingSets: [
    { setNumber: 1, id: 3951, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 16, weightLabel: "15% of the practice exam" },
    { setNumber: 2, id: 3952, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 30, weightLabel: "27% of the practice exam" },
    { setNumber: 3, id: 3953, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 38, weightLabel: "35% of the practice exam" },
    { setNumber: 4, id: 3954, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 26, weightLabel: "24% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your New Jersey real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 110 source-checked questions for New Jersey, general and New Jersey law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 110 questions, 80 general and 30 New Jersey",
    heroSubs: [
      "General topics plus New Jersey rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI New Jersey salesperson outline (bulletin updated Feb 2026). Not affiliated with NJ REC or PSI; confirm rules in official materials.",
    analyticsKey: "realestate",
  },
};

// Texas, Florida and New York come from tools/build_state_variant.py:
// national items checked against state law (some excluded, some reworded)
// plus state-law items, one full-length test. TX 4001, FL 4051, NY 4101.
const realestateTX: ExamConfig = {
  id: "realestate-tx",
  variantOf: "realestate",
  jurisdiction: { code: "TX", name: "Texas" },
  stateCode: "REALESTATE_TX",
  idBase: 4000,
  slug: "/real-estate/tx",
  landingPath: "/real-estate-practice-test",
  name: "Texas Real Estate Practice Test",
  shortName: "TX Real Estate",
  examLabel: "Texas Sales Agent",
  fullName: "Texas real estate sales agent exam",
  questionIdPrefix: "RETX-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 120,
  passPct: 70,
  // 80 national and 40 Texas items, the scored counts in the Pearson VUE Texas
  // candidate handbook (Sept 2026; state outline effective Jan 1, 2026).
  blueprint: {
    rePropertyCharacteristics: 11,
    reOwnershipTitle: 13,
    reValuation: 11,
    reContractsAgency: 33,
    rePractice: 25,
    reDisclosures: 13,
    reFinancing: 7,
    reMath: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 4001, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 24, weightLabel: "20% of the practice exam" },
    { setNumber: 2, id: 4002, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 33, weightLabel: "28% of the practice exam" },
    { setNumber: 3, id: 4003, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 38, weightLabel: "32% of the practice exam" },
    { setNumber: 4, id: 4004, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 25, weightLabel: "21% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your Texas real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 120 source-checked questions for Texas, national and Texas law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 120 questions, 80 national and 40 Texas",
    heroSubs: [
      "National topics plus Texas rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes each part.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the Pearson VUE Texas outlines (national Mar 2025, state Jan 2026). Not affiliated with TREC or Pearson VUE; confirm rules in official TREC materials.",
    analyticsKey: "realestate",
  },
};

const realestateFL: ExamConfig = {
  id: "realestate-fl",
  variantOf: "realestate",
  jurisdiction: { code: "FL", name: "Florida" },
  stateCode: "REALESTATE_FL",
  idBase: 4050,
  slug: "/real-estate/fl",
  landingPath: "/real-estate-practice-test",
  name: "Florida Real Estate Practice Test",
  shortName: "FL Real Estate",
  examLabel: "Florida Sales Associate",
  fullName: "Florida real estate sales associate exam",
  questionIdPrefix: "REFL-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 100,
  passPct: 75,
  // 100 items like the real exam: 52 principles and 48 Florida law items,
  // mapped from the 19 areas in the DBPR candidate booklet (Jan 2025).
  blueprint: {
    rePropertyCharacteristics: 11,
    reOwnershipTitle: 14,
    reValuation: 10,
    reContractsAgency: 16,
    rePractice: 22,
    reDisclosures: 6,
    reFinancing: 12,
    reMath: 9,
  },
  trainingSets: [
    { setNumber: 1, id: 4051, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 25, weightLabel: "25% of the practice exam" },
    { setNumber: 2, id: 4052, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 16, weightLabel: "16% of the practice exam" },
    { setNumber: 3, id: 4053, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 28, weightLabel: "28% of the practice exam" },
    { setNumber: 4, id: 4054, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 31, weightLabel: "31% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your Florida real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 100 source-checked questions for Florida, including Chapter 475 and FREC rules. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 100 questions weighted to the DBPR outline",
    heroSubs: [
      "Principles plus Florida law and math.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 75% passes.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the DBPR sales associate outline (candidate booklet Jan 2025). Not affiliated with DBPR, FREC or Pearson VUE; confirm rules in official materials.",
    analyticsKey: "realestate",
  },
};

const realestateNY: ExamConfig = {
  id: "realestate-ny",
  variantOf: "realestate",
  jurisdiction: { code: "NY", name: "New York" },
  stateCode: "REALESTATE_NY",
  idBase: 4100,
  slug: "/real-estate/ny",
  landingPath: "/real-estate-practice-test",
  name: "New York Real Estate Practice Test",
  shortName: "NY Real Estate",
  examLabel: "New York Salesperson",
  fullName: "New York real estate salesperson exam",
  questionIdPrefix: "RENY-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 75,
  passPct: 70,
  // 75 items weighted by the hours of the DOS 77-hour qualifying course (19
  // NYCRR 176.3, eff. Dec 2022). DOS does not publish the count or pass mark;
  // 75 and 70% are the figures course providers report.
  blueprint: {
    rePropertyCharacteristics: 6,
    reOwnershipTitle: 11,
    reValuation: 6,
    reContractsAgency: 14,
    rePractice: 15,
    reDisclosures: 11,
    reFinancing: 7,
    reMath: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 4101, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 17, weightLabel: "23% of the practice exam" },
    { setNumber: 2, id: 4102, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 14, weightLabel: "19% of the practice exam" },
    { setNumber: 3, id: 4103, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 26, weightLabel: "35% of the practice exam" },
    { setNumber: 4, id: 4104, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 18, weightLabel: "24% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your New York real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 75 source-checked questions for New York, including license law, agency disclosure and the Human Rights Law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 75 questions weighted to the 77-hour course",
    heroSubs: [
      "National topics plus New York rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. Aim for 70%.",
      "All done. Go schedule your DOS exam.",
    ],
    sourceLine: "Source-checked practice weighted to the NY DOS 77-hour salesperson course. Not affiliated with NY DOS; confirm rules in official DOS materials.",
    analyticsKey: "realestate",
  },
};

const insurance: ExamConfig = {
  id: "insurance",
  stateCode: "LIFEHEALTH",
  idBase: 2000,
  slug: "/life-health-insurance",
  landingPath: "/life-health-insurance-practice-test",
  name: "Life & Health Insurance Practice Test",
  shortName: "Insurance",
  examLabel: "Life & Health Exam",
  fullName: "life and health insurance license exam (general portion)",
  questionIdPrefix: "LH-",
  icon: "umbrella",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // General (non-state) portion of the life, accident and health producer
  // exams (Pearson VUE, PSI, Prometric) built on the NAIC model and the
  // standard prelicensing texts. Typical combined exam: 150 scored items,
  // 70% to pass. Federal and general content only; state rules never tested.
  blueprint: {
    insuranceRegulation: 4,
    generalInsurance: 5,
    lifeBasics: 5,
    lifePolicyTypes: 6,
    lifeProvisions: 8,
    annuitiesRetirement: 5,
    healthBasics: 5,
    healthProvisions: 5,
    healthPolicyTypes: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 2001, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 36, weightLabel: "18% of the exam" },
    { setNumber: 2, id: 2002, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 76, weightLabel: "38% of the exam" },
    { setNumber: 3, id: 2003, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 40, weightLabel: "20% of the exam" },
    { setNumber: 4, id: 2004, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 48, weightLabel: "24% of the exam" },
  ],
  categoryLabels: {
    insuranceRegulation: "Insurance Regulation",
    generalInsurance: "General Insurance Concepts",
    lifeBasics: "Life Insurance Basics",
    lifePolicyTypes: "Life Policy Types",
    lifeProvisions: "Life Policy Provisions, Options & Riders",
    annuitiesRetirement: "Annuities, Taxation & Retirement",
    healthBasics: "Health Insurance Basics",
    healthProvisions: "Health Policy Provisions",
    healthPolicyTypes: "Health Policy Types",
  },
  copy: {
    guestPrompt: "to save your insurance exam progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets covering the general portion of the life and health exam. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Practice tests \u00b7 50 questions weighted like the general portion",
    heroSubs: [
      "Nine areas, four tests. Life policies weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Add state law, then schedule.",
    ],
    sourceLine: "General portion only, on the NAIC model and standard prelicensing texts. Your state portion is separate.",
    analyticsKey: "insurance",
  },
};

const notary: ExamConfig = {
  id: "notary",
  stateCode: "NOTARY",
  idBase: 2100,
  slug: "/notary",
  landingPath: "/notary-practice-test",
  name: "Notary Practice Test",
  shortName: "Notary",
  examLabel: "Notary Exam",
  fullName: "notary public exam",
  questionIdPrefix: "NP-",
  icon: "stamp",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // General notary law and practice shared by the states that test notaries
  // (Model Notary Act, RULONA, NNA code). Acts, identification, journal and
  // seal, ethics, commission and liability. State-specific numbers are never
  // tested; explanations say "varies by state".
  blueprint: {
    notarialActs: 14,
    signerIdentification: 10,
    journalSealRecords: 10,
    ethicsProhibitedActs: 10,
    commissionLiability: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 2101, name: "Notarial Acts & Certificates", categories: ["notarialActs"], size: 56, weightLabel: "28% of the tests" },
    { setNumber: 2, id: 2102, name: "Identification & Signers", categories: ["signerIdentification"], size: 40, weightLabel: "20% of the tests" },
    { setNumber: 3, id: 2103, name: "Journal, Seal & Records", categories: ["journalSealRecords"], size: 40, weightLabel: "20% of the tests" },
    { setNumber: 4, id: 2104, name: "Ethics, Commission & Liability", categories: ["ethicsProhibitedActs", "commissionLiability"], size: 64, weightLabel: "32% of the tests" },
  ],
  categoryLabels: {
    notarialActs: "Notarial Acts & Certificates",
    signerIdentification: "Identification & Signers",
    journalSealRecords: "Journal, Seal & Records",
    ethicsProhibitedActs: "Ethics & Prohibited Acts",
    commissionLiability: "Commission & Liability",
  },
  copy: {
    guestPrompt: "to save your notary exam progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four practice sets on notarial procedures and responsibilities. State laws and exam requirements vary; use official materials for your state.",
    testsHeading: "Practice tests \u00b7 50 questions on general notary law",
    heroSubs: [
      "Five topics, four tests. Acts and ID weigh most.",
      "Master each set. Check your state's handbook too.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake. Aim for 80%.",
      "All done. Check your state's commission rules.",
    ],
    sourceLine: "Practice draws on model notary concepts. Model laws are not a substitute for your state’s enacted rules, official handbook or exam requirements.",
    analyticsKey: "notary",
  },
};


const foodhandler: ExamConfig = {
  id: "foodhandler",
  stateCode: "FOODHANDLER",
  idBase: 2500,
  slug: "/food-handler",
  landingPath: "/food-handler-practice-test",
  name: "Food Handler Practice Test",
  shortName: "Food Handler",
  examLabel: "Food Handler Card",
  fullName: "food handler certificate exam",
  questionIdPrefix: "FH-",
  icon: "chef",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // Food handler card (ANAB-accredited courses on the FDA Food Code): basics 20%,
  // personal hygiene 20%, contamination and allergens 20%, time and temperature 24%,
  // cleaning and sanitizing 16%. Real tests are 40 questions, 75% to pass.
  blueprint: {
    fhBasics: 10,
    fhHygiene: 10,
    fhContamination: 10,
    fhTimeTemp: 12,
    fhCleaning: 8,
  },
  trainingSets: [
    { setNumber: 1, id: 2501, name: "Food Safety Basics & Personal Hygiene", categories: ["fhBasics", "fhHygiene"], size: 80, weightLabel: "40% of the tests" },
    { setNumber: 2, id: 2502, name: "Contamination & Allergens", categories: ["fhContamination"], size: 40, weightLabel: "20% of the tests" },
    { setNumber: 3, id: 2503, name: "Time & Temperature Control", categories: ["fhTimeTemp"], size: 48, weightLabel: "24% of the tests" },
    { setNumber: 4, id: 2504, name: "Cleaning, Sanitizing & Pests", categories: ["fhCleaning"], size: 32, weightLabel: "16% of the tests" },
  ],
  categoryLabels: {
    fhBasics: "Food Safety Basics",
    fhHygiene: "Personal Hygiene",
    fhContamination: "Contamination & Allergens",
    fhTimeTemp: "Time & Temperature",
    fhCleaning: "Cleaning & Sanitizing",
  },
  copy: {
    guestPrompt: "to save your food handler progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four practice sets on food safety, hygiene, contamination, temperatures and cleaning. Use your accepted provider’s materials for the actual course and test.",
    testsHeading: "Practice tests · 50 supplemental questions",
    heroSubs: [
      "Five topics, four tests. Temperature weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Get your local food handler card.",
    ],
    sourceLine: "Based on the FDA Food Code as taught in ANAB-accredited food handler courses. Card requirements vary by state and county.",
    analyticsKey: "foodhandler",
  },
};

const boating: ExamConfig = {
  id: "boating",
  stateCode: "BOATING",
  idBase: 2600,
  slug: "/boating",
  landingPath: "/boating-license-practice-test",
  name: "Boating License Practice Test",
  shortName: "Boating",
  examLabel: "Boater Safety",
  fullName: "boating safety certificate exam",
  questionIdPrefix: "BOAT-",
  icon: "sailboat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Boating safety certificate (NASBLA standards, state-approved courses): basics 16%,
  // required equipment 20%, navigation rules 24%, safe operation 24%, emergencies 16%.
  // State exams are usually 50 to 75 questions, 80% to pass.
  blueprint: {
    boatBasics: 8,
    boatEquipment: 10,
    boatNavigation: 12,
    boatOperation: 12,
    boatEmergencies: 8,
  },
  trainingSets: [
    { setNumber: 1, id: 2601, name: "Boat Basics & Trailering", categories: ["boatBasics"], size: 32, weightLabel: "16% of the tests" },
    { setNumber: 2, id: 2602, name: "Required Equipment", categories: ["boatEquipment"], size: 40, weightLabel: "20% of the tests" },
    { setNumber: 3, id: 2603, name: "Navigation Rules & Buoys", categories: ["boatNavigation"], size: 48, weightLabel: "24% of the tests" },
    { setNumber: 4, id: 2604, name: "Safe Operation", categories: ["boatOperation"], size: 48, weightLabel: "24% of the tests" },
    { setNumber: 5, id: 2605, name: "Emergencies", categories: ["boatEmergencies"], size: 32, weightLabel: "16% of the tests" },
  ],
  categoryLabels: {
    boatBasics: "Boat Basics",
    boatEquipment: "Required Equipment",
    boatNavigation: "Navigation Rules",
    boatOperation: "Safe Operation",
    boatEmergencies: "Emergencies",
  },
  copy: {
    guestPrompt: "to save your boating progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets covering the boater education standards: boat basics, required equipment, navigation rules and buoys, safe operation, emergencies. Missed questions come back until you master them.",
    testsHeading: "Practice tests \u00b7 50 questions in the state exam's proportions",
    heroSubs: [
      "Five topics, four tests. Navigation weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Get your state boater card.",
    ],
    sourceLine: "Based on the NASBLA boater education standards and U.S. Coast Guard rules. Operator age and education requirements vary by state.",
    analyticsKey: "boating",
  },
};

const hunter: ExamConfig = {
  id: "hunter",
  stateCode: "HUNTER",
  idBase: 2700,
  slug: "/hunter-safety",
  landingPath: "/hunter-safety-practice-test",
  name: "Hunter Safety Practice Test",
  shortName: "Hunter Safety",
  examLabel: "Hunter Education",
  fullName: "hunter education certification exam",
  questionIdPrefix: "HS-",
  icon: "target",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Hunter education (IHEA-USA standards, state courses): firearm safety 30%, firearms
  // and ammunition 16%, techniques and game care 16%, wildlife and conservation 16%,
  // ethics and laws 12%, survival and first aid 10%. State exams ~50 questions, 80% to pass.
  blueprint: {
    hsFirearmSafety: 15,
    hsFirearmsAmmo: 8,
    hsTechniques: 8,
    hsWildlife: 8,
    hsEthicsLaws: 6,
    hsSurvival: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 2701, name: "Firearm Safety", categories: ["hsFirearmSafety"], size: 60, weightLabel: "30% of the tests" },
    { setNumber: 2, id: 2702, name: "Firearms, Ammunition & Archery", categories: ["hsFirearmsAmmo"], size: 32, weightLabel: "16% of the tests" },
    { setNumber: 3, id: 2703, name: "Hunting Techniques & Game Care", categories: ["hsTechniques"], size: 32, weightLabel: "16% of the tests" },
    { setNumber: 4, id: 2704, name: "Wildlife ID & Conservation", categories: ["hsWildlife"], size: 32, weightLabel: "16% of the tests" },
    { setNumber: 5, id: 2705, name: "Ethics, Laws & Survival", categories: ["hsEthicsLaws", "hsSurvival"], size: 44, weightLabel: "22% of the tests" },
  ],
  categoryLabels: {
    hsFirearmSafety: "Firearm Safety",
    hsFirearmsAmmo: "Firearms & Ammunition",
    hsTechniques: "Hunting Techniques",
    hsWildlife: "Wildlife & Conservation",
    hsEthicsLaws: "Ethics & Laws",
    hsSurvival: "Survival & First Aid",
  },
  copy: {
    guestPrompt: "to save your hunter safety progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets covering the hunter education standards: firearm safety, firearms and ammunition, techniques and game care, wildlife and conservation, ethics, laws and survival. Missed questions come back until you master them.",
    testsHeading: "Practice tests \u00b7 50 questions in the state exam's proportions",
    heroSubs: [
      "Six topics, four tests. Firearm safety weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Take your state's hunter ed exam.",
    ],
    sourceLine: "Based on the IHEA-USA hunter education standards. Seasons, bag limits, blaze orange rules and minimum ages vary by state.",
    analyticsKey: "hunter",
  },
};

const cpr: ExamConfig = {
  id: "cpr",
  stateCode: "CPR",
  idBase: 3100,
  slug: "/cpr",
  landingPath: "/cpr-practice-test",
  name: "CPR Practice Test",
  shortName: "CPR",
  examLabel: "CPR, AED & First Aid",
  fullName: "CPR, AED and first aid certification exam",
  questionIdPrefix: "CPR-",
  icon: "bandage",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 84,
  // CPR/AED/first aid written exams (AHA and Red Cross style courses): basics and
  // chain of survival 16%, adult CPR and AED 24%, child and infant CPR 20%, choking
  // and breathing emergencies 12%, first aid 28%. Most provider exams pass at 84%.
  blueprint: {
    cprBasics: 8,
    cprAdult: 12,
    cprChildInfant: 10,
    cprChoking: 6,
    cprFirstAid: 14,
  },
  trainingSets: [
    { setNumber: 1, id: 3101, name: "Basics, Chain of Survival & Choking", categories: ["cprBasics", "cprChoking"], size: 56, weightLabel: "28% of the tests" },
    { setNumber: 2, id: 3102, name: "Adult CPR & AED", categories: ["cprAdult"], size: 48, weightLabel: "24% of the tests" },
    { setNumber: 3, id: 3103, name: "Child & Infant CPR", categories: ["cprChildInfant"], size: 40, weightLabel: "20% of the tests" },
    { setNumber: 4, id: 3104, name: "First Aid", categories: ["cprFirstAid"], size: 56, weightLabel: "28% of the tests" },
  ],
  categoryLabels: {
    cprBasics: "Basics & Chain of Survival",
    cprAdult: "Adult CPR & AED",
    cprChildInfant: "Child & Infant CPR",
    cprChoking: "Choking & Breathing Emergencies",
    cprFirstAid: "First Aid",
  },
  copy: {
    guestPrompt: "to save your CPR progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets covering the CPR, AED and first aid written exam: basics and choking, adult CPR and AED, child and infant CPR, first aid. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the course exam's proportions",
    heroSubs: [
      "Five topics, four tests. First aid weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your skills session.",
    ],
    sourceLine: "Based on the current AHA and ILCOR resuscitation guidelines and first aid consensus. Works for lay rescuer and healthcare BLS courses from any provider.",
    analyticsKey: "cpr",
  },
};

const osha: ExamConfig = {
  id: "osha",
  stateCode: "OSHA",
  idBase: 3200,
  slug: "/osha-10",
  landingPath: "/osha-10-practice-test",
  name: "OSHA 10 Practice Test",
  shortName: "OSHA 10",
  examLabel: "OSHA 10-Hour",
  fullName: "OSHA 10-hour Outreach training exam",
  questionIdPrefix: "OSHA-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // OSHA 10-hour Outreach (construction and general industry): intro to OSHA and
  // worker rights 16%, fall protection 18%, electrical 14%, struck-by and caught-in
  // 14%, hazard communication and PPE 20%, health hazards, tools and fire 18%.
  // Course finals are typically 70% with up to three attempts.
  blueprint: {
    oshaIntro: 8,
    oshaFalls: 9,
    oshaElectrical: 7,
    oshaStruckCaught: 7,
    oshaHazcom: 10,
    oshaHealth: 9,
  },
  trainingSets: [
    { setNumber: 1, id: 3201, name: "Intro to OSHA & Worker Rights", categories: ["oshaIntro"], size: 32, weightLabel: "16% of the tests" },
    { setNumber: 2, id: 3202, name: "Fall Protection", categories: ["oshaFalls"], size: 36, weightLabel: "18% of the tests" },
    { setNumber: 3, id: 3203, name: "Electrical, Struck-By & Caught-In", categories: ["oshaElectrical", "oshaStruckCaught"], size: 56, weightLabel: "28% of the tests" },
    { setNumber: 4, id: 3204, name: "Hazard Communication & PPE", categories: ["oshaHazcom"], size: 40, weightLabel: "20% of the tests" },
    { setNumber: 5, id: 3205, name: "Health Hazards, Tools & Fire Safety", categories: ["oshaHealth"], size: 36, weightLabel: "18% of the tests" },
  ],
  categoryLabels: {
    oshaIntro: "Intro to OSHA & Worker Rights",
    oshaFalls: "Fall Protection",
    oshaElectrical: "Electrical Safety",
    oshaStruckCaught: "Struck-By & Caught-In",
    oshaHazcom: "HazCom & PPE",
    oshaHealth: "Health Hazards, Tools & Fire",
  },
  copy: {
    guestPrompt: "to save your OSHA 10 progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets covering the OSHA 10 modules: worker rights, fall protection, the rest of the Focus Four, hazard communication and PPE, health hazards, tools and fire. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the course exam's proportions",
    heroSubs: [
      "Six topics, four tests. Focus Four weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Finish your course and get your card.",
    ],
    sourceLine: "Based on the OSHA Outreach Training Program topics and 29 CFR 1926 and 1910. Not an official OSHA course; cards come only from authorized trainers.",
    analyticsKey: "osha",
  },
};

const forklift: ExamConfig = {
  id: "forklift",
  stateCode: "FORKLIFT",
  idBase: 3300,
  slug: "/forklift",
  landingPath: "/forklift-certification-practice-test",
  name: "Forklift Certification Practice Test",
  shortName: "Forklift",
  examLabel: "Forklift Operator",
  fullName: "forklift operator certification exam",
  questionIdPrefix: "FORK-",
  icon: "forklift",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // Forklift operator written evaluation (OSHA 1910.178 training content): basics
  // and rules 20%, stability and load capacity 24%, inspection, fueling and charging
  // 16%, safe operation and pedestrians 24%, load handling, docks and ramps 16%.
  // Employer tests commonly pass at 75 to 80%.
  blueprint: {
    forkBasics: 10,
    forkStability: 12,
    forkInspection: 8,
    forkOperation: 12,
    forkLoads: 8,
  },
  trainingSets: [
    { setNumber: 1, id: 3301, name: "Basics, Rules & Inspection", categories: ["forkBasics", "forkInspection"], size: 72, weightLabel: "36% of the tests" },
    { setNumber: 2, id: 3302, name: "Stability & Load Capacity", categories: ["forkStability"], size: 48, weightLabel: "24% of the tests" },
    { setNumber: 3, id: 3303, name: "Safe Operation", categories: ["forkOperation"], size: 48, weightLabel: "24% of the tests" },
    { setNumber: 4, id: 3304, name: "Load Handling, Docks & Ramps", categories: ["forkLoads"], size: 32, weightLabel: "16% of the tests" },
  ],
  categoryLabels: {
    forkBasics: "Forklift Basics & OSHA Rules",
    forkStability: "Stability & Load Capacity",
    forkInspection: "Inspection, Fueling & Charging",
    forkOperation: "Safe Operation & Pedestrians",
    forkLoads: "Load Handling, Docks & Ramps",
  },
  copy: {
    guestPrompt: "to save your forklift progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets covering the forklift operator written test: basics, rules and inspection, stability and load capacity, safe operation, load handling. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the operator test's proportions",
    heroSubs: [
      "Five topics, four tests. Stability weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Take your employer's evaluation.",
    ],
    sourceLine: "Based on OSHA 29 CFR 1910.178 and ANSI/ITSDF B56.1 operator training content. Certification comes from your employer's training and evaluation.",
    analyticsKey: "forklift",
  },
};

const alcohol: ExamConfig = {
  id: "alcohol",
  stateCode: "ALCOHOL",
  idBase: 3400,
  slug: "/alcohol-server",
  landingPath: "/alcohol-server-practice-test",
  name: "Alcohol Server Practice Test",
  shortName: "Alcohol Server",
  examLabel: "Alcohol Server Certification",
  fullName: "alcohol server and seller certification exam",
  questionIdPrefix: "ALC-",
  icon: "wine",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Responsible beverage service exams (state RBS, TABC, TIPS-style courses): alcohol
  // and the body 22%, recognizing intoxication 20%, checking IDs 20%, intervention
  // 20%, laws and liability 18%. Most pass at 70 to 80%.
  blueprint: {
    alcEffects: 11,
    alcIntoxication: 10,
    alcChecking: 10,
    alcIntervention: 10,
    alcLaw: 9,
  },
  trainingSets: [
    { setNumber: 1, id: 3401, name: "Alcohol & the Body", categories: ["alcEffects"], size: 44, weightLabel: "22% of the tests" },
    { setNumber: 2, id: 3402, name: "Recognizing Intoxication & Intervening", categories: ["alcIntoxication", "alcIntervention"], size: 80, weightLabel: "40% of the tests" },
    { setNumber: 3, id: 3403, name: "Checking IDs & Minors", categories: ["alcChecking"], size: 40, weightLabel: "20% of the tests" },
    { setNumber: 4, id: 3404, name: "Laws & Liability", categories: ["alcLaw"], size: 36, weightLabel: "18% of the tests" },
  ],
  categoryLabels: {
    alcEffects: "Alcohol & the Body",
    alcIntoxication: "Recognizing Intoxication",
    alcChecking: "Checking IDs & Minors",
    alcIntervention: "Intervention & Refusing Service",
    alcLaw: "Laws & Liability",
  },
  copy: {
    guestPrompt: "to save your alcohol server progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four practice sets on alcohol effects, intoxication, identification, intervention and service responsibilities. Use the materials required by your jurisdiction or exam provider.",
    testsHeading: "Practice tests · 50 supplemental questions",
    heroSubs: [
      "Five topics, four tests. Intervention weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Finish your required training.",
    ],
    sourceLine: "Based on responsible beverage service curricula used nationwide. Permit requirements, hours of sale and penalties vary by state.",
    analyticsKey: "alcohol",
  },
};


const security: ExamConfig = {
  id: "security",
  stateCode: "SECGUARD",
  idBase: 3600,
  slug: "/security-guard",
  landingPath: "/security-guard-practice-test",
  name: "Security Guard Practice Test",
  shortName: "Security Guard",
  examLabel: "Security Guard License",
  fullName: "unarmed security guard license exam",
  questionIdPrefix: "SG-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Unarmed guard pre-assignment training exams: role and professionalism 16%,
  // legal powers and limits 22%, observation, patrol and access control 20%,
  // report writing 16%, emergency response 18%, safety and terrorism awareness 8%.
  // State exams usually pass at 70%.
  blueprint: {
    sgRole: 8,
    sgLegal: 11,
    sgObservation: 10,
    sgReports: 8,
    sgEmergency: 9,
    sgSafety: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 3601, name: "Role, Ethics & Legal Powers", categories: ["sgRole", "sgLegal"], size: 76, weightLabel: "38% of the tests" },
    { setNumber: 2, id: 3602, name: "Observation, Patrol & Access Control", categories: ["sgObservation"], size: 40, weightLabel: "20% of the tests" },
    { setNumber: 3, id: 3603, name: "Report Writing & Communication", categories: ["sgReports"], size: 32, weightLabel: "16% of the tests" },
    { setNumber: 4, id: 3604, name: "Emergencies, Safety & Terrorism Awareness", categories: ["sgEmergency", "sgSafety"], size: 52, weightLabel: "26% of the tests" },
  ],
  categoryLabels: {
    sgRole: "Role & Professionalism",
    sgLegal: "Legal Powers & Limits",
    sgObservation: "Observation, Patrol & Access Control",
    sgReports: "Report Writing & Communication",
    sgEmergency: "Emergency Response",
    sgSafety: "Safety & Terrorism Awareness",
  },
  copy: {
    guestPrompt: "to save your security guard progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets covering the guard license exam: role, ethics and legal powers, observation and access control, report writing, emergencies and terrorism awareness. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the state exam's proportions",
    heroSubs: [
      "Six topics, four tests. Legal powers weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Finish training and book your exam.",
    ],
    sourceLine: "Based on the unarmed guard training topics common to every state program. Training hours, arrest powers and licensing rules vary by state.",
    analyticsKey: "security",
  },
};

const lifeguard: ExamConfig = {
  id: "lifeguard",
  stateCode: "LIFEGUARD",
  idBase: 3700,
  slug: "/lifeguard",
  landingPath: "/lifeguard-practice-test",
  name: "Lifeguard Practice Test",
  shortName: "Lifeguard",
  examLabel: "Lifeguard Certification",
  fullName: "lifeguard certification written exam",
  questionIdPrefix: "LG-",
  icon: "lifebuoy",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Lifeguard certification written exams: professional lifeguard and surveillance
  // 20%, recognizing drowning and distress 16%, water rescue and spinal injury 24%,
  // first aid, CPR and AED 24%, facility safety and legal 16%. Most pass at 80%.
  blueprint: {
    lgProfessional: 10,
    lgRecognition: 8,
    lgRescue: 12,
    lgCare: 12,
    lgFacility: 8,
  },
  trainingSets: [
    { setNumber: 1, id: 3701, name: "Surveillance & Victim Recognition", categories: ["lgProfessional", "lgRecognition"], size: 72, weightLabel: "36% of the tests" },
    { setNumber: 2, id: 3702, name: "Water Rescue Skills", categories: ["lgRescue"], size: 48, weightLabel: "24% of the tests" },
    { setNumber: 3, id: 3703, name: "First Aid, CPR & AED", categories: ["lgCare"], size: 48, weightLabel: "24% of the tests" },
    { setNumber: 4, id: 3704, name: "Facility Safety & Legal", categories: ["lgFacility"], size: 32, weightLabel: "16% of the tests" },
  ],
  categoryLabels: {
    lgProfessional: "Professional Lifeguard & Surveillance",
    lgRecognition: "Recognizing Drowning & Distress",
    lgRescue: "Water Rescue & Spinal Injury",
    lgCare: "First Aid, CPR & AED",
    lgFacility: "Facility Safety & Legal",
  },
  copy: {
    guestPrompt: "to save your lifeguard progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets covering the lifeguard written exam: surveillance and victim recognition, water rescue skills, first aid, CPR and AED, facility safety and legal duties. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the course exam's proportions",
    heroSubs: [
      "Five topics, four tests. Rescue and care weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Pass your in-water skills.",
    ],
    sourceLine: "Based on lifeguard certification course content used nationwide and current resuscitation guidelines. The swim prerequisites and skills test are separate.",
    analyticsKey: "lifeguard",
  },
};

const pnc: ExamConfig = {
  id: "pnc",
  stateCode: "PNC",
  idBase: 3800,
  slug: "/property-casualty-insurance",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "Property & Casualty Insurance Practice Test",
  shortName: "P&C Insurance",
  examLabel: "Property & Casualty",
  fullName: "property and casualty insurance license exam",
  questionIdPrefix: "PC-",
  icon: "building",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Property and casualty producer exam, general portion (Pearson VUE, PSI and
  // Prometric outlines): insurance basics and underwriting 14%, policy provisions
  // 14%, dwelling and homeowners 18%, personal auto 18%, commercial property and
  // BOP 16%, commercial liability and workers comp 12%, flood, surety and other 8%.
  // Most states pass at 70%.
  blueprint: {
    pcGeneral: 7,
    pcPolicy: 7,
    pcHomeowners: 9,
    pcAuto: 9,
    pcCommercial: 8,
    pcLiability: 6,
    pcOther: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 3801, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 56, weightLabel: "28% of the tests" },
    { setNumber: 2, id: 3802, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 36, weightLabel: "18% of the tests" },
    { setNumber: 3, id: 3803, name: "Personal Auto", categories: ["pcAuto"], size: 36, weightLabel: "18% of the tests" },
    { setNumber: 4, id: 3804, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 72, weightLabel: "36% of the tests" },
  ],
  categoryLabels: {
    pcGeneral: "Insurance Basics & Underwriting",
    pcPolicy: "Policy Provisions & Conditions",
    pcHomeowners: "Dwelling & Homeowners",
    pcAuto: "Personal Auto",
    pcCommercial: "Commercial Property & BOP",
    pcLiability: "Commercial Liability & Workers Comp",
    pcOther: "Flood, Surety & Other Coverages",
  },
  copy: {
    guestPrompt: "to save your P&C progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets covering the general portion of the P&C exam: basics and policy provisions, dwelling and homeowners, personal auto, commercial lines and other coverages. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the exam outline's proportions",
    heroSubs: [
      "Seven topics, four tests. Home and auto weigh most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Add state law, then schedule.",
    ],
    sourceLine: "Based on the general (national) portion of the property and casualty producer exam outlines. State laws and the state portion are not covered.",
    analyticsKey: "pnc",
  },
};

const htl: ExamConfig = {
  id: "htl",
  stateCode: "HTL",
  idBase: 200,
  slug: "/htl",
  landingPath: "/htl-practice-test",
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
      "Five areas, four tests, weighted like ASCP.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your ASCP exam window.",
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
  landingPath: "/cst-practice-test",
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
      "Three domains, four tests. Intraop weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Schedule your CST exam.",
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
  landingPath: "/crcst-practice-test",
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
      "Seven sections, four tests. Sterilization weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Schedule your CRCST exam.",
    ],
    sourceLine: "Weighted to the HSPA CRCST exam content outline (rev. Nov 2023). Also covers the CBSPD CSPDT.",
    analyticsKey: "crcst",
  },
};

// Life & Health and P&C state variants, built by tools/build_state_variant.py
// like the TX, FL and NY real estate ones. ID blocks: L&H TX 4150, FL 4200,
// CA 4250; P&C TX 4300, FL 4350, CA 4400.
const insuranceTX: ExamConfig = {
  id: "insurance-tx",
  variantOf: "insurance",
  jurisdiction: { code: "TX", name: "Texas" },
  stateCode: "LIFEHEALTH_TX",
  idBase: 4150,
  slug: "/life-health-insurance/tx",
  landingPath: "/life-health-insurance-practice-test",
  name: "Texas Life & Health Insurance Practice Test",
  shortName: "TX L&H Insurance",
  examLabel: "Texas Life, Accident & Health",
  fullName: "Texas life and health insurance license exam",
  questionIdPrefix: "LHTX-",
  icon: "umbrella",
  testCount: 1,
  questionsPerTest: 130,
  passPct: 70,
  // 100 general and 30 Texas items, the scored counts in the Pearson VUE
  // Texas content outline (#124401, effective Sept 1, 2026).
  blueprint: {
    insuranceRegulation: 23,
    generalInsurance: 9,
    lifeBasics: 7,
    lifePolicyTypes: 10,
    lifeProvisions: 17,
    annuitiesRetirement: 8,
    healthBasics: 16,
    healthProvisions: 17,
    healthPolicyTypes: 23,
  },
  trainingSets: [
    { setNumber: 1, id: 4151, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 32, weightLabel: "25% of the practice exam" },
    { setNumber: 2, id: 4152, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 34, weightLabel: "26% of the practice exam" },
    { setNumber: 3, id: 4153, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 24, weightLabel: "18% of the practice exam" },
    { setNumber: 4, id: 4154, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 40, weightLabel: "31% of the practice exam" },
  ],
  categoryLabels: insurance.categoryLabels,
  copy: {
    guestPrompt: "to save your Texas life & health progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 130 source-checked questions for Texas, general topics and Texas law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 130 questions, 100 general and 30 Texas",
    heroSubs: [
      "General topics plus Texas rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the Pearson VUE Texas life, accident and health outline (Sept 2026). Not affiliated with TDI or Pearson VUE; confirm rules in official TDI materials.",
    analyticsKey: "insurance",
  },
};

const insuranceFL: ExamConfig = {
  id: "insurance-fl",
  variantOf: "insurance",
  jurisdiction: { code: "FL", name: "Florida" },
  stateCode: "LIFEHEALTH_FL",
  idBase: 4200,
  slug: "/life-health-insurance/fl",
  landingPath: "/life-health-insurance-practice-test",
  name: "Florida Life & Health Insurance Practice Test",
  shortName: "FL L&H Insurance",
  examLabel: "Florida 2-15 Life, Health & Annuity",
  fullName: "Florida life and health insurance license exam",
  questionIdPrefix: "LHFL-",
  icon: "umbrella",
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // 150 items like the real 2-15 exam: 100 general knowledge and 50 Florida
  // law, weighted to the Pearson VUE Florida outline (effective Jan 1, 2026).
  blueprint: {
    insuranceRegulation: 22,
    generalInsurance: 13,
    lifeBasics: 11,
    lifePolicyTypes: 11,
    lifeProvisions: 21,
    annuitiesRetirement: 11,
    healthBasics: 16,
    healthProvisions: 23,
    healthPolicyTypes: 22,
  },
  trainingSets: [
    { setNumber: 1, id: 4201, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 35, weightLabel: "23% of the practice exam" },
    { setNumber: 2, id: 4202, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 43, weightLabel: "29% of the practice exam" },
    { setNumber: 3, id: 4203, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 27, weightLabel: "18% of the practice exam" },
    { setNumber: 4, id: 4204, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 45, weightLabel: "30% of the practice exam" },
  ],
  categoryLabels: insurance.categoryLabels,
  copy: {
    guestPrompt: "to save your Florida life & health progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for Florida, general topics and Florida law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions weighted to the 2-15 outline",
    heroSubs: [
      "General topics plus Florida law.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the Pearson VUE Florida 2-15 outline (Jan 2026). Not affiliated with Florida DFS or Pearson VUE; confirm rules in official DFS materials.",
    analyticsKey: "insurance",
  },
};

const insuranceCA: ExamConfig = {
  id: "insurance-ca",
  variantOf: "insurance",
  jurisdiction: { code: "CA", name: "California" },
  stateCode: "LIFEHEALTH_CA",
  idBase: 4250,
  slug: "/life-health-insurance/ca",
  landingPath: "/life-health-insurance-practice-test",
  name: "California Life & Health Insurance Practice Test",
  shortName: "CA L&H Insurance",
  examLabel: "California Life, Accident & Health",
  fullName: "California life and health insurance license exam",
  questionIdPrefix: "LHCA-",
  icon: "umbrella",
  testCount: 1,
  questionsPerTest: 150,
  passPct: 60,
  // 150 items like CDI's combined Life and Accident & Health exam (75 + 75),
  // weighted by the 2025 CDI examination objectives. PSI passes at 60%.
  blueprint: {
    insuranceRegulation: 14,
    generalInsurance: 26,
    lifeBasics: 12,
    lifePolicyTypes: 12,
    lifeProvisions: 18,
    annuitiesRetirement: 11,
    healthBasics: 12,
    healthProvisions: 22,
    healthPolicyTypes: 23,
  },
  trainingSets: [
    { setNumber: 1, id: 4251, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 40, weightLabel: "27% of the practice exam" },
    { setNumber: 2, id: 4252, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 42, weightLabel: "28% of the practice exam" },
    { setNumber: 3, id: 4253, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 23, weightLabel: "15% of the practice exam" },
    { setNumber: 4, id: 4254, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 45, weightLabel: "30% of the practice exam" },
  ],
  categoryLabels: insurance.categoryLabels,
  copy: {
    guestPrompt: "to save your California life & health progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for California, general topics and California law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions like the combined CDI exam",
    heroSubs: [
      "General topics plus California law.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 60% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice weighted to the 2025 CDI life and accident and health objectives. Not affiliated with CDI or PSI; confirm rules in official CDI materials.",
    analyticsKey: "insurance",
  },
};

const pncTX: ExamConfig = {
  id: "pnc-tx",
  variantOf: "pnc",
  jurisdiction: { code: "TX", name: "Texas" },
  stateCode: "PNC_TX",
  idBase: 4300,
  slug: "/property-casualty-insurance/tx",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "Texas Property & Casualty Insurance Practice Test",
  shortName: "TX P&C Insurance",
  examLabel: "Texas General Lines P&C",
  fullName: "Texas property and casualty insurance license exam",
  questionIdPrefix: "PCTX-",
  icon: pnc.icon,
  testCount: 1,
  questionsPerTest: 130,
  passPct: 70,
  // 100 general and 30 Texas items, the scored counts in the Pearson VUE
  // Texas content outline (#124401, effective Sept 1, 2026).
  blueprint: {
    pcGeneral: 44,
    pcPolicy: 26,
    pcHomeowners: 18,
    pcAuto: 14,
    pcCommercial: 11,
    pcLiability: 10,
    pcOther: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 4301, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 70, weightLabel: "54% of the practice exam" },
    { setNumber: 2, id: 4302, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 18, weightLabel: "14% of the practice exam" },
    { setNumber: 3, id: 4303, name: "Personal Auto", categories: ["pcAuto"], size: 14, weightLabel: "11% of the practice exam" },
    { setNumber: 4, id: 4304, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 28, weightLabel: "22% of the practice exam" },
  ],
  categoryLabels: pnc.categoryLabels,
  copy: {
    guestPrompt: "to save your Texas property & casualty progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 130 source-checked questions for Texas, general topics and Texas law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 130 questions, 100 general and 30 Texas",
    heroSubs: [
      "General topics plus Texas rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the Pearson VUE Texas property and casualty outline (Sept 2026). Not affiliated with TDI or Pearson VUE; confirm rules in official TDI materials.",
    analyticsKey: "pnc",
  },
};

const pncFL: ExamConfig = {
  id: "pnc-fl",
  variantOf: "pnc",
  jurisdiction: { code: "FL", name: "Florida" },
  stateCode: "PNC_FL",
  idBase: 4350,
  slug: "/property-casualty-insurance/fl",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "Florida Property & Casualty Insurance Practice Test",
  shortName: "FL P&C Insurance",
  examLabel: "Florida 2-20 General Lines",
  fullName: "Florida property and casualty insurance license exam",
  questionIdPrefix: "PCFL-",
  icon: pnc.icon,
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // 150 items (the real 2-20 has 160 scored): 96 general knowledge and 54
  // Florida law, weighted to the Pearson VUE Florida outline (Jan 1, 2026).
  blueprint: {
    pcGeneral: 47,
    pcPolicy: 22,
    pcHomeowners: 19,
    pcAuto: 23,
    pcCommercial: 9,
    pcLiability: 13,
    pcOther: 17,
  },
  trainingSets: [
    { setNumber: 1, id: 4351, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 69, weightLabel: "46% of the practice exam" },
    { setNumber: 2, id: 4352, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 19, weightLabel: "13% of the practice exam" },
    { setNumber: 3, id: 4353, name: "Personal Auto", categories: ["pcAuto"], size: 23, weightLabel: "15% of the practice exam" },
    { setNumber: 4, id: 4354, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 39, weightLabel: "26% of the practice exam" },
  ],
  categoryLabels: pnc.categoryLabels,
  copy: {
    guestPrompt: "to save your Florida property & casualty progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for Florida, general topics and Florida law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions weighted to the 2-20 outline",
    heroSubs: [
      "General topics plus Florida law.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the Pearson VUE Florida 2-20 outline (Jan 2026). Not affiliated with Florida DFS or Pearson VUE; confirm rules in official DFS materials.",
    analyticsKey: "pnc",
  },
};

const pncCA: ExamConfig = {
  id: "pnc-ca",
  variantOf: "pnc",
  jurisdiction: { code: "CA", name: "California" },
  stateCode: "PNC_CA",
  idBase: 4400,
  slug: "/property-casualty-insurance/ca",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "California Property & Casualty Insurance Practice Test",
  shortName: "CA P&C Insurance",
  examLabel: "California Property & Casualty",
  fullName: "California property and casualty insurance license exam",
  questionIdPrefix: "PCCA-",
  icon: pnc.icon,
  testCount: 1,
  questionsPerTest: 150,
  passPct: 60,
  // 150 items like CDI's combined Property and Casualty exam (75 + 75), weighted
  // by the 2025 CDI examination objectives. PSI passes at 60%.
  blueprint: {
    pcGeneral: 24,
    pcPolicy: 23,
    pcHomeowners: 24,
    pcAuto: 22,
    pcCommercial: 20,
    pcLiability: 25,
    pcOther: 12,
  },
  trainingSets: [
    { setNumber: 1, id: 4401, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 47, weightLabel: "31% of the practice exam" },
    { setNumber: 2, id: 4402, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 24, weightLabel: "16% of the practice exam" },
    { setNumber: 3, id: 4403, name: "Personal Auto", categories: ["pcAuto"], size: 22, weightLabel: "15% of the practice exam" },
    { setNumber: 4, id: 4404, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 57, weightLabel: "38% of the practice exam" },
  ],
  categoryLabels: pnc.categoryLabels,
  copy: {
    guestPrompt: "to save your California property & casualty progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for California, general topics and California law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions like the combined CDI exam",
    heroSubs: [
      "General topics plus California law.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 60% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice weighted to the 2025 CDI property and casualty objectives. Not affiliated with CDI or PSI; confirm rules in official CDI materials.",
    analyticsKey: "pnc",
  },
};

export const EXAMS: ExamConfig[] = [cdl, cdlx, moto, civics, part107, ham, epa608, cna, ptcb, phleb, ccma, cet, danb, foodmgr, realestate, insurance, notary, foodhandler, boating, hunter, cpr, osha, forklift, alcohol, security, lifeguard, pnc, htl, cst, crcst];

/** State variants (see realestateCA). Not in EXAMS: one catalog entry per family. */
export const EXAM_VARIANTS: ExamConfig[] = [realestateCA, realestateNJ, realestateTX, realestateFL, realestateNY, insuranceTX, insuranceFL, insuranceCA, pncTX, pncFL, pncCA];
/** Every exam the store and app routes resolve, variants first. */
export const ALL_EXAMS: ExamConfig[] = [...EXAM_VARIANTS, ...EXAMS];

/** Family an exam belongs to: its own id, or the parent id for a variant. */
export const examFamilyId = (exam: ExamConfig): ExamId => exam.variantOf ?? exam.id;
/** State variants of an exam family (empty when it has none). */
export const getExamVariants = (familyId: string): ExamConfig[] =>
  EXAM_VARIANTS.filter((e) => e.variantOf === familyId);
/** Variant of a family for a jurisdiction code ("ca" or "CA"), if any. */
export const getExamVariant = (familyId: string, code: string | null | undefined): ExamConfig | undefined =>
  code ? getExamVariants(familyId).find((e) => e.jurisdiction?.code === code.toUpperCase()) : undefined;

export const examSetBase = (exam: ExamConfig) => exam.setIdBase ?? exam.idBase;
/** Store ID of training set N of an exam. */
export const examSetId = (exam: ExamConfig, setNumber: number) => examSetBase(exam) + setNumber;
/** Landing page URL (the SEO page the switcher, hub and footer link to). */
export const examLandingPath = (exam: ExamConfig) => exam.landingPath ?? exam.slug;

export const examTestIds = (exam: ExamConfig) =>
  Array.from({ length: exam.testCount }, (_, i) => exam.idBase + 1 + i);

export function getExamById(id: string): ExamConfig | undefined {
  return ALL_EXAMS.find((e) => e.id === id);
}

export function getExamByStateCode(code: string | null | undefined): ExamConfig | undefined {
  if (!code) return undefined;
  return ALL_EXAMS.find((e) => e.stateCode === code.toUpperCase());
}

/** Exam owning a practice-test store ID, if any. */
export function getExamForTestId(testId: number): ExamConfig | undefined {
  return ALL_EXAMS.find((e) => testId > e.idBase && testId <= e.idBase + e.testCount);
}

/** Exam owning a training-set store ID, if any. */
export function getExamForSetId(setId: number): ExamConfig | undefined {
  return ALL_EXAMS.find((e) => setId > examSetBase(e) && setId <= examSetBase(e) + e.trainingSets.length);
}

/** Exam whose pages a pathname belongs to (landing included), if any. */
export function getExamByPath(pathname: string | null | undefined): ExamConfig | undefined {
  if (!pathname) return undefined;
  // Families only: a variant's pages live under its family slug
  // (/real-estate/ca/...), so theme, header and footer follow the family.
  return EXAMS.find(
    (e) => pathname === e.slug || pathname.startsWith(`${e.slug}/`) || pathname === e.landingPath
  );
}

export function getExamTrainingSetSize(setId: number): number {
  const exam = getExamForSetId(setId);
  return exam?.trainingSets.find((s) => s.id === setId)?.size ?? 50;
}

/**
 * Training sets over TRAINING_PART_MAX questions are split into parts of
 * about TRAINING_PART_TARGET, so no session runs much past 50. A part is a
 * contiguous run of the set in question-ID order; where each one starts is
 * generated into lib/trainingParts.json by scripts/build-training-parts.ts
 * (the dashboard cannot read the bank). Progress stays stored per set id and
 * a part just filters it, so a set is complete exactly when all its parts are.
 */
export const TRAINING_PART_MAX = 60;
export const TRAINING_PART_TARGET = 50;

export interface TrainingPart {
  set: ExamTrainingSetDef;
  /** 1-based; 1 of 1 for a set that is not split. */
  part: number;
  partCount: number;
  size: number;
}

const PARTS = TRAINING_PARTS as Record<string, { starts: string[]; sizes: number[] }>;

export function trainingParts(def: ExamTrainingSetDef): TrainingPart[] {
  const split = PARTS[def.id];
  if (!split) return [{ set: def, part: 1, partCount: 1, size: def.size }];
  return split.sizes.map((size, i) => ({ set: def, part: i + 1, partCount: split.sizes.length, size }));
}

/** Every step a dashboard shows for the exam's training: one per part. */
export function examTrainingParts(exam: ExamConfig): TrainingPart[] {
  return exam.trainingSets.flatMap(trainingParts);
}

/** Which part of a set a question belongs to (1 when the set is not split). */
export function trainingPartOf(setId: number, questionId: string): number {
  const starts = PARTS[setId]?.starts;
  if (!starts) return 1;
  let part = 1;
  for (let i = 1; i < starts.length; i++) if (questionId.localeCompare(starts[i]) >= 0) part = i + 1;
  return part;
}

/** Display name: "Safe Driving & Hazards, part 2 of 3". */
export function trainingPartName(p: TrainingPart): string {
  return p.partCount > 1 ? `${p.set.name}, part ${p.part} of ${p.partCount}` : p.set.name;
}

export function isExamQuestionId(questionId: string): boolean {
  return ALL_EXAMS.some((e) => questionId.startsWith(e.questionIdPrefix));
}

/** Exam owning a question ID by prefix, if any (DMV IDs are "U-" or a state code). */
export function getExamForQuestionId(questionId: string): ExamConfig | undefined {
  return ALL_EXAMS.find((e) => questionId.startsWith(e.questionIdPrefix));
}

/**
 * Key the analytics/questions aggregate files an answer under. Every
 * registry exam uses its id; the DMV permit test is "dmv".
 */
export const DMV_ANALYTICS_KEY = "dmv";
export type ExamAnalyticsKey = ExamId | typeof DMV_ANALYTICS_KEY;
export const EXAM_ANALYTICS_KEYS: ExamAnalyticsKey[] = [DMV_ANALYTICS_KEY, ...EXAMS.map((e) => e.id)];
export const examAnalyticsKey = (exam: ExamConfig | undefined): ExamAnalyticsKey => (exam ? examFamilyId(exam) : DMV_ANALYTICS_KEY);
export const examAnalyticsLabel = (key: string): string =>
  key === DMV_ANALYTICS_KEY ? "DMV permit test" : getExamById(key)?.shortName ?? key;
