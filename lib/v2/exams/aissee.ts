import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AISSEE Class VI (All India Sainik Schools Entrance Examination), run by
// the National Testing Agency for the Sainik Schools Society (Ministry of
// Defence) for admission to Class VI of the Sainik Schools and approved New
// Sainik Schools. Pattern from the AISSEE-2026 Information Bulletin (exam
// held on 18 January 2026; the AISSEE-2027 bulletin was not yet on NTA's
// AISSEE page on 1 November 2026): pen and paper on an OMR sheet, multiple
// choice, 150 minutes, 125 questions for 300 marks, no negative marking.
// Section A Language 25 x 2 marks, B Mathematics 50 x 3, C Intelligence
// 25 x 2, D General Knowledge 25 x 2. Qualifying for the existing Sainik
// Schools: at least 25% in each subject and 40% in aggregate (no minimum
// for SC/ST there; the New Sainik Schools apply it to all). Class VI is
// offered in 13 languages; Tigertest's items are in English.
// Modelled at 100 questions in 120 minutes (the real pace, 1.2 minutes a
// question) in the real proportions and order: Language 20, Mathematics 40,
// Intelligence 20, General Knowledge 20. Drills: Language split into
// reading passages and grammar, Mathematics into numbers, everyday
// arithmetic and shapes and measurement, GK into India and science
// (per test 10/10, 14/13/13, 20, 10/10). Scored as percent correct; the
// marks out of 300 are explained in scoreNote. Spatial Intelligence items
// are written in words. Sources: tools/next100/aissee/sources.md.
const minutes = (n: number) => n * 60;

export const AISSEE: ExamV2Config = {
  id: "aissee",
  slug: "/aissee",
  landingPath: "/aissee-class-6-practice-test",
  name: "AISSEE Class 6 Practice Test",
  shortName: "AISSEE",
  fullName: "AISSEE Class 6 (All India Sainik Schools Entrance Examination)",
  tagline: "Sainik School Class 6 mock tests: Language, Mathematics, Intelligence and General Knowledge at the real pace.",
  icon: "graduation",
  theme: { brand: "120 22% 34%", brandDark: "120 22% 24%", brandLight: "120 22% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "ais",
      name: "Entrance Examination",
      shortName: "AISSEE",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(120) }],
      directions: "100 questions in 2 hours, the real AISSEE pace, in the real order: Language (1 to 20), Mathematics (21 to 60), Intelligence (61 to 80) and General Knowledge (81 to 100). The real Class 6 paper is longer: 125 questions in 150 minutes. You can move between questions and flag them. There is no negative marking, so answer every question.",
      scale: percentScale(100),
      domains: ["aisseeGrammar", "aisseeReading", "aisseeNumbers", "aisseeCommercial", "aisseeGeometry", "aisseeReasoning", "aisseeIndia", "aisseeScience"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    aisseeGrammar: "Language: Grammar and Vocabulary",
    aisseeReading: "Language: Reading Passages",
    aisseeNumbers: "Mathematics: Numbers and Fractions",
    aisseeCommercial: "Mathematics: Ratio, Percentage and Speed",
    aisseeGeometry: "Mathematics: Shapes and Measurement",
    aisseeReasoning: "Intelligence",
    aisseeIndia: "General Knowledge: India",
    aisseeScience: "General Knowledge: Science and Our World",
  },
  drills: [
    { key: "grammar", name: "Grammar and Vocabulary", section: "ais", domains: ["aisseeGrammar"], blurb: "Prepositions, articles, tenses, nouns and pronouns, opposites, synonyms, idioms and spelling." },
    { key: "reading", name: "Reading Passages", section: "ais", domains: ["aisseeReading"], blurb: "Stories and short articles, each with five questions on facts, word meanings and the main idea." },
    { key: "numbers", name: "Numbers and Fractions", section: "ais", domains: ["aisseeNumbers"], blurb: "Place value, Roman numerals, primes, LCM and HCF, fractions, decimals and simplification." },
    { key: "commercial", name: "Ratio, Percentage and Speed", section: "ais", domains: ["aisseeCommercial"], blurb: "Unitary method, ratio, percentage, profit and loss, average, simple interest, speed and time." },
    { key: "geometry", name: "Shapes and Measurement", section: "ais", domains: ["aisseeGeometry"], blurb: "Angles, area and perimeter, circles, volume of cubes and cuboids, units and temperature." },
    { key: "intelligence", name: "Intelligence", section: "ais", domains: ["aisseeReasoning"], blurb: "Analogies, series, odd one out, codes, family relations, directions and number patterns." },
    { key: "india", name: "GK: India", section: "ais", domains: ["aisseeIndia"], blurb: "National symbols, art and culture, the defence forces, sports and organisations." },
    { key: "science", name: "GK: Science and Our World", section: "ais", domains: ["aisseeScience"], blurb: "The solar system, water cycle, energy, calamities, the body, plants, animals and everyday devices." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [40, 50, 60, 70, 80, 90],
  goalNotes: {
    40: "The aggregate qualifying line, if no subject is below 25%",
    50: "A fair start",
    60: "A solid score",
    70: "A strong score",
    80: "A very strong score",
    90: "A top score",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each section, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the AISSEE.",
    ],
    sourceLine: "Original practice questions on the AISSEE Class VI pattern in NTA's AISSEE-2026 Information Bulletin. Not affiliated with or endorsed by the National Testing Agency or the Sainik Schools Society.",
    scoreNote: "Percent correct. The real Class 6 paper has 125 questions for 300 marks in 150 minutes: Mathematics questions carry 3 marks each and the other sections 2, so Mathematics is half the marks. There is no negative marking. To qualify for the existing Sainik Schools you need at least 25% in each subject and 40% overall (no minimum for SC and ST candidates there), and seats then go on merit school by school. These mock tests are 100 questions in 2 hours, the same pace and mix.",
  },
};
