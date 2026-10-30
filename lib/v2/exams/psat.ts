import { ExamV2Config } from "../types";
import { curve } from "../scales";

// Digital PSAT/NMSQT (and PSAT 10, the same test): College Board "What's on the test" pages for
// Reading and Writing and Math (satsuite.collegeboard.org/psat-nmsqt/whats-on-the-test, checked
// October 2026). Same adaptive module shape as the SAT: R&W 2 x 27 items in 32 min, Math 2 x 22 in
// 35 min, a 10-minute break; scored 160 to 760 per section, 320 to 1520 total. Math is weighted
// about 35% algebra, 32.5% advanced math, 20% problem solving and data analysis, 12.5% geometry and
// trigonometry (8/7/4/3 per module). One full adaptive practice test (held out of the drills) plus
// 64 drill-only items; every item is original. Sources: tools/psat/sources.md.

const MATH_REFERENCE = `**Reference**

Circle: $A = \\pi r^2$, $C = 2\\pi r$

Rectangle: $A = lw$. Triangle: $A = \\frac{1}{2}bh$

Right triangle: $a^2 + b^2 = c^2$. Special right triangles: $x, x\\sqrt{3}, 2x$ (30-60-90) and $s, s, s\\sqrt{2}$ (45-45-90)

Box: $V = lwh$. Cylinder: $V = \\pi r^2 h$. Sphere: $V = \\frac{4}{3}\\pi r^3$. Cone: $V = \\frac{1}{3}\\pi r^2 h$. Pyramid: $V = \\frac{1}{3}lwh$

The number of degrees of arc in a circle is 360. The number of radians of arc in a circle is $2\\pi$. The sum of the measures in degrees of the angles of a triangle is 180.`;

export const PSAT: ExamV2Config = {
  id: "psat",
  slug: "/psat",
  landingPath: "/psat-practice-test",
  icon: "graduation",
  name: "PSAT Practice Test",
  shortName: "PSAT",
  fullName: "digital PSAT/NMSQT",
  tagline: "Two timed sections, adaptive modules, a 320 to 1520 score estimate.",
  theme: { brand: "230 50% 28%", brandDark: "230 50% 19%", brandLight: "230 50% 96%" },
  breakSeconds: 600,
  sections: [
    {
      key: "rw",
      name: "Reading and Writing",
      shortName: "R&W",
      modules: [
        { module: 1, questionCount: 27, timeLimit: 32 * 60 },
        { module: 2, questionCount: 27, timeLimit: 32 * 60, adaptive: { threshold: 0.6 } },
      ],
      directions:
        "The questions in this section cover reading and writing skills. Each question has one or more passages. Read each passage and question carefully, then choose the best answer based on the passage. All questions are multiple choice with four choices and exactly one correct answer.",
      scale: curve(54, [[0, 160], [10, 290], [20, 400], [30, 490], [40, 580], [48, 660], [52, 720], [54, 760]], 30),
      // Easier module 2: at most 16 + 27 = 43 correct, topping out near 560.
      lowerScale: curve(54, [[0, 160], [10, 280], [20, 380], [30, 460], [38, 520], [43, 560], [54, 560]], 30),
      domains: ["craftStructure", "infoIdeas", "conventions", "expressionIdeas"],
    },
    {
      key: "math",
      name: "Math",
      shortName: "Math",
      calculator: true,
      reference: MATH_REFERENCE,
      modules: [
        { module: 1, questionCount: 22, timeLimit: 35 * 60 },
        { module: 2, questionCount: 22, timeLimit: 35 * 60, adaptive: { threshold: 0.6 } },
      ],
      directions:
        "The questions in this section cover math skills. You may use the calculator for every question. Figures are drawn to scale unless noted. For student-produced response questions, type your answer: an integer, a decimal, or a fraction such as 3/4. Do not type symbols, units, or commas.",
      scale: curve(44, [[0, 160], [8, 300], [16, 400], [24, 490], [32, 580], [38, 660], [42, 720], [44, 760]], 30),
      // Easier module 2: at most 13 + 22 = 35 correct, topping out near 560.
      lowerScale: curve(44, [[0, 160], [8, 290], [16, 390], [24, 470], [30, 520], [35, 560], [44, 560]], 30),
      domains: ["algebra", "advancedMath", "dataAnalysis", "geometryTrig"],
    },
  ],
  // Held out so the drills never show its questions and the test stays a clean measurement.
  tests: [{ number: 1, name: "Practice Test 1", heldOut: true }],
  domainLabels: {
    craftStructure: "Craft and Structure",
    infoIdeas: "Information and Ideas",
    conventions: "Standard English Conventions",
    expressionIdeas: "Expression of Ideas",
    algebra: "Algebra",
    advancedMath: "Advanced Math",
    dataAnalysis: "Problem Solving and Data Analysis",
    geometryTrig: "Geometry and Trigonometry",
  },
  // Four drills with Basics plus the test: a 9-step dashboard.
  drills: [
    { key: "reading", name: "Reading", section: "rw", domains: ["craftStructure", "infoIdeas"], blurb: "Words in context, structure, main ideas, evidence and tables. About half of Reading and Writing.", basics: ["wordsInContext", "textStructure", "mainIdea", "inference", "readingTable"] },
    { key: "writing", name: "Writing", section: "rw", domains: ["conventions", "expressionIdeas"], blurb: "Punctuation, agreement, transitions and notes. About half of Reading and Writing.", basics: ["semicolons", "subjectVerb", "commaInterrupters", "transitions", "notesToSentence"] },
    { key: "algebra", name: "Algebra and Advanced Math", section: "math", domains: ["algebra", "advancedMath"], blurb: "Linear equations, systems, functions, quadratics and exponents. About two thirds of Math.", basics: ["solveX", "slope", "systems", "factoring", "exponentRules"] },
    { key: "datageo", name: "Data and Geometry", section: "math", domains: ["dataAnalysis", "geometryTrig"], blurb: "Percents, ratios, statistics, area, triangles and circles. About a third of Math.", basics: ["percents", "ratios", "meanMedian", "areaPerimeter", "pythagorean"] },
  ],
  composite: { name: "Total score", min: 320, max: 1520, combine: (sections) => sections.reduce((a, s) => a + s.scaled, 0) },
  defaultGoal: 1100,
  goalChoices: [900, 1000, 1100, 1200, 1300, 1400],
  goalNotes: {
    900: "Around the typical score for 11th graders",
    1000: "Above the typical 11th grade score",
    1100: "A solid score, on track for a strong SAT",
    1200: "Well above average",
    1300: "A high score, near the top tenth",
    1400: "In range for National Merit recognition in many states",
  },
  testLength: "2 hr 14 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each skill.",
      "Master each drill first.",
      "Halfway there. Keep drilling.",
      "Hit your goal on the full test.",
      "Goal hit. You're ready for the PSAT.",
    ],
    sourceLine: "Original questions written to the digital PSAT/NMSQT specifications. Not affiliated with College Board or National Merit Scholarship Corporation. Score estimates are unofficial.",
    scoreNote: "Section scores are estimates from a typical conversion. As on the real PSAT, the easier second module caps a section near 560, so a strong first module matters. For juniors, National Merit uses a Selection Index: two times the Reading and Writing score plus the Math score, divided by 10.",
  },
};
