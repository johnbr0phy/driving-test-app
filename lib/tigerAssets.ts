/** Add an exam only after all eight expressions have passed visual review. */
export const TIGER_EXAM_IDS = [
  "driving", // Car-test mascot; original site branding remains at the public root.
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
  // Citizenship and project management: complete eight-expression sets.
  "uklitu", "cacit", "aucit", "pmp",
] as const;

export type TigerExpression = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const completedSets = new Set<string>(TIGER_EXAM_IDS);

/**
 * Driving exams use the shared car-driver, motorcycle, or CDL tiger.
 * Site branding and generic quizzes keep the original root artwork.
 * Remove an entry once that exam has its own eight expressions.
 */
const BORROWED_SETS: Record<string, string> = {
  dmv: "driving",
  ukcar: "driving", ukadi: "driving", ukmoto: "moto", uklgv: "cdl", ukpcv: "cdl",
  caon: "driving", caqc: "driving", cabc: "driving", caab: "driving", camb: "driving",
  aunsw: "driving", auvic: "driving", auqld: "driving", auwa: "driving", ausa: "driving", inrto: "driving",
  // Global certifications and nursing exams wear their nearest US exam's tiger.
  awssaa: "aws", az900: "aws", ccna: "aplus", gulfrn: "nclex", uknmc: "nclex",
  cask: "driving", cans: "driving", nzroad: "driving", iedtt: "driving",
  psat: "sat", netplus: "secplus", gcdl: "aws",
};

export function hasTigerSet(examId: string): boolean {
  return examId === "dmv" || completedSets.has(examId) || examId in BORROWED_SETS;
}

/** The original site mascot, distinct from any test-specific character. */
export function getSiteTigerAsset(expression?: TigerExpression): string {
  return expression === undefined
    ? "/tiger.png"
    : `/tiger_face_${String(expression).padStart(2, "0")}.png`;
}

/** Unfinished and unknown exams retain the original site artwork. */
export function getTigerAsset(examId = "dmv", expression?: TigerExpression): string {
  examId = BORROWED_SETS[examId] ?? examId;
  if (completedSets.has(examId)) {
    return `/tigers/${examId}/tiger_face_${String(expression ?? 3).padStart(2, "0")}.png`;
  }
  return getSiteTigerAsset(expression);
}
