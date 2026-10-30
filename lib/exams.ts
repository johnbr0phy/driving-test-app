/**
 * Registry of the non-DMV exams that run on the shared Tigertest
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

export type ExamId = "realestate-ca" | "realestate-nj" | "realestate-tx" | "realestate-fl" | "realestate-ny" | "insurance-tx" | "insurance-fl" | "insurance-ca" | "pnc-tx" | "pnc-fl" | "pnc-ca" | "realestate-pa" | "realestate-il" | "realestate-oh" | "realestate-ga" | "realestate-nc" | "realestate-mi" | "realestate-va" | "realestate-wa" | "realestate-az" | "realestate-tn" | "insurance-ny" | "insurance-pa" | "insurance-il" | "insurance-oh" | "insurance-ga" | "insurance-nc" | "insurance-mi" | "insurance-nj" | "insurance-va" | "insurance-wa" | "pnc-ny" | "pnc-pa" | "pnc-il" | "pnc-oh" | "pnc-ga" | "pnc-nc" | "pnc-mi" | "pnc-nj" | "pnc-va" | "pnc-wa" | "cdl" | "cdlx" | "moto" | "civics" | "part107" | "ham" | "epa608" | "cna" | "ptcb" | "phleb" | "ccma" | "cet" | "danb" | "foodmgr" | "realestate" | "insurance" | "notary" | "foodhandler" | "boating" | "hunter" | "cpr" | "osha" | "forklift" | "alcohol" | "security" | "lifeguard" | "pnc" | "cosmetology" | "vtne" | "ukcar" | "ukmoto" | "uklgv" | "ukpcv" | "ukadi" | "caon" | "caqc" | "cabc" | "caab" | "camb" | "aunsw" | "auvic" | "auqld" | "auwa" | "ausa" | "uksia" | "uk18ed" | "cscs" | "ukfood" | "ukaplh" | "ukfaw" | "ukcare" | "capal" | "caelec" | "capsw" | "casfa" | "cawhmis" | "caguard" | "caauto" | "caplumb" | "cacarp" | "caweld" | "auwhite" | "aursa" | "aurcg" | "aufss" | "aufirstaid" | "auforklift" | "auwah" | "uklitu" | "cacit" | "aucit" | "gulfrn" | "inrto" | "htl" | "cst" | "crcst";

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
  icon: "truck" | "bike" | "flag" | "plane" | "radio" | "thermometer" | "heart" | "pill" | "syringe" | "stethoscope" | "activity" | "tooth" | "siren" | "utensils" | "house" | "umbrella" | "stamp" | "graduation" | "cloud" | "cpu" | "chef" | "sailboat" | "target" | "lock" | "book" | "medal" | "bandage" | "hardhat" | "forklift" | "wine" | "pencil" | "badge" | "lifebuoy" | "building" | "microscope" | "scissors" | "shield" | "sparkles" | "paw" | "calculator" | "car" | "bus";
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

const auwa: ExamConfig = {
  id: "auwa",
  stateCode: "AUWA",
  idBase: 7500,
  slug: "/wa-learners",
  landingPath: "/wa-learners-practice-test",
  name: "WA Learner's Practice Test",
  shortName: "WA Learners",
  examLabel: "WA learner's test",
  fullName: "Western Australia learner's permit theory test (Computerised Theory Test)",
  questionIdPrefix: "AUWA-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Western Australia car (C class) learner's permit Computerised Theory Test, Department of
  // Transport and Major Infrastructure, Driver and Vehicle Services: 30 multiple-choice questions on
  // the road rules and safe driving, 24 correct to pass (80%), a pass valid 5 years (transport.wa.gov.au,
  // Take the theory test, read Oct 2026). Questions come from Drive Safe: A handbook for Western
  // Australian road users, revised edition 5 August 2026. DTMI publishes no topic weighting, so the eight
  // categories follow the handbook's parts: licensing and demerits (Part 2, 5), alcohol, fatigue and
  // restraints (Part 1), speed and conditions (3.1 to 3.3), signs, signals and markings (3.8 to 3.10),
  // intersections, roundabouts and railway crossings, lanes, overtaking and freeways, sharing the road,
  // and stopping, parking and emergencies (3.17 to 3.19, Part 4). The separate Hazard Perception Test
  // (video clips) is not modelled.
  blueprint: {
    auwaLicence: 7,
    auwaSafety: 7,
    auwaSpeed: 6,
    auwaSigns: 7,
    auwaIntersect: 8,
    auwaLanes: 5,
    auwaSharing: 5,
    auwaParking: 5,
  },
  trainingSets: testSets(7500, 4),
  categoryLabels: {
    auwaLicence: "Licences, P Plates & Demerits",
    auwaSafety: "Alcohol, Fatigue & Seat Belts",
    auwaSpeed: "Speed, Space & Conditions",
    auwaSigns: "Signs, Signals & Markings",
    auwaIntersect: "Intersections & Roundabouts",
    auwaLanes: "Lanes, Overtaking & Freeways",
    auwaSharing: "Sharing the Road",
    auwaParking: "Parking, Crashes & Emergencies",
  },
  copy: {
    guestPrompt: "to save your WA learner's test progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on, covering the road rules in the Drive Safe handbook. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions on the Drive Safe road rules",
    heroSubs: [
      "Eight topics, four tests. Give way and intersections come up most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your theory test at a DVS centre.",
    ],
    sourceLine: "Based on Drive Safe, the WA road users' handbook (edition of 5 August 2026). The real test is 30 questions and you need 24 right (80%). The Hazard Perception Test is not modelled.",
    analyticsKey: "auwa",
  },
};

const camb: ExamConfig = {
  id: "camb",
  stateCode: "CAMB",
  idBase: 6600,
  slug: "/manitoba-class-5",
  landingPath: "/manitoba-class-5-practice-test",
  name: "Manitoba Class 5 Practice Test",
  shortName: "MB Class 5",
  examLabel: "Manitoba Class 5",
  fullName: "Manitoba Class 5 learner knowledge test",
  questionIdPrefix: "CAMB-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Manitoba Public Insurance (MPI) Driver's Handbook, DVL0019, edition dated 20/10/2026
  // (mpi.mb.ca/en/PDFs/completehandbook.pdf). The Class 5 knowledge test assesses
  // traffic laws, safe driving practices and road signs; it is computer based, 30 minutes,
  // not open book, $12, and is reported as 30 multiple-choice questions. MPI publishes no
  // topic weighting or pass mark (prep sites say 24 or 25 of 30), so the blueprint follows
  // the handbook's chapters: signs and signals 20%, right-of-way and turning 18%, sharing
  // the road 16%, GDL and licensing 12%, speed, parking and equipment 12%, poor conditions
  // and emergencies 12%, impaired and distracted driving 10%. 80% is a practice target.
  blueprint: {
    cambLicence: 6,
    cambSigns: 10,
    cambRules: 9,
    cambSharing: 8,
    cambSpeed: 6,
    cambConditions: 6,
    cambImpaired: 5,
  },
  trainingSets: testSets(6600, 4),
  categoryLabels: {
    cambLicence: "Licensing & GDL",
    cambSigns: "Signs, Signals & Markings",
    cambRules: "Right-of-Way, Turns & Passing",
    cambSharing: "Sharing the Road",
    cambSpeed: "Speed, Parking & Equipment",
    cambConditions: "Poor Conditions & Emergencies",
    cambImpaired: "Impaired & Distracted Driving",
  },
  copy: {
    guestPrompt: "to save your Manitoba Class 5 progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Every set covers signs, right-of-way, sharing the road, GDL rules, parking, winter driving and impaired driving. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions from the MPI Driver's Handbook",
    heroSubs: [
      "Seven handbook topics, four tests. Signs and right-of-way come up most.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your knowledge test with an Autopac agent.",
    ],
    sourceLine: "Based on the MPI Driver's Handbook (October 2026 edition). MPI does not publish a pass mark; 80% here is a practice target.",
    analyticsKey: "camb",
  },
};

const caon: ExamConfig = {
  id: "caon",
  stateCode: "CAON",
  idBase: 6200,
  slug: "/ontario-g1",
  landingPath: "/ontario-g1-practice-test",
  name: "Ontario G1 Practice Test",
  shortName: "G1",
  examLabel: "Ontario G1",
  fullName: "Ontario G1 driver's knowledge test",
  questionIdPrefix: "CAON-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // The Official MTO Driver's Handbook (ontario.ca, chapters updated March to September 2026) and
  // the DriveTest knowledge test rules: multiple choice, a road signs section and a rules of the
  // road section, 80% total score to pass, not timed. DriveTest publishes no question count (40,
  // 20 per section, is the usual report). Here signs plus lights and markings are 22 of 50 and the
  // rules of the road 28, the rules split by the handbook's own topic list (licensing and demerits,
  // right-of-way, sharing the road, safe driving, night, weather and emergencies).
  blueprint: {
    caonSigns: 14,
    caonSignals: 8,
    caonLicence: 7,
    caonRightOfWay: 5,
    caonSharing: 6,
    caonDriving: 6,
    caonConditions: 4,
  },
  trainingSets: testSets(6200, 4),
  categoryLabels: {
    caonSigns: "Traffic Signs",
    caonSignals: "Lights, Signals & Markings",
    caonLicence: "Licensing, Demerits & Alcohol",
    caonRightOfWay: "Intersections & Right-of-Way",
    caonSharing: "Sharing the Road",
    caonDriving: "Safe Driving & Parking",
    caonConditions: "Night, Weather & Emergencies",
  },
  copy: {
    guestPrompt: "to save your G1 progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions on Ontario signs and rules",
    heroSubs: [
      "Signs and rules of the road, four tests. You need 80% on the real one.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your G1 test at DriveTest.",
    ],
    sourceLine: "Based on the Official MTO Driver's Handbook (2026). The real G1 knowledge test needs an 80% total score.",
    analyticsKey: "caon",
  },
};

const caab: ExamConfig = {
  id: "caab",
  stateCode: "CAAB",
  idBase: 6400,
  slug: "/alberta-class-7",
  landingPath: "/alberta-class-7-practice-test",
  name: "Alberta Class 7 Practice Test",
  shortName: "AB Class 7",
  examLabel: "Alberta Class 7",
  fullName: "Alberta Class 7 learner's licence knowledge test",
  questionIdPrefix: "CAAB-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 83,
  // Alberta Class 7 learner's knowledge test: 30 multiple-choice questions on a computer at a
  // registry agent, 25 of 30 to pass (83%), one attempt per day (alberta.ca/drivers-knowledge-test).
  // Questions come from the Driver's Guide: cars and light trucks, Spring 2026 (Government of
  // Alberta, Transportation and Economic Corridors, published May 2026, updated June 15, 2026),
  // which says the test covers safe driving practices, driving laws and road signs. Categories
  // follow the guide's chapters: licensing and GDL (ch. 1), signals, signs and markings (ch. 2),
  // basics, intersections and highways (ch. 3 to 5), emergencies (ch. 6), sharing the road
  // (ch. 7 to 8) and driving within the law (ch. 9). Alberta publishes no per-topic weighting.
  blueprint: {
    caabLicensing: 5,
    caabSignals: 6,
    caabSigns: 7,
    caabRightOfWay: 9,
    caabDriving: 8,
    caabEmergency: 6,
    caabSharing: 5,
    caabLaw: 4,
  },
  trainingSets: testSets(6400, 4),
  categoryLabels: {
    caabLicensing: "Licensing & GDL",
    caabSignals: "Signals & Pavement Markings",
    caabSigns: "Traffic Signs & Speed Limits",
    caabRightOfWay: "Intersections, Turns & Right-of-Way",
    caabDriving: "Driving Basics, Parking & Highways",
    caabEmergency: "Emergencies & Challenging Conditions",
    caabSharing: "Sharing the Road",
    caabLaw: "Impaired Driving, Demerits & the Law",
  },
  copy: {
    guestPrompt: "to save your Alberta Class 7 progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions from the Alberta Driver's Guide",
    heroSubs: [
      "Signs, signals, right-of-way and GDL rules, straight from the Driver's Guide.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your knowledge test at a registry agent.",
    ],
    sourceLine: "Based on the Alberta Driver's Guide (cars and light trucks, Spring 2026). The real test is 30 questions and needs 25 correct (83%).",
    analyticsKey: "caab",
  },
};

const ukmoto: ExamConfig = {
  id: "ukmoto",
  stateCode: "UKMOTO",
  idBase: 6800,
  slug: "/uk-motorcycle-theory",
  landingPath: "/uk-motorcycle-theory-test",
  name: "UK Motorcycle Theory Test",
  shortName: "UK Moto",
  examLabel: "UK motorcycle theory",
  fullName: "UK DVSA motorcycle theory test",
  questionIdPrefix: "UKMOTO-",
  icon: "bike",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 86,
  // DVSA motorcycle theory test, multiple-choice part (GOV.UK, checked October 2026):
  // 50 questions in 57 minutes, pass mark 43 of 50 (86%). From 5 November 2026
  // three of the 50 are based on a short silent video (before then, a 5-question
  // case study); neither is modelled here, nor the hazard perception part
  // (14 clips, 44 of 75 to pass). Questions are drawn from The Highway Code,
  // Know your traffic signs and Riding - the essential skills. DVSA's 14 topics
  // (alertness, attitude, hazard awareness, safety and your motorcycle, motorcycle
  // loading, safety margins, road conditions and motorcycle handling, vulnerable
  // road users, other types of vehicle, rules of the road, motorway rules, road
  // and traffic signs, documents, incidents accidents and emergencies) are merged
  // into seven. DVSA publishes no per-topic weighting; counts follow the size of
  // each topic group. All questions are original, not from the licensed DVSA bank.
  blueprint: {
    ukmotoAware: 8,
    ukmotoMachine: 8,
    ukmotoHandling: 8,
    ukmotoVulnerable: 6,
    ukmotoRules: 8,
    ukmotoSigns: 7,
    ukmotoDocs: 5,
  },
  trainingSets: testSets(6800, 4),
  categoryLabels: {
    ukmotoAware: "Alertness, Attitude & Hazards",
    ukmotoMachine: "Your Motorcycle & Loading",
    ukmotoHandling: "Safety Margins & Handling",
    ukmotoVulnerable: "Vulnerable Road Users & Other Vehicles",
    ukmotoRules: "Rules of the Road & Motorways",
    ukmotoSigns: "Road & Traffic Signs",
    ukmotoDocs: "Documents, Incidents & Emergencies",
  },
  copy: {
    guestPrompt: "to save your motorcycle theory progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on, across all seven DVSA topic groups. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 43 to pass, like the real multiple-choice part",
    heroSubs: [
      "Seven topic groups, four tests. You need 43 of 50 to pass.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Practise hazard perception, then book.",
    ],
    sourceLine: "Based on the DVSA motorcycle theory test and The Highway Code, checked October 2026. Hazard perception and the video questions are not included.",
    analyticsKey: "ukmoto",
  },
};

const aunsw: ExamConfig = {
  id: "aunsw",
  stateCode: "AUNSW",
  idBase: 7200,
  slug: "/nsw-dkt",
  landingPath: "/nsw-dkt-practice-test",
  name: "NSW DKT Practice Test",
  shortName: "NSW DKT",
  examLabel: "NSW DKT",
  fullName: "NSW Driver Knowledge Test (DKT)",
  questionIdPrefix: "AUNSW-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 91,
  // Transport for NSW Road User Handbook (English edition, PDF dated February 2026,
  // nsw.gov.au), which the handbook says prepares you for the Driver Knowledge Test.
  // The in-person test is 45 questions: 15 general knowledge (12 must be right) and 30
  // road safety (29 must be right), 41 of 45 overall, so passPct is 91. Categories follow
  // the handbook chapters: licences and penalties, speed, alcohol/drugs/fatigue/phones,
  // giving way, sharing the road, overtaking and lanes, parking, hazards and vehicles.
  // The Hazard Perception Test (video) is a separate test and is not modelled.
  blueprint: {
    nswLicence: 6,
    nswSpeed: 6,
    nswImpair: 7,
    nswGiveWay: 9,
    nswSharing: 6,
    nswLanes: 7,
    nswParking: 4,
    nswHazards: 5,
  },
  trainingSets: testSets(7200, 4),
  categoryLabels: {
    nswLicence: "Licences, Penalties & Seatbelts",
    nswSpeed: "Speed Limits & Safe Distance",
    nswImpair: "Alcohol, Drugs, Fatigue & Phones",
    nswGiveWay: "Giving Way, Intersections & Crossings",
    nswSharing: "Sharing the Road",
    nswLanes: "Overtaking, Lanes & Motorways",
    nswParking: "Parking & Stopping",
    nswHazards: "Hazards, Crashes & Your Vehicle",
  },
  copy: {
    guestPrompt: "to save your NSW DKT progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each covering every Road User Handbook topic: licences and P plate rules, speed, alcohol and fatigue, giving way, sharing the road, lanes, parking and hazards. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across the Road User Handbook",
    heroSubs: [
      "Eight handbook topics, four tests. Giving way is the biggest.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "The DKT needs 29 of 30 road safety. Fix the misses.",
      "All done. Book your DKT or start it online.",
    ],
    sourceLine: "Based on the Transport for NSW Road User Handbook (2026 edition). The real DKT needs 12 of 15 general knowledge and 29 of 30 road safety questions right; 91% here matches 41 of 45.",
    analyticsKey: "aunsw",
  },
};

const cabc: ExamConfig = {
  id: "cabc",
  stateCode: "CABC",
  idBase: 6300,
  slug: "/icbc",
  landingPath: "/icbc-practice-test",
  name: "ICBC Practice Test",
  shortName: "ICBC",
  examLabel: "ICBC knowledge test",
  fullName: "ICBC Class 7L knowledge test (British Columbia)",
  questionIdPrefix: "CABC-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // ICBC Class 7L passenger vehicle knowledge test, British Columbia: 50 multiple-choice
  // questions from Learn to Drive Smart (ICBC), 40 correct to pass (80%), 45 minutes, 12 languages
  // (ICBC tip sheet MV2654, June 2026; MV2022, October 2026). Categories follow the handbook's
  // chapters: signs, signals and road markings (ch 3), intersections and
  // right-of-way and lanes and parking (ch 4), see-think-do (ch 5), sharing the road (ch 6), personal
  // strategies and impairment (ch 7), emergency strategies (ch 8), and your licence and vehicle (ch 2, 9).
  // GLP items follow the ICBC changes effective October 19, 2026 (Driving Record Assessment, supervisor 22+).
  blueprint: {
    cabcSigns: 10,
    cabcRow: 7,
    cabcLanes: 6,
    cabcSafe: 7,
    cabcShare: 7,
    cabcImpair: 4,
    cabcEmerg: 5,
    cabcLicence: 4,
  },
  trainingSets: testSets(6300, 4),
  categoryLabels: {
    cabcSigns: "Signs, Signals & Road Markings",
    cabcRow: "Intersections & Right-of-Way",
    cabcLanes: "Lanes, Passing & Parking",
    cabcSafe: "See-Think-Do & Speed",
    cabcShare: "Sharing the Road",
    cabcImpair: "Impairment & Distraction",
    cabcEmerg: "Emergencies & Conditions",
    cabcLicence: "Your Licence, GLP & Vehicle",
  },
  copy: {
    guestPrompt: "to save your ICBC knowledge test progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 40 to pass, like the real ICBC test",
    heroSubs: [
      "Signs, right-of-way and sharing the road, straight from Learn to Drive Smart.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your knowledge test.",
    ],
    sourceLine: "Based on ICBC's Learn to Drive Smart and the 50-question, 40-to-pass Class 7L knowledge test, with GLP rules as of October 19, 2026.",
    analyticsKey: "cabc",
  },
};

const ukpcv: ExamConfig = {
  id: "ukpcv",
  stateCode: "UKPCV",
  idBase: 7000,
  slug: "/pcv-theory",
  landingPath: "/pcv-theory-test",
  name: "PCV Theory Practice Test",
  shortName: "PCV Theory",
  examLabel: "PCV theory test",
  fullName: "UK bus and coach (PCV) theory test, multiple-choice part",
  questionIdPrefix: "UKPCV-",
  icon: "bus",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 85,
  // DVSA Driver CPC Part 1 theory test for buses and coaches (GOV.UK, checked Oct 2026):
  // 100 multiple-choice questions in 1 hour 55 minutes, pass mark 85/100. Questions come from
  // The Highway Code, Know your traffic signs and The Official DVSA Guide to Driving Buses and
  // Coaches. DVSA's bus and coach topics (weights and dimensions, drivers' hours and rest,
  // braking, the driver, carrying passengers, the road, incidents, vehicle condition, leaving
  // the vehicle, restricted view, documents, environment, other road users, signs) are merged
  // into seven categories. The separate hazard perception part (19 clips, 67/100) is not modelled.
  // Rules: assimilated (EU 561/2006) and GB domestic drivers' hours, GOV.UK speed limits and
  // drink-drive limits. All questions are original, not from the licensed DVSA revision bank.
  blueprint: {
    ukpcvHours: 8,
    ukpcvVehicle: 8,
    ukpcvPassengers: 8,
    ukpcvDriver: 6,
    ukpcvRoad: 8,
    ukpcvIncidents: 5,
    ukpcvSigns: 7,
  },
  trainingSets: testSets(7000, 4),
  categoryLabels: {
    ukpcvHours: "Drivers' Hours, Tachographs & Documents",
    ukpcvVehicle: "Vehicle Size, Condition & Brakes",
    ukpcvPassengers: "Carrying Passengers",
    ukpcvDriver: "The Driver & the Environment",
    ukpcvRoad: "The Road, Restricted View & Other Road Users",
    ukpcvIncidents: "Incidents, Emergencies & Leaving the Vehicle",
    ukpcvSigns: "Road & Traffic Signs",
  },
  copy: {
    guestPrompt: "to save your PCV theory progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across every bus and coach topic",
    heroSubs: [
      "Seven topics, four tests. Drivers' hours and passengers come up again and again.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "The real pass mark is 85. Fix the misses, then retake.",
      "All done. Book your theory test.",
    ],
    sourceLine: "Based on the DVSA bus and coach theory topics, The Highway Code and GOV.UK drivers' hours rules, checked October 2026. Multiple-choice part only; hazard perception is not included.",
    analyticsKey: "ukpcv",
  },
};

const ukcar: ExamConfig = {
  id: "ukcar",
  stateCode: "UKCAR",
  idBase: 6700,
  slug: "/uk-theory",
  landingPath: "/uk-driving-theory-test",
  name: "UK Theory Test Practice",
  shortName: "Theory Test",
  examLabel: "UK car theory test",
  fullName: "DVSA car theory test (multiple-choice part)",
  questionIdPrefix: "UKCAR-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 86,
  // DVSA car theory test, multiple-choice part (gov.uk/theory-test, checked Oct 2026):
  // 50 questions in 57 minutes, 3 of them on a short silent video; pass 43 of 50 (86%).
  // The hazard perception part (14 clips, 44 of 75) is not modelled. Questions come from
  // The Highway Code (GB edition, incl. the January 2022 hierarchy of road users),
  // Know Your Traffic Signs and Driving: the essential skills. DVSA's 14 topics are merged
  // into 8 categories; DVSA publishes no per-topic weights, so counts are ours. All items original.
  blueprint: {
    ukcarAlert: 5,
    ukcarVehicle: 6,
    ukcarMargins: 7,
    ukcarHazard: 8,
    ukcarMotorway: 5,
    ukcarRules: 8,
    ukcarSigns: 6,
    ukcarEmerg: 5,
  },
  trainingSets: testSets(6700, 4),
  categoryLabels: {
    ukcarAlert: "Alertness & Attitude",
    ukcarVehicle: "Safety & Your Vehicle",
    ukcarMargins: "Safety Margins & Vehicle Handling",
    ukcarHazard: "Hazards & Vulnerable Road Users",
    ukcarMotorway: "Motorway Rules",
    ukcarRules: "Rules of the Road",
    ukcarSigns: "Road & Traffic Signs",
    ukcarEmerg: "Documents, Incidents & Emergencies",
  },
  copy: {
    guestPrompt: "to save your theory test progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all eight topic groups. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 43 to pass, like the real multiple-choice part",
    heroSubs: [
      "Eight topic groups, four mock tests. You need 43 of 50 to pass.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Practise hazard perception and book your test.",
    ],
    sourceLine: "Based on The Highway Code, Know Your Traffic Signs and DVSA's 14 theory test topics. Original questions; the hazard perception part is not modelled.",
    analyticsKey: "ukcar",
  },
};

const ukadi: ExamConfig = {
  id: "ukadi",
  stateCode: "UKADI",
  idBase: 7100,
  slug: "/adi-part-1",
  landingPath: "/adi-part-1-practice-test",
  name: "ADI Part 1 Practice Test",
  shortName: "ADI Part 1",
  examLabel: "ADI part 1",
  fullName: "DVSA Approved Driving Instructor (ADI) part 1 theory test",
  questionIdPrefix: "UKADI-",
  icon: "graduation",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 85,
  // DVSA ADI part 1 theory test (gov.uk/adi-part-1-test, checked October 2026): 100 multiple-choice
  // questions in 1 hour 30 minutes, 25 in each of four bands: road procedure; traffic signs and signals,
  // car control, pedestrians and mechanical knowledge; driving test, disabilities and the law; publications
  // and instructional techniques. Pass is 85 of 100 overall and at least 20 of 25 in every band. Each band
  // is split in two here, keeping the bands at 13/12/13/12 of 50. Content from the Highway Code, Know Your
  // Traffic Signs, the DVSA national standards, the ADI code of practice and the ADI part 2 and 3 rules.
  // The hazard perception part (14 clips, 57 of 75) is not modelled. All questions are original; DVSA's
  // licensed revision bank was not used.
  blueprint: {
    ukadiRoad: 7,
    ukadiConditions: 6,
    ukadiSigns: 6,
    ukadiControl: 6,
    ukadiTest: 6,
    ukadiLaw: 7,
    ukadiPublications: 6,
    ukadiInstruction: 6,
  },
  trainingSets: testSets(7100, 4),
  categoryLabels: {
    ukadiRoad: "Road Procedure",
    ukadiConditions: "Speed, Motorways & Conditions",
    ukadiSigns: "Traffic Signs & Signals",
    ukadiControl: "Car Control, Pedestrians & Mechanical",
    ukadiTest: "The Driving Test",
    ukadiLaw: "Disabilities & the Law",
    ukadiPublications: "Publications & ADI Rules",
    ukadiInstruction: "Instructional Techniques",
  },
  copy: {
    guestPrompt: "to save your ADI part 1 progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on, across all four DVSA bands. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across the four DVSA bands",
    heroSubs: [
      "Four bands, four tests. You need 85% overall and 80% in every band.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your ADI part 1.",
    ],
    sourceLine: "Based on the DVSA ADI part 1 test: 100 questions in four bands of 25, pass 85 overall and 20 in each band. The hazard perception part is not modelled here.",
    analyticsKey: "ukadi",
  },
};

const auvic: ExamConfig = {
  id: "auvic",
  stateCode: "AUVIC",
  idBase: 7300,
  slug: "/vic-learner-permit",
  landingPath: "/vic-learner-permit-practice-test",
  name: "Victoria Learner Permit Practice Test",
  shortName: "Vic Ls",
  examLabel: "Victoria learner permit",
  fullName: "Victorian Learner Permit Knowledge Test (VicRoads)",
  questionIdPrefix: "AUVIC-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 78,
  // VicRoads Learner Permit Knowledge Test: 32 multiple-choice questions on road law and
  // road safety, 25 correct (78%) to pass, plus an eyesight test; at least 16 years old
  // (online course enrolment from 15 years 11 months). Questions are drawn from Road to Solo
  // Driving (VicRoads / Department of Transport and Planning, edition dated September 2026).
  // VicRoads publishes no topic weighting, so the per-test counts follow the handbook's
  // chapters: licensing and the Graduated Licensing System, managing risk (alcohol, drugs,
  // fatigue, safe driving), speed, signs and markings with parking, give way rules, turning
  // and freeways, and sharing the road. The Hazard Perception Test (P licence stage) is not modelled.
  blueprint: {
    auvicLicence: 6,
    auvicAlcohol: 5,
    auvicSafe: 7,
    auvicSpeed: 4,
    auvicSigns: 7,
    auvicGiveWay: 8,
    auvicTurning: 6,
    auvicSharing: 7,
  },
  trainingSets: testSets(7300, 4),
  categoryLabels: {
    auvicLicence: "Licences & Learner Rules",
    auvicAlcohol: "Alcohol, Drugs & Fatigue",
    auvicSafe: "Safe Driving & Hazards",
    auvicSpeed: "Speed Limits",
    auvicSigns: "Signs, Markings & Parking",
    auvicGiveWay: "Give Way & Intersections",
    auvicTurning: "Turning, Overtaking & Freeways",
    auvicSharing: "Sharing the Road",
  },
  copy: {
    guestPrompt: "to save your learner permit progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions on Victorian road rules",
    heroSubs: [
      "Eight topics from Road to Solo Driving, four tests of 50.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your learner permit test.",
    ],
    sourceLine: "Based on Road to Solo Driving (VicRoads, September 2026 edition). The real test is 32 questions and needs 25 correct (78%).",
    analyticsKey: "auvic",
  },
};

const ausa: ExamConfig = {
  id: "ausa",
  stateCode: "AUSA",
  idBase: 7600,
  slug: "/sa-learners",
  landingPath: "/sa-learners-practice-test",
  name: "SA Learner's Practice Test",
  shortName: "SA Learners",
  examLabel: "SA learner's test",
  fullName: "South Australia learner's theory test",
  questionIdPrefix: "AUSA-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // South Australia learner's theory test, Department for Infrastructure and Transport (mylicence.sa.gov.au,
  // read Oct 2026). At Service SA it is 50 questions: Part 1 is 8 give-way diagram questions that must all
  // be correct, Part 2 is 42 multiple-choice questions on road rules and safe driving, 32 correct to pass
  // (40 of 50, so 80% here; the all-8 give-way rule is not modelled). The online myLs route ends in a
  // 30-question test needing 27 correct. Questions come from The Driver's Handbook (February 2026 edition).
  // DIT publishes no topic weighting beyond the 8 give-way items, so giving way is 8 per test and the
  // other 42 follow the handbook's road rules and licensing chapters: licensing and demerits, speed
  // limits and following distance, signs, signals and markings, lanes, turning and overtaking, sharing
  // the road (trams, bike riders, trucks, trains), parking, and alcohol, phones and safe driving.
  // The separate Hazard Perception Test (needed before P1) is not modelled.
  blueprint: {
    ausaGiveWay: 8,
    ausaLicence: 7,
    ausaSpeed: 6,
    ausaSigns: 7,
    ausaRoad: 7,
    ausaShare: 6,
    ausaParking: 3,
    ausaSafety: 6,
  },
  trainingSets: testSets(7600, 4),
  categoryLabels: {
    ausaGiveWay: "Giving Way",
    ausaLicence: "Learner, P1 & P2 Rules",
    ausaSpeed: "Speed Limits & Following Distance",
    ausaSigns: "Signs, Signals & Markings",
    ausaRoad: "Lanes, Turning & Overtaking",
    ausaShare: "Sharing the Road",
    ausaParking: "Parking & Stopping",
    ausaSafety: "Alcohol, Phones & Safe Driving",
  },
  copy: {
    guestPrompt: "to save your SA learner's test progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on, covering giving way and the road rules in The Driver's Handbook. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions like the Service SA test",
    heroSubs: [
      "Eight topics, four tests. Giving way comes first, like the real test.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your theory test or finish myLs.",
    ],
    sourceLine: "Based on The Driver's Handbook (South Australia, February 2026 edition). The Service SA test is 50 questions: all 8 give-way questions right and 32 of the other 42. The Hazard Perception Test is not modelled.",
    analyticsKey: "ausa",
  },
};

const auqld: ExamConfig = {
  id: "auqld",
  stateCode: "AUQLD",
  idBase: 7400,
  slug: "/qld-learner-licence",
  landingPath: "/qld-learner-licence-practice-test",
  name: "QLD Learner Licence Practice Test",
  shortName: "QLD Learner",
  examLabel: "QLD learner licence",
  fullName: "Queensland written road rules test (class C learner licence)",
  questionIdPrefix: "AUQLD-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 90,
  // Queensland Department of Transport and Main Roads (TMR) class C written road rules test and PrepL
  // (qld.gov.au/transport/licensing/getting/tests, updated 1 October 2026): 30 multiple-choice questions
  // from Your Keys to Driving in Queensland. The written test has two sections, at least 9 of 10 on giving
  // way and 18 of 20 on road rules and driver licence requirements; PrepL needs 27 of 30 (90%). Rules are
  // from the qld.gov.au road rules, licensing, demerit and road safety pages (Oct 2026) and the Transport
  // Operations (Road Use Management) Road Rules Regulation 2009. Per test: 12 giving way, then the road
  // rules and licence section split 10 licence and demerits, 10 signs, lines and lights, 9 lanes, turning
  // and parking, 9 speed, alcohol, phones and safety. Hazard perception (video) is a separate test, not modelled.
  blueprint: {
    auqldGiveWay: 12,
    auqldLicence: 10,
    auqldSigns: 10,
    auqldRoad: 9,
    auqldSafety: 9,
  },
  trainingSets: testSets(7400, 4),
  categoryLabels: {
    auqldGiveWay: "Giving Way",
    auqldLicence: "Licence Rules & Demerit Points",
    auqldSigns: "Signs, Lines & Traffic Lights",
    auqldRoad: "Lanes, Turning & Parking",
    auqldSafety: "Speed, Alcohol & Safe Driving",
  },
  copy: {
    guestPrompt: "to save your Queensland learner licence progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Every set mixes giving way, licence rules, signs, lanes and safe driving. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions on Queensland road rules",
    heroSubs: [
      "Giving way is its own section on the real test. Start with Set 1.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your test or start PrepL.",
    ],
    sourceLine: "Based on Queensland TMR road rules, licensing and road safety pages (October 2026) and the Queensland Road Rules. The real test needs 9 of 10 on giving way and 18 of 20 on road rules (PrepL: 27 of 30). Hazard perception is a separate test and is not covered here.",
    analyticsKey: "auqld",
  },
};

const uklgv: ExamConfig = {
  id: "uklgv",
  stateCode: "UKLGV",
  idBase: 6900,
  slug: "/lgv-theory",
  landingPath: "/lgv-theory-test",
  name: "LGV Theory Test Practice",
  shortName: "LGV Theory",
  examLabel: "UK LGV theory",
  fullName: "UK DVSA lorry (LGV) theory test, multiple-choice part",
  questionIdPrefix: "UKLGV-",
  icon: "truck",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 85,
  // DVSA Driver CPC part 1a (lorry theory test, multiple-choice part): 100 questions in
  // 1 hour 55 minutes, pass mark 85 (gov.uk/become-lorry-bus-driver/driver-cpc-part-1-theory-test,
  // checked Oct 2026). Questions come from The Highway Code, Know Your Traffic Signs and The Official
  // DVSA Guide to Driving Goods Vehicles. DVSA's 14 lorry topics merged into 7: drivers' hours and the
  // driver; braking systems and vehicle condition; vehicle weights and dimensions with vehicle loading;
  // the road, restricted view and other road users; documents, leaving the vehicle and environmental
  // issues; accident handling; traffic signs. DVSA publishes no per-topic weights, so counts are by
  // topic breadth. Part 1b hazard perception (19 clips, pass mark 67) is not modelled. All questions
  // are original; rules asserted are Great Britain's (drivers' hours, speed limits, Highway Code).
  blueprint: {
    uklgvHours: 9,
    uklgvVehicle: 8,
    uklgvLoading: 8,
    uklgvRoad: 8,
    uklgvDocs: 6,
    uklgvIncidents: 5,
    uklgvSigns: 6,
  },
  trainingSets: testSets(6900, 4),
  categoryLabels: {
    uklgvHours: "Drivers' Hours & the Driver",
    uklgvVehicle: "Vehicle Condition & Brakes",
    uklgvLoading: "Weights, Dimensions & Loading",
    uklgvRoad: "The Road & Other Road Users",
    uklgvDocs: "Documents, Security & Environment",
    uklgvIncidents: "Incidents & Emergencies",
    uklgvSigns: "Traffic Signs",
  },
  copy: {
    guestPrompt: "to save your LGV theory progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly Test 1's 50 questions, and so on. Each covers drivers' hours, brakes, loading, the road, documents, incidents and signs. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across every DVSA lorry topic",
    heroSubs: [
      "Seven topics, four tests. Drivers' hours is the biggest.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Aim for 85% on every test.",
      "All done. Book your theory test.",
    ],
    sourceLine: "Based on the DVSA lorry theory test topics, The Highway Code and GB drivers' hours rules. Multiple-choice part only; hazard perception is not included.",
    analyticsKey: "uklgv",
  },
};

const caqc: ExamConfig = {
  id: "caqc",
  stateCode: "CAQC",
  idBase: 6500,
  slug: "/saaq",
  landingPath: "/saaq-practice-test",
  name: "SAAQ Practice Test",
  shortName: "SAAQ",
  examLabel: "Quebec SAAQ",
  fullName: "Quebec SAAQ Class 5 knowledge test",
  questionIdPrefix: "CAQC-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // SAAQ Class 5 (passenger vehicle) knowledge test, taken at an SAAQ service centre after
  // holding the learner's licence for 10 months. Three multiple-choice parts (Highway Safety Code;
  // road signs and traffic signals; behaviours and techniques for driving a passenger vehicle), 75%
  // required on each part. The SAAQ does not publish the question count. Content from the SAAQ Road
  // Safety Education Program modules (English, 2023 to 2025 editions), the SAAQ Demerit Points and
  // Class 5 Quick Reference Guide (C-6963-A, 25-07) leaflets, and the Gouvernement du Quebec
  // traffic rules and road sign pages (quebec.ca, updated July to October 2026). Per test:
  // 15 Code (licences 6, rules 9), 14 signs and signals (signs 8, lights and markings 6),
  // 21 behaviours (right of way 6, sharing the road 6, risk 5, techniques 4).
  blueprint: {
    caqcLicence: 6,
    caqcRules: 9,
    caqcSigns: 8,
    caqcSignals: 6,
    caqcRightOfWay: 6,
    caqcSharing: 6,
    caqcRisk: 5,
    caqcDriving: 4,
  },
  trainingSets: testSets(6500, 4),
  categoryLabels: {
    caqcLicence: "Licences & Demerit Points",
    caqcRules: "Highway Safety Code Rules",
    caqcSigns: "Road Signs",
    caqcSignals: "Traffic Lights & Pavement Markings",
    caqcRightOfWay: "Intersections & Right of Way",
    caqcSharing: "Sharing the Road",
    caqcRisk: "Alcohol, Drugs, Fatigue & Distraction",
    caqcDriving: "Driving Techniques & Conditions",
  },
  copy: {
    guestPrompt: "to save your SAAQ test progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across all three parts of the SAAQ test",
    heroSubs: [
      "Code, signs and driving behaviours. You need 75% on each part.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your SAAQ knowledge test.",
    ],
    sourceLine: "Based on the SAAQ driving course modules, SAAQ leaflets and Quebec's Highway Safety Code rules as published on quebec.ca (2026). The real test needs 75% on each of its three parts.",
    analyticsKey: "caqc",
  },
};

const uksia: ExamConfig = {
  id: "uksia",
  stateCode: "UKSIA",
  idBase: 7700,
  slug: "/sia-door-supervisor",
  landingPath: "/sia-door-supervisor-practice-test",
  name: "SIA Door Supervisor Practice Test",
  shortName: "Door Supervisor",
  examLabel: "SIA door supervisor exams",
  fullName: "SIA door supervisor licence exams (Level 2 Award for Door Supervisors)",
  questionIdPrefix: "UKSIA-",
  icon: "shield",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Level 2 Award for Door Supervisors in the Private Security Industry, the SIA
  // licence-linked qualification (SIA door supervision specifications, April 2021, still
  // current Oct 2026; counts and pass marks from the Pearson BTEC spec Issue 2, Sept 2023):
  // Unit 1 core 72 MCQ in 110 min at 70%, Unit 2 door supervision 50 in 75 min at 70%,
  // Unit 3 conflict management 20 in 30 min at 70%, Unit 4 physical intervention 30 in
  // 45 min at 80%. 172 MCQ in all, so 50 per test is 21/14/6/9 by unit; Unit 1 is split
  // by learning outcome into four categories and Unit 2 into two. Practical assessments
  // and the EFAW first aid prerequisite are not modelled. Licensing, arrest and force
  // questions follow England and Wales law. All questions are original.
  blueprint: {
    uksiaIndustry: 7,
    uksiaSafety: 5,
    uksiaComms: 4,
    uksiaTerror: 5,
    uksiaCrime: 7,
    uksiaVenue: 7,
    uksiaConflict: 6,
    uksiaPhysical: 9,
  },
  trainingSets: testSets(7700, 4),
  categoryLabels: {
    uksiaIndustry: "Security Industry, Law & Arrest",
    uksiaSafety: "Health & Safety, Fire & Emergencies",
    uksiaComms: "Communication, Records & Post-Incident",
    uksiaTerror: "Terrorism & Vulnerable People",
    uksiaCrime: "Crime, Drugs & Evidence",
    uksiaVenue: "Licensing Law, Searching & Queues",
    uksiaConflict: "Conflict Management",
    uksiaPhysical: "Physical Intervention",
  },
  copy: {
    guestPrompt: "to save your SIA exam progress and track every question you miss",
    trainingHeading: "Train for each mock exam",
    trainingSub: "Four sets, one per mock exam: Set 1 holds exactly the 50 questions of Test 1, and so on, across all four units. Missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions mixing all four units like the real exams",
    heroSubs: [
      "Four units, four mock exams. Physical intervention needs 80%, the rest 70%.",
      "Master each set, then test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. You are ready for your course exams.",
    ],
    sourceLine: "Based on the SIA door supervision specifications (April 2021) and England and Wales law, checked October 2026. Multiple-choice exams only; the practical assessments are done with your trainer.",
    analyticsKey: "uksia",
  },
};

const uk18ed: ExamConfig = {
  id: "uk18ed",
  stateCode: "UK18ED",
  idBase: 7800,
  slug: "/18th-edition",
  landingPath: "/18th-edition-practice-test",
  name: "18th Edition Practice Test",
  shortName: "18th Edition",
  examLabel: "18th Edition exam",
  fullName: "City & Guilds 2382-26 18th Edition IET Wiring Regulations (BS 7671:2018+A4:2026) exam",
  questionIdPrefix: "UK18ED-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  // City & Guilds Level 3 Award in the Requirements for Electrical Installations BS 7671:2018
  // (2382-26), handbook v1.0 March 2026, checked October 2026: one open-book online test (2382-626)
  // of 60 multiple-choice questions in 120 minutes on BS 7671:2018+A4:2026, pass mark approx. 60%.
  // Test specification: scope, object and fundamental principles 4; definitions 2; assessment of
  // general characteristics 6; protection for safety 15; selection and erection 14; inspection and
  // testing 4; special installations or locations 7; Part 8 and the appendices 8. Scaled to 50:
  // 3/2/5/13/12/3/6/6. 2382-26 replaced 2382-22 from 16 April 2026; A2+A3 withdrawn 15 Oct 2026.
  // All items original; no regulation text quoted.
  blueprint: {
    uk18edScope: 3,
    uk18edDefinitions: 2,
    uk18edAssessment: 5,
    uk18edProtection: 13,
    uk18edSelection: 12,
    uk18edInspection: 3,
    uk18edSpecial: 6,
    uk18edAppendices: 6,
  },
  trainingSets: testSets(7800, 4),
  categoryLabels: {
    uk18edScope: "Scope, Object & Fundamental Principles",
    uk18edDefinitions: "Definitions",
    uk18edAssessment: "Assessment of General Characteristics",
    uk18edProtection: "Protection for Safety",
    uk18edSelection: "Selection & Erection",
    uk18edInspection: "Inspection & Testing",
    uk18edSpecial: "Special Installations & Locations",
    uk18edAppendices: "Part 8 & Appendices",
  },
  copy: {
    guestPrompt: "to save your 18th Edition progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock exam, each holding exactly that test's 50 questions across every part of BS 7671. Missed questions come back until you master them.",
    testsHeading: "Mock exams · 50 questions in the 2382-26 proportions, 60% to pass",
    heroSubs: [
      "Eight parts of BS 7671, four mock exams. Parts 4 and 5 are half the paper.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock exam.",
      "Fix the misses, then retake.",
      "All done. Tab your BS 7671 and book your exam.",
    ],
    sourceLine: "Based on the City & Guilds 2382-26 test specification and BS 7671:2018+A4:2026. Original questions; keep your own copy of the book open, as in the real open-book exam.",
    analyticsKey: "uk18ed",
  },
};

const cscs: ExamConfig = {
  id: "cscs",
  stateCode: "CSCS",
  idBase: 8200,
  slug: "/cscs",
  landingPath: "/cscs-test-practice",
  name: "CSCS Test Practice",
  shortName: "CSCS Test",
  examLabel: "CITB HS&E test",
  fullName: "CITB Health, Safety and Environment test for Operatives (CSCS card)",
  questionIdPrefix: "CSCS-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 90,
  // CITB Health, Safety and Environment test for Operatives (citb.co.uk, checked Oct 2026):
  // 50 questions in 45 minutes, pass mark 90% (45 of 50), no negative marking. Questions come
  // from the core knowledge of the official GT100 revision material (working environment /
  // legal and management, occupational health and welfare, general safety, high-risk
  // activities, environment); since 2019 behavioural items are built into the 50 questions.
  // CITB publishes no per-area counts, so the weights are ours. Great Britain law (HSWA 1974,
  // CDM 2015, RIDDOR, CAR 2012, COSHH, Noise and Vibration Regs, WAHR 2005). All items original.
  blueprint: {
    cscsLegal: 8,
    cscsWelfare: 6,
    cscsHealth: 10,
    cscsSafety: 10,
    cscsHeights: 7,
    cscsExcav: 4,
    cscsEnv: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 8201, name: "Law, Welfare & Emergencies", categories: ["cscsLegal", "cscsWelfare"], size: 56, weightLabel: "28% of each test" },
    { setNumber: 2, id: 8202, name: "Occupational Health & PPE", categories: ["cscsHealth"], size: 40, weightLabel: "20% of each test" },
    { setNumber: 3, id: 8203, name: "General Site Safety", categories: ["cscsSafety"], size: 40, weightLabel: "20% of each test" },
    { setNumber: 4, id: 8204, name: "High-Risk Activities", categories: ["cscsHeights", "cscsExcav"], size: 44, weightLabel: "22% of each test" },
    { setNumber: 5, id: 8205, name: "Environment & Waste", categories: ["cscsEnv"], size: 20, weightLabel: "10% of each test" },
  ],
  categoryLabels: {
    cscsLegal: "Legal Duties & Site Management",
    cscsWelfare: "Health, Welfare & Emergencies",
    cscsHealth: "Occupational Health & PPE",
    cscsSafety: "Signs, Fire, Electricity, Tools & Plant",
    cscsHeights: "Working at Height",
    cscsExcav: "Excavations & Confined Spaces",
    cscsEnv: "Environment & Waste",
  },
  copy: {
    guestPrompt: "to save your CSCS test progress and track every question you miss",
    trainingHeading: "Train by topic",
    trainingSub: "Five sets covering the HS&E core knowledge: law, welfare and emergencies; occupational health and PPE; general site safety; working at height, excavations and confined spaces; the environment. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 45 to pass, like the real operatives test",
    heroSubs: [
      "Seven topics, four mock tests. You need 45 of 50 to pass.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "The pass mark is 90%. Fix the misses, then retake.",
      "All done. Book your HS&E test.",
    ],
    sourceLine: "Based on the CITB HS&E test core knowledge areas, the CDM Regulations 2015 and HSE guidance, checked October 2026. Original questions, not the CITB revision bank.",
    analyticsKey: "cscs",
  },
};

const ukfood: ExamConfig = {
  id: "ukfood",
  stateCode: "UKFOOD",
  idBase: 8300,
  slug: "/uk-food-hygiene",
  landingPath: "/level-2-food-hygiene-practice-test",
  name: "Level 2 Food Hygiene Practice Test",
  shortName: "Food Hygiene",
  examLabel: "Level 2 food hygiene",
  fullName: "Level 2 Award in Food Safety and Hygiene for Catering (UK)",
  questionIdPrefix: "UKFOOD-",
  icon: "chef",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Level 2 Award in Food Safety (and Hygiene) for Catering, RQF (checked October 2026): one unit,
  // "Food Safety in Catering", with four outcomes: personal responsibility for food safety, keeping
  // yourself clean and hygienic, keeping the work area clean and hygienic, keeping food safe.
  // Awarding bodies set a short MCQ (Open Awards 30 questions, 20 to pass; Highfield 20 in 45 min,
  // 12 or 13 to pass) and publish no per-topic weights, so counts are ours. Figures follow FSA
  // guidance and the England/Wales/NI hygiene regulations (8°C, 63°C, 75°C), with Scotland's
  // differences (82°C reheat, FHIS, CookSafe) stated as such. 70% is a readiness line a little above
  // the real pass marks. All items original; no provider named.
  blueprint: {
    ukfoodLaw: 7,
    ukfoodHazards: 9,
    ukfoodHygiene: 8,
    ukfoodTemp: 10,
    ukfoodStorage: 4,
    ukfoodClean: 8,
    ukfoodAllergen: 4,
  },
  trainingSets: testSets(8300, 4),
  categoryLabels: {
    ukfoodLaw: "Law, Responsibilities & HACCP",
    ukfoodHazards: "Hazards & Food Poisoning",
    ukfoodHygiene: "Personal Hygiene",
    ukfoodTemp: "Temperature Control",
    ukfoodStorage: "Deliveries, Storage & Stock",
    ukfoodClean: "Cleaning, Premises & Pests",
    ukfoodAllergen: "Allergens",
  },
  copy: {
    guestPrompt: "to save your food hygiene progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all seven topics. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 70% to pass",
    heroSubs: [
      "Seven topics, four mock tests. Temperature control is the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your Level 2 exam.",
    ],
    sourceLine: "Based on the Level 2 Food Safety in Catering unit, FSA guidance and UK food hygiene law. Original questions; pass marks vary by awarding body.",
    analyticsKey: "ukfood",
  },
};

const ukaplh: ExamConfig = {
  id: "ukaplh",
  stateCode: "UKAPLH",
  idBase: 8400,
  slug: "/personal-licence",
  landingPath: "/personal-licence-practice-test",
  name: "Personal Licence Practice Test",
  shortName: "Personal Licence",
  examLabel: "Personal licence exam (APLH)",
  fullName: "Level 2 Award for Personal Licence Holders (England and Wales)",
  questionIdPrefix: "UKAPLH-",
  icon: "wine",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Level 2 Award for Personal Licence Holders (RQF), England and Wales: one unit, "Legal and
  // social responsibilities of a personal licence holder"; 40 multiple-choice questions, 28 to
  // pass (70%), 40 to 60 minutes by awarding body (TQUK spec; Highfield and BIIAB outlines,
  // checked Oct 2026). No per-topic weights are published, so counts are ours. Law: Licensing
  // Act 2003 as amended to 2026, mandatory conditions, s.182 guidance. All items original.
  blueprint: {
    ukaplhAuth: 6,
    ukaplhPersonal: 7,
    ukaplhPremises: 8,
    ukaplhDps: 4,
    ukaplhActivities: 7,
    ukaplhPowers: 6,
    ukaplhChildren: 7,
    ukaplhAlcohol: 5,
  },
  trainingSets: testSets(8400, 4),
  categoryLabels: {
    ukaplhAuth: "Licensing Objectives & Authorities",
    ukaplhPersonal: "Personal Licences",
    ukaplhPremises: "Premises Licences & Conditions",
    ukaplhDps: "Designated Premises Supervisor",
    ukaplhActivities: "Licensable Activities & TENs",
    ukaplhPowers: "Police Powers & Offences",
    ukaplhChildren: "Protecting Children",
    ukaplhAlcohol: "Alcohol & Responsible Retail",
  },
  copy: {
    guestPrompt: "to save your personal licence progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all eight topic areas. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 70% to pass, like the real 28 of 40",
    heroSubs: [
      "Eight topic areas, four mock tests. The real exam needs 28 of 40.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your exam with your course provider.",
    ],
    sourceLine: "Based on the Licensing Act 2003, the mandatory licensing conditions and the section 182 guidance for England and Wales, checked October 2026. Original questions, not an awarding body's papers.",
    analyticsKey: "ukaplh",
  },
};

const ukfaw: ExamConfig = {
  id: "ukfaw",
  stateCode: "UKFAW",
  idBase: 8500,
  slug: "/first-aid-at-work",
  landingPath: "/first-aid-at-work-practice-test",
  name: "First Aid at Work Practice Test",
  shortName: "First Aid at Work",
  examLabel: "First Aid at Work",
  fullName: "First Aid at Work (FAW) course theory assessment",
  questionIdPrefix: "UKFAW-",
  icon: "bandage",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // First Aid at Work (3-day course, usually the Level 3 Award in First Aid at Work), content
  // per HSE L74 (2024 reissue) Appendix 6 (EFAW: role, assessment, unresponsive casualty, CPR and
  // AED, choking, wounds and bleeding, shock, minor injuries) and Appendix 5 (FAW adds bones,
  // muscles, joints and spinal injuries, chest injuries, burns and scalds, eye injuries,
  // poisoning, anaphylaxis, major illness). Clinical answers follow the Resuscitation Council UK
  // 2025 guidelines. Assessment is practical observation plus awarding-body MCQ theory papers;
  // pass marks vary by awarding body (about 70%). No body publishes topic weights; counts are ours.
  // All items original.
  blueprint: {
    ukfawRole: 6,
    ukfawResus: 8,
    ukfawBleed: 8,
    ukfawBones: 7,
    ukfawChest: 5,
    ukfawBurns: 7,
    ukfawIllness: 9,
  },
  trainingSets: testSets(8500, 4),
  categoryLabels: {
    ukfawRole: "The First-Aider's Role & Assessment",
    ukfawResus: "Unresponsive Casualty, CPR & AED",
    ukfawBleed: "Wounds, Bleeding & Shock",
    ukfawBones: "Bones, Joints, Head & Spinal Injuries",
    ukfawChest: "Choking, Breathing & Chest Injuries",
    ukfawBurns: "Burns, Eyes, Electricity & Poisoning",
    ukfawIllness: "Major Illness & Anaphylaxis",
  },
  copy: {
    guestPrompt: "to save your First Aid at Work progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all seven parts of the FAW syllabus. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across the First Aid at Work syllabus",
    heroSubs: [
      "Seven topics, four mock tests. Major illness is the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Practise the hands-on skills on your course.",
    ],
    sourceLine: "Based on HSE's First Aid at Work syllabus (L74) and the Resuscitation Council UK 2025 guidelines. Awarding bodies set their own theory papers; 70% here is a practice target.",
    analyticsKey: "ukfaw",
  },
};

const ukcare: ExamConfig = {
  id: "ukcare",
  stateCode: "UKCARE",
  idBase: 8600,
  slug: "/care-certificate",
  landingPath: "/care-certificate-practice-test",
  name: "Care Certificate Practice Test",
  shortName: "Care Certificate",
  examLabel: "Care Certificate",
  fullName: "Care Certificate (16 standards, England)",
  questionIdPrefix: "UKCARE-",
  icon: "heart",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // The Care Certificate standards, updated March 2025 (NHS England, Skills for Care and
  // Skills for Health; 16 standards, to be met within 12 weeks of starting). There is no
  // national exam: workplace assessors sign off knowledge and observed practice. The 16
  // standards are grouped into 8 categories (standard numbers in the labels' comments);
  // counts are ours. 80% is a readiness line, not an official pass mark. All items original.
  blueprint: {
    ukcareRole: 5, // 1 Understand your role, 2 Your personal development
    ukcareDuty: 6, // 3 Duty of care, 4 Equality, diversity, inclusion and human rights
    ukcarePerson: 8, // 5 Work in a person-centred way, 7 Privacy and dignity
    ukcareComms: 6, // 6 Communication, 14 Handling information
    ukcareNutrition: 5, // 8 Fluids and nutrition, 12 Basic life support
    ukcareAwareness: 6, // 9 Mental health and dementia, 16 Learning disability and autism
    ukcareSafeguard: 7, // 10 Adult safeguarding, 11 Safeguarding children
    ukcareSafety: 7, // 13 Health and safety, 15 Infection prevention and control
  },
  trainingSets: testSets(8600, 4),
  categoryLabels: {
    ukcareRole: "Your Role & Personal Development",
    ukcareDuty: "Duty of Care & Equality",
    ukcarePerson: "Person-Centred Care, Privacy & Dignity",
    ukcareComms: "Communication & Handling Information",
    ukcareNutrition: "Fluids, Nutrition & Basic Life Support",
    ukcareAwareness: "Mental Health, Dementia, Learning Disability & Autism",
    ukcareSafeguard: "Safeguarding Adults & Children",
    ukcareSafety: "Health & Safety, Infection Control",
  },
  copy: {
    guestPrompt: "to save your Care Certificate progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all 16 standards. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across all 16 standards",
    heroSubs: [
      "Sixteen standards, four tests. Aim for 80% before your knowledge checks.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Show your assessor what you know.",
    ],
    sourceLine: "Based on the 16 Care Certificate standards as updated in March 2025. There is no official exam; 80% is a readiness target.",
    analyticsKey: "ukcare",
  },
};

const capal: ExamConfig = {
  id: "capal",
  stateCode: "CAPAL",
  idBase: 7900,
  slug: "/canadian-firearms",
  landingPath: "/canadian-firearms-safety-course-practice-test",
  name: "Canadian Firearms Safety Course Practice Test",
  shortName: "CFSC",
  examLabel: "CFSC written test",
  fullName: "Canadian Firearms Safety Course (CFSC) written test for the non-restricted PAL",
  questionIdPrefix: "CAPAL-",
  icon: "target",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // RCMP Canadian Firearms Program, Canadian Firearms Safety Course (rcmp.ca safety courses page,
  // checked Oct 2026): classroom course by provincially designated instructors, then a written
  // test (usually 50 questions, mostly multiple choice) and a practical handling test, 80% to pass each. The
  // categories follow the course's required topics in student handbook order; RCMP publishes no
  // per-topic weights, so the counts are ours. Law current to Oct 2026 (SOR/98-209 storage,
  // display, transport and handling; Criminal Code Part III; Bill C-21). All items original.
  blueprint: {
    capalHistory: 5,
    capalActions: 6,
    capalAmmo: 6,
    capalSafety: 8,
    capalHandling: 6,
    capalFiring: 4,
    capalCare: 3,
    capalStorage: 6,
    capalLaw: 6,
  },
  trainingSets: testSets(7900, 4),
  categoryLabels: {
    capalHistory: "Evolution & Parts of Firearms",
    capalActions: "Types & Actions",
    capalAmmo: "Ammunition",
    capalSafety: "Basic Safety: ACTS & PROVE",
    capalHandling: "Safe Handling & Carrying",
    capalFiring: "Firing Techniques",
    capalCare: "Care of Firearms",
    capalStorage: "Storage, Display & Transport",
    capalLaw: "Licensing & the Law",
  },
  copy: {
    guestPrompt: "to save your firearms safety course progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all nine course topics. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 80% to pass, like the CFSC written test",
    heroSubs: [
      "Nine course topics, four practice tests. You need 40 of 50 to pass.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Practise PROVE with your instructor and book your test.",
    ],
    sourceLine: "Based on the RCMP Canadian Firearms Safety Course topics and federal law as of October 2026. Original questions; the practical handling test is not modelled.",
    analyticsKey: "capal",
  },
};

const caelec: ExamConfig = {
  id: "caelec",
  stateCode: "CAELEC",
  idBase: 8000,
  slug: "/red-seal-electrician",
  landingPath: "/red-seal-electrician-practice-test",
  name: "Red Seal Electrician Practice Test",
  shortName: "Red Seal Electrician",
  examLabel: "Red Seal Construction Electrician",
  fullName: "Red Seal Construction Electrician (309A) interprovincial exam",
  questionIdPrefix: "CAELEC-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Red Seal Construction Electrician interprovincial exam (red-seal.ca exam information and
  // exam weightings, checked Oct 2026): 100 four-option multiple-choice questions in 4 hours,
  // 70% to pass, calculator and code reference supplied. Current exams are built on the previous
  // RSOS; its breakdown by major work activity is A common skills 11, B generating, distribution
  // and service 28, C wiring 30, D motors and controls 21, E signalling and communication 10. The
  // new RSOS (exams in development) shifts to 12/26/34/18/10. Scaled to 50: 6/14/15/10/5, which
  // sits between the two. Code content follows the 2024 CEC Part I (used on the exam since
  // June 1, 2025). All items original.
  blueprint: {
    caelecCommon: 6,
    caelecDist: 14,
    caelecWiring: 15,
    caelecMotors: 10,
    caelecSignal: 5,
  },
  trainingSets: testSets(8000, 4),
  categoryLabels: {
    caelecCommon: "Common Occupational Skills",
    caelecDist: "Generating, Distribution & Service Systems",
    caelecWiring: "Wiring Systems",
    caelecMotors: "Motors & Control Systems",
    caelecSignal: "Signalling & Communication Systems",
  },
  copy: {
    guestPrompt: "to save your Red Seal progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all five major work activities. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the Red Seal exam's proportions, 70% to pass",
    heroSubs: [
      "Five work activities, four tests. Wiring and distribution are over half the exam.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Tab your code book and book your exam.",
    ],
    sourceLine: "Based on the Red Seal Occupational Standard exam breakdown for Construction Electrician and the 2024 Canadian Electrical Code. Original questions; provincial amendments vary.",
    analyticsKey: "caelec",
  },
};

const capsw: ExamConfig = {
  id: "capsw",
  stateCode: "CAPSW",
  idBase: 9100,
  slug: "/psw",
  landingPath: "/psw-practice-test",
  name: "PSW Practice Test",
  shortName: "PSW",
  examLabel: "PSW exam",
  fullName: "Ontario Personal Support Worker (PSW) final exam",
  questionIdPrefix: "CAPSW-",
  icon: "heart",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Ontario Personal Support Worker program standard, January 2022 (Ministry of Colleges and
  // Universities, code 41469; 14 vocational learning outcomes), used by colleges, career colleges
  // and school boards and by the NACC PSW final exam (checked October 2026). The 14 VLOs are
  // grouped into 8 categories (VLO numbers in the comments); neither the Ministry nor NACC
  // publishes exam weights, so counts are ours. Current Ontario law: Fixing Long-Term Care Act,
  // 2021 (replaced the LTCHA 2007 named in the standard), Retirement Homes Act, 2010, HCCA 1996,
  // PHIPA 2004, RHPA 1991, OHSA. 70% is a readiness line; NACC publishes no current pass mark.
  // All items original.
  blueprint: {
    capswRole: 7, // VLO 1 role and law, 2 accountability, 3 interprofessional team
    capswComm: 6, // VLO 5 therapeutic relationships and privacy, 6 observing and reporting
    capswRights: 7, // VLO 4 person-centred ethical care and consent, 12 abuse and neglect
    capswSafety: 8, // VLO 7 safety, infection control, emergencies
    capswAdl: 9, // VLO 8 activities of daily living, body systems, restorative care
    capswHome: 5, // VLO 9 medication, 10 household management, 11 clients who are caregivers
    capswPal: 4, // VLO 13 palliative and end-of-life care
    capswMental: 4, // VLO 14 mental health, cognitive impairment, responsive behaviours
  },
  trainingSets: testSets(9100, 4),
  categoryLabels: {
    capswRole: "PSW Role, Law & Teamwork",
    capswComm: "Communication, Observation & Reporting",
    capswRights: "Rights, Consent, Ethics & Abuse",
    capswSafety: "Safety, Infection Control & Emergencies",
    capswAdl: "Daily Living, Body Systems & Restorative Care",
    capswHome: "Medication, Home Management & Caregivers",
    capswPal: "Palliative & End-of-Life Care",
    capswMental: "Mental Health, Dementia & Responsive Behaviours",
  },
  copy: {
    guestPrompt: "to save your PSW exam progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all 14 program outcomes. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across all 14 PSW outcomes",
    heroSubs: [
      "Eight topics, four tests. Aim for 70% or better on each.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your PSW final exam.",
    ],
    sourceLine: "Based on Ontario's 2022 Personal Support Worker program standard and current Ontario law. Original questions; 70% is a readiness target, not an official pass mark.",
    analyticsKey: "capsw",
  },
};

const casfa: ExamConfig = {
  id: "casfa",
  stateCode: "CASFA",
  idBase: 9400,
  slug: "/standard-first-aid",
  landingPath: "/standard-first-aid-canada-practice-test",
  name: "Standard First Aid Practice Test",
  shortName: "Standard First Aid",
  examLabel: "Standard First Aid & CPR C",
  fullName: "Standard (Intermediate) First Aid with CPR Level C and AED written test",
  questionIdPrefix: "CASFA-",
  icon: "bandage",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 75,
  // Standard First Aid with CPR Level C and AED (Canada): the intermediate level of
  // CSA Z1210 (Z1210-17, superseded by Z1210:24 published March 2024), usually 2 days.
  // Topics per the Z1210 intermediate curriculum; clinical answers follow the current
  // ILCOR-based Canadian first aid and resuscitation guidelines. Assessment is a skills check
  // plus the training agency's written multiple-choice test; Z1210 sets no pass mark and
  // agencies use 70 to 80%, most often 75%. No one publishes topic weights; counts are ours.
  // Provincial rules (workplace kits, certificate validity) are "varies". All items original.
  blueprint: {
    casfaRole: 7,
    casfaCpr: 9,
    casfaAirway: 6,
    casfaBleed: 7,
    casfaInjury: 7,
    casfaMedical: 8,
    casfaEnviro: 6,
  },
  trainingSets: testSets(9400, 4),
  categoryLabels: {
    casfaRole: "The First Aider's Role, Consent & Assessment",
    casfaCpr: "CPR Level C & AED",
    casfaAirway: "Choking & Breathing Emergencies",
    casfaBleed: "Wounds, Bleeding & Shock",
    casfaInjury: "Bone, Joint, Head, Spine & Chest Injuries",
    casfaMedical: "Sudden Medical Emergencies",
    casfaEnviro: "Burns, Eyes, Poisons & Environment",
  },
  copy: {
    guestPrompt: "to save your first aid progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all seven topics. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 75% to pass, like most course written tests",
    heroSubs: [
      "Seven topics, four practice tests. Most courses pass at 75%.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Practise your hands-on skills and book your course.",
    ],
    sourceLine: "Based on the CSA Z1210 intermediate first aid curriculum and current Canadian first aid and CPR guidelines. Original questions; works for any training agency's course.",
    analyticsKey: "casfa",
  },
};

const cawhmis: ExamConfig = {
  id: "cawhmis",
  stateCode: "CAWHMIS",
  idBase: 9200,
  slug: "/whmis",
  landingPath: "/whmis-practice-test",
  name: "WHMIS Practice Test",
  shortName: "WHMIS",
  examLabel: "WHMIS training quiz",
  fullName: "WHMIS 2015 (Workplace Hazardous Materials Information System) training quiz",
  questionIdPrefix: "CAWHMIS-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // WHMIS 2015 under the Hazardous Products Act and Regulations as amended December 15, 2022
  // (GHS Rev. 7, transition ended December 14, 2025; Health Canada and CCOHS, checked Oct 2026).
  // There is no national WHMIS exam: employers and trainers set their own course quiz and pass mark,
  // so the 80% line is a practice target. Weights are ours, across the core of every WHMIS
  // general-education course: roles and laws 16%, hazard classes 14%, pictograms 18%,
  // labels 18%, SDS 18%, safe handling and emergencies 16%. All items original.
  blueprint: {
    cawhmisBasics: 8,
    cawhmisHazards: 7,
    cawhmisPictos: 9,
    cawhmisLabels: 9,
    cawhmisSds: 9,
    cawhmisSafe: 8,
  },
  trainingSets: testSets(9200, 4),
  categoryLabels: {
    cawhmisBasics: "WHMIS Basics, Laws & Roles",
    cawhmisHazards: "Hazard Classes & Categories",
    cawhmisPictos: "Pictograms",
    cawhmisLabels: "Supplier & Workplace Labels",
    cawhmisSds: "Safety Data Sheets",
    cawhmisSafe: "Safe Handling & Emergencies",
  },
  copy: {
    guestPrompt: "to save your WHMIS progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all six WHMIS topics. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across every WHMIS topic, 80% to pass",
    heroSubs: [
      "Six topics, four tests. Pictograms, labels and SDSs are the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your WHMIS course quiz.",
    ],
    sourceLine: "Based on the Hazardous Products Regulations as amended in December 2022 and Health Canada and CCOHS guidance. Original questions; your employer still trains you on its own products.",
    analyticsKey: "cawhmis",
  },
};

const caguard: ExamConfig = {
  id: "caguard",
  stateCode: "CAGUARD",
  idBase: 9300,
  slug: "/ontario-security-guard",
  landingPath: "/ontario-security-guard-practice-test",
  name: "Ontario Security Guard Practice Test",
  shortName: "Security Guard",
  examLabel: "Ontario security guard test",
  fullName: "Ontario security guard licence test",
  questionIdPrefix: "CAGUARD-",
  icon: "badge",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 62,
  // Ontario ministry basic test for security guards (ontario.ca testing page and security guard
  // study guide, checked Oct 2026): 60 multiple-choice questions in 75 minutes, 62% cut score.
  // Blueprint follows the suggested hours of the 12-section Training Syllabus for Security Guards
  // (updated July 2026, 80 h in and outside class): sections 1+2 (9 h) 7, 3 (8 h) 5, 4 (4 h) 4,
  // 5+6 (10 h) 7, 7+8 (26.5 h, capped) 13, 9+10 (12 h) 6, 11 (4 h) 4, 12 first aid (6.5 h) 4.
  blueprint: {
    caguardIndustry: 7,
    caguardProcedures: 5,
    caguardReports: 4,
    caguardEmergency: 7,
    caguardLaw: 13,
    caguardCommunication: 6,
    caguardForce: 4,
    caguardFirstAid: 4,
  },
  trainingSets: testSets(9300, 4),
  categoryLabels: {
    caguardIndustry: "The Industry, PSISA & Code of Conduct",
    caguardProcedures: "Basic Security Procedures",
    caguardReports: "Report Writing",
    caguardEmergency: "Health, Safety & Emergency Response",
    caguardLaw: "Canadian Law & Legal Authorities",
    caguardCommunication: "Communication & Sensitivity",
    caguardForce: "Use of Force",
    caguardFirstAid: "Emergency First Aid",
  },
  copy: {
    guestPrompt: "to save your security guard test progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across all twelve syllabus sections",
    heroSubs: [
      "Twelve syllabus sections, four tests. The real cut score is 62%.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your ministry test.",
    ],
    sourceLine: "Based on the Ontario Training Syllabus for Security Guards (2026) and the ministry study guide. Original questions; the real test's cut score is 62%.",
    analyticsKey: "caguard",
  },
};

const caauto: ExamConfig = {
  id: "caauto",
  stateCode: "CAAUTO",
  idBase: 8700,
  slug: "/red-seal-automotive",
  landingPath: "/red-seal-automotive-service-technician-practice-test",
  name: "Red Seal Automotive Service Technician Practice Test",
  shortName: "Red Seal Auto",
  examLabel: "Red Seal Automotive Service Technician exam",
  fullName: "Red Seal Automotive Service Technician (310S) interprovincial exam",
  questionIdPrefix: "CAAUTO-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Red Seal Automotive Service Technician exam (310S in Ontario). Breakdown by Major Work Activity on
  // red-seal.ca (exam-information and exam-weightings pages, checked October 2026), which follows the
  // 2023 RSOS (MWA H, hybrid and EV, is new in it): 125 questions, A 9, B 22, C 12, D 17, E 23, F 23,
  // G 10, H 9. Scaled to 50 per test. 4 hours, 70% pass (Red Seal Exam Preparation Guide). All items original.
  blueprint: {
    caautoOcc: 4,
    caautoEngine: 9,
    caautoNetwork: 5,
    caautoDriveline: 7,
    caautoElectrical: 9,
    caautoChassis: 9,
    caautoBody: 4,
    caautoHev: 3,
  },
  trainingSets: testSets(8700, 4),
  categoryLabels: {
    caautoOcc: "Common Occupational Skills",
    caautoEngine: "Engine & Engine Support Systems",
    caautoNetwork: "Module Communication Networks",
    caautoDriveline: "Driveline Systems",
    caautoElectrical: "Electrical & Comfort Control (HVAC)",
    caautoChassis: "Steering, Suspension, Brakes & Tires",
    caautoBody: "Restraints, Body & Accessories",
    caautoHev: "Hybrid & Electric Vehicles",
  },
  copy: {
    guestPrompt: "to save your Red Seal progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all eight Major Work Activities. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the Red Seal exam's proportions, 70% to pass",
    heroSubs: [
      "Eight Major Work Activities, four tests. Electrical, chassis and engine are the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your Red Seal exam.",
    ],
    sourceLine: "Based on the Red Seal exam breakdown for Automotive Service Technician (2023 RSOS). Original questions; the real exam has 125 questions in 4 hours.",
    analyticsKey: "caauto",
  },
};

const caplumb: ExamConfig = {
  id: "caplumb",
  stateCode: "CAPLUMB",
  idBase: 8800,
  slug: "/red-seal-plumber",
  landingPath: "/red-seal-plumber-practice-test",
  name: "Red Seal Plumber Practice Test",
  shortName: "Red Seal Plumber",
  examLabel: "Red Seal Plumber exam",
  fullName: "Red Seal Plumber (306A) interprovincial exam",
  questionIdPrefix: "CAPLUMB-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Red Seal Plumber exam (306A in Ontario). Weightings by Major Work Activity on red-seal.ca
  // (exam-information and exam-weightings pages, checked October 2026), which follow the 2023 RSOS
  // (no newer plumber RSOS announced): 125 questions; A 11%, B 10%, C 26%, D 19%, E 13%, F 13%
  // (low-pressure steam task not common core), G 8%. Scaled to 50 per test. 4 hours, 70% pass
  // (Red Seal Exam Preparation Guide). Code content follows the National Plumbing Code of Canada 2020;
  // provincial rules are "varies". All items original.
  blueprint: {
    caplumbCommon: 6,
    caplumbPipe: 5,
    caplumbDwv: 13,
    caplumbWater: 10,
    caplumbFixtures: 6,
    caplumbHydronic: 6,
    caplumbSpecial: 4,
  },
  trainingSets: testSets(8800, 4),
  categoryLabels: {
    caplumbCommon: "Common Occupational Skills",
    caplumbPipe: "Pipe Preparation & Joining",
    caplumbDwv: "Sewers, Sewage Treatment & DWV",
    caplumbWater: "Water Service & Distribution",
    caplumbFixtures: "Fixtures, Appliances & Water Treatment",
    caplumbHydronic: "Hydronic & Low-Pressure Steam",
    caplumbSpecial: "Specialized Systems",
  },
  copy: {
    guestPrompt: "to save your Red Seal progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all seven Major Work Activities. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the Red Seal exam's proportions, 70% to pass",
    heroSubs: [
      "Seven Major Work Activities, four tests. DWV and water distribution are the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your Red Seal exam.",
    ],
    sourceLine: "Based on the Red Seal exam weightings for Plumber (2023 RSOS) and the National Plumbing Code of Canada 2020. Original questions; the real exam has 125 questions in 4 hours.",
    analyticsKey: "caplumb",
  },
};

const cacarp: ExamConfig = {
  id: "cacarp",
  stateCode: "CACARP",
  idBase: 8900,
  slug: "/red-seal-carpenter",
  landingPath: "/red-seal-carpenter-practice-test",
  name: "Red Seal Carpenter Practice Test",
  shortName: "Red Seal Carpenter",
  examLabel: "Red Seal Carpenter",
  fullName: "Red Seal Carpenter interprovincial exam (403A)",
  questionIdPrefix: "CACARP-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Red Seal Occupational Standard, Carpenter (2022 RSOS, the current standard), exam
  // weightings on red-seal.ca and Saskatchewan's 2026 IP exam information (checked Oct 2026):
  // 100 four-option questions in up to 4 hours, 70% to pass, 2020 NBC Volume 2 supplied.
  // MWA A common occupational skills 12%, B planning and layout 14%, C concrete work 16%
  // (formwork 12 of 16), D framing 20%, E exterior finishing 14%, F interior finishing 14%,
  // G renovations 10%. Each practice test is half the real exam.
  blueprint: {
    cacarpCommon: 6,
    cacarpLayout: 7,
    cacarpConcrete: 8,
    cacarpFraming: 10,
    cacarpExterior: 7,
    cacarpInterior: 7,
    cacarpReno: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 8901, name: "Safety, Tools & Layout", categories: ["cacarpCommon", "cacarpLayout"], size: 52, weightLabel: "26% of each test" },
    { setNumber: 2, id: 8902, name: "Concrete & Formwork", categories: ["cacarpConcrete"], size: 32, weightLabel: "16% of each test" },
    { setNumber: 3, id: 8903, name: "Framing", categories: ["cacarpFraming"], size: 40, weightLabel: "20% of each test" },
    { setNumber: 4, id: 8904, name: "Exterior Finish", categories: ["cacarpExterior"], size: 28, weightLabel: "14% of each test" },
    { setNumber: 5, id: 8905, name: "Interior Finish & Renovations", categories: ["cacarpInterior", "cacarpReno"], size: 48, weightLabel: "24% of each test" },
  ],
  categoryLabels: {
    cacarpCommon: "Common Occupational Skills",
    cacarpLayout: "Planning & Layout",
    cacarpConcrete: "Concrete & Formwork",
    cacarpFraming: "Framing",
    cacarpExterior: "Exterior Finish",
    cacarpInterior: "Interior Finish & Stairs",
    cacarpReno: "Renovations",
  },
  copy: {
    guestPrompt: "to save your Red Seal progress and track every question you miss",
    trainingHeading: "Train by work activity",
    trainingSub: "Five sets covering the seven major work activities of the carpenter standard: safety, tools and layout, concrete and formwork, framing, exterior finish, and interior finish with renovations. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the Red Seal exam's proportions",
    heroSubs: [
      "Seven work activities, four tests. Framing and formwork carry the most questions.",
      "Master each set, then test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your Red Seal exam.",
    ],
    sourceLine: "Based on the 2022 Red Seal Occupational Standard for carpenters and Part 9 of the National Building Code of Canada. Original questions; provincial codes can differ.",
    analyticsKey: "cacarp",
  },
};

const caweld: ExamConfig = {
  id: "caweld",
  stateCode: "CAWELD",
  idBase: 9000,
  slug: "/red-seal-welder",
  landingPath: "/red-seal-welder-practice-test",
  name: "Red Seal Welder Practice Test",
  shortName: "Red Seal Welder",
  examLabel: "Red Seal Welder exam",
  fullName: "Red Seal Welder interprovincial exam (456A in Ontario)",
  questionIdPrefix: "CAWELD-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 70,
  // Red Seal Welder exam breakdown for the 2023 Red Seal Occupational Standard (red-seal.ca
  // exam information and weightings, confirmed by the Saskatchewan Feb 2026 exam sheet and the
  // NL "RSOS 2023" study guide; checked October 2026): 125 four-option questions, 4 hours, 70%.
  // MWA A common occupational skills 20, B layout and fabrication 28 (layout 12, fabricates 16),
  // C cutting and gouging 23, D welding processes 54 (SMAW 18, FCAW/MCAW/GMAW 18, GTAW 13,
  // SAW 5). Scaled to 50: A 8, B 11, C 9, D 22. CSA W47.1, W48 and W59 at concept level only.
  blueprint: {
    caweldCommon: 8,
    caweldLayout: 5,
    caweldFab: 6,
    caweldCut: 9,
    caweldSmaw: 8,
    caweldWire: 7,
    caweldGtaw: 7,
  },
  trainingSets: testSets(9000, 4),
  categoryLabels: {
    caweldCommon: "Common Occupational Skills",
    caweldLayout: "Layout & Drawings",
    caweldFab: "Fabrication & Fit-Up",
    caweldCut: "Cutting & Gouging",
    caweldSmaw: "Shielded Metal Arc Welding (SMAW)",
    caweldWire: "GMAW, FCAW & MCAW",
    caweldGtaw: "GTAW & Submerged Arc (SAW)",
  },
  copy: {
    guestPrompt: "to save your Red Seal Welder progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all four Major Work Activities. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions in the Red Seal exam's proportions, 70% to pass",
    heroSubs: [
      "Four work activities, four tests. Welding processes are 44% of the exam.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Book your Red Seal exam.",
    ],
    sourceLine: "Based on the Red Seal exam breakdown for the 2023 Welder Occupational Standard. Original questions; always follow your company's welding procedures.",
    analyticsKey: "caweld",
  },
};

const auwhite: ExamConfig = {
  id: "auwhite",
  stateCode: "AUWHITE",
  idBase: 8100,
  slug: "/white-card",
  landingPath: "/white-card-practice-test",
  name: "White Card Practice Test",
  shortName: "White Card",
  examLabel: "White Card",
  fullName: "White Card course, CPCWHS1001 Prepare to work safely in the construction industry",
  questionIdPrefix: "AUWHITE-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // CPCWHS1001 Prepare to work safely in the construction industry, Release 2 (training.gov.au,
  // CPC Training Package 8.0, checked Oct 2026): general construction induction training under
  // Part 6.5 of the model WHS Regulations, delivered and assessed by an RTO through practical
  // demonstration, oral and written reporting. Competency-based, so there is no pass percentage;
  // 80% is a readiness line. Categories follow the unit's elements and knowledge evidence; the
  // unit publishes no weights, so the counts are ours. Model WHS laws; Victoria's OHS Act 2004
  // differs in wording only. All items original.
  blueprint: {
    auwhiteLaw: 8,
    auwhiteRisk: 6,
    auwhiteHeights: 6,
    auwhitePlant: 6,
    auwhiteHealth: 7,
    auwhiteEnv: 5,
    auwhiteSigns: 6,
    auwhiteEmerg: 6,
  },
  trainingSets: testSets(8100, 4),
  categoryLabels: {
    auwhiteLaw: "WHS Laws, Duties & Rights",
    auwhiteRisk: "Risk Management & SWMS",
    auwhiteHeights: "Heights, Collapse & Excavations",
    auwhitePlant: "Electrical, Plant & Traffic",
    auwhiteHealth: "Asbestos, Dust, Chemicals & Confined Spaces",
    auwhiteEnv: "Manual Handling, Noise, Sun & Fitness",
    auwhiteSigns: "Safety Signs & PPE",
    auwhiteEmerg: "Incidents, Emergencies & First Aid",
  },
  copy: {
    guestPrompt: "to save your White Card progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all eight White Card topic areas. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 80% readiness line (the real course has no set pass mark)",
    heroSubs: [
      "Eight topic areas, four practice tests. Aim for 40 of 50 or better.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Practise fitting your PPE and book your course.",
    ],
    sourceLine: "Based on the CPCWHS1001 unit of competency and the model WHS laws, checked October 2026. Original questions; your RTO trainer assesses the real course, including the practical tasks.",
    analyticsKey: "auwhite",
  },
};

const aursa: ExamConfig = {
  id: "aursa",
  stateCode: "AURSA",
  idBase: 9500,
  slug: "/rsa",
  landingPath: "/rsa-practice-test",
  name: "RSA Practice Test",
  shortName: "RSA",
  examLabel: "RSA assessment (SITHFAB021)",
  fullName: "SITHFAB021 Provide responsible service of alcohol (Australia)",
  questionIdPrefix: "AURSA-",
  icon: "wine",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // SITHFAB021 Provide responsible service of alcohol, Release 1 (training.gov.au, generated July
  // 2024, checked Oct 2026): 4 elements plus the knowledge evidence in its assessment requirements.
  // No national exam or published weights: RTOs assess, usually requiring every knowledge question
  // correct, so 80% is a readiness line. Counts are ours. State rules (ID, minors, certification,
  // delivery) are "varies by state". All items original.
  blueprint: {
    aursaLaw: 9,
    aursaAge: 9,
    aursaDrinks: 9,
    aursaIntox: 9,
    aursaRefuse: 8,
    aursaCare: 6,
  },
  trainingSets: testSets(9500, 4),
  categoryLabels: {
    aursaLaw: "RSA Law & Harm Minimisation",
    aursaAge: "Minors & Proof of Age",
    aursaDrinks: "Standard Drinks & Effects",
    aursaIntox: "Recognising Intoxication",
    aursaRefuse: "Refusing Service",
    aursaCare: "At-Risk Customers & Safety",
  },
  copy: {
    guestPrompt: "to save your RSA progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all six topic areas. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 80% readiness line",
    heroSubs: [
      "Six topic areas, four practice tests. Aim for 40 of 50 on each.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Check your state's RSA rules and book your course.",
    ],
    sourceLine: "Based on SITHFAB021 Provide responsible service of alcohol and its assessment requirements, checked October 2026. Original questions; 80% is a readiness target, not an official pass mark, and state rules vary.",
    analyticsKey: "aursa",
  },
};

const aurcg: ExamConfig = {
  id: "aurcg",
  stateCode: "AURCG",
  idBase: 9600,
  slug: "/rcg",
  landingPath: "/rcg-practice-test",
  name: "RCG Practice Test",
  shortName: "RCG",
  examLabel: "RCG / RSG assessment",
  fullName: "SITHGAM022 Provide responsible gambling services (RCG / RSG)",
  questionIdPrefix: "AURCG-",
  icon: "shield",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // SITHGAM022 Provide responsible gambling services, SIT training package, Release 1 (current on
  // training.gov.au, checked Oct 2026; supersedes SITHGAM001, no successor). Elements: implement
  // responsible gambling practices; provide information and assistance on gambling harm. States
  // call it RCG (NSW) or RSG (Vic, Qld...) and add their own rules ("varies by state" here). The
  // unit is competency based with no national pass mark, so 80% is a readiness line. Category
  // counts are ours, from the unit's knowledge and performance evidence. All items original.
  blueprint: {
    aurcgLaw: 8,
    aurcgHarm: 9,
    aurcgOdds: 7,
    aurcgEnv: 8,
    aurcgExcl: 7,
    aurcgAssist: 7,
    aurcgIncident: 4,
  },
  trainingSets: testSets(9600, 4),
  categoryLabels: {
    aurcgLaw: "Laws, Codes & Compliance",
    aurcgHarm: "Gambling Harm & Warning Signs",
    aurcgOdds: "Odds, Chance & Gambling Myths",
    aurcgEnv: "Safer Gambling Environment",
    aurcgExcl: "Self-Exclusion & Exclusion",
    aurcgAssist: "Helping Customers & Support Services",
    aurcgIncident: "Incidents, Complaints & Records",
  },
  copy: {
    guestPrompt: "to save your RCG progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all seven topic areas. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 80% readiness line",
    heroSubs: [
      "Seven topic areas, four mock tests. Aim for 40 of 50.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Check your state's extra rules before your assessment.",
    ],
    sourceLine: "Based on the national unit SITHGAM022 Provide responsible gambling services and its assessment requirements, checked October 2026. Original questions; state rules vary, and 80% is a readiness line, not an official pass mark.",
    analyticsKey: "aurcg",
  },
};

const aufss: ExamConfig = {
  id: "aufss",
  stateCode: "AUFSS",
  idBase: 9700,
  slug: "/food-safety-supervisor",
  landingPath: "/food-safety-supervisor-practice-test",
  name: "Food Safety Supervisor Practice Test",
  shortName: "Food Safety Supervisor",
  examLabel: "food safety supervisor",
  fullName: "Food Safety Supervisor course, SITXFSA005 and SITXFSA006 (Australia)",
  questionIdPrefix: "AUFSS-",
  icon: "chef",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // Australian food safety supervisor (checked October 2026): FSANZ Standard 3.2.2A (supervisor, food handler
  // training, records; in force December 2023) on top of Standards 3.2.2 and 3.2.3, and the hospitality units
  // SITXFSA005 Use hygienic practices for food safety and SITXFSA006 Participate in safe food handling practices
  // (Release 1). NSW key focus areas (allergens, eggs, cleaning and sanitising, Food Act offences) included and
  // labelled as NSW. Assessment is competency based with no pass mark and no published weights, so counts are
  // ours and 80% is a readiness line. State rules (notification, renewal, rating schemes) are "varies by state".
  blueprint: {
    aufssLaw: 7,
    aufssHazards: 8,
    aufssHygiene: 8,
    aufssTemp: 9,
    aufssHandling: 6,
    aufssClean: 6,
    aufssAllergen: 6,
  },
  trainingSets: testSets(9700, 4),
  categoryLabels: {
    aufssLaw: "Food Safety Law & Supervision",
    aufssHazards: "Hazards & Foodborne Illness",
    aufssHygiene: "Personal Hygiene & Health",
    aufssTemp: "Temperature Control",
    aufssHandling: "Receiving, Storage & Display",
    aufssClean: "Cleaning, Sanitising & Pests",
    aufssAllergen: "Allergens & Eggs",
  },
  copy: {
    guestPrompt: "to save your food safety supervisor progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all seven topics. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 80% readiness line",
    heroSubs: [
      "Seven topics, four mock tests. Temperature control is the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your supervisor assessment.",
    ],
    sourceLine: "Based on FSANZ Standards 3.2.2 and 3.2.2A and units SITXFSA005 and SITXFSA006. Original questions; the real course is competency based, with no pass mark.",
    analyticsKey: "aufss",
  },
};

const aufirstaid: ExamConfig = {
  id: "aufirstaid",
  stateCode: "AUFIRSTAID",
  idBase: 9800,
  slug: "/au-first-aid",
  landingPath: "/first-aid-course-practice-test-australia",
  name: "HLTAID011 Provide First Aid Practice Test",
  shortName: "First Aid (HLTAID011)",
  examLabel: "HLTAID011 Provide First Aid",
  fullName: "HLTAID011 Provide First Aid knowledge assessment (Australia)",
  questionIdPrefix: "AUFIRSTAID-",
  icon: "bandage",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // HLTAID011 Provide First Aid (training.gov.au, Release 1): categories follow the unit's
  // knowledge evidence list (legal and WHS considerations, CPR and AED, and the listed conditions
  // from anaphylaxis to stroke). Clinical answers follow the Australian Resuscitation Council
  // (ANZCOR) guidelines; allergy items follow ASCIA; workplace items follow Safe Work Australia's
  // model Code of Practice on first aid. RTOs set their own knowledge assessments and there is no
  // national pass mark; 80% is a readiness line. No body publishes topic weights; counts are ours.
  // All items original.
  blueprint: {
    aufirstaidRole: 7,
    aufirstaidCpr: 9,
    aufirstaidAirway: 7,
    aufirstaidBleed: 7,
    aufirstaidBones: 6,
    aufirstaidMedical: 6,
    aufirstaidEnviro: 4,
    aufirstaidVenom: 4,
  },
  trainingSets: testSets(9800, 4),
  categoryLabels: {
    aufirstaidRole: "Role, Legal & DRSABCD",
    aufirstaidCpr: "CPR, AED & the Unconscious Casualty",
    aufirstaidAirway: "Choking, Asthma & Anaphylaxis",
    aufirstaidBleed: "Bleeding, Shock, Wounds & Eyes",
    aufirstaidBones: "Fractures, Sprains, Head & Spine",
    aufirstaidMedical: "Heart, Stroke, Diabetes, Seizures & Poisons",
    aufirstaidEnviro: "Burns, Heat, Cold & Smoke",
    aufirstaidVenom: "Bites & Stings",
  },
  copy: {
    guestPrompt: "to save your first aid course progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all eight parts of HLTAID011. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions across HLTAID011 Provide First Aid",
    heroSubs: [
      "Eight topics, four mock tests. CPR is the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Practise 2 minutes of floor CPR on your course.",
    ],
    sourceLine: "Based on the HLTAID011 unit on training.gov.au and current Australian Resuscitation Council guidelines. Training organisations set their own knowledge quizzes; 80% here is a readiness line.",
    analyticsKey: "aufirstaid",
  },
};

const auforklift: ExamConfig = {
  id: "auforklift",
  stateCode: "AUFORKLIFT",
  idBase: 9900,
  slug: "/au-forklift-licence",
  landingPath: "/forklift-licence-practice-test-australia",
  name: "Forklift Licence Practice Test (Australia)",
  shortName: "Forklift Licence",
  examLabel: "forklift licence knowledge assessment",
  fullName: "Australian high risk work licence, class LF (TLILIC0003 Licence to operate a forklift truck)",
  questionIdPrefix: "AUFORKLIFT-",
  icon: "forklift",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // High risk work licence class LF, assessed against TLILIC0003 Licence to operate a forklift truck
  // (Assessment Requirements R1, training.gov.au, checked Oct 2026): knowledge assessment (incl. load
  // weight calculations) plus a practical on a real AS 2359 truck, by an accredited assessor using
  // Safe Work Australia's national assessment materials; licence issued by the state or territory
  // regulator (18+, 5 years, apply within 60 days). No per-topic weights are published, so counts
  // are ours: licensing/WHS 14%, hazards/traffic 18%, checks 16%, load charts/calcs 20%,
  // operation 20%, attachments/fuel/shutdown 12%. The 80% line is a practice target. All items original.
  blueprint: {
    auforkliftLicence: 7,
    auforkliftPlan: 9,
    auforkliftChecks: 8,
    auforkliftLoads: 10,
    auforkliftOperate: 10,
    auforkliftPower: 6,
  },
  trainingSets: testSets(9900, 4),
  categoryLabels: {
    auforkliftLicence: "Licensing, WHS Law & Duties",
    auforkliftPlan: "Planning, Hazards & Traffic",
    auforkliftChecks: "Pre-start & Operational Checks",
    auforkliftLoads: "Load Charts, Stability & Calculations",
    auforkliftOperate: "Safe Operation & Load Handling",
    auforkliftPower: "Attachments, Fuel & Shutdown",
  },
  copy: {
    guestPrompt: "to save your forklift licence progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all six LF topics. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions across every LF topic, 80% to pass",
    heroSubs: [
      "Six topics, four tests. Load charts and calculations count the most.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your LF knowledge assessment.",
    ],
    sourceLine: "Based on the TLILIC0003 unit and the high risk work licence rules. Original questions, not the official assessment; fees and forms vary by state.",
    analyticsKey: "auforklift",
  },
};

const auwah: ExamConfig = {
  id: "auwah",
  stateCode: "AUWAH",
  idBase: 10000,
  slug: "/working-at-heights",
  landingPath: "/working-at-heights-practice-test",
  name: "Working at Heights Practice Test",
  shortName: "Working at Heights",
  examLabel: "Working at heights (RIIWHS204)",
  fullName: "RIIWHS204 Work safely at heights (formerly RIIWHS204E) knowledge assessment",
  questionIdPrefix: "AUWAH-",
  icon: "hardhat",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 80,
  // RIIWHS204 Work safely at heights (RII Training Package, release 1, 2 Sept 2026; supersedes and
  // is equivalent to RIIWHS204E; training.gov.au checked 30 Oct 2026). Topics follow its knowledge
  // evidence (WHS legislation and documentation, heights safety systems, safe work methods, equipment,
  // manufacturer instructions, shifting tools and materials, hazards and emergencies) with detail from
  // the model WHS Regulations on falls (regs 78 to 80) and the Safe Work Australia model Codes of
  // Practice on managing the risk of falls at workplaces and in housing construction. RTOs write their
  // own knowledge assessment and the unit sets no question count or pass mark, so 80% is a readiness
  // line and the counts are ours. State and territory differences are "varies". All items original.
  blueprint: {
    auwahLaw: 6,
    auwahRisk: 7,
    auwahControl: 7,
    auwahPlatform: 7,
    auwahLadder: 6,
    auwahHarness: 8,
    auwahRoof: 5,
    auwahRescue: 4,
  },
  trainingSets: testSets(10000, 4),
  categoryLabels: {
    auwahLaw: "WHS Laws, Duties & Licences",
    auwahRisk: "Hazards & Risk Assessment",
    auwahControl: "Hierarchy of Control for Falls",
    auwahPlatform: "Edge Protection, Scaffolds & EWPs",
    auwahLadder: "Ladders",
    auwahHarness: "Harnesses, Lanyards & Anchors",
    auwahRoof: "Roof Work & Housing Construction",
    auwahRescue: "Rescue, Emergencies & Clean-up",
  },
  copy: {
    guestPrompt: "to save your working at heights progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per practice test, each holding exactly that test's 50 questions across all eight topics. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 50 questions, 80% to be ready for the course assessment",
    heroSubs: [
      "Eight topics, four practice tests. Aim for 40 of 50 on each.",
      "Master each set, then take its test.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. Practise the hands-on checks and book your course.",
    ],
    sourceLine: "Based on RIIWHS204 Work safely at heights (formerly RIIWHS204E), the model WHS Regulations on falls and the Safe Work Australia falls codes of practice. Original questions; works for any RTO's course.",
    analyticsKey: "auwah",
  },
};

const uklitu: ExamConfig = {
  id: "uklitu",
  stateCode: "UKLITU",
  idBase: 10100,
  slug: "/life-in-the-uk",
  landingPath: "/life-in-the-uk-test",
  name: "Life in the UK Practice Test",
  shortName: "Life in the UK",
  examLabel: "Life in the UK test",
  fullName: "Life in the UK test (settlement and British citizenship)",
  questionIdPrefix: "LITU-",
  icon: "flag",
  testCount: 8,
  questionsPerTest: 24,
  passPct: 75,
  // Real test (GOV.UK, checked October 2026): 24 questions in 45 minutes, 18 of 24 (75%) to pass,
  // drawn only from the Home Office handbook "Life in the United Kingdom: A Guide for New
  // Residents", 3rd edition (2013; no newer edition as of October 2026, though a reform was
  // signalled with the 2025 earned settlement proposals). The Home Office publishes no per-chapter
  // counts; these follow the handbook's chapters with history (chapter 3, split at 1688/1689)
  // weighted heaviest, 9 of 24. Eight real-length tests; each pool is 8x its count, plus 2
  // training-only spares in the four large categories. All items original.
  blueprint: {
    lituValues: 2,
    lituUk: 1,
    lituHistEarly: 4,
    lituHistLater: 5,
    lituSociety: 6,
    lituGov: 6,
  },
  trainingSets: [
    { setNumber: 1, id: 10101, name: "Values, the UK & History to 1688", categories: ["lituValues", "lituUk", "lituHistEarly"], size: 58, weightLabel: "7 of 24 test questions" },
    { setNumber: 2, id: 10102, name: "History from 1689", categories: ["lituHistLater"], size: 42, weightLabel: "5 of 24 test questions" },
    { setNumber: 3, id: 10103, name: "A Modern, Thriving Society", categories: ["lituSociety"], size: 50, weightLabel: "6 of 24 test questions" },
    { setNumber: 4, id: 10104, name: "Government, Law & Your Role", categories: ["lituGov"], size: 50, weightLabel: "6 of 24 test questions" },
  ],
  categoryLabels: {
    lituValues: "Values & Principles of the UK",
    lituUk: "What Is the UK",
    lituHistEarly: "History to 1688",
    lituHistLater: "History from 1689",
    lituSociety: "A Modern, Thriving Society",
    lituGov: "Government, Law & Your Role",
  },
  copy: {
    guestPrompt: "to save your Life in the UK progress and track every question you miss",
    trainingHeading: "Train by handbook chapter",
    trainingSub: "Four sets covering every chapter of the official handbook. Instant feedback, and missed questions come back until you master them.",
    testsHeading: "Mock tests · 24 questions like the real test, 18 to pass",
    heroSubs: [
      "Four chapters, eight real-length tests. History weighs most.",
      "Master each set, then test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your Life in the UK test.",
    ],
    sourceLine: "Based on the official handbook, Life in the United Kingdom: A Guide for New Residents (3rd edition). Original questions; 24 per test, 18 to pass like the real test.",
    analyticsKey: "uklitu",
  },
};

const cacit: ExamConfig = {
  id: "cacit",
  stateCode: "CACIT",
  idBase: 10200,
  slug: "/canadian-citizenship",
  landingPath: "/canadian-citizenship-test",
  name: "Canadian Citizenship Test Practice",
  shortName: "Citizenship (Canada)",
  examLabel: "Canadian citizenship test",
  fullName: "Canadian citizenship test (IRCC)",
  questionIdPrefix: "CACIT-",
  icon: "flag",
  testCount: 8,
  questionsPerTest: 20,
  passPct: 75,
  // IRCC citizenship test (checked October 2026): 20 multiple-choice or true/false questions in
  // 45 minutes, 15 of 20 to pass, every question from the study guide "Discover Canada: The Rights
  // and Responsibilities of Citizenship" (2009, rev. 2011, still current). IRCC publishes no
  // per-chapter weights, so counts follow the guide's chapters, heaviest on history and
  // government. Officeholders are not asked; every provincial and territorial capital is.
  // Facts the guide predates (343 ridings, CUSMA, G7) are taught as of 2026. All items original.
  blueprint: {
    cacitRights: 2,
    cacitPeople: 2,
    cacitHistory: 4,
    cacitModern: 1,
    cacitGov: 3,
    cacitElect: 2,
    cacitJustice: 1,
    cacitSymbols: 2,
    cacitEconomy: 1,
    cacitRegions: 2,
  },
  trainingSets: [
    { setNumber: 1, id: 10201, name: "Rights & Who We Are", categories: ["cacitRights", "cacitPeople"], size: 40, weightLabel: "4 of 20 test questions" },
    { setNumber: 2, id: 10202, name: "Canada's History", categories: ["cacitHistory", "cacitModern"], size: 52, weightLabel: "5 of 20 test questions" },
    { setNumber: 3, id: 10203, name: "Government, Elections & Justice", categories: ["cacitGov", "cacitElect", "cacitJustice"], size: 60, weightLabel: "6 of 20 test questions" },
    { setNumber: 4, id: 10204, name: "Symbols, Economy & Regions", categories: ["cacitSymbols", "cacitEconomy", "cacitRegions"], size: 48, weightLabel: "5 of 20 test questions" },
  ],
  categoryLabels: {
    cacitRights: "Rights & Responsibilities",
    cacitPeople: "Who We Are",
    cacitHistory: "Canada's History",
    cacitModern: "Modern Canada",
    cacitGov: "How Canadians Govern Themselves",
    cacitElect: "Federal Elections",
    cacitJustice: "The Justice System",
    cacitSymbols: "Canadian Symbols",
    cacitEconomy: "Canada's Economy",
    cacitRegions: "Regions & Capitals",
  },
  copy: {
    guestPrompt: "to save your citizenship test progress and track every question you miss",
    trainingHeading: "Train by chapter of Discover Canada",
    trainingSub: "Four sets that together hold all 200 questions, chapter by chapter. Missed questions come back until you master them.",
    testsHeading: "Practice tests · 20 questions, 15 to pass, like the real test",
    heroSubs: [
      "Four chapters to train, eight real-length tests.",
      "Master each set, then take the tests.",
      "Halfway there. Try a practice test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your citizenship test.",
    ],
    sourceLine: "Based on Discover Canada, IRCC's official study guide. Original questions; facts that changed since the guide was printed are updated to 2026.",
    analyticsKey: "cacit",
  },
};

const aucit: ExamConfig = {
  id: "aucit",
  stateCode: "AUCIT",
  idBase: 10300,
  slug: "/australian-citizenship",
  landingPath: "/australian-citizenship-test",
  name: "Australian Citizenship Test Practice",
  shortName: "Citizenship (Australia)",
  examLabel: "Australian citizenship test",
  fullName: "Australian citizenship test (Our Common Bond)",
  questionIdPrefix: "AUCIT-",
  icon: "flag",
  testCount: 8,
  questionsPerTest: 20,
  passPct: 75,
  // Department of Home Affairs, "Australian Citizenship: Our Common Bond", testable section (current
  // edition, checked 2026-10-30: King Charles III, Türkiye, "over 150" MPs). Real test: 20 multiple-choice
  // questions in English, 45 minutes, five of them on Australian values (since 15 Nov 2020); pass = at
  // least 75% overall AND all five values questions correct. Home Affairs does not publish the split
  // of the other 15 across parts 1 to 3, so 5/4/6 is ours, roughly by the length of each part. The
  // values rule is not enforced by the engine; the copy tells people to check it. All items original.
  blueprint: {
    aucitPeople: 5,
    aucitDemocracy: 4,
    aucitGov: 6,
    aucitValues: 5,
  },
  trainingSets: [
    { setNumber: 1, id: 10301, name: "Australia and Its People", categories: ["aucitPeople"], size: 48, weightLabel: "Part 1 · 5 of 20 test questions" },
    { setNumber: 2, id: 10302, name: "Democratic Beliefs, Rights & Liberties", categories: ["aucitDemocracy"], size: 42, weightLabel: "Part 2 · 4 of 20 test questions" },
    { setNumber: 3, id: 10303, name: "Government & the Law", categories: ["aucitGov"], size: 60, weightLabel: "Part 3 · 6 of 20 test questions" },
    { setNumber: 4, id: 10304, name: "Australian Values", categories: ["aucitValues"], size: 50, weightLabel: "Part 4 · 5 of 20, all 5 must be right" },
  ],
  categoryLabels: {
    aucitPeople: "Australia and Its People",
    aucitDemocracy: "Democratic Beliefs, Rights & Liberties",
    aucitGov: "Government & the Law",
    aucitValues: "Australian Values",
  },
  copy: {
    guestPrompt: "to save your citizenship test progress and track every question you miss",
    trainingHeading: "Train each part of Our Common Bond",
    trainingSub: "Four sets, one per part of the book. Australian values has its own set because one values mistake fails the real test. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 20 questions, 15 to pass, all 5 values right",
    heroSubs: [
      "Four parts, eight 20-question mock tests. Start with values.",
      "Master each part, then take a mock test.",
      "Halfway there. Keep every values answer right.",
      "Fix the misses, then retake.",
      "All done. You are ready for your citizenship test.",
    ],
    sourceLine: "Based on Australian Citizenship: Our Common Bond (Department of Home Affairs). Original questions. The real test also needs all five values questions right; check yours after each mock test.",
    analyticsKey: "aucit",
  },
};

const gulfrn: ExamConfig = {
  id: "gulfrn",
  stateCode: "GULFRN",
  idBase: 10500,
  slug: "/gulf-nursing-exam",
  landingPath: "/prometric-nursing-exam-practice-test",
  name: "Gulf Nursing Licensing Exam Practice Test",
  shortName: "Gulf RN",
  examLabel: "Gulf nursing exam",
  fullName: "Registered Nurse Licensing Exam (DHA, DOH, MOHAP, SCFHS, DHP, Oman, Kuwait, Bahrain)",
  questionIdPrefix: "GULFRN-",
  icon: "stethoscope",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  // Gulf registered nurse licensing exams (checked October 2026). Each authority sets its own
  // exam. Qatar DHP's Qualifying Examination Blueprint: 150 MCQs, pass 50%, Nursing Fundamentals 30,
  // Adult Nursing 61, Maternal-Child 44, Unit Management and Leadership 15. SCFHS SNLE Applicant
  // Guide (2024): 200 MCQs in two 120-minute parts, same four sections (adult nursing includes
  // critical care, community and mental health; fundamentals includes pharmacology and nutrition),
  // pass 500 on 200-800. Counts follow that 20/40/30/10 split, with adult nursing split by system.
  // DHA, DOH, MOHAP, Oman, Kuwait and Bahrain figures were not verifiable from official pages.
  // 60% is a readiness line a little above the 50% marks DHP publishes. All items original.
  blueprint: {
    gulfrnFund: 7,
    gulfrnPharm: 4,
    gulfrnCardioResp: 7,
    gulfrnMedSurg: 8,
    gulfrnMental: 3,
    gulfrnCommunity: 2,
    gulfrnMaternal: 7,
    gulfrnPeds: 7,
    gulfrnLead: 5,
  },
  trainingSets: testSets(10500, 4),
  categoryLabels: {
    gulfrnFund: "Nursing Fundamentals",
    gulfrnPharm: "Pharmacology & Dosage",
    gulfrnCardioResp: "Cardiovascular & Respiratory",
    gulfrnMedSurg: "Medical-Surgical Nursing",
    gulfrnMental: "Mental Health Nursing",
    gulfrnCommunity: "Community Health Nursing",
    gulfrnMaternal: "Maternal & Newborn Nursing",
    gulfrnPeds: "Pediatric Nursing",
    gulfrnLead: "Leadership, Ethics & Infection Control",
  },
  copy: {
    guestPrompt: "to save your nursing exam progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions across all nine topics. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 60% to pass",
    heroSubs: [
      "Nine topics, four mock tests. Adult nursing is the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. You are ready for your licensing exam.",
    ],
    sourceLine: "Based on the registered nurse blueprints published by Qatar's DHP and Saudi Arabia's SCFHS. Original questions; each authority sets its own length and pass mark.",
    analyticsKey: "gulfrn",
  },
};

const inrto: ExamConfig = {
  id: "inrto",
  stateCode: "INRTO",
  idBase: 10600,
  slug: "/india-learners-licence",
  landingPath: "/rto-learners-licence-test",
  name: "RTO Learner's Licence Practice Test",
  shortName: "LL Test",
  examLabel: "learner's licence test",
  fullName: "Learner's Licence (LL) Test, RTO / Sarathi Parivahan (India)",
  questionIdPrefix: "INRTO-",
  icon: "car",
  testCount: 4,
  questionsPerTest: 50,
  passPct: 60,
  // India's learner's licence test (checked October 2026). Written from the Motor Vehicles Act 1988 as
  // amended in 2019, the Central Motor Vehicles Rules 1989 (Rule 11: online tutorial, 60% to pass), the
  // Motor Vehicles (Driving) Regulations 2017 (which replaced the Rules of the Road Regulations 1989) and the road signs in the Act's schedule (mandatory, cautionary,
  // informatory). Each state sets the question count (Kerala 30, 18 to pass since Oct 2025; few states publish theirs),
  // so passPct is the central 60%. A draft of Oct 2026 proposes 75%; not in force.
  // No state publishes topic weights, so counts are ours, weighted to signs and the rules of the road.
  // Sign questions show drawn signs (public/signs/in, lib/signImages.ts); no fine amounts (states may raise the 2019 minimums).
  blueprint: {
    inrtoLicence: 6,
    inrtoMandatory: 8,
    inrtoCaution: 7,
    inrtoSignals: 6,
    inrtoRules: 9,
    inrtoParking: 5,
    inrtoSafety: 5,
    inrtoDuties: 4,
  },
  trainingSets: testSets(10600, 4),
  categoryLabels: {
    inrtoLicence: "Licences, Learner Rules & Documents",
    inrtoMandatory: "Mandatory Road Signs",
    inrtoCaution: "Cautionary & Informatory Signs",
    inrtoSignals: "Traffic Lights, Hand Signals & Markings",
    inrtoRules: "Rules of the Road",
    inrtoParking: "Parking, Horn, Lights & Towing",
    inrtoSafety: "Helmets, Seat Belts, Alcohol & Phones",
    inrtoDuties: "Accidents, Insurance, PUC & RC",
  },
  copy: {
    guestPrompt: "to save your learner's licence progress and track every question you miss",
    trainingHeading: "Train for each test",
    trainingSub: "Four sets, one per mock test, each holding exactly that test's 50 questions: road signs, traffic lights and hand signals, the rules of the road, parking, helmets and seat belts, and accident duties. Missed questions come back until you master them.",
    testsHeading: "Mock tests · 50 questions, 60% to pass",
    heroSubs: [
      "Eight topics, four mock tests. Road signs are the biggest.",
      "Master each set, then take its test.",
      "Halfway there. Try a mock test.",
      "Fix the misses, then retake.",
      "All done. Book your LL test on Sarathi.",
    ],
    sourceLine: "Based on the Motor Vehicles Act 1988 (as amended in 2019), the Central Motor Vehicles Rules and the Motor Vehicles (Driving) Regulations 2017. Original questions; the test format varies by state, 60% to pass.",
    analyticsKey: "inrto",
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

export const EXAMS: ExamConfig[] = [cdl, cdlx, moto, civics, part107, ham, epa608, cna, ptcb, phleb, ccma, cet, danb, foodmgr, realestate, insurance, notary, foodhandler, boating, hunter, cpr, osha, forklift, alcohol, security, lifeguard, pnc, cosmetology, vtne, ukcar, ukmoto, uklgv, ukpcv, ukadi, caon, caqc, cabc, caab, camb, aunsw, auvic, auqld, auwa, ausa, uksia, uk18ed, cscs, ukfood, ukaplh, ukfaw, ukcare, capal, caelec, capsw, casfa, cawhmis, caguard, caauto, caplumb, cacarp, caweld, auwhite, aursa, aurcg, aufss, aufirstaid, auforklift, auwah, uklitu, cacit, aucit, gulfrn, inrto, htl, cst, crcst];

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
