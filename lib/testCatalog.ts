import { EXAMS, ExamConfig, examLandingPath } from "./exams";

// Every practice test on the site, for the /tests hub, the header test
// switcher, the footer and the "other tests" strip on the DMV homepage.
// `href` is always the SEO landing page, never the dashboard, so internal
// links point at the page we want ranked.
export interface TestCatalogEntry {
  id: string;
  /** Short name for menus, e.g. "DMV". */
  shortName: string;
  /** Card title, e.g. "DMV Permit Test". */
  name: string;
  /** Who it is for / issuing body. */
  org: string;
  blurb: string;
  href: string;
  dashboardHref: string;
  questions: number;
  icon: "car" | ExamConfig["icon"];
  /** data-theme used for the card accent; undefined = DMV orange. */
  theme?: string;
}

const dmv: TestCatalogEntry = {
  id: "dmv",
  shortName: "DMV",
  name: "DMV Permit Test",
  org: "All 50 states + DC",
  blurb: "State-specific permit and driver's license knowledge tests. Signs, rules of the road, safety and your state's laws.",
  href: "/",
  dashboardHref: "/dashboard",
  questions: 200,
  icon: "car",
};

const EXAM_BLURBS: Record<string, string> = {
  cdl: "600 questions on the CDL general knowledge exam. Six blueprint-weighted tests and six training sets by topic.",
  cdlx: "Five CDL endorsement tests in one place: HazMat, air brakes, combination vehicles, tank vehicles and passenger transport, from the FMCSA manual.",
  moto: "Motorcycle permit knowledge test, based on the MSF manual nearly every state uses. Gear, control, positioning, hazards and alcohol.",
  part107: "FAA remote pilot (drone) knowledge test. Regulations, airspace and charts, weather, loading and performance, operations.",
  ham: "FCC amateur radio Technician class exam. The full official 2026-2030 question pool with explanations, in 35-question practice exams.",
  epa608: "EPA Section 608 refrigerant handling certification. Core plus Type I, II and III sections, with the real 72% pass line.",
  civics: "The USCIS naturalization civics test. All 128 official 2025 questions as multiple choice: government, history, symbols and holidays.",
  cna: "Nurse aide written exam on the NNAAP outline: daily living, basic nursing skills, psychosocial care and the role of the aide.",
  ptcb: "PTCB pharmacy technician certification exam. Medications, patient safety, order entry math and federal law, on the 2026 PTCE outline.",
  phleb: "Phlebotomy technician certification on the NHA CPT test plan, also covers ASCP PBT and AMT RPT. Order of draw, technique, safety, processing and special collections.",
  ccma: "NHA clinical medical assistant exam. Vitals, patient care, infection control, lab, phlebotomy, EKG, admin, communication and law, on the CCMA test plan.",
  cet: "NHA certified EKG technician exam. Lead placement, artifacts, Holter and stress testing, patient safety, and rhythm analysis, on the CET test plan.",
  aplus: "CompTIA A+ Core 1 (220-1201) and Core 2 (220-1202). Hardware, networking, mobile, cloud, operating systems, security, troubleshooting and operational procedures.",
  aws: "AWS Certified Cloud Practitioner (CLF-C02). Cloud concepts, the shared responsibility model, IAM and security services, core services, pricing and support plans.",
  teas: "ATI TEAS 7 nursing school entrance exam. Reading with passages, math with worked solutions, science with anatomy and physiology, and English usage.",
  notary: "Notary public exam prep: acknowledgments, jurats, oaths, identification, journal and seal, ethics and liability. General law for every state's test.",
  insurance: "Life and health insurance license exam, general portion. Insurance concepts, life policies and provisions, annuities and taxation, health provisions and policy types.",
  realestate: "Real estate salesperson national exam on the Pearson VUE and PSI outlines. Property, ownership, contracts, agency, practice, disclosures, financing and math.",
  foodmgr: "Certified Food Protection Manager exam (ServSafe Manager, NRFSP, Prometric and other accredited exams). Food Code temperatures, flow of food, hygiene, sanitizing and HACCP.",
  emt: "NREMT EMT cognitive exam on the 2025 test plan. Scene size-up, primary and secondary assessment, treatment and transport, and operations.",
  danb: "DANB Certified Dental Assistant: General Chairside, Radiation Health and Safety, and Infection Control in one place, on the current DANB outlines.",
  htl: "ASCP histotechnologist and histotechnician certification. Fixation, processing, embedding, microtomy, staining and lab operations.",
  cst: "NBSTSA surgical technologist certification. Preoperative, intraoperative and postoperative care, sterilization, anatomy, microbiology and pharmacology.",
  crcst: "HSPA sterile processing certification, also covers the CBSPD CSPDT. Decontamination, packaging, sterilization, storage and patient care equipment.",
};

// Short issuing-body line for menus; defaults to the exam label.
const EXAM_ORG: Record<string, string> = { cdl: "Commercial license", cdlx: "H, air brakes, combo, N, P", moto: "Permit knowledge test", civics: "USCIS naturalization", part107: "FAA drone pilot", ham: "FCC Technician licence", epa608: "HVAC refrigerant certification", cna: "Nurse aide written exam", ptcb: "Pharmacy technician certification", phleb: "NHA CPT, ASCP PBT, AMT RPT", ccma: "NHA medical assistant exam", cet: "NHA EKG technician exam", danb: "DANB CDA: GC, RHS, ICE", emt: "NREMT cognitive exam", foodmgr: "ANAB-CFP accredited exams", realestate: "National portion, Pearson VUE and PSI", insurance: "Life, accident & health producer exam", notary: "General notary law, all states", teas: "Nursing & allied health admissions", aws: "AWS CLF-C02", aplus: "CompTIA 220-1201 / 220-1202" };

const examEntry = (exam: ExamConfig): TestCatalogEntry => ({
  id: exam.id,
  shortName: exam.shortName,
  name: exam.name,
  org: EXAM_ORG[exam.id] ?? exam.examLabel,
  blurb: EXAM_BLURBS[exam.id] ?? exam.fullName,
  href: examLandingPath(exam),
  dashboardHref: `${exam.slug}/dashboard`,
  questions: exam.testCount * exam.questionsPerTest,
  icon: exam.icon,
  theme: exam.id,
});

export const TEST_CATALOG: TestCatalogEntry[] = [dmv, ...EXAMS.map(examEntry)];

/** Hub groupings, in display order. Anything not listed falls into "Other exams". */
const GROUPS: { title: string; ids: string[] }[] = [
  { title: "Driving tests", ids: ["dmv", "cdl", "cdlx", "moto"] },
  { title: "Citizenship", ids: ["civics"] },
  { title: "Aviation, radio & trade licenses", ids: ["part107", "ham", "epa608", "foodmgr"] },
  { title: "Real estate, insurance & notary licenses", ids: ["realestate", "insurance", "notary"] },
  { title: "College & nursing school entrance", ids: ["teas"] },
  { title: "IT certifications", ids: ["aplus", "aws"] },
  { title: "Emergency services", ids: ["emt"] },
  { title: "Healthcare certification exams", ids: ["cna", "ccma", "ptcb", "phleb", "cet", "danb", "htl", "cst", "crcst"] },
];
export const TEST_GROUPS: { title: string; tests: TestCatalogEntry[] }[] = [
  ...GROUPS.map((g) => ({ title: g.title, tests: TEST_CATALOG.filter((t) => g.ids.includes(t.id)) })),
  { title: "Other exams", tests: TEST_CATALOG.filter((t) => !GROUPS.some((g) => g.ids.includes(t.id))) },
].filter((g) => g.tests.length > 0);

/** Extra words people type that do not appear in the name, org or blurb. */
const SEARCH_ALIASES: Record<string, string> = {
  dmv: "driver license permit learners written knowledge road signs state",
  cdl: "truck trucking commercial class a class b",
  cdlx: "hazmat hazardous materials air brakes combination tanker passenger school bus endorsement",
  moto: "motorbike m endorsement",
  civics: "citizenship naturalization immigration n-400 uscis green card",
  part107: "drone uas uav remote pilot faa",
  ham: "amateur radio fcc technician callsign",
  epa608: "hvac refrigerant freon air conditioning technician universal",
  cna: "nursing assistant nurse aide nnaap",
  ptcb: "pharmacy technician pharm tech ptce",
  phleb: "blood draw venipuncture cpt pbt",
  ccma: "medical assistant clinical nha",
  cet: "ekg ecg electrocardiogram cardiac technician",
  danb: "dental assistant cda chairside radiography infection control",
  emt: "emergency medical technician paramedic ambulance nremt",
  foodmgr: "food safety servsafe food handler manager cfpm haccp",
  realestate: "realtor salesperson broker license property",
  insurance: "life health accident producer agent license",
  notary: "notary public signing agent commission",
  teas: "nursing school entrance ati admissions",
  aws: "amazon cloud practitioner clf-c02 certification",
  aplus: "comptia a plus it support help desk core 1 core 2 hardware",
  htl: "histology histotechnologist histotechnician ascp",
  cst: "surgical technologist scrub tech operating room",
  crcst: "sterile processing central service hspa cbspd",
};

function haystack(t: TestCatalogEntry): string {
  return [t.shortName, t.name, t.org, t.blurb, SEARCH_ALIASES[t.id] ?? ""].join(" ").toLowerCase();
}

/**
 * Filter the catalog by a free-text query. Every whitespace-separated term
 * must match somewhere in the name, org, blurb or aliases. An empty query
 * returns everything. Name matches sort before blurb-only matches.
 */
export function searchTests(query: string, tests: TestCatalogEntry[] = TEST_CATALOG): TestCatalogEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return tests;
  const scored = tests
    .map((t) => {
      const text = haystack(t);
      if (!terms.every((term) => text.includes(term))) return null;
      const title = `${t.shortName} ${t.name}`.toLowerCase();
      const score = terms.filter((term) => title.includes(term)).length;
      return { t, score };
    })
    .filter((x): x is { t: TestCatalogEntry; score: number } => x !== null);
  return scored.sort((a, b) => b.score - a.score).map((x) => x.t);
}

/** TEST_GROUPS narrowed to a query, dropping empty groups. */
export function searchTestGroups(query: string) {
  if (!query.trim()) return TEST_GROUPS;
  const hits = new Set(searchTests(query).map((t) => t.id));
  return TEST_GROUPS.map((g) => ({ title: g.title, tests: g.tests.filter((t) => hits.has(t.id)) })).filter((g) => g.tests.length > 0);
}

/** Which catalog entry a pathname belongs to (DMV is the fallback). */
export function getCatalogEntryByPath(pathname: string | null | undefined): TestCatalogEntry {
  if (!pathname) return dmv;
  for (const t of TEST_CATALOG) {
    if (t.id === "dmv") continue;
    if (pathname === t.href || pathname.startsWith(t.dashboardHref.replace(/\/dashboard$/, "") + "/")) return t;
  }
  return dmv;
}
