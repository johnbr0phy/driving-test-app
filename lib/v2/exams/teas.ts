import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// ATI TEAS 7: Reading 45 items / 55 min, Mathematics 38 / 57, Science 50 / 60,
// English and Language Usage 37 / 37, with a break after Math. Scores are
// reported as percent correct per section plus a composite. One full-length
// test from the 200-item bank; the rest of the bank lives in the drills.
export const TEAS: ExamV2Config = {
  id: "teas",
  slug: "/teas",
  landingPath: "/teas-practice-test",
  name: "TEAS Practice Test",
  shortName: "TEAS",
  fullName: "ATI TEAS 7 nursing school entrance exam",
  tagline: "Four timed sections like the real TEAS 7, scored as percentages.",
  icon: "graduation",
  theme: { brand: "95 50% 34%", brandDark: "95 50% 24%", brandLight: "95 60% 95%" },
  breakSeconds: 600,
  sections: [
    {
      key: "reading",
      name: "Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 45, timeLimit: 55 * 60 }],
      directions: "Each question comes with its own short passage. Read the passage, then choose the best answer. Key ideas and details, craft and structure, and integrating ideas are all covered.",
      scale: percentScale(45),
      domains: ["teasReading"],
    },
    {
      key: "math",
      name: "Mathematics",
      shortName: "Math",
      calculator: true,
      breakAfter: true,
      modules: [{ module: 1, questionCount: 38, timeLimit: 57 * 60 }],
      directions: "Numbers and algebra, then measurement and data. A four-function calculator is provided on the real test and here, so the work is in setting each problem up correctly.",
      scale: percentScale(38),
      domains: ["teasNumbers", "teasMeasurement"],
    },
    {
      key: "science",
      name: "Science",
      shortName: "Science",
      modules: [{ module: 1, questionCount: 50, timeLimit: 60 * 60 }],
      directions: "Human anatomy and physiology carry the most weight, followed by biology, chemistry and scientific reasoning. No calculator.",
      scale: percentScale(50),
      domains: ["teasScience"],
    },
    {
      key: "english",
      name: "English and Language Usage",
      shortName: "English",
      modules: [{ module: 1, questionCount: 37, timeLimit: 37 * 60 }],
      directions: "Conventions of standard English, knowledge of language, and vocabulary acquisition. One minute per question on the real test.",
      scale: percentScale(37),
      domains: ["teasConventions", "teasLanguage"],
    },
  ],
  tests: [{ number: 1, name: "Full-length TEAS" }],
  domainLabels: {
    teasReading: "Reading",
    teasNumbers: "Numbers and Algebra",
    teasMeasurement: "Measurement and Data",
    teasScience: "Science",
    teasConventions: "Conventions of Standard English",
    teasLanguage: "Knowledge of Language and Vocabulary",
    // Results saved before Math and English were split by subdomain.
    teasMath: "Mathematics",
    teasEnglish: "English and Language Usage",
  },
  // Math and English are split by ATI subdomain so each drill opens with a
  // short Basics list; legacyKey carries progress from the old one-per-section
  // drills. Science has no Basics yet (anatomy and physiology needs its own).
  drills: [
    { key: "reading", name: "Reading", section: "reading", domains: ["teasReading"], blurb: "Passages with main idea, detail, inference and structure questions.", basics: ["mainIdea", "findingDetail", "inference", "sequenceEvents", "authorPurpose", "textStructure", "wordsInContext"] },
    { key: "numbers", legacyKey: "math", name: "Numbers and Algebra", section: "math", domains: ["teasNumbers"], blurb: "Fractions, percents, ratios, order of operations and equations, every step worked.", basics: ["fractionConvert", "fractionOps", "orderOfOperations", "percents", "percentChange", "ratios", "solveX", "inequalities", "scientificNotation"] },
    { key: "measurement", legacyKey: "math", name: "Measurement and Data", section: "math", domains: ["teasMeasurement"], blurb: "Dosage, unit conversions, area, circles, volume and the Pythagorean theorem, plus mean and median.", basics: ["dosage", "unitConversion", "areaPerimeter", "circleBasics", "volume", "pythagorean", "meanMedian"] },
    { key: "science", name: "Science", section: "science", domains: ["teasScience"], blurb: "Anatomy and physiology first, then biology, chemistry and reasoning." },
    { key: "conventions", legacyKey: "english", name: "Grammar and Punctuation", section: "english", domains: ["teasConventions"], blurb: "Spelling, capitalization, punctuation, agreement and sentence structure.", basics: ["semicolons", "colons", "apostrophes", "itsIts", "subjectVerb", "danglingModifiers"] },
    { key: "language", legacyKey: "english", name: "Language and Vocabulary", section: "english", domains: ["teasLanguage"], blurb: "Tone, concision, transitions, word meaning in context and medical word parts.", basics: ["matchingTone", "concision", "redundancy", "transitions", "wordsInContext", "preciseWords"] },
  ],
  composite: { name: "Composite score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [60, 65, 70, 75, 80, 90],
  goalNotes: {
    60: "Minimum at many programs",
    65: "Common program cutoff",
    70: "Competitive at most programs",
    75: "Proficient band, safe almost anywhere",
    80: "Advanced band",
    90: "Exemplary band",
  },
  testLength: "3 hr 29 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each skill.",
      "Master each drill first.",
      "Halfway there. Try the full test.",
      "Hit your goal on the full test.",
      "Goal hit. Schedule your TEAS.",
    ],
    sourceLine: "Matched to the ATI TEAS 7 blueprint and timing. Includes select-all-that-apply, fill-in and ordered-response items like the real exam; image hot spots are not modelled. Not affiliated with ATI.",
    scoreNote: "Scores are percent correct per section, like the ATI score report. Program cutoffs vary; many ask for 60 to 70 percent.",
  },
};
