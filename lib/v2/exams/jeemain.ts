import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// JEE (Main) Paper 1 (B.E./B.Tech.), National Testing Agency, India. Pattern
// per the JEE (Main) 2027 Information Bulletin (published 24 October 2026;
// Session 1 on 20 to 24 and 28 January 2027, Session 2 on 2 to 7 April
// 2027): a computer-based test of 75 questions for 300 marks in 3 hours, in
// Mathematics, Physics and Chemistry with equal weight. Each subject has
// Section A, 20 multiple-choice questions, and Section B, 5 questions whose
// answer is a numerical value entered as an integer (rounded to the nearest
// integer) on an on-screen keypad. Every question is compulsory and marked
// +4 for a correct answer and -1 for a wrong one, in both sections; nothing
// for an unanswered question. Raw scores are converted to NTA scores
// (percentiles) per session, and the better of the two sessions counts. No
// calculator. Offered in 13 languages.
// Here each practice test is the full paper at full length: three subjects of
// 25 questions (20 + 5), each its own 60-minute section, in the bulletin's
// order. The real paper runs on one 3-hour clock with free movement between
// subjects; here a closed subject cannot be reopened. Drills: three per
// subject, so the dashboard is 11 steps. The score is percent correct;
// negative marking and NTA scores are explained in scoreNote and on the
// landing, not applied.
// Sources: tools/next100/jeemain/sources.md.
const minutes = (n: number) => n * 60;

const SECTION_B =
  "The last 5 questions are Section B: type the answer as a whole number on the keypad (the real exam asks for the integer value, rounded to the nearest integer).";

export const JEEMAIN: ExamV2Config = {
  id: "jeemain",
  slug: "/jee-main",
  landingPath: "/jee-main-practice-test",
  name: "JEE Main Mock Test",
  shortName: "JEE Main",
  fullName: "JEE (Main) Paper 1 (B.E./B.Tech.)",
  tagline: "75 questions in 3 hours: Mathematics, Physics and Chemistry, with numerical value questions.",
  icon: "graduation",
  theme: { brand: "18 30% 32%", brandDark: "18 30% 22%", brandLight: "18 30% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "maths",
      name: "Mathematics",
      shortName: "Maths",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(60) }],
      directions:
        "25 questions in 60 minutes, a third of the real 3-hour paper: 20 multiple-choice questions (Section A) on algebra, calculus, coordinate geometry, vectors, trigonometry, statistics and probability, then 5 numerical value questions. " +
        SECTION_B +
        " No calculator. Move freely and flag questions inside this subject; once it closes you go on to Physics.",
      scale: percentScale(25),
      domains: ["jeemainAlgebra", "jeemainCalculus", "jeemainCoordGeo"],
    },
    {
      key: "phy",
      name: "Physics",
      shortName: "Physics",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(60) }],
      directions:
        "25 questions in 60 minutes: 20 multiple-choice questions on mechanics, electricity and magnetism, heat, waves, optics and modern physics, then 5 numerical value questions. " +
        SECTION_B +
        " Take g = 10 m/s² unless a question says otherwise.",
      scale: percentScale(25),
      domains: ["jeemainMechanics", "jeemainElectro", "jeemainOpticsModern"],
    },
    {
      key: "chem",
      name: "Chemistry",
      shortName: "Chemistry",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(60) }],
      directions:
        "25 questions in 60 minutes: 20 multiple-choice questions on physical, inorganic and organic chemistry, then 5 numerical value questions. " +
        SECTION_B +
        " The real paper takes 1 mark off for each wrong answer in both sections; this mock scores percent correct, so note which answers were guesses.",
      scale: percentScale(25),
      domains: ["jeemainPhysical", "jeemainInorganic", "jeemainOrganic"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    jeemainAlgebra: "Maths: Algebra",
    jeemainCalculus: "Maths: Calculus",
    jeemainCoordGeo: "Maths: Coordinate Geometry, Vectors, Trigonometry and Probability",
    jeemainMechanics: "Physics: Mechanics",
    jeemainElectro: "Physics: Electricity and Magnetism",
    jeemainOpticsModern: "Physics: Heat, Waves, Optics and Modern Physics",
    jeemainPhysical: "Chemistry: Physical",
    jeemainInorganic: "Chemistry: Inorganic",
    jeemainOrganic: "Chemistry: Organic",
  },
  drills: [
    { key: "algebra", name: "Algebra", section: "maths", domains: ["jeemainAlgebra"], blurb: "Sets and relations, complex numbers, quadratic equations, matrices and determinants, permutations and combinations, the binomial theorem, sequences and series." },
    { key: "calculus", name: "Calculus", section: "maths", domains: ["jeemainCalculus"], blurb: "Functions, limits, continuity and differentiability, derivatives and their applications, integrals, areas and differential equations." },
    { key: "coordgeo", name: "Coordinate Geometry and More", section: "maths", domains: ["jeemainCoordGeo"], blurb: "Straight lines, circles and conics, 3D geometry, vectors, trigonometry, statistics and probability." },
    { key: "mechanics", name: "Mechanics", section: "phy", domains: ["jeemainMechanics"], blurb: "Units and errors, kinematics, laws of motion, work and energy, rotation, gravitation, properties of matter and oscillations." },
    { key: "electro", name: "Electricity and Magnetism", section: "phy", domains: ["jeemainElectro"], blurb: "Electrostatics, capacitors, current electricity, magnetic effects of current, electromagnetic induction, AC and EM waves." },
    { key: "opticsmodern", name: "Heat, Optics and Modern Physics", section: "phy", domains: ["jeemainOpticsModern"], blurb: "Thermodynamics and kinetic theory, waves and sound, ray and wave optics, photoelectric effect, atoms, nuclei and semiconductors." },
    { key: "physical", name: "Physical Chemistry", section: "chem", domains: ["jeemainPhysical"], blurb: "Mole concept, atomic structure, bonding, thermodynamics, solutions, equilibrium, electrochemistry and kinetics." },
    { key: "inorganic", name: "Inorganic Chemistry", section: "chem", domains: ["jeemainInorganic"], blurb: "Periodic trends, p-block, d- and f-block elements and coordination compounds." },
    { key: "organic", name: "Organic Chemistry", section: "chem", domains: ["jeemainOrganic"], blurb: "Nomenclature, electronic effects, hydrocarbons, haloalkanes, oxygen and nitrogen compounds, biomolecules and tests for elements." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 60,
  goalChoices: [30, 40, 50, 60, 70, 80],
  goalNotes: {
    30: "A first target while you work through the syllabus",
    40: "Building up: drill your weakest chapters",
    50: "Solid: aim to keep wrong answers low as well",
    60: "Strong across all three subjects",
    70: "Very strong: high percentile territory",
    80: "Topper territory",
  },
  testLength: "3 hr",
  copy: {
    heroSubs: [
      "Drill each chapter group, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Mock Test 1.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for JEE Main.",
    ],
    sourceLine: "Original practice questions on the JEE (Main) Paper 1 syllabus and pattern. Not affiliated with or endorsed by the National Testing Agency or the Ministry of Education.",
    scoreNote:
      "Percent correct across all three subjects. Each mock test is the real length and pace: 75 questions in 3 hours, 25 per subject (20 multiple choice and 5 numerical value). The real paper gives 4 marks for a correct answer and takes 1 mark off for a wrong one in both sections, out of 300; this mock does not deduct marks, so count your guesses. NTA converts raw marks into NTA scores (percentiles) for each session, and the cut-offs change every year, so treat your goal as a readiness line.",
  },
};
