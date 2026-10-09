// Question types
export type QuestionType = "Universal" | "State-Specific" | "CDL" | "CDLE" | "MOTO" | "CIVICS" | "P107" | "HAM" | "EPA608" | "CNA" | "PTCB" | "PHLEB" | "CCMA" | "CET" | "DANB" | "EMT" | "FOODMGR" | "REALESTATE" | "LIFEHEALTH" | "HTL" | "CST" | "CRCST";

// Test mode
export type TestMode = "dmv" | "cdl" | "htl";

// CDL question categories
export type CDLQuestionCategory =
  | "vehicleInspection"
  | "safeDriving"
  | "basicControl"
  | "cargoHandling"
  | "emergencyProcedures"
  | "alcoholDrugs"
  | "nightDriving"
  | "weatherDriving"
  | "mountainDriving"
  | "railroadCrossings"
  | "hazardPerception"
  | "brakingSystems"
  | "vehicleSystems";

export type QuestionCategory =
  | "general"
  | "speedLimits"
  | "duiBac"
  | "gdlLicensing"
  | "insurance"
  | "seatbeltPhone"
  | "pointsPenalties"
  | "stateUnique"
  | "vehicleInspection"
  | "safeDriving"
  | "basicControl"
  | "cargoHandling"
  | "emergencyProcedures"
  | "alcoholDrugs"
  | "nightDriving"
  | "weatherDriving"
  | "mountainDriving"
  | "railroadCrossings"
  | "hazardPerception"
  | "brakingSystems"
  | "vehicleSystems"
  // ASCP HT/HTL content areas
  | "fixation"
  | "processing"
  | "embeddingMicrotomy"
  | "staining"
  | "laboratoryOperations"
  // NBSTSA CST content areas
  | "preoperativePreparation"
  | "intraoperativeProcedures"
  | "postoperativeProcedures"
  | "administrativePersonnel"
  | "equipmentSterilization"
  | "anatomyPhysiology"
  | "microbiology"
  | "surgicalPharmacology"
  // HSPA CRCST content areas
  | "departmentalConsiderations"
  | "cleaningDecontamination"
  | "preparationPackaging"
  | "sterilizationProcess"
  | "sterileStorageInventory"
  | "patientCareEquipment"
  | "professionalDevelopment"
  // Motorcycle permit (MSF manual chapters; basicControl, specialSituations, alcoholDrugs reused)
  | "ridingPreparation"
  | "laneStrategy"
  | "intersectionsPassing"
  | "roadHazards"
  // USCIS civics test sections
  | "principlesDemocracy"
  | "systemGovernment"
  | "rightsResponsibilities"
  | "colonialIndependence"
  | "history1800s"
  | "recentHistory"
  | "symbolsHolidays"
  // CDL endorsements (FMCSA manual sections)
  | "hazmatEndorsement"
  | "airBrakes"
  | "combinationVehicles"
  | "tankVehicles"
  | "passengerTransport"
  // FAA Part 107 ACS areas
  | "regulations"
  | "airspace"
  | "weather"
  | "loadingPerformance"
  | "operations"
  // Amateur radio Technician subelements
  | "hamRules"
  | "hamOperating"
  | "hamPropagation"
  | "hamPractices"
  | "hamElectrical"
  | "hamComponents"
  | "hamCircuits"
  | "hamSignals"
  | "hamAntennas"
  | "hamSafety"
  // EPA Section 608 sections
  | "epaCore"
  | "epaType1"
  | "epaType2"
  | "epaType3"
  // CNA (NNAAP) content areas
  | "activitiesDailyLiving"
  | "basicNursingSkills"
  | "restorativeSkills"
  | "emotionalMentalHealth"
  | "spiritualCultural"
  | "communication"
  | "clientRights"
  | "legalEthical"
  | "healthCareTeam"
  // PTCB (PTCE) knowledge domains
  | "ptcbMedications"
  | "ptcbPatientSafety"
  | "ptcbOrderEntry"
  | "ptcbFederal"
  // Phlebotomy (NHA CPT) domains
  | "routineCollections"
  | "safetyCompliance"
  | "patientPreparation"
  | "specimenProcessing"
  | "specialCollections"
  // CCMA (NHA) domains
  | "ccmaFoundations"
  | "ccmaAnatomy"
  | "ccmaIntakeVitals"
  | "ccmaGeneralCare"
  | "ccmaInfectionSafety"
  | "ccmaLabProcedures"
  | "ccmaPhlebotomy"
  | "ccmaEkg"
  | "ccmaCareCoordination"
  | "ccmaAdministrative"
  | "ccmaCommunication"
  | "ccmaLawEthics"
  // CET (NHA EKG technician) domains
  | "ekgAcquisition"
  | "ekgSafetyPatientCare"
  | "ekgAnalysis"
  // DANB CDA components
  | "gcEvaluation"
  | "gcPatientManagement"
  | "gcChairside"
  | "gcDentalMaterials"
  | "rhsRadiography"
  | "iceInfectionControl"
  // NREMT EMT domains
  | "sceneSizeUp"
  | "primaryAssessment"
  | "secondaryAssessment"
  | "treatmentTransport"
  | "emsOperations"
  // Food protection manager content areas
  | "foodborneContamination"
  | "flowOfFood"
  | "timeTemperature"
  | "personalHygiene"
  | "cleaningSanitizing"
  | "facilitiesPests"
  | "managementSystems"
  // Real estate salesperson national exam
  | "rePropertyCharacteristics"
  | "reOwnershipTitle"
  | "reValuation"
  | "reContractsAgency"
  | "rePractice"
  | "reDisclosures"
  | "reFinancing"
  | "reMath"
  // Life and health insurance license exam
  | "insuranceRegulation"
  | "generalInsurance"
  | "lifeBasics"
  | "lifePolicyTypes"
  | "lifeProvisions"
  | "annuitiesRetirement"
  | "healthBasics"
  | "healthProvisions"
  | "healthPolicyTypes";

export interface Question {
  type: QuestionType;
  state: string; // 2-letter code or "ALL"
  questionId: string;
  category: QuestionCategory;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string; // "A", "B", "C", or "D"
  correctIndex: number; // 0, 1, 2, or 3
  explanation: string;
}

// User answer types
export interface UserAnswer {
  questionId: string;
  userAnswer: string; // "A", "B", "C", or "D"
  isCorrect: boolean;
  answeredAt: Date;
  isFlagged?: boolean;
}

// Test session types
export interface TestSession {
  id: string;
  testNumber: number; // 1-4
  state: string; // 2-letter code
  questions: Question[];
  answers: UserAnswer[];
  startedAt: Date;
  completedAt?: Date;
  score?: number;
  totalQuestions: number;
}

// User progress types
export interface UserProgress {
  userId: string;
  state: string; // 2-letter code
  test1Completed: boolean;
  test2Completed: boolean;
  test3Completed: boolean;
  test4Completed: boolean;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  lastActivity: Date;
  completedSessions: TestSession[];
}

// Category stats for progress tracking
export interface CategoryStats {
  category: QuestionCategory;
  totalAnswered: number;
  correctAnswers: number;
  accuracy: number; // percentage
}

// Test attempt statistics
export interface TestAttemptStats {
  testNumber: number;
  state: string;
  attemptCount: number;
  firstScore: number; // Score on first attempt
  bestScore: number; // Highest score achieved
  lastAttemptDate: Date;
}

// Per-question performance tracking
export interface QuestionPerformance {
  questionId: string;
  timesAnswered: number;
  timesCorrect: number;
  timesWrong: number;
  accuracy: number; // percentage
}

// State selection
export interface State {
  name: string;
  code: string; // 2-letter code
  slug: string; // URL-friendly name (e.g., "california")
  dmvName: string; // Official DMV name (e.g., "DMV", "BMV", "RMV")
  writtenTestQuestions: number; // Number of questions on actual DMV test
  passingScore: number; // Percentage needed to pass
  minPermitAge: string; // Minimum age for learner's permit
}

// Subscription/Premium types
export interface Subscription {
  isPremium: boolean;
  purchasedAt: string | null; // ISO timestamp
  stripeCustomerId: string | null;
  stripePaymentId: string | null;
}
