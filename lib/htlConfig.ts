/**
 * ASCP Histotechnologist (HTL) / Histotechnician (HT) exam configuration.
 *
 * Mirrors the CDL pattern: HTL practice tests and training sets live in the
 * same Zustand store as DMV/CDL data, namespaced by ID range so they never
 * collide. Test IDs 201-204 and training set IDs 201-205 are stored under
 * state code "HTL".
 *
 * Blueprint follows the ASCP BOC HT/HTL content guideline (revised Sept 25,
 * 2025): Staining 30-40%, Fixation 15-25%, Embedding/Microtomy 15-25%,
 * Processing 10-20%, Laboratory Operations 10-15%.
 */

export const HTL_STATE_CODE = "HTL";
export const HTL_ID_BASE = 200;
export const HTL_TEST_COUNT = 4;
export const HTL_QUESTIONS_PER_TEST = 50;
export const HTL_PASS_PERCENTAGE = 70;

export type HTLCategory =
  | "fixation"
  | "processing"
  | "embeddingMicrotomy"
  | "staining"
  | "laboratoryOperations";

/** Questions per content area in each 50-question practice test. */
export const HTL_TEST_BLUEPRINT: Record<HTLCategory, number> = {
  staining: 18,
  fixation: 10,
  embeddingMicrotomy: 10,
  processing: 7,
  laboratoryOperations: 5,
};

export interface HTLTrainingSetDef {
  /** 1-based set number used in URLs (?set=N). */
  setNumber: number;
  /** Store ID (HTL_ID_BASE + setNumber). */
  id: number;
  name: string;
  category: HTLCategory;
  /** Total questions in the bank for this category. */
  size: number;
}

/** Training sets are organised by ASCP content area rather than by test. */
export const HTL_TRAINING_SETS: HTLTrainingSetDef[] = [
  { setNumber: 1, id: 201, name: "Fixation", category: "fixation", size: 40 },
  { setNumber: 2, id: 202, name: "Processing", category: "processing", size: 28 },
  { setNumber: 3, id: 203, name: "Embedding & Microtomy", category: "embeddingMicrotomy", size: 40 },
  { setNumber: 4, id: 204, name: "Staining", category: "staining", size: 72 },
  { setNumber: 5, id: 205, name: "Laboratory Operations", category: "laboratoryOperations", size: 20 },
];

export const HTL_TRAINING_SET_COUNT = HTL_TRAINING_SETS.length;

export const htlTestId = (testNumber: number) => HTL_ID_BASE + testNumber;
export const htlSetId = (setNumber: number) => HTL_ID_BASE + setNumber;

export const isHTLTestId = (testId: number) =>
  testId > HTL_ID_BASE && testId <= HTL_ID_BASE + HTL_TEST_COUNT;

export const isHTLSetId = (setId: number) =>
  setId > HTL_ID_BASE && setId <= HTL_ID_BASE + HTL_TRAINING_SET_COUNT;

export function getHTLTrainingSetDef(setNumber: number): HTLTrainingSetDef | undefined {
  return HTL_TRAINING_SETS.find((s) => s.setNumber === setNumber);
}

export function getHTLTrainingSetSize(setId: number): number {
  return HTL_TRAINING_SETS.find((s) => s.id === setId)?.size ?? 50;
}

export const HTL_CATEGORY_LABELS: Record<HTLCategory, string> = {
  fixation: "Fixation",
  processing: "Processing",
  embeddingMicrotomy: "Embedding & Microtomy",
  staining: "Staining",
  laboratoryOperations: "Laboratory Operations",
};
