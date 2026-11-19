import { ExamV2Config, SectionResult } from "../types";
import { percentScale } from "../scales";

// KCET (UGCET), the Karnataka Examinations Authority's Common Entrance Test
// for professional courses in Karnataka, engineering stream (Physics,
// Chemistry, Mathematics). Per the KEA Information Bulletin for UGCET-2026
// (17 January 2026): question papers are based on the First and Second PUC
// syllabi prescribed by Karnataka's Department of Pre-University Education
// (reviewed for CET-2026 by the department's subject experts); four papers,
// Physics and Chemistry on the first day, Mathematics and Biology on the
// second, each 60 one-mark multiple-choice questions with four options in 80
// minutes, on OMR sheets; no negative marking, but multiple answers to one
// question score nothing. Engineering ranks take CET and qualifying-exam PCM
// marks in equal proportion. Biology (for farm science, veterinary, nursing
// and pharmacy) is not modelled.
// Here each paper is its own timed section at half the real length and the
// real pace: 30 questions in 40 minutes, with a short break between papers.
// Questions are written on the current NCERT textbooks (Reprint 2026-27),
// which Karnataka's PU colleges use for these subjects. The score is the
// percent of marks, the three papers counting equally (60 marks each).
// Sources: tools/build-run-2026-11-19/kcet/sources.md.
const minutes = (n: number) => n * 60;

/** Percent of marks: each paper is 60 of the 180 PCM marks, so each section counts a third. */
function percentOfMarks(sections: SectionResult[]): number {
  const scored = sections.filter((s) => s.total > 0);
  if (!scored.length) return 0;
  return Math.round(scored.reduce((a, s) => a + (s.raw / s.total) * 100, 0) / scored.length);
}

const DIRECTIONS =
  "30 questions in 40 minutes, the real paper's pace of 60 in 80 minutes. One mark each, four options, no negative marking, so answer every question. Move freely and flag questions inside this paper. Once it closes you cannot come back to it.";

export const KCET: ExamV2Config = {
  id: "kcet",
  slug: "/kcet",
  landingPath: "/kcet-practice-test",
  name: "KCET Mock Test",
  shortName: "KCET",
  fullName: "KCET (Karnataka CET), engineering stream",
  tagline: "Physics, Chemistry and Mathematics mock tests at the real pace, on the I and II PUC syllabus.",
  icon: "graduation",
  theme: { brand: "52 100% 18%", brandDark: "52 100% 12%", brandLight: "52 100% 95%" },
  breakSeconds: 300,
  sections: [
    {
      key: "phy",
      name: "Physics",
      shortName: "Physics",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(40) }],
      directions: DIRECTIONS,
      scale: percentScale(30),
      domains: ["kcetPhyMech", "kcetPhyThermo", "kcetPhyElec", "kcetPhyModern"],
    },
    {
      key: "chem",
      name: "Chemistry",
      shortName: "Chemistry",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(40) }],
      directions: DIRECTIONS,
      scale: percentScale(30),
      domains: ["kcetChemPhys", "kcetChemInorg", "kcetChemOrg"],
    },
    {
      key: "math",
      name: "Mathematics",
      shortName: "Mathematics",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(40) }],
      directions: DIRECTIONS,
      scale: percentScale(30),
      domains: ["kcetMathAlg", "kcetMathCalc", "kcetMathGeom", "kcetMathStats"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    kcetPhyMech: "Physics: Mechanics",
    kcetPhyThermo: "Physics: Matter, Heat and Waves",
    kcetPhyElec: "Physics: Electricity and Magnetism",
    kcetPhyModern: "Physics: Optics and Modern Physics",
    kcetChemPhys: "Chemistry: Physical Chemistry",
    kcetChemInorg: "Chemistry: Atomic Structure, Bonding and Inorganic",
    kcetChemOrg: "Chemistry: Organic Chemistry",
    kcetMathAlg: "Maths: Algebra",
    kcetMathCalc: "Maths: Calculus",
    kcetMathGeom: "Maths: Trigonometry, Vectors and Geometry",
    kcetMathStats: "Maths: Statistics, Probability and LPP",
  },
  drills: [
    { key: "mechanics", name: "Mechanics", section: "phy", domains: ["kcetPhyMech"], blurb: "Units, motion in a line and a plane, laws of motion, work and energy, rotation and gravitation (I PUC)." },
    { key: "matter", name: "Matter, Heat and Waves", section: "phy", domains: ["kcetPhyThermo"], blurb: "Solids and fluids, thermal properties, thermodynamics, kinetic theory, oscillations and waves (I PUC)." },
    { key: "electricity", name: "Electricity and Magnetism", section: "phy", domains: ["kcetPhyElec"], blurb: "Charges and fields, potential and capacitance, current, magnetism, induction, AC and EM waves (II PUC)." },
    { key: "modern", name: "Optics and Modern Physics", section: "phy", domains: ["kcetPhyModern"], blurb: "Ray and wave optics, dual nature, atoms, nuclei and semiconductor electronics (II PUC)." },
    { key: "physical", name: "Physical Chemistry", section: "chem", domains: ["kcetChemPhys"], blurb: "Mole concept, thermodynamics, equilibrium and redox (I PUC), solutions, electrochemistry and kinetics (II PUC)." },
    { key: "inorganic", name: "Structure, Bonding and Inorganic", section: "chem", domains: ["kcetChemInorg"], blurb: "Atomic structure, periodicity and bonding (I PUC), d- and f-block elements and coordination compounds (II PUC)." },
    { key: "organic", name: "Organic Chemistry", section: "chem", domains: ["kcetChemOrg"], blurb: "Basic principles and hydrocarbons (I PUC), haloalkanes to amines and biomolecules (II PUC)." },
    { key: "algebra", name: "Algebra", section: "math", domains: ["kcetMathAlg"], blurb: "Sets, relations and functions, complex numbers, permutations, binomial theorem, sequences, matrices and determinants." },
    { key: "calculus", name: "Calculus", section: "math", domains: ["kcetMathCalc"], blurb: "Limits, continuity and differentiability, applications of derivatives, integrals, area and differential equations." },
    { key: "geometry", name: "Trigonometry, Vectors and Geometry", section: "math", domains: ["kcetMathGeom"], blurb: "Trigonometric and inverse trigonometric functions, straight lines, conic sections, vectors and 3D geometry." },
    { key: "stats", name: "Statistics, Probability and LPP", section: "math", domains: ["kcetMathStats"], blurb: "Measures of dispersion, probability, conditional probability and Bayes, and linear programming." },
  ],
  composite: { name: "Percent of marks", min: 0, max: 100, combine: percentOfMarks },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you cover the syllabus",
    60: "Building up: drill your weakest topics",
    70: "A solid all-round score",
    80: "Strong: aiming for a top engineering rank",
    90: "Topper territory",
  },
  testLength: "2 hr 10 min",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full mock test.",
      "Master each drill first.",
      "Take Mock Test 1 to see your score.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for KCET.",
    ],
    sourceLine: "Original practice questions on the KCET Physics, Chemistry and Mathematics syllabus and pattern. Not affiliated with or endorsed by the Karnataka Examinations Authority.",
    scoreNote:
      "Percent of marks, with Physics, Chemistry and Mathematics counting equally, as each real paper is 60 of the 180 PCM marks. Each mock test is half the real length at the real pace: 30 questions in 40 minutes per subject; the real papers are 60 questions in 80 minutes each. There is no negative marking, so answer every question. KEA ranks engineering candidates on CET and II PUC PCM marks in equal proportion, so treat your goal as a readiness line, not a rank.",
  },
};
