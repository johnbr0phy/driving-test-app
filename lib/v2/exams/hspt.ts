import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// STS High School Placement Test (Scholastic Testing Service), the grade 8
// placement and admissions test many Catholic and private high schools give.
// Five multiple-choice subtests (HSPT Interpretive Manual, Closed HSPT and
// Pre-HSPT): Verbal Skills 60 items, Quantitative Skills 52, Reading 62,
// Mathematics 64, Language 60, 298 in all; working time 2 hours 30 minutes
// (STS 2026-27 catalog); no calculators; number right with no guessing
// penalty, converted to standard scores (200 to 800), percentiles and a
// cognitive skills quotient. Optional science and Catholic religion tests are
// not modelled. Per test here, about a third of each subtest in the skill
// split of the manual's sample Performance Profile: Verbal 20 (synonyms 4,
// antonyms 3, analogies 3, classification 6, logic 4), Quantitative 18 (series
// 5, number manipulation 5, geometric comparison 4, non-geometric comparison
// 4), Reading 20 (informational 10, literary 3, vocabulary 7), Mathematics 22
// (numbers 10, measurement 2, geometry 4, algebra 3, statistics 3), Language 20
// (punctuation and capitals 4, usage 6, spelling 3, composition 7). STS
// publishes no subtest times, so the clocks are Tigertest's split of the real
// pace (about 30 seconds an item). Scored as percent correct, never STS
// standard scores. Test 2 is held out of the drills. Bank built by
// tools/next100/hspt/build.py.

const minutes = (n: number) => n * 60;

export const HSPT: ExamV2Config = {
  id: "hspt",
  slug: "/hspt",
  landingPath: "/hspt-practice-test",
  name: "HSPT Practice Test",
  shortName: "HSPT",
  fullName: "HSPT (High School Placement Test)",
  tagline: "Verbal, quantitative, reading, math and language practice for the grade 8 High School Placement Test.",
  icon: "graduation",
  theme: { brand: "84 25% 38%", brandDark: "84 25% 29%", brandLight: "84 30% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "verbal",
      name: "Verbal Skills",
      shortName: "Verbal",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(7) }],
      directions:
        "20 questions on synonyms, antonyms, analogies, words that do not belong and true, false or uncertain reasoning. These go fast on the real test, so answer what you know and keep moving.",
      scale: percentScale(20),
      domains: ["hsptSynonyms", "hsptAntonyms", "hsptAnalogies", "hsptClassify", "hsptLogic"],
    },
    {
      key: "quant",
      name: "Quantitative Skills",
      shortName: "Quantitative",
      modules: [{ module: 1, questionCount: 18, timeLimit: minutes(10) }],
      calculator: false,
      directions:
        "18 questions on number series, number puzzles and comparing quantities and shapes. No calculator, as on the real test; use scratch paper.",
      scale: percentScale(18),
      domains: ["hsptSeries", "hsptQuantReason", "hsptGeoCompare", "hsptNumCompare"],
    },
    {
      key: "reading",
      name: "Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(9) }],
      directions:
        "20 questions: three passages with questions on main idea, details, inferences and word meanings, then vocabulary in short phrases. The passage stays beside its questions.",
      scale: percentScale(20),
      domains: ["hsptReadInfo", "hsptReadLit", "hsptReadVocab"],
    },
    {
      key: "math",
      name: "Mathematics",
      shortName: "Math",
      modules: [{ module: 1, questionCount: 22, timeLimit: minutes(15) }],
      calculator: false,
      directions:
        "22 questions on fractions, decimals, percents, ratios, measurement, geometry, algebra and data. No calculator, as on the real test; work on scratch paper.",
      scale: percentScale(22),
      domains: ["hsptMathNumbers", "hsptMathMeasure", "hsptMathGeometry", "hsptMathAlgebra", "hsptMathStats"],
    },
    {
      key: "language",
      name: "Language",
      shortName: "Language",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(9) }],
      directions:
        "20 questions on punctuation, capital letters, usage, spelling and writing clear sentences and paragraphs.",
      scale: percentScale(20),
      domains: ["hsptLangPunct", "hsptLangUsage", "hsptLangSpelling", "hsptLangComp"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    hsptSynonyms: "Synonyms",
    hsptAntonyms: "Antonyms",
    hsptAnalogies: "Verbal Analogies",
    hsptClassify: "Verbal Classification",
    hsptLogic: "Logical Reasoning",
    hsptSeries: "Number Series",
    hsptQuantReason: "Number Manipulation",
    hsptGeoCompare: "Geometric Comparison",
    hsptNumCompare: "Non-Geometric Comparison",
    hsptReadInfo: "Informational Text",
    hsptReadLit: "Literary Text",
    hsptReadVocab: "Vocabulary",
    hsptMathNumbers: "Numbers and Numeration",
    hsptMathMeasure: "Measurement",
    hsptMathGeometry: "Geometry",
    hsptMathAlgebra: "Algebra",
    hsptMathStats: "Statistics and Probability",
    hsptLangPunct: "Punctuation and Capitalization",
    hsptLangUsage: "Usage",
    hsptLangSpelling: "Spelling",
    hsptLangComp: "Composition",
  },
  // Two drills per subtest, 15 exam-level items each; every domain is in one drill.
  drillSize: 15,
  drills: [
    { key: "words", name: "Synonyms and Antonyms", section: "verbal", domains: ["hsptSynonyms", "hsptAntonyms"], blurb: "Words that mean the same and words that mean the opposite." },
    { key: "verbalReasoning", name: "Analogies, Classification and Logic", section: "verbal", domains: ["hsptAnalogies", "hsptClassify", "hsptLogic"], blurb: "Word relationships, the word that does not belong, and true, false or uncertain." },
    { key: "series", name: "Number Series and Puzzles", section: "quant", domains: ["hsptSeries", "hsptQuantReason"], blurb: "What comes next in a series, and number puzzles such as what number is 5 more than 3/4 of 20." },
    { key: "comparisons", name: "Comparisons", section: "quant", domains: ["hsptGeoCompare", "hsptNumCompare"], blurb: "Comparing three quantities or two shapes and choosing the true statement." },
    { key: "comprehension", name: "Reading Comprehension", section: "reading", domains: ["hsptReadInfo", "hsptReadLit"], blurb: "Main idea, details, inferences and word meanings in articles and stories." },
    { key: "vocabulary", name: "Vocabulary", section: "reading", domains: ["hsptReadVocab"], blurb: "The meaning of an underlined word in a short phrase." },
    { key: "numbers", name: "Numbers and Numeration", section: "math", domains: ["hsptMathNumbers"], blurb: "Fractions, decimals, percents, exponents, ratios, factors and word problems." },
    { key: "geometryData", name: "Measurement, Geometry, Algebra and Data", section: "math", domains: ["hsptMathMeasure", "hsptMathGeometry", "hsptMathAlgebra", "hsptMathStats"], blurb: "Units, angles, area and volume, equations, mean and median, and probability." },
    { key: "mechanics", name: "Punctuation, Capitals and Spelling", section: "language", domains: ["hsptLangPunct", "hsptLangSpelling"], blurb: "Commas, apostrophes, colons, quotation marks, capital letters and tricky spellings." },
    { key: "usage", name: "Usage and Composition", section: "language", domains: ["hsptLangUsage", "hsptLangComp"], blurb: "Agreement, pronouns, verb forms, transitions and clear sentences and paragraphs." },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [60, 65, 70, 75, 80, 85, 90],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target",
    75: "75% practice score target, a solid all-round result",
    80: "80% practice score target",
    85: "85% practice score target, aiming for honors placement",
    90: "90% practice score target, aiming for a scholarship",
  },
  testLength: "50 minutes (the real HSPT is 2 hours 30 minutes)",
  copy: {
    heroSubs: [
      "Ten drills, two practice tests. Start with Synonyms and Antonyms.",
      "Master each drill first.",
      "Take a full practice test to see your score.",
      "Hit your goal on a full practice test.",
      "Goal hit. You're ready for test day.",
    ],
    sourceLine: "Built on Scholastic Testing Service's published HSPT subtests and skill areas (checked November 2026). Original questions; not affiliated with Scholastic Testing Service.",
    scoreNote: "Scores here are percent correct, overall and per subtest. The real HSPT turns the number right into standard scores (200 to 800), national and local percentiles and a cognitive skills quotient, and each high school sets its own cut-offs for admission, placement and scholarships. There is no penalty for guessing on the real test, so answer every question.",
  },
};
