/** Add an exam only after all eight expressions have passed visual review. */
export const TIGER_EXAM_IDS = [
  "cdl", "cdlx", "moto", "civics", "part107", "ham", "epa608",
  "cna", "ptcb", "phleb", "cet", "htl", "cst", "crcst",
  "ccma", "danb", "emt", "foodmgr", "realestate", "insurance", "notary",
  "teas", "aws", "aplus", "foodhandler", "boating", "hunter", "secplus", "hesi",
  "asvab", "cpr", "osha", "forklift", "alcohol", "accuplacer",
  "security", "lifeguard", "pnc", "sat", "act", "nclex",
  "cosmetology", "vtne", "paramedic", "nclexpn", "ged", "timestables",
  // UK: reviewed school, workplace and trade artwork.
  "ks2", "gcsemaths", "uksia", "uk18ed", "gcsehigher", "gcsescience",
  "gcsecs", "elevenplus", "fsmaths", "cscs", "ukfood", "ukaplh",
  "ukfaw", "ukcare",
  // CA: reviewed school, workplace and trade artwork.
  "osslt", "capal", "caelec", "caauto", "caplumb", "cacarp",
  "caweld", "capsw", "rexpn", "cawhmis", "caguard", "casfa",
  "eqao9",
  // AU: reviewed school, workplace and trade artwork.
  "naplan", "nswsel", "auwhite", "naplan7", "ocnsw", "vicsel",
  "hscmaths", "aursa", "aurcg", "aufss", "aufirstaid", "auforklift",
  "auwah",
] as const;

export type TigerExpression = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const completedSets = new Set<string>(TIGER_EXAM_IDS);

/**
 * International driving exams wear the matching US exam's tiger: the DMV tiger
 * for car tests, the motorcycle tiger, and the CDL tiger for lorries and buses.
 * Remove an entry once that exam has its own eight expressions.
 */
const BORROWED_SETS: Record<string, string> = {
  ukcar: "dmv", ukadi: "dmv", ukmoto: "moto", uklgv: "cdl", ukpcv: "cdl",
  caon: "dmv", caqc: "dmv", cabc: "dmv", caab: "dmv", camb: "dmv",
  aunsw: "dmv", auvic: "dmv", auqld: "dmv", auwa: "dmv", ausa: "dmv", inrto: "dmv",
  // Global certifications and nursing exams wear their nearest US exam's tiger.
  awssaa: "aws", az900: "aws", ccna: "aplus", gulfrn: "nclex", uknmc: "nclex",
};

export function hasTigerSet(examId: string): boolean {
  return examId === "dmv" || completedSets.has(examId) || examId in BORROWED_SETS;
}

/** Unfinished and unknown exams retain the existing DMV artwork. */
export function getTigerAsset(examId = "dmv", expression?: TigerExpression): string {
  examId = BORROWED_SETS[examId] ?? examId;
  if (completedSets.has(examId)) {
    return `/tigers/${examId}/tiger_face_${String(expression ?? 3).padStart(2, "0")}.png`;
  }
  return expression === undefined
    ? "/tiger.png"
    : `/tiger_face_${String(expression).padStart(2, "0")}.png`;
}
