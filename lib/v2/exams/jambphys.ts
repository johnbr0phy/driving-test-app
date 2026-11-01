import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// JAMB UTME Physics (Joint Admissions and Matriculation Board, Nigeria).
// The UTME is one computer-based sitting of four subjects, 180 objective
// questions in 2 hours: Use of English (compulsory) 60 questions and three
// other subjects of 40 each, every subject scored out of 100, so 400 in all
// (guides; JAMB's brochure is on IBASS, which could not be read). Physics is
// 40 four-option questions on the JAMB UTME Physics syllabus (2026/2027
// topic list as guides reproduce it): measurements and units, scalars and
// vectors, motion, gravitational field, equilibrium, work, energy and power,
// friction, simple machines, elasticity, pressure, liquids at rest, heat,
// gas laws, vapours, kinetic theory, heat transfer, waves, sound, light,
// reflection, refraction, optical instruments, dispersion, electrostatics,
// capacitors, cells, current electricity, magnetism, electromagnetic
// induction, a.c. circuits, conduction through liquids and gases, elementary
// modern physics, introductory electronics, fibre optics and lasers. JAMB
// publishes no topic weights, so the per-test split (7/7/7/7/5/4/3) is
// Tigertest's own. One section of 40 questions in 30 minutes, the pro rata
// share of the 2 hours, with free navigation as on the real CBT. Two
// practice tests, Test 2 held out; seven drills, 9 dashboard steps. Percent
// score out of 100, like the subject score. Sources:
// tools/next100/jambphys/sources.md.
const minutes = (n: number) => n * 60;

export const JAMBPHYS: ExamV2Config = {
  id: "jambphys",
  slug: "/jamb-physics",
  landingPath: "/jamb-physics-practice-test",
  name: "JAMB Physics Practice Test",
  shortName: "JAMB Physics",
  fullName: "JAMB UTME Physics",
  tagline: "40 questions in 30 minutes across the whole UTME Physics syllabus, every calculation worked in the explanation, scored out of 100.",
  icon: "graduation",
  theme: { brand: "231 36% 40%", brandDark: "231 36% 30%", brandLight: "231 36% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "phys",
      name: "Physics",
      shortName: "Physics",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(30) }],
      directions:
        "40 questions in 30 minutes, the share of the UTME's 2 hours that one 40-question subject gets when you split the time by questions. Take g = 10 m s⁻² unless a question says otherwise. You can move between questions and flag them, as on the real CBT. Wrong answers lose no marks here, so answer every question.",
      scale: percentScale(40),
      domains: [
        "jambphysMotion",
        "jambphysForces",
        "jambphysHeat",
        "jambphysWaves",
        "jambphysElectricity",
        "jambphysMagnetism",
        "jambphysModern",
      ],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    jambphysMotion: "Measurement, Vectors and Motion",
    jambphysForces: "Forces, Energy and Machines",
    jambphysHeat: "Pressure, Fluids and Heat",
    jambphysWaves: "Waves, Sound and Light",
    jambphysElectricity: "Electrostatics and Current Electricity",
    jambphysMagnetism: "Magnetism, Induction and A.C.",
    jambphysModern: "Modern Physics and Electronics",
  },
  drills: [
    { key: "motion", name: "Measurement and Motion", section: "phys", domains: ["jambphysMotion"], blurb: "Units, dimensions, significant figures, vectors, equations of motion, graphs, projectiles and circular motion." },
    { key: "forces", name: "Forces, Energy and Machines", section: "phys", domains: ["jambphysForces"], blurb: "Gravitation, moments, Newton's laws, momentum, work, energy, power, friction, machines and elasticity." },
    { key: "heat", name: "Pressure, Fluids and Heat", section: "phys", domains: ["jambphysHeat"], blurb: "Pressure, Archimedes' principle, thermometers, expansion, gas laws, specific and latent heat, vapours and heat transfer." },
    { key: "waves", name: "Waves, Sound and Light", section: "phys", domains: ["jambphysWaves"], blurb: "Wave equation, sound and resonance, mirrors, lenses, refraction, optical instruments, dispersion, fibre optics and lasers." },
    { key: "electricity", name: "Electrostatics and Current", section: "phys", domains: ["jambphysElectricity"], blurb: "Charges, capacitors, cells, Ohm's law, resistor networks, meters, and electrical energy and power." },
    { key: "magnetism", name: "Magnetism and A.C.", section: "phys", domains: ["jambphysMagnetism"], blurb: "Magnetic fields, the motor effect, induction, transformers, a.c. circuits and electrolysis." },
    { key: "modern", name: "Modern Physics and Electronics", section: "phys", domains: ["jambphysModern"], blurb: "Atomic models, photoelectric effect, radioactivity, nuclear energy, semiconductors and logic gates." },
  ],
  composite: { name: "Physics score (out of 100)", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you learn the formulas",
    60: "Building up: Physics counts in your UTME total",
    70: "A solid score that lifts your UTME total",
    80: "Strong: a big boost for engineering and science courses",
    90: "Excellent",
  },
  testLength: "30 min",
  copy: {
    heroSubs: [
      "Drill each area of the syllabus, then sit a full practice test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for UTME Physics.",
    ],
    sourceLine: "Original practice questions on the JAMB UTME Physics syllabus. Not affiliated with or endorsed by JAMB.",
    scoreNote: "Score out of 100, like the UTME subject score, from 40 questions in 30 minutes (Physics's share of the UTME's 2 hours). Your real UTME total is out of 400 across four subjects, and the cut-off mark depends on the institution and course.",
  },
};
