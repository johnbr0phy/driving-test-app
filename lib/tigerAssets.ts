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
  // Dedicated admissions and English-reading mascots: eight reviewed expressions each.
  "mcat", "lsat", "ieltsread",
  // UK: reviewed school, workplace and trade artwork.
  "ks2", "gcsemaths", "uksia", "uk18ed", "gcsehigher", "gcsescience",
  "gcsecs", "elevenplus", "fsmaths", "cscs", "ukfood", "ukaplh",
  "ukfaw", "ukcare",
  // UK gas engineer: reviewed analyser-and-probe set.
  "ukgas",
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
  // Reviewed professional role mascots: complete eight-expression sets.
  "ffi", "police", "faapvt", "nasm", "barber", "jelec",
  // Reviewed remaining exam mascots: complete eight-expression sets.
  "capm", "pcoc", "ibpspo",
  "psm", "praxis",
  "gre", "rbt", "ukseru", "ctet",
  "cissp",
  "itil", "cpc", "gmat",
  "sie", "series7", "ssccgl", "rrbntpc",
  // Reviewed AP subject and Philippine civil-service mascots.
  "appsych", "apush", "apbio", "apworld", "aplang", "apcalcab", "aphug", "apgov", "phcse",
  // Reviewed next-20 batch A professional exam mascots.
  "cpafar", "cpareg", "nmls", "series63", "series65",
  "aswb", "arrt", "nce", "texesppr", "praxisplt",
  // Reviewed next-20 batch B roles without a close existing family mascot.
  "nhie", "nptepta",
  // Reviewed next-20 batch C dietitian and human resources role mascots.
  "rdexam", "phr",
  // Reviewed EU citizenship and practitioner mascots: five complete sets for six exams.
  "semedb", "dkindfoed", "grcitizen", "rorezid", "deheilpr",
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
  hiset: "ged",
  ukwater: "caplumb",
  ukg3: "caplumb",
  ukplumb: "caplumb",
  ukrbi: "nhie",
  ukbregs: "nhie",
  ukcar: "driving", ukadi: "driving", ukmoto: "moto", uklgv: "cdl", ukpcv: "cdl",
  caon: "driving", caqc: "driving", cabc: "driving", caab: "driving", camb: "driving",
  aunsw: "driving", auvic: "driving", auqld: "driving", auwa: "driving", ausa: "driving", inrto: "driving",
  // Global certifications and nursing exams wear their nearest US exam's tiger.
  awssaa: "aws", az900: "aws", ccna: "aplus", gulfrn: "nclex", uknmc: "nclex",
  cask: "driving", cans: "driving", nzroad: "driving", iedtt: "driving",
  phlto: "driving", mykpp: "driving", sgbtt: "driving", hkdrive: "driving", aerta: "driving", zak53: "driving", zak53c3: "cdl", ngfrsc: "driving", kentsa: "driving",
  psat: "sat", netplus: "secplus", cysa: "secplus", gcdl: "aws", gcppca: "aws",
  // India exams wear their family's tiger; Pakistan's car test the car tiger; JNVST (age 10 to 12) the times tables tiger.
  ibpsclerk: "ibpspo", rrbgroupd: "rrbntpc", sscgd: "ssccgl", sscchsl: "ssccgl", sscmts: "ssccgl", uppolice: "police", jnvst: "timestables", mapgrowth: "timestables",
  pkdrive: "driving",
  // EU driving theory tests (Nov 2026) wear the car tiger.
  esdgt: "driving", ptimt: "driving", bedriving: "driving", dkteori: "driving", setrafik: "driving", fitheory: "driving", grdriving: "driving", rodrpciv: "driving", hukresz: "driving", mttheory: "driving", detheorie: "driving",
  // Spain (Nov 2026): CAP the CDL tiger, police exams the police tiger, vigilante the security tiger.
  escapcond: "cdl", espolicia: "police", esguardia: "police", esvigilante: "security",
  // Germany (Nov 2026): motorcycle the motorcycle tiger, AEVO the teaching tiger, 34a the security tiger.
  // Heilpraktiker has its own non-physician practitioner set above.
  demotorrad: "moto", deaevo: "praxisplt", de34a: "security",
  // Portugal (Nov 2026): motorcycle the motorcycle tiger, CAM the CDL tiger, TVDE the car tiger, vigilante the security tiger.
  ptmoto: "moto", ptcam: "cdl", pttvde: "driving", ptvigil: "security",
  // Malta (Nov 2026): motorcycle the motorcycle tiger, CPC the CDL tiger, taxi the car tiger, guard the security tiger.
  mtmoto: "moto", mtcpc: "cdl", mttaxi: "driving", mtguard: "security",
  // Sweden (Nov 2026): motorcycle the motorcycle tiger, jägarexamen the hunter tiger, högskoleprovet the SAT tiger.
  // Swedish citizenship has its own flag and civic-study set above.
  semoto: "moto", sejakt: "hunter", sehp: "sat",
  // Denmark (Nov 2026): motorcycle the motorcycle tiger, hunting the hunter tiger.
  // Citizenship and residence share the reviewed Danish flag and civic-study set.
  dkmoto: "moto", dkjagt: "hunter", dkmedborger: "dkindfoed",
  // Italy (Nov 2026): patente the car tiger, CILS and CELI the civics tiger.
  itpatente: "driving", itcils: "civics", itceli: "civics",
  // France (Nov 2026): code de la route the car tiger.
  frcode: "driving",
  // AP Italian (Nov 2026): the AP English Language tiger.
  apitalian: "aplang",
  // Finland (Nov 2026): motorcycle the motorcycle tiger, truck and bus the CDL tiger, hygiene passport the UK food hygiene tiger, hunting the hunter tiger.
  fimoto: "moto", fitruck: "cdl", fihygiene: "ukfood", fihunt: "hunter",
  // Hungary (Nov 2026): motorcycle the motorcycle tiger, GKI the CDL tiger, first aid the CPR tiger, insurance the life and health insurance tiger.
  hukreszmoto: "moto", hugki: "cdl", huelsoseg: "cpr", hubizt: "insurance",
  // Romania (Nov 2026): Driver CPC the CDL tiger, taxi the car tiger, medicine admission the SAT tiger.
  // Rezidențiat has its own medical-resident set above, without nursing insignia.
  rocpi: "cdl", rotaxi: "driving", roadmed: "sat",
  // Greece (Nov 2026): motorcycle the motorcycle tiger, security the security guard tiger.
  // Greek citizenship has its own flag and civic-study set above.
  grmoto: "moto", grsecurity: "security", grinsure: "insurance",
  // Belgium (Nov 2026): motorcycle the motorcycle tiger, truck the CDL tiger, medicine admission the SAT tiger, insurance the life and health insurance tiger.
  bemoto: "moto", bevracht: "cdl", betoelating: "sat", befsmavz: "insurance",
  // Bank exams wear the IBPS PO tiger; state police exams the police tiger.
  sbipo: "ibpspo", sbiclerk: "ibpspo", ibpsrrb: "ibpspo",
  delhipolice: "police", biharpolice: "police", rajpolice: "police", mppolice: "police", jkssbja: "ssccgl", tgsi: "police",
  // Next-100 batch 3: UPSC and SSC CPO the SSC CGL tiger, RRB ALP the RRB NTPC tiger, RPF the police tiger,
  // the defence exams the military-entrance (ASVAB) tiger, the Philippine LET the teacher-licensing (Praxis) tiger.
  upscse: "ssccgl", ssccpo: "ssccgl", rrbalp: "rrbntpc", rpfconst: "police",
  nda: "asvab", agniveer: "asvab", agniveervayu: "asvab", phlet: "praxis",
  // Next-100 batch 4: the college entrance exams the college-entrance (SAT) tiger, the teacher eligibility tests
  // the CTET tiger, the Sainik School entrance the military-entrance (ASVAB) tiger.
  jeemain: "sat", neet: "sat", mhtcet: "sat", cuet: "sat",
  reet: "ctet", uptet: "ctet", ugcnet: "ctet", aissee: "asvab",
  // Next-100 batch 5: the JAMB UTME subjects (Use of English too) the college-entrance (SAT) tiger; the Nigeria
  // recruitment tests the police, firefighter, military-entrance and security-guard tigers; the TRCN PQE the Praxis tiger.
  jambeng: "sat", jambmath: "sat", jambbio: "sat", jambchem: "sat", jambphys: "sat",
  ngpolice: "police", cdcfib: "ffi", ngarmy: "asvab", ngcustoms: "security", trcnpqe: "praxis",
  // AHIMA CCA shares the CPC medical coding tiger.
  cca: "cpc",
  // Next-20 batch B reuses reviewed medical-assisting, dental, insurance, cloud and finance families.
  // Accounting exams share the ledger-and-calculator CPA FAR tiger, not the medical-coding CPC tiger.
  cma: "ccma", nbdhe: "danb", txadjuster: "pnc", ccaf: "aws", sfadmin: "aws", cfal1: "series7",
  cpaaud: "cpafar", accafa: "cpafar", aatl2: "cpafar",
  // Next-20 batch C reuses the reviewed social-work, cybersecurity, project-management, coding,
  // teaching, insurance and mortgage families. Dietitian and HR exams have their own sets above.
  aswbclin: "aswb", cisa: "cissp", fortigate: "secplus", cssgb: "pmp", ccs: "cpc", praxis5001: "praxis",
  fladjuster: "pnc", llqp: "insurance", cemap: "nmls",
  // AAFCS HNFS (FCS hospitality, nutrition and food science) borrows the food handler tiger.
  aafcs: "foodhandler",
  // International batch 1 reuses the car, CDL, real estate, insurance, Series 7, hunter, personal
  // licence, security guard and NCLEX families.
  sgftt: "driving", iedttcv: "cdl", sgres: "realestate", hkiiqe1: "insurance", hklesfi1: "series7",
  nzfirearms: "hunter", nzlcq: "ukaplh", aesira: "security", mypce: "insurance", kenck: "nclex",
  ppsc: "phcse", punjabpolice: "police", pakarmy: "asvab", pkpaf: "asvab", pknle: "nclex", pkpnmc: "nclex",
  zak53moto: "moto", zare5: "insurance", zasaps: "police", zapsira: "security",
  // International batch 4 reuses the construction, car, insurance, security, motorcycle, CDL, NCLEX
  // and Series 7 families.
  iesafepass: "cscs", iespsv: "driving", ieqfa: "insurance", iepsa: "security", nzmoto: "moto", nzheavy: "cdl",
  nzsfe: "nclex", sgrtt: "moto", sgm5: "series7", sgvl: "driving",
  // International batch 2 (Philippines) reuses the nursing, lab, pharmacy, psychology, police, military,
  // insurance and real estate families.
  phnle: "nclex", phmidwife: "nclex", phmedtech: "htl", phpharm: "ptcb", phpsychom: "appsych",
  phnapolcom: "police", phcle: "police", afpsat: "asvab", phnat: "nclex", phinsurance: "insurance", phrebroker: "realestate",
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
