import { EXAMS, ExamConfig, examLandingPath } from "./exams";
import { EXAMS_V2 } from "./v2/registry";
import { getBank } from "./v2/bank";
import type { ExamV2Config } from "./v2/types";

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
  asvab: "Full CAT-ASVAB simulation: eight timed subtests in test order with no going back, an AFQT estimate, and a drill for every subtest.",
  cpr: "CPR, AED and first aid certification written exam prep on current resuscitation guidelines: chain of survival, adult, child and infant CPR, AED use, choking, bleeding, shock, burns and more.",
  osha: "OSHA 10 Outreach course final exam prep for construction and general industry: worker rights, fall protection, electrical, struck-by and caught-in, hazard communication, PPE and health hazards.",
  forklift: "Forklift operator certification written test on OSHA 1910.178: stability triangle, load capacity, pre-shift inspection, safe travel, pedestrians, docks and ramps.",
  alcohol: "Alcohol server and seller certification exam prep: how alcohol affects the body, recognizing intoxication, checking IDs, refusing service, dram shop liability. For any state or provider course.",
  accuplacer: "Next-Generation ACCUPLACER placement practice: untimed sections scored 200 to 300 for reading, writing, arithmetic, quantitative reasoning and advanced algebra, plus drills.",
  security: "Unarmed security guard license (guard card) exam prep: legal powers and use of force, observation and patrol, access control, report writing, emergency response and terrorism awareness.",
  lifeguard: "Lifeguard certification written exam prep: scanning and surveillance, recognizing drowning, water rescues and spinal injury care, first aid, CPR and AED, facility safety.",
  pnc: "Property and casualty insurance license exam, general portion. Insurance basics, policy provisions, homeowners and dwelling forms, personal auto, commercial lines, flood and surety.",
  hesi: "HESI A2 nursing entrance exam with seven timed sections scored like the real report: math with dosage conversions, reading passages, vocabulary, grammar, biology, chemistry and anatomy and physiology.",
  sat: "Full-length digital SAT practice: two timed sections with adaptive modules, a calculator, and a 400 to 1600 score estimate, plus skill drills built for your phone.",
  secplus: "CompTIA Security+ SY0-701. General security concepts, threats and vulnerabilities, architecture, operations, and program management, in CompTIA's scenario style.",
  hunter: "Hunter education (hunter safety) exam prep on the IHEA standards: firearm safety and carries, ammunition, shot placement, tree stands, wildlife identification, conservation, ethics and survival.",
  boating: "Boating license (boater safety card) exam prep on the NASBLA standards: navigation rules, buoys, lights and sound signals, required equipment, safe operation, emergencies.",
  foodhandler: "Food handler card test prep on the FDA Food Code: hygiene, cross-contamination, allergens, cooking and holding temperatures, cooling, sanitizing. For every ANAB-accredited course.",
  aplus: "CompTIA A+ Core 1 (220-1201) and Core 2 (220-1202). Hardware, networking, mobile, cloud, operating systems, security, troubleshooting and operational procedures.",
  aws: "AWS Certified Cloud Practitioner (CLF-C02). Cloud concepts, the shared responsibility model, IAM and security services, core services, pricing and support plans.",
  teas: "ATI TEAS 7 nursing school entrance exam as a full-length timed test with four sections and percent scores, plus drills for reading, math, science and English.",
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
const EXAM_ORG: Record<string, string> = { sat: "Digital SAT · Reading and Writing, Math", cdl: "Commercial license", cdlx: "H, air brakes, combo, N, P", moto: "Permit knowledge test", civics: "USCIS naturalization", part107: "FAA drone pilot", ham: "FCC Technician licence", epa608: "HVAC refrigerant certification", cna: "Nurse aide written exam", ptcb: "Pharmacy technician certification", phleb: "NHA CPT, ASCP PBT, AMT RPT", ccma: "NHA medical assistant exam", cet: "NHA EKG technician exam", danb: "DANB CDA: GC, RHS, ICE", emt: "NREMT cognitive exam", foodmgr: "ANAB-CFP accredited exams", realestate: "National portion, Pearson VUE and PSI", insurance: "Life, accident & health producer exam", notary: "General notary law, all states", teas: "Nursing & allied health admissions", aws: "AWS CLF-C02", aplus: "CompTIA 220-1201 / 220-1202", foodhandler: "ANAB-accredited course tests", boating: "NASBLA state boater exams", hunter: "IHEA state hunter education exams", secplus: "CompTIA SY0-701", hesi: "Nursing school admissions", asvab: "Military entrance, all branches", cpr: "Lay rescuer & healthcare BLS courses", osha: "OSHA Outreach course final", forklift: "OSHA 1910.178 operator evaluation", alcohol: "State & provider server courses", accuplacer: "College placement", security: "State guard card exams", lifeguard: "Certification written exam", pnc: "P&C producer exam, general portion" };

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

// v2 exams (sectioned, timed, scaled scores) live outside the v1 registry.
const v2Entry = (exam: ExamV2Config): TestCatalogEntry => ({
  id: exam.id,
  shortName: exam.shortName,
  name: exam.name,
  org: EXAM_ORG[exam.id] ?? exam.fullName,
  blurb: EXAM_BLURBS[exam.id] ?? exam.tagline,
  href: exam.landingPath,
  dashboardHref: exam.slug,
  questions: getBank(exam.id).questions.length,
  icon: exam.icon as TestCatalogEntry["icon"],
  theme: exam.id,
});

export const TEST_CATALOG: TestCatalogEntry[] = [dmv, ...EXAMS_V2.map(v2Entry), ...EXAMS.map(examEntry)];

/** Hub groupings, in display order. Anything not listed falls into "Other exams". */
const GROUPS: { title: string; ids: string[] }[] = [
  { title: "Driving tests", ids: ["dmv", "cdl", "cdlx", "moto"] },
  { title: "Citizenship", ids: ["civics"] },
  { title: "Outdoor & recreation licenses", ids: ["boating", "hunter", "lifeguard"] },
  { title: "Workplace & job certifications", ids: ["foodhandler", "osha", "forklift", "alcohol", "security"] },
  { title: "Aviation, radio & trade licenses", ids: ["part107", "ham", "epa608", "foodmgr"] },
  { title: "Real estate, insurance & notary licenses", ids: ["realestate", "insurance", "pnc", "notary"] },
  { title: "College, military & nursing school entrance", ids: ["sat", "accuplacer", "asvab", "teas", "hesi"] },
  { title: "IT certifications", ids: ["aplus", "secplus", "aws"] },
  { title: "Emergency services", ids: ["emt", "cpr"] },
  { title: "Healthcare certification exams", ids: ["cna", "ccma", "ptcb", "phleb", "cet", "danb", "htl", "cst", "crcst"] },
];
export const TEST_GROUPS: { title: string; tests: TestCatalogEntry[] }[] = [
  ...GROUPS.map((g) => ({ title: g.title, tests: TEST_CATALOG.filter((t) => g.ids.includes(t.id)) })),
  { title: "Other exams", tests: TEST_CATALOG.filter((t) => !GROUPS.some((g) => g.ids.includes(t.id))) },
].filter((g) => g.tests.length > 0);

/** Extra words people type that do not appear in the name, org or blurb. */
const SEARCH_ALIASES: Record<string, string> = {
  dmv: "driver license permit learners written knowledge road signs state",
  sat: "digital sat psat college board college admissions high school act reading writing math bluebook",
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
  foodhandler: "food handler card servsafe food safety certificate restaurant kitchen permit",
  boating: "boat boater safety card license certificate nasbla pwc jet ski navigation buoys",
  hunter: "hunter education hunting license safety course firearm rifle shotgun bow archery ihea",
  secplus: "comptia security plus sy0-701 cybersecurity cyber security certification",
  hesi: "hesi a2 admission assessment nursing entrance exam evolve elsevier",
  asvab: "asvab afqt military army navy air force marines coast guard enlistment recruiter picat",
  cpr: "cpr aed first aid bls basic life support heartsaver red cross aha certification babysitting",
  osha: "osha 10 osha 30 outreach construction general industry safety card focus four",
  forklift: "forklift certification powered industrial truck operator license warehouse pallet jack osha",
  alcohol: "alcohol server seller certification bartender license tabc tips rbs responsible beverage service",
  accuplacer: "accuplacer college placement test community college next generation college board",
  security: "security guard card license unarmed guard officer test pre-assignment",
  lifeguard: "lifeguard certification pool waterfront red cross ymca written exam",
  pnc: "property casualty insurance license p&c producer agent exam homeowners auto commercial",
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
    const base = t.dashboardHref.replace(/\/dashboard$/, "");
    if (pathname === t.href || pathname === base || pathname.startsWith(base + "/")) return t;
  }
  return dmv;
}

export function getCatalogEntry(id: string): TestCatalogEntry | undefined {
  return TEST_CATALOG.find((t) => t.id === id);
}

// Hand-picked neighbours for tests whose hub group is too small to fill a
// "related tests" block on its own.
const RELATED_OVERRIDES: Record<string, string[]> = {
  emt: ["cna", "ccma", "phleb", "cet"],
  civics: ["dmv", "notary", "foodhandler"],
  teas: ["cna", "ccma", "phleb"],
  hesi: ["cna", "ccma", "phleb"],
  boating: ["dmv", "moto"],
  hunter: ["dmv", "moto"],
  lifeguard: ["cpr", "foodhandler", "dmv"],
  cpr: ["lifeguard", "cna", "emt"],
  asvab: ["dmv", "cpr"],
  accuplacer: ["sat", "teas", "hesi"],
  sat: ["accuplacer", "asvab", "dmv"],
};
const RELATED_FALLBACK = ["dmv", "cdl", "teas", "cna"];

/**
 * Tests to cross-link from a landing page and its footer: the rest of the
 * test's hub group, padded to at least three with a few popular tests.
 * Internal links stay inside a topical cluster (nursing, IT, driving...),
 * so new landings share authority with their neighbours instead of every
 * DMV state page carrying all thirty links.
 */
export function relatedTests(id: string, limit = 6): TestCatalogEntry[] {
  const group = TEST_GROUPS.find((g) => g.tests.some((t) => t.id === id));
  const out: TestCatalogEntry[] = group ? group.tests.filter((t) => t.id !== id) : [];
  for (const extra of [...(RELATED_OVERRIDES[id] ?? []), ...RELATED_FALLBACK]) {
    if (out.length >= 3) break;
    const entry = getCatalogEntry(extra);
    if (entry && entry.id !== id && !out.includes(entry)) out.push(entry);
  }
  return out.slice(0, limit);
}
