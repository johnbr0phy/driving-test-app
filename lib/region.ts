// Which country's tests a visitor sees first. Each country has its own
// indexable homepage: the US at "/", the others at /uk, /ie, /ca, /au, /nz, /in,
// /ph, /my, /sg, /hk, /ae, /za, /ng, /ke, /pk,
// /es, /pt, /ro, /se, /gr, /dk, /hu, /be, /fi, /mt, /de and /it. A view
// setting only: it never touches progress, and every test stays reachable from
// every country. middleware.ts sets it from Vercel's request country on the
// first visit and sends a visitor from any other country we cover from "/" to their
// country's page; the CountryPills change it.

import type { Language } from "@/i18n";

export type Region = "US" | "CA" | "UK" | "IE" | "AU" | "NZ" | "IN" | "PH" | "MY" | "SG" | "HK" | "AE" | "ZA" | "NG" | "KE" | "PK" | "ES" | "PT" | "RO" | "SE" | "GR" | "DK" | "HU" | "BE" | "FI" | "MT" | "DE" | "IT";

/**
 * Every country with its own homepage. `lang` is the language its homepage is
 * written in and `locale` its BCP 47 tag (hreflang, og:locale, JSON-LD and
 * dates). Spain and Portugal stay English until their Spanish and Portuguese
 * exams ship; Germany is German from day one.
 */
export const REGIONS: { code: Region; name: string; short: string; inName: string; lang: Language; locale: string }[] = [
  { code: "US", name: "United States", short: "US", inName: "the US", lang: "en", locale: "en-US" },
  { code: "CA", name: "Canada", short: "CA", inName: "Canada", lang: "en", locale: "en-CA" },
  { code: "UK", name: "United Kingdom", short: "UK", inName: "the UK", lang: "en", locale: "en-GB" },
  { code: "IE", name: "Ireland", short: "IE", inName: "Ireland", lang: "en", locale: "en-IE" },
  { code: "AU", name: "Australia", short: "AU", inName: "Australia", lang: "en", locale: "en-AU" },
  { code: "NZ", name: "New Zealand", short: "NZ", inName: "New Zealand", lang: "en", locale: "en-NZ" },
  { code: "IN", name: "India", short: "IN", inName: "India", lang: "en", locale: "en-IN" },
  { code: "PH", name: "Philippines", short: "PH", inName: "the Philippines", lang: "en", locale: "en-PH" },
  { code: "MY", name: "Malaysia", short: "MY", inName: "Malaysia", lang: "en", locale: "en-MY" },
  { code: "SG", name: "Singapore", short: "SG", inName: "Singapore", lang: "en", locale: "en-SG" },
  { code: "HK", name: "Hong Kong", short: "HK", inName: "Hong Kong", lang: "en", locale: "en-HK" },
  { code: "AE", name: "United Arab Emirates", short: "UAE", inName: "the UAE", lang: "en", locale: "en-AE" },
  { code: "ZA", name: "South Africa", short: "ZA", inName: "South Africa", lang: "en", locale: "en-ZA" },
  { code: "NG", name: "Nigeria", short: "NG", inName: "Nigeria", lang: "en", locale: "en-NG" },
  { code: "KE", name: "Kenya", short: "KE", inName: "Kenya", lang: "en", locale: "en-KE" },
  { code: "PK", name: "Pakistan", short: "PK", inName: "Pakistan", lang: "en", locale: "en-PK" },
  { code: "ES", name: "Spain", short: "ES", inName: "Spain", lang: "es", locale: "es-ES" },
  { code: "PT", name: "Portugal", short: "PT", inName: "Portugal", lang: "pt", locale: "pt-PT" },
  { code: "RO", name: "Romania", short: "RO", inName: "Romania", lang: "ro", locale: "ro-RO" },
  { code: "SE", name: "Sweden", short: "SE", inName: "Sweden", lang: "sv", locale: "sv-SE" },
  { code: "GR", name: "Greece", short: "GR", inName: "Greece", lang: "el", locale: "el-GR" },
  { code: "DK", name: "Denmark", short: "DK", inName: "Denmark", lang: "da", locale: "da-DK" },
  { code: "HU", name: "Hungary", short: "HU", inName: "Hungary", lang: "hu", locale: "hu-HU" },
  { code: "BE", name: "Belgium", short: "BE", inName: "Belgium", lang: "nl", locale: "nl-BE" },
  { code: "FI", name: "Finland", short: "FI", inName: "Finland", lang: "fi", locale: "fi-FI" },
  { code: "MT", name: "Malta", short: "MT", inName: "Malta", lang: "en", locale: "en-MT" },
  { code: "DE", name: "Germany", short: "DE", inName: "Germany", lang: "de", locale: "de-DE" },
  { code: "IT", name: "Italy", short: "IT", inName: "Italy", lang: "it", locale: "it-IT" },
];

/** The chosen region, e.g. "UK". */
export const REGION_COOKIE = "tt-region";
/** How it was set: "geo" (request country), "default" (no usable country) or "chosen" (a pill). */
export const REGION_SOURCE_COOKIE = "tt-region-src";
export const REGION_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isRegion(v: unknown): v is Region {
  return REGIONS.some((r) => r.code === v);
}

/** ISO 3166 country code (Vercel's x-vercel-ip-country) to a region; null for countries we have no tests for. */
export function regionFromCountry(cc: string | null | undefined): Region | null {
  switch ((cc ?? "").toUpperCase()) {
    case "US": case "PR": case "GU": case "VI": case "AS": case "MP": return "US";
    case "CA": return "CA";
    case "GB": case "IM": case "JE": case "GG": return "UK";
    case "AU": return "AU";
    case "IN": return "IN";
    case "IE": return "IE";
    case "NZ": return "NZ";
    case "PH": return "PH";
    case "MY": return "MY";
    case "SG": return "SG";
    case "HK": return "HK";
    case "AE": return "AE";
    case "ZA": return "ZA";
    case "NG": return "NG";
    case "KE": return "KE";
    case "PK": return "PK";
    case "ES": return "ES";
    case "PT": return "PT";
    case "RO": return "RO";
    case "SE": return "SE";
    case "GR": return "GR";
    case "DK": return "DK";
    case "HU": return "HU";
    case "BE": return "BE";
    case "FI": return "FI";
    case "MT": return "MT";
    // Germany only: Austria, Switzerland, Luxembourg and Liechtenstein have
    // their own tests and rules, so they stay unmapped.
    case "DE": return "DE";
    // Italy only: San Marino and the Vatican issue their own licences.
    case "IT": return "IT";
    default: return null;
  }
}

/** A country's homepage: "/" for the US, else /uk, /nz, /ph and so on (the code in lower case). */
export function regionHomePath(r: Region): string {
  return r === "US" ? "/" : `/${r.toLowerCase()}`;
}

/** hreflang for each country's homepage (its locale), the US page doubling as the default. */
export const REGION_HREFLANG = Object.fromEntries(REGIONS.map((r) => [r.code, r.locale])) as Record<Region, string>;

export function regionInfo(r: Region) {
  return REGIONS.find((x) => x.code === r)!;
}

/** "GLOBAL" tests are the same exam everywhere and are listed in every country. */
export type TestRegion = Region | "GLOBAL";

const TEST_REGIONS: Record<string, TestRegion> = {
  ukcar: "UK", ukmoto: "UK", uklgv: "UK", ukpcv: "UK", ukadi: "UK", timestables: "UK", ks2: "UK", gcsemaths: "UK", uksia: "UK", uk18ed: "UK", ukgas: "UK", ukbregs: "UK", ukrbi: "UK", ukplumb: "UK", ukg3: "UK", ukwater: "UK",
  gcsehigher: "UK", gcsescience: "UK", gcsecs: "UK", elevenplus: "UK", fsmaths: "UK", cscs: "UK", ukfood: "UK", ukaplh: "UK", ukfaw: "UK", ukcare: "UK",
  uklitu: "UK", uknmc: "UK", ukseru: "UK", aatl2: "UK", cemap: "UK",
  iedtt: "IE", iedttcv: "IE", iesafepass: "IE", iespsv: "IE", ieqfa: "IE", iepsa: "IE",
  caon: "CA", caqc: "CA", cabc: "CA", caab: "CA", camb: "CA", osslt: "CA", capal: "CA", caelec: "CA",
  rexpn: "CA", eqao9: "CA", capsw: "CA", casfa: "CA", cawhmis: "CA", caguard: "CA", caauto: "CA", caplumb: "CA", cacarp: "CA", caweld: "CA", cacit: "CA", llqp: "CA",
  cask: "CA", cans: "CA", pcoc: "CA",
  aunsw: "AU", auvic: "AU", auqld: "AU", auwa: "AU", ausa: "AU", naplan: "AU", nswsel: "AU", auwhite: "AU",
  naplan7: "AU", ocnsw: "AU", vicsel: "AU", hscmaths: "AU", aursa: "AU", aurcg: "AU", aufss: "AU", aufirstaid: "AU", auforklift: "AU", auwah: "AU", aucit: "AU",
  nzroad: "NZ", nzfirearms: "NZ", nzlcq: "NZ", nzmoto: "NZ", nzheavy: "NZ", nzsfe: "NZ",
  phlto: "PH", phcse: "PH", phlet: "PH", mykpp: "MY", sgbtt: "SG", hkdrive: "HK", aerta: "AE", zak53: "ZA", zak53c3: "ZA", ngfrsc: "NG", kentsa: "KE", pkdrive: "PK",
  ppsc: "PK", punjabpolice: "PK", pakarmy: "PK", pkpaf: "PK", pknle: "PK", pkpnmc: "PK",
  zak53moto: "ZA", zare5: "ZA", zasaps: "ZA", zapsira: "ZA",
  phnle: "PH", phmedtech: "PH", phpharm: "PH", phmidwife: "PH", phpsychom: "PH", phnapolcom: "PH", afpsat: "PH", phnat: "PH", phcle: "PH", phinsurance: "PH", phrebroker: "PH",
  sgftt: "SG", sgrtt: "SG", sgres: "SG", sgm5: "SG", sgvl: "SG", hkiiqe1: "HK", hklesfi1: "HK", aesira: "AE", mypce: "MY", kenck: "KE",
  detheorie: "DE", demotorrad: "DE", deaevo: "DE", de34a: "DE", deheilpr: "DE",
  esdgt: "ES", escapcond: "ES", espolicia: "ES", esguardia: "ES", esvigilante: "ES", ptimt: "PT", ptmoto: "PT", ptcam: "PT", pttvde: "PT", ptvigil: "PT", rodrpciv: "RO", rocpi: "RO", rotaxi: "RO", roadmed: "RO", rorezid: "RO", setrafik: "SE", semoto: "SE", sejakt: "SE", semedb: "SE", sehp: "SE", grdriving: "GR", grmoto: "GR", grcitizen: "GR", grsecurity: "GR", grinsure: "GR", dkteori: "DK", dkmoto: "DK", dkindfoed: "DK", dkmedborger: "DK", dkjagt: "DK", hukresz: "HU", hukreszmoto: "HU", hugki: "HU", huelsoseg: "HU", hubizt: "HU", bedriving: "BE", bemoto: "BE", bevracht: "BE", betoelating: "BE", befsmavz: "BE", fitheory: "FI", fimoto: "FI", fitruck: "FI", fihygiene: "FI", fihunt: "FI", mttheory: "MT", mtmoto: "MT", mtcpc: "MT", mttaxi: "MT", mtguard: "MT",
  itpatente: "IT", itcils: "IT", itceli: "IT",
  jambeng: "NG", jambmath: "NG", jambbio: "NG", jambchem: "NG", jambphys: "NG",
  ngpolice: "NG", cdcfib: "NG", ngarmy: "NG", ngcustoms: "NG", trcnpqe: "NG",
  inrto: "IN", ssccgl: "IN", rrbntpc: "IN", ibpspo: "IN", ctet: "IN",
  rrbgroupd: "IN", sscgd: "IN", sscchsl: "IN", sscmts: "IN", uppolice: "IN", ibpsclerk: "IN", jnvst: "IN",
  sbiclerk: "IN", sbipo: "IN", ibpsrrb: "IN", biharpolice: "IN", rajpolice: "IN", delhipolice: "IN", mppolice: "IN", jkssbja: "IN",
  upscse: "IN", nda: "IN", agniveer: "IN", agniveervayu: "IN", rrbalp: "IN", rpfconst: "IN", ssccpo: "IN",
  neet: "IN", jeemain: "IN", cuet: "IN", mhtcet: "IN", ugcnet: "IN", reet: "IN", uptet: "IN", aissee: "IN",
  aplus: "GLOBAL", secplus: "GLOBAL", aws: "GLOBAL", awssaa: "GLOBAL", az900: "GLOBAL", ccna: "GLOBAL", pmp: "GLOBAL", gulfrn: "GLOBAL",
  netplus: "GLOBAL", cysa: "GLOBAL", cissp: "GLOBAL", gcdl: "GLOBAL", gcppca: "GLOBAL", gre: "GLOBAL", gmat: "GLOBAL", itil: "GLOBAL", psm: "GLOBAL", capm: "GLOBAL",
  ccaf: "GLOBAL", sfadmin: "GLOBAL", cfal1: "GLOBAL", accafa: "GLOBAL", cisa: "GLOBAL", fortigate: "GLOBAL", cssgb: "GLOBAL",
};

/** A country's tests that are not driving tests: shown beside the worldwide ones, not in the driving grid. */
export const NON_DRIVING_TESTS = new Set([
  "espolicia", "esguardia", "esvigilante",
  "ptvigil",
  "mttaxi", "mtguard",
  "deaevo", "de34a", "deheilpr",
  "itcils", "itceli",
  "sejakt", "semedb", "sehp",
  "fihygiene", "fihunt",
  "huelsoseg", "hubizt",
  "rotaxi", "roadmed", "rorezid",
  "grcitizen", "grsecurity", "grinsure",
  "betoelating", "befsmavz",
  "dkindfoed", "dkmedborger", "dkjagt",
  "timestables", "ks2", "gcsemaths", "uksia", "uk18ed", "ukgas", "ukplumb", "ukwater", "ukbregs", "ukrbi", "ukplumb", "ukg3", "ukwater",
  "gcsehigher", "gcsescience", "gcsecs", "elevenplus", "fsmaths", "cscs", "ukfood", "ukaplh", "ukfaw", "ukcare", "uklitu", "uknmc", "ukseru", "aatl2", "cemap",
  "osslt", "capal", "caelec",
  "rexpn", "eqao9", "capsw", "casfa", "cawhmis", "caguard", "caauto", "caplumb", "cacarp", "caweld", "cacit", "pcoc", "llqp",
  "naplan", "nswsel", "auwhite",
  "naplan7", "ocnsw", "vicsel", "hscmaths", "aursa", "aurcg", "aufss", "aufirstaid", "auforklift", "auwah", "aucit",
  "ssccgl", "rrbntpc", "ibpspo", "ctet",
  "rrbgroupd", "sscgd", "sscchsl", "sscmts", "uppolice", "ibpsclerk", "jnvst",
  "sbiclerk", "sbipo", "ibpsrrb", "biharpolice", "rajpolice", "delhipolice", "mppolice", "jkssbja",
  "upscse", "nda", "agniveer", "agniveervayu", "rrbalp", "rpfconst", "ssccpo",
  "neet", "jeemain", "cuet", "mhtcet", "ugcnet", "reet", "uptet", "aissee",
  "apgov", "apworld", "aphug", "aplang", "apcalcab",
  "phcse", "phlet",
  "phnle", "phmedtech", "phpharm", "phmidwife", "phpsychom", "phnapolcom", "afpsat", "phnat", "phcle", "phinsurance", "phrebroker",
  "ppsc", "punjabpolice", "pakarmy", "pkpaf", "pknle", "pkpnmc",
  "zare5", "zasaps", "zapsira",
  "jambeng", "jambmath", "jambbio", "jambchem", "jambphys",
  "ngpolice", "cdcfib", "ngarmy", "ngcustoms", "trcnpqe",
  "sgres", "hkiiqe1", "hklesfi1", "nzfirearms", "nzlcq", "aesira", "mypce", "kenck",
  "iesafepass", "iespsv", "ieqfa", "iepsa", "nzsfe", "sgm5", "sgvl",
]);

/** Every test not listed above is a US exam. */
export function regionOfTest(testId: string): TestRegion {
  return TEST_REGIONS[testId] ?? "US";
}

/** Homepage copy that changes with the region. US is today's homepage. */
export const REGION_HOME: Record<Exclude<Region, "US">, {
  /** The country page's <title> (under 60 characters) and meta description (under 155). */
  title: string;
  description: string;
  lead: string;
  cta: { label: string; href: string };
  testsTitle: string;
  testsSub: string;
}> = {
  UK: {
    title: "Free UK Practice Tests: School, Work & Driving | Tigertest",
    description: "Free UK practice tests for GCSEs, KS2 SATs, driving theory, healthcare, trades and workplace qualifications. Every answer explained. No account needed.",
    lead: "Practice for the DVSA theory tests: car, motorcycle, lorry, bus and coach, and ADI part 1. Original questions on the Highway Code, every answer explained. No signup.",
    cta: { label: "Car theory test", href: "/uk-driving-theory-test" },
    testsTitle: "UK theory tests",
    testsSub: "Multiple-choice practice for Great Britain, in mph with the current Highway Code. Hazard perception is not covered.",
  },
  CA: {
    title: "Free Canadian Practice Tests: School, Work & Driving | Tigertest",
    description: "Free Canadian practice tests for driving, OSSLT, EQAO, nursing, Red Seal trades and workplace safety. Every answer explained. No account needed.",
    lead: "Knowledge test practice for Ontario, Quebec, British Columbia, Alberta, Manitoba, Saskatchewan and Nova Scotia, written from each province's own handbook. Every answer explained. No signup.",
    cta: { label: "Ontario G1 test", href: "/ontario-g1-practice-test" },
    testsTitle: "Driving knowledge tests by province",
    testsSub: "200 questions per test from the official provincial handbook, in km/h with your province's licensing rules.",
  },
  AU: {
    title: "Free Australian Practice Tests: School, Work & Driving | Tigertest",
    description: "Free Australian practice tests for NAPLAN, selective entry, HSC maths, driving, first aid and workplace licences. Every answer explained. No account needed.",
    lead: "Learner licence practice for New South Wales, Victoria, Queensland, Western Australia and South Australia, written from each state's handbook. Every answer explained. No signup.",
    cta: { label: "NSW DKT", href: "/nsw-dkt-practice-test" },
    testsTitle: "Learner driver tests by state",
    testsSub: "200 questions per test on your state's road rules, L and P plates and demerits. Hazard perception is not covered.",
  },
  IN: {
    title: "Free Indian Practice Tests: LL Test, SSC, JEE & NEET | Tigertest",
    description: "Free practice tests for India: the RTO learner's licence (LL) test, SSC CGL and RRB NTPC, JEE Main and NEET, and CTET mock tests, every answer explained. No account needed.",
    lead: "Practice for the learner's licence test, government job exams like SSC CGL and RRB NTPC, college entrance exams like JEE Main and NEET, and teacher eligibility tests like CTET. Original questions, every answer explained. No signup.",
    cta: { label: "LL test practice", href: "/rto-learners-licence-test" },
    testsTitle: "Learner's licence test",
    testsSub: "200 questions from the Motor Vehicles Act and the driving regulations, in km/h for left-hand traffic. The test format varies by state.",
  },
  IE: {
    title: "Free Irish Practice Tests: Driver Theory, Safe Pass & SPSV | Tigertest",
    description: "Free practice for Ireland: the Driver Theory Test for car, truck and bus, Safe Pass, the SPSV entry test for taxi drivers, the QFA regulation exam and the QQI security guarding exam for a PSA licence. No account needed.",
    lead: "Practice for the Driver Theory Test you need before your first learner permit, for a car, a truck or a bus, and for the tests people sit for work: Safe Pass, the SPSV entry test, the QFA regulation exam and QQI Security Guarding for a PSA licence. Original questions, every answer explained. No signup.",
    cta: { label: "Driver Theory Test", href: "/ireland-driver-theory-test" },
    testsTitle: "Driver Theory Tests",
    testsSub: "Car: 40 questions, 35 to pass. Truck or bus (C or D): 100 questions, 74 to pass. All in km/h for left-hand traffic.",
  },
  NZ: {
    title: "Free NZ Practice Tests: Learner, Class 2, Firearms & Nursing | Tigertest",
    description: "Free practice for New Zealand: the car and motorcycle learner licence tests, the Class 2 heavy vehicle theory test, the firearms licence theory test, the LCQ for duty managers and the Nursing Council State Final Examination. No account needed.",
    lead: "Practice for the car and motorcycle learner licence theory tests, the Class 2 heavy vehicle theory test, the firearms licence theory test, the Licence Controller Qualification and the registered nurse State Final Examination. Original questions, every answer explained. No signup.",
    cta: { label: "Learner licence test", href: "/nz-learner-licence-practice-test" },
    testsTitle: "Learner and heavy vehicle theory tests",
    testsSub: "200 questions each on the Road Code, in km/h for left-hand traffic. The car learner test is 35 questions and you need 32 right.",
  },
  PH: {
    title: "Free LTO, CSE, LET & PRC Board Exam Reviewers | Tigertest",
    description: "Free reviewers for the Philippines: the LTO exam, the Civil Service Exam, the LET, the PRC board exams for nurses, medtechs, pharmacists, midwives, psychometricians, criminologists and real estate brokers, NAPOLCOM, AFPSAT and the Insurance Commission exam. No account needed.",
    lead: "Practice for the LTO written exam for your driver's license, the Civil Service Exam, the LET, the PRC board exams for nurses, medical technologists, pharmacists, midwives, psychometricians, criminologists and real estate brokers, the NAPOLCOM PNP Entrance Exam, the AFPSAT and the Insurance Commission exam for life agents. Original questions, every answer explained. No signup.",
    cta: { label: "LTO exam reviewer", href: "/lto-exam-reviewer-practice-test" },
    testsTitle: "LTO driver's license exam",
    testsSub: "200 questions on Philippine traffic rules, in km/h for right-hand traffic. Three full 60-question tests, 48 to pass.",
  },
  MY: {
    title: "Free Malaysia Practice Tests: KPP01 & PCEIA | Tigertest",
    description: "Free practice for Malaysia: the JPJ KPP01 driving theory test and the PCEIA for insurance agents, every answer explained. No account needed.",
    lead: "Practice for the JPJ KPP01 theory test before your learner's licence and the Pre-Contract Examination for Insurance Agents (PCEIA). Original questions on road rules and on insurance, every answer explained. No signup.",
    cta: { label: "KPP01 theory test", href: "/malaysia-kpp01-practice-test" },
    testsTitle: "KPP01 theory test",
    testsSub: "200 questions on Malaysian road rules, in km/h for left-hand traffic. The real test is 50 questions and you need 42 right.",
  },
  SG: {
    title: "Free Singapore BTT, FTT, RTT, RES & RES5 Practice | Tigertest",
    description: "Free practice for Singapore: the Basic, Final and Riding Theory Tests, the RES exam for property agents, CMFAS RES5 for financial adviser representatives and the TDVL and PDVL vocational licence test. No account needed.",
    lead: "Practice for the Basic Theory Test, then the Final Theory Test for a car or the Riding Theory Test for a class 2B motorcycle, the RES exam for real estate salespersons, CMFAS RES5 (formerly Module 5) and the taxi and private hire vocational licence test. Original questions, every answer explained. No signup.",
    cta: { label: "Basic Theory Test", href: "/singapore-btt-practice-test" },
    testsTitle: "Basic, Final and Riding Theory Tests",
    testsSub: "200 questions each on Singapore road rules, driving and riding technique, in km/h for left-hand traffic. Four full 50-question tests each.",
  },
  HK: {
    title: "Free Hong Kong Tests: Driving, IIQE & LE Paper 1 | Tigertest",
    description: "Free practice for Hong Kong: the driving written test, IIQE Paper 1 for an insurance licence and LE Paper 1 for an SFC licence. No account needed.",
    lead: "Practice for the Transport Department's private car written test, IIQE Paper 1 for an insurance licence and LE Paper 1 for securities and futures licensing. Original questions, every answer explained. No signup.",
    cta: { label: "Driving theory test", href: "/hong-kong-driving-theory-test" },
    testsTitle: "Private car written test",
    testsSub: "200 questions on the Road Users' Code, in km/h for left-hand traffic. The real test is 20 questions and you need 16 right.",
  },
  AE: {
    title: "Free UAE Practice Tests: Driving & SIRA Guard | Tigertest",
    description: "Free practice for the UAE driving theory test and the Dubai SIRA security guard licence exam, every answer explained. No account needed.",
    lead: "Practice for the RTA theory test, an early step to a UAE driving licence, and the SIRA security guard licence exam in Dubai. Original questions, every answer explained. No signup.",
    cta: { label: "UAE theory test", href: "/uae-driving-theory-test" },
    testsTitle: "Driving theory test",
    testsSub: "200 questions on UAE road rules, in km/h for right-hand traffic. Four full 40-question tests, 30 to pass.",
  },
  ZA: {
    title: "Free K53, RE5, SAPS & PSIRA Practice Tests: South Africa | Tigertest",
    description: "Free practice for South Africa: the K53 learner's licence (Code 1 motorcycles, Code 2 cars, Code 3 trucks), the RE5 regulatory exam for FAIS representatives, the SAPS police trainee assessment and PSIRA security officer grades E to C. Original questions, every answer explained. No account needed.",
    lead: "Practice for the K53 learner's licence test, Code 1 for motorcycles, Code 2 for cars or Code 3 for trucks, the RE5 regulatory exam for financial services representatives, the written part of the SAPS police trainee assessment and the PSIRA security officer grades. Original questions, every answer explained. No signup.",
    cta: { label: "K53 learner's test", href: "/k53-learners-test" },
    testsTitle: "K53 learner's licence tests",
    testsSub: "Code 1 for motorcycles, Code 2 for cars and Code 3 for trucks (C1 and C): 200 questions each on South African road rules, in km/h for left-hand traffic. Four full 50-question tests each.",
  },
  NG: {
    title: "Free Nigeria Practice Tests: JAMB, Recruitment & Driving | Tigertest",
    description: "Free practice tests for Nigeria: JAMB UTME English, Mathematics, Biology, Chemistry and Physics, Police, Army, Customs and CDCFIB recruitment tests, the TRCN PQE and the FRSC Highway Code driving test, every answer explained. No account needed.",
    lead: "Practice for the JAMB UTME, the recruitment tests of the Police, the Army, Customs and the CDCFIB services, the TRCN PQE for teachers and the theory part of your driving test. Original questions, every answer explained. No signup.",
    cta: { label: "Highway Code test", href: "/nigeria-driving-test-practice" },
    testsTitle: "Highway Code driving test",
    testsSub: "200 questions on the Nigeria Highway Code, in km/h for right-hand traffic. Four full 50-question tests.",
  },
  KE: {
    title: "Free Kenya Practice Tests: NTSA & NCK Exams | Tigertest",
    description: "Free practice for Kenya: the NTSA driving test on the Highway Code and the Nursing Council of Kenya licensure exam. No account needed.",
    lead: "Practice for the theory part of the NTSA driving test and the Nursing Council of Kenya licensure exam. Original questions, every answer explained. No signup.",
    cta: { label: "NTSA driving test", href: "/kenya-ntsa-driving-test" },
    testsTitle: "NTSA driving test",
    testsSub: "200 questions on the Kenya Highway Code, in km/h for left-hand traffic. Four full 50-question tests.",
  },
  PK: {
    title: "Free Pakistan Practice Tests: Driving, PPSC, Police, Army & NRE | Tigertest",
    description: "Free practice for Pakistan: the driving licence sign test, the PPSC general ability test, the Punjab Police constable test, the Pak Army and PAF airman tests, PMDC NRE Step 1 and the PNMC nursing licensing exam. Original questions, every answer explained. No account needed.",
    lead: "Practice for the sign and theory test before your driving licence, the general ability part of PPSC written tests, the Punjab Police constable written test, the Pak Army soldier and PAF airman recruitment tests, Step 1 of the PMDC National Registration Examination for foreign medical graduates and the PNMC nursing licensing exam. Original questions, every answer explained. No signup.",
    cta: { label: "Driving licence test", href: "/pakistan-driving-licence-test" },
    testsTitle: "Driving licence sign test",
    testsSub: "200 questions on Pakistan's road signs and traffic rules, in km/h for left-hand traffic. Four full 50-question tests.",
  },
  // In Spanish (REGIONS[].lang), machine-translated, pending native review.
  ES: {
    title: "Test DGT gratis: practica el examen teórico del permiso B | Tigertest",
    description: "Practica gratis el examen teórico de la DGT (permiso B): 200 preguntas originales sobre las normas de tráfico en España, cada respuesta explicada. Sin necesidad de cuenta.",
    lead: "Prepara el examen teórico de la DGT para tu permiso de conducir de coche. Preguntas originales sobre señales, prioridad, límites de velocidad y las normas de 2026, cada respuesta explicada. Sin registro.",
    cta: { label: "Test de la DGT", href: "/es/test-dgt-permiso-b" },
    testsTitle: "Tests de práctica para España",
    testsSub: "El examen teórico de la DGT (permiso B): 200 preguntas sobre las normas de circulación, seis tests de 30, se aprueba con 27. Además, el examen del CAP para conductores de camión y autobús, las oposiciones a Policía Nacional y Guardia Civil y el examen de vigilante de seguridad, todos en español.",
  },

  // In Portuguese (REGIONS[].lang), machine-translated, pending native review.
  PT: {
    title: "Testes de código IMT grátis: treine o exame de código | Tigertest",
    description: "Treino grátis para o exame teórico de condução do IMT (exame de código), categoria B: 200 perguntas originais sobre o Código da Estrada, cada resposta explicada. Não precisa de conta.",
    lead: "Treine para o exame de código, o exame teórico do IMT para a carta de condução de ligeiros. Perguntas originais sobre sinais, prioridade, rotundas, limites de velocidade e condução segura, cada resposta explicada. Sem registo.",
    cta: { label: "Exame de código IMT", href: "/pt/testes-codigo-imt" },
    testsTitle: "Testes de prática para Portugal",
    testsSub: "O exame de código do IMT (categoria B): 200 perguntas sobre o Código da Estrada, em km/h e com circulação pela direita, seis testes de 30, passa com 27. Também o exame de código para mota (em inglês), o exame CAM para motoristas de pesados, o exame TVDE para motoristas de plataformas e o exame de vigilante da PSP.",
  },

  // In Romanian (REGIONS[].lang), machine-written, pending native review.
  RO: {
    title: "Chestionare DRPCIV și teste gratuite pentru România | Tigertest",
    description: "Exersare gratuită pentru examene din România: chestionare DRPCIV pentru categoria B, examenul CPI pentru șoferi profesioniști, atestatul de taximetrist, admiterea la Medicină și Rezidențiatul. Întrebări originale, fiecare răspuns explicat. Fără cont.",
    lead: "Exersează gratuit pentru examenul teoretic auto categoria B, admiterea la Medicină și Rezidențiat, în limba română, și pentru examenele ARR (CPI și atestatul de taximetrist), în engleză. Întrebări originale, fiecare răspuns explicat. Fără înregistrare.",
    cta: { label: "Chestionare DRPCIV", href: "/ro/chestionare-drpciv-categoria-b" },
    testsTitle: "Teste de exersare pentru România",
    testsSub: "Chestionare DRPCIV categoria B: 200 de întrebări după Codul rutier, în km/h, pentru circulația pe dreapta, șapte chestionare de 26 de întrebări, admis cu 22, în română sau engleză. De asemenea, examenul CPI (marfă și persoane) și atestatul ARR pentru taxi și închiriere, în engleză, plus grile pentru admiterea la Medicină și pentru Rezidențiat, în română.",
  },
  // In Swedish (REGIONS[].lang), machine-written, pending native review.
  SE: {
    title: "Gratis teoriprov och övningsprov på svenska | Tigertest",
    description: "Gratis övning inför svenska prov: teoriprovet för körkort B, teoriprov för motorcykel, jägarexamen, medborgarskapsprovet och högskoleprovet. Egna frågor, varje svar förklarat. Ingen inloggning.",
    lead: "Öva gratis inför Trafikverkets kunskapsprov för bil och motorcykel, teoriprovet i jägarexamen, medborgarskapsprovet och högskoleprovet. Egna frågor, varje svar förklarat. Ingen inloggning.",
    cta: { label: "Teoriprov körkort B", href: "/sv/teoriprov-korkort-b" },
    testsTitle: "Övningsprov för Sverige",
    testsSub: "Kunskapsprovet för körkort B: 200 frågor om svenska trafikregler, i km/h för högertrafik, fyra prov med 50 frågor. På riktigt räknas 65 frågor och du behöver 52 rätt. Dessutom teoriprovet för motorcykel A1, A2 och A, jägarexamen, medborgarskapsprovet och högskoleprovet, alla på svenska.",
  },
  // In Greek (REGIONS[].lang), machine-written, pending native review.
  GR: {
    title: "Δωρεάν τεστ ΚΟΚ και τεστ εξάσκησης για την Ελλάδα | Tigertest",
    description: "Δωρεάν εξάσκηση για εξετάσεις στην Ελλάδα: θεωρητική εξέταση για δίπλωμα οδήγησης κατηγορίας Β, θεωρητική εξέταση για δίπλωμα μηχανής, εξετάσεις ΠΕΓΠ για την πολιτογράφηση και πιστοποίηση προσωπικού ιδιωτικής ασφάλειας. Δικές μας ερωτήσεις, κάθε απάντηση εξηγείται. Χωρίς λογαριασμό.",
    lead: "Κάνε δωρεάν εξάσκηση για τη θεωρητική εξέταση κατηγορίας Β, τις εξετάσεις ΠΕΓΠ και την πιστοποίηση security του ΕΟΠΠΕΠ, στα ελληνικά, και για τη θεωρητική εξέταση μηχανής, στα αγγλικά. Δικές μας ερωτήσεις, κάθε απάντηση εξηγείται. Χωρίς εγγραφή.",
    cta: { label: "Τεστ ΚΟΚ", href: "/el/test-kok-diploma-odigisis" },
    testsTitle: "Τεστ εξάσκησης για την Ελλάδα",
    testsSub: "Τεστ ΚΟΚ για δίπλωμα κατηγορίας Β: 200 ερωτήσεις με βάση τον Κώδικα Οδικής Κυκλοφορίας, σε km/h, για κυκλοφορία στα δεξιά, έξι τεστ των 30 ερωτήσεων, επιτυχία με 29, στα ελληνικά ή στα αγγλικά. Επίσης, η θεωρητική εξέταση για δίπλωμα μηχανής (Α1, Α2 και Α), στα αγγλικά, και οι εξετάσεις ΠΕΓΠ για την πολιτογράφηση και η πιστοποίηση προσωπικού ιδιωτικής ασφάλειας, στα ελληνικά.",
  },
  // In Danish (REGIONS[].lang), machine-written, pending native review.
  DK: {
    title: "Gratis teoriprøve og øvelsesprøver på dansk | Tigertest",
    description: "Gratis øvelse til danske prøver: teoriprøven til kørekort B, indfødsretsprøven, medborgerskabsprøven, jagtprøven og teoriprøven til motorcykel. Egne spørgsmål, hvert svar forklaret. Ingen konto.",
    lead: "Øv dig gratis til Færdselsstyrelsens teoriprøve til bil, indfødsretsprøven, medborgerskabsprøven og den skriftlige jagtprøve. Egne spørgsmål, hvert svar forklaret. Ingen tilmelding.",
    cta: { label: "Teoriprøve til bil", href: "/da/teoriproeve-bil" },
    testsTitle: "Øvelsesprøver for Danmark",
    testsSub: "Teoriprøven til kørekort B: 200 spørgsmål om danske færdselsregler, i km/t for højrekørsel, otte prøver med 25 spørgsmål og 20 rigtige for at bestå som den rigtige prøve. Desuden teoriprøven til motorcykel A1, A2 og A på engelsk og indfødsretsprøven, medborgerskabsprøven og jagtprøven på dansk.",
  },

  // In Hungarian (REGIONS[].lang), machine-written, pending native review.
  HU: {
    title: "Ingyenes KRESZ teszt és gyakorló vizsgák magyarul | Tigertest",
    description: "Ingyenes gyakorlás magyar vizsgákra: KRESZ teszt a B kategóriához, motoros elméleti vizsga, GKI, elsősegély vizsga és biztosításközvetítői vizsga. Saját kérdések, minden válasz elmagyarázva. Regisztráció nélkül.",
    lead: "Gyakorolj ingyen a KAV Közlekedési alapismeretek vizsgájára, az elsősegély vizsgára és az MNB biztosításközvetítői vizsgájára magyarul, valamint a motoros és a GKI elméleti vizsgákra angolul. Saját kérdések, minden válasz elmagyarázva. Regisztráció nélkül.",
    cta: { label: "KRESZ teszt", href: "/hu/kresz-teszt" },
    testsTitle: "Gyakorló vizsgák Magyarországra",
    testsSub: "KRESZ teszt a B kategóriához: 200 kérdés a magyar KRESZ alapján, km/h-ban, jobb oldali közlekedésre, három 55 kérdéses teszt; az igazi vizsgán a 75 pontból 65 kell. Ezenkívül a motoros (AM, A1, A2, A) és a GKI elméleti vizsga angolul, az elsősegély vizsga és a biztosításközvetítői vizsga magyarul.",
  },

  // In Dutch (REGIONS[].lang), machine-translated, pending native review.
  BE: {
    title: "Gratis oefenen voor het Belgische theorie-examen | Tigertest",
    description: "Gratis oefenen voor Belgische examens: het theorie-examen rijbewijs B in het Nederlands, het Frans of het Engels, het motorexamen, theorie vrachtwagen C en vakbekwaamheid, het toelatingsexamen arts en tandarts en het FSMA-examen verzekeringen. Eigen vragen, elk antwoord uitgelegd. Geen account nodig.",
    lead: "Oefen voor het theorie-examen rijbewijs B in Vlaanderen, Wallonië en Brussel, in het Nederlands, het Frans of het Engels, en voor het motorexamen, het theorie-examen vrachtwagen C, het toelatingsexamen arts en tandarts en het FSMA-examen verzekeringsdistributie. Eigen vragen, elk antwoord uitgelegd. Zonder account.",
    cta: { label: "Theorie-examen", href: "/nl/theorie-examen-rijbewijs-b-oefenen" },
    testsTitle: "Oefenexamens voor België",
    testsSub: "Theorie-examen rijbewijs B: 200 vragen over de Belgische Wegcode, in het Nederlands, het Frans en het Engels, in km/u en voor rechtsverkeer, vier proefexamens van 50 vragen, 41 om te slagen. Daarnaast het motorexamen (A1, A2, A) in het Engels en theorie vrachtwagen C, het toelatingsexamen arts en tandarts en het FSMA-examen verzekeringen in het Nederlands.",
  },


  // In Finnish (REGIONS[].lang), machine-written, pending native review.
  FI: {
    title: "Ilmainen ajokortin teoriakoe ja harjoituskokeet suomeksi | Tigertest",
    description: "Ilmaiset harjoituskokeet suomalaisiin kokeisiin: B-ajokortin teoriakoe, moottoripyörän sekä kuorma- ja linja-auton teoriakokeet, hygieniapassitesti ja metsästäjätutkinto. Omat kysymykset, jokainen vastaus selitetty. Ei tiliä.",
    lead: "Harjoittele ilmaiseksi Traficomin ajokortin teoriakokeeseen ja metsästäjätutkintoon suomeksi sekä moottoripyörän, kuorma- ja linja-auton teoriakokeisiin ja hygieniapassitestiin englanniksi. Omat kysymykset, jokainen vastaus selitetty. Ei rekisteröitymistä.",
    cta: { label: "Ajokortin teoriakoe", href: "/fi/ajokortin-teoriakoe" },
    testsTitle: "Harjoituskokeet Suomeen",
    testsSub: "B-ajokortin teoriakoe: 200 kysymystä Suomen tieliikennelaista, km/h ja oikeanpuoleinen liikenne, neljä 50 kysymyksen harjoituskoetta ja tavoitteena 43 oikein. Lisäksi moottoripyörän (A1, A2, A) sekä kuorma- ja linja-auton (C, CE, D, DE) teoriakokeet ja hygieniapassitesti englanniksi sekä metsästäjätutkinto suomeksi.",
  },
  // Written in German (REGIONS[].lang). The CTA shows once detheorie is in
  // the catalog (HomePage hides a CTA whose test is not listed yet).
  DE: {
    title: "Führerschein Theorie kostenlos üben | Tigertest",
    description: "Kostenlose Übungstests für die Theorieprüfung Klasse B: eigene Fragen zu StVO, Vorfahrt und Verkehrszeichen, jede Antwort erklärt. Ohne Anmeldung.",
    lead: "Übe für die theoretische Führerscheinprüfung Klasse B. Eigene Fragen zu Vorfahrt, Verkehrszeichen, Geschwindigkeit und Gefahrenlehre nach der StVO, jede Antwort erklärt. Ohne Anmeldung.",
    cta: { label: "Führerschein-Theorie", href: "/de/fuehrerschein-theorie-test" },
    testsTitle: "Übungstests für Deutschland",
    testsSub: "Die Theorieprüfung Klasse B und für das Motorrad (Klassen A, A1, A2): Fragen nach StVO und Fahrerlaubnis-Verordnung, in km/h für den Rechtsverkehr. Dazu die AEVO-Prüfung für Ausbilder, die Sachkundeprüfung nach § 34a GewO und der schriftliche Teil der Heilpraktikerprüfung.",
  },
  // Written in Italian (REGIONS[].lang). The CTA shows once itpatente is in the catalog.
  IT: {
    title: "Quiz patente B gratis: esercitati per la teoria | Tigertest",
    description: "Esercitati gratis per l'esame di teoria della patente B e per le certificazioni di italiano B1 (CILS, CELI): domande originali, ogni risposta spiegata. Senza registrazione.",
    lead: "Esercitati per l'esame di teoria della patente B: domande originali su segnali, precedenze, limiti di velocità e guida sicura secondo il Codice della Strada, ogni risposta spiegata. Senza registrazione.",
    cta: { label: "Quiz patente B", href: "/it/quiz-patente-b" },
    testsTitle: "Test di pratica per l'Italia",
    testsSub: "Il quiz di teoria per la patente B secondo il Codice della Strada, in km/h e con circolazione a destra. Inoltre le certificazioni di lingua italiana di livello B1 per la cittadinanza: CILS B1 Cittadinanza e CELI 2.",
  },
  MT: {
    title: "Free Malta Driving Theory Test Practice | Tigertest",
    description: "Free practice for Malta: the Transport Malta car and motorcycle theory tests, the Driver CPC, the taxi driver theory test and the private guard course, every answer explained. No account needed.",
    lead: "Practise for Transport Malta's theory tests: car, motorcycle, Driver CPC and the taxi driver test. Original questions on signs, roundabouts, riding, taxi rules and the places of Malta and Gozo, every answer explained. No signup.",
    cta: { label: "Theory test", href: "/malta-driving-theory-test" },
    testsTitle: "Practice tests for Malta",
    testsSub: "The car theory test: 200 questions on Malta's road rules, in km/h for left-hand traffic, five full 35-question tests, 30 to pass. Also the motorcycle theory test, the Driver CPC for bus and truck drivers, the taxi driver theory test and the private guard course.",
  },
};

/**
 * Hub groups in the order a region sees them: its own groups first, then the
 * worldwide ones, then the rest of the world, then (outside the US) the US.
 * The US keeps today's order with the other countries' groups moved to the end.
 */
export function orderGroupsForRegion<G extends { title: string; tests: { id: string }[] }>(groups: G[], region: Region): G[] {
  // A group is a region's own when any member belongs to it, so a mixed group
  // (Citizenship tests: US, UK, Canada, Australia) leads in each of those countries.
  const regionsOf = (g: G): Set<TestRegion> => new Set(g.tests.length ? g.tests.map((t) => regionOfTest(t.id)) : ["US" as TestRegion]);
  const rank = (g: G): number => {
    const rs = regionsOf(g);
    if (region === "US") return rs.has("US") || rs.has("GLOBAL") ? 0 : 1;
    if (rs.has(region)) return 0;
    if (rs.has("GLOBAL")) return 1;
    if ([...rs].some((r) => r !== "US")) return 2;
    return 3;
  };
  return groups
    .map((g, i) => ({ g, i }))
    .sort((a, b) => rank(a.g) - rank(b.g) || a.i - b.i)
    .map((x) => x.g);
}
