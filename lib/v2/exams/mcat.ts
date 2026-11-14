import { ExamV2Config } from "../types";
import { curve } from "../scales";

// MCAT (Medical College Admission Test), AAMC. From the AAMC "What's on the
// MCAT Exam?" outline (the PDF the AAMC page links, checked 14 November 2026)
// and the MCAT Essentials for Testing Year 2027: four sections in this order,
// Chemical and Physical Foundations of Biological Systems (59 questions, 95
// minutes), Critical Analysis and Reasoning Skills (53 questions, 90 minutes,
// all passage-based), Biological and Biochemical Foundations of Living
// Systems (59, 95) and Psychological, Social, and Biological Foundations of
// Behavior (59, 95); the science sections mix passage sets with discrete
// questions. Each section is scored 118 to 132 and the total 472 to 528;
// wrong answers count the same as blanks. Three optional breaks; no
// calculator (a periodic table is given in the science sections).
// Outline weights used per test here: Chem/Phys FC4 40%, FC5 60% (12/18 of
// 30); Bio/Biochem FC1 55%, FC2 20%, FC3 25% (16/6/8); Psych/Soc FC6 25%, FC7
// 35%, FC8 20%, FC9 15%, FC10 5% (8/10/6/4/2); CARS Foundations of
// Comprehension 30%, Reasoning Within the Text 30%, Reasoning Beyond the Text
// 40% (8/8/11 of 27), passages half humanities and half social sciences.
// Modelled at about half length at the real pace: science sections 30
// questions in 48 minutes, CARS 27 in 46. Scaled scores come from curve()
// anchors: an estimate, not an AAMC table (the AAMC equates each form and
// publishes none). Sources: tools/next100/mcat/sources.md.
const minutes = (n: number) => n * 60;

const PERIODIC = `**Selected elements (atomic number, symbol, atomic mass)**

| Element | Atomic mass | Element | Atomic mass |
|---|---|---|---|
| 1 H | 1.0 | 15 P | 31.0 |
| 6 C | 12.0 | 16 S | 32.1 |
| 7 N | 14.0 | 17 Cl | 35.5 |
| 8 O | 16.0 | 19 K | 39.1 |
| 9 F | 19.0 | 20 Ca | 40.1 |
| 11 Na | 23.0 | 26 Fe | 55.8 |
| 12 Mg | 24.3 | 29 Cu | 63.5 |

On the real exam a full periodic table is provided. Constants and formulas a question needs are given in its passage or stem.`;

// Science sections: 30 questions. CARS: 27. Anchors are Tigertest's estimate.
const scienceScale = curve(30, [[0, 118], [6, 118], [10, 120], [14, 122], [17, 124], [19, 125], [22, 127], [25, 129], [28, 131], [30, 132]], 1, 1);
const carsScale = curve(27, [[0, 118], [5, 118], [9, 120], [12, 122], [15, 124], [17, 125], [20, 127], [22, 129], [25, 131], [27, 132]], 1, 1);

const SCIENCE_DIRECTIONS =
  "30 questions in 48 minutes, about half of the real section at the same pace. Most questions come in sets that share a passage, shown beside them; the rest stand alone. Each has four choices and one best answer, and a wrong answer costs nothing, so answer every question. There is no calculator: estimate and work by hand. Flag questions and come back to them before time runs out.";

export const MCAT: ExamV2Config = {
  id: "mcat",
  slug: "/mcat",
  landingPath: "/mcat-practice-test",
  icon: "microscope",
  name: "MCAT Practice Test",
  shortName: "MCAT",
  fullName: "Medical College Admission Test (MCAT)",
  tagline: "All four MCAT sections, passage sets and discrete questions, scored 118 to 132 and 472 to 528.",
  theme: { brand: "256 75% 40%", brandDark: "256 75% 30%", brandLight: "256 70% 96%" },
  breakSeconds: 300,
  sections: [
    {
      key: "cp",
      name: "Chemical and Physical Foundations of Biological Systems",
      shortName: "Chem/Phys",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(48) }],
      calculator: false,
      reference: PERIODIC,
      directions: SCIENCE_DIRECTIONS,
      scale: scienceScale,
      domains: ["mcatFc4", "mcatFc5"],
    },
    {
      key: "cars",
      name: "Critical Analysis and Reasoning Skills",
      shortName: "CARS",
      modules: [{ module: 1, questionCount: 27, timeLimit: minutes(46) }],
      calculator: false,
      directions:
        "27 questions on five passages in 46 minutes, about half of the real section at the same pace. Every question is about a passage in the humanities or social sciences, and everything you need is in the passage: no outside knowledge is required. Each question has four choices and one best answer, and a wrong answer costs nothing.",
      scale: carsScale,
      domains: ["mcatCarsComp", "mcatCarsWithin", "mcatCarsBeyond"],
    },
    {
      key: "bb",
      name: "Biological and Biochemical Foundations of Living Systems",
      shortName: "Bio/Biochem",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(48) }],
      calculator: false,
      reference: PERIODIC,
      directions: SCIENCE_DIRECTIONS,
      scale: scienceScale,
      domains: ["mcatFc1", "mcatFc2", "mcatFc3"],
    },
    {
      key: "ps",
      name: "Psychological, Social, and Biological Foundations of Behavior",
      shortName: "Psych/Soc",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(48) }],
      calculator: false,
      directions: SCIENCE_DIRECTIONS,
      scale: scienceScale,
      domains: ["mcatFc6", "mcatFc7", "mcatFc8", "mcatFc9", "mcatFc10"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    mcatFc4: "FC 4: Physical Principles in Living Systems",
    mcatFc5: "FC 5: Chemical Interactions and Reactions",
    mcatCarsComp: "Foundations of Comprehension",
    mcatCarsWithin: "Reasoning Within the Text",
    mcatCarsBeyond: "Reasoning Beyond the Text",
    mcatFc1: "FC 1: Biomolecules",
    mcatFc2: "FC 2: Cells and Microorganisms",
    mcatFc3: "FC 3: Organ Systems",
    mcatFc6: "FC 6: Perception, Cognition and Emotion",
    mcatFc7: "FC 7: Behavior and Behavior Change",
    mcatFc8: "FC 8: Self and Social Interaction",
    mcatFc9: "FC 9: Culture and Social Structure",
    mcatFc10: "FC 10: Social Inequality",
  },
  drills: [
    { key: "physics", name: "Physical Foundations (FC 4)", section: "cp", domains: ["mcatFc4"], blurb: "Motion and energy, fluids and gases, circuits and electrochemistry, light, sound and nuclear decay." },
    { key: "chemistry", name: "Chemical Foundations (FC 5)", section: "cp", domains: ["mcatFc5"], blurb: "Acids, bases and buffers, solubility, bonding, separations, organic and biological molecules, thermodynamics and kinetics." },
    { key: "carsComp", name: "CARS: Foundations of Comprehension", section: "cars", domains: ["mcatCarsComp"], blurb: "Main ideas, what the author says, and what a word or phrase means in context." },
    { key: "carsWithin", name: "CARS: Reasoning Within the Text", section: "cars", domains: ["mcatCarsWithin"], blurb: "How claims, examples and comparisons work inside the argument, and what the author assumes." },
    { key: "carsBeyond", name: "CARS: Reasoning Beyond the Text", section: "cars", domains: ["mcatCarsBeyond"], blurb: "Applying the author's ideas to new cases, and what new facts would strengthen or weaken them." },
    { key: "biomolecules", name: "Biomolecules (FC 1)", section: "bb", domains: ["mcatFc1"], blurb: "Proteins and enzymes, gene expression, inheritance and metabolism." },
    { key: "systems", name: "Cells and Organ Systems (FC 2 and 3)", section: "bb", domains: ["mcatFc2", "mcatFc3"], blurb: "Membranes and organelles, the cell cycle and cancer, bacteria and viruses, and the body's organ systems." },
    { key: "behavior", name: "Mind and Behavior (FC 6 and 7)", section: "ps", domains: ["mcatFc6", "mcatFc7"], blurb: "Sensation and perception, memory, sleep and emotion, disorders, learning and attitude change." },
    { key: "society", name: "Self and Society (FC 8 to 10)", section: "ps", domains: ["mcatFc8", "mcatFc9", "mcatFc10"], blurb: "Identity, social thinking and interaction, culture, demographics and social inequality." },
  ],
  composite: { name: "Total score", min: 472, max: 528, combine: (sections) => sections.reduce((a, s) => a + s.scaled, 0) },
  defaultGoal: 508,
  goalChoices: [496, 500, 504, 508, 512, 516, 520],
  goalNotes: {
    496: "About 124 per section",
    500: "The middle of the scale",
    504: "About 126 per section",
    508: "About 127 per section",
    512: "About 128 per section",
    516: "About 129 per section",
    520: "Aiming very high",
  },
  testLength: "3 hr 10 min",
  copy: {
    heroSubs: [
      "Drill each foundational concept and CARS skill, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for test day.",
    ],
    sourceLine: "Original practice questions and passages written to the AAMC's \"What's on the MCAT Exam?\" content outline. MCAT is a registered trademark of the Association of American Medical Colleges (AAMC), which is not affiliated with and does not endorse Tigertest. Score estimates are unofficial.",
    scoreNote: "Each section is estimated on the 118 to 132 scale from the share you get right, using Tigertest's own conversion, not an AAMC table (the AAMC equates every test form and publishes no conversion), and the four are added for a total from 472 to 528. These practice sections are about half the real length, so the estimate is rougher than a full-length score.",
  },
};
