import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// National Defence Academy and Naval Academy Examination (NDA and NA), Union
// Public Service Commission, India. Held twice a year (NDA and NA (I) in
// April, (II) in September; the (II) 2026 notice is dated 20 May 2026, exam
// 13 September 2026). Written exam per the notice and guides: Paper I
// Mathematics, 300 marks in 2.5 hours (120 questions, 2.5 marks each); Paper
// II General Ability Test, 600 marks in 2.5 hours (150 questions, 4 marks
// each: Part A English 200 marks, about 50 questions; Part B General
// Knowledge 400 marks, about 100 questions, weighted roughly physics 25,
// chemistry 15, general science 10, history and freedom movement 20,
// geography 20, current events 10 percent). A third of a question's marks is
// deducted for each wrong answer. No calculators. Those who qualify go on to
// the 900-mark SSB interview, which is not modelled.
// Here each paper is a timed section at the real pace and about 40 percent of
// the real length: Mathematics 48 in 60 min, GAT 60 in 60 min (English 20,
// GK 40), so a full mock is 108 questions in 2 hours. Current events are not
// modelled (they date within a year); their GK share goes to the four static
// sections. Drills: four in maths, one in English, four in GK, so the
// dashboard is 11 steps. The score is percent correct; negative marking is
// explained in scoreNote and on the landing, not applied.
// Sources: tools/next100/nda/sources.md.
const minutes = (n: number) => n * 60;

export const NDA: ExamV2Config = {
  id: "nda",
  slug: "/nda",
  landingPath: "/nda-exam-practice-test",
  name: "NDA Mock Test",
  shortName: "NDA",
  fullName: "NDA and NA exam",
  tagline: "Mathematics and the General Ability Test, at the real pace, with negative marking explained.",
  icon: "shield",
  theme: { brand: "213 25% 44%", brandDark: "213 25% 34%", brandLight: "213 25% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "maths",
      name: "Paper I: Mathematics",
      shortName: "Mathematics",
      modules: [{ module: 1, questionCount: 48, timeLimit: minutes(60) }],
      directions:
        "48 questions in 60 minutes, the real paper's pace of 75 seconds a question: algebra and matrices, trigonometry and coordinate geometry, calculus and vectors, then statistics and probability. No calculator. Move freely and flag questions inside this paper. Once it closes you go straight on to the General Ability Test and cannot come back.",
      scale: percentScale(48),
      domains: ["ndaAlgebra", "ndaTrigGeo", "ndaCalculus", "ndaStats"],
    },
    {
      key: "gat",
      name: "Paper II: General Ability Test",
      shortName: "General Ability",
      modules: [{ module: 1, questionCount: 60, timeLimit: minutes(60) }],
      directions:
        "60 questions in 60 minutes, the real paper's pace of a minute a question: 20 in Part A English, ending with a reading passage, then 40 in Part B General Knowledge (physics, chemistry and general science, history and the Constitution, and geography). The real paper takes off a third of a question's marks for each wrong answer; this mock scores percent correct, so note which answers were guesses.",
      scale: percentScale(60),
      domains: ["ndaEnglish", "ndaPhysics", "ndaChemBio", "ndaHistory", "ndaGeography"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    ndaAlgebra: "Maths: Algebra and Matrices",
    ndaTrigGeo: "Maths: Trigonometry and Coordinate Geometry",
    ndaCalculus: "Maths: Calculus and Vectors",
    ndaStats: "Maths: Statistics and Probability",
    ndaEnglish: "GAT: English",
    ndaPhysics: "GAT: Physics",
    ndaChemBio: "GAT: Chemistry and General Science",
    ndaHistory: "GAT: History, Freedom Movement and Polity",
    ndaGeography: "GAT: Geography",
  },
  drills: [
    { key: "algebra", name: "Algebra and Matrices", section: "maths", domains: ["ndaAlgebra"], blurb: "Sets, complex numbers, quadratics, logarithms, progressions, binomial theorem, permutations and combinations, binary numbers, matrices and determinants." },
    { key: "trig", name: "Trigonometry and Geometry", section: "maths", domains: ["ndaTrigGeo"], blurb: "Ratios and identities, compound angles, inverse functions, heights and distances, triangles, straight lines, circles, conics and 3D distance." },
    { key: "calculus", name: "Calculus and Vectors", section: "maths", domains: ["ndaCalculus"], blurb: "Limits, continuity, derivatives, maxima and minima, integrals, areas, differential equations and vector products." },
    { key: "stats", name: "Statistics and Probability", section: "maths", domains: ["ndaStats"], blurb: "Mean, median, mode, variance and standard deviation, probability rules, conditional probability and the binomial distribution." },
    { key: "english", name: "English", section: "gat", domains: ["ndaEnglish"], blurb: "Synonyms, antonyms, spotting errors, fill in the blanks, sentence improvement, idioms, one-word substitution, spelling and reading passages." },
    { key: "physics", name: "Physics", section: "gat", domains: ["ndaPhysics"], blurb: "Units, motion, work and energy, heat, sound, light, electricity and waves." },
    { key: "chembio", name: "Chemistry and General Science", section: "gat", domains: ["ndaChemBio"], blurb: "Atoms and the periodic table, acids and bases, metals and alloys, the human body, plants and diseases." },
    { key: "history", name: "History and Polity", section: "gat", domains: ["ndaHistory"], blurb: "Ancient and medieval India, the freedom movement and the Constitution of India." },
    { key: "geography", name: "Geography", section: "gat", domains: ["ndaGeography"], blurb: "The Earth, atmosphere and oceans, landforms and rocks, and the rivers, climate, soils and borders of India." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 60,
  goalChoices: [40, 50, 60, 70, 80],
  goalNotes: {
    40: "A first target while you learn the syllabus",
    50: "Building up: keep drilling your weakest topics",
    60: "A solid target with a margin, once wrong answers cost marks",
    70: "Strong: aiming well clear of the cut-off",
    80: "Topper territory",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Mock Test 1.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for the NDA written exam.",
    ],
    sourceLine: "Original practice questions on the NDA and NA syllabus and pattern. Not affiliated with or endorsed by the Union Public Service Commission or the Ministry of Defence.",
    scoreNote:
      "Percent correct across both papers. Each mock test is about 40 percent of the real length at the real pace (Mathematics 48 questions in 60 minutes, General Ability Test 60 in 60 minutes); the real papers are 120 questions for 300 marks and 150 questions for 600 marks, 2.5 hours each. The real exam deducts a third of a question's marks for each wrong answer, so guess only when you can rule out at least one option. UPSC sets the qualifying marks and cut-off for each sitting, so treat your goal as a readiness line. Current events questions are not included.",
  },
};
