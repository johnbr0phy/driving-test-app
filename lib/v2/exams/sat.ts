import { ExamV2Config, ScaleSpec } from "../types";

/** Piecewise-linear raw-to-scaled curve through anchor points (raw, scaled). */
function curve(maxRaw: number, anchors: [number, number][], band: number): ScaleSpec {
  const table: number[] = [];
  for (let raw = 0; raw <= maxRaw; raw++) {
    let i = 0;
    while (i < anchors.length - 2 && raw > anchors[i + 1][0]) i++;
    const [r0, s0] = anchors[i];
    const [r1, s1] = anchors[i + 1];
    const t = r1 === r0 ? 0 : (raw - r0) / (r1 - r0);
    table.push(Math.round((s0 + t * (s1 - s0)) / 10) * 10);
  }
  return { min: anchors[0][1], max: anchors[anchors.length - 1][1], table, band };
}

const MATH_REFERENCE = `**Reference**

Circle: $A = \\pi r^2$, $C = 2\\pi r$

Rectangle: $A = lw$. Triangle: $A = \\frac{1}{2}bh$

Right triangle: $a^2 + b^2 = c^2$. Special right triangles: $x, x\\sqrt{3}, 2x$ (30-60-90) and $s, s, s\\sqrt{2}$ (45-45-90)

Box: $V = lwh$. Cylinder: $V = \\pi r^2 h$. Sphere: $V = \\frac{4}{3}\\pi r^3$. Cone: $V = \\frac{1}{3}\\pi r^2 h$. Pyramid: $V = \\frac{1}{3}lwh$

The number of degrees of arc in a circle is 360. The number of radians of arc in a circle is $2\\pi$. The sum of the measures in degrees of the angles of a triangle is 180.`;

export const SAT: ExamV2Config = {
  id: "sat",
  slug: "/sat",
  landingPath: "/sat-practice-test",
  name: "SAT Practice Test",
  shortName: "SAT",
  fullName: "digital SAT",
  tagline: "Two timed sections, adaptive modules, a real score estimate.",
  theme: { brand: "221 83% 45%", brandDark: "221 83% 32%", brandLight: "221 100% 96%" },
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
      scale: curve(54, [[0, 200], [10, 330], [20, 450], [30, 540], [40, 630], [48, 710], [52, 770], [54, 800]], 30),
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
      scale: curve(44, [[0, 200], [8, 350], [16, 450], [24, 540], [32, 630], [38, 710], [42, 770], [44, 800]], 30),
      domains: ["algebra", "advancedMath", "dataAnalysis", "geometryTrig"],
    },
  ],
  tests: [{ number: 1, name: "Practice Test 1" }],
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
  drills: [
    { key: "craft", name: "Craft and Structure", section: "rw", domains: ["craftStructure"], blurb: "Words in context, text structure, cross-text connections. 28% of Reading and Writing.", weight: "28% of Reading and Writing" },
    { key: "ideas", name: "Information and Ideas", section: "rw", domains: ["infoIdeas"], blurb: "Main ideas, evidence, tables, inferences. 26% of Reading and Writing.", weight: "26% of Reading and Writing" },
    { key: "conventions", name: "Standard English Conventions", section: "rw", domains: ["conventions"], blurb: "Punctuation, boundaries, agreement, verb forms. 26% of Reading and Writing.", weight: "26% of Reading and Writing" },
    { key: "expression", name: "Expression of Ideas", section: "rw", domains: ["expressionIdeas"], blurb: "Transitions and rhetorical synthesis from notes. 20% of Reading and Writing.", weight: "20% of Reading and Writing" },
    { key: "algebra", name: "Algebra", section: "math", domains: ["algebra"], blurb: "Linear equations, functions, systems, inequalities. 35% of Math.", weight: "35% of Math" },
    { key: "advanced", name: "Advanced Math", section: "math", domains: ["advancedMath"], blurb: "Quadratics, exponentials, equivalent expressions, nonlinear functions. 35% of Math.", weight: "35% of Math" },
    { key: "data", name: "Problem Solving and Data Analysis", section: "math", domains: ["dataAnalysis"], blurb: "Ratios, percents, statistics, probability, scatterplots. 15% of Math.", weight: "15% of Math" },
    { key: "geometry", name: "Geometry and Trigonometry", section: "math", domains: ["geometryTrig"], blurb: "Area, volume, triangles, circles, right-triangle trig. 15% of Math.", weight: "15% of Math" },
  ],
  composite: { name: "Total score", min: 400, max: 1600, combine: (scaled) => scaled.reduce((a, b) => a + b, 0) },
  defaultGoal: 1200,
  goalChoices: [1000, 1100, 1200, 1300, 1400, 1500],
  goalNotes: {
    1000: "Around the national average",
    1100: "Above average, opens most state schools",
    1200: "Top quarter of test takers",
    1300: "Top 15%, competitive for selective schools",
    1400: "Top 5%, honors programs and scholarships",
    1500: "Top 1 to 2%, the most selective colleges",
  },
  testLength: "2 hr 14 min",
  copy: {
    heroSubs: [
      "Eight skill drills on your phone, then one full timed test on a desktop.",
      "Mastery first. Each drill is one skill area the SAT scores you on.",
      "Halfway through the skills. The full test will show where you stand.",
      "Hit your goal on the full test to finish the plan.",
      "Goal hit. You're ready to book your SAT.",
    ],
    sourceLine: "Original questions written to the digital SAT specifications. Not affiliated with College Board. Score estimates are unofficial.",
  },
};
