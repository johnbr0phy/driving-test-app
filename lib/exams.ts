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

export type ExamId = "cdl" | "cdlx" | "moto" | "civics" | "part107" | "htl" | "cst" | "crcst";

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
  icon: "truck" | "bike" | "flag" | "plane" | "microscope" | "scissors" | "shield";
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

export const EXAMS: ExamConfig[] = [cdl, cdlx, moto, civics, part107, htl, cst, crcst];

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
