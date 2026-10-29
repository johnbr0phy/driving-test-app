import { EXAMS, ExamConfig, examLandingPath, examLanguages } from "./exams";
import type { Language } from "@/i18n";
import { EXAMS_V2 } from "./v2/registry";
import { BANK_SIZES } from "./v2/bankSizes";
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
  /**
   * Price label on the hub card, e.g. "2 free, 2 premium". Undefined means
   * the whole test is free, which is every exam except the DMV.
   */
  pricing?: string;
  /** Languages the test can be taken in, English first. */
  languages: Language[];
}

const dmv: TestCatalogEntry = {
  id: "dmv",
  shortName: "DMV",
  name: "DMV Permit Test",
  org: "All 50 states + DC",
  blurb: "State-specific permit and driver's license knowledge tests. Signs, rules of the road, safety and your state's laws.",
  href: "/dmv-practice-test",
  dashboardHref: "/dmv/dashboard",
  questions: 200,
  icon: "car",
  // Tests 1-2 and training sets 1-2 are free; 3-4 need the one-time premium
  // unlock (app/dashboard/page.tsx), so this card cannot say plain "Free".
  pricing: "2 free, 2 premium",
  // Spanish for every state; Vietnamese, Korean and Chinese for selected states.
  languages: ["en", "es", "vi", "ko", "zh"],
};

const EXAM_BLURBS: Record<string, string> = {
  caqc: "Quebec's Class 5 knowledge test: the Highway Safety Code, road signs and safe driving behaviours, with 75% needed on each part.",
  uklgv: "Practise for the UK lorry (LGV/HGV) theory test: drivers' hours, tachographs, air brakes, load security, weights and dimensions, and signs, with an 85% pass line like the real test.",
  auqld: "Queensland's written road rules test for a car learner licence: giving way, L and P plate rules, demerit points, signs and safe driving.",
  ausa: "Practise for the South Australia learner's theory test with 200 questions from The Driver's Handbook: giving way, school zones, trams, L and P plate rules, demerits and BAC.",
  auvic: "Victoria's learner permit knowledge test: give way rules, speed limits, signs, alcohol limits and the P plate rules from Road to Solo Driving.",
  ukadi: "Practice for the DVSA ADI part 1 theory test with 200 original questions across all four bands, from road procedure to instructional techniques.",
  ukcar: "Free mock tests for the multiple-choice part of the UK car theory test: the Highway Code, road signs, motorways and hazards, with the real 43 of 50 pass mark.",
  ukpcv: "Free UK bus and coach (PCV) theory practice: drivers' hours, tachographs, passengers, brakes, the road and signs, with the real 85% pass mark.",
  cabc: "Free ICBC knowledge test practice for your B.C. learner's licence: 200 questions from Learn to Drive Smart, with 40 of 50 to pass like the real test.",
  aunsw: "Practice for the NSW Driver Knowledge Test with 200 questions from the Road User Handbook: P plate rules, speed limits, BAC, giving way, roundabouts, parking and more.",
  ukmoto: "The multiple-choice part of the DVSA motorcycle theory test: Highway Code rules, signs, riding skills and your licence, 43 of 50 to pass.",
  caab: "Alberta Class 7 learner's licence knowledge test prep from the 2026 Driver's Guide: signs, signals, right-of-way, GDL rules, demerits and impaired driving.",
  caon: "Ontario's G1 knowledge test: road signs, traffic lights, right-of-way, graduated licensing, demerit points and safe driving, from the Official MTO Driver's Handbook.",
  camb: "Free Manitoba Class 5 learner knowledge test practice: 200 questions from the MPI Driver's Handbook on signs, right-of-way, GDL rules, winter driving and impaired driving.",
  auwa: "Practise for the Western Australia learner's permit theory test with 200 questions from the Drive Safe handbook: give way, roundabouts, P plates, demerits and BAC.",
  cdl: "600 questions on the CDL general knowledge exam. Six blueprint-weighted tests and six training sets by topic.",
  cdlx: "Five CDL endorsement tests in one place: HazMat, air brakes, combination vehicles, tank vehicles and passenger transport, from the FMCSA manual.",
  moto: "Motorcycle permit knowledge test, based on the MSF manual nearly every state uses. Gear, control, positioning, hazards and alcohol.",
  part107: "FAA remote pilot (drone) knowledge test. Regulations, airspace and charts, weather, loading and performance, operations.",
  ham: "Technician-class amateur-radio practice with explanations. Text-only coverage; figure questions are not included.",
  epa608: "EPA Section 608 practice for Core and Types I, II and III. Passing requirements depend on the exam format.",
  civics: "200 multiple-choice study items based on the 2025 USCIS civics list. Prepare your own local answers before the oral interview.",
  cna: "Nurse aide written exam on the NNAAP outline: daily living, basic nursing skills, psychosocial care and the role of the aide.",
  ptcb: "PTCB pharmacy technician certification exam. Medications, patient safety, order entry math and federal law, on the 2026 PTCE outline.",
  phleb: "Phlebotomy practice on collection, safety and specimen handling. Cross-provider exam coverage has not been verified; use your certification provider’s current outline.",
  ccma: "NHA clinical medical assistant exam. Vitals, patient care, infection control, lab, phlebotomy, EKG, admin, communication and law, on the CCMA test plan.",
  cet: "NHA certified EKG technician exam. Lead placement, artifacts, Holter and stress testing, patient safety, and rhythm analysis, on the CET test plan.",
  asvab: "Fixed ASVAB practice with eight timed sections and topic drills. Auto and Shop are combined; Assembling Objects is not included.",
  cpr: "CPR, AED and first aid certification written exam prep on current resuscitation guidelines: chain of survival, adult, child and infant CPR, AED use, choking, bleeding, shock, burns and more.",
  osha: "OSHA 10 Outreach course final exam prep for construction and general industry: worker rights, fall protection, electrical, struck-by and caught-in, hazard communication, PPE and health hazards.",
  forklift: "Forklift operator certification written test on OSHA 1910.178: stability triangle, load capacity, pre-shift inspection, safe travel, pedestrians, docks and ramps.",
  alcohol: "Supplemental alcohol-service practice on intoxication, identification and refusing service. Check whether your jurisdiction requires approved training or a specific exam.",
  accuplacer: "Next-Generation ACCUPLACER placement practice: untimed sections scored 200 to 300 for reading, writing, arithmetic, quantitative reasoning and advanced algebra, plus drills.",
  security: "Unarmed security guard license (guard card) exam prep: legal powers and use of force, observation and patrol, access control, report writing, emergency response and terrorism awareness.",
  lifeguard: "Lifeguard certification written exam prep: scanning and surveillance, recognizing drowning, water rescues and spinal injury care, first aid, CPR and AED, facility safety.",
  pnc: "Property and casualty insurance license exam, general portion. Insurance basics, policy provisions, homeowners and dwelling forms, personal auto, commercial lines, flood and surety.",
  cosmetology: "Cosmetology state board theory prep on the NIC outline only (110 items, 90 minutes). Infection control, anatomy, chemistry, haircutting and styling, perms and relaxers, haircolor, skin care and nail care. PSI states use a different outline.",
  vtne: "Veterinary Technician National Examination (VTNE) prep weighted to the AAVSB outline: animal care and nursing, pharmacology and dose math, surgical nursing, anesthesia, lab procedures, imaging, dentistry, emergency care and client communication.",
  nclex: "NCLEX-RN licensure exam practice weighted by the 2026 NCSBN test plan: prioritization, delegation, pharmacology, labs and select-all-that-apply items, answered in order like the real CAT.",
  nclexpn: "NCLEX-PN licensure exam practice for LPN/LVN students, weighted by the 2026 NCSBN PN test plan: coordinated care, assigning tasks to AP, when to notify the RN, pharmacology, data collection and select-all-that-apply items, answered in order like the real CAT.",
  hesi: "HESI A2 nursing entrance exam with seven timed sections scored like the real report: math with dosage conversions, reading passages, vocabulary, grammar, biology, chemistry and anatomy and physiology.",
  timestables: "Times tables for primary school in England, from the 2s, 5s and 10s up to 12 × 12, in national curriculum order: short lessons with a trick for each table, drills, dividing, word problems and four 25-question checks like the Year 4 Multiplication Tables Check. Free.",
  ged: "Two full-length GED practice tests covering all four subjects: Reasoning Through Language Arts, Math, Science and Social Studies, timed like the real test and scored per subject, plus six drills that teach the basics first. Free.",
  sat: "Two full-length digital SAT practice tests: two timed sections with adaptive modules, a calculator, and a 400 to 1600 score estimate, plus skill drills built for your phone.",
  act: "Two full-length ACT practice tests in the enhanced 2025 format: English, Math, Reading and Science with real passages and timing, scored 1 to 36 with a composite, plus drills for your phone.",
  secplus: "CompTIA Security+ SY0-701. General security concepts, threats and vulnerabilities, architecture, operations, and program management, in CompTIA's scenario style.",
  hunter: "Hunter education (hunter safety) exam prep on the IHEA standards: firearm safety and carries, ammunition, shot placement, tree stands, wildlife identification, conservation, ethics and survival.",
  boating: "Boating license (boater safety card) exam prep on the NASBLA standards: navigation rules, buoys, lights and sound signals, required equipment, safe operation, emergencies.",
  foodhandler: "Food-safety practice on hygiene, cross-contamination, allergens, temperatures and sanitizing. Check your local authority’s accepted course and card requirements.",
  aplus: "CompTIA A+ Core 1 (220-1201) and Core 2 (220-1202). Hardware, networking, mobile, cloud, operating systems, security, troubleshooting and operational procedures.",
  aws: "AWS Certified Cloud Practitioner (CLF-C02). Cloud concepts, the shared responsibility model, IAM and security services, core services, pricing and support plans.",
  teas: "ATI TEAS 7 nursing school entrance exam as a full-length timed test with four sections and percent scores, plus drills for reading, math, science and English.",
  notary: "Notary public practice on procedures, identification, journals, seals, ethics and liability. Commissioning rules and exam requirements depend on your state.",
  insurance: "Life and health insurance license exam, general portion. Insurance concepts, life policies and provisions, annuities and taxation, health provisions and policy types.",
  realestate: "Real estate salesperson national exam on the Pearson VUE and PSI outlines. Property, ownership, contracts, agency, practice, disclosures, financing and math.",
  foodmgr: "Food-protection manager practice on food safety, temperatures, hygiene, sanitizing and HACCP. Confirm your certification provider and local credential requirements.",
  emt: "NREMT EMT cognitive exam on the 2025 test plan. Scene size-up, primary and secondary assessment, treatment and transport, and operations.",
  paramedic: "NREMT Paramedic certification exam on the 2024 test plan. Airway, cardiology and resuscitation, trauma, medical, obstetrics and gynecology, EMS operations and clinical judgment.",
  danb: "DANB Certified Dental Assistant: General Chairside, Radiation Health and Safety, and Infection Control in one place, on the current DANB outlines.",
  htl: "ASCP histotechnologist and histotechnician certification. Fixation, processing, embedding, microtomy, staining and lab operations.",
  cst: "NBSTSA surgical technologist certification. Preoperative, intraoperative and postoperative care, sterilization, anatomy, microbiology and pharmacology.",
  crcst: "Sterile-processing practice on decontamination, packaging, sterilization and storage. HSPA CRCST and CBSPD CSPDT have separate exam and eligibility requirements.",
};

// Short issuing-body line for menus; defaults to the exam label.
const EXAM_ORG: Record<string, string> = { caqc: "SAAQ (Quebec)", uklgv: "DVSA (UK)", auqld: "Queensland TMR", ausa: "SA Department for Infrastructure and Transport", auvic: "VicRoads, Victoria", ukadi: "DVSA, Great Britain", ukcar: "DVSA (Great Britain)", ukpcv: "DVSA (Great Britain)", cabc: "ICBC, British Columbia", aunsw: "Transport for NSW", ukmoto: "DVSA, Great Britain", caab: "Alberta registry agents · Class 7 learner's licence", caon: "Ontario MTO, DriveTest", camb: "Manitoba Public Insurance (MPI)", auwa: "WA Department of Transport and Major Infrastructure", timestables: "Primary school · Year 2 to Year 4 MTC", ged: "High school equivalency · RLA, Math, Science, Social Studies", sat: "Digital SAT · Reading and Writing, Math", act: "Enhanced ACT · English, Math, Reading, Science", cdl: "Commercial license", cdlx: "H, air brakes, combo, N, P", moto: "Permit knowledge test", civics: "USCIS naturalization", part107: "FAA drone pilot", ham: "FCC Technician practice", epa608: "EPA Section 608 practice", cna: "Nurse aide written exam", ptcb: "Pharmacy technician certification", phleb: "Phlebotomy certification practice", ccma: "NHA medical assistant exam", cet: "NHA EKG technician exam", danb: "DANB CDA: GC, RHS, ICE", emt: "NREMT cognitive exam", paramedic: "NREMT Paramedic exam", foodmgr: "Food-protection manager practice", realestate: "National portion, Pearson VUE and PSI", insurance: "Life, accident & health producer exam", notary: "Notary practice; state requirements vary", teas: "Nursing & allied health admissions", aws: "AWS CLF-C02", aplus: "CompTIA 220-1201 / 220-1202", foodhandler: "Supplemental food-safety practice", boating: "NASBLA state boater exams", hunter: "IHEA state hunter education exams", secplus: "CompTIA SY0-701", hesi: "Nursing school admissions", nclex: "NCSBN 2026 RN test plan", nclexpn: "NCSBN 2026 PN test plan", asvab: "Military aptitude practice", cpr: "Lay rescuer & healthcare BLS courses", osha: "OSHA Outreach course final", forklift: "OSHA 1910.178 operator evaluation", alcohol: "Supplemental alcohol-service practice", accuplacer: "College placement", security: "State guard card exams", lifeguard: "Certification written exam", pnc: "P&C producer exam, general portion", cosmetology: "NIC national theory exam; a few states use their own", vtne: "AAVSB vet tech credentialing exam" };

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
  languages: examLanguages(exam),
});

// v2 exams (sectioned, timed, scaled scores) live outside the v1 registry.
const v2Entry = (exam: ExamV2Config): TestCatalogEntry => ({
  id: exam.id,
  shortName: exam.shortName,
  name: exam.name,
  org: EXAM_ORG[exam.id] ?? exam.fullName,
  blurb: EXAM_BLURBS[exam.id] ?? exam.tagline,
  href: exam.landingPath,
  dashboardHref: `${exam.slug}/dashboard`,
  questions: BANK_SIZES[exam.id] ?? 0,
  icon: exam.icon as TestCatalogEntry["icon"],
  theme: exam.id,
  languages: ["en"],
  // Exams with a Premium tier say so on their hub card; the rest read "Free".
  ...(exam.premium
    ? { pricing: `${exam.tests.length - exam.premium.lockedTests.length} free, ${exam.premium.lockedTests.length} premium` }
    : {}),
});

export const TEST_CATALOG: TestCatalogEntry[] = [dmv, ...EXAMS_V2.map(v2Entry), ...EXAMS.map(examEntry)];

/** Hub groupings, in display order. Anything not listed falls into "Other exams". */
const GROUPS: { title: string; ids: string[] }[] = [
  { title: "Driving tests", ids: ["dmv", "cdl", "cdlx", "moto"] },
  { title: "UK driving and instructor theory tests", ids: ["ukcar", "ukmoto", "uklgv", "ukpcv", "ukadi"] },
  { title: "Canada driving tests", ids: ["caon", "caqc", "cabc", "caab", "camb"] },
  { title: "Australia learner driver tests", ids: ["aunsw", "auvic", "auqld", "auwa", "ausa"] },
  { title: "Citizenship", ids: ["civics"] },
  { title: "Outdoor & recreation licenses", ids: ["boating", "hunter", "lifeguard"] },
  { title: "Workplace & job certifications", ids: ["foodhandler", "osha", "forklift", "alcohol", "security", "cosmetology"] },
  { title: "Aviation, radio & trade licenses", ids: ["part107", "ham", "epa608", "foodmgr"] },
  { title: "Real estate, insurance & notary licenses", ids: ["realestate", "insurance", "pnc", "notary"] },
  { title: "Primary school", ids: ["timestables"] },
  { title: "GED, college, military & nursing school entrance", ids: ["ged", "sat", "act", "accuplacer", "asvab", "teas", "hesi"] },
  { title: "IT certifications", ids: ["aplus", "secplus", "aws"] },
  { title: "Emergency services", ids: ["emt", "paramedic", "cpr"] },
  { title: "Healthcare certification exams", ids: ["nclex", "nclexpn", "cna", "ccma", "ptcb", "phleb", "cet", "danb", "htl", "cst", "crcst", "vtne"] },
];
export const TEST_GROUPS: { title: string; tests: TestCatalogEntry[] }[] = [
  ...GROUPS.map((g) => ({ title: g.title, tests: TEST_CATALOG.filter((t) => g.ids.includes(t.id)) })),
  { title: "Other exams", tests: TEST_CATALOG.filter((t) => !GROUPS.some((g) => g.ids.includes(t.id))) },
].filter((g) => g.tests.length > 0);

/** Extra words people type that do not appear in the name, org or blurb. */
const SEARCH_ALIASES: Record<string, string> = {
  caqc: "saaq quebec québec class 5 classe 5 knowledge test examen théorique learner licence permis apprenti probationary driving test montreal canada",
  uklgv: "lgv hgv lorry truck theory test uk dvsa driver cpc part 1 cat c c1 ce class 1 class 2 drivers hours tachograph",
  auqld: "queensland qld learner licence learners permit road rules test prepl l plates australia driving test dkt your keys to driving tmr brisbane gold coast",
  ausa: "sa learners test south australia learner's theory test adelaide drivers handbook myls service sa l plates p plates give way road rules ltt australia",
  auvic: "vicroads learners test ls learner permit victoria vic melbourne australia road to solo driving knowledge test l plates",
  ukadi: "adi part 1 adi theory test driving instructor theory dvsa approved driving instructor uk instructor test part one pdi",
  ukcar: "uk theory test driving theory dvsa highway code mock test car theory british england scotland wales learner provisional",
  ukpcv: "pcv bus coach theory test uk dvsa driver cpc part 1 psv minibus d1 category d licence bus driver tachograph drivers hours highway code",
  cabc: "icbc bc british columbia learners licence learner's permit class 7 7l knowledge test learn to drive smart canada driving test l n glp",
  aunsw: "nsw dkt driver knowledge test learner licence l plates learners permit australia sydney new south wales road user handbook rta myrta service nsw",
  ukmoto: "uk motorcycle theory test motorbike moped dvsa cbt highway code britain england scotland wales a1 a2 bike theory",
  caab: "alberta class 7 learners licence learner's permit knowledge test ab drivers test written test registry calgary edmonton gdl canada",
  caon: "ontario g1 g1 test g1 knowledge test g1 practice test mto drivetest ontario driver's licence ontario drivers test canada learner permit g2 written test",
  camb: "manitoba mpi class 5 5l learner knowledge test permit driving test winnipeg brandon autopac driver handbook gdl canada",
  auwa: "wa learners permit theory test western australia perth drive safe handbook l plates p plates road rules dot dvs computerised theory test ctt australia",
  dmv: "driver license permit learners written knowledge road signs state",
  timestables: "times tables multiplication tables check mtc year 2 year 3 year 4 ks1 ks2 key stage maths math kids children primary school multiplication division",
  ged: "ged hiset high school equivalency diploma adult education tasc high school equivalency test ged math ged rla ged science ged social studies",
  sat: "digital sat psat college board college admissions high school reading writing math bluebook",
  act: "act test college admissions high school english math reading science composite enhanced act",
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
  emt: "emergency medical technician ambulance nremt",
  paramedic: "nremt paramedic nrp medic als advanced life support ambulance acls cardiac rhythms rsi drug math",
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
  nclex: "nclex rn registered nurse board exam licensure ngn next generation sata select all that apply ncsbn nursing boards",
  nclexpn: "nclex pn lpn lvn practical nurse vocational nurse board exam licensure ngn next generation sata select all that apply ncsbn nursing boards",
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
  cosmetology: "cosmetology cosmo beauty school state board NIC theory esthetics esthetician barber hair stylist nails nail tech salon",
  vtne: "vtne vet tech veterinary technician veterinary nurse aavsb lvt rvt cvt credentialed technician",
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

/**
 * Our biggest tests, pinned above the categories on the /tests hub and the
 * header switcher when browsing. They still appear in their own category too,
 * and relatedTests() ignores this group so cross-links stay topical.
 */
const POPULAR_IDS = ["dmv", "sat", "act"];
const POPULAR_GROUP = {
  title: "Most popular",
  tests: POPULAR_IDS.map(getCatalogEntry).filter((t): t is TestCatalogEntry => !!t),
};

/** TEST_GROUPS narrowed to a query, dropping empty groups. Browsing (no query) leads with the popular tests. */
export function searchTestGroups(query: string) {
  if (!query.trim()) return [POPULAR_GROUP, ...TEST_GROUPS];
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
  emt: ["paramedic", "cna", "ccma", "phleb", "cet"],
  paramedic: ["nclex", "cna", "cet"],
  civics: ["dmv", "notary", "foodhandler"],
  teas: ["cna", "ccma", "phleb"],
  hesi: ["cna", "ccma", "phleb"],
  boating: ["dmv", "moto"],
  hunter: ["dmv", "moto"],
  lifeguard: ["cpr", "foodhandler", "dmv"],
  cpr: ["lifeguard", "cna", "emt", "paramedic"],
  asvab: ["dmv", "cpr"],
  accuplacer: ["sat", "teas", "hesi"],
  ged: ["asvab", "accuplacer", "teas"],
  timestables: ["sat", "act", "ged"],
  cosmetology: ["cpr", "foodhandler", "osha"],
  vtne: ["phleb", "cna", "ptcb"],
  sat: ["act", "accuplacer", "asvab"],
  act: ["sat", "accuplacer", "asvab"],
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
