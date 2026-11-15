import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// DAT (Dental Admission Test), run by the ADA Department of Testing
// Services. From the DAT 2026 Candidate Guide (updated 08/04/2026, checked 14
// November 2026) and the Organic Chemistry specifications in force since
// April 2026: four multiple-choice sections in this order, Survey of the
// Natural Sciences (100 items in 90 minutes: Biology 40, General Chemistry 30,
// Organic Chemistry 30), Perceptual Ability (90 in 60), an optional 30-minute
// break, Reading Comprehension (50 items on three passages in 60) and
// Quantitative Reasoning (40 in 45, with an on-screen calculator). Scores are
// scale scores from 200 to 600 (since March 1, 2025); there is no official
// passing score and no penalty for guessing. The ADA publishes no split
// within Biology, General Chemistry or Organic Chemistry, so the per-topic
// counts here are Tigertest's.
// Perceptual Ability is six picture subtests (apertures, view recognition,
// angle discrimination, paper folding, cube counting, 3D form development)
// and is not modelled. The other three sections run at about half length at
// the real pace: 50 science questions in 45 minutes (biology 20, general
// chemistry 15, organic chemistry 15), 25 reading questions on two passages in
// 30, and 20 quantitative questions in 23. Scores are percent correct: the
// ADA publishes no raw-to-scale conversion. Sources: tools/next100/dat/sources.md.
const minutes = (n: number) => n * 60;

const PERIODIC = `**Selected elements (atomic number, symbol, atomic mass)**

| Element | Atomic mass | Element | Atomic mass |
|---|---|---|---|
| 1 H | 1.0 | 12 Mg | 24.3 |
| 2 He | 4.0 | 15 P | 31.0 |
| 6 C | 12.0 | 16 S | 32.1 |
| 7 N | 14.0 | 17 Cl | 35.5 |
| 8 O | 16.0 | 19 K | 39.1 |
| 9 F | 19.0 | 20 Ca | 40.1 |
| 11 Na | 23.0 | 26 Fe | 55.8 |

On the real exam a full periodic table is available during General Chemistry. Values a question needs are given in its stem.`;

export const DAT: ExamV2Config = {
  id: "dat",
  slug: "/dat",
  landingPath: "/dat-practice-test",
  icon: "microscope",
  name: "Dental Admission Test Practice",
  shortName: "DAT",
  fullName: "Dental Admission Test (DAT)",
  tagline: "DAT biology, general and organic chemistry, reading and quantitative reasoning at the real pace.",
  theme: { brand: "42 100% 20%", brandDark: "42 100% 14%", brandLight: "42 70% 95%" },
  breakSeconds: 10 * 60,
  sections: [
    {
      key: "sns",
      name: "Survey of the Natural Sciences",
      shortName: "Natural Sciences",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(45) }],
      calculator: false,
      reference: PERIODIC,
      breakAfter: true,
      directions:
        "50 questions in 45 minutes, half of the real section at the same pace: 20 biology, then 15 general chemistry, then 15 organic chemistry. Each question has four choices and one best answer, and a wrong answer costs nothing, so answer every question. There is no calculator in this section. Flag questions and come back to them before time runs out.",
      scale: percentScale(50),
      domains: ["datCell", "datDiversity", "datSystems", "datGenetics", "datEvolution", "datGenChem", "datOrgChem"],
    },
    {
      key: "rc",
      name: "Reading Comprehension",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(30) }],
      calculator: false,
      directions:
        "25 questions on two passages in 30 minutes, half of the real section at the same pace. Each passage is about a scientific topic, and everything you need is in the passage: no prior knowledge of the topic is required. The passage stays beside the questions; each question has four choices and one best answer.",
      scale: percentScale(25),
      domains: ["datReading"],
    },
    {
      key: "qr",
      name: "Quantitative Reasoning",
      shortName: "Quantitative",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(23) }],
      calculator: true,
      directions:
        "20 questions in 23 minutes, half of the real section at the same pace: algebra, quantitative comparison, data, probability and statistics, and word problems. A basic calculator is available, as on the real test. Each question has four choices and one best answer.",
      scale: percentScale(20),
      domains: ["datQrAlgebra", "datQrData", "datQrWord"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    datCell: "Cell and Molecular Biology",
    datDiversity: "Diversity of Life",
    datSystems: "Structure and Function of Systems",
    datGenetics: "Genetics",
    datEvolution: "Evolution and Ecology",
    datGenChem: "General Chemistry",
    datOrgChem: "Organic Chemistry",
    datReading: "Reading Comprehension",
    datQrAlgebra: "Algebra and Quantitative Comparison",
    datQrData: "Data, Probability and Statistics",
    datQrWord: "Applied Problems",
  },
  drills: [
    { key: "cellsGenetics", name: "Cells and Genetics", section: "sns", domains: ["datCell", "datGenetics"], blurb: "Metabolism and enzymes, membranes and organelles, the cell cycle, molecular and classical genetics, gene expression and biotechnology." },
    { key: "organisms", name: "Organisms, Systems and Ecology", section: "sns", domains: ["datDiversity", "datSystems", "datEvolution"], blurb: "Viruses, bacteria, fungi, plants and animals, the body's organ systems, natural selection, population genetics and ecology." },
    { key: "genChem", name: "General Chemistry", section: "sns", domains: ["datGenChem"], blurb: "Stoichiometry, gases, solutions, acids and bases, equilibria, thermochemistry, kinetics, redox, atomic structure and nuclear reactions." },
    { key: "orgChem", name: "Organic Chemistry", section: "sns", domains: ["datOrgChem"], blurb: "Mechanisms, one-step and multi-step synthesis, acidity and basicity, spectroscopy and lab techniques, and structure and stereochemistry." },
    { key: "reading", name: "Reading Comprehension", section: "rc", domains: ["datReading"], blurb: "Main ideas, details, inferences, word meaning and the author's purpose in scientific passages." },
    { key: "algebra", name: "Algebra and Comparisons", section: "qr", domains: ["datQrAlgebra"], blurb: "Equations and inequalities, exponents and scientific notation, absolute value, ratios, graphs and quantitative comparison." },
    { key: "dataWord", name: "Data and Word Problems", section: "qr", domains: ["datQrData", "datQrWord"], blurb: "Means, medians and spread, probability and counting, data sufficiency, and rate, mixture, percent and unit problems." },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [60, 65, 70, 75, 80, 85, 90],
  goalNotes: {
    60: "A first target",
    65: "Building a base",
    70: "Solid footing",
    75: "A strong practice score",
    80: "Very strong",
    85: "Aiming high",
    90: "Aiming very high",
  },
  testLength: "1 hr 38 min",
  copy: {
    heroSubs: [
      "Drill biology, chemistry, reading and math, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for test day.",
    ],
    sourceLine: "Original practice questions and passages written to the ADA's DAT test specifications in the DAT Candidate Guide. DAT is a registered trademark of the American Dental Association (ADA), which is not affiliated with and does not endorse Tigertest. Scores are practice scores, not DAT scale scores.",
    scoreNote: "Scores here are percent correct, by section and overall. The real DAT reports scale scores from 200 to 600 by equating each test form, and the ADA publishes no conversion from questions right, so no scale score is estimated. There is no official passing score: each dental program decides what it accepts. The Perceptual Ability Test is not included.",
  },
};
