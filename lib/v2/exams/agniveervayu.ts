import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Agniveervayu (Indian Air Force, Agnipath scheme) Phase I online test,
// Science subjects. Pattern per the IAF notification for Agniveervayu intake
// 01/2027 (registration January 2026, online exam March 2026; intake 02/2027,
// exam September 2026, keeps it): the Science subjects test lasts 60 minutes
// and covers Physics, Mathematics and English to the 10+2 CBSE syllabus; one
// mark for each right answer, 0.25 deducted for each wrong one, nothing for an
// unattempted question; questions are bilingual (English and Hindi) except the
// English paper; marks are normalised and cut-offs are applied state-wise.
// The notification gives no question counts: guides report 70 questions,
// English 20, Physics 25 and Mathematics 25, the split modelled here. The
// Other than Science subjects test (English and Reasoning and General
// Awareness, 45 minutes) and the combined option (85 minutes) are not
// modelled. The real test runs on one 60-minute clock; here each subject is
// its own timed section at the same pace (15, 22 and 23 minutes), with free
// navigation inside it. Drills: two for English, three each for Physics and
// Mathematics, so the dashboard is 10 steps. The score is percent correct;
// negative marking is explained in scoreNote and on the landing, not applied.
// Sources: tools/next100/agniveervayu/sources.md.
const minutes = (n: number) => n * 60;

export const AGNIVEERVAYU: ExamV2Config = {
  id: "agniveervayu",
  slug: "/agniveer-vayu",
  landingPath: "/agniveer-vayu-practice-test",
  name: "Agniveer Vayu Science Mock Test",
  shortName: "Agniveer Vayu",
  fullName: "Agniveervayu Science subjects online test",
  tagline: "70 questions in 60 minutes: English, Physics and Mathematics to the 10+2 CBSE syllabus.",
  icon: "plane",
  theme: { brand: "202 40% 44%", brandDark: "202 40% 34%", brandLight: "202 40% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "eng",
      name: "English",
      shortName: "English",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(15) }],
      directions:
        "20 questions in 15 minutes: grammar, vocabulary and a reading passage, at the 10+2 CBSE level. Move freely and flag questions inside this section. The real test runs on one 60-minute clock for all three subjects; here each subject has its share of the time, so a closed section cannot be reopened.",
      scale: percentScale(20),
      domains: ["agniveervayuGrammar", "agniveervayuReading"],
    },
    {
      key: "phy",
      name: "Physics",
      shortName: "Physics",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(22) }],
      directions:
        "25 questions in 22 minutes on the 10+2 CBSE Physics syllabus: mechanics, heat, waves and optics, electricity, magnetism and modern physics. Take g = 10 m/s² unless a question says otherwise. The real test takes 0.25 marks off for each wrong answer; this mock test scores percent correct.",
      scale: percentScale(25),
      domains: ["agniveervayuMechanics", "agniveervayuHeatOptics", "agniveervayuElectricity"],
    },
    {
      key: "math",
      name: "Mathematics",
      shortName: "Maths",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(23) }],
      directions:
        "25 questions in 23 minutes on the 10+2 CBSE Mathematics syllabus: algebra, trigonometry, coordinate geometry, vectors, calculus, probability and statistics.",
      scale: percentScale(25),
      domains: ["agniveervayuAlgebra", "agniveervayuGeometry", "agniveervayuCalculus"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    agniveervayuGrammar: "English: Grammar",
    agniveervayuReading: "English: Vocabulary and Comprehension",
    agniveervayuMechanics: "Physics: Mechanics",
    agniveervayuHeatOptics: "Physics: Heat, Waves and Optics",
    agniveervayuElectricity: "Physics: Electricity, Magnetism and Modern Physics",
    agniveervayuAlgebra: "Maths: Algebra",
    agniveervayuGeometry: "Maths: Trigonometry, Coordinate Geometry and Vectors",
    agniveervayuCalculus: "Maths: Calculus, Probability and Statistics",
  },
  drills: [
    { key: "grammar", name: "English Grammar", section: "eng", domains: ["agniveervayuGrammar"], blurb: "Spotting errors, fill in the blanks, sentence improvement, voice and narration." },
    { key: "reading", name: "Vocabulary and Comprehension", section: "eng", domains: ["agniveervayuReading"], blurb: "Synonyms, antonyms, idioms, one-word substitution, spelling and reading passages." },
    { key: "mechanics", name: "Mechanics", section: "phy", domains: ["agniveervayuMechanics"], blurb: "Units, motion, Newton's laws, work and energy, rotation, gravitation and fluids." },
    { key: "heatoptics", name: "Heat, Waves and Optics", section: "phy", domains: ["agniveervayuHeatOptics"], blurb: "Temperature, thermodynamics, gases, oscillations, sound, lenses and light." },
    { key: "electricity", name: "Electricity and Modern Physics", section: "phy", domains: ["agniveervayuElectricity"], blurb: "Charges, circuits, magnetism, induction, AC, atoms, nuclei and semiconductors." },
    { key: "algebra", name: "Algebra", section: "math", domains: ["agniveervayuAlgebra"], blurb: "Sets, complex numbers, quadratics, progressions, counting, binomials and matrices." },
    { key: "geometry", name: "Trigonometry, Coordinates and Vectors", section: "math", domains: ["agniveervayuGeometry"], blurb: "Trigonometric values and identities, heights and distances, lines, circles, conics, vectors and 3D." },
    { key: "calculus", name: "Calculus and Probability", section: "math", domains: ["agniveervayuCalculus"], blurb: "Limits, derivatives, integrals, differential equations, probability and statistics." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you learn the question types",
    60: "Building up: aim higher for a safety margin",
    70: "A solid target with a margin to spare",
    80: "Strong: a good margin over most state cut-offs",
    90: "Topper territory",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Mock Test 1.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for the Agniveer Vayu online test.",
    ],
    sourceLine: "Original practice questions on the Agniveervayu Science subjects syllabus (10+2 CBSE English, Physics and Mathematics). Not affiliated with or endorsed by the Indian Air Force or CASB.",
    scoreNote:
      "Percent correct across all three subjects. The real Science subjects test gives 1 mark for each right answer and takes 0.25 marks off for each wrong one, with nothing for a question left blank. Marks are normalised across shifts, candidates must qualify in each paper they take, and the cut-off for Phase II is set state by state and changes with every intake, so treat your goal as a readiness line. A blind guess gains only about a sixteenth of a mark on average; once you can rule out an option, guessing is clearly worth it. The question split (English 20, Physics 25, Mathematics 25) is the one guides report; the notification gives only the 60-minute length.",
  },
};
