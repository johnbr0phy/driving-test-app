/**
 * Registry of the non-DMV, non-CDL exams that run on the shared TigerTest
 * flow (dashboard, tests, training, results debrief, drill, stats).
 *
 * Each exam is namespaced in the store by an ID range and a pseudo state
 * code so its progress never collides with DMV or CDL data:
 *   HTL   200s  (tests 201-204, sets 201-205)
 *   CST   300s  (tests 301-304, sets 301-305)
 *   CRCST 400s  (tests 401-404, sets 401-406)
 *
 * Adding an exam = one entry here, a question bank in data/, a data import
 * in lib/examData.ts, a theme block in globals.css, and app/<slug>/ wrappers.
 * This file must stay free of question-data imports (the store imports it).
 */

export type ExamId = "htl" | "cst" | "crcst";

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
  /** Store ID base; tests are idBase+1.., sets are idBase+1.. */
  idBase: number;
  /** URL base, e.g. "/htl". Landing page lives at the base itself. */
  slug: string;
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
  icon: "microscope" | "scissors" | "shield";
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

export const EXAMS: ExamConfig[] = [htl, cst, crcst];

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
  return EXAMS.find((e) => setId > e.idBase && setId <= e.idBase + e.trainingSets.length);
}

/** Exam whose pages a pathname belongs to (landing included), if any. */
export function getExamByPath(pathname: string | null | undefined): ExamConfig | undefined {
  if (!pathname) return undefined;
  return EXAMS.find((e) => pathname === e.slug || pathname.startsWith(`${e.slug}/`));
}

export function getExamTrainingSetSize(setId: number): number {
  const exam = getExamForSetId(setId);
  return exam?.trainingSets.find((s) => s.id === setId)?.size ?? 50;
}

export function isExamQuestionId(questionId: string): boolean {
  return EXAMS.some((e) => questionId.startsWith(e.questionIdPrefix));
}
