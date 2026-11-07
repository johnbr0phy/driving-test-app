// Which country's tests a visitor sees first. Each country has its own
// indexable homepage: the US at "/", the others at /uk, /ie, /ca, /au, /nz, /in,
// /ph, /my, /sg, /hk, /ae, /za, /ng, /ke, /pk,
// /es, /pt, /ro, /se, /gr, /dk, /hu, /be, /fi, /mt and /de. A view
// setting only: it never touches progress, and every test stays reachable from
// every country. middleware.ts sets it from Vercel's request country on the
// first visit and sends a visitor from any other country we cover from "/" to their
// country's page; the CountryPills change it.

import type { Language } from "@/i18n";

export type Region = "US" | "CA" | "UK" | "IE" | "AU" | "NZ" | "IN" | "PH" | "MY" | "SG" | "HK" | "AE" | "ZA" | "NG" | "KE" | "PK" | "ES" | "PT" | "RO" | "SE" | "GR" | "DK" | "HU" | "BE" | "FI" | "MT" | "DE";

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
  { code: "RO", name: "Romania", short: "RO", inName: "Romania", lang: "en", locale: "en-RO" },
  { code: "SE", name: "Sweden", short: "SE", inName: "Sweden", lang: "en", locale: "en-SE" },
  { code: "GR", name: "Greece", short: "GR", inName: "Greece", lang: "en", locale: "en-GR" },
  { code: "DK", name: "Denmark", short: "DK", inName: "Denmark", lang: "en", locale: "en-DK" },
  { code: "HU", name: "Hungary", short: "HU", inName: "Hungary", lang: "en", locale: "en-HU" },
  { code: "BE", name: "Belgium", short: "BE", inName: "Belgium", lang: "nl", locale: "nl-BE" },
  { code: "FI", name: "Finland", short: "FI", inName: "Finland", lang: "en", locale: "en-FI" },
  { code: "MT", name: "Malta", short: "MT", inName: "Malta", lang: "en", locale: "en-MT" },
  { code: "DE", name: "Germany", short: "DE", inName: "Germany", lang: "de", locale: "de-DE" },
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
  ukcar: "UK", ukmoto: "UK", uklgv: "UK", ukpcv: "UK", ukadi: "UK", timestables: "UK", ks2: "UK", gcsemaths: "UK", uksia: "UK", uk18ed: "UK",
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
  phnle: "PH", phmedtech: "PH", phpharm: "PH", phmidwife: "PH", phpsychom: "PH", phnapolcom: "PH", afpsat: "PH", phcle: "PH", phinsurance: "PH", phrebroker: "PH",
  sgftt: "SG", sgrtt: "SG", sgres: "SG", sgm5: "SG", sgvl: "SG", hkiiqe1: "HK", hklesfi1: "HK", aesira: "AE", mypce: "MY", kenck: "KE",
  detheorie: "DE",
  esdgt: "ES", ptimt: "PT", rodrpciv: "RO", setrafik: "SE", grdriving: "GR", dkteori: "DK", hukresz: "HU", bedriving: "BE", fitheory: "FI", mttheory: "MT",
  jambeng: "NG", jambmath: "NG", jambbio: "NG", jambchem: "NG", jambphys: "NG",
  ngpolice: "NG", cdcfib: "NG", ngarmy: "NG", ngcustoms: "NG", trcnpqe: "NG",
  inrto: "IN", ssccgl: "IN", rrbntpc: "IN", ibpspo: "IN", ctet: "IN",
  rrbgroupd: "IN", sscgd: "IN", sscchsl: "IN", sscmts: "IN", uppolice: "IN", ibpsclerk: "IN", jnvst: "IN",
  sbiclerk: "IN", sbipo: "IN", ibpsrrb: "IN", biharpolice: "IN", rajpolice: "IN", delhipolice: "IN", mppolice: "IN",
  upscse: "IN", nda: "IN", agniveer: "IN", agniveervayu: "IN", rrbalp: "IN", rpfconst: "IN", ssccpo: "IN",
  neet: "IN", jeemain: "IN", cuet: "IN", mhtcet: "IN", ugcnet: "IN", reet: "IN", uptet: "IN", aissee: "IN",
  aplus: "GLOBAL", secplus: "GLOBAL", aws: "GLOBAL", awssaa: "GLOBAL", az900: "GLOBAL", ccna: "GLOBAL", pmp: "GLOBAL", gulfrn: "GLOBAL",
  netplus: "GLOBAL", cysa: "GLOBAL", cissp: "GLOBAL", gcdl: "GLOBAL", gre: "GLOBAL", gmat: "GLOBAL", itil: "GLOBAL", psm: "GLOBAL", capm: "GLOBAL",
  ccaf: "GLOBAL", sfadmin: "GLOBAL", cfal1: "GLOBAL", accafa: "GLOBAL", cisa: "GLOBAL", cssgb: "GLOBAL",
};

/** A country's tests that are not driving tests: shown beside the worldwide ones, not in the driving grid. */
export const NON_DRIVING_TESTS = new Set([
  "timestables", "ks2", "gcsemaths", "uksia", "uk18ed",
  "gcsehigher", "gcsescience", "gcsecs", "elevenplus", "fsmaths", "cscs", "ukfood", "ukaplh", "ukfaw", "ukcare", "uklitu", "uknmc", "ukseru", "aatl2", "cemap",
  "osslt", "capal", "caelec",
  "rexpn", "eqao9", "capsw", "casfa", "cawhmis", "caguard", "caauto", "caplumb", "cacarp", "caweld", "cacit", "pcoc", "llqp",
  "naplan", "nswsel", "auwhite",
  "naplan7", "ocnsw", "vicsel", "hscmaths", "aursa", "aurcg", "aufss", "aufirstaid", "auforklift", "auwah", "aucit",
  "ssccgl", "rrbntpc", "ibpspo", "ctet",
  "rrbgroupd", "sscgd", "sscchsl", "sscmts", "uppolice", "ibpsclerk", "jnvst",
  "sbiclerk", "sbipo", "ibpsrrb", "biharpolice", "rajpolice", "delhipolice", "mppolice",
  "upscse", "nda", "agniveer", "agniveervayu", "rrbalp", "rpfconst", "ssccpo",
  "neet", "jeemain", "cuet", "mhtcet", "ugcnet", "reet", "uptet", "aissee",
  "apgov", "apworld", "aphug", "aplang", "apcalcab",
  "phcse", "phlet",
  "phnle", "phmedtech", "phpharm", "phmidwife", "phpsychom", "phnapolcom", "afpsat", "phcle", "phinsurance", "phrebroker",
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
    testsTitle: "Examen teórico de la DGT (permiso B)",
    testsSub: "200 preguntas sobre las normas de circulación en España, en km/h y con circulación por la derecha. Seis tests completos de 30 preguntas, se aprueba con 27.",
  },

  // In Portuguese (REGIONS[].lang), machine-translated, pending native review.
  PT: {
    title: "Testes de código IMT grátis: treine o exame de código | Tigertest",
    description: "Treino grátis para o exame teórico de condução do IMT (exame de código), categoria B: 200 perguntas originais sobre o Código da Estrada, cada resposta explicada. Não precisa de conta.",
    lead: "Treine para o exame de código, o exame teórico do IMT para a carta de condução de ligeiros. Perguntas originais sobre sinais, prioridade, rotundas, limites de velocidade e condução segura, cada resposta explicada. Sem registo.",
    cta: { label: "Exame de código IMT", href: "/pt/testes-codigo-imt" },
    testsTitle: "Exame de código do IMT",
    testsSub: "200 perguntas sobre o Código da Estrada, em km/h e com circulação pela direita. Seis testes completos de 30 perguntas, passa com 27.",
  },

  RO: {
    title: "Free Romania Driving Theory Test Practice in English | Tigertest",
    description: "Free practice in English for the Romanian category B driving theory exam: 200 original questions on the traffic code, seven 26-question mock tests, every answer explained. No account needed.",
    lead: "Practise in English for the DRPCIV category B theory exam. Original questions on Romanian priority rules, trams, signs, speed limits and parking, every answer explained. No signup.",
    cta: { label: "Romania theory test", href: "/romania-driving-theory-test" },
    testsTitle: "Category B theory exam",
    testsSub: "200 questions on the Romanian traffic code, in km/h for right-hand traffic. Seven 26-question tests, 22 to pass.",
  },
  SE: {
    title: "Free Sweden Driving Theory Test Practice in English | Tigertest",
    description: "Free practice in English for the Swedish driving theory test (kunskapsprov B): 200 original questions on Swedish traffic rules, every answer explained. No account needed.",
    lead: "Practise in English for Trafikverket's theory test, the knowledge test for a Swedish B licence. Original questions on right of way, signs, speed, winter driving and safety, every answer explained. No signup.",
    cta: { label: "Theory test", href: "/sweden-driving-theory-test" },
    testsTitle: "Driving theory test (kunskapsprov B)",
    testsSub: "200 questions on Swedish traffic rules, in km/h for right-hand traffic. The real test has 65 scored questions and you need 52 right.",
  },
  GR: {
    title: "Free Greece Driving Theory Test Practice in English | Tigertest",
    description: "Free Greek driving theory test practice in English: 200 original category B questions on the Greek Highway Code and road signs, every answer explained. No account needed.",
    lead: "Practise in English for the category B theory test before your Greek driving licence. Original questions on Greek road signs, priority, the 2025 Highway Code and safe driving, every answer explained. No signup.",
    cta: { label: "Greek theory test", href: "/greece-driving-theory-test" },
    testsTitle: "Driving theory test (category B)",
    testsSub: "200 questions on the Greek Highway Code, in km/h for right-hand traffic. Six full 30-question tests, 29 to pass.",
  },
  DK: {
    title: "Free Denmark Theory Test Practice in English | Tigertest",
    description: "Free Danish driving theory test (teoriprøve) practice in English: 200 original questions on Danish road rules, every answer explained. No account needed.",
    lead: "Practise in English for the teoriprøve, the theory test for a Danish category B car licence. Original questions on give way, roundabouts, cyclists, motorways and parking, every answer explained. No signup.",
    cta: { label: "Danish theory test", href: "/denmark-driving-theory-test" },
    testsTitle: "Theory test (teoriprøve)",
    testsSub: "200 questions on Danish road rules, in km/h for right-hand traffic. Eight 25-question tests, 20 to pass like the real test.",
  },
  HU: {
    title: "Free Hungary KRESZ Theory Test Practice in English | Tigertest",
    description: "Free KRESZ theory exam practice for Hungary in English: 200 original questions on the Hungarian Highway Code, every answer explained. No account needed.",
    lead: "Practise in English for the KRESZ theory exam (Közlekedési alapismeretek) before your category B driving test. Original questions on Hungarian signs, the right-hand rule, trams, speed limits and level crossings, every answer explained. No signup.",
    cta: { label: "KRESZ theory test", href: "/hungary-kresz-test" },
    testsTitle: "KRESZ theory exam",
    testsSub: "200 questions on the Hungarian Highway Code, in km/h for right-hand traffic. Three full 55-question tests; the real exam needs 65 of 75 points.",
  },
  // In Dutch (REGIONS[].lang; the test itself is in English), machine-translated, pending native review.
  BE: {
    title: "Gratis oefenen voor het Belgische theorie-examen | Tigertest",
    description: "Gratis oefenen voor het Belgische theorie-examen, in het Engels: 200 eigen vragen over de Wegcode met de echte slaaggrens van 41/50, elk antwoord uitgelegd. Geen account nodig.",
    lead: "Oefen in het Engels voor het theorie-examen rijbewijs B in Vlaanderen, Wallonië en Brussel. Eigen vragen over voorrang van rechts, verkeersborden, snelheidsbeperkingen en parkeren, elk antwoord uitgelegd. Zonder account.",
    cta: { label: "Theorie-examen", href: "/belgium-driving-theory-test" },
    testsTitle: "Theorie-examen rijbewijs B",
    testsSub: "200 vragen in het Engels over de Belgische Wegcode, in km/u en voor rechtsverkeer. Vier volledige toetsen van 50 vragen, 41 om te slagen.",
  },

  FI: {
    title: "Free Finland Driving Theory Test Practice in English | Tigertest",
    description: "Free practice in English for the Finnish category B theory test (teoriakoe): 200 original questions on Finnish traffic rules and signs, every answer explained. No account needed.",
    lead: "Practise in English for the Finnish theory test, the first step to a category B licence. Original questions on giving way, signs, parking and winter driving, every answer explained. No signup.",
    cta: { label: "Finnish theory test", href: "/finland-driving-theory-test" },
    testsTitle: "Category B theory test",
    testsSub: "200 questions on the Finnish Road Traffic Act, in km/h for right-hand traffic. Four full 50-question tests, 43 to pass.",
  },
  // Written in German (REGIONS[].lang). The CTA shows once detheorie is in
  // the catalog (HomePage hides a CTA whose test is not listed yet).
  DE: {
    title: "Führerschein Theorie kostenlos üben | Tigertest",
    description: "Kostenlose Übungstests für die Theorieprüfung Klasse B: eigene Fragen zu StVO, Vorfahrt und Verkehrszeichen, jede Antwort erklärt. Ohne Anmeldung.",
    lead: "Übe für die theoretische Führerscheinprüfung Klasse B. Eigene Fragen zu Vorfahrt, Verkehrszeichen, Geschwindigkeit und Gefahrenlehre nach der StVO, jede Antwort erklärt. Ohne Anmeldung.",
    cta: { label: "Führerschein-Theorie", href: "/de/fuehrerschein-theorie-test" },
    testsTitle: "Theorieprüfung Klasse B",
    testsSub: "Fragen nach StVO und Fahrerlaubnis-Verordnung, in km/h für den Rechtsverkehr. Videofragen und Fehlerpunkte werden nicht nachgebildet.",
  },
  MT: {
    title: "Free Malta Driving Theory Test Practice | Tigertest",
    description: "Free driving theory test practice for Malta: 200 original questions on Maltese road rules and signs, every answer explained. No account needed.",
    lead: "Practise for the Transport Malta theory test for your car licence. Original questions on signs, roundabouts, speed limits and safe driving, every answer explained. No signup.",
    cta: { label: "Theory test", href: "/malta-driving-theory-test" },
    testsTitle: "Driving theory test",
    testsSub: "200 questions on Malta's road rules, in km/h for left-hand traffic. Five full 35-question tests, 30 to pass.",
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
