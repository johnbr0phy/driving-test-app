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
  uklitu: "Eight real-length mock tests for the Life in the UK test: British values, history, culture, government and the law, all from the official handbook.",
  cacit: "20-question practice tests for the Canadian citizenship test, written from Discover Canada: rights, history, government, elections, symbols and every provincial capital.",
  aucit: "Practice for the Australian citizenship test from Our Common Bond: eight 20-question mock tests with five values questions each, and a values set to get all five right.",
  gulfrn: "Practice for the Gulf registered nurse licensing exams (DHA, DOH, MOHAP, SCFHS, Qatar, Oman, Kuwait, Bahrain): fundamentals, med-surg, maternity, pediatrics, dosage and leadership.",
  awssaa: "AWS Certified Solutions Architect - Associate (SAA-C03). Scenario questions on secure, resilient, high-performing and cost-optimized architectures: IAM and Organizations, VPC security, KMS, SQS and EventBridge, Multi-AZ and DR, storage and database choices, and Savings Plans and Spot.",
  az900: "Microsoft Azure Fundamentals (AZ-900). Cloud models and service types, regions and availability zones, compute, networking and storage, Microsoft Entra ID and Zero Trust, cost management, Azure Policy, resource locks and Azure Monitor.",
  ccna: "Cisco CCNA 200-301. Subnetting and IPv6, VLANs, trunks and spanning tree, routing tables, static routes and OSPF, NAT and IP services, ACLs and Layer 2 security, and automation, with router and switch output.",
  inrto: "Mock tests for India's RTO learner's licence (LL) test: mandatory, cautionary and informatory road signs, hand signals, keep left and overtaking rules, helmets, seat belts, PUC and insurance.",
  pmp: "PMI Project Management Professional on the July 2026 outline. Situational questions on leading teams, stakeholders, planning, schedule and earned value, procurement, governance, compliance and risk, across predictive, agile and hybrid projects.",
  uknmc: "NMC CBT practice for internationally educated nurses joining the UK register: Part A numeracy with typed answers and a calculator, and Part B clinical questions on the NMC Code, NEWS2, the Mental Capacity Act, safeguarding and safe UK care, weighted by the seven platforms.",
  nasm: "Four 50-question mock tests for the NASM Certified Personal Trainer exam: the OPT model, assessments, program design, exercise technique and client coaching.",
  rbt: "BACB Registered Behavior Technician exam on the 3rd edition outline: measurement and graphing, preference and functional assessment, teaching procedures, behavior reduction, documentation and ethics.",
  cpc: "AAPC Certified Professional Coder exam. Coding guidelines, modifiers, ICD-10-CM, HCPCS, every CPT surgery series, E/M, anesthesia and coding cases, weighted like the real 100 questions.",
  jelec: "Four 50-question mock tests for the journeyman electrician exam on the 2023 NEC: grounding, wiring methods, load calculations, services, motors and theory.",
  barber: "Barber state board theory prep on the NIC outline: infection control, anatomy, clippers and razors, haircutting and fades, color and relaxers, shaves and facials.",
  ffi: "Firefighter I written exam prep on the NFPA 1010 job performance requirements: safety and incident command, fire behavior, building construction, SCBA, ladders, ropes, forcible entry, search, ventilation, hose, water supply and fire attack.",
  police: "Police officer written exam prep: reading comprehension, grammar and spelling, incident report writing, math, situational judgment and reasoning, the skills every agency's entrance test checks.",
  sie: "FINRA Securities Industry Essentials exam on the current content outline. Capital markets, stocks and bonds, funds and options, trading, customer accounts, prohibited activities and regulation.",
  series7: "FINRA Series 7 practice on the current outline: options strategies, municipal and corporate bonds, equities, funds and annuities, suitability and Reg BI, margin and trading, with every calculation explained.",
  pcoc: "Four 50-question practice tests for the Pleasure Craft Operator Card: Canadian safety equipment, rules of the road, buoys and emergencies, 75% to pass.",
  cask: "Free Saskatchewan Class 7 learner's test practice: 200 original questions from the SGI Driver's Handbook on signs, right-of-way, GDL rules, winter driving and impaired driving.",
  cans: "Nova Scotia Class 7 learner's knowledge test practice: 200 questions from the NS Driver's Handbook, five tests split 20 road signs and 20 rules of the road like the real one.",
  ukseru: "Mock tests for the SERU assessment London private hire drivers take: licensing rules, red routes and bus lanes, passenger safety, equality and safeguarding, from the PHV Driver's Handbook.",
  nzroad: "Five real-length mock tests for New Zealand's learner licence theory test: give way rules, signs, speed, sharing the road, parking and licence conditions, from the Official New Zealand Road Code.",
  phlto: "Three full 60-question mock tests for the Philippines LTO driver's license written exam: road signs, right of way, speed limits, parking, and the seat belt, helmet, child seat, distracted and drunk driving laws.",
  zak53: "Four 50-question mock tests for South Africa's K53 learner's licence (Code 2): rules of the road, road signs and markings, and vehicle controls, from the National Road Traffic Act and Regulations.",
  sgbtt: "Four 50-question mock tests for Singapore's Basic Theory Test: traffic signs, road markings and signals, lanes and overtaking, junctions, parking and safe driving, from the Traffic Police Basic Theory of Driving handbook.",
  aerta: "Four real-length mock tests for the UAE driving theory test (the RTA knowledge test): road signs, roundabouts and right of way, lanes and overtaking, school buses, fog, sandstorms and wadis, 30 of 40 to pass.",
  ngfrsc: "Four mock tests for the theory part of the Nigerian driver's licence: road signs, junctions, overtaking, parking, expressways, vehicle safety and crashes, from the FRSC Highway Code and the National Road Traffic Regulations 2012.",
  kentsa: "Four 50-question mock tests for the theory part of Kenya's NTSA driving test: road signs, roundabouts, overtaking, matatus and boda bodas, breakdowns, crashes and the 2026 alcohol limits, from the Kenya Highway Code and the Traffic Act.",
  mykpp: "Four 50-question mock tests for Malaysia's JPJ KPP01 computer theory test: road signs in Malay, markings, traffic rules, expressways, parking, licences and KEJARA, with the 42 of 50 pass mark.",
  hkdrive: "Seven real-length mock tests for the Hong Kong Transport Department driving written test: signs and markings, junctions and roundabouts, expressways and tunnels, seat belts and child restraints, parking and your learner and probationary rules, from the Road Users' Code.",
  iedtt: "Ireland's Driver Theory Test for a car: road signs, road markings, speed limits, roundabouts, motorways, learner rules and safe driving, in five real-length tests written from the RSA Rules of the Road.",
  faapvt: "FAA Private Pilot Airplane (PAR) knowledge test. Regulations, airspace, weather and weather reports, aerodynamics and systems, performance and weight and balance, navigation and human factors, three choices per question.",
  psat: "A full-length digital PSAT/NMSQT practice test with timed adaptive modules, a calculator and a 320 to 1520 score estimate, plus four skill drills that teach the basics first.",
  praxis: "Praxis Core Academic Skills for Educators for future teachers: Reading (5713), Writing (5723, selected response) and Mathematics (5733) in two practice tests at the real pace, with passages, usage and sentence correction, a calculator on Math, and seven drills, three of which teach the basics first. Free.",
  gre: "Two full practice tests in the shorter GRE General Test format: adaptive Verbal and Quant sections on the real clock, every question type from text completion to quantitative comparison, and a 130 to 170 score estimate per measure.",
  gmat: "Two full GMAT Focus Edition practice tests: Quantitative Reasoning, Verbal Reasoning and Data Insights in 45-minute sections, with data sufficiency, table, graph, two-part and multi-source questions and a 205 to 805 score estimate.",
  netplus: "CompTIA Network+ N10-009. The OSI model, ports and protocols, subnetting, cloud and SD-WAN, routing, switching and Wi-Fi, DHCP, DNS and monitoring, network security, and the troubleshooting methodology, tools and common faults.",
  cissp: "ISC2 CISSP on the April 2024 outline. Manager-level best and first questions across all eight domains: risk management, asset security, architecture and cryptography, network security, identity and access, testing, security operations and software security.",
  itil: "PeopleCert ITIL 4 Foundation: 40 questions in 60 minutes with a 65 percent pass line. Key concepts, the seven guiding principles, the four dimensions, the service value chain and the ITIL practices, weighted like the real syllabus.",
  psm: "Scrum.org Professional Scrum Master I on the 2020 Scrum Guide. Scrum theory and values, the Product Owner, Scrum Master and Developers, events and timeboxes, artifacts and their commitments, in 80 questions in 60 minutes with an 85 percent pass mark.",
  capm: "PMI Certified Associate in Project Management on the current CAPM outline. Entry-level questions on life cycles, roles, ethics, scheduling and earned value, Scrum and Kanban, and business analysis.",
  gcdl: "Google Cloud Digital Leader (2026 exam guide). Cloud and digital transformation, data products from BigQuery to Spanner, AI and agents with Gemini Enterprise Agent Platform, migration, GKE and Cloud Run, security and zero trust, and cost control and SRE.",
  ssccgl: "Mock tests for SSC CGL Tier 1: 100 questions in 60 minutes on general intelligence and reasoning, general awareness, quantitative aptitude and English comprehension, with negative marking explained.",
  ibpspo: "Mock tests for the IBPS PO Preliminary exam: 100 questions in 60 minutes with sectional timing across English Language, Quantitative Aptitude and Reasoning Ability, with negative marking explained.",
  rrbntpc: "Mock tests for the RRB NTPC CBT 1 railway exam: 100 questions in 90 minutes on General Awareness (history, geography, polity, economy, science), Mathematics and General Intelligence and Reasoning, with negative marking explained.",
  ctet: "CBSE Central Teacher Eligibility Test, Paper I for Classes 1 to 5. Child Development and Pedagogy, English comprehension with unseen passages and poems, Mathematics and EVS, each with content and pedagogy questions. Language II is not included.",
  rrbgroupd: "Mock tests for the RRB Group D (Level 1) railway CBT: 100 questions in 90 minutes on Mathematics, General Intelligence and Reasoning, General Science and General Awareness, with negative marking explained.",
  sscgd: "Mock tests for the SSC GD Constable CBE: 80 questions in 60 minutes on reasoning, general knowledge, elementary mathematics and English at Class 10 level, with negative marking explained.",
  sscchsl: "Mock tests for SSC CHSL Tier 1 (LDC, JSA and DEO posts): 100 questions in 60 minutes on English, general intelligence, quantitative aptitude and general awareness, timed 15 minutes per part, with negative marking explained.",
  sscmts: "Mock tests for the SSC MTS and Havaldar exam: 90 questions in two 45-minute sessions, maths and reasoning, then general awareness and English, with Session 2 negative marking explained.",
  uppolice: "Mock tests for the UP Police Constable written exam: General Knowledge (India, Uttar Pradesh, police and law), General Hindi in Hindi, Numerical and Mental Ability, and Reasoning, at the real exam's pace, with negative marking explained.",
  ibpsclerk: "Mock tests for the IBPS Clerk Preliminary exam: 100 questions in 60 minutes with sectional timing across English Language, Numerical Ability and Reasoning Ability, with negative marking explained.",
  jnvst: "Navodaya Vidyalaya Class 6 entrance practice for Class 5 students: full 80-question JNVST mock tests in 2 hours on Mental Ability, EVS, Arithmetic and Language passages. Mental Ability is practised in words, not pictures.",
  jambeng: "Practice tests for JAMB UTME Use of English: 60 questions on original comprehension and cloze passages, synonyms and antonyms, sentence interpretation, sentence completion and oral forms, scored out of 100 like the real subject.",
  appsych: "Two full AP Psychology multiple-choice sections for the redesigned exam: 75 questions with four choices in 90 minutes, all five units plus research methods and data, with study summaries and tables that questions share.",
  pkdrive: "Four 50-question mock tests for the driving licence sign and theory tests in Pakistan: warning, regulatory and mandatory signs, markings, roundabouts, overtaking, motorway rules, safety and emergencies, for Punjab, Sindh, KP, Balochistan and Islamabad.",
  sbipo: "Mock tests for the SBI PO Preliminary exam on the 2026 pattern: 100 questions in 60 minutes with 20-minute sectional timing across English Language (40), Quantitative Aptitude (30) and Reasoning Ability (30), with negative marking explained.",
  sbiclerk: "Mock tests for the SBI Clerk (Junior Associates) Preliminary exam: 100 questions in 60 minutes with sectional timing across English Language, Numerical Ability and Reasoning Ability, with negative marking explained.",
  ibpsrrb: "Mock tests for the IBPS RRB Office Assistant (Clerk) Preliminary exam: 80 questions in 45 minutes with sectional timing, Reasoning 40 in 25 minutes and Numerical Ability 40 in 20 minutes, with negative marking explained.",
  delhipolice: "Mock tests for the Delhi Police Constable (Executive) CBE conducted by SSC: 100 questions in 90 minutes on general knowledge, reasoning, numerical ability and computer fundamentals at Class 10 level, with negative marking explained.",
  biharpolice: "Mock tests for the Bihar Police Constable (CSBC) written exam at Class 10 level: Hindi in Hindi, English, Mathematics, Social Science, Science and GK with Bihar GK, in full 100-question papers at the real 2-hour length.",
  rajpolice: "Mock tests for the Rajasthan Police Constable written exam: reasoning and basic computer knowledge, general knowledge and science, laws on crimes against women and children, and Rajasthan GK, in the real 60/45/45 balance and at the real pace, with negative marking explained.",
  mppolice: "Mock tests for the MP Police Constable written exam (MPESB): General Knowledge (India, Madhya Pradesh, computers) and Reasoning, Intellectual and Mental Ability, and Science and Simple Arithmetic, 100 questions in 2 hours like the real paper.",
  apush: "Two full AP U.S. History multiple-choice sections: 55 questions with four choices in 55 minutes, in sets of three or four that share a source, weighted across all nine periods from 1491 to the present.",
  apbio: "Two full AP Biology multiple-choice sections: 60 questions with four choices in 90 minutes, all eight units weighted like the real exam, with experiments and data tables that questions share, a calculator and a formula sheet.",
  phcse: "Reviewer for the Philippine Civil Service Exam (CSE-PPT): a Professional and a Subprofessional mock exam on verbal, analytical, clerical and numerical ability, the 1987 Constitution, R.A. 6713, human rights and the environment.",
  upscse: "Mock tests for UPSC Civil Services Prelims GS Paper I: 100 questions in 2 hours on history, geography, polity, economy, environment and science in the UPSC statement format, plus a CSAT drill, with negative marking explained.",
  ssccpo: "Mock tests for SSC CPO Paper-I, the Sub-Inspector exam for Delhi Police and the CAPFs: 100 questions in 60 minutes on the 2026 pattern, timed 15 minutes per part, with negative marking explained.",
  rrbalp: "Mock tests for RRB ALP (Assistant Loco Pilot) CBT 1: 75 questions in 60 minutes on Mathematics, General Intelligence and Reasoning and General Science, on the CEN 01/2026 pattern, with negative marking explained.",
  rpfconst: "Mock tests for the RPF Constable CBT: 100 questions at the real pace on General Awareness (history, geography, polity, the railways and general science), Arithmetic, and General Intelligence and Reasoning, with negative marking explained.",
  nda: "Mock tests for the UPSC NDA and NA exam: Mathematics and the General Ability Test (English and General Knowledge) at the real pace, with negative marking explained.",
  agniveer: "Mock tests for the Indian Army Agniveer (General Duty) Common Entrance Exam: 50 questions in 60 minutes on General Knowledge, General Science, Mathematics and Logical Reasoning, with negative marking explained.",
  agniveervayu: "Mock tests for the Indian Air Force Agniveervayu Science subjects online test: English, Physics and Mathematics to the 10+2 CBSE syllabus, 70 questions in 60 minutes, with negative marking explained.",
  apworld: "Two full AP World History: Modern multiple-choice sections: 55 questions with four choices in 55 minutes, in sets of three or four that share a source, weighted across all nine units from c. 1200 to the present.",
  aplang: "Two full AP English Language and Composition multiple-choice sections: 45 questions with four choices in 60 minutes, two reading sets on nonfiction passages and three writing sets on student drafts, weighted across all eight skill categories.",
  phlet: "LET reviewer for the Philippine Licensure Examination for Professional Teachers, Elementary level: General Education (English, Filipino, science, math, history, Rizal, ethics, art, the self) and Professional Education (teaching profession, curriculum, learners, assessment, field study) on the PRC table of specifications.",
  neet: "Mock tests for NEET (UG), India's medical entrance exam: Physics, Chemistry and Biology on the NCERT syllabus at the real pace, with statement and assertion-reason questions and negative marking explained.",
  jeemain: "Full JEE Main Paper 1 mock tests: 75 questions in 3 hours across Mathematics, Physics and Chemistry, with Section B numerical value questions and negative marking explained.",
  mhtcet: "Mock tests for MHT-CET, Maharashtra's engineering entrance (PCM group): Physics, Chemistry and Mathematics at the real pace, on the State Board Std XI and XII syllabus.",
  cuet: "Practice for the CUET (UG) General Aptitude Test conducted by the NTA: full 50-question, 60-minute tests on general knowledge, general mental ability, numerical ability, quantitative reasoning and logical and analytical reasoning, with the +5/-1 marking explained.",
  ugcnet: "NTA UGC-NET Paper 1, the General Paper on Teaching and Research Aptitude: 50 questions, five from each of the ten units, including a reading passage, a data table, logical reasoning with Indian logic, ICT, environment and the higher education system. No negative marking. Paper 2 is not included.",
  reet: "Rajasthan Eligibility Examination for Teachers, Level 1 for Classes 1 to 5. Child Development and Pedagogy, Hindi and English with unseen passages, Mathematics and EVS with Rajasthan's culture and environment, each with content and pedagogy questions.",
  uptet: "Uttar Pradesh Teacher Eligibility Test, Paper 1 for Classes 1 to 5. Child Development and Pedagogy, Hindi in Hindi with an unseen passage, English, Mathematics and EVS, each with content and pedagogy questions, at the real paper's pace.",
  aissee: "Sainik School Class 6 entrance practice: 100-question AISSEE mock tests in 2 hours at the real pace, on Language, Mathematics, Intelligence and General Knowledge, with an explanation on every answer.",
  apcalcab: "Two full AP Calculus AB multiple-choice sections at the May 2027 length: 29 questions in 62 minutes without a calculator, then 13 in 38 minutes with one, all eight units weighted like the real exam.",
  aphug: "Two full AP Human Geography multiple-choice sections: 60 questions with five choices in 60 minutes, about a third in sets on a data table, map or landscape, weighted across all seven units.",
  jambmath: "Practice tests for JAMB UTME Mathematics: 40 questions across the whole syllabus (number bases, indices and logarithms, algebra, progressions and matrices, geometry and mensuration, trigonometry, calculus, statistics and probability), scored out of 100 like the real subject.",
  jambbio: "Practice tests for JAMB UTME Biology: 40 questions in 30 minutes on the whole syllabus, from cells and the kingdoms to nutrition, body systems, ecology, genetics and evolution, scored out of 100 like the real subject.",
  jambchem: "Practice tests for JAMB UTME Chemistry: 40 questions on all 18 syllabus topics, from separation of mixtures and the mole to electrolysis, metals and organic chemistry, with every calculation worked out and a score out of 100 like the real subject.",
  jambphys: "Practice tests for JAMB UTME Physics: 40 questions across the whole syllabus, from motion, heat and waves to electricity, magnetism and modern physics, with every calculation worked and a score out of 100 like the real subject.",
  apgov: "Two full AP U.S. Government and Politics multiple-choice sections: 55 questions with four choices in 80 minutes, about 30 on their own and the rest in sets on data, foundational documents and visuals, weighted across all five units.",
  ngpolice: "Four 50-question mock CBTs for the Nigeria Police Force constable recruitment aptitude test: English grammar, vocabulary and comprehension, mathematics, logical reasoning, the 1999 Constitution, fundamental rights and policing.",
  cdcfib: "Four 50-question mock tests for the CDCFIB recruitment CBT into the Civil Defence Corps, Correctional Service, Fire Service and Immigration Service: the four services, fire safety and first aid, Nigerian geography and environment, English, numerical ability and logical reasoning.",
  ngarmy: "Four 50-question mock tests for the written and aptitude tests in Nigerian Army recruitment (RRI, SSC and DSSC): English grammar and vocabulary, arithmetic and algebra, reasoning, Nigerian history to independence, the armed forces, and Africa, ECOWAS and the AU.",
  ngcustoms: "Four 50-question mock tests for the Nigeria Customs Service recruitment CBT: English grammar and comprehension, arithmetic and duty sums without a calculator, algebra and data, reasoning, and customs, ports, economics, ECOWAS trade and world geography.",
  trcnpqe: "Three full-length mock exams for the TRCN Professional Qualifying Examination that Nigerian teachers take to register: pedagogy, literacy, numeracy, ICT and safeguarding, 12 questions from each area, on the TRCN PQE curriculum guide.",
};

// Short issuing-body line for menus; defaults to the exam label.
const EXAM_ORG: Record<string, string> = { caqc: "SAAQ (Quebec)", uklgv: "DVSA (UK)", auqld: "Queensland TMR", ausa: "SA Department for Infrastructure and Transport", auvic: "VicRoads, Victoria", ukadi: "DVSA, Great Britain", ukcar: "DVSA (Great Britain)", ukpcv: "DVSA (Great Britain)", cabc: "ICBC, British Columbia", aunsw: "Transport for NSW", ukmoto: "DVSA, Great Britain", caab: "Alberta registry agents · Class 7 learner's licence", caon: "Ontario MTO, DriveTest", camb: "Manitoba Public Insurance (MPI)", auwa: "WA Department of Transport and Major Infrastructure", timestables: "Primary school · Year 2 to Year 4 MTC", ks2: "Year 6 SATs · Reading, GPS, Maths", gcsemaths: "Foundation tier · AQA, Pearson Edexcel and OCR", osslt: "EQAO · Ontario Grade 10 literacy test", naplan: "ACARA · Year 9 Reading, Conventions, Numeracy", nswsel: "NSW Department of Education · Year 6 for Year 7 entry", uksia: "SIA licence-linked qualification (UK)", uk18ed: "City & Guilds 2382-26 · BS 7671:2018+A4:2026", gcsehigher: "AQA, Edexcel and OCR (England)", gcsescience: "GCSE double award · Biology, Chemistry, Physics", gcsecs: "AQA, OCR and Pearson Edexcel (England)", elevenplus: "Grammar school entry · English, maths, verbal reasoning", fsmaths: "Ofqual-regulated awarding bodies (England)", cscs: "CITB (Great Britain) · CSCS card", ukfood: "Level 2 Food Safety in Catering · RQF awarding bodies", ukaplh: "Licensing Act 2003 · England and Wales", ukfaw: "HSE First Aid at Work syllabus · Level 3", ukcare: "Skills for Care · 16 standards, England", capal: "RCMP Canadian Firearms Program · non-restricted PAL", caelec: "Red Seal interprovincial exam · provincial apprenticeship authorities", eqao9: "EQAO (Ontario) · Grade 9 MTH1W", rexpn: "NCSBN REx-PN test plan · CNO and BCCNM", capsw: "Ontario PSW program standard · NACC and college finals", casfa: "CSA Z1210 intermediate level (Canada)", cawhmis: "Health Canada HPR · WHMIS 2015 workplace training", caguard: "Ontario Ministry of the Solicitor General (PSISB)", caauto: "Red Seal interprovincial exam · 2023 RSOS, 310S", caplumb: "Red Seal interprovincial exam · 2023 RSOS, 306A", cacarp: "Red Seal interprovincial exam · 2022 RSOS, 403A", caweld: "Red Seal interprovincial exam · 2023 RSOS, 456A", auwhite: "CPCWHS1001 · general construction induction (RTO course)", ged: "High school equivalency · RLA, Math, Science, Social Studies", sat: "Digital SAT · Reading and Writing, Math", act: "Enhanced ACT · English, Math, Reading, Science", cdl: "Commercial license", cdlx: "H, air brakes, combo, N, P", moto: "Permit knowledge test", civics: "USCIS naturalization", part107: "FAA drone pilot", ham: "FCC Technician practice", epa608: "EPA Section 608 practice", cna: "Nurse aide written exam", ptcb: "Pharmacy technician certification", phleb: "Phlebotomy certification practice", ccma: "NHA medical assistant exam", cet: "NHA EKG technician exam", danb: "DANB CDA: GC, RHS, ICE", emt: "NREMT cognitive exam", paramedic: "NREMT Paramedic exam", foodmgr: "Food-protection manager practice", realestate: "National portion, Pearson VUE and PSI", insurance: "Life, accident & health producer exam", notary: "Notary practice; state requirements vary", teas: "Nursing & allied health admissions", aws: "AWS CLF-C02", aplus: "CompTIA 220-1201 / 220-1202", foodhandler: "Supplemental food-safety practice", boating: "NASBLA state boater exams", hunter: "IHEA state hunter education exams", secplus: "CompTIA SY0-701", hesi: "Nursing school admissions", nclex: "NCSBN 2026 RN test plan", nclexpn: "NCSBN 2026 PN test plan", asvab: "Military aptitude practice", cpr: "Lay rescuer & healthcare BLS courses", osha: "OSHA Outreach course final", forklift: "OSHA 1910.178 operator evaluation", alcohol: "Supplemental alcohol-service practice", accuplacer: "College placement", security: "State guard card exams", lifeguard: "Certification written exam", pnc: "P&C producer exam, general portion", cosmetology: "NIC national theory exam; a few states use their own", vtne: "AAVSB vet tech credentialing exam", naplan7: "ACARA · Year 7 Reading, Conventions, Numeracy", ocnsw: "NSW Department of Education · Year 4 for Year 5 OC entry", vicsel: "Victorian Department of Education · Year 8 for Year 9 entry", hscmaths: "NESA (NSW) · Year 12 HSC", aursa: "SITHFAB021 · national RSA unit, Australia", aurcg: "SITHGAM022 · RCG / RSG, all states", aufss: "SITXFSA005 + SITXFSA006 · FSANZ Standard 3.2.2A", aufirstaid: "HLTAID011 · Australian Resuscitation Council guidelines", auforklift: "TLILIC0003 · high risk work licence LF, Australia", auwah: "RIIWHS204 (formerly RIIWHS204E), nationally recognised unit", uklitu: "Home Office · settlement and British citizenship", cacit: "IRCC · Discover Canada study guide", aucit: "Department of Home Affairs · Our Common Bond", gulfrn: "Gulf health authorities · RN licensing exam", awssaa: "AWS SAA-C03", az900: "Microsoft AZ-900", ccna: "Cisco 200-301 · exam topics v1.1", inrto: "Learner's licence test · RTO / Sarathi Parivahan", pmp: "PMI · July 2026 exam content outline", uknmc: "NMC Test of Competence Part 1 · adult nursing, Pearson VUE", nasm: "National Academy of Sports Medicine · personal trainer certification", rbt: "BACB · RBT Test Content Outline (3rd ed.)", cpc: "AAPC · medical coding certification", jelec: "2023 NEC · state and ICC journeyman exams", barber: "NIC national barber theory exam; some states use their own", ffi: "NFPA 1010 · state fire certification", police: "Police officer entrance exams · agency and civil service", sie: "FINRA · Securities Industry Essentials", series7: "FINRA · General Securities Representative", pcoc: "Transport Canada · accredited course providers", cask: "SGI (Saskatchewan Government Insurance)", cans: "Nova Scotia RMV · Access Nova Scotia", ukseru: "London PHV driver licence · PHV Driver's Handbook v1.0", nzroad: "NZTA Waka Kotahi · Class 1 learner licence", phlto: "LTO · Student permit, non-professional and professional license", zak53: "RTMC / DLTC · Code 2 learner's licence", sgbtt: "Singapore Traffic Police · Basic Theory Test at BBDC, CDC and SSDC", aerta: "RTA Dubai · Light vehicle knowledge test", ngfrsc: "FRSC · driving school CBT for a fresh licence", kentsa: "NTSA (Kenya) · Highway Code and Traffic Act", mykpp: "JPJ (Road Transport Department Malaysia) · KPP01 car", hkdrive: "Transport Department (Hong Kong) · Part A written test, private car", iedtt: "RSA (Ireland) · car theory test before a learner permit", faapvt: "FAA · Private Pilot Airplane ACS (FAA-S-ACS-6C)", psat: "Digital PSAT/NMSQT and PSAT 10 · Reading and Writing, Math", praxis: "ETS · Reading 5713, Writing 5723, Math 5733", gre: "ETS · shorter GRE General Test, Verbal and Quant", gmat: "GMAC · GMAT Focus Edition", netplus: "CompTIA N10-009", cissp: "ISC2 · CISSP exam outline, April 2024", itil: "PeopleCert · ITIL 4 Foundation syllabus", psm: "Scrum.org · Scrum Guide 2020", capm: "PMI · CAPM exam content outline", gcdl: "Google Cloud · August 2026 exam guide", ssccgl: "Staff Selection Commission · CGL Tier 1", ibpspo: "IBPS · PO/MT Preliminary Examination", rrbntpc: "Railway Recruitment Boards · NTPC CBT 1", ctet: "CBSE · CTET Paper I syllabus", rrbgroupd: "Railway Recruitment Boards · Group D (Level 1) CBT", sscgd: "Staff Selection Commission · Constable (GD) in CAPFs, SSF and Assam Rifles", sscchsl: "Staff Selection Commission · CHSL (10+2) Tier 1", sscmts: "Staff Selection Commission · MTS and Havaldar", uppolice: "UPPRPB · Constable Civil Police written exam", ibpsclerk: "IBPS · CRP CSA (Clerk) Preliminary Examination", jnvst: "Navodaya Vidyalaya Samiti · JNVST Class VI", jambeng: "JAMB · UTME Use of English", appsych: "College Board · AP Psychology, 2024 course framework", pkdrive: "Provincial and ICT licensing authorities · sign test and road test", sbipo: "State Bank of India · Probationary Officers, Phase I Preliminary Examination", sbiclerk: "State Bank of India · Junior Associates Preliminary Examination", ibpsrrb: "IBPS · CRP RRBs Office Assistant (Multipurpose) Preliminary Examination", delhipolice: "Staff Selection Commission · Constable (Executive) in Delhi Police", biharpolice: "CSBC Bihar · Constable written exam", rajpolice: "Rajasthan Police · Constable written exam", mppolice: "MPESB · Police Constable Recruitment Test", apush: "College Board · AP U.S. History, CED effective fall 2026", apbio: "College Board · AP Biology, course framework effective fall 2025", phcse: "Civil Service Commission · Career Service Exam, Professional and Subprofessional", upscse: "Union Public Service Commission · Civil Services (Preliminary) GS Paper I", ssccpo: "Staff Selection Commission · Sub-Inspector in Delhi Police and CAPFs", rrbalp: "Railway Recruitment Boards · Assistant Loco Pilot CBT 1", rpfconst: "Railway Recruitment Boards · RPF and RPSF Constable CBT", nda: "UPSC · National Defence Academy and Naval Academy Examination", agniveer: "Indian Army · Agniveer (General Duty) CEE", agniveervayu: "Indian Air Force · Agniveervayu (Agnipath)", apworld: "College Board · AP World History: Modern, CED effective fall 2026", aplang: "College Board · AP English Language and Composition, CED effective fall 2024", phlet: "PRC · Board for Professional Teachers, Elementary LEPT", neet: "National Testing Agency · NEET (UG), MBBS and BDS entrance", jeemain: "National Testing Agency · JEE (Main) Paper 1 (B.E./B.Tech.)", mhtcet: "State CET Cell, Maharashtra · MHT-CET PCM group", cuet: "National Testing Agency · CUET (UG) General Aptitude Test", ugcnet: "National Testing Agency for the UGC · NET Paper 1 (Teaching and Research Aptitude)", reet: "BSER (Rajasthan) · REET Level 1 eligibility test", uptet: "UPESSC · UPTET Paper 1 (primary level)", aissee: "NTA · All India Sainik Schools Entrance Examination, Class VI", apcalcab: "College Board · AP Calculus AB, CED with the changes for May 2027", aphug: "College Board · AP Human Geography, course framework effective fall 2020", jambmath: "JAMB · UTME Mathematics", jambbio: "JAMB · UTME Biology", jambchem: "JAMB · UTME Chemistry", jambphys: "JAMB · UTME Physics", apgov: "College Board · AP U.S. Government and Politics, CED effective fall 2026", ngpolice: "Police Service Commission · constable recruitment aptitude test", cdcfib: "Civil Defence, Correctional, Fire and Immigration Services Board · recruitment CBT", ngarmy: "Nigerian Army · recruitment screening and selection", ngcustoms: "Nigeria Customs Service · recruitment CBT for Superintendent, Inspectorate and Customs Assistant cadres", trcnpqe: "Teachers Registration Council of Nigeria (TRCN)" };

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
  { title: "Ireland driving tests", ids: ["iedtt"] },
  { title: "UK school tests", ids: ["timestables", "ks2", "elevenplus", "gcsemaths", "gcsehigher", "gcsescience", "gcsecs", "fsmaths"] },
  { title: "UK workplace and trade certificates", ids: ["cscs", "uk18ed", "uksia", "ukaplh", "ukfood", "ukfaw", "ukcare", "ukseru"] },
  { title: "Canada driving tests", ids: ["caon", "caqc", "cabc", "caab", "camb", "cask", "cans"] },
  { title: "Canada school tests", ids: ["osslt", "eqao9"] },
  { title: "Canada healthcare and first aid", ids: ["rexpn", "capsw", "casfa"] },
  { title: "Canada trades and workplace certificates", ids: ["caelec", "caplumb", "cacarp", "caweld", "caauto", "cawhmis", "caguard", "capal"] },
  { title: "India driving tests", ids: ["inrto"] },
  { title: "India government job exams", ids: ["upscse", "ssccgl", "sscchsl", "ssccpo", "sscgd", "sscmts", "rrbntpc", "rrbgroupd", "rrbalp", "rpfconst", "uppolice", "delhipolice", "biharpolice", "rajpolice", "mppolice", "ibpspo", "sbipo", "ibpsclerk", "sbiclerk", "ibpsrrb"] },
  { title: "India defence exams", ids: ["nda", "agniveer", "agniveervayu"] },
  { title: "India college entrance exams", ids: ["jeemain", "neet", "mhtcet", "cuet"] },
  { title: "India teacher eligibility tests", ids: ["ctet", "reet", "uptet", "ugcnet"] },
  { title: "India school entrance tests", ids: ["jnvst", "aissee"] },
  { title: "Pakistan driving tests", ids: ["pkdrive"] },
  { title: "Australia learner driver tests", ids: ["aunsw", "auvic", "auqld", "auwa", "ausa"] },
  { title: "New Zealand driving tests", ids: ["nzroad"] },
  { title: "Philippines driving tests", ids: ["phlto"] },
  { title: "Philippines government and licensure exams", ids: ["phcse", "phlet"] },
  { title: "Malaysia driving tests", ids: ["mykpp"] },
  { title: "Singapore driving tests", ids: ["sgbtt"] },
  { title: "Hong Kong driving tests", ids: ["hkdrive"] },
  { title: "UAE driving tests", ids: ["aerta"] },
  { title: "South Africa driving tests", ids: ["zak53"] },
  { title: "Nigeria driving tests", ids: ["ngfrsc"] },
  { title: "Nigeria university entrance tests", ids: ["jambeng", "jambmath", "jambbio", "jambchem", "jambphys"] },
  { title: "Nigeria recruitment tests", ids: ["ngpolice", "ngarmy", "cdcfib", "ngcustoms"] },
  { title: "Nigeria teacher registration exams", ids: ["trcnpqe"] },
  { title: "Kenya driving tests", ids: ["kentsa"] },
  { title: "Australia school tests", ids: ["ocnsw", "nswsel", "naplan7", "naplan", "vicsel", "hscmaths"] },
  { title: "Australia work certificates", ids: ["auwhite", "auwah", "auforklift", "aufirstaid", "aufss", "aursa", "aurcg"] },
  { title: "Citizenship tests", ids: ["civics", "uklitu", "cacit", "aucit"] },
  { title: "Outdoor & recreation licenses", ids: ["boating", "hunter", "lifeguard", "pcoc"] },
  { title: "Workplace & job certifications", ids: ["foodhandler", "osha", "forklift", "alcohol", "security", "cosmetology", "barber", "nasm"] },
  { title: "Aviation, radio & trade licenses", ids: ["part107", "faapvt", "ham", "epa608", "jelec", "foodmgr"] },
  { title: "Real estate, insurance, securities & notary licenses", ids: ["realestate", "insurance", "pnc", "sie", "series7", "notary"] },
  { title: "GED, college, military & nursing school entrance", ids: ["ged", "praxis", "sat", "psat", "act", "accuplacer", "asvab", "teas", "hesi"] },
  { title: "AP exams", ids: ["appsych", "apush", "apgov", "apworld", "aphug", "aplang", "apbio", "apcalcab"] },
  { title: "Graduate school admissions", ids: ["gre", "gmat"] },
  { title: "IT certifications", ids: ["aplus", "netplus", "secplus", "cissp", "aws", "awssaa", "az900", "gcdl", "ccna"] },
  { title: "Business and project management", ids: ["pmp", "capm", "psm", "itil"] },
  { title: "Emergency services", ids: ["emt", "paramedic", "cpr", "ffi", "police"] },
  { title: "Healthcare certification exams", ids: ["nclex", "nclexpn", "cna", "ccma", "cpc", "rbt", "ptcb", "phleb", "cet", "danb", "htl", "cst", "crcst", "vtne"] },
  { title: "International nurse licensing exams", ids: ["uknmc", "gulfrn"] },
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
  sat: "digital sat college board college admissions high school reading writing math bluebook",
  act: "act test college admissions high school english math reading science composite enhanced act",
  cdl: "truck trucking commercial class a class b cdl permit clp commercial learner permit",
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
  cosmetology: "cosmetology cosmo beauty school state board NIC theory esthetics esthetician hair stylist nails nail tech salon",
  vtne: "vtne vet tech veterinary technician veterinary nurse aavsb lvt rvt cvt credentialed technician",
  htl: "histology histotechnologist histotechnician ascp",
  cst: "surgical technologist scrub tech operating room",
  crcst: "sterile processing central service hspa cbspd",
  uklitu: "life in the uk test british citizenship test uk citizenship test indefinite leave to remain ilr settlement naturalisation life in the united kingdom guide for new residents handbook home office lituk",
  cacit: "canadian citizenship test canada citizenship test practice discover canada ircc citizenship test 20 questions citizenship quiz oath canada citizenship exam questions provincial capitals new citizen",
  aucit: "australian citizenship test citizenship test australia our common bond australian values home affairs citizenship practice test become an australian citizen naturalisation pledge",
  gulfrn: "prometric exam for nurses prometric nursing exam dha exam nurses dubai health authority doh haad abu dhabi mohap moh uae scfhs saudi snle saudi prometric qchp dhp qatar omsb oman kuwait moh nhra bahrain gulf gcc middle east registered nurse licensing exam rn license",
  awssaa: "aws solutions architect associate saa saa-c03 saa c03 amazon web services architect associate certification cloud architect exam",
  az900: "az-900 az900 azure fundamentals microsoft azure fundamentals microsoft certified azure fundamentals azure certification cloud fundamentals microsoft cloud exam entra id",
  ccna: "cisco ccna 200-301 ccent network associate networking routing switching subnetting ospf vlan cisco certification",
  inrto: "rto exam questions rto test learner licence learners licence learning licence ll test llr test learner licence test questions sarathi parivahan mock test india driving licence test road signs india rto mock test two wheeler lmv",
  pmp: "pmp pmi project management professional certification exam prep capm agile hybrid predictive earned value evm pmbok project manager",
  uknmc: "nmc cbt nmc computer based test test of competence toc part 1 nmc exam uk nursing registration international nurses overseas nurses ien india philippines nigeria kenya ghana zimbabwe nepal adult nursing numeracy part a part b clinical nhs nurse uk register pearson vue osce",
  nasm: "nasm cpt nasm-cpt nasm certified personal trainer personal trainer certification personal training exam cpt7 cpt 7 opt model overhead squat assessment national academy of sports medicine fitness trainer",
  rbt: "rbt registered behavior technician aba applied behavior analysis behavior tech bacb rbt exam rbt test content outline 3rd edition autism therapy technician",
  cpc: "cpc certified professional coder aapc medical coding coder billing and coding icd-10-cm cpt hcpcs modifiers e/m",
  jelec: "journeyman electrician electrical license electrician exam nec 2023 national electrical code nfpa 70 icc journeyman psi prometric electrician test wireman apprentice",
  barber: "barber barbering barber license barber state board barber written exam nic barber theory master barber barber school fade razor shave clipper",
  ffi: "firefighter 1 firefighter i ff1 ffi fire fighter exam firefighter certification test fire academy nfpa 1001 nfpa 1010 ifsac pro board ifsta essentials scba ladders hose fire department",
  police: "police exam police officer test law enforcement written exam entrance exam cop test police academy civil service police test npost frontline pelletb leab sheriff deputy corrections officer trooper",
  sie: "sie exam securities industry essentials finra stockbroker broker license series 7 series 6 corequisite finance securities",
  series7: "series 7 exam general securities representative gs finra stockbroker license registered representative options municipal bonds margin series 7 top-off sie corequisite finance securities",
  pcoc: "pcoc pleasure craft operator card canadian boating licence boating license canada boat card transport canada boater exam ontario bc quebec alberta pwc sea-doo",
  cask: "saskatchewan sgi class 7 learner's licence learners test learner permit written test knowledge test sign test basic test regina saskatoon gdl novice driver's handbook canada",
  cans: "nova scotia learners test class 7 ns learner's licence knowledge test written test road sign test rules of the road access nova scotia rmv registry of motor vehicles halifax dartmouth sydney gdl canada drivers handbook",
  ukseru: "seru seru test seru assessment tfl seru safety equality and regulatory understanding pco licence pco test private hire driver phv driver minicab uber driver london phv handbook topographical",
  nzroad: "nz learner licence test learners licence nz road code test road code quiz nz theory test nzta waka kotahi class 1 learner licence new zealand driving test learner permit nz",
  phlto: "lto exam reviewer lto practice test lto written exam lto exam questions philippines driving test driver's license exam philippines non pro license exam professional license exam student permit tdc exam reviewer land transportation office",
  zak53: "k53 learners test k53 learners licence learners licence south africa code 2 learners k53 road signs k53 rules of the road k53 vehicle controls dltc learners test natis learners licence questions sa driving test",
  sgbtt: "singapore btt basic theory test btt practice btt mock test btt questions singapore driving theory test basic theory of driving handbook traffic police bbdc ssdc cdc driving licence singapore",
  aerta: "uae driving theory test rta theory test dubai theory test rta knowledge test dubai driving licence test uae driving licence abu dhabi theory test sharjah theory test rta mock test emirates driving test",
  ngfrsc: "nigeria driving test frsc highway code frsc cbt driving school test nigerian drivers licence theory test highway code quiz nigeria road signs nigeria learners permit national road traffic regulations 2012",
  kentsa: "ntsa driving test kenya driving test ntsa theory test kenya highway code highway code kenya questions ntsa test questions and answers kenya driving licence test class b provisional licence kenya driving school test",
  mykpp: "kpp01 kpp 01 ujian kpp jpj theory test jpj computer test ujian undang-undang bahagian 1 soalan kpp01 malaysia driving test lesen memandu ldl kpp gabungan malaysia learner licence",
  hkdrive: "hong kong driving test hk driving test written test hong kong driving theory test transport department written test part a test road users code test hk learner driver test private car written test hong kong driving licence test td written test",
  iedtt: "driver theory test ireland irish theory test dtt rsa theory test rules of the road ireland learner permit test ndls theory test ireland practice prometric theorytest.ie",
  faapvt: "private pilot ppl written knowledge test par faa airplane student pilot ground school checkride acs sectional",
  psat: "psat psat nmsqt psat 10 psat/nmsqt national merit scholarship qualifying test selection index semifinalist college board bluebook digital psat 10th grade 11th grade junior",
  praxis: "praxis core praxis 1 ppst core academic skills for educators 5713 5723 5733 5752 teacher certification teacher education program admission ets reading writing math",
  gre: "gre general test graduate record examination ets graduate school masters phd admissions verbal reasoning quantitative reasoning quant text completion sentence equivalence quantitative comparison shorter gre",
  gmat: "gmat focus edition gmac mba business school graduate management admission test data insights data sufficiency critical reasoning quant verbal 805",
  netplus: "comptia network plus network+ n10-009 n10 009 net+ networking certification subnetting osi ports",
  cissp: "cissp isc2 isc² certified information systems security professional cybersecurity security manager cat exam eight domains cism",
  itil: "itil itil4 itil 4 foundation itil v4 itil v5 itil version 5 peoplecert axelos it service management itsm service desk incident problem change management certification",
  psm: "psm psm1 psm i professional scrum master scrum.org scrum master certification scrum guide 2020 agile scrum exam csm sprint product owner",
  capm: "capm pmi certified associate in project management certification exam prep entry level project management agile scrum business analysis pmbok",
  gcdl: "google cloud digital leader cdl gcp gcdl google cloud certification foundational cloud digital leader exam gemini vertex ai",
  ssccgl: "ssc cgl mock test ssc cgl tier 1 ssc cgl practice set ssc exam combined graduate level staff selection commission ssc mock test free sarkari exam government job exam india reasoning gk quant english",
  rrbntpc: "rrb ntpc mock test rrb ntpc practice test railway exam ntpc cbt 1 cbt1 railway recruitment board non technical popular categories station master goods guard clerk typist railway mock test free india government job exam",
  ctet: "ctet ctet paper 1 ctet paper i ctet mock test cbse central teacher eligibility test tet teacher eligibility test primary teacher cdp child development and pedagogy evs pedagogy maths pedagogy prt kvs nvs dsssb india",
  rrbgroupd: "rrb group d mock test rrb group d practice test railway group d level 1 rrc group d track maintainer assistant points pointsman helper railway exam cbt railway recruitment board group d free mock test india government job exam",
  sscgd: "ssc gd mock test ssc gd constable ssc gd practice set ssc gd 2026 gd constable exam capf constable bsf cisf crpf ssb itbp assam rifles rifleman ssf staff selection commission sarkari exam government job exam india police constable reasoning gk maths english",
  sscchsl: "ssc chsl mock test ssc chsl tier 1 chsl practice set combined higher secondary level 10+2 ldc jsa deo data entry operator lower division clerk staff selection commission ssc mock test free sarkari exam government job exam india reasoning gk maths english",
  sscmts: "ssc mts mock test ssc mts havaldar multi tasking staff non technical havaldar cbic cbn ssc mts practice set session 1 session 2 sarkari exam 10th pass government job exam india maths reasoning gk english",
  uppolice: "up police constable mock test up police mock test upp constable uppbpb upprpb uttar pradesh police bharti sipahi aarakshi police constable exam up police gk hindi reasoning practice set free sarkari exam government job exam india",
  ibpsclerk: "ibps clerk mock test ibps clerk prelims ibps csa customer service associate bank clerk exam crp csa bank exam india reasoning puzzles seating arrangement simplification approximation number series data interpretation english cloze sarkari exam government job",
  jnvst: "jnvst navodaya navodaya vidyalaya jnv class 6 class vi entrance exam navodaya mock test navodaya practice test jawahar navodaya vidyalaya selection test nvs admission class 5 students mental ability test mat evs arithmetic language test sainik school india",
  jambeng: "jamb use of english jamb english utme english jamb cbt practice jamb past questions english jamb 2026 jamb 2027 oral english lexis and structure comprehension cloze test synonyms antonyms nigeria university admission post utme",
  appsych: "ap psychology ap psych advanced placement psychology college board ap exam psychology mcq multiple choice ap psych units biological bases cognition development learning social psychology personality mental physical health research methods aaq ebq high school",
  pkdrive: "pakistan driving license test driving licence test pakistan e sign test esign test punjab sign test road signs pakistan traffic signs test dlims dastak learner permit islamabad driving license test itp karachi driving license sindh kpk driving license test lahore rawalpindi peshawar quetta motorway police nhmp",
  sbipo: "sbi po mock test sbi po prelims state bank of india probationary officer sbi po 2026 new pattern bank po exam india crpd po reasoning puzzles seating arrangement simplification number series quadratic equations data interpretation english cloze para jumble sarkari exam government job",
  sbiclerk: "sbi clerk mock test sbi clerk prelims sbi junior associate customer support and sales sbi ja bank clerk exam state bank of india recruitment bank exam india reasoning puzzles seating arrangement simplification approximation number series data interpretation english cloze sarkari exam government job",
  ibpsrrb: "ibps rrb clerk mock test ibps rrb office assistant multipurpose prelims crp rrbs regional rural bank gramin bank clerk exam rrb clerk rrb assistant bank exam india reasoning puzzles seating arrangement inequality syllogism coding simplification approximation number series data interpretation sarkari exam government job",
  delhipolice: "delhi police constable mock test delhi police mock test delhi police constable executive ssc delhi police dp constable delhi police bharti delhi police exam pattern delhi police gk reasoning computer practice set free sarkari exam government job exam india police constable",
  biharpolice: "bihar police constable mock test bihar police mock test csbc constable csbc bihar sipahi bharti bihar sipahi exam bihar police gk hindi practice set bsap constable bihar special armed police matric level police exam free sarkari exam government job exam india",
  rajpolice: "rajasthan police constable mock test rajasthan police mock test raj police constable rajasthan sipahi bharti police constable exam rajasthan gk rajasthan computer reasoning women and children laws practice set free sarkari exam government job exam india",
  mppolice: "mp police constable mock test mp police mock test mpesb vyapam police bharti madhya pradesh police constable exam aarakshak bharti mp gk reasoning science practice set free sarkari exam government job exam india",
  apush: "ap us history apush ap united states history american history advanced placement college board ap exam history mcq multiple choice stimulus sources periods colonial revolution constitution civil war reconstruction gilded age progressive era new deal cold war civil rights dbq leq saq high school",
  apbio: "ap biology ap bio advanced placement biology college board ap exam biology mcq multiple choice chemistry of life cells cellular energetics photosynthesis respiration cell communication cell cycle heredity genetics gene expression natural selection evolution hardy weinberg chi square ecology high school",
  phcse: "civil service exam reviewer civil service exam philippines cse ppt reviewer career service exam professional subprofessional csc exam reviewer civil service eligibility ra 6713 reviewer philippine constitution reviewer clerical ability analytical ability numerical ability verbal ability government exam philippines",
  upscse: "upsc prelims mock test upsc prelims practice test ias prelims mock test civil services preliminary exam cse prelims gs paper 1 general studies upsc csat paper 2 ias exam ips ifs upsc polity questions upsc history questions free upsc mock test india government exam",
  ssccpo: "ssc cpo mock test ssc cpo paper 1 sub inspector si delhi police si capf si bsf crpf cisf itbp ssb si exam ssc cpo new pattern 2026 100 questions sectional timing police officer exam india reasoning gk maths english",
  rrbalp: "rrb alp mock test rrb alp practice test assistant loco pilot alp cbt 1 loco pilot exam railway alp cen 01/2026 mental ability general science railway recruitment board alp free mock test india government job exam",
  rpfconst: "rpf constable mock test rpf constable practice test rpf mock test railway protection force constable rpsf constable rpf exam cbt rpf gk questions rpf constable 2026 railway police constable free mock test india government job exam",
  nda: "nda mock test nda na exam upsc nda national defence academy naval academy nda maths gat general ability test nda english gk nda 1 nda 2 defence exam army navy air force officer after 12th",
  agniveer: "agniveer mock test agniveer army gd practice test agnipath indian army gd exam agniveer cee online common entrance exam army bharti soldier general duty sena bharti fauji exam free mock test india defence exam",
  agniveervayu: "agniveer vayu agniveervayu air force agniveer iaf agniveer agnipath air force group x airmen science subjects mock test practice set physics maths english 10+2 casb star exam online test india defence",
  apworld: "ap world history ap world history modern ap world apwh world history advanced placement college board ap exam history mcq multiple choice stimulus sources units global tapestry networks of exchange land-based empires transoceanic interconnections revolutions industrialization imperialism global conflict cold war decolonization globalization dbq leq saq high school",
  aplang: "ap english language ap lang ap english language and composition ap english comp advanced placement college board ap exam english mcq multiple choice rhetoric rhetorical analysis rhetorical situation claims evidence reasoning style revision drafts nonfiction passages synthesis argument essay high school",
  phlet: "let reviewer let exam lept licensure examination for teachers licensure examination for professional teachers let reviewer elementary beed let general education reviewer gened professional education reviewer profed prc let board exam for teachers teacher board exam philippines let mock exam",
  neet: "neet neet ug neet mock test neet practice test nta neet medical entrance mbbs bds entrance neet physics neet chemistry neet biology botany zoology ncert class 11 class 12 pcb aiims neet 2026 neet 2027 neet mcq",
  jeemain: "jee main mock test jee mains jee main 2027 jee main paper 1 nta jee iit jee engineering entrance b.tech btech be pcm physics chemistry maths mathematics numerical value questions section b jee practice jee online test nit iiit",
  mhtcet: "mht cet mhtcet mht-cet mock test maharashtra cet mah cet pcm engineering entrance maharashtra state board physics chemistry maths cet cell b.tech b.e. pharmacy entrance after 12th",
  cuet: "cuet cuet ug cuet general test cuet gat cuet general aptitude test cuet 501 cuet mock test cuet 2026 cuet 2027 common university entrance test nta cuet central university entrance test cuet reasoning cuet quantitative aptitude cuet gk du admission entrance exam india",
  ugcnet: "ugc net ugc-net ugc net paper 1 nta net paper 1 general paper teaching and research aptitude teaching aptitude research aptitude net jrf junior research fellowship assistant professor eligibility phd entrance net mock test free ugc net mock test net exam india csir net",
  reet: "reet reet level 1 reet level i reet pre reet mock test reet practice set rajasthan eligibility examination for teachers rajasthan tet rtet teacher eligibility test rbse bser primary teacher third grade teacher cdp hindi pedagogy evs rajasthan india",
  uptet: "uptet up tet uptet paper 1 uptet mock test uttar pradesh teacher eligibility test upessc updeled tet teacher eligibility test primary teacher cdp child development and pedagogy hindi pedagogy evs maths pedagogy super tet basic shiksha parishad sahayak adhyapak india",
  aissee: "aissee sainik school sainik school entrance exam sainik school class 6 class vi all india sainik schools entrance examination nta aissee mock test aissee practice test sainik school mock test new sainik school rimc military school entrance class 5 students maths intelligence gk language india",
  apcalcab: "ap calculus ab ap calc ab ap calc ap calculus advanced placement calculus college board ap exam math mcq multiple choice limits continuity derivatives chain rule implicit differentiation related rates l'hospital mean value theorem extrema optimization integrals riemann sums fundamental theorem of calculus u substitution differential equations slope fields area volume high school",
  aphug: "ap human geography ap human geo aphg aphug human geography advanced placement college board ap exam geography mcq multiple choice units thinking geographically maps projections population migration demographic transition model culture diffusion language religion political geography boundaries gerrymandering agriculture von thunen green revolution cities urban models burgess hoyt rank-size development rostow wallerstein weber frq high school",
  jambmath: "jamb mathematics jamb maths utme maths utme mathematics jamb cbt practice maths jamb past questions mathematics jamb 2026 jamb 2027 number bases logarithms surds matrices calculus statistics probability nigeria university admission post utme",
  jambbio: "jamb biology utme biology jamb cbt practice jamb past questions biology jamb 2026 jamb 2027 jamb biology syllabus ecology genetics nigeria university admission post utme medicine nursing",
  jambchem: "jamb chemistry utme chemistry jamb cbt chemistry jamb chemistry past questions jamb 2027 chemistry mock mole concept electrolysis organic chemistry nigeria university admission science post utme",
  jambphys: "jamb physics utme physics jamb cbt practice physics jamb past questions physics jamb 2027 physics calculations mechanics electricity waves optics modern physics nigeria university admission post utme science",
  apgov: "ap us government ap gov ap government and politics apgo ap us gov politics civics advanced placement college board ap exam mcq multiple choice required supreme court cases foundational documents federalist 10 51 70 78 39 brutus 1 constitution bill of rights congress president courts bureaucracy civil liberties civil rights public opinion ideology voting parties interest groups media campaign finance frq scotus comparison argument essay high school",
  ngpolice: "nigeria police recruitment npf recruitment police service commission psc police cbt police aptitude test police constable exam npfapplication psc gov ng police past questions general duty specialist constable recruitment 2026 police recruitment english maths current affairs",
  cdcfib: "cdcfib recruitment cdcfib cbt cdcfib past questions cdcfib online test civil defence recruitment nscdc recruitment nscdc aptitude test civil defence aptitude test nigerian correctional service recruitment ncos recruitment prisons service recruitment federal fire service recruitment ffs recruitment nigeria immigration service recruitment nis recruitment immigration cbt paramilitary recruitment nigeria ministry of interior recruitment",
  ngarmy: "nigerian army recruitment nigerian army aptitude test army past questions nigeria army exam rri regular recruits intake 91rri 92rri ssc short service combatant dssc direct short service army screening depot zaria nda kaduna military recruitment nigeria soldier recruitment test army cbt general knowledge",
  ngcustoms: "nigeria customs service recruitment customs cbt customs aptitude test customs exam past questions ncs recruitment customs superintendent cadre inspectorate cadre customs assistant paramilitary recruitment nigeria customs screening test online cbt webcam",
  trcnpqe: "trcn trcn pqe pqe professional qualifying examination teachers registration council of nigeria trcn exam trcn cbt trcn past questions pqe past questions trcn practice questions teacher registration nigeria trcn certificate trcn licence nce pgde teacher exam nigeria pedagogy literacy numeracy ict safeguarding",
};

/** Everything a test can be found by (names, org, blurb, aliases), lowercased. */
export function haystack(t: TestCatalogEntry): string {
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
  cosmetology: ["barber", "cpr", "foodhandler"],
  vtne: ["phleb", "cna", "ptcb"],
  sat: ["psat", "act", "accuplacer"],
  act: ["sat", "accuplacer", "asvab"],
  uknmc: ["nclex", "ukcare", "rexpn"],
  gulfrn: ["nclex", "nclexpn", "rexpn"],
  inrto: ["moto", "ukcar", "aunsw"],
  pmp: ["capm", "secplus", "aws", "aplus"],
  cpc: ["ccma", "ptcb", "phleb", "cna"],
  jelec: ["epa608", "osha", "caelec"],
  barber: ["cosmetology", "osha", "cpr"],
  series7: ["sie", "insurance", "pnc"],
  pcoc: ["boating", "capal", "caon"],
  nzroad: ["aunsw", "auvic", "auqld"],
  mykpp: ["sgbtt", "hkdrive", "phlto"],
  sgbtt: ["mykpp", "hkdrive", "phlto"],
  hkdrive: ["sgbtt", "mykpp", "ukcar"],
  phlto: ["mykpp", "sgbtt", "inrto"],
  aerta: ["inrto", "ukcar", "phlto"],
  zak53: ["kentsa", "ngfrsc", "ukcar"],
  ngfrsc: ["kentsa", "zak53", "ukcar"],
  kentsa: ["zak53", "ngfrsc", "ukcar"],
  iedtt: ["ukcar", "nzroad", "ukmoto"],
  psat: ["sat", "act", "accuplacer"],
  praxis: ["ged", "accuplacer", "sat"],
  gre: ["gmat", "sat", "act"],
  gmat: ["gre", "sat", "act"],
  netplus: ["secplus", "aplus", "ccna"],
  cissp: ["secplus", "netplus", "ccna"],
  gcdl: ["aws", "az900", "awssaa"],
  rrbntpc: ["ssccgl", "ibpspo", "ctet"],
  jnvst: ["ctet", "ssccgl", "rrbntpc"],
  pkdrive: ["inrto", "aerta", "ukcar"],
  appsych: ["apush", "apbio", "sat", "act"],
  apush: ["appsych", "apbio", "sat", "act"],
  apbio: ["appsych", "apush", "sat", "act"],
  phcse: ["phlto", "ibpsclerk", "sscchsl"],
  sbipo: ["ibpspo", "sbiclerk", "ibpsclerk"],
  sbiclerk: ["ibpsclerk", "ibpspo", "ssccgl"],
  ibpsrrb: ["ibpsclerk", "ibpspo", "sbiclerk"],
  biharpolice: ["uppolice", "sscgd", "rrbgroupd"],
  rajpolice: ["uppolice", "ssccgl", "rrbntpc"],
  delhipolice: ["uppolice", "sscgd", "ssccgl"],
  mppolice: ["uppolice", "sscgd", "rrbgroupd"],
  upscse: ["ssccgl", "ibpspo", "sscchsl"],
  ssccpo: ["ssccgl", "delhipolice", "sscchsl"],
  rrbalp: ["rrbgroupd", "rrbntpc", "sscgd"],
  rpfconst: ["rrbgroupd", "rrbntpc", "sscgd"],
  nda: ["agniveer", "agniveervayu", "upscse"],
  agniveer: ["agniveervayu", "nda", "sscgd"],
  agniveervayu: ["agniveer", "nda", "sscgd"],
  apworld: ["apush", "appsych", "apbio", "sat"],
  aplang: ["apush", "appsych", "sat", "act"],
  phlet: ["phcse", "praxis", "ctet"],
  neet: ["jeemain", "mhtcet", "cuet"],
  jeemain: ["mhtcet", "neet", "nda"],
  mhtcet: ["jeemain", "neet", "cuet"],
  cuet: ["jeemain", "neet", "ssccgl"],
  ugcnet: ["ctet", "upscse", "ssccgl"],
  reet: ["ctet", "uptet", "rajpolice"],
  uptet: ["ctet", "reet", "uppolice"],
  aissee: ["jnvst", "nda", "agniveer"],
  apcalcab: ["apbio", "sat", "act", "psat"],
  aphug: ["apworld", "apush", "appsych", "apbio"],
  apgov: ["apush", "apworld", "aphug", "aplang"],
  trcnpqe: ["phlet", "ctet", "praxis"],
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
