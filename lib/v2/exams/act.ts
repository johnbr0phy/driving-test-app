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
  drills: [
    { key: "english", name: "English", section: "english", domains: ["conventions", "production", "language"], blurb: "Punctuation, grammar, sentence structure, organization and word choice, passage by passage." },
    { key: "math", name: "Mathematics", section: "math", domains: ["algebra", "geometry", "modeling"], blurb: "Algebra, functions, geometry, trig, statistics and modeling, with every step shown." },
    { key: "reading", name: "Reading", section: "reading", domains: ["keyIdeas", "craft", "integration"], blurb: "Long passages beside the question: main idea, detail, inference, vocabulary and author's craft." },
    { key: "science", name: "Science", section: "science", domains: ["interpretation", "investigation", "evaluation"], blurb: "Tables, experiments and conflicting viewpoints. Read the data, spot the trend." },
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
      "Four section drills on your phone, then two full timed ACTs on a desktop. Test 2 stays unseen until you sit it.",
      "Mastery first. English and Reading are passage work; practice the pace.",
      "Halfway through the sections. The full test will show your composite.",
      "Hit your composite goal on a full test to finish the plan.",
      "Goal hit. Go register for your ACT.",
    ],
    sourceLine: "Original passages and questions written to the enhanced ACT format (2025): four choices, 50/45/36/40 questions, Science optional. Not affiliated with ACT, Inc. Score estimates are unofficial.",
    scoreNote: "Section scores are estimates on the 1 to 36 scale from a typical conversion. The composite averages English, Math and Reading; Science is reported on its own, as on the enhanced ACT.",
  },
};
