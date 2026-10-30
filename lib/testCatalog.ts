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
  ks2: "KS2 SATs practice for Year 6 in England: English reading, grammar, punctuation and vocabulary, arithmetic and reasoning, with short lessons before each drill and two practice tests with estimated scaled scores from 80 to 120. Free.",
  gcsemaths: "GCSE Maths Foundation tier practice for England: two sets of three practice papers (Paper 1 non-calculator, Papers 2 and 3 calculator) weighted like the real exam, plus five topic drills that teach the basics first. Free.",
  osslt: "Practice for the Ontario Secondary School Literacy Test in Grade 10: two 35-question tests on the EQAO blueprint (information paragraph, news report, dialogue, real-life narrative and 12 writing questions), plus four drills that teach the basics first. Free.",
  naplan: "NAPLAN Year 9 practice for Australia: Reading, Conventions of Language (spelling, grammar and punctuation) and Numeracy with a non-calculator section, in tailored testlets that get harder or easier like the real online test, scored against the four proficiency levels. Six drills teach the basics first. Free.",
  nswsel: "NSW Selective High School Placement Test practice for Year 6: Reading with sentences-removed and extract-matching sets, Mathematical Reasoning without a calculator and Thinking Skills, two full timed practice tests and five drills that teach the basics first. Free.",
  uksia: "Free mock exams for the SIA door supervisor licence course: the law and arrest, licensing, searching, drugs, terrorism, conflict management and physical intervention, weighted like the four unit exams.",
  uk18ed: "Free mock exams for the 18th Edition (City & Guilds 2382-26) on BS 7671:2018+A4:2026: disconnection times, RCDs, cable sizing, earthing and bonding, special locations and the appendices, weighted like the real open-book paper.",
  gcsehigher: "GCSE Maths Higher tier for England: two practice tests of three papers (Paper 1 non-calculator), weighted 30% algebra, with drills on surds, quadratics, circle theorems, vectors, histograms and tree diagrams.",
  gcsescience: "GCSE Combined Science practice for England, Foundation tier: biology, chemistry and physics in two timed practice tests, six drills split by paper 1 and paper 2 topics, short lessons on magnification, relative formula mass, balancing and physics equations, and the equation sheet. Free.",
  gcsecs: "GCSE Computer Science for AQA, OCR and Edexcel: two practice tests of two timed papers (programming and computer systems), seven topic drills with pseudocode trace questions, and step-by-step basics for binary, hex, trace tables and truth tables. Free.",
  elevenplus: "11+ practice for grammar school entry: English (comprehension, spelling, punctuation, grammar), maths and verbal reasoning in GL-style multiple choice, with two timed practice tests, six drills and short click-through lessons on hidden words, letter codes, number series and more. Free.",
  fsmaths: "Functional Skills Maths Level 2 for England: two practice papers with a non-calculator and a calculator section, real-life problems in pounds and metric units, and four topic drills that open with short lessons.",
  cscs: "Free mock tests for the CITB Health, Safety and Environment test for operatives, the test behind a CSCS card: site law, asbestos and dust, working at height, plant and the environment, with the real 45 of 50 pass mark.",
  ukfood: "Mock tests for the UK Level 2 Food Safety and Hygiene for Catering course: temperatures, the 14 allergens and Natasha's Law, hand washing, cleaning, pests and HACCP.",
  ukaplh: "Mock exams for the Level 2 Award for Personal Licence Holders in England and Wales: the Licensing Act 2003, premises licences, the DPS, TENs and underage sales, with the real 70% pass line.",
  ukfaw: "Free mock tests for the UK First Aid at Work course: CPR and AEDs, bleeding and shock, fractures and spinal injuries, burns, choking and major illness, written to the 2025 UK resuscitation guidelines.",
  ukcare: "Practice for the Care Certificate in England: all 16 standards as updated in 2025, from duty of care, person-centred care and safeguarding to dementia, learning disability and autism, and infection control.",
  capal: "Free practice for the Canadian Firearms Safety Course (CFSC) written test for the non-restricted PAL: ACTS and PROVE, actions, ammunition, safe handling, storage and transport rules and firearms law, with the 80% pass mark.",
  caelec: "Free practice for the Red Seal Construction Electrician (309A) exam: services, grounding, transformers, wiring methods, motors, drives and fire alarm, weighted like the real 100-question test.",
  eqao9: "EQAO Grade 9 Assessment of Mathematics for Ontario's MTH1W course: two adaptive practice tests of two sessions on EQAO's blueprint (algebra and coding 36%), with a calculator, the formula sheet, and drills on every strand.",
  rexpn: "REx-PN practice for practical nursing students in Ontario (RPN) and British Columbia (LPN), weighted by the REx-PN test plan: management of care, working with UCPs, consent and privacy, pharmacology and IV therapy, SI lab values and select-all-that-apply items, answered in order like the real CAT.",
  capsw: "Practice for the Ontario Personal Support Worker final exam on the 2022 program standard: the PSW role and Ontario law, consent and residents' rights, abuse reporting, infection control, daily living, medication, palliative care and dementia.",
  casfa: "Free practice tests for the written test on a Canadian Standard First Aid and CPR Level C course: CPR and AEDs for all ages, choking, bleeding, fractures, medical emergencies and burns.",
  cawhmis: "Free WHMIS practice tests for Canadian workers and students: hazard classes, the GHS pictograms, supplier and workplace labels and the 16-section safety data sheet, updated for the 2022 amendments.",
  caguard: "Ontario security guard licence test prep on the ministry training syllabus: the PSISA and Code of Conduct, citizen's arrest and trespass powers, use of force, report writing, emergency response and first aid.",
  caauto: "Free practice for the Red Seal Automotive Service Technician exam (310S in Ontario): engines, networks, driveline, electrical and HVAC, brakes and steering, restraints and hybrid and EV systems, with the real 70% pass mark.",
  caplumb: "Free practice for the Red Seal Plumber exam (306A in Ontario): DWV and venting, sewers and septic systems, water distribution and backflow, fixtures and water heaters, hydronic heating and pipe joining, with the real 70% pass mark.",
  cacarp: "Free Red Seal carpenter practice: layout, formwork, framing, exterior and interior finish, stairs and renovations, weighted like the real 100-question exam with its 70% pass mark.",
  caweld: "Free practice for the Red Seal Welder exam (456A): safety and rigging, layout and weld symbols, fabrication, cutting and gouging, and SMAW, GMAW, FCAW, GTAW and SAW, with the real 70% pass mark.",
  auwhite: "Free White Card practice for CPCWHS1001, the general construction induction course: WHS duties and rights, the hierarchy of controls, SWMS, heights, asbestos and silica, electrical, plant, signs, PPE and emergencies.",
  naplan7: "NAPLAN Year 7 practice for Australia: Reading, Conventions of Language (spelling, grammar and punctuation) and Numeracy with a non-calculator section, in tailored testlets that get harder or easier like the real online test, scored against the Year 7 proficiency levels. Six drills teach the basics first. Free.",
  ocnsw: "NSW Opportunity Class (OC) Placement Test practice for Year 4: Reading with sentences-removed, extract-matching and text comparison sets, Mathematical Reasoning without a calculator and Thinking Skills, two full timed practice tests and five drills that teach the basics first. Free.",
  vicsel: "Victorian Selective Entry High Schools exam practice for Year 8 students sitting for Year 9 entry: Mathematics and Quantitative Reasoning, Reading and Verbal Reasoning at the real 60 and 55 minutes with no calculator, two full timed practice tests and four drills that teach the basics first. Free.",
  hscmaths: "HSC Mathematics Standard 2 for Year 12 in NSW, on the new NESA syllabus first examined in 2027: two practice papers (multiple-choice Section I, short-answer Section II) with a reference sheet, and drills on annuities, loans, trigonometry, network flow, critical paths, bivariate data and the normal distribution. Free.",
  aursa: "Practice for SITHFAB021, the national Responsible Service of Alcohol unit in Australia: standard drinks, proof of age, signs of intoxication and refusing service, with state rules marked where they vary.",
  aurcg: "Mock tests for the RCG and RSG course, national unit SITHGAM022: gambling harm and its signs, odds and myths, self-exclusion, support services and incident records, with state rules marked as varying.",
  aufss: "Mock tests for the Australian food safety supervisor course: Standard 3.2.2A, the 5°C and 60°C rules, cooling and the 2-hour/4-hour rule, hygiene, cleaning, allergens and safe egg handling.",
  aufirstaid: "Free mock tests for HLTAID011 Provide First Aid, Australia's workplace first aid unit: DRSABCD, CPR and AEDs, choking, asthma and anaphylaxis, bleeding, fractures, snake bite and marine stings, written to current ARC guidelines.",
  auforklift: "Free practice for the Australian forklift licence (high risk work licence class LF, TLILIC0003): load charts and load weight calculations, pre-start checks, stability, safe operation, LPG and battery handling.",
  auwah: "Free practice tests for the knowledge assessment in RIIWHS204 Work safely at heights (formerly RIIWHS204E): the falls hierarchy, ladders, scaffolds and EWPs, harnesses and anchors, roof work and rescue.",
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
const EXAM_ORG: Record<string, string> = { caqc: "SAAQ (Quebec)", uklgv: "DVSA (UK)", auqld: "Queensland TMR", ausa: "SA Department for Infrastructure and Transport", auvic: "VicRoads, Victoria", ukadi: "DVSA, Great Britain", ukcar: "DVSA (Great Britain)", ukpcv: "DVSA (Great Britain)", cabc: "ICBC, British Columbia", aunsw: "Transport for NSW", ukmoto: "DVSA, Great Britain", caab: "Alberta registry agents · Class 7 learner's licence", caon: "Ontario MTO, DriveTest", camb: "Manitoba Public Insurance (MPI)", auwa: "WA Department of Transport and Major Infrastructure", timestables: "Primary school · Year 2 to Year 4 MTC", ks2: "Year 6 SATs · Reading, GPS, Maths", gcsemaths: "Foundation tier · AQA, Pearson Edexcel and OCR", osslt: "EQAO · Ontario Grade 10 literacy test", naplan: "ACARA · Year 9 Reading, Conventions, Numeracy", nswsel: "NSW Department of Education · Year 6 for Year 7 entry", uksia: "SIA licence-linked qualification (UK)", uk18ed: "City & Guilds 2382-26 · BS 7671:2018+A4:2026", gcsehigher: "AQA, Edexcel and OCR (England)", gcsescience: "GCSE double award · Biology, Chemistry, Physics", gcsecs: "AQA, OCR and Pearson Edexcel (England)", elevenplus: "Grammar school entry · English, maths, verbal reasoning", fsmaths: "Ofqual-regulated awarding bodies (England)", cscs: "CITB (Great Britain) · CSCS card", ukfood: "Level 2 Food Safety in Catering · RQF awarding bodies", ukaplh: "Licensing Act 2003 · England and Wales", ukfaw: "HSE First Aid at Work syllabus · Level 3", ukcare: "Skills for Care · 16 standards, England", capal: "RCMP Canadian Firearms Program · non-restricted PAL", caelec: "Red Seal interprovincial exam · provincial apprenticeship authorities", eqao9: "EQAO (Ontario) · Grade 9 MTH1W", rexpn: "NCSBN REx-PN test plan · CNO and BCCNM", capsw: "Ontario PSW program standard · NACC and college finals", casfa: "CSA Z1210 intermediate level (Canada)", cawhmis: "Health Canada HPR · WHMIS 2015 workplace training", caguard: "Ontario Ministry of the Solicitor General (PSISB)", caauto: "Red Seal interprovincial exam · 2023 RSOS, 310S", caplumb: "Red Seal interprovincial exam · 2023 RSOS, 306A", cacarp: "Red Seal interprovincial exam · 2022 RSOS, 403A", caweld: "Red Seal interprovincial exam · 2023 RSOS, 456A", auwhite: "CPCWHS1001 · general construction induction (RTO course)", ged: "High school equivalency · RLA, Math, Science, Social Studies", sat: "Digital SAT · Reading and Writing, Math", act: "Enhanced ACT · English, Math, Reading, Science", cdl: "Commercial license", cdlx: "H, air brakes, combo, N, P", moto: "Permit knowledge test", civics: "USCIS naturalization", part107: "FAA drone pilot", ham: "FCC Technician practice", epa608: "EPA Section 608 practice", cna: "Nurse aide written exam", ptcb: "Pharmacy technician certification", phleb: "Phlebotomy certification practice", ccma: "NHA medical assistant exam", cet: "NHA EKG technician exam", danb: "DANB CDA: GC, RHS, ICE", emt: "NREMT cognitive exam", paramedic: "NREMT Paramedic exam", foodmgr: "Food-protection manager practice", realestate: "National portion, Pearson VUE and PSI", insurance: "Life, accident & health producer exam", notary: "Notary practice; state requirements vary", teas: "Nursing & allied health admissions", aws: "AWS CLF-C02", aplus: "CompTIA 220-1201 / 220-1202", foodhandler: "Supplemental food-safety practice", boating: "NASBLA state boater exams", hunter: "IHEA state hunter education exams", secplus: "CompTIA SY0-701", hesi: "Nursing school admissions", nclex: "NCSBN 2026 RN test plan", nclexpn: "NCSBN 2026 PN test plan", asvab: "Military aptitude practice", cpr: "Lay rescuer & healthcare BLS courses", osha: "OSHA Outreach course final", forklift: "OSHA 1910.178 operator evaluation", alcohol: "Supplemental alcohol-service practice", accuplacer: "College placement", security: "State guard card exams", lifeguard: "Certification written exam", pnc: "P&C producer exam, general portion", cosmetology: "NIC national theory exam; a few states use their own", vtne: "AAVSB vet tech credentialing exam", naplan7: "ACARA · Year 7 Reading, Conventions, Numeracy", ocnsw: "NSW Department of Education · Year 4 for Year 5 OC entry", vicsel: "Victorian Department of Education · Year 8 for Year 9 entry", hscmaths: "NESA (NSW) · Year 12 HSC", aursa: "SITHFAB021 · national RSA unit, Australia", aurcg: "SITHGAM022 · RCG / RSG, all states", aufss: "SITXFSA005 + SITXFSA006 · FSANZ Standard 3.2.2A", aufirstaid: "HLTAID011 · Australian Resuscitation Council guidelines", auforklift: "TLILIC0003 · high risk work licence LF, Australia", auwah: "RIIWHS204 (formerly RIIWHS204E), nationally recognised unit" };

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
  { title: "UK school tests", ids: ["timestables", "ks2", "elevenplus", "gcsemaths", "gcsehigher", "gcsescience", "gcsecs", "fsmaths"] },
  { title: "UK workplace and trade certificates", ids: ["cscs", "uk18ed", "uksia", "ukaplh", "ukfood", "ukfaw", "ukcare"] },
  { title: "Canada driving tests", ids: ["caon", "caqc", "cabc", "caab", "camb"] },
  { title: "Canada school tests", ids: ["osslt", "eqao9"] },
  { title: "Canada healthcare and first aid", ids: ["rexpn", "capsw", "casfa"] },
  { title: "Canada trades and workplace certificates", ids: ["caelec", "caplumb", "cacarp", "caweld", "caauto", "cawhmis", "caguard", "capal"] },
  { title: "Australia learner driver tests", ids: ["aunsw", "auvic", "auqld", "auwa", "ausa"] },
  { title: "Australia school tests", ids: ["ocnsw", "nswsel", "naplan7", "naplan", "vicsel", "hscmaths"] },
  { title: "Australia work certificates", ids: ["auwhite", "auwah", "auforklift", "aufirstaid", "aufss", "aursa", "aurcg"] },
  { title: "Citizenship", ids: ["civics"] },
  { title: "Outdoor & recreation licenses", ids: ["boating", "hunter", "lifeguard"] },
  { title: "Workplace & job certifications", ids: ["foodhandler", "osha", "forklift", "alcohol", "security", "cosmetology"] },
  { title: "Aviation, radio & trade licenses", ids: ["part107", "ham", "epa608", "foodmgr"] },
  { title: "Real estate, insurance & notary licenses", ids: ["realestate", "insurance", "pnc", "notary"] },
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
  ks2: "ks2 sats year 6 sats key stage 2 tests national curriculum tests spag gps grammar punctuation spelling reading test arithmetic reasoning scaled score primary school england",
  gcsemaths: "gcse maths math mathematics foundation tier practice paper past paper mock exam revision resit grade 4 grade 5 non calculator calculator aqa edexcel ocr year 10 year 11 ks4 key stage 4 england uk",
  osslt: "osslt ontario literacy test ontario secondary school literacy test eqao grade 10 literacy osslc literacy course ossd graduation requirement reading writing high school ontario canada",
  naplan: "naplan year 9 year nine acara national assessment program literacy numeracy naplan online reading conventions of language spelling grammar punctuation numeracy australia high school secondary practice test",
  nswsel: "nsw selective test selective school test selective high school placement test shs year 6 year 7 entry thinking skills mathematical reasoning reading opportunity class oc test trial test sydney new south wales australia scholarship coaching",
  uksia: "sia door supervisor licence badge bouncer doorman door staff security industry authority level 2 award ds course mock exam conflict management physical intervention nightclub pub security uk",
  uk18ed: "18th edition wiring regulations bs7671 bs 7671 iet regs city and guilds 2382 2382-26 2382-22 amendment 4 a4 2026 electrician exam wiring regs mock open book electrical installation uk",
  gcsehigher: "gcse maths higher tier higher paper year 10 year 11 grade 7 grade 8 grade 9 aqa edexcel ocr non calculator calculator paper 1 paper 2 paper 3 surds quadratics circle theorems mock exam revision uk england",
  gcsescience: "gcse combined science trilogy double award gcse science gcse biology gcse chemistry gcse physics foundation tier year 10 year 11 ks4 key stage 4 required practicals science revision mock aqa edexcel ocr",
  gcsecs: "gcse computer science computing cs year 10 year 11 aqa 8525 ocr j277 edexcel 1cp2 paper 1 paper 2 pseudocode trace tables binary hexadecimal algorithms programming networks cyber security mock exam revision uk england",
  elevenplus: "11+ 11 plus eleven plus 11plus grammar school entrance exam selective school test gl gl-style kent test verbal reasoning vr english comprehension spag maths year 5 year 6 ks2 key stage 2 practice papers uk england northern ireland",
  fsmaths: "functional skills maths level 2 fs maths l2 functional maths adult maths apprenticeship maths gcse equivalent grade 4 non calculator calculator mock exam pearson edexcel city and guilds ncfe highfield open awards uk england college",
  cscs: "cscs card test citb hse hs&e health safety environment test operatives green card labourer construction site uk mock test touch screen",
  ukfood: "level 2 food hygiene certificate food safety and hygiene for catering level 2 award food handler uk food hygiene course food safety certificate kitchen chef catering fsa haccp allergens natashas law",
  ukaplh: "personal licence aplh award for personal licence holders licensing act 2003 dps designated premises supervisor ten temporary event notice pub bar licence alcohol licence uk england wales level 2 bar manager",
  ukfaw: "first aid at work faw efaw emergency first aid at work level 3 award first aider workplace first aid hse 3 day course requalification cpr aed resuscitation council uk drsabcd recovery position",
  ukcare: "care certificate care cert 16 standards skills for care induction care worker carer healthcare assistant hca support worker social care adult social care certificate level 2 nhs england",
  capal: "pal pal test pal exam cfsc canadian firearms safety course firearms licence possession and acquisition licence gun licence canada rcmp non-restricted acts prove hunting rifle shotgun",
  caelec: "red seal electrician 309a construction electrician interprovincial exam ip exam journeyperson certificate of qualification c of q canadian electrical code cec apprentice electrician canada ontario alberta bc electrical exam",
  eqao9: "eqao grade 9 math mathematics assessment ontario mth1w de-streamed destreamed grade nine high school secondary coding python linear relations financial literacy sample test practice canada",
  rexpn: "rex pn rexpn rpn lpn registered practical nurse licensed practical nurse practical nursing exam canada ontario cno british columbia bccnm regulatory exam practical nurse cpnre nclex pn canada sata",
  capsw: "psw personal support worker ontario nacc psw exam psw final exam psw certificate health care aide home support worker long term care ltc fltca hscpoa canada",
  casfa: "standard first aid sfa cpr c level c cpr-c aed intermediate first aid csa z1210 workplace first aid canada canadian ontario alberta bc quiz written test recertification",
  cawhmis: "whmis 2015 whmis quiz whmis symbols pictograms ghs sds msds safety data sheet hazardous products regulations workplace label canada ontario alberta bc co-op student new hire chemical safety ccohs",
  caguard: "ontario security guard test security licence ontario psisa guard card canada 40 hour security course serco ministry test security guard exam ontario private security",
  caauto: "red seal auto mechanic automotive technician 310s interprovincial exam journeyperson certificate of qualification ontario alberta bc canada apprentice licensed mechanic car mechanic",
  caplumb: "red seal plumber plumbing exam 306a interprovincial journeyperson certificate of qualification national plumbing code npc ontario alberta bc canada apprentice licensed plumber",
  cacarp: "red seal carpenter 403a carpentry journeyperson journeyman interprovincial ip exam apprentice ticket certificate of qualification canada framing formwork national building code part 9 trades",
  caweld: "red seal welder welding 456a journeyperson interprovincial exam certificate of qualification smaw gmaw fcaw gtaw tig mig stick flux core cwb canada apprentice",
  auwhite: "white card whitecard construction induction card general construction induction training gcit cpcwhs1001 cpccwhs1001 ohs card green card construction safety australia building site worksafe safework",
  naplan7: "naplan year 7 year seven acara national assessment program literacy numeracy naplan online reading conventions of language spelling grammar punctuation numeracy australia high school secondary first year practice test",
  ocnsw: "oc test opportunity class placement test oc placement test year 4 year 5 gifted class thinking skills mathematical reasoning reading oc trial test sydney new south wales nsw australia coaching",
  vicsel: "victorian selective entry exam selective entry high schools sehs vic selective school test year 8 year 9 entry nossal suzanne cory mac.robertson macrob melbourne high quantitative reasoning verbal reasoning acer victoria melbourne australia scholarship coaching",
  hscmaths: "hsc maths standard 2 mathematics standard two year 12 nsw nesa trial paper hsc exam past paper revision standard maths general maths annuities loans depreciation network flow critical path bivariate normal distribution z score australia",
  aursa: "rsa responsible service of alcohol sithfab021 sithfab002 rsa certificate rsa course rsa quiz rsa answers bar staff bartender bottle shop liquor licence nsw victoria queensland wa sa tasmania act nt australia competency card",
  aurcg: "rcg rsg responsible conduct of gambling responsible service of gambling sithgam022 sithgam001 gaming licence pokies gaming room attendant club hotel pub casino keno tab australia nsw vic qld competency card",
  aufss: "food safety supervisor fss certificate course australia nsw sitxfsa005 sitxfsa006 standard 3.2.2a food handler training food safety supervision skill set fsanz 2 hour 4 hour rule cafe restaurant kitchen",
  aufirstaid: "hltaid011 provide first aid hltaid009 hltaid010 cpr first aid certificate australia first aid course quiz arc anzcor drsabcd triple zero 000 snake bite pressure immobilisation jellyfish vinegar asthma 4x4x4 workplace first aider",
  auforklift: "forklift licence australia lf licence high risk work licence hrwl tlilic0003 tlilic2001 forklift ticket forklift theory test load chart data plate safework nsw worksafe victoria workplace health and safety queensland worksafe wa warehouse",
  auwah: "working at heights work safely at heights wah riiwhs204e riiwhs204 riiwhs204d heights ticket height safety fall protection harness ladder scaffold ewp white card construction australia rto refresher quiz",
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
  timestables: ["ks2", "sat", "act", "ged"],
  ks2: ["timestables", "gcsemaths", "naplan"],
  gcsemaths: ["ged", "accuplacer", "sat"],
  uksia: ["security", "alcohol", "cpr"],
  uk18ed: ["caelec", "uksia", "epa608"],
  osslt: ["ged", "sat", "caon"],
  capal: ["hunter", "boating", "caon"],
  caelec: ["uk18ed", "osha", "forklift"],
  eqao9: ["gcsehigher", "sat", "ged"],
  rexpn: ["nclexpn", "nclex", "cna"],
  capsw: ["cna", "ukcare", "nclexpn"],
  casfa: ["cpr", "ukfaw", "lifeguard"],
  naplan: ["ks2", "sat", "act"],
  nswsel: ["naplan", "ks2", "sat"],
  auwhite: ["osha", "forklift", "cpr"],
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
