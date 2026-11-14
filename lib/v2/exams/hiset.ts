import { ExamV2Config, SectionResult } from "../types";
import { curve } from "../scales";

// HiSET (High School Equivalency Test), owned and run by PSI Services LLC
// (developed by ETS). Format and content from PSI's HiSET Test at a Glance
// (TAAG, 2025, PDF updated April 2026) and the 2026 Test Taker Bulletin:
// five subtests, all multiple choice with four options except the Writing
// essay. Language Arts - Reading 50 questions in 65 minutes (literary 40%,
// informational 60%); Language Arts - Writing 60 multiple-choice questions plus
// one essay in 120 minutes (Organization of Ideas 22%, Language Facility 43%,
// Writing Conventions 35%); Mathematics 55 in 90 minutes, calculator neutral
// with a formula sheet (Numbers and Operations 19%, Measurement/Geometry 18%,
// Data Analysis/Probability/Statistics 18%, Algebraic Concepts 45%); Science
// 60 in 80 minutes (Life 49%, Physical 28%, Earth 23%); Social Studies 60 in
// 70 minutes (History 35%, Civics/Government 35%, Economics 20%, Geography
// 10%). Each subtest is scored 1 to 20; passing needs 8 on every subtest, at
// least 2 of 6 on the essay and a total of 45 across the five.
//
// Here each subtest is one shorter timed section at about the real pace, and
// a full practice test is all five with a break between them. Test 2 is held
// out of the drills. PSI publishes no raw-to-scaled table, so each section's
// 1 to 20 score is Tigertest's own estimate from percent correct, and the
// composite is the sum of the five (5 to 100). The essay is not modeled, so
// the Writing estimate is from the multiple-choice part only.
const minutes = (n: number) => n * 60;

// Estimated 1 to 20 score from raw correct out of n. Anchors are Tigertest's,
// set so a little under half correct sits near the passing 8 and about 80%
// correct near the college-ready 15; not an official conversion.
const hisetScale = (n: number) =>
  curve(n, [[0, 1], [Math.round(n * 0.2), 4], [Math.round(n * 0.45), 8], [Math.round(n * 0.65), 12], [Math.round(n * 0.8), 15], [Math.round(n * 0.9), 17], [n, 20]], 1, 1);

const total = (sections: SectionResult[]) => sections.reduce((a, s) => a + s.scaled, 0);

const FORMULAS = [
  "**Area**: rectangle $A = lw$; triangle $A = \\frac{1}{2}bh$; circle $A = \\pi r^2$; trapezoid $A = \\frac{1}{2}(b_1 + b_2)h$",
  "**Circle**: circumference $C = 2\\pi r = \\pi d$",
  "**Volume**: rectangular box $V = lwh$; cylinder $V = \\pi r^2 h$; cone $V = \\frac{1}{3}\\pi r^2 h$; sphere $V = \\frac{4}{3}\\pi r^3$",
  "**Slope** of a line through $(x_1, y_1)$ and $(x_2, y_2)$: $m = \\frac{y_2 - y_1}{x_2 - x_1}$",
  "**Simple interest**: $I = Prt$",
  "Not on the real HiSET formula sheet, so learn them: $d = rt$, the Pythagorean Theorem $a^2 + b^2 = c^2$, and the quadratic formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.",
  "This is Tigertest's own summary, not the official HiSET formula sheet.",
].join("\n\n");

export const HISET: ExamV2Config = {
  id: "hiset",
  slug: "/hiset",
  landingPath: "/hiset-practice-test",
  name: "HiSET Practice Test",
  shortName: "HiSET",
  fullName: "HiSET high school equivalency test",
  tagline: "All five HiSET subtests, timed at the real pace, with the basics taught first.",
  icon: "graduation",
  theme: { brand: "102 90% 28%", brandDark: "102 90% 20%", brandLight: "102 90% 96%" },
  breakSeconds: 300,
  sections: [
    {
      key: "read",
      name: "Language Arts - Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(26) }],
      directions:
        "Five passages, each with four questions: two literary texts (a short story and a poem) and three informational texts (articles, editorials, letters, paired passages). Questions ask about details, word meaning, inference, main idea, the author's purpose and how two texts compare. The real Reading subtest is 50 questions in 65 minutes on longer passages; this section keeps the same pace.",
      scale: hisetScale(20),
      domains: ["hisetLiterary", "hisetInformational"],
    },
    {
      key: "write",
      name: "Language Arts - Writing",
      shortName: "Writing",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(25) }],
      directions:
        "Two drafts with underlined parts and numbered markers, like [3]. For each question, choose the best revision of the underlined part, or NO CHANGE if it is already best. Questions cover organization, word choice, sentence structure, grammar and punctuation. The real Writing subtest also has an essay, which is not part of this practice test.",
      scale: hisetScale(20),
      domains: ["hisetOrganization", "hisetLanguage", "hisetConventions"],
    },
    {
      key: "math",
      name: "Mathematics",
      shortName: "Math",
      calculator: true,
      reference: FORMULAS,
      modules: [{ module: 1, questionCount: 22, timeLimit: minutes(36) }],
      directions:
        "Numbers and operations, measurement and geometry, data and probability, and algebra (45% of the subtest), mostly as real-world problems. The real test is calculator neutral: the test center gives you a calculator if you ask. A calculator and a formula reference are in the tools drawer. Remember that $d = rt$, the Pythagorean Theorem and the quadratic formula are not on the real formula sheet.",
      scale: hisetScale(22),
      domains: ["hisetNumber", "hisetGeometry", "hisetData", "hisetAlgebra"],
    },
    {
      key: "science",
      name: "Science",
      shortName: "Science",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(27) }],
      directions:
        "Life science (about half the subtest), physical science and earth science. Most questions go with a described investigation or a data table: identify the variables and controls, read the data, judge a conclusion or choose the next step.",
      scale: hisetScale(20),
      domains: ["hisetLife", "hisetPhysical", "hisetEarth"],
    },
    {
      key: "social",
      name: "Social Studies",
      shortName: "Social Studies",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(23) }],
      directions:
        "History and civics and government (about a third each), then economics and geography. Some questions go with a short historical document, a data table, an editorial or a described map. Watch for fact versus opinion and what a source can and cannot show.",
      scale: hisetScale(20),
      domains: ["hisetHistory", "hisetCivics", "hisetEconomics", "hisetGeography"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    hisetLiterary: "Literary Texts",
    hisetInformational: "Informational Texts",
    hisetOrganization: "Organization of Ideas",
    hisetLanguage: "Language Facility",
    hisetConventions: "Writing Conventions",
    hisetNumber: "Numbers and Operations",
    hisetGeometry: "Measurement and Geometry",
    hisetData: "Data, Probability and Statistics",
    hisetAlgebra: "Algebraic Concepts",
    hisetLife: "Life Science",
    hisetPhysical: "Physical Science",
    hisetEarth: "Earth Science",
    hisetHistory: "History",
    hisetCivics: "Civics and Government",
    hisetEconomics: "Economics",
    hisetGeography: "Geography",
  },
  // One drill per TAAG content category (economics and geography share one),
  // 15 drills of 12. Ten open with Basics from the shared library; no skill
  // opens two drills (tests/no-repeats.test.cjs). Physical science, earth
  // science and the social studies drills have no Basics yet.
  drillSize: 12,
  drills: [
    { key: "literary", name: "Literary Texts", section: "read", domains: ["hisetLiterary"], blurb: "Short stories and poems: what happens, why characters act, figurative language, tone and theme. 40% of Reading.", basics: ["inference", "wordsInContext", "toneWords", "figurativeLanguage", "storyTheme"] },
    { key: "informational", name: "Informational Texts", section: "read", domains: ["hisetInformational"], blurb: "Articles, editorials, letters and paired passages: main idea, detail, the author's purpose, evidence and fact versus opinion. 60% of Reading.", basics: ["mainIdea", "findingDetail", "authorPurpose", "claimSupport", "factOpinion", "textStructure"] },
    { key: "organization", name: "Organization of Ideas", section: "write", domains: ["hisetOrganization"], blurb: "Opening and closing sentences, transitions, and whether a sentence belongs. 22% of the Writing multiple choice.", basics: ["transitions", "addingSentence", "deletingSentence", "topicSentences", "keepOnGoal"] },
    { key: "language", name: "Language Facility", section: "write", domains: ["hisetLanguage"], blurb: "Precise words, concise and varied sentences, parallel structure, modifiers and the right tone. 43% of the Writing multiple choice.", basics: ["preciseWords", "matchingTone", "concision", "redundancy", "danglingModifiers"] },
    { key: "conventions", name: "Writing Conventions", section: "write", domains: ["hisetConventions"], blurb: "Agreement, verb tense, pronoun case, run-ons and fragments, commas, apostrophes and commonly confused words. 35% of the Writing multiple choice.", basics: ["subjectVerb", "commaSplices", "apostrophes", "pronounCase", "verbTense", "commonlyConfused", "listIntroCommas"] },
    { key: "number", name: "Numbers and Operations", section: "math", domains: ["hisetNumber"], blurb: "Fractions, percents, ratios, exponents, scientific notation, units and money problems.", basics: ["fractionOps", "percents", "ratios", "scientificNotation", "exponentRules", "unitConversion"] },
    { key: "geometry", name: "Measurement and Geometry", section: "math", domains: ["hisetGeometry"], blurb: "Area, perimeter, volume, circles, angles, similar triangles, transformations and the Pythagorean Theorem.", basics: ["areaPerimeter", "circleBasics", "pythagorean", "triangleAngles", "volume"] },
    { key: "data", name: "Data, Probability and Statistics", section: "math", domains: ["hisetData"], blurb: "Mean and median, tables and two-way tables, scatter plots, samples and probability.", basics: ["meanMedian", "probabilityTable", "readingTable", "trends"] },
    { key: "algebra", name: "Algebraic Concepts", section: "math", domains: ["hisetAlgebra"], blurb: "Equations and inequalities, systems, slope, functions, quadratics and exponential models. 45% of Math.", basics: ["solveX", "slope", "systems", "inequalities", "factoring", "functionNotation", "distributing"] },
    { key: "life", name: "Life Science", section: "science", domains: ["hisetLife"], blurb: "Cells, genetics, body systems and ecosystems, mostly from experiments and data. About half of Science.", basics: ["variables", "controls", "dataSupports", "nextExperiment"] },
    { key: "physical", name: "Physical Science", section: "science", domains: ["hisetPhysical"], blurb: "Forces and motion, matter, energy, light, electricity and chemical reactions." },
    { key: "earth", name: "Earth Science", section: "science", domains: ["hisetEarth"], blurb: "Rocks, weather, plate tectonics, the water cycle, the solar system and stars." },
    { key: "history", name: "History", section: "social", domains: ["hisetHistory"], blurb: "U.S. and world history from river valley civilizations to the Cold War, often from a primary source." },
    { key: "civics", name: "Civics and Government", section: "social", domains: ["hisetCivics"], blurb: "The Constitution and its amendments, the branches of government, federalism, rights and citizenship." },
    { key: "economics", name: "Economics and Geography", section: "social", domains: ["hisetEconomics", "hisetGeography"], blurb: "Supply and demand, opportunity cost, interest, credit and policy, then maps, population and migration." },
  ],
  composite: { name: "Estimated total score", min: 5, max: 100, combine: total },
  defaultGoal: 50,
  goalChoices: [45, 50, 55, 60, 75],
  goalNotes: {
    45: "The total needed to pass, if every subtest is at least 8",
    50: "A small margin over the passing total",
    55: "A safe margin over passing",
    60: "About 12 on every subtest",
    75: "College and Career Readiness territory (15 on each)",
  },
  testLength: "2 hr 37 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each subtest.",
      "Master each drill first.",
      "Take the full test to see your score.",
      "Hit your goal on the full test.",
      "Goal hit. Go schedule your HiSET.",
    ],
    sourceLine: "Based on the content categories in PSI's HiSET Test at a Glance. Original questions; not affiliated with PSI Services or ETS.",
    scoreNote: "Scores here are estimates. Each subtest's percent correct is converted to an estimated 1 to 20 score with Tigertest's own curve, and the total is the sum of the five. PSI publishes no conversion table. To pass the real HiSET you need at least 8 on every subtest, at least 2 of 6 on the essay and a total of 45; the essay is not modeled, so the Writing estimate covers the multiple-choice part only.",
  },
};
