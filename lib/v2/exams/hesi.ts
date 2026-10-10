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
    { key: "math", name: "Mathematics", shortName: "Math", calculator: true, modules: [{ module: 1, questionCount: 36, timeLimit: minutes(33) }], directions: "Basic math, fractions, decimals, ratios, conversions and dosage calculations. An on-screen calculator is provided, as on the real exam.", scale: percentScale(36), domains: ["hesiMath"] },
    { key: "reading", name: "Reading Comprehension", shortName: "Reading", modules: [{ module: 1, questionCount: 32, timeLimit: minutes(35) }], directions: "Each question comes with a short health-related passage. Main idea, supporting detail, meaning in context, inference and tone.", scale: percentScale(32), domains: ["hesiReading"] },
    { key: "vocabulary", name: "Vocabulary and General Knowledge", shortName: "Vocab", modules: [{ module: 1, questionCount: 32, timeLimit: minutes(29) }], directions: "Health care vocabulary and general words used in nursing contexts.", scale: percentScale(32), domains: ["hesiVocabulary"] },
    { key: "grammar", name: "Grammar", shortName: "Grammar", modules: [{ module: 1, questionCount: 32, timeLimit: minutes(29) }], directions: "Parts of speech, agreement, pronouns, commonly confused words and sentence structure.", scale: percentScale(32), domains: ["hesiGrammar"] },
    { key: "biology", name: "Biology", shortName: "Biology", modules: [{ module: 1, questionCount: 24, timeLimit: minutes(20) }], directions: "Cells, metabolism, genetics, cellular respiration, photosynthesis and classification.", scale: percentScale(24), domains: ["hesiBiology"] },
    { key: "chemistry", name: "Chemistry", shortName: "Chem", modules: [{ module: 1, questionCount: 20, timeLimit: minutes(17) }], directions: "Atomic structure, the periodic table, bonding, reactions, solutions and acids and bases.", scale: percentScale(20), domains: ["hesiChemistry"] },
    { key: "anatomy", name: "Anatomy and Physiology", shortName: "A&P", modules: [{ module: 1, questionCount: 24, timeLimit: minutes(20) }], directions: "Body systems, anatomical terminology and how structures and functions fit together.", scale: percentScale(24), domains: ["hesiAnatomy"] },
  ],
  tests: [{ number: 1, name: "Full HESI A2 battery" }],
  domainLabels: {
    hesiMath: "Mathematics",
    hesiReading: "Reading Comprehension",
    hesiVocabulary: "Vocabulary",
    hesiGrammar: "Grammar",
    hesiBiology: "Biology",
    hesiChemistry: "Chemistry",
    hesiAnatomy: "Anatomy and Physiology",
  },
  drills: [
    { key: "math", name: "Mathematics", section: "math", domains: ["hesiMath"], blurb: "Dosage, conversions, fractions and decimals with every step shown.", weight: "55 questions on the real exam" },
    { key: "reading", name: "Reading Comprehension", section: "reading", domains: ["hesiReading"], blurb: "Short health passages with main idea, detail and inference questions.", weight: "55 questions on the real exam" },
    { key: "vocabulary", name: "Vocabulary", section: "vocabulary", domains: ["hesiVocabulary"], blurb: "The words nursing programs expect you to know.", weight: "55 questions on the real exam" },
    { key: "grammar", name: "Grammar", section: "grammar", domains: ["hesiGrammar"], blurb: "Agreement, pronouns, confused words and sentence structure.", weight: "55 questions on the real exam" },
    { key: "biology", name: "Biology", section: "biology", domains: ["hesiBiology"], blurb: "Cells, genetics, metabolism and classification.", weight: "30 questions on the real exam" },
    { key: "chemistry", name: "Chemistry", section: "chemistry", domains: ["hesiChemistry"], blurb: "Atoms, bonding, reactions, solutions and pH.", weight: "30 questions on the real exam" },
    { key: "anatomy", name: "Anatomy and Physiology", section: "anatomy", domains: ["hesiAnatomy"], blurb: "Body systems and the terms that describe them.", weight: "30 questions on the real exam" },
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
      "Seven section drills on your phone, then the full timed battery on a desktop.",
      "Mastery first. Programs usually look at every section, not just the total.",
      "Halfway through the sections. The full battery will show where you stand.",
      "Hit your goal on the full battery to finish the plan.",
      "Goal hit. Book your HESI A2 through your program.",
    ],
    sourceLine: "Based on the HESI A2 section outlines (math, reading, vocabulary, grammar, biology, chemistry, anatomy and physiology). Physics is not included. Not affiliated with Elsevier.",
    scoreNote: "Each section is scored as percent correct, like the HESI report. Most programs want 75 percent or better in each section they require.",
  },
};
