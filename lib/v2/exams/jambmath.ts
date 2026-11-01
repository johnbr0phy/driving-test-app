import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// JAMB UTME Mathematics (Joint Admissions and Matriculation Board, Nigeria).
// The UTME is one computer-based sitting of four subjects, 180 objective
// questions in 2 hours: Use of English (compulsory) 60 questions and three
// other subjects of 40 each, every subject scored out of 100, so 400 in all
// (guides; JAMB's brochure on IBASS could not be read). Mathematics is one of
// those 40-question subjects. The UTME Mathematics syllabus has five
// sections: Number and Numeration (number bases; fractions, decimals,
// approximations and percentages; indices, logarithms and surds; sets),
// Algebra (polynomials, variation, inequalities, progressions, binary
// operations, matrices and determinants), Geometry and Trigonometry
// (Euclidean geometry, mensuration including the earth as a sphere, loci,
// coordinate geometry, trigonometry), Calculus (differentiation, its
// applications, integration) and Statistics (representation of data,
// location, dispersion, permutation and combination, probability). JAMB
// publishes no question count per section, so the split here is Tigertest's:
// per test 6 number, 5 algebra, 5 progressions/binary operations/matrices,
// 6 geometry and mensuration, 5 coordinate geometry and trigonometry,
// 4 calculus, 5 statistics, 4 permutation/combination/probability. One
// section of 40 four-option questions in 30 minutes, the pro rata share of
// the 2 hours, with free navigation as on the real CBT and Tigertest's
// calculator (the CBT's own on-screen calculator is basic, guides say). Two
// practice tests, Test 2 held out; eight drills (per test 6/5/5/6/5/4/5/4),
// 10 dashboard steps. Percent score out of 100, like the subject score.
// Sources: tools/next100/jambmath/sources.md.
const minutes = (n: number) => n * 60;

export const JAMBMATH: ExamV2Config = {
  id: "jambmath",
  slug: "/jamb-mathematics",
  landingPath: "/jamb-mathematics-practice-test",
  name: "JAMB Mathematics Practice Test",
  shortName: "JAMB Maths",
  fullName: "JAMB UTME Mathematics",
  tagline: "40 questions in 30 minutes across the whole UTME Mathematics syllabus, scored out of 100.",
  icon: "calculator",
  theme: { brand: "151 45% 30%", brandDark: "151 45% 20%", brandLight: "151 45% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "math",
      name: "Mathematics",
      shortName: "Maths",
      calculator: true,
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(30) }],
      directions:
        "40 questions in 30 minutes, the share of the UTME's 2 hours that Mathematics gets when you split the time by questions. Questions run in syllabus order: number and numeration, algebra, geometry and trigonometry, calculus, then statistics and probability. A calculator is available; the real CBT has a basic on-screen one, so practise working without a scientific calculator. Where a question says so, take pi as 22/7 and the radius of the earth as 6400 km. You can move between questions and flag them. Wrong answers lose no marks here, so answer every question.",
      scale: percentScale(40),
      domains: [
        "jambmathNumber",
        "jambmathAlgebra",
        "jambmathSequences",
        "jambmathGeometry",
        "jambmathCoordTrig",
        "jambmathCalculus",
        "jambmathStatistics",
        "jambmathProbability",
      ],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    jambmathNumber: "Number and Numeration",
    jambmathAlgebra: "Polynomials, Variation and Inequalities",
    jambmathSequences: "Progressions, Binary Operations and Matrices",
    jambmathGeometry: "Geometry and Mensuration",
    jambmathCoordTrig: "Coordinate Geometry and Trigonometry",
    jambmathCalculus: "Calculus",
    jambmathStatistics: "Statistics",
    jambmathProbability: "Permutation, Combination and Probability",
  },
  drills: [
    { key: "number", name: "Number and Numeration", section: "math", domains: ["jambmathNumber"], blurb: "Number bases, fractions and percentages, interest, indices, logarithms, surds and sets." },
    { key: "algebra", name: "Polynomials and Variation", section: "math", domains: ["jambmathAlgebra"], blurb: "Change of subject, factor and remainder theorems, quadratics, variation and inequalities." },
    { key: "sequences", name: "Progressions and Matrices", section: "math", domains: ["jambmathSequences"], blurb: "Arithmetic and geometric progressions, binary operations, matrices and determinants." },
    { key: "geometry", name: "Geometry and Mensuration", section: "math", domains: ["jambmathGeometry"], blurb: "Polygons, circle theorems, areas and volumes, the earth as a sphere and loci." },
    { key: "coordtrig", name: "Coordinates and Trigonometry", section: "math", domains: ["jambmathCoordTrig"], blurb: "Gradients, distances and lines, trigonometric ratios, bearings and the sine and cosine rules." },
    { key: "calculus", name: "Calculus", section: "math", domains: ["jambmathCalculus"], blurb: "Limits, differentiation, rates of change, maxima and minima, integration and areas." },
    { key: "statistics", name: "Statistics", section: "math", domains: ["jambmathStatistics"], blurb: "Charts, mean, median and mode, grouped data, range, variance and standard deviation." },
    { key: "probability", name: "Permutation and Probability", section: "math", domains: ["jambmathProbability"], blurb: "Arrangements, selections, circular arrangements and probability rules." },
  ],
  composite: { name: "Mathematics score (out of 100)", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you learn the topics",
    60: "Building up: Mathematics counts in every science and social science aggregate",
    70: "A solid score that lifts your UTME total",
    80: "Strong: a big boost for competitive courses",
    90: "Excellent",
  },
  testLength: "30 min",
  copy: {
    heroSubs: [
      "Drill each part of the syllabus, then sit a full practice test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for UTME Mathematics.",
    ],
    sourceLine: "Original practice questions on the JAMB UTME Mathematics syllabus (number and numeration, algebra, geometry and trigonometry, calculus, statistics). Not affiliated with or endorsed by JAMB.",
    scoreNote: "Score out of 100, like the UTME subject score, from 40 questions. Your real UTME total is out of 400 across four subjects, and the cut-off mark depends on the institution and course.",
  },
};
