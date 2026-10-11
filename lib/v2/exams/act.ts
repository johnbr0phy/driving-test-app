import { ExamV2Config } from "../types";
import { curve } from "../scales";

// Enhanced ACT (2025): English 50 questions / 35 min, Math 45 / 50, Reading
// 36 / 40, Science 40 / 40 (optional on the real test, included here). Four
// answer choices everywhere. Each section is scaled 1 to 36; the composite
// is the average of English, Math and Reading, and Science reports on its
// own. Every section uses passages shared by several questions. Test 2 is
// held out of the drills so it measures readiness rather than memory.
const minutes = (n: number) => n * 60;
const act = (n: number) => curve(n, [[0, 1], [Math.round(n * 0.2), 12], [Math.round(n * 0.45), 19], [Math.round(n * 0.7), 25], [Math.round(n * 0.9), 32], [n, 36]], 1, 1);

export const ACT: ExamV2Config = {
  id: "act",
  slug: "/act",
  landingPath: "/act-practice-test",
  name: "ACT Practice Test",
  shortName: "ACT",
  fullName: "ACT college admissions test",
  tagline: "Four timed sections with real passages, scored 1 to 36 with a composite.",
  icon: "graduation",
  theme: { brand: "350 70% 42%", brandDark: "350 70% 30%", brandLight: "350 100% 96%" },
  breakSeconds: 600,
  sections: [
    {
      key: "english",
      name: "English",
      shortName: "English",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(35) }],
      directions: "Five passages with numbered, underlined portions. For each question choose the best version of the underlined portion, or answer the question about the passage. Choose NO CHANGE when the original is best. About 42 seconds a question.",
      scale: act(50),
      domains: ["conventions", "production", "language"],
    },
    {
      key: "math",
      name: "Mathematics",
      shortName: "Math",
      calculator: true,
      breakAfter: true,
      modules: [{ module: 1, questionCount: 45, timeLimit: minutes(50) }],
      directions: "Forty-five questions that ramp from easy to hard. A calculator is allowed on every question. Figures are not necessarily drawn to scale.",
      scale: act(45),
      domains: ["algebra", "geometry", "modeling"],
    },
    {
      key: "reading",
      name: "Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 36, timeLimit: minutes(40) }],
      directions: "Four passages (literary narrative, social science, humanities, natural science), nine questions each. One passage is a pair. Read the passage beside the question and choose the best answer.",
      scale: act(36),
      domains: ["keyIdeas", "craft", "integration"],
    },
    {
      key: "science",
      name: "Science",
      shortName: "Science",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(40) }],
      directions: "Six passages with data tables, experiments and conflicting viewpoints. Almost every answer is in the passage; outside knowledge is needed only rarely. Science is optional on the real ACT and does not count in the composite.",
      scale: act(40),
      domains: ["interpretation", "investigation", "evaluation"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  premium: {
    lockedTests: [2],
    lockedDrills: ["language", "modeling", "craftIntegration", "evaluation"],
    benefits: [
      "Practice Test 2: unseen, a true readiness check",
      "Knowledge of Language, Essential Skills and Modeling, Craft and Integration, and Evaluation of Models drills",
      "The SAT and DMV tests too, with the same purchase",
    ],
  },
  domainLabels: {
    conventions: "Conventions of Standard English",
    production: "Production of Writing",
    language: "Knowledge of Language",
    algebra: "Preparing for Higher Math",
    geometry: "Geometry and Statistics",
    modeling: "Essential Skills and Modeling",
    keyIdeas: "Key Ideas and Details",
    craft: "Craft and Structure",
    integration: "Integration of Knowledge and Ideas",
    interpretation: "Interpretation of Data",
    investigation: "Scientific Investigation",
    evaluation: "Evaluation of Models and Results",
  },
  // One drill per ACT reporting category, the same names a student sees on
  // their score report. Reading's Integration category (10 drill items) rides
  // with Craft and Structure so no drill is a handful of questions.
  // legacyKey carries progress over from the four section drills these replaced.
  drillSize: 20,
  drills: [
    { key: "conventions", legacyKey: "english", name: "Conventions of Standard English", section: "english", domains: ["conventions"], blurb: "Punctuation, agreement, pronouns, modifiers and sentence boundaries, passage by passage.", basics: ["semicolons", "colons", "itsIts", "subjectVerb", "commaSplices", "apostrophes"] },
    { key: "production", legacyKey: "english", name: "Production of Writing", section: "english", domains: ["production"], blurb: "Transitions, adding or deleting a sentence, placement, topic sentences and conclusions.", basics: ["transitions", "addingSentence", "deletingSentence", "topicSentences", "keepOnGoal"] },
    { key: "language", legacyKey: "english", name: "Knowledge of Language", section: "english", domains: ["language"], blurb: "Concision, redundancy, precise word choice and a consistent tone.", basics: ["redundancy", "concision", "preciseWords", "matchingTone"] },
    { key: "algebra", legacyKey: "math", name: "Preparing for Higher Math", section: "math", domains: ["algebra"], blurb: "Equations, exponents, quadratics, functions and sequences, with every step shown.", basics: ["solveX", "systems", "inequalities", "exponentRules", "factoring", "functionNotation"] },
    { key: "geometry", legacyKey: "math", name: "Geometry and Statistics", section: "math", domains: ["geometry"], blurb: "Angles, triangles, circles, area, probability, mean and median.", basics: ["areaPerimeter", "triangleAngles", "pythagorean", "circleBasics", "meanMedian", "probabilityTable"] },
    { key: "modeling", legacyKey: "math", name: "Essential Skills and Modeling", section: "math", domains: ["modeling"], blurb: "Rates, unit conversions, ratios, percents and real-world graphs.", basics: ["percents", "ratios", "unitConversion", "slope", "exponentialGrowth"] },
    { key: "keyIdeas", legacyKey: "reading", name: "Key Ideas and Details", section: "reading", domains: ["keyIdeas"], blurb: "Main idea, explicit detail, inference, cause and effect, and how characters change.", basics: ["mainIdea", "findingDetail", "inference", "causeEffect", "sequenceEvents"] },
    { key: "craftIntegration", legacyKey: "reading", name: "Craft, Structure and Integration", section: "reading", domains: ["craft", "integration"], blurb: "Words in context, author's purpose, how claims are supported, and paired passages.", basics: ["wordsInContext", "authorPurpose", "toneWords", "textStructure", "crossText", "claimSupport"] },
    { key: "interpretation", legacyKey: "science", name: "Interpretation of Data", section: "science", domains: ["interpretation"], blurb: "Read tables and graphs, spot trends, interpolate and extrapolate.", basics: ["readingTable", "trends", "dataSupports"] },
    { key: "investigation", legacyKey: "science", name: "Scientific Investigation", section: "science", domains: ["investigation"], blurb: "Variables, controls, procedures and how to design the next experiment.", basics: ["variables", "controls", "whyStep", "nextExperiment"] },
    { key: "evaluation", legacyKey: "science", name: "Evaluation of Models", section: "science", domains: ["evaluation"], blurb: "Test claims and hypotheses against data and weigh conflicting viewpoints.", basics: ["dataSupports", "conflictingScientists", "betterModel"] },
  ],
  composite: {
    name: "Composite score",
    min: 1,
    max: 36,
    combine: (sections) => {
      const core = sections.filter((s) => s.section !== "science");
      return Math.round(core.reduce((a, s) => a + s.scaled, 0) / Math.max(1, core.length));
    },
  },
  defaultGoal: 24,
  goalChoices: [20, 24, 28, 30, 33, 35],
  goalNotes: {
    20: "Around the national average",
    24: "Above average, opens most state schools",
    28: "Top 10 percent, competitive for selective schools",
    30: "Top 6 percent, honors programs and scholarships",
    33: "Top 2 percent, the most selective colleges",
    35: "Top 1 percent",
  },
  testLength: "2 hr 45 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each skill. Two timed ACTs wait on a desktop.",
      "Mastery first. English and Reading are passage work; practice the pace.",
      "Halfway through the sections. The full test will show your composite.",
      "Hit your composite goal on a full test to finish the plan.",
      "Goal hit. Go register for your ACT.",
    ],
    sourceLine: "Original passages and questions written to the enhanced ACT format (2025): four choices, 50/45/36/40 questions, Science optional. Not affiliated with ACT, Inc. Score estimates are unofficial.",
    scoreNote: "Section scores are estimates on the 1 to 36 scale from a typical conversion. The composite averages English, Math and Reading; Science is reported on its own, as on the enhanced ACT.",
  },
};
