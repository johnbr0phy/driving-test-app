/** Add an exam only after all eight expressions have passed visual review. */
export const TIGER_EXAM_IDS = [
  "cdl", "cdlx", "moto", "civics", "part107", "ham", "epa608",
  "cna", "ptcb", "phleb", "cet", "htl", "cst", "crcst",
  "ccma", "danb", "emt", "foodmgr", "realestate", "insurance", "notary",
  "teas", "aws", "aplus", "foodhandler", "boating", "hunter", "secplus", "hesi",
  "asvab", "cpr", "osha", "forklift", "alcohol", "accuplacer",
  "security", "lifeguard", "pnc", "sat",
] as const;

export type TigerExpression = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const completedSets = new Set<string>(TIGER_EXAM_IDS);

export function hasTigerSet(examId: string): boolean {
  return examId === "dmv" || completedSets.has(examId);
}

/** Unfinished and unknown exams retain the existing DMV artwork. */
export function getTigerAsset(examId = "dmv", expression?: TigerExpression): string {
  if (completedSets.has(examId)) {
    return `/tigers/${examId}/tiger_face_${String(expression ?? 3).padStart(2, "0")}.png`;
  }
  return expression === undefined
    ? "/tiger.png"
    : `/tiger_face_${String(expression).padStart(2, "0")}.png`;
}
