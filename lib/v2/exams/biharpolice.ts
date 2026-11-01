import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Bihar Police Constable written examination, set by the Central Selection
// Board of Constable (CSBC), Bihar, for Constable posts in Bihar Police and the
// Bihar Special Armed Police. Pattern from the board's own Advertisement No.
// 01/2025 (11 March 2025, 19,838 posts; written exam 16 July to 3 August 2025),
// read 2026-11-01: one objective OMR paper of 100 questions in 2 hours, one
// mark for each correct answer, at Class 10 (Matric) level, on Hindi, English,
// Mathematics, Social Science (history, geography, civics, economics), Science
// (physics, chemistry, zoology, botany) and General Knowledge and Current
// Affairs. No subject-wise counts are published. Candidates scoring under 30%
// are out; the written exam is qualifying only, shortlisting about five times
// the vacancies for the physical efficiency test, whose marks alone make the
// final merit list. The advertisement mentions no deduction for wrong answers
// (most guides agree; one news report says a quarter mark), so the app scores
// percent correct. Modelled at full length and time, 100 questions in 2 hours,
// with Tigertest's own subject split (Hindi 15, English 15, Mathematics 15,
// History and Civics 13, Geography and Economics 12, Science 15, Bihar GK 8,
// General Knowledge 7) in the advertisement's subject order. Hindi items are
// written in Hindi, with English explanations. GK is static facts only, no
// current affairs or office-holders. Sources: tools/next100/biharpolice/sources.md.
const minutes = (n: number) => n * 60;

export const BIHARPOLICE: ExamV2Config = {
  id: "biharpolice",
  slug: "/bihar-police-constable",
  landingPath: "/bihar-police-constable-practice-test",
  name: "Bihar Police Constable Practice Test",
  shortName: "Bihar Police",
  fullName: "Bihar Police Constable Written Exam (CSBC)",
  tagline: "Bihar Police Constable mock tests on the CSBC written exam pattern: Hindi, English, Mathematics, Social Science, Science and GK at Class 10 level.",
  icon: "siren",
  theme: { brand: "18 65% 30%", brandDark: "18 65% 22%", brandLight: "18 65% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "paper",
      name: "Written Exam",
      shortName: "Written",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(120) }],
      directions: "100 questions in 2 hours, the same length and time as the real CSBC paper, grouped by subject: Hindi (1 to 15), English (16 to 30), Mathematics (31 to 45), Social Science (46 to 70), Science (71 to 85), then General Knowledge with Bihar (86 to 100). The real paper publishes no subject split; this one is Tigertest's. You can move between questions and flag them. Each right answer earns one mark and the advertisement mentions no deduction for wrong answers, so answer every question.",
      scale: percentScale(100),
      domains: ["bihpHindi", "bihpEnglish", "bihpMaths", "bihpHistory", "bihpGeography", "bihpScience", "bihpBihar", "bihpGK"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    bihpHindi: "Hindi (हिंदी)",
    bihpEnglish: "English",
    bihpMaths: "Mathematics",
    bihpHistory: "Social Science: History and Civics",
    bihpGeography: "Social Science: Geography and Economics",
    bihpScience: "Science: Physics, Chemistry and Biology",
    bihpBihar: "General Knowledge: Bihar",
    bihpGK: "General Knowledge: India and the World",
  },
  drills: [
    { key: "hindi", name: "Hindi", section: "paper", domains: ["bihpHindi"], blurb: "पर्यायवाची, विलोम, एक शब्द, मुहावरे, लोकोक्तियाँ, संधि, समास, कारक, अलंकार, रस और रचनाकार." },
    { key: "english", name: "English", section: "paper", domains: ["bihpEnglish"], blurb: "Synonyms, antonyms, idioms, one-word substitution, spelling, voice, narration and error spotting." },
    { key: "maths", name: "Mathematics", section: "paper", domains: ["bihpMaths"], blurb: "Percentages, interest, ratio, work, speed, algebra, progressions, trigonometry, mensuration and probability." },
    { key: "history", name: "History and Civics", section: "paper", domains: ["bihpHistory"], blurb: "Ancient and medieval India, the national movement, nationalism in Europe, the Constitution and government." },
    { key: "geography", name: "Geography and Economics", section: "paper", domains: ["bihpGeography"], blurb: "Soils, crops, minerals, rivers, climate and transport, plus sectors, employment, money and development." },
    { key: "science", name: "Science", section: "paper", domains: ["bihpScience"], blurb: "Light, electricity, acids and salts, metals, carbon compounds, life processes, heredity and environment." },
    { key: "bihar", name: "Bihar GK", section: "paper", domains: ["bihpBihar"], blurb: "Bihar's history, heritage sites, rivers, crafts, festivals, wildlife and polity." },
    { key: "gk", name: "General Knowledge", section: "paper", domains: ["bihpGK"], blurb: "Important days, monuments, sports, books, awards, organisations and national symbols." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [40, 50, 60, 70, 80, 90],
  goalNotes: {
    40: "Safely past the 30% minimum",
    50: "A starting target",
    60: "A solid score",
    70: "A competitive score",
    80: "A strong, safe score",
    90: "An excellent score",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each subject, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the written exam.",
    ],
    sourceLine: "Original practice questions on the Bihar Police Constable written exam syllabus (CSBC Advertisement No. 01/2025). Not affiliated with or endorsed by the Central Selection Board of Constable, Bihar, or Bihar Police.",
    scoreNote: "Percent correct, the same as the real paper's marks out of 100: one mark for each right answer, and the advertisement mentions no deduction for wrong answers (most guides agree; check your own notice). Below 30% a candidate is out. The written exam is qualifying only: about five times the vacancies in each category are called to the physical efficiency test on written marks, and the final merit list goes by the physical test's marks alone. So aim well above 30% to be sure of a place in the physical test.",
  },
};
