import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// NEET (UG), the National Eligibility cum Entrance Test (Undergraduate), run
// by the National Testing Agency for admission to MBBS, BDS, AYUSH and other
// undergraduate medical courses. Per the NEET (UG) 2026 Information Bulletin
// (pattern as per NMC letter of 05.12.2025): one pen-and-paper paper of 180
// compulsory four-option questions in 180 minutes, Physics 45, Chemistry 45
// and Biology (Botany and Zoology) 90, 720 marks; +4 for a correct answer, -1
// for a wrong one, 0 unanswered; 13 languages. The 3 May 2026 sitting was
// cancelled and re-held on 21 June 2026 in a 2:00 to 5:15 PM window (195
// minutes including examination formalities, NTA notices of 15 May and 12
// June 2026). Admission needs at least the 50th percentile (40th for SC, ST,
// OBC-NCL; 45th for UR/EWS PwBD), per the bulletin.
// Here the paper is modelled at 100 questions (25 Physics, 25 Chemistry, 50
// Biology, the real 1 : 1 : 2 split) at about a minute a question, as three
// timed sections in the real order. The real paper has no clock per subject;
// the 30 / 25 / 45 minute split is Tigertest's, giving Physics the extra time
// most candidates need. Drills: two in Physics, three in Chemistry, four in
// Biology, so the dashboard is 11 steps. The score is percent correct;
// negative marking is explained in scoreNote and on the landing, not applied.
// Syllabus: NMC NEET (UG) 2026 syllabus (NCERT classes 11 and 12).
// Sources: tools/next100/neet/sources.md.
const minutes = (n: number) => n * 60;

export const NEET: ExamV2Config = {
  id: "neet",
  slug: "/neet",
  landingPath: "/neet-practice-test",
  name: "NEET Mock Test",
  shortName: "NEET",
  fullName: "NEET (UG)",
  tagline: "Physics, Chemistry and Biology on the NCERT syllabus, at the real pace, with negative marking explained.",
  icon: "stethoscope",
  theme: { brand: "330 38% 40%", brandDark: "330 38% 30%", brandLight: "330 38% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "phy",
      name: "Physics",
      shortName: "Physics",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(30) }],
      directions:
        "25 questions in 30 minutes: mechanics, properties of matter, heat and waves, then electricity, magnetism, optics and modern physics. No calculator, as in the real paper. The real NEET is one 180-minute paper with no clock per subject; this mock times each subject so you practise pacing. Move freely and flag questions inside this section. Once it closes you go straight on to Chemistry and cannot come back.",
      scale: percentScale(25),
      domains: ["neetMech", "neetElectro"],
    },
    {
      key: "chem",
      name: "Chemistry",
      shortName: "Chemistry",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(25) }],
      directions:
        "25 questions in 25 minutes: physical, inorganic and organic chemistry. Move freely and flag questions inside this section. Once it closes you go straight on to Biology and cannot come back.",
      scale: percentScale(25),
      domains: ["neetPhysChem", "neetInorg", "neetOrg"],
    },
    {
      key: "bio",
      name: "Biology (Botany and Zoology)",
      shortName: "Biology",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(45) }],
      directions:
        "50 questions in 45 minutes: diversity, cells and plant physiology, reproduction and genetics, biology in human welfare and ecology, then human physiology. The real paper takes off one mark for each wrong answer and gives four for each right one; this mock scores percent correct, so note which answers were guesses.",
      scale: percentScale(50),
      domains: ["neetDiversity", "neetGenetics", "neetEcology", "neetHumanPhys"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    neetMech: "Physics: Mechanics, Heat and Waves",
    neetElectro: "Physics: Electricity, Optics and Modern Physics",
    neetPhysChem: "Chemistry: Physical Chemistry",
    neetInorg: "Chemistry: Inorganic Chemistry",
    neetOrg: "Chemistry: Organic Chemistry",
    neetDiversity: "Biology: Diversity, Cells and Plant Physiology",
    neetGenetics: "Biology: Reproduction, Genetics and Evolution",
    neetEcology: "Biology: Human Welfare, Biotechnology and Ecology",
    neetHumanPhys: "Biology: Human Physiology",
  },
  drills: [
    { key: "mechanics", name: "Mechanics, Heat and Waves", section: "phy", domains: ["neetMech"], blurb: "Units and dimensions, motion, laws of motion, work and energy, rotation, gravitation, properties of matter, thermodynamics, kinetic theory, oscillations and waves." },
    { key: "electro", name: "Electricity, Optics and Modern Physics", section: "phy", domains: ["neetElectro"], blurb: "Electrostatics, current electricity, magnetism, induction and AC, electromagnetic waves, optics, dual nature, atoms and nuclei, and semiconductors." },
    { key: "physchem", name: "Physical Chemistry", section: "chem", domains: ["neetPhysChem"], blurb: "Mole concept, atomic structure, bonding, thermodynamics, solutions, equilibrium, redox and electrochemistry, and chemical kinetics." },
    { key: "inorganic", name: "Inorganic Chemistry", section: "chem", domains: ["neetInorg"], blurb: "Periodic trends, p-block elements, d- and f-block elements, coordination compounds, salt analysis and titrations." },
    { key: "organic", name: "Organic Chemistry", section: "chem", domains: ["neetOrg"], blurb: "Purification and analysis, basic principles, hydrocarbons, halogen, oxygen and nitrogen compounds, biomolecules and practical organic chemistry." },
    { key: "diversity", name: "Diversity, Cells and Plant Physiology", section: "bio", domains: ["neetDiversity"], blurb: "Classification, the plant and animal kingdoms, plant morphology and anatomy, cell structure, biomolecules, cell division, photosynthesis, respiration and plant growth." },
    { key: "genetics", name: "Reproduction, Genetics and Evolution", section: "bio", domains: ["neetGenetics"], blurb: "Reproduction in flowering plants and humans, reproductive health, Mendelian genetics, the molecular basis of inheritance and evolution." },
    { key: "ecology", name: "Human Welfare, Biotechnology and Ecology", section: "bio", domains: ["neetEcology"], blurb: "Human diseases and immunity, microbes, recombinant DNA and its uses, populations, ecosystems and biodiversity." },
    { key: "humanphys", name: "Human Physiology", section: "bio", domains: ["neetHumanPhys"], blurb: "Animal tissues, breathing, blood and circulation, excretion, locomotion, nerves and hormones." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you work through the syllabus",
    60: "Building up: keep drilling your weakest chapters",
    70: "A solid target with a margin, once wrong answers cost marks",
    80: "Strong: aiming for a government medical college seat",
    90: "Topper territory",
  },
  testLength: "1 hr 40 min",
  copy: {
    heroSubs: [
      "Drill each chapter group, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Mock Test 1.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for NEET.",
    ],
    sourceLine: "Original practice questions on the NEET (UG) syllabus and pattern. Not affiliated with or endorsed by the National Testing Agency or the National Medical Commission.",
    scoreNote:
      "Percent correct across all three subjects. Each mock test is 100 questions at about the real pace (Physics 25 in 30 minutes, Chemistry 25 in 25 minutes, Biology 50 in 45 minutes), a little over half the real length; the real paper is 180 questions for 720 marks in 3 hours, with no clock per subject. The real exam gives 4 marks for a right answer and takes off 1 for a wrong one, so guess only when you can rule out at least one option. Admission needs at least the 50th percentile (40th for SC, ST and OBC-NCL candidates), and the marks that make that percentile change every year, so treat your goal as a readiness line.",
  },
};
