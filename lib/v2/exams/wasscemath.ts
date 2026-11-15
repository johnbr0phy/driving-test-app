import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// WASSCE General Mathematics (Mathematics (Core) in Ghana), set by the West
// African Examinations Council for The Gambia, Ghana, Liberia, Nigeria and
// Sierra Leone. WAEC's own sites do not serve the syllabus, so the format
// comes from WAEC's syllabus document as published by waecsyllabus.com (page
// and PDF), with the same text in copies on zenodo.org and
// rachel.core2learn.org: Paper 1 is 50 multiple-choice objective questions
// drawn from the common areas of the syllabus, 1 1/2 hours, 50 marks; Paper 2
// is 13 essay questions in two sections, answer 10 in 2 1/2 hours for 100
// marks (not modelled). Non-programmable, silent, cordless calculators are
// allowed (some questions may forbid them); WAEC mathematical tables may be
// used. Topics the syllabus flags with symbols (read as not common to every country: matrices,
// financial arithmetic, binary operations, functions, completing the square,
// tangents to curves, graphical inequalities in two variables, sine and cosine
// rules, longitudes and latitudes, construction, loci, the intercept theorem,
// bearings, calculus, grouped standard deviation, probability without
// replacement, vectors and transformation) are left out, since Paper 1 is
// drawn from the common areas. WAEC publishes no count per topic, so the split
// is Tigertest's: per test 6 number, 5 indices/logarithms/surds, 5
// sets/logic/sequences, 6 ratio/percentages/variation, 8 algebra, 6
// mensuration, 5 plane geometry, 4 coordinate geometry and trigonometry, 5
// statistics and probability. One section of 50 four-option questions in 90
// minutes with a calculator, two practice tests (Test 2 held out), nine drills
// (five with shared Basics), 16 dashboard steps. Percent score: WAEC grades A1
// to F9 with no published conversion. Free (a school exam). Sources:
// tools/next100/wasscemath/sources.md.
const minutes = (n: number) => n * 60;

export const WASSCEMATH: ExamV2Config = {
  id: "wasscemath",
  slug: "/wassce-mathematics",
  landingPath: "/wassce-mathematics-practice-test",
  name: "WASSCE Mathematics Practice Test",
  shortName: "WASSCE Maths",
  fullName: "WASSCE General Mathematics (Paper 1)",
  tagline: "50 objective questions in 1 hour 30 minutes across the common areas of the WAEC General Mathematics syllabus.",
  icon: "calculator",
  theme: { brand: "150 75% 22%", brandDark: "150 75% 15%", brandLight: "150 60% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "p1",
      name: "Paper 1 (Objective)",
      shortName: "Paper 1",
      calculator: true,
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(90) }],
      directions:
        "50 four-option questions in 1 hour 30 minutes, like WAEC's Paper 1. Questions run in syllabus order: number and numeration, algebraic processes, mensuration, plane geometry, coordinate geometry and trigonometry, then statistics and probability. A calculator is available, as WAEC allows a silent, non-programmable one. Where a question gives a value of pi or a logarithm, use it. You can move between questions and flag them. Answer every question.",
      scale: percentScale(50),
      domains: [
        "wmNumber",
        "wmIndices",
        "wmSetsSequences",
        "wmCommercial",
        "wmAlgebra",
        "wmMensuration",
        "wmGeometry",
        "wmCoordTrig",
        "wmStatistics",
      ],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    wmNumber: "Number Bases, Fractions and Approximation",
    wmIndices: "Indices, Logarithms and Surds",
    wmSetsSequences: "Sets, Logic and Sequences",
    wmCommercial: "Ratio, Percentages and Variation",
    wmAlgebra: "Algebraic Processes",
    wmMensuration: "Mensuration",
    wmGeometry: "Plane Geometry",
    wmCoordTrig: "Coordinate Geometry and Trigonometry",
    wmStatistics: "Statistics and Probability",
  },
  drills: [
    { key: "number", name: "Number and Numeration", section: "p1", domains: ["wmNumber"], blurb: "Number bases, modular arithmetic, fractions and decimals, significant figures, standard form and directed numbers.", basics: ["fractionOps", "decimals", "rounding", "negativeNumbers", "scientificNotation"] },
    { key: "indices", name: "Indices, Logarithms and Surds", section: "p1", domains: ["wmIndices"], blurb: "Laws of indices with negative and fractional powers, logarithms and log tables, simplifying and rationalising surds." },
    { key: "sets", name: "Sets, Logic and Sequences", section: "p1", domains: ["wmSetsSequences"], blurb: "Venn diagrams with up to three sets, statements and implications, A.P. terms and sums, and G.P. terms." },
    { key: "commercial", name: "Ratio, Percentages and Variation", section: "p1", domains: ["wmCommercial"], blurb: "Sharing, rates and speed, interest, depreciation, discount, hire purchase, VAT and direct, inverse, partial and joint variation.", basics: ["percents", "percentChange", "ratios", "rateProblems", "simpleInterest", "compoundInterest"] },
    { key: "algebra", name: "Algebraic Processes", section: "p1", domains: ["wmAlgebra"], blurb: "Expansion and factorisation, linear and simultaneous equations, change of subject, quadratics, graphs, inequalities and algebraic fractions.", basics: ["substitution", "distributing", "solveX", "systems", "factoring", "inequalities"] },
    { key: "mensuration", name: "Mensuration", section: "p1", domains: ["wmMensuration"], blurb: "Pythagoras, arcs and sectors, areas, surface areas and volumes of solids, and similar figures.", basics: ["areaPerimeter", "circleBasics", "volume", "pythagorean"] },
    { key: "geometry", name: "Plane Geometry", section: "p1", domains: ["wmGeometry"], blurb: "Angles and parallel lines, triangles and polygons, congruence and similarity, quadrilaterals and the circle theorems." },
    { key: "coordtrig", name: "Coordinates and Trigonometry", section: "p1", domains: ["wmCoordTrig"], blurb: "Distance, midpoint, gradient and equation of a line, trigonometric ratios, special angles, graphs, elevation and depression." },
    { key: "statistics", name: "Statistics and Probability", section: "p1", domains: ["wmStatistics"], blurb: "Frequency tables, pie charts, mean, median and mode, quartiles, dispersion and probability.", basics: ["meanMedian", "readingTable", "probabilityTable", "fsmGroupedMean"] },
  ],
  composite: { name: "Paper 1 score (percent)", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you learn the topics",
    60: "Building up towards a credit",
    70: "A solid Paper 1, a good base for a credit",
    80: "Strong: aiming for the top grades",
    90: "Excellent",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each part of the syllabus, then sit a full Paper 1.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for WASSCE Mathematics Paper 1.",
    ],
    sourceLine: "Original practice questions on the common areas of the WAEC General Mathematics / Mathematics (Core) syllabus. Not affiliated with or endorsed by the West African Examinations Council (WAEC).",
    scoreNote: "Percent correct on 50 Paper 1 questions. Your WASSCE grade (A1 to F9) also counts Paper 2, the essay paper, and Tigertest found no published conversion from marks to grades.",
  },
};
