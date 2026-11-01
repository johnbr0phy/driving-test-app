import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// JAMB UTME Chemistry (Joint Admissions and Matriculation Board, Nigeria).
// The UTME is one computer-based sitting of four subjects, 180 objective
// questions in 2 hours: Use of English (compulsory) 60 questions and three
// other subjects of 40 each, every subject scored out of 100, so 400 in all.
// Chemistry follows JAMB's UTME Chemistry syllabus, 18 topics: separation of
// mixtures, chemical combination, kinetic theory and gas laws, atomic
// structure and bonding, nuclear chemistry, solubility, environmental
// pollution, acids, bases and salts, redox, electrolysis, energy changes,
// rates, equilibria, non-metals, metals, organic compounds, chemistry and
// industry, and astronomical chemistry. JAMB publishes no topic weights, so
// the per-test split is Tigertest's (8 drills: 4/5/6/5/6/5/4/5 of 40).
// One section of 40 four-option questions in 30 minutes, the pro rata share
// of the 2 hours, with free navigation as on the real CBT. Guides say the CBT
// shows a basic on-screen calculator for calculation subjects; Tigertest's
// calculator is on. Two practice tests, Test 2 held out; 10 dashboard steps.
// Percent score out of 100, like the subject score.
// Sources: tools/next100/jambchem/sources.md.
const minutes = (n: number) => n * 60;

export const JAMBCHEM: ExamV2Config = {
  id: "jambchem",
  slug: "/jamb-chemistry",
  landingPath: "/jamb-chemistry-practice-test",
  name: "JAMB Chemistry Practice Test",
  shortName: "JAMB Chemistry",
  fullName: "JAMB UTME Chemistry",
  tagline: "40 questions in 30 minutes on the whole UTME Chemistry syllabus, with every calculation worked out, scored out of 100.",
  icon: "microscope",
  theme: { brand: "186 15% 42%", brandDark: "186 15% 32%", brandLight: "186 15% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "chem",
      name: "Chemistry",
      shortName: "Chemistry",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(30) }],
      calculator: true,
      directions:
        "40 questions in 30 minutes, the share of the UTME's 2 hours that one 40-question subject gets when you split the time by questions. The questions follow the syllabus order, from separation of mixtures to organic chemistry, and give any relative atomic masses and constants you need. You can move between questions and flag them, as on the real CBT. Wrong answers lose no marks here, so answer every question.",
      scale: percentScale(40),
      domains: [
        "jambchemMatter",
        "jambchemStoich",
        "jambchemAtomic",
        "jambchemAcids",
        "jambchemPhysical",
        "jambchemNonmetals",
        "jambchemMetals",
        "jambchemOrganic",
      ],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    jambchemMatter: "Separation of Mixtures, Kinetic Theory and Gas Laws",
    jambchemStoich: "Chemical Combination, the Mole and Solubility",
    jambchemAtomic: "Atomic Structure, Bonding and Nuclear Chemistry",
    jambchemAcids: "Acids, Bases, Salts and Redox",
    jambchemPhysical: "Electrolysis, Energy, Rates and Equilibrium",
    jambchemNonmetals: "Non-metals, Water, Air and Pollution",
    jambchemMetals: "Metals, Industry and Astronomical Chemistry",
    jambchemOrganic: "Organic Chemistry",
  },
  drills: [
    { key: "matter", name: "Mixtures and Gas Laws", section: "chem", domains: ["jambchemMatter"], blurb: "Separation methods, purity, physical and chemical change, kinetic theory, and the gas laws of Boyle, Charles, Graham, Dalton and Avogadro." },
    { key: "stoich", name: "The Mole and Solubility", section: "chem", domains: ["jambchemStoich"], blurb: "Laws of chemical combination, formulae and equations, mole calculations, empirical formulae, solubility, suspensions and colloids." },
    { key: "atomic", name: "Atoms, Bonding and Nuclear", section: "chem", domains: ["jambchemAtomic"], blurb: "Atomic models, electron configuration, isotopes, periodicity, bonding, shapes of molecules, radioactivity and half-life." },
    { key: "acids", name: "Acids, Bases and Redox", section: "chem", domains: ["jambchemAcids"], blurb: "Acids, bases and salts, pH, titration, hydrolysis, buffers, oxidation numbers and IUPAC names of inorganic compounds." },
    { key: "physical", name: "Electrolysis, Energy and Rates", section: "chem", domains: ["jambchemPhysical"], blurb: "Faraday's laws, electrochemical cells, corrosion, enthalpy, entropy and free energy, rates of reaction and Le Chatelier's principle." },
    { key: "nonmetals", name: "Non-metals and Pollution", section: "chem", domains: ["jambchemNonmetals"], blurb: "Hydrogen, chlorine, oxygen, water and hardness, sulphur, nitrogen, carbon, air and pollution." },
    { key: "metals", name: "Metals and Industry", section: "chem", domains: ["jambchemMetals"], blurb: "Sodium, calcium, aluminium, tin, iron and copper, transition metals, alloys, chemical industry and the solar system." },
    { key: "organic", name: "Organic Chemistry", section: "chem", domains: ["jambchemOrganic"], blurb: "Alkanes and petroleum, alkenes, alkynes, benzene, alkanols, acids and esters, soap, carbohydrates, proteins and polymers." },
  ],
  composite: { name: "Chemistry score (out of 100)", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you cover the syllabus",
    60: "Building up: drill your weakest topics",
    70: "A solid score that lifts your UTME total",
    80: "Strong: a big boost for medicine, pharmacy and engineering",
    90: "Excellent",
  },
  testLength: "30 min",
  copy: {
    heroSubs: [
      "Drill each part of the syllabus, then sit a full practice test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for UTME Chemistry.",
    ],
    sourceLine: "Original practice questions on the JAMB UTME Chemistry syllabus. Not affiliated with or endorsed by JAMB.",
    scoreNote:
      "Score out of 100, like the UTME subject score, from 40 questions in 30 minutes, the pro rata share of the real 2 hours for four subjects. Your real UTME total is out of 400 across four subjects, and the cut-off mark depends on the institution and course.",
  },
};
