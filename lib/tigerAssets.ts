/** Add an exam only after all eight expressions have passed visual review. */
export const TIGER_EXAM_IDS = [
  // Four reviewed exam mascots, eight expressions each.
  "afoqt", "shsat", "wonderlic", "mblex",
  // Reviewed medical-office administrator and medication-aide sets.
  "cmaa", "mace",
  // Reviewed physician-assistant and electronic-health-records specialists.
  "pance", "cehrs",
  // Reviewed French civic-study and nail-care specialists.
  "frcivique", "nailtech",
  // Reviewed plant operations and pesticide applicator sets.
  "waterop", "pesticide",
  "driving", // Car-test mascot; original site branding remains at the public root.
  "cdl", "cdlx", "moto", "civics", "part107", "ham", "epa608",
  "cna", "ptcb", "phleb", "cet", "htl", "cst", "crcst",
  "ccma", "danb", "emt", "foodmgr", "realestate", "insurance", "notary",
  "teas", "aws", "aplus", "foodhandler", "boating", "hunter", "secplus", "hesi",
  "asvab", "cpr", "osha", "forklift", "alcohol", "accuplacer",
  "security", "lifeguard", "pnc", "sat", "act", "nclex",
  "cosmetology", "esthetics", "vtne", "paramedic", "nclexpn", "ged", "timestables",
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
  // Italian language and citizenship study: complete eight-expression set.
  "itlanguage",
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
  aemt: "emt",
  emr: "emt",
  masterelec: "jelec",
  nscacpt: "nasm",
  acecpt: "nasm",
  rhia: "cehrs",
  series66: "series7",
  faaifr: "faapvt",
  faacax: "faapvt",
  esccse: "aplang",
  deeinb: "aplang",
  carshair: "cosmetology",
  carscook: "foodhandler",
  carsrefrig: "epa608",
  carstruck: "caauto",
  frvtc: "driving",
  zafirearm: "capal",
  realestatebroker: "realestate",
  appraiser: "realestate",
  nccco: "osha",
  prince2: "pmp",
  hknurse: "nclex",
  bcrealestate: "realestate",
  cacore: "hunter",
  cahunteron: "hunter",
  cabcguard: "caguard",
  nzboat: "boating",
  frcaces: "forklift",
  ea1: "cpareg",
  ea2: "cpareg",
  ea3: "cpareg",
  excpt: "ptcb",
  acls: "cpr",
  pals: "cpr",
  cct: "cet",
  crat: "cet",
  cnor: "cst",
  contractorlaw: "osha",
  natecore: "epa608",
  osha30: "osha",
  hvacjourney: "epa608",
  wastewaterop: "waterop",
  r410a: "epa608",
  backflow: "caplumb",
  bowhunter: "hunter",
  atvsafety: "moto",
  cafsc: "hunter",
  nptept: "nptepta",
  trapper: "hunter",
  ieplumbt2: "caplumb",
  crc: "cpc",
  cpb: "cpc",
  coc: "cpc",
  lmrt: "arrt",
  arrtct: "arrt",
  arrtmri: "arrt",
  cbcs: "cpc",
  hha: "cna",
  istqb: "itil",
  pspo: "psm",
  safe: "psm",
  pmiacp: "pmp",
  cobit: "itil",
  ascpmls: "htl",
  ascpht: "htl",
  esthetician: "esthetics",
  afsp: "cpareg",
  cpabar: "cpafar",
  cpaisc: "cpafar",
  dispatcher: "police",
  corrections: "police",
  ctec: "cpareg",
  cpcta: "cna",
  cpatcp: "cpareg",
  aufirearmswa: "capal",
  aufasa: "capal",
  aufatas: "capal",
  hspacis: "crcst",
  ncma: "ccma",
  aufirearmsvic: "capal",
  cbspd: "crcst",
  ascpmlt: "htl",
  aufirearmsnsw: "capal",
  nzham: "ham",
  auham: "ham",
  hamextra: "ham",
  cahambasic: "ham",
  hamgeneral: "ham",
  cadc: "nce",
  grol: "ham",
  ncmhce: "nce",
  ukdrone: "part107",
  uksqe1: "lsat",
  nzdrone: "part107",
  cadronebasic: "part107",
  cadroneadv: "part107",
  nzfirstaid: "aufirstaid",
  nzforklift: "auforklift",
  crfsc: "capal",
  ascppbt: "phleb",
  rpt: "phleb",
  ncpt: "phleb",
  hspachl: "crcst",
  hspacer: "crcst",
  bcaba: "rbt",
  qabaabat: "rbt",
  bcba: "rbt",
  aufirearmsqld: "capal",
  dmv: "driving",
  hiset: "ged",
  cbest: "praxis",
  tabe: "ged",
  // Texas Biology EOC wears the AP Biology tiger.
  staarbio: "apbio",
  toeflread: "ieltsread",
  ukwater: "caplumb",
  ukdsc1: "hunter",
  ukg3: "caplumb",
  ukplumb: "caplumb",
  ukrbi: "nhie",
  ukbregs: "nhie",
  naplex: "ptcb",
  ukcar: "driving", ukadi: "driving", ukmoto: "moto", uklgv: "cdl", ukpcv: "cdl",
  caon: "driving", caqc: "driving", cabc: "driving", caab: "driving", camb: "driving",
  aunsw: "driving", auvic: "driving", auqld: "driving", auwa: "driving", ausa: "driving", inrto: "driving",
  // Global certifications and nursing exams wear their nearest US exam's tiger.
  awssaa: "aws", az900: "aws", ai901: "aws", awsaif: "aws", awsdva: "aws", snowpro: "aws", pl900: "aws", ccna: "aplus", ccnpencor: "aplus", jncia: "aplus", gulfrn: "nclex", aedhapharm: "ptcb", uknmc: "nclex", ccrn: "nclex",
  cask: "driving", cans: "driving", nzroad: "driving", iedtt: "driving",
  phlto: "driving", mykpp: "driving", sgbtt: "driving", hkdrive: "driving", aerta: "driving", zak53: "driving", zak53c3: "cdl", ngfrsc: "driving", kentsa: "driving",
  psat: "sat", netplus: "secplus", linuxplus: "secplus", cysa: "secplus", fortinse: "secplus", pentestplus: "secplus", securityx: "secplus", ceh: "secplus", sc200: "secplus", az104: "aws", dp900: "aws", techplus: "aplus", serverplus: "aplus", projectplus: "capm", ccst: "aplus", dataplus: "aplus", cloudplus: "aplus", sc900: "secplus", gcdl: "aws", gcppca: "aws", gcppde: "aws", isc2cc: "cissp", cism: "cissp", crisc: "cissp", servicenowcsa: "cissp", sscp: "cissp",
  // India exams wear their family's tiger; Pakistan's car test the car tiger; JNVST (age 10 to 12) the times tables tiger.
  osssc: "ssccgl", ibpsclerk: "ibpspo", rrbgroupd: "rrbntpc", sscgd: "ssccgl", sscchsl: "ssccgl", sscmts: "ssccgl", uppolice: "police", jnvst: "timestables", vidyagyan: "timestables", mapgrowth: "timestables", staaralg1: "sat",hspt: "shsat", cogat: "timestables",ssat: "shsat",isee: "shsat",
  // STAAR English I (Texas, grade 9) wears the AP English Language tiger.
  staareng1: "aplang",
  pkdrive: "driving",
  // EU driving theory tests (Nov 2026) wear the car tiger.
  esdgt: "driving", ptimt: "driving", bedriving: "driving", dkteori: "driving", setrafik: "driving", fitheory: "driving", grdriving: "driving", rodrpciv: "driving", hukresz: "driving", mttheory: "driving", detheorie: "driving",
  // Spain (Nov 2026): CAP the CDL tiger, police exams the police tiger, vigilante the security tiger.
  escapcond: "cdl", espolicia: "police", esguardia: "police", esvigilante: "security",
  // Germany (Nov 2026): motorcycle the motorcycle tiger, AEVO the teaching tiger, 34a the security tiger.
  // Heilpraktiker has its own non-physician practitioner set above.
  demotorrad: "moto", deaevo: "praxisplt", de34a: "security", dejagd: "hunter",
  // Portugal (Nov 2026): motorcycle the motorcycle tiger, CAM the CDL tiger, TVDE the car tiger, vigilante the security tiger.
  ptmoto: "moto", ptcam: "cdl", pttvde: "driving", ptvigil: "security",
  // Malta (Nov 2026): motorcycle the motorcycle tiger, CPC the CDL tiger, taxi the car tiger, guard the security tiger.
  mtmoto: "moto", mtcpc: "cdl", mttaxi: "driving", mtguard: "security",
  // Sweden (Nov 2026): motorcycle the motorcycle tiger, jägarexamen the hunter tiger, högskoleprovet the SAT tiger.
  // Swedish citizenship has its own flag and civic-study set above.
  semoto: "moto", sejakt: "hunter", sehp: "sat",
  // Denmark (Nov 2026): motorcycle the motorcycle tiger, hunting the hunter tiger.
  // Citizenship and residence share the reviewed Danish flag and civic-study set.
  dkmoto: "moto", dktruck: "cdl", dkjagt: "hunter", dkmedborger: "dkindfoed",
  // Italy: CILS and CELI share Italian language-study art, never US civics; the boat licence the boating tiger.
  itpatente: "driving", itnautica: "boating", itcils: "itlanguage", itceli: "itlanguage", ita2: "itlanguage", itcilsb2: "itlanguage",
  // France (Nov 2026): code de la route the car tiger.
  frcode: "driving",
  frmoto: "moto",
  // Poland (Nov 2026): car theory the car tiger, Driver CPC the CDL tiger, the bar entrance exam the LSAT
  // tiger, LEK the EU doctor tiger, the firearms permit the Canadian firearms tiger.
  plteoria: "driving", plcpc: "cdl", plaplik: "lsat", pllek: "rorezid", plbron: "capal",
  // Netherlands (Nov 2026): car theory the car tiger, moped and motorcycle the motorcycle tiger, B-VCA the
  // CSCS construction tiger, Wft Basis the mortgage-licensing tiger.
  nltheorie: "driving", nlbrom: "moto", nlmoto: "moto", nlvca: "cscs", nlwft: "nmls",
  // Switzerland (Nov 2026): the car tiger.
  chtheory: "driving",
  // AP Italian (Nov 2026): the AP English Language tiger.
  apitalian: "aplang",
  // Finland (Nov 2026): motorcycle the motorcycle tiger, truck and bus the CDL tiger, hygiene passport the UK food hygiene tiger, hunting the hunter tiger.
  fimoto: "moto", fitruck: "cdl", fihygiene: "ukfood", ukfood3: "ukfood", fihunt: "hunter",
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
  upscse: "ssccgl", ssccpo: "ssccgl", rrbalp: "rrbntpc", inrrn: "rrbntpc", rpfconst: "police",
  nda: "asvab", agniveer: "asvab", agniveervayu: "asvab", phlet: "praxis",
  // Next-100 batch 4: the college entrance exams the college-entrance (SAT) tiger, the teacher eligibility tests
  // the CTET tiger, the Sainik School entrance the military-entrance (ASVAB) tiger.
  jeemain: "sat", neet: "sat", mhtcet: "sat", kcet: "sat", cuet: "sat",
  // CAT (IIM) the GMAT tiger, the MBA entrance exam.
  iimcat: "gmat",
  reet: "ctet", uptet: "ctet", ugcnet: "ctet", aissee: "asvab",
  // Next-100 batch 5: the JAMB UTME subjects (Use of English too) the college-entrance (SAT) tiger; the Nigeria
  // recruitment tests the police, firefighter, military-entrance and security-guard tigers; the TRCN PQE the Praxis tiger.
  jambeng: "sat", jambmath: "sat", wasscemath: "sat", jambbio: "sat", jambchem: "sat", jambphys: "sat", jamblit: "sat", apcsp: "sat", wassceeng: "sat",
  ngpolice: "police", cdcfib: "ffi", ngarmy: "asvab", ngcustoms: "security", trcnpqe: "praxis",
  // AHIMA CCA shares the CPC medical coding tiger.
  cca: "cpc",
  rhit: "cpc",
  // Next-20 batch B reuses reviewed medical-assisting, dental, insurance, cloud and finance families.
  // Accounting exams share the ledger-and-calculator CPA FAR tiger, not the medical-coding CPC tiger.
  cma: "ccma", rma: "ccma", nbdhe: "danb", danbrhs: "danb", danbice: "danb", inbde: "danb", dat: "danb", txadjuster: "pnc", ccaf: "aws", sfadmin: "aws", sfpd1: "aws", sfappbuilder: "aws", cfal1: "series7", frm1: "series7",
  cpaaud: "cpafar", accafa: "cpafar", aatl2: "cpafar",
  // Next-20 batch C reuses the reviewed social-work, cybersecurity, project-management, coding,
  // teaching, insurance and mortgage families. Dietitian and HR exams have their own sets above.
  fpc: "cpafar", titleagent: "realestate", aswbbach: "aswb", aswbclin: "aswb", cisa: "cissp", fortigate: "secplus", cssgb: "pmp", cssyb: "pmp", cfp: "series7", ccs: "cpc", praxis5001: "praxis",
  fladjuster: "pnc", llqp: "insurance", cemap: "nmls", ukcemap2: "nmls",
  // AAFCS HNFS (FCS hospitality, nutrition and food science) borrows the food handler tiger.
  aafcs: "foodhandler",
  cdm: "rdexam",
  // ASE A1-A8 (US automobile technicians) borrows the Red Seal automotive mechanic tiger (no flag).
  ase: "caauto",
  aseg1: "caauto",
  epa609: "caauto", // Automotive refrigerant technician practice.
  // CEN (BCEN Certified Emergency Nurse) borrows the NCLEX tiger.
  cen: "nclex",
  // International batch 1 reuses the car, CDL, real estate, insurance, Series 7, hunter, personal
  // licence, security guard and NCLEX families.
  sgftt: "driving", iedttcv: "cdl", sgres: "realestate", hkiiqe1: "insurance", hklesfi1: "series7", series6: "series7", series24: "series7",
  nzfirearms: "hunter", nzlcq: "ukaplh", aesira: "security", aerera: "realestate", mypce: "insurance", kenck: "nclex",
  // NZ real estate salesperson borrows the real estate tiger.
  nzrealestate: "realestate", nzsecurity: "security",
  ppsc: "phcse", punjabpolice: "police", pakarmy: "asvab", pkpaf: "asvab", pknle: "nclex", pkpnmc: "nclex",
  zak53moto: "moto", zare5: "insurance", zasaps: "police", zapsira: "security",
  // International batch 4 reuses the construction, car, insurance, security, motorcycle, CDL, NCLEX
  // and Series 7 families.
  iesafepass: "cscs", ukhs2: "cscs", iespsv: "driving", ieqfa: "insurance", iepsa: "security", iegarda: "police", nzmoto: "moto", nzheavy: "cdl", iehcap: "hunter", caabguard: "caguard", oacp: "police", caairbrake: "cdl",
  // Smart Serve Ontario borrows the alcohol server tiger.
  smartserve: "alcohol",
  // SHRM-CP borrows the PHR human resources tiger.
  shrmcp: "phr",
  // aPHR borrows the PHR human resources tiger.
  aphr: "phr",
  proserve: "alcohol",
  servingitright: "alcohol",
  // TSSA Gas Technician 3 borrows the Red Seal plumber tiger.
  cagas3: "caplumb",
  // Australian security licence course borrows the security guard tiger.
  ausecurity: "security",
  nzsfe: "nclex", nzensf: "nclexpn", nziqn: "nclex", sgrtt: "moto", sgm5: "series7", sgm9: "insurance", sgm9a: "series7", sgvl: "driving", sgsnb: "nclex",
  // International batch 2 (Philippines) reuses the nursing, lab, pharmacy, psychology, police, military,
  // insurance and real estate families.
  phnle: "nclex", phmidwife: "nclex", phmedtech: "htl", phpharm: "ptcb", phpsychom: "appsych", eppp: "appsych",
  ccat: "wonderlic", phnapolcom: "police", phcle: "police", afpsat: "asvab", phnat: "nclex", phinsurance: "insurance", phrebroker: "realestate",
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


