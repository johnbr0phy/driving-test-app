import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// HESI A2: programs pick sections; the common battery is Math, Reading,
// Vocabulary, Grammar, Biology, Chemistry and Anatomy and Physiology, each
// timed separately and scored as a percentage. The full test here uses the
// whole 200-item bank at the real test's pace (about 0.9 minutes a question).
const minutes = (n: number) => n * 60;

export const HESI: ExamV2Config = {
  id: "hesi",
  slug: "/hesi",
  landingPath: "/hesi-a2-practice-test",
  name: "HESI A2 Practice Test",
  shortName: "HESI A2",
  fullName: "HESI Admission Assessment (A2) exam",
  tagline: "Seven timed sections, each scored on its own like the real HESI A2.",
  icon: "book",
  theme: { brand: "310 60% 45%", brandDark: "310 60% 33%", brandLight: "310 70% 95%" },
  breakSeconds: 0,
  sections: [
    { key: "math", name: "Mathematics", shortName: "Math", calculator: true, modules: [{ module: 1, questionCount: 36, timeLimit: minutes(33) }], directions: "Basic math, fractions, decimals, ratios, conversions and dosage calculations. An on-screen calculator is provided, as on the real exam.", scale: percentScale(36), domains: ["hesiNumbers", "hesiConversions"] },
    { key: "reading", name: "Reading Comprehension", shortName: "Reading", modules: [{ module: 1, questionCount: 32, timeLimit: minutes(35) }], directions: "Each question comes with a short health-related passage. Main idea, supporting detail, meaning in context, inference and tone.", scale: percentScale(32), domains: ["hesiReading"] },
    { key: "vocabulary", name: "Vocabulary and General Knowledge", shortName: "Vocab", modules: [{ module: 1, questionCount: 32, timeLimit: minutes(29) }], directions: "Health care vocabulary and general words used in nursing contexts.", scale: percentScale(32), domains: ["hesiVocabulary"] },
    { key: "grammar", name: "Grammar", shortName: "Grammar", modules: [{ module: 1, questionCount: 32, timeLimit: minutes(29) }], directions: "Parts of speech, agreement, pronouns, commonly confused words and sentence structure.", scale: percentScale(32), domains: ["hesiGrammar"] },
    { key: "biology", name: "Biology", shortName: "Biology", modules: [{ module: 1, questionCount: 24, timeLimit: minutes(20) }], directions: "Cells, metabolism, genetics, cellular respiration, photosynthesis and classification.", scale: percentScale(24), domains: ["hesiBiology"] },
    { key: "chemistry", name: "Chemistry", shortName: "Chem", modules: [{ module: 1, questionCount: 20, timeLimit: minutes(17) }], directions: "Atomic structure, the periodic table, bonding, reactions, solutions and acids and bases.", scale: percentScale(20), domains: ["hesiChemistry"] },
    { key: "anatomy", name: "Anatomy and Physiology", shortName: "A&P", modules: [{ module: 1, questionCount: 24, timeLimit: minutes(20) }], directions: "Body systems, anatomical terminology and how structures and functions fit together.", scale: percentScale(24), domains: ["hesiAnatomy"] },
  ],
  tests: [{ number: 1, name: "Full HESI A2 battery" }],
  domainLabels: {
    hesiNumbers: "Numbers and Operations",
    hesiConversions: "Conversions and Dosage",
    hesiReading: "Reading Comprehension",
    hesiVocabulary: "Vocabulary",
    hesiGrammar: "Grammar",
    hesiBiology: "Biology",
    hesiChemistry: "Chemistry",
    hesiAnatomy: "Anatomy and Physiology",
    // Results saved before Math was split into two drills.
    hesiMath: "Mathematics",
  },
  // Math is split in two so each drill opens with a short Basics list;
  // legacyKey carries progress from the old single Math drill. The science
  // drills have no Basics yet.
  drills: [
    { key: "numbers", legacyKey: "math", name: "Numbers and Operations", section: "math", domains: ["hesiNumbers"], blurb: "Fractions, decimals, percents, ratios, Roman numerals and basic algebra, every step worked.", basics: ["fractionOps", "decimals", "rounding", "ratios", "percents", "percentChange", "orderOfOperations", "romanNumerals", "solveX", "distributing"] },
    { key: "conversions", legacyKey: "math", name: "Conversions and Dosage", section: "math", domains: ["hesiConversions"], blurb: "Household and metric units, dosage, IV rates, military time and temperature.", basics: ["unitConversion", "dosage", "militaryTime", "substitution"] },
    { key: "reading", name: "Reading Comprehension", section: "reading", domains: ["hesiReading"], blurb: "Short health passages with main idea, detail and inference questions.", basics: ["mainIdea", "findingDetail", "inference", "wordsInContext", "authorPurpose", "toneWords", "factOpinion", "sequenceEvents", "causeEffect"] },
    { key: "vocabulary", name: "Vocabulary", section: "vocabulary", domains: ["hesiVocabulary"], blurb: "The words nursing programs expect you to know.", basics: ["wordsInContext", "wordParts"] },
    { key: "grammar", name: "Grammar", section: "grammar", domains: ["hesiGrammar"], blurb: "Agreement, pronouns, confused words and sentence structure.", basics: ["subjectVerb", "pronounCase", "verbTense", "commonlyConfused", "apostrophes", "commaSplices", "semicolons", "colons", "listIntroCommas"] },
    { key: "biology", name: "Biology", section: "biology", domains: ["hesiBiology"], blurb: "Cells, genetics, metabolism and classification." },
    { key: "chemistry", name: "Chemistry", section: "chemistry", domains: ["hesiChemistry"], blurb: "Atoms, bonding, reactions, solutions and pH." },
    { key: "anatomy", name: "Anatomy and Physiology", section: "anatomy", domains: ["hesiAnatomy"], blurb: "Body systems and the terms that describe them." },
  ],
  composite: { name: "Cumulative score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [70, 75, 80, 85, 90, 95],
  goalNotes: {
    70: "Minimum at some programs",
    75: "The most common program cutoff",
    80: "Safe at most programs",
    85: "Competitive for selective programs",
    90: "Top band",
    95: "Near perfect",
  },
  testLength: "3 hr 3 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each section.",
      "Master each drill first.",
      "Halfway there. Try the full test.",
      "Hit your goal on the full battery.",
      "Goal hit. Book your HESI A2.",
    ],
    sourceLine: "Based on the HESI A2 section outlines (math, reading, vocabulary, grammar, biology, chemistry, anatomy and physiology). Physics is not included. Not affiliated with Elsevier.",
    scoreNote: "Each section is scored as percent correct, like the HESI report. Most programs want 75 percent or better in each section they require.",
  },
};
