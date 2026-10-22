/**
 * Registry of the non-DMV exams that run on the shared TigerTest
 * flow (dashboard, tests, training, results debrief, drill, stats).
 *
 * Each exam is namespaced in the store by an ID range and a pseudo state
 * code so its progress never collides with DMV data:
 *   HTL   200s  (tests 201-204, sets 201-211; 204 retired)
 *   CST   300s  (tests 301-304, sets 301-304; 305 retired)
 *   CRCST 400s  (tests 401-404, sets 401-404; 405-406 retired)
 *   COSMO 6000s (tests 6001-6004, sets 6001-6004)
 *   VTNE  6100s (tests 6101-6104, sets 6101-6104)
 *
 * Adding an exam = one entry here, a question bank in data/, a bank module
 * lib/banks/<examId>.ts imported by its test, training and stats pages, a
 * theme block in globals.css, and app/<slug>/ wrappers.
 * This file must stay free of question-data imports (the store imports it).
 */

import TRAINING_PARTS from "./trainingParts.json";
import type { Language } from "@/i18n";
import foodhandlerEs from "./examTranslations/foodhandler.es.json";
import foodhandlerVi from "./examTranslations/foodhandler.vi.json";
import foodhandlerKo from "./examTranslations/foodhandler.ko.json";
import cdlxEs from "./examTranslations/cdlx.es.json";
import oshaEs from "./examTranslations/osha.es.json";
import forkliftEs from "./examTranslations/forklift.es.json";
import cnaEs from "./examTranslations/cna.es.json";
import epa608Es from "./examTranslations/epa608.es.json";

export type ExamId = "realestate-ca" | "realestate-nj" | "realestate-tx" | "realestate-fl" | "realestate-ny" | "insurance-tx" | "insurance-fl" | "insurance-ca" | "pnc-tx" | "pnc-fl" | "pnc-ca" | "realestate-pa" | "realestate-il" | "realestate-oh" | "realestate-ga" | "realestate-nc" | "realestate-mi" | "realestate-va" | "realestate-wa" | "realestate-az" | "realestate-tn" | "insurance-ny" | "insurance-pa" | "insurance-il" | "insurance-oh" | "insurance-ga" | "insurance-nc" | "insurance-mi" | "insurance-nj" | "insurance-va" | "insurance-wa" | "pnc-ny" | "pnc-pa" | "pnc-il" | "pnc-oh" | "pnc-ga" | "pnc-nc" | "pnc-mi" | "pnc-nj" | "pnc-va" | "pnc-wa" | "cdl" | "cdlx" | "moto" | "civics" | "part107" | "ham" | "epa608" | "cna" | "ptcb" | "phleb" | "ccma" | "cet" | "danb" | "foodmgr" | "realestate" | "insurance" | "notary" | "foodhandler" | "boating" | "hunter" | "cpr" | "osha" | "forklift" | "alcohol" | "security" | "lifeguard" | "pnc" | "cosmetology" | "vtne" | "htl" | "cst" | "crcst";

export interface ExamTrainingSetDef {
  /** 1-based set number used in URLs (/<exam>/practice/N). */
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
  /** One name per part when the set is split (see TRAINING_PART_MAX), in
   *  part order, so the dashboard says what each part covers instead of
   *  "part 2 of 3". scripts/build-training-parts.ts checks the count. */
  partNames?: string[];
  /** Set on a DMV-style set (see testSets): it holds exactly practice test
   *  N's questions, and `categories` is empty. */
  test?: number;
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
  icon: "truck" | "bike" | "flag" | "plane" | "radio" | "thermometer" | "heart" | "pill" | "syringe" | "stethoscope" | "activity" | "tooth" | "siren" | "utensils" | "house" | "umbrella" | "stamp" | "graduation" | "cloud" | "cpu" | "chef" | "sailboat" | "target" | "lock" | "book" | "medal" | "bandage" | "hardhat" | "forklift" | "wine" | "pencil" | "badge" | "lifebuoy" | "building" | "microscope" | "scissors" | "shield" | "sparkles" | "paw";
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
  /** Other languages the exam is offered in (a translated bank in
   *  lib/banks/<examId>.ts plus this copy). The language switcher shows on the
   *  exam's app pages only when there is at least one. */
  translations?: Partial<Record<Exclude<Language, "en">, ExamTranslation>>;
}

/** Everything a person reads in an ExamConfig, in one other language. */
export interface ExamTranslation {
  /** The exam's landing page in this language (/es/examen-practica-cdl). */
  landingPath: string;
  name: string;
  examLabel: string;
  fullName: string;
  /** By setNumber. Not used for test sets (testSets), which are named by number. */
  trainingSets?: Record<number, { name: string; weightLabel: string; partNames?: string[] }>;
  categoryLabels: Record<string, string>;
  copy: Omit<ExamConfig["copy"], "analyticsKey">;
}

/** A translation loaded from lib/examTranslations/*.json, checked for the
 *  one shape JSON cannot express (five hero subtitles). */
function examTranslation(json: Omit<ExamTranslation, "copy"> & { copy: Omit<ExamTranslation["copy"], "heroSubs"> & { heroSubs: string[] } }): ExamTranslation {
  if (json.copy.heroSubs.length !== 5) throw new Error(`${json.landingPath}: heroSubs needs 5 lines`);
  return json as ExamTranslation;
}

/**
 * DMV-style training: set N holds exactly practice test N's 50 questions, and
 * the dashboard runs Set 1, Test 1, Set 2, Test 2... Used by every exam whose
 * tests cover its whole bank, except CDL Endorsements and EPA 608 (people
 * certify one section at a time, so they train by section). Set IDs are the
 * ones the old content-area sets used; lib/testSetMigration.ts moves their
 * progress over by question.
 */
function testSets(setBase: number, testCount: number): ExamTrainingSetDef[] {
  return Array.from({ length: testCount }, (_, i) => ({
    setNumber: i + 1,
    id: setBase + i + 1,
    name: `Training Set ${i + 1}`,
    categories: [],
    size: 50,
    weightLabel: "",
    test: i + 1,
  }));
}

/** True when the exam trains DMV-style, one set per practice test. */
export const hasTestSets = (exam: ExamConfig) => exam.trainingSets.some((s) => s.test !== undefined);

const TEST_SET_NAMES: Record<Language, (n: number) => string> = {
  en: (n) => `Training Set ${n}`,
  es: (n) => `Entrenamiento ${n}`,
  vi: (n) => `Bộ luyện tập ${n}`,
  ko: (n) => `연습 세트 ${n}`,
  zh: (n) => `练习组 ${n}`,
};

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
    { setNumber: 2, id: 122, name: "Basic Control & Braking", categories: ["basicControl", "brakingSystems"], size: 100, weightLabel: "20% of each test", partNames: ["Basic Vehicle Control", "Braking Systems"] },
    { setNumber: 3, id: 123, name: "Vehicle Systems & Cargo", categories: ["vehicleSystems", "cargoHandling"], size: 100, weightLabel: "16% of each test", partNames: ["Cargo Handling", "Vehicle Systems"] },
    { setNumber: 4, id: 124, name: "Safe Driving & Hazards", categories: ["safeDriving", "hazardPerception"], size: 125, weightLabel: "24% of each test", partNames: ["Speed, Space & Scanning", "Trouble on the Road", "Spotting Hazards"] },
    { setNumber: 5, id: 125, name: "Driving Conditions", categories: ["weatherDriving", "nightDriving", "mountainDriving", "railroadCrossings"], size: 125, weightLabel: "12% of each test", partNames: ["Night Driving", "Weather Driving", "Mountains & Railroad Crossings"] },
    { setNumber: 6, id: 126, name: "Emergencies, Alcohol & Drugs", categories: ["emergencyProcedures", "alcoholDrugs"], size: 90, weightLabel: "14% of each test", partNames: ["Emergency Procedures", "Alcohol & Drugs"] },
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
      "Six sets, six tests. Safe driving weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your CDL knowledge test.",
    ],
    sourceLine: "Covers the CDL general knowledge exam. 80% to pass on the real test.",
    analyticsKey: "cdl",
  },
  translations: {
    es: {
      landingPath: "/es/examen-practica-cdl",
      name: "Examen de práctica CDL",
      examLabel: "CDL Conocimientos Generales",
      fullName: "examen de conocimientos generales de la CDL",
      trainingSets: {
        1: { name: "Inspección del vehículo", weightLabel: "14% de cada examen" },
        2: { name: "Control básico y frenos", weightLabel: "20% de cada examen", partNames: ["Control básico del vehículo", "Sistemas de frenos"] },
        3: { name: "Sistemas del vehículo y carga", weightLabel: "16% de cada examen", partNames: ["Manejo de la carga", "Sistemas del vehículo"] },
        4: { name: "Conducción segura y peligros", weightLabel: "24% de cada examen", partNames: ["Velocidad, espacio y observación", "Problemas en la carretera", "Detectar peligros"] },
        5: { name: "Condiciones de manejo", weightLabel: "12% de cada examen", partNames: ["Manejo de noche", "Manejo con mal tiempo", "Montañas y cruces de ferrocarril"] },
        6: { name: "Emergencias, alcohol y drogas", weightLabel: "14% de cada examen", partNames: ["Procedimientos de emergencia", "Alcohol y drogas"] },
      },
      categoryLabels: {
        vehicleInspection: "Inspección del vehículo",
        basicControl: "Control básico del vehículo",
        brakingSystems: "Sistemas de frenos",
        vehicleSystems: "Sistemas del vehículo",
        cargoHandling: "Manejo de la carga",
        safeDriving: "Conducción segura",
        hazardPerception: "Percepción de peligros",
        weatherDriving: "Manejo con mal tiempo",
        nightDriving: "Manejo de noche",
        mountainDriving: "Manejo en montañas",
        railroadCrossings: "Cruces de ferrocarril",
        emergencyProcedures: "Procedimientos de emergencia",
        alcoholDrugs: "Alcohol y drogas",
      },
      copy: {
        guestPrompt: "para guardar tu progreso de la CDL y ver cada pregunta que fallas",
        trainingHeading: "Practica por tema",
        trainingSub: "Seis grupos que cubren todo el manual de conocimientos generales. Respuesta al instante, y las preguntas que fallas vuelven hasta que las domines.",
        testsHeading: "Exámenes de práctica · 50 preguntas como el examen real",
        heroSubs: [
          "Seis temas, seis exámenes. La inspección pesa más.",
          "Domina cada grupo y luego haz un examen.",
          "Vas a la mitad. Prueba un examen de práctica.",
          "Corrige las fallas y vuelve a intentarlo.",
          "Todo listo. Programa tu examen de conocimientos de la CDL.",
        ],
        sourceLine: "Cubre el examen de conocimientos generales de la CDL. Se aprueba con 80% en el examen real.",
      },
    },
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
  translations: {
    es: examTranslation(cdlxEs),
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
  trainingSets: testSets(500, 4),
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
      "Five chapters, four tests. Start with Training Set 1.",
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
  trainingSets: testSets(600, 4),
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
  trainingSets: testSets(800, 4),
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
    { setNumber: 1, id: 901, name: "FCC Rules (T1)", categories: ["hamRules"], size: 68, weightLabel: "6 of 35 exam questions", partNames: ["Licenses, Bands & Station ID", "Station Control & Repeaters"] },
    { setNumber: 2, id: 902, name: "Operating & Propagation (T2, T3)", categories: ["hamOperating", "hamPropagation"], size: 72, weightLabel: "6 of 35 exam questions", partNames: ["Operating Procedures (T2)", "Radio Wave Propagation (T3)"] },
    { setNumber: 3, id: 903, name: "Practices & Electrical Principles (T4, T5)", categories: ["hamPractices", "hamElectrical"], size: 73, weightLabel: "6 of 35 exam questions", partNames: ["Amateur Radio Practices (T4)", "Electrical Principles (T5)"] },
    { setNumber: 4, id: 904, name: "Components & Circuits (T6, T7)", categories: ["hamComponents", "hamCircuits"], size: 78, weightLabel: "8 of 35 exam questions", partNames: ["Electronic Components (T6)", "Practical Circuits (T7)"] },
    { setNumber: 5, id: 905, name: "Signals & Antennas (T8, T9)", categories: ["hamSignals", "hamAntennas"], size: 70, weightLabel: "6 of 35 exam questions", partNames: ["Signals & Emissions (T8)", "Antennas & Feed Lines (T9)"] },
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
    { setNumber: 1, id: 1001, name: "Core", categories: ["epaCore"], size: 72, weightLabel: "Required for every certification", partNames: ["Ozone, Laws & Certification", "Recovery, Evacuation & Safety"] },
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
  translations: {
    es: examTranslation(epa608Es),
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
  trainingSets: testSets(1100, 4),
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
  translations: {
    es: examTranslation(cnaEs),
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
  trainingSets: testSets(1200, 4),
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
  trainingSets: testSets(1300, 4),
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
  trainingSets: testSets(1400, 4),
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
      "Seven domains, four tests. Clinical care is over half.",
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
  trainingSets: testSets(1500, 4),
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
  trainingSets: testSets(1600, 4),
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
  trainingSets: testSets(1800, 4),
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
      "Seven areas, four tests. Flow of food is the biggest single area.",
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
  trainingSets: testSets(1900, 4),
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
      "Eight areas, four tests. Contracts is the biggest single area.",
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
  trainingSets: testSets(2000, 4),
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
  trainingSets: testSets(2100, 4),
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
      "Five topics, four tests. Notarial acts are the biggest single topic.",
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
  trainingSets: testSets(2500, 4),
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
      "Five topics, four tests. Temperature is the biggest single topic.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Get your local food handler card.",
    ],
    sourceLine: "Based on the FDA Food Code as taught in ANAB-accredited food handler courses. Card requirements vary by state and county.",
    analyticsKey: "foodhandler",
  },
  translations: {
    es: examTranslation(foodhandlerEs),
    vi: examTranslation(foodhandlerVi),
    ko: examTranslation(foodhandlerKo),
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
  trainingSets: testSets(2600, 4),
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
      "Five topics, four tests. Navigation and operation weigh most.",
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
  trainingSets: testSets(2700, 4),
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
  trainingSets: testSets(3100, 4),
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
      "Five topics, four tests. First aid is the biggest single topic.",
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
  trainingSets: testSets(3200, 4),
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
  translations: {
    es: examTranslation(oshaEs),
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
  trainingSets: testSets(3300, 4),
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
      "Five topics, four tests. Stability and operation are the biggest single topics.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Take your employer's evaluation.",
    ],
    sourceLine: "Based on OSHA 29 CFR 1910.178 and ANSI/ITSDF B56.1 operator training content. Certification comes from your employer's training and evaluation.",
    analyticsKey: "forklift",
  },
  translations: {
    es: examTranslation(forkliftEs),
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
  trainingSets: testSets(3400, 4),
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
      "Five topics, four tests. Intoxication and intervention weigh most.",
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
  trainingSets: testSets(3600, 4),
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
  trainingSets: testSets(3700, 4),
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
      "Five topics, four tests. Rescue and care are the biggest single topics.",
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
  trainingSets: testSets(3800, 4),
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
      "Seven topics, four tests. Home and auto are the biggest single topics.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Add state law, then schedule.",
    ],
    sourceLine: "Based on the general (national) portion of the property and casualty producer exam outlines. State laws and the state portion are not covered.",
    analyticsKey: "pnc",
  },
};

const cosmetology: ExamConfig = {
  id: "cosmetology",
  stateCode: "COSMO",
  idBase: 6000,
  slug: "/cosmetology",
  landingPath: "/cosmetology-practice-test",
  name: "Cosmetology Practice Test",
  shortName: "Cosmetology",
  examLabel: "Cosmetology state board",
  fullName: "Cosmetology state board written (theory) exam",
  questionIdPrefix: "COSMO-",
  icon: "sparkles",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // NIC National Cosmetology Theory Examination only. Content outline effective
  // July 1, 2022; candidate bulletin revised January 1, 2026 with the same
  // weights: 110 items, 100 scored, 90 minutes. That length is NIC only.
  // Scientific Concepts 35%, Hair Care and Services 45%, Skin Care 10%,
  // Nail Care 10%, split into the nine topics schools teach.
  // PSI national theory (California effective April 1, 2026; PSI also lists
  // AL, CO, GA, KY, MD, MI, TN, plus theory in MA and HI) is 110 items in
  // 120 minutes with different weights. This bank is not weighted to PSI.
  // NIC reports a scaled score; most NIC boards pass at 75 (varies by state).
  blueprint: {
    cosInfection: 9,
    cosAnatomy: 5,
    cosChemistry: 4,
    cosConsult: 4,
    cosCutStyle: 8,
    cosTexture: 5,
    cosColor: 5,
    cosSkin: 5,
    cosNails: 5,
  },
  trainingSets: testSets(6000, 4),
  categoryLabels: {
    cosInfection: "Infection Control & Safety",
    cosAnatomy: "Anatomy & Physiology",
    cosChemistry: "Chemistry & Electricity",
    cosConsult: "Client Consultation & Hair Analysis",
    cosCutStyle: "Shampooing, Haircutting & Styling",
    cosTexture: "Chemical Texture Services",
    cosColor: "Haircoloring",
    cosSkin: "Skin Care Services",
    cosNails: "Nail Care Services",
  },
  copy: {
    guestPrompt: "to save your cosmetology progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Four sets for the NIC theory exam only (110 questions, 100 scored, 90 minutes). Sciences, consultation with cutting and styling, chemical services, and skin and nails. These sets do not follow the PSI outline. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the NIC proportions (NIC only: 110 items, 90 minutes)",
    heroSubs: [
      "Nine topics, four tests. Infection control and hair services carry the most questions.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Go pass your state board.",
    ],
    sourceLine: "These sets follow the NIC theory exam only: 110 items, 100 scored, 90 minutes (outline effective July 1, 2022). PSI states, including California from April 1, 2026, use a 120-minute outline. This bank is not weighted to PSI.",
    analyticsKey: "cosmetology",
  },
};

const vtne: ExamConfig = {
  id: "vtne",
  stateCode: "VTNE",
  idBase: 6100,
  slug: "/vtne",
  landingPath: "/vtne-practice-test",
  name: "VTNE Practice Test",
  shortName: "VTNE",
  examLabel: "VTNE",
  fullName: "Veterinary Technician National Examination (VTNE)",
  questionIdPrefix: "VTNE-",
  icon: "paw",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // AAVSB VTNE Content Outline approved by the AAVSB Board of Directors in
  // March 2023 (reproduced in the current VTNE Candidate Information Handbook,
  // aavsb.org): 150 scored items of 170 in 3 hours. Animal Care and Nursing 20%,
  // Pharmacy and Pharmacology 13%, Surgical Nursing 13%, Anesthesia 13%,
  // Laboratory Procedures 9%, Diagnostic Imaging 6%, Dentistry, Emergency
  // Medicine and Critical Care, Pain Management and Analgesia, and
  // Communication and Veterinary Professional Support Services 5 to 7% each.
  // The real exam passes on a scaled 425 of 800; 70% is a practice target.
  blueprint: {
    vtCare: 10,
    vtPharm: 7,
    vtSurgical: 7,
    vtAnesthesia: 7,
    vtLab: 5,
    vtImaging: 3,
    vtDentistry: 3,
    vtEmergency: 3,
    vtPain: 2,
    vtComm: 3,
  },
  trainingSets: testSets(6100, 4),
  categoryLabels: {
    vtCare: "Animal Care & Nursing",
    vtPharm: "Pharmacy & Pharmacology",
    vtSurgical: "Surgical Nursing",
    vtAnesthesia: "Anesthesia",
    vtLab: "Laboratory Procedures",
    vtImaging: "Diagnostic Imaging",
    vtDentistry: "Dentistry",
    vtEmergency: "Emergency Medicine & Critical Care",
    vtPain: "Pain Management & Analgesia",
    vtComm: "Communication & Professional Support",
  },
  copy: {
    guestPrompt: "to save your VTNE progress and track every question you miss",
    trainingHeading: "Train by domain",
    trainingSub: "Four sets covering the ten VTNE domains: animal care and communication, pharmacology and lab procedures, anesthesia with pain management and emergency care, and surgery with dentistry and imaging. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the VTNE's proportions",
    heroSubs: [
      "Ten domains, four tests. Animal care and nursing is the biggest single domain.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your VTNE window.",
    ],
    sourceLine: "Based on the AAVSB VTNE content outline approved March 2023. The real exam passes on a scaled score of 425; 70% here is a practice target.",
    analyticsKey: "vtne",
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
    // Staining (18 of 50, 36%) is split by what the stain demonstrates, Carson-style.
    stainRoutine: 3,
    stainCarbohydrates: 3,
    stainConnective: 3,
    stainMicroorganisms: 2,
    stainPigments: 2,
    stainImmuno: 5,
    fixation: 10,
    embeddingMicrotomy: 10,
    processing: 7,
    laboratoryOperations: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 201, name: "Fixation", categories: ["fixation"], size: 40, weightLabel: "15–25% of the exam" },
    { setNumber: 2, id: 202, name: "Processing", categories: ["processing"], size: 28, weightLabel: "10–20% of the exam" },
    { setNumber: 3, id: 203, name: "Embedding & Microtomy", categories: ["embeddingMicrotomy"], size: 40, weightLabel: "15–25% of the exam" },
    // Staining was one set (204) until Oct 2026; its progress moves to 206-211 by question id (lib/legacySetSplits.ts).
    { setNumber: 4, id: 206, name: "H&E, Dyes & Mounting", categories: ["stainRoutine"], size: 16, weightLabel: "Staining, 30–40% of the exam" },
    { setNumber: 5, id: 207, name: "Carbohydrates & Amyloid", categories: ["stainCarbohydrates"], size: 12, weightLabel: "Staining, 30–40% of the exam" },
    { setNumber: 6, id: 208, name: "Connective Tissue, Muscle & Nerve", categories: ["stainConnective"], size: 14, weightLabel: "Staining, 30–40% of the exam" },
    { setNumber: 7, id: 209, name: "Microorganisms", categories: ["stainMicroorganisms"], size: 8, weightLabel: "Staining, 30–40% of the exam" },
    { setNumber: 8, id: 210, name: "Pigments, Minerals & Lipids", categories: ["stainPigments"], size: 12, weightLabel: "Staining, 30–40% of the exam" },
    { setNumber: 9, id: 211, name: "IHC, Immunofluorescence & ISH", categories: ["stainImmuno"], size: 24, weightLabel: "Staining, 30–40% of the exam" },
    { setNumber: 10, id: 205, name: "Laboratory Operations", categories: ["laboratoryOperations"], size: 20, weightLabel: "10–15% of the exam" },
  ],
  categoryLabels: {
    fixation: "Fixation",
    processing: "Processing",
    embeddingMicrotomy: "Embedding & Microtomy",
    stainRoutine: "Staining: H&E, Dyes & Mounting",
    stainCarbohydrates: "Staining: Carbohydrates & Amyloid",
    stainConnective: "Staining: Connective Tissue, Muscle & Nerve",
    stainMicroorganisms: "Staining: Microorganisms",
    stainPigments: "Staining: Pigments, Minerals & Lipids",
    stainImmuno: "Staining: IHC, IF & ISH",
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
  trainingSets: testSets(300, 4),
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
  trainingSets: testSets(400, 4),
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
      "Seven sections, four tests, weighted like HSPA.",
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
    { setNumber: 1, id: 4301, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 70, weightLabel: "54% of the practice exam", partNames: ["Risk, Contracts & Agency Basics", "Texas Law & Policy Provisions"] },
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
    { setNumber: 1, id: 4351, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 69, weightLabel: "46% of the practice exam", partNames: ["Florida Law & Risk Basics", "Contracts, Agency & Policy Provisions"] },
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

// --- state variants batch 2 (generated) ---
// Ten more real estate states and ten insurance states (L&H and P&C), built by
// tools/build_state_variant.py like TX, FL and NY. ID blocks of 50: real estate
// 4450-4900, L&H 4950-5400, P&C 5450-5900. Sources in docs/*-state-sources/.
const realestatePA: ExamConfig = {
  id: "realestate-pa",
  variantOf: "realestate",
  jurisdiction: { code: "PA", name: "Pennsylvania" },
  stateCode: "REALESTATE_PA",
  idBase: 4450,
  slug: "/real-estate/pa",
  landingPath: "/real-estate-practice-test",
  name: "Pennsylvania Real Estate Practice Test",
  shortName: "PA Real Estate",
  examLabel: "Pennsylvania Salesperson",
  fullName: "Pennsylvania real estate salesperson exam",
  questionIdPrefix: "REPA-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 120,
  passPct: 75,
  // 80 national (outline eff. Apr 1, 2025) and 40 Pennsylvania items (state outline
  // eff. Mar 16, 2026), the Pearson VUE scored counts; 75% on each portion.
  blueprint: {
    rePropertyCharacteristics: 11,
    reOwnershipTitle: 12,
    reValuation: 11,
    reContractsAgency: 27,
    rePractice: 35,
    reDisclosures: 10,
    reFinancing: 7,
    reMath: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 4451, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 23, weightLabel: "19% of the practice exam" },
    { setNumber: 2, id: 4452, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 27, weightLabel: "23% of the practice exam" },
    { setNumber: 3, id: 4453, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 45, weightLabel: "38% of the practice exam" },
    { setNumber: 4, id: 4454, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 25, weightLabel: "21% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your Pennsylvania real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 120 source-checked questions for Pennsylvania, national topics and Pennsylvania law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 120 questions, 80 national and 40 Pennsylvania",
    heroSubs: [
      "National topics plus Pennsylvania rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 75% passes each part.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the Pearson VUE Pennsylvania outlines (national Apr 2025, state Mar 2026). Not affiliated with the PA State Real Estate Commission or Pearson VUE; confirm rules in official PA State Real Estate Commission materials.",
    analyticsKey: "realestate",
  },
};

const realestateIL: ExamConfig = {
  id: "realestate-il",
  variantOf: "realestate",
  jurisdiction: { code: "IL", name: "Illinois" },
  stateCode: "REALESTATE_IL",
  idBase: 4500,
  slug: "/real-estate/il",
  landingPath: "/real-estate-practice-test",
  name: "Illinois Real Estate Practice Test",
  shortName: "IL Real Estate",
  examLabel: "Illinois Broker",
  fullName: "Illinois real estate broker exam",
  questionIdPrefix: "REIL-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 140,
  passPct: 75,
  // PSI broker outlines (IDFPR booklet 6/24/2026): 100 national items at the PSI weights
  // plus 40 state items, passed separately (70% national, 75% state); 75% here, the stricter mark.
  blueprint: {
    rePropertyCharacteristics: 12,
    reOwnershipTitle: 14,
    reValuation: 9,
    reContractsAgency: 40,
    rePractice: 30,
    reDisclosures: 16,
    reFinancing: 11,
    reMath: 8,
  },
  trainingSets: [
    { setNumber: 1, id: 4501, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 26, weightLabel: "19% of the practice exam" },
    { setNumber: 2, id: 4502, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 40, weightLabel: "29% of the practice exam" },
    { setNumber: 3, id: 4503, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 46, weightLabel: "33% of the practice exam" },
    { setNumber: 4, id: 4504, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 28, weightLabel: "20% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your Illinois real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 140 source-checked questions for Illinois, national topics and Illinois law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 140 questions, 100 national and 40 Illinois",
    heroSubs: [
      "National topics plus Illinois rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 75% passes each part.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Illinois broker outlines (IDFPR booklet, June 2026). Not affiliated with IDFPR or PSI; confirm rules in official IDFPR materials.",
    analyticsKey: "realestate",
  },
};

const realestateOH: ExamConfig = {
  id: "realestate-oh",
  variantOf: "realestate",
  jurisdiction: { code: "OH", name: "Ohio" },
  stateCode: "REALESTATE_OH",
  idBase: 4550,
  slug: "/real-estate/oh",
  landingPath: "/real-estate-practice-test",
  name: "Ohio Real Estate Practice Test",
  shortName: "OH Real Estate",
  examLabel: "Ohio Salesperson",
  fullName: "Ohio real estate salesperson exam",
  questionIdPrefix: "REOH-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 120,
  passPct: 70,
  // PSI Ohio bulletin (7/1/2026): 80 national items at the salesperson weights plus
  // 40 Ohio items (governance 4, licensing 6, law and rules 16, agency 14); 70% on each portion.
  blueprint: {
    rePropertyCharacteristics: 11,
    reOwnershipTitle: 9,
    reValuation: 6,
    reContractsAgency: 40,
    rePractice: 32,
    reDisclosures: 8,
    reFinancing: 8,
    reMath: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 4551, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 20, weightLabel: "17% of the practice exam" },
    { setNumber: 2, id: 4552, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 40, weightLabel: "33% of the practice exam" },
    { setNumber: 3, id: 4553, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 40, weightLabel: "33% of the practice exam" },
    { setNumber: 4, id: 4554, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 20, weightLabel: "17% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your Ohio real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 120 source-checked questions for Ohio, national topics and Ohio law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 120 questions, 80 national and 40 Ohio",
    heroSubs: [
      "National topics plus Ohio rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes each part.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Ohio salesperson bulletin (July 2026). Not affiliated with the Ohio Division of Real Estate or PSI; confirm rules in official Ohio Division of Real Estate materials.",
    analyticsKey: "realestate",
  },
};

const realestateGA: ExamConfig = {
  id: "realestate-ga",
  variantOf: "realestate",
  jurisdiction: { code: "GA", name: "Georgia" },
  stateCode: "REALESTATE_GA",
  idBase: 4600,
  slug: "/real-estate/ga",
  landingPath: "/real-estate-practice-test",
  name: "Georgia Real Estate Practice Test",
  shortName: "GA Real Estate",
  examLabel: "Georgia Salesperson",
  fullName: "Georgia real estate salesperson exam",
  questionIdPrefix: "REGA-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 150,
  passPct: 75,
  // PSI Georgia bulletin (7/1/2026): 100 national + 52 state items (laws and rules 16,
  // practice 21, finance and closing 15), scaled to 150. The 100 and 75% are course-provider figures.
  blueprint: {
    rePropertyCharacteristics: 12,
    reOwnershipTitle: 15,
    reValuation: 8,
    reContractsAgency: 39,
    rePractice: 39,
    reDisclosures: 8,
    reFinancing: 20,
    reMath: 9,
  },
  trainingSets: [
    { setNumber: 1, id: 4601, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 27, weightLabel: "18% of the practice exam" },
    { setNumber: 2, id: 4602, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 39, weightLabel: "26% of the practice exam" },
    { setNumber: 3, id: 4603, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 47, weightLabel: "31% of the practice exam" },
    { setNumber: 4, id: 4604, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 37, weightLabel: "25% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your Georgia real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for Georgia, national topics and Georgia law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 99 national and 51 Georgia",
    heroSubs: [
      "National topics plus Georgia rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 75% passes each part.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Georgia salesperson bulletin (July 2026). Not affiliated with GREC or PSI; confirm rules in official GREC materials.",
    analyticsKey: "realestate",
  },
};

const realestateNC: ExamConfig = {
  id: "realestate-nc",
  variantOf: "realestate",
  jurisdiction: { code: "NC", name: "North Carolina" },
  stateCode: "REALESTATE_NC",
  idBase: 4650,
  slug: "/real-estate/nc",
  landingPath: "/real-estate-practice-test",
  name: "North Carolina Real Estate Practice Test",
  shortName: "NC Real Estate",
  examLabel: "North Carolina Broker",
  fullName: "North Carolina real estate broker license exam",
  questionIdPrefix: "RENC-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 140,
  passPct: 75,
  // NCREC RELINC (April 2026): 80 national and 60 state scored items, each section
  // passed at 75 separately; national picks at the exact national outline counts.
  blueprint: {
    rePropertyCharacteristics: 9,
    reOwnershipTitle: 15,
    reValuation: 15,
    reContractsAgency: 37,
    rePractice: 34,
    reDisclosures: 13,
    reFinancing: 10,
    reMath: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 4651, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 24, weightLabel: "17% of the practice exam" },
    { setNumber: 2, id: 4652, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 37, weightLabel: "26% of the practice exam" },
    { setNumber: 3, id: 4653, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 47, weightLabel: "34% of the practice exam" },
    { setNumber: 4, id: 4654, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 32, weightLabel: "23% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your North Carolina real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 140 source-checked questions for North Carolina, national topics and North Carolina law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 140 questions, 80 national and 60 North Carolina",
    heroSubs: [
      "National topics plus North Carolina rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 75% passes each part.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the NCREC RELINC bulletin (April 2026). Not affiliated with NCREC or Pearson VUE; confirm rules in official NCREC materials.",
    analyticsKey: "realestate",
  },
};

const realestateMI: ExamConfig = {
  id: "realestate-mi",
  variantOf: "realestate",
  jurisdiction: { code: "MI", name: "Michigan" },
  stateCode: "REALESTATE_MI",
  idBase: 4700,
  slug: "/real-estate/mi",
  landingPath: "/real-estate-practice-test",
  name: "Michigan Real Estate Practice Test",
  shortName: "MI Real Estate",
  examLabel: "Michigan Salesperson",
  fullName: "Michigan real estate salesperson exam",
  questionIdPrefix: "REMI-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 115,
  passPct: 70,
  // PSI Michigan salesperson bulletin (updated 7/6/2026): 115 scored items, one
  // 70% pass mark; 80 national items on the PSI outline plus the 35-item state portion.
  blueprint: {
    rePropertyCharacteristics: 9,
    reOwnershipTitle: 13,
    reValuation: 6,
    reContractsAgency: 30,
    rePractice: 30,
    reDisclosures: 9,
    reFinancing: 11,
    reMath: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 4701, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 22, weightLabel: "19% of the practice exam" },
    { setNumber: 2, id: 4702, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 30, weightLabel: "26% of the practice exam" },
    { setNumber: 3, id: 4703, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 39, weightLabel: "34% of the practice exam" },
    { setNumber: 4, id: 4704, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 24, weightLabel: "21% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your Michigan real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 115 source-checked questions for Michigan, national topics and Michigan law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 115 questions, 80 national and 35 Michigan",
    heroSubs: [
      "National topics plus Michigan rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Michigan salesperson bulletin (July 2026). Not affiliated with Michigan LARA or PSI; confirm rules in official Michigan LARA materials.",
    analyticsKey: "realestate",
  },
};

const realestateVA: ExamConfig = {
  id: "realestate-va",
  variantOf: "realestate",
  jurisdiction: { code: "VA", name: "Virginia" },
  stateCode: "REALESTATE_VA",
  idBase: 4750,
  slug: "/real-estate/va",
  landingPath: "/real-estate-practice-test",
  name: "Virginia Real Estate Practice Test",
  shortName: "VA Real Estate",
  examLabel: "Virginia Salesperson",
  fullName: "Virginia real estate salesperson exam",
  questionIdPrefix: "REVA-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 120,
  passPct: 75,
  // PSI Virginia bulletin (rev. 2/18/2026): 80 national and 40 state items, passed
  // separately (56/80 national, 30/40 state); 75% here, the stricter state mark.
  blueprint: {
    rePropertyCharacteristics: 10,
    reOwnershipTitle: 13,
    reValuation: 6,
    reContractsAgency: 35,
    rePractice: 26,
    reDisclosures: 16,
    reFinancing: 8,
    reMath: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 4751, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 23, weightLabel: "19% of the practice exam" },
    { setNumber: 2, id: 4752, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 35, weightLabel: "29% of the practice exam" },
    { setNumber: 3, id: 4753, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 42, weightLabel: "35% of the practice exam" },
    { setNumber: 4, id: 4754, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 20, weightLabel: "17% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your Virginia real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 120 source-checked questions for Virginia, national topics and Virginia law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 120 questions, 80 national and 40 Virginia",
    heroSubs: [
      "National topics plus Virginia rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 75% passes each part.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Virginia real estate bulletin (Feb 2026). Not affiliated with the Virginia Real Estate Board or PSI; confirm rules in official Virginia Real Estate Board materials.",
    analyticsKey: "realestate",
  },
};

const realestateWA: ExamConfig = {
  id: "realestate-wa",
  variantOf: "realestate",
  jurisdiction: { code: "WA", name: "Washington" },
  stateCode: "REALESTATE_WA",
  idBase: 4800,
  slug: "/real-estate/wa",
  landingPath: "/real-estate-practice-test",
  name: "Washington Real Estate Practice Test",
  shortName: "WA Real Estate",
  examLabel: "Washington Broker",
  fullName: "Washington real estate broker exam",
  questionIdPrefix: "REWA-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 130,
  passPct: 70,
  // PSI Washington broker bulletin (3/28/2024): 100 national items at the PSI broker
  // weights plus 30 Washington items; 70 on each portion (WAC 308-124A-760).
  blueprint: {
    rePropertyCharacteristics: 12,
    reOwnershipTitle: 11,
    reValuation: 8,
    reContractsAgency: 32,
    rePractice: 43,
    reDisclosures: 7,
    reFinancing: 10,
    reMath: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 4801, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 23, weightLabel: "18% of the practice exam" },
    { setNumber: 2, id: 4802, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 32, weightLabel: "25% of the practice exam" },
    { setNumber: 3, id: 4803, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 50, weightLabel: "38% of the practice exam" },
    { setNumber: 4, id: 4804, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 25, weightLabel: "19% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your Washington real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 130 source-checked questions for Washington, national topics and Washington law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 130 questions, 100 national and 30 Washington",
    heroSubs: [
      "National topics plus Washington rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes each part.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Washington broker bulletin (March 2024). Not affiliated with Washington DOL or PSI; confirm rules in official Washington DOL materials.",
    analyticsKey: "realestate",
  },
};

const realestateAZ: ExamConfig = {
  id: "realestate-az",
  variantOf: "realestate",
  jurisdiction: { code: "AZ", name: "Arizona" },
  stateCode: "REALESTATE_AZ",
  idBase: 4850,
  slug: "/real-estate/az",
  landingPath: "/real-estate-practice-test",
  name: "Arizona Real Estate Practice Test",
  shortName: "AZ Real Estate",
  examLabel: "Arizona Salesperson",
  fullName: "Arizona real estate salesperson exam",
  questionIdPrefix: "REAZ-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 140,
  passPct: 75,
  // 80 national (Pearson VUE outline, Apr 2025) and 60 Arizona items (state outline
  // eff. Jan 1, 2026), the scored counts in Candidate Handbook #090300 (Feb 2026); 75% pass.
  blueprint: {
    rePropertyCharacteristics: 17,
    reOwnershipTitle: 14,
    reValuation: 11,
    reContractsAgency: 29,
    rePractice: 28,
    reDisclosures: 18,
    reFinancing: 16,
    reMath: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 4851, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 31, weightLabel: "22% of the practice exam" },
    { setNumber: 2, id: 4852, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 29, weightLabel: "21% of the practice exam" },
    { setNumber: 3, id: 4853, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 46, weightLabel: "33% of the practice exam" },
    { setNumber: 4, id: 4854, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 34, weightLabel: "24% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your Arizona real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 140 source-checked questions for Arizona, national topics and Arizona law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 140 questions, 80 national and 60 Arizona",
    heroSubs: [
      "National topics plus Arizona rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 75% passes each part.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the Pearson VUE Arizona outlines (national Apr 2025, state Jan 2026). Not affiliated with ADRE or Pearson VUE; confirm rules in official ADRE materials.",
    analyticsKey: "realestate",
  },
};

const realestateTN: ExamConfig = {
  id: "realestate-tn",
  variantOf: "realestate",
  jurisdiction: { code: "TN", name: "Tennessee" },
  stateCode: "REALESTATE_TN",
  idBase: 4900,
  slug: "/real-estate/tn",
  landingPath: "/real-estate-practice-test",
  name: "Tennessee Real Estate Practice Test",
  shortName: "TN Real Estate",
  examLabel: "Tennessee Affiliate Broker",
  fullName: "Tennessee real estate affiliate broker exam",
  questionIdPrefix: "RETN-",
  icon: "house",
  testCount: 1,
  questionsPerTest: 120,
  passPct: 70,
  // PSI Tennessee bulletin (7/1/2025): 80 national and 40 state scored items, the
  // affiliate broker outlines; 70% on each part.
  blueprint: {
    rePropertyCharacteristics: 8,
    reOwnershipTitle: 12,
    reValuation: 6,
    reContractsAgency: 33,
    rePractice: 40,
    reDisclosures: 7,
    reFinancing: 8,
    reMath: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 4901, name: "Property, Ownership & Title", categories: ["rePropertyCharacteristics", "reOwnershipTitle"], size: 20, weightLabel: "17% of the practice exam" },
    { setNumber: 2, id: 4902, name: "Contracts & Agency", categories: ["reContractsAgency"], size: 33, weightLabel: "28% of the practice exam" },
    { setNumber: 3, id: 4903, name: "Practice & Disclosures", categories: ["rePractice", "reDisclosures"], size: 47, weightLabel: "39% of the practice exam" },
    { setNumber: 4, id: 4904, name: "Valuation, Financing & Math", categories: ["reValuation", "reFinancing", "reMath"], size: 20, weightLabel: "17% of the practice exam" },
  ],
  categoryLabels: realestate.categoryLabels,
  copy: {
    guestPrompt: "to save your Tennessee real estate progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 120 source-checked questions for Tennessee, national topics and Tennessee law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 120 questions, 80 national and 40 Tennessee",
    heroSubs: [
      "National topics plus Tennessee rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes each part.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Tennessee affiliate broker bulletin (July 2025). Not affiliated with TREC or PSI; confirm rules in official TREC materials.",
    analyticsKey: "realestate",
  },
};

const insuranceNY: ExamConfig = {
  id: "insurance-ny",
  variantOf: "insurance",
  jurisdiction: { code: "NY", name: "New York" },
  stateCode: "LIFEHEALTH_NY",
  idBase: 4950,
  slug: "/life-health-insurance/ny",
  landingPath: "/life-health-insurance-practice-test",
  name: "New York Life & Health Insurance Practice Test",
  shortName: "NY L&H Insurance",
  examLabel: "New York Life, Accident & Health",
  fullName: "New York life, accident and health agent/broker exam",
  questionIdPrefix: "LHNY-",
  icon: "umbrella",
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // PSI New York Series 17-55 (bulletin rev. 4/28/2023): 150 items in 2.5 hours, 70% to
  // pass, one integrated exam; 49 New York items sit inside the areas whose outline cites NY law.
  blueprint: {
    insuranceRegulation: 11,
    generalInsurance: 6,
    lifeBasics: 17,
    lifePolicyTypes: 12,
    lifeProvisions: 15,
    annuitiesRetirement: 16,
    healthBasics: 16,
    healthProvisions: 23,
    healthPolicyTypes: 34,
  },
  trainingSets: [
    { setNumber: 1, id: 4951, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 17, weightLabel: "11% of the practice exam" },
    { setNumber: 2, id: 4952, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 44, weightLabel: "29% of the practice exam" },
    { setNumber: 3, id: 4953, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 32, weightLabel: "21% of the practice exam" },
    { setNumber: 4, id: 4954, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 57, weightLabel: "38% of the practice exam" },
  ],
  categoryLabels: insurance.categoryLabels,
  copy: {
    guestPrompt: "to save your New York life & health progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for New York, general topics and New York law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 101 general and 49 New York",
    heroSubs: [
      "General topics plus New York rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI New York life, accident and health outline (Series 17-55). Not affiliated with NY DFS or PSI; confirm rules in official NY DFS materials.",
    analyticsKey: "insurance",
  },
};

const insurancePA: ExamConfig = {
  id: "insurance-pa",
  variantOf: "insurance",
  jurisdiction: { code: "PA", name: "Pennsylvania" },
  stateCode: "LIFEHEALTH_PA",
  idBase: 5000,
  slug: "/life-health-insurance/pa",
  landingPath: "/life-health-insurance-practice-test",
  name: "Pennsylvania Life & Health Insurance Practice Test",
  shortName: "PA L&H Insurance",
  examLabel: "Pennsylvania Life, Accident & Health",
  fullName: "Pennsylvania life, accident and health producer exam",
  questionIdPrefix: "LHPA-",
  icon: "umbrella",
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // PSI Series 16-03 outline (eff. 3/1/2026): 150 items in 170 minutes, 70% to pass, with
  // Pennsylvania law woven through its 13 areas; 49 PA items sit where the outline cites it.
  blueprint: {
    insuranceRegulation: 30,
    generalInsurance: 14,
    lifeBasics: 12,
    lifePolicyTypes: 12,
    lifeProvisions: 19,
    annuitiesRetirement: 16,
    healthBasics: 12,
    healthProvisions: 16,
    healthPolicyTypes: 19,
  },
  trainingSets: [
    { setNumber: 1, id: 5001, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 44, weightLabel: "29% of the practice exam" },
    { setNumber: 2, id: 5002, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 43, weightLabel: "29% of the practice exam" },
    { setNumber: 3, id: 5003, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 28, weightLabel: "19% of the practice exam" },
    { setNumber: 4, id: 5004, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 35, weightLabel: "23% of the practice exam" },
  ],
  categoryLabels: insurance.categoryLabels,
  copy: {
    guestPrompt: "to save your Pennsylvania life & health progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for Pennsylvania, general topics and Pennsylvania law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 101 general and 49 Pennsylvania",
    heroSubs: [
      "General topics plus Pennsylvania rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Pennsylvania life, accident and health outline (Series 16-03, March 2026). Not affiliated with the Pennsylvania Insurance Department or PSI; confirm rules in official Pennsylvania Insurance Department materials.",
    analyticsKey: "insurance",
  },
};

const insuranceIL: ExamConfig = {
  id: "insurance-il",
  variantOf: "insurance",
  jurisdiction: { code: "IL", name: "Illinois" },
  stateCode: "LIFEHEALTH_IL",
  idBase: 5050,
  slug: "/life-health-insurance/il",
  landingPath: "/life-health-insurance-practice-test",
  name: "Illinois Life & Health Insurance Practice Test",
  shortName: "IL L&H Insurance",
  examLabel: "Illinois Life and A&H",
  fullName: "Illinois life and accident & health producer exams",
  questionIdPrefix: "LHIL-",
  icon: "umbrella",
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // Life and A&H are separate Illinois exams (general 50 + 50, state 31 + 39 = 170, Pearson
  // VUE #121402); capped at 150 keeping the ratio: 88 general, 62 Illinois. Each part passes at 70.
  blueprint: {
    insuranceRegulation: 43,
    generalInsurance: 12,
    lifeBasics: 7,
    lifePolicyTypes: 10,
    lifeProvisions: 16,
    annuitiesRetirement: 9,
    healthBasics: 17,
    healthProvisions: 15,
    healthPolicyTypes: 21,
  },
  trainingSets: [
    { setNumber: 1, id: 5051, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 55, weightLabel: "37% of the practice exam" },
    { setNumber: 2, id: 5052, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 33, weightLabel: "22% of the practice exam" },
    { setNumber: 3, id: 5053, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 26, weightLabel: "17% of the practice exam" },
    { setNumber: 4, id: 5054, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 36, weightLabel: "24% of the practice exam" },
  ],
  categoryLabels: insurance.categoryLabels,
  copy: {
    guestPrompt: "to save your Illinois life & health progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for Illinois, general topics and Illinois law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 88 general and 62 Illinois",
    heroSubs: [
      "General topics plus Illinois rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes each part.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the Pearson VUE Illinois outlines (#121402, Oct 2026). Not affiliated with the Illinois Department of Insurance or Pearson VUE; confirm rules in official Illinois Department of Insurance materials.",
    analyticsKey: "insurance",
  },
};

const insuranceOH: ExamConfig = {
  id: "insurance-oh",
  variantOf: "insurance",
  jurisdiction: { code: "OH", name: "Ohio" },
  stateCode: "LIFEHEALTH_OH",
  idBase: 5100,
  slug: "/life-health-insurance/oh",
  landingPath: "/life-health-insurance-practice-test",
  name: "Ohio Life & Health Insurance Practice Test",
  shortName: "OH L&H Insurance",
  examLabel: "Ohio Life, Accident & Health",
  fullName: "Ohio life, accident and health insurance agent exam",
  questionIdPrefix: "LHOH-",
  icon: "umbrella",
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // PSI Series 11-35 (bulletin updated 3/24/2026): one integrated 150-item exam, 70% to
  // pass; Ohio law runs through the outline, so 49 Ohio items sit in the sections that cite it.
  blueprint: {
    insuranceRegulation: 21,
    generalInsurance: 9,
    lifeBasics: 13,
    lifePolicyTypes: 10,
    lifeProvisions: 13,
    annuitiesRetirement: 17,
    healthBasics: 17,
    healthProvisions: 14,
    healthPolicyTypes: 36,
  },
  trainingSets: [
    { setNumber: 1, id: 5101, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 30, weightLabel: "20% of the practice exam" },
    { setNumber: 2, id: 5102, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 36, weightLabel: "24% of the practice exam" },
    { setNumber: 3, id: 5103, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 34, weightLabel: "23% of the practice exam" },
    { setNumber: 4, id: 5104, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 50, weightLabel: "33% of the practice exam" },
  ],
  categoryLabels: insurance.categoryLabels,
  copy: {
    guestPrompt: "to save your Ohio life & health progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for Ohio, general topics and Ohio law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 101 general and 49 Ohio",
    heroSubs: [
      "General topics plus Ohio rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Ohio life, accident and health outline (Series 11-35, March 2026). Not affiliated with the Ohio Department of Insurance or PSI; confirm rules in official Ohio Department of Insurance materials.",
    analyticsKey: "insurance",
  },
};

const insuranceGA: ExamConfig = {
  id: "insurance-ga",
  variantOf: "insurance",
  jurisdiction: { code: "GA", name: "Georgia" },
  stateCode: "LIFEHEALTH_GA",
  idBase: 5150,
  slug: "/life-health-insurance/ga",
  landingPath: "/life-health-insurance-practice-test",
  name: "Georgia Life & Health Insurance Practice Test",
  shortName: "GA L&H Insurance",
  examLabel: "Georgia Life, Accident & Sickness",
  fullName: "Georgia life, accident and sickness agent exam",
  questionIdPrefix: "LHGA-",
  icon: "umbrella",
  testCount: 1,
  questionsPerTest: 125,
  passPct: 70,
  // Georgia L&H combo (12-GA-05): 100 general items at the Pearson VUE outline weights
  // plus 25 Georgia items (outline #121102, eff. Oct 22, 2024); 70% to pass.
  blueprint: {
    insuranceRegulation: 25,
    generalInsurance: 10,
    lifeBasics: 9,
    lifePolicyTypes: 10,
    lifeProvisions: 15,
    annuitiesRetirement: 7,
    healthBasics: 12,
    healthProvisions: 16,
    healthPolicyTypes: 21,
  },
  trainingSets: [
    { setNumber: 1, id: 5151, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 35, weightLabel: "28% of the practice exam" },
    { setNumber: 2, id: 5152, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 34, weightLabel: "27% of the practice exam" },
    { setNumber: 3, id: 5153, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 19, weightLabel: "15% of the practice exam" },
    { setNumber: 4, id: 5154, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 37, weightLabel: "30% of the practice exam" },
  ],
  categoryLabels: insurance.categoryLabels,
  copy: {
    guestPrompt: "to save your Georgia life & health progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 125 source-checked questions for Georgia, general topics and Georgia law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 125 questions, 100 general and 25 Georgia",
    heroSubs: [
      "General topics plus Georgia rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the Pearson VUE Georgia life, accident and sickness outline (#121102). Not affiliated with the Georgia Insurance Commissioner's office or Pearson VUE; confirm rules in official Georgia Insurance Commissioner's office materials.",
    analyticsKey: "insurance",
  },
};

const insuranceNC: ExamConfig = {
  id: "insurance-nc",
  variantOf: "insurance",
  jurisdiction: { code: "NC", name: "North Carolina" },
  stateCode: "LIFEHEALTH_NC",
  idBase: 5200,
  slug: "/life-health-insurance/nc",
  landingPath: "/life-health-insurance-practice-test",
  name: "North Carolina Life & Health Insurance Practice Test",
  shortName: "NC L&H Insurance",
  examLabel: "North Carolina Life and A&H",
  fullName: "North Carolina life and accident and health agent exams",
  questionIdPrefix: "LHNC-",
  icon: "umbrella",
  testCount: 1,
  questionsPerTest: 110,
  passPct: 70,
  // NC tests life and A&H separately (55 items each: 41 general + 14 NC, outline #123415
  // eff. March 2, 2026); this combined form is both, 82 general + 28 NC.
  blueprint: {
    insuranceRegulation: 15,
    generalInsurance: 10,
    lifeBasics: 7,
    lifePolicyTypes: 15,
    lifeProvisions: 15,
    annuitiesRetirement: 8,
    healthBasics: 10,
    healthProvisions: 15,
    healthPolicyTypes: 15,
  },
  trainingSets: [
    { setNumber: 1, id: 5201, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 25, weightLabel: "23% of the practice exam" },
    { setNumber: 2, id: 5202, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 37, weightLabel: "34% of the practice exam" },
    { setNumber: 3, id: 5203, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 18, weightLabel: "16% of the practice exam" },
    { setNumber: 4, id: 5204, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 30, weightLabel: "27% of the practice exam" },
  ],
  categoryLabels: insurance.categoryLabels,
  copy: {
    guestPrompt: "to save your North Carolina life & health progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 110 source-checked questions for North Carolina, general topics and North Carolina law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 110 questions, 82 general and 28 North Carolina",
    heroSubs: [
      "General topics plus North Carolina rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the Pearson VUE North Carolina outlines (#123415, March 2026). Not affiliated with NCDOI or Pearson VUE; confirm rules in official NCDOI materials.",
    analyticsKey: "insurance",
  },
};

const insuranceMI: ExamConfig = {
  id: "insurance-mi",
  variantOf: "insurance",
  jurisdiction: { code: "MI", name: "Michigan" },
  stateCode: "LIFEHEALTH_MI",
  idBase: 5250,
  slug: "/life-health-insurance/mi",
  landingPath: "/life-health-insurance-practice-test",
  name: "Michigan Life & Health Insurance Practice Test",
  shortName: "MI L&H Insurance",
  examLabel: "Michigan Life, Accident & Health",
  fullName: "Michigan life, accident and health producer exam",
  questionIdPrefix: "LHMI-",
  icon: "umbrella",
  testCount: 1,
  questionsPerTest: 150,
  passPct: 75,
  // PSI Michigan 16-80 outline: 150 items in 2.5 hours, 75% to pass. One integrated exam
  // with Michigan law woven into its sections, so the 40 Michigan items follow the outline's MCL citations.
  blueprint: {
    insuranceRegulation: 18,
    generalInsurance: 15,
    lifeBasics: 14,
    lifePolicyTypes: 8,
    lifeProvisions: 15,
    annuitiesRetirement: 11,
    healthBasics: 18,
    healthProvisions: 18,
    healthPolicyTypes: 33,
  },
  trainingSets: [
    { setNumber: 1, id: 5251, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 33, weightLabel: "22% of the practice exam" },
    { setNumber: 2, id: 5252, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 37, weightLabel: "25% of the practice exam" },
    { setNumber: 3, id: 5253, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 29, weightLabel: "19% of the practice exam" },
    { setNumber: 4, id: 5254, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 51, weightLabel: "34% of the practice exam" },
  ],
  categoryLabels: insurance.categoryLabels,
  copy: {
    guestPrompt: "to save your Michigan life & health progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for Michigan, general topics and Michigan law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 110 general and 40 Michigan",
    heroSubs: [
      "General topics plus Michigan rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 75% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Michigan life, accident and health outline (series 16-80, bulletin June 2025). Not affiliated with Michigan DIFS or PSI; confirm rules in official Michigan DIFS materials.",
    analyticsKey: "insurance",
  },
};

const insuranceNJ: ExamConfig = {
  id: "insurance-nj",
  variantOf: "insurance",
  jurisdiction: { code: "NJ", name: "New Jersey" },
  stateCode: "LIFEHEALTH_NJ",
  idBase: 5300,
  slug: "/life-health-insurance/nj",
  landingPath: "/life-health-insurance-practice-test",
  name: "New Jersey Life & Health Insurance Practice Test",
  shortName: "NJ L&H Insurance",
  examLabel: "New Jersey Life and A&H",
  fullName: "New Jersey life and accident & health producer exams",
  questionIdPrefix: "LHNJ-",
  icon: "umbrella",
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // NJ tests life (83: 50 general + 33 NJ) and A&H (88: 50 + 38) as separate PSI exams;
  // both together (171) capped at 150 keeping the ratio: 88 general, 62 NJ. PSI bulletin 9/8/2026.
  blueprint: {
    insuranceRegulation: 47,
    generalInsurance: 13,
    lifeBasics: 7,
    lifePolicyTypes: 6,
    lifeProvisions: 22,
    annuitiesRetirement: 6,
    healthBasics: 16,
    healthProvisions: 17,
    healthPolicyTypes: 16,
  },
  trainingSets: [
    { setNumber: 1, id: 5301, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 60, weightLabel: "40% of the practice exam" },
    { setNumber: 2, id: 5302, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 35, weightLabel: "23% of the practice exam" },
    { setNumber: 3, id: 5303, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 22, weightLabel: "15% of the practice exam" },
    { setNumber: 4, id: 5304, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 33, weightLabel: "22% of the practice exam" },
  ],
  categoryLabels: insurance.categoryLabels,
  copy: {
    guestPrompt: "to save your New Jersey life & health progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for New Jersey, general topics and New Jersey law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 88 general and 62 New Jersey",
    heroSubs: [
      "General topics plus New Jersey rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI New Jersey life and A&H producer outlines (bulletin Sept 2026). Not affiliated with NJ DOBI or PSI; confirm rules in official NJ DOBI materials.",
    analyticsKey: "insurance",
  },
};

const insuranceVA: ExamConfig = {
  id: "insurance-va",
  variantOf: "insurance",
  jurisdiction: { code: "VA", name: "Virginia" },
  stateCode: "LIFEHEALTH_VA",
  idBase: 5350,
  slug: "/life-health-insurance/va",
  landingPath: "/life-health-insurance-practice-test",
  name: "Virginia Life & Health Insurance Practice Test",
  shortName: "VA L&H Insurance",
  examLabel: "Virginia Life, Annuities & Health",
  fullName: "Virginia life, annuities and health insurance agent exam",
  questionIdPrefix: "LHVA-",
  icon: "umbrella",
  testCount: 1,
  questionsPerTest: 140,
  passPct: 70,
  // Prometric Series 11-01 (140 scored items, 2.5 hours, 70% cut per Prometric's 2025-26
  // report). Virginia law runs through the outline; 40 Virginia items is the reported split.
  blueprint: {
    insuranceRegulation: 16,
    generalInsurance: 10,
    lifeBasics: 10,
    lifePolicyTypes: 13,
    lifeProvisions: 17,
    annuitiesRetirement: 14,
    healthBasics: 14,
    healthProvisions: 21,
    healthPolicyTypes: 25,
  },
  trainingSets: [
    { setNumber: 1, id: 5351, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 26, weightLabel: "19% of the practice exam" },
    { setNumber: 2, id: 5352, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 40, weightLabel: "29% of the practice exam" },
    { setNumber: 3, id: 5353, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 28, weightLabel: "20% of the practice exam" },
    { setNumber: 4, id: 5354, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 46, weightLabel: "33% of the practice exam" },
  ],
  categoryLabels: insurance.categoryLabels,
  copy: {
    guestPrompt: "to save your Virginia life & health progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 140 source-checked questions for Virginia, general topics and Virginia law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 140 questions, 100 general and 40 Virginia",
    heroSubs: [
      "General topics plus Virginia rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your Prometric exam.",
    ],
    sourceLine: "Source-checked practice on the Prometric Virginia life, annuities and health outline (Series 11-01, May 2026). Not affiliated with the Virginia Bureau of Insurance or Prometric; confirm rules in official Virginia Bureau of Insurance materials.",
    analyticsKey: "insurance",
  },
};

const insuranceWA: ExamConfig = {
  id: "insurance-wa",
  variantOf: "insurance",
  jurisdiction: { code: "WA", name: "Washington" },
  stateCode: "LIFEHEALTH_WA",
  idBase: 5400,
  slug: "/life-health-insurance/wa",
  landingPath: "/life-health-insurance-practice-test",
  name: "Washington Life & Health Insurance Practice Test",
  shortName: "WA L&H Insurance",
  examLabel: "Washington Life & Disability",
  fullName: "Washington life and disability insurance producer exam",
  questionIdPrefix: "LHWA-",
  icon: "umbrella",
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // PSI Washington Life and Disability Producer outline (eff. 4/1/2026): 150 items,
  // 45 of them Washington law; one combined score, 70% to pass.
  blueprint: {
    insuranceRegulation: 30,
    generalInsurance: 9,
    lifeBasics: 13,
    lifePolicyTypes: 12,
    lifeProvisions: 22,
    annuitiesRetirement: 11,
    healthBasics: 16,
    healthProvisions: 19,
    healthPolicyTypes: 18,
  },
  trainingSets: [
    { setNumber: 1, id: 5401, name: "Insurance Basics & Regulation", categories: ["insuranceRegulation", "generalInsurance"], size: 39, weightLabel: "26% of the practice exam" },
    { setNumber: 2, id: 5402, name: "Life Insurance Policies & Provisions", categories: ["lifeBasics", "lifePolicyTypes", "lifeProvisions"], size: 47, weightLabel: "31% of the practice exam" },
    { setNumber: 3, id: 5403, name: "Annuities, Taxation & Health Basics", categories: ["annuitiesRetirement", "healthBasics"], size: 27, weightLabel: "18% of the practice exam" },
    { setNumber: 4, id: 5404, name: "Health Policy Provisions & Types", categories: ["healthProvisions", "healthPolicyTypes"], size: 37, weightLabel: "25% of the practice exam" },
  ],
  categoryLabels: insurance.categoryLabels,
  copy: {
    guestPrompt: "to save your Washington life & health progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for Washington, general topics and Washington law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 105 general and 45 Washington",
    heroSubs: [
      "General topics plus Washington rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Washington life and disability outline (April 2026). Not affiliated with the Washington OIC or PSI; confirm rules in official Washington OIC materials.",
    analyticsKey: "insurance",
  },
};

const pncNY: ExamConfig = {
  id: "pnc-ny",
  variantOf: "pnc",
  jurisdiction: { code: "NY", name: "New York" },
  stateCode: "PNC_NY",
  idBase: 5450,
  slug: "/property-casualty-insurance/ny",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "New York Property & Casualty Insurance Practice Test",
  shortName: "NY P&C Insurance",
  examLabel: "New York Property & Casualty",
  fullName: "New York property and casualty agent/broker exam",
  questionIdPrefix: "PCNY-",
  icon: pnc.icon,
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // PSI New York Series 17-56 (bulletin rev. 4/28/2023): 150 items in 2.5 hours, 70% to
  // pass, one integrated exam; 45 New York items sit inside the areas whose outline cites NY law.
  blueprint: {
    pcGeneral: 27,
    pcPolicy: 20,
    pcHomeowners: 30,
    pcAuto: 16,
    pcCommercial: 24,
    pcLiability: 20,
    pcOther: 13,
  },
  trainingSets: [
    { setNumber: 1, id: 5451, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 47, weightLabel: "31% of the practice exam" },
    { setNumber: 2, id: 5452, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 30, weightLabel: "20% of the practice exam" },
    { setNumber: 3, id: 5453, name: "Personal Auto", categories: ["pcAuto"], size: 16, weightLabel: "11% of the practice exam" },
    { setNumber: 4, id: 5454, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 57, weightLabel: "38% of the practice exam" },
  ],
  categoryLabels: pnc.categoryLabels,
  copy: {
    guestPrompt: "to save your New York property & casualty progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for New York, general topics and New York law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 105 general and 45 New York",
    heroSubs: [
      "General topics plus New York rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI New York property and casualty outline (Series 17-56). Not affiliated with NY DFS or PSI; confirm rules in official NY DFS materials.",
    analyticsKey: "pnc",
  },
};

const pncPA: ExamConfig = {
  id: "pnc-pa",
  variantOf: "pnc",
  jurisdiction: { code: "PA", name: "Pennsylvania" },
  stateCode: "PNC_PA",
  idBase: 5500,
  slug: "/property-casualty-insurance/pa",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "Pennsylvania Property & Casualty Insurance Practice Test",
  shortName: "PA P&C Insurance",
  examLabel: "Pennsylvania Property & Casualty",
  fullName: "Pennsylvania property and casualty producer exam",
  questionIdPrefix: "PCPA-",
  icon: pnc.icon,
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // PSI Series 16-06 outline (eff. 3/1/2026): 150 items in 170 minutes, 70% to pass, with
  // Pennsylvania law woven through its 13 areas; 47 PA items sit where the outline cites it.
  blueprint: {
    pcGeneral: 47,
    pcPolicy: 16,
    pcHomeowners: 16,
    pcAuto: 22,
    pcCommercial: 18,
    pcLiability: 18,
    pcOther: 13,
  },
  trainingSets: [
    { setNumber: 1, id: 5501, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 63, weightLabel: "42% of the practice exam", partNames: ["Risk Basics & Pennsylvania Licensing", "Pennsylvania Rules & Policy Provisions"] },
    { setNumber: 2, id: 5502, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 16, weightLabel: "11% of the practice exam" },
    { setNumber: 3, id: 5503, name: "Personal Auto", categories: ["pcAuto"], size: 22, weightLabel: "15% of the practice exam" },
    { setNumber: 4, id: 5504, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 49, weightLabel: "33% of the practice exam" },
  ],
  categoryLabels: pnc.categoryLabels,
  copy: {
    guestPrompt: "to save your Pennsylvania property & casualty progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for Pennsylvania, general topics and Pennsylvania law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 103 general and 47 Pennsylvania",
    heroSubs: [
      "General topics plus Pennsylvania rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Pennsylvania property and casualty outline (Series 16-06, March 2026). Not affiliated with the Pennsylvania Insurance Department or PSI; confirm rules in official Pennsylvania Insurance Department materials.",
    analyticsKey: "pnc",
  },
};

const pncIL: ExamConfig = {
  id: "pnc-il",
  variantOf: "pnc",
  jurisdiction: { code: "IL", name: "Illinois" },
  stateCode: "PNC_IL",
  idBase: 5550,
  slug: "/property-casualty-insurance/il",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "Illinois Property & Casualty Insurance Practice Test",
  shortName: "IL P&C Insurance",
  examLabel: "Illinois Property and Casualty",
  fullName: "Illinois property and casualty producer exams",
  questionIdPrefix: "PCIL-",
  icon: pnc.icon,
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // Property and Casualty are separate Illinois exams (general 50 + 50, state 30 + 37 = 167,
  // Pearson VUE #121402); capped at 150 keeping the ratio: 90 general, 60 Illinois. Each part passes at 70.
  blueprint: {
    pcGeneral: 65,
    pcPolicy: 25,
    pcHomeowners: 16,
    pcAuto: 20,
    pcCommercial: 8,
    pcLiability: 11,
    pcOther: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 5551, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 90, weightLabel: "60% of the practice exam", partNames: ["Risk Basics & Illinois Licensing", "Illinois Conduct & Policy Provisions"] },
    { setNumber: 2, id: 5552, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 16, weightLabel: "11% of the practice exam" },
    { setNumber: 3, id: 5553, name: "Personal Auto", categories: ["pcAuto"], size: 20, weightLabel: "13% of the practice exam" },
    { setNumber: 4, id: 5554, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 24, weightLabel: "16% of the practice exam" },
  ],
  categoryLabels: pnc.categoryLabels,
  copy: {
    guestPrompt: "to save your Illinois property & casualty progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for Illinois, general topics and Illinois law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 90 general and 60 Illinois",
    heroSubs: [
      "General topics plus Illinois rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes each part.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the Pearson VUE Illinois outlines (#121402, Oct 2026). Not affiliated with the Illinois Department of Insurance or Pearson VUE; confirm rules in official Illinois Department of Insurance materials.",
    analyticsKey: "pnc",
  },
};

const pncOH: ExamConfig = {
  id: "pnc-oh",
  variantOf: "pnc",
  jurisdiction: { code: "OH", name: "Ohio" },
  stateCode: "PNC_OH",
  idBase: 5600,
  slug: "/property-casualty-insurance/oh",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "Ohio Property & Casualty Insurance Practice Test",
  shortName: "OH P&C Insurance",
  examLabel: "Ohio Property & Casualty",
  fullName: "Ohio property and casualty insurance agent exam",
  questionIdPrefix: "PCOH-",
  icon: pnc.icon,
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // PSI Series 11-36 (bulletin updated 3/24/2026): one integrated 150-item exam, 70% to
  // pass; the 35 Ohio items are the Ohio-law topics the outline cites.
  blueprint: {
    pcGeneral: 32,
    pcPolicy: 20,
    pcHomeowners: 30,
    pcAuto: 21,
    pcCommercial: 21,
    pcLiability: 16,
    pcOther: 10,
  },
  trainingSets: [
    { setNumber: 1, id: 5601, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 52, weightLabel: "35% of the practice exam" },
    { setNumber: 2, id: 5602, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 30, weightLabel: "20% of the practice exam" },
    { setNumber: 3, id: 5603, name: "Personal Auto", categories: ["pcAuto"], size: 21, weightLabel: "14% of the practice exam" },
    { setNumber: 4, id: 5604, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 47, weightLabel: "31% of the practice exam" },
  ],
  categoryLabels: pnc.categoryLabels,
  copy: {
    guestPrompt: "to save your Ohio property & casualty progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for Ohio, general topics and Ohio law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 115 general and 35 Ohio",
    heroSubs: [
      "General topics plus Ohio rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Ohio property and casualty outline (Series 11-36, March 2026). Not affiliated with the Ohio Department of Insurance or PSI; confirm rules in official Ohio Department of Insurance materials.",
    analyticsKey: "pnc",
  },
};

const pncGA: ExamConfig = {
  id: "pnc-ga",
  variantOf: "pnc",
  jurisdiction: { code: "GA", name: "Georgia" },
  stateCode: "PNC_GA",
  idBase: 5650,
  slug: "/property-casualty-insurance/ga",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "Georgia Property & Casualty Insurance Practice Test",
  shortName: "GA P&C Insurance",
  examLabel: "Georgia Property & Casualty",
  fullName: "Georgia property and casualty agent exam",
  questionIdPrefix: "PCGA-",
  icon: pnc.icon,
  testCount: 1,
  questionsPerTest: 125,
  passPct: 70,
  // Georgia P&C combo (12-GA-06): 100 general items at the Pearson VUE outline weights
  // plus 25 Georgia items (outline #121102, eff. Oct 22, 2024); 70% to pass.
  blueprint: {
    pcGeneral: 44,
    pcPolicy: 28,
    pcHomeowners: 14,
    pcAuto: 14,
    pcCommercial: 11,
    pcLiability: 8,
    pcOther: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 5651, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 72, weightLabel: "58% of the practice exam", partNames: ["Risk Basics & Georgia Licensing", "Policy Provisions & Conditions"] },
    { setNumber: 2, id: 5652, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 14, weightLabel: "11% of the practice exam" },
    { setNumber: 3, id: 5653, name: "Personal Auto", categories: ["pcAuto"], size: 14, weightLabel: "11% of the practice exam" },
    { setNumber: 4, id: 5654, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 25, weightLabel: "20% of the practice exam" },
  ],
  categoryLabels: pnc.categoryLabels,
  copy: {
    guestPrompt: "to save your Georgia property & casualty progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 125 source-checked questions for Georgia, general topics and Georgia law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 125 questions, 100 general and 25 Georgia",
    heroSubs: [
      "General topics plus Georgia rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the Pearson VUE Georgia property and casualty outline (#121102). Not affiliated with the Georgia Insurance Commissioner's office or Pearson VUE; confirm rules in official Georgia Insurance Commissioner's office materials.",
    analyticsKey: "pnc",
  },
};

const pncNC: ExamConfig = {
  id: "pnc-nc",
  variantOf: "pnc",
  jurisdiction: { code: "NC", name: "North Carolina" },
  stateCode: "PNC_NC",
  idBase: 5700,
  slug: "/property-casualty-insurance/nc",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "North Carolina Property & Casualty Insurance Practice Test",
  shortName: "NC P&C Insurance",
  examLabel: "North Carolina Property and Casualty",
  fullName: "North Carolina property and casualty agent exams",
  questionIdPrefix: "PCNC-",
  icon: pnc.icon,
  testCount: 1,
  questionsPerTest: 110,
  passPct: 70,
  // NC tests property (42 general + 13 NC) and casualty (40 + 15) separately, 55 items
  // each (outline #123415 eff. March 2, 2026); this combined form is both, 82 general + 28 NC.
  blueprint: {
    pcGeneral: 24,
    pcPolicy: 13,
    pcHomeowners: 19,
    pcAuto: 17,
    pcCommercial: 13,
    pcLiability: 15,
    pcOther: 9,
  },
  trainingSets: [
    { setNumber: 1, id: 5701, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 37, weightLabel: "34% of the practice exam" },
    { setNumber: 2, id: 5702, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 19, weightLabel: "17% of the practice exam" },
    { setNumber: 3, id: 5703, name: "Personal Auto", categories: ["pcAuto"], size: 17, weightLabel: "15% of the practice exam" },
    { setNumber: 4, id: 5704, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 37, weightLabel: "34% of the practice exam" },
  ],
  categoryLabels: pnc.categoryLabels,
  copy: {
    guestPrompt: "to save your North Carolina property & casualty progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 110 source-checked questions for North Carolina, general topics and North Carolina law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 110 questions, 82 general and 28 North Carolina",
    heroSubs: [
      "General topics plus North Carolina rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your Pearson VUE exam.",
    ],
    sourceLine: "Source-checked practice on the Pearson VUE North Carolina outlines (#123415, March 2026). Not affiliated with NCDOI or Pearson VUE; confirm rules in official NCDOI materials.",
    analyticsKey: "pnc",
  },
};

const pncMI: ExamConfig = {
  id: "pnc-mi",
  variantOf: "pnc",
  jurisdiction: { code: "MI", name: "Michigan" },
  stateCode: "PNC_MI",
  idBase: 5750,
  slug: "/property-casualty-insurance/mi",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "Michigan Property & Casualty Insurance Practice Test",
  shortName: "MI P&C Insurance",
  examLabel: "Michigan Property & Casualty",
  fullName: "Michigan property and casualty producer exam",
  questionIdPrefix: "PCMI-",
  icon: pnc.icon,
  testCount: 1,
  questionsPerTest: 150,
  passPct: 74,
  // PSI Michigan 16-81 outline: 150 items in 2.5 hours, 74% to pass. One integrated exam;
  // auto is mostly Michigan no-fault (2019 PA 21/22 as amended).
  blueprint: {
    pcGeneral: 32,
    pcPolicy: 29,
    pcHomeowners: 26,
    pcAuto: 22,
    pcCommercial: 19,
    pcLiability: 18,
    pcOther: 4,
  },
  trainingSets: [
    { setNumber: 1, id: 5751, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 61, weightLabel: "41% of the practice exam", partNames: ["Risk Basics & Michigan Producers", "Policy Provisions & Michigan Fire Law"] },
    { setNumber: 2, id: 5752, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 26, weightLabel: "17% of the practice exam" },
    { setNumber: 3, id: 5753, name: "Personal Auto", categories: ["pcAuto"], size: 22, weightLabel: "15% of the practice exam" },
    { setNumber: 4, id: 5754, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 41, weightLabel: "27% of the practice exam" },
  ],
  categoryLabels: pnc.categoryLabels,
  copy: {
    guestPrompt: "to save your Michigan property & casualty progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for Michigan, general topics and Michigan law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 113 general and 37 Michigan",
    heroSubs: [
      "General topics plus Michigan rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 74% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Michigan property and casualty outline (series 16-81, bulletin June 2025). Not affiliated with Michigan DIFS or PSI; confirm rules in official Michigan DIFS materials.",
    analyticsKey: "pnc",
  },
};

const pncNJ: ExamConfig = {
  id: "pnc-nj",
  variantOf: "pnc",
  jurisdiction: { code: "NJ", name: "New Jersey" },
  stateCode: "PNC_NJ",
  idBase: 5800,
  slug: "/property-casualty-insurance/nj",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "New Jersey Property & Casualty Insurance Practice Test",
  shortName: "NJ P&C Insurance",
  examLabel: "New Jersey Property and Casualty",
  fullName: "New Jersey property and casualty producer exams",
  questionIdPrefix: "PCNJ-",
  icon: pnc.icon,
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // NJ tests property (79: 50 general + 29 NJ) and casualty (91: 50 + 41) as separate PSI
  // exams; both together (170) capped at 150 keeping the ratio: 88 general, 62 NJ. PSI bulletin 9/8/2026.
  blueprint: {
    pcGeneral: 59,
    pcPolicy: 19,
    pcHomeowners: 17,
    pcAuto: 19,
    pcCommercial: 13,
    pcLiability: 18,
    pcOther: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 5801, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 78, weightLabel: "52% of the practice exam", partNames: ["Risk Basics & New Jersey Licensing", "New Jersey Regulation & Policy Provisions"] },
    { setNumber: 2, id: 5802, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 17, weightLabel: "11% of the practice exam" },
    { setNumber: 3, id: 5803, name: "Personal Auto", categories: ["pcAuto"], size: 19, weightLabel: "13% of the practice exam" },
    { setNumber: 4, id: 5804, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 36, weightLabel: "24% of the practice exam" },
  ],
  categoryLabels: pnc.categoryLabels,
  copy: {
    guestPrompt: "to save your New Jersey property & casualty progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for New Jersey, general topics and New Jersey law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 88 general and 62 New Jersey",
    heroSubs: [
      "General topics plus New Jersey rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI New Jersey property and casualty producer outlines (bulletin Sept 2026). Not affiliated with NJ DOBI or PSI; confirm rules in official NJ DOBI materials.",
    analyticsKey: "pnc",
  },
};

const pncVA: ExamConfig = {
  id: "pnc-va",
  variantOf: "pnc",
  jurisdiction: { code: "VA", name: "Virginia" },
  stateCode: "PNC_VA",
  idBase: 5850,
  slug: "/property-casualty-insurance/va",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "Virginia Property & Casualty Insurance Practice Test",
  shortName: "VA P&C Insurance",
  examLabel: "Virginia Property & Casualty",
  fullName: "Virginia property and casualty insurance agent exam",
  questionIdPrefix: "PCVA-",
  icon: pnc.icon,
  testCount: 1,
  questionsPerTest: 135,
  passPct: 70,
  // Prometric Series 11-03 (135 scored items, 2.5 hours, 70% cut per Prometric's 2025-26
  // report). Virginia law runs through the outline; 35 Virginia items from the lines citing it.
  blueprint: {
    pcGeneral: 34,
    pcPolicy: 16,
    pcHomeowners: 25,
    pcAuto: 21,
    pcCommercial: 17,
    pcLiability: 17,
    pcOther: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 5851, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 50, weightLabel: "37% of the practice exam" },
    { setNumber: 2, id: 5852, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 25, weightLabel: "19% of the practice exam" },
    { setNumber: 3, id: 5853, name: "Personal Auto", categories: ["pcAuto"], size: 21, weightLabel: "16% of the practice exam" },
    { setNumber: 4, id: 5854, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 39, weightLabel: "29% of the practice exam" },
  ],
  categoryLabels: pnc.categoryLabels,
  copy: {
    guestPrompt: "to save your Virginia property & casualty progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 135 source-checked questions for Virginia, general topics and Virginia law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 135 questions, 100 general and 35 Virginia",
    heroSubs: [
      "General topics plus Virginia rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your Prometric exam.",
    ],
    sourceLine: "Source-checked practice on the Prometric Virginia property and casualty outline (Series 11-03, March 2025). Not affiliated with the Virginia Bureau of Insurance or Prometric; confirm rules in official Virginia Bureau of Insurance materials.",
    analyticsKey: "pnc",
  },
};

const pncWA: ExamConfig = {
  id: "pnc-wa",
  variantOf: "pnc",
  jurisdiction: { code: "WA", name: "Washington" },
  stateCode: "PNC_WA",
  idBase: 5900,
  slug: "/property-casualty-insurance/wa",
  landingPath: "/property-casualty-insurance-practice-test",
  name: "Washington Property & Casualty Insurance Practice Test",
  shortName: "WA P&C Insurance",
  examLabel: "Washington Property & Casualty",
  fullName: "Washington property and casualty insurance producer exam",
  questionIdPrefix: "PCWA-",
  icon: pnc.icon,
  testCount: 1,
  questionsPerTest: 150,
  passPct: 70,
  // PSI Washington Property and Casualty Producer outline (eff. 4/1/2026): 150 items,
  // 45 of them Washington law; one combined score, 70% to pass. No workers' comp (state fund).
  blueprint: {
    pcGeneral: 40,
    pcPolicy: 23,
    pcHomeowners: 21,
    pcAuto: 32,
    pcCommercial: 14,
    pcLiability: 13,
    pcOther: 7,
  },
  trainingSets: [
    { setNumber: 1, id: 5901, name: "Basics, Underwriting & Policy Provisions", categories: ["pcGeneral", "pcPolicy"], size: 63, weightLabel: "42% of the practice exam", partNames: ["Risk, Contracts & Policy Provisions", "Washington Law & Producer Rules"] },
    { setNumber: 2, id: 5902, name: "Dwelling & Homeowners", categories: ["pcHomeowners"], size: 21, weightLabel: "14% of the practice exam" },
    { setNumber: 3, id: 5903, name: "Personal Auto", categories: ["pcAuto"], size: 32, weightLabel: "21% of the practice exam" },
    { setNumber: 4, id: 5904, name: "Commercial Lines & Other Coverages", categories: ["pcCommercial", "pcLiability", "pcOther"], size: 34, weightLabel: "23% of the practice exam" },
  ],
  categoryLabels: pnc.categoryLabels,
  copy: {
    guestPrompt: "to save your Washington property & casualty progress and track every question you miss",
    trainingHeading: "Train by content area",
    trainingSub: "Four sets with 150 source-checked questions for Washington, general topics and Washington law. Missed questions come back until you master them.",
    testsHeading: "Full-length practice exam \u00b7 150 questions, 105 general and 45 Washington",
    heroSubs: [
      "General topics plus Washington rules.",
      "Master each set, then take the full exam.",
      "Halfway there. Try the full test.",
      "Fix the misses, then retake. 70% passes.",
      "All done. Go schedule your PSI exam.",
    ],
    sourceLine: "Source-checked practice on the PSI Washington property and casualty outline (April 2026). Not affiliated with the Washington OIC or PSI; confirm rules in official Washington OIC materials.",
    analyticsKey: "pnc",
  },
};
// --- end state variants batch 2 ---

export const EXAMS: ExamConfig[] = [cdl, cdlx, moto, civics, part107, ham, epa608, cna, ptcb, phleb, ccma, cet, danb, foodmgr, realestate, insurance, notary, foodhandler, boating, hunter, cpr, osha, forklift, alcohol, security, lifeguard, pnc, cosmetology, vtne, htl, cst, crcst];

/** State variants (see realestateCA). Not in EXAMS: one catalog entry per family. */
export const EXAM_VARIANTS: ExamConfig[] = [realestateCA, realestateNJ, realestateTX, realestateFL, realestateNY, insuranceTX, insuranceFL, insuranceCA, pncTX, pncFL, pncCA, realestatePA, realestateIL, realestateOH, realestateGA, realestateNC, realestateMI, realestateVA, realestateWA, realestateAZ, realestateTN, insuranceNY, insurancePA, insuranceIL, insuranceOH, insuranceGA, insuranceNC, insuranceMI, insuranceNJ, insuranceVA, insuranceWA, pncNY, pncPA, pncIL, pncOH, pncGA, pncNC, pncMI, pncNJ, pncVA, pncWA];
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
    (e) =>
      pathname === e.slug ||
      pathname.startsWith(`${e.slug}/`) ||
      pathname === e.landingPath ||
      Object.values(e.translations ?? {}).some((tr) => tr.landingPath === pathname)
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

/** Display name: the part's own name ("Night Driving") when the set has
 *  `partNames`, else "Safe Driving & Hazards, part 2 of 3". */
export function trainingPartName(p: TrainingPart, lang: Language = "en"): string {
  if (p.partCount === 1) return p.set.name;
  const own = p.set.partNames?.[p.part - 1];
  if (own) return own;
  if (lang === "es") return `${p.set.name}, parte ${p.part} de ${p.partCount}`;
  if (lang === "vi") return `${p.set.name}, phần ${p.part}/${p.partCount}`;
  if (lang === "ko") return `${p.set.name}, ${p.partCount}부 중 ${p.part}부`;
  if (lang === "zh") return `${p.set.name}，第 ${p.part} 部分（共 ${p.partCount} 部分）`;
  return `${p.set.name}, part ${p.part} of ${p.partCount}`;
}

/** Languages an exam is offered in, English first. */
export function examLanguages(exam: ExamConfig): Language[] {
  return ["en", ...(Object.keys(exam.translations ?? {}) as Language[])];
}

/** The language an exam's content shows in: the person's choice when the
 *  exam is offered in it, English otherwise. */
export function examLanguage(exam: ExamConfig, language: Language): Language {
  return examLanguages(exam).includes(language) ? language : "en";
}

const localized = new Map<string, ExamConfig>();

/** The exam with its copy, set names and category labels in `lang`. IDs,
 *  blueprint and everything else stay as they are. */
export function localizeExam(exam: ExamConfig, lang: Language): ExamConfig {
  const tr = lang === "en" ? undefined : exam.translations?.[lang];
  if (!tr) return exam;
  const key = `${exam.id}:${lang}`;
  const cached = localized.get(key);
  if (cached) return cached;
  const result: ExamConfig = {
    ...exam,
    name: tr.name,
    examLabel: tr.examLabel,
    fullName: tr.fullName,
    // English part names never show in another language: a translation
    // brings its own or the part falls back to "<set>, parte 2 de 3".
    trainingSets: exam.trainingSets.map((s) =>
      s.test !== undefined
        ? { ...s, name: TEST_SET_NAMES[lang](s.setNumber) }
        : { ...s, partNames: undefined, ...tr.trainingSets?.[s.setNumber] }
    ),
    categoryLabels: { ...exam.categoryLabels, ...tr.categoryLabels },
    copy: { ...exam.copy, ...tr.copy },
  };
  localized.set(key, result);
  return result;
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
