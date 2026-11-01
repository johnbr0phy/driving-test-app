import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Philippine Civil Service Exam: the Civil Service Commission's Career Service
// Examination, Pen and Paper Test (CSE-PPT), Professional and Subprofessional
// levels, as announced for the 8 March and 9 August 2026 sittings
// (Examination Announcement No. 03, s. 2026 for August, as reported; the CSC
// site could not be read from here). Professional: Verbal, Analytical and
// Numerical Ability plus General Information, 170 items in 3 hours 10
// minutes. Subprofessional: Verbal, Clerical and Numerical Ability plus
// General Information, 165 items in 2 hours 40 minutes. Guides say 20 items
// of each total are a personal-data questionnaire. Passing is a general
// rating of 80.00. Verbal Ability is in English and Filipino; the rest is in
// English. One bank serves both levels: Practice Test 1 is a Professional
// mock (Analytical, no Clerical), Practice Test 2 a Subprofessional mock
// (Clerical, no Analytical), each 100 items in 2 hours, close to the real
// pace of both levels. Per test: grammar 10, vocabulary 10, reading 10,
// analytical or clerical 25, basic operations and sequences 12, word
// problems 13, Constitution 10, R.A. 6713 / peace and human rights /
// environment 10. Filipino items, figure-based abstract reasoning and the
// questionnaire are not modelled. Sources: tools/next100/phcse/sources.md.
const minutes = (n: number) => n * 60;

export const PHCSE: ExamV2Config = {
  id: "phcse",
  slug: "/civil-service-exam",
  landingPath: "/civil-service-exam-reviewer-practice-test",
  name: "Civil Service Exam Reviewer",
  shortName: "Civil Service Exam",
  fullName: "Philippine Civil Service Exam (CSE-PPT), Professional and Subprofessional",
  tagline: "Reviewer for the CSC Career Service Exam: verbal, analytical, clerical and numerical ability plus general information, for both levels.",
  icon: "building",
  theme: { brand: "221 50% 30%", brandDark: "221 50% 23%", brandLight: "221 50% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cse",
      name: "Career Service Exam",
      shortName: "CSE",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(120) }],
      directions: "100 questions in 2 hours, grouped like the real exam's parts: Verbal Ability, then Analytical Ability (Practice Test 1, Professional) or Clerical Ability (Practice Test 2, Subprofessional), then Numerical Ability, then General Information. You can move between questions and flag them. The real exam is longer (170 items in 3 hours 10 minutes for Professional, 165 in 2 hours 40 minutes for Subprofessional), so keep the same steady pace of about a minute per item.",
      scale: percentScale(100),
      domains: ["phcseGrammar", "phcseVocab", "phcseReading", "phcseAnalytical", "phcseClerical", "phcseNumbers", "phcseWordProblems", "phcseConstitution", "phcsePublicService"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1 (Professional)" },
    { number: 2, name: "Practice Test 2 (Subprofessional)", heldOut: true },
  ],
  domainLabels: {
    phcseGrammar: "Verbal Ability: Grammar and Correct Usage",
    phcseVocab: "Verbal Ability: Vocabulary",
    phcseReading: "Verbal Ability: Reading and Paragraph Organization",
    phcseAnalytical: "Analytical Ability (Professional)",
    phcseClerical: "Clerical Ability (Subprofessional)",
    phcseNumbers: "Numerical Ability: Basic Operations and Sequences",
    phcseWordProblems: "Numerical Ability: Word Problems",
    phcseConstitution: "General Information: Philippine Constitution",
    phcsePublicService: "General Information: R.A. 6713, Human Rights and Environment",
  },
  drills: [
    { key: "grammar", name: "Grammar and Correct Usage", section: "cse", domains: ["phcseGrammar"], blurb: "Subject-verb agreement, tenses, pronouns, prepositions and commonly confused words." },
    { key: "vocab", name: "Vocabulary", section: "cse", domains: ["phcseVocab"], blurb: "Synonyms, antonyms, words in context and common idioms." },
    { key: "reading", name: "Reading Comprehension", section: "cse", domains: ["phcseReading"], blurb: "Main idea, details, inference, tone and paragraph organization." },
    { key: "analytical", name: "Analytical Ability", section: "cse", domains: ["phcseAnalytical"], blurb: "Professional level: word analogies, logic, conclusions and data interpretation." },
    { key: "clerical", name: "Clerical Ability", section: "cse", domains: ["phcseClerical"], blurb: "Subprofessional level: alphabetical and date filing, and spelling." },
    { key: "numbers", name: "Basic Operations and Sequences", section: "cse", domains: ["phcseNumbers"], blurb: "Fractions, decimals, percents, order of operations and number series." },
    { key: "wordproblems", name: "Word Problems", section: "cse", domains: ["phcseWordProblems"], blurb: "Money, percent, ratio, work, speed, age, mixture and interest problems." },
    { key: "constitution", name: "Philippine Constitution", section: "cse", domains: ["phcseConstitution"], blurb: "The 1987 Constitution: principles, Bill of Rights, the three branches and the civil service." },
    { key: "publicservice", name: "Ethics, Human Rights and Environment", section: "cse", domains: ["phcsePublicService"], blurb: "R.A. 6713, peace and human rights, and environmental laws." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "A first target while you review",
    75: "Getting close to the passing line",
    80: "The CSC passing rating is 80.00",
    85: "A safer margin above 80",
    90: "A strong, confident score",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each part, then take a full mock exam.",
      "Master each drill first.",
      "Halfway there. Try the practice test for your level.",
      "Hit 80% on both practice tests.",
      "Goal hit. You are ready for the Civil Service Exam.",
    ],
    sourceLine: "Original practice questions on the CSC Career Service Examination (CSE-PPT) scope for the Professional and Subprofessional levels. Not affiliated with or endorsed by the Civil Service Commission.",
    scoreNote: "Percent correct. The real exam needs a general rating of at least 80.00, and the CSC does not publish how raw scores convert to that rating, so treat 80% here as a target, not a guarantee. Practice Test 1 follows the Professional level and Practice Test 2 the Subprofessional level; each is 100 items in 2 hours, shorter than the real 170 or 165 items. Filipino-language verbal items are not included.",
  },
};
