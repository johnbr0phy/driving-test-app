import { ExamV2Config, SectionResult } from "../types";
import { percentScale } from "../scales";

// MHT-CET, the Maharashtra State Common Entrance Test Cell's entrance test for
// first-year engineering, technology and pharmacy degrees, PCM group. Per the
// CET Cell's "CET Syllabus and its Marking Scheme" for MHT-CET 2026: questions
// on the Maharashtra SCERT syllabus, about 20% Std XI and 80% Std XII, no
// negative marking, difficulty at par with JEE (Main), mainly application
// based; Paper I Mathematics, 50 MCQs (10 Std XI, 40 Std XII) at 2 marks each,
// 100 marks in 90 minutes; Paper II Physics 50 and Chemistry 50 (10 Std XI
// and 40 Std XII each) at 1 mark each, 100 marks in 90 minutes. The 2026 PCM
// group sat twice: 11 to 20 April and 12 to 20 May 2026 (CET Cell press notes
// of 16 and 19 June 2026); results are percentiles, and guides say the better
// attempt counts for admission. Guides say Physics and Chemistry are taken
// first, then Mathematics, with no going back.
// Here each paper is a timed section at the real pace and half the real
// length: Physics and Chemistry 50 in 45 min (25 each), then Mathematics 25 in
// 45 min. The score is the percent of marks: each section is worth half, as
// each real paper is 100 of 200 marks (a Maths question is worth twice a
// Physics or Chemistry one). Drills: three in Physics, three in Chemistry, two
// in Mathematics, so the dashboard is 10 steps.
// Sources: tools/next100/mhtcet/sources.md.
const minutes = (n: number) => n * 60;

/** Percent of marks: each paper is 100 of the real 200 marks, so each section counts half. */
function percentOfMarks(sections: SectionResult[]): number {
  const scored = sections.filter((s) => s.total > 0);
  if (!scored.length) return 0;
  return Math.round(scored.reduce((a, s) => a + (s.raw / s.total) * 100, 0) / scored.length);
}

export const MHTCET: ExamV2Config = {
  id: "mhtcet",
  slug: "/mht-cet",
  landingPath: "/mht-cet-practice-test",
  name: "MHT-CET Mock Test",
  shortName: "MHT-CET",
  fullName: "MHT-CET (PCM group)",
  tagline: "Physics, Chemistry and Mathematics mock tests at the real pace, on the Maharashtra Std XI and XII syllabus.",
  icon: "graduation",
  theme: { brand: "104 30% 38%", brandDark: "104 30% 28%", brandLight: "104 30% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "pc",
      name: "Paper II: Physics and Chemistry",
      shortName: "Physics and Chemistry",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(45) }],
      directions:
        "50 questions in 45 minutes, the real paper's pace of 100 in 90 minutes: 25 Physics, then 25 Chemistry, 1 mark each. No negative marking, so answer every question. Move freely and flag questions inside this paper. Once it closes you go straight on to Mathematics and cannot come back.",
      scale: percentScale(50),
      domains: ["mhtcetPhyMech", "mhtcetPhyWaves", "mhtcetPhyElec", "mhtcetChemPhys", "mhtcetChemInorg", "mhtcetChemOrg"],
    },
    {
      key: "maths",
      name: "Paper I: Mathematics",
      shortName: "Mathematics",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(45) }],
      directions:
        "25 questions in 45 minutes, the real paper's pace of 50 in 90 minutes. Each Mathematics question is worth 2 marks, so this section counts as much as Physics and Chemistry together. No negative marking: answer every question.",
      scale: percentScale(25),
      domains: ["mhtcetMathAlg", "mhtcetMathCalc"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    mhtcetPhyMech: "Physics: Mechanics and Heat",
    mhtcetPhyWaves: "Physics: Waves, Optics and Modern Physics",
    mhtcetPhyElec: "Physics: Electricity, Magnetism and Electronics",
    mhtcetChemPhys: "Chemistry: Physical Chemistry",
    mhtcetChemInorg: "Chemistry: Inorganic Chemistry",
    mhtcetChemOrg: "Chemistry: Organic Chemistry",
    mhtcetMathAlg: "Maths: Algebra, Trigonometry, Vectors and Geometry",
    mhtcetMathCalc: "Maths: Calculus and Probability",
  },
  drills: [
    { key: "mechanics", name: "Mechanics and Heat", section: "pc", domains: ["mhtcetPhyMech"], blurb: "Rotational dynamics, fluids, kinetic theory and radiation, thermodynamics, oscillations, plus Std XI vectors, errors, motion, gravitation and heat." },
    { key: "waves", name: "Waves, Optics and Modern Physics", section: "pc", domains: ["mhtcetPhyWaves"], blurb: "Stationary waves and beats, wave optics, photoelectric effect, atoms and nuclei, plus Std XI sound and ray optics." },
    { key: "electricity", name: "Electricity and Magnetism", section: "pc", domains: ["mhtcetPhyElec"], blurb: "Electrostatics and capacitors, current electricity, magnetic fields and materials, induction, AC circuits and semiconductor devices." },
    { key: "physical", name: "Physical Chemistry", section: "pc", domains: ["mhtcetChemPhys"], blurb: "Solid state, solutions, ionic equilibria, thermodynamics, electrochemistry, kinetics, plus Std XI mole concept, redox, gases and colloids." },
    { key: "inorganic", name: "Inorganic Chemistry", section: "pc", domains: ["mhtcetChemInorg"], blurb: "Groups 16 to 18, d- and f-block elements, coordination compounds, plus Std XI atomic structure, bonding and groups 1 and 2." },
    { key: "organic", name: "Organic Chemistry", section: "pc", domains: ["mhtcetChemOrg"], blurb: "Halogen derivatives, alcohols, carbonyl compounds, amines, polymers, green chemistry, biomolecules, plus Std XI hydrocarbons." },
    { key: "algebra", name: "Algebra, Vectors and Geometry", section: "maths", domains: ["mhtcetMathAlg"], blurb: "Logic, matrices, trigonometric functions, pair of lines, vectors, line and plane, linear programming, plus Std XI complex numbers, circles and conics." },
    { key: "calculus", name: "Calculus and Probability", section: "maths", domains: ["mhtcetMathCalc"], blurb: "Differentiation and its applications, integration, area, differential equations, probability and binomial distributions, plus Std XI limits." },
  ],
  composite: { name: "Percent of marks", min: 0, max: 100, combine: percentOfMarks },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you cover the syllabus",
    60: "Building up: drill your weakest topics",
    70: "A solid all-round score",
    80: "Strong: aiming for the top colleges",
    90: "Topper territory",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Mock Test 1.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for MHT-CET.",
    ],
    sourceLine: "Original practice questions on the MHT-CET PCM syllabus and pattern. Not affiliated with or endorsed by the State Common Entrance Test Cell, Maharashtra.",
    scoreNote:
      "Percent of marks, with each section worth half, as each real paper is 100 of the 200 marks (a Mathematics question is worth 2 marks, a Physics or Chemistry question 1). Each mock test is half the real length at the real pace: Physics and Chemistry 50 questions in 45 minutes, Mathematics 25 in 45 minutes; the real papers are 100 and 50 questions, 90 minutes each. There is no negative marking, so answer every question. The CET Cell reports results as percentiles across sessions, so treat your goal as a readiness line, not a percentile.",
  },
};
