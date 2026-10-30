import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Praxis Core Academic Skills for Educators (ETS), from the ETS study
// companions for Reading 5713, Writing 5723 and Mathematics 5733 (checked
// October 2026). The real tests are taken separately or together as the
// combined test 5752:
// - Reading 5713: 56 selected-response questions in 85 minutes on paired,
//   long and short passages, brief statements and data; Key Ideas and Details
//   17 to 22, Craft, Structure, and Language Skills 14 to 19, Integration of
//   Knowledge and Ideas 17 to 22.
// - Writing 5723: a 40-minute section of 40 selected-response questions
//   (usage, sentence correction, revision in context, research skills), then
//   two 30-minute essays, argumentative and informative/explanatory. Text
//   Types, Purposes, and Production is 6 to 12 selected-response questions
//   plus both essays (60%); Language and Research Skills for Writing is 28 to
//   34 selected-response questions (40%). The essays are not modelled.
// - Mathematics 5733: 56 questions in 90 minutes with an on-screen
//   four-function calculator; select one of five, select one or more, and
//   numeric entry. Number and Quantity 20 (36%), Data Interpretation and
//   Representation, Statistics, and Probability 18 (32%), Algebra and
//   Geometry 18 (32%).
// Each practice test here is the three selected-response parts at half length
// and the real pace: Reading 28 in 43 minutes (10/8/10), Writing 20 in 20
// minutes (5 revision, 15 language and research) and Math 28 in 45 minutes
// (10/9/9). Test 2 is held out of the drills. Scores are percent correct;
// states set their own passing scaled scores (100 to 200), which are not a
// fixed percent. Sources: tools/praxis/sources.md.
const minutes = (n: number) => n * 60;

export const PRAXIS: ExamV2Config = {
  id: "praxis",
  slug: "/praxis-core",
  landingPath: "/praxis-core-practice-test",
  name: "Praxis Core Practice Test",
  shortName: "Praxis Core",
  fullName: "Praxis Core Academic Skills for Educators (Reading 5713, Writing 5723, Math 5733)",
  tagline: "Reading, Writing and Math for future teachers, timed at the real Praxis Core pace, with the basics taught first.",
  icon: "graduation",
  theme: { brand: "48 40% 28%", brandDark: "48 40% 19%", brandLight: "48 40% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "reading",
      name: "Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 28, timeLimit: minutes(43) }],
      directions:
        "Each question is based on a passage or a short statement: a long passage, a pair of passages on the same topic, short passages, one-paragraph statements and a table of data. Answer from what the passage states or implies. Choose the one best answer of five. This is half the length of the real 85-minute Reading test (5713), at the same pace.",
      scale: percentScale(28),
      domains: ["praxisIdeas", "praxisCraft", "praxisIntegration"],
    },
    {
      key: "writing",
      name: "Writing (selected response)",
      shortName: "Writing",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(20) }],
      directions:
        "Four kinds of questions, in the order of the real test. Usage: find the underlined part that must be changed, or choose No error. Sentence correction: choose the best version of the underlined part; choice A repeats the original. Revision in context: improve a short draft whose sentences are numbered. Research skills: judge sources, citations and search strategies. The real Writing test (5723) adds two 30-minute essays, which are not part of this practice test.",
      scale: percentScale(20),
      domains: ["praxisRevision", "praxisLanguage"],
    },
    {
      key: "math",
      name: "Mathematics",
      shortName: "Math",
      calculator: true,
      modules: [{ module: 1, questionCount: 28, timeLimit: minutes(45) }],
      directions:
        "Number and quantity, data and probability, and algebra and geometry. Most questions have one answer of five; some ask you to select all that apply, and some ask you to type a number (digits, a decimal point, a minus sign or a fraction such as 3/4, no units or commas). A calculator is available, as the real test (5733) provides an on-screen four-function calculator. Any formula you need is given in the question.",
      scale: percentScale(28),
      domains: ["praxisNumber", "praxisData", "praxisAlgGeo"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    praxisIdeas: "Reading: Key Ideas and Details",
    praxisCraft: "Reading: Craft, Structure, and Language Skills",
    praxisIntegration: "Reading: Integration of Knowledge and Ideas",
    praxisRevision: "Writing: Text Types, Purposes, and Production (revision)",
    praxisLanguage: "Writing: Language and Research Skills",
    praxisNumber: "Math: Number and Quantity",
    praxisData: "Math: Data, Statistics, and Probability",
    praxisAlgGeo: "Math: Algebra and Geometry",
  },
  // Seven drills. Key Ideas, Language and Number open with Basics from the
  // shared library, so the dashboard is 7 drills + 3 Basics steps + 2 tests
  // = 12 steps.
  drills: [
    { key: "ideas", name: "Key Ideas and Details", section: "reading", domains: ["praxisIdeas"], blurb: "Main idea, supporting details, inferences and restating what a passage says.", basics: ["mainIdea", "findingDetail", "inference"] },
    { key: "craft", name: "Craft, Structure and Integration", section: "reading", domains: ["praxisCraft", "praxisIntegration"], blurb: "Tone, word meaning, organization, paired passages, arguments, evidence and data tables." },
    { key: "language", name: "Usage and Sentence Correction", section: "writing", domains: ["praxisLanguage"], blurb: "Agreement, pronouns, verb tense, modifiers, commonly confused words, plus research and citation skills.", basics: ["subjectVerb", "pronounCase", "verbTense", "commaSplices", "apostrophes", "commonlyConfused", "danglingModifiers"] },
    { key: "revision", name: "Revision in Context", section: "writing", domains: ["praxisRevision"], blurb: "Improve short drafts: combining sentences, word choice, focus, tone and conclusions." },
    { key: "number", name: "Number and Quantity", section: "math", domains: ["praxisNumber"], blurb: "Fractions, decimals, percents, ratios, rates, place value, factors and unit conversion. 36% of Math.", basics: ["fractionOps", "decimals", "percents", "ratios", "rateProblems", "unitConversion"] },
    { key: "data", name: "Data, Statistics and Probability", section: "math", domains: ["praxisData"], blurb: "Tables and graphs, mean, median, mode, range, outliers and probability. 32% of Math." },
    { key: "algebra", name: "Algebra and Geometry", section: "math", domains: ["praxisAlgGeo"], blurb: "Expressions, equations, inequalities, angles, similar figures, area and volume. 32% of Math." },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [60, 65, 70, 75, 80, 85],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target, a sensible readiness line",
    75: "75% practice score target, a safe margin in most states",
    80: "80% practice score target",
    85: "85% practice score target",
  },
  testLength: "1 hr 50 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each skill.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Go book your Praxis Core.",
    ],
    sourceLine: "Original questions written to the ETS Praxis Core study companions for Reading (5713), Writing (5723) and Mathematics (5733). Not affiliated with or endorsed by ETS.",
    scoreNote: "Scores here are percent correct per section. The real Praxis Core reports a scaled score from 100 to 200 for each test, and each state sets its own passing score, so check your state's requirement and aim for a comfortable margin.",
  },
};
