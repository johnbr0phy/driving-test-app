import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// GCSE Combined Science (England), Foundation tier focus. The content is the
// DfE GCSE combined science subject content (biology, chemistry, physics),
// which every exam board's double-award specification follows. The real
// qualification is six written papers, two per science (on the largest
// specification each is 1 hour 15 minutes and 70 marks, a sixth of the
// grade), graded 9-9 to 1-1 with Foundation tier capped at 5-5. Calculators
// are allowed throughout, and for the 2025 to 2027 exams (DfE decision,
// October 2024) every candidate is given a physics equation sheet, so every
// equation is stated in the question here. Required practicals are tested in
// writing, so they appear as method, variable and results questions.
// A practice test here is the three sciences, one 20-question timed section
// each, with drills split the way the papers are (paper 1 and paper 2 topics
// per science). Practice Test 2 is held out of the drills. Scores are percent
// correct: grade boundaries change every year. Bank built by
// tools/gcsescience/build.py; Basics in data/v2/basics/gcsescience.json.
const minutes = (n: number) => n * 60;

const PHYSICS_EQUATIONS = `**Physics equations**

kinetic energy = 0.5 × mass × speed²

gravitational potential energy = mass × gravitational field strength × height

change in thermal energy = mass × specific heat capacity × temperature change

power = energy transferred ÷ time

efficiency = useful output energy ÷ total input energy

charge flow = current × time

potential difference = current × resistance

power = potential difference × current

energy transferred = charge flow × potential difference

density = mass ÷ volume

energy for a change of state = mass × specific latent heat

weight = mass × gravitational field strength

work done = force × distance

force = spring constant × extension

distance travelled = speed × time

acceleration = change in velocity ÷ time taken

resultant force = mass × acceleration

wave speed = frequency × wavelength

period = 1 ÷ frequency

On Earth, gravitational field strength g = 9.8 N/kg.`;

export const GCSESCIENCE: ExamV2Config = {
  id: "gcsescience",
  slug: "/gcse-science",
  landingPath: "/gcse-combined-science-practice-test",
  name: "GCSE Combined Science Practice Test",
  shortName: "GCSE Science",
  fullName: "GCSE Combined Science",
  tagline: "Biology, chemistry and physics for GCSE Combined Science, with the maths skills taught first.",
  icon: "microscope",
  theme: { brand: "103 58% 30%", brandDark: "103 58% 20%", brandLight: "103 78% 96%" },
  breakSeconds: 300,
  breakNote: "The real papers are sat on different days.",
  sections: [
    {
      key: "biology",
      name: "Biology",
      shortName: "Biology",
      calculator: true,
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(25) }],
      directions:
        "Cells, organisation, infection and response, and bioenergetics (paper 1 topics), then homeostasis, inheritance, variation and evolution, and ecology (paper 2 topics). Some questions ask you to choose two answers, put steps in order or type a number. A calculator is allowed.",
      scale: percentScale(20),
      domains: ["gcsescienceBio1", "gcsescienceBio2"],
    },
    {
      key: "chemistry",
      name: "Chemistry",
      shortName: "Chemistry",
      calculator: true,
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(25) }],
      directions:
        "Atomic structure, bonding, quantitative chemistry, chemical changes and energy changes (paper 1 topics), then rates, organic chemistry, chemical analysis, the atmosphere and using resources (paper 2 topics). Relative atomic masses are given in each question. A calculator is allowed.",
      scale: percentScale(20),
      domains: ["gcsescienceChem1", "gcsescienceChem2"],
    },
    {
      key: "physics",
      name: "Physics",
      shortName: "Physics",
      calculator: true,
      reference: PHYSICS_EQUATIONS,
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(25) }],
      directions:
        "Energy, electricity, particles and atomic structure (paper 1 topics), then forces, waves and magnetism (paper 2 topics). Each calculation gives you the equation, as the equation sheet does in the real exam, and the full sheet is in the tools drawer. Type numbers only, with no units or commas.",
      scale: percentScale(20),
      domains: ["gcsesciencePhys1", "gcsesciencePhys2"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    gcsescienceBio1: "Cells, Organisation and Disease",
    gcsescienceBio2: "Control, Genetics and Ecology",
    gcsescienceChem1: "Atoms, Bonding and Reactions",
    gcsescienceChem2: "Rates, Organic and the Earth",
    gcsesciencePhys1: "Energy, Electricity and Particles",
    gcsesciencePhys2: "Forces, Waves and Magnetism",
  },
  // Six drills, one per paper's worth of topics in each science. The four
  // with a maths skill behind them open with Basics (magnification and
  // variables, relative formula mass and balancing, equations and units,
  // rearranging), so the dashboard is 6 drills + 4 Basics steps + 2 tests.
  drillSize: 20,
  drills: [
    { key: "bio1", name: "Cells, Organisation and Disease", section: "biology", domains: ["gcsescienceBio1"], blurb: "Cells and microscopy, transport in cells, enzymes and digestion, the heart and lungs, plants, pathogens and medicines, photosynthesis and respiration.", basics: ["gcsesciMagnification", "gcsesciVariables"] },
    { key: "bio2", name: "Control, Genetics and Ecology", section: "biology", domains: ["gcsescienceBio2"], blurb: "The nervous system, hormones and diabetes, reproduction, genetic crosses, evolution and classification, food chains, sampling and biodiversity." },
    { key: "chem1", name: "Atoms, Bonding and Reactions", section: "chemistry", domains: ["gcsescienceChem1"], blurb: "Atoms and the periodic table, ionic, covalent and metallic bonding, relative formula mass, acids and salts, electrolysis and energy changes.", basics: ["gcsesciRelativeMass", "gcsesciBalancing"] },
    { key: "chem2", name: "Rates, Organic and the Earth", section: "chemistry", domains: ["gcsescienceChem2"], blurb: "Rates and equilibrium, crude oil and cracking, chromatography and gas tests, the atmosphere and climate, and drinking water." },
    { key: "phys1", name: "Energy, Electricity and Particles", section: "physics", domains: ["gcsesciencePhys1"], blurb: "Energy stores and efficiency, circuits and mains electricity, density and changes of state, and nuclear radiation.", basics: ["gcsesciSubstitute", "gcsesciPrefixes"] },
    { key: "phys2", name: "Forces, Waves and Magnetism", section: "physics", domains: ["gcsesciencePhys2"], blurb: "Forces and Newton's laws, speed and acceleration, stopping distances, waves and the electromagnetic spectrum, and magnets.", basics: ["gcsesciRearrange"] },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 60,
  goalChoices: [40, 50, 60, 70, 80, 90],
  goalNotes: {
    40: "40% practice score target",
    50: "50% practice score target",
    60: "60% practice score target, a solid Foundation aim",
    70: "70% practice score target",
    80: "80% practice score target",
    90: "90% practice score target",
  },
  testLength: "1 hr 25 min",
  copy: {
    heroSubs: [
      "Learn the maths skills, then drill each science.",
      "Master each drill first.",
      "Halfway there. Try a full practice test.",
      "Hit your goal on the full test.",
      "Goal hit. You're ready for your mocks.",
    ],
    sourceLine: "Based on the DfE GCSE combined science subject content. Original questions; not affiliated with the Department for Education, Ofqual or any exam board.",
    scoreNote: "Scores here are percent correct per science. Real GCSE grades come from six longer papers, and grade boundaries change every year, so treat this as a guide to which topics need work.",
  },
};
